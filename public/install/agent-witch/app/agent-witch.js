#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var Q5=Object.create;var fy=Object.defineProperty;var eq=Object.getOwnPropertyDescriptor;var tq=Object.getOwnPropertyNames;var rq=Object.getPrototypeOf,oq=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var v=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},gt=(e,t)=>{for(var r in t)fy(e,r,{get:t[r],enumerable:!0})},nq=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of tq(t))!oq.call(e,n)&&n!==r&&fy(e,n,{get:()=>t[n],enumerable:!(o=eq(t,n))||o.enumerable});return e};var g=(e,t,r)=>(r=e!=null?Q5(rq(e)):{},nq(t||!e||!e.__esModule?fy(r,"default",{value:e,enumerable:!0}):r,e));var Bi,uL,pL,Gi,hy,Lte,mL,Ud,Ut,gr,Bd,Gd,Qn,es,Ge,yy,qd,Vd,Kd,qi,kt,Io,Oo,Vi,Yr,Sy,gL,Le=l(()=>{"use strict";Bi={production:".agent-witch",localhost:".local-agent-witch"},uL={production:47892,localhost:47893},pL={production:"com.agent-witch",localhost:"com.local-agent-witch"},Gi={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},hy="app",Lte=`${hy}/agent-witch.js`,mL=`${hy}/command`,Ud={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Ut=Bi.production,gr=Bi.localhost,Bd=uL.production,Gd=uL.localhost,Qn=pL.production,es=pL.localhost,Ge="profiles",yy=Gi.activeProfile,qd="harness",Vd="sets",Kd="manifest.json",qi=Ud.projectsDir,kt=Ud.logsDir,Io="agent-witch.log",Oo="agent-witch.error.log",Vi=Ud.reportsDir,Yr=Ud.deviceKeypairJson,Sy=hy,gL="agent-witch.js"});var fL=l(()=>{"use strict";Le()});var hL,Zr,Ki,Jd=l(()=>{"use strict";hL=g(require("node:path"));Le();Zr=e=>hL.default.basename(e)===gr,Ki=e=>Zr(e)?es:Qn});var yL=l(()=>{"use strict";fL();Jd()});var SL,Py,sq,Ji,iq,aq,PL,lq,cq,AL=l(()=>{"use strict";yL();Le();SL=g(require("node:os")),Py=g(require("node:path")),sq=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?Py.default.resolve(e):Py.default.join(SL.default.homedir(),Ut)},Ji=Ki(sq()),iq=`${Ji}-wake`,aq=`${Ji}-live`,PL=`${Ji}-watchdog`,lq=`${Ji}-automation-scheduler`,cq=`${Ji}-updater`});var ts=v(Ay=>{"use strict";Object.defineProperty(Ay,"__esModule",{value:!0});Ay.stringify=dq;function dq(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var M=v(by=>{"use strict";Object.defineProperty(by,"__esModule",{value:!0});by.generateTypeGuardError=uq;var bL=ts();function uq(e,t,r){return(0,bL.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,bL.stringify)(e)}) to be "${r}"`}});var Qr=v(Xd=>{"use strict";Object.defineProperty(Xd,"__esModule",{value:!0});Xd.isNonNullObject=void 0;var pq=M(),mq=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,pq.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Xd.isNonNullObject=mq});var Bt=v(Ae=>{"use strict";Object.defineProperty(Ae,"__esModule",{value:!0});Ae.attachTypeGuardMeta=Ae.isArrayTypeGuard=Ae.isNestedObjectTypeGuard=Ae.getTypeGuardWrapperKind=Ae.getTypeGuardInnerGuard=Ae.getTypeGuardItemGuard=Ae.getTypeGuardSchema=void 0;var gq=e=>e.schema;Ae.getTypeGuardSchema=gq;var fq=e=>e.itemGuard;Ae.getTypeGuardItemGuard=fq;var hq=e=>e.innerGuard;Ae.getTypeGuardInnerGuard=hq;var yq=e=>e.wrapperKind;Ae.getTypeGuardWrapperKind=yq;var Sq=e=>{if((0,Ae.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};Ae.isNestedObjectTypeGuard=Sq;var Pq=e=>{if((0,Ae.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};Ae.isArrayTypeGuard=Pq;var Aq=(e,t)=>Object.assign(e,t);Ae.attachTypeGuardMeta=Aq});var Xi=v(Mo=>{"use strict";Object.defineProperty(Mo,"__esModule",{value:!0});Mo.getExpectedTypeName=Mo.getTypeGuardDisplayName=void 0;var _L=Bt(),bq=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};Mo.getTypeGuardDisplayName=bq;var _q=e=>{let t=(0,_L.getTypeGuardWrapperKind)(e),r=(0,_L.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,Mo.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};Mo.getExpectedTypeName=_q});var No=v(Yd=>{"use strict";Object.defineProperty(Yd,"__esModule",{value:!0});Yd.createValidationResult=void 0;var wq=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Yd.createValidationResult=wq});var rs=v(Zd=>{"use strict";Object.defineProperty(Zd,"__esModule",{value:!0});Zd.createValidationError=void 0;var vq=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Zd.createValidationError=vq});var os=v(Qd=>{"use strict";Object.defineProperty(Qd,"__esModule",{value:!0});Qd.createTreeNode=void 0;var kq=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Qd.createTreeNode=kq});var Yi=v(eu=>{"use strict";Object.defineProperty(eu,"__esModule",{value:!0});eu.combineResults=void 0;var Tq=No(),Cq=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,Tq.createValidationResult)(r,o,n)};eu.combineResults=Cq});var ru=v(tu=>{"use strict";Object.defineProperty(tu,"__esModule",{value:!0});tu.createSimplifiedTree=void 0;var wL=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=wL(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},Lq=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=wL(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};tu.createSimplifiedTree=Lq});var Qi=v(nu=>{"use strict";Object.defineProperty(nu,"__esModule",{value:!0});nu.validateObject=void 0;var Eq=Qr(),Zi=No(),Rq=rs(),ou=os(),xq=Yi(),vL=su(),Wq=(e,t,r)=>{let o=()=>{let i=(0,Rq.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,ou.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Zi.createValidationResult)(!1,[],a):(0,Zi.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Zi.createValidationResult)(!0,[],(0,ou.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...u]=c,m=d,S=t[m],h=e[m],y=(0,vL.validateProperty)(m,h,S,r);return y.valid?u.length===0?(0,Zi.createValidationResult)(!0,[],(0,ou.createTreeNode)(r.path,!0,"object",e)):a(u):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,vL.validateProperty)(d,e[d],u,r)}),a=(0,xq.combineResults)(i,r.path),c=(0,ou.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,Zi.createValidationResult)(a.valid,a.errors,c)};return(0,Eq.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};nu.validateObject=Wq});var TL=v(lu=>{"use strict";Object.defineProperty(lu,"__esModule",{value:!0});lu.validateArray=void 0;var Iq=ts(),iu=No(),kL=rs(),au=os(),Oq=Yi(),Mq=Qi(),Nq=Xi(),Dq=Bt(),jq=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,kL.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,au.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,iu.createValidationResult)(!1,[c],d)}let n=(0,Dq.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,m={path:u,config:r.config||null};if(n)return(0,Mq.validateObject)(c,n,m);let S=t(c,null),h=(0,Nq.getExpectedTypeName)(t),y=(0,Iq.stringify)(c);if(S)return(0,iu.createValidationResult)(!0,[],(0,au.createTreeNode)(u,!0,h,c));let p=y.length>200?`Expected ${u} to be "${h}"`:`Expected ${u} (${y}) to be "${h}"`,P=(0,kL.createValidationError)(u,h,c,p),A=(0,au.createTreeNode)(u,!1,h,c);return A.errors=[P],(0,iu.createValidationResult)(!1,[P],A)}),i=(0,Oq.combineResults)(s,o),a=(0,au.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,iu.createValidationResult)(i.valid,i.errors,a)};lu.validateArray=jq});var su=v(du=>{"use strict";Object.defineProperty(du,"__esModule",{value:!0});du.validateProperty=void 0;var CL=No(),zq=rs(),LL=os(),$q=Xi(),cu=Bt(),Hq=Qi(),Fq=TL(),Uq=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,cu.getTypeGuardSchema)(r),c=(0,cu.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,Hq.validateObject)(t,a,s);if(c&&(0,cu.isArrayTypeGuard)(r))return(0,Fq.validateArray)(t,c,s)}let d=u=>{let m=r(t,u),S=(0,$q.getExpectedTypeName)(r);return m?(0,CL.createValidationResult)(!0,[],(0,LL.createTreeNode)(n,!0,S,t)):(()=>{let h=(0,zq.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,LL.createTreeNode)(n,!1,S,t);return y.errors=[h],(0,CL.createValidationResult)(!1,[h],y)})()};if((0,cu.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};du.validateProperty=Uq});var pu=v(uu=>{"use strict";Object.defineProperty(uu,"__esModule",{value:!0});uu.isNil=void 0;var Bq=M(),Gq=function(e,t){return e!=null?(t&&t.callbackOnError((0,Bq.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};uu.isNil=Gq});var _y=v(mu=>{"use strict";Object.defineProperty(mu,"__esModule",{value:!0});mu.isDefined=void 0;var qq=M(),Vq=pu(),Kq=function(e,t){return(0,Vq.isNil)(e,null)?(t&&t.callbackOnError((0,qq.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};mu.isDefined=Kq});var wy=v(gu=>{"use strict";Object.defineProperty(gu,"__esModule",{value:!0});gu.reportValidationResults=void 0;var Jq=ru(),EL=_y(),Xq=pu(),Yq=(e,t)=>{if(e.valid===!0||(0,Xq.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,EL.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,Jq.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,EL.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};gu.reportValidationResults=Yq});var vy=v(ne=>{"use strict";Object.defineProperty(ne,"__esModule",{value:!0});ne.Validation=ne.reportValidationResults=ne.validateObject=ne.validateProperty=ne.createSimplifiedTree=ne.combineResults=ne.createTreeNode=ne.createValidationError=ne.createValidationResult=ne.getExpectedTypeName=void 0;var Zq=Xi();Object.defineProperty(ne,"getExpectedTypeName",{enumerable:!0,get:function(){return Zq.getExpectedTypeName}});var Qq=No();Object.defineProperty(ne,"createValidationResult",{enumerable:!0,get:function(){return Qq.createValidationResult}});var eV=rs();Object.defineProperty(ne,"createValidationError",{enumerable:!0,get:function(){return eV.createValidationError}});var tV=os();Object.defineProperty(ne,"createTreeNode",{enumerable:!0,get:function(){return tV.createTreeNode}});var rV=Yi();Object.defineProperty(ne,"combineResults",{enumerable:!0,get:function(){return rV.combineResults}});var oV=ru();Object.defineProperty(ne,"createSimplifiedTree",{enumerable:!0,get:function(){return oV.createSimplifiedTree}});var nV=su();Object.defineProperty(ne,"validateProperty",{enumerable:!0,get:function(){return nV.validateProperty}});var sV=Qi();Object.defineProperty(ne,"validateObject",{enumerable:!0,get:function(){return sV.validateObject}});var iV=wy();Object.defineProperty(ne,"reportValidationResults",{enumerable:!0,get:function(){return iV.reportValidationResults}});var aV=No(),lV=Yi(),cV=rs(),dV=os(),uV=su(),pV=Qi(),mV=wy(),gV=ru();ne.Validation={result:aV.createValidationResult,combine:lV.combineResults,error:cV.createValidationError,treeNode:dV.createTreeNode,property:uV.validateProperty,object:pV.validateObject,report:mV.reportValidationResults,createSimplifiedTree:gV.createSimplifiedTree}});var fu=v(ky=>{"use strict";Object.defineProperty(ky,"__esModule",{value:!0});ky.isType=hV;var RL=Qr(),xL=vy(),fV=Bt();function hV(e){if(!(0,RL.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,xL.validateObject)(r,e,s);return(0,xL.reportValidationResults)(i,o||null),i.valid}return(0,RL.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,fV.attachTypeGuardMeta)(t,{schema:e})}});var ML=v(Do=>{"use strict";Object.defineProperty(Do,"__esModule",{value:!0});Do.isNestedType=Do.isShape=void 0;Do.isSchema=ea;var WL=Qr(),IL=vy(),OL=Bt();function ea(e){if(!(0,WL.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=SV(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,IL.validateObject)(o,t,i);return(0,IL.reportValidationResults)(a,n||null),a.valid}return(0,WL.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,OL.attachTypeGuardMeta)(r,{schema:t})}function yV(e){return typeof e=="function"?e:Array.isArray(e)?PV(e):typeof e=="object"&&e!==null?ea(e):e}function SV(e){let t={};for(let[r,o]of Object.entries(e))t[r]=yV(o);return t}function PV(e){let t=e[0],r=ea(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,OL.attachTypeGuardMeta)(o,{itemGuard:r})}Do.isShape=ea;Do.isNestedType=ea});var NL=v(Ty=>{"use strict";Object.defineProperty(Ty,"__esModule",{value:!0});Ty.isObjectWith=bV;var AV=fu();function bV(e){return(0,AV.isType)(e)}});var DL=v(Cy=>{"use strict";Object.defineProperty(Cy,"__esModule",{value:!0});Cy.isObject=wV;var _V=fu();function wV(e){return(0,_V.isType)(e)}});var jL=v(Ly=>{"use strict";Object.defineProperty(Ly,"__esModule",{value:!0});Ly.guardWithTolerance=vV;function vV(e,t,r){return t(e,r),e}});var zL=v(Ey=>{"use strict";Object.defineProperty(Ey,"__esModule",{value:!0});Ey.isBranded=TV;var kV=M();function TV(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,kV.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var $L=v(hu=>{"use strict";Object.defineProperty(hu,"__esModule",{value:!0});hu.BrandSymbols=void 0;hu.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var HL=v(yu=>{"use strict";Object.defineProperty(yu,"__esModule",{value:!0});yu.isAny=void 0;var CV=function(e){return!0};yu.isAny=CV});var ta=v(Ry=>{"use strict";Object.defineProperty(Ry,"__esModule",{value:!0});Ry.reportTypeGuardError=EV;var LV=M();function EV(e,t,r){e&&e.callbackOnError((0,LV.generateTypeGuardError)(t,e.identifier,r))}});var FL=v(Su=>{"use strict";Object.defineProperty(Su,"__esModule",{value:!0});Su.isBoolean=void 0;var RV=ta(),xV=function(t,r){return typeof t!="boolean"?((0,RV.reportTypeGuardError)(r,t,"boolean"),!1):!0};Su.isBoolean=xV});var UL=v(Pu=>{"use strict";Object.defineProperty(Pu,"__esModule",{value:!0});Pu.isDate=void 0;var WV=M(),IV=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,WV.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Pu.isDate=IV});var xy=v(Au=>{"use strict";Object.defineProperty(Au,"__esModule",{value:!0});Au.isNumber=void 0;var OV=ta(),MV=function(t,r){return typeof t!="number"||isNaN(t)?((0,OV.reportTypeGuardError)(r,t,"number"),!1):!0};Au.isNumber=MV});var BL=v(bu=>{"use strict";Object.defineProperty(bu,"__esModule",{value:!0});bu.isString=void 0;var NV=ta(),DV=function(t,r){return typeof t!="string"?((0,NV.reportTypeGuardError)(r,t,"string"),!1):!0};bu.isString=DV});var GL=v(_u=>{"use strict";Object.defineProperty(_u,"__esModule",{value:!0});_u.isUnknown=void 0;var jV=function(e){return!0};_u.isUnknown=jV});var qL=v(wu=>{"use strict";Object.defineProperty(wu,"__esModule",{value:!0});wu.isFunction=void 0;var zV=M(),$V=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,zV.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};wu.isFunction=$V});var KL=v(vu=>{"use strict";Object.defineProperty(vu,"__esModule",{value:!0});vu.isFile=void 0;var VL=M(),HV=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,VL.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,VL.generateTypeGuardError)(e,t.identifier,"File")),!1)};vu.isFile=HV});var XL=v(ku=>{"use strict";Object.defineProperty(ku,"__esModule",{value:!0});ku.isFileList=void 0;var JL=M(),FV=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,JL.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,JL.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};ku.isFileList=FV});var ZL=v(Tu=>{"use strict";Object.defineProperty(Tu,"__esModule",{value:!0});Tu.isBlob=void 0;var YL=M(),UV=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,YL.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,YL.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Tu.isBlob=UV});var eE=v(Cu=>{"use strict";Object.defineProperty(Cu,"__esModule",{value:!0});Cu.isFormData=void 0;var QL=M(),BV=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,QL.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,QL.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Cu.isFormData=BV});var rE=v(Lu=>{"use strict";Object.defineProperty(Lu,"__esModule",{value:!0});Lu.isURL=void 0;var tE=M(),GV=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,tE.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,tE.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Lu.isURL=GV});var nE=v(Eu=>{"use strict";Object.defineProperty(Eu,"__esModule",{value:!0});Eu.isURLSearchParams=void 0;var oE=M(),qV=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,oE.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,oE.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Eu.isURLSearchParams=qV});var sE=v(Ru=>{"use strict";Object.defineProperty(Ru,"__esModule",{value:!0});Ru.isMap=void 0;var VV=M(),KV=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,VV.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Ru.isMap=KV});var iE=v(xu=>{"use strict";Object.defineProperty(xu,"__esModule",{value:!0});xu.isSet=void 0;var JV=M(),XV=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,JV.generateTypeGuardError)(e,t.identifier,"Set")),!1)};xu.isSet=XV});var aE=v(Wy=>{"use strict";Object.defineProperty(Wy,"__esModule",{value:!0});Wy.isIndexSignature=ZV;var YV=M();function ZV(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,YV.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,u)=>{let m=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),h=t(m,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return S&&h})}}});var lE=v(Wu=>{"use strict";Object.defineProperty(Wu,"__esModule",{value:!0});Wu.isError=void 0;var QV=ta(),eK=function(t,r){return t instanceof Error?!0:((0,QV.reportTypeGuardError)(r,t,"Error"),!1)};Wu.isError=eK});var Oy=v(Iy=>{"use strict";Object.defineProperty(Iy,"__esModule",{value:!0});Iy.isArrayWithEachItem=oK;var tK=M(),rK=Bt();function oK(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,tK.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,rK.attachTypeGuardMeta)(t,{itemGuard:e})}});var My=v(Iu=>{"use strict";Object.defineProperty(Iu,"__esModule",{value:!0});Iu.isNonEmptyArray=void 0;var nK=M(),sK=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,nK.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Iu.isNonEmptyArray=sK});var cE=v(Ny=>{"use strict";Object.defineProperty(Ny,"__esModule",{value:!0});Ny.isNonEmptyArrayWithEachItem=lK;var iK=Oy(),aK=My();function lK(e){return function(t,r){return(0,iK.isArrayWithEachItem)(e)(t,r)&&(0,aK.isNonEmptyArray)(t,r)}}});var uE=v(Dy=>{"use strict";Object.defineProperty(Dy,"__esModule",{value:!0});Dy.isTuple=cK;var dE=M();function cK(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,dE.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,dE.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var pE=v(jy=>{"use strict";Object.defineProperty(jy,"__esModule",{value:!0});jy.isObjectWithEachItem=uK;var dK=M();function uK(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,dK.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var mE=v(zy=>{"use strict";Object.defineProperty(zy,"__esModule",{value:!0});zy.isPartialOf=mK;var pK=Qr();function mK(e){return function(t,r){if(!(0,pK.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var gE=v($y=>{"use strict";Object.defineProperty($y,"__esModule",{value:!0});$y.isPick=fK;var gK=Qr();function fK(e,...t){return function(r,o){if(!(0,gK.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var fE=v(Hy=>{"use strict";Object.defineProperty(Hy,"__esModule",{value:!0});Hy.isOmit=yK;var hK=Qr();function yK(e,...t){return function(r,o){if(!(0,hK.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),m=u.indexOf(" ("),S=m>=0?u.slice(0,m):u;if(a.has(S))return!1;let h=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var hE=v(Ou=>{"use strict";Object.defineProperty(Ou,"__esModule",{value:!0});Ou.isNonEmptyString=void 0;var SK=M(),PK=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,SK.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Ou.isNonEmptyString=PK});var yE=v(Mu=>{"use strict";Object.defineProperty(Mu,"__esModule",{value:!0});Mu.isNonNegativeNumber=void 0;var AK=M(),bK=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,AK.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Mu.isNonNegativeNumber=bK});var SE=v(Nu=>{"use strict";Object.defineProperty(Nu,"__esModule",{value:!0});Nu.isPositiveNumber=void 0;var _K=M(),wK=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,_K.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Nu.isPositiveNumber=wK});var PE=v(Du=>{"use strict";Object.defineProperty(Du,"__esModule",{value:!0});Du.isNonPositiveNumber=void 0;var vK=M(),kK=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,vK.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Du.isNonPositiveNumber=kK});var AE=v(ju=>{"use strict";Object.defineProperty(ju,"__esModule",{value:!0});ju.isNegativeNumber=void 0;var TK=M(),CK=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,TK.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};ju.isNegativeNumber=CK});var bE=v(zu=>{"use strict";Object.defineProperty(zu,"__esModule",{value:!0});zu.isInteger=void 0;var LK=M(),EK=xy(),RK=function(e,t){return!(0,EK.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,LK.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};zu.isInteger=RK});var _E=v($u=>{"use strict";Object.defineProperty($u,"__esModule",{value:!0});$u.isPositiveInteger=void 0;var xK=M(),WK=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,xK.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};$u.isPositiveInteger=WK});var wE=v(Hu=>{"use strict";Object.defineProperty(Hu,"__esModule",{value:!0});Hu.isNegativeInteger=void 0;var IK=M(),OK=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,IK.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Hu.isNegativeInteger=OK});var vE=v(Fu=>{"use strict";Object.defineProperty(Fu,"__esModule",{value:!0});Fu.isNonNegativeInteger=void 0;var MK=M(),NK=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,MK.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Fu.isNonNegativeInteger=NK});var kE=v(Uu=>{"use strict";Object.defineProperty(Uu,"__esModule",{value:!0});Uu.isNonPositiveInteger=void 0;var DK=M(),jK=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,DK.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Uu.isNonPositiveInteger=jK});var TE=v(Gu=>{"use strict";Object.defineProperty(Gu,"__esModule",{value:!0});Gu.isNumeric=void 0;var Bu=M(),zK=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Bu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Bu.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Bu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Bu.generateTypeGuardError)(e,t.identifier,"number key")),!1};Gu.isNumeric=zK});var CE=v(qu=>{"use strict";Object.defineProperty(qu,"__esModule",{value:!0});qu.isBooleanLike=void 0;var Fy=M(),$K=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Fy.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Fy.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};qu.isBooleanLike=$K});var LE=v(Vu=>{"use strict";Object.defineProperty(Vu,"__esModule",{value:!0});Vu.isDateLike=void 0;var ra=M(),HK=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,ra.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,ra.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,ra.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,ra.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,ra.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Vu.isDateLike=HK});var EE=v(Ku=>{"use strict";Object.defineProperty(Ku,"__esModule",{value:!0});Ku.isBigInt=void 0;var FK=M(),UK=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,FK.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Ku.isBigInt=UK});var By=v(Uy=>{"use strict";Object.defineProperty(Uy,"__esModule",{value:!0});Uy.isOneOf=BK;var RE=ts();function BK(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,RE.stringify)(t)}) must be one of following values ${e.map(RE.stringify).join(" | ")}`),o}}});var xE=v(Gy=>{"use strict";Object.defineProperty(Gy,"__esModule",{value:!0});Gy.isOneOfTypes=VK;var GK=ts(),qK=Xi();function VK(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,GK.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,qK.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;a.includes(u)||a.push(u)}})),r.callbackOnError(a.join(`
`))}return n}}});var WE=v(qy=>{"use strict";Object.defineProperty(qy,"__esModule",{value:!0});qy.isIntersectionOf=KK;function KK(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var IE=v(Vy=>{"use strict";Object.defineProperty(Vy,"__esModule",{value:!0});Vy.isExtensionOf=JK;function JK(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var OE=v(Ky=>{"use strict";Object.defineProperty(Ky,"__esModule",{value:!0});Ky.isNullOr=YK;var XK=Bt();function YK(e){function t(r,o){return r===null?!0:e(r,o)}return(0,XK.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var ME=v(Jy=>{"use strict";Object.defineProperty(Jy,"__esModule",{value:!0});Jy.isUndefinedOr=QK;var ZK=Bt();function QK(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,ZK.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var NE=v(Xy=>{"use strict";Object.defineProperty(Xy,"__esModule",{value:!0});Xy.isNilOr=t4;var e4=Bt();function t4(e){function t(r,o){return r==null?!0:e(r,o)}return(0,e4.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var DE=v(Yy=>{"use strict";Object.defineProperty(Yy,"__esModule",{value:!0});Yy.isAsserted=r4;function r4(e){return!0}});var jE=v(Zy=>{"use strict";Object.defineProperty(Zy,"__esModule",{value:!0});Zy.isEnum=n4;var o4=By();function n4(e){return function(t,r){return(0,o4.isOneOf)(...Object.values(e))(t,r)}}});var zE=v(Qy=>{"use strict";Object.defineProperty(Qy,"__esModule",{value:!0});Qy.isEqualTo=a4;var s4=M(),i4=ts();function a4(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,s4.generateTypeGuardError)(t,r.identifier,`equal to ${(0,i4.stringify)(e)}`)),!1):!0}}});var $E=v(Ju=>{"use strict";Object.defineProperty(Ju,"__esModule",{value:!0});Ju.isRegex=void 0;var l4=M(),c4=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,l4.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Ju.isRegex=c4});var FE=v(eS=>{"use strict";Object.defineProperty(eS,"__esModule",{value:!0});eS.isPattern=d4;var HE=M();function d4(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,HE.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,HE.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var UE=v(tS=>{"use strict";Object.defineProperty(tS,"__esModule",{value:!0});tS.by=u4;function u4(e){return function(t){return e(t,null)}}});var BE=v(rS=>{"use strict";Object.defineProperty(rS,"__esModule",{value:!0});rS.toNumber=p4;function p4(e){return typeof e=="number"?e:Number(e)}});var GE=v(oS=>{"use strict";Object.defineProperty(oS,"__esModule",{value:!0});oS.toDate=m4;function m4(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var qE=v(nS=>{"use strict";Object.defineProperty(nS,"__esModule",{value:!0});nS.toBoolean=g4;function g4(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var VE=v(Xu=>{"use strict";Object.defineProperty(Xu,"__esModule",{value:!0});Xu.isSymbol=void 0;var f4=M(),h4=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,f4.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Xu.isSymbol=h4});var ns=v(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.isDateLike=_.isBooleanLike=_.isNumeric=_.isNonPositiveInteger=_.isNonNegativeInteger=_.isNegativeInteger=_.isPositiveInteger=_.isInteger=_.isNegativeNumber=_.isNonPositiveNumber=_.isPositiveNumber=_.isNonNegativeNumber=_.isNonEmptyString=_.isOmit=_.isPick=_.isPartialOf=_.isObjectWithEachItem=_.isNonNullObject=_.isTuple=_.isNonEmptyArrayWithEachItem=_.isNonEmptyArray=_.isArrayWithEachItem=_.isError=_.isIndexSignature=_.isSet=_.isMap=_.isURLSearchParams=_.isURL=_.isFormData=_.isBlob=_.isFileList=_.isFile=_.isFunction=_.isUnknown=_.isString=_.isNumber=_.isNil=_.isDefined=_.isDate=_.isBoolean=_.isAny=_.BrandSymbols=_.isBranded=_.guardWithTolerance=_.isObject=_.isObjectWith=_.isNestedType=_.isShape=_.isSchema=_.isType=void 0;_.isSymbol=_.toBoolean=_.toDate=_.toNumber=_.by=_.generateTypeGuardError=_.isPattern=_.isRegex=_.isEqualTo=_.isEnum=_.isAsserted=_.isNilOr=_.isUndefinedOr=_.isNullOr=_.isExtensionOf=_.isIntersectionOf=_.isOneOfTypes=_.isOneOf=_.isBigInt=void 0;var y4=fu();Object.defineProperty(_,"isType",{enumerable:!0,get:function(){return y4.isType}});var sS=ML();Object.defineProperty(_,"isSchema",{enumerable:!0,get:function(){return sS.isSchema}});Object.defineProperty(_,"isShape",{enumerable:!0,get:function(){return sS.isShape}});Object.defineProperty(_,"isNestedType",{enumerable:!0,get:function(){return sS.isNestedType}});var S4=NL();Object.defineProperty(_,"isObjectWith",{enumerable:!0,get:function(){return S4.isObjectWith}});var P4=DL();Object.defineProperty(_,"isObject",{enumerable:!0,get:function(){return P4.isObject}});var A4=jL();Object.defineProperty(_,"guardWithTolerance",{enumerable:!0,get:function(){return A4.guardWithTolerance}});var b4=zL();Object.defineProperty(_,"isBranded",{enumerable:!0,get:function(){return b4.isBranded}});var _4=$L();Object.defineProperty(_,"BrandSymbols",{enumerable:!0,get:function(){return _4.BrandSymbols}});var w4=HL();Object.defineProperty(_,"isAny",{enumerable:!0,get:function(){return w4.isAny}});var v4=FL();Object.defineProperty(_,"isBoolean",{enumerable:!0,get:function(){return v4.isBoolean}});var k4=UL();Object.defineProperty(_,"isDate",{enumerable:!0,get:function(){return k4.isDate}});var T4=_y();Object.defineProperty(_,"isDefined",{enumerable:!0,get:function(){return T4.isDefined}});var C4=pu();Object.defineProperty(_,"isNil",{enumerable:!0,get:function(){return C4.isNil}});var L4=xy();Object.defineProperty(_,"isNumber",{enumerable:!0,get:function(){return L4.isNumber}});var E4=BL();Object.defineProperty(_,"isString",{enumerable:!0,get:function(){return E4.isString}});var R4=GL();Object.defineProperty(_,"isUnknown",{enumerable:!0,get:function(){return R4.isUnknown}});var x4=qL();Object.defineProperty(_,"isFunction",{enumerable:!0,get:function(){return x4.isFunction}});var W4=KL();Object.defineProperty(_,"isFile",{enumerable:!0,get:function(){return W4.isFile}});var I4=XL();Object.defineProperty(_,"isFileList",{enumerable:!0,get:function(){return I4.isFileList}});var O4=ZL();Object.defineProperty(_,"isBlob",{enumerable:!0,get:function(){return O4.isBlob}});var M4=eE();Object.defineProperty(_,"isFormData",{enumerable:!0,get:function(){return M4.isFormData}});var N4=rE();Object.defineProperty(_,"isURL",{enumerable:!0,get:function(){return N4.isURL}});var D4=nE();Object.defineProperty(_,"isURLSearchParams",{enumerable:!0,get:function(){return D4.isURLSearchParams}});var j4=sE();Object.defineProperty(_,"isMap",{enumerable:!0,get:function(){return j4.isMap}});var z4=iE();Object.defineProperty(_,"isSet",{enumerable:!0,get:function(){return z4.isSet}});var $4=aE();Object.defineProperty(_,"isIndexSignature",{enumerable:!0,get:function(){return $4.isIndexSignature}});var H4=lE();Object.defineProperty(_,"isError",{enumerable:!0,get:function(){return H4.isError}});var F4=Oy();Object.defineProperty(_,"isArrayWithEachItem",{enumerable:!0,get:function(){return F4.isArrayWithEachItem}});var U4=My();Object.defineProperty(_,"isNonEmptyArray",{enumerable:!0,get:function(){return U4.isNonEmptyArray}});var B4=cE();Object.defineProperty(_,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return B4.isNonEmptyArrayWithEachItem}});var G4=uE();Object.defineProperty(_,"isTuple",{enumerable:!0,get:function(){return G4.isTuple}});var q4=Qr();Object.defineProperty(_,"isNonNullObject",{enumerable:!0,get:function(){return q4.isNonNullObject}});var V4=pE();Object.defineProperty(_,"isObjectWithEachItem",{enumerable:!0,get:function(){return V4.isObjectWithEachItem}});var K4=mE();Object.defineProperty(_,"isPartialOf",{enumerable:!0,get:function(){return K4.isPartialOf}});var J4=gE();Object.defineProperty(_,"isPick",{enumerable:!0,get:function(){return J4.isPick}});var X4=fE();Object.defineProperty(_,"isOmit",{enumerable:!0,get:function(){return X4.isOmit}});var Y4=hE();Object.defineProperty(_,"isNonEmptyString",{enumerable:!0,get:function(){return Y4.isNonEmptyString}});var Z4=yE();Object.defineProperty(_,"isNonNegativeNumber",{enumerable:!0,get:function(){return Z4.isNonNegativeNumber}});var Q4=SE();Object.defineProperty(_,"isPositiveNumber",{enumerable:!0,get:function(){return Q4.isPositiveNumber}});var e8=PE();Object.defineProperty(_,"isNonPositiveNumber",{enumerable:!0,get:function(){return e8.isNonPositiveNumber}});var t8=AE();Object.defineProperty(_,"isNegativeNumber",{enumerable:!0,get:function(){return t8.isNegativeNumber}});var r8=bE();Object.defineProperty(_,"isInteger",{enumerable:!0,get:function(){return r8.isInteger}});var o8=_E();Object.defineProperty(_,"isPositiveInteger",{enumerable:!0,get:function(){return o8.isPositiveInteger}});var n8=wE();Object.defineProperty(_,"isNegativeInteger",{enumerable:!0,get:function(){return n8.isNegativeInteger}});var s8=vE();Object.defineProperty(_,"isNonNegativeInteger",{enumerable:!0,get:function(){return s8.isNonNegativeInteger}});var i8=kE();Object.defineProperty(_,"isNonPositiveInteger",{enumerable:!0,get:function(){return i8.isNonPositiveInteger}});var a8=TE();Object.defineProperty(_,"isNumeric",{enumerable:!0,get:function(){return a8.isNumeric}});var l8=CE();Object.defineProperty(_,"isBooleanLike",{enumerable:!0,get:function(){return l8.isBooleanLike}});var c8=LE();Object.defineProperty(_,"isDateLike",{enumerable:!0,get:function(){return c8.isDateLike}});var d8=EE();Object.defineProperty(_,"isBigInt",{enumerable:!0,get:function(){return d8.isBigInt}});var u8=By();Object.defineProperty(_,"isOneOf",{enumerable:!0,get:function(){return u8.isOneOf}});var p8=xE();Object.defineProperty(_,"isOneOfTypes",{enumerable:!0,get:function(){return p8.isOneOfTypes}});var m8=WE();Object.defineProperty(_,"isIntersectionOf",{enumerable:!0,get:function(){return m8.isIntersectionOf}});var g8=IE();Object.defineProperty(_,"isExtensionOf",{enumerable:!0,get:function(){return g8.isExtensionOf}});var f8=OE();Object.defineProperty(_,"isNullOr",{enumerable:!0,get:function(){return f8.isNullOr}});var h8=ME();Object.defineProperty(_,"isUndefinedOr",{enumerable:!0,get:function(){return h8.isUndefinedOr}});var y8=NE();Object.defineProperty(_,"isNilOr",{enumerable:!0,get:function(){return y8.isNilOr}});var S8=DE();Object.defineProperty(_,"isAsserted",{enumerable:!0,get:function(){return S8.isAsserted}});var P8=jE();Object.defineProperty(_,"isEnum",{enumerable:!0,get:function(){return P8.isEnum}});var A8=zE();Object.defineProperty(_,"isEqualTo",{enumerable:!0,get:function(){return A8.isEqualTo}});var b8=$E();Object.defineProperty(_,"isRegex",{enumerable:!0,get:function(){return b8.isRegex}});var _8=FE();Object.defineProperty(_,"isPattern",{enumerable:!0,get:function(){return _8.isPattern}});var w8=M();Object.defineProperty(_,"generateTypeGuardError",{enumerable:!0,get:function(){return w8.generateTypeGuardError}});var v8=UE();Object.defineProperty(_,"by",{enumerable:!0,get:function(){return v8.by}});var k8=BE();Object.defineProperty(_,"toNumber",{enumerable:!0,get:function(){return k8.toNumber}});var T8=GE();Object.defineProperty(_,"toDate",{enumerable:!0,get:function(){return T8.toDate}});var C8=qE();Object.defineProperty(_,"toBoolean",{enumerable:!0,get:function(){return C8.toBoolean}});var L8=VE();Object.defineProperty(_,"isSymbol",{enumerable:!0,get:function(){return L8.isSymbol}})});var ss,KE,E8,JE,XE=l(()=>{"use strict";ss=g(require("node:path")),KE=require("node:url"),E8=()=>!0,JE=()=>{if(E8()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?ss.default.dirname(ss.default.resolve(e)):ss.default.dirname(ss.default.resolve(__filename))}return ss.default.dirname((0,KE.fileURLToPath)(__agentWitchImportMetaUrl))}});var iS,YE,D,ZE,R8,Gt,aS,C,oa,qt,lS,na,jo,cS,dS,uS,sa,ge,eo,Yu,Ne,Zu,O,pS=l(()=>{"use strict";iS=g(require("node:fs")),YE=g(require("node:os")),D=g(require("node:path")),ZE=g(ns());Le();XE();Jd();Jd();R8=JE(),Gt=e=>e.trim().toLowerCase(),aS=e=>Gt(e).replace(/@/g,"-at-").replace(/\./g,"-").replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,""),C=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return D.default.resolve(e);let t=D.default.resolve(R8),r=D.default.basename(t),o=D.default.basename(D.default.dirname(t));return r===Sy&&(o===Ut||o===gr)?D.default.dirname(t):r===Ut||r===gr?t:D.default.join(YE.default.homedir(),Ut)},oa=(e=C())=>D.default.join(e,Sy),qt=(e=C())=>D.default.join(oa(e),gL),lS=(e,t,r)=>t!==null?D.default.join(e,Ge,t,r):D.default.join(e,r),na=e=>lS(e.installDir,e.profileEmail,qi),jo=e=>lS(e.installDir,e.profileEmail,kt),cS=e=>D.default.join(e.logsDir,Io),dS=e=>D.default.join(e.logsDir,Oo),uS=e=>lS(e.installDir,e.profileEmail,Vi),sa=e=>e.profileEmail!==null?D.default.join(e.installDir,Ge,e.profileEmail,Yr):D.default.join(e.installDir,Yr),ge=(e=C())=>Ki(e),eo=(e=C())=>Zr(e)?Gd:Bd,Yu=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Gt(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Gt(t):null},Ne=(e=C())=>{let t=D.default.join(e,yy);if(!iS.default.existsSync(t))return null;try{let r=JSON.parse(iS.default.readFileSync(t,"utf8"));if((0,ZE.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Gt(r.email)}catch{return null}return null},Zu=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Gt(r):null}let t=Yu();return t!==null?t:Ne()},O=e=>{let t=C(),r=oa(t),o=qt(t),n=Zu(e);if(n!==null){let S=D.default.join(t,Ge,n),h=D.default.join(S,qd),y=D.default.join(S,qi),p=D.default.join(S,kt),P=D.default.join(S,Vi),A=D.default.join(S,Yr),f=D.default.join(S,kt,Io),b=D.default.join(S,kt,Oo);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:p,mainLogPath:f,errorLogPath:b,reportsDir:P,deviceKeypairPath:A,configPath:D.default.join(S,"config.json"),harnessRootDir:h,harnessManifestPath:D.default.join(h,Kd),harnessSetsDir:D.default.join(h,Vd)}}let s=D.default.join(t,qd),i=D.default.join(t,qi),a=D.default.join(t,kt),c=D.default.join(t,Vi),d=D.default.join(t,Yr),u=D.default.join(t,kt,Io),m=D.default.join(t,kt,Oo);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:u,errorLogPath:m,reportsDir:c,deviceKeypairPath:d,configPath:D.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:D.default.join(s,Kd),harnessSetsDir:D.default.join(s,Vd)}}});var x8,is,mS=l(()=>{"use strict";x8=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},is=e=>e.filePort??x8(e.envValue)??e.defaultPort});var gS,QE,W8,I8,fS,as,eR=l(()=>{"use strict";gS=g(require("node:fs")),QE=g(require("node:path"));Le();pS();mS();W8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),I8=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,fS=e=>{let t=QE.default.join(e,Gi.wakePort);if(!gS.default.existsSync(t))return null;try{let r=JSON.parse(gS.default.readFileSync(t,"utf8"));if(W8(r)&&I8(r.wakePort))return r.wakePort}catch{return null}return null},as=(e=C())=>is({filePort:fS(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:eo(e)})});var tR={};gt(tR,{isAgentWitchLocalInstallDir:()=>Zr,readActiveProfileEmailFromFile:()=>Ne,readAgentWitchWakePortFromFile:()=>fS,resolveActiveProfileEmail:()=>Zu,resolveActiveProfileEmailFromEnv:()=>Yu,resolveAgentWitchAppBundlePath:()=>qt,resolveAgentWitchAppDir:()=>oa,resolveAgentWitchDefaultWakePort:()=>eo,resolveAgentWitchDeviceKeypairPath:()=>sa,resolveAgentWitchErrorLogPath:()=>dS,resolveAgentWitchInstallDir:()=>C,resolveAgentWitchLaunchAgentPrefix:()=>ge,resolveAgentWitchLocalLayout:()=>O,resolveAgentWitchLogsDir:()=>jo,resolveAgentWitchMainLogPath:()=>cS,resolveAgentWitchProjectsDir:()=>na,resolveAgentWitchReportsDir:()=>uS,resolveAgentWitchRuntimeWakePort:()=>as,resolveAgentWitchWakePortFromSources:()=>is,sanitizeProfileEmailForDir:()=>Gt,sanitizeProfileEmailForLaunchAgentLabel:()=>aS});var B=l(()=>{"use strict";pS();eR();mS()});var hS,yS,Qu=l(()=>{"use strict";hS=new Set(["","loginwindow","_mbsetupuser","root"]),yS=5e3});var rR,O8,oR,SS,PS=l(()=>{"use strict";rR=require("node:child_process");Qu();O8=e=>e.trim().toLowerCase(),oR=e=>e==null?!1:!hS.has(O8(e)),SS=()=>{if(process.platform!=="darwin")return null;try{let t=(0,rR.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return oR(t)?t:null}catch{return null}}});var sR,nR,Tt,ia=l(()=>{"use strict";sR=g(require("node:os"));PS();nR=e=>e.trim().toLowerCase(),Tt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?SS():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??sR.default.userInfo().username;return nR(r)===nR(o)}});var iR,aR,zo,lR=l(()=>{"use strict";iR=require("node:child_process"),aR=g(require("node:fs"));B();ia();zo=(e=C())=>{let t=qt(e);if(!aR.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!Tt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Ne(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,iR.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var cR,aa,ep=l(()=>{"use strict";cR=require("node:child_process"),aa=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,cR.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var tp,AS,dR,se,rp,la=l(()=>{"use strict";tp=g(require("node:fs")),AS=g(require("node:path"));B();Le();dR=e=>{let t=AS.default.join(e,Ge);return tp.default.existsSync(t)?tp.default.readdirSync(t).filter(r=>tp.default.statSync(AS.default.join(t,r)).isDirectory()).map(r=>Gt(r)).toSorted():[]},se=(e=C())=>{let t=ge(e),r=dR(e);return[{profileEmail:Ne(e)??r[0]??null,launchAgentLabel:t}]},rp=(e=C())=>dR(e)});var bS,uR,pR,M8,fr,op=l(()=>{"use strict";bS=g(require("node:fs")),uR=g(require("node:os")),pR=g(require("node:path"));B();la();M8=()=>pR.default.join(uR.default.homedir(),"Library","LaunchAgents"),fr=(e=C())=>{let t=ge(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of se(e))r.add(n.launchAgentLabel);let o=M8();if(bS.default.existsSync(o))for(let n of bS.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var mR,ca,gR=l(()=>{"use strict";B();ep();op();la();mR=(e=C())=>{let t=new Set(se(e).map(r=>r.launchAgentLabel));return fr(e).filter(r=>!t.has(r))},ca=(e=C())=>{for(let t of mR(e))aa(t)}});var da,_S=l(()=>{"use strict";B();ep();op();da=(e=C())=>{for(let t of fr(e))aa(t)}});var fR,hR,N8,$o,yR=l(()=>{"use strict";fR=require("node:child_process"),hR=require("node:util"),N8=(0,hR.promisify)(fR.execFile),$o=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await N8("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Ho,D8,wS,vS=l(()=>{"use strict";Ho=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),D8=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,wS=e=>{let t=e.pathValue??D8(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${Ho(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${Ho(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${Ho(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${Ho(e.homeDir)}</string>
    <key>PATH</key>
    <string>${Ho(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${Ho(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${Ho(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var np,kS=l(()=>{"use strict";np=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var ua,TS,sp,ip,hr,ap=l(()=>{"use strict";ua=g(require("node:fs")),TS=g(require("node:os")),sp=g(require("node:path"));Le();B();vS();kS();ip=(e,t=TS.default.homedir())=>sp.default.join(t,"Library","LaunchAgents",`${e}.plist`),hr=e=>{let t=e.installDir??C(),r=e.homeDir??TS.default.homedir(),o=ip(e.launchAgentLabel,r),n=ua.default.existsSync(o)?ua.default.readFileSync(o,"utf8"):null;if(n!==null&&np(n))return{ok:!0,rewritten:!1,plistPath:o};let s=wS({launchAgentLabel:e.launchAgentLabel,runPath:sp.default.join(t,mL,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??as(t)});if(!np(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{ua.default.mkdirSync(sp.default.dirname(o),{recursive:!0}),ua.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var PR,AR,bR,pa,j8,z8,SR,De,CS=l(()=>{"use strict";PR=require("node:child_process"),AR=g(require("node:fs")),bR=require("node:util");B();ap();ia();pa=(0,bR.promisify)(PR.execFile),j8=async e=>{try{return await pa("launchctl",["print",e]),!0}catch{return!1}},z8=async(e,t,r)=>{await j8(t)&&await pa("launchctl",["bootout",t]).catch(()=>{}),await pa("launchctl",["bootstrap",e,r]),await pa("launchctl",["enable",t])},SR=async e=>{try{return await pa("launchctl",["kickstart","-k",e]),!0}catch{return!1}},De=async(e,t=C())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!Tt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=hr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await SR(n))return{ok:!0};let i=s.plistPath;if(!AR.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await z8(o,n,i),await SR(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Fo,_R=l(()=>{"use strict";B();CS();la();Fo=async(e=C())=>{let t=[];for(let r of se(e))(await De(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var wR,vR,kR=l(()=>{"use strict";wR=/(<key>AGENT_WITCH_WAKE_PORT<\/key>\s*<string>)[^<]*(<\/string>)/,vR=(e,t)=>wR.test(e)?e.replace(wR,`$1${String(t)}$2`):null});var lp,TR,LS,CR=l(()=>{"use strict";lp=g(require("node:fs")),TR=g(require("node:os"));ap();kR();LS=e=>{let t=e.homeDir??TR.default.homedir(),r=[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`],o=[];for(let n of r){let s=ip(n,t);if(!lp.default.existsSync(s))continue;let i=lp.default.readFileSync(s,"utf8"),a=vR(i,e.wakePort);a===null||a===i||(lp.default.writeFileSync(s,a,"utf8"),o.push(s))}return o}});var nt,yr,LR=l(()=>{"use strict";_S();ia();Qu();nt=e=>{Tt()||(da(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},yr=(e,t=yS)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{Tt()||e()},t);return()=>{clearInterval(r)}}});var re=l(()=>{"use strict";AL();lR();ep();gR();_S();op();ia();yR();_R();CS();ap();kS();CR();vS();la();PS();Qu();LR()});var ES=l(()=>{"use strict";re()});var ER,RR,cp,xR,ls,WR,IR,Uo=l(()=>{"use strict";ER=".agent-witch",RR="memory",cp="project.json",xR="chunks.ndjson",ls="runs.ndjson",WR="reports",IR=".json"});var OR=l(()=>{"use strict";Uo()});var MR,dp,RS=l(()=>{"use strict";MR=g(require("node:path"));OR();dp=(e,t)=>MR.default.join(e.trim(),`${t.trim()}${IR}`)});var ma,NR,DR=l(()=>{"use strict";ma="agent-witch.js",NR="command"});var up=l(()=>{"use strict";DR()});var Bo,jR,zR=l(()=>{"use strict";up();Bo=e=>`'${e.replace(/'/g,"'\\''")}'`,jR=e=>{let t=`${e.installDir.trim()}/${"app"}/${ma}`,r=[Bo("node"),Bo(t),"report","write","--key",Bo(e.reportKey.trim()),"--agent-run-id",Bo(e.agentRunId.trim()),"--status",Bo(e.status),"--summary",Bo(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Bo(e.details.trim())),r.join(" ")}});var Vt,$R,$8,xS,pp=l(()=>{"use strict";RS();zR();Vt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},$R=e=>e===Vt.COMPLETED||e===Vt.FAILED,$8=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),xS=(e,t)=>{let r=dp(t.reportsDir,t.reportKey),o=jR({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Vt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${$8({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var je=l(()=>{"use strict";Le();B()});var fa,FR,HR,UR,H8,cs,F8,BR,ha,ya,WS,GR,qR,Sa=l(()=>{"use strict";fa=g(require("node:fs")),FR=g(require("node:path"));pp();RS();je();HR=50,UR=e=>{let t=O(),r=dp(t.reportsDir,e);return fa.default.mkdirSync(FR.default.dirname(r),{recursive:!0}),r},H8=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},cs=e=>{let t=UR(e);if(!fa.default.existsSync(t))return null;try{let r=JSON.parse(fa.default.readFileSync(t,"utf8"));return H8(r)?r:null}catch{return null}},F8=(e,t)=>{let r=[...e,t];return r.length>HR?r.slice(r.length-HR):r},BR=e=>{let t=UR(e.reportKey);fa.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},ha=e=>{let t=cs(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:F8(t?.history??[],o)};return BR(n),n},ya=e=>{let t=cs(e.reportKey);return t!==null?t:ha({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Vt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},WS=(e,t)=>{let r=t.trim();if(r.length===0)return cs(e);let o=cs(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return BR(s),s},GR=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},qR=e=>{if(e===null||!$R(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Vt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var U8,B8,Pa,VR,mp,IS=l(()=>{"use strict";pp();Sa();U8=new Set(Object.values(Vt)),B8=e=>U8.has(e),Pa=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},VR=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},mp=e=>{if(e[0]!=="write")return VR(),1;let r=Pa(e,"--key"),o=Pa(e,"--agent-run-id"),n=Pa(e,"--status"),s=Pa(e,"--summary"),i=Pa(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!B8(n)?(VR(),1):(ha({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var st,Go=l(()=>{"use strict";st=()=>!0});var OS,KR,qo,gp=l(()=>{"use strict";OS=g(require("node:path")),KR=require("node:url");Go();qo=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=OS.default.resolve(t);return st()?r===OS.default.resolve(__filename):e===void 0?!1:r===(0,KR.fileURLToPath)(e)}});var fp,ds,V8,vse,us=l(()=>{"use strict";fp="agent-witch.js",ds="deps.tar.gz",V8="install.sh",vse={mainScript:`app/${fp}`,depsArchive:`app/${ds}`,installShell:V8}});var ZR=l(()=>{"use strict";us()});var QR=l(()=>{"use strict";us();ZR()});var Aa,NS,hp,K8,ba,ze,ms,_a,wa,Vo,DS=l(()=>{"use strict";Aa=g(require("node:fs")),NS=g(require("node:path"));QR();B();hp="install-version.json",K8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ba=(e=C())=>NS.default.join(e,hp),ze=(e=C())=>{let t=ba(e);if(!Aa.default.existsSync(t))return null;try{let r=JSON.parse(Aa.default.readFileSync(t,"utf8"));return!K8(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},ms=(e,t=C())=>{let r=ba(t);Aa.default.mkdirSync(NS.default.dirname(r),{recursive:!0}),Aa.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},_a=(e=C())=>ze(e)?.bundleVersion??"258",wa=(e,t)=>{let r=ze(e);if(r!==null)return r;let o={bundleVersion:"258",appOrigin:t,updatedAt:new Date().toISOString()};return ms(o,e),o},Vo=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var ex,Ko,jS,zS,$S,yp,Kt,Jo,HS=l(()=>{"use strict";ex=require("node:crypto"),Ko=g(require("node:fs")),jS=g(require("node:path"));B();zS="self-update-log.ndjson",$S=100,yp=(e=C())=>{let t=O(),r=t.installDir===e?t.logsDir:jo({installDir:e,profileEmail:t.profileEmail});return jS.default.join(r,zS)},Kt=(e,t=C())=>{let r={id:(0,ex.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=yp(t);Ko.default.mkdirSync(jS.default.dirname(o),{recursive:!0});let n=Ko.default.existsSync(o)?Ko.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-$S+1)),JSON.stringify(r)];return Ko.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Jo=(e=20,t=C())=>{let r=yp(t);if(!Ko.default.existsSync(r))return[];let o=Ko.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var FS,Hse,US=l(()=>{"use strict";us();FS="deps",Hse=`${"app"}/${ds}`});var tx=l(()=>{"use strict";US()});var rx,to,Xo,ox,BS,GS,nx=l(()=>{"use strict";rx=require("node:child_process"),to=g(require("node:fs")),Xo=g(require("node:path"));us();US();ox=e=>Xo.default.join(e,"app",FS),BS=e=>{let t=Xo.default.join(e,"app"),r=Xo.default.join(t,ds);to.default.existsSync(r)&&(to.default.rmSync(ox(e),{recursive:!0,force:!0}),to.default.mkdirSync(t,{recursive:!0}),(0,rx.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),to.default.rmSync(r,{force:!0}))},GS=e=>{to.default.rmSync(Xo.default.join(e,"node_modules"),{recursive:!0,force:!0}),to.default.rmSync(Xo.default.join(e,"package.json"),{force:!0}),to.default.rmSync(Xo.default.join(e,"package-lock.json"),{force:!0})}});var sx=l(()=>{"use strict";tx();nx()});var va,ka=l(()=>{"use strict";va="agent-witch.service"});var ix=l(()=>{"use strict";ka()});var Sp,Pp,Ap=l(()=>{"use strict";Sp="AGENT_WITCH_EXTERNAL_BRIDGE",Pp="AGENT_WITCH_EXTERNAL_LIVE"});var ax=l(()=>{"use strict";Ap();ka()});var lx,qS,cx=l(()=>{"use strict";lx=require("node:child_process");ka();qS=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,lx.spawn)("systemctl",["--user","restart",va],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${va} exited ${o??"unknown"}`))})})});var dx=l(()=>{"use strict";ka();ix();ax();cx()});var it,bp,ux=l(()=>{"use strict";it="https://www.agentwitch.com",bp="wss://www.agentwitch.com/api/agent-witch/ws"});var Ta,Sr,px=l(()=>{"use strict";Ta="127.0.0.1",Sr=`http://${Ta}:43347`});var ft=l(()=>{"use strict";ux();px()});var Ca,_p,mx,KS,X8,gx,YS,fx,Ct,La,Ea,ZS,JS,XS,Ra,xa,QS,eP,gs=l(()=>{"use strict";Ca=g(require("node:fs")),_p=g(require("node:path")),mx="active-writer-work.json",KS=new Set,X8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gx=e=>e.profileEmail===null?_p.default.join(e.installDir,mx):_p.default.join(e.installDir,"profiles",e.profileEmail,mx),YS=e=>{let t=gx(e);if(!Ca.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Ca.default.readFileSync(t,"utf8"));return!X8(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},fx=(e,t)=>{let r=gx(e);Ca.default.mkdirSync(_p.default.dirname(r),{recursive:!0}),Ca.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Ct=e=>YS(e).activeCount>0,La=e=>{let t=YS(e);fx(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},Ea=e=>{let t=YS(e),r=Math.max(0,t.activeCount-1);if(fx(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of KS)o()},ZS=e=>(KS.add(e),()=>{KS.delete(e)}),JS=null,XS=null,Ra=e=>{JS=e},xa=e=>{XS=e},QS=()=>{let e=JS;return JS=null,e},eP=()=>{let e=XS;return XS=null,e}});var Ee,wp=l(()=>{"use strict";Ee=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var fs,vp,Wa,tP=l(()=>{"use strict";fs="qwen2.5:7b",vp="nomic-embed-text",Wa="Install Ollama from https://ollama.com/download"});var Ia,rP,kp=l(()=>{"use strict";tP();Ia=()=>`
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
    echo "Ollama is missing. ${Wa}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Wa}" >&2
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
  agent_witch_ensure_ollama_model "${fs}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${vp}" "\${pull_log}"
}
`,rP=()=>`
${Ia()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var hx,Y8,Tp,oP=l(()=>{"use strict";hx=require("node:child_process");B();kp();Y8=e=>new Promise(t=>{let r=(0,hx.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:C()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Tp=async(e=Y8)=>{let t=`${Ia()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var ro,Cp,yx,Z8,Sx,ys,Q8,e3,t3,hs,Yo,Zo,Px=l(()=>{"use strict";ro=g(require("node:fs")),Cp=g(require("node:path"));sx();dx();re();B();us();ft();DS();gs();wp();HS();oP();yx=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Z8=e=>{let t=Ne(e),r=t===null?O():O(t);if(!ro.default.existsSync(r.configPath))return null;try{let o=JSON.parse(ro.default.readFileSync(r.configPath,"utf8"));return!yx(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},Sx=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!yx(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},ys=async e=>(await Sx(e))?.bundleVersion??null,Q8=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Cp.default.join(t,r);ro.default.mkdirSync(Cp.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());ro.default.writeFileSync(n,s),r.endsWith(".js")&&ro.default.chmodSync(n,493)},e3=async()=>{if(process.platform==="linux"){try{await qS()}catch(e){let t=e instanceof Error?e.message:String(e);console.warn(`[agent-witch-self-update] Linux service restart skipped: ${t}`)}return}ca(),await Fo()},t3=(e,t)=>e!==null?Ee(e):t??it,hs=(e,t)=>({localBundleVersion:t,...e}),Yo=async e=>{let t=C(),r=ze(t),o=r?.bundleVersion??null,n=await Tp();Kt({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=Z8(t),i=t3(s,r?.appOrigin);if(i===null){let d=hs({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return Kt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await Sx(i);if(a===null){let d=hs({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return Kt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||Vo(o,a.bundleVersion))){let d=hs({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Kt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await Q8(i,t,S);let d=Cp.default.join(t,fp);ro.default.existsSync(d)&&ro.default.rmSync(d,{force:!0}),BS(t),GS(t),ms({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=O(Ne(t));if(Ct(u)){xa("install-bundle-update");let S=hs({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Kt({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await e3();let m=hs({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Kt({event:"update_applied",ok:!0,message:m.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}catch(d){let u=d instanceof Error?d.message:"Agent Witch self-update failed.",m=hs({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},o);return Kt({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},Zo=()=>{let e=C();return{local:ze(e),logs:Jo(20,e)}}});var Ax={};gt(Ax,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>hp,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Wa,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>vp,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>fs,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>zS,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>$S,appendAgentWitchSelfUpdateLog:()=>Kt,buildAgentWitchEnsureOllamaShell:()=>Ia,buildAgentWitchInstallScriptOllama:()=>rP,buildAgentWitchSelfUpdateStatus:()=>Zo,ensureAgentWitchInstallVersionRecorded:()=>wa,ensureAgentWitchOllamaInstalled:()=>Tp,fetchAgentWitchRemoteInstallBundleVersion:()=>ys,isRemoteAgentWitchBundleVersionNewer:()=>Vo,readAgentWitchInstallVersion:()=>ze,readAgentWitchSelfUpdateLogs:()=>Jo,resolveAgentWitchAppOriginFromWsUrl:()=>Ee,resolveAgentWitchHeartbeatInstallBundleVersion:()=>_a,resolveAgentWitchInstallVersionPath:()=>ba,resolveAgentWitchSelfUpdateLogPath:()=>yp,runAgentWitchSelfUpdate:()=>Yo,writeAgentWitchInstallVersion:()=>ms});var Jt=l(()=>{"use strict";DS();HS();Px();wp();tP();kp();oP()});var nP={};gt(nP,{buildAgentWitchSelfUpdateStatus:()=>Zo,fetchAgentWitchRemoteInstallBundleVersion:()=>ys,runAgentWitchSelfUpdate:()=>Yo});var sP=l(()=>{"use strict";Jt()});function Ss(e){return(0,bx.createHash)("sha256").update(e.trim()).digest("hex")}var bx,Lp=l(()=>{"use strict";bx=require("node:crypto")});var Ps,Oa,r3,As,iP,Ep=l(()=>{"use strict";Ps=g(require("node:fs")),Oa=g(require("node:path"));Lp();je();r3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),As=e=>{if(!Ps.default.existsSync(e))return null;try{let t=JSON.parse(Ps.default.readFileSync(e,"utf8"));return!r3(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Ss(t.pairingToken.trim())}catch{return null}},iP=(e=C())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(As(Oa.default.join(e,"config.json")));let n=Oa.default.join(e,Ge);if(!Ps.default.existsSync(n))return t;for(let s of Ps.default.readdirSync(n)){let i=Oa.default.join(n,s);Ps.default.statSync(i).isDirectory()&&o(As(Oa.default.join(i,"config.json")))}return t}});var bs,Ma=l(()=>{"use strict";bs="connection-health.json"});var Qo,Rp,o3,Na,Se,aP,xp,Re,Wp=l(()=>{"use strict";Qo=g(require("node:fs")),Rp=g(require("node:path"));Ma();o3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Na=e=>e.profileEmail===null?Rp.default.join(e.installDir,bs):Rp.default.join(e.installDir,"profiles",e.profileEmail,bs),Se=e=>{let t=Na(e);if(!Qo.default.existsSync(t))return null;try{let r=JSON.parse(Qo.default.readFileSync(t,"utf8"));return!o3(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},aP=e=>{let t=Na(e);Qo.default.existsSync(t)&&Qo.default.rmSync(t,{force:!0})},xp=(e,t)=>{let r=Na(e),o=Se(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Qo.default.mkdirSync(Rp.default.dirname(r),{recursive:!0}),Qo.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Re=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var Da,_x=l(()=>{"use strict";Ma();Wp();Da=(e,t)=>{if(!t.socketOpen)return!1;let r=Se(e);return r===null?!1:!Re(r,t.staleAfterMs??12e4,t.nowMs)}});var lP,wx=l(()=>{"use strict";Wp();lP=(e,t)=>!(e!==null&&!Re(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var en=l(()=>{"use strict";Wp();_x();wx();Ma()});var Ip,cP,n3,s3,vx,kx=l(()=>{"use strict";Ip=g(require("node:fs")),cP=g(require("node:path"));B();Le();en();Ep();n3=12e4,s3=e=>{let t=cP.default.join(e,Ge);return Ip.default.existsSync(t)?Ip.default.readdirSync(t).filter(r=>Ip.default.statSync(cP.default.join(t,r)).isDirectory()):[]},vx=(e=C())=>{let t=null,r=-1;for(let o of s3(e)){let n=O(o),s=Se(n);if(s===null||Re(s,n3))continue;let i=As(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var dP,Tx,Op,ja,za,i3,a3,l3,Cx,fe,he,Mp,Xt,Lt=l(()=>{"use strict";dP=g(require("node:fs")),Tx=g(require("node:os")),Op=g(require("node:path")),ja={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},za=e=>e.trim().length>0,i3=e=>{let t=Op.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},a3=()=>{let e=Tx.default.homedir(),t=Op.default.join(e,".local","bin","agent");if(dP.default.existsSync(t))return t;let r=Op.default.join(e,".local","bin","cursor-agent");return dP.default.existsSync(r)?r:ja.cursorCommand},l3=e=>{let t=e.trim();return!za(t)||t===ja.cursorCommand?a3():t},Cx=(e,t)=>i3(e)?t:["agent",...t],fe=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",he=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:za(t)?t.trim():ja.claudeCommand,codexCommand:za(r)?r.trim():ja.codexCommand,cursorCommand:l3(o),antigravityCommand:za(n)?n.trim():ja.antigravityCommand}},Mp=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:Cx(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Xt=(e,t,r,o)=>{let n=t.trim();if(!za(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:Cx(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"--dangerously-skip-permissions","-p",n]}}});var oo,c3,tn,d3,_s,$a=l(()=>{"use strict";oo=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,c3=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:oo(s.inputTokens)+oo(s.outputTokens)+oo(s.cacheReadInputTokens)+oo(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},tn=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=oo(a.input_tokens)+oo(a.cache_creation_input_tokens)+oo(a.cache_read_input_tokens),d=oo(a.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:c3(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},d3=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),_s=(e,t)=>{let r=tn(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??d3(r)}}});var uP,u3,p3,pP,mP=l(()=>{"use strict";uP=e=>e.toLocaleString("en-US"),u3=e=>e<.01?e.toFixed(4):e.toFixed(3),p3=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${u3(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${uP(e.inputTokens)} in / ${uP(e.outputTokens)} out (${uP(e.totalTokens)} total)`,t].join(`
`)},pP=(e,t)=>{if(t===void 0)return e;let r=p3(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Np,gP=l(()=>{"use strict";Np={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var rn,fP,Dp,hP=l(()=>{"use strict";gP();rn="auto",fP=e=>({value:rn,label:`Auto (${Np[e]})`}),Dp={anthropic:[fP("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[fP("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[fP("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var ws,Ha,jp,vs=l(()=>{"use strict";gP();hP();ws=e=>{let t=e?.trim()??"";if(!(t.length===0||t===rn))return t},Ha=(e,t)=>{let r=ws(t);return r===void 0?Np[e]:r},jp=e=>{let t=ws(e);return t===void 0?rn:t}});var zp,m3,g3,$p,Lx=l(()=>{"use strict";zp={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},m3=e=>{let t=zp[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?zp["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?zp["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?zp["gemini-2.0-flash"]:null},g3=(e,t,r)=>{let o=m3(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},$p=e=>{let t=g3(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var ks,f3,h3,y3,Hp,Ex=l(()=>{"use strict";Lx();ks=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),f3=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=ks(r.input_tokens),n=ks(r.output_tokens);return o===0&&n===0?null:$p({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},h3=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=ks(r.prompt_tokens),n=ks(r.completion_tokens);return o===0&&n===0?null:$p({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},y3=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=ks(r.promptTokenCount),n=ks(r.candidatesTokenCount);return o===0&&n===0?null:$p({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Hp=(e,t,r)=>e==="anthropic"?f3(t,r):e==="openai"?h3(t,r):y3(t,r)});var S3,yP,P3,A3,b3,_3,w3,SP,PP=l(()=>{"use strict";vs();Ex();S3=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},yP=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Ha(e,t.model)},P3=async e=>{let t=yP("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=S3(o);n.length>0&&e.onChunk?.(n);let s=Hp("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},A3=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},b3=async e=>{let t=yP("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=A3(o);n.length>0&&e.onChunk?.(n);let s=Hp("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},_3=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},w3=async e=>{let t=yP("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=_3(n);s.length>0&&e.onChunk?.(s);let i=Hp("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},SP=async e=>{try{return e.provider==="anthropic"?await P3(e):e.provider==="openai"?await b3(e):await w3(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var at,Fa=l(()=>{"use strict";at=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var Rx,v3,Fp,AP=l(()=>{"use strict";Rx=g(require("node:path")),v3="writer-api-secrets.json",Fp=e=>Rx.default.join(e,v3)});var bP,xx,k3,no,Xe,so=l(()=>{"use strict";bP=g(require("node:fs"));vs();AP();xx=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),k3=e=>{if(!xx(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=ws(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},no=e=>{let t=Fp(e);if(!bP.default.existsSync(t))return{};try{let r=JSON.parse(bP.default.readFileSync(t,"utf8"));if(!xx(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=k3(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Xe=(e,t)=>no(e)[t]??null});var $e,Ua=l(()=>{"use strict";$e=e=>e==="api"?"api":"cli"});var Wx,We,on,Pr=l(()=>{"use strict";Wx=g(require("node:path"));Fa();so();Ua();We=e=>Wx.default.dirname(e),on=(e,t)=>{if($e(e.writerExecutionBackend)!=="api")return!1;let r=at(t);if(r===null)return!1;let o=We(e.layout.configPath),n=Xe(o,r);return n!==null&&n.apiKey.length>0}});var Ba,_P=l(()=>{"use strict";mP();PP();Fa();so();Pr();Ba=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=at(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=We(e.layout.configPath),a=Xe(i,s);if(a===null){let d=Object.keys(no(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await SP({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:pP(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var Ix,Ts,wP=l(()=>{"use strict";Ix=require("node:child_process");Lt();$a();_P();Pr();Ts=(e,t,r)=>new Promise(o=>{if(!fe(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(on(e,t)){Ba(e,t,r).then(o);return}let n=Xt(t,r,he({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,Ix.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=_s(i.join("")),u=a.join("").trim(),m=[d.output.trim(),u].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var Ox=l(()=>{"use strict"});var Mx=l(()=>{"use strict";mP();wP();PP();Ox();so();Pr()});var Nx,Dx,jx,zx=l(()=>{"use strict";Nx="claude",Dx="codex",jx="cursor"});var $x,T3,vP,Ga,Up=l(()=>{"use strict";$x=g(require("node:path"));ft();Le();T3="ws://localhost:3000/api/agent-witch/ws",vP=e=>e.replace(/\/$/,""),Ga=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return vP(t);let r=$x.default.basename(e.installDir);if(r===Bi.production)return bp;let o=e.configWsUrl?.trim()??"";return r===Bi.localhost?o.length>0?vP(o):T3:o.length>0?vP(o):bp}});var L3,kP,TP=l(()=>{"use strict";zx();Up();Ua();L3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kP=e=>{if(!L3(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Ga({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??Nx,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??Dx,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??jx,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:$e(t.writerExecutionBackend),layout:e.layout}}}});var CP,LP,EP=l(()=>{"use strict";CP=g(require("node:fs"));B();TP();LP=e=>{let t=O(e);if(!CP.default.existsSync(t.configPath))return null;try{let r=JSON.parse(CP.default.readFileSync(t.configPath,"utf8")),o=kP({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var qa,Hx=l(()=>{"use strict";qa=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var RP,E3,xP,Fx=l(()=>{"use strict";RP=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),E3=e=>{if(!RP(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!RP(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(m=>{if(!RP(m))return[];let S=typeof m.itemKey=="string"?m.itemKey.trim():"",h=typeof m.relativePath=="string"?m.relativePath:"",y=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:h,contentSha256:y}]});return u.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},xP=E3});var Ux,R3,Bp,WP=l(()=>{"use strict";Ux=g(require("node:path")),R3=(e,t)=>{let r=t.trim();return Ux.default.join(e,"components","store",r.slice(0,2),r)},Bp=R3});var Bx,x3,IP,Gx=l(()=>{"use strict";Bx=g(require("node:fs"));WP();x3=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Bp(e.installDir,n.contentSha256);Bx.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},IP=x3});var Va,Cs,W3,OP,I3,MP,NP=l(()=>{"use strict";Va=g(require("node:fs")),Cs=g(require("node:path"));WP();W3=(e,t)=>Cs.default.join(e.installDir,"runs",t,"overlay"),OP=(e,t)=>Cs.default.join(W3(e,t),".cursor"),I3=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=OP(e,t);Va.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Bp(e.installDir,i.contentSha256);if(!Va.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Cs.default.join(n,c):Cs.default.join(n,i.itemKey);Va.default.mkdirSync(Cs.default.dirname(d),{recursive:!0}),Va.default.copyFileSync(a,d)}return{ok:!0}},MP=I3});var DP,qx,O3,Ka,Vx=l(()=>{"use strict";DP=g(require("node:fs")),qx=g(require("node:path")),O3=(e,t)=>{let r=qx.default.join(e.installDir,"runs",t);DP.default.existsSync(r)&&DP.default.rmSync(r,{recursive:!0,force:!0})},Ka=O3});var M3,jP,Kx=l(()=>{"use strict";NP();M3=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=OP(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},jP=M3});var zP,N3,D3,j3,z3,$3,$,Jx=l(()=>{"use strict";zP=g(require("node:fs"));Up();B();Ua();N3="claude",D3="codex",j3="cursor",z3="agy",$3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=O();if(!zP.default.existsSync(e.configPath))return null;try{let t=JSON.parse(zP.default.readFileSync(e.configPath,"utf8"));if(!$3(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Ga({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:$e(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:N3,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:D3,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:j3,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:z3,pairingToken:s,layout:e}}catch{return null}}});var Gp,Xx,Yx=l(()=>{"use strict";Gp=g(require("node:fs"));AP();Xx=(e,t)=>{let r=Fp(e);Gp.default.mkdirSync(e,{recursive:!0}),Gp.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Gp.default.chmodSync(r,384)}catch{}}});var Ja,Zx,qp=l(()=>{"use strict";Ja=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},Zx=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Ja(t)}});var Xa,H3,$P,HP,Qx=l(()=>{"use strict";Xa=g(require("node:fs"));so();Yx();qp();vs();Pr();H3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$P=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=Zx(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?ws(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},HP=e=>{let t=We(e.configPath),r={};if(Xa.default.existsSync(e.configPath))try{let n=JSON.parse(Xa.default.readFileSync(e.configPath,"utf8"));H3(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Xa.default.mkdirSync(t,{recursive:!0}),Xa.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=$P($P($P(no(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);Xx(t,o)}});var Vp,FP=l(()=>{"use strict";Vp={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var UP,eW=l(()=>{"use strict";Fa();so();Pr();Pr();UP=(e,t)=>{if(on(e,t)||t==="antigravity")return!1;let r=at(t);if(r===null)return!1;let o=We(e.layout.configPath),n=Xe(o,r);return n===null||n.apiKey.trim().length===0}});var tW,BP,GP=l(()=>{"use strict";tW=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},BP=async e=>{let t=tW(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=tW(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var F3,qP,rW=l(()=>{"use strict";re();EP();GP();F3=1e4,qP=()=>BP({listProfileEmails:rp,readConfig:LP,pollIntervalMs:F3,logWaiting:e=>{console.error(e)}})});var le=l(()=>{"use strict";wP();Mx();EP();Up();Hx();Fx();Gx();NP();Vx();Kx();Ua();Jx();Qx();so();Pr();qp();vs();FP();_P();Pr();eW();Fa();so();rW();TP();GP()});var oW,VP,nW=l(()=>{"use strict";oW=g(require("node:path"));B();Le();kx();Lp();Ep();le();VP=(e=C())=>{let t=vx(e);if(t!==null)return t;let r=Ne(e);if(r!==null){let n=As(oW.default.join(e,Ge,r,"config.json"));if(n!==null)return n}let o=$()?.pairingToken.trim()??"";return o.length===0?null:Ss(o)}});var Kp,sW,U3,B3,iW,Jp,Ya,Xp,Za=l(()=>{"use strict";Kp=g(require("node:fs")),sW=g(require("node:path")),U3="wake-port.json",B3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),iW=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Jp=e=>sW.default.join(e,U3),Ya=e=>{let t=Jp(e);if(!Kp.default.existsSync(t))return null;try{let r=JSON.parse(Kp.default.readFileSync(t,"utf8"));if(B3(r)&&iW(r.wakePort))return r.wakePort}catch{return null}return null},Xp=(e,t)=>{if(!iW(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Jp(e);Kp.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Bce,Gce,qce,Et,aW,Qa=l(()=>{"use strict";B();Za();je();Za();Bce=eo(),Gce=`${ge()}-wake`,qce=ge(),Et=()=>{let e=C();return is({filePort:Ya(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:eo(e)})},aW=e=>{let t=C();Ya(t)===null&&Xp(t,e)}});var lW=l(()=>{"use strict";Lp();re();Ep();nW();le();Qa()});var KP,el,tl,cW=l(()=>{"use strict";KP=g(require("node:os"));lW();el=()=>{let e=se();return{ok:!0,port:Et(),hostname:KP.default.hostname(),profileCount:e.length}},tl=()=>{let e=se(),t=VP(),r=iP();return{hostname:KP.default.hostname(),port:Et(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var JP=l(()=>{"use strict";cW()});var dW,uW,pW,Yp,Ls=l(()=>{"use strict";dW="materialization.json",uW="backups",pW=".gitignore",Yp=e=>`harness-set:${e.trim()}`});var mW,gW,Zp,fW=l(()=>{"use strict";mW=g(require("node:crypto")),gW=g(require("node:fs")),Zp=e=>{try{let t=gW.default.readFileSync(e);return mW.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var io,nn,G3,hW,XP,yW=l(()=>{"use strict";io=g(require("node:fs")),nn=g(require("node:path"));fW();G3=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=nn.default.join(t,n,o);return io.default.mkdirSync(nn.default.dirname(s),{recursive:!0}),io.default.copyFileSync(r,s),nn.default.relative(e,s).replaceAll("\\","/")},hW=e=>{let t=nn.default.join(e.repoRoot,e.repoRelativeDestination),r=Zp(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(io.default.existsSync(t)){let n=Zp(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=G3(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return io.default.mkdirSync(nn.default.dirname(t),{recursive:!0}),io.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return io.default.mkdirSync(nn.default.dirname(t),{recursive:!0}),io.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},XP=e=>{let t=Zp(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var YP,SW,Es,Qp=l(()=>{"use strict";YP=g(require("node:fs"));Ls();SW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Es=e=>{if(!YP.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(YP.default.readFileSync(e,"utf8"));if(SW(t)&&t.version===1&&SW(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var ao,em,tm,ZP=l(()=>{"use strict";ao=g(require("node:fs")),em=g(require("node:path"));Ls();tm=e=>{let t=new Set(e.setSlugs.map(s=>Yp(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=em.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=em.default.join(e.repoRoot,i.backupPath);ao.default.existsSync(c)?(ao.default.mkdirSync(em.default.dirname(a),{recursive:!0}),ao.default.copyFileSync(c,a),o.push(s)):ao.default.existsSync(a)&&ao.default.rmSync(a,{force:!0})}else ao.default.existsSync(a)&&ao.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var QP,Rs,rm=l(()=>{"use strict";QP=g(require("node:path"));Ls();Rs=e=>({ledgerFilePath:QP.default.join(e.metaDirPath,dW),backupsDirPath:QP.default.join(e.metaDirPath,uW)})});var eA,PW,AW=l(()=>{"use strict";eA=g(require("node:path")),PW=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return eA.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return eA.default.posix.join(s,e,n)}});var tA,bW,ol,rA=l(()=>{"use strict";tA=g(require("node:fs")),bW=g(require("node:path")),ol=(e,t)=>{tA.default.mkdirSync(bW.default.dirname(e),{recursive:!0}),tA.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var oA,q3,Ye,sn=l(()=>{"use strict";oA=g(require("node:os")),q3=e=>{let t=e.trim();return t.startsWith("~/")?`${oA.default.homedir()}${t.slice(1)}`:t==="~"?oA.default.homedir():t},Ye=q3});var om,_W,V3,wW,vW=l(()=>{"use strict";om=g(require("node:fs")),_W=g(require("node:path"));Ls();Uo();V3=`*
!${cp}
`,wW=e=>{let t=_W.default.join(e,pW);om.default.existsSync(t)||(om.default.mkdirSync(e,{recursive:!0}),om.default.writeFileSync(t,V3))}});var an,ht,ln=l(()=>{"use strict";an=g(require("node:path"));Uo();sn();ht=e=>{let t=Ye(e),r=an.default.join(t,ER);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:an.default.join(r,"rag"),memoryDirPath:an.default.join(r,RR),reportsDirPath:an.default.join(r,WR),metaFilePath:an.default.join(r,cp),ragChunksFilePath:an.default.join(r,"rag",xR)}}});var Yt,TW,K3,J3,qe,nm=l(()=>{"use strict";Yt=g(require("node:fs")),TW=g(require("node:path"));Uo();vW();ln();K3=(e,t)=>{if(Yt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Yt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},J3=e=>{Yt.default.existsSync(e.ragChunksFilePath)||Yt.default.writeFileSync(e.ragChunksFilePath,"");let t=TW.default.join(e.memoryDirPath,ls);Yt.default.existsSync(t)||Yt.default.writeFileSync(t,"")},qe=e=>{let t=ht(e.projectFolderPath);return Yt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Yt.default.mkdirSync(t.ragDirPath,{recursive:!0}),Yt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),wW(t.metaDirPath),K3(t,e),J3(t),{ok:!0,layout:t}}});var CW,LW,EW,RW,sm,im=l(()=>{"use strict";CW="components",LW="store",EW="versions",RW="installed.json",sm=e=>`harness-set:${e.trim()}`});var nA,xW,am,sA=l(()=>{"use strict";nA=g(require("node:fs")),xW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),am=e=>{if(!nA.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(nA.default.readFileSync(e,"utf8"));if(xW(t)&&t.version===1&&xW(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var nl,xs,lm=l(()=>{"use strict";nl=g(require("node:path"));im();xs=e=>{let t=nl.default.join(e,CW);return{componentsRootDir:t,storeDir:nl.default.join(t,LW),versionsDir:nl.default.join(t,EW),installedFilePath:nl.default.join(t,RW)}}});var iA,WW,cm,dm,um=l(()=>{"use strict";iA=g(require("node:crypto")),WW=g(require("node:fs")),cm=e=>iA.default.createHash("sha256").update(e,"utf8").digest("hex"),dm=e=>{try{let t=WW.default.readFileSync(e);return iA.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var aA,IW,OW,MW=l(()=>{"use strict";aA=g(require("node:fs")),IW=g(require("node:path")),OW=(e,t)=>{aA.default.mkdirSync(IW.default.dirname(e),{recursive:!0}),aA.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var lA,cA,NW,DW=l(()=>{"use strict";lA=g(require("node:fs")),cA=g(require("node:path")),NW=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=cA.default.join(e,r),n=cA.default.join(o,`${t.versionId}.json`);lA.default.mkdirSync(o,{recursive:!0}),lA.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var pm,jW,zW,$W=l(()=>{"use strict";pm=g(require("node:fs")),jW=g(require("node:path"));um();zW=e=>{let t=cm(e.content),r=jW.default.join(e.storeDir,t);return pm.default.existsSync(r)||(pm.default.mkdirSync(e.storeDir,{recursive:!0}),pm.default.writeFileSync(r,e.content)),t}});var dA,HW,X3,mm,uA=l(()=>{"use strict";dA=g(require("node:fs")),HW=g(require("node:path"));im();sA();lm();um();MW();DW();$W();X3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mm=e=>{let t=xs(e.installDir),r=sm(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!X3(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=HW.default.join(e.harnessRootDir,a);if(!dA.default.existsSync(c))continue;let d=dA.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:dm(c);if(u!==null){if(cm(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);zW({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:u})}}if(n.length===0)return;NW(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=am(t.installedFilePath);OW(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var mA,pA,FW,UW=l(()=>{"use strict";mA=g(require("node:fs"));uA();sA();lm();pA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),FW=e=>{if(!mA.default.existsSync(e.harnessManifestPath))return;let t=xs(e.installDir),r=am(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(mA.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!pA(o)||o.version!==1||!pA(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!pA(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];mm({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var gA,BW,GW,qW=l(()=>{"use strict";gA=g(require("node:fs")),BW=g(require("node:path")),GW=e=>{let t=e.componentId.replaceAll("/","_"),r=BW.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!gA.default.existsSync(r))return null;try{let o=JSON.parse(gA.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var gm,fm,VW,KW=l(()=>{"use strict";gm=g(require("node:fs")),fm=g(require("node:path"));im();UW();qW();lm();um();VW=e=>{FW({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=xs(e.layout.installDir),r=sm(e.setSlug),o=GW({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=fm.default.join(t.storeDir,i.contentSha256);if(gm.default.existsSync(a)&&dm(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?fm.default.join(e.layout.harnessRootDir,n):fm.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!gm.default.existsSync(s))return null;try{if(!gm.default.statSync(s).isFile())return null}catch{return null}return s}});var JW,Y3,fA,Zt,sl=l(()=>{"use strict";Qp();rm();ln();JW="harness-set:",Y3=e=>{let t=e.trim();if(!t.startsWith(JW))return null;let r=t.slice(JW.length).trim();return r.length>0?r:null},fA=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=Y3(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Zt=e=>{let t=ht(e),{ledgerFilePath:r}=Rs(t),o=Es(r);return fA(o)}});var hm,hA,il,Z3,Ar,al,Ws=l(()=>{"use strict";hm=g(require("node:fs")),hA=g(require("node:os")),il=g(require("node:path")),Z3=()=>hm.default.realpathSync(il.default.resolve(hA.default.homedir())),Ar=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?il.default.join(hA.default.homedir(),t.slice(1)):t,o;try{o=hm.default.realpathSync(il.default.resolve(r))}catch{return null}let n=Z3();return o===n||o.startsWith(`${n}${il.default.sep}`)?o:null},al=e=>{let t=Ar(e);if(t===null)return null;try{if(!hm.default.statSync(t).isFile())return null}catch{return null}return t}});var yA,SA=l(()=>{"use strict";yA=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Sm,XW,ym,Q3,ll,PA=l(()=>{"use strict";Sm=g(require("node:fs")),XW=g(require("node:path"));Ls();yW();Qp();ZP();rm();AW();rA();sn();nm();KW();sl();Ws();SA();ym=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Q3=e=>{if(!Sm.default.existsSync(e))return null;try{let t=JSON.parse(Sm.default.readFileSync(e,"utf8"));if(ym(t)&&t.version===1)return t}catch{return null}return null},ll=e=>{let t=[...new Set(e.setSlugs.map(A=>A.trim()).filter(A=>A.length>0))],r=Ye(e.projectFolderPath),o=Ar(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Sm.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=qe({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Rs(s.layout),d=Zt(o).filter(A=>!t.includes(A)),u=Es(i),m=0;if(d.length>0){let A=tm({repoRoot:o,setSlugs:d,ledger:u});u=A.ledger,m=A.summary.removedPaths.length}if(t.length===0)return ol(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let S=Q3(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=ym(S.sets)?S.sets:{},y=0,p=0,P=0;for(let A of t){let f=h[A];if(!ym(f))return{ok:!1,errorMessage:`Harness set "${A}" is not installed locally.`};let b=typeof f.version=="number"?String(f.version):"1",w=Yp(A),k=Array.isArray(f.items)?f.items:[];for(let T of k){if(!ym(T))continue;let L=typeof T.path=="string"?T.path.trim():"";if(L.length===0)continue;let x=yA(L);if(x===null)continue;let I=PW(A,x),N=XW.default.posix.join(".cursor",I).replaceAll("\\","/"),U=typeof T.id=="string"?T.id.trim():"",q=VW({layout:e.layout,setSlug:A,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:L,manifestItemId:U});if(q===null)continue;let V=hW({repoRoot:o,backupsDir:a,repoRelativeDestination:N,sourceAbsolutePath:q,componentId:w,versionId:b,ledger:u});if(V.kind==="skipped_unchanged"){p+=1;continue}if(V.kind==="backed_up_user_file"){P+=1,y+=1,u={version:1,entries:{...u.entries,[N]:XP({componentId:w,versionId:b,sourceAbsolutePath:q,backupPath:V.backupPath})}};continue}y+=1,u={version:1,entries:{...u.entries,[N]:XP({componentId:w,versionId:b,sourceAbsolutePath:q})}}}}return y===0&&p===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(ol(i,u),{ok:!0,writtenFileCount:y,skippedFileCount:p,backedUpFileCount:P,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var YW,Pm,e6,t6,r6,o6,n6,s6,i6,a6,l6,cl,Am=l(()=>{"use strict";YW=g(require("node:crypto")),Pm=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},e6=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},t6=(e,t)=>{let r=e6(t),o=Pm(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},r6=(e,t,r)=>{let o=t6(t,r);return`shared/items/${e}/${o}`},o6=["rules","skills","commands","instructions","agents"],n6=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),s6=(e,t)=>[...e.filter(o=>o.id!==t.id),t],i6=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},a6=e=>YW.default.createHash("sha256").update(e,"utf8").digest("hex"),l6=e=>({id:e.id,kind:e.kind,title:e.title,path:r6(e.id,e.kind,e.title),contentSha256:a6(e.content)}),cl=e=>{let t=new Date().toISOString(),r=e.existingManifest??n6(e.hostname,t),o=Pm(e.bundle.slug),n=i6(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...o6.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let m=l6(u);return{files:[...d.files,{relativePath:m.path,content:u.content}],nextItems:s6(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var lo,ZW,bm,c6,cn,AA=l(()=>{"use strict";lo=g(require("node:fs")),ZW=g(require("node:os")),bm=g(require("node:path"));Am();c6=e=>{if(!lo.default.existsSync(e))return null;try{let t=JSON.parse(lo.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},cn=e=>{try{let t=c6(e.layout.harnessManifestPath),r=cl({bundle:e.bundle,hostname:ZW.default.hostname(),existingManifest:t});lo.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)lo.default.mkdirSync(bm.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=bm.default.join(e.layout.harnessRootDir,o.relativePath);lo.default.mkdirSync(bm.default.dirname(n),{recursive:!0}),lo.default.writeFileSync(n,o.content)}return lo.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var bA,QW=l(()=>{"use strict";AA();PA();bA=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=cn({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return ll({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var e0,t0=l(()=>{"use strict";e0=["rule","skill","command","instruction","agent"]});var r0,d6,u6,Qt,_A=l(()=>{"use strict";t0();r0=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),d6=e=>typeof e=="string"&&e0.includes(e),u6=e=>{if(!r0(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!d6(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Qt=e=>{if(!r0(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=u6(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var o0,p6,wA,n0=l(()=>{"use strict";o0=require("node:zlib");_A();p6="x-agent-witch-token",wA=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[p6]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,o0.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Qt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var kA,vA,er,s0=l(()=>{"use strict";kA=g(require("node:fs")),vA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),er=e=>{if(!kA.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(kA.default.readFileSync(e.harnessManifestPath,"utf8"));if(!vA(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=vA(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!vA(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var _m,i0=l(()=>{"use strict";_m=()=>"~"});var a0,l0,c0=l(()=>{"use strict";a0=require("node:crypto"),l0=e=>`local-${(0,a0.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var TA,d0=l(()=>{"use strict";TA=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var dl,wm,CA=l(()=>{"use strict";dl=g(require("node:path")),wm=e=>{let t=dl.default.dirname(e),r=dl.default.basename(t);return r==="agents"?dl.default.basename(dl.default.dirname(t)):r}});var ul,br,u0,m6,g6,f6,vm,p0,LA=l(()=>{"use strict";ul=g(require("node:fs")),br=g(require("node:path"));c0();d0();CA();u0=new Set(["node_modules",".git","dist","build",".next","coverage"]),m6=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},g6=(e,t)=>{let r=br.default.basename(t);if(e==="skill"){let o=t.split(br.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},f6=e=>{let t=[],r=(n,s)=>{let i;try{i=ul.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&u0.has(a.name))continue;let c=br.default.join(n,a.name),d=s?br.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;TA(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=br.default.join(e,n);ul.default.existsSync(s)&&r(s,n)}let o=br.default.join(e,"skills");return ul.default.existsSync(o)&&r(o,"skills"),t},vm=e=>{let t=f6(e);if(t.length===0)return null;let r=br.default.dirname(e),o=wm(e),n=m6(o),s=t.map(i=>{let a=TA(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:l0(i.absolutePath),kind:a,title:g6(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},p0=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=ul.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||u0.has(a.name))continue;let c=br.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var m0,EA,h6,RA,g0=l(()=>{"use strict";m0=g(require("node:fs")),EA=g(require("node:path"));LA();Ws();h6=e=>{let t=Ar(e.trim());if(t===null)return null;if(EA.default.basename(t)===".cursor")return t;let r=EA.default.join(t,".cursor");try{if(m0.default.statSync(r).isDirectory())return Ar(r)}catch{return null}return null},RA=e=>{let t=h6(e.projectPath);if(t===null)return null;let r=vm(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var f0,y6,km,xA,h0=l(()=>{"use strict";f0=g(require("node:path"));LA();Ws();CA();y6=5,km=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},xA=e=>{let t=Ar(e.scanRoot.trim());if(t===null)return km(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of p0(t,y6,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=Ar(s);if(i===null)continue;let a=wm(i);km(e.response,"folder",{cursorDir:i,groupName:a,repoPath:f0.default.dirname(i)});let c=vm(i);c!==null&&(r.push(c),km(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return km(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var y0,S0,P0=l(()=>{"use strict";y0=g(require("node:path")),S0=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:y0.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Ve,A0,WA,S6,IA,OA,Tm,MA,pl,b0=l(()=>{"use strict";Ve=g(require("node:fs")),A0=g(require("node:os")),WA=g(require("node:path"));Am();uA();Ws();P0();S6=e=>{if(!Ve.default.existsSync(e))return null;try{let t=JSON.parse(Ve.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},IA=e=>{let t=e.hostname??A0.default.hostname(),r=S6(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let c=[];for(let u of a){let m=al(u.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let S=Ve.default.readFileSync(m,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:S,setSlugs:[i.slug]})}let d=cl({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Ve.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Ve.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=WA.default.join(e.layout.harnessRootDir,i.relativePath);Ve.default.mkdirSync(WA.default.dirname(a),{recursive:!0}),Ve.default.writeFileSync(a,i.content)}Ve.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=Pm(i.slug),d=r.sets[c];d!==void 0&&mm({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},OA="reveal-cache.json",Tm=(e,t)=>{Ve.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Ve.default.writeFileSync(`${e.harnessRootDir}/${OA}`,`${JSON.stringify(t,null,2)}
`)},MA=e=>{let t=`${e.harnessRootDir}/${OA}`;Ve.default.existsSync(t)&&Ve.default.unlinkSync(t)},pl=e=>{let t=`${e.harnessRootDir}/${OA}`;if(!Ve.default.existsSync(t))return null;try{let r=JSON.parse(Ve.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return S0(r)}catch{return null}return null}});var co=l(()=>{"use strict";PA();QW();SA();AA();n0();_A();Am();s0();i0();g0();Ws();h0();b0()});var NA,_0=l(()=>{"use strict";co();je();NA=e=>{let t=O(e.profileEmail);return cn({bundle:e.bundle,layout:t})}});var w0=l(()=>{"use strict";_0();co()});var P6,v0,A6,k0,dn,Cm,T0=l(()=>{"use strict";P6=["agentwitch.com","www.agentwitch.com"],v0=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,A6=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},k0=e=>{let t=A6(e);return!!(P6.includes(t)||v0.test(e.trim().toLowerCase()))},dn=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return k0(r)?v0.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Cm=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:dn(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var ml=l(()=>{"use strict";T0()});var _r,gl=l(()=>{"use strict";_r=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var fl,C0=l(()=>{"use strict";w0();ml();gl();fl=e=>{if(!_r(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Qt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!dn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=NA({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var DA=l(()=>{"use strict";C0()});var b6,Is,jA=l(()=>{"use strict";b6=e=>e==="hourly"||e==="daily"||e==="weekdays",Is=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!b6(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var hl,Lm,L0,E0,zA,Rt,Em,Rm,xm,Wm,Im=l(()=>{"use strict";hl=g(require("node:fs")),Lm=g(require("node:path"));jA();L0="automations.json",E0=e=>e.profileEmail!==null?Lm.default.join(e.installDir,"profiles",e.profileEmail,L0):Lm.default.join(e.installDir,L0),zA=()=>({version:1,automations:[]}),Rt=e=>{let t=E0(e);if(!hl.default.existsSync(t))return zA();try{let r=JSON.parse(hl.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?zA():{version:1,automations:r.automations.flatMap(n=>{let s=Is(n);return s!==null?[s]:[]})}}catch{return zA()}},Em=(e,t)=>{let r=E0(e);hl.default.mkdirSync(Lm.default.dirname(r),{recursive:!0}),hl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Rm=(e,t)=>{Em(e,{version:1,automations:t})},xm=(e,t)=>{let o=Rt(e).automations.filter(n=>n.id!==t.id);Em(e,{version:1,automations:[...o,t]})},Wm=(e,t)=>Rt(e).automations.find(r=>r.id===t)??null});var He,wr=l(()=>{"use strict";He="x-agent-witch-token"});var $A=l(()=>{"use strict";wp();kp()});var Y,un,HA,yl,FA,_6,UA,Sl,pn,BA,Os=l(()=>{"use strict";wr();$A();Y=e=>{let t=Ee(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},un=e=>({[He]:e,"Content-Type":"application/json"}),HA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:un(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},yl=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:un(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},FA=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:un(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},_6=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},UA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:un(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Sl=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:un(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return _6(r)}catch{return null}},pn=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:un(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},BA=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:un(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var mn,R0,x0,w6,GA,W0,qA=l(()=>{"use strict";mn=g(require("node:fs")),R0=g(require("node:path")),x0=e=>R0.default.join(e.harnessRootDir,"projects-registry.json"),w6=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),GA=e=>{let t=x0(e);if(!mn.default.existsSync(t))return[];try{let r=JSON.parse(mn.default.readFileSync(t,"utf8"));return w6(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},W0=e=>{let t=x0(e);if(!mn.default.existsSync(t))return;let r=`${t}.migrated`;if(mn.default.existsSync(r)){mn.default.unlinkSync(t);return}mn.default.renameSync(t,r)}});var I0,v6,k6,O0,M0=l(()=>{"use strict";sn();I0=e=>Ye(e),v6=e=>new Set(e.map(t=>I0(t.folderPath))),k6=e=>new Set(e.map(t=>t.id)),O0=(e,t)=>{let r=v6(t),o=k6(t),n=[],s=new Set;for(let i of e){let a=I0(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var VA,KA=l(()=>{"use strict";Os();qA();M0();VA=async(e,t)=>{let r=GA(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Sl(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=O0(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await UA(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&W0(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var JA,vr,Pl=l(()=>{"use strict";JA=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),vr=(e,t)=>e.find(r=>r.id===t)??null});var uo,Al=l(()=>{"use strict";Os();KA();Pl();uo=async(e,t)=>{t!==void 0&&await VA(t,e);let r=Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Sl(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=JA(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var N0=l(()=>{"use strict"});var T6,C6,Om,XA=l(()=>{"use strict";T6="Default",C6=e=>e.trim().toLowerCase()===T6.toLowerCase(),Om=C6});var Q,D0,L6,E6,R6,x6,W6,po,Mm=l(()=>{"use strict";XA();Q=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),D0=(e,t)=>e.length===0?`<p class="empty">${Q(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Q(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Q(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,L6=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,E6=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from Agent Witch Cloud.":"This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Q(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},R6=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
        <p><strong>${Q(r)}</strong> <span class="muted">already in this repo</span></p>
        <form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this Mac.');">
          <input type="hidden" name="projectId" value="${Q(e.project.id)}" />
          <input type="hidden" name="setSlug" value="${Q(r)}" />
          <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
        </form>
      </li>`).join("")}</ul>`;return e.boundHarnessCount>0?`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Nothing is installed in the Mac profile \u2014 refresh from Agent Witch Cloud only if you need an update.</p>
        ${t}
        <form method="POST" action="/projects/pull-bound-harness" class="actions">
          <input type="hidden" name="projectId" value="${Q(e.project.id)}" />
          <button class="btn btn-secondary" type="submit">Refresh in repo\u2026</button>
        </form>
      </div>`:`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Open Harness to install playbooks on this Mac if you want to change them.</p>
        ${t}
        <div class="actions">
          <a class="btn btn-secondary" href="/harness">Open Harness</a>
        </div>
      </div>`},x6=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?R6({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?E6({project:e.project,alreadyInRepo:!1}):L6();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),u=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this Mac.');">
            <input type="hidden" name="projectId" value="${Q(e.project.id)}" />
            <input type="hidden" name="setSlug" value="${Q(c.slug)}" />
            <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
          </form>`:"";return`<li class="harness-installed-set">
          <label class="check-row">
            <input form="link-harness-form" type="checkbox" name="applySet" value="${Q(c.slug)}"${t.size===0||d?" checked":""} />
            <span><strong>${Q(c.name)}</strong> <span class="muted mono">(${Q(c.slug)})</span></span>
          </label>
          <p class="muted">${c.itemCount} item(s)${d?' \xB7 <span class="muted">in repo</span>':""}</p>
          ${u}
        </li>`}).join("")}</ul>`;return`<div class="stack">
        <form id="link-harness-form" method="POST" action="/projects/link-harness">
          <input type="hidden" name="projectId" value="${Q(e.project.id)}" />
          <p class="field-label">Installed</p>
          <p class="lede">${n}</p>
        </form>
        ${a}
        <div class="actions">
          <button form="link-harness-form" class="${i}" type="submit">${s}</button>
        </div>
      </div>`},W6=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Q(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Q(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},po=e=>{let t=e.flashError?`<div class="alert-error">${Q(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Q(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(m,S)=>`<a class="project-tab${e.activeTab===m?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${m}">${Q(S)}</a>`,n=e.composition?.items.filter(m=>m.kind==="workflow")??[],s=e.composition?.items.filter(m=>m.kind==="agent")??[],i="";e.activeTab==="harness"?i=x6({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=D0(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=D0(s,"No agents installed for this project yet."):i=W6({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});let a=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,c=`${a}?rename=1`,d=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${Q(a)}" target="_blank" rel="noopener noreferrer">Open in Agent Witch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${Q(c)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,u=Om(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from Agent Witch Cloud only. The folder on this Mac is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from Agent Witch Cloud? Your repo folder on this Mac will stay.');">
          <input type="hidden" name="projectId" value="${Q(e.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Q(e.project.name)}</h1>
      <p class="muted mono">${Q(e.project.projectFolderPath)}</p>
      ${d}
      <div class="actions"><a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(e.project.id)}">Change folder\u2026</a></div>
      <nav class="project-tabs" aria-label="Project composition">
        ${o("harness",`Playbooks (${r.harness})`)}
        ${o("workflows",`Workflows (${r.workflow})`)}
        ${o("agents",`Agents (${r.agent})`)}
        ${o("knowledge",`Knowledge (${e.knowledgeCandidateCount})`)}
      </nav>
      <div class="project-tab-panel">
        ${i}
      </div>
    </section>${u}`}});var I6,O6,j0,z0=l(()=>{"use strict";co();wr();I6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),O6=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[He]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!I6(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Qt(n);return s===null?[]:[s]})}catch{return null}},j0=O6});var $0,YA,H0=l(()=>{"use strict";le();co();Mm();Al();z0();Pl();sl();Os();ft();$0=e=>({kind:"page",title:e.project.name,body:po({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:er(e.layout),linkedSetSlugs:Zt(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),YA=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let o=await uo(r,e.layout),n=vr(o.projects,t);if(n===null)return{kind:"not_found"};let s=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??it,a=s===null?null:await j0(s,n.id);if(a===null)return $0({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=bA({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return $0({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await pn(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var F0,ZA,U0=l(()=>{"use strict";le();co();ft();Os();Mm();nm();sn();Al();Pl();sl();Qp();ZP();rm();rA();F0=e=>({kind:"page",title:e.project.name,body:po({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:er(e.layout),linkedSetSlugs:Zt(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),ZA=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=$();if(n===null)return{kind:"not_found"};let s=await uo(n,e.layout),i=vr(s.projects,r);if(i===null)return{kind:"not_found"};let a=Y({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??it;if(o.length===0)return F0({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=Ye(i.projectFolderPath),u=qe({projectFolderPath:d}),{ledgerFilePath:m}=Rs(u.layout),S=Es(m),h=fA(S);if(!h.includes(o))return F0({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let y=h.filter(f=>f!==o),p=tm({repoRoot:u.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:S});ol(m,p.ledger);let P=a===null?!1:await pn(a,i.id,y),A=new URLSearchParams({linked:"1",removed:o,files:String(p.summary.removedPaths.length),bindingsSynced:P?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${A.toString()}`}}});var M6,QA,B0=l(()=>{"use strict";M6=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,QA=M6});var G0=l(()=>{"use strict"});var q0=l(()=>{"use strict"});var V0=l(()=>{"use strict";G0();q0()});var N6,mo,K0=l(()=>{"use strict";N6=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],mo=(e=process.env)=>{let t={...e};for(let r of N6)delete t[r];return t}});var J0=l(()=>{"use strict";K0()});var eb,X0=l(()=>{"use strict";eb={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var tb=l(()=>{"use strict";X0()});var Nm,rb=l(()=>{"use strict";Nm={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var Dm=l(()=>{"use strict";V0();J0();ft();tb();rb()});var Y0,Z0,D6,jm,zm,Q0=l(()=>{"use strict";Y0=require("node:child_process"),Z0=require("node:util");Dm();D6=(0,Z0.promisify)(Y0.execFile),jm=async(e,t)=>{try{let{stdout:r}=await D6("git",t,{cwd:e,env:mo(),maxBuffer:1048576});return r.trim()}catch{return null}},zm=async e=>{let t=await jm(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await jm(e,["rev-parse","--abbrev-ref","HEAD"]),o=await jm(e,["status","--porcelain"]),n=await jm(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var ob,eI=l(()=>{"use strict";ob=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var j6,nb,tI=l(()=>{"use strict";j6=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},nb=j6});var z6,sb,rI=l(()=>{"use strict";wr();z6=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[He]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},sb=z6});var oI,go,nI=l(()=>{"use strict";oI=require("node:child_process"),go=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,oI.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var sI=l(()=>{"use strict";Al()});var bl,iI=l(()=>{"use strict";wr();bl=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[He]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var ib,aI=l(()=>{"use strict";wr();ib=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[He]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var tr=l(()=>{"use strict";Al();Pl();N0();sn();nm();H0();U0();sl();B0();Q0();eI();tI();rI();nI();sI();iI();aI();KA();qA();Os()});var $m,_l,lI,ab,gn,lb=l(()=>{"use strict";$m=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},_l=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=$m(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},lI=e=>e>=1&&e<=5,ab=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return $m(t,"UTC")},gn=e=>{let t=e.from??new Date,r=$m(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return _l(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=_l(r,e.timeZone,o,0),s=$m(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?_l(ab(r),e.timeZone,o,0):n;if(!i&&lI(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=ab(a),lI(a.weekday))return _l(a,e.timeZone,o,0);return _l(ab(r),e.timeZone,o,0)}});var cI,cb,kr,db=l(()=>{"use strict";cI=require("node:crypto");le();tr();lb();Im();cb=!1,kr=async e=>{if(cb)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=Wm(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};cb=!0;let n=(0,cI.randomUUID)();try{let s=await Ts(t,"claude-cli",o.prompt);await BA(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=gn({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return xm(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{cb=!1}}});var Hm,dI=l(()=>{"use strict";le();db();Im();Hm=async()=>{let e=$();if(e===null)return;let t=Rt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await kr(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var wl=l(()=>{"use strict";Im();dI();db();lb()});var uI=l(()=>{"use strict";wl()});var pI=l(()=>{"use strict";jA()});var mI=l(()=>{"use strict";pI()});var ub=l(()=>{"use strict";wl()});var $6,H6,vl,pb=l(()=>{"use strict";uI();mI();ub();je();$6=e=>e!==void 0&&e.trim().length>0?O(e.trim()):O(),H6=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??gn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??gn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},vl=e=>{let t=$6(e.profileEmail),r=Rt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Is(s);return i!==null?[H6(i,o.get(i.id))]:[]});return Rm(t,n),{ok:!0,writtenCount:n.length}}});var mb=l(()=>{"use strict";wl()});var gI=l(()=>{"use strict";le()});var fI=l(()=>{"use strict";pb();mb();ub();gI()});var hI,kl,Tl,Cl,yI=l(()=>{"use strict";hI=g(require("node:os"));fI();ml();gl();kl=e=>{if(!_r(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!dn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=vl({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Tl=async e=>{if(!_r(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:dn(t)?kr(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Cl=()=>{let e=$(),t=e!==null?Rt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:hI.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var gb=l(()=>{"use strict";yI()});var Fm=l(()=>{"use strict";re()});var Um=l(()=>{"use strict";re()});var Bm,PI,AI,SI,F6,U6,Ms,fb=l(()=>{"use strict";Bm=g(require("node:fs")),PI=g(require("node:os")),AI=g(require("node:path"));Fm();Um();Za();je();SI=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},F6=e=>AI.default.join(PI.default.homedir(),"Library","LaunchAgents",`${e}.plist`),U6=async e=>Bm.default.existsSync(F6(e))?(await De(e)).ok:!1,Ms=async(e=C())=>{let t=Bm.default.existsSync(Jp(e)),r=!Bm.default.existsSync(qt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Ya(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await SI(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${ge(e)}-wake`;await U6(i)&&s.push(i);for(let c of se(e))(await De(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await SI(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var bI=l(()=>{"use strict";re()});var hb=l(()=>{"use strict";en();re()});var yb=l(()=>{"use strict";en()});var Sb=l(()=>{"use strict";re()});var wI,_I,Ll,Pb=l(()=>{"use strict";wI=g(require("node:fs"));ft();Fm();Um();je();_I=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},Ll=async(e=C())=>{if(!wI.default.existsSync(qt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await _I())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of se(e))(await De(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await _I();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var vI=l(()=>{"use strict";re()});var kI,fn,Ab,B6,G6,q6,TI,V6,CI,Ns,Gm=l(()=>{"use strict";kI=require("node:crypto"),fn=g(require("node:fs")),Ab=g(require("node:path"));je();B6="watchdog-log.ndjson",G6=200,q6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),TI=(e=C())=>{let t=O(),r=t.installDir===e?t.logsDir:jo({installDir:e,profileEmail:t.profileEmail});return Ab.default.join(r,B6)},V6=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!q6(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},CI=(e,t=C())=>{let r={id:(0,kI.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=TI(t);fn.default.mkdirSync(Ab.default.dirname(o),{recursive:!0});let n=fn.default.existsSync(o)?fn.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-G6+1)),JSON.stringify(r)];return fn.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Ns=(e=20,t=C())=>{let r=TI(t);if(!fn.default.existsSync(r))return[];let o=fn.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=V6(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var bb,_b,wb,vb=l(()=>{"use strict";Le();bb=Gi.watchdogReinstallState,_b=900*1e3,wb=3e3});var LI=l(()=>{"use strict";vb()});var EI={};gt(EI,{verifyAgentWitchReviveAfterKickstart:()=>J6});var K6,J6,RI=l(()=>{"use strict";LI();yb();Sb();je();K6=e=>new Promise(t=>{setTimeout(t,e)}),J6=async e=>{if(await K6(e.verifyDelayMs??wb),!await $o(e.launchAgentLabel))return!1;let r=e.profileEmail===null?O():O(e.profileEmail),o=Se(r);return!Re(o,e.staleAfterMs)}});var El,kb,X6,xI,WI,Tb,Cb,Lb=l(()=>{"use strict";El=g(require("node:fs")),kb=g(require("node:path"));B();vb();X6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xI=e=>kb.default.join(e,bb),WI=(e=C())=>{let t=xI(e);if(!El.default.existsSync(t))return null;try{let r=JSON.parse(El.default.readFileSync(t,"utf8"));return!X6(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},Tb=(e=C(),t=Date.now())=>{let r=WI(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=_b:!0},Cb=(e=C(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=xI(e);return El.default.mkdirSync(kb.default.dirname(o),{recursive:!0}),El.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var Eb,II=l(()=>{"use strict";re();Lb();Eb=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!Tb())return{attempted:!1,ok:!1,targets:e};Cb();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await De(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var OI=l(()=>{"use strict";Lb();II()});var Rb=l(()=>{"use strict";Jt()});var MI=l(()=>{"use strict";Jt()});var NI,Ds,DI,jI,zI,Y6,Z6,$I,Q6,eJ,HI,FI=l(()=>{"use strict";NI=require("node:child_process"),Ds=g(require("node:fs")),DI=g(require("node:os")),jI=g(require("node:path")),zI=require("node:util");Rb();MI();je();Y6=(0,zI.promisify)(NI.execFile),Z6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$I=e=>{let t=Ne(e),r=t===null?O():O(t);if(!Ds.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Ds.default.readFileSync(r.configPath,"utf8"));return!Z6(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},Q6=e=>$I(e)?.wsUrl??null,eJ=e=>{let t=Q6(e);return t!==null?Ee(t):ze(e)?.appOrigin??null},HI=async e=>{let t=e?.installDir??C(),r=$I(t),o=r!==null?Ee(r.wsUrl):eJ(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=jI.default.join(DI.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Ds.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??Ne(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await Y6("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Ds.default.existsSync(i)&&Ds.default.unlinkSync(i)}}});var UI={};gt(UI,{attemptAgentWitchWatchdogReinstall:()=>tJ});var tJ,BI=l(()=>{"use strict";OI();FI();tJ=async e=>Eb(e,()=>HI())});var GI,qI,VI,rJ,oJ,nJ,Rl,xb=l(()=>{"use strict";bI();hb();yb();Sb();Pb();fb();Fm();Um();je();gs();vI();Gm();GI=e=>e===null?O():O(e),qI=async(e,t,r)=>{if(!await $o(e))return"not_running";let n=GI(t);if(Ct(n))return"healthy";let s=Se(n);return Re(s,r)?"stale_connection":"healthy"},VI=async e=>{let t=e?.staleAfterMs??12e4,r=C(),o=se(r);return Promise.all(o.map(async n=>{let s=await qI(n.launchAgentLabel,n.profileEmail,t),i=GI(n.profileEmail),a=Se(i),c=await $o(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Re(a,t),needsRevive:s!=="healthy",reason:s}}))},rJ=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},oJ=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",nJ=async e=>{let t=await De(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(RI(),EI)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Rl=async e=>{if(!Tt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=C();await Ms(r),await Ll(r);let o=se(r),n=[];for(let u of o){let m=await qI(u.launchAgentLabel,u.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:m});continue}n.push(await nJ({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let u=zo();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(BI(),UI)),m=await u(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&CI({event:oJ(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:rJ(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var KI,qm,JI=l(()=>{"use strict";KI=g(require("node:os"));hb();Gm();xb();qm=async()=>{let e=await VI(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:KI.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Ns(1)[0]??null}}});var Wb=l(()=>{"use strict";fb();xb();JI();Gm()});var xl,Wl,Il,XI=l(()=>{"use strict";re();Wb();xl=async()=>{await Ms();let e=se(),t=[];for(let r of e){let o=await De(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=zo();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Wl=Rl,Il=Rl});var Ib=l(()=>{"use strict";XI()});var Km,Vm,YI,Ob,ZI,sJ,iJ,aJ,lJ,cJ,Jm,QI=l(()=>{"use strict";Km=require("node:child_process"),Vm=g(require("node:fs")),YI=g(require("node:os")),Ob=g(require("node:path")),ZI=require("node:util");re();B();sJ=(0,ZI.promisify)(Km.execFile),iJ=()=>Ob.default.join(YI.default.homedir(),"Library","LaunchAgents"),aJ=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await sJ("launchctl",["bootout",r]).catch(()=>{})},lJ=e=>{let t=Ob.default.join(iJ(),`${e}.plist`);Vm.default.existsSync(t)&&Vm.default.unlinkSync(t)},cJ=e=>{(0,Km.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Jm=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=C();if(!Vm.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=fr(e);for(let r of t)await aJ(r),lJ(r);return cJ(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var eO,Xm,tO,js,rO,dJ,uJ,pJ,Mb,mJ,Nb,oO=l(()=>{"use strict";eO=require("node:child_process"),Xm=g(require("node:fs")),tO=g(require("node:os")),js=g(require("node:path")),rO=require("node:util");re();dJ=(0,rO.promisify)(eO.execFile),uJ=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],pJ=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],Mb=e=>{Xm.default.existsSync(e)&&Xm.default.rmSync(e,{force:!0})},mJ=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await dJ("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},Nb=async e=>{let r=(e.listLaunchAgentLabels??fr)(e.layout.installDir),o=e.launchAgentsDir??js.default.join(tO.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??mJ;for(let i of r)await n(i),Mb(js.default.join(o,`${i}.plist`));let s=js.default.dirname(e.layout.configPath);for(let i of uJ)Mb(js.default.join(s,i));for(let i of pJ)Mb(js.default.join(e.layout.installDir,i));return Xm.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var Db,nO=l(()=>{"use strict";Db="unknown_identity"});var jb=l(()=>{"use strict";rb();nO()});var gJ,zb,sO=l(()=>{"use strict";jb();gJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zb=e=>e.type!=="system.error"||!gJ(e.payload)?!1:e.payload.errorCode===Db});var $b=l(()=>{"use strict";QI();oO();sO()});var Ym=l(()=>{"use strict";re();Jt();$b();Wb()});var zs,Zm,Qm=l(()=>{"use strict";Ym();zs=(e=20)=>Ns(e),Zm=qm});var eg,$s,tg,rg=l(()=>{"use strict";Ym();eg=Zo,$s=(e=20)=>Jo(e),tg=e=>Yo(e)});var og,Hb=l(()=>{"use strict";Ym();og=()=>Jm()});var iO=l(()=>{"use strict";JP();DA();gb();Ib();Qm();rg();Hb()});var aO={};gt(aO,{buildAgentWitchAutomationStatusFromWakeServer:()=>Cl,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>eg,buildAgentWitchWakeHealthResponse:()=>el,buildAgentWitchWakeIdentityResponse:()=>tl,buildAgentWitchWatchdogStatus:()=>Zm,installHarnessFromWakeServer:()=>fl,readAgentWitchSelfUpdateLogEntries:()=>$s,readAgentWitchWatchdogLogEntries:()=>zs,restartAgentWitchFromWakeServer:()=>Il,reviveAgentWitchWebSocketFromWakeServer:()=>Wl,runAgentWitchSelfUpdateFromWakeServer:()=>tg,runAgentWitchUninstallLocalFromWakeServer:()=>og,runAutomationFromWakeServer:()=>Tl,syncAutomationsFromWakeServer:()=>kl,wakeAgentWitchLaunchAgents:()=>xl});var lO=l(()=>{"use strict";iO()});var cO,dO,Fb,Ub,uO=l(()=>{"use strict";cO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),dO=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?cO(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?cO(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Fb=e=>{let t=e.watchdogLogs.map(dO).join(""),r=e.updateLogs.map(dO).join("");return`<!doctype html>
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
</html>`},Ub=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var pO,mO,gO=l(()=>{"use strict";pO=g(require("node:net")),mO=()=>new Promise((e,t)=>{let r=pO.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var fO,fJ,hJ,Bb,hO=l(()=>{"use strict";fO=g(require("node:net"));re();gO();Qa();Za();je();fJ=e=>new Promise(t=>{let r=fO.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),hJ=e=>new Promise(t=>{setTimeout(t,e)}),Bb=async(e={})=>{let t=C(),r=Et(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await fJ(r))return aW(r),r;i<o&&await hJ(n)}let s=await mO();Xp(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{LS({launchAgentPrefix:ge(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var yJ,Gb,yO=l(()=>{"use strict";yJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Gb=e=>({force:yJ(e)&&e.force===!0})});var Ol=l(()=>{"use strict";ml();uO();hO();yO();ES();gp();Go()});var qb,z,Vb,Kb,Ml,SO=l(()=>{"use strict";qb=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},z=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},Vb=e=>{e.writeHead(403),e.end()},Kb=e=>e.url?.split("?")[0]??"/",Ml=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var xt=l(()=>{"use strict";SO()});var SJ,PO,AO=l(()=>{"use strict";gb();xt();SJ=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},PO=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return z(e.response,200,Cl(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await SJ(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=kl(t);return z(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Tl(t);return z(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var PJ,_O,bO,wO,Jb,vO,Xb=l(()=>{"use strict";PJ=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],_O=e=>/embed|minilm|^bge-/i.test(e),bO=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),wO=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),Jb=e=>e.filter(t=>t.trim().length>0&&!_O(t)),vO=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!_O(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>bO(s,o));if(n!==void 0)return n}for(let n of PJ){let s=r.find(i=>bO(i,n));if(s!==void 0)return s}return r[0]??null}});var Yb,CO,LO,ng,EO,kO,TO,AJ,bJ,_J,wJ,vJ,kJ,Wt,Nl=l(()=>{"use strict";Yb=require("node:child_process"),CO=g(require("node:fs")),LO=g(require("node:os")),ng=g(require("node:path"));Jt();Lt();Xb();EO=3e3,kO=["claude-cli","codex","cursor","antigravity"],TO={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},AJ=(e,t)=>new Promise(r=>{let o=(0,Yb.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},EO);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),bJ=()=>{let e=LO.default.homedir();return["ollama",ng.default.join(e,".local","bin","ollama"),ng.default.join(e,".agent-witch","ollama","ollama"),ng.default.join(e,".local-agent-witch","ollama","ollama")]},_J=e=>new Promise(t=>{let r=(0,Yb.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},EO);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(wO(Buffer.concat(o).toString("utf8")))})}),wJ=async()=>{for(let e of bJ()){if(e!=="ollama"&&!CO.default.existsSync(e))continue;let t=await _J(e);if(t!==null)return t}return[]},vJ=e=>{let t=e.installedWriterIds.map(s=>TO[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=fe(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${TO[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},kJ=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:fs},Wt=async e=>{let t=kO.map(i=>{let a=Mp(i,e.commands);return AJ(a.command,a.args)}),[r,...o]=await Promise.all([wJ(),...t]),n=kO.flatMap((i,a)=>o[a]===!0?[i]:[]),s=vO(r,kJ());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:vJ({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var TJ,CJ,Zb,RO=l(()=>{"use strict";TJ="http://127.0.0.1:11434",CJ=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Zb=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||TJ;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?CJ(await o.json()):null}catch{return null}}});var Qb=l(()=>{"use strict";Lt();Nl();RO();Xb()});var LJ,xO,WO=l(()=>{"use strict";Qb();LJ={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},xO=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:LJ[t]})),ollamaModels:Jb(e.ollamaModels)})});var EJ,IO,OO=l(()=>{"use strict";Qb();xt();WO();EJ=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},IO=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Wt({commands:he({})});return z(e.response,200,{ok:!0,...xO({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await EJ(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await Zb({model:r,prompt:o});return n===null?(z(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(z(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var RJ,MO,NO=l(()=>{"use strict";DA();xt();RJ=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},MO=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await RJ(e);if(t===null)return!0;let r=fl(t);return z(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var DO=l(()=>{"use strict";tr()});var e_,jO=l(()=>{"use strict";DO();gl();e_=e=>{if(!_r(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:qe({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var zO,t_,r_=l(()=>{"use strict";le();tr();gl();zO=e=>{if(!_r(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},t_=async e=>{let t=zO(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=go("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=$();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Y({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(qe({projectFolderPath:r}),await bl(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var $O=l(()=>{"use strict";jO();r_()});var HO,FO=l(()=>{"use strict";$O();r_();xt();HO=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=e_(t);return z(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await t_(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return z(e.response,o,r,e.cors.headers),!0}return!1}});var UO,BO=l(()=>{"use strict";Ol();rg();Qm();UO=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=zs(50),r=$s(50);return e.response.writeHead(200,Ub()),e.response.end(Fb({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var GO,qO=l(()=>{"use strict";JP();xt();GO=e=>e.request.method==="GET"&&e.pathname==="/health"?(z(e.response,200,el(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(z(e.response,200,tl(),e.cors.headers),!0):!1});var VO,KO=l(()=>{"use strict";Hb();xt();VO=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await og();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}});var JO,XO=l(()=>{"use strict";Ib();xt();JO=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Wl();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Il();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await xl();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var YO,ZO=l(()=>{"use strict";Ol();rg();xt();YO=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=eg();return z(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Ml(e.request,"/update/logs",20,200);return z(e.response,200,{ok:!0,logs:$s(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=Gb(t),o=await tg({force:r});return z(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var QO,eM=l(()=>{"use strict";Qm();xt();QO=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Zm();return z(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Ml(e.request,"/watchdog/logs",20,200);return z(e.response,200,{ok:!0,logs:zs(t)},e.cors.headers),!0}return!1}});var tM,rM=l(()=>{"use strict";AO();OO();NO();FO();BO();qO();KO();XO();ZO();eM();tM=[GO,UO,QO,JO,YO,VO,MO,HO,PO,IO]});var oM,nM=l(()=>{"use strict";rM();oM=async e=>{for(let t of tM)if(await t(e))return!0;return!1}});var xJ,sM,iM=l(()=>{"use strict";ml();xt();nM();xJ=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:Kb(e),readJsonBody:()=>qb(e)}),sM=async(e,t,r)=>{let o=e.headers.origin,n=Cm(o);try{if(o!==void 0&&o.length>0&&!n.allowed){Vb(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=xJ(e,t,r,n);if(await oM(s))return;z(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{z(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var aM,hn,sg,ig=l(()=>{"use strict";aM=g(require("node:http"));Ol();iM();hn=async()=>{let e=await Bb(),t=aM.default.createServer((r,o)=>{sM(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},sg=hn});var lM={};gt(lM,{runAgentWitchBridgeCli:()=>WJ});var WJ,cM=l(()=>{"use strict";re();ig();WJ=async()=>{nt("agent-witch-bridge");let e=await hn(),t=yr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var dM=l(()=>{"use strict";ft()});var Hs,o_,uM=l(()=>{"use strict";Hs=(e,t,r)=>e===1?t:r,o_=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Hs(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Hs(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Hs(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Hs(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Hs(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${Hs(u,"year","years")} ago`}});var yn,n_,IJ,OJ,s_,fo,Dl,i_,pM=l(()=>{"use strict";yn=g(require("node:fs")),n_=g(require("node:path")),IJ="local-ws-traffic.ndjson",OJ=500,s_=e=>n_.default.join(e.logsDir,IJ),fo=(e,t)=>{let r=s_(e);yn.default.mkdirSync(n_.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});yn.default.appendFileSync(r,`${o}
`,"utf8")},Dl=(e,t=OJ)=>{let r=s_(e);if(!yn.default.existsSync(r))return[];let n=yn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},i_=e=>{let t=s_(e);yn.default.existsSync(t)&&yn.default.writeFileSync(t,"","utf8")}});var MJ,mM,gM,fM=l(()=>{"use strict";jb();MJ=new Set(Object.values(Nm)),mM=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gM=e=>{if(!mM(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!MJ.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!mM(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var hM,yM=l(()=>{"use strict";hM=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var NJ,DJ,jJ,jl,SM=l(()=>{"use strict";yM();NJ=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,DJ=e=>NJ.test(e),jJ=e=>hM(e),jl=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>jl(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&DJ(o)){r[o]=jJ(n);continue}r[o]=jl(n)}return r}});var rr,a_,zJ,$J,HJ,l_,PM,AM,bM,FJ,ag,Sn,lg,c_,_M=l(()=>{"use strict";rr=g(require("node:fs")),a_=g(require("node:path"));fM();SM();zJ="local-ws-trace.ndjson",$J=1e4,HJ=1440*60*1e3,l_=e=>a_.default.join(e.logsDir,zJ),PM=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},AM=e=>{if(!rr.default.existsSync(e))return;let t=rr.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-HJ,n=t.filter(s=>{let i=PM(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-$J);rr.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},bM=(e,t)=>{let r=l_(e);rr.default.mkdirSync(a_.default.dirname(r),{recursive:!0}),rr.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),AM(r)},FJ=e=>e.parsed===null?{_empty:!0}:jl(e.parsed),ag=(e,t,r)=>{let o=gM(r);bM(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:FJ(o)})},Sn=(e,t)=>{bM(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:jl({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},lg=(e,t=80)=>{let r=l_(e);if(AM(r),!rr.default.existsSync(r))return[];let o=rr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=PM(s);i!==null&&n.push(i)}return n.reverse()},c_=e=>{let t=l_(e);rr.default.existsSync(t)&&rr.default.writeFileSync(t,"","utf8")}});var ho,wM,UJ,d_,cg,vM=l(()=>{"use strict";ho=g(require("node:fs")),wM=g(require("node:path")),UJ=256e3,d_=e=>{ho.default.mkdirSync(wM.default.dirname(e),{recursive:!0}),ho.default.writeFileSync(e,"","utf8")},cg=(e,t=UJ)=>{if(!ho.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=ho.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=ho.default.openSync(e,"r");try{ho.default.readSync(a,i,0,s,n)}finally{ho.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var zl=l(()=>{"use strict";pM();_M();vM()});var u_,p_,kM=l(()=>{"use strict";u_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p_=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${u_(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${u_(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${u_(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var TM=l(()=>{"use strict";kM()});var m_,g_=l(()=>{"use strict";m_=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var f_=l(()=>{"use strict";Ma()});var h_,y_,CM=l(()=>{"use strict";f_();h_=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},y_=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var LM=l(()=>{"use strict";g_();CM()});var EM,$l,S_,Hl=l(()=>{"use strict";g_();EM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$l=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=EM(e),r=EM(m_(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},S_=`(function () {
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
})();`});var Pn,BJ,P_,RM=l(()=>{"use strict";Pn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),BJ=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},P_=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Pn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Pn(r.direction):Pn(r.kind),i=`trace-body-${o}`,a=Pn(BJ(r.body));return`<tr>
        <td title="${Pn(r.at)}">${Pn(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${Pn(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var WM,GJ,xM,A_,IM=l(()=>{"use strict";Le();ft();WM=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},GJ=e=>WM(e)===gr?es:Qn,xM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),A_=e=>{let t=GJ(e.installDir),o=`AW_HOME="$HOME/${WM(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${xM(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${xM(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var OM=l(()=>{"use strict";Hl();RM();IM();Hl()});var qJ,Tr,Fl=l(()=>{"use strict";qJ=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Tr=qJ});var MM,NM,DM,jM,zM,$M,HM,Fs=l(()=>{"use strict";MM="projects",NM="knowledge",DM="chunks.ndjson",jM="lessons.ndjson",zM="error-chunks.ndjson",$M="usage-stats.json",HM="knowledge-location.json"});var dg,VJ,ug,b_=l(()=>{"use strict";dg=g(require("node:path"));Fs();VJ=(e,t)=>{let r=t.trim(),o=dg.default.join(e.installDir,MM,r,NM);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:dg.default.join(o,DM),memoryRunsFilePath:dg.default.join(o,jM)}},ug=VJ});var __,KJ,FM,UM=l(()=>{"use strict";__=g(require("node:fs"));Fs();ln();KJ=e=>{let t=ht(e.projectFolderPath),r=`${t.metaDirPath}/${HM}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};__.default.mkdirSync(t.metaDirPath,{recursive:!0}),__.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},FM=KJ});var Us,GM,BM,JJ,qM,VM=l(()=>{"use strict";Us=g(require("node:fs")),GM=g(require("node:path"));Uo();ln();b_();UM();BM=(e,t)=>{Us.default.existsSync(e)&&(Us.default.existsSync(t)&&Us.default.statSync(t).size>0||(Us.default.mkdirSync(GM.default.dirname(t),{recursive:!0}),Us.default.copyFileSync(e,t)))},JJ=e=>{let t=ht(e.projectFolderPath),r=ug(e.layout,e.projectId),o=`${t.memoryDirPath}/${ls}`;BM(t.ragChunksFilePath,r.ragChunksFilePath),BM(o,r.memoryRunsFilePath),FM({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},qM=JJ});var w_,XJ,KM,JM=l(()=>{"use strict";w_=g(require("node:fs"));ln();XJ=e=>{let t=ht(e);if(!w_.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(w_.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},KM=XJ});var XM,YJ,Bs,pg=l(()=>{"use strict";XM=g(require("node:path"));Uo();ln();VM();JM();b_();YJ=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=KM(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){qM({layout:e.layout,projectFolderPath:t,projectId:o});let s=ug(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=ht(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:XM.default.join(n.memoryDirPath,ls),projectId:null}},Bs=YJ});var mg,QJ,gg,v_=l(()=>{"use strict";mg=g(require("node:fs"));Fs();QJ=(e,t=500)=>{if(!mg.default.existsSync(e))return;let r=mg.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);mg.default.writeFileSync(e,`${o.join(`
`)}
`)},gg=QJ});var fg,e7,An,k_=l(()=>{"use strict";fg=g(require("node:path"));Fs();pg();e7=e=>{let t=Bs(e);if(t===null)return null;let r=fg.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:fg.default.join(r,$M),errorChunksFilePath:fg.default.join(r,zM)}},An=e7});var ZM,Ul,QM,YM,T_,eN,o7,C_,tN,L_,E_,R_,x_=l(()=>{"use strict";ZM=require("node:crypto"),Ul=g(require("node:fs")),QM=g(require("node:path"));Fl();Fs();k_();YM=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),T_=e=>{if(!Ul.default.existsSync(e))return YM();try{let t=JSON.parse(Ul.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return YM()},eN=(e,t)=>{Ul.default.mkdirSync(QM.default.dirname(e),{recursive:!0}),Ul.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},o7=e=>{let t=Tr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,ZM.createHash)("sha256").update(o).digest("hex").slice(0,16)},C_=e=>{let t=An(e);return t===null?null:T_(t.usageStatsFilePath)},tN=e=>{if(e.chunkIds.length===0)return;let t=An(e);if(t===null)return;let r=T_(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;eN(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},L_=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=An(e);if(r===null)return null;let o=o7(t),n=T_(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return eN(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},E_=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,R_=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var Bl,rN,n7,s7,oN,i7,W_,Gl,Gs,I_,qs,O_,M_=l(()=>{"use strict";Bl=g(require("node:fs")),rN=g(require("node:path"));Fl();pg();v_();x_();n7="http://127.0.0.1:11434",s7="nomic-embed-text",oN=(e,t,r)=>Bs({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,i7=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},W_=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},Gl=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||n7,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||s7;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},Gs=(e,t,r)=>{let o=oN(e,t,r);if(o===null||!Bl.default.existsSync(o))return[];let n=Bl.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},I_=async e=>{let t=Tr(e.text),r=W_(t);if(r.length===0)return 0;let o=oN(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;Bl.default.mkdirSync(rN.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await Gl(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Bl.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return gg(o),n},qs=async e=>{let t=await Gl(e.query);if(t===null)return[];let r=e.minScore??0,s=Gs(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:i7(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return tN({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},O_=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var ql,nN,a7,l7,N_,D_,j_,sN=l(()=>{"use strict";ql=g(require("node:fs")),nN=g(require("node:path"));Fl();k_();v_();M_();a7=e=>{if(!ql.default.existsSync(e))return[];let t=ql.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},l7=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},N_=async e=>{let t=An(e);if(t===null)return 0;let r=Tr(e.text),o=W_(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;ql.default.mkdirSync(nN.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await Gl(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};ql.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return gg(n,200),s},D_=async e=>{let t=An(e);if(t===null)return[];let r=await Gl(e.query);if(r===null)return[];let o=e.minScore??.3;return a7(t.errorChunksFilePath).map(s=>({chunk:s,score:l7(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},j_=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var z_=l(()=>{"use strict";M_();x_();sN()});var be,$_,H_=l(()=>{"use strict";tb();be=eb,$_=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${be.gray50};
  --aw-zinc-100: ${be.gray100};
  --aw-zinc-200: ${be.gray200};
  --aw-zinc-400: ${be.gray400};
  --aw-zinc-500: ${be.gray500};
  --aw-zinc-600: ${be.gray600};
  --aw-zinc-700: ${be.gray700};
  --aw-zinc-800: ${be.gray900};
  --aw-zinc-900: ${be.gray900};
  --aw-brand-600: ${be.brand600};
  --aw-brand-700: ${be.brand700};
  --aw-brand-50: ${be.brand50};
  --aw-emerald-50: ${be.success50};
  --aw-emerald-700: ${be.success700};
  --aw-amber-50: ${be.warning50};
  --aw-amber-900: ${be.warning900};
  --aw-red-50: ${be.error50};
  --aw-red-700: ${be.error700};
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

.card h1 + .empty {
  margin-top: 1rem;
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

.btn-danger {
  background: #fff;
  color: var(--aw-error-600, #dc2626);
  border: 1px solid color-mix(in srgb, var(--aw-error-600, #dc2626) 35%, transparent);
  box-shadow: var(--aw-shadow-sm);
}
.btn-danger:hover {
  background: color-mix(in srgb, var(--aw-error-600, #dc2626) 8%, #fff);
}

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

.history-dialog-bar form {
  margin: 0;
}

.history-dialog-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: 1px solid transparent;
  border-radius: var(--aw-radius-lg);
  background: transparent;
  color: var(--aw-zinc-500);
  cursor: pointer;
  font: inherit;
}

.history-dialog-close:hover {
  background: var(--aw-zinc-100);
  color: var(--aw-zinc-700);
}

.history-dialog-close:focus-visible {
  outline: 2px solid var(--aw-brand-600);
  outline-offset: 2px;
}

.history-dialog-close-icon {
  width: 1.125rem;
  height: 1.125rem;
  display: block;
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

h1 + .empty,
h2 + .empty,
.search-row + .empty,
.project-tab-panel > .empty {
  margin-top: 0.75rem;
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

.task-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.task-form > .actions { margin-top: 0.25rem; }

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
.sdlc-compose-run-started:not(.sdlc-compose-viewing-finished) .sdlc-compose-details-body { display: none; }
.sdlc-compose-run-started .sdlc-compose-step-actions { display: none !important; }
.sdlc-compose-run-started:not(.sdlc-compose-viewing-finished) [data-sdlc-compose-head-actions] {
  display: none !important;
}
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
.sdlc-goal-presets {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.4rem;
  margin: 0.35rem 0 0.5rem;
}
.sdlc-goal-presets-label {
  font-size: 0.75rem;
  margin-right: 0.15rem;
}
.sdlc-goal-preset-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  border: 1px solid var(--aw-zinc-200);
  background: var(--aw-zinc-50);
  font-size: 0.75rem;
  line-height: 1.3;
  color: var(--aw-zinc-700);
  cursor: pointer;
}
.sdlc-goal-preset-chip:hover {
  border-color: var(--aw-zinc-300);
  background: #fff;
  color: var(--aw-zinc-900);
}
.sdlc-goal-preset-chip:focus-visible {
  outline: 2px solid rgb(26 68 190 / 0.45);
  outline-offset: 2px;
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
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem 0.65rem;
  padding-top: 0.25rem;
}
.sdlc-compose-step-actions .btn-primary,
.sdlc-compose-step-actions .sdlc-run-wizard-btn {
  margin-left: auto;
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
.sdlc-wizard-parent-prompt {
  margin: 0 0 1.25rem;
  padding: 1rem 1.1rem;
  border: 1px solid var(--aw-zinc-200);
  border-radius: 0.75rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}
.sdlc-wizard-parent-prompt-title {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
}
.sdlc-wizard-parent-prompt-body {
  margin: 0;
  max-height: min(40vh, 16rem);
  overflow: auto;
}
.sdlc-wizard-splits {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.sdlc-wizard-split-option {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1rem 1.1rem;
  border: 1px solid var(--aw-zinc-200);
  border-radius: 0.75rem;
  background: var(--aw-zinc-50);
  box-shadow: var(--aw-shadow-sm);
}
.sdlc-wizard-split-option-label {
  display: block;
  cursor: pointer;
}
.sdlc-wizard-split-option-detail {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 0.15rem;
  padding-top: 0.65rem;
  border-top: 1px solid var(--aw-zinc-200);
}
.sdlc-wizard-split-orchestration {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.45;
}
.sdlc-wizard-split-parent-details {
  margin: 0;
}
.sdlc-wizard-split-parent-summary {
  cursor: pointer;
  font-size: 0.8125rem;
  color: var(--aw-brand-600);
}
.sdlc-wizard-split-modules-heading {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
}
.sdlc-topology-explainer {
  margin: 0 0 1rem;
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
.sdlc-wizard-step-retry {
  margin: 0 0 0.75rem;
  padding: 0;
}
.sdlc-wizard-step-retry-btn {
  font-size: 0.8125rem;
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
.sdlc-wizard-revision-row {
  display: block;
  line-height: 1.45;
}
.sdlc-wizard-revision-label {
  display: inline;
  cursor: pointer;
}
.sdlc-wizard-revision-title {
  font-weight: 600;
}
.sdlc-wizard-revision-row .sdlc-wizard-revision-prompt-info,
.sdlc-wizard-revision-row .sdlc-wizard-revision-judge-info {
  display: inline-flex;
  vertical-align: middle;
  margin: 0 0 0 0.2rem;
}
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
.sdlc-wizard-outcome-step-done {
  border-color: #bbf7d0;
  background: #f0fdf4;
}
.sdlc-wizard-outcome-step-failed {
  border-color: #fecaca;
  background: #fef2f2;
  box-shadow: 0 0 0 1px #fecaca;
}
.sdlc-wizard-outcome-step-pending {
  border-color: var(--aw-zinc-200);
  background: var(--aw-zinc-50);
  opacity: 0.92;
}
.sdlc-wizard-outcome-mark {
  flex: none;
  width: 0.95rem;
  height: 0.95rem;
  margin-top: 0.1rem;
  border-radius: 999px;
  position: relative;
}
.sdlc-wizard-outcome-mark-done {
  background: #166534;
  box-shadow: 0 0 0 3px #dcfce7;
}
.sdlc-wizard-outcome-mark-failed {
  background: #b91c1c;
  box-shadow: 0 0 0 3px #fee2e2;
}
.sdlc-wizard-outcome-mark-pending {
  background: transparent;
  border: 2px solid var(--aw-zinc-300);
  box-shadow: none;
}
.sdlc-wizard-outcome-step-title { font-weight: 600; }
.sdlc-wizard-active-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
}
.sdlc-exact-prompt-pre {
  max-height: min(70vh, 28rem);
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
}
.sdlc-wizard-outcome-status {
  flex: none;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
}
.sdlc-wizard-outcome-status-done {
  color: #166534;
  background: #dcfce7;
}
.sdlc-wizard-outcome-status-failed {
  color: #b91c1c;
  background: #fee2e2;
}
.sdlc-wizard-outcome-status-pending {
  color: var(--aw-zinc-600);
  background: var(--aw-zinc-100);
}
.sdlc-wizard-outcome-step > summary {
  cursor: pointer;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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
.sdlc-run-badge-failed { background: #fee2e2; color: #991b1b; }
.sdlc-run-badge-budget { background: #ffedd5; color: #9a3412; box-shadow: inset 0 0 0 1px #fdba74; }
.sdlc-history-badge-failed { background: #fee2e2; color: #991b1b; }
.sdlc-cost-confirm .sdlc-cost-proposal { display: grid; gap: 0.5rem; margin: 0.75rem 0 1rem; }
.sdlc-cost-confirm .sdlc-cost-proposal > div { display: flex; justify-content: space-between; gap: 1rem; }
.sdlc-cost-confirm .sdlc-cost-proposal dt { color: var(--aw-zinc-500); }
.sdlc-cost-confirm .sdlc-cost-proposal dd { margin: 0; font-weight: 600; font-variant-numeric: tabular-nums; }
.sdlc-cost-controls { margin-top: 0.75rem; }
.sdlc-cost-early-stop .sdlc-checkbox-label { display: flex; gap: 0.5rem; align-items: flex-start; }
.sdlc-cost-estimate { margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--aw-zinc-200); }
.sdlc-cost-estimate-proposal { display: grid; gap: 0.4rem; margin: 0.5rem 0 0.75rem; }
.sdlc-cost-estimate-proposal > div { display: flex; justify-content: space-between; gap: 1rem; }
.sdlc-cost-estimate-proposal dt { color: var(--aw-zinc-500); }
.sdlc-cost-estimate-proposal dd { margin: 0; font-weight: 600; font-variant-numeric: tabular-nums; }
.sdlc-cost-rate-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: var(--aw-zinc-100);
  border: 1px solid var(--aw-zinc-200);
  font-size: 0.85em;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.sdlc-cost-estimate-over { margin: 0.5rem 0 0; }
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
.sdlc-run-detail-block { margin-top: 0.35rem; }
.sdlc-run-reply-preview-label { margin: 0.5rem 0 0.25rem; font-size: 0.8125rem; }
.sdlc-run-reply-preview {
  margin: 0;
  max-height: min(50vh, 28rem);
  overflow: auto;
  padding: 0.5rem 0.65rem;
  font-size: 0.75rem;
  line-height: 1.35;
  white-space: pre-wrap;
  word-break: break-word;
  background: var(--sdlc-reply-preview-bg, #f4f4f5);
  border: 1px solid var(--sdlc-reply-preview-border, #e4e4e7);
  border-radius: 0.375rem;
}
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
.sdlc-node-row-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.05rem;
}
.sdlc-node-skip { flex-shrink: 0; margin: 0; padding: 0; }
.sdlc-node-skip-link {
  font-size: 0.8125rem;
  line-height: 1.2;
  min-height: 0;
  white-space: nowrap;
}
.sdlc-node-open { display: grid; grid-template-columns: 1.25rem minmax(0, 1fr); column-gap: 0.75rem; align-items: start; width: 100%; margin: 0; padding: 0; border: 0; background: none; color: inherit; font: inherit; text-align: left; cursor: pointer; }
.sdlc-node-open:hover .sdlc-node-label,
.sdlc-node-open:focus-visible .sdlc-node-label { text-decoration: underline; }
.sdlc-node-mark { width: 0.95rem; height: 0.95rem; margin-top: 0.15rem; border-radius: 999px; background: #166534; box-shadow: 0 0 0 4px #dcfce7; position: relative; z-index: 1; }
.sdlc-node-mark-failed { background: #b91c1c; box-shadow: 0 0 0 4px #fee2e2; }
.sdlc-node-reason-failed { color: #b91c1c; }
.sdlc-node-active .sdlc-spin { margin-top: 0.15rem; position: relative; z-index: 1; }
.sdlc-node-label { line-height: 1.4; padding-top: 0.05rem; }
.sdlc-node-reason { display: block; margin-top: 0.25rem; color: var(--aw-zinc-700); font-size: 0.8125rem; }
.sdlc-pipeline {
  list-style: none;
  margin: 0.65rem 0 0 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.sdlc-pipeline-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  line-height: 1.35;
}
.sdlc-pipeline-label { flex: 1; min-width: 0; color: var(--aw-zinc-800); }
.sdlc-pipeline-mark {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 999px;
  border: 2px solid var(--aw-zinc-300);
  flex-shrink: 0;
}
.sdlc-pipeline-mark-done {
  border-color: #166534;
  background: #166534;
  box-shadow: none;
}
.sdlc-pipeline-step-active .sdlc-pipeline-label { font-weight: 600; color: var(--aw-zinc-900); }
.sdlc-pipeline-step-pending .sdlc-pipeline-label { color: var(--aw-zinc-500); }
.sdlc-pipeline-modal { margin-left: 0; margin-top: 0.5rem; }
.sdlc-wizard-step-modal .sdlc-pre-preview {
  margin: 0.35rem 0 0;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: var(--aw-zinc-800);
  white-space: pre-wrap;
  word-break: break-word;
}
.sdlc-wizard-step-modal .sdlc-pre-expand { margin-top: 0.35rem; }
.sdlc-pipeline-terminal {
  margin-top: 0.5rem;
  padding: 0.65rem 0.75rem;
  font-size: 0.75rem;
  max-height: 10rem;
  overflow: auto;
  background: var(--aw-zinc-900);
  color: #e4e4e7;
  border-radius: 0.5rem;
}
.sdlc-field-info {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  border: 1px solid var(--aw-zinc-300);
  border-radius: 999px;
  background: #fff;
  color: var(--aw-zinc-600);
  font-size: 0.6875rem;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
}
.sdlc-field-info:hover,
.sdlc-field-info:focus-visible {
  border-color: var(--aw-brand-500);
  color: var(--aw-brand-600);
}
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

.sdlc-history-badge-passed { background: color-mix(in srgb, #059669 14%, #fff); color: #047857; }
.sdlc-history-badge-failed { background: color-mix(in srgb, #dc2626 12%, #fff); color: #b91c1c; }
.sdlc-history-badge-stopped { background: color-mix(in srgb, #d97706 14%, #fff); color: #b45309; }
.sdlc-outcome-badge { display: inline-flex; align-items: center; border-radius: 999px; padding: 0.15rem 0.65rem; font-size: 0.75rem; font-weight: 600; }
.sdlc-outcome-badge-passed { background: color-mix(in srgb, #059669 14%, #fff); color: #047857; }
.sdlc-outcome-badge-failed { background: color-mix(in srgb, #dc2626 12%, #fff); color: #b91c1c; }
.sdlc-outcome-badge-stopped { background: color-mix(in srgb, #d97706 14%, #fff); color: #b45309; }
.sdlc-module-status-passed { font-weight: 600; color: #047857; }
.sdlc-module-status-failed { font-weight: 600; color: #b91c1c; }
.sdlc-module-status-stopped { font-weight: 600; color: #b45309; }
.sdlc-best-outcome-row { margin: 0.35rem 0 0.5rem; }
.sdlc-timeout-tip { cursor: help; }
.sdlc-best-readonly { margin-top: 0.75rem; }
.sdlc-best-readonly summary { cursor: pointer; font-weight: 600; }

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
.project-cloud-actions { margin-top: 0.75rem; }
.inline-form { display: inline; }
.danger-zone {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid color-mix(in srgb, var(--aw-error-600, #dc2626) 25%, var(--aw-zinc-200));
}
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
`.trim()});var c7,d7,F_,iN,U_,aN=l(()=>{"use strict";H_();Hl();c7=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,d7=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],F_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),iN=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${c7}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,U_=e=>{let t=d7.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=F_(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=F_(e.installBundleVersionLabel?.trim()??"unknown"),s=iN("brand brand-in-sidebar",n),i=iN("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${F_(e.title)} \xB7 Agent Witch Local</title>
  <style>${$_}</style>
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
  <script>${S_}</script>
</body>
</html>`}});var hg,Vl,yg=l(()=>{"use strict";hg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vl=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${hg(e.syncMessage)}</p>`:"",o=hg(e.manageHref),n=hg(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${hg(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var B_,G_,q_,lN=l(()=>{"use strict";B_=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,G_=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,q_=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var cN=l(()=>{"use strict";aN();yg();lN()});var Vs,V_,dN=l(()=>{"use strict";Hl();Vs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),V_=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Vs(e.wakeError)}</div>`:"",a=$l(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Vs(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Vs(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Vs(o)}</p>
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
        <p class="home-card-meta">${Vs(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Vs(n)}</p>
      </a>
    </div>`}});var uN=l(()=>{"use strict";dN()});var E,Ks=l(()=>{"use strict";E=e=>e==="passed"||e==="stopped"||e==="failed"});var pN,K_,bn,J_,Sg=l(()=>{"use strict";pN="Stopped at the round limit. The best prompt is kept.",K_="Stopped because the score stopped rising. The best prompt is kept.",bn="Finished. The best prompt is the result.",J_="Wizard ended. Progress from finished steps is kept."});var yo,X_=l(()=>{"use strict";yo=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var u7,p7,Kl,mN,Pg=l(()=>{"use strict";u7=/\n+|;\s+/,p7=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,Kl=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(u7).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,p7(s)]},[]);return[...t,...o]},[]),mN=e=>{let t=Kl(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ce,Js=l(()=>{"use strict";ce=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Jl,Y_=l(()=>{"use strict";Pg();Js();Jl=e=>{let t=[...e.priorRounds,e.current],r=ce(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:mN(o)}}});var Z_,m7,g7,Ag,Q_=l(()=>{"use strict";Z_={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},m7=e=>{try{let t=JSON.parse(e.fragment);return{...Z_,objects:[...e.objects,t]}}catch{return{...Z_,objects:e.objects}}},g7=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:m7(r)},Ag=e=>[...e].reduce(g7,Z_).objects});var f7,ew,h7,gN,tw=l(()=>{"use strict";Q_();f7=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},ew=e=>{let t=Ag(e).filter(f7),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},h7=(e,t)=>({...e,passed:e.score>=t}),gN=(e,t)=>{let r=ew(e);return r===null?null:h7(r,t)}});var rw,ow,bg=l(()=>{"use strict";rw="The judge reply needs a score and a reason.",ow="The improver reply was empty."});var fN,hN=l(()=>{"use strict";fN=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var yN,SN=l(()=>{"use strict";yN=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var S7,PN,AN=l(()=>{"use strict";hN();SN();Sg();Pg();S7=e=>{let t=Kl(e);return t.length===0?K_:`${K_} Avoid: ${t.join("; ")}.`},PN=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:pN};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(fN(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:S7(yN(r))}}return null}});var So,P7,_n,bN,_g=l(()=>{"use strict";So=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},P7=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,_n=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",P7(e.tokens),`Delay: ${So(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},bN=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var A7,_N,wN=l(()=>{"use strict";tw();A7=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,_N=e=>{let r=(A7.exec(e)?.[1]??e).trim();return r.length===0||ew(r)!==null?null:r}});var vN,wg,kN=l(()=>{"use strict";_g();wN();bg();vN=e=>({type:"call",role:"judge",choice:e.choice,prompt:bN({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),wg=e=>{let t=_N(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:ow}}:{nextPrompt:t,continuation:vN({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var nw,TN=l(()=>{"use strict";X_();Y_();tw();bg();Sg();AN();bg();kN();nw=e=>{let t=gN(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:rw}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=PN({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=Jl({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:yo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var Xl,sw=l(()=>{"use strict";Xl=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var CN=l(()=>{"use strict"});var LN=l(()=>{"use strict";CN()});var wn,EN=l(()=>{"use strict";wn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var b7,iw,RN=l(()=>{"use strict";_g();b7=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,iw=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",b7(e.tokens),`Delay: ${So(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var _7,w7,v7,aw,xN=l(()=>{"use strict";_7=/[A-Za-z0-9_./~-]{3,180}/g,w7=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,v7=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||w7.test(t)},aw=(e,t=12)=>{let r=[];for(let o of e.matchAll(_7)){let n=o[0].replace(/\.+$/,"");if(!(!v7(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var Yl,WN=l(()=>{"use strict";Yl=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var vg,lw,IN,Zl,cw=l(()=>{"use strict";vg=e=>Math.floor(e/2),lw=e=>Math.max(vg(e)+1,e-20),IN=(e,t)=>e>=t?"passes":e>=lw(t)?"close":e>=vg(t)?"weak":"bad",Zl=e=>[{band:"bad",label:`0\u2013${vg(e)-1} bad`},{band:"weak",label:`${vg(e)}\u2013${lw(e)-1} weak`},{band:"close",label:`${lw(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var kg,dw=l(()=>{"use strict";cw();kg=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${IN(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var It,uw=l(()=>{"use strict";It=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var ON,MN=l(()=>{"use strict";ON=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var k7,T7,NN,DN=l(()=>{"use strict";Ks();dw();uw();MN();k7=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],T7=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",NN=e=>{let t=e.wizard;if(t===void 0)return[];let r=It(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=k7.map((h,y)=>{let p=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:h,state:p,detail:null}}).filter((h,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=kg(e),d=c.filter(h=>h.id==="round-0"),u=ON(t)&&(!n||a)?c.filter(h=>h.id!=="round-0"):[],m=E(e.status)&&!s,S=m?[{id:"end",label:T7(e),state:"done",detail:e.errorMessage}]:[];if(m&&S.length>0){let h=Math.min(r,i.length),y=i.slice(0,h).map(p=>({...p,state:"done"}));return[...d,...y,...S,...u]}return[...d,...i,...u,...S]}});var C7,pw,jN=l(()=>{"use strict";Ks();dw();DN();C7=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",pw=e=>{if(e.wizard!==void 0)return NN(e);let t=kg(e),r=E(e.status)?[{id:"end",label:C7(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var Ql,zN=l(()=>{"use strict";Ql=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var $N=l(()=>{"use strict";ft()});var HN,ec,tc,Ys,Tg,mw,FN=l(()=>{"use strict";$N();HN="/prompt-optimizer/agent",ec=`${Sr}${HN}`,tc=`${Sr}/prompt-optimizer`,Ys="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",Tg=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Ys}`,mw="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var or=l(()=>{"use strict"});var ie,rc=l(()=>{"use strict";or();ie=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var gw,UN=l(()=>{"use strict";gw="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var BN,GN=l(()=>{"use strict";BN=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var oc,VN=l(()=>{"use strict";GN();or();oc=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:BN(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var fw,KN=l(()=>{"use strict";or();fw=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var hw,JN=l(()=>{"use strict";or();hw=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var XN,nc,YN=l(()=>{"use strict";XN=["generalize","evaluate","separate","optimize_modules"],nc=(e,t)=>{let r=XN.indexOf(t);if(r===-1)return e;let o=XN.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var Cg,yw=l(()=>{"use strict";Pg();Cg=e=>{let t=Kl(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var sc,ZN=l(()=>{"use strict";yw();sc=e=>{let t=Cg(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var E7,R7,x7,QN,eD=l(()=>{"use strict";E7=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),R7=/^\{\{[a-zA-Z0-9_-]+\}\}$/,x7=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(E7(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},QN=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>R7.test(n)?n:x7(n,r)).join("")}});var Sw,tD=l(()=>{"use strict";eD();Sw=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:QN(o.prompt,t)}))}))});var W7,ic,rD=l(()=>{"use strict";or();yw();W7=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),ic=e=>{let t=Cg(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=W7(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var ac,oD=l(()=>{"use strict";sw();ac=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return Xl({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var lc,Aw=l(()=>{"use strict";Js();lc=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ce(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var bw,nD=l(()=>{"use strict";Aw();bw=e=>{let t=lc({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var vn,sD=l(()=>{"use strict";vn=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var I7,O7,oe,Lg=l(()=>{"use strict";rc();I7=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},O7=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,oe=e=>{let t=ie(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:I7(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>O7(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var iD,aD=l(()=>{"use strict";rc();Lg();iD=e=>{let t=oe(e.wizard),r=ie(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var _w,lD=l(()=>{"use strict";aD();_w=e=>{let t=iD({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var M7,cD,dD=l(()=>{"use strict";M7=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},cD=e=>[...e].reduce(M7,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var N7,uD,pD=l(()=>{"use strict";N7=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},uD=e=>[...e].reduce(N7,{out:"",inString:!1,escaped:!1}).out});var D7,j7,mD,gD=l(()=>{"use strict";dD();pD();D7=e=>e.charCodeAt(0)===65279?e.slice(1):e,j7=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},mD=e=>uD(cD(j7(D7(e))))});var z7,$7,H7,fD,F7,Zs,Eg=l(()=>{"use strict";Q_();gD();z7=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},$7=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},H7=e=>[...e].reduce($7,{out:"",inString:!1,escaped:!1}).out,fD=e=>{let t=Ag(e);return t.length===0?null:t[t.length-1]},F7=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Zs=e=>{let t=mD(z7(e)),r=fD(t);if(r!==null)return r;let o=H7(t),n=fD(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw F7(i)}}});var U7,B7,ww,hD,yD=l(()=>{"use strict";U7=/^[a-z0-9][a-z0-9-]{0,62}$/,B7=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return U7.test(t)?t:""},ww=e=>e.replace(/\s+/gu," ").trim(),hD=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=B7(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=ww(n.name),a=ww(n.description),c=ww(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var SD,PD,AD=l(()=>{"use strict";SD=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},PD=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var vw,bD=l(()=>{"use strict";Eg();yD();AD();vw=(e,t)=>{let r=(()=>{try{return Zs(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(SD(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(PD).filter(a=>a!==null),i=hD({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var kw,_D=l(()=>{"use strict";kw=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var Tw,wD=l(()=>{"use strict";Tw=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var Cw,vD=l(()=>{"use strict";rc();Lg();Cw=e=>{let t=oe(e.wizard),r=ie(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var cc,kD=l(()=>{"use strict";cc=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var Ot,G7,Lw,TD=l(()=>{"use strict";Ot=g(ns());Eg();G7=(0,Ot.isType)({name:Ot.isNonEmptyString,description:Ot.isString,sampleValue:Ot.isString}),Lw=e=>{let t=Zs(e);if(!(0,Ot.isType)({templatedPrompt:Ot.isNonEmptyString,variables:(0,Ot.isArrayWithEachItem)(G7)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var de,q7,V7,Ew,CD=l(()=>{"use strict";de=g(ns());or();Eg();q7=(0,de.isType)({id:de.isNonEmptyString,title:de.isNonEmptyString,prompt:de.isNonEmptyString,order:de.isNumber}),V7=(0,de.isType)({id:de.isNonEmptyString,title:de.isNonEmptyString,summary:de.isString,topology:(0,de.isOneOf)("chain","parallel"),modules:(0,de.isArrayWithEachItem)(q7),recommended:de.isBoolean}),Ew=e=>{let t=Zs(e);if(!(0,de.isType)({options:(0,de.isArrayWithEachItem)(V7)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Qs,LD=l(()=>{"use strict";Qs=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var K7,Rw,xw=l(()=>{"use strict";K7=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Rw=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(K7,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Mt,Nt,ED=l(()=>{"use strict";Js();xw();Mt=e=>Rw(e.templatedPrompt,e.variables),Nt=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ce(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Mt(e.wizard)}});var J7,kn,RD=l(()=>{"use strict";J7=/\{\{([a-zA-Z0-9_-]+)\}\}/g,kn=(e,t)=>e.replace(J7,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var X7,Tn,Rg=l(()=>{"use strict";X7=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Tn=e=>{let t=new Set,r=[];for(let o of e.matchAll(X7)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var dc,xD=l(()=>{"use strict";Rg();dc=e=>e.variables.length>0||Tn(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var Ww,Iw=l(()=>{"use strict";or();Ww=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var uc,WD=l(()=>{"use strict";Js();Iw();uc=e=>{let t=e.wizard.evaluateSelectedRound??ce(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:Ww(r.judgement,e.passScore)}});var pc,ID=l(()=>{"use strict";pc=e=>e.length===1&&e[0].modules.length===1});var Ow,OD=l(()=>{"use strict";Ow=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var _e,xg,mc=l(()=>{"use strict";_e=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),xg=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var MD,ND=l(()=>{"use strict";mc();MD=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[_e("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),_e("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[_e("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var DD,jD=l(()=>{"use strict";Ks();mc();DD=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!E(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[_e("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),_e("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),_e("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",xg(e.writerLabel,e.folder)),_e("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[_e("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var zD,$D=l(()=>{"use strict";mc();zD=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[_e("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),_e("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[_e("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var HD,FD=l(()=>{"use strict";mc();HD=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[_e("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),_e("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",xg(e.writerLabel,e.folder)),...r?[_e("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var Wg,UD=l(()=>{"use strict";Ks();ND();jD();$D();FD();Wg=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(E(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return DD(r);case"evaluate":return MD({...r,currentRound:e.currentRound});case"separate":return HD(r);case"optimize_modules":return zD({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var gc,Cr,BD=l(()=>{"use strict";gc=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),Cr=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var Y7,Ig,Mw,GD=l(()=>{"use strict";Rg();Y7="wizardParam_",Ig=e=>`${Y7}${e}`,Mw=e=>{let t=Tn(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=Ig(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var ct,qD=l(()=>{"use strict";ct=["generalize","evaluate","separate","optimize_modules"]});var fc,Cn,ei,Lr=l(()=>{"use strict";fc="Stopped because the confirmed token or spend budget was exceeded.",Cn="Approaching the confirmed budget. Further trials may hard-stop.",ei="Confirm the Step 4 token and spend budget before optimizing modules."});var dt,ti=l(()=>{"use strict";dt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var jt,hc=l(()=>{"use strict";Lr();jt=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var Z7,Er,yc=l(()=>{"use strict";Lr();Z7={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},Er=e=>{let t=e?.trim()??"";return t.length===0?.01:Z7[t]??.01}});var Og,Nw=l(()=>{"use strict";Lr();yc();Og=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=Er(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var VD,Ng,Dw,jw=l(()=>{"use strict";Lr();ti();hc();Nw();yc();VD=e=>{let t=Og({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??Er(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:dt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},Ng=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),Dw=e=>{let t=e.existing??jt(),r=VD({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return Ng(t,r)}});var ri,Sc,XD=l(()=>{"use strict";Lr();or();ti();hc();jw();Nw();yc();ri=e=>{let t=Og({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??Er(e.writerId),i=r*4e3,a=n*o*8e3,c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:dt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},Sc=e=>{let t=e.existing??jt();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=ri({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return Ng(t,r)}});var Rr,YD=l(()=>{"use strict";ti();Lr();hc();Rr=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??jt(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=dt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var $w,oi,ZD=l(()=>{"use strict";Lr();ti();$w=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=dt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:fc,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:fc,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:Cn,costControls:{...t,softWarnFired:!0,softWarnMessage:Cn}}:null},oi=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var Hw,QD=l(()=>{"use strict";Hw=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var R=l(()=>{"use strict";Ks();Sg();TN();X_();_g();sw();LN();EN();RN();xN();Y_();WN();Js();jN();uw();cw();zN();FN();or();rc();UN();VN();KN();JN();YN();ZN();tD();rD();oD();Aw();nD();sD();Lg();lD();bD();_D();wD();vD();kD();TD();CD();LD();ED();xw();RD();Rg();xD();WD();ID();Iw();OD();UD();BD();GD();qD();Lr();ti();hc();jw();XD();yc();YD();ZD();QD()});var Fw=l(()=>{"use strict";$a()});var Q7,rj,oj=l(()=>{"use strict";Fw();Q7=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,rj=e=>{let t=tn(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(Q7)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var sj,e9,t9,nr,r9,o9,nj,jg,ij,n9,yt,aj,lj,cj,zt=l(()=>{"use strict";Fw();oj();sj=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),e9=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,t9=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,nr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(e9.test(e.errorMessage))return"usage_limit";if(t9.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},r9="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",o9="The writer waited on terminal input and did not return a prompt.",nj=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,jg=e=>{let t=e.trim();if(t.length===0||t.length>=500||!nj.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>nj.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},ij=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},n9=e=>jg(e.stdout)??jg(e.stderr)??(ij(e.replyFile)?jg(e.replyFile):null),yt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return r9;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?o9:null},aj=e=>{let t=e.trim();return t.length===0?null:yt(t)!==null?t:jg(t)??(ij(t)?t:null)},lj=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],cj=e=>{let t=e.replyFileText?.trim()??"",r=yt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=n9({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=nr({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=rj([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=tn(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var s9,uj,dj,En,zg=l(()=>{"use strict";zt();s9=400,uj=(e,t=s9)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},dj=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:aj(e.promptText)},En=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:dj(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=dj(e.revisions[n]);if(s!==null)return s.trim()}return null}});var W,i9,$g,ae,Rn,mj,pj,gj,fj,we=l(()=>{"use strict";W="manual",i9=["claude-cli","codex","cursor","antigravity"],$g={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ae=e=>e===W?"You":e in $g?$g[e]:e,Rn=e=>i9.filter(t=>e.includes(t)),mj=e=>{let t=Rn(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},pj=(e,t)=>t===W?W:e.find(r=>r===t)??null,gj=(e,t,r)=>{let o=Rn(e),n=pj(o,t),s=pj(o,r);return n===null||s===null?null:{judge:n,improver:s}},fj=(e,t,r)=>{let o=Rn(e);return t===null||t.trim()===""?r!==W?r:o[0]??null:t===W?null:o.find(n=>n===t)??null}});var hj,Hg,Uw,xn,Bw,ut,xr,ue,Ke=l(()=>{"use strict";hj=g(require("node:fs")),Hg=g(require("node:os")),Uw=g(require("node:path"));sn();xn="~",Bw=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,ut=e=>{let t=Hg.default.homedir(),r=Bw(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},xr=e=>{let t=e.trim().length===0?"~":e.trim(),r=Ye(t),o=Uw.default.isAbsolute(r)?Bw(r):Bw(Uw.default.resolve(Hg.default.homedir(),r));try{if(!hj.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:ut(o)}},ue=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Hg.default.homedir()});var Ze,Po=l(()=>{"use strict";Ze='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var Gw,yj,a9,Sj,Pj,qw=l(()=>{"use strict";R();we();Ke();Po();Gw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yj=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',a9=e=>{let t=yj(e.state),r=`<h2>${Gw(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${Gw(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Ze}</button></div><template>${r}</template></li>`},Sj=e=>{let t=e.wizard;if(t===void 0)return"";let r=Wg({status:e.status,wizard:t,writerLabel:ae(e.judgeModel),runnerLabel:ae(e.runnerModel??e.judgeModel),folderDisplay:ut(ue(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(a9).join("")}</ol>`},Pj=e=>{let t=e.wizard;if(t===void 0)return"";let r=Wg({status:e.status,wizard:t,writerLabel:ae(e.judgeModel),runnerLabel:ae(e.runnerModel??e.judgeModel),folderDisplay:ut(ue(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${yj(n.state)}<span class="sdlc-pipeline-label">${Gw(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var $t,Aj,bj,_j,Vw=l(()=>{"use strict";R();$t=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Aj="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",bj=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${$t(Aj)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${$t(i.name)}}}</strong> \u2014 ${$t(i.description)} (sample: ${$t(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${$t(r)}</pre>`,n=Mt(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${$t(n)}</pre>`;return`${t}${o}${s}`},_j=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${$t(Aj)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${$t(n.name)}}}</strong> \u2014 ${$t(n.description)} (sample: ${$t(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${$t(r)}</pre>`;return`${t}${o}`}});var Pc,Kw=l(()=>{"use strict";Pc=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var wj,vj=l(()=>{"use strict";R();wj=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=wn({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=_n({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var Jw,Ac,Xw=l(()=>{"use strict";Po();vj();Jw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ac=e=>{let t=wj(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${Jw(r)}">${Ze}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${Jw(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${Jw(t)}</pre></template>`}});var Yw,bc,Zw=l(()=>{"use strict";Po();Yw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bc=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${Yw(r)}">${Ze}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${Yw(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${Yw(t)}</pre></template>`}});var Fg,ni,Qw=l(()=>{"use strict";Kw();Xw();Zw();Fg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ni=e=>{let t=Pc(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${Fg(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,u=e.cycle.revisions.map(m=>{let S=m.judgement?.score,h=S==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${S}`,y=m.judgement?.reasons?.trim()??"",p=y.length===0?"":`<br><span class="muted">${Fg(y)}</span>`,P=bc({roundLabel:d(m.roundNumber),promptText:m.promptText}),A=Ac({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run}),f=`${P}${A}`;if(e.interactive){let b=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${b}> <span class="sdlc-wizard-revision-title">${Fg(h)}</span></label>${f}${p}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Fg(h)}</span>${f}${p}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var ev,kj,Tj,Cj,tv=l(()=>{"use strict";ev=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kj=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${ev(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${ev(t.prompt)}</pre></li>`).join("")}</ol>`,Tj=e=>kj([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),Cj=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${ev(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${kj(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var _c,l9,Ug,rv=l(()=>{"use strict";R();tv();_c=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),l9=e=>{let t=e.wizard;return t===void 0?"":Nt({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},Ug=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=l9(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${_c(n.orchestratorSkill.fileName)}</code> \u2014 ${_c(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${_c(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=Tj(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${_c(r)} <span class="muted">${_c(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Oe,c9,d9,u9,p9,Bg,m9,g9,f9,h9,y9,S9,si,Gg=l(()=>{"use strict";R();qw();Vw();Qw();Xw();Zw();rv();Oe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),c9={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},d9=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Oe(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Oe(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Oe(o)}</pre></details>`;return`<h2>${Oe(e)}</h2>${n}`},u9=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=Mt(t).trim(),n=Nt({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!E(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${d9("What is being evaluated",i)}`},p9=(e,t)=>{let r=e.wizard;if(r===void 0||E(e.status))return"";let o=c9[t];return o===void 0||r.phase!==o?"":Pj(e)},Bg=(e,t,r)=>{let o=p9(e,t),n=t==="wizard-2"?u9(e):"";return`${o}${n}${r}`},m9=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},g9=e=>{let t=e.wizard;return t===void 0?"":bj(t)},f9=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Oe(a)}</span>`,d=`Round ${n.roundNumber}`,u=bc({roundLabel:d,promptText:n.promptText}),m=Ac({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Oe(s)}${i}</span>${u}${m}${c}</li>`}).join("")}</ul>`,h9=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return ni({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=m9(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${f9(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=Nt({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Oe(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",u=`Round ${c.roundNumber} \u2014 score ${d}`,m=bc({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),S=Ac({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Oe(u)}</span>${m}${S}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Oe(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},y9=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Oe(n.title)}</strong> <span class="muted">(${Oe(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Oe(o.title)}</strong>${n}${Oe(s)}${Ug(e,o)}</li>`}).join("")}</ul>`},S9=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Oe(i)}</span> <strong>${Oe(n.title)}</strong>${Oe(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Oe(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?ni({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},si=(e,t)=>{switch(t){case"wizard-1":return Bg(e,t,g9(e));case"wizard-2":return Bg(e,t,h9(e));case"wizard-3":return Bg(e,t,y9(e));case"wizard-4":return Bg(e,t,S9(e));default:return""}}});var P9,A9,Lj,Ej,Rj=l(()=>{"use strict";R();zg();zt();Gg();P9=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},A9=e=>{let t=e.goal.trim();return t.length===0?null:t},Lj=(e,t,r,o,n)=>{let s=yt(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},Ej=(e,t)=>{let r=A9(e);if(t.id.startsWith("wizard-")){let s=si(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=Ql(e,t);if(s!==null){let a=En(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ce(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:Lj(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:P9(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:Lj(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var Wn,xj,Wj=l(()=>{"use strict";Wn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xj=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${Wn(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Wn(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${Wn(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${Wn(n)}</h2><pre class="mono">${Wn(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${Wn(e.goal)}</dd></div></dl>`;return`<h2>${Wn(e.title)}</h2>${i}${t}${r}${o}${s}`}});var b9,Ij,wc,ov,qg=l(()=>{"use strict";R();b9=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),Ij=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||E(e.status))return null;let r=It(t);return r<0||r>3?null:`wizard-${r+1}`},wc=(e,t)=>b9.has(t)?Ij(e)===t:!1,ov="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var _9,Vg,nv=l(()=>{"use strict";_9='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Vg=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${_9}</button>`});var In,Kg=l(()=>{"use strict";R();In=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Jl({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:Yl(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var w9,Oj,v9,sv,Mj,k9,T9,C9,L9,Nj,Dj=l(()=>{"use strict";R();Kg();w9={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},Oj=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},v9=e=>w9[e]??null,sv=(e,t)=>{let r=e.wizard,o=v9(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=It(r);return o<n||o===n},Mj=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},k9=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:Mt(t).trim();return o.length===0?null:sc({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:Oj(e,"generalize")})},T9=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=In(e);return n===null?null:yo({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=Mj(e)?.promptText.trim()??Nt({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:wn({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},C9=e=>{let t=e.wizard;if(t===void 0)return null;let r=Nt({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:ic({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:Oj(e,"separate")})},L9=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=Cr(t),s=kn(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=In(e);return c===null?null:yo({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=Mj(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||E(e.status)&&i?.judgement!==null)?_n({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):ac({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:vn(t,r).output,moduleTitle:o.title})},Nj=(e,t)=>{if(!sv(e,t))return null;switch(t){case"wizard-1":return k9(e);case"wizard-2":return T9(e);case"wizard-3":return C9(e);case"wizard-4":return L9(e);default:return null}}});var E9,Jg,iv=l(()=>{"use strict";R();E9=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},Jg=(e,t)=>{let r=e.wizard,o=E9(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=It(r);return o<n?"done":o===n&&E(e.status)&&e.status==="failed"?"failed":o<=n&&E(e.status)?"done":"pending"}});var R9,ii,Xg=l(()=>{"use strict";Po();Dj();iv();R9=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ii=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(Jg(e,t)==="pending")return""}else if(!sv(e,t))return"";let o=Nj(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Ze}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${R9(o)}</pre></template>`}});var On,Wr,ai=l(()=>{"use strict";On=e=>e.toLocaleString("en-US"),Wr=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var sr,x9,jj,Yg,zj,$j,Zg=l(()=>{"use strict";R();Rj();Wj();qg();nv();Po();zg();qw();Xg();ai();sr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),x9=(e,t)=>{let r=Ql(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Wr(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${On(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${sr(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${sr(r)}</span>`:"",d=xj(Ej(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&E(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${sr(e.id)}"`:"",m=wc(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${sr(ov)}"><input type="hidden" name="cycleId" value="${sr(t.id)}"><input type="hidden" name="wizardStepId" value="${sr(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",S=e.state==="active"&&e.id.startsWith("wizard-")?Sj(t):"",h=o?"failed":e.state,y=o?En(t):null,p=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Ze}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${sr(y)}</pre></template>`:"",P=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?ii(t,e.id):"";return`<li class="sdlc-node sdlc-node-${h}" data-sdlc-step-id="${sr(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${sr(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${P}${p}</div></div>${S}<template>${d}</template></li>`},jj=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>x9(r,t)).join("")}</ol>`,Yg=e=>`<div class="sdlc-score" aria-label="What the score means">${Zl(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${sr(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,zj=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${Vg({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,$j=`<script>
(() => {
  const dialog = document.getElementById("sdlc-node-dialog");
  const body = dialog?.querySelector("[data-sdlc-dialog-body]");
  if (!dialog || !body) return;
  const readNodeTemplate = (node) => {
    if (!(node instanceof Element)) return null;
    const direct = node.querySelector(":scope > template");
    return direct instanceof HTMLTemplateElement ? direct : null;
  };
  const readStepId = (node) => {
    if (!(node instanceof HTMLElement)) return "";
    const stepId = node.dataset.sdlcStepId;
    return typeof stepId === "string" ? stepId : "";
  };
  const openFromTemplate = (template, stepId) => {
    if (!(template instanceof HTMLTemplateElement)) return;
    body.replaceChildren(template.content.cloneNode(true));
    if (stepId.length > 0) {
      dialog.dataset.sdlcDialogStepId = stepId;
    } else {
      delete dialog.dataset.sdlcDialogStepId;
    }
    dialog.showModal();
  };
  const refreshOpenDialog = () => {
    if (!dialog.open) return;
    const stepId = dialog.dataset.sdlcDialogStepId ?? "";
    if (stepId.length === 0) return;
    const node = document.querySelector('[data-sdlc-step-id="' + stepId + '"]');
    const template = readNodeTemplate(node);
    if (template === null) return;
    body.replaceChildren(template.content.cloneNode(true));
  };
  document.addEventListener("sdlc-node-dialog-refresh", refreshOpenDialog);
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const info = target.closest("[data-sdlc-pipeline-info]");
    if (info instanceof HTMLElement) {
      const template = info.closest(".sdlc-pipeline-step")?.querySelector("template");
      if (!(template instanceof HTMLTemplateElement)) return;
      delete dialog.dataset.sdlcDialogStepId;
      openFromTemplate(template, "");
      return;
    }
    const stepPromptInfo = target.closest("[data-sdlc-wizard-step-prompt-info]");
    if (stepPromptInfo instanceof HTMLElement) {
      event.stopPropagation();
      event.preventDefault();
      const template = stepPromptInfo.parentElement?.querySelector(
        "template[data-sdlc-wizard-step-prompt]",
      );
      if (!(template instanceof HTMLTemplateElement)) return;
      delete dialog.dataset.sdlcDialogStepId;
      openFromTemplate(template, "");
      return;
    }
    const failureInfo = target.closest("[data-sdlc-failure-reply-info]");
    if (failureInfo instanceof HTMLElement) {
      event.stopPropagation();
      event.preventDefault();
      const template = failureInfo.parentElement?.querySelector(
        "template[data-sdlc-failure-reply]",
      );
      if (!(template instanceof HTMLTemplateElement)) return;
      delete dialog.dataset.sdlcDialogStepId;
      openFromTemplate(template, "");
      return;
    }
    const revisionPromptInfo = target.closest(
      "[data-sdlc-revision-round-prompt-info]",
    );
    if (revisionPromptInfo instanceof HTMLElement) {
      event.stopPropagation();
      event.preventDefault();
      const template = revisionPromptInfo.parentElement?.querySelector(
        "template[data-sdlc-revision-round-prompt]",
      );
      if (!(template instanceof HTMLTemplateElement)) return;
      delete dialog.dataset.sdlcDialogStepId;
      openFromTemplate(template, "");
      return;
    }
    const revisionJudgeInfo = target.closest(
      "[data-sdlc-revision-judge-prompt-info]",
    );
    if (revisionJudgeInfo instanceof HTMLElement) {
      event.stopPropagation();
      event.preventDefault();
      const template = revisionJudgeInfo.parentElement?.querySelector(
        "template[data-sdlc-revision-judge-prompt]",
      );
      if (!(template instanceof HTMLTemplateElement)) return;
      delete dialog.dataset.sdlcDialogStepId;
      openFromTemplate(template, "");
      return;
    }
    const opener = target.closest("[data-sdlc-node]");
    if (!opener) return;
    const node = opener.closest(".sdlc-node");
    const template = readNodeTemplate(node);
    if (template === null) return;
    openFromTemplate(template, readStepId(node));
  });
})();
</script>`});var Qg,ef,tf,Hj,av=l(()=>{"use strict";Qg="support-reply",ef="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",tf=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),Hj=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var rf,Fj,Uj=l(()=>{"use strict";R();Zg();av();rf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Fj=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${Yg(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${rf(ef)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${rf(tf)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${rf(Hj)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${rf(Qg)}">Run this sample</a>
      </div>
    </section>`});var lv,of,W9,Bj,Gj=l(()=>{"use strict";lv=g(require("node:fs")),of=g(require("node:path")),W9=e=>of.default.join(of.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),Bj=(e,t)=>{let r=W9(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;lv.default.mkdirSync(of.default.dirname(r),{recursive:!0}),lv.default.appendFileSync(r,o,"utf8")}});var li,qj,I9,Vj,O9,Kj,ir,Z,Jj,j,pt=l(()=>{"use strict";li=g(require("node:fs")),qj=g(require("node:path"));R();Gj();I9=e=>e.wizard===void 0?e:{...e,wizard:fw(e.wizard)},Vj=new Set,O9=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),Kj=(e,t)=>{li.default.mkdirSync(qj.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;li.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),li.default.renameSync(r,e)},ir=e=>{if(!li.default.existsSync(e))return[];try{let t=JSON.parse(li.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(O9).map(I9):[]}catch{return[]}},Z=(e,t)=>ir(e).find(r=>r.id===t)??null,Jj=(e,t)=>{Vj.add(t);let r=ir(e).filter(o=>o.id!==t);Kj(e,r)},j=(e,t)=>{if(Vj.has(t.id))return;let r=ir(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];Kj(e,o),Bj(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var ci,ar,vc,Xj,nf,M9,Yj,Zj,Qj,cv=l(()=>{"use strict";ci=g(require("node:fs")),ar=g(require("node:path")),vc=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},Xj=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),nf=(e,t)=>{let r=vc(e);return r.length>0?r:vc(t)},M9=e=>{let t=nf(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${Xj(o)}`,...n.length>0?[`description: ${Xj(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},Yj=e=>`.cursor/skills/${e}/SKILL.md`,Zj=(e,t)=>{let r=vc(t);if(r.length===0)return!1;let o=ar.default.resolve(e),n=ar.default.resolve(o,".cursor","skills"),s=ar.default.resolve(o,Yj(r));return s.startsWith(`${n}${ar.default.sep}`)?ci.default.existsSync(s):!1},Qj=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(nf(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=ar.default.resolve(e.workingDirectory);try{if(!ci.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=M9({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=Yj(r.slug),n=ar.default.resolve(t,".cursor","skills"),s=ar.default.resolve(t,o);if(!s.startsWith(`${n}${ar.default.sep}`))return{ok:!1,errorCode:"path"};if(ci.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{ci.default.mkdirSync(ar.default.dirname(s),{recursive:!0}),ci.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var N9,ez,tz,rz=l(()=>{"use strict";R();pt();Ke();zt();cv();N9=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,ez=e=>{let t=e.get("savedSkill");return t!==null&&N9.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},tz=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=Z(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!E(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ce(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||yt(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=Qj({workingDirectory:ue(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var sf,af,kc=l(()=>{"use strict";R();sf=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=Rr({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},af=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var Ao,Tc=l(()=>{"use strict";R();kc();Ao=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=Ow(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=Dw({moduleCount:o.length,existing:e.costControls,writerId:n}),i=sf(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:gc(r.variables)},updatedAt:new Date().toISOString()}}});var bo,Cc=l(()=>{"use strict";bo=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var dv=l(()=>{"use strict";Lt();Nl();$a()});var uv,oz,pv,nz,sz=l(()=>{"use strict";uv={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},oz=e=>e.exitCode===null&&e.signalCode===null,pv=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!oz(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!oz(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),nz=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),pv(e).then(s=>{r({...uv,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var iz,Lc,az,mv,D9,fv,hv,j9,z9,$9,lz,H9,gv,cz,Ec,dz,F9,U9,Qe,Mn=l(()=>{"use strict";iz=require("node:child_process"),Lc=g(require("node:fs")),az=g(require("node:os")),mv=g(require("node:path"));dv();sz();zt();D9=["claude-cli","codex","cursor","antigravity"],fv=18e4,hv=6e5,j9=12e4,z9=9e5,$9="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",lz="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",H9="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",gv=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},cz=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=gv(process.env[lz])??Math.max(r,hv));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:gv(process.env[H9])??z9;return Math.min(o,Math.max(j9,r))},Ec=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?gv(process.env[lz])??hv:fv,dz=e=>`The writer timed out after ${e}ms.`,F9=e=>D9.includes(e),U9=e=>e===!0||process.env[$9]==="1",Qe=e=>new Promise(t=>{if(e.signal?.aborted){t(uv);return}if(U9(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!F9(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=Xt(r,e.prompt,he({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!Lc.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:fv,s=mv.default.join(Lc.default.mkdtempSync(mv.default.join(az.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=lj({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,iz.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=S=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(S))};nz(u,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",pv(u).then(S=>{m({ok:!1,errorMessage:dz(n),errorKind:"writer_timeout",killSignal:S})})},n),u.stdout.on("data",S=>{a.push(Buffer.from(S))}),u.stderr.on("data",S=>{c.push(Buffer.from(S))}),u.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",()=>{if(d.settled)return;let S=Lc.default.existsSync(s)?Lc.default.readFileSync(s,"utf8"):null,h=cj({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:S});if(h.ok&&d.stopReason!=="abort"){m(h);return}d.stopReason===null&&m(h)})})});var B9,Rc,yv=l(()=>{"use strict";R();ai();B9=e=>{if(e.wizard!==void 0){let t=cc(e.wizard),r=Wr(e);return(t??0)+r}return Wr(e)},Rc=e=>{let t=$w({costControls:e.costControls,spentTokens:B9(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var uz,G9,xc,lf,cf=l(()=>{"use strict";R();we();yv();uz=e=>e===W?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},G9=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),xc=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=nw({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:uz(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?Hw({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:Yl(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=G9(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?Rc({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):Rc({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},lf=(e,t,r=null)=>{let o=wg({raw:t,judge:uz(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var df,Sv=l(()=>{"use strict";df=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var gz,uf,pf,pz,mz,Pv,q9,fz,Av,V9,hz,K9,J9,yz,Sz=l(()=>{"use strict";gz=require("node:child_process"),uf=g(require("node:fs")),pf=g(require("node:path"));Dm();R();pz=4e3,mz=12e3,Pv=(e,t)=>{let r=(0,gz.spawnSync)("git",[...t],{cwd:e,env:mo(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},q9=e=>Pv(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",fz=e=>{let t=Pv(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},Av=(e,t)=>{let r=pf.default.resolve(e,t),o=pf.default.relative(e,r);if(o.startsWith("..")||pf.default.isAbsolute(o)||!uf.default.existsSync(r)||!uf.default.statSync(r).isFile())return null;let n=uf.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>pz?`${n.slice(0,pz)}
\u2026truncated`:n},V9=e=>e.length>mz?`${e.slice(0,mz)}
\u2026truncated`:e,hz=e=>{let t=aw(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,Av(e.workingDirectory,n)])),o=q9(e.workingDirectory);return{git:o,status:o?fz(e.workingDirectory):{},files:r,paths:t}},K9=(e,t)=>{let r=Pv(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=Av(e,t);return o===null?`${t} is missing.`:o},J9=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",yz=e=>{let t=e.before.git?fz(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=Av(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>K9(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:J9(e.before.git,e.before.paths.length>0),evidence:V9(i.join(`

`))}}});var wv,G,vv,Me,Pz,X9,Y9,Az,di,bz,ui,Z9,Q9,Wc,bv,_v,eX,_z,tX,rX,oX,wz,nX,vz,kz,sX,iX,Tz,Cz=l(()=>{"use strict";wv=require("node:child_process"),G=g(require("node:fs")),vv=g(require("node:os")),Me=g(require("node:path"));Dm();Pz=8e6,X9=16e6,Y9=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],Az=(e,t)=>{let r=(0,wv.spawnSync)("git",[...t],{cwd:e,env:mo(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},di=(e,t)=>(0,wv.spawnSync)("git",[...t],{cwd:e,env:mo(),timeout:8e3}).status===0,bz=e=>{let t=Az(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},ui=(e,t)=>{let r=Me.default.resolve(e,t),o=Me.default.relative(e,r);return o.startsWith("..")||Me.default.isAbsolute(o)?null:r},Z9=(e,t)=>{let r=ui(e,t);if(r===null||!G.default.existsSync(r))return null;let o=G.default.statSync(r);return!o.isFile()||o.size>Pz?null:G.default.readFileSync(r)},Q9=(e,t,r)=>{let o=ui(e,t);o!==null&&(G.default.mkdirSync(Me.default.dirname(o),{recursive:!0}),G.default.writeFileSync(o,r))},Wc=(e,t)=>{let r=ui(e,t);r===null||!G.default.existsSync(r)||G.default.rmSync(r,{recursive:!0,force:!0})},bv=(e,t)=>di(e,["cat-file","-e",`HEAD:${t}`]),_v=e=>{let t=Az(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},eX=e=>Me.default.resolve(e)!==Me.default.resolve(vv.default.homedir()),_z=e=>{if(!G.default.existsSync(e))return 0;let t=G.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?G.default.readdirSync(e).reduce((r,o)=>r+_z(Me.default.join(e,o)),0):0},tX=(e,t,r)=>{let o=ui(e,r);if(o===null||!G.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(_z(o)>X9)return{relativePath:r,existed:!0,copyDir:null};let n=Me.default.join(t,"cache",r);return G.default.mkdirSync(Me.default.dirname(n),{recursive:!0}),G.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},rX=400,oX=32e6,wz=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!G.default.existsSync(s)))for(let i of G.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=Me.default.join(s,i),c=G.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>Pz)){if(t.length>=rX||r+c.size>oX){o=!1;return}r+=c.size,t.push(Me.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},nX=(e,t,r)=>{let o=ui(e,r);if(o===null||!G.default.existsSync(o))return null;let n=Z9(e,r);if(n===null)return"skip";let s=Me.default.join(t,"files",r);return G.default.mkdirSync(Me.default.dirname(s),{recursive:!0}),G.default.writeFileSync(s,n),s},vz=e=>{let t=G.default.mkdtempSync(Me.default.join(vv.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?bz(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:wz(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,nX(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?_v(e.workingDirectory):null,isolateCaches:eX(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:Y9.map(i=>tX(e.workingDirectory,t,i))}},kz=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Wc(e.workingDirectory,t);return}Q9(e.workingDirectory,t,G.default.readFileSync(r))}},sX=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?kz(e,t):bv(e.workingDirectory,t)?di(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Wc(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&bv(e.workingDirectory,t)&&di(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!bv(e.workingDirectory,t)&&di(e.workingDirectory,["reset","-q","HEAD","--",t])},iX=(e,t)=>{let r=ui(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Wc(e.workingDirectory,t.relativePath),G.default.mkdirSync(Me.default.dirname(r),{recursive:!0}),G.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Wc(e.workingDirectory,t.relativePath);return}if(G.default.existsSync(r))for(let o of G.default.readdirSync(r)){let n=Me.default.join(r,o);G.default.statSync(n).mtimeMs>=e.startedMs-1e3&&G.default.rmSync(n,{recursive:!0,force:!0})}}}},Tz=e=>{try{if(e.git){if(_v(e.workingDirectory)!==e.head&&(!(e.head===null?di(e.workingDirectory,["update-ref","-d","HEAD"]):di(e.workingDirectory,["reset","--hard",e.head]))||_v(e.workingDirectory)!==e.head))throw new Error("head");let r=bz(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))sX(e,o)}else{if(e.complete)for(let t of wz(e.workingDirectory).paths)e.files[t]===void 0&&Wc(e.workingDirectory,t);for(let t of Object.keys(e.files))kz(e,t)}for(let t of e.caches)iX(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{G.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var mf,gf,aX,lX,cX,dX,uX,Lz,pX,Ez,Rz=l(()=>{"use strict";R();cf();Sv();Sz();Cz();we();Ke();zt();Mn();mf=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),gf=e=>({...e,status:"stopped",errorMessage:bn,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),aX=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),lX=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==W?t:e.improverModel!==W?e.improverModel:null}return e.judgeModel!==W?e.judgeModel:e.improverModel!==W?e.improverModel:null},cX=async e=>{let t=ue(e.cycle),r=hz({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=vz({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?ac({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:vn(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):Xl({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=cz({promptText:e.revision.promptText,isModuleRun:i}),c=Ec({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await Qe({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=u.ok?yz({workingDirectory:t,before:r,writerReply:u.text}):null,S=Tz(o),h={...e.cycle,revisions:e.cycle.revisions.map(y=>y.roundNumber===e.cycle.currentRound?d:y)};return u.ok?!S.ok||m===null?{ok:!1,cycle:mf(h,S.ok?"Could not put the folder back after the run.":S.errorMessage)}:{ok:!0,cycle:h,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:gf(h)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:mf(h,u.errorMessage,nr(u))})},dX=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:cX({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),uX=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),Lz=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Qe({writerAgent:e.reviewer,workingDirectory:ue(e.cycle),prompt:iw({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:gf(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},pX=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===W)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Qe({writerAgent:t.judgeModel,workingDirectory:ue(t),prompt:wn({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...xc(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?gf(o):(e.onWriterFailure?.(t.judgeModel),mf(o,n.errorMessage,nr(n)))},Ez=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return pX(e);let o=lX(t),n=await dX({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?aX(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===W){let u=await Lz({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{...uX(s,u.text),judgePhase:void 0}}let i=await Qe({writerAgent:t.judgeModel,workingDirectory:ue(t),prompt:_n({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?gf(s):(e.onWriterFailure?.(t.judgeModel),mf(s,i.errorMessage,nr(i)));let a=await Lz({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=xc(s,i.text,c);return df(d,a.text)}});var ff,mX,gX,kv,xz=l(()=>{"use strict";R();cf();Rz();Kg();zt();we();yv();Ke();Mn();ff=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),mX=e=>({...e,status:"stopped",errorMessage:bn,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),gX=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?mX(e):(n?.(r),ff(e,t.errorMessage,nr(t))),kv=async(e,t,r,o)=>{let n=Rc(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return ff(e,"This round has no prompt.");if(e.status==="judging")return Ez({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return ff(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===W)return e;let i=In(e);if(i===null)return ff(e,"The improver needs the score and the reason.");let a=await Qe({writerAgent:e.improverModel,workingDirectory:ue(e),prompt:yo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:Ec()}),c=gX(e,a,e.improverModel,r,t);return c!==null?c:lf(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var Ic,Tv,fX,Iz,Wz,hX,yX,hf,Oz,Mz,SX,PX,Nn,Nz,Dz,Oc=l(()=>{"use strict";R();Tc();Cc();we();Ke();zt();Mn();xz();Kw();Ic=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),Tv=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return Ic(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},fX=e=>{let t=nr(e);return sj(e)||t==="usage_limit"||t==="action_required"},Iz=(e,t,r)=>fX(r)?Ic(e,r.errorMessage,nr(r)):Tv(e,t,r.errorMessage),Wz=e=>{let t=e.wizard;return t===void 0||Pc(e).length===0?e:{...e,wizard:Qs({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},hX=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",yX=e=>{let t=e.wizard;if(t===void 0)return e;let r=lc({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Qs({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},hf=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),Oz=e=>e.judgeModel!==W?e.judgeModel:e.improverModel!==W?e.improverModel:null,Mz=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},SX=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=Oz(e);if(n===null)return Ic(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Mt(o),i=sc({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:Mz(e,"generalize")}),a=await Qe({writerAgent:n,prompt:i,workingDirectory:ue(e),signal:t});if(!a.ok)return r?.(n),Iz(e,"generalize",a);try{let c=Lw(a.text),d=Qs({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:gc(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return dc(d)?Nn({...u,wizard:{...d,gate:null}}):hf(u,"generalize")}catch(c){return Tv(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},PX=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=Oz(e);if(n===null)return Ic(e,"Choose a writer to suggest splits.");let s=Nt({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=ic({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:Mz(e,"separate")}),a=await Qe({writerAgent:n,prompt:i,workingDirectory:ue(e),signal:t});if(!a.ok)return r?.(n),Iz(e,"separate",a);try{let c=Ew(a.text),d=Sw(c,o.variables),u=Qs({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:u};return pc(d)?Ao(m,d[0]):hf(m,"separate")}catch(c){return Tv(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},Nn=e=>{let t=e.wizard;if(t===void 0)return e;let r=Mt(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},Nz=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Ic(e,"This module is missing.");let n=Cr(r),s=kn(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==W?e.runnerModel:e.judgeModel!==W?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:ie(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},Dz=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return kv(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return SX(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return PX(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await kv(e,t,r,o);if(E(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Pc(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=ce(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&uc({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let u=Wz(hf(a,i));return bo(u)}let c=hf(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=bw({wizard:{...c.wizard,modules:c.wizard.modules.map((m,S)=>S===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:hX(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?Wz(d):yX(d)}return s}return n.phase==="complete",e}});var pi,yf=l(()=>{"use strict";R();we();pi=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:kw(r,e.judgeModel===W),updatedAt:new Date().toISOString()}}});var mi,Sf=l(()=>{"use strict";mi=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var St,jz,AX,zz=l(()=>{"use strict";R();Ke();Sf();zt();cv();St=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jz=e=>{if(!E(e.status))return"";let t=ce(e.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??null,reasons:S.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=yt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${St(t.reasons.trim())}</p>`,i=e.status==="passed",a=mi(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${St(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${St(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${St(n)}</div>`:i?AX({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ue(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${St(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${St(t.promptText)}</pre></details>`,m=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${m}</h2>${d}${o}${s}${u}</section>`},AX=e=>{let t=e.sourceSkill?.fileName??vc(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=nf(t,r),s=n.length>0&&Zj(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${St(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${St(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${St(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${St(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${St(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${St(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var $z,Hz=l(()=>{"use strict";$z=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var Fz,bX,Pf,et,Af,Cv=l(()=>{"use strict";R();we();Hz();zg();zt();Sf();Fz=["Generalize","Evaluate","Separate","Optimize modules"],bX=e=>{let t=It(e),r=t>=0&&t<Fz.length?Fz[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},Pf=(e,t)=>{let r=En(e),o=r===null?null:$z(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},et=(e,t)=>({title:e,detail:t,replyPreview:null}),Af=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=En(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:uj(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!E(e.status)){let t=e.judgeModel;return et(`${ae(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!E(e.status)){let t=e.judgeModel;return et(`${ae(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===W?et(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?et(`${ae(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):et(`${ae(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===W){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==W?et(`${ae(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):et(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return et(`${ae(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ie(t);return et(`${ae(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return et(`${ae(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ie(t);return et(`${ae(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return et(`${ae(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===W){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return et("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return et(`${ae(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>yt(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=oe(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||E(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?Pf(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=mi(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?Pf(e,{title:`${bX(r)}${s}`,detail:t.length>0?t:n}):Pf(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(E(e.status)){let t=e.errorMessage?.trim()??"";return Pf(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var lr,Mc=l(()=>{"use strict";we();lr=e=>{if(e.status==="improving"&&e.improverModel===W)return!0;if(e.status!=="judging"||e.judgeModel!==W)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===W}});var Uz,Bz=l(()=>{"use strict";Uz=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var _o,_X,Gz,qz=l(()=>{"use strict";R();_o=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_X=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${_o(r)}</p>`},Gz=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${_o(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${_o(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${_o(a)}.</p>`}<pre class="mono">${_o(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${So(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${_o(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",m=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${_o(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${_X(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${_o(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Nc,wX,Vz,Kz=l(()=>{"use strict";R();zt();Nc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wX=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=yt(t.promptText),n=t.judgement?.reasons?`<p class="muted">${Nc(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Nc(i)}.</p>`}<pre class="mono">${Nc(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${So(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${Nc(d)}</pre>`:`<div class="alert-error">${Nc(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${u}</article>`},Vz=e=>e.revisions.map(t=>wX(e,t)).join("")});var Jz,Xz=l(()=>{"use strict";R();Jz=e=>{if(E(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var cr,vX,Lv,kX,TX,CX,LX,Yz,Zz,Ev=l(()=>{"use strict";Xz();cr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vX="Stop this run? Writers will stop and the best prompt is kept.",Lv="End the wizard? Writers will stop and progress from finished steps is kept.",kX="Skip this module and pause at the step gate?",TX=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${cr(vX)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${cr(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,CX=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${cr(Lv)}"><input type="hidden" name="cycleId" value="${cr(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,LX=e=>{let t=cr(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${cr(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${cr(kX)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${cr(Lv)}">End wizard</button>
    </form>
  </div>`},Yz=e=>{let t=Jz(e);return t==="none"?"":t==="legacy_stop"?TX(e.id):t==="wizard_end_only"?CX(e.id):LX(e)},Zz=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=cr(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${cr(Lv)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var Qz,e$=l(()=>{"use strict";R();ai();Qz=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=oe(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${On(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${On(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${ie(r)}`}return""}});var EX,RX,t$,xX,r$,o$=l(()=>{"use strict";R();e$();iv();Gg();Xg();EX=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',RX=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',t$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xX=(e,t,r)=>{let o=si(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=Qz(e,t),i=Jg(e,t),a=EX(i),c=RX(i),d=ii(e,t,{forOutcomeSummary:!0}),u=`${a}<span class="sdlc-wizard-outcome-step-title">${t$(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${t$(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",S=i==="failed"&&t!=="wizard-4"?" open":"",h=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${h}"${m}${S}><summary aria-controls="${h}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${h}-body">${o}</div></details>`},r$=e=>{let t=e.wizard;if(t===void 0||!E(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>xX(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var n$,s$,i$=l(()=>{"use strict";n$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),s$=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${n$(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${n$(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var Rv,a$,xv=l(()=>{"use strict";Rv=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,a$=(e,t)=>{if(Rv(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var l$,c$=l(()=>{"use strict";l$=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var bf,d$,u$=l(()=>{"use strict";R();xv();xv();c$();bf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),d$=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=oe(t),o=ie(t),n=r.terminalStatusSuggestion==="passed"?"":l$(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,h=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=u===void 0?c.status:a$(u,o),p=u!==void 0&&Rv(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':y==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':y==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':bf(y);return`<tr${h}><td>${bf(c.title)}</td><td>${bf(m)}</td><td>${c.tokens??"\u2014"}</td><td>${p}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${bf(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var Dn,_f,Wv=l(()=>{"use strict";Dn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_f=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Dn(r.fileName)}</code> \u2014 ${Dn(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${Dn(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${Dn(i.name)}</strong> <code>.cursor/skills/${Dn(i.fileName)}/SKILL.md</code></p><p class="muted">${Dn(i.description)}</p><p>${Dn(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var WX,p$,m$=l(()=>{"use strict";R();i$();u$();Wv();WX=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p$=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!E(e.status)||t.modules.length===0)return"";let r=d$(e),o=s$(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=oe(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${WX(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${_f(e)}${a}${r}${o}</section>`}});var K,wf=l(()=>{"use strict";R();K={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var vf,Iv=l(()=>{"use strict";vf=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var g$,f$=l(()=>{"use strict";wf();Iv();g$=e=>{let t=vf({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:K.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var Ir,Dc=l(()=>{"use strict";Ir=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var Or,kf,Ov=l(()=>{"use strict";R();Zg();zz();Cv();Mc();Bz();Kg();qz();Kz();Ev();o$();m$();ai();f$();Ke();Dc();Or=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kf=e=>{let t=!E(e.status)&&e.status!=="wizard_paused"&&!lr(e),r=Af(e),o=jj(pw(Uz(e)),e),n=E(e.status)?"":Yz(e),s=r$(e),i=p$(e),a=jz(e),c=e.errorMessage===null?"":`<div class="alert-error">${Or(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?oe(e.wizard):null,S=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,h=!t&&e.wizard!==void 0&&E(e.status)&&(e.wizard.phase==="complete"||oe(e.wizard).passedModuleCount>0),y=h?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",p=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Or(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",P=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${Or(r.replyPreview)}</pre>`,A=r.detail.length===0&&p.length===0&&P.length===0||r.detail.length===0&&P.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Or(r.detail)}${u}</p>`}${P}</div>`,f=e.revisions.find(Wo=>Wo.roundNumber===e.currentRound),b=e.status==="improving"?In(e):null,w=Wr(e),k=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),T=lr(e)?Gz({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:b?.promptText??f?.promptText??"",score:b?.score??f?.judgement?.score??null,reasons:b?.reasons??f?.judgement?.reasons??null,avoid:b?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:k?1:0}):"",L=e.wizard!==void 0&&e.wizard.phase==="complete"&&E(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!L&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?ie(e.wizard):e.passScore,N=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${Yg(I)}</div>`:"",U=e.status==="failed"?g$({status:e.status,errorKind:e.errorKind}):null,q=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':E(e.status)?U!==null?`<span class="${U.badgeClass}">${U.badgeLabel}</span>`:L&&m!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",V=t?d:h?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',Je=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Or(ut(ue(e)))}</li>`:"",w>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${On(w)} so far</li>`:""].filter(Wo=>Wo.length>0),H=Je.length===0?"":`<ul class="sdlc-run-meta">${Je.join("")}</ul>`,Ce=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,Xr=L?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,mr=L?"":N.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${Xr}</div>`:`<div class="sdlc-run-grid">${Xr}${N}</div>`,dL=Vz(e),V5=e.wizard!==void 0&&E(e.status)&&e.revisions.every(Wo=>Wo.roundNumber===0&&(Wo.judgement===void 0||Wo.judgement===null)),K5=dL.length===0||V5?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${dL}</div></section>`,J5=`<p class="sdlc-run-goal" title="${Or(e.goal.trim())}">${Or(Ir(e.goal))}</p>`,X5=L?`${c}${i}${s}${T}${a}`:`${c}${mr}${T}${s}${a}`,Y5='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',Z5=L?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Or(e.updatedAt)}" aria-busy="${t?"true":"false"}">${Y5}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${q}</div>${J5}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${V}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Or(r.title)}</h2>${A}${p}${Z5}</div></div>${H}${Ce}</header>${X5}</section>${K5}`}});var h$,y$=l(()=>{"use strict";R();Cc();h$=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!uc({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:bo(e)}});var S$,P$=l(()=>{"use strict";R();Oc();S$=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!dc(t)?e:Nn({...e,wizard:{...t,gate:null}})}});var A$,b$=l(()=>{"use strict";R();Tc();A$=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!pc(t.splitOptions))return e;let r=t.splitOptions[0];return Ao(e,r)}});var IX,jn,Tf=l(()=>{"use strict";y$();P$();b$();pt();IX=e=>{let t=S$(e),r=h$(t);return A$(r)},jn=(e,t)=>{let r=IX(t);return r!==t?(j(e,r),r):t}});var _$,Mr,jc=l(()=>{"use strict";R();_$=e=>ct.indexOf(e),Mr=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||E(e.status)?ct.length:t.gate!==null?_$(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?_$(t.phase):null}});var w$,v$=l(()=>{"use strict";w$=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var zn,k$,T$=l(()=>{"use strict";R();v$();zn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),k$=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=vn(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${zn(w$(o))}</pre></div>`:"",s=Tn(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=Cr(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),u=Ig(c),m=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${zn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${zn(u)}">${zn(S)}</label>
        ${h}
        <input class="input" type="text" id="${zn(u)}" name="${zn(u)}" value="${zn(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var C$,L$=l(()=>{"use strict";C$={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var zc,OX,pe,wo=l(()=>{"use strict";L$();Po();zc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OX=e=>{let t=C$[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${zc(t.title)}" aria-describedby="${r}" aria-expanded="false">${Ze}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${zc(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${zc(t.example)}</span></span></button>`},pe=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${zc(r)}"`}>${zc(e)}</span>${OX(t)}</span>`});var Pt,E$,R$,x$=l(()=>{"use strict";R();kc();wf();wo();Pt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),E$=e=>{let t=e.costControls;if(t===void 0||oi(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??dt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${Pt(K.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${Pt(t.softWarnMessage??Cn)}</p>`:"",d=af({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${Pt(K.estimateOverCeilingWarn)}</p>`:"",u=e.wizard?.modules.length??0,m=u>0?`<p class="muted">Step 4 will optimize ${u} module${u===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${Pt(K.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${Pt(K.confirmLede)}</p>
  ${m}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${Pt(ei)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${Pt(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${Pt(K.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${Pt(K.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${Pt(K.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${pe(K.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${pe(K.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${Pt(K.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${Pt(K.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},R$=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!oi(r)}});var MX,W$,I$=l(()=>{"use strict";Po();MX=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),W$=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${Ze}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${MX(t)}</pre></template>`}});var $c,O$,M$=l(()=>{"use strict";R();Vw();T$();Qw();Ev();Wv();rv();x$();I$();$c=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),O$=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(R$(e))return E$(e);let n=ie(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?_j(r):"",a=o==="evaluate"?_f(e):"",c=o==="evaluate"?ni({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(I=>{let N=I.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',U=I.recommended?' <span class="sdlc-badge">Recommended</span>':"",q=r.selectedSplitOptionId===I.id||r.selectedSplitOptionId===null&&I.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${$c(I.id)}" required${q}> <strong>${$c(I.title)}</strong>${N}${U}</label>${Ug(e,I)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],h=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=m?.title??"Module",p=m?.prompt??"",P=m?.status==="pending",A=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${$c(y)}</p>${P?k$({cycle:e,modulePrompt:p}):""}<p class="muted">Test run prompt preview: ${$c(kn(p,Cr(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${ni({cycle:e,interactive:!1,caption:P?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",f=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":P?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",b=cc(r),w=b===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${b}</p>`,k=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?W$(r.lastWriterParseFailureReply??""):"",T=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",L=t?.active===!0?" sdlc-wizard-gate-active":"",x=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${T}"`:"";return`<section class="card sdlc-wizard-gate${L}"${x}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${f}</p>
    ${k}
    ${w}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${$c(e.id)}">
    ${i}
    ${a}
    ${c}
    ${u}
    ${A}
      <div class="field">
        <label class="field-label" for="wizardFeedback">Feedback to rerun this step</label>
        <textarea class="input textarea" id="wizardFeedback" name="wizardFeedback" rows="3" placeholder="What should change?"></textarea>
      </div>
      <div class="field">
        <label class="field-label" for="wizardStepInstructions">Extra instructions (optional)</label>
        <textarea class="input textarea" id="wizardStepInstructions" name="wizardStepInstructions" rows="2" placeholder="Added to this step only when you rerun with feedback."></textarea>
      </div>
      <div class="sdlc-wizard-actions">
        <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue"${h}>Continue</button>
        <button class="btn btn-secondary" type="submit" name="intent" value="wizard-feedback-rerun" formnovalidate>Rerun with feedback</button>
      </div>
    </form>
    ${Zz(e)}
  </section>`}});var NX,N$,D$=l(()=>{"use strict";R();Xg();NX=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),N$=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||E(e.status))return"";let r=(o,n)=>{let s=ii(e,o);return`<h2 class="sdlc-wizard-active-head">${NX(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    ${r("wizard-3","Suggesting module splits")}
    <p class="muted">The writer is proposing split options. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;if(t.phase==="optimize_modules"&&t.modules.length>0){let o=t.currentModuleIndex,s=t.modules[o]?.title??"Module";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4">
    <p class="eyebrow">Step 4 \u2014 Optimize modules</p>
    ${r("wizard-4",`Module ${o+1} of ${t.modules.length}: ${s}`)}
    <p class="muted">The runner executes this module in your folder, then the judge scores it. When the round finishes, the Step 4 review gate appears here. Until then, watch <strong>This run</strong> above.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`}return t.phase==="evaluate"?`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-2">
    <p class="eyebrow">Step 2 \u2014 Evaluate</p>
    ${r("wizard-2","Scoring prompt revisions")}
    <p class="muted">The judge is revising and scoring prompt text. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`:t.phase==="generalize"?`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-1">
    <p class="eyebrow">Step 1 \u2014 Generalize</p>
    ${r("wizard-1","Generalizing your prompt")}
    <p class="muted">The writer is building {{variables}}. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`:""}});var Mv,j$,z$,vo,$$,gi=l(()=>{"use strict";R();pt();Mv=new Map,j$=e=>{let t=new AbortController;return Mv.set(e,t),t.signal},z$=e=>{Mv.delete(e)},vo=e=>{Mv.get(e)?.abort()},$$=(e,t)=>{let r=Z(e,t);return r===null||r.wizard!==void 0?!1:(E(r.status)||(j(e,{...r,status:"stopped",errorMessage:bn,updatedAt:new Date().toISOString()}),vo(t)),!0)}});var H$,F$,Nv,U$,Dv=l(()=>{"use strict";R();jc();gi();H$="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",F$=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return ct[r]??null},Nv=(e,t)=>{let r=F$(t);if(r===null||e.wizard===void 0)return!1;let o=ct.indexOf(r);if(o===-1)return!1;let n=Mr(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<ct.length)},U$=(e,t)=>{let r=F$(t);if(r===null||e.wizard===void 0||!Nv(e,t))return e;vo(e.id);let o=ct.slice(ct.indexOf(r)),n=nc(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var jv,B$,G$=l(()=>{"use strict";Dv();jv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),B$=(e,t)=>Nv(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${jv(H$)}"><input type="hidden" name="cycleId" value="${jv(e.id)}"><input type="hidden" name="wizardStepId" value="${jv(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var DX,q$,jX,V$,K$=l(()=>{"use strict";R();jc();M$();D$();G$();Gg();DX={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},q$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jX=(e,t,r)=>{let o=B$(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${q$(t)}">
  <summary class="sdlc-wizard-accordion-summary">${q$(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${si(e,t)}</div>
</details>`},V$=e=>{let t=e.wizard;if(t===void 0)return"";let r=Mr(e);if(r===null)return"";let o=ct.slice(0,r).map((i,a)=>jX(e,`wizard-${a+1}`,DX[i])),n=t.gate!==null?O$(e,{active:!0}):N$(e),s=r>=ct.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var Cf,zv=l(()=>{"use strict";K$();tv();R();Cf=e=>{if(e===null||e.wizard!==void 0&&E(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=V$(e),r=Cj(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var zX,$v,J$=l(()=>{"use strict";R();we();Ke();Mn();zX=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},$v=async(e,t,r)=>{if(!zX(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===W)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=_w({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Qe({writerAgent:e.judgeModel,prompt:n,workingDirectory:ue(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=vw(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var Hc,Lf,X$,Hv,Y$,Z$,Q$,Ef,Fv=l(()=>{"use strict";Hc=g(require("node:fs")),Lf=g(require("node:path")),X$=e=>Lf.default.join(Lf.default.dirname(e),"prompt-optimizer-writer-ready.json"),Hv=e=>{let t=X$(e);if(!Hc.default.existsSync(t))return{};try{let r=JSON.parse(Hc.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},Y$=(e,t)=>{Hc.default.mkdirSync(Lf.default.dirname(e),{recursive:!0}),Hc.default.writeFileSync(X$(e),`${JSON.stringify(t,null,2)}
`)},Z$=(e,t)=>Hv(e)[t]?.message??null,Q$=(e,t,r)=>{Y$(e,{...Hv(e),[t]:{message:r}})},Ef=(e,t)=>{let r=Hv(e);r[t]!==void 0&&Y$(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var Uv,Rf,xf,eH,ve,$n=l(()=>{"use strict";R();dv();Oc();J$();Mc();gi();Fv();Tf();pt();Uv=new Set,Rf={atMs:0,ids:[]},xf=async()=>{if(Date.now()-Rf.atMs<3e4)return Rf.ids;let e=await Wt({commands:he({})});return Rf.atMs=Date.now(),Rf.ids=e.installedWriterIds,e.installedWriterIds},eH=async(e,t,r)=>{let o=Z(e,t);if(o===null||r.aborted)return;let n=jn(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(E(n.status)&&!s||n.status==="wizard_paused"||lr(n))return;if(s){let c=await $v(n,r,d=>{Ef(e,d)});j(e,c);return}let i=await Dz(n,c=>{Ef(e,c)},r,c=>{Z(e,t)?.status==="stopped"||r.aborted||j(e,c)});if(!(Z(e,t)?.status==="stopped"||r.aborted)){if(j(e,i),E(i.status)){let c=await $v(i,r,d=>{Ef(e,d)});j(e,c);return}await eH(e,t,r)}},ve=(e,t)=>{if(Uv.has(t))return;let r=Z(e,t);if(r===null)return;let o=jn(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(E(o.status)&&!n||o.status==="wizard_paused"||lr(o))return;Uv.add(t);let s=j$(t);eH(e,t,s).finally(()=>{Uv.delete(t),z$(t)})}});var ko,Fc=l(()=>{"use strict";Ov();Tf();zv();$n();ko=(e,t)=>{let r=jn(e,t);return ve(e,r.id),`${kf(r)}${Cf(r)}`}});var tH,rH,oH=l(()=>{"use strict";tH=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,rH=e=>e!==null&&e>0});var $X,HX,FX,nH,sH=l(()=>{"use strict";R();Oc();yf();Tc();Cc();gi();qg();qg();$X=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),HX=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ce(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},FX=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=oe(o);return pi({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},nH=(e,t)=>{if(!wc(e,t))return e;vo(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return Nn({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return bo(HX(r));if(t==="wizard-3"){let n=o.splitOptions[0]??$X(o.templatedPrompt);return Ao(r,n)}return t==="wizard-4"?FX(r):e}});var Wf,iH,Bv=l(()=>{"use strict";R();yf();gi();Wf=e=>(vo(e.id),{...pi(e,"stopped"),errorMessage:J_}),iH=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;vo(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var UX,aH,lH,cH=l(()=>{"use strict";R();Oc();yf();Tc();Cc();Fc();pt();$n();oH();Dv();sH();Bv();UX="Pick a revision scored above 0 before continuing to Separate.",aH=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),lH=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=Z(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=Z(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(ko(e.storePath,d))};if(o==="wizard-stop-all"){let c=Wf(s);return j(e.storePath,c),ve(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=iH(s);return j(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=U$(s,c);return j(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=nH(s,c);return j(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&ve(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",m=hw(s.wizard,d,c);m=nc(m,d),m={...m,pendingStepInstructions:u};let S={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return j(e.storePath,S),ve(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?aH(s):Nn({...s,wizard:{...s.wizard,gate:null}});return j(e.storePath,m),ve(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=tH(s,u??-1);if(!rH(m)){let h={...s,errorMessage:UX,updatedAt:new Date().toISOString()};return j(e.storePath,h),a(n),!0}let S=bo({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return j(e.storePath,S),ve(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=aH(s);return j(e.storePath,h),ve(e.storePath,n),a(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(h=>h.id===u);if(m===void 0){let h={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return j(e.storePath,h),a(n),!0}let S=Ao(s,m);return j(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,m=d.modules[u];if(m===void 0)return a(n),!0;if(!oi(s.costControls)){let P=t.get("confirmedTokenBudget")?.trim()??"",A=t.get("confirmedMaxSpendUsd")?.trim()??"";if(P.length===0){let b={...s,errorMessage:ei,updatedAt:new Date().toISOString()};return j(e.storePath,b),a(n),!0}let f=Rr({existing:s.costControls,confirmedTokenBudget:Number(P),confirmedMaxSpendUsd:A.length===0?null:Number(A),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!f.ok){let b={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return j(e.storePath,b),a(n),!0}s={...s,costControls:f.costControls,errorMessage:null,updatedAt:new Date().toISOString()},j(e.storePath,s)}let S=Mw({wizard:d,modulePrompt:m.prompt,posted:t});if(!S.ok){let P={...s,errorMessage:S.errorMessage,updatedAt:new Date().toISOString()};return j(e.storePath,P),a(n),!0}let h={...d,parameterValues:S.parameterValues};if(m.status==="pending"){let P=Nz({...s,wizard:{...h,gate:null}},u);return j(e.storePath,P),ve(e.storePath,n),a(n),!0}let y=u+1;if(y>=d.modules.length){let P=oe(h),A=pi({...s,wizard:h},P.terminalStatusSuggestion);return j(e.storePath,A),ve(e.storePath,n),a(n),!0}let p={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...h,gate:"optimize_modules",currentModuleIndex:y},updatedAt:new Date().toISOString()};return j(e.storePath,p),a(n),!0}}return a(n),!0}});var BX,dH,GX,Gv,qX,uH,pH=l(()=>{"use strict";we();gi();Bv();Sv();cf();Mc();pt();BX="Add a score from 0 to 100 and the reason for it.",dH="Add a score from 1 to 100 and the reason for it.",GX="Write the next prompt.",Gv="This step is not waiting for you.",qX=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},uH=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=Z(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(j(e.storePath,Wf(a)),{kind:"saved",cycleId:i}):$$(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=Z(e.storePath,r);if(o===null||!lr(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:Gv};if(t==="manual-judge"){if(o.judgeModel!==W)return{kind:"invalid",cycle:o,errorMessage:Gv};let i=qX(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?dH:BX};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:dH};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",u=df(xc(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return j(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==W)return{kind:"invalid",cycle:o,errorMessage:Gv};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:GX};let s=lf(o,n);return j(e.storePath,s),{kind:"saved",cycleId:o.id}}});var mH,gH=l(()=>{"use strict";mH=`<script>
(() => {
  let root = null;
  let pollTimer = null;
  let lastWizardGateScrollStepId = null;

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
    const busy = incoming.getAttribute("aria-busy");
    root.setAttribute(
      "aria-busy",
      busy ?? (root.dataset.live === "true" ? "true" : "false"),
    );
    root.innerHTML = incoming.innerHTML;
    paintElapsed();
  };
  const applyIncomingGate = (holder) => {
    const incomingGateSlot = holder.querySelector("#prompt-optimizer-wizard-gate-slot");
    const gateSlot = document.getElementById("prompt-optimizer-wizard-gate-slot");
    if (incomingGateSlot === null || gateSlot === null) return;
    const accordionDom = window.__promptSdlcWizardAccordionDom;
    const openAccordionSteps = accordionDom?.readOpen() ?? new Set();
    gateSlot.replaceWith(incomingGateSlot);
    accordionDom?.restoreOpen(openAccordionSteps);
    const fields = document.querySelector(".sdlc-fields");
    if (fields instanceof HTMLFieldSetElement) fields.disabled = true;
    const active = document.getElementById("prompt-optimizer-wizard-active-step");
    if (active instanceof HTMLElement) {
      const stepId = active.dataset.sdlcStepId ?? "";
      if (stepId.length > 0 && stepId !== lastWizardGateScrollStepId) {
        lastWizardGateScrollStepId = stepId;
        active.scrollIntoView({ behavior: "smooth", block: "start" });
      }
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
    document.dispatchEvent(new Event("sdlc-node-dialog-refresh"));
    if (root.dataset.live !== "true") {
      lastWizardGateScrollStepId = null;
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
</script>`});var fH,hH=l(()=>{"use strict";fH=`<script>
(() => {
  const enterComposeRunStarted = () => {
    const compose = document.getElementById("prompt-optimizer-compose");
    const details = document.getElementById("prompt-optimizer-compose-details");
    if (details instanceof HTMLDetailsElement) {
      details.open = false;
    }
    if (compose instanceof HTMLElement) {
      compose.classList.add("sdlc-compose-run-started");
      compose.classList.remove("sdlc-compose-run-focus");
    }
    document.querySelectorAll("[data-sdlc-compose-head-actions]").forEach((node) => {
      if (node instanceof HTMLElement) {
        node.hidden = true;
      }
    });
  };

  const focusRunPanel = () => {
    const run = document.getElementById("prompt-optimizer-run");
    if (run === null) return;
    enterComposeRunStarted();
    run.scrollIntoView({ behavior: "smooth", block: "start" });
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
    document
      .querySelectorAll(".sdlc-compose-step-actions")
      .forEach((node) => {
        if (node instanceof HTMLElement) {
          node.hidden = true;
        }
      });
    document.querySelector(".sdlc-wizard-resume-paused")?.remove();
    focusRunPanel();
  };

  let lastWizardAutofocusStepId = null;

  const readWizardAutofocusStepId = () => {
    const active = document.getElementById("prompt-optimizer-wizard-active-step");
    if (!(active instanceof HTMLElement)) return null;
    const stepId = active.dataset.sdlcStepId;
    return typeof stepId === "string" && stepId.length > 0 ? stepId : null;
  };

  const focusActiveWizardStep = () => {
    const stepId = readWizardAutofocusStepId();
    if (stepId === null) return;
    if (stepId === lastWizardAutofocusStepId) return;
    const active = document.getElementById("prompt-optimizer-wizard-active-step");
    if (active === null) return;
    lastWizardAutofocusStepId = stepId;
    active.scrollIntoView({ behavior: "smooth", block: "start" });
    const focusTarget = active.querySelector(
      "textarea, input:not([type=hidden]), button, select",
    );
    if (focusTarget instanceof HTMLElement) focusTarget.focus({ preventScroll: true });
  };

  document.addEventListener("sdlc-run-finished", () => {
    lastWizardAutofocusStepId = null;
  });

  const applyLiveFragment = (html) => {
    const holder = document.createElement("div");
    holder.innerHTML = html;
    let applied = false;
    let runApplied = false;
    const incomingGateSlot = holder.querySelector("#prompt-optimizer-wizard-gate-slot");
    const gateSlot = document.getElementById("prompt-optimizer-wizard-gate-slot");
    const accordionDom = window.__promptSdlcWizardAccordionDom;
    const openAccordionSteps = accordionDom?.readOpen() ?? new Set();
    if (incomingGateSlot !== null && gateSlot !== null) {
      gateSlot.replaceWith(incomingGateSlot);
      accordionDom?.restoreOpen(openAccordionSteps);
      applied = true;
    } else if (incomingGateSlot !== null && gateSlot === null) {
      const runAnchor = document.getElementById("prompt-optimizer-run");
      const resume = document.querySelector(".sdlc-wizard-resume");
      const compose = document.getElementById("prompt-optimizer-compose");
      const insertAfter =
        runAnchor ?? resume ?? compose;
      insertAfter?.insertAdjacentElement("afterend", incomingGateSlot);
      accordionDom?.restoreOpen(openAccordionSteps);
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
    if (!applied) {
      document.dispatchEvent(new Event("sdlc-run-start-failed"));
      return;
    }
    if (runApplied) {
      lockCompose();
    } else {
      focusActiveWizardStep();
    }
    const runAfter = document.getElementById("prompt-optimizer-run");
    if (runAfter instanceof HTMLElement && runAfter.dataset.live !== "true") {
      document.dispatchEvent(new Event("sdlc-run-finished"));
    }
    document.dispatchEvent(new CustomEvent("sdlc-live-restart"));
    document.dispatchEvent(new Event("sdlc-node-dialog-refresh"));
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
    if (response === null || !response.ok) {
      document.dispatchEvent(new Event("sdlc-run-start-failed"));
      return false;
    }
    const html = await response.text();
    if (html.trim().length === 0) {
      document.dispatchEvent(new Event("sdlc-run-start-failed"));
      return false;
    }
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

  const runOnLoad = document.getElementById("prompt-optimizer-run");
  const runBusyOnLoad =
    runOnLoad instanceof HTMLElement &&
    runOnLoad.getAttribute("aria-busy") === "true";
  const stepOnLoad = readWizardAutofocusStepId();
  if (runBusyOnLoad && stepOnLoad !== null) {
    lastWizardAutofocusStepId = stepOnLoad;
  } else {
    focusActiveWizardStep();
  }
})();
</script>`});var yH,SH=l(()=>{"use strict";yH=`<script>
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
    const run = document.getElementById("prompt-optimizer-run");
    if (run === null) return;
    const compose = document.getElementById("prompt-optimizer-compose");
    if (
      compose instanceof HTMLElement &&
      !compose.classList.contains("sdlc-compose-viewing-finished")
    ) {
      compose.classList.add("sdlc-compose-run-focus");
    }
    run.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const setComposeHeadActionsHidden = (hidden) => {
    document.querySelectorAll("[data-sdlc-compose-head-actions]").forEach((node) => {
      if (node instanceof HTMLElement) {
        node.hidden = hidden;
      }
    });
  };
  const revertRunStartUi = () => {
    paintRunButton(false);
    const compose = document.getElementById("prompt-optimizer-compose");
    compose?.classList.remove("sdlc-compose-run-focus");
    compose?.classList.remove("sdlc-compose-run-started");
    document.querySelectorAll(".sdlc-compose-step-actions").forEach((node) => {
      if (node instanceof HTMLElement) {
        node.hidden = false;
      }
    });
    setComposeHeadActionsHidden(false);
    paintReady();
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
    const composeFormEl = document.querySelector("form.sdlc-form");
    const passStep2 =
      composeFormEl instanceof HTMLFormElement
        ? composeFormEl.querySelector('[name="passScore"]')
        : null;
    const passStep4 =
      composeFormEl instanceof HTMLFormElement
        ? composeFormEl.querySelector('[name="modulePassScore"]')
        : null;
    const passStep2Text =
      passStep2 instanceof HTMLInputElement ? passStep2.value : "70";
    const passStep4Text =
      passStep4 instanceof HTMLInputElement ? passStep4.value : "90";
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
      "</dd>" +
      "<dt>Step 2 pass</dt><dd>" +
      escapeComposeText(passStep2Text) +
      "</dd>" +
      "<dt>Step 4 pass</dt><dd>" +
      escapeComposeText(passStep4Text) +
      "</dd>" +
      "<dt>Est. tokens</dt><dd>" +
      escapeComposeText(String(readCostEstimate().targetTokenBudget)) +
      "</dd>" +
      "<dt>Est. spend</dt><dd>$" +
      escapeComposeText(readCostEstimate().estimatedSpendUsd.toFixed(4)) +
      "</dd>";
  };
  const COST_EARLY_TOKENS_PER_ROUND = 4000;
  const COST_PREVIEW_STEP4_MODULES = 2;
  const COST_STEP4_TOKENS_PER_MODULE_TRIAL = 8000;
  const COST_WIZARD_MAX_ROUNDS = 5;
  const COST_DEFAULT_RATE = 0.01;
  const COST_WRITER_RATES = {
    "claude-cli": 0.009,
    codex: 0.008,
    cursor: 0.01,
    "cursor-cloud": 0.01,
    antigravity: 0.01,
  };
  const resolveWriterRate = (writerId) => {
    const id = typeof writerId === "string" ? writerId.trim() : "";
    if (id.length === 0 || id === "manual") return COST_DEFAULT_RATE;
    const rate = COST_WRITER_RATES[id];
    return typeof rate === "number" ? rate : COST_DEFAULT_RATE;
  };
  const estimateSpendUsd = (tokens, rate) => {
    if (!Number.isFinite(tokens) || !Number.isFinite(rate) || tokens < 0 || rate < 0) {
      return 0;
    }
    return Math.round((tokens / 1000) * rate * 10000) / 10000;
  };
  const readCostEstimate = () => {
    const trialsInput = document.querySelector("[data-sdlc-max-trials]");
    const trialsRaw =
      trialsInput instanceof HTMLInputElement ? Number(trialsInput.value) : 1;
    const trials =
      Number.isInteger(trialsRaw) && trialsRaw >= 1 ? trialsRaw : 1;
    const judgeSelect = document.querySelector('[data-writer-select="judge"]');
    const writerId =
      judgeSelect instanceof HTMLSelectElement ? judgeSelect.value.trim() : "";
    const rate = resolveWriterRate(writerId);
    const earlyTokens = COST_WIZARD_MAX_ROUNDS * COST_EARLY_TOKENS_PER_ROUND;
    const step4Tokens =
      COST_PREVIEW_STEP4_MODULES * trials * COST_STEP4_TOKENS_PER_MODULE_TRIAL;
    const targetTokenBudget = earlyTokens + step4Tokens;
    return {
      targetTokenBudget,
      estimatedSpendUsd: estimateSpendUsd(targetTokenBudget, rate),
      rateUsdPer1kTokens: rate,
      writerId: writerId.length === 0 || writerId === "manual" ? "default" : writerId,
    };
  };
  const paintCostEstimate = () => {
    const estimateRoot = document.querySelector("[data-sdlc-cost-estimate]");
    if (!(estimateRoot instanceof HTMLElement)) return;
    const proposal = readCostEstimate();
    const tokensEl = estimateRoot.querySelector("[data-sdlc-target-tokens]");
    const spendEl = estimateRoot.querySelector("[data-sdlc-estimated-spend]");
    const rateChip = estimateRoot.querySelector("[data-sdlc-writer-rate-chip]");
    const tokensInput = document.querySelector(
      "[data-sdlc-target-token-budget-input]",
    );
    const spendInput = document.querySelector("[data-sdlc-estimated-spend-input]");
    const rateInput = document.querySelector("[data-sdlc-cost-rate]");
    const overEl = document.querySelector("[data-sdlc-estimate-over-ceiling]");
    const maxSpendInput = document.querySelector("[data-sdlc-max-spend-usd]");
    if (tokensEl instanceof HTMLElement) {
      tokensEl.textContent = proposal.targetTokenBudget.toLocaleString("en-US");
    }
    if (spendEl instanceof HTMLElement) {
      spendEl.textContent = "$" + proposal.estimatedSpendUsd.toFixed(4);
    }
    if (rateChip instanceof HTMLElement) {
      rateChip.textContent =
        "$" +
        proposal.rateUsdPer1kTokens.toFixed(4) +
        " / 1k \xB7 " +
        proposal.writerId;
      rateChip.dataset.writerId = proposal.writerId;
    }
    if (tokensInput instanceof HTMLInputElement) {
      tokensInput.value = String(proposal.targetTokenBudget);
    }
    if (spendInput instanceof HTMLInputElement) {
      spendInput.value = String(proposal.estimatedSpendUsd);
    }
    if (rateInput instanceof HTMLInputElement) {
      rateInput.value = String(proposal.rateUsdPer1kTokens);
    }
    if (overEl instanceof HTMLElement) {
      const spendRaw =
        maxSpendInput instanceof HTMLInputElement
          ? maxSpendInput.value.trim()
          : "";
      const ceiling = spendRaw.length === 0 ? null : Number(spendRaw);
      const over =
        ceiling !== null &&
        Number.isFinite(ceiling) &&
        proposal.estimatedSpendUsd > ceiling;
      overEl.hidden = !over;
    }
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
    paintCostEstimate();
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
  const composeForm = document.querySelector("form.sdlc-form");
  const goalInput = document.querySelector('form.sdlc-form [name="goal"]');
  const promptInput = document.querySelector('form.sdlc-form [name="prompt"]');
  composeForm?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const chip = target.closest("[data-sdlc-goal-preset]");
    if (!(chip instanceof HTMLButtonElement)) return;
    const preset = chip.dataset.sdlcGoalPreset?.trim() ?? "";
    if (preset.length === 0) return;
    const goal =
      composeForm?.querySelector('[name="goal"]') ?? goalInput;
    if (!(goal instanceof HTMLTextAreaElement)) return;
    goal.value = preset;
    paintComposeStepError(null);
    goal.dispatchEvent(new Event("input", { bubbles: true }));
    goal.focus();
  });
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
  const refreshCostEstimate = () => {
    paintCostEstimate();
    if (composeStep === COMPOSE_STEP_COUNT) paintComposeReview();
  };
  document
    .querySelectorAll(
      "[data-sdlc-max-trials], [data-sdlc-max-spend-usd], [data-writer-select='judge']",
    )
    .forEach((node) => {
      node.addEventListener("input", refreshCostEstimate);
      node.addEventListener("change", refreshCostEstimate);
    });
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
  document.querySelectorAll("[data-sdlc-compose-skip-to-summary]").forEach((btn) => {
    btn.addEventListener("click", () => {
      paintComposeStepError(null);
      showComposeStep(COMPOSE_STEP_COUNT);
    });
  });
  [...new Set(slots.map((slot) => slot.dataset.writer))].forEach((writer) => {
    if (writer) void paintWriter(writer);
  });
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
        const run = document.getElementById("prompt-optimizer-run");
        if (run !== null) {
          const details = document.getElementById("prompt-optimizer-compose-details");
          if (details instanceof HTMLDetailsElement) {
            details.open = false;
          }
          document
            .getElementById("prompt-optimizer-compose")
            ?.classList.add("sdlc-compose-run-started");
          setComposeHeadActionsHidden(true);
          document.querySelectorAll(".sdlc-compose-step-actions").forEach((node) => {
            if (node instanceof HTMLElement) {
              node.hidden = true;
            }
          });
          run.scrollIntoView({ behavior: "smooth", block: "start" });
        }
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
  paintCostEstimate();
  paintReady();
  document.addEventListener("sdlc-run-start-failed", revertRunStartUi);
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
      compose?.classList.remove("sdlc-compose-run-started");
      document.querySelectorAll(".sdlc-compose-step-actions").forEach((node) => {
        if (node instanceof HTMLElement) {
          node.hidden = false;
        }
      });
      setComposeHeadActionsHidden(false);
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
</script>`});var PH,AH=l(()=>{"use strict";PH=`<script>
(() => {
  const globalKey = "__promptSdlcWizardAccordionDom";
  const existing = window[globalKey];
  if (existing !== undefined && existing !== null) return;

  const userOpenSteps = new Set();

  const readOpenWizardAccordionSteps = () => {
    const open = new Set(userOpenSteps);
    document
      .querySelectorAll("[data-sdlc-wizard-accordion-step]")
      .forEach((node) => {
        if (!(node instanceof HTMLDetailsElement) || !node.open) return;
        const stepId = node.dataset.sdlcWizardAccordionStep;
        if (typeof stepId === "string" && stepId.length > 0) open.add(stepId);
      });
    return open;
  };

  const restoreOpenWizardAccordionSteps = (openIds, root = document) => {
    openIds.forEach((stepId) => {
      const node = root.querySelector(
        \`[data-sdlc-wizard-accordion-step="\${stepId}"]\`,
      );
      if (node instanceof HTMLDetailsElement) {
        node.open = true;
        userOpenSteps.add(stepId);
      }
    });
  };

  document.addEventListener(
    "toggle",
    (event) => {
      const target = event.target;
      if (!(target instanceof HTMLDetailsElement)) return;
      if (!target.hasAttribute("data-sdlc-wizard-accordion-step")) return;
      const stepId = target.dataset.sdlcWizardAccordionStep;
      if (typeof stepId !== "string" || stepId.length === 0) return;
      if (target.open) userOpenSteps.add(stepId);
      else userOpenSteps.delete(stepId);
    },
    true,
  );

  window[globalKey] = {
    readOpen: readOpenWizardAccordionSteps,
    restoreOpen: restoreOpenWizardAccordionSteps,
  };
})();
</script>`});var bH,_H=l(()=>{"use strict";R();Ke();bH=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:ut(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(ie(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!E(t.status)}}});var wH,vH=l(()=>{"use strict";wH=`<script>
(() => {
  const list = document.querySelector(".sdlc-history");
  if (!(list instanceof HTMLUListElement)) return;
  const items = [...list.querySelectorAll("[data-sdlc-history-kind]")];
  const buttons = [...document.querySelectorAll("[data-sdlc-history-filter]")];
  const apply = (kind) => {
    items.forEach((item) => {
      if (!(item instanceof HTMLLIElement)) return;
      const itemKind = item.dataset.sdlcHistoryKind ?? "legacy";
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
</script>`});var kH,TH=l(()=>{"use strict";R();jc();Sf();kH=e=>{let t=mi(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:E(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=Mr(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=oe(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=oe(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return E(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var CH,LH=l(()=>{"use strict";CH=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Nr,VX,KX,EH,RH=l(()=>{"use strict";TH();LH();Dc();Nr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),VX=e=>e.wizard===void 0?"legacy":"wizard",KX=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Nr(t)}">`,o=kH(e),n=CH(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Nr(o.badgeClass)}">${Nr(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Nr(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Nr(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${VX(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Nr(e.id)}">${Nr(Ir(e.goal))}</a><p class="muted">${Nr(a)}</p></div></div><div class="sdlc-history-row-actions">${u}${m}</div></li>`},EH=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>KX(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Nr(s)}</summary>${i}</details>`:i}});var qv,If,xH,JX,XX,Uc,WH,Of=l(()=>{"use strict";qv=g(require("node:fs")),If=g(require("node:path"));Ke();xH=/^[a-z0-9-]+$/,JX=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},XX=(e,t)=>{if(!xH.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let m=JX(u[2]??"");u[1]==="name"&&m.length>0&&(o=m),u[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},Uc=e=>{let t=xr(e);if(!t.ok)return[];let r=If.default.resolve(t.path,".cursor","skills"),o=[];try{o=qv.default.readdirSync(r)}catch{return[]}return o.filter(n=>xH.test(n)).flatMap(n=>{let s=If.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${If.default.sep}`))return[];try{let i=XX(qv.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},WH=(e,t)=>Uc(e).find(r=>r.fileName===t)??null});var IH,YX,OH,MH,NH=l(()=>{"use strict";wo();IH=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YX=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),OH=e=>{if(e.length===0)return`<div class="field">${pe("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${IH(r.fileName)}">${IH(r.fileName)}</option>`).join("");return`<div class="field">${pe("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${YX(e)}</script>`},MH=`<script>
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
  const orchestratorInput = document.querySelector("[data-orchestrator-skill-file]");
  const orchestratorNote = document.querySelector("[data-orchestrator-skill-note]");
  const paintOrchestratorNote = (fileName) => {
    if (!(orchestratorNote instanceof HTMLElement)) return;
    if (typeof fileName !== "string" || fileName.length === 0) {
      orchestratorNote.textContent = "";
      orchestratorNote.hidden = true;
      return;
    }
    orchestratorNote.textContent =
      "Orchestrator skill: " +
      fileName +
      ". The prompt may change in Step 2 evaluate; this skill keeps the orchestrator role.";
    orchestratorNote.hidden = false;
  };
  const setOrchestratorFile = (fileName) => {
    if (orchestratorInput instanceof HTMLInputElement) {
      orchestratorInput.value = fileName;
    }
    paintOrchestratorNote(fileName);
  };
  select.addEventListener("change", () => {
    const skill = skills.find((item) => item.fileName === select.value);
    const prompt = document.querySelector('textarea[name="prompt"]');
    if (!(prompt instanceof HTMLTextAreaElement) || skill === undefined) return;
    if (typeof skill.promptText !== "string") return;
    prompt.value = skill.promptText;
    prompt.dispatchEvent(new Event("input"));
    setOrchestratorFile(select.value);
  });
  if (select.value.length > 0) {
    setOrchestratorFile(select.value);
  }
})();
</script>`});var tt,DH,jH=l(()=>{"use strict";R();wf();kc();wo();tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DH=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=tt(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=ri({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??Er(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),m=af({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",S=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${tt(K.knobsSectionTitle)}</p>
  <p class="muted">${tt(K.knobsSectionLede)}</p>
  <div class="field">
    ${pe(K.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${pe(K.maxSpendUsdLabel,"maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${o}" placeholder="Optional" data-sdlc-max-spend-usd>
    <p class="muted">${tt(K.autoConfirmHint)}</p>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${n}>
      <span>${tt(K.earlyStopLabel)}</span>
    </label>
    <p class="muted">${tt(K.earlyStopHint)}</p>
  </div>
  <div class="sdlc-cost-estimate" data-sdlc-cost-estimate>
    <p class="sdlc-block-title">${tt(K.estimateSectionTitle)}</p>
    <p class="muted">${tt(K.estimateSectionLede)}</p>
    <dl class="sdlc-cost-proposal sdlc-cost-estimate-proposal">
      <div><dt>${tt(K.targetTokenLabel)}</dt><dd data-sdlc-target-tokens data-sdlc-proposed-tokens>${a.targetTokenBudget.toLocaleString("en-US")}</dd></div>
      <div><dt>${tt(K.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${a.estimatedSpendUsd.toFixed(4)}</dd></div>
      <div><dt>${tt(K.rateChipLabel)}</dt><dd><span class="sdlc-cost-rate-chip" data-sdlc-writer-rate-chip data-writer-id="${tt(S)}">$${c.toFixed(4)} / 1k \xB7 ${tt(S)}</span></dd></div>
    </dl>
    <input type="hidden" name="targetTokenBudget" value="${a.targetTokenBudget}" data-sdlc-target-token-budget-input>
    <input type="hidden" name="estimatedSpendUsd" value="${a.estimatedSpendUsd}" data-sdlc-estimated-spend-input>
    <input type="hidden" name="rateUsdPer1kTokens" value="${c}" data-sdlc-cost-rate>
    <p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling${m}>${tt(K.estimateOverCeilingWarn)}</p>
  </div>
</div>`}});var Be,zH,$H,ZX,HH,FH,UH,BH=l(()=>{"use strict";R();Cv();we();Dc();jc();Be=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zH=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",$H=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,ZX=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},HH=e=>e===W?"You":ae(e),FH=e=>{let t=ZX(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ae(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Be(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Be(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Be(HH(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Be(HH(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Be(r)}</dd></div>
    </dl>
  </details>`},UH=e=>{let t=e.wizard;if(t===void 0)return"";let r=Ir(e.goal),o=e.status==="wizard_paused",n=!E(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=Af(e),m=$H(t),S=m===null?"":zH(m),h=Mr(e),y=S.length===0?"":h===null||h>=4?` <strong>${Be(S)}</strong>`:` <strong>${Be(S)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Be(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Be(u.title)}${y}</p>
    <p class="muted">${Be(u.detail)}</p>
    <div class="actions">
      ${FH(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Be(e.id)}">Open this run</a>
    </div>
  </section>`}let s=$H(t),i=s===null?"Wizard":zH(s),a=Mr(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Be(r)}</h2>
    <p class="lede">Paused at <strong>${Be(i)}</strong>${Be(c)} (last updated ${Be(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${FH(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Be(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Bc,GH,qH=l(()=>{"use strict";wo();Bc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GH=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${Bc(n.id)}"${n.id===e.runner?" selected":""}>${Bc(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Bc(e.runner)}">Checking ${Bc(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${pe("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${pe("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Bc(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var VH,KH=l(()=>{"use strict";VH=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var fi,JH,XH,YH,ZH,QH=l(()=>{"use strict";wo();fi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),JH=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${fi(c.id)}"${c.id===r?" selected":""}>${fi(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${fi(n)}</option>`;return`<div class="field">${pe(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},XH=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${fi(t)}">Checking ${fi(o)}\u2026</p>`},YH=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${pe(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${fi(r)}</textarea><span class="muted">${o}</span></div></details>`,ZH=e=>{let t=`<div class="sdlc-writer">${JH("judge","Judge",e.judge,e.writers,"I'll score it")}${XH("judge",e.judge,e.writers)}${YH("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${JH("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${XH("improver",e.improver,e.writers)}${YH("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var eF,tF=l(()=>{"use strict";eF=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var Vv,rF,oF=l(()=>{"use strict";tF();Vv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rF=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${eF.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${Vv(t.goal)}" title="${Vv(t.goal)}">${Vv(t.label)}</button>`).join("")}</div>`});var Gc,QX,eY,Kv,nF=l(()=>{"use strict";R();wo();Gc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),QX=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},eY=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,Kv=e=>{let t=QX(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=Zl(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${pe(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${Gc(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${Gc(e.inputId)}" class="sdlc-pass-range" type="range" name="${Gc(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${Gc(a)}"><span class="sdlc-pass-mark" style="left:${eY(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${Gc(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var rY,Jv,Dr,sF,iF=l(()=>{"use strict";Mc();Ov();gH();hH();Zg();SH();AH();_H();vH();RH();Of();NH();wo();zv();jH();BH();Dc();qH();KH();QH();R();oF();nF();rY=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Jv='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',Dr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sF=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Dr(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Dr(e.skillNotice??"")}</div>`,o=`${zj}${$j}`,n=e.resumableWizardCycle??null,s=n===null?"":UH(n),i=Cf(e.cycle),a=e.cycle===null?"":kf(e.cycle),c=e.cycle!==null&&lr(e.cycle),d=bH(e),u=rY(d.goal,d.prompt,e.canRun),m=ZH({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=GH({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=`${Kv({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${Kv({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=DH({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),p=gw,P=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",A=e.cycle!==null&&E(e.cycle.status),f=d.running&&!A,b=A||f?"":" open",w=f?" sdlc-compose-run-focus":"",T=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${A?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,L=A?(()=>{let H=e.cycle!==null?Ir(e.cycle.goal):Ir(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Dr(H)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${T}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${T}</summary>`,x=A?" sdlc-compose-viewing-finished":"",I=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",N=c?"waiting":d.running?"running":"idle",U=d.running&&!c?' aria-busy="true"':"",q=`<section class="card sdlc-compose${x}${w}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${b}>
        ${L}
        <div class="sdlc-compose-details-body">
      <p class="lede">${p} ${Dr(e.modelNote)}</p>
        <ol class="sdlc-compose-stepper" aria-label="Compose steps" data-sdlc-compose-stepper>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="1" aria-current="step"><span class="sdlc-compose-stepper-index">1</span><span class="sdlc-compose-stepper-label">Project</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="2"><span class="sdlc-compose-stepper-index">2</span><span class="sdlc-compose-stepper-label">Prompt and goal</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="3"><span class="sdlc-compose-stepper-index">3</span><span class="sdlc-compose-stepper-label">CLI</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="4"><span class="sdlc-compose-stepper-index">4</span><span class="sdlc-compose-stepper-label">Summary</span></li>
        </ol>
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${P}
        <p class="alert-error sdlc-compose-step-error" data-sdlc-compose-step-error hidden role="alert"></p>
        <div class="sdlc-compose-step" data-sdlc-compose-step="1" id="sdlc-compose-step-1">
          <h3 class="sdlc-compose-step-title">Project</h3>
          <p class="muted sdlc-compose-step-lede">Choose the folder writers run in and optionally load a skill into the prompt on the next step.</p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="sdlc-folder">
          <div class="field">
            ${pe("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Dr(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${OH(Uc(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${Jv}
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <input type="hidden" name="orchestratorSkillFile" value="" data-orchestrator-skill-file>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <p class="muted sdlc-compose-orchestrator-note" data-orchestrator-skill-note hidden></p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${pe("Goal","goal")}
            ${rF()}
            <textarea class="input textarea" name="goal" rows="4" required>${Dr(d.goal)}</textarea>
          </div>
          <div class="field">
            ${pe("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Dr(d.prompt)}</textarea>
          </div>
          ${h}
          ${y}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${Jv}
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <div class="sdlc-compose-step" data-sdlc-compose-step="3" id="sdlc-compose-step-3" hidden>
          <h3 class="sdlc-compose-step-title">CLI</h3>
          <p class="muted sdlc-compose-step-lede">Pick who scores, who rewrites, and who runs wizard step 4 modules.</p>
          <div class="sdlc-block sdlc-block-flush">
          <p class="sdlc-block-title">Judge and improver</p>
          ${m}
        </div>
        ${S}
        ${VH()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${Jv}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${Dr(d.passScore)}; Step 4 pass \u2265 ${Dr(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${N}" data-can-run="${u?"true":"false"}"${U}${d.running?" disabled":""}>${I}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,V=e.history.length>0?wH:"",Je=`${""}${PH}${mH}${fH}${yH}${MH}${V}`;return`${t}${r}${q}${s}${a}${i}${o}${EH(e.history,e.cycle?.id??null)}${Je}`}});var qc,Xv=l(()=>{"use strict";iF();qc=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:sF(t)}))}});var aF,lF=l(()=>{"use strict";pH();Fc();Xv();pt();$n();aF=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:uH({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=Z(e.storePath,o.cycleId);return ve(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(ko(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await qc(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:ir(e.storePath),resumableWizardCycle:null}),!0)}});var cF,Mf,Yv=l(()=>{"use strict";R();cF=g(require("node:os")),Mf=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??cF.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??jt()}}});var dF,hi,Zv,uF,pF,Vc=l(()=>{"use strict";R();we();av();dF=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,hi=e=>{let t=mj(e),r=Rn(e).map(s=>({id:s,label:$g[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},Zv=(e,t,r)=>t===W||t!==null&&e.writers.some(o=>o.id===t)?t:r,uF=(e,t,r,o=null)=>({judge:Zv(e,t,e.judge),improver:Zv(e,r,e.improver),runner:Zv(e,o,e.runner)}),pF=e=>e===Qg?{goal:ef,prompt:tf}:{goal:"",prompt:""}});var Qv,mF=l(()=>{"use strict";Qv=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var gF,oY,fF,hF,yF,SF=l(()=>{"use strict";R();gF=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},oY=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},fF=(e,t)=>e.has("earlyStop")?!0:t!=="run",hF=e=>{let t=gF(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=oY(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=gF(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},yF=e=>jt(e)});var PF,AF,Nf,ek=l(()=>{"use strict";R();we();Ke();Vc();mF();SF();PF=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=Qv(o);return n.ok?String(n.passScore):String(r)},AF=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return Qv(n)},Nf=e=>{let t=uF(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=PF(e.posted,"passScore",70),o=PF(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",m=e.posted?.get("intent")??"",S=e.posted===null?!0:fF(e.posted,m),h=(L,x)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:L,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:x,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:u,earlyStop:S});if(e.posted===null)return h(e.defaultFolder??xn,null);let y=e.posted.get("folder")??xn;if(e.posted.get("intent")==="choose-folder"){let L=e.pickFolder();return h(L===null?y:ut(L),null)}if((e.posted.get("intent")??"")!=="run")return h(y,null);let P=dF(e.goal,e.prompt);if(P!==null)return h(y,P);let A=AF(e.posted,"passScore",r);if(!A.ok)return h(y,A.errorMessage);let f=AF(e.posted,"modulePassScore",o);if(!f.ok)return h(y,f.errorMessage);let b=gj(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(b===null)return h(y,"Choose a judge and an improver.");let w=xr(y);if(!w.ok)return h(y,w.errorMessage);let k=fj(e.installedIds,c,b.judge);if(k===null)return h(y,"Choose a runner for wizard step 4.");let T=hF({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return T.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:w.path,passScore:A.passScore,modulePassScore:f.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:k,runnerInstructions:a,costControls:yF(T.knobs)}:h(y,T.errorMessage)}});var yi,jf,nY,tk,bF,Df,_F,sY,wF,rk,iY,aY,lY,ok,vF,kF,TF=l(()=>{"use strict";yi=g(require("node:fs")),jf=g(require("node:path"));we();Ke();nY=["remember","choose-folder","run"],tk=()=>({folder:xn,judge:"",improver:"",runner:""}),bF=e=>jf.default.join(jf.default.dirname(e),"prompt-optimizer-preferences.json"),Df=e=>typeof e=="string"?e:"",_F=e=>{let t=bF(e);if(!yi.default.existsSync(t))return tk();try{let r=JSON.parse(yi.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return tk();let o=r,n=Df(o.folder).trim();return{folder:n.length===0?xn:n,judge:Df(o.judge),improver:Df(o.improver),runner:Df(o.runner)}}catch{return tk()}},sY=(e,t)=>{let r=bF(e);yi.default.mkdirSync(jf.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;yi.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),yi.default.renameSync(o,r)},wF=(e,t)=>e===W||Rn(t).some(r=>r===e),rk=(e,t,r)=>e===null?t:e.length===0?"":wF(e,r)?e:t,iY=(e,t)=>{if(e===null)return t;let r=xr(e);return r.ok?r.display:t},aY=e=>{let t=_F(e.storePath),r={folder:iY(e.folder,t.folder),judge:rk(e.judge,t.judge,e.installedIds),improver:rk(e.improver,t.improver,e.installedIds),runner:rk(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||sY(e.storePath,r)},lY=e=>{let t=xr(e);return t.ok?t.display:xn},ok=(e,t)=>wF(e,t)?e:"",vF=e=>{let t=_F(e.storePath);return{selection:{...e.selection,judge:ok(t.judge,e.installedIds)||e.selection.judge,improver:ok(t.improver,e.installedIds)||e.selection.improver,runner:ok(t.runner,e.installedIds)||e.selection.runner},defaultFolder:lY(t.folder)}},kF=e=>{let t=e.posted.get("intent")??"";if(!nY.includes(t))return;let r=e.posted.get("folder");aY({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var CF,cY,dY,nk,uY,zf,$f=l(()=>{"use strict";CF=g(require("node:os"));we();Fv();Mn();cY="Reply with the single word ok. Do not use tools.",dY=45e3,nk=async(e,t)=>{if(t===W)return{ok:!0,message:"You will do this step."};let r=Z$(e,t);if(r!==null)return{ok:!0,message:r};let o=await Qe({writerAgent:t,prompt:cY,workingDirectory:CF.default.tmpdir(),timeoutMs:dY});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ae(t)} is ready.`;return Q$(e,t,n),{ok:!0,message:n}},uY=e=>[...new Set(e.filter(t=>t.length>0))],zf=async(e,t,r,o)=>{for(let n of uY([t,r,o??""])){let s=await nk(e,n);if(!s.ok)return s.message}return null}});var sk,LF=l(()=>{"use strict";R();sk=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!E(r.status)&&!(t!==null&&r.id===t))return r;return null}});var EF,RF=l(()=>{"use strict";tr();R();kc();Fc();Yv();ek();Xv();pt();Ke();TF();Of();$f();LF();Tf();$n();EF=async e=>{let t=e.posted===null?vF({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Nf({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>go("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(kF({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?ut(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await zf(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await qc(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:ut(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:ir(e.route.storePath),resumableWizardCycle:sk(ir(e.route.storePath),null)});return}if(r.kind==="start"){let s=WH(r.workingDirectory,r.sourceSkillFile),i=sf(Sc({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=Mf({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:Tw({...oc(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(j(e.route.storePath,a),ve(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(ko(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:Z(e.route.storePath,e.cycleId);n!==null&&(n=jn(e.route.storePath,n),ve(e.route.storePath,n.id)),await qc(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:ir(e.route.storePath),resumableWizardCycle:sk(ir(e.route.storePath),n?.id??null)})}});var xF,WF=l(()=>{"use strict";pt();xF=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";Jj(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var IF,OF=l(()=>{"use strict";IF=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var MF,NF=l(()=>{"use strict";rz();cH();lF();RF();WF();Vc();OF();$n();MF=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await xf(),o=hi(r),n=e.method==="POST"?IF(e.request.headers["content-type"],await e.readBody(e.request)):null;if(lH({posted:n,storePath:e.storePath,response:e.response})||await aF(e,n,o))return;let s=pF(t.searchParams.get("example")),i=xF({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=tz({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await EF({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:ez(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var pY,DF,jF=l(()=>{"use strict";R();pt();pY=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",DF=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=Z(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!E(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=Cw({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${pY(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var zF,$F=l(()=>{"use strict";Fc();pt();zF=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:Z(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":ko(e.storePath,o)),!0}});var mY,HF,FF=l(()=>{"use strict";we();$f();mY=["claude-cli","codex","cursor","antigravity"],HF=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===W||mY.includes(t)?await nk(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var UF,BF=l(()=>{"use strict";R();UF=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:ec,page:tc,context:Ys,installedWriters:e,post:{method:"POST",url:ec,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${ec}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var Hf,GF=l(()=>{"use strict";R();Iv();ai();Hf=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ce(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=E(e.status),n=e.errorKind??null,s=vf({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:Wr(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:Ys,page:`${tc}?cycle=${encodeURIComponent(e.id)}`}}});var F,gY,qF,VF,KF=l(()=>{"use strict";F=g(ns());R();gY=(0,F.isType)({goal:F.isString,prompt:F.isString,workingDirectory:F.isString,judge:(0,F.isUndefinedOr)(F.isString),improver:(0,F.isUndefinedOr)(F.isString),passScore:(0,F.isUndefinedOr)(F.isNumber),maxRounds:(0,F.isUndefinedOr)(F.isNumber),maxTrials:(0,F.isUndefinedOr)(F.isNumber),maxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),earlyStop:(0,F.isUndefinedOr)(F.isBoolean),earlyStopFlatRounds:(0,F.isUndefinedOr)(F.isNumber),confirmedTokenBudget:(0,F.isUndefinedOr)(F.isNumber),confirmedMaxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),rateUsdPer1kTokens:(0,F.isUndefinedOr)(F.isNumber)}),qF=e=>{let t=e?.trim()??"";return t.length===0?null:t},VF=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return gY(t)?t.workingDirectory.trim().length===0?{ok:!1,error:Tg}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:qF(t.judge),improver:qF(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:Tg}}});var jr,fY,JF,XF,YF=l(()=>{"use strict";R();jr=g(ns()),fY=(0,jr.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:jr.isNumber,confirmedMaxSpendUsd:(0,jr.isUndefinedOr)(jr.isNumber),rateUsdPer1kTokens:(0,jr.isUndefinedOr)(jr.isNumber)}),JF=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:fY(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},XF=(e,t)=>{let r=Rr({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var hY,ZF,QF=l(()=>{"use strict";R();we();ek();Vc();hY=e=>e.map(t=>t.id).join(", "),ZF=e=>{let t=hi(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===W||n===W)return{ok:!1,error:mw,installedWriters:t.writers};if(o===null||n===null){let a=hY(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=Nf({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var yY,e1,t1=l(()=>{"use strict";R();Yv();BF();GF();Vc();KF();YF();QF();pt();yY=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},e1=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let u=Z(e.storePath,t);return u===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:Hf(u)}}let r=await e.handlers.readInstalledIds(),o=hi(r);if(e.method==="GET")return{status:200,body:UF(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let u=JF(e.rawBody);if(u.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(u.kind==="invalid")return{status:400,body:{ok:!1,error:u.error}};let m=Z(e.storePath,t);if(m===null)return{status:404,body:{ok:!1,error:"That run is not on this Mac."}};let S=XF(m,u.body);return S.ok?(j(e.storePath,S.cycle),{status:200,body:Hf(S.cycle)}):{status:400,body:{ok:!1,error:S.error}}}let n=yY(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let u=ri({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:u.targetTokenBudget,proposedTokenBudget:u.targetTokenBudget,estimatedSpendUsd:u.estimatedSpendUsd,rateUsdPer1kTokens:u.rateUsdPer1kTokens??null,proposalStub:u.stub===!0,confirmationRequired:!0}}}let s=VF(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=ZF({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=Sc({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:dt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let u=Rr({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!u.ok)return{status:400,body:{ok:!1,error:u.errorMessage}};c=u.costControls}let d=Mf({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:oc(i.prompt),runnerModel:i.runner,costControls:c});return j(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:Hf(d)}}});var r1,o1=l(()=>{"use strict";$n();$f();t1();r1=async e=>{let t=await e1({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:xf,readWritersReady:zf,startCycle:ve}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var s1,SY,PY,n1,AY,i1,a1=l(()=>{"use strict";s1=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],SY=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},PY=e=>{let t={};for(let n of e)for(let s of new Set(s1(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},n1=(e,t)=>{let r=SY(s1(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},AY=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},i1=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=PY(e.map(i=>i.text)),s=n1(o,n);return e.map(i=>({id:i.id,score:AY(s,n1(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var ik,bY,_Y,l1,wY,vY,kY,TY,ak,lk=l(()=>{"use strict";ik=g(require("node:path"));Ke();a1();Of();bY=5,_Y=20,l1=280,wY=e=>[e.name,e.description,e.promptText].join(`
`),vY=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=l1?t:`${t.slice(0,l1-3)}...`},kY=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),TY=e=>e===void 0||!Number.isFinite(e)?bY:Math.min(_Y,Math.max(1,Math.floor(e))),ak=e=>{let t=e.query.trim(),r=TY(e.limit),o=xr(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=Uc(o.path),s=i1(n.map(d=>({id:d.fileName,text:wY(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=ik.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:ik.default.join(a,u.fileName,"SKILL.md"),excerpt:vY(u),source:"filesystem"}]});return{query:t,hits:c,context:kY(c)}}});var c1,d1=l(()=>{"use strict";lk();c1=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:ak({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var u1,p1=l(()=>{"use strict";d1();u1=async e=>{let t=c1({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var CY,ck,m1=l(()=>{"use strict";Uj();NF();jF();$F();FF();o1();p1();CY=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},ck=async e=>{let t=CY(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await r1(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await u1(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:Fj()})),!0):(await HF({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||DF({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||zF({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await MF(e),!0)}});var g1=l(()=>{"use strict";m1();lk();Mn()});var f1,LY,zr,dk,uk=l(()=>{"use strict";f1=e=>{let t=JSON.parse(e);return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]},LY=e=>e===""?null:e,zr=e=>e??"",dk=e=>({id:e.id,projectId:LY(e.project_id),symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:{kind:e.check_kind,value:e.check_value},keywords:f1(e.keywords_json),tags:f1(e.tags_json),source:e.source,hitCount:e.hit_count,lastSeenAt:e.last_seen_at,severity:e.severity})});var h1,EY,RY,pk,Si,Ff,Kc=l(()=>{"use strict";uk();h1=`
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`,EY=e=>e,RY=e=>e??null,pk=(e,t,r=t)=>EY(e.prepare(h1).all(zr(r),zr(t))).map(dk),Si=(e,t,r,o=t)=>{let n=RY(e.prepare(`${h1} AND p.id = ?`).get(zr(o),zr(t),r));return n===null?null:dk(n)},Ff=(e,t)=>{e.prepare(`INSERT INTO pitfalls (
      project_id, id, symptom, cause, avoidance,
      check_kind, check_value, keywords_json, tags_json,
      source, severity
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(project_id, id) DO UPDATE SET
      symptom = excluded.symptom,
      cause = excluded.cause,
      avoidance = excluded.avoidance,
      check_kind = excluded.check_kind,
      check_value = excluded.check_value,
      keywords_json = excluded.keywords_json,
      tags_json = excluded.tags_json,
      source = excluded.source,
      severity = excluded.severity`).run(zr(t.projectId),t.id,t.symptom,t.cause,t.avoidance,t.check.kind,t.check.value,JSON.stringify(t.keywords),JSON.stringify(t.tags),t.source,t.severity)}});var Uf,y1=l(()=>{"use strict";Uf="token-saver.db"});var A1,Pi=l(()=>{"use strict";y1();A1=e=>Math.ceil(e.length/4)});var Jc,Gf,qf,Xc=l(()=>{"use strict";Pi();Jc=e=>`${e.id} | ${e.avoidance}`,Gf=e=>e.map(t=>({id:t.id,avoidance:t.avoidance})),qf=e=>{let t=[],r=0;for(let o of e){if(t.length>=4)break;let n=Jc(o),s=A1(n);if(t.length>0&&r+s>200)break;t.push(o),r+=s}return t}});var Vf,b1,Kf=l(()=>{"use strict";Vf=e=>{let t=new Map;e.seeds.forEach(o=>{t.set(o.id,o)}),e.projectRows.forEach(o=>{t.set(o.id,o)});let r=[...t.values()];return e.includeRetired===!0?r:r.filter(o=>o.source!=="retired")},b1=e=>e.filter(t=>t.source!=="retired").length});var Hn,_1,Yc=l(()=>{"use strict";Xc();Kc();Kf();Hn=(e,t={})=>{let r=t.projectId??null,o=pk(e,null,r),n=r===null||r===""?[]:pk(e,r);return Vf({seeds:o,projectRows:n,includeRetired:t.includeRetired===!0})},_1=(e,t={})=>{let r=Hn(e,t);return t.format==="bot"?{format:"bot",items:Gf(r),lines:r.map(Jc)}:{format:"full",items:r}}});var Jf,yk=l(()=>{"use strict";Kc();Yc();Jf=(e,t)=>{let r=t.id.trim();if(r.length===0)return null;let o=t.projectId??null;return o===null||o===""?Si(e,null,r):Hn(e,{projectId:o,includeRetired:!0}).find(s=>s.id===r)??null}});var xY,WY,Xf,Sk=l(()=>{"use strict";Xc();xY=e=>e.toLowerCase(),WY=(e,t)=>{let r=xY(e);return t.reduce((o,n)=>{let s=n.trim().toLowerCase();return s.length===0?o:r.includes(s)?o+1:o},0)},Xf=e=>{let t=e.pitfalls.map(r=>({pitfall:r,score:WY(e.text,r.keywords)})).filter(r=>r.score>0).sort((r,o)=>o.score-r.score||r.pitfall.id.localeCompare(o.pitfall.id));return t.length===0?[]:qf(t.map(r=>r.pitfall))}});var w1,v1=l(()=>{"use strict";Yc();Sk();w1=(e,t)=>{let r=Hn(e,{projectId:t.projectId,includeRetired:!1});return Xf({pitfalls:r,text:t.text})}});var k1,T1=l(()=>{"use strict";Pi();k1=`
CREATE TABLE IF NOT EXISTS pitfall_meta (
  key TEXT NOT NULL PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pitfalls (
  project_id TEXT NOT NULL DEFAULT '',
  id TEXT NOT NULL,
  symptom TEXT NOT NULL,
  cause TEXT NOT NULL,
  avoidance TEXT NOT NULL,
  check_kind TEXT NOT NULL,
  check_value TEXT NOT NULL,
  keywords_json TEXT NOT NULL,
  tags_json TEXT NOT NULL,
  source TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'warn',
  PRIMARY KEY (project_id, id)
);

CREATE INDEX IF NOT EXISTS pitfalls_project_source_idx
  ON pitfalls (project_id, source);

CREATE TABLE IF NOT EXISTS pitfall_hits (
  project_id TEXT NOT NULL DEFAULT '',
  pitfall_id TEXT NOT NULL,
  hit_count INTEGER NOT NULL DEFAULT 0,
  last_seen_at TEXT,
  PRIMARY KEY (project_id, pitfall_id)
);
`});var C1,L1,E1,IY,OY,R1,x1,W1=l(()=>{"use strict";C1=g(require("node:fs")),L1=g(require("node:path")),E1=require("node:sqlite");Pi();T1();IY=e=>{let t=e.prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},OY=(e,t)=>{e.prepare(`INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},R1=e=>{C1.default.mkdirSync(L1.default.dirname(e),{recursive:!0});let t=new E1.DatabaseSync(e);return t.exec(k1),IY(t)<1&&OY(t,1),t},x1=e=>{e.close()}});var I1,O1,Pk=l(()=>{"use strict";uk();I1=(e,t,r,o)=>{let n=e.prepare(`INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`).get(zr(t),r,o);return{hitCount:n.hit_count,lastSeenAt:n.last_seen_at}},O1=(e,t,r)=>{let o=e.prepare(`SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`).get(zr(t),r);return o===void 0?{hitCount:0,lastSeenAt:null}:{hitCount:o.hit_count,lastSeenAt:o.last_seen_at}}});var M1,N1=l(()=>{"use strict";yk();Pk();M1=(e,t)=>{let r=t.id.trim(),o=r.length===0?null:Jf(e,{projectId:t.projectId,id:r});if(o===null)return{ok:!1,reason:"not_found"};let n=t.nowIso??new Date().toISOString(),s=I1(e,t.projectId,o.id,n);return{ok:!0,pitfall:{...o,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt}}}});var Ak,Yf,bk=l(()=>{"use strict";Ak=g(require("node:path"));Le();Pi();Yf=e=>e.profileEmail!==null?Ak.default.join(e.installDir,Ge,e.profileEmail,Uf):Ak.default.join(e.installDir,Uf)});var j1,D1=l(()=>{j1=[{id:"arch-max-lines",symptom:"ci:architecture fails at land (handler >100 / test >100 effective lines)",cause:"Max-effective-lines=100 only enforced late",avoidance:"Run `npm run ci:architecture` before tipping Arch",check:{kind:"command",value:"npm run ci:architecture"},keywords:["architecture","land","ci:architecture","max-effective","lines"],tags:["architecture","ci"]},{id:"symlink-node-modules",symptom:'Turbopack: "points out of the filesystem root"',cause:"Mac worktree with symlinked node_modules",avoidance:"APFS clone: `cp -Rc` (not symlink) into worktree",check:{kind:"id",value:"pit.symlink-node-modules"},keywords:["build","turbopack","symlink","node_modules","filesystem root"],tags:["build"]},{id:"install-bundle-clobber",symptom:"Missing/broken public/install/agent-witch/app/deps.tar.gz or agent-witch.js after build",cause:"Build overwrites install bundle artifacts",avoidance:"Restore those two paths after `build`",check:{kind:"command",value:"test -f public/install/agent-witch/app/deps.tar.gz && test -f public/install/agent-witch/app/agent-witch.js"},keywords:["build","deps.tar.gz","agent-witch.js","install bundle","clobber"],tags:["build","awi"]},{id:"stale-next",symptom:"Typecheck fails spuriously",cause:"Stale .next",avoidance:"`rm -rf .next` then typecheck",check:{kind:"id",value:"pit.stale-next"},keywords:["build","typecheck",".next","stale","turbopack"],tags:["build"]},{id:"main-moved-rebase",symptom:"FF/SHIP fails; main advanced",cause:"main moved between SHIP and FF",avoidance:"`git fetch`; pure-rebase onto new `-rN` branch; **never** force-push",check:{kind:"id",value:"pit.main-moved-rebase"},keywords:["ship","ff","push","rebase","main moved","force-push"],tags:["git"]},{id:"health-lag",symptom:"Declare done on exit 0 / HTTP 200 too early",cause:"Deploy health lags ~1\u20132 min after push",avoidance:"Poll until health `commitSha` == main tip + smoke",check:{kind:"id",value:"pf.health-matches-main"},keywords:["ship","ff","push","health","commitSha","deploy"],tags:["deploy"]},{id:"dirty-home-checkout",symptom:"Accidental reset/clean of ~/daily-magic",cause:"Home checkout left dirty",avoidance:"Use `/tmp` worktrees; never reset/clean home",check:{kind:"id",value:"pit.dirty-home-checkout"},keywords:["reset","clean","home checkout","daily-magic","worktree"],tags:["git"]},{id:"box-no-gh-auth",symptom:"Push from box fails",cause:"Box git has no GitHub auth",avoidance:"Push from the Mac",check:{kind:"id",value:"pit.box-no-gh-auth"},keywords:["ship","ff","push","box","github","auth"],tags:["git"]},{id:"ci-yml-main-only",symptom:"Expecting GH Actions on non-main push",cause:"Old ci.yml push trigger covered only main; CI being removed \u2014 gate is local suite",avoidance:"Run local `npm run ci` (or suite subset); do not wait on Actions",check:{kind:"id",value:"pit.local-suite-gate"},keywords:["ci","actions","github actions","npm run ci","main only"],tags:["ci"]},{id:"secrets-in-logs",symptom:"Secrets printed in logs/CLI",cause:"Verbose dump of env/files",avoidance:"Print existence / path / fingerprint only",check:{kind:"id",value:"pit.secrets-in-logs"},keywords:["secrets","logs","token","keypair","env","fingerprint"],tags:["secrets"]},{id:"no-prs-daily-magic",symptom:"PR windows opened in Mac Chrome",cause:"Habit from other repos",avoidance:"No PRs for daily-magic; never open PR UI",check:{kind:"id",value:"pit.no-prs"},keywords:["pr","pull request","chrome","daily-magic"],tags:["git"]}]});var NY,DY,Zf,_k=l(()=>{"use strict";D1();NY=j1,DY=e=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags??[],projectId:null,source:"seed",hitCount:0,lastSeenAt:null,severity:"warn"}),Zf=()=>NY.map(DY)});var z1,$1=l(()=>{"use strict";_k();Kc();z1=e=>Zf().reduce((r,o)=>Si(e,null,o.id)!==null?r:(Ff(e,o),r+1),0)});var H1,F1,U1=l(()=>{"use strict";Pi();H1=e=>e.id.trim().length===0?{kind:"empty_id"}:e.projectId.trim().length===0?{kind:"empty_project_id"}:e.symptom.length>120?{kind:"field_too_long",field:"symptom",max:120}:e.cause.length>200?{kind:"field_too_long",field:"cause",max:200}:e.avoidance.length>280?{kind:"field_too_long",field:"avoidance",max:280}:null,F1=e=>e.activeCountAfter>64?{kind:"active_cap",max:64}:null});var B1,G1=l(()=>{"use strict";Kc();Pk();Yc();Kf();U1();B1=(e,t)=>{let r=H1(t);if(r!==null)return{ok:!1,error:r};let o=t.id.trim(),n=Si(e,t.projectId,o),s=O1(e,t.projectId,o),i=t.source??"project",a={id:o,projectId:t.projectId,symptom:t.symptom,cause:t.cause,avoidance:t.avoidance,check:t.check,keywords:t.keywords,tags:t.tags??[],source:i,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt,severity:t.severity??n?.severity??"warn"},d=Hn(e,{projectId:t.projectId,includeRetired:!0}).filter(S=>S.id!==a.id),u=b1([...d,a]),m=F1({activeCountAfter:u});return m!==null?{ok:!1,error:m}:(Ff(e,a),{ok:!0,pitfall:a})}});var Qf,wk=l(()=>{"use strict";yk();Yc();v1();W1();N1();bk();$1();G1();Qf=e=>{let t=e.dbPath??(e.layout!==void 0?Yf(e.layout):(()=>{throw new Error("createPitfallRegistry requires dbPath or layout")})()),r=R1(t);return z1(r),{dbPath:t,listPitfalls:o=>_1(r,o),getPitfall:o=>Jf(r,o),upsertPitfall:o=>B1(r,o),recordHit:o=>M1(r,o),matchPitfalls:o=>w1(r,o),close:()=>x1(r)}}});var jY,eh,vk=l(()=>{"use strict";Xc();jY=(e,t)=>{let r=t.projectId?.trim();if(r!==void 0&&r.length>0)return r;let o=t.cwd?.trim();return o===void 0||o.length===0||e.resolveProjectId===void 0?null:e.resolveProjectId(o)},eh=(e,t)=>{try{let r=jY(e,t);if(r===null||e.registry===null){let n=t.cwd?.trim();return n!==void 0&&n.length>0&&e.isDeclined?.(n)===!0?{status:"none"}:{status:"none",promptCreate:n!==void 0&&n.length>0}}let o=e.registry.matchPitfalls({projectId:r,text:t.message??""});if(o.length===0)return{status:"miss",projectId:r};for(let n of o)e.registry.recordHit({projectId:r,id:n.id});return{status:"hit",projectId:r,pitfalls:Gf(o)}}catch(r){return e.logError?.(r),{status:"none"}}}});var kk,th,zY,$Y,HY,rh,Tk=l(()=>{"use strict";kk=g(require("node:fs")),th=g(require("node:path")),zY=".agent-witch",$Y="project.json",HY=e=>{let t=th.default.join(e,zY,$Y);if(!kk.default.existsSync(t))return null;try{let r=JSON.parse(kk.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return null;let o=r.projectId;return typeof o=="string"&&o.trim().length>0?o.trim():null}catch{return null}},rh=e=>{let t=th.default.resolve(e);for(;;){let r=HY(t);if(r!==null)return r;let o=th.default.dirname(t);if(o===t)return null;t=o}}});var Ck,oh,q1,V1,Lk=l(()=>{"use strict";Ck={name:"check_context",description:"Match the current prompt against the local pitfall registry. Call on the first user message. Returns status hit|miss|none; miss is silent (0 tokens).",inputSchema:{type:"object",properties:{cwd:{type:"string",description:"Absolute working directory for the current session."},message:{type:"string",description:"User prompt or task text to keyword-match."},sessionId:{type:"string",description:"Optional CLI session id (first-message tracking)."},projectId:{type:"string",description:"Optional Agent Witch project id when already known."}},additionalProperties:!1}},oh=[Ck],q1={name:"agent-witch",version:"1.0.0"},V1="2024-11-05"});var To,Ai,nh=l(()=>{"use strict";To=(e,t)=>{let r=e[t];if(typeof r!="string")return;let o=r.trim();return o.length>0?o:void 0},Ai=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return{};let t=e;return{...To(t,"cwd")!==void 0?{cwd:To(t,"cwd")}:{},...To(t,"message")!==void 0?{message:To(t,"message")}:{},...To(t,"sessionId")!==void 0?{sessionId:To(t,"sessionId")}:{},...To(t,"projectId")!==void 0?{projectId:To(t,"projectId")}:{}}}});var Zc,sh,bi,ih=l(()=>{"use strict";Lk();nh();Zc=(e,t,r)=>({jsonrpc:"2.0",id:e??null,error:{code:t,message:r}}),sh=(e,t)=>({jsonrpc:"2.0",id:e??null,result:t}),bi=(e,t)=>{if(typeof e!="object"||e===null||Array.isArray(e))return Zc(null,-32700,"Parse error");let r=e,o=r.id??null,n=r.method;if(typeof n!="string")return Zc(o,-32600,"Invalid Request");if(n==="initialize")return sh(o,{protocolVersion:V1,capabilities:{tools:{listChanged:!1}},serverInfo:q1});if(n==="ping"||n==="notifications/initialized")return sh(o,{});if(n==="tools/list")return sh(o,{tools:oh});if(n!=="tools/call")return Zc(o,-32601,"Method not found");let s=typeof r.params=="object"&&r.params!==null&&!Array.isArray(r.params)?r.params:null,i=s?.name;if(typeof i!="string")return Zc(o,-32602,"tool name is required");if(i!=="check_context")return Zc(o,-32602,`Unknown tool: ${i}`);let a=t.runCheckContext(Ai(s?.arguments??{}));return sh(o,{content:[{type:"text",text:JSON.stringify(a)}],isError:!1})}});var _i,ah=l(()=>{"use strict";vk();wk();nh();Tk();_i=e=>{let t=e.logError??(r=>{let o=r instanceof Error?r.message:String(r);console.error(`[agent-witch] check_context: ${o}`)});return r=>{let o=Ai(r),n=null;try{return n=Qf({layout:e.layout}),eh({registry:n,resolveProjectId:rh,isDeclined:e.isDeclined,logError:t},o)}catch(s){return t(s),{status:"none"}}finally{n?.close()}}}});var K1,FY,lh,J1=l(()=>{"use strict";ah();ih();nh();K1="/api/local/check-context",FY="/mcp",lh=async e=>{if(e.pathname!==K1&&e.pathname!==FY)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t=_i({layout:e.layout,isDeclined:e.isDeclined}),r={};try{let o=await e.readBody(e.request);r=o.length>0?JSON.parse(o):{}}catch{return e.sendJson(e.response,400,{status:"none"}),!0}return e.pathname===K1?(e.sendJson(e.response,200,t(Ai(r))),!0):(e.sendJson(e.response,200,bi(r,{runCheckContext:t})),!0)}});var Ek,UY,X1,Y1=l(()=>{"use strict";ah();ih();Ek=e=>{let t=JSON.stringify(e),r=`Content-Length: ${Buffer.byteLength(t,"utf8")}\r
\r
${t}`;process.stdout.write(r)},UY=async e=>{let t=Buffer.alloc(0);for await(let r of process.stdin)for(t=Buffer.concat([t,r]);;){let o=t.indexOf(`\r
\r
`);if(o<0)break;let n=t.subarray(0,o).toString("utf8"),s=/Content-Length:\s*(\d+)/i.exec(n);if(s===null){t=t.subarray(o+4);continue}let i=Number.parseInt(s[1]??"0",10),a=o+4+i;if(t.length<a)break;let c=t.subarray(o+4,a).toString("utf8");t=t.subarray(a);try{e(JSON.parse(c))}catch{Ek({jsonrpc:"2.0",id:null,error:{code:-32700,message:"Parse error"}})}}},X1=async e=>{let t=_i({layout:e.layout});await UY(r=>{let o=typeof r=="object"&&r!==null?r:null,n=o?.method,s=bi(r,{runCheckContext:t});if(typeof n=="string"&&n.startsWith("notifications/")){o?.id!==void 0&&Ek(s);return}Ek(s)})}});var Z1={};gt(Z1,{AWL_CHECK_CONTEXT_TOOL:()=>Ck,AWL_MCP_TOOLS:()=>oh,capPitfallsForBot:()=>qf,checkContext:()=>eh,createCheckContextRunner:()=>_i,createPitfallRegistry:()=>Qf,formatPitfallBotLine:()=>Jc,handleAwlMcpRequest:()=>bi,listBundledSeedPitfalls:()=>Zf,matchPitfallsByKeywords:()=>Xf,resolveProjectIdFromCwd:()=>rh,resolveTokenSaverDbPath:()=>Yf,runAwlMcpStdio:()=>X1,shadowPitfalls:()=>Vf,tryHandleTokenSaverLocalRequest:()=>lh});var Rk=l(()=>{"use strict";wk();bk();Sk();Kf();Xc();_k();vk();Tk();Lk();ih();ah();J1();Y1()});var Fn,Qc,BY,GY,qY,VY,Q1,eU=l(()=>{"use strict";Fn=g(require("node:fs")),Qc=g(require("node:path")),BY="prompt-optimizer-cycles.json",GY="prompt-optimizer-preferences.json",qY="prompt-sdlc-cycles.json",VY="prompt-sdlc-preferences.json",Q1=e=>{let t=Qc.default.join(e,BY),r=Qc.default.join(e,qY);if(Fn.default.existsSync(t)||!Fn.default.existsSync(r))return t;try{Fn.default.renameSync(r,t)}catch{return r}let o=Qc.default.join(e,VY),n=Qc.default.join(e,GY);if(Fn.default.existsSync(o)&&!Fn.default.existsSync(n))try{Fn.default.renameSync(o,n)}catch{}return t}});var wi,KY,xk,tU=l(()=>{"use strict";wi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),KY=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],xk=e=>{let t=KY.map(i=>`<option value="${wi(i.value)}">${wi(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${wi(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${wi(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${wi(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${wi(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var ed,nU,JY,sU,XY,YY,iU,dh,rU,oU,ZY,QY,$r,td,ch,eZ,uh,Wk,tZ,Ik,aU,Ok,lU,rZ,oZ,nZ,cU,dU,uU,rd=l(()=>{"use strict";ed=g(require("node:fs")),nU=g(require("node:path")),JY="estimate-history.ndjson",sU=100,XY=500,YY=2e4,iU=e=>nU.default.join(e,JY),dh=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,XY),rU=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,YY),oU=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,ZY=e=>({...e,estimateTokens:oU(e.estimateTokens),actualTokens:oU(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),QY=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},$r=e=>{let t=iU(e);return ed.default.existsSync(t)?ed.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return QY(n)?[ZY(n)]:[]}catch{return[]}}):[]},td=(e,t)=>{ed.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;ed.default.writeFileSync(iU(e),r,"utf8")},ch=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),eZ=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${ch(o.task)} | ${ch(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},uh=e=>{let t=$r(e.reportsDir),r=dh(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);td(e.reportsDir,[...s,n])},Wk=e=>{let t=$r(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?dh(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);td(e.reportsDir,[...i,s])},tZ=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-sU),Ik=e=>[...$r(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),aU=e=>{let t=$r(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=rU(e.input),n=rU(e.output),s=dh(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);td(e.reportsDir,[...c,a])},Ok=(e,t)=>{let r=$r(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},lU=e=>({table:eZ(tZ($r(e))),embedding:null}),rZ=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},oZ=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-sU),nZ=e=>{let t=rZ(oZ(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${ch(s.task)} | ${ch(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},cU=e=>{let t=$r(e.reportsDir),r=dh(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);td(e.reportsDir,[...s,n])},dU=e=>{let t=$r(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);td(e.reportsDir,[...s,n])},uU=e=>nZ($r(e))});var pU=l(()=>{"use strict";rd()});var Hr,Mk,sZ,Nk,iZ,aZ,ph,mh,lZ,Dk,mU=l(()=>{"use strict";pU();nv();Hr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Mk=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},sZ=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Mk(-r)} under`:`${Mk(r)} over`},Nk=e=>e.toLocaleString("en-US"),iZ=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Nk(-r)} under`:`${Nk(r)} over`},aZ=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},ph=e=>e===null?"\u2014":Mk(e),mh=e=>e===null?"\u2014":Nk(e),lZ=`(function () {
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
})();`,Dk=e=>{let r=Ik(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":sZ(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":iZ(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${Hr(aZ(i))}</button></td>
        <td>${Hr(c)}</td>
        <td>${ph(n.estimateSeconds)}</td>
        <td>${ph(n.actualSeconds)}</td>
        <td>${Hr(d)}</td>
        <td>${mh(n.estimateTokens)}</td>
        <td>${mh(n.actualTokens)}</td>
        <td>${Hr(u)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${Hr(c)}</p>
        <h2>Input</h2>
        <pre>${Hr(i)}</pre>
        <h2>Output</h2>
        <pre>${Hr(a)}</pre>
        <p>Time: estimated ${ph(n.estimateSeconds)} \xB7 actual ${ph(n.actualSeconds)} \xB7 ${Hr(d)}</p>
        <p>Tokens: estimated ${mh(n.estimateTokens)} \xB7 actual ${mh(n.actualTokens)} \xB7 ${Hr(u)}</p>
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
            ${Vg({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${lZ}</script>`}
    </section>`}});var gU=l(()=>{"use strict";tU();mU()});var vi,cZ,dZ,jk,fU=l(()=>{"use strict";vi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cZ=(e,t,r)=>{let o=vi(t),n=vi(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},dZ=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${vi(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>cZ(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${vi(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${vi(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${vi(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},jk=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(dZ).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var hU=l(()=>{"use strict";fU()});var od,yU,SU,zk,$k,Hk,PU=l(()=>{"use strict";od=g(require("node:fs")),yU=g(require("node:path"));Fl();pg();SU=(e,t,r)=>Bs({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,zk=(e,t,r)=>{let o=SU(e,t,r);if(o===null)return[];if(!od.default.existsSync(o))return[];let n=od.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},$k=e=>{let t=SU(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Tr(e.entry.prompt),output:Tr(e.entry.output)};od.default.mkdirSync(yU.default.dirname(t),{recursive:!0}),od.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},Hk=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var uZ,pZ,nd,gh,Fk=l(()=>{"use strict";uZ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),pZ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,nd=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=uZ(i.assistantOutput),d=c.length>0?`Assistant: ${pZ(c,t)}`:null,u=[a,d].filter(m=>m!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},gh=e=>{let t=e.userMessage.trim(),r=nd({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var dr,sd,Gk,mZ,gZ,Uk,fZ,qk,fh,AU,bU,hZ,ki,Vk,Bk,_U,yZ,wU,Ti,hh,id,SZ,ad,Kk,yh,Sh,vU=l(()=>{"use strict";dr=g(require("node:fs")),sd=g(require("node:path")),Gk=require("node:crypto");Fk();mZ="writer-sessions",gZ="active-index.json",Uk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fZ=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",qk=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},fh=e=>{let t=sd.default.join(e.installDir,mZ);return dr.default.mkdirSync(t,{recursive:!0}),t},AU=e=>sd.default.join(fh(e),gZ),bU=(e,t)=>sd.default.join(fh(e),`${t}.canonical.json`),hZ=(e,t)=>sd.default.join(fh(e),`${t}.continuation.json`),ki=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,Vk=e=>{let t=AU(e);if(!dr.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(dr.default.readFileSync(t,"utf8"));if(!Uk(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!Uk(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!fZ(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},Bk=(e,t)=>{dr.default.writeFileSync(AU(e),JSON.stringify(t,null,2))},_U=(e,t)=>{dr.default.writeFileSync(bU(e,t.sessionId),JSON.stringify(t,null,2))},yZ=(e,t)=>{dr.default.writeFileSync(hZ(e,t.sessionId),JSON.stringify(t,null,2))},wU=(e,t)=>{let r=nd({turns:t.turns});yZ(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Ti=(e,t)=>{let r=bU(e,t);if(!dr.default.existsSync(r))return null;try{let o=JSON.parse(dr.default.readFileSync(r,"utf8"));return!Uk(o)||typeof o.sessionId!="string"?null:o}catch{return null}},hh=(e,t=20)=>{let r=fh(e),o=dr.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Ti(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},id=(e,t,r)=>{let o=qk(r);return Vk(e).entries.find(i=>ki(i)===ki({writerAgent:t,projectFolderPath:o}))?.sessionId??null},SZ=(e,t,r,o)=>{let n=Vk(e),s=ki({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>ki(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];Bk(e,{entries:i})},ad=(e,t,r)=>{let o=(0,Gk.randomUUID)(),n=new Date().toISOString(),s=qk(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return _U(e,i),wU(e,i),SZ(e,t,s,o),o},Kk=(e,t,r)=>{let o=id(e,t,r);return o!==null?o:ad(e,t,r)},yh=(e,t,r)=>{let o=qk(r),n=Vk(e);if(o===null&&r===void 0){Bk(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=ki({writerAgent:t,projectFolderPath:o});Bk(e,{entries:n.entries.filter(i=>ki(i)!==s)})},Sh=e=>{let t=Kk(e.layout,e.writerAgent,e.projectFolderPath),r=Ti(e.layout,t);if(r===null)return;let o={id:(0,Gk.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};_U(e.layout,n),wU(e.layout,n)}});var PZ,AZ,Ph,Jk,kU=l(()=>{"use strict";PZ=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",AZ=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},Ph=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",Jk=e=>{let t=Ph(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=PZ(r,e.userPromptCharacterCount),n=AZ({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var Ah=l(()=>{"use strict";PU();vU();Fk();kU()});var TU=l(()=>{"use strict";qp();vs();FP()});var CU=l(()=>{"use strict";hP()});var rt,_Z,wZ,Xk,Yk,Zk,LU=l(()=>{"use strict";TU();CU();rt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_Z=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},wZ=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=Ja(o);return`value="${rt(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${rt(r)}"`},Xk=(e,t,r,o,n)=>{let s=Vp[t];return`<label class="field">
          <span class="field-label">${rt(o)} API key \u2014 ${rt(_Z(e,t))} \xB7 <a class="field-link" href="${rt(s.href)}" target="_blank" rel="noopener noreferrer">${rt(s.label)}</a></span>
          <input class="input mono" type="password" name="${rt(r)}" autocomplete="off" ${wZ(e,t,n)} />
        </label>`},Yk=(e,t,r,o)=>{let n=jp(e[t]?.model),s=new Set(Dp[t].map(c=>c.value)),i=Dp[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${rt(c.value)}"${d}>${rt(c.label)}</option>`}).join(""),a=n!==rn&&!s.has(n)?`<option value="${rt(n)}" selected>${rt(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${rt(o)}</span>
          <select class="input mono" name="${rt(r)}">${i}${a}</select>
        </label>`},Zk=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${rt(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${Xk(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${Yk(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${Xk(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${Yk(e.secrets,"openai","openaiModel","OpenAI model")}
        ${Xk(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${Yk(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var EU=l(()=>{"use strict";LU()});var bh,RU,xU=l(()=>{"use strict";bh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RU=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${bh(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${bh(s.name)}</strong> <span class="muted mono">(${bh(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${bh(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var vZ,WU,IU,OU=l(()=>{"use strict";vZ=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,WU=e=>e.kind==="folder",IU=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&WU(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if(WU(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(vZ)};return r(t)}});var MU,Qk,NU=l(()=>{"use strict";MU=g(require("node:path")),Qk=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Qk(r.children,t)}</ul>
            </details>
          </li>`;let o=MU.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var DU,Co,kZ,TZ,ld,CZ,eT,jU=l(()=>{"use strict";yg();DU=g(require("node:path"));xU();OU();NU();Co=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kZ=()=>`(() => {
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

})();`,TZ=()=>`(() => {
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
})();`,ld=e=>{let t=Vl({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=RU({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Co(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Co(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':CZ(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
        <p class="muted">Advanced: pull rules from an existing folder on disk (does not replace installing from Agent Witch Cloud).</p>
        <div class="actions">
          <a class="btn btn-secondary" href="/harness?import=1">Import from folder\u2026</a>
        </div>
      </section>`:"",d=a?"":`<section class="card">
      <p class="eyebrow">Advanced</p>
      <h1>Import from disk</h1>
      <p class="lede">Scan a folder for existing <code>.cursor</code> rules and copy them into the profile harness on this Mac. Prefer installing playbooks from Agent Witch Cloud when possible.</p>
      <div class="stack">
        <label class="field">
          <span class="field-label">Scan folder (required)</span>
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Co(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Co(s)}" />
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
    <script>${kZ()}</script>
    <script>${TZ()}</script>`;return`${t}${r}${o}${c}${d}`},CZ=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=IU(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:DU.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),u=Qk(d,Co),m=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Co(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Co(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${u}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Co(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},eT=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=a.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??u??a,S=t.sets[i];if(S===void 0)continue;let h=a.length>0?a:S.proposedSlug,y=m.length>0?m:S.proposedName,p=r.has(i),P=S.items.map(A=>({id:A.id,kind:A.kind,title:A.title,sourcePath:A.sourcePath,include:p}));s.push({slug:h,name:y,items:P})}return s}});var zU=l(()=>{"use strict";jU()});var LZ,tT,$U=l(()=>{"use strict";wr();LZ=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[He]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},tT=LZ});var EZ,HU,FU=l(()=>{"use strict";wr();EZ=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[He]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},HU=EZ});var UU=l(()=>{"use strict"});var Un,RZ,rT,BU=l(()=>{"use strict";yg();XA();Un=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RZ=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,rT=e=>{let t=e.flashError?`<div class="alert-error">${Un(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Un(e.flashMessage)}</div>`:"",r=Vl({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Un(RZ(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${Un(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=Om(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${Un(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Un(n.name)}</strong>
                  <span class="muted mono">${Un(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${u}${m}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var GU=l(()=>{"use strict";UU();Mm();BU()});var _h,qU=l(()=>{"use strict";_h=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var VU,Ht,oT=l(()=>{"use strict";VU=g(require("node:path"));ft();Le();B();le();$A();Ht=e=>{let t=$()?.layout.installDir??C();if(VU.default.basename(t)===Ut)return it;let r=$(),o=r!==null?Ee(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):it}});var nT,KU=l(()=>{"use strict";Jt();oT();nT=async e=>{let t=ze(e.installDir),r=t?.bundleVersion??null,o=Ht(t);try{let n=await ys(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Vo(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var sT,JU=l(()=>{"use strict";sT=e=>!e});var iT,Ci,aT=l(()=>{"use strict";B();iT=()=>`http://127.0.0.1:${as()}/update/run`,Ci=async e=>{try{let t=await fetch(iT(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var xZ,XU,lT,YU=l(()=>{"use strict";B();re();aT();xZ=()=>{hr({launchAgentLabel:ge(),installDir:C()})},XU=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},lT=async()=>{xZ();let e=await Ci({force:!0});if(e.ok)return{ok:!0,message:XU(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:XU(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Jt(),Ax)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var cT=l(()=>{"use strict";H_();qU();oT();KU();JU();YU();aT()});var ZU,QU=l(()=>{"use strict";ZU=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var eB,tB,dT,uT,rB=l(()=>{"use strict";eB=require("node:crypto"),tB=g(require("node:fs"));tr();le();le();QU();dT=!1,uT=async e=>{if(dT)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!ZU(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&tB.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,eB.randomUUID)();dT=!0;try{if(await HA(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Ts({...r,workspace:n},e.writerAgent,t);return await yl(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{dT=!1}}});var oB=l(()=>{"use strict";rB()});var At,WZ,nB,sB,pT,mT,gT,fT,hT,yT,ST=l(()=>{"use strict";At=require("node:crypto"),WZ=Buffer.from("302a300506032b6570032100","hex"),nB=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},sB=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,At.createPublicKey)({key:Buffer.concat([WZ,t]),format:"der",type:"spki"})},pT=()=>{let{publicKey:e,privateKey:t}=(0,At.generateKeyPairSync)("ed25519");return{publicKeyRaw:nB(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},mT=e=>(0,At.createPrivateKey)(e),gT=(e,t)=>(0,At.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),fT=(e,t,r)=>{try{let o=sB(e);return(0,At.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},hT=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,yT=()=>(0,At.randomBytes)(32).toString("base64url")});var Fr,wh,iB,IZ,OZ,vh,PT,AT,aB=l(()=>{"use strict";Fr=g(require("node:fs")),wh=g(require("node:path"));ST();B();Le();iB=e=>wh.default.join(e.installDir,Yr),IZ=(e,t)=>{if(e.profileEmail===null||t===iB(e)||Fr.default.existsSync(t))return;let r=iB(e);Fr.default.existsSync(r)&&(Fr.default.mkdirSync(wh.default.dirname(t),{recursive:!0}),Fr.default.renameSync(r,t))},OZ=e=>{if(!Fr.default.existsSync(e))return null;try{let t=Fr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},vh=e=>{let t=sa(e);IZ(e,t);let r=OZ(t);if(r!==null)return r;let o=pT();return Fr.default.mkdirSync(wh.default.dirname(t),{recursive:!0}),Fr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},PT=e=>{let t=vh(e.layout),r=yT(),o=hT({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=mT(t.privateKeyPem),s=gT(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},AT=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return fT(e.serverPublicKey,t,e.serverAttestation)}});var bT=l(()=>{"use strict";aB();ST()});var lB,cB,dB=l(()=>{"use strict";lB=g(require("node:path")),cB=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:lB.default.basename(e.installDir)})});var gB,cd,vT,kT,uB,MZ,_T,kh,me,fB,NZ,wT,DZ,jZ,TT,ye,ke,bt,zZ,pB,mB,dd,ud,hB=l(()=>{"use strict";gB=g(require("node:http")),cd=g(require("node:fs")),vT=g(require("node:path"));Th();zl();TM();LM();OM();en();f_();z_();cN();uN();g1();Rk();eU();gU();hU();Ah();EU();zU();co();tr();wr();$U();FU();GU();cT();Jt();oB();le();bT();dB();kT=e=>o_(e)??"never",uB=48e3,MZ=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,_T=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??_m(),reveal:t.reveal,installed:er(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),kh=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:uo(t,e)},me=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fB=200,NZ=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',wT=e=>{let t=e.trim().slice(0,fB),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},DZ=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${me(t)}</div>`,jZ=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${me(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',TT={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},ye=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...TT}),e.end(JSON.stringify(r))},ke=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},bt=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},zZ=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=NZ(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${me(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=sT(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${$l(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${me(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${me(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${me(kT(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${me(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},pB=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},mB=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,fB)},dd=e=>{let t=vT.default.join(e.layout.installDir,"link-code.txt"),r=()=>ze(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:_h(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),p=await i(),P=G_(p),A=h.updateFlash??null,f=q_(A),b=DZ(A,h.updateError??null);return U_({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:Ht(y),installBundleVersionLabel:_h(y),prependBody:`${f}${b}${P}`,headerUpdateButtonHtml:B_(p)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await nT(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:wT("An update is already running.")}),h.end();return}c=!0;try{let p=await lT(),P=p.ok?"/?update=ok":wT(p.message);h.writeHead(303,{Location:P}),h.end()}catch(p){let P=p instanceof Error&&p.message.trim().length>0?p.message:"Install bundle update failed.";h.writeHead(303,{Location:wT(P)}),h.end()}finally{c=!1,a()}},u=async(h,y)=>{let p=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",P=o(),A=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:P.installVersion,body:`<section class="card">
      <h1>${me(y)}</h1>
      <p>${me(p)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(A)},m=()=>{if(cd.default.existsSync(t))return cd.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return cd.default.writeFileSync(t,h,"utf8"),h},S=gB.default.createServer((h,y)=>{(async()=>{let p=h.url?.split("?")[0]??"/",P=h.method??"GET";if(P==="OPTIONS"){y.writeHead(204,TT),y.end();return}if(!await ck({method:P,pathname:p,request:h,response:y,requestUrl:h.url??"/",storePath:Q1(vT.default.dirname(e.layout.configPath)),readBody:bt,sendHtml:ke,renderShell:n})&&!await lh({method:P,pathname:p,request:h,response:y,layout:e.layout,readBody:bt,sendJson:ye})){if(P==="GET"&&p==="/health"){let A=e.controllers.getStatus(),f=o();ye(y,200,{ok:!0,...A,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt,...cB({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(P==="GET"&&p==="/api/status"){let A=o();ye(y,200,{...e.controllers.getStatus(),linkCode:m(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt});return}if(P==="GET"&&p==="/api/traffic"){ye(y,200,{entries:Dl(e.layout)});return}if(P==="DELETE"&&p==="/api/traffic"||P==="POST"&&p==="/api/traffic/clear"){if(i_(e.layout),P==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}ye(y,200,{ok:!0});return}if(P==="GET"&&p==="/api/trace"){ye(y,200,{entries:lg(e.layout)});return}if(P==="DELETE"&&p==="/api/trace"||P==="POST"&&p==="/api/trace/clear"){if(c_(e.layout),P==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}ye(y,200,{ok:!0});return}if(P==="POST"&&p==="/api/errors/clear"){d_(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(P==="GET"&&p==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let b=await qs({layout:e.layout,query:f,limit:20});ye(y,200,{chunks:b,query:f});return}ye(y,200,{chunks:Gs(e.layout).slice(-50).reverse()});return}if(P==="POST"&&p==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(P==="GET"&&p==="/api/update-status"){let A=await i();ye(y,200,{ok:!0,...A});return}if((P==="GET"||P==="POST")&&p==="/api/update"){await d(y);return}if(P==="GET"&&p==="/"){let A=e.controllers.getStatus(),f=o(),b=er(e.layout),w=cg(e.layout.errorLogPath);ke(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:pB(h.url??void 0),updateError:mB(h.url??void 0),body:V_({wsConnected:A.wsConnected,lastHeartbeatAt:A.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:b.sets.length,knowledgeChunkCount:Gs(e.layout).length,trafficEntryCount:Dl(e.layout).length,wakeError:A.wakeError,errorLogByteSize:w.byteSize,errorLogExists:w.exists})}));return}if(P==="GET"&&p==="/task"){let A=e.controllers.getStatus(),f=o(),b=$(),w=new URL(h.url??"/",`http://127.0.0.1:${43347}`),k=w.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,T=w.searchParams.get("failed")==="1"?w.searchParams.get("error")?.trim()??"Task failed.":null,L=w.searchParams.get("runId");ke(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:xk({defaultWorkspace:b?.workspace??"",wsConnected:A.wsConnected,flashMessage:k,flashError:T,lastRunId:L})}));return}if(P==="POST"&&p==="/task/dispatch"){let A=await bt(h),f=new URLSearchParams(A),b=f.get("prompt")?.trim()??"",w=f.get("writerAgent")?.trim()??"claude-cli",k=f.get("projectFolder")?.trim()??"",T=await uT({prompt:b,writerAgent:w,...k.length>0?{projectFolderPath:k}:{}}),L=new URLSearchParams;T.ok?L.set("ok","1"):(L.set("failed","1"),T.errorMessage!==void 0&&L.set("error",T.errorMessage.slice(0,240))),T.agentRunId!==void 0&&L.set("runId",T.agentRunId),y.writeHead(303,{Location:`/task?${L.toString()}`}),y.end();return}if(P==="GET"&&p==="/writer-sessions"){let A=o(),f=hh(e.layout,12);ke(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:A.installVersion,updateFlash:pB(h.url??void 0),updateError:mB(h.url??void 0),body:jk({sessions:f})}));return}if(P==="GET"&&p==="/errors"){let A=o(),f=cg(e.layout.errorLogPath);ke(y,await n({title:"Errors",activePath:"/errors",installVersion:A.installVersion,body:p_({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(P==="GET"&&p==="/status"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),b=Se(e.layout),w=b!==null?Re(b,12e4):h_(f.lastHeartbeatAt,12e4),k=y_({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:w}),T=o();ke(y,await n({title:"Status",activePath:"/status",installVersion:T.installVersion,body:`${zZ({status:f,healthBadge:k,revived:A.searchParams.get("revived")==="1",linkCode:m(),installBundleVersion:T.installBundleVersion,installBundleUpdatedAt:T.installBundleUpdatedAt})}${A_({installDir:e.layout.installDir})}${P_({entries:lg(e.layout)})}`}));return}if(P==="GET"&&p==="/traffic"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=Dl(e.layout),b=o(),w=f.map(L=>`<tr><td title="${me(L.at)}">${me(kT(L.at))}</td><td>${me(L.direction)}</td><td><code>${me(L.type)}</code></td><td>${me(L.summary)}</td><td>${me(L.action??"")}</td></tr>`).join(""),k=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${w}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',T=A.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";ke(y,await n({title:"Traffic",activePath:"/traffic",installVersion:b.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${T}
              ${k}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(P==="GET"&&p==="/projects"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),b=Ht(f.installVersion),w=await kh(e.layout),k=A.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":A.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,T=A.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,L=$(),x=L===null?null:Y({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),I=x===null?{}:Object.fromEntries((await Promise.all(w.projects.map(async N=>{let U=await tT(x,N.id);return[N.id,U?.counts??null]}))).filter(N=>N[1]!==null));ke(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:rT({projects:w.projects,compositionCountsByProjectId:I,cloudAppOrigin:b,syncMessage:w.message,syncOk:w.ok,flashMessage:T,flashError:k})}));return}if(P==="GET"&&p==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",b=$(),w=b===null?null:Y({wsUrl:b.wsUrl,pairingToken:b.pairingToken}),k=f.length>0&&w!==null?go():null;if(k===null||w===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(qe({projectFolderPath:k}),!await bl(w,f,k)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(P==="POST"&&p==="/projects/delete"){let A=await bt(h),f=new URLSearchParams(A).get("projectId")?.trim()??"",b=$(),w=b===null?null:Y({wsUrl:b.wsUrl,pairingToken:b.pairingToken});if(w===null||f.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let k=await ib(w,f);y.writeHead(303,{Location:k.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(P==="GET"&&p==="/project"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=A.searchParams.get("id")?.trim()??"",b=o(),w=Ht(b.installVersion),k=await kh(e.layout),T=vr(k.projects,f);if(T===null){await u(y,"Project not found");return}let L=A.searchParams.get("linked")==="1"?A.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${A.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${A.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:A.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,x=A.searchParams.get("knowledgePromoted"),I=x!==null?`Marked ${x} lesson(s) as promoted in Agent Witch.`:null,N=A.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,U=A.searchParams.get("tab")?.trim()??"harness",q=U==="workflows"||U==="agents"||U==="knowledge"?U:"harness",V=$(),Je=V===null?null:Y({wsUrl:V.wsUrl,pairingToken:V.pairingToken}),H=Je===null?null:await tT(Je,T.id),Ce=0;if(Je!==null)try{let Xr=await fetch(`${Je.appOrigin}/api/agent-witch/projects/${encodeURIComponent(T.id)}/knowledge`,{method:"GET",headers:{[He]:Je.pairingToken},signal:AbortSignal.timeout(1e4)});if(Xr.ok){let mr=await Xr.json();typeof mr=="object"&&mr!==null&&typeof mr.candidateCount=="number"&&(Ce=mr.candidateCount)}}catch{Ce=0}ke(y,await n({title:T.name,activePath:"/projects",installVersion:b.installVersion,body:po({project:T,cloudAppOrigin:w,installed:er(e.layout),linkedSetSlugs:Zt(T.projectFolderPath),composition:H,knowledgeCandidateCount:Ce,activeTab:q,flashMessage:L??I,flashError:N})}));return}if(P==="POST"&&p==="/projects/pull-bound-harness"){let A=await bt(h),f=await YA({rawBody:A,layout:e.layout});if(f.kind==="not_found"){await u(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let b=o();ke(y,await n({title:f.title,activePath:"/projects",installVersion:b.installVersion,body:f.body}));return}if(P==="POST"&&p==="/projects/link-harness"){let A=await bt(h),f=new URLSearchParams(A),b=f.get("projectId")?.trim()??"",w=await kh(e.layout),k=vr(w.projects,b);if(k===null){await u(y,"Project not found");return}let T=f.getAll("applySet").map(q=>String(q)),L=ll({layout:e.layout,projectFolderPath:k.projectFolderPath,setSlugs:T});if(!L.ok){let q=o(),V=Ht(q.installVersion);ke(y,await n({title:k.name,activePath:"/projects",installVersion:q.installVersion,body:po({project:k,cloudAppOrigin:V,installed:er(e.layout),linkedSetSlugs:Zt(k.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:L.errorMessage})}));return}let x=$(),I=x===null?null:Y({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),N=I===null?!1:await pn(I,k.id,L.appliedSetSlugs),U=new URLSearchParams({linked:"1",files:String(L.writtenFileCount),bindingsSynced:N?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(k.id)}&${U.toString()}`}),y.end();return}if(P==="POST"&&p==="/projects/remove-harness-set"){let A=await bt(h),f=await ZA({rawBody:A,layout:e.layout});if(f.kind==="not_found"){await u(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let b=o();ke(y,await n({title:f.title,activePath:"/projects",installVersion:b.installVersion,body:f.body}));return}if(P==="POST"&&p==="/project/knowledge/promote-all"){let A=await bt(h),b=new URLSearchParams(A).get("projectId")?.trim()??"",w=await kh(e.layout),k=vr(w.projects,b);if(k===null){await u(y,"Project not found");return}let T=$(),L=T===null?null:Y({wsUrl:T.wsUrl,pairingToken:T.pairingToken}),x=L===null?{ok:!1,promotedCount:0}:await HU(L,k.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(k.id)}&${I.toString()}`}),y.end();return}if(P==="GET"&&p==="/harness"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),b=pl(e.layout),w=A.searchParams.get("submitted")==="1",k=w?A.searchParams.get("syncFailed")==="1"?`Local harness updated (${A.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:A.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${A.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":A.searchParams.get("stopped")==="1"?`Reveal stopped. ${b?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:A.searchParams.get("revealed")==="1"?`Reveal found ${b?.sets.length??0} set(s).`:null,T=b?.scanRoots[0]??_m(),L=MZ(e.layout,{reveal:b,importQuery:A.searchParams.get("import")==="1",justSubmitted:w}),x=Ht(f.installVersion);ke(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:ld(_T(e.layout,{cloudAppOrigin:x,reveal:b,scanFolder:T,flashMessage:k,importSectionExpanded:L}))}));return}if(P==="POST"&&p==="/api/harness/pick-folder"){let A=go();if(A===null){ye(y,200,{cancelled:!0});return}ye(y,200,{path:A});return}if(P==="GET"&&p==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",b=al(f);if(b===null){ye(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let w=cd.default.readFileSync(b,"utf8"),k=w.length>uB?`${w.slice(0,uB)}
\u2026 (truncated)`:w;ye(y,200,{content:k})}catch{ye(y,500,{errorMessage:"Could not read file."})}return}if(P==="POST"&&p==="/api/harness/reveal/add-project"){let A=await bt(h),f="";try{let k=JSON.parse(A);typeof k=="object"&&k!==null&&typeof k.projectPath=="string"&&(f=k.projectPath.trim())}catch{ye(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){ye(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let b=pl(e.layout),w=RA({reveal:b,projectPath:f});if(w===null||w.sets.length===0){ye(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Tm(e.layout,w),ye(y,200,{ok:!0,setCount:w.sets.length});return}if(P==="GET"&&p==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){ye(y,400,{errorMessage:"Choose a folder to scan first."});return}let b=!1;h.on("close",()=>{b=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...TT});let w=xA({scanRoot:f,response:y,shouldAbort:()=>b});Tm(e.layout,w),y.end();return}if(P==="POST"&&p==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(P==="POST"&&p==="/harness/submit"){let A=pl(e.layout);if(A===null){let x=o(),I=Ht(x.installVersion);ke(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:ld(_T(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await bt(h),b=new URLSearchParams(f),w=eT(b,A),k=IA({layout:e.layout,sets:w});if(!k.ok){let x=o(),I=Ht(x.installVersion);ke(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:ld(_T(e.layout,{cloudAppOrigin:I,reveal:A,flashError:k.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}MA(e.layout);let L=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${k.writtenItemCount??0}${L}`}),y.end();return}if(P==="GET"&&p==="/writer-api"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),b=$()?.writerExecutionBackend??$e(void 0),w=We(e.layout.configPath),k=no(w),T=A.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,L=o();ke(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:L.installVersion,body:Zk({writerExecutionBackend:b,secrets:k,flashMessage:T})}));return}if(P==="POST"&&p==="/writer-api"){let A=await bt(h),f=new URLSearchParams(A),b=f.get("writerExecutionBackend")?.trim()??"cli";HP({configPath:e.layout.configPath,writerExecutionBackend:$e(b),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(P==="GET"&&p==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(P==="GET"&&p==="/history"){let A=o();ke(y,await n({title:"History",activePath:"/history",installVersion:A.installVersion,body:Dk({reportsDir:e.layout.reportsDir})}));return}if(P==="GET"&&p==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",b=o(),w=C_({layout:e.layout}),k=R_(w),T=f.length>0?await qs({layout:e.layout,query:f,limit:20}):Gs(e.layout).slice(-50).reverse(),L=T.map(I=>{let N=E_(w,I.id),U=N>0?` \xB7 used in ${N} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${me(I.createdAt)}">${me(kT(I.createdAt))}${I.source?` \xB7 ${me(I.source)}`:""}${U}</div><pre>${me(I.text)}</pre></article>`}).join(""),x=k.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${k.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${me(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";ke(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:b.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${me(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${jZ(f,T.length)}
            </section>${x}${L}`}));return}P==="POST"&&await bt(h),await u(y,"Not found")}})().catch(p=>{console.error("[agent-witch-local-app]",p),y.writeHead(500),y.end("Internal error")})});return S.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),S.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Sr}`)}),S},ud=e=>vh(e).publicKeyRaw});var Th=l(()=>{"use strict";dM();uM();hB()});var SB={};gt(SB,{runAgentWitchExternalLiveCli:()=>HZ});var CT,yB,$Z,HZ,PB=l(()=>{"use strict";CT=g(require("node:fs")),yB=g(require("node:path"));en();B();re();Th();re();$Z=e=>{let t=yB.default.join(e,"link-code.txt");if(!CT.default.existsSync(t))return null;let r=CT.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},HZ=()=>{nt("agent-witch-live");let e=C(),t=O(),r=$Z(e),o=ud(t);dd({layout:t,controllers:{getStatus:()=>{let n=Se(t);return{wsConnected:Da(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{Fo(e)}}})}});var Ur=v((Eze,_B)=>{"use strict";var AB=["nodebuffer","arraybuffer","fragments"],bB=typeof Blob<"u";bB&&AB.push("blob");_B.exports={BINARY_TYPES:AB,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:bB,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var pd=v((Rze,Ch)=>{"use strict";var{EMPTY_BUFFER:FZ}=Ur(),LT=Buffer[Symbol.species];function UZ(e,t){if(e.length===0)return FZ;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new LT(r.buffer,r.byteOffset,o):r}function wB(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function vB(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function BZ(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function ET(e){if(ET.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new LT(e):ArrayBuffer.isView(e)?t=new LT(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),ET.readOnly=!1),t}Ch.exports={concat:UZ,mask:wB,toArrayBuffer:BZ,toBuffer:ET,unmask:vB};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Ch.exports.mask=function(t,r,o,n,s){s<48?wB(t,r,o,n,s):e.mask(t,r,o,n,s)},Ch.exports.unmask=function(t,r){t.length<32?vB(t,r):e.unmask(t,r)}}catch{}});var CB=v((xze,TB)=>{"use strict";var kB=Symbol("kDone"),RT=Symbol("kRun"),xT=class{constructor(t){this[kB]=()=>{this.pending--,this[RT]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[RT]()}[RT](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[kB])}}};TB.exports=xT});var Ri=v((Wze,xB)=>{"use strict";var md=require("zlib"),LB=pd(),GZ=CB(),{kStatusCode:EB}=Ur(),qZ=Buffer[Symbol.species],VZ=Buffer.from([0,0,255,255]),Eh=Symbol("permessage-deflate"),Br=Symbol("total-length"),Li=Symbol("callback"),Lo=Symbol("buffers"),Ei=Symbol("error"),Lh,WT=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Lh){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Lh=new GZ(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Li];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){Lh.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){Lh.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?md.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=md.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Eh]=this,this._inflate[Br]=0,this._inflate[Lo]=[],this._inflate.on("error",JZ),this._inflate.on("data",RB)}this._inflate[Li]=o,this._inflate.write(t),r&&this._inflate.write(VZ),this._inflate.flush(()=>{let s=this._inflate[Ei];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=LB.concat(this._inflate[Lo],this._inflate[Br]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Br]=0,this._inflate[Lo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?md.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=md.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Br]=0,this._deflate[Lo]=[],this._deflate.on("data",KZ)}this._deflate[Li]=o,this._deflate.write(t),this._deflate.flush(md.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=LB.concat(this._deflate[Lo],this._deflate[Br]);r&&(s=new qZ(s.buffer,s.byteOffset,s.length-4)),this._deflate[Li]=null,this._deflate[Br]=0,this._deflate[Lo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};xB.exports=WT;function KZ(e){this[Lo].push(e),this[Br]+=e.length}function RB(e){if(this[Br]+=e.length,this[Eh]._maxPayload<1||this[Br]<=this[Eh]._maxPayload){this[Lo].push(e);return}this[Ei]=new RangeError("Max payload size exceeded"),this[Ei].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Ei][EB]=1009,this.removeListener("data",RB),this.reset()}function JZ(e){if(this[Eh]._inflate=null,this[Ei]){this[Li](this[Ei]);return}e[EB]=1007,this[Li](e)}});var xi=v((Ize,Rh)=>{"use strict";var{isUtf8:WB}=require("buffer"),{hasBlob:XZ}=Ur(),YZ=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function ZZ(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function IT(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function QZ(e){return XZ&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Rh.exports={isBlob:QZ,isValidStatusCode:ZZ,isValidUTF8:IT,tokenChars:YZ};if(WB)Rh.exports.isValidUTF8=function(e){return e.length<24?IT(e):WB(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Rh.exports.isValidUTF8=function(t){return t.length<32?IT(t):e(t)}}catch{}});var jT=v((Oze,zB)=>{"use strict";var{Writable:eQ}=require("stream"),IB=Ri(),{BINARY_TYPES:tQ,EMPTY_BUFFER:OB,kStatusCode:rQ,kWebSocket:oQ}=Ur(),{concat:OT,toArrayBuffer:nQ,unmask:sQ}=pd(),{isValidStatusCode:iQ,isValidUTF8:MB}=xi(),xh=Buffer[Symbol.species],_t=0,NB=1,DB=2,jB=3,MT=4,NT=5,Wh=6,DT=class extends eQ{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||tQ[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[oQ]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=_t}_write(t,r,o){if(this._opcode===8&&this._state==_t)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new xh(o.buffer,o.byteOffset+t,o.length-t),new xh(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new xh(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case _t:this.getInfo(t);break;case NB:this.getPayloadLength16(t);break;case DB:this.getPayloadLength64(t);break;case jB:this.getMask();break;case MT:this.getData(t);break;case NT:case Wh:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[IB.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=NB:this._payloadLength===127?this._state=DB:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=jB:this._state=MT}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=MT}getData(t){let r=OB;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&sQ(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=NT,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[IB.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===_t&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=_t;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=OT(o,r):this._binaryType==="arraybuffer"?n=nQ(OT(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=_t):(this._state=Wh,setImmediate(()=>{this.emit("message",n,!0),this._state=_t,this.startLoop(t)}))}else{let n=OT(o,r);if(!this._skipUTF8Validation&&!MB(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===NT||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=_t):(this._state=Wh,setImmediate(()=>{this.emit("message",n,!1),this._state=_t,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,OB),this.end();else{let o=t.readUInt16BE(0);if(!iQ(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new xh(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!MB(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=_t;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=_t):(this._state=Wh,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=_t,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[rQ]=n,i}};zB.exports=DT});var HT=v((Nze,FB)=>{"use strict";var{Duplex:Mze}=require("stream"),{randomFillSync:aQ}=require("crypto"),{types:{isUint8Array:lQ}}=require("util"),$B=Ri(),{EMPTY_BUFFER:cQ,kWebSocket:dQ,NOOP:uQ}=Ur(),{isBlob:Wi,isValidStatusCode:pQ}=xi(),{mask:HB,toBuffer:Bn}=pd(),wt=Symbol("kByteLength"),mQ=Buffer.alloc(4),Ih=8*1024,Gn,Ii=Ih,Ft=0,gQ=1,fQ=2,zT=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Ft,this.onerror=uQ,this[dQ]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||mQ,r.generateMask?r.generateMask(o):(Ii===Ih&&(Gn===void 0&&(Gn=Buffer.alloc(Ih)),aQ(Gn,0,Ih),Ii=0),o[0]=Gn[Ii++],o[1]=Gn[Ii++],o[2]=Gn[Ii++],o[3]=Gn[Ii++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[wt]!==void 0?a=r[wt]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(HB(t,o,d,s,a),[d]):(HB(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=cQ;else{if(typeof t!="number"||!pQ(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(lQ(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[wt]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Ft?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Wi(t)?(n=t.size,s=!1):(t=Bn(t),n=t.length,s=Bn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[wt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Wi(t)?this._state!==Ft?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Ft?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Wi(t)?(n=t.size,s=!1):(t=Bn(t),n=t.length,s=Bn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[wt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Wi(t)?this._state!==Ft?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Ft?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[$B.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Wi(t)?(a=t.size,c=!1):(t=Bn(t),a=t.length,c=Bn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[wt]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Wi(t)?this._state!==Ft?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Ft?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[wt],this._state=fQ,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick($T,this,a,n);return}this._bufferedBytes-=o[wt];let i=Bn(s);r?this.dispatch(i,r,o,n):(this._state=Ft,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(hQ,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[$B.extensionName];this._bufferedBytes+=o[wt],this._state=gQ,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");$T(this,c,n);return}this._bufferedBytes-=o[wt],this._state=Ft,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Ft&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][wt],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][wt],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};FB.exports=zT;function $T(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function hQ(e,t,r){$T(e,t,r),e.onerror(t)}});var YB=v((Dze,XB)=>{"use strict";var{kForOnEventAttribute:gd,kListener:FT}=Ur(),UB=Symbol("kCode"),BB=Symbol("kData"),GB=Symbol("kError"),qB=Symbol("kMessage"),VB=Symbol("kReason"),Oi=Symbol("kTarget"),KB=Symbol("kType"),JB=Symbol("kWasClean"),Gr=class{constructor(t){this[Oi]=null,this[KB]=t}get target(){return this[Oi]}get type(){return this[KB]}};Object.defineProperty(Gr.prototype,"target",{enumerable:!0});Object.defineProperty(Gr.prototype,"type",{enumerable:!0});var qn=class extends Gr{constructor(t,r={}){super(t),this[UB]=r.code===void 0?0:r.code,this[VB]=r.reason===void 0?"":r.reason,this[JB]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[UB]}get reason(){return this[VB]}get wasClean(){return this[JB]}};Object.defineProperty(qn.prototype,"code",{enumerable:!0});Object.defineProperty(qn.prototype,"reason",{enumerable:!0});Object.defineProperty(qn.prototype,"wasClean",{enumerable:!0});var Mi=class extends Gr{constructor(t,r={}){super(t),this[GB]=r.error===void 0?null:r.error,this[qB]=r.message===void 0?"":r.message}get error(){return this[GB]}get message(){return this[qB]}};Object.defineProperty(Mi.prototype,"error",{enumerable:!0});Object.defineProperty(Mi.prototype,"message",{enumerable:!0});var fd=class extends Gr{constructor(t,r={}){super(t),this[BB]=r.data===void 0?null:r.data}get data(){return this[BB]}};Object.defineProperty(fd.prototype,"data",{enumerable:!0});var yQ={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[gd]&&n[FT]===t&&!n[gd])return;let o;if(e==="message")o=function(s,i){let a=new fd("message",{data:i?s:s.toString()});a[Oi]=this,Oh(t,this,a)};else if(e==="close")o=function(s,i){let a=new qn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Oi]=this,Oh(t,this,a)};else if(e==="error")o=function(s){let i=new Mi("error",{error:s,message:s.message});i[Oi]=this,Oh(t,this,i)};else if(e==="open")o=function(){let s=new Gr("open");s[Oi]=this,Oh(t,this,s)};else return;o[gd]=!!r[gd],o[FT]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[FT]===t&&!r[gd]){this.removeListener(e,r);break}}};XB.exports={CloseEvent:qn,ErrorEvent:Mi,Event:Gr,EventTarget:yQ,MessageEvent:fd};function Oh(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Mh=v((jze,ZB)=>{"use strict";var{tokenChars:hd}=xi();function ur(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function SQ(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,u=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(u===-1&&hd[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let h=e.slice(c,u);d===44?(ur(t,h,r),r=Object.create(null)):i=h,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(u===-1&&hd[d]===1)c===-1&&(c=m);else if(d===32||d===9)u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m),ur(r,e.slice(c,u),!0),d===44&&(ur(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)a=e.slice(c,m),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(hd[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(hd[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,u=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(u===-1&&hd[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))u===-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let h=e.slice(c,u);o&&(h=h.replace(/\\/g,""),o=!1),ur(r,a,h),d===44&&(ur(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=m);let S=e.slice(c,u);return i===void 0?ur(t,S,r):(a===void 0?ur(r,S,!0):o?ur(r,a,S.replace(/\\/g,"")):ur(r,a,S),ur(t,i,r)),t}function PQ(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}ZB.exports={format:PQ,parse:SQ}});var zh=v((Hze,dG)=>{"use strict";var AQ=require("events"),bQ=require("https"),_Q=require("http"),tG=require("net"),wQ=require("tls"),{randomBytes:vQ,createHash:kQ}=require("crypto"),{Duplex:zze,Readable:$ze}=require("stream"),{URL:UT}=require("url"),Eo=Ri(),TQ=jT(),CQ=HT(),{isBlob:LQ}=xi(),{BINARY_TYPES:QB,CLOSE_TIMEOUT:EQ,EMPTY_BUFFER:Nh,GUID:RQ,kForOnEventAttribute:BT,kListener:xQ,kStatusCode:WQ,kWebSocket:Te,NOOP:rG}=Ur(),{EventTarget:{addEventListener:IQ,removeEventListener:OQ}}=YB(),{format:MQ,parse:NQ}=Mh(),{toBuffer:DQ}=pd(),oG=Symbol("kAborted"),GT=[8,13],qr=["CONNECTING","OPEN","CLOSING","CLOSED"],jQ=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,ee=class e extends AQ{constructor(t,r,o){super(),this._binaryType=QB[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Nh,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),nG(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){QB.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new TQ({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new CQ(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[Te]=this,s[Te]=this,t[Te]=this,n.on("conclude",HQ),n.on("drain",FQ),n.on("error",UQ),n.on("message",BQ),n.on("ping",GQ),n.on("pong",qQ),s.onerror=VQ,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",aG),t.on("data",jh),t.on("end",lG),t.on("error",cG),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Eo.extensionName]&&this._extensions[Eo.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){mt(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,iG(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){qT(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Nh,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){qT(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Nh,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){qT(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Eo.extensionName]||(n.compress=!1),this._sender.send(t||Nh,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){mt(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(ee,"CONNECTING",{enumerable:!0,value:qr.indexOf("CONNECTING")});Object.defineProperty(ee.prototype,"CONNECTING",{enumerable:!0,value:qr.indexOf("CONNECTING")});Object.defineProperty(ee,"OPEN",{enumerable:!0,value:qr.indexOf("OPEN")});Object.defineProperty(ee.prototype,"OPEN",{enumerable:!0,value:qr.indexOf("OPEN")});Object.defineProperty(ee,"CLOSING",{enumerable:!0,value:qr.indexOf("CLOSING")});Object.defineProperty(ee.prototype,"CLOSING",{enumerable:!0,value:qr.indexOf("CLOSING")});Object.defineProperty(ee,"CLOSED",{enumerable:!0,value:qr.indexOf("CLOSED")});Object.defineProperty(ee.prototype,"CLOSED",{enumerable:!0,value:qr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(ee.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(ee.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[BT])return t[xQ];return null},set(t){for(let r of this.listeners(e))if(r[BT]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[BT]:!0})}})});ee.prototype.addEventListener=IQ;ee.prototype.removeEventListener=OQ;dG.exports=ee;function nG(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:EQ,protocolVersion:GT[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!GT.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${GT.join(", ")})`);let s;if(t instanceof UT)s=t;else try{s=new UT(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let p=new SyntaxError(c);if(e._redirects===0)throw p;Dh(e,p);return}let d=i?443:80,u=vQ(16).toString("base64"),m=i?bQ.request:_Q.request,S=new Set,h;if(n.createConnection=n.createConnection||(i?$Q:zQ),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new Eo({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=MQ({[Eo.extensionName]:h.offer()})),r.length){for(let p of r){if(typeof p!="string"||!jQ.test(p)||S.has(p))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(p)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let p=n.path.split(":");n.socketPath=p[0],n.path=p[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let p=o&&o.headers;if(o={...o,headers:{}},p)for(let[P,A]of Object.entries(p))o.headers[P.toLowerCase()]=A}else if(e.listenerCount("redirect")===0){let p=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!p||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,p||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=m(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=m(n);n.timeout&&y.on("timeout",()=>{mt(e,y,"Opening handshake has timed out")}),y.on("error",p=>{y===null||y[oG]||(y=e._req=null,Dh(e,p))}),y.on("response",p=>{let P=p.headers.location,A=p.statusCode;if(P&&n.followRedirects&&A>=300&&A<400){if(++e._redirects>n.maxRedirects){mt(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new UT(P,t)}catch{let w=new SyntaxError(`Invalid URL: ${P}`);Dh(e,w);return}nG(e,f,r,o)}else e.emit("unexpected-response",y,p)||mt(e,y,`Unexpected server response: ${p.statusCode}`)}),y.on("upgrade",(p,P,A)=>{if(e.emit("upgrade",p),e.readyState!==ee.CONNECTING)return;y=e._req=null;let f=p.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){mt(e,P,"Invalid Upgrade header");return}let b=kQ("sha1").update(u+RQ).digest("base64");if(p.headers["sec-websocket-accept"]!==b){mt(e,P,"Invalid Sec-WebSocket-Accept header");return}let w=p.headers["sec-websocket-protocol"],k;if(w!==void 0?S.size?S.has(w)||(k="Server sent an invalid subprotocol"):k="Server sent a subprotocol but none was requested":S.size&&(k="Server sent no subprotocol"),k){mt(e,P,k);return}w&&(e._protocol=w);let T=p.headers["sec-websocket-extensions"];if(T!==void 0){if(!h){mt(e,P,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let L;try{L=NQ(T)}catch{mt(e,P,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(L);if(x.length!==1||x[0]!==Eo.extensionName){mt(e,P,"Server indicated an extension that was not requested");return}try{h.accept(L[Eo.extensionName])}catch{mt(e,P,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Eo.extensionName]=h}e.setSocket(P,A,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Dh(e,t){e._readyState=ee.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function zQ(e){return e.path=e.socketPath,tG.connect(e)}function $Q(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=tG.isIP(e.host)?"":e.host),wQ.connect(e)}function mt(e,t,r){e._readyState=ee.CLOSING;let o=new Error(r);Error.captureStackTrace(o,mt),t.setHeader?(t[oG]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Dh,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function qT(e,t,r){if(t){let o=LQ(t)?t.size:DQ(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${qr[e.readyState]})`);process.nextTick(r,o)}}function HQ(e,t){let r=this[Te];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[Te]!==void 0&&(r._socket.removeListener("data",jh),process.nextTick(sG,r._socket),e===1005?r.close():r.close(e,t))}function FQ(){let e=this[Te];e.isPaused||e._socket.resume()}function UQ(e){let t=this[Te];t._socket[Te]!==void 0&&(t._socket.removeListener("data",jh),process.nextTick(sG,t._socket),t.close(e[WQ])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function eG(){this[Te].emitClose()}function BQ(e,t){this[Te].emit("message",e,t)}function GQ(e){let t=this[Te];t._autoPong&&t.pong(e,!this._isServer,rG),t.emit("ping",e)}function qQ(e){this[Te].emit("pong",e)}function sG(e){e.resume()}function VQ(e){let t=this[Te];t.readyState!==ee.CLOSED&&(t.readyState===ee.OPEN&&(t._readyState=ee.CLOSING,iG(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function iG(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function aG(){let e=this[Te];if(this.removeListener("close",aG),this.removeListener("data",jh),this.removeListener("end",lG),e._readyState=ee.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[Te]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",eG),e._receiver.on("finish",eG))}function jh(e){this[Te]._receiver.write(e)||this.pause()}function lG(){let e=this[Te];e._readyState=ee.CLOSING,e._receiver.end(),this.end()}function cG(){let e=this[Te];this.removeListener("error",cG),this.on("error",rG),e&&(e._readyState=ee.CLOSING,this.destroy())}});var gG=v((Uze,mG)=>{"use strict";var Fze=zh(),{Duplex:KQ}=require("stream");function uG(e){e.emit("close")}function JQ(){!this.destroyed&&this._writableState.finished&&this.destroy()}function pG(e){this.removeListener("error",pG),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function XQ(e,t){let r=!0,o=new KQ({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(uG,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(uG,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",JQ),o.on("error",pG),o}mG.exports=XQ});var VT=v((Bze,fG)=>{"use strict";var{tokenChars:YQ}=xi();function ZQ(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&YQ[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}fG.exports={parse:ZQ}});var _G=v((qze,bG)=>{"use strict";var QQ=require("events"),$h=require("http"),{Duplex:Gze}=require("stream"),{createHash:eee}=require("crypto"),hG=Mh(),Vn=Ri(),tee=VT(),ree=zh(),{CLOSE_TIMEOUT:oee,GUID:nee,kWebSocket:see}=Ur(),iee=/^[+/0-9A-Za-z]{22}==$/,yG=0,SG=1,AG=2,KT=class extends QQ{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:oee,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:ree,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=$h.createServer((o,n)=>{let s=$h.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=aee(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=yG}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===AG){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(yd,this);return}if(t&&this.once("close",t),this._state!==SG)if(this._state=SG,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(yd,this):process.nextTick(yd,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{yd(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",PG);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Kn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Kn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!iee.test(s)){Kn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Kn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Sd(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=tee.parse(c)}catch{Kn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&u!==void 0){let S=new Vn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=hG.parse(u);h[Vn.extensionName]&&(S.accept(h[Vn.extensionName]),m[Vn.extensionName]=S)}catch{Kn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(h,y,p,P)=>{if(!h)return Sd(r,y||401,p,P);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return Sd(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[see])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>yG)return Sd(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${eee("sha1").update(r+nee).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),u._protocol=m)}if(t[Vn.extensionName]){let m=t[Vn.extensionName].params,S=hG.format({[Vn.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${S}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",PG),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(yd,this)})),a(u,n)}};bG.exports=KT;function aee(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function yd(e){e._state=AG,e.emit("close")}function PG(){this.destroy()}function Sd(e,t,r,o){r=r||$h.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${$h.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Kn(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Kn),e.emit("wsClientError",i,r,t)}else Sd(r,o,n,s)}});var lee,cee,dee,uee,pee,mee,wG,gee,Pd,vG=l(()=>{lee=g(gG(),1),cee=g(Mh(),1),dee=g(Ri(),1),uee=g(jT(),1),pee=g(HT(),1),mee=g(VT(),1),wG=g(zh(),1),gee=g(_G(),1),Pd=wG.default});var JT,kG=l(()=>{"use strict";JT=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var fee,XT,TG=l(()=>{"use strict";Ap();kG();fee=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",XT=(e={})=>{let t=e.env??process.env,r=JT(t[Sp]),o=JT(t[Pp]);return{mode:fee(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var CG=l(()=>{"use strict";Ap()});var LG=l(()=>{"use strict";TG();CG()});var YT=l(()=>{"use strict"});var Vr,Ad=l(()=>{"use strict";Vr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Ni,Jn,EG,yee,ZT,QT,RG,xG,eC,WG,bd,tC=l(()=>{"use strict";Ni=g(require("node:fs")),Jn=g(require("node:os")),EG=g(require("node:path"));YT();Ad();yee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ZT=(e=Jn.default.hostname())=>EG.default.join(Jn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),QT=e=>{if(!Ni.default.existsSync(e))return null;try{let t=JSON.parse(Ni.default.readFileSync(e,"utf8"));return!yee(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},RG=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},xG=(e,t)=>{Ni.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},eC=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??ZT(),o=QT(r);if(o!==null&&o.pid!==process.pid&&Vr(o.pid)&&RG(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Jn.default.hostname(),macOsUsername:Jn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return xG(r,n),{ok:!0}},WG=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??ZT(),o=QT(r);return o!==null&&o.pid!==process.pid&&Vr(o.pid)&&RG(o)?{ok:!1}:(xG(r,{hostname:Jn.default.hostname(),macOsUsername:Jn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},bd=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??ZT();QT(r)?.pid===process.pid&&Ni.default.existsSync(r)&&Ni.default.unlinkSync(r)}});var rC,_d,See,Pee,Aee,bee,oC,IG=l(()=>{"use strict";rC=require("node:child_process"),_d=g(require("node:path"));Ad();up();See=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),Pee=(e,t)=>{if(See(e)||!/\bnode\b/.test(e))return!1;let r=_d.default.resolve(t),o=_d.default.join(r,"app",ma),n=_d.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===ma||i==="agent-witch.ts")return e.includes(r);try{let a=_d.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},Aee=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,rC.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},bee=(e,t,r)=>{let o=Aee(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||Pee(d,t)&&n.push(c)}return n},oC=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,rC.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=bee(r,e.installDir,t),n=[];for(let s of o)if(Vr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var wd,vd,OG,_ee,nC,MG=l(()=>{"use strict";wd=g(require("node:fs")),vd=g(require("node:path"));je();OG=(e,t)=>{!wd.default.existsSync(e)||wd.default.existsSync(t)||(wd.default.mkdirSync(vd.default.dirname(t),{recursive:!0}),wd.default.renameSync(e,t))},_ee=e=>{if(e.profileEmail===null)return;let t=vd.default.join(e.installDir,kt);OG(vd.default.join(t,Io),e.mainLogPath),OG(vd.default.join(t,Oo),e.errorLogPath)},nC=e=>{let t=O();e!==void 0&&t.installDir!==e||_ee(t)}});var NG=l(()=>{"use strict";Ol();ig();ig();!st()&&qo(__agentWitchImportMetaUrl)&&(async()=>{nt("agent-witch-wake-server");let e=await hn(),t=yr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var DG=l(()=>{"use strict";NG()});var jG=l(()=>{"use strict";wl()});var sC,zG=l(()=>{"use strict";YT();DG();tC();jG();sC=async(e={})=>{let t=e.skipInProcessBridge?null:await sg();Hm();let r=setInterval(()=>{Hm()},6e4),o=setInterval(()=>{if(!WG().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var kd,Hh,kee,$G,HG,Fh,FG,UG,iC,BG,Uh,GG=l(()=>{"use strict";kd=g(require("node:fs")),Hh=g(require("node:path")),kee="pending-run-inputs.json",$G=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),HG=e=>{let t=e.profileEmail?Hh.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Hh.default.join(t,kee)},Fh=e=>{let t=HG(e);if(!kd.default.existsSync(t))return{};try{let r=JSON.parse(kd.default.readFileSync(t,"utf8"));return $G(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!$G(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},FG=(e,t)=>{let r=HG(e);kd.default.mkdirSync(Hh.default.dirname(r),{recursive:!0}),kd.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},UG=e=>Object.values(Fh(e)),iC=(e,t)=>Fh(e)[t]!==void 0,BG=(e,t)=>{let r=Fh(e);r[t.agentRunId]=t,FG(e,r)},Uh=(e,t)=>{let r=Fh(e);delete r[t],FG(e,r)}});var Bh=l(()=>{"use strict";le()});var qG=l(()=>{"use strict";le()});var Gh=l(()=>{"use strict";le()});var qh=l(()=>{"use strict";le()});var Td=l(()=>{"use strict";le()});var Tee,Cee,Cd,aC=l(()=>{"use strict";Lt();Bh();qG();Gh();qh();Td();Tee={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},Cee={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Cd=e=>{if(!fe(e.writerAgent))return"the selected writer";let t=at(e.writerAgent);if($e(e.writerExecutionBackend)==="api"&&t!==null){let r=Xe(We(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Ha(t,r.model);return`${Cee[t]} model ${o}`}}return Tee[e.writerAgent]}});var Lee,Eee,VG,KG,JG=l(()=>{"use strict";Lee=/"input_tokens"\s*:\s*(\d+)/,Eee=/"output_tokens"\s*:\s*(\d+)/,VG=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},KG=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=VG(Lee.exec(t)),o=VG(Eee.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var Vh=l(()=>{"use strict";tr()});var Ld,Kh,Ree,lC,XG,YG,ZG,cC,QG=l(()=>{"use strict";Ld=g(require("node:fs")),Kh=g(require("node:path"));Vh();Ree="run-completion-outbox.json",lC=e=>{let t=e.profileEmail?Kh.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Kh.default.join(t,Ree)},XG=e=>{let t=lC(e);if(!Ld.default.existsSync(t))return[];try{let r=JSON.parse(Ld.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},YG=(e,t)=>{Ld.default.mkdirSync(Kh.default.dirname(lC(e)),{recursive:!0}),Ld.default.writeFileSync(lC(e),JSON.stringify(t,null,2),"utf8")},ZG=(e,t)=>{let r=[...XG(e).filter(o=>o.runId!==t.runId),t];YG(e,r)},cC=async e=>{if(e.cloudApi===null)return;let t=XG(e.layout);if(t.length===0)return;let r=[];for(let o of t)await yl(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);YG(e.layout,r)}});var e2=l(()=>{"use strict"});var dC,Ed,Wee,Xn,t2=l(()=>{"use strict";e2();dC=new Map,Ed=e=>{let t=dC.get(e);t!==void 0&&(clearInterval(t),dC.delete(e))},Wee=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},Xn=(e,t,r,o={})=>{Ed(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Ed(t);return}let i=o.onTick?.()??{};Wee(e,t,n,i)};s(),dC.set(t,setInterval(s,15e3))}});var r2=l(()=>{"use strict";tr()});var o2,n2=l(()=>{"use strict";r2();o2=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Ye(t)}});var uC,Rd,Kr,pC,pr,s2,Jh=l(()=>{"use strict";uC=new Set,Rd=new Map,Kr=(e,t)=>{if(t.length===0)return;let r=Rd.get(e)??[];r.push(t),Rd.set(e,r)},pC=e=>{uC.add(e);let t=Rd.get(e)??[];return Rd.delete(e),t},pr=e=>uC.has(e),s2=e=>{uC.delete(e),Rd.delete(e)}});var Di,i2,a2,l2=l(()=>{"use strict";Di=g(require("node:path")),i2=require("node:url");Go();a2=()=>{if(st()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Di.default.dirname(Di.default.resolve(e)):Di.default.dirname(Di.default.resolve(__filename))}return Di.default.dirname((0,i2.fileURLToPath)(__agentWitchImportMetaUrl))}});var c2,d2,u2,p2,ot,ji,m2,g2,zi,mC,gC,fC,f2,hC,h2,Xh=l(()=>{"use strict";c2=require("node:crypto"),d2=g(require("node:fs")),u2=g(require("node:path")),p2=require("node:url");Ad();Go();l2();ot=new Map,m2=async()=>{if(ji!==void 0)return ji;try{if(st()){let e=a2(),t=u2.default.join(e,"deps","node-pty","lib","index.js");if(d2.default.existsSync(t)){let r=await import((0,p2.pathToFileURL)(t).href);return ji=r,r}}return ji=await import("node-pty"),ji}catch{return ji=null,null}},g2=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},zi=(e,t,r)=>{let o=ot.get(e);if(o!==void 0){ot.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},mC=(e,t)=>{let r=ot.get(e);return r===void 0?!1:(r.pty.write(t),!0)},gC=(e,t,r)=>{let o=ot.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},fC=e=>{for(let t of ot.values())if(!(t.mode!=="agent"||t.runId!==e))return Vr(t.pty.pid);return!1},f2=e=>{for(let[t,r]of ot.entries())if(!(r.mode!=="agent"||r.runId!==e)){ot.delete(t);try{r.pty.kill()}catch{}return!0}return!1},hC=async e=>{let t=await m2();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;ot.get(e.shellSessionId)!==void 0&&zi(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return ot.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{g2(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{ot.get(e.shellSessionId)?.pty===n&&(ot.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},h2=async e=>{let t=e.shellSessionId??(0,c2.randomUUID)(),r=await m2();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return ot.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{g2(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{ot.get(t)?.pty===o&&(ot.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var Yh,y2,S2=l(()=>{"use strict";Yh="[[AWAITING_INPUT]]",y2=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Yh,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var xd,P2,Zh=l(()=>{"use strict";S2();xd=e=>{let t=e.indexOf(Yh);if(t<0)return null;let o=e.slice(t+Yh.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},P2=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",y2].join(`
`)});var A2,b2=l(()=>{"use strict";Jh();Xh();Zh();A2=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(pr(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Kr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await h2({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=xd(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var w2,v2,k2,_2,Jr,Qh=l(()=>{"use strict";w2=require("node:child_process"),v2=g(require("node:fs")),k2=g(require("node:path"));up();_2=12e4,Jr=(e,t)=>{let r=k2.default.join(e,"app",NR,"ensure-writer.sh");return v2.default.existsSync(r)?new Promise((o,n)=>{let s=(0,w2.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},a=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(_2/1e3)}s`))},_2);s.on("error",c=>{clearTimeout(a),n(c)}),s.on("close",c=>{if(clearTimeout(a),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var T2,Yn,Id,ey,yC,Wd,ty,ry,SC,PC,Iee,$i,Oee,Mee,AC,bC=l(()=>{"use strict";T2=require("node:child_process");Lt();Qh();Gh();Bh();Td();qh();Yn=new Map,Id=e=>e==="cursor"||e==="antigravity",ey=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",yC=e=>Yn.get(e)?.warmed===!0,Wd=e=>{let t=Yn.get(e);Yn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},ty=e=>Yn.get(e)?.conversationStarted===!0,ry=e=>{let t=Yn.get(e);Yn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},SC=e=>{Yn.delete(e)},PC=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",Iee={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},$i=e=>`${Iee[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,Oee=(e,t,r,o)=>new Promise(n=>{let s=Mp(t,r),i=[],a=(0,T2.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),Mee=(e,t)=>{let r=$i(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},AC=async e=>{if(!fe(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&$e(e.runConfig.writerExecutionBackend)==="api"){let r=at(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=We(e.runConfig.layout.configPath);return Xe(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Wd(e.writerAgent),{exitCode:0,output:$i(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Jr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}Id(e.writerAgent)&&Wd(e.writerAgent);let t=await Oee(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?Mee(e.writerAgent,t.output):$i(e.writerAgent)}}});var Zn,_C=l(()=>{"use strict";Zn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var C2,Nee,Dee,L2,jee,wC,E2=l(()=>{"use strict";_C();C2=/you(?:'|')ve hit your session limit/i,Nee=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],Dee=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,L2=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},jee=e=>{let t=Dee.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},wC=e=>{let t=e.trim();if(t.length===0)return null;if(C2.test(t))return{code:Zn.SESSION_LIMIT,resetHint:jee(t),matchedLine:L2(t,C2)};for(let r of Nee)if(r.test(t))return{code:Zn.PROVIDER_QUOTA,resetHint:null,matchedLine:L2(t,r)};return null}});var oy,ny,vC,kC=l(()=>{"use strict";oy="[[AGENT_RUN_WRITER_EXECUTION]]",ny="cli-writer-api-key-missing",vC="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var TC=l(()=>{"use strict";kC()});var R2=l(()=>{"use strict";TC()});var sy=l(()=>{"use strict";_C();E2();kC();TC();R2()});var iy,x2=l(()=>{"use strict";iy={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var W2,I2=l(()=>{"use strict";W2="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var O2,M2=l(()=>{"use strict";sy();I2();O2=e=>e.code===Zn.SESSION_LIMIT?W2:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var N2,D2=l(()=>{"use strict";sy();x2();M2();N2=e=>{let t=wC(e.output);return t!==null?{status:iy.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:O2(t)}:{status:e.exitCode===0?iy.COMPLETED:iy.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var CC,QHe,j2=l(()=>{"use strict";CC={OPEN:"open",APPROVAL:"approval"},QHe=CC.APPROVAL});var Hi,ay,z2,Hee,$2,H2,F2,Od,LC,EC=l(()=>{"use strict";Hi=g(require("node:fs")),ay=g(require("node:path")),z2="runs",Hee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$2=e=>{let t=e.profileEmail!==null?ay.default.join(e.installDir,"profiles",e.profileEmail,z2):ay.default.join(e.installDir,z2);return Hi.default.mkdirSync(t,{recursive:!0}),t},H2=(e,t)=>ay.default.join($2(e),`${t}.json`),F2=(e,t)=>{Hi.default.writeFileSync(H2(e,t.id),JSON.stringify(t,null,2))},Od=(e,t)=>{let r=H2(e,t);if(!Hi.default.existsSync(r))return null;try{let o=JSON.parse(Hi.default.readFileSync(r,"utf8"));return!Hee(o)||typeof o.id!="string"?null:o}catch{return null}},LC=e=>{let t=$2(e),r=Hi.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=Od(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var Fee,U2,B2=l(()=>{"use strict";D2();j2();EC();Fee=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=N2({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:CC.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},U2=(e,t)=>{let r=Fee(t);return F2(e,r),r}});var G2=l(()=>{"use strict";Ah()});var q2,V2=l(()=>{"use strict";sy();q2=()=>[oy,`agentRunWriterExecutionBackend=${ny}`,`agentRunWriterExecutionReasonCode=${vC}`].join(`
`)});var Ro,ly=l(()=>{"use strict";Ro=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var RC,Uee,Bee,K2,J2=l(()=>{"use strict";RC=e=>e.toLocaleString("en-US"),Uee=e=>e<.01?e.toFixed(4):e.toFixed(3),Bee=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${Uee(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${RC(e.inputTokens)} in / ${RC(e.outputTokens)} out (${RC(e.totalTokens)} total)`,t].join(`
`)},K2=(e,t)=>{if(t===void 0)return e;let r=Bee(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var X2=l(()=>{"use strict";le()});var Z2,Md,Pe,xC,cy,Y2,Gee,qee,Q2,e5,t5,Nd,WC,IC,OC,r5,Vee,vt,Dd,xo,o5,Kee,Jee,dy,MC,NC,DC,n5=l(()=>{"use strict";Z2=require("node:child_process");le();Lt();GG();rd();aC();JG();$a();QG();Vh();t2();Ad();n2();Jh();Xh();Zh();b2();bC();B2();G2();V2();ly();J2();gs();X2();Td();Sa();Zh();Md=new Map,Pe=new Map,xC=new Set,cy=new Map,Y2=e=>{e!==void 0&&!cy.has(e)&&cy.set(e,Date.now())},Gee=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(pr(t)){vt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}Kr(t,n)},qee=(e,t,r,o,n)=>{if(!UP(e,n))return;let s=`${q2()}
`;Gee(t,r,o,s);let i=Pe.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},Q2=130,e5=`

Stopped by user.`,t5=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:Ro(e)},Nd=null,WC=e=>{Nd=e},IC=(e,t)=>{if(Nd===null)return;let r=Ok(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||FA(Nd,t,r)},OC=async e=>{await cC({layout:e,cloudApi:Nd})},r5=e=>{let t=Md.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Vr(t.pid)},Vee=e=>he({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),vt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Dd=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=cs(s),c=Pe.get(r);if(a!==null&&c!==void 0){let d=qR(a),u=r5(r)||fC(r);d!==null&&!u&&xo(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return GR(a)}}),xo=(e,t,r,o,n,s,i,a)=>{let c=_s(s,a),d=n,u=K2(c.output,c.llmUsage);if(r!==void 0){let S=cy.get(r);cy.delete(r),S!==void 0&&Wk({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let h=KG(c.llmUsage,u);h!==null&&dU({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&xC.has(r)&&(xC.delete(r),d=Q2,u=u.trim().length>0&&!u.includes("Stopped by user.")?`${u.trim()}${e5}`:"Stopped by user.");let m=r!==void 0?Ok(e.layout.reportsDir,r):null;if(r!==void 0){Ed(r),Ka(e.layout,r),pr(r)&&(vt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),s2(r));let S=Pe.get(r);aU({reportsDir:e.layout.reportsDir,agentRunId:r,input:Ro(i),output:u,...S!==void 0?{writerLabel:Cd({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&Sh({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:u,agentRunId:r}),U2(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:u,layout:e.layout}),ZG(e.layout,{runId:r,exitCode:d,output:u,createdAt:new Date().toISOString(),...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{}}),cC({layout:e.layout,cloudApi:Nd}),Pe.delete(r),Md.delete(r),Uh(e.layout,r)}vt(t,{type:"command.claude.result",payload:{exitCode:d,output:u,...r!==void 0?{agentRunId:r}:{},...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),Ea(e.layout)},o5=(e,t,r,o,n,s,i)=>{let a=Pe.get(r),c=a?.accumulatedOutput??s;BG(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),Xn(t,r,()=>iC(e.layout,r),Dd(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),vt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},Kee=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,u=h=>{if(!(n===void 0||h.length===0)){if(pr(n)){vt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}Kr(n,h)}};if(n!==void 0){let h=Pe.get(n);Md.set(n,t),Pe.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),vt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),Xn(r,n,()=>r5(n),Dd(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let m=a==="claude-cli",S=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(m?S.push(y):(c.push(y),u(y)),d||n===void 0)return;let p=xd(c.join(""));if(p!==null){d=!0,t.kill("SIGTERM");let P=Pe.get(n),A=[P?.accumulatedOutput??"",p.partialOutput].filter(f=>f.length>0).join(`

`);P!==void 0&&(P.accumulatedOutput=A),Md.delete(n),o5(e,r,n,o,p.question,A,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),u(y)}),t.on("close",h=>{if(d)return;ry(a);let y=n!==void 0?Pe.get(n):void 0,p=m?_s(S.join("")):{output:c.join("").trim(),llmUsage:void 0},P=m?c.join("").trim():"",A=[p.output.trim(),P].filter(b=>b.length>0).join(`
`);m&&p.output.trim().length>0&&u(p.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${A}`.trim():A;xo(e,r,n,o,h??-1,f,s,p.llmUsage)}),t.on("error",h=>{d||xo(e,r,n,o,-1,h.message,s)})},Jee=(e,t,r,o,n,s,i,a,c)=>{let d=t5(r,c);s!==void 0&&(Pe.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),vt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),Xn(n,s,()=>Pe.has(s),Dd(e,n,s,o,i,a))),Ba(e,t,r,m=>{if(!(s===void 0||m.length===0)){if(pr(s)){vt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:m},requestId:o});return}Kr(s,m)}}).then(m=>{ry(t),xo(e,n,s,o,m.exitCode,m.output,r,m.llmUsage)}).catch(m=>{let S=m instanceof Error?m.message:String(m);xo(e,n,s,o,-1,S,r)})},dy=(e,t,r,o,n,s,i,a,c,d,u,m)=>{let S=t5(r,u);if(La(e.layout),on(e,t)){Y2(s),Jee(e,t,r,o,n,s,c,d,S);return}let h=Xt(t,r,Vee(e),i);if(h===null){xo(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}Y2(s);let y=o2({workspace:e.workspace,projectFolderPath:c}),p=()=>{let P=(0,Z2.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:m??process.env});Kee(e,P,n,o,s,r,S,t)};if(s===void 0){p();return}Pe.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:Pe.get(s)?.accumulatedOutput??""}),qee(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&ya({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),Xn(n,s,()=>Pe.has(s),Dd(e,n,s,o,c,d)),A2({socket:n,sendMessage:vt,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:P=>{a!==void 0&&zi(a,b=>{vt(n,b)},o);let A=Pe.get(s),f=[A?.accumulatedOutput??"",P.partialOutput].filter(b=>b.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),o5(e,n,s,o,P.question,f,r)},onFinished:(P,A)=>{ry(t);let f=_s(A),b=Pe.get(s),w=b!==void 0&&b.accumulatedOutput.length>0?`${b.accumulatedOutput}

${f.output}`.trim():f.output;xo(e,n,s,o,P,w,r,f.llmUsage)}}).then(P=>{if(!P){p();return}Xn(n,s,()=>fC(s),Dd(e,n,s,o,c,d))}).catch(P=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",P instanceof Error?P.message:P),p()})},MC=(e,t,r,o)=>{Uh(e.layout,t.agentRunId),t.shellSessionId!==void 0&&vt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=P2(t),s=Pe.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;dy(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},NC=(e,t)=>{for(let r of UG(e.layout))Pe.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:Ro(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Xn(t,r.agentRunId,()=>iC(e.layout,r.agentRunId),{awaitingInput:!0}),vt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},DC=(e,t,r,o)=>{let n=Pe.get(r);if(n===void 0)return!1;xC.add(r),Ed(r);let s=Md.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(f2(r))return!0;Uh(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${e5}`:"Stopped by user.";return xo(e,t,r,o,Q2,i,n.originalPrompt),!0}});var Xee,jC,s5=l(()=>{"use strict";Qa();Xee=()=>`http://127.0.0.1:${Et()}/restart`,jC=async()=>{try{let e=await fetch(Xee(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var i5=l(()=>{"use strict";zl()});var a5=l(()=>{"use strict";cT()});var l5,c5=l(()=>{"use strict";l5=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var jd,Yee,zC,d5=l(()=>{"use strict";B();re();i5();Rb();a5();c5();gs();jd=(e,t)=>{fo(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},Yee=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(sP(),nP)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},zC=async e=>{let t=ze(e.layout.installDir)?.bundleVersion??null;if(!l5({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(Ct(e.layout)){Ra({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),jd(e.layout,{summary:r,action:"install-bundle-update-start"}),hr({launchAgentLabel:ge(e.layout.installDir),installDir:e.layout.installDir});let o=await Ci({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),jd(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await Yee();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),jd(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),jd(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),jd(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var Zee,$C,u5=l(()=>{"use strict";Zee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$C=e=>{if(!Zee(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var HC,FC,p5=l(()=>{"use strict";pb();mb();HC=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=vl({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},FC=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await kr(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var m5,Qee,ete,tte,zd,g5=l(()=>{"use strict";m5=g(require("node:os"));je();Qee="Default",ete=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),tte=e=>{let t=m5.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},zd=()=>{let e=O(),t=na(e),r=ete(Qee);return`${tte(t)}/${r.length>0?r:"project"}`}});var f5=l(()=>{"use strict";zl()});var h5,UC,y5=l(()=>{"use strict";f5();h5=!1,UC=e=>{h5||(h5=!0,process.on("uncaughtException",t=>{Sn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;Sn(e,{kind:"crash",message:r,stack:o})}))}});var S5,rte,BC,P5=l(()=>{"use strict";S5=require("node:child_process");Qh();Lt();Gh();Bh();Td();qh();rte=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,S5.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},BC=async e=>{if(!fe(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&$e(e.runConfig.writerExecutionBackend)==="api"){let r=at(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=We(e.layout.configPath),n=Xe(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Jr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await rte(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var GC,A5=l(()=>{"use strict";GC=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var b5,qC,_5=l(()=>{"use strict";b5=require("node:crypto"),qC=()=>(0,b5.randomUUID)()});var Fi,w5,uy=l(()=>{"use strict";Fi="[[WORKING_ESTIMATE]]",w5=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Fi,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var v5,k5=l(()=>{"use strict";v5=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var ote,T5,C5=l(()=>{"use strict";uy();ote=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,T5=e=>{if(!e.includes(Fi))return null;let t=null;for(let r of e.matchAll(ote)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var nte,VC,L5=l(()=>{"use strict";C5();nte=/^(\d{1,6})\b/,VC=e=>{let t=T5(e);if(t!==null)return t;let r=nte.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var ste,ite,ate,py,KC=l(()=>{"use strict";Lt();Nl();ste="http://127.0.0.1:11434",ite=45e3,ate=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},py=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||ste,o=t===void 0?(await Wt({commands:he({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(ite)});return n.ok?ate(await n.json()):null}catch{return null}}});var JC,XC,YC,E5=l(()=>{"use strict";Sa();uy();ly();k5();L5();rd();KC();JC=async e=>{let t=Ro(e.wrappedPrompt),r=lU(e.reportsDir);return{estimateOutput:await py(w5(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},XC=e=>{let t=VC(e.estimateOutput);t!==null&&uh({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},YC=e=>{let t=VC(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=v5(t);return ha({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Vt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),uh({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var my,R5,ZC=l(()=>{"use strict";my="[[WORKING_TOKEN_ESTIMATE]]",R5=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",my,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var x5,lte,W5,I5=l(()=>{"use strict";ZC();x5=/^(\d{1,8})\b/,lte=e=>{let t=e.indexOf(my);if(t<0)return null;let r=e.slice(t+my.length).trim(),o=x5.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},W5=e=>{let t=lte(e);if(t!==null)return t;let r=x5.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var QC,eL,O5=l(()=>{"use strict";ZC();ly();I5();rd();KC();QC=async e=>{let t=Ro(e.wrappedPrompt),r=uU(e.reportsDir);return{estimateOutput:await py(R5(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},eL=e=>{let t=W5(e.estimateOutput);return t===null?null:(cU({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var M5=l(()=>{"use strict";tC();IG();MG();zG();Qa();n5();Qh();Lt();EC();Jh();s5();Pb();d5();gs();u5();p5();Vh();g5();y5();P5();pp();A5();_5();uy();Sa();E5();O5();aC();Nl();Xh();bC()});var N5={};gt(N5,{buildContinuationPromptWithContext:()=>ute});var cte,dte,ute,D5=l(()=>{"use strict";cte=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,dte=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),ute=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=dte(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${cte(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var j5={};gt(j5,{readHarnessExportSets:()=>mte});var $d,tL,gy,pte,mte,z5=l(()=>{"use strict";$d=g(require("node:fs")),tL=g(require("node:path"));je();gy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pte=e=>{if(!$d.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse($d.default.readFileSync(e.harnessManifestPath,"utf8"));if(gy(t))return t}catch{return null}return null},mte=(e,t)=>{let r=O(t),o=pte(r);if(o===null)return[];let n=gy(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!gy(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let u of c){if(!gy(u))continue;let m=typeof u.path=="string"?u.path:void 0,S=typeof u.id=="string"?u.id:"",h=typeof u.kind=="string"?u.kind:"",y=typeof u.title=="string"?u.title:"";if(m===void 0||S.length===0||h.length===0||y.length===0)continue;let p=m.startsWith("shared/")?tL.default.join(r.harnessRootDir,m):tL.default.join(r.harnessSetsDir,i,m);$d.default.existsSync(p)&&d.push({id:S,kind:h,title:y,content:$d.default.readFileSync(p,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var lL,oL,Ui,$5,gte,H5,F5,rL,U5,nL,sL,iL,te,J,aL,fte,Hd,hte,yte,Ste,Pte,Ate,bte,_te,wte,Fd,B5=l(()=>{"use strict";lL=require("node:child_process"),oL=g(require("node:fs")),Ui=g(require("node:os"));vG();B();re();en();bT();LG();le();Jt();zl();z_();Th();Ah();tr();co();$b();ft();M5();$5=3e4,gte=3e4,H5=new Map,F5=new Map,rL=new Map,U5=new Map,nL=new Map,sL=new Map,iL=new Map,te=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),J=(e,t,r)=>{e.readyState===Pd.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(fo(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),ag(r,"out",t)))},aL=e=>e,fte=e=>{if(!oL.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(oL.default.readFileSync(e.harnessManifestPath,"utf8"));if(te(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Hd=(e,t)=>{let r=fte(t);r!==null&&J(e,{type:"harness.manifest.report",payload:{hostname:Ui.default.hostname(),manifest:r}})},hte=async(e,t,r,o,n,s,i=!1,a,c,d,u,m)=>{let S=m?.trim()??"";if(!fe(t)){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=Cd({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await Wt({commands:he({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),p=s!==void 0?JC({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,P=s!==void 0?QC({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=Id(t)&&!yC(t);if(A){try{await Jr(e.layout.installDir,t)}catch(H){let Ce=H instanceof Error?H.message:String(H);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Ce}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Wd(t)}else if(!Id(t))try{await Jr(e.layout.installDir,t)}catch(H){let Ce=H instanceof Error?H.message:String(H);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Ce}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=qa(d,zd,m);if(f===null){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}qe({projectFolderPath:f,...S.length>0?{projectId:S}:{}}),i||ad(e.layout,t,f);let b=Ph({sessionContinuation:i,supportsWriterSessionContinuation:ey(t),isWriterConversationStarted:ty(t)}),w=i&&b==="first"?id(e.layout,t,f):null,k=w!==null?Ti(e.layout,w):null,T=k!==null&&k.turns.length>0,L=Jk({sessionContinuation:i,supportsWriterSessionContinuation:ey(t),isWriterConversationStarted:ty(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:T,userPromptCharacterCount:r.length}),x=r;if(L.continuationStrategy==="source_run_seed"){let H=typeof c=="string"&&c.length>0?Od(e.layout,c):null;if(H!==null){let{buildContinuationPromptWithContext:Ce}=await Promise.resolve().then(()=>(D5(),N5));x=Ce({priorPrompt:H.prompt,priorOutput:H.resultOutput??"",userMessage:r})}}else L.continuationStrategy==="transcript_seed"&&k!==null&&k.turns.length>0&&(x=gh({priorTurns:k.turns,userMessage:r}));let I=L.ragLimit>0?await qs({layout:e.layout,query:x,limit:L.ragLimit,minScore:L.ragMinScore,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],N=L.ragLimit>0&&f.trim().length>0?await D_({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],U=L.injectMemory?zk(e.layout,f,S.length>0?S:void 0):[],q=`${Hk(U,L.memoryEntryLimit)}${O_(I)}${j_(N)}${x}`,V=u?.trim()??(s!==void 0&&f.trim().length>0?qC():void 0);if(s!==void 0&&V!==void 0&&V.length>0&&f.trim().length>0){ya({reportKey:V,agentRunId:s,userSummary:"Working on your Mac\u2026"});let H=q;p!==null&&p.then(Ce=>{if(Ce===null)return;let Xr=YC({estimateOutput:Ce.estimateOutput??"",reportKey:V,agentRunId:s,reportsDir:e.layout.reportsDir,task:Ce.task,writerLabel:Ce.writerLabel,embedding:Ce.embedding});if(Xr.estimateSeconds===null)return;IC(e.layout.reportsDir,s);let mr=`${Fi}
${Xr.estimateSeconds}
`;if(pr(s)){J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:mr},requestId:o});return}Kr(s,mr)}).catch(()=>{}),q=GC(H),q=xS(q,{agentRunId:s,reportKey:V,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&p!==null&&p.then(H=>{H!==null&&XC({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel,embedding:H.embedding})}).catch(()=>{}),s!==void 0&&P!==null&&P.then(H=>{H!==null&&eL({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel})}).catch(()=>{});let Je=s!==void 0&&iL.get(s)===!0;if(s!==void 0&&f.trim().length>0){let H=await zm(f);sL.set(s,H),V!==void 0&&V.length>0&&nL.set(s,V)}dy(e,t,q,o,aL(n),s,{sessionTurn:L.sessionTurn},a,f,V,r,jP(e.layout,s,Je)),A&&s!==void 0&&J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:PC(t)},requestId:o})},yte=async(e,t,r,o,n)=>{let s=(i,a)=>{J(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await AC({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:he({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,J(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=fe(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?$i(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},Ste=(e,t,r)=>new Promise(o=>{if(!fe(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Xt(t,r,he({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,lL.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),Pte=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;J(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Qt(t.bundle),s=te(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=Ee(e.wsUrl)??it,m=await wA({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=cn({bundle:i,layout:e.layout});return J(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&Hd(o,e.layout),!0},Ate=async(e,t,r,o)=>{if(await Pte(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(J(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!fe(n)){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}La(e.layout);let i=await(async()=>{try{await Jr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return Ste(e,n,s)})().finally(()=>{Ea(e.layout)});J(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),Hd(o,e.layout)},bte=e=>{let t=1e3*2**e;return Math.min(gte,t)},_te=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=p=>{if(!t.restartInFlight){if(Ct(e.layout)){xa(p),console.log(`[agent-witch] Deferring local restart (${p}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${p})\u2026`),t.wakeError=`restart:${p}`,jC().then(P=>{if(P.ok){console.log("[agent-witch] Local restart completed.");return}if(!P.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",P.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(p,P="system.ack")=>{if(!t.selfUpdateInFlight){if(Ct(e.layout)){Ra({layout:e.layout,remoteBundleVersion:p,trigger:P}),console.log(`[agent-witch] Deferring install bundle update (${p} via ${P}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,zC({layout:e.layout,remoteBundleVersion:p,trigger:P}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let p=Se(e.layout);p!==null&&Re(p,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let p=t.socket;t.socket=void 0,t.wsConnected=!1,p.removeAllListeners("open"),p.removeAllListeners("message"),p.removeAllListeners("close"),p.on("error",()=>{}),(p.readyState===Pd.OPEN||p.readyState===Pd.CONNECTING)&&p.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,$5)},u=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let p=bte(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${p}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},p)},m=p=>{s();let P=()=>{let A=_a(e.layout.installDir),f=Et();J(p,{type:"agent.heartbeat",payload:{hostname:Ui.default.hostname(),macOsUsername:Ui.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:A}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};P(),t.heartbeatTimer=setInterval(P,$5)},S=(p,P)=>{if(typeof p.type!="string")return;if(zb(p)){t.stopped=!0,s(),a(),c(),Nb({layout:e.layout}).finally(()=>{bd(),process.exit(0)});return}fo(e.layout,{direction:"in",type:p.type,summary:"inbound WS frame"}),ag(e.layout,"in",p);let A=typeof p.requestId=="string"?p.requestId:void 0;if(p.type==="device.auth.attestation"&&te(p.payload)){let f=typeof p.payload.serverPublicKey=="string"?p.payload.serverPublicKey:"",b=typeof p.payload.origin=="string"?p.payload.origin:"",w=typeof p.payload.devicePublicKey=="string"?p.payload.devicePublicKey:"",k=typeof p.payload.challenge=="string"?p.payload.challenge:"",T=typeof p.payload.serverAttestation=="string"?p.payload.serverAttestation:"";if(!AT({serverPublicKey:f,origin:b,devicePublicKey:w,challenge:k,serverAttestation:T})){t.wakeError="Server attestation verification failed",fo(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(p.type==="writer.ensure"&&te(p.payload)){let f=typeof p.payload.writerAgent=="string"?p.payload.writerAgent:"";fo(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),BC({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(b=>{J(P,{type:"writer.status",payload:b},e.layout)})}if(p.type==="install.bundle.update"&&te(p.payload)){let f=typeof p.payload.bundleVersion=="string"?p.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(p.type==="system.ack"){xp(e.layout,{wsUrl:e.wsUrl});let f=te(p.payload)?p.payload:null,b=$C(f);b!==null&&o(b)}if(p.type==="device.restart"&&r("cloud-device-restart"),p.type==="automations.sync"&&te(p.payload)&&HC(p.payload),p.type==="automations.run"&&te(p.payload)&&FC(p.payload),p.type==="terminal.stream.accepted"&&te(p.payload)){let f=typeof p.payload.runId=="string"?p.payload.runId:"";if(f.length>0){let b=pC(f);for(let w of b)J(P,{type:"terminal.stream.chunk",payload:{runId:f,chunk:w},requestId:A})}}if(p.type==="agent.agentRun.list"&&J(P,{type:"dashboard.agentRun.list.result",payload:{runs:LC(e.layout)},requestId:A}),p.type==="agent.agentRun.get"&&te(p.payload)){let f=typeof p.payload.runId=="string"?p.payload.runId:"",b=f.length>0?Od(e.layout,f):null;J(P,{type:"dashboard.agentRun.get.result",payload:{run:b},requestId:A})}if(p.type==="command.claude.run"&&te(p.payload)){let f=p.payload.prompt,b=typeof p.payload.writerAgent=="string"&&fe(p.payload.writerAgent)?p.payload.writerAgent:"claude-cli",w=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,k=p.payload.sessionContinuation===!0,T=typeof p.payload.sourceRunId=="string"?p.payload.sourceRunId:void 0,L=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:void 0,x=typeof p.payload.projectId=="string"?p.payload.projectId:void 0,I=qa(typeof p.payload.projectFolderPath=="string"?p.payload.projectFolderPath:void 0,zd,x),N=xP(p.payload.compositionSnapshot),U=typeof p.payload.reportKey=="string"?p.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${b} task (${k?"continue":"first"})\u2026`),I===null){J(P,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...w!==void 0?{agentRunId:w}:{}},requestId:A});return}if(N!==null){let q=IP(e.layout,N);if(q!==null){J(P,{type:"command.claude.result",payload:{exitCode:-1,output:q,...w!==void 0?{agentRunId:w}:{}},requestId:A});return}if(w!==void 0){let V=MP(e.layout,w,N);if(!V.ok){J(P,{type:"command.claude.result",payload:{exitCode:-1,output:V.errorMessage,...w!==void 0?{agentRunId:w}:{}},requestId:A});return}iL.set(w,N.entries.some(Je=>Je.scope==="run"))}}w!==void 0&&L!==void 0&&H5.set(w,L),w!==void 0&&(F5.set(w,I),x!==void 0&&x.trim().length>0&&rL.set(w,x.trim()),U5.set(w,f.trim()),qe({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),hte(e,b,f.trim(),A,P,w,k,L,T,I,U,x)}}if(p.type==="shell.session.open"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",b=typeof p.payload.cols=="number"?p.payload.cols:120,w=typeof p.payload.rows=="number"?p.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),hC({shellSessionId:f,cwd:e.workspace,cols:b,rows:w,send:k=>{J(P,k)},requestId:A}))}if(p.type==="shell.session.close"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"";f.length>0&&zi(f,b=>{J(P,b)},A)}if(p.type==="shell.input"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",b=typeof p.payload.data=="string"?p.payload.data:"";f.length>0&&b.length>0&&mC(f,b)}if(p.type==="shell.resize"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",b=typeof p.payload.cols=="number"?p.payload.cols:0,w=typeof p.payload.rows=="number"?p.payload.rows:0;f.length>0&&b>0&&w>0&&gC(f,b,w)}if(p.type==="command.writer.session.end"&&te(p.payload)){let f=p.payload.writerAgent;typeof f=="string"&&fe(f)&&(SC(f),yh(e.layout,f))}if(p.type==="command.writer.session.start"&&te(p.payload)){let f=p.payload.writerAgent,b=typeof p.payload.writerSessionId=="string"?p.payload.writerSessionId:"";typeof f=="string"&&fe(f)&&b.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),yte(e,f,b,A,P))}if(p.type==="command.claude.stop"&&te(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),DC(e,aL(P),f,A))}if(p.type==="command.claude.input_respond"&&te(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"",b=typeof p.payload.response=="string"?p.payload.response.trim():"",w=typeof p.payload.originalPrompt=="string"?p.payload.originalPrompt:"",k=typeof p.payload.partialOutput=="string"?p.payload.partialOutput:"",T=typeof p.payload.question=="string"?p.payload.question:"";f.length>0&&b.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),MC(e,{agentRunId:f,originalPrompt:w,partialOutput:k,question:T,response:b,shellSessionId:H5.get(f)},A,aL(P)))}if(p.type==="dispatch.approval.required"&&te(p.payload)){let f=typeof p.payload.requesterEmail=="string"?p.payload.requesterEmail:"A teammate",b=typeof p.payload.prompt=="string"?p.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${b}`),process.platform==="darwin"&&(0,lL.spawn)("osascript",["-e",`display notification "${b.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(p.type==="harness.request"&&te(p.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),Ate(e,p.payload,A,P)),p.type==="harness.export.request"&&te(p.payload)){let f=typeof p.payload.borrowerUserId=="string"?p.payload.borrowerUserId:"",b=typeof p.payload.targetDeviceId=="string"?p.payload.targetDeviceId:void 0,w=Array.isArray(p.payload.setSlugs)?p.payload.setSlugs.filter(k=>typeof k=="string"):[];f.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:k}=await Promise.resolve().then(()=>(z5(),j5)),T=k(w,e.email);J(P,{type:"harness.export.result",payload:{success:T.length>0,borrowerUserId:f,...b!==void 0?{targetDeviceId:b}:{},sets:T,errorMessage:T.length>0?void 0:"No readable harness sets were found on this machine."},requestId:A})})()}if(p.type==="harness.manifest.request"&&Hd(P,e.layout),p.type==="command.claude.result"&&te(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,b=typeof p.payload.output=="string"?p.payload.output:"",w=typeof p.payload.exitCode=="number"?p.payload.exitCode:null,k=qa(f!==void 0?F5.get(f):void 0,zd),T=f!==void 0?rL.get(f):void 0,L=f!==void 0?U5.get(f)??"":"",x=QA({exitCode:w,output:b});if(x&&k!==null&&I_({layout:e.layout,text:b,source:f??"command.claude.result",projectFolderPath:k,...T!==void 0?{projectId:T}:{}}),w!=null&&w!==0&&b.trim().length>0&&k!==null&&(L_({layout:e.layout,errorText:b,projectFolderPath:k,...T!==void 0?{projectId:T}:{}}),N_({layout:e.layout,text:b,source:f??"command.claude.result.failure",projectFolderPath:k,...T!==void 0?{projectId:T}:{}})),x&&L.trim().length>0&&k!==null&&$k({layout:e.layout,projectFolderPath:k,...T!==void 0?{projectId:T}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:L,output:b,createdAt:new Date().toISOString()}}),f!==void 0&&k!==null){let N=nL.get(f),U=sL.get(f);N!==void 0&&U!==void 0&&zm(k).then(q=>{let V=ob({before:U,after:q});WS(N,V),sL.delete(f),nL.delete(f)})}if(x&&T!==void 0&&T.trim().length>0){let N=$(),U=N===null?null:Y({wsUrl:N.wsUrl,pairingToken:N.pairingToken});U!==null&&sb(U,T,{...f!==void 0?{sourceRunId:f}:{},lesson:nb({prompt:L,output:b})})}f!==void 0&&(Ka(e.layout,f),iL.delete(f),rL.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let p=new Pd(e.wsUrl);t.socket=p,p.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),WC(Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),OC(e.layout);let P=Ee(e.wsUrl)??"http://localhost:3000",A=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=PT({layout:e.layout,origin:P,...A!==void 0&&A.length>0?{claimToken:A}:{}});J(p,{type:"agent.register",payload:{role:"agent",hostname:Ui.default.hostname(),macOsUsername:Ui.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),Hd(p,e.layout),NC(e,p),m(p)}),p.on("message",P=>{let A=typeof P=="string"?P:P.toString("utf8");try{let f=JSON.parse(A);if(!te(f))return;S(f,p)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),p.on("close",(P,A)=>{s(),t.socket=void 0,t.wsConnected=!1,aP(e.layout),t.reconnectAttempt+=1;let f=typeof A=="string"?A:A.toString("utf8");Sn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:P,reason:f}),console.log("[agent-witch] Disconnected from server."),u()}),p.on("error",P=>{t.wakeError=P.message,Sn(e.layout,{kind:"ws_error",message:P.message,stack:P.stack}),console.error(`[agent-witch] Socket error: ${P.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return ZS(()=>{let p=QS();p!==null&&p.layout.installDir===e.layout.installDir&&p.layout.profileEmail===e.layout.profileEmail&&o(p.remoteBundleVersion,p.trigger);let P=eP();P!==null&&r(P)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Da(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:ud(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let p=t.socket;return!t.wsConnected||p===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Hd(p,e.layout),{ok:!0})}}},wte=async()=>{nt("agent-witch");let e=XT(),t=C();eC().ok||(process.platform==="darwin"?(await Fo(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),nC(t);let o=oC({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(hr({launchAgentLabel:ge(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),ca());let n=await qP(),s=n[0];s!==void 0&&UC(s.layout);for(let h of n){let y=Ee(h.wsUrl)??it;wa(h.layout.installDir,y)}let i=n.map(h=>_te(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),bd(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let p=i[y];if(p===void 0)return;let P=Se(h.layout);lP(P,{socketOpen:p.hasMacSocketOpen(),staleAfterMs:12e4})&&p.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(Ct(h)||Ll(h.installDir))},m=await sC({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):dd({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=yr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),da(),d()});d=()=>{S(),m.stop(),bd(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Fd=wte});var cL=l(()=>{"use strict";B5()});var G5={};gt(G5,{startAgentWitchClient:()=>Fd});var q5=l(()=>{"use strict";cL();cL();Go();IS();gp();if(!st()&&qo(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(mp(process.argv.slice(e))),Fd()}});ES();IS();Go();gp();var JR="20.x",XR="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var q8=e=>[`Node.js ${JR} or newer is required (found ${e}).`,XR].join(" "),YR=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${q8(process.version)}
`),process.exit(1))};var vte=async()=>{nt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(sP(),nP)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},kte=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(lO(),aO)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},Tte=async()=>{if(!qo(st()?void 0:__agentWitchImportMetaUrl))return;YR();let e=process.argv.indexOf("report");e>=0&&process.exit(mp(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await vte();return}if(t==="wake"){await kte();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(cM(),lM));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(PB(),SB));o();return}if(t==="mcp"){let{resolveAgentWitchLocalLayout:o}=await Promise.resolve().then(()=>(B(),tR)),{runAwlMcpStdio:n}=await Promise.resolve().then(()=>(Rk(),Z1));await n({layout:o()});return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(q5(),G5));await r()};Tte();
