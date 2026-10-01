#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var TU=Object.create;var _f=Object.defineProperty;var IU=Object.getOwnPropertyDescriptor;var OU=Object.getOwnPropertyNames;var MU=Object.getPrototypeOf,NU=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var _=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Ct=(e,t)=>{for(var r in t)_f(e,r,{get:t[r],enumerable:!0})},zU=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of OU(t))!NU.call(e,n)&&n!==r&&_f(e,n,{get:()=>t[n],enumerable:!(o=IU(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?TU(MU(e)):{},zU(t||!e||!e.__esModule?_f(r,"default",{value:e,enumerable:!0}):r,e));var ci,NW,zW,ao,Wf,WY,jW,zc,Rt,Xt,jc,Dc,_n,Wn,Zt,Lf,$c,Hc,Fc,di,dt,Ln,kn,Uc,Cr,kf,DW,$e=l(()=>{"use strict";ci={production:".agent-witch",localhost:".local-agent-witch"},NW={production:47892,localhost:47893},zW={production:"com.agent-witch",localhost:"com.local-agent-witch"},ao={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Wf="app",WY=`${Wf}/agent-witch.js`,jW=`${Wf}/command`,zc={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Rt=ci.production,Xt=ci.localhost,jc=NW.production,Dc=NW.localhost,_n=zW.production,Wn=zW.localhost,Zt="profiles",Lf=ao.activeProfile,$c="harness",Hc="sets",Fc="manifest.json",di=zc.projectsDir,dt=zc.logsDir,Ln="agent-witch.log",kn="agent-witch.error.log",Uc=zc.reportsDir,Cr=zc.deviceKeypairJson,kf=Wf,DW="agent-witch.js"});var $W=l(()=>{"use strict";$e()});var HW,lo,ui,Bc=l(()=>{"use strict";HW=m(require("node:path"));$e();lo=e=>HW.default.basename(e)===Xt,ui=e=>lo(e)?Wn:_n});var FW=l(()=>{"use strict";$W();Bc()});var UW,Ef,jU,pi,DU,$U,BW,HU,FU,GW=l(()=>{"use strict";FW();$e();UW=m(require("node:os")),Ef=m(require("node:path")),jU=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?Ef.default.resolve(e):Ef.default.join(UW.default.homedir(),Rt)},pi=ui(jU()),DU=`${pi}-wake`,$U=`${pi}-live`,BW=`${pi}-watchdog`,HU=`${pi}-automation-scheduler`,FU=`${pi}-updater`});var En=_(Cf=>{"use strict";Object.defineProperty(Cf,"__esModule",{value:!0});Cf.stringify=UU;function UU(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=_(Rf=>{"use strict";Object.defineProperty(Rf,"__esModule",{value:!0});Rf.generateTypeGuardError=BU;var VW=En();function BU(e,t,r){return(0,VW.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,VW.stringify)(e)}) to be "${r}"`}});var Rr=_(Gc=>{"use strict";Object.defineProperty(Gc,"__esModule",{value:!0});Gc.isNonNullObject=void 0;var GU=O(),VU=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,GU.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Gc.isNonNullObject=VU});var xt=_(fe=>{"use strict";Object.defineProperty(fe,"__esModule",{value:!0});fe.attachTypeGuardMeta=fe.isArrayTypeGuard=fe.isNestedObjectTypeGuard=fe.getTypeGuardWrapperKind=fe.getTypeGuardInnerGuard=fe.getTypeGuardItemGuard=fe.getTypeGuardSchema=void 0;var qU=e=>e.schema;fe.getTypeGuardSchema=qU;var KU=e=>e.itemGuard;fe.getTypeGuardItemGuard=KU;var JU=e=>e.innerGuard;fe.getTypeGuardInnerGuard=JU;var YU=e=>e.wrapperKind;fe.getTypeGuardWrapperKind=YU;var XU=e=>{if((0,fe.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};fe.isNestedObjectTypeGuard=XU;var ZU=e=>{if((0,fe.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};fe.isArrayTypeGuard=ZU;var QU=(e,t)=>Object.assign(e,t);fe.attachTypeGuardMeta=QU});var mi=_(co=>{"use strict";Object.defineProperty(co,"__esModule",{value:!0});co.getExpectedTypeName=co.getTypeGuardDisplayName=void 0;var qW=xt(),eB=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};co.getTypeGuardDisplayName=eB;var tB=e=>{let t=(0,qW.getTypeGuardWrapperKind)(e),r=(0,qW.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,co.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};co.getExpectedTypeName=tB});var uo=_(Vc=>{"use strict";Object.defineProperty(Vc,"__esModule",{value:!0});Vc.createValidationResult=void 0;var rB=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Vc.createValidationResult=rB});var Cn=_(qc=>{"use strict";Object.defineProperty(qc,"__esModule",{value:!0});qc.createValidationError=void 0;var oB=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});qc.createValidationError=oB});var Rn=_(Kc=>{"use strict";Object.defineProperty(Kc,"__esModule",{value:!0});Kc.createTreeNode=void 0;var nB=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Kc.createTreeNode=nB});var gi=_(Jc=>{"use strict";Object.defineProperty(Jc,"__esModule",{value:!0});Jc.combineResults=void 0;var sB=uo(),iB=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,sB.createValidationResult)(r,o,n)};Jc.combineResults=iB});var Xc=_(Yc=>{"use strict";Object.defineProperty(Yc,"__esModule",{value:!0});Yc.createSimplifiedTree=void 0;var KW=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=KW(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},aB=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=KW(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Yc.createSimplifiedTree=aB});var hi=_(Qc=>{"use strict";Object.defineProperty(Qc,"__esModule",{value:!0});Qc.validateObject=void 0;var lB=Rr(),fi=uo(),cB=Cn(),Zc=Rn(),dB=gi(),JW=ed(),uB=(e,t,r)=>{let o=()=>{let i=(0,cB.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Zc.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,fi.createValidationResult)(!1,[],a):(0,fi.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,fi.createValidationResult)(!0,[],(0,Zc.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,g=d,b=t[g],h=e[g],y=(0,JW.validateProperty)(g,h,b,r);return y.valid?p.length===0?(0,fi.createValidationResult)(!0,[],(0,Zc.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,JW.validateProperty)(d,e[d],p,r)}),a=(0,dB.combineResults)(i,r.path),c=(0,Zc.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,fi.createValidationResult)(a.valid,a.errors,c)};return(0,lB.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Qc.validateObject=uB});var XW=_(od=>{"use strict";Object.defineProperty(od,"__esModule",{value:!0});od.validateArray=void 0;var pB=En(),td=uo(),YW=Cn(),rd=Rn(),mB=gi(),gB=hi(),fB=mi(),hB=xt(),yB=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,YW.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,rd.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,td.createValidationResult)(!1,[c],d)}let n=(0,hB.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,g={path:p,config:r.config||null};if(n)return(0,gB.validateObject)(c,n,g);let b=t(c,null),h=(0,fB.getExpectedTypeName)(t),y=(0,pB.stringify)(c);if(b)return(0,td.createValidationResult)(!0,[],(0,rd.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,S=(0,YW.createValidationError)(p,h,c,u),A=(0,rd.createTreeNode)(p,!1,h,c);return A.errors=[S],(0,td.createValidationResult)(!1,[S],A)}),i=(0,mB.combineResults)(s,o),a=(0,rd.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,td.createValidationResult)(i.valid,i.errors,a)};od.validateArray=yB});var ed=_(sd=>{"use strict";Object.defineProperty(sd,"__esModule",{value:!0});sd.validateProperty=void 0;var ZW=uo(),SB=Cn(),QW=Rn(),AB=mi(),nd=xt(),bB=hi(),PB=XW(),wB=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,nd.getTypeGuardSchema)(r),c=(0,nd.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,bB.validateObject)(t,a,s);if(c&&(0,nd.isArrayTypeGuard)(r))return(0,PB.validateArray)(t,c,s)}let d=p=>{let g=r(t,p),b=(0,AB.getExpectedTypeName)(r);return g?(0,ZW.createValidationResult)(!0,[],(0,QW.createTreeNode)(n,!0,b,t)):(()=>{let h=(0,SB.createValidationError)(n,b,t,`Expected ${n} (${JSON.stringify(t)}) to be "${b}"`),y=(0,QW.createTreeNode)(n,!1,b,t);return y.errors=[h],(0,ZW.createValidationResult)(!1,[h],y)})()};if((0,nd.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};sd.validateProperty=wB});var ad=_(id=>{"use strict";Object.defineProperty(id,"__esModule",{value:!0});id.isNil=void 0;var vB=O(),_B=function(e,t){return e!=null?(t&&t.callbackOnError((0,vB.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};id.isNil=_B});var xf=_(ld=>{"use strict";Object.defineProperty(ld,"__esModule",{value:!0});ld.isDefined=void 0;var WB=O(),LB=ad(),kB=function(e,t){return(0,LB.isNil)(e,null)?(t&&t.callbackOnError((0,WB.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};ld.isDefined=kB});var Tf=_(cd=>{"use strict";Object.defineProperty(cd,"__esModule",{value:!0});cd.reportValidationResults=void 0;var EB=Xc(),eL=xf(),CB=ad(),RB=(e,t)=>{if(e.valid===!0||(0,CB.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,eL.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,EB.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,eL.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};cd.reportValidationResults=RB});var If=_(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.Validation=Q.reportValidationResults=Q.validateObject=Q.validateProperty=Q.createSimplifiedTree=Q.combineResults=Q.createTreeNode=Q.createValidationError=Q.createValidationResult=Q.getExpectedTypeName=void 0;var xB=mi();Object.defineProperty(Q,"getExpectedTypeName",{enumerable:!0,get:function(){return xB.getExpectedTypeName}});var TB=uo();Object.defineProperty(Q,"createValidationResult",{enumerable:!0,get:function(){return TB.createValidationResult}});var IB=Cn();Object.defineProperty(Q,"createValidationError",{enumerable:!0,get:function(){return IB.createValidationError}});var OB=Rn();Object.defineProperty(Q,"createTreeNode",{enumerable:!0,get:function(){return OB.createTreeNode}});var MB=gi();Object.defineProperty(Q,"combineResults",{enumerable:!0,get:function(){return MB.combineResults}});var NB=Xc();Object.defineProperty(Q,"createSimplifiedTree",{enumerable:!0,get:function(){return NB.createSimplifiedTree}});var zB=ed();Object.defineProperty(Q,"validateProperty",{enumerable:!0,get:function(){return zB.validateProperty}});var jB=hi();Object.defineProperty(Q,"validateObject",{enumerable:!0,get:function(){return jB.validateObject}});var DB=Tf();Object.defineProperty(Q,"reportValidationResults",{enumerable:!0,get:function(){return DB.reportValidationResults}});var $B=uo(),HB=gi(),FB=Cn(),UB=Rn(),BB=ed(),GB=hi(),VB=Tf(),qB=Xc();Q.Validation={result:$B.createValidationResult,combine:HB.combineResults,error:FB.createValidationError,treeNode:UB.createTreeNode,property:BB.validateProperty,object:GB.validateObject,report:VB.reportValidationResults,createSimplifiedTree:qB.createSimplifiedTree}});var dd=_(Of=>{"use strict";Object.defineProperty(Of,"__esModule",{value:!0});Of.isType=JB;var tL=Rr(),rL=If(),KB=xt();function JB(e){if(!(0,tL.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,rL.validateObject)(r,e,s);return(0,rL.reportValidationResults)(i,o||null),i.valid}return(0,tL.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,KB.attachTypeGuardMeta)(t,{schema:e})}});var iL=_(po=>{"use strict";Object.defineProperty(po,"__esModule",{value:!0});po.isNestedType=po.isShape=void 0;po.isSchema=yi;var oL=Rr(),nL=If(),sL=xt();function yi(e){if(!(0,oL.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=XB(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,nL.validateObject)(o,t,i);return(0,nL.reportValidationResults)(a,n||null),a.valid}return(0,oL.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,sL.attachTypeGuardMeta)(r,{schema:t})}function YB(e){return typeof e=="function"?e:Array.isArray(e)?ZB(e):typeof e=="object"&&e!==null?yi(e):e}function XB(e){let t={};for(let[r,o]of Object.entries(e))t[r]=YB(o);return t}function ZB(e){let t=e[0],r=yi(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,sL.attachTypeGuardMeta)(o,{itemGuard:r})}po.isShape=yi;po.isNestedType=yi});var aL=_(Mf=>{"use strict";Object.defineProperty(Mf,"__esModule",{value:!0});Mf.isObjectWith=eG;var QB=dd();function eG(e){return(0,QB.isType)(e)}});var lL=_(Nf=>{"use strict";Object.defineProperty(Nf,"__esModule",{value:!0});Nf.isObject=rG;var tG=dd();function rG(e){return(0,tG.isType)(e)}});var cL=_(zf=>{"use strict";Object.defineProperty(zf,"__esModule",{value:!0});zf.guardWithTolerance=oG;function oG(e,t,r){return t(e,r),e}});var dL=_(jf=>{"use strict";Object.defineProperty(jf,"__esModule",{value:!0});jf.isBranded=sG;var nG=O();function sG(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,nG.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var uL=_(ud=>{"use strict";Object.defineProperty(ud,"__esModule",{value:!0});ud.BrandSymbols=void 0;ud.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var pL=_(pd=>{"use strict";Object.defineProperty(pd,"__esModule",{value:!0});pd.isAny=void 0;var iG=function(e){return!0};pd.isAny=iG});var Si=_(Df=>{"use strict";Object.defineProperty(Df,"__esModule",{value:!0});Df.reportTypeGuardError=lG;var aG=O();function lG(e,t,r){e&&e.callbackOnError((0,aG.generateTypeGuardError)(t,e.identifier,r))}});var mL=_(md=>{"use strict";Object.defineProperty(md,"__esModule",{value:!0});md.isBoolean=void 0;var cG=Si(),dG=function(t,r){return typeof t!="boolean"?((0,cG.reportTypeGuardError)(r,t,"boolean"),!1):!0};md.isBoolean=dG});var gL=_(gd=>{"use strict";Object.defineProperty(gd,"__esModule",{value:!0});gd.isDate=void 0;var uG=O(),pG=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,uG.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};gd.isDate=pG});var $f=_(fd=>{"use strict";Object.defineProperty(fd,"__esModule",{value:!0});fd.isNumber=void 0;var mG=Si(),gG=function(t,r){return typeof t!="number"||isNaN(t)?((0,mG.reportTypeGuardError)(r,t,"number"),!1):!0};fd.isNumber=gG});var fL=_(hd=>{"use strict";Object.defineProperty(hd,"__esModule",{value:!0});hd.isString=void 0;var fG=Si(),hG=function(t,r){return typeof t!="string"?((0,fG.reportTypeGuardError)(r,t,"string"),!1):!0};hd.isString=hG});var hL=_(yd=>{"use strict";Object.defineProperty(yd,"__esModule",{value:!0});yd.isUnknown=void 0;var yG=function(e){return!0};yd.isUnknown=yG});var yL=_(Sd=>{"use strict";Object.defineProperty(Sd,"__esModule",{value:!0});Sd.isFunction=void 0;var SG=O(),AG=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,SG.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Sd.isFunction=AG});var AL=_(Ad=>{"use strict";Object.defineProperty(Ad,"__esModule",{value:!0});Ad.isFile=void 0;var SL=O(),bG=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,SL.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,SL.generateTypeGuardError)(e,t.identifier,"File")),!1)};Ad.isFile=bG});var PL=_(bd=>{"use strict";Object.defineProperty(bd,"__esModule",{value:!0});bd.isFileList=void 0;var bL=O(),PG=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,bL.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,bL.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};bd.isFileList=PG});var vL=_(Pd=>{"use strict";Object.defineProperty(Pd,"__esModule",{value:!0});Pd.isBlob=void 0;var wL=O(),wG=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,wL.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,wL.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Pd.isBlob=wG});var WL=_(wd=>{"use strict";Object.defineProperty(wd,"__esModule",{value:!0});wd.isFormData=void 0;var _L=O(),vG=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,_L.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,_L.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};wd.isFormData=vG});var kL=_(vd=>{"use strict";Object.defineProperty(vd,"__esModule",{value:!0});vd.isURL=void 0;var LL=O(),_G=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,LL.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,LL.generateTypeGuardError)(e,t.identifier,"URL")),!1)};vd.isURL=_G});var CL=_(_d=>{"use strict";Object.defineProperty(_d,"__esModule",{value:!0});_d.isURLSearchParams=void 0;var EL=O(),WG=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,EL.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,EL.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};_d.isURLSearchParams=WG});var RL=_(Wd=>{"use strict";Object.defineProperty(Wd,"__esModule",{value:!0});Wd.isMap=void 0;var LG=O(),kG=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,LG.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Wd.isMap=kG});var xL=_(Ld=>{"use strict";Object.defineProperty(Ld,"__esModule",{value:!0});Ld.isSet=void 0;var EG=O(),CG=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,EG.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Ld.isSet=CG});var TL=_(Hf=>{"use strict";Object.defineProperty(Hf,"__esModule",{value:!0});Hf.isIndexSignature=xG;var RG=O();function xG(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,RG.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let g=s[d],b=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),h=t(g,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return b&&h})}}});var IL=_(kd=>{"use strict";Object.defineProperty(kd,"__esModule",{value:!0});kd.isError=void 0;var TG=Si(),IG=function(t,r){return t instanceof Error?!0:((0,TG.reportTypeGuardError)(r,t,"Error"),!1)};kd.isError=IG});var Uf=_(Ff=>{"use strict";Object.defineProperty(Ff,"__esModule",{value:!0});Ff.isArrayWithEachItem=NG;var OG=O(),MG=xt();function NG(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,OG.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,MG.attachTypeGuardMeta)(t,{itemGuard:e})}});var Bf=_(Ed=>{"use strict";Object.defineProperty(Ed,"__esModule",{value:!0});Ed.isNonEmptyArray=void 0;var zG=O(),jG=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,zG.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Ed.isNonEmptyArray=jG});var OL=_(Gf=>{"use strict";Object.defineProperty(Gf,"__esModule",{value:!0});Gf.isNonEmptyArrayWithEachItem=HG;var DG=Uf(),$G=Bf();function HG(e){return function(t,r){return(0,DG.isArrayWithEachItem)(e)(t,r)&&(0,$G.isNonEmptyArray)(t,r)}}});var NL=_(Vf=>{"use strict";Object.defineProperty(Vf,"__esModule",{value:!0});Vf.isTuple=FG;var ML=O();function FG(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,ML.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,ML.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var zL=_(qf=>{"use strict";Object.defineProperty(qf,"__esModule",{value:!0});qf.isObjectWithEachItem=BG;var UG=O();function BG(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,UG.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var jL=_(Kf=>{"use strict";Object.defineProperty(Kf,"__esModule",{value:!0});Kf.isPartialOf=VG;var GG=Rr();function VG(e){return function(t,r){if(!(0,GG.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var DL=_(Jf=>{"use strict";Object.defineProperty(Jf,"__esModule",{value:!0});Jf.isPick=KG;var qG=Rr();function KG(e,...t){return function(r,o){if(!(0,qG.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var $L=_(Yf=>{"use strict";Object.defineProperty(Yf,"__esModule",{value:!0});Yf.isOmit=YG;var JG=Rr();function YG(e,...t){return function(r,o){if(!(0,JG.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),g=p.indexOf(" ("),b=g>=0?p.slice(0,g):p;if(a.has(b))return!1;let h=b.startsWith(s+".")&&b.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var HL=_(Cd=>{"use strict";Object.defineProperty(Cd,"__esModule",{value:!0});Cd.isNonEmptyString=void 0;var XG=O(),ZG=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,XG.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Cd.isNonEmptyString=ZG});var FL=_(Rd=>{"use strict";Object.defineProperty(Rd,"__esModule",{value:!0});Rd.isNonNegativeNumber=void 0;var QG=O(),e2=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,QG.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Rd.isNonNegativeNumber=e2});var UL=_(xd=>{"use strict";Object.defineProperty(xd,"__esModule",{value:!0});xd.isPositiveNumber=void 0;var t2=O(),r2=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,t2.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};xd.isPositiveNumber=r2});var BL=_(Td=>{"use strict";Object.defineProperty(Td,"__esModule",{value:!0});Td.isNonPositiveNumber=void 0;var o2=O(),n2=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,o2.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Td.isNonPositiveNumber=n2});var GL=_(Id=>{"use strict";Object.defineProperty(Id,"__esModule",{value:!0});Id.isNegativeNumber=void 0;var s2=O(),i2=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,s2.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Id.isNegativeNumber=i2});var VL=_(Od=>{"use strict";Object.defineProperty(Od,"__esModule",{value:!0});Od.isInteger=void 0;var a2=O(),l2=$f(),c2=function(e,t){return!(0,l2.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,a2.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Od.isInteger=c2});var qL=_(Md=>{"use strict";Object.defineProperty(Md,"__esModule",{value:!0});Md.isPositiveInteger=void 0;var d2=O(),u2=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,d2.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};Md.isPositiveInteger=u2});var KL=_(Nd=>{"use strict";Object.defineProperty(Nd,"__esModule",{value:!0});Nd.isNegativeInteger=void 0;var p2=O(),m2=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,p2.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Nd.isNegativeInteger=m2});var JL=_(zd=>{"use strict";Object.defineProperty(zd,"__esModule",{value:!0});zd.isNonNegativeInteger=void 0;var g2=O(),f2=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,g2.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};zd.isNonNegativeInteger=f2});var YL=_(jd=>{"use strict";Object.defineProperty(jd,"__esModule",{value:!0});jd.isNonPositiveInteger=void 0;var h2=O(),y2=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,h2.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};jd.isNonPositiveInteger=y2});var XL=_($d=>{"use strict";Object.defineProperty($d,"__esModule",{value:!0});$d.isNumeric=void 0;var Dd=O(),S2=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Dd.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Dd.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Dd.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Dd.generateTypeGuardError)(e,t.identifier,"number key")),!1};$d.isNumeric=S2});var ZL=_(Hd=>{"use strict";Object.defineProperty(Hd,"__esModule",{value:!0});Hd.isBooleanLike=void 0;var Xf=O(),A2=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Xf.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Xf.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Hd.isBooleanLike=A2});var QL=_(Fd=>{"use strict";Object.defineProperty(Fd,"__esModule",{value:!0});Fd.isDateLike=void 0;var Ai=O(),b2=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Ai.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Ai.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Ai.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Ai.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Ai.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Fd.isDateLike=b2});var ek=_(Ud=>{"use strict";Object.defineProperty(Ud,"__esModule",{value:!0});Ud.isBigInt=void 0;var P2=O(),w2=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,P2.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Ud.isBigInt=w2});var Qf=_(Zf=>{"use strict";Object.defineProperty(Zf,"__esModule",{value:!0});Zf.isOneOf=v2;var tk=En();function v2(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,tk.stringify)(t)}) must be one of following values ${e.map(tk.stringify).join(" | ")}`),o}}});var rk=_(eh=>{"use strict";Object.defineProperty(eh,"__esModule",{value:!0});eh.isOneOfTypes=L2;var _2=En(),W2=mi();function L2(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,_2.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,W2.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var ok=_(th=>{"use strict";Object.defineProperty(th,"__esModule",{value:!0});th.isIntersectionOf=k2;function k2(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var nk=_(rh=>{"use strict";Object.defineProperty(rh,"__esModule",{value:!0});rh.isExtensionOf=E2;function E2(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var sk=_(oh=>{"use strict";Object.defineProperty(oh,"__esModule",{value:!0});oh.isNullOr=R2;var C2=xt();function R2(e){function t(r,o){return r===null?!0:e(r,o)}return(0,C2.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var ik=_(nh=>{"use strict";Object.defineProperty(nh,"__esModule",{value:!0});nh.isUndefinedOr=T2;var x2=xt();function T2(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,x2.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var ak=_(sh=>{"use strict";Object.defineProperty(sh,"__esModule",{value:!0});sh.isNilOr=O2;var I2=xt();function O2(e){function t(r,o){return r==null?!0:e(r,o)}return(0,I2.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var lk=_(ih=>{"use strict";Object.defineProperty(ih,"__esModule",{value:!0});ih.isAsserted=M2;function M2(e){return!0}});var ck=_(ah=>{"use strict";Object.defineProperty(ah,"__esModule",{value:!0});ah.isEnum=z2;var N2=Qf();function z2(e){return function(t,r){return(0,N2.isOneOf)(...Object.values(e))(t,r)}}});var dk=_(lh=>{"use strict";Object.defineProperty(lh,"__esModule",{value:!0});lh.isEqualTo=$2;var j2=O(),D2=En();function $2(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,j2.generateTypeGuardError)(t,r.identifier,`equal to ${(0,D2.stringify)(e)}`)),!1):!0}}});var uk=_(Bd=>{"use strict";Object.defineProperty(Bd,"__esModule",{value:!0});Bd.isRegex=void 0;var H2=O(),F2=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,H2.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Bd.isRegex=F2});var mk=_(ch=>{"use strict";Object.defineProperty(ch,"__esModule",{value:!0});ch.isPattern=U2;var pk=O();function U2(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,pk.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,pk.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var gk=_(dh=>{"use strict";Object.defineProperty(dh,"__esModule",{value:!0});dh.by=B2;function B2(e){return function(t){return e(t,null)}}});var fk=_(uh=>{"use strict";Object.defineProperty(uh,"__esModule",{value:!0});uh.toNumber=G2;function G2(e){return typeof e=="number"?e:Number(e)}});var hk=_(ph=>{"use strict";Object.defineProperty(ph,"__esModule",{value:!0});ph.toDate=V2;function V2(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var yk=_(mh=>{"use strict";Object.defineProperty(mh,"__esModule",{value:!0});mh.toBoolean=q2;function q2(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var Sk=_(Gd=>{"use strict";Object.defineProperty(Gd,"__esModule",{value:!0});Gd.isSymbol=void 0;var K2=O(),J2=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,K2.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Gd.isSymbol=J2});var bi=_(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var Y2=dd();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return Y2.isType}});var gh=iL();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return gh.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return gh.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return gh.isNestedType}});var X2=aL();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return X2.isObjectWith}});var Z2=lL();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return Z2.isObject}});var Q2=cL();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return Q2.guardWithTolerance}});var e5=dL();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return e5.isBranded}});var t5=uL();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return t5.BrandSymbols}});var r5=pL();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return r5.isAny}});var o5=mL();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return o5.isBoolean}});var n5=gL();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return n5.isDate}});var s5=xf();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return s5.isDefined}});var i5=ad();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return i5.isNil}});var a5=$f();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return a5.isNumber}});var l5=fL();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return l5.isString}});var c5=hL();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return c5.isUnknown}});var d5=yL();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return d5.isFunction}});var u5=AL();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return u5.isFile}});var p5=PL();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return p5.isFileList}});var m5=vL();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return m5.isBlob}});var g5=WL();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return g5.isFormData}});var f5=kL();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return f5.isURL}});var h5=CL();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return h5.isURLSearchParams}});var y5=RL();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return y5.isMap}});var S5=xL();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return S5.isSet}});var A5=TL();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return A5.isIndexSignature}});var b5=IL();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return b5.isError}});var P5=Uf();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return P5.isArrayWithEachItem}});var w5=Bf();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return w5.isNonEmptyArray}});var v5=OL();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return v5.isNonEmptyArrayWithEachItem}});var _5=NL();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return _5.isTuple}});var W5=Rr();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return W5.isNonNullObject}});var L5=zL();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return L5.isObjectWithEachItem}});var k5=jL();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return k5.isPartialOf}});var E5=DL();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return E5.isPick}});var C5=$L();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return C5.isOmit}});var R5=HL();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return R5.isNonEmptyString}});var x5=FL();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return x5.isNonNegativeNumber}});var T5=UL();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return T5.isPositiveNumber}});var I5=BL();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return I5.isNonPositiveNumber}});var O5=GL();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return O5.isNegativeNumber}});var M5=VL();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return M5.isInteger}});var N5=qL();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return N5.isPositiveInteger}});var z5=KL();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return z5.isNegativeInteger}});var j5=JL();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return j5.isNonNegativeInteger}});var D5=YL();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return D5.isNonPositiveInteger}});var $5=XL();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return $5.isNumeric}});var H5=ZL();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return H5.isBooleanLike}});var F5=QL();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return F5.isDateLike}});var U5=ek();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return U5.isBigInt}});var B5=Qf();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return B5.isOneOf}});var G5=rk();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return G5.isOneOfTypes}});var V5=ok();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return V5.isIntersectionOf}});var q5=nk();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return q5.isExtensionOf}});var K5=sk();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return K5.isNullOr}});var J5=ik();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return J5.isUndefinedOr}});var Y5=ak();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return Y5.isNilOr}});var X5=lk();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return X5.isAsserted}});var Z5=ck();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return Z5.isEnum}});var Q5=dk();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return Q5.isEqualTo}});var eV=uk();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return eV.isRegex}});var tV=mk();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return tV.isPattern}});var rV=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return rV.generateTypeGuardError}});var oV=gk();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return oV.by}});var nV=fk();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return nV.toNumber}});var sV=hk();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return sV.toDate}});var iV=yk();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return iV.toBoolean}});var aV=Sk();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return aV.isSymbol}})});var xn,Ak,lV,bk,Pk=l(()=>{"use strict";xn=m(require("node:path")),Ak=require("node:url"),lV=()=>!0,bk=()=>{if(lV()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?xn.default.dirname(xn.default.resolve(e)):xn.default.dirname(xn.default.resolve(__filename))}return xn.default.dirname((0,Ak.fileURLToPath)(__agentWitchImportMetaUrl))}});var fh,wk,z,vk,cV,xr,k,Vd,Qt,_k,qd,Tn,Kd,Pe,ut,hh,pt,yh,N,Sh=l(()=>{"use strict";fh=m(require("node:fs")),wk=m(require("node:os")),z=m(require("node:path")),vk=m(bi());$e();Pk();Bc();Bc();cV=bk(),xr=e=>e.trim().toLowerCase(),k=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return z.default.resolve(e);let t=z.default.resolve(cV),r=z.default.basename(t),o=z.default.basename(z.default.dirname(t));return r===kf&&(o===Rt||o===Xt)?z.default.dirname(t):r===Rt||r===Xt?t:z.default.join(wk.default.homedir(),Rt)},Vd=(e=k())=>z.default.join(e,kf),Qt=(e=k())=>z.default.join(Vd(e),DW),_k=(e,t,r)=>t!==null?z.default.join(e,Zt,t,r):z.default.join(e,r),qd=e=>_k(e.installDir,e.profileEmail,di),Tn=e=>_k(e.installDir,e.profileEmail,dt),Kd=e=>e.profileEmail!==null?z.default.join(e.installDir,Zt,e.profileEmail,Cr):z.default.join(e.installDir,Cr),Pe=(e=k())=>ui(e),ut=(e=k())=>lo(e)?Dc:jc,hh=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return xr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?xr(t):null},pt=(e=k())=>{let t=z.default.join(e,Lf);if(!fh.default.existsSync(t))return null;try{let r=JSON.parse(fh.default.readFileSync(t,"utf8"));if((0,vk.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return xr(r.email)}catch{return null}return null},yh=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?xr(r):null}let t=hh();return t!==null?t:pt()},N=e=>{let t=k(),r=Vd(t),o=Qt(t),n=yh(e);if(n!==null){let b=z.default.join(t,Zt,n),h=z.default.join(b,$c),y=z.default.join(b,di),u=z.default.join(b,dt),S=z.default.join(b,Uc),A=z.default.join(b,Cr),f=z.default.join(b,dt,Ln),w=z.default.join(b,dt,kn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:u,mainLogPath:f,errorLogPath:w,reportsDir:S,deviceKeypairPath:A,configPath:z.default.join(b,"config.json"),harnessRootDir:h,harnessManifestPath:z.default.join(h,Fc),harnessSetsDir:z.default.join(h,Hc)}}let s=z.default.join(t,$c),i=z.default.join(t,di),a=z.default.join(t,dt),c=z.default.join(t,Uc),d=z.default.join(t,Cr),p=z.default.join(t,dt,Ln),g=z.default.join(t,dt,kn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:g,reportsDir:c,deviceKeypairPath:d,configPath:z.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:z.default.join(s,Fc),harnessSetsDir:z.default.join(s,Hc)}}});var Ah,Wk,dV,uV,Lk,bh,kk=l(()=>{"use strict";Ah=m(require("node:fs")),Wk=m(require("node:path"));$e();Sh();dV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uV=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Lk=e=>{let t=Wk.default.join(e,ao.wakePort);if(!Ah.default.existsSync(t))return null;try{let r=JSON.parse(Ah.default.readFileSync(t,"utf8"));if(dV(r)&&uV(r.wakePort))return r.wakePort}catch{return null}return null},bh=(e=k())=>Lk(e)??ut(e)});var K=l(()=>{"use strict";Sh();kk()});var Ph,wh,Jd=l(()=>{"use strict";Ph=new Set(["","loginwindow","_mbsetupuser","root"]),wh=5e3});var Ek,hV,Ck,vh,_h=l(()=>{"use strict";Ek=require("node:child_process");Jd();hV=e=>e.trim().toLowerCase(),Ck=e=>e==null?!1:!Ph.has(hV(e)),vh=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Ek.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return Ck(t)?t:null}catch{return null}}});var xk,Rk,mt,Pi=l(()=>{"use strict";xk=m(require("node:os"));_h();Rk=e=>e.trim().toLowerCase(),mt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?vh():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??xk.default.userInfo().username;return Rk(r)===Rk(o)}});var Tk,Ik,mo,Ok=l(()=>{"use strict";Tk=require("node:child_process"),Ik=m(require("node:fs"));K();Pi();mo=(e=k())=>{let t=Qt(e);if(!Ik.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!mt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=pt(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,Tk.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var Mk,wi,Yd=l(()=>{"use strict";Mk=require("node:child_process"),wi=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,Mk.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Xd,Wh,Nk,ee,Zd,vi=l(()=>{"use strict";Xd=m(require("node:fs")),Wh=m(require("node:path"));K();$e();Nk=e=>{let t=Wh.default.join(e,Zt);return Xd.default.existsSync(t)?Xd.default.readdirSync(t).filter(r=>Xd.default.statSync(Wh.default.join(t,r)).isDirectory()).map(r=>xr(r)).toSorted():[]},ee=(e=k())=>{let t=Pe(e);return[{profileEmail:Nk(e)[0]??null,launchAgentLabel:t}]},Zd=(e=k())=>Nk(e)});var Lh,zk,jk,yV,er,Qd=l(()=>{"use strict";Lh=m(require("node:fs")),zk=m(require("node:os")),jk=m(require("node:path"));K();vi();yV=()=>jk.default.join(zk.default.homedir(),"Library","LaunchAgents"),er=(e=k())=>{let t=Pe(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ee(e))r.add(n.launchAgentLabel);let o=yV();if(Lh.default.existsSync(o))for(let n of Lh.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var Dk,_i,$k=l(()=>{"use strict";K();Yd();Qd();vi();Dk=(e=k())=>{let t=new Set(ee(e).map(r=>r.launchAgentLabel));return er(e).filter(r=>!t.has(r))},_i=(e=k())=>{for(let t of Dk(e))wi(t)}});var Wi,kh=l(()=>{"use strict";K();Yd();Qd();Wi=(e=k())=>{for(let t of er(e))wi(t)}});var Hk,Fk,SV,go,Uk=l(()=>{"use strict";Hk=require("node:child_process"),Fk=require("node:util"),SV=(0,Fk.promisify)(Hk.execFile),go=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await SV("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var fo,AV,Eh,Ch=l(()=>{"use strict";fo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AV=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,Eh=e=>{let t=e.pathValue??AV(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${fo(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${fo(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${fo(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${fo(e.homeDir)}</string>
    <key>PATH</key>
    <string>${fo(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${fo(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${fo(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var eu,Rh=l(()=>{"use strict";eu=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var ho,xh,Li,bV,PV,wV,Bk,tr,Th=l(()=>{"use strict";ho=m(require("node:fs")),xh=m(require("node:os")),Li=m(require("node:path"));$e();K();Ch();Rh();bV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),PV=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,wV=e=>{let t=Li.default.join(e,ao.wakePort);if(!ho.default.existsSync(t))return ut(e);try{let r=JSON.parse(ho.default.readFileSync(t,"utf8"));if(bV(r)&&PV(r.wakePort))return r.wakePort}catch{return ut(e)}return ut(e)},Bk=(e,t=xh.default.homedir())=>Li.default.join(t,"Library","LaunchAgents",`${e}.plist`),tr=e=>{let t=e.installDir??k(),r=e.homeDir??xh.default.homedir(),o=Bk(e.launchAgentLabel,r),n=ho.default.existsSync(o)?ho.default.readFileSync(o,"utf8"):null;if(n!==null&&eu(n))return{ok:!0,rewritten:!1,plistPath:o};let s=Eh({launchAgentLabel:e.launchAgentLabel,runPath:Li.default.join(t,jW,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??wV(t)});if(!eu(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{ho.default.mkdirSync(Li.default.dirname(o),{recursive:!0}),ho.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var Vk,qk,Kk,ki,vV,_V,Gk,Ce,Ih=l(()=>{"use strict";Vk=require("node:child_process"),qk=m(require("node:fs")),Kk=require("node:util");K();Th();Pi();ki=(0,Kk.promisify)(Vk.execFile),vV=async e=>{try{return await ki("launchctl",["print",e]),!0}catch{return!1}},_V=async(e,t,r)=>{await vV(t)&&await ki("launchctl",["bootout",t]).catch(()=>{}),await ki("launchctl",["bootstrap",e,r]),await ki("launchctl",["enable",t])},Gk=async e=>{try{return await ki("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Ce=async(e,t=k())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!mt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=tr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await Gk(n))return{ok:!0};let i=s.plistPath;if(!qk.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await _V(o,n,i),await Gk(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var yo,Jk=l(()=>{"use strict";K();Ih();vi();yo=async(e=k())=>{let t=[];for(let r of ee(e))(await Ce(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var qe,rr,Yk=l(()=>{"use strict";kh();Pi();Jd();qe=e=>{mt()||(Wi(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},rr=(e,t=wh)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{mt()||e()},t);return()=>{clearInterval(r)}}});var te=l(()=>{"use strict";GW();Ok();Yd();$k();kh();Qd();Pi();Uk();Jk();Ih();Th();Rh();Ch();vi();_h();Jd();Yk()});var Oh=l(()=>{"use strict";te()});var Xk,Zk,tu,Qk,In,eE,tE,So=l(()=>{"use strict";Xk=".agent-witch",Zk="memory",tu="project.json",Qk="chunks.ndjson",In="runs.ndjson",eE="reports",tE=".json"});var rE=l(()=>{"use strict";So()});var oE,ru,Mh=l(()=>{"use strict";oE=m(require("node:path"));rE();ru=(e,t)=>oE.default.join(e.trim(),`${t.trim()}${tE}`)});var Ei,nE,sE=l(()=>{"use strict";Ei="agent-witch.js",nE="command"});var ou=l(()=>{"use strict";sE()});var Ao,iE,aE=l(()=>{"use strict";ou();Ao=e=>`'${e.replace(/'/g,"'\\''")}'`,iE=e=>{let t=`${e.installDir.trim()}/${"app"}/${Ei}`,r=[Ao("node"),Ao(t),"report","write","--key",Ao(e.reportKey.trim()),"--agent-run-id",Ao(e.agentRunId.trim()),"--status",Ao(e.status),"--summary",Ao(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Ao(e.details.trim())),r.join(" ")}});var Tt,lE,WV,Nh,nu=l(()=>{"use strict";Mh();aE();Tt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},lE=e=>e===Tt.COMPLETED||e===Tt.FAILED,WV=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Nh=(e,t)=>{let r=ru(t.reportsDir,t.reportKey),o=iE({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Tt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${WV({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Re=l(()=>{"use strict";$e();K()});var Ri,dE,cE,uE,LV,On,kV,pE,xi,Ti,zh,mE,gE,Ii=l(()=>{"use strict";Ri=m(require("node:fs")),dE=m(require("node:path"));nu();Mh();Re();cE=50,uE=e=>{let t=N(),r=ru(t.reportsDir,e);return Ri.default.mkdirSync(dE.default.dirname(r),{recursive:!0}),r},LV=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},On=e=>{let t=uE(e);if(!Ri.default.existsSync(t))return null;try{let r=JSON.parse(Ri.default.readFileSync(t,"utf8"));return LV(r)?r:null}catch{return null}},kV=(e,t)=>{let r=[...e,t];return r.length>cE?r.slice(r.length-cE):r},pE=e=>{let t=uE(e.reportKey);Ri.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},xi=e=>{let t=On(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:kV(t?.history??[],o)};return pE(n),n},Ti=e=>{let t=On(e.reportKey);return t!==null?t:xi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Tt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},zh=(e,t)=>{let r=t.trim();if(r.length===0)return On(e);let o=On(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return pE(s),s},mE=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},gE=e=>{if(e===null||!lE(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Tt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var EV,CV,Oi,fE,su,jh=l(()=>{"use strict";nu();Ii();EV=new Set(Object.values(Tt)),CV=e=>EV.has(e),Oi=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},fE=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},su=e=>{if(e[0]!=="write")return fE(),1;let r=Oi(e,"--key"),o=Oi(e,"--agent-run-id"),n=Oi(e,"--status"),s=Oi(e,"--summary"),i=Oi(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!CV(n)?(fE(),1):(xi({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var Ke,bo=l(()=>{"use strict";Ke=()=>!0});var Dh,hE,Po,iu=l(()=>{"use strict";Dh=m(require("node:path")),hE=require("node:url");bo();Po=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Dh.default.resolve(t);return Ke()?r===Dh.default.resolve(__filename):e===void 0?!1:r===(0,hE.fileURLToPath)(e)}});var au,Mn,TV,fee,Nn=l(()=>{"use strict";au="agent-witch.js",Mn="deps.tar.gz",TV="install.sh",fee={mainScript:`app/${au}`,depsArchive:`app/${Mn}`,installShell:TV}});var bE=l(()=>{"use strict";Nn()});var PE=l(()=>{"use strict";Nn();bE()});var Mi,Hh,lu,IV,Ni,xe,jn,zi,ji,wo,Fh=l(()=>{"use strict";Mi=m(require("node:fs")),Hh=m(require("node:path"));PE();K();lu="install-version.json",IV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ni=(e=k())=>Hh.default.join(e,lu),xe=(e=k())=>{let t=Ni(e);if(!Mi.default.existsSync(t))return null;try{let r=JSON.parse(Mi.default.readFileSync(t,"utf8"));return!IV(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},jn=(e,t=k())=>{let r=Ni(t);Mi.default.mkdirSync(Hh.default.dirname(r),{recursive:!0}),Mi.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},zi=(e=k())=>xe(e)?.bundleVersion??"240",ji=(e,t)=>{let r=xe(e);if(r!==null)return r;let o={bundleVersion:"240",appOrigin:t,updatedAt:new Date().toISOString()};return jn(o,e),o},wo=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var wE,vo,Uh,Bh,Gh,cu,It,_o,Vh=l(()=>{"use strict";wE=require("node:crypto"),vo=m(require("node:fs")),Uh=m(require("node:path"));K();Bh="self-update-log.ndjson",Gh=100,cu=(e=k())=>{let t=N(),r=t.installDir===e?t.logsDir:Tn({installDir:e,profileEmail:t.profileEmail});return Uh.default.join(r,Bh)},It=(e,t=k())=>{let r={id:(0,wE.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=cu(t);vo.default.mkdirSync(Uh.default.dirname(o),{recursive:!0});let n=vo.default.existsSync(o)?vo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Gh+1)),JSON.stringify(r)];return vo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},_o=(e=20,t=k())=>{let r=cu(t);if(!vo.default.existsSync(r))return[];let o=vo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var qh,Tee,Kh=l(()=>{"use strict";Nn();qh="deps",Tee=`${"app"}/${Mn}`});var vE=l(()=>{"use strict";Kh()});var _E,Tr,Wo,WE,Jh,Yh,LE=l(()=>{"use strict";_E=require("node:child_process"),Tr=m(require("node:fs")),Wo=m(require("node:path"));Nn();Kh();WE=e=>Wo.default.join(e,"app",qh),Jh=e=>{let t=Wo.default.join(e,"app"),r=Wo.default.join(t,Mn);Tr.default.existsSync(r)&&(Tr.default.rmSync(WE(e),{recursive:!0,force:!0}),Tr.default.mkdirSync(t,{recursive:!0}),(0,_E.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Tr.default.rmSync(r,{force:!0}))},Yh=e=>{Tr.default.rmSync(Wo.default.join(e,"node_modules"),{recursive:!0,force:!0}),Tr.default.rmSync(Wo.default.join(e,"package.json"),{force:!0}),Tr.default.rmSync(Wo.default.join(e,"package-lock.json"),{force:!0})}});var kE=l(()=>{"use strict";vE();LE()});var gt,du,EE=l(()=>{"use strict";gt="https://www.agentwitch.com",du="wss://www.agentwitch.com/api/agent-witch/ws"});var Di,or,CE=l(()=>{"use strict";Di="127.0.0.1",or=`http://${Di}:43347`});var Ot=l(()=>{"use strict";EE();CE()});var $i,uu,RE,Zh,OV,xE,ty,TE,ft,Hi,Fi,ry,Qh,ey,Ui,oy,ny,sy,Dn=l(()=>{"use strict";$i=m(require("node:fs")),uu=m(require("node:path")),RE="active-writer-work.json",Zh=new Set,OV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xE=e=>e.profileEmail===null?uu.default.join(e.installDir,RE):uu.default.join(e.installDir,"profiles",e.profileEmail,RE),ty=e=>{let t=xE(e);if(!$i.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse($i.default.readFileSync(t,"utf8"));return!OV(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},TE=(e,t)=>{let r=xE(e);$i.default.mkdirSync(uu.default.dirname(r),{recursive:!0}),$i.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},ft=e=>ty(e).activeCount>0,Hi=e=>{let t=ty(e);TE(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},Fi=e=>{let t=ty(e),r=Math.max(0,t.activeCount-1);if(TE(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of Zh)o()},ry=e=>(Zh.add(e),()=>{Zh.delete(e)}),Qh=null,ey=null,Ui=e=>{Qh=e},oy=e=>{ey=e},ny=()=>{let e=Qh;return Qh=null,e},sy=()=>{let e=ey;return ey=null,e}});var we,pu=l(()=>{"use strict";we=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var $n,mu,Bi,iy=l(()=>{"use strict";$n="qwen2.5:7b",mu="nomic-embed-text",Bi="Install Ollama from https://ollama.com/download"});var Gi,ay,gu=l(()=>{"use strict";iy();Gi=()=>`
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
    echo "Ollama is missing. ${Bi}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Bi}" >&2
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
  agent_witch_ensure_ollama_model "${$n}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${mu}" "\${pull_log}"
}
`,ay=()=>`
${Gi()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var IE,MV,fu,ly=l(()=>{"use strict";IE=require("node:child_process");K();gu();MV=e=>new Promise(t=>{let r=(0,IE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:k()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),fu=async(e=MV)=>{let t=`${Gi()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var Ir,hu,OE,NV,ME,Fn,zV,jV,DV,Hn,Lo,ko,NE=l(()=>{"use strict";Ir=m(require("node:fs")),hu=m(require("node:path"));kE();te();K();Nn();Ot();Fh();Dn();pu();Vh();ly();OE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),NV=e=>{let t=pt(e),r=t===null?N():N(t);if(!Ir.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Ir.default.readFileSync(r.configPath,"utf8"));return!OE(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},ME=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!OE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},Fn=async e=>(await ME(e))?.bundleVersion??null,zV=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=hu.default.join(t,r);Ir.default.mkdirSync(hu.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());Ir.default.writeFileSync(n,s),r.endsWith(".js")&&Ir.default.chmodSync(n,493)},jV=async()=>{_i(),await yo()},DV=(e,t)=>e!==null?we(e):t??gt,Hn=(e,t)=>({localBundleVersion:t,...e}),Lo=async e=>{let t=k(),r=xe(t),o=r?.bundleVersion??null,n=await fu();It({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=NV(t),i=DV(s,r?.appOrigin);if(i===null){let d=Hn({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return It({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await ME(i);if(a===null){let d=Hn({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return It({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||wo(o,a.bundleVersion))){let d=Hn({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return It({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let b of a.scripts)await zV(i,t,b);let d=hu.default.join(t,au);Ir.default.existsSync(d)&&Ir.default.rmSync(d,{force:!0}),Jh(t),Yh(t),jn({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=N(pt(t));if(ft(p)){let b=Hn({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return It({event:"update_applied",ok:!0,message:b.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),b}await jV();let g=Hn({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return It({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",g=Hn({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return It({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}},ko=()=>{let e=k();return{local:xe(e),logs:_o(20,e)}}});var zE={};Ct(zE,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>lu,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Bi,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>mu,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>$n,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Bh,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Gh,appendAgentWitchSelfUpdateLog:()=>It,buildAgentWitchEnsureOllamaShell:()=>Gi,buildAgentWitchInstallScriptOllama:()=>ay,buildAgentWitchSelfUpdateStatus:()=>ko,ensureAgentWitchInstallVersionRecorded:()=>ji,ensureAgentWitchOllamaInstalled:()=>fu,fetchAgentWitchRemoteInstallBundleVersion:()=>Fn,isRemoteAgentWitchBundleVersionNewer:()=>wo,readAgentWitchInstallVersion:()=>xe,readAgentWitchSelfUpdateLogs:()=>_o,resolveAgentWitchAppOriginFromWsUrl:()=>we,resolveAgentWitchHeartbeatInstallBundleVersion:()=>zi,resolveAgentWitchInstallVersionPath:()=>Ni,resolveAgentWitchSelfUpdateLogPath:()=>cu,runAgentWitchSelfUpdate:()=>Lo,writeAgentWitchInstallVersion:()=>jn});var Mt=l(()=>{"use strict";Fh();Vh();NE();pu();iy();gu();ly()});var cy={};Ct(cy,{buildAgentWitchSelfUpdateStatus:()=>ko,fetchAgentWitchRemoteInstallBundleVersion:()=>Fn,runAgentWitchSelfUpdate:()=>Lo});var dy=l(()=>{"use strict";Mt()});function Un(e){return(0,jE.createHash)("sha256").update(e.trim()).digest("hex")}var jE,uy=l(()=>{"use strict";jE=require("node:crypto")});var Bn,Vi,$V,DE,py,$E=l(()=>{"use strict";Bn=m(require("node:fs")),Vi=m(require("node:path"));uy();Re();$V=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),DE=e=>{if(!Bn.default.existsSync(e))return null;try{let t=JSON.parse(Bn.default.readFileSync(e,"utf8"));return!$V(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Un(t.pairingToken.trim())}catch{return null}},py=(e=k())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(DE(Vi.default.join(e,"config.json")));let n=Vi.default.join(e,Zt);if(!Bn.default.existsSync(n))return t;for(let s of Bn.default.readdirSync(n)){let i=Vi.default.join(n,s);Bn.default.statSync(i).isDirectory()&&o(DE(Vi.default.join(i,"config.json")))}return t}});var my,HE,yu,qi,Ki,HV,FV,UV,FE,ce,de,Su,Nt,ht=l(()=>{"use strict";my=m(require("node:fs")),HE=m(require("node:os")),yu=m(require("node:path")),qi={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Ki=e=>e.trim().length>0,HV=e=>{let t=yu.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},FV=()=>{let e=HE.default.homedir(),t=yu.default.join(e,".local","bin","agent");if(my.default.existsSync(t))return t;let r=yu.default.join(e,".local","bin","cursor-agent");return my.default.existsSync(r)?r:qi.cursorCommand},UV=e=>{let t=e.trim();return!Ki(t)||t===qi.cursorCommand?FV():t},FE=(e,t)=>HV(e)?t:["agent",...t],ce=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",de=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Ki(t)?t.trim():qi.claudeCommand,codexCommand:Ki(r)?r.trim():qi.codexCommand,cursorCommand:UV(o),antigravityCommand:Ki(n)?n.trim():qi.antigravityCommand}},Su=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:FE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Nt=(e,t,r,o)=>{let n=t.trim();if(!Ki(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:FE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var Or,BV,Eo,GV,Gn,Ji=l(()=>{"use strict";Or=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,BV=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:Or(s.inputTokens)+Or(s.outputTokens)+Or(s.cacheReadInputTokens)+Or(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Eo=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=Or(a.input_tokens)+Or(a.cache_creation_input_tokens)+Or(a.cache_read_input_tokens),d=Or(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:BV(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},GV=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),Gn=(e,t)=>{let r=Eo(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??GV(r)}}});var gy,VV,qV,fy,hy=l(()=>{"use strict";gy=e=>e.toLocaleString("en-US"),VV=e=>e<.01?e.toFixed(4):e.toFixed(3),qV=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${VV(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${gy(e.inputTokens)} in / ${gy(e.outputTokens)} out (${gy(e.totalTokens)} total)`,t].join(`
`)},fy=(e,t)=>{if(t===void 0)return e;let r=qV(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Au,yy=l(()=>{"use strict";Au={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Co,Sy,bu,Ay=l(()=>{"use strict";yy();Co="auto",Sy=e=>({value:Co,label:`Auto (${Au[e]})`}),bu={anthropic:[Sy("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[Sy("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[Sy("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Vn,Yi,Pu,qn=l(()=>{"use strict";yy();Ay();Vn=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Co))return t},Yi=(e,t)=>{let r=Vn(t);return r===void 0?Au[e]:r},Pu=e=>{let t=Vn(e);return t===void 0?Co:t}});var wu,KV,JV,vu,UE=l(()=>{"use strict";wu={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},KV=e=>{let t=wu[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?wu["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?wu["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?wu["gemini-2.0-flash"]:null},JV=(e,t,r)=>{let o=KV(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},vu=e=>{let t=JV(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Kn,YV,XV,ZV,_u,BE=l(()=>{"use strict";UE();Kn=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),YV=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Kn(r.input_tokens),n=Kn(r.output_tokens);return o===0&&n===0?null:vu({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},XV=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Kn(r.prompt_tokens),n=Kn(r.completion_tokens);return o===0&&n===0?null:vu({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},ZV=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=Kn(r.promptTokenCount),n=Kn(r.candidatesTokenCount);return o===0&&n===0?null:vu({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},_u=(e,t,r)=>e==="anthropic"?YV(t,r):e==="openai"?XV(t,r):ZV(t,r)});var QV,by,eq,tq,rq,oq,nq,Py,wy=l(()=>{"use strict";qn();BE();QV=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},by=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Yi(e,t.model)},eq=async e=>{let t=by("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=QV(o);n.length>0&&e.onChunk?.(n);let s=_u("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},tq=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},rq=async e=>{let t=by("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=tq(o);n.length>0&&e.onChunk?.(n);let s=_u("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},oq=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},nq=async e=>{let t=by("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=oq(n);s.length>0&&e.onChunk?.(s);let i=_u("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},Py=async e=>{try{return e.provider==="anthropic"?await eq(e):e.provider==="openai"?await rq(e):await nq(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Je,Xi=l(()=>{"use strict";Je=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var GE,sq,Wu,vy=l(()=>{"use strict";GE=m(require("node:path")),sq="writer-api-secrets.json",Wu=e=>GE.default.join(e,sq)});var _y,VE,iq,Mr,He,Nr=l(()=>{"use strict";_y=m(require("node:fs"));qn();vy();VE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),iq=e=>{if(!VE(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Vn(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},Mr=e=>{let t=Wu(e);if(!_y.default.existsSync(t))return{};try{let r=JSON.parse(_y.default.readFileSync(t,"utf8"));if(!VE(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=iq(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},He=(e,t)=>Mr(e)[t]??null});var Te,Zi=l(()=>{"use strict";Te=e=>e==="api"?"api":"cli"});var qE,ve,Ro,nr=l(()=>{"use strict";qE=m(require("node:path"));Xi();Nr();Zi();ve=e=>qE.default.dirname(e),Ro=(e,t)=>{if(Te(e.writerExecutionBackend)!=="api")return!1;let r=Je(t);if(r===null)return!1;let o=ve(e.layout.configPath),n=He(o,r);return n!==null&&n.apiKey.length>0}});var Qi,Wy=l(()=>{"use strict";hy();wy();Xi();Nr();nr();Qi=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Je(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=ve(e.layout.configPath),a=He(i,s);if(a===null){let d=Object.keys(Mr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await Py({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:fy(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var KE,Jn,Ly=l(()=>{"use strict";KE=require("node:child_process");ht();Ji();Wy();nr();Jn=(e,t,r)=>new Promise(o=>{if(!ce(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Ro(e,t)){Qi(e,t,r).then(o);return}let n=Nt(t,r,de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,KE.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=Gn(i.join("")),p=a.join("").trim(),g=[d.output.trim(),p].filter(b=>b.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var JE=l(()=>{"use strict"});var YE=l(()=>{"use strict";hy();Ly();wy();JE();Nr();nr()});var XE,ZE,QE,eC=l(()=>{"use strict";XE="claude",ZE="codex",QE="cursor"});var tC,aq,ky,ea,Lu=l(()=>{"use strict";tC=m(require("node:path"));Ot();$e();aq="ws://localhost:3000/api/agent-witch/ws",ky=e=>e.replace(/\/$/,""),ea=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return ky(t);let r=tC.default.basename(e.installDir);if(r===ci.production)return du;let o=e.configWsUrl?.trim()??"";return r===ci.localhost?o.length>0?ky(o):aq:o.length>0?ky(o):du}});var cq,Ey,Cy=l(()=>{"use strict";eC();Lu();Zi();cq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ey=e=>{if(!cq(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=ea({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??XE,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??ZE,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??QE,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Te(t.writerExecutionBackend),layout:e.layout}}}});var Ry,xy,Ty=l(()=>{"use strict";Ry=m(require("node:fs"));K();Cy();xy=e=>{let t=N(e);if(!Ry.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Ry.default.readFileSync(t.configPath,"utf8")),o=Ey({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var ta,rC=l(()=>{"use strict";ta=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var Iy,dq,Oy,oC=l(()=>{"use strict";Iy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),dq=e=>{if(!Iy(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!Iy(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(g=>{if(!Iy(g))return[];let b=typeof g.itemKey=="string"?g.itemKey.trim():"",h=typeof g.relativePath=="string"?g.relativePath:"",y=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return b.length===0||y.length===0?[]:[{itemKey:b,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},Oy=dq});var nC,uq,ku,My=l(()=>{"use strict";nC=m(require("node:path")),uq=(e,t)=>{let r=t.trim();return nC.default.join(e,"components","store",r.slice(0,2),r)},ku=uq});var sC,pq,Ny,iC=l(()=>{"use strict";sC=m(require("node:fs"));My();pq=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=ku(e.installDir,n.contentSha256);sC.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},Ny=pq});var ra,Yn,mq,zy,gq,jy,Dy=l(()=>{"use strict";ra=m(require("node:fs")),Yn=m(require("node:path"));My();mq=(e,t)=>Yn.default.join(e.installDir,"runs",t,"overlay"),zy=(e,t)=>Yn.default.join(mq(e,t),".cursor"),gq=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=zy(e,t);ra.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=ku(e.installDir,i.contentSha256);if(!ra.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Yn.default.join(n,c):Yn.default.join(n,i.itemKey);ra.default.mkdirSync(Yn.default.dirname(d),{recursive:!0}),ra.default.copyFileSync(a,d)}return{ok:!0}},jy=gq});var $y,aC,fq,oa,lC=l(()=>{"use strict";$y=m(require("node:fs")),aC=m(require("node:path")),fq=(e,t)=>{let r=aC.default.join(e.installDir,"runs",t);$y.default.existsSync(r)&&$y.default.rmSync(r,{recursive:!0,force:!0})},oa=fq});var hq,Hy,cC=l(()=>{"use strict";Dy();hq=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=zy(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},Hy=hq});var Fy,yq,Sq,Aq,bq,Pq,$,dC=l(()=>{"use strict";Fy=m(require("node:fs"));Lu();K();Zi();yq="claude",Sq="codex",Aq="cursor",bq="agy",Pq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=N();if(!Fy.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Fy.default.readFileSync(e.configPath,"utf8"));if(!Pq(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=ea({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Te(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:yq,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:Sq,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:Aq,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:bq,pairingToken:s,layout:e}}catch{return null}}});var Eu,uC,pC=l(()=>{"use strict";Eu=m(require("node:fs"));vy();uC=(e,t)=>{let r=Wu(e);Eu.default.mkdirSync(e,{recursive:!0}),Eu.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Eu.default.chmodSync(r,384)}catch{}}});var na,mC,Cu=l(()=>{"use strict";na=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},mC=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===na(t)}});var sa,wq,Uy,By,gC=l(()=>{"use strict";sa=m(require("node:fs"));Nr();pC();Cu();qn();nr();wq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Uy=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=mC(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Vn(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},By=e=>{let t=ve(e.configPath),r={};if(sa.default.existsSync(e.configPath))try{let n=JSON.parse(sa.default.readFileSync(e.configPath,"utf8"));wq(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,sa.default.mkdirSync(t,{recursive:!0}),sa.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=Uy(Uy(Uy(Mr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);uC(t,o)}});var Ru,Gy=l(()=>{"use strict";Ru={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var Vy,fC=l(()=>{"use strict";Xi();Nr();nr();nr();Vy=(e,t)=>{if(Ro(e,t))return!1;let r=Je(t);if(r===null)return!1;let o=ve(e.layout.configPath),n=He(o,r);return n===null||n.apiKey.trim().length===0}});var hC,qy,Ky=l(()=>{"use strict";hC=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},qy=async e=>{let t=hC(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=hC(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var vq,Jy,yC=l(()=>{"use strict";te();Ty();Ky();vq=1e4,Jy=()=>qy({listProfileEmails:Zd,readConfig:xy,pollIntervalMs:vq,logWaiting:e=>{console.error(e)}})});var ue=l(()=>{"use strict";Ly();YE();Ty();Lu();rC();oC();iC();Dy();lC();cC();Zi();dC();gC();Nr();nr();Cu();qn();Gy();Wy();nr();fC();Xi();Nr();yC();Cy();Ky()});var xu,SC,_q,Wq,AC,Tu,ia,Iu,aa=l(()=>{"use strict";xu=m(require("node:fs")),SC=m(require("node:path")),_q="wake-port.json",Wq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),AC=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Tu=e=>SC.default.join(e,_q),ia=e=>{let t=Tu(e);if(!xu.default.existsSync(t))return null;try{let r=JSON.parse(xu.default.readFileSync(t,"utf8"));if(Wq(r)&&AC(r.wakePort))return r.wakePort}catch{return null}return null},Iu=(e,t)=>{if(!AC(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Tu(e);xu.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Voe,qoe,Koe,yt,bC,la=l(()=>{"use strict";aa();Re();aa();Voe=ut(),qoe=`${Pe()}-wake`,Koe=Pe(),yt=()=>{let e=k(),t=ia(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return ut()},bC=e=>{let t=k();ia(t)===null&&Iu(t,e)}});var PC=l(()=>{"use strict";uy();te();$E();ue();la()});var Yy,ca,da,wC=l(()=>{"use strict";Yy=m(require("node:os"));PC();ca=()=>{let e=ee();return{ok:!0,port:yt(),hostname:Yy.default.hostname(),profileCount:e.length}},da=()=>{let e=ee(),t=$()?.pairingToken.trim()??"",r=t.length>0?Un(t):null,o=py();return{hostname:Yy.default.hostname(),port:yt(),tokenHash:r,tokenHashes:o.length>0?o:r!==null?[r]:[],profiles:e.map(n=>({email:n.profileEmail,launchAgentLabel:n.launchAgentLabel}))}}});var Xy=l(()=>{"use strict";wC()});var vC,_C,WC,Ou,Xn=l(()=>{"use strict";vC="materialization.json",_C="backups",WC=".gitignore",Ou=e=>`harness-set:${e.trim()}`});var LC,kC,Mu,EC=l(()=>{"use strict";LC=m(require("node:crypto")),kC=m(require("node:fs")),Mu=e=>{try{let t=kC.default.readFileSync(e);return LC.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var zr,xo,Lq,CC,Zy,RC=l(()=>{"use strict";zr=m(require("node:fs")),xo=m(require("node:path"));EC();Lq=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=xo.default.join(t,n,o);return zr.default.mkdirSync(xo.default.dirname(s),{recursive:!0}),zr.default.copyFileSync(r,s),xo.default.relative(e,s).replaceAll("\\","/")},CC=e=>{let t=xo.default.join(e.repoRoot,e.repoRelativeDestination),r=Mu(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(zr.default.existsSync(t)){let n=Mu(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=Lq(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return zr.default.mkdirSync(xo.default.dirname(t),{recursive:!0}),zr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return zr.default.mkdirSync(xo.default.dirname(t),{recursive:!0}),zr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},Zy=e=>{let t=Mu(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var Qy,xC,Nu,eS=l(()=>{"use strict";Qy=m(require("node:fs"));Xn();xC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Nu=e=>{if(!Qy.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(Qy.default.readFileSync(e,"utf8"));if(xC(t)&&t.version===1&&xC(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var jr,zu,TC,IC=l(()=>{"use strict";jr=m(require("node:fs")),zu=m(require("node:path"));Xn();TC=e=>{let t=new Set(e.setSlugs.map(s=>Ou(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=zu.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=zu.default.join(e.repoRoot,i.backupPath);jr.default.existsSync(c)?(jr.default.mkdirSync(zu.default.dirname(a),{recursive:!0}),jr.default.copyFileSync(c,a),o.push(s)):jr.default.existsSync(a)&&jr.default.rmSync(a,{force:!0})}else jr.default.existsSync(a)&&jr.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var tS,ju,rS=l(()=>{"use strict";tS=m(require("node:path"));Xn();ju=e=>({ledgerFilePath:tS.default.join(e.metaDirPath,vC),backupsDirPath:tS.default.join(e.metaDirPath,_C)})});var oS,OC,MC=l(()=>{"use strict";oS=m(require("node:path")),OC=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return oS.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return oS.default.posix.join(s,e,n)}});var nS,NC,sS,zC=l(()=>{"use strict";nS=m(require("node:fs")),NC=m(require("node:path")),sS=(e,t)=>{nS.default.mkdirSync(NC.default.dirname(e),{recursive:!0}),nS.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var iS,kq,rt,Zn=l(()=>{"use strict";iS=m(require("node:os")),kq=e=>{let t=e.trim();return t.startsWith("~/")?`${iS.default.homedir()}${t.slice(1)}`:t==="~"?iS.default.homedir():t},rt=kq});var Du,jC,Eq,DC,$C=l(()=>{"use strict";Du=m(require("node:fs")),jC=m(require("node:path"));Xn();So();Eq=`*
!${tu}
`,DC=e=>{let t=jC.default.join(e,WC);Du.default.existsSync(t)||(Du.default.mkdirSync(e,{recursive:!0}),Du.default.writeFileSync(t,Eq))}});var To,ot,Io=l(()=>{"use strict";To=m(require("node:path"));So();Zn();ot=e=>{let t=rt(e),r=To.default.join(t,Xk);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:To.default.join(r,"rag"),memoryDirPath:To.default.join(r,Zk),reportsDirPath:To.default.join(r,eE),metaFilePath:To.default.join(r,tu),ragChunksFilePath:To.default.join(r,"rag",Qk)}}});var zt,FC,Cq,Rq,Ye,aS=l(()=>{"use strict";zt=m(require("node:fs")),FC=m(require("node:path"));So();$C();Io();Cq=(e,t)=>{if(zt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};zt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},Rq=e=>{zt.default.existsSync(e.ragChunksFilePath)||zt.default.writeFileSync(e.ragChunksFilePath,"");let t=FC.default.join(e.memoryDirPath,In);zt.default.existsSync(t)||zt.default.writeFileSync(t,"")},Ye=e=>{let t=ot(e.projectFolderPath);return zt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),zt.default.mkdirSync(t.ragDirPath,{recursive:!0}),zt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),DC(t.metaDirPath),Cq(t,e),Rq(t),{ok:!0,layout:t}}});var UC,BC,GC,VC,$u,Hu=l(()=>{"use strict";UC="components",BC="store",GC="versions",VC="installed.json",$u=e=>`harness-set:${e.trim()}`});var lS,qC,Fu,cS=l(()=>{"use strict";lS=m(require("node:fs")),qC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fu=e=>{if(!lS.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(lS.default.readFileSync(e,"utf8"));if(qC(t)&&t.version===1&&qC(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var pa,Qn,Uu=l(()=>{"use strict";pa=m(require("node:path"));Hu();Qn=e=>{let t=pa.default.join(e,UC);return{componentsRootDir:t,storeDir:pa.default.join(t,BC),versionsDir:pa.default.join(t,GC),installedFilePath:pa.default.join(t,VC)}}});var dS,KC,Bu,Gu,Vu=l(()=>{"use strict";dS=m(require("node:crypto")),KC=m(require("node:fs")),Bu=e=>dS.default.createHash("sha256").update(e,"utf8").digest("hex"),Gu=e=>{try{let t=KC.default.readFileSync(e);return dS.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var uS,JC,YC,XC=l(()=>{"use strict";uS=m(require("node:fs")),JC=m(require("node:path")),YC=(e,t)=>{uS.default.mkdirSync(JC.default.dirname(e),{recursive:!0}),uS.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var pS,mS,ZC,QC=l(()=>{"use strict";pS=m(require("node:fs")),mS=m(require("node:path")),ZC=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=mS.default.join(e,r),n=mS.default.join(o,`${t.versionId}.json`);pS.default.mkdirSync(o,{recursive:!0}),pS.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var qu,eR,tR,rR=l(()=>{"use strict";qu=m(require("node:fs")),eR=m(require("node:path"));Vu();tR=e=>{let t=Bu(e.content),r=eR.default.join(e.storeDir,t);return qu.default.existsSync(r)||(qu.default.mkdirSync(e.storeDir,{recursive:!0}),qu.default.writeFileSync(r,e.content)),t}});var gS,oR,xq,Ku,fS=l(()=>{"use strict";gS=m(require("node:fs")),oR=m(require("node:path"));Hu();cS();Uu();Vu();XC();QC();rR();xq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ku=e=>{let t=Qn(e.installDir),r=$u(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!xq(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=oR.default.join(e.harnessRootDir,a);if(!gS.default.existsSync(c))continue;let d=gS.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Gu(c);if(p!==null){if(Bu(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);tR({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;ZC(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=Fu(t.installedFilePath);YC(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var yS,hS,nR,sR=l(()=>{"use strict";yS=m(require("node:fs"));fS();cS();Uu();hS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nR=e=>{if(!yS.default.existsSync(e.harnessManifestPath))return;let t=Qn(e.installDir),r=Fu(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(yS.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!hS(o)||o.version!==1||!hS(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!hS(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Ku({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var SS,iR,aR,lR=l(()=>{"use strict";SS=m(require("node:fs")),iR=m(require("node:path")),aR=e=>{let t=e.componentId.replaceAll("/","_"),r=iR.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!SS.default.existsSync(r))return null;try{let o=JSON.parse(SS.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Ju,Yu,cR,dR=l(()=>{"use strict";Ju=m(require("node:fs")),Yu=m(require("node:path"));Hu();sR();lR();Uu();Vu();cR=e=>{nR({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Qn(e.layout.installDir),r=$u(e.setSlug),o=aR({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Yu.default.join(t.storeDir,i.contentSha256);if(Ju.default.existsSync(a)&&Gu(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Yu.default.join(e.layout.harnessRootDir,n):Yu.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Ju.default.existsSync(s))return null;try{if(!Ju.default.statSync(s).isFile())return null}catch{return null}return s}});var uR,Tq,Iq,Dr,Xu=l(()=>{"use strict";eS();rS();Io();uR="harness-set:",Tq=e=>{let t=e.trim();if(!t.startsWith(uR))return null;let r=t.slice(uR.length).trim();return r.length>0?r:null},Iq=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=Tq(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Dr=e=>{let t=ot(e),{ledgerFilePath:r}=ju(t),o=Nu(r);return Iq(o)}});var Zu,AS,ma,Oq,sr,ga,es=l(()=>{"use strict";Zu=m(require("node:fs")),AS=m(require("node:os")),ma=m(require("node:path")),Oq=()=>Zu.default.realpathSync(ma.default.resolve(AS.default.homedir())),sr=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?ma.default.join(AS.default.homedir(),t.slice(1)):t,o;try{o=Zu.default.realpathSync(ma.default.resolve(r))}catch{return null}let n=Oq();return o===n||o.startsWith(`${n}${ma.default.sep}`)?o:null},ga=e=>{let t=sr(e);if(t===null)return null;try{if(!Zu.default.statSync(t).isFile())return null}catch{return null}return t}});var bS,PS=l(()=>{"use strict";bS=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var ep,pR,Qu,Mq,fa,wS=l(()=>{"use strict";ep=m(require("node:fs")),pR=m(require("node:path"));Xn();RC();eS();IC();rS();MC();zC();Zn();aS();dR();Xu();es();PS();Qu=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Mq=e=>{if(!ep.default.existsSync(e))return null;try{let t=JSON.parse(ep.default.readFileSync(e,"utf8"));if(Qu(t)&&t.version===1)return t}catch{return null}return null},fa=e=>{let t=[...new Set(e.setSlugs.map(A=>A.trim()).filter(A=>A.length>0))],r=rt(e.projectFolderPath),o=sr(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=ep.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Ye({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=ju(s.layout),d=Dr(o).filter(A=>!t.includes(A)),p=Nu(i),g=0;if(d.length>0){let A=TC({repoRoot:o,setSlugs:d,ledger:p});p=A.ledger,g=A.summary.removedPaths.length}if(t.length===0)return sS(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let b=Mq(e.layout.harnessManifestPath);if(b===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=Qu(b.sets)?b.sets:{},y=0,u=0,S=0;for(let A of t){let f=h[A];if(!Qu(f))return{ok:!1,errorMessage:`Harness set "${A}" is not installed locally.`};let w=typeof f.version=="number"?String(f.version):"1",v=Ou(A),W=Array.isArray(f.items)?f.items:[];for(let L of W){if(!Qu(L))continue;let E=typeof L.path=="string"?L.path.trim():"";if(E.length===0)continue;let x=bS(E);if(x===null)continue;let I=OC(A,x),M=pR.default.posix.join(".cursor",I).replaceAll("\\","/"),B=typeof L.id=="string"?L.id.trim():"",V=cR({layout:e.layout,setSlug:A,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:E,manifestItemId:B});if(V===null)continue;let F=CC({repoRoot:o,backupsDir:a,repoRelativeDestination:M,sourceAbsolutePath:V,componentId:v,versionId:w,ledger:p});if(F.kind==="skipped_unchanged"){u+=1;continue}if(F.kind==="backed_up_user_file"){S+=1,y+=1,p={version:1,entries:{...p.entries,[M]:Zy({componentId:v,versionId:w,sourceAbsolutePath:V,backupPath:F.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[M]:Zy({componentId:v,versionId:w,sourceAbsolutePath:V})}}}}return y===0&&u===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(sS(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:S,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var mR,tp,Nq,zq,jq,Dq,$q,Hq,Fq,Uq,Bq,ha,rp=l(()=>{"use strict";mR=m(require("node:crypto")),tp=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Nq=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},zq=(e,t)=>{let r=Nq(t),o=tp(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},jq=(e,t,r)=>{let o=zq(t,r);return`shared/items/${e}/${o}`},Dq=["rules","skills","commands","instructions","agents"],$q=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),Hq=(e,t)=>[...e.filter(o=>o.id!==t.id),t],Fq=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},Uq=e=>mR.default.createHash("sha256").update(e,"utf8").digest("hex"),Bq=e=>({id:e.id,kind:e.kind,title:e.title,path:jq(e.id,e.kind,e.title),contentSha256:Uq(e.content)}),ha=e=>{let t=new Date().toISOString(),r=e.existingManifest??$q(e.hostname,t),o=tp(e.bundle.slug),n=Fq(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...Dq.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let g=Bq(p);return{files:[...d.files,{relativePath:g.path,content:p.content}],nextItems:Hq(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var $r,gR,op,Gq,Oo,vS=l(()=>{"use strict";$r=m(require("node:fs")),gR=m(require("node:os")),op=m(require("node:path"));rp();Gq=e=>{if(!$r.default.existsSync(e))return null;try{let t=JSON.parse($r.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Oo=e=>{try{let t=Gq(e.layout.harnessManifestPath),r=ha({bundle:e.bundle,hostname:gR.default.hostname(),existingManifest:t});$r.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)$r.default.mkdirSync(op.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=op.default.join(e.layout.harnessRootDir,o.relativePath);$r.default.mkdirSync(op.default.dirname(n),{recursive:!0}),$r.default.writeFileSync(n,o.content)}return $r.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var _S,fR=l(()=>{"use strict";vS();wS();_S=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=Oo({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return fa({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var hR,yR=l(()=>{"use strict";hR=["rule","skill","command","instruction","agent"]});var SR,Vq,qq,jt,WS=l(()=>{"use strict";yR();SR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Vq=e=>typeof e=="string"&&hR.includes(e),qq=e=>{if(!SR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!Vq(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},jt=e=>{if(!SR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=qq(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var AR,Kq,LS,bR=l(()=>{"use strict";AR=require("node:zlib");WS();Kq="x-agent-witch-token",LS=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[Kq]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,AR.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=jt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var ES,kS,Hr,PR=l(()=>{"use strict";ES=m(require("node:fs")),kS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Hr=e=>{if(!ES.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(ES.default.readFileSync(e.harnessManifestPath,"utf8"));if(!kS(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=kS(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!kS(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var np,wR=l(()=>{"use strict";np=()=>"~"});var vR,_R,WR=l(()=>{"use strict";vR=require("node:crypto"),_R=e=>`local-${(0,vR.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var CS,LR=l(()=>{"use strict";CS=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var ya,sp,RS=l(()=>{"use strict";ya=m(require("node:path")),sp=e=>{let t=ya.default.dirname(e),r=ya.default.basename(t);return r==="agents"?ya.default.basename(ya.default.dirname(t)):r}});var Sa,ir,kR,Jq,Yq,Xq,ip,ER,xS=l(()=>{"use strict";Sa=m(require("node:fs")),ir=m(require("node:path"));WR();LR();RS();kR=new Set(["node_modules",".git","dist","build",".next","coverage"]),Jq=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Yq=(e,t)=>{let r=ir.default.basename(t);if(e==="skill"){let o=t.split(ir.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},Xq=e=>{let t=[],r=(n,s)=>{let i;try{i=Sa.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&kR.has(a.name))continue;let c=ir.default.join(n,a.name),d=s?ir.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;CS(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=ir.default.join(e,n);Sa.default.existsSync(s)&&r(s,n)}let o=ir.default.join(e,"skills");return Sa.default.existsSync(o)&&r(o,"skills"),t},ip=e=>{let t=Xq(e);if(t.length===0)return null;let r=ir.default.dirname(e),o=sp(e),n=Jq(o),s=t.map(i=>{let a=CS(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:_R(i.absolutePath),kind:a,title:Yq(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},ER=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Sa.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||kR.has(a.name))continue;let c=ir.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var CR,TS,Zq,IS,RR=l(()=>{"use strict";CR=m(require("node:fs")),TS=m(require("node:path"));xS();es();Zq=e=>{let t=sr(e.trim());if(t===null)return null;if(TS.default.basename(t)===".cursor")return t;let r=TS.default.join(t,".cursor");try{if(CR.default.statSync(r).isDirectory())return sr(r)}catch{return null}return null},IS=e=>{let t=Zq(e.projectPath);if(t===null)return null;let r=ip(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var xR,Qq,ap,OS,TR=l(()=>{"use strict";xR=m(require("node:path"));xS();es();RS();Qq=5,ap=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},OS=e=>{let t=sr(e.scanRoot.trim());if(t===null)return ap(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of ER(t,Qq,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=sr(s);if(i===null)continue;let a=sp(i);ap(e.response,"folder",{cursorDir:i,groupName:a,repoPath:xR.default.dirname(i)});let c=ip(i);c!==null&&(r.push(c),ap(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return ap(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var IR,OR,MR=l(()=>{"use strict";IR=m(require("node:path")),OR=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:IR.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var ze,NR,MS,eK,NS,zS,lp,jS,Aa,zR=l(()=>{"use strict";ze=m(require("node:fs")),NR=m(require("node:os")),MS=m(require("node:path"));rp();fS();es();MR();eK=e=>{if(!ze.default.existsSync(e))return null;try{let t=JSON.parse(ze.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},NS=e=>{let t=e.hostname??NR.default.hostname(),r=eK(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let g=ga(p.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let b=ze.default.readFileSync(g,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:b,setSlugs:[i.slug]})}let d=ha({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{ze.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)ze.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=MS.default.join(e.layout.harnessRootDir,i.relativePath);ze.default.mkdirSync(MS.default.dirname(a),{recursive:!0}),ze.default.writeFileSync(a,i.content)}ze.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=tp(i.slug),d=r.sets[c];d!==void 0&&Ku({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},zS="reveal-cache.json",lp=(e,t)=>{ze.default.mkdirSync(e.harnessRootDir,{recursive:!0}),ze.default.writeFileSync(`${e.harnessRootDir}/${zS}`,`${JSON.stringify(t,null,2)}
`)},jS=e=>{let t=`${e.harnessRootDir}/${zS}`;ze.default.existsSync(t)&&ze.default.unlinkSync(t)},Aa=e=>{let t=`${e.harnessRootDir}/${zS}`;if(!ze.default.existsSync(t))return null;try{let r=JSON.parse(ze.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return OR(r)}catch{return null}return null}});var Mo=l(()=>{"use strict";wS();fR();PS();vS();bR();WS();rp();PR();wR();RR();es();TR();zR()});var DS,jR=l(()=>{"use strict";Mo();Re();DS=e=>{let t=N(e.profileEmail);return Oo({bundle:e.bundle,layout:t})}});var DR=l(()=>{"use strict";jR();Mo()});var tK,$R,rK,HR,No,cp,FR=l(()=>{"use strict";tK=["agentwitch.com","www.agentwitch.com"],$R=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,rK=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},HR=e=>{let t=rK(e);return!!(tK.includes(t)||$R.test(e.trim().toLowerCase()))},No=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return HR(r)?$R.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},cp=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:No(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var ba=l(()=>{"use strict";FR()});var ar,Pa=l(()=>{"use strict";ar=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var wa,UR=l(()=>{"use strict";DR();ba();Pa();wa=e=>{if(!ar(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=jt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!No(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=DS({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var $S=l(()=>{"use strict";UR()});var oK,ts,HS=l(()=>{"use strict";oK=e=>e==="hourly"||e==="daily"||e==="weekdays",ts=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!oK(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var va,dp,BR,GR,FS,St,up,pp,mp,gp,fp=l(()=>{"use strict";va=m(require("node:fs")),dp=m(require("node:path"));HS();BR="automations.json",GR=e=>e.profileEmail!==null?dp.default.join(e.installDir,"profiles",e.profileEmail,BR):dp.default.join(e.installDir,BR),FS=()=>({version:1,automations:[]}),St=e=>{let t=GR(e);if(!va.default.existsSync(t))return FS();try{let r=JSON.parse(va.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?FS():{version:1,automations:r.automations.flatMap(n=>{let s=ts(n);return s!==null?[s]:[]})}}catch{return FS()}},up=(e,t)=>{let r=GR(e);va.default.mkdirSync(dp.default.dirname(r),{recursive:!0}),va.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},pp=(e,t)=>{up(e,{version:1,automations:t})},mp=(e,t)=>{let o=St(e).automations.filter(n=>n.id!==t.id);up(e,{version:1,automations:[...o,t]})},gp=(e,t)=>St(e).automations.find(r=>r.id===t)??null});var Ie,lr=l(()=>{"use strict";Ie="x-agent-witch-token"});var US=l(()=>{"use strict";pu();gu()});var Y,zo,BS,_a,GS,nK,VS,Wa,La,qS,ka=l(()=>{"use strict";lr();US();Y=e=>{let t=we(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},zo=e=>({[Ie]:e,"Content-Type":"application/json"}),BS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:zo(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},_a=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:zo(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},GS=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:zo(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},nK=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},VS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:zo(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Wa=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:zo(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return nK(r)}catch{return null}},La=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:zo(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},qS=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:zo(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var jo,VR,qR,sK,KS,KR,JS=l(()=>{"use strict";jo=m(require("node:fs")),VR=m(require("node:path")),qR=e=>VR.default.join(e.harnessRootDir,"projects-registry.json"),sK=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),KS=e=>{let t=qR(e);if(!jo.default.existsSync(t))return[];try{let r=JSON.parse(jo.default.readFileSync(t,"utf8"));return sK(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},KR=e=>{let t=qR(e);if(!jo.default.existsSync(t))return;let r=`${t}.migrated`;if(jo.default.existsSync(r)){jo.default.unlinkSync(t);return}jo.default.renameSync(t,r)}});var JR,iK,aK,YR,XR=l(()=>{"use strict";Zn();JR=e=>rt(e),iK=e=>new Set(e.map(t=>JR(t.folderPath))),aK=e=>new Set(e.map(t=>t.id)),YR=(e,t)=>{let r=iK(t),o=aK(t),n=[],s=new Set;for(let i of e){let a=JR(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var YS,XS=l(()=>{"use strict";ka();JS();XR();YS=async(e,t)=>{let r=KS(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Wa(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=YR(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await VS(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&KR(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var ZS,Do,hp=l(()=>{"use strict";ZS=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),Do=(e,t)=>e.find(r=>r.id===t)??null});var rs,yp=l(()=>{"use strict";ka();XS();hp();rs=async(e,t)=>{t!==void 0&&await YS(t,e);let r=Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Wa(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=ZS(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var ZR=l(()=>{"use strict"});var lK,cK,Sp,QS=l(()=>{"use strict";lK="Default",cK=e=>e.trim().toLowerCase()===lK.toLowerCase(),Sp=cK});var _e,QR,dK,uK,pK,mK,os,eA=l(()=>{"use strict";QS();_e=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),QR=(e,t)=>e.length===0?`<p class="empty">${_e(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${_e(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${_e(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,dK=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,uK=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${_e(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,pK=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?uK(e.project):dK();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${_e(o.slug)}"${t.size===0||t.has(o.slug)?" checked":""} />
            <span><strong>${_e(o.name)}</strong> <span class="muted mono">(${_e(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`<form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${_e(e.project.id)}" />
        <p class="field-label">Installed</p>
        <p class="lede">Check the sets to write into this repo&apos;s <code>.cursor</code> tree, then pull.</p>
        ${r}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`},mK=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${_e(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${_e(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},os=e=>{let t=e.flashError?`<div class="alert-error">${_e(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${_e(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(p,g)=>`<a class="project-tab${e.activeTab===p?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${p}">${_e(g)}</a>`,n=e.composition?.items.filter(p=>p.kind==="workflow")??[],s=e.composition?.items.filter(p=>p.kind==="agent")??[],i="";e.activeTab==="harness"?i=pK({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=QR(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=QR(s,"No agents installed for this project yet."):i=mK({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});let a=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}?rename=1`,c=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${_e(a)}" target="_blank" rel="noopener noreferrer">Rename in Agent Witch Cloud\u2026</a>
    </div>`,d=Sp(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from Agent Witch Cloud only. The folder on this Mac is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from Agent Witch Cloud? Your repo folder on this Mac will stay.');">
          <input type="hidden" name="projectId" value="${_e(e.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${_e(e.project.name)}</h1>
      <p class="muted mono">${_e(e.project.projectFolderPath)}</p>
      ${c}
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
    </section>${d}`}});var gK,fK,ex,tx=l(()=>{"use strict";Mo();lr();gK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fK=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[Ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!gK(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=jt(n);return s===null?[]:[s]})}catch{return null}},ex=fK});var rx,tA,ox=l(()=>{"use strict";ue();Mo();eA();yp();tx();hp();Xu();ka();Ot();rx=e=>({kind:"page",title:e.project.name,body:os({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Hr(e.layout),linkedSetSlugs:Dr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),tA=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let o=await rs(r,e.layout),n=Do(o.projects,t);if(n===null)return{kind:"not_found"};let s=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??gt,a=s===null?null:await ex(s,n.id);if(a===null)return rx({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=_S({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return rx({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await La(s,n.id,c.appliedSetSlugs),p=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${p.toString()}`}}});var hK,rA,nx=l(()=>{"use strict";hK=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,rA=hK});var sx,ix,yK,SK,Ap,bp,ax=l(()=>{"use strict";sx=require("node:child_process"),ix=require("node:util"),yK=(0,ix.promisify)(sx.execFile),SK=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},Ap=async(e,t)=>{try{let{stdout:r}=await yK("git",t,{cwd:e,env:SK(),maxBuffer:1048576});return r.trim()}catch{return null}},bp=async e=>{let t=await Ap(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Ap(e,["rev-parse","--abbrev-ref","HEAD"]),o=await Ap(e,["status","--porcelain"]),n=await Ap(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var oA,lx=l(()=>{"use strict";oA=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var AK,nA,cx=l(()=>{"use strict";AK=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},nA=AK});var bK,sA,dx=l(()=>{"use strict";lr();bK=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[Ie]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},sA=bK});var ux,Fr,px=l(()=>{"use strict";ux=require("node:child_process"),Fr=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,ux.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var mx=l(()=>{"use strict";yp()});var Ea,gx=l(()=>{"use strict";lr();Ea=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[Ie]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var iA,fx=l(()=>{"use strict";lr();iA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[Ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var Dt=l(()=>{"use strict";yp();hp();ZR();Zn();aS();ox();Xu();nx();ax();lx();cx();dx();px();mx();gx();fx();XS();JS();ka()});var Pp,Ca,hx,aA,$o,lA=l(()=>{"use strict";Pp=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},Ca=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Pp(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},hx=e=>e>=1&&e<=5,aA=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Pp(t,"UTC")},$o=e=>{let t=e.from??new Date,r=Pp(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Ca(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=Ca(r,e.timeZone,o,0),s=Pp(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?Ca(aA(r),e.timeZone,o,0):n;if(!i&&hx(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=aA(a),hx(a.weekday))return Ca(a,e.timeZone,o,0);return Ca(aA(r),e.timeZone,o,0)}});var yx,cA,cr,dA=l(()=>{"use strict";yx=require("node:crypto");ue();Dt();lA();fp();cA=!1,cr=async e=>{if(cA)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=gp(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};cA=!0;let n=(0,yx.randomUUID)();try{let s=await Jn(t,"claude-cli",o.prompt);await qS(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=$o({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return mp(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{cA=!1}}});var wp,Sx=l(()=>{"use strict";ue();dA();fp();wp=async()=>{let e=$();if(e===null)return;let t=St(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await cr(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var Ra=l(()=>{"use strict";fp();Sx();dA();lA()});var Ax=l(()=>{"use strict";Ra()});var bx=l(()=>{"use strict";HS()});var Px=l(()=>{"use strict";bx()});var uA=l(()=>{"use strict";Ra()});var PK,wK,xa,pA=l(()=>{"use strict";Ax();Px();uA();Re();PK=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),wK=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??$o({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??$o({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},xa=e=>{let t=PK(e.profileEmail),r=St(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=ts(s);return i!==null?[wK(i,o.get(i.id))]:[]});return pp(t,n),{ok:!0,writtenCount:n.length}}});var mA=l(()=>{"use strict";Ra()});var wx=l(()=>{"use strict";ue()});var vx=l(()=>{"use strict";pA();mA();uA();wx()});var _x,Ta,Ia,Oa,Wx=l(()=>{"use strict";_x=m(require("node:os"));vx();ba();Pa();Ta=e=>{if(!ar(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!No(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=xa({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Ia=async e=>{if(!ar(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:No(t)?cr(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Oa=()=>{let e=$(),t=e!==null?St(e.layout):{version:1,automations:[]};return{ok:!0,hostname:_x.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var gA=l(()=>{"use strict";Wx()});var vp=l(()=>{"use strict";te()});var _p=l(()=>{"use strict";te()});var Wp,kx,Ex,Lx,vK,_K,ns,fA=l(()=>{"use strict";Wp=m(require("node:fs")),kx=m(require("node:os")),Ex=m(require("node:path"));vp();_p();aa();Re();Lx=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},vK=e=>Ex.default.join(kx.default.homedir(),"Library","LaunchAgents",`${e}.plist`),_K=async e=>Wp.default.existsSync(vK(e))?(await Ce(e)).ok:!1,ns=async(e=k())=>{let t=Wp.default.existsSync(Tu(e)),r=!Wp.default.existsSync(Qt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=ia(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await Lx(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${Pe(e)}-wake`;await _K(i)&&s.push(i);for(let c of ee(e))(await Ce(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await Lx(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var Cx=l(()=>{"use strict";te()});var ss,Ma=l(()=>{"use strict";ss="connection-health.json"});var Ho,Lp,WK,Na,We,hA,kp,je,Ep=l(()=>{"use strict";Ho=m(require("node:fs")),Lp=m(require("node:path"));Ma();WK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Na=e=>e.profileEmail===null?Lp.default.join(e.installDir,ss):Lp.default.join(e.installDir,"profiles",e.profileEmail,ss),We=e=>{let t=Na(e);if(!Ho.default.existsSync(t))return null;try{let r=JSON.parse(Ho.default.readFileSync(t,"utf8"));return!WK(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},hA=e=>{let t=Na(e);Ho.default.existsSync(t)&&Ho.default.rmSync(t,{force:!0})},kp=(e,t)=>{let r=Na(e),o=We(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Ho.default.mkdirSync(Lp.default.dirname(r),{recursive:!0}),Ho.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},je=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var za,Rx=l(()=>{"use strict";Ma();Ep();za=(e,t)=>{if(!t.socketOpen)return!1;let r=We(e);return r===null?!1:!je(r,t.staleAfterMs??12e4,t.nowMs)}});var yA,xx=l(()=>{"use strict";Ep();yA=(e,t)=>!(e!==null&&!je(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var is=l(()=>{"use strict";Ep();Rx();xx();Ma()});var SA=l(()=>{"use strict";is();te()});var AA=l(()=>{"use strict";is()});var bA=l(()=>{"use strict";te()});var Ix,Tx,ja,PA=l(()=>{"use strict";Ix=m(require("node:fs"));Ot();vp();_p();Re();Tx=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},ja=async(e=k())=>{if(!Ix.default.existsSync(Qt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await Tx())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of ee(e))(await Ce(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await Tx();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var Ox=l(()=>{"use strict";te()});var Mx,Fo,wA,LK,kK,EK,Nx,CK,zx,as,Cp=l(()=>{"use strict";Mx=require("node:crypto"),Fo=m(require("node:fs")),wA=m(require("node:path"));Re();LK="watchdog-log.ndjson",kK=200,EK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Nx=(e=k())=>{let t=N(),r=t.installDir===e?t.logsDir:Tn({installDir:e,profileEmail:t.profileEmail});return wA.default.join(r,LK)},CK=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!EK(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},zx=(e,t=k())=>{let r={id:(0,Mx.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=Nx(t);Fo.default.mkdirSync(wA.default.dirname(o),{recursive:!0});let n=Fo.default.existsSync(o)?Fo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-kK+1)),JSON.stringify(r)];return Fo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},as=(e=20,t=k())=>{let r=Nx(t);if(!Fo.default.existsSync(r))return[];let o=Fo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=CK(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var vA,_A,WA,LA=l(()=>{"use strict";$e();vA=ao.watchdogReinstallState,_A=900*1e3,WA=3e3});var jx=l(()=>{"use strict";LA()});var Dx={};Ct(Dx,{verifyAgentWitchReviveAfterKickstart:()=>xK});var RK,xK,$x=l(()=>{"use strict";jx();AA();bA();Re();RK=e=>new Promise(t=>{setTimeout(t,e)}),xK=async e=>{if(await RK(e.verifyDelayMs??WA),!await go(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),o=We(r);return!je(o,e.staleAfterMs)}});var Da,kA,TK,Hx,Fx,EA,CA,RA=l(()=>{"use strict";Da=m(require("node:fs")),kA=m(require("node:path"));K();LA();TK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Hx=e=>kA.default.join(e,vA),Fx=(e=k())=>{let t=Hx(e);if(!Da.default.existsSync(t))return null;try{let r=JSON.parse(Da.default.readFileSync(t,"utf8"));return!TK(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},EA=(e=k(),t=Date.now())=>{let r=Fx(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=_A:!0},CA=(e=k(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=Hx(e);return Da.default.mkdirSync(kA.default.dirname(o),{recursive:!0}),Da.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var xA,Ux=l(()=>{"use strict";te();RA();xA=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!EA())return{attempted:!1,ok:!1,targets:e};CA();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Ce(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var Bx=l(()=>{"use strict";RA();Ux()});var TA=l(()=>{"use strict";Mt()});var Gx=l(()=>{"use strict";Mt()});var Vx,ls,qx,Kx,Jx,IK,OK,Yx,MK,NK,Xx,Zx=l(()=>{"use strict";Vx=require("node:child_process"),ls=m(require("node:fs")),qx=m(require("node:os")),Kx=m(require("node:path")),Jx=require("node:util");TA();Gx();Re();IK=(0,Jx.promisify)(Vx.execFile),OK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Yx=e=>{let t=pt(e),r=t===null?N():N(t);if(!ls.default.existsSync(r.configPath))return null;try{let o=JSON.parse(ls.default.readFileSync(r.configPath,"utf8"));return!OK(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},MK=e=>Yx(e)?.wsUrl??null,NK=e=>{let t=MK(e);return t!==null?we(t):xe(e)?.appOrigin??null},Xx=async e=>{let t=e?.installDir??k(),r=Yx(t),o=r!==null?we(r.wsUrl):NK(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=Kx.default.join(qx.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{ls.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??pt(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await IK("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{ls.default.existsSync(i)&&ls.default.unlinkSync(i)}}});var Qx={};Ct(Qx,{attemptAgentWitchWatchdogReinstall:()=>zK});var zK,e0=l(()=>{"use strict";Bx();Zx();zK=async e=>xA(e,()=>Xx())});var t0,r0,o0,jK,DK,$K,$a,IA=l(()=>{"use strict";Cx();SA();AA();bA();PA();fA();vp();_p();Re();Dn();Ox();Cp();t0=e=>e===null?N():N(e),r0=async(e,t,r)=>{if(!await go(e))return"not_running";let n=t0(t);if(ft(n))return"healthy";let s=We(n);return je(s,r)?"stale_connection":"healthy"},o0=async e=>{let t=e?.staleAfterMs??12e4,r=k(),o=ee(r);return Promise.all(o.map(async n=>{let s=await r0(n.launchAgentLabel,n.profileEmail,t),i=t0(n.profileEmail),a=We(i),c=await go(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:je(a,t),needsRevive:s!=="healthy",reason:s}}))},jK=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},DK=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",$K=async e=>{let t=await Ce(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>($x(),Dx)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},$a=async e=>{if(!mt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=k();await ns(r),await ja(r);let o=ee(r),n=[];for(let p of o){let g=await r0(p.launchAgentLabel,p.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:g});continue}n.push(await $K({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let p=mo();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(e0(),Qx)),g=await p(n);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&zx({event:DK(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:jK(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var n0,Rp,s0=l(()=>{"use strict";n0=m(require("node:os"));SA();Cp();IA();Rp=async()=>{let e=await o0(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:n0.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:as(1)[0]??null}}});var OA=l(()=>{"use strict";fA();IA();s0();Cp()});var Ha,Fa,Ua,i0=l(()=>{"use strict";te();OA();Ha=async()=>{await ns();let e=ee(),t=[];for(let r of e){let o=await Ce(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=mo();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Fa=$a,Ua=$a});var MA=l(()=>{"use strict";i0()});var Tp,xp,a0,NA,l0,HK,FK,UK,BK,GK,Ip,c0=l(()=>{"use strict";Tp=require("node:child_process"),xp=m(require("node:fs")),a0=m(require("node:os")),NA=m(require("node:path")),l0=require("node:util");te();K();HK=(0,l0.promisify)(Tp.execFile),FK=()=>NA.default.join(a0.default.homedir(),"Library","LaunchAgents"),UK=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await HK("launchctl",["bootout",r]).catch(()=>{})},BK=e=>{let t=NA.default.join(FK(),`${e}.plist`);xp.default.existsSync(t)&&xp.default.unlinkSync(t)},GK=e=>{(0,Tp.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Ip=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=k();if(!xp.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=er(e);for(let r of t)await UK(r),BK(r);return GK(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var d0,Op,u0,cs,p0,VK,qK,KK,zA,JK,jA,m0=l(()=>{"use strict";d0=require("node:child_process"),Op=m(require("node:fs")),u0=m(require("node:os")),cs=m(require("node:path")),p0=require("node:util");te();VK=(0,p0.promisify)(d0.execFile),qK=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],KK=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],zA=e=>{Op.default.existsSync(e)&&Op.default.rmSync(e,{force:!0})},JK=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await VK("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},jA=async e=>{let r=(e.listLaunchAgentLabels??er)(e.layout.installDir),o=e.launchAgentsDir??cs.default.join(u0.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??JK;for(let i of r)await n(i),zA(cs.default.join(o,`${i}.plist`));let s=cs.default.dirname(e.layout.configPath);for(let i of qK)zA(cs.default.join(s,i));for(let i of KK)zA(cs.default.join(e.layout.installDir,i));return Op.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var DA,g0=l(()=>{"use strict";DA={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var $A,f0=l(()=>{"use strict";$A="unknown_identity"});var HA=l(()=>{"use strict";g0();f0()});var YK,FA,h0=l(()=>{"use strict";HA();YK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),FA=e=>e.type!=="system.error"||!YK(e.payload)?!1:e.payload.errorCode===$A});var UA=l(()=>{"use strict";c0();m0();h0()});var Mp=l(()=>{"use strict";te();Mt();UA();OA()});var ds,Np,zp=l(()=>{"use strict";Mp();ds=(e=20)=>as(e),Np=Rp});var jp,us,Dp,$p=l(()=>{"use strict";Mp();jp=ko,us=(e=20)=>_o(e),Dp=e=>Lo(e)});var Hp,BA=l(()=>{"use strict";Mp();Hp=()=>Ip()});var y0=l(()=>{"use strict";Xy();$S();gA();MA();zp();$p();BA()});var S0={};Ct(S0,{buildAgentWitchAutomationStatusFromWakeServer:()=>Oa,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>jp,buildAgentWitchWakeHealthResponse:()=>ca,buildAgentWitchWakeIdentityResponse:()=>da,buildAgentWitchWatchdogStatus:()=>Np,installHarnessFromWakeServer:()=>wa,readAgentWitchSelfUpdateLogEntries:()=>us,readAgentWitchWatchdogLogEntries:()=>ds,restartAgentWitchFromWakeServer:()=>Ua,reviveAgentWitchWebSocketFromWakeServer:()=>Fa,runAgentWitchSelfUpdateFromWakeServer:()=>Dp,runAgentWitchUninstallLocalFromWakeServer:()=>Hp,runAutomationFromWakeServer:()=>Ia,syncAutomationsFromWakeServer:()=>Ta,wakeAgentWitchLaunchAgents:()=>Ha});var A0=l(()=>{"use strict";y0()});var b0,P0,GA,VA,w0=l(()=>{"use strict";b0=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),P0=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?b0(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?b0(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},GA=e=>{let t=e.watchdogLogs.map(P0).join(""),r=e.updateLogs.map(P0).join("");return`<!doctype html>
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
</html>`},VA=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var v0,_0,W0=l(()=>{"use strict";v0=m(require("node:net")),_0=()=>new Promise((e,t)=>{let r=v0.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var L0,XK,qA,k0=l(()=>{"use strict";L0=m(require("node:net"));W0();la();aa();Re();XK=e=>new Promise(t=>{let r=L0.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),qA=async()=>{let e=k(),t=yt();if(await XK(t))return bC(t),t;let r=await _0();return Iu(e,r),r}});var ZK,KA,E0=l(()=>{"use strict";ZK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),KA=e=>({force:ZK(e)&&e.force===!0})});var Ba=l(()=>{"use strict";ba();w0();k0();E0();Oh();iu();bo()});var JA,j,YA,XA,Ga,C0=l(()=>{"use strict";JA=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},YA=e=>{e.writeHead(403),e.end()},XA=e=>e.url?.split("?")[0]??"/",Ga=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var At=l(()=>{"use strict";C0()});var QK,R0,x0=l(()=>{"use strict";gA();At();QK=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},R0=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,Oa(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await QK(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=Ta(t);return j(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Ia(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var e8,I0,T0,O0,ZA,M0,QA=l(()=>{"use strict";e8=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],I0=e=>/embed|minilm|^bge-/i.test(e),T0=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),O0=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),ZA=e=>e.filter(t=>t.trim().length>0&&!I0(t)),M0=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!I0(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>T0(s,o));if(n!==void 0)return n}for(let n of e8){let s=r.find(i=>T0(i,n));if(s!==void 0)return s}return r[0]??null}});var eb,j0,D0,Fp,$0,N0,z0,t8,r8,o8,n8,s8,i8,bt,Va=l(()=>{"use strict";eb=require("node:child_process"),j0=m(require("node:fs")),D0=m(require("node:os")),Fp=m(require("node:path"));Mt();ht();QA();$0=3e3,N0=["claude-cli","codex","cursor","antigravity"],z0={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},t8=(e,t)=>new Promise(r=>{let o=(0,eb.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},$0);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),r8=()=>{let e=D0.default.homedir();return["ollama",Fp.default.join(e,".local","bin","ollama"),Fp.default.join(e,".agent-witch","ollama","ollama"),Fp.default.join(e,".local-agent-witch","ollama","ollama")]},o8=e=>new Promise(t=>{let r=(0,eb.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},$0);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(O0(Buffer.concat(o).toString("utf8")))})}),n8=async()=>{for(let e of r8()){if(e!=="ollama"&&!j0.default.existsSync(e))continue;let t=await o8(e);if(t!==null)return t}return[]},s8=e=>{let t=e.installedWriterIds.map(s=>z0[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=ce(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${z0[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},i8=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:$n},bt=async e=>{let t=N0.map(i=>{let a=Su(i,e.commands);return t8(a.command,a.args)}),[r,...o]=await Promise.all([n8(),...t]),n=N0.flatMap((i,a)=>o[a]===!0?[i]:[]),s=M0(r,i8());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:s8({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var a8,l8,tb,H0=l(()=>{"use strict";a8="http://127.0.0.1:11434",l8=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},tb=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||a8;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?l8(await o.json()):null}catch{return null}}});var rb=l(()=>{"use strict";ht();Va();H0();QA()});var c8,F0,U0=l(()=>{"use strict";rb();c8={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},F0=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:c8[t]})),ollamaModels:ZA(e.ollamaModels)})});var d8,B0,G0=l(()=>{"use strict";rb();At();U0();d8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},B0=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await bt({commands:de({})});return j(e.response,200,{ok:!0,...F0({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await d8(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await tb({model:r,prompt:o});return n===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var u8,V0,q0=l(()=>{"use strict";$S();At();u8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},V0=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await u8(e);if(t===null)return!0;let r=wa(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var K0=l(()=>{"use strict";Dt()});var ob,J0=l(()=>{"use strict";K0();Pa();ob=e=>{if(!ar(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Ye({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var Y0,nb,sb=l(()=>{"use strict";ue();Dt();Pa();Y0=e=>{if(!ar(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},nb=async e=>{let t=Y0(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Fr("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=$();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Y({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Ye({projectFolderPath:r}),await Ea(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var X0=l(()=>{"use strict";J0();sb()});var Z0,Q0=l(()=>{"use strict";X0();sb();At();Z0=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=ob(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await nb(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,o,r,e.cors.headers),!0}return!1}});var eT,tT=l(()=>{"use strict";Ba();$p();zp();eT=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=ds(50),r=us(50);return e.response.writeHead(200,VA()),e.response.end(GA({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var rT,oT=l(()=>{"use strict";Xy();At();rT=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,ca(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,da(),e.cors.headers),!0):!1});var nT,sT=l(()=>{"use strict";BA();At();nT=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Hp();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var iT,aT=l(()=>{"use strict";MA();At();iT=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Fa();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Ua();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Ha();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var lT,cT=l(()=>{"use strict";Ba();$p();At();lT=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=jp();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Ga(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:us(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=KA(t),o=await Dp({force:r});return j(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var dT,uT=l(()=>{"use strict";zp();At();dT=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Np();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Ga(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:ds(t)},e.cors.headers),!0}return!1}});var pT,mT=l(()=>{"use strict";x0();G0();q0();Q0();tT();oT();sT();aT();cT();uT();pT=[rT,eT,dT,iT,lT,nT,V0,Z0,R0,B0]});var gT,fT=l(()=>{"use strict";mT();gT=async e=>{for(let t of pT)if(await t(e))return!0;return!1}});var p8,hT,yT=l(()=>{"use strict";ba();At();fT();p8=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:XA(e),readJsonBody:()=>JA(e)}),hT=async(e,t,r)=>{let o=e.headers.origin,n=cp(o);try{if(o!==void 0&&o.length>0&&!n.allowed){YA(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=p8(e,t,r,n);if(await gT(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var ST,Uo,Up,Bp=l(()=>{"use strict";ST=m(require("node:http"));Ba();yT();Uo=async()=>{let e=await qA(),t=ST.default.createServer((r,o)=>{hT(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Up=Uo});var AT={};Ct(AT,{runAgentWitchBridgeCli:()=>m8});var m8,bT=l(()=>{"use strict";te();Bp();m8=async()=>{qe("agent-witch-bridge");let e=await Uo(),t=rr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var PT=l(()=>{"use strict";Ot()});var ps,ib,wT=l(()=>{"use strict";ps=(e,t,r)=>e===1?t:r,ib=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${ps(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${ps(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${ps(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${ps(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${ps(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${ps(p,"year","years")} ago`}});var Bo,ab,g8,f8,lb,Ur,qa,cb,vT=l(()=>{"use strict";Bo=m(require("node:fs")),ab=m(require("node:path")),g8="local-ws-traffic.ndjson",f8=500,lb=e=>ab.default.join(e.logsDir,g8),Ur=(e,t)=>{let r=lb(e);Bo.default.mkdirSync(ab.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});Bo.default.appendFileSync(r,`${o}
`,"utf8")},qa=(e,t=f8)=>{let r=lb(e);if(!Bo.default.existsSync(r))return[];let n=Bo.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},cb=e=>{let t=lb(e);Bo.default.existsSync(t)&&Bo.default.writeFileSync(t,"","utf8")}});var h8,_T,WT,LT=l(()=>{"use strict";HA();h8=new Set(Object.values(DA)),_T=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),WT=e=>{if(!_T(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!h8.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!_T(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var kT,ET=l(()=>{"use strict";kT=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var y8,S8,A8,Ka,CT=l(()=>{"use strict";ET();y8=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,S8=e=>y8.test(e),A8=e=>kT(e),Ka=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Ka(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&S8(o)){r[o]=A8(n);continue}r[o]=Ka(n)}return r}});var $t,db,b8,P8,w8,ub,RT,xT,TT,v8,Gp,Go,Vp,pb,IT=l(()=>{"use strict";$t=m(require("node:fs")),db=m(require("node:path"));LT();CT();b8="local-ws-trace.ndjson",P8=1e4,w8=1440*60*1e3,ub=e=>db.default.join(e.logsDir,b8),RT=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},xT=e=>{if(!$t.default.existsSync(e))return;let t=$t.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-w8,n=t.filter(s=>{let i=RT(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-P8);$t.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},TT=(e,t)=>{let r=ub(e);$t.default.mkdirSync(db.default.dirname(r),{recursive:!0}),$t.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),xT(r)},v8=e=>e.parsed===null?{_empty:!0}:Ka(e.parsed),Gp=(e,t,r)=>{let o=WT(r);TT(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:v8(o)})},Go=(e,t)=>{TT(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Ka({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Vp=(e,t=80)=>{let r=ub(e);if(xT(r),!$t.default.existsSync(r))return[];let o=$t.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=RT(s);i!==null&&n.push(i)}return n.reverse()},pb=e=>{let t=ub(e);$t.default.existsSync(t)&&$t.default.writeFileSync(t,"","utf8")}});var Br,OT,_8,mb,qp,MT=l(()=>{"use strict";Br=m(require("node:fs")),OT=m(require("node:path")),_8=256e3,mb=e=>{Br.default.mkdirSync(OT.default.dirname(e),{recursive:!0}),Br.default.writeFileSync(e,"","utf8")},qp=(e,t=_8)=>{if(!Br.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Br.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=Br.default.openSync(e,"r");try{Br.default.readSync(a,i,0,s,n)}finally{Br.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var Ja=l(()=>{"use strict";vT();IT();MT()});var gb,fb,NT=l(()=>{"use strict";gb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fb=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${gb(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${gb(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${gb(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var zT=l(()=>{"use strict";NT()});var hb,yb=l(()=>{"use strict";hb=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var Sb=l(()=>{"use strict";Ma()});var Ab,bb,jT=l(()=>{"use strict";Sb();Ab=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},bb=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var DT=l(()=>{"use strict";yb();jT()});var $T,Ya,Pb,Xa=l(()=>{"use strict";yb();$T=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ya=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=$T(e),r=$T(hb(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},Pb=`(function () {
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
})();`});var Vo,W8,wb,HT=l(()=>{"use strict";Vo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),W8=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},wb=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Vo(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Vo(r.direction):Vo(r.kind),i=`trace-body-${o}`,a=Vo(W8(r.body));return`<tr>
        <td title="${Vo(r.at)}">${Vo(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${Vo(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var vb,L8,FT,_b,UT=l(()=>{"use strict";vb=m(require("node:path"));$e();Ot();L8=e=>vb.default.basename(e)===Xt?Wn:_n,FT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_b=e=>{let t=L8(e.installDir),o=`AW_HOME="$HOME/${vb.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${FT(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${FT(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var BT=l(()=>{"use strict";Xa();HT();UT();Xa()});var k8,dr,Za=l(()=>{"use strict";k8=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),dr=k8});var GT,VT,qT,KT,JT,YT,XT,ms=l(()=>{"use strict";GT="projects",VT="knowledge",qT="chunks.ndjson",KT="lessons.ndjson",JT="error-chunks.ndjson",YT="usage-stats.json",XT="knowledge-location.json"});var Kp,E8,Jp,Wb=l(()=>{"use strict";Kp=m(require("node:path"));ms();E8=(e,t)=>{let r=t.trim(),o=Kp.default.join(e.installDir,GT,r,VT);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:Kp.default.join(o,qT),memoryRunsFilePath:Kp.default.join(o,KT)}},Jp=E8});var Lb,C8,ZT,QT=l(()=>{"use strict";Lb=m(require("node:fs"));ms();Io();C8=e=>{let t=ot(e.projectFolderPath),r=`${t.metaDirPath}/${XT}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};Lb.default.mkdirSync(t.metaDirPath,{recursive:!0}),Lb.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},ZT=C8});var gs,tI,eI,R8,rI,oI=l(()=>{"use strict";gs=m(require("node:fs")),tI=m(require("node:path"));So();Io();Wb();QT();eI=(e,t)=>{gs.default.existsSync(e)&&(gs.default.existsSync(t)&&gs.default.statSync(t).size>0||(gs.default.mkdirSync(tI.default.dirname(t),{recursive:!0}),gs.default.copyFileSync(e,t)))},R8=e=>{let t=ot(e.projectFolderPath),r=Jp(e.layout,e.projectId),o=`${t.memoryDirPath}/${In}`;eI(t.ragChunksFilePath,r.ragChunksFilePath),eI(o,r.memoryRunsFilePath),ZT({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},rI=R8});var kb,x8,nI,sI=l(()=>{"use strict";kb=m(require("node:fs"));Io();x8=e=>{let t=ot(e);if(!kb.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(kb.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},nI=x8});var iI,T8,fs,Yp=l(()=>{"use strict";iI=m(require("node:path"));So();Io();oI();sI();Wb();T8=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=nI(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){rI({layout:e.layout,projectFolderPath:t,projectId:o});let s=Jp(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=ot(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:iI.default.join(n.memoryDirPath,In),projectId:null}},fs=T8});var Xp,O8,Zp,Eb=l(()=>{"use strict";Xp=m(require("node:fs"));ms();O8=(e,t=500)=>{if(!Xp.default.existsSync(e))return;let r=Xp.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Xp.default.writeFileSync(e,`${o.join(`
`)}
`)},Zp=O8});var Qp,M8,qo,Cb=l(()=>{"use strict";Qp=m(require("node:path"));ms();Yp();M8=e=>{let t=fs(e);if(t===null)return null;let r=Qp.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Qp.default.join(r,YT),errorChunksFilePath:Qp.default.join(r,JT)}},qo=M8});var lI,Qa,cI,aI,Rb,dI,j8,xb,uI,Tb,Ib,Ob,Mb=l(()=>{"use strict";lI=require("node:crypto"),Qa=m(require("node:fs")),cI=m(require("node:path"));Za();ms();Cb();aI=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),Rb=e=>{if(!Qa.default.existsSync(e))return aI();try{let t=JSON.parse(Qa.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return aI()},dI=(e,t)=>{Qa.default.mkdirSync(cI.default.dirname(e),{recursive:!0}),Qa.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},j8=e=>{let t=dr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,lI.createHash)("sha256").update(o).digest("hex").slice(0,16)},xb=e=>{let t=qo(e);return t===null?null:Rb(t.usageStatsFilePath)},uI=e=>{if(e.chunkIds.length===0)return;let t=qo(e);if(t===null)return;let r=Rb(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;dI(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},Tb=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=qo(e);if(r===null)return null;let o=j8(t),n=Rb(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return dI(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},Ib=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,Ob=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var el,pI,D8,$8,mI,H8,Nb,tl,hs,zb,ys,jb,Db=l(()=>{"use strict";el=m(require("node:fs")),pI=m(require("node:path"));Za();Yp();Eb();Mb();D8="http://127.0.0.1:11434",$8="nomic-embed-text",mI=(e,t,r)=>fs({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,H8=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},Nb=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},tl=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||D8,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||$8;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},hs=(e,t,r)=>{let o=mI(e,t,r);if(o===null||!el.default.existsSync(o))return[];let n=el.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},zb=async e=>{let t=dr(e.text),r=Nb(t);if(r.length===0)return 0;let o=mI(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;el.default.mkdirSync(pI.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await tl(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};el.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return Zp(o),n},ys=async e=>{let t=await tl(e.query);if(t===null)return[];let r=e.minScore??0,s=hs(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:H8(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return uI({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},jb=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var rl,gI,F8,U8,$b,Hb,Fb,fI=l(()=>{"use strict";rl=m(require("node:fs")),gI=m(require("node:path"));Za();Cb();Eb();Db();F8=e=>{if(!rl.default.existsSync(e))return[];let t=rl.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},U8=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},$b=async e=>{let t=qo(e);if(t===null)return 0;let r=dr(e.text),o=Nb(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;rl.default.mkdirSync(gI.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await tl(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};rl.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Zp(n,200),s},Hb=async e=>{let t=qo(e);if(t===null)return[];let r=await tl(e.query);if(r===null)return[];let o=e.minScore??.3;return F8(t.errorChunksFilePath).map(s=>({chunk:s,score:U8(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},Fb=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Ub=l(()=>{"use strict";Db();Mb();fI()});var Bb,hI=l(()=>{"use strict";Bb={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var yI=l(()=>{"use strict";hI()});var he,Gb,Vb=l(()=>{"use strict";yI();he=Bb,Gb=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${he.gray50};
  --aw-zinc-100: ${he.gray100};
  --aw-zinc-200: ${he.gray200};
  --aw-zinc-400: ${he.gray400};
  --aw-zinc-500: ${he.gray500};
  --aw-zinc-600: ${he.gray600};
  --aw-zinc-700: ${he.gray700};
  --aw-zinc-800: ${he.gray900};
  --aw-zinc-900: ${he.gray900};
  --aw-brand-600: ${he.brand600};
  --aw-brand-700: ${he.brand700};
  --aw-brand-50: ${he.brand50};
  --aw-emerald-50: ${he.success50};
  --aw-emerald-700: ${he.success700};
  --aw-amber-50: ${he.warning50};
  --aw-amber-900: ${he.warning900};
  --aw-red-50: ${he.error50};
  --aw-red-700: ${he.error700};
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
.sdlc-compose-run-started:not(.sdlc-compose-viewing-finished) .sdlc-compose-details-body { display: none; }
.sdlc-compose-run-started .sdlc-compose-step-actions { display: none !important; }
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
`.trim()});var B8,G8,qb,SI,Kb,AI=l(()=>{"use strict";Vb();Xa();B8=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,G8=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],qb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SI=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${B8}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,Kb=e=>{let t=G8.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=qb(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=qb(e.installBundleVersionLabel?.trim()??"unknown"),s=SI("brand brand-in-sidebar",n),i=SI("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${qb(e.title)} \xB7 Agent Witch Local</title>
  <style>${Gb}</style>
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
  <script>${Pb}</script>
</body>
</html>`}});var em,ol,tm=l(()=>{"use strict";em=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ol=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${em(e.syncMessage)}</p>`:"",o=em(e.manageHref),n=em(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${em(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var Jb,Yb,Xb,bI=l(()=>{"use strict";Jb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,Yb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,Xb=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var PI=l(()=>{"use strict";AI();tm();bI()});var Ss,Zb,wI=l(()=>{"use strict";Xa();Ss=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zb=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Ss(e.wakeError)}</div>`:"",a=Ya(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Ss(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Ss(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Ss(o)}</p>
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
        <p class="home-card-meta">${Ss(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Ss(n)}</p>
      </a>
    </div>`}});var vI=l(()=>{"use strict";wI()});var rm,om,nm,_I,Qb=l(()=>{"use strict";rm="support-reply",om="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",nm=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),_I=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var sm,WI,LI=l(()=>{"use strict";Qb();sm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WI=()=>`<section class="card">
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
      <p>${sm(om)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${sm(nm)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${sm(_I)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${sm(rm)}">Run this sample</a>
      </div>
    </section>`});var C,As=l(()=>{"use strict";C=e=>e==="passed"||e==="stopped"||e==="failed"});var kI,eP,Ko,tP,im=l(()=>{"use strict";kI="Stopped at the round limit. The best prompt is kept.",eP="Stopped because the score stopped rising. The best prompt is kept.",Ko="Finished. The best prompt is the result.",tP="Wizard ended. Progress from finished steps is kept."});var Gr,rP=l(()=>{"use strict";Gr=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var V8,q8,nl,EI,am=l(()=>{"use strict";V8=/\n+|;\s+/,q8=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,nl=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(V8).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,q8(s)]},[]);return[...t,...o]},[]),EI=e=>{let t=nl(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var se,bs=l(()=>{"use strict";se=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var sl,oP=l(()=>{"use strict";am();bs();sl=e=>{let t=[...e.priorRounds,e.current],r=se(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:EI(o)}}});var nP,K8,J8,lm,sP=l(()=>{"use strict";nP={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},K8=e=>{try{let t=JSON.parse(e.fragment);return{...nP,objects:[...e.objects,t]}}catch{return{...nP,objects:e.objects}}},J8=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:K8(r)},lm=e=>[...e].reduce(J8,nP).objects});var Y8,iP,X8,CI,aP=l(()=>{"use strict";sP();Y8=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},iP=e=>{let t=lm(e).filter(Y8),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},X8=(e,t)=>({...e,passed:e.score>=t}),CI=(e,t)=>{let r=iP(e);return r===null?null:X8(r,t)}});var lP,cP,cm=l(()=>{"use strict";lP="The judge reply needs a score and a reason.",cP="The improver reply was empty."});var RI,xI=l(()=>{"use strict";RI=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var TI,II=l(()=>{"use strict";TI=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var Q8,OI,MI=l(()=>{"use strict";xI();II();im();am();Q8=e=>{let t=nl(e);return t.length===0?eP:`${eP} Avoid: ${t.join("; ")}.`},OI=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:kI};if(RI(e.scores)>=3){let t=e.scores.map((r,o)=>({score:r,reasons:e.reasons?.[o]??""}));return{type:"stopped",errorMessage:Q8(TI(t))}}return null}});var Vr,e4,Jo,NI,dm=l(()=>{"use strict";Vr=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},e4=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,Jo=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",e4(e.tokens),`Delay: ${Vr(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},NI=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var t4,zI,jI=l(()=>{"use strict";aP();t4=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,zI=e=>{let r=(t4.exec(e)?.[1]??e).trim();return r.length===0||iP(r)!==null?null:r}});var DI,um,$I=l(()=>{"use strict";dm();jI();cm();DI=e=>({type:"call",role:"judge",choice:e.choice,prompt:NI({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),um=e=>{let t=zI(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:cP}}:{nextPrompt:t,continuation:DI({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var dP,HI=l(()=>{"use strict";rP();oP();aP();cm();im();MI();cm();$I();dP=e=>{let t=CI(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:lP}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=OI({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=sl({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:Gr({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var il,uP=l(()=>{"use strict";il=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var FI=l(()=>{"use strict"});var UI=l(()=>{"use strict";FI()});var Yo,BI=l(()=>{"use strict";Yo=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var r4,pP,GI=l(()=>{"use strict";dm();r4=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,pP=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",r4(e.tokens),`Delay: ${Vr(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var o4,n4,s4,mP,VI=l(()=>{"use strict";o4=/[A-Za-z0-9_./~-]{3,180}/g,n4=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,s4=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||n4.test(t)},mP=(e,t=12)=>{let r=[];for(let o of e.matchAll(o4)){let n=o[0].replace(/\.+$/,"");if(!(!s4(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var al,qI=l(()=>{"use strict";al=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var pm,gP,KI,ll,fP=l(()=>{"use strict";pm=e=>Math.floor(e/2),gP=e=>Math.max(pm(e)+1,e-20),KI=(e,t)=>e>=t?"passes":e>=gP(t)?"close":e>=pm(t)?"weak":"bad",ll=e=>[{band:"bad",label:`0\u2013${pm(e)-1} bad`},{band:"weak",label:`${pm(e)}\u2013${gP(e)-1} weak`},{band:"close",label:`${gP(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var mm,hP=l(()=>{"use strict";fP();mm=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${KI(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var Pt,yP=l(()=>{"use strict";Pt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var JI,YI=l(()=>{"use strict";JI=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var i4,a4,XI,ZI=l(()=>{"use strict";As();hP();yP();YI();i4=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],a4=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",XI=e=>{let t=e.wizard;if(t===void 0)return[];let r=Pt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=i4.map((h,y)=>{let u=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:h,state:u,detail:null}}).filter((h,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=mm(e),d=c.filter(h=>h.id==="round-0"),p=JI(t)&&(!n||a)?c.filter(h=>h.id!=="round-0"):[],g=C(e.status)&&!s,b=g?[{id:"end",label:a4(e),state:"done",detail:e.errorMessage}]:[];if(g&&b.length>0){let h=Math.min(r,i.length),y=i.slice(0,h).map(u=>({...u,state:"done"}));return[...d,...y,...b,...p]}return[...d,...i,...p,...b]}});var l4,SP,QI=l(()=>{"use strict";As();hP();ZI();l4=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",SP=e=>{if(e.wizard!==void 0)return XI(e);let t=mm(e),r=C(e.status)?[{id:"end",label:l4(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var cl,eO=l(()=>{"use strict";cl=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var tO=l(()=>{"use strict";Ot()});var rO,dl,ul,ws,gm,AP,oO=l(()=>{"use strict";tO();rO="/prompt-optimizer/agent",dl=`${or}${rO}`,ul=`${or}/prompt-optimizer`,ws="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",gm=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${ws}`,AP="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var ur=l(()=>{"use strict"});var re,pl=l(()=>{"use strict";ur();re=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var bP,nO=l(()=>{"use strict";bP="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var sO,iO=l(()=>{"use strict";sO=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var ml,lO=l(()=>{"use strict";iO();ur();ml=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:sO(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null})});var PP,cO=l(()=>{"use strict";ur();PP=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null})});var wP,dO=l(()=>{"use strict";ur();wP=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var uO,gl,pO=l(()=>{"use strict";uO=["generalize","evaluate","separate","optimize_modules"],gl=(e,t)=>{let r=uO.indexOf(t);if(r===-1)return e;let o=uO.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var fm,vP=l(()=>{"use strict";am();fm=e=>{let t=nl(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var fl,mO=l(()=>{"use strict";vP();fl=e=>{let t=fm(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var d4,u4,p4,gO,fO=l(()=>{"use strict";d4=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),u4=/^\{\{[a-zA-Z0-9_-]+\}\}$/,p4=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(d4(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},gO=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>u4.test(n)?n:p4(n,r)).join("")}});var _P,hO=l(()=>{"use strict";fO();_P=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:gO(o.prompt,t)}))}))});var m4,hl,yO=l(()=>{"use strict";ur();vP();m4=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),hl=e=>{let t=fm(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=m4(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var yl,SO=l(()=>{"use strict";uP();yl=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return il({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Sl,LP=l(()=>{"use strict";bs();Sl=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var kP,AO=l(()=>{"use strict";LP();kP=e=>{let t=Sl({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Xo,bO=l(()=>{"use strict";Xo=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var g4,f4,oe,hm=l(()=>{"use strict";pl();g4=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},f4=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,oe=e=>{let t=re(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:g4(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>f4(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var PO,wO=l(()=>{"use strict";pl();hm();PO=e=>{let t=oe(e.wizard),r=re(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var EP,vO=l(()=>{"use strict";wO();EP=e=>{let t=PO({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var h4,_O,WO=l(()=>{"use strict";h4=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},_O=e=>[...e].reduce(h4,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var y4,LO,kO=l(()=>{"use strict";y4=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},LO=e=>[...e].reduce(y4,{out:"",inString:!1,escaped:!1}).out});var S4,A4,EO,CO=l(()=>{"use strict";WO();kO();S4=e=>e.charCodeAt(0)===65279?e.slice(1):e,A4=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},EO=e=>LO(_O(A4(S4(e))))});var b4,P4,w4,RO,v4,vs,ym=l(()=>{"use strict";sP();CO();b4=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},P4=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},w4=e=>[...e].reduce(P4,{out:"",inString:!1,escaped:!1}).out,RO=e=>{let t=lm(e);return t.length===0?null:t[t.length-1]},v4=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},vs=e=>{let t=EO(b4(e)),r=RO(t);if(r!==null)return r;let o=w4(t),n=RO(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw v4(i)}}});var _4,W4,CP,xO,TO=l(()=>{"use strict";_4=/^[a-z0-9][a-z0-9-]{0,62}$/,W4=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return _4.test(t)?t:""},CP=e=>e.replace(/\s+/gu," ").trim(),xO=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=W4(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=CP(n.name),a=CP(n.description),c=CP(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var IO,OO,MO=l(()=>{"use strict";IO=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},OO=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var RP,NO=l(()=>{"use strict";ym();TO();MO();RP=(e,t)=>{let r=(()=>{try{return vs(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(IO(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(OO).filter(a=>a!==null),i=xO({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var xP,zO=l(()=>{"use strict";xP=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var TP,jO=l(()=>{"use strict";TP=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var IP,DO=l(()=>{"use strict";pl();hm();IP=e=>{let t=oe(e.wizard),r=re(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var OP,$O=l(()=>{"use strict";OP=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var wt,L4,MP,HO=l(()=>{"use strict";wt=m(bi());ym();L4=(0,wt.isType)({name:wt.isNonEmptyString,description:wt.isString,sampleValue:wt.isString}),MP=e=>{let t=vs(e);if(!(0,wt.isType)({templatedPrompt:wt.isNonEmptyString,variables:(0,wt.isArrayWithEachItem)(L4)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var ie,k4,E4,NP,FO=l(()=>{"use strict";ie=m(bi());ur();ym();k4=(0,ie.isType)({id:ie.isNonEmptyString,title:ie.isNonEmptyString,prompt:ie.isNonEmptyString,order:ie.isNumber}),E4=(0,ie.isType)({id:ie.isNonEmptyString,title:ie.isNonEmptyString,summary:ie.isString,topology:(0,ie.isOneOf)("chain","parallel"),modules:(0,ie.isArrayWithEachItem)(k4),recommended:ie.isBoolean}),NP=e=>{let t=vs(e);if(!(0,ie.isType)({options:(0,ie.isArrayWithEachItem)(E4)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var _s,UO=l(()=>{"use strict";_s=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var C4,zP,jP=l(()=>{"use strict";C4=/\{\{([a-zA-Z0-9_-]+)\}\}/g,zP=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(C4,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var vt,_t,BO=l(()=>{"use strict";bs();jP();vt=e=>zP(e.templatedPrompt,e.variables),_t=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return se(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??vt(e.wizard)}});var R4,Zo,GO=l(()=>{"use strict";R4=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Zo=(e,t)=>e.replace(R4,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var x4,Qo,Sm=l(()=>{"use strict";x4=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Qo=e=>{let t=new Set,r=[];for(let o of e.matchAll(x4)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Al,VO=l(()=>{"use strict";Sm();Al=e=>e.variables.length>0||Qo(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var DP,$P=l(()=>{"use strict";ur();DP=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var bl,qO=l(()=>{"use strict";bs();$P();bl=e=>{let t=e.wizard.evaluateSelectedRound??se(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:DP(r.judgement,e.passScore)}});var Pl,KO=l(()=>{"use strict";Pl=e=>e.length===1&&e[0].modules.length===1});var HP,JO=l(()=>{"use strict";HP=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var ye,Am,wl=l(()=>{"use strict";ye=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),Am=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var YO,XO=l(()=>{"use strict";wl();YO=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[ye("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),ye("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[ye("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var ZO,QO=l(()=>{"use strict";As();wl();ZO=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!C(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[ye("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),ye("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),ye("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",Am(e.writerLabel,e.folder)),ye("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[ye("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var eM,tM=l(()=>{"use strict";wl();eM=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[ye("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),ye("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[ye("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var rM,oM=l(()=>{"use strict";wl();rM=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[ye("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),ye("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",Am(e.writerLabel,e.folder)),...r?[ye("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var bm,nM=l(()=>{"use strict";As();XO();QO();tM();oM();bm=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(C(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return ZO(r);case"evaluate":return YO({...r,currentRound:e.currentRound});case"separate":return rM(r);case"optimize_modules":return eM({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var vl,mr,sM=l(()=>{"use strict";vl=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),mr=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var T4,Pm,FP,iM=l(()=>{"use strict";Sm();T4="wizardParam_",Pm=e=>`${T4}${e}`,FP=e=>{let t=Qo(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=Pm(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var Ze,aM=l(()=>{"use strict";Ze=["generalize","evaluate","separate","optimize_modules"]});var R=l(()=>{"use strict";As();im();HI();rP();dm();uP();UI();BI();GI();VI();oP();qI();bs();QI();yP();fP();eO();oO();ur();pl();nO();lO();cO();dO();pO();mO();hO();yO();SO();LP();AO();bO();hm();vO();NO();zO();jO();DO();$O();HO();FO();UO();BO();jP();GO();Sm();VO();qO();KO();$P();JO();nM();sM();iM();aM()});var UP,vm,I4,dM,uM=l(()=>{"use strict";UP=m(require("node:fs")),vm=m(require("node:path")),I4=e=>vm.default.join(vm.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),dM=(e,t)=>{let r=I4(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;UP.default.mkdirSync(vm.default.dirname(r),{recursive:!0}),UP.default.appendFileSync(r,o,"utf8")}});var Ws,pM,O4,mM,M4,gM,Ht,J,fM,D,Qe=l(()=>{"use strict";Ws=m(require("node:fs")),pM=m(require("node:path"));R();uM();O4=e=>e.wizard===void 0?e:{...e,wizard:PP(e.wizard)},mM=new Set,M4=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),gM=(e,t)=>{Ws.default.mkdirSync(pM.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;Ws.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),Ws.default.renameSync(r,e)},Ht=e=>{if(!Ws.default.existsSync(e))return[];try{let t=JSON.parse(Ws.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(M4).map(O4):[]}catch{return[]}},J=(e,t)=>Ht(e).find(r=>r.id===t)??null,fM=(e,t)=>{mM.add(t);let r=Ht(e).filter(o=>o.id!==t);gM(e,r)},D=(e,t)=>{if(mM.has(t.id))return;let r=Ht(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];gM(e,o),dM(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var hM,_m,BP,tn,GP,et,rn,ae,Fe=l(()=>{"use strict";hM=m(require("node:fs")),_m=m(require("node:os")),BP=m(require("node:path"));Zn();tn="~",GP=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,et=e=>{let t=_m.default.homedir(),r=GP(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},rn=e=>{let t=e.trim().length===0?"~":e.trim(),r=rt(t),o=BP.default.isAbsolute(r)?GP(r):GP(BP.default.resolve(_m.default.homedir(),r));try{if(!hM.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:et(o)}},ae=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:_m.default.homedir()});var VP=l(()=>{"use strict";Ji()});var N4,yM,SM=l(()=>{"use strict";VP();N4=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,yM=e=>{let t=Eo(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(N4)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var z4,j4,AM,Wm,bM,D4,nt,PM,wM,vM,qr=l(()=>{"use strict";VP();SM();z4="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",j4="The writer waited on terminal input and did not return a prompt.",AM=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Wm=e=>{let t=e.trim();if(t.length===0||t.length>=500||!AM.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>AM.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},bM=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},D4=e=>Wm(e.stdout)??Wm(e.stderr)??(bM(e.replyFile)?Wm(e.replyFile):null),nt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return z4;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?j4:null},PM=e=>{let t=e.trim();return t.length===0?null:nt(t)!==null?t:Wm(t)??(bM(t)?t:null)},wM=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],vM=e=>{let t=e.replyFileText?.trim()??"",r=nt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=D4({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null)return{ok:!1,errorMessage:o};let n=yM([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Eo(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply."}}});var Ls,Ft,_l,_M,Lm,$4,WM,LM,kM,qP=l(()=>{"use strict";Ls=m(require("node:fs")),Ft=m(require("node:path")),_l=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},_M=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Lm=(e,t)=>{let r=_l(e);return r.length>0?r:_l(t)},$4=e=>{let t=Lm(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${_M(o)}`,...n.length>0?[`description: ${_M(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},WM=e=>`.cursor/skills/${e}/SKILL.md`,LM=(e,t)=>{let r=_l(t);if(r.length===0)return!1;let o=Ft.default.resolve(e),n=Ft.default.resolve(o,".cursor","skills"),s=Ft.default.resolve(o,WM(r));return s.startsWith(`${n}${Ft.default.sep}`)?Ls.default.existsSync(s):!1},kM=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Lm(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Ft.default.resolve(e.workingDirectory);try{if(!Ls.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=$4({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=WM(r.slug),n=Ft.default.resolve(t,".cursor","skills"),s=Ft.default.resolve(t,o);if(!s.startsWith(`${n}${Ft.default.sep}`))return{ok:!1,errorCode:"path"};if(Ls.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Ls.default.mkdirSync(Ft.default.dirname(s),{recursive:!0}),Ls.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var H4,EM,CM,RM=l(()=>{"use strict";R();R();Qe();Fe();qr();qP();H4=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,EM=e=>{let t=e.get("savedSkill");return t!==null&&H4.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},CM=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=J(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!C(r.status))return{kind:"redirect",location:o("skillError=working")};let n=se(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||nt(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=kM({workingDirectory:ae(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var Kr,Wl=l(()=>{"use strict";R();Kr=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=HP(t);return{...e,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:vl(r.variables)},updatedAt:new Date().toISOString()}}});var Jr,Ll=l(()=>{"use strict";Jr=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var T,F4,km,ne,on,TM,xM,IM,OM,Se=l(()=>{"use strict";T="manual",F4=["claude-cli","codex","cursor","antigravity"],km={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ne=e=>e===T?"You":e in km?km[e]:e,on=e=>F4.filter(t=>e.includes(t)),TM=e=>{let t=on(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},xM=(e,t)=>t===T?T:e.find(r=>r===t)??null,IM=(e,t,r)=>{let o=on(e),n=xM(o,t),s=xM(o,r);return n===null||s===null?null:{judge:n,improver:s}},OM=(e,t,r)=>{let o=on(e);return t===null||t.trim()===""?r!==T?r:o[0]??null:t===T?null:o.find(n=>n===t)??null}});var KP=l(()=>{"use strict";ht();Va();Ji()});var JP,MM,NM=l(()=>{"use strict";JP={ok:!1,errorMessage:"Stopped.",stopped:!0},MM=(e,t,r)=>{if(t===void 0)return;let o=()=>{e.kill("SIGTERM"),r(JP)};if(t.aborted){o();return}t.addEventListener("abort",o,{once:!0})}});var zM,kl,jM,YP,U4,B4,G4,Ue,ks=l(()=>{"use strict";zM=require("node:child_process"),kl=m(require("node:fs")),jM=m(require("node:os")),YP=m(require("node:path"));KP();NM();qr();U4=["claude-cli","codex","cursor","antigravity"],B4=18e4,G4=e=>U4.includes(e),Ue=e=>new Promise(t=>{if(e.signal?.aborted){t(JP);return}if(!G4(e.writerAgent)){t({ok:!1,errorMessage:"The writer did not reply."});return}let r=e.writerAgent,o=Nt(r,e.prompt,de({}));if(o===null){t({ok:!1,errorMessage:"The writer did not reply."});return}if(!kl.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=YP.default.join(kl.default.mkdtempSync(YP.default.join(jM.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),s=wM({writerAgent:r,baseArgs:o.args,replyPath:n}),i=[],a=[],c={settled:!1,timer:void 0},d=(0,zM.spawn)(o.command,[...s],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),p=g=>{c.settled||(c.settled=!0,clearTimeout(c.timer),t(g))};MM(d,e.signal,p),c.timer=setTimeout(()=>{d.kill("SIGTERM"),p({ok:!1,errorMessage:"The writer did not reply."})},e.timeoutMs??B4),d.stdout.on("data",g=>{i.push(Buffer.from(g))}),d.stderr.on("data",g=>{a.push(Buffer.from(g))}),d.on("error",()=>p({ok:!1,errorMessage:"The writer did not reply."})),d.on("close",()=>{let g=kl.default.existsSync(n)?kl.default.readFileSync(n,"utf8"):null;p(vM({writerAgent:r,stdout:Buffer.concat(i).toString("utf8"),stderr:Buffer.concat(a).toString("utf8"),replyFileText:g}))})})});var DM,V4,El,Em,Cm=l(()=>{"use strict";R();Se();DM=e=>e===T?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},V4=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),El=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=dP({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:DM(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:al(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=V4(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i}},Em=(e,t,r=null)=>{let o=um({raw:t,judge:DM(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Rm,XP=l(()=>{"use strict";Rm=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var FM,xm,Tm,$M,HM,ZP,q4,UM,QP,K4,BM,J4,Y4,GM,VM=l(()=>{"use strict";FM=require("node:child_process"),xm=m(require("node:fs")),Tm=m(require("node:path"));R();$M=4e3,HM=12e3,ZP=(e,t)=>{let r=(0,FM.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},q4=e=>ZP(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",UM=e=>{let t=ZP(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},QP=(e,t)=>{let r=Tm.default.resolve(e,t),o=Tm.default.relative(e,r);if(o.startsWith("..")||Tm.default.isAbsolute(o)||!xm.default.existsSync(r)||!xm.default.statSync(r).isFile())return null;let n=xm.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>$M?`${n.slice(0,$M)}
\u2026truncated`:n},K4=e=>e.length>HM?`${e.slice(0,HM)}
\u2026truncated`:e,BM=e=>{let t=mP(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,QP(e.workingDirectory,n)])),o=q4(e.workingDirectory);return{git:o,status:o?UM(e.workingDirectory):{},files:r,paths:t}},J4=(e,t)=>{let r=ZP(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=QP(e,t);return o===null?`${t} is missing.`:o},Y4=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",GM=e=>{let t=e.before.git?UM(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=QP(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>J4(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:Y4(e.before.git,e.before.paths.length>0),evidence:K4(i.join(`

`))}}});var rw,U,ow,ke,qM,X4,Z4,KM,Es,JM,Cs,Q4,e3,Cl,ew,tw,t3,YM,r3,o3,n3,XM,s3,ZM,QM,i3,a3,eN,tN=l(()=>{"use strict";rw=require("node:child_process"),U=m(require("node:fs")),ow=m(require("node:os")),ke=m(require("node:path")),qM=8e6,X4=16e6,Z4=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],KM=(e,t)=>{let r=(0,rw.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Es=(e,t)=>(0,rw.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,JM=e=>{let t=KM(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},Cs=(e,t)=>{let r=ke.default.resolve(e,t),o=ke.default.relative(e,r);return o.startsWith("..")||ke.default.isAbsolute(o)?null:r},Q4=(e,t)=>{let r=Cs(e,t);if(r===null||!U.default.existsSync(r))return null;let o=U.default.statSync(r);return!o.isFile()||o.size>qM?null:U.default.readFileSync(r)},e3=(e,t,r)=>{let o=Cs(e,t);o!==null&&(U.default.mkdirSync(ke.default.dirname(o),{recursive:!0}),U.default.writeFileSync(o,r))},Cl=(e,t)=>{let r=Cs(e,t);r===null||!U.default.existsSync(r)||U.default.rmSync(r,{recursive:!0,force:!0})},ew=(e,t)=>Es(e,["cat-file","-e",`HEAD:${t}`]),tw=e=>{let t=KM(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},t3=e=>ke.default.resolve(e)!==ke.default.resolve(ow.default.homedir()),YM=e=>{if(!U.default.existsSync(e))return 0;let t=U.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?U.default.readdirSync(e).reduce((r,o)=>r+YM(ke.default.join(e,o)),0):0},r3=(e,t,r)=>{let o=Cs(e,r);if(o===null||!U.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(YM(o)>X4)return{relativePath:r,existed:!0,copyDir:null};let n=ke.default.join(t,"cache",r);return U.default.mkdirSync(ke.default.dirname(n),{recursive:!0}),U.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},o3=400,n3=32e6,XM=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!U.default.existsSync(s)))for(let i of U.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=ke.default.join(s,i),c=U.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>qM)){if(t.length>=o3||r+c.size>n3){o=!1;return}r+=c.size,t.push(ke.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},s3=(e,t,r)=>{let o=Cs(e,r);if(o===null||!U.default.existsSync(o))return null;let n=Q4(e,r);if(n===null)return"skip";let s=ke.default.join(t,"files",r);return U.default.mkdirSync(ke.default.dirname(s),{recursive:!0}),U.default.writeFileSync(s,n),s},ZM=e=>{let t=U.default.mkdtempSync(ke.default.join(ow.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?JM(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:XM(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,s3(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?tw(e.workingDirectory):null,isolateCaches:t3(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:Z4.map(i=>r3(e.workingDirectory,t,i))}},QM=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Cl(e.workingDirectory,t);return}e3(e.workingDirectory,t,U.default.readFileSync(r))}},i3=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?QM(e,t):ew(e.workingDirectory,t)?Es(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Cl(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&ew(e.workingDirectory,t)&&Es(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!ew(e.workingDirectory,t)&&Es(e.workingDirectory,["reset","-q","HEAD","--",t])},a3=(e,t)=>{let r=Cs(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Cl(e.workingDirectory,t.relativePath),U.default.mkdirSync(ke.default.dirname(r),{recursive:!0}),U.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Cl(e.workingDirectory,t.relativePath);return}if(U.default.existsSync(r))for(let o of U.default.readdirSync(r)){let n=ke.default.join(r,o);U.default.statSync(n).mtimeMs>=e.startedMs-1e3&&U.default.rmSync(n,{recursive:!0,force:!0})}}}},eN=e=>{try{if(e.git){if(tw(e.workingDirectory)!==e.head&&(!(e.head===null?Es(e.workingDirectory,["update-ref","-d","HEAD"]):Es(e.workingDirectory,["reset","--hard",e.head]))||tw(e.workingDirectory)!==e.head))throw new Error("head");let r=JM(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))i3(e,o)}else{if(e.complete)for(let t of XM(e.workingDirectory).paths)e.files[t]===void 0&&Cl(e.workingDirectory,t);for(let t of Object.keys(e.files))QM(e,t)}for(let t of e.caches)a3(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{U.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Im,Om,l3,c3,d3,u3,p3,rN,m3,oN,nN=l(()=>{"use strict";R();Cm();XP();VM();tN();Se();Fe();ks();Im=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),Om=e=>({...e,status:"stopped",errorMessage:Ko,judgePhase:void 0,updatedAt:new Date().toISOString()}),l3=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),c3=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==T?t:e.improverModel!==T?e.improverModel:null}return e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null},d3=async e=>{let t=ae(e.cycle),r=BM({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=ZM({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?yl({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Xo(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):il({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=await Ue({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal}),a=i.ok?GM({workingDirectory:t,before:r,writerReply:i.text}):null,c=eN(o);return i.ok?!c.ok||a===null?{ok:!1,cycle:Im(e.cycle,c.ok?"Could not put the folder back after the run.":c.errorMessage)}:{ok:!0,run:{output:i.text.trim(),tokens:i.tokens,delayMs:Date.now()-n,lookedAt:a.lookedAt,evidence:a.evidence}}:i.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Om(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Im(e.cycle,i.errorMessage)})},u3=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:d3({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),p3=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),rN=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Ue({writerAgent:e.reviewer,workingDirectory:ae(e.cycle),prompt:pP({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Om(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},m3=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===T)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Ue({writerAgent:t.judgeModel,workingDirectory:ae(t),prompt:Yo({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...El(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?Om(o):(e.onWriterFailure?.(t.judgeModel),Im(o,n.errorMessage))},oN=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return m3(e);let o=c3(t),n=await u3({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?l3(t,n.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===T){let p=await rN({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...p3(s,p.text),judgePhase:void 0}}let i=await Ue({writerAgent:t.judgeModel,workingDirectory:ae(t),prompt:Jo({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Om(s):(e.onWriterFailure?.(t.judgeModel),Im(s,i.errorMessage));let a=await rN({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=El(s,i.text,c);return Rm(d,a.text)}});var nn,Mm=l(()=>{"use strict";R();nn=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:sl({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:al(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var Nm,g3,f3,nw,sN=l(()=>{"use strict";R();Cm();nN();Mm();Se();Fe();ks();Nm=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),g3=e=>({...e,status:"stopped",errorMessage:Ko,updatedAt:new Date().toISOString()}),f3=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?g3(e):(n?.(r),Nm(e,t.errorMessage)),nw=async(e,t,r,o)=>{let n=e.revisions.find(c=>c.roundNumber===e.currentRound);if(n===void 0)return Nm(e,"This round has no prompt.");if(e.status==="judging")return oN({cycle:e,revision:n,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return Nm(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===T)return e;let s=nn(e);if(s===null)return Nm(e,"The improver needs the score and the reason.");let i=await Ue({writerAgent:e.improverModel,workingDirectory:ae(e),prompt:Gr({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r}),a=f3(e,i,e.improverModel,r,t);return a!==null?a:Em(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var Rl,sw=l(()=>{"use strict";Rl=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var Dm,zm,iN,h3,y3,jm,aN,lN,S3,A3,sn,cN,dN,xl=l(()=>{"use strict";R();Wl();Ll();Se();Fe();ks();sN();sw();Dm=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),zm=(e,t,r)=>e.wizard===void 0||t===null?Dm(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},iN=e=>{let t=e.wizard;return t===void 0||Rl(e).length===0?e:{...e,wizard:_s({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},h3=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",y3=e=>{let t=e.wizard;if(t===void 0)return e;let r=Sl({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:_s({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},jm=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),aN=e=>e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null,lN=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},S3=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=aN(e);if(n===null)return Dm(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??vt(o),i=fl({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:lN(e,"generalize")}),a=await Ue({writerAgent:n,prompt:i,workingDirectory:ae(e),signal:t});if(!a.ok)return r?.(n),zm(e,"generalize",a.errorMessage);try{let c=MP(a.text),d=_s({wizard:{...o,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:vl(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return Al(d)?sn({...p,wizard:{...d,gate:null}}):jm(p,"generalize")}catch(c){return zm(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},A3=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=aN(e);if(n===null)return Dm(e,"Choose a writer to suggest splits.");let s=_t({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=hl({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:lN(e,"separate")}),a=await Ue({writerAgent:n,prompt:i,workingDirectory:ae(e),signal:t});if(!a.ok)return r?.(n),zm(e,"separate",a.errorMessage);try{let c=NP(a.text),d=_P(c,o.variables),p=_s({wizard:{...o,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:p};return Pl(d)?Kr(g,d[0]):jm(g,"separate")}catch(c){return zm(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},sn=e=>{let t=e.wizard;if(t===void 0)return e;let r=vt(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},cN=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Dm(e,"This module is missing.");let n=mr(r),s=Zo(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==T?e.runnerModel:e.judgeModel!==T?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:re(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},dN=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return nw(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return S3(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return A3(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await nw(e,t,r,o);if(C(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Rl(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=se(s.revisions.map(b=>({roundNumber:b.roundNumber,promptText:b.promptText,score:b.judgement?.score??0,reasons:b.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&bl({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let p=iN(jm(a,i));return Jr(p)}let c=jm(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=kP({wizard:{...c.wizard,modules:c.wizard.modules.map((g,b)=>b===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:h3(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?iN(d):y3(d)}return s}return n.phase==="complete",e}});var Rs,$m=l(()=>{"use strict";R();Se();Rs=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:xP(r,e.judgeModel===T),updatedAt:new Date().toISOString()}}});var uN,xs,Hm=l(()=>{"use strict";qr();uN=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:PM(e.promptText)},xs=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t===void 0?null:uN(t);if(r!==null)return r.trim();for(let o=e.revisions.length-1;o>=0;o-=1){let n=uN(e.revisions[o]);if(n!==null)return n.trim()}return null}});var Ut,Ts=l(()=>{"use strict";Ut='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var iw,pN,b3,mN,gN,aw=l(()=>{"use strict";R();Se();Fe();Ts();iw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pN=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',b3=e=>{let t=pN(e.state),r=`<h2>${iw(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${iw(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Ut}</button></div><template>${r}</template></li>`},mN=e=>{let t=e.wizard;if(t===void 0)return"";let r=bm({status:e.status,wizard:t,writerLabel:ne(e.judgeModel),runnerLabel:ne(e.runnerModel??e.judgeModel),folderDisplay:et(ae(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(b3).join("")}</ol>`},gN=e=>{let t=e.wizard;if(t===void 0)return"";let r=bm({status:e.status,wizard:t,writerLabel:ne(e.judgeModel),runnerLabel:ne(e.runnerModel??e.judgeModel),folderDisplay:et(ae(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${pN(n.state)}<span class="sdlc-pipeline-label">${iw(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var Wt,fN,hN,yN,lw=l(()=>{"use strict";R();Wt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fN="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",hN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Wt(fN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${Wt(i.name)}}}</strong> \u2014 ${Wt(i.description)} (sample: ${Wt(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Wt(r)}</pre>`,n=vt(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Wt(n)}</pre>`;return`${t}${o}${s}`},yN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Wt(fN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${Wt(n.name)}}}</strong> \u2014 ${Wt(n.description)} (sample: ${Wt(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${Wt(r)}</pre>`;return`${t}${o}`}});var SN,AN=l(()=>{"use strict";R();SN=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=Yo({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=Jo({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var cw,Fm,dw=l(()=>{"use strict";Ts();AN();cw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Fm=e=>{let t=SN(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${cw(r)}">${Ut}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${cw(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${cw(t)}</pre></template>`}});var Um,Is,uw=l(()=>{"use strict";sw();dw();Um=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Is=e=>{let t=Rl(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${Um(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,p=e.cycle.revisions.map(g=>{let b=g.judgement?.score,h=b==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${b}`,y=g.judgement?.reasons?.trim()??"",u=y.length===0?"":`<br><span class="muted">${Um(y)}</span>`,S=Fm({cycle:e.cycle,roundNumber:g.roundNumber,promptText:g.promptText,run:g.run});if(e.interactive){let A=e.selectedRound===g.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${A}> <span class="sdlc-wizard-revision-title">${Um(h)}</span></label>${S}${u}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Um(h)}</span>${S}${u}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var pw,bN,PN,wN,mw=l(()=>{"use strict";pw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bN=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${pw(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${pw(t.prompt)}</pre></li>`).join("")}</ol>`,PN=e=>bN([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),wN=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${pw(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${bN(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Tl,P3,Bm,gw=l(()=>{"use strict";R();mw();Tl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),P3=e=>{let t=e.wizard;return t===void 0?"":_t({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},Bm=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=P3(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Tl(n.orchestratorSkill.fileName)}</code> \u2014 ${Tl(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${Tl(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=PN(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${Tl(r)} <span class="muted">${Tl(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Oe,w3,v3,_3,W3,Gm,L3,k3,E3,C3,R3,x3,Os,Vm=l(()=>{"use strict";R();aw();lw();uw();dw();gw();Oe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),w3={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},v3=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Oe(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Oe(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Oe(o)}</pre></details>`;return`<h2>${Oe(e)}</h2>${n}`},_3=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=vt(t).trim(),n=_t({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!C(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${v3("What is being evaluated",i)}`},W3=(e,t)=>{let r=e.wizard;if(r===void 0||C(e.status))return"";let o=w3[t];return o===void 0||r.phase!==o?"":gN(e)},Gm=(e,t,r)=>{let o=W3(e,t),n=t==="wizard-2"?_3(e):"";return`${o}${n}${r}`},L3=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},k3=e=>{let t=e.wizard;return t===void 0?"":hN(t)},E3=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Oe(a)}</span>`,d=Fm({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Oe(s)}${i}</span>${d}${c}</li>`}).join("")}</ul>`,C3=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Is({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=L3(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${E3(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=_t({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Oe(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Oe(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},R3=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Oe(n.title)}</strong> <span class="muted">(${Oe(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Oe(o.title)}</strong>${n}${Oe(s)}${Bm(e,o)}</li>`}).join("")}</ul>`},x3=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Oe(i)}</span> <strong>${Oe(n.title)}</strong>${Oe(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Oe(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Is({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Os=(e,t)=>{switch(t){case"wizard-1":return Gm(e,t,k3(e));case"wizard-2":return Gm(e,t,C3(e));case"wizard-3":return Gm(e,t,R3(e));case"wizard-4":return Gm(e,t,x3(e));default:return""}}});var T3,I3,vN,_N,WN=l(()=>{"use strict";R();Hm();qr();Vm();T3=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},I3=e=>{let t=e.goal.trim();return t.length===0?null:t},vN=(e,t,r,o,n)=>{let s=nt(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},_N=(e,t)=>{let r=I3(e);if(t.id.startsWith("wizard-")){let s=Os(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=cl(e,t);if(s!==null){let a=xs(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=se(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:vN(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:T3(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:vN(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var an,LN,kN=l(()=>{"use strict";an=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),LN=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${an(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${an(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${an(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${an(n)}</h2><pre class="mono">${an(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${an(e.goal)}</dd></div></dl>`;return`<h2>${an(e.title)}</h2>${i}${t}${r}${o}${s}`}});var O3,EN,Il,fw,qm=l(()=>{"use strict";R();O3=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),EN=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||C(e.status))return null;let r=Pt(t);return r<0||r>3?null:`wizard-${r+1}`},Il=(e,t)=>O3.has(t)?EN(e)===t:!1,fw="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var M3,Km,hw=l(()=>{"use strict";M3='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Km=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${M3}</button>`});var N3,CN,z3,yw,RN,j3,D3,$3,H3,xN,TN=l(()=>{"use strict";R();Mm();N3={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},CN=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},z3=e=>N3[e]??null,yw=(e,t)=>{let r=e.wizard,o=z3(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=Pt(r);return o<n||o===n},RN=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},j3=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:vt(t).trim();return o.length===0?null:fl({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:CN(e,"generalize")})},D3=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=nn(e);return n===null?null:Gr({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=RN(e)?.promptText.trim()??_t({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:Yo({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},$3=e=>{let t=e.wizard;if(t===void 0)return null;let r=_t({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:hl({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:CN(e,"separate")})},H3=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=mr(t),s=Zo(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=nn(e);return c===null?null:Gr({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=RN(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||C(e.status)&&i?.judgement!==null)?Jo({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):yl({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:Xo(t,r).output,moduleTitle:o.title})},xN=(e,t)=>{if(!yw(e,t))return null;switch(t){case"wizard-1":return j3(e);case"wizard-2":return D3(e);case"wizard-3":return $3(e);case"wizard-4":return H3(e);default:return null}}});var F3,Jm,Sw=l(()=>{"use strict";R();F3=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},Jm=(e,t)=>{let r=e.wizard,o=F3(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=Pt(r);return o<n?"done":o===n&&C(e.status)&&e.status==="failed"?"failed":o<=n&&C(e.status)?"done":"pending"}});var U3,Ms,Ym=l(()=>{"use strict";Ts();TN();Sw();U3=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ms=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(Jm(e,t)==="pending")return""}else if(!yw(e,t))return"";let o=xN(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Ut}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${U3(o)}</pre></template>`}});var ln,Ns,Ol=l(()=>{"use strict";ln=e=>e.toLocaleString("en-US"),Ns=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var Bt,B3,IN,ON,MN,NN,Aw=l(()=>{"use strict";R();WN();kN();qm();hw();Ts();Hm();aw();Ym();Ol();Bt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),B3=(e,t)=>{let r=cl(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Ns(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${ln(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Bt(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${Bt(r)}</span>`:"",d=LN(_N(t,e)),p=t.wizard!==void 0&&t.wizard.phase==="complete"&&C(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${Bt(e.id)}"`:"",g=Il(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${Bt(fw)}"><input type="hidden" name="cycleId" value="${Bt(t.id)}"><input type="hidden" name="wizardStepId" value="${Bt(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",b=e.state==="active"&&e.id.startsWith("wizard-")?mN(t):"",h=o?"failed":e.state,y=o?xs(t):null,u=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Ut}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${Bt(y)}</pre></template>`:"",S=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Ms(t,e.id):"";return`<li class="sdlc-node sdlc-node-${h}" data-sdlc-step-id="${Bt(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${p} data-sdlc-node>${n}<span class="sdlc-node-label">${Bt(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${g}${S}${u}</div></div>${b}<template>${d}</template></li>`},IN=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>B3(r,t)).join("")}</ol>`,ON=e=>`<div class="sdlc-score" aria-label="What the score means">${ll(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Bt(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,MN=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${Km({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,NN=`<script>
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
</script>`});var Yr,zN,G3,jN=l(()=>{"use strict";R();Fe();qr();qP();Yr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zN=e=>{if(!C(e.status))return"";let t=se(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=nt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Yr(t.reasons.trim())}</p>`,i=n===null?G3({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ae(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${Yr(n)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${o}${s}${i}</section>`},G3=e=>{let t=e.sourceSkill?.fileName??_l(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=Lm(t,r),s=n.length>0&&LM(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Yr(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Yr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Yr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Yr(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Yr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Yr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var DN,$N=l(()=>{"use strict";DN=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var HN,V3,Xm,Be,Zm,bw=l(()=>{"use strict";R();R();Se();$N();Hm();qr();HN=["Generalize","Evaluate","Separate","Optimize modules"],V3=e=>{let t=Pt(e),r=t>=0&&t<HN.length?HN[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},Xm=(e,t)=>{let r=xs(e),o=r===null?null:DN(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Be=(e,t)=>({title:e,detail:t,replyPreview:null}),Zm=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:null}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!C(e.status)){let t=e.judgeModel;return Be(`${ne(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!C(e.status)){let t=e.judgeModel;return Be(`${ne(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===T?Be(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Be(`${ne(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Be(`${ne(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===T){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==T?Be(`${ne(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Be(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Be(`${ne(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=re(t);return Be(`${ne(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Be(`${ne(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=re(t);return Be(`${ne(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Be(`${ne(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===T){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Be("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Be(`${ne(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>nt(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=oe(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||C(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?Xm(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o="A writer or judge reply could not be used. Start a new run after fixing the issue.";return r!==void 0?Xm(e,{title:V3(r),detail:t.length>0?t:o}):Xm(e,{title:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(C(e.status)){let t=e.errorMessage?.trim()??"";return Xm(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var Gt,Ml=l(()=>{"use strict";Se();Gt=e=>{if(e.status==="improving"&&e.improverModel===T)return!0;if(e.status!=="judging"||e.judgeModel!==T)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===T}});var FN,UN=l(()=>{"use strict";FN=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Xr,q3,BN,GN=l(()=>{"use strict";R();Xr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),q3=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Xr(r)}</p>`},BN=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Xr(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Xr(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Xr(a)}.</p>`}<pre class="mono">${Xr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Vr(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Xr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",g=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Xr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${q3(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Xr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Nl,K3,VN,qN=l(()=>{"use strict";R();qr();Nl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),K3=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=nt(t.promptText),n=t.judgement?.reasons?`<p class="muted">${Nl(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Nl(i)}.</p>`}<pre class="mono">${Nl(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Vr(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${Nl(d)}</pre>`:`<div class="alert-error">${Nl(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},VN=e=>e.revisions.map(t=>K3(e,t)).join("")});var KN,JN=l(()=>{"use strict";R();KN=e=>{if(C(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Vt,J3,Pw,Y3,X3,Z3,Q3,YN,XN,ww=l(()=>{"use strict";JN();Vt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),J3="Stop this run? Writers will stop and the best prompt is kept.",Pw="End the wizard? Writers will stop and progress from finished steps is kept.",Y3="Skip this module and pause at the step gate?",X3=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Vt(J3)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Vt(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,Z3=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Vt(Pw)}"><input type="hidden" name="cycleId" value="${Vt(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,Q3=e=>{let t=Vt(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Vt(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Vt(Y3)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Vt(Pw)}">End wizard</button>
    </form>
  </div>`},YN=e=>{let t=KN(e);return t==="none"?"":t==="classic"?X3(e.id):t==="wizard_end_only"?Z3(e.id):Q3(e)},XN=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Vt(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Vt(Pw)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var ZN,QN=l(()=>{"use strict";R();Ol();ZN=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=oe(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${ln(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${ln(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${re(r)}`}return""}});var e6,t6,ez,r6,tz,rz=l(()=>{"use strict";R();QN();Sw();Vm();Ym();e6=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',t6=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',ez=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),r6=(e,t,r)=>{let o=Os(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=ZN(e,t),i=Jm(e,t),a=e6(i),c=t6(i),d=Ms(e,t,{forOutcomeSummary:!0}),p=`${a}<span class="sdlc-wizard-outcome-step-title">${ez(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${ez(s)}</span>`,g=t==="wizard-4"&&r.phase==="complete"?" open":"",b=i==="failed"&&t!=="wizard-4"?" open":"",h=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${h}"${g}${b}><summary aria-controls="${h}-body">${p}</summary><div class="sdlc-wizard-outcome-step-body" id="${h}-body">${o}</div></details>`},tz=e=>{let t=e.wizard;if(t===void 0||!C(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>r6(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var oz,nz,sz=l(()=>{"use strict";oz=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nz=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${oz(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${oz(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var vw,iz,_w=l(()=>{"use strict";vw=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,iz=(e,t)=>{if(vw(e,t))return"Passed";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var az,lz=l(()=>{"use strict";az=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var Qm,cz,dz=l(()=>{"use strict";R();_w();_w();lz();Qm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cz=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=oe(t),o=re(t),n=r.terminalStatusSuggestion==="passed"?"":az(r,o),s=o-10,i=r.rows.map((c,d)=>{let p=t.modules[d],g=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,h=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=p===void 0?c.status:iz(p,o),u=p!==void 0&&vw(p,o)?'<span aria-label="Passed">\u2713</span>':Qm(y);return`<tr${h}><td>${Qm(c.title)}</td><td>${Qm(g)}</td><td>${c.tokens??"\u2014"}</td><td>${u}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${Qm(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var cn,eg,Ww=l(()=>{"use strict";cn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eg=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${cn(r.fileName)}</code> \u2014 ${cn(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${cn(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${cn(i.name)}</strong> <code>.cursor/skills/${cn(i.fileName)}/SKILL.md</code></p><p class="muted">${cn(i.description)}</p><p>${cn(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var o6,uz,pz=l(()=>{"use strict";R();R();sz();dz();Ww();o6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uz=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!C(e.status)||t.modules.length===0)return"";let r=cz(e),o=nz(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=oe(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${o6(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${eg(e)}${a}${r}${o}</section>`}});var gr,zl=l(()=>{"use strict";gr=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var fr,tg,Lw=l(()=>{"use strict";R();Aw();jN();bw();Ml();UN();Mm();GN();qN();ww();rz();pz();Ol();Fe();zl();fr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tg=e=>{let t=!C(e.status)&&e.status!=="wizard_paused"&&!Gt(e),r=Zm(e),o=IN(SP(FN(e)),e),n=C(e.status)?"":YN(e),s=tz(e),i=uz(e),a=zN(e),c=e.errorMessage===null?"":`<div class="alert-error">${fr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?oe(e.wizard):null,b=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,h=!t&&e.wizard!==void 0&&C(e.status)&&(e.wizard.phase==="complete"||oe(e.wizard).passedModuleCount>0),y=h?b?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",u=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${fr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",S=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${fr(r.replyPreview)}</pre>`,A=r.detail.length===0&&u.length===0&&S.length===0||r.detail.length===0&&S.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${fr(r.detail)}${p}</p>`}${S}</div>`,f=e.revisions.find(io=>io.roundNumber===e.currentRound),w=e.status==="improving"?nn(e):null,v=Ns(e),W=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),L=Gt(e)?BN({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:w?.promptText??f?.promptText??"",score:w?.score??f?.judgement?.score??null,reasons:w?.reasons??f?.judgement?.reasons??null,avoid:w?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:W?1:0}):"",E=e.wizard!==void 0&&e.wizard.phase==="complete"&&C(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!E&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?re(e.wizard):e.passScore,M=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${ON(I)}</div>`:"",B=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':C(e.status)?e.status==="failed"?'<span class="sdlc-run-badge sdlc-run-badge-failed">Failed</span>':E&&g!==null&&!b?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",V=t?d:h?b?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',F=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${fr(et(ae(e)))}</li>`:"",v>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${ln(v)} so far</li>`:""].filter(io=>io.length>0),ct=F.length===0?"":`<ul class="sdlc-run-meta">${F.join("")}</ul>`,H=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,ge=E?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,so=E?"":M.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${ge}</div>`:`<div class="sdlc-run-grid">${ge}${M}</div>`,Et=VN(e),LU=e.wizard!==void 0&&C(e.status)&&e.revisions.every(io=>io.roundNumber===0&&(io.judgement===void 0||io.judgement===null)),kU=Et.length===0||LU?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${Et}</div></section>`,EU=`<p class="sdlc-run-goal" title="${fr(e.goal.trim())}">${fr(gr(e.goal))}</p>`,CU=E?`${c}${i}${s}${L}${a}`:`${c}${so}${L}${s}${a}`,RU='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',xU=E?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${fr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${RU}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${B}</div>${EU}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${V}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${fr(r.title)}</h2>${A}${u}${xU}</div></div>${ct}${H}</header>${CU}</section>${kU}`}});var mz,gz=l(()=>{"use strict";R();Ll();mz=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!bl({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:Jr(e)}});var fz,hz=l(()=>{"use strict";R();xl();fz=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Al(t)?e:sn({...e,wizard:{...t,gate:null}})}});var yz,Sz=l(()=>{"use strict";R();Wl();yz=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Pl(t.splitOptions))return e;let r=t.splitOptions[0];return Kr(e,r)}});var n6,dn,rg=l(()=>{"use strict";gz();hz();Sz();Qe();n6=e=>{let t=fz(e),r=mz(t);return yz(r)},dn=(e,t)=>{let r=n6(t);return r!==t?(D(e,r),r):t}});var Az,hr,jl=l(()=>{"use strict";R();Az=e=>Ze.indexOf(e),hr=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||C(e.status)?Ze.length:t.gate!==null?Az(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?Az(t.phase):null}});var bz,Pz=l(()=>{"use strict";bz=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var un,wz,vz=l(()=>{"use strict";R();Pz();un=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wz=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Xo(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${un(bz(o))}</pre></div>`:"",s=Qo(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=mr(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=Pm(c),g=i[c]??"",b=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${un(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${un(p)}">${un(b)}</label>
        ${h}
        <input class="input" type="text" id="${un(p)}" name="${un(p)}" value="${un(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var Dl,_z,Wz=l(()=>{"use strict";R();lw();vz();uw();ww();Ww();gw();Dl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_z=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate,n=re(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?yN(r):"",a=o==="evaluate"?eg(e):"",c=o==="evaluate"?Is({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",p=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(x=>{let I=x.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',M=x.recommended?' <span class="sdlc-badge">Recommended</span>':"",B=r.selectedSplitOptionId===x.id||r.selectedSplitOptionId===null&&x.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${Dl(x.id)}" required${B}> <strong>${Dl(x.title)}</strong>${I}${M}</label>${Bm(e,x)}</li>`}).join("")}</ul>`:"",g=r.modules[r.currentModuleIndex],h=o==="optimize_modules"&&g?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=g?.title??"Module",u=g?.prompt??"",S=g?.status==="pending",A=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Dl(y)}</p>${S?wz({cycle:e,modulePrompt:u}):""}<p class="muted">Test run prompt preview: ${Dl(Zo(u,mr(r)))}</p>${g?.statistics===null||g?.statistics===void 0?"":`<p class="muted">Module stats: best ${g.statistics.bestScore??"\u2014"} / \u2265${n} (round ${g.statistics.bestRound??"\u2014"}).</p>`}${Is({cycle:e,interactive:!1,caption:S?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",f=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":S?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",w=OP(r),v=w===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${w}</p>`,W=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",L=t?.active===!0?" sdlc-wizard-gate-active":"",E=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${W}"`:"";return`<section class="card sdlc-wizard-gate${L}"${E}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${f}</p>
    ${v}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Dl(e.id)}">
    ${i}
    ${a}
    ${c}
    ${p}
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
    ${XN(e)}
  </section>`}});var s6,Lz,kz=l(()=>{"use strict";R();Ym();s6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lz=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||C(e.status))return"";let r=(o,n)=>{let s=Ms(e,o);return`<h2 class="sdlc-wizard-active-head">${s6(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var kw,Ez,Cz,Zr,Rz,zs=l(()=>{"use strict";R();Qe();kw=new Map,Ez=e=>{let t=new AbortController;return kw.set(e,t),t.signal},Cz=e=>{kw.delete(e)},Zr=e=>{kw.get(e)?.abort()},Rz=(e,t)=>{let r=J(e,t);return r===null||r.wizard!==void 0?!1:(C(r.status)||(D(e,{...r,status:"stopped",errorMessage:Ko,updatedAt:new Date().toISOString()}),Zr(t)),!0)}});var xz,Tz,Ew,Iz,Cw=l(()=>{"use strict";R();jl();zs();xz="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",Tz=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return Ze[r]??null},Ew=(e,t)=>{let r=Tz(t);if(r===null||e.wizard===void 0)return!1;let o=Ze.indexOf(r);if(o===-1)return!1;let n=hr(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<Ze.length)},Iz=(e,t)=>{let r=Tz(t);if(r===null||e.wizard===void 0||!Ew(e,t))return e;Zr(e.id);let o=Ze.slice(Ze.indexOf(r)),n=gl(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var Rw,Oz,Mz=l(()=>{"use strict";Cw();Rw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Oz=(e,t)=>Ew(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${Rw(xz)}"><input type="hidden" name="cycleId" value="${Rw(e.id)}"><input type="hidden" name="wizardStepId" value="${Rw(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var i6,a6,l6,Nz,zz=l(()=>{"use strict";R();jl();Wz();kz();Mz();Vm();i6={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},a6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),l6=(e,t,r)=>{let o=Oz(e,t);return`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${a6(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${Os(e,t)}</div>
</details>`},Nz=e=>{let t=e.wizard;if(t===void 0)return"";let r=hr(e);if(r===null)return"";let o=Ze.slice(0,r).map((i,a)=>l6(e,`wizard-${a+1}`,i6[i])),n=t.gate!==null?_z(e,{active:!0}):Lz(e),s=r>=Ze.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var og,xw=l(()=>{"use strict";zz();mw();R();og=e=>{if(e===null||e.wizard!==void 0&&C(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=Nz(e),r=wN(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var c6,Tw,jz=l(()=>{"use strict";R();Se();Fe();ks();c6=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},Tw=async(e,t,r)=>{if(!c6(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===T)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=EP({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Ue({writerAgent:e.judgeModel,prompt:n,workingDirectory:ae(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=RP(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var $l,ng,Dz,Iw,$z,Hz,Fz,sg,Ow=l(()=>{"use strict";$l=m(require("node:fs")),ng=m(require("node:path")),Dz=e=>ng.default.join(ng.default.dirname(e),"prompt-optimizer-writer-ready.json"),Iw=e=>{let t=Dz(e);if(!$l.default.existsSync(t))return{};try{let r=JSON.parse($l.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},$z=(e,t)=>{$l.default.mkdirSync(ng.default.dirname(e),{recursive:!0}),$l.default.writeFileSync(Dz(e),`${JSON.stringify(t,null,2)}
`)},Hz=(e,t)=>Iw(e)[t]?.message??null,Fz=(e,t,r)=>{$z(e,{...Iw(e),[t]:{message:r}})},sg=(e,t)=>{let r=Iw(e);r[t]!==void 0&&$z(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var Mw,ig,ag,Uz,Ae,pn=l(()=>{"use strict";R();KP();xl();jz();Ml();zs();Ow();rg();Qe();Mw=new Set,ig={atMs:0,ids:[]},ag=async()=>{if(Date.now()-ig.atMs<3e4)return ig.ids;let e=await bt({commands:de({})});return ig.atMs=Date.now(),ig.ids=e.installedWriterIds,e.installedWriterIds},Uz=async(e,t,r)=>{let o=J(e,t);if(o===null||r.aborted)return;let n=dn(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(C(n.status)&&!s||n.status==="wizard_paused"||Gt(n))return;if(s){let c=await Tw(n,r,d=>{sg(e,d)});D(e,c);return}let i=await dN(n,c=>{sg(e,c)},r,c=>{J(e,t)?.status==="stopped"||r.aborted||D(e,c)});if(!(J(e,t)?.status==="stopped"||r.aborted)){if(D(e,i),C(i.status)){let c=await Tw(i,r,d=>{sg(e,d)});D(e,c);return}await Uz(e,t,r)}},Ae=(e,t)=>{if(Mw.has(t))return;let r=J(e,t);if(r===null)return;let o=dn(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(C(o.status)&&!n||o.status==="wizard_paused"||Gt(o))return;Mw.add(t);let s=Ez(t);Uz(e,t,s).finally(()=>{Mw.delete(t),Cz(t)})}});var Qr,Hl=l(()=>{"use strict";Lw();rg();xw();pn();Qr=(e,t)=>{let r=dn(e,t);return Ae(e,r.id),`${tg(r)}${og(r)}`}});var Bz,Gz,Vz=l(()=>{"use strict";Bz=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,Gz=e=>e!==null&&e>0});var d6,u6,p6,qz,Kz=l(()=>{"use strict";R();xl();$m();Wl();Ll();zs();qm();qm();d6=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),u6=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},p6=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=oe(o);return Rs({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},qz=(e,t)=>{if(!Il(e,t))return e;Zr(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return sn({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Jr(u6(r));if(t==="wizard-3"){let n=o.splitOptions[0]??d6(o.templatedPrompt);return Kr(r,n)}return t==="wizard-4"?p6(r):e}});var lg,Jz,Nw=l(()=>{"use strict";R();$m();zs();lg=e=>(Zr(e.id),{...Rs(e,"stopped"),errorMessage:tP}),Jz=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;Zr(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var m6,Yz,Xz,Zz=l(()=>{"use strict";R();xl();$m();Wl();Ll();Hl();Qe();pn();Vz();Cw();Kz();Nw();m6="Pick a revision scored above 0 before continuing to Separate.",Yz=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),Xz=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=J(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=J(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Qr(e.storePath,d))};if(o==="wizard-stop-all"){let c=lg(s);return D(e.storePath,c),Ae(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=Jz(s);return D(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=Iz(s,c);return D(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=qz(s,c);return D(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&Ae(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",g=wP(s.wizard,d,c);g=gl(g,d),g={...g,pendingStepInstructions:p};let b={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return D(e.storePath,b),Ae(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(b=>b.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?Yz(s):sn({...s,wizard:{...s.wizard,gate:null}});return D(e.storePath,g),Ae(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=Bz(s,p??-1);if(!Gz(g)){let h={...s,errorMessage:m6,updatedAt:new Date().toISOString()};return D(e.storePath,h),a(n),!0}let b=Jr({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return D(e.storePath,b),Ae(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=Yz(s);return D(e.storePath,h),Ae(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(h=>h.id===p);if(g===void 0){let h={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return D(e.storePath,h),a(n),!0}let b=Kr(s,g);return D(e.storePath,b),a(n),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(n),!0;let g=FP({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!g.ok){let u={...s,errorMessage:g.errorMessage,updatedAt:new Date().toISOString()};return D(e.storePath,u),a(n),!0}let b={...s.wizard,parameterValues:g.parameterValues};if(p.status==="pending"){let u=cN({...s,wizard:{...b,gate:null}},d);return D(e.storePath,u),Ae(e.storePath,n),a(n),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=oe(b),S=Rs({...s,wizard:b},u.terminalStatusSuggestion);return D(e.storePath,S),Ae(e.storePath,n),a(n),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...b,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return D(e.storePath,y),a(n),!0}}return a(n),!0}});var g6,Qz,f6,zw,h6,ej,tj=l(()=>{"use strict";Se();zs();Nw();XP();Cm();Ml();Qe();g6="Add a score from 0 to 100 and the reason for it.",Qz="Add a score from 1 to 100 and the reason for it.",f6="Write the next prompt.",zw="This step is not waiting for you.",h6=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},ej=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=J(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(D(e.storePath,lg(a)),{kind:"saved",cycleId:i}):Rz(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=J(e.storePath,r);if(o===null||!Gt(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:zw};if(t==="manual-judge"){if(o.judgeModel!==T)return{kind:"invalid",cycle:o,errorMessage:zw};let i=h6(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?Qz:g6};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:Qz};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",p=Rm(El(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return D(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==T)return{kind:"invalid",cycle:o,errorMessage:zw};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:f6};let s=Em(o,n);return D(e.storePath,s),{kind:"saved",cycleId:o.id}}});var rj,oj=l(()=>{"use strict";rj=`<script>
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
    gateSlot.replaceWith(incomingGateSlot);
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
</script>`});var nj,sj=l(()=>{"use strict";nj=`<script>
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
</script>`});var ij,aj=l(()=>{"use strict";ij=`<script>
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
    const passStep2 = form.querySelector('[name="passScore"]');
    const passStep4 = form.querySelector('[name="modulePassScore"]');
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
  const paintPassRange = (pass) => {
    if (!(pass instanceof HTMLInputElement)) return;
    const score = Number(pass.value);
    const weak = Math.floor(score / 2);
    const close = Math.max(weak + 1, score - 20);
    const group = pass.closest("[data-sdlc-pass-group]");
    const scale = group?.querySelector(".sdlc-pass-scale");
    if (scale instanceof HTMLElement) {
      scale.style.setProperty("--sdlc-weak", weak + "%");
      scale.style.setProperty("--sdlc-close", close + "%");
      scale.style.setProperty("--sdlc-pass", score + "%");
    }
    const value = group?.querySelector("[data-sdlc-pass-value]");
    const legend = group?.querySelector("[data-sdlc-pass-legend]");
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
  document.querySelectorAll("[data-sdlc-pass]").forEach((pass) => {
    if (!(pass instanceof HTMLInputElement)) return;
    pass.addEventListener("input", () => {
      paintPassRange(pass);
      paintComposeReview();
    });
    paintPassRange(pass);
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
</script>`});var lj,cj=l(()=>{"use strict";R();Fe();lj=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:et(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(re(t.wizard)),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!C(t.status)}}});var dj,uj=l(()=>{"use strict";R();jl();dj=e=>{if(e.wizard===void 0)return C(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=hr(e);if(e.status==="wizard_paused"&&t!==null&&t<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`};if(C(e.status)){if(e.wizard.phase==="complete"){let r=oe(e.wizard),o=r.rows.reduce((s,i)=>i.bestScore===null?s:s===null?i.bestScore:Math.min(s,i.bestScore),null),n=o===null?"":` \xB7 lowest ${o}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Wizard \xB7 ${r.passedModuleCount}/${r.totalModules} modules${n}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}}return t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var pj,mj=l(()=>{"use strict";pj=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var yr,y6,S6,gj,fj=l(()=>{"use strict";uj();mj();zl();yr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),y6=e=>e.wizard===void 0?"classic":"wizard",S6=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${yr(t)}">`,o=dj(e),n=pj(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${yr(o.badgeClass)}">${yr(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${yr(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${yr(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${y6(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${yr(e.id)}">${yr(gr(e.goal))}</a><p class="muted">${yr(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${g}</div></li>`},gj=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(i=>S6(i,t)).join(""),o=Math.min(e.length,20),n=o===e.length?`History \xB7 ${e.length}`:`History \xB7 ${o} of ${e.length}`,s=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2><ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${yr(n)}</summary>${s}</details>`:s}});var jw,cg,hj,A6,b6,Dw,yj,$w=l(()=>{"use strict";jw=m(require("node:fs")),cg=m(require("node:path"));Fe();hj=/^[a-z0-9-]+$/,A6=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},b6=(e,t)=>{if(!hj.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let g=A6(p[2]??"");p[1]==="name"&&g.length>0&&(o=g),p[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},Dw=e=>{let t=rn(e);if(!t.ok)return[];let r=cg.default.resolve(t.path,".cursor","skills"),o=[];try{o=jw.default.readdirSync(r)}catch{return[]}return o.filter(n=>hj.test(n)).flatMap(n=>{let s=cg.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${cg.default.sep}`))return[];try{let i=b6(jw.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},yj=(e,t)=>Dw(e).find(r=>r.fileName===t)??null});var Sj,Aj=l(()=>{"use strict";Sj={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var Fl,P6,De,js=l(()=>{"use strict";Aj();Ts();Fl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),P6=e=>{let t=Sj[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Fl(t.title)}" aria-describedby="${r}" aria-expanded="false">${Ut}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Fl(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Fl(t.example)}</span></span></button>`},De=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Fl(r)}"`}>${Fl(e)}</span>${P6(t)}</span>`});var bj,w6,Pj,wj,vj=l(()=>{"use strict";js();bj=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),w6=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),Pj=e=>{if(e.length===0)return`<div class="field">${De("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${bj(r.fileName)}">${bj(r.fileName)}</option>`).join("");return`<div class="field">${De("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${w6(e)}</script>`},wj=`<script>
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
</script>`});var Me,_j,Wj,v6,Lj,kj,Ej,Cj=l(()=>{"use strict";R();bw();Se();zl();jl();Me=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_j=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",Wj=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,v6=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},Lj=e=>e===T?"You":ne(e),kj=e=>{let t=v6(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ne(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Me(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Me(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Me(Lj(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Me(Lj(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Me(r)}</dd></div>
    </dl>
  </details>`},Ej=e=>{let t=e.wizard;if(t===void 0)return"";let r=gr(e.goal),o=e.status==="wizard_paused",n=!C(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=Zm(e),g=Wj(t),b=g===null?"":_j(g),h=hr(e),y=b.length===0?"":h===null||h>=4?` <strong>${Me(b)}</strong>`:` <strong>${Me(b)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Me(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Me(p.title)}${y}</p>
    <p class="muted">${Me(p.detail)}</p>
    <div class="actions">
      ${kj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Me(e.id)}">Open this run</a>
    </div>
  </section>`}let s=Wj(t),i=s===null?"Wizard":_j(s),a=hr(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Me(r)}</h2>
    <p class="lede">Paused at <strong>${Me(i)}</strong>${Me(c)} (last updated ${Me(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${kj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Me(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Ul,Rj,xj=l(()=>{"use strict";js();Ul=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Rj=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${Ul(n.id)}"${n.id===e.runner?" selected":""}>${Ul(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Ul(e.runner)}">Checking ${Ul(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${De("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${De("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Ul(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var Tj,Ij=l(()=>{"use strict";Tj=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var Ds,Oj,Mj,Nj,zj,jj=l(()=>{"use strict";js();Ds=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Oj=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${Ds(c.id)}"${c.id===r?" selected":""}>${Ds(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Ds(n)}</option>`;return`<div class="field">${De(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},Mj=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Ds(t)}">Checking ${Ds(o)}\u2026</p>`},Nj=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${De(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Ds(r)}</textarea><span class="muted">${o}</span></div></details>`,zj=e=>{let t=`<div class="sdlc-writer">${Oj("judge","Judge",e.judge,e.writers,"I'll score it")}${Mj("judge",e.judge,e.writers)}${Nj("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${Oj("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${Mj("improver",e.improver,e.writers)}${Nj("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var Dj,$j=l(()=>{"use strict";Dj=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var Hw,Hj,Fj=l(()=>{"use strict";$j();Hw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hj=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${Dj.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${Hw(t.goal)}" title="${Hw(t.goal)}">${Hw(t.label)}</button>`).join("")}</div>`});var Bl,_6,W6,Fw,Uj=l(()=>{"use strict";R();js();Bl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_6=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},W6=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,Fw=e=>{let t=_6(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=ll(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${De(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${Bl(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${Bl(e.inputId)}" class="sdlc-pass-range" type="range" name="${Bl(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${Bl(a)}"><span class="sdlc-pass-mark" style="left:${W6(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${Bl(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var k6,Sr,Bj,Gj=l(()=>{"use strict";Ml();Lw();oj();sj();Aw();aj();cj();fj();$w();vj();js();xw();Cj();zl();xj();Ij();jj();R();Fj();Uj();k6=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Sr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bj=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Sr(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Sr(e.skillNotice??"")}</div>`,o=`${MN}${NN}`,n=e.resumableWizardCycle??null,s=n===null?"":Ej(n),i=og(e.cycle),a=e.cycle===null?"":tg(e.cycle),c=e.cycle!==null&&Gt(e.cycle),d=lj(e),p=k6(d.goal,d.prompt,e.canRun),g=zj({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),b=Rj({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=`${Fw({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${Fw({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=bP,u=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",S=e.cycle!==null&&C(e.cycle.status),A=d.running&&!S,f=S||A?"":" open",w=A?" sdlc-compose-run-focus":"",W=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${S?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,L=S?(()=>{let F=e.cycle!==null?gr(e.cycle.goal):gr(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Sr(F)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${W}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${W}</summary>`,E=S?" sdlc-compose-viewing-finished":"",x=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",I=c?"waiting":d.running?"running":"idle",M=d.running&&!c?' aria-busy="true"':"",B=`<section class="card sdlc-compose${E}${w}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${f}>
        ${L}
        <div class="sdlc-compose-details-body">
      <p class="lede">${y} ${Sr(e.modelNote)}</p>
        <ol class="sdlc-compose-stepper" aria-label="Compose steps" data-sdlc-compose-stepper>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="1" aria-current="step"><span class="sdlc-compose-stepper-index">1</span><span class="sdlc-compose-stepper-label">Project</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="2"><span class="sdlc-compose-stepper-index">2</span><span class="sdlc-compose-stepper-label">Prompt and goal</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="3"><span class="sdlc-compose-stepper-index">3</span><span class="sdlc-compose-stepper-label">CLI</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="4"><span class="sdlc-compose-stepper-index">4</span><span class="sdlc-compose-stepper-label">Summary</span></li>
        </ol>
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${u}
        <p class="alert-error sdlc-compose-step-error" data-sdlc-compose-step-error hidden role="alert"></p>
        <div class="sdlc-compose-step" data-sdlc-compose-step="1" id="sdlc-compose-step-1">
          <h3 class="sdlc-compose-step-title">Project</h3>
          <p class="muted sdlc-compose-step-lede">Choose the folder writers run in and optionally load a skill into the prompt on the next step.</p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="sdlc-folder">
          <div class="field">
            ${De("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Sr(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${Pj(Dw(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <input type="hidden" name="orchestratorSkillFile" value="" data-orchestrator-skill-file>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <p class="muted sdlc-compose-orchestrator-note" data-orchestrator-skill-note hidden></p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${De("Goal","goal")}
            ${Hj()}
            <textarea class="input textarea" name="goal" rows="4" required>${Sr(d.goal)}</textarea>
          </div>
          <div class="field">
            ${De("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Sr(d.prompt)}</textarea>
          </div>
          ${h}
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
        ${Tj()}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${Sr(d.passScore)}; Step 4 pass \u2265 ${Sr(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${I}" data-can-run="${p?"true":"false"}"${M}${d.running?" disabled":""}>${x}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,V=`${""}${rj}${nj}${ij}${wj}`;return`${t}${r}${B}${s}${a}${i}${o}${gj(e.history,e.cycle?.id??null)}${V}`}});var Gl,Uw=l(()=>{"use strict";Gj();Gl=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:Bj(t)}))}});var Vj,qj=l(()=>{"use strict";tj();Hl();Uw();Qe();pn();Vj=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:ej({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=J(e.storePath,o.cycleId);return Ae(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(Qr(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Gl(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:Ht(e.storePath),resumableWizardCycle:null}),!0)}});var Kj,dg,Bw=l(()=>{"use strict";Kj=m(require("node:os"));R();dg=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??Kj.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var Jj,$s,Gw,Yj,Xj,Vl=l(()=>{"use strict";R();Se();Qb();Jj=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,$s=e=>{let t=TM(e),r=on(e).map(s=>({id:s,label:km[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},Gw=(e,t,r)=>t===T||t!==null&&e.writers.some(o=>o.id===t)?t:r,Yj=(e,t,r,o=null)=>({judge:Gw(e,t,e.judge),improver:Gw(e,r,e.improver),runner:Gw(e,o,e.runner)}),Xj=e=>e===rm?{goal:om,prompt:nm}:{goal:"",prompt:""}});var ug,Zj=l(()=>{"use strict";ug=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var Qj,pg,Vw=l(()=>{"use strict";R();Se();Fe();Vl();Zj();Qj=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=ug(o);return n.ok?String(n.passScore):String(r)},pg=e=>{let t=Yj(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=Qj(e.posted,"passScore",70),o=Qj(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=(f,w)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:f,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:w,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a});if(e.posted===null)return d(e.defaultFolder??tn,null);let p=e.posted.get("folder")??tn;if(e.posted.get("intent")==="choose-folder"){let f=e.pickFolder();return d(f===null?p:et(f),null)}if((e.posted.get("intent")??"")!=="run")return d(p,null);let b=Jj(e.goal,e.prompt);if(b!==null)return d(p,b);let h=ug(e.posted.get("passScore")??r);if(!h.ok)return d(p,h.errorMessage);let y=ug(e.posted.get("modulePassScore")??o);if(!y.ok)return d(p,y.errorMessage);let u=IM(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(u===null)return d(p,"Choose a judge and an improver.");let S=rn(p);if(!S.ok)return d(p,S.errorMessage);let A=OM(e.installedIds,c,u.judge);return A===null?d(p,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:u.judge,improver:u.improver,workingDirectory:S.path,passScore:h.passScore,modulePassScore:y.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:A,runnerInstructions:a}}});var Hs,gg,E6,qw,eD,mg,tD,C6,rD,Kw,R6,x6,T6,Jw,oD,nD,sD=l(()=>{"use strict";Hs=m(require("node:fs")),gg=m(require("node:path"));Se();Fe();E6=["remember","choose-folder","run"],qw=()=>({folder:tn,judge:"",improver:"",runner:""}),eD=e=>gg.default.join(gg.default.dirname(e),"prompt-optimizer-preferences.json"),mg=e=>typeof e=="string"?e:"",tD=e=>{let t=eD(e);if(!Hs.default.existsSync(t))return qw();try{let r=JSON.parse(Hs.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return qw();let o=r,n=mg(o.folder).trim();return{folder:n.length===0?tn:n,judge:mg(o.judge),improver:mg(o.improver),runner:mg(o.runner)}}catch{return qw()}},C6=(e,t)=>{let r=eD(e);Hs.default.mkdirSync(gg.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;Hs.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),Hs.default.renameSync(o,r)},rD=(e,t)=>e===T||on(t).some(r=>r===e),Kw=(e,t,r)=>e===null?t:e.length===0?"":rD(e,r)?e:t,R6=(e,t)=>{if(e===null)return t;let r=rn(e);return r.ok?r.display:t},x6=e=>{let t=tD(e.storePath),r={folder:R6(e.folder,t.folder),judge:Kw(e.judge,t.judge,e.installedIds),improver:Kw(e.improver,t.improver,e.installedIds),runner:Kw(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||C6(e.storePath,r)},T6=e=>{let t=rn(e);return t.ok?t.display:tn},Jw=(e,t)=>rD(e,t)?e:"",oD=e=>{let t=tD(e.storePath);return{selection:{...e.selection,judge:Jw(t.judge,e.installedIds)||e.selection.judge,improver:Jw(t.improver,e.installedIds)||e.selection.improver,runner:Jw(t.runner,e.installedIds)||e.selection.runner},defaultFolder:T6(t.folder)}},nD=e=>{let t=e.posted.get("intent")??"";if(!E6.includes(t))return;let r=e.posted.get("folder");x6({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var iD,I6,O6,Yw,M6,fg,hg=l(()=>{"use strict";iD=m(require("node:os"));Se();Ow();ks();I6="Reply with the single word ok. Do not use tools.",O6=45e3,Yw=async(e,t)=>{if(t===T)return{ok:!0,message:"You will do this step."};let r=Hz(e,t);if(r!==null)return{ok:!0,message:r};let o=await Ue({writerAgent:t,prompt:I6,workingDirectory:iD.default.tmpdir(),timeoutMs:O6});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ne(t)} is ready.`;return Fz(e,t,n),{ok:!0,message:n}},M6=e=>[...new Set(e.filter(t=>t.length>0))],fg=async(e,t,r,o)=>{for(let n of M6([t,r,o??""])){let s=await Yw(e,n);if(!s.ok)return s.message}return null}});var Xw,aD=l(()=>{"use strict";R();Xw=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!C(r.status)&&!(t!==null&&r.id===t))return r;return null}});var lD,cD=l(()=>{"use strict";Dt();R();Hl();Bw();Vw();Uw();Qe();Fe();sD();$w();hg();aD();rg();pn();lD=async e=>{let t=e.posted===null?oD({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=pg({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Fr("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(nD({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?et(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await fg(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await Gl(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:et(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:Ht(e.route.storePath),resumableWizardCycle:Xw(Ht(e.route.storePath),null)});return}if(r.kind==="start"){let s=yj(r.workingDirectory,r.sourceSkillFile),i=dg({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,wizard:TP({...ml(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(D(e.route.storePath,i),Ae(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(Qr(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:J(e.route.storePath,e.cycleId);n!==null&&(n=dn(e.route.storePath,n),Ae(e.route.storePath,n.id)),await Gl(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:Ht(e.route.storePath),resumableWizardCycle:Xw(Ht(e.route.storePath),n?.id??null)})}});var dD,uD=l(()=>{"use strict";Qe();dD=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";fM(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var pD,mD=l(()=>{"use strict";pD=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var gD,fD=l(()=>{"use strict";RM();Zz();qj();cD();uD();Vl();mD();pn();gD=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await ag(),o=$s(r),n=e.method==="POST"?pD(e.request.headers["content-type"],await e.readBody(e.request)):null;if(Xz({posted:n,storePath:e.storePath,response:e.response})||await Vj(e,n,o))return;let s=Xj(t.searchParams.get("example")),i=dD({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=CM({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await lD({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:EM(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var N6,hD,yD=l(()=>{"use strict";R();Qe();N6=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",hD=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=J(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!C(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=IP({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${N6(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var SD,AD=l(()=>{"use strict";Hl();Qe();SD=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:J(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":Qr(e.storePath,o)),!0}});var z6,bD,PD=l(()=>{"use strict";Se();hg();z6=["claude-cli","codex","cursor","antigravity"],bD=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===T||z6.includes(t)?await Yw(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var wD,vD=l(()=>{"use strict";R();wD=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:dl,page:ul,context:ws,installedWriters:e,post:{method:"POST",url:dl,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${dl}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var Zw,_D=l(()=>{"use strict";R();Ol();Zw=e=>{let t=e.revisions[e.revisions.length-1]??null,r=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null}))),o=C(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:o,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:Ns(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:ws,page:`${ul}?cycle=${encodeURIComponent(e.id)}`}}});var Ne,j6,WD,LD,kD=l(()=>{"use strict";Ne=m(bi());R();j6=(0,Ne.isType)({goal:Ne.isString,prompt:Ne.isString,workingDirectory:Ne.isString,judge:(0,Ne.isUndefinedOr)(Ne.isString),improver:(0,Ne.isUndefinedOr)(Ne.isString),passScore:(0,Ne.isUndefinedOr)(Ne.isNumber),maxRounds:(0,Ne.isUndefinedOr)(Ne.isNumber)}),WD=e=>{let t=e?.trim()??"";return t.length===0?null:t},LD=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return j6(t)?t.workingDirectory.trim().length===0?{ok:!1,error:gm}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:WD(t.judge),improver:WD(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:gm}}});var D6,ED,CD=l(()=>{"use strict";R();Se();Vw();Vl();D6=e=>e.map(t=>t.id).join(", "),ED=e=>{let t=$s(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===T||n===T)return{ok:!1,error:AP,installedWriters:t.writers};if(o===null||n===null){let a=D6(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o}),i=pg({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var RD,xD=l(()=>{"use strict";R();Bw();vD();_D();Vl();kD();CD();Qe();RD=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=J(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:Zw(c)}}let r=await e.handlers.readInstalledIds(),o=$s(r);if(e.method==="GET")return{status:200,body:wD(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let n=LD(e.rawBody);if(!n.ok)return{status:400,body:{ok:!1,error:n.error,installedWriters:o.writers}};let s=ED({body:n.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver,s.runner);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:o.writers}};let a=dg({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds,wizard:ml(s.prompt),runnerModel:s.runner});return D(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:Zw(a)}}});var TD,ID=l(()=>{"use strict";pn();hg();xD();TD=async e=>{let t=await RD({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:ag,readWritersReady:fg,startCycle:Ae}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var $6,Qw,OD=l(()=>{"use strict";LI();fD();yD();AD();PD();ID();$6=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},Qw=async e=>{let t=$6(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await TD(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:WI()})),!0):(await bD({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||hD({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||SD({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await gD(e),!0)}});var MD=l(()=>{"use strict";OD()});var mn,ql,H6,F6,U6,B6,ND,zD=l(()=>{"use strict";mn=m(require("node:fs")),ql=m(require("node:path")),H6="prompt-optimizer-cycles.json",F6="prompt-optimizer-preferences.json",U6="prompt-sdlc-cycles.json",B6="prompt-sdlc-preferences.json",ND=e=>{let t=ql.default.join(e,H6),r=ql.default.join(e,U6);if(mn.default.existsSync(t)||!mn.default.existsSync(r))return t;try{mn.default.renameSync(r,t)}catch{return r}let o=ql.default.join(e,B6),n=ql.default.join(e,F6);if(mn.default.existsSync(o)&&!mn.default.existsSync(n))try{mn.default.renameSync(o,n)}catch{}return t}});var Fs,G6,ev,jD=l(()=>{"use strict";Fs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),G6=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],ev=e=>{let t=G6.map(i=>`<option value="${Fs(i.value)}">${Fs(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Fs(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Fs(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Fs(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Fs(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Kl,HD,V6,FD,q6,K6,UD,Sg,DD,$D,J6,Y6,Ar,Jl,yg,X6,Ag,tv,Z6,rv,BD,ov,GD,Q6,eJ,tJ,VD,qD,KD,Yl=l(()=>{"use strict";Kl=m(require("node:fs")),HD=m(require("node:path")),V6="estimate-history.ndjson",FD=100,q6=500,K6=2e4,UD=e=>HD.default.join(e,V6),Sg=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,q6),DD=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,K6),$D=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,J6=e=>({...e,estimateTokens:$D(e.estimateTokens),actualTokens:$D(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),Y6=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Ar=e=>{let t=UD(e);return Kl.default.existsSync(t)?Kl.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return Y6(n)?[J6(n)]:[]}catch{return[]}}):[]},Jl=(e,t)=>{Kl.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Kl.default.writeFileSync(UD(e),r,"utf8")},yg=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),X6=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${yg(o.task)} | ${yg(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},Ag=e=>{let t=Ar(e.reportsDir),r=Sg(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Jl(e.reportsDir,[...s,n])},tv=e=>{let t=Ar(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?Sg(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Jl(e.reportsDir,[...i,s])},Z6=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-FD),rv=e=>[...Ar(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),BD=e=>{let t=Ar(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=DD(e.input),n=DD(e.output),s=Sg(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Jl(e.reportsDir,[...c,a])},ov=(e,t)=>{let r=Ar(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},GD=e=>({table:X6(Z6(Ar(e))),embedding:null}),Q6=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},eJ=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-FD),tJ=e=>{let t=Q6(eJ(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${yg(s.task)} | ${yg(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},VD=e=>{let t=Ar(e.reportsDir),r=Sg(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Jl(e.reportsDir,[...s,n])},qD=e=>{let t=Ar(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Jl(e.reportsDir,[...s,n])},KD=e=>tJ(Ar(e))});var JD=l(()=>{"use strict";Yl()});var br,nv,rJ,sv,oJ,nJ,bg,Pg,sJ,iv,YD=l(()=>{"use strict";JD();hw();br=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nv=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},rJ=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${nv(-r)} under`:`${nv(r)} over`},sv=e=>e.toLocaleString("en-US"),oJ=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${sv(-r)} under`:`${sv(r)} over`},nJ=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},bg=e=>e===null?"\u2014":nv(e),Pg=e=>e===null?"\u2014":sv(e),sJ=`(function () {
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
})();`,iv=e=>{let r=rv(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":rJ(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":oJ(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${br(nJ(i))}</button></td>
        <td>${br(c)}</td>
        <td>${bg(n.estimateSeconds)}</td>
        <td>${bg(n.actualSeconds)}</td>
        <td>${br(d)}</td>
        <td>${Pg(n.estimateTokens)}</td>
        <td>${Pg(n.actualTokens)}</td>
        <td>${br(p)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${br(c)}</p>
        <h2>Input</h2>
        <pre>${br(i)}</pre>
        <h2>Output</h2>
        <pre>${br(a)}</pre>
        <p>Time: estimated ${bg(n.estimateSeconds)} \xB7 actual ${bg(n.actualSeconds)} \xB7 ${br(d)}</p>
        <p>Tokens: estimated ${Pg(n.estimateTokens)} \xB7 actual ${Pg(n.actualTokens)} \xB7 ${br(p)}</p>
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
            ${Km({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${sJ}</script>`}
    </section>`}});var XD=l(()=>{"use strict";jD();YD()});var Us,iJ,aJ,av,ZD=l(()=>{"use strict";Us=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),iJ=(e,t,r)=>{let o=Us(t),n=Us(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},aJ=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Us(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>iJ(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Us(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Us(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Us(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},av=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(aJ).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var QD=l(()=>{"use strict";ZD()});var Xl,e$,t$,lv,cv,dv,r$=l(()=>{"use strict";Xl=m(require("node:fs")),e$=m(require("node:path"));Za();Yp();t$=(e,t,r)=>fs({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,lv=(e,t,r)=>{let o=t$(e,t,r);if(o===null)return[];if(!Xl.default.existsSync(o))return[];let n=Xl.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},cv=e=>{let t=t$(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:dr(e.entry.prompt),output:dr(e.entry.output)};Xl.default.mkdirSync(e$.default.dirname(t),{recursive:!0}),Xl.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},dv=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var lJ,cJ,Zl,wg,uv=l(()=>{"use strict";lJ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),cJ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Zl=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=lJ(i.assistantOutput),d=c.length>0?`Assistant: ${cJ(c,t)}`:null,p=[a,d].filter(g=>g!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},wg=e=>{let t=e.userMessage.trim(),r=Zl({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var qt,Ql,gv,dJ,uJ,pv,pJ,fv,vg,o$,n$,mJ,Bs,hv,mv,s$,gJ,i$,Gs,_g,ec,fJ,tc,yv,Wg,Lg,a$=l(()=>{"use strict";qt=m(require("node:fs")),Ql=m(require("node:path")),gv=require("node:crypto");uv();dJ="writer-sessions",uJ="active-index.json",pv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pJ=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",fv=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},vg=e=>{let t=Ql.default.join(e.installDir,dJ);return qt.default.mkdirSync(t,{recursive:!0}),t},o$=e=>Ql.default.join(vg(e),uJ),n$=(e,t)=>Ql.default.join(vg(e),`${t}.canonical.json`),mJ=(e,t)=>Ql.default.join(vg(e),`${t}.continuation.json`),Bs=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,hv=e=>{let t=o$(e);if(!qt.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(qt.default.readFileSync(t,"utf8"));if(!pv(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!pv(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!pJ(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},mv=(e,t)=>{qt.default.writeFileSync(o$(e),JSON.stringify(t,null,2))},s$=(e,t)=>{qt.default.writeFileSync(n$(e,t.sessionId),JSON.stringify(t,null,2))},gJ=(e,t)=>{qt.default.writeFileSync(mJ(e,t.sessionId),JSON.stringify(t,null,2))},i$=(e,t)=>{let r=Zl({turns:t.turns});gJ(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Gs=(e,t)=>{let r=n$(e,t);if(!qt.default.existsSync(r))return null;try{let o=JSON.parse(qt.default.readFileSync(r,"utf8"));return!pv(o)||typeof o.sessionId!="string"?null:o}catch{return null}},_g=(e,t=20)=>{let r=vg(e),o=qt.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Gs(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},ec=(e,t,r)=>{let o=fv(r);return hv(e).entries.find(i=>Bs(i)===Bs({writerAgent:t,projectFolderPath:o}))?.sessionId??null},fJ=(e,t,r,o)=>{let n=hv(e),s=Bs({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>Bs(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];mv(e,{entries:i})},tc=(e,t,r)=>{let o=(0,gv.randomUUID)(),n=new Date().toISOString(),s=fv(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return s$(e,i),i$(e,i),fJ(e,t,s,o),o},yv=(e,t,r)=>{let o=ec(e,t,r);return o!==null?o:tc(e,t,r)},Wg=(e,t,r)=>{let o=fv(r),n=hv(e);if(o===null&&r===void 0){mv(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=Bs({writerAgent:t,projectFolderPath:o});mv(e,{entries:n.entries.filter(i=>Bs(i)!==s)})},Lg=e=>{let t=yv(e.layout,e.writerAgent,e.projectFolderPath),r=Gs(e.layout,t);if(r===null)return;let o={id:(0,gv.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};s$(e.layout,n),i$(e.layout,n)}});var hJ,yJ,kg,Sv,l$=l(()=>{"use strict";hJ=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",yJ=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},kg=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",Sv=e=>{let t=kg(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=hJ(r,e.userPromptCharacterCount),n=yJ({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var Eg=l(()=>{"use strict";r$();a$();uv();l$()});var c$=l(()=>{"use strict";Cu();qn();Gy()});var d$=l(()=>{"use strict";Ay()});var Ge,AJ,bJ,Av,bv,Pv,u$=l(()=>{"use strict";c$();d$();Ge=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AJ=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},bJ=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=na(o);return`value="${Ge(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${Ge(r)}"`},Av=(e,t,r,o,n)=>{let s=Ru[t];return`<label class="field">
          <span class="field-label">${Ge(o)} API key \u2014 ${Ge(AJ(e,t))} \xB7 <a class="field-link" href="${Ge(s.href)}" target="_blank" rel="noopener noreferrer">${Ge(s.label)}</a></span>
          <input class="input mono" type="password" name="${Ge(r)}" autocomplete="off" ${bJ(e,t,n)} />
        </label>`},bv=(e,t,r,o)=>{let n=Pu(e[t]?.model),s=new Set(bu[t].map(c=>c.value)),i=bu[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${Ge(c.value)}"${d}>${Ge(c.label)}</option>`}).join(""),a=n!==Co&&!s.has(n)?`<option value="${Ge(n)}" selected>${Ge(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${Ge(o)}</span>
          <select class="input mono" name="${Ge(r)}">${i}${a}</select>
        </label>`},Pv=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Ge(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${Av(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${bv(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${Av(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${bv(e.secrets,"openai","openaiModel","OpenAI model")}
        ${Av(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${bv(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var p$=l(()=>{"use strict";u$()});var Cg,m$,g$=l(()=>{"use strict";Cg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),m$=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${Cg(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${Cg(s.name)}</strong> <span class="muted mono">(${Cg(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${Cg(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var PJ,f$,h$,y$=l(()=>{"use strict";PJ=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,f$=e=>e.kind==="folder",h$=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&f$(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(f$(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(PJ)};return r(t)}});var S$,wv,A$=l(()=>{"use strict";S$=m(require("node:path")),wv=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${wv(r.children,t)}</ul>
            </details>
          </li>`;let o=S$.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var b$,eo,wJ,vJ,rc,_J,vv,P$=l(()=>{"use strict";tm();b$=m(require("node:path"));g$();y$();A$();eo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wJ=()=>`(() => {
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

})();`,vJ=()=>`(() => {
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
})();`,rc=e=>{let t=ol({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=m$({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${eo(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${eo(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':_J(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${eo(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${eo(s)}" />
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
    <script>${wJ()}</script>
    <script>${vJ()}</script>`;return`${t}${r}${o}${c}${d}`},_J=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=h$(a.items.map(b=>({...b,relativePath:typeof b.relativePath=="string"&&b.relativePath.length>0?b.relativePath:b$.default.relative(a.sourceRoot,b.sourcePath).replaceAll("\\","/")}))),p=wv(d,eo),g=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${eo(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${eo(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${g} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${eo(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},vv=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??p??a,b=t.sets[i];if(b===void 0)continue;let h=a.length>0?a:b.proposedSlug,y=g.length>0?g:b.proposedName,u=r.has(i),S=b.items.map(A=>({id:A.id,kind:A.kind,title:A.title,sourcePath:A.sourcePath,include:u}));s.push({slug:h,name:y,items:S})}return s}});var w$=l(()=>{"use strict";P$()});var WJ,_v,v$=l(()=>{"use strict";lr();WJ=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[Ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},_v=WJ});var LJ,_$,W$=l(()=>{"use strict";lr();LJ=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[Ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},_$=LJ});var L$=l(()=>{"use strict"});var gn,kJ,Wv,k$=l(()=>{"use strict";tm();QS();gn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kJ=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,Wv=e=>{let t=e.flashError?`<div class="alert-error">${gn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${gn(e.flashMessage)}</div>`:"",r=ol({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${gn(kJ(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,p=`<a class="btn btn-secondary btn-compact" href="${gn(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,g=Sp(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${gn(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${gn(n.name)}</strong>
                  <span class="muted mono">${gn(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${p}${g}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var E$=l(()=>{"use strict";L$();eA();k$()});var Rg,C$=l(()=>{"use strict";Rg=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var R$,Lt,Lv=l(()=>{"use strict";R$=m(require("node:path"));Ot();$e();K();ue();US();Lt=e=>{let t=$()?.layout.installDir??k();if(R$.default.basename(t)===Rt)return gt;let r=$(),o=r!==null?we(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):gt}});var kv,x$=l(()=>{"use strict";Mt();Lv();kv=async e=>{let t=xe(e.installDir),r=t?.bundleVersion??null,o=Lt(t);try{let n=await Fn(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:wo(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Ev,T$=l(()=>{"use strict";Ev=e=>!e});var Cv,Vs,Rv=l(()=>{"use strict";K();Cv=()=>`http://127.0.0.1:${bh()}/update/run`,Vs=async e=>{try{let t=await fetch(Cv(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var EJ,I$,xv,O$=l(()=>{"use strict";K();te();Rv();EJ=()=>{tr({launchAgentLabel:Pe(),installDir:k()})},I$=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},xv=async()=>{EJ();let e=await Vs({force:!0});if(e.ok)return{ok:!0,message:I$(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:I$(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Mt(),zE)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var Tv=l(()=>{"use strict";Vb();C$();Lv();x$();T$();O$();Rv()});var M$,N$=l(()=>{"use strict";M$=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var z$,j$,Iv,Ov,D$=l(()=>{"use strict";z$=require("node:crypto"),j$=m(require("node:fs"));Dt();ue();ue();N$();Iv=!1,Ov=async e=>{if(Iv)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!M$(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&j$.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,z$.randomUUID)();Iv=!0;try{if(await BS(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Jn({...r,workspace:n},e.writerAgent,t);return await _a(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Iv=!1}}});var $$=l(()=>{"use strict";D$()});var st,CJ,H$,F$,Mv,Nv,zv,jv,Dv,$v,Hv=l(()=>{"use strict";st=require("node:crypto"),CJ=Buffer.from("302a300506032b6570032100","hex"),H$=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},F$=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,st.createPublicKey)({key:Buffer.concat([CJ,t]),format:"der",type:"spki"})},Mv=()=>{let{publicKey:e,privateKey:t}=(0,st.generateKeyPairSync)("ed25519");return{publicKeyRaw:H$(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Nv=e=>(0,st.createPrivateKey)(e),zv=(e,t)=>(0,st.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),jv=(e,t,r)=>{try{let o=F$(e);return(0,st.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},Dv=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,$v=()=>(0,st.randomBytes)(32).toString("base64url")});var Pr,xg,U$,RJ,xJ,Tg,Fv,Uv,B$=l(()=>{"use strict";Pr=m(require("node:fs")),xg=m(require("node:path"));Hv();K();$e();U$=e=>xg.default.join(e.installDir,Cr),RJ=(e,t)=>{if(e.profileEmail===null||t===U$(e)||Pr.default.existsSync(t))return;let r=U$(e);Pr.default.existsSync(r)&&(Pr.default.mkdirSync(xg.default.dirname(t),{recursive:!0}),Pr.default.renameSync(r,t))},xJ=e=>{if(!Pr.default.existsSync(e))return null;try{let t=Pr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Tg=e=>{let t=Kd(e);RJ(e,t);let r=xJ(t);if(r!==null)return r;let o=Mv();return Pr.default.mkdirSync(xg.default.dirname(t),{recursive:!0}),Pr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},Fv=e=>{let t=Tg(e.layout),r=$v(),o=Dv({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=Nv(t.privateKeyPem),s=zv(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Uv=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return jv(e.serverPublicKey,t,e.serverAttestation)}});var Bv=l(()=>{"use strict";B$();Hv()});var K$,oc,qv,Kv,G$,TJ,Gv,Ig,le,J$,IJ,Vv,OJ,MJ,Jv,pe,Ee,Kt,NJ,V$,q$,nc,sc,Y$=l(()=>{"use strict";K$=m(require("node:http")),oc=m(require("node:fs")),qv=m(require("node:path"));Og();Ja();zT();DT();BT();is();Sb();Ub();PI();vI();MD();zD();XD();QD();Eg();p$();w$();Mo();Dt();lr();v$();W$();E$();Tv();Mt();$$();ue();Bv();Kv=e=>ib(e)??"never",G$=48e3,TJ=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,Gv=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??np(),reveal:t.reveal,installed:Hr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Ig=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:rs(t,e)},le=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),J$=200,IJ=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',Vv=e=>{let t=e.trim().slice(0,J$),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},OJ=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${le(t)}</div>`,MJ=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${le(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',Jv={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},pe=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...Jv}),e.end(JSON.stringify(r))},Ee=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},Kt=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},NJ=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=IJ(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${le(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=Ev(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Ya(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${le(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${le(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${le(Kv(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${le(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},V$=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},q$=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,J$)},nc=e=>{let t=qv.default.join(e.layout.installDir,"link-code.txt"),r=()=>xe(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:Rg(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),u=await i(),S=Yb(u),A=h.updateFlash??null,f=Xb(A),w=OJ(A,h.updateError??null);return Kb({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:Lt(y),installBundleVersionLabel:Rg(y),prependBody:`${f}${w}${S}`,headerUpdateButtonHtml:Jb(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await kv(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:Vv("An update is already running.")}),h.end();return}c=!0;try{let u=await xv(),S=u.ok?"/?update=ok":Vv(u.message);h.writeHead(303,{Location:S}),h.end()}catch(u){let S=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:Vv(S)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",S=o(),A=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:S.installVersion,body:`<section class="card">
      <h1>${le(y)}</h1>
      <p>${le(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(A)},g=()=>{if(oc.default.existsSync(t))return oc.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return oc.default.writeFileSync(t,h,"utf8"),h},b=K$.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",S=h.method??"GET";if(S==="OPTIONS"){y.writeHead(204,Jv),y.end();return}if(!await Qw({method:S,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:ND(qv.default.dirname(e.layout.configPath)),readBody:Kt,sendHtml:Ee,renderShell:n})){if(S==="GET"&&u==="/health"){let A=e.controllers.getStatus(),f=o();pe(y,200,{ok:!0,...A,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/status"){let A=o();pe(y,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/traffic"){pe(y,200,{entries:qa(e.layout)});return}if(S==="DELETE"&&u==="/api/traffic"||S==="POST"&&u==="/api/traffic/clear"){if(cb(e.layout),S==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}pe(y,200,{ok:!0});return}if(S==="GET"&&u==="/api/trace"){pe(y,200,{entries:Vp(e.layout)});return}if(S==="DELETE"&&u==="/api/trace"||S==="POST"&&u==="/api/trace/clear"){if(pb(e.layout),S==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}pe(y,200,{ok:!0});return}if(S==="POST"&&u==="/api/errors/clear"){mb(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(S==="GET"&&u==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let w=await ys({layout:e.layout,query:f,limit:20});pe(y,200,{chunks:w,query:f});return}pe(y,200,{chunks:hs(e.layout).slice(-50).reverse()});return}if(S==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(S==="GET"&&u==="/api/update-status"){let A=await i();pe(y,200,{ok:!0,...A});return}if((S==="GET"||S==="POST")&&u==="/api/update"){await d(y);return}if(S==="GET"&&u==="/"){let A=e.controllers.getStatus(),f=o(),w=Hr(e.layout),v=qp(e.layout.errorLogPath);Ee(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:V$(h.url??void 0),updateError:q$(h.url??void 0),body:Zb({wsConnected:A.wsConnected,lastHeartbeatAt:A.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:hs(e.layout).length,trafficEntryCount:qa(e.layout).length,wakeError:A.wakeError,errorLogByteSize:v.byteSize,errorLogExists:v.exists})}));return}if(S==="GET"&&u==="/task"){let A=e.controllers.getStatus(),f=o(),w=$(),v=new URL(h.url??"/",`http://127.0.0.1:${43347}`),W=v.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,L=v.searchParams.get("failed")==="1"?v.searchParams.get("error")?.trim()??"Task failed.":null,E=v.searchParams.get("runId");Ee(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:ev({defaultWorkspace:w?.workspace??"",wsConnected:A.wsConnected,flashMessage:W,flashError:L,lastRunId:E})}));return}if(S==="POST"&&u==="/task/dispatch"){let A=await Kt(h),f=new URLSearchParams(A),w=f.get("prompt")?.trim()??"",v=f.get("writerAgent")?.trim()??"claude-cli",W=f.get("projectFolder")?.trim()??"",L=await Ov({prompt:w,writerAgent:v,...W.length>0?{projectFolderPath:W}:{}}),E=new URLSearchParams;L.ok?E.set("ok","1"):(E.set("failed","1"),L.errorMessage!==void 0&&E.set("error",L.errorMessage.slice(0,240))),L.agentRunId!==void 0&&E.set("runId",L.agentRunId),y.writeHead(303,{Location:`/task?${E.toString()}`}),y.end();return}if(S==="GET"&&u==="/writer-sessions"){let A=o(),f=_g(e.layout,12);Ee(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:A.installVersion,updateFlash:V$(h.url??void 0),updateError:q$(h.url??void 0),body:av({sessions:f})}));return}if(S==="GET"&&u==="/errors"){let A=o(),f=qp(e.layout.errorLogPath);Ee(y,await n({title:"Errors",activePath:"/errors",installVersion:A.installVersion,body:fb({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(S==="GET"&&u==="/status"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),w=We(e.layout),v=w!==null?je(w,12e4):Ab(f.lastHeartbeatAt,12e4),W=bb({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:v}),L=o();Ee(y,await n({title:"Status",activePath:"/status",installVersion:L.installVersion,body:`${NJ({status:f,healthBadge:W,revived:A.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:L.installBundleVersion,installBundleUpdatedAt:L.installBundleUpdatedAt})}${_b({installDir:e.layout.installDir})}${wb({entries:Vp(e.layout)})}`}));return}if(S==="GET"&&u==="/traffic"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=qa(e.layout),w=o(),v=f.map(E=>`<tr><td title="${le(E.at)}">${le(Kv(E.at))}</td><td>${le(E.direction)}</td><td><code>${le(E.type)}</code></td><td>${le(E.summary)}</td><td>${le(E.action??"")}</td></tr>`).join(""),W=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${v}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',L=A.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Ee(y,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${L}
              ${W}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(S==="GET"&&u==="/projects"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=Lt(f.installVersion),v=await Ig(e.layout),W=A.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":A.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,L=A.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,E=$(),x=E===null?null:Y({wsUrl:E.wsUrl,pairingToken:E.pairingToken}),I=x===null?{}:Object.fromEntries((await Promise.all(v.projects.map(async M=>{let B=await _v(x,M.id);return[M.id,B?.counts??null]}))).filter(M=>M[1]!==null));Ee(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:Wv({projects:v.projects,compositionCountsByProjectId:I,cloudAppOrigin:w,syncMessage:v.message,syncOk:v.ok,flashMessage:L,flashError:W})}));return}if(S==="GET"&&u==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=$(),v=w===null?null:Y({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),W=f.length>0&&v!==null?Fr():null;if(W===null||v===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Ye({projectFolderPath:W}),!await Ea(v,f,W)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(S==="POST"&&u==="/projects/delete"){let A=await Kt(h),f=new URLSearchParams(A).get("projectId")?.trim()??"",w=$(),v=w===null?null:Y({wsUrl:w.wsUrl,pairingToken:w.pairingToken});if(v===null||f.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let W=await iA(v,f);y.writeHead(303,{Location:W.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(S==="GET"&&u==="/project"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=A.searchParams.get("id")?.trim()??"",w=o(),v=Lt(w.installVersion),W=await Ig(e.layout),L=Do(W.projects,f);if(L===null){await p(y,"Project not found");return}let E=A.searchParams.get("linked")==="1"?A.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${A.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${A.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:A.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,x=A.searchParams.get("knowledgePromoted"),I=x!==null?`Marked ${x} lesson(s) as promoted in Agent Witch.`:null,M=A.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,B=A.searchParams.get("tab")?.trim()??"harness",V=B==="workflows"||B==="agents"||B==="knowledge"?B:"harness",F=$(),ct=F===null?null:Y({wsUrl:F.wsUrl,pairingToken:F.pairingToken}),H=ct===null?null:await _v(ct,L.id),ge=0;if(ct!==null)try{let so=await fetch(`${ct.appOrigin}/api/agent-witch/projects/${encodeURIComponent(L.id)}/knowledge`,{method:"GET",headers:{[Ie]:ct.pairingToken},signal:AbortSignal.timeout(1e4)});if(so.ok){let Et=await so.json();typeof Et=="object"&&Et!==null&&typeof Et.candidateCount=="number"&&(ge=Et.candidateCount)}}catch{ge=0}Ee(y,await n({title:L.name,activePath:"/projects",installVersion:w.installVersion,body:os({project:L,cloudAppOrigin:v,installed:Hr(e.layout),linkedSetSlugs:Dr(L.projectFolderPath),composition:H,knowledgeCandidateCount:ge,activeTab:V,flashMessage:E??I,flashError:M})}));return}if(S==="POST"&&u==="/projects/pull-bound-harness"){let A=await Kt(h),f=await tA({rawBody:A,layout:e.layout});if(f.kind==="not_found"){await p(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let w=o();Ee(y,await n({title:f.title,activePath:"/projects",installVersion:w.installVersion,body:f.body}));return}if(S==="POST"&&u==="/projects/link-harness"){let A=await Kt(h),f=new URLSearchParams(A),w=f.get("projectId")?.trim()??"",v=await Ig(e.layout),W=Do(v.projects,w);if(W===null){await p(y,"Project not found");return}let L=f.getAll("applySet").map(V=>String(V)),E=fa({layout:e.layout,projectFolderPath:W.projectFolderPath,setSlugs:L});if(!E.ok){let V=o(),F=Lt(V.installVersion);Ee(y,await n({title:W.name,activePath:"/projects",installVersion:V.installVersion,body:os({project:W,cloudAppOrigin:F,installed:Hr(e.layout),linkedSetSlugs:Dr(W.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:E.errorMessage})}));return}let x=$(),I=x===null?null:Y({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),M=I===null?!1:await La(I,W.id,E.appliedSetSlugs),B=new URLSearchParams({linked:"1",files:String(E.writtenFileCount),bindingsSynced:M?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(W.id)}&${B.toString()}`}),y.end();return}if(S==="POST"&&u==="/project/knowledge/promote-all"){let A=await Kt(h),w=new URLSearchParams(A).get("projectId")?.trim()??"",v=await Ig(e.layout),W=Do(v.projects,w);if(W===null){await p(y,"Project not found");return}let L=$(),E=L===null?null:Y({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),x=E===null?{ok:!1,promotedCount:0}:await _$(E,W.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(W.id)}&${I.toString()}`}),y.end();return}if(S==="GET"&&u==="/harness"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=Aa(e.layout),v=A.searchParams.get("submitted")==="1",W=v?A.searchParams.get("syncFailed")==="1"?`Local harness updated (${A.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:A.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${A.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":A.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:A.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,L=w?.scanRoots[0]??np(),E=TJ(e.layout,{reveal:w,importQuery:A.searchParams.get("import")==="1",justSubmitted:v}),x=Lt(f.installVersion);Ee(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:rc(Gv(e.layout,{cloudAppOrigin:x,reveal:w,scanFolder:L,flashMessage:W,importSectionExpanded:E}))}));return}if(S==="POST"&&u==="/api/harness/pick-folder"){let A=Fr();if(A===null){pe(y,200,{cancelled:!0});return}pe(y,200,{path:A});return}if(S==="GET"&&u==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=ga(f);if(w===null){pe(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let v=oc.default.readFileSync(w,"utf8"),W=v.length>G$?`${v.slice(0,G$)}
\u2026 (truncated)`:v;pe(y,200,{content:W})}catch{pe(y,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&u==="/api/harness/reveal/add-project"){let A=await Kt(h),f="";try{let W=JSON.parse(A);typeof W=="object"&&W!==null&&typeof W.projectPath=="string"&&(f=W.projectPath.trim())}catch{pe(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){pe(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=Aa(e.layout),v=IS({reveal:w,projectPath:f});if(v===null||v.sets.length===0){pe(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}lp(e.layout,v),pe(y,200,{ok:!0,setCount:v.sets.length});return}if(S==="GET"&&u==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){pe(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;h.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...Jv});let v=OS({scanRoot:f,response:y,shouldAbort:()=>w});lp(e.layout,v),y.end();return}if(S==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&u==="/harness/submit"){let A=Aa(e.layout);if(A===null){let x=o(),I=Lt(x.installVersion);Ee(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:rc(Gv(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await Kt(h),w=new URLSearchParams(f),v=vv(w,A),W=NS({layout:e.layout,sets:v});if(!W.ok){let x=o(),I=Lt(x.installVersion);Ee(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:rc(Gv(e.layout,{cloudAppOrigin:I,reveal:A,flashError:W.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}jS(e.layout);let E=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${W.writtenItemCount??0}${E}`}),y.end();return}if(S==="GET"&&u==="/writer-api"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),w=$()?.writerExecutionBackend??Te(void 0),v=ve(e.layout.configPath),W=Mr(v),L=A.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,E=o();Ee(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:E.installVersion,body:Pv({writerExecutionBackend:w,secrets:W,flashMessage:L})}));return}if(S==="POST"&&u==="/writer-api"){let A=await Kt(h),f=new URLSearchParams(A),w=f.get("writerExecutionBackend")?.trim()??"cli";By({configPath:e.layout.configPath,writerExecutionBackend:Te(w),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(S==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(S==="GET"&&u==="/history"){let A=o();Ee(y,await n({title:"History",activePath:"/history",installVersion:A.installVersion,body:iv({reportsDir:e.layout.reportsDir})}));return}if(S==="GET"&&u==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),v=xb({layout:e.layout}),W=Ob(v),L=f.length>0?await ys({layout:e.layout,query:f,limit:20}):hs(e.layout).slice(-50).reverse(),E=L.map(I=>{let M=Ib(v,I.id),B=M>0?` \xB7 used in ${M} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${le(I.createdAt)}">${le(Kv(I.createdAt))}${I.source?` \xB7 ${le(I.source)}`:""}${B}</div><pre>${le(I.text)}</pre></article>`}).join(""),x=W.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${W.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${le(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Ee(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${le(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${x}${E}${MJ(f,L.length)}`}));return}S==="POST"&&await Kt(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return b.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),b.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${or}`)}),b},sc=e=>Tg(e).publicKeyRaw});var Og=l(()=>{"use strict";PT();wT();Y$()});var Z$={};Ct(Z$,{runAgentWitchExternalLiveCli:()=>jJ});var Yv,X$,zJ,jJ,Q$=l(()=>{"use strict";Yv=m(require("node:fs")),X$=m(require("node:path"));is();K();te();Og();te();zJ=e=>{let t=X$.default.join(e,"link-code.txt");if(!Yv.default.existsSync(t))return null;let r=Yv.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},jJ=()=>{qe("agent-witch-live");let e=k(),t=N(),r=zJ(e),o=sc(t);nc({layout:t,controllers:{getStatus:()=>{let n=We(t);return{wsConnected:za(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{yo(e)}}})}});var wr=_((_Re,rH)=>{"use strict";var eH=["nodebuffer","arraybuffer","fragments"],tH=typeof Blob<"u";tH&&eH.push("blob");rH.exports={BINARY_TYPES:eH,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:tH,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var ic=_((WRe,Mg)=>{"use strict";var{EMPTY_BUFFER:DJ}=wr(),Xv=Buffer[Symbol.species];function $J(e,t){if(e.length===0)return DJ;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new Xv(r.buffer,r.byteOffset,o):r}function oH(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function nH(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function HJ(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Zv(e){if(Zv.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Xv(e):ArrayBuffer.isView(e)?t=new Xv(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Zv.readOnly=!1),t}Mg.exports={concat:$J,mask:oH,toArrayBuffer:HJ,toBuffer:Zv,unmask:nH};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Mg.exports.mask=function(t,r,o,n,s){s<48?oH(t,r,o,n,s):e.mask(t,r,o,n,s)},Mg.exports.unmask=function(t,r){t.length<32?nH(t,r):e.unmask(t,r)}}catch{}});var aH=_((LRe,iH)=>{"use strict";var sH=Symbol("kDone"),Qv=Symbol("kRun"),e_=class{constructor(t){this[sH]=()=>{this.pending--,this[Qv]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Qv]()}[Qv](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[sH])}}};iH.exports=e_});var Js=_((kRe,uH)=>{"use strict";var ac=require("zlib"),lH=ic(),FJ=aH(),{kStatusCode:cH}=wr(),UJ=Buffer[Symbol.species],BJ=Buffer.from([0,0,255,255]),zg=Symbol("permessage-deflate"),vr=Symbol("total-length"),qs=Symbol("callback"),to=Symbol("buffers"),Ks=Symbol("error"),Ng,t_=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Ng){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Ng=new FJ(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[qs];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){Ng.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){Ng.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?ac.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=ac.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[zg]=this,this._inflate[vr]=0,this._inflate[to]=[],this._inflate.on("error",VJ),this._inflate.on("data",dH)}this._inflate[qs]=o,this._inflate.write(t),r&&this._inflate.write(BJ),this._inflate.flush(()=>{let s=this._inflate[Ks];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=lH.concat(this._inflate[to],this._inflate[vr]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[vr]=0,this._inflate[to]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?ac.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=ac.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[vr]=0,this._deflate[to]=[],this._deflate.on("data",GJ)}this._deflate[qs]=o,this._deflate.write(t),this._deflate.flush(ac.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=lH.concat(this._deflate[to],this._deflate[vr]);r&&(s=new UJ(s.buffer,s.byteOffset,s.length-4)),this._deflate[qs]=null,this._deflate[vr]=0,this._deflate[to]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};uH.exports=t_;function GJ(e){this[to].push(e),this[vr]+=e.length}function dH(e){if(this[vr]+=e.length,this[zg]._maxPayload<1||this[vr]<=this[zg]._maxPayload){this[to].push(e);return}this[Ks]=new RangeError("Max payload size exceeded"),this[Ks].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Ks][cH]=1009,this.removeListener("data",dH),this.reset()}function VJ(e){if(this[zg]._inflate=null,this[Ks]){this[qs](this[Ks]);return}e[cH]=1007,this[qs](e)}});var Ys=_((ERe,jg)=>{"use strict";var{isUtf8:pH}=require("buffer"),{hasBlob:qJ}=wr(),KJ=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function JJ(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function r_(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function YJ(e){return qJ&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}jg.exports={isBlob:YJ,isValidStatusCode:JJ,isValidUTF8:r_,tokenChars:KJ};if(pH)jg.exports.isValidUTF8=function(e){return e.length<24?r_(e):pH(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");jg.exports.isValidUTF8=function(t){return t.length<32?r_(t):e(t)}}catch{}});var a_=_((CRe,AH)=>{"use strict";var{Writable:XJ}=require("stream"),mH=Js(),{BINARY_TYPES:ZJ,EMPTY_BUFFER:gH,kStatusCode:QJ,kWebSocket:e7}=wr(),{concat:o_,toArrayBuffer:t7,unmask:r7}=ic(),{isValidStatusCode:o7,isValidUTF8:fH}=Ys(),Dg=Buffer[Symbol.species],it=0,hH=1,yH=2,SH=3,n_=4,s_=5,$g=6,i_=class extends XJ{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||ZJ[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[e7]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=it}_write(t,r,o){if(this._opcode===8&&this._state==it)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new Dg(o.buffer,o.byteOffset+t,o.length-t),new Dg(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new Dg(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case it:this.getInfo(t);break;case hH:this.getPayloadLength16(t);break;case yH:this.getPayloadLength64(t);break;case SH:this.getMask();break;case n_:this.getData(t);break;case s_:case $g:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[mH.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=hH:this._payloadLength===127?this._state=yH:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=SH:this._state=n_}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=n_}getData(t){let r=gH;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&r7(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=s_,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[mH.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===it&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=it;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=o_(o,r):this._binaryType==="arraybuffer"?n=t7(o_(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=it):(this._state=$g,setImmediate(()=>{this.emit("message",n,!0),this._state=it,this.startLoop(t)}))}else{let n=o_(o,r);if(!this._skipUTF8Validation&&!fH(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===s_||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=it):(this._state=$g,setImmediate(()=>{this.emit("message",n,!1),this._state=it,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,gH),this.end();else{let o=t.readUInt16BE(0);if(!o7(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new Dg(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!fH(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=it;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=it):(this._state=$g,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=it,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[QJ]=n,i}};AH.exports=i_});var d_=_((xRe,wH)=>{"use strict";var{Duplex:RRe}=require("stream"),{randomFillSync:n7}=require("crypto"),{types:{isUint8Array:s7}}=require("util"),bH=Js(),{EMPTY_BUFFER:i7,kWebSocket:a7,NOOP:l7}=wr(),{isBlob:Xs,isValidStatusCode:c7}=Ys(),{mask:PH,toBuffer:fn}=ic(),at=Symbol("kByteLength"),d7=Buffer.alloc(4),Hg=8*1024,hn,Zs=Hg,kt=0,u7=1,p7=2,l_=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=kt,this.onerror=l7,this[a7]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||d7,r.generateMask?r.generateMask(o):(Zs===Hg&&(hn===void 0&&(hn=Buffer.alloc(Hg)),n7(hn,0,Hg),Zs=0),o[0]=hn[Zs++],o[1]=hn[Zs++],o[2]=hn[Zs++],o[3]=hn[Zs++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[at]!==void 0?a=r[at]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(PH(t,o,d,s,a),[d]):(PH(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=i7;else{if(typeof t!="number"||!c7(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(s7(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[at]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==kt?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Xs(t)?(n=t.size,s=!1):(t=fn(t),n=t.length,s=fn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[at]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Xs(t)?this._state!==kt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==kt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Xs(t)?(n=t.size,s=!1):(t=fn(t),n=t.length,s=fn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[at]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Xs(t)?this._state!==kt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==kt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[bH.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Xs(t)?(a=t.size,c=!1):(t=fn(t),a=t.length,c=fn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[at]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Xs(t)?this._state!==kt?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==kt?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[at],this._state=p7,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(c_,this,a,n);return}this._bufferedBytes-=o[at];let i=fn(s);r?this.dispatch(i,r,o,n):(this._state=kt,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(m7,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[bH.extensionName];this._bufferedBytes+=o[at],this._state=u7,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");c_(this,c,n);return}this._bufferedBytes-=o[at],this._state=kt,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===kt&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][at],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][at],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};wH.exports=l_;function c_(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function m7(e,t,r){c_(e,t,r),e.onerror(t)}});var xH=_((TRe,RH)=>{"use strict";var{kForOnEventAttribute:lc,kListener:u_}=wr(),vH=Symbol("kCode"),_H=Symbol("kData"),WH=Symbol("kError"),LH=Symbol("kMessage"),kH=Symbol("kReason"),Qs=Symbol("kTarget"),EH=Symbol("kType"),CH=Symbol("kWasClean"),_r=class{constructor(t){this[Qs]=null,this[EH]=t}get target(){return this[Qs]}get type(){return this[EH]}};Object.defineProperty(_r.prototype,"target",{enumerable:!0});Object.defineProperty(_r.prototype,"type",{enumerable:!0});var yn=class extends _r{constructor(t,r={}){super(t),this[vH]=r.code===void 0?0:r.code,this[kH]=r.reason===void 0?"":r.reason,this[CH]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[vH]}get reason(){return this[kH]}get wasClean(){return this[CH]}};Object.defineProperty(yn.prototype,"code",{enumerable:!0});Object.defineProperty(yn.prototype,"reason",{enumerable:!0});Object.defineProperty(yn.prototype,"wasClean",{enumerable:!0});var ei=class extends _r{constructor(t,r={}){super(t),this[WH]=r.error===void 0?null:r.error,this[LH]=r.message===void 0?"":r.message}get error(){return this[WH]}get message(){return this[LH]}};Object.defineProperty(ei.prototype,"error",{enumerable:!0});Object.defineProperty(ei.prototype,"message",{enumerable:!0});var cc=class extends _r{constructor(t,r={}){super(t),this[_H]=r.data===void 0?null:r.data}get data(){return this[_H]}};Object.defineProperty(cc.prototype,"data",{enumerable:!0});var g7={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[lc]&&n[u_]===t&&!n[lc])return;let o;if(e==="message")o=function(s,i){let a=new cc("message",{data:i?s:s.toString()});a[Qs]=this,Fg(t,this,a)};else if(e==="close")o=function(s,i){let a=new yn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Qs]=this,Fg(t,this,a)};else if(e==="error")o=function(s){let i=new ei("error",{error:s,message:s.message});i[Qs]=this,Fg(t,this,i)};else if(e==="open")o=function(){let s=new _r("open");s[Qs]=this,Fg(t,this,s)};else return;o[lc]=!!r[lc],o[u_]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[u_]===t&&!r[lc]){this.removeListener(e,r);break}}};RH.exports={CloseEvent:yn,ErrorEvent:ei,Event:_r,EventTarget:g7,MessageEvent:cc};function Fg(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Ug=_((IRe,TH)=>{"use strict";var{tokenChars:dc}=Ys();function Jt(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function f7(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(p===-1&&dc[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);d===44?(Jt(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(p===-1&&dc[d]===1)c===-1&&(c=g);else if(d===32||d===9)p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g),Jt(r,e.slice(c,p),!0),d===44&&(Jt(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,g),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(dc[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(dc[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,p=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(p===-1&&dc[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))p===-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);o&&(h=h.replace(/\\/g,""),o=!1),Jt(r,a,h),d===44&&(Jt(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=g);let b=e.slice(c,p);return i===void 0?Jt(t,b,r):(a===void 0?Jt(r,b,!0):o?Jt(r,a,b.replace(/\\/g,"")):Jt(r,a,b),Jt(t,i,r)),t}function h7(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}TH.exports={format:h7,parse:f7}});var qg=_((NRe,BH)=>{"use strict";var y7=require("events"),S7=require("https"),A7=require("http"),MH=require("net"),b7=require("tls"),{randomBytes:P7,createHash:w7}=require("crypto"),{Duplex:ORe,Readable:MRe}=require("stream"),{URL:p_}=require("url"),ro=Js(),v7=a_(),_7=d_(),{isBlob:W7}=Ys(),{BINARY_TYPES:IH,CLOSE_TIMEOUT:L7,EMPTY_BUFFER:Bg,GUID:k7,kForOnEventAttribute:m_,kListener:E7,kStatusCode:C7,kWebSocket:be,NOOP:NH}=wr(),{EventTarget:{addEventListener:R7,removeEventListener:x7}}=xH(),{format:T7,parse:I7}=Ug(),{toBuffer:O7}=ic(),zH=Symbol("kAborted"),g_=[8,13],Wr=["CONNECTING","OPEN","CLOSING","CLOSED"],M7=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,X=class e extends y7{constructor(t,r,o){super(),this._binaryType=IH[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Bg,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),jH(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){IH.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new v7({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new _7(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[be]=this,s[be]=this,t[be]=this,n.on("conclude",j7),n.on("drain",D7),n.on("error",$7),n.on("message",H7),n.on("ping",F7),n.on("pong",U7),s.onerror=B7,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",HH),t.on("data",Vg),t.on("end",FH),t.on("error",UH),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[ro.extensionName]&&this._extensions[ro.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){tt(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,$H(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){f_(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Bg,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){f_(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Bg,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){f_(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[ro.extensionName]||(n.compress=!1),this._sender.send(t||Bg,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){tt(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(X,"CONNECTING",{enumerable:!0,value:Wr.indexOf("CONNECTING")});Object.defineProperty(X.prototype,"CONNECTING",{enumerable:!0,value:Wr.indexOf("CONNECTING")});Object.defineProperty(X,"OPEN",{enumerable:!0,value:Wr.indexOf("OPEN")});Object.defineProperty(X.prototype,"OPEN",{enumerable:!0,value:Wr.indexOf("OPEN")});Object.defineProperty(X,"CLOSING",{enumerable:!0,value:Wr.indexOf("CLOSING")});Object.defineProperty(X.prototype,"CLOSING",{enumerable:!0,value:Wr.indexOf("CLOSING")});Object.defineProperty(X,"CLOSED",{enumerable:!0,value:Wr.indexOf("CLOSED")});Object.defineProperty(X.prototype,"CLOSED",{enumerable:!0,value:Wr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(X.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(X.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[m_])return t[E7];return null},set(t){for(let r of this.listeners(e))if(r[m_]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[m_]:!0})}})});X.prototype.addEventListener=R7;X.prototype.removeEventListener=x7;BH.exports=X;function jH(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:L7,protocolVersion:g_[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!g_.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${g_.join(", ")})`);let s;if(t instanceof p_)s=t;else try{s=new p_(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;Gg(e,u);return}let d=i?443:80,p=P7(16).toString("base64"),g=i?S7.request:A7.request,b=new Set,h;if(n.createConnection=n.createConnection||(i?z7:N7),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new ro({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=T7({[ro.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!M7.test(u)||b.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");b.add(u)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let u=n.path.split(":");n.socketPath=u[0],n.path=u[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let u=o&&o.headers;if(o={...o,headers:{}},u)for(let[S,A]of Object.entries(u))o.headers[S.toLowerCase()]=A}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,u||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=g(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=g(n);n.timeout&&y.on("timeout",()=>{tt(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[zH]||(y=e._req=null,Gg(e,u))}),y.on("response",u=>{let S=u.headers.location,A=u.statusCode;if(S&&n.followRedirects&&A>=300&&A<400){if(++e._redirects>n.maxRedirects){tt(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new p_(S,t)}catch{let v=new SyntaxError(`Invalid URL: ${S}`);Gg(e,v);return}jH(e,f,r,o)}else e.emit("unexpected-response",y,u)||tt(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,S,A)=>{if(e.emit("upgrade",u),e.readyState!==X.CONNECTING)return;y=e._req=null;let f=u.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){tt(e,S,"Invalid Upgrade header");return}let w=w7("sha1").update(p+k7).digest("base64");if(u.headers["sec-websocket-accept"]!==w){tt(e,S,"Invalid Sec-WebSocket-Accept header");return}let v=u.headers["sec-websocket-protocol"],W;if(v!==void 0?b.size?b.has(v)||(W="Server sent an invalid subprotocol"):W="Server sent a subprotocol but none was requested":b.size&&(W="Server sent no subprotocol"),W){tt(e,S,W);return}v&&(e._protocol=v);let L=u.headers["sec-websocket-extensions"];if(L!==void 0){if(!h){tt(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let E;try{E=I7(L)}catch{tt(e,S,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(E);if(x.length!==1||x[0]!==ro.extensionName){tt(e,S,"Server indicated an extension that was not requested");return}try{h.accept(E[ro.extensionName])}catch{tt(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[ro.extensionName]=h}e.setSocket(S,A,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Gg(e,t){e._readyState=X.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function N7(e){return e.path=e.socketPath,MH.connect(e)}function z7(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=MH.isIP(e.host)?"":e.host),b7.connect(e)}function tt(e,t,r){e._readyState=X.CLOSING;let o=new Error(r);Error.captureStackTrace(o,tt),t.setHeader?(t[zH]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Gg,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function f_(e,t,r){if(t){let o=W7(t)?t.size:O7(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Wr[e.readyState]})`);process.nextTick(r,o)}}function j7(e,t){let r=this[be];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[be]!==void 0&&(r._socket.removeListener("data",Vg),process.nextTick(DH,r._socket),e===1005?r.close():r.close(e,t))}function D7(){let e=this[be];e.isPaused||e._socket.resume()}function $7(e){let t=this[be];t._socket[be]!==void 0&&(t._socket.removeListener("data",Vg),process.nextTick(DH,t._socket),t.close(e[C7])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function OH(){this[be].emitClose()}function H7(e,t){this[be].emit("message",e,t)}function F7(e){let t=this[be];t._autoPong&&t.pong(e,!this._isServer,NH),t.emit("ping",e)}function U7(e){this[be].emit("pong",e)}function DH(e){e.resume()}function B7(e){let t=this[be];t.readyState!==X.CLOSED&&(t.readyState===X.OPEN&&(t._readyState=X.CLOSING,$H(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function $H(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function HH(){let e=this[be];if(this.removeListener("close",HH),this.removeListener("data",Vg),this.removeListener("end",FH),e._readyState=X.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[be]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",OH),e._receiver.on("finish",OH))}function Vg(e){this[be]._receiver.write(e)||this.pause()}function FH(){let e=this[be];e._readyState=X.CLOSING,e._receiver.end(),this.end()}function UH(){let e=this[be];this.removeListener("error",UH),this.on("error",NH),e&&(e._readyState=X.CLOSING,this.destroy())}});var KH=_((jRe,qH)=>{"use strict";var zRe=qg(),{Duplex:G7}=require("stream");function GH(e){e.emit("close")}function V7(){!this.destroyed&&this._writableState.finished&&this.destroy()}function VH(e){this.removeListener("error",VH),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function q7(e,t){let r=!0,o=new G7({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(GH,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(GH,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",V7),o.on("error",VH),o}qH.exports=q7});var h_=_((DRe,JH)=>{"use strict";var{tokenChars:K7}=Ys();function J7(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&K7[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}JH.exports={parse:J7}});var rF=_((HRe,tF)=>{"use strict";var Y7=require("events"),Kg=require("http"),{Duplex:$Re}=require("stream"),{createHash:X7}=require("crypto"),YH=Ug(),Sn=Js(),Z7=h_(),Q7=qg(),{CLOSE_TIMEOUT:e9,GUID:t9,kWebSocket:r9}=wr(),o9=/^[+/0-9A-Za-z]{22}==$/,XH=0,ZH=1,eF=2,y_=class extends Y7{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:e9,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:Q7,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Kg.createServer((o,n)=>{let s=Kg.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=n9(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=XH}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===eF){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(uc,this);return}if(t&&this.once("close",t),this._state!==ZH)if(this._state=ZH,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(uc,this):process.nextTick(uc,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{uc(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",QH);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){An(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){An(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!o9.test(s)){An(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){An(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){pc(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=Z7.parse(c)}catch{An(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&p!==void 0){let b=new Sn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=YH.parse(p);h[Sn.extensionName]&&(b.accept(h[Sn.extensionName]),g[Sn.extensionName]=b)}catch{An(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let b={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(b,(h,y,u,S)=>{if(!h)return pc(r,y||401,u,S);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(b))return pc(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[r9])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>XH)return pc(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${X7("sha1").update(r+t9).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),p._protocol=g)}if(t[Sn.extensionName]){let g=t[Sn.extensionName].params,b=YH.format({[Sn.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${b}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",QH),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(uc,this)})),a(p,n)}};tF.exports=y_;function n9(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function uc(e){e._state=eF,e.emit("close")}function QH(){this.destroy()}function pc(e,t,r,o){r=r||Kg.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Kg.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function An(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,An),e.emit("wsClientError",i,r,t)}else pc(r,o,n,s)}});var s9,i9,a9,l9,c9,d9,oF,u9,mc,nF=l(()=>{s9=m(KH(),1),i9=m(Ug(),1),a9=m(Js(),1),l9=m(a_(),1),c9=m(d_(),1),d9=m(h_(),1),oF=m(qg(),1),u9=m(rF(),1),mc=oF.default});var S_,A_,b_=l(()=>{"use strict";S_="AGENT_WITCH_EXTERNAL_BRIDGE",A_="AGENT_WITCH_EXTERNAL_LIVE"});var P_,sF=l(()=>{"use strict";P_=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var p9,w_,iF=l(()=>{"use strict";b_();sF();p9=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",w_=(e={})=>{let t=e.env??process.env,r=P_(t[S_]),o=P_(t[A_]);return{mode:p9(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var aF=l(()=>{"use strict";b_()});var lF=l(()=>{"use strict";iF();aF()});var v_=l(()=>{"use strict"});var Lr,gc=l(()=>{"use strict";Lr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var ti,bn,cF,g9,__,W_,dF,uF,L_,pF,fc,k_=l(()=>{"use strict";ti=m(require("node:fs")),bn=m(require("node:os")),cF=m(require("node:path"));v_();gc();g9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),__=(e=bn.default.hostname())=>cF.default.join(bn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),W_=e=>{if(!ti.default.existsSync(e))return null;try{let t=JSON.parse(ti.default.readFileSync(e,"utf8"));return!g9(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},dF=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},uF=(e,t)=>{ti.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},L_=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??__(),o=W_(r);if(o!==null&&o.pid!==process.pid&&Lr(o.pid)&&dF(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:bn.default.hostname(),macOsUsername:bn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return uF(r,n),{ok:!0}},pF=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??__(),o=W_(r);return o!==null&&o.pid!==process.pid&&Lr(o.pid)&&dF(o)?{ok:!1}:(uF(r,{hostname:bn.default.hostname(),macOsUsername:bn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},fc=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??__();W_(r)?.pid===process.pid&&ti.default.existsSync(r)&&ti.default.unlinkSync(r)}});var E_,hc,f9,h9,y9,S9,C_,mF=l(()=>{"use strict";E_=require("node:child_process"),hc=m(require("node:path"));gc();ou();f9=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),h9=(e,t)=>{if(f9(e)||!/\bnode\b/.test(e))return!1;let r=hc.default.resolve(t),o=hc.default.join(r,"app",Ei),n=hc.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Ei||i==="agent-witch.ts")return e.includes(r);try{let a=hc.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},y9=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,E_.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},S9=(e,t,r)=>{let o=y9(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||h9(d,t)&&n.push(c)}return n},C_=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,E_.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=S9(r,e.installDir,t),n=[];for(let s of o)if(Lr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var yc,Sc,gF,A9,R_,fF=l(()=>{"use strict";yc=m(require("node:fs")),Sc=m(require("node:path"));Re();gF=(e,t)=>{!yc.default.existsSync(e)||yc.default.existsSync(t)||(yc.default.mkdirSync(Sc.default.dirname(t),{recursive:!0}),yc.default.renameSync(e,t))},A9=e=>{if(e.profileEmail===null)return;let t=Sc.default.join(e.installDir,dt);gF(Sc.default.join(t,Ln),e.mainLogPath),gF(Sc.default.join(t,kn),e.errorLogPath)},R_=e=>{let t=N();e!==void 0&&t.installDir!==e||A9(t)}});var hF=l(()=>{"use strict";Ba();Bp();Bp();!Ke()&&Po(__agentWitchImportMetaUrl)&&(async()=>{qe("agent-witch-wake-server");let e=await Uo(),t=rr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var yF=l(()=>{"use strict";hF()});var SF=l(()=>{"use strict";Ra()});var x_,AF=l(()=>{"use strict";v_();yF();k_();SF();x_=async(e={})=>{let t=e.skipInProcessBridge?null:await Up();wp();let r=setInterval(()=>{wp()},6e4),o=setInterval(()=>{if(!pF().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Ac,Jg,w9,bF,PF,Yg,wF,vF,T_,_F,Xg,WF=l(()=>{"use strict";Ac=m(require("node:fs")),Jg=m(require("node:path")),w9="pending-run-inputs.json",bF=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),PF=e=>{let t=e.profileEmail?Jg.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Jg.default.join(t,w9)},Yg=e=>{let t=PF(e);if(!Ac.default.existsSync(t))return{};try{let r=JSON.parse(Ac.default.readFileSync(t,"utf8"));return bF(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!bF(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},wF=(e,t)=>{let r=PF(e);Ac.default.mkdirSync(Jg.default.dirname(r),{recursive:!0}),Ac.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},vF=e=>Object.values(Yg(e)),T_=(e,t)=>Yg(e)[t]!==void 0,_F=(e,t)=>{let r=Yg(e);r[t.agentRunId]=t,wF(e,r)},Xg=(e,t)=>{let r=Yg(e);delete r[t],wF(e,r)}});var Zg=l(()=>{"use strict";ue()});var LF=l(()=>{"use strict";ue()});var Qg=l(()=>{"use strict";ue()});var ef=l(()=>{"use strict";ue()});var bc=l(()=>{"use strict";ue()});var v9,_9,Pc,I_=l(()=>{"use strict";ht();Zg();LF();Qg();ef();bc();v9={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},_9={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Pc=e=>{if(!ce(e.writerAgent))return"the selected writer";let t=Je(e.writerAgent);if(Te(e.writerExecutionBackend)==="api"&&t!==null){let r=He(ve(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Yi(t,r.model);return`${_9[t]} model ${o}`}}return v9[e.writerAgent]}});var W9,L9,kF,EF,CF=l(()=>{"use strict";W9=/"input_tokens"\s*:\s*(\d+)/,L9=/"output_tokens"\s*:\s*(\d+)/,kF=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},EF=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=kF(W9.exec(t)),o=kF(L9.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var tf=l(()=>{"use strict";Dt()});var wc,rf,k9,O_,RF,xF,TF,M_,IF=l(()=>{"use strict";wc=m(require("node:fs")),rf=m(require("node:path"));tf();k9="run-completion-outbox.json",O_=e=>{let t=e.profileEmail?rf.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return rf.default.join(t,k9)},RF=e=>{let t=O_(e);if(!wc.default.existsSync(t))return[];try{let r=JSON.parse(wc.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},xF=(e,t)=>{wc.default.mkdirSync(rf.default.dirname(O_(e)),{recursive:!0}),wc.default.writeFileSync(O_(e),JSON.stringify(t,null,2),"utf8")},TF=(e,t)=>{let r=[...RF(e).filter(o=>o.runId!==t.runId),t];xF(e,r)},M_=async e=>{if(e.cloudApi===null)return;let t=RF(e.layout);if(t.length===0)return;let r=[];for(let o of t)await _a(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);xF(e.layout,r)}});var OF=l(()=>{"use strict"});var N_,vc,C9,Pn,MF=l(()=>{"use strict";OF();N_=new Map,vc=e=>{let t=N_.get(e);t!==void 0&&(clearInterval(t),N_.delete(e))},C9=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},Pn=(e,t,r,o={})=>{vc(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){vc(t);return}let i=o.onTick?.()??{};C9(e,t,n,i)};s(),N_.set(t,setInterval(s,15e3))}});var NF=l(()=>{"use strict";Dt()});var zF,jF=l(()=>{"use strict";NF();zF=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:rt(t)}});var z_,_c,kr,j_,Yt,DF,of=l(()=>{"use strict";z_=new Set,_c=new Map,kr=(e,t)=>{if(t.length===0)return;let r=_c.get(e)??[];r.push(t),_c.set(e,r)},j_=e=>{z_.add(e);let t=_c.get(e)??[];return _c.delete(e),t},Yt=e=>z_.has(e),DF=e=>{z_.delete(e),_c.delete(e)}});var ri,$F,HF,FF=l(()=>{"use strict";ri=m(require("node:path")),$F=require("node:url");bo();HF=()=>{if(Ke()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?ri.default.dirname(ri.default.resolve(e)):ri.default.dirname(ri.default.resolve(__filename))}return ri.default.dirname((0,$F.fileURLToPath)(__agentWitchImportMetaUrl))}});var UF,BF,GF,VF,Ve,oi,qF,KF,ni,D_,$_,H_,JF,F_,YF,nf=l(()=>{"use strict";UF=require("node:crypto"),BF=m(require("node:fs")),GF=m(require("node:path")),VF=require("node:url");gc();bo();FF();Ve=new Map,qF=async()=>{if(oi!==void 0)return oi;try{if(Ke()){let e=HF(),t=GF.default.join(e,"deps","node-pty","lib","index.js");if(BF.default.existsSync(t)){let r=await import((0,VF.pathToFileURL)(t).href);return oi=r,r}}return oi=await import("node-pty"),oi}catch{return oi=null,null}},KF=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},ni=(e,t,r)=>{let o=Ve.get(e);if(o!==void 0){Ve.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},D_=(e,t)=>{let r=Ve.get(e);return r===void 0?!1:(r.pty.write(t),!0)},$_=(e,t,r)=>{let o=Ve.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},H_=e=>{for(let t of Ve.values())if(!(t.mode!=="agent"||t.runId!==e))return Lr(t.pty.pid);return!1},JF=e=>{for(let[t,r]of Ve.entries())if(!(r.mode!=="agent"||r.runId!==e)){Ve.delete(t);try{r.pty.kill()}catch{}return!0}return!1},F_=async e=>{let t=await qF();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;Ve.get(e.shellSessionId)!==void 0&&ni(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Ve.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{KF(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{Ve.get(e.shellSessionId)?.pty===n&&(Ve.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},YF=async e=>{let t=e.shellSessionId??(0,UF.randomUUID)(),r=await qF();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return Ve.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{KF(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{Ve.get(t)?.pty===o&&(Ve.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var sf,XF,ZF=l(()=>{"use strict";sf="[[AWAITING_INPUT]]",XF=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",sf,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Wc,QF,af=l(()=>{"use strict";ZF();Wc=e=>{let t=e.indexOf(sf);if(t<0)return null;let o=e.slice(t+sf.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},QF=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",XF].join(`
`)});var e1,t1=l(()=>{"use strict";of();nf();af();e1=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(Yt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}kr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await YF({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Wc(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var r1,o1,n1,Er,lf=l(()=>{"use strict";r1=require("node:child_process"),o1=m(require("node:fs")),n1=m(require("node:path"));ou();Er=(e,t)=>{let r=n1.default.join(e,"app",nE,"ensure-writer.sh");return o1.default.existsSync(r)?new Promise((o,n)=>{let s=(0,r1.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var s1,wn,kc,cf,U_,Lc,df,uf,B_,G_,R9,si,x9,T9,V_,q_=l(()=>{"use strict";s1=require("node:child_process");ht();lf();Qg();Zg();bc();ef();wn=new Map,kc=e=>e==="cursor"||e==="antigravity",cf=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",U_=e=>wn.get(e)?.warmed===!0,Lc=e=>{let t=wn.get(e);wn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},df=e=>wn.get(e)?.conversationStarted===!0,uf=e=>{let t=wn.get(e);wn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},B_=e=>{wn.delete(e)},G_=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",R9={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},si=e=>`${R9[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,x9=(e,t,r,o)=>new Promise(n=>{let s=Su(t,r),i=[],a=(0,s1.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),T9=(e,t)=>{let r=si(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},V_=async e=>{if(!ce(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Te(e.runConfig.writerExecutionBackend)==="api"){let r=Je(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=ve(e.runConfig.layout.configPath);return He(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Lc(e.writerAgent),{exitCode:0,output:si(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Er(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}kc(e.writerAgent)&&Lc(e.writerAgent);let t=await x9(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?T9(e.writerAgent,t.output):si(e.writerAgent)}}});var vn,K_=l(()=>{"use strict";vn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var i1,I9,O9,a1,M9,J_,l1=l(()=>{"use strict";K_();i1=/you(?:'|')ve hit your session limit/i,I9=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],O9=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,a1=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},M9=e=>{let t=O9.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},J_=e=>{let t=e.trim();if(t.length===0)return null;if(i1.test(t))return{code:vn.SESSION_LIMIT,resetHint:M9(t),matchedLine:a1(t,i1)};for(let r of I9)if(r.test(t))return{code:vn.PROVIDER_QUOTA,resetHint:null,matchedLine:a1(t,r)};return null}});var pf,mf,Y_,X_=l(()=>{"use strict";pf="[[AGENT_RUN_WRITER_EXECUTION]]",mf="cli-writer-api-key-missing",Y_="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var Z_=l(()=>{"use strict";X_()});var c1=l(()=>{"use strict";Z_()});var gf=l(()=>{"use strict";K_();l1();X_();Z_();c1()});var ff,d1=l(()=>{"use strict";ff={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var u1,p1=l(()=>{"use strict";u1="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var m1,g1=l(()=>{"use strict";gf();p1();m1=e=>e.code===vn.SESSION_LIMIT?u1:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var f1,h1=l(()=>{"use strict";gf();d1();g1();f1=e=>{let t=J_(e.output);return t!==null?{status:ff.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:m1(t)}:{status:e.exitCode===0?ff.COMPLETED:ff.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var Q_,J0e,y1=l(()=>{"use strict";Q_={OPEN:"open",APPROVAL:"approval"},J0e=Q_.APPROVAL});var ii,hf,S1,j9,A1,b1,P1,Ec,eW,tW=l(()=>{"use strict";ii=m(require("node:fs")),hf=m(require("node:path")),S1="runs",j9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),A1=e=>{let t=e.profileEmail!==null?hf.default.join(e.installDir,"profiles",e.profileEmail,S1):hf.default.join(e.installDir,S1);return ii.default.mkdirSync(t,{recursive:!0}),t},b1=(e,t)=>hf.default.join(A1(e),`${t}.json`),P1=(e,t)=>{ii.default.writeFileSync(b1(e,t.id),JSON.stringify(t,null,2))},Ec=(e,t)=>{let r=b1(e,t);if(!ii.default.existsSync(r))return null;try{let o=JSON.parse(ii.default.readFileSync(r,"utf8"));return!j9(o)||typeof o.id!="string"?null:o}catch{return null}},eW=e=>{let t=A1(e),r=ii.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=Ec(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var D9,w1,v1=l(()=>{"use strict";h1();y1();tW();D9=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=f1({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:Q_.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},w1=(e,t)=>{let r=D9(t);return P1(e,r),r}});var _1=l(()=>{"use strict";Eg()});var W1,L1=l(()=>{"use strict";gf();W1=()=>[pf,`agentRunWriterExecutionBackend=${mf}`,`agentRunWriterExecutionReasonCode=${Y_}`].join(`
`)});var oo,yf=l(()=>{"use strict";oo=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var rW,$9,H9,k1,E1=l(()=>{"use strict";rW=e=>e.toLocaleString("en-US"),$9=e=>e<.01?e.toFixed(4):e.toFixed(3),H9=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${$9(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${rW(e.inputTokens)} in / ${rW(e.outputTokens)} out (${rW(e.totalTokens)} total)`,t].join(`
`)},k1=(e,t)=>{if(t===void 0)return e;let r=H9(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var C1=l(()=>{"use strict";ue()});var x1,Cc,me,oW,Sf,R1,F9,U9,T1,I1,O1,Rc,nW,sW,iW,M1,B9,lt,xc,no,N1,G9,V9,Af,aW,lW,cW,z1=l(()=>{"use strict";x1=require("node:child_process");ue();ht();WF();Yl();I_();CF();Ji();IF();tf();MF();gc();jF();of();nf();af();t1();q_();v1();_1();L1();yf();E1();Dn();C1();bc();Ii();af();Cc=new Map,me=new Map,oW=new Set,Sf=new Map,R1=e=>{e!==void 0&&!Sf.has(e)&&Sf.set(e,Date.now())},F9=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(Yt(t)){lt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}kr(t,n)},U9=(e,t,r,o,n)=>{if(!Vy(e,n))return;let s=`${W1()}
`;F9(t,r,o,s);let i=me.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},T1=130,I1=`

Stopped by user.`,O1=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:oo(e)},Rc=null,nW=e=>{Rc=e},sW=(e,t)=>{if(Rc===null)return;let r=ov(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||GS(Rc,t,r)},iW=async e=>{await M_({layout:e,cloudApi:Rc})},M1=e=>{let t=Cc.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Lr(t.pid)},B9=e=>de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),lt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},xc=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=On(s),c=me.get(r);if(a!==null&&c!==void 0){let d=gE(a),p=M1(r)||H_(r);d!==null&&!p&&no(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return mE(a)}}),no=(e,t,r,o,n,s,i,a)=>{let c=Gn(s,a),d=n,p=k1(c.output,c.llmUsage);if(r!==void 0){let b=Sf.get(r);Sf.delete(r),b!==void 0&&tv({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-b)/1e3))});let h=EF(c.llmUsage,p);h!==null&&qD({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&oW.has(r)&&(oW.delete(r),d=T1,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${I1}`:"Stopped by user.");let g=r!==void 0?ov(e.layout.reportsDir,r):null;if(r!==void 0){vc(r),oa(e.layout,r),Yt(r)&&(lt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),DF(r));let b=me.get(r);BD({reportsDir:e.layout.reportsDir,agentRunId:r,input:oo(i),output:p,...b!==void 0?{writerLabel:Pc({writerAgent:b.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),b!==void 0&&Lg({layout:e.layout,writerAgent:b.writerAgent,projectFolderPath:b.projectFolderPath,userPrompt:b.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),w1(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),TF(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),M_({layout:e.layout,cloudApi:Rc}),me.delete(r),Cc.delete(r),Xg(e.layout,r)}lt(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),Fi(e.layout)},N1=(e,t,r,o,n,s,i)=>{let a=me.get(r),c=a?.accumulatedOutput??s;_F(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),Pn(t,r,()=>T_(e.layout,r),xc(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),lt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},G9=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(n===void 0||h.length===0)){if(Yt(n)){lt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}kr(n,h)}};if(n!==void 0){let h=me.get(n);Cc.set(n,t),me.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),lt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),Pn(r,n,()=>M1(n),xc(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let g=a==="claude-cli",b=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(g?b.push(y):(c.push(y),p(y)),d||n===void 0)return;let u=Wc(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let S=me.get(n),A=[S?.accumulatedOutput??"",u.partialOutput].filter(f=>f.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=A),Cc.delete(n),N1(e,r,n,o,u.question,A,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;uf(a);let y=n!==void 0?me.get(n):void 0,u=g?Gn(b.join("")):{output:c.join("").trim(),llmUsage:void 0},S=g?c.join("").trim():"",A=[u.output.trim(),S].filter(w=>w.length>0).join(`
`);g&&u.output.trim().length>0&&p(u.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${A}`.trim():A;no(e,r,n,o,h??-1,f,s,u.llmUsage)}),t.on("error",h=>{d||no(e,r,n,o,-1,h.message,s)})},V9=(e,t,r,o,n,s,i,a,c)=>{let d=O1(r,c);s!==void 0&&(me.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),lt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),Pn(n,s,()=>me.has(s),xc(e,n,s,o,i,a))),Qi(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(Yt(s)){lt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}kr(s,g)}}).then(g=>{uf(t),no(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let b=g instanceof Error?g.message:String(g);no(e,n,s,o,-1,b,r)})},Af=(e,t,r,o,n,s,i,a,c,d,p,g)=>{let b=O1(r,p);if(Hi(e.layout),Ro(e,t)){R1(s),V9(e,t,r,o,n,s,c,d,b);return}let h=Nt(t,r,B9(e),i);if(h===null){no(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}R1(s);let y=zF({workspace:e.workspace,projectFolderPath:c}),u=()=>{let S=(0,x1.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:g??process.env});G9(e,S,n,o,s,r,b,t)};if(s===void 0){u();return}me.set(s,{originalPrompt:r,userTranscriptPrompt:b,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:me.get(s)?.accumulatedOutput??""}),U9(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Ti({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),Pn(n,s,()=>me.has(s),xc(e,n,s,o,c,d)),e1({socket:n,sendMessage:lt,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:S=>{a!==void 0&&ni(a,w=>{lt(n,w)},o);let A=me.get(s),f=[A?.accumulatedOutput??"",S.partialOutput].filter(w=>w.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),N1(e,n,s,o,S.question,f,r)},onFinished:(S,A)=>{uf(t);let f=Gn(A),w=me.get(s),v=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${f.output}`.trim():f.output;no(e,n,s,o,S,v,r,f.llmUsage)}}).then(S=>{if(!S){u();return}Pn(n,s,()=>H_(s),xc(e,n,s,o,c,d))}).catch(S=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",S instanceof Error?S.message:S),u()})},aW=(e,t,r,o)=>{Xg(e.layout,t.agentRunId),t.shellSessionId!==void 0&&lt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=QF(t),s=me.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;Af(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},lW=(e,t)=>{for(let r of vF(e.layout))me.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:oo(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Pn(t,r.agentRunId,()=>T_(e.layout,r.agentRunId),{awaitingInput:!0}),lt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},cW=(e,t,r,o)=>{let n=me.get(r);if(n===void 0)return!1;oW.add(r),vc(r);let s=Cc.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(JF(r))return!0;Xg(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${I1}`:"Stopped by user.";return no(e,t,r,o,T1,i,n.originalPrompt),!0}});var q9,dW,j1=l(()=>{"use strict";la();q9=()=>`http://127.0.0.1:${yt()}/restart`,dW=async()=>{try{let e=await fetch(q9(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var D1=l(()=>{"use strict";Ja()});var $1=l(()=>{"use strict";Tv()});var H1,F1=l(()=>{"use strict";H1=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Tc,K9,uW,U1=l(()=>{"use strict";K();te();D1();TA();$1();F1();Dn();Tc=(e,t)=>{Ur(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},K9=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(dy(),cy)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},uW=async e=>{let t=xe(e.layout.installDir)?.bundleVersion??null;if(!H1({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(ft(e.layout)){Ui({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Tc(e.layout,{summary:r,action:"install-bundle-update-start"}),tr({launchAgentLabel:Pe(e.layout.installDir),installDir:e.layout.installDir});let o=await Vs({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),Tc(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await K9();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Tc(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),Tc(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),Tc(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var J9,pW,B1=l(()=>{"use strict";J9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pW=e=>{if(!J9(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var mW,gW,G1=l(()=>{"use strict";pA();mA();mW=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=xa({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},gW=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await cr(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var V1,Y9,X9,Z9,Ic,q1=l(()=>{"use strict";V1=m(require("node:os"));Re();Y9="Default",X9=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),Z9=e=>{let t=V1.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Ic=()=>{let e=N(),t=qd(e),r=X9(Y9);return`${Z9(t)}/${r.length>0?r:"project"}`}});var K1=l(()=>{"use strict";Ja()});var J1,fW,Y1=l(()=>{"use strict";K1();J1=!1,fW=e=>{J1||(J1=!0,process.on("uncaughtException",t=>{Go(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;Go(e,{kind:"crash",message:r,stack:o})}))}});var X1,Q9,hW,Z1=l(()=>{"use strict";X1=require("node:child_process");lf();ht();Qg();Zg();bc();ef();Q9=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,X1.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},hW=async e=>{if(!ce(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Te(e.runConfig.writerExecutionBackend)==="api"){let r=Je(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=ve(e.layout.configPath),n=He(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Er(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await Q9(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var yW,Q1=l(()=>{"use strict";yW=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var eU,SW,tU=l(()=>{"use strict";eU=require("node:crypto"),SW=()=>(0,eU.randomUUID)()});var ai,rU,bf=l(()=>{"use strict";ai="[[WORKING_ESTIMATE]]",rU=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",ai,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var oU,nU=l(()=>{"use strict";oU=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var eY,sU,iU=l(()=>{"use strict";bf();eY=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,sU=e=>{if(!e.includes(ai))return null;let t=null;for(let r of e.matchAll(eY)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var tY,AW,aU=l(()=>{"use strict";iU();tY=/^(\d{1,6})\b/,AW=e=>{let t=sU(e);if(t!==null)return t;let r=tY.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var rY,oY,nY,Pf,bW=l(()=>{"use strict";ht();Va();rY="http://127.0.0.1:11434",oY=45e3,nY=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Pf=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||rY,o=t===void 0?(await bt({commands:de({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(oY)});return n.ok?nY(await n.json()):null}catch{return null}}});var PW,wW,vW,lU=l(()=>{"use strict";Ii();bf();yf();nU();aU();Yl();bW();PW=async e=>{let t=oo(e.wrappedPrompt),r=GD(e.reportsDir);return{estimateOutput:await Pf(rU(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},wW=e=>{let t=AW(e.estimateOutput);t!==null&&Ag({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},vW=e=>{let t=AW(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=oU(t);return xi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Tt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),Ag({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var wf,cU,_W=l(()=>{"use strict";wf="[[WORKING_TOKEN_ESTIMATE]]",cU=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",wf,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var dU,sY,uU,pU=l(()=>{"use strict";_W();dU=/^(\d{1,8})\b/,sY=e=>{let t=e.indexOf(wf);if(t<0)return null;let r=e.slice(t+wf.length).trim(),o=dU.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},uU=e=>{let t=sY(e);if(t!==null)return t;let r=dU.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var WW,LW,mU=l(()=>{"use strict";_W();yf();pU();Yl();bW();WW=async e=>{let t=oo(e.wrappedPrompt),r=KD(e.reportsDir);return{estimateOutput:await Pf(cU(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},LW=e=>{let t=uU(e.estimateOutput);return t===null?null:(VD({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var gU=l(()=>{"use strict";k_();mF();fF();AF();la();z1();lf();ht();tW();of();j1();PA();U1();Dn();B1();G1();tf();q1();Y1();Z1();nu();Q1();tU();bf();Ii();lU();mU();I_();Va();nf();q_()});var fU={};Ct(fU,{buildContinuationPromptWithContext:()=>lY});var iY,aY,lY,hU=l(()=>{"use strict";iY=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,aY=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),lY=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=aY(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${iY(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var yU={};Ct(yU,{readHarnessExportSets:()=>dY});var Oc,kW,vf,cY,dY,SU=l(()=>{"use strict";Oc=m(require("node:fs")),kW=m(require("node:path"));Re();vf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cY=e=>{if(!Oc.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Oc.default.readFileSync(e.harnessManifestPath,"utf8"));if(vf(t))return t}catch{return null}return null},dY=(e,t)=>{let r=N(t),o=cY(r);if(o===null)return[];let n=vf(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!vf(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!vf(p))continue;let g=typeof p.path=="string"?p.path:void 0,b=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(g===void 0||b.length===0||h.length===0||y.length===0)continue;let u=g.startsWith("shared/")?kW.default.join(r.harnessRootDir,g):kW.default.join(r.harnessSetsDir,i,g);Oc.default.existsSync(u)&&d.push({id:b,kind:h,title:y,content:Oc.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var OW,CW,li,AU,uY,bU,PU,EW,wU,RW,xW,TW,Z,G,IW,pY,Mc,mY,gY,fY,hY,yY,SY,AY,bY,Nc,vU=l(()=>{"use strict";OW=require("node:child_process"),CW=m(require("node:fs")),li=m(require("node:os"));nF();K();te();is();Bv();lF();ue();Mt();Ja();Ub();Og();Eg();Dt();Mo();UA();Ot();gU();AU=3e4,uY=3e4,bU=new Map,PU=new Map,EW=new Map,wU=new Map,RW=new Map,xW=new Map,TW=new Map,Z=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),G=(e,t,r)=>{e.readyState===mc.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Ur(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Gp(r,"out",t)))},IW=e=>e,pY=e=>{if(!CW.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(CW.default.readFileSync(e.harnessManifestPath,"utf8"));if(Z(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Mc=(e,t)=>{let r=pY(t);r!==null&&G(e,{type:"harness.manifest.report",payload:{hostname:li.default.hostname(),manifest:r}})},mY=async(e,t,r,o,n,s,i=!1,a,c,d,p,g)=>{let b=g?.trim()??"";if(!ce(t)){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=Pc({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await bt({commands:de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?PW({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,S=s!==void 0?WW({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=kc(t)&&!U_(t);if(A){try{await Er(e.layout.installDir,t)}catch(H){let ge=H instanceof Error?H.message:String(H);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${ge}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Lc(t)}else if(!kc(t))try{await Er(e.layout.installDir,t)}catch(H){let ge=H instanceof Error?H.message:String(H);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${ge}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=ta(d,Ic,g);if(f===null){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Ye({projectFolderPath:f,...b.length>0?{projectId:b}:{}}),i||tc(e.layout,t,f);let w=kg({sessionContinuation:i,supportsWriterSessionContinuation:cf(t),isWriterConversationStarted:df(t)}),v=i&&w==="first"?ec(e.layout,t,f):null,W=v!==null?Gs(e.layout,v):null,L=W!==null&&W.turns.length>0,E=Sv({sessionContinuation:i,supportsWriterSessionContinuation:cf(t),isWriterConversationStarted:df(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:L,userPromptCharacterCount:r.length}),x=r;if(E.continuationStrategy==="source_run_seed"){let H=typeof c=="string"&&c.length>0?Ec(e.layout,c):null;if(H!==null){let{buildContinuationPromptWithContext:ge}=await Promise.resolve().then(()=>(hU(),fU));x=ge({priorPrompt:H.prompt,priorOutput:H.resultOutput??"",userMessage:r})}}else E.continuationStrategy==="transcript_seed"&&W!==null&&W.turns.length>0&&(x=wg({priorTurns:W.turns,userMessage:r}));let I=E.ragLimit>0?await ys({layout:e.layout,query:x,limit:E.ragLimit,minScore:E.ragMinScore,projectFolderPath:f,...b.length>0?{projectId:b}:{}}):[],M=E.ragLimit>0&&f.trim().length>0?await Hb({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:f,...b.length>0?{projectId:b}:{}}):[],B=E.injectMemory?lv(e.layout,f,b.length>0?b:void 0):[],V=`${dv(B,E.memoryEntryLimit)}${jb(I)}${Fb(M)}${x}`,F=p?.trim()??(s!==void 0&&f.trim().length>0?SW():void 0);if(s!==void 0&&F!==void 0&&F.length>0&&f.trim().length>0){Ti({reportKey:F,agentRunId:s,userSummary:"Working on your Mac\u2026"});let H=V;u!==null&&u.then(ge=>{if(ge===null)return;let so=vW({estimateOutput:ge.estimateOutput??"",reportKey:F,agentRunId:s,reportsDir:e.layout.reportsDir,task:ge.task,writerLabel:ge.writerLabel,embedding:ge.embedding});if(so.estimateSeconds===null)return;sW(e.layout.reportsDir,s);let Et=`${ai}
${so.estimateSeconds}
`;if(Yt(s)){G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Et},requestId:o});return}kr(s,Et)}).catch(()=>{}),V=yW(H),V=Nh(V,{agentRunId:s,reportKey:F,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then(H=>{H!==null&&wW({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel,embedding:H.embedding})}).catch(()=>{}),s!==void 0&&S!==null&&S.then(H=>{H!==null&&LW({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel})}).catch(()=>{});let ct=s!==void 0&&TW.get(s)===!0;if(s!==void 0&&f.trim().length>0){let H=await bp(f);xW.set(s,H),F!==void 0&&F.length>0&&RW.set(s,F)}Af(e,t,V,o,IW(n),s,{sessionTurn:E.sessionTurn},a,f,F,r,Hy(e.layout,s,ct)),A&&s!==void 0&&G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:G_(t)},requestId:o})},gY=async(e,t,r,o,n)=>{let s=(i,a)=>{G(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await V_({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,G(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=ce(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?si(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},fY=(e,t,r)=>new Promise(o=>{if(!ce(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Nt(t,r,de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,OW.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),hY=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;G(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=jt(t.bundle),s=Z(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=we(e.wsUrl)??gt,g=await LS({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=Oo({bundle:i,layout:e.layout});return G(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&Mc(o,e.layout),!0},yY=async(e,t,r,o)=>{if(await hY(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(G(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!ce(n)){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}Hi(e.layout);let i=await(async()=>{try{await Er(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return fY(e,n,s)})().finally(()=>{Fi(e.layout)});G(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),Mc(o,e.layout)},SY=e=>{let t=1e3*2**e;return Math.min(uY,t)},AY=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(ft(e.layout)){oy(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,dW().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(u,S="system.ack")=>{if(!t.selfUpdateInFlight){if(ft(e.layout)){Ui({layout:e.layout,remoteBundleVersion:u,trigger:S}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${S}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,uW({layout:e.layout,remoteBundleVersion:u,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let u=We(e.layout);u!==null&&je(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===mc.OPEN||u.readyState===mc.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,AU)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=SY(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},g=u=>{s();let S=()=>{let A=zi(e.layout.installDir),f=yt();G(u,{type:"agent.heartbeat",payload:{hostname:li.default.hostname(),macOsUsername:li.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:A}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,AU)},b=(u,S)=>{if(typeof u.type!="string")return;if(FA(u)){t.stopped=!0,s(),a(),c(),jA({layout:e.layout}).finally(()=>{fc(),process.exit(0)});return}Ur(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),Gp(e.layout,"in",u);let A=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&Z(u.payload)){let f=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",w=typeof u.payload.origin=="string"?u.payload.origin:"",v=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",W=typeof u.payload.challenge=="string"?u.payload.challenge:"",L=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!Uv({serverPublicKey:f,origin:w,devicePublicKey:v,challenge:W,serverAttestation:L})){t.wakeError="Server attestation verification failed",Ur(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&Z(u.payload)){let f=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";Ur(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),hW({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{G(S,{type:"writer.status",payload:w},e.layout)})}if(u.type==="install.bundle.update"&&Z(u.payload)){let f=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(u.type==="system.ack"){kp(e.layout,{wsUrl:e.wsUrl});let f=Z(u.payload)?u.payload:null,w=pW(f);w!==null&&o(w)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&Z(u.payload)&&mW(u.payload),u.type==="automations.run"&&Z(u.payload)&&gW(u.payload),u.type==="terminal.stream.accepted"&&Z(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"";if(f.length>0){let w=j_(f);for(let v of w)G(S,{type:"terminal.stream.chunk",payload:{runId:f,chunk:v},requestId:A})}}if(u.type==="agent.agentRun.list"&&G(S,{type:"dashboard.agentRun.list.result",payload:{runs:eW(e.layout)},requestId:A}),u.type==="agent.agentRun.get"&&Z(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"",w=f.length>0?Ec(e.layout,f):null;G(S,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:A})}if(u.type==="command.claude.run"&&Z(u.payload)){let f=u.payload.prompt,w=typeof u.payload.writerAgent=="string"&&ce(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",v=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,W=u.payload.sessionContinuation===!0,L=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,E=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,x=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=ta(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,Ic,x),M=Oy(u.payload.compositionSnapshot),B=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${W?"continue":"first"})\u2026`),I===null){G(S,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...v!==void 0?{agentRunId:v}:{}},requestId:A});return}if(M!==null){let V=Ny(e.layout,M);if(V!==null){G(S,{type:"command.claude.result",payload:{exitCode:-1,output:V,...v!==void 0?{agentRunId:v}:{}},requestId:A});return}if(v!==void 0){let F=jy(e.layout,v,M);if(!F.ok){G(S,{type:"command.claude.result",payload:{exitCode:-1,output:F.errorMessage,...v!==void 0?{agentRunId:v}:{}},requestId:A});return}TW.set(v,M.entries.some(ct=>ct.scope==="run"))}}v!==void 0&&E!==void 0&&bU.set(v,E),v!==void 0&&(PU.set(v,I),x!==void 0&&x.trim().length>0&&EW.set(v,x.trim()),wU.set(v,f.trim()),Ye({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),mY(e,w,f.trim(),A,S,v,W,E,L,I,B,x)}}if(u.type==="shell.session.open"&&Z(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:120,v=typeof u.payload.rows=="number"?u.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),F_({shellSessionId:f,cwd:e.workspace,cols:w,rows:v,send:W=>{G(S,W)},requestId:A}))}if(u.type==="shell.session.close"&&Z(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";f.length>0&&ni(f,w=>{G(S,w)},A)}if(u.type==="shell.input"&&Z(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.data=="string"?u.payload.data:"";f.length>0&&w.length>0&&D_(f,w)}if(u.type==="shell.resize"&&Z(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:0,v=typeof u.payload.rows=="number"?u.payload.rows:0;f.length>0&&w>0&&v>0&&$_(f,w,v)}if(u.type==="command.writer.session.end"&&Z(u.payload)){let f=u.payload.writerAgent;typeof f=="string"&&ce(f)&&(B_(f),Wg(e.layout,f))}if(u.type==="command.writer.session.start"&&Z(u.payload)){let f=u.payload.writerAgent,w=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof f=="string"&&ce(f)&&w.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),gY(e,f,w,A,S))}if(u.type==="command.claude.stop"&&Z(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),cW(e,IW(S),f,A))}if(u.type==="command.claude.input_respond"&&Z(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",w=typeof u.payload.response=="string"?u.payload.response.trim():"",v=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",W=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",L=typeof u.payload.question=="string"?u.payload.question:"";f.length>0&&w.length>0&&v.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),aW(e,{agentRunId:f,originalPrompt:v,partialOutput:W,question:L,response:w,shellSessionId:bU.get(f)},A,IW(S)))}if(u.type==="dispatch.approval.required"&&Z(u.payload)){let f=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",w=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${w}`),process.platform==="darwin"&&(0,OW.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&Z(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),yY(e,u.payload,A,S)),u.type==="harness.export.request"&&Z(u.payload)){let f=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",w=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,v=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(W=>typeof W=="string"):[];f.length>0&&v.length>0&&(async()=>{let{readHarnessExportSets:W}=await Promise.resolve().then(()=>(SU(),yU)),L=W(v,e.email);G(S,{type:"harness.export.result",payload:{success:L.length>0,borrowerUserId:f,...w!==void 0?{targetDeviceId:w}:{},sets:L,errorMessage:L.length>0?void 0:"No readable harness sets were found on this machine."},requestId:A})})()}if(u.type==="harness.manifest.request"&&Mc(S,e.layout),u.type==="command.claude.result"&&Z(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,w=typeof u.payload.output=="string"?u.payload.output:"",v=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,W=ta(f!==void 0?PU.get(f):void 0,Ic),L=f!==void 0?EW.get(f):void 0,E=f!==void 0?wU.get(f)??"":"",x=rA({exitCode:v,output:w});if(x&&W!==null&&zb({layout:e.layout,text:w,source:f??"command.claude.result",projectFolderPath:W,...L!==void 0?{projectId:L}:{}}),v!=null&&v!==0&&w.trim().length>0&&W!==null&&(Tb({layout:e.layout,errorText:w,projectFolderPath:W,...L!==void 0?{projectId:L}:{}}),$b({layout:e.layout,text:w,source:f??"command.claude.result.failure",projectFolderPath:W,...L!==void 0?{projectId:L}:{}})),x&&E.trim().length>0&&W!==null&&cv({layout:e.layout,projectFolderPath:W,...L!==void 0?{projectId:L}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:E,output:w,createdAt:new Date().toISOString()}}),f!==void 0&&W!==null){let M=RW.get(f),B=xW.get(f);M!==void 0&&B!==void 0&&bp(W).then(V=>{let F=oA({before:B,after:V});zh(M,F),xW.delete(f),RW.delete(f)})}if(x&&L!==void 0&&L.trim().length>0){let M=$(),B=M===null?null:Y({wsUrl:M.wsUrl,pairingToken:M.pairingToken});B!==null&&sA(B,L,{...f!==void 0?{sourceRunId:f}:{},lesson:nA({prompt:E,output:w})})}f!==void 0&&(oa(e.layout,f),TW.delete(f),EW.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let u=new mc(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),nW(Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),iW(e.layout);let S=we(e.wsUrl)??"http://localhost:3000",A=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=Fv({layout:e.layout,origin:S,...A!==void 0&&A.length>0?{claimToken:A}:{}});G(u,{type:"agent.register",payload:{role:"agent",hostname:li.default.hostname(),macOsUsername:li.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),Mc(u,e.layout),lW(e,u),g(u)}),u.on("message",S=>{let A=typeof S=="string"?S:S.toString("utf8");try{let f=JSON.parse(A);if(!Z(f))return;b(f,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(S,A)=>{s(),t.socket=void 0,t.wsConnected=!1,hA(e.layout),t.reconnectAttempt+=1;let f=typeof A=="string"?A:A.toString("utf8");Go(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:f}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",S=>{t.wakeError=S.message,Go(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return ry(()=>{let u=ny();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&o(u.remoteBundleVersion,u.trigger);let S=sy();S!==null&&r(S)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:za(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:sc(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Mc(u,e.layout),{ok:!0})}}},bY=async()=>{qe("agent-witch");let e=w_(),t=k();L_().ok||(process.platform==="darwin"?(await yo(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),R_(t);let o=C_({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(tr({launchAgentLabel:Pe(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),_i());let n=await Jy(),s=n[0];s!==void 0&&fW(s.layout);for(let h of n){let y=we(h.wsUrl)??gt;ji(h.layout.installDir,y)}let i=n.map(h=>AY(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),fc(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let S=We(h.layout);yA(S,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(ft(h)||ja(h.installDir))},g=await x_({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):nc({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let b=rr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Wi(),d()});d=()=>{b(),g.stop(),fc(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Nc=bY});var MW=l(()=>{"use strict";vU()});var _U={};Ct(_U,{startAgentWitchClient:()=>Nc});var WU=l(()=>{"use strict";MW();MW();bo();jh();iu();if(!Ke()&&Po(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(su(process.argv.slice(e))),Nc()}});Oh();jh();bo();iu();var yE="20.x",SE="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var xV=e=>[`Node.js ${yE} or newer is required (found ${e}).`,SE].join(" "),AE=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${xV(process.version)}
`),process.exit(1))};var PY=async()=>{qe("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(dy(),cy)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},wY=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(A0(),S0)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},vY=async()=>{if(!Po(Ke()?void 0:__agentWitchImportMetaUrl))return;AE();let e=process.argv.indexOf("report");e>=0&&process.exit(su(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await PY();return}if(t==="wake"){await wY();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(bT(),AT));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(Q$(),Z$));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(WU(),_U));await r()};vY();
