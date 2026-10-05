#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var dV=Object.create;var uy=Object.defineProperty;var uV=Object.getOwnPropertyDescriptor;var pV=Object.getOwnPropertyNames;var mV=Object.getPrototypeOf,gV=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var v=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},ft=(e,t)=>{for(var r in t)uy(e,r,{get:t[r],enumerable:!0})},fV=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of pV(t))!gV.call(e,n)&&n!==r&&uy(e,n,{get:()=>t[n],enumerable:!(o=uV(t,n))||o.enumerable});return e};var g=(e,t,r)=>(r=e!=null?dV(mV(e)):{},fV(t||!e||!e.__esModule?uy(r,"default",{value:e,enumerable:!0}):r,e));var Ui,PL,AL,Bi,py,Ute,bL,Bd,Bt,gr,Gd,Vd,Qn,es,Ve,my,qd,Kd,Jd,Gi,Tt,Oo,Mo,Vi,Yr,gy,_L,Le=l(()=>{"use strict";Ui={production:".agent-witch",localhost:".local-agent-witch"},PL={production:47892,localhost:47893},AL={production:"com.agent-witch",localhost:"com.local-agent-witch"},Bi={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},py="app",Ute=`${py}/agent-witch.js`,bL=`${py}/command`,Bd={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Bt=Ui.production,gr=Ui.localhost,Gd=PL.production,Vd=PL.localhost,Qn=AL.production,es=AL.localhost,Ve="profiles",my=Bi.activeProfile,qd="harness",Kd="sets",Jd="manifest.json",Gi=Bd.projectsDir,Tt=Bd.logsDir,Oo="agent-witch.log",Mo="agent-witch.error.log",Vi=Bd.reportsDir,Yr=Bd.deviceKeypairJson,gy=py,_L="agent-witch.js"});var wL=l(()=>{"use strict";Le()});var vL,Zr,qi,Xd=l(()=>{"use strict";vL=g(require("node:path"));Le();Zr=e=>vL.default.basename(e)===gr,qi=e=>Zr(e)?es:Qn});var TL=l(()=>{"use strict";wL();Xd()});var kL,fy,hV,Ki,yV,SV,CL,PV,AV,LL=l(()=>{"use strict";TL();Le();kL=g(require("node:os")),fy=g(require("node:path")),hV=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?fy.default.resolve(e):fy.default.join(kL.default.homedir(),Bt)},Ki=qi(hV()),yV=`${Ki}-wake`,SV=`${Ki}-live`,CL=`${Ki}-watchdog`,PV=`${Ki}-automation-scheduler`,AV=`${Ki}-updater`});var ts=v(hy=>{"use strict";Object.defineProperty(hy,"__esModule",{value:!0});hy.stringify=bV;function bV(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var M=v(yy=>{"use strict";Object.defineProperty(yy,"__esModule",{value:!0});yy.generateTypeGuardError=_V;var EL=ts();function _V(e,t,r){return(0,EL.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,EL.stringify)(e)}) to be "${r}"`}});var Qr=v(Yd=>{"use strict";Object.defineProperty(Yd,"__esModule",{value:!0});Yd.isNonNullObject=void 0;var wV=M(),vV=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,wV.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Yd.isNonNullObject=vV});var Gt=v(Ae=>{"use strict";Object.defineProperty(Ae,"__esModule",{value:!0});Ae.attachTypeGuardMeta=Ae.isArrayTypeGuard=Ae.isNestedObjectTypeGuard=Ae.getTypeGuardWrapperKind=Ae.getTypeGuardInnerGuard=Ae.getTypeGuardItemGuard=Ae.getTypeGuardSchema=void 0;var TV=e=>e.schema;Ae.getTypeGuardSchema=TV;var kV=e=>e.itemGuard;Ae.getTypeGuardItemGuard=kV;var CV=e=>e.innerGuard;Ae.getTypeGuardInnerGuard=CV;var LV=e=>e.wrapperKind;Ae.getTypeGuardWrapperKind=LV;var EV=e=>{if((0,Ae.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};Ae.isNestedObjectTypeGuard=EV;var RV=e=>{if((0,Ae.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};Ae.isArrayTypeGuard=RV;var xV=(e,t)=>Object.assign(e,t);Ae.attachTypeGuardMeta=xV});var Ji=v(No=>{"use strict";Object.defineProperty(No,"__esModule",{value:!0});No.getExpectedTypeName=No.getTypeGuardDisplayName=void 0;var RL=Gt(),WV=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};No.getTypeGuardDisplayName=WV;var IV=e=>{let t=(0,RL.getTypeGuardWrapperKind)(e),r=(0,RL.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,No.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};No.getExpectedTypeName=IV});var Do=v(Zd=>{"use strict";Object.defineProperty(Zd,"__esModule",{value:!0});Zd.createValidationResult=void 0;var OV=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Zd.createValidationResult=OV});var rs=v(Qd=>{"use strict";Object.defineProperty(Qd,"__esModule",{value:!0});Qd.createValidationError=void 0;var MV=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Qd.createValidationError=MV});var os=v(eu=>{"use strict";Object.defineProperty(eu,"__esModule",{value:!0});eu.createTreeNode=void 0;var NV=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});eu.createTreeNode=NV});var Xi=v(tu=>{"use strict";Object.defineProperty(tu,"__esModule",{value:!0});tu.combineResults=void 0;var DV=Do(),jV=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,DV.createValidationResult)(r,o,n)};tu.combineResults=jV});var ou=v(ru=>{"use strict";Object.defineProperty(ru,"__esModule",{value:!0});ru.createSimplifiedTree=void 0;var xL=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=xL(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},zV=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=xL(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};ru.createSimplifiedTree=zV});var Zi=v(su=>{"use strict";Object.defineProperty(su,"__esModule",{value:!0});su.validateObject=void 0;var $V=Qr(),Yi=Do(),HV=rs(),nu=os(),FV=Xi(),WL=iu(),UV=(e,t,r)=>{let o=()=>{let i=(0,HV.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,nu.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Yi.createValidationResult)(!1,[],a):(0,Yi.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Yi.createValidationResult)(!0,[],(0,nu.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...u]=c,m=d,S=t[m],h=e[m],y=(0,WL.validateProperty)(m,h,S,r);return y.valid?u.length===0?(0,Yi.createValidationResult)(!0,[],(0,nu.createTreeNode)(r.path,!0,"object",e)):a(u):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,WL.validateProperty)(d,e[d],u,r)}),a=(0,FV.combineResults)(i,r.path),c=(0,nu.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,Yi.createValidationResult)(a.valid,a.errors,c)};return(0,$V.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};su.validateObject=UV});var OL=v(cu=>{"use strict";Object.defineProperty(cu,"__esModule",{value:!0});cu.validateArray=void 0;var BV=ts(),au=Do(),IL=rs(),lu=os(),GV=Xi(),VV=Zi(),qV=Ji(),KV=Gt(),JV=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,IL.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,lu.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,au.createValidationResult)(!1,[c],d)}let n=(0,KV.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,m={path:u,config:r.config||null};if(n)return(0,VV.validateObject)(c,n,m);let S=t(c,null),h=(0,qV.getExpectedTypeName)(t),y=(0,BV.stringify)(c);if(S)return(0,au.createValidationResult)(!0,[],(0,lu.createTreeNode)(u,!0,h,c));let p=y.length>200?`Expected ${u} to be "${h}"`:`Expected ${u} (${y}) to be "${h}"`,P=(0,IL.createValidationError)(u,h,c,p),A=(0,lu.createTreeNode)(u,!1,h,c);return A.errors=[P],(0,au.createValidationResult)(!1,[P],A)}),i=(0,GV.combineResults)(s,o),a=(0,lu.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,au.createValidationResult)(i.valid,i.errors,a)};cu.validateArray=JV});var iu=v(uu=>{"use strict";Object.defineProperty(uu,"__esModule",{value:!0});uu.validateProperty=void 0;var ML=Do(),XV=rs(),NL=os(),YV=Ji(),du=Gt(),ZV=Zi(),QV=OL(),eq=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,du.getTypeGuardSchema)(r),c=(0,du.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,ZV.validateObject)(t,a,s);if(c&&(0,du.isArrayTypeGuard)(r))return(0,QV.validateArray)(t,c,s)}let d=u=>{let m=r(t,u),S=(0,YV.getExpectedTypeName)(r);return m?(0,ML.createValidationResult)(!0,[],(0,NL.createTreeNode)(n,!0,S,t)):(()=>{let h=(0,XV.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,NL.createTreeNode)(n,!1,S,t);return y.errors=[h],(0,ML.createValidationResult)(!1,[h],y)})()};if((0,du.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};uu.validateProperty=eq});var mu=v(pu=>{"use strict";Object.defineProperty(pu,"__esModule",{value:!0});pu.isNil=void 0;var tq=M(),rq=function(e,t){return e!=null?(t&&t.callbackOnError((0,tq.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};pu.isNil=rq});var Sy=v(gu=>{"use strict";Object.defineProperty(gu,"__esModule",{value:!0});gu.isDefined=void 0;var oq=M(),nq=mu(),sq=function(e,t){return(0,nq.isNil)(e,null)?(t&&t.callbackOnError((0,oq.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};gu.isDefined=sq});var Py=v(fu=>{"use strict";Object.defineProperty(fu,"__esModule",{value:!0});fu.reportValidationResults=void 0;var iq=ou(),DL=Sy(),aq=mu(),lq=(e,t)=>{if(e.valid===!0||(0,aq.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,DL.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,iq.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,DL.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};fu.reportValidationResults=lq});var Ay=v(ne=>{"use strict";Object.defineProperty(ne,"__esModule",{value:!0});ne.Validation=ne.reportValidationResults=ne.validateObject=ne.validateProperty=ne.createSimplifiedTree=ne.combineResults=ne.createTreeNode=ne.createValidationError=ne.createValidationResult=ne.getExpectedTypeName=void 0;var cq=Ji();Object.defineProperty(ne,"getExpectedTypeName",{enumerable:!0,get:function(){return cq.getExpectedTypeName}});var dq=Do();Object.defineProperty(ne,"createValidationResult",{enumerable:!0,get:function(){return dq.createValidationResult}});var uq=rs();Object.defineProperty(ne,"createValidationError",{enumerable:!0,get:function(){return uq.createValidationError}});var pq=os();Object.defineProperty(ne,"createTreeNode",{enumerable:!0,get:function(){return pq.createTreeNode}});var mq=Xi();Object.defineProperty(ne,"combineResults",{enumerable:!0,get:function(){return mq.combineResults}});var gq=ou();Object.defineProperty(ne,"createSimplifiedTree",{enumerable:!0,get:function(){return gq.createSimplifiedTree}});var fq=iu();Object.defineProperty(ne,"validateProperty",{enumerable:!0,get:function(){return fq.validateProperty}});var hq=Zi();Object.defineProperty(ne,"validateObject",{enumerable:!0,get:function(){return hq.validateObject}});var yq=Py();Object.defineProperty(ne,"reportValidationResults",{enumerable:!0,get:function(){return yq.reportValidationResults}});var Sq=Do(),Pq=Xi(),Aq=rs(),bq=os(),_q=iu(),wq=Zi(),vq=Py(),Tq=ou();ne.Validation={result:Sq.createValidationResult,combine:Pq.combineResults,error:Aq.createValidationError,treeNode:bq.createTreeNode,property:_q.validateProperty,object:wq.validateObject,report:vq.reportValidationResults,createSimplifiedTree:Tq.createSimplifiedTree}});var hu=v(by=>{"use strict";Object.defineProperty(by,"__esModule",{value:!0});by.isType=Cq;var jL=Qr(),zL=Ay(),kq=Gt();function Cq(e){if(!(0,jL.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,zL.validateObject)(r,e,s);return(0,zL.reportValidationResults)(i,o||null),i.valid}return(0,jL.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,kq.attachTypeGuardMeta)(t,{schema:e})}});var UL=v(jo=>{"use strict";Object.defineProperty(jo,"__esModule",{value:!0});jo.isNestedType=jo.isShape=void 0;jo.isSchema=Qi;var $L=Qr(),HL=Ay(),FL=Gt();function Qi(e){if(!(0,$L.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=Eq(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,HL.validateObject)(o,t,i);return(0,HL.reportValidationResults)(a,n||null),a.valid}return(0,$L.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,FL.attachTypeGuardMeta)(r,{schema:t})}function Lq(e){return typeof e=="function"?e:Array.isArray(e)?Rq(e):typeof e=="object"&&e!==null?Qi(e):e}function Eq(e){let t={};for(let[r,o]of Object.entries(e))t[r]=Lq(o);return t}function Rq(e){let t=e[0],r=Qi(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,FL.attachTypeGuardMeta)(o,{itemGuard:r})}jo.isShape=Qi;jo.isNestedType=Qi});var BL=v(_y=>{"use strict";Object.defineProperty(_y,"__esModule",{value:!0});_y.isObjectWith=Wq;var xq=hu();function Wq(e){return(0,xq.isType)(e)}});var GL=v(wy=>{"use strict";Object.defineProperty(wy,"__esModule",{value:!0});wy.isObject=Oq;var Iq=hu();function Oq(e){return(0,Iq.isType)(e)}});var VL=v(vy=>{"use strict";Object.defineProperty(vy,"__esModule",{value:!0});vy.guardWithTolerance=Mq;function Mq(e,t,r){return t(e,r),e}});var qL=v(Ty=>{"use strict";Object.defineProperty(Ty,"__esModule",{value:!0});Ty.isBranded=Dq;var Nq=M();function Dq(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,Nq.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var KL=v(yu=>{"use strict";Object.defineProperty(yu,"__esModule",{value:!0});yu.BrandSymbols=void 0;yu.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var JL=v(Su=>{"use strict";Object.defineProperty(Su,"__esModule",{value:!0});Su.isAny=void 0;var jq=function(e){return!0};Su.isAny=jq});var ea=v(ky=>{"use strict";Object.defineProperty(ky,"__esModule",{value:!0});ky.reportTypeGuardError=$q;var zq=M();function $q(e,t,r){e&&e.callbackOnError((0,zq.generateTypeGuardError)(t,e.identifier,r))}});var XL=v(Pu=>{"use strict";Object.defineProperty(Pu,"__esModule",{value:!0});Pu.isBoolean=void 0;var Hq=ea(),Fq=function(t,r){return typeof t!="boolean"?((0,Hq.reportTypeGuardError)(r,t,"boolean"),!1):!0};Pu.isBoolean=Fq});var YL=v(Au=>{"use strict";Object.defineProperty(Au,"__esModule",{value:!0});Au.isDate=void 0;var Uq=M(),Bq=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,Uq.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Au.isDate=Bq});var Cy=v(bu=>{"use strict";Object.defineProperty(bu,"__esModule",{value:!0});bu.isNumber=void 0;var Gq=ea(),Vq=function(t,r){return typeof t!="number"||isNaN(t)?((0,Gq.reportTypeGuardError)(r,t,"number"),!1):!0};bu.isNumber=Vq});var ZL=v(_u=>{"use strict";Object.defineProperty(_u,"__esModule",{value:!0});_u.isString=void 0;var qq=ea(),Kq=function(t,r){return typeof t!="string"?((0,qq.reportTypeGuardError)(r,t,"string"),!1):!0};_u.isString=Kq});var QL=v(wu=>{"use strict";Object.defineProperty(wu,"__esModule",{value:!0});wu.isUnknown=void 0;var Jq=function(e){return!0};wu.isUnknown=Jq});var eE=v(vu=>{"use strict";Object.defineProperty(vu,"__esModule",{value:!0});vu.isFunction=void 0;var Xq=M(),Yq=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,Xq.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};vu.isFunction=Yq});var rE=v(Tu=>{"use strict";Object.defineProperty(Tu,"__esModule",{value:!0});Tu.isFile=void 0;var tE=M(),Zq=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,tE.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,tE.generateTypeGuardError)(e,t.identifier,"File")),!1)};Tu.isFile=Zq});var nE=v(ku=>{"use strict";Object.defineProperty(ku,"__esModule",{value:!0});ku.isFileList=void 0;var oE=M(),Qq=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,oE.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,oE.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};ku.isFileList=Qq});var iE=v(Cu=>{"use strict";Object.defineProperty(Cu,"__esModule",{value:!0});Cu.isBlob=void 0;var sE=M(),eK=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,sE.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,sE.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Cu.isBlob=eK});var lE=v(Lu=>{"use strict";Object.defineProperty(Lu,"__esModule",{value:!0});Lu.isFormData=void 0;var aE=M(),tK=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,aE.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,aE.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Lu.isFormData=tK});var dE=v(Eu=>{"use strict";Object.defineProperty(Eu,"__esModule",{value:!0});Eu.isURL=void 0;var cE=M(),rK=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,cE.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,cE.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Eu.isURL=rK});var pE=v(Ru=>{"use strict";Object.defineProperty(Ru,"__esModule",{value:!0});Ru.isURLSearchParams=void 0;var uE=M(),oK=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,uE.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,uE.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Ru.isURLSearchParams=oK});var mE=v(xu=>{"use strict";Object.defineProperty(xu,"__esModule",{value:!0});xu.isMap=void 0;var nK=M(),sK=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,nK.generateTypeGuardError)(e,t.identifier,"Map")),!1)};xu.isMap=sK});var gE=v(Wu=>{"use strict";Object.defineProperty(Wu,"__esModule",{value:!0});Wu.isSet=void 0;var iK=M(),aK=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,iK.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Wu.isSet=aK});var fE=v(Ly=>{"use strict";Object.defineProperty(Ly,"__esModule",{value:!0});Ly.isIndexSignature=cK;var lK=M();function cK(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,lK.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,u)=>{let m=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),h=t(m,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return S&&h})}}});var hE=v(Iu=>{"use strict";Object.defineProperty(Iu,"__esModule",{value:!0});Iu.isError=void 0;var dK=ea(),uK=function(t,r){return t instanceof Error?!0:((0,dK.reportTypeGuardError)(r,t,"Error"),!1)};Iu.isError=uK});var Ry=v(Ey=>{"use strict";Object.defineProperty(Ey,"__esModule",{value:!0});Ey.isArrayWithEachItem=gK;var pK=M(),mK=Gt();function gK(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,pK.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,mK.attachTypeGuardMeta)(t,{itemGuard:e})}});var xy=v(Ou=>{"use strict";Object.defineProperty(Ou,"__esModule",{value:!0});Ou.isNonEmptyArray=void 0;var fK=M(),hK=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,fK.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Ou.isNonEmptyArray=hK});var yE=v(Wy=>{"use strict";Object.defineProperty(Wy,"__esModule",{value:!0});Wy.isNonEmptyArrayWithEachItem=PK;var yK=Ry(),SK=xy();function PK(e){return function(t,r){return(0,yK.isArrayWithEachItem)(e)(t,r)&&(0,SK.isNonEmptyArray)(t,r)}}});var PE=v(Iy=>{"use strict";Object.defineProperty(Iy,"__esModule",{value:!0});Iy.isTuple=AK;var SE=M();function AK(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,SE.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,SE.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var AE=v(Oy=>{"use strict";Object.defineProperty(Oy,"__esModule",{value:!0});Oy.isObjectWithEachItem=_K;var bK=M();function _K(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,bK.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var bE=v(My=>{"use strict";Object.defineProperty(My,"__esModule",{value:!0});My.isPartialOf=vK;var wK=Qr();function vK(e){return function(t,r){if(!(0,wK.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var _E=v(Ny=>{"use strict";Object.defineProperty(Ny,"__esModule",{value:!0});Ny.isPick=kK;var TK=Qr();function kK(e,...t){return function(r,o){if(!(0,TK.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var wE=v(Dy=>{"use strict";Object.defineProperty(Dy,"__esModule",{value:!0});Dy.isOmit=LK;var CK=Qr();function LK(e,...t){return function(r,o){if(!(0,CK.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),m=u.indexOf(" ("),S=m>=0?u.slice(0,m):u;if(a.has(S))return!1;let h=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var vE=v(Mu=>{"use strict";Object.defineProperty(Mu,"__esModule",{value:!0});Mu.isNonEmptyString=void 0;var EK=M(),RK=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,EK.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Mu.isNonEmptyString=RK});var TE=v(Nu=>{"use strict";Object.defineProperty(Nu,"__esModule",{value:!0});Nu.isNonNegativeNumber=void 0;var xK=M(),WK=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,xK.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Nu.isNonNegativeNumber=WK});var kE=v(Du=>{"use strict";Object.defineProperty(Du,"__esModule",{value:!0});Du.isPositiveNumber=void 0;var IK=M(),OK=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,IK.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Du.isPositiveNumber=OK});var CE=v(ju=>{"use strict";Object.defineProperty(ju,"__esModule",{value:!0});ju.isNonPositiveNumber=void 0;var MK=M(),NK=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,MK.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};ju.isNonPositiveNumber=NK});var LE=v(zu=>{"use strict";Object.defineProperty(zu,"__esModule",{value:!0});zu.isNegativeNumber=void 0;var DK=M(),jK=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,DK.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};zu.isNegativeNumber=jK});var EE=v($u=>{"use strict";Object.defineProperty($u,"__esModule",{value:!0});$u.isInteger=void 0;var zK=M(),$K=Cy(),HK=function(e,t){return!(0,$K.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,zK.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};$u.isInteger=HK});var RE=v(Hu=>{"use strict";Object.defineProperty(Hu,"__esModule",{value:!0});Hu.isPositiveInteger=void 0;var FK=M(),UK=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,FK.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};Hu.isPositiveInteger=UK});var xE=v(Fu=>{"use strict";Object.defineProperty(Fu,"__esModule",{value:!0});Fu.isNegativeInteger=void 0;var BK=M(),GK=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,BK.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Fu.isNegativeInteger=GK});var WE=v(Uu=>{"use strict";Object.defineProperty(Uu,"__esModule",{value:!0});Uu.isNonNegativeInteger=void 0;var VK=M(),qK=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,VK.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Uu.isNonNegativeInteger=qK});var IE=v(Bu=>{"use strict";Object.defineProperty(Bu,"__esModule",{value:!0});Bu.isNonPositiveInteger=void 0;var KK=M(),JK=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,KK.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Bu.isNonPositiveInteger=JK});var OE=v(Vu=>{"use strict";Object.defineProperty(Vu,"__esModule",{value:!0});Vu.isNumeric=void 0;var Gu=M(),XK=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Gu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Gu.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Gu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Gu.generateTypeGuardError)(e,t.identifier,"number key")),!1};Vu.isNumeric=XK});var ME=v(qu=>{"use strict";Object.defineProperty(qu,"__esModule",{value:!0});qu.isBooleanLike=void 0;var jy=M(),YK=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,jy.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,jy.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};qu.isBooleanLike=YK});var NE=v(Ku=>{"use strict";Object.defineProperty(Ku,"__esModule",{value:!0});Ku.isDateLike=void 0;var ta=M(),ZK=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,ta.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,ta.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,ta.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,ta.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,ta.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Ku.isDateLike=ZK});var DE=v(Ju=>{"use strict";Object.defineProperty(Ju,"__esModule",{value:!0});Ju.isBigInt=void 0;var QK=M(),e4=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,QK.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Ju.isBigInt=e4});var $y=v(zy=>{"use strict";Object.defineProperty(zy,"__esModule",{value:!0});zy.isOneOf=t4;var jE=ts();function t4(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,jE.stringify)(t)}) must be one of following values ${e.map(jE.stringify).join(" | ")}`),o}}});var zE=v(Hy=>{"use strict";Object.defineProperty(Hy,"__esModule",{value:!0});Hy.isOneOfTypes=n4;var r4=ts(),o4=Ji();function n4(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,r4.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,o4.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;a.includes(u)||a.push(u)}})),r.callbackOnError(a.join(`
`))}return n}}});var $E=v(Fy=>{"use strict";Object.defineProperty(Fy,"__esModule",{value:!0});Fy.isIntersectionOf=s4;function s4(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var HE=v(Uy=>{"use strict";Object.defineProperty(Uy,"__esModule",{value:!0});Uy.isExtensionOf=i4;function i4(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var FE=v(By=>{"use strict";Object.defineProperty(By,"__esModule",{value:!0});By.isNullOr=l4;var a4=Gt();function l4(e){function t(r,o){return r===null?!0:e(r,o)}return(0,a4.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var UE=v(Gy=>{"use strict";Object.defineProperty(Gy,"__esModule",{value:!0});Gy.isUndefinedOr=d4;var c4=Gt();function d4(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,c4.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var BE=v(Vy=>{"use strict";Object.defineProperty(Vy,"__esModule",{value:!0});Vy.isNilOr=p4;var u4=Gt();function p4(e){function t(r,o){return r==null?!0:e(r,o)}return(0,u4.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var GE=v(qy=>{"use strict";Object.defineProperty(qy,"__esModule",{value:!0});qy.isAsserted=m4;function m4(e){return!0}});var VE=v(Ky=>{"use strict";Object.defineProperty(Ky,"__esModule",{value:!0});Ky.isEnum=f4;var g4=$y();function f4(e){return function(t,r){return(0,g4.isOneOf)(...Object.values(e))(t,r)}}});var qE=v(Jy=>{"use strict";Object.defineProperty(Jy,"__esModule",{value:!0});Jy.isEqualTo=S4;var h4=M(),y4=ts();function S4(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,h4.generateTypeGuardError)(t,r.identifier,`equal to ${(0,y4.stringify)(e)}`)),!1):!0}}});var KE=v(Xu=>{"use strict";Object.defineProperty(Xu,"__esModule",{value:!0});Xu.isRegex=void 0;var P4=M(),A4=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,P4.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Xu.isRegex=A4});var XE=v(Xy=>{"use strict";Object.defineProperty(Xy,"__esModule",{value:!0});Xy.isPattern=b4;var JE=M();function b4(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,JE.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,JE.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var YE=v(Yy=>{"use strict";Object.defineProperty(Yy,"__esModule",{value:!0});Yy.by=_4;function _4(e){return function(t){return e(t,null)}}});var ZE=v(Zy=>{"use strict";Object.defineProperty(Zy,"__esModule",{value:!0});Zy.toNumber=w4;function w4(e){return typeof e=="number"?e:Number(e)}});var QE=v(Qy=>{"use strict";Object.defineProperty(Qy,"__esModule",{value:!0});Qy.toDate=v4;function v4(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var eR=v(eS=>{"use strict";Object.defineProperty(eS,"__esModule",{value:!0});eS.toBoolean=T4;function T4(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var tR=v(Yu=>{"use strict";Object.defineProperty(Yu,"__esModule",{value:!0});Yu.isSymbol=void 0;var k4=M(),C4=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,k4.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Yu.isSymbol=C4});var ns=v(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.isDateLike=_.isBooleanLike=_.isNumeric=_.isNonPositiveInteger=_.isNonNegativeInteger=_.isNegativeInteger=_.isPositiveInteger=_.isInteger=_.isNegativeNumber=_.isNonPositiveNumber=_.isPositiveNumber=_.isNonNegativeNumber=_.isNonEmptyString=_.isOmit=_.isPick=_.isPartialOf=_.isObjectWithEachItem=_.isNonNullObject=_.isTuple=_.isNonEmptyArrayWithEachItem=_.isNonEmptyArray=_.isArrayWithEachItem=_.isError=_.isIndexSignature=_.isSet=_.isMap=_.isURLSearchParams=_.isURL=_.isFormData=_.isBlob=_.isFileList=_.isFile=_.isFunction=_.isUnknown=_.isString=_.isNumber=_.isNil=_.isDefined=_.isDate=_.isBoolean=_.isAny=_.BrandSymbols=_.isBranded=_.guardWithTolerance=_.isObject=_.isObjectWith=_.isNestedType=_.isShape=_.isSchema=_.isType=void 0;_.isSymbol=_.toBoolean=_.toDate=_.toNumber=_.by=_.generateTypeGuardError=_.isPattern=_.isRegex=_.isEqualTo=_.isEnum=_.isAsserted=_.isNilOr=_.isUndefinedOr=_.isNullOr=_.isExtensionOf=_.isIntersectionOf=_.isOneOfTypes=_.isOneOf=_.isBigInt=void 0;var L4=hu();Object.defineProperty(_,"isType",{enumerable:!0,get:function(){return L4.isType}});var tS=UL();Object.defineProperty(_,"isSchema",{enumerable:!0,get:function(){return tS.isSchema}});Object.defineProperty(_,"isShape",{enumerable:!0,get:function(){return tS.isShape}});Object.defineProperty(_,"isNestedType",{enumerable:!0,get:function(){return tS.isNestedType}});var E4=BL();Object.defineProperty(_,"isObjectWith",{enumerable:!0,get:function(){return E4.isObjectWith}});var R4=GL();Object.defineProperty(_,"isObject",{enumerable:!0,get:function(){return R4.isObject}});var x4=VL();Object.defineProperty(_,"guardWithTolerance",{enumerable:!0,get:function(){return x4.guardWithTolerance}});var W4=qL();Object.defineProperty(_,"isBranded",{enumerable:!0,get:function(){return W4.isBranded}});var I4=KL();Object.defineProperty(_,"BrandSymbols",{enumerable:!0,get:function(){return I4.BrandSymbols}});var O4=JL();Object.defineProperty(_,"isAny",{enumerable:!0,get:function(){return O4.isAny}});var M4=XL();Object.defineProperty(_,"isBoolean",{enumerable:!0,get:function(){return M4.isBoolean}});var N4=YL();Object.defineProperty(_,"isDate",{enumerable:!0,get:function(){return N4.isDate}});var D4=Sy();Object.defineProperty(_,"isDefined",{enumerable:!0,get:function(){return D4.isDefined}});var j4=mu();Object.defineProperty(_,"isNil",{enumerable:!0,get:function(){return j4.isNil}});var z4=Cy();Object.defineProperty(_,"isNumber",{enumerable:!0,get:function(){return z4.isNumber}});var $4=ZL();Object.defineProperty(_,"isString",{enumerable:!0,get:function(){return $4.isString}});var H4=QL();Object.defineProperty(_,"isUnknown",{enumerable:!0,get:function(){return H4.isUnknown}});var F4=eE();Object.defineProperty(_,"isFunction",{enumerable:!0,get:function(){return F4.isFunction}});var U4=rE();Object.defineProperty(_,"isFile",{enumerable:!0,get:function(){return U4.isFile}});var B4=nE();Object.defineProperty(_,"isFileList",{enumerable:!0,get:function(){return B4.isFileList}});var G4=iE();Object.defineProperty(_,"isBlob",{enumerable:!0,get:function(){return G4.isBlob}});var V4=lE();Object.defineProperty(_,"isFormData",{enumerable:!0,get:function(){return V4.isFormData}});var q4=dE();Object.defineProperty(_,"isURL",{enumerable:!0,get:function(){return q4.isURL}});var K4=pE();Object.defineProperty(_,"isURLSearchParams",{enumerable:!0,get:function(){return K4.isURLSearchParams}});var J4=mE();Object.defineProperty(_,"isMap",{enumerable:!0,get:function(){return J4.isMap}});var X4=gE();Object.defineProperty(_,"isSet",{enumerable:!0,get:function(){return X4.isSet}});var Y4=fE();Object.defineProperty(_,"isIndexSignature",{enumerable:!0,get:function(){return Y4.isIndexSignature}});var Z4=hE();Object.defineProperty(_,"isError",{enumerable:!0,get:function(){return Z4.isError}});var Q4=Ry();Object.defineProperty(_,"isArrayWithEachItem",{enumerable:!0,get:function(){return Q4.isArrayWithEachItem}});var e8=xy();Object.defineProperty(_,"isNonEmptyArray",{enumerable:!0,get:function(){return e8.isNonEmptyArray}});var t8=yE();Object.defineProperty(_,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return t8.isNonEmptyArrayWithEachItem}});var r8=PE();Object.defineProperty(_,"isTuple",{enumerable:!0,get:function(){return r8.isTuple}});var o8=Qr();Object.defineProperty(_,"isNonNullObject",{enumerable:!0,get:function(){return o8.isNonNullObject}});var n8=AE();Object.defineProperty(_,"isObjectWithEachItem",{enumerable:!0,get:function(){return n8.isObjectWithEachItem}});var s8=bE();Object.defineProperty(_,"isPartialOf",{enumerable:!0,get:function(){return s8.isPartialOf}});var i8=_E();Object.defineProperty(_,"isPick",{enumerable:!0,get:function(){return i8.isPick}});var a8=wE();Object.defineProperty(_,"isOmit",{enumerable:!0,get:function(){return a8.isOmit}});var l8=vE();Object.defineProperty(_,"isNonEmptyString",{enumerable:!0,get:function(){return l8.isNonEmptyString}});var c8=TE();Object.defineProperty(_,"isNonNegativeNumber",{enumerable:!0,get:function(){return c8.isNonNegativeNumber}});var d8=kE();Object.defineProperty(_,"isPositiveNumber",{enumerable:!0,get:function(){return d8.isPositiveNumber}});var u8=CE();Object.defineProperty(_,"isNonPositiveNumber",{enumerable:!0,get:function(){return u8.isNonPositiveNumber}});var p8=LE();Object.defineProperty(_,"isNegativeNumber",{enumerable:!0,get:function(){return p8.isNegativeNumber}});var m8=EE();Object.defineProperty(_,"isInteger",{enumerable:!0,get:function(){return m8.isInteger}});var g8=RE();Object.defineProperty(_,"isPositiveInteger",{enumerable:!0,get:function(){return g8.isPositiveInteger}});var f8=xE();Object.defineProperty(_,"isNegativeInteger",{enumerable:!0,get:function(){return f8.isNegativeInteger}});var h8=WE();Object.defineProperty(_,"isNonNegativeInteger",{enumerable:!0,get:function(){return h8.isNonNegativeInteger}});var y8=IE();Object.defineProperty(_,"isNonPositiveInteger",{enumerable:!0,get:function(){return y8.isNonPositiveInteger}});var S8=OE();Object.defineProperty(_,"isNumeric",{enumerable:!0,get:function(){return S8.isNumeric}});var P8=ME();Object.defineProperty(_,"isBooleanLike",{enumerable:!0,get:function(){return P8.isBooleanLike}});var A8=NE();Object.defineProperty(_,"isDateLike",{enumerable:!0,get:function(){return A8.isDateLike}});var b8=DE();Object.defineProperty(_,"isBigInt",{enumerable:!0,get:function(){return b8.isBigInt}});var _8=$y();Object.defineProperty(_,"isOneOf",{enumerable:!0,get:function(){return _8.isOneOf}});var w8=zE();Object.defineProperty(_,"isOneOfTypes",{enumerable:!0,get:function(){return w8.isOneOfTypes}});var v8=$E();Object.defineProperty(_,"isIntersectionOf",{enumerable:!0,get:function(){return v8.isIntersectionOf}});var T8=HE();Object.defineProperty(_,"isExtensionOf",{enumerable:!0,get:function(){return T8.isExtensionOf}});var k8=FE();Object.defineProperty(_,"isNullOr",{enumerable:!0,get:function(){return k8.isNullOr}});var C8=UE();Object.defineProperty(_,"isUndefinedOr",{enumerable:!0,get:function(){return C8.isUndefinedOr}});var L8=BE();Object.defineProperty(_,"isNilOr",{enumerable:!0,get:function(){return L8.isNilOr}});var E8=GE();Object.defineProperty(_,"isAsserted",{enumerable:!0,get:function(){return E8.isAsserted}});var R8=VE();Object.defineProperty(_,"isEnum",{enumerable:!0,get:function(){return R8.isEnum}});var x8=qE();Object.defineProperty(_,"isEqualTo",{enumerable:!0,get:function(){return x8.isEqualTo}});var W8=KE();Object.defineProperty(_,"isRegex",{enumerable:!0,get:function(){return W8.isRegex}});var I8=XE();Object.defineProperty(_,"isPattern",{enumerable:!0,get:function(){return I8.isPattern}});var O8=M();Object.defineProperty(_,"generateTypeGuardError",{enumerable:!0,get:function(){return O8.generateTypeGuardError}});var M8=YE();Object.defineProperty(_,"by",{enumerable:!0,get:function(){return M8.by}});var N8=ZE();Object.defineProperty(_,"toNumber",{enumerable:!0,get:function(){return N8.toNumber}});var D8=QE();Object.defineProperty(_,"toDate",{enumerable:!0,get:function(){return D8.toDate}});var j8=eR();Object.defineProperty(_,"toBoolean",{enumerable:!0,get:function(){return j8.toBoolean}});var z8=tR();Object.defineProperty(_,"isSymbol",{enumerable:!0,get:function(){return z8.isSymbol}})});var ss,rR,$8,oR,nR=l(()=>{"use strict";ss=g(require("node:path")),rR=require("node:url"),$8=()=>!0,oR=()=>{if($8()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?ss.default.dirname(ss.default.resolve(e)):ss.default.dirname(ss.default.resolve(__filename))}return ss.default.dirname((0,rR.fileURLToPath)(__agentWitchImportMetaUrl))}});var rS,sR,D,iR,H8,Vt,oS,C,ra,qt,nS,oa,zo,sS,iS,aS,na,fe,eo,Zu,Ne,Qu,O,lS=l(()=>{"use strict";rS=g(require("node:fs")),sR=g(require("node:os")),D=g(require("node:path")),iR=g(ns());Le();nR();Xd();Xd();H8=oR(),Vt=e=>e.trim().toLowerCase(),oS=e=>Vt(e).replace(/@/g,"-at-").replace(/\./g,"-").replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,""),C=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return D.default.resolve(e);let t=D.default.resolve(H8),r=D.default.basename(t),o=D.default.basename(D.default.dirname(t));return r===gy&&(o===Bt||o===gr)?D.default.dirname(t):r===Bt||r===gr?t:D.default.join(sR.default.homedir(),Bt)},ra=(e=C())=>D.default.join(e,gy),qt=(e=C())=>D.default.join(ra(e),_L),nS=(e,t,r)=>t!==null?D.default.join(e,Ve,t,r):D.default.join(e,r),oa=e=>nS(e.installDir,e.profileEmail,Gi),zo=e=>nS(e.installDir,e.profileEmail,Tt),sS=e=>D.default.join(e.logsDir,Oo),iS=e=>D.default.join(e.logsDir,Mo),aS=e=>nS(e.installDir,e.profileEmail,Vi),na=e=>e.profileEmail!==null?D.default.join(e.installDir,Ve,e.profileEmail,Yr):D.default.join(e.installDir,Yr),fe=(e=C())=>qi(e),eo=(e=C())=>Zr(e)?Vd:Gd,Zu=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Vt(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Vt(t):null},Ne=(e=C())=>{let t=D.default.join(e,my);if(!rS.default.existsSync(t))return null;try{let r=JSON.parse(rS.default.readFileSync(t,"utf8"));if((0,iR.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Vt(r.email)}catch{return null}return null},Qu=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Vt(r):null}let t=Zu();return t!==null?t:Ne()},O=e=>{let t=C(),r=ra(t),o=qt(t),n=Qu(e);if(n!==null){let S=D.default.join(t,Ve,n),h=D.default.join(S,qd),y=D.default.join(S,Gi),p=D.default.join(S,Tt),P=D.default.join(S,Vi),A=D.default.join(S,Yr),f=D.default.join(S,Tt,Oo),b=D.default.join(S,Tt,Mo);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:p,mainLogPath:f,errorLogPath:b,reportsDir:P,deviceKeypairPath:A,configPath:D.default.join(S,"config.json"),harnessRootDir:h,harnessManifestPath:D.default.join(h,Jd),harnessSetsDir:D.default.join(h,Kd)}}let s=D.default.join(t,qd),i=D.default.join(t,Gi),a=D.default.join(t,Tt),c=D.default.join(t,Vi),d=D.default.join(t,Yr),u=D.default.join(t,Tt,Oo),m=D.default.join(t,Tt,Mo);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:u,errorLogPath:m,reportsDir:c,deviceKeypairPath:d,configPath:D.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:D.default.join(s,Jd),harnessSetsDir:D.default.join(s,Kd)}}});var F8,is,cS=l(()=>{"use strict";F8=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},is=e=>e.filePort??F8(e.envValue)??e.defaultPort});var dS,aR,U8,B8,uS,as,lR=l(()=>{"use strict";dS=g(require("node:fs")),aR=g(require("node:path"));Le();lS();cS();U8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B8=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,uS=e=>{let t=aR.default.join(e,Bi.wakePort);if(!dS.default.existsSync(t))return null;try{let r=JSON.parse(dS.default.readFileSync(t,"utf8"));if(U8(r)&&B8(r.wakePort))return r.wakePort}catch{return null}return null},as=(e=C())=>is({filePort:uS(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:eo(e)})});var cR={};ft(cR,{isAgentWitchLocalInstallDir:()=>Zr,readActiveProfileEmailFromFile:()=>Ne,readAgentWitchWakePortFromFile:()=>uS,resolveActiveProfileEmail:()=>Qu,resolveActiveProfileEmailFromEnv:()=>Zu,resolveAgentWitchAppBundlePath:()=>qt,resolveAgentWitchAppDir:()=>ra,resolveAgentWitchDefaultWakePort:()=>eo,resolveAgentWitchDeviceKeypairPath:()=>na,resolveAgentWitchErrorLogPath:()=>iS,resolveAgentWitchInstallDir:()=>C,resolveAgentWitchLaunchAgentPrefix:()=>fe,resolveAgentWitchLocalLayout:()=>O,resolveAgentWitchLogsDir:()=>zo,resolveAgentWitchMainLogPath:()=>sS,resolveAgentWitchProjectsDir:()=>oa,resolveAgentWitchReportsDir:()=>aS,resolveAgentWitchRuntimeWakePort:()=>as,resolveAgentWitchWakePortFromSources:()=>is,sanitizeProfileEmailForDir:()=>Vt,sanitizeProfileEmailForLaunchAgentLabel:()=>oS});var B=l(()=>{"use strict";lS();lR();cS()});var pS,mS,ep=l(()=>{"use strict";pS=new Set(["","loginwindow","_mbsetupuser","root"]),mS=5e3});var dR,G8,uR,gS,fS=l(()=>{"use strict";dR=require("node:child_process");ep();G8=e=>e.trim().toLowerCase(),uR=e=>e==null?!1:!pS.has(G8(e)),gS=()=>{if(process.platform!=="darwin")return null;try{let t=(0,dR.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return uR(t)?t:null}catch{return null}}});var mR,pR,kt,sa=l(()=>{"use strict";mR=g(require("node:os"));fS();pR=e=>e.trim().toLowerCase(),kt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?gS():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??mR.default.userInfo().username;return pR(r)===pR(o)}});var gR,fR,$o,hR=l(()=>{"use strict";gR=require("node:child_process"),fR=g(require("node:fs"));B();sa();$o=(e=C())=>{let t=qt(e);if(!fR.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!kt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Ne(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,gR.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var yR,ia,tp=l(()=>{"use strict";yR=require("node:child_process"),ia=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,yR.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var rp,hS,SR,se,op,aa=l(()=>{"use strict";rp=g(require("node:fs")),hS=g(require("node:path"));B();Le();SR=e=>{let t=hS.default.join(e,Ve);return rp.default.existsSync(t)?rp.default.readdirSync(t).filter(r=>rp.default.statSync(hS.default.join(t,r)).isDirectory()).map(r=>Vt(r)).toSorted():[]},se=(e=C())=>{let t=fe(e),r=SR(e);return[{profileEmail:Ne(e)??r[0]??null,launchAgentLabel:t}]},op=(e=C())=>SR(e)});var yS,PR,AR,V8,fr,np=l(()=>{"use strict";yS=g(require("node:fs")),PR=g(require("node:os")),AR=g(require("node:path"));B();aa();V8=()=>AR.default.join(PR.default.homedir(),"Library","LaunchAgents"),fr=(e=C())=>{let t=fe(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of se(e))r.add(n.launchAgentLabel);let o=V8();if(yS.default.existsSync(o))for(let n of yS.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var bR,la,_R=l(()=>{"use strict";B();tp();np();aa();bR=(e=C())=>{let t=new Set(se(e).map(r=>r.launchAgentLabel));return fr(e).filter(r=>!t.has(r))},la=(e=C())=>{for(let t of bR(e))ia(t)}});var ca,SS=l(()=>{"use strict";B();tp();np();ca=(e=C())=>{for(let t of fr(e))ia(t)}});var wR,vR,q8,Ho,TR=l(()=>{"use strict";wR=require("node:child_process"),vR=require("node:util"),q8=(0,vR.promisify)(wR.execFile),Ho=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await q8("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Fo,K8,PS,AS=l(()=>{"use strict";Fo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),K8=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,PS=e=>{let t=e.pathValue??K8(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${Fo(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${Fo(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${Fo(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${Fo(e.homeDir)}</string>
    <key>PATH</key>
    <string>${Fo(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${Fo(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${Fo(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var sp,bS=l(()=>{"use strict";sp=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var da,_S,ip,ap,hr,lp=l(()=>{"use strict";da=g(require("node:fs")),_S=g(require("node:os")),ip=g(require("node:path"));Le();B();AS();bS();ap=(e,t=_S.default.homedir())=>ip.default.join(t,"Library","LaunchAgents",`${e}.plist`),hr=e=>{let t=e.installDir??C(),r=e.homeDir??_S.default.homedir(),o=ap(e.launchAgentLabel,r),n=da.default.existsSync(o)?da.default.readFileSync(o,"utf8"):null;if(n!==null&&sp(n))return{ok:!0,rewritten:!1,plistPath:o};let s=PS({launchAgentLabel:e.launchAgentLabel,runPath:ip.default.join(t,bL,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??as(t)});if(!sp(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{da.default.mkdirSync(ip.default.dirname(o),{recursive:!0}),da.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var CR,LR,ER,ua,J8,X8,kR,De,wS=l(()=>{"use strict";CR=require("node:child_process"),LR=g(require("node:fs")),ER=require("node:util");B();lp();sa();ua=(0,ER.promisify)(CR.execFile),J8=async e=>{try{return await ua("launchctl",["print",e]),!0}catch{return!1}},X8=async(e,t,r)=>{await J8(t)&&await ua("launchctl",["bootout",t]).catch(()=>{}),await ua("launchctl",["bootstrap",e,r]),await ua("launchctl",["enable",t])},kR=async e=>{try{return await ua("launchctl",["kickstart","-k",e]),!0}catch{return!1}},De=async(e,t=C())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!kt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=hr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await kR(n))return{ok:!0};let i=s.plistPath;if(!LR.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await X8(o,n,i),await kR(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Uo,RR=l(()=>{"use strict";B();wS();aa();Uo=async(e=C())=>{let t=[];for(let r of se(e))(await De(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var xR,WR,IR=l(()=>{"use strict";xR=/(<key>AGENT_WITCH_WAKE_PORT<\/key>\s*<string>)[^<]*(<\/string>)/,WR=(e,t)=>xR.test(e)?e.replace(xR,`$1${String(t)}$2`):null});var cp,OR,vS,MR=l(()=>{"use strict";cp=g(require("node:fs")),OR=g(require("node:os"));lp();IR();vS=e=>{let t=e.homeDir??OR.default.homedir(),r=[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`],o=[];for(let n of r){let s=ap(n,t);if(!cp.default.existsSync(s))continue;let i=cp.default.readFileSync(s,"utf8"),a=WR(i,e.wakePort);a===null||a===i||(cp.default.writeFileSync(s,a,"utf8"),o.push(s))}return o}});var nt,yr,NR=l(()=>{"use strict";SS();sa();ep();nt=e=>{kt()||(ca(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},yr=(e,t=mS)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{kt()||e()},t);return()=>{clearInterval(r)}}});var re=l(()=>{"use strict";LL();hR();tp();_R();SS();np();sa();TR();RR();wS();lp();bS();MR();AS();aa();fS();ep();NR()});var TS=l(()=>{"use strict";re()});var DR,jR,dp,zR,ls,$R,HR,Bo=l(()=>{"use strict";DR=".agent-witch",jR="memory",dp="project.json",zR="chunks.ndjson",ls="runs.ndjson",$R="reports",HR=".json"});var FR=l(()=>{"use strict";Bo()});var UR,up,kS=l(()=>{"use strict";UR=g(require("node:path"));FR();up=(e,t)=>UR.default.join(e.trim(),`${t.trim()}${HR}`)});var pa,BR,GR=l(()=>{"use strict";pa="agent-witch.js",BR="command"});var pp=l(()=>{"use strict";GR()});var Go,VR,qR=l(()=>{"use strict";pp();Go=e=>`'${e.replace(/'/g,"'\\''")}'`,VR=e=>{let t=`${e.installDir.trim()}/${"app"}/${pa}`,r=[Go("node"),Go(t),"report","write","--key",Go(e.reportKey.trim()),"--agent-run-id",Go(e.agentRunId.trim()),"--status",Go(e.status),"--summary",Go(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Go(e.details.trim())),r.join(" ")}});var Kt,KR,Y8,CS,mp=l(()=>{"use strict";kS();qR();Kt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},KR=e=>e===Kt.COMPLETED||e===Kt.FAILED,Y8=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),CS=(e,t)=>{let r=up(t.reportsDir,t.reportKey),o=VR({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Kt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${Y8({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var je=l(()=>{"use strict";Le();B()});var ga,XR,JR,YR,Z8,cs,Q8,ZR,fa,ha,LS,QR,ex,ya=l(()=>{"use strict";ga=g(require("node:fs")),XR=g(require("node:path"));mp();kS();je();JR=50,YR=e=>{let t=O(),r=up(t.reportsDir,e);return ga.default.mkdirSync(XR.default.dirname(r),{recursive:!0}),r},Z8=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},cs=e=>{let t=YR(e);if(!ga.default.existsSync(t))return null;try{let r=JSON.parse(ga.default.readFileSync(t,"utf8"));return Z8(r)?r:null}catch{return null}},Q8=(e,t)=>{let r=[...e,t];return r.length>JR?r.slice(r.length-JR):r},ZR=e=>{let t=YR(e.reportKey);ga.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},fa=e=>{let t=cs(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:Q8(t?.history??[],o)};return ZR(n),n},ha=e=>{let t=cs(e.reportKey);return t!==null?t:fa({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Kt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},LS=(e,t)=>{let r=t.trim();if(r.length===0)return cs(e);let o=cs(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return ZR(s),s},QR=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},ex=e=>{if(e===null||!KR(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Kt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var e3,t3,Sa,tx,gp,ES=l(()=>{"use strict";mp();ya();e3=new Set(Object.values(Kt)),t3=e=>e3.has(e),Sa=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},tx=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},gp=e=>{if(e[0]!=="write")return tx(),1;let r=Sa(e,"--key"),o=Sa(e,"--agent-run-id"),n=Sa(e,"--status"),s=Sa(e,"--summary"),i=Sa(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!t3(n)?(tx(),1):(fa({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var st,Vo=l(()=>{"use strict";st=()=>!0});var RS,rx,qo,fp=l(()=>{"use strict";RS=g(require("node:path")),rx=require("node:url");Vo();qo=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=RS.default.resolve(t);return st()?r===RS.default.resolve(__filename):e===void 0?!1:r===(0,rx.fileURLToPath)(e)}});var hp,ds,n3,zse,us=l(()=>{"use strict";hp="agent-witch.js",ds="deps.tar.gz",n3="install.sh",zse={mainScript:`app/${hp}`,depsArchive:`app/${ds}`,installShell:n3}});var ix=l(()=>{"use strict";us()});var ax=l(()=>{"use strict";us();ix()});var Pa,WS,yp,s3,Aa,ze,ms,ba,_a,Ko,IS=l(()=>{"use strict";Pa=g(require("node:fs")),WS=g(require("node:path"));ax();B();yp="install-version.json",s3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Aa=(e=C())=>WS.default.join(e,yp),ze=(e=C())=>{let t=Aa(e);if(!Pa.default.existsSync(t))return null;try{let r=JSON.parse(Pa.default.readFileSync(t,"utf8"));return!s3(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},ms=(e,t=C())=>{let r=Aa(t);Pa.default.mkdirSync(WS.default.dirname(r),{recursive:!0}),Pa.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},ba=(e=C())=>ze(e)?.bundleVersion??"258",_a=(e,t)=>{let r=ze(e);if(r!==null)return r;let o={bundleVersion:"258",appOrigin:t,updatedAt:new Date().toISOString()};return ms(o,e),o},Ko=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var lx,Jo,OS,MS,NS,Sp,Jt,Xo,DS=l(()=>{"use strict";lx=require("node:crypto"),Jo=g(require("node:fs")),OS=g(require("node:path"));B();MS="self-update-log.ndjson",NS=100,Sp=(e=C())=>{let t=O(),r=t.installDir===e?t.logsDir:zo({installDir:e,profileEmail:t.profileEmail});return OS.default.join(r,MS)},Jt=(e,t=C())=>{let r={id:(0,lx.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Sp(t);Jo.default.mkdirSync(OS.default.dirname(o),{recursive:!0});let n=Jo.default.existsSync(o)?Jo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-NS+1)),JSON.stringify(r)];return Jo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Xo=(e=20,t=C())=>{let r=Sp(t);if(!Jo.default.existsSync(r))return[];let o=Jo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var jS,rie,zS=l(()=>{"use strict";us();jS="deps",rie=`${"app"}/${ds}`});var cx=l(()=>{"use strict";zS()});var dx,to,Yo,ux,$S,HS,px=l(()=>{"use strict";dx=require("node:child_process"),to=g(require("node:fs")),Yo=g(require("node:path"));us();zS();ux=e=>Yo.default.join(e,"app",jS),$S=e=>{let t=Yo.default.join(e,"app"),r=Yo.default.join(t,ds);to.default.existsSync(r)&&(to.default.rmSync(ux(e),{recursive:!0,force:!0}),to.default.mkdirSync(t,{recursive:!0}),(0,dx.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),to.default.rmSync(r,{force:!0}))},HS=e=>{to.default.rmSync(Yo.default.join(e,"node_modules"),{recursive:!0,force:!0}),to.default.rmSync(Yo.default.join(e,"package.json"),{force:!0}),to.default.rmSync(Yo.default.join(e,"package-lock.json"),{force:!0})}});var mx=l(()=>{"use strict";cx();px()});var wa,va=l(()=>{"use strict";wa="agent-witch.service"});var gx=l(()=>{"use strict";va()});var Pp,Ap,bp=l(()=>{"use strict";Pp="AGENT_WITCH_EXTERNAL_BRIDGE",Ap="AGENT_WITCH_EXTERNAL_LIVE"});var fx=l(()=>{"use strict";bp();va()});var hx,FS,yx=l(()=>{"use strict";hx=require("node:child_process");va();FS=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,hx.spawn)("systemctl",["--user","restart",wa],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${wa} exited ${o??"unknown"}`))})})});var Sx=l(()=>{"use strict";va();gx();fx();yx()});var it,_p,Px=l(()=>{"use strict";it="https://www.agentwitch.com",_p="wss://www.agentwitch.com/api/agent-witch/ws"});var Ta,Sr,Ax=l(()=>{"use strict";Ta="127.0.0.1",Sr=`http://${Ta}:43347`});var ht=l(()=>{"use strict";Px();Ax()});var ka,wp,bx,BS,a3,_x,qS,wx,Ct,Ca,La,KS,GS,VS,Ea,Ra,JS,XS,gs=l(()=>{"use strict";ka=g(require("node:fs")),wp=g(require("node:path")),bx="active-writer-work.json",BS=new Set,a3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_x=e=>e.profileEmail===null?wp.default.join(e.installDir,bx):wp.default.join(e.installDir,"profiles",e.profileEmail,bx),qS=e=>{let t=_x(e);if(!ka.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(ka.default.readFileSync(t,"utf8"));return!a3(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},wx=(e,t)=>{let r=_x(e);ka.default.mkdirSync(wp.default.dirname(r),{recursive:!0}),ka.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Ct=e=>qS(e).activeCount>0,Ca=e=>{let t=qS(e);wx(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},La=e=>{let t=qS(e),r=Math.max(0,t.activeCount-1);if(wx(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of BS)o()},KS=e=>(BS.add(e),()=>{BS.delete(e)}),GS=null,VS=null,Ea=e=>{GS=e},Ra=e=>{VS=e},JS=()=>{let e=GS;return GS=null,e},XS=()=>{let e=VS;return VS=null,e}});var Ee,vp=l(()=>{"use strict";Ee=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var fs,Tp,xa,YS=l(()=>{"use strict";fs="qwen2.5:7b",Tp="nomic-embed-text",xa="Install Ollama from https://ollama.com/download"});var Wa,ZS,kp=l(()=>{"use strict";YS();Wa=()=>`
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
    echo "Ollama is missing. ${xa}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${xa}" >&2
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
  agent_witch_ensure_ollama_model "${Tp}" "\${pull_log}"
}
`,ZS=()=>`
${Wa()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var vx,l3,Cp,QS=l(()=>{"use strict";vx=require("node:child_process");B();kp();l3=e=>new Promise(t=>{let r=(0,vx.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:C()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Cp=async(e=l3)=>{let t=`${Wa()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var ro,Lp,Tx,c3,kx,ys,d3,u3,p3,hs,Zo,Qo,Cx=l(()=>{"use strict";ro=g(require("node:fs")),Lp=g(require("node:path"));mx();Sx();re();B();us();ht();IS();gs();vp();DS();QS();Tx=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),c3=e=>{let t=Ne(e),r=t===null?O():O(t);if(!ro.default.existsSync(r.configPath))return null;try{let o=JSON.parse(ro.default.readFileSync(r.configPath,"utf8"));return!Tx(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},kx=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!Tx(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},ys=async e=>(await kx(e))?.bundleVersion??null,d3=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Lp.default.join(t,r);ro.default.mkdirSync(Lp.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());ro.default.writeFileSync(n,s),r.endsWith(".js")&&ro.default.chmodSync(n,493)},u3=async()=>{if(process.platform==="linux"){try{await FS()}catch(e){let t=e instanceof Error?e.message:String(e);console.warn(`[agent-witch-self-update] Linux service restart skipped: ${t}`)}return}la(),await Uo()},p3=(e,t)=>e!==null?Ee(e):t??it,hs=(e,t)=>({localBundleVersion:t,...e}),Zo=async e=>{let t=C(),r=ze(t),o=r?.bundleVersion??null,n=await Cp();Jt({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=c3(t),i=p3(s,r?.appOrigin);if(i===null){let d=hs({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return Jt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await kx(i);if(a===null){let d=hs({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return Jt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||Ko(o,a.bundleVersion))){let d=hs({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Jt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await d3(i,t,S);let d=Lp.default.join(t,hp);ro.default.existsSync(d)&&ro.default.rmSync(d,{force:!0}),$S(t),HS(t),ms({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=O(Ne(t));if(Ct(u)){Ra("install-bundle-update");let S=hs({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Jt({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await u3();let m=hs({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Jt({event:"update_applied",ok:!0,message:m.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}catch(d){let u=d instanceof Error?d.message:"Agent Witch self-update failed.",m=hs({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},o);return Jt({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},Qo=()=>{let e=C();return{local:ze(e),logs:Xo(20,e)}}});var Lx={};ft(Lx,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>yp,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>xa,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Tp,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>fs,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>MS,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>NS,appendAgentWitchSelfUpdateLog:()=>Jt,buildAgentWitchEnsureOllamaShell:()=>Wa,buildAgentWitchInstallScriptOllama:()=>ZS,buildAgentWitchSelfUpdateStatus:()=>Qo,ensureAgentWitchInstallVersionRecorded:()=>_a,ensureAgentWitchOllamaInstalled:()=>Cp,fetchAgentWitchRemoteInstallBundleVersion:()=>ys,isRemoteAgentWitchBundleVersionNewer:()=>Ko,readAgentWitchInstallVersion:()=>ze,readAgentWitchSelfUpdateLogs:()=>Xo,resolveAgentWitchAppOriginFromWsUrl:()=>Ee,resolveAgentWitchHeartbeatInstallBundleVersion:()=>ba,resolveAgentWitchInstallVersionPath:()=>Aa,resolveAgentWitchSelfUpdateLogPath:()=>Sp,runAgentWitchSelfUpdate:()=>Zo,writeAgentWitchInstallVersion:()=>ms});var Xt=l(()=>{"use strict";IS();DS();Cx();vp();YS();kp();QS()});var eP={};ft(eP,{buildAgentWitchSelfUpdateStatus:()=>Qo,fetchAgentWitchRemoteInstallBundleVersion:()=>ys,runAgentWitchSelfUpdate:()=>Zo});var tP=l(()=>{"use strict";Xt()});function Ss(e){return(0,Ex.createHash)("sha256").update(e.trim()).digest("hex")}var Ex,Ep=l(()=>{"use strict";Ex=require("node:crypto")});var Ps,Ia,m3,As,rP,Rp=l(()=>{"use strict";Ps=g(require("node:fs")),Ia=g(require("node:path"));Ep();je();m3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),As=e=>{if(!Ps.default.existsSync(e))return null;try{let t=JSON.parse(Ps.default.readFileSync(e,"utf8"));return!m3(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Ss(t.pairingToken.trim())}catch{return null}},rP=(e=C())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(As(Ia.default.join(e,"config.json")));let n=Ia.default.join(e,Ve);if(!Ps.default.existsSync(n))return t;for(let s of Ps.default.readdirSync(n)){let i=Ia.default.join(n,s);Ps.default.statSync(i).isDirectory()&&o(As(Ia.default.join(i,"config.json")))}return t}});var bs,Oa=l(()=>{"use strict";bs="connection-health.json"});var en,xp,g3,Ma,Se,oP,Wp,Re,Ip=l(()=>{"use strict";en=g(require("node:fs")),xp=g(require("node:path"));Oa();g3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ma=e=>e.profileEmail===null?xp.default.join(e.installDir,bs):xp.default.join(e.installDir,"profiles",e.profileEmail,bs),Se=e=>{let t=Ma(e);if(!en.default.existsSync(t))return null;try{let r=JSON.parse(en.default.readFileSync(t,"utf8"));return!g3(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},oP=e=>{let t=Ma(e);en.default.existsSync(t)&&en.default.rmSync(t,{force:!0})},Wp=(e,t)=>{let r=Ma(e),o=Se(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};en.default.mkdirSync(xp.default.dirname(r),{recursive:!0}),en.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Re=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var Na,Rx=l(()=>{"use strict";Oa();Ip();Na=(e,t)=>{if(!t.socketOpen)return!1;let r=Se(e);return r===null?!1:!Re(r,t.staleAfterMs??12e4,t.nowMs)}});var nP,xx=l(()=>{"use strict";Ip();nP=(e,t)=>!(e!==null&&!Re(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var tn=l(()=>{"use strict";Ip();Rx();xx();Oa()});var Op,sP,f3,h3,Wx,Ix=l(()=>{"use strict";Op=g(require("node:fs")),sP=g(require("node:path"));B();Le();tn();Rp();f3=12e4,h3=e=>{let t=sP.default.join(e,Ve);return Op.default.existsSync(t)?Op.default.readdirSync(t).filter(r=>Op.default.statSync(sP.default.join(t,r)).isDirectory()):[]},Wx=(e=C())=>{let t=null,r=-1;for(let o of h3(e)){let n=O(o),s=Se(n);if(s===null||Re(s,f3))continue;let i=As(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var iP,Ox,Mp,Da,ja,y3,S3,P3,Mx,he,ye,Np,Yt,Lt=l(()=>{"use strict";iP=g(require("node:fs")),Ox=g(require("node:os")),Mp=g(require("node:path")),Da={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},ja=e=>e.trim().length>0,y3=e=>{let t=Mp.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},S3=()=>{let e=Ox.default.homedir(),t=Mp.default.join(e,".local","bin","agent");if(iP.default.existsSync(t))return t;let r=Mp.default.join(e,".local","bin","cursor-agent");return iP.default.existsSync(r)?r:Da.cursorCommand},P3=e=>{let t=e.trim();return!ja(t)||t===Da.cursorCommand?S3():t},Mx=(e,t)=>y3(e)?t:["agent",...t],he=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ye=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:ja(t)?t.trim():Da.claudeCommand,codexCommand:ja(r)?r.trim():Da.codexCommand,cursorCommand:P3(o),antigravityCommand:ja(n)?n.trim():Da.antigravityCommand}},Np=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:Mx(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Yt=(e,t,r,o)=>{let n=t.trim();if(!ja(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:Mx(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"--dangerously-skip-permissions","-p",n]}}});var oo,A3,rn,b3,_s,za=l(()=>{"use strict";oo=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,A3=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:oo(s.inputTokens)+oo(s.outputTokens)+oo(s.cacheReadInputTokens)+oo(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},rn=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=oo(a.input_tokens)+oo(a.cache_creation_input_tokens)+oo(a.cache_read_input_tokens),d=oo(a.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:A3(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},b3=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),_s=(e,t)=>{let r=rn(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??b3(r)}}});var aP,_3,w3,lP,cP=l(()=>{"use strict";aP=e=>e.toLocaleString("en-US"),_3=e=>e<.01?e.toFixed(4):e.toFixed(3),w3=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${_3(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${aP(e.inputTokens)} in / ${aP(e.outputTokens)} out (${aP(e.totalTokens)} total)`,t].join(`
`)},lP=(e,t)=>{if(t===void 0)return e;let r=w3(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Dp,dP=l(()=>{"use strict";Dp={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var on,uP,jp,pP=l(()=>{"use strict";dP();on="auto",uP=e=>({value:on,label:`Auto (${Dp[e]})`}),jp={anthropic:[uP("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[uP("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[uP("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var ws,$a,zp,vs=l(()=>{"use strict";dP();pP();ws=e=>{let t=e?.trim()??"";if(!(t.length===0||t===on))return t},$a=(e,t)=>{let r=ws(t);return r===void 0?Dp[e]:r},zp=e=>{let t=ws(e);return t===void 0?on:t}});var $p,v3,T3,Hp,Nx=l(()=>{"use strict";$p={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},v3=e=>{let t=$p[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?$p["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?$p["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?$p["gemini-2.0-flash"]:null},T3=(e,t,r)=>{let o=v3(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},Hp=e=>{let t=T3(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Ts,k3,C3,L3,Fp,Dx=l(()=>{"use strict";Nx();Ts=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),k3=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Ts(r.input_tokens),n=Ts(r.output_tokens);return o===0&&n===0?null:Hp({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},C3=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Ts(r.prompt_tokens),n=Ts(r.completion_tokens);return o===0&&n===0?null:Hp({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},L3=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=Ts(r.promptTokenCount),n=Ts(r.candidatesTokenCount);return o===0&&n===0?null:Hp({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Fp=(e,t,r)=>e==="anthropic"?k3(t,r):e==="openai"?C3(t,r):L3(t,r)});var E3,mP,R3,x3,W3,I3,O3,gP,fP=l(()=>{"use strict";vs();Dx();E3=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},mP=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:$a(e,t.model)},R3=async e=>{let t=mP("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=E3(o);n.length>0&&e.onChunk?.(n);let s=Fp("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},x3=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},W3=async e=>{let t=mP("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=x3(o);n.length>0&&e.onChunk?.(n);let s=Fp("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},I3=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},O3=async e=>{let t=mP("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=I3(n);s.length>0&&e.onChunk?.(s);let i=Fp("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},gP=async e=>{try{return e.provider==="anthropic"?await R3(e):e.provider==="openai"?await W3(e):await O3(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var at,Ha=l(()=>{"use strict";at=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var jx,M3,Up,hP=l(()=>{"use strict";jx=g(require("node:path")),M3="writer-api-secrets.json",Up=e=>jx.default.join(e,M3)});var yP,zx,N3,no,Ye,so=l(()=>{"use strict";yP=g(require("node:fs"));vs();hP();zx=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),N3=e=>{if(!zx(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=ws(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},no=e=>{let t=Up(e);if(!yP.default.existsSync(t))return{};try{let r=JSON.parse(yP.default.readFileSync(t,"utf8"));if(!zx(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=N3(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Ye=(e,t)=>no(e)[t]??null});var $e,Fa=l(()=>{"use strict";$e=e=>e==="api"?"api":"cli"});var $x,We,nn,Pr=l(()=>{"use strict";$x=g(require("node:path"));Ha();so();Fa();We=e=>$x.default.dirname(e),nn=(e,t)=>{if($e(e.writerExecutionBackend)!=="api")return!1;let r=at(t);if(r===null)return!1;let o=We(e.layout.configPath),n=Ye(o,r);return n!==null&&n.apiKey.length>0}});var Ua,SP=l(()=>{"use strict";cP();fP();Ha();so();Pr();Ua=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=at(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=We(e.layout.configPath),a=Ye(i,s);if(a===null){let d=Object.keys(no(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await gP({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:lP(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var Hx,ks,PP=l(()=>{"use strict";Hx=require("node:child_process");Lt();za();SP();Pr();ks=(e,t,r)=>new Promise(o=>{if(!he(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(nn(e,t)){Ua(e,t,r).then(o);return}let n=Yt(t,r,ye({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,Hx.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=_s(i.join("")),u=a.join("").trim(),m=[d.output.trim(),u].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var Fx=l(()=>{"use strict"});var Ux=l(()=>{"use strict";cP();PP();fP();Fx();so();Pr()});var Bx,Gx,Vx,qx=l(()=>{"use strict";Bx="claude",Gx="codex",Vx="cursor"});var Kx,D3,AP,Ba,Bp=l(()=>{"use strict";Kx=g(require("node:path"));ht();Le();D3="ws://localhost:3000/api/agent-witch/ws",AP=e=>e.replace(/\/$/,""),Ba=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return AP(t);let r=Kx.default.basename(e.installDir);if(r===Ui.production)return _p;let o=e.configWsUrl?.trim()??"";return r===Ui.localhost?o.length>0?AP(o):D3:o.length>0?AP(o):_p}});var z3,bP,_P=l(()=>{"use strict";qx();Bp();Fa();z3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bP=e=>{if(!z3(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Ba({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??Bx,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??Gx,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??Vx,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:$e(t.writerExecutionBackend),layout:e.layout}}}});var wP,vP,TP=l(()=>{"use strict";wP=g(require("node:fs"));B();_P();vP=e=>{let t=O(e);if(!wP.default.existsSync(t.configPath))return null;try{let r=JSON.parse(wP.default.readFileSync(t.configPath,"utf8")),o=bP({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Ga,Jx=l(()=>{"use strict";Ga=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var kP,$3,CP,Xx=l(()=>{"use strict";kP=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$3=e=>{if(!kP(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!kP(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(m=>{if(!kP(m))return[];let S=typeof m.itemKey=="string"?m.itemKey.trim():"",h=typeof m.relativePath=="string"?m.relativePath:"",y=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:h,contentSha256:y}]});return u.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},CP=$3});var Yx,H3,Gp,LP=l(()=>{"use strict";Yx=g(require("node:path")),H3=(e,t)=>{let r=t.trim();return Yx.default.join(e,"components","store",r.slice(0,2),r)},Gp=H3});var Zx,F3,EP,Qx=l(()=>{"use strict";Zx=g(require("node:fs"));LP();F3=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Gp(e.installDir,n.contentSha256);Zx.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},EP=F3});var Va,Cs,U3,RP,B3,xP,WP=l(()=>{"use strict";Va=g(require("node:fs")),Cs=g(require("node:path"));LP();U3=(e,t)=>Cs.default.join(e.installDir,"runs",t,"overlay"),RP=(e,t)=>Cs.default.join(U3(e,t),".cursor"),B3=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=RP(e,t);Va.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Gp(e.installDir,i.contentSha256);if(!Va.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Cs.default.join(n,c):Cs.default.join(n,i.itemKey);Va.default.mkdirSync(Cs.default.dirname(d),{recursive:!0}),Va.default.copyFileSync(a,d)}return{ok:!0}},xP=B3});var IP,eW,G3,qa,tW=l(()=>{"use strict";IP=g(require("node:fs")),eW=g(require("node:path")),G3=(e,t)=>{let r=eW.default.join(e.installDir,"runs",t);IP.default.existsSync(r)&&IP.default.rmSync(r,{recursive:!0,force:!0})},qa=G3});var V3,OP,rW=l(()=>{"use strict";WP();V3=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=RP(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},OP=V3});var MP,q3,K3,J3,X3,Y3,$,oW=l(()=>{"use strict";MP=g(require("node:fs"));Bp();B();Fa();q3="claude",K3="codex",J3="cursor",X3="agy",Y3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=O();if(!MP.default.existsSync(e.configPath))return null;try{let t=JSON.parse(MP.default.readFileSync(e.configPath,"utf8"));if(!Y3(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Ba({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:$e(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:q3,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:K3,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:J3,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:X3,pairingToken:s,layout:e}}catch{return null}}});var Vp,nW,sW=l(()=>{"use strict";Vp=g(require("node:fs"));hP();nW=(e,t)=>{let r=Up(e);Vp.default.mkdirSync(e,{recursive:!0}),Vp.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Vp.default.chmodSync(r,384)}catch{}}});var Ka,iW,qp=l(()=>{"use strict";Ka=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},iW=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Ka(t)}});var Ja,Z3,NP,DP,aW=l(()=>{"use strict";Ja=g(require("node:fs"));so();sW();qp();vs();Pr();Z3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),NP=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=iW(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?ws(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},DP=e=>{let t=We(e.configPath),r={};if(Ja.default.existsSync(e.configPath))try{let n=JSON.parse(Ja.default.readFileSync(e.configPath,"utf8"));Z3(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Ja.default.mkdirSync(t,{recursive:!0}),Ja.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=NP(NP(NP(no(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);nW(t,o)}});var Kp,jP=l(()=>{"use strict";Kp={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var zP,lW=l(()=>{"use strict";Ha();so();Pr();Pr();zP=(e,t)=>{if(nn(e,t)||t==="antigravity")return!1;let r=at(t);if(r===null)return!1;let o=We(e.layout.configPath),n=Ye(o,r);return n===null||n.apiKey.trim().length===0}});var cW,$P,HP=l(()=>{"use strict";cW=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},$P=async e=>{let t=cW(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=cW(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var Q3,FP,dW=l(()=>{"use strict";re();TP();HP();Q3=1e4,FP=()=>$P({listProfileEmails:op,readConfig:vP,pollIntervalMs:Q3,logWaiting:e=>{console.error(e)}})});var le=l(()=>{"use strict";PP();Ux();TP();Bp();Jx();Xx();Qx();WP();tW();rW();Fa();oW();aW();so();Pr();qp();vs();jP();SP();Pr();lW();Ha();so();dW();_P();HP()});var uW,UP,pW=l(()=>{"use strict";uW=g(require("node:path"));B();Le();Ix();Ep();Rp();le();UP=(e=C())=>{let t=Wx(e);if(t!==null)return t;let r=Ne(e);if(r!==null){let n=As(uW.default.join(e,Ve,r,"config.json"));if(n!==null)return n}let o=$()?.pairingToken.trim()??"";return o.length===0?null:Ss(o)}});var Jp,mW,eJ,tJ,gW,Xp,Xa,Yp,Ya=l(()=>{"use strict";Jp=g(require("node:fs")),mW=g(require("node:path")),eJ="wake-port.json",tJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gW=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Xp=e=>mW.default.join(e,eJ),Xa=e=>{let t=Xp(e);if(!Jp.default.existsSync(t))return null;try{let r=JSON.parse(Jp.default.readFileSync(t,"utf8"));if(tJ(r)&&gW(r.wakePort))return r.wakePort}catch{return null}return null},Yp=(e,t)=>{if(!gW(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Xp(e);Jp.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var sde,ide,ade,Et,fW,Za=l(()=>{"use strict";B();Ya();je();Ya();sde=eo(),ide=`${fe()}-wake`,ade=fe(),Et=()=>{let e=C();return is({filePort:Xa(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:eo(e)})},fW=e=>{let t=C();Xa(t)===null&&Yp(t,e)}});var hW=l(()=>{"use strict";Ep();re();Rp();pW();le();Za()});var BP,Qa,el,yW=l(()=>{"use strict";BP=g(require("node:os"));hW();Qa=()=>{let e=se();return{ok:!0,port:Et(),hostname:BP.default.hostname(),profileCount:e.length}},el=()=>{let e=se(),t=UP(),r=rP();return{hostname:BP.default.hostname(),port:Et(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var GP=l(()=>{"use strict";yW()});var SW,PW,AW,Zp,Ls=l(()=>{"use strict";SW="materialization.json",PW="backups",AW=".gitignore",Zp=e=>`harness-set:${e.trim()}`});var bW,_W,Qp,wW=l(()=>{"use strict";bW=g(require("node:crypto")),_W=g(require("node:fs")),Qp=e=>{try{let t=_W.default.readFileSync(e);return bW.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var io,sn,rJ,vW,VP,TW=l(()=>{"use strict";io=g(require("node:fs")),sn=g(require("node:path"));wW();rJ=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=sn.default.join(t,n,o);return io.default.mkdirSync(sn.default.dirname(s),{recursive:!0}),io.default.copyFileSync(r,s),sn.default.relative(e,s).replaceAll("\\","/")},vW=e=>{let t=sn.default.join(e.repoRoot,e.repoRelativeDestination),r=Qp(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(io.default.existsSync(t)){let n=Qp(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=rJ(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return io.default.mkdirSync(sn.default.dirname(t),{recursive:!0}),io.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return io.default.mkdirSync(sn.default.dirname(t),{recursive:!0}),io.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},VP=e=>{let t=Qp(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var qP,kW,Es,em=l(()=>{"use strict";qP=g(require("node:fs"));Ls();kW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Es=e=>{if(!qP.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(qP.default.readFileSync(e,"utf8"));if(kW(t)&&t.version===1&&kW(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var ao,tm,rm,KP=l(()=>{"use strict";ao=g(require("node:fs")),tm=g(require("node:path"));Ls();rm=e=>{let t=new Set(e.setSlugs.map(s=>Zp(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=tm.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=tm.default.join(e.repoRoot,i.backupPath);ao.default.existsSync(c)?(ao.default.mkdirSync(tm.default.dirname(a),{recursive:!0}),ao.default.copyFileSync(c,a),o.push(s)):ao.default.existsSync(a)&&ao.default.rmSync(a,{force:!0})}else ao.default.existsSync(a)&&ao.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var JP,Rs,om=l(()=>{"use strict";JP=g(require("node:path"));Ls();Rs=e=>({ledgerFilePath:JP.default.join(e.metaDirPath,SW),backupsDirPath:JP.default.join(e.metaDirPath,PW)})});var XP,CW,LW=l(()=>{"use strict";XP=g(require("node:path")),CW=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return XP.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return XP.default.posix.join(s,e,n)}});var YP,EW,rl,ZP=l(()=>{"use strict";YP=g(require("node:fs")),EW=g(require("node:path")),rl=(e,t)=>{YP.default.mkdirSync(EW.default.dirname(e),{recursive:!0}),YP.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var QP,oJ,He,lo=l(()=>{"use strict";QP=g(require("node:os")),oJ=e=>{let t=e.trim();return t.startsWith("~/")?`${QP.default.homedir()}${t.slice(1)}`:t==="~"?QP.default.homedir():t},He=oJ});var nm,RW,nJ,xW,WW=l(()=>{"use strict";nm=g(require("node:fs")),RW=g(require("node:path"));Ls();Bo();nJ=`*
!${dp}
`,xW=e=>{let t=RW.default.join(e,AW);nm.default.existsSync(t)||(nm.default.mkdirSync(e,{recursive:!0}),nm.default.writeFileSync(t,nJ))}});var an,yt,ln=l(()=>{"use strict";an=g(require("node:path"));Bo();lo();yt=e=>{let t=He(e),r=an.default.join(t,DR);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:an.default.join(r,"rag"),memoryDirPath:an.default.join(r,jR),reportsDirPath:an.default.join(r,$R),metaFilePath:an.default.join(r,dp),ragChunksFilePath:an.default.join(r,"rag",zR)}}});var Zt,OW,sJ,iJ,qe,sm=l(()=>{"use strict";Zt=g(require("node:fs")),OW=g(require("node:path"));Bo();WW();ln();sJ=(e,t)=>{if(Zt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Zt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},iJ=e=>{Zt.default.existsSync(e.ragChunksFilePath)||Zt.default.writeFileSync(e.ragChunksFilePath,"");let t=OW.default.join(e.memoryDirPath,ls);Zt.default.existsSync(t)||Zt.default.writeFileSync(t,"")},qe=e=>{let t=yt(e.projectFolderPath);return Zt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Zt.default.mkdirSync(t.ragDirPath,{recursive:!0}),Zt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),xW(t.metaDirPath),sJ(t,e),iJ(t),{ok:!0,layout:t}}});var MW,NW,DW,jW,im,am=l(()=>{"use strict";MW="components",NW="store",DW="versions",jW="installed.json",im=e=>`harness-set:${e.trim()}`});var eA,zW,lm,tA=l(()=>{"use strict";eA=g(require("node:fs")),zW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lm=e=>{if(!eA.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(eA.default.readFileSync(e,"utf8"));if(zW(t)&&t.version===1&&zW(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var ol,xs,cm=l(()=>{"use strict";ol=g(require("node:path"));am();xs=e=>{let t=ol.default.join(e,MW);return{componentsRootDir:t,storeDir:ol.default.join(t,NW),versionsDir:ol.default.join(t,DW),installedFilePath:ol.default.join(t,jW)}}});var rA,$W,dm,um,pm=l(()=>{"use strict";rA=g(require("node:crypto")),$W=g(require("node:fs")),dm=e=>rA.default.createHash("sha256").update(e,"utf8").digest("hex"),um=e=>{try{let t=$W.default.readFileSync(e);return rA.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var oA,HW,FW,UW=l(()=>{"use strict";oA=g(require("node:fs")),HW=g(require("node:path")),FW=(e,t)=>{oA.default.mkdirSync(HW.default.dirname(e),{recursive:!0}),oA.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var nA,sA,BW,GW=l(()=>{"use strict";nA=g(require("node:fs")),sA=g(require("node:path")),BW=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=sA.default.join(e,r),n=sA.default.join(o,`${t.versionId}.json`);nA.default.mkdirSync(o,{recursive:!0}),nA.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var mm,VW,qW,KW=l(()=>{"use strict";mm=g(require("node:fs")),VW=g(require("node:path"));pm();qW=e=>{let t=dm(e.content),r=VW.default.join(e.storeDir,t);return mm.default.existsSync(r)||(mm.default.mkdirSync(e.storeDir,{recursive:!0}),mm.default.writeFileSync(r,e.content)),t}});var iA,JW,aJ,gm,aA=l(()=>{"use strict";iA=g(require("node:fs")),JW=g(require("node:path"));am();tA();cm();pm();UW();GW();KW();aJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gm=e=>{let t=xs(e.installDir),r=im(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!aJ(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=JW.default.join(e.harnessRootDir,a);if(!iA.default.existsSync(c))continue;let d=iA.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:um(c);if(u!==null){if(dm(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);qW({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:u})}}if(n.length===0)return;BW(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=lm(t.installedFilePath);FW(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var cA,lA,XW,YW=l(()=>{"use strict";cA=g(require("node:fs"));aA();tA();cm();lA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),XW=e=>{if(!cA.default.existsSync(e.harnessManifestPath))return;let t=xs(e.installDir),r=lm(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(cA.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!lA(o)||o.version!==1||!lA(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!lA(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];gm({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var dA,ZW,QW,e0=l(()=>{"use strict";dA=g(require("node:fs")),ZW=g(require("node:path")),QW=e=>{let t=e.componentId.replaceAll("/","_"),r=ZW.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!dA.default.existsSync(r))return null;try{let o=JSON.parse(dA.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var fm,hm,t0,r0=l(()=>{"use strict";fm=g(require("node:fs")),hm=g(require("node:path"));am();YW();e0();cm();pm();t0=e=>{XW({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=xs(e.layout.installDir),r=im(e.setSlug),o=QW({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=hm.default.join(t.storeDir,i.contentSha256);if(fm.default.existsSync(a)&&um(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?hm.default.join(e.layout.harnessRootDir,n):hm.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!fm.default.existsSync(s))return null;try{if(!fm.default.statSync(s).isFile())return null}catch{return null}return s}});var o0,lJ,uA,Qt,nl=l(()=>{"use strict";em();om();ln();o0="harness-set:",lJ=e=>{let t=e.trim();if(!t.startsWith(o0))return null;let r=t.slice(o0.length).trim();return r.length>0?r:null},uA=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=lJ(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Qt=e=>{let t=yt(e),{ledgerFilePath:r}=Rs(t),o=Es(r);return uA(o)}});var ym,pA,sl,cJ,Ar,il,Ws=l(()=>{"use strict";ym=g(require("node:fs")),pA=g(require("node:os")),sl=g(require("node:path")),cJ=()=>ym.default.realpathSync(sl.default.resolve(pA.default.homedir())),Ar=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?sl.default.join(pA.default.homedir(),t.slice(1)):t,o;try{o=ym.default.realpathSync(sl.default.resolve(r))}catch{return null}let n=cJ();return o===n||o.startsWith(`${n}${sl.default.sep}`)?o:null},il=e=>{let t=Ar(e);if(t===null)return null;try{if(!ym.default.statSync(t).isFile())return null}catch{return null}return t}});var mA,gA=l(()=>{"use strict";mA=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Pm,n0,Sm,dJ,al,fA=l(()=>{"use strict";Pm=g(require("node:fs")),n0=g(require("node:path"));Ls();TW();em();KP();om();LW();ZP();lo();sm();r0();nl();Ws();gA();Sm=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),dJ=e=>{if(!Pm.default.existsSync(e))return null;try{let t=JSON.parse(Pm.default.readFileSync(e,"utf8"));if(Sm(t)&&t.version===1)return t}catch{return null}return null},al=e=>{let t=[...new Set(e.setSlugs.map(A=>A.trim()).filter(A=>A.length>0))],r=He(e.projectFolderPath),o=Ar(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Pm.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=qe({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Rs(s.layout),d=Qt(o).filter(A=>!t.includes(A)),u=Es(i),m=0;if(d.length>0){let A=rm({repoRoot:o,setSlugs:d,ledger:u});u=A.ledger,m=A.summary.removedPaths.length}if(t.length===0)return rl(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let S=dJ(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=Sm(S.sets)?S.sets:{},y=0,p=0,P=0;for(let A of t){let f=h[A];if(!Sm(f))return{ok:!1,errorMessage:`Harness set "${A}" is not installed locally.`};let b=typeof f.version=="number"?String(f.version):"1",w=Zp(A),T=Array.isArray(f.items)?f.items:[];for(let k of T){if(!Sm(k))continue;let L=typeof k.path=="string"?k.path.trim():"";if(L.length===0)continue;let x=mA(L);if(x===null)continue;let I=CW(A,x),N=n0.default.posix.join(".cursor",I).replaceAll("\\","/"),U=typeof k.id=="string"?k.id.trim():"",V=t0({layout:e.layout,setSlug:A,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:L,manifestItemId:U});if(V===null)continue;let q=vW({repoRoot:o,backupsDir:a,repoRelativeDestination:N,sourceAbsolutePath:V,componentId:w,versionId:b,ledger:u});if(q.kind==="skipped_unchanged"){p+=1;continue}if(q.kind==="backed_up_user_file"){P+=1,y+=1,u={version:1,entries:{...u.entries,[N]:VP({componentId:w,versionId:b,sourceAbsolutePath:V,backupPath:q.backupPath})}};continue}y+=1,u={version:1,entries:{...u.entries,[N]:VP({componentId:w,versionId:b,sourceAbsolutePath:V})}}}}return y===0&&p===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(rl(i,u),{ok:!0,writtenFileCount:y,skippedFileCount:p,backedUpFileCount:P,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var s0,Am,uJ,pJ,mJ,gJ,fJ,hJ,yJ,SJ,PJ,ll,bm=l(()=>{"use strict";s0=g(require("node:crypto")),Am=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},uJ=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},pJ=(e,t)=>{let r=uJ(t),o=Am(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},mJ=(e,t,r)=>{let o=pJ(t,r);return`shared/items/${e}/${o}`},gJ=["rules","skills","commands","instructions","agents"],fJ=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),hJ=(e,t)=>[...e.filter(o=>o.id!==t.id),t],yJ=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},SJ=e=>s0.default.createHash("sha256").update(e,"utf8").digest("hex"),PJ=e=>({id:e.id,kind:e.kind,title:e.title,path:mJ(e.id,e.kind,e.title),contentSha256:SJ(e.content)}),ll=e=>{let t=new Date().toISOString(),r=e.existingManifest??fJ(e.hostname,t),o=Am(e.bundle.slug),n=yJ(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...gJ.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let m=PJ(u);return{files:[...d.files,{relativePath:m.path,content:u.content}],nextItems:hJ(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var co,i0,_m,AJ,cn,hA=l(()=>{"use strict";co=g(require("node:fs")),i0=g(require("node:os")),_m=g(require("node:path"));bm();AJ=e=>{if(!co.default.existsSync(e))return null;try{let t=JSON.parse(co.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},cn=e=>{try{let t=AJ(e.layout.harnessManifestPath),r=ll({bundle:e.bundle,hostname:i0.default.hostname(),existingManifest:t});co.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)co.default.mkdirSync(_m.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=_m.default.join(e.layout.harnessRootDir,o.relativePath);co.default.mkdirSync(_m.default.dirname(n),{recursive:!0}),co.default.writeFileSync(n,o.content)}return co.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var yA,a0=l(()=>{"use strict";hA();fA();yA=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=cn({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return al({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var l0,c0=l(()=>{"use strict";l0=["rule","skill","command","instruction","agent"]});var d0,bJ,_J,er,SA=l(()=>{"use strict";c0();d0=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bJ=e=>typeof e=="string"&&l0.includes(e),_J=e=>{if(!d0(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!bJ(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},er=e=>{if(!d0(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=_J(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var u0,wJ,PA,p0=l(()=>{"use strict";u0=require("node:zlib");SA();wJ="x-agent-witch-token",PA=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[wJ]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,u0.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=er(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var bA,AA,tr,m0=l(()=>{"use strict";bA=g(require("node:fs")),AA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),tr=e=>{if(!bA.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(bA.default.readFileSync(e.harnessManifestPath,"utf8"));if(!AA(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=AA(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!AA(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var wm,g0=l(()=>{"use strict";wm=()=>"~"});var f0,h0,y0=l(()=>{"use strict";f0=require("node:crypto"),h0=e=>`local-${(0,f0.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var _A,S0=l(()=>{"use strict";_A=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var cl,vm,wA=l(()=>{"use strict";cl=g(require("node:path")),vm=e=>{let t=cl.default.dirname(e),r=cl.default.basename(t);return r==="agents"?cl.default.basename(cl.default.dirname(t)):r}});var dl,br,P0,vJ,TJ,kJ,Tm,A0,vA=l(()=>{"use strict";dl=g(require("node:fs")),br=g(require("node:path"));y0();S0();wA();P0=new Set(["node_modules",".git","dist","build",".next","coverage"]),vJ=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},TJ=(e,t)=>{let r=br.default.basename(t);if(e==="skill"){let o=t.split(br.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},kJ=e=>{let t=[],r=(n,s)=>{let i;try{i=dl.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&P0.has(a.name))continue;let c=br.default.join(n,a.name),d=s?br.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;_A(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=br.default.join(e,n);dl.default.existsSync(s)&&r(s,n)}let o=br.default.join(e,"skills");return dl.default.existsSync(o)&&r(o,"skills"),t},Tm=e=>{let t=kJ(e);if(t.length===0)return null;let r=br.default.dirname(e),o=vm(e),n=vJ(o),s=t.map(i=>{let a=_A(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:h0(i.absolutePath),kind:a,title:TJ(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},A0=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=dl.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||P0.has(a.name))continue;let c=br.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var b0,TA,CJ,kA,_0=l(()=>{"use strict";b0=g(require("node:fs")),TA=g(require("node:path"));vA();Ws();CJ=e=>{let t=Ar(e.trim());if(t===null)return null;if(TA.default.basename(t)===".cursor")return t;let r=TA.default.join(t,".cursor");try{if(b0.default.statSync(r).isDirectory())return Ar(r)}catch{return null}return null},kA=e=>{let t=CJ(e.projectPath);if(t===null)return null;let r=Tm(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var w0,LJ,km,CA,v0=l(()=>{"use strict";w0=g(require("node:path"));vA();Ws();wA();LJ=5,km=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},CA=e=>{let t=Ar(e.scanRoot.trim());if(t===null)return km(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of A0(t,LJ,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=Ar(s);if(i===null)continue;let a=vm(i);km(e.response,"folder",{cursorDir:i,groupName:a,repoPath:w0.default.dirname(i)});let c=Tm(i);c!==null&&(r.push(c),km(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return km(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var T0,k0,C0=l(()=>{"use strict";T0=g(require("node:path")),k0=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:T0.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Ke,L0,LA,EJ,EA,RA,Cm,xA,ul,E0=l(()=>{"use strict";Ke=g(require("node:fs")),L0=g(require("node:os")),LA=g(require("node:path"));bm();aA();Ws();C0();EJ=e=>{if(!Ke.default.existsSync(e))return null;try{let t=JSON.parse(Ke.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},EA=e=>{let t=e.hostname??L0.default.hostname(),r=EJ(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let c=[];for(let u of a){let m=il(u.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let S=Ke.default.readFileSync(m,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:S,setSlugs:[i.slug]})}let d=ll({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Ke.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Ke.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=LA.default.join(e.layout.harnessRootDir,i.relativePath);Ke.default.mkdirSync(LA.default.dirname(a),{recursive:!0}),Ke.default.writeFileSync(a,i.content)}Ke.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=Am(i.slug),d=r.sets[c];d!==void 0&&gm({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},RA="reveal-cache.json",Cm=(e,t)=>{Ke.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Ke.default.writeFileSync(`${e.harnessRootDir}/${RA}`,`${JSON.stringify(t,null,2)}
`)},xA=e=>{let t=`${e.harnessRootDir}/${RA}`;Ke.default.existsSync(t)&&Ke.default.unlinkSync(t)},ul=e=>{let t=`${e.harnessRootDir}/${RA}`;if(!Ke.default.existsSync(t))return null;try{let r=JSON.parse(Ke.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return k0(r)}catch{return null}return null}});var uo=l(()=>{"use strict";fA();a0();gA();hA();p0();SA();bm();m0();g0();_0();Ws();v0();E0()});var WA,R0=l(()=>{"use strict";uo();je();WA=e=>{let t=O(e.profileEmail);return cn({bundle:e.bundle,layout:t})}});var x0=l(()=>{"use strict";R0();uo()});var RJ,W0,xJ,I0,dn,Lm,O0=l(()=>{"use strict";RJ=["agentwitch.com","www.agentwitch.com"],W0=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,xJ=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},I0=e=>{let t=xJ(e);return!!(RJ.includes(t)||W0.test(e.trim().toLowerCase()))},dn=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return I0(r)?W0.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Lm=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:dn(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var pl=l(()=>{"use strict";O0()});var _r,ml=l(()=>{"use strict";_r=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var gl,M0=l(()=>{"use strict";x0();pl();ml();gl=e=>{if(!_r(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=er(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!dn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=WA({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var IA=l(()=>{"use strict";M0()});var WJ,Is,OA=l(()=>{"use strict";WJ=e=>e==="hourly"||e==="daily"||e==="weekdays",Is=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!WJ(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var fl,Em,N0,D0,MA,Rt,Rm,xm,Wm,Im,Om=l(()=>{"use strict";fl=g(require("node:fs")),Em=g(require("node:path"));OA();N0="automations.json",D0=e=>e.profileEmail!==null?Em.default.join(e.installDir,"profiles",e.profileEmail,N0):Em.default.join(e.installDir,N0),MA=()=>({version:1,automations:[]}),Rt=e=>{let t=D0(e);if(!fl.default.existsSync(t))return MA();try{let r=JSON.parse(fl.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?MA():{version:1,automations:r.automations.flatMap(n=>{let s=Is(n);return s!==null?[s]:[]})}}catch{return MA()}},Rm=(e,t)=>{let r=D0(e);fl.default.mkdirSync(Em.default.dirname(r),{recursive:!0}),fl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},xm=(e,t)=>{Rm(e,{version:1,automations:t})},Wm=(e,t)=>{let o=Rt(e).automations.filter(n=>n.id!==t.id);Rm(e,{version:1,automations:[...o,t]})},Im=(e,t)=>Rt(e).automations.find(r=>r.id===t)??null});var Fe,wr=l(()=>{"use strict";Fe="x-agent-witch-token"});var NA=l(()=>{"use strict";vp();kp()});var Y,un,DA,hl,jA,IJ,zA,yl,pn,$A,Os=l(()=>{"use strict";wr();NA();Y=e=>{let t=Ee(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},un=e=>({[Fe]:e,"Content-Type":"application/json"}),DA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:un(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},hl=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:un(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},jA=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:un(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},IJ=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},zA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:un(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},yl=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:un(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return IJ(r)}catch{return null}},pn=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:un(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},$A=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:un(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var mn,j0,z0,OJ,HA,$0,FA=l(()=>{"use strict";mn=g(require("node:fs")),j0=g(require("node:path")),z0=e=>j0.default.join(e.harnessRootDir,"projects-registry.json"),OJ=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),HA=e=>{let t=z0(e);if(!mn.default.existsSync(t))return[];try{let r=JSON.parse(mn.default.readFileSync(t,"utf8"));return OJ(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},$0=e=>{let t=z0(e);if(!mn.default.existsSync(t))return;let r=`${t}.migrated`;if(mn.default.existsSync(r)){mn.default.unlinkSync(t);return}mn.default.renameSync(t,r)}});var H0,MJ,NJ,F0,U0=l(()=>{"use strict";lo();H0=e=>He(e),MJ=e=>new Set(e.map(t=>H0(t.folderPath))),NJ=e=>new Set(e.map(t=>t.id)),F0=(e,t)=>{let r=MJ(t),o=NJ(t),n=[],s=new Set;for(let i of e){let a=H0(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var UA,BA=l(()=>{"use strict";Os();FA();U0();UA=async(e,t)=>{let r=HA(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await yl(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=F0(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await zA(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&$0(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var GA,vr,Sl=l(()=>{"use strict";GA=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),vr=(e,t)=>e.find(r=>r.id===t)??null});var po,Pl=l(()=>{"use strict";Os();BA();Sl();po=async(e,t)=>{t!==void 0&&await UA(t,e);let r=Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await yl(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=GA(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var B0=l(()=>{"use strict"});var VA,DJ,Mm,qA=l(()=>{"use strict";VA=g(require("node:fs"));ln();DJ=e=>{let t=yt(e);if(!VA.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(VA.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},Mm=DJ});var KA,JA,G0=l(()=>{"use strict";KA=g(require("node:path"));lo();qA();JA=e=>{let t=KA.default.resolve(He(e)),r=o=>{let{projectId:n}=Mm(o);if(n!==null)return n;let s=KA.default.dirname(o);return s===o?null:r(s)};return r(t)}});var jJ,zJ,Nm,XA=l(()=>{"use strict";jJ="Default",zJ=e=>e.trim().toLowerCase()===jJ.toLowerCase(),Nm=zJ});var Q,V0,$J,HJ,FJ,UJ,BJ,mo,Dm=l(()=>{"use strict";XA();Q=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),V0=(e,t)=>e.length===0?`<p class="empty">${Q(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Q(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Q(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,$J=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,HJ=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from Agent Witch Cloud.":"This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Q(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},FJ=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
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
      </div>`},UJ=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?FJ({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?HJ({project:e.project,alreadyInRepo:!1}):$J();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),u=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this Mac.');">
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
      </div>`},BJ=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Q(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Q(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},mo=e=>{let t=e.flashError?`<div class="alert-error">${Q(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Q(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(m,S)=>`<a class="project-tab${e.activeTab===m?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${m}">${Q(S)}</a>`,n=e.composition?.items.filter(m=>m.kind==="workflow")??[],s=e.composition?.items.filter(m=>m.kind==="agent")??[],i="";e.activeTab==="harness"?i=UJ({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=V0(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=V0(s,"No agents installed for this project yet."):i=BJ({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});let a=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,c=`${a}?rename=1`,d=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${Q(a)}" target="_blank" rel="noopener noreferrer">Open in Agent Witch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${Q(c)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,u=Nm(e.project.name)?"":`<section class="danger-zone stack">
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
    </section>${u}`}});var GJ,VJ,q0,K0=l(()=>{"use strict";uo();wr();GJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),VJ=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[Fe]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!GJ(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=er(n);return s===null?[]:[s]})}catch{return null}},q0=VJ});var J0,YA,X0=l(()=>{"use strict";le();uo();Dm();Pl();K0();Sl();nl();Os();ht();J0=e=>({kind:"page",title:e.project.name,body:mo({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:tr(e.layout),linkedSetSlugs:Qt(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),YA=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let o=await po(r,e.layout),n=vr(o.projects,t);if(n===null)return{kind:"not_found"};let s=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??it,a=s===null?null:await q0(s,n.id);if(a===null)return J0({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=yA({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return J0({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await pn(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var Y0,ZA,Z0=l(()=>{"use strict";le();uo();ht();Os();Dm();sm();lo();Pl();Sl();nl();em();KP();om();ZP();Y0=e=>({kind:"page",title:e.project.name,body:mo({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:tr(e.layout),linkedSetSlugs:Qt(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),ZA=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=$();if(n===null)return{kind:"not_found"};let s=await po(n,e.layout),i=vr(s.projects,r);if(i===null)return{kind:"not_found"};let a=Y({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??it;if(o.length===0)return Y0({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=He(i.projectFolderPath),u=qe({projectFolderPath:d}),{ledgerFilePath:m}=Rs(u.layout),S=Es(m),h=uA(S);if(!h.includes(o))return Y0({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let y=h.filter(f=>f!==o),p=rm({repoRoot:u.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:S});rl(m,p.ledger);let P=a===null?!1:await pn(a,i.id,y),A=new URLSearchParams({linked:"1",removed:o,files:String(p.summary.removedPaths.length),bindingsSynced:P?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${A.toString()}`}}});var qJ,QA,Q0=l(()=>{"use strict";qJ=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,QA=qJ});var eI=l(()=>{"use strict"});var tI=l(()=>{"use strict"});var rI=l(()=>{"use strict";eI();tI()});var KJ,go,oI=l(()=>{"use strict";KJ=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],go=(e=process.env)=>{let t={...e};for(let r of KJ)delete t[r];return t}});var nI=l(()=>{"use strict";oI()});var eb,sI=l(()=>{"use strict";eb={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var tb=l(()=>{"use strict";sI()});var jm,rb=l(()=>{"use strict";jm={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var zm=l(()=>{"use strict";rI();nI();ht();tb();rb()});var iI,aI,JJ,$m,Hm,lI=l(()=>{"use strict";iI=require("node:child_process"),aI=require("node:util");zm();JJ=(0,aI.promisify)(iI.execFile),$m=async(e,t)=>{try{let{stdout:r}=await JJ("git",t,{cwd:e,env:go(),maxBuffer:1048576});return r.trim()}catch{return null}},Hm=async e=>{let t=await $m(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await $m(e,["rev-parse","--abbrev-ref","HEAD"]),o=await $m(e,["status","--porcelain"]),n=await $m(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var ob,cI=l(()=>{"use strict";ob=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var XJ,nb,dI=l(()=>{"use strict";XJ=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},nb=XJ});var YJ,sb,uI=l(()=>{"use strict";wr();YJ=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[Fe]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},sb=YJ});var pI,fo,mI=l(()=>{"use strict";pI=require("node:child_process"),fo=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,pI.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var gI=l(()=>{"use strict";Pl()});var Al,fI=l(()=>{"use strict";wr();Al=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[Fe]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var ib,hI=l(()=>{"use strict";wr();ib=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[Fe]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var xt=l(()=>{"use strict";Pl();Sl();B0();lo();sm();G0();X0();Z0();nl();Q0();lI();cI();dI();uI();mI();gI();fI();hI();BA();FA();Os()});var Fm,bl,yI,ab,gn,lb=l(()=>{"use strict";Fm=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},bl=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Fm(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},yI=e=>e>=1&&e<=5,ab=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Fm(t,"UTC")},gn=e=>{let t=e.from??new Date,r=Fm(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return bl(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=bl(r,e.timeZone,o,0),s=Fm(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?bl(ab(r),e.timeZone,o,0):n;if(!i&&yI(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=ab(a),yI(a.weekday))return bl(a,e.timeZone,o,0);return bl(ab(r),e.timeZone,o,0)}});var SI,cb,Tr,db=l(()=>{"use strict";SI=require("node:crypto");le();xt();lb();Om();cb=!1,Tr=async e=>{if(cb)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=Im(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};cb=!0;let n=(0,SI.randomUUID)();try{let s=await ks(t,"claude-cli",o.prompt);await $A(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=gn({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return Wm(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{cb=!1}}});var Um,PI=l(()=>{"use strict";le();db();Om();Um=async()=>{let e=$();if(e===null)return;let t=Rt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await Tr(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var _l=l(()=>{"use strict";Om();PI();db();lb()});var AI=l(()=>{"use strict";_l()});var bI=l(()=>{"use strict";OA()});var _I=l(()=>{"use strict";bI()});var ub=l(()=>{"use strict";_l()});var ZJ,QJ,wl,pb=l(()=>{"use strict";AI();_I();ub();je();ZJ=e=>e!==void 0&&e.trim().length>0?O(e.trim()):O(),QJ=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??gn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??gn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},wl=e=>{let t=ZJ(e.profileEmail),r=Rt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Is(s);return i!==null?[QJ(i,o.get(i.id))]:[]});return xm(t,n),{ok:!0,writtenCount:n.length}}});var mb=l(()=>{"use strict";_l()});var wI=l(()=>{"use strict";le()});var vI=l(()=>{"use strict";pb();mb();ub();wI()});var TI,vl,Tl,kl,kI=l(()=>{"use strict";TI=g(require("node:os"));vI();pl();ml();vl=e=>{if(!_r(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!dn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=wl({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Tl=async e=>{if(!_r(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:dn(t)?Tr(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},kl=()=>{let e=$(),t=e!==null?Rt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:TI.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var gb=l(()=>{"use strict";kI()});var Bm=l(()=>{"use strict";re()});var Gm=l(()=>{"use strict";re()});var Vm,LI,EI,CI,e6,t6,Ms,fb=l(()=>{"use strict";Vm=g(require("node:fs")),LI=g(require("node:os")),EI=g(require("node:path"));Bm();Gm();Ya();je();CI=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},e6=e=>EI.default.join(LI.default.homedir(),"Library","LaunchAgents",`${e}.plist`),t6=async e=>Vm.default.existsSync(e6(e))?(await De(e)).ok:!1,Ms=async(e=C())=>{let t=Vm.default.existsSync(Xp(e)),r=!Vm.default.existsSync(qt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Xa(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await CI(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${fe(e)}-wake`;await t6(i)&&s.push(i);for(let c of se(e))(await De(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await CI(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var RI=l(()=>{"use strict";re()});var hb=l(()=>{"use strict";tn();re()});var yb=l(()=>{"use strict";tn()});var Sb=l(()=>{"use strict";re()});var WI,xI,Cl,Pb=l(()=>{"use strict";WI=g(require("node:fs"));ht();Bm();Gm();je();xI=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},Cl=async(e=C())=>{if(!WI.default.existsSync(qt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await xI())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of se(e))(await De(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await xI();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var II=l(()=>{"use strict";re()});var OI,fn,Ab,r6,o6,n6,MI,s6,NI,Ns,qm=l(()=>{"use strict";OI=require("node:crypto"),fn=g(require("node:fs")),Ab=g(require("node:path"));je();r6="watchdog-log.ndjson",o6=200,n6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),MI=(e=C())=>{let t=O(),r=t.installDir===e?t.logsDir:zo({installDir:e,profileEmail:t.profileEmail});return Ab.default.join(r,r6)},s6=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!n6(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},NI=(e,t=C())=>{let r={id:(0,OI.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=MI(t);fn.default.mkdirSync(Ab.default.dirname(o),{recursive:!0});let n=fn.default.existsSync(o)?fn.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-o6+1)),JSON.stringify(r)];return fn.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Ns=(e=20,t=C())=>{let r=MI(t);if(!fn.default.existsSync(r))return[];let o=fn.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=s6(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var bb,_b,wb,vb=l(()=>{"use strict";Le();bb=Bi.watchdogReinstallState,_b=900*1e3,wb=3e3});var DI=l(()=>{"use strict";vb()});var jI={};ft(jI,{verifyAgentWitchReviveAfterKickstart:()=>a6});var i6,a6,zI=l(()=>{"use strict";DI();yb();Sb();je();i6=e=>new Promise(t=>{setTimeout(t,e)}),a6=async e=>{if(await i6(e.verifyDelayMs??wb),!await Ho(e.launchAgentLabel))return!1;let r=e.profileEmail===null?O():O(e.profileEmail),o=Se(r);return!Re(o,e.staleAfterMs)}});var Ll,Tb,l6,$I,HI,kb,Cb,Lb=l(()=>{"use strict";Ll=g(require("node:fs")),Tb=g(require("node:path"));B();vb();l6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$I=e=>Tb.default.join(e,bb),HI=(e=C())=>{let t=$I(e);if(!Ll.default.existsSync(t))return null;try{let r=JSON.parse(Ll.default.readFileSync(t,"utf8"));return!l6(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},kb=(e=C(),t=Date.now())=>{let r=HI(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=_b:!0},Cb=(e=C(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=$I(e);return Ll.default.mkdirSync(Tb.default.dirname(o),{recursive:!0}),Ll.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var Eb,FI=l(()=>{"use strict";re();Lb();Eb=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!kb())return{attempted:!1,ok:!1,targets:e};Cb();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await De(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var UI=l(()=>{"use strict";Lb();FI()});var Rb=l(()=>{"use strict";Xt()});var BI=l(()=>{"use strict";Xt()});var GI,Ds,VI,qI,KI,c6,d6,JI,u6,p6,XI,YI=l(()=>{"use strict";GI=require("node:child_process"),Ds=g(require("node:fs")),VI=g(require("node:os")),qI=g(require("node:path")),KI=require("node:util");Rb();BI();je();c6=(0,KI.promisify)(GI.execFile),d6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),JI=e=>{let t=Ne(e),r=t===null?O():O(t);if(!Ds.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Ds.default.readFileSync(r.configPath,"utf8"));return!d6(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},u6=e=>JI(e)?.wsUrl??null,p6=e=>{let t=u6(e);return t!==null?Ee(t):ze(e)?.appOrigin??null},XI=async e=>{let t=e?.installDir??C(),r=JI(t),o=r!==null?Ee(r.wsUrl):p6(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=qI.default.join(VI.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Ds.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??Ne(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await c6("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Ds.default.existsSync(i)&&Ds.default.unlinkSync(i)}}});var ZI={};ft(ZI,{attemptAgentWitchWatchdogReinstall:()=>m6});var m6,QI=l(()=>{"use strict";UI();YI();m6=async e=>Eb(e,()=>XI())});var eO,tO,rO,g6,f6,h6,El,xb=l(()=>{"use strict";RI();hb();yb();Sb();Pb();fb();Bm();Gm();je();gs();II();qm();eO=e=>e===null?O():O(e),tO=async(e,t,r)=>{if(!await Ho(e))return"not_running";let n=eO(t);if(Ct(n))return"healthy";let s=Se(n);return Re(s,r)?"stale_connection":"healthy"},rO=async e=>{let t=e?.staleAfterMs??12e4,r=C(),o=se(r);return Promise.all(o.map(async n=>{let s=await tO(n.launchAgentLabel,n.profileEmail,t),i=eO(n.profileEmail),a=Se(i),c=await Ho(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Re(a,t),needsRevive:s!=="healthy",reason:s}}))},g6=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},f6=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",h6=async e=>{let t=await De(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(zI(),jI)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},El=async e=>{if(!kt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=C();await Ms(r),await Cl(r);let o=se(r),n=[];for(let u of o){let m=await tO(u.launchAgentLabel,u.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:m});continue}n.push(await h6({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let u=$o();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(QI(),ZI)),m=await u(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&NI({event:f6(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:g6(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var oO,Km,nO=l(()=>{"use strict";oO=g(require("node:os"));hb();qm();xb();Km=async()=>{let e=await rO(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:oO.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Ns(1)[0]??null}}});var Wb=l(()=>{"use strict";fb();xb();nO();qm()});var Rl,xl,Wl,sO=l(()=>{"use strict";re();Wb();Rl=async()=>{await Ms();let e=se(),t=[];for(let r of e){let o=await De(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=$o();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},xl=El,Wl=El});var Ib=l(()=>{"use strict";sO()});var Xm,Jm,iO,Ob,aO,y6,S6,P6,A6,b6,Ym,lO=l(()=>{"use strict";Xm=require("node:child_process"),Jm=g(require("node:fs")),iO=g(require("node:os")),Ob=g(require("node:path")),aO=require("node:util");re();B();y6=(0,aO.promisify)(Xm.execFile),S6=()=>Ob.default.join(iO.default.homedir(),"Library","LaunchAgents"),P6=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await y6("launchctl",["bootout",r]).catch(()=>{})},A6=e=>{let t=Ob.default.join(S6(),`${e}.plist`);Jm.default.existsSync(t)&&Jm.default.unlinkSync(t)},b6=e=>{(0,Xm.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Ym=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=C();if(!Jm.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=fr(e);for(let r of t)await P6(r),A6(r);return b6(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var cO,Zm,dO,js,uO,_6,w6,v6,Mb,T6,Nb,pO=l(()=>{"use strict";cO=require("node:child_process"),Zm=g(require("node:fs")),dO=g(require("node:os")),js=g(require("node:path")),uO=require("node:util");re();_6=(0,uO.promisify)(cO.execFile),w6=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],v6=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],Mb=e=>{Zm.default.existsSync(e)&&Zm.default.rmSync(e,{force:!0})},T6=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await _6("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},Nb=async e=>{let r=(e.listLaunchAgentLabels??fr)(e.layout.installDir),o=e.launchAgentsDir??js.default.join(dO.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??T6;for(let i of r)await n(i),Mb(js.default.join(o,`${i}.plist`));let s=js.default.dirname(e.layout.configPath);for(let i of w6)Mb(js.default.join(s,i));for(let i of v6)Mb(js.default.join(e.layout.installDir,i));return Zm.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var Db,mO=l(()=>{"use strict";Db="unknown_identity"});var jb=l(()=>{"use strict";rb();mO()});var k6,zb,gO=l(()=>{"use strict";jb();k6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zb=e=>e.type!=="system.error"||!k6(e.payload)?!1:e.payload.errorCode===Db});var $b=l(()=>{"use strict";lO();pO();gO()});var Qm=l(()=>{"use strict";re();Xt();$b();Wb()});var zs,eg,tg=l(()=>{"use strict";Qm();zs=(e=20)=>Ns(e),eg=Km});var rg,$s,og,ng=l(()=>{"use strict";Qm();rg=Qo,$s=(e=20)=>Xo(e),og=e=>Zo(e)});var sg,Hb=l(()=>{"use strict";Qm();sg=()=>Ym()});var fO=l(()=>{"use strict";GP();IA();gb();Ib();tg();ng();Hb()});var hO={};ft(hO,{buildAgentWitchAutomationStatusFromWakeServer:()=>kl,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>rg,buildAgentWitchWakeHealthResponse:()=>Qa,buildAgentWitchWakeIdentityResponse:()=>el,buildAgentWitchWatchdogStatus:()=>eg,installHarnessFromWakeServer:()=>gl,readAgentWitchSelfUpdateLogEntries:()=>$s,readAgentWitchWatchdogLogEntries:()=>zs,restartAgentWitchFromWakeServer:()=>Wl,reviveAgentWitchWebSocketFromWakeServer:()=>xl,runAgentWitchSelfUpdateFromWakeServer:()=>og,runAgentWitchUninstallLocalFromWakeServer:()=>sg,runAutomationFromWakeServer:()=>Tl,syncAutomationsFromWakeServer:()=>vl,wakeAgentWitchLaunchAgents:()=>Rl});var yO=l(()=>{"use strict";fO()});var SO,PO,Fb,Ub,AO=l(()=>{"use strict";SO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),PO=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?SO(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?SO(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Fb=e=>{let t=e.watchdogLogs.map(PO).join(""),r=e.updateLogs.map(PO).join("");return`<!doctype html>
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
</html>`},Ub=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var bO,_O,wO=l(()=>{"use strict";bO=g(require("node:net")),_O=()=>new Promise((e,t)=>{let r=bO.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var vO,C6,L6,Bb,TO=l(()=>{"use strict";vO=g(require("node:net"));re();wO();Za();Ya();je();C6=e=>new Promise(t=>{let r=vO.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),L6=e=>new Promise(t=>{setTimeout(t,e)}),Bb=async(e={})=>{let t=C(),r=Et(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await C6(r))return fW(r),r;i<o&&await L6(n)}let s=await _O();Yp(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{vS({launchAgentPrefix:fe(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var E6,Gb,kO=l(()=>{"use strict";E6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Gb=e=>({force:E6(e)&&e.force===!0})});var Il=l(()=>{"use strict";pl();AO();TO();kO();TS();fp();Vo()});var Vb,z,qb,Kb,Ol,CO=l(()=>{"use strict";Vb=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},z=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},qb=e=>{e.writeHead(403),e.end()},Kb=e=>e.url?.split("?")[0]??"/",Ol=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var Wt=l(()=>{"use strict";CO()});var R6,LO,EO=l(()=>{"use strict";gb();Wt();R6=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},LO=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return z(e.response,200,kl(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await R6(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=vl(t);return z(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Tl(t);return z(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var x6,xO,RO,WO,Jb,IO,Xb=l(()=>{"use strict";x6=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],xO=e=>/embed|minilm|^bge-/i.test(e),RO=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),WO=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),Jb=e=>e.filter(t=>t.trim().length>0&&!xO(t)),IO=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!xO(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>RO(s,o));if(n!==void 0)return n}for(let n of x6){let s=r.find(i=>RO(i,n));if(s!==void 0)return s}return r[0]??null}});var Yb,NO,DO,ig,jO,OO,MO,W6,I6,O6,M6,N6,D6,It,Ml=l(()=>{"use strict";Yb=require("node:child_process"),NO=g(require("node:fs")),DO=g(require("node:os")),ig=g(require("node:path"));Xt();Lt();Xb();jO=3e3,OO=["claude-cli","codex","cursor","antigravity"],MO={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},W6=(e,t)=>new Promise(r=>{let o=(0,Yb.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},jO);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),I6=()=>{let e=DO.default.homedir();return["ollama",ig.default.join(e,".local","bin","ollama"),ig.default.join(e,".agent-witch","ollama","ollama"),ig.default.join(e,".local-agent-witch","ollama","ollama")]},O6=e=>new Promise(t=>{let r=(0,Yb.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},jO);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(WO(Buffer.concat(o).toString("utf8")))})}),M6=async()=>{for(let e of I6()){if(e!=="ollama"&&!NO.default.existsSync(e))continue;let t=await O6(e);if(t!==null)return t}return[]},N6=e=>{let t=e.installedWriterIds.map(s=>MO[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=he(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${MO[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},D6=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:fs},It=async e=>{let t=OO.map(i=>{let a=Np(i,e.commands);return W6(a.command,a.args)}),[r,...o]=await Promise.all([M6(),...t]),n=OO.flatMap((i,a)=>o[a]===!0?[i]:[]),s=IO(r,D6());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:N6({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var j6,z6,Zb,zO=l(()=>{"use strict";j6="http://127.0.0.1:11434",z6=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Zb=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||j6;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?z6(await o.json()):null}catch{return null}}});var Qb=l(()=>{"use strict";Lt();Ml();zO();Xb()});var $6,$O,HO=l(()=>{"use strict";Qb();$6={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},$O=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:$6[t]})),ollamaModels:Jb(e.ollamaModels)})});var H6,FO,UO=l(()=>{"use strict";Qb();Wt();HO();H6=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},FO=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await It({commands:ye({})});return z(e.response,200,{ok:!0,...$O({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await H6(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await Zb({model:r,prompt:o});return n===null?(z(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(z(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var F6,BO,GO=l(()=>{"use strict";IA();Wt();F6=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},BO=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await F6(e);if(t===null)return!0;let r=gl(t);return z(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var VO=l(()=>{"use strict";xt()});var e_,qO=l(()=>{"use strict";VO();ml();e_=e=>{if(!_r(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:qe({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var KO,t_,r_=l(()=>{"use strict";le();xt();ml();KO=e=>{if(!_r(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},t_=async e=>{let t=KO(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=fo("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=$();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Y({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(qe({projectFolderPath:r}),await Al(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var JO=l(()=>{"use strict";qO();r_()});var XO,YO=l(()=>{"use strict";JO();r_();Wt();XO=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=e_(t);return z(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await t_(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return z(e.response,o,r,e.cors.headers),!0}return!1}});var ZO,QO=l(()=>{"use strict";Il();ng();tg();ZO=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=zs(50),r=$s(50);return e.response.writeHead(200,Ub()),e.response.end(Fb({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var eM,tM=l(()=>{"use strict";GP();Wt();eM=e=>e.request.method==="GET"&&e.pathname==="/health"?(z(e.response,200,Qa(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(z(e.response,200,el(),e.cors.headers),!0):!1});var rM,oM=l(()=>{"use strict";Hb();Wt();rM=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await sg();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}});var nM,sM=l(()=>{"use strict";Ib();Wt();nM=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await xl();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Wl();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Rl();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var iM,aM=l(()=>{"use strict";Il();ng();Wt();iM=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=rg();return z(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Ol(e.request,"/update/logs",20,200);return z(e.response,200,{ok:!0,logs:$s(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=Gb(t),o=await og({force:r});return z(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var lM,cM=l(()=>{"use strict";tg();Wt();lM=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await eg();return z(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Ol(e.request,"/watchdog/logs",20,200);return z(e.response,200,{ok:!0,logs:zs(t)},e.cors.headers),!0}return!1}});var dM,uM=l(()=>{"use strict";EO();UO();GO();YO();QO();tM();oM();sM();aM();cM();dM=[eM,ZO,lM,nM,iM,rM,BO,XO,LO,FO]});var pM,mM=l(()=>{"use strict";uM();pM=async e=>{for(let t of dM)if(await t(e))return!0;return!1}});var U6,gM,fM=l(()=>{"use strict";pl();Wt();mM();U6=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:Kb(e),readJsonBody:()=>Vb(e)}),gM=async(e,t,r)=>{let o=e.headers.origin,n=Lm(o);try{if(o!==void 0&&o.length>0&&!n.allowed){qb(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=U6(e,t,r,n);if(await pM(s))return;z(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{z(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var hM,hn,ag,lg=l(()=>{"use strict";hM=g(require("node:http"));Il();fM();hn=async()=>{let e=await Bb(),t=hM.default.createServer((r,o)=>{gM(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},ag=hn});var yM={};ft(yM,{runAgentWitchBridgeCli:()=>B6});var B6,SM=l(()=>{"use strict";re();lg();B6=async()=>{nt("agent-witch-bridge");let e=await hn(),t=yr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var PM=l(()=>{"use strict";ht()});var Hs,o_,AM=l(()=>{"use strict";Hs=(e,t,r)=>e===1?t:r,o_=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Hs(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Hs(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Hs(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Hs(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Hs(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${Hs(u,"year","years")} ago`}});var yn,n_,G6,V6,s_,ho,Nl,i_,bM=l(()=>{"use strict";yn=g(require("node:fs")),n_=g(require("node:path")),G6="local-ws-traffic.ndjson",V6=500,s_=e=>n_.default.join(e.logsDir,G6),ho=(e,t)=>{let r=s_(e);yn.default.mkdirSync(n_.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});yn.default.appendFileSync(r,`${o}
`,"utf8")},Nl=(e,t=V6)=>{let r=s_(e);if(!yn.default.existsSync(r))return[];let n=yn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},i_=e=>{let t=s_(e);yn.default.existsSync(t)&&yn.default.writeFileSync(t,"","utf8")}});var q6,_M,wM,vM=l(()=>{"use strict";jb();q6=new Set(Object.values(jm)),_M=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wM=e=>{if(!_M(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!q6.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!_M(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var TM,kM=l(()=>{"use strict";TM=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var K6,J6,X6,Dl,CM=l(()=>{"use strict";kM();K6=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,J6=e=>K6.test(e),X6=e=>TM(e),Dl=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Dl(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&J6(o)){r[o]=X6(n);continue}r[o]=Dl(n)}return r}});var rr,a_,Y6,Z6,Q6,l_,LM,EM,RM,e7,cg,Sn,dg,c_,xM=l(()=>{"use strict";rr=g(require("node:fs")),a_=g(require("node:path"));vM();CM();Y6="local-ws-trace.ndjson",Z6=1e4,Q6=1440*60*1e3,l_=e=>a_.default.join(e.logsDir,Y6),LM=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},EM=e=>{if(!rr.default.existsSync(e))return;let t=rr.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-Q6,n=t.filter(s=>{let i=LM(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-Z6);rr.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},RM=(e,t)=>{let r=l_(e);rr.default.mkdirSync(a_.default.dirname(r),{recursive:!0}),rr.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),EM(r)},e7=e=>e.parsed===null?{_empty:!0}:Dl(e.parsed),cg=(e,t,r)=>{let o=wM(r);RM(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:e7(o)})},Sn=(e,t)=>{RM(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Dl({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},dg=(e,t=80)=>{let r=l_(e);if(EM(r),!rr.default.existsSync(r))return[];let o=rr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=LM(s);i!==null&&n.push(i)}return n.reverse()},c_=e=>{let t=l_(e);rr.default.existsSync(t)&&rr.default.writeFileSync(t,"","utf8")}});var yo,WM,t7,d_,ug,IM=l(()=>{"use strict";yo=g(require("node:fs")),WM=g(require("node:path")),t7=256e3,d_=e=>{yo.default.mkdirSync(WM.default.dirname(e),{recursive:!0}),yo.default.writeFileSync(e,"","utf8")},ug=(e,t=t7)=>{if(!yo.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=yo.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=yo.default.openSync(e,"r");try{yo.default.readSync(a,i,0,s,n)}finally{yo.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var jl=l(()=>{"use strict";bM();xM();IM()});var u_,p_,OM=l(()=>{"use strict";u_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p_=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${u_(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${u_(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
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
    </section>`}});var MM=l(()=>{"use strict";OM()});var m_,g_=l(()=>{"use strict";m_=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var f_=l(()=>{"use strict";Oa()});var h_,y_,NM=l(()=>{"use strict";f_();h_=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},y_=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var DM=l(()=>{"use strict";g_();NM()});var jM,zl,S_,$l=l(()=>{"use strict";g_();jM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zl=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=jM(e),r=jM(m_(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},S_=`(function () {
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
})();`});var Pn,r7,P_,zM=l(()=>{"use strict";Pn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),r7=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},P_=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Pn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Pn(r.direction):Pn(r.kind),i=`trace-body-${o}`,a=Pn(r7(r.body));return`<tr>
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
    </section>`});var HM,o7,$M,A_,FM=l(()=>{"use strict";Le();ht();HM=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},o7=e=>HM(e)===gr?es:Qn,$M=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),A_=e=>{let t=o7(e.installDir),o=`AW_HOME="$HOME/${HM(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${$M(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${$M(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var UM=l(()=>{"use strict";$l();zM();FM();$l()});var n7,kr,Hl=l(()=>{"use strict";n7=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),kr=n7});var BM,GM,VM,qM,KM,JM,XM,Fs=l(()=>{"use strict";BM="projects",GM="knowledge",VM="chunks.ndjson",qM="lessons.ndjson",KM="error-chunks.ndjson",JM="usage-stats.json",XM="knowledge-location.json"});var pg,s7,mg,b_=l(()=>{"use strict";pg=g(require("node:path"));Fs();s7=(e,t)=>{let r=t.trim(),o=pg.default.join(e.installDir,BM,r,GM);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:pg.default.join(o,VM),memoryRunsFilePath:pg.default.join(o,qM)}},mg=s7});var __,i7,YM,ZM=l(()=>{"use strict";__=g(require("node:fs"));Fs();ln();i7=e=>{let t=yt(e.projectFolderPath),r=`${t.metaDirPath}/${XM}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};__.default.mkdirSync(t.metaDirPath,{recursive:!0}),__.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},YM=i7});var Us,eN,QM,a7,tN,rN=l(()=>{"use strict";Us=g(require("node:fs")),eN=g(require("node:path"));Bo();ln();b_();ZM();QM=(e,t)=>{Us.default.existsSync(e)&&(Us.default.existsSync(t)&&Us.default.statSync(t).size>0||(Us.default.mkdirSync(eN.default.dirname(t),{recursive:!0}),Us.default.copyFileSync(e,t)))},a7=e=>{let t=yt(e.projectFolderPath),r=mg(e.layout,e.projectId),o=`${t.memoryDirPath}/${ls}`;QM(t.ragChunksFilePath,r.ragChunksFilePath),QM(o,r.memoryRunsFilePath),YM({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},tN=a7});var oN,l7,Bs,gg=l(()=>{"use strict";oN=g(require("node:path"));Bo();ln();rN();qA();b_();l7=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=Mm(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){tN({layout:e.layout,projectFolderPath:t,projectId:o});let s=mg(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=yt(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:oN.default.join(n.memoryDirPath,ls),projectId:null}},Bs=l7});var fg,d7,hg,w_=l(()=>{"use strict";fg=g(require("node:fs"));Fs();d7=(e,t=500)=>{if(!fg.default.existsSync(e))return;let r=fg.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);fg.default.writeFileSync(e,`${o.join(`
`)}
`)},hg=d7});var yg,u7,An,v_=l(()=>{"use strict";yg=g(require("node:path"));Fs();gg();u7=e=>{let t=Bs(e);if(t===null)return null;let r=yg.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:yg.default.join(r,JM),errorChunksFilePath:yg.default.join(r,KM)}},An=u7});var sN,Fl,iN,nN,T_,aN,g7,k_,lN,C_,L_,E_,R_=l(()=>{"use strict";sN=require("node:crypto"),Fl=g(require("node:fs")),iN=g(require("node:path"));Hl();Fs();v_();nN=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),T_=e=>{if(!Fl.default.existsSync(e))return nN();try{let t=JSON.parse(Fl.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return nN()},aN=(e,t)=>{Fl.default.mkdirSync(iN.default.dirname(e),{recursive:!0}),Fl.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},g7=e=>{let t=kr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,sN.createHash)("sha256").update(o).digest("hex").slice(0,16)},k_=e=>{let t=An(e);return t===null?null:T_(t.usageStatsFilePath)},lN=e=>{if(e.chunkIds.length===0)return;let t=An(e);if(t===null)return;let r=T_(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;aN(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},C_=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=An(e);if(r===null)return null;let o=g7(t),n=T_(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return aN(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},L_=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,E_=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var Ul,cN,f7,h7,dN,y7,x_,Bl,Gs,W_,Vs,I_,O_=l(()=>{"use strict";Ul=g(require("node:fs")),cN=g(require("node:path"));Hl();gg();w_();R_();f7="http://127.0.0.1:11434",h7="nomic-embed-text",dN=(e,t,r)=>Bs({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,y7=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},x_=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},Bl=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||f7,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||h7;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},Gs=(e,t,r)=>{let o=dN(e,t,r);if(o===null||!Ul.default.existsSync(o))return[];let n=Ul.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},W_=async e=>{let t=kr(e.text),r=x_(t);if(r.length===0)return 0;let o=dN(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;Ul.default.mkdirSync(cN.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await Bl(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Ul.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return hg(o),n},Vs=async e=>{let t=await Bl(e.query);if(t===null)return[];let r=e.minScore??0,s=Gs(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:y7(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return lN({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},I_=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Gl,uN,S7,P7,M_,N_,D_,pN=l(()=>{"use strict";Gl=g(require("node:fs")),uN=g(require("node:path"));Hl();v_();w_();O_();S7=e=>{if(!Gl.default.existsSync(e))return[];let t=Gl.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},P7=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},M_=async e=>{let t=An(e);if(t===null)return 0;let r=kr(e.text),o=x_(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;Gl.default.mkdirSync(uN.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await Bl(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};Gl.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return hg(n,200),s},N_=async e=>{let t=An(e);if(t===null)return[];let r=await Bl(e.query);if(r===null)return[];let o=e.minScore??.3;return S7(t.errorChunksFilePath).map(s=>({chunk:s,score:P7(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},D_=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var j_=l(()=>{"use strict";O_();R_();pN()});var be,z_,$_=l(()=>{"use strict";tb();be=eb,z_=`
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
`.trim()});var A7,b7,H_,mN,F_,gN=l(()=>{"use strict";$_();$l();A7=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,b7=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],H_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mN=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${A7}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,F_=e=>{let t=b7.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=H_(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=H_(e.installBundleVersionLabel?.trim()??"unknown"),s=mN("brand brand-in-sidebar",n),i=mN("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${H_(e.title)} \xB7 Agent Witch Local</title>
  <style>${z_}</style>
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
</html>`}});var Sg,Vl,Pg=l(()=>{"use strict";Sg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vl=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Sg(e.syncMessage)}</p>`:"",o=Sg(e.manageHref),n=Sg(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Sg(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var U_,B_,G_,fN=l(()=>{"use strict";U_=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,B_=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,G_=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var hN=l(()=>{"use strict";gN();Pg();fN()});var qs,V_,yN=l(()=>{"use strict";$l();qs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),V_=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${qs(e.wakeError)}</div>`:"",a=zl(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${qs(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${qs(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${qs(o)}</p>
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
        <p class="home-card-meta">${qs(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${qs(n)}</p>
      </a>
    </div>`}});var SN=l(()=>{"use strict";yN()});var E,Ks=l(()=>{"use strict";E=e=>e==="passed"||e==="stopped"||e==="failed"});var PN,q_,bn,K_,Ag=l(()=>{"use strict";PN="Stopped at the round limit. The best prompt is kept.",q_="Stopped because the score stopped rising. The best prompt is kept.",bn="Finished. The best prompt is the result.",K_="Wizard ended. Progress from finished steps is kept."});var So,J_=l(()=>{"use strict";So=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var _7,w7,ql,AN,bg=l(()=>{"use strict";_7=/\n+|;\s+/,w7=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,ql=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(_7).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,w7(s)]},[]);return[...t,...o]},[]),AN=e=>{let t=ql(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ce,Js=l(()=>{"use strict";ce=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Kl,X_=l(()=>{"use strict";bg();Js();Kl=e=>{let t=[...e.priorRounds,e.current],r=ce(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:AN(o)}}});var Y_,v7,T7,_g,Z_=l(()=>{"use strict";Y_={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},v7=e=>{try{let t=JSON.parse(e.fragment);return{...Y_,objects:[...e.objects,t]}}catch{return{...Y_,objects:e.objects}}},T7=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:v7(r)},_g=e=>[...e].reduce(T7,Y_).objects});var k7,Q_,C7,bN,ew=l(()=>{"use strict";Z_();k7=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},Q_=e=>{let t=_g(e).filter(k7),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},C7=(e,t)=>({...e,passed:e.score>=t}),bN=(e,t)=>{let r=Q_(e);return r===null?null:C7(r,t)}});var tw,rw,wg=l(()=>{"use strict";tw="The judge reply needs a score and a reason.",rw="The improver reply was empty."});var _N,wN=l(()=>{"use strict";_N=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var vN,TN=l(()=>{"use strict";vN=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var E7,kN,CN=l(()=>{"use strict";wN();TN();Ag();bg();E7=e=>{let t=ql(e);return t.length===0?q_:`${q_} Avoid: ${t.join("; ")}.`},kN=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:PN};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(_N(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:E7(vN(r))}}return null}});var Po,R7,_n,LN,vg=l(()=>{"use strict";Po=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},R7=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,_n=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",R7(e.tokens),`Delay: ${Po(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},LN=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var x7,EN,RN=l(()=>{"use strict";ew();x7=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,EN=e=>{let r=(x7.exec(e)?.[1]??e).trim();return r.length===0||Q_(r)!==null?null:r}});var xN,Tg,WN=l(()=>{"use strict";vg();RN();wg();xN=e=>({type:"call",role:"judge",choice:e.choice,prompt:LN({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),Tg=e=>{let t=EN(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:rw}}:{nextPrompt:t,continuation:xN({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var ow,IN=l(()=>{"use strict";J_();X_();ew();wg();Ag();CN();wg();WN();ow=e=>{let t=bN(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:tw}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=kN({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=Kl({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:So({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var Jl,nw=l(()=>{"use strict";Jl=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var ON=l(()=>{"use strict"});var MN=l(()=>{"use strict";ON()});var wn,NN=l(()=>{"use strict";wn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var W7,sw,DN=l(()=>{"use strict";vg();W7=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,sw=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",W7(e.tokens),`Delay: ${Po(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var I7,O7,M7,iw,jN=l(()=>{"use strict";I7=/[A-Za-z0-9_./~-]{3,180}/g,O7=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,M7=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||O7.test(t)},iw=(e,t=12)=>{let r=[];for(let o of e.matchAll(I7)){let n=o[0].replace(/\.+$/,"");if(!(!M7(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var Xl,zN=l(()=>{"use strict";Xl=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var kg,aw,$N,Yl,lw=l(()=>{"use strict";kg=e=>Math.floor(e/2),aw=e=>Math.max(kg(e)+1,e-20),$N=(e,t)=>e>=t?"passes":e>=aw(t)?"close":e>=kg(t)?"weak":"bad",Yl=e=>[{band:"bad",label:`0\u2013${kg(e)-1} bad`},{band:"weak",label:`${kg(e)}\u2013${aw(e)-1} weak`},{band:"close",label:`${aw(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var Cg,cw=l(()=>{"use strict";lw();Cg=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${$N(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var Ot,dw=l(()=>{"use strict";Ot=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var HN,FN=l(()=>{"use strict";HN=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var N7,D7,UN,BN=l(()=>{"use strict";Ks();cw();dw();FN();N7=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],D7=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",UN=e=>{let t=e.wizard;if(t===void 0)return[];let r=Ot(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=N7.map((h,y)=>{let p=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:h,state:p,detail:null}}).filter((h,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=Cg(e),d=c.filter(h=>h.id==="round-0"),u=HN(t)&&(!n||a)?c.filter(h=>h.id!=="round-0"):[],m=E(e.status)&&!s,S=m?[{id:"end",label:D7(e),state:"done",detail:e.errorMessage}]:[];if(m&&S.length>0){let h=Math.min(r,i.length),y=i.slice(0,h).map(p=>({...p,state:"done"}));return[...d,...y,...S,...u]}return[...d,...i,...u,...S]}});var j7,uw,GN=l(()=>{"use strict";Ks();cw();BN();j7=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",uw=e=>{if(e.wizard!==void 0)return UN(e);let t=Cg(e),r=E(e.status)?[{id:"end",label:j7(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var Zl,VN=l(()=>{"use strict";Zl=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var qN=l(()=>{"use strict";ht()});var KN,Ql,ec,Ys,Lg,pw,JN=l(()=>{"use strict";qN();KN="/prompt-optimizer/agent",Ql=`${Sr}${KN}`,ec=`${Sr}/prompt-optimizer`,Ys="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",Lg=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Ys}`,pw="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var or=l(()=>{"use strict"});var ie,tc=l(()=>{"use strict";or();ie=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var mw,XN=l(()=>{"use strict";mw="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var YN,ZN=l(()=>{"use strict";YN=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var rc,eD=l(()=>{"use strict";ZN();or();rc=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:YN(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var gw,tD=l(()=>{"use strict";or();gw=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var fw,rD=l(()=>{"use strict";or();fw=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var oD,oc,nD=l(()=>{"use strict";oD=["generalize","evaluate","separate","optimize_modules"],oc=(e,t)=>{let r=oD.indexOf(t);if(r===-1)return e;let o=oD.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var Eg,hw=l(()=>{"use strict";bg();Eg=e=>{let t=ql(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var nc,sD=l(()=>{"use strict";hw();nc=e=>{let t=Eg(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var $7,H7,F7,iD,aD=l(()=>{"use strict";$7=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),H7=/^\{\{[a-zA-Z0-9_-]+\}\}$/,F7=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp($7(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},iD=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>H7.test(n)?n:F7(n,r)).join("")}});var yw,lD=l(()=>{"use strict";aD();yw=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:iD(o.prompt,t)}))}))});var U7,sc,cD=l(()=>{"use strict";or();hw();U7=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),sc=e=>{let t=Eg(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=U7(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var ic,dD=l(()=>{"use strict";nw();ic=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return Jl({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var ac,Pw=l(()=>{"use strict";Js();ac=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ce(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var Aw,uD=l(()=>{"use strict";Pw();Aw=e=>{let t=ac({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var vn,pD=l(()=>{"use strict";vn=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var B7,G7,oe,Rg=l(()=>{"use strict";tc();B7=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},G7=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,oe=e=>{let t=ie(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:B7(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>G7(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var mD,gD=l(()=>{"use strict";tc();Rg();mD=e=>{let t=oe(e.wizard),r=ie(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var bw,fD=l(()=>{"use strict";gD();bw=e=>{let t=mD({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var V7,hD,yD=l(()=>{"use strict";V7=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},hD=e=>[...e].reduce(V7,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var q7,SD,PD=l(()=>{"use strict";q7=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},SD=e=>[...e].reduce(q7,{out:"",inString:!1,escaped:!1}).out});var K7,J7,AD,bD=l(()=>{"use strict";yD();PD();K7=e=>e.charCodeAt(0)===65279?e.slice(1):e,J7=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},AD=e=>SD(hD(J7(K7(e))))});var X7,Y7,Z7,_D,Q7,Zs,xg=l(()=>{"use strict";Z_();bD();X7=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},Y7=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},Z7=e=>[...e].reduce(Y7,{out:"",inString:!1,escaped:!1}).out,_D=e=>{let t=_g(e);return t.length===0?null:t[t.length-1]},Q7=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Zs=e=>{let t=AD(X7(e)),r=_D(t);if(r!==null)return r;let o=Z7(t),n=_D(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw Q7(i)}}});var e9,t9,_w,wD,vD=l(()=>{"use strict";e9=/^[a-z0-9][a-z0-9-]{0,62}$/,t9=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return e9.test(t)?t:""},_w=e=>e.replace(/\s+/gu," ").trim(),wD=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=t9(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=_w(n.name),a=_w(n.description),c=_w(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var TD,kD,CD=l(()=>{"use strict";TD=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},kD=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var ww,LD=l(()=>{"use strict";xg();vD();CD();ww=(e,t)=>{let r=(()=>{try{return Zs(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(TD(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(kD).filter(a=>a!==null),i=wD({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var vw,ED=l(()=>{"use strict";vw=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var Tw,RD=l(()=>{"use strict";Tw=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var kw,xD=l(()=>{"use strict";tc();Rg();kw=e=>{let t=oe(e.wizard),r=ie(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var lc,WD=l(()=>{"use strict";lc=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var Mt,r9,Cw,ID=l(()=>{"use strict";Mt=g(ns());xg();r9=(0,Mt.isType)({name:Mt.isNonEmptyString,description:Mt.isString,sampleValue:Mt.isString}),Cw=e=>{let t=Zs(e);if(!(0,Mt.isType)({templatedPrompt:Mt.isNonEmptyString,variables:(0,Mt.isArrayWithEachItem)(r9)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var de,o9,n9,Lw,OD=l(()=>{"use strict";de=g(ns());or();xg();o9=(0,de.isType)({id:de.isNonEmptyString,title:de.isNonEmptyString,prompt:de.isNonEmptyString,order:de.isNumber}),n9=(0,de.isType)({id:de.isNonEmptyString,title:de.isNonEmptyString,summary:de.isString,topology:(0,de.isOneOf)("chain","parallel"),modules:(0,de.isArrayWithEachItem)(o9),recommended:de.isBoolean}),Lw=e=>{let t=Zs(e);if(!(0,de.isType)({options:(0,de.isArrayWithEachItem)(n9)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Qs,MD=l(()=>{"use strict";Qs=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var s9,Ew,Rw=l(()=>{"use strict";s9=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ew=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(s9,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Nt,Dt,ND=l(()=>{"use strict";Js();Rw();Nt=e=>Ew(e.templatedPrompt,e.variables),Dt=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ce(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Nt(e.wizard)}});var i9,Tn,DD=l(()=>{"use strict";i9=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Tn=(e,t)=>e.replace(i9,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var a9,kn,Wg=l(()=>{"use strict";a9=/\{\{([a-zA-Z0-9_-]+)\}\}/g,kn=e=>{let t=new Set,r=[];for(let o of e.matchAll(a9)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var cc,jD=l(()=>{"use strict";Wg();cc=e=>e.variables.length>0||kn(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var xw,Ww=l(()=>{"use strict";or();xw=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var dc,zD=l(()=>{"use strict";Js();Ww();dc=e=>{let t=e.wizard.evaluateSelectedRound??ce(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:xw(r.judgement,e.passScore)}});var uc,$D=l(()=>{"use strict";uc=e=>e.length===1&&e[0].modules.length===1});var Iw,HD=l(()=>{"use strict";Iw=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var _e,Ig,pc=l(()=>{"use strict";_e=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),Ig=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var FD,UD=l(()=>{"use strict";pc();FD=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[_e("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),_e("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[_e("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var BD,GD=l(()=>{"use strict";Ks();pc();BD=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!E(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[_e("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),_e("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),_e("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",Ig(e.writerLabel,e.folder)),_e("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[_e("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var VD,qD=l(()=>{"use strict";pc();VD=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[_e("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),_e("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[_e("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var KD,JD=l(()=>{"use strict";pc();KD=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[_e("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),_e("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",Ig(e.writerLabel,e.folder)),...r?[_e("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var Og,XD=l(()=>{"use strict";Ks();UD();GD();qD();JD();Og=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(E(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return BD(r);case"evaluate":return FD({...r,currentRound:e.currentRound});case"separate":return KD(r);case"optimize_modules":return VD({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var mc,Cr,YD=l(()=>{"use strict";mc=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),Cr=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var l9,Mg,Ow,ZD=l(()=>{"use strict";Wg();l9="wizardParam_",Mg=e=>`${l9}${e}`,Ow=e=>{let t=kn(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=Mg(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var ct,QD=l(()=>{"use strict";ct=["generalize","evaluate","separate","optimize_modules"]});var gc,Cn,ei,Lr=l(()=>{"use strict";gc="Stopped because the confirmed token or spend budget was exceeded.",Cn="Approaching the confirmed budget. Further trials may hard-stop.",ei="Confirm the Step 4 token and spend budget before optimizing modules."});var dt,ti=l(()=>{"use strict";dt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var zt,fc=l(()=>{"use strict";Lr();zt=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var c9,Er,hc=l(()=>{"use strict";Lr();c9={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},Er=e=>{let t=e?.trim()??"";return t.length===0?.01:c9[t]??.01}});var Ng,Mw=l(()=>{"use strict";Lr();hc();Ng=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=Er(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var ej,jg,Nw,Dw=l(()=>{"use strict";Lr();ti();fc();Mw();hc();ej=e=>{let t=Ng({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??Er(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:dt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},jg=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),Nw=e=>{let t=e.existing??zt(),r=ej({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return jg(t,r)}});var ri,yc,oj=l(()=>{"use strict";Lr();or();ti();fc();Dw();Mw();hc();ri=e=>{let t=Ng({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??Er(e.writerId),i=r*4e3,a=n*o*8e3,c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:dt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},yc=e=>{let t=e.existing??zt();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=ri({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return jg(t,r)}});var Rr,nj=l(()=>{"use strict";ti();Lr();fc();Rr=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??zt(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=dt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var zw,oi,sj=l(()=>{"use strict";Lr();ti();zw=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=dt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:gc,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:gc,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:Cn,costControls:{...t,softWarnFired:!0,softWarnMessage:Cn}}:null},oi=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var $w,ij=l(()=>{"use strict";$w=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var R=l(()=>{"use strict";Ks();Ag();IN();J_();vg();nw();MN();NN();DN();jN();X_();zN();Js();GN();dw();lw();VN();JN();or();tc();XN();eD();tD();rD();nD();sD();lD();cD();dD();Pw();uD();pD();Rg();fD();LD();ED();RD();xD();WD();ID();OD();MD();ND();Rw();DD();Wg();jD();zD();$D();Ww();HD();XD();YD();ZD();QD();Lr();ti();fc();Dw();oj();hc();nj();sj();ij()});var Hw=l(()=>{"use strict";za()});var d9,cj,dj=l(()=>{"use strict";Hw();d9=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,cj=e=>{let t=rn(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(d9)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var pj,u9,p9,nr,m9,g9,uj,$g,mj,f9,St,gj,fj,hj,$t=l(()=>{"use strict";Hw();dj();pj=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),u9=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,p9=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,nr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(u9.test(e.errorMessage))return"usage_limit";if(p9.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},m9="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",g9="The writer waited on terminal input and did not return a prompt.",uj=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,$g=e=>{let t=e.trim();if(t.length===0||t.length>=500||!uj.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>uj.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},mj=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},f9=e=>$g(e.stdout)??$g(e.stderr)??(mj(e.replyFile)?$g(e.replyFile):null),St=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return m9;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?g9:null},gj=e=>{let t=e.trim();return t.length===0?null:St(t)!==null?t:$g(t)??(mj(t)?t:null)},fj=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],hj=e=>{let t=e.replyFileText?.trim()??"",r=St([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=f9({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=nr({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=cj([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=rn(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var h9,Sj,yj,En,Hg=l(()=>{"use strict";$t();h9=400,Sj=(e,t=h9)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},yj=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:gj(e.promptText)},En=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:yj(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=yj(e.revisions[n]);if(s!==null)return s.trim()}return null}});var W,y9,Fg,ae,Rn,Aj,Pj,bj,_j,we=l(()=>{"use strict";W="manual",y9=["claude-cli","codex","cursor","antigravity"],Fg={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ae=e=>e===W?"You":e in Fg?Fg[e]:e,Rn=e=>y9.filter(t=>e.includes(t)),Aj=e=>{let t=Rn(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},Pj=(e,t)=>t===W?W:e.find(r=>r===t)??null,bj=(e,t,r)=>{let o=Rn(e),n=Pj(o,t),s=Pj(o,r);return n===null||s===null?null:{judge:n,improver:s}},_j=(e,t,r)=>{let o=Rn(e);return t===null||t.trim()===""?r!==W?r:o[0]??null:t===W?null:o.find(n=>n===t)??null}});var wj,Ug,Fw,xn,Uw,ut,xr,ue,Je=l(()=>{"use strict";wj=g(require("node:fs")),Ug=g(require("node:os")),Fw=g(require("node:path"));lo();xn="~",Uw=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,ut=e=>{let t=Ug.default.homedir(),r=Uw(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},xr=e=>{let t=e.trim().length===0?"~":e.trim(),r=He(t),o=Fw.default.isAbsolute(r)?Uw(r):Uw(Fw.default.resolve(Ug.default.homedir(),r));try{if(!wj.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:ut(o)}},ue=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Ug.default.homedir()});var Ze,Ao=l(()=>{"use strict";Ze='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var Bw,vj,S9,Tj,kj,Gw=l(()=>{"use strict";R();we();Je();Ao();Bw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vj=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',S9=e=>{let t=vj(e.state),r=`<h2>${Bw(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${Bw(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Ze}</button></div><template>${r}</template></li>`},Tj=e=>{let t=e.wizard;if(t===void 0)return"";let r=Og({status:e.status,wizard:t,writerLabel:ae(e.judgeModel),runnerLabel:ae(e.runnerModel??e.judgeModel),folderDisplay:ut(ue(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(S9).join("")}</ol>`},kj=e=>{let t=e.wizard;if(t===void 0)return"";let r=Og({status:e.status,wizard:t,writerLabel:ae(e.judgeModel),runnerLabel:ae(e.runnerModel??e.judgeModel),folderDisplay:ut(ue(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${vj(n.state)}<span class="sdlc-pipeline-label">${Bw(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var Ht,Cj,Lj,Ej,Vw=l(()=>{"use strict";R();Ht=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Cj="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",Lj=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Ht(Cj)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${Ht(i.name)}}}</strong> \u2014 ${Ht(i.description)} (sample: ${Ht(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Ht(r)}</pre>`,n=Nt(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Ht(n)}</pre>`;return`${t}${o}${s}`},Ej=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Ht(Cj)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${Ht(n.name)}}}</strong> \u2014 ${Ht(n.description)} (sample: ${Ht(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${Ht(r)}</pre>`;return`${t}${o}`}});var Sc,qw=l(()=>{"use strict";Sc=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var Rj,xj=l(()=>{"use strict";R();Rj=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=wn({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=_n({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var Kw,Pc,Jw=l(()=>{"use strict";Ao();xj();Kw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Pc=e=>{let t=Rj(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${Kw(r)}">${Ze}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${Kw(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${Kw(t)}</pre></template>`}});var Xw,Ac,Yw=l(()=>{"use strict";Ao();Xw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ac=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${Xw(r)}">${Ze}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${Xw(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${Xw(t)}</pre></template>`}});var Bg,ni,Zw=l(()=>{"use strict";qw();Jw();Yw();Bg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ni=e=>{let t=Sc(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${Bg(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,u=e.cycle.revisions.map(m=>{let S=m.judgement?.score,h=S==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${S}`,y=m.judgement?.reasons?.trim()??"",p=y.length===0?"":`<br><span class="muted">${Bg(y)}</span>`,P=Ac({roundLabel:d(m.roundNumber),promptText:m.promptText}),A=Pc({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run}),f=`${P}${A}`;if(e.interactive){let b=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${b}> <span class="sdlc-wizard-revision-title">${Bg(h)}</span></label>${f}${p}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Bg(h)}</span>${f}${p}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var Qw,Wj,Ij,Oj,ev=l(()=>{"use strict";Qw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Wj=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Qw(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Qw(t.prompt)}</pre></li>`).join("")}</ol>`,Ij=e=>Wj([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),Oj=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Qw(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${Wj(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var bc,P9,Gg,tv=l(()=>{"use strict";R();ev();bc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),P9=e=>{let t=e.wizard;return t===void 0?"":Dt({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},Gg=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=P9(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${bc(n.orchestratorSkill.fileName)}</code> \u2014 ${bc(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${bc(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=Ij(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${bc(r)} <span class="muted">${bc(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Oe,A9,b9,_9,w9,Vg,v9,T9,k9,C9,L9,E9,si,qg=l(()=>{"use strict";R();Gw();Vw();Zw();Jw();Yw();tv();Oe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),A9={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},b9=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Oe(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Oe(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Oe(o)}</pre></details>`;return`<h2>${Oe(e)}</h2>${n}`},_9=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=Nt(t).trim(),n=Dt({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!E(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${b9("What is being evaluated",i)}`},w9=(e,t)=>{let r=e.wizard;if(r===void 0||E(e.status))return"";let o=A9[t];return o===void 0||r.phase!==o?"":kj(e)},Vg=(e,t,r)=>{let o=w9(e,t),n=t==="wizard-2"?_9(e):"";return`${o}${n}${r}`},v9=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},T9=e=>{let t=e.wizard;return t===void 0?"":Lj(t)},k9=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Oe(a)}</span>`,d=`Round ${n.roundNumber}`,u=Ac({roundLabel:d,promptText:n.promptText}),m=Pc({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Oe(s)}${i}</span>${u}${m}${c}</li>`}).join("")}</ul>`,C9=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return ni({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=v9(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${k9(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=Dt({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Oe(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",u=`Round ${c.roundNumber} \u2014 score ${d}`,m=Ac({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),S=Pc({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Oe(u)}</span>${m}${S}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Oe(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},L9=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Oe(n.title)}</strong> <span class="muted">(${Oe(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Oe(o.title)}</strong>${n}${Oe(s)}${Gg(e,o)}</li>`}).join("")}</ul>`},E9=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Oe(i)}</span> <strong>${Oe(n.title)}</strong>${Oe(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Oe(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?ni({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},si=(e,t)=>{switch(t){case"wizard-1":return Vg(e,t,T9(e));case"wizard-2":return Vg(e,t,C9(e));case"wizard-3":return Vg(e,t,L9(e));case"wizard-4":return Vg(e,t,E9(e));default:return""}}});var R9,x9,Mj,Nj,Dj=l(()=>{"use strict";R();Hg();$t();qg();R9=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},x9=e=>{let t=e.goal.trim();return t.length===0?null:t},Mj=(e,t,r,o,n)=>{let s=St(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},Nj=(e,t)=>{let r=x9(e);if(t.id.startsWith("wizard-")){let s=si(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=Zl(e,t);if(s!==null){let a=En(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ce(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:Mj(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:R9(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:Mj(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var Wn,jj,zj=l(()=>{"use strict";Wn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jj=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${Wn(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Wn(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${Wn(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${Wn(n)}</h2><pre class="mono">${Wn(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${Wn(e.goal)}</dd></div></dl>`;return`<h2>${Wn(e.title)}</h2>${i}${t}${r}${o}${s}`}});var W9,$j,_c,rv,Kg=l(()=>{"use strict";R();W9=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),$j=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||E(e.status))return null;let r=Ot(t);return r<0||r>3?null:`wizard-${r+1}`},_c=(e,t)=>W9.has(t)?$j(e)===t:!1,rv="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var I9,Jg,ov=l(()=>{"use strict";I9='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Jg=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${I9}</button>`});var In,Xg=l(()=>{"use strict";R();In=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Kl({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:Xl(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var O9,Hj,M9,nv,Fj,N9,D9,j9,z9,Uj,Bj=l(()=>{"use strict";R();Xg();O9={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},Hj=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},M9=e=>O9[e]??null,nv=(e,t)=>{let r=e.wizard,o=M9(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=Ot(r);return o<n||o===n},Fj=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},N9=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:Nt(t).trim();return o.length===0?null:nc({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:Hj(e,"generalize")})},D9=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=In(e);return n===null?null:So({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=Fj(e)?.promptText.trim()??Dt({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:wn({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},j9=e=>{let t=e.wizard;if(t===void 0)return null;let r=Dt({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:sc({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:Hj(e,"separate")})},z9=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=Cr(t),s=Tn(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=In(e);return c===null?null:So({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=Fj(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||E(e.status)&&i?.judgement!==null)?_n({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):ic({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:vn(t,r).output,moduleTitle:o.title})},Uj=(e,t)=>{if(!nv(e,t))return null;switch(t){case"wizard-1":return N9(e);case"wizard-2":return D9(e);case"wizard-3":return j9(e);case"wizard-4":return z9(e);default:return null}}});var $9,Yg,sv=l(()=>{"use strict";R();$9=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},Yg=(e,t)=>{let r=e.wizard,o=$9(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=Ot(r);return o<n?"done":o===n&&E(e.status)&&e.status==="failed"?"failed":o<=n&&E(e.status)?"done":"pending"}});var H9,ii,Zg=l(()=>{"use strict";Ao();Bj();sv();H9=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ii=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(Yg(e,t)==="pending")return""}else if(!nv(e,t))return"";let o=Uj(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Ze}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${H9(o)}</pre></template>`}});var On,Wr,ai=l(()=>{"use strict";On=e=>e.toLocaleString("en-US"),Wr=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var sr,F9,Gj,Qg,Vj,qj,ef=l(()=>{"use strict";R();Dj();zj();Kg();ov();Ao();Hg();Gw();Zg();ai();sr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),F9=(e,t)=>{let r=Zl(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Wr(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${On(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${sr(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${sr(r)}</span>`:"",d=jj(Nj(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&E(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${sr(e.id)}"`:"",m=_c(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${sr(rv)}"><input type="hidden" name="cycleId" value="${sr(t.id)}"><input type="hidden" name="wizardStepId" value="${sr(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",S=e.state==="active"&&e.id.startsWith("wizard-")?Tj(t):"",h=o?"failed":e.state,y=o?En(t):null,p=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Ze}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${sr(y)}</pre></template>`:"",P=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?ii(t,e.id):"";return`<li class="sdlc-node sdlc-node-${h}" data-sdlc-step-id="${sr(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${sr(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${P}${p}</div></div>${S}<template>${d}</template></li>`},Gj=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>F9(r,t)).join("")}</ol>`,Qg=e=>`<div class="sdlc-score" aria-label="What the score means">${Yl(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${sr(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,Vj=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${Jg({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,qj=`<script>
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
</script>`});var tf,rf,of,Kj,iv=l(()=>{"use strict";tf="support-reply",rf="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",of=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),Kj=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var nf,Jj,Xj=l(()=>{"use strict";R();ef();iv();nf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Jj=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${Qg(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${nf(rf)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${nf(of)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${nf(Kj)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${nf(tf)}">Run this sample</a>
      </div>
    </section>`});var av,sf,U9,Yj,Zj=l(()=>{"use strict";av=g(require("node:fs")),sf=g(require("node:path")),U9=e=>sf.default.join(sf.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),Yj=(e,t)=>{let r=U9(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;av.default.mkdirSync(sf.default.dirname(r),{recursive:!0}),av.default.appendFileSync(r,o,"utf8")}});var li,Qj,B9,ez,G9,tz,ir,Z,rz,j,pt=l(()=>{"use strict";li=g(require("node:fs")),Qj=g(require("node:path"));R();Zj();B9=e=>e.wizard===void 0?e:{...e,wizard:gw(e.wizard)},ez=new Set,G9=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),tz=(e,t)=>{li.default.mkdirSync(Qj.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;li.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),li.default.renameSync(r,e)},ir=e=>{if(!li.default.existsSync(e))return[];try{let t=JSON.parse(li.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(G9).map(B9):[]}catch{return[]}},Z=(e,t)=>ir(e).find(r=>r.id===t)??null,rz=(e,t)=>{ez.add(t);let r=ir(e).filter(o=>o.id!==t);tz(e,r)},j=(e,t)=>{if(ez.has(t.id))return;let r=ir(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];tz(e,o),Yj(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var ci,ar,wc,oz,af,V9,nz,sz,iz,lv=l(()=>{"use strict";ci=g(require("node:fs")),ar=g(require("node:path")),wc=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},oz=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),af=(e,t)=>{let r=wc(e);return r.length>0?r:wc(t)},V9=e=>{let t=af(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${oz(o)}`,...n.length>0?[`description: ${oz(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},nz=e=>`.cursor/skills/${e}/SKILL.md`,sz=(e,t)=>{let r=wc(t);if(r.length===0)return!1;let o=ar.default.resolve(e),n=ar.default.resolve(o,".cursor","skills"),s=ar.default.resolve(o,nz(r));return s.startsWith(`${n}${ar.default.sep}`)?ci.default.existsSync(s):!1},iz=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(af(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=ar.default.resolve(e.workingDirectory);try{if(!ci.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=V9({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=nz(r.slug),n=ar.default.resolve(t,".cursor","skills"),s=ar.default.resolve(t,o);if(!s.startsWith(`${n}${ar.default.sep}`))return{ok:!1,errorCode:"path"};if(ci.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{ci.default.mkdirSync(ar.default.dirname(s),{recursive:!0}),ci.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var q9,az,lz,cz=l(()=>{"use strict";R();pt();Je();$t();lv();q9=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,az=e=>{let t=e.get("savedSkill");return t!==null&&q9.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},lz=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=Z(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!E(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ce(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||St(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=iz({workingDirectory:ue(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var lf,cf,vc=l(()=>{"use strict";R();lf=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=Rr({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},cf=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var bo,Tc=l(()=>{"use strict";R();vc();bo=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=Iw(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=Nw({moduleCount:o.length,existing:e.costControls,writerId:n}),i=lf(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:mc(r.variables)},updatedAt:new Date().toISOString()}}});var _o,kc=l(()=>{"use strict";_o=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var cv=l(()=>{"use strict";Lt();Ml();za()});var dv,dz,uv,uz,pz=l(()=>{"use strict";dv={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},dz=e=>e.exitCode===null&&e.signalCode===null,uv=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!dz(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!dz(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),uz=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),uv(e).then(s=>{r({...dv,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var mz,Cc,gz,pv,K9,gv,fv,J9,X9,Y9,fz,Z9,mv,hz,Lc,yz,Q9,eX,Qe,Mn=l(()=>{"use strict";mz=require("node:child_process"),Cc=g(require("node:fs")),gz=g(require("node:os")),pv=g(require("node:path"));cv();pz();$t();K9=["claude-cli","codex","cursor","antigravity"],gv=18e4,fv=6e5,J9=12e4,X9=9e5,Y9="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",fz="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",Z9="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",mv=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},hz=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=mv(process.env[fz])??Math.max(r,fv));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:mv(process.env[Z9])??X9;return Math.min(o,Math.max(J9,r))},Lc=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?mv(process.env[fz])??fv:gv,yz=e=>`The writer timed out after ${e}ms.`,Q9=e=>K9.includes(e),eX=e=>e===!0||process.env[Y9]==="1",Qe=e=>new Promise(t=>{if(e.signal?.aborted){t(dv);return}if(eX(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!Q9(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=Yt(r,e.prompt,ye({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!Cc.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:gv,s=pv.default.join(Cc.default.mkdtempSync(pv.default.join(gz.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=fj({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,mz.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=S=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(S))};uz(u,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",uv(u).then(S=>{m({ok:!1,errorMessage:yz(n),errorKind:"writer_timeout",killSignal:S})})},n),u.stdout.on("data",S=>{a.push(Buffer.from(S))}),u.stderr.on("data",S=>{c.push(Buffer.from(S))}),u.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",()=>{if(d.settled)return;let S=Cc.default.existsSync(s)?Cc.default.readFileSync(s,"utf8"):null,h=hj({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:S});if(h.ok&&d.stopReason!=="abort"){m(h);return}d.stopReason===null&&m(h)})})});var tX,Ec,hv=l(()=>{"use strict";R();ai();tX=e=>{if(e.wizard!==void 0){let t=lc(e.wizard),r=Wr(e);return(t??0)+r}return Wr(e)},Ec=e=>{let t=zw({costControls:e.costControls,spentTokens:tX(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var Sz,rX,Rc,df,uf=l(()=>{"use strict";R();we();hv();Sz=e=>e===W?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},rX=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Rc=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=ow({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:Sz(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?$w({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:Xl(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=rX(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?Ec({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):Ec({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},df=(e,t,r=null)=>{let o=Tg({raw:t,judge:Sz(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var pf,yv=l(()=>{"use strict";pf=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var bz,mf,gf,Pz,Az,Sv,oX,_z,Pv,nX,wz,sX,iX,vz,Tz=l(()=>{"use strict";bz=require("node:child_process"),mf=g(require("node:fs")),gf=g(require("node:path"));zm();R();Pz=4e3,Az=12e3,Sv=(e,t)=>{let r=(0,bz.spawnSync)("git",[...t],{cwd:e,env:go(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},oX=e=>Sv(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",_z=e=>{let t=Sv(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},Pv=(e,t)=>{let r=gf.default.resolve(e,t),o=gf.default.relative(e,r);if(o.startsWith("..")||gf.default.isAbsolute(o)||!mf.default.existsSync(r)||!mf.default.statSync(r).isFile())return null;let n=mf.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>Pz?`${n.slice(0,Pz)}
\u2026truncated`:n},nX=e=>e.length>Az?`${e.slice(0,Az)}
\u2026truncated`:e,wz=e=>{let t=iw(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,Pv(e.workingDirectory,n)])),o=oX(e.workingDirectory);return{git:o,status:o?_z(e.workingDirectory):{},files:r,paths:t}},sX=(e,t)=>{let r=Sv(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=Pv(e,t);return o===null?`${t} is missing.`:o},iX=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",vz=e=>{let t=e.before.git?_z(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=Pv(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>sX(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:iX(e.before.git,e.before.paths.length>0),evidence:nX(i.join(`

`))}}});var _v,G,wv,Me,kz,aX,lX,Cz,di,Lz,ui,cX,dX,xc,Av,bv,uX,Ez,pX,mX,gX,Rz,fX,xz,Wz,hX,yX,Iz,Oz=l(()=>{"use strict";_v=require("node:child_process"),G=g(require("node:fs")),wv=g(require("node:os")),Me=g(require("node:path"));zm();kz=8e6,aX=16e6,lX=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],Cz=(e,t)=>{let r=(0,_v.spawnSync)("git",[...t],{cwd:e,env:go(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},di=(e,t)=>(0,_v.spawnSync)("git",[...t],{cwd:e,env:go(),timeout:8e3}).status===0,Lz=e=>{let t=Cz(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},ui=(e,t)=>{let r=Me.default.resolve(e,t),o=Me.default.relative(e,r);return o.startsWith("..")||Me.default.isAbsolute(o)?null:r},cX=(e,t)=>{let r=ui(e,t);if(r===null||!G.default.existsSync(r))return null;let o=G.default.statSync(r);return!o.isFile()||o.size>kz?null:G.default.readFileSync(r)},dX=(e,t,r)=>{let o=ui(e,t);o!==null&&(G.default.mkdirSync(Me.default.dirname(o),{recursive:!0}),G.default.writeFileSync(o,r))},xc=(e,t)=>{let r=ui(e,t);r===null||!G.default.existsSync(r)||G.default.rmSync(r,{recursive:!0,force:!0})},Av=(e,t)=>di(e,["cat-file","-e",`HEAD:${t}`]),bv=e=>{let t=Cz(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},uX=e=>Me.default.resolve(e)!==Me.default.resolve(wv.default.homedir()),Ez=e=>{if(!G.default.existsSync(e))return 0;let t=G.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?G.default.readdirSync(e).reduce((r,o)=>r+Ez(Me.default.join(e,o)),0):0},pX=(e,t,r)=>{let o=ui(e,r);if(o===null||!G.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(Ez(o)>aX)return{relativePath:r,existed:!0,copyDir:null};let n=Me.default.join(t,"cache",r);return G.default.mkdirSync(Me.default.dirname(n),{recursive:!0}),G.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},mX=400,gX=32e6,Rz=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!G.default.existsSync(s)))for(let i of G.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=Me.default.join(s,i),c=G.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>kz)){if(t.length>=mX||r+c.size>gX){o=!1;return}r+=c.size,t.push(Me.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},fX=(e,t,r)=>{let o=ui(e,r);if(o===null||!G.default.existsSync(o))return null;let n=cX(e,r);if(n===null)return"skip";let s=Me.default.join(t,"files",r);return G.default.mkdirSync(Me.default.dirname(s),{recursive:!0}),G.default.writeFileSync(s,n),s},xz=e=>{let t=G.default.mkdtempSync(Me.default.join(wv.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?Lz(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:Rz(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,fX(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?bv(e.workingDirectory):null,isolateCaches:uX(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:lX.map(i=>pX(e.workingDirectory,t,i))}},Wz=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){xc(e.workingDirectory,t);return}dX(e.workingDirectory,t,G.default.readFileSync(r))}},hX=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?Wz(e,t):Av(e.workingDirectory,t)?di(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):xc(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&Av(e.workingDirectory,t)&&di(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!Av(e.workingDirectory,t)&&di(e.workingDirectory,["reset","-q","HEAD","--",t])},yX=(e,t)=>{let r=ui(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){xc(e.workingDirectory,t.relativePath),G.default.mkdirSync(Me.default.dirname(r),{recursive:!0}),G.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){xc(e.workingDirectory,t.relativePath);return}if(G.default.existsSync(r))for(let o of G.default.readdirSync(r)){let n=Me.default.join(r,o);G.default.statSync(n).mtimeMs>=e.startedMs-1e3&&G.default.rmSync(n,{recursive:!0,force:!0})}}}},Iz=e=>{try{if(e.git){if(bv(e.workingDirectory)!==e.head&&(!(e.head===null?di(e.workingDirectory,["update-ref","-d","HEAD"]):di(e.workingDirectory,["reset","--hard",e.head]))||bv(e.workingDirectory)!==e.head))throw new Error("head");let r=Lz(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))hX(e,o)}else{if(e.complete)for(let t of Rz(e.workingDirectory).paths)e.files[t]===void 0&&xc(e.workingDirectory,t);for(let t of Object.keys(e.files))Wz(e,t)}for(let t of e.caches)yX(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{G.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var ff,hf,SX,PX,AX,bX,_X,Mz,wX,Nz,Dz=l(()=>{"use strict";R();uf();yv();Tz();Oz();we();Je();$t();Mn();ff=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),hf=e=>({...e,status:"stopped",errorMessage:bn,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),SX=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),PX=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==W?t:e.improverModel!==W?e.improverModel:null}return e.judgeModel!==W?e.judgeModel:e.improverModel!==W?e.improverModel:null},AX=async e=>{let t=ue(e.cycle),r=wz({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=xz({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?ic({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:vn(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):Jl({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=hz({promptText:e.revision.promptText,isModuleRun:i}),c=Lc({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await Qe({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=u.ok?vz({workingDirectory:t,before:r,writerReply:u.text}):null,S=Iz(o),h={...e.cycle,revisions:e.cycle.revisions.map(y=>y.roundNumber===e.cycle.currentRound?d:y)};return u.ok?!S.ok||m===null?{ok:!1,cycle:ff(h,S.ok?"Could not put the folder back after the run.":S.errorMessage)}:{ok:!0,cycle:h,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:hf(h)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:ff(h,u.errorMessage,nr(u))})},bX=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:AX({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),_X=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),Mz=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Qe({writerAgent:e.reviewer,workingDirectory:ue(e.cycle),prompt:sw({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:hf(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},wX=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===W)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Qe({writerAgent:t.judgeModel,workingDirectory:ue(t),prompt:wn({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Rc(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?hf(o):(e.onWriterFailure?.(t.judgeModel),ff(o,n.errorMessage,nr(n)))},Nz=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return wX(e);let o=PX(t),n=await bX({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?SX(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===W){let u=await Mz({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{..._X(s,u.text),judgePhase:void 0}}let i=await Qe({writerAgent:t.judgeModel,workingDirectory:ue(t),prompt:_n({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?hf(s):(e.onWriterFailure?.(t.judgeModel),ff(s,i.errorMessage,nr(i)));let a=await Mz({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Rc(s,i.text,c);return pf(d,a.text)}});var yf,vX,TX,vv,jz=l(()=>{"use strict";R();uf();Dz();Xg();$t();we();hv();Je();Mn();yf=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),vX=e=>({...e,status:"stopped",errorMessage:bn,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),TX=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?vX(e):(n?.(r),yf(e,t.errorMessage,nr(t))),vv=async(e,t,r,o)=>{let n=Ec(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return yf(e,"This round has no prompt.");if(e.status==="judging")return Nz({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return yf(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===W)return e;let i=In(e);if(i===null)return yf(e,"The improver needs the score and the reason.");let a=await Qe({writerAgent:e.improverModel,workingDirectory:ue(e),prompt:So({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:Lc()}),c=TX(e,a,e.improverModel,r,t);return c!==null?c:df(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var Wc,Tv,kX,$z,zz,CX,LX,Sf,Hz,Fz,EX,RX,Nn,Uz,Bz,Ic=l(()=>{"use strict";R();Tc();kc();we();Je();$t();Mn();jz();qw();Wc=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),Tv=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return Wc(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},kX=e=>{let t=nr(e);return pj(e)||t==="usage_limit"||t==="action_required"},$z=(e,t,r)=>kX(r)?Wc(e,r.errorMessage,nr(r)):Tv(e,t,r.errorMessage),zz=e=>{let t=e.wizard;return t===void 0||Sc(e).length===0?e:{...e,wizard:Qs({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},CX=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",LX=e=>{let t=e.wizard;if(t===void 0)return e;let r=ac({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Qs({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Sf=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),Hz=e=>e.judgeModel!==W?e.judgeModel:e.improverModel!==W?e.improverModel:null,Fz=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},EX=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=Hz(e);if(n===null)return Wc(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Nt(o),i=nc({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:Fz(e,"generalize")}),a=await Qe({writerAgent:n,prompt:i,workingDirectory:ue(e),signal:t});if(!a.ok)return r?.(n),$z(e,"generalize",a);try{let c=Cw(a.text),d=Qs({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:mc(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return cc(d)?Nn({...u,wizard:{...d,gate:null}}):Sf(u,"generalize")}catch(c){return Tv(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},RX=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=Hz(e);if(n===null)return Wc(e,"Choose a writer to suggest splits.");let s=Dt({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=sc({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:Fz(e,"separate")}),a=await Qe({writerAgent:n,prompt:i,workingDirectory:ue(e),signal:t});if(!a.ok)return r?.(n),$z(e,"separate",a);try{let c=Lw(a.text),d=yw(c,o.variables),u=Qs({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:u};return uc(d)?bo(m,d[0]):Sf(m,"separate")}catch(c){return Tv(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},Nn=e=>{let t=e.wizard;if(t===void 0)return e;let r=Nt(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},Uz=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Wc(e,"This module is missing.");let n=Cr(r),s=Tn(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==W?e.runnerModel:e.judgeModel!==W?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:ie(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},Bz=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return vv(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return EX(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return RX(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await vv(e,t,r,o);if(E(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Sc(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=ce(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&dc({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let u=zz(Sf(a,i));return _o(u)}let c=Sf(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=Aw({wizard:{...c.wizard,modules:c.wizard.modules.map((m,S)=>S===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:CX(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?zz(d):LX(d)}return s}return n.phase==="complete",e}});var pi,Pf=l(()=>{"use strict";R();we();pi=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:vw(r,e.judgeModel===W),updatedAt:new Date().toISOString()}}});var mi,Af=l(()=>{"use strict";mi=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var Pt,Gz,xX,Vz=l(()=>{"use strict";R();Je();Af();$t();lv();Pt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Gz=e=>{if(!E(e.status))return"";let t=ce(e.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??null,reasons:S.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=St(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Pt(t.reasons.trim())}</p>`,i=e.status==="passed",a=mi(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${Pt(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${Pt(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${Pt(n)}</div>`:i?xX({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ue(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${Pt(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${Pt(t.promptText)}</pre></details>`,m=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${m}</h2>${d}${o}${s}${u}</section>`},xX=e=>{let t=e.sourceSkill?.fileName??wc(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=af(t,r),s=n.length>0&&sz(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Pt(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Pt(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Pt(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Pt(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Pt(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Pt(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var qz,Kz=l(()=>{"use strict";qz=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var Jz,WX,bf,et,_f,kv=l(()=>{"use strict";R();we();Kz();Hg();$t();Af();Jz=["Generalize","Evaluate","Separate","Optimize modules"],WX=e=>{let t=Ot(e),r=t>=0&&t<Jz.length?Jz[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},bf=(e,t)=>{let r=En(e),o=r===null?null:qz(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},et=(e,t)=>({title:e,detail:t,replyPreview:null}),_f=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=En(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:Sj(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!E(e.status)){let t=e.judgeModel;return et(`${ae(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!E(e.status)){let t=e.judgeModel;return et(`${ae(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===W?et(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?et(`${ae(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):et(`${ae(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===W){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==W?et(`${ae(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):et(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return et(`${ae(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ie(t);return et(`${ae(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return et(`${ae(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ie(t);return et(`${ae(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return et(`${ae(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===W){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return et("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return et(`${ae(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>St(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=oe(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||E(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?bf(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=mi(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?bf(e,{title:`${WX(r)}${s}`,detail:t.length>0?t:n}):bf(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(E(e.status)){let t=e.errorMessage?.trim()??"";return bf(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var lr,Oc=l(()=>{"use strict";we();lr=e=>{if(e.status==="improving"&&e.improverModel===W)return!0;if(e.status!=="judging"||e.judgeModel!==W)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===W}});var Xz,Yz=l(()=>{"use strict";Xz=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var wo,IX,Zz,Qz=l(()=>{"use strict";R();wo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IX=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${wo(r)}</p>`},Zz=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${wo(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${wo(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${wo(a)}.</p>`}<pre class="mono">${wo(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Po(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${wo(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",m=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${wo(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${IX(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${wo(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Mc,OX,e$,t$=l(()=>{"use strict";R();$t();Mc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OX=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=St(t.promptText),n=t.judgement?.reasons?`<p class="muted">${Mc(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Mc(i)}.</p>`}<pre class="mono">${Mc(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Po(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${Mc(d)}</pre>`:`<div class="alert-error">${Mc(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${u}</article>`},e$=e=>e.revisions.map(t=>OX(e,t)).join("")});var r$,o$=l(()=>{"use strict";R();r$=e=>{if(E(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var cr,MX,Cv,NX,DX,jX,zX,n$,s$,Lv=l(()=>{"use strict";o$();cr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),MX="Stop this run? Writers will stop and the best prompt is kept.",Cv="End the wizard? Writers will stop and progress from finished steps is kept.",NX="Skip this module and pause at the step gate?",DX=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${cr(MX)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${cr(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,jX=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${cr(Cv)}"><input type="hidden" name="cycleId" value="${cr(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,zX=e=>{let t=cr(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${cr(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${cr(NX)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${cr(Cv)}">End wizard</button>
    </form>
  </div>`},n$=e=>{let t=r$(e);return t==="none"?"":t==="legacy_stop"?DX(e.id):t==="wizard_end_only"?jX(e.id):zX(e)},s$=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=cr(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${cr(Cv)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var i$,a$=l(()=>{"use strict";R();ai();i$=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=oe(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${On(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${On(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${ie(r)}`}return""}});var $X,HX,l$,FX,c$,d$=l(()=>{"use strict";R();a$();sv();qg();Zg();$X=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',HX=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',l$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),FX=(e,t,r)=>{let o=si(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=i$(e,t),i=Yg(e,t),a=$X(i),c=HX(i),d=ii(e,t,{forOutcomeSummary:!0}),u=`${a}<span class="sdlc-wizard-outcome-step-title">${l$(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${l$(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",S=i==="failed"&&t!=="wizard-4"?" open":"",h=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${h}"${m}${S}><summary aria-controls="${h}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${h}-body">${o}</div></details>`},c$=e=>{let t=e.wizard;if(t===void 0||!E(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>FX(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var u$,p$,m$=l(()=>{"use strict";u$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p$=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${u$(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${u$(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var Ev,g$,Rv=l(()=>{"use strict";Ev=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,g$=(e,t)=>{if(Ev(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var f$,h$=l(()=>{"use strict";f$=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var wf,y$,S$=l(()=>{"use strict";R();Rv();Rv();h$();wf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),y$=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=oe(t),o=ie(t),n=r.terminalStatusSuggestion==="passed"?"":f$(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,h=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=u===void 0?c.status:g$(u,o),p=u!==void 0&&Ev(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':y==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':y==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':wf(y);return`<tr${h}><td>${wf(c.title)}</td><td>${wf(m)}</td><td>${c.tokens??"\u2014"}</td><td>${p}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${wf(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var Dn,vf,xv=l(()=>{"use strict";Dn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vf=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Dn(r.fileName)}</code> \u2014 ${Dn(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${Dn(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${Dn(i.name)}</strong> <code>.cursor/skills/${Dn(i.fileName)}/SKILL.md</code></p><p class="muted">${Dn(i.description)}</p><p>${Dn(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var UX,P$,A$=l(()=>{"use strict";R();m$();S$();xv();UX=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),P$=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!E(e.status)||t.modules.length===0)return"";let r=y$(e),o=p$(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=oe(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${UX(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${vf(e)}${a}${r}${o}</section>`}});var K,Tf=l(()=>{"use strict";R();K={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var kf,Wv=l(()=>{"use strict";kf=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var b$,_$=l(()=>{"use strict";Tf();Wv();b$=e=>{let t=kf({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:K.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var Ir,Nc=l(()=>{"use strict";Ir=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var Or,Cf,Iv=l(()=>{"use strict";R();ef();Vz();kv();Oc();Yz();Xg();Qz();t$();Lv();d$();A$();ai();_$();Je();Nc();Or=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Cf=e=>{let t=!E(e.status)&&e.status!=="wizard_paused"&&!lr(e),r=_f(e),o=Gj(uw(Xz(e)),e),n=E(e.status)?"":n$(e),s=c$(e),i=P$(e),a=Gz(e),c=e.errorMessage===null?"":`<div class="alert-error">${Or(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?oe(e.wizard):null,S=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,h=!t&&e.wizard!==void 0&&E(e.status)&&(e.wizard.phase==="complete"||oe(e.wizard).passedModuleCount>0),y=h?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",p=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Or(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",P=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${Or(r.replyPreview)}</pre>`,A=r.detail.length===0&&p.length===0&&P.length===0||r.detail.length===0&&P.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Or(r.detail)}${u}</p>`}${P}</div>`,f=e.revisions.find(Io=>Io.roundNumber===e.currentRound),b=e.status==="improving"?In(e):null,w=Wr(e),T=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),k=lr(e)?Zz({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:b?.promptText??f?.promptText??"",score:b?.score??f?.judgement?.score??null,reasons:b?.reasons??f?.judgement?.reasons??null,avoid:b?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:T?1:0}):"",L=e.wizard!==void 0&&e.wizard.phase==="complete"&&E(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!L&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?ie(e.wizard):e.passScore,N=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${Qg(I)}</div>`:"",U=e.status==="failed"?b$({status:e.status,errorKind:e.errorKind}):null,V=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':E(e.status)?U!==null?`<span class="${U.badgeClass}">${U.badgeLabel}</span>`:L&&m!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",q=t?d:h?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',Xe=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Or(ut(ue(e)))}</li>`:"",w>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${On(w)} so far</li>`:""].filter(Io=>Io.length>0),H=Xe.length===0?"":`<ul class="sdlc-run-meta">${Xe.join("")}</ul>`,Ce=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,Xr=L?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,mr=L?"":N.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${Xr}</div>`:`<div class="sdlc-run-grid">${Xr}${N}</div>`,SL=e$(e),nV=e.wizard!==void 0&&E(e.status)&&e.revisions.every(Io=>Io.roundNumber===0&&(Io.judgement===void 0||Io.judgement===null)),sV=SL.length===0||nV?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${SL}</div></section>`,iV=`<p class="sdlc-run-goal" title="${Or(e.goal.trim())}">${Or(Ir(e.goal))}</p>`,aV=L?`${c}${i}${s}${k}${a}`:`${c}${mr}${k}${s}${a}`,lV='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',cV=L?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Or(e.updatedAt)}" aria-busy="${t?"true":"false"}">${lV}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${V}</div>${iV}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${q}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Or(r.title)}</h2>${A}${p}${cV}</div></div>${H}${Ce}</header>${aV}</section>${sV}`}});var w$,v$=l(()=>{"use strict";R();kc();w$=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!dc({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:_o(e)}});var T$,k$=l(()=>{"use strict";R();Ic();T$=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!cc(t)?e:Nn({...e,wizard:{...t,gate:null}})}});var C$,L$=l(()=>{"use strict";R();Tc();C$=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!uc(t.splitOptions))return e;let r=t.splitOptions[0];return bo(e,r)}});var BX,jn,Lf=l(()=>{"use strict";v$();k$();L$();pt();BX=e=>{let t=T$(e),r=w$(t);return C$(r)},jn=(e,t)=>{let r=BX(t);return r!==t?(j(e,r),r):t}});var E$,Mr,Dc=l(()=>{"use strict";R();E$=e=>ct.indexOf(e),Mr=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||E(e.status)?ct.length:t.gate!==null?E$(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?E$(t.phase):null}});var R$,x$=l(()=>{"use strict";R$=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var zn,W$,I$=l(()=>{"use strict";R();x$();zn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),W$=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=vn(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${zn(R$(o))}</pre></div>`:"",s=kn(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=Cr(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),u=Mg(c),m=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${zn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${zn(u)}">${zn(S)}</label>
        ${h}
        <input class="input" type="text" id="${zn(u)}" name="${zn(u)}" value="${zn(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var O$,M$=l(()=>{"use strict";O$={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var jc,GX,pe,vo=l(()=>{"use strict";M$();Ao();jc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GX=e=>{let t=O$[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${jc(t.title)}" aria-describedby="${r}" aria-expanded="false">${Ze}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${jc(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${jc(t.example)}</span></span></button>`},pe=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${jc(r)}"`}>${jc(e)}</span>${GX(t)}</span>`});var At,N$,D$,j$=l(()=>{"use strict";R();vc();Tf();vo();At=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),N$=e=>{let t=e.costControls;if(t===void 0||oi(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??dt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${At(K.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${At(t.softWarnMessage??Cn)}</p>`:"",d=cf({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${At(K.estimateOverCeilingWarn)}</p>`:"",u=e.wizard?.modules.length??0,m=u>0?`<p class="muted">Step 4 will optimize ${u} module${u===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${At(K.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${At(K.confirmLede)}</p>
  ${m}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${At(ei)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${At(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${At(K.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${At(K.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${At(K.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
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
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${At(K.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${At(K.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},D$=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!oi(r)}});var VX,z$,$$=l(()=>{"use strict";Ao();VX=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),z$=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${Ze}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${VX(t)}</pre></template>`}});var zc,H$,F$=l(()=>{"use strict";R();Vw();I$();Zw();Lv();xv();tv();j$();$$();zc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H$=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(D$(e))return N$(e);let n=ie(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?Ej(r):"",a=o==="evaluate"?vf(e):"",c=o==="evaluate"?ni({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(I=>{let N=I.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',U=I.recommended?' <span class="sdlc-badge">Recommended</span>':"",V=r.selectedSplitOptionId===I.id||r.selectedSplitOptionId===null&&I.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${zc(I.id)}" required${V}> <strong>${zc(I.title)}</strong>${N}${U}</label>${Gg(e,I)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],h=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=m?.title??"Module",p=m?.prompt??"",P=m?.status==="pending",A=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${zc(y)}</p>${P?W$({cycle:e,modulePrompt:p}):""}<p class="muted">Test run prompt preview: ${zc(Tn(p,Cr(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${ni({cycle:e,interactive:!1,caption:P?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",f=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":P?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",b=lc(r),w=b===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${b}</p>`,T=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?z$(r.lastWriterParseFailureReply??""):"",k=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",L=t?.active===!0?" sdlc-wizard-gate-active":"",x=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${k}"`:"";return`<section class="card sdlc-wizard-gate${L}"${x}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${f}</p>
    ${T}
    ${w}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${zc(e.id)}">
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
    ${s$(e)}
  </section>`}});var qX,U$,B$=l(()=>{"use strict";R();Zg();qX=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),U$=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||E(e.status))return"";let r=(o,n)=>{let s=ii(e,o);return`<h2 class="sdlc-wizard-active-head">${qX(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var Ov,G$,V$,To,q$,gi=l(()=>{"use strict";R();pt();Ov=new Map,G$=e=>{let t=new AbortController;return Ov.set(e,t),t.signal},V$=e=>{Ov.delete(e)},To=e=>{Ov.get(e)?.abort()},q$=(e,t)=>{let r=Z(e,t);return r===null||r.wizard!==void 0?!1:(E(r.status)||(j(e,{...r,status:"stopped",errorMessage:bn,updatedAt:new Date().toISOString()}),To(t)),!0)}});var K$,J$,Mv,X$,Nv=l(()=>{"use strict";R();Dc();gi();K$="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",J$=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return ct[r]??null},Mv=(e,t)=>{let r=J$(t);if(r===null||e.wizard===void 0)return!1;let o=ct.indexOf(r);if(o===-1)return!1;let n=Mr(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<ct.length)},X$=(e,t)=>{let r=J$(t);if(r===null||e.wizard===void 0||!Mv(e,t))return e;To(e.id);let o=ct.slice(ct.indexOf(r)),n=oc(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var Dv,Y$,Z$=l(()=>{"use strict";Nv();Dv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Y$=(e,t)=>Mv(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${Dv(K$)}"><input type="hidden" name="cycleId" value="${Dv(e.id)}"><input type="hidden" name="wizardStepId" value="${Dv(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var KX,Q$,JX,eH,tH=l(()=>{"use strict";R();Dc();F$();B$();Z$();qg();KX={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},Q$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),JX=(e,t,r)=>{let o=Y$(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${Q$(t)}">
  <summary class="sdlc-wizard-accordion-summary">${Q$(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${si(e,t)}</div>
</details>`},eH=e=>{let t=e.wizard;if(t===void 0)return"";let r=Mr(e);if(r===null)return"";let o=ct.slice(0,r).map((i,a)=>JX(e,`wizard-${a+1}`,KX[i])),n=t.gate!==null?H$(e,{active:!0}):U$(e),s=r>=ct.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var Ef,jv=l(()=>{"use strict";tH();ev();R();Ef=e=>{if(e===null||e.wizard!==void 0&&E(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=eH(e),r=Oj(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var XX,zv,rH=l(()=>{"use strict";R();we();Je();Mn();XX=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},zv=async(e,t,r)=>{if(!XX(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===W)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=bw({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Qe({writerAgent:e.judgeModel,prompt:n,workingDirectory:ue(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=ww(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var $c,Rf,oH,$v,nH,sH,iH,xf,Hv=l(()=>{"use strict";$c=g(require("node:fs")),Rf=g(require("node:path")),oH=e=>Rf.default.join(Rf.default.dirname(e),"prompt-optimizer-writer-ready.json"),$v=e=>{let t=oH(e);if(!$c.default.existsSync(t))return{};try{let r=JSON.parse($c.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},nH=(e,t)=>{$c.default.mkdirSync(Rf.default.dirname(e),{recursive:!0}),$c.default.writeFileSync(oH(e),`${JSON.stringify(t,null,2)}
`)},sH=(e,t)=>$v(e)[t]?.message??null,iH=(e,t,r)=>{nH(e,{...$v(e),[t]:{message:r}})},xf=(e,t)=>{let r=$v(e);r[t]!==void 0&&nH(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var Fv,Wf,If,aH,ve,$n=l(()=>{"use strict";R();cv();Ic();rH();Oc();gi();Hv();Lf();pt();Fv=new Set,Wf={atMs:0,ids:[]},If=async()=>{if(Date.now()-Wf.atMs<3e4)return Wf.ids;let e=await It({commands:ye({})});return Wf.atMs=Date.now(),Wf.ids=e.installedWriterIds,e.installedWriterIds},aH=async(e,t,r)=>{let o=Z(e,t);if(o===null||r.aborted)return;let n=jn(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(E(n.status)&&!s||n.status==="wizard_paused"||lr(n))return;if(s){let c=await zv(n,r,d=>{xf(e,d)});j(e,c);return}let i=await Bz(n,c=>{xf(e,c)},r,c=>{Z(e,t)?.status==="stopped"||r.aborted||j(e,c)});if(!(Z(e,t)?.status==="stopped"||r.aborted)){if(j(e,i),E(i.status)){let c=await zv(i,r,d=>{xf(e,d)});j(e,c);return}await aH(e,t,r)}},ve=(e,t)=>{if(Fv.has(t))return;let r=Z(e,t);if(r===null)return;let o=jn(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(E(o.status)&&!n||o.status==="wizard_paused"||lr(o))return;Fv.add(t);let s=G$(t);aH(e,t,s).finally(()=>{Fv.delete(t),V$(t)})}});var ko,Hc=l(()=>{"use strict";Iv();Lf();jv();$n();ko=(e,t)=>{let r=jn(e,t);return ve(e,r.id),`${Cf(r)}${Ef(r)}`}});var lH,cH,dH=l(()=>{"use strict";lH=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,cH=e=>e!==null&&e>0});var YX,ZX,QX,uH,pH=l(()=>{"use strict";R();Ic();Pf();Tc();kc();gi();Kg();Kg();YX=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),ZX=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ce(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},QX=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=oe(o);return pi({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},uH=(e,t)=>{if(!_c(e,t))return e;To(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return Nn({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return _o(ZX(r));if(t==="wizard-3"){let n=o.splitOptions[0]??YX(o.templatedPrompt);return bo(r,n)}return t==="wizard-4"?QX(r):e}});var Of,mH,Uv=l(()=>{"use strict";R();Pf();gi();Of=e=>(To(e.id),{...pi(e,"stopped"),errorMessage:K_}),mH=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;To(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var eY,gH,fH,hH=l(()=>{"use strict";R();Ic();Pf();Tc();kc();Hc();pt();$n();dH();Nv();pH();Uv();eY="Pick a revision scored above 0 before continuing to Separate.",gH=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),fH=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=Z(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=Z(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(ko(e.storePath,d))};if(o==="wizard-stop-all"){let c=Of(s);return j(e.storePath,c),ve(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=mH(s);return j(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=X$(s,c);return j(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=uH(s,c);return j(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&ve(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",m=fw(s.wizard,d,c);m=oc(m,d),m={...m,pendingStepInstructions:u};let S={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return j(e.storePath,S),ve(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?gH(s):Nn({...s,wizard:{...s.wizard,gate:null}});return j(e.storePath,m),ve(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=lH(s,u??-1);if(!cH(m)){let h={...s,errorMessage:eY,updatedAt:new Date().toISOString()};return j(e.storePath,h),a(n),!0}let S=_o({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return j(e.storePath,S),ve(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=gH(s);return j(e.storePath,h),ve(e.storePath,n),a(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(h=>h.id===u);if(m===void 0){let h={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return j(e.storePath,h),a(n),!0}let S=bo(s,m);return j(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,m=d.modules[u];if(m===void 0)return a(n),!0;if(!oi(s.costControls)){let P=t.get("confirmedTokenBudget")?.trim()??"",A=t.get("confirmedMaxSpendUsd")?.trim()??"";if(P.length===0){let b={...s,errorMessage:ei,updatedAt:new Date().toISOString()};return j(e.storePath,b),a(n),!0}let f=Rr({existing:s.costControls,confirmedTokenBudget:Number(P),confirmedMaxSpendUsd:A.length===0?null:Number(A),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!f.ok){let b={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return j(e.storePath,b),a(n),!0}s={...s,costControls:f.costControls,errorMessage:null,updatedAt:new Date().toISOString()},j(e.storePath,s)}let S=Ow({wizard:d,modulePrompt:m.prompt,posted:t});if(!S.ok){let P={...s,errorMessage:S.errorMessage,updatedAt:new Date().toISOString()};return j(e.storePath,P),a(n),!0}let h={...d,parameterValues:S.parameterValues};if(m.status==="pending"){let P=Uz({...s,wizard:{...h,gate:null}},u);return j(e.storePath,P),ve(e.storePath,n),a(n),!0}let y=u+1;if(y>=d.modules.length){let P=oe(h),A=pi({...s,wizard:h},P.terminalStatusSuggestion);return j(e.storePath,A),ve(e.storePath,n),a(n),!0}let p={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...h,gate:"optimize_modules",currentModuleIndex:y},updatedAt:new Date().toISOString()};return j(e.storePath,p),a(n),!0}}return a(n),!0}});var tY,yH,rY,Bv,oY,SH,PH=l(()=>{"use strict";we();gi();Uv();yv();uf();Oc();pt();tY="Add a score from 0 to 100 and the reason for it.",yH="Add a score from 1 to 100 and the reason for it.",rY="Write the next prompt.",Bv="This step is not waiting for you.",oY=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},SH=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=Z(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(j(e.storePath,Of(a)),{kind:"saved",cycleId:i}):q$(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=Z(e.storePath,r);if(o===null||!lr(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:Bv};if(t==="manual-judge"){if(o.judgeModel!==W)return{kind:"invalid",cycle:o,errorMessage:Bv};let i=oY(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?yH:tY};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:yH};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",u=pf(Rc(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return j(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==W)return{kind:"invalid",cycle:o,errorMessage:Bv};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:rY};let s=df(o,n);return j(e.storePath,s),{kind:"saved",cycleId:o.id}}});var AH,bH=l(()=>{"use strict";AH=`<script>
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
</script>`});var _H,wH=l(()=>{"use strict";_H=`<script>
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
</script>`});var vH,TH=l(()=>{"use strict";vH=`<script>
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
</script>`});var kH,CH=l(()=>{"use strict";kH=`<script>
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
</script>`});var LH,EH=l(()=>{"use strict";R();Je();LH=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:ut(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(ie(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!E(t.status)}}});var RH,xH=l(()=>{"use strict";RH=`<script>
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
</script>`});var WH,IH=l(()=>{"use strict";R();Dc();Af();WH=e=>{let t=mi(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:E(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=Mr(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=oe(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=oe(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return E(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var OH,MH=l(()=>{"use strict";OH=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Nr,nY,sY,NH,DH=l(()=>{"use strict";IH();MH();Nc();Nr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nY=e=>e.wizard===void 0?"legacy":"wizard",sY=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Nr(t)}">`,o=WH(e),n=OH(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Nr(o.badgeClass)}">${Nr(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Nr(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Nr(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${nY(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Nr(e.id)}">${Nr(Ir(e.goal))}</a><p class="muted">${Nr(a)}</p></div></div><div class="sdlc-history-row-actions">${u}${m}</div></li>`},NH=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>sY(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Nr(s)}</summary>${i}</details>`:i}});var Gv,Mf,jH,iY,aY,Fc,zH,Nf=l(()=>{"use strict";Gv=g(require("node:fs")),Mf=g(require("node:path"));Je();jH=/^[a-z0-9-]+$/,iY=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},aY=(e,t)=>{if(!jH.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let m=iY(u[2]??"");u[1]==="name"&&m.length>0&&(o=m),u[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},Fc=e=>{let t=xr(e);if(!t.ok)return[];let r=Mf.default.resolve(t.path,".cursor","skills"),o=[];try{o=Gv.default.readdirSync(r)}catch{return[]}return o.filter(n=>jH.test(n)).flatMap(n=>{let s=Mf.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${Mf.default.sep}`))return[];try{let i=aY(Gv.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},zH=(e,t)=>Fc(e).find(r=>r.fileName===t)??null});var $H,lY,HH,FH,UH=l(()=>{"use strict";vo();$H=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lY=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),HH=e=>{if(e.length===0)return`<div class="field">${pe("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${$H(r.fileName)}">${$H(r.fileName)}</option>`).join("");return`<div class="field">${pe("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${lY(e)}</script>`},FH=`<script>
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
</script>`});var tt,BH,GH=l(()=>{"use strict";R();Tf();vc();vo();tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),BH=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=tt(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=ri({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??Er(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),m=cf({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",S=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
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
</div>`}});var Ge,VH,qH,cY,KH,JH,XH,YH=l(()=>{"use strict";R();kv();we();Nc();Dc();Ge=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),VH=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",qH=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,cY=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},KH=e=>e===W?"You":ae(e),JH=e=>{let t=cY(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ae(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Ge(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Ge(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Ge(KH(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Ge(KH(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Ge(r)}</dd></div>
    </dl>
  </details>`},XH=e=>{let t=e.wizard;if(t===void 0)return"";let r=Ir(e.goal),o=e.status==="wizard_paused",n=!E(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=_f(e),m=qH(t),S=m===null?"":VH(m),h=Mr(e),y=S.length===0?"":h===null||h>=4?` <strong>${Ge(S)}</strong>`:` <strong>${Ge(S)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Ge(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Ge(u.title)}${y}</p>
    <p class="muted">${Ge(u.detail)}</p>
    <div class="actions">
      ${JH(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ge(e.id)}">Open this run</a>
    </div>
  </section>`}let s=qH(t),i=s===null?"Wizard":VH(s),a=Mr(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ge(r)}</h2>
    <p class="lede">Paused at <strong>${Ge(i)}</strong>${Ge(c)} (last updated ${Ge(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${JH(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ge(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Uc,ZH,QH=l(()=>{"use strict";vo();Uc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ZH=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${Uc(n.id)}"${n.id===e.runner?" selected":""}>${Uc(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Uc(e.runner)}">Checking ${Uc(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${pe("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${pe("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Uc(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var eF,tF=l(()=>{"use strict";eF=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var fi,rF,oF,nF,sF,iF=l(()=>{"use strict";vo();fi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rF=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${fi(c.id)}"${c.id===r?" selected":""}>${fi(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${fi(n)}</option>`;return`<div class="field">${pe(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},oF=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${fi(t)}">Checking ${fi(o)}\u2026</p>`},nF=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${pe(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${fi(r)}</textarea><span class="muted">${o}</span></div></details>`,sF=e=>{let t=`<div class="sdlc-writer">${rF("judge","Judge",e.judge,e.writers,"I'll score it")}${oF("judge",e.judge,e.writers)}${nF("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${rF("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${oF("improver",e.improver,e.writers)}${nF("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var aF,lF=l(()=>{"use strict";aF=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var Vv,cF,dF=l(()=>{"use strict";lF();Vv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cF=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${aF.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${Vv(t.goal)}" title="${Vv(t.goal)}">${Vv(t.label)}</button>`).join("")}</div>`});var Bc,dY,uY,qv,uF=l(()=>{"use strict";R();vo();Bc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dY=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},uY=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,qv=e=>{let t=dY(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=Yl(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${pe(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${Bc(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${Bc(e.inputId)}" class="sdlc-pass-range" type="range" name="${Bc(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${Bc(a)}"><span class="sdlc-pass-mark" style="left:${uY(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${Bc(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var mY,Kv,Dr,pF,mF=l(()=>{"use strict";Oc();Iv();bH();wH();ef();TH();CH();EH();xH();DH();Nf();UH();vo();jv();GH();YH();Nc();QH();tF();iF();R();dF();uF();mY=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Kv='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',Dr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pF=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Dr(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Dr(e.skillNotice??"")}</div>`,o=`${Vj}${qj}`,n=e.resumableWizardCycle??null,s=n===null?"":XH(n),i=Ef(e.cycle),a=e.cycle===null?"":Cf(e.cycle),c=e.cycle!==null&&lr(e.cycle),d=LH(e),u=mY(d.goal,d.prompt,e.canRun),m=sF({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=ZH({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=`${qv({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${qv({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=BH({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),p=mw,P=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",A=e.cycle!==null&&E(e.cycle.status),f=d.running&&!A,b=A||f?"":" open",w=f?" sdlc-compose-run-focus":"",k=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${A?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,L=A?(()=>{let H=e.cycle!==null?Ir(e.cycle.goal):Ir(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Dr(H)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${k}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${k}</summary>`,x=A?" sdlc-compose-viewing-finished":"",I=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",N=c?"waiting":d.running?"running":"idle",U=d.running&&!c?' aria-busy="true"':"",V=`<section class="card sdlc-compose${x}${w}" id="prompt-optimizer-compose">
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
        ${HH(Fc(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${Kv}
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
            ${cF()}
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
            ${Kv}
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
        ${eF()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${Kv}
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
    </section>`,q=e.history.length>0?RH:"",Xe=`${""}${kH}${AH}${_H}${vH}${FH}${q}`;return`${t}${r}${V}${s}${a}${i}${o}${NH(e.history,e.cycle?.id??null)}${Xe}`}});var Gc,Jv=l(()=>{"use strict";mF();Gc=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:pF(t)}))}});var gF,fF=l(()=>{"use strict";PH();Hc();Jv();pt();$n();gF=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:SH({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=Z(e.storePath,o.cycleId);return ve(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(ko(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Gc(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:ir(e.storePath),resumableWizardCycle:null}),!0)}});var hF,Df,Xv=l(()=>{"use strict";R();hF=g(require("node:os")),Df=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??hF.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??zt()}}});var yF,hi,Yv,SF,PF,Vc=l(()=>{"use strict";R();we();iv();yF=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,hi=e=>{let t=Aj(e),r=Rn(e).map(s=>({id:s,label:Fg[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},Yv=(e,t,r)=>t===W||t!==null&&e.writers.some(o=>o.id===t)?t:r,SF=(e,t,r,o=null)=>({judge:Yv(e,t,e.judge),improver:Yv(e,r,e.improver),runner:Yv(e,o,e.runner)}),PF=e=>e===tf?{goal:rf,prompt:of}:{goal:"",prompt:""}});var Zv,AF=l(()=>{"use strict";Zv=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var bF,gY,_F,wF,vF,TF=l(()=>{"use strict";R();bF=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},gY=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},_F=(e,t)=>e.has("earlyStop")?!0:t!=="run",wF=e=>{let t=bF(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=gY(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=bF(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},vF=e=>zt(e)});var kF,CF,jf,Qv=l(()=>{"use strict";R();we();Je();Vc();AF();TF();kF=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=Zv(o);return n.ok?String(n.passScore):String(r)},CF=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return Zv(n)},jf=e=>{let t=SF(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=kF(e.posted,"passScore",70),o=kF(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",m=e.posted?.get("intent")??"",S=e.posted===null?!0:_F(e.posted,m),h=(L,x)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:L,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:x,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:u,earlyStop:S});if(e.posted===null)return h(e.defaultFolder??xn,null);let y=e.posted.get("folder")??xn;if(e.posted.get("intent")==="choose-folder"){let L=e.pickFolder();return h(L===null?y:ut(L),null)}if((e.posted.get("intent")??"")!=="run")return h(y,null);let P=yF(e.goal,e.prompt);if(P!==null)return h(y,P);let A=CF(e.posted,"passScore",r);if(!A.ok)return h(y,A.errorMessage);let f=CF(e.posted,"modulePassScore",o);if(!f.ok)return h(y,f.errorMessage);let b=bj(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(b===null)return h(y,"Choose a judge and an improver.");let w=xr(y);if(!w.ok)return h(y,w.errorMessage);let T=_j(e.installedIds,c,b.judge);if(T===null)return h(y,"Choose a runner for wizard step 4.");let k=wF({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return k.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:w.path,passScore:A.passScore,modulePassScore:f.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:T,runnerInstructions:a,costControls:vF(k.knobs)}:h(y,k.errorMessage)}});var yi,$f,fY,eT,LF,zf,EF,hY,RF,tT,yY,SY,PY,rT,xF,WF,IF=l(()=>{"use strict";yi=g(require("node:fs")),$f=g(require("node:path"));we();Je();fY=["remember","choose-folder","run"],eT=()=>({folder:xn,judge:"",improver:"",runner:""}),LF=e=>$f.default.join($f.default.dirname(e),"prompt-optimizer-preferences.json"),zf=e=>typeof e=="string"?e:"",EF=e=>{let t=LF(e);if(!yi.default.existsSync(t))return eT();try{let r=JSON.parse(yi.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return eT();let o=r,n=zf(o.folder).trim();return{folder:n.length===0?xn:n,judge:zf(o.judge),improver:zf(o.improver),runner:zf(o.runner)}}catch{return eT()}},hY=(e,t)=>{let r=LF(e);yi.default.mkdirSync($f.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;yi.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),yi.default.renameSync(o,r)},RF=(e,t)=>e===W||Rn(t).some(r=>r===e),tT=(e,t,r)=>e===null?t:e.length===0?"":RF(e,r)?e:t,yY=(e,t)=>{if(e===null)return t;let r=xr(e);return r.ok?r.display:t},SY=e=>{let t=EF(e.storePath),r={folder:yY(e.folder,t.folder),judge:tT(e.judge,t.judge,e.installedIds),improver:tT(e.improver,t.improver,e.installedIds),runner:tT(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||hY(e.storePath,r)},PY=e=>{let t=xr(e);return t.ok?t.display:xn},rT=(e,t)=>RF(e,t)?e:"",xF=e=>{let t=EF(e.storePath);return{selection:{...e.selection,judge:rT(t.judge,e.installedIds)||e.selection.judge,improver:rT(t.improver,e.installedIds)||e.selection.improver,runner:rT(t.runner,e.installedIds)||e.selection.runner},defaultFolder:PY(t.folder)}},WF=e=>{let t=e.posted.get("intent")??"";if(!fY.includes(t))return;let r=e.posted.get("folder");SY({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var OF,AY,bY,oT,_Y,Hf,Ff=l(()=>{"use strict";OF=g(require("node:os"));we();Hv();Mn();AY="Reply with the single word ok. Do not use tools.",bY=45e3,oT=async(e,t)=>{if(t===W)return{ok:!0,message:"You will do this step."};let r=sH(e,t);if(r!==null)return{ok:!0,message:r};let o=await Qe({writerAgent:t,prompt:AY,workingDirectory:OF.default.tmpdir(),timeoutMs:bY});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ae(t)} is ready.`;return iH(e,t,n),{ok:!0,message:n}},_Y=e=>[...new Set(e.filter(t=>t.length>0))],Hf=async(e,t,r,o)=>{for(let n of _Y([t,r,o??""])){let s=await oT(e,n);if(!s.ok)return s.message}return null}});var nT,MF=l(()=>{"use strict";R();nT=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!E(r.status)&&!(t!==null&&r.id===t))return r;return null}});var NF,DF=l(()=>{"use strict";xt();R();vc();Hc();Xv();Qv();Jv();pt();Je();IF();Nf();Ff();MF();Lf();$n();NF=async e=>{let t=e.posted===null?xF({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=jf({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>fo("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(WF({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?ut(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await Hf(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await Gc(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:ut(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:ir(e.route.storePath),resumableWizardCycle:nT(ir(e.route.storePath),null)});return}if(r.kind==="start"){let s=zH(r.workingDirectory,r.sourceSkillFile),i=lf(yc({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=Df({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:Tw({...rc(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(j(e.route.storePath,a),ve(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(ko(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:Z(e.route.storePath,e.cycleId);n!==null&&(n=jn(e.route.storePath,n),ve(e.route.storePath,n.id)),await Gc(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:ir(e.route.storePath),resumableWizardCycle:nT(ir(e.route.storePath),n?.id??null)})}});var jF,zF=l(()=>{"use strict";pt();jF=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";rz(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var $F,HF=l(()=>{"use strict";$F=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var FF,UF=l(()=>{"use strict";cz();hH();fF();DF();zF();Vc();HF();$n();FF=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await If(),o=hi(r),n=e.method==="POST"?$F(e.request.headers["content-type"],await e.readBody(e.request)):null;if(fH({posted:n,storePath:e.storePath,response:e.response})||await gF(e,n,o))return;let s=PF(t.searchParams.get("example")),i=jF({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=lz({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await NF({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:az(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var wY,BF,GF=l(()=>{"use strict";R();pt();wY=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",BF=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=Z(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!E(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=kw({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${wY(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var VF,qF=l(()=>{"use strict";Hc();pt();VF=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:Z(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":ko(e.storePath,o)),!0}});var vY,KF,JF=l(()=>{"use strict";we();Ff();vY=["claude-cli","codex","cursor","antigravity"],KF=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===W||vY.includes(t)?await oT(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var XF,YF=l(()=>{"use strict";R();XF=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:Ql,page:ec,context:Ys,installedWriters:e,post:{method:"POST",url:Ql,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${Ql}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var Uf,ZF=l(()=>{"use strict";R();Wv();ai();Uf=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ce(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=E(e.status),n=e.errorKind??null,s=kf({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:Wr(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:Ys,page:`${ec}?cycle=${encodeURIComponent(e.id)}`}}});var F,TY,QF,e1,t1=l(()=>{"use strict";F=g(ns());R();TY=(0,F.isType)({goal:F.isString,prompt:F.isString,workingDirectory:F.isString,judge:(0,F.isUndefinedOr)(F.isString),improver:(0,F.isUndefinedOr)(F.isString),passScore:(0,F.isUndefinedOr)(F.isNumber),maxRounds:(0,F.isUndefinedOr)(F.isNumber),maxTrials:(0,F.isUndefinedOr)(F.isNumber),maxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),earlyStop:(0,F.isUndefinedOr)(F.isBoolean),earlyStopFlatRounds:(0,F.isUndefinedOr)(F.isNumber),confirmedTokenBudget:(0,F.isUndefinedOr)(F.isNumber),confirmedMaxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),rateUsdPer1kTokens:(0,F.isUndefinedOr)(F.isNumber)}),QF=e=>{let t=e?.trim()??"";return t.length===0?null:t},e1=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return TY(t)?t.workingDirectory.trim().length===0?{ok:!1,error:Lg}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:QF(t.judge),improver:QF(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:Lg}}});var jr,kY,r1,o1,n1=l(()=>{"use strict";R();jr=g(ns()),kY=(0,jr.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:jr.isNumber,confirmedMaxSpendUsd:(0,jr.isUndefinedOr)(jr.isNumber),rateUsdPer1kTokens:(0,jr.isUndefinedOr)(jr.isNumber)}),r1=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:kY(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},o1=(e,t)=>{let r=Rr({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var CY,s1,i1=l(()=>{"use strict";R();we();Qv();Vc();CY=e=>e.map(t=>t.id).join(", "),s1=e=>{let t=hi(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===W||n===W)return{ok:!1,error:pw,installedWriters:t.writers};if(o===null||n===null){let a=CY(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=jf({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var LY,a1,l1=l(()=>{"use strict";R();Xv();YF();ZF();Vc();t1();n1();i1();pt();LY=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},a1=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let u=Z(e.storePath,t);return u===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:Uf(u)}}let r=await e.handlers.readInstalledIds(),o=hi(r);if(e.method==="GET")return{status:200,body:XF(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let u=r1(e.rawBody);if(u.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(u.kind==="invalid")return{status:400,body:{ok:!1,error:u.error}};let m=Z(e.storePath,t);if(m===null)return{status:404,body:{ok:!1,error:"That run is not on this Mac."}};let S=o1(m,u.body);return S.ok?(j(e.storePath,S.cycle),{status:200,body:Uf(S.cycle)}):{status:400,body:{ok:!1,error:S.error}}}let n=LY(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let u=ri({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:u.targetTokenBudget,proposedTokenBudget:u.targetTokenBudget,estimatedSpendUsd:u.estimatedSpendUsd,rateUsdPer1kTokens:u.rateUsdPer1kTokens??null,proposalStub:u.stub===!0,confirmationRequired:!0}}}let s=e1(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=s1({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=yc({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:dt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let u=Rr({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!u.ok)return{status:400,body:{ok:!1,error:u.errorMessage}};c=u.costControls}let d=Df({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:rc(i.prompt),runnerModel:i.runner,costControls:c});return j(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:Uf(d)}}});var c1,d1=l(()=>{"use strict";$n();Ff();l1();c1=async e=>{let t=await a1({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:If,readWritersReady:Hf,startCycle:ve}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var p1,EY,RY,u1,xY,m1,g1=l(()=>{"use strict";p1=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],EY=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},RY=e=>{let t={};for(let n of e)for(let s of new Set(p1(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},u1=(e,t)=>{let r=EY(p1(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},xY=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},m1=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=RY(e.map(i=>i.text)),s=u1(o,n);return e.map(i=>({id:i.id,score:xY(s,u1(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var sT,WY,IY,f1,OY,MY,NY,DY,iT,aT=l(()=>{"use strict";sT=g(require("node:path"));Je();g1();Nf();WY=5,IY=20,f1=280,OY=e=>[e.name,e.description,e.promptText].join(`
`),MY=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=f1?t:`${t.slice(0,f1-3)}...`},NY=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),DY=e=>e===void 0||!Number.isFinite(e)?WY:Math.min(IY,Math.max(1,Math.floor(e))),iT=e=>{let t=e.query.trim(),r=DY(e.limit),o=xr(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=Fc(o.path),s=m1(n.map(d=>({id:d.fileName,text:OY(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=sT.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:sT.default.join(a,u.fileName,"SKILL.md"),excerpt:MY(u),source:"filesystem"}]});return{query:t,hits:c,context:NY(c)}}});var h1,y1=l(()=>{"use strict";aT();h1=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:iT({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var S1,P1=l(()=>{"use strict";y1();S1=async e=>{let t=h1({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var jY,lT,A1=l(()=>{"use strict";Xj();UF();GF();qF();JF();d1();P1();jY=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},lT=async e=>{let t=jY(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await c1(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await S1(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:Jj()})),!0):(await KF({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||BF({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||VF({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await FF(e),!0)}});var b1=l(()=>{"use strict";A1();aT();Mn()});var _1,zY,zr,cT,dT=l(()=>{"use strict";_1=e=>{let t=JSON.parse(e);return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]},zY=e=>e===""?null:e,zr=e=>e??"",cT=e=>({id:e.id,projectId:zY(e.project_id),symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:{kind:e.check_kind,value:e.check_value},keywords:_1(e.keywords_json),tags:_1(e.tags_json),source:e.source,hitCount:e.hit_count,lastSeenAt:e.last_seen_at,severity:e.severity})});var w1,$Y,HY,uT,Si,Bf,qc=l(()=>{"use strict";dT();w1=`
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`,$Y=e=>e,HY=e=>e??null,uT=(e,t,r=t)=>$Y(e.prepare(w1).all(zr(r),zr(t))).map(cT),Si=(e,t,r,o=t)=>{let n=HY(e.prepare(`${w1} AND p.id = ?`).get(zr(o),zr(t),r));return n===null?null:cT(n)},Bf=(e,t)=>{e.prepare(`INSERT INTO pitfalls (
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
      severity = excluded.severity`).run(zr(t.projectId),t.id,t.symptom,t.cause,t.avoidance,t.check.kind,t.check.value,JSON.stringify(t.keywords),JSON.stringify(t.tags),t.source,t.severity)}});var Kc,pT=l(()=>{"use strict";Kc={symptom:120,cause:200,avoidance:280,checkValue:280,keyword:40,keywords:24,tag:32,tags:12,id:64}});var v1=l(()=>{"use strict";pT()});var k1=l(()=>{"use strict";pT();v1()});var Gf,Vf,qf,Kf,mT,gT,Jf,Jc,C1=l(()=>{"use strict";k1();Gf=Kc.symptom,Vf=Kc.cause,qf=Kc.avoidance,Kf=64,mT=4,gT=200,Jf="token-saver.db",Jc=1});var L1,E1,Pi=l(()=>{"use strict";C1();L1=3e3,E1=e=>Math.ceil(e.length/4)});var Xf,Yf,fT,Xc=l(()=>{"use strict";Pi();Xf=e=>`${e.id} | ${e.avoidance}`,Yf=e=>e.map(t=>({id:t.id,avoidance:t.avoidance})),fT=e=>{let t=[],r=0;for(let o of e){if(t.length>=mT)break;let n=Xf(o),s=E1(n);if(t.length>0&&r+s>gT)break;t.push(o),r+=s}return t}});var hT,R1,Zf=l(()=>{"use strict";hT=e=>{let t=new Map;e.seeds.forEach(o=>{t.set(o.id,o)}),e.projectRows.forEach(o=>{t.set(o.id,o)});let r=[...t.values()];return e.includeRetired===!0?r:r.filter(o=>o.source!=="retired")},R1=e=>e.filter(t=>t.source!=="retired").length});var Hn,x1,Yc=l(()=>{"use strict";Xc();qc();Zf();Hn=(e,t={})=>{let r=t.projectId??null,o=uT(e,null,r),n=r===null||r===""?[]:uT(e,r);return hT({seeds:o,projectRows:n,includeRetired:t.includeRetired===!0})},x1=(e,t={})=>{let r=Hn(e,t);return t.format==="bot"?{format:"bot",items:Yf(r),lines:r.map(Xf)}:{format:"full",items:r}}});var Qf,yT=l(()=>{"use strict";qc();Yc();Qf=(e,t)=>{let r=t.id.trim();if(r.length===0)return null;let o=t.projectId??null;return o===null||o===""?Si(e,null,r):Hn(e,{projectId:o,includeRetired:!0}).find(s=>s.id===r)??null}});var GY,VY,ST,PT=l(()=>{"use strict";Xc();GY=e=>e.toLowerCase(),VY=(e,t)=>{let r=GY(e);return t.reduce((o,n)=>{let s=n.trim().toLowerCase();return s.length===0?o:r.includes(s)?o+1:o},0)},ST=e=>{let t=e.pitfalls.map(r=>({pitfall:r,score:VY(e.text,r.keywords)})).filter(r=>r.score>0).sort((r,o)=>o.score-r.score||r.pitfall.id.localeCompare(o.pitfall.id));return t.length===0?[]:fT(t.map(r=>r.pitfall))}});var W1,I1=l(()=>{"use strict";Yc();PT();W1=(e,t)=>{let r=Hn(e,{projectId:t.projectId,includeRetired:!1});return ST({pitfalls:r,text:t.text})}});var O1,M1=l(()=>{"use strict";Pi();O1=`
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
`});var N1,D1,j1,qY,KY,z1,$1,H1=l(()=>{"use strict";N1=g(require("node:fs")),D1=g(require("node:path")),j1=require("node:sqlite");Pi();M1();qY=e=>{let t=e.prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},KY=(e,t)=>{e.prepare(`INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},z1=e=>{N1.default.mkdirSync(D1.default.dirname(e),{recursive:!0});let t=new j1.DatabaseSync(e);return t.exec(`PRAGMA busy_timeout = ${L1}`),t.exec(O1),qY(t)<Jc&&KY(t,Jc),t},$1=e=>{e.close()}});var F1,U1,AT=l(()=>{"use strict";dT();F1=(e,t,r,o)=>{let n=e.prepare(`INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`).get(zr(t),r,o);return{hitCount:n.hit_count,lastSeenAt:n.last_seen_at}},U1=(e,t,r)=>{let o=e.prepare(`SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`).get(zr(t),r);return o===void 0?{hitCount:0,lastSeenAt:null}:{hitCount:o.hit_count,lastSeenAt:o.last_seen_at}}});var B1,G1=l(()=>{"use strict";yT();AT();B1=(e,t)=>{let r=t.id.trim(),o=r.length===0?null:Qf(e,{projectId:t.projectId,id:r});if(o===null)return{ok:!1,reason:"not_found"};let n=t.nowIso??new Date().toISOString(),s=F1(e,t.projectId,o.id,n);return{ok:!0,pitfall:{...o,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt}}}});var bT,_T,wT=l(()=>{"use strict";bT=g(require("node:path"));Le();Pi();_T=e=>e.profileEmail!==null?bT.default.join(e.installDir,Ve,e.profileEmail,Jf):bT.default.join(e.installDir,Jf)});var q1,V1=l(()=>{q1=[{id:"arch-max-lines",symptom:"ci:architecture fails at land (handler >100 / test >100 effective lines)",cause:"Max-effective-lines=100 only enforced late",avoidance:"Run `npm run ci:architecture` before tipping Arch",check:{kind:"command",value:"npm run ci:architecture"},keywords:["architecture","land","ci:architecture","max-effective","lines"],tags:["architecture","ci"]},{id:"symlink-node-modules",symptom:'Turbopack: "points out of the filesystem root"',cause:"Mac worktree with symlinked node_modules",avoidance:"APFS clone: `cp -Rc` (not symlink) into worktree",check:{kind:"id",value:"pit.symlink-node-modules"},keywords:["build","turbopack","symlink","node_modules","filesystem root"],tags:["build"]},{id:"install-bundle-clobber",symptom:"Missing/broken public/install/agent-witch/app/deps.tar.gz or agent-witch.js after build",cause:"Build overwrites install bundle artifacts",avoidance:"Restore those two paths after `build`",check:{kind:"command",value:"test -f public/install/agent-witch/app/deps.tar.gz && test -f public/install/agent-witch/app/agent-witch.js"},keywords:["build","deps.tar.gz","agent-witch.js","install bundle","clobber"],tags:["build","awi"]},{id:"stale-next",symptom:"Typecheck fails spuriously",cause:"Stale .next",avoidance:"`rm -rf .next` then typecheck",check:{kind:"id",value:"pit.stale-next"},keywords:["build","typecheck",".next","stale","turbopack"],tags:["build"]},{id:"main-moved-rebase",symptom:"FF/SHIP fails; main advanced",cause:"main moved between SHIP and FF",avoidance:"`git fetch`; pure-rebase onto new `-rN` branch; **never** force-push",check:{kind:"id",value:"pit.main-moved-rebase"},keywords:["ship","ff","push","rebase","main moved","force-push"],tags:["git"]},{id:"health-lag",symptom:"Declare done on exit 0 / HTTP 200 too early",cause:"Deploy health lags ~1\u20132 min after push",avoidance:"Poll until health `commitSha` == main tip + smoke",check:{kind:"id",value:"pf.health-matches-main"},keywords:["ship","ff","push","health","commitSha","deploy"],tags:["deploy"]},{id:"dirty-home-checkout",symptom:"Accidental reset/clean of ~/daily-magic",cause:"Home checkout left dirty",avoidance:"Use `/tmp` worktrees; never reset/clean home",check:{kind:"id",value:"pit.dirty-home-checkout"},keywords:["reset","clean","home checkout","daily-magic","worktree"],tags:["git"]},{id:"box-no-gh-auth",symptom:"Push from box fails",cause:"Box git has no GitHub auth",avoidance:"Push from the Mac",check:{kind:"id",value:"pit.box-no-gh-auth"},keywords:["ship","ff","push","box","github","auth"],tags:["git"]},{id:"ci-yml-main-only",symptom:"Expecting GH Actions on non-main push",cause:"Old ci.yml push trigger covered only main; CI being removed \u2014 gate is local suite",avoidance:"Run local `npm run ci` (or suite subset); do not wait on Actions",check:{kind:"id",value:"pit.local-suite-gate"},keywords:["ci","actions","github actions","npm run ci","main only"],tags:["ci"]},{id:"secrets-in-logs",symptom:"Secrets printed in logs/CLI",cause:"Verbose dump of env/files",avoidance:"Print existence / path / fingerprint only",check:{kind:"id",value:"pit.secrets-in-logs"},keywords:["secrets","logs","token","keypair","env","fingerprint"],tags:["secrets"]},{id:"no-prs-daily-magic",symptom:"PR windows opened in Mac Chrome",cause:"Habit from other repos",avoidance:"No PRs for daily-magic; never open PR UI",check:{kind:"id",value:"pit.no-prs"},keywords:["pr","pull request","chrome","daily-magic"],tags:["git"]}]});var XY,YY,vT,TT=l(()=>{"use strict";V1();XY=q1,YY=e=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags??[],projectId:null,source:"seed",hitCount:0,lastSeenAt:null,severity:"warn"}),vT=()=>XY.map(YY)});var K1,J1=l(()=>{"use strict";TT();qc();K1=e=>vT().reduce((r,o)=>Si(e,null,o.id)!==null?r:(Bf(e,o),r+1),0)});var X1,Y1,Z1=l(()=>{"use strict";Pi();X1=e=>e.id.trim().length===0?{kind:"empty_id"}:e.projectId.trim().length===0?{kind:"empty_project_id"}:e.symptom.length>Gf?{kind:"field_too_long",field:"symptom",max:Gf}:e.cause.length>Vf?{kind:"field_too_long",field:"cause",max:Vf}:e.avoidance.length>qf?{kind:"field_too_long",field:"avoidance",max:qf}:null,Y1=e=>e.activeCountAfter>Kf?{kind:"active_cap",max:Kf}:null});var Q1,eU=l(()=>{"use strict";qc();AT();Yc();Zf();Z1();Q1=(e,t)=>{let r=X1(t);if(r!==null)return{ok:!1,error:r};let o=t.id.trim(),n=Si(e,t.projectId,o),s=U1(e,t.projectId,o),i=t.source??"project",a={id:o,projectId:t.projectId,symptom:t.symptom,cause:t.cause,avoidance:t.avoidance,check:t.check,keywords:t.keywords,tags:t.tags??[],source:i,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt,severity:t.severity??n?.severity??"warn"},d=Hn(e,{projectId:t.projectId,includeRetired:!0}).filter(S=>S.id!==a.id),u=R1([...d,a]),m=Y1({activeCountAfter:u});return m!==null?{ok:!1,error:m}:(Bf(e,a),{ok:!0,pitfall:a})}});var kT,CT=l(()=>{"use strict";yT();Yc();I1();H1();G1();wT();J1();eU();kT=e=>{let t=e.dbPath??(e.layout!==void 0?_T(e.layout):(()=>{throw new Error("createPitfallRegistry requires dbPath or layout")})()),r=z1(t);return K1(r),{dbPath:t,listPitfalls:o=>x1(r,o),getPitfall:o=>Qf(r,o),upsertPitfall:o=>Q1(r,o),recordHit:o=>B1(r,o),matchPitfalls:o=>W1(r,o),close:()=>$1(r)}}});var ZY,QY,LT,ET=l(()=>{"use strict";Xc();ZY=(e,t,r)=>{let o=t.projectId?.trim();return o!==void 0&&o.length>0?o:r===null||e.resolveProjectId===void 0?null:e.resolveProjectId(r)},QY=(e,t,r,o)=>{for(let n of o)try{t.recordHit({projectId:r,id:n.id})}catch(s){e.logError?.(s)}},LT=(e,t)=>{try{let r=t.cwd?.trim()??"",o=r.length>0?r:null;if(o!==null&&e.isDeclined?.(o)===!0)return{status:"none"};let n=ZY(e,t,o);if(n===null||e.registry===null)return{status:"none",promptCreate:o!==null};let s=e.registry.matchPitfalls({projectId:n,text:t.message??""});return s.length===0?{status:"miss",projectId:n}:(QY(e,e.registry,n,s),{status:"hit",projectId:n,pitfalls:Yf(s)})}catch(r){return e.logError?.(r),{status:"none"}}}});var RT,tU=l(()=>{"use strict";RT={name:"check_context",description:"Match the current prompt against the local pitfall registry. Call on the first user message. Returns status hit|miss|none; miss is silent (0 tokens).",inputSchema:{type:"object",properties:{cwd:{type:"string",description:"Absolute working directory for the current session."},message:{type:"string",description:"User prompt or task text to keyword-match."},sessionId:{type:"string",description:"Optional CLI session id (first-message tracking)."},projectId:{type:"string",description:"Optional Agent Witch project id when already known."}},additionalProperties:!1}}});var Co,eh,xT=l(()=>{"use strict";Co=(e,t)=>{let r=e[t];if(typeof r!="string")return;let o=r.trim();return o.length>0?o:void 0},eh=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return{};let t=e;return{...Co(t,"cwd")!==void 0?{cwd:Co(t,"cwd")}:{},...Co(t,"message")!==void 0?{message:Co(t,"message")}:{},...Co(t,"sessionId")!==void 0?{sessionId:Co(t,"sessionId")}:{},...Co(t,"projectId")!==void 0?{projectId:Co(t,"projectId")}:{}}}});var Zc,WT=l(()=>{"use strict";xt();ET();CT();xT();Zc=e=>{let t=e.logError??(r=>{let o=r instanceof Error?r.message:String(r);console.error(`[agent-witch] check_context: ${o}`)});return r=>{let o=eh(r),n=null;try{return n=kT({layout:e.layout}),LT({registry:n,resolveProjectId:JA,isDeclined:e.isDeclined,logError:t},o)}catch(s){return t(s),{status:"none"}}finally{n?.close()}}}});var eZ,IT,rU=l(()=>{"use strict";WT();xT();eZ="/api/local/check-context",IT=async e=>{if(e.pathname!==eZ)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t={};try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{return e.sendJson(e.response,400,{status:"none"}),!0}let r=Zc({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,r(eh(t))),!0}});var OT=l(()=>{"use strict";CT();wT();PT();Zf();Xc();TT();ET();tU();WT();rU()});var MT,NT,DT=l(()=>{"use strict";MT="2024-11-05",NT={name:"agent-witch",version:"1.0.0"}});var Ai,th,oU,tZ,Qc,nU=l(()=>{"use strict";DT();Ai=(e,t,r)=>({jsonrpc:"2.0",id:e??null,error:{code:t,message:r}}),th=(e,t)=>({jsonrpc:"2.0",id:e??null,result:t}),oU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:null,tZ=(e,t,r)=>{let o=t?.name;if(typeof o!="string")return Ai(e,-32602,"tool name is required");let n=r.tools.find(s=>s.definition.name===o);if(n===void 0)return Ai(e,-32602,`Unknown tool: ${o}`);try{let s=n.call(t?.arguments??{});return th(e,{content:[{type:"text",text:JSON.stringify(s)}],isError:!1})}catch(s){let i=s instanceof Error?s.message:String(s);return Ai(e,-32603,`Tool ${o} failed: ${i}`)}},Qc=(e,t)=>{let r=oU(e);if(r===null)return Ai(null,-32700,"Parse error");let o=r.id??null,n=r.method;return typeof n!="string"?Ai(o,-32600,"Invalid Request"):n==="initialize"?th(o,{protocolVersion:MT,capabilities:{tools:{listChanged:!1}},serverInfo:t.serverInfo}):n==="ping"||n==="notifications/initialized"?th(o,{}):n==="tools/list"?th(o,{tools:t.tools.map(s=>s.definition)}):n==="tools/call"?tZ(o,oU(r.params),t):Ai(o,-32601,"Method not found")}});var rh=l(()=>{"use strict";nU();DT()});var bi,oh=l(()=>{"use strict";OT();rh();bi=e=>({serverInfo:NT,tools:[{definition:RT,call:Zc({layout:e.layout,isDeclined:e.isDeclined})}]})});var sU,rZ,oZ,iU,aU=l(()=>{"use strict";rh();oh();sU=(e,t)=>{let r=JSON.stringify(t);e.write(`Content-Length: ${Buffer.byteLength(r,"utf8")}\r
\r
${r}`)},rZ=async(e,t)=>{let r=Buffer.alloc(0);for await(let o of e.stdin)for(r=Buffer.concat([r,Buffer.isBuffer(o)?o:Buffer.from(String(o),"utf8")]);;){let n=r.indexOf(`\r
\r
`);if(n<0)break;let s=r.subarray(0,n).toString("utf8"),i=/Content-Length:\s*(\d+)/i.exec(s);if(i===null){r=r.subarray(n+4);continue}let a=Number.parseInt(i[1]??"0",10),c=n+4+a;if(r.length<c)break;let d=r.subarray(n+4,c).toString("utf8");r=r.subarray(c);let u;try{u=JSON.parse(d)}catch{u=null}t(u)}},oZ=async(e,t)=>{await rZ(t,r=>{let o=typeof r=="object"&&r!==null?r:null,n=o?.method,s=Qc(r,e);if(typeof n=="string"&&n.startsWith("notifications/")){o?.id!==void 0&&sU(t.stdout,s);return}sU(t.stdout,s)})},iU=async e=>{await oZ(bi({layout:e.layout}),{stdin:process.stdin,stdout:process.stdout})}});var nZ,nh,lU=l(()=>{"use strict";rh();oh();nZ="/mcp",nh=async e=>{if(e.pathname!==nZ)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t=null;try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{t=null}let r=e.server??bi({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,Qc(t,r)),!0}});var cU={};ft(cU,{createAwlMcpServer:()=>bi,runAwlMcpStdio:()=>iU,tryHandleAwlMcpHttpRequest:()=>nh});var jT=l(()=>{"use strict";oh();aU();lU()});var Fn,ed,sZ,iZ,aZ,lZ,dU,uU=l(()=>{"use strict";Fn=g(require("node:fs")),ed=g(require("node:path")),sZ="prompt-optimizer-cycles.json",iZ="prompt-optimizer-preferences.json",aZ="prompt-sdlc-cycles.json",lZ="prompt-sdlc-preferences.json",dU=e=>{let t=ed.default.join(e,sZ),r=ed.default.join(e,aZ);if(Fn.default.existsSync(t)||!Fn.default.existsSync(r))return t;try{Fn.default.renameSync(r,t)}catch{return r}let o=ed.default.join(e,lZ),n=ed.default.join(e,iZ);if(Fn.default.existsSync(o)&&!Fn.default.existsSync(n))try{Fn.default.renameSync(o,n)}catch{}return t}});var _i,cZ,zT,pU=l(()=>{"use strict";_i=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cZ=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],zT=e=>{let t=cZ.map(i=>`<option value="${_i(i.value)}">${_i(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${_i(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${_i(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${_i(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${_i(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var td,fU,dZ,hU,uZ,pZ,yU,ih,mU,gU,mZ,gZ,$r,rd,sh,fZ,ah,$T,hZ,HT,SU,FT,PU,yZ,SZ,PZ,AU,bU,_U,od=l(()=>{"use strict";td=g(require("node:fs")),fU=g(require("node:path")),dZ="estimate-history.ndjson",hU=100,uZ=500,pZ=2e4,yU=e=>fU.default.join(e,dZ),ih=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,uZ),mU=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,pZ),gU=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,mZ=e=>({...e,estimateTokens:gU(e.estimateTokens),actualTokens:gU(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),gZ=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},$r=e=>{let t=yU(e);return td.default.existsSync(t)?td.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return gZ(n)?[mZ(n)]:[]}catch{return[]}}):[]},rd=(e,t)=>{td.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;td.default.writeFileSync(yU(e),r,"utf8")},sh=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),fZ=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${sh(o.task)} | ${sh(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},ah=e=>{let t=$r(e.reportsDir),r=ih(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);rd(e.reportsDir,[...s,n])},$T=e=>{let t=$r(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?ih(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);rd(e.reportsDir,[...i,s])},hZ=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-hU),HT=e=>[...$r(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),SU=e=>{let t=$r(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=mU(e.input),n=mU(e.output),s=ih(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);rd(e.reportsDir,[...c,a])},FT=(e,t)=>{let r=$r(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},PU=e=>({table:fZ(hZ($r(e))),embedding:null}),yZ=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},SZ=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-hU),PZ=e=>{let t=yZ(SZ(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${sh(s.task)} | ${sh(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},AU=e=>{let t=$r(e.reportsDir),r=ih(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);rd(e.reportsDir,[...s,n])},bU=e=>{let t=$r(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);rd(e.reportsDir,[...s,n])},_U=e=>PZ($r(e))});var wU=l(()=>{"use strict";od()});var Hr,UT,AZ,BT,bZ,_Z,lh,ch,wZ,GT,vU=l(()=>{"use strict";wU();ov();Hr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UT=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},AZ=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${UT(-r)} under`:`${UT(r)} over`},BT=e=>e.toLocaleString("en-US"),bZ=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${BT(-r)} under`:`${BT(r)} over`},_Z=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},lh=e=>e===null?"\u2014":UT(e),ch=e=>e===null?"\u2014":BT(e),wZ=`(function () {
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
})();`,GT=e=>{let r=HT(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":AZ(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":bZ(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${Hr(_Z(i))}</button></td>
        <td>${Hr(c)}</td>
        <td>${lh(n.estimateSeconds)}</td>
        <td>${lh(n.actualSeconds)}</td>
        <td>${Hr(d)}</td>
        <td>${ch(n.estimateTokens)}</td>
        <td>${ch(n.actualTokens)}</td>
        <td>${Hr(u)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${Hr(c)}</p>
        <h2>Input</h2>
        <pre>${Hr(i)}</pre>
        <h2>Output</h2>
        <pre>${Hr(a)}</pre>
        <p>Time: estimated ${lh(n.estimateSeconds)} \xB7 actual ${lh(n.actualSeconds)} \xB7 ${Hr(d)}</p>
        <p>Tokens: estimated ${ch(n.estimateTokens)} \xB7 actual ${ch(n.actualTokens)} \xB7 ${Hr(u)}</p>
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
            ${Jg({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${wZ}</script>`}
    </section>`}});var TU=l(()=>{"use strict";pU();vU()});var wi,vZ,TZ,VT,kU=l(()=>{"use strict";wi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vZ=(e,t,r)=>{let o=wi(t),n=wi(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},TZ=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${wi(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>vZ(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${wi(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${wi(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${wi(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},VT=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(TZ).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var CU=l(()=>{"use strict";kU()});var nd,LU,EU,qT,KT,JT,RU=l(()=>{"use strict";nd=g(require("node:fs")),LU=g(require("node:path"));Hl();gg();EU=(e,t,r)=>Bs({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,qT=(e,t,r)=>{let o=EU(e,t,r);if(o===null)return[];if(!nd.default.existsSync(o))return[];let n=nd.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},KT=e=>{let t=EU(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:kr(e.entry.prompt),output:kr(e.entry.output)};nd.default.mkdirSync(LU.default.dirname(t),{recursive:!0}),nd.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},JT=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var kZ,CZ,sd,dh,XT=l(()=>{"use strict";kZ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),CZ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,sd=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=kZ(i.assistantOutput),d=c.length>0?`Assistant: ${CZ(c,t)}`:null,u=[a,d].filter(m=>m!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},dh=e=>{let t=e.userMessage.trim(),r=sd({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var dr,id,QT,LZ,EZ,YT,RZ,ek,uh,xU,WU,xZ,vi,tk,ZT,IU,WZ,OU,Ti,ph,ad,IZ,ld,rk,mh,gh,MU=l(()=>{"use strict";dr=g(require("node:fs")),id=g(require("node:path")),QT=require("node:crypto");XT();LZ="writer-sessions",EZ="active-index.json",YT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),RZ=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ek=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},uh=e=>{let t=id.default.join(e.installDir,LZ);return dr.default.mkdirSync(t,{recursive:!0}),t},xU=e=>id.default.join(uh(e),EZ),WU=(e,t)=>id.default.join(uh(e),`${t}.canonical.json`),xZ=(e,t)=>id.default.join(uh(e),`${t}.continuation.json`),vi=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,tk=e=>{let t=xU(e);if(!dr.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(dr.default.readFileSync(t,"utf8"));if(!YT(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!YT(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!RZ(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},ZT=(e,t)=>{dr.default.writeFileSync(xU(e),JSON.stringify(t,null,2))},IU=(e,t)=>{dr.default.writeFileSync(WU(e,t.sessionId),JSON.stringify(t,null,2))},WZ=(e,t)=>{dr.default.writeFileSync(xZ(e,t.sessionId),JSON.stringify(t,null,2))},OU=(e,t)=>{let r=sd({turns:t.turns});WZ(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Ti=(e,t)=>{let r=WU(e,t);if(!dr.default.existsSync(r))return null;try{let o=JSON.parse(dr.default.readFileSync(r,"utf8"));return!YT(o)||typeof o.sessionId!="string"?null:o}catch{return null}},ph=(e,t=20)=>{let r=uh(e),o=dr.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Ti(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},ad=(e,t,r)=>{let o=ek(r);return tk(e).entries.find(i=>vi(i)===vi({writerAgent:t,projectFolderPath:o}))?.sessionId??null},IZ=(e,t,r,o)=>{let n=tk(e),s=vi({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>vi(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];ZT(e,{entries:i})},ld=(e,t,r)=>{let o=(0,QT.randomUUID)(),n=new Date().toISOString(),s=ek(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return IU(e,i),OU(e,i),IZ(e,t,s,o),o},rk=(e,t,r)=>{let o=ad(e,t,r);return o!==null?o:ld(e,t,r)},mh=(e,t,r)=>{let o=ek(r),n=tk(e);if(o===null&&r===void 0){ZT(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=vi({writerAgent:t,projectFolderPath:o});ZT(e,{entries:n.entries.filter(i=>vi(i)!==s)})},gh=e=>{let t=rk(e.layout,e.writerAgent,e.projectFolderPath),r=Ti(e.layout,t);if(r===null)return;let o={id:(0,QT.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};IU(e.layout,n),OU(e.layout,n)}});var OZ,MZ,fh,ok,NU=l(()=>{"use strict";OZ=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",MZ=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},fh=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",ok=e=>{let t=fh(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=OZ(r,e.userPromptCharacterCount),n=MZ({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var hh=l(()=>{"use strict";RU();MU();XT();NU()});var DU=l(()=>{"use strict";qp();vs();jP()});var jU=l(()=>{"use strict";pP()});var rt,DZ,jZ,nk,sk,ik,zU=l(()=>{"use strict";DU();jU();rt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DZ=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},jZ=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=Ka(o);return`value="${rt(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${rt(r)}"`},nk=(e,t,r,o,n)=>{let s=Kp[t];return`<label class="field">
          <span class="field-label">${rt(o)} API key \u2014 ${rt(DZ(e,t))} \xB7 <a class="field-link" href="${rt(s.href)}" target="_blank" rel="noopener noreferrer">${rt(s.label)}</a></span>
          <input class="input mono" type="password" name="${rt(r)}" autocomplete="off" ${jZ(e,t,n)} />
        </label>`},sk=(e,t,r,o)=>{let n=zp(e[t]?.model),s=new Set(jp[t].map(c=>c.value)),i=jp[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${rt(c.value)}"${d}>${rt(c.label)}</option>`}).join(""),a=n!==on&&!s.has(n)?`<option value="${rt(n)}" selected>${rt(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${rt(o)}</span>
          <select class="input mono" name="${rt(r)}">${i}${a}</select>
        </label>`},ik=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${rt(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${nk(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${sk(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${nk(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${sk(e.secrets,"openai","openaiModel","OpenAI model")}
        ${nk(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${sk(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var $U=l(()=>{"use strict";zU()});var yh,HU,FU=l(()=>{"use strict";yh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HU=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${yh(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${yh(s.name)}</strong> <span class="muted mono">(${yh(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${yh(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var zZ,UU,BU,GU=l(()=>{"use strict";zZ=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,UU=e=>e.kind==="folder",BU=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&UU(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if(UU(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(zZ)};return r(t)}});var VU,ak,qU=l(()=>{"use strict";VU=g(require("node:path")),ak=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${ak(r.children,t)}</ul>
            </details>
          </li>`;let o=VU.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var KU,Lo,$Z,HZ,cd,FZ,lk,JU=l(()=>{"use strict";Pg();KU=g(require("node:path"));FU();GU();qU();Lo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$Z=()=>`(() => {
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

})();`,HZ=()=>`(() => {
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
})();`,cd=e=>{let t=Vl({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=HU({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Lo(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Lo(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':FZ(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Lo(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Lo(s)}" />
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
    <script>${$Z()}</script>
    <script>${HZ()}</script>`;return`${t}${r}${o}${c}${d}`},FZ=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=BU(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:KU.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),u=ak(d,Lo),m=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Lo(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Lo(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${u}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Lo(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},lk=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=a.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??u??a,S=t.sets[i];if(S===void 0)continue;let h=a.length>0?a:S.proposedSlug,y=m.length>0?m:S.proposedName,p=r.has(i),P=S.items.map(A=>({id:A.id,kind:A.kind,title:A.title,sourcePath:A.sourcePath,include:p}));s.push({slug:h,name:y,items:P})}return s}});var XU=l(()=>{"use strict";JU()});var UZ,ck,YU=l(()=>{"use strict";wr();UZ=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[Fe]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},ck=UZ});var BZ,ZU,QU=l(()=>{"use strict";wr();BZ=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[Fe]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},ZU=BZ});var eB=l(()=>{"use strict"});var Un,GZ,dk,tB=l(()=>{"use strict";Pg();XA();Un=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GZ=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,dk=e=>{let t=e.flashError?`<div class="alert-error">${Un(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Un(e.flashMessage)}</div>`:"",r=Vl({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Un(GZ(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${Un(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=Nm(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
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
    </section>`}});var rB=l(()=>{"use strict";eB();Dm();tB()});var Sh,oB=l(()=>{"use strict";Sh=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var nB,Ft,uk=l(()=>{"use strict";nB=g(require("node:path"));ht();Le();B();le();NA();Ft=e=>{let t=$()?.layout.installDir??C();if(nB.default.basename(t)===Bt)return it;let r=$(),o=r!==null?Ee(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):it}});var pk,sB=l(()=>{"use strict";Xt();uk();pk=async e=>{let t=ze(e.installDir),r=t?.bundleVersion??null,o=Ft(t);try{let n=await ys(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Ko(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var mk,iB=l(()=>{"use strict";mk=e=>!e});var gk,ki,fk=l(()=>{"use strict";B();gk=()=>`http://127.0.0.1:${as()}/update/run`,ki=async e=>{try{let t=await fetch(gk(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var VZ,aB,hk,lB=l(()=>{"use strict";B();re();fk();VZ=()=>{hr({launchAgentLabel:fe(),installDir:C()})},aB=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},hk=async()=>{VZ();let e=await ki({force:!0});if(e.ok)return{ok:!0,message:aB(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:aB(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Xt(),Lx)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var yk=l(()=>{"use strict";$_();oB();uk();sB();iB();lB();fk()});var cB,dB=l(()=>{"use strict";cB=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var uB,pB,Sk,Pk,mB=l(()=>{"use strict";uB=require("node:crypto"),pB=g(require("node:fs"));xt();le();le();dB();Sk=!1,Pk=async e=>{if(Sk)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!cB(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&pB.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,uB.randomUUID)();Sk=!0;try{if(await DA(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await ks({...r,workspace:n},e.writerAgent,t);return await hl(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Sk=!1}}});var gB=l(()=>{"use strict";mB()});var bt,qZ,fB,hB,Ak,bk,_k,wk,vk,Tk,kk=l(()=>{"use strict";bt=require("node:crypto"),qZ=Buffer.from("302a300506032b6570032100","hex"),fB=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},hB=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,bt.createPublicKey)({key:Buffer.concat([qZ,t]),format:"der",type:"spki"})},Ak=()=>{let{publicKey:e,privateKey:t}=(0,bt.generateKeyPairSync)("ed25519");return{publicKeyRaw:fB(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},bk=e=>(0,bt.createPrivateKey)(e),_k=(e,t)=>(0,bt.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),wk=(e,t,r)=>{try{let o=hB(e);return(0,bt.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},vk=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,Tk=()=>(0,bt.randomBytes)(32).toString("base64url")});var Fr,Ph,yB,KZ,JZ,Ah,Ck,Lk,SB=l(()=>{"use strict";Fr=g(require("node:fs")),Ph=g(require("node:path"));kk();B();Le();yB=e=>Ph.default.join(e.installDir,Yr),KZ=(e,t)=>{if(e.profileEmail===null||t===yB(e)||Fr.default.existsSync(t))return;let r=yB(e);Fr.default.existsSync(r)&&(Fr.default.mkdirSync(Ph.default.dirname(t),{recursive:!0}),Fr.default.renameSync(r,t))},JZ=e=>{if(!Fr.default.existsSync(e))return null;try{let t=Fr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Ah=e=>{let t=na(e);KZ(e,t);let r=JZ(t);if(r!==null)return r;let o=Ak();return Fr.default.mkdirSync(Ph.default.dirname(t),{recursive:!0}),Fr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},Ck=e=>{let t=Ah(e.layout),r=Tk(),o=vk({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=bk(t.privateKeyPem),s=_k(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Lk=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return wk(e.serverPublicKey,t,e.serverAttestation)}});var Ek=l(()=>{"use strict";SB();kk()});var PB,AB,bB=l(()=>{"use strict";PB=g(require("node:path")),AB=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:PB.default.basename(e.installDir)})});var TB,dd,Wk,Ik,_B,XZ,Rk,bh,ge,kB,YZ,xk,ZZ,QZ,Ok,me,Te,mt,eQ,wB,vB,ud,pd,CB=l(()=>{"use strict";TB=g(require("node:http")),dd=g(require("node:fs")),Wk=g(require("node:path"));_h();jl();MM();DM();UM();tn();f_();j_();hN();SN();b1();OT();jT();uU();TU();CU();hh();$U();XU();uo();xt();wr();YU();QU();rB();yk();Xt();gB();le();Ek();bB();Ik=e=>o_(e)??"never",_B=48e3,XZ=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,Rk=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??wm(),reveal:t.reveal,installed:tr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),bh=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:po(t,e)},ge=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kB=200,YZ=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',xk=e=>{let t=e.trim().slice(0,kB),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},ZZ=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ge(t)}</div>`,QZ=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ge(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',Ok={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},me=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...Ok}),e.end(JSON.stringify(r))},Te=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},mt=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},eQ=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=YZ(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${ge(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=mk(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${zl(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ge(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ge(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ge(Ik(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ge(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},wB=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},vB=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,kB)},ud=e=>{let t=Wk.default.join(e.layout.installDir,"link-code.txt"),r=()=>ze(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:Sh(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),p=await i(),P=B_(p),A=h.updateFlash??null,f=G_(A),b=ZZ(A,h.updateError??null);return F_({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:Ft(y),installBundleVersionLabel:Sh(y),prependBody:`${f}${b}${P}`,headerUpdateButtonHtml:U_(p)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await pk(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:xk("An update is already running.")}),h.end();return}c=!0;try{let p=await hk(),P=p.ok?"/?update=ok":xk(p.message);h.writeHead(303,{Location:P}),h.end()}catch(p){let P=p instanceof Error&&p.message.trim().length>0?p.message:"Install bundle update failed.";h.writeHead(303,{Location:xk(P)}),h.end()}finally{c=!1,a()}},u=async(h,y)=>{let p=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",P=o(),A=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:P.installVersion,body:`<section class="card">
      <h1>${ge(y)}</h1>
      <p>${ge(p)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(A)},m=()=>{if(dd.default.existsSync(t))return dd.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return dd.default.writeFileSync(t,h,"utf8"),h},S=TB.default.createServer((h,y)=>{(async()=>{let p=h.url?.split("?")[0]??"/",P=h.method??"GET";if(P==="OPTIONS"){y.writeHead(204,Ok),y.end();return}if(!await lT({method:P,pathname:p,request:h,response:y,requestUrl:h.url??"/",storePath:dU(Wk.default.dirname(e.layout.configPath)),readBody:mt,sendHtml:Te,renderShell:n})&&!await IT({method:P,pathname:p,request:h,response:y,layout:e.layout,readBody:mt,sendJson:me})&&!await nh({method:P,pathname:p,request:h,response:y,layout:e.layout,readBody:mt,sendJson:me})){if(P==="GET"&&p==="/health"){let A=e.controllers.getStatus(),f=o();me(y,200,{ok:!0,...A,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt,...AB({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(P==="GET"&&p==="/api/status"){let A=o();me(y,200,{...e.controllers.getStatus(),linkCode:m(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt});return}if(P==="GET"&&p==="/api/traffic"){me(y,200,{entries:Nl(e.layout)});return}if(P==="DELETE"&&p==="/api/traffic"||P==="POST"&&p==="/api/traffic/clear"){if(i_(e.layout),P==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}me(y,200,{ok:!0});return}if(P==="GET"&&p==="/api/trace"){me(y,200,{entries:dg(e.layout)});return}if(P==="DELETE"&&p==="/api/trace"||P==="POST"&&p==="/api/trace/clear"){if(c_(e.layout),P==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}me(y,200,{ok:!0});return}if(P==="POST"&&p==="/api/errors/clear"){d_(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(P==="GET"&&p==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let b=await Vs({layout:e.layout,query:f,limit:20});me(y,200,{chunks:b,query:f});return}me(y,200,{chunks:Gs(e.layout).slice(-50).reverse()});return}if(P==="POST"&&p==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(P==="GET"&&p==="/api/update-status"){let A=await i();me(y,200,{ok:!0,...A});return}if((P==="GET"||P==="POST")&&p==="/api/update"){await d(y);return}if(P==="GET"&&p==="/"){let A=e.controllers.getStatus(),f=o(),b=tr(e.layout),w=ug(e.layout.errorLogPath);Te(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:wB(h.url??void 0),updateError:vB(h.url??void 0),body:V_({wsConnected:A.wsConnected,lastHeartbeatAt:A.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:b.sets.length,knowledgeChunkCount:Gs(e.layout).length,trafficEntryCount:Nl(e.layout).length,wakeError:A.wakeError,errorLogByteSize:w.byteSize,errorLogExists:w.exists})}));return}if(P==="GET"&&p==="/task"){let A=e.controllers.getStatus(),f=o(),b=$(),w=new URL(h.url??"/",`http://127.0.0.1:${43347}`),T=w.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,k=w.searchParams.get("failed")==="1"?w.searchParams.get("error")?.trim()??"Task failed.":null,L=w.searchParams.get("runId");Te(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:zT({defaultWorkspace:b?.workspace??"",wsConnected:A.wsConnected,flashMessage:T,flashError:k,lastRunId:L})}));return}if(P==="POST"&&p==="/task/dispatch"){let A=await mt(h),f=new URLSearchParams(A),b=f.get("prompt")?.trim()??"",w=f.get("writerAgent")?.trim()??"claude-cli",T=f.get("projectFolder")?.trim()??"",k=await Pk({prompt:b,writerAgent:w,...T.length>0?{projectFolderPath:T}:{}}),L=new URLSearchParams;k.ok?L.set("ok","1"):(L.set("failed","1"),k.errorMessage!==void 0&&L.set("error",k.errorMessage.slice(0,240))),k.agentRunId!==void 0&&L.set("runId",k.agentRunId),y.writeHead(303,{Location:`/task?${L.toString()}`}),y.end();return}if(P==="GET"&&p==="/writer-sessions"){let A=o(),f=ph(e.layout,12);Te(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:A.installVersion,updateFlash:wB(h.url??void 0),updateError:vB(h.url??void 0),body:VT({sessions:f})}));return}if(P==="GET"&&p==="/errors"){let A=o(),f=ug(e.layout.errorLogPath);Te(y,await n({title:"Errors",activePath:"/errors",installVersion:A.installVersion,body:p_({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(P==="GET"&&p==="/status"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),b=Se(e.layout),w=b!==null?Re(b,12e4):h_(f.lastHeartbeatAt,12e4),T=y_({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:w}),k=o();Te(y,await n({title:"Status",activePath:"/status",installVersion:k.installVersion,body:`${eQ({status:f,healthBadge:T,revived:A.searchParams.get("revived")==="1",linkCode:m(),installBundleVersion:k.installBundleVersion,installBundleUpdatedAt:k.installBundleUpdatedAt})}${A_({installDir:e.layout.installDir})}${P_({entries:dg(e.layout)})}`}));return}if(P==="GET"&&p==="/traffic"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=Nl(e.layout),b=o(),w=f.map(L=>`<tr><td title="${ge(L.at)}">${ge(Ik(L.at))}</td><td>${ge(L.direction)}</td><td><code>${ge(L.type)}</code></td><td>${ge(L.summary)}</td><td>${ge(L.action??"")}</td></tr>`).join(""),T=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${w}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',k=A.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Te(y,await n({title:"Traffic",activePath:"/traffic",installVersion:b.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${k}
              ${T}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(P==="GET"&&p==="/projects"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),b=Ft(f.installVersion),w=await bh(e.layout),T=A.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":A.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,k=A.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,L=$(),x=L===null?null:Y({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),I=x===null?{}:Object.fromEntries((await Promise.all(w.projects.map(async N=>{let U=await ck(x,N.id);return[N.id,U?.counts??null]}))).filter(N=>N[1]!==null));Te(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:dk({projects:w.projects,compositionCountsByProjectId:I,cloudAppOrigin:b,syncMessage:w.message,syncOk:w.ok,flashMessage:k,flashError:T})}));return}if(P==="GET"&&p==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",b=$(),w=b===null?null:Y({wsUrl:b.wsUrl,pairingToken:b.pairingToken}),T=f.length>0&&w!==null?fo():null;if(T===null||w===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(qe({projectFolderPath:T}),!await Al(w,f,T)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(P==="POST"&&p==="/projects/delete"){let A=await mt(h),f=new URLSearchParams(A).get("projectId")?.trim()??"",b=$(),w=b===null?null:Y({wsUrl:b.wsUrl,pairingToken:b.pairingToken});if(w===null||f.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let T=await ib(w,f);y.writeHead(303,{Location:T.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(P==="GET"&&p==="/project"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=A.searchParams.get("id")?.trim()??"",b=o(),w=Ft(b.installVersion),T=await bh(e.layout),k=vr(T.projects,f);if(k===null){await u(y,"Project not found");return}let L=A.searchParams.get("linked")==="1"?A.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${A.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${A.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:A.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,x=A.searchParams.get("knowledgePromoted"),I=x!==null?`Marked ${x} lesson(s) as promoted in Agent Witch.`:null,N=A.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,U=A.searchParams.get("tab")?.trim()??"harness",V=U==="workflows"||U==="agents"||U==="knowledge"?U:"harness",q=$(),Xe=q===null?null:Y({wsUrl:q.wsUrl,pairingToken:q.pairingToken}),H=Xe===null?null:await ck(Xe,k.id),Ce=0;if(Xe!==null)try{let Xr=await fetch(`${Xe.appOrigin}/api/agent-witch/projects/${encodeURIComponent(k.id)}/knowledge`,{method:"GET",headers:{[Fe]:Xe.pairingToken},signal:AbortSignal.timeout(1e4)});if(Xr.ok){let mr=await Xr.json();typeof mr=="object"&&mr!==null&&typeof mr.candidateCount=="number"&&(Ce=mr.candidateCount)}}catch{Ce=0}Te(y,await n({title:k.name,activePath:"/projects",installVersion:b.installVersion,body:mo({project:k,cloudAppOrigin:w,installed:tr(e.layout),linkedSetSlugs:Qt(k.projectFolderPath),composition:H,knowledgeCandidateCount:Ce,activeTab:V,flashMessage:L??I,flashError:N})}));return}if(P==="POST"&&p==="/projects/pull-bound-harness"){let A=await mt(h),f=await YA({rawBody:A,layout:e.layout});if(f.kind==="not_found"){await u(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let b=o();Te(y,await n({title:f.title,activePath:"/projects",installVersion:b.installVersion,body:f.body}));return}if(P==="POST"&&p==="/projects/link-harness"){let A=await mt(h),f=new URLSearchParams(A),b=f.get("projectId")?.trim()??"",w=await bh(e.layout),T=vr(w.projects,b);if(T===null){await u(y,"Project not found");return}let k=f.getAll("applySet").map(V=>String(V)),L=al({layout:e.layout,projectFolderPath:T.projectFolderPath,setSlugs:k});if(!L.ok){let V=o(),q=Ft(V.installVersion);Te(y,await n({title:T.name,activePath:"/projects",installVersion:V.installVersion,body:mo({project:T,cloudAppOrigin:q,installed:tr(e.layout),linkedSetSlugs:Qt(T.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:L.errorMessage})}));return}let x=$(),I=x===null?null:Y({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),N=I===null?!1:await pn(I,T.id,L.appliedSetSlugs),U=new URLSearchParams({linked:"1",files:String(L.writtenFileCount),bindingsSynced:N?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(T.id)}&${U.toString()}`}),y.end();return}if(P==="POST"&&p==="/projects/remove-harness-set"){let A=await mt(h),f=await ZA({rawBody:A,layout:e.layout});if(f.kind==="not_found"){await u(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let b=o();Te(y,await n({title:f.title,activePath:"/projects",installVersion:b.installVersion,body:f.body}));return}if(P==="POST"&&p==="/project/knowledge/promote-all"){let A=await mt(h),b=new URLSearchParams(A).get("projectId")?.trim()??"",w=await bh(e.layout),T=vr(w.projects,b);if(T===null){await u(y,"Project not found");return}let k=$(),L=k===null?null:Y({wsUrl:k.wsUrl,pairingToken:k.pairingToken}),x=L===null?{ok:!1,promotedCount:0}:await ZU(L,T.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(T.id)}&${I.toString()}`}),y.end();return}if(P==="GET"&&p==="/harness"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),b=ul(e.layout),w=A.searchParams.get("submitted")==="1",T=w?A.searchParams.get("syncFailed")==="1"?`Local harness updated (${A.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:A.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${A.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":A.searchParams.get("stopped")==="1"?`Reveal stopped. ${b?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:A.searchParams.get("revealed")==="1"?`Reveal found ${b?.sets.length??0} set(s).`:null,k=b?.scanRoots[0]??wm(),L=XZ(e.layout,{reveal:b,importQuery:A.searchParams.get("import")==="1",justSubmitted:w}),x=Ft(f.installVersion);Te(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:cd(Rk(e.layout,{cloudAppOrigin:x,reveal:b,scanFolder:k,flashMessage:T,importSectionExpanded:L}))}));return}if(P==="POST"&&p==="/api/harness/pick-folder"){let A=fo();if(A===null){me(y,200,{cancelled:!0});return}me(y,200,{path:A});return}if(P==="GET"&&p==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",b=il(f);if(b===null){me(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let w=dd.default.readFileSync(b,"utf8"),T=w.length>_B?`${w.slice(0,_B)}
\u2026 (truncated)`:w;me(y,200,{content:T})}catch{me(y,500,{errorMessage:"Could not read file."})}return}if(P==="POST"&&p==="/api/harness/reveal/add-project"){let A=await mt(h),f="";try{let T=JSON.parse(A);typeof T=="object"&&T!==null&&typeof T.projectPath=="string"&&(f=T.projectPath.trim())}catch{me(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){me(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let b=ul(e.layout),w=kA({reveal:b,projectPath:f});if(w===null||w.sets.length===0){me(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Cm(e.layout,w),me(y,200,{ok:!0,setCount:w.sets.length});return}if(P==="GET"&&p==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){me(y,400,{errorMessage:"Choose a folder to scan first."});return}let b=!1;h.on("close",()=>{b=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...Ok});let w=CA({scanRoot:f,response:y,shouldAbort:()=>b});Cm(e.layout,w),y.end();return}if(P==="POST"&&p==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(P==="POST"&&p==="/harness/submit"){let A=ul(e.layout);if(A===null){let x=o(),I=Ft(x.installVersion);Te(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:cd(Rk(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await mt(h),b=new URLSearchParams(f),w=lk(b,A),T=EA({layout:e.layout,sets:w});if(!T.ok){let x=o(),I=Ft(x.installVersion);Te(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:cd(Rk(e.layout,{cloudAppOrigin:I,reveal:A,flashError:T.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}xA(e.layout);let L=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${T.writtenItemCount??0}${L}`}),y.end();return}if(P==="GET"&&p==="/writer-api"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),b=$()?.writerExecutionBackend??$e(void 0),w=We(e.layout.configPath),T=no(w),k=A.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,L=o();Te(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:L.installVersion,body:ik({writerExecutionBackend:b,secrets:T,flashMessage:k})}));return}if(P==="POST"&&p==="/writer-api"){let A=await mt(h),f=new URLSearchParams(A),b=f.get("writerExecutionBackend")?.trim()??"cli";DP({configPath:e.layout.configPath,writerExecutionBackend:$e(b),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(P==="GET"&&p==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(P==="GET"&&p==="/history"){let A=o();Te(y,await n({title:"History",activePath:"/history",installVersion:A.installVersion,body:GT({reportsDir:e.layout.reportsDir})}));return}if(P==="GET"&&p==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",b=o(),w=k_({layout:e.layout}),T=E_(w),k=f.length>0?await Vs({layout:e.layout,query:f,limit:20}):Gs(e.layout).slice(-50).reverse(),L=k.map(I=>{let N=L_(w,I.id),U=N>0?` \xB7 used in ${N} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ge(I.createdAt)}">${ge(Ik(I.createdAt))}${I.source?` \xB7 ${ge(I.source)}`:""}${U}</div><pre>${ge(I.text)}</pre></article>`}).join(""),x=T.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${T.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ge(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Te(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:b.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ge(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${QZ(f,k.length)}
            </section>${x}${L}`}));return}P==="POST"&&await mt(h),await u(y,"Not found")}})().catch(p=>{console.error("[agent-witch-local-app]",p),y.writeHead(500),y.end("Internal error")})});return S.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),S.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Sr}`)}),S},pd=e=>Ah(e).publicKeyRaw});var _h=l(()=>{"use strict";PM();AM();CB()});var EB={};ft(EB,{runAgentWitchExternalLiveCli:()=>rQ});var Mk,LB,tQ,rQ,RB=l(()=>{"use strict";Mk=g(require("node:fs")),LB=g(require("node:path"));tn();B();re();_h();re();tQ=e=>{let t=LB.default.join(e,"link-code.txt");if(!Mk.default.existsSync(t))return null;let r=Mk.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},rQ=()=>{nt("agent-witch-live");let e=C(),t=O(),r=tQ(e),o=pd(t);ud({layout:t,controllers:{getStatus:()=>{let n=Se(t);return{wsConnected:Na(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{Uo(e)}}})}});var Ur=v((h$e,IB)=>{"use strict";var xB=["nodebuffer","arraybuffer","fragments"],WB=typeof Blob<"u";WB&&xB.push("blob");IB.exports={BINARY_TYPES:xB,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:WB,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var md=v((y$e,wh)=>{"use strict";var{EMPTY_BUFFER:oQ}=Ur(),Nk=Buffer[Symbol.species];function nQ(e,t){if(e.length===0)return oQ;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new Nk(r.buffer,r.byteOffset,o):r}function OB(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function MB(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function sQ(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Dk(e){if(Dk.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Nk(e):ArrayBuffer.isView(e)?t=new Nk(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Dk.readOnly=!1),t}wh.exports={concat:nQ,mask:OB,toArrayBuffer:sQ,toBuffer:Dk,unmask:MB};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");wh.exports.mask=function(t,r,o,n,s){s<48?OB(t,r,o,n,s):e.mask(t,r,o,n,s)},wh.exports.unmask=function(t,r){t.length<32?MB(t,r):e.unmask(t,r)}}catch{}});var jB=v((S$e,DB)=>{"use strict";var NB=Symbol("kDone"),jk=Symbol("kRun"),zk=class{constructor(t){this[NB]=()=>{this.pending--,this[jk]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[jk]()}[jk](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[NB])}}};DB.exports=zk});var Ei=v((P$e,FB)=>{"use strict";var gd=require("zlib"),zB=md(),iQ=jB(),{kStatusCode:$B}=Ur(),aQ=Buffer[Symbol.species],lQ=Buffer.from([0,0,255,255]),Th=Symbol("permessage-deflate"),Br=Symbol("total-length"),Ci=Symbol("callback"),Eo=Symbol("buffers"),Li=Symbol("error"),vh,$k=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!vh){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;vh=new iQ(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Ci];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){vh.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){vh.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?gd.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=gd.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Th]=this,this._inflate[Br]=0,this._inflate[Eo]=[],this._inflate.on("error",dQ),this._inflate.on("data",HB)}this._inflate[Ci]=o,this._inflate.write(t),r&&this._inflate.write(lQ),this._inflate.flush(()=>{let s=this._inflate[Li];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=zB.concat(this._inflate[Eo],this._inflate[Br]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Br]=0,this._inflate[Eo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?gd.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=gd.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Br]=0,this._deflate[Eo]=[],this._deflate.on("data",cQ)}this._deflate[Ci]=o,this._deflate.write(t),this._deflate.flush(gd.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=zB.concat(this._deflate[Eo],this._deflate[Br]);r&&(s=new aQ(s.buffer,s.byteOffset,s.length-4)),this._deflate[Ci]=null,this._deflate[Br]=0,this._deflate[Eo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};FB.exports=$k;function cQ(e){this[Eo].push(e),this[Br]+=e.length}function HB(e){if(this[Br]+=e.length,this[Th]._maxPayload<1||this[Br]<=this[Th]._maxPayload){this[Eo].push(e);return}this[Li]=new RangeError("Max payload size exceeded"),this[Li].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Li][$B]=1009,this.removeListener("data",HB),this.reset()}function dQ(e){if(this[Th]._inflate=null,this[Li]){this[Ci](this[Li]);return}e[$B]=1007,this[Ci](e)}});var Ri=v((A$e,kh)=>{"use strict";var{isUtf8:UB}=require("buffer"),{hasBlob:uQ}=Ur(),pQ=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function mQ(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Hk(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function gQ(e){return uQ&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}kh.exports={isBlob:gQ,isValidStatusCode:mQ,isValidUTF8:Hk,tokenChars:pQ};if(UB)kh.exports.isValidUTF8=function(e){return e.length<24?Hk(e):UB(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");kh.exports.isValidUTF8=function(t){return t.length<32?Hk(t):e(t)}}catch{}});var Vk=v((b$e,XB)=>{"use strict";var{Writable:fQ}=require("stream"),BB=Ei(),{BINARY_TYPES:hQ,EMPTY_BUFFER:GB,kStatusCode:yQ,kWebSocket:SQ}=Ur(),{concat:Fk,toArrayBuffer:PQ,unmask:AQ}=md(),{isValidStatusCode:bQ,isValidUTF8:VB}=Ri(),Ch=Buffer[Symbol.species],_t=0,qB=1,KB=2,JB=3,Uk=4,Bk=5,Lh=6,Gk=class extends fQ{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||hQ[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[SQ]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=_t}_write(t,r,o){if(this._opcode===8&&this._state==_t)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new Ch(o.buffer,o.byteOffset+t,o.length-t),new Ch(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new Ch(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case _t:this.getInfo(t);break;case qB:this.getPayloadLength16(t);break;case KB:this.getPayloadLength64(t);break;case JB:this.getMask();break;case Uk:this.getData(t);break;case Bk:case Lh:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[BB.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=qB:this._payloadLength===127?this._state=KB:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=JB:this._state=Uk}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=Uk}getData(t){let r=GB;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&AQ(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=Bk,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[BB.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===_t&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=_t;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=Fk(o,r):this._binaryType==="arraybuffer"?n=PQ(Fk(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=_t):(this._state=Lh,setImmediate(()=>{this.emit("message",n,!0),this._state=_t,this.startLoop(t)}))}else{let n=Fk(o,r);if(!this._skipUTF8Validation&&!VB(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===Bk||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=_t):(this._state=Lh,setImmediate(()=>{this.emit("message",n,!1),this._state=_t,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,GB),this.end();else{let o=t.readUInt16BE(0);if(!bQ(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new Ch(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!VB(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=_t;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=_t):(this._state=Lh,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=_t,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[yQ]=n,i}};XB.exports=Gk});var Jk=v((w$e,QB)=>{"use strict";var{Duplex:_$e}=require("stream"),{randomFillSync:_Q}=require("crypto"),{types:{isUint8Array:wQ}}=require("util"),YB=Ei(),{EMPTY_BUFFER:vQ,kWebSocket:TQ,NOOP:kQ}=Ur(),{isBlob:xi,isValidStatusCode:CQ}=Ri(),{mask:ZB,toBuffer:Bn}=md(),wt=Symbol("kByteLength"),LQ=Buffer.alloc(4),Eh=8*1024,Gn,Wi=Eh,Ut=0,EQ=1,RQ=2,qk=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Ut,this.onerror=kQ,this[TQ]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||LQ,r.generateMask?r.generateMask(o):(Wi===Eh&&(Gn===void 0&&(Gn=Buffer.alloc(Eh)),_Q(Gn,0,Eh),Wi=0),o[0]=Gn[Wi++],o[1]=Gn[Wi++],o[2]=Gn[Wi++],o[3]=Gn[Wi++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[wt]!==void 0?a=r[wt]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(ZB(t,o,d,s,a),[d]):(ZB(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=vQ;else{if(typeof t!="number"||!CQ(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(wQ(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[wt]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Ut?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):xi(t)?(n=t.size,s=!1):(t=Bn(t),n=t.length,s=Bn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[wt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};xi(t)?this._state!==Ut?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Ut?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):xi(t)?(n=t.size,s=!1):(t=Bn(t),n=t.length,s=Bn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[wt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};xi(t)?this._state!==Ut?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Ut?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[YB.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):xi(t)?(a=t.size,c=!1):(t=Bn(t),a=t.length,c=Bn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[wt]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};xi(t)?this._state!==Ut?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Ut?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[wt],this._state=RQ,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(Kk,this,a,n);return}this._bufferedBytes-=o[wt];let i=Bn(s);r?this.dispatch(i,r,o,n):(this._state=Ut,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(xQ,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[YB.extensionName];this._bufferedBytes+=o[wt],this._state=EQ,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");Kk(this,c,n);return}this._bufferedBytes-=o[wt],this._state=Ut,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Ut&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][wt],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][wt],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};QB.exports=qk;function Kk(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function xQ(e,t,r){Kk(e,t,r),e.onerror(t)}});var lG=v((v$e,aG)=>{"use strict";var{kForOnEventAttribute:fd,kListener:Xk}=Ur(),eG=Symbol("kCode"),tG=Symbol("kData"),rG=Symbol("kError"),oG=Symbol("kMessage"),nG=Symbol("kReason"),Ii=Symbol("kTarget"),sG=Symbol("kType"),iG=Symbol("kWasClean"),Gr=class{constructor(t){this[Ii]=null,this[sG]=t}get target(){return this[Ii]}get type(){return this[sG]}};Object.defineProperty(Gr.prototype,"target",{enumerable:!0});Object.defineProperty(Gr.prototype,"type",{enumerable:!0});var Vn=class extends Gr{constructor(t,r={}){super(t),this[eG]=r.code===void 0?0:r.code,this[nG]=r.reason===void 0?"":r.reason,this[iG]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[eG]}get reason(){return this[nG]}get wasClean(){return this[iG]}};Object.defineProperty(Vn.prototype,"code",{enumerable:!0});Object.defineProperty(Vn.prototype,"reason",{enumerable:!0});Object.defineProperty(Vn.prototype,"wasClean",{enumerable:!0});var Oi=class extends Gr{constructor(t,r={}){super(t),this[rG]=r.error===void 0?null:r.error,this[oG]=r.message===void 0?"":r.message}get error(){return this[rG]}get message(){return this[oG]}};Object.defineProperty(Oi.prototype,"error",{enumerable:!0});Object.defineProperty(Oi.prototype,"message",{enumerable:!0});var hd=class extends Gr{constructor(t,r={}){super(t),this[tG]=r.data===void 0?null:r.data}get data(){return this[tG]}};Object.defineProperty(hd.prototype,"data",{enumerable:!0});var WQ={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[fd]&&n[Xk]===t&&!n[fd])return;let o;if(e==="message")o=function(s,i){let a=new hd("message",{data:i?s:s.toString()});a[Ii]=this,Rh(t,this,a)};else if(e==="close")o=function(s,i){let a=new Vn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Ii]=this,Rh(t,this,a)};else if(e==="error")o=function(s){let i=new Oi("error",{error:s,message:s.message});i[Ii]=this,Rh(t,this,i)};else if(e==="open")o=function(){let s=new Gr("open");s[Ii]=this,Rh(t,this,s)};else return;o[fd]=!!r[fd],o[Xk]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[Xk]===t&&!r[fd]){this.removeListener(e,r);break}}};aG.exports={CloseEvent:Vn,ErrorEvent:Oi,Event:Gr,EventTarget:WQ,MessageEvent:hd};function Rh(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var xh=v((T$e,cG)=>{"use strict";var{tokenChars:yd}=Ri();function ur(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function IQ(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,u=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(u===-1&&yd[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let h=e.slice(c,u);d===44?(ur(t,h,r),r=Object.create(null)):i=h,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(u===-1&&yd[d]===1)c===-1&&(c=m);else if(d===32||d===9)u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m),ur(r,e.slice(c,u),!0),d===44&&(ur(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)a=e.slice(c,m),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(yd[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(yd[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,u=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(u===-1&&yd[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))u===-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let h=e.slice(c,u);o&&(h=h.replace(/\\/g,""),o=!1),ur(r,a,h),d===44&&(ur(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=m);let S=e.slice(c,u);return i===void 0?ur(t,S,r):(a===void 0?ur(r,S,!0):o?ur(r,a,S.replace(/\\/g,"")):ur(r,a,S),ur(t,i,r)),t}function OQ(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}cG.exports={format:OQ,parse:IQ}});var Mh=v((L$e,bG)=>{"use strict";var MQ=require("events"),NQ=require("https"),DQ=require("http"),pG=require("net"),jQ=require("tls"),{randomBytes:zQ,createHash:$Q}=require("crypto"),{Duplex:k$e,Readable:C$e}=require("stream"),{URL:Yk}=require("url"),Ro=Ei(),HQ=Vk(),FQ=Jk(),{isBlob:UQ}=Ri(),{BINARY_TYPES:dG,CLOSE_TIMEOUT:BQ,EMPTY_BUFFER:Wh,GUID:GQ,kForOnEventAttribute:Zk,kListener:VQ,kStatusCode:qQ,kWebSocket:ke,NOOP:mG}=Ur(),{EventTarget:{addEventListener:KQ,removeEventListener:JQ}}=lG(),{format:XQ,parse:YQ}=xh(),{toBuffer:ZQ}=md(),gG=Symbol("kAborted"),Qk=[8,13],Vr=["CONNECTING","OPEN","CLOSING","CLOSED"],QQ=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,ee=class e extends MQ{constructor(t,r,o){super(),this._binaryType=dG[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Wh,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),fG(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){dG.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new HQ({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new FQ(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[ke]=this,s[ke]=this,t[ke]=this,n.on("conclude",ree),n.on("drain",oee),n.on("error",nee),n.on("message",see),n.on("ping",iee),n.on("pong",aee),s.onerror=lee,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",SG),t.on("data",Oh),t.on("end",PG),t.on("error",AG),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Ro.extensionName]&&this._extensions[Ro.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){gt(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,yG(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){eC(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Wh,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){eC(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Wh,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){eC(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Ro.extensionName]||(n.compress=!1),this._sender.send(t||Wh,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){gt(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(ee,"CONNECTING",{enumerable:!0,value:Vr.indexOf("CONNECTING")});Object.defineProperty(ee.prototype,"CONNECTING",{enumerable:!0,value:Vr.indexOf("CONNECTING")});Object.defineProperty(ee,"OPEN",{enumerable:!0,value:Vr.indexOf("OPEN")});Object.defineProperty(ee.prototype,"OPEN",{enumerable:!0,value:Vr.indexOf("OPEN")});Object.defineProperty(ee,"CLOSING",{enumerable:!0,value:Vr.indexOf("CLOSING")});Object.defineProperty(ee.prototype,"CLOSING",{enumerable:!0,value:Vr.indexOf("CLOSING")});Object.defineProperty(ee,"CLOSED",{enumerable:!0,value:Vr.indexOf("CLOSED")});Object.defineProperty(ee.prototype,"CLOSED",{enumerable:!0,value:Vr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(ee.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(ee.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[Zk])return t[VQ];return null},set(t){for(let r of this.listeners(e))if(r[Zk]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[Zk]:!0})}})});ee.prototype.addEventListener=KQ;ee.prototype.removeEventListener=JQ;bG.exports=ee;function fG(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:BQ,protocolVersion:Qk[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!Qk.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${Qk.join(", ")})`);let s;if(t instanceof Yk)s=t;else try{s=new Yk(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let p=new SyntaxError(c);if(e._redirects===0)throw p;Ih(e,p);return}let d=i?443:80,u=zQ(16).toString("base64"),m=i?NQ.request:DQ.request,S=new Set,h;if(n.createConnection=n.createConnection||(i?tee:eee),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new Ro({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=XQ({[Ro.extensionName]:h.offer()})),r.length){for(let p of r){if(typeof p!="string"||!QQ.test(p)||S.has(p))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(p)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let p=n.path.split(":");n.socketPath=p[0],n.path=p[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let p=o&&o.headers;if(o={...o,headers:{}},p)for(let[P,A]of Object.entries(p))o.headers[P.toLowerCase()]=A}else if(e.listenerCount("redirect")===0){let p=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!p||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,p||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=m(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=m(n);n.timeout&&y.on("timeout",()=>{gt(e,y,"Opening handshake has timed out")}),y.on("error",p=>{y===null||y[gG]||(y=e._req=null,Ih(e,p))}),y.on("response",p=>{let P=p.headers.location,A=p.statusCode;if(P&&n.followRedirects&&A>=300&&A<400){if(++e._redirects>n.maxRedirects){gt(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new Yk(P,t)}catch{let w=new SyntaxError(`Invalid URL: ${P}`);Ih(e,w);return}fG(e,f,r,o)}else e.emit("unexpected-response",y,p)||gt(e,y,`Unexpected server response: ${p.statusCode}`)}),y.on("upgrade",(p,P,A)=>{if(e.emit("upgrade",p),e.readyState!==ee.CONNECTING)return;y=e._req=null;let f=p.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){gt(e,P,"Invalid Upgrade header");return}let b=$Q("sha1").update(u+GQ).digest("base64");if(p.headers["sec-websocket-accept"]!==b){gt(e,P,"Invalid Sec-WebSocket-Accept header");return}let w=p.headers["sec-websocket-protocol"],T;if(w!==void 0?S.size?S.has(w)||(T="Server sent an invalid subprotocol"):T="Server sent a subprotocol but none was requested":S.size&&(T="Server sent no subprotocol"),T){gt(e,P,T);return}w&&(e._protocol=w);let k=p.headers["sec-websocket-extensions"];if(k!==void 0){if(!h){gt(e,P,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let L;try{L=YQ(k)}catch{gt(e,P,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(L);if(x.length!==1||x[0]!==Ro.extensionName){gt(e,P,"Server indicated an extension that was not requested");return}try{h.accept(L[Ro.extensionName])}catch{gt(e,P,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Ro.extensionName]=h}e.setSocket(P,A,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Ih(e,t){e._readyState=ee.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function eee(e){return e.path=e.socketPath,pG.connect(e)}function tee(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=pG.isIP(e.host)?"":e.host),jQ.connect(e)}function gt(e,t,r){e._readyState=ee.CLOSING;let o=new Error(r);Error.captureStackTrace(o,gt),t.setHeader?(t[gG]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Ih,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function eC(e,t,r){if(t){let o=UQ(t)?t.size:ZQ(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Vr[e.readyState]})`);process.nextTick(r,o)}}function ree(e,t){let r=this[ke];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[ke]!==void 0&&(r._socket.removeListener("data",Oh),process.nextTick(hG,r._socket),e===1005?r.close():r.close(e,t))}function oee(){let e=this[ke];e.isPaused||e._socket.resume()}function nee(e){let t=this[ke];t._socket[ke]!==void 0&&(t._socket.removeListener("data",Oh),process.nextTick(hG,t._socket),t.close(e[qQ])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function uG(){this[ke].emitClose()}function see(e,t){this[ke].emit("message",e,t)}function iee(e){let t=this[ke];t._autoPong&&t.pong(e,!this._isServer,mG),t.emit("ping",e)}function aee(e){this[ke].emit("pong",e)}function hG(e){e.resume()}function lee(e){let t=this[ke];t.readyState!==ee.CLOSED&&(t.readyState===ee.OPEN&&(t._readyState=ee.CLOSING,yG(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function yG(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function SG(){let e=this[ke];if(this.removeListener("close",SG),this.removeListener("data",Oh),this.removeListener("end",PG),e._readyState=ee.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[ke]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",uG),e._receiver.on("finish",uG))}function Oh(e){this[ke]._receiver.write(e)||this.pause()}function PG(){let e=this[ke];e._readyState=ee.CLOSING,e._receiver.end(),this.end()}function AG(){let e=this[ke];this.removeListener("error",AG),this.on("error",mG),e&&(e._readyState=ee.CLOSING,this.destroy())}});var TG=v((R$e,vG)=>{"use strict";var E$e=Mh(),{Duplex:cee}=require("stream");function _G(e){e.emit("close")}function dee(){!this.destroyed&&this._writableState.finished&&this.destroy()}function wG(e){this.removeListener("error",wG),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function uee(e,t){let r=!0,o=new cee({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(_G,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(_G,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",dee),o.on("error",wG),o}vG.exports=uee});var tC=v((x$e,kG)=>{"use strict";var{tokenChars:pee}=Ri();function mee(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&pee[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}kG.exports={parse:mee}});var IG=v((I$e,WG)=>{"use strict";var gee=require("events"),Nh=require("http"),{Duplex:W$e}=require("stream"),{createHash:fee}=require("crypto"),CG=xh(),qn=Ei(),hee=tC(),yee=Mh(),{CLOSE_TIMEOUT:See,GUID:Pee,kWebSocket:Aee}=Ur(),bee=/^[+/0-9A-Za-z]{22}==$/,LG=0,EG=1,xG=2,rC=class extends gee{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:See,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:yee,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Nh.createServer((o,n)=>{let s=Nh.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=_ee(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=LG}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===xG){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Sd,this);return}if(t&&this.once("close",t),this._state!==EG)if(this._state=EG,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Sd,this):process.nextTick(Sd,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Sd(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",RG);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Kn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Kn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!bee.test(s)){Kn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Kn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Pd(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=hee.parse(c)}catch{Kn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&u!==void 0){let S=new qn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=CG.parse(u);h[qn.extensionName]&&(S.accept(h[qn.extensionName]),m[qn.extensionName]=S)}catch{Kn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(h,y,p,P)=>{if(!h)return Pd(r,y||401,p,P);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return Pd(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[Aee])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>LG)return Pd(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${fee("sha1").update(r+Pee).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),u._protocol=m)}if(t[qn.extensionName]){let m=t[qn.extensionName].params,S=CG.format({[qn.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${S}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",RG),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Sd,this)})),a(u,n)}};WG.exports=rC;function _ee(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Sd(e){e._state=xG,e.emit("close")}function RG(){this.destroy()}function Pd(e,t,r,o){r=r||Nh.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Nh.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Kn(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Kn),e.emit("wsClientError",i,r,t)}else Pd(r,o,n,s)}});var wee,vee,Tee,kee,Cee,Lee,OG,Eee,Ad,MG=l(()=>{wee=g(TG(),1),vee=g(xh(),1),Tee=g(Ei(),1),kee=g(Vk(),1),Cee=g(Jk(),1),Lee=g(tC(),1),OG=g(Mh(),1),Eee=g(IG(),1),Ad=OG.default});var oC,NG=l(()=>{"use strict";oC=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var Ree,nC,DG=l(()=>{"use strict";bp();NG();Ree=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",nC=(e={})=>{let t=e.env??process.env,r=oC(t[Pp]),o=oC(t[Ap]);return{mode:Ree(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var jG=l(()=>{"use strict";bp()});var zG=l(()=>{"use strict";DG();jG()});var sC=l(()=>{"use strict"});var qr,bd=l(()=>{"use strict";qr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Mi,Jn,$G,Wee,iC,aC,HG,FG,lC,UG,_d,cC=l(()=>{"use strict";Mi=g(require("node:fs")),Jn=g(require("node:os")),$G=g(require("node:path"));sC();bd();Wee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),iC=(e=Jn.default.hostname())=>$G.default.join(Jn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),aC=e=>{if(!Mi.default.existsSync(e))return null;try{let t=JSON.parse(Mi.default.readFileSync(e,"utf8"));return!Wee(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},HG=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},FG=(e,t)=>{Mi.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},lC=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??iC(),o=aC(r);if(o!==null&&o.pid!==process.pid&&qr(o.pid)&&HG(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Jn.default.hostname(),macOsUsername:Jn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return FG(r,n),{ok:!0}},UG=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??iC(),o=aC(r);return o!==null&&o.pid!==process.pid&&qr(o.pid)&&HG(o)?{ok:!1}:(FG(r,{hostname:Jn.default.hostname(),macOsUsername:Jn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},_d=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??iC();aC(r)?.pid===process.pid&&Mi.default.existsSync(r)&&Mi.default.unlinkSync(r)}});var dC,wd,Iee,Oee,Mee,Nee,uC,BG=l(()=>{"use strict";dC=require("node:child_process"),wd=g(require("node:path"));bd();pp();Iee=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),Oee=(e,t)=>{if(Iee(e)||!/\bnode\b/.test(e))return!1;let r=wd.default.resolve(t),o=wd.default.join(r,"app",pa),n=wd.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===pa||i==="agent-witch.ts")return e.includes(r);try{let a=wd.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},Mee=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,dC.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},Nee=(e,t,r)=>{let o=Mee(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||Oee(d,t)&&n.push(c)}return n},uC=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,dC.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=Nee(r,e.installDir,t),n=[];for(let s of o)if(qr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var vd,Td,GG,Dee,pC,VG=l(()=>{"use strict";vd=g(require("node:fs")),Td=g(require("node:path"));je();GG=(e,t)=>{!vd.default.existsSync(e)||vd.default.existsSync(t)||(vd.default.mkdirSync(Td.default.dirname(t),{recursive:!0}),vd.default.renameSync(e,t))},Dee=e=>{if(e.profileEmail===null)return;let t=Td.default.join(e.installDir,Tt);GG(Td.default.join(t,Oo),e.mainLogPath),GG(Td.default.join(t,Mo),e.errorLogPath)},pC=e=>{let t=O();e!==void 0&&t.installDir!==e||Dee(t)}});var qG=l(()=>{"use strict";Il();lg();lg();!st()&&qo(__agentWitchImportMetaUrl)&&(async()=>{nt("agent-witch-wake-server");let e=await hn(),t=yr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var KG=l(()=>{"use strict";qG()});var JG=l(()=>{"use strict";_l()});var mC,XG=l(()=>{"use strict";sC();KG();cC();JG();mC=async(e={})=>{let t=e.skipInProcessBridge?null:await ag();Um();let r=setInterval(()=>{Um()},6e4),o=setInterval(()=>{if(!UG().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var kd,Dh,$ee,YG,ZG,jh,QG,e2,gC,t2,zh,r2=l(()=>{"use strict";kd=g(require("node:fs")),Dh=g(require("node:path")),$ee="pending-run-inputs.json",YG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ZG=e=>{let t=e.profileEmail?Dh.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Dh.default.join(t,$ee)},jh=e=>{let t=ZG(e);if(!kd.default.existsSync(t))return{};try{let r=JSON.parse(kd.default.readFileSync(t,"utf8"));return YG(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!YG(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},QG=(e,t)=>{let r=ZG(e);kd.default.mkdirSync(Dh.default.dirname(r),{recursive:!0}),kd.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},e2=e=>Object.values(jh(e)),gC=(e,t)=>jh(e)[t]!==void 0,t2=(e,t)=>{let r=jh(e);r[t.agentRunId]=t,QG(e,r)},zh=(e,t)=>{let r=jh(e);delete r[t],QG(e,r)}});var $h=l(()=>{"use strict";le()});var o2=l(()=>{"use strict";le()});var Hh=l(()=>{"use strict";le()});var Fh=l(()=>{"use strict";le()});var Cd=l(()=>{"use strict";le()});var Hee,Fee,Ld,fC=l(()=>{"use strict";Lt();$h();o2();Hh();Fh();Cd();Hee={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},Fee={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Ld=e=>{if(!he(e.writerAgent))return"the selected writer";let t=at(e.writerAgent);if($e(e.writerExecutionBackend)==="api"&&t!==null){let r=Ye(We(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=$a(t,r.model);return`${Fee[t]} model ${o}`}}return Hee[e.writerAgent]}});var Uee,Bee,n2,s2,i2=l(()=>{"use strict";Uee=/"input_tokens"\s*:\s*(\d+)/,Bee=/"output_tokens"\s*:\s*(\d+)/,n2=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},s2=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=n2(Uee.exec(t)),o=n2(Bee.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var Uh=l(()=>{"use strict";xt()});var Ed,Bh,Gee,hC,a2,l2,c2,yC,d2=l(()=>{"use strict";Ed=g(require("node:fs")),Bh=g(require("node:path"));Uh();Gee="run-completion-outbox.json",hC=e=>{let t=e.profileEmail?Bh.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Bh.default.join(t,Gee)},a2=e=>{let t=hC(e);if(!Ed.default.existsSync(t))return[];try{let r=JSON.parse(Ed.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},l2=(e,t)=>{Ed.default.mkdirSync(Bh.default.dirname(hC(e)),{recursive:!0}),Ed.default.writeFileSync(hC(e),JSON.stringify(t,null,2),"utf8")},c2=(e,t)=>{let r=[...a2(e).filter(o=>o.runId!==t.runId),t];l2(e,r)},yC=async e=>{if(e.cloudApi===null)return;let t=a2(e.layout);if(t.length===0)return;let r=[];for(let o of t)await hl(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);l2(e.layout,r)}});var u2=l(()=>{"use strict"});var SC,Rd,qee,Xn,p2=l(()=>{"use strict";u2();SC=new Map,Rd=e=>{let t=SC.get(e);t!==void 0&&(clearInterval(t),SC.delete(e))},qee=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},Xn=(e,t,r,o={})=>{Rd(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Rd(t);return}let i=o.onTick?.()??{};qee(e,t,n,i)};s(),SC.set(t,setInterval(s,15e3))}});var m2=l(()=>{"use strict";xt()});var g2,f2=l(()=>{"use strict";m2();g2=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:He(t)}});var PC,xd,Kr,AC,pr,h2,Gh=l(()=>{"use strict";PC=new Set,xd=new Map,Kr=(e,t)=>{if(t.length===0)return;let r=xd.get(e)??[];r.push(t),xd.set(e,r)},AC=e=>{PC.add(e);let t=xd.get(e)??[];return xd.delete(e),t},pr=e=>PC.has(e),h2=e=>{PC.delete(e),xd.delete(e)}});var Ni,y2,S2,P2=l(()=>{"use strict";Ni=g(require("node:path")),y2=require("node:url");Vo();S2=()=>{if(st()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Ni.default.dirname(Ni.default.resolve(e)):Ni.default.dirname(Ni.default.resolve(__filename))}return Ni.default.dirname((0,y2.fileURLToPath)(__agentWitchImportMetaUrl))}});var A2,b2,_2,w2,ot,Di,v2,T2,ji,bC,_C,wC,k2,vC,C2,Vh=l(()=>{"use strict";A2=require("node:crypto"),b2=g(require("node:fs")),_2=g(require("node:path")),w2=require("node:url");bd();Vo();P2();ot=new Map,v2=async()=>{if(Di!==void 0)return Di;try{if(st()){let e=S2(),t=_2.default.join(e,"deps","node-pty","lib","index.js");if(b2.default.existsSync(t)){let r=await import((0,w2.pathToFileURL)(t).href);return Di=r,r}}return Di=await import("node-pty"),Di}catch{return Di=null,null}},T2=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},ji=(e,t,r)=>{let o=ot.get(e);if(o!==void 0){ot.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},bC=(e,t)=>{let r=ot.get(e);return r===void 0?!1:(r.pty.write(t),!0)},_C=(e,t,r)=>{let o=ot.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},wC=e=>{for(let t of ot.values())if(!(t.mode!=="agent"||t.runId!==e))return qr(t.pty.pid);return!1},k2=e=>{for(let[t,r]of ot.entries())if(!(r.mode!=="agent"||r.runId!==e)){ot.delete(t);try{r.pty.kill()}catch{}return!0}return!1},vC=async e=>{let t=await v2();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;ot.get(e.shellSessionId)!==void 0&&ji(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return ot.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{T2(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{ot.get(e.shellSessionId)?.pty===n&&(ot.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},C2=async e=>{let t=e.shellSessionId??(0,A2.randomUUID)(),r=await v2();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return ot.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{T2(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{ot.get(t)?.pty===o&&(ot.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var qh,L2,E2=l(()=>{"use strict";qh="[[AWAITING_INPUT]]",L2=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",qh,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Wd,R2,Kh=l(()=>{"use strict";E2();Wd=e=>{let t=e.indexOf(qh);if(t<0)return null;let o=e.slice(t+qh.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},R2=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",L2].join(`
`)});var x2,W2=l(()=>{"use strict";Gh();Vh();Kh();x2=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(pr(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Kr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await C2({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Wd(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var O2,M2,N2,I2,Jr,Jh=l(()=>{"use strict";O2=require("node:child_process"),M2=g(require("node:fs")),N2=g(require("node:path"));pp();I2=12e4,Jr=(e,t)=>{let r=N2.default.join(e,"app",BR,"ensure-writer.sh");return M2.default.existsSync(r)?new Promise((o,n)=>{let s=(0,O2.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},a=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(I2/1e3)}s`))},I2);s.on("error",c=>{clearTimeout(a),n(c)}),s.on("close",c=>{if(clearTimeout(a),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var D2,Yn,Od,Xh,TC,Id,Yh,Zh,kC,CC,Kee,zi,Jee,Xee,LC,EC=l(()=>{"use strict";D2=require("node:child_process");Lt();Jh();Hh();$h();Cd();Fh();Yn=new Map,Od=e=>e==="cursor"||e==="antigravity",Xh=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",TC=e=>Yn.get(e)?.warmed===!0,Id=e=>{let t=Yn.get(e);Yn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Yh=e=>Yn.get(e)?.conversationStarted===!0,Zh=e=>{let t=Yn.get(e);Yn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},kC=e=>{Yn.delete(e)},CC=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",Kee={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},zi=e=>`${Kee[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,Jee=(e,t,r,o)=>new Promise(n=>{let s=Np(t,r),i=[],a=(0,D2.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),Xee=(e,t)=>{let r=zi(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},LC=async e=>{if(!he(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&$e(e.runConfig.writerExecutionBackend)==="api"){let r=at(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=We(e.runConfig.layout.configPath);return Ye(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Id(e.writerAgent),{exitCode:0,output:zi(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Jr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}Od(e.writerAgent)&&Id(e.writerAgent);let t=await Jee(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?Xee(e.writerAgent,t.output):zi(e.writerAgent)}}});var Zn,RC=l(()=>{"use strict";Zn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var j2,Yee,Zee,z2,Qee,xC,$2=l(()=>{"use strict";RC();j2=/you(?:'|')ve hit your session limit/i,Yee=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],Zee=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,z2=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},Qee=e=>{let t=Zee.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},xC=e=>{let t=e.trim();if(t.length===0)return null;if(j2.test(t))return{code:Zn.SESSION_LIMIT,resetHint:Qee(t),matchedLine:z2(t,j2)};for(let r of Yee)if(r.test(t))return{code:Zn.PROVIDER_QUOTA,resetHint:null,matchedLine:z2(t,r)};return null}});var Qh,ey,WC,IC=l(()=>{"use strict";Qh="[[AGENT_RUN_WRITER_EXECUTION]]",ey="cli-writer-api-key-missing",WC="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var OC=l(()=>{"use strict";IC()});var H2=l(()=>{"use strict";OC()});var ty=l(()=>{"use strict";RC();$2();IC();OC();H2()});var ry,F2=l(()=>{"use strict";ry={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var U2,B2=l(()=>{"use strict";U2="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var G2,V2=l(()=>{"use strict";ty();B2();G2=e=>e.code===Zn.SESSION_LIMIT?U2:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var q2,K2=l(()=>{"use strict";ty();F2();V2();q2=e=>{let t=xC(e.output);return t!==null?{status:ry.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:G2(t)}:{status:e.exitCode===0?ry.COMPLETED:ry.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var MC,$Fe,J2=l(()=>{"use strict";MC={OPEN:"open",APPROVAL:"approval"},$Fe=MC.APPROVAL});var $i,oy,X2,rte,Y2,Z2,Q2,Md,NC,DC=l(()=>{"use strict";$i=g(require("node:fs")),oy=g(require("node:path")),X2="runs",rte=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Y2=e=>{let t=e.profileEmail!==null?oy.default.join(e.installDir,"profiles",e.profileEmail,X2):oy.default.join(e.installDir,X2);return $i.default.mkdirSync(t,{recursive:!0}),t},Z2=(e,t)=>oy.default.join(Y2(e),`${t}.json`),Q2=(e,t)=>{$i.default.writeFileSync(Z2(e,t.id),JSON.stringify(t,null,2))},Md=(e,t)=>{let r=Z2(e,t);if(!$i.default.existsSync(r))return null;try{let o=JSON.parse($i.default.readFileSync(r,"utf8"));return!rte(o)||typeof o.id!="string"?null:o}catch{return null}},NC=e=>{let t=Y2(e),r=$i.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=Md(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var ote,e5,t5=l(()=>{"use strict";K2();J2();DC();ote=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=q2({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:MC.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},e5=(e,t)=>{let r=ote(t);return Q2(e,r),r}});var r5=l(()=>{"use strict";hh()});var o5,n5=l(()=>{"use strict";ty();o5=()=>[Qh,`agentRunWriterExecutionBackend=${ey}`,`agentRunWriterExecutionReasonCode=${WC}`].join(`
`)});var xo,ny=l(()=>{"use strict";xo=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var jC,nte,ste,s5,i5=l(()=>{"use strict";jC=e=>e.toLocaleString("en-US"),nte=e=>e<.01?e.toFixed(4):e.toFixed(3),ste=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${nte(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${jC(e.inputTokens)} in / ${jC(e.outputTokens)} out (${jC(e.totalTokens)} total)`,t].join(`
`)},s5=(e,t)=>{if(t===void 0)return e;let r=ste(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var a5=l(()=>{"use strict";le()});var c5,Nd,Pe,zC,sy,l5,ite,ate,d5,u5,p5,Dd,$C,HC,FC,m5,lte,vt,jd,Wo,g5,cte,dte,iy,UC,BC,GC,f5=l(()=>{"use strict";c5=require("node:child_process");le();Lt();r2();od();fC();i2();za();d2();Uh();p2();bd();f2();Gh();Vh();Kh();W2();EC();t5();r5();n5();ny();i5();gs();a5();Cd();ya();Kh();Nd=new Map,Pe=new Map,zC=new Set,sy=new Map,l5=e=>{e!==void 0&&!sy.has(e)&&sy.set(e,Date.now())},ite=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(pr(t)){vt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}Kr(t,n)},ate=(e,t,r,o,n)=>{if(!zP(e,n))return;let s=`${o5()}
`;ite(t,r,o,s);let i=Pe.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},d5=130,u5=`

Stopped by user.`,p5=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:xo(e)},Dd=null,$C=e=>{Dd=e},HC=(e,t)=>{if(Dd===null)return;let r=FT(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||jA(Dd,t,r)},FC=async e=>{await yC({layout:e,cloudApi:Dd})},m5=e=>{let t=Nd.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:qr(t.pid)},lte=e=>ye({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),vt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},jd=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=cs(s),c=Pe.get(r);if(a!==null&&c!==void 0){let d=ex(a),u=m5(r)||wC(r);d!==null&&!u&&Wo(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return QR(a)}}),Wo=(e,t,r,o,n,s,i,a)=>{let c=_s(s,a),d=n,u=s5(c.output,c.llmUsage);if(r!==void 0){let S=sy.get(r);sy.delete(r),S!==void 0&&$T({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let h=s2(c.llmUsage,u);h!==null&&bU({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&zC.has(r)&&(zC.delete(r),d=d5,u=u.trim().length>0&&!u.includes("Stopped by user.")?`${u.trim()}${u5}`:"Stopped by user.");let m=r!==void 0?FT(e.layout.reportsDir,r):null;if(r!==void 0){Rd(r),qa(e.layout,r),pr(r)&&(vt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),h2(r));let S=Pe.get(r);SU({reportsDir:e.layout.reportsDir,agentRunId:r,input:xo(i),output:u,...S!==void 0?{writerLabel:Ld({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&gh({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:u,agentRunId:r}),e5(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:u,layout:e.layout}),c2(e.layout,{runId:r,exitCode:d,output:u,createdAt:new Date().toISOString(),...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{}}),yC({layout:e.layout,cloudApi:Dd}),Pe.delete(r),Nd.delete(r),zh(e.layout,r)}vt(t,{type:"command.claude.result",payload:{exitCode:d,output:u,...r!==void 0?{agentRunId:r}:{},...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),La(e.layout)},g5=(e,t,r,o,n,s,i)=>{let a=Pe.get(r),c=a?.accumulatedOutput??s;t2(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),Xn(t,r,()=>gC(e.layout,r),jd(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),vt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},cte=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,u=h=>{if(!(n===void 0||h.length===0)){if(pr(n)){vt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}Kr(n,h)}};if(n!==void 0){let h=Pe.get(n);Nd.set(n,t),Pe.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),vt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),Xn(r,n,()=>m5(n),jd(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let m=a==="claude-cli",S=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(m?S.push(y):(c.push(y),u(y)),d||n===void 0)return;let p=Wd(c.join(""));if(p!==null){d=!0,t.kill("SIGTERM");let P=Pe.get(n),A=[P?.accumulatedOutput??"",p.partialOutput].filter(f=>f.length>0).join(`

`);P!==void 0&&(P.accumulatedOutput=A),Nd.delete(n),g5(e,r,n,o,p.question,A,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),u(y)}),t.on("close",h=>{if(d)return;Zh(a);let y=n!==void 0?Pe.get(n):void 0,p=m?_s(S.join("")):{output:c.join("").trim(),llmUsage:void 0},P=m?c.join("").trim():"",A=[p.output.trim(),P].filter(b=>b.length>0).join(`
`);m&&p.output.trim().length>0&&u(p.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${A}`.trim():A;Wo(e,r,n,o,h??-1,f,s,p.llmUsage)}),t.on("error",h=>{d||Wo(e,r,n,o,-1,h.message,s)})},dte=(e,t,r,o,n,s,i,a,c)=>{let d=p5(r,c);s!==void 0&&(Pe.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),vt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),Xn(n,s,()=>Pe.has(s),jd(e,n,s,o,i,a))),Ua(e,t,r,m=>{if(!(s===void 0||m.length===0)){if(pr(s)){vt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:m},requestId:o});return}Kr(s,m)}}).then(m=>{Zh(t),Wo(e,n,s,o,m.exitCode,m.output,r,m.llmUsage)}).catch(m=>{let S=m instanceof Error?m.message:String(m);Wo(e,n,s,o,-1,S,r)})},iy=(e,t,r,o,n,s,i,a,c,d,u,m)=>{let S=p5(r,u);if(Ca(e.layout),nn(e,t)){l5(s),dte(e,t,r,o,n,s,c,d,S);return}let h=Yt(t,r,lte(e),i);if(h===null){Wo(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}l5(s);let y=g2({workspace:e.workspace,projectFolderPath:c}),p=()=>{let P=(0,c5.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:m??process.env});cte(e,P,n,o,s,r,S,t)};if(s===void 0){p();return}Pe.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:Pe.get(s)?.accumulatedOutput??""}),ate(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&ha({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),Xn(n,s,()=>Pe.has(s),jd(e,n,s,o,c,d)),x2({socket:n,sendMessage:vt,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:P=>{a!==void 0&&ji(a,b=>{vt(n,b)},o);let A=Pe.get(s),f=[A?.accumulatedOutput??"",P.partialOutput].filter(b=>b.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),g5(e,n,s,o,P.question,f,r)},onFinished:(P,A)=>{Zh(t);let f=_s(A),b=Pe.get(s),w=b!==void 0&&b.accumulatedOutput.length>0?`${b.accumulatedOutput}

${f.output}`.trim():f.output;Wo(e,n,s,o,P,w,r,f.llmUsage)}}).then(P=>{if(!P){p();return}Xn(n,s,()=>wC(s),jd(e,n,s,o,c,d))}).catch(P=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",P instanceof Error?P.message:P),p()})},UC=(e,t,r,o)=>{zh(e.layout,t.agentRunId),t.shellSessionId!==void 0&&vt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=R2(t),s=Pe.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;iy(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},BC=(e,t)=>{for(let r of e2(e.layout))Pe.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:xo(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Xn(t,r.agentRunId,()=>gC(e.layout,r.agentRunId),{awaitingInput:!0}),vt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},GC=(e,t,r,o)=>{let n=Pe.get(r);if(n===void 0)return!1;zC.add(r),Rd(r);let s=Nd.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(k2(r))return!0;zh(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${u5}`:"Stopped by user.";return Wo(e,t,r,o,d5,i,n.originalPrompt),!0}});var ute,VC,h5=l(()=>{"use strict";Za();ute=()=>`http://127.0.0.1:${Et()}/restart`,VC=async()=>{try{let e=await fetch(ute(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var y5=l(()=>{"use strict";jl()});var S5=l(()=>{"use strict";yk()});var P5,A5=l(()=>{"use strict";P5=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var zd,pte,qC,b5=l(()=>{"use strict";B();re();y5();Rb();S5();A5();gs();zd=(e,t)=>{ho(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},pte=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(tP(),eP)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},qC=async e=>{let t=ze(e.layout.installDir)?.bundleVersion??null;if(!P5({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(Ct(e.layout)){Ea({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),zd(e.layout,{summary:r,action:"install-bundle-update-start"}),hr({launchAgentLabel:fe(e.layout.installDir),installDir:e.layout.installDir});let o=await ki({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),zd(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await pte();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),zd(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),zd(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),zd(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var mte,KC,_5=l(()=>{"use strict";mte=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),KC=e=>{if(!mte(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var JC,XC,w5=l(()=>{"use strict";pb();mb();JC=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=wl({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},XC=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Tr(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var v5,gte,fte,hte,$d,T5=l(()=>{"use strict";v5=g(require("node:os"));je();gte="Default",fte=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),hte=e=>{let t=v5.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},$d=()=>{let e=O(),t=oa(e),r=fte(gte);return`${hte(t)}/${r.length>0?r:"project"}`}});var k5=l(()=>{"use strict";jl()});var C5,YC,L5=l(()=>{"use strict";k5();C5=!1,YC=e=>{C5||(C5=!0,process.on("uncaughtException",t=>{Sn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;Sn(e,{kind:"crash",message:r,stack:o})}))}});var E5,yte,ZC,R5=l(()=>{"use strict";E5=require("node:child_process");Jh();Lt();Hh();$h();Cd();Fh();yte=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,E5.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},ZC=async e=>{if(!he(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&$e(e.runConfig.writerExecutionBackend)==="api"){let r=at(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=We(e.layout.configPath),n=Ye(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Jr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await yte(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var QC,x5=l(()=>{"use strict";QC=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var W5,eL,I5=l(()=>{"use strict";W5=require("node:crypto"),eL=()=>(0,W5.randomUUID)()});var Hi,O5,ay=l(()=>{"use strict";Hi="[[WORKING_ESTIMATE]]",O5=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Hi,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var M5,N5=l(()=>{"use strict";M5=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var Ste,D5,j5=l(()=>{"use strict";ay();Ste=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,D5=e=>{if(!e.includes(Hi))return null;let t=null;for(let r of e.matchAll(Ste)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var Pte,tL,z5=l(()=>{"use strict";j5();Pte=/^(\d{1,6})\b/,tL=e=>{let t=D5(e);if(t!==null)return t;let r=Pte.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var Ate,bte,_te,ly,rL=l(()=>{"use strict";Lt();Ml();Ate="http://127.0.0.1:11434",bte=45e3,_te=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},ly=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Ate,o=t===void 0?(await It({commands:ye({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(bte)});return n.ok?_te(await n.json()):null}catch{return null}}});var oL,nL,sL,$5=l(()=>{"use strict";ya();ay();ny();N5();z5();od();rL();oL=async e=>{let t=xo(e.wrappedPrompt),r=PU(e.reportsDir);return{estimateOutput:await ly(O5(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},nL=e=>{let t=tL(e.estimateOutput);t!==null&&ah({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},sL=e=>{let t=tL(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=M5(t);return fa({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Kt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),ah({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var cy,H5,iL=l(()=>{"use strict";cy="[[WORKING_TOKEN_ESTIMATE]]",H5=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",cy,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var F5,wte,U5,B5=l(()=>{"use strict";iL();F5=/^(\d{1,8})\b/,wte=e=>{let t=e.indexOf(cy);if(t<0)return null;let r=e.slice(t+cy.length).trim(),o=F5.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},U5=e=>{let t=wte(e);if(t!==null)return t;let r=F5.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var aL,lL,G5=l(()=>{"use strict";iL();ny();B5();od();rL();aL=async e=>{let t=xo(e.wrappedPrompt),r=_U(e.reportsDir);return{estimateOutput:await ly(H5(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},lL=e=>{let t=U5(e.estimateOutput);return t===null?null:(AU({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var V5=l(()=>{"use strict";cC();BG();VG();XG();Za();f5();Jh();Lt();DC();Gh();h5();Pb();b5();gs();_5();w5();Uh();T5();L5();R5();mp();x5();I5();ay();ya();$5();G5();fC();Ml();Vh();EC()});var q5={};ft(q5,{buildContinuationPromptWithContext:()=>kte});var vte,Tte,kte,K5=l(()=>{"use strict";vte=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Tte=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),kte=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=Tte(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${vte(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var J5={};ft(J5,{readHarnessExportSets:()=>Lte});var Hd,cL,dy,Cte,Lte,X5=l(()=>{"use strict";Hd=g(require("node:fs")),cL=g(require("node:path"));je();dy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Cte=e=>{if(!Hd.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Hd.default.readFileSync(e.harnessManifestPath,"utf8"));if(dy(t))return t}catch{return null}return null},Lte=(e,t)=>{let r=O(t),o=Cte(r);if(o===null)return[];let n=dy(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!dy(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let u of c){if(!dy(u))continue;let m=typeof u.path=="string"?u.path:void 0,S=typeof u.id=="string"?u.id:"",h=typeof u.kind=="string"?u.kind:"",y=typeof u.title=="string"?u.title:"";if(m===void 0||S.length===0||h.length===0||y.length===0)continue;let p=m.startsWith("shared/")?cL.default.join(r.harnessRootDir,m):cL.default.join(r.harnessSetsDir,i,m);Hd.default.existsSync(p)&&d.push({id:S,kind:h,title:y,content:Hd.default.readFileSync(p,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var hL,uL,Fi,Y5,Ete,Z5,Q5,dL,eV,pL,mL,gL,te,J,fL,Rte,Fd,xte,Wte,Ite,Ote,Mte,Nte,Dte,jte,Ud,tV=l(()=>{"use strict";hL=require("node:child_process"),uL=g(require("node:fs")),Fi=g(require("node:os"));MG();B();re();tn();Ek();zG();le();Xt();jl();j_();_h();hh();xt();uo();$b();ht();V5();Y5=3e4,Ete=3e4,Z5=new Map,Q5=new Map,dL=new Map,eV=new Map,pL=new Map,mL=new Map,gL=new Map,te=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),J=(e,t,r)=>{e.readyState===Ad.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(ho(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),cg(r,"out",t)))},fL=e=>e,Rte=e=>{if(!uL.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(uL.default.readFileSync(e.harnessManifestPath,"utf8"));if(te(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Fd=(e,t)=>{let r=Rte(t);r!==null&&J(e,{type:"harness.manifest.report",payload:{hostname:Fi.default.hostname(),manifest:r}})},xte=async(e,t,r,o,n,s,i=!1,a,c,d,u,m)=>{let S=m?.trim()??"";if(!he(t)){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=Ld({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await It({commands:ye({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),p=s!==void 0?oL({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,P=s!==void 0?aL({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=Od(t)&&!TC(t);if(A){try{await Jr(e.layout.installDir,t)}catch(H){let Ce=H instanceof Error?H.message:String(H);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Ce}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Id(t)}else if(!Od(t))try{await Jr(e.layout.installDir,t)}catch(H){let Ce=H instanceof Error?H.message:String(H);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Ce}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Ga(d,$d,m);if(f===null){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}qe({projectFolderPath:f,...S.length>0?{projectId:S}:{}}),i||ld(e.layout,t,f);let b=fh({sessionContinuation:i,supportsWriterSessionContinuation:Xh(t),isWriterConversationStarted:Yh(t)}),w=i&&b==="first"?ad(e.layout,t,f):null,T=w!==null?Ti(e.layout,w):null,k=T!==null&&T.turns.length>0,L=ok({sessionContinuation:i,supportsWriterSessionContinuation:Xh(t),isWriterConversationStarted:Yh(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:k,userPromptCharacterCount:r.length}),x=r;if(L.continuationStrategy==="source_run_seed"){let H=typeof c=="string"&&c.length>0?Md(e.layout,c):null;if(H!==null){let{buildContinuationPromptWithContext:Ce}=await Promise.resolve().then(()=>(K5(),q5));x=Ce({priorPrompt:H.prompt,priorOutput:H.resultOutput??"",userMessage:r})}}else L.continuationStrategy==="transcript_seed"&&T!==null&&T.turns.length>0&&(x=dh({priorTurns:T.turns,userMessage:r}));let I=L.ragLimit>0?await Vs({layout:e.layout,query:x,limit:L.ragLimit,minScore:L.ragMinScore,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],N=L.ragLimit>0&&f.trim().length>0?await N_({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],U=L.injectMemory?qT(e.layout,f,S.length>0?S:void 0):[],V=`${JT(U,L.memoryEntryLimit)}${I_(I)}${D_(N)}${x}`,q=u?.trim()??(s!==void 0&&f.trim().length>0?eL():void 0);if(s!==void 0&&q!==void 0&&q.length>0&&f.trim().length>0){ha({reportKey:q,agentRunId:s,userSummary:"Working on your Mac\u2026"});let H=V;p!==null&&p.then(Ce=>{if(Ce===null)return;let Xr=sL({estimateOutput:Ce.estimateOutput??"",reportKey:q,agentRunId:s,reportsDir:e.layout.reportsDir,task:Ce.task,writerLabel:Ce.writerLabel,embedding:Ce.embedding});if(Xr.estimateSeconds===null)return;HC(e.layout.reportsDir,s);let mr=`${Hi}
${Xr.estimateSeconds}
`;if(pr(s)){J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:mr},requestId:o});return}Kr(s,mr)}).catch(()=>{}),V=QC(H),V=CS(V,{agentRunId:s,reportKey:q,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&p!==null&&p.then(H=>{H!==null&&nL({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel,embedding:H.embedding})}).catch(()=>{}),s!==void 0&&P!==null&&P.then(H=>{H!==null&&lL({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel})}).catch(()=>{});let Xe=s!==void 0&&gL.get(s)===!0;if(s!==void 0&&f.trim().length>0){let H=await Hm(f);mL.set(s,H),q!==void 0&&q.length>0&&pL.set(s,q)}iy(e,t,V,o,fL(n),s,{sessionTurn:L.sessionTurn},a,f,q,r,OP(e.layout,s,Xe)),A&&s!==void 0&&J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:CC(t)},requestId:o})},Wte=async(e,t,r,o,n)=>{let s=(i,a)=>{J(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await LC({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ye({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,J(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=he(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?zi(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},Ite=(e,t,r)=>new Promise(o=>{if(!he(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Yt(t,r,ye({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,hL.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),Ote=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;J(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=er(t.bundle),s=te(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=Ee(e.wsUrl)??it,m=await PA({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=cn({bundle:i,layout:e.layout});return J(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&Fd(o,e.layout),!0},Mte=async(e,t,r,o)=>{if(await Ote(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(J(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!he(n)){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}Ca(e.layout);let i=await(async()=>{try{await Jr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return Ite(e,n,s)})().finally(()=>{La(e.layout)});J(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),Fd(o,e.layout)},Nte=e=>{let t=1e3*2**e;return Math.min(Ete,t)},Dte=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=p=>{if(!t.restartInFlight){if(Ct(e.layout)){Ra(p),console.log(`[agent-witch] Deferring local restart (${p}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${p})\u2026`),t.wakeError=`restart:${p}`,VC().then(P=>{if(P.ok){console.log("[agent-witch] Local restart completed.");return}if(!P.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",P.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(p,P="system.ack")=>{if(!t.selfUpdateInFlight){if(Ct(e.layout)){Ea({layout:e.layout,remoteBundleVersion:p,trigger:P}),console.log(`[agent-witch] Deferring install bundle update (${p} via ${P}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,qC({layout:e.layout,remoteBundleVersion:p,trigger:P}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let p=Se(e.layout);p!==null&&Re(p,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let p=t.socket;t.socket=void 0,t.wsConnected=!1,p.removeAllListeners("open"),p.removeAllListeners("message"),p.removeAllListeners("close"),p.on("error",()=>{}),(p.readyState===Ad.OPEN||p.readyState===Ad.CONNECTING)&&p.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,Y5)},u=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let p=Nte(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${p}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},p)},m=p=>{s();let P=()=>{let A=ba(e.layout.installDir),f=Et();J(p,{type:"agent.heartbeat",payload:{hostname:Fi.default.hostname(),macOsUsername:Fi.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:A}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};P(),t.heartbeatTimer=setInterval(P,Y5)},S=(p,P)=>{if(typeof p.type!="string")return;if(zb(p)){t.stopped=!0,s(),a(),c(),Nb({layout:e.layout}).finally(()=>{_d(),process.exit(0)});return}ho(e.layout,{direction:"in",type:p.type,summary:"inbound WS frame"}),cg(e.layout,"in",p);let A=typeof p.requestId=="string"?p.requestId:void 0;if(p.type==="device.auth.attestation"&&te(p.payload)){let f=typeof p.payload.serverPublicKey=="string"?p.payload.serverPublicKey:"",b=typeof p.payload.origin=="string"?p.payload.origin:"",w=typeof p.payload.devicePublicKey=="string"?p.payload.devicePublicKey:"",T=typeof p.payload.challenge=="string"?p.payload.challenge:"",k=typeof p.payload.serverAttestation=="string"?p.payload.serverAttestation:"";if(!Lk({serverPublicKey:f,origin:b,devicePublicKey:w,challenge:T,serverAttestation:k})){t.wakeError="Server attestation verification failed",ho(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(p.type==="writer.ensure"&&te(p.payload)){let f=typeof p.payload.writerAgent=="string"?p.payload.writerAgent:"";ho(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),ZC({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(b=>{J(P,{type:"writer.status",payload:b},e.layout)})}if(p.type==="install.bundle.update"&&te(p.payload)){let f=typeof p.payload.bundleVersion=="string"?p.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(p.type==="system.ack"){Wp(e.layout,{wsUrl:e.wsUrl});let f=te(p.payload)?p.payload:null,b=KC(f);b!==null&&o(b)}if(p.type==="device.restart"&&r("cloud-device-restart"),p.type==="automations.sync"&&te(p.payload)&&JC(p.payload),p.type==="automations.run"&&te(p.payload)&&XC(p.payload),p.type==="terminal.stream.accepted"&&te(p.payload)){let f=typeof p.payload.runId=="string"?p.payload.runId:"";if(f.length>0){let b=AC(f);for(let w of b)J(P,{type:"terminal.stream.chunk",payload:{runId:f,chunk:w},requestId:A})}}if(p.type==="agent.agentRun.list"&&J(P,{type:"dashboard.agentRun.list.result",payload:{runs:NC(e.layout)},requestId:A}),p.type==="agent.agentRun.get"&&te(p.payload)){let f=typeof p.payload.runId=="string"?p.payload.runId:"",b=f.length>0?Md(e.layout,f):null;J(P,{type:"dashboard.agentRun.get.result",payload:{run:b},requestId:A})}if(p.type==="command.claude.run"&&te(p.payload)){let f=p.payload.prompt,b=typeof p.payload.writerAgent=="string"&&he(p.payload.writerAgent)?p.payload.writerAgent:"claude-cli",w=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,T=p.payload.sessionContinuation===!0,k=typeof p.payload.sourceRunId=="string"?p.payload.sourceRunId:void 0,L=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:void 0,x=typeof p.payload.projectId=="string"?p.payload.projectId:void 0,I=Ga(typeof p.payload.projectFolderPath=="string"?p.payload.projectFolderPath:void 0,$d,x),N=CP(p.payload.compositionSnapshot),U=typeof p.payload.reportKey=="string"?p.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${b} task (${T?"continue":"first"})\u2026`),I===null){J(P,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...w!==void 0?{agentRunId:w}:{}},requestId:A});return}if(N!==null){let V=EP(e.layout,N);if(V!==null){J(P,{type:"command.claude.result",payload:{exitCode:-1,output:V,...w!==void 0?{agentRunId:w}:{}},requestId:A});return}if(w!==void 0){let q=xP(e.layout,w,N);if(!q.ok){J(P,{type:"command.claude.result",payload:{exitCode:-1,output:q.errorMessage,...w!==void 0?{agentRunId:w}:{}},requestId:A});return}gL.set(w,N.entries.some(Xe=>Xe.scope==="run"))}}w!==void 0&&L!==void 0&&Z5.set(w,L),w!==void 0&&(Q5.set(w,I),x!==void 0&&x.trim().length>0&&dL.set(w,x.trim()),eV.set(w,f.trim()),qe({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),xte(e,b,f.trim(),A,P,w,T,L,k,I,U,x)}}if(p.type==="shell.session.open"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",b=typeof p.payload.cols=="number"?p.payload.cols:120,w=typeof p.payload.rows=="number"?p.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),vC({shellSessionId:f,cwd:e.workspace,cols:b,rows:w,send:T=>{J(P,T)},requestId:A}))}if(p.type==="shell.session.close"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"";f.length>0&&ji(f,b=>{J(P,b)},A)}if(p.type==="shell.input"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",b=typeof p.payload.data=="string"?p.payload.data:"";f.length>0&&b.length>0&&bC(f,b)}if(p.type==="shell.resize"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",b=typeof p.payload.cols=="number"?p.payload.cols:0,w=typeof p.payload.rows=="number"?p.payload.rows:0;f.length>0&&b>0&&w>0&&_C(f,b,w)}if(p.type==="command.writer.session.end"&&te(p.payload)){let f=p.payload.writerAgent;typeof f=="string"&&he(f)&&(kC(f),mh(e.layout,f))}if(p.type==="command.writer.session.start"&&te(p.payload)){let f=p.payload.writerAgent,b=typeof p.payload.writerSessionId=="string"?p.payload.writerSessionId:"";typeof f=="string"&&he(f)&&b.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),Wte(e,f,b,A,P))}if(p.type==="command.claude.stop"&&te(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),GC(e,fL(P),f,A))}if(p.type==="command.claude.input_respond"&&te(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"",b=typeof p.payload.response=="string"?p.payload.response.trim():"",w=typeof p.payload.originalPrompt=="string"?p.payload.originalPrompt:"",T=typeof p.payload.partialOutput=="string"?p.payload.partialOutput:"",k=typeof p.payload.question=="string"?p.payload.question:"";f.length>0&&b.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),UC(e,{agentRunId:f,originalPrompt:w,partialOutput:T,question:k,response:b,shellSessionId:Z5.get(f)},A,fL(P)))}if(p.type==="dispatch.approval.required"&&te(p.payload)){let f=typeof p.payload.requesterEmail=="string"?p.payload.requesterEmail:"A teammate",b=typeof p.payload.prompt=="string"?p.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${b}`),process.platform==="darwin"&&(0,hL.spawn)("osascript",["-e",`display notification "${b.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(p.type==="harness.request"&&te(p.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),Mte(e,p.payload,A,P)),p.type==="harness.export.request"&&te(p.payload)){let f=typeof p.payload.borrowerUserId=="string"?p.payload.borrowerUserId:"",b=typeof p.payload.targetDeviceId=="string"?p.payload.targetDeviceId:void 0,w=Array.isArray(p.payload.setSlugs)?p.payload.setSlugs.filter(T=>typeof T=="string"):[];f.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:T}=await Promise.resolve().then(()=>(X5(),J5)),k=T(w,e.email);J(P,{type:"harness.export.result",payload:{success:k.length>0,borrowerUserId:f,...b!==void 0?{targetDeviceId:b}:{},sets:k,errorMessage:k.length>0?void 0:"No readable harness sets were found on this machine."},requestId:A})})()}if(p.type==="harness.manifest.request"&&Fd(P,e.layout),p.type==="command.claude.result"&&te(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,b=typeof p.payload.output=="string"?p.payload.output:"",w=typeof p.payload.exitCode=="number"?p.payload.exitCode:null,T=Ga(f!==void 0?Q5.get(f):void 0,$d),k=f!==void 0?dL.get(f):void 0,L=f!==void 0?eV.get(f)??"":"",x=QA({exitCode:w,output:b});if(x&&T!==null&&W_({layout:e.layout,text:b,source:f??"command.claude.result",projectFolderPath:T,...k!==void 0?{projectId:k}:{}}),w!=null&&w!==0&&b.trim().length>0&&T!==null&&(C_({layout:e.layout,errorText:b,projectFolderPath:T,...k!==void 0?{projectId:k}:{}}),M_({layout:e.layout,text:b,source:f??"command.claude.result.failure",projectFolderPath:T,...k!==void 0?{projectId:k}:{}})),x&&L.trim().length>0&&T!==null&&KT({layout:e.layout,projectFolderPath:T,...k!==void 0?{projectId:k}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:L,output:b,createdAt:new Date().toISOString()}}),f!==void 0&&T!==null){let N=pL.get(f),U=mL.get(f);N!==void 0&&U!==void 0&&Hm(T).then(V=>{let q=ob({before:U,after:V});LS(N,q),mL.delete(f),pL.delete(f)})}if(x&&k!==void 0&&k.trim().length>0){let N=$(),U=N===null?null:Y({wsUrl:N.wsUrl,pairingToken:N.pairingToken});U!==null&&sb(U,k,{...f!==void 0?{sourceRunId:f}:{},lesson:nb({prompt:L,output:b})})}f!==void 0&&(qa(e.layout,f),gL.delete(f),dL.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let p=new Ad(e.wsUrl);t.socket=p,p.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),$C(Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),FC(e.layout);let P=Ee(e.wsUrl)??"http://localhost:3000",A=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=Ck({layout:e.layout,origin:P,...A!==void 0&&A.length>0?{claimToken:A}:{}});J(p,{type:"agent.register",payload:{role:"agent",hostname:Fi.default.hostname(),macOsUsername:Fi.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),Fd(p,e.layout),BC(e,p),m(p)}),p.on("message",P=>{let A=typeof P=="string"?P:P.toString("utf8");try{let f=JSON.parse(A);if(!te(f))return;S(f,p)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),p.on("close",(P,A)=>{s(),t.socket=void 0,t.wsConnected=!1,oP(e.layout),t.reconnectAttempt+=1;let f=typeof A=="string"?A:A.toString("utf8");Sn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:P,reason:f}),console.log("[agent-witch] Disconnected from server."),u()}),p.on("error",P=>{t.wakeError=P.message,Sn(e.layout,{kind:"ws_error",message:P.message,stack:P.stack}),console.error(`[agent-witch] Socket error: ${P.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return KS(()=>{let p=JS();p!==null&&p.layout.installDir===e.layout.installDir&&p.layout.profileEmail===e.layout.profileEmail&&o(p.remoteBundleVersion,p.trigger);let P=XS();P!==null&&r(P)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Na(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:pd(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let p=t.socket;return!t.wsConnected||p===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Fd(p,e.layout),{ok:!0})}}},jte=async()=>{nt("agent-witch");let e=nC(),t=C();lC().ok||(process.platform==="darwin"?(await Uo(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),pC(t);let o=uC({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(hr({launchAgentLabel:fe(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),la());let n=await FP(),s=n[0];s!==void 0&&YC(s.layout);for(let h of n){let y=Ee(h.wsUrl)??it;_a(h.layout.installDir,y)}let i=n.map(h=>Dte(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),_d(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let p=i[y];if(p===void 0)return;let P=Se(h.layout);nP(P,{socketOpen:p.hasMacSocketOpen(),staleAfterMs:12e4})&&p.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(Ct(h)||Cl(h.installDir))},m=await mC({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):ud({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=yr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),ca(),d()});d=()=>{S(),m.stop(),_d(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Ud=jte});var yL=l(()=>{"use strict";tV()});var rV={};ft(rV,{startAgentWitchClient:()=>Ud});var oV=l(()=>{"use strict";yL();yL();Vo();ES();fp();if(!st()&&qo(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(gp(process.argv.slice(e))),Ud()}});TS();ES();Vo();fp();var ox="20.x",nx="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var o3=e=>[`Node.js ${ox} or newer is required (found ${e}).`,nx].join(" "),sx=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${o3(process.version)}
`),process.exit(1))};var zte=async()=>{nt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(tP(),eP)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},$te=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(yO(),hO)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},Hte=async()=>{if(!qo(st()?void 0:__agentWitchImportMetaUrl))return;sx();let e=process.argv.indexOf("report");e>=0&&process.exit(gp(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await zte();return}if(t==="wake"){await $te();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(SM(),yM));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(RB(),EB));o();return}if(t==="mcp"){let{resolveAgentWitchLocalLayout:o}=await Promise.resolve().then(()=>(B(),cR)),{runAwlMcpStdio:n}=await Promise.resolve().then(()=>(jT(),cU));await n({layout:o()});return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(oV(),rV));await r()};Hte();
