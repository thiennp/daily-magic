#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var rB=Object.create;var kf=Object.defineProperty;var oB=Object.getOwnPropertyDescriptor;var nB=Object.getOwnPropertyNames;var sB=Object.getPrototypeOf,iB=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var _=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Rt=(e,t)=>{for(var r in t)kf(e,r,{get:t[r],enumerable:!0})},aB=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of nB(t))!iB.call(e,n)&&n!==r&&kf(e,n,{get:()=>t[n],enumerable:!(o=oB(t,n))||o.enumerable});return e};var g=(e,t,r)=>(r=e!=null?rB(sB(e)):{},aB(t||!e||!e.__esModule?kf(r,"default",{value:e,enumerable:!0}):r,e));var di,BW,GW,co,Ef,lX,qW,Hc,Tt,Zt,Fc,Uc,Ln,kn,Qt,Cf,Bc,Gc,qc,ui,dt,En,Cn,Vc,Tr,Rf,VW,He=l(()=>{"use strict";di={production:".agent-witch",localhost:".local-agent-witch"},BW={production:47892,localhost:47893},GW={production:"com.agent-witch",localhost:"com.local-agent-witch"},co={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Ef="app",lX=`${Ef}/agent-witch.js`,qW=`${Ef}/command`,Hc={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Tt=di.production,Zt=di.localhost,Fc=BW.production,Uc=BW.localhost,Ln=GW.production,kn=GW.localhost,Qt="profiles",Cf=co.activeProfile,Bc="harness",Gc="sets",qc="manifest.json",ui=Hc.projectsDir,dt=Hc.logsDir,En="agent-witch.log",Cn="agent-witch.error.log",Vc=Hc.reportsDir,Tr=Hc.deviceKeypairJson,Rf=Ef,VW="agent-witch.js"});var KW=l(()=>{"use strict";He()});var JW,uo,pi,Kc=l(()=>{"use strict";JW=g(require("node:path"));He();uo=e=>JW.default.basename(e)===Zt,pi=e=>uo(e)?kn:Ln});var YW=l(()=>{"use strict";KW();Kc()});var XW,Tf,lB,mi,cB,dB,ZW,uB,pB,QW=l(()=>{"use strict";YW();He();XW=g(require("node:os")),Tf=g(require("node:path")),lB=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?Tf.default.resolve(e):Tf.default.join(XW.default.homedir(),Tt)},mi=pi(lB()),cB=`${mi}-wake`,dB=`${mi}-live`,ZW=`${mi}-watchdog`,uB=`${mi}-automation-scheduler`,pB=`${mi}-updater`});var Rn=_(xf=>{"use strict";Object.defineProperty(xf,"__esModule",{value:!0});xf.stringify=mB;function mB(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=_(If=>{"use strict";Object.defineProperty(If,"__esModule",{value:!0});If.generateTypeGuardError=gB;var eL=Rn();function gB(e,t,r){return(0,eL.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,eL.stringify)(e)}) to be "${r}"`}});var xr=_(Jc=>{"use strict";Object.defineProperty(Jc,"__esModule",{value:!0});Jc.isNonNullObject=void 0;var fB=O(),hB=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,fB.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Jc.isNonNullObject=hB});var xt=_(fe=>{"use strict";Object.defineProperty(fe,"__esModule",{value:!0});fe.attachTypeGuardMeta=fe.isArrayTypeGuard=fe.isNestedObjectTypeGuard=fe.getTypeGuardWrapperKind=fe.getTypeGuardInnerGuard=fe.getTypeGuardItemGuard=fe.getTypeGuardSchema=void 0;var yB=e=>e.schema;fe.getTypeGuardSchema=yB;var SB=e=>e.itemGuard;fe.getTypeGuardItemGuard=SB;var AB=e=>e.innerGuard;fe.getTypeGuardInnerGuard=AB;var bB=e=>e.wrapperKind;fe.getTypeGuardWrapperKind=bB;var PB=e=>{if((0,fe.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};fe.isNestedObjectTypeGuard=PB;var wB=e=>{if((0,fe.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};fe.isArrayTypeGuard=wB;var vB=(e,t)=>Object.assign(e,t);fe.attachTypeGuardMeta=vB});var gi=_(po=>{"use strict";Object.defineProperty(po,"__esModule",{value:!0});po.getExpectedTypeName=po.getTypeGuardDisplayName=void 0;var tL=xt(),_B=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};po.getTypeGuardDisplayName=_B;var WB=e=>{let t=(0,tL.getTypeGuardWrapperKind)(e),r=(0,tL.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,po.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};po.getExpectedTypeName=WB});var mo=_(Yc=>{"use strict";Object.defineProperty(Yc,"__esModule",{value:!0});Yc.createValidationResult=void 0;var LB=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Yc.createValidationResult=LB});var Tn=_(Xc=>{"use strict";Object.defineProperty(Xc,"__esModule",{value:!0});Xc.createValidationError=void 0;var kB=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Xc.createValidationError=kB});var xn=_(Zc=>{"use strict";Object.defineProperty(Zc,"__esModule",{value:!0});Zc.createTreeNode=void 0;var EB=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Zc.createTreeNode=EB});var fi=_(Qc=>{"use strict";Object.defineProperty(Qc,"__esModule",{value:!0});Qc.combineResults=void 0;var CB=mo(),RB=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,CB.createValidationResult)(r,o,n)};Qc.combineResults=RB});var td=_(ed=>{"use strict";Object.defineProperty(ed,"__esModule",{value:!0});ed.createSimplifiedTree=void 0;var rL=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=rL(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},TB=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=rL(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};ed.createSimplifiedTree=TB});var yi=_(od=>{"use strict";Object.defineProperty(od,"__esModule",{value:!0});od.validateObject=void 0;var xB=xr(),hi=mo(),IB=Tn(),rd=xn(),OB=fi(),oL=nd(),MB=(e,t,r)=>{let o=()=>{let i=(0,IB.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,rd.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,hi.createValidationResult)(!1,[],a):(0,hi.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,hi.createValidationResult)(!0,[],(0,rd.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,m=d,S=t[m],h=e[m],y=(0,oL.validateProperty)(m,h,S,r);return y.valid?p.length===0?(0,hi.createValidationResult)(!0,[],(0,rd.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,oL.validateProperty)(d,e[d],p,r)}),a=(0,OB.combineResults)(i,r.path),c=(0,rd.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,hi.createValidationResult)(a.valid,a.errors,c)};return(0,xB.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};od.validateObject=MB});var sL=_(ad=>{"use strict";Object.defineProperty(ad,"__esModule",{value:!0});ad.validateArray=void 0;var NB=Rn(),sd=mo(),nL=Tn(),id=xn(),zB=fi(),jB=yi(),DB=gi(),$B=xt(),HB=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,nL.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,id.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,sd.createValidationResult)(!1,[c],d)}let n=(0,$B.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,m={path:p,config:r.config||null};if(n)return(0,jB.validateObject)(c,n,m);let S=t(c,null),h=(0,DB.getExpectedTypeName)(t),y=(0,NB.stringify)(c);if(S)return(0,sd.createValidationResult)(!0,[],(0,id.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,A=(0,nL.createValidationError)(p,h,c,u),b=(0,id.createTreeNode)(p,!1,h,c);return b.errors=[A],(0,sd.createValidationResult)(!1,[A],b)}),i=(0,zB.combineResults)(s,o),a=(0,id.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,sd.createValidationResult)(i.valid,i.errors,a)};ad.validateArray=HB});var nd=_(cd=>{"use strict";Object.defineProperty(cd,"__esModule",{value:!0});cd.validateProperty=void 0;var iL=mo(),FB=Tn(),aL=xn(),UB=gi(),ld=xt(),BB=yi(),GB=sL(),qB=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,ld.getTypeGuardSchema)(r),c=(0,ld.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,BB.validateObject)(t,a,s);if(c&&(0,ld.isArrayTypeGuard)(r))return(0,GB.validateArray)(t,c,s)}let d=p=>{let m=r(t,p),S=(0,UB.getExpectedTypeName)(r);return m?(0,iL.createValidationResult)(!0,[],(0,aL.createTreeNode)(n,!0,S,t)):(()=>{let h=(0,FB.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,aL.createTreeNode)(n,!1,S,t);return y.errors=[h],(0,iL.createValidationResult)(!1,[h],y)})()};if((0,ld.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};cd.validateProperty=qB});var ud=_(dd=>{"use strict";Object.defineProperty(dd,"__esModule",{value:!0});dd.isNil=void 0;var VB=O(),KB=function(e,t){return e!=null?(t&&t.callbackOnError((0,VB.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};dd.isNil=KB});var Of=_(pd=>{"use strict";Object.defineProperty(pd,"__esModule",{value:!0});pd.isDefined=void 0;var JB=O(),YB=ud(),XB=function(e,t){return(0,YB.isNil)(e,null)?(t&&t.callbackOnError((0,JB.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};pd.isDefined=XB});var Mf=_(md=>{"use strict";Object.defineProperty(md,"__esModule",{value:!0});md.reportValidationResults=void 0;var ZB=td(),lL=Of(),QB=ud(),eG=(e,t)=>{if(e.valid===!0||(0,QB.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,lL.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,ZB.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,lL.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};md.reportValidationResults=eG});var Nf=_(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.Validation=Q.reportValidationResults=Q.validateObject=Q.validateProperty=Q.createSimplifiedTree=Q.combineResults=Q.createTreeNode=Q.createValidationError=Q.createValidationResult=Q.getExpectedTypeName=void 0;var tG=gi();Object.defineProperty(Q,"getExpectedTypeName",{enumerable:!0,get:function(){return tG.getExpectedTypeName}});var rG=mo();Object.defineProperty(Q,"createValidationResult",{enumerable:!0,get:function(){return rG.createValidationResult}});var oG=Tn();Object.defineProperty(Q,"createValidationError",{enumerable:!0,get:function(){return oG.createValidationError}});var nG=xn();Object.defineProperty(Q,"createTreeNode",{enumerable:!0,get:function(){return nG.createTreeNode}});var sG=fi();Object.defineProperty(Q,"combineResults",{enumerable:!0,get:function(){return sG.combineResults}});var iG=td();Object.defineProperty(Q,"createSimplifiedTree",{enumerable:!0,get:function(){return iG.createSimplifiedTree}});var aG=nd();Object.defineProperty(Q,"validateProperty",{enumerable:!0,get:function(){return aG.validateProperty}});var lG=yi();Object.defineProperty(Q,"validateObject",{enumerable:!0,get:function(){return lG.validateObject}});var cG=Mf();Object.defineProperty(Q,"reportValidationResults",{enumerable:!0,get:function(){return cG.reportValidationResults}});var dG=mo(),uG=fi(),pG=Tn(),mG=xn(),gG=nd(),fG=yi(),hG=Mf(),yG=td();Q.Validation={result:dG.createValidationResult,combine:uG.combineResults,error:pG.createValidationError,treeNode:mG.createTreeNode,property:gG.validateProperty,object:fG.validateObject,report:hG.reportValidationResults,createSimplifiedTree:yG.createSimplifiedTree}});var gd=_(zf=>{"use strict";Object.defineProperty(zf,"__esModule",{value:!0});zf.isType=AG;var cL=xr(),dL=Nf(),SG=xt();function AG(e){if(!(0,cL.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,dL.validateObject)(r,e,s);return(0,dL.reportValidationResults)(i,o||null),i.valid}return(0,cL.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,SG.attachTypeGuardMeta)(t,{schema:e})}});var gL=_(go=>{"use strict";Object.defineProperty(go,"__esModule",{value:!0});go.isNestedType=go.isShape=void 0;go.isSchema=Si;var uL=xr(),pL=Nf(),mL=xt();function Si(e){if(!(0,uL.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=PG(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,pL.validateObject)(o,t,i);return(0,pL.reportValidationResults)(a,n||null),a.valid}return(0,uL.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,mL.attachTypeGuardMeta)(r,{schema:t})}function bG(e){return typeof e=="function"?e:Array.isArray(e)?wG(e):typeof e=="object"&&e!==null?Si(e):e}function PG(e){let t={};for(let[r,o]of Object.entries(e))t[r]=bG(o);return t}function wG(e){let t=e[0],r=Si(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,mL.attachTypeGuardMeta)(o,{itemGuard:r})}go.isShape=Si;go.isNestedType=Si});var fL=_(jf=>{"use strict";Object.defineProperty(jf,"__esModule",{value:!0});jf.isObjectWith=_G;var vG=gd();function _G(e){return(0,vG.isType)(e)}});var hL=_(Df=>{"use strict";Object.defineProperty(Df,"__esModule",{value:!0});Df.isObject=LG;var WG=gd();function LG(e){return(0,WG.isType)(e)}});var yL=_($f=>{"use strict";Object.defineProperty($f,"__esModule",{value:!0});$f.guardWithTolerance=kG;function kG(e,t,r){return t(e,r),e}});var SL=_(Hf=>{"use strict";Object.defineProperty(Hf,"__esModule",{value:!0});Hf.isBranded=CG;var EG=O();function CG(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,EG.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var AL=_(fd=>{"use strict";Object.defineProperty(fd,"__esModule",{value:!0});fd.BrandSymbols=void 0;fd.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var bL=_(hd=>{"use strict";Object.defineProperty(hd,"__esModule",{value:!0});hd.isAny=void 0;var RG=function(e){return!0};hd.isAny=RG});var Ai=_(Ff=>{"use strict";Object.defineProperty(Ff,"__esModule",{value:!0});Ff.reportTypeGuardError=xG;var TG=O();function xG(e,t,r){e&&e.callbackOnError((0,TG.generateTypeGuardError)(t,e.identifier,r))}});var PL=_(yd=>{"use strict";Object.defineProperty(yd,"__esModule",{value:!0});yd.isBoolean=void 0;var IG=Ai(),OG=function(t,r){return typeof t!="boolean"?((0,IG.reportTypeGuardError)(r,t,"boolean"),!1):!0};yd.isBoolean=OG});var wL=_(Sd=>{"use strict";Object.defineProperty(Sd,"__esModule",{value:!0});Sd.isDate=void 0;var MG=O(),NG=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,MG.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Sd.isDate=NG});var Uf=_(Ad=>{"use strict";Object.defineProperty(Ad,"__esModule",{value:!0});Ad.isNumber=void 0;var zG=Ai(),jG=function(t,r){return typeof t!="number"||isNaN(t)?((0,zG.reportTypeGuardError)(r,t,"number"),!1):!0};Ad.isNumber=jG});var vL=_(bd=>{"use strict";Object.defineProperty(bd,"__esModule",{value:!0});bd.isString=void 0;var DG=Ai(),$G=function(t,r){return typeof t!="string"?((0,DG.reportTypeGuardError)(r,t,"string"),!1):!0};bd.isString=$G});var _L=_(Pd=>{"use strict";Object.defineProperty(Pd,"__esModule",{value:!0});Pd.isUnknown=void 0;var HG=function(e){return!0};Pd.isUnknown=HG});var WL=_(wd=>{"use strict";Object.defineProperty(wd,"__esModule",{value:!0});wd.isFunction=void 0;var FG=O(),UG=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,FG.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};wd.isFunction=UG});var kL=_(vd=>{"use strict";Object.defineProperty(vd,"__esModule",{value:!0});vd.isFile=void 0;var LL=O(),BG=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,LL.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,LL.generateTypeGuardError)(e,t.identifier,"File")),!1)};vd.isFile=BG});var CL=_(_d=>{"use strict";Object.defineProperty(_d,"__esModule",{value:!0});_d.isFileList=void 0;var EL=O(),GG=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,EL.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,EL.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};_d.isFileList=GG});var TL=_(Wd=>{"use strict";Object.defineProperty(Wd,"__esModule",{value:!0});Wd.isBlob=void 0;var RL=O(),qG=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,RL.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,RL.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Wd.isBlob=qG});var IL=_(Ld=>{"use strict";Object.defineProperty(Ld,"__esModule",{value:!0});Ld.isFormData=void 0;var xL=O(),VG=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,xL.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,xL.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Ld.isFormData=VG});var ML=_(kd=>{"use strict";Object.defineProperty(kd,"__esModule",{value:!0});kd.isURL=void 0;var OL=O(),KG=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,OL.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,OL.generateTypeGuardError)(e,t.identifier,"URL")),!1)};kd.isURL=KG});var zL=_(Ed=>{"use strict";Object.defineProperty(Ed,"__esModule",{value:!0});Ed.isURLSearchParams=void 0;var NL=O(),JG=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,NL.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,NL.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Ed.isURLSearchParams=JG});var jL=_(Cd=>{"use strict";Object.defineProperty(Cd,"__esModule",{value:!0});Cd.isMap=void 0;var YG=O(),XG=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,YG.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Cd.isMap=XG});var DL=_(Rd=>{"use strict";Object.defineProperty(Rd,"__esModule",{value:!0});Rd.isSet=void 0;var ZG=O(),QG=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,ZG.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Rd.isSet=QG});var $L=_(Bf=>{"use strict";Object.defineProperty(Bf,"__esModule",{value:!0});Bf.isIndexSignature=t2;var e2=O();function t2(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,e2.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let m=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),h=t(m,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return S&&h})}}});var HL=_(Td=>{"use strict";Object.defineProperty(Td,"__esModule",{value:!0});Td.isError=void 0;var r2=Ai(),o2=function(t,r){return t instanceof Error?!0:((0,r2.reportTypeGuardError)(r,t,"Error"),!1)};Td.isError=o2});var qf=_(Gf=>{"use strict";Object.defineProperty(Gf,"__esModule",{value:!0});Gf.isArrayWithEachItem=i2;var n2=O(),s2=xt();function i2(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,n2.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,s2.attachTypeGuardMeta)(t,{itemGuard:e})}});var Vf=_(xd=>{"use strict";Object.defineProperty(xd,"__esModule",{value:!0});xd.isNonEmptyArray=void 0;var a2=O(),l2=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,a2.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};xd.isNonEmptyArray=l2});var FL=_(Kf=>{"use strict";Object.defineProperty(Kf,"__esModule",{value:!0});Kf.isNonEmptyArrayWithEachItem=u2;var c2=qf(),d2=Vf();function u2(e){return function(t,r){return(0,c2.isArrayWithEachItem)(e)(t,r)&&(0,d2.isNonEmptyArray)(t,r)}}});var BL=_(Jf=>{"use strict";Object.defineProperty(Jf,"__esModule",{value:!0});Jf.isTuple=p2;var UL=O();function p2(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,UL.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,UL.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var GL=_(Yf=>{"use strict";Object.defineProperty(Yf,"__esModule",{value:!0});Yf.isObjectWithEachItem=g2;var m2=O();function g2(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,m2.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var qL=_(Xf=>{"use strict";Object.defineProperty(Xf,"__esModule",{value:!0});Xf.isPartialOf=h2;var f2=xr();function h2(e){return function(t,r){if(!(0,f2.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var VL=_(Zf=>{"use strict";Object.defineProperty(Zf,"__esModule",{value:!0});Zf.isPick=S2;var y2=xr();function S2(e,...t){return function(r,o){if(!(0,y2.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var KL=_(Qf=>{"use strict";Object.defineProperty(Qf,"__esModule",{value:!0});Qf.isOmit=b2;var A2=xr();function b2(e,...t){return function(r,o){if(!(0,A2.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),m=p.indexOf(" ("),S=m>=0?p.slice(0,m):p;if(a.has(S))return!1;let h=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var JL=_(Id=>{"use strict";Object.defineProperty(Id,"__esModule",{value:!0});Id.isNonEmptyString=void 0;var P2=O(),w2=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,P2.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Id.isNonEmptyString=w2});var YL=_(Od=>{"use strict";Object.defineProperty(Od,"__esModule",{value:!0});Od.isNonNegativeNumber=void 0;var v2=O(),_2=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,v2.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Od.isNonNegativeNumber=_2});var XL=_(Md=>{"use strict";Object.defineProperty(Md,"__esModule",{value:!0});Md.isPositiveNumber=void 0;var W2=O(),L2=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,W2.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Md.isPositiveNumber=L2});var ZL=_(Nd=>{"use strict";Object.defineProperty(Nd,"__esModule",{value:!0});Nd.isNonPositiveNumber=void 0;var k2=O(),E2=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,k2.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Nd.isNonPositiveNumber=E2});var QL=_(zd=>{"use strict";Object.defineProperty(zd,"__esModule",{value:!0});zd.isNegativeNumber=void 0;var C2=O(),R2=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,C2.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};zd.isNegativeNumber=R2});var ek=_(jd=>{"use strict";Object.defineProperty(jd,"__esModule",{value:!0});jd.isInteger=void 0;var T2=O(),x2=Uf(),I2=function(e,t){return!(0,x2.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,T2.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};jd.isInteger=I2});var tk=_(Dd=>{"use strict";Object.defineProperty(Dd,"__esModule",{value:!0});Dd.isPositiveInteger=void 0;var O2=O(),M2=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,O2.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};Dd.isPositiveInteger=M2});var rk=_($d=>{"use strict";Object.defineProperty($d,"__esModule",{value:!0});$d.isNegativeInteger=void 0;var N2=O(),z2=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,N2.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};$d.isNegativeInteger=z2});var ok=_(Hd=>{"use strict";Object.defineProperty(Hd,"__esModule",{value:!0});Hd.isNonNegativeInteger=void 0;var j2=O(),D2=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,j2.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Hd.isNonNegativeInteger=D2});var nk=_(Fd=>{"use strict";Object.defineProperty(Fd,"__esModule",{value:!0});Fd.isNonPositiveInteger=void 0;var $2=O(),H2=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,$2.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Fd.isNonPositiveInteger=H2});var sk=_(Bd=>{"use strict";Object.defineProperty(Bd,"__esModule",{value:!0});Bd.isNumeric=void 0;var Ud=O(),F2=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Ud.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Ud.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Ud.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Ud.generateTypeGuardError)(e,t.identifier,"number key")),!1};Bd.isNumeric=F2});var ik=_(Gd=>{"use strict";Object.defineProperty(Gd,"__esModule",{value:!0});Gd.isBooleanLike=void 0;var eh=O(),U2=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,eh.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,eh.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Gd.isBooleanLike=U2});var ak=_(qd=>{"use strict";Object.defineProperty(qd,"__esModule",{value:!0});qd.isDateLike=void 0;var bi=O(),B2=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,bi.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,bi.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,bi.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,bi.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,bi.generateTypeGuardError)(e,t.identifier,"date-like")),!1};qd.isDateLike=B2});var lk=_(Vd=>{"use strict";Object.defineProperty(Vd,"__esModule",{value:!0});Vd.isBigInt=void 0;var G2=O(),q2=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,G2.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Vd.isBigInt=q2});var rh=_(th=>{"use strict";Object.defineProperty(th,"__esModule",{value:!0});th.isOneOf=V2;var ck=Rn();function V2(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,ck.stringify)(t)}) must be one of following values ${e.map(ck.stringify).join(" | ")}`),o}}});var dk=_(oh=>{"use strict";Object.defineProperty(oh,"__esModule",{value:!0});oh.isOneOfTypes=Y2;var K2=Rn(),J2=gi();function Y2(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,K2.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,J2.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var uk=_(nh=>{"use strict";Object.defineProperty(nh,"__esModule",{value:!0});nh.isIntersectionOf=X2;function X2(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var pk=_(sh=>{"use strict";Object.defineProperty(sh,"__esModule",{value:!0});sh.isExtensionOf=Z2;function Z2(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var mk=_(ih=>{"use strict";Object.defineProperty(ih,"__esModule",{value:!0});ih.isNullOr=e5;var Q2=xt();function e5(e){function t(r,o){return r===null?!0:e(r,o)}return(0,Q2.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var gk=_(ah=>{"use strict";Object.defineProperty(ah,"__esModule",{value:!0});ah.isUndefinedOr=r5;var t5=xt();function r5(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,t5.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var fk=_(lh=>{"use strict";Object.defineProperty(lh,"__esModule",{value:!0});lh.isNilOr=n5;var o5=xt();function n5(e){function t(r,o){return r==null?!0:e(r,o)}return(0,o5.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var hk=_(ch=>{"use strict";Object.defineProperty(ch,"__esModule",{value:!0});ch.isAsserted=s5;function s5(e){return!0}});var yk=_(dh=>{"use strict";Object.defineProperty(dh,"__esModule",{value:!0});dh.isEnum=a5;var i5=rh();function a5(e){return function(t,r){return(0,i5.isOneOf)(...Object.values(e))(t,r)}}});var Sk=_(uh=>{"use strict";Object.defineProperty(uh,"__esModule",{value:!0});uh.isEqualTo=d5;var l5=O(),c5=Rn();function d5(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,l5.generateTypeGuardError)(t,r.identifier,`equal to ${(0,c5.stringify)(e)}`)),!1):!0}}});var Ak=_(Kd=>{"use strict";Object.defineProperty(Kd,"__esModule",{value:!0});Kd.isRegex=void 0;var u5=O(),p5=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,u5.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Kd.isRegex=p5});var Pk=_(ph=>{"use strict";Object.defineProperty(ph,"__esModule",{value:!0});ph.isPattern=m5;var bk=O();function m5(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,bk.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,bk.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var wk=_(mh=>{"use strict";Object.defineProperty(mh,"__esModule",{value:!0});mh.by=g5;function g5(e){return function(t){return e(t,null)}}});var vk=_(gh=>{"use strict";Object.defineProperty(gh,"__esModule",{value:!0});gh.toNumber=f5;function f5(e){return typeof e=="number"?e:Number(e)}});var _k=_(fh=>{"use strict";Object.defineProperty(fh,"__esModule",{value:!0});fh.toDate=h5;function h5(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var Wk=_(hh=>{"use strict";Object.defineProperty(hh,"__esModule",{value:!0});hh.toBoolean=y5;function y5(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var Lk=_(Jd=>{"use strict";Object.defineProperty(Jd,"__esModule",{value:!0});Jd.isSymbol=void 0;var S5=O(),A5=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,S5.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Jd.isSymbol=A5});var Pi=_(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var b5=gd();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return b5.isType}});var yh=gL();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return yh.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return yh.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return yh.isNestedType}});var P5=fL();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return P5.isObjectWith}});var w5=hL();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return w5.isObject}});var v5=yL();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return v5.guardWithTolerance}});var _5=SL();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return _5.isBranded}});var W5=AL();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return W5.BrandSymbols}});var L5=bL();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return L5.isAny}});var k5=PL();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return k5.isBoolean}});var E5=wL();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return E5.isDate}});var C5=Of();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return C5.isDefined}});var R5=ud();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return R5.isNil}});var T5=Uf();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return T5.isNumber}});var x5=vL();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return x5.isString}});var I5=_L();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return I5.isUnknown}});var O5=WL();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return O5.isFunction}});var M5=kL();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return M5.isFile}});var N5=CL();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return N5.isFileList}});var z5=TL();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return z5.isBlob}});var j5=IL();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return j5.isFormData}});var D5=ML();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return D5.isURL}});var $5=zL();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return $5.isURLSearchParams}});var H5=jL();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return H5.isMap}});var F5=DL();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return F5.isSet}});var U5=$L();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return U5.isIndexSignature}});var B5=HL();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return B5.isError}});var G5=qf();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return G5.isArrayWithEachItem}});var q5=Vf();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return q5.isNonEmptyArray}});var V5=FL();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return V5.isNonEmptyArrayWithEachItem}});var K5=BL();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return K5.isTuple}});var J5=xr();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return J5.isNonNullObject}});var Y5=GL();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return Y5.isObjectWithEachItem}});var X5=qL();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return X5.isPartialOf}});var Z5=VL();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return Z5.isPick}});var Q5=KL();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return Q5.isOmit}});var eq=JL();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return eq.isNonEmptyString}});var tq=YL();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return tq.isNonNegativeNumber}});var rq=XL();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return rq.isPositiveNumber}});var oq=ZL();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return oq.isNonPositiveNumber}});var nq=QL();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return nq.isNegativeNumber}});var sq=ek();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return sq.isInteger}});var iq=tk();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return iq.isPositiveInteger}});var aq=rk();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return aq.isNegativeInteger}});var lq=ok();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return lq.isNonNegativeInteger}});var cq=nk();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return cq.isNonPositiveInteger}});var dq=sk();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return dq.isNumeric}});var uq=ik();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return uq.isBooleanLike}});var pq=ak();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return pq.isDateLike}});var mq=lk();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return mq.isBigInt}});var gq=rh();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return gq.isOneOf}});var fq=dk();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return fq.isOneOfTypes}});var hq=uk();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return hq.isIntersectionOf}});var yq=pk();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return yq.isExtensionOf}});var Sq=mk();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return Sq.isNullOr}});var Aq=gk();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return Aq.isUndefinedOr}});var bq=fk();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return bq.isNilOr}});var Pq=hk();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return Pq.isAsserted}});var wq=yk();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return wq.isEnum}});var vq=Sk();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return vq.isEqualTo}});var _q=Ak();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return _q.isRegex}});var Wq=Pk();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return Wq.isPattern}});var Lq=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return Lq.generateTypeGuardError}});var kq=wk();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return kq.by}});var Eq=vk();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return Eq.toNumber}});var Cq=_k();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return Cq.toDate}});var Rq=Wk();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return Rq.toBoolean}});var Tq=Lk();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return Tq.isSymbol}})});var In,kk,xq,Ek,Ck=l(()=>{"use strict";In=g(require("node:path")),kk=require("node:url"),xq=()=>!0,Ek=()=>{if(xq()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?In.default.dirname(In.default.resolve(e)):In.default.dirname(In.default.resolve(__filename))}return In.default.dirname((0,kk.fileURLToPath)(__agentWitchImportMetaUrl))}});var Sh,Rk,z,Tk,Iq,Ir,k,Yd,er,xk,Xd,On,Zd,Pe,ut,Ah,pt,bh,N,Ph=l(()=>{"use strict";Sh=g(require("node:fs")),Rk=g(require("node:os")),z=g(require("node:path")),Tk=g(Pi());He();Ck();Kc();Kc();Iq=Ek(),Ir=e=>e.trim().toLowerCase(),k=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return z.default.resolve(e);let t=z.default.resolve(Iq),r=z.default.basename(t),o=z.default.basename(z.default.dirname(t));return r===Rf&&(o===Tt||o===Zt)?z.default.dirname(t):r===Tt||r===Zt?t:z.default.join(Rk.default.homedir(),Tt)},Yd=(e=k())=>z.default.join(e,Rf),er=(e=k())=>z.default.join(Yd(e),VW),xk=(e,t,r)=>t!==null?z.default.join(e,Qt,t,r):z.default.join(e,r),Xd=e=>xk(e.installDir,e.profileEmail,ui),On=e=>xk(e.installDir,e.profileEmail,dt),Zd=e=>e.profileEmail!==null?z.default.join(e.installDir,Qt,e.profileEmail,Tr):z.default.join(e.installDir,Tr),Pe=(e=k())=>pi(e),ut=(e=k())=>uo(e)?Uc:Fc,Ah=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Ir(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Ir(t):null},pt=(e=k())=>{let t=z.default.join(e,Cf);if(!Sh.default.existsSync(t))return null;try{let r=JSON.parse(Sh.default.readFileSync(t,"utf8"));if((0,Tk.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Ir(r.email)}catch{return null}return null},bh=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Ir(r):null}let t=Ah();return t!==null?t:pt()},N=e=>{let t=k(),r=Yd(t),o=er(t),n=bh(e);if(n!==null){let S=z.default.join(t,Qt,n),h=z.default.join(S,Bc),y=z.default.join(S,ui),u=z.default.join(S,dt),A=z.default.join(S,Vc),b=z.default.join(S,Tr),f=z.default.join(S,dt,En),w=z.default.join(S,dt,Cn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:u,mainLogPath:f,errorLogPath:w,reportsDir:A,deviceKeypairPath:b,configPath:z.default.join(S,"config.json"),harnessRootDir:h,harnessManifestPath:z.default.join(h,qc),harnessSetsDir:z.default.join(h,Gc)}}let s=z.default.join(t,Bc),i=z.default.join(t,ui),a=z.default.join(t,dt),c=z.default.join(t,Vc),d=z.default.join(t,Tr),p=z.default.join(t,dt,En),m=z.default.join(t,dt,Cn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:m,reportsDir:c,deviceKeypairPath:d,configPath:z.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:z.default.join(s,qc),harnessSetsDir:z.default.join(s,Gc)}}});var wh,Ik,Oq,Mq,Ok,vh,Mk=l(()=>{"use strict";wh=g(require("node:fs")),Ik=g(require("node:path"));He();Ph();Oq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Mq=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Ok=e=>{let t=Ik.default.join(e,co.wakePort);if(!wh.default.existsSync(t))return null;try{let r=JSON.parse(wh.default.readFileSync(t,"utf8"));if(Oq(r)&&Mq(r.wakePort))return r.wakePort}catch{return null}return null},vh=(e=k())=>Ok(e)??ut(e)});var K=l(()=>{"use strict";Ph();Mk()});var _h,Wh,Qd=l(()=>{"use strict";_h=new Set(["","loginwindow","_mbsetupuser","root"]),Wh=5e3});var Nk,$q,zk,Lh,kh=l(()=>{"use strict";Nk=require("node:child_process");Qd();$q=e=>e.trim().toLowerCase(),zk=e=>e==null?!1:!_h.has($q(e)),Lh=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Nk.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return zk(t)?t:null}catch{return null}}});var Dk,jk,mt,wi=l(()=>{"use strict";Dk=g(require("node:os"));kh();jk=e=>e.trim().toLowerCase(),mt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?Lh():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??Dk.default.userInfo().username;return jk(r)===jk(o)}});var $k,Hk,fo,Fk=l(()=>{"use strict";$k=require("node:child_process"),Hk=g(require("node:fs"));K();wi();fo=(e=k())=>{let t=er(e);if(!Hk.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!mt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=pt(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,$k.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var Uk,vi,eu=l(()=>{"use strict";Uk=require("node:child_process"),vi=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,Uk.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var tu,Eh,Bk,ee,ru,_i=l(()=>{"use strict";tu=g(require("node:fs")),Eh=g(require("node:path"));K();He();Bk=e=>{let t=Eh.default.join(e,Qt);return tu.default.existsSync(t)?tu.default.readdirSync(t).filter(r=>tu.default.statSync(Eh.default.join(t,r)).isDirectory()).map(r=>Ir(r)).toSorted():[]},ee=(e=k())=>{let t=Pe(e);return[{profileEmail:Bk(e)[0]??null,launchAgentLabel:t}]},ru=(e=k())=>Bk(e)});var Ch,Gk,qk,Hq,tr,ou=l(()=>{"use strict";Ch=g(require("node:fs")),Gk=g(require("node:os")),qk=g(require("node:path"));K();_i();Hq=()=>qk.default.join(Gk.default.homedir(),"Library","LaunchAgents"),tr=(e=k())=>{let t=Pe(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ee(e))r.add(n.launchAgentLabel);let o=Hq();if(Ch.default.existsSync(o))for(let n of Ch.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var Vk,Wi,Kk=l(()=>{"use strict";K();eu();ou();_i();Vk=(e=k())=>{let t=new Set(ee(e).map(r=>r.launchAgentLabel));return tr(e).filter(r=>!t.has(r))},Wi=(e=k())=>{for(let t of Vk(e))vi(t)}});var Li,Rh=l(()=>{"use strict";K();eu();ou();Li=(e=k())=>{for(let t of tr(e))vi(t)}});var Jk,Yk,Fq,ho,Xk=l(()=>{"use strict";Jk=require("node:child_process"),Yk=require("node:util"),Fq=(0,Yk.promisify)(Jk.execFile),ho=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await Fq("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var yo,Uq,Th,xh=l(()=>{"use strict";yo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Uq=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,Th=e=>{let t=e.pathValue??Uq(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${yo(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${yo(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${yo(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${yo(e.homeDir)}</string>
    <key>PATH</key>
    <string>${yo(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${yo(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${yo(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var nu,Ih=l(()=>{"use strict";nu=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var So,Oh,ki,Bq,Gq,qq,Zk,rr,Mh=l(()=>{"use strict";So=g(require("node:fs")),Oh=g(require("node:os")),ki=g(require("node:path"));He();K();xh();Ih();Bq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Gq=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,qq=e=>{let t=ki.default.join(e,co.wakePort);if(!So.default.existsSync(t))return ut(e);try{let r=JSON.parse(So.default.readFileSync(t,"utf8"));if(Bq(r)&&Gq(r.wakePort))return r.wakePort}catch{return ut(e)}return ut(e)},Zk=(e,t=Oh.default.homedir())=>ki.default.join(t,"Library","LaunchAgents",`${e}.plist`),rr=e=>{let t=e.installDir??k(),r=e.homeDir??Oh.default.homedir(),o=Zk(e.launchAgentLabel,r),n=So.default.existsSync(o)?So.default.readFileSync(o,"utf8"):null;if(n!==null&&nu(n))return{ok:!0,rewritten:!1,plistPath:o};let s=Th({launchAgentLabel:e.launchAgentLabel,runPath:ki.default.join(t,qW,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??qq(t)});if(!nu(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{So.default.mkdirSync(ki.default.dirname(o),{recursive:!0}),So.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var eE,tE,rE,Ei,Vq,Kq,Qk,Ce,Nh=l(()=>{"use strict";eE=require("node:child_process"),tE=g(require("node:fs")),rE=require("node:util");K();Mh();wi();Ei=(0,rE.promisify)(eE.execFile),Vq=async e=>{try{return await Ei("launchctl",["print",e]),!0}catch{return!1}},Kq=async(e,t,r)=>{await Vq(t)&&await Ei("launchctl",["bootout",t]).catch(()=>{}),await Ei("launchctl",["bootstrap",e,r]),await Ei("launchctl",["enable",t])},Qk=async e=>{try{return await Ei("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Ce=async(e,t=k())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!mt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=rr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await Qk(n))return{ok:!0};let i=s.plistPath;if(!tE.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await Kq(o,n,i),await Qk(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Ao,oE=l(()=>{"use strict";K();Nh();_i();Ao=async(e=k())=>{let t=[];for(let r of ee(e))(await Ce(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var Ve,or,nE=l(()=>{"use strict";Rh();wi();Qd();Ve=e=>{mt()||(Li(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},or=(e,t=Wh)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{mt()||e()},t);return()=>{clearInterval(r)}}});var te=l(()=>{"use strict";QW();Fk();eu();Kk();Rh();ou();wi();Xk();oE();Nh();Mh();Ih();xh();_i();kh();Qd();nE()});var zh=l(()=>{"use strict";te()});var sE,iE,su,aE,Mn,lE,cE,bo=l(()=>{"use strict";sE=".agent-witch",iE="memory",su="project.json",aE="chunks.ndjson",Mn="runs.ndjson",lE="reports",cE=".json"});var dE=l(()=>{"use strict";bo()});var uE,iu,jh=l(()=>{"use strict";uE=g(require("node:path"));dE();iu=(e,t)=>uE.default.join(e.trim(),`${t.trim()}${cE}`)});var Ci,pE,mE=l(()=>{"use strict";Ci="agent-witch.js",pE="command"});var au=l(()=>{"use strict";mE()});var Po,gE,fE=l(()=>{"use strict";au();Po=e=>`'${e.replace(/'/g,"'\\''")}'`,gE=e=>{let t=`${e.installDir.trim()}/${"app"}/${Ci}`,r=[Po("node"),Po(t),"report","write","--key",Po(e.reportKey.trim()),"--agent-run-id",Po(e.agentRunId.trim()),"--status",Po(e.status),"--summary",Po(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Po(e.details.trim())),r.join(" ")}});var It,hE,Jq,Dh,lu=l(()=>{"use strict";jh();fE();It={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},hE=e=>e===It.COMPLETED||e===It.FAILED,Jq=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Dh=(e,t)=>{let r=iu(t.reportsDir,t.reportKey),o=gE({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:It.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${Jq({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Re=l(()=>{"use strict";He();K()});var Ti,SE,yE,AE,Yq,Nn,Xq,bE,xi,Ii,$h,PE,wE,Oi=l(()=>{"use strict";Ti=g(require("node:fs")),SE=g(require("node:path"));lu();jh();Re();yE=50,AE=e=>{let t=N(),r=iu(t.reportsDir,e);return Ti.default.mkdirSync(SE.default.dirname(r),{recursive:!0}),r},Yq=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Nn=e=>{let t=AE(e);if(!Ti.default.existsSync(t))return null;try{let r=JSON.parse(Ti.default.readFileSync(t,"utf8"));return Yq(r)?r:null}catch{return null}},Xq=(e,t)=>{let r=[...e,t];return r.length>yE?r.slice(r.length-yE):r},bE=e=>{let t=AE(e.reportKey);Ti.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},xi=e=>{let t=Nn(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:Xq(t?.history??[],o)};return bE(n),n},Ii=e=>{let t=Nn(e.reportKey);return t!==null?t:xi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:It.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},$h=(e,t)=>{let r=t.trim();if(r.length===0)return Nn(e);let o=Nn(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return bE(s),s},PE=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},wE=e=>{if(e===null||!hE(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===It.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var Zq,Qq,Mi,vE,cu,Hh=l(()=>{"use strict";lu();Oi();Zq=new Set(Object.values(It)),Qq=e=>Zq.has(e),Mi=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},vE=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},cu=e=>{if(e[0]!=="write")return vE(),1;let r=Mi(e,"--key"),o=Mi(e,"--agent-run-id"),n=Mi(e,"--status"),s=Mi(e,"--summary"),i=Mi(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!Qq(n)?(vE(),1):(xi({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var Ke,wo=l(()=>{"use strict";Ke=()=>!0});var Fh,_E,vo,du=l(()=>{"use strict";Fh=g(require("node:path")),_E=require("node:url");wo();vo=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Fh.default.resolve(t);return Ke()?r===Fh.default.resolve(__filename):e===void 0?!1:r===(0,_E.fileURLToPath)(e)}});var uu,zn,rV,Xee,jn=l(()=>{"use strict";uu="agent-witch.js",zn="deps.tar.gz",rV="install.sh",Xee={mainScript:`app/${uu}`,depsArchive:`app/${zn}`,installShell:rV}});var EE=l(()=>{"use strict";jn()});var CE=l(()=>{"use strict";jn();EE()});var Ni,Bh,pu,oV,zi,Te,$n,ji,Di,_o,Gh=l(()=>{"use strict";Ni=g(require("node:fs")),Bh=g(require("node:path"));CE();K();pu="install-version.json",oV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zi=(e=k())=>Bh.default.join(e,pu),Te=(e=k())=>{let t=zi(e);if(!Ni.default.existsSync(t))return null;try{let r=JSON.parse(Ni.default.readFileSync(t,"utf8"));return!oV(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},$n=(e,t=k())=>{let r=zi(t);Ni.default.mkdirSync(Bh.default.dirname(r),{recursive:!0}),Ni.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},ji=(e=k())=>Te(e)?.bundleVersion??"243",Di=(e,t)=>{let r=Te(e);if(r!==null)return r;let o={bundleVersion:"243",appOrigin:t,updatedAt:new Date().toISOString()};return $n(o,e),o},_o=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var RE,Wo,qh,Vh,Kh,mu,Ot,Lo,Jh=l(()=>{"use strict";RE=require("node:crypto"),Wo=g(require("node:fs")),qh=g(require("node:path"));K();Vh="self-update-log.ndjson",Kh=100,mu=(e=k())=>{let t=N(),r=t.installDir===e?t.logsDir:On({installDir:e,profileEmail:t.profileEmail});return qh.default.join(r,Vh)},Ot=(e,t=k())=>{let r={id:(0,RE.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=mu(t);Wo.default.mkdirSync(qh.default.dirname(o),{recursive:!0});let n=Wo.default.existsSync(o)?Wo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Kh+1)),JSON.stringify(r)];return Wo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Lo=(e=20,t=k())=>{let r=mu(t);if(!Wo.default.existsSync(r))return[];let o=Wo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var Yh,gte,Xh=l(()=>{"use strict";jn();Yh="deps",gte=`${"app"}/${zn}`});var TE=l(()=>{"use strict";Xh()});var xE,Or,ko,IE,Zh,Qh,OE=l(()=>{"use strict";xE=require("node:child_process"),Or=g(require("node:fs")),ko=g(require("node:path"));jn();Xh();IE=e=>ko.default.join(e,"app",Yh),Zh=e=>{let t=ko.default.join(e,"app"),r=ko.default.join(t,zn);Or.default.existsSync(r)&&(Or.default.rmSync(IE(e),{recursive:!0,force:!0}),Or.default.mkdirSync(t,{recursive:!0}),(0,xE.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Or.default.rmSync(r,{force:!0}))},Qh=e=>{Or.default.rmSync(ko.default.join(e,"node_modules"),{recursive:!0,force:!0}),Or.default.rmSync(ko.default.join(e,"package.json"),{force:!0}),Or.default.rmSync(ko.default.join(e,"package-lock.json"),{force:!0})}});var ME=l(()=>{"use strict";TE();OE()});var gt,gu,NE=l(()=>{"use strict";gt="https://www.agentwitch.com",gu="wss://www.agentwitch.com/api/agent-witch/ws"});var $i,nr,zE=l(()=>{"use strict";$i="127.0.0.1",nr=`http://${$i}:43347`});var Mt=l(()=>{"use strict";NE();zE()});var Hi,fu,jE,ty,nV,DE,ny,$E,ft,Fi,Ui,sy,ry,oy,Bi,iy,ay,ly,Hn=l(()=>{"use strict";Hi=g(require("node:fs")),fu=g(require("node:path")),jE="active-writer-work.json",ty=new Set,nV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),DE=e=>e.profileEmail===null?fu.default.join(e.installDir,jE):fu.default.join(e.installDir,"profiles",e.profileEmail,jE),ny=e=>{let t=DE(e);if(!Hi.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Hi.default.readFileSync(t,"utf8"));return!nV(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},$E=(e,t)=>{let r=DE(e);Hi.default.mkdirSync(fu.default.dirname(r),{recursive:!0}),Hi.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},ft=e=>ny(e).activeCount>0,Fi=e=>{let t=ny(e);$E(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},Ui=e=>{let t=ny(e),r=Math.max(0,t.activeCount-1);if($E(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of ty)o()},sy=e=>(ty.add(e),()=>{ty.delete(e)}),ry=null,oy=null,Bi=e=>{ry=e},iy=e=>{oy=e},ay=()=>{let e=ry;return ry=null,e},ly=()=>{let e=oy;return oy=null,e}});var we,hu=l(()=>{"use strict";we=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Fn,yu,Gi,cy=l(()=>{"use strict";Fn="qwen2.5:7b",yu="nomic-embed-text",Gi="Install Ollama from https://ollama.com/download"});var qi,dy,Su=l(()=>{"use strict";cy();qi=()=>`
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
    echo "Ollama is missing. ${Gi}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Gi}" >&2
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
  agent_witch_ensure_ollama_model "${Fn}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${yu}" "\${pull_log}"
}
`,dy=()=>`
${qi()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var HE,sV,Au,uy=l(()=>{"use strict";HE=require("node:child_process");K();Su();sV=e=>new Promise(t=>{let r=(0,HE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:k()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Au=async(e=sV)=>{let t=`${qi()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var Mr,bu,FE,iV,UE,Bn,aV,lV,cV,Un,Eo,Co,BE=l(()=>{"use strict";Mr=g(require("node:fs")),bu=g(require("node:path"));ME();te();K();jn();Mt();Gh();Hn();hu();Jh();uy();FE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),iV=e=>{let t=pt(e),r=t===null?N():N(t);if(!Mr.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Mr.default.readFileSync(r.configPath,"utf8"));return!FE(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},UE=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!FE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},Bn=async e=>(await UE(e))?.bundleVersion??null,aV=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=bu.default.join(t,r);Mr.default.mkdirSync(bu.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());Mr.default.writeFileSync(n,s),r.endsWith(".js")&&Mr.default.chmodSync(n,493)},lV=async()=>{Wi(),await Ao()},cV=(e,t)=>e!==null?we(e):t??gt,Un=(e,t)=>({localBundleVersion:t,...e}),Eo=async e=>{let t=k(),r=Te(t),o=r?.bundleVersion??null,n=await Au();Ot({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=iV(t),i=cV(s,r?.appOrigin);if(i===null){let d=Un({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return Ot({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await UE(i);if(a===null){let d=Un({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return Ot({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||_o(o,a.bundleVersion))){let d=Un({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Ot({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await aV(i,t,S);let d=bu.default.join(t,uu);Mr.default.existsSync(d)&&Mr.default.rmSync(d,{force:!0}),Zh(t),Qh(t),$n({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=N(pt(t));if(ft(p)){let S=Un({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Ot({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await lV();let m=Un({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Ot({event:"update_applied",ok:!0,message:m.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",m=Un({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return Ot({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},Co=()=>{let e=k();return{local:Te(e),logs:Lo(20,e)}}});var GE={};Rt(GE,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>pu,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Gi,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>yu,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>Fn,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Vh,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Kh,appendAgentWitchSelfUpdateLog:()=>Ot,buildAgentWitchEnsureOllamaShell:()=>qi,buildAgentWitchInstallScriptOllama:()=>dy,buildAgentWitchSelfUpdateStatus:()=>Co,ensureAgentWitchInstallVersionRecorded:()=>Di,ensureAgentWitchOllamaInstalled:()=>Au,fetchAgentWitchRemoteInstallBundleVersion:()=>Bn,isRemoteAgentWitchBundleVersionNewer:()=>_o,readAgentWitchInstallVersion:()=>Te,readAgentWitchSelfUpdateLogs:()=>Lo,resolveAgentWitchAppOriginFromWsUrl:()=>we,resolveAgentWitchHeartbeatInstallBundleVersion:()=>ji,resolveAgentWitchInstallVersionPath:()=>zi,resolveAgentWitchSelfUpdateLogPath:()=>mu,runAgentWitchSelfUpdate:()=>Eo,writeAgentWitchInstallVersion:()=>$n});var Nt=l(()=>{"use strict";Gh();Jh();BE();hu();cy();Su();uy()});var py={};Rt(py,{buildAgentWitchSelfUpdateStatus:()=>Co,fetchAgentWitchRemoteInstallBundleVersion:()=>Bn,runAgentWitchSelfUpdate:()=>Eo});var my=l(()=>{"use strict";Nt()});function Gn(e){return(0,qE.createHash)("sha256").update(e.trim()).digest("hex")}var qE,gy=l(()=>{"use strict";qE=require("node:crypto")});var qn,Vi,dV,VE,fy,KE=l(()=>{"use strict";qn=g(require("node:fs")),Vi=g(require("node:path"));gy();Re();dV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),VE=e=>{if(!qn.default.existsSync(e))return null;try{let t=JSON.parse(qn.default.readFileSync(e,"utf8"));return!dV(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Gn(t.pairingToken.trim())}catch{return null}},fy=(e=k())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(VE(Vi.default.join(e,"config.json")));let n=Vi.default.join(e,Qt);if(!qn.default.existsSync(n))return t;for(let s of qn.default.readdirSync(n)){let i=Vi.default.join(n,s);qn.default.statSync(i).isDirectory()&&o(VE(Vi.default.join(i,"config.json")))}return t}});var hy,JE,Pu,Ki,Ji,uV,pV,mV,YE,ce,de,wu,zt,ht=l(()=>{"use strict";hy=g(require("node:fs")),JE=g(require("node:os")),Pu=g(require("node:path")),Ki={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Ji=e=>e.trim().length>0,uV=e=>{let t=Pu.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},pV=()=>{let e=JE.default.homedir(),t=Pu.default.join(e,".local","bin","agent");if(hy.default.existsSync(t))return t;let r=Pu.default.join(e,".local","bin","cursor-agent");return hy.default.existsSync(r)?r:Ki.cursorCommand},mV=e=>{let t=e.trim();return!Ji(t)||t===Ki.cursorCommand?pV():t},YE=(e,t)=>uV(e)?t:["agent",...t],ce=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",de=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Ji(t)?t.trim():Ki.claudeCommand,codexCommand:Ji(r)?r.trim():Ki.codexCommand,cursorCommand:mV(o),antigravityCommand:Ji(n)?n.trim():Ki.antigravityCommand}},wu=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:YE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},zt=(e,t,r,o)=>{let n=t.trim();if(!Ji(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:YE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var Nr,gV,Ro,fV,Vn,Yi=l(()=>{"use strict";Nr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,gV=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:Nr(s.inputTokens)+Nr(s.outputTokens)+Nr(s.cacheReadInputTokens)+Nr(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Ro=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=Nr(a.input_tokens)+Nr(a.cache_creation_input_tokens)+Nr(a.cache_read_input_tokens),d=Nr(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:gV(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},fV=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),Vn=(e,t)=>{let r=Ro(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??fV(r)}}});var yy,hV,yV,Sy,Ay=l(()=>{"use strict";yy=e=>e.toLocaleString("en-US"),hV=e=>e<.01?e.toFixed(4):e.toFixed(3),yV=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${hV(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${yy(e.inputTokens)} in / ${yy(e.outputTokens)} out (${yy(e.totalTokens)} total)`,t].join(`
`)},Sy=(e,t)=>{if(t===void 0)return e;let r=yV(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var vu,by=l(()=>{"use strict";vu={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var To,Py,_u,wy=l(()=>{"use strict";by();To="auto",Py=e=>({value:To,label:`Auto (${vu[e]})`}),_u={anthropic:[Py("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[Py("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[Py("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Kn,Xi,Wu,Jn=l(()=>{"use strict";by();wy();Kn=e=>{let t=e?.trim()??"";if(!(t.length===0||t===To))return t},Xi=(e,t)=>{let r=Kn(t);return r===void 0?vu[e]:r},Wu=e=>{let t=Kn(e);return t===void 0?To:t}});var Lu,SV,AV,ku,XE=l(()=>{"use strict";Lu={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},SV=e=>{let t=Lu[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Lu["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Lu["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Lu["gemini-2.0-flash"]:null},AV=(e,t,r)=>{let o=SV(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},ku=e=>{let t=AV(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Yn,bV,PV,wV,Eu,ZE=l(()=>{"use strict";XE();Yn=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),bV=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Yn(r.input_tokens),n=Yn(r.output_tokens);return o===0&&n===0?null:ku({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},PV=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Yn(r.prompt_tokens),n=Yn(r.completion_tokens);return o===0&&n===0?null:ku({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},wV=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=Yn(r.promptTokenCount),n=Yn(r.candidatesTokenCount);return o===0&&n===0?null:ku({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Eu=(e,t,r)=>e==="anthropic"?bV(t,r):e==="openai"?PV(t,r):wV(t,r)});var vV,vy,_V,WV,LV,kV,EV,_y,Wy=l(()=>{"use strict";Jn();ZE();vV=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},vy=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Xi(e,t.model)},_V=async e=>{let t=vy("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=vV(o);n.length>0&&e.onChunk?.(n);let s=Eu("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},WV=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},LV=async e=>{let t=vy("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=WV(o);n.length>0&&e.onChunk?.(n);let s=Eu("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},kV=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},EV=async e=>{let t=vy("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=kV(n);s.length>0&&e.onChunk?.(s);let i=Eu("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},_y=async e=>{try{return e.provider==="anthropic"?await _V(e):e.provider==="openai"?await LV(e):await EV(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Je,Zi=l(()=>{"use strict";Je=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var QE,CV,Cu,Ly=l(()=>{"use strict";QE=g(require("node:path")),CV="writer-api-secrets.json",Cu=e=>QE.default.join(e,CV)});var ky,eC,RV,zr,Fe,jr=l(()=>{"use strict";ky=g(require("node:fs"));Jn();Ly();eC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),RV=e=>{if(!eC(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Kn(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},zr=e=>{let t=Cu(e);if(!ky.default.existsSync(t))return{};try{let r=JSON.parse(ky.default.readFileSync(t,"utf8"));if(!eC(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=RV(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Fe=(e,t)=>zr(e)[t]??null});var xe,Qi=l(()=>{"use strict";xe=e=>e==="api"?"api":"cli"});var tC,ve,xo,sr=l(()=>{"use strict";tC=g(require("node:path"));Zi();jr();Qi();ve=e=>tC.default.dirname(e),xo=(e,t)=>{if(xe(e.writerExecutionBackend)!=="api")return!1;let r=Je(t);if(r===null)return!1;let o=ve(e.layout.configPath),n=Fe(o,r);return n!==null&&n.apiKey.length>0}});var ea,Ey=l(()=>{"use strict";Ay();Wy();Zi();jr();sr();ea=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Je(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=ve(e.layout.configPath),a=Fe(i,s);if(a===null){let d=Object.keys(zr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await _y({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:Sy(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var rC,Xn,Cy=l(()=>{"use strict";rC=require("node:child_process");ht();Yi();Ey();sr();Xn=(e,t,r)=>new Promise(o=>{if(!ce(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(xo(e,t)){ea(e,t,r).then(o);return}let n=zt(t,r,de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,rC.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=Vn(i.join("")),p=a.join("").trim(),m=[d.output.trim(),p].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var oC=l(()=>{"use strict"});var nC=l(()=>{"use strict";Ay();Cy();Wy();oC();jr();sr()});var sC,iC,aC,lC=l(()=>{"use strict";sC="claude",iC="codex",aC="cursor"});var cC,TV,Ry,ta,Ru=l(()=>{"use strict";cC=g(require("node:path"));Mt();He();TV="ws://localhost:3000/api/agent-witch/ws",Ry=e=>e.replace(/\/$/,""),ta=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Ry(t);let r=cC.default.basename(e.installDir);if(r===di.production)return gu;let o=e.configWsUrl?.trim()??"";return r===di.localhost?o.length>0?Ry(o):TV:o.length>0?Ry(o):gu}});var IV,Ty,xy=l(()=>{"use strict";lC();Ru();Qi();IV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ty=e=>{if(!IV(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=ta({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??sC,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??iC,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??aC,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:xe(t.writerExecutionBackend),layout:e.layout}}}});var Iy,Oy,My=l(()=>{"use strict";Iy=g(require("node:fs"));K();xy();Oy=e=>{let t=N(e);if(!Iy.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Iy.default.readFileSync(t.configPath,"utf8")),o=Ty({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var ra,dC=l(()=>{"use strict";ra=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var Ny,OV,zy,uC=l(()=>{"use strict";Ny=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),OV=e=>{if(!Ny(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!Ny(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(m=>{if(!Ny(m))return[];let S=typeof m.itemKey=="string"?m.itemKey.trim():"",h=typeof m.relativePath=="string"?m.relativePath:"",y=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},zy=OV});var pC,MV,Tu,jy=l(()=>{"use strict";pC=g(require("node:path")),MV=(e,t)=>{let r=t.trim();return pC.default.join(e,"components","store",r.slice(0,2),r)},Tu=MV});var mC,NV,Dy,gC=l(()=>{"use strict";mC=g(require("node:fs"));jy();NV=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Tu(e.installDir,n.contentSha256);mC.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},Dy=NV});var oa,Zn,zV,$y,jV,Hy,Fy=l(()=>{"use strict";oa=g(require("node:fs")),Zn=g(require("node:path"));jy();zV=(e,t)=>Zn.default.join(e.installDir,"runs",t,"overlay"),$y=(e,t)=>Zn.default.join(zV(e,t),".cursor"),jV=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=$y(e,t);oa.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Tu(e.installDir,i.contentSha256);if(!oa.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Zn.default.join(n,c):Zn.default.join(n,i.itemKey);oa.default.mkdirSync(Zn.default.dirname(d),{recursive:!0}),oa.default.copyFileSync(a,d)}return{ok:!0}},Hy=jV});var Uy,fC,DV,na,hC=l(()=>{"use strict";Uy=g(require("node:fs")),fC=g(require("node:path")),DV=(e,t)=>{let r=fC.default.join(e.installDir,"runs",t);Uy.default.existsSync(r)&&Uy.default.rmSync(r,{recursive:!0,force:!0})},na=DV});var $V,By,yC=l(()=>{"use strict";Fy();$V=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=$y(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},By=$V});var Gy,HV,FV,UV,BV,GV,$,SC=l(()=>{"use strict";Gy=g(require("node:fs"));Ru();K();Qi();HV="claude",FV="codex",UV="cursor",BV="agy",GV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=N();if(!Gy.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Gy.default.readFileSync(e.configPath,"utf8"));if(!GV(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=ta({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:xe(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:HV,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:FV,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:UV,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:BV,pairingToken:s,layout:e}}catch{return null}}});var xu,AC,bC=l(()=>{"use strict";xu=g(require("node:fs"));Ly();AC=(e,t)=>{let r=Cu(e);xu.default.mkdirSync(e,{recursive:!0}),xu.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{xu.default.chmodSync(r,384)}catch{}}});var sa,PC,Iu=l(()=>{"use strict";sa=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},PC=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===sa(t)}});var ia,qV,qy,Vy,wC=l(()=>{"use strict";ia=g(require("node:fs"));jr();bC();Iu();Jn();sr();qV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qy=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=PC(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Kn(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},Vy=e=>{let t=ve(e.configPath),r={};if(ia.default.existsSync(e.configPath))try{let n=JSON.parse(ia.default.readFileSync(e.configPath,"utf8"));qV(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,ia.default.mkdirSync(t,{recursive:!0}),ia.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=qy(qy(qy(zr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);AC(t,o)}});var Ou,Ky=l(()=>{"use strict";Ou={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var Jy,vC=l(()=>{"use strict";Zi();jr();sr();sr();Jy=(e,t)=>{if(xo(e,t))return!1;let r=Je(t);if(r===null)return!1;let o=ve(e.layout.configPath),n=Fe(o,r);return n===null||n.apiKey.trim().length===0}});var _C,Yy,Xy=l(()=>{"use strict";_C=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},Yy=async e=>{let t=_C(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=_C(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var VV,Zy,WC=l(()=>{"use strict";te();My();Xy();VV=1e4,Zy=()=>Yy({listProfileEmails:ru,readConfig:Oy,pollIntervalMs:VV,logWaiting:e=>{console.error(e)}})});var ue=l(()=>{"use strict";Cy();nC();My();Ru();dC();uC();gC();Fy();hC();yC();Qi();SC();wC();jr();sr();Iu();Jn();Ky();Ey();sr();vC();Zi();jr();WC();xy();Xy()});var Mu,LC,KV,JV,kC,Nu,aa,zu,la=l(()=>{"use strict";Mu=g(require("node:fs")),LC=g(require("node:path")),KV="wake-port.json",JV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kC=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Nu=e=>LC.default.join(e,KV),aa=e=>{let t=Nu(e);if(!Mu.default.existsSync(t))return null;try{let r=JSON.parse(Mu.default.readFileSync(t,"utf8"));if(JV(r)&&kC(r.wakePort))return r.wakePort}catch{return null}return null},zu=(e,t)=>{if(!kC(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Nu(e);Mu.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Ene,Cne,Rne,yt,EC,ca=l(()=>{"use strict";la();Re();la();Ene=ut(),Cne=`${Pe()}-wake`,Rne=Pe(),yt=()=>{let e=k(),t=aa(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return ut()},EC=e=>{let t=k();aa(t)===null&&zu(t,e)}});var CC=l(()=>{"use strict";gy();te();KE();ue();ca()});var Qy,da,ua,RC=l(()=>{"use strict";Qy=g(require("node:os"));CC();da=()=>{let e=ee();return{ok:!0,port:yt(),hostname:Qy.default.hostname(),profileCount:e.length}},ua=()=>{let e=ee(),t=$()?.pairingToken.trim()??"",r=t.length>0?Gn(t):null,o=fy();return{hostname:Qy.default.hostname(),port:yt(),tokenHash:r,tokenHashes:o.length>0?o:r!==null?[r]:[],profiles:e.map(n=>({email:n.profileEmail,launchAgentLabel:n.launchAgentLabel}))}}});var eS=l(()=>{"use strict";RC()});var TC,xC,IC,ju,Qn=l(()=>{"use strict";TC="materialization.json",xC="backups",IC=".gitignore",ju=e=>`harness-set:${e.trim()}`});var OC,MC,Du,NC=l(()=>{"use strict";OC=g(require("node:crypto")),MC=g(require("node:fs")),Du=e=>{try{let t=MC.default.readFileSync(e);return OC.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Dr,Io,YV,zC,tS,jC=l(()=>{"use strict";Dr=g(require("node:fs")),Io=g(require("node:path"));NC();YV=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Io.default.join(t,n,o);return Dr.default.mkdirSync(Io.default.dirname(s),{recursive:!0}),Dr.default.copyFileSync(r,s),Io.default.relative(e,s).replaceAll("\\","/")},zC=e=>{let t=Io.default.join(e.repoRoot,e.repoRelativeDestination),r=Du(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(Dr.default.existsSync(t)){let n=Du(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=YV(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Dr.default.mkdirSync(Io.default.dirname(t),{recursive:!0}),Dr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Dr.default.mkdirSync(Io.default.dirname(t),{recursive:!0}),Dr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},tS=e=>{let t=Du(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var rS,DC,$u,oS=l(()=>{"use strict";rS=g(require("node:fs"));Qn();DC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$u=e=>{if(!rS.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(rS.default.readFileSync(e,"utf8"));if(DC(t)&&t.version===1&&DC(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var $r,Hu,$C,HC=l(()=>{"use strict";$r=g(require("node:fs")),Hu=g(require("node:path"));Qn();$C=e=>{let t=new Set(e.setSlugs.map(s=>ju(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=Hu.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Hu.default.join(e.repoRoot,i.backupPath);$r.default.existsSync(c)?($r.default.mkdirSync(Hu.default.dirname(a),{recursive:!0}),$r.default.copyFileSync(c,a),o.push(s)):$r.default.existsSync(a)&&$r.default.rmSync(a,{force:!0})}else $r.default.existsSync(a)&&$r.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var nS,Fu,sS=l(()=>{"use strict";nS=g(require("node:path"));Qn();Fu=e=>({ledgerFilePath:nS.default.join(e.metaDirPath,TC),backupsDirPath:nS.default.join(e.metaDirPath,xC)})});var iS,FC,UC=l(()=>{"use strict";iS=g(require("node:path")),FC=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return iS.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return iS.default.posix.join(s,e,n)}});var aS,BC,lS,GC=l(()=>{"use strict";aS=g(require("node:fs")),BC=g(require("node:path")),lS=(e,t)=>{aS.default.mkdirSync(BC.default.dirname(e),{recursive:!0}),aS.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var cS,XV,rt,es=l(()=>{"use strict";cS=g(require("node:os")),XV=e=>{let t=e.trim();return t.startsWith("~/")?`${cS.default.homedir()}${t.slice(1)}`:t==="~"?cS.default.homedir():t},rt=XV});var Uu,qC,ZV,VC,KC=l(()=>{"use strict";Uu=g(require("node:fs")),qC=g(require("node:path"));Qn();bo();ZV=`*
!${su}
`,VC=e=>{let t=qC.default.join(e,IC);Uu.default.existsSync(t)||(Uu.default.mkdirSync(e,{recursive:!0}),Uu.default.writeFileSync(t,ZV))}});var Oo,ot,Mo=l(()=>{"use strict";Oo=g(require("node:path"));bo();es();ot=e=>{let t=rt(e),r=Oo.default.join(t,sE);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Oo.default.join(r,"rag"),memoryDirPath:Oo.default.join(r,iE),reportsDirPath:Oo.default.join(r,lE),metaFilePath:Oo.default.join(r,su),ragChunksFilePath:Oo.default.join(r,"rag",aE)}}});var jt,YC,QV,eK,Ye,dS=l(()=>{"use strict";jt=g(require("node:fs")),YC=g(require("node:path"));bo();KC();Mo();QV=(e,t)=>{if(jt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};jt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},eK=e=>{jt.default.existsSync(e.ragChunksFilePath)||jt.default.writeFileSync(e.ragChunksFilePath,"");let t=YC.default.join(e.memoryDirPath,Mn);jt.default.existsSync(t)||jt.default.writeFileSync(t,"")},Ye=e=>{let t=ot(e.projectFolderPath);return jt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),jt.default.mkdirSync(t.ragDirPath,{recursive:!0}),jt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),VC(t.metaDirPath),QV(t,e),eK(t),{ok:!0,layout:t}}});var XC,ZC,QC,eR,Bu,Gu=l(()=>{"use strict";XC="components",ZC="store",QC="versions",eR="installed.json",Bu=e=>`harness-set:${e.trim()}`});var uS,tR,qu,pS=l(()=>{"use strict";uS=g(require("node:fs")),tR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qu=e=>{if(!uS.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(uS.default.readFileSync(e,"utf8"));if(tR(t)&&t.version===1&&tR(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var ma,ts,Vu=l(()=>{"use strict";ma=g(require("node:path"));Gu();ts=e=>{let t=ma.default.join(e,XC);return{componentsRootDir:t,storeDir:ma.default.join(t,ZC),versionsDir:ma.default.join(t,QC),installedFilePath:ma.default.join(t,eR)}}});var mS,rR,Ku,Ju,Yu=l(()=>{"use strict";mS=g(require("node:crypto")),rR=g(require("node:fs")),Ku=e=>mS.default.createHash("sha256").update(e,"utf8").digest("hex"),Ju=e=>{try{let t=rR.default.readFileSync(e);return mS.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var gS,oR,nR,sR=l(()=>{"use strict";gS=g(require("node:fs")),oR=g(require("node:path")),nR=(e,t)=>{gS.default.mkdirSync(oR.default.dirname(e),{recursive:!0}),gS.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var fS,hS,iR,aR=l(()=>{"use strict";fS=g(require("node:fs")),hS=g(require("node:path")),iR=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=hS.default.join(e,r),n=hS.default.join(o,`${t.versionId}.json`);fS.default.mkdirSync(o,{recursive:!0}),fS.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var Xu,lR,cR,dR=l(()=>{"use strict";Xu=g(require("node:fs")),lR=g(require("node:path"));Yu();cR=e=>{let t=Ku(e.content),r=lR.default.join(e.storeDir,t);return Xu.default.existsSync(r)||(Xu.default.mkdirSync(e.storeDir,{recursive:!0}),Xu.default.writeFileSync(r,e.content)),t}});var yS,uR,tK,Zu,SS=l(()=>{"use strict";yS=g(require("node:fs")),uR=g(require("node:path"));Gu();pS();Vu();Yu();sR();aR();dR();tK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Zu=e=>{let t=ts(e.installDir),r=Bu(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!tK(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=uR.default.join(e.harnessRootDir,a);if(!yS.default.existsSync(c))continue;let d=yS.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Ju(c);if(p!==null){if(Ku(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);cR({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;iR(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=qu(t.installedFilePath);nR(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var bS,AS,pR,mR=l(()=>{"use strict";bS=g(require("node:fs"));SS();pS();Vu();AS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pR=e=>{if(!bS.default.existsSync(e.harnessManifestPath))return;let t=ts(e.installDir),r=qu(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(bS.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!AS(o)||o.version!==1||!AS(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!AS(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Zu({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var PS,gR,fR,hR=l(()=>{"use strict";PS=g(require("node:fs")),gR=g(require("node:path")),fR=e=>{let t=e.componentId.replaceAll("/","_"),r=gR.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!PS.default.existsSync(r))return null;try{let o=JSON.parse(PS.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Qu,ep,yR,SR=l(()=>{"use strict";Qu=g(require("node:fs")),ep=g(require("node:path"));Gu();mR();hR();Vu();Yu();yR=e=>{pR({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=ts(e.layout.installDir),r=Bu(e.setSlug),o=fR({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=ep.default.join(t.storeDir,i.contentSha256);if(Qu.default.existsSync(a)&&Ju(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?ep.default.join(e.layout.harnessRootDir,n):ep.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Qu.default.existsSync(s))return null;try{if(!Qu.default.statSync(s).isFile())return null}catch{return null}return s}});var AR,rK,oK,Hr,tp=l(()=>{"use strict";oS();sS();Mo();AR="harness-set:",rK=e=>{let t=e.trim();if(!t.startsWith(AR))return null;let r=t.slice(AR.length).trim();return r.length>0?r:null},oK=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=rK(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Hr=e=>{let t=ot(e),{ledgerFilePath:r}=Fu(t),o=$u(r);return oK(o)}});var rp,wS,ga,nK,ir,fa,rs=l(()=>{"use strict";rp=g(require("node:fs")),wS=g(require("node:os")),ga=g(require("node:path")),nK=()=>rp.default.realpathSync(ga.default.resolve(wS.default.homedir())),ir=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?ga.default.join(wS.default.homedir(),t.slice(1)):t,o;try{o=rp.default.realpathSync(ga.default.resolve(r))}catch{return null}let n=nK();return o===n||o.startsWith(`${n}${ga.default.sep}`)?o:null},fa=e=>{let t=ir(e);if(t===null)return null;try{if(!rp.default.statSync(t).isFile())return null}catch{return null}return t}});var vS,_S=l(()=>{"use strict";vS=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var np,bR,op,sK,ha,WS=l(()=>{"use strict";np=g(require("node:fs")),bR=g(require("node:path"));Qn();jC();oS();HC();sS();UC();GC();es();dS();SR();tp();rs();_S();op=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sK=e=>{if(!np.default.existsSync(e))return null;try{let t=JSON.parse(np.default.readFileSync(e,"utf8"));if(op(t)&&t.version===1)return t}catch{return null}return null},ha=e=>{let t=[...new Set(e.setSlugs.map(b=>b.trim()).filter(b=>b.length>0))],r=rt(e.projectFolderPath),o=ir(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=np.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Ye({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Fu(s.layout),d=Hr(o).filter(b=>!t.includes(b)),p=$u(i),m=0;if(d.length>0){let b=$C({repoRoot:o,setSlugs:d,ledger:p});p=b.ledger,m=b.summary.removedPaths.length}if(t.length===0)return lS(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let S=sK(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=op(S.sets)?S.sets:{},y=0,u=0,A=0;for(let b of t){let f=h[b];if(!op(f))return{ok:!1,errorMessage:`Harness set "${b}" is not installed locally.`};let w=typeof f.version=="number"?String(f.version):"1",v=ju(b),W=Array.isArray(f.items)?f.items:[];for(let L of W){if(!op(L))continue;let E=typeof L.path=="string"?L.path.trim():"";if(E.length===0)continue;let T=vS(E);if(T===null)continue;let I=FC(b,T),M=bR.default.posix.join(".cursor",I).replaceAll("\\","/"),B=typeof L.id=="string"?L.id.trim():"",q=yR({layout:e.layout,setSlug:b,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:E,manifestItemId:B});if(q===null)continue;let F=zC({repoRoot:o,backupsDir:a,repoRelativeDestination:M,sourceAbsolutePath:q,componentId:v,versionId:w,ledger:p});if(F.kind==="skipped_unchanged"){u+=1;continue}if(F.kind==="backed_up_user_file"){A+=1,y+=1,p={version:1,entries:{...p.entries,[M]:tS({componentId:v,versionId:w,sourceAbsolutePath:q,backupPath:F.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[M]:tS({componentId:v,versionId:w,sourceAbsolutePath:q})}}}}return y===0&&u===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(lS(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:A,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var PR,sp,iK,aK,lK,cK,dK,uK,pK,mK,gK,ya,ip=l(()=>{"use strict";PR=g(require("node:crypto")),sp=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},iK=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},aK=(e,t)=>{let r=iK(t),o=sp(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},lK=(e,t,r)=>{let o=aK(t,r);return`shared/items/${e}/${o}`},cK=["rules","skills","commands","instructions","agents"],dK=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),uK=(e,t)=>[...e.filter(o=>o.id!==t.id),t],pK=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},mK=e=>PR.default.createHash("sha256").update(e,"utf8").digest("hex"),gK=e=>({id:e.id,kind:e.kind,title:e.title,path:lK(e.id,e.kind,e.title),contentSha256:mK(e.content)}),ya=e=>{let t=new Date().toISOString(),r=e.existingManifest??dK(e.hostname,t),o=sp(e.bundle.slug),n=pK(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...cK.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let m=gK(p);return{files:[...d.files,{relativePath:m.path,content:p.content}],nextItems:uK(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var Fr,wR,ap,fK,No,LS=l(()=>{"use strict";Fr=g(require("node:fs")),wR=g(require("node:os")),ap=g(require("node:path"));ip();fK=e=>{if(!Fr.default.existsSync(e))return null;try{let t=JSON.parse(Fr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},No=e=>{try{let t=fK(e.layout.harnessManifestPath),r=ya({bundle:e.bundle,hostname:wR.default.hostname(),existingManifest:t});Fr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)Fr.default.mkdirSync(ap.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=ap.default.join(e.layout.harnessRootDir,o.relativePath);Fr.default.mkdirSync(ap.default.dirname(n),{recursive:!0}),Fr.default.writeFileSync(n,o.content)}return Fr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var kS,vR=l(()=>{"use strict";LS();WS();kS=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=No({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return ha({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var _R,WR=l(()=>{"use strict";_R=["rule","skill","command","instruction","agent"]});var LR,hK,yK,Dt,ES=l(()=>{"use strict";WR();LR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hK=e=>typeof e=="string"&&_R.includes(e),yK=e=>{if(!LR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!hK(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Dt=e=>{if(!LR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=yK(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var kR,SK,CS,ER=l(()=>{"use strict";kR=require("node:zlib");ES();SK="x-agent-witch-token",CS=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[SK]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,kR.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Dt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var TS,RS,Ur,CR=l(()=>{"use strict";TS=g(require("node:fs")),RS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ur=e=>{if(!TS.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(TS.default.readFileSync(e.harnessManifestPath,"utf8"));if(!RS(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=RS(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!RS(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var lp,RR=l(()=>{"use strict";lp=()=>"~"});var TR,xR,IR=l(()=>{"use strict";TR=require("node:crypto"),xR=e=>`local-${(0,TR.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var xS,OR=l(()=>{"use strict";xS=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Sa,cp,IS=l(()=>{"use strict";Sa=g(require("node:path")),cp=e=>{let t=Sa.default.dirname(e),r=Sa.default.basename(t);return r==="agents"?Sa.default.basename(Sa.default.dirname(t)):r}});var Aa,ar,MR,AK,bK,PK,dp,NR,OS=l(()=>{"use strict";Aa=g(require("node:fs")),ar=g(require("node:path"));IR();OR();IS();MR=new Set(["node_modules",".git","dist","build",".next","coverage"]),AK=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},bK=(e,t)=>{let r=ar.default.basename(t);if(e==="skill"){let o=t.split(ar.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},PK=e=>{let t=[],r=(n,s)=>{let i;try{i=Aa.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&MR.has(a.name))continue;let c=ar.default.join(n,a.name),d=s?ar.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;xS(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=ar.default.join(e,n);Aa.default.existsSync(s)&&r(s,n)}let o=ar.default.join(e,"skills");return Aa.default.existsSync(o)&&r(o,"skills"),t},dp=e=>{let t=PK(e);if(t.length===0)return null;let r=ar.default.dirname(e),o=cp(e),n=AK(o),s=t.map(i=>{let a=xS(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:xR(i.absolutePath),kind:a,title:bK(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},NR=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Aa.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||MR.has(a.name))continue;let c=ar.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var zR,MS,wK,NS,jR=l(()=>{"use strict";zR=g(require("node:fs")),MS=g(require("node:path"));OS();rs();wK=e=>{let t=ir(e.trim());if(t===null)return null;if(MS.default.basename(t)===".cursor")return t;let r=MS.default.join(t,".cursor");try{if(zR.default.statSync(r).isDirectory())return ir(r)}catch{return null}return null},NS=e=>{let t=wK(e.projectPath);if(t===null)return null;let r=dp(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var DR,vK,up,zS,$R=l(()=>{"use strict";DR=g(require("node:path"));OS();rs();IS();vK=5,up=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},zS=e=>{let t=ir(e.scanRoot.trim());if(t===null)return up(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of NR(t,vK,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=ir(s);if(i===null)continue;let a=cp(i);up(e.response,"folder",{cursorDir:i,groupName:a,repoPath:DR.default.dirname(i)});let c=dp(i);c!==null&&(r.push(c),up(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return up(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var HR,FR,UR=l(()=>{"use strict";HR=g(require("node:path")),FR=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:HR.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var ze,BR,jS,_K,DS,$S,pp,HS,ba,GR=l(()=>{"use strict";ze=g(require("node:fs")),BR=g(require("node:os")),jS=g(require("node:path"));ip();SS();rs();UR();_K=e=>{if(!ze.default.existsSync(e))return null;try{let t=JSON.parse(ze.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},DS=e=>{let t=e.hostname??BR.default.hostname(),r=_K(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let m=fa(p.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let S=ze.default.readFileSync(m,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:S,setSlugs:[i.slug]})}let d=ya({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{ze.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)ze.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=jS.default.join(e.layout.harnessRootDir,i.relativePath);ze.default.mkdirSync(jS.default.dirname(a),{recursive:!0}),ze.default.writeFileSync(a,i.content)}ze.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=sp(i.slug),d=r.sets[c];d!==void 0&&Zu({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},$S="reveal-cache.json",pp=(e,t)=>{ze.default.mkdirSync(e.harnessRootDir,{recursive:!0}),ze.default.writeFileSync(`${e.harnessRootDir}/${$S}`,`${JSON.stringify(t,null,2)}
`)},HS=e=>{let t=`${e.harnessRootDir}/${$S}`;ze.default.existsSync(t)&&ze.default.unlinkSync(t)},ba=e=>{let t=`${e.harnessRootDir}/${$S}`;if(!ze.default.existsSync(t))return null;try{let r=JSON.parse(ze.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return FR(r)}catch{return null}return null}});var zo=l(()=>{"use strict";WS();vR();_S();LS();ER();ES();ip();CR();RR();jR();rs();$R();GR()});var FS,qR=l(()=>{"use strict";zo();Re();FS=e=>{let t=N(e.profileEmail);return No({bundle:e.bundle,layout:t})}});var VR=l(()=>{"use strict";qR();zo()});var WK,KR,LK,JR,jo,mp,YR=l(()=>{"use strict";WK=["agentwitch.com","www.agentwitch.com"],KR=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,LK=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},JR=e=>{let t=LK(e);return!!(WK.includes(t)||KR.test(e.trim().toLowerCase()))},jo=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return JR(r)?KR.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},mp=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:jo(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Pa=l(()=>{"use strict";YR()});var lr,wa=l(()=>{"use strict";lr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var va,XR=l(()=>{"use strict";VR();Pa();wa();va=e=>{if(!lr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Dt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!jo(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=FS({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var US=l(()=>{"use strict";XR()});var kK,os,BS=l(()=>{"use strict";kK=e=>e==="hourly"||e==="daily"||e==="weekdays",os=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!kK(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var _a,gp,ZR,QR,GS,St,fp,hp,yp,Sp,Ap=l(()=>{"use strict";_a=g(require("node:fs")),gp=g(require("node:path"));BS();ZR="automations.json",QR=e=>e.profileEmail!==null?gp.default.join(e.installDir,"profiles",e.profileEmail,ZR):gp.default.join(e.installDir,ZR),GS=()=>({version:1,automations:[]}),St=e=>{let t=QR(e);if(!_a.default.existsSync(t))return GS();try{let r=JSON.parse(_a.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?GS():{version:1,automations:r.automations.flatMap(n=>{let s=os(n);return s!==null?[s]:[]})}}catch{return GS()}},fp=(e,t)=>{let r=QR(e);_a.default.mkdirSync(gp.default.dirname(r),{recursive:!0}),_a.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},hp=(e,t)=>{fp(e,{version:1,automations:t})},yp=(e,t)=>{let o=St(e).automations.filter(n=>n.id!==t.id);fp(e,{version:1,automations:[...o,t]})},Sp=(e,t)=>St(e).automations.find(r=>r.id===t)??null});var Ie,cr=l(()=>{"use strict";Ie="x-agent-witch-token"});var qS=l(()=>{"use strict";hu();Su()});var Y,Do,VS,Wa,KS,EK,JS,La,ka,YS,Ea=l(()=>{"use strict";cr();qS();Y=e=>{let t=we(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Do=e=>({[Ie]:e,"Content-Type":"application/json"}),VS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Do(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Wa=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Do(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},KS=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Do(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},EK=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},JS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:Do(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},La=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Do(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return EK(r)}catch{return null}},ka=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:Do(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},YS=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Do(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var $o,e0,t0,CK,XS,r0,ZS=l(()=>{"use strict";$o=g(require("node:fs")),e0=g(require("node:path")),t0=e=>e0.default.join(e.harnessRootDir,"projects-registry.json"),CK=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),XS=e=>{let t=t0(e);if(!$o.default.existsSync(t))return[];try{let r=JSON.parse($o.default.readFileSync(t,"utf8"));return CK(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},r0=e=>{let t=t0(e);if(!$o.default.existsSync(t))return;let r=`${t}.migrated`;if($o.default.existsSync(r)){$o.default.unlinkSync(t);return}$o.default.renameSync(t,r)}});var o0,RK,TK,n0,s0=l(()=>{"use strict";es();o0=e=>rt(e),RK=e=>new Set(e.map(t=>o0(t.folderPath))),TK=e=>new Set(e.map(t=>t.id)),n0=(e,t)=>{let r=RK(t),o=TK(t),n=[],s=new Set;for(let i of e){let a=o0(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var QS,eA=l(()=>{"use strict";Ea();ZS();s0();QS=async(e,t)=>{let r=XS(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await La(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=n0(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await JS(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&r0(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var tA,Ho,bp=l(()=>{"use strict";tA=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),Ho=(e,t)=>e.find(r=>r.id===t)??null});var ns,Pp=l(()=>{"use strict";Ea();eA();bp();ns=async(e,t)=>{t!==void 0&&await QS(t,e);let r=Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await La(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=tA(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var i0=l(()=>{"use strict"});var xK,IK,wp,rA=l(()=>{"use strict";xK="Default",IK=e=>e.trim().toLowerCase()===xK.toLowerCase(),wp=IK});var _e,a0,OK,MK,NK,zK,ss,oA=l(()=>{"use strict";rA();_e=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),a0=(e,t)=>e.length===0?`<p class="empty">${_e(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${_e(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${_e(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,OK=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,MK=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${_e(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,NK=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?MK(e.project):OK();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
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
      </form>`},zK=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${_e(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${_e(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},ss=e=>{let t=e.flashError?`<div class="alert-error">${_e(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${_e(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(p,m)=>`<a class="project-tab${e.activeTab===p?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${p}">${_e(m)}</a>`,n=e.composition?.items.filter(p=>p.kind==="workflow")??[],s=e.composition?.items.filter(p=>p.kind==="agent")??[],i="";e.activeTab==="harness"?i=NK({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=a0(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=a0(s,"No agents installed for this project yet."):i=zK({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});let a=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}?rename=1`,c=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${_e(a)}" target="_blank" rel="noopener noreferrer">Rename in Agent Witch Cloud\u2026</a>
    </div>`,d=wp(e.project.name)?"":`<section class="danger-zone stack">
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
    </section>${d}`}});var jK,DK,l0,c0=l(()=>{"use strict";zo();cr();jK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),DK=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[Ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!jK(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Dt(n);return s===null?[]:[s]})}catch{return null}},l0=DK});var d0,nA,u0=l(()=>{"use strict";ue();zo();oA();Pp();c0();bp();tp();Ea();Mt();d0=e=>({kind:"page",title:e.project.name,body:ss({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Ur(e.layout),linkedSetSlugs:Hr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),nA=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let o=await ns(r,e.layout),n=Ho(o.projects,t);if(n===null)return{kind:"not_found"};let s=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??gt,a=s===null?null:await l0(s,n.id);if(a===null)return d0({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=kS({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return d0({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await ka(s,n.id,c.appliedSetSlugs),p=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${p.toString()}`}}});var $K,sA,p0=l(()=>{"use strict";$K=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,sA=$K});var m0,g0,HK,FK,vp,_p,f0=l(()=>{"use strict";m0=require("node:child_process"),g0=require("node:util"),HK=(0,g0.promisify)(m0.execFile),FK=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},vp=async(e,t)=>{try{let{stdout:r}=await HK("git",t,{cwd:e,env:FK(),maxBuffer:1048576});return r.trim()}catch{return null}},_p=async e=>{let t=await vp(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await vp(e,["rev-parse","--abbrev-ref","HEAD"]),o=await vp(e,["status","--porcelain"]),n=await vp(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var iA,h0=l(()=>{"use strict";iA=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var UK,aA,y0=l(()=>{"use strict";UK=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},aA=UK});var BK,lA,S0=l(()=>{"use strict";cr();BK=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[Ie]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},lA=BK});var A0,Br,b0=l(()=>{"use strict";A0=require("node:child_process"),Br=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,A0.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var P0=l(()=>{"use strict";Pp()});var Ca,w0=l(()=>{"use strict";cr();Ca=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[Ie]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var cA,v0=l(()=>{"use strict";cr();cA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[Ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var $t=l(()=>{"use strict";Pp();bp();i0();es();dS();u0();tp();p0();f0();h0();y0();S0();b0();P0();w0();v0();eA();ZS();Ea()});var Wp,Ra,_0,dA,Fo,uA=l(()=>{"use strict";Wp=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},Ra=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Wp(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},_0=e=>e>=1&&e<=5,dA=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Wp(t,"UTC")},Fo=e=>{let t=e.from??new Date,r=Wp(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Ra(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=Ra(r,e.timeZone,o,0),s=Wp(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?Ra(dA(r),e.timeZone,o,0):n;if(!i&&_0(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=dA(a),_0(a.weekday))return Ra(a,e.timeZone,o,0);return Ra(dA(r),e.timeZone,o,0)}});var W0,pA,dr,mA=l(()=>{"use strict";W0=require("node:crypto");ue();$t();uA();Ap();pA=!1,dr=async e=>{if(pA)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=Sp(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};pA=!0;let n=(0,W0.randomUUID)();try{let s=await Xn(t,"claude-cli",o.prompt);await YS(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=Fo({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return yp(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{pA=!1}}});var Lp,L0=l(()=>{"use strict";ue();mA();Ap();Lp=async()=>{let e=$();if(e===null)return;let t=St(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await dr(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var Ta=l(()=>{"use strict";Ap();L0();mA();uA()});var k0=l(()=>{"use strict";Ta()});var E0=l(()=>{"use strict";BS()});var C0=l(()=>{"use strict";E0()});var gA=l(()=>{"use strict";Ta()});var GK,qK,xa,fA=l(()=>{"use strict";k0();C0();gA();Re();GK=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),qK=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Fo({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Fo({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},xa=e=>{let t=GK(e.profileEmail),r=St(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=os(s);return i!==null?[qK(i,o.get(i.id))]:[]});return hp(t,n),{ok:!0,writtenCount:n.length}}});var hA=l(()=>{"use strict";Ta()});var R0=l(()=>{"use strict";ue()});var T0=l(()=>{"use strict";fA();hA();gA();R0()});var x0,Ia,Oa,Ma,I0=l(()=>{"use strict";x0=g(require("node:os"));T0();Pa();wa();Ia=e=>{if(!lr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!jo(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=xa({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Oa=async e=>{if(!lr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:jo(t)?dr(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Ma=()=>{let e=$(),t=e!==null?St(e.layout):{version:1,automations:[]};return{ok:!0,hostname:x0.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var yA=l(()=>{"use strict";I0()});var kp=l(()=>{"use strict";te()});var Ep=l(()=>{"use strict";te()});var Cp,M0,N0,O0,VK,KK,is,SA=l(()=>{"use strict";Cp=g(require("node:fs")),M0=g(require("node:os")),N0=g(require("node:path"));kp();Ep();la();Re();O0=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},VK=e=>N0.default.join(M0.default.homedir(),"Library","LaunchAgents",`${e}.plist`),KK=async e=>Cp.default.existsSync(VK(e))?(await Ce(e)).ok:!1,is=async(e=k())=>{let t=Cp.default.existsSync(Nu(e)),r=!Cp.default.existsSync(er(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=aa(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await O0(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${Pe(e)}-wake`;await KK(i)&&s.push(i);for(let c of ee(e))(await Ce(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await O0(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var z0=l(()=>{"use strict";te()});var as,Na=l(()=>{"use strict";as="connection-health.json"});var Uo,Rp,JK,za,We,AA,Tp,je,xp=l(()=>{"use strict";Uo=g(require("node:fs")),Rp=g(require("node:path"));Na();JK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),za=e=>e.profileEmail===null?Rp.default.join(e.installDir,as):Rp.default.join(e.installDir,"profiles",e.profileEmail,as),We=e=>{let t=za(e);if(!Uo.default.existsSync(t))return null;try{let r=JSON.parse(Uo.default.readFileSync(t,"utf8"));return!JK(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},AA=e=>{let t=za(e);Uo.default.existsSync(t)&&Uo.default.rmSync(t,{force:!0})},Tp=(e,t)=>{let r=za(e),o=We(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Uo.default.mkdirSync(Rp.default.dirname(r),{recursive:!0}),Uo.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},je=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var ja,j0=l(()=>{"use strict";Na();xp();ja=(e,t)=>{if(!t.socketOpen)return!1;let r=We(e);return r===null?!1:!je(r,t.staleAfterMs??12e4,t.nowMs)}});var bA,D0=l(()=>{"use strict";xp();bA=(e,t)=>!(e!==null&&!je(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var ls=l(()=>{"use strict";xp();j0();D0();Na()});var PA=l(()=>{"use strict";ls();te()});var wA=l(()=>{"use strict";ls()});var vA=l(()=>{"use strict";te()});var H0,$0,Da,_A=l(()=>{"use strict";H0=g(require("node:fs"));Mt();kp();Ep();Re();$0=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},Da=async(e=k())=>{if(!H0.default.existsSync(er(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await $0())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of ee(e))(await Ce(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await $0();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var F0=l(()=>{"use strict";te()});var U0,Bo,WA,YK,XK,ZK,B0,QK,G0,cs,Ip=l(()=>{"use strict";U0=require("node:crypto"),Bo=g(require("node:fs")),WA=g(require("node:path"));Re();YK="watchdog-log.ndjson",XK=200,ZK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B0=(e=k())=>{let t=N(),r=t.installDir===e?t.logsDir:On({installDir:e,profileEmail:t.profileEmail});return WA.default.join(r,YK)},QK=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!ZK(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},G0=(e,t=k())=>{let r={id:(0,U0.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=B0(t);Bo.default.mkdirSync(WA.default.dirname(o),{recursive:!0});let n=Bo.default.existsSync(o)?Bo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-XK+1)),JSON.stringify(r)];return Bo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},cs=(e=20,t=k())=>{let r=B0(t);if(!Bo.default.existsSync(r))return[];let o=Bo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=QK(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var LA,kA,EA,CA=l(()=>{"use strict";He();LA=co.watchdogReinstallState,kA=900*1e3,EA=3e3});var q0=l(()=>{"use strict";CA()});var V0={};Rt(V0,{verifyAgentWitchReviveAfterKickstart:()=>t8});var e8,t8,K0=l(()=>{"use strict";q0();wA();vA();Re();e8=e=>new Promise(t=>{setTimeout(t,e)}),t8=async e=>{if(await e8(e.verifyDelayMs??EA),!await ho(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),o=We(r);return!je(o,e.staleAfterMs)}});var $a,RA,r8,J0,Y0,TA,xA,IA=l(()=>{"use strict";$a=g(require("node:fs")),RA=g(require("node:path"));K();CA();r8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),J0=e=>RA.default.join(e,LA),Y0=(e=k())=>{let t=J0(e);if(!$a.default.existsSync(t))return null;try{let r=JSON.parse($a.default.readFileSync(t,"utf8"));return!r8(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},TA=(e=k(),t=Date.now())=>{let r=Y0(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=kA:!0},xA=(e=k(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=J0(e);return $a.default.mkdirSync(RA.default.dirname(o),{recursive:!0}),$a.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var OA,X0=l(()=>{"use strict";te();IA();OA=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!TA())return{attempted:!1,ok:!1,targets:e};xA();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Ce(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var Z0=l(()=>{"use strict";IA();X0()});var MA=l(()=>{"use strict";Nt()});var Q0=l(()=>{"use strict";Nt()});var eT,ds,tT,rT,oT,o8,n8,nT,s8,i8,sT,iT=l(()=>{"use strict";eT=require("node:child_process"),ds=g(require("node:fs")),tT=g(require("node:os")),rT=g(require("node:path")),oT=require("node:util");MA();Q0();Re();o8=(0,oT.promisify)(eT.execFile),n8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nT=e=>{let t=pt(e),r=t===null?N():N(t);if(!ds.default.existsSync(r.configPath))return null;try{let o=JSON.parse(ds.default.readFileSync(r.configPath,"utf8"));return!n8(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},s8=e=>nT(e)?.wsUrl??null,i8=e=>{let t=s8(e);return t!==null?we(t):Te(e)?.appOrigin??null},sT=async e=>{let t=e?.installDir??k(),r=nT(t),o=r!==null?we(r.wsUrl):i8(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=rT.default.join(tT.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{ds.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??pt(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await o8("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{ds.default.existsSync(i)&&ds.default.unlinkSync(i)}}});var aT={};Rt(aT,{attemptAgentWitchWatchdogReinstall:()=>a8});var a8,lT=l(()=>{"use strict";Z0();iT();a8=async e=>OA(e,()=>sT())});var cT,dT,uT,l8,c8,d8,Ha,NA=l(()=>{"use strict";z0();PA();wA();vA();_A();SA();kp();Ep();Re();Hn();F0();Ip();cT=e=>e===null?N():N(e),dT=async(e,t,r)=>{if(!await ho(e))return"not_running";let n=cT(t);if(ft(n))return"healthy";let s=We(n);return je(s,r)?"stale_connection":"healthy"},uT=async e=>{let t=e?.staleAfterMs??12e4,r=k(),o=ee(r);return Promise.all(o.map(async n=>{let s=await dT(n.launchAgentLabel,n.profileEmail,t),i=cT(n.profileEmail),a=We(i),c=await ho(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:je(a,t),needsRevive:s!=="healthy",reason:s}}))},l8=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},c8=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",d8=async e=>{let t=await Ce(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(K0(),V0)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Ha=async e=>{if(!mt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=k();await is(r),await Da(r);let o=ee(r),n=[];for(let p of o){let m=await dT(p.launchAgentLabel,p.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:m});continue}n.push(await d8({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let p=fo();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(lT(),aT)),m=await p(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&G0({event:c8(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:l8(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var pT,Op,mT=l(()=>{"use strict";pT=g(require("node:os"));PA();Ip();NA();Op=async()=>{let e=await uT(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:pT.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:cs(1)[0]??null}}});var zA=l(()=>{"use strict";SA();NA();mT();Ip()});var Fa,Ua,Ba,gT=l(()=>{"use strict";te();zA();Fa=async()=>{await is();let e=ee(),t=[];for(let r of e){let o=await Ce(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=fo();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Ua=Ha,Ba=Ha});var jA=l(()=>{"use strict";gT()});var Np,Mp,fT,DA,hT,u8,p8,m8,g8,f8,zp,yT=l(()=>{"use strict";Np=require("node:child_process"),Mp=g(require("node:fs")),fT=g(require("node:os")),DA=g(require("node:path")),hT=require("node:util");te();K();u8=(0,hT.promisify)(Np.execFile),p8=()=>DA.default.join(fT.default.homedir(),"Library","LaunchAgents"),m8=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await u8("launchctl",["bootout",r]).catch(()=>{})},g8=e=>{let t=DA.default.join(p8(),`${e}.plist`);Mp.default.existsSync(t)&&Mp.default.unlinkSync(t)},f8=e=>{(0,Np.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},zp=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=k();if(!Mp.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=tr(e);for(let r of t)await m8(r),g8(r);return f8(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var ST,jp,AT,us,bT,h8,y8,S8,$A,A8,HA,PT=l(()=>{"use strict";ST=require("node:child_process"),jp=g(require("node:fs")),AT=g(require("node:os")),us=g(require("node:path")),bT=require("node:util");te();h8=(0,bT.promisify)(ST.execFile),y8=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],S8=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],$A=e=>{jp.default.existsSync(e)&&jp.default.rmSync(e,{force:!0})},A8=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await h8("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},HA=async e=>{let r=(e.listLaunchAgentLabels??tr)(e.layout.installDir),o=e.launchAgentsDir??us.default.join(AT.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??A8;for(let i of r)await n(i),$A(us.default.join(o,`${i}.plist`));let s=us.default.dirname(e.layout.configPath);for(let i of y8)$A(us.default.join(s,i));for(let i of S8)$A(us.default.join(e.layout.installDir,i));return jp.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var FA,wT=l(()=>{"use strict";FA={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var UA,vT=l(()=>{"use strict";UA="unknown_identity"});var BA=l(()=>{"use strict";wT();vT()});var b8,GA,_T=l(()=>{"use strict";BA();b8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GA=e=>e.type!=="system.error"||!b8(e.payload)?!1:e.payload.errorCode===UA});var qA=l(()=>{"use strict";yT();PT();_T()});var Dp=l(()=>{"use strict";te();Nt();qA();zA()});var ps,$p,Hp=l(()=>{"use strict";Dp();ps=(e=20)=>cs(e),$p=Op});var Fp,ms,Up,Bp=l(()=>{"use strict";Dp();Fp=Co,ms=(e=20)=>Lo(e),Up=e=>Eo(e)});var Gp,VA=l(()=>{"use strict";Dp();Gp=()=>zp()});var WT=l(()=>{"use strict";eS();US();yA();jA();Hp();Bp();VA()});var LT={};Rt(LT,{buildAgentWitchAutomationStatusFromWakeServer:()=>Ma,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Fp,buildAgentWitchWakeHealthResponse:()=>da,buildAgentWitchWakeIdentityResponse:()=>ua,buildAgentWitchWatchdogStatus:()=>$p,installHarnessFromWakeServer:()=>va,readAgentWitchSelfUpdateLogEntries:()=>ms,readAgentWitchWatchdogLogEntries:()=>ps,restartAgentWitchFromWakeServer:()=>Ba,reviveAgentWitchWebSocketFromWakeServer:()=>Ua,runAgentWitchSelfUpdateFromWakeServer:()=>Up,runAgentWitchUninstallLocalFromWakeServer:()=>Gp,runAutomationFromWakeServer:()=>Oa,syncAutomationsFromWakeServer:()=>Ia,wakeAgentWitchLaunchAgents:()=>Fa});var kT=l(()=>{"use strict";WT()});var ET,CT,KA,JA,RT=l(()=>{"use strict";ET=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),CT=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?ET(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?ET(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},KA=e=>{let t=e.watchdogLogs.map(CT).join(""),r=e.updateLogs.map(CT).join("");return`<!doctype html>
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
</html>`},JA=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var TT,xT,IT=l(()=>{"use strict";TT=g(require("node:net")),xT=()=>new Promise((e,t)=>{let r=TT.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var OT,P8,YA,MT=l(()=>{"use strict";OT=g(require("node:net"));IT();ca();la();Re();P8=e=>new Promise(t=>{let r=OT.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),YA=async()=>{let e=k(),t=yt();if(await P8(t))return EC(t),t;let r=await xT();return zu(e,r),r}});var w8,XA,NT=l(()=>{"use strict";w8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),XA=e=>({force:w8(e)&&e.force===!0})});var Ga=l(()=>{"use strict";Pa();RT();MT();NT();zh();du();wo()});var ZA,j,QA,eb,qa,zT=l(()=>{"use strict";ZA=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},QA=e=>{e.writeHead(403),e.end()},eb=e=>e.url?.split("?")[0]??"/",qa=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var At=l(()=>{"use strict";zT()});var v8,jT,DT=l(()=>{"use strict";yA();At();v8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},jT=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,Ma(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await v8(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=Ia(t);return j(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Oa(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var _8,HT,$T,FT,tb,UT,rb=l(()=>{"use strict";_8=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],HT=e=>/embed|minilm|^bge-/i.test(e),$T=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),FT=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),tb=e=>e.filter(t=>t.trim().length>0&&!HT(t)),UT=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!HT(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>$T(s,o));if(n!==void 0)return n}for(let n of _8){let s=r.find(i=>$T(i,n));if(s!==void 0)return s}return r[0]??null}});var ob,qT,VT,qp,KT,BT,GT,W8,L8,k8,E8,C8,R8,bt,Va=l(()=>{"use strict";ob=require("node:child_process"),qT=g(require("node:fs")),VT=g(require("node:os")),qp=g(require("node:path"));Nt();ht();rb();KT=3e3,BT=["claude-cli","codex","cursor","antigravity"],GT={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},W8=(e,t)=>new Promise(r=>{let o=(0,ob.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},KT);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),L8=()=>{let e=VT.default.homedir();return["ollama",qp.default.join(e,".local","bin","ollama"),qp.default.join(e,".agent-witch","ollama","ollama"),qp.default.join(e,".local-agent-witch","ollama","ollama")]},k8=e=>new Promise(t=>{let r=(0,ob.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},KT);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(FT(Buffer.concat(o).toString("utf8")))})}),E8=async()=>{for(let e of L8()){if(e!=="ollama"&&!qT.default.existsSync(e))continue;let t=await k8(e);if(t!==null)return t}return[]},C8=e=>{let t=e.installedWriterIds.map(s=>GT[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=ce(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${GT[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},R8=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:Fn},bt=async e=>{let t=BT.map(i=>{let a=wu(i,e.commands);return W8(a.command,a.args)}),[r,...o]=await Promise.all([E8(),...t]),n=BT.flatMap((i,a)=>o[a]===!0?[i]:[]),s=UT(r,R8());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:C8({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var T8,x8,nb,JT=l(()=>{"use strict";T8="http://127.0.0.1:11434",x8=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},nb=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||T8;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?x8(await o.json()):null}catch{return null}}});var sb=l(()=>{"use strict";ht();Va();JT();rb()});var I8,YT,XT=l(()=>{"use strict";sb();I8={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},YT=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:I8[t]})),ollamaModels:tb(e.ollamaModels)})});var O8,ZT,QT=l(()=>{"use strict";sb();At();XT();O8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},ZT=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await bt({commands:de({})});return j(e.response,200,{ok:!0,...YT({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await O8(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await nb({model:r,prompt:o});return n===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var M8,ex,tx=l(()=>{"use strict";US();At();M8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},ex=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await M8(e);if(t===null)return!0;let r=va(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var rx=l(()=>{"use strict";$t()});var ib,ox=l(()=>{"use strict";rx();wa();ib=e=>{if(!lr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Ye({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var nx,ab,lb=l(()=>{"use strict";ue();$t();wa();nx=e=>{if(!lr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},ab=async e=>{let t=nx(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Br("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=$();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Y({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Ye({projectFolderPath:r}),await Ca(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var sx=l(()=>{"use strict";ox();lb()});var ix,ax=l(()=>{"use strict";sx();lb();At();ix=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=ib(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await ab(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,o,r,e.cors.headers),!0}return!1}});var lx,cx=l(()=>{"use strict";Ga();Bp();Hp();lx=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=ps(50),r=ms(50);return e.response.writeHead(200,JA()),e.response.end(KA({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var dx,ux=l(()=>{"use strict";eS();At();dx=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,da(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,ua(),e.cors.headers),!0):!1});var px,mx=l(()=>{"use strict";VA();At();px=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Gp();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var gx,fx=l(()=>{"use strict";jA();At();gx=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Ua();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Ba();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Fa();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var hx,yx=l(()=>{"use strict";Ga();Bp();At();hx=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Fp();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=qa(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:ms(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=XA(t),o=await Up({force:r});return j(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var Sx,Ax=l(()=>{"use strict";Hp();At();Sx=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await $p();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=qa(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:ps(t)},e.cors.headers),!0}return!1}});var bx,Px=l(()=>{"use strict";DT();QT();tx();ax();cx();ux();mx();fx();yx();Ax();bx=[dx,lx,Sx,gx,hx,px,ex,ix,jT,ZT]});var wx,vx=l(()=>{"use strict";Px();wx=async e=>{for(let t of bx)if(await t(e))return!0;return!1}});var N8,_x,Wx=l(()=>{"use strict";Pa();At();vx();N8=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:eb(e),readJsonBody:()=>ZA(e)}),_x=async(e,t,r)=>{let o=e.headers.origin,n=mp(o);try{if(o!==void 0&&o.length>0&&!n.allowed){QA(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=N8(e,t,r,n);if(await wx(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var Lx,Go,Vp,Kp=l(()=>{"use strict";Lx=g(require("node:http"));Ga();Wx();Go=async()=>{let e=await YA(),t=Lx.default.createServer((r,o)=>{_x(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Vp=Go});var kx={};Rt(kx,{runAgentWitchBridgeCli:()=>z8});var z8,Ex=l(()=>{"use strict";te();Kp();z8=async()=>{Ve("agent-witch-bridge");let e=await Go(),t=or(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var Cx=l(()=>{"use strict";Mt()});var gs,cb,Rx=l(()=>{"use strict";gs=(e,t,r)=>e===1?t:r,cb=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${gs(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${gs(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${gs(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${gs(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${gs(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${gs(p,"year","years")} ago`}});var qo,db,j8,D8,ub,Gr,Ka,pb,Tx=l(()=>{"use strict";qo=g(require("node:fs")),db=g(require("node:path")),j8="local-ws-traffic.ndjson",D8=500,ub=e=>db.default.join(e.logsDir,j8),Gr=(e,t)=>{let r=ub(e);qo.default.mkdirSync(db.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});qo.default.appendFileSync(r,`${o}
`,"utf8")},Ka=(e,t=D8)=>{let r=ub(e);if(!qo.default.existsSync(r))return[];let n=qo.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},pb=e=>{let t=ub(e);qo.default.existsSync(t)&&qo.default.writeFileSync(t,"","utf8")}});var $8,xx,Ix,Ox=l(()=>{"use strict";BA();$8=new Set(Object.values(FA)),xx=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ix=e=>{if(!xx(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!$8.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!xx(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var Mx,Nx=l(()=>{"use strict";Mx=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var H8,F8,U8,Ja,zx=l(()=>{"use strict";Nx();H8=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,F8=e=>H8.test(e),U8=e=>Mx(e),Ja=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Ja(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&F8(o)){r[o]=U8(n);continue}r[o]=Ja(n)}return r}});var Ht,mb,B8,G8,q8,gb,jx,Dx,$x,V8,Jp,Vo,Yp,fb,Hx=l(()=>{"use strict";Ht=g(require("node:fs")),mb=g(require("node:path"));Ox();zx();B8="local-ws-trace.ndjson",G8=1e4,q8=1440*60*1e3,gb=e=>mb.default.join(e.logsDir,B8),jx=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},Dx=e=>{if(!Ht.default.existsSync(e))return;let t=Ht.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-q8,n=t.filter(s=>{let i=jx(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-G8);Ht.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},$x=(e,t)=>{let r=gb(e);Ht.default.mkdirSync(mb.default.dirname(r),{recursive:!0}),Ht.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),Dx(r)},V8=e=>e.parsed===null?{_empty:!0}:Ja(e.parsed),Jp=(e,t,r)=>{let o=Ix(r);$x(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:V8(o)})},Vo=(e,t)=>{$x(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Ja({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Yp=(e,t=80)=>{let r=gb(e);if(Dx(r),!Ht.default.existsSync(r))return[];let o=Ht.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=jx(s);i!==null&&n.push(i)}return n.reverse()},fb=e=>{let t=gb(e);Ht.default.existsSync(t)&&Ht.default.writeFileSync(t,"","utf8")}});var qr,Fx,K8,hb,Xp,Ux=l(()=>{"use strict";qr=g(require("node:fs")),Fx=g(require("node:path")),K8=256e3,hb=e=>{qr.default.mkdirSync(Fx.default.dirname(e),{recursive:!0}),qr.default.writeFileSync(e,"","utf8")},Xp=(e,t=K8)=>{if(!qr.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=qr.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=qr.default.openSync(e,"r");try{qr.default.readSync(a,i,0,s,n)}finally{qr.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var Ya=l(()=>{"use strict";Tx();Hx();Ux()});var yb,Sb,Bx=l(()=>{"use strict";yb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Sb=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${yb(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${yb(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${yb(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var Gx=l(()=>{"use strict";Bx()});var Ab,bb=l(()=>{"use strict";Ab=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var Pb=l(()=>{"use strict";Na()});var wb,vb,qx=l(()=>{"use strict";Pb();wb=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},vb=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var Vx=l(()=>{"use strict";bb();qx()});var Kx,Xa,_b,Za=l(()=>{"use strict";bb();Kx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xa=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=Kx(e),r=Kx(Ab(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},_b=`(function () {
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
})();`});var Ko,J8,Wb,Jx=l(()=>{"use strict";Ko=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),J8=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},Wb=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Ko(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Ko(r.direction):Ko(r.kind),i=`trace-body-${o}`,a=Ko(J8(r.body));return`<tr>
        <td title="${Ko(r.at)}">${Ko(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${Ko(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var Xx,Y8,Yx,Lb,Zx=l(()=>{"use strict";He();Mt();Xx=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},Y8=e=>Xx(e)===Zt?kn:Ln,Yx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lb=e=>{let t=Y8(e.installDir),o=`AW_HOME="$HOME/${Xx(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${Yx(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${Yx(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var Qx=l(()=>{"use strict";Za();Jx();Zx();Za()});var X8,ur,Qa=l(()=>{"use strict";X8=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),ur=X8});var eI,tI,rI,oI,nI,sI,iI,fs=l(()=>{"use strict";eI="projects",tI="knowledge",rI="chunks.ndjson",oI="lessons.ndjson",nI="error-chunks.ndjson",sI="usage-stats.json",iI="knowledge-location.json"});var Zp,Z8,Qp,kb=l(()=>{"use strict";Zp=g(require("node:path"));fs();Z8=(e,t)=>{let r=t.trim(),o=Zp.default.join(e.installDir,eI,r,tI);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:Zp.default.join(o,rI),memoryRunsFilePath:Zp.default.join(o,oI)}},Qp=Z8});var Eb,Q8,aI,lI=l(()=>{"use strict";Eb=g(require("node:fs"));fs();Mo();Q8=e=>{let t=ot(e.projectFolderPath),r=`${t.metaDirPath}/${iI}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};Eb.default.mkdirSync(t.metaDirPath,{recursive:!0}),Eb.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},aI=Q8});var hs,dI,cI,e4,uI,pI=l(()=>{"use strict";hs=g(require("node:fs")),dI=g(require("node:path"));bo();Mo();kb();lI();cI=(e,t)=>{hs.default.existsSync(e)&&(hs.default.existsSync(t)&&hs.default.statSync(t).size>0||(hs.default.mkdirSync(dI.default.dirname(t),{recursive:!0}),hs.default.copyFileSync(e,t)))},e4=e=>{let t=ot(e.projectFolderPath),r=Qp(e.layout,e.projectId),o=`${t.memoryDirPath}/${Mn}`;cI(t.ragChunksFilePath,r.ragChunksFilePath),cI(o,r.memoryRunsFilePath),aI({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},uI=e4});var Cb,t4,mI,gI=l(()=>{"use strict";Cb=g(require("node:fs"));Mo();t4=e=>{let t=ot(e);if(!Cb.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(Cb.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},mI=t4});var fI,r4,ys,em=l(()=>{"use strict";fI=g(require("node:path"));bo();Mo();pI();gI();kb();r4=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=mI(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){uI({layout:e.layout,projectFolderPath:t,projectId:o});let s=Qp(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=ot(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:fI.default.join(n.memoryDirPath,Mn),projectId:null}},ys=r4});var tm,n4,rm,Rb=l(()=>{"use strict";tm=g(require("node:fs"));fs();n4=(e,t=500)=>{if(!tm.default.existsSync(e))return;let r=tm.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);tm.default.writeFileSync(e,`${o.join(`
`)}
`)},rm=n4});var om,s4,Jo,Tb=l(()=>{"use strict";om=g(require("node:path"));fs();em();s4=e=>{let t=ys(e);if(t===null)return null;let r=om.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:om.default.join(r,sI),errorChunksFilePath:om.default.join(r,nI)}},Jo=s4});var yI,el,SI,hI,xb,AI,l4,Ib,bI,Ob,Mb,Nb,zb=l(()=>{"use strict";yI=require("node:crypto"),el=g(require("node:fs")),SI=g(require("node:path"));Qa();fs();Tb();hI=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),xb=e=>{if(!el.default.existsSync(e))return hI();try{let t=JSON.parse(el.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return hI()},AI=(e,t)=>{el.default.mkdirSync(SI.default.dirname(e),{recursive:!0}),el.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},l4=e=>{let t=ur(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,yI.createHash)("sha256").update(o).digest("hex").slice(0,16)},Ib=e=>{let t=Jo(e);return t===null?null:xb(t.usageStatsFilePath)},bI=e=>{if(e.chunkIds.length===0)return;let t=Jo(e);if(t===null)return;let r=xb(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;AI(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},Ob=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=Jo(e);if(r===null)return null;let o=l4(t),n=xb(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return AI(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},Mb=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,Nb=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var tl,PI,c4,d4,wI,u4,jb,rl,Ss,Db,As,$b,Hb=l(()=>{"use strict";tl=g(require("node:fs")),PI=g(require("node:path"));Qa();em();Rb();zb();c4="http://127.0.0.1:11434",d4="nomic-embed-text",wI=(e,t,r)=>ys({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,u4=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},jb=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},rl=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||c4,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||d4;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},Ss=(e,t,r)=>{let o=wI(e,t,r);if(o===null||!tl.default.existsSync(o))return[];let n=tl.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},Db=async e=>{let t=ur(e.text),r=jb(t);if(r.length===0)return 0;let o=wI(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;tl.default.mkdirSync(PI.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await rl(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};tl.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return rm(o),n},As=async e=>{let t=await rl(e.query);if(t===null)return[];let r=e.minScore??0,s=Ss(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:u4(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return bI({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},$b=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var ol,vI,p4,m4,Fb,Ub,Bb,_I=l(()=>{"use strict";ol=g(require("node:fs")),vI=g(require("node:path"));Qa();Tb();Rb();Hb();p4=e=>{if(!ol.default.existsSync(e))return[];let t=ol.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},m4=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},Fb=async e=>{let t=Jo(e);if(t===null)return 0;let r=ur(e.text),o=jb(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;ol.default.mkdirSync(vI.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await rl(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};ol.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return rm(n,200),s},Ub=async e=>{let t=Jo(e);if(t===null)return[];let r=await rl(e.query);if(r===null)return[];let o=e.minScore??.3;return p4(t.errorChunksFilePath).map(s=>({chunk:s,score:m4(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},Bb=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Gb=l(()=>{"use strict";Hb();zb();_I()});var qb,WI=l(()=>{"use strict";qb={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var LI=l(()=>{"use strict";WI()});var he,Vb,Kb=l(()=>{"use strict";LI();he=qb,Vb=`
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
`.trim()});var g4,f4,Jb,kI,Yb,EI=l(()=>{"use strict";Kb();Za();g4=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,f4=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],Jb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kI=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${g4}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,Yb=e=>{let t=f4.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=Jb(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=Jb(e.installBundleVersionLabel?.trim()??"unknown"),s=kI("brand brand-in-sidebar",n),i=kI("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${Jb(e.title)} \xB7 Agent Witch Local</title>
  <style>${Vb}</style>
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
  <script>${_b}</script>
</body>
</html>`}});var nm,nl,sm=l(()=>{"use strict";nm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nl=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${nm(e.syncMessage)}</p>`:"",o=nm(e.manageHref),n=nm(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${nm(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var Xb,Zb,Qb,CI=l(()=>{"use strict";Xb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,Zb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,Qb=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var RI=l(()=>{"use strict";EI();sm();CI()});var bs,eP,TI=l(()=>{"use strict";Za();bs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eP=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${bs(e.wakeError)}</div>`:"",a=Xa(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${bs(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${bs(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${bs(o)}</p>
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
        <p class="home-card-meta">${bs(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${bs(n)}</p>
      </a>
    </div>`}});var xI=l(()=>{"use strict";TI()});var im,am,lm,II,tP=l(()=>{"use strict";im="support-reply",am="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",lm=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),II=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var cm,OI,MI=l(()=>{"use strict";tP();cm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OI=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions (pass <strong>70</strong>, up to <strong>5</strong> scored revisions; judge scores prompt text only), (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Writers and folder</h2>
      <p>You choose the judge and the improver. Each one has an optional instructions field, used with the goal. In wizard step 2 the judge scores prompt wording only. In step 4 the runner executes in the folder you chose and the judge scores that run. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves the judge and improver blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder. When only one writer is installed, omit judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed (useThisPrompt). Do not use the prompt when status is stopped or failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <p>POST <span class="mono">/prompt-optimizer/skills/query</span> with JSON <span class="mono">{ "workingDirectory", "query", "limit?" }</span> searches <span class="mono">.cursor/skills/*/SKILL.md</span> in that folder (TF-IDF). Use it before inventing a new skill.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${cm(am)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${cm(lm)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${cm(II)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${cm(im)}">Run this sample</a>
      </div>
    </section>`});var C,Ps=l(()=>{"use strict";C=e=>e==="passed"||e==="stopped"||e==="failed"});var NI,rP,Yo,oP,dm=l(()=>{"use strict";NI="Stopped at the round limit. The best prompt is kept.",rP="Stopped because the score stopped rising. The best prompt is kept.",Yo="Finished. The best prompt is the result.",oP="Wizard ended. Progress from finished steps is kept."});var Vr,nP=l(()=>{"use strict";Vr=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var h4,y4,sl,zI,um=l(()=>{"use strict";h4=/\n+|;\s+/,y4=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,sl=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(h4).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,y4(s)]},[]);return[...t,...o]},[]),zI=e=>{let t=sl(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var se,ws=l(()=>{"use strict";se=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var il,sP=l(()=>{"use strict";um();ws();il=e=>{let t=[...e.priorRounds,e.current],r=se(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:zI(o)}}});var iP,S4,A4,pm,aP=l(()=>{"use strict";iP={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},S4=e=>{try{let t=JSON.parse(e.fragment);return{...iP,objects:[...e.objects,t]}}catch{return{...iP,objects:e.objects}}},A4=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:S4(r)},pm=e=>[...e].reduce(A4,iP).objects});var b4,lP,P4,jI,cP=l(()=>{"use strict";aP();b4=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},lP=e=>{let t=pm(e).filter(b4),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},P4=(e,t)=>({...e,passed:e.score>=t}),jI=(e,t)=>{let r=lP(e);return r===null?null:P4(r,t)}});var dP,uP,mm=l(()=>{"use strict";dP="The judge reply needs a score and a reason.",uP="The improver reply was empty."});var DI,$I=l(()=>{"use strict";DI=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var HI,FI=l(()=>{"use strict";HI=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var v4,UI,BI=l(()=>{"use strict";$I();FI();dm();um();v4=e=>{let t=sl(e);return t.length===0?rP:`${rP} Avoid: ${t.join("; ")}.`},UI=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:NI};if(DI(e.scores)>=3){let t=e.scores.map((r,o)=>({score:r,reasons:e.reasons?.[o]??""}));return{type:"stopped",errorMessage:v4(HI(t))}}return null}});var Kr,_4,Xo,GI,gm=l(()=>{"use strict";Kr=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},_4=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,Xo=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",_4(e.tokens),`Delay: ${Kr(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},GI=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var W4,qI,VI=l(()=>{"use strict";cP();W4=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,qI=e=>{let r=(W4.exec(e)?.[1]??e).trim();return r.length===0||lP(r)!==null?null:r}});var KI,fm,JI=l(()=>{"use strict";gm();VI();mm();KI=e=>({type:"call",role:"judge",choice:e.choice,prompt:GI({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),fm=e=>{let t=qI(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:uP}}:{nextPrompt:t,continuation:KI({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var pP,YI=l(()=>{"use strict";nP();sP();cP();mm();dm();BI();mm();JI();pP=e=>{let t=jI(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:dP}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=UI({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=il({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:Vr({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var al,mP=l(()=>{"use strict";al=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var XI=l(()=>{"use strict"});var ZI=l(()=>{"use strict";XI()});var Zo,QI=l(()=>{"use strict";Zo=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var L4,gP,eO=l(()=>{"use strict";gm();L4=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,gP=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",L4(e.tokens),`Delay: ${Kr(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var k4,E4,C4,fP,tO=l(()=>{"use strict";k4=/[A-Za-z0-9_./~-]{3,180}/g,E4=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,C4=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||E4.test(t)},fP=(e,t=12)=>{let r=[];for(let o of e.matchAll(k4)){let n=o[0].replace(/\.+$/,"");if(!(!C4(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var ll,rO=l(()=>{"use strict";ll=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var hm,hP,oO,cl,yP=l(()=>{"use strict";hm=e=>Math.floor(e/2),hP=e=>Math.max(hm(e)+1,e-20),oO=(e,t)=>e>=t?"passes":e>=hP(t)?"close":e>=hm(t)?"weak":"bad",cl=e=>[{band:"bad",label:`0\u2013${hm(e)-1} bad`},{band:"weak",label:`${hm(e)}\u2013${hP(e)-1} weak`},{band:"close",label:`${hP(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var ym,SP=l(()=>{"use strict";yP();ym=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${oO(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var Pt,AP=l(()=>{"use strict";Pt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var nO,sO=l(()=>{"use strict";nO=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var R4,T4,iO,aO=l(()=>{"use strict";Ps();SP();AP();sO();R4=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],T4=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",iO=e=>{let t=e.wizard;if(t===void 0)return[];let r=Pt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=R4.map((h,y)=>{let u=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:h,state:u,detail:null}}).filter((h,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=ym(e),d=c.filter(h=>h.id==="round-0"),p=nO(t)&&(!n||a)?c.filter(h=>h.id!=="round-0"):[],m=C(e.status)&&!s,S=m?[{id:"end",label:T4(e),state:"done",detail:e.errorMessage}]:[];if(m&&S.length>0){let h=Math.min(r,i.length),y=i.slice(0,h).map(u=>({...u,state:"done"}));return[...d,...y,...S,...p]}return[...d,...i,...p,...S]}});var x4,bP,lO=l(()=>{"use strict";Ps();SP();aO();x4=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",bP=e=>{if(e.wizard!==void 0)return iO(e);let t=ym(e),r=C(e.status)?[{id:"end",label:x4(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var dl,cO=l(()=>{"use strict";dl=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var dO=l(()=>{"use strict";Mt()});var uO,ul,pl,_s,Sm,PP,pO=l(()=>{"use strict";dO();uO="/prompt-optimizer/agent",ul=`${nr}${uO}`,pl=`${nr}/prompt-optimizer`,_s="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",Sm=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${_s}`,PP="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var pr=l(()=>{"use strict"});var re,ml=l(()=>{"use strict";pr();re=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var wP,mO=l(()=>{"use strict";wP="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var gO,fO=l(()=>{"use strict";gO=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var gl,yO=l(()=>{"use strict";fO();pr();gl=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:gO(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null})});var vP,SO=l(()=>{"use strict";pr();vP=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null})});var _P,AO=l(()=>{"use strict";pr();_P=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var bO,fl,PO=l(()=>{"use strict";bO=["generalize","evaluate","separate","optimize_modules"],fl=(e,t)=>{let r=bO.indexOf(t);if(r===-1)return e;let o=bO.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var Am,WP=l(()=>{"use strict";um();Am=e=>{let t=sl(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var hl,wO=l(()=>{"use strict";WP();hl=e=>{let t=Am(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var O4,M4,N4,vO,_O=l(()=>{"use strict";O4=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),M4=/^\{\{[a-zA-Z0-9_-]+\}\}$/,N4=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(O4(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},vO=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>M4.test(n)?n:N4(n,r)).join("")}});var LP,WO=l(()=>{"use strict";_O();LP=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:vO(o.prompt,t)}))}))});var z4,yl,LO=l(()=>{"use strict";pr();WP();z4=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),yl=e=>{let t=Am(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=z4(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Sl,kO=l(()=>{"use strict";mP();Sl=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return al({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Al,EP=l(()=>{"use strict";ws();Al=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var CP,EO=l(()=>{"use strict";EP();CP=e=>{let t=Al({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Qo,CO=l(()=>{"use strict";Qo=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var j4,D4,oe,bm=l(()=>{"use strict";ml();j4=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},D4=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,oe=e=>{let t=re(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:j4(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>D4(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var RO,TO=l(()=>{"use strict";ml();bm();RO=e=>{let t=oe(e.wizard),r=re(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var RP,xO=l(()=>{"use strict";TO();RP=e=>{let t=RO({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var $4,IO,OO=l(()=>{"use strict";$4=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},IO=e=>[...e].reduce($4,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var H4,MO,NO=l(()=>{"use strict";H4=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},MO=e=>[...e].reduce(H4,{out:"",inString:!1,escaped:!1}).out});var F4,U4,zO,jO=l(()=>{"use strict";OO();NO();F4=e=>e.charCodeAt(0)===65279?e.slice(1):e,U4=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},zO=e=>MO(IO(U4(F4(e))))});var B4,G4,q4,DO,V4,Ws,Pm=l(()=>{"use strict";aP();jO();B4=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},G4=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},q4=e=>[...e].reduce(G4,{out:"",inString:!1,escaped:!1}).out,DO=e=>{let t=pm(e);return t.length===0?null:t[t.length-1]},V4=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Ws=e=>{let t=zO(B4(e)),r=DO(t);if(r!==null)return r;let o=q4(t),n=DO(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw V4(i)}}});var K4,J4,TP,$O,HO=l(()=>{"use strict";K4=/^[a-z0-9][a-z0-9-]{0,62}$/,J4=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return K4.test(t)?t:""},TP=e=>e.replace(/\s+/gu," ").trim(),$O=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=J4(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=TP(n.name),a=TP(n.description),c=TP(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var FO,UO,BO=l(()=>{"use strict";FO=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},UO=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var xP,GO=l(()=>{"use strict";Pm();HO();BO();xP=(e,t)=>{let r=(()=>{try{return Ws(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(FO(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(UO).filter(a=>a!==null),i=$O({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var IP,qO=l(()=>{"use strict";IP=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var OP,VO=l(()=>{"use strict";OP=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var MP,KO=l(()=>{"use strict";ml();bm();MP=e=>{let t=oe(e.wizard),r=re(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var NP,JO=l(()=>{"use strict";NP=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var wt,Y4,zP,YO=l(()=>{"use strict";wt=g(Pi());Pm();Y4=(0,wt.isType)({name:wt.isNonEmptyString,description:wt.isString,sampleValue:wt.isString}),zP=e=>{let t=Ws(e);if(!(0,wt.isType)({templatedPrompt:wt.isNonEmptyString,variables:(0,wt.isArrayWithEachItem)(Y4)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var ie,X4,Z4,jP,XO=l(()=>{"use strict";ie=g(Pi());pr();Pm();X4=(0,ie.isType)({id:ie.isNonEmptyString,title:ie.isNonEmptyString,prompt:ie.isNonEmptyString,order:ie.isNumber}),Z4=(0,ie.isType)({id:ie.isNonEmptyString,title:ie.isNonEmptyString,summary:ie.isString,topology:(0,ie.isOneOf)("chain","parallel"),modules:(0,ie.isArrayWithEachItem)(X4),recommended:ie.isBoolean}),jP=e=>{let t=Ws(e);if(!(0,ie.isType)({options:(0,ie.isArrayWithEachItem)(Z4)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Ls,ZO=l(()=>{"use strict";Ls=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var Q4,DP,$P=l(()=>{"use strict";Q4=/\{\{([a-zA-Z0-9_-]+)\}\}/g,DP=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(Q4,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var vt,_t,QO=l(()=>{"use strict";ws();$P();vt=e=>DP(e.templatedPrompt,e.variables),_t=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return se(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??vt(e.wizard)}});var e3,en,eM=l(()=>{"use strict";e3=/\{\{([a-zA-Z0-9_-]+)\}\}/g,en=(e,t)=>e.replace(e3,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var t3,tn,wm=l(()=>{"use strict";t3=/\{\{([a-zA-Z0-9_-]+)\}\}/g,tn=e=>{let t=new Set,r=[];for(let o of e.matchAll(t3)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var bl,tM=l(()=>{"use strict";wm();bl=e=>e.variables.length>0||tn(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var HP,FP=l(()=>{"use strict";pr();HP=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Pl,rM=l(()=>{"use strict";ws();FP();Pl=e=>{let t=e.wizard.evaluateSelectedRound??se(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:HP(r.judgement,e.passScore)}});var wl,oM=l(()=>{"use strict";wl=e=>e.length===1&&e[0].modules.length===1});var UP,nM=l(()=>{"use strict";UP=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var ye,vm,vl=l(()=>{"use strict";ye=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),vm=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var sM,iM=l(()=>{"use strict";vl();sM=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[ye("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),ye("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[ye("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var aM,lM=l(()=>{"use strict";Ps();vl();aM=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!C(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[ye("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),ye("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),ye("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",vm(e.writerLabel,e.folder)),ye("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[ye("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var cM,dM=l(()=>{"use strict";vl();cM=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[ye("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),ye("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[ye("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var uM,pM=l(()=>{"use strict";vl();uM=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[ye("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),ye("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",vm(e.writerLabel,e.folder)),...r?[ye("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var _m,mM=l(()=>{"use strict";Ps();iM();lM();dM();pM();_m=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(C(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return aM(r);case"evaluate":return sM({...r,currentRound:e.currentRound});case"separate":return uM(r);case"optimize_modules":return cM({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var _l,gr,gM=l(()=>{"use strict";_l=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),gr=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var r3,Wm,BP,fM=l(()=>{"use strict";wm();r3="wizardParam_",Wm=e=>`${r3}${e}`,BP=e=>{let t=tn(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=Wm(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var Ze,hM=l(()=>{"use strict";Ze=["generalize","evaluate","separate","optimize_modules"]});var R=l(()=>{"use strict";Ps();dm();YI();nP();gm();mP();ZI();QI();eO();tO();sP();rO();ws();lO();AP();yP();cO();pO();pr();ml();mO();yO();SO();AO();PO();wO();WO();LO();kO();EP();EO();CO();bm();xO();GO();qO();VO();KO();JO();YO();XO();ZO();QO();$P();eM();wm();tM();rM();oM();FP();nM();mM();gM();fM();hM()});var GP,km,o3,AM,bM=l(()=>{"use strict";GP=g(require("node:fs")),km=g(require("node:path")),o3=e=>km.default.join(km.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),AM=(e,t)=>{let r=o3(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;GP.default.mkdirSync(km.default.dirname(r),{recursive:!0}),GP.default.appendFileSync(r,o,"utf8")}});var ks,PM,n3,wM,s3,vM,Ft,J,_M,D,Qe=l(()=>{"use strict";ks=g(require("node:fs")),PM=g(require("node:path"));R();bM();n3=e=>e.wizard===void 0?e:{...e,wizard:vP(e.wizard)},wM=new Set,s3=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),vM=(e,t)=>{ks.default.mkdirSync(PM.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;ks.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),ks.default.renameSync(r,e)},Ft=e=>{if(!ks.default.existsSync(e))return[];try{let t=JSON.parse(ks.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(s3).map(n3):[]}catch{return[]}},J=(e,t)=>Ft(e).find(r=>r.id===t)??null,_M=(e,t)=>{wM.add(t);let r=Ft(e).filter(o=>o.id!==t);vM(e,r)},D=(e,t)=>{if(wM.has(t.id))return;let r=Ft(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];vM(e,o),AM(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var WM,Em,qP,on,VP,et,fr,ae,De=l(()=>{"use strict";WM=g(require("node:fs")),Em=g(require("node:os")),qP=g(require("node:path"));es();on="~",VP=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,et=e=>{let t=Em.default.homedir(),r=VP(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},fr=e=>{let t=e.trim().length===0?"~":e.trim(),r=rt(t),o=qP.default.isAbsolute(r)?VP(r):VP(qP.default.resolve(Em.default.homedir(),r));try{if(!WM.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:et(o)}},ae=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Em.default.homedir()});var KP=l(()=>{"use strict";Yi()});var i3,LM,kM=l(()=>{"use strict";KP();i3=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,LM=e=>{let t=Ro(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(i3)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var CM,Jr,a3,l3,EM,Cm,RM,c3,nt,TM,xM,IM,Wt=l(()=>{"use strict";KP();kM();CM=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),Jr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply"},a3="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",l3="The writer waited on terminal input and did not return a prompt.",EM=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Cm=e=>{let t=e.trim();if(t.length===0||t.length>=500||!EM.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>EM.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},RM=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},c3=e=>Cm(e.stdout)??Cm(e.stderr)??(RM(e.replyFile)?Cm(e.replyFile):null),nt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return a3;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?l3:null},TM=e=>{let t=e.trim();return t.length===0?null:nt(t)!==null?t:Cm(t)??(RM(t)?t:null)},xM=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],IM=e=>{let t=e.replyFileText?.trim()??"",r=nt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=c3({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null)return{ok:!1,errorMessage:o};let n=LM([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Ro(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var Es,Ut,Wl,OM,Rm,d3,MM,NM,zM,JP=l(()=>{"use strict";Es=g(require("node:fs")),Ut=g(require("node:path")),Wl=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},OM=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Rm=(e,t)=>{let r=Wl(e);return r.length>0?r:Wl(t)},d3=e=>{let t=Rm(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${OM(o)}`,...n.length>0?[`description: ${OM(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},MM=e=>`.cursor/skills/${e}/SKILL.md`,NM=(e,t)=>{let r=Wl(t);if(r.length===0)return!1;let o=Ut.default.resolve(e),n=Ut.default.resolve(o,".cursor","skills"),s=Ut.default.resolve(o,MM(r));return s.startsWith(`${n}${Ut.default.sep}`)?Es.default.existsSync(s):!1},zM=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Rm(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Ut.default.resolve(e.workingDirectory);try{if(!Es.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=d3({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=MM(r.slug),n=Ut.default.resolve(t,".cursor","skills"),s=Ut.default.resolve(t,o);if(!s.startsWith(`${n}${Ut.default.sep}`))return{ok:!1,errorCode:"path"};if(Es.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Es.default.mkdirSync(Ut.default.dirname(s),{recursive:!0}),Es.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var u3,jM,DM,$M=l(()=>{"use strict";R();R();Qe();De();Wt();JP();u3=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,jM=e=>{let t=e.get("savedSkill");return t!==null&&u3.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},DM=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=J(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!C(r.status))return{kind:"redirect",location:o("skillError=working")};let n=se(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||nt(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=zM({workingDirectory:ae(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var Yr,Ll=l(()=>{"use strict";R();Yr=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=UP(t);return{...e,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:_l(r.variables)},updatedAt:new Date().toISOString()}}});var Xr,kl=l(()=>{"use strict";Xr=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var x,p3,Tm,ne,nn,FM,HM,UM,BM,Se=l(()=>{"use strict";x="manual",p3=["claude-cli","codex","cursor","antigravity"],Tm={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ne=e=>e===x?"You":e in Tm?Tm[e]:e,nn=e=>p3.filter(t=>e.includes(t)),FM=e=>{let t=nn(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},HM=(e,t)=>t===x?x:e.find(r=>r===t)??null,UM=(e,t,r)=>{let o=nn(e),n=HM(o,t),s=HM(o,r);return n===null||s===null?null:{judge:n,improver:s}},BM=(e,t,r)=>{let o=nn(e);return t===null||t.trim()===""?r!==x?r:o[0]??null:t===x?null:o.find(n=>n===t)??null}});var YP=l(()=>{"use strict";ht();Va();Yi()});var XP,GM,ZP,qM,VM=l(()=>{"use strict";XP={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},GM=e=>e.exitCode===null&&e.signalCode===null,ZP=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!GM(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!GM(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),qM=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),ZP(e).then(s=>{r({...XP,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var KM,El,JM,QP,m3,tw,rw,g3,f3,h3,YM,y3,ew,XM,Cl,ZM,S3,A3,Ue,sn=l(()=>{"use strict";KM=require("node:child_process"),El=g(require("node:fs")),JM=g(require("node:os")),QP=g(require("node:path"));YP();VM();Wt();m3=["claude-cli","codex","cursor","antigravity"],tw=18e4,rw=6e5,g3=12e4,f3=9e5,h3="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",YM="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",y3="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",ew=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},XM=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=ew(process.env[YM])??Math.max(r,rw));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:ew(process.env[y3])??f3;return Math.min(o,Math.max(g3,r))},Cl=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?ew(process.env[YM])??rw:tw,ZM=e=>`The writer timed out after ${e}ms.`,S3=e=>m3.includes(e),A3=e=>e===!0||process.env[h3]==="1",Ue=e=>new Promise(t=>{if(e.signal?.aborted){t(XP);return}if(A3(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!S3(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=zt(r,e.prompt,de({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!El.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:tw,s=QP.default.join(El.default.mkdtempSync(QP.default.join(JM.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=xM({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},p=(0,KM.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=S=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(S))};qM(p,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",ZP(p).then(S=>{m({ok:!1,errorMessage:ZM(n),errorKind:"writer_timeout",killSignal:S})})},n),p.stdout.on("data",S=>{a.push(Buffer.from(S))}),p.stderr.on("data",S=>{c.push(Buffer.from(S))}),p.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),p.on("close",()=>{if(d.settled)return;let S=El.default.existsSync(s)?El.default.readFileSync(s,"utf8"):null,h=IM({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:S});if(h.ok&&d.stopReason!=="abort"){m(h);return}d.stopReason===null&&m(h)})})});var QM,b3,Rl,xm,Im=l(()=>{"use strict";R();Se();QM=e=>e===x?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},b3=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Rl=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=pP({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:QM(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:ll(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=b3(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i}},xm=(e,t,r=null)=>{let o=fm({raw:t,judge:QM(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Om,ow=l(()=>{"use strict";Om=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var rN,Mm,Nm,eN,tN,nw,P3,oN,sw,w3,nN,v3,_3,sN,iN=l(()=>{"use strict";rN=require("node:child_process"),Mm=g(require("node:fs")),Nm=g(require("node:path"));R();eN=4e3,tN=12e3,nw=(e,t)=>{let r=(0,rN.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},P3=e=>nw(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",oN=e=>{let t=nw(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},sw=(e,t)=>{let r=Nm.default.resolve(e,t),o=Nm.default.relative(e,r);if(o.startsWith("..")||Nm.default.isAbsolute(o)||!Mm.default.existsSync(r)||!Mm.default.statSync(r).isFile())return null;let n=Mm.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>eN?`${n.slice(0,eN)}
\u2026truncated`:n},w3=e=>e.length>tN?`${e.slice(0,tN)}
\u2026truncated`:e,nN=e=>{let t=fP(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,sw(e.workingDirectory,n)])),o=P3(e.workingDirectory);return{git:o,status:o?oN(e.workingDirectory):{},files:r,paths:t}},v3=(e,t)=>{let r=nw(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=sw(e,t);return o===null?`${t} is missing.`:o},_3=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",sN=e=>{let t=e.before.git?oN(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=sw(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>v3(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:_3(e.before.git,e.before.paths.length>0),evidence:w3(i.join(`

`))}}});var lw,U,cw,ke,aN,W3,L3,lN,Cs,cN,Rs,k3,E3,Tl,iw,aw,C3,dN,R3,T3,x3,uN,I3,pN,mN,O3,M3,gN,fN=l(()=>{"use strict";lw=require("node:child_process"),U=g(require("node:fs")),cw=g(require("node:os")),ke=g(require("node:path")),aN=8e6,W3=16e6,L3=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],lN=(e,t)=>{let r=(0,lw.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Cs=(e,t)=>(0,lw.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,cN=e=>{let t=lN(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},Rs=(e,t)=>{let r=ke.default.resolve(e,t),o=ke.default.relative(e,r);return o.startsWith("..")||ke.default.isAbsolute(o)?null:r},k3=(e,t)=>{let r=Rs(e,t);if(r===null||!U.default.existsSync(r))return null;let o=U.default.statSync(r);return!o.isFile()||o.size>aN?null:U.default.readFileSync(r)},E3=(e,t,r)=>{let o=Rs(e,t);o!==null&&(U.default.mkdirSync(ke.default.dirname(o),{recursive:!0}),U.default.writeFileSync(o,r))},Tl=(e,t)=>{let r=Rs(e,t);r===null||!U.default.existsSync(r)||U.default.rmSync(r,{recursive:!0,force:!0})},iw=(e,t)=>Cs(e,["cat-file","-e",`HEAD:${t}`]),aw=e=>{let t=lN(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},C3=e=>ke.default.resolve(e)!==ke.default.resolve(cw.default.homedir()),dN=e=>{if(!U.default.existsSync(e))return 0;let t=U.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?U.default.readdirSync(e).reduce((r,o)=>r+dN(ke.default.join(e,o)),0):0},R3=(e,t,r)=>{let o=Rs(e,r);if(o===null||!U.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(dN(o)>W3)return{relativePath:r,existed:!0,copyDir:null};let n=ke.default.join(t,"cache",r);return U.default.mkdirSync(ke.default.dirname(n),{recursive:!0}),U.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},T3=400,x3=32e6,uN=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!U.default.existsSync(s)))for(let i of U.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=ke.default.join(s,i),c=U.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>aN)){if(t.length>=T3||r+c.size>x3){o=!1;return}r+=c.size,t.push(ke.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},I3=(e,t,r)=>{let o=Rs(e,r);if(o===null||!U.default.existsSync(o))return null;let n=k3(e,r);if(n===null)return"skip";let s=ke.default.join(t,"files",r);return U.default.mkdirSync(ke.default.dirname(s),{recursive:!0}),U.default.writeFileSync(s,n),s},pN=e=>{let t=U.default.mkdtempSync(ke.default.join(cw.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?cN(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:uN(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,I3(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?aw(e.workingDirectory):null,isolateCaches:C3(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:L3.map(i=>R3(e.workingDirectory,t,i))}},mN=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Tl(e.workingDirectory,t);return}E3(e.workingDirectory,t,U.default.readFileSync(r))}},O3=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?mN(e,t):iw(e.workingDirectory,t)?Cs(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Tl(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&iw(e.workingDirectory,t)&&Cs(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!iw(e.workingDirectory,t)&&Cs(e.workingDirectory,["reset","-q","HEAD","--",t])},M3=(e,t)=>{let r=Rs(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Tl(e.workingDirectory,t.relativePath),U.default.mkdirSync(ke.default.dirname(r),{recursive:!0}),U.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Tl(e.workingDirectory,t.relativePath);return}if(U.default.existsSync(r))for(let o of U.default.readdirSync(r)){let n=ke.default.join(r,o);U.default.statSync(n).mtimeMs>=e.startedMs-1e3&&U.default.rmSync(n,{recursive:!0,force:!0})}}}},gN=e=>{try{if(e.git){if(aw(e.workingDirectory)!==e.head&&(!(e.head===null?Cs(e.workingDirectory,["update-ref","-d","HEAD"]):Cs(e.workingDirectory,["reset","--hard",e.head]))||aw(e.workingDirectory)!==e.head))throw new Error("head");let r=cN(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))O3(e,o)}else{if(e.complete)for(let t of uN(e.workingDirectory).paths)e.files[t]===void 0&&Tl(e.workingDirectory,t);for(let t of Object.keys(e.files))mN(e,t)}for(let t of e.caches)M3(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{U.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var zm,jm,N3,z3,j3,D3,$3,hN,H3,yN,SN=l(()=>{"use strict";R();Im();ow();iN();fN();Se();De();Wt();sn();zm=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),jm=e=>({...e,status:"stopped",errorMessage:Yo,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),N3=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),z3=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==x?t:e.improverModel!==x?e.improverModel:null}return e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null},j3=async e=>{let t=ae(e.cycle),r=nN({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=pN({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Sl({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Qo(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):al({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=XM({promptText:e.revision.promptText,isModuleRun:i}),c=Cl({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},p=await Ue({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=p.ok?sN({workingDirectory:t,before:r,writerReply:p.text}):null,S=gN(o),h={...e.cycle,revisions:e.cycle.revisions.map(y=>y.roundNumber===e.cycle.currentRound?d:y)};return p.ok?!S.ok||m===null?{ok:!1,cycle:zm(h,S.ok?"Could not put the folder back after the run.":S.errorMessage)}:{ok:!0,cycle:h,run:{output:p.text.trim(),tokens:p.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:p.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:jm(h)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:zm(h,p.errorMessage,Jr(p))})},D3=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:j3({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),$3=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),hN=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Ue({writerAgent:e.reviewer,workingDirectory:ae(e.cycle),prompt:gP({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:jm(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},H3=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===x)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Ue({writerAgent:t.judgeModel,workingDirectory:ae(t),prompt:Zo({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Rl(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?jm(o):(e.onWriterFailure?.(t.judgeModel),zm(o,n.errorMessage,Jr(n)))},yN=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return H3(e);let o=z3(t),n=await D3({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?N3(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===x){let p=await hN({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...$3(s,p.text),judgePhase:void 0}}let i=await Ue({writerAgent:t.judgeModel,workingDirectory:ae(t),prompt:Xo({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?jm(s):(e.onWriterFailure?.(t.judgeModel),zm(s,i.errorMessage,Jr(i)));let a=await hN({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Rl(s,i.text,c);return Om(d,a.text)}});var an,Dm=l(()=>{"use strict";R();an=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:il({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:ll(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var $m,F3,U3,dw,AN=l(()=>{"use strict";R();Im();SN();Dm();Wt();Se();De();sn();$m=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),F3=e=>({...e,status:"stopped",errorMessage:Yo,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),U3=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?F3(e):(n?.(r),$m(e,t.errorMessage,Jr(t))),dw=async(e,t,r,o)=>{let n=e.revisions.find(c=>c.roundNumber===e.currentRound);if(n===void 0)return $m(e,"This round has no prompt.");if(e.status==="judging")return yN({cycle:e,revision:n,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return $m(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===x)return e;let s=an(e);if(s===null)return $m(e,"The improver needs the score and the reason.");let i=await Ue({writerAgent:e.improverModel,workingDirectory:ae(e),prompt:Vr({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:Cl()}),a=U3(e,i,e.improverModel,r,t);return a!==null?a:xm(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var xl,uw=l(()=>{"use strict";xl=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var Il,pw,PN,bN,B3,G3,Hm,wN,vN,q3,V3,ln,_N,WN,Ol=l(()=>{"use strict";R();Ll();kl();Se();De();Wt();sn();AN();uw();Il=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),pw=(e,t,r)=>e.wizard===void 0||t===null?Il(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},PN=(e,t,r)=>CM(r)?Il(e,r.errorMessage,Jr(r)):pw(e,t,r.errorMessage),bN=e=>{let t=e.wizard;return t===void 0||xl(e).length===0?e:{...e,wizard:Ls({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},B3=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",G3=e=>{let t=e.wizard;if(t===void 0)return e;let r=Al({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Ls({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Hm=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),wN=e=>e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null,vN=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},q3=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=wN(e);if(n===null)return Il(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??vt(o),i=hl({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:vN(e,"generalize")}),a=await Ue({writerAgent:n,prompt:i,workingDirectory:ae(e),signal:t});if(!a.ok)return r?.(n),PN(e,"generalize",a);try{let c=zP(a.text),d=Ls({wizard:{...o,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:_l(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return bl(d)?ln({...p,wizard:{...d,gate:null}}):Hm(p,"generalize")}catch(c){return pw(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},V3=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=wN(e);if(n===null)return Il(e,"Choose a writer to suggest splits.");let s=_t({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=yl({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:vN(e,"separate")}),a=await Ue({writerAgent:n,prompt:i,workingDirectory:ae(e),signal:t});if(!a.ok)return r?.(n),PN(e,"separate",a);try{let c=jP(a.text),d=LP(c,o.variables),p=Ls({wizard:{...o,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:p};return wl(d)?Yr(m,d[0]):Hm(m,"separate")}catch(c){return pw(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},ln=e=>{let t=e.wizard;if(t===void 0)return e;let r=vt(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},_N=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Il(e,"This module is missing.");let n=gr(r),s=en(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==x?e.runnerModel:e.judgeModel!==x?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:re(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},WN=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return dw(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return q3(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return V3(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await dw(e,t,r,o);if(C(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&xl(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=se(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&Pl({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let p=bN(Hm(a,i));return Xr(p)}let c=Hm(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=CP({wizard:{...c.wizard,modules:c.wizard.modules.map((m,S)=>S===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:B3(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?bN(d):G3(d)}return s}return n.phase==="complete",e}});var Ts,Fm=l(()=>{"use strict";R();Se();Ts=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:IP(r,e.judgeModel===x),updatedAt:new Date().toISOString()}}});var LN,xs,Um=l(()=>{"use strict";Wt();LN=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:TM(e.promptText)},xs=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t===void 0?null:LN(t);if(r!==null)return r.trim();for(let o=e.revisions.length-1;o>=0;o-=1){let n=LN(e.revisions[o]);if(n!==null)return n.trim()}return null}});var Bt,Is=l(()=>{"use strict";Bt='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var mw,kN,K3,EN,CN,gw=l(()=>{"use strict";R();Se();De();Is();mw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kN=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',K3=e=>{let t=kN(e.state),r=`<h2>${mw(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${mw(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Bt}</button></div><template>${r}</template></li>`},EN=e=>{let t=e.wizard;if(t===void 0)return"";let r=_m({status:e.status,wizard:t,writerLabel:ne(e.judgeModel),runnerLabel:ne(e.runnerModel??e.judgeModel),folderDisplay:et(ae(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(K3).join("")}</ol>`},CN=e=>{let t=e.wizard;if(t===void 0)return"";let r=_m({status:e.status,wizard:t,writerLabel:ne(e.judgeModel),runnerLabel:ne(e.runnerModel??e.judgeModel),folderDisplay:et(ae(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${kN(n.state)}<span class="sdlc-pipeline-label">${mw(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var Lt,RN,TN,xN,fw=l(()=>{"use strict";R();Lt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RN="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",TN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Lt(RN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${Lt(i.name)}}}</strong> \u2014 ${Lt(i.description)} (sample: ${Lt(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Lt(r)}</pre>`,n=vt(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Lt(n)}</pre>`;return`${t}${o}${s}`},xN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Lt(RN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${Lt(n.name)}}}</strong> \u2014 ${Lt(n.description)} (sample: ${Lt(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${Lt(r)}</pre>`;return`${t}${o}`}});var IN,ON=l(()=>{"use strict";R();IN=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=Zo({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=Xo({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var hw,Bm,yw=l(()=>{"use strict";Is();ON();hw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bm=e=>{let t=IN(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${hw(r)}">${Bt}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${hw(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${hw(t)}</pre></template>`}});var Gm,Os,Sw=l(()=>{"use strict";uw();yw();Gm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Os=e=>{let t=xl(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${Gm(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,p=e.cycle.revisions.map(m=>{let S=m.judgement?.score,h=S==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${S}`,y=m.judgement?.reasons?.trim()??"",u=y.length===0?"":`<br><span class="muted">${Gm(y)}</span>`,A=Bm({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run});if(e.interactive){let b=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${b}> <span class="sdlc-wizard-revision-title">${Gm(h)}</span></label>${A}${u}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Gm(h)}</span>${A}${u}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var Aw,MN,NN,zN,bw=l(()=>{"use strict";Aw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),MN=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Aw(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Aw(t.prompt)}</pre></li>`).join("")}</ol>`,NN=e=>MN([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),zN=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Aw(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${MN(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Ml,J3,qm,Pw=l(()=>{"use strict";R();bw();Ml=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),J3=e=>{let t=e.wizard;return t===void 0?"":_t({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},qm=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=J3(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Ml(n.orchestratorSkill.fileName)}</code> \u2014 ${Ml(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${Ml(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=NN(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${Ml(r)} <span class="muted">${Ml(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Oe,Y3,X3,Z3,Q3,Vm,e6,t6,r6,o6,n6,s6,Ms,Km=l(()=>{"use strict";R();gw();fw();Sw();yw();Pw();Oe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Y3={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},X3=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Oe(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Oe(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Oe(o)}</pre></details>`;return`<h2>${Oe(e)}</h2>${n}`},Z3=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=vt(t).trim(),n=_t({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!C(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${X3("What is being evaluated",i)}`},Q3=(e,t)=>{let r=e.wizard;if(r===void 0||C(e.status))return"";let o=Y3[t];return o===void 0||r.phase!==o?"":CN(e)},Vm=(e,t,r)=>{let o=Q3(e,t),n=t==="wizard-2"?Z3(e):"";return`${o}${n}${r}`},e6=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},t6=e=>{let t=e.wizard;return t===void 0?"":TN(t)},r6=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Oe(a)}</span>`,d=Bm({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Oe(s)}${i}</span>${d}${c}</li>`}).join("")}</ul>`,o6=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Os({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=e6(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${r6(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=_t({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Oe(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Oe(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},n6=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Oe(n.title)}</strong> <span class="muted">(${Oe(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Oe(o.title)}</strong>${n}${Oe(s)}${qm(e,o)}</li>`}).join("")}</ul>`},s6=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Oe(i)}</span> <strong>${Oe(n.title)}</strong>${Oe(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Oe(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Os({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Ms=(e,t)=>{switch(t){case"wizard-1":return Vm(e,t,t6(e));case"wizard-2":return Vm(e,t,o6(e));case"wizard-3":return Vm(e,t,n6(e));case"wizard-4":return Vm(e,t,s6(e));default:return""}}});var i6,a6,jN,DN,$N=l(()=>{"use strict";R();Um();Wt();Km();i6=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},a6=e=>{let t=e.goal.trim();return t.length===0?null:t},jN=(e,t,r,o,n)=>{let s=nt(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},DN=(e,t)=>{let r=a6(e);if(t.id.startsWith("wizard-")){let s=Ms(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=dl(e,t);if(s!==null){let a=xs(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=se(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:jN(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:i6(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:jN(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var cn,HN,FN=l(()=>{"use strict";cn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HN=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${cn(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${cn(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${cn(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${cn(n)}</h2><pre class="mono">${cn(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${cn(e.goal)}</dd></div></dl>`;return`<h2>${cn(e.title)}</h2>${i}${t}${r}${o}${s}`}});var l6,UN,Nl,ww,Jm=l(()=>{"use strict";R();l6=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),UN=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||C(e.status))return null;let r=Pt(t);return r<0||r>3?null:`wizard-${r+1}`},Nl=(e,t)=>l6.has(t)?UN(e)===t:!1,ww="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var c6,Ym,vw=l(()=>{"use strict";c6='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Ym=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${c6}</button>`});var d6,BN,u6,_w,GN,p6,m6,g6,f6,qN,VN=l(()=>{"use strict";R();Dm();d6={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},BN=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},u6=e=>d6[e]??null,_w=(e,t)=>{let r=e.wizard,o=u6(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=Pt(r);return o<n||o===n},GN=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},p6=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:vt(t).trim();return o.length===0?null:hl({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:BN(e,"generalize")})},m6=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=an(e);return n===null?null:Vr({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=GN(e)?.promptText.trim()??_t({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:Zo({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},g6=e=>{let t=e.wizard;if(t===void 0)return null;let r=_t({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:yl({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:BN(e,"separate")})},f6=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=gr(t),s=en(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=an(e);return c===null?null:Vr({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=GN(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||C(e.status)&&i?.judgement!==null)?Xo({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):Sl({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:Qo(t,r).output,moduleTitle:o.title})},qN=(e,t)=>{if(!_w(e,t))return null;switch(t){case"wizard-1":return p6(e);case"wizard-2":return m6(e);case"wizard-3":return g6(e);case"wizard-4":return f6(e);default:return null}}});var h6,Xm,Ww=l(()=>{"use strict";R();h6=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},Xm=(e,t)=>{let r=e.wizard,o=h6(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=Pt(r);return o<n?"done":o===n&&C(e.status)&&e.status==="failed"?"failed":o<=n&&C(e.status)?"done":"pending"}});var y6,Ns,Zm=l(()=>{"use strict";Is();VN();Ww();y6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ns=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(Xm(e,t)==="pending")return""}else if(!_w(e,t))return"";let o=qN(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Bt}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${y6(o)}</pre></template>`}});var dn,zs,zl=l(()=>{"use strict";dn=e=>e.toLocaleString("en-US"),zs=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var Gt,S6,KN,JN,YN,XN,Lw=l(()=>{"use strict";R();$N();FN();Jm();vw();Is();Um();gw();Zm();zl();Gt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),S6=(e,t)=>{let r=dl(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?zs(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${dn(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Gt(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${Gt(r)}</span>`:"",d=HN(DN(t,e)),p=t.wizard!==void 0&&t.wizard.phase==="complete"&&C(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${Gt(e.id)}"`:"",m=Nl(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${Gt(ww)}"><input type="hidden" name="cycleId" value="${Gt(t.id)}"><input type="hidden" name="wizardStepId" value="${Gt(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",S=e.state==="active"&&e.id.startsWith("wizard-")?EN(t):"",h=o?"failed":e.state,y=o?xs(t):null,u=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Bt}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${Gt(y)}</pre></template>`:"",A=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Ns(t,e.id):"";return`<li class="sdlc-node sdlc-node-${h}" data-sdlc-step-id="${Gt(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${p} data-sdlc-node>${n}<span class="sdlc-node-label">${Gt(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${A}${u}</div></div>${S}<template>${d}</template></li>`},KN=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>S6(r,t)).join("")}</ol>`,JN=e=>`<div class="sdlc-score" aria-label="What the score means">${cl(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Gt(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,YN=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${Ym({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,XN=`<script>
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
</script>`});var Zr,ZN,A6,QN=l(()=>{"use strict";R();De();Wt();JP();Zr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ZN=e=>{if(!C(e.status))return"";let t=se(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=nt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Zr(t.reasons.trim())}</p>`,i=n===null?A6({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ae(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${Zr(n)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${o}${s}${i}</section>`},A6=e=>{let t=e.sourceSkill?.fileName??Wl(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=Rm(t,r),s=n.length>0&&NM(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Zr(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Zr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Zr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Zr(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Zr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Zr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var ez,tz=l(()=>{"use strict";ez=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var rz,b6,Qm,Be,eg,kw=l(()=>{"use strict";R();R();Se();tz();Um();Wt();rz=["Generalize","Evaluate","Separate","Optimize modules"],b6=e=>{let t=Pt(e),r=t>=0&&t<rz.length?rz[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},Qm=(e,t)=>{let r=xs(e),o=r===null?null:ez(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Be=(e,t)=>({title:e,detail:t,replyPreview:null}),eg=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:null}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!C(e.status)){let t=e.judgeModel;return Be(`${ne(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!C(e.status)){let t=e.judgeModel;return Be(`${ne(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===x?Be(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Be(`${ne(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Be(`${ne(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===x){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==x?Be(`${ne(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Be(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Be(`${ne(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=re(t);return Be(`${ne(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Be(`${ne(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=re(t);return Be(`${ne(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Be(`${ne(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===x){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Be("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Be(`${ne(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>nt(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=oe(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||C(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?Qm(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o="A writer or judge reply could not be used. Start a new run after fixing the issue.";return r!==void 0?Qm(e,{title:b6(r),detail:t.length>0?t:o}):Qm(e,{title:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(C(e.status)){let t=e.errorMessage?.trim()??"";return Qm(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var qt,jl=l(()=>{"use strict";Se();qt=e=>{if(e.status==="improving"&&e.improverModel===x)return!0;if(e.status!=="judging"||e.judgeModel!==x)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===x}});var oz,nz=l(()=>{"use strict";oz=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Qr,P6,sz,iz=l(()=>{"use strict";R();Qr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),P6=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Qr(r)}</p>`},sz=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Qr(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Qr(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Qr(a)}.</p>`}<pre class="mono">${Qr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Kr(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Qr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",m=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Qr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${P6(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Qr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Dl,w6,az,lz=l(()=>{"use strict";R();Wt();Dl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),w6=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=nt(t.promptText),n=t.judgement?.reasons?`<p class="muted">${Dl(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Dl(i)}.</p>`}<pre class="mono">${Dl(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Kr(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${Dl(d)}</pre>`:`<div class="alert-error">${Dl(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},az=e=>e.revisions.map(t=>w6(e,t)).join("")});var cz,dz=l(()=>{"use strict";R();cz=e=>{if(C(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Vt,v6,Ew,_6,W6,L6,k6,uz,pz,Cw=l(()=>{"use strict";dz();Vt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),v6="Stop this run? Writers will stop and the best prompt is kept.",Ew="End the wizard? Writers will stop and progress from finished steps is kept.",_6="Skip this module and pause at the step gate?",W6=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Vt(v6)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Vt(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,L6=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Vt(Ew)}"><input type="hidden" name="cycleId" value="${Vt(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,k6=e=>{let t=Vt(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Vt(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Vt(_6)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Vt(Ew)}">End wizard</button>
    </form>
  </div>`},uz=e=>{let t=cz(e);return t==="none"?"":t==="classic"?W6(e.id):t==="wizard_end_only"?L6(e.id):k6(e)},pz=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Vt(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Vt(Ew)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var mz,gz=l(()=>{"use strict";R();zl();mz=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=oe(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${dn(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${dn(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${re(r)}`}return""}});var E6,C6,fz,R6,hz,yz=l(()=>{"use strict";R();gz();Ww();Km();Zm();E6=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',C6=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',fz=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),R6=(e,t,r)=>{let o=Ms(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=mz(e,t),i=Xm(e,t),a=E6(i),c=C6(i),d=Ns(e,t,{forOutcomeSummary:!0}),p=`${a}<span class="sdlc-wizard-outcome-step-title">${fz(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${fz(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",S=i==="failed"&&t!=="wizard-4"?" open":"",h=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${h}"${m}${S}><summary aria-controls="${h}-body">${p}</summary><div class="sdlc-wizard-outcome-step-body" id="${h}-body">${o}</div></details>`},hz=e=>{let t=e.wizard;if(t===void 0||!C(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>R6(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var Sz,Az,bz=l(()=>{"use strict";Sz=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Az=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${Sz(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Sz(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var Rw,Pz,Tw=l(()=>{"use strict";Rw=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,Pz=(e,t)=>{if(Rw(e,t))return"Passed";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var wz,vz=l(()=>{"use strict";wz=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var tg,_z,Wz=l(()=>{"use strict";R();Tw();Tw();vz();tg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_z=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=oe(t),o=re(t),n=r.terminalStatusSuggestion==="passed"?"":wz(r,o),s=o-10,i=r.rows.map((c,d)=>{let p=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,h=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=p===void 0?c.status:Pz(p,o),u=p!==void 0&&Rw(p,o)?'<span aria-label="Passed">\u2713</span>':tg(y);return`<tr${h}><td>${tg(c.title)}</td><td>${tg(m)}</td><td>${c.tokens??"\u2014"}</td><td>${u}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${tg(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var un,rg,xw=l(()=>{"use strict";un=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rg=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${un(r.fileName)}</code> \u2014 ${un(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${un(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${un(i.name)}</strong> <code>.cursor/skills/${un(i.fileName)}/SKILL.md</code></p><p class="muted">${un(i.description)}</p><p>${un(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var T6,Lz,kz=l(()=>{"use strict";R();R();bz();Wz();xw();T6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lz=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!C(e.status)||t.modules.length===0)return"";let r=_z(e),o=Az(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=oe(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${T6(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${rg(e)}${a}${r}${o}</section>`}});var hr,$l=l(()=>{"use strict";hr=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var yr,og,Iw=l(()=>{"use strict";R();Lw();QN();kw();jl();nz();Dm();iz();lz();Cw();yz();kz();zl();De();$l();yr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),og=e=>{let t=!C(e.status)&&e.status!=="wizard_paused"&&!qt(e),r=eg(e),o=KN(bP(oz(e)),e),n=C(e.status)?"":uz(e),s=hz(e),i=Lz(e),a=ZN(e),c=e.errorMessage===null?"":`<div class="alert-error">${yr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?oe(e.wizard):null,S=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,h=!t&&e.wizard!==void 0&&C(e.status)&&(e.wizard.phase==="complete"||oe(e.wizard).passedModuleCount>0),y=h?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",u=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${yr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",A=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${yr(r.replyPreview)}</pre>`,b=r.detail.length===0&&u.length===0&&A.length===0||r.detail.length===0&&A.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${yr(r.detail)}${p}</p>`}${A}</div>`,f=e.revisions.find(lo=>lo.roundNumber===e.currentRound),w=e.status==="improving"?an(e):null,v=zs(e),W=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),L=qt(e)?sz({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:w?.promptText??f?.promptText??"",score:w?.score??f?.judgement?.score??null,reasons:w?.reasons??f?.judgement?.reasons??null,avoid:w?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:W?1:0}):"",E=e.wizard!==void 0&&e.wizard.phase==="complete"&&C(e.status),T=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!E&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?re(e.wizard):e.passScore,M=T?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${JN(I)}</div>`:"",B=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':C(e.status)?e.status==="failed"?'<span class="sdlc-run-badge sdlc-run-badge-failed">Failed</span>':E&&m!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",q=t?d:h?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',F=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${yr(et(ae(e)))}</li>`:"",v>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${dn(v)} so far</li>`:""].filter(lo=>lo.length>0),ct=F.length===0?"":`<ul class="sdlc-run-meta">${F.join("")}</ul>`,H=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,ge=E?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,ao=E?"":M.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${ge}</div>`:`<div class="sdlc-run-grid">${ge}${M}</div>`,Ct=az(e),YU=e.wizard!==void 0&&C(e.status)&&e.revisions.every(lo=>lo.roundNumber===0&&(lo.judgement===void 0||lo.judgement===null)),XU=Ct.length===0||YU?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${Ct}</div></section>`,ZU=`<p class="sdlc-run-goal" title="${yr(e.goal.trim())}">${yr(hr(e.goal))}</p>`,QU=E?`${c}${i}${s}${L}${a}`:`${c}${ao}${L}${s}${a}`,eB='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',tB=E?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${yr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${eB}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${B}</div>${ZU}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${q}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${yr(r.title)}</h2>${b}${u}${tB}</div></div>${ct}${H}</header>${QU}</section>${XU}`}});var Ez,Cz=l(()=>{"use strict";R();kl();Ez=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Pl({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:Xr(e)}});var Rz,Tz=l(()=>{"use strict";R();Ol();Rz=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!bl(t)?e:ln({...e,wizard:{...t,gate:null}})}});var xz,Iz=l(()=>{"use strict";R();Ll();xz=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!wl(t.splitOptions))return e;let r=t.splitOptions[0];return Yr(e,r)}});var x6,pn,ng=l(()=>{"use strict";Cz();Tz();Iz();Qe();x6=e=>{let t=Rz(e),r=Ez(t);return xz(r)},pn=(e,t)=>{let r=x6(t);return r!==t?(D(e,r),r):t}});var Oz,Sr,Hl=l(()=>{"use strict";R();Oz=e=>Ze.indexOf(e),Sr=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||C(e.status)?Ze.length:t.gate!==null?Oz(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?Oz(t.phase):null}});var Mz,Nz=l(()=>{"use strict";Mz=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var mn,zz,jz=l(()=>{"use strict";R();Nz();mn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zz=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Qo(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${mn(Mz(o))}</pre></div>`:"",s=tn(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=gr(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=Wm(c),m=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${mn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${mn(p)}">${mn(S)}</label>
        ${h}
        <input class="input" type="text" id="${mn(p)}" name="${mn(p)}" value="${mn(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var Fl,Dz,$z=l(()=>{"use strict";R();fw();jz();Sw();Cw();xw();Pw();Fl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Dz=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate,n=re(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?xN(r):"",a=o==="evaluate"?rg(e):"",c=o==="evaluate"?Os({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",p=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(T=>{let I=T.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',M=T.recommended?' <span class="sdlc-badge">Recommended</span>':"",B=r.selectedSplitOptionId===T.id||r.selectedSplitOptionId===null&&T.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${Fl(T.id)}" required${B}> <strong>${Fl(T.title)}</strong>${I}${M}</label>${qm(e,T)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],h=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=m?.title??"Module",u=m?.prompt??"",A=m?.status==="pending",b=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Fl(y)}</p>${A?zz({cycle:e,modulePrompt:u}):""}<p class="muted">Test run prompt preview: ${Fl(en(u,gr(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${Os({cycle:e,interactive:!1,caption:A?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",f=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":A?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",w=NP(r),v=w===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${w}</p>`,W=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",L=t?.active===!0?" sdlc-wizard-gate-active":"",E=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${W}"`:"";return`<section class="card sdlc-wizard-gate${L}"${E}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${f}</p>
    ${v}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Fl(e.id)}">
    ${i}
    ${a}
    ${c}
    ${p}
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
        <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue"${h}>Continue</button>
        <button class="btn btn-secondary" type="submit" name="intent" value="wizard-feedback-rerun" formnovalidate>Rerun with feedback</button>
      </div>
    </form>
    ${pz(e)}
  </section>`}});var I6,Hz,Fz=l(()=>{"use strict";R();Zm();I6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hz=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||C(e.status))return"";let r=(o,n)=>{let s=Ns(e,o);return`<h2 class="sdlc-wizard-active-head">${I6(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var Ow,Uz,Bz,eo,Gz,js=l(()=>{"use strict";R();Qe();Ow=new Map,Uz=e=>{let t=new AbortController;return Ow.set(e,t),t.signal},Bz=e=>{Ow.delete(e)},eo=e=>{Ow.get(e)?.abort()},Gz=(e,t)=>{let r=J(e,t);return r===null||r.wizard!==void 0?!1:(C(r.status)||(D(e,{...r,status:"stopped",errorMessage:Yo,updatedAt:new Date().toISOString()}),eo(t)),!0)}});var qz,Vz,Mw,Kz,Nw=l(()=>{"use strict";R();Hl();js();qz="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",Vz=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return Ze[r]??null},Mw=(e,t)=>{let r=Vz(t);if(r===null||e.wizard===void 0)return!1;let o=Ze.indexOf(r);if(o===-1)return!1;let n=Sr(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<Ze.length)},Kz=(e,t)=>{let r=Vz(t);if(r===null||e.wizard===void 0||!Mw(e,t))return e;eo(e.id);let o=Ze.slice(Ze.indexOf(r)),n=fl(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var zw,Jz,Yz=l(()=>{"use strict";Nw();zw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Jz=(e,t)=>Mw(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${zw(qz)}"><input type="hidden" name="cycleId" value="${zw(e.id)}"><input type="hidden" name="wizardStepId" value="${zw(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var O6,M6,N6,Xz,Zz=l(()=>{"use strict";R();Hl();$z();Fz();Yz();Km();O6={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},M6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),N6=(e,t,r)=>{let o=Jz(e,t);return`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${M6(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${Ms(e,t)}</div>
</details>`},Xz=e=>{let t=e.wizard;if(t===void 0)return"";let r=Sr(e);if(r===null)return"";let o=Ze.slice(0,r).map((i,a)=>N6(e,`wizard-${a+1}`,O6[i])),n=t.gate!==null?Dz(e,{active:!0}):Hz(e),s=r>=Ze.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var sg,jw=l(()=>{"use strict";Zz();bw();R();sg=e=>{if(e===null||e.wizard!==void 0&&C(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=Xz(e),r=zN(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var z6,Dw,Qz=l(()=>{"use strict";R();Se();De();sn();z6=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},Dw=async(e,t,r)=>{if(!z6(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===x)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=RP({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Ue({writerAgent:e.judgeModel,prompt:n,workingDirectory:ae(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=xP(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var Ul,ig,ej,$w,tj,rj,oj,ag,Hw=l(()=>{"use strict";Ul=g(require("node:fs")),ig=g(require("node:path")),ej=e=>ig.default.join(ig.default.dirname(e),"prompt-optimizer-writer-ready.json"),$w=e=>{let t=ej(e);if(!Ul.default.existsSync(t))return{};try{let r=JSON.parse(Ul.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},tj=(e,t)=>{Ul.default.mkdirSync(ig.default.dirname(e),{recursive:!0}),Ul.default.writeFileSync(ej(e),`${JSON.stringify(t,null,2)}
`)},rj=(e,t)=>$w(e)[t]?.message??null,oj=(e,t,r)=>{tj(e,{...$w(e),[t]:{message:r}})},ag=(e,t)=>{let r=$w(e);r[t]!==void 0&&tj(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var Fw,lg,cg,nj,Ae,gn=l(()=>{"use strict";R();YP();Ol();Qz();jl();js();Hw();ng();Qe();Fw=new Set,lg={atMs:0,ids:[]},cg=async()=>{if(Date.now()-lg.atMs<3e4)return lg.ids;let e=await bt({commands:de({})});return lg.atMs=Date.now(),lg.ids=e.installedWriterIds,e.installedWriterIds},nj=async(e,t,r)=>{let o=J(e,t);if(o===null||r.aborted)return;let n=pn(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(C(n.status)&&!s||n.status==="wizard_paused"||qt(n))return;if(s){let c=await Dw(n,r,d=>{ag(e,d)});D(e,c);return}let i=await WN(n,c=>{ag(e,c)},r,c=>{J(e,t)?.status==="stopped"||r.aborted||D(e,c)});if(!(J(e,t)?.status==="stopped"||r.aborted)){if(D(e,i),C(i.status)){let c=await Dw(i,r,d=>{ag(e,d)});D(e,c);return}await nj(e,t,r)}},Ae=(e,t)=>{if(Fw.has(t))return;let r=J(e,t);if(r===null)return;let o=pn(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(C(o.status)&&!n||o.status==="wizard_paused"||qt(o))return;Fw.add(t);let s=Uz(t);nj(e,t,s).finally(()=>{Fw.delete(t),Bz(t)})}});var to,Bl=l(()=>{"use strict";Iw();ng();jw();gn();to=(e,t)=>{let r=pn(e,t);return Ae(e,r.id),`${og(r)}${sg(r)}`}});var sj,ij,aj=l(()=>{"use strict";sj=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,ij=e=>e!==null&&e>0});var j6,D6,$6,lj,cj=l(()=>{"use strict";R();Ol();Fm();Ll();kl();js();Jm();Jm();j6=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),D6=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},$6=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=oe(o);return Ts({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},lj=(e,t)=>{if(!Nl(e,t))return e;eo(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return ln({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Xr(D6(r));if(t==="wizard-3"){let n=o.splitOptions[0]??j6(o.templatedPrompt);return Yr(r,n)}return t==="wizard-4"?$6(r):e}});var dg,dj,Uw=l(()=>{"use strict";R();Fm();js();dg=e=>(eo(e.id),{...Ts(e,"stopped"),errorMessage:oP}),dj=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;eo(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var H6,uj,pj,mj=l(()=>{"use strict";R();Ol();Fm();Ll();kl();Bl();Qe();gn();aj();Nw();cj();Uw();H6="Pick a revision scored above 0 before continuing to Separate.",uj=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),pj=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=J(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=J(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(to(e.storePath,d))};if(o==="wizard-stop-all"){let c=dg(s);return D(e.storePath,c),Ae(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=dj(s);return D(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=Kz(s,c);return D(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=lj(s,c);return D(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&Ae(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",m=_P(s.wizard,d,c);m=fl(m,d),m={...m,pendingStepInstructions:p};let S={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return D(e.storePath,S),Ae(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?uj(s):ln({...s,wizard:{...s.wizard,gate:null}});return D(e.storePath,m),Ae(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=sj(s,p??-1);if(!ij(m)){let h={...s,errorMessage:H6,updatedAt:new Date().toISOString()};return D(e.storePath,h),a(n),!0}let S=Xr({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return D(e.storePath,S),Ae(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=uj(s);return D(e.storePath,h),Ae(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(h=>h.id===p);if(m===void 0){let h={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return D(e.storePath,h),a(n),!0}let S=Yr(s,m);return D(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(n),!0;let m=BP({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!m.ok){let u={...s,errorMessage:m.errorMessage,updatedAt:new Date().toISOString()};return D(e.storePath,u),a(n),!0}let S={...s.wizard,parameterValues:m.parameterValues};if(p.status==="pending"){let u=_N({...s,wizard:{...S,gate:null}},d);return D(e.storePath,u),Ae(e.storePath,n),a(n),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=oe(S),A=Ts({...s,wizard:S},u.terminalStatusSuggestion);return D(e.storePath,A),Ae(e.storePath,n),a(n),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...S,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return D(e.storePath,y),a(n),!0}}return a(n),!0}});var F6,gj,U6,Bw,B6,fj,hj=l(()=>{"use strict";Se();js();Uw();ow();Im();jl();Qe();F6="Add a score from 0 to 100 and the reason for it.",gj="Add a score from 1 to 100 and the reason for it.",U6="Write the next prompt.",Bw="This step is not waiting for you.",B6=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},fj=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=J(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(D(e.storePath,dg(a)),{kind:"saved",cycleId:i}):Gz(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=J(e.storePath,r);if(o===null||!qt(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:Bw};if(t==="manual-judge"){if(o.judgeModel!==x)return{kind:"invalid",cycle:o,errorMessage:Bw};let i=B6(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?gj:F6};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:gj};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",p=Om(Rl(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return D(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==x)return{kind:"invalid",cycle:o,errorMessage:Bw};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:U6};let s=xm(o,n);return D(e.storePath,s),{kind:"saved",cycleId:o.id}}});var yj,Sj=l(()=>{"use strict";yj=`<script>
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
</script>`});var Aj,bj=l(()=>{"use strict";Aj=`<script>
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
</script>`});var Pj,wj=l(()=>{"use strict";Pj=`<script>
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
</script>`});var vj,_j=l(()=>{"use strict";R();De();vj=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:et(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(re(t.wizard)),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!C(t.status)}}});var Wj,Lj=l(()=>{"use strict";R();Hl();Wj=e=>{if(e.wizard===void 0)return C(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=Sr(e);if(e.status==="wizard_paused"&&t!==null&&t<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`};if(C(e.status)){if(e.wizard.phase==="complete"){let r=oe(e.wizard),o=r.rows.reduce((s,i)=>i.bestScore===null?s:s===null?i.bestScore:Math.min(s,i.bestScore),null),n=o===null?"":` \xB7 lowest ${o}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Wizard \xB7 ${r.passedModuleCount}/${r.totalModules} modules${n}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}}return t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var kj,Ej=l(()=>{"use strict";kj=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Ar,G6,q6,Cj,Rj=l(()=>{"use strict";Lj();Ej();$l();Ar=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),G6=e=>e.wizard===void 0?"classic":"wizard",q6=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Ar(t)}">`,o=Wj(e),n=kj(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Ar(o.badgeClass)}">${Ar(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Ar(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Ar(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${G6(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Ar(e.id)}">${Ar(hr(e.goal))}</a><p class="muted">${Ar(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${m}</div></li>`},Cj=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(i=>q6(i,t)).join(""),o=Math.min(e.length,20),n=o===e.length?`History \xB7 ${e.length}`:`History \xB7 ${o} of ${e.length}`,s=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2><ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Ar(n)}</summary>${s}</details>`:s}});var Gw,ug,Tj,V6,K6,Gl,xj,pg=l(()=>{"use strict";Gw=g(require("node:fs")),ug=g(require("node:path"));De();Tj=/^[a-z0-9-]+$/,V6=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},K6=(e,t)=>{if(!Tj.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let m=V6(p[2]??"");p[1]==="name"&&m.length>0&&(o=m),p[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},Gl=e=>{let t=fr(e);if(!t.ok)return[];let r=ug.default.resolve(t.path,".cursor","skills"),o=[];try{o=Gw.default.readdirSync(r)}catch{return[]}return o.filter(n=>Tj.test(n)).flatMap(n=>{let s=ug.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${ug.default.sep}`))return[];try{let i=K6(Gw.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},xj=(e,t)=>Gl(e).find(r=>r.fileName===t)??null});var Ij,Oj=l(()=>{"use strict";Ij={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var ql,J6,$e,Ds=l(()=>{"use strict";Oj();Is();ql=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),J6=e=>{let t=Ij[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${ql(t.title)}" aria-describedby="${r}" aria-expanded="false">${Bt}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${ql(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${ql(t.example)}</span></span></button>`},$e=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${ql(r)}"`}>${ql(e)}</span>${J6(t)}</span>`});var Mj,Y6,Nj,zj,jj=l(()=>{"use strict";Ds();Mj=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Y6=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),Nj=e=>{if(e.length===0)return`<div class="field">${$e("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${Mj(r.fileName)}">${Mj(r.fileName)}</option>`).join("");return`<div class="field">${$e("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${Y6(e)}</script>`},zj=`<script>
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
</script>`});var Me,Dj,$j,X6,Hj,Fj,Uj,Bj=l(()=>{"use strict";R();kw();Se();$l();Hl();Me=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Dj=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",$j=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,X6=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},Hj=e=>e===x?"You":ne(e),Fj=e=>{let t=X6(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ne(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Me(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Me(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Me(Hj(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Me(Hj(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Me(r)}</dd></div>
    </dl>
  </details>`},Uj=e=>{let t=e.wizard;if(t===void 0)return"";let r=hr(e.goal),o=e.status==="wizard_paused",n=!C(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=eg(e),m=$j(t),S=m===null?"":Dj(m),h=Sr(e),y=S.length===0?"":h===null||h>=4?` <strong>${Me(S)}</strong>`:` <strong>${Me(S)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Me(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Me(p.title)}${y}</p>
    <p class="muted">${Me(p.detail)}</p>
    <div class="actions">
      ${Fj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Me(e.id)}">Open this run</a>
    </div>
  </section>`}let s=$j(t),i=s===null?"Wizard":Dj(s),a=Sr(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Me(r)}</h2>
    <p class="lede">Paused at <strong>${Me(i)}</strong>${Me(c)} (last updated ${Me(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${Fj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Me(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Vl,Gj,qj=l(()=>{"use strict";Ds();Vl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Gj=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${Vl(n.id)}"${n.id===e.runner?" selected":""}>${Vl(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Vl(e.runner)}">Checking ${Vl(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${$e("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${$e("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Vl(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var Vj,Kj=l(()=>{"use strict";Vj=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var $s,Jj,Yj,Xj,Zj,Qj=l(()=>{"use strict";Ds();$s=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Jj=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${$s(c.id)}"${c.id===r?" selected":""}>${$s(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${$s(n)}</option>`;return`<div class="field">${$e(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},Yj=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${$s(t)}">Checking ${$s(o)}\u2026</p>`},Xj=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${$e(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${$s(r)}</textarea><span class="muted">${o}</span></div></details>`,Zj=e=>{let t=`<div class="sdlc-writer">${Jj("judge","Judge",e.judge,e.writers,"I'll score it")}${Yj("judge",e.judge,e.writers)}${Xj("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${Jj("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${Yj("improver",e.improver,e.writers)}${Xj("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var eD,tD=l(()=>{"use strict";eD=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var qw,rD,oD=l(()=>{"use strict";tD();qw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rD=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${eD.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${qw(t.goal)}" title="${qw(t.goal)}">${qw(t.label)}</button>`).join("")}</div>`});var Kl,Z6,Q6,Vw,nD=l(()=>{"use strict";R();Ds();Kl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Z6=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},Q6=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,Vw=e=>{let t=Z6(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=cl(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${$e(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${Kl(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${Kl(e.inputId)}" class="sdlc-pass-range" type="range" name="${Kl(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${Kl(a)}"><span class="sdlc-pass-mark" style="left:${Q6(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${Kl(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var tJ,br,sD,iD=l(()=>{"use strict";jl();Iw();Sj();bj();Lw();wj();_j();Rj();pg();jj();Ds();jw();Bj();$l();qj();Kj();Qj();R();oD();nD();tJ=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,br=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sD=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${br(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${br(e.skillNotice??"")}</div>`,o=`${YN}${XN}`,n=e.resumableWizardCycle??null,s=n===null?"":Uj(n),i=sg(e.cycle),a=e.cycle===null?"":og(e.cycle),c=e.cycle!==null&&qt(e.cycle),d=vj(e),p=tJ(d.goal,d.prompt,e.canRun),m=Zj({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=Gj({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=`${Vw({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${Vw({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=wP,u=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",A=e.cycle!==null&&C(e.cycle.status),b=d.running&&!A,f=A||b?"":" open",w=b?" sdlc-compose-run-focus":"",W=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${A?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,L=A?(()=>{let F=e.cycle!==null?hr(e.cycle.goal):hr(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${br(F)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${W}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${W}</summary>`,E=A?" sdlc-compose-viewing-finished":"",T=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",I=c?"waiting":d.running?"running":"idle",M=d.running&&!c?' aria-busy="true"':"",B=`<section class="card sdlc-compose${E}${w}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${f}>
        ${L}
        <div class="sdlc-compose-details-body">
      <p class="lede">${y} ${br(e.modelNote)}</p>
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
            ${$e("Folder","folder")}
            <input class="input" type="text" name="folder" value="${br(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${Nj(Gl(d.folder))}
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
            ${$e("Goal","goal")}
            ${rD()}
            <textarea class="input textarea" name="goal" rows="4" required>${br(d.goal)}</textarea>
          </div>
          <div class="field">
            ${$e("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${br(d.prompt)}</textarea>
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
          ${m}
        </div>
        ${S}
        ${Vj()}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${br(d.passScore)}; Step 4 pass \u2265 ${br(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${I}" data-can-run="${p?"true":"false"}"${M}${d.running?" disabled":""}>${T}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,q=`${""}${yj}${Aj}${Pj}${zj}`;return`${t}${r}${B}${s}${a}${i}${o}${Cj(e.history,e.cycle?.id??null)}${q}`}});var Jl,Kw=l(()=>{"use strict";iD();Jl=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:sD(t)}))}});var aD,lD=l(()=>{"use strict";hj();Bl();Kw();Qe();gn();aD=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:fj({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=J(e.storePath,o.cycleId);return Ae(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(to(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Jl(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:Ft(e.storePath),resumableWizardCycle:null}),!0)}});var cD,mg,Jw=l(()=>{"use strict";cD=g(require("node:os"));R();mg=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??cD.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var dD,Hs,Yw,uD,pD,Yl=l(()=>{"use strict";R();Se();tP();dD=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Hs=e=>{let t=FM(e),r=nn(e).map(s=>({id:s,label:Tm[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},Yw=(e,t,r)=>t===x||t!==null&&e.writers.some(o=>o.id===t)?t:r,uD=(e,t,r,o=null)=>({judge:Yw(e,t,e.judge),improver:Yw(e,r,e.improver),runner:Yw(e,o,e.runner)}),pD=e=>e===im?{goal:am,prompt:lm}:{goal:"",prompt:""}});var gg,mD=l(()=>{"use strict";gg=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var gD,fg,Xw=l(()=>{"use strict";R();Se();De();Yl();mD();gD=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=gg(o);return n.ok?String(n.passScore):String(r)},fg=e=>{let t=uD(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=gD(e.posted,"passScore",70),o=gD(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=(f,w)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:f,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:w,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a});if(e.posted===null)return d(e.defaultFolder??on,null);let p=e.posted.get("folder")??on;if(e.posted.get("intent")==="choose-folder"){let f=e.pickFolder();return d(f===null?p:et(f),null)}if((e.posted.get("intent")??"")!=="run")return d(p,null);let S=dD(e.goal,e.prompt);if(S!==null)return d(p,S);let h=gg(e.posted.get("passScore")??r);if(!h.ok)return d(p,h.errorMessage);let y=gg(e.posted.get("modulePassScore")??o);if(!y.ok)return d(p,y.errorMessage);let u=UM(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(u===null)return d(p,"Choose a judge and an improver.");let A=fr(p);if(!A.ok)return d(p,A.errorMessage);let b=BM(e.installedIds,c,u.judge);return b===null?d(p,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:u.judge,improver:u.improver,workingDirectory:A.path,passScore:h.passScore,modulePassScore:y.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:b,runnerInstructions:a}}});var Fs,yg,rJ,Zw,fD,hg,hD,oJ,yD,Qw,nJ,sJ,iJ,ev,SD,AD,bD=l(()=>{"use strict";Fs=g(require("node:fs")),yg=g(require("node:path"));Se();De();rJ=["remember","choose-folder","run"],Zw=()=>({folder:on,judge:"",improver:"",runner:""}),fD=e=>yg.default.join(yg.default.dirname(e),"prompt-optimizer-preferences.json"),hg=e=>typeof e=="string"?e:"",hD=e=>{let t=fD(e);if(!Fs.default.existsSync(t))return Zw();try{let r=JSON.parse(Fs.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return Zw();let o=r,n=hg(o.folder).trim();return{folder:n.length===0?on:n,judge:hg(o.judge),improver:hg(o.improver),runner:hg(o.runner)}}catch{return Zw()}},oJ=(e,t)=>{let r=fD(e);Fs.default.mkdirSync(yg.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;Fs.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),Fs.default.renameSync(o,r)},yD=(e,t)=>e===x||nn(t).some(r=>r===e),Qw=(e,t,r)=>e===null?t:e.length===0?"":yD(e,r)?e:t,nJ=(e,t)=>{if(e===null)return t;let r=fr(e);return r.ok?r.display:t},sJ=e=>{let t=hD(e.storePath),r={folder:nJ(e.folder,t.folder),judge:Qw(e.judge,t.judge,e.installedIds),improver:Qw(e.improver,t.improver,e.installedIds),runner:Qw(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||oJ(e.storePath,r)},iJ=e=>{let t=fr(e);return t.ok?t.display:on},ev=(e,t)=>yD(e,t)?e:"",SD=e=>{let t=hD(e.storePath);return{selection:{...e.selection,judge:ev(t.judge,e.installedIds)||e.selection.judge,improver:ev(t.improver,e.installedIds)||e.selection.improver,runner:ev(t.runner,e.installedIds)||e.selection.runner},defaultFolder:iJ(t.folder)}},AD=e=>{let t=e.posted.get("intent")??"";if(!rJ.includes(t))return;let r=e.posted.get("folder");sJ({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var PD,aJ,lJ,tv,cJ,Sg,Ag=l(()=>{"use strict";PD=g(require("node:os"));Se();Hw();sn();aJ="Reply with the single word ok. Do not use tools.",lJ=45e3,tv=async(e,t)=>{if(t===x)return{ok:!0,message:"You will do this step."};let r=rj(e,t);if(r!==null)return{ok:!0,message:r};let o=await Ue({writerAgent:t,prompt:aJ,workingDirectory:PD.default.tmpdir(),timeoutMs:lJ});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ne(t)} is ready.`;return oj(e,t,n),{ok:!0,message:n}},cJ=e=>[...new Set(e.filter(t=>t.length>0))],Sg=async(e,t,r,o)=>{for(let n of cJ([t,r,o??""])){let s=await tv(e,n);if(!s.ok)return s.message}return null}});var rv,wD=l(()=>{"use strict";R();rv=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!C(r.status)&&!(t!==null&&r.id===t))return r;return null}});var vD,_D=l(()=>{"use strict";$t();R();Bl();Jw();Xw();Kw();Qe();De();bD();pg();Ag();wD();ng();gn();vD=async e=>{let t=e.posted===null?SD({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=fg({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Br("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(AD({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?et(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await Sg(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await Jl(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:et(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:Ft(e.route.storePath),resumableWizardCycle:rv(Ft(e.route.storePath),null)});return}if(r.kind==="start"){let s=xj(r.workingDirectory,r.sourceSkillFile),i=mg({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,wizard:OP({...gl(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(D(e.route.storePath,i),Ae(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(to(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:J(e.route.storePath,e.cycleId);n!==null&&(n=pn(e.route.storePath,n),Ae(e.route.storePath,n.id)),await Jl(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:Ft(e.route.storePath),resumableWizardCycle:rv(Ft(e.route.storePath),n?.id??null)})}});var WD,LD=l(()=>{"use strict";Qe();WD=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";_M(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var kD,ED=l(()=>{"use strict";kD=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var CD,RD=l(()=>{"use strict";$M();mj();lD();_D();LD();Yl();ED();gn();CD=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await cg(),o=Hs(r),n=e.method==="POST"?kD(e.request.headers["content-type"],await e.readBody(e.request)):null;if(pj({posted:n,storePath:e.storePath,response:e.response})||await aD(e,n,o))return;let s=pD(t.searchParams.get("example")),i=WD({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=DM({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await vD({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:jM(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var dJ,TD,xD=l(()=>{"use strict";R();Qe();dJ=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",TD=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=J(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!C(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=MP({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${dJ(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var ID,OD=l(()=>{"use strict";Bl();Qe();ID=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:J(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":to(e.storePath,o)),!0}});var uJ,MD,ND=l(()=>{"use strict";Se();Ag();uJ=["claude-cli","codex","cursor","antigravity"],MD=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===x||uJ.includes(t)?await tv(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var zD,jD=l(()=>{"use strict";R();zD=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:ul,page:pl,context:_s,installedWriters:e,post:{method:"POST",url:ul,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${ul}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var ov,DD=l(()=>{"use strict";R();zl();ov=e=>{let t=e.revisions[e.revisions.length-1]??null,r=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null}))),o=C(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:o,useThisPrompt:e.status==="passed",totalTokens:zs(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:e.errorKind??null,context:_s,page:`${pl}?cycle=${encodeURIComponent(e.id)}`}}});var Ne,pJ,$D,HD,FD=l(()=>{"use strict";Ne=g(Pi());R();pJ=(0,Ne.isType)({goal:Ne.isString,prompt:Ne.isString,workingDirectory:Ne.isString,judge:(0,Ne.isUndefinedOr)(Ne.isString),improver:(0,Ne.isUndefinedOr)(Ne.isString),passScore:(0,Ne.isUndefinedOr)(Ne.isNumber),maxRounds:(0,Ne.isUndefinedOr)(Ne.isNumber)}),$D=e=>{let t=e?.trim()??"";return t.length===0?null:t},HD=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return pJ(t)?t.workingDirectory.trim().length===0?{ok:!1,error:Sm}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:$D(t.judge),improver:$D(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:Sm}}});var mJ,UD,BD=l(()=>{"use strict";R();Se();Xw();Yl();mJ=e=>e.map(t=>t.id).join(", "),UD=e=>{let t=Hs(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===x||n===x)return{ok:!1,error:PP,installedWriters:t.writers};if(o===null||n===null){let a=mJ(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o}),i=fg({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var GD,qD=l(()=>{"use strict";R();Jw();jD();DD();Yl();FD();BD();Qe();GD=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=J(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:ov(c)}}let r=await e.handlers.readInstalledIds(),o=Hs(r);if(e.method==="GET")return{status:200,body:zD(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let n=HD(e.rawBody);if(!n.ok)return{status:400,body:{ok:!1,error:n.error,installedWriters:o.writers}};let s=UD({body:n.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver,s.runner);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:o.writers}};let a=mg({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds,wizard:gl(s.prompt),runnerModel:s.runner});return D(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:ov(a)}}});var VD,KD=l(()=>{"use strict";gn();Ag();qD();VD=async e=>{let t=await GD({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:cg,readWritersReady:Sg,startCycle:Ae}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var YD,gJ,fJ,JD,hJ,XD,ZD=l(()=>{"use strict";YD=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],gJ=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},fJ=e=>{let t={};for(let n of e)for(let s of new Set(YD(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},JD=(e,t)=>{let r=gJ(YD(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},hJ=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},XD=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=fJ(e.map(i=>i.text)),s=JD(o,n);return e.map(i=>({id:i.id,score:hJ(s,JD(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var nv,yJ,SJ,QD,AJ,bJ,PJ,wJ,sv,iv=l(()=>{"use strict";nv=g(require("node:path"));De();ZD();pg();yJ=5,SJ=20,QD=280,AJ=e=>[e.name,e.description,e.promptText].join(`
`),bJ=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=QD?t:`${t.slice(0,QD-3)}...`},PJ=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),wJ=e=>e===void 0||!Number.isFinite(e)?yJ:Math.min(SJ,Math.max(1,Math.floor(e))),sv=e=>{let t=e.query.trim(),r=wJ(e.limit),o=fr(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=Gl(o.path),s=XD(n.map(d=>({id:d.fileName,text:AJ(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=nv.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let p=i.get(d.id);return p===void 0?[]:[{skillId:p.fileName,name:p.name,description:p.description,score:d.score,sourcePath:nv.default.join(a,p.fileName,"SKILL.md"),excerpt:bJ(p),source:"filesystem"}]});return{query:t,hits:c,context:PJ(c)}}});var e$,t$=l(()=>{"use strict";iv();e$=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:sv({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var r$,o$=l(()=>{"use strict";t$();r$=async e=>{let t=e$({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var vJ,av,n$=l(()=>{"use strict";MI();RD();xD();OD();ND();KD();o$();vJ=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},av=async e=>{let t=vJ(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await VD(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await r$(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:OI()})),!0):(await MD({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||TD({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||ID({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await CD(e),!0)}});var s$=l(()=>{"use strict";n$();iv();sn()});var fn,Xl,_J,WJ,LJ,kJ,i$,a$=l(()=>{"use strict";fn=g(require("node:fs")),Xl=g(require("node:path")),_J="prompt-optimizer-cycles.json",WJ="prompt-optimizer-preferences.json",LJ="prompt-sdlc-cycles.json",kJ="prompt-sdlc-preferences.json",i$=e=>{let t=Xl.default.join(e,_J),r=Xl.default.join(e,LJ);if(fn.default.existsSync(t)||!fn.default.existsSync(r))return t;try{fn.default.renameSync(r,t)}catch{return r}let o=Xl.default.join(e,kJ),n=Xl.default.join(e,WJ);if(fn.default.existsSync(o)&&!fn.default.existsSync(n))try{fn.default.renameSync(o,n)}catch{}return t}});var Us,EJ,lv,l$=l(()=>{"use strict";Us=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),EJ=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],lv=e=>{let t=EJ.map(i=>`<option value="${Us(i.value)}">${Us(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Us(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Us(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Us(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Us(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Zl,u$,CJ,p$,RJ,TJ,m$,Pg,c$,d$,xJ,IJ,Pr,Ql,bg,OJ,wg,cv,MJ,dv,g$,uv,f$,NJ,zJ,jJ,h$,y$,S$,ec=l(()=>{"use strict";Zl=g(require("node:fs")),u$=g(require("node:path")),CJ="estimate-history.ndjson",p$=100,RJ=500,TJ=2e4,m$=e=>u$.default.join(e,CJ),Pg=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,RJ),c$=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,TJ),d$=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,xJ=e=>({...e,estimateTokens:d$(e.estimateTokens),actualTokens:d$(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),IJ=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Pr=e=>{let t=m$(e);return Zl.default.existsSync(t)?Zl.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return IJ(n)?[xJ(n)]:[]}catch{return[]}}):[]},Ql=(e,t)=>{Zl.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Zl.default.writeFileSync(m$(e),r,"utf8")},bg=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),OJ=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${bg(o.task)} | ${bg(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},wg=e=>{let t=Pr(e.reportsDir),r=Pg(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ql(e.reportsDir,[...s,n])},cv=e=>{let t=Pr(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?Pg(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Ql(e.reportsDir,[...i,s])},MJ=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-p$),dv=e=>[...Pr(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),g$=e=>{let t=Pr(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=c$(e.input),n=c$(e.output),s=Pg(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Ql(e.reportsDir,[...c,a])},uv=(e,t)=>{let r=Pr(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},f$=e=>({table:OJ(MJ(Pr(e))),embedding:null}),NJ=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},zJ=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-p$),jJ=e=>{let t=NJ(zJ(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${bg(s.task)} | ${bg(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},h$=e=>{let t=Pr(e.reportsDir),r=Pg(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ql(e.reportsDir,[...s,n])},y$=e=>{let t=Pr(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ql(e.reportsDir,[...s,n])},S$=e=>jJ(Pr(e))});var A$=l(()=>{"use strict";ec()});var wr,pv,DJ,mv,$J,HJ,vg,_g,FJ,gv,b$=l(()=>{"use strict";A$();vw();wr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pv=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},DJ=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${pv(-r)} under`:`${pv(r)} over`},mv=e=>e.toLocaleString("en-US"),$J=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${mv(-r)} under`:`${mv(r)} over`},HJ=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},vg=e=>e===null?"\u2014":pv(e),_g=e=>e===null?"\u2014":mv(e),FJ=`(function () {
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
})();`,gv=e=>{let r=dv(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":DJ(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":$J(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${wr(HJ(i))}</button></td>
        <td>${wr(c)}</td>
        <td>${vg(n.estimateSeconds)}</td>
        <td>${vg(n.actualSeconds)}</td>
        <td>${wr(d)}</td>
        <td>${_g(n.estimateTokens)}</td>
        <td>${_g(n.actualTokens)}</td>
        <td>${wr(p)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${wr(c)}</p>
        <h2>Input</h2>
        <pre>${wr(i)}</pre>
        <h2>Output</h2>
        <pre>${wr(a)}</pre>
        <p>Time: estimated ${vg(n.estimateSeconds)} \xB7 actual ${vg(n.actualSeconds)} \xB7 ${wr(d)}</p>
        <p>Tokens: estimated ${_g(n.estimateTokens)} \xB7 actual ${_g(n.actualTokens)} \xB7 ${wr(p)}</p>
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
            ${Ym({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${FJ}</script>`}
    </section>`}});var P$=l(()=>{"use strict";l$();b$()});var Bs,UJ,BJ,fv,w$=l(()=>{"use strict";Bs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UJ=(e,t,r)=>{let o=Bs(t),n=Bs(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},BJ=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Bs(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>UJ(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Bs(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Bs(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Bs(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},fv=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(BJ).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var v$=l(()=>{"use strict";w$()});var tc,_$,W$,hv,yv,Sv,L$=l(()=>{"use strict";tc=g(require("node:fs")),_$=g(require("node:path"));Qa();em();W$=(e,t,r)=>ys({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,hv=(e,t,r)=>{let o=W$(e,t,r);if(o===null)return[];if(!tc.default.existsSync(o))return[];let n=tc.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},yv=e=>{let t=W$(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:ur(e.entry.prompt),output:ur(e.entry.output)};tc.default.mkdirSync(_$.default.dirname(t),{recursive:!0}),tc.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},Sv=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var GJ,qJ,rc,Wg,Av=l(()=>{"use strict";GJ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),qJ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,rc=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=GJ(i.assistantOutput),d=c.length>0?`Assistant: ${qJ(c,t)}`:null,p=[a,d].filter(m=>m!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},Wg=e=>{let t=e.userMessage.trim(),r=rc({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Kt,oc,wv,VJ,KJ,bv,JJ,vv,Lg,k$,E$,YJ,Gs,_v,Pv,C$,XJ,R$,qs,kg,nc,ZJ,sc,Wv,Eg,Cg,T$=l(()=>{"use strict";Kt=g(require("node:fs")),oc=g(require("node:path")),wv=require("node:crypto");Av();VJ="writer-sessions",KJ="active-index.json",bv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),JJ=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",vv=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},Lg=e=>{let t=oc.default.join(e.installDir,VJ);return Kt.default.mkdirSync(t,{recursive:!0}),t},k$=e=>oc.default.join(Lg(e),KJ),E$=(e,t)=>oc.default.join(Lg(e),`${t}.canonical.json`),YJ=(e,t)=>oc.default.join(Lg(e),`${t}.continuation.json`),Gs=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,_v=e=>{let t=k$(e);if(!Kt.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Kt.default.readFileSync(t,"utf8"));if(!bv(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!bv(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!JJ(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},Pv=(e,t)=>{Kt.default.writeFileSync(k$(e),JSON.stringify(t,null,2))},C$=(e,t)=>{Kt.default.writeFileSync(E$(e,t.sessionId),JSON.stringify(t,null,2))},XJ=(e,t)=>{Kt.default.writeFileSync(YJ(e,t.sessionId),JSON.stringify(t,null,2))},R$=(e,t)=>{let r=rc({turns:t.turns});XJ(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},qs=(e,t)=>{let r=E$(e,t);if(!Kt.default.existsSync(r))return null;try{let o=JSON.parse(Kt.default.readFileSync(r,"utf8"));return!bv(o)||typeof o.sessionId!="string"?null:o}catch{return null}},kg=(e,t=20)=>{let r=Lg(e),o=Kt.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=qs(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},nc=(e,t,r)=>{let o=vv(r);return _v(e).entries.find(i=>Gs(i)===Gs({writerAgent:t,projectFolderPath:o}))?.sessionId??null},ZJ=(e,t,r,o)=>{let n=_v(e),s=Gs({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>Gs(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];Pv(e,{entries:i})},sc=(e,t,r)=>{let o=(0,wv.randomUUID)(),n=new Date().toISOString(),s=vv(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return C$(e,i),R$(e,i),ZJ(e,t,s,o),o},Wv=(e,t,r)=>{let o=nc(e,t,r);return o!==null?o:sc(e,t,r)},Eg=(e,t,r)=>{let o=vv(r),n=_v(e);if(o===null&&r===void 0){Pv(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=Gs({writerAgent:t,projectFolderPath:o});Pv(e,{entries:n.entries.filter(i=>Gs(i)!==s)})},Cg=e=>{let t=Wv(e.layout,e.writerAgent,e.projectFolderPath),r=qs(e.layout,t);if(r===null)return;let o={id:(0,wv.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};C$(e.layout,n),R$(e.layout,n)}});var QJ,e7,Rg,Lv,x$=l(()=>{"use strict";QJ=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",e7=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},Rg=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",Lv=e=>{let t=Rg(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=QJ(r,e.userPromptCharacterCount),n=e7({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var Tg=l(()=>{"use strict";L$();T$();Av();x$()});var I$=l(()=>{"use strict";Iu();Jn();Ky()});var O$=l(()=>{"use strict";wy()});var Ge,r7,o7,kv,Ev,Cv,M$=l(()=>{"use strict";I$();O$();Ge=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),r7=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},o7=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=sa(o);return`value="${Ge(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${Ge(r)}"`},kv=(e,t,r,o,n)=>{let s=Ou[t];return`<label class="field">
          <span class="field-label">${Ge(o)} API key \u2014 ${Ge(r7(e,t))} \xB7 <a class="field-link" href="${Ge(s.href)}" target="_blank" rel="noopener noreferrer">${Ge(s.label)}</a></span>
          <input class="input mono" type="password" name="${Ge(r)}" autocomplete="off" ${o7(e,t,n)} />
        </label>`},Ev=(e,t,r,o)=>{let n=Wu(e[t]?.model),s=new Set(_u[t].map(c=>c.value)),i=_u[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${Ge(c.value)}"${d}>${Ge(c.label)}</option>`}).join(""),a=n!==To&&!s.has(n)?`<option value="${Ge(n)}" selected>${Ge(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${Ge(o)}</span>
          <select class="input mono" name="${Ge(r)}">${i}${a}</select>
        </label>`},Cv=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Ge(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${kv(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${Ev(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${kv(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${Ev(e.secrets,"openai","openaiModel","OpenAI model")}
        ${kv(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${Ev(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var N$=l(()=>{"use strict";M$()});var xg,z$,j$=l(()=>{"use strict";xg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),z$=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${xg(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${xg(s.name)}</strong> <span class="muted mono">(${xg(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${xg(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var n7,D$,$$,H$=l(()=>{"use strict";n7=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,D$=e=>e.kind==="folder",$$=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&D$(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(D$(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(n7)};return r(t)}});var F$,Rv,U$=l(()=>{"use strict";F$=g(require("node:path")),Rv=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Rv(r.children,t)}</ul>
            </details>
          </li>`;let o=F$.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var B$,ro,s7,i7,ic,a7,Tv,G$=l(()=>{"use strict";sm();B$=g(require("node:path"));j$();H$();U$();ro=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),s7=()=>`(() => {
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

})();`,i7=()=>`(() => {
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
})();`,ic=e=>{let t=nl({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=z$({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${ro(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${ro(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':a7(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${ro(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${ro(s)}" />
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
    <script>${s7()}</script>
    <script>${i7()}</script>`;return`${t}${r}${o}${c}${d}`},a7=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=$$(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:B$.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),p=Rv(d,ro),m=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${ro(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${ro(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${ro(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},Tv=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??p??a,S=t.sets[i];if(S===void 0)continue;let h=a.length>0?a:S.proposedSlug,y=m.length>0?m:S.proposedName,u=r.has(i),A=S.items.map(b=>({id:b.id,kind:b.kind,title:b.title,sourcePath:b.sourcePath,include:u}));s.push({slug:h,name:y,items:A})}return s}});var q$=l(()=>{"use strict";G$()});var l7,xv,V$=l(()=>{"use strict";cr();l7=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[Ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},xv=l7});var c7,K$,J$=l(()=>{"use strict";cr();c7=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[Ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},K$=c7});var Y$=l(()=>{"use strict"});var hn,d7,Iv,X$=l(()=>{"use strict";sm();rA();hn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),d7=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,Iv=e=>{let t=e.flashError?`<div class="alert-error">${hn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${hn(e.flashMessage)}</div>`:"",r=nl({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${hn(d7(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,p=`<a class="btn btn-secondary btn-compact" href="${hn(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=wp(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${hn(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${hn(n.name)}</strong>
                  <span class="muted mono">${hn(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${p}${m}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var Z$=l(()=>{"use strict";Y$();oA();X$()});var Ig,Q$=l(()=>{"use strict";Ig=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var eH,kt,Ov=l(()=>{"use strict";eH=g(require("node:path"));Mt();He();K();ue();qS();kt=e=>{let t=$()?.layout.installDir??k();if(eH.default.basename(t)===Tt)return gt;let r=$(),o=r!==null?we(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):gt}});var Mv,tH=l(()=>{"use strict";Nt();Ov();Mv=async e=>{let t=Te(e.installDir),r=t?.bundleVersion??null,o=kt(t);try{let n=await Bn(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:_o(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Nv,rH=l(()=>{"use strict";Nv=e=>!e});var zv,Vs,jv=l(()=>{"use strict";K();zv=()=>`http://127.0.0.1:${vh()}/update/run`,Vs=async e=>{try{let t=await fetch(zv(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var u7,oH,Dv,nH=l(()=>{"use strict";K();te();jv();u7=()=>{rr({launchAgentLabel:Pe(),installDir:k()})},oH=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Dv=async()=>{u7();let e=await Vs({force:!0});if(e.ok)return{ok:!0,message:oH(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:oH(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Nt(),GE)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var $v=l(()=>{"use strict";Kb();Q$();Ov();tH();rH();nH();jv()});var sH,iH=l(()=>{"use strict";sH=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var aH,lH,Hv,Fv,cH=l(()=>{"use strict";aH=require("node:crypto"),lH=g(require("node:fs"));$t();ue();ue();iH();Hv=!1,Fv=async e=>{if(Hv)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!sH(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&lH.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,aH.randomUUID)();Hv=!0;try{if(await VS(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Xn({...r,workspace:n},e.writerAgent,t);return await Wa(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Hv=!1}}});var dH=l(()=>{"use strict";cH()});var st,p7,uH,pH,Uv,Bv,Gv,qv,Vv,Kv,Jv=l(()=>{"use strict";st=require("node:crypto"),p7=Buffer.from("302a300506032b6570032100","hex"),uH=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},pH=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,st.createPublicKey)({key:Buffer.concat([p7,t]),format:"der",type:"spki"})},Uv=()=>{let{publicKey:e,privateKey:t}=(0,st.generateKeyPairSync)("ed25519");return{publicKeyRaw:uH(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Bv=e=>(0,st.createPrivateKey)(e),Gv=(e,t)=>(0,st.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),qv=(e,t,r)=>{try{let o=pH(e);return(0,st.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},Vv=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,Kv=()=>(0,st.randomBytes)(32).toString("base64url")});var vr,Og,mH,m7,g7,Mg,Yv,Xv,gH=l(()=>{"use strict";vr=g(require("node:fs")),Og=g(require("node:path"));Jv();K();He();mH=e=>Og.default.join(e.installDir,Tr),m7=(e,t)=>{if(e.profileEmail===null||t===mH(e)||vr.default.existsSync(t))return;let r=mH(e);vr.default.existsSync(r)&&(vr.default.mkdirSync(Og.default.dirname(t),{recursive:!0}),vr.default.renameSync(r,t))},g7=e=>{if(!vr.default.existsSync(e))return null;try{let t=vr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Mg=e=>{let t=Zd(e);m7(e,t);let r=g7(t);if(r!==null)return r;let o=Uv();return vr.default.mkdirSync(Og.default.dirname(t),{recursive:!0}),vr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},Yv=e=>{let t=Mg(e.layout),r=Kv(),o=Vv({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=Bv(t.privateKeyPem),s=Gv(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Xv=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return qv(e.serverPublicKey,t,e.serverAttestation)}});var Zv=l(()=>{"use strict";gH();Jv()});var SH,ac,t_,r_,fH,f7,Qv,Ng,le,AH,h7,e_,y7,S7,o_,pe,Ee,Jt,A7,hH,yH,lc,cc,bH=l(()=>{"use strict";SH=g(require("node:http")),ac=g(require("node:fs")),t_=g(require("node:path"));zg();Ya();Gx();Vx();Qx();ls();Pb();Gb();RI();xI();s$();a$();P$();v$();Tg();N$();q$();zo();$t();cr();V$();J$();Z$();$v();Nt();dH();ue();Zv();r_=e=>cb(e)??"never",fH=48e3,f7=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,Qv=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??lp(),reveal:t.reveal,installed:Ur(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Ng=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:ns(t,e)},le=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AH=200,h7=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',e_=e=>{let t=e.trim().slice(0,AH),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},y7=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${le(t)}</div>`,S7=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${le(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',o_={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},pe=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...o_}),e.end(JSON.stringify(r))},Ee=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},Jt=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},A7=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=h7(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${le(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=Nv(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Xa(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${le(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${le(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${le(r_(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${le(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},hH=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},yH=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,AH)},lc=e=>{let t=t_.default.join(e.layout.installDir,"link-code.txt"),r=()=>Te(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:Ig(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),u=await i(),A=Zb(u),b=h.updateFlash??null,f=Qb(b),w=y7(b,h.updateError??null);return Yb({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:kt(y),installBundleVersionLabel:Ig(y),prependBody:`${f}${w}${A}`,headerUpdateButtonHtml:Xb(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await Mv(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:e_("An update is already running.")}),h.end();return}c=!0;try{let u=await Dv(),A=u.ok?"/?update=ok":e_(u.message);h.writeHead(303,{Location:A}),h.end()}catch(u){let A=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:e_(A)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",A=o(),b=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:A.installVersion,body:`<section class="card">
      <h1>${le(y)}</h1>
      <p>${le(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(b)},m=()=>{if(ac.default.existsSync(t))return ac.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return ac.default.writeFileSync(t,h,"utf8"),h},S=SH.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",A=h.method??"GET";if(A==="OPTIONS"){y.writeHead(204,o_),y.end();return}if(!await av({method:A,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:i$(t_.default.dirname(e.layout.configPath)),readBody:Jt,sendHtml:Ee,renderShell:n})){if(A==="GET"&&u==="/health"){let b=e.controllers.getStatus(),f=o();pe(y,200,{ok:!0,...b,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/status"){let b=o();pe(y,200,{...e.controllers.getStatus(),linkCode:m(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/traffic"){pe(y,200,{entries:Ka(e.layout)});return}if(A==="DELETE"&&u==="/api/traffic"||A==="POST"&&u==="/api/traffic/clear"){if(pb(e.layout),A==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}pe(y,200,{ok:!0});return}if(A==="GET"&&u==="/api/trace"){pe(y,200,{entries:Yp(e.layout)});return}if(A==="DELETE"&&u==="/api/trace"||A==="POST"&&u==="/api/trace/clear"){if(fb(e.layout),A==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}pe(y,200,{ok:!0});return}if(A==="POST"&&u==="/api/errors/clear"){hb(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(A==="GET"&&u==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let w=await As({layout:e.layout,query:f,limit:20});pe(y,200,{chunks:w,query:f});return}pe(y,200,{chunks:Ss(e.layout).slice(-50).reverse()});return}if(A==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(A==="GET"&&u==="/api/update-status"){let b=await i();pe(y,200,{ok:!0,...b});return}if((A==="GET"||A==="POST")&&u==="/api/update"){await d(y);return}if(A==="GET"&&u==="/"){let b=e.controllers.getStatus(),f=o(),w=Ur(e.layout),v=Xp(e.layout.errorLogPath);Ee(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:hH(h.url??void 0),updateError:yH(h.url??void 0),body:eP({wsConnected:b.wsConnected,lastHeartbeatAt:b.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:Ss(e.layout).length,trafficEntryCount:Ka(e.layout).length,wakeError:b.wakeError,errorLogByteSize:v.byteSize,errorLogExists:v.exists})}));return}if(A==="GET"&&u==="/task"){let b=e.controllers.getStatus(),f=o(),w=$(),v=new URL(h.url??"/",`http://127.0.0.1:${43347}`),W=v.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,L=v.searchParams.get("failed")==="1"?v.searchParams.get("error")?.trim()??"Task failed.":null,E=v.searchParams.get("runId");Ee(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:lv({defaultWorkspace:w?.workspace??"",wsConnected:b.wsConnected,flashMessage:W,flashError:L,lastRunId:E})}));return}if(A==="POST"&&u==="/task/dispatch"){let b=await Jt(h),f=new URLSearchParams(b),w=f.get("prompt")?.trim()??"",v=f.get("writerAgent")?.trim()??"claude-cli",W=f.get("projectFolder")?.trim()??"",L=await Fv({prompt:w,writerAgent:v,...W.length>0?{projectFolderPath:W}:{}}),E=new URLSearchParams;L.ok?E.set("ok","1"):(E.set("failed","1"),L.errorMessage!==void 0&&E.set("error",L.errorMessage.slice(0,240))),L.agentRunId!==void 0&&E.set("runId",L.agentRunId),y.writeHead(303,{Location:`/task?${E.toString()}`}),y.end();return}if(A==="GET"&&u==="/writer-sessions"){let b=o(),f=kg(e.layout,12);Ee(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:b.installVersion,updateFlash:hH(h.url??void 0),updateError:yH(h.url??void 0),body:fv({sessions:f})}));return}if(A==="GET"&&u==="/errors"){let b=o(),f=Xp(e.layout.errorLogPath);Ee(y,await n({title:"Errors",activePath:"/errors",installVersion:b.installVersion,body:Sb({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(A==="GET"&&u==="/status"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),w=We(e.layout),v=w!==null?je(w,12e4):wb(f.lastHeartbeatAt,12e4),W=vb({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:v}),L=o();Ee(y,await n({title:"Status",activePath:"/status",installVersion:L.installVersion,body:`${A7({status:f,healthBadge:W,revived:b.searchParams.get("revived")==="1",linkCode:m(),installBundleVersion:L.installBundleVersion,installBundleUpdatedAt:L.installBundleUpdatedAt})}${Lb({installDir:e.layout.installDir})}${Wb({entries:Yp(e.layout)})}`}));return}if(A==="GET"&&u==="/traffic"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=Ka(e.layout),w=o(),v=f.map(E=>`<tr><td title="${le(E.at)}">${le(r_(E.at))}</td><td>${le(E.direction)}</td><td><code>${le(E.type)}</code></td><td>${le(E.summary)}</td><td>${le(E.action??"")}</td></tr>`).join(""),W=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${v}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',L=b.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Ee(y,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${L}
              ${W}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(A==="GET"&&u==="/projects"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=kt(f.installVersion),v=await Ng(e.layout),W=b.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":b.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,L=b.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,E=$(),T=E===null?null:Y({wsUrl:E.wsUrl,pairingToken:E.pairingToken}),I=T===null?{}:Object.fromEntries((await Promise.all(v.projects.map(async M=>{let B=await xv(T,M.id);return[M.id,B?.counts??null]}))).filter(M=>M[1]!==null));Ee(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:Iv({projects:v.projects,compositionCountsByProjectId:I,cloudAppOrigin:w,syncMessage:v.message,syncOk:v.ok,flashMessage:L,flashError:W})}));return}if(A==="GET"&&u==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=$(),v=w===null?null:Y({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),W=f.length>0&&v!==null?Br():null;if(W===null||v===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Ye({projectFolderPath:W}),!await Ca(v,f,W)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(A==="POST"&&u==="/projects/delete"){let b=await Jt(h),f=new URLSearchParams(b).get("projectId")?.trim()??"",w=$(),v=w===null?null:Y({wsUrl:w.wsUrl,pairingToken:w.pairingToken});if(v===null||f.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let W=await cA(v,f);y.writeHead(303,{Location:W.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(A==="GET"&&u==="/project"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=b.searchParams.get("id")?.trim()??"",w=o(),v=kt(w.installVersion),W=await Ng(e.layout),L=Ho(W.projects,f);if(L===null){await p(y,"Project not found");return}let E=b.searchParams.get("linked")==="1"?b.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${b.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${b.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:b.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,T=b.searchParams.get("knowledgePromoted"),I=T!==null?`Marked ${T} lesson(s) as promoted in Agent Witch.`:null,M=b.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,B=b.searchParams.get("tab")?.trim()??"harness",q=B==="workflows"||B==="agents"||B==="knowledge"?B:"harness",F=$(),ct=F===null?null:Y({wsUrl:F.wsUrl,pairingToken:F.pairingToken}),H=ct===null?null:await xv(ct,L.id),ge=0;if(ct!==null)try{let ao=await fetch(`${ct.appOrigin}/api/agent-witch/projects/${encodeURIComponent(L.id)}/knowledge`,{method:"GET",headers:{[Ie]:ct.pairingToken},signal:AbortSignal.timeout(1e4)});if(ao.ok){let Ct=await ao.json();typeof Ct=="object"&&Ct!==null&&typeof Ct.candidateCount=="number"&&(ge=Ct.candidateCount)}}catch{ge=0}Ee(y,await n({title:L.name,activePath:"/projects",installVersion:w.installVersion,body:ss({project:L,cloudAppOrigin:v,installed:Ur(e.layout),linkedSetSlugs:Hr(L.projectFolderPath),composition:H,knowledgeCandidateCount:ge,activeTab:q,flashMessage:E??I,flashError:M})}));return}if(A==="POST"&&u==="/projects/pull-bound-harness"){let b=await Jt(h),f=await nA({rawBody:b,layout:e.layout});if(f.kind==="not_found"){await p(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let w=o();Ee(y,await n({title:f.title,activePath:"/projects",installVersion:w.installVersion,body:f.body}));return}if(A==="POST"&&u==="/projects/link-harness"){let b=await Jt(h),f=new URLSearchParams(b),w=f.get("projectId")?.trim()??"",v=await Ng(e.layout),W=Ho(v.projects,w);if(W===null){await p(y,"Project not found");return}let L=f.getAll("applySet").map(q=>String(q)),E=ha({layout:e.layout,projectFolderPath:W.projectFolderPath,setSlugs:L});if(!E.ok){let q=o(),F=kt(q.installVersion);Ee(y,await n({title:W.name,activePath:"/projects",installVersion:q.installVersion,body:ss({project:W,cloudAppOrigin:F,installed:Ur(e.layout),linkedSetSlugs:Hr(W.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:E.errorMessage})}));return}let T=$(),I=T===null?null:Y({wsUrl:T.wsUrl,pairingToken:T.pairingToken}),M=I===null?!1:await ka(I,W.id,E.appliedSetSlugs),B=new URLSearchParams({linked:"1",files:String(E.writtenFileCount),bindingsSynced:M?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(W.id)}&${B.toString()}`}),y.end();return}if(A==="POST"&&u==="/project/knowledge/promote-all"){let b=await Jt(h),w=new URLSearchParams(b).get("projectId")?.trim()??"",v=await Ng(e.layout),W=Ho(v.projects,w);if(W===null){await p(y,"Project not found");return}let L=$(),E=L===null?null:Y({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),T=E===null?{ok:!1,promotedCount:0}:await K$(E,W.id),I=new URLSearchParams({tab:"knowledge",...T.ok?{knowledgePromoted:String(T.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(W.id)}&${I.toString()}`}),y.end();return}if(A==="GET"&&u==="/harness"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=ba(e.layout),v=b.searchParams.get("submitted")==="1",W=v?b.searchParams.get("syncFailed")==="1"?`Local harness updated (${b.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:b.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${b.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":b.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:b.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,L=w?.scanRoots[0]??lp(),E=f7(e.layout,{reveal:w,importQuery:b.searchParams.get("import")==="1",justSubmitted:v}),T=kt(f.installVersion);Ee(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:ic(Qv(e.layout,{cloudAppOrigin:T,reveal:w,scanFolder:L,flashMessage:W,importSectionExpanded:E}))}));return}if(A==="POST"&&u==="/api/harness/pick-folder"){let b=Br();if(b===null){pe(y,200,{cancelled:!0});return}pe(y,200,{path:b});return}if(A==="GET"&&u==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=fa(f);if(w===null){pe(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let v=ac.default.readFileSync(w,"utf8"),W=v.length>fH?`${v.slice(0,fH)}
\u2026 (truncated)`:v;pe(y,200,{content:W})}catch{pe(y,500,{errorMessage:"Could not read file."})}return}if(A==="POST"&&u==="/api/harness/reveal/add-project"){let b=await Jt(h),f="";try{let W=JSON.parse(b);typeof W=="object"&&W!==null&&typeof W.projectPath=="string"&&(f=W.projectPath.trim())}catch{pe(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){pe(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=ba(e.layout),v=NS({reveal:w,projectPath:f});if(v===null||v.sets.length===0){pe(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}pp(e.layout,v),pe(y,200,{ok:!0,setCount:v.sets.length});return}if(A==="GET"&&u==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){pe(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;h.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...o_});let v=zS({scanRoot:f,response:y,shouldAbort:()=>w});pp(e.layout,v),y.end();return}if(A==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(A==="POST"&&u==="/harness/submit"){let b=ba(e.layout);if(b===null){let T=o(),I=kt(T.installVersion);Ee(y,await n({title:"Harness",activePath:"/harness",installVersion:T.installVersion,body:ic(Qv(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await Jt(h),w=new URLSearchParams(f),v=Tv(w,b),W=DS({layout:e.layout,sets:v});if(!W.ok){let T=o(),I=kt(T.installVersion);Ee(y,await n({title:"Harness",activePath:"/harness",installVersion:T.installVersion,body:ic(Qv(e.layout,{cloudAppOrigin:I,reveal:b,flashError:W.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}HS(e.layout);let E=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${W.writtenItemCount??0}${E}`}),y.end();return}if(A==="GET"&&u==="/writer-api"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),w=$()?.writerExecutionBackend??xe(void 0),v=ve(e.layout.configPath),W=zr(v),L=b.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,E=o();Ee(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:E.installVersion,body:Cv({writerExecutionBackend:w,secrets:W,flashMessage:L})}));return}if(A==="POST"&&u==="/writer-api"){let b=await Jt(h),f=new URLSearchParams(b),w=f.get("writerExecutionBackend")?.trim()??"cli";Vy({configPath:e.layout.configPath,writerExecutionBackend:xe(w),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(A==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(A==="GET"&&u==="/history"){let b=o();Ee(y,await n({title:"History",activePath:"/history",installVersion:b.installVersion,body:gv({reportsDir:e.layout.reportsDir})}));return}if(A==="GET"&&u==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),v=Ib({layout:e.layout}),W=Nb(v),L=f.length>0?await As({layout:e.layout,query:f,limit:20}):Ss(e.layout).slice(-50).reverse(),E=L.map(I=>{let M=Mb(v,I.id),B=M>0?` \xB7 used in ${M} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${le(I.createdAt)}">${le(r_(I.createdAt))}${I.source?` \xB7 ${le(I.source)}`:""}${B}</div><pre>${le(I.text)}</pre></article>`}).join(""),T=W.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${W.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${le(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Ee(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${le(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${T}${E}${S7(f,L.length)}`}));return}A==="POST"&&await Jt(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return S.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),S.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${nr}`)}),S},cc=e=>Mg(e).publicKeyRaw});var zg=l(()=>{"use strict";Cx();Rx();bH()});var wH={};Rt(wH,{runAgentWitchExternalLiveCli:()=>P7});var n_,PH,b7,P7,vH=l(()=>{"use strict";n_=g(require("node:fs")),PH=g(require("node:path"));ls();K();te();zg();te();b7=e=>{let t=PH.default.join(e,"link-code.txt");if(!n_.default.existsSync(t))return null;let r=n_.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},P7=()=>{Ve("agent-witch-live");let e=k(),t=N(),r=b7(e),o=cc(t);lc({layout:t,controllers:{getStatus:()=>{let n=We(t);return{wsConnected:ja(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{Ao(e)}}})}});var _r=_((P0e,LH)=>{"use strict";var _H=["nodebuffer","arraybuffer","fragments"],WH=typeof Blob<"u";WH&&_H.push("blob");LH.exports={BINARY_TYPES:_H,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:WH,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var dc=_((w0e,jg)=>{"use strict";var{EMPTY_BUFFER:w7}=_r(),s_=Buffer[Symbol.species];function v7(e,t){if(e.length===0)return w7;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new s_(r.buffer,r.byteOffset,o):r}function kH(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function EH(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function _7(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function i_(e){if(i_.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new s_(e):ArrayBuffer.isView(e)?t=new s_(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),i_.readOnly=!1),t}jg.exports={concat:v7,mask:kH,toArrayBuffer:_7,toBuffer:i_,unmask:EH};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");jg.exports.mask=function(t,r,o,n,s){s<48?kH(t,r,o,n,s):e.mask(t,r,o,n,s)},jg.exports.unmask=function(t,r){t.length<32?EH(t,r):e.unmask(t,r)}}catch{}});var TH=_((v0e,RH)=>{"use strict";var CH=Symbol("kDone"),a_=Symbol("kRun"),l_=class{constructor(t){this[CH]=()=>{this.pending--,this[a_]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[a_]()}[a_](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[CH])}}};RH.exports=l_});var Ys=_((_0e,MH)=>{"use strict";var uc=require("zlib"),xH=dc(),W7=TH(),{kStatusCode:IH}=_r(),L7=Buffer[Symbol.species],k7=Buffer.from([0,0,255,255]),$g=Symbol("permessage-deflate"),Wr=Symbol("total-length"),Ks=Symbol("callback"),oo=Symbol("buffers"),Js=Symbol("error"),Dg,c_=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Dg){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Dg=new W7(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Ks];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){Dg.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){Dg.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?uc.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=uc.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[$g]=this,this._inflate[Wr]=0,this._inflate[oo]=[],this._inflate.on("error",C7),this._inflate.on("data",OH)}this._inflate[Ks]=o,this._inflate.write(t),r&&this._inflate.write(k7),this._inflate.flush(()=>{let s=this._inflate[Js];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=xH.concat(this._inflate[oo],this._inflate[Wr]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Wr]=0,this._inflate[oo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?uc.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=uc.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Wr]=0,this._deflate[oo]=[],this._deflate.on("data",E7)}this._deflate[Ks]=o,this._deflate.write(t),this._deflate.flush(uc.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=xH.concat(this._deflate[oo],this._deflate[Wr]);r&&(s=new L7(s.buffer,s.byteOffset,s.length-4)),this._deflate[Ks]=null,this._deflate[Wr]=0,this._deflate[oo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};MH.exports=c_;function E7(e){this[oo].push(e),this[Wr]+=e.length}function OH(e){if(this[Wr]+=e.length,this[$g]._maxPayload<1||this[Wr]<=this[$g]._maxPayload){this[oo].push(e);return}this[Js]=new RangeError("Max payload size exceeded"),this[Js].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Js][IH]=1009,this.removeListener("data",OH),this.reset()}function C7(e){if(this[$g]._inflate=null,this[Js]){this[Ks](this[Js]);return}e[IH]=1007,this[Ks](e)}});var Xs=_((W0e,Hg)=>{"use strict";var{isUtf8:NH}=require("buffer"),{hasBlob:R7}=_r(),T7=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function x7(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function d_(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function I7(e){return R7&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Hg.exports={isBlob:I7,isValidStatusCode:x7,isValidUTF8:d_,tokenChars:T7};if(NH)Hg.exports.isValidUTF8=function(e){return e.length<24?d_(e):NH(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Hg.exports.isValidUTF8=function(t){return t.length<32?d_(t):e(t)}}catch{}});var f_=_((L0e,UH)=>{"use strict";var{Writable:O7}=require("stream"),zH=Ys(),{BINARY_TYPES:M7,EMPTY_BUFFER:jH,kStatusCode:N7,kWebSocket:z7}=_r(),{concat:u_,toArrayBuffer:j7,unmask:D7}=dc(),{isValidStatusCode:$7,isValidUTF8:DH}=Xs(),Fg=Buffer[Symbol.species],it=0,$H=1,HH=2,FH=3,p_=4,m_=5,Ug=6,g_=class extends O7{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||M7[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[z7]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=it}_write(t,r,o){if(this._opcode===8&&this._state==it)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new Fg(o.buffer,o.byteOffset+t,o.length-t),new Fg(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new Fg(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case it:this.getInfo(t);break;case $H:this.getPayloadLength16(t);break;case HH:this.getPayloadLength64(t);break;case FH:this.getMask();break;case p_:this.getData(t);break;case m_:case Ug:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[zH.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=$H:this._payloadLength===127?this._state=HH:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=FH:this._state=p_}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=p_}getData(t){let r=jH;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&D7(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=m_,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[zH.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===it&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=it;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=u_(o,r):this._binaryType==="arraybuffer"?n=j7(u_(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=it):(this._state=Ug,setImmediate(()=>{this.emit("message",n,!0),this._state=it,this.startLoop(t)}))}else{let n=u_(o,r);if(!this._skipUTF8Validation&&!DH(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===m_||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=it):(this._state=Ug,setImmediate(()=>{this.emit("message",n,!1),this._state=it,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,jH),this.end();else{let o=t.readUInt16BE(0);if(!$7(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new Fg(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!DH(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=it;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=it):(this._state=Ug,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=it,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[N7]=n,i}};UH.exports=g_});var S_=_((E0e,qH)=>{"use strict";var{Duplex:k0e}=require("stream"),{randomFillSync:H7}=require("crypto"),{types:{isUint8Array:F7}}=require("util"),BH=Ys(),{EMPTY_BUFFER:U7,kWebSocket:B7,NOOP:G7}=_r(),{isBlob:Zs,isValidStatusCode:q7}=Xs(),{mask:GH,toBuffer:yn}=dc(),at=Symbol("kByteLength"),V7=Buffer.alloc(4),Bg=8*1024,Sn,Qs=Bg,Et=0,K7=1,J7=2,h_=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Et,this.onerror=G7,this[B7]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||V7,r.generateMask?r.generateMask(o):(Qs===Bg&&(Sn===void 0&&(Sn=Buffer.alloc(Bg)),H7(Sn,0,Bg),Qs=0),o[0]=Sn[Qs++],o[1]=Sn[Qs++],o[2]=Sn[Qs++],o[3]=Sn[Qs++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[at]!==void 0?a=r[at]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(GH(t,o,d,s,a),[d]):(GH(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=U7;else{if(typeof t!="number"||!q7(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(F7(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[at]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Et?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Zs(t)?(n=t.size,s=!1):(t=yn(t),n=t.length,s=yn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[at]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Zs(t)?this._state!==Et?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Et?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Zs(t)?(n=t.size,s=!1):(t=yn(t),n=t.length,s=yn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[at]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Zs(t)?this._state!==Et?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Et?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[BH.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Zs(t)?(a=t.size,c=!1):(t=yn(t),a=t.length,c=yn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[at]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Zs(t)?this._state!==Et?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Et?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[at],this._state=J7,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(y_,this,a,n);return}this._bufferedBytes-=o[at];let i=yn(s);r?this.dispatch(i,r,o,n):(this._state=Et,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(Y7,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[BH.extensionName];this._bufferedBytes+=o[at],this._state=K7,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");y_(this,c,n);return}this._bufferedBytes-=o[at],this._state=Et,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Et&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][at],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][at],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};qH.exports=h_;function y_(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function Y7(e,t,r){y_(e,t,r),e.onerror(t)}});var tF=_((C0e,eF)=>{"use strict";var{kForOnEventAttribute:pc,kListener:A_}=_r(),VH=Symbol("kCode"),KH=Symbol("kData"),JH=Symbol("kError"),YH=Symbol("kMessage"),XH=Symbol("kReason"),ei=Symbol("kTarget"),ZH=Symbol("kType"),QH=Symbol("kWasClean"),Lr=class{constructor(t){this[ei]=null,this[ZH]=t}get target(){return this[ei]}get type(){return this[ZH]}};Object.defineProperty(Lr.prototype,"target",{enumerable:!0});Object.defineProperty(Lr.prototype,"type",{enumerable:!0});var An=class extends Lr{constructor(t,r={}){super(t),this[VH]=r.code===void 0?0:r.code,this[XH]=r.reason===void 0?"":r.reason,this[QH]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[VH]}get reason(){return this[XH]}get wasClean(){return this[QH]}};Object.defineProperty(An.prototype,"code",{enumerable:!0});Object.defineProperty(An.prototype,"reason",{enumerable:!0});Object.defineProperty(An.prototype,"wasClean",{enumerable:!0});var ti=class extends Lr{constructor(t,r={}){super(t),this[JH]=r.error===void 0?null:r.error,this[YH]=r.message===void 0?"":r.message}get error(){return this[JH]}get message(){return this[YH]}};Object.defineProperty(ti.prototype,"error",{enumerable:!0});Object.defineProperty(ti.prototype,"message",{enumerable:!0});var mc=class extends Lr{constructor(t,r={}){super(t),this[KH]=r.data===void 0?null:r.data}get data(){return this[KH]}};Object.defineProperty(mc.prototype,"data",{enumerable:!0});var X7={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[pc]&&n[A_]===t&&!n[pc])return;let o;if(e==="message")o=function(s,i){let a=new mc("message",{data:i?s:s.toString()});a[ei]=this,Gg(t,this,a)};else if(e==="close")o=function(s,i){let a=new An("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[ei]=this,Gg(t,this,a)};else if(e==="error")o=function(s){let i=new ti("error",{error:s,message:s.message});i[ei]=this,Gg(t,this,i)};else if(e==="open")o=function(){let s=new Lr("open");s[ei]=this,Gg(t,this,s)};else return;o[pc]=!!r[pc],o[A_]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[A_]===t&&!r[pc]){this.removeListener(e,r);break}}};eF.exports={CloseEvent:An,ErrorEvent:ti,Event:Lr,EventTarget:X7,MessageEvent:mc};function Gg(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var qg=_((R0e,rF)=>{"use strict";var{tokenChars:gc}=Xs();function Yt(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function Z7(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(p===-1&&gc[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m);let h=e.slice(c,p);d===44?(Yt(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(p===-1&&gc[d]===1)c===-1&&(c=m);else if(d===32||d===9)p===-1&&c!==-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m),Yt(r,e.slice(c,p),!0),d===44&&(Yt(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,m),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(gc[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(gc[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,p=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(p===-1&&gc[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))p===-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m);let h=e.slice(c,p);o&&(h=h.replace(/\\/g,""),o=!1),Yt(r,a,h),d===44&&(Yt(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=m);let S=e.slice(c,p);return i===void 0?Yt(t,S,r):(a===void 0?Yt(r,S,!0):o?Yt(r,a,S.replace(/\\/g,"")):Yt(r,a,S),Yt(t,i,r)),t}function Q7(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}rF.exports={format:Q7,parse:Z7}});var Yg=_((I0e,gF)=>{"use strict";var e9=require("events"),t9=require("https"),r9=require("http"),sF=require("net"),o9=require("tls"),{randomBytes:n9,createHash:s9}=require("crypto"),{Duplex:T0e,Readable:x0e}=require("stream"),{URL:b_}=require("url"),no=Ys(),i9=f_(),a9=S_(),{isBlob:l9}=Xs(),{BINARY_TYPES:oF,CLOSE_TIMEOUT:c9,EMPTY_BUFFER:Vg,GUID:d9,kForOnEventAttribute:P_,kListener:u9,kStatusCode:p9,kWebSocket:be,NOOP:iF}=_r(),{EventTarget:{addEventListener:m9,removeEventListener:g9}}=tF(),{format:f9,parse:h9}=qg(),{toBuffer:y9}=dc(),aF=Symbol("kAborted"),w_=[8,13],kr=["CONNECTING","OPEN","CLOSING","CLOSED"],S9=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,X=class e extends e9{constructor(t,r,o){super(),this._binaryType=oF[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Vg,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),lF(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){oF.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new i9({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new a9(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[be]=this,s[be]=this,t[be]=this,n.on("conclude",P9),n.on("drain",w9),n.on("error",v9),n.on("message",_9),n.on("ping",W9),n.on("pong",L9),s.onerror=k9,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",uF),t.on("data",Jg),t.on("end",pF),t.on("error",mF),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[no.extensionName]&&this._extensions[no.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){tt(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,dF(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){v_(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Vg,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){v_(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Vg,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){v_(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[no.extensionName]||(n.compress=!1),this._sender.send(t||Vg,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){tt(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(X,"CONNECTING",{enumerable:!0,value:kr.indexOf("CONNECTING")});Object.defineProperty(X.prototype,"CONNECTING",{enumerable:!0,value:kr.indexOf("CONNECTING")});Object.defineProperty(X,"OPEN",{enumerable:!0,value:kr.indexOf("OPEN")});Object.defineProperty(X.prototype,"OPEN",{enumerable:!0,value:kr.indexOf("OPEN")});Object.defineProperty(X,"CLOSING",{enumerable:!0,value:kr.indexOf("CLOSING")});Object.defineProperty(X.prototype,"CLOSING",{enumerable:!0,value:kr.indexOf("CLOSING")});Object.defineProperty(X,"CLOSED",{enumerable:!0,value:kr.indexOf("CLOSED")});Object.defineProperty(X.prototype,"CLOSED",{enumerable:!0,value:kr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(X.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(X.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[P_])return t[u9];return null},set(t){for(let r of this.listeners(e))if(r[P_]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[P_]:!0})}})});X.prototype.addEventListener=m9;X.prototype.removeEventListener=g9;gF.exports=X;function lF(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:c9,protocolVersion:w_[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!w_.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${w_.join(", ")})`);let s;if(t instanceof b_)s=t;else try{s=new b_(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;Kg(e,u);return}let d=i?443:80,p=n9(16).toString("base64"),m=i?t9.request:r9.request,S=new Set,h;if(n.createConnection=n.createConnection||(i?b9:A9),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new no({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=f9({[no.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!S9.test(u)||S.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(u)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let u=n.path.split(":");n.socketPath=u[0],n.path=u[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let u=o&&o.headers;if(o={...o,headers:{}},u)for(let[A,b]of Object.entries(u))o.headers[A.toLowerCase()]=b}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,u||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=m(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=m(n);n.timeout&&y.on("timeout",()=>{tt(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[aF]||(y=e._req=null,Kg(e,u))}),y.on("response",u=>{let A=u.headers.location,b=u.statusCode;if(A&&n.followRedirects&&b>=300&&b<400){if(++e._redirects>n.maxRedirects){tt(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new b_(A,t)}catch{let v=new SyntaxError(`Invalid URL: ${A}`);Kg(e,v);return}lF(e,f,r,o)}else e.emit("unexpected-response",y,u)||tt(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,A,b)=>{if(e.emit("upgrade",u),e.readyState!==X.CONNECTING)return;y=e._req=null;let f=u.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){tt(e,A,"Invalid Upgrade header");return}let w=s9("sha1").update(p+d9).digest("base64");if(u.headers["sec-websocket-accept"]!==w){tt(e,A,"Invalid Sec-WebSocket-Accept header");return}let v=u.headers["sec-websocket-protocol"],W;if(v!==void 0?S.size?S.has(v)||(W="Server sent an invalid subprotocol"):W="Server sent a subprotocol but none was requested":S.size&&(W="Server sent no subprotocol"),W){tt(e,A,W);return}v&&(e._protocol=v);let L=u.headers["sec-websocket-extensions"];if(L!==void 0){if(!h){tt(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let E;try{E=h9(L)}catch{tt(e,A,"Invalid Sec-WebSocket-Extensions header");return}let T=Object.keys(E);if(T.length!==1||T[0]!==no.extensionName){tt(e,A,"Server indicated an extension that was not requested");return}try{h.accept(E[no.extensionName])}catch{tt(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[no.extensionName]=h}e.setSocket(A,b,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Kg(e,t){e._readyState=X.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function A9(e){return e.path=e.socketPath,sF.connect(e)}function b9(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=sF.isIP(e.host)?"":e.host),o9.connect(e)}function tt(e,t,r){e._readyState=X.CLOSING;let o=new Error(r);Error.captureStackTrace(o,tt),t.setHeader?(t[aF]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Kg,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function v_(e,t,r){if(t){let o=l9(t)?t.size:y9(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${kr[e.readyState]})`);process.nextTick(r,o)}}function P9(e,t){let r=this[be];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[be]!==void 0&&(r._socket.removeListener("data",Jg),process.nextTick(cF,r._socket),e===1005?r.close():r.close(e,t))}function w9(){let e=this[be];e.isPaused||e._socket.resume()}function v9(e){let t=this[be];t._socket[be]!==void 0&&(t._socket.removeListener("data",Jg),process.nextTick(cF,t._socket),t.close(e[p9])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function nF(){this[be].emitClose()}function _9(e,t){this[be].emit("message",e,t)}function W9(e){let t=this[be];t._autoPong&&t.pong(e,!this._isServer,iF),t.emit("ping",e)}function L9(e){this[be].emit("pong",e)}function cF(e){e.resume()}function k9(e){let t=this[be];t.readyState!==X.CLOSED&&(t.readyState===X.OPEN&&(t._readyState=X.CLOSING,dF(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function dF(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function uF(){let e=this[be];if(this.removeListener("close",uF),this.removeListener("data",Jg),this.removeListener("end",pF),e._readyState=X.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[be]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",nF),e._receiver.on("finish",nF))}function Jg(e){this[be]._receiver.write(e)||this.pause()}function pF(){let e=this[be];e._readyState=X.CLOSING,e._receiver.end(),this.end()}function mF(){let e=this[be];this.removeListener("error",mF),this.on("error",iF),e&&(e._readyState=X.CLOSING,this.destroy())}});var SF=_((M0e,yF)=>{"use strict";var O0e=Yg(),{Duplex:E9}=require("stream");function fF(e){e.emit("close")}function C9(){!this.destroyed&&this._writableState.finished&&this.destroy()}function hF(e){this.removeListener("error",hF),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function R9(e,t){let r=!0,o=new E9({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(fF,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(fF,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",C9),o.on("error",hF),o}yF.exports=R9});var __=_((N0e,AF)=>{"use strict";var{tokenChars:T9}=Xs();function x9(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&T9[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}AF.exports={parse:x9}});var LF=_((j0e,WF)=>{"use strict";var I9=require("events"),Xg=require("http"),{Duplex:z0e}=require("stream"),{createHash:O9}=require("crypto"),bF=qg(),bn=Ys(),M9=__(),N9=Yg(),{CLOSE_TIMEOUT:z9,GUID:j9,kWebSocket:D9}=_r(),$9=/^[+/0-9A-Za-z]{22}==$/,PF=0,wF=1,_F=2,W_=class extends I9{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:z9,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:N9,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Xg.createServer((o,n)=>{let s=Xg.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=H9(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=PF}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===_F){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(fc,this);return}if(t&&this.once("close",t),this._state!==wF)if(this._state=wF,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(fc,this):process.nextTick(fc,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{fc(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",vF);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Pn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Pn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!$9.test(s)){Pn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Pn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){hc(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=M9.parse(c)}catch{Pn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&p!==void 0){let S=new bn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=bF.parse(p);h[bn.extensionName]&&(S.accept(h[bn.extensionName]),m[bn.extensionName]=S)}catch{Pn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(h,y,u,A)=>{if(!h)return hc(r,y||401,u,A);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return hc(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[D9])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>PF)return hc(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${O9("sha1").update(r+j9).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),p._protocol=m)}if(t[bn.extensionName]){let m=t[bn.extensionName].params,S=bF.format({[bn.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${S}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",vF),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(fc,this)})),a(p,n)}};WF.exports=W_;function H9(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function fc(e){e._state=_F,e.emit("close")}function vF(){this.destroy()}function hc(e,t,r,o){r=r||Xg.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Xg.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Pn(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Pn),e.emit("wsClientError",i,r,t)}else hc(r,o,n,s)}});var F9,U9,B9,G9,q9,V9,kF,K9,yc,EF=l(()=>{F9=g(SF(),1),U9=g(qg(),1),B9=g(Ys(),1),G9=g(f_(),1),q9=g(S_(),1),V9=g(__(),1),kF=g(Yg(),1),K9=g(LF(),1),yc=kF.default});var L_,k_,E_=l(()=>{"use strict";L_="AGENT_WITCH_EXTERNAL_BRIDGE",k_="AGENT_WITCH_EXTERNAL_LIVE"});var C_,CF=l(()=>{"use strict";C_=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var J9,R_,RF=l(()=>{"use strict";E_();CF();J9=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",R_=(e={})=>{let t=e.env??process.env,r=C_(t[L_]),o=C_(t[k_]);return{mode:J9(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var TF=l(()=>{"use strict";E_()});var xF=l(()=>{"use strict";RF();TF()});var T_=l(()=>{"use strict"});var Er,Sc=l(()=>{"use strict";Er=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var ri,wn,IF,X9,x_,I_,OF,MF,O_,NF,Ac,M_=l(()=>{"use strict";ri=g(require("node:fs")),wn=g(require("node:os")),IF=g(require("node:path"));T_();Sc();X9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),x_=(e=wn.default.hostname())=>IF.default.join(wn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),I_=e=>{if(!ri.default.existsSync(e))return null;try{let t=JSON.parse(ri.default.readFileSync(e,"utf8"));return!X9(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},OF=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},MF=(e,t)=>{ri.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},O_=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??x_(),o=I_(r);if(o!==null&&o.pid!==process.pid&&Er(o.pid)&&OF(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:wn.default.hostname(),macOsUsername:wn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return MF(r,n),{ok:!0}},NF=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??x_(),o=I_(r);return o!==null&&o.pid!==process.pid&&Er(o.pid)&&OF(o)?{ok:!1}:(MF(r,{hostname:wn.default.hostname(),macOsUsername:wn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},Ac=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??x_();I_(r)?.pid===process.pid&&ri.default.existsSync(r)&&ri.default.unlinkSync(r)}});var N_,bc,Z9,Q9,eY,tY,z_,zF=l(()=>{"use strict";N_=require("node:child_process"),bc=g(require("node:path"));Sc();au();Z9=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),Q9=(e,t)=>{if(Z9(e)||!/\bnode\b/.test(e))return!1;let r=bc.default.resolve(t),o=bc.default.join(r,"app",Ci),n=bc.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Ci||i==="agent-witch.ts")return e.includes(r);try{let a=bc.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},eY=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,N_.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},tY=(e,t,r)=>{let o=eY(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||Q9(d,t)&&n.push(c)}return n},z_=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,N_.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=tY(r,e.installDir,t),n=[];for(let s of o)if(Er(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var Pc,wc,jF,rY,j_,DF=l(()=>{"use strict";Pc=g(require("node:fs")),wc=g(require("node:path"));Re();jF=(e,t)=>{!Pc.default.existsSync(e)||Pc.default.existsSync(t)||(Pc.default.mkdirSync(wc.default.dirname(t),{recursive:!0}),Pc.default.renameSync(e,t))},rY=e=>{if(e.profileEmail===null)return;let t=wc.default.join(e.installDir,dt);jF(wc.default.join(t,En),e.mainLogPath),jF(wc.default.join(t,Cn),e.errorLogPath)},j_=e=>{let t=N();e!==void 0&&t.installDir!==e||rY(t)}});var $F=l(()=>{"use strict";Ga();Kp();Kp();!Ke()&&vo(__agentWitchImportMetaUrl)&&(async()=>{Ve("agent-witch-wake-server");let e=await Go(),t=or(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var HF=l(()=>{"use strict";$F()});var FF=l(()=>{"use strict";Ta()});var D_,UF=l(()=>{"use strict";T_();HF();M_();FF();D_=async(e={})=>{let t=e.skipInProcessBridge?null:await Vp();Lp();let r=setInterval(()=>{Lp()},6e4),o=setInterval(()=>{if(!NF().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var vc,Zg,sY,BF,GF,Qg,qF,VF,$_,KF,ef,JF=l(()=>{"use strict";vc=g(require("node:fs")),Zg=g(require("node:path")),sY="pending-run-inputs.json",BF=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GF=e=>{let t=e.profileEmail?Zg.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Zg.default.join(t,sY)},Qg=e=>{let t=GF(e);if(!vc.default.existsSync(t))return{};try{let r=JSON.parse(vc.default.readFileSync(t,"utf8"));return BF(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!BF(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},qF=(e,t)=>{let r=GF(e);vc.default.mkdirSync(Zg.default.dirname(r),{recursive:!0}),vc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},VF=e=>Object.values(Qg(e)),$_=(e,t)=>Qg(e)[t]!==void 0,KF=(e,t)=>{let r=Qg(e);r[t.agentRunId]=t,qF(e,r)},ef=(e,t)=>{let r=Qg(e);delete r[t],qF(e,r)}});var tf=l(()=>{"use strict";ue()});var YF=l(()=>{"use strict";ue()});var rf=l(()=>{"use strict";ue()});var of=l(()=>{"use strict";ue()});var _c=l(()=>{"use strict";ue()});var iY,aY,Wc,H_=l(()=>{"use strict";ht();tf();YF();rf();of();_c();iY={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},aY={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Wc=e=>{if(!ce(e.writerAgent))return"the selected writer";let t=Je(e.writerAgent);if(xe(e.writerExecutionBackend)==="api"&&t!==null){let r=Fe(ve(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Xi(t,r.model);return`${aY[t]} model ${o}`}}return iY[e.writerAgent]}});var lY,cY,XF,ZF,QF=l(()=>{"use strict";lY=/"input_tokens"\s*:\s*(\d+)/,cY=/"output_tokens"\s*:\s*(\d+)/,XF=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},ZF=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=XF(lY.exec(t)),o=XF(cY.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var nf=l(()=>{"use strict";$t()});var Lc,sf,dY,F_,e1,t1,r1,U_,o1=l(()=>{"use strict";Lc=g(require("node:fs")),sf=g(require("node:path"));nf();dY="run-completion-outbox.json",F_=e=>{let t=e.profileEmail?sf.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return sf.default.join(t,dY)},e1=e=>{let t=F_(e);if(!Lc.default.existsSync(t))return[];try{let r=JSON.parse(Lc.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},t1=(e,t)=>{Lc.default.mkdirSync(sf.default.dirname(F_(e)),{recursive:!0}),Lc.default.writeFileSync(F_(e),JSON.stringify(t,null,2),"utf8")},r1=(e,t)=>{let r=[...e1(e).filter(o=>o.runId!==t.runId),t];t1(e,r)},U_=async e=>{if(e.cloudApi===null)return;let t=e1(e.layout);if(t.length===0)return;let r=[];for(let o of t)await Wa(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);t1(e.layout,r)}});var n1=l(()=>{"use strict"});var B_,kc,pY,vn,s1=l(()=>{"use strict";n1();B_=new Map,kc=e=>{let t=B_.get(e);t!==void 0&&(clearInterval(t),B_.delete(e))},pY=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},vn=(e,t,r,o={})=>{kc(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){kc(t);return}let i=o.onTick?.()??{};pY(e,t,n,i)};s(),B_.set(t,setInterval(s,15e3))}});var i1=l(()=>{"use strict";$t()});var a1,l1=l(()=>{"use strict";i1();a1=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:rt(t)}});var G_,Ec,Cr,q_,Xt,c1,af=l(()=>{"use strict";G_=new Set,Ec=new Map,Cr=(e,t)=>{if(t.length===0)return;let r=Ec.get(e)??[];r.push(t),Ec.set(e,r)},q_=e=>{G_.add(e);let t=Ec.get(e)??[];return Ec.delete(e),t},Xt=e=>G_.has(e),c1=e=>{G_.delete(e),Ec.delete(e)}});var oi,d1,u1,p1=l(()=>{"use strict";oi=g(require("node:path")),d1=require("node:url");wo();u1=()=>{if(Ke()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?oi.default.dirname(oi.default.resolve(e)):oi.default.dirname(oi.default.resolve(__filename))}return oi.default.dirname((0,d1.fileURLToPath)(__agentWitchImportMetaUrl))}});var m1,g1,f1,h1,qe,ni,y1,S1,si,V_,K_,J_,A1,Y_,b1,lf=l(()=>{"use strict";m1=require("node:crypto"),g1=g(require("node:fs")),f1=g(require("node:path")),h1=require("node:url");Sc();wo();p1();qe=new Map,y1=async()=>{if(ni!==void 0)return ni;try{if(Ke()){let e=u1(),t=f1.default.join(e,"deps","node-pty","lib","index.js");if(g1.default.existsSync(t)){let r=await import((0,h1.pathToFileURL)(t).href);return ni=r,r}}return ni=await import("node-pty"),ni}catch{return ni=null,null}},S1=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},si=(e,t,r)=>{let o=qe.get(e);if(o!==void 0){qe.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},V_=(e,t)=>{let r=qe.get(e);return r===void 0?!1:(r.pty.write(t),!0)},K_=(e,t,r)=>{let o=qe.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},J_=e=>{for(let t of qe.values())if(!(t.mode!=="agent"||t.runId!==e))return Er(t.pty.pid);return!1},A1=e=>{for(let[t,r]of qe.entries())if(!(r.mode!=="agent"||r.runId!==e)){qe.delete(t);try{r.pty.kill()}catch{}return!0}return!1},Y_=async e=>{let t=await y1();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;qe.get(e.shellSessionId)!==void 0&&si(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return qe.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{S1(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{qe.get(e.shellSessionId)?.pty===n&&(qe.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},b1=async e=>{let t=e.shellSessionId??(0,m1.randomUUID)(),r=await y1();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return qe.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{S1(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{qe.get(t)?.pty===o&&(qe.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var cf,P1,w1=l(()=>{"use strict";cf="[[AWAITING_INPUT]]",P1=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",cf,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Cc,v1,df=l(()=>{"use strict";w1();Cc=e=>{let t=e.indexOf(cf);if(t<0)return null;let o=e.slice(t+cf.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},v1=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",P1].join(`
`)});var _1,W1=l(()=>{"use strict";af();lf();df();_1=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(Xt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Cr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await b1({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Cc(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var L1,k1,E1,Rr,uf=l(()=>{"use strict";L1=require("node:child_process"),k1=g(require("node:fs")),E1=g(require("node:path"));au();Rr=(e,t)=>{let r=E1.default.join(e,"app",pE,"ensure-writer.sh");return k1.default.existsSync(r)?new Promise((o,n)=>{let s=(0,L1.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var C1,_n,Tc,pf,X_,Rc,mf,gf,Z_,Q_,mY,ii,gY,fY,eW,tW=l(()=>{"use strict";C1=require("node:child_process");ht();uf();rf();tf();_c();of();_n=new Map,Tc=e=>e==="cursor"||e==="antigravity",pf=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",X_=e=>_n.get(e)?.warmed===!0,Rc=e=>{let t=_n.get(e);_n.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},mf=e=>_n.get(e)?.conversationStarted===!0,gf=e=>{let t=_n.get(e);_n.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},Z_=e=>{_n.delete(e)},Q_=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",mY={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ii=e=>`${mY[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,gY=(e,t,r,o)=>new Promise(n=>{let s=wu(t,r),i=[],a=(0,C1.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),fY=(e,t)=>{let r=ii(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},eW=async e=>{if(!ce(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&xe(e.runConfig.writerExecutionBackend)==="api"){let r=Je(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=ve(e.runConfig.layout.configPath);return Fe(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Rc(e.writerAgent),{exitCode:0,output:ii(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Rr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}Tc(e.writerAgent)&&Rc(e.writerAgent);let t=await gY(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?fY(e.writerAgent,t.output):ii(e.writerAgent)}}});var Wn,rW=l(()=>{"use strict";Wn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var R1,hY,yY,T1,SY,oW,x1=l(()=>{"use strict";rW();R1=/you(?:'|')ve hit your session limit/i,hY=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],yY=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,T1=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},SY=e=>{let t=yY.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},oW=e=>{let t=e.trim();if(t.length===0)return null;if(R1.test(t))return{code:Wn.SESSION_LIMIT,resetHint:SY(t),matchedLine:T1(t,R1)};for(let r of hY)if(r.test(t))return{code:Wn.PROVIDER_QUOTA,resetHint:null,matchedLine:T1(t,r)};return null}});var ff,hf,nW,sW=l(()=>{"use strict";ff="[[AGENT_RUN_WRITER_EXECUTION]]",hf="cli-writer-api-key-missing",nW="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var iW=l(()=>{"use strict";sW()});var I1=l(()=>{"use strict";iW()});var yf=l(()=>{"use strict";rW();x1();sW();iW();I1()});var Sf,O1=l(()=>{"use strict";Sf={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var M1,N1=l(()=>{"use strict";M1="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var z1,j1=l(()=>{"use strict";yf();N1();z1=e=>e.code===Wn.SESSION_LIMIT?M1:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var D1,$1=l(()=>{"use strict";yf();O1();j1();D1=e=>{let t=oW(e.output);return t!==null?{status:Sf.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:z1(t)}:{status:e.exitCode===0?Sf.COMPLETED:Sf.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var aW,qxe,H1=l(()=>{"use strict";aW={OPEN:"open",APPROVAL:"approval"},qxe=aW.APPROVAL});var ai,Af,F1,PY,U1,B1,G1,xc,lW,cW=l(()=>{"use strict";ai=g(require("node:fs")),Af=g(require("node:path")),F1="runs",PY=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),U1=e=>{let t=e.profileEmail!==null?Af.default.join(e.installDir,"profiles",e.profileEmail,F1):Af.default.join(e.installDir,F1);return ai.default.mkdirSync(t,{recursive:!0}),t},B1=(e,t)=>Af.default.join(U1(e),`${t}.json`),G1=(e,t)=>{ai.default.writeFileSync(B1(e,t.id),JSON.stringify(t,null,2))},xc=(e,t)=>{let r=B1(e,t);if(!ai.default.existsSync(r))return null;try{let o=JSON.parse(ai.default.readFileSync(r,"utf8"));return!PY(o)||typeof o.id!="string"?null:o}catch{return null}},lW=e=>{let t=U1(e),r=ai.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=xc(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var wY,q1,V1=l(()=>{"use strict";$1();H1();cW();wY=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=D1({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:aW.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},q1=(e,t)=>{let r=wY(t);return G1(e,r),r}});var K1=l(()=>{"use strict";Tg()});var J1,Y1=l(()=>{"use strict";yf();J1=()=>[ff,`agentRunWriterExecutionBackend=${hf}`,`agentRunWriterExecutionReasonCode=${nW}`].join(`
`)});var so,bf=l(()=>{"use strict";so=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var dW,vY,_Y,X1,Z1=l(()=>{"use strict";dW=e=>e.toLocaleString("en-US"),vY=e=>e<.01?e.toFixed(4):e.toFixed(3),_Y=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${vY(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${dW(e.inputTokens)} in / ${dW(e.outputTokens)} out (${dW(e.totalTokens)} total)`,t].join(`
`)},X1=(e,t)=>{if(t===void 0)return e;let r=_Y(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Q1=l(()=>{"use strict";ue()});var tU,Ic,me,uW,Pf,eU,WY,LY,rU,oU,nU,Oc,pW,mW,gW,sU,kY,lt,Mc,io,iU,EY,CY,wf,fW,hW,yW,aU=l(()=>{"use strict";tU=require("node:child_process");ue();ht();JF();ec();H_();QF();Yi();o1();nf();s1();Sc();l1();af();lf();df();W1();tW();V1();K1();Y1();bf();Z1();Hn();Q1();_c();Oi();df();Ic=new Map,me=new Map,uW=new Set,Pf=new Map,eU=e=>{e!==void 0&&!Pf.has(e)&&Pf.set(e,Date.now())},WY=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(Xt(t)){lt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}Cr(t,n)},LY=(e,t,r,o,n)=>{if(!Jy(e,n))return;let s=`${J1()}
`;WY(t,r,o,s);let i=me.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},rU=130,oU=`

Stopped by user.`,nU=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:so(e)},Oc=null,pW=e=>{Oc=e},mW=(e,t)=>{if(Oc===null)return;let r=uv(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||KS(Oc,t,r)},gW=async e=>{await U_({layout:e,cloudApi:Oc})},sU=e=>{let t=Ic.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Er(t.pid)},kY=e=>de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),lt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Mc=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Nn(s),c=me.get(r);if(a!==null&&c!==void 0){let d=wE(a),p=sU(r)||J_(r);d!==null&&!p&&io(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return PE(a)}}),io=(e,t,r,o,n,s,i,a)=>{let c=Vn(s,a),d=n,p=X1(c.output,c.llmUsage);if(r!==void 0){let S=Pf.get(r);Pf.delete(r),S!==void 0&&cv({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let h=ZF(c.llmUsage,p);h!==null&&y$({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&uW.has(r)&&(uW.delete(r),d=rU,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${oU}`:"Stopped by user.");let m=r!==void 0?uv(e.layout.reportsDir,r):null;if(r!==void 0){kc(r),na(e.layout,r),Xt(r)&&(lt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),c1(r));let S=me.get(r);g$({reportsDir:e.layout.reportsDir,agentRunId:r,input:so(i),output:p,...S!==void 0?{writerLabel:Wc({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&Cg({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),q1(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),r1(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{}}),U_({layout:e.layout,cloudApi:Oc}),me.delete(r),Ic.delete(r),ef(e.layout,r)}lt(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),Ui(e.layout)},iU=(e,t,r,o,n,s,i)=>{let a=me.get(r),c=a?.accumulatedOutput??s;KF(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),vn(t,r,()=>$_(e.layout,r),Mc(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),lt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},EY=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(n===void 0||h.length===0)){if(Xt(n)){lt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}Cr(n,h)}};if(n!==void 0){let h=me.get(n);Ic.set(n,t),me.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),lt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),vn(r,n,()=>sU(n),Mc(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let m=a==="claude-cli",S=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(m?S.push(y):(c.push(y),p(y)),d||n===void 0)return;let u=Cc(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let A=me.get(n),b=[A?.accumulatedOutput??"",u.partialOutput].filter(f=>f.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=b),Ic.delete(n),iU(e,r,n,o,u.question,b,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;gf(a);let y=n!==void 0?me.get(n):void 0,u=m?Vn(S.join("")):{output:c.join("").trim(),llmUsage:void 0},A=m?c.join("").trim():"",b=[u.output.trim(),A].filter(w=>w.length>0).join(`
`);m&&u.output.trim().length>0&&p(u.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${b}`.trim():b;io(e,r,n,o,h??-1,f,s,u.llmUsage)}),t.on("error",h=>{d||io(e,r,n,o,-1,h.message,s)})},CY=(e,t,r,o,n,s,i,a,c)=>{let d=nU(r,c);s!==void 0&&(me.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),lt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),vn(n,s,()=>me.has(s),Mc(e,n,s,o,i,a))),ea(e,t,r,m=>{if(!(s===void 0||m.length===0)){if(Xt(s)){lt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:m},requestId:o});return}Cr(s,m)}}).then(m=>{gf(t),io(e,n,s,o,m.exitCode,m.output,r,m.llmUsage)}).catch(m=>{let S=m instanceof Error?m.message:String(m);io(e,n,s,o,-1,S,r)})},wf=(e,t,r,o,n,s,i,a,c,d,p,m)=>{let S=nU(r,p);if(Fi(e.layout),xo(e,t)){eU(s),CY(e,t,r,o,n,s,c,d,S);return}let h=zt(t,r,kY(e),i);if(h===null){io(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}eU(s);let y=a1({workspace:e.workspace,projectFolderPath:c}),u=()=>{let A=(0,tU.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:m??process.env});EY(e,A,n,o,s,r,S,t)};if(s===void 0){u();return}me.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:me.get(s)?.accumulatedOutput??""}),LY(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Ii({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),vn(n,s,()=>me.has(s),Mc(e,n,s,o,c,d)),_1({socket:n,sendMessage:lt,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:A=>{a!==void 0&&si(a,w=>{lt(n,w)},o);let b=me.get(s),f=[b?.accumulatedOutput??"",A.partialOutput].filter(w=>w.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=f),iU(e,n,s,o,A.question,f,r)},onFinished:(A,b)=>{gf(t);let f=Vn(b),w=me.get(s),v=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${f.output}`.trim():f.output;io(e,n,s,o,A,v,r,f.llmUsage)}}).then(A=>{if(!A){u();return}vn(n,s,()=>J_(s),Mc(e,n,s,o,c,d))}).catch(A=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",A instanceof Error?A.message:A),u()})},fW=(e,t,r,o)=>{ef(e.layout,t.agentRunId),t.shellSessionId!==void 0&&lt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=v1(t),s=me.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;wf(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},hW=(e,t)=>{for(let r of VF(e.layout))me.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:so(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),vn(t,r.agentRunId,()=>$_(e.layout,r.agentRunId),{awaitingInput:!0}),lt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},yW=(e,t,r,o)=>{let n=me.get(r);if(n===void 0)return!1;uW.add(r),kc(r);let s=Ic.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(A1(r))return!0;ef(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${oU}`:"Stopped by user.";return io(e,t,r,o,rU,i,n.originalPrompt),!0}});var RY,SW,lU=l(()=>{"use strict";ca();RY=()=>`http://127.0.0.1:${yt()}/restart`,SW=async()=>{try{let e=await fetch(RY(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var cU=l(()=>{"use strict";Ya()});var dU=l(()=>{"use strict";$v()});var uU,pU=l(()=>{"use strict";uU=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Nc,TY,AW,mU=l(()=>{"use strict";K();te();cU();MA();dU();pU();Hn();Nc=(e,t)=>{Gr(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},TY=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(my(),py)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},AW=async e=>{let t=Te(e.layout.installDir)?.bundleVersion??null;if(!uU({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(ft(e.layout)){Bi({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Nc(e.layout,{summary:r,action:"install-bundle-update-start"}),rr({launchAgentLabel:Pe(e.layout.installDir),installDir:e.layout.installDir});let o=await Vs({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),Nc(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await TY();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Nc(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),Nc(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),Nc(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var xY,bW,gU=l(()=>{"use strict";xY=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bW=e=>{if(!xY(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var PW,wW,fU=l(()=>{"use strict";fA();hA();PW=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=xa({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},wW=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await dr(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var hU,IY,OY,MY,zc,yU=l(()=>{"use strict";hU=g(require("node:os"));Re();IY="Default",OY=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),MY=e=>{let t=hU.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},zc=()=>{let e=N(),t=Xd(e),r=OY(IY);return`${MY(t)}/${r.length>0?r:"project"}`}});var SU=l(()=>{"use strict";Ya()});var AU,vW,bU=l(()=>{"use strict";SU();AU=!1,vW=e=>{AU||(AU=!0,process.on("uncaughtException",t=>{Vo(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;Vo(e,{kind:"crash",message:r,stack:o})}))}});var PU,NY,_W,wU=l(()=>{"use strict";PU=require("node:child_process");uf();ht();rf();tf();_c();of();NY=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,PU.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},_W=async e=>{if(!ce(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&xe(e.runConfig.writerExecutionBackend)==="api"){let r=Je(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=ve(e.layout.configPath),n=Fe(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Rr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await NY(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var WW,vU=l(()=>{"use strict";WW=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var _U,LW,WU=l(()=>{"use strict";_U=require("node:crypto"),LW=()=>(0,_U.randomUUID)()});var li,LU,vf=l(()=>{"use strict";li="[[WORKING_ESTIMATE]]",LU=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",li,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var kU,EU=l(()=>{"use strict";kU=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var zY,CU,RU=l(()=>{"use strict";vf();zY=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,CU=e=>{if(!e.includes(li))return null;let t=null;for(let r of e.matchAll(zY)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var jY,kW,TU=l(()=>{"use strict";RU();jY=/^(\d{1,6})\b/,kW=e=>{let t=CU(e);if(t!==null)return t;let r=jY.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var DY,$Y,HY,_f,EW=l(()=>{"use strict";ht();Va();DY="http://127.0.0.1:11434",$Y=45e3,HY=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},_f=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||DY,o=t===void 0?(await bt({commands:de({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout($Y)});return n.ok?HY(await n.json()):null}catch{return null}}});var CW,RW,TW,xU=l(()=>{"use strict";Oi();vf();bf();EU();TU();ec();EW();CW=async e=>{let t=so(e.wrappedPrompt),r=f$(e.reportsDir);return{estimateOutput:await _f(LU(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},RW=e=>{let t=kW(e.estimateOutput);t!==null&&wg({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},TW=e=>{let t=kW(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=kU(t);return xi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:It.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),wg({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var Wf,IU,xW=l(()=>{"use strict";Wf="[[WORKING_TOKEN_ESTIMATE]]",IU=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Wf,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var OU,FY,MU,NU=l(()=>{"use strict";xW();OU=/^(\d{1,8})\b/,FY=e=>{let t=e.indexOf(Wf);if(t<0)return null;let r=e.slice(t+Wf.length).trim(),o=OU.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},MU=e=>{let t=FY(e);if(t!==null)return t;let r=OU.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var IW,OW,zU=l(()=>{"use strict";xW();bf();NU();ec();EW();IW=async e=>{let t=so(e.wrappedPrompt),r=S$(e.reportsDir);return{estimateOutput:await _f(IU(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},OW=e=>{let t=MU(e.estimateOutput);return t===null?null:(h$({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var jU=l(()=>{"use strict";M_();zF();DF();UF();ca();aU();uf();ht();cW();af();lU();_A();mU();Hn();gU();fU();nf();yU();bU();wU();lu();vU();WU();vf();Oi();xU();zU();H_();Va();lf();tW()});var DU={};Rt(DU,{buildContinuationPromptWithContext:()=>GY});var UY,BY,GY,$U=l(()=>{"use strict";UY=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,BY=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),GY=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=BY(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${UY(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var HU={};Rt(HU,{readHarnessExportSets:()=>VY});var jc,MW,Lf,qY,VY,FU=l(()=>{"use strict";jc=g(require("node:fs")),MW=g(require("node:path"));Re();Lf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qY=e=>{if(!jc.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(jc.default.readFileSync(e.harnessManifestPath,"utf8"));if(Lf(t))return t}catch{return null}return null},VY=(e,t)=>{let r=N(t),o=qY(r);if(o===null)return[];let n=Lf(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!Lf(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!Lf(p))continue;let m=typeof p.path=="string"?p.path:void 0,S=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(m===void 0||S.length===0||h.length===0||y.length===0)continue;let u=m.startsWith("shared/")?MW.default.join(r.harnessRootDir,m):MW.default.join(r.harnessSetsDir,i,m);jc.default.existsSync(u)&&d.push({id:S,kind:h,title:y,content:jc.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var FW,zW,ci,UU,KY,BU,GU,NW,qU,jW,DW,$W,Z,G,HW,JY,Dc,YY,XY,ZY,QY,eX,tX,rX,oX,$c,VU=l(()=>{"use strict";FW=require("node:child_process"),zW=g(require("node:fs")),ci=g(require("node:os"));EF();K();te();ls();Zv();xF();ue();Nt();Ya();Gb();zg();Tg();$t();zo();qA();Mt();jU();UU=3e4,KY=3e4,BU=new Map,GU=new Map,NW=new Map,qU=new Map,jW=new Map,DW=new Map,$W=new Map,Z=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),G=(e,t,r)=>{e.readyState===yc.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Gr(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Jp(r,"out",t)))},HW=e=>e,JY=e=>{if(!zW.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(zW.default.readFileSync(e.harnessManifestPath,"utf8"));if(Z(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Dc=(e,t)=>{let r=JY(t);r!==null&&G(e,{type:"harness.manifest.report",payload:{hostname:ci.default.hostname(),manifest:r}})},YY=async(e,t,r,o,n,s,i=!1,a,c,d,p,m)=>{let S=m?.trim()??"";if(!ce(t)){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=Wc({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await bt({commands:de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?CW({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=s!==void 0?IW({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=Tc(t)&&!X_(t);if(b){try{await Rr(e.layout.installDir,t)}catch(H){let ge=H instanceof Error?H.message:String(H);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${ge}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Rc(t)}else if(!Tc(t))try{await Rr(e.layout.installDir,t)}catch(H){let ge=H instanceof Error?H.message:String(H);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${ge}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=ra(d,zc,m);if(f===null){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Ye({projectFolderPath:f,...S.length>0?{projectId:S}:{}}),i||sc(e.layout,t,f);let w=Rg({sessionContinuation:i,supportsWriterSessionContinuation:pf(t),isWriterConversationStarted:mf(t)}),v=i&&w==="first"?nc(e.layout,t,f):null,W=v!==null?qs(e.layout,v):null,L=W!==null&&W.turns.length>0,E=Lv({sessionContinuation:i,supportsWriterSessionContinuation:pf(t),isWriterConversationStarted:mf(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:L,userPromptCharacterCount:r.length}),T=r;if(E.continuationStrategy==="source_run_seed"){let H=typeof c=="string"&&c.length>0?xc(e.layout,c):null;if(H!==null){let{buildContinuationPromptWithContext:ge}=await Promise.resolve().then(()=>($U(),DU));T=ge({priorPrompt:H.prompt,priorOutput:H.resultOutput??"",userMessage:r})}}else E.continuationStrategy==="transcript_seed"&&W!==null&&W.turns.length>0&&(T=Wg({priorTurns:W.turns,userMessage:r}));let I=E.ragLimit>0?await As({layout:e.layout,query:T,limit:E.ragLimit,minScore:E.ragMinScore,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],M=E.ragLimit>0&&f.trim().length>0?await Ub({layout:e.layout,query:T,limit:2,minScore:.32,projectFolderPath:f,...S.length>0?{projectId:S}:{}}):[],B=E.injectMemory?hv(e.layout,f,S.length>0?S:void 0):[],q=`${Sv(B,E.memoryEntryLimit)}${$b(I)}${Bb(M)}${T}`,F=p?.trim()??(s!==void 0&&f.trim().length>0?LW():void 0);if(s!==void 0&&F!==void 0&&F.length>0&&f.trim().length>0){Ii({reportKey:F,agentRunId:s,userSummary:"Working on your Mac\u2026"});let H=q;u!==null&&u.then(ge=>{if(ge===null)return;let ao=TW({estimateOutput:ge.estimateOutput??"",reportKey:F,agentRunId:s,reportsDir:e.layout.reportsDir,task:ge.task,writerLabel:ge.writerLabel,embedding:ge.embedding});if(ao.estimateSeconds===null)return;mW(e.layout.reportsDir,s);let Ct=`${li}
${ao.estimateSeconds}
`;if(Xt(s)){G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Ct},requestId:o});return}Cr(s,Ct)}).catch(()=>{}),q=WW(H),q=Dh(q,{agentRunId:s,reportKey:F,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then(H=>{H!==null&&RW({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel,embedding:H.embedding})}).catch(()=>{}),s!==void 0&&A!==null&&A.then(H=>{H!==null&&OW({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel})}).catch(()=>{});let ct=s!==void 0&&$W.get(s)===!0;if(s!==void 0&&f.trim().length>0){let H=await _p(f);DW.set(s,H),F!==void 0&&F.length>0&&jW.set(s,F)}wf(e,t,q,o,HW(n),s,{sessionTurn:E.sessionTurn},a,f,F,r,By(e.layout,s,ct)),b&&s!==void 0&&G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Q_(t)},requestId:o})},XY=async(e,t,r,o,n)=>{let s=(i,a)=>{G(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await eW({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,G(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=ce(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?ii(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},ZY=(e,t,r)=>new Promise(o=>{if(!ce(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=zt(t,r,de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,FW.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),QY=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;G(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Dt(t.bundle),s=Z(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=we(e.wsUrl)??gt,m=await CS({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=No({bundle:i,layout:e.layout});return G(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&Dc(o,e.layout),!0},eX=async(e,t,r,o)=>{if(await QY(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(G(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!ce(n)){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}Fi(e.layout);let i=await(async()=>{try{await Rr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return ZY(e,n,s)})().finally(()=>{Ui(e.layout)});G(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),Dc(o,e.layout)},tX=e=>{let t=1e3*2**e;return Math.min(KY,t)},rX=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(ft(e.layout)){iy(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,SW().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(u,A="system.ack")=>{if(!t.selfUpdateInFlight){if(ft(e.layout)){Bi({layout:e.layout,remoteBundleVersion:u,trigger:A}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${A}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,AW({layout:e.layout,remoteBundleVersion:u,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let u=We(e.layout);u!==null&&je(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===yc.OPEN||u.readyState===yc.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,UU)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=tX(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},m=u=>{s();let A=()=>{let b=ji(e.layout.installDir),f=yt();G(u,{type:"agent.heartbeat",payload:{hostname:ci.default.hostname(),macOsUsername:ci.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,UU)},S=(u,A)=>{if(typeof u.type!="string")return;if(GA(u)){t.stopped=!0,s(),a(),c(),HA({layout:e.layout}).finally(()=>{Ac(),process.exit(0)});return}Gr(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),Jp(e.layout,"in",u);let b=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&Z(u.payload)){let f=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",w=typeof u.payload.origin=="string"?u.payload.origin:"",v=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",W=typeof u.payload.challenge=="string"?u.payload.challenge:"",L=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!Xv({serverPublicKey:f,origin:w,devicePublicKey:v,challenge:W,serverAttestation:L})){t.wakeError="Server attestation verification failed",Gr(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&Z(u.payload)){let f=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";Gr(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),_W({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{G(A,{type:"writer.status",payload:w},e.layout)})}if(u.type==="install.bundle.update"&&Z(u.payload)){let f=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(u.type==="system.ack"){Tp(e.layout,{wsUrl:e.wsUrl});let f=Z(u.payload)?u.payload:null,w=bW(f);w!==null&&o(w)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&Z(u.payload)&&PW(u.payload),u.type==="automations.run"&&Z(u.payload)&&wW(u.payload),u.type==="terminal.stream.accepted"&&Z(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"";if(f.length>0){let w=q_(f);for(let v of w)G(A,{type:"terminal.stream.chunk",payload:{runId:f,chunk:v},requestId:b})}}if(u.type==="agent.agentRun.list"&&G(A,{type:"dashboard.agentRun.list.result",payload:{runs:lW(e.layout)},requestId:b}),u.type==="agent.agentRun.get"&&Z(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"",w=f.length>0?xc(e.layout,f):null;G(A,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:b})}if(u.type==="command.claude.run"&&Z(u.payload)){let f=u.payload.prompt,w=typeof u.payload.writerAgent=="string"&&ce(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",v=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,W=u.payload.sessionContinuation===!0,L=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,E=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,T=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=ra(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,zc,T),M=zy(u.payload.compositionSnapshot),B=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${W?"continue":"first"})\u2026`),I===null){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...v!==void 0?{agentRunId:v}:{}},requestId:b});return}if(M!==null){let q=Dy(e.layout,M);if(q!==null){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:q,...v!==void 0?{agentRunId:v}:{}},requestId:b});return}if(v!==void 0){let F=Hy(e.layout,v,M);if(!F.ok){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:F.errorMessage,...v!==void 0?{agentRunId:v}:{}},requestId:b});return}$W.set(v,M.entries.some(ct=>ct.scope==="run"))}}v!==void 0&&E!==void 0&&BU.set(v,E),v!==void 0&&(GU.set(v,I),T!==void 0&&T.trim().length>0&&NW.set(v,T.trim()),qU.set(v,f.trim()),Ye({projectFolderPath:I,...T!==void 0&&T.trim().length>0?{projectId:T.trim()}:{}})),YY(e,w,f.trim(),b,A,v,W,E,L,I,B,T)}}if(u.type==="shell.session.open"&&Z(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:120,v=typeof u.payload.rows=="number"?u.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),Y_({shellSessionId:f,cwd:e.workspace,cols:w,rows:v,send:W=>{G(A,W)},requestId:b}))}if(u.type==="shell.session.close"&&Z(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";f.length>0&&si(f,w=>{G(A,w)},b)}if(u.type==="shell.input"&&Z(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.data=="string"?u.payload.data:"";f.length>0&&w.length>0&&V_(f,w)}if(u.type==="shell.resize"&&Z(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:0,v=typeof u.payload.rows=="number"?u.payload.rows:0;f.length>0&&w>0&&v>0&&K_(f,w,v)}if(u.type==="command.writer.session.end"&&Z(u.payload)){let f=u.payload.writerAgent;typeof f=="string"&&ce(f)&&(Z_(f),Eg(e.layout,f))}if(u.type==="command.writer.session.start"&&Z(u.payload)){let f=u.payload.writerAgent,w=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof f=="string"&&ce(f)&&w.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),XY(e,f,w,b,A))}if(u.type==="command.claude.stop"&&Z(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),yW(e,HW(A),f,b))}if(u.type==="command.claude.input_respond"&&Z(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",w=typeof u.payload.response=="string"?u.payload.response.trim():"",v=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",W=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",L=typeof u.payload.question=="string"?u.payload.question:"";f.length>0&&w.length>0&&v.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),fW(e,{agentRunId:f,originalPrompt:v,partialOutput:W,question:L,response:w,shellSessionId:BU.get(f)},b,HW(A)))}if(u.type==="dispatch.approval.required"&&Z(u.payload)){let f=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",w=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${w}`),process.platform==="darwin"&&(0,FW.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&Z(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),eX(e,u.payload,b,A)),u.type==="harness.export.request"&&Z(u.payload)){let f=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",w=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,v=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(W=>typeof W=="string"):[];f.length>0&&v.length>0&&(async()=>{let{readHarnessExportSets:W}=await Promise.resolve().then(()=>(FU(),HU)),L=W(v,e.email);G(A,{type:"harness.export.result",payload:{success:L.length>0,borrowerUserId:f,...w!==void 0?{targetDeviceId:w}:{},sets:L,errorMessage:L.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(u.type==="harness.manifest.request"&&Dc(A,e.layout),u.type==="command.claude.result"&&Z(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,w=typeof u.payload.output=="string"?u.payload.output:"",v=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,W=ra(f!==void 0?GU.get(f):void 0,zc),L=f!==void 0?NW.get(f):void 0,E=f!==void 0?qU.get(f)??"":"",T=sA({exitCode:v,output:w});if(T&&W!==null&&Db({layout:e.layout,text:w,source:f??"command.claude.result",projectFolderPath:W,...L!==void 0?{projectId:L}:{}}),v!=null&&v!==0&&w.trim().length>0&&W!==null&&(Ob({layout:e.layout,errorText:w,projectFolderPath:W,...L!==void 0?{projectId:L}:{}}),Fb({layout:e.layout,text:w,source:f??"command.claude.result.failure",projectFolderPath:W,...L!==void 0?{projectId:L}:{}})),T&&E.trim().length>0&&W!==null&&yv({layout:e.layout,projectFolderPath:W,...L!==void 0?{projectId:L}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:E,output:w,createdAt:new Date().toISOString()}}),f!==void 0&&W!==null){let M=jW.get(f),B=DW.get(f);M!==void 0&&B!==void 0&&_p(W).then(q=>{let F=iA({before:B,after:q});$h(M,F),DW.delete(f),jW.delete(f)})}if(T&&L!==void 0&&L.trim().length>0){let M=$(),B=M===null?null:Y({wsUrl:M.wsUrl,pairingToken:M.pairingToken});B!==null&&lA(B,L,{...f!==void 0?{sourceRunId:f}:{},lesson:aA({prompt:E,output:w})})}f!==void 0&&(na(e.layout,f),$W.delete(f),NW.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let u=new yc(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),pW(Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),gW(e.layout);let A=we(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=Yv({layout:e.layout,origin:A,...b!==void 0&&b.length>0?{claimToken:b}:{}});G(u,{type:"agent.register",payload:{role:"agent",hostname:ci.default.hostname(),macOsUsername:ci.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),Dc(u,e.layout),hW(e,u),m(u)}),u.on("message",A=>{let b=typeof A=="string"?A:A.toString("utf8");try{let f=JSON.parse(b);if(!Z(f))return;S(f,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(A,b)=>{s(),t.socket=void 0,t.wsConnected=!1,AA(e.layout),t.reconnectAttempt+=1;let f=typeof b=="string"?b:b.toString("utf8");Vo(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:f}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",A=>{t.wakeError=A.message,Vo(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return sy(()=>{let u=ay();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&o(u.remoteBundleVersion,u.trigger);let A=ly();A!==null&&r(A)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:ja(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:cc(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Dc(u,e.layout),{ok:!0})}}},oX=async()=>{Ve("agent-witch");let e=R_(),t=k();O_().ok||(process.platform==="darwin"?(await Ao(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),j_(t);let o=z_({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(rr({launchAgentLabel:Pe(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Wi());let n=await Zy(),s=n[0];s!==void 0&&vW(s.layout);for(let h of n){let y=we(h.wsUrl)??gt;Di(h.layout.installDir,y)}let i=n.map(h=>rX(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),Ac(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let A=We(h.layout);bA(A,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(ft(h)||Da(h.installDir))},m=await D_({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):lc({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=or(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Li(),d()});d=()=>{S(),m.stop(),Ac(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},$c=oX});var UW=l(()=>{"use strict";VU()});var KU={};Rt(KU,{startAgentWitchClient:()=>$c});var JU=l(()=>{"use strict";UW();UW();wo();Hh();du();if(!Ke()&&vo(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(cu(process.argv.slice(e))),$c()}});zh();Hh();wo();du();var WE="20.x",LE="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var tV=e=>[`Node.js ${WE} or newer is required (found ${e}).`,LE].join(" "),kE=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${tV(process.version)}
`),process.exit(1))};var nX=async()=>{Ve("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(my(),py)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},sX=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(kT(),LT)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},iX=async()=>{if(!vo(Ke()?void 0:__agentWitchImportMetaUrl))return;kE();let e=process.argv.indexOf("report");e>=0&&process.exit(cu(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await nX();return}if(t==="wake"){await sX();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(Ex(),kx));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(vH(),wH));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(JU(),KU));await r()};iX();
