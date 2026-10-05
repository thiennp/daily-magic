#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var IV=Object.create;var Ay=Object.defineProperty;var OV=Object.getOwnPropertyDescriptor;var MV=Object.getOwnPropertyNames;var NV=Object.getPrototypeOf,DV=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var v=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},ft=(e,t)=>{for(var r in t)Ay(e,r,{get:t[r],enumerable:!0})},jV=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of MV(t))!DV.call(e,n)&&n!==r&&Ay(e,n,{get:()=>t[n],enumerable:!(o=OV(t,n))||o.enumerable});return e};var g=(e,t,r)=>(r=e!=null?IV(NV(e)):{},jV(t||!e||!e.__esModule?Ay(r,"default",{value:e,enumerable:!0}):r,e));var Ki,xL,WL,Ji,by,mre,IL,Yd,Bt,gr,Zd,Qd,os,ns,Ve,_y,eu,tu,ru,Xi,Tt,No,Do,Yi,Yr,wy,OL,Le=l(()=>{"use strict";Ki={production:".agent-witch",localhost:".local-agent-witch"},xL={production:47892,localhost:47893},WL={production:"com.agent-witch",localhost:"com.local-agent-witch"},Ji={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},by="app",mre=`${by}/agent-witch.js`,IL=`${by}/command`,Yd={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Bt=Ki.production,gr=Ki.localhost,Zd=xL.production,Qd=xL.localhost,os=WL.production,ns=WL.localhost,Ve="profiles",_y=Ji.activeProfile,eu="harness",tu="sets",ru="manifest.json",Xi=Yd.projectsDir,Tt=Yd.logsDir,No="agent-witch.log",Do="agent-witch.error.log",Yi=Yd.reportsDir,Yr=Yd.deviceKeypairJson,wy=by,OL="agent-witch.js"});var ML=l(()=>{"use strict";Le()});var NL,Zr,Zi,ou=l(()=>{"use strict";NL=g(require("node:path"));Le();Zr=e=>NL.default.basename(e)===gr,Zi=e=>Zr(e)?ns:os});var DL=l(()=>{"use strict";ML();ou()});var jL,vy,zV,Qi,$V,HV,zL,FV,UV,$L=l(()=>{"use strict";DL();Le();jL=g(require("node:os")),vy=g(require("node:path")),zV=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?vy.default.resolve(e):vy.default.join(jL.default.homedir(),Bt)},Qi=Zi(zV()),$V=`${Qi}-wake`,HV=`${Qi}-live`,zL=`${Qi}-watchdog`,FV=`${Qi}-automation-scheduler`,UV=`${Qi}-updater`});var ss=v(Ty=>{"use strict";Object.defineProperty(Ty,"__esModule",{value:!0});Ty.stringify=BV;function BV(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var M=v(Cy=>{"use strict";Object.defineProperty(Cy,"__esModule",{value:!0});Cy.generateTypeGuardError=GV;var HL=ss();function GV(e,t,r){return(0,HL.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,HL.stringify)(e)}) to be "${r}"`}});var Qr=v(nu=>{"use strict";Object.defineProperty(nu,"__esModule",{value:!0});nu.isNonNullObject=void 0;var VV=M(),qV=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,VV.generateTypeGuardError)(e,t.identifier,"non-null object")),r};nu.isNonNullObject=qV});var Gt=v(Ae=>{"use strict";Object.defineProperty(Ae,"__esModule",{value:!0});Ae.attachTypeGuardMeta=Ae.isArrayTypeGuard=Ae.isNestedObjectTypeGuard=Ae.getTypeGuardWrapperKind=Ae.getTypeGuardInnerGuard=Ae.getTypeGuardItemGuard=Ae.getTypeGuardSchema=void 0;var KV=e=>e.schema;Ae.getTypeGuardSchema=KV;var JV=e=>e.itemGuard;Ae.getTypeGuardItemGuard=JV;var XV=e=>e.innerGuard;Ae.getTypeGuardInnerGuard=XV;var YV=e=>e.wrapperKind;Ae.getTypeGuardWrapperKind=YV;var ZV=e=>{if((0,Ae.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};Ae.isNestedObjectTypeGuard=ZV;var QV=e=>{if((0,Ae.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};Ae.isArrayTypeGuard=QV;var eq=(e,t)=>Object.assign(e,t);Ae.attachTypeGuardMeta=eq});var ea=v(jo=>{"use strict";Object.defineProperty(jo,"__esModule",{value:!0});jo.getExpectedTypeName=jo.getTypeGuardDisplayName=void 0;var FL=Gt(),tq=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};jo.getTypeGuardDisplayName=tq;var rq=e=>{let t=(0,FL.getTypeGuardWrapperKind)(e),r=(0,FL.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,jo.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};jo.getExpectedTypeName=rq});var zo=v(su=>{"use strict";Object.defineProperty(su,"__esModule",{value:!0});su.createValidationResult=void 0;var oq=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});su.createValidationResult=oq});var is=v(iu=>{"use strict";Object.defineProperty(iu,"__esModule",{value:!0});iu.createValidationError=void 0;var nq=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});iu.createValidationError=nq});var as=v(au=>{"use strict";Object.defineProperty(au,"__esModule",{value:!0});au.createTreeNode=void 0;var sq=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});au.createTreeNode=sq});var ta=v(lu=>{"use strict";Object.defineProperty(lu,"__esModule",{value:!0});lu.combineResults=void 0;var iq=zo(),aq=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,iq.createValidationResult)(r,o,n)};lu.combineResults=aq});var du=v(cu=>{"use strict";Object.defineProperty(cu,"__esModule",{value:!0});cu.createSimplifiedTree=void 0;var UL=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=UL(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},lq=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=UL(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};cu.createSimplifiedTree=lq});var oa=v(pu=>{"use strict";Object.defineProperty(pu,"__esModule",{value:!0});pu.validateObject=void 0;var cq=Qr(),ra=zo(),dq=is(),uu=as(),uq=ta(),BL=mu(),pq=(e,t,r)=>{let o=()=>{let i=(0,dq.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,uu.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,ra.createValidationResult)(!1,[],a):(0,ra.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,ra.createValidationResult)(!0,[],(0,uu.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...u]=c,m=d,S=t[m],h=e[m],y=(0,BL.validateProperty)(m,h,S,r);return y.valid?u.length===0?(0,ra.createValidationResult)(!0,[],(0,uu.createTreeNode)(r.path,!0,"object",e)):a(u):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,BL.validateProperty)(d,e[d],u,r)}),a=(0,uq.combineResults)(i,r.path),c=(0,uu.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,ra.createValidationResult)(a.valid,a.errors,c)};return(0,cq.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};pu.validateObject=pq});var VL=v(hu=>{"use strict";Object.defineProperty(hu,"__esModule",{value:!0});hu.validateArray=void 0;var mq=ss(),gu=zo(),GL=is(),fu=as(),gq=ta(),fq=oa(),hq=ea(),yq=Gt(),Sq=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,GL.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,fu.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,gu.createValidationResult)(!1,[c],d)}let n=(0,yq.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,m={path:u,config:r.config||null};if(n)return(0,fq.validateObject)(c,n,m);let S=t(c,null),h=(0,hq.getExpectedTypeName)(t),y=(0,mq.stringify)(c);if(S)return(0,gu.createValidationResult)(!0,[],(0,fu.createTreeNode)(u,!0,h,c));let p=y.length>200?`Expected ${u} to be "${h}"`:`Expected ${u} (${y}) to be "${h}"`,P=(0,GL.createValidationError)(u,h,c,p),A=(0,fu.createTreeNode)(u,!1,h,c);return A.errors=[P],(0,gu.createValidationResult)(!1,[P],A)}),i=(0,gq.combineResults)(s,o),a=(0,fu.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,gu.createValidationResult)(i.valid,i.errors,a)};hu.validateArray=Sq});var mu=v(Su=>{"use strict";Object.defineProperty(Su,"__esModule",{value:!0});Su.validateProperty=void 0;var qL=zo(),Pq=is(),KL=as(),Aq=ea(),yu=Gt(),bq=oa(),_q=VL(),wq=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,yu.getTypeGuardSchema)(r),c=(0,yu.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,bq.validateObject)(t,a,s);if(c&&(0,yu.isArrayTypeGuard)(r))return(0,_q.validateArray)(t,c,s)}let d=u=>{let m=r(t,u),S=(0,Aq.getExpectedTypeName)(r);return m?(0,qL.createValidationResult)(!0,[],(0,KL.createTreeNode)(n,!0,S,t)):(()=>{let h=(0,Pq.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,KL.createTreeNode)(n,!1,S,t);return y.errors=[h],(0,qL.createValidationResult)(!1,[h],y)})()};if((0,yu.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};Su.validateProperty=wq});var Au=v(Pu=>{"use strict";Object.defineProperty(Pu,"__esModule",{value:!0});Pu.isNil=void 0;var vq=M(),Tq=function(e,t){return e!=null?(t&&t.callbackOnError((0,vq.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Pu.isNil=Tq});var ky=v(bu=>{"use strict";Object.defineProperty(bu,"__esModule",{value:!0});bu.isDefined=void 0;var Cq=M(),kq=Au(),Lq=function(e,t){return(0,kq.isNil)(e,null)?(t&&t.callbackOnError((0,Cq.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};bu.isDefined=Lq});var Ly=v(_u=>{"use strict";Object.defineProperty(_u,"__esModule",{value:!0});_u.reportValidationResults=void 0;var Eq=du(),JL=ky(),Rq=Au(),xq=(e,t)=>{if(e.valid===!0||(0,Rq.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,JL.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,Eq.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,JL.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};_u.reportValidationResults=xq});var Ey=v(ne=>{"use strict";Object.defineProperty(ne,"__esModule",{value:!0});ne.Validation=ne.reportValidationResults=ne.validateObject=ne.validateProperty=ne.createSimplifiedTree=ne.combineResults=ne.createTreeNode=ne.createValidationError=ne.createValidationResult=ne.getExpectedTypeName=void 0;var Wq=ea();Object.defineProperty(ne,"getExpectedTypeName",{enumerable:!0,get:function(){return Wq.getExpectedTypeName}});var Iq=zo();Object.defineProperty(ne,"createValidationResult",{enumerable:!0,get:function(){return Iq.createValidationResult}});var Oq=is();Object.defineProperty(ne,"createValidationError",{enumerable:!0,get:function(){return Oq.createValidationError}});var Mq=as();Object.defineProperty(ne,"createTreeNode",{enumerable:!0,get:function(){return Mq.createTreeNode}});var Nq=ta();Object.defineProperty(ne,"combineResults",{enumerable:!0,get:function(){return Nq.combineResults}});var Dq=du();Object.defineProperty(ne,"createSimplifiedTree",{enumerable:!0,get:function(){return Dq.createSimplifiedTree}});var jq=mu();Object.defineProperty(ne,"validateProperty",{enumerable:!0,get:function(){return jq.validateProperty}});var zq=oa();Object.defineProperty(ne,"validateObject",{enumerable:!0,get:function(){return zq.validateObject}});var $q=Ly();Object.defineProperty(ne,"reportValidationResults",{enumerable:!0,get:function(){return $q.reportValidationResults}});var Hq=zo(),Fq=ta(),Uq=is(),Bq=as(),Gq=mu(),Vq=oa(),qq=Ly(),Kq=du();ne.Validation={result:Hq.createValidationResult,combine:Fq.combineResults,error:Uq.createValidationError,treeNode:Bq.createTreeNode,property:Gq.validateProperty,object:Vq.validateObject,report:qq.reportValidationResults,createSimplifiedTree:Kq.createSimplifiedTree}});var wu=v(Ry=>{"use strict";Object.defineProperty(Ry,"__esModule",{value:!0});Ry.isType=Xq;var XL=Qr(),YL=Ey(),Jq=Gt();function Xq(e){if(!(0,XL.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,YL.validateObject)(r,e,s);return(0,YL.reportValidationResults)(i,o||null),i.valid}return(0,XL.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,Jq.attachTypeGuardMeta)(t,{schema:e})}});var tE=v($o=>{"use strict";Object.defineProperty($o,"__esModule",{value:!0});$o.isNestedType=$o.isShape=void 0;$o.isSchema=na;var ZL=Qr(),QL=Ey(),eE=Gt();function na(e){if(!(0,ZL.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=Zq(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,QL.validateObject)(o,t,i);return(0,QL.reportValidationResults)(a,n||null),a.valid}return(0,ZL.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,eE.attachTypeGuardMeta)(r,{schema:t})}function Yq(e){return typeof e=="function"?e:Array.isArray(e)?Qq(e):typeof e=="object"&&e!==null?na(e):e}function Zq(e){let t={};for(let[r,o]of Object.entries(e))t[r]=Yq(o);return t}function Qq(e){let t=e[0],r=na(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,eE.attachTypeGuardMeta)(o,{itemGuard:r})}$o.isShape=na;$o.isNestedType=na});var rE=v(xy=>{"use strict";Object.defineProperty(xy,"__esModule",{value:!0});xy.isObjectWith=tK;var eK=wu();function tK(e){return(0,eK.isType)(e)}});var oE=v(Wy=>{"use strict";Object.defineProperty(Wy,"__esModule",{value:!0});Wy.isObject=oK;var rK=wu();function oK(e){return(0,rK.isType)(e)}});var nE=v(Iy=>{"use strict";Object.defineProperty(Iy,"__esModule",{value:!0});Iy.guardWithTolerance=nK;function nK(e,t,r){return t(e,r),e}});var sE=v(Oy=>{"use strict";Object.defineProperty(Oy,"__esModule",{value:!0});Oy.isBranded=iK;var sK=M();function iK(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,sK.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var iE=v(vu=>{"use strict";Object.defineProperty(vu,"__esModule",{value:!0});vu.BrandSymbols=void 0;vu.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var aE=v(Tu=>{"use strict";Object.defineProperty(Tu,"__esModule",{value:!0});Tu.isAny=void 0;var aK=function(e){return!0};Tu.isAny=aK});var sa=v(My=>{"use strict";Object.defineProperty(My,"__esModule",{value:!0});My.reportTypeGuardError=cK;var lK=M();function cK(e,t,r){e&&e.callbackOnError((0,lK.generateTypeGuardError)(t,e.identifier,r))}});var lE=v(Cu=>{"use strict";Object.defineProperty(Cu,"__esModule",{value:!0});Cu.isBoolean=void 0;var dK=sa(),uK=function(t,r){return typeof t!="boolean"?((0,dK.reportTypeGuardError)(r,t,"boolean"),!1):!0};Cu.isBoolean=uK});var cE=v(ku=>{"use strict";Object.defineProperty(ku,"__esModule",{value:!0});ku.isDate=void 0;var pK=M(),mK=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,pK.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};ku.isDate=mK});var Ny=v(Lu=>{"use strict";Object.defineProperty(Lu,"__esModule",{value:!0});Lu.isNumber=void 0;var gK=sa(),fK=function(t,r){return typeof t!="number"||isNaN(t)?((0,gK.reportTypeGuardError)(r,t,"number"),!1):!0};Lu.isNumber=fK});var dE=v(Eu=>{"use strict";Object.defineProperty(Eu,"__esModule",{value:!0});Eu.isString=void 0;var hK=sa(),yK=function(t,r){return typeof t!="string"?((0,hK.reportTypeGuardError)(r,t,"string"),!1):!0};Eu.isString=yK});var uE=v(Ru=>{"use strict";Object.defineProperty(Ru,"__esModule",{value:!0});Ru.isUnknown=void 0;var SK=function(e){return!0};Ru.isUnknown=SK});var pE=v(xu=>{"use strict";Object.defineProperty(xu,"__esModule",{value:!0});xu.isFunction=void 0;var PK=M(),AK=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,PK.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};xu.isFunction=AK});var gE=v(Wu=>{"use strict";Object.defineProperty(Wu,"__esModule",{value:!0});Wu.isFile=void 0;var mE=M(),bK=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,mE.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,mE.generateTypeGuardError)(e,t.identifier,"File")),!1)};Wu.isFile=bK});var hE=v(Iu=>{"use strict";Object.defineProperty(Iu,"__esModule",{value:!0});Iu.isFileList=void 0;var fE=M(),_K=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,fE.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,fE.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Iu.isFileList=_K});var SE=v(Ou=>{"use strict";Object.defineProperty(Ou,"__esModule",{value:!0});Ou.isBlob=void 0;var yE=M(),wK=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,yE.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,yE.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Ou.isBlob=wK});var AE=v(Mu=>{"use strict";Object.defineProperty(Mu,"__esModule",{value:!0});Mu.isFormData=void 0;var PE=M(),vK=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,PE.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,PE.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Mu.isFormData=vK});var _E=v(Nu=>{"use strict";Object.defineProperty(Nu,"__esModule",{value:!0});Nu.isURL=void 0;var bE=M(),TK=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,bE.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,bE.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Nu.isURL=TK});var vE=v(Du=>{"use strict";Object.defineProperty(Du,"__esModule",{value:!0});Du.isURLSearchParams=void 0;var wE=M(),CK=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,wE.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,wE.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Du.isURLSearchParams=CK});var TE=v(ju=>{"use strict";Object.defineProperty(ju,"__esModule",{value:!0});ju.isMap=void 0;var kK=M(),LK=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,kK.generateTypeGuardError)(e,t.identifier,"Map")),!1)};ju.isMap=LK});var CE=v(zu=>{"use strict";Object.defineProperty(zu,"__esModule",{value:!0});zu.isSet=void 0;var EK=M(),RK=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,EK.generateTypeGuardError)(e,t.identifier,"Set")),!1)};zu.isSet=RK});var kE=v(Dy=>{"use strict";Object.defineProperty(Dy,"__esModule",{value:!0});Dy.isIndexSignature=WK;var xK=M();function WK(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,xK.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,u)=>{let m=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),h=t(m,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return S&&h})}}});var LE=v($u=>{"use strict";Object.defineProperty($u,"__esModule",{value:!0});$u.isError=void 0;var IK=sa(),OK=function(t,r){return t instanceof Error?!0:((0,IK.reportTypeGuardError)(r,t,"Error"),!1)};$u.isError=OK});var zy=v(jy=>{"use strict";Object.defineProperty(jy,"__esModule",{value:!0});jy.isArrayWithEachItem=DK;var MK=M(),NK=Gt();function DK(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,MK.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,NK.attachTypeGuardMeta)(t,{itemGuard:e})}});var $y=v(Hu=>{"use strict";Object.defineProperty(Hu,"__esModule",{value:!0});Hu.isNonEmptyArray=void 0;var jK=M(),zK=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,jK.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Hu.isNonEmptyArray=zK});var EE=v(Hy=>{"use strict";Object.defineProperty(Hy,"__esModule",{value:!0});Hy.isNonEmptyArrayWithEachItem=FK;var $K=zy(),HK=$y();function FK(e){return function(t,r){return(0,$K.isArrayWithEachItem)(e)(t,r)&&(0,HK.isNonEmptyArray)(t,r)}}});var xE=v(Fy=>{"use strict";Object.defineProperty(Fy,"__esModule",{value:!0});Fy.isTuple=UK;var RE=M();function UK(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,RE.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,RE.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var WE=v(Uy=>{"use strict";Object.defineProperty(Uy,"__esModule",{value:!0});Uy.isObjectWithEachItem=GK;var BK=M();function GK(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,BK.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var IE=v(By=>{"use strict";Object.defineProperty(By,"__esModule",{value:!0});By.isPartialOf=qK;var VK=Qr();function qK(e){return function(t,r){if(!(0,VK.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var OE=v(Gy=>{"use strict";Object.defineProperty(Gy,"__esModule",{value:!0});Gy.isPick=JK;var KK=Qr();function JK(e,...t){return function(r,o){if(!(0,KK.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var ME=v(Vy=>{"use strict";Object.defineProperty(Vy,"__esModule",{value:!0});Vy.isOmit=YK;var XK=Qr();function YK(e,...t){return function(r,o){if(!(0,XK.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),m=u.indexOf(" ("),S=m>=0?u.slice(0,m):u;if(a.has(S))return!1;let h=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var NE=v(Fu=>{"use strict";Object.defineProperty(Fu,"__esModule",{value:!0});Fu.isNonEmptyString=void 0;var ZK=M(),QK=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,ZK.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Fu.isNonEmptyString=QK});var DE=v(Uu=>{"use strict";Object.defineProperty(Uu,"__esModule",{value:!0});Uu.isNonNegativeNumber=void 0;var e4=M(),t4=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,e4.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Uu.isNonNegativeNumber=t4});var jE=v(Bu=>{"use strict";Object.defineProperty(Bu,"__esModule",{value:!0});Bu.isPositiveNumber=void 0;var r4=M(),o4=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,r4.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Bu.isPositiveNumber=o4});var zE=v(Gu=>{"use strict";Object.defineProperty(Gu,"__esModule",{value:!0});Gu.isNonPositiveNumber=void 0;var n4=M(),s4=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,n4.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Gu.isNonPositiveNumber=s4});var $E=v(Vu=>{"use strict";Object.defineProperty(Vu,"__esModule",{value:!0});Vu.isNegativeNumber=void 0;var i4=M(),a4=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,i4.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Vu.isNegativeNumber=a4});var HE=v(qu=>{"use strict";Object.defineProperty(qu,"__esModule",{value:!0});qu.isInteger=void 0;var l4=M(),c4=Ny(),d4=function(e,t){return!(0,c4.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,l4.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};qu.isInteger=d4});var FE=v(Ku=>{"use strict";Object.defineProperty(Ku,"__esModule",{value:!0});Ku.isPositiveInteger=void 0;var u4=M(),p4=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,u4.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};Ku.isPositiveInteger=p4});var UE=v(Ju=>{"use strict";Object.defineProperty(Ju,"__esModule",{value:!0});Ju.isNegativeInteger=void 0;var m4=M(),g4=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,m4.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Ju.isNegativeInteger=g4});var BE=v(Xu=>{"use strict";Object.defineProperty(Xu,"__esModule",{value:!0});Xu.isNonNegativeInteger=void 0;var f4=M(),h4=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,f4.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Xu.isNonNegativeInteger=h4});var GE=v(Yu=>{"use strict";Object.defineProperty(Yu,"__esModule",{value:!0});Yu.isNonPositiveInteger=void 0;var y4=M(),S4=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,y4.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Yu.isNonPositiveInteger=S4});var VE=v(Qu=>{"use strict";Object.defineProperty(Qu,"__esModule",{value:!0});Qu.isNumeric=void 0;var Zu=M(),P4=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Zu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Zu.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Zu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Zu.generateTypeGuardError)(e,t.identifier,"number key")),!1};Qu.isNumeric=P4});var qE=v(ep=>{"use strict";Object.defineProperty(ep,"__esModule",{value:!0});ep.isBooleanLike=void 0;var qy=M(),A4=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,qy.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,qy.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};ep.isBooleanLike=A4});var KE=v(tp=>{"use strict";Object.defineProperty(tp,"__esModule",{value:!0});tp.isDateLike=void 0;var ia=M(),b4=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,ia.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,ia.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,ia.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,ia.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,ia.generateTypeGuardError)(e,t.identifier,"date-like")),!1};tp.isDateLike=b4});var JE=v(rp=>{"use strict";Object.defineProperty(rp,"__esModule",{value:!0});rp.isBigInt=void 0;var _4=M(),w4=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,_4.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};rp.isBigInt=w4});var Jy=v(Ky=>{"use strict";Object.defineProperty(Ky,"__esModule",{value:!0});Ky.isOneOf=v4;var XE=ss();function v4(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,XE.stringify)(t)}) must be one of following values ${e.map(XE.stringify).join(" | ")}`),o}}});var YE=v(Xy=>{"use strict";Object.defineProperty(Xy,"__esModule",{value:!0});Xy.isOneOfTypes=k4;var T4=ss(),C4=ea();function k4(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,T4.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,C4.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;a.includes(u)||a.push(u)}})),r.callbackOnError(a.join(`
`))}return n}}});var ZE=v(Yy=>{"use strict";Object.defineProperty(Yy,"__esModule",{value:!0});Yy.isIntersectionOf=L4;function L4(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var QE=v(Zy=>{"use strict";Object.defineProperty(Zy,"__esModule",{value:!0});Zy.isExtensionOf=E4;function E4(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var eR=v(Qy=>{"use strict";Object.defineProperty(Qy,"__esModule",{value:!0});Qy.isNullOr=x4;var R4=Gt();function x4(e){function t(r,o){return r===null?!0:e(r,o)}return(0,R4.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var tR=v(eS=>{"use strict";Object.defineProperty(eS,"__esModule",{value:!0});eS.isUndefinedOr=I4;var W4=Gt();function I4(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,W4.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var rR=v(tS=>{"use strict";Object.defineProperty(tS,"__esModule",{value:!0});tS.isNilOr=M4;var O4=Gt();function M4(e){function t(r,o){return r==null?!0:e(r,o)}return(0,O4.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var oR=v(rS=>{"use strict";Object.defineProperty(rS,"__esModule",{value:!0});rS.isAsserted=N4;function N4(e){return!0}});var nR=v(oS=>{"use strict";Object.defineProperty(oS,"__esModule",{value:!0});oS.isEnum=j4;var D4=Jy();function j4(e){return function(t,r){return(0,D4.isOneOf)(...Object.values(e))(t,r)}}});var sR=v(nS=>{"use strict";Object.defineProperty(nS,"__esModule",{value:!0});nS.isEqualTo=H4;var z4=M(),$4=ss();function H4(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,z4.generateTypeGuardError)(t,r.identifier,`equal to ${(0,$4.stringify)(e)}`)),!1):!0}}});var iR=v(op=>{"use strict";Object.defineProperty(op,"__esModule",{value:!0});op.isRegex=void 0;var F4=M(),U4=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,F4.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};op.isRegex=U4});var lR=v(sS=>{"use strict";Object.defineProperty(sS,"__esModule",{value:!0});sS.isPattern=B4;var aR=M();function B4(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,aR.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,aR.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var cR=v(iS=>{"use strict";Object.defineProperty(iS,"__esModule",{value:!0});iS.by=G4;function G4(e){return function(t){return e(t,null)}}});var dR=v(aS=>{"use strict";Object.defineProperty(aS,"__esModule",{value:!0});aS.toNumber=V4;function V4(e){return typeof e=="number"?e:Number(e)}});var uR=v(lS=>{"use strict";Object.defineProperty(lS,"__esModule",{value:!0});lS.toDate=q4;function q4(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var pR=v(cS=>{"use strict";Object.defineProperty(cS,"__esModule",{value:!0});cS.toBoolean=K4;function K4(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var mR=v(np=>{"use strict";Object.defineProperty(np,"__esModule",{value:!0});np.isSymbol=void 0;var J4=M(),X4=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,J4.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};np.isSymbol=X4});var ls=v(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.isDateLike=_.isBooleanLike=_.isNumeric=_.isNonPositiveInteger=_.isNonNegativeInteger=_.isNegativeInteger=_.isPositiveInteger=_.isInteger=_.isNegativeNumber=_.isNonPositiveNumber=_.isPositiveNumber=_.isNonNegativeNumber=_.isNonEmptyString=_.isOmit=_.isPick=_.isPartialOf=_.isObjectWithEachItem=_.isNonNullObject=_.isTuple=_.isNonEmptyArrayWithEachItem=_.isNonEmptyArray=_.isArrayWithEachItem=_.isError=_.isIndexSignature=_.isSet=_.isMap=_.isURLSearchParams=_.isURL=_.isFormData=_.isBlob=_.isFileList=_.isFile=_.isFunction=_.isUnknown=_.isString=_.isNumber=_.isNil=_.isDefined=_.isDate=_.isBoolean=_.isAny=_.BrandSymbols=_.isBranded=_.guardWithTolerance=_.isObject=_.isObjectWith=_.isNestedType=_.isShape=_.isSchema=_.isType=void 0;_.isSymbol=_.toBoolean=_.toDate=_.toNumber=_.by=_.generateTypeGuardError=_.isPattern=_.isRegex=_.isEqualTo=_.isEnum=_.isAsserted=_.isNilOr=_.isUndefinedOr=_.isNullOr=_.isExtensionOf=_.isIntersectionOf=_.isOneOfTypes=_.isOneOf=_.isBigInt=void 0;var Y4=wu();Object.defineProperty(_,"isType",{enumerable:!0,get:function(){return Y4.isType}});var dS=tE();Object.defineProperty(_,"isSchema",{enumerable:!0,get:function(){return dS.isSchema}});Object.defineProperty(_,"isShape",{enumerable:!0,get:function(){return dS.isShape}});Object.defineProperty(_,"isNestedType",{enumerable:!0,get:function(){return dS.isNestedType}});var Z4=rE();Object.defineProperty(_,"isObjectWith",{enumerable:!0,get:function(){return Z4.isObjectWith}});var Q4=oE();Object.defineProperty(_,"isObject",{enumerable:!0,get:function(){return Q4.isObject}});var e8=nE();Object.defineProperty(_,"guardWithTolerance",{enumerable:!0,get:function(){return e8.guardWithTolerance}});var t8=sE();Object.defineProperty(_,"isBranded",{enumerable:!0,get:function(){return t8.isBranded}});var r8=iE();Object.defineProperty(_,"BrandSymbols",{enumerable:!0,get:function(){return r8.BrandSymbols}});var o8=aE();Object.defineProperty(_,"isAny",{enumerable:!0,get:function(){return o8.isAny}});var n8=lE();Object.defineProperty(_,"isBoolean",{enumerable:!0,get:function(){return n8.isBoolean}});var s8=cE();Object.defineProperty(_,"isDate",{enumerable:!0,get:function(){return s8.isDate}});var i8=ky();Object.defineProperty(_,"isDefined",{enumerable:!0,get:function(){return i8.isDefined}});var a8=Au();Object.defineProperty(_,"isNil",{enumerable:!0,get:function(){return a8.isNil}});var l8=Ny();Object.defineProperty(_,"isNumber",{enumerable:!0,get:function(){return l8.isNumber}});var c8=dE();Object.defineProperty(_,"isString",{enumerable:!0,get:function(){return c8.isString}});var d8=uE();Object.defineProperty(_,"isUnknown",{enumerable:!0,get:function(){return d8.isUnknown}});var u8=pE();Object.defineProperty(_,"isFunction",{enumerable:!0,get:function(){return u8.isFunction}});var p8=gE();Object.defineProperty(_,"isFile",{enumerable:!0,get:function(){return p8.isFile}});var m8=hE();Object.defineProperty(_,"isFileList",{enumerable:!0,get:function(){return m8.isFileList}});var g8=SE();Object.defineProperty(_,"isBlob",{enumerable:!0,get:function(){return g8.isBlob}});var f8=AE();Object.defineProperty(_,"isFormData",{enumerable:!0,get:function(){return f8.isFormData}});var h8=_E();Object.defineProperty(_,"isURL",{enumerable:!0,get:function(){return h8.isURL}});var y8=vE();Object.defineProperty(_,"isURLSearchParams",{enumerable:!0,get:function(){return y8.isURLSearchParams}});var S8=TE();Object.defineProperty(_,"isMap",{enumerable:!0,get:function(){return S8.isMap}});var P8=CE();Object.defineProperty(_,"isSet",{enumerable:!0,get:function(){return P8.isSet}});var A8=kE();Object.defineProperty(_,"isIndexSignature",{enumerable:!0,get:function(){return A8.isIndexSignature}});var b8=LE();Object.defineProperty(_,"isError",{enumerable:!0,get:function(){return b8.isError}});var _8=zy();Object.defineProperty(_,"isArrayWithEachItem",{enumerable:!0,get:function(){return _8.isArrayWithEachItem}});var w8=$y();Object.defineProperty(_,"isNonEmptyArray",{enumerable:!0,get:function(){return w8.isNonEmptyArray}});var v8=EE();Object.defineProperty(_,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return v8.isNonEmptyArrayWithEachItem}});var T8=xE();Object.defineProperty(_,"isTuple",{enumerable:!0,get:function(){return T8.isTuple}});var C8=Qr();Object.defineProperty(_,"isNonNullObject",{enumerable:!0,get:function(){return C8.isNonNullObject}});var k8=WE();Object.defineProperty(_,"isObjectWithEachItem",{enumerable:!0,get:function(){return k8.isObjectWithEachItem}});var L8=IE();Object.defineProperty(_,"isPartialOf",{enumerable:!0,get:function(){return L8.isPartialOf}});var E8=OE();Object.defineProperty(_,"isPick",{enumerable:!0,get:function(){return E8.isPick}});var R8=ME();Object.defineProperty(_,"isOmit",{enumerable:!0,get:function(){return R8.isOmit}});var x8=NE();Object.defineProperty(_,"isNonEmptyString",{enumerable:!0,get:function(){return x8.isNonEmptyString}});var W8=DE();Object.defineProperty(_,"isNonNegativeNumber",{enumerable:!0,get:function(){return W8.isNonNegativeNumber}});var I8=jE();Object.defineProperty(_,"isPositiveNumber",{enumerable:!0,get:function(){return I8.isPositiveNumber}});var O8=zE();Object.defineProperty(_,"isNonPositiveNumber",{enumerable:!0,get:function(){return O8.isNonPositiveNumber}});var M8=$E();Object.defineProperty(_,"isNegativeNumber",{enumerable:!0,get:function(){return M8.isNegativeNumber}});var N8=HE();Object.defineProperty(_,"isInteger",{enumerable:!0,get:function(){return N8.isInteger}});var D8=FE();Object.defineProperty(_,"isPositiveInteger",{enumerable:!0,get:function(){return D8.isPositiveInteger}});var j8=UE();Object.defineProperty(_,"isNegativeInteger",{enumerable:!0,get:function(){return j8.isNegativeInteger}});var z8=BE();Object.defineProperty(_,"isNonNegativeInteger",{enumerable:!0,get:function(){return z8.isNonNegativeInteger}});var $8=GE();Object.defineProperty(_,"isNonPositiveInteger",{enumerable:!0,get:function(){return $8.isNonPositiveInteger}});var H8=VE();Object.defineProperty(_,"isNumeric",{enumerable:!0,get:function(){return H8.isNumeric}});var F8=qE();Object.defineProperty(_,"isBooleanLike",{enumerable:!0,get:function(){return F8.isBooleanLike}});var U8=KE();Object.defineProperty(_,"isDateLike",{enumerable:!0,get:function(){return U8.isDateLike}});var B8=JE();Object.defineProperty(_,"isBigInt",{enumerable:!0,get:function(){return B8.isBigInt}});var G8=Jy();Object.defineProperty(_,"isOneOf",{enumerable:!0,get:function(){return G8.isOneOf}});var V8=YE();Object.defineProperty(_,"isOneOfTypes",{enumerable:!0,get:function(){return V8.isOneOfTypes}});var q8=ZE();Object.defineProperty(_,"isIntersectionOf",{enumerable:!0,get:function(){return q8.isIntersectionOf}});var K8=QE();Object.defineProperty(_,"isExtensionOf",{enumerable:!0,get:function(){return K8.isExtensionOf}});var J8=eR();Object.defineProperty(_,"isNullOr",{enumerable:!0,get:function(){return J8.isNullOr}});var X8=tR();Object.defineProperty(_,"isUndefinedOr",{enumerable:!0,get:function(){return X8.isUndefinedOr}});var Y8=rR();Object.defineProperty(_,"isNilOr",{enumerable:!0,get:function(){return Y8.isNilOr}});var Z8=oR();Object.defineProperty(_,"isAsserted",{enumerable:!0,get:function(){return Z8.isAsserted}});var Q8=nR();Object.defineProperty(_,"isEnum",{enumerable:!0,get:function(){return Q8.isEnum}});var e3=sR();Object.defineProperty(_,"isEqualTo",{enumerable:!0,get:function(){return e3.isEqualTo}});var t3=iR();Object.defineProperty(_,"isRegex",{enumerable:!0,get:function(){return t3.isRegex}});var r3=lR();Object.defineProperty(_,"isPattern",{enumerable:!0,get:function(){return r3.isPattern}});var o3=M();Object.defineProperty(_,"generateTypeGuardError",{enumerable:!0,get:function(){return o3.generateTypeGuardError}});var n3=cR();Object.defineProperty(_,"by",{enumerable:!0,get:function(){return n3.by}});var s3=dR();Object.defineProperty(_,"toNumber",{enumerable:!0,get:function(){return s3.toNumber}});var i3=uR();Object.defineProperty(_,"toDate",{enumerable:!0,get:function(){return i3.toDate}});var a3=pR();Object.defineProperty(_,"toBoolean",{enumerable:!0,get:function(){return a3.toBoolean}});var l3=mR();Object.defineProperty(_,"isSymbol",{enumerable:!0,get:function(){return l3.isSymbol}})});var cs,gR,c3,fR,hR=l(()=>{"use strict";cs=g(require("node:path")),gR=require("node:url"),c3=()=>!0,fR=()=>{if(c3()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?cs.default.dirname(cs.default.resolve(e)):cs.default.dirname(cs.default.resolve(__filename))}return cs.default.dirname((0,gR.fileURLToPath)(__agentWitchImportMetaUrl))}});var uS,yR,D,SR,d3,Vt,pS,k,aa,qt,mS,la,Ho,gS,fS,hS,ca,fe,eo,sp,Ne,ip,O,yS=l(()=>{"use strict";uS=g(require("node:fs")),yR=g(require("node:os")),D=g(require("node:path")),SR=g(ls());Le();hR();ou();ou();d3=fR(),Vt=e=>e.trim().toLowerCase(),pS=e=>Vt(e).replace(/@/g,"-at-").replace(/\./g,"-").replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,""),k=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return D.default.resolve(e);let t=D.default.resolve(d3),r=D.default.basename(t),o=D.default.basename(D.default.dirname(t));return r===wy&&(o===Bt||o===gr)?D.default.dirname(t):r===Bt||r===gr?t:D.default.join(yR.default.homedir(),Bt)},aa=(e=k())=>D.default.join(e,wy),qt=(e=k())=>D.default.join(aa(e),OL),mS=(e,t,r)=>t!==null?D.default.join(e,Ve,t,r):D.default.join(e,r),la=e=>mS(e.installDir,e.profileEmail,Xi),Ho=e=>mS(e.installDir,e.profileEmail,Tt),gS=e=>D.default.join(e.logsDir,No),fS=e=>D.default.join(e.logsDir,Do),hS=e=>mS(e.installDir,e.profileEmail,Yi),ca=e=>e.profileEmail!==null?D.default.join(e.installDir,Ve,e.profileEmail,Yr):D.default.join(e.installDir,Yr),fe=(e=k())=>Zi(e),eo=(e=k())=>Zr(e)?Qd:Zd,sp=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Vt(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Vt(t):null},Ne=(e=k())=>{let t=D.default.join(e,_y);if(!uS.default.existsSync(t))return null;try{let r=JSON.parse(uS.default.readFileSync(t,"utf8"));if((0,SR.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Vt(r.email)}catch{return null}return null},ip=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Vt(r):null}let t=sp();return t!==null?t:Ne()},O=e=>{let t=k(),r=aa(t),o=qt(t),n=ip(e);if(n!==null){let S=D.default.join(t,Ve,n),h=D.default.join(S,eu),y=D.default.join(S,Xi),p=D.default.join(S,Tt),P=D.default.join(S,Yi),A=D.default.join(S,Yr),f=D.default.join(S,Tt,No),b=D.default.join(S,Tt,Do);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:p,mainLogPath:f,errorLogPath:b,reportsDir:P,deviceKeypairPath:A,configPath:D.default.join(S,"config.json"),harnessRootDir:h,harnessManifestPath:D.default.join(h,ru),harnessSetsDir:D.default.join(h,tu)}}let s=D.default.join(t,eu),i=D.default.join(t,Xi),a=D.default.join(t,Tt),c=D.default.join(t,Yi),d=D.default.join(t,Yr),u=D.default.join(t,Tt,No),m=D.default.join(t,Tt,Do);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:u,errorLogPath:m,reportsDir:c,deviceKeypairPath:d,configPath:D.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:D.default.join(s,ru),harnessSetsDir:D.default.join(s,tu)}}});var u3,ds,SS=l(()=>{"use strict";u3=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},ds=e=>e.filePort??u3(e.envValue)??e.defaultPort});var PS,PR,p3,m3,AS,us,AR=l(()=>{"use strict";PS=g(require("node:fs")),PR=g(require("node:path"));Le();yS();SS();p3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),m3=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,AS=e=>{let t=PR.default.join(e,Ji.wakePort);if(!PS.default.existsSync(t))return null;try{let r=JSON.parse(PS.default.readFileSync(t,"utf8"));if(p3(r)&&m3(r.wakePort))return r.wakePort}catch{return null}return null},us=(e=k())=>ds({filePort:AS(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:eo(e)})});var bR={};ft(bR,{isAgentWitchLocalInstallDir:()=>Zr,readActiveProfileEmailFromFile:()=>Ne,readAgentWitchWakePortFromFile:()=>AS,resolveActiveProfileEmail:()=>ip,resolveActiveProfileEmailFromEnv:()=>sp,resolveAgentWitchAppBundlePath:()=>qt,resolveAgentWitchAppDir:()=>aa,resolveAgentWitchDefaultWakePort:()=>eo,resolveAgentWitchDeviceKeypairPath:()=>ca,resolveAgentWitchErrorLogPath:()=>fS,resolveAgentWitchInstallDir:()=>k,resolveAgentWitchLaunchAgentPrefix:()=>fe,resolveAgentWitchLocalLayout:()=>O,resolveAgentWitchLogsDir:()=>Ho,resolveAgentWitchMainLogPath:()=>gS,resolveAgentWitchProjectsDir:()=>la,resolveAgentWitchReportsDir:()=>hS,resolveAgentWitchRuntimeWakePort:()=>us,resolveAgentWitchWakePortFromSources:()=>ds,sanitizeProfileEmailForDir:()=>Vt,sanitizeProfileEmailForLaunchAgentLabel:()=>pS});var B=l(()=>{"use strict";yS();AR();SS()});var bS,_S,ap=l(()=>{"use strict";bS=new Set(["","loginwindow","_mbsetupuser","root"]),_S=5e3});var _R,g3,wR,wS,vS=l(()=>{"use strict";_R=require("node:child_process");ap();g3=e=>e.trim().toLowerCase(),wR=e=>e==null?!1:!bS.has(g3(e)),wS=()=>{if(process.platform!=="darwin")return null;try{let t=(0,_R.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return wR(t)?t:null}catch{return null}}});var TR,vR,Ct,da=l(()=>{"use strict";TR=g(require("node:os"));vS();vR=e=>e.trim().toLowerCase(),Ct=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?wS():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??TR.default.userInfo().username;return vR(r)===vR(o)}});var CR,kR,Fo,LR=l(()=>{"use strict";CR=require("node:child_process"),kR=g(require("node:fs"));B();da();Fo=(e=k())=>{let t=qt(e);if(!kR.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!Ct())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Ne(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,CR.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var ER,ua,lp=l(()=>{"use strict";ER=require("node:child_process"),ua=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,ER.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var cp,TS,RR,se,dp,pa=l(()=>{"use strict";cp=g(require("node:fs")),TS=g(require("node:path"));B();Le();RR=e=>{let t=TS.default.join(e,Ve);return cp.default.existsSync(t)?cp.default.readdirSync(t).filter(r=>cp.default.statSync(TS.default.join(t,r)).isDirectory()).map(r=>Vt(r)).toSorted():[]},se=(e=k())=>{let t=fe(e),r=RR(e);return[{profileEmail:Ne(e)??r[0]??null,launchAgentLabel:t}]},dp=(e=k())=>RR(e)});var CS,xR,WR,f3,fr,up=l(()=>{"use strict";CS=g(require("node:fs")),xR=g(require("node:os")),WR=g(require("node:path"));B();pa();f3=()=>WR.default.join(xR.default.homedir(),"Library","LaunchAgents"),fr=(e=k())=>{let t=fe(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of se(e))r.add(n.launchAgentLabel);let o=f3();if(CS.default.existsSync(o))for(let n of CS.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var IR,ma,OR=l(()=>{"use strict";B();lp();up();pa();IR=(e=k())=>{let t=new Set(se(e).map(r=>r.launchAgentLabel));return fr(e).filter(r=>!t.has(r))},ma=(e=k())=>{for(let t of IR(e))ua(t)}});var ga,kS=l(()=>{"use strict";B();lp();up();ga=(e=k())=>{for(let t of fr(e))ua(t)}});var MR,NR,h3,Uo,DR=l(()=>{"use strict";MR=require("node:child_process"),NR=require("node:util"),h3=(0,NR.promisify)(MR.execFile),Uo=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await h3("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Bo,y3,LS,ES=l(()=>{"use strict";Bo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),y3=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,LS=e=>{let t=e.pathValue??y3(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${Bo(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${Bo(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${Bo(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${Bo(e.homeDir)}</string>
    <key>PATH</key>
    <string>${Bo(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${Bo(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${Bo(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var pp,RS=l(()=>{"use strict";pp=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var fa,xS,mp,gp,hr,fp=l(()=>{"use strict";fa=g(require("node:fs")),xS=g(require("node:os")),mp=g(require("node:path"));Le();B();ES();RS();gp=(e,t=xS.default.homedir())=>mp.default.join(t,"Library","LaunchAgents",`${e}.plist`),hr=e=>{let t=e.installDir??k(),r=e.homeDir??xS.default.homedir(),o=gp(e.launchAgentLabel,r),n=fa.default.existsSync(o)?fa.default.readFileSync(o,"utf8"):null;if(n!==null&&pp(n))return{ok:!0,rewritten:!1,plistPath:o};let s=LS({launchAgentLabel:e.launchAgentLabel,runPath:mp.default.join(t,IL,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??us(t)});if(!pp(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{fa.default.mkdirSync(mp.default.dirname(o),{recursive:!0}),fa.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var zR,$R,HR,ha,S3,P3,jR,De,WS=l(()=>{"use strict";zR=require("node:child_process"),$R=g(require("node:fs")),HR=require("node:util");B();fp();da();ha=(0,HR.promisify)(zR.execFile),S3=async e=>{try{return await ha("launchctl",["print",e]),!0}catch{return!1}},P3=async(e,t,r)=>{await S3(t)&&await ha("launchctl",["bootout",t]).catch(()=>{}),await ha("launchctl",["bootstrap",e,r]),await ha("launchctl",["enable",t])},jR=async e=>{try{return await ha("launchctl",["kickstart","-k",e]),!0}catch{return!1}},De=async(e,t=k())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!Ct())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=hr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await jR(n))return{ok:!0};let i=s.plistPath;if(!$R.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await P3(o,n,i),await jR(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Go,FR=l(()=>{"use strict";B();WS();pa();Go=async(e=k())=>{let t=[];for(let r of se(e))(await De(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var UR,BR,GR=l(()=>{"use strict";UR=/(<key>AGENT_WITCH_WAKE_PORT<\/key>\s*<string>)[^<]*(<\/string>)/,BR=(e,t)=>UR.test(e)?e.replace(UR,`$1${String(t)}$2`):null});var hp,VR,IS,qR=l(()=>{"use strict";hp=g(require("node:fs")),VR=g(require("node:os"));fp();GR();IS=e=>{let t=e.homeDir??VR.default.homedir(),r=[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`],o=[];for(let n of r){let s=gp(n,t);if(!hp.default.existsSync(s))continue;let i=hp.default.readFileSync(s,"utf8"),a=BR(i,e.wakePort);a===null||a===i||(hp.default.writeFileSync(s,a,"utf8"),o.push(s))}return o}});var nt,yr,KR=l(()=>{"use strict";kS();da();ap();nt=e=>{Ct()||(ga(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},yr=(e,t=_S)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{Ct()||e()},t);return()=>{clearInterval(r)}}});var re=l(()=>{"use strict";$L();LR();lp();OR();kS();up();da();DR();FR();WS();fp();RS();qR();ES();pa();vS();ap();KR()});var OS=l(()=>{"use strict";re()});var JR,XR,yp,YR,ps,ZR,QR,Vo=l(()=>{"use strict";JR=".agent-witch",XR="memory",yp="project.json",YR="chunks.ndjson",ps="runs.ndjson",ZR="reports",QR=".json"});var ex=l(()=>{"use strict";Vo()});var tx,Sp,MS=l(()=>{"use strict";tx=g(require("node:path"));ex();Sp=(e,t)=>tx.default.join(e.trim(),`${t.trim()}${QR}`)});var ya,rx,ox=l(()=>{"use strict";ya="agent-witch.js",rx="command"});var Pp=l(()=>{"use strict";ox()});var qo,nx,sx=l(()=>{"use strict";Pp();qo=e=>`'${e.replace(/'/g,"'\\''")}'`,nx=e=>{let t=`${e.installDir.trim()}/${"app"}/${ya}`,r=[qo("node"),qo(t),"report","write","--key",qo(e.reportKey.trim()),"--agent-run-id",qo(e.agentRunId.trim()),"--status",qo(e.status),"--summary",qo(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",qo(e.details.trim())),r.join(" ")}});var Kt,ix,A3,NS,Ap=l(()=>{"use strict";MS();sx();Kt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},ix=e=>e===Kt.COMPLETED||e===Kt.FAILED,A3=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),NS=(e,t)=>{let r=Sp(t.reportsDir,t.reportKey),o=nx({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Kt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${A3({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var je=l(()=>{"use strict";Le();B()});var Pa,lx,ax,cx,b3,ms,_3,dx,Aa,ba,DS,ux,px,_a=l(()=>{"use strict";Pa=g(require("node:fs")),lx=g(require("node:path"));Ap();MS();je();ax=50,cx=e=>{let t=O(),r=Sp(t.reportsDir,e);return Pa.default.mkdirSync(lx.default.dirname(r),{recursive:!0}),r},b3=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},ms=e=>{let t=cx(e);if(!Pa.default.existsSync(t))return null;try{let r=JSON.parse(Pa.default.readFileSync(t,"utf8"));return b3(r)?r:null}catch{return null}},_3=(e,t)=>{let r=[...e,t];return r.length>ax?r.slice(r.length-ax):r},dx=e=>{let t=cx(e.reportKey);Pa.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Aa=e=>{let t=ms(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:_3(t?.history??[],o)};return dx(n),n},ba=e=>{let t=ms(e.reportKey);return t!==null?t:Aa({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Kt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},DS=(e,t)=>{let r=t.trim();if(r.length===0)return ms(e);let o=ms(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return dx(s),s},ux=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},px=e=>{if(e===null||!ix(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Kt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var w3,v3,wa,mx,bp,jS=l(()=>{"use strict";Ap();_a();w3=new Set(Object.values(Kt)),v3=e=>w3.has(e),wa=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},mx=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},bp=e=>{if(e[0]!=="write")return mx(),1;let r=wa(e,"--key"),o=wa(e,"--agent-run-id"),n=wa(e,"--status"),s=wa(e,"--summary"),i=wa(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!v3(n)?(mx(),1):(Aa({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var st,Ko=l(()=>{"use strict";st=()=>!0});var zS,gx,Jo,_p=l(()=>{"use strict";zS=g(require("node:path")),gx=require("node:url");Ko();Jo=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=zS.default.resolve(t);return st()?r===zS.default.resolve(__filename):e===void 0?!1:r===(0,gx.fileURLToPath)(e)}});var wp,gs,k3,cie,fs=l(()=>{"use strict";wp="agent-witch.js",gs="deps.tar.gz",k3="install.sh",cie={mainScript:`app/${wp}`,depsArchive:`app/${gs}`,installShell:k3}});var Sx=l(()=>{"use strict";fs()});var Px=l(()=>{"use strict";fs();Sx()});var va,HS,vp,L3,Ta,ze,ys,Ca,ka,Xo,FS=l(()=>{"use strict";va=g(require("node:fs")),HS=g(require("node:path"));Px();B();vp="install-version.json",L3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ta=(e=k())=>HS.default.join(e,vp),ze=(e=k())=>{let t=Ta(e);if(!va.default.existsSync(t))return null;try{let r=JSON.parse(va.default.readFileSync(t,"utf8"));return!L3(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},ys=(e,t=k())=>{let r=Ta(t);va.default.mkdirSync(HS.default.dirname(r),{recursive:!0}),va.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Ca=(e=k())=>ze(e)?.bundleVersion??"258",ka=(e,t)=>{let r=ze(e);if(r!==null)return r;let o={bundleVersion:"258",appOrigin:t,updatedAt:new Date().toISOString()};return ys(o,e),o},Xo=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var Ax,Yo,US,BS,GS,Tp,Jt,Zo,VS=l(()=>{"use strict";Ax=require("node:crypto"),Yo=g(require("node:fs")),US=g(require("node:path"));B();BS="self-update-log.ndjson",GS=100,Tp=(e=k())=>{let t=O(),r=t.installDir===e?t.logsDir:Ho({installDir:e,profileEmail:t.profileEmail});return US.default.join(r,BS)},Jt=(e,t=k())=>{let r={id:(0,Ax.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Tp(t);Yo.default.mkdirSync(US.default.dirname(o),{recursive:!0});let n=Yo.default.existsSync(o)?Yo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-GS+1)),JSON.stringify(r)];return Yo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Zo=(e=20,t=k())=>{let r=Tp(t);if(!Yo.default.existsSync(r))return[];let o=Yo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var qS,Cie,KS=l(()=>{"use strict";fs();qS="deps",Cie=`${"app"}/${gs}`});var bx=l(()=>{"use strict";KS()});var _x,to,Qo,wx,JS,XS,vx=l(()=>{"use strict";_x=require("node:child_process"),to=g(require("node:fs")),Qo=g(require("node:path"));fs();KS();wx=e=>Qo.default.join(e,"app",qS),JS=e=>{let t=Qo.default.join(e,"app"),r=Qo.default.join(t,gs);to.default.existsSync(r)&&(to.default.rmSync(wx(e),{recursive:!0,force:!0}),to.default.mkdirSync(t,{recursive:!0}),(0,_x.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),to.default.rmSync(r,{force:!0}))},XS=e=>{to.default.rmSync(Qo.default.join(e,"node_modules"),{recursive:!0,force:!0}),to.default.rmSync(Qo.default.join(e,"package.json"),{force:!0}),to.default.rmSync(Qo.default.join(e,"package-lock.json"),{force:!0})}});var Tx=l(()=>{"use strict";bx();vx()});var La,Ea=l(()=>{"use strict";La="agent-witch.service"});var Cx=l(()=>{"use strict";Ea()});var Cp,kp,Lp=l(()=>{"use strict";Cp="AGENT_WITCH_EXTERNAL_BRIDGE",kp="AGENT_WITCH_EXTERNAL_LIVE"});var kx=l(()=>{"use strict";Lp();Ea()});var Lx,YS,Ex=l(()=>{"use strict";Lx=require("node:child_process");Ea();YS=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,Lx.spawn)("systemctl",["--user","restart",La],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${La} exited ${o??"unknown"}`))})})});var Rx=l(()=>{"use strict";Ea();Cx();kx();Ex()});var it,Ep,xx=l(()=>{"use strict";it="https://www.agentwitch.com",Ep="wss://www.agentwitch.com/api/agent-witch/ws"});var Ra,Sr,Wx=l(()=>{"use strict";Ra="127.0.0.1",Sr=`http://${Ra}:43347`});var ht=l(()=>{"use strict";xx();Wx()});var xa,Rp,Ix,QS,R3,Ox,rP,Mx,kt,Wa,Ia,oP,eP,tP,Oa,Ma,nP,sP,Ss=l(()=>{"use strict";xa=g(require("node:fs")),Rp=g(require("node:path")),Ix="active-writer-work.json",QS=new Set,R3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ox=e=>e.profileEmail===null?Rp.default.join(e.installDir,Ix):Rp.default.join(e.installDir,"profiles",e.profileEmail,Ix),rP=e=>{let t=Ox(e);if(!xa.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(xa.default.readFileSync(t,"utf8"));return!R3(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},Mx=(e,t)=>{let r=Ox(e);xa.default.mkdirSync(Rp.default.dirname(r),{recursive:!0}),xa.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},kt=e=>rP(e).activeCount>0,Wa=e=>{let t=rP(e);Mx(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},Ia=e=>{let t=rP(e),r=Math.max(0,t.activeCount-1);if(Mx(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of QS)o()},oP=e=>(QS.add(e),()=>{QS.delete(e)}),eP=null,tP=null,Oa=e=>{eP=e},Ma=e=>{tP=e},nP=()=>{let e=eP;return eP=null,e},sP=()=>{let e=tP;return tP=null,e}});var Ee,xp=l(()=>{"use strict";Ee=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Ps,Wp,Na,iP=l(()=>{"use strict";Ps="qwen2.5:7b",Wp="nomic-embed-text",Na="Install Ollama from https://ollama.com/download"});var Da,aP,Ip=l(()=>{"use strict";iP();Da=()=>`
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
    echo "Ollama is missing. ${Na}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Na}" >&2
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
  agent_witch_ensure_ollama_model "${Ps}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${Wp}" "\${pull_log}"
}
`,aP=()=>`
${Da()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var Nx,x3,Op,lP=l(()=>{"use strict";Nx=require("node:child_process");B();Ip();x3=e=>new Promise(t=>{let r=(0,Nx.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:k()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Op=async(e=x3)=>{let t=`${Da()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var ro,Mp,Dx,W3,jx,bs,I3,O3,M3,As,en,tn,zx=l(()=>{"use strict";ro=g(require("node:fs")),Mp=g(require("node:path"));Tx();Rx();re();B();fs();ht();FS();Ss();xp();VS();lP();Dx=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),W3=e=>{let t=Ne(e),r=t===null?O():O(t);if(!ro.default.existsSync(r.configPath))return null;try{let o=JSON.parse(ro.default.readFileSync(r.configPath,"utf8"));return!Dx(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},jx=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!Dx(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},bs=async e=>(await jx(e))?.bundleVersion??null,I3=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Mp.default.join(t,r);ro.default.mkdirSync(Mp.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());ro.default.writeFileSync(n,s),r.endsWith(".js")&&ro.default.chmodSync(n,493)},O3=async()=>{if(process.platform==="linux"){try{await YS()}catch(e){let t=e instanceof Error?e.message:String(e);console.warn(`[agent-witch-self-update] Linux service restart skipped: ${t}`)}return}ma(),await Go()},M3=(e,t)=>e!==null?Ee(e):t??it,As=(e,t)=>({localBundleVersion:t,...e}),en=async e=>{let t=k(),r=ze(t),o=r?.bundleVersion??null,n=await Op();Jt({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=W3(t),i=M3(s,r?.appOrigin);if(i===null){let d=As({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return Jt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await jx(i);if(a===null){let d=As({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return Jt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||Xo(o,a.bundleVersion))){let d=As({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Jt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await I3(i,t,S);let d=Mp.default.join(t,wp);ro.default.existsSync(d)&&ro.default.rmSync(d,{force:!0}),JS(t),XS(t),ys({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=O(Ne(t));if(kt(u)){Ma("install-bundle-update");let S=As({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Jt({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await O3();let m=As({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Jt({event:"update_applied",ok:!0,message:m.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}catch(d){let u=d instanceof Error?d.message:"Agent Witch self-update failed.",m=As({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},o);return Jt({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},tn=()=>{let e=k();return{local:ze(e),logs:Zo(20,e)}}});var $x={};ft($x,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>vp,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Na,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Wp,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>Ps,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>BS,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>GS,appendAgentWitchSelfUpdateLog:()=>Jt,buildAgentWitchEnsureOllamaShell:()=>Da,buildAgentWitchInstallScriptOllama:()=>aP,buildAgentWitchSelfUpdateStatus:()=>tn,ensureAgentWitchInstallVersionRecorded:()=>ka,ensureAgentWitchOllamaInstalled:()=>Op,fetchAgentWitchRemoteInstallBundleVersion:()=>bs,isRemoteAgentWitchBundleVersionNewer:()=>Xo,readAgentWitchInstallVersion:()=>ze,readAgentWitchSelfUpdateLogs:()=>Zo,resolveAgentWitchAppOriginFromWsUrl:()=>Ee,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Ca,resolveAgentWitchInstallVersionPath:()=>Ta,resolveAgentWitchSelfUpdateLogPath:()=>Tp,runAgentWitchSelfUpdate:()=>en,writeAgentWitchInstallVersion:()=>ys});var Xt=l(()=>{"use strict";FS();VS();zx();xp();iP();Ip();lP()});var cP={};ft(cP,{buildAgentWitchSelfUpdateStatus:()=>tn,fetchAgentWitchRemoteInstallBundleVersion:()=>bs,runAgentWitchSelfUpdate:()=>en});var dP=l(()=>{"use strict";Xt()});function _s(e){return(0,Hx.createHash)("sha256").update(e.trim()).digest("hex")}var Hx,Np=l(()=>{"use strict";Hx=require("node:crypto")});var ws,ja,N3,vs,uP,Dp=l(()=>{"use strict";ws=g(require("node:fs")),ja=g(require("node:path"));Np();je();N3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vs=e=>{if(!ws.default.existsSync(e))return null;try{let t=JSON.parse(ws.default.readFileSync(e,"utf8"));return!N3(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:_s(t.pairingToken.trim())}catch{return null}},uP=(e=k())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(vs(ja.default.join(e,"config.json")));let n=ja.default.join(e,Ve);if(!ws.default.existsSync(n))return t;for(let s of ws.default.readdirSync(n)){let i=ja.default.join(n,s);ws.default.statSync(i).isDirectory()&&o(vs(ja.default.join(i,"config.json")))}return t}});var Ts,za=l(()=>{"use strict";Ts="connection-health.json"});var rn,jp,D3,$a,Se,pP,zp,Re,$p=l(()=>{"use strict";rn=g(require("node:fs")),jp=g(require("node:path"));za();D3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$a=e=>e.profileEmail===null?jp.default.join(e.installDir,Ts):jp.default.join(e.installDir,"profiles",e.profileEmail,Ts),Se=e=>{let t=$a(e);if(!rn.default.existsSync(t))return null;try{let r=JSON.parse(rn.default.readFileSync(t,"utf8"));return!D3(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},pP=e=>{let t=$a(e);rn.default.existsSync(t)&&rn.default.rmSync(t,{force:!0})},zp=(e,t)=>{let r=$a(e),o=Se(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};rn.default.mkdirSync(jp.default.dirname(r),{recursive:!0}),rn.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Re=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var Ha,Fx=l(()=>{"use strict";za();$p();Ha=(e,t)=>{if(!t.socketOpen)return!1;let r=Se(e);return r===null?!1:!Re(r,t.staleAfterMs??12e4,t.nowMs)}});var mP,Ux=l(()=>{"use strict";$p();mP=(e,t)=>!(e!==null&&!Re(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var on=l(()=>{"use strict";$p();Fx();Ux();za()});var Hp,gP,j3,z3,Bx,Gx=l(()=>{"use strict";Hp=g(require("node:fs")),gP=g(require("node:path"));B();Le();on();Dp();j3=12e4,z3=e=>{let t=gP.default.join(e,Ve);return Hp.default.existsSync(t)?Hp.default.readdirSync(t).filter(r=>Hp.default.statSync(gP.default.join(t,r)).isDirectory()):[]},Bx=(e=k())=>{let t=null,r=-1;for(let o of z3(e)){let n=O(o),s=Se(n);if(s===null||Re(s,j3))continue;let i=vs(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var fP,Vx,Fp,Fa,Ua,$3,H3,F3,qx,he,ye,Up,Yt,Lt=l(()=>{"use strict";fP=g(require("node:fs")),Vx=g(require("node:os")),Fp=g(require("node:path")),Fa={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Ua=e=>e.trim().length>0,$3=e=>{let t=Fp.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},H3=()=>{let e=Vx.default.homedir(),t=Fp.default.join(e,".local","bin","agent");if(fP.default.existsSync(t))return t;let r=Fp.default.join(e,".local","bin","cursor-agent");return fP.default.existsSync(r)?r:Fa.cursorCommand},F3=e=>{let t=e.trim();return!Ua(t)||t===Fa.cursorCommand?H3():t},qx=(e,t)=>$3(e)?t:["agent",...t],he=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ye=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Ua(t)?t.trim():Fa.claudeCommand,codexCommand:Ua(r)?r.trim():Fa.codexCommand,cursorCommand:F3(o),antigravityCommand:Ua(n)?n.trim():Fa.antigravityCommand}},Up=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:qx(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Yt=(e,t,r,o)=>{let n=t.trim();if(!Ua(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:qx(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"--dangerously-skip-permissions","-p",n]}}});var oo,U3,nn,B3,Cs,Ba=l(()=>{"use strict";oo=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,U3=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:oo(s.inputTokens)+oo(s.outputTokens)+oo(s.cacheReadInputTokens)+oo(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},nn=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=oo(a.input_tokens)+oo(a.cache_creation_input_tokens)+oo(a.cache_read_input_tokens),d=oo(a.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:U3(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},B3=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),Cs=(e,t)=>{let r=nn(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??B3(r)}}});var hP,G3,V3,yP,SP=l(()=>{"use strict";hP=e=>e.toLocaleString("en-US"),G3=e=>e<.01?e.toFixed(4):e.toFixed(3),V3=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${G3(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${hP(e.inputTokens)} in / ${hP(e.outputTokens)} out (${hP(e.totalTokens)} total)`,t].join(`
`)},yP=(e,t)=>{if(t===void 0)return e;let r=V3(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Bp,PP=l(()=>{"use strict";Bp={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var sn,AP,Gp,bP=l(()=>{"use strict";PP();sn="auto",AP=e=>({value:sn,label:`Auto (${Bp[e]})`}),Gp={anthropic:[AP("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[AP("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[AP("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var ks,Ga,Vp,Ls=l(()=>{"use strict";PP();bP();ks=e=>{let t=e?.trim()??"";if(!(t.length===0||t===sn))return t},Ga=(e,t)=>{let r=ks(t);return r===void 0?Bp[e]:r},Vp=e=>{let t=ks(e);return t===void 0?sn:t}});var qp,q3,K3,Kp,Kx=l(()=>{"use strict";qp={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},q3=e=>{let t=qp[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?qp["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?qp["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?qp["gemini-2.0-flash"]:null},K3=(e,t,r)=>{let o=q3(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},Kp=e=>{let t=K3(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Es,J3,X3,Y3,Jp,Jx=l(()=>{"use strict";Kx();Es=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),J3=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Es(r.input_tokens),n=Es(r.output_tokens);return o===0&&n===0?null:Kp({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},X3=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Es(r.prompt_tokens),n=Es(r.completion_tokens);return o===0&&n===0?null:Kp({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Y3=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=Es(r.promptTokenCount),n=Es(r.candidatesTokenCount);return o===0&&n===0?null:Kp({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Jp=(e,t,r)=>e==="anthropic"?J3(t,r):e==="openai"?X3(t,r):Y3(t,r)});var Z3,_P,Q3,eJ,tJ,rJ,oJ,wP,vP=l(()=>{"use strict";Ls();Jx();Z3=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},_P=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Ga(e,t.model)},Q3=async e=>{let t=_P("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=Z3(o);n.length>0&&e.onChunk?.(n);let s=Jp("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},eJ=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},tJ=async e=>{let t=_P("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=eJ(o);n.length>0&&e.onChunk?.(n);let s=Jp("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},rJ=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},oJ=async e=>{let t=_P("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=rJ(n);s.length>0&&e.onChunk?.(s);let i=Jp("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},wP=async e=>{try{return e.provider==="anthropic"?await Q3(e):e.provider==="openai"?await tJ(e):await oJ(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var at,Va=l(()=>{"use strict";at=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var Xx,nJ,Xp,TP=l(()=>{"use strict";Xx=g(require("node:path")),nJ="writer-api-secrets.json",Xp=e=>Xx.default.join(e,nJ)});var CP,Yx,sJ,no,Ye,so=l(()=>{"use strict";CP=g(require("node:fs"));Ls();TP();Yx=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sJ=e=>{if(!Yx(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=ks(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},no=e=>{let t=Xp(e);if(!CP.default.existsSync(t))return{};try{let r=JSON.parse(CP.default.readFileSync(t,"utf8"));if(!Yx(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=sJ(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Ye=(e,t)=>no(e)[t]??null});var $e,qa=l(()=>{"use strict";$e=e=>e==="api"?"api":"cli"});var Zx,We,an,Pr=l(()=>{"use strict";Zx=g(require("node:path"));Va();so();qa();We=e=>Zx.default.dirname(e),an=(e,t)=>{if($e(e.writerExecutionBackend)!=="api")return!1;let r=at(t);if(r===null)return!1;let o=We(e.layout.configPath),n=Ye(o,r);return n!==null&&n.apiKey.length>0}});var Ka,kP=l(()=>{"use strict";SP();vP();Va();so();Pr();Ka=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=at(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=We(e.layout.configPath),a=Ye(i,s);if(a===null){let d=Object.keys(no(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await wP({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:yP(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var Qx,Rs,LP=l(()=>{"use strict";Qx=require("node:child_process");Lt();Ba();kP();Pr();Rs=(e,t,r)=>new Promise(o=>{if(!he(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(an(e,t)){Ka(e,t,r).then(o);return}let n=Yt(t,r,ye({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,Qx.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=Cs(i.join("")),u=a.join("").trim(),m=[d.output.trim(),u].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var eW=l(()=>{"use strict"});var tW=l(()=>{"use strict";SP();LP();vP();eW();so();Pr()});var rW,oW,nW,sW=l(()=>{"use strict";rW="claude",oW="codex",nW="cursor"});var iW,iJ,EP,Ja,Yp=l(()=>{"use strict";iW=g(require("node:path"));ht();Le();iJ="ws://localhost:3000/api/agent-witch/ws",EP=e=>e.replace(/\/$/,""),Ja=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return EP(t);let r=iW.default.basename(e.installDir);if(r===Ki.production)return Ep;let o=e.configWsUrl?.trim()??"";return r===Ki.localhost?o.length>0?EP(o):iJ:o.length>0?EP(o):Ep}});var lJ,RP,xP=l(()=>{"use strict";sW();Yp();qa();lJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),RP=e=>{if(!lJ(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Ja({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??rW,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??oW,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??nW,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:$e(t.writerExecutionBackend),layout:e.layout}}}});var WP,IP,OP=l(()=>{"use strict";WP=g(require("node:fs"));B();xP();IP=e=>{let t=O(e);if(!WP.default.existsSync(t.configPath))return null;try{let r=JSON.parse(WP.default.readFileSync(t.configPath,"utf8")),o=RP({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Xa,aW=l(()=>{"use strict";Xa=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var MP,cJ,NP,lW=l(()=>{"use strict";MP=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cJ=e=>{if(!MP(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!MP(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(m=>{if(!MP(m))return[];let S=typeof m.itemKey=="string"?m.itemKey.trim():"",h=typeof m.relativePath=="string"?m.relativePath:"",y=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:h,contentSha256:y}]});return u.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},NP=cJ});var cW,dJ,Zp,DP=l(()=>{"use strict";cW=g(require("node:path")),dJ=(e,t)=>{let r=t.trim();return cW.default.join(e,"components","store",r.slice(0,2),r)},Zp=dJ});var dW,uJ,jP,uW=l(()=>{"use strict";dW=g(require("node:fs"));DP();uJ=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Zp(e.installDir,n.contentSha256);dW.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},jP=uJ});var Ya,xs,pJ,zP,mJ,$P,HP=l(()=>{"use strict";Ya=g(require("node:fs")),xs=g(require("node:path"));DP();pJ=(e,t)=>xs.default.join(e.installDir,"runs",t,"overlay"),zP=(e,t)=>xs.default.join(pJ(e,t),".cursor"),mJ=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=zP(e,t);Ya.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Zp(e.installDir,i.contentSha256);if(!Ya.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?xs.default.join(n,c):xs.default.join(n,i.itemKey);Ya.default.mkdirSync(xs.default.dirname(d),{recursive:!0}),Ya.default.copyFileSync(a,d)}return{ok:!0}},$P=mJ});var FP,pW,gJ,Za,mW=l(()=>{"use strict";FP=g(require("node:fs")),pW=g(require("node:path")),gJ=(e,t)=>{let r=pW.default.join(e.installDir,"runs",t);FP.default.existsSync(r)&&FP.default.rmSync(r,{recursive:!0,force:!0})},Za=gJ});var fJ,UP,gW=l(()=>{"use strict";HP();fJ=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=zP(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},UP=fJ});var BP,hJ,yJ,SJ,PJ,AJ,$,fW=l(()=>{"use strict";BP=g(require("node:fs"));Yp();B();qa();hJ="claude",yJ="codex",SJ="cursor",PJ="agy",AJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=O();if(!BP.default.existsSync(e.configPath))return null;try{let t=JSON.parse(BP.default.readFileSync(e.configPath,"utf8"));if(!AJ(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Ja({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:$e(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:hJ,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:yJ,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:SJ,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:PJ,pairingToken:s,layout:e}}catch{return null}}});var Qp,hW,yW=l(()=>{"use strict";Qp=g(require("node:fs"));TP();hW=(e,t)=>{let r=Xp(e);Qp.default.mkdirSync(e,{recursive:!0}),Qp.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Qp.default.chmodSync(r,384)}catch{}}});var Qa,SW,em=l(()=>{"use strict";Qa=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},SW=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Qa(t)}});var el,bJ,GP,VP,PW=l(()=>{"use strict";el=g(require("node:fs"));so();yW();em();Ls();Pr();bJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GP=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=SW(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?ks(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},VP=e=>{let t=We(e.configPath),r={};if(el.default.existsSync(e.configPath))try{let n=JSON.parse(el.default.readFileSync(e.configPath,"utf8"));bJ(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,el.default.mkdirSync(t,{recursive:!0}),el.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=GP(GP(GP(no(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);hW(t,o)}});var tm,qP=l(()=>{"use strict";tm={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var KP,AW=l(()=>{"use strict";Va();so();Pr();Pr();KP=(e,t)=>{if(an(e,t)||t==="antigravity")return!1;let r=at(t);if(r===null)return!1;let o=We(e.layout.configPath),n=Ye(o,r);return n===null||n.apiKey.trim().length===0}});var bW,JP,XP=l(()=>{"use strict";bW=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},JP=async e=>{let t=bW(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=bW(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var _J,YP,_W=l(()=>{"use strict";re();OP();XP();_J=1e4,YP=()=>JP({listProfileEmails:dp,readConfig:IP,pollIntervalMs:_J,logWaiting:e=>{console.error(e)}})});var le=l(()=>{"use strict";LP();tW();OP();Yp();aW();lW();uW();HP();mW();gW();qa();fW();PW();so();Pr();em();Ls();qP();kP();Pr();AW();Va();so();_W();xP();XP()});var wW,ZP,vW=l(()=>{"use strict";wW=g(require("node:path"));B();Le();Gx();Np();Dp();le();ZP=(e=k())=>{let t=Bx(e);if(t!==null)return t;let r=Ne(e);if(r!==null){let n=vs(wW.default.join(e,Ve,r,"config.json"));if(n!==null)return n}let o=$()?.pairingToken.trim()??"";return o.length===0?null:_s(o)}});var rm,TW,wJ,vJ,CW,om,tl,nm,rl=l(()=>{"use strict";rm=g(require("node:fs")),TW=g(require("node:path")),wJ="wake-port.json",vJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),CW=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,om=e=>TW.default.join(e,wJ),tl=e=>{let t=om(e);if(!rm.default.existsSync(t))return null;try{let r=JSON.parse(rm.default.readFileSync(t,"utf8"));if(vJ(r)&&CW(r.wakePort))return r.wakePort}catch{return null}return null},nm=(e,t)=>{if(!CW(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=om(e);rm.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Ede,Rde,xde,Et,kW,ol=l(()=>{"use strict";B();rl();je();rl();Ede=eo(),Rde=`${fe()}-wake`,xde=fe(),Et=()=>{let e=k();return ds({filePort:tl(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:eo(e)})},kW=e=>{let t=k();tl(t)===null&&nm(t,e)}});var LW=l(()=>{"use strict";Np();re();Dp();vW();le();ol()});var QP,nl,sl,EW=l(()=>{"use strict";QP=g(require("node:os"));LW();nl=()=>{let e=se();return{ok:!0,port:Et(),hostname:QP.default.hostname(),profileCount:e.length}},sl=()=>{let e=se(),t=ZP(),r=uP();return{hostname:QP.default.hostname(),port:Et(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var eA=l(()=>{"use strict";EW()});var RW,xW,WW,sm,Ws=l(()=>{"use strict";RW="materialization.json",xW="backups",WW=".gitignore",sm=e=>`harness-set:${e.trim()}`});var IW,OW,im,MW=l(()=>{"use strict";IW=g(require("node:crypto")),OW=g(require("node:fs")),im=e=>{try{let t=OW.default.readFileSync(e);return IW.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var io,ln,TJ,NW,tA,DW=l(()=>{"use strict";io=g(require("node:fs")),ln=g(require("node:path"));MW();TJ=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=ln.default.join(t,n,o);return io.default.mkdirSync(ln.default.dirname(s),{recursive:!0}),io.default.copyFileSync(r,s),ln.default.relative(e,s).replaceAll("\\","/")},NW=e=>{let t=ln.default.join(e.repoRoot,e.repoRelativeDestination),r=im(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(io.default.existsSync(t)){let n=im(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=TJ(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return io.default.mkdirSync(ln.default.dirname(t),{recursive:!0}),io.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return io.default.mkdirSync(ln.default.dirname(t),{recursive:!0}),io.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},tA=e=>{let t=im(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var rA,jW,Is,am=l(()=>{"use strict";rA=g(require("node:fs"));Ws();jW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Is=e=>{if(!rA.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(rA.default.readFileSync(e,"utf8"));if(jW(t)&&t.version===1&&jW(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var ao,lm,cm,oA=l(()=>{"use strict";ao=g(require("node:fs")),lm=g(require("node:path"));Ws();cm=e=>{let t=new Set(e.setSlugs.map(s=>sm(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=lm.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=lm.default.join(e.repoRoot,i.backupPath);ao.default.existsSync(c)?(ao.default.mkdirSync(lm.default.dirname(a),{recursive:!0}),ao.default.copyFileSync(c,a),o.push(s)):ao.default.existsSync(a)&&ao.default.rmSync(a,{force:!0})}else ao.default.existsSync(a)&&ao.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var nA,Os,dm=l(()=>{"use strict";nA=g(require("node:path"));Ws();Os=e=>({ledgerFilePath:nA.default.join(e.metaDirPath,RW),backupsDirPath:nA.default.join(e.metaDirPath,xW)})});var sA,zW,$W=l(()=>{"use strict";sA=g(require("node:path")),zW=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return sA.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return sA.default.posix.join(s,e,n)}});var iA,HW,al,aA=l(()=>{"use strict";iA=g(require("node:fs")),HW=g(require("node:path")),al=(e,t)=>{iA.default.mkdirSync(HW.default.dirname(e),{recursive:!0}),iA.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var lA,CJ,He,lo=l(()=>{"use strict";lA=g(require("node:os")),CJ=e=>{let t=e.trim();return t.startsWith("~/")?`${lA.default.homedir()}${t.slice(1)}`:t==="~"?lA.default.homedir():t},He=CJ});var um,FW,kJ,UW,BW=l(()=>{"use strict";um=g(require("node:fs")),FW=g(require("node:path"));Ws();Vo();kJ=`*
!${yp}
`,UW=e=>{let t=FW.default.join(e,WW);um.default.existsSync(t)||(um.default.mkdirSync(e,{recursive:!0}),um.default.writeFileSync(t,kJ))}});var cn,yt,dn=l(()=>{"use strict";cn=g(require("node:path"));Vo();lo();yt=e=>{let t=He(e),r=cn.default.join(t,JR);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:cn.default.join(r,"rag"),memoryDirPath:cn.default.join(r,XR),reportsDirPath:cn.default.join(r,ZR),metaFilePath:cn.default.join(r,yp),ragChunksFilePath:cn.default.join(r,"rag",YR)}}});var Zt,VW,LJ,EJ,qe,pm=l(()=>{"use strict";Zt=g(require("node:fs")),VW=g(require("node:path"));Vo();BW();dn();LJ=(e,t)=>{if(Zt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Zt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},EJ=e=>{Zt.default.existsSync(e.ragChunksFilePath)||Zt.default.writeFileSync(e.ragChunksFilePath,"");let t=VW.default.join(e.memoryDirPath,ps);Zt.default.existsSync(t)||Zt.default.writeFileSync(t,"")},qe=e=>{let t=yt(e.projectFolderPath);return Zt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Zt.default.mkdirSync(t.ragDirPath,{recursive:!0}),Zt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),UW(t.metaDirPath),LJ(t,e),EJ(t),{ok:!0,layout:t}}});var qW,KW,JW,XW,mm,gm=l(()=>{"use strict";qW="components",KW="store",JW="versions",XW="installed.json",mm=e=>`harness-set:${e.trim()}`});var cA,YW,fm,dA=l(()=>{"use strict";cA=g(require("node:fs")),YW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fm=e=>{if(!cA.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(cA.default.readFileSync(e,"utf8"));if(YW(t)&&t.version===1&&YW(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var ll,Ms,hm=l(()=>{"use strict";ll=g(require("node:path"));gm();Ms=e=>{let t=ll.default.join(e,qW);return{componentsRootDir:t,storeDir:ll.default.join(t,KW),versionsDir:ll.default.join(t,JW),installedFilePath:ll.default.join(t,XW)}}});var uA,ZW,ym,Sm,Pm=l(()=>{"use strict";uA=g(require("node:crypto")),ZW=g(require("node:fs")),ym=e=>uA.default.createHash("sha256").update(e,"utf8").digest("hex"),Sm=e=>{try{let t=ZW.default.readFileSync(e);return uA.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var pA,QW,e0,t0=l(()=>{"use strict";pA=g(require("node:fs")),QW=g(require("node:path")),e0=(e,t)=>{pA.default.mkdirSync(QW.default.dirname(e),{recursive:!0}),pA.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var mA,gA,r0,o0=l(()=>{"use strict";mA=g(require("node:fs")),gA=g(require("node:path")),r0=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=gA.default.join(e,r),n=gA.default.join(o,`${t.versionId}.json`);mA.default.mkdirSync(o,{recursive:!0}),mA.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var Am,n0,s0,i0=l(()=>{"use strict";Am=g(require("node:fs")),n0=g(require("node:path"));Pm();s0=e=>{let t=ym(e.content),r=n0.default.join(e.storeDir,t);return Am.default.existsSync(r)||(Am.default.mkdirSync(e.storeDir,{recursive:!0}),Am.default.writeFileSync(r,e.content)),t}});var fA,a0,RJ,bm,hA=l(()=>{"use strict";fA=g(require("node:fs")),a0=g(require("node:path"));gm();dA();hm();Pm();t0();o0();i0();RJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bm=e=>{let t=Ms(e.installDir),r=mm(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!RJ(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=a0.default.join(e.harnessRootDir,a);if(!fA.default.existsSync(c))continue;let d=fA.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Sm(c);if(u!==null){if(ym(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);s0({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:u})}}if(n.length===0)return;r0(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=fm(t.installedFilePath);e0(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var SA,yA,l0,c0=l(()=>{"use strict";SA=g(require("node:fs"));hA();dA();hm();yA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),l0=e=>{if(!SA.default.existsSync(e.harnessManifestPath))return;let t=Ms(e.installDir),r=fm(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(SA.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!yA(o)||o.version!==1||!yA(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!yA(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];bm({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var PA,d0,u0,p0=l(()=>{"use strict";PA=g(require("node:fs")),d0=g(require("node:path")),u0=e=>{let t=e.componentId.replaceAll("/","_"),r=d0.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!PA.default.existsSync(r))return null;try{let o=JSON.parse(PA.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var _m,wm,m0,g0=l(()=>{"use strict";_m=g(require("node:fs")),wm=g(require("node:path"));gm();c0();p0();hm();Pm();m0=e=>{l0({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Ms(e.layout.installDir),r=mm(e.setSlug),o=u0({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=wm.default.join(t.storeDir,i.contentSha256);if(_m.default.existsSync(a)&&Sm(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?wm.default.join(e.layout.harnessRootDir,n):wm.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!_m.default.existsSync(s))return null;try{if(!_m.default.statSync(s).isFile())return null}catch{return null}return s}});var f0,xJ,AA,Qt,cl=l(()=>{"use strict";am();dm();dn();f0="harness-set:",xJ=e=>{let t=e.trim();if(!t.startsWith(f0))return null;let r=t.slice(f0.length).trim();return r.length>0?r:null},AA=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=xJ(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Qt=e=>{let t=yt(e),{ledgerFilePath:r}=Os(t),o=Is(r);return AA(o)}});var vm,bA,dl,WJ,Ar,ul,Ns=l(()=>{"use strict";vm=g(require("node:fs")),bA=g(require("node:os")),dl=g(require("node:path")),WJ=()=>vm.default.realpathSync(dl.default.resolve(bA.default.homedir())),Ar=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?dl.default.join(bA.default.homedir(),t.slice(1)):t,o;try{o=vm.default.realpathSync(dl.default.resolve(r))}catch{return null}let n=WJ();return o===n||o.startsWith(`${n}${dl.default.sep}`)?o:null},ul=e=>{let t=Ar(e);if(t===null)return null;try{if(!vm.default.statSync(t).isFile())return null}catch{return null}return t}});var _A,wA=l(()=>{"use strict";_A=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Cm,h0,Tm,IJ,pl,vA=l(()=>{"use strict";Cm=g(require("node:fs")),h0=g(require("node:path"));Ws();DW();am();oA();dm();$W();aA();lo();pm();g0();cl();Ns();wA();Tm=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),IJ=e=>{if(!Cm.default.existsSync(e))return null;try{let t=JSON.parse(Cm.default.readFileSync(e,"utf8"));if(Tm(t)&&t.version===1)return t}catch{return null}return null},pl=e=>{let t=[...new Set(e.setSlugs.map(A=>A.trim()).filter(A=>A.length>0))],r=He(e.projectFolderPath),o=Ar(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Cm.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=qe({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Os(s.layout),d=Qt(o).filter(A=>!t.includes(A)),u=Is(i),m=0;if(d.length>0){let A=cm({repoRoot:o,setSlugs:d,ledger:u});u=A.ledger,m=A.summary.removedPaths.length}if(t.length===0)return al(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let S=IJ(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=Tm(S.sets)?S.sets:{},y=0,p=0,P=0;for(let A of t){let f=h[A];if(!Tm(f))return{ok:!1,errorMessage:`Harness set "${A}" is not installed locally.`};let b=typeof f.version=="number"?String(f.version):"1",w=sm(A),T=Array.isArray(f.items)?f.items:[];for(let C of T){if(!Tm(C))continue;let L=typeof C.path=="string"?C.path.trim():"";if(L.length===0)continue;let x=_A(L);if(x===null)continue;let I=zW(A,x),N=h0.default.posix.join(".cursor",I).replaceAll("\\","/"),U=typeof C.id=="string"?C.id.trim():"",V=m0({layout:e.layout,setSlug:A,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:L,manifestItemId:U});if(V===null)continue;let q=NW({repoRoot:o,backupsDir:a,repoRelativeDestination:N,sourceAbsolutePath:V,componentId:w,versionId:b,ledger:u});if(q.kind==="skipped_unchanged"){p+=1;continue}if(q.kind==="backed_up_user_file"){P+=1,y+=1,u={version:1,entries:{...u.entries,[N]:tA({componentId:w,versionId:b,sourceAbsolutePath:V,backupPath:q.backupPath})}};continue}y+=1,u={version:1,entries:{...u.entries,[N]:tA({componentId:w,versionId:b,sourceAbsolutePath:V})}}}}return y===0&&p===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(al(i,u),{ok:!0,writtenFileCount:y,skippedFileCount:p,backedUpFileCount:P,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var y0,km,OJ,MJ,NJ,DJ,jJ,zJ,$J,HJ,FJ,ml,Lm=l(()=>{"use strict";y0=g(require("node:crypto")),km=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},OJ=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},MJ=(e,t)=>{let r=OJ(t),o=km(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},NJ=(e,t,r)=>{let o=MJ(t,r);return`shared/items/${e}/${o}`},DJ=["rules","skills","commands","instructions","agents"],jJ=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),zJ=(e,t)=>[...e.filter(o=>o.id!==t.id),t],$J=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},HJ=e=>y0.default.createHash("sha256").update(e,"utf8").digest("hex"),FJ=e=>({id:e.id,kind:e.kind,title:e.title,path:NJ(e.id,e.kind,e.title),contentSha256:HJ(e.content)}),ml=e=>{let t=new Date().toISOString(),r=e.existingManifest??jJ(e.hostname,t),o=km(e.bundle.slug),n=$J(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...DJ.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let m=FJ(u);return{files:[...d.files,{relativePath:m.path,content:u.content}],nextItems:zJ(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var co,S0,Em,UJ,un,TA=l(()=>{"use strict";co=g(require("node:fs")),S0=g(require("node:os")),Em=g(require("node:path"));Lm();UJ=e=>{if(!co.default.existsSync(e))return null;try{let t=JSON.parse(co.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},un=e=>{try{let t=UJ(e.layout.harnessManifestPath),r=ml({bundle:e.bundle,hostname:S0.default.hostname(),existingManifest:t});co.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)co.default.mkdirSync(Em.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Em.default.join(e.layout.harnessRootDir,o.relativePath);co.default.mkdirSync(Em.default.dirname(n),{recursive:!0}),co.default.writeFileSync(n,o.content)}return co.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var CA,P0=l(()=>{"use strict";TA();vA();CA=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=un({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return pl({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var A0,b0=l(()=>{"use strict";A0=["rule","skill","command","instruction","agent"]});var _0,BJ,GJ,er,kA=l(()=>{"use strict";b0();_0=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),BJ=e=>typeof e=="string"&&A0.includes(e),GJ=e=>{if(!_0(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!BJ(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},er=e=>{if(!_0(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=GJ(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var w0,VJ,LA,v0=l(()=>{"use strict";w0=require("node:zlib");kA();VJ="x-agent-witch-token",LA=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[VJ]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,w0.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=er(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var RA,EA,tr,T0=l(()=>{"use strict";RA=g(require("node:fs")),EA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),tr=e=>{if(!RA.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(RA.default.readFileSync(e.harnessManifestPath,"utf8"));if(!EA(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=EA(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!EA(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Rm,C0=l(()=>{"use strict";Rm=()=>"~"});var k0,L0,E0=l(()=>{"use strict";k0=require("node:crypto"),L0=e=>`local-${(0,k0.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var xA,R0=l(()=>{"use strict";xA=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var gl,xm,WA=l(()=>{"use strict";gl=g(require("node:path")),xm=e=>{let t=gl.default.dirname(e),r=gl.default.basename(t);return r==="agents"?gl.default.basename(gl.default.dirname(t)):r}});var fl,br,x0,qJ,KJ,JJ,Wm,W0,IA=l(()=>{"use strict";fl=g(require("node:fs")),br=g(require("node:path"));E0();R0();WA();x0=new Set(["node_modules",".git","dist","build",".next","coverage"]),qJ=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},KJ=(e,t)=>{let r=br.default.basename(t);if(e==="skill"){let o=t.split(br.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},JJ=e=>{let t=[],r=(n,s)=>{let i;try{i=fl.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&x0.has(a.name))continue;let c=br.default.join(n,a.name),d=s?br.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;xA(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=br.default.join(e,n);fl.default.existsSync(s)&&r(s,n)}let o=br.default.join(e,"skills");return fl.default.existsSync(o)&&r(o,"skills"),t},Wm=e=>{let t=JJ(e);if(t.length===0)return null;let r=br.default.dirname(e),o=xm(e),n=qJ(o),s=t.map(i=>{let a=xA(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:L0(i.absolutePath),kind:a,title:KJ(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},W0=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=fl.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||x0.has(a.name))continue;let c=br.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var I0,OA,XJ,MA,O0=l(()=>{"use strict";I0=g(require("node:fs")),OA=g(require("node:path"));IA();Ns();XJ=e=>{let t=Ar(e.trim());if(t===null)return null;if(OA.default.basename(t)===".cursor")return t;let r=OA.default.join(t,".cursor");try{if(I0.default.statSync(r).isDirectory())return Ar(r)}catch{return null}return null},MA=e=>{let t=XJ(e.projectPath);if(t===null)return null;let r=Wm(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var M0,YJ,Im,NA,N0=l(()=>{"use strict";M0=g(require("node:path"));IA();Ns();WA();YJ=5,Im=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},NA=e=>{let t=Ar(e.scanRoot.trim());if(t===null)return Im(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of W0(t,YJ,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=Ar(s);if(i===null)continue;let a=xm(i);Im(e.response,"folder",{cursorDir:i,groupName:a,repoPath:M0.default.dirname(i)});let c=Wm(i);c!==null&&(r.push(c),Im(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Im(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var D0,j0,z0=l(()=>{"use strict";D0=g(require("node:path")),j0=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:D0.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Ke,$0,DA,ZJ,jA,zA,Om,$A,hl,H0=l(()=>{"use strict";Ke=g(require("node:fs")),$0=g(require("node:os")),DA=g(require("node:path"));Lm();hA();Ns();z0();ZJ=e=>{if(!Ke.default.existsSync(e))return null;try{let t=JSON.parse(Ke.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},jA=e=>{let t=e.hostname??$0.default.hostname(),r=ZJ(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let c=[];for(let u of a){let m=ul(u.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let S=Ke.default.readFileSync(m,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:S,setSlugs:[i.slug]})}let d=ml({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Ke.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Ke.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=DA.default.join(e.layout.harnessRootDir,i.relativePath);Ke.default.mkdirSync(DA.default.dirname(a),{recursive:!0}),Ke.default.writeFileSync(a,i.content)}Ke.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=km(i.slug),d=r.sets[c];d!==void 0&&bm({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},zA="reveal-cache.json",Om=(e,t)=>{Ke.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Ke.default.writeFileSync(`${e.harnessRootDir}/${zA}`,`${JSON.stringify(t,null,2)}
`)},$A=e=>{let t=`${e.harnessRootDir}/${zA}`;Ke.default.existsSync(t)&&Ke.default.unlinkSync(t)},hl=e=>{let t=`${e.harnessRootDir}/${zA}`;if(!Ke.default.existsSync(t))return null;try{let r=JSON.parse(Ke.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return j0(r)}catch{return null}return null}});var uo=l(()=>{"use strict";vA();P0();wA();TA();v0();kA();Lm();T0();C0();O0();Ns();N0();H0()});var HA,F0=l(()=>{"use strict";uo();je();HA=e=>{let t=O(e.profileEmail);return un({bundle:e.bundle,layout:t})}});var U0=l(()=>{"use strict";F0();uo()});var QJ,B0,e6,G0,pn,Mm,V0=l(()=>{"use strict";QJ=["agentwitch.com","www.agentwitch.com"],B0=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,e6=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},G0=e=>{let t=e6(e);return!!(QJ.includes(t)||B0.test(e.trim().toLowerCase()))},pn=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return G0(r)?B0.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Mm=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:pn(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var yl=l(()=>{"use strict";V0()});var _r,Sl=l(()=>{"use strict";_r=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Pl,q0=l(()=>{"use strict";U0();yl();Sl();Pl=e=>{if(!_r(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=er(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!pn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=HA({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var FA=l(()=>{"use strict";q0()});var t6,Ds,UA=l(()=>{"use strict";t6=e=>e==="hourly"||e==="daily"||e==="weekdays",Ds=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!t6(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Al,Nm,K0,J0,BA,Rt,Dm,jm,zm,$m,Hm=l(()=>{"use strict";Al=g(require("node:fs")),Nm=g(require("node:path"));UA();K0="automations.json",J0=e=>e.profileEmail!==null?Nm.default.join(e.installDir,"profiles",e.profileEmail,K0):Nm.default.join(e.installDir,K0),BA=()=>({version:1,automations:[]}),Rt=e=>{let t=J0(e);if(!Al.default.existsSync(t))return BA();try{let r=JSON.parse(Al.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?BA():{version:1,automations:r.automations.flatMap(n=>{let s=Ds(n);return s!==null?[s]:[]})}}catch{return BA()}},Dm=(e,t)=>{let r=J0(e);Al.default.mkdirSync(Nm.default.dirname(r),{recursive:!0}),Al.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},jm=(e,t)=>{Dm(e,{version:1,automations:t})},zm=(e,t)=>{let o=Rt(e).automations.filter(n=>n.id!==t.id);Dm(e,{version:1,automations:[...o,t]})},$m=(e,t)=>Rt(e).automations.find(r=>r.id===t)??null});var Fe,wr=l(()=>{"use strict";Fe="x-agent-witch-token"});var GA=l(()=>{"use strict";xp();Ip()});var Y,mn,VA,bl,qA,r6,KA,_l,gn,JA,js=l(()=>{"use strict";wr();GA();Y=e=>{let t=Ee(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},mn=e=>({[Fe]:e,"Content-Type":"application/json"}),VA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:mn(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},bl=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:mn(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},qA=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:mn(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},r6=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},KA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:mn(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},_l=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:mn(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return r6(r)}catch{return null}},gn=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:mn(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},JA=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:mn(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var fn,X0,Y0,o6,XA,Z0,YA=l(()=>{"use strict";fn=g(require("node:fs")),X0=g(require("node:path")),Y0=e=>X0.default.join(e.harnessRootDir,"projects-registry.json"),o6=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),XA=e=>{let t=Y0(e);if(!fn.default.existsSync(t))return[];try{let r=JSON.parse(fn.default.readFileSync(t,"utf8"));return o6(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},Z0=e=>{let t=Y0(e);if(!fn.default.existsSync(t))return;let r=`${t}.migrated`;if(fn.default.existsSync(r)){fn.default.unlinkSync(t);return}fn.default.renameSync(t,r)}});var Q0,n6,s6,eI,tI=l(()=>{"use strict";lo();Q0=e=>He(e),n6=e=>new Set(e.map(t=>Q0(t.folderPath))),s6=e=>new Set(e.map(t=>t.id)),eI=(e,t)=>{let r=n6(t),o=s6(t),n=[],s=new Set;for(let i of e){let a=Q0(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var ZA,QA=l(()=>{"use strict";js();YA();tI();ZA=async(e,t)=>{let r=XA(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await _l(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=eI(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await KA(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&Z0(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var eb,vr,wl=l(()=>{"use strict";eb=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),vr=(e,t)=>e.find(r=>r.id===t)??null});var po,vl=l(()=>{"use strict";js();QA();wl();po=async(e,t)=>{t!==void 0&&await ZA(t,e);let r=Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await _l(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=eb(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var rI=l(()=>{"use strict"});var tb,i6,Fm,rb=l(()=>{"use strict";tb=g(require("node:fs"));dn();i6=e=>{let t=yt(e);if(!tb.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(tb.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},Fm=i6});var ob,nb,oI=l(()=>{"use strict";ob=g(require("node:path"));lo();rb();nb=e=>{let t=ob.default.resolve(He(e)),r=o=>{let{projectId:n}=Fm(o);if(n!==null)return n;let s=ob.default.dirname(o);return s===o?null:r(s)};return r(t)}});var a6,l6,Um,sb=l(()=>{"use strict";a6="Default",l6=e=>e.trim().toLowerCase()===a6.toLowerCase(),Um=l6});var Q,nI,c6,d6,u6,p6,m6,mo,Bm=l(()=>{"use strict";sb();Q=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nI=(e,t)=>e.length===0?`<p class="empty">${Q(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Q(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Q(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,c6=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,d6=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from Agent Witch Cloud.":"This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Q(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},u6=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
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
      </div>`},p6=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?u6({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?d6({project:e.project,alreadyInRepo:!1}):c6();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),u=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this Mac.');">
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
      </div>`},m6=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Q(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Q(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},mo=e=>{let t=e.flashError?`<div class="alert-error">${Q(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Q(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(m,S)=>`<a class="project-tab${e.activeTab===m?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${m}">${Q(S)}</a>`,n=e.composition?.items.filter(m=>m.kind==="workflow")??[],s=e.composition?.items.filter(m=>m.kind==="agent")??[],i="";e.activeTab==="harness"?i=p6({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=nI(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=nI(s,"No agents installed for this project yet."):i=m6({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});let a=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,c=`${a}?rename=1`,d=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${Q(a)}" target="_blank" rel="noopener noreferrer">Open in Agent Witch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${Q(c)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,u=Um(e.project.name)?"":`<section class="danger-zone stack">
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
    </section>${u}`}});var g6,f6,sI,iI=l(()=>{"use strict";uo();wr();g6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),f6=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[Fe]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!g6(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=er(n);return s===null?[]:[s]})}catch{return null}},sI=f6});var aI,ib,lI=l(()=>{"use strict";le();uo();Bm();vl();iI();wl();cl();js();ht();aI=e=>({kind:"page",title:e.project.name,body:mo({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:tr(e.layout),linkedSetSlugs:Qt(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),ib=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let o=await po(r,e.layout),n=vr(o.projects,t);if(n===null)return{kind:"not_found"};let s=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??it,a=s===null?null:await sI(s,n.id);if(a===null)return aI({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=CA({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return aI({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await gn(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var cI,ab,dI=l(()=>{"use strict";le();uo();ht();js();Bm();pm();lo();vl();wl();cl();am();oA();dm();aA();cI=e=>({kind:"page",title:e.project.name,body:mo({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:tr(e.layout),linkedSetSlugs:Qt(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),ab=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=$();if(n===null)return{kind:"not_found"};let s=await po(n,e.layout),i=vr(s.projects,r);if(i===null)return{kind:"not_found"};let a=Y({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??it;if(o.length===0)return cI({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=He(i.projectFolderPath),u=qe({projectFolderPath:d}),{ledgerFilePath:m}=Os(u.layout),S=Is(m),h=AA(S);if(!h.includes(o))return cI({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let y=h.filter(f=>f!==o),p=cm({repoRoot:u.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:S});al(m,p.ledger);let P=a===null?!1:await gn(a,i.id,y),A=new URLSearchParams({linked:"1",removed:o,files:String(p.summary.removedPaths.length),bindingsSynced:P?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${A.toString()}`}}});var h6,lb,uI=l(()=>{"use strict";h6=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,lb=h6});var pI=l(()=>{"use strict"});var mI=l(()=>{"use strict"});var gI=l(()=>{"use strict";pI();mI()});var y6,go,fI=l(()=>{"use strict";y6=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],go=(e=process.env)=>{let t={...e};for(let r of y6)delete t[r];return t}});var hI=l(()=>{"use strict";fI()});var cb,yI=l(()=>{"use strict";cb={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var db=l(()=>{"use strict";yI()});var Gm,ub=l(()=>{"use strict";Gm={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var Vm=l(()=>{"use strict";gI();hI();ht();db();ub()});var SI,PI,S6,qm,Km,AI=l(()=>{"use strict";SI=require("node:child_process"),PI=require("node:util");Vm();S6=(0,PI.promisify)(SI.execFile),qm=async(e,t)=>{try{let{stdout:r}=await S6("git",t,{cwd:e,env:go(),maxBuffer:1048576});return r.trim()}catch{return null}},Km=async e=>{let t=await qm(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await qm(e,["rev-parse","--abbrev-ref","HEAD"]),o=await qm(e,["status","--porcelain"]),n=await qm(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var pb,bI=l(()=>{"use strict";pb=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var P6,mb,_I=l(()=>{"use strict";P6=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},mb=P6});var A6,gb,wI=l(()=>{"use strict";wr();A6=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[Fe]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},gb=A6});var vI,fo,TI=l(()=>{"use strict";vI=require("node:child_process"),fo=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,vI.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var CI=l(()=>{"use strict";vl()});var Tl,kI=l(()=>{"use strict";wr();Tl=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[Fe]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var fb,LI=l(()=>{"use strict";wr();fb=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[Fe]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var xt=l(()=>{"use strict";vl();wl();rI();lo();pm();oI();lI();dI();cl();uI();AI();bI();_I();wI();TI();CI();kI();LI();QA();YA();js()});var Jm,Cl,EI,hb,hn,yb=l(()=>{"use strict";Jm=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},Cl=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Jm(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},EI=e=>e>=1&&e<=5,hb=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Jm(t,"UTC")},hn=e=>{let t=e.from??new Date,r=Jm(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Cl(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=Cl(r,e.timeZone,o,0),s=Jm(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?Cl(hb(r),e.timeZone,o,0):n;if(!i&&EI(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=hb(a),EI(a.weekday))return Cl(a,e.timeZone,o,0);return Cl(hb(r),e.timeZone,o,0)}});var RI,Sb,Tr,Pb=l(()=>{"use strict";RI=require("node:crypto");le();xt();yb();Hm();Sb=!1,Tr=async e=>{if(Sb)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=$m(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};Sb=!0;let n=(0,RI.randomUUID)();try{let s=await Rs(t,"claude-cli",o.prompt);await JA(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=hn({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return zm(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{Sb=!1}}});var Xm,xI=l(()=>{"use strict";le();Pb();Hm();Xm=async()=>{let e=$();if(e===null)return;let t=Rt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await Tr(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var kl=l(()=>{"use strict";Hm();xI();Pb();yb()});var WI=l(()=>{"use strict";kl()});var II=l(()=>{"use strict";UA()});var OI=l(()=>{"use strict";II()});var Ab=l(()=>{"use strict";kl()});var b6,_6,Ll,bb=l(()=>{"use strict";WI();OI();Ab();je();b6=e=>e!==void 0&&e.trim().length>0?O(e.trim()):O(),_6=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??hn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??hn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Ll=e=>{let t=b6(e.profileEmail),r=Rt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Ds(s);return i!==null?[_6(i,o.get(i.id))]:[]});return jm(t,n),{ok:!0,writtenCount:n.length}}});var _b=l(()=>{"use strict";kl()});var MI=l(()=>{"use strict";le()});var NI=l(()=>{"use strict";bb();_b();Ab();MI()});var DI,El,Rl,xl,jI=l(()=>{"use strict";DI=g(require("node:os"));NI();yl();Sl();El=e=>{if(!_r(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!pn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=Ll({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Rl=async e=>{if(!_r(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:pn(t)?Tr(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},xl=()=>{let e=$(),t=e!==null?Rt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:DI.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var wb=l(()=>{"use strict";jI()});var Ym=l(()=>{"use strict";re()});var Zm=l(()=>{"use strict";re()});var Qm,$I,HI,zI,w6,v6,zs,vb=l(()=>{"use strict";Qm=g(require("node:fs")),$I=g(require("node:os")),HI=g(require("node:path"));Ym();Zm();rl();je();zI=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},w6=e=>HI.default.join($I.default.homedir(),"Library","LaunchAgents",`${e}.plist`),v6=async e=>Qm.default.existsSync(w6(e))?(await De(e)).ok:!1,zs=async(e=k())=>{let t=Qm.default.existsSync(om(e)),r=!Qm.default.existsSync(qt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=tl(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await zI(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${fe(e)}-wake`;await v6(i)&&s.push(i);for(let c of se(e))(await De(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await zI(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var FI=l(()=>{"use strict";re()});var Tb=l(()=>{"use strict";on();re()});var Cb=l(()=>{"use strict";on()});var kb=l(()=>{"use strict";re()});var BI,UI,Wl,Lb=l(()=>{"use strict";BI=g(require("node:fs"));ht();Ym();Zm();je();UI=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},Wl=async(e=k())=>{if(!BI.default.existsSync(qt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await UI())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of se(e))(await De(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await UI();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var GI=l(()=>{"use strict";re()});var VI,yn,Eb,T6,C6,k6,qI,L6,KI,$s,eg=l(()=>{"use strict";VI=require("node:crypto"),yn=g(require("node:fs")),Eb=g(require("node:path"));je();T6="watchdog-log.ndjson",C6=200,k6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qI=(e=k())=>{let t=O(),r=t.installDir===e?t.logsDir:Ho({installDir:e,profileEmail:t.profileEmail});return Eb.default.join(r,T6)},L6=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!k6(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},KI=(e,t=k())=>{let r={id:(0,VI.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=qI(t);yn.default.mkdirSync(Eb.default.dirname(o),{recursive:!0});let n=yn.default.existsSync(o)?yn.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-C6+1)),JSON.stringify(r)];return yn.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},$s=(e=20,t=k())=>{let r=qI(t);if(!yn.default.existsSync(r))return[];let o=yn.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=L6(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var Rb,xb,Wb,Ib=l(()=>{"use strict";Le();Rb=Ji.watchdogReinstallState,xb=900*1e3,Wb=3e3});var JI=l(()=>{"use strict";Ib()});var XI={};ft(XI,{verifyAgentWitchReviveAfterKickstart:()=>R6});var E6,R6,YI=l(()=>{"use strict";JI();Cb();kb();je();E6=e=>new Promise(t=>{setTimeout(t,e)}),R6=async e=>{if(await E6(e.verifyDelayMs??Wb),!await Uo(e.launchAgentLabel))return!1;let r=e.profileEmail===null?O():O(e.profileEmail),o=Se(r);return!Re(o,e.staleAfterMs)}});var Il,Ob,x6,ZI,QI,Mb,Nb,Db=l(()=>{"use strict";Il=g(require("node:fs")),Ob=g(require("node:path"));B();Ib();x6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ZI=e=>Ob.default.join(e,Rb),QI=(e=k())=>{let t=ZI(e);if(!Il.default.existsSync(t))return null;try{let r=JSON.parse(Il.default.readFileSync(t,"utf8"));return!x6(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},Mb=(e=k(),t=Date.now())=>{let r=QI(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=xb:!0},Nb=(e=k(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=ZI(e);return Il.default.mkdirSync(Ob.default.dirname(o),{recursive:!0}),Il.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var jb,eO=l(()=>{"use strict";re();Db();jb=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!Mb())return{attempted:!1,ok:!1,targets:e};Nb();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await De(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var tO=l(()=>{"use strict";Db();eO()});var zb=l(()=>{"use strict";Xt()});var rO=l(()=>{"use strict";Xt()});var oO,Hs,nO,sO,iO,W6,I6,aO,O6,M6,lO,cO=l(()=>{"use strict";oO=require("node:child_process"),Hs=g(require("node:fs")),nO=g(require("node:os")),sO=g(require("node:path")),iO=require("node:util");zb();rO();je();W6=(0,iO.promisify)(oO.execFile),I6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aO=e=>{let t=Ne(e),r=t===null?O():O(t);if(!Hs.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Hs.default.readFileSync(r.configPath,"utf8"));return!I6(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},O6=e=>aO(e)?.wsUrl??null,M6=e=>{let t=O6(e);return t!==null?Ee(t):ze(e)?.appOrigin??null},lO=async e=>{let t=e?.installDir??k(),r=aO(t),o=r!==null?Ee(r.wsUrl):M6(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=sO.default.join(nO.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Hs.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??Ne(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await W6("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Hs.default.existsSync(i)&&Hs.default.unlinkSync(i)}}});var dO={};ft(dO,{attemptAgentWitchWatchdogReinstall:()=>N6});var N6,uO=l(()=>{"use strict";tO();cO();N6=async e=>jb(e,()=>lO())});var pO,mO,gO,D6,j6,z6,Ol,$b=l(()=>{"use strict";FI();Tb();Cb();kb();Lb();vb();Ym();Zm();je();Ss();GI();eg();pO=e=>e===null?O():O(e),mO=async(e,t,r)=>{if(!await Uo(e))return"not_running";let n=pO(t);if(kt(n))return"healthy";let s=Se(n);return Re(s,r)?"stale_connection":"healthy"},gO=async e=>{let t=e?.staleAfterMs??12e4,r=k(),o=se(r);return Promise.all(o.map(async n=>{let s=await mO(n.launchAgentLabel,n.profileEmail,t),i=pO(n.profileEmail),a=Se(i),c=await Uo(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Re(a,t),needsRevive:s!=="healthy",reason:s}}))},D6=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},j6=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",z6=async e=>{let t=await De(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(YI(),XI)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Ol=async e=>{if(!Ct())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=k();await zs(r),await Wl(r);let o=se(r),n=[];for(let u of o){let m=await mO(u.launchAgentLabel,u.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:m});continue}n.push(await z6({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let u=Fo();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(uO(),dO)),m=await u(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&KI({event:j6(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:D6(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var fO,tg,hO=l(()=>{"use strict";fO=g(require("node:os"));Tb();eg();$b();tg=async()=>{let e=await gO(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:fO.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:$s(1)[0]??null}}});var Hb=l(()=>{"use strict";vb();$b();hO();eg()});var Ml,Nl,Dl,yO=l(()=>{"use strict";re();Hb();Ml=async()=>{await zs();let e=se(),t=[];for(let r of e){let o=await De(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Fo();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Nl=Ol,Dl=Ol});var Fb=l(()=>{"use strict";yO()});var og,rg,SO,Ub,PO,$6,H6,F6,U6,B6,ng,AO=l(()=>{"use strict";og=require("node:child_process"),rg=g(require("node:fs")),SO=g(require("node:os")),Ub=g(require("node:path")),PO=require("node:util");re();B();$6=(0,PO.promisify)(og.execFile),H6=()=>Ub.default.join(SO.default.homedir(),"Library","LaunchAgents"),F6=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await $6("launchctl",["bootout",r]).catch(()=>{})},U6=e=>{let t=Ub.default.join(H6(),`${e}.plist`);rg.default.existsSync(t)&&rg.default.unlinkSync(t)},B6=e=>{(0,og.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},ng=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=k();if(!rg.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=fr(e);for(let r of t)await F6(r),U6(r);return B6(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var bO,sg,_O,Fs,wO,G6,V6,q6,Bb,K6,Gb,vO=l(()=>{"use strict";bO=require("node:child_process"),sg=g(require("node:fs")),_O=g(require("node:os")),Fs=g(require("node:path")),wO=require("node:util");re();G6=(0,wO.promisify)(bO.execFile),V6=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],q6=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],Bb=e=>{sg.default.existsSync(e)&&sg.default.rmSync(e,{force:!0})},K6=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await G6("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},Gb=async e=>{let r=(e.listLaunchAgentLabels??fr)(e.layout.installDir),o=e.launchAgentsDir??Fs.default.join(_O.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??K6;for(let i of r)await n(i),Bb(Fs.default.join(o,`${i}.plist`));let s=Fs.default.dirname(e.layout.configPath);for(let i of V6)Bb(Fs.default.join(s,i));for(let i of q6)Bb(Fs.default.join(e.layout.installDir,i));return sg.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var Vb,TO=l(()=>{"use strict";Vb="unknown_identity"});var qb=l(()=>{"use strict";ub();TO()});var J6,Kb,CO=l(()=>{"use strict";qb();J6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Kb=e=>e.type!=="system.error"||!J6(e.payload)?!1:e.payload.errorCode===Vb});var Jb=l(()=>{"use strict";AO();vO();CO()});var ig=l(()=>{"use strict";re();Xt();Jb();Hb()});var Us,ag,lg=l(()=>{"use strict";ig();Us=(e=20)=>$s(e),ag=tg});var cg,Bs,dg,ug=l(()=>{"use strict";ig();cg=tn,Bs=(e=20)=>Zo(e),dg=e=>en(e)});var pg,Xb=l(()=>{"use strict";ig();pg=()=>ng()});var kO=l(()=>{"use strict";eA();FA();wb();Fb();lg();ug();Xb()});var LO={};ft(LO,{buildAgentWitchAutomationStatusFromWakeServer:()=>xl,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>cg,buildAgentWitchWakeHealthResponse:()=>nl,buildAgentWitchWakeIdentityResponse:()=>sl,buildAgentWitchWatchdogStatus:()=>ag,installHarnessFromWakeServer:()=>Pl,readAgentWitchSelfUpdateLogEntries:()=>Bs,readAgentWitchWatchdogLogEntries:()=>Us,restartAgentWitchFromWakeServer:()=>Dl,reviveAgentWitchWebSocketFromWakeServer:()=>Nl,runAgentWitchSelfUpdateFromWakeServer:()=>dg,runAgentWitchUninstallLocalFromWakeServer:()=>pg,runAutomationFromWakeServer:()=>Rl,syncAutomationsFromWakeServer:()=>El,wakeAgentWitchLaunchAgents:()=>Ml});var EO=l(()=>{"use strict";kO()});var RO,xO,Yb,Zb,WO=l(()=>{"use strict";RO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),xO=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?RO(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?RO(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Yb=e=>{let t=e.watchdogLogs.map(xO).join(""),r=e.updateLogs.map(xO).join("");return`<!doctype html>
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
</html>`},Zb=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var IO,OO,MO=l(()=>{"use strict";IO=g(require("node:net")),OO=()=>new Promise((e,t)=>{let r=IO.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var NO,X6,Y6,Qb,DO=l(()=>{"use strict";NO=g(require("node:net"));re();MO();ol();rl();je();X6=e=>new Promise(t=>{let r=NO.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Y6=e=>new Promise(t=>{setTimeout(t,e)}),Qb=async(e={})=>{let t=k(),r=Et(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await X6(r))return kW(r),r;i<o&&await Y6(n)}let s=await OO();nm(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{IS({launchAgentPrefix:fe(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var Z6,e_,jO=l(()=>{"use strict";Z6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),e_=e=>({force:Z6(e)&&e.force===!0})});var jl=l(()=>{"use strict";yl();WO();DO();jO();OS();_p();Ko()});var t_,z,r_,o_,zl,zO=l(()=>{"use strict";t_=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},z=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},r_=e=>{e.writeHead(403),e.end()},o_=e=>e.url?.split("?")[0]??"/",zl=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var Wt=l(()=>{"use strict";zO()});var Q6,$O,HO=l(()=>{"use strict";wb();Wt();Q6=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},$O=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return z(e.response,200,xl(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await Q6(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=El(t);return z(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Rl(t);return z(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var e7,UO,FO,BO,n_,GO,s_=l(()=>{"use strict";e7=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],UO=e=>/embed|minilm|^bge-/i.test(e),FO=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),BO=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),n_=e=>e.filter(t=>t.trim().length>0&&!UO(t)),GO=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!UO(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>FO(s,o));if(n!==void 0)return n}for(let n of e7){let s=r.find(i=>FO(i,n));if(s!==void 0)return s}return r[0]??null}});var i_,KO,JO,mg,XO,VO,qO,t7,r7,o7,n7,s7,i7,It,$l=l(()=>{"use strict";i_=require("node:child_process"),KO=g(require("node:fs")),JO=g(require("node:os")),mg=g(require("node:path"));Xt();Lt();s_();XO=3e3,VO=["claude-cli","codex","cursor","antigravity"],qO={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},t7=(e,t)=>new Promise(r=>{let o=(0,i_.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},XO);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),r7=()=>{let e=JO.default.homedir();return["ollama",mg.default.join(e,".local","bin","ollama"),mg.default.join(e,".agent-witch","ollama","ollama"),mg.default.join(e,".local-agent-witch","ollama","ollama")]},o7=e=>new Promise(t=>{let r=(0,i_.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},XO);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(BO(Buffer.concat(o).toString("utf8")))})}),n7=async()=>{for(let e of r7()){if(e!=="ollama"&&!KO.default.existsSync(e))continue;let t=await o7(e);if(t!==null)return t}return[]},s7=e=>{let t=e.installedWriterIds.map(s=>qO[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=he(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${qO[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},i7=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:Ps},It=async e=>{let t=VO.map(i=>{let a=Up(i,e.commands);return t7(a.command,a.args)}),[r,...o]=await Promise.all([n7(),...t]),n=VO.flatMap((i,a)=>o[a]===!0?[i]:[]),s=GO(r,i7());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:s7({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var a7,l7,a_,YO=l(()=>{"use strict";a7="http://127.0.0.1:11434",l7=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},a_=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||a7;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?l7(await o.json()):null}catch{return null}}});var l_=l(()=>{"use strict";Lt();$l();YO();s_()});var c7,ZO,QO=l(()=>{"use strict";l_();c7={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},ZO=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:c7[t]})),ollamaModels:n_(e.ollamaModels)})});var d7,eM,tM=l(()=>{"use strict";l_();Wt();QO();d7=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},eM=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await It({commands:ye({})});return z(e.response,200,{ok:!0,...ZO({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await d7(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await a_({model:r,prompt:o});return n===null?(z(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(z(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var u7,rM,oM=l(()=>{"use strict";FA();Wt();u7=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},rM=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await u7(e);if(t===null)return!0;let r=Pl(t);return z(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var nM=l(()=>{"use strict";xt()});var c_,sM=l(()=>{"use strict";nM();Sl();c_=e=>{if(!_r(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:qe({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var iM,d_,u_=l(()=>{"use strict";le();xt();Sl();iM=e=>{if(!_r(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},d_=async e=>{let t=iM(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=fo("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=$();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Y({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(qe({projectFolderPath:r}),await Tl(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var aM=l(()=>{"use strict";sM();u_()});var lM,cM=l(()=>{"use strict";aM();u_();Wt();lM=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=c_(t);return z(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await d_(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return z(e.response,o,r,e.cors.headers),!0}return!1}});var dM,uM=l(()=>{"use strict";jl();ug();lg();dM=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Us(50),r=Bs(50);return e.response.writeHead(200,Zb()),e.response.end(Yb({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var pM,mM=l(()=>{"use strict";eA();Wt();pM=e=>e.request.method==="GET"&&e.pathname==="/health"?(z(e.response,200,nl(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(z(e.response,200,sl(),e.cors.headers),!0):!1});var gM,fM=l(()=>{"use strict";Xb();Wt();gM=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await pg();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}});var hM,yM=l(()=>{"use strict";Fb();Wt();hM=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Nl();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Dl();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Ml();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var SM,PM=l(()=>{"use strict";jl();ug();Wt();SM=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=cg();return z(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=zl(e.request,"/update/logs",20,200);return z(e.response,200,{ok:!0,logs:Bs(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=e_(t),o=await dg({force:r});return z(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var AM,bM=l(()=>{"use strict";lg();Wt();AM=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await ag();return z(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=zl(e.request,"/watchdog/logs",20,200);return z(e.response,200,{ok:!0,logs:Us(t)},e.cors.headers),!0}return!1}});var _M,wM=l(()=>{"use strict";HO();tM();oM();cM();uM();mM();fM();yM();PM();bM();_M=[pM,dM,AM,hM,SM,gM,rM,lM,$O,eM]});var vM,TM=l(()=>{"use strict";wM();vM=async e=>{for(let t of _M)if(await t(e))return!0;return!1}});var p7,CM,kM=l(()=>{"use strict";yl();Wt();TM();p7=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:o_(e),readJsonBody:()=>t_(e)}),CM=async(e,t,r)=>{let o=e.headers.origin,n=Mm(o);try{if(o!==void 0&&o.length>0&&!n.allowed){r_(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=p7(e,t,r,n);if(await vM(s))return;z(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{z(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var LM,Sn,gg,fg=l(()=>{"use strict";LM=g(require("node:http"));jl();kM();Sn=async()=>{let e=await Qb(),t=LM.default.createServer((r,o)=>{CM(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},gg=Sn});var EM={};ft(EM,{runAgentWitchBridgeCli:()=>m7});var m7,RM=l(()=>{"use strict";re();fg();m7=async()=>{nt("agent-witch-bridge");let e=await Sn(),t=yr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var xM=l(()=>{"use strict";ht()});var Gs,p_,WM=l(()=>{"use strict";Gs=(e,t,r)=>e===1?t:r,p_=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Gs(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Gs(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Gs(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Gs(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Gs(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${Gs(u,"year","years")} ago`}});var Pn,m_,g7,f7,g_,ho,Hl,f_,IM=l(()=>{"use strict";Pn=g(require("node:fs")),m_=g(require("node:path")),g7="local-ws-traffic.ndjson",f7=500,g_=e=>m_.default.join(e.logsDir,g7),ho=(e,t)=>{let r=g_(e);Pn.default.mkdirSync(m_.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});Pn.default.appendFileSync(r,`${o}
`,"utf8")},Hl=(e,t=f7)=>{let r=g_(e);if(!Pn.default.existsSync(r))return[];let n=Pn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},f_=e=>{let t=g_(e);Pn.default.existsSync(t)&&Pn.default.writeFileSync(t,"","utf8")}});var h7,OM,MM,NM=l(()=>{"use strict";qb();h7=new Set(Object.values(Gm)),OM=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),MM=e=>{if(!OM(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!h7.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!OM(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var DM,jM=l(()=>{"use strict";DM=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var y7,S7,P7,Fl,zM=l(()=>{"use strict";jM();y7=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,S7=e=>y7.test(e),P7=e=>DM(e),Fl=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Fl(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&S7(o)){r[o]=P7(n);continue}r[o]=Fl(n)}return r}});var rr,h_,A7,b7,_7,y_,$M,HM,FM,w7,hg,An,yg,S_,UM=l(()=>{"use strict";rr=g(require("node:fs")),h_=g(require("node:path"));NM();zM();A7="local-ws-trace.ndjson",b7=1e4,_7=1440*60*1e3,y_=e=>h_.default.join(e.logsDir,A7),$M=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},HM=e=>{if(!rr.default.existsSync(e))return;let t=rr.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-_7,n=t.filter(s=>{let i=$M(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-b7);rr.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},FM=(e,t)=>{let r=y_(e);rr.default.mkdirSync(h_.default.dirname(r),{recursive:!0}),rr.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),HM(r)},w7=e=>e.parsed===null?{_empty:!0}:Fl(e.parsed),hg=(e,t,r)=>{let o=MM(r);FM(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:w7(o)})},An=(e,t)=>{FM(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Fl({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},yg=(e,t=80)=>{let r=y_(e);if(HM(r),!rr.default.existsSync(r))return[];let o=rr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=$M(s);i!==null&&n.push(i)}return n.reverse()},S_=e=>{let t=y_(e);rr.default.existsSync(t)&&rr.default.writeFileSync(t,"","utf8")}});var yo,BM,v7,P_,Sg,GM=l(()=>{"use strict";yo=g(require("node:fs")),BM=g(require("node:path")),v7=256e3,P_=e=>{yo.default.mkdirSync(BM.default.dirname(e),{recursive:!0}),yo.default.writeFileSync(e,"","utf8")},Sg=(e,t=v7)=>{if(!yo.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=yo.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=yo.default.openSync(e,"r");try{yo.default.readSync(a,i,0,s,n)}finally{yo.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var Ul=l(()=>{"use strict";IM();UM();GM()});var A_,b_,VM=l(()=>{"use strict";A_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),b_=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${A_(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${A_(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${A_(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var qM=l(()=>{"use strict";VM()});var __,w_=l(()=>{"use strict";__=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var v_=l(()=>{"use strict";za()});var T_,C_,KM=l(()=>{"use strict";v_();T_=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},C_=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var JM=l(()=>{"use strict";w_();KM()});var XM,Bl,k_,Gl=l(()=>{"use strict";w_();XM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bl=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=XM(e),r=XM(__(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},k_=`(function () {
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
})();`});var bn,T7,L_,YM=l(()=>{"use strict";bn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),T7=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},L_=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${bn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?bn(r.direction):bn(r.kind),i=`trace-body-${o}`,a=bn(T7(r.body));return`<tr>
        <td title="${bn(r.at)}">${bn(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${bn(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var QM,C7,ZM,E_,eN=l(()=>{"use strict";Le();ht();QM=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},C7=e=>QM(e)===gr?ns:os,ZM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),E_=e=>{let t=C7(e.installDir),o=`AW_HOME="$HOME/${QM(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${ZM(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${ZM(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var tN=l(()=>{"use strict";Gl();YM();eN();Gl()});var k7,Cr,Vl=l(()=>{"use strict";k7=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Cr=k7});var rN,oN,nN,sN,iN,aN,lN,Vs=l(()=>{"use strict";rN="projects",oN="knowledge",nN="chunks.ndjson",sN="lessons.ndjson",iN="error-chunks.ndjson",aN="usage-stats.json",lN="knowledge-location.json"});var Pg,L7,Ag,R_=l(()=>{"use strict";Pg=g(require("node:path"));Vs();L7=(e,t)=>{let r=t.trim(),o=Pg.default.join(e.installDir,rN,r,oN);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:Pg.default.join(o,nN),memoryRunsFilePath:Pg.default.join(o,sN)}},Ag=L7});var x_,E7,cN,dN=l(()=>{"use strict";x_=g(require("node:fs"));Vs();dn();E7=e=>{let t=yt(e.projectFolderPath),r=`${t.metaDirPath}/${lN}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};x_.default.mkdirSync(t.metaDirPath,{recursive:!0}),x_.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},cN=E7});var qs,pN,uN,R7,mN,gN=l(()=>{"use strict";qs=g(require("node:fs")),pN=g(require("node:path"));Vo();dn();R_();dN();uN=(e,t)=>{qs.default.existsSync(e)&&(qs.default.existsSync(t)&&qs.default.statSync(t).size>0||(qs.default.mkdirSync(pN.default.dirname(t),{recursive:!0}),qs.default.copyFileSync(e,t)))},R7=e=>{let t=yt(e.projectFolderPath),r=Ag(e.layout,e.projectId),o=`${t.memoryDirPath}/${ps}`;uN(t.ragChunksFilePath,r.ragChunksFilePath),uN(o,r.memoryRunsFilePath),cN({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},mN=R7});var fN,x7,Ks,bg=l(()=>{"use strict";fN=g(require("node:path"));Vo();dn();gN();rb();R_();x7=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=Fm(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){mN({layout:e.layout,projectFolderPath:t,projectId:o});let s=Ag(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=yt(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:fN.default.join(n.memoryDirPath,ps),projectId:null}},Ks=x7});var _g,I7,wg,W_=l(()=>{"use strict";_g=g(require("node:fs"));Vs();I7=(e,t=500)=>{if(!_g.default.existsSync(e))return;let r=_g.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);_g.default.writeFileSync(e,`${o.join(`
`)}
`)},wg=I7});var vg,O7,_n,I_=l(()=>{"use strict";vg=g(require("node:path"));Vs();bg();O7=e=>{let t=Ks(e);if(t===null)return null;let r=vg.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:vg.default.join(r,aN),errorChunksFilePath:vg.default.join(r,iN)}},_n=O7});var yN,ql,SN,hN,O_,PN,D7,M_,AN,N_,D_,j_,z_=l(()=>{"use strict";yN=require("node:crypto"),ql=g(require("node:fs")),SN=g(require("node:path"));Vl();Vs();I_();hN=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),O_=e=>{if(!ql.default.existsSync(e))return hN();try{let t=JSON.parse(ql.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return hN()},PN=(e,t)=>{ql.default.mkdirSync(SN.default.dirname(e),{recursive:!0}),ql.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},D7=e=>{let t=Cr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,yN.createHash)("sha256").update(o).digest("hex").slice(0,16)},M_=e=>{let t=_n(e);return t===null?null:O_(t.usageStatsFilePath)},AN=e=>{if(e.chunkIds.length===0)return;let t=_n(e);if(t===null)return;let r=O_(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;PN(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},N_=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=_n(e);if(r===null)return null;let o=D7(t),n=O_(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return PN(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},D_=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,j_=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var Kl,bN,j7,z7,_N,$7,$_,Jl,Js,H_,Xs,F_,U_=l(()=>{"use strict";Kl=g(require("node:fs")),bN=g(require("node:path"));Vl();bg();W_();z_();j7="http://127.0.0.1:11434",z7="nomic-embed-text",_N=(e,t,r)=>Ks({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,$7=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},$_=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},Jl=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||j7,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||z7;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},Js=(e,t,r)=>{let o=_N(e,t,r);if(o===null||!Kl.default.existsSync(o))return[];let n=Kl.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},H_=async e=>{let t=Cr(e.text),r=$_(t);if(r.length===0)return 0;let o=_N(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;Kl.default.mkdirSync(bN.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await Jl(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Kl.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return wg(o),n},Xs=async e=>{let t=await Jl(e.query);if(t===null)return[];let r=e.minScore??0,s=Js(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:$7(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return AN({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},F_=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Xl,wN,H7,F7,B_,G_,V_,vN=l(()=>{"use strict";Xl=g(require("node:fs")),wN=g(require("node:path"));Vl();I_();W_();U_();H7=e=>{if(!Xl.default.existsSync(e))return[];let t=Xl.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},F7=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},B_=async e=>{let t=_n(e);if(t===null)return 0;let r=Cr(e.text),o=$_(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;Xl.default.mkdirSync(wN.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await Jl(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};Xl.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return wg(n,200),s},G_=async e=>{let t=_n(e);if(t===null)return[];let r=await Jl(e.query);if(r===null)return[];let o=e.minScore??.3;return H7(t.errorChunksFilePath).map(s=>({chunk:s,score:F7(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},V_=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var q_=l(()=>{"use strict";U_();z_();vN()});var be,K_,J_=l(()=>{"use strict";db();be=cb,K_=`
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
`.trim()});var U7,B7,X_,TN,Y_,CN=l(()=>{"use strict";J_();Gl();U7=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,B7=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],X_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),TN=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${U7}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,Y_=e=>{let t=B7.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=X_(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=X_(e.installBundleVersionLabel?.trim()??"unknown"),s=TN("brand brand-in-sidebar",n),i=TN("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${X_(e.title)} \xB7 Agent Witch Local</title>
  <style>${K_}</style>
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
  <script>${k_}</script>
</body>
</html>`}});var Tg,Yl,Cg=l(()=>{"use strict";Tg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Yl=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Tg(e.syncMessage)}</p>`:"",o=Tg(e.manageHref),n=Tg(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Tg(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var Z_,Q_,ew,kN=l(()=>{"use strict";Z_=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,Q_=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,ew=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var LN=l(()=>{"use strict";CN();Cg();kN()});var Ys,tw,EN=l(()=>{"use strict";Gl();Ys=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tw=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Ys(e.wakeError)}</div>`:"",a=Bl(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Ys(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Ys(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Ys(o)}</p>
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
        <p class="home-card-meta">${Ys(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Ys(n)}</p>
      </a>
    </div>`}});var RN=l(()=>{"use strict";EN()});var E,Zs=l(()=>{"use strict";E=e=>e==="passed"||e==="stopped"||e==="failed"});var xN,rw,wn,ow,kg=l(()=>{"use strict";xN="Stopped at the round limit. The best prompt is kept.",rw="Stopped because the score stopped rising. The best prompt is kept.",wn="Finished. The best prompt is the result.",ow="Wizard ended. Progress from finished steps is kept."});var So,nw=l(()=>{"use strict";So=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var G7,V7,Zl,WN,Lg=l(()=>{"use strict";G7=/\n+|;\s+/,V7=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,Zl=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(G7).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,V7(s)]},[]);return[...t,...o]},[]),WN=e=>{let t=Zl(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ce,Qs=l(()=>{"use strict";ce=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Ql,sw=l(()=>{"use strict";Lg();Qs();Ql=e=>{let t=[...e.priorRounds,e.current],r=ce(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:WN(o)}}});var iw,q7,K7,Eg,aw=l(()=>{"use strict";iw={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},q7=e=>{try{let t=JSON.parse(e.fragment);return{...iw,objects:[...e.objects,t]}}catch{return{...iw,objects:e.objects}}},K7=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:q7(r)},Eg=e=>[...e].reduce(K7,iw).objects});var J7,lw,X7,IN,cw=l(()=>{"use strict";aw();J7=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},lw=e=>{let t=Eg(e).filter(J7),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},X7=(e,t)=>({...e,passed:e.score>=t}),IN=(e,t)=>{let r=lw(e);return r===null?null:X7(r,t)}});var dw,uw,Rg=l(()=>{"use strict";dw="The judge reply needs a score and a reason.",uw="The improver reply was empty."});var ON,MN=l(()=>{"use strict";ON=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var NN,DN=l(()=>{"use strict";NN=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var Z7,jN,zN=l(()=>{"use strict";MN();DN();kg();Lg();Z7=e=>{let t=Zl(e);return t.length===0?rw:`${rw} Avoid: ${t.join("; ")}.`},jN=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:xN};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(ON(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:Z7(NN(r))}}return null}});var Po,Q7,vn,$N,xg=l(()=>{"use strict";Po=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},Q7=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,vn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",Q7(e.tokens),`Delay: ${Po(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},$N=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var e9,HN,FN=l(()=>{"use strict";cw();e9=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,HN=e=>{let r=(e9.exec(e)?.[1]??e).trim();return r.length===0||lw(r)!==null?null:r}});var UN,Wg,BN=l(()=>{"use strict";xg();FN();Rg();UN=e=>({type:"call",role:"judge",choice:e.choice,prompt:$N({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),Wg=e=>{let t=HN(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:uw}}:{nextPrompt:t,continuation:UN({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var pw,GN=l(()=>{"use strict";nw();sw();cw();Rg();kg();zN();Rg();BN();pw=e=>{let t=IN(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:dw}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=jN({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=Ql({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:So({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var ec,mw=l(()=>{"use strict";ec=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var VN=l(()=>{"use strict"});var qN=l(()=>{"use strict";VN()});var Tn,KN=l(()=>{"use strict";Tn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var t9,gw,JN=l(()=>{"use strict";xg();t9=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,gw=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",t9(e.tokens),`Delay: ${Po(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var r9,o9,n9,fw,XN=l(()=>{"use strict";r9=/[A-Za-z0-9_./~-]{3,180}/g,o9=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,n9=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||o9.test(t)},fw=(e,t=12)=>{let r=[];for(let o of e.matchAll(r9)){let n=o[0].replace(/\.+$/,"");if(!(!n9(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var tc,YN=l(()=>{"use strict";tc=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var Ig,hw,ZN,rc,yw=l(()=>{"use strict";Ig=e=>Math.floor(e/2),hw=e=>Math.max(Ig(e)+1,e-20),ZN=(e,t)=>e>=t?"passes":e>=hw(t)?"close":e>=Ig(t)?"weak":"bad",rc=e=>[{band:"bad",label:`0\u2013${Ig(e)-1} bad`},{band:"weak",label:`${Ig(e)}\u2013${hw(e)-1} weak`},{band:"close",label:`${hw(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var Og,Sw=l(()=>{"use strict";yw();Og=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${ZN(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var Ot,Pw=l(()=>{"use strict";Ot=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var QN,eD=l(()=>{"use strict";QN=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var s9,i9,tD,rD=l(()=>{"use strict";Zs();Sw();Pw();eD();s9=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],i9=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",tD=e=>{let t=e.wizard;if(t===void 0)return[];let r=Ot(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=s9.map((h,y)=>{let p=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:h,state:p,detail:null}}).filter((h,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=Og(e),d=c.filter(h=>h.id==="round-0"),u=QN(t)&&(!n||a)?c.filter(h=>h.id!=="round-0"):[],m=E(e.status)&&!s,S=m?[{id:"end",label:i9(e),state:"done",detail:e.errorMessage}]:[];if(m&&S.length>0){let h=Math.min(r,i.length),y=i.slice(0,h).map(p=>({...p,state:"done"}));return[...d,...y,...S,...u]}return[...d,...i,...u,...S]}});var a9,Aw,oD=l(()=>{"use strict";Zs();Sw();rD();a9=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",Aw=e=>{if(e.wizard!==void 0)return tD(e);let t=Og(e),r=E(e.status)?[{id:"end",label:a9(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var oc,nD=l(()=>{"use strict";oc=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var sD=l(()=>{"use strict";ht()});var iD,nc,sc,ti,Mg,bw,aD=l(()=>{"use strict";sD();iD="/prompt-optimizer/agent",nc=`${Sr}${iD}`,sc=`${Sr}/prompt-optimizer`,ti="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",Mg=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${ti}`,bw="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var or=l(()=>{"use strict"});var ie,ic=l(()=>{"use strict";or();ie=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var _w,lD=l(()=>{"use strict";_w="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var cD,dD=l(()=>{"use strict";cD=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var ac,pD=l(()=>{"use strict";dD();or();ac=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:cD(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var ww,mD=l(()=>{"use strict";or();ww=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var vw,gD=l(()=>{"use strict";or();vw=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var fD,lc,hD=l(()=>{"use strict";fD=["generalize","evaluate","separate","optimize_modules"],lc=(e,t)=>{let r=fD.indexOf(t);if(r===-1)return e;let o=fD.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var Ng,Tw=l(()=>{"use strict";Lg();Ng=e=>{let t=Zl(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var cc,yD=l(()=>{"use strict";Tw();cc=e=>{let t=Ng(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var c9,d9,u9,SD,PD=l(()=>{"use strict";c9=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),d9=/^\{\{[a-zA-Z0-9_-]+\}\}$/,u9=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(c9(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},SD=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>d9.test(n)?n:u9(n,r)).join("")}});var Cw,AD=l(()=>{"use strict";PD();Cw=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:SD(o.prompt,t)}))}))});var p9,dc,bD=l(()=>{"use strict";or();Tw();p9=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),dc=e=>{let t=Ng(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=p9(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var uc,_D=l(()=>{"use strict";mw();uc=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return ec({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var pc,Lw=l(()=>{"use strict";Qs();pc=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ce(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var Ew,wD=l(()=>{"use strict";Lw();Ew=e=>{let t=pc({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Cn,vD=l(()=>{"use strict";Cn=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var m9,g9,oe,Dg=l(()=>{"use strict";ic();m9=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},g9=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,oe=e=>{let t=ie(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:m9(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>g9(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var TD,CD=l(()=>{"use strict";ic();Dg();TD=e=>{let t=oe(e.wizard),r=ie(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var Rw,kD=l(()=>{"use strict";CD();Rw=e=>{let t=TD({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var f9,LD,ED=l(()=>{"use strict";f9=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},LD=e=>[...e].reduce(f9,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var h9,RD,xD=l(()=>{"use strict";h9=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},RD=e=>[...e].reduce(h9,{out:"",inString:!1,escaped:!1}).out});var y9,S9,WD,ID=l(()=>{"use strict";ED();xD();y9=e=>e.charCodeAt(0)===65279?e.slice(1):e,S9=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},WD=e=>RD(LD(S9(y9(e))))});var P9,A9,b9,OD,_9,ri,jg=l(()=>{"use strict";aw();ID();P9=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},A9=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},b9=e=>[...e].reduce(A9,{out:"",inString:!1,escaped:!1}).out,OD=e=>{let t=Eg(e);return t.length===0?null:t[t.length-1]},_9=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},ri=e=>{let t=WD(P9(e)),r=OD(t);if(r!==null)return r;let o=b9(t),n=OD(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw _9(i)}}});var w9,v9,xw,MD,ND=l(()=>{"use strict";w9=/^[a-z0-9][a-z0-9-]{0,62}$/,v9=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return w9.test(t)?t:""},xw=e=>e.replace(/\s+/gu," ").trim(),MD=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=v9(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=xw(n.name),a=xw(n.description),c=xw(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var DD,jD,zD=l(()=>{"use strict";DD=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},jD=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var Ww,$D=l(()=>{"use strict";jg();ND();zD();Ww=(e,t)=>{let r=(()=>{try{return ri(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(DD(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(jD).filter(a=>a!==null),i=MD({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var Iw,HD=l(()=>{"use strict";Iw=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var Ow,FD=l(()=>{"use strict";Ow=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var Mw,UD=l(()=>{"use strict";ic();Dg();Mw=e=>{let t=oe(e.wizard),r=ie(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var mc,BD=l(()=>{"use strict";mc=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var Mt,T9,Nw,GD=l(()=>{"use strict";Mt=g(ls());jg();T9=(0,Mt.isType)({name:Mt.isNonEmptyString,description:Mt.isString,sampleValue:Mt.isString}),Nw=e=>{let t=ri(e);if(!(0,Mt.isType)({templatedPrompt:Mt.isNonEmptyString,variables:(0,Mt.isArrayWithEachItem)(T9)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var de,C9,k9,Dw,VD=l(()=>{"use strict";de=g(ls());or();jg();C9=(0,de.isType)({id:de.isNonEmptyString,title:de.isNonEmptyString,prompt:de.isNonEmptyString,order:de.isNumber}),k9=(0,de.isType)({id:de.isNonEmptyString,title:de.isNonEmptyString,summary:de.isString,topology:(0,de.isOneOf)("chain","parallel"),modules:(0,de.isArrayWithEachItem)(C9),recommended:de.isBoolean}),Dw=e=>{let t=ri(e);if(!(0,de.isType)({options:(0,de.isArrayWithEachItem)(k9)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var oi,qD=l(()=>{"use strict";oi=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var L9,jw,zw=l(()=>{"use strict";L9=/\{\{([a-zA-Z0-9_-]+)\}\}/g,jw=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(L9,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Nt,Dt,KD=l(()=>{"use strict";Qs();zw();Nt=e=>jw(e.templatedPrompt,e.variables),Dt=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ce(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Nt(e.wizard)}});var E9,kn,JD=l(()=>{"use strict";E9=/\{\{([a-zA-Z0-9_-]+)\}\}/g,kn=(e,t)=>e.replace(E9,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var R9,Ln,zg=l(()=>{"use strict";R9=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Ln=e=>{let t=new Set,r=[];for(let o of e.matchAll(R9)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var gc,XD=l(()=>{"use strict";zg();gc=e=>e.variables.length>0||Ln(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var $w,Hw=l(()=>{"use strict";or();$w=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var fc,YD=l(()=>{"use strict";Qs();Hw();fc=e=>{let t=e.wizard.evaluateSelectedRound??ce(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:$w(r.judgement,e.passScore)}});var hc,ZD=l(()=>{"use strict";hc=e=>e.length===1&&e[0].modules.length===1});var Fw,QD=l(()=>{"use strict";Fw=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var _e,$g,yc=l(()=>{"use strict";_e=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),$g=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var ej,tj=l(()=>{"use strict";yc();ej=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[_e("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),_e("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[_e("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var rj,oj=l(()=>{"use strict";Zs();yc();rj=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!E(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[_e("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),_e("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),_e("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",$g(e.writerLabel,e.folder)),_e("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[_e("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var nj,sj=l(()=>{"use strict";yc();nj=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[_e("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),_e("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[_e("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var ij,aj=l(()=>{"use strict";yc();ij=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[_e("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),_e("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",$g(e.writerLabel,e.folder)),...r?[_e("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var Hg,lj=l(()=>{"use strict";Zs();tj();oj();sj();aj();Hg=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(E(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return rj(r);case"evaluate":return ej({...r,currentRound:e.currentRound});case"separate":return ij(r);case"optimize_modules":return nj({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Sc,kr,cj=l(()=>{"use strict";Sc=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),kr=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var x9,Fg,Uw,dj=l(()=>{"use strict";zg();x9="wizardParam_",Fg=e=>`${x9}${e}`,Uw=e=>{let t=Ln(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=Fg(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var ct,uj=l(()=>{"use strict";ct=["generalize","evaluate","separate","optimize_modules"]});var Pc,En,ni,Lr=l(()=>{"use strict";Pc="Stopped because the confirmed token or spend budget was exceeded.",En="Approaching the confirmed budget. Further trials may hard-stop.",ni="Confirm the Step 4 token and spend budget before optimizing modules."});var dt,si=l(()=>{"use strict";dt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var zt,Ac=l(()=>{"use strict";Lr();zt=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var W9,Er,bc=l(()=>{"use strict";Lr();W9={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},Er=e=>{let t=e?.trim()??"";return t.length===0?.01:W9[t]??.01}});var Ug,Bw=l(()=>{"use strict";Lr();bc();Ug=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=Er(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var pj,Gg,Gw,Vw=l(()=>{"use strict";Lr();si();Ac();Bw();bc();pj=e=>{let t=Ug({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??Er(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:dt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},Gg=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),Gw=e=>{let t=e.existing??zt(),r=pj({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return Gg(t,r)}});var ii,_c,fj=l(()=>{"use strict";Lr();or();si();Ac();Vw();Bw();bc();ii=e=>{let t=Ug({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??Er(e.writerId),i=r*4e3,a=n*o*8e3,c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:dt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},_c=e=>{let t=e.existing??zt();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=ii({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return Gg(t,r)}});var Rr,hj=l(()=>{"use strict";si();Lr();Ac();Rr=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??zt(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=dt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var Kw,ai,yj=l(()=>{"use strict";Lr();si();Kw=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=dt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:Pc,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:Pc,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:En,costControls:{...t,softWarnFired:!0,softWarnMessage:En}}:null},ai=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var Jw,Sj=l(()=>{"use strict";Jw=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var R=l(()=>{"use strict";Zs();kg();GN();nw();xg();mw();qN();KN();JN();XN();sw();YN();Qs();oD();Pw();yw();nD();aD();or();ic();lD();pD();mD();gD();hD();yD();AD();bD();_D();Lw();wD();vD();Dg();kD();$D();HD();FD();UD();BD();GD();VD();qD();KD();zw();JD();zg();XD();YD();ZD();Hw();QD();lj();cj();dj();uj();Lr();si();Ac();Vw();fj();bc();hj();yj();Sj()});var Xw=l(()=>{"use strict";Ba()});var I9,bj,_j=l(()=>{"use strict";Xw();I9=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,bj=e=>{let t=nn(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(I9)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var vj,O9,M9,nr,N9,D9,wj,qg,Tj,j9,St,Cj,kj,Lj,$t=l(()=>{"use strict";Xw();_j();vj=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),O9=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,M9=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,nr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(O9.test(e.errorMessage))return"usage_limit";if(M9.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},N9="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",D9="The writer waited on terminal input and did not return a prompt.",wj=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,qg=e=>{let t=e.trim();if(t.length===0||t.length>=500||!wj.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>wj.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},Tj=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},j9=e=>qg(e.stdout)??qg(e.stderr)??(Tj(e.replyFile)?qg(e.replyFile):null),St=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return N9;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?D9:null},Cj=e=>{let t=e.trim();return t.length===0?null:St(t)!==null?t:qg(t)??(Tj(t)?t:null)},kj=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],Lj=e=>{let t=e.replyFileText?.trim()??"",r=St([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=j9({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=nr({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=bj([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=nn(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var z9,Rj,Ej,xn,Kg=l(()=>{"use strict";$t();z9=400,Rj=(e,t=z9)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},Ej=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:Cj(e.promptText)},xn=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:Ej(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=Ej(e.revisions[n]);if(s!==null)return s.trim()}return null}});var W,$9,Jg,ae,Wn,Wj,xj,Ij,Oj,we=l(()=>{"use strict";W="manual",$9=["claude-cli","codex","cursor","antigravity"],Jg={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ae=e=>e===W?"You":e in Jg?Jg[e]:e,Wn=e=>$9.filter(t=>e.includes(t)),Wj=e=>{let t=Wn(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},xj=(e,t)=>t===W?W:e.find(r=>r===t)??null,Ij=(e,t,r)=>{let o=Wn(e),n=xj(o,t),s=xj(o,r);return n===null||s===null?null:{judge:n,improver:s}},Oj=(e,t,r)=>{let o=Wn(e);return t===null||t.trim()===""?r!==W?r:o[0]??null:t===W?null:o.find(n=>n===t)??null}});var Mj,Xg,Yw,In,Zw,ut,xr,ue,Je=l(()=>{"use strict";Mj=g(require("node:fs")),Xg=g(require("node:os")),Yw=g(require("node:path"));lo();In="~",Zw=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,ut=e=>{let t=Xg.default.homedir(),r=Zw(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},xr=e=>{let t=e.trim().length===0?"~":e.trim(),r=He(t),o=Yw.default.isAbsolute(r)?Zw(r):Zw(Yw.default.resolve(Xg.default.homedir(),r));try{if(!Mj.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:ut(o)}},ue=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Xg.default.homedir()});var Ze,Ao=l(()=>{"use strict";Ze='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var Qw,Nj,H9,Dj,jj,ev=l(()=>{"use strict";R();we();Je();Ao();Qw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Nj=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',H9=e=>{let t=Nj(e.state),r=`<h2>${Qw(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${Qw(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Ze}</button></div><template>${r}</template></li>`},Dj=e=>{let t=e.wizard;if(t===void 0)return"";let r=Hg({status:e.status,wizard:t,writerLabel:ae(e.judgeModel),runnerLabel:ae(e.runnerModel??e.judgeModel),folderDisplay:ut(ue(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(H9).join("")}</ol>`},jj=e=>{let t=e.wizard;if(t===void 0)return"";let r=Hg({status:e.status,wizard:t,writerLabel:ae(e.judgeModel),runnerLabel:ae(e.runnerModel??e.judgeModel),folderDisplay:ut(ue(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${Nj(n.state)}<span class="sdlc-pipeline-label">${Qw(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var Ht,zj,$j,Hj,tv=l(()=>{"use strict";R();Ht=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zj="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",$j=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Ht(zj)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${Ht(i.name)}}}</strong> \u2014 ${Ht(i.description)} (sample: ${Ht(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Ht(r)}</pre>`,n=Nt(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Ht(n)}</pre>`;return`${t}${o}${s}`},Hj=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Ht(zj)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${Ht(n.name)}}}</strong> \u2014 ${Ht(n.description)} (sample: ${Ht(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${Ht(r)}</pre>`;return`${t}${o}`}});var wc,rv=l(()=>{"use strict";wc=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var Fj,Uj=l(()=>{"use strict";R();Fj=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=Tn({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=vn({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var ov,vc,nv=l(()=>{"use strict";Ao();Uj();ov=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vc=e=>{let t=Fj(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${ov(r)}">${Ze}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${ov(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${ov(t)}</pre></template>`}});var sv,Tc,iv=l(()=>{"use strict";Ao();sv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Tc=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${sv(r)}">${Ze}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${sv(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${sv(t)}</pre></template>`}});var Yg,li,av=l(()=>{"use strict";rv();nv();iv();Yg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),li=e=>{let t=wc(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${Yg(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,u=e.cycle.revisions.map(m=>{let S=m.judgement?.score,h=S==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${S}`,y=m.judgement?.reasons?.trim()??"",p=y.length===0?"":`<br><span class="muted">${Yg(y)}</span>`,P=Tc({roundLabel:d(m.roundNumber),promptText:m.promptText}),A=vc({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run}),f=`${P}${A}`;if(e.interactive){let b=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${b}> <span class="sdlc-wizard-revision-title">${Yg(h)}</span></label>${f}${p}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Yg(h)}</span>${f}${p}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var lv,Bj,Gj,Vj,cv=l(()=>{"use strict";lv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bj=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${lv(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${lv(t.prompt)}</pre></li>`).join("")}</ol>`,Gj=e=>Bj([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),Vj=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${lv(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${Bj(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Cc,F9,Zg,dv=l(()=>{"use strict";R();cv();Cc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),F9=e=>{let t=e.wizard;return t===void 0?"":Dt({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},Zg=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=F9(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Cc(n.orchestratorSkill.fileName)}</code> \u2014 ${Cc(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${Cc(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=Gj(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${Cc(r)} <span class="muted">${Cc(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Oe,U9,B9,G9,V9,Qg,q9,K9,J9,X9,Y9,Z9,ci,ef=l(()=>{"use strict";R();ev();tv();av();nv();iv();dv();Oe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),U9={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},B9=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Oe(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Oe(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Oe(o)}</pre></details>`;return`<h2>${Oe(e)}</h2>${n}`},G9=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=Nt(t).trim(),n=Dt({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!E(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${B9("What is being evaluated",i)}`},V9=(e,t)=>{let r=e.wizard;if(r===void 0||E(e.status))return"";let o=U9[t];return o===void 0||r.phase!==o?"":jj(e)},Qg=(e,t,r)=>{let o=V9(e,t),n=t==="wizard-2"?G9(e):"";return`${o}${n}${r}`},q9=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},K9=e=>{let t=e.wizard;return t===void 0?"":$j(t)},J9=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Oe(a)}</span>`,d=`Round ${n.roundNumber}`,u=Tc({roundLabel:d,promptText:n.promptText}),m=vc({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Oe(s)}${i}</span>${u}${m}${c}</li>`}).join("")}</ul>`,X9=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return li({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=q9(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${J9(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=Dt({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Oe(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",u=`Round ${c.roundNumber} \u2014 score ${d}`,m=Tc({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),S=vc({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Oe(u)}</span>${m}${S}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Oe(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},Y9=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Oe(n.title)}</strong> <span class="muted">(${Oe(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Oe(o.title)}</strong>${n}${Oe(s)}${Zg(e,o)}</li>`}).join("")}</ul>`},Z9=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Oe(i)}</span> <strong>${Oe(n.title)}</strong>${Oe(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Oe(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?li({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},ci=(e,t)=>{switch(t){case"wizard-1":return Qg(e,t,K9(e));case"wizard-2":return Qg(e,t,X9(e));case"wizard-3":return Qg(e,t,Y9(e));case"wizard-4":return Qg(e,t,Z9(e));default:return""}}});var Q9,eX,qj,Kj,Jj=l(()=>{"use strict";R();Kg();$t();ef();Q9=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},eX=e=>{let t=e.goal.trim();return t.length===0?null:t},qj=(e,t,r,o,n)=>{let s=St(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},Kj=(e,t)=>{let r=eX(e);if(t.id.startsWith("wizard-")){let s=ci(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=oc(e,t);if(s!==null){let a=xn(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ce(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:qj(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:Q9(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:qj(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var On,Xj,Yj=l(()=>{"use strict";On=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xj=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${On(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${On(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${On(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${On(n)}</h2><pre class="mono">${On(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${On(e.goal)}</dd></div></dl>`;return`<h2>${On(e.title)}</h2>${i}${t}${r}${o}${s}`}});var tX,Zj,kc,uv,tf=l(()=>{"use strict";R();tX=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),Zj=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||E(e.status))return null;let r=Ot(t);return r<0||r>3?null:`wizard-${r+1}`},kc=(e,t)=>tX.has(t)?Zj(e)===t:!1,uv="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var rX,rf,pv=l(()=>{"use strict";rX='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',rf=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${rX}</button>`});var Mn,of=l(()=>{"use strict";R();Mn=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Ql({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:tc(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var oX,Qj,nX,mv,ez,sX,iX,aX,lX,tz,rz=l(()=>{"use strict";R();of();oX={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},Qj=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},nX=e=>oX[e]??null,mv=(e,t)=>{let r=e.wizard,o=nX(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=Ot(r);return o<n||o===n},ez=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},sX=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:Nt(t).trim();return o.length===0?null:cc({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:Qj(e,"generalize")})},iX=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=Mn(e);return n===null?null:So({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=ez(e)?.promptText.trim()??Dt({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:Tn({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},aX=e=>{let t=e.wizard;if(t===void 0)return null;let r=Dt({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:dc({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:Qj(e,"separate")})},lX=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=kr(t),s=kn(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=Mn(e);return c===null?null:So({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=ez(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||E(e.status)&&i?.judgement!==null)?vn({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):uc({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:Cn(t,r).output,moduleTitle:o.title})},tz=(e,t)=>{if(!mv(e,t))return null;switch(t){case"wizard-1":return sX(e);case"wizard-2":return iX(e);case"wizard-3":return aX(e);case"wizard-4":return lX(e);default:return null}}});var cX,nf,gv=l(()=>{"use strict";R();cX=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},nf=(e,t)=>{let r=e.wizard,o=cX(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=Ot(r);return o<n?"done":o===n&&E(e.status)&&e.status==="failed"?"failed":o<=n&&E(e.status)?"done":"pending"}});var dX,di,sf=l(()=>{"use strict";Ao();rz();gv();dX=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),di=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(nf(e,t)==="pending")return""}else if(!mv(e,t))return"";let o=tz(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Ze}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${dX(o)}</pre></template>`}});var Nn,Wr,ui=l(()=>{"use strict";Nn=e=>e.toLocaleString("en-US"),Wr=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var sr,uX,oz,af,nz,sz,lf=l(()=>{"use strict";R();Jj();Yj();tf();pv();Ao();Kg();ev();sf();ui();sr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uX=(e,t)=>{let r=oc(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Wr(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${Nn(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${sr(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${sr(r)}</span>`:"",d=Xj(Kj(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&E(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${sr(e.id)}"`:"",m=kc(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${sr(uv)}"><input type="hidden" name="cycleId" value="${sr(t.id)}"><input type="hidden" name="wizardStepId" value="${sr(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",S=e.state==="active"&&e.id.startsWith("wizard-")?Dj(t):"",h=o?"failed":e.state,y=o?xn(t):null,p=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Ze}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${sr(y)}</pre></template>`:"",P=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?di(t,e.id):"";return`<li class="sdlc-node sdlc-node-${h}" data-sdlc-step-id="${sr(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${sr(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${P}${p}</div></div>${S}<template>${d}</template></li>`},oz=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>uX(r,t)).join("")}</ol>`,af=e=>`<div class="sdlc-score" aria-label="What the score means">${rc(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${sr(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,nz=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${rf({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,sz=`<script>
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
</script>`});var cf,df,uf,iz,fv=l(()=>{"use strict";cf="support-reply",df="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",uf=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),iz=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var pf,az,lz=l(()=>{"use strict";R();lf();fv();pf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),az=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${af(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${pf(df)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${pf(uf)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${pf(iz)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${pf(cf)}">Run this sample</a>
      </div>
    </section>`});var hv,mf,pX,cz,dz=l(()=>{"use strict";hv=g(require("node:fs")),mf=g(require("node:path")),pX=e=>mf.default.join(mf.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),cz=(e,t)=>{let r=pX(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;hv.default.mkdirSync(mf.default.dirname(r),{recursive:!0}),hv.default.appendFileSync(r,o,"utf8")}});var pi,uz,mX,pz,gX,mz,ir,Z,gz,j,pt=l(()=>{"use strict";pi=g(require("node:fs")),uz=g(require("node:path"));R();dz();mX=e=>e.wizard===void 0?e:{...e,wizard:ww(e.wizard)},pz=new Set,gX=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),mz=(e,t)=>{pi.default.mkdirSync(uz.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;pi.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),pi.default.renameSync(r,e)},ir=e=>{if(!pi.default.existsSync(e))return[];try{let t=JSON.parse(pi.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(gX).map(mX):[]}catch{return[]}},Z=(e,t)=>ir(e).find(r=>r.id===t)??null,gz=(e,t)=>{pz.add(t);let r=ir(e).filter(o=>o.id!==t);mz(e,r)},j=(e,t)=>{if(pz.has(t.id))return;let r=ir(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];mz(e,o),cz(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var mi,ar,Lc,fz,gf,fX,hz,yz,Sz,yv=l(()=>{"use strict";mi=g(require("node:fs")),ar=g(require("node:path")),Lc=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},fz=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),gf=(e,t)=>{let r=Lc(e);return r.length>0?r:Lc(t)},fX=e=>{let t=gf(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${fz(o)}`,...n.length>0?[`description: ${fz(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},hz=e=>`.cursor/skills/${e}/SKILL.md`,yz=(e,t)=>{let r=Lc(t);if(r.length===0)return!1;let o=ar.default.resolve(e),n=ar.default.resolve(o,".cursor","skills"),s=ar.default.resolve(o,hz(r));return s.startsWith(`${n}${ar.default.sep}`)?mi.default.existsSync(s):!1},Sz=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(gf(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=ar.default.resolve(e.workingDirectory);try{if(!mi.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=fX({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=hz(r.slug),n=ar.default.resolve(t,".cursor","skills"),s=ar.default.resolve(t,o);if(!s.startsWith(`${n}${ar.default.sep}`))return{ok:!1,errorCode:"path"};if(mi.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{mi.default.mkdirSync(ar.default.dirname(s),{recursive:!0}),mi.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var hX,Pz,Az,bz=l(()=>{"use strict";R();pt();Je();$t();yv();hX=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,Pz=e=>{let t=e.get("savedSkill");return t!==null&&hX.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},Az=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=Z(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!E(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ce(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||St(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=Sz({workingDirectory:ue(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var ff,hf,Ec=l(()=>{"use strict";R();ff=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=Rr({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},hf=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var bo,Rc=l(()=>{"use strict";R();Ec();bo=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=Fw(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=Gw({moduleCount:o.length,existing:e.costControls,writerId:n}),i=ff(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Sc(r.variables)},updatedAt:new Date().toISOString()}}});var _o,xc=l(()=>{"use strict";_o=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var Sv=l(()=>{"use strict";Lt();$l();Ba()});var Pv,_z,Av,wz,vz=l(()=>{"use strict";Pv={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},_z=e=>e.exitCode===null&&e.signalCode===null,Av=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!_z(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!_z(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),wz=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),Av(e).then(s=>{r({...Pv,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var Tz,Wc,Cz,bv,yX,wv,vv,SX,PX,AX,kz,bX,_v,Lz,Ic,Ez,_X,wX,Qe,Dn=l(()=>{"use strict";Tz=require("node:child_process"),Wc=g(require("node:fs")),Cz=g(require("node:os")),bv=g(require("node:path"));Sv();vz();$t();yX=["claude-cli","codex","cursor","antigravity"],wv=18e4,vv=6e5,SX=12e4,PX=9e5,AX="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",kz="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",bX="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",_v=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},Lz=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=_v(process.env[kz])??Math.max(r,vv));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:_v(process.env[bX])??PX;return Math.min(o,Math.max(SX,r))},Ic=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?_v(process.env[kz])??vv:wv,Ez=e=>`The writer timed out after ${e}ms.`,_X=e=>yX.includes(e),wX=e=>e===!0||process.env[AX]==="1",Qe=e=>new Promise(t=>{if(e.signal?.aborted){t(Pv);return}if(wX(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!_X(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=Yt(r,e.prompt,ye({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!Wc.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:wv,s=bv.default.join(Wc.default.mkdtempSync(bv.default.join(Cz.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=kj({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,Tz.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=S=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(S))};wz(u,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",Av(u).then(S=>{m({ok:!1,errorMessage:Ez(n),errorKind:"writer_timeout",killSignal:S})})},n),u.stdout.on("data",S=>{a.push(Buffer.from(S))}),u.stderr.on("data",S=>{c.push(Buffer.from(S))}),u.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",()=>{if(d.settled)return;let S=Wc.default.existsSync(s)?Wc.default.readFileSync(s,"utf8"):null,h=Lj({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:S});if(h.ok&&d.stopReason!=="abort"){m(h);return}d.stopReason===null&&m(h)})})});var vX,Oc,Tv=l(()=>{"use strict";R();ui();vX=e=>{if(e.wizard!==void 0){let t=mc(e.wizard),r=Wr(e);return(t??0)+r}return Wr(e)},Oc=e=>{let t=Kw({costControls:e.costControls,spentTokens:vX(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var Rz,TX,Mc,yf,Sf=l(()=>{"use strict";R();we();Tv();Rz=e=>e===W?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},TX=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Mc=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=pw({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:Rz(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?Jw({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:tc(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=TX(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?Oc({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):Oc({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},yf=(e,t,r=null)=>{let o=Wg({raw:t,judge:Rz(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Pf,Cv=l(()=>{"use strict";Pf=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var Iz,Af,bf,xz,Wz,kv,CX,Oz,Lv,kX,Mz,LX,EX,Nz,Dz=l(()=>{"use strict";Iz=require("node:child_process"),Af=g(require("node:fs")),bf=g(require("node:path"));Vm();R();xz=4e3,Wz=12e3,kv=(e,t)=>{let r=(0,Iz.spawnSync)("git",[...t],{cwd:e,env:go(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},CX=e=>kv(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",Oz=e=>{let t=kv(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},Lv=(e,t)=>{let r=bf.default.resolve(e,t),o=bf.default.relative(e,r);if(o.startsWith("..")||bf.default.isAbsolute(o)||!Af.default.existsSync(r)||!Af.default.statSync(r).isFile())return null;let n=Af.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>xz?`${n.slice(0,xz)}
\u2026truncated`:n},kX=e=>e.length>Wz?`${e.slice(0,Wz)}
\u2026truncated`:e,Mz=e=>{let t=fw(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,Lv(e.workingDirectory,n)])),o=CX(e.workingDirectory);return{git:o,status:o?Oz(e.workingDirectory):{},files:r,paths:t}},LX=(e,t)=>{let r=kv(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=Lv(e,t);return o===null?`${t} is missing.`:o},EX=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",Nz=e=>{let t=e.before.git?Oz(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=Lv(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>LX(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:EX(e.before.git,e.before.paths.length>0),evidence:kX(i.join(`

`))}}});var xv,G,Wv,Me,jz,RX,xX,zz,gi,$z,fi,WX,IX,Nc,Ev,Rv,OX,Hz,MX,NX,DX,Fz,jX,Uz,Bz,zX,$X,Gz,Vz=l(()=>{"use strict";xv=require("node:child_process"),G=g(require("node:fs")),Wv=g(require("node:os")),Me=g(require("node:path"));Vm();jz=8e6,RX=16e6,xX=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],zz=(e,t)=>{let r=(0,xv.spawnSync)("git",[...t],{cwd:e,env:go(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},gi=(e,t)=>(0,xv.spawnSync)("git",[...t],{cwd:e,env:go(),timeout:8e3}).status===0,$z=e=>{let t=zz(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},fi=(e,t)=>{let r=Me.default.resolve(e,t),o=Me.default.relative(e,r);return o.startsWith("..")||Me.default.isAbsolute(o)?null:r},WX=(e,t)=>{let r=fi(e,t);if(r===null||!G.default.existsSync(r))return null;let o=G.default.statSync(r);return!o.isFile()||o.size>jz?null:G.default.readFileSync(r)},IX=(e,t,r)=>{let o=fi(e,t);o!==null&&(G.default.mkdirSync(Me.default.dirname(o),{recursive:!0}),G.default.writeFileSync(o,r))},Nc=(e,t)=>{let r=fi(e,t);r===null||!G.default.existsSync(r)||G.default.rmSync(r,{recursive:!0,force:!0})},Ev=(e,t)=>gi(e,["cat-file","-e",`HEAD:${t}`]),Rv=e=>{let t=zz(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},OX=e=>Me.default.resolve(e)!==Me.default.resolve(Wv.default.homedir()),Hz=e=>{if(!G.default.existsSync(e))return 0;let t=G.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?G.default.readdirSync(e).reduce((r,o)=>r+Hz(Me.default.join(e,o)),0):0},MX=(e,t,r)=>{let o=fi(e,r);if(o===null||!G.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(Hz(o)>RX)return{relativePath:r,existed:!0,copyDir:null};let n=Me.default.join(t,"cache",r);return G.default.mkdirSync(Me.default.dirname(n),{recursive:!0}),G.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},NX=400,DX=32e6,Fz=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!G.default.existsSync(s)))for(let i of G.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=Me.default.join(s,i),c=G.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>jz)){if(t.length>=NX||r+c.size>DX){o=!1;return}r+=c.size,t.push(Me.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},jX=(e,t,r)=>{let o=fi(e,r);if(o===null||!G.default.existsSync(o))return null;let n=WX(e,r);if(n===null)return"skip";let s=Me.default.join(t,"files",r);return G.default.mkdirSync(Me.default.dirname(s),{recursive:!0}),G.default.writeFileSync(s,n),s},Uz=e=>{let t=G.default.mkdtempSync(Me.default.join(Wv.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?$z(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:Fz(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,jX(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?Rv(e.workingDirectory):null,isolateCaches:OX(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:xX.map(i=>MX(e.workingDirectory,t,i))}},Bz=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Nc(e.workingDirectory,t);return}IX(e.workingDirectory,t,G.default.readFileSync(r))}},zX=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?Bz(e,t):Ev(e.workingDirectory,t)?gi(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Nc(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&Ev(e.workingDirectory,t)&&gi(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!Ev(e.workingDirectory,t)&&gi(e.workingDirectory,["reset","-q","HEAD","--",t])},$X=(e,t)=>{let r=fi(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Nc(e.workingDirectory,t.relativePath),G.default.mkdirSync(Me.default.dirname(r),{recursive:!0}),G.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Nc(e.workingDirectory,t.relativePath);return}if(G.default.existsSync(r))for(let o of G.default.readdirSync(r)){let n=Me.default.join(r,o);G.default.statSync(n).mtimeMs>=e.startedMs-1e3&&G.default.rmSync(n,{recursive:!0,force:!0})}}}},Gz=e=>{try{if(e.git){if(Rv(e.workingDirectory)!==e.head&&(!(e.head===null?gi(e.workingDirectory,["update-ref","-d","HEAD"]):gi(e.workingDirectory,["reset","--hard",e.head]))||Rv(e.workingDirectory)!==e.head))throw new Error("head");let r=$z(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))zX(e,o)}else{if(e.complete)for(let t of Fz(e.workingDirectory).paths)e.files[t]===void 0&&Nc(e.workingDirectory,t);for(let t of Object.keys(e.files))Bz(e,t)}for(let t of e.caches)$X(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{G.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var _f,wf,HX,FX,UX,BX,GX,qz,VX,Kz,Jz=l(()=>{"use strict";R();Sf();Cv();Dz();Vz();we();Je();$t();Dn();_f=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),wf=e=>({...e,status:"stopped",errorMessage:wn,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),HX=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),FX=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==W?t:e.improverModel!==W?e.improverModel:null}return e.judgeModel!==W?e.judgeModel:e.improverModel!==W?e.improverModel:null},UX=async e=>{let t=ue(e.cycle),r=Mz({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=Uz({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?uc({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Cn(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):ec({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=Lz({promptText:e.revision.promptText,isModuleRun:i}),c=Ic({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await Qe({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=u.ok?Nz({workingDirectory:t,before:r,writerReply:u.text}):null,S=Gz(o),h={...e.cycle,revisions:e.cycle.revisions.map(y=>y.roundNumber===e.cycle.currentRound?d:y)};return u.ok?!S.ok||m===null?{ok:!1,cycle:_f(h,S.ok?"Could not put the folder back after the run.":S.errorMessage)}:{ok:!0,cycle:h,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:wf(h)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:_f(h,u.errorMessage,nr(u))})},BX=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:UX({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),GX=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),qz=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Qe({writerAgent:e.reviewer,workingDirectory:ue(e.cycle),prompt:gw({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:wf(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},VX=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===W)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Qe({writerAgent:t.judgeModel,workingDirectory:ue(t),prompt:Tn({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Mc(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?wf(o):(e.onWriterFailure?.(t.judgeModel),_f(o,n.errorMessage,nr(n)))},Kz=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return VX(e);let o=FX(t),n=await BX({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?HX(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===W){let u=await qz({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{...GX(s,u.text),judgePhase:void 0}}let i=await Qe({writerAgent:t.judgeModel,workingDirectory:ue(t),prompt:vn({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?wf(s):(e.onWriterFailure?.(t.judgeModel),_f(s,i.errorMessage,nr(i)));let a=await qz({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Mc(s,i.text,c);return Pf(d,a.text)}});var vf,qX,KX,Iv,Xz=l(()=>{"use strict";R();Sf();Jz();of();$t();we();Tv();Je();Dn();vf=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),qX=e=>({...e,status:"stopped",errorMessage:wn,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),KX=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?qX(e):(n?.(r),vf(e,t.errorMessage,nr(t))),Iv=async(e,t,r,o)=>{let n=Oc(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return vf(e,"This round has no prompt.");if(e.status==="judging")return Kz({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return vf(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===W)return e;let i=Mn(e);if(i===null)return vf(e,"The improver needs the score and the reason.");let a=await Qe({writerAgent:e.improverModel,workingDirectory:ue(e),prompt:So({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:Ic()}),c=KX(e,a,e.improverModel,r,t);return c!==null?c:yf(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var Dc,Ov,JX,Zz,Yz,XX,YX,Tf,Qz,e$,ZX,QX,jn,t$,r$,jc=l(()=>{"use strict";R();Rc();xc();we();Je();$t();Dn();Xz();rv();Dc=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),Ov=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return Dc(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},JX=e=>{let t=nr(e);return vj(e)||t==="usage_limit"||t==="action_required"},Zz=(e,t,r)=>JX(r)?Dc(e,r.errorMessage,nr(r)):Ov(e,t,r.errorMessage),Yz=e=>{let t=e.wizard;return t===void 0||wc(e).length===0?e:{...e,wizard:oi({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},XX=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",YX=e=>{let t=e.wizard;if(t===void 0)return e;let r=pc({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:oi({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Tf=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),Qz=e=>e.judgeModel!==W?e.judgeModel:e.improverModel!==W?e.improverModel:null,e$=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},ZX=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=Qz(e);if(n===null)return Dc(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Nt(o),i=cc({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:e$(e,"generalize")}),a=await Qe({writerAgent:n,prompt:i,workingDirectory:ue(e),signal:t});if(!a.ok)return r?.(n),Zz(e,"generalize",a);try{let c=Nw(a.text),d=oi({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Sc(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return gc(d)?jn({...u,wizard:{...d,gate:null}}):Tf(u,"generalize")}catch(c){return Ov(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},QX=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=Qz(e);if(n===null)return Dc(e,"Choose a writer to suggest splits.");let s=Dt({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=dc({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:e$(e,"separate")}),a=await Qe({writerAgent:n,prompt:i,workingDirectory:ue(e),signal:t});if(!a.ok)return r?.(n),Zz(e,"separate",a);try{let c=Dw(a.text),d=Cw(c,o.variables),u=oi({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:u};return hc(d)?bo(m,d[0]):Tf(m,"separate")}catch(c){return Ov(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},jn=e=>{let t=e.wizard;if(t===void 0)return e;let r=Nt(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},t$=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Dc(e,"This module is missing.");let n=kr(r),s=kn(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==W?e.runnerModel:e.judgeModel!==W?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:ie(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},r$=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return Iv(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return ZX(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return QX(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await Iv(e,t,r,o);if(E(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&wc(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=ce(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&fc({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let u=Yz(Tf(a,i));return _o(u)}let c=Tf(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=Ew({wizard:{...c.wizard,modules:c.wizard.modules.map((m,S)=>S===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:XX(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?Yz(d):YX(d)}return s}return n.phase==="complete",e}});var hi,Cf=l(()=>{"use strict";R();we();hi=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:Iw(r,e.judgeModel===W),updatedAt:new Date().toISOString()}}});var yi,kf=l(()=>{"use strict";yi=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var Pt,o$,eY,n$=l(()=>{"use strict";R();Je();kf();$t();yv();Pt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),o$=e=>{if(!E(e.status))return"";let t=ce(e.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??null,reasons:S.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=St(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Pt(t.reasons.trim())}</p>`,i=e.status==="passed",a=yi(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${Pt(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${Pt(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${Pt(n)}</div>`:i?eY({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ue(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${Pt(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${Pt(t.promptText)}</pre></details>`,m=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${m}</h2>${d}${o}${s}${u}</section>`},eY=e=>{let t=e.sourceSkill?.fileName??Lc(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=gf(t,r),s=n.length>0&&yz(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Pt(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Pt(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Pt(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Pt(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Pt(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Pt(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var s$,i$=l(()=>{"use strict";s$=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var a$,tY,Lf,et,Ef,Mv=l(()=>{"use strict";R();we();i$();Kg();$t();kf();a$=["Generalize","Evaluate","Separate","Optimize modules"],tY=e=>{let t=Ot(e),r=t>=0&&t<a$.length?a$[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},Lf=(e,t)=>{let r=xn(e),o=r===null?null:s$(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},et=(e,t)=>({title:e,detail:t,replyPreview:null}),Ef=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=xn(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:Rj(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!E(e.status)){let t=e.judgeModel;return et(`${ae(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!E(e.status)){let t=e.judgeModel;return et(`${ae(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===W?et(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?et(`${ae(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):et(`${ae(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===W){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==W?et(`${ae(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):et(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return et(`${ae(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ie(t);return et(`${ae(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return et(`${ae(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ie(t);return et(`${ae(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return et(`${ae(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===W){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return et("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return et(`${ae(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>St(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=oe(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||E(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?Lf(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=yi(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?Lf(e,{title:`${tY(r)}${s}`,detail:t.length>0?t:n}):Lf(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(E(e.status)){let t=e.errorMessage?.trim()??"";return Lf(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var lr,zc=l(()=>{"use strict";we();lr=e=>{if(e.status==="improving"&&e.improverModel===W)return!0;if(e.status!=="judging"||e.judgeModel!==W)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===W}});var l$,c$=l(()=>{"use strict";l$=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var wo,rY,d$,u$=l(()=>{"use strict";R();wo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rY=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${wo(r)}</p>`},d$=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${wo(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${wo(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${wo(a)}.</p>`}<pre class="mono">${wo(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Po(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${wo(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",m=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${wo(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${rY(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${wo(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var $c,oY,p$,m$=l(()=>{"use strict";R();$t();$c=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oY=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=St(t.promptText),n=t.judgement?.reasons?`<p class="muted">${$c(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${$c(i)}.</p>`}<pre class="mono">${$c(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Po(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${$c(d)}</pre>`:`<div class="alert-error">${$c(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${u}</article>`},p$=e=>e.revisions.map(t=>oY(e,t)).join("")});var g$,f$=l(()=>{"use strict";R();g$=e=>{if(E(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var cr,nY,Nv,sY,iY,aY,lY,h$,y$,Dv=l(()=>{"use strict";f$();cr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nY="Stop this run? Writers will stop and the best prompt is kept.",Nv="End the wizard? Writers will stop and progress from finished steps is kept.",sY="Skip this module and pause at the step gate?",iY=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${cr(nY)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${cr(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,aY=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${cr(Nv)}"><input type="hidden" name="cycleId" value="${cr(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,lY=e=>{let t=cr(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${cr(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${cr(sY)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${cr(Nv)}">End wizard</button>
    </form>
  </div>`},h$=e=>{let t=g$(e);return t==="none"?"":t==="legacy_stop"?iY(e.id):t==="wizard_end_only"?aY(e.id):lY(e)},y$=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=cr(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${cr(Nv)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var S$,P$=l(()=>{"use strict";R();ui();S$=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=oe(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${Nn(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${Nn(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${ie(r)}`}return""}});var cY,dY,A$,uY,b$,_$=l(()=>{"use strict";R();P$();gv();ef();sf();cY=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',dY=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',A$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uY=(e,t,r)=>{let o=ci(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=S$(e,t),i=nf(e,t),a=cY(i),c=dY(i),d=di(e,t,{forOutcomeSummary:!0}),u=`${a}<span class="sdlc-wizard-outcome-step-title">${A$(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${A$(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",S=i==="failed"&&t!=="wizard-4"?" open":"",h=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${h}"${m}${S}><summary aria-controls="${h}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${h}-body">${o}</div></details>`},b$=e=>{let t=e.wizard;if(t===void 0||!E(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>uY(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var w$,v$,T$=l(()=>{"use strict";w$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),v$=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${w$(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${w$(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var jv,C$,zv=l(()=>{"use strict";jv=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,C$=(e,t)=>{if(jv(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var k$,L$=l(()=>{"use strict";k$=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var Rf,E$,R$=l(()=>{"use strict";R();zv();zv();L$();Rf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),E$=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=oe(t),o=ie(t),n=r.terminalStatusSuggestion==="passed"?"":k$(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,h=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=u===void 0?c.status:C$(u,o),p=u!==void 0&&jv(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':y==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':y==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':Rf(y);return`<tr${h}><td>${Rf(c.title)}</td><td>${Rf(m)}</td><td>${c.tokens??"\u2014"}</td><td>${p}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${Rf(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var zn,xf,$v=l(()=>{"use strict";zn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xf=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${zn(r.fileName)}</code> \u2014 ${zn(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${zn(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${zn(i.name)}</strong> <code>.cursor/skills/${zn(i.fileName)}/SKILL.md</code></p><p class="muted">${zn(i.description)}</p><p>${zn(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var pY,x$,W$=l(()=>{"use strict";R();T$();R$();$v();pY=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),x$=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!E(e.status)||t.modules.length===0)return"";let r=E$(e),o=v$(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=oe(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${pY(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${xf(e)}${a}${r}${o}</section>`}});var K,Wf=l(()=>{"use strict";R();K={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var If,Hv=l(()=>{"use strict";If=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var I$,O$=l(()=>{"use strict";Wf();Hv();I$=e=>{let t=If({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:K.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var Ir,Hc=l(()=>{"use strict";Ir=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var Or,Of,Fv=l(()=>{"use strict";R();lf();n$();Mv();zc();c$();of();u$();m$();Dv();_$();W$();ui();O$();Je();Hc();Or=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Of=e=>{let t=!E(e.status)&&e.status!=="wizard_paused"&&!lr(e),r=Ef(e),o=oz(Aw(l$(e)),e),n=E(e.status)?"":h$(e),s=b$(e),i=x$(e),a=o$(e),c=e.errorMessage===null?"":`<div class="alert-error">${Or(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?oe(e.wizard):null,S=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,h=!t&&e.wizard!==void 0&&E(e.status)&&(e.wizard.phase==="complete"||oe(e.wizard).passedModuleCount>0),y=h?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",p=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Or(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",P=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${Or(r.replyPreview)}</pre>`,A=r.detail.length===0&&p.length===0&&P.length===0||r.detail.length===0&&P.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Or(r.detail)}${u}</p>`}${P}</div>`,f=e.revisions.find(Mo=>Mo.roundNumber===e.currentRound),b=e.status==="improving"?Mn(e):null,w=Wr(e),T=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),C=lr(e)?d$({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:b?.promptText??f?.promptText??"",score:b?.score??f?.judgement?.score??null,reasons:b?.reasons??f?.judgement?.reasons??null,avoid:b?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:T?1:0}):"",L=e.wizard!==void 0&&e.wizard.phase==="complete"&&E(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!L&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?ie(e.wizard):e.passScore,N=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${af(I)}</div>`:"",U=e.status==="failed"?I$({status:e.status,errorKind:e.errorKind}):null,V=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':E(e.status)?U!==null?`<span class="${U.badgeClass}">${U.badgeLabel}</span>`:L&&m!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",q=t?d:h?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',Xe=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Or(ut(ue(e)))}</li>`:"",w>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Nn(w)} so far</li>`:""].filter(Mo=>Mo.length>0),H=Xe.length===0?"":`<ul class="sdlc-run-meta">${Xe.join("")}</ul>`,ke=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,Xr=L?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,mr=L?"":N.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${Xr}</div>`:`<div class="sdlc-run-grid">${Xr}${N}</div>`,RL=p$(e),kV=e.wizard!==void 0&&E(e.status)&&e.revisions.every(Mo=>Mo.roundNumber===0&&(Mo.judgement===void 0||Mo.judgement===null)),LV=RL.length===0||kV?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${RL}</div></section>`,EV=`<p class="sdlc-run-goal" title="${Or(e.goal.trim())}">${Or(Ir(e.goal))}</p>`,RV=L?`${c}${i}${s}${C}${a}`:`${c}${mr}${C}${s}${a}`,xV='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',WV=L?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Or(e.updatedAt)}" aria-busy="${t?"true":"false"}">${xV}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${V}</div>${EV}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${q}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Or(r.title)}</h2>${A}${p}${WV}</div></div>${H}${ke}</header>${RV}</section>${LV}`}});var M$,N$=l(()=>{"use strict";R();xc();M$=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!fc({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:_o(e)}});var D$,j$=l(()=>{"use strict";R();jc();D$=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!gc(t)?e:jn({...e,wizard:{...t,gate:null}})}});var z$,$$=l(()=>{"use strict";R();Rc();z$=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!hc(t.splitOptions))return e;let r=t.splitOptions[0];return bo(e,r)}});var mY,$n,Mf=l(()=>{"use strict";N$();j$();$$();pt();mY=e=>{let t=D$(e),r=M$(t);return z$(r)},$n=(e,t)=>{let r=mY(t);return r!==t?(j(e,r),r):t}});var H$,Mr,Fc=l(()=>{"use strict";R();H$=e=>ct.indexOf(e),Mr=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||E(e.status)?ct.length:t.gate!==null?H$(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?H$(t.phase):null}});var F$,U$=l(()=>{"use strict";F$=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Hn,B$,G$=l(()=>{"use strict";R();U$();Hn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),B$=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Cn(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Hn(F$(o))}</pre></div>`:"",s=Ln(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=kr(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),u=Fg(c),m=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Hn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Hn(u)}">${Hn(S)}</label>
        ${h}
        <input class="input" type="text" id="${Hn(u)}" name="${Hn(u)}" value="${Hn(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var V$,q$=l(()=>{"use strict";V$={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var Uc,gY,pe,vo=l(()=>{"use strict";q$();Ao();Uc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gY=e=>{let t=V$[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Uc(t.title)}" aria-describedby="${r}" aria-expanded="false">${Ze}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Uc(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Uc(t.example)}</span></span></button>`},pe=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Uc(r)}"`}>${Uc(e)}</span>${gY(t)}</span>`});var At,K$,J$,X$=l(()=>{"use strict";R();Ec();Wf();vo();At=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),K$=e=>{let t=e.costControls;if(t===void 0||ai(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??dt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${At(K.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${At(t.softWarnMessage??En)}</p>`:"",d=hf({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${At(K.estimateOverCeilingWarn)}</p>`:"",u=e.wizard?.modules.length??0,m=u>0?`<p class="muted">Step 4 will optimize ${u} module${u===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${At(K.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${At(K.confirmLede)}</p>
  ${m}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${At(ni)}</p>
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
</section>`},J$=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!ai(r)}});var fY,Y$,Z$=l(()=>{"use strict";Ao();fY=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Y$=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${Ze}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${fY(t)}</pre></template>`}});var Bc,Q$,eH=l(()=>{"use strict";R();tv();G$();av();Dv();$v();dv();X$();Z$();Bc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Q$=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(J$(e))return K$(e);let n=ie(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?Hj(r):"",a=o==="evaluate"?xf(e):"",c=o==="evaluate"?li({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(I=>{let N=I.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',U=I.recommended?' <span class="sdlc-badge">Recommended</span>':"",V=r.selectedSplitOptionId===I.id||r.selectedSplitOptionId===null&&I.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${Bc(I.id)}" required${V}> <strong>${Bc(I.title)}</strong>${N}${U}</label>${Zg(e,I)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],h=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=m?.title??"Module",p=m?.prompt??"",P=m?.status==="pending",A=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Bc(y)}</p>${P?B$({cycle:e,modulePrompt:p}):""}<p class="muted">Test run prompt preview: ${Bc(kn(p,kr(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${li({cycle:e,interactive:!1,caption:P?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",f=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":P?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",b=mc(r),w=b===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${b}</p>`,T=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?Y$(r.lastWriterParseFailureReply??""):"",C=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",L=t?.active===!0?" sdlc-wizard-gate-active":"",x=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${C}"`:"";return`<section class="card sdlc-wizard-gate${L}"${x}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${f}</p>
    ${T}
    ${w}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Bc(e.id)}">
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
    ${y$(e)}
  </section>`}});var hY,tH,rH=l(()=>{"use strict";R();sf();hY=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tH=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||E(e.status))return"";let r=(o,n)=>{let s=di(e,o);return`<h2 class="sdlc-wizard-active-head">${hY(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var Uv,oH,nH,To,sH,Si=l(()=>{"use strict";R();pt();Uv=new Map,oH=e=>{let t=new AbortController;return Uv.set(e,t),t.signal},nH=e=>{Uv.delete(e)},To=e=>{Uv.get(e)?.abort()},sH=(e,t)=>{let r=Z(e,t);return r===null||r.wizard!==void 0?!1:(E(r.status)||(j(e,{...r,status:"stopped",errorMessage:wn,updatedAt:new Date().toISOString()}),To(t)),!0)}});var iH,aH,Bv,lH,Gv=l(()=>{"use strict";R();Fc();Si();iH="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",aH=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return ct[r]??null},Bv=(e,t)=>{let r=aH(t);if(r===null||e.wizard===void 0)return!1;let o=ct.indexOf(r);if(o===-1)return!1;let n=Mr(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<ct.length)},lH=(e,t)=>{let r=aH(t);if(r===null||e.wizard===void 0||!Bv(e,t))return e;To(e.id);let o=ct.slice(ct.indexOf(r)),n=lc(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var Vv,cH,dH=l(()=>{"use strict";Gv();Vv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cH=(e,t)=>Bv(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${Vv(iH)}"><input type="hidden" name="cycleId" value="${Vv(e.id)}"><input type="hidden" name="wizardStepId" value="${Vv(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var yY,uH,SY,pH,mH=l(()=>{"use strict";R();Fc();eH();rH();dH();ef();yY={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},uH=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SY=(e,t,r)=>{let o=cH(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${uH(t)}">
  <summary class="sdlc-wizard-accordion-summary">${uH(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${ci(e,t)}</div>
</details>`},pH=e=>{let t=e.wizard;if(t===void 0)return"";let r=Mr(e);if(r===null)return"";let o=ct.slice(0,r).map((i,a)=>SY(e,`wizard-${a+1}`,yY[i])),n=t.gate!==null?Q$(e,{active:!0}):tH(e),s=r>=ct.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var Nf,qv=l(()=>{"use strict";mH();cv();R();Nf=e=>{if(e===null||e.wizard!==void 0&&E(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=pH(e),r=Vj(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var PY,Kv,gH=l(()=>{"use strict";R();we();Je();Dn();PY=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},Kv=async(e,t,r)=>{if(!PY(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===W)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=Rw({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Qe({writerAgent:e.judgeModel,prompt:n,workingDirectory:ue(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=Ww(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var Gc,Df,fH,Jv,hH,yH,SH,jf,Xv=l(()=>{"use strict";Gc=g(require("node:fs")),Df=g(require("node:path")),fH=e=>Df.default.join(Df.default.dirname(e),"prompt-optimizer-writer-ready.json"),Jv=e=>{let t=fH(e);if(!Gc.default.existsSync(t))return{};try{let r=JSON.parse(Gc.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},hH=(e,t)=>{Gc.default.mkdirSync(Df.default.dirname(e),{recursive:!0}),Gc.default.writeFileSync(fH(e),`${JSON.stringify(t,null,2)}
`)},yH=(e,t)=>Jv(e)[t]?.message??null,SH=(e,t,r)=>{hH(e,{...Jv(e),[t]:{message:r}})},jf=(e,t)=>{let r=Jv(e);r[t]!==void 0&&hH(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var Yv,zf,$f,PH,ve,Fn=l(()=>{"use strict";R();Sv();jc();gH();zc();Si();Xv();Mf();pt();Yv=new Set,zf={atMs:0,ids:[]},$f=async()=>{if(Date.now()-zf.atMs<3e4)return zf.ids;let e=await It({commands:ye({})});return zf.atMs=Date.now(),zf.ids=e.installedWriterIds,e.installedWriterIds},PH=async(e,t,r)=>{let o=Z(e,t);if(o===null||r.aborted)return;let n=$n(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(E(n.status)&&!s||n.status==="wizard_paused"||lr(n))return;if(s){let c=await Kv(n,r,d=>{jf(e,d)});j(e,c);return}let i=await r$(n,c=>{jf(e,c)},r,c=>{Z(e,t)?.status==="stopped"||r.aborted||j(e,c)});if(!(Z(e,t)?.status==="stopped"||r.aborted)){if(j(e,i),E(i.status)){let c=await Kv(i,r,d=>{jf(e,d)});j(e,c);return}await PH(e,t,r)}},ve=(e,t)=>{if(Yv.has(t))return;let r=Z(e,t);if(r===null)return;let o=$n(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(E(o.status)&&!n||o.status==="wizard_paused"||lr(o))return;Yv.add(t);let s=oH(t);PH(e,t,s).finally(()=>{Yv.delete(t),nH(t)})}});var Co,Vc=l(()=>{"use strict";Fv();Mf();qv();Fn();Co=(e,t)=>{let r=$n(e,t);return ve(e,r.id),`${Of(r)}${Nf(r)}`}});var AH,bH,_H=l(()=>{"use strict";AH=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,bH=e=>e!==null&&e>0});var AY,bY,_Y,wH,vH=l(()=>{"use strict";R();jc();Cf();Rc();xc();Si();tf();tf();AY=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),bY=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ce(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},_Y=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=oe(o);return hi({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},wH=(e,t)=>{if(!kc(e,t))return e;To(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return jn({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return _o(bY(r));if(t==="wizard-3"){let n=o.splitOptions[0]??AY(o.templatedPrompt);return bo(r,n)}return t==="wizard-4"?_Y(r):e}});var Hf,TH,Zv=l(()=>{"use strict";R();Cf();Si();Hf=e=>(To(e.id),{...hi(e,"stopped"),errorMessage:ow}),TH=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;To(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var wY,CH,kH,LH=l(()=>{"use strict";R();jc();Cf();Rc();xc();Vc();pt();Fn();_H();Gv();vH();Zv();wY="Pick a revision scored above 0 before continuing to Separate.",CH=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),kH=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=Z(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=Z(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Co(e.storePath,d))};if(o==="wizard-stop-all"){let c=Hf(s);return j(e.storePath,c),ve(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=TH(s);return j(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=lH(s,c);return j(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=wH(s,c);return j(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&ve(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",m=vw(s.wizard,d,c);m=lc(m,d),m={...m,pendingStepInstructions:u};let S={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return j(e.storePath,S),ve(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?CH(s):jn({...s,wizard:{...s.wizard,gate:null}});return j(e.storePath,m),ve(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=AH(s,u??-1);if(!bH(m)){let h={...s,errorMessage:wY,updatedAt:new Date().toISOString()};return j(e.storePath,h),a(n),!0}let S=_o({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return j(e.storePath,S),ve(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=CH(s);return j(e.storePath,h),ve(e.storePath,n),a(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(h=>h.id===u);if(m===void 0){let h={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return j(e.storePath,h),a(n),!0}let S=bo(s,m);return j(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,m=d.modules[u];if(m===void 0)return a(n),!0;if(!ai(s.costControls)){let P=t.get("confirmedTokenBudget")?.trim()??"",A=t.get("confirmedMaxSpendUsd")?.trim()??"";if(P.length===0){let b={...s,errorMessage:ni,updatedAt:new Date().toISOString()};return j(e.storePath,b),a(n),!0}let f=Rr({existing:s.costControls,confirmedTokenBudget:Number(P),confirmedMaxSpendUsd:A.length===0?null:Number(A),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!f.ok){let b={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return j(e.storePath,b),a(n),!0}s={...s,costControls:f.costControls,errorMessage:null,updatedAt:new Date().toISOString()},j(e.storePath,s)}let S=Uw({wizard:d,modulePrompt:m.prompt,posted:t});if(!S.ok){let P={...s,errorMessage:S.errorMessage,updatedAt:new Date().toISOString()};return j(e.storePath,P),a(n),!0}let h={...d,parameterValues:S.parameterValues};if(m.status==="pending"){let P=t$({...s,wizard:{...h,gate:null}},u);return j(e.storePath,P),ve(e.storePath,n),a(n),!0}let y=u+1;if(y>=d.modules.length){let P=oe(h),A=hi({...s,wizard:h},P.terminalStatusSuggestion);return j(e.storePath,A),ve(e.storePath,n),a(n),!0}let p={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...h,gate:"optimize_modules",currentModuleIndex:y},updatedAt:new Date().toISOString()};return j(e.storePath,p),a(n),!0}}return a(n),!0}});var vY,EH,TY,Qv,CY,RH,xH=l(()=>{"use strict";we();Si();Zv();Cv();Sf();zc();pt();vY="Add a score from 0 to 100 and the reason for it.",EH="Add a score from 1 to 100 and the reason for it.",TY="Write the next prompt.",Qv="This step is not waiting for you.",CY=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},RH=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=Z(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(j(e.storePath,Hf(a)),{kind:"saved",cycleId:i}):sH(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=Z(e.storePath,r);if(o===null||!lr(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:Qv};if(t==="manual-judge"){if(o.judgeModel!==W)return{kind:"invalid",cycle:o,errorMessage:Qv};let i=CY(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?EH:vY};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:EH};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",u=Pf(Mc(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return j(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==W)return{kind:"invalid",cycle:o,errorMessage:Qv};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:TY};let s=yf(o,n);return j(e.storePath,s),{kind:"saved",cycleId:o.id}}});var WH,IH=l(()=>{"use strict";WH=`<script>
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
</script>`});var OH,MH=l(()=>{"use strict";OH=`<script>
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
</script>`});var NH,DH=l(()=>{"use strict";NH=`<script>
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
</script>`});var jH,zH=l(()=>{"use strict";jH=`<script>
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
</script>`});var $H,HH=l(()=>{"use strict";R();Je();$H=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:ut(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(ie(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!E(t.status)}}});var FH,UH=l(()=>{"use strict";FH=`<script>
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
</script>`});var BH,GH=l(()=>{"use strict";R();Fc();kf();BH=e=>{let t=yi(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:E(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=Mr(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=oe(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=oe(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return E(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var VH,qH=l(()=>{"use strict";VH=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Nr,kY,LY,KH,JH=l(()=>{"use strict";GH();qH();Hc();Nr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kY=e=>e.wizard===void 0?"legacy":"wizard",LY=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Nr(t)}">`,o=BH(e),n=VH(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Nr(o.badgeClass)}">${Nr(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Nr(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Nr(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${kY(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Nr(e.id)}">${Nr(Ir(e.goal))}</a><p class="muted">${Nr(a)}</p></div></div><div class="sdlc-history-row-actions">${u}${m}</div></li>`},KH=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>LY(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Nr(s)}</summary>${i}</details>`:i}});var eT,Ff,XH,EY,RY,qc,YH,Uf=l(()=>{"use strict";eT=g(require("node:fs")),Ff=g(require("node:path"));Je();XH=/^[a-z0-9-]+$/,EY=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},RY=(e,t)=>{if(!XH.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let m=EY(u[2]??"");u[1]==="name"&&m.length>0&&(o=m),u[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},qc=e=>{let t=xr(e);if(!t.ok)return[];let r=Ff.default.resolve(t.path,".cursor","skills"),o=[];try{o=eT.default.readdirSync(r)}catch{return[]}return o.filter(n=>XH.test(n)).flatMap(n=>{let s=Ff.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${Ff.default.sep}`))return[];try{let i=RY(eT.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},YH=(e,t)=>qc(e).find(r=>r.fileName===t)??null});var ZH,xY,QH,eF,tF=l(()=>{"use strict";vo();ZH=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xY=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),QH=e=>{if(e.length===0)return`<div class="field">${pe("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${ZH(r.fileName)}">${ZH(r.fileName)}</option>`).join("");return`<div class="field">${pe("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${xY(e)}</script>`},eF=`<script>
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
</script>`});var tt,rF,oF=l(()=>{"use strict";R();Wf();Ec();vo();tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rF=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=tt(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=ii({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??Er(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),m=hf({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",S=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
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
</div>`}});var Ge,nF,sF,WY,iF,aF,lF,cF=l(()=>{"use strict";R();Mv();we();Hc();Fc();Ge=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nF=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",sF=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,WY=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},iF=e=>e===W?"You":ae(e),aF=e=>{let t=WY(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ae(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Ge(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Ge(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Ge(iF(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Ge(iF(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Ge(r)}</dd></div>
    </dl>
  </details>`},lF=e=>{let t=e.wizard;if(t===void 0)return"";let r=Ir(e.goal),o=e.status==="wizard_paused",n=!E(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=Ef(e),m=sF(t),S=m===null?"":nF(m),h=Mr(e),y=S.length===0?"":h===null||h>=4?` <strong>${Ge(S)}</strong>`:` <strong>${Ge(S)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Ge(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Ge(u.title)}${y}</p>
    <p class="muted">${Ge(u.detail)}</p>
    <div class="actions">
      ${aF(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ge(e.id)}">Open this run</a>
    </div>
  </section>`}let s=sF(t),i=s===null?"Wizard":nF(s),a=Mr(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ge(r)}</h2>
    <p class="lede">Paused at <strong>${Ge(i)}</strong>${Ge(c)} (last updated ${Ge(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${aF(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ge(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Kc,dF,uF=l(()=>{"use strict";vo();Kc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dF=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${Kc(n.id)}"${n.id===e.runner?" selected":""}>${Kc(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Kc(e.runner)}">Checking ${Kc(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${pe("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${pe("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Kc(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var pF,mF=l(()=>{"use strict";pF=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var Pi,gF,fF,hF,yF,SF=l(()=>{"use strict";vo();Pi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gF=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${Pi(c.id)}"${c.id===r?" selected":""}>${Pi(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Pi(n)}</option>`;return`<div class="field">${pe(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},fF=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Pi(t)}">Checking ${Pi(o)}\u2026</p>`},hF=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${pe(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Pi(r)}</textarea><span class="muted">${o}</span></div></details>`,yF=e=>{let t=`<div class="sdlc-writer">${gF("judge","Judge",e.judge,e.writers,"I'll score it")}${fF("judge",e.judge,e.writers)}${hF("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${gF("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${fF("improver",e.improver,e.writers)}${hF("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var PF,AF=l(()=>{"use strict";PF=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var tT,bF,_F=l(()=>{"use strict";AF();tT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bF=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${PF.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${tT(t.goal)}" title="${tT(t.goal)}">${tT(t.label)}</button>`).join("")}</div>`});var Jc,IY,OY,rT,wF=l(()=>{"use strict";R();vo();Jc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IY=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},OY=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,rT=e=>{let t=IY(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=rc(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${pe(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${Jc(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${Jc(e.inputId)}" class="sdlc-pass-range" type="range" name="${Jc(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${Jc(a)}"><span class="sdlc-pass-mark" style="left:${OY(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${Jc(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var NY,oT,Dr,vF,TF=l(()=>{"use strict";zc();Fv();IH();MH();lf();DH();zH();HH();UH();JH();Uf();tF();vo();qv();oF();cF();Hc();uF();mF();SF();R();_F();wF();NY=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,oT='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',Dr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vF=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Dr(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Dr(e.skillNotice??"")}</div>`,o=`${nz}${sz}`,n=e.resumableWizardCycle??null,s=n===null?"":lF(n),i=Nf(e.cycle),a=e.cycle===null?"":Of(e.cycle),c=e.cycle!==null&&lr(e.cycle),d=$H(e),u=NY(d.goal,d.prompt,e.canRun),m=yF({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=dF({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=`${rT({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${rT({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=rF({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),p=_w,P=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",A=e.cycle!==null&&E(e.cycle.status),f=d.running&&!A,b=A||f?"":" open",w=f?" sdlc-compose-run-focus":"",C=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${A?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,L=A?(()=>{let H=e.cycle!==null?Ir(e.cycle.goal):Ir(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Dr(H)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${C}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${C}</summary>`,x=A?" sdlc-compose-viewing-finished":"",I=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",N=c?"waiting":d.running?"running":"idle",U=d.running&&!c?' aria-busy="true"':"",V=`<section class="card sdlc-compose${x}${w}" id="prompt-optimizer-compose">
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
        ${QH(qc(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${oT}
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
            ${bF()}
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
            ${oT}
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
        ${pF()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${oT}
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
    </section>`,q=e.history.length>0?FH:"",Xe=`${""}${jH}${WH}${OH}${NH}${eF}${q}`;return`${t}${r}${V}${s}${a}${i}${o}${KH(e.history,e.cycle?.id??null)}${Xe}`}});var Xc,nT=l(()=>{"use strict";TF();Xc=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:vF(t)}))}});var CF,kF=l(()=>{"use strict";xH();Vc();nT();pt();Fn();CF=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:RH({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=Z(e.storePath,o.cycleId);return ve(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(Co(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Xc(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:ir(e.storePath),resumableWizardCycle:null}),!0)}});var LF,Bf,sT=l(()=>{"use strict";R();LF=g(require("node:os")),Bf=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??LF.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??zt()}}});var EF,Ai,iT,RF,xF,Yc=l(()=>{"use strict";R();we();fv();EF=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Ai=e=>{let t=Wj(e),r=Wn(e).map(s=>({id:s,label:Jg[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},iT=(e,t,r)=>t===W||t!==null&&e.writers.some(o=>o.id===t)?t:r,RF=(e,t,r,o=null)=>({judge:iT(e,t,e.judge),improver:iT(e,r,e.improver),runner:iT(e,o,e.runner)}),xF=e=>e===cf?{goal:df,prompt:uf}:{goal:"",prompt:""}});var aT,WF=l(()=>{"use strict";aT=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var IF,DY,OF,MF,NF,DF=l(()=>{"use strict";R();IF=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},DY=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},OF=(e,t)=>e.has("earlyStop")?!0:t!=="run",MF=e=>{let t=IF(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=DY(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=IF(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},NF=e=>zt(e)});var jF,zF,Gf,lT=l(()=>{"use strict";R();we();Je();Yc();WF();DF();jF=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=aT(o);return n.ok?String(n.passScore):String(r)},zF=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return aT(n)},Gf=e=>{let t=RF(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=jF(e.posted,"passScore",70),o=jF(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",m=e.posted?.get("intent")??"",S=e.posted===null?!0:OF(e.posted,m),h=(L,x)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:L,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:x,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:u,earlyStop:S});if(e.posted===null)return h(e.defaultFolder??In,null);let y=e.posted.get("folder")??In;if(e.posted.get("intent")==="choose-folder"){let L=e.pickFolder();return h(L===null?y:ut(L),null)}if((e.posted.get("intent")??"")!=="run")return h(y,null);let P=EF(e.goal,e.prompt);if(P!==null)return h(y,P);let A=zF(e.posted,"passScore",r);if(!A.ok)return h(y,A.errorMessage);let f=zF(e.posted,"modulePassScore",o);if(!f.ok)return h(y,f.errorMessage);let b=Ij(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(b===null)return h(y,"Choose a judge and an improver.");let w=xr(y);if(!w.ok)return h(y,w.errorMessage);let T=Oj(e.installedIds,c,b.judge);if(T===null)return h(y,"Choose a runner for wizard step 4.");let C=MF({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return C.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:w.path,passScore:A.passScore,modulePassScore:f.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:T,runnerInstructions:a,costControls:NF(C.knobs)}:h(y,C.errorMessage)}});var bi,qf,jY,cT,$F,Vf,HF,zY,FF,dT,$Y,HY,FY,uT,UF,BF,GF=l(()=>{"use strict";bi=g(require("node:fs")),qf=g(require("node:path"));we();Je();jY=["remember","choose-folder","run"],cT=()=>({folder:In,judge:"",improver:"",runner:""}),$F=e=>qf.default.join(qf.default.dirname(e),"prompt-optimizer-preferences.json"),Vf=e=>typeof e=="string"?e:"",HF=e=>{let t=$F(e);if(!bi.default.existsSync(t))return cT();try{let r=JSON.parse(bi.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return cT();let o=r,n=Vf(o.folder).trim();return{folder:n.length===0?In:n,judge:Vf(o.judge),improver:Vf(o.improver),runner:Vf(o.runner)}}catch{return cT()}},zY=(e,t)=>{let r=$F(e);bi.default.mkdirSync(qf.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;bi.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),bi.default.renameSync(o,r)},FF=(e,t)=>e===W||Wn(t).some(r=>r===e),dT=(e,t,r)=>e===null?t:e.length===0?"":FF(e,r)?e:t,$Y=(e,t)=>{if(e===null)return t;let r=xr(e);return r.ok?r.display:t},HY=e=>{let t=HF(e.storePath),r={folder:$Y(e.folder,t.folder),judge:dT(e.judge,t.judge,e.installedIds),improver:dT(e.improver,t.improver,e.installedIds),runner:dT(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||zY(e.storePath,r)},FY=e=>{let t=xr(e);return t.ok?t.display:In},uT=(e,t)=>FF(e,t)?e:"",UF=e=>{let t=HF(e.storePath);return{selection:{...e.selection,judge:uT(t.judge,e.installedIds)||e.selection.judge,improver:uT(t.improver,e.installedIds)||e.selection.improver,runner:uT(t.runner,e.installedIds)||e.selection.runner},defaultFolder:FY(t.folder)}},BF=e=>{let t=e.posted.get("intent")??"";if(!jY.includes(t))return;let r=e.posted.get("folder");HY({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var VF,UY,BY,pT,GY,Kf,Jf=l(()=>{"use strict";VF=g(require("node:os"));we();Xv();Dn();UY="Reply with the single word ok. Do not use tools.",BY=45e3,pT=async(e,t)=>{if(t===W)return{ok:!0,message:"You will do this step."};let r=yH(e,t);if(r!==null)return{ok:!0,message:r};let o=await Qe({writerAgent:t,prompt:UY,workingDirectory:VF.default.tmpdir(),timeoutMs:BY});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ae(t)} is ready.`;return SH(e,t,n),{ok:!0,message:n}},GY=e=>[...new Set(e.filter(t=>t.length>0))],Kf=async(e,t,r,o)=>{for(let n of GY([t,r,o??""])){let s=await pT(e,n);if(!s.ok)return s.message}return null}});var mT,qF=l(()=>{"use strict";R();mT=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!E(r.status)&&!(t!==null&&r.id===t))return r;return null}});var KF,JF=l(()=>{"use strict";xt();R();Ec();Vc();sT();lT();nT();pt();Je();GF();Uf();Jf();qF();Mf();Fn();KF=async e=>{let t=e.posted===null?UF({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Gf({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>fo("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(BF({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?ut(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await Kf(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await Xc(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:ut(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:ir(e.route.storePath),resumableWizardCycle:mT(ir(e.route.storePath),null)});return}if(r.kind==="start"){let s=YH(r.workingDirectory,r.sourceSkillFile),i=ff(_c({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=Bf({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:Ow({...ac(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(j(e.route.storePath,a),ve(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(Co(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:Z(e.route.storePath,e.cycleId);n!==null&&(n=$n(e.route.storePath,n),ve(e.route.storePath,n.id)),await Xc(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:ir(e.route.storePath),resumableWizardCycle:mT(ir(e.route.storePath),n?.id??null)})}});var XF,YF=l(()=>{"use strict";pt();XF=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";gz(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var ZF,QF=l(()=>{"use strict";ZF=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var e1,t1=l(()=>{"use strict";bz();LH();kF();JF();YF();Yc();QF();Fn();e1=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await $f(),o=Ai(r),n=e.method==="POST"?ZF(e.request.headers["content-type"],await e.readBody(e.request)):null;if(kH({posted:n,storePath:e.storePath,response:e.response})||await CF(e,n,o))return;let s=xF(t.searchParams.get("example")),i=XF({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=Az({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await KF({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:Pz(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var VY,r1,o1=l(()=>{"use strict";R();pt();VY=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",r1=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=Z(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!E(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=Mw({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${VY(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var n1,s1=l(()=>{"use strict";Vc();pt();n1=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:Z(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":Co(e.storePath,o)),!0}});var qY,i1,a1=l(()=>{"use strict";we();Jf();qY=["claude-cli","codex","cursor","antigravity"],i1=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===W||qY.includes(t)?await pT(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var l1,c1=l(()=>{"use strict";R();l1=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:nc,page:sc,context:ti,installedWriters:e,post:{method:"POST",url:nc,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${nc}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var Xf,d1=l(()=>{"use strict";R();Hv();ui();Xf=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ce(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=E(e.status),n=e.errorKind??null,s=If({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:Wr(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:ti,page:`${sc}?cycle=${encodeURIComponent(e.id)}`}}});var F,KY,u1,p1,m1=l(()=>{"use strict";F=g(ls());R();KY=(0,F.isType)({goal:F.isString,prompt:F.isString,workingDirectory:F.isString,judge:(0,F.isUndefinedOr)(F.isString),improver:(0,F.isUndefinedOr)(F.isString),passScore:(0,F.isUndefinedOr)(F.isNumber),maxRounds:(0,F.isUndefinedOr)(F.isNumber),maxTrials:(0,F.isUndefinedOr)(F.isNumber),maxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),earlyStop:(0,F.isUndefinedOr)(F.isBoolean),earlyStopFlatRounds:(0,F.isUndefinedOr)(F.isNumber),confirmedTokenBudget:(0,F.isUndefinedOr)(F.isNumber),confirmedMaxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),rateUsdPer1kTokens:(0,F.isUndefinedOr)(F.isNumber)}),u1=e=>{let t=e?.trim()??"";return t.length===0?null:t},p1=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return KY(t)?t.workingDirectory.trim().length===0?{ok:!1,error:Mg}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:u1(t.judge),improver:u1(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:Mg}}});var jr,JY,g1,f1,h1=l(()=>{"use strict";R();jr=g(ls()),JY=(0,jr.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:jr.isNumber,confirmedMaxSpendUsd:(0,jr.isUndefinedOr)(jr.isNumber),rateUsdPer1kTokens:(0,jr.isUndefinedOr)(jr.isNumber)}),g1=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:JY(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},f1=(e,t)=>{let r=Rr({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var XY,y1,S1=l(()=>{"use strict";R();we();lT();Yc();XY=e=>e.map(t=>t.id).join(", "),y1=e=>{let t=Ai(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===W||n===W)return{ok:!1,error:bw,installedWriters:t.writers};if(o===null||n===null){let a=XY(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=Gf({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var YY,P1,A1=l(()=>{"use strict";R();sT();c1();d1();Yc();m1();h1();S1();pt();YY=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},P1=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let u=Z(e.storePath,t);return u===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:Xf(u)}}let r=await e.handlers.readInstalledIds(),o=Ai(r);if(e.method==="GET")return{status:200,body:l1(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let u=g1(e.rawBody);if(u.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(u.kind==="invalid")return{status:400,body:{ok:!1,error:u.error}};let m=Z(e.storePath,t);if(m===null)return{status:404,body:{ok:!1,error:"That run is not on this Mac."}};let S=f1(m,u.body);return S.ok?(j(e.storePath,S.cycle),{status:200,body:Xf(S.cycle)}):{status:400,body:{ok:!1,error:S.error}}}let n=YY(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let u=ii({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:u.targetTokenBudget,proposedTokenBudget:u.targetTokenBudget,estimatedSpendUsd:u.estimatedSpendUsd,rateUsdPer1kTokens:u.rateUsdPer1kTokens??null,proposalStub:u.stub===!0,confirmationRequired:!0}}}let s=p1(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=y1({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=_c({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:dt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let u=Rr({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!u.ok)return{status:400,body:{ok:!1,error:u.errorMessage}};c=u.costControls}let d=Bf({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:ac(i.prompt),runnerModel:i.runner,costControls:c});return j(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:Xf(d)}}});var b1,_1=l(()=>{"use strict";Fn();Jf();A1();b1=async e=>{let t=await P1({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:$f,readWritersReady:Kf,startCycle:ve}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var v1,ZY,QY,w1,eZ,T1,C1=l(()=>{"use strict";v1=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],ZY=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},QY=e=>{let t={};for(let n of e)for(let s of new Set(v1(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},w1=(e,t)=>{let r=ZY(v1(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},eZ=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},T1=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=QY(e.map(i=>i.text)),s=w1(o,n);return e.map(i=>({id:i.id,score:eZ(s,w1(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var gT,tZ,rZ,k1,oZ,nZ,sZ,iZ,fT,hT=l(()=>{"use strict";gT=g(require("node:path"));Je();C1();Uf();tZ=5,rZ=20,k1=280,oZ=e=>[e.name,e.description,e.promptText].join(`
`),nZ=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=k1?t:`${t.slice(0,k1-3)}...`},sZ=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),iZ=e=>e===void 0||!Number.isFinite(e)?tZ:Math.min(rZ,Math.max(1,Math.floor(e))),fT=e=>{let t=e.query.trim(),r=iZ(e.limit),o=xr(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=qc(o.path),s=T1(n.map(d=>({id:d.fileName,text:oZ(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=gT.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:gT.default.join(a,u.fileName,"SKILL.md"),excerpt:nZ(u),source:"filesystem"}]});return{query:t,hits:c,context:sZ(c)}}});var L1,E1=l(()=>{"use strict";hT();L1=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:fT({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var R1,x1=l(()=>{"use strict";E1();R1=async e=>{let t=L1({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var aZ,yT,W1=l(()=>{"use strict";lz();t1();o1();s1();a1();_1();x1();aZ=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},yT=async e=>{let t=aZ(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await b1(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await R1(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:az()})),!0):(await i1({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||r1({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||n1({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await e1(e),!0)}});var I1=l(()=>{"use strict";W1();hT();Dn()});var O1,lZ,zr,ST,PT=l(()=>{"use strict";O1=e=>{let t=JSON.parse(e);return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]},lZ=e=>e===""?null:e,zr=e=>e??"",ST=e=>({id:e.id,projectId:lZ(e.project_id),symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:{kind:e.check_kind,value:e.check_value},keywords:O1(e.keywords_json),tags:O1(e.tags_json),source:e.source,hitCount:e.hit_count,lastSeenAt:e.last_seen_at,severity:e.severity})});var M1,cZ,dZ,AT,_i,Yf,Zc=l(()=>{"use strict";PT();M1=`
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`,cZ=e=>e,dZ=e=>e??null,AT=(e,t,r=t)=>cZ(e.prepare(M1).all(zr(r),zr(t))).map(ST),_i=(e,t,r,o=t)=>{let n=dZ(e.prepare(`${M1} AND p.id = ?`).get(zr(o),zr(t),r));return n===null?null:ST(n)},Yf=(e,t)=>{e.prepare(`INSERT INTO pitfalls (
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
      severity = excluded.severity`).run(zr(t.projectId),t.id,t.symptom,t.cause,t.avoidance,t.check.kind,t.check.value,JSON.stringify(t.keywords),JSON.stringify(t.tags),t.source,t.severity)}});var Qc,bT=l(()=>{"use strict";Qc={symptom:120,cause:200,avoidance:280,checkValue:280,keyword:40,keywords:24,tag:32,tags:12,id:64}});var N1=l(()=>{"use strict";bT()});var Un,_T=l(()=>{"use strict";Un=e=>e.replace(/\s+/g," ").trim()});var ko,wT=l(()=>{"use strict";ko=e=>Math.ceil(e.length/4)});var Zf,D1=l(()=>{"use strict";wT();Zf=(e,t)=>{if(t<=0)return"";if(ko(e)<=t)return e;let r=t*4;return e.slice(0,r).trimEnd()}});var ed,j1=l(()=>{"use strict";_T();ed=e=>`${Un(e.id)}|${Un(e.avoidance)}`});var z1=l(()=>{"use strict"});var wi=l(()=>{"use strict";bT();N1();_T();wT();D1();j1();z1()});var Qf,vT=l(()=>{"use strict";wi();Qf=e=>e.map(t=>({id:Un(t.id),avoidance:Un(t.avoidance)}))});var TT,H1,eh=l(()=>{"use strict";TT=e=>{let t=new Map;e.seeds.forEach(o=>{t.set(o.id,o)}),e.projectRows.forEach(o=>{t.set(o.id,o)});let r=[...t.values()];return e.includeRetired===!0?r:r.filter(o=>o.source!=="retired")},H1=e=>e.filter(t=>t.source!=="retired").length});var Bn,F1,td=l(()=>{"use strict";wi();vT();Zc();eh();Bn=(e,t={})=>{let r=t.projectId??null,o=AT(e,null,r),n=r===null||r===""?[]:AT(e,r);return TT({seeds:o,projectRows:n,includeRetired:t.includeRetired===!0})},F1=(e,t={})=>{let r=Bn(e,t);return t.format==="bot"?{format:"bot",items:Qf(r),lines:r.map(o=>ed(o))}:{format:"full",items:r}}});var th,CT=l(()=>{"use strict";Zc();td();th=(e,t)=>{let r=t.id.trim();if(r.length===0)return null;let o=t.projectId??null;return o===null||o===""?_i(e,null,r):Bn(e,{projectId:o,includeRetired:!0}).find(s=>s.id===r)??null}});var kT=l(()=>{"use strict"});var Lo,vi,U1,B1,G1=l(()=>{"use strict";Lo=e=>({type:"string",description:e}),vi={name:"check_context",description:"Match the current prompt against project pitfalls. Call on the first user message. Returns hit, miss, or none. Miss stays silent.",inputSchema:{type:"object",properties:{cwd:Lo("Absolute working directory for the current session."),message:Lo("User prompt or task text to match."),sessionId:Lo("Optional session id for first-message tracking."),projectId:Lo("Optional project id when already known.")},additionalProperties:!1}},U1={name:"get_context",description:"Compact project briefing: id, folder, and feature flags. Not a full docs dump.",inputSchema:{type:"object",properties:{cwd:Lo("Absolute working directory."),projectId:Lo("Optional project id when already known.")},additionalProperties:!1}},B1={name:"get_pitfalls",description:"List or search project pitfalls in a short bot-friendly form.",inputSchema:{type:"object",properties:{projectId:Lo("Project id."),q:Lo("Optional search text."),limit:{type:"number",description:"Max rows to return."}},additionalProperties:!1}}});var Gn,V1,q1,K1=l(()=>{"use strict";Gn=e=>({type:"string",description:e}),V1={name:"get_skill",description:"Read one project skill by id or search. Same idea as the cloud skill tools.",inputSchema:{type:"object",properties:{projectId:Gn("Project id."),skillId:Gn("Skill id when known."),q:Gn("Optional search text.")},required:["projectId"],additionalProperties:!1}},q1={name:"record_outcome",description:"Record whether a tip or preflight check helped. Pitfall wins call the cloud hit route.",inputSchema:{type:"object",properties:{projectId:Gn("Project id."),kind:{type:"string",description:"pitfall | preflight | other"},pitfallId:Gn("Pitfall id when kind is pitfall."),preflightId:Gn("Preflight check id when kind is preflight."),ok:{type:"boolean",description:"Whether the step helped."},notes:Gn("Optional short note. No secret values.")},required:["projectId","kind","ok"],additionalProperties:!1}}});var J1=l(()=>{"use strict";G1();K1()});var LT,X1=l(()=>{"use strict";wi();kT();LT=e=>{let t=Zf("Agent Witch tip \xB7 check_context",120);if(ko(t)>=120)return t;let r=[t],o=ko(t);for(let n of e){if(r.length-1>=4)break;let s=ed(n),i=ko(s);if(o+i>120){if(r.length===1){let a=120-o,c=Zf(s,a);c.length>0&&(r.push(c),o+=ko(c));continue}continue}r.push(s),o+=i}return r.join(`
`)}});var Y1=l(()=>{"use strict";wi()});var oh=l(()=>{"use strict";kT();J1();X1();Y1()});var fZ,hZ,ET,RT=l(()=>{"use strict";oh();fZ=e=>e.toLowerCase(),hZ=(e,t)=>{let r=fZ(e);return t.reduce((o,n)=>{let s=n.trim().toLowerCase();return s.length===0?o:r.includes(s)?o+1:o},0)},ET=e=>{let t=e.pitfalls.map(r=>({pitfall:r,score:hZ(e.text,r.keywords)})).filter(r=>r.score>0).sort((r,o)=>o.score-r.score||r.pitfall.id.localeCompare(o.pitfall.id));return t.length===0?[]:t.slice(0,4).map(r=>r.pitfall)}});var Z1,Q1=l(()=>{"use strict";td();RT();Z1=(e,t)=>{let r=Bn(e,{projectId:t.projectId,includeRetired:!1});return ET({pitfalls:r,text:t.text})}});var nh,sh,ih,ah,lh,od,eU=l(()=>{"use strict";wi();nh=Qc.symptom,sh=Qc.cause,ih=Qc.avoidance,ah=64,lh="token-saver.db",od=1});var tU,nd=l(()=>{"use strict";eU();tU=3e3});var rU,oU=l(()=>{"use strict";nd();rU=`
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
`});var nU,sU,iU,yZ,SZ,aU,lU,cU=l(()=>{"use strict";nU=g(require("node:fs")),sU=g(require("node:path")),iU=require("node:sqlite");nd();oU();yZ=e=>{let t=e.prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},SZ=(e,t)=>{e.prepare(`INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},aU=e=>{nU.default.mkdirSync(sU.default.dirname(e),{recursive:!0});let t=new iU.DatabaseSync(e);return t.exec(`PRAGMA busy_timeout = ${tU}`),t.exec(rU),yZ(t)<od&&SZ(t,od),t},lU=e=>{e.close()}});var dU,uU,xT=l(()=>{"use strict";PT();dU=(e,t,r,o)=>{let n=e.prepare(`INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`).get(zr(t),r,o);return{hitCount:n.hit_count,lastSeenAt:n.last_seen_at}},uU=(e,t,r)=>{let o=e.prepare(`SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`).get(zr(t),r);return o===void 0?{hitCount:0,lastSeenAt:null}:{hitCount:o.hit_count,lastSeenAt:o.last_seen_at}}});var pU,mU=l(()=>{"use strict";CT();xT();pU=(e,t)=>{let r=t.id.trim(),o=r.length===0?null:th(e,{projectId:t.projectId,id:r});if(o===null)return{ok:!1,reason:"not_found"};let n=t.nowIso??new Date().toISOString(),s=dU(e,t.projectId,o.id,n);return{ok:!0,pitfall:{...o,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt}}}});var WT,IT,OT=l(()=>{"use strict";WT=g(require("node:path"));Le();nd();IT=e=>e.profileEmail!==null?WT.default.join(e.installDir,Ve,e.profileEmail,lh):WT.default.join(e.installDir,lh)});var fU,gU=l(()=>{fU=[{id:"arch-max-lines",symptom:"ci:architecture fails at land (handler >100 / test >100 effective lines)",cause:"Max-effective-lines=100 only enforced late",avoidance:"Run `npm run ci:architecture` before tipping Arch",check:{kind:"command",value:"npm run ci:architecture"},keywords:["architecture","land","ci:architecture","max-effective","lines"],tags:["architecture","ci"]},{id:"symlink-node-modules",symptom:'Turbopack: "points out of the filesystem root"',cause:"Mac worktree with symlinked node_modules",avoidance:"APFS clone: `cp -Rc` (not symlink) into worktree",check:{kind:"id",value:"pit.symlink-node-modules"},keywords:["build","turbopack","symlink","node_modules","filesystem root"],tags:["build"]},{id:"install-bundle-clobber",symptom:"Missing/broken public/install/agent-witch/app/deps.tar.gz or agent-witch.js after build",cause:"Build overwrites install bundle artifacts",avoidance:"Restore those two paths after `build`",check:{kind:"command",value:"test -f public/install/agent-witch/app/deps.tar.gz && test -f public/install/agent-witch/app/agent-witch.js"},keywords:["build","deps.tar.gz","agent-witch.js","install bundle","clobber"],tags:["build","awi"]},{id:"stale-next",symptom:"Typecheck fails spuriously",cause:"Stale .next",avoidance:"`rm -rf .next` then typecheck",check:{kind:"id",value:"pit.stale-next"},keywords:["build","typecheck",".next","stale","turbopack"],tags:["build"]},{id:"main-moved-rebase",symptom:"FF/SHIP fails; main advanced",cause:"main moved between SHIP and FF",avoidance:"`git fetch`; pure-rebase onto new `-rN` branch; **never** force-push",check:{kind:"id",value:"pit.main-moved-rebase"},keywords:["ship","ff","push","rebase","main moved","force-push"],tags:["git"]},{id:"health-lag",symptom:"Declare done on exit 0 / HTTP 200 too early",cause:"Deploy health lags ~1\u20132 min after push",avoidance:"Poll until health `commitSha` == main tip + smoke",check:{kind:"id",value:"pf.health-matches-main"},keywords:["ship","ff","push","health","commitSha","deploy"],tags:["deploy"]},{id:"dirty-home-checkout",symptom:"Accidental reset/clean of ~/daily-magic",cause:"Home checkout left dirty",avoidance:"Use `/tmp` worktrees; never reset/clean home",check:{kind:"id",value:"pit.dirty-home-checkout"},keywords:["reset","clean","home checkout","daily-magic","worktree"],tags:["git"]},{id:"box-no-gh-auth",symptom:"Push from box fails",cause:"Box git has no GitHub auth",avoidance:"Push from the Mac",check:{kind:"id",value:"pit.box-no-gh-auth"},keywords:["ship","ff","push","box","github","auth"],tags:["git"]},{id:"ci-yml-main-only",symptom:"Expecting GH Actions on non-main push",cause:"Old ci.yml push trigger covered only main; CI being removed \u2014 gate is local suite",avoidance:"Run local `npm run ci` (or suite subset); do not wait on Actions",check:{kind:"id",value:"pit.local-suite-gate"},keywords:["ci","actions","github actions","npm run ci","main only"],tags:["ci"]},{id:"secrets-in-logs",symptom:"Secrets printed in logs/CLI",cause:"Verbose dump of env/files",avoidance:"Print existence / path / fingerprint only",check:{kind:"id",value:"pit.secrets-in-logs"},keywords:["secrets","logs","token","keypair","env","fingerprint"],tags:["secrets"]},{id:"no-prs-daily-magic",symptom:"PR windows opened in Mac Chrome",cause:"Habit from other repos",avoidance:"No PRs for daily-magic; never open PR UI",check:{kind:"id",value:"pit.no-prs"},keywords:["pr","pull request","chrome","daily-magic"],tags:["git"]}]});var AZ,bZ,MT,NT=l(()=>{"use strict";gU();AZ=fU,bZ=e=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags??[],projectId:null,source:"seed",hitCount:0,lastSeenAt:null,severity:"warn"}),MT=()=>AZ.map(bZ)});var hU,yU=l(()=>{"use strict";NT();Zc();hU=e=>MT().reduce((r,o)=>_i(e,null,o.id)!==null?r:(Yf(e,o),r+1),0)});var SU,PU,AU=l(()=>{"use strict";nd();SU=e=>e.id.trim().length===0?{kind:"empty_id"}:e.projectId.trim().length===0?{kind:"empty_project_id"}:e.symptom.length>nh?{kind:"field_too_long",field:"symptom",max:nh}:e.cause.length>sh?{kind:"field_too_long",field:"cause",max:sh}:e.avoidance.length>ih?{kind:"field_too_long",field:"avoidance",max:ih}:null,PU=e=>e.activeCountAfter>ah?{kind:"active_cap",max:ah}:null});var bU,_U=l(()=>{"use strict";Zc();xT();td();eh();AU();bU=(e,t)=>{let r=SU(t);if(r!==null)return{ok:!1,error:r};let o=t.id.trim(),n=_i(e,t.projectId,o),s=uU(e,t.projectId,o),i=t.source??"project",a={id:o,projectId:t.projectId,symptom:t.symptom,cause:t.cause,avoidance:t.avoidance,check:t.check,keywords:t.keywords,tags:t.tags??[],source:i,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt,severity:t.severity??n?.severity??"warn"},d=Bn(e,{projectId:t.projectId,includeRetired:!0}).filter(S=>S.id!==a.id),u=H1([...d,a]),m=PU({activeCountAfter:u});return m!==null?{ok:!1,error:m}:(Yf(e,a),{ok:!0,pitfall:a})}});var DT,jT=l(()=>{"use strict";CT();td();Q1();cU();mU();OT();yU();_U();DT=e=>{let t=e.dbPath??(e.layout!==void 0?IT(e.layout):(()=>{throw new Error("createPitfallRegistry requires dbPath or layout")})()),r=aU(t);return hU(r),{dbPath:t,listPitfalls:o=>F1(r,o),getPitfall:o=>th(r,o),upsertPitfall:o=>bU(r,o),recordHit:o=>pU(r,o),matchPitfalls:o=>Z1(r,o),close:()=>lU(r)}}});var _Z,wZ,zT,$T=l(()=>{"use strict";oh();vT();_Z=(e,t,r)=>{let o=t.projectId?.trim();return o!==void 0&&o.length>0?o:r===null||e.resolveProjectId===void 0?null:e.resolveProjectId(r)},wZ=(e,t,r,o)=>{for(let n of o)try{t.recordHit({projectId:r,id:n.id})}catch(s){e.logError?.(s)}},zT=(e,t)=>{try{let r=t.cwd?.trim()??"",o=r.length>0?r:null;if(o!==null&&e.isDeclined?.(o)===!0)return{status:"none"};let n=_Z(e,t,o);if(n===null||e.registry===null)return{status:"none",promptCreate:o!==null};let s=e.registry.matchPitfalls({projectId:n,text:t.message??""});if(s.length===0)return{status:"miss",projectId:n};wZ(e,e.registry,n,s);let i=Qf(s);return{status:"hit",projectId:n,pitfalls:i,tip:LT(i)}}catch(r){return e.logError?.(r),{status:"none"}}}});var HT,wU=l(()=>{"use strict";oh();HT={name:vi.name,description:vi.description,inputSchema:vi.inputSchema}});var Eo,ch,FT=l(()=>{"use strict";Eo=(e,t)=>{let r=e[t];if(typeof r!="string")return;let o=r.trim();return o.length>0?o:void 0},ch=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return{};let t=e;return{...Eo(t,"cwd")!==void 0?{cwd:Eo(t,"cwd")}:{},...Eo(t,"message")!==void 0?{message:Eo(t,"message")}:{},...Eo(t,"sessionId")!==void 0?{sessionId:Eo(t,"sessionId")}:{},...Eo(t,"projectId")!==void 0?{projectId:Eo(t,"projectId")}:{}}}});var sd,UT=l(()=>{"use strict";xt();$T();jT();FT();sd=e=>{let t=e.logError??(r=>{let o=r instanceof Error?r.message:String(r);console.error(`[agent-witch] check_context: ${o}`)});return r=>{let o=ch(r),n=null;try{return n=DT({layout:e.layout}),zT({registry:n,resolveProjectId:nb,isDeclined:e.isDeclined,logError:t},o)}catch(s){return t(s),{status:"none"}}finally{n?.close()}}}});var vZ,BT,vU=l(()=>{"use strict";UT();FT();vZ="/api/local/check-context",BT=async e=>{if(e.pathname!==vZ)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t={};try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{return e.sendJson(e.response,400,{status:"none"}),!0}let r=sd({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,r(ch(t))),!0}});var GT=l(()=>{"use strict";jT();OT();RT();eh();NT();$T();wU();UT();vU()});var VT,qT,KT=l(()=>{"use strict";VT="2025-03-26",qT={name:"agent-witch",version:"1.0.0"}});var Ti,dh,TU,TZ,id,CU=l(()=>{"use strict";KT();Ti=(e,t,r)=>({jsonrpc:"2.0",id:e??null,error:{code:t,message:r}}),dh=(e,t)=>({jsonrpc:"2.0",id:e??null,result:t}),TU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:null,TZ=async(e,t,r,o)=>{let n=t?.name;if(typeof n!="string")return Ti(e,-32602,"tool name is required");let s=r.tools.find(i=>i.definition.name===n);if(s===void 0)return Ti(e,-32602,`Unknown tool: ${n}`);try{let i=await s.call(t?.arguments??{},o);return dh(e,i)}catch(i){let a=i instanceof Error?i.message:String(i);return Ti(e,-32603,`Tool ${n} failed: ${a}`)}},id=async(e,t,r)=>{let o=TU(e);if(o===null)return Ti(null,-32700,"Parse error");let n=o.id??null,s=o.method;return typeof s!="string"?Ti(n,-32600,"Invalid Request"):s==="initialize"?dh(n,{protocolVersion:VT,capabilities:{tools:{listChanged:!1}},serverInfo:t.serverInfo}):s==="ping"||s==="notifications/initialized"?dh(n,{}):s==="tools/list"?dh(n,{tools:t.tools.map(i=>i.definition)}):s==="tools/call"?TZ(n,TU(o.params),t,r):Ti(n,-32601,"Method not found")}});var JT,kU=l(()=>{"use strict";JT=(e,t)=>({content:[{type:"text",text:e}],...t===!0?{isError:!0}:{}})});var uh=l(()=>{"use strict";CU();kU();KT()});var Ci,ph=l(()=>{"use strict";GT();uh();Ci=e=>{let t=sd({layout:e.layout,isDeclined:e.isDeclined});return{serverInfo:qT,tools:[{definition:HT,call:r=>JT(JSON.stringify(t(r)))}]}}});var LU,CZ,kZ,EU,RU=l(()=>{"use strict";uh();ph();LU=(e,t)=>{let r=JSON.stringify(t);e.write(`Content-Length: ${Buffer.byteLength(r,"utf8")}\r
\r
${r}`)},CZ=async(e,t)=>{let r=Buffer.alloc(0);for await(let o of e.stdin)for(r=Buffer.concat([r,Buffer.isBuffer(o)?o:Buffer.from(String(o),"utf8")]);;){let n=r.indexOf(`\r
\r
`);if(n<0)break;let s=r.subarray(0,n).toString("utf8"),i=/Content-Length:\s*(\d+)/i.exec(s);if(i===null){r=r.subarray(n+4);continue}let a=Number.parseInt(i[1]??"0",10),c=n+4+a;if(r.length<c)break;let d=r.subarray(n+4,c).toString("utf8");r=r.subarray(c);let u;try{u=JSON.parse(d)}catch{u=null}await t(u)}},kZ=async(e,t)=>{await CZ(t,async r=>{let o=typeof r=="object"&&r!==null?r:null,n=o?.method,s=await id(r,e,void 0);if(typeof n=="string"&&n.startsWith("notifications/")){o?.id!==void 0&&LU(t.stdout,s);return}LU(t.stdout,s)})},EU=async e=>{await kZ(Ci({layout:e.layout}),{stdin:process.stdin,stdout:process.stdout})}});var LZ,mh,xU=l(()=>{"use strict";uh();ph();LZ="/mcp",mh=async e=>{if(e.pathname!==LZ)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t=null;try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{t=null}let r=e.server??Ci({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,await id(t,r,void 0)),!0}});var WU={};ft(WU,{createAwlMcpServer:()=>Ci,runAwlMcpStdio:()=>EU,tryHandleAwlMcpHttpRequest:()=>mh});var XT=l(()=>{"use strict";ph();RU();xU()});var Vn,ad,EZ,RZ,xZ,WZ,IU,OU=l(()=>{"use strict";Vn=g(require("node:fs")),ad=g(require("node:path")),EZ="prompt-optimizer-cycles.json",RZ="prompt-optimizer-preferences.json",xZ="prompt-sdlc-cycles.json",WZ="prompt-sdlc-preferences.json",IU=e=>{let t=ad.default.join(e,EZ),r=ad.default.join(e,xZ);if(Vn.default.existsSync(t)||!Vn.default.existsSync(r))return t;try{Vn.default.renameSync(r,t)}catch{return r}let o=ad.default.join(e,WZ),n=ad.default.join(e,RZ);if(Vn.default.existsSync(o)&&!Vn.default.existsSync(n))try{Vn.default.renameSync(o,n)}catch{}return t}});var ki,IZ,YT,MU=l(()=>{"use strict";ki=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IZ=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],YT=e=>{let t=IZ.map(i=>`<option value="${ki(i.value)}">${ki(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${ki(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${ki(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${ki(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${ki(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var ld,jU,OZ,zU,MZ,NZ,$U,fh,NU,DU,DZ,jZ,$r,cd,gh,zZ,hh,ZT,$Z,QT,HU,eC,FU,HZ,FZ,UZ,UU,BU,GU,dd=l(()=>{"use strict";ld=g(require("node:fs")),jU=g(require("node:path")),OZ="estimate-history.ndjson",zU=100,MZ=500,NZ=2e4,$U=e=>jU.default.join(e,OZ),fh=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,MZ),NU=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,NZ),DU=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,DZ=e=>({...e,estimateTokens:DU(e.estimateTokens),actualTokens:DU(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),jZ=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},$r=e=>{let t=$U(e);return ld.default.existsSync(t)?ld.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return jZ(n)?[DZ(n)]:[]}catch{return[]}}):[]},cd=(e,t)=>{ld.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;ld.default.writeFileSync($U(e),r,"utf8")},gh=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),zZ=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${gh(o.task)} | ${gh(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},hh=e=>{let t=$r(e.reportsDir),r=fh(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);cd(e.reportsDir,[...s,n])},ZT=e=>{let t=$r(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?fh(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);cd(e.reportsDir,[...i,s])},$Z=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-zU),QT=e=>[...$r(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),HU=e=>{let t=$r(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=NU(e.input),n=NU(e.output),s=fh(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);cd(e.reportsDir,[...c,a])},eC=(e,t)=>{let r=$r(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},FU=e=>({table:zZ($Z($r(e))),embedding:null}),HZ=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},FZ=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-zU),UZ=e=>{let t=HZ(FZ(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${gh(s.task)} | ${gh(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},UU=e=>{let t=$r(e.reportsDir),r=fh(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);cd(e.reportsDir,[...s,n])},BU=e=>{let t=$r(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);cd(e.reportsDir,[...s,n])},GU=e=>UZ($r(e))});var VU=l(()=>{"use strict";dd()});var Hr,tC,BZ,rC,GZ,VZ,yh,Sh,qZ,oC,qU=l(()=>{"use strict";VU();pv();Hr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tC=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},BZ=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${tC(-r)} under`:`${tC(r)} over`},rC=e=>e.toLocaleString("en-US"),GZ=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${rC(-r)} under`:`${rC(r)} over`},VZ=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},yh=e=>e===null?"\u2014":tC(e),Sh=e=>e===null?"\u2014":rC(e),qZ=`(function () {
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
})();`,oC=e=>{let r=QT(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":BZ(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":GZ(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${Hr(VZ(i))}</button></td>
        <td>${Hr(c)}</td>
        <td>${yh(n.estimateSeconds)}</td>
        <td>${yh(n.actualSeconds)}</td>
        <td>${Hr(d)}</td>
        <td>${Sh(n.estimateTokens)}</td>
        <td>${Sh(n.actualTokens)}</td>
        <td>${Hr(u)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${Hr(c)}</p>
        <h2>Input</h2>
        <pre>${Hr(i)}</pre>
        <h2>Output</h2>
        <pre>${Hr(a)}</pre>
        <p>Time: estimated ${yh(n.estimateSeconds)} \xB7 actual ${yh(n.actualSeconds)} \xB7 ${Hr(d)}</p>
        <p>Tokens: estimated ${Sh(n.estimateTokens)} \xB7 actual ${Sh(n.actualTokens)} \xB7 ${Hr(u)}</p>
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
            ${rf({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${qZ}</script>`}
    </section>`}});var KU=l(()=>{"use strict";MU();qU()});var Li,KZ,JZ,nC,JU=l(()=>{"use strict";Li=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),KZ=(e,t,r)=>{let o=Li(t),n=Li(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},JZ=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Li(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>KZ(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Li(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Li(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Li(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},nC=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(JZ).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var XU=l(()=>{"use strict";JU()});var ud,YU,ZU,sC,iC,aC,QU=l(()=>{"use strict";ud=g(require("node:fs")),YU=g(require("node:path"));Vl();bg();ZU=(e,t,r)=>Ks({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,sC=(e,t,r)=>{let o=ZU(e,t,r);if(o===null)return[];if(!ud.default.existsSync(o))return[];let n=ud.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},iC=e=>{let t=ZU(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Cr(e.entry.prompt),output:Cr(e.entry.output)};ud.default.mkdirSync(YU.default.dirname(t),{recursive:!0}),ud.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},aC=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var XZ,YZ,pd,Ph,lC=l(()=>{"use strict";XZ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),YZ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,pd=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=XZ(i.assistantOutput),d=c.length>0?`Assistant: ${YZ(c,t)}`:null,u=[a,d].filter(m=>m!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},Ph=e=>{let t=e.userMessage.trim(),r=pd({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var dr,md,uC,ZZ,QZ,cC,eQ,pC,Ah,eB,tB,tQ,Ei,mC,dC,rB,rQ,oB,Ri,bh,gd,oQ,fd,gC,_h,wh,nB=l(()=>{"use strict";dr=g(require("node:fs")),md=g(require("node:path")),uC=require("node:crypto");lC();ZZ="writer-sessions",QZ="active-index.json",cC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eQ=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",pC=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},Ah=e=>{let t=md.default.join(e.installDir,ZZ);return dr.default.mkdirSync(t,{recursive:!0}),t},eB=e=>md.default.join(Ah(e),QZ),tB=(e,t)=>md.default.join(Ah(e),`${t}.canonical.json`),tQ=(e,t)=>md.default.join(Ah(e),`${t}.continuation.json`),Ei=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,mC=e=>{let t=eB(e);if(!dr.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(dr.default.readFileSync(t,"utf8"));if(!cC(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!cC(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!eQ(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},dC=(e,t)=>{dr.default.writeFileSync(eB(e),JSON.stringify(t,null,2))},rB=(e,t)=>{dr.default.writeFileSync(tB(e,t.sessionId),JSON.stringify(t,null,2))},rQ=(e,t)=>{dr.default.writeFileSync(tQ(e,t.sessionId),JSON.stringify(t,null,2))},oB=(e,t)=>{let r=pd({turns:t.turns});rQ(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Ri=(e,t)=>{let r=tB(e,t);if(!dr.default.existsSync(r))return null;try{let o=JSON.parse(dr.default.readFileSync(r,"utf8"));return!cC(o)||typeof o.sessionId!="string"?null:o}catch{return null}},bh=(e,t=20)=>{let r=Ah(e),o=dr.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Ri(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},gd=(e,t,r)=>{let o=pC(r);return mC(e).entries.find(i=>Ei(i)===Ei({writerAgent:t,projectFolderPath:o}))?.sessionId??null},oQ=(e,t,r,o)=>{let n=mC(e),s=Ei({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>Ei(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];dC(e,{entries:i})},fd=(e,t,r)=>{let o=(0,uC.randomUUID)(),n=new Date().toISOString(),s=pC(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return rB(e,i),oB(e,i),oQ(e,t,s,o),o},gC=(e,t,r)=>{let o=gd(e,t,r);return o!==null?o:fd(e,t,r)},_h=(e,t,r)=>{let o=pC(r),n=mC(e);if(o===null&&r===void 0){dC(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=Ei({writerAgent:t,projectFolderPath:o});dC(e,{entries:n.entries.filter(i=>Ei(i)!==s)})},wh=e=>{let t=gC(e.layout,e.writerAgent,e.projectFolderPath),r=Ri(e.layout,t);if(r===null)return;let o={id:(0,uC.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};rB(e.layout,n),oB(e.layout,n)}});var nQ,sQ,vh,fC,sB=l(()=>{"use strict";nQ=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",sQ=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},vh=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",fC=e=>{let t=vh(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=nQ(r,e.userPromptCharacterCount),n=sQ({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var Th=l(()=>{"use strict";QU();nB();lC();sB()});var iB=l(()=>{"use strict";em();Ls();qP()});var aB=l(()=>{"use strict";bP()});var rt,aQ,lQ,hC,yC,SC,lB=l(()=>{"use strict";iB();aB();rt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aQ=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},lQ=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=Qa(o);return`value="${rt(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${rt(r)}"`},hC=(e,t,r,o,n)=>{let s=tm[t];return`<label class="field">
          <span class="field-label">${rt(o)} API key \u2014 ${rt(aQ(e,t))} \xB7 <a class="field-link" href="${rt(s.href)}" target="_blank" rel="noopener noreferrer">${rt(s.label)}</a></span>
          <input class="input mono" type="password" name="${rt(r)}" autocomplete="off" ${lQ(e,t,n)} />
        </label>`},yC=(e,t,r,o)=>{let n=Vp(e[t]?.model),s=new Set(Gp[t].map(c=>c.value)),i=Gp[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${rt(c.value)}"${d}>${rt(c.label)}</option>`}).join(""),a=n!==sn&&!s.has(n)?`<option value="${rt(n)}" selected>${rt(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${rt(o)}</span>
          <select class="input mono" name="${rt(r)}">${i}${a}</select>
        </label>`},SC=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${rt(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${hC(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${yC(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${hC(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${yC(e.secrets,"openai","openaiModel","OpenAI model")}
        ${hC(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${yC(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var cB=l(()=>{"use strict";lB()});var Ch,dB,uB=l(()=>{"use strict";Ch=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dB=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${Ch(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${Ch(s.name)}</strong> <span class="muted mono">(${Ch(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${Ch(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var cQ,pB,mB,gB=l(()=>{"use strict";cQ=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,pB=e=>e.kind==="folder",mB=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&pB(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if(pB(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(cQ)};return r(t)}});var fB,PC,hB=l(()=>{"use strict";fB=g(require("node:path")),PC=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${PC(r.children,t)}</ul>
            </details>
          </li>`;let o=fB.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var yB,Ro,dQ,uQ,hd,pQ,AC,SB=l(()=>{"use strict";Cg();yB=g(require("node:path"));uB();gB();hB();Ro=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dQ=()=>`(() => {
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

})();`,uQ=()=>`(() => {
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
})();`,hd=e=>{let t=Yl({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=dB({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Ro(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ro(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':pQ(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Ro(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Ro(s)}" />
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
    <script>${dQ()}</script>
    <script>${uQ()}</script>`;return`${t}${r}${o}${c}${d}`},pQ=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=mB(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:yB.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),u=PC(d,Ro),m=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Ro(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Ro(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${u}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Ro(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},AC=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=a.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??u??a,S=t.sets[i];if(S===void 0)continue;let h=a.length>0?a:S.proposedSlug,y=m.length>0?m:S.proposedName,p=r.has(i),P=S.items.map(A=>({id:A.id,kind:A.kind,title:A.title,sourcePath:A.sourcePath,include:p}));s.push({slug:h,name:y,items:P})}return s}});var PB=l(()=>{"use strict";SB()});var mQ,bC,AB=l(()=>{"use strict";wr();mQ=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[Fe]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},bC=mQ});var gQ,bB,_B=l(()=>{"use strict";wr();gQ=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[Fe]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},bB=gQ});var wB=l(()=>{"use strict"});var qn,fQ,_C,vB=l(()=>{"use strict";Cg();sb();qn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fQ=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,_C=e=>{let t=e.flashError?`<div class="alert-error">${qn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${qn(e.flashMessage)}</div>`:"",r=Yl({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${qn(fQ(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${qn(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=Um(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${qn(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${qn(n.name)}</strong>
                  <span class="muted mono">${qn(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${u}${m}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var TB=l(()=>{"use strict";wB();Bm();vB()});var kh,CB=l(()=>{"use strict";kh=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var kB,Ft,wC=l(()=>{"use strict";kB=g(require("node:path"));ht();Le();B();le();GA();Ft=e=>{let t=$()?.layout.installDir??k();if(kB.default.basename(t)===Bt)return it;let r=$(),o=r!==null?Ee(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):it}});var vC,LB=l(()=>{"use strict";Xt();wC();vC=async e=>{let t=ze(e.installDir),r=t?.bundleVersion??null,o=Ft(t);try{let n=await bs(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Xo(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var TC,EB=l(()=>{"use strict";TC=e=>!e});var CC,xi,kC=l(()=>{"use strict";B();CC=()=>`http://127.0.0.1:${us()}/update/run`,xi=async e=>{try{let t=await fetch(CC(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var hQ,RB,LC,xB=l(()=>{"use strict";B();re();kC();hQ=()=>{hr({launchAgentLabel:fe(),installDir:k()})},RB=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},LC=async()=>{hQ();let e=await xi({force:!0});if(e.ok)return{ok:!0,message:RB(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:RB(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Xt(),$x)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var EC=l(()=>{"use strict";J_();CB();wC();LB();EB();xB();kC()});var WB,IB=l(()=>{"use strict";WB=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var OB,MB,RC,xC,NB=l(()=>{"use strict";OB=require("node:crypto"),MB=g(require("node:fs"));xt();le();le();IB();RC=!1,xC=async e=>{if(RC)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!WB(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&MB.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,OB.randomUUID)();RC=!0;try{if(await VA(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Rs({...r,workspace:n},e.writerAgent,t);return await bl(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{RC=!1}}});var DB=l(()=>{"use strict";NB()});var bt,yQ,jB,zB,WC,IC,OC,MC,NC,DC,jC=l(()=>{"use strict";bt=require("node:crypto"),yQ=Buffer.from("302a300506032b6570032100","hex"),jB=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},zB=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,bt.createPublicKey)({key:Buffer.concat([yQ,t]),format:"der",type:"spki"})},WC=()=>{let{publicKey:e,privateKey:t}=(0,bt.generateKeyPairSync)("ed25519");return{publicKeyRaw:jB(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},IC=e=>(0,bt.createPrivateKey)(e),OC=(e,t)=>(0,bt.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),MC=(e,t,r)=>{try{let o=zB(e);return(0,bt.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},NC=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,DC=()=>(0,bt.randomBytes)(32).toString("base64url")});var Fr,Lh,$B,SQ,PQ,Eh,zC,$C,HB=l(()=>{"use strict";Fr=g(require("node:fs")),Lh=g(require("node:path"));jC();B();Le();$B=e=>Lh.default.join(e.installDir,Yr),SQ=(e,t)=>{if(e.profileEmail===null||t===$B(e)||Fr.default.existsSync(t))return;let r=$B(e);Fr.default.existsSync(r)&&(Fr.default.mkdirSync(Lh.default.dirname(t),{recursive:!0}),Fr.default.renameSync(r,t))},PQ=e=>{if(!Fr.default.existsSync(e))return null;try{let t=Fr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Eh=e=>{let t=ca(e);SQ(e,t);let r=PQ(t);if(r!==null)return r;let o=WC();return Fr.default.mkdirSync(Lh.default.dirname(t),{recursive:!0}),Fr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},zC=e=>{let t=Eh(e.layout),r=DC(),o=NC({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=IC(t.privateKeyPem),s=OC(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},$C=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return MC(e.serverPublicKey,t,e.serverAttestation)}});var HC=l(()=>{"use strict";HB();jC()});var FB,UB,BB=l(()=>{"use strict";FB=g(require("node:path")),UB=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:FB.default.basename(e.installDir)})});var KB,yd,BC,GC,GB,AQ,FC,Rh,ge,JB,bQ,UC,_Q,wQ,VC,me,Te,mt,vQ,VB,qB,Sd,Pd,XB=l(()=>{"use strict";KB=g(require("node:http")),yd=g(require("node:fs")),BC=g(require("node:path"));xh();Ul();qM();JM();tN();on();v_();q_();LN();RN();I1();GT();XT();OU();KU();XU();Th();cB();PB();uo();xt();wr();AB();_B();TB();EC();Xt();DB();le();HC();BB();GC=e=>p_(e)??"never",GB=48e3,AQ=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,FC=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Rm(),reveal:t.reveal,installed:tr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Rh=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:po(t,e)},ge=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),JB=200,bQ=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',UC=e=>{let t=e.trim().slice(0,JB),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},_Q=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ge(t)}</div>`,wQ=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ge(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',VC={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},me=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...VC}),e.end(JSON.stringify(r))},Te=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},mt=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},vQ=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=bQ(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${ge(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=TC(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Bl(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ge(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ge(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ge(GC(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ge(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},VB=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},qB=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,JB)},Sd=e=>{let t=BC.default.join(e.layout.installDir,"link-code.txt"),r=()=>ze(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:kh(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),p=await i(),P=Q_(p),A=h.updateFlash??null,f=ew(A),b=_Q(A,h.updateError??null);return Y_({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:Ft(y),installBundleVersionLabel:kh(y),prependBody:`${f}${b}${P}`,headerUpdateButtonHtml:Z_(p)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await vC(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:UC("An update is already running.")}),h.end();return}c=!0;try{let p=await LC(),P=p.ok?"/?update=ok":UC(p.message);h.writeHead(303,{Location:P}),h.end()}catch(p){let P=p instanceof Error&&p.message.trim().length>0?p.message:"Install bundle update failed.";h.writeHead(303,{Location:UC(P)}),h.end()}finally{c=!1,a()}},u=async(h,y)=>{let p=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",P=o(),A=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:P.installVersion,body:`<section class="card">
      <h1>${ge(y)}</h1>
      <p>${ge(p)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(A)},m=()=>{if(yd.default.existsSync(t))return yd.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return yd.default.writeFileSync(t,h,"utf8"),h},S=KB.default.createServer((h,y)=>{(async()=>{let p=h.url?.split("?")[0]??"/",P=h.method??"GET";if(P==="OPTIONS"){y.writeHead(204,VC),y.end();return}if(!await yT({method:P,pathname:p,request:h,response:y,requestUrl:h.url??"/",storePath:IU(BC.default.dirname(e.layout.configPath)),readBody:mt,sendHtml:Te,renderShell:n})&&!await BT({method:P,pathname:p,request:h,response:y,layout:e.layout,readBody:mt,sendJson:me})&&!await mh({method:P,pathname:p,request:h,response:y,layout:e.layout,readBody:mt,sendJson:me})){if(P==="GET"&&p==="/health"){let A=e.controllers.getStatus(),f=o();me(y,200,{ok:!0,...A,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt,...UB({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(P==="GET"&&p==="/api/status"){let A=o();me(y,200,{...e.controllers.getStatus(),linkCode:m(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt});return}if(P==="GET"&&p==="/api/traffic"){me(y,200,{entries:Hl(e.layout)});return}if(P==="DELETE"&&p==="/api/traffic"||P==="POST"&&p==="/api/traffic/clear"){if(f_(e.layout),P==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}me(y,200,{ok:!0});return}if(P==="GET"&&p==="/api/trace"){me(y,200,{entries:yg(e.layout)});return}if(P==="DELETE"&&p==="/api/trace"||P==="POST"&&p==="/api/trace/clear"){if(S_(e.layout),P==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}me(y,200,{ok:!0});return}if(P==="POST"&&p==="/api/errors/clear"){P_(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(P==="GET"&&p==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let b=await Xs({layout:e.layout,query:f,limit:20});me(y,200,{chunks:b,query:f});return}me(y,200,{chunks:Js(e.layout).slice(-50).reverse()});return}if(P==="POST"&&p==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(P==="GET"&&p==="/api/update-status"){let A=await i();me(y,200,{ok:!0,...A});return}if((P==="GET"||P==="POST")&&p==="/api/update"){await d(y);return}if(P==="GET"&&p==="/"){let A=e.controllers.getStatus(),f=o(),b=tr(e.layout),w=Sg(e.layout.errorLogPath);Te(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:VB(h.url??void 0),updateError:qB(h.url??void 0),body:tw({wsConnected:A.wsConnected,lastHeartbeatAt:A.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:b.sets.length,knowledgeChunkCount:Js(e.layout).length,trafficEntryCount:Hl(e.layout).length,wakeError:A.wakeError,errorLogByteSize:w.byteSize,errorLogExists:w.exists})}));return}if(P==="GET"&&p==="/task"){let A=e.controllers.getStatus(),f=o(),b=$(),w=new URL(h.url??"/",`http://127.0.0.1:${43347}`),T=w.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,C=w.searchParams.get("failed")==="1"?w.searchParams.get("error")?.trim()??"Task failed.":null,L=w.searchParams.get("runId");Te(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:YT({defaultWorkspace:b?.workspace??"",wsConnected:A.wsConnected,flashMessage:T,flashError:C,lastRunId:L})}));return}if(P==="POST"&&p==="/task/dispatch"){let A=await mt(h),f=new URLSearchParams(A),b=f.get("prompt")?.trim()??"",w=f.get("writerAgent")?.trim()??"claude-cli",T=f.get("projectFolder")?.trim()??"",C=await xC({prompt:b,writerAgent:w,...T.length>0?{projectFolderPath:T}:{}}),L=new URLSearchParams;C.ok?L.set("ok","1"):(L.set("failed","1"),C.errorMessage!==void 0&&L.set("error",C.errorMessage.slice(0,240))),C.agentRunId!==void 0&&L.set("runId",C.agentRunId),y.writeHead(303,{Location:`/task?${L.toString()}`}),y.end();return}if(P==="GET"&&p==="/writer-sessions"){let A=o(),f=bh(e.layout,12);Te(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:A.installVersion,updateFlash:VB(h.url??void 0),updateError:qB(h.url??void 0),body:nC({sessions:f})}));return}if(P==="GET"&&p==="/errors"){let A=o(),f=Sg(e.layout.errorLogPath);Te(y,await n({title:"Errors",activePath:"/errors",installVersion:A.installVersion,body:b_({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(P==="GET"&&p==="/status"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),b=Se(e.layout),w=b!==null?Re(b,12e4):T_(f.lastHeartbeatAt,12e4),T=C_({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:w}),C=o();Te(y,await n({title:"Status",activePath:"/status",installVersion:C.installVersion,body:`${vQ({status:f,healthBadge:T,revived:A.searchParams.get("revived")==="1",linkCode:m(),installBundleVersion:C.installBundleVersion,installBundleUpdatedAt:C.installBundleUpdatedAt})}${E_({installDir:e.layout.installDir})}${L_({entries:yg(e.layout)})}`}));return}if(P==="GET"&&p==="/traffic"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=Hl(e.layout),b=o(),w=f.map(L=>`<tr><td title="${ge(L.at)}">${ge(GC(L.at))}</td><td>${ge(L.direction)}</td><td><code>${ge(L.type)}</code></td><td>${ge(L.summary)}</td><td>${ge(L.action??"")}</td></tr>`).join(""),T=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${w}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',C=A.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Te(y,await n({title:"Traffic",activePath:"/traffic",installVersion:b.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${C}
              ${T}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(P==="GET"&&p==="/projects"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),b=Ft(f.installVersion),w=await Rh(e.layout),T=A.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":A.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,C=A.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,L=$(),x=L===null?null:Y({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),I=x===null?{}:Object.fromEntries((await Promise.all(w.projects.map(async N=>{let U=await bC(x,N.id);return[N.id,U?.counts??null]}))).filter(N=>N[1]!==null));Te(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:_C({projects:w.projects,compositionCountsByProjectId:I,cloudAppOrigin:b,syncMessage:w.message,syncOk:w.ok,flashMessage:C,flashError:T})}));return}if(P==="GET"&&p==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",b=$(),w=b===null?null:Y({wsUrl:b.wsUrl,pairingToken:b.pairingToken}),T=f.length>0&&w!==null?fo():null;if(T===null||w===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(qe({projectFolderPath:T}),!await Tl(w,f,T)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(P==="POST"&&p==="/projects/delete"){let A=await mt(h),f=new URLSearchParams(A).get("projectId")?.trim()??"",b=$(),w=b===null?null:Y({wsUrl:b.wsUrl,pairingToken:b.pairingToken});if(w===null||f.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let T=await fb(w,f);y.writeHead(303,{Location:T.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(P==="GET"&&p==="/project"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=A.searchParams.get("id")?.trim()??"",b=o(),w=Ft(b.installVersion),T=await Rh(e.layout),C=vr(T.projects,f);if(C===null){await u(y,"Project not found");return}let L=A.searchParams.get("linked")==="1"?A.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${A.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${A.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:A.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,x=A.searchParams.get("knowledgePromoted"),I=x!==null?`Marked ${x} lesson(s) as promoted in Agent Witch.`:null,N=A.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,U=A.searchParams.get("tab")?.trim()??"harness",V=U==="workflows"||U==="agents"||U==="knowledge"?U:"harness",q=$(),Xe=q===null?null:Y({wsUrl:q.wsUrl,pairingToken:q.pairingToken}),H=Xe===null?null:await bC(Xe,C.id),ke=0;if(Xe!==null)try{let Xr=await fetch(`${Xe.appOrigin}/api/agent-witch/projects/${encodeURIComponent(C.id)}/knowledge`,{method:"GET",headers:{[Fe]:Xe.pairingToken},signal:AbortSignal.timeout(1e4)});if(Xr.ok){let mr=await Xr.json();typeof mr=="object"&&mr!==null&&typeof mr.candidateCount=="number"&&(ke=mr.candidateCount)}}catch{ke=0}Te(y,await n({title:C.name,activePath:"/projects",installVersion:b.installVersion,body:mo({project:C,cloudAppOrigin:w,installed:tr(e.layout),linkedSetSlugs:Qt(C.projectFolderPath),composition:H,knowledgeCandidateCount:ke,activeTab:V,flashMessage:L??I,flashError:N})}));return}if(P==="POST"&&p==="/projects/pull-bound-harness"){let A=await mt(h),f=await ib({rawBody:A,layout:e.layout});if(f.kind==="not_found"){await u(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let b=o();Te(y,await n({title:f.title,activePath:"/projects",installVersion:b.installVersion,body:f.body}));return}if(P==="POST"&&p==="/projects/link-harness"){let A=await mt(h),f=new URLSearchParams(A),b=f.get("projectId")?.trim()??"",w=await Rh(e.layout),T=vr(w.projects,b);if(T===null){await u(y,"Project not found");return}let C=f.getAll("applySet").map(V=>String(V)),L=pl({layout:e.layout,projectFolderPath:T.projectFolderPath,setSlugs:C});if(!L.ok){let V=o(),q=Ft(V.installVersion);Te(y,await n({title:T.name,activePath:"/projects",installVersion:V.installVersion,body:mo({project:T,cloudAppOrigin:q,installed:tr(e.layout),linkedSetSlugs:Qt(T.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:L.errorMessage})}));return}let x=$(),I=x===null?null:Y({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),N=I===null?!1:await gn(I,T.id,L.appliedSetSlugs),U=new URLSearchParams({linked:"1",files:String(L.writtenFileCount),bindingsSynced:N?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(T.id)}&${U.toString()}`}),y.end();return}if(P==="POST"&&p==="/projects/remove-harness-set"){let A=await mt(h),f=await ab({rawBody:A,layout:e.layout});if(f.kind==="not_found"){await u(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let b=o();Te(y,await n({title:f.title,activePath:"/projects",installVersion:b.installVersion,body:f.body}));return}if(P==="POST"&&p==="/project/knowledge/promote-all"){let A=await mt(h),b=new URLSearchParams(A).get("projectId")?.trim()??"",w=await Rh(e.layout),T=vr(w.projects,b);if(T===null){await u(y,"Project not found");return}let C=$(),L=C===null?null:Y({wsUrl:C.wsUrl,pairingToken:C.pairingToken}),x=L===null?{ok:!1,promotedCount:0}:await bB(L,T.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(T.id)}&${I.toString()}`}),y.end();return}if(P==="GET"&&p==="/harness"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),b=hl(e.layout),w=A.searchParams.get("submitted")==="1",T=w?A.searchParams.get("syncFailed")==="1"?`Local harness updated (${A.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:A.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${A.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":A.searchParams.get("stopped")==="1"?`Reveal stopped. ${b?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:A.searchParams.get("revealed")==="1"?`Reveal found ${b?.sets.length??0} set(s).`:null,C=b?.scanRoots[0]??Rm(),L=AQ(e.layout,{reveal:b,importQuery:A.searchParams.get("import")==="1",justSubmitted:w}),x=Ft(f.installVersion);Te(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:hd(FC(e.layout,{cloudAppOrigin:x,reveal:b,scanFolder:C,flashMessage:T,importSectionExpanded:L}))}));return}if(P==="POST"&&p==="/api/harness/pick-folder"){let A=fo();if(A===null){me(y,200,{cancelled:!0});return}me(y,200,{path:A});return}if(P==="GET"&&p==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",b=ul(f);if(b===null){me(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let w=yd.default.readFileSync(b,"utf8"),T=w.length>GB?`${w.slice(0,GB)}
\u2026 (truncated)`:w;me(y,200,{content:T})}catch{me(y,500,{errorMessage:"Could not read file."})}return}if(P==="POST"&&p==="/api/harness/reveal/add-project"){let A=await mt(h),f="";try{let T=JSON.parse(A);typeof T=="object"&&T!==null&&typeof T.projectPath=="string"&&(f=T.projectPath.trim())}catch{me(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){me(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let b=hl(e.layout),w=MA({reveal:b,projectPath:f});if(w===null||w.sets.length===0){me(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Om(e.layout,w),me(y,200,{ok:!0,setCount:w.sets.length});return}if(P==="GET"&&p==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){me(y,400,{errorMessage:"Choose a folder to scan first."});return}let b=!1;h.on("close",()=>{b=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...VC});let w=NA({scanRoot:f,response:y,shouldAbort:()=>b});Om(e.layout,w),y.end();return}if(P==="POST"&&p==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(P==="POST"&&p==="/harness/submit"){let A=hl(e.layout);if(A===null){let x=o(),I=Ft(x.installVersion);Te(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:hd(FC(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await mt(h),b=new URLSearchParams(f),w=AC(b,A),T=jA({layout:e.layout,sets:w});if(!T.ok){let x=o(),I=Ft(x.installVersion);Te(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:hd(FC(e.layout,{cloudAppOrigin:I,reveal:A,flashError:T.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}$A(e.layout);let L=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${T.writtenItemCount??0}${L}`}),y.end();return}if(P==="GET"&&p==="/writer-api"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),b=$()?.writerExecutionBackend??$e(void 0),w=We(e.layout.configPath),T=no(w),C=A.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,L=o();Te(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:L.installVersion,body:SC({writerExecutionBackend:b,secrets:T,flashMessage:C})}));return}if(P==="POST"&&p==="/writer-api"){let A=await mt(h),f=new URLSearchParams(A),b=f.get("writerExecutionBackend")?.trim()??"cli";VP({configPath:e.layout.configPath,writerExecutionBackend:$e(b),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(P==="GET"&&p==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(P==="GET"&&p==="/history"){let A=o();Te(y,await n({title:"History",activePath:"/history",installVersion:A.installVersion,body:oC({reportsDir:e.layout.reportsDir})}));return}if(P==="GET"&&p==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",b=o(),w=M_({layout:e.layout}),T=j_(w),C=f.length>0?await Xs({layout:e.layout,query:f,limit:20}):Js(e.layout).slice(-50).reverse(),L=C.map(I=>{let N=D_(w,I.id),U=N>0?` \xB7 used in ${N} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ge(I.createdAt)}">${ge(GC(I.createdAt))}${I.source?` \xB7 ${ge(I.source)}`:""}${U}</div><pre>${ge(I.text)}</pre></article>`}).join(""),x=T.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${T.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ge(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Te(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:b.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ge(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${wQ(f,C.length)}
            </section>${x}${L}`}));return}P==="POST"&&await mt(h),await u(y,"Not found")}})().catch(p=>{console.error("[agent-witch-local-app]",p),y.writeHead(500),y.end("Internal error")})});return S.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),S.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Sr}`)}),S},Pd=e=>Eh(e).publicKeyRaw});var xh=l(()=>{"use strict";xM();WM();XB()});var ZB={};ft(ZB,{runAgentWitchExternalLiveCli:()=>CQ});var qC,YB,TQ,CQ,QB=l(()=>{"use strict";qC=g(require("node:fs")),YB=g(require("node:path"));on();B();re();xh();re();TQ=e=>{let t=YB.default.join(e,"link-code.txt");if(!qC.default.existsSync(t))return null;let r=qC.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},CQ=()=>{nt("agent-witch-live");let e=k(),t=O(),r=TQ(e),o=Pd(t);Sd({layout:t,controllers:{getStatus:()=>{let n=Se(t);return{wsConnected:Ha(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{Go(e)}}})}});var Ur=v((vHe,rG)=>{"use strict";var eG=["nodebuffer","arraybuffer","fragments"],tG=typeof Blob<"u";tG&&eG.push("blob");rG.exports={BINARY_TYPES:eG,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:tG,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Ad=v((THe,Wh)=>{"use strict";var{EMPTY_BUFFER:kQ}=Ur(),KC=Buffer[Symbol.species];function LQ(e,t){if(e.length===0)return kQ;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new KC(r.buffer,r.byteOffset,o):r}function oG(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function nG(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function EQ(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function JC(e){if(JC.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new KC(e):ArrayBuffer.isView(e)?t=new KC(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),JC.readOnly=!1),t}Wh.exports={concat:LQ,mask:oG,toArrayBuffer:EQ,toBuffer:JC,unmask:nG};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Wh.exports.mask=function(t,r,o,n,s){s<48?oG(t,r,o,n,s):e.mask(t,r,o,n,s)},Wh.exports.unmask=function(t,r){t.length<32?nG(t,r):e.unmask(t,r)}}catch{}});var aG=v((CHe,iG)=>{"use strict";var sG=Symbol("kDone"),XC=Symbol("kRun"),YC=class{constructor(t){this[sG]=()=>{this.pending--,this[XC]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[XC]()}[XC](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[sG])}}};iG.exports=YC});var Oi=v((kHe,uG)=>{"use strict";var bd=require("zlib"),lG=Ad(),RQ=aG(),{kStatusCode:cG}=Ur(),xQ=Buffer[Symbol.species],WQ=Buffer.from([0,0,255,255]),Oh=Symbol("permessage-deflate"),Br=Symbol("total-length"),Wi=Symbol("callback"),xo=Symbol("buffers"),Ii=Symbol("error"),Ih,ZC=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Ih){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Ih=new RQ(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Wi];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){Ih.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){Ih.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?bd.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=bd.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Oh]=this,this._inflate[Br]=0,this._inflate[xo]=[],this._inflate.on("error",OQ),this._inflate.on("data",dG)}this._inflate[Wi]=o,this._inflate.write(t),r&&this._inflate.write(WQ),this._inflate.flush(()=>{let s=this._inflate[Ii];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=lG.concat(this._inflate[xo],this._inflate[Br]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Br]=0,this._inflate[xo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?bd.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=bd.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Br]=0,this._deflate[xo]=[],this._deflate.on("data",IQ)}this._deflate[Wi]=o,this._deflate.write(t),this._deflate.flush(bd.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=lG.concat(this._deflate[xo],this._deflate[Br]);r&&(s=new xQ(s.buffer,s.byteOffset,s.length-4)),this._deflate[Wi]=null,this._deflate[Br]=0,this._deflate[xo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};uG.exports=ZC;function IQ(e){this[xo].push(e),this[Br]+=e.length}function dG(e){if(this[Br]+=e.length,this[Oh]._maxPayload<1||this[Br]<=this[Oh]._maxPayload){this[xo].push(e);return}this[Ii]=new RangeError("Max payload size exceeded"),this[Ii].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Ii][cG]=1009,this.removeListener("data",dG),this.reset()}function OQ(e){if(this[Oh]._inflate=null,this[Ii]){this[Wi](this[Ii]);return}e[cG]=1007,this[Wi](e)}});var Mi=v((LHe,Mh)=>{"use strict";var{isUtf8:pG}=require("buffer"),{hasBlob:MQ}=Ur(),NQ=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function DQ(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function QC(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function jQ(e){return MQ&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Mh.exports={isBlob:jQ,isValidStatusCode:DQ,isValidUTF8:QC,tokenChars:NQ};if(pG)Mh.exports.isValidUTF8=function(e){return e.length<24?QC(e):pG(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Mh.exports.isValidUTF8=function(t){return t.length<32?QC(t):e(t)}}catch{}});var nk=v((EHe,PG)=>{"use strict";var{Writable:zQ}=require("stream"),mG=Oi(),{BINARY_TYPES:$Q,EMPTY_BUFFER:gG,kStatusCode:HQ,kWebSocket:FQ}=Ur(),{concat:ek,toArrayBuffer:UQ,unmask:BQ}=Ad(),{isValidStatusCode:GQ,isValidUTF8:fG}=Mi(),Nh=Buffer[Symbol.species],_t=0,hG=1,yG=2,SG=3,tk=4,rk=5,Dh=6,ok=class extends zQ{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||$Q[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[FQ]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=_t}_write(t,r,o){if(this._opcode===8&&this._state==_t)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new Nh(o.buffer,o.byteOffset+t,o.length-t),new Nh(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new Nh(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case _t:this.getInfo(t);break;case hG:this.getPayloadLength16(t);break;case yG:this.getPayloadLength64(t);break;case SG:this.getMask();break;case tk:this.getData(t);break;case rk:case Dh:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[mG.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=hG:this._payloadLength===127?this._state=yG:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=SG:this._state=tk}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=tk}getData(t){let r=gG;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&BQ(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=rk,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[mG.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===_t&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=_t;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=ek(o,r):this._binaryType==="arraybuffer"?n=UQ(ek(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=_t):(this._state=Dh,setImmediate(()=>{this.emit("message",n,!0),this._state=_t,this.startLoop(t)}))}else{let n=ek(o,r);if(!this._skipUTF8Validation&&!fG(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===rk||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=_t):(this._state=Dh,setImmediate(()=>{this.emit("message",n,!1),this._state=_t,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,gG),this.end();else{let o=t.readUInt16BE(0);if(!GQ(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new Nh(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!fG(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=_t;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=_t):(this._state=Dh,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=_t,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[HQ]=n,i}};PG.exports=ok});var ak=v((xHe,_G)=>{"use strict";var{Duplex:RHe}=require("stream"),{randomFillSync:VQ}=require("crypto"),{types:{isUint8Array:qQ}}=require("util"),AG=Oi(),{EMPTY_BUFFER:KQ,kWebSocket:JQ,NOOP:XQ}=Ur(),{isBlob:Ni,isValidStatusCode:YQ}=Mi(),{mask:bG,toBuffer:Kn}=Ad(),wt=Symbol("kByteLength"),ZQ=Buffer.alloc(4),jh=8*1024,Jn,Di=jh,Ut=0,QQ=1,eee=2,sk=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Ut,this.onerror=XQ,this[JQ]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||ZQ,r.generateMask?r.generateMask(o):(Di===jh&&(Jn===void 0&&(Jn=Buffer.alloc(jh)),VQ(Jn,0,jh),Di=0),o[0]=Jn[Di++],o[1]=Jn[Di++],o[2]=Jn[Di++],o[3]=Jn[Di++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[wt]!==void 0?a=r[wt]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(bG(t,o,d,s,a),[d]):(bG(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=KQ;else{if(typeof t!="number"||!YQ(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(qQ(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[wt]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Ut?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Ni(t)?(n=t.size,s=!1):(t=Kn(t),n=t.length,s=Kn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[wt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Ni(t)?this._state!==Ut?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Ut?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Ni(t)?(n=t.size,s=!1):(t=Kn(t),n=t.length,s=Kn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[wt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Ni(t)?this._state!==Ut?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Ut?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[AG.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Ni(t)?(a=t.size,c=!1):(t=Kn(t),a=t.length,c=Kn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[wt]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Ni(t)?this._state!==Ut?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Ut?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[wt],this._state=eee,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(ik,this,a,n);return}this._bufferedBytes-=o[wt];let i=Kn(s);r?this.dispatch(i,r,o,n):(this._state=Ut,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(tee,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[AG.extensionName];this._bufferedBytes+=o[wt],this._state=QQ,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");ik(this,c,n);return}this._bufferedBytes-=o[wt],this._state=Ut,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Ut&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][wt],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][wt],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};_G.exports=sk;function ik(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function tee(e,t,r){ik(e,t,r),e.onerror(t)}});var xG=v((WHe,RG)=>{"use strict";var{kForOnEventAttribute:_d,kListener:lk}=Ur(),wG=Symbol("kCode"),vG=Symbol("kData"),TG=Symbol("kError"),CG=Symbol("kMessage"),kG=Symbol("kReason"),ji=Symbol("kTarget"),LG=Symbol("kType"),EG=Symbol("kWasClean"),Gr=class{constructor(t){this[ji]=null,this[LG]=t}get target(){return this[ji]}get type(){return this[LG]}};Object.defineProperty(Gr.prototype,"target",{enumerable:!0});Object.defineProperty(Gr.prototype,"type",{enumerable:!0});var Xn=class extends Gr{constructor(t,r={}){super(t),this[wG]=r.code===void 0?0:r.code,this[kG]=r.reason===void 0?"":r.reason,this[EG]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[wG]}get reason(){return this[kG]}get wasClean(){return this[EG]}};Object.defineProperty(Xn.prototype,"code",{enumerable:!0});Object.defineProperty(Xn.prototype,"reason",{enumerable:!0});Object.defineProperty(Xn.prototype,"wasClean",{enumerable:!0});var zi=class extends Gr{constructor(t,r={}){super(t),this[TG]=r.error===void 0?null:r.error,this[CG]=r.message===void 0?"":r.message}get error(){return this[TG]}get message(){return this[CG]}};Object.defineProperty(zi.prototype,"error",{enumerable:!0});Object.defineProperty(zi.prototype,"message",{enumerable:!0});var wd=class extends Gr{constructor(t,r={}){super(t),this[vG]=r.data===void 0?null:r.data}get data(){return this[vG]}};Object.defineProperty(wd.prototype,"data",{enumerable:!0});var ree={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[_d]&&n[lk]===t&&!n[_d])return;let o;if(e==="message")o=function(s,i){let a=new wd("message",{data:i?s:s.toString()});a[ji]=this,zh(t,this,a)};else if(e==="close")o=function(s,i){let a=new Xn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[ji]=this,zh(t,this,a)};else if(e==="error")o=function(s){let i=new zi("error",{error:s,message:s.message});i[ji]=this,zh(t,this,i)};else if(e==="open")o=function(){let s=new Gr("open");s[ji]=this,zh(t,this,s)};else return;o[_d]=!!r[_d],o[lk]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[lk]===t&&!r[_d]){this.removeListener(e,r);break}}};RG.exports={CloseEvent:Xn,ErrorEvent:zi,Event:Gr,EventTarget:ree,MessageEvent:wd};function zh(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var $h=v((IHe,WG)=>{"use strict";var{tokenChars:vd}=Mi();function ur(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function oee(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,u=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(u===-1&&vd[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let h=e.slice(c,u);d===44?(ur(t,h,r),r=Object.create(null)):i=h,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(u===-1&&vd[d]===1)c===-1&&(c=m);else if(d===32||d===9)u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m),ur(r,e.slice(c,u),!0),d===44&&(ur(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)a=e.slice(c,m),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(vd[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(vd[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,u=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(u===-1&&vd[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))u===-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let h=e.slice(c,u);o&&(h=h.replace(/\\/g,""),o=!1),ur(r,a,h),d===44&&(ur(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=m);let S=e.slice(c,u);return i===void 0?ur(t,S,r):(a===void 0?ur(r,S,!0):o?ur(r,a,S.replace(/\\/g,"")):ur(r,a,S),ur(t,i,r)),t}function nee(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}WG.exports={format:nee,parse:oee}});var Bh=v((NHe,BG)=>{"use strict";var see=require("events"),iee=require("https"),aee=require("http"),MG=require("net"),lee=require("tls"),{randomBytes:cee,createHash:dee}=require("crypto"),{Duplex:OHe,Readable:MHe}=require("stream"),{URL:ck}=require("url"),Wo=Oi(),uee=nk(),pee=ak(),{isBlob:mee}=Mi(),{BINARY_TYPES:IG,CLOSE_TIMEOUT:gee,EMPTY_BUFFER:Hh,GUID:fee,kForOnEventAttribute:dk,kListener:hee,kStatusCode:yee,kWebSocket:Ce,NOOP:NG}=Ur(),{EventTarget:{addEventListener:See,removeEventListener:Pee}}=xG(),{format:Aee,parse:bee}=$h(),{toBuffer:_ee}=Ad(),DG=Symbol("kAborted"),uk=[8,13],Vr=["CONNECTING","OPEN","CLOSING","CLOSED"],wee=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,ee=class e extends see{constructor(t,r,o){super(),this._binaryType=IG[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Hh,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),jG(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){IG.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new uee({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new pee(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[Ce]=this,s[Ce]=this,t[Ce]=this,n.on("conclude",Cee),n.on("drain",kee),n.on("error",Lee),n.on("message",Eee),n.on("ping",Ree),n.on("pong",xee),s.onerror=Wee,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",HG),t.on("data",Uh),t.on("end",FG),t.on("error",UG),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Wo.extensionName]&&this._extensions[Wo.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){gt(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,$G(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){pk(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Hh,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){pk(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Hh,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){pk(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Wo.extensionName]||(n.compress=!1),this._sender.send(t||Hh,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){gt(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(ee,"CONNECTING",{enumerable:!0,value:Vr.indexOf("CONNECTING")});Object.defineProperty(ee.prototype,"CONNECTING",{enumerable:!0,value:Vr.indexOf("CONNECTING")});Object.defineProperty(ee,"OPEN",{enumerable:!0,value:Vr.indexOf("OPEN")});Object.defineProperty(ee.prototype,"OPEN",{enumerable:!0,value:Vr.indexOf("OPEN")});Object.defineProperty(ee,"CLOSING",{enumerable:!0,value:Vr.indexOf("CLOSING")});Object.defineProperty(ee.prototype,"CLOSING",{enumerable:!0,value:Vr.indexOf("CLOSING")});Object.defineProperty(ee,"CLOSED",{enumerable:!0,value:Vr.indexOf("CLOSED")});Object.defineProperty(ee.prototype,"CLOSED",{enumerable:!0,value:Vr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(ee.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(ee.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[dk])return t[hee];return null},set(t){for(let r of this.listeners(e))if(r[dk]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[dk]:!0})}})});ee.prototype.addEventListener=See;ee.prototype.removeEventListener=Pee;BG.exports=ee;function jG(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:gee,protocolVersion:uk[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!uk.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${uk.join(", ")})`);let s;if(t instanceof ck)s=t;else try{s=new ck(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let p=new SyntaxError(c);if(e._redirects===0)throw p;Fh(e,p);return}let d=i?443:80,u=cee(16).toString("base64"),m=i?iee.request:aee.request,S=new Set,h;if(n.createConnection=n.createConnection||(i?Tee:vee),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new Wo({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=Aee({[Wo.extensionName]:h.offer()})),r.length){for(let p of r){if(typeof p!="string"||!wee.test(p)||S.has(p))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(p)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let p=n.path.split(":");n.socketPath=p[0],n.path=p[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let p=o&&o.headers;if(o={...o,headers:{}},p)for(let[P,A]of Object.entries(p))o.headers[P.toLowerCase()]=A}else if(e.listenerCount("redirect")===0){let p=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!p||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,p||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=m(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=m(n);n.timeout&&y.on("timeout",()=>{gt(e,y,"Opening handshake has timed out")}),y.on("error",p=>{y===null||y[DG]||(y=e._req=null,Fh(e,p))}),y.on("response",p=>{let P=p.headers.location,A=p.statusCode;if(P&&n.followRedirects&&A>=300&&A<400){if(++e._redirects>n.maxRedirects){gt(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new ck(P,t)}catch{let w=new SyntaxError(`Invalid URL: ${P}`);Fh(e,w);return}jG(e,f,r,o)}else e.emit("unexpected-response",y,p)||gt(e,y,`Unexpected server response: ${p.statusCode}`)}),y.on("upgrade",(p,P,A)=>{if(e.emit("upgrade",p),e.readyState!==ee.CONNECTING)return;y=e._req=null;let f=p.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){gt(e,P,"Invalid Upgrade header");return}let b=dee("sha1").update(u+fee).digest("base64");if(p.headers["sec-websocket-accept"]!==b){gt(e,P,"Invalid Sec-WebSocket-Accept header");return}let w=p.headers["sec-websocket-protocol"],T;if(w!==void 0?S.size?S.has(w)||(T="Server sent an invalid subprotocol"):T="Server sent a subprotocol but none was requested":S.size&&(T="Server sent no subprotocol"),T){gt(e,P,T);return}w&&(e._protocol=w);let C=p.headers["sec-websocket-extensions"];if(C!==void 0){if(!h){gt(e,P,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let L;try{L=bee(C)}catch{gt(e,P,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(L);if(x.length!==1||x[0]!==Wo.extensionName){gt(e,P,"Server indicated an extension that was not requested");return}try{h.accept(L[Wo.extensionName])}catch{gt(e,P,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Wo.extensionName]=h}e.setSocket(P,A,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Fh(e,t){e._readyState=ee.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function vee(e){return e.path=e.socketPath,MG.connect(e)}function Tee(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=MG.isIP(e.host)?"":e.host),lee.connect(e)}function gt(e,t,r){e._readyState=ee.CLOSING;let o=new Error(r);Error.captureStackTrace(o,gt),t.setHeader?(t[DG]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Fh,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function pk(e,t,r){if(t){let o=mee(t)?t.size:_ee(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Vr[e.readyState]})`);process.nextTick(r,o)}}function Cee(e,t){let r=this[Ce];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[Ce]!==void 0&&(r._socket.removeListener("data",Uh),process.nextTick(zG,r._socket),e===1005?r.close():r.close(e,t))}function kee(){let e=this[Ce];e.isPaused||e._socket.resume()}function Lee(e){let t=this[Ce];t._socket[Ce]!==void 0&&(t._socket.removeListener("data",Uh),process.nextTick(zG,t._socket),t.close(e[yee])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function OG(){this[Ce].emitClose()}function Eee(e,t){this[Ce].emit("message",e,t)}function Ree(e){let t=this[Ce];t._autoPong&&t.pong(e,!this._isServer,NG),t.emit("ping",e)}function xee(e){this[Ce].emit("pong",e)}function zG(e){e.resume()}function Wee(e){let t=this[Ce];t.readyState!==ee.CLOSED&&(t.readyState===ee.OPEN&&(t._readyState=ee.CLOSING,$G(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function $G(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function HG(){let e=this[Ce];if(this.removeListener("close",HG),this.removeListener("data",Uh),this.removeListener("end",FG),e._readyState=ee.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[Ce]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",OG),e._receiver.on("finish",OG))}function Uh(e){this[Ce]._receiver.write(e)||this.pause()}function FG(){let e=this[Ce];e._readyState=ee.CLOSING,e._receiver.end(),this.end()}function UG(){let e=this[Ce];this.removeListener("error",UG),this.on("error",NG),e&&(e._readyState=ee.CLOSING,this.destroy())}});var KG=v((jHe,qG)=>{"use strict";var DHe=Bh(),{Duplex:Iee}=require("stream");function GG(e){e.emit("close")}function Oee(){!this.destroyed&&this._writableState.finished&&this.destroy()}function VG(e){this.removeListener("error",VG),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function Mee(e,t){let r=!0,o=new Iee({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(GG,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(GG,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",Oee),o.on("error",VG),o}qG.exports=Mee});var mk=v((zHe,JG)=>{"use strict";var{tokenChars:Nee}=Mi();function Dee(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&Nee[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}JG.exports={parse:Dee}});var r2=v((HHe,t2)=>{"use strict";var jee=require("events"),Gh=require("http"),{Duplex:$He}=require("stream"),{createHash:zee}=require("crypto"),XG=$h(),Yn=Oi(),$ee=mk(),Hee=Bh(),{CLOSE_TIMEOUT:Fee,GUID:Uee,kWebSocket:Bee}=Ur(),Gee=/^[+/0-9A-Za-z]{22}==$/,YG=0,ZG=1,e2=2,gk=class extends jee{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:Fee,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:Hee,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Gh.createServer((o,n)=>{let s=Gh.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=Vee(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=YG}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===e2){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Td,this);return}if(t&&this.once("close",t),this._state!==ZG)if(this._state=ZG,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Td,this):process.nextTick(Td,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Td(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",QG);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Zn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Zn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!Gee.test(s)){Zn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Zn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Cd(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=$ee.parse(c)}catch{Zn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&u!==void 0){let S=new Yn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=XG.parse(u);h[Yn.extensionName]&&(S.accept(h[Yn.extensionName]),m[Yn.extensionName]=S)}catch{Zn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(h,y,p,P)=>{if(!h)return Cd(r,y||401,p,P);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return Cd(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[Bee])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>YG)return Cd(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${zee("sha1").update(r+Uee).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),u._protocol=m)}if(t[Yn.extensionName]){let m=t[Yn.extensionName].params,S=XG.format({[Yn.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${S}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",QG),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Td,this)})),a(u,n)}};t2.exports=gk;function Vee(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Td(e){e._state=e2,e.emit("close")}function QG(){this.destroy()}function Cd(e,t,r,o){r=r||Gh.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Gh.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Zn(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Zn),e.emit("wsClientError",i,r,t)}else Cd(r,o,n,s)}});var qee,Kee,Jee,Xee,Yee,Zee,o2,Qee,kd,n2=l(()=>{qee=g(KG(),1),Kee=g($h(),1),Jee=g(Oi(),1),Xee=g(nk(),1),Yee=g(ak(),1),Zee=g(mk(),1),o2=g(Bh(),1),Qee=g(r2(),1),kd=o2.default});var fk,s2=l(()=>{"use strict";fk=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var ete,hk,i2=l(()=>{"use strict";Lp();s2();ete=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",hk=(e={})=>{let t=e.env??process.env,r=fk(t[Cp]),o=fk(t[kp]);return{mode:ete(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var a2=l(()=>{"use strict";Lp()});var l2=l(()=>{"use strict";i2();a2()});var yk=l(()=>{"use strict"});var qr,Ld=l(()=>{"use strict";qr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var $i,Qn,c2,rte,Sk,Pk,d2,u2,Ak,p2,Ed,bk=l(()=>{"use strict";$i=g(require("node:fs")),Qn=g(require("node:os")),c2=g(require("node:path"));yk();Ld();rte=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Sk=(e=Qn.default.hostname())=>c2.default.join(Qn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),Pk=e=>{if(!$i.default.existsSync(e))return null;try{let t=JSON.parse($i.default.readFileSync(e,"utf8"));return!rte(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},d2=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},u2=(e,t)=>{$i.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Ak=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Sk(),o=Pk(r);if(o!==null&&o.pid!==process.pid&&qr(o.pid)&&d2(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Qn.default.hostname(),macOsUsername:Qn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return u2(r,n),{ok:!0}},p2=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Sk(),o=Pk(r);return o!==null&&o.pid!==process.pid&&qr(o.pid)&&d2(o)?{ok:!1}:(u2(r,{hostname:Qn.default.hostname(),macOsUsername:Qn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},Ed=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??Sk();Pk(r)?.pid===process.pid&&$i.default.existsSync(r)&&$i.default.unlinkSync(r)}});var _k,Rd,ote,nte,ste,ite,wk,m2=l(()=>{"use strict";_k=require("node:child_process"),Rd=g(require("node:path"));Ld();Pp();ote=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),nte=(e,t)=>{if(ote(e)||!/\bnode\b/.test(e))return!1;let r=Rd.default.resolve(t),o=Rd.default.join(r,"app",ya),n=Rd.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===ya||i==="agent-witch.ts")return e.includes(r);try{let a=Rd.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},ste=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,_k.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},ite=(e,t,r)=>{let o=ste(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||nte(d,t)&&n.push(c)}return n},wk=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,_k.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=ite(r,e.installDir,t),n=[];for(let s of o)if(qr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var xd,Wd,g2,ate,vk,f2=l(()=>{"use strict";xd=g(require("node:fs")),Wd=g(require("node:path"));je();g2=(e,t)=>{!xd.default.existsSync(e)||xd.default.existsSync(t)||(xd.default.mkdirSync(Wd.default.dirname(t),{recursive:!0}),xd.default.renameSync(e,t))},ate=e=>{if(e.profileEmail===null)return;let t=Wd.default.join(e.installDir,Tt);g2(Wd.default.join(t,No),e.mainLogPath),g2(Wd.default.join(t,Do),e.errorLogPath)},vk=e=>{let t=O();e!==void 0&&t.installDir!==e||ate(t)}});var h2=l(()=>{"use strict";jl();fg();fg();!st()&&Jo(__agentWitchImportMetaUrl)&&(async()=>{nt("agent-witch-wake-server");let e=await Sn(),t=yr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var y2=l(()=>{"use strict";h2()});var S2=l(()=>{"use strict";kl()});var Tk,P2=l(()=>{"use strict";yk();y2();bk();S2();Tk=async(e={})=>{let t=e.skipInProcessBridge?null:await gg();Xm();let r=setInterval(()=>{Xm()},6e4),o=setInterval(()=>{if(!p2().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Id,Vh,dte,A2,b2,qh,_2,w2,Ck,v2,Kh,T2=l(()=>{"use strict";Id=g(require("node:fs")),Vh=g(require("node:path")),dte="pending-run-inputs.json",A2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),b2=e=>{let t=e.profileEmail?Vh.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Vh.default.join(t,dte)},qh=e=>{let t=b2(e);if(!Id.default.existsSync(t))return{};try{let r=JSON.parse(Id.default.readFileSync(t,"utf8"));return A2(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!A2(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},_2=(e,t)=>{let r=b2(e);Id.default.mkdirSync(Vh.default.dirname(r),{recursive:!0}),Id.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},w2=e=>Object.values(qh(e)),Ck=(e,t)=>qh(e)[t]!==void 0,v2=(e,t)=>{let r=qh(e);r[t.agentRunId]=t,_2(e,r)},Kh=(e,t)=>{let r=qh(e);delete r[t],_2(e,r)}});var Jh=l(()=>{"use strict";le()});var C2=l(()=>{"use strict";le()});var Xh=l(()=>{"use strict";le()});var Yh=l(()=>{"use strict";le()});var Od=l(()=>{"use strict";le()});var ute,pte,Md,kk=l(()=>{"use strict";Lt();Jh();C2();Xh();Yh();Od();ute={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},pte={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Md=e=>{if(!he(e.writerAgent))return"the selected writer";let t=at(e.writerAgent);if($e(e.writerExecutionBackend)==="api"&&t!==null){let r=Ye(We(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Ga(t,r.model);return`${pte[t]} model ${o}`}}return ute[e.writerAgent]}});var mte,gte,k2,L2,E2=l(()=>{"use strict";mte=/"input_tokens"\s*:\s*(\d+)/,gte=/"output_tokens"\s*:\s*(\d+)/,k2=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},L2=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=k2(mte.exec(t)),o=k2(gte.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var Zh=l(()=>{"use strict";xt()});var Nd,Qh,fte,Lk,R2,x2,W2,Ek,I2=l(()=>{"use strict";Nd=g(require("node:fs")),Qh=g(require("node:path"));Zh();fte="run-completion-outbox.json",Lk=e=>{let t=e.profileEmail?Qh.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Qh.default.join(t,fte)},R2=e=>{let t=Lk(e);if(!Nd.default.existsSync(t))return[];try{let r=JSON.parse(Nd.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},x2=(e,t)=>{Nd.default.mkdirSync(Qh.default.dirname(Lk(e)),{recursive:!0}),Nd.default.writeFileSync(Lk(e),JSON.stringify(t,null,2),"utf8")},W2=(e,t)=>{let r=[...R2(e).filter(o=>o.runId!==t.runId),t];x2(e,r)},Ek=async e=>{if(e.cloudApi===null)return;let t=R2(e.layout);if(t.length===0)return;let r=[];for(let o of t)await bl(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);x2(e.layout,r)}});var O2=l(()=>{"use strict"});var Rk,Dd,yte,es,M2=l(()=>{"use strict";O2();Rk=new Map,Dd=e=>{let t=Rk.get(e);t!==void 0&&(clearInterval(t),Rk.delete(e))},yte=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},es=(e,t,r,o={})=>{Dd(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Dd(t);return}let i=o.onTick?.()??{};yte(e,t,n,i)};s(),Rk.set(t,setInterval(s,15e3))}});var N2=l(()=>{"use strict";xt()});var D2,j2=l(()=>{"use strict";N2();D2=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:He(t)}});var xk,jd,Kr,Wk,pr,z2,ey=l(()=>{"use strict";xk=new Set,jd=new Map,Kr=(e,t)=>{if(t.length===0)return;let r=jd.get(e)??[];r.push(t),jd.set(e,r)},Wk=e=>{xk.add(e);let t=jd.get(e)??[];return jd.delete(e),t},pr=e=>xk.has(e),z2=e=>{xk.delete(e),jd.delete(e)}});var Hi,$2,H2,F2=l(()=>{"use strict";Hi=g(require("node:path")),$2=require("node:url");Ko();H2=()=>{if(st()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Hi.default.dirname(Hi.default.resolve(e)):Hi.default.dirname(Hi.default.resolve(__filename))}return Hi.default.dirname((0,$2.fileURLToPath)(__agentWitchImportMetaUrl))}});var U2,B2,G2,V2,ot,Fi,q2,K2,Ui,Ik,Ok,Mk,J2,Nk,X2,ty=l(()=>{"use strict";U2=require("node:crypto"),B2=g(require("node:fs")),G2=g(require("node:path")),V2=require("node:url");Ld();Ko();F2();ot=new Map,q2=async()=>{if(Fi!==void 0)return Fi;try{if(st()){let e=H2(),t=G2.default.join(e,"deps","node-pty","lib","index.js");if(B2.default.existsSync(t)){let r=await import((0,V2.pathToFileURL)(t).href);return Fi=r,r}}return Fi=await import("node-pty"),Fi}catch{return Fi=null,null}},K2=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Ui=(e,t,r)=>{let o=ot.get(e);if(o!==void 0){ot.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},Ik=(e,t)=>{let r=ot.get(e);return r===void 0?!1:(r.pty.write(t),!0)},Ok=(e,t,r)=>{let o=ot.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},Mk=e=>{for(let t of ot.values())if(!(t.mode!=="agent"||t.runId!==e))return qr(t.pty.pid);return!1},J2=e=>{for(let[t,r]of ot.entries())if(!(r.mode!=="agent"||r.runId!==e)){ot.delete(t);try{r.pty.kill()}catch{}return!0}return!1},Nk=async e=>{let t=await q2();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;ot.get(e.shellSessionId)!==void 0&&Ui(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return ot.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{K2(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{ot.get(e.shellSessionId)?.pty===n&&(ot.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},X2=async e=>{let t=e.shellSessionId??(0,U2.randomUUID)(),r=await q2();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return ot.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{K2(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{ot.get(t)?.pty===o&&(ot.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var ry,Y2,Z2=l(()=>{"use strict";ry="[[AWAITING_INPUT]]",Y2=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",ry,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var zd,Q2,oy=l(()=>{"use strict";Z2();zd=e=>{let t=e.indexOf(ry);if(t<0)return null;let o=e.slice(t+ry.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},Q2=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",Y2].join(`
`)});var e5,t5=l(()=>{"use strict";ey();ty();oy();e5=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(pr(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Kr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await X2({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=zd(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var o5,n5,s5,r5,Jr,ny=l(()=>{"use strict";o5=require("node:child_process"),n5=g(require("node:fs")),s5=g(require("node:path"));Pp();r5=12e4,Jr=(e,t)=>{let r=s5.default.join(e,"app",rx,"ensure-writer.sh");return n5.default.existsSync(r)?new Promise((o,n)=>{let s=(0,o5.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},a=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(r5/1e3)}s`))},r5);s.on("error",c=>{clearTimeout(a),n(c)}),s.on("close",c=>{if(clearTimeout(a),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var i5,ts,Hd,sy,Dk,$d,iy,ay,jk,zk,Ste,Bi,Pte,Ate,$k,Hk=l(()=>{"use strict";i5=require("node:child_process");Lt();ny();Xh();Jh();Od();Yh();ts=new Map,Hd=e=>e==="cursor"||e==="antigravity",sy=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",Dk=e=>ts.get(e)?.warmed===!0,$d=e=>{let t=ts.get(e);ts.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},iy=e=>ts.get(e)?.conversationStarted===!0,ay=e=>{let t=ts.get(e);ts.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},jk=e=>{ts.delete(e)},zk=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",Ste={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Bi=e=>`${Ste[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,Pte=(e,t,r,o)=>new Promise(n=>{let s=Up(t,r),i=[],a=(0,i5.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),Ate=(e,t)=>{let r=Bi(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},$k=async e=>{if(!he(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&$e(e.runConfig.writerExecutionBackend)==="api"){let r=at(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=We(e.runConfig.layout.configPath);return Ye(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),$d(e.writerAgent),{exitCode:0,output:Bi(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Jr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}Hd(e.writerAgent)&&$d(e.writerAgent);let t=await Pte(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?Ate(e.writerAgent,t.output):Bi(e.writerAgent)}}});var rs,Fk=l(()=>{"use strict";rs={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var a5,bte,_te,l5,wte,Uk,c5=l(()=>{"use strict";Fk();a5=/you(?:'|')ve hit your session limit/i,bte=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],_te=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,l5=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},wte=e=>{let t=_te.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},Uk=e=>{let t=e.trim();if(t.length===0)return null;if(a5.test(t))return{code:rs.SESSION_LIMIT,resetHint:wte(t),matchedLine:l5(t,a5)};for(let r of bte)if(r.test(t))return{code:rs.PROVIDER_QUOTA,resetHint:null,matchedLine:l5(t,r)};return null}});var ly,cy,Bk,Gk=l(()=>{"use strict";ly="[[AGENT_RUN_WRITER_EXECUTION]]",cy="cli-writer-api-key-missing",Bk="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var Vk=l(()=>{"use strict";Gk()});var d5=l(()=>{"use strict";Vk()});var dy=l(()=>{"use strict";Fk();c5();Gk();Vk();d5()});var uy,u5=l(()=>{"use strict";uy={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var p5,m5=l(()=>{"use strict";p5="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var g5,f5=l(()=>{"use strict";dy();m5();g5=e=>e.code===rs.SESSION_LIMIT?p5:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var h5,y5=l(()=>{"use strict";dy();u5();f5();h5=e=>{let t=Uk(e.output);return t!==null?{status:uy.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:g5(t)}:{status:e.exitCode===0?uy.COMPLETED:uy.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var qk,K1e,S5=l(()=>{"use strict";qk={OPEN:"open",APPROVAL:"approval"},K1e=qk.APPROVAL});var Gi,py,P5,Cte,A5,b5,_5,Fd,Kk,Jk=l(()=>{"use strict";Gi=g(require("node:fs")),py=g(require("node:path")),P5="runs",Cte=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),A5=e=>{let t=e.profileEmail!==null?py.default.join(e.installDir,"profiles",e.profileEmail,P5):py.default.join(e.installDir,P5);return Gi.default.mkdirSync(t,{recursive:!0}),t},b5=(e,t)=>py.default.join(A5(e),`${t}.json`),_5=(e,t)=>{Gi.default.writeFileSync(b5(e,t.id),JSON.stringify(t,null,2))},Fd=(e,t)=>{let r=b5(e,t);if(!Gi.default.existsSync(r))return null;try{let o=JSON.parse(Gi.default.readFileSync(r,"utf8"));return!Cte(o)||typeof o.id!="string"?null:o}catch{return null}},Kk=e=>{let t=A5(e),r=Gi.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=Fd(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var kte,w5,v5=l(()=>{"use strict";y5();S5();Jk();kte=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=h5({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:qk.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},w5=(e,t)=>{let r=kte(t);return _5(e,r),r}});var T5=l(()=>{"use strict";Th()});var C5,k5=l(()=>{"use strict";dy();C5=()=>[ly,`agentRunWriterExecutionBackend=${cy}`,`agentRunWriterExecutionReasonCode=${Bk}`].join(`
`)});var Io,my=l(()=>{"use strict";Io=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Xk,Lte,Ete,L5,E5=l(()=>{"use strict";Xk=e=>e.toLocaleString("en-US"),Lte=e=>e<.01?e.toFixed(4):e.toFixed(3),Ete=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${Lte(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Xk(e.inputTokens)} in / ${Xk(e.outputTokens)} out (${Xk(e.totalTokens)} total)`,t].join(`
`)},L5=(e,t)=>{if(t===void 0)return e;let r=Ete(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var R5=l(()=>{"use strict";le()});var W5,Ud,Pe,Yk,gy,x5,Rte,xte,I5,O5,M5,Bd,Zk,Qk,eL,N5,Wte,vt,Gd,Oo,D5,Ite,Ote,fy,tL,rL,oL,j5=l(()=>{"use strict";W5=require("node:child_process");le();Lt();T2();dd();kk();E2();Ba();I2();Zh();M2();Ld();j2();ey();ty();oy();t5();Hk();v5();T5();k5();my();E5();Ss();R5();Od();_a();oy();Ud=new Map,Pe=new Map,Yk=new Set,gy=new Map,x5=e=>{e!==void 0&&!gy.has(e)&&gy.set(e,Date.now())},Rte=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(pr(t)){vt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}Kr(t,n)},xte=(e,t,r,o,n)=>{if(!KP(e,n))return;let s=`${C5()}
`;Rte(t,r,o,s);let i=Pe.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},I5=130,O5=`

Stopped by user.`,M5=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:Io(e)},Bd=null,Zk=e=>{Bd=e},Qk=(e,t)=>{if(Bd===null)return;let r=eC(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||qA(Bd,t,r)},eL=async e=>{await Ek({layout:e,cloudApi:Bd})},N5=e=>{let t=Ud.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:qr(t.pid)},Wte=e=>ye({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),vt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Gd=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=ms(s),c=Pe.get(r);if(a!==null&&c!==void 0){let d=px(a),u=N5(r)||Mk(r);d!==null&&!u&&Oo(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return ux(a)}}),Oo=(e,t,r,o,n,s,i,a)=>{let c=Cs(s,a),d=n,u=L5(c.output,c.llmUsage);if(r!==void 0){let S=gy.get(r);gy.delete(r),S!==void 0&&ZT({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let h=L2(c.llmUsage,u);h!==null&&BU({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&Yk.has(r)&&(Yk.delete(r),d=I5,u=u.trim().length>0&&!u.includes("Stopped by user.")?`${u.trim()}${O5}`:"Stopped by user.");let m=r!==void 0?eC(e.layout.reportsDir,r):null;if(r!==void 0){Dd(r),Za(e.layout,r),pr(r)&&(vt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),z2(r));let S=Pe.get(r);HU({reportsDir:e.layout.reportsDir,agentRunId:r,input:Io(i),output:u,...S!==void 0?{writerLabel:Md({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&wh({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:u,agentRunId:r}),w5(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:u,layout:e.layout}),W2(e.layout,{runId:r,exitCode:d,output:u,createdAt:new Date().toISOString(),...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{}}),Ek({layout:e.layout,cloudApi:Bd}),Pe.delete(r),Ud.delete(r),Kh(e.layout,r)}vt(t,{type:"command.claude.result",payload:{exitCode:d,output:u,...r!==void 0?{agentRunId:r}:{},...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),Ia(e.layout)},D5=(e,t,r,o,n,s,i)=>{let a=Pe.get(r),c=a?.accumulatedOutput??s;v2(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),es(t,r,()=>Ck(e.layout,r),Gd(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),vt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},Ite=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,u=h=>{if(!(n===void 0||h.length===0)){if(pr(n)){vt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}Kr(n,h)}};if(n!==void 0){let h=Pe.get(n);Ud.set(n,t),Pe.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),vt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),es(r,n,()=>N5(n),Gd(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let m=a==="claude-cli",S=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(m?S.push(y):(c.push(y),u(y)),d||n===void 0)return;let p=zd(c.join(""));if(p!==null){d=!0,t.kill("SIGTERM");let P=Pe.get(n),A=[P?.accumulatedOutput??"",p.partialOutput].filter(f=>f.length>0).join(`

`);P!==void 0&&(P.accumulatedOutput=A),Ud.delete(n),D5(e,r,n,o,p.question,A,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),u(y)}),t.on("close",h=>{if(d)return;ay(a);let y=n!==void 0?Pe.get(n):void 0,p=m?Cs(S.join("")):{output:c.join("").trim(),llmUsage:void 0},P=m?c.join("").trim():"",A=[p.output.trim(),P].filter(b=>b.length>0).join(`
`);m&&p.output.trim().length>0&&u(p.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${A}`.trim():A;Oo(e,r,n,o,h??-1,f,s,p.llmUsage)}),t.on("error",h=>{d||Oo(e,r,n,o,-1,h.message,s)})},Ote=(e,t,r,o,n,s,i,a,c)=>{let d=M5(r,c);s!==void 0&&(Pe.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),vt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),es(n,s,()=>Pe.has(s),Gd(e,n,s,o,i,a))),Ka(e,t,r,m=>{if(!(s===void 0||m.length===0)){if(pr(s)){vt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:m},requestId:o});return}Kr(s,m)}}).then(m=>{ay(t),Oo(e,n,s,o,m.exitCode,m.output,r,m.llmUsage)}).catch(m=>{let S=m instanceof Error?m.message:String(m);Oo(e,n,s,o,-1,S,r)})},fy=(e,t,r,o,n,s,i,a,c,d,u,m)=>{let S=M5(r,u);if(Wa(e.layout),an(e,t)){x5(s),Ote(e,t,r,o,n,s,c,d,S);return}let h=Yt(t,r,Wte(e),i);if(h===null){Oo(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}x5(s);let y=D2({workspace:e.workspace,projectFolderPath:c}),p=()=>{let P=(0,W5.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:m??process.env});Ite(e,P,n,o,s,r,S,t)};if(s===void 0){p();return}Pe.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:Pe.get(s)?.accumulatedOutput??""}),xte(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&ba({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),es(n,s,()=>Pe.has(s),Gd(e,n,s,o,c,d)),e5({socket:n,sendMessage:vt,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:P=>{a!==void 0&&Ui(a,b=>{vt(n,b)},o);let A=Pe.get(s),f=[A?.accumulatedOutput??"",P.partialOutput].filter(b=>b.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),D5(e,n,s,o,P.question,f,r)},onFinished:(P,A)=>{ay(t);let f=Cs(A),b=Pe.get(s),w=b!==void 0&&b.accumulatedOutput.length>0?`${b.accumulatedOutput}

${f.output}`.trim():f.output;Oo(e,n,s,o,P,w,r,f.llmUsage)}}).then(P=>{if(!P){p();return}es(n,s,()=>Mk(s),Gd(e,n,s,o,c,d))}).catch(P=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",P instanceof Error?P.message:P),p()})},tL=(e,t,r,o)=>{Kh(e.layout,t.agentRunId),t.shellSessionId!==void 0&&vt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=Q2(t),s=Pe.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;fy(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},rL=(e,t)=>{for(let r of w2(e.layout))Pe.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:Io(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),es(t,r.agentRunId,()=>Ck(e.layout,r.agentRunId),{awaitingInput:!0}),vt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},oL=(e,t,r,o)=>{let n=Pe.get(r);if(n===void 0)return!1;Yk.add(r),Dd(r);let s=Ud.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(J2(r))return!0;Kh(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${O5}`:"Stopped by user.";return Oo(e,t,r,o,I5,i,n.originalPrompt),!0}});var Mte,nL,z5=l(()=>{"use strict";ol();Mte=()=>`http://127.0.0.1:${Et()}/restart`,nL=async()=>{try{let e=await fetch(Mte(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var $5=l(()=>{"use strict";Ul()});var H5=l(()=>{"use strict";EC()});var F5,U5=l(()=>{"use strict";F5=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Vd,Nte,sL,B5=l(()=>{"use strict";B();re();$5();zb();H5();U5();Ss();Vd=(e,t)=>{ho(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},Nte=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(dP(),cP)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},sL=async e=>{let t=ze(e.layout.installDir)?.bundleVersion??null;if(!F5({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(kt(e.layout)){Oa({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Vd(e.layout,{summary:r,action:"install-bundle-update-start"}),hr({launchAgentLabel:fe(e.layout.installDir),installDir:e.layout.installDir});let o=await xi({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),Vd(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await Nte();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Vd(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),Vd(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),Vd(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var Dte,iL,G5=l(()=>{"use strict";Dte=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),iL=e=>{if(!Dte(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var aL,lL,V5=l(()=>{"use strict";bb();_b();aL=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Ll({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},lL=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Tr(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var q5,jte,zte,$te,qd,K5=l(()=>{"use strict";q5=g(require("node:os"));je();jte="Default",zte=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),$te=e=>{let t=q5.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},qd=()=>{let e=O(),t=la(e),r=zte(jte);return`${$te(t)}/${r.length>0?r:"project"}`}});var J5=l(()=>{"use strict";Ul()});var X5,cL,Y5=l(()=>{"use strict";J5();X5=!1,cL=e=>{X5||(X5=!0,process.on("uncaughtException",t=>{An(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;An(e,{kind:"crash",message:r,stack:o})}))}});var Z5,Hte,dL,Q5=l(()=>{"use strict";Z5=require("node:child_process");ny();Lt();Xh();Jh();Od();Yh();Hte=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,Z5.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},dL=async e=>{if(!he(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&$e(e.runConfig.writerExecutionBackend)==="api"){let r=at(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=We(e.layout.configPath),n=Ye(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Jr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await Hte(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var uL,eV=l(()=>{"use strict";uL=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var tV,pL,rV=l(()=>{"use strict";tV=require("node:crypto"),pL=()=>(0,tV.randomUUID)()});var Vi,oV,hy=l(()=>{"use strict";Vi="[[WORKING_ESTIMATE]]",oV=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Vi,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var nV,sV=l(()=>{"use strict";nV=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var Fte,iV,aV=l(()=>{"use strict";hy();Fte=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,iV=e=>{if(!e.includes(Vi))return null;let t=null;for(let r of e.matchAll(Fte)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var Ute,mL,lV=l(()=>{"use strict";aV();Ute=/^(\d{1,6})\b/,mL=e=>{let t=iV(e);if(t!==null)return t;let r=Ute.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var Bte,Gte,Vte,yy,gL=l(()=>{"use strict";Lt();$l();Bte="http://127.0.0.1:11434",Gte=45e3,Vte=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},yy=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Bte,o=t===void 0?(await It({commands:ye({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(Gte)});return n.ok?Vte(await n.json()):null}catch{return null}}});var fL,hL,yL,cV=l(()=>{"use strict";_a();hy();my();sV();lV();dd();gL();fL=async e=>{let t=Io(e.wrappedPrompt),r=FU(e.reportsDir);return{estimateOutput:await yy(oV(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},hL=e=>{let t=mL(e.estimateOutput);t!==null&&hh({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},yL=e=>{let t=mL(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=nV(t);return Aa({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Kt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),hh({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var Sy,dV,SL=l(()=>{"use strict";Sy="[[WORKING_TOKEN_ESTIMATE]]",dV=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Sy,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var uV,qte,pV,mV=l(()=>{"use strict";SL();uV=/^(\d{1,8})\b/,qte=e=>{let t=e.indexOf(Sy);if(t<0)return null;let r=e.slice(t+Sy.length).trim(),o=uV.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},pV=e=>{let t=qte(e);if(t!==null)return t;let r=uV.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var PL,AL,gV=l(()=>{"use strict";SL();my();mV();dd();gL();PL=async e=>{let t=Io(e.wrappedPrompt),r=GU(e.reportsDir);return{estimateOutput:await yy(dV(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},AL=e=>{let t=pV(e.estimateOutput);return t===null?null:(UU({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var fV=l(()=>{"use strict";bk();m2();f2();P2();ol();j5();ny();Lt();Jk();ey();z5();Lb();B5();Ss();G5();V5();Zh();K5();Y5();Q5();Ap();eV();rV();hy();_a();cV();gV();kk();$l();ty();Hk()});var hV={};ft(hV,{buildContinuationPromptWithContext:()=>Xte});var Kte,Jte,Xte,yV=l(()=>{"use strict";Kte=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Jte=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Xte=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=Jte(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${Kte(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var SV={};ft(SV,{readHarnessExportSets:()=>Zte});var Kd,bL,Py,Yte,Zte,PV=l(()=>{"use strict";Kd=g(require("node:fs")),bL=g(require("node:path"));je();Py=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Yte=e=>{if(!Kd.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Kd.default.readFileSync(e.harnessManifestPath,"utf8"));if(Py(t))return t}catch{return null}return null},Zte=(e,t)=>{let r=O(t),o=Yte(r);if(o===null)return[];let n=Py(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!Py(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let u of c){if(!Py(u))continue;let m=typeof u.path=="string"?u.path:void 0,S=typeof u.id=="string"?u.id:"",h=typeof u.kind=="string"?u.kind:"",y=typeof u.title=="string"?u.title:"";if(m===void 0||S.length===0||h.length===0||y.length===0)continue;let p=m.startsWith("shared/")?bL.default.join(r.harnessRootDir,m):bL.default.join(r.harnessSetsDir,i,m);Kd.default.existsSync(p)&&d.push({id:S,kind:h,title:y,content:Kd.default.readFileSync(p,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var LL,wL,qi,AV,Qte,bV,_V,_L,wV,vL,TL,CL,te,J,kL,ere,Jd,tre,rre,ore,nre,sre,ire,are,lre,Xd,vV=l(()=>{"use strict";LL=require("node:child_process"),wL=g(require("node:fs")),qi=g(require("node:os"));n2();B();re();on();HC();l2();le();Xt();Ul();q_();xh();Th();xt();uo();Jb();ht();fV();AV=3e4,Qte=3e4,bV=new Map,_V=new Map,_L=new Map,wV=new Map,vL=new Map,TL=new Map,CL=new Map,te=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),J=(e,t,r)=>{e.readyState===kd.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(ho(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),hg(r,"out",t)))},kL=e=>e,ere=e=>{if(!wL.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(wL.default.readFileSync(e.harnessManifestPath,"utf8"));if(te(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Jd=(e,t)=>{let r=ere(t);r!==null&&J(e,{type:"harness.manifest.report",payload:{hostname:qi.default.hostname(),manifest:r}})},tre=async(e,t,r,o,n,s,i=!1,a,c,d,u,m)=>{let S=m?.trim()??"";if(!he(t)){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=Md({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await It({commands:ye({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),p=s!==void 0?fL({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,P=s!==void 0?PL({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=Hd(t)&&!Dk(t);if(A){try{await Jr(e.layout.installDir,t)}catch(H){let ke=H instanceof Error?H.message:String(H);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${ke}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}$d(t)}else if(!Hd(t))try{await Jr(e.layout.installDir,t)}catch(H){let ke=H instanceof Error?H.message:String(H);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${ke}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Xa(d,qd,m);if(f===null){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}qe({projectFolderPath:f,...S.length>0?{projectId:S}:{}}),i||fd(e.layout,t,f);let b=vh({sessionContinuation:i,supportsWriterSessionContinuation:sy(t),isWriterConversationStarted:iy(t)}),w=i&&b==="first"?gd(e.layout,t,f):null,T=w!==null?Ri(e.layout,w):null,C=T!==null&&T.turns.length>0,L=fC({sessionContinuation:i,supportsWriterSessionContinuation:sy(t),isWriterConversationStarted:iy(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:C,userPromptCharacterCount:r.length}),x=r;if(L.continuationStrategy==="source_run_seed"){let H=typeof c=="string"&&c.length>0?Fd(e.layout,c):null;if(H!==null){let{buildContinuationPromptWithContext:ke}=await Promise.resolve().then(()=>(yV(),hV));x=ke({priorPrompt:H.prompt,priorOutput:H.resultOutput??"",userMessage:r})}}else L.continuationStrategy==="transcript_seed"&&T!==null&&T.turns.length>0&&(x=Ph({priorTurns:T.turns,userMessage:r}));let I=L.ragLimit>0?await Xs({layout:e.layout,query:x,limit:L.ragLimit,minScore:L.ragMinScore,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],N=L.ragLimit>0&&f.trim().length>0?await G_({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],U=L.injectMemory?sC(e.layout,f,S.length>0?S:void 0):[],V=`${aC(U,L.memoryEntryLimit)}${F_(I)}${V_(N)}${x}`,q=u?.trim()??(s!==void 0&&f.trim().length>0?pL():void 0);if(s!==void 0&&q!==void 0&&q.length>0&&f.trim().length>0){ba({reportKey:q,agentRunId:s,userSummary:"Working on your Mac\u2026"});let H=V;p!==null&&p.then(ke=>{if(ke===null)return;let Xr=yL({estimateOutput:ke.estimateOutput??"",reportKey:q,agentRunId:s,reportsDir:e.layout.reportsDir,task:ke.task,writerLabel:ke.writerLabel,embedding:ke.embedding});if(Xr.estimateSeconds===null)return;Qk(e.layout.reportsDir,s);let mr=`${Vi}
${Xr.estimateSeconds}
`;if(pr(s)){J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:mr},requestId:o});return}Kr(s,mr)}).catch(()=>{}),V=uL(H),V=NS(V,{agentRunId:s,reportKey:q,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&p!==null&&p.then(H=>{H!==null&&hL({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel,embedding:H.embedding})}).catch(()=>{}),s!==void 0&&P!==null&&P.then(H=>{H!==null&&AL({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel})}).catch(()=>{});let Xe=s!==void 0&&CL.get(s)===!0;if(s!==void 0&&f.trim().length>0){let H=await Km(f);TL.set(s,H),q!==void 0&&q.length>0&&vL.set(s,q)}fy(e,t,V,o,kL(n),s,{sessionTurn:L.sessionTurn},a,f,q,r,UP(e.layout,s,Xe)),A&&s!==void 0&&J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:zk(t)},requestId:o})},rre=async(e,t,r,o,n)=>{let s=(i,a)=>{J(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await $k({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ye({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,J(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=he(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Bi(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},ore=(e,t,r)=>new Promise(o=>{if(!he(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Yt(t,r,ye({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,LL.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),nre=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;J(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=er(t.bundle),s=te(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=Ee(e.wsUrl)??it,m=await LA({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=un({bundle:i,layout:e.layout});return J(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&Jd(o,e.layout),!0},sre=async(e,t,r,o)=>{if(await nre(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(J(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!he(n)){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}Wa(e.layout);let i=await(async()=>{try{await Jr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return ore(e,n,s)})().finally(()=>{Ia(e.layout)});J(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),Jd(o,e.layout)},ire=e=>{let t=1e3*2**e;return Math.min(Qte,t)},are=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=p=>{if(!t.restartInFlight){if(kt(e.layout)){Ma(p),console.log(`[agent-witch] Deferring local restart (${p}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${p})\u2026`),t.wakeError=`restart:${p}`,nL().then(P=>{if(P.ok){console.log("[agent-witch] Local restart completed.");return}if(!P.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",P.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(p,P="system.ack")=>{if(!t.selfUpdateInFlight){if(kt(e.layout)){Oa({layout:e.layout,remoteBundleVersion:p,trigger:P}),console.log(`[agent-witch] Deferring install bundle update (${p} via ${P}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,sL({layout:e.layout,remoteBundleVersion:p,trigger:P}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let p=Se(e.layout);p!==null&&Re(p,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let p=t.socket;t.socket=void 0,t.wsConnected=!1,p.removeAllListeners("open"),p.removeAllListeners("message"),p.removeAllListeners("close"),p.on("error",()=>{}),(p.readyState===kd.OPEN||p.readyState===kd.CONNECTING)&&p.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,AV)},u=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let p=ire(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${p}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},p)},m=p=>{s();let P=()=>{let A=Ca(e.layout.installDir),f=Et();J(p,{type:"agent.heartbeat",payload:{hostname:qi.default.hostname(),macOsUsername:qi.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:A}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};P(),t.heartbeatTimer=setInterval(P,AV)},S=(p,P)=>{if(typeof p.type!="string")return;if(Kb(p)){t.stopped=!0,s(),a(),c(),Gb({layout:e.layout}).finally(()=>{Ed(),process.exit(0)});return}ho(e.layout,{direction:"in",type:p.type,summary:"inbound WS frame"}),hg(e.layout,"in",p);let A=typeof p.requestId=="string"?p.requestId:void 0;if(p.type==="device.auth.attestation"&&te(p.payload)){let f=typeof p.payload.serverPublicKey=="string"?p.payload.serverPublicKey:"",b=typeof p.payload.origin=="string"?p.payload.origin:"",w=typeof p.payload.devicePublicKey=="string"?p.payload.devicePublicKey:"",T=typeof p.payload.challenge=="string"?p.payload.challenge:"",C=typeof p.payload.serverAttestation=="string"?p.payload.serverAttestation:"";if(!$C({serverPublicKey:f,origin:b,devicePublicKey:w,challenge:T,serverAttestation:C})){t.wakeError="Server attestation verification failed",ho(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(p.type==="writer.ensure"&&te(p.payload)){let f=typeof p.payload.writerAgent=="string"?p.payload.writerAgent:"";ho(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),dL({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(b=>{J(P,{type:"writer.status",payload:b},e.layout)})}if(p.type==="install.bundle.update"&&te(p.payload)){let f=typeof p.payload.bundleVersion=="string"?p.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(p.type==="system.ack"){zp(e.layout,{wsUrl:e.wsUrl});let f=te(p.payload)?p.payload:null,b=iL(f);b!==null&&o(b)}if(p.type==="device.restart"&&r("cloud-device-restart"),p.type==="automations.sync"&&te(p.payload)&&aL(p.payload),p.type==="automations.run"&&te(p.payload)&&lL(p.payload),p.type==="terminal.stream.accepted"&&te(p.payload)){let f=typeof p.payload.runId=="string"?p.payload.runId:"";if(f.length>0){let b=Wk(f);for(let w of b)J(P,{type:"terminal.stream.chunk",payload:{runId:f,chunk:w},requestId:A})}}if(p.type==="agent.agentRun.list"&&J(P,{type:"dashboard.agentRun.list.result",payload:{runs:Kk(e.layout)},requestId:A}),p.type==="agent.agentRun.get"&&te(p.payload)){let f=typeof p.payload.runId=="string"?p.payload.runId:"",b=f.length>0?Fd(e.layout,f):null;J(P,{type:"dashboard.agentRun.get.result",payload:{run:b},requestId:A})}if(p.type==="command.claude.run"&&te(p.payload)){let f=p.payload.prompt,b=typeof p.payload.writerAgent=="string"&&he(p.payload.writerAgent)?p.payload.writerAgent:"claude-cli",w=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,T=p.payload.sessionContinuation===!0,C=typeof p.payload.sourceRunId=="string"?p.payload.sourceRunId:void 0,L=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:void 0,x=typeof p.payload.projectId=="string"?p.payload.projectId:void 0,I=Xa(typeof p.payload.projectFolderPath=="string"?p.payload.projectFolderPath:void 0,qd,x),N=NP(p.payload.compositionSnapshot),U=typeof p.payload.reportKey=="string"?p.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${b} task (${T?"continue":"first"})\u2026`),I===null){J(P,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...w!==void 0?{agentRunId:w}:{}},requestId:A});return}if(N!==null){let V=jP(e.layout,N);if(V!==null){J(P,{type:"command.claude.result",payload:{exitCode:-1,output:V,...w!==void 0?{agentRunId:w}:{}},requestId:A});return}if(w!==void 0){let q=$P(e.layout,w,N);if(!q.ok){J(P,{type:"command.claude.result",payload:{exitCode:-1,output:q.errorMessage,...w!==void 0?{agentRunId:w}:{}},requestId:A});return}CL.set(w,N.entries.some(Xe=>Xe.scope==="run"))}}w!==void 0&&L!==void 0&&bV.set(w,L),w!==void 0&&(_V.set(w,I),x!==void 0&&x.trim().length>0&&_L.set(w,x.trim()),wV.set(w,f.trim()),qe({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),tre(e,b,f.trim(),A,P,w,T,L,C,I,U,x)}}if(p.type==="shell.session.open"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",b=typeof p.payload.cols=="number"?p.payload.cols:120,w=typeof p.payload.rows=="number"?p.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),Nk({shellSessionId:f,cwd:e.workspace,cols:b,rows:w,send:T=>{J(P,T)},requestId:A}))}if(p.type==="shell.session.close"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"";f.length>0&&Ui(f,b=>{J(P,b)},A)}if(p.type==="shell.input"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",b=typeof p.payload.data=="string"?p.payload.data:"";f.length>0&&b.length>0&&Ik(f,b)}if(p.type==="shell.resize"&&te(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",b=typeof p.payload.cols=="number"?p.payload.cols:0,w=typeof p.payload.rows=="number"?p.payload.rows:0;f.length>0&&b>0&&w>0&&Ok(f,b,w)}if(p.type==="command.writer.session.end"&&te(p.payload)){let f=p.payload.writerAgent;typeof f=="string"&&he(f)&&(jk(f),_h(e.layout,f))}if(p.type==="command.writer.session.start"&&te(p.payload)){let f=p.payload.writerAgent,b=typeof p.payload.writerSessionId=="string"?p.payload.writerSessionId:"";typeof f=="string"&&he(f)&&b.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),rre(e,f,b,A,P))}if(p.type==="command.claude.stop"&&te(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),oL(e,kL(P),f,A))}if(p.type==="command.claude.input_respond"&&te(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"",b=typeof p.payload.response=="string"?p.payload.response.trim():"",w=typeof p.payload.originalPrompt=="string"?p.payload.originalPrompt:"",T=typeof p.payload.partialOutput=="string"?p.payload.partialOutput:"",C=typeof p.payload.question=="string"?p.payload.question:"";f.length>0&&b.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),tL(e,{agentRunId:f,originalPrompt:w,partialOutput:T,question:C,response:b,shellSessionId:bV.get(f)},A,kL(P)))}if(p.type==="dispatch.approval.required"&&te(p.payload)){let f=typeof p.payload.requesterEmail=="string"?p.payload.requesterEmail:"A teammate",b=typeof p.payload.prompt=="string"?p.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${b}`),process.platform==="darwin"&&(0,LL.spawn)("osascript",["-e",`display notification "${b.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(p.type==="harness.request"&&te(p.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),sre(e,p.payload,A,P)),p.type==="harness.export.request"&&te(p.payload)){let f=typeof p.payload.borrowerUserId=="string"?p.payload.borrowerUserId:"",b=typeof p.payload.targetDeviceId=="string"?p.payload.targetDeviceId:void 0,w=Array.isArray(p.payload.setSlugs)?p.payload.setSlugs.filter(T=>typeof T=="string"):[];f.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:T}=await Promise.resolve().then(()=>(PV(),SV)),C=T(w,e.email);J(P,{type:"harness.export.result",payload:{success:C.length>0,borrowerUserId:f,...b!==void 0?{targetDeviceId:b}:{},sets:C,errorMessage:C.length>0?void 0:"No readable harness sets were found on this machine."},requestId:A})})()}if(p.type==="harness.manifest.request"&&Jd(P,e.layout),p.type==="command.claude.result"&&te(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,b=typeof p.payload.output=="string"?p.payload.output:"",w=typeof p.payload.exitCode=="number"?p.payload.exitCode:null,T=Xa(f!==void 0?_V.get(f):void 0,qd),C=f!==void 0?_L.get(f):void 0,L=f!==void 0?wV.get(f)??"":"",x=lb({exitCode:w,output:b});if(x&&T!==null&&H_({layout:e.layout,text:b,source:f??"command.claude.result",projectFolderPath:T,...C!==void 0?{projectId:C}:{}}),w!=null&&w!==0&&b.trim().length>0&&T!==null&&(N_({layout:e.layout,errorText:b,projectFolderPath:T,...C!==void 0?{projectId:C}:{}}),B_({layout:e.layout,text:b,source:f??"command.claude.result.failure",projectFolderPath:T,...C!==void 0?{projectId:C}:{}})),x&&L.trim().length>0&&T!==null&&iC({layout:e.layout,projectFolderPath:T,...C!==void 0?{projectId:C}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:L,output:b,createdAt:new Date().toISOString()}}),f!==void 0&&T!==null){let N=vL.get(f),U=TL.get(f);N!==void 0&&U!==void 0&&Km(T).then(V=>{let q=pb({before:U,after:V});DS(N,q),TL.delete(f),vL.delete(f)})}if(x&&C!==void 0&&C.trim().length>0){let N=$(),U=N===null?null:Y({wsUrl:N.wsUrl,pairingToken:N.pairingToken});U!==null&&gb(U,C,{...f!==void 0?{sourceRunId:f}:{},lesson:mb({prompt:L,output:b})})}f!==void 0&&(Za(e.layout,f),CL.delete(f),_L.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let p=new kd(e.wsUrl);t.socket=p,p.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),Zk(Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),eL(e.layout);let P=Ee(e.wsUrl)??"http://localhost:3000",A=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=zC({layout:e.layout,origin:P,...A!==void 0&&A.length>0?{claimToken:A}:{}});J(p,{type:"agent.register",payload:{role:"agent",hostname:qi.default.hostname(),macOsUsername:qi.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),Jd(p,e.layout),rL(e,p),m(p)}),p.on("message",P=>{let A=typeof P=="string"?P:P.toString("utf8");try{let f=JSON.parse(A);if(!te(f))return;S(f,p)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),p.on("close",(P,A)=>{s(),t.socket=void 0,t.wsConnected=!1,pP(e.layout),t.reconnectAttempt+=1;let f=typeof A=="string"?A:A.toString("utf8");An(e.layout,{kind:"ws_close",message:"WebSocket closed",code:P,reason:f}),console.log("[agent-witch] Disconnected from server."),u()}),p.on("error",P=>{t.wakeError=P.message,An(e.layout,{kind:"ws_error",message:P.message,stack:P.stack}),console.error(`[agent-witch] Socket error: ${P.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return oP(()=>{let p=nP();p!==null&&p.layout.installDir===e.layout.installDir&&p.layout.profileEmail===e.layout.profileEmail&&o(p.remoteBundleVersion,p.trigger);let P=sP();P!==null&&r(P)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Ha(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Pd(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let p=t.socket;return!t.wsConnected||p===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Jd(p,e.layout),{ok:!0})}}},lre=async()=>{nt("agent-witch");let e=hk(),t=k();Ak().ok||(process.platform==="darwin"?(await Go(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),vk(t);let o=wk({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(hr({launchAgentLabel:fe(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),ma());let n=await YP(),s=n[0];s!==void 0&&cL(s.layout);for(let h of n){let y=Ee(h.wsUrl)??it;ka(h.layout.installDir,y)}let i=n.map(h=>are(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),Ed(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let p=i[y];if(p===void 0)return;let P=Se(h.layout);mP(P,{socketOpen:p.hasMacSocketOpen(),staleAfterMs:12e4})&&p.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(kt(h)||Wl(h.installDir))},m=await Tk({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):Sd({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=yr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),ga(),d()});d=()=>{S(),m.stop(),Ed(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Xd=lre});var EL=l(()=>{"use strict";vV()});var TV={};ft(TV,{startAgentWitchClient:()=>Xd});var CV=l(()=>{"use strict";EL();EL();Ko();jS();_p();if(!st()&&Jo(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(bp(process.argv.slice(e))),Xd()}});OS();jS();Ko();_p();var fx="20.x",hx="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var C3=e=>[`Node.js ${fx} or newer is required (found ${e}).`,hx].join(" "),yx=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${C3(process.version)}
`),process.exit(1))};var cre=async()=>{nt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(dP(),cP)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},dre=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(EO(),LO)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},ure=async()=>{if(!Jo(st()?void 0:__agentWitchImportMetaUrl))return;yx();let e=process.argv.indexOf("report");e>=0&&process.exit(bp(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await cre();return}if(t==="wake"){await dre();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(RM(),EM));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(QB(),ZB));o();return}if(t==="mcp"){let{resolveAgentWitchLocalLayout:o}=await Promise.resolve().then(()=>(B(),bR)),{runAwlMcpStdio:n}=await Promise.resolve().then(()=>(XT(),WU));await n({layout:o()});return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(CV(),TV));await r()};ure();
