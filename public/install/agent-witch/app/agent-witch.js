#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var KU=Object.create;var kf=Object.defineProperty;var JU=Object.getOwnPropertyDescriptor;var YU=Object.getOwnPropertyNames;var XU=Object.getPrototypeOf,ZU=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var _=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Ct=(e,t)=>{for(var r in t)kf(e,r,{get:t[r],enumerable:!0})},QU=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of YU(t))!ZU.call(e,n)&&n!==r&&kf(e,n,{get:()=>t[n],enumerable:!(o=JU(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?KU(XU(e)):{},QU(t||!e||!e.__esModule?kf(r,"default",{value:e,enumerable:!0}):r,e));var ci,HW,FW,lo,Ef,QY,UW,Dc,Rt,Xt,$c,Hc,Wn,Ln,Zt,Cf,Fc,Uc,Bc,di,dt,kn,En,Gc,Rr,Rf,BW,He=l(()=>{"use strict";ci={production:".agent-witch",localhost:".local-agent-witch"},HW={production:47892,localhost:47893},FW={production:"com.agent-witch",localhost:"com.local-agent-witch"},lo={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Ef="app",QY=`${Ef}/agent-witch.js`,UW=`${Ef}/command`,Dc={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Rt=ci.production,Xt=ci.localhost,$c=HW.production,Hc=HW.localhost,Wn=FW.production,Ln=FW.localhost,Zt="profiles",Cf=lo.activeProfile,Fc="harness",Uc="sets",Bc="manifest.json",di=Dc.projectsDir,dt=Dc.logsDir,kn="agent-witch.log",En="agent-witch.error.log",Gc=Dc.reportsDir,Rr=Dc.deviceKeypairJson,Rf=Ef,BW="agent-witch.js"});var GW=l(()=>{"use strict";He()});var qW,co,ui,qc=l(()=>{"use strict";qW=m(require("node:path"));He();co=e=>qW.default.basename(e)===Xt,ui=e=>co(e)?Ln:Wn});var VW=l(()=>{"use strict";GW();qc()});var KW,xf,eB,pi,tB,rB,JW,oB,nB,YW=l(()=>{"use strict";VW();He();KW=m(require("node:os")),xf=m(require("node:path")),eB=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?xf.default.resolve(e):xf.default.join(KW.default.homedir(),Rt)},pi=ui(eB()),tB=`${pi}-wake`,rB=`${pi}-live`,JW=`${pi}-watchdog`,oB=`${pi}-automation-scheduler`,nB=`${pi}-updater`});var Cn=_(Tf=>{"use strict";Object.defineProperty(Tf,"__esModule",{value:!0});Tf.stringify=sB;function sB(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=_(If=>{"use strict";Object.defineProperty(If,"__esModule",{value:!0});If.generateTypeGuardError=iB;var XW=Cn();function iB(e,t,r){return(0,XW.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,XW.stringify)(e)}) to be "${r}"`}});var xr=_(Vc=>{"use strict";Object.defineProperty(Vc,"__esModule",{value:!0});Vc.isNonNullObject=void 0;var aB=O(),lB=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,aB.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Vc.isNonNullObject=lB});var xt=_(fe=>{"use strict";Object.defineProperty(fe,"__esModule",{value:!0});fe.attachTypeGuardMeta=fe.isArrayTypeGuard=fe.isNestedObjectTypeGuard=fe.getTypeGuardWrapperKind=fe.getTypeGuardInnerGuard=fe.getTypeGuardItemGuard=fe.getTypeGuardSchema=void 0;var cB=e=>e.schema;fe.getTypeGuardSchema=cB;var dB=e=>e.itemGuard;fe.getTypeGuardItemGuard=dB;var uB=e=>e.innerGuard;fe.getTypeGuardInnerGuard=uB;var pB=e=>e.wrapperKind;fe.getTypeGuardWrapperKind=pB;var mB=e=>{if((0,fe.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};fe.isNestedObjectTypeGuard=mB;var gB=e=>{if((0,fe.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};fe.isArrayTypeGuard=gB;var fB=(e,t)=>Object.assign(e,t);fe.attachTypeGuardMeta=fB});var mi=_(uo=>{"use strict";Object.defineProperty(uo,"__esModule",{value:!0});uo.getExpectedTypeName=uo.getTypeGuardDisplayName=void 0;var ZW=xt(),hB=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};uo.getTypeGuardDisplayName=hB;var yB=e=>{let t=(0,ZW.getTypeGuardWrapperKind)(e),r=(0,ZW.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,uo.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};uo.getExpectedTypeName=yB});var po=_(Kc=>{"use strict";Object.defineProperty(Kc,"__esModule",{value:!0});Kc.createValidationResult=void 0;var SB=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Kc.createValidationResult=SB});var Rn=_(Jc=>{"use strict";Object.defineProperty(Jc,"__esModule",{value:!0});Jc.createValidationError=void 0;var AB=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Jc.createValidationError=AB});var xn=_(Yc=>{"use strict";Object.defineProperty(Yc,"__esModule",{value:!0});Yc.createTreeNode=void 0;var bB=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Yc.createTreeNode=bB});var gi=_(Xc=>{"use strict";Object.defineProperty(Xc,"__esModule",{value:!0});Xc.combineResults=void 0;var PB=po(),wB=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,PB.createValidationResult)(r,o,n)};Xc.combineResults=wB});var Qc=_(Zc=>{"use strict";Object.defineProperty(Zc,"__esModule",{value:!0});Zc.createSimplifiedTree=void 0;var QW=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=QW(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},vB=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=QW(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Zc.createSimplifiedTree=vB});var hi=_(td=>{"use strict";Object.defineProperty(td,"__esModule",{value:!0});td.validateObject=void 0;var _B=xr(),fi=po(),WB=Rn(),ed=xn(),LB=gi(),eL=rd(),kB=(e,t,r)=>{let o=()=>{let i=(0,WB.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,ed.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,fi.createValidationResult)(!1,[],a):(0,fi.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,fi.createValidationResult)(!0,[],(0,ed.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,g=d,A=t[g],h=e[g],y=(0,eL.validateProperty)(g,h,A,r);return y.valid?p.length===0?(0,fi.createValidationResult)(!0,[],(0,ed.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,eL.validateProperty)(d,e[d],p,r)}),a=(0,LB.combineResults)(i,r.path),c=(0,ed.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,fi.createValidationResult)(a.valid,a.errors,c)};return(0,_B.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};td.validateObject=kB});var rL=_(sd=>{"use strict";Object.defineProperty(sd,"__esModule",{value:!0});sd.validateArray=void 0;var EB=Cn(),od=po(),tL=Rn(),nd=xn(),CB=gi(),RB=hi(),xB=mi(),TB=xt(),IB=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,tL.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,nd.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,od.createValidationResult)(!1,[c],d)}let n=(0,TB.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,g={path:p,config:r.config||null};if(n)return(0,RB.validateObject)(c,n,g);let A=t(c,null),h=(0,xB.getExpectedTypeName)(t),y=(0,EB.stringify)(c);if(A)return(0,od.createValidationResult)(!0,[],(0,nd.createTreeNode)(p,!0,h,c));let u=y.length>200?`Expected ${p} to be "${h}"`:`Expected ${p} (${y}) to be "${h}"`,S=(0,tL.createValidationError)(p,h,c,u),b=(0,nd.createTreeNode)(p,!1,h,c);return b.errors=[S],(0,od.createValidationResult)(!1,[S],b)}),i=(0,CB.combineResults)(s,o),a=(0,nd.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,od.createValidationResult)(i.valid,i.errors,a)};sd.validateArray=IB});var rd=_(ad=>{"use strict";Object.defineProperty(ad,"__esModule",{value:!0});ad.validateProperty=void 0;var oL=po(),OB=Rn(),nL=xn(),MB=mi(),id=xt(),NB=hi(),zB=rL(),jB=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,id.getTypeGuardSchema)(r),c=(0,id.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,NB.validateObject)(t,a,s);if(c&&(0,id.isArrayTypeGuard)(r))return(0,zB.validateArray)(t,c,s)}let d=p=>{let g=r(t,p),A=(0,MB.getExpectedTypeName)(r);return g?(0,oL.createValidationResult)(!0,[],(0,nL.createTreeNode)(n,!0,A,t)):(()=>{let h=(0,OB.createValidationError)(n,A,t,`Expected ${n} (${JSON.stringify(t)}) to be "${A}"`),y=(0,nL.createTreeNode)(n,!1,A,t);return y.errors=[h],(0,oL.createValidationResult)(!1,[h],y)})()};if((0,id.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};ad.validateProperty=jB});var cd=_(ld=>{"use strict";Object.defineProperty(ld,"__esModule",{value:!0});ld.isNil=void 0;var DB=O(),$B=function(e,t){return e!=null?(t&&t.callbackOnError((0,DB.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};ld.isNil=$B});var Of=_(dd=>{"use strict";Object.defineProperty(dd,"__esModule",{value:!0});dd.isDefined=void 0;var HB=O(),FB=cd(),UB=function(e,t){return(0,FB.isNil)(e,null)?(t&&t.callbackOnError((0,HB.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};dd.isDefined=UB});var Mf=_(ud=>{"use strict";Object.defineProperty(ud,"__esModule",{value:!0});ud.reportValidationResults=void 0;var BB=Qc(),sL=Of(),GB=cd(),qB=(e,t)=>{if(e.valid===!0||(0,GB.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,sL.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,BB.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,sL.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};ud.reportValidationResults=qB});var Nf=_(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.Validation=Q.reportValidationResults=Q.validateObject=Q.validateProperty=Q.createSimplifiedTree=Q.combineResults=Q.createTreeNode=Q.createValidationError=Q.createValidationResult=Q.getExpectedTypeName=void 0;var VB=mi();Object.defineProperty(Q,"getExpectedTypeName",{enumerable:!0,get:function(){return VB.getExpectedTypeName}});var KB=po();Object.defineProperty(Q,"createValidationResult",{enumerable:!0,get:function(){return KB.createValidationResult}});var JB=Rn();Object.defineProperty(Q,"createValidationError",{enumerable:!0,get:function(){return JB.createValidationError}});var YB=xn();Object.defineProperty(Q,"createTreeNode",{enumerable:!0,get:function(){return YB.createTreeNode}});var XB=gi();Object.defineProperty(Q,"combineResults",{enumerable:!0,get:function(){return XB.combineResults}});var ZB=Qc();Object.defineProperty(Q,"createSimplifiedTree",{enumerable:!0,get:function(){return ZB.createSimplifiedTree}});var QB=rd();Object.defineProperty(Q,"validateProperty",{enumerable:!0,get:function(){return QB.validateProperty}});var eG=hi();Object.defineProperty(Q,"validateObject",{enumerable:!0,get:function(){return eG.validateObject}});var tG=Mf();Object.defineProperty(Q,"reportValidationResults",{enumerable:!0,get:function(){return tG.reportValidationResults}});var rG=po(),oG=gi(),nG=Rn(),sG=xn(),iG=rd(),aG=hi(),lG=Mf(),cG=Qc();Q.Validation={result:rG.createValidationResult,combine:oG.combineResults,error:nG.createValidationError,treeNode:sG.createTreeNode,property:iG.validateProperty,object:aG.validateObject,report:lG.reportValidationResults,createSimplifiedTree:cG.createSimplifiedTree}});var pd=_(zf=>{"use strict";Object.defineProperty(zf,"__esModule",{value:!0});zf.isType=uG;var iL=xr(),aL=Nf(),dG=xt();function uG(e){if(!(0,iL.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,aL.validateObject)(r,e,s);return(0,aL.reportValidationResults)(i,o||null),i.valid}return(0,iL.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,dG.attachTypeGuardMeta)(t,{schema:e})}});var uL=_(mo=>{"use strict";Object.defineProperty(mo,"__esModule",{value:!0});mo.isNestedType=mo.isShape=void 0;mo.isSchema=yi;var lL=xr(),cL=Nf(),dL=xt();function yi(e){if(!(0,lL.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=mG(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,cL.validateObject)(o,t,i);return(0,cL.reportValidationResults)(a,n||null),a.valid}return(0,lL.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,dL.attachTypeGuardMeta)(r,{schema:t})}function pG(e){return typeof e=="function"?e:Array.isArray(e)?gG(e):typeof e=="object"&&e!==null?yi(e):e}function mG(e){let t={};for(let[r,o]of Object.entries(e))t[r]=pG(o);return t}function gG(e){let t=e[0],r=yi(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,dL.attachTypeGuardMeta)(o,{itemGuard:r})}mo.isShape=yi;mo.isNestedType=yi});var pL=_(jf=>{"use strict";Object.defineProperty(jf,"__esModule",{value:!0});jf.isObjectWith=hG;var fG=pd();function hG(e){return(0,fG.isType)(e)}});var mL=_(Df=>{"use strict";Object.defineProperty(Df,"__esModule",{value:!0});Df.isObject=SG;var yG=pd();function SG(e){return(0,yG.isType)(e)}});var gL=_($f=>{"use strict";Object.defineProperty($f,"__esModule",{value:!0});$f.guardWithTolerance=AG;function AG(e,t,r){return t(e,r),e}});var fL=_(Hf=>{"use strict";Object.defineProperty(Hf,"__esModule",{value:!0});Hf.isBranded=PG;var bG=O();function PG(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,bG.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var hL=_(md=>{"use strict";Object.defineProperty(md,"__esModule",{value:!0});md.BrandSymbols=void 0;md.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var yL=_(gd=>{"use strict";Object.defineProperty(gd,"__esModule",{value:!0});gd.isAny=void 0;var wG=function(e){return!0};gd.isAny=wG});var Si=_(Ff=>{"use strict";Object.defineProperty(Ff,"__esModule",{value:!0});Ff.reportTypeGuardError=_G;var vG=O();function _G(e,t,r){e&&e.callbackOnError((0,vG.generateTypeGuardError)(t,e.identifier,r))}});var SL=_(fd=>{"use strict";Object.defineProperty(fd,"__esModule",{value:!0});fd.isBoolean=void 0;var WG=Si(),LG=function(t,r){return typeof t!="boolean"?((0,WG.reportTypeGuardError)(r,t,"boolean"),!1):!0};fd.isBoolean=LG});var AL=_(hd=>{"use strict";Object.defineProperty(hd,"__esModule",{value:!0});hd.isDate=void 0;var kG=O(),EG=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,kG.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};hd.isDate=EG});var Uf=_(yd=>{"use strict";Object.defineProperty(yd,"__esModule",{value:!0});yd.isNumber=void 0;var CG=Si(),RG=function(t,r){return typeof t!="number"||isNaN(t)?((0,CG.reportTypeGuardError)(r,t,"number"),!1):!0};yd.isNumber=RG});var bL=_(Sd=>{"use strict";Object.defineProperty(Sd,"__esModule",{value:!0});Sd.isString=void 0;var xG=Si(),TG=function(t,r){return typeof t!="string"?((0,xG.reportTypeGuardError)(r,t,"string"),!1):!0};Sd.isString=TG});var PL=_(Ad=>{"use strict";Object.defineProperty(Ad,"__esModule",{value:!0});Ad.isUnknown=void 0;var IG=function(e){return!0};Ad.isUnknown=IG});var wL=_(bd=>{"use strict";Object.defineProperty(bd,"__esModule",{value:!0});bd.isFunction=void 0;var OG=O(),MG=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,OG.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};bd.isFunction=MG});var _L=_(Pd=>{"use strict";Object.defineProperty(Pd,"__esModule",{value:!0});Pd.isFile=void 0;var vL=O(),NG=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,vL.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,vL.generateTypeGuardError)(e,t.identifier,"File")),!1)};Pd.isFile=NG});var LL=_(wd=>{"use strict";Object.defineProperty(wd,"__esModule",{value:!0});wd.isFileList=void 0;var WL=O(),zG=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,WL.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,WL.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};wd.isFileList=zG});var EL=_(vd=>{"use strict";Object.defineProperty(vd,"__esModule",{value:!0});vd.isBlob=void 0;var kL=O(),jG=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,kL.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,kL.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};vd.isBlob=jG});var RL=_(_d=>{"use strict";Object.defineProperty(_d,"__esModule",{value:!0});_d.isFormData=void 0;var CL=O(),DG=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,CL.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,CL.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};_d.isFormData=DG});var TL=_(Wd=>{"use strict";Object.defineProperty(Wd,"__esModule",{value:!0});Wd.isURL=void 0;var xL=O(),$G=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,xL.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,xL.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Wd.isURL=$G});var OL=_(Ld=>{"use strict";Object.defineProperty(Ld,"__esModule",{value:!0});Ld.isURLSearchParams=void 0;var IL=O(),HG=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,IL.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,IL.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Ld.isURLSearchParams=HG});var ML=_(kd=>{"use strict";Object.defineProperty(kd,"__esModule",{value:!0});kd.isMap=void 0;var FG=O(),UG=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,FG.generateTypeGuardError)(e,t.identifier,"Map")),!1)};kd.isMap=UG});var NL=_(Ed=>{"use strict";Object.defineProperty(Ed,"__esModule",{value:!0});Ed.isSet=void 0;var BG=O(),GG=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,BG.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Ed.isSet=GG});var zL=_(Bf=>{"use strict";Object.defineProperty(Bf,"__esModule",{value:!0});Bf.isIndexSignature=VG;var qG=O();function VG(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,qG.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let g=s[d],A=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),h=t(g,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return A&&h})}}});var jL=_(Cd=>{"use strict";Object.defineProperty(Cd,"__esModule",{value:!0});Cd.isError=void 0;var KG=Si(),JG=function(t,r){return t instanceof Error?!0:((0,KG.reportTypeGuardError)(r,t,"Error"),!1)};Cd.isError=JG});var qf=_(Gf=>{"use strict";Object.defineProperty(Gf,"__esModule",{value:!0});Gf.isArrayWithEachItem=ZG;var YG=O(),XG=xt();function ZG(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,YG.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,XG.attachTypeGuardMeta)(t,{itemGuard:e})}});var Vf=_(Rd=>{"use strict";Object.defineProperty(Rd,"__esModule",{value:!0});Rd.isNonEmptyArray=void 0;var QG=O(),e2=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,QG.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Rd.isNonEmptyArray=e2});var DL=_(Kf=>{"use strict";Object.defineProperty(Kf,"__esModule",{value:!0});Kf.isNonEmptyArrayWithEachItem=o2;var t2=qf(),r2=Vf();function o2(e){return function(t,r){return(0,t2.isArrayWithEachItem)(e)(t,r)&&(0,r2.isNonEmptyArray)(t,r)}}});var HL=_(Jf=>{"use strict";Object.defineProperty(Jf,"__esModule",{value:!0});Jf.isTuple=n2;var $L=O();function n2(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,$L.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,$L.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var FL=_(Yf=>{"use strict";Object.defineProperty(Yf,"__esModule",{value:!0});Yf.isObjectWithEachItem=i2;var s2=O();function i2(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,s2.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var UL=_(Xf=>{"use strict";Object.defineProperty(Xf,"__esModule",{value:!0});Xf.isPartialOf=l2;var a2=xr();function l2(e){return function(t,r){if(!(0,a2.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var BL=_(Zf=>{"use strict";Object.defineProperty(Zf,"__esModule",{value:!0});Zf.isPick=d2;var c2=xr();function d2(e,...t){return function(r,o){if(!(0,c2.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var GL=_(Qf=>{"use strict";Object.defineProperty(Qf,"__esModule",{value:!0});Qf.isOmit=p2;var u2=xr();function p2(e,...t){return function(r,o){if(!(0,u2.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),g=p.indexOf(" ("),A=g>=0?p.slice(0,g):p;if(a.has(A))return!1;let h=A.startsWith(s+".")&&A.slice(s.length+1).split(".")[0]||"";return!(h&&!Object.prototype.hasOwnProperty.call(r,h))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var qL=_(xd=>{"use strict";Object.defineProperty(xd,"__esModule",{value:!0});xd.isNonEmptyString=void 0;var m2=O(),g2=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,m2.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};xd.isNonEmptyString=g2});var VL=_(Td=>{"use strict";Object.defineProperty(Td,"__esModule",{value:!0});Td.isNonNegativeNumber=void 0;var f2=O(),h2=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,f2.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Td.isNonNegativeNumber=h2});var KL=_(Id=>{"use strict";Object.defineProperty(Id,"__esModule",{value:!0});Id.isPositiveNumber=void 0;var y2=O(),S2=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,y2.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Id.isPositiveNumber=S2});var JL=_(Od=>{"use strict";Object.defineProperty(Od,"__esModule",{value:!0});Od.isNonPositiveNumber=void 0;var A2=O(),b2=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,A2.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Od.isNonPositiveNumber=b2});var YL=_(Md=>{"use strict";Object.defineProperty(Md,"__esModule",{value:!0});Md.isNegativeNumber=void 0;var P2=O(),w2=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,P2.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Md.isNegativeNumber=w2});var XL=_(Nd=>{"use strict";Object.defineProperty(Nd,"__esModule",{value:!0});Nd.isInteger=void 0;var v2=O(),_2=Uf(),W2=function(e,t){return!(0,_2.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,v2.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Nd.isInteger=W2});var ZL=_(zd=>{"use strict";Object.defineProperty(zd,"__esModule",{value:!0});zd.isPositiveInteger=void 0;var L2=O(),k2=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,L2.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};zd.isPositiveInteger=k2});var QL=_(jd=>{"use strict";Object.defineProperty(jd,"__esModule",{value:!0});jd.isNegativeInteger=void 0;var E2=O(),C2=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,E2.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};jd.isNegativeInteger=C2});var ek=_(Dd=>{"use strict";Object.defineProperty(Dd,"__esModule",{value:!0});Dd.isNonNegativeInteger=void 0;var R2=O(),x2=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,R2.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Dd.isNonNegativeInteger=x2});var tk=_($d=>{"use strict";Object.defineProperty($d,"__esModule",{value:!0});$d.isNonPositiveInteger=void 0;var T2=O(),I2=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,T2.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};$d.isNonPositiveInteger=I2});var rk=_(Fd=>{"use strict";Object.defineProperty(Fd,"__esModule",{value:!0});Fd.isNumeric=void 0;var Hd=O(),O2=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Hd.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Hd.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Hd.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Hd.generateTypeGuardError)(e,t.identifier,"number key")),!1};Fd.isNumeric=O2});var ok=_(Ud=>{"use strict";Object.defineProperty(Ud,"__esModule",{value:!0});Ud.isBooleanLike=void 0;var eh=O(),M2=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,eh.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,eh.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Ud.isBooleanLike=M2});var nk=_(Bd=>{"use strict";Object.defineProperty(Bd,"__esModule",{value:!0});Bd.isDateLike=void 0;var Ai=O(),N2=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Ai.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Ai.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Ai.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Ai.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Ai.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Bd.isDateLike=N2});var sk=_(Gd=>{"use strict";Object.defineProperty(Gd,"__esModule",{value:!0});Gd.isBigInt=void 0;var z2=O(),j2=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,z2.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Gd.isBigInt=j2});var rh=_(th=>{"use strict";Object.defineProperty(th,"__esModule",{value:!0});th.isOneOf=D2;var ik=Cn();function D2(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,ik.stringify)(t)}) must be one of following values ${e.map(ik.stringify).join(" | ")}`),o}}});var ak=_(oh=>{"use strict";Object.defineProperty(oh,"__esModule",{value:!0});oh.isOneOfTypes=F2;var $2=Cn(),H2=mi();function F2(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,$2.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,H2.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var lk=_(nh=>{"use strict";Object.defineProperty(nh,"__esModule",{value:!0});nh.isIntersectionOf=U2;function U2(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var ck=_(sh=>{"use strict";Object.defineProperty(sh,"__esModule",{value:!0});sh.isExtensionOf=B2;function B2(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var dk=_(ih=>{"use strict";Object.defineProperty(ih,"__esModule",{value:!0});ih.isNullOr=q2;var G2=xt();function q2(e){function t(r,o){return r===null?!0:e(r,o)}return(0,G2.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var uk=_(ah=>{"use strict";Object.defineProperty(ah,"__esModule",{value:!0});ah.isUndefinedOr=K2;var V2=xt();function K2(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,V2.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var pk=_(lh=>{"use strict";Object.defineProperty(lh,"__esModule",{value:!0});lh.isNilOr=Y2;var J2=xt();function Y2(e){function t(r,o){return r==null?!0:e(r,o)}return(0,J2.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var mk=_(ch=>{"use strict";Object.defineProperty(ch,"__esModule",{value:!0});ch.isAsserted=X2;function X2(e){return!0}});var gk=_(dh=>{"use strict";Object.defineProperty(dh,"__esModule",{value:!0});dh.isEnum=Q2;var Z2=rh();function Q2(e){return function(t,r){return(0,Z2.isOneOf)(...Object.values(e))(t,r)}}});var fk=_(uh=>{"use strict";Object.defineProperty(uh,"__esModule",{value:!0});uh.isEqualTo=r5;var e5=O(),t5=Cn();function r5(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,e5.generateTypeGuardError)(t,r.identifier,`equal to ${(0,t5.stringify)(e)}`)),!1):!0}}});var hk=_(qd=>{"use strict";Object.defineProperty(qd,"__esModule",{value:!0});qd.isRegex=void 0;var o5=O(),n5=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,o5.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};qd.isRegex=n5});var Sk=_(ph=>{"use strict";Object.defineProperty(ph,"__esModule",{value:!0});ph.isPattern=s5;var yk=O();function s5(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,yk.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,yk.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var Ak=_(mh=>{"use strict";Object.defineProperty(mh,"__esModule",{value:!0});mh.by=i5;function i5(e){return function(t){return e(t,null)}}});var bk=_(gh=>{"use strict";Object.defineProperty(gh,"__esModule",{value:!0});gh.toNumber=a5;function a5(e){return typeof e=="number"?e:Number(e)}});var Pk=_(fh=>{"use strict";Object.defineProperty(fh,"__esModule",{value:!0});fh.toDate=l5;function l5(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var wk=_(hh=>{"use strict";Object.defineProperty(hh,"__esModule",{value:!0});hh.toBoolean=c5;function c5(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var vk=_(Vd=>{"use strict";Object.defineProperty(Vd,"__esModule",{value:!0});Vd.isSymbol=void 0;var d5=O(),u5=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,d5.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Vd.isSymbol=u5});var bi=_(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var p5=pd();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return p5.isType}});var yh=uL();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return yh.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return yh.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return yh.isNestedType}});var m5=pL();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return m5.isObjectWith}});var g5=mL();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return g5.isObject}});var f5=gL();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return f5.guardWithTolerance}});var h5=fL();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return h5.isBranded}});var y5=hL();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return y5.BrandSymbols}});var S5=yL();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return S5.isAny}});var A5=SL();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return A5.isBoolean}});var b5=AL();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return b5.isDate}});var P5=Of();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return P5.isDefined}});var w5=cd();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return w5.isNil}});var v5=Uf();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return v5.isNumber}});var _5=bL();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return _5.isString}});var W5=PL();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return W5.isUnknown}});var L5=wL();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return L5.isFunction}});var k5=_L();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return k5.isFile}});var E5=LL();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return E5.isFileList}});var C5=EL();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return C5.isBlob}});var R5=RL();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return R5.isFormData}});var x5=TL();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return x5.isURL}});var T5=OL();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return T5.isURLSearchParams}});var I5=ML();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return I5.isMap}});var O5=NL();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return O5.isSet}});var M5=zL();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return M5.isIndexSignature}});var N5=jL();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return N5.isError}});var z5=qf();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return z5.isArrayWithEachItem}});var j5=Vf();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return j5.isNonEmptyArray}});var D5=DL();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return D5.isNonEmptyArrayWithEachItem}});var $5=HL();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return $5.isTuple}});var H5=xr();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return H5.isNonNullObject}});var F5=FL();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return F5.isObjectWithEachItem}});var U5=UL();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return U5.isPartialOf}});var B5=BL();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return B5.isPick}});var G5=GL();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return G5.isOmit}});var q5=qL();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return q5.isNonEmptyString}});var V5=VL();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return V5.isNonNegativeNumber}});var K5=KL();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return K5.isPositiveNumber}});var J5=JL();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return J5.isNonPositiveNumber}});var Y5=YL();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return Y5.isNegativeNumber}});var X5=XL();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return X5.isInteger}});var Z5=ZL();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return Z5.isPositiveInteger}});var Q5=QL();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return Q5.isNegativeInteger}});var eq=ek();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return eq.isNonNegativeInteger}});var tq=tk();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return tq.isNonPositiveInteger}});var rq=rk();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return rq.isNumeric}});var oq=ok();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return oq.isBooleanLike}});var nq=nk();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return nq.isDateLike}});var sq=sk();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return sq.isBigInt}});var iq=rh();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return iq.isOneOf}});var aq=ak();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return aq.isOneOfTypes}});var lq=lk();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return lq.isIntersectionOf}});var cq=ck();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return cq.isExtensionOf}});var dq=dk();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return dq.isNullOr}});var uq=uk();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return uq.isUndefinedOr}});var pq=pk();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return pq.isNilOr}});var mq=mk();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return mq.isAsserted}});var gq=gk();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return gq.isEnum}});var fq=fk();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return fq.isEqualTo}});var hq=hk();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return hq.isRegex}});var yq=Sk();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return yq.isPattern}});var Sq=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return Sq.generateTypeGuardError}});var Aq=Ak();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return Aq.by}});var bq=bk();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return bq.toNumber}});var Pq=Pk();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return Pq.toDate}});var wq=wk();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return wq.toBoolean}});var vq=vk();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return vq.isSymbol}})});var Tn,_k,_q,Wk,Lk=l(()=>{"use strict";Tn=m(require("node:path")),_k=require("node:url"),_q=()=>!0,Wk=()=>{if(_q()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Tn.default.dirname(Tn.default.resolve(e)):Tn.default.dirname(Tn.default.resolve(__filename))}return Tn.default.dirname((0,_k.fileURLToPath)(__agentWitchImportMetaUrl))}});var Sh,kk,z,Ek,Wq,Tr,k,Kd,Qt,Ck,Jd,In,Yd,Pe,ut,Ah,pt,bh,N,Ph=l(()=>{"use strict";Sh=m(require("node:fs")),kk=m(require("node:os")),z=m(require("node:path")),Ek=m(bi());He();Lk();qc();qc();Wq=Wk(),Tr=e=>e.trim().toLowerCase(),k=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return z.default.resolve(e);let t=z.default.resolve(Wq),r=z.default.basename(t),o=z.default.basename(z.default.dirname(t));return r===Rf&&(o===Rt||o===Xt)?z.default.dirname(t):r===Rt||r===Xt?t:z.default.join(kk.default.homedir(),Rt)},Kd=(e=k())=>z.default.join(e,Rf),Qt=(e=k())=>z.default.join(Kd(e),BW),Ck=(e,t,r)=>t!==null?z.default.join(e,Zt,t,r):z.default.join(e,r),Jd=e=>Ck(e.installDir,e.profileEmail,di),In=e=>Ck(e.installDir,e.profileEmail,dt),Yd=e=>e.profileEmail!==null?z.default.join(e.installDir,Zt,e.profileEmail,Rr):z.default.join(e.installDir,Rr),Pe=(e=k())=>ui(e),ut=(e=k())=>co(e)?Hc:$c,Ah=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Tr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Tr(t):null},pt=(e=k())=>{let t=z.default.join(e,Cf);if(!Sh.default.existsSync(t))return null;try{let r=JSON.parse(Sh.default.readFileSync(t,"utf8"));if((0,Ek.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Tr(r.email)}catch{return null}return null},bh=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Tr(r):null}let t=Ah();return t!==null?t:pt()},N=e=>{let t=k(),r=Kd(t),o=Qt(t),n=bh(e);if(n!==null){let A=z.default.join(t,Zt,n),h=z.default.join(A,Fc),y=z.default.join(A,di),u=z.default.join(A,dt),S=z.default.join(A,Gc),b=z.default.join(A,Rr),f=z.default.join(A,dt,kn),w=z.default.join(A,dt,En);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:u,mainLogPath:f,errorLogPath:w,reportsDir:S,deviceKeypairPath:b,configPath:z.default.join(A,"config.json"),harnessRootDir:h,harnessManifestPath:z.default.join(h,Bc),harnessSetsDir:z.default.join(h,Uc)}}let s=z.default.join(t,Fc),i=z.default.join(t,di),a=z.default.join(t,dt),c=z.default.join(t,Gc),d=z.default.join(t,Rr),p=z.default.join(t,dt,kn),g=z.default.join(t,dt,En);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:g,reportsDir:c,deviceKeypairPath:d,configPath:z.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:z.default.join(s,Bc),harnessSetsDir:z.default.join(s,Uc)}}});var wh,Rk,Lq,kq,xk,vh,Tk=l(()=>{"use strict";wh=m(require("node:fs")),Rk=m(require("node:path"));He();Ph();Lq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kq=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,xk=e=>{let t=Rk.default.join(e,lo.wakePort);if(!wh.default.existsSync(t))return null;try{let r=JSON.parse(wh.default.readFileSync(t,"utf8"));if(Lq(r)&&kq(r.wakePort))return r.wakePort}catch{return null}return null},vh=(e=k())=>xk(e)??ut(e)});var K=l(()=>{"use strict";Ph();Tk()});var _h,Wh,Xd=l(()=>{"use strict";_h=new Set(["","loginwindow","_mbsetupuser","root"]),Wh=5e3});var Ik,Tq,Ok,Lh,kh=l(()=>{"use strict";Ik=require("node:child_process");Xd();Tq=e=>e.trim().toLowerCase(),Ok=e=>e==null?!1:!_h.has(Tq(e)),Lh=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Ik.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return Ok(t)?t:null}catch{return null}}});var Nk,Mk,mt,Pi=l(()=>{"use strict";Nk=m(require("node:os"));kh();Mk=e=>e.trim().toLowerCase(),mt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?Lh():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??Nk.default.userInfo().username;return Mk(r)===Mk(o)}});var zk,jk,go,Dk=l(()=>{"use strict";zk=require("node:child_process"),jk=m(require("node:fs"));K();Pi();go=(e=k())=>{let t=Qt(e);if(!jk.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!mt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=pt(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,zk.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var $k,wi,Zd=l(()=>{"use strict";$k=require("node:child_process"),wi=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,$k.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Qd,Eh,Hk,ee,eu,vi=l(()=>{"use strict";Qd=m(require("node:fs")),Eh=m(require("node:path"));K();He();Hk=e=>{let t=Eh.default.join(e,Zt);return Qd.default.existsSync(t)?Qd.default.readdirSync(t).filter(r=>Qd.default.statSync(Eh.default.join(t,r)).isDirectory()).map(r=>Tr(r)).toSorted():[]},ee=(e=k())=>{let t=Pe(e);return[{profileEmail:Hk(e)[0]??null,launchAgentLabel:t}]},eu=(e=k())=>Hk(e)});var Ch,Fk,Uk,Iq,er,tu=l(()=>{"use strict";Ch=m(require("node:fs")),Fk=m(require("node:os")),Uk=m(require("node:path"));K();vi();Iq=()=>Uk.default.join(Fk.default.homedir(),"Library","LaunchAgents"),er=(e=k())=>{let t=Pe(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ee(e))r.add(n.launchAgentLabel);let o=Iq();if(Ch.default.existsSync(o))for(let n of Ch.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var Bk,_i,Gk=l(()=>{"use strict";K();Zd();tu();vi();Bk=(e=k())=>{let t=new Set(ee(e).map(r=>r.launchAgentLabel));return er(e).filter(r=>!t.has(r))},_i=(e=k())=>{for(let t of Bk(e))wi(t)}});var Wi,Rh=l(()=>{"use strict";K();Zd();tu();Wi=(e=k())=>{for(let t of er(e))wi(t)}});var qk,Vk,Oq,fo,Kk=l(()=>{"use strict";qk=require("node:child_process"),Vk=require("node:util"),Oq=(0,Vk.promisify)(qk.execFile),fo=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await Oq("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var ho,Mq,xh,Th=l(()=>{"use strict";ho=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Mq=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,xh=e=>{let t=e.pathValue??Mq(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${ho(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${ho(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${ho(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${ho(e.homeDir)}</string>
    <key>PATH</key>
    <string>${ho(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${ho(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${ho(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var ru,Ih=l(()=>{"use strict";ru=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var yo,Oh,Li,Nq,zq,jq,Jk,tr,Mh=l(()=>{"use strict";yo=m(require("node:fs")),Oh=m(require("node:os")),Li=m(require("node:path"));He();K();Th();Ih();Nq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zq=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,jq=e=>{let t=Li.default.join(e,lo.wakePort);if(!yo.default.existsSync(t))return ut(e);try{let r=JSON.parse(yo.default.readFileSync(t,"utf8"));if(Nq(r)&&zq(r.wakePort))return r.wakePort}catch{return ut(e)}return ut(e)},Jk=(e,t=Oh.default.homedir())=>Li.default.join(t,"Library","LaunchAgents",`${e}.plist`),tr=e=>{let t=e.installDir??k(),r=e.homeDir??Oh.default.homedir(),o=Jk(e.launchAgentLabel,r),n=yo.default.existsSync(o)?yo.default.readFileSync(o,"utf8"):null;if(n!==null&&ru(n))return{ok:!0,rewritten:!1,plistPath:o};let s=xh({launchAgentLabel:e.launchAgentLabel,runPath:Li.default.join(t,UW,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??jq(t)});if(!ru(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{yo.default.mkdirSync(Li.default.dirname(o),{recursive:!0}),yo.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var Xk,Zk,Qk,ki,Dq,$q,Yk,Ce,Nh=l(()=>{"use strict";Xk=require("node:child_process"),Zk=m(require("node:fs")),Qk=require("node:util");K();Mh();Pi();ki=(0,Qk.promisify)(Xk.execFile),Dq=async e=>{try{return await ki("launchctl",["print",e]),!0}catch{return!1}},$q=async(e,t,r)=>{await Dq(t)&&await ki("launchctl",["bootout",t]).catch(()=>{}),await ki("launchctl",["bootstrap",e,r]),await ki("launchctl",["enable",t])},Yk=async e=>{try{return await ki("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Ce=async(e,t=k())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!mt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=tr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await Yk(n))return{ok:!0};let i=s.plistPath;if(!Zk.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await $q(o,n,i),await Yk(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var So,eE=l(()=>{"use strict";K();Nh();vi();So=async(e=k())=>{let t=[];for(let r of ee(e))(await Ce(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var Ve,rr,tE=l(()=>{"use strict";Rh();Pi();Xd();Ve=e=>{mt()||(Wi(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},rr=(e,t=Wh)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{mt()||e()},t);return()=>{clearInterval(r)}}});var te=l(()=>{"use strict";YW();Dk();Zd();Gk();Rh();tu();Pi();Kk();eE();Nh();Mh();Ih();Th();vi();kh();Xd();tE()});var zh=l(()=>{"use strict";te()});var rE,oE,ou,nE,On,sE,iE,Ao=l(()=>{"use strict";rE=".agent-witch",oE="memory",ou="project.json",nE="chunks.ndjson",On="runs.ndjson",sE="reports",iE=".json"});var aE=l(()=>{"use strict";Ao()});var lE,nu,jh=l(()=>{"use strict";lE=m(require("node:path"));aE();nu=(e,t)=>lE.default.join(e.trim(),`${t.trim()}${iE}`)});var Ei,cE,dE=l(()=>{"use strict";Ei="agent-witch.js",cE="command"});var su=l(()=>{"use strict";dE()});var bo,uE,pE=l(()=>{"use strict";su();bo=e=>`'${e.replace(/'/g,"'\\''")}'`,uE=e=>{let t=`${e.installDir.trim()}/${"app"}/${Ei}`,r=[bo("node"),bo(t),"report","write","--key",bo(e.reportKey.trim()),"--agent-run-id",bo(e.agentRunId.trim()),"--status",bo(e.status),"--summary",bo(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",bo(e.details.trim())),r.join(" ")}});var Tt,mE,Hq,Dh,iu=l(()=>{"use strict";jh();pE();Tt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},mE=e=>e===Tt.COMPLETED||e===Tt.FAILED,Hq=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Dh=(e,t)=>{let r=nu(t.reportsDir,t.reportKey),o=uE({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Tt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${Hq({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Re=l(()=>{"use strict";He();K()});var Ri,fE,gE,hE,Fq,Mn,Uq,yE,xi,Ti,$h,SE,AE,Ii=l(()=>{"use strict";Ri=m(require("node:fs")),fE=m(require("node:path"));iu();jh();Re();gE=50,hE=e=>{let t=N(),r=nu(t.reportsDir,e);return Ri.default.mkdirSync(fE.default.dirname(r),{recursive:!0}),r},Fq=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Mn=e=>{let t=hE(e);if(!Ri.default.existsSync(t))return null;try{let r=JSON.parse(Ri.default.readFileSync(t,"utf8"));return Fq(r)?r:null}catch{return null}},Uq=(e,t)=>{let r=[...e,t];return r.length>gE?r.slice(r.length-gE):r},yE=e=>{let t=hE(e.reportKey);Ri.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},xi=e=>{let t=Mn(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:Uq(t?.history??[],o)};return yE(n),n},Ti=e=>{let t=Mn(e.reportKey);return t!==null?t:xi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Tt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},$h=(e,t)=>{let r=t.trim();if(r.length===0)return Mn(e);let o=Mn(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return yE(s),s},SE=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},AE=e=>{if(e===null||!mE(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Tt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var Bq,Gq,Oi,bE,au,Hh=l(()=>{"use strict";iu();Ii();Bq=new Set(Object.values(Tt)),Gq=e=>Bq.has(e),Oi=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},bE=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},au=e=>{if(e[0]!=="write")return bE(),1;let r=Oi(e,"--key"),o=Oi(e,"--agent-run-id"),n=Oi(e,"--status"),s=Oi(e,"--summary"),i=Oi(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!Gq(n)?(bE(),1):(xi({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var Ke,Po=l(()=>{"use strict";Ke=()=>!0});var Fh,PE,wo,lu=l(()=>{"use strict";Fh=m(require("node:path")),PE=require("node:url");Po();wo=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Fh.default.resolve(t);return Ke()?r===Fh.default.resolve(__filename):e===void 0?!1:r===(0,PE.fileURLToPath)(e)}});var cu,Nn,Kq,Fee,zn=l(()=>{"use strict";cu="agent-witch.js",Nn="deps.tar.gz",Kq="install.sh",Fee={mainScript:`app/${cu}`,depsArchive:`app/${Nn}`,installShell:Kq}});var WE=l(()=>{"use strict";zn()});var LE=l(()=>{"use strict";zn();WE()});var Mi,Bh,du,Jq,Ni,xe,Dn,zi,ji,vo,Gh=l(()=>{"use strict";Mi=m(require("node:fs")),Bh=m(require("node:path"));LE();K();du="install-version.json",Jq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ni=(e=k())=>Bh.default.join(e,du),xe=(e=k())=>{let t=Ni(e);if(!Mi.default.existsSync(t))return null;try{let r=JSON.parse(Mi.default.readFileSync(t,"utf8"));return!Jq(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Dn=(e,t=k())=>{let r=Ni(t);Mi.default.mkdirSync(Bh.default.dirname(r),{recursive:!0}),Mi.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},zi=(e=k())=>xe(e)?.bundleVersion??"241",ji=(e,t)=>{let r=xe(e);if(r!==null)return r;let o={bundleVersion:"241",appOrigin:t,updatedAt:new Date().toISOString()};return Dn(o,e),o},vo=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var kE,_o,qh,Vh,Kh,uu,It,Wo,Jh=l(()=>{"use strict";kE=require("node:crypto"),_o=m(require("node:fs")),qh=m(require("node:path"));K();Vh="self-update-log.ndjson",Kh=100,uu=(e=k())=>{let t=N(),r=t.installDir===e?t.logsDir:In({installDir:e,profileEmail:t.profileEmail});return qh.default.join(r,Vh)},It=(e,t=k())=>{let r={id:(0,kE.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=uu(t);_o.default.mkdirSync(qh.default.dirname(o),{recursive:!0});let n=_o.default.existsSync(o)?_o.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Kh+1)),JSON.stringify(r)];return _o.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Wo=(e=20,t=k())=>{let r=uu(t);if(!_o.default.existsSync(r))return[];let o=_o.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var Yh,ste,Xh=l(()=>{"use strict";zn();Yh="deps",ste=`${"app"}/${Nn}`});var EE=l(()=>{"use strict";Xh()});var CE,Ir,Lo,RE,Zh,Qh,xE=l(()=>{"use strict";CE=require("node:child_process"),Ir=m(require("node:fs")),Lo=m(require("node:path"));zn();Xh();RE=e=>Lo.default.join(e,"app",Yh),Zh=e=>{let t=Lo.default.join(e,"app"),r=Lo.default.join(t,Nn);Ir.default.existsSync(r)&&(Ir.default.rmSync(RE(e),{recursive:!0,force:!0}),Ir.default.mkdirSync(t,{recursive:!0}),(0,CE.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Ir.default.rmSync(r,{force:!0}))},Qh=e=>{Ir.default.rmSync(Lo.default.join(e,"node_modules"),{recursive:!0,force:!0}),Ir.default.rmSync(Lo.default.join(e,"package.json"),{force:!0}),Ir.default.rmSync(Lo.default.join(e,"package-lock.json"),{force:!0})}});var TE=l(()=>{"use strict";EE();xE()});var gt,pu,IE=l(()=>{"use strict";gt="https://www.agentwitch.com",pu="wss://www.agentwitch.com/api/agent-witch/ws"});var Di,or,OE=l(()=>{"use strict";Di="127.0.0.1",or=`http://${Di}:43347`});var Ot=l(()=>{"use strict";IE();OE()});var $i,mu,ME,ty,Yq,NE,ny,zE,ft,Hi,Fi,sy,ry,oy,Ui,iy,ay,ly,$n=l(()=>{"use strict";$i=m(require("node:fs")),mu=m(require("node:path")),ME="active-writer-work.json",ty=new Set,Yq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),NE=e=>e.profileEmail===null?mu.default.join(e.installDir,ME):mu.default.join(e.installDir,"profiles",e.profileEmail,ME),ny=e=>{let t=NE(e);if(!$i.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse($i.default.readFileSync(t,"utf8"));return!Yq(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},zE=(e,t)=>{let r=NE(e);$i.default.mkdirSync(mu.default.dirname(r),{recursive:!0}),$i.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},ft=e=>ny(e).activeCount>0,Hi=e=>{let t=ny(e);zE(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},Fi=e=>{let t=ny(e),r=Math.max(0,t.activeCount-1);if(zE(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of ty)o()},sy=e=>(ty.add(e),()=>{ty.delete(e)}),ry=null,oy=null,Ui=e=>{ry=e},iy=e=>{oy=e},ay=()=>{let e=ry;return ry=null,e},ly=()=>{let e=oy;return oy=null,e}});var we,gu=l(()=>{"use strict";we=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Hn,fu,Bi,cy=l(()=>{"use strict";Hn="qwen2.5:7b",fu="nomic-embed-text",Bi="Install Ollama from https://ollama.com/download"});var Gi,dy,hu=l(()=>{"use strict";cy();Gi=()=>`
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
  agent_witch_ensure_ollama_model "${Hn}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${fu}" "\${pull_log}"
}
`,dy=()=>`
${Gi()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var jE,Xq,yu,uy=l(()=>{"use strict";jE=require("node:child_process");K();hu();Xq=e=>new Promise(t=>{let r=(0,jE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:k()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),yu=async(e=Xq)=>{let t=`${Gi()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var Or,Su,DE,Zq,$E,Un,Qq,eV,tV,Fn,ko,Eo,HE=l(()=>{"use strict";Or=m(require("node:fs")),Su=m(require("node:path"));TE();te();K();zn();Ot();Gh();$n();gu();Jh();uy();DE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Zq=e=>{let t=pt(e),r=t===null?N():N(t);if(!Or.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Or.default.readFileSync(r.configPath,"utf8"));return!DE(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},$E=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!DE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},Un=async e=>(await $E(e))?.bundleVersion??null,Qq=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Su.default.join(t,r);Or.default.mkdirSync(Su.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());Or.default.writeFileSync(n,s),r.endsWith(".js")&&Or.default.chmodSync(n,493)},eV=async()=>{_i(),await So()},tV=(e,t)=>e!==null?we(e):t??gt,Fn=(e,t)=>({localBundleVersion:t,...e}),ko=async e=>{let t=k(),r=xe(t),o=r?.bundleVersion??null,n=await yu();It({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=Zq(t),i=tV(s,r?.appOrigin);if(i===null){let d=Fn({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return It({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await $E(i);if(a===null){let d=Fn({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return It({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||vo(o,a.bundleVersion))){let d=Fn({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return It({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let A of a.scripts)await Qq(i,t,A);let d=Su.default.join(t,cu);Or.default.existsSync(d)&&Or.default.rmSync(d,{force:!0}),Zh(t),Qh(t),Dn({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=N(pt(t));if(ft(p)){let A=Fn({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return It({event:"update_applied",ok:!0,message:A.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),A}await eV();let g=Fn({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return It({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",g=Fn({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return It({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}},Eo=()=>{let e=k();return{local:xe(e),logs:Wo(20,e)}}});var FE={};Ct(FE,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>du,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Bi,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>fu,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>Hn,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Vh,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Kh,appendAgentWitchSelfUpdateLog:()=>It,buildAgentWitchEnsureOllamaShell:()=>Gi,buildAgentWitchInstallScriptOllama:()=>dy,buildAgentWitchSelfUpdateStatus:()=>Eo,ensureAgentWitchInstallVersionRecorded:()=>ji,ensureAgentWitchOllamaInstalled:()=>yu,fetchAgentWitchRemoteInstallBundleVersion:()=>Un,isRemoteAgentWitchBundleVersionNewer:()=>vo,readAgentWitchInstallVersion:()=>xe,readAgentWitchSelfUpdateLogs:()=>Wo,resolveAgentWitchAppOriginFromWsUrl:()=>we,resolveAgentWitchHeartbeatInstallBundleVersion:()=>zi,resolveAgentWitchInstallVersionPath:()=>Ni,resolveAgentWitchSelfUpdateLogPath:()=>uu,runAgentWitchSelfUpdate:()=>ko,writeAgentWitchInstallVersion:()=>Dn});var Mt=l(()=>{"use strict";Gh();Jh();HE();gu();cy();hu();uy()});var py={};Ct(py,{buildAgentWitchSelfUpdateStatus:()=>Eo,fetchAgentWitchRemoteInstallBundleVersion:()=>Un,runAgentWitchSelfUpdate:()=>ko});var my=l(()=>{"use strict";Mt()});function Bn(e){return(0,UE.createHash)("sha256").update(e.trim()).digest("hex")}var UE,gy=l(()=>{"use strict";UE=require("node:crypto")});var Gn,qi,rV,BE,fy,GE=l(()=>{"use strict";Gn=m(require("node:fs")),qi=m(require("node:path"));gy();Re();rV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),BE=e=>{if(!Gn.default.existsSync(e))return null;try{let t=JSON.parse(Gn.default.readFileSync(e,"utf8"));return!rV(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Bn(t.pairingToken.trim())}catch{return null}},fy=(e=k())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(BE(qi.default.join(e,"config.json")));let n=qi.default.join(e,Zt);if(!Gn.default.existsSync(n))return t;for(let s of Gn.default.readdirSync(n)){let i=qi.default.join(n,s);Gn.default.statSync(i).isDirectory()&&o(BE(qi.default.join(i,"config.json")))}return t}});var hy,qE,Au,Vi,Ki,oV,nV,sV,VE,ce,de,bu,Nt,ht=l(()=>{"use strict";hy=m(require("node:fs")),qE=m(require("node:os")),Au=m(require("node:path")),Vi={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Ki=e=>e.trim().length>0,oV=e=>{let t=Au.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},nV=()=>{let e=qE.default.homedir(),t=Au.default.join(e,".local","bin","agent");if(hy.default.existsSync(t))return t;let r=Au.default.join(e,".local","bin","cursor-agent");return hy.default.existsSync(r)?r:Vi.cursorCommand},sV=e=>{let t=e.trim();return!Ki(t)||t===Vi.cursorCommand?nV():t},VE=(e,t)=>oV(e)?t:["agent",...t],ce=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",de=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Ki(t)?t.trim():Vi.claudeCommand,codexCommand:Ki(r)?r.trim():Vi.codexCommand,cursorCommand:sV(o),antigravityCommand:Ki(n)?n.trim():Vi.antigravityCommand}},bu=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:VE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Nt=(e,t,r,o)=>{let n=t.trim();if(!Ki(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:VE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var Mr,iV,Co,aV,qn,Ji=l(()=>{"use strict";Mr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,iV=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:Mr(s.inputTokens)+Mr(s.outputTokens)+Mr(s.cacheReadInputTokens)+Mr(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Co=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=Mr(a.input_tokens)+Mr(a.cache_creation_input_tokens)+Mr(a.cache_read_input_tokens),d=Mr(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:iV(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},aV=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),qn=(e,t)=>{let r=Co(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??aV(r)}}});var yy,lV,cV,Sy,Ay=l(()=>{"use strict";yy=e=>e.toLocaleString("en-US"),lV=e=>e<.01?e.toFixed(4):e.toFixed(3),cV=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${lV(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${yy(e.inputTokens)} in / ${yy(e.outputTokens)} out (${yy(e.totalTokens)} total)`,t].join(`
`)},Sy=(e,t)=>{if(t===void 0)return e;let r=cV(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Pu,by=l(()=>{"use strict";Pu={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Ro,Py,wu,wy=l(()=>{"use strict";by();Ro="auto",Py=e=>({value:Ro,label:`Auto (${Pu[e]})`}),wu={anthropic:[Py("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[Py("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[Py("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Vn,Yi,vu,Kn=l(()=>{"use strict";by();wy();Vn=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Ro))return t},Yi=(e,t)=>{let r=Vn(t);return r===void 0?Pu[e]:r},vu=e=>{let t=Vn(e);return t===void 0?Ro:t}});var _u,dV,uV,Wu,KE=l(()=>{"use strict";_u={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},dV=e=>{let t=_u[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?_u["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?_u["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?_u["gemini-2.0-flash"]:null},uV=(e,t,r)=>{let o=dV(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},Wu=e=>{let t=uV(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Jn,pV,mV,gV,Lu,JE=l(()=>{"use strict";KE();Jn=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),pV=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Jn(r.input_tokens),n=Jn(r.output_tokens);return o===0&&n===0?null:Wu({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},mV=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Jn(r.prompt_tokens),n=Jn(r.completion_tokens);return o===0&&n===0?null:Wu({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},gV=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=Jn(r.promptTokenCount),n=Jn(r.candidatesTokenCount);return o===0&&n===0?null:Wu({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Lu=(e,t,r)=>e==="anthropic"?pV(t,r):e==="openai"?mV(t,r):gV(t,r)});var fV,vy,hV,yV,SV,AV,bV,_y,Wy=l(()=>{"use strict";Kn();JE();fV=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},vy=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Yi(e,t.model)},hV=async e=>{let t=vy("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=fV(o);n.length>0&&e.onChunk?.(n);let s=Lu("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},yV=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},SV=async e=>{let t=vy("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=yV(o);n.length>0&&e.onChunk?.(n);let s=Lu("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},AV=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},bV=async e=>{let t=vy("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=AV(n);s.length>0&&e.onChunk?.(s);let i=Lu("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},_y=async e=>{try{return e.provider==="anthropic"?await hV(e):e.provider==="openai"?await SV(e):await bV(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Je,Xi=l(()=>{"use strict";Je=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var YE,PV,ku,Ly=l(()=>{"use strict";YE=m(require("node:path")),PV="writer-api-secrets.json",ku=e=>YE.default.join(e,PV)});var ky,XE,wV,Nr,Fe,zr=l(()=>{"use strict";ky=m(require("node:fs"));Kn();Ly();XE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wV=e=>{if(!XE(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Vn(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},Nr=e=>{let t=ku(e);if(!ky.default.existsSync(t))return{};try{let r=JSON.parse(ky.default.readFileSync(t,"utf8"));if(!XE(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=wV(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Fe=(e,t)=>Nr(e)[t]??null});var Te,Zi=l(()=>{"use strict";Te=e=>e==="api"?"api":"cli"});var ZE,ve,xo,nr=l(()=>{"use strict";ZE=m(require("node:path"));Xi();zr();Zi();ve=e=>ZE.default.dirname(e),xo=(e,t)=>{if(Te(e.writerExecutionBackend)!=="api")return!1;let r=Je(t);if(r===null)return!1;let o=ve(e.layout.configPath),n=Fe(o,r);return n!==null&&n.apiKey.length>0}});var Qi,Ey=l(()=>{"use strict";Ay();Wy();Xi();zr();nr();Qi=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Je(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=ve(e.layout.configPath),a=Fe(i,s);if(a===null){let d=Object.keys(Nr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await _y({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:Sy(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var QE,Yn,Cy=l(()=>{"use strict";QE=require("node:child_process");ht();Ji();Ey();nr();Yn=(e,t,r)=>new Promise(o=>{if(!ce(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(xo(e,t)){Qi(e,t,r).then(o);return}let n=Nt(t,r,de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,QE.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=qn(i.join("")),p=a.join("").trim(),g=[d.output.trim(),p].filter(A=>A.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var eC=l(()=>{"use strict"});var tC=l(()=>{"use strict";Ay();Cy();Wy();eC();zr();nr()});var rC,oC,nC,sC=l(()=>{"use strict";rC="claude",oC="codex",nC="cursor"});var iC,vV,Ry,ea,Eu=l(()=>{"use strict";iC=m(require("node:path"));Ot();He();vV="ws://localhost:3000/api/agent-witch/ws",Ry=e=>e.replace(/\/$/,""),ea=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Ry(t);let r=iC.default.basename(e.installDir);if(r===ci.production)return pu;let o=e.configWsUrl?.trim()??"";return r===ci.localhost?o.length>0?Ry(o):vV:o.length>0?Ry(o):pu}});var WV,xy,Ty=l(()=>{"use strict";sC();Eu();Zi();WV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xy=e=>{if(!WV(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=ea({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??rC,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??oC,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??nC,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Te(t.writerExecutionBackend),layout:e.layout}}}});var Iy,Oy,My=l(()=>{"use strict";Iy=m(require("node:fs"));K();Ty();Oy=e=>{let t=N(e);if(!Iy.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Iy.default.readFileSync(t.configPath,"utf8")),o=xy({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var ta,aC=l(()=>{"use strict";ta=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var Ny,LV,zy,lC=l(()=>{"use strict";Ny=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),LV=e=>{if(!Ny(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!Ny(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(g=>{if(!Ny(g))return[];let A=typeof g.itemKey=="string"?g.itemKey.trim():"",h=typeof g.relativePath=="string"?g.relativePath:"",y=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return A.length===0||y.length===0?[]:[{itemKey:A,relativePath:h,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},zy=LV});var cC,kV,Cu,jy=l(()=>{"use strict";cC=m(require("node:path")),kV=(e,t)=>{let r=t.trim();return cC.default.join(e,"components","store",r.slice(0,2),r)},Cu=kV});var dC,EV,Dy,uC=l(()=>{"use strict";dC=m(require("node:fs"));jy();EV=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Cu(e.installDir,n.contentSha256);dC.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},Dy=EV});var ra,Xn,CV,$y,RV,Hy,Fy=l(()=>{"use strict";ra=m(require("node:fs")),Xn=m(require("node:path"));jy();CV=(e,t)=>Xn.default.join(e.installDir,"runs",t,"overlay"),$y=(e,t)=>Xn.default.join(CV(e,t),".cursor"),RV=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=$y(e,t);ra.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Cu(e.installDir,i.contentSha256);if(!ra.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Xn.default.join(n,c):Xn.default.join(n,i.itemKey);ra.default.mkdirSync(Xn.default.dirname(d),{recursive:!0}),ra.default.copyFileSync(a,d)}return{ok:!0}},Hy=RV});var Uy,pC,xV,oa,mC=l(()=>{"use strict";Uy=m(require("node:fs")),pC=m(require("node:path")),xV=(e,t)=>{let r=pC.default.join(e.installDir,"runs",t);Uy.default.existsSync(r)&&Uy.default.rmSync(r,{recursive:!0,force:!0})},oa=xV});var TV,By,gC=l(()=>{"use strict";Fy();TV=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=$y(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},By=TV});var Gy,IV,OV,MV,NV,zV,$,fC=l(()=>{"use strict";Gy=m(require("node:fs"));Eu();K();Zi();IV="claude",OV="codex",MV="cursor",NV="agy",zV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=N();if(!Gy.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Gy.default.readFileSync(e.configPath,"utf8"));if(!zV(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=ea({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Te(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:IV,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:OV,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:MV,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:NV,pairingToken:s,layout:e}}catch{return null}}});var Ru,hC,yC=l(()=>{"use strict";Ru=m(require("node:fs"));Ly();hC=(e,t)=>{let r=ku(e);Ru.default.mkdirSync(e,{recursive:!0}),Ru.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Ru.default.chmodSync(r,384)}catch{}}});var na,SC,xu=l(()=>{"use strict";na=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},SC=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===na(t)}});var sa,jV,qy,Vy,AC=l(()=>{"use strict";sa=m(require("node:fs"));zr();yC();xu();Kn();nr();jV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qy=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=SC(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Vn(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},Vy=e=>{let t=ve(e.configPath),r={};if(sa.default.existsSync(e.configPath))try{let n=JSON.parse(sa.default.readFileSync(e.configPath,"utf8"));jV(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,sa.default.mkdirSync(t,{recursive:!0}),sa.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=qy(qy(qy(Nr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);hC(t,o)}});var Tu,Ky=l(()=>{"use strict";Tu={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var Jy,bC=l(()=>{"use strict";Xi();zr();nr();nr();Jy=(e,t)=>{if(xo(e,t))return!1;let r=Je(t);if(r===null)return!1;let o=ve(e.layout.configPath),n=Fe(o,r);return n===null||n.apiKey.trim().length===0}});var PC,Yy,Xy=l(()=>{"use strict";PC=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},Yy=async e=>{let t=PC(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=PC(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var DV,Zy,wC=l(()=>{"use strict";te();My();Xy();DV=1e4,Zy=()=>Yy({listProfileEmails:eu,readConfig:Oy,pollIntervalMs:DV,logWaiting:e=>{console.error(e)}})});var ue=l(()=>{"use strict";Cy();tC();My();Eu();aC();lC();uC();Fy();mC();gC();Zi();fC();AC();zr();nr();xu();Kn();Ky();Ey();nr();bC();Xi();zr();wC();Ty();Xy()});var Iu,vC,$V,HV,_C,Ou,ia,Mu,aa=l(()=>{"use strict";Iu=m(require("node:fs")),vC=m(require("node:path")),$V="wake-port.json",HV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_C=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Ou=e=>vC.default.join(e,$V),ia=e=>{let t=Ou(e);if(!Iu.default.existsSync(t))return null;try{let r=JSON.parse(Iu.default.readFileSync(t,"utf8"));if(HV(r)&&_C(r.wakePort))return r.wakePort}catch{return null}return null},Mu=(e,t)=>{if(!_C(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Ou(e);Iu.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Ane,bne,Pne,yt,WC,la=l(()=>{"use strict";aa();Re();aa();Ane=ut(),bne=`${Pe()}-wake`,Pne=Pe(),yt=()=>{let e=k(),t=ia(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return ut()},WC=e=>{let t=k();ia(t)===null&&Mu(t,e)}});var LC=l(()=>{"use strict";gy();te();GE();ue();la()});var Qy,ca,da,kC=l(()=>{"use strict";Qy=m(require("node:os"));LC();ca=()=>{let e=ee();return{ok:!0,port:yt(),hostname:Qy.default.hostname(),profileCount:e.length}},da=()=>{let e=ee(),t=$()?.pairingToken.trim()??"",r=t.length>0?Bn(t):null,o=fy();return{hostname:Qy.default.hostname(),port:yt(),tokenHash:r,tokenHashes:o.length>0?o:r!==null?[r]:[],profiles:e.map(n=>({email:n.profileEmail,launchAgentLabel:n.launchAgentLabel}))}}});var eS=l(()=>{"use strict";kC()});var EC,CC,RC,Nu,Zn=l(()=>{"use strict";EC="materialization.json",CC="backups",RC=".gitignore",Nu=e=>`harness-set:${e.trim()}`});var xC,TC,zu,IC=l(()=>{"use strict";xC=m(require("node:crypto")),TC=m(require("node:fs")),zu=e=>{try{let t=TC.default.readFileSync(e);return xC.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var jr,To,FV,OC,tS,MC=l(()=>{"use strict";jr=m(require("node:fs")),To=m(require("node:path"));IC();FV=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=To.default.join(t,n,o);return jr.default.mkdirSync(To.default.dirname(s),{recursive:!0}),jr.default.copyFileSync(r,s),To.default.relative(e,s).replaceAll("\\","/")},OC=e=>{let t=To.default.join(e.repoRoot,e.repoRelativeDestination),r=zu(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(jr.default.existsSync(t)){let n=zu(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=FV(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return jr.default.mkdirSync(To.default.dirname(t),{recursive:!0}),jr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return jr.default.mkdirSync(To.default.dirname(t),{recursive:!0}),jr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},tS=e=>{let t=zu(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var rS,NC,ju,oS=l(()=>{"use strict";rS=m(require("node:fs"));Zn();NC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ju=e=>{if(!rS.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(rS.default.readFileSync(e,"utf8"));if(NC(t)&&t.version===1&&NC(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var Dr,Du,zC,jC=l(()=>{"use strict";Dr=m(require("node:fs")),Du=m(require("node:path"));Zn();zC=e=>{let t=new Set(e.setSlugs.map(s=>Nu(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=Du.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Du.default.join(e.repoRoot,i.backupPath);Dr.default.existsSync(c)?(Dr.default.mkdirSync(Du.default.dirname(a),{recursive:!0}),Dr.default.copyFileSync(c,a),o.push(s)):Dr.default.existsSync(a)&&Dr.default.rmSync(a,{force:!0})}else Dr.default.existsSync(a)&&Dr.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var nS,$u,sS=l(()=>{"use strict";nS=m(require("node:path"));Zn();$u=e=>({ledgerFilePath:nS.default.join(e.metaDirPath,EC),backupsDirPath:nS.default.join(e.metaDirPath,CC)})});var iS,DC,$C=l(()=>{"use strict";iS=m(require("node:path")),DC=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return iS.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return iS.default.posix.join(s,e,n)}});var aS,HC,lS,FC=l(()=>{"use strict";aS=m(require("node:fs")),HC=m(require("node:path")),lS=(e,t)=>{aS.default.mkdirSync(HC.default.dirname(e),{recursive:!0}),aS.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var cS,UV,rt,Qn=l(()=>{"use strict";cS=m(require("node:os")),UV=e=>{let t=e.trim();return t.startsWith("~/")?`${cS.default.homedir()}${t.slice(1)}`:t==="~"?cS.default.homedir():t},rt=UV});var Hu,UC,BV,BC,GC=l(()=>{"use strict";Hu=m(require("node:fs")),UC=m(require("node:path"));Zn();Ao();BV=`*
!${ou}
`,BC=e=>{let t=UC.default.join(e,RC);Hu.default.existsSync(t)||(Hu.default.mkdirSync(e,{recursive:!0}),Hu.default.writeFileSync(t,BV))}});var Io,ot,Oo=l(()=>{"use strict";Io=m(require("node:path"));Ao();Qn();ot=e=>{let t=rt(e),r=Io.default.join(t,rE);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Io.default.join(r,"rag"),memoryDirPath:Io.default.join(r,oE),reportsDirPath:Io.default.join(r,sE),metaFilePath:Io.default.join(r,ou),ragChunksFilePath:Io.default.join(r,"rag",nE)}}});var zt,VC,GV,qV,Ye,dS=l(()=>{"use strict";zt=m(require("node:fs")),VC=m(require("node:path"));Ao();GC();Oo();GV=(e,t)=>{if(zt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};zt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},qV=e=>{zt.default.existsSync(e.ragChunksFilePath)||zt.default.writeFileSync(e.ragChunksFilePath,"");let t=VC.default.join(e.memoryDirPath,On);zt.default.existsSync(t)||zt.default.writeFileSync(t,"")},Ye=e=>{let t=ot(e.projectFolderPath);return zt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),zt.default.mkdirSync(t.ragDirPath,{recursive:!0}),zt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),BC(t.metaDirPath),GV(t,e),qV(t),{ok:!0,layout:t}}});var KC,JC,YC,XC,Fu,Uu=l(()=>{"use strict";KC="components",JC="store",YC="versions",XC="installed.json",Fu=e=>`harness-set:${e.trim()}`});var uS,ZC,Bu,pS=l(()=>{"use strict";uS=m(require("node:fs")),ZC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Bu=e=>{if(!uS.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(uS.default.readFileSync(e,"utf8"));if(ZC(t)&&t.version===1&&ZC(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var pa,es,Gu=l(()=>{"use strict";pa=m(require("node:path"));Uu();es=e=>{let t=pa.default.join(e,KC);return{componentsRootDir:t,storeDir:pa.default.join(t,JC),versionsDir:pa.default.join(t,YC),installedFilePath:pa.default.join(t,XC)}}});var mS,QC,qu,Vu,Ku=l(()=>{"use strict";mS=m(require("node:crypto")),QC=m(require("node:fs")),qu=e=>mS.default.createHash("sha256").update(e,"utf8").digest("hex"),Vu=e=>{try{let t=QC.default.readFileSync(e);return mS.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var gS,eR,tR,rR=l(()=>{"use strict";gS=m(require("node:fs")),eR=m(require("node:path")),tR=(e,t)=>{gS.default.mkdirSync(eR.default.dirname(e),{recursive:!0}),gS.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var fS,hS,oR,nR=l(()=>{"use strict";fS=m(require("node:fs")),hS=m(require("node:path")),oR=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=hS.default.join(e,r),n=hS.default.join(o,`${t.versionId}.json`);fS.default.mkdirSync(o,{recursive:!0}),fS.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var Ju,sR,iR,aR=l(()=>{"use strict";Ju=m(require("node:fs")),sR=m(require("node:path"));Ku();iR=e=>{let t=qu(e.content),r=sR.default.join(e.storeDir,t);return Ju.default.existsSync(r)||(Ju.default.mkdirSync(e.storeDir,{recursive:!0}),Ju.default.writeFileSync(r,e.content)),t}});var yS,lR,VV,Yu,SS=l(()=>{"use strict";yS=m(require("node:fs")),lR=m(require("node:path"));Uu();pS();Gu();Ku();rR();nR();aR();VV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Yu=e=>{let t=es(e.installDir),r=Fu(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!VV(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=lR.default.join(e.harnessRootDir,a);if(!yS.default.existsSync(c))continue;let d=yS.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Vu(c);if(p!==null){if(qu(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);iR({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;oR(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=Bu(t.installedFilePath);tR(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var bS,AS,cR,dR=l(()=>{"use strict";bS=m(require("node:fs"));SS();pS();Gu();AS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cR=e=>{if(!bS.default.existsSync(e.harnessManifestPath))return;let t=es(e.installDir),r=Bu(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(bS.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!AS(o)||o.version!==1||!AS(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!AS(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Yu({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var PS,uR,pR,mR=l(()=>{"use strict";PS=m(require("node:fs")),uR=m(require("node:path")),pR=e=>{let t=e.componentId.replaceAll("/","_"),r=uR.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!PS.default.existsSync(r))return null;try{let o=JSON.parse(PS.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Xu,Zu,gR,fR=l(()=>{"use strict";Xu=m(require("node:fs")),Zu=m(require("node:path"));Uu();dR();mR();Gu();Ku();gR=e=>{cR({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=es(e.layout.installDir),r=Fu(e.setSlug),o=pR({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Zu.default.join(t.storeDir,i.contentSha256);if(Xu.default.existsSync(a)&&Vu(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Zu.default.join(e.layout.harnessRootDir,n):Zu.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Xu.default.existsSync(s))return null;try{if(!Xu.default.statSync(s).isFile())return null}catch{return null}return s}});var hR,KV,JV,$r,Qu=l(()=>{"use strict";oS();sS();Oo();hR="harness-set:",KV=e=>{let t=e.trim();if(!t.startsWith(hR))return null;let r=t.slice(hR.length).trim();return r.length>0?r:null},JV=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=KV(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},$r=e=>{let t=ot(e),{ledgerFilePath:r}=$u(t),o=ju(r);return JV(o)}});var ep,wS,ma,YV,sr,ga,ts=l(()=>{"use strict";ep=m(require("node:fs")),wS=m(require("node:os")),ma=m(require("node:path")),YV=()=>ep.default.realpathSync(ma.default.resolve(wS.default.homedir())),sr=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?ma.default.join(wS.default.homedir(),t.slice(1)):t,o;try{o=ep.default.realpathSync(ma.default.resolve(r))}catch{return null}let n=YV();return o===n||o.startsWith(`${n}${ma.default.sep}`)?o:null},ga=e=>{let t=sr(e);if(t===null)return null;try{if(!ep.default.statSync(t).isFile())return null}catch{return null}return t}});var vS,_S=l(()=>{"use strict";vS=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var rp,yR,tp,XV,fa,WS=l(()=>{"use strict";rp=m(require("node:fs")),yR=m(require("node:path"));Zn();MC();oS();jC();sS();$C();FC();Qn();dS();fR();Qu();ts();_S();tp=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),XV=e=>{if(!rp.default.existsSync(e))return null;try{let t=JSON.parse(rp.default.readFileSync(e,"utf8"));if(tp(t)&&t.version===1)return t}catch{return null}return null},fa=e=>{let t=[...new Set(e.setSlugs.map(b=>b.trim()).filter(b=>b.length>0))],r=rt(e.projectFolderPath),o=sr(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=rp.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Ye({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=$u(s.layout),d=$r(o).filter(b=>!t.includes(b)),p=ju(i),g=0;if(d.length>0){let b=zC({repoRoot:o,setSlugs:d,ledger:p});p=b.ledger,g=b.summary.removedPaths.length}if(t.length===0)return lS(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let A=XV(e.layout.harnessManifestPath);if(A===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let h=tp(A.sets)?A.sets:{},y=0,u=0,S=0;for(let b of t){let f=h[b];if(!tp(f))return{ok:!1,errorMessage:`Harness set "${b}" is not installed locally.`};let w=typeof f.version=="number"?String(f.version):"1",v=Nu(b),W=Array.isArray(f.items)?f.items:[];for(let L of W){if(!tp(L))continue;let E=typeof L.path=="string"?L.path.trim():"";if(E.length===0)continue;let x=vS(E);if(x===null)continue;let I=DC(b,x),M=yR.default.posix.join(".cursor",I).replaceAll("\\","/"),B=typeof L.id=="string"?L.id.trim():"",q=gR({layout:e.layout,setSlug:b,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:E,manifestItemId:B});if(q===null)continue;let F=OC({repoRoot:o,backupsDir:a,repoRelativeDestination:M,sourceAbsolutePath:q,componentId:v,versionId:w,ledger:p});if(F.kind==="skipped_unchanged"){u+=1;continue}if(F.kind==="backed_up_user_file"){S+=1,y+=1,p={version:1,entries:{...p.entries,[M]:tS({componentId:v,versionId:w,sourceAbsolutePath:q,backupPath:F.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[M]:tS({componentId:v,versionId:w,sourceAbsolutePath:q})}}}}return y===0&&u===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(lS(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:S,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var SR,op,ZV,QV,eK,tK,rK,oK,nK,sK,iK,ha,np=l(()=>{"use strict";SR=m(require("node:crypto")),op=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},ZV=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},QV=(e,t)=>{let r=ZV(t),o=op(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},eK=(e,t,r)=>{let o=QV(t,r);return`shared/items/${e}/${o}`},tK=["rules","skills","commands","instructions","agents"],rK=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),oK=(e,t)=>[...e.filter(o=>o.id!==t.id),t],nK=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},sK=e=>SR.default.createHash("sha256").update(e,"utf8").digest("hex"),iK=e=>({id:e.id,kind:e.kind,title:e.title,path:eK(e.id,e.kind,e.title),contentSha256:sK(e.content)}),ha=e=>{let t=new Date().toISOString(),r=e.existingManifest??rK(e.hostname,t),o=op(e.bundle.slug),n=nK(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...tK.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let g=iK(p);return{files:[...d.files,{relativePath:g.path,content:p.content}],nextItems:oK(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var Hr,AR,sp,aK,Mo,LS=l(()=>{"use strict";Hr=m(require("node:fs")),AR=m(require("node:os")),sp=m(require("node:path"));np();aK=e=>{if(!Hr.default.existsSync(e))return null;try{let t=JSON.parse(Hr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Mo=e=>{try{let t=aK(e.layout.harnessManifestPath),r=ha({bundle:e.bundle,hostname:AR.default.hostname(),existingManifest:t});Hr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)Hr.default.mkdirSync(sp.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=sp.default.join(e.layout.harnessRootDir,o.relativePath);Hr.default.mkdirSync(sp.default.dirname(n),{recursive:!0}),Hr.default.writeFileSync(n,o.content)}return Hr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var kS,bR=l(()=>{"use strict";LS();WS();kS=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=Mo({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return fa({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var PR,wR=l(()=>{"use strict";PR=["rule","skill","command","instruction","agent"]});var vR,lK,cK,jt,ES=l(()=>{"use strict";wR();vR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lK=e=>typeof e=="string"&&PR.includes(e),cK=e=>{if(!vR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!lK(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},jt=e=>{if(!vR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=cK(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var _R,dK,CS,WR=l(()=>{"use strict";_R=require("node:zlib");ES();dK="x-agent-witch-token",CS=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[dK]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,_R.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=jt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var xS,RS,Fr,LR=l(()=>{"use strict";xS=m(require("node:fs")),RS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fr=e=>{if(!xS.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(xS.default.readFileSync(e.harnessManifestPath,"utf8"));if(!RS(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=RS(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!RS(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var ip,kR=l(()=>{"use strict";ip=()=>"~"});var ER,CR,RR=l(()=>{"use strict";ER=require("node:crypto"),CR=e=>`local-${(0,ER.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var TS,xR=l(()=>{"use strict";TS=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var ya,ap,IS=l(()=>{"use strict";ya=m(require("node:path")),ap=e=>{let t=ya.default.dirname(e),r=ya.default.basename(t);return r==="agents"?ya.default.basename(ya.default.dirname(t)):r}});var Sa,ir,TR,uK,pK,mK,lp,IR,OS=l(()=>{"use strict";Sa=m(require("node:fs")),ir=m(require("node:path"));RR();xR();IS();TR=new Set(["node_modules",".git","dist","build",".next","coverage"]),uK=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},pK=(e,t)=>{let r=ir.default.basename(t);if(e==="skill"){let o=t.split(ir.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},mK=e=>{let t=[],r=(n,s)=>{let i;try{i=Sa.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&TR.has(a.name))continue;let c=ir.default.join(n,a.name),d=s?ir.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;TS(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=ir.default.join(e,n);Sa.default.existsSync(s)&&r(s,n)}let o=ir.default.join(e,"skills");return Sa.default.existsSync(o)&&r(o,"skills"),t},lp=e=>{let t=mK(e);if(t.length===0)return null;let r=ir.default.dirname(e),o=ap(e),n=uK(o),s=t.map(i=>{let a=TS(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:CR(i.absolutePath),kind:a,title:pK(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},IR=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Sa.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||TR.has(a.name))continue;let c=ir.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var OR,MS,gK,NS,MR=l(()=>{"use strict";OR=m(require("node:fs")),MS=m(require("node:path"));OS();ts();gK=e=>{let t=sr(e.trim());if(t===null)return null;if(MS.default.basename(t)===".cursor")return t;let r=MS.default.join(t,".cursor");try{if(OR.default.statSync(r).isDirectory())return sr(r)}catch{return null}return null},NS=e=>{let t=gK(e.projectPath);if(t===null)return null;let r=lp(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var NR,fK,cp,zS,zR=l(()=>{"use strict";NR=m(require("node:path"));OS();ts();IS();fK=5,cp=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},zS=e=>{let t=sr(e.scanRoot.trim());if(t===null)return cp(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of IR(t,fK,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=sr(s);if(i===null)continue;let a=ap(i);cp(e.response,"folder",{cursorDir:i,groupName:a,repoPath:NR.default.dirname(i)});let c=lp(i);c!==null&&(r.push(c),cp(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return cp(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var jR,DR,$R=l(()=>{"use strict";jR=m(require("node:path")),DR=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:jR.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var ze,HR,jS,hK,DS,$S,dp,HS,Aa,FR=l(()=>{"use strict";ze=m(require("node:fs")),HR=m(require("node:os")),jS=m(require("node:path"));np();SS();ts();$R();hK=e=>{if(!ze.default.existsSync(e))return null;try{let t=JSON.parse(ze.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},DS=e=>{let t=e.hostname??HR.default.hostname(),r=hK(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let g=ga(p.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let A=ze.default.readFileSync(g,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:A,setSlugs:[i.slug]})}let d=ha({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{ze.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)ze.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=jS.default.join(e.layout.harnessRootDir,i.relativePath);ze.default.mkdirSync(jS.default.dirname(a),{recursive:!0}),ze.default.writeFileSync(a,i.content)}ze.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=op(i.slug),d=r.sets[c];d!==void 0&&Yu({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},$S="reveal-cache.json",dp=(e,t)=>{ze.default.mkdirSync(e.harnessRootDir,{recursive:!0}),ze.default.writeFileSync(`${e.harnessRootDir}/${$S}`,`${JSON.stringify(t,null,2)}
`)},HS=e=>{let t=`${e.harnessRootDir}/${$S}`;ze.default.existsSync(t)&&ze.default.unlinkSync(t)},Aa=e=>{let t=`${e.harnessRootDir}/${$S}`;if(!ze.default.existsSync(t))return null;try{let r=JSON.parse(ze.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return DR(r)}catch{return null}return null}});var No=l(()=>{"use strict";WS();bR();_S();LS();WR();ES();np();LR();kR();MR();ts();zR();FR()});var FS,UR=l(()=>{"use strict";No();Re();FS=e=>{let t=N(e.profileEmail);return Mo({bundle:e.bundle,layout:t})}});var BR=l(()=>{"use strict";UR();No()});var yK,GR,SK,qR,zo,up,VR=l(()=>{"use strict";yK=["agentwitch.com","www.agentwitch.com"],GR=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,SK=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},qR=e=>{let t=SK(e);return!!(yK.includes(t)||GR.test(e.trim().toLowerCase()))},zo=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return qR(r)?GR.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},up=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:zo(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var ba=l(()=>{"use strict";VR()});var ar,Pa=l(()=>{"use strict";ar=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var wa,KR=l(()=>{"use strict";BR();ba();Pa();wa=e=>{if(!ar(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=jt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!zo(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=FS({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var US=l(()=>{"use strict";KR()});var AK,rs,BS=l(()=>{"use strict";AK=e=>e==="hourly"||e==="daily"||e==="weekdays",rs=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!AK(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var va,pp,JR,YR,GS,St,mp,gp,fp,hp,yp=l(()=>{"use strict";va=m(require("node:fs")),pp=m(require("node:path"));BS();JR="automations.json",YR=e=>e.profileEmail!==null?pp.default.join(e.installDir,"profiles",e.profileEmail,JR):pp.default.join(e.installDir,JR),GS=()=>({version:1,automations:[]}),St=e=>{let t=YR(e);if(!va.default.existsSync(t))return GS();try{let r=JSON.parse(va.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?GS():{version:1,automations:r.automations.flatMap(n=>{let s=rs(n);return s!==null?[s]:[]})}}catch{return GS()}},mp=(e,t)=>{let r=YR(e);va.default.mkdirSync(pp.default.dirname(r),{recursive:!0}),va.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},gp=(e,t)=>{mp(e,{version:1,automations:t})},fp=(e,t)=>{let o=St(e).automations.filter(n=>n.id!==t.id);mp(e,{version:1,automations:[...o,t]})},hp=(e,t)=>St(e).automations.find(r=>r.id===t)??null});var Ie,lr=l(()=>{"use strict";Ie="x-agent-witch-token"});var qS=l(()=>{"use strict";gu();hu()});var Y,jo,VS,_a,KS,bK,JS,Wa,La,YS,ka=l(()=>{"use strict";lr();qS();Y=e=>{let t=we(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},jo=e=>({[Ie]:e,"Content-Type":"application/json"}),VS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:jo(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},_a=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:jo(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},KS=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:jo(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},bK=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},JS=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:jo(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Wa=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:jo(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return bK(r)}catch{return null}},La=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:jo(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},YS=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:jo(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Do,XR,ZR,PK,XS,QR,ZS=l(()=>{"use strict";Do=m(require("node:fs")),XR=m(require("node:path")),ZR=e=>XR.default.join(e.harnessRootDir,"projects-registry.json"),PK=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),XS=e=>{let t=ZR(e);if(!Do.default.existsSync(t))return[];try{let r=JSON.parse(Do.default.readFileSync(t,"utf8"));return PK(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},QR=e=>{let t=ZR(e);if(!Do.default.existsSync(t))return;let r=`${t}.migrated`;if(Do.default.existsSync(r)){Do.default.unlinkSync(t);return}Do.default.renameSync(t,r)}});var e0,wK,vK,t0,r0=l(()=>{"use strict";Qn();e0=e=>rt(e),wK=e=>new Set(e.map(t=>e0(t.folderPath))),vK=e=>new Set(e.map(t=>t.id)),t0=(e,t)=>{let r=wK(t),o=vK(t),n=[],s=new Set;for(let i of e){let a=e0(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var QS,eA=l(()=>{"use strict";ka();ZS();r0();QS=async(e,t)=>{let r=XS(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Wa(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=t0(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await JS(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&QR(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var tA,$o,Sp=l(()=>{"use strict";tA=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),$o=(e,t)=>e.find(r=>r.id===t)??null});var os,Ap=l(()=>{"use strict";ka();eA();Sp();os=async(e,t)=>{t!==void 0&&await QS(t,e);let r=Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Wa(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=tA(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var o0=l(()=>{"use strict"});var _K,WK,bp,rA=l(()=>{"use strict";_K="Default",WK=e=>e.trim().toLowerCase()===_K.toLowerCase(),bp=WK});var _e,n0,LK,kK,EK,CK,ns,oA=l(()=>{"use strict";rA();_e=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n0=(e,t)=>e.length===0?`<p class="empty">${_e(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${_e(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${_e(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,LK=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,kK=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${_e(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,EK=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?kK(e.project):LK();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
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
      </form>`},CK=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${_e(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${_e(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},ns=e=>{let t=e.flashError?`<div class="alert-error">${_e(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${_e(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(p,g)=>`<a class="project-tab${e.activeTab===p?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${p}">${_e(g)}</a>`,n=e.composition?.items.filter(p=>p.kind==="workflow")??[],s=e.composition?.items.filter(p=>p.kind==="agent")??[],i="";e.activeTab==="harness"?i=EK({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=n0(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=n0(s,"No agents installed for this project yet."):i=CK({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});let a=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}?rename=1`,c=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${_e(a)}" target="_blank" rel="noopener noreferrer">Rename in Agent Witch Cloud\u2026</a>
    </div>`,d=bp(e.project.name)?"":`<section class="danger-zone stack">
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
    </section>${d}`}});var RK,xK,s0,i0=l(()=>{"use strict";No();lr();RK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xK=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[Ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!RK(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=jt(n);return s===null?[]:[s]})}catch{return null}},s0=xK});var a0,nA,l0=l(()=>{"use strict";ue();No();oA();Ap();i0();Sp();Qu();ka();Ot();a0=e=>({kind:"page",title:e.project.name,body:ns({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Fr(e.layout),linkedSetSlugs:$r(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),nA=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let o=await os(r,e.layout),n=$o(o.projects,t);if(n===null)return{kind:"not_found"};let s=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??gt,a=s===null?null:await s0(s,n.id);if(a===null)return a0({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=kS({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return a0({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await La(s,n.id,c.appliedSetSlugs),p=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${p.toString()}`}}});var TK,sA,c0=l(()=>{"use strict";TK=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,sA=TK});var d0,u0,IK,OK,Pp,wp,p0=l(()=>{"use strict";d0=require("node:child_process"),u0=require("node:util"),IK=(0,u0.promisify)(d0.execFile),OK=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},Pp=async(e,t)=>{try{let{stdout:r}=await IK("git",t,{cwd:e,env:OK(),maxBuffer:1048576});return r.trim()}catch{return null}},wp=async e=>{let t=await Pp(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Pp(e,["rev-parse","--abbrev-ref","HEAD"]),o=await Pp(e,["status","--porcelain"]),n=await Pp(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var iA,m0=l(()=>{"use strict";iA=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var MK,aA,g0=l(()=>{"use strict";MK=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},aA=MK});var NK,lA,f0=l(()=>{"use strict";lr();NK=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[Ie]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},lA=NK});var h0,Ur,y0=l(()=>{"use strict";h0=require("node:child_process"),Ur=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,h0.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var S0=l(()=>{"use strict";Ap()});var Ea,A0=l(()=>{"use strict";lr();Ea=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[Ie]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var cA,b0=l(()=>{"use strict";lr();cA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[Ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var Dt=l(()=>{"use strict";Ap();Sp();o0();Qn();dS();l0();Qu();c0();p0();m0();g0();f0();y0();S0();A0();b0();eA();ZS();ka()});var vp,Ca,P0,dA,Ho,uA=l(()=>{"use strict";vp=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},Ca=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=vp(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},P0=e=>e>=1&&e<=5,dA=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return vp(t,"UTC")},Ho=e=>{let t=e.from??new Date,r=vp(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Ca(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=Ca(r,e.timeZone,o,0),s=vp(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?Ca(dA(r),e.timeZone,o,0):n;if(!i&&P0(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=dA(a),P0(a.weekday))return Ca(a,e.timeZone,o,0);return Ca(dA(r),e.timeZone,o,0)}});var w0,pA,cr,mA=l(()=>{"use strict";w0=require("node:crypto");ue();Dt();uA();yp();pA=!1,cr=async e=>{if(pA)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=hp(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};pA=!0;let n=(0,w0.randomUUID)();try{let s=await Yn(t,"claude-cli",o.prompt);await YS(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=Ho({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return fp(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{pA=!1}}});var _p,v0=l(()=>{"use strict";ue();mA();yp();_p=async()=>{let e=$();if(e===null)return;let t=St(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await cr(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var Ra=l(()=>{"use strict";yp();v0();mA();uA()});var _0=l(()=>{"use strict";Ra()});var W0=l(()=>{"use strict";BS()});var L0=l(()=>{"use strict";W0()});var gA=l(()=>{"use strict";Ra()});var zK,jK,xa,fA=l(()=>{"use strict";_0();L0();gA();Re();zK=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),jK=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Ho({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Ho({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},xa=e=>{let t=zK(e.profileEmail),r=St(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=rs(s);return i!==null?[jK(i,o.get(i.id))]:[]});return gp(t,n),{ok:!0,writtenCount:n.length}}});var hA=l(()=>{"use strict";Ra()});var k0=l(()=>{"use strict";ue()});var E0=l(()=>{"use strict";fA();hA();gA();k0()});var C0,Ta,Ia,Oa,R0=l(()=>{"use strict";C0=m(require("node:os"));E0();ba();Pa();Ta=e=>{if(!ar(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!zo(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=xa({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Ia=async e=>{if(!ar(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:zo(t)?cr(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Oa=()=>{let e=$(),t=e!==null?St(e.layout):{version:1,automations:[]};return{ok:!0,hostname:C0.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var yA=l(()=>{"use strict";R0()});var Wp=l(()=>{"use strict";te()});var Lp=l(()=>{"use strict";te()});var kp,T0,I0,x0,DK,$K,ss,SA=l(()=>{"use strict";kp=m(require("node:fs")),T0=m(require("node:os")),I0=m(require("node:path"));Wp();Lp();aa();Re();x0=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},DK=e=>I0.default.join(T0.default.homedir(),"Library","LaunchAgents",`${e}.plist`),$K=async e=>kp.default.existsSync(DK(e))?(await Ce(e)).ok:!1,ss=async(e=k())=>{let t=kp.default.existsSync(Ou(e)),r=!kp.default.existsSync(Qt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=ia(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await x0(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${Pe(e)}-wake`;await $K(i)&&s.push(i);for(let c of ee(e))(await Ce(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await x0(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var O0=l(()=>{"use strict";te()});var is,Ma=l(()=>{"use strict";is="connection-health.json"});var Fo,Ep,HK,Na,We,AA,Cp,je,Rp=l(()=>{"use strict";Fo=m(require("node:fs")),Ep=m(require("node:path"));Ma();HK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Na=e=>e.profileEmail===null?Ep.default.join(e.installDir,is):Ep.default.join(e.installDir,"profiles",e.profileEmail,is),We=e=>{let t=Na(e);if(!Fo.default.existsSync(t))return null;try{let r=JSON.parse(Fo.default.readFileSync(t,"utf8"));return!HK(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},AA=e=>{let t=Na(e);Fo.default.existsSync(t)&&Fo.default.rmSync(t,{force:!0})},Cp=(e,t)=>{let r=Na(e),o=We(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Fo.default.mkdirSync(Ep.default.dirname(r),{recursive:!0}),Fo.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},je=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var za,M0=l(()=>{"use strict";Ma();Rp();za=(e,t)=>{if(!t.socketOpen)return!1;let r=We(e);return r===null?!1:!je(r,t.staleAfterMs??12e4,t.nowMs)}});var bA,N0=l(()=>{"use strict";Rp();bA=(e,t)=>!(e!==null&&!je(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var as=l(()=>{"use strict";Rp();M0();N0();Ma()});var PA=l(()=>{"use strict";as();te()});var wA=l(()=>{"use strict";as()});var vA=l(()=>{"use strict";te()});var j0,z0,ja,_A=l(()=>{"use strict";j0=m(require("node:fs"));Ot();Wp();Lp();Re();z0=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},ja=async(e=k())=>{if(!j0.default.existsSync(Qt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await z0())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of ee(e))(await Ce(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await z0();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var D0=l(()=>{"use strict";te()});var $0,Uo,WA,FK,UK,BK,H0,GK,F0,ls,xp=l(()=>{"use strict";$0=require("node:crypto"),Uo=m(require("node:fs")),WA=m(require("node:path"));Re();FK="watchdog-log.ndjson",UK=200,BK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H0=(e=k())=>{let t=N(),r=t.installDir===e?t.logsDir:In({installDir:e,profileEmail:t.profileEmail});return WA.default.join(r,FK)},GK=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!BK(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},F0=(e,t=k())=>{let r={id:(0,$0.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=H0(t);Uo.default.mkdirSync(WA.default.dirname(o),{recursive:!0});let n=Uo.default.existsSync(o)?Uo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-UK+1)),JSON.stringify(r)];return Uo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},ls=(e=20,t=k())=>{let r=H0(t);if(!Uo.default.existsSync(r))return[];let o=Uo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=GK(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var LA,kA,EA,CA=l(()=>{"use strict";He();LA=lo.watchdogReinstallState,kA=900*1e3,EA=3e3});var U0=l(()=>{"use strict";CA()});var B0={};Ct(B0,{verifyAgentWitchReviveAfterKickstart:()=>VK});var qK,VK,G0=l(()=>{"use strict";U0();wA();vA();Re();qK=e=>new Promise(t=>{setTimeout(t,e)}),VK=async e=>{if(await qK(e.verifyDelayMs??EA),!await fo(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),o=We(r);return!je(o,e.staleAfterMs)}});var Da,RA,KK,q0,V0,xA,TA,IA=l(()=>{"use strict";Da=m(require("node:fs")),RA=m(require("node:path"));K();CA();KK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),q0=e=>RA.default.join(e,LA),V0=(e=k())=>{let t=q0(e);if(!Da.default.existsSync(t))return null;try{let r=JSON.parse(Da.default.readFileSync(t,"utf8"));return!KK(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},xA=(e=k(),t=Date.now())=>{let r=V0(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=kA:!0},TA=(e=k(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=q0(e);return Da.default.mkdirSync(RA.default.dirname(o),{recursive:!0}),Da.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var OA,K0=l(()=>{"use strict";te();IA();OA=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!xA())return{attempted:!1,ok:!1,targets:e};TA();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Ce(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var J0=l(()=>{"use strict";IA();K0()});var MA=l(()=>{"use strict";Mt()});var Y0=l(()=>{"use strict";Mt()});var X0,cs,Z0,Q0,ex,JK,YK,tx,XK,ZK,rx,ox=l(()=>{"use strict";X0=require("node:child_process"),cs=m(require("node:fs")),Z0=m(require("node:os")),Q0=m(require("node:path")),ex=require("node:util");MA();Y0();Re();JK=(0,ex.promisify)(X0.execFile),YK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),tx=e=>{let t=pt(e),r=t===null?N():N(t);if(!cs.default.existsSync(r.configPath))return null;try{let o=JSON.parse(cs.default.readFileSync(r.configPath,"utf8"));return!YK(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},XK=e=>tx(e)?.wsUrl??null,ZK=e=>{let t=XK(e);return t!==null?we(t):xe(e)?.appOrigin??null},rx=async e=>{let t=e?.installDir??k(),r=tx(t),o=r!==null?we(r.wsUrl):ZK(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=Q0.default.join(Z0.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{cs.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??pt(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await JK("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{cs.default.existsSync(i)&&cs.default.unlinkSync(i)}}});var nx={};Ct(nx,{attemptAgentWitchWatchdogReinstall:()=>QK});var QK,sx=l(()=>{"use strict";J0();ox();QK=async e=>OA(e,()=>rx())});var ix,ax,lx,e8,t8,r8,$a,NA=l(()=>{"use strict";O0();PA();wA();vA();_A();SA();Wp();Lp();Re();$n();D0();xp();ix=e=>e===null?N():N(e),ax=async(e,t,r)=>{if(!await fo(e))return"not_running";let n=ix(t);if(ft(n))return"healthy";let s=We(n);return je(s,r)?"stale_connection":"healthy"},lx=async e=>{let t=e?.staleAfterMs??12e4,r=k(),o=ee(r);return Promise.all(o.map(async n=>{let s=await ax(n.launchAgentLabel,n.profileEmail,t),i=ix(n.profileEmail),a=We(i),c=await fo(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:je(a,t),needsRevive:s!=="healthy",reason:s}}))},e8=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},t8=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",r8=async e=>{let t=await Ce(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(G0(),B0)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},$a=async e=>{if(!mt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=k();await ss(r),await ja(r);let o=ee(r),n=[];for(let p of o){let g=await ax(p.launchAgentLabel,p.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:g});continue}n.push(await r8({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let p=go();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(sx(),nx)),g=await p(n);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&F0({event:t8(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:e8(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var cx,Tp,dx=l(()=>{"use strict";cx=m(require("node:os"));PA();xp();NA();Tp=async()=>{let e=await lx(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:cx.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:ls(1)[0]??null}}});var zA=l(()=>{"use strict";SA();NA();dx();xp()});var Ha,Fa,Ua,ux=l(()=>{"use strict";te();zA();Ha=async()=>{await ss();let e=ee(),t=[];for(let r of e){let o=await Ce(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=go();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Fa=$a,Ua=$a});var jA=l(()=>{"use strict";ux()});var Op,Ip,px,DA,mx,o8,n8,s8,i8,a8,Mp,gx=l(()=>{"use strict";Op=require("node:child_process"),Ip=m(require("node:fs")),px=m(require("node:os")),DA=m(require("node:path")),mx=require("node:util");te();K();o8=(0,mx.promisify)(Op.execFile),n8=()=>DA.default.join(px.default.homedir(),"Library","LaunchAgents"),s8=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await o8("launchctl",["bootout",r]).catch(()=>{})},i8=e=>{let t=DA.default.join(n8(),`${e}.plist`);Ip.default.existsSync(t)&&Ip.default.unlinkSync(t)},a8=e=>{(0,Op.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Mp=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=k();if(!Ip.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=er(e);for(let r of t)await s8(r),i8(r);return a8(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var fx,Np,hx,ds,yx,l8,c8,d8,$A,u8,HA,Sx=l(()=>{"use strict";fx=require("node:child_process"),Np=m(require("node:fs")),hx=m(require("node:os")),ds=m(require("node:path")),yx=require("node:util");te();l8=(0,yx.promisify)(fx.execFile),c8=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],d8=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],$A=e=>{Np.default.existsSync(e)&&Np.default.rmSync(e,{force:!0})},u8=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await l8("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},HA=async e=>{let r=(e.listLaunchAgentLabels??er)(e.layout.installDir),o=e.launchAgentsDir??ds.default.join(hx.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??u8;for(let i of r)await n(i),$A(ds.default.join(o,`${i}.plist`));let s=ds.default.dirname(e.layout.configPath);for(let i of c8)$A(ds.default.join(s,i));for(let i of d8)$A(ds.default.join(e.layout.installDir,i));return Np.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var FA,Ax=l(()=>{"use strict";FA={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var UA,bx=l(()=>{"use strict";UA="unknown_identity"});var BA=l(()=>{"use strict";Ax();bx()});var p8,GA,Px=l(()=>{"use strict";BA();p8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GA=e=>e.type!=="system.error"||!p8(e.payload)?!1:e.payload.errorCode===UA});var qA=l(()=>{"use strict";gx();Sx();Px()});var zp=l(()=>{"use strict";te();Mt();qA();zA()});var us,jp,Dp=l(()=>{"use strict";zp();us=(e=20)=>ls(e),jp=Tp});var $p,ps,Hp,Fp=l(()=>{"use strict";zp();$p=Eo,ps=(e=20)=>Wo(e),Hp=e=>ko(e)});var Up,VA=l(()=>{"use strict";zp();Up=()=>Mp()});var wx=l(()=>{"use strict";eS();US();yA();jA();Dp();Fp();VA()});var vx={};Ct(vx,{buildAgentWitchAutomationStatusFromWakeServer:()=>Oa,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>$p,buildAgentWitchWakeHealthResponse:()=>ca,buildAgentWitchWakeIdentityResponse:()=>da,buildAgentWitchWatchdogStatus:()=>jp,installHarnessFromWakeServer:()=>wa,readAgentWitchSelfUpdateLogEntries:()=>ps,readAgentWitchWatchdogLogEntries:()=>us,restartAgentWitchFromWakeServer:()=>Ua,reviveAgentWitchWebSocketFromWakeServer:()=>Fa,runAgentWitchSelfUpdateFromWakeServer:()=>Hp,runAgentWitchUninstallLocalFromWakeServer:()=>Up,runAutomationFromWakeServer:()=>Ia,syncAutomationsFromWakeServer:()=>Ta,wakeAgentWitchLaunchAgents:()=>Ha});var _x=l(()=>{"use strict";wx()});var Wx,Lx,KA,JA,kx=l(()=>{"use strict";Wx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),Lx=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?Wx(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?Wx(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},KA=e=>{let t=e.watchdogLogs.map(Lx).join(""),r=e.updateLogs.map(Lx).join("");return`<!doctype html>
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
</html>`},JA=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var Ex,Cx,Rx=l(()=>{"use strict";Ex=m(require("node:net")),Cx=()=>new Promise((e,t)=>{let r=Ex.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var xx,m8,YA,Tx=l(()=>{"use strict";xx=m(require("node:net"));Rx();la();aa();Re();m8=e=>new Promise(t=>{let r=xx.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),YA=async()=>{let e=k(),t=yt();if(await m8(t))return WC(t),t;let r=await Cx();return Mu(e,r),r}});var g8,XA,Ix=l(()=>{"use strict";g8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),XA=e=>({force:g8(e)&&e.force===!0})});var Ba=l(()=>{"use strict";ba();kx();Tx();Ix();zh();lu();Po()});var ZA,j,QA,eb,Ga,Ox=l(()=>{"use strict";ZA=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},QA=e=>{e.writeHead(403),e.end()},eb=e=>e.url?.split("?")[0]??"/",Ga=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var At=l(()=>{"use strict";Ox()});var f8,Mx,Nx=l(()=>{"use strict";yA();At();f8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Mx=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,Oa(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await f8(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=Ta(t);return j(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Ia(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var h8,jx,zx,Dx,tb,$x,rb=l(()=>{"use strict";h8=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],jx=e=>/embed|minilm|^bge-/i.test(e),zx=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),Dx=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),tb=e=>e.filter(t=>t.trim().length>0&&!jx(t)),$x=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!jx(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>zx(s,o));if(n!==void 0)return n}for(let n of h8){let s=r.find(i=>zx(i,n));if(s!==void 0)return s}return r[0]??null}});var ob,Ux,Bx,Bp,Gx,Hx,Fx,y8,S8,A8,b8,P8,w8,bt,qa=l(()=>{"use strict";ob=require("node:child_process"),Ux=m(require("node:fs")),Bx=m(require("node:os")),Bp=m(require("node:path"));Mt();ht();rb();Gx=3e3,Hx=["claude-cli","codex","cursor","antigravity"],Fx={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},y8=(e,t)=>new Promise(r=>{let o=(0,ob.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},Gx);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),S8=()=>{let e=Bx.default.homedir();return["ollama",Bp.default.join(e,".local","bin","ollama"),Bp.default.join(e,".agent-witch","ollama","ollama"),Bp.default.join(e,".local-agent-witch","ollama","ollama")]},A8=e=>new Promise(t=>{let r=(0,ob.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},Gx);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(Dx(Buffer.concat(o).toString("utf8")))})}),b8=async()=>{for(let e of S8()){if(e!=="ollama"&&!Ux.default.existsSync(e))continue;let t=await A8(e);if(t!==null)return t}return[]},P8=e=>{let t=e.installedWriterIds.map(s=>Fx[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=ce(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${Fx[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},w8=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:Hn},bt=async e=>{let t=Hx.map(i=>{let a=bu(i,e.commands);return y8(a.command,a.args)}),[r,...o]=await Promise.all([b8(),...t]),n=Hx.flatMap((i,a)=>o[a]===!0?[i]:[]),s=$x(r,w8());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:P8({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var v8,_8,nb,qx=l(()=>{"use strict";v8="http://127.0.0.1:11434",_8=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},nb=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||v8;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?_8(await o.json()):null}catch{return null}}});var sb=l(()=>{"use strict";ht();qa();qx();rb()});var W8,Vx,Kx=l(()=>{"use strict";sb();W8={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},Vx=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:W8[t]})),ollamaModels:tb(e.ollamaModels)})});var L8,Jx,Yx=l(()=>{"use strict";sb();At();Kx();L8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Jx=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await bt({commands:de({})});return j(e.response,200,{ok:!0,...Vx({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await L8(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await nb({model:r,prompt:o});return n===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var k8,Xx,Zx=l(()=>{"use strict";US();At();k8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Xx=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await k8(e);if(t===null)return!0;let r=wa(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var Qx=l(()=>{"use strict";Dt()});var ib,eT=l(()=>{"use strict";Qx();Pa();ib=e=>{if(!ar(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Ye({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var tT,ab,lb=l(()=>{"use strict";ue();Dt();Pa();tT=e=>{if(!ar(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},ab=async e=>{let t=tT(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Ur("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=$();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Y({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Ye({projectFolderPath:r}),await Ea(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var rT=l(()=>{"use strict";eT();lb()});var oT,nT=l(()=>{"use strict";rT();lb();At();oT=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=ib(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await ab(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,o,r,e.cors.headers),!0}return!1}});var sT,iT=l(()=>{"use strict";Ba();Fp();Dp();sT=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=us(50),r=ps(50);return e.response.writeHead(200,JA()),e.response.end(KA({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var aT,lT=l(()=>{"use strict";eS();At();aT=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,ca(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,da(),e.cors.headers),!0):!1});var cT,dT=l(()=>{"use strict";VA();At();cT=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Up();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var uT,pT=l(()=>{"use strict";jA();At();uT=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Fa();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Ua();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Ha();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var mT,gT=l(()=>{"use strict";Ba();Fp();At();mT=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=$p();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Ga(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:ps(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=XA(t),o=await Hp({force:r});return j(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var fT,hT=l(()=>{"use strict";Dp();At();fT=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await jp();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Ga(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:us(t)},e.cors.headers),!0}return!1}});var yT,ST=l(()=>{"use strict";Nx();Yx();Zx();nT();iT();lT();dT();pT();gT();hT();yT=[aT,sT,fT,uT,mT,cT,Xx,oT,Mx,Jx]});var AT,bT=l(()=>{"use strict";ST();AT=async e=>{for(let t of yT)if(await t(e))return!0;return!1}});var E8,PT,wT=l(()=>{"use strict";ba();At();bT();E8=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:eb(e),readJsonBody:()=>ZA(e)}),PT=async(e,t,r)=>{let o=e.headers.origin,n=up(o);try{if(o!==void 0&&o.length>0&&!n.allowed){QA(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=E8(e,t,r,n);if(await AT(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var vT,Bo,Gp,qp=l(()=>{"use strict";vT=m(require("node:http"));Ba();wT();Bo=async()=>{let e=await YA(),t=vT.default.createServer((r,o)=>{PT(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Gp=Bo});var _T={};Ct(_T,{runAgentWitchBridgeCli:()=>C8});var C8,WT=l(()=>{"use strict";te();qp();C8=async()=>{Ve("agent-witch-bridge");let e=await Bo(),t=rr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var LT=l(()=>{"use strict";Ot()});var ms,cb,kT=l(()=>{"use strict";ms=(e,t,r)=>e===1?t:r,cb=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${ms(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${ms(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${ms(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${ms(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${ms(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${ms(p,"year","years")} ago`}});var Go,db,R8,x8,ub,Br,Va,pb,ET=l(()=>{"use strict";Go=m(require("node:fs")),db=m(require("node:path")),R8="local-ws-traffic.ndjson",x8=500,ub=e=>db.default.join(e.logsDir,R8),Br=(e,t)=>{let r=ub(e);Go.default.mkdirSync(db.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});Go.default.appendFileSync(r,`${o}
`,"utf8")},Va=(e,t=x8)=>{let r=ub(e);if(!Go.default.existsSync(r))return[];let n=Go.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},pb=e=>{let t=ub(e);Go.default.existsSync(t)&&Go.default.writeFileSync(t,"","utf8")}});var T8,CT,RT,xT=l(()=>{"use strict";BA();T8=new Set(Object.values(FA)),CT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),RT=e=>{if(!CT(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!T8.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!CT(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var TT,IT=l(()=>{"use strict";TT=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var I8,O8,M8,Ka,OT=l(()=>{"use strict";IT();I8=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,O8=e=>I8.test(e),M8=e=>TT(e),Ka=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Ka(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&O8(o)){r[o]=M8(n);continue}r[o]=Ka(n)}return r}});var $t,mb,N8,z8,j8,gb,MT,NT,zT,D8,Vp,qo,Kp,fb,jT=l(()=>{"use strict";$t=m(require("node:fs")),mb=m(require("node:path"));xT();OT();N8="local-ws-trace.ndjson",z8=1e4,j8=1440*60*1e3,gb=e=>mb.default.join(e.logsDir,N8),MT=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},NT=e=>{if(!$t.default.existsSync(e))return;let t=$t.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-j8,n=t.filter(s=>{let i=MT(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-z8);$t.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},zT=(e,t)=>{let r=gb(e);$t.default.mkdirSync(mb.default.dirname(r),{recursive:!0}),$t.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),NT(r)},D8=e=>e.parsed===null?{_empty:!0}:Ka(e.parsed),Vp=(e,t,r)=>{let o=RT(r);zT(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:D8(o)})},qo=(e,t)=>{zT(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Ka({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Kp=(e,t=80)=>{let r=gb(e);if(NT(r),!$t.default.existsSync(r))return[];let o=$t.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=MT(s);i!==null&&n.push(i)}return n.reverse()},fb=e=>{let t=gb(e);$t.default.existsSync(t)&&$t.default.writeFileSync(t,"","utf8")}});var Gr,DT,$8,hb,Jp,$T=l(()=>{"use strict";Gr=m(require("node:fs")),DT=m(require("node:path")),$8=256e3,hb=e=>{Gr.default.mkdirSync(DT.default.dirname(e),{recursive:!0}),Gr.default.writeFileSync(e,"","utf8")},Jp=(e,t=$8)=>{if(!Gr.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Gr.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=Gr.default.openSync(e,"r");try{Gr.default.readSync(a,i,0,s,n)}finally{Gr.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var Ja=l(()=>{"use strict";ET();jT();$T()});var yb,Sb,HT=l(()=>{"use strict";yb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Sb=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${yb(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${yb(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
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
    </section>`}});var FT=l(()=>{"use strict";HT()});var Ab,bb=l(()=>{"use strict";Ab=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var Pb=l(()=>{"use strict";Ma()});var wb,vb,UT=l(()=>{"use strict";Pb();wb=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},vb=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var BT=l(()=>{"use strict";bb();UT()});var GT,Ya,_b,Xa=l(()=>{"use strict";bb();GT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ya=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=GT(e),r=GT(Ab(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},_b=`(function () {
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
})();`});var Vo,H8,Wb,qT=l(()=>{"use strict";Vo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H8=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},Wb=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Vo(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Vo(r.direction):Vo(r.kind),i=`trace-body-${o}`,a=Vo(H8(r.body));return`<tr>
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
    </section>`});var Lb,F8,VT,kb,KT=l(()=>{"use strict";Lb=m(require("node:path"));He();Ot();F8=e=>Lb.default.basename(e)===Xt?Ln:Wn,VT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kb=e=>{let t=F8(e.installDir),o=`AW_HOME="$HOME/${Lb.default.basename(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${VT(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${VT(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var JT=l(()=>{"use strict";Xa();qT();KT();Xa()});var U8,dr,Za=l(()=>{"use strict";U8=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),dr=U8});var YT,XT,ZT,QT,eI,tI,rI,gs=l(()=>{"use strict";YT="projects",XT="knowledge",ZT="chunks.ndjson",QT="lessons.ndjson",eI="error-chunks.ndjson",tI="usage-stats.json",rI="knowledge-location.json"});var Yp,B8,Xp,Eb=l(()=>{"use strict";Yp=m(require("node:path"));gs();B8=(e,t)=>{let r=t.trim(),o=Yp.default.join(e.installDir,YT,r,XT);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:Yp.default.join(o,ZT),memoryRunsFilePath:Yp.default.join(o,QT)}},Xp=B8});var Cb,G8,oI,nI=l(()=>{"use strict";Cb=m(require("node:fs"));gs();Oo();G8=e=>{let t=ot(e.projectFolderPath),r=`${t.metaDirPath}/${rI}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};Cb.default.mkdirSync(t.metaDirPath,{recursive:!0}),Cb.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},oI=G8});var fs,iI,sI,q8,aI,lI=l(()=>{"use strict";fs=m(require("node:fs")),iI=m(require("node:path"));Ao();Oo();Eb();nI();sI=(e,t)=>{fs.default.existsSync(e)&&(fs.default.existsSync(t)&&fs.default.statSync(t).size>0||(fs.default.mkdirSync(iI.default.dirname(t),{recursive:!0}),fs.default.copyFileSync(e,t)))},q8=e=>{let t=ot(e.projectFolderPath),r=Xp(e.layout,e.projectId),o=`${t.memoryDirPath}/${On}`;sI(t.ragChunksFilePath,r.ragChunksFilePath),sI(o,r.memoryRunsFilePath),oI({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},aI=q8});var Rb,V8,cI,dI=l(()=>{"use strict";Rb=m(require("node:fs"));Oo();V8=e=>{let t=ot(e);if(!Rb.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(Rb.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},cI=V8});var uI,K8,hs,Zp=l(()=>{"use strict";uI=m(require("node:path"));Ao();Oo();lI();dI();Eb();K8=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=cI(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){aI({layout:e.layout,projectFolderPath:t,projectId:o});let s=Xp(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=ot(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:uI.default.join(n.memoryDirPath,On),projectId:null}},hs=K8});var Qp,Y8,em,xb=l(()=>{"use strict";Qp=m(require("node:fs"));gs();Y8=(e,t=500)=>{if(!Qp.default.existsSync(e))return;let r=Qp.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Qp.default.writeFileSync(e,`${o.join(`
`)}
`)},em=Y8});var tm,X8,Ko,Tb=l(()=>{"use strict";tm=m(require("node:path"));gs();Zp();X8=e=>{let t=hs(e);if(t===null)return null;let r=tm.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:tm.default.join(r,tI),errorChunksFilePath:tm.default.join(r,eI)}},Ko=X8});var mI,Qa,gI,pI,Ib,fI,e4,Ob,hI,Mb,Nb,zb,jb=l(()=>{"use strict";mI=require("node:crypto"),Qa=m(require("node:fs")),gI=m(require("node:path"));Za();gs();Tb();pI=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),Ib=e=>{if(!Qa.default.existsSync(e))return pI();try{let t=JSON.parse(Qa.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return pI()},fI=(e,t)=>{Qa.default.mkdirSync(gI.default.dirname(e),{recursive:!0}),Qa.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},e4=e=>{let t=dr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,mI.createHash)("sha256").update(o).digest("hex").slice(0,16)},Ob=e=>{let t=Ko(e);return t===null?null:Ib(t.usageStatsFilePath)},hI=e=>{if(e.chunkIds.length===0)return;let t=Ko(e);if(t===null)return;let r=Ib(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;fI(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},Mb=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=Ko(e);if(r===null)return null;let o=e4(t),n=Ib(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return fI(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},Nb=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,zb=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var el,yI,t4,r4,SI,o4,Db,tl,ys,$b,Ss,Hb,Fb=l(()=>{"use strict";el=m(require("node:fs")),yI=m(require("node:path"));Za();Zp();xb();jb();t4="http://127.0.0.1:11434",r4="nomic-embed-text",SI=(e,t,r)=>hs({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,o4=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},Db=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},tl=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||t4,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||r4;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},ys=(e,t,r)=>{let o=SI(e,t,r);if(o===null||!el.default.existsSync(o))return[];let n=el.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},$b=async e=>{let t=dr(e.text),r=Db(t);if(r.length===0)return 0;let o=SI(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;el.default.mkdirSync(yI.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await tl(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};el.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return em(o),n},Ss=async e=>{let t=await tl(e.query);if(t===null)return[];let r=e.minScore??0,s=ys(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:o4(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return hI({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},Hb=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var rl,AI,n4,s4,Ub,Bb,Gb,bI=l(()=>{"use strict";rl=m(require("node:fs")),AI=m(require("node:path"));Za();Tb();xb();Fb();n4=e=>{if(!rl.default.existsSync(e))return[];let t=rl.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},s4=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},Ub=async e=>{let t=Ko(e);if(t===null)return 0;let r=dr(e.text),o=Db(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;rl.default.mkdirSync(AI.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await tl(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};rl.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return em(n,200),s},Bb=async e=>{let t=Ko(e);if(t===null)return[];let r=await tl(e.query);if(r===null)return[];let o=e.minScore??.3;return n4(t.errorChunksFilePath).map(s=>({chunk:s,score:s4(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},Gb=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var qb=l(()=>{"use strict";Fb();jb();bI()});var Vb,PI=l(()=>{"use strict";Vb={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var wI=l(()=>{"use strict";PI()});var he,Kb,Jb=l(()=>{"use strict";wI();he=Vb,Kb=`
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
`.trim()});var i4,a4,Yb,vI,Xb,_I=l(()=>{"use strict";Jb();Xa();i4=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,a4=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],Yb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vI=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${i4}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,Xb=e=>{let t=a4.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=Yb(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=Yb(e.installBundleVersionLabel?.trim()??"unknown"),s=vI("brand brand-in-sidebar",n),i=vI("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${Yb(e.title)} \xB7 Agent Witch Local</title>
  <style>${Kb}</style>
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
</html>`}});var rm,ol,om=l(()=>{"use strict";rm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ol=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${rm(e.syncMessage)}</p>`:"",o=rm(e.manageHref),n=rm(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${rm(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var Zb,Qb,eP,WI=l(()=>{"use strict";Zb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,Qb=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,eP=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var LI=l(()=>{"use strict";_I();om();WI()});var As,tP,kI=l(()=>{"use strict";Xa();As=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tP=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${As(e.wakeError)}</div>`:"",a=Ya(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${As(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${As(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${As(o)}</p>
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
        <p class="home-card-meta">${As(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${As(n)}</p>
      </a>
    </div>`}});var EI=l(()=>{"use strict";kI()});var nm,sm,im,CI,rP=l(()=>{"use strict";nm="support-reply",sm="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",im=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),CI=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var am,RI,xI=l(()=>{"use strict";rP();am=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RI=()=>`<section class="card">
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
      <p>POST <span class="mono">/prompt-optimizer/skills/query</span> with JSON <span class="mono">{ "workingDirectory", "query", "limit?" }</span> searches <span class="mono">.cursor/skills/*/SKILL.md</span> in that folder (TF-IDF). Use it before inventing a new skill.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${am(sm)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${am(im)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${am(CI)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${am(nm)}">Run this sample</a>
      </div>
    </section>`});var C,bs=l(()=>{"use strict";C=e=>e==="passed"||e==="stopped"||e==="failed"});var TI,oP,Jo,nP,lm=l(()=>{"use strict";TI="Stopped at the round limit. The best prompt is kept.",oP="Stopped because the score stopped rising. The best prompt is kept.",Jo="Finished. The best prompt is the result.",nP="Wizard ended. Progress from finished steps is kept."});var qr,sP=l(()=>{"use strict";qr=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var l4,c4,nl,II,cm=l(()=>{"use strict";l4=/\n+|;\s+/,c4=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,nl=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(l4).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,c4(s)]},[]);return[...t,...o]},[]),II=e=>{let t=nl(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var se,Ps=l(()=>{"use strict";se=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var sl,iP=l(()=>{"use strict";cm();Ps();sl=e=>{let t=[...e.priorRounds,e.current],r=se(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:II(o)}}});var aP,d4,u4,dm,lP=l(()=>{"use strict";aP={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},d4=e=>{try{let t=JSON.parse(e.fragment);return{...aP,objects:[...e.objects,t]}}catch{return{...aP,objects:e.objects}}},u4=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:d4(r)},dm=e=>[...e].reduce(u4,aP).objects});var p4,cP,m4,OI,dP=l(()=>{"use strict";lP();p4=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},cP=e=>{let t=dm(e).filter(p4),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},m4=(e,t)=>({...e,passed:e.score>=t}),OI=(e,t)=>{let r=cP(e);return r===null?null:m4(r,t)}});var uP,pP,um=l(()=>{"use strict";uP="The judge reply needs a score and a reason.",pP="The improver reply was empty."});var MI,NI=l(()=>{"use strict";MI=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var zI,jI=l(()=>{"use strict";zI=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var f4,DI,$I=l(()=>{"use strict";NI();jI();lm();cm();f4=e=>{let t=nl(e);return t.length===0?oP:`${oP} Avoid: ${t.join("; ")}.`},DI=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:TI};if(MI(e.scores)>=3){let t=e.scores.map((r,o)=>({score:r,reasons:e.reasons?.[o]??""}));return{type:"stopped",errorMessage:f4(zI(t))}}return null}});var Vr,h4,Yo,HI,pm=l(()=>{"use strict";Vr=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},h4=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,Yo=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",h4(e.tokens),`Delay: ${Vr(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},HI=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var y4,FI,UI=l(()=>{"use strict";dP();y4=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,FI=e=>{let r=(y4.exec(e)?.[1]??e).trim();return r.length===0||cP(r)!==null?null:r}});var BI,mm,GI=l(()=>{"use strict";pm();UI();um();BI=e=>({type:"call",role:"judge",choice:e.choice,prompt:HI({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),mm=e=>{let t=FI(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:pP}}:{nextPrompt:t,continuation:BI({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var mP,qI=l(()=>{"use strict";sP();iP();dP();um();lm();$I();um();GI();mP=e=>{let t=OI(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:uP}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=DI({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10});if(s!==null)return{verdict:t,continuation:s};let i=sl({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:qr({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var il,gP=l(()=>{"use strict";il=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var VI=l(()=>{"use strict"});var KI=l(()=>{"use strict";VI()});var Xo,JI=l(()=>{"use strict";Xo=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var S4,fP,YI=l(()=>{"use strict";pm();S4=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,fP=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",S4(e.tokens),`Delay: ${Vr(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var A4,b4,P4,hP,XI=l(()=>{"use strict";A4=/[A-Za-z0-9_./~-]{3,180}/g,b4=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,P4=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||b4.test(t)},hP=(e,t=12)=>{let r=[];for(let o of e.matchAll(A4)){let n=o[0].replace(/\.+$/,"");if(!(!P4(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var al,ZI=l(()=>{"use strict";al=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var gm,yP,QI,ll,SP=l(()=>{"use strict";gm=e=>Math.floor(e/2),yP=e=>Math.max(gm(e)+1,e-20),QI=(e,t)=>e>=t?"passes":e>=yP(t)?"close":e>=gm(t)?"weak":"bad",ll=e=>[{band:"bad",label:`0\u2013${gm(e)-1} bad`},{band:"weak",label:`${gm(e)}\u2013${yP(e)-1} weak`},{band:"close",label:`${yP(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var fm,AP=l(()=>{"use strict";SP();fm=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${QI(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var Pt,bP=l(()=>{"use strict";Pt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var eO,tO=l(()=>{"use strict";eO=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var w4,v4,rO,oO=l(()=>{"use strict";bs();AP();bP();tO();w4=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],v4=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",rO=e=>{let t=e.wizard;if(t===void 0)return[];let r=Pt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=w4.map((h,y)=>{let u=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:h,state:u,detail:null}}).filter((h,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=fm(e),d=c.filter(h=>h.id==="round-0"),p=eO(t)&&(!n||a)?c.filter(h=>h.id!=="round-0"):[],g=C(e.status)&&!s,A=g?[{id:"end",label:v4(e),state:"done",detail:e.errorMessage}]:[];if(g&&A.length>0){let h=Math.min(r,i.length),y=i.slice(0,h).map(u=>({...u,state:"done"}));return[...d,...y,...A,...p]}return[...d,...i,...p,...A]}});var _4,PP,nO=l(()=>{"use strict";bs();AP();oO();_4=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",PP=e=>{if(e.wizard!==void 0)return rO(e);let t=fm(e),r=C(e.status)?[{id:"end",label:_4(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var cl,sO=l(()=>{"use strict";cl=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var iO=l(()=>{"use strict";Ot()});var aO,dl,ul,vs,hm,wP,lO=l(()=>{"use strict";iO();aO="/prompt-optimizer/agent",dl=`${or}${aO}`,ul=`${or}/prompt-optimizer`,vs="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",hm=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${vs}`,wP="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var ur=l(()=>{"use strict"});var re,pl=l(()=>{"use strict";ur();re=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var vP,cO=l(()=>{"use strict";vP="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var dO,uO=l(()=>{"use strict";dO=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var ml,mO=l(()=>{"use strict";uO();ur();ml=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:dO(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null})});var _P,gO=l(()=>{"use strict";ur();_P=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null})});var WP,fO=l(()=>{"use strict";ur();WP=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var hO,gl,yO=l(()=>{"use strict";hO=["generalize","evaluate","separate","optimize_modules"],gl=(e,t)=>{let r=hO.indexOf(t);if(r===-1)return e;let o=hO.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var ym,LP=l(()=>{"use strict";cm();ym=e=>{let t=nl(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var fl,SO=l(()=>{"use strict";LP();fl=e=>{let t=ym(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var L4,k4,E4,AO,bO=l(()=>{"use strict";L4=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),k4=/^\{\{[a-zA-Z0-9_-]+\}\}$/,E4=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(L4(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},AO=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>k4.test(n)?n:E4(n,r)).join("")}});var kP,PO=l(()=>{"use strict";bO();kP=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:AO(o.prompt,t)}))}))});var C4,hl,wO=l(()=>{"use strict";ur();LP();C4=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),hl=e=>{let t=ym(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=C4(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var yl,vO=l(()=>{"use strict";gP();yl=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return il({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Sl,CP=l(()=>{"use strict";Ps();Sl=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var RP,_O=l(()=>{"use strict";CP();RP=e=>{let t=Sl({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Zo,WO=l(()=>{"use strict";Zo=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var R4,x4,oe,Sm=l(()=>{"use strict";pl();R4=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},x4=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,oe=e=>{let t=re(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:R4(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>x4(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var LO,kO=l(()=>{"use strict";pl();Sm();LO=e=>{let t=oe(e.wizard),r=re(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var xP,EO=l(()=>{"use strict";kO();xP=e=>{let t=LO({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var T4,CO,RO=l(()=>{"use strict";T4=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},CO=e=>[...e].reduce(T4,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var I4,xO,TO=l(()=>{"use strict";I4=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},xO=e=>[...e].reduce(I4,{out:"",inString:!1,escaped:!1}).out});var O4,M4,IO,OO=l(()=>{"use strict";RO();TO();O4=e=>e.charCodeAt(0)===65279?e.slice(1):e,M4=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},IO=e=>xO(CO(M4(O4(e))))});var N4,z4,j4,MO,D4,_s,Am=l(()=>{"use strict";lP();OO();N4=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},z4=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},j4=e=>[...e].reduce(z4,{out:"",inString:!1,escaped:!1}).out,MO=e=>{let t=dm(e);return t.length===0?null:t[t.length-1]},D4=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},_s=e=>{let t=IO(N4(e)),r=MO(t);if(r!==null)return r;let o=j4(t),n=MO(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw D4(i)}}});var $4,H4,TP,NO,zO=l(()=>{"use strict";$4=/^[a-z0-9][a-z0-9-]{0,62}$/,H4=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return $4.test(t)?t:""},TP=e=>e.replace(/\s+/gu," ").trim(),NO=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=H4(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=TP(n.name),a=TP(n.description),c=TP(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var jO,DO,$O=l(()=>{"use strict";jO=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},DO=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var IP,HO=l(()=>{"use strict";Am();zO();$O();IP=(e,t)=>{let r=(()=>{try{return _s(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(jO(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(DO).filter(a=>a!==null),i=NO({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var OP,FO=l(()=>{"use strict";OP=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var MP,UO=l(()=>{"use strict";MP=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var NP,BO=l(()=>{"use strict";pl();Sm();NP=e=>{let t=oe(e.wizard),r=re(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var zP,GO=l(()=>{"use strict";zP=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var wt,F4,jP,qO=l(()=>{"use strict";wt=m(bi());Am();F4=(0,wt.isType)({name:wt.isNonEmptyString,description:wt.isString,sampleValue:wt.isString}),jP=e=>{let t=_s(e);if(!(0,wt.isType)({templatedPrompt:wt.isNonEmptyString,variables:(0,wt.isArrayWithEachItem)(F4)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var ie,U4,B4,DP,VO=l(()=>{"use strict";ie=m(bi());ur();Am();U4=(0,ie.isType)({id:ie.isNonEmptyString,title:ie.isNonEmptyString,prompt:ie.isNonEmptyString,order:ie.isNumber}),B4=(0,ie.isType)({id:ie.isNonEmptyString,title:ie.isNonEmptyString,summary:ie.isString,topology:(0,ie.isOneOf)("chain","parallel"),modules:(0,ie.isArrayWithEachItem)(U4),recommended:ie.isBoolean}),DP=e=>{let t=_s(e);if(!(0,ie.isType)({options:(0,ie.isArrayWithEachItem)(B4)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Ws,KO=l(()=>{"use strict";Ws=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var G4,$P,HP=l(()=>{"use strict";G4=/\{\{([a-zA-Z0-9_-]+)\}\}/g,$P=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(G4,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var vt,_t,JO=l(()=>{"use strict";Ps();HP();vt=e=>$P(e.templatedPrompt,e.variables),_t=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return se(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??vt(e.wizard)}});var q4,Qo,YO=l(()=>{"use strict";q4=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Qo=(e,t)=>e.replace(q4,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var V4,en,bm=l(()=>{"use strict";V4=/\{\{([a-zA-Z0-9_-]+)\}\}/g,en=e=>{let t=new Set,r=[];for(let o of e.matchAll(V4)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Al,XO=l(()=>{"use strict";bm();Al=e=>e.variables.length>0||en(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var FP,UP=l(()=>{"use strict";ur();FP=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var bl,ZO=l(()=>{"use strict";Ps();UP();bl=e=>{let t=e.wizard.evaluateSelectedRound??se(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:FP(r.judgement,e.passScore)}});var Pl,QO=l(()=>{"use strict";Pl=e=>e.length===1&&e[0].modules.length===1});var BP,eM=l(()=>{"use strict";BP=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var ye,Pm,wl=l(()=>{"use strict";ye=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),Pm=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var tM,rM=l(()=>{"use strict";wl();tM=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[ye("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),ye("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[ye("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var oM,nM=l(()=>{"use strict";bs();wl();oM=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!C(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[ye("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),ye("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),ye("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",Pm(e.writerLabel,e.folder)),ye("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[ye("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var sM,iM=l(()=>{"use strict";wl();sM=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[ye("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),ye("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[ye("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var aM,lM=l(()=>{"use strict";wl();aM=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[ye("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),ye("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",Pm(e.writerLabel,e.folder)),...r?[ye("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var wm,cM=l(()=>{"use strict";bs();rM();nM();iM();lM();wm=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(C(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return oM(r);case"evaluate":return tM({...r,currentRound:e.currentRound});case"separate":return aM(r);case"optimize_modules":return sM({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var vl,mr,dM=l(()=>{"use strict";vl=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),mr=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var K4,vm,GP,uM=l(()=>{"use strict";bm();K4="wizardParam_",vm=e=>`${K4}${e}`,GP=e=>{let t=en(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=vm(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var Ze,pM=l(()=>{"use strict";Ze=["generalize","evaluate","separate","optimize_modules"]});var R=l(()=>{"use strict";bs();lm();qI();sP();pm();gP();KI();JI();YI();XI();iP();ZI();Ps();nO();bP();SP();sO();lO();ur();pl();cO();mO();gO();fO();yO();SO();PO();wO();vO();CP();_O();WO();Sm();EO();HO();FO();UO();BO();GO();qO();VO();KO();JO();HP();YO();bm();XO();ZO();QO();UP();eM();cM();dM();uM();pM()});var qP,Wm,J4,fM,hM=l(()=>{"use strict";qP=m(require("node:fs")),Wm=m(require("node:path")),J4=e=>Wm.default.join(Wm.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),fM=(e,t)=>{let r=J4(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;qP.default.mkdirSync(Wm.default.dirname(r),{recursive:!0}),qP.default.appendFileSync(r,o,"utf8")}});var Ls,yM,Y4,SM,X4,AM,Ht,J,bM,D,Qe=l(()=>{"use strict";Ls=m(require("node:fs")),yM=m(require("node:path"));R();hM();Y4=e=>e.wizard===void 0?e:{...e,wizard:_P(e.wizard)},SM=new Set,X4=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),AM=(e,t)=>{Ls.default.mkdirSync(yM.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;Ls.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),Ls.default.renameSync(r,e)},Ht=e=>{if(!Ls.default.existsSync(e))return[];try{let t=JSON.parse(Ls.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(X4).map(Y4):[]}catch{return[]}},J=(e,t)=>Ht(e).find(r=>r.id===t)??null,bM=(e,t)=>{SM.add(t);let r=Ht(e).filter(o=>o.id!==t);AM(e,r)},D=(e,t)=>{if(SM.has(t.id))return;let r=Ht(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];AM(e,o),fM(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var PM,Lm,VP,rn,KP,et,gr,ae,De=l(()=>{"use strict";PM=m(require("node:fs")),Lm=m(require("node:os")),VP=m(require("node:path"));Qn();rn="~",KP=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,et=e=>{let t=Lm.default.homedir(),r=KP(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},gr=e=>{let t=e.trim().length===0?"~":e.trim(),r=rt(t),o=VP.default.isAbsolute(r)?KP(r):KP(VP.default.resolve(Lm.default.homedir(),r));try{if(!PM.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:et(o)}},ae=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Lm.default.homedir()});var JP=l(()=>{"use strict";Ji()});var Z4,wM,vM=l(()=>{"use strict";JP();Z4=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,wM=e=>{let t=Co(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(Z4)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var Q4,e3,_M,km,WM,t3,nt,LM,kM,EM,Kr=l(()=>{"use strict";JP();vM();Q4="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",e3="The writer waited on terminal input and did not return a prompt.",_M=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,km=e=>{let t=e.trim();if(t.length===0||t.length>=500||!_M.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>_M.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},WM=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},t3=e=>km(e.stdout)??km(e.stderr)??(WM(e.replyFile)?km(e.replyFile):null),nt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return Q4;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?e3:null},LM=e=>{let t=e.trim();return t.length===0?null:nt(t)!==null?t:km(t)??(WM(t)?t:null)},kM=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],EM=e=>{let t=e.replyFileText?.trim()??"",r=nt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=t3({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null)return{ok:!1,errorMessage:o};let n=wM([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Co(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply."}}});var ks,Ft,_l,CM,Em,r3,RM,xM,TM,YP=l(()=>{"use strict";ks=m(require("node:fs")),Ft=m(require("node:path")),_l=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},CM=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Em=(e,t)=>{let r=_l(e);return r.length>0?r:_l(t)},r3=e=>{let t=Em(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${CM(o)}`,...n.length>0?[`description: ${CM(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},RM=e=>`.cursor/skills/${e}/SKILL.md`,xM=(e,t)=>{let r=_l(t);if(r.length===0)return!1;let o=Ft.default.resolve(e),n=Ft.default.resolve(o,".cursor","skills"),s=Ft.default.resolve(o,RM(r));return s.startsWith(`${n}${Ft.default.sep}`)?ks.default.existsSync(s):!1},TM=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Em(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Ft.default.resolve(e.workingDirectory);try{if(!ks.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=r3({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=RM(r.slug),n=Ft.default.resolve(t,".cursor","skills"),s=Ft.default.resolve(t,o);if(!s.startsWith(`${n}${Ft.default.sep}`))return{ok:!1,errorCode:"path"};if(ks.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{ks.default.mkdirSync(Ft.default.dirname(s),{recursive:!0}),ks.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var o3,IM,OM,MM=l(()=>{"use strict";R();R();Qe();De();Kr();YP();o3=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,IM=e=>{let t=e.get("savedSkill");return t!==null&&o3.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},OM=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=J(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!C(r.status))return{kind:"redirect",location:o("skillError=working")};let n=se(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||nt(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=TM({workingDirectory:ae(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var Jr,Wl=l(()=>{"use strict";R();Jr=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=BP(t);return{...e,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:vl(r.variables)},updatedAt:new Date().toISOString()}}});var Yr,Ll=l(()=>{"use strict";Yr=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var T,n3,Cm,ne,on,zM,NM,jM,DM,Se=l(()=>{"use strict";T="manual",n3=["claude-cli","codex","cursor","antigravity"],Cm={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ne=e=>e===T?"You":e in Cm?Cm[e]:e,on=e=>n3.filter(t=>e.includes(t)),zM=e=>{let t=on(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},NM=(e,t)=>t===T?T:e.find(r=>r===t)??null,jM=(e,t,r)=>{let o=on(e),n=NM(o,t),s=NM(o,r);return n===null||s===null?null:{judge:n,improver:s}},DM=(e,t,r)=>{let o=on(e);return t===null||t.trim()===""?r!==T?r:o[0]??null:t===T?null:o.find(n=>n===t)??null}});var XP=l(()=>{"use strict";ht();qa();Ji()});var ZP,$M,HM=l(()=>{"use strict";ZP={ok:!1,errorMessage:"Stopped.",stopped:!0},$M=(e,t,r)=>{if(t===void 0)return;let o=()=>{e.kill("SIGTERM"),r(ZP)};if(t.aborted){o();return}t.addEventListener("abort",o,{once:!0})}});var FM,kl,UM,QP,s3,ew,BM,i3,a3,l3,El,GM,c3,d3,Ue,nn=l(()=>{"use strict";FM=require("node:child_process"),kl=m(require("node:fs")),UM=m(require("node:os")),QP=m(require("node:path"));XP();HM();Kr();s3=["claude-cli","codex","cursor","antigravity"],ew=18e4,BM=6e5,i3="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",a3="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",l3=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},El=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?l3(process.env[a3])??BM:ew,GM=e=>`The writer timed out after ${e}ms.`,c3=e=>s3.includes(e),d3=e=>e===!0||process.env[i3]==="1",Ue=e=>new Promise(t=>{if(e.signal?.aborted){t(ZP);return}if(d3(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!c3(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=Nt(r,e.prompt,de({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!kl.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:ew,s=QP.default.join(kl.default.mkdtempSync(QP.default.join(UM.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=kM({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,timer:void 0},p=(0,FM.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),g=A=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(A))};$M(p,e.signal,g),d.timer=setTimeout(()=>{p.kill("SIGTERM"),g({ok:!1,errorMessage:GM(n)})},n),p.stdout.on("data",A=>{a.push(Buffer.from(A))}),p.stderr.on("data",A=>{c.push(Buffer.from(A))}),p.on("error",()=>g({ok:!1,errorMessage:"The writer failed to start."})),p.on("close",()=>{let A=kl.default.existsSync(s)?kl.default.readFileSync(s,"utf8"):null;g(EM({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:A}))})})});var qM,u3,Cl,Rm,xm=l(()=>{"use strict";R();Se();qM=e=>e===T?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},u3=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Cl=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=mP({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:qM(e.improverModel),round:e.currentRound,maxRounds:e.maxRounds,priorRounds:al(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=u3(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?{...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}:{...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i}},Rm=(e,t,r=null)=>{let o=mm({raw:t,judge:qM(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Tm,tw=l(()=>{"use strict";Tm=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var JM,Im,Om,VM,KM,rw,p3,YM,ow,m3,XM,g3,f3,ZM,QM=l(()=>{"use strict";JM=require("node:child_process"),Im=m(require("node:fs")),Om=m(require("node:path"));R();VM=4e3,KM=12e3,rw=(e,t)=>{let r=(0,JM.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},p3=e=>rw(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",YM=e=>{let t=rw(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},ow=(e,t)=>{let r=Om.default.resolve(e,t),o=Om.default.relative(e,r);if(o.startsWith("..")||Om.default.isAbsolute(o)||!Im.default.existsSync(r)||!Im.default.statSync(r).isFile())return null;let n=Im.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>VM?`${n.slice(0,VM)}
\u2026truncated`:n},m3=e=>e.length>KM?`${e.slice(0,KM)}
\u2026truncated`:e,XM=e=>{let t=hP(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,ow(e.workingDirectory,n)])),o=p3(e.workingDirectory);return{git:o,status:o?YM(e.workingDirectory):{},files:r,paths:t}},g3=(e,t)=>{let r=rw(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=ow(e,t);return o===null?`${t} is missing.`:o},f3=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",ZM=e=>{let t=e.before.git?YM(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=ow(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>g3(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:f3(e.before.git,e.before.paths.length>0),evidence:m3(i.join(`

`))}}});var iw,U,aw,ke,eN,h3,y3,tN,Es,rN,Cs,S3,A3,Rl,nw,sw,b3,oN,P3,w3,v3,nN,_3,sN,iN,W3,L3,aN,lN=l(()=>{"use strict";iw=require("node:child_process"),U=m(require("node:fs")),aw=m(require("node:os")),ke=m(require("node:path")),eN=8e6,h3=16e6,y3=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],tN=(e,t)=>{let r=(0,iw.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Es=(e,t)=>(0,iw.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,rN=e=>{let t=tN(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},Cs=(e,t)=>{let r=ke.default.resolve(e,t),o=ke.default.relative(e,r);return o.startsWith("..")||ke.default.isAbsolute(o)?null:r},S3=(e,t)=>{let r=Cs(e,t);if(r===null||!U.default.existsSync(r))return null;let o=U.default.statSync(r);return!o.isFile()||o.size>eN?null:U.default.readFileSync(r)},A3=(e,t,r)=>{let o=Cs(e,t);o!==null&&(U.default.mkdirSync(ke.default.dirname(o),{recursive:!0}),U.default.writeFileSync(o,r))},Rl=(e,t)=>{let r=Cs(e,t);r===null||!U.default.existsSync(r)||U.default.rmSync(r,{recursive:!0,force:!0})},nw=(e,t)=>Es(e,["cat-file","-e",`HEAD:${t}`]),sw=e=>{let t=tN(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},b3=e=>ke.default.resolve(e)!==ke.default.resolve(aw.default.homedir()),oN=e=>{if(!U.default.existsSync(e))return 0;let t=U.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?U.default.readdirSync(e).reduce((r,o)=>r+oN(ke.default.join(e,o)),0):0},P3=(e,t,r)=>{let o=Cs(e,r);if(o===null||!U.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(oN(o)>h3)return{relativePath:r,existed:!0,copyDir:null};let n=ke.default.join(t,"cache",r);return U.default.mkdirSync(ke.default.dirname(n),{recursive:!0}),U.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},w3=400,v3=32e6,nN=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!U.default.existsSync(s)))for(let i of U.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=ke.default.join(s,i),c=U.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>eN)){if(t.length>=w3||r+c.size>v3){o=!1;return}r+=c.size,t.push(ke.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},_3=(e,t,r)=>{let o=Cs(e,r);if(o===null||!U.default.existsSync(o))return null;let n=S3(e,r);if(n===null)return"skip";let s=ke.default.join(t,"files",r);return U.default.mkdirSync(ke.default.dirname(s),{recursive:!0}),U.default.writeFileSync(s,n),s},sN=e=>{let t=U.default.mkdtempSync(ke.default.join(aw.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?rN(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:nN(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,_3(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?sw(e.workingDirectory):null,isolateCaches:b3(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:y3.map(i=>P3(e.workingDirectory,t,i))}},iN=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Rl(e.workingDirectory,t);return}A3(e.workingDirectory,t,U.default.readFileSync(r))}},W3=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?iN(e,t):nw(e.workingDirectory,t)?Es(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Rl(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&nw(e.workingDirectory,t)&&Es(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!nw(e.workingDirectory,t)&&Es(e.workingDirectory,["reset","-q","HEAD","--",t])},L3=(e,t)=>{let r=Cs(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Rl(e.workingDirectory,t.relativePath),U.default.mkdirSync(ke.default.dirname(r),{recursive:!0}),U.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Rl(e.workingDirectory,t.relativePath);return}if(U.default.existsSync(r))for(let o of U.default.readdirSync(r)){let n=ke.default.join(r,o);U.default.statSync(n).mtimeMs>=e.startedMs-1e3&&U.default.rmSync(n,{recursive:!0,force:!0})}}}},aN=e=>{try{if(e.git){if(sw(e.workingDirectory)!==e.head&&(!(e.head===null?Es(e.workingDirectory,["update-ref","-d","HEAD"]):Es(e.workingDirectory,["reset","--hard",e.head]))||sw(e.workingDirectory)!==e.head))throw new Error("head");let r=rN(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))W3(e,o)}else{if(e.complete)for(let t of nN(e.workingDirectory).paths)e.files[t]===void 0&&Rl(e.workingDirectory,t);for(let t of Object.keys(e.files))iN(e,t)}for(let t of e.caches)L3(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{U.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Mm,Nm,k3,E3,C3,R3,x3,cN,T3,dN,uN=l(()=>{"use strict";R();xm();tw();QM();lN();Se();De();nn();Mm=(e,t)=>({...e,status:"failed",errorMessage:t,judgePhase:void 0,updatedAt:new Date().toISOString()}),Nm=e=>({...e,status:"stopped",errorMessage:Jo,judgePhase:void 0,updatedAt:new Date().toISOString()}),k3=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),E3=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==T?t:e.improverModel!==T?e.improverModel:null}return e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null},C3=async e=>{let t=ae(e.cycle),r=XM({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=sN({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?yl({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Zo(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):il({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=await Ue({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:El({isModuleRun:i})}),c=a.ok?ZM({workingDirectory:t,before:r,writerReply:a.text}):null,d=aN(o);return a.ok?!d.ok||c===null?{ok:!1,cycle:Mm(e.cycle,d.ok?"Could not put the folder back after the run.":d.errorMessage)}:{ok:!0,run:{output:a.text.trim(),tokens:a.tokens,delayMs:Date.now()-n,lookedAt:c.lookedAt,evidence:c.evidence}}:a.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Nm(e.cycle)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Mm(e.cycle,a.errorMessage)})},R3=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run}:e.runner===null?null:C3({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),x3=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),cN=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Ue({writerAgent:e.reviewer,workingDirectory:ae(e.cycle),prompt:fP({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Nm(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},T3=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===T)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Ue({writerAgent:t.judgeModel,workingDirectory:ae(t),prompt:Xo({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Cl(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?Nm(o):(e.onWriterFailure?.(t.judgeModel),Mm(o,n.errorMessage))},dN=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return T3(e);let o=E3(t),n=await R3({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?k3(t,n.run):t;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===T){let p=await cN({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...x3(s,p.text),judgePhase:void 0}}let i=await Ue({writerAgent:t.judgeModel,workingDirectory:ae(t),prompt:Yo({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Nm(s):(e.onWriterFailure?.(t.judgeModel),Mm(s,i.errorMessage));let a=await cN({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Cl(s,i.text,c);return Tm(d,a.text)}});var sn,zm=l(()=>{"use strict";R();sn=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:sl({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:al(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var jm,I3,O3,lw,pN=l(()=>{"use strict";R();xm();uN();zm();Se();De();nn();jm=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),I3=e=>({...e,status:"stopped",errorMessage:Jo,updatedAt:new Date().toISOString()}),O3=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?I3(e):(n?.(r),jm(e,t.errorMessage)),lw=async(e,t,r,o)=>{let n=e.revisions.find(c=>c.roundNumber===e.currentRound);if(n===void 0)return jm(e,"This round has no prompt.");if(e.status==="judging")return dN({cycle:e,revision:n,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return jm(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===T)return e;let s=sn(e);if(s===null)return jm(e,"The improver needs the score and the reason.");let i=await Ue({writerAgent:e.improverModel,workingDirectory:ae(e),prompt:qr({goal:e.goal,promptText:s.promptText,score:s.score,reasons:s.reasons,avoid:s.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:El()}),a=O3(e,i,e.improverModel,r,t);return a!==null?a:Rm(e,i.ok?i.text:"",i.ok?i.tokens:null)}});var xl,cw=l(()=>{"use strict";xl=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var Hm,Dm,mN,M3,N3,$m,gN,fN,z3,j3,an,hN,yN,Tl=l(()=>{"use strict";R();Wl();Ll();Se();De();nn();pN();cw();Hm=(e,t)=>({...e,status:"failed",errorMessage:t,updatedAt:new Date().toISOString()}),Dm=(e,t,r)=>e.wizard===void 0||t===null?Hm(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},mN=e=>{let t=e.wizard;return t===void 0||xl(e).length===0?e:{...e,wizard:Ws({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},M3=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",N3=e=>{let t=e.wizard;if(t===void 0)return e;let r=Sl({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Ws({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},$m=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),gN=e=>e.judgeModel!==T?e.judgeModel:e.improverModel!==T?e.improverModel:null,fN=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},z3=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=gN(e);if(n===null)return Hm(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??vt(o),i=fl({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:fN(e,"generalize")}),a=await Ue({writerAgent:n,prompt:i,workingDirectory:ae(e),signal:t});if(!a.ok)return r?.(n),Dm(e,"generalize",a.errorMessage);try{let c=jP(a.text),d=Ws({wizard:{...o,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:vl(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return Al(d)?an({...p,wizard:{...d,gate:null}}):$m(p,"generalize")}catch(c){return Dm(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},j3=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=gN(e);if(n===null)return Hm(e,"Choose a writer to suggest splits.");let s=_t({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=hl({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:fN(e,"separate")}),a=await Ue({writerAgent:n,prompt:i,workingDirectory:ae(e),signal:t});if(!a.ok)return r?.(n),Dm(e,"separate",a.errorMessage);try{let c=DP(a.text),d=kP(c,o.variables),p=Ws({wizard:{...o,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:p};return Pl(d)?Jr(g,d[0]):$m(g,"separate")}catch(c){return Dm(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},an=e=>{let t=e.wizard;if(t===void 0)return e;let r=vt(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},hN=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Hm(e,"This module is missing.");let n=mr(r),s=Qo(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==T?e.runnerModel:e.judgeModel!==T?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:re(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},yN=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return lw(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return z3(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return j3(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await lw(e,t,r,o);if(C(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&xl(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=se(s.revisions.map(A=>({roundNumber:A.roundNumber,promptText:A.promptText,score:A.judgement?.score??0,reasons:A.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&bl({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let p=mN($m(a,i));return Yr(p)}let c=$m(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=RP({wizard:{...c.wizard,modules:c.wizard.modules.map((g,A)=>A===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:M3(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?mN(d):N3(d)}return s}return n.phase==="complete",e}});var Rs,Fm=l(()=>{"use strict";R();Se();Rs=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:OP(r,e.judgeModel===T),updatedAt:new Date().toISOString()}}});var SN,xs,Um=l(()=>{"use strict";Kr();SN=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:LM(e.promptText)},xs=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t===void 0?null:SN(t);if(r!==null)return r.trim();for(let o=e.revisions.length-1;o>=0;o-=1){let n=SN(e.revisions[o]);if(n!==null)return n.trim()}return null}});var Ut,Ts=l(()=>{"use strict";Ut='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var dw,AN,D3,bN,PN,uw=l(()=>{"use strict";R();Se();De();Ts();dw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AN=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',D3=e=>{let t=AN(e.state),r=`<h2>${dw(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${dw(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Ut}</button></div><template>${r}</template></li>`},bN=e=>{let t=e.wizard;if(t===void 0)return"";let r=wm({status:e.status,wizard:t,writerLabel:ne(e.judgeModel),runnerLabel:ne(e.runnerModel??e.judgeModel),folderDisplay:et(ae(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(D3).join("")}</ol>`},PN=e=>{let t=e.wizard;if(t===void 0)return"";let r=wm({status:e.status,wizard:t,writerLabel:ne(e.judgeModel),runnerLabel:ne(e.runnerModel??e.judgeModel),folderDisplay:et(ae(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${AN(n.state)}<span class="sdlc-pipeline-label">${dw(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var Wt,wN,vN,_N,pw=l(()=>{"use strict";R();Wt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wN="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",vN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Wt(wN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${Wt(i.name)}}}</strong> \u2014 ${Wt(i.description)} (sample: ${Wt(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Wt(r)}</pre>`,n=vt(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Wt(n)}</pre>`;return`${t}${o}${s}`},_N=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Wt(wN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${Wt(n.name)}}}</strong> \u2014 ${Wt(n.description)} (sample: ${Wt(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${Wt(r)}</pre>`;return`${t}${o}`}});var WN,LN=l(()=>{"use strict";R();WN=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=Xo({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=Yo({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var mw,Bm,gw=l(()=>{"use strict";Ts();LN();mw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bm=e=>{let t=WN(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${mw(r)}">${Ut}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${mw(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${mw(t)}</pre></template>`}});var Gm,Is,fw=l(()=>{"use strict";cw();gw();Gm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Is=e=>{let t=xl(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${Gm(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,p=e.cycle.revisions.map(g=>{let A=g.judgement?.score,h=A==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${A}`,y=g.judgement?.reasons?.trim()??"",u=y.length===0?"":`<br><span class="muted">${Gm(y)}</span>`,S=Bm({cycle:e.cycle,roundNumber:g.roundNumber,promptText:g.promptText,run:g.run});if(e.interactive){let b=e.selectedRound===g.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${b}> <span class="sdlc-wizard-revision-title">${Gm(h)}</span></label>${S}${u}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Gm(h)}</span>${S}${u}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var hw,kN,EN,CN,yw=l(()=>{"use strict";hw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kN=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${hw(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${hw(t.prompt)}</pre></li>`).join("")}</ol>`,EN=e=>kN([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),CN=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${hw(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${kN(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Il,$3,qm,Sw=l(()=>{"use strict";R();yw();Il=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$3=e=>{let t=e.wizard;return t===void 0?"":_t({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},qm=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=$3(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Il(n.orchestratorSkill.fileName)}</code> \u2014 ${Il(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${Il(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=EN(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${Il(r)} <span class="muted">${Il(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Oe,H3,F3,U3,B3,Vm,G3,q3,V3,K3,J3,Y3,Os,Km=l(()=>{"use strict";R();uw();pw();fw();gw();Sw();Oe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H3={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},F3=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Oe(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Oe(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Oe(o)}</pre></details>`;return`<h2>${Oe(e)}</h2>${n}`},U3=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=vt(t).trim(),n=_t({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!C(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${F3("What is being evaluated",i)}`},B3=(e,t)=>{let r=e.wizard;if(r===void 0||C(e.status))return"";let o=H3[t];return o===void 0||r.phase!==o?"":PN(e)},Vm=(e,t,r)=>{let o=B3(e,t),n=t==="wizard-2"?U3(e):"";return`${o}${n}${r}`},G3=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},q3=e=>{let t=e.wizard;return t===void 0?"":vN(t)},V3=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Oe(a)}</span>`,d=Bm({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Oe(s)}${i}</span>${d}${c}</li>`}).join("")}</ul>`,K3=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Is({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=G3(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${V3(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=_t({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Oe(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Oe(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},J3=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Oe(n.title)}</strong> <span class="muted">(${Oe(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Oe(o.title)}</strong>${n}${Oe(s)}${qm(e,o)}</li>`}).join("")}</ul>`},Y3=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Oe(i)}</span> <strong>${Oe(n.title)}</strong>${Oe(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Oe(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Is({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Os=(e,t)=>{switch(t){case"wizard-1":return Vm(e,t,q3(e));case"wizard-2":return Vm(e,t,K3(e));case"wizard-3":return Vm(e,t,J3(e));case"wizard-4":return Vm(e,t,Y3(e));default:return""}}});var X3,Z3,RN,xN,TN=l(()=>{"use strict";R();Um();Kr();Km();X3=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},Z3=e=>{let t=e.goal.trim();return t.length===0?null:t},RN=(e,t,r,o,n)=>{let s=nt(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},xN=(e,t)=>{let r=Z3(e);if(t.id.startsWith("wizard-")){let s=Os(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=cl(e,t);if(s!==null){let a=xs(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=se(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:RN(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:X3(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:RN(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var ln,IN,ON=l(()=>{"use strict";ln=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IN=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${ln(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${ln(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${ln(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${ln(n)}</h2><pre class="mono">${ln(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${ln(e.goal)}</dd></div></dl>`;return`<h2>${ln(e.title)}</h2>${i}${t}${r}${o}${s}`}});var Q3,MN,Ol,Aw,Jm=l(()=>{"use strict";R();Q3=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),MN=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||C(e.status))return null;let r=Pt(t);return r<0||r>3?null:`wizard-${r+1}`},Ol=(e,t)=>Q3.has(t)?MN(e)===t:!1,Aw="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var e6,Ym,bw=l(()=>{"use strict";e6='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Ym=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${e6}</button>`});var t6,NN,r6,Pw,zN,o6,n6,s6,i6,jN,DN=l(()=>{"use strict";R();zm();t6={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},NN=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},r6=e=>t6[e]??null,Pw=(e,t)=>{let r=e.wizard,o=r6(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=Pt(r);return o<n||o===n},zN=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},o6=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:vt(t).trim();return o.length===0?null:fl({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:NN(e,"generalize")})},n6=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=sn(e);return n===null?null:qr({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=zN(e)?.promptText.trim()??_t({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:Xo({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},s6=e=>{let t=e.wizard;if(t===void 0)return null;let r=_t({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:hl({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:NN(e,"separate")})},i6=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=mr(t),s=Qo(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=sn(e);return c===null?null:qr({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=zN(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||C(e.status)&&i?.judgement!==null)?Yo({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):yl({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:Zo(t,r).output,moduleTitle:o.title})},jN=(e,t)=>{if(!Pw(e,t))return null;switch(t){case"wizard-1":return o6(e);case"wizard-2":return n6(e);case"wizard-3":return s6(e);case"wizard-4":return i6(e);default:return null}}});var a6,Xm,ww=l(()=>{"use strict";R();a6=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},Xm=(e,t)=>{let r=e.wizard,o=a6(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=Pt(r);return o<n?"done":o===n&&C(e.status)&&e.status==="failed"?"failed":o<=n&&C(e.status)?"done":"pending"}});var l6,Ms,Zm=l(()=>{"use strict";Ts();DN();ww();l6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ms=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(Xm(e,t)==="pending")return""}else if(!Pw(e,t))return"";let o=jN(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Ut}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${l6(o)}</pre></template>`}});var cn,Ns,Ml=l(()=>{"use strict";cn=e=>e.toLocaleString("en-US"),Ns=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var Bt,c6,$N,HN,FN,UN,vw=l(()=>{"use strict";R();TN();ON();Jm();bw();Ts();Um();uw();Zm();Ml();Bt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),c6=(e,t)=>{let r=cl(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Ns(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${cn(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Bt(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${Bt(r)}</span>`:"",d=IN(xN(t,e)),p=t.wizard!==void 0&&t.wizard.phase==="complete"&&C(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${Bt(e.id)}"`:"",g=Ol(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${Bt(Aw)}"><input type="hidden" name="cycleId" value="${Bt(t.id)}"><input type="hidden" name="wizardStepId" value="${Bt(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",A=e.state==="active"&&e.id.startsWith("wizard-")?bN(t):"",h=o?"failed":e.state,y=o?xs(t):null,u=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Ut}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${Bt(y)}</pre></template>`:"",S=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Ms(t,e.id):"";return`<li class="sdlc-node sdlc-node-${h}" data-sdlc-step-id="${Bt(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${p} data-sdlc-node>${n}<span class="sdlc-node-label">${Bt(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${g}${S}${u}</div></div>${A}<template>${d}</template></li>`},$N=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>c6(r,t)).join("")}</ol>`,HN=e=>`<div class="sdlc-score" aria-label="What the score means">${ll(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Bt(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,FN=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${Ym({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,UN=`<script>
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
</script>`});var Xr,BN,d6,GN=l(()=>{"use strict";R();De();Kr();YP();Xr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),BN=e=>{if(!C(e.status))return"";let t=se(e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score??null,reasons:c.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=nt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Xr(t.reasons.trim())}</p>`,i=n===null?d6({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ae(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">${Xr(n)}</div>`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><h2>${e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`}</h2>${o}${s}${i}</section>`},d6=e=>{let t=e.sourceSkill?.fileName??_l(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=Em(t,r),s=n.length>0&&xM(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Xr(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Xr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Xr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Xr(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Xr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Xr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var qN,VN=l(()=>{"use strict";qN=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var KN,u6,Qm,Be,eg,_w=l(()=>{"use strict";R();R();Se();VN();Um();Kr();KN=["Generalize","Evaluate","Separate","Optimize modules"],u6=e=>{let t=Pt(e),r=t>=0&&t<KN.length?KN[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},Qm=(e,t)=>{let r=xs(e),o=r===null?null:qN(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Be=(e,t)=>({title:e,detail:t,replyPreview:null}),eg=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:null}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!C(e.status)){let t=e.judgeModel;return Be(`${ne(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!C(e.status)){let t=e.judgeModel;return Be(`${ne(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===T?Be(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Be(`${ne(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Be(`${ne(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===T){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==T?Be(`${ne(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Be(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Be(`${ne(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=re(t);return Be(`${ne(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Be(`${ne(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=re(t);return Be(`${ne(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Be(`${ne(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===T){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Be("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Be(`${ne(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>nt(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=oe(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||C(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?Qm(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o="A writer or judge reply could not be used. Start a new run after fixing the issue.";return r!==void 0?Qm(e,{title:u6(r),detail:t.length>0?t:o}):Qm(e,{title:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(C(e.status)){let t=e.errorMessage?.trim()??"";return Qm(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var Gt,Nl=l(()=>{"use strict";Se();Gt=e=>{if(e.status==="improving"&&e.improverModel===T)return!0;if(e.status!=="judging"||e.judgeModel!==T)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===T}});var JN,YN=l(()=>{"use strict";JN=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Zr,p6,XN,ZN=l(()=>{"use strict";R();Zr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p6=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Zr(r)}</p>`},XN=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Zr(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Zr(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Zr(a)}.</p>`}<pre class="mono">${Zr(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Vr(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Zr(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",g=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Zr(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${p6(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Zr(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var zl,m6,QN,ez=l(()=>{"use strict";R();Kr();zl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),m6=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=nt(t.promptText),n=t.judgement?.reasons?`<p class="muted">${zl(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${zl(i)}.</p>`}<pre class="mono">${zl(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Vr(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${zl(d)}</pre>`:`<div class="alert-error">${zl(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},QN=e=>e.revisions.map(t=>m6(e,t)).join("")});var tz,rz=l(()=>{"use strict";R();tz=e=>{if(C(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var qt,g6,Ww,f6,h6,y6,S6,oz,nz,Lw=l(()=>{"use strict";rz();qt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g6="Stop this run? Writers will stop and the best prompt is kept.",Ww="End the wizard? Writers will stop and progress from finished steps is kept.",f6="Skip this module and pause at the step gate?",h6=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${qt(g6)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${qt(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,y6=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${qt(Ww)}"><input type="hidden" name="cycleId" value="${qt(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,S6=e=>{let t=qt(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${qt(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${qt(f6)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${qt(Ww)}">End wizard</button>
    </form>
  </div>`},oz=e=>{let t=tz(e);return t==="none"?"":t==="classic"?h6(e.id):t==="wizard_end_only"?y6(e.id):S6(e)},nz=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=qt(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${qt(Ww)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var sz,iz=l(()=>{"use strict";R();Ml();sz=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=oe(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${cn(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${cn(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${re(r)}`}return""}});var A6,b6,az,P6,lz,cz=l(()=>{"use strict";R();iz();ww();Km();Zm();A6=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',b6=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',az=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),P6=(e,t,r)=>{let o=Os(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=sz(e,t),i=Xm(e,t),a=A6(i),c=b6(i),d=Ms(e,t,{forOutcomeSummary:!0}),p=`${a}<span class="sdlc-wizard-outcome-step-title">${az(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${az(s)}</span>`,g=t==="wizard-4"&&r.phase==="complete"?" open":"",A=i==="failed"&&t!=="wizard-4"?" open":"",h=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${h}"${g}${A}><summary aria-controls="${h}-body">${p}</summary><div class="sdlc-wizard-outcome-step-body" id="${h}-body">${o}</div></details>`},lz=e=>{let t=e.wizard;if(t===void 0||!C(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>P6(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var dz,uz,pz=l(()=>{"use strict";dz=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uz=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${dz(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${dz(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var kw,mz,Ew=l(()=>{"use strict";kw=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,mz=(e,t)=>{if(kw(e,t))return"Passed";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var gz,fz=l(()=>{"use strict";gz=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var tg,hz,yz=l(()=>{"use strict";R();Ew();Ew();fz();tg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hz=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=oe(t),o=re(t),n=r.terminalStatusSuggestion==="passed"?"":gz(r,o),s=o-10,i=r.rows.map((c,d)=>{let p=t.modules[d],g=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,h=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=p===void 0?c.status:mz(p,o),u=p!==void 0&&kw(p,o)?'<span aria-label="Passed">\u2713</span>':tg(y);return`<tr${h}><td>${tg(c.title)}</td><td>${tg(g)}</td><td>${c.tokens??"\u2014"}</td><td>${u}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${tg(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var dn,rg,Cw=l(()=>{"use strict";dn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rg=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${dn(r.fileName)}</code> \u2014 ${dn(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${dn(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${dn(i.name)}</strong> <code>.cursor/skills/${dn(i.fileName)}/SKILL.md</code></p><p class="muted">${dn(i.description)}</p><p>${dn(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var w6,Sz,Az=l(()=>{"use strict";R();R();pz();yz();Cw();w6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Sz=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!C(e.status)||t.modules.length===0)return"";let r=hz(e),o=uz(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=oe(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${w6(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${rg(e)}${a}${r}${o}</section>`}});var fr,jl=l(()=>{"use strict";fr=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var hr,og,Rw=l(()=>{"use strict";R();vw();GN();_w();Nl();YN();zm();ZN();ez();Lw();cz();Az();Ml();De();jl();hr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),og=e=>{let t=!C(e.status)&&e.status!=="wizard_paused"&&!Gt(e),r=eg(e),o=$N(PP(JN(e)),e),n=C(e.status)?"":oz(e),s=lz(e),i=Sz(e),a=BN(e),c=e.errorMessage===null?"":`<div class="alert-error">${hr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?oe(e.wizard):null,A=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,h=!t&&e.wizard!==void 0&&C(e.status)&&(e.wizard.phase==="complete"||oe(e.wizard).passedModuleCount>0),y=h?A?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",u=h&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${hr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",S=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${hr(r.replyPreview)}</pre>`,b=r.detail.length===0&&u.length===0&&S.length===0||r.detail.length===0&&S.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${hr(r.detail)}${p}</p>`}${S}</div>`,f=e.revisions.find(ao=>ao.roundNumber===e.currentRound),w=e.status==="improving"?sn(e):null,v=Ns(e),W=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),L=Gt(e)?XN({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:w?.promptText??f?.promptText??"",score:w?.score??f?.judgement?.score??null,reasons:w?.reasons??f?.judgement?.reasons??null,avoid:w?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:W?1:0}):"",E=e.wizard!==void 0&&e.wizard.phase==="complete"&&C(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!E&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?re(e.wizard):e.passScore,M=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${HN(I)}</div>`:"",B=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':C(e.status)?e.status==="failed"?'<span class="sdlc-run-badge sdlc-run-badge-failed">Failed</span>':E&&g!==null&&!A?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",q=t?d:h?A?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',F=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${hr(et(ae(e)))}</li>`:"",v>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${cn(v)} so far</li>`:""].filter(ao=>ao.length>0),ct=F.length===0?"":`<ul class="sdlc-run-meta">${F.join("")}</ul>`,H=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,ge=E?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,io=E?"":M.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${ge}</div>`:`<div class="sdlc-run-grid">${ge}${M}</div>`,Et=QN(e),FU=e.wizard!==void 0&&C(e.status)&&e.revisions.every(ao=>ao.roundNumber===0&&(ao.judgement===void 0||ao.judgement===null)),UU=Et.length===0||FU?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${Et}</div></section>`,BU=`<p class="sdlc-run-goal" title="${hr(e.goal.trim())}">${hr(fr(e.goal))}</p>`,GU=E?`${c}${i}${s}${L}${a}`:`${c}${io}${L}${s}${a}`,qU='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',VU=E?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${hr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${qU}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${B}</div>${BU}<div class="sdlc-run-activity${y}"${h?' role="status"':""}><div class="sdlc-run-activity-icon">${q}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${hr(r.title)}</h2>${b}${u}${VU}</div></div>${ct}${H}</header>${GU}</section>${UU}`}});var bz,Pz=l(()=>{"use strict";R();Ll();bz=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!bl({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:Yr(e)}});var wz,vz=l(()=>{"use strict";R();Tl();wz=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Al(t)?e:an({...e,wizard:{...t,gate:null}})}});var _z,Wz=l(()=>{"use strict";R();Wl();_z=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Pl(t.splitOptions))return e;let r=t.splitOptions[0];return Jr(e,r)}});var v6,un,ng=l(()=>{"use strict";Pz();vz();Wz();Qe();v6=e=>{let t=wz(e),r=bz(t);return _z(r)},un=(e,t)=>{let r=v6(t);return r!==t?(D(e,r),r):t}});var Lz,yr,Dl=l(()=>{"use strict";R();Lz=e=>Ze.indexOf(e),yr=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||C(e.status)?Ze.length:t.gate!==null?Lz(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?Lz(t.phase):null}});var kz,Ez=l(()=>{"use strict";kz=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var pn,Cz,Rz=l(()=>{"use strict";R();Ez();pn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Cz=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Zo(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${pn(kz(o))}</pre></div>`:"",s=en(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=mr(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=vm(c),g=i[c]??"",A=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,h=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${pn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${pn(p)}">${pn(A)}</label>
        ${h}
        <input class="input" type="text" id="${pn(p)}" name="${pn(p)}" value="${pn(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var $l,xz,Tz=l(()=>{"use strict";R();pw();Rz();fw();Lw();Cw();Sw();$l=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xz=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate,n=re(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?_N(r):"",a=o==="evaluate"?rg(e):"",c=o==="evaluate"?Is({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",p=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(x=>{let I=x.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',M=x.recommended?' <span class="sdlc-badge">Recommended</span>':"",B=r.selectedSplitOptionId===x.id||r.selectedSplitOptionId===null&&x.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${$l(x.id)}" required${B}> <strong>${$l(x.title)}</strong>${I}${M}</label>${qm(e,x)}</li>`}).join("")}</ul>`:"",g=r.modules[r.currentModuleIndex],h=o==="optimize_modules"&&g?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=g?.title??"Module",u=g?.prompt??"",S=g?.status==="pending",b=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${$l(y)}</p>${S?Cz({cycle:e,modulePrompt:u}):""}<p class="muted">Test run prompt preview: ${$l(Qo(u,mr(r)))}</p>${g?.statistics===null||g?.statistics===void 0?"":`<p class="muted">Module stats: best ${g.statistics.bestScore??"\u2014"} / \u2265${n} (round ${g.statistics.bestRound??"\u2014"}).</p>`}${Is({cycle:e,interactive:!1,caption:S?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",f=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":S?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",w=zP(r),v=w===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${w}</p>`,W=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",L=t?.active===!0?" sdlc-wizard-gate-active":"",E=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${W}"`:"";return`<section class="card sdlc-wizard-gate${L}"${E}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${f}</p>
    ${v}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${$l(e.id)}">
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
    ${nz(e)}
  </section>`}});var _6,Iz,Oz=l(()=>{"use strict";R();Zm();_6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Iz=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||C(e.status))return"";let r=(o,n)=>{let s=Ms(e,o);return`<h2 class="sdlc-wizard-active-head">${_6(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var xw,Mz,Nz,Qr,zz,zs=l(()=>{"use strict";R();Qe();xw=new Map,Mz=e=>{let t=new AbortController;return xw.set(e,t),t.signal},Nz=e=>{xw.delete(e)},Qr=e=>{xw.get(e)?.abort()},zz=(e,t)=>{let r=J(e,t);return r===null||r.wizard!==void 0?!1:(C(r.status)||(D(e,{...r,status:"stopped",errorMessage:Jo,updatedAt:new Date().toISOString()}),Qr(t)),!0)}});var jz,Dz,Tw,$z,Iw=l(()=>{"use strict";R();Dl();zs();jz="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",Dz=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return Ze[r]??null},Tw=(e,t)=>{let r=Dz(t);if(r===null||e.wizard===void 0)return!1;let o=Ze.indexOf(r);if(o===-1)return!1;let n=yr(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<Ze.length)},$z=(e,t)=>{let r=Dz(t);if(r===null||e.wizard===void 0||!Tw(e,t))return e;Qr(e.id);let o=Ze.slice(Ze.indexOf(r)),n=gl(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var Ow,Hz,Fz=l(()=>{"use strict";Iw();Ow=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hz=(e,t)=>Tw(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${Ow(jz)}"><input type="hidden" name="cycleId" value="${Ow(e.id)}"><input type="hidden" name="wizardStepId" value="${Ow(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var W6,L6,k6,Uz,Bz=l(()=>{"use strict";R();Dl();Tz();Oz();Fz();Km();W6={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},L6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),k6=(e,t,r)=>{let o=Hz(e,t);return`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${L6(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${Os(e,t)}</div>
</details>`},Uz=e=>{let t=e.wizard;if(t===void 0)return"";let r=yr(e);if(r===null)return"";let o=Ze.slice(0,r).map((i,a)=>k6(e,`wizard-${a+1}`,W6[i])),n=t.gate!==null?xz(e,{active:!0}):Iz(e),s=r>=Ze.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var sg,Mw=l(()=>{"use strict";Bz();yw();R();sg=e=>{if(e===null||e.wizard!==void 0&&C(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=Uz(e),r=CN(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var E6,Nw,Gz=l(()=>{"use strict";R();Se();De();nn();E6=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},Nw=async(e,t,r)=>{if(!E6(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===T)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=xP({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Ue({writerAgent:e.judgeModel,prompt:n,workingDirectory:ae(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=IP(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var Hl,ig,qz,zw,Vz,Kz,Jz,ag,jw=l(()=>{"use strict";Hl=m(require("node:fs")),ig=m(require("node:path")),qz=e=>ig.default.join(ig.default.dirname(e),"prompt-optimizer-writer-ready.json"),zw=e=>{let t=qz(e);if(!Hl.default.existsSync(t))return{};try{let r=JSON.parse(Hl.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},Vz=(e,t)=>{Hl.default.mkdirSync(ig.default.dirname(e),{recursive:!0}),Hl.default.writeFileSync(qz(e),`${JSON.stringify(t,null,2)}
`)},Kz=(e,t)=>zw(e)[t]?.message??null,Jz=(e,t,r)=>{Vz(e,{...zw(e),[t]:{message:r}})},ag=(e,t)=>{let r=zw(e);r[t]!==void 0&&Vz(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var Dw,lg,cg,Yz,Ae,mn=l(()=>{"use strict";R();XP();Tl();Gz();Nl();zs();jw();ng();Qe();Dw=new Set,lg={atMs:0,ids:[]},cg=async()=>{if(Date.now()-lg.atMs<3e4)return lg.ids;let e=await bt({commands:de({})});return lg.atMs=Date.now(),lg.ids=e.installedWriterIds,e.installedWriterIds},Yz=async(e,t,r)=>{let o=J(e,t);if(o===null||r.aborted)return;let n=un(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(C(n.status)&&!s||n.status==="wizard_paused"||Gt(n))return;if(s){let c=await Nw(n,r,d=>{ag(e,d)});D(e,c);return}let i=await yN(n,c=>{ag(e,c)},r,c=>{J(e,t)?.status==="stopped"||r.aborted||D(e,c)});if(!(J(e,t)?.status==="stopped"||r.aborted)){if(D(e,i),C(i.status)){let c=await Nw(i,r,d=>{ag(e,d)});D(e,c);return}await Yz(e,t,r)}},Ae=(e,t)=>{if(Dw.has(t))return;let r=J(e,t);if(r===null)return;let o=un(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(C(o.status)&&!n||o.status==="wizard_paused"||Gt(o))return;Dw.add(t);let s=Mz(t);Yz(e,t,s).finally(()=>{Dw.delete(t),Nz(t)})}});var eo,Fl=l(()=>{"use strict";Rw();ng();Mw();mn();eo=(e,t)=>{let r=un(e,t);return Ae(e,r.id),`${og(r)}${sg(r)}`}});var Xz,Zz,Qz=l(()=>{"use strict";Xz=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,Zz=e=>e!==null&&e>0});var C6,R6,x6,ej,tj=l(()=>{"use strict";R();Tl();Fm();Wl();Ll();zs();Jm();Jm();C6=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),R6=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},x6=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=oe(o);return Rs({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},ej=(e,t)=>{if(!Ol(e,t))return e;Qr(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return an({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Yr(R6(r));if(t==="wizard-3"){let n=o.splitOptions[0]??C6(o.templatedPrompt);return Jr(r,n)}return t==="wizard-4"?x6(r):e}});var dg,rj,$w=l(()=>{"use strict";R();Fm();zs();dg=e=>(Qr(e.id),{...Rs(e,"stopped"),errorMessage:nP}),rj=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;Qr(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var T6,oj,nj,sj=l(()=>{"use strict";R();Tl();Fm();Wl();Ll();Fl();Qe();mn();Qz();Iw();tj();$w();T6="Pick a revision scored above 0 before continuing to Separate.",oj=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),nj=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=J(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=J(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(eo(e.storePath,d))};if(o==="wizard-stop-all"){let c=dg(s);return D(e.storePath,c),Ae(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=rj(s);return D(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=$z(s,c);return D(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=ej(s,c);return D(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&Ae(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",g=WP(s.wizard,d,c);g=gl(g,d),g={...g,pendingStepInstructions:p};let A={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return D(e.storePath,A),Ae(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(A=>A.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?oj(s):an({...s,wizard:{...s.wizard,gate:null}});return D(e.storePath,g),Ae(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=Xz(s,p??-1);if(!Zz(g)){let h={...s,errorMessage:T6,updatedAt:new Date().toISOString()};return D(e.storePath,h),a(n),!0}let A=Yr({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return D(e.storePath,A),Ae(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let h=oj(s);return D(e.storePath,h),Ae(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(h=>h.id===p);if(g===void 0){let h={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return D(e.storePath,h),a(n),!0}let A=Jr(s,g);return D(e.storePath,A),a(n),!0}if(c==="optimize_modules"){let d=s.wizard.currentModuleIndex,p=s.wizard.modules[d];if(p===void 0)return a(n),!0;let g=GP({wizard:s.wizard,modulePrompt:p.prompt,posted:t});if(!g.ok){let u={...s,errorMessage:g.errorMessage,updatedAt:new Date().toISOString()};return D(e.storePath,u),a(n),!0}let A={...s.wizard,parameterValues:g.parameterValues};if(p.status==="pending"){let u=hN({...s,wizard:{...A,gate:null}},d);return D(e.storePath,u),Ae(e.storePath,n),a(n),!0}let h=d+1;if(h>=s.wizard.modules.length){let u=oe(A),S=Rs({...s,wizard:A},u.terminalStatusSuggestion);return D(e.storePath,S),Ae(e.storePath,n),a(n),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...A,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return D(e.storePath,y),a(n),!0}}return a(n),!0}});var I6,ij,O6,Hw,M6,aj,lj=l(()=>{"use strict";Se();zs();$w();tw();xm();Nl();Qe();I6="Add a score from 0 to 100 and the reason for it.",ij="Add a score from 1 to 100 and the reason for it.",O6="Write the next prompt.",Hw="This step is not waiting for you.",M6=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},aj=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=J(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(D(e.storePath,dg(a)),{kind:"saved",cycleId:i}):zz(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=J(e.storePath,r);if(o===null||!Gt(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:Hw};if(t==="manual-judge"){if(o.judgeModel!==T)return{kind:"invalid",cycle:o,errorMessage:Hw};let i=M6(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?ij:I6};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:ij};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",p=Tm(Cl(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return D(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==T)return{kind:"invalid",cycle:o,errorMessage:Hw};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:O6};let s=Rm(o,n);return D(e.storePath,s),{kind:"saved",cycleId:o.id}}});var cj,dj=l(()=>{"use strict";cj=`<script>
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
</script>`});var uj,pj=l(()=>{"use strict";uj=`<script>
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
</script>`});var mj,gj=l(()=>{"use strict";mj=`<script>
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
</script>`});var fj,hj=l(()=>{"use strict";R();De();fj=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:et(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(re(t.wizard)),maxRounds:String(t.maxRounds),judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!C(t.status)}}});var yj,Sj=l(()=>{"use strict";R();Dl();yj=e=>{if(e.wizard===void 0)return C(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let t=yr(e);if(e.status==="wizard_paused"&&t!==null&&t<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${t+1} of 4`};if(C(e.status)){if(e.wizard.phase==="complete"){let r=oe(e.wizard),o=r.rows.reduce((s,i)=>i.bestScore===null?s:s===null?i.bestScore:Math.min(s,i.bestScore),null),n=o===null?"":` \xB7 lowest ${o}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Wizard \xB7 ${r.passedModuleCount}/${r.totalModules} modules${n}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}}return t!==null&&t<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${t+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var Aj,bj=l(()=>{"use strict";Aj=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Sr,N6,z6,Pj,wj=l(()=>{"use strict";Sj();bj();jl();Sr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),N6=e=>e.wizard===void 0?"classic":"wizard",z6=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Sr(t)}">`,o=yj(e),n=Aj(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Sr(o.badgeClass)}">${Sr(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Sr(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Sr(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${N6(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Sr(e.id)}">${Sr(fr(e.goal))}</a><p class="muted">${Sr(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${g}</div></li>`},Pj=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(i=>z6(i,t)).join(""),o=Math.min(e.length,20),n=o===e.length?`History \xB7 ${e.length}`:`History \xB7 ${o} of ${e.length}`,s=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2><ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Sr(n)}</summary>${s}</details>`:s}});var Fw,ug,vj,j6,D6,Ul,_j,pg=l(()=>{"use strict";Fw=m(require("node:fs")),ug=m(require("node:path"));De();vj=/^[a-z0-9-]+$/,j6=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},D6=(e,t)=>{if(!vj.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let g=j6(p[2]??"");p[1]==="name"&&g.length>0&&(o=g),p[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},Ul=e=>{let t=gr(e);if(!t.ok)return[];let r=ug.default.resolve(t.path,".cursor","skills"),o=[];try{o=Fw.default.readdirSync(r)}catch{return[]}return o.filter(n=>vj.test(n)).flatMap(n=>{let s=ug.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${ug.default.sep}`))return[];try{let i=D6(Fw.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},_j=(e,t)=>Ul(e).find(r=>r.fileName===t)??null});var Wj,Lj=l(()=>{"use strict";Wj={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."}}});var Bl,$6,$e,js=l(()=>{"use strict";Lj();Ts();Bl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$6=e=>{let t=Wj[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Bl(t.title)}" aria-describedby="${r}" aria-expanded="false">${Ut}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Bl(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Bl(t.example)}</span></span></button>`},$e=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Bl(r)}"`}>${Bl(e)}</span>${$6(t)}</span>`});var kj,H6,Ej,Cj,Rj=l(()=>{"use strict";js();kj=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H6=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),Ej=e=>{if(e.length===0)return`<div class="field">${$e("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${kj(r.fileName)}">${kj(r.fileName)}</option>`).join("");return`<div class="field">${$e("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${H6(e)}</script>`},Cj=`<script>
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
</script>`});var Me,xj,Tj,F6,Ij,Oj,Mj,Nj=l(()=>{"use strict";R();_w();Se();jl();Dl();Me=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xj=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",Tj=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,F6=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},Ij=e=>e===T?"You":ne(e),Oj=e=>{let t=F6(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ne(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Me(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Me(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Me(Ij(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Me(Ij(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Me(r)}</dd></div>
    </dl>
  </details>`},Mj=e=>{let t=e.wizard;if(t===void 0)return"";let r=fr(e.goal),o=e.status==="wizard_paused",n=!C(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=eg(e),g=Tj(t),A=g===null?"":xj(g),h=yr(e),y=A.length===0?"":h===null||h>=4?` <strong>${Me(A)}</strong>`:` <strong>${Me(A)}</strong> (step ${h+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Me(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Me(p.title)}${y}</p>
    <p class="muted">${Me(p.detail)}</p>
    <div class="actions">
      ${Oj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Me(e.id)}">Open this run</a>
    </div>
  </section>`}let s=Tj(t),i=s===null?"Wizard":xj(s),a=yr(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Me(r)}</h2>
    <p class="lede">Paused at <strong>${Me(i)}</strong>${Me(c)} (last updated ${Me(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${Oj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Me(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Gl,zj,jj=l(()=>{"use strict";js();Gl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zj=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${Gl(n.id)}"${n.id===e.runner?" selected":""}>${Gl(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Gl(e.runner)}">Checking ${Gl(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${$e("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${$e("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Gl(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var Dj,$j=l(()=>{"use strict";Dj=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var Ds,Hj,Fj,Uj,Bj,Gj=l(()=>{"use strict";js();Ds=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hj=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${Ds(c.id)}"${c.id===r?" selected":""}>${Ds(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Ds(n)}</option>`;return`<div class="field">${$e(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},Fj=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Ds(t)}">Checking ${Ds(o)}\u2026</p>`},Uj=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${$e(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Ds(r)}</textarea><span class="muted">${o}</span></div></details>`,Bj=e=>{let t=`<div class="sdlc-writer">${Hj("judge","Judge",e.judge,e.writers,"I'll score it")}${Fj("judge",e.judge,e.writers)}${Uj("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${Hj("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${Fj("improver",e.improver,e.writers)}${Uj("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var qj,Vj=l(()=>{"use strict";qj=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var Uw,Kj,Jj=l(()=>{"use strict";Vj();Uw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Kj=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${qj.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${Uw(t.goal)}" title="${Uw(t.goal)}">${Uw(t.label)}</button>`).join("")}</div>`});var ql,U6,B6,Bw,Yj=l(()=>{"use strict";R();js();ql=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),U6=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},B6=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,Bw=e=>{let t=U6(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=ll(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${$e(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${ql(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${ql(e.inputId)}" class="sdlc-pass-range" type="range" name="${ql(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${ql(a)}"><span class="sdlc-pass-mark" style="left:${B6(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${ql(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var q6,Ar,Xj,Zj=l(()=>{"use strict";Nl();Rw();dj();pj();vw();gj();hj();wj();pg();Rj();js();Mw();Nj();jl();jj();$j();Gj();R();Jj();Yj();q6=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Ar=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xj=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Ar(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Ar(e.skillNotice??"")}</div>`,o=`${FN}${UN}`,n=e.resumableWizardCycle??null,s=n===null?"":Mj(n),i=sg(e.cycle),a=e.cycle===null?"":og(e.cycle),c=e.cycle!==null&&Gt(e.cycle),d=fj(e),p=q6(d.goal,d.prompt,e.canRun),g=Bj({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),A=zj({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),h=`${Bw({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${Bw({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=vP,u=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",S=e.cycle!==null&&C(e.cycle.status),b=d.running&&!S,f=S||b?"":" open",w=b?" sdlc-compose-run-focus":"",W=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${S?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,L=S?(()=>{let F=e.cycle!==null?fr(e.cycle.goal):fr(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Ar(F)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${W}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${W}</summary>`,E=S?" sdlc-compose-viewing-finished":"",x=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",I=c?"waiting":d.running?"running":"idle",M=d.running&&!c?' aria-busy="true"':"",B=`<section class="card sdlc-compose${E}${w}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${f}>
        ${L}
        <div class="sdlc-compose-details-body">
      <p class="lede">${y} ${Ar(e.modelNote)}</p>
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
            <input class="input" type="text" name="folder" value="${Ar(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${Ej(Ul(d.folder))}
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
            ${Kj()}
            <textarea class="input textarea" name="goal" rows="4" required>${Ar(d.goal)}</textarea>
          </div>
          <div class="field">
            ${$e("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Ar(d.prompt)}</textarea>
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
        ${A}
        ${Dj()}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${Ar(d.passScore)}; Step 4 pass \u2265 ${Ar(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
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
    </section>`,q=`${""}${cj}${uj}${mj}${Cj}`;return`${t}${r}${B}${s}${a}${i}${o}${Pj(e.history,e.cycle?.id??null)}${q}`}});var Vl,Gw=l(()=>{"use strict";Zj();Vl=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:Xj(t)}))}});var Qj,eD=l(()=>{"use strict";lj();Fl();Gw();Qe();mn();Qj=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:aj({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=J(e.storePath,o.cycleId);return Ae(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(eo(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Vl(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:Ht(e.storePath),resumableWizardCycle:null}),!0)}});var tD,mg,qw=l(()=>{"use strict";tD=m(require("node:os"));R();mg=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??tD.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel}}}});var rD,$s,Vw,oD,nD,Kl=l(()=>{"use strict";R();Se();rP();rD=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,$s=e=>{let t=zM(e),r=on(e).map(s=>({id:s,label:Cm[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},Vw=(e,t,r)=>t===T||t!==null&&e.writers.some(o=>o.id===t)?t:r,oD=(e,t,r,o=null)=>({judge:Vw(e,t,e.judge),improver:Vw(e,r,e.improver),runner:Vw(e,o,e.runner)}),nD=e=>e===nm?{goal:sm,prompt:im}:{goal:"",prompt:""}});var gg,sD=l(()=>{"use strict";gg=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var iD,fg,Kw=l(()=>{"use strict";R();Se();De();Kl();sD();iD=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=gg(o);return n.ok?String(n.passScore):String(r)},fg=e=>{let t=oD(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=iD(e.posted,"passScore",70),o=iD(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=(f,w)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:f,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:w,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a});if(e.posted===null)return d(e.defaultFolder??rn,null);let p=e.posted.get("folder")??rn;if(e.posted.get("intent")==="choose-folder"){let f=e.pickFolder();return d(f===null?p:et(f),null)}if((e.posted.get("intent")??"")!=="run")return d(p,null);let A=rD(e.goal,e.prompt);if(A!==null)return d(p,A);let h=gg(e.posted.get("passScore")??r);if(!h.ok)return d(p,h.errorMessage);let y=gg(e.posted.get("modulePassScore")??o);if(!y.ok)return d(p,y.errorMessage);let u=jM(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(u===null)return d(p,"Choose a judge and an improver.");let S=gr(p);if(!S.ok)return d(p,S.errorMessage);let b=DM(e.installedIds,c,u.judge);return b===null?d(p,"Choose a runner for wizard step 4."):{kind:"start",goal:e.goal,prompt:e.prompt,judge:u.judge,improver:u.improver,workingDirectory:S.path,passScore:h.passScore,modulePassScore:y.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:b,runnerInstructions:a}}});var Hs,yg,V6,Jw,aD,hg,lD,K6,cD,Yw,J6,Y6,X6,Xw,dD,uD,pD=l(()=>{"use strict";Hs=m(require("node:fs")),yg=m(require("node:path"));Se();De();V6=["remember","choose-folder","run"],Jw=()=>({folder:rn,judge:"",improver:"",runner:""}),aD=e=>yg.default.join(yg.default.dirname(e),"prompt-optimizer-preferences.json"),hg=e=>typeof e=="string"?e:"",lD=e=>{let t=aD(e);if(!Hs.default.existsSync(t))return Jw();try{let r=JSON.parse(Hs.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return Jw();let o=r,n=hg(o.folder).trim();return{folder:n.length===0?rn:n,judge:hg(o.judge),improver:hg(o.improver),runner:hg(o.runner)}}catch{return Jw()}},K6=(e,t)=>{let r=aD(e);Hs.default.mkdirSync(yg.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;Hs.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),Hs.default.renameSync(o,r)},cD=(e,t)=>e===T||on(t).some(r=>r===e),Yw=(e,t,r)=>e===null?t:e.length===0?"":cD(e,r)?e:t,J6=(e,t)=>{if(e===null)return t;let r=gr(e);return r.ok?r.display:t},Y6=e=>{let t=lD(e.storePath),r={folder:J6(e.folder,t.folder),judge:Yw(e.judge,t.judge,e.installedIds),improver:Yw(e.improver,t.improver,e.installedIds),runner:Yw(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||K6(e.storePath,r)},X6=e=>{let t=gr(e);return t.ok?t.display:rn},Xw=(e,t)=>cD(e,t)?e:"",dD=e=>{let t=lD(e.storePath);return{selection:{...e.selection,judge:Xw(t.judge,e.installedIds)||e.selection.judge,improver:Xw(t.improver,e.installedIds)||e.selection.improver,runner:Xw(t.runner,e.installedIds)||e.selection.runner},defaultFolder:X6(t.folder)}},uD=e=>{let t=e.posted.get("intent")??"";if(!V6.includes(t))return;let r=e.posted.get("folder");Y6({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var mD,Z6,Q6,Zw,eJ,Sg,Ag=l(()=>{"use strict";mD=m(require("node:os"));Se();jw();nn();Z6="Reply with the single word ok. Do not use tools.",Q6=45e3,Zw=async(e,t)=>{if(t===T)return{ok:!0,message:"You will do this step."};let r=Kz(e,t);if(r!==null)return{ok:!0,message:r};let o=await Ue({writerAgent:t,prompt:Z6,workingDirectory:mD.default.tmpdir(),timeoutMs:Q6});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ne(t)} is ready.`;return Jz(e,t,n),{ok:!0,message:n}},eJ=e=>[...new Set(e.filter(t=>t.length>0))],Sg=async(e,t,r,o)=>{for(let n of eJ([t,r,o??""])){let s=await Zw(e,n);if(!s.ok)return s.message}return null}});var Qw,gD=l(()=>{"use strict";R();Qw=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!C(r.status)&&!(t!==null&&r.id===t))return r;return null}});var fD,hD=l(()=>{"use strict";Dt();R();Fl();qw();Kw();Gw();Qe();De();pD();pg();Ag();gD();ng();mn();fD=async e=>{let t=e.posted===null?dD({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=fg({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Ur("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(uD({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?et(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await Sg(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await Vl(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:et(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:Ht(e.route.storePath),resumableWizardCycle:Qw(Ht(e.route.storePath),null)});return}if(r.kind==="start"){let s=_j(r.workingDirectory,r.sourceSkillFile),i=mg({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,wizard:MP({...ml(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(D(e.route.storePath,i),Ae(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(eo(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:J(e.route.storePath,e.cycleId);n!==null&&(n=un(e.route.storePath,n),Ae(e.route.storePath,n.id)),await Vl(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:Ht(e.route.storePath),resumableWizardCycle:Qw(Ht(e.route.storePath),n?.id??null)})}});var yD,SD=l(()=>{"use strict";Qe();yD=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";bM(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var AD,bD=l(()=>{"use strict";AD=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var PD,wD=l(()=>{"use strict";MM();sj();eD();hD();SD();Kl();bD();mn();PD=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await cg(),o=$s(r),n=e.method==="POST"?AD(e.request.headers["content-type"],await e.readBody(e.request)):null;if(nj({posted:n,storePath:e.storePath,response:e.response})||await Qj(e,n,o))return;let s=nD(t.searchParams.get("example")),i=yD({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=OM({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await fD({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:IM(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var tJ,vD,_D=l(()=>{"use strict";R();Qe();tJ=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",vD=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=J(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!C(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=NP({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${tJ(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var WD,LD=l(()=>{"use strict";Fl();Qe();WD=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:J(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":eo(e.storePath,o)),!0}});var rJ,kD,ED=l(()=>{"use strict";Se();Ag();rJ=["claude-cli","codex","cursor","antigravity"],kD=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===T||rJ.includes(t)?await Zw(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var CD,RD=l(()=>{"use strict";R();CD=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:dl,page:ul,context:vs,installedWriters:e,post:{method:"POST",url:dl,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${dl}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var ev,xD=l(()=>{"use strict";R();Ml();ev=e=>{let t=e.revisions[e.revisions.length-1]??null,r=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null}))),o=C(e.status);return{ok:!0,cycleId:e.id,status:e.status,done:o,useThisPrompt:e.status==="passed"||e.status==="stopped",totalTokens:Ns(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,context:vs,page:`${ul}?cycle=${encodeURIComponent(e.id)}`}}});var Ne,oJ,TD,ID,OD=l(()=>{"use strict";Ne=m(bi());R();oJ=(0,Ne.isType)({goal:Ne.isString,prompt:Ne.isString,workingDirectory:Ne.isString,judge:(0,Ne.isUndefinedOr)(Ne.isString),improver:(0,Ne.isUndefinedOr)(Ne.isString),passScore:(0,Ne.isUndefinedOr)(Ne.isNumber),maxRounds:(0,Ne.isUndefinedOr)(Ne.isNumber)}),TD=e=>{let t=e?.trim()??"";return t.length===0?null:t},ID=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return oJ(t)?t.workingDirectory.trim().length===0?{ok:!1,error:hm}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:TD(t.judge),improver:TD(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:hm}}});var nJ,MD,ND=l(()=>{"use strict";R();Se();Kw();Kl();nJ=e=>e.map(t=>t.id).join(", "),MD=e=>{let t=$s(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===T||n===T)return{ok:!1,error:wP,installedWriters:t.writers};if(o===null||n===null){let a=nJ(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o}),i=fg({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var zD,jD=l(()=>{"use strict";R();qw();RD();xD();Kl();OD();ND();Qe();zD=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=J(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:ev(c)}}let r=await e.handlers.readInstalledIds(),o=$s(r);if(e.method==="GET")return{status:200,body:CD(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};let n=ID(e.rawBody);if(!n.ok)return{status:400,body:{ok:!1,error:n.error,installedWriters:o.writers}};let s=MD({body:n.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver,s.runner);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:o.writers}};let a=mg({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds,wizard:ml(s.prompt),runnerModel:s.runner});return D(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:ev(a)}}});var DD,$D=l(()=>{"use strict";mn();Ag();jD();DD=async e=>{let t=await zD({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:cg,readWritersReady:Sg,startCycle:Ae}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var FD,sJ,iJ,HD,aJ,UD,BD=l(()=>{"use strict";FD=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],sJ=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},iJ=e=>{let t={};for(let n of e)for(let s of new Set(FD(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},HD=(e,t)=>{let r=sJ(FD(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},aJ=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},UD=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=iJ(e.map(i=>i.text)),s=HD(o,n);return e.map(i=>({id:i.id,score:aJ(s,HD(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var tv,lJ,cJ,GD,dJ,uJ,pJ,mJ,rv,ov=l(()=>{"use strict";tv=m(require("node:path"));De();BD();pg();lJ=5,cJ=20,GD=280,dJ=e=>[e.name,e.description,e.promptText].join(`
`),uJ=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=GD?t:`${t.slice(0,GD-3)}...`},pJ=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),mJ=e=>e===void 0||!Number.isFinite(e)?lJ:Math.min(cJ,Math.max(1,Math.floor(e))),rv=e=>{let t=e.query.trim(),r=mJ(e.limit),o=gr(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=Ul(o.path),s=UD(n.map(d=>({id:d.fileName,text:dJ(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=tv.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let p=i.get(d.id);return p===void 0?[]:[{skillId:p.fileName,name:p.name,description:p.description,score:d.score,sourcePath:tv.default.join(a,p.fileName,"SKILL.md"),excerpt:uJ(p),source:"filesystem"}]});return{query:t,hits:c,context:pJ(c)}}});var qD,VD=l(()=>{"use strict";ov();qD=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:rv({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var KD,JD=l(()=>{"use strict";VD();KD=async e=>{let t=qD({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var gJ,nv,YD=l(()=>{"use strict";xI();wD();_D();LD();ED();$D();JD();gJ=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},nv=async e=>{let t=gJ(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await DD(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await KD(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:RI()})),!0):(await kD({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||vD({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||WD({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await PD(e),!0)}});var XD=l(()=>{"use strict";YD();ov();nn()});var gn,Jl,fJ,hJ,yJ,SJ,ZD,QD=l(()=>{"use strict";gn=m(require("node:fs")),Jl=m(require("node:path")),fJ="prompt-optimizer-cycles.json",hJ="prompt-optimizer-preferences.json",yJ="prompt-sdlc-cycles.json",SJ="prompt-sdlc-preferences.json",ZD=e=>{let t=Jl.default.join(e,fJ),r=Jl.default.join(e,yJ);if(gn.default.existsSync(t)||!gn.default.existsSync(r))return t;try{gn.default.renameSync(r,t)}catch{return r}let o=Jl.default.join(e,SJ),n=Jl.default.join(e,hJ);if(gn.default.existsSync(o)&&!gn.default.existsSync(n))try{gn.default.renameSync(o,n)}catch{}return t}});var Fs,AJ,sv,e$=l(()=>{"use strict";Fs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AJ=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],sv=e=>{let t=AJ.map(i=>`<option value="${Fs(i.value)}">${Fs(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Fs(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Fs(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Fs(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
    </section>`}});var Yl,o$,bJ,n$,PJ,wJ,s$,Pg,t$,r$,vJ,_J,br,Xl,bg,WJ,wg,iv,LJ,av,i$,lv,a$,kJ,EJ,CJ,l$,c$,d$,Zl=l(()=>{"use strict";Yl=m(require("node:fs")),o$=m(require("node:path")),bJ="estimate-history.ndjson",n$=100,PJ=500,wJ=2e4,s$=e=>o$.default.join(e,bJ),Pg=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,PJ),t$=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,wJ),r$=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,vJ=e=>({...e,estimateTokens:r$(e.estimateTokens),actualTokens:r$(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),_J=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},br=e=>{let t=s$(e);return Yl.default.existsSync(t)?Yl.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return _J(n)?[vJ(n)]:[]}catch{return[]}}):[]},Xl=(e,t)=>{Yl.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Yl.default.writeFileSync(s$(e),r,"utf8")},bg=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),WJ=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${bg(o.task)} | ${bg(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},wg=e=>{let t=br(e.reportsDir),r=Pg(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Xl(e.reportsDir,[...s,n])},iv=e=>{let t=br(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?Pg(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Xl(e.reportsDir,[...i,s])},LJ=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-n$),av=e=>[...br(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),i$=e=>{let t=br(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=t$(e.input),n=t$(e.output),s=Pg(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Xl(e.reportsDir,[...c,a])},lv=(e,t)=>{let r=br(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},a$=e=>({table:WJ(LJ(br(e))),embedding:null}),kJ=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},EJ=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-n$),CJ=e=>{let t=kJ(EJ(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${bg(s.task)} | ${bg(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},l$=e=>{let t=br(e.reportsDir),r=Pg(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Xl(e.reportsDir,[...s,n])},c$=e=>{let t=br(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Xl(e.reportsDir,[...s,n])},d$=e=>CJ(br(e))});var u$=l(()=>{"use strict";Zl()});var Pr,cv,RJ,dv,xJ,TJ,vg,_g,IJ,uv,p$=l(()=>{"use strict";u$();bw();Pr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cv=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},RJ=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${cv(-r)} under`:`${cv(r)} over`},dv=e=>e.toLocaleString("en-US"),xJ=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${dv(-r)} under`:`${dv(r)} over`},TJ=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},vg=e=>e===null?"\u2014":cv(e),_g=e=>e===null?"\u2014":dv(e),IJ=`(function () {
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
})();`,uv=e=>{let r=av(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":RJ(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":xJ(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${Pr(TJ(i))}</button></td>
        <td>${Pr(c)}</td>
        <td>${vg(n.estimateSeconds)}</td>
        <td>${vg(n.actualSeconds)}</td>
        <td>${Pr(d)}</td>
        <td>${_g(n.estimateTokens)}</td>
        <td>${_g(n.actualTokens)}</td>
        <td>${Pr(p)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${Pr(c)}</p>
        <h2>Input</h2>
        <pre>${Pr(i)}</pre>
        <h2>Output</h2>
        <pre>${Pr(a)}</pre>
        <p>Time: estimated ${vg(n.estimateSeconds)} \xB7 actual ${vg(n.actualSeconds)} \xB7 ${Pr(d)}</p>
        <p>Tokens: estimated ${_g(n.estimateTokens)} \xB7 actual ${_g(n.actualTokens)} \xB7 ${Pr(p)}</p>
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
        <script>${IJ}</script>`}
    </section>`}});var m$=l(()=>{"use strict";e$();p$()});var Us,OJ,MJ,pv,g$=l(()=>{"use strict";Us=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OJ=(e,t,r)=>{let o=Us(t),n=Us(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},MJ=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Us(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>OJ(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Us(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Us(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Us(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},pv=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(MJ).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var f$=l(()=>{"use strict";g$()});var Ql,h$,y$,mv,gv,fv,S$=l(()=>{"use strict";Ql=m(require("node:fs")),h$=m(require("node:path"));Za();Zp();y$=(e,t,r)=>hs({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,mv=(e,t,r)=>{let o=y$(e,t,r);if(o===null)return[];if(!Ql.default.existsSync(o))return[];let n=Ql.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},gv=e=>{let t=y$(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:dr(e.entry.prompt),output:dr(e.entry.output)};Ql.default.mkdirSync(h$.default.dirname(t),{recursive:!0}),Ql.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},fv=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var NJ,zJ,ec,Wg,hv=l(()=>{"use strict";NJ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),zJ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,ec=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=NJ(i.assistantOutput),d=c.length>0?`Assistant: ${zJ(c,t)}`:null,p=[a,d].filter(g=>g!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},Wg=e=>{let t=e.userMessage.trim(),r=ec({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Vt,tc,Av,jJ,DJ,yv,$J,bv,Lg,A$,b$,HJ,Bs,Pv,Sv,P$,FJ,w$,Gs,kg,rc,UJ,oc,wv,Eg,Cg,v$=l(()=>{"use strict";Vt=m(require("node:fs")),tc=m(require("node:path")),Av=require("node:crypto");hv();jJ="writer-sessions",DJ="active-index.json",yv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$J=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",bv=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},Lg=e=>{let t=tc.default.join(e.installDir,jJ);return Vt.default.mkdirSync(t,{recursive:!0}),t},A$=e=>tc.default.join(Lg(e),DJ),b$=(e,t)=>tc.default.join(Lg(e),`${t}.canonical.json`),HJ=(e,t)=>tc.default.join(Lg(e),`${t}.continuation.json`),Bs=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,Pv=e=>{let t=A$(e);if(!Vt.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Vt.default.readFileSync(t,"utf8"));if(!yv(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!yv(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!$J(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},Sv=(e,t)=>{Vt.default.writeFileSync(A$(e),JSON.stringify(t,null,2))},P$=(e,t)=>{Vt.default.writeFileSync(b$(e,t.sessionId),JSON.stringify(t,null,2))},FJ=(e,t)=>{Vt.default.writeFileSync(HJ(e,t.sessionId),JSON.stringify(t,null,2))},w$=(e,t)=>{let r=ec({turns:t.turns});FJ(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Gs=(e,t)=>{let r=b$(e,t);if(!Vt.default.existsSync(r))return null;try{let o=JSON.parse(Vt.default.readFileSync(r,"utf8"));return!yv(o)||typeof o.sessionId!="string"?null:o}catch{return null}},kg=(e,t=20)=>{let r=Lg(e),o=Vt.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Gs(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},rc=(e,t,r)=>{let o=bv(r);return Pv(e).entries.find(i=>Bs(i)===Bs({writerAgent:t,projectFolderPath:o}))?.sessionId??null},UJ=(e,t,r,o)=>{let n=Pv(e),s=Bs({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>Bs(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];Sv(e,{entries:i})},oc=(e,t,r)=>{let o=(0,Av.randomUUID)(),n=new Date().toISOString(),s=bv(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return P$(e,i),w$(e,i),UJ(e,t,s,o),o},wv=(e,t,r)=>{let o=rc(e,t,r);return o!==null?o:oc(e,t,r)},Eg=(e,t,r)=>{let o=bv(r),n=Pv(e);if(o===null&&r===void 0){Sv(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=Bs({writerAgent:t,projectFolderPath:o});Sv(e,{entries:n.entries.filter(i=>Bs(i)!==s)})},Cg=e=>{let t=wv(e.layout,e.writerAgent,e.projectFolderPath),r=Gs(e.layout,t);if(r===null)return;let o={id:(0,Av.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};P$(e.layout,n),w$(e.layout,n)}});var BJ,GJ,Rg,vv,_$=l(()=>{"use strict";BJ=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",GJ=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},Rg=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",vv=e=>{let t=Rg(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=BJ(r,e.userPromptCharacterCount),n=GJ({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var xg=l(()=>{"use strict";S$();v$();hv();_$()});var W$=l(()=>{"use strict";xu();Kn();Ky()});var L$=l(()=>{"use strict";wy()});var Ge,VJ,KJ,_v,Wv,Lv,k$=l(()=>{"use strict";W$();L$();Ge=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),VJ=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},KJ=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=na(o);return`value="${Ge(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${Ge(r)}"`},_v=(e,t,r,o,n)=>{let s=Tu[t];return`<label class="field">
          <span class="field-label">${Ge(o)} API key \u2014 ${Ge(VJ(e,t))} \xB7 <a class="field-link" href="${Ge(s.href)}" target="_blank" rel="noopener noreferrer">${Ge(s.label)}</a></span>
          <input class="input mono" type="password" name="${Ge(r)}" autocomplete="off" ${KJ(e,t,n)} />
        </label>`},Wv=(e,t,r,o)=>{let n=vu(e[t]?.model),s=new Set(wu[t].map(c=>c.value)),i=wu[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${Ge(c.value)}"${d}>${Ge(c.label)}</option>`}).join(""),a=n!==Ro&&!s.has(n)?`<option value="${Ge(n)}" selected>${Ge(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${Ge(o)}</span>
          <select class="input mono" name="${Ge(r)}">${i}${a}</select>
        </label>`},Lv=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Ge(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${_v(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${Wv(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${_v(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${Wv(e.secrets,"openai","openaiModel","OpenAI model")}
        ${_v(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${Wv(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var E$=l(()=>{"use strict";k$()});var Tg,C$,R$=l(()=>{"use strict";Tg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),C$=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${Tg(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${Tg(s.name)}</strong> <span class="muted mono">(${Tg(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${Tg(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var JJ,x$,T$,I$=l(()=>{"use strict";JJ=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,x$=e=>e.kind==="folder",T$=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&x$(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(x$(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(JJ)};return r(t)}});var O$,kv,M$=l(()=>{"use strict";O$=m(require("node:path")),kv=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${kv(r.children,t)}</ul>
            </details>
          </li>`;let o=O$.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var N$,to,YJ,XJ,nc,ZJ,Ev,z$=l(()=>{"use strict";om();N$=m(require("node:path"));R$();I$();M$();to=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YJ=()=>`(() => {
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

})();`,XJ=()=>`(() => {
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
})();`,nc=e=>{let t=ol({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=C$({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${to(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${to(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':ZJ(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${to(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${to(s)}" />
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
    <script>${YJ()}</script>
    <script>${XJ()}</script>`;return`${t}${r}${o}${c}${d}`},ZJ=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=T$(a.items.map(A=>({...A,relativePath:typeof A.relativePath=="string"&&A.relativePath.length>0?A.relativePath:N$.default.relative(a.sourceRoot,A.sourcePath).replaceAll("\\","/")}))),p=kv(d,to),g=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${to(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${to(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${g} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${to(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},Ev=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??p??a,A=t.sets[i];if(A===void 0)continue;let h=a.length>0?a:A.proposedSlug,y=g.length>0?g:A.proposedName,u=r.has(i),S=A.items.map(b=>({id:b.id,kind:b.kind,title:b.title,sourcePath:b.sourcePath,include:u}));s.push({slug:h,name:y,items:S})}return s}});var j$=l(()=>{"use strict";z$()});var QJ,Cv,D$=l(()=>{"use strict";lr();QJ=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[Ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},Cv=QJ});var e7,$$,H$=l(()=>{"use strict";lr();e7=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[Ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},$$=e7});var F$=l(()=>{"use strict"});var fn,t7,Rv,U$=l(()=>{"use strict";om();rA();fn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),t7=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,Rv=e=>{let t=e.flashError?`<div class="alert-error">${fn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${fn(e.flashMessage)}</div>`:"",r=ol({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${fn(t7(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,p=`<a class="btn btn-secondary btn-compact" href="${fn(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,g=bp(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${fn(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${fn(n.name)}</strong>
                  <span class="muted mono">${fn(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${p}${g}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var B$=l(()=>{"use strict";F$();oA();U$()});var Ig,G$=l(()=>{"use strict";Ig=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var q$,Lt,xv=l(()=>{"use strict";q$=m(require("node:path"));Ot();He();K();ue();qS();Lt=e=>{let t=$()?.layout.installDir??k();if(q$.default.basename(t)===Rt)return gt;let r=$(),o=r!==null?we(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):gt}});var Tv,V$=l(()=>{"use strict";Mt();xv();Tv=async e=>{let t=xe(e.installDir),r=t?.bundleVersion??null,o=Lt(t);try{let n=await Un(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:vo(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Iv,K$=l(()=>{"use strict";Iv=e=>!e});var Ov,qs,Mv=l(()=>{"use strict";K();Ov=()=>`http://127.0.0.1:${vh()}/update/run`,qs=async e=>{try{let t=await fetch(Ov(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var r7,J$,Nv,Y$=l(()=>{"use strict";K();te();Mv();r7=()=>{tr({launchAgentLabel:Pe(),installDir:k()})},J$=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Nv=async()=>{r7();let e=await qs({force:!0});if(e.ok)return{ok:!0,message:J$(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:J$(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Mt(),FE)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var zv=l(()=>{"use strict";Jb();G$();xv();V$();K$();Y$();Mv()});var X$,Z$=l(()=>{"use strict";X$=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var Q$,eH,jv,Dv,tH=l(()=>{"use strict";Q$=require("node:crypto"),eH=m(require("node:fs"));Dt();ue();ue();Z$();jv=!1,Dv=async e=>{if(jv)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!X$(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&eH.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,Q$.randomUUID)();jv=!0;try{if(await VS(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Yn({...r,workspace:n},e.writerAgent,t);return await _a(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{jv=!1}}});var rH=l(()=>{"use strict";tH()});var st,o7,oH,nH,$v,Hv,Fv,Uv,Bv,Gv,qv=l(()=>{"use strict";st=require("node:crypto"),o7=Buffer.from("302a300506032b6570032100","hex"),oH=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},nH=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,st.createPublicKey)({key:Buffer.concat([o7,t]),format:"der",type:"spki"})},$v=()=>{let{publicKey:e,privateKey:t}=(0,st.generateKeyPairSync)("ed25519");return{publicKeyRaw:oH(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Hv=e=>(0,st.createPrivateKey)(e),Fv=(e,t)=>(0,st.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),Uv=(e,t,r)=>{try{let o=nH(e);return(0,st.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},Bv=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,Gv=()=>(0,st.randomBytes)(32).toString("base64url")});var wr,Og,sH,n7,s7,Mg,Vv,Kv,iH=l(()=>{"use strict";wr=m(require("node:fs")),Og=m(require("node:path"));qv();K();He();sH=e=>Og.default.join(e.installDir,Rr),n7=(e,t)=>{if(e.profileEmail===null||t===sH(e)||wr.default.existsSync(t))return;let r=sH(e);wr.default.existsSync(r)&&(wr.default.mkdirSync(Og.default.dirname(t),{recursive:!0}),wr.default.renameSync(r,t))},s7=e=>{if(!wr.default.existsSync(e))return null;try{let t=wr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Mg=e=>{let t=Yd(e);n7(e,t);let r=s7(t);if(r!==null)return r;let o=$v();return wr.default.mkdirSync(Og.default.dirname(t),{recursive:!0}),wr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},Vv=e=>{let t=Mg(e.layout),r=Gv(),o=Bv({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=Hv(t.privateKeyPem),s=Fv(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Kv=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return Uv(e.serverPublicKey,t,e.serverAttestation)}});var Jv=l(()=>{"use strict";iH();qv()});var dH,sc,Zv,Qv,aH,i7,Yv,Ng,le,uH,a7,Xv,l7,c7,e_,pe,Ee,Kt,d7,lH,cH,ic,ac,pH=l(()=>{"use strict";dH=m(require("node:http")),sc=m(require("node:fs")),Zv=m(require("node:path"));zg();Ja();FT();BT();JT();as();Pb();qb();LI();EI();XD();QD();m$();f$();xg();E$();j$();No();Dt();lr();D$();H$();B$();zv();Mt();rH();ue();Jv();Qv=e=>cb(e)??"never",aH=48e3,i7=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,Yv=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??ip(),reveal:t.reveal,installed:Fr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Ng=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:os(t,e)},le=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uH=200,a7=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',Xv=e=>{let t=e.trim().slice(0,uH),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},l7=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${le(t)}</div>`,c7=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${le(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',e_={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},pe=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...e_}),e.end(JSON.stringify(r))},Ee=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},Kt=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},d7=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=a7(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${le(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=Iv(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${le(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${le(Qv(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${le(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},lH=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},cH=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,uH)},ic=e=>{let t=Zv.default.join(e.layout.installDir,"link-code.txt"),r=()=>xe(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:Ig(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let y=h.installVersion??r(),u=await i(),S=Qb(u),b=h.updateFlash??null,f=eP(b),w=l7(b,h.updateError??null);return Xb({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:Lt(y),installBundleVersionLabel:Ig(y),prependBody:`${f}${w}${S}`,headerUpdateButtonHtml:Zb(u)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let y=await Tv(e.layout);return s={cachedAtMs:h,offer:y},y},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:Xv("An update is already running.")}),h.end();return}c=!0;try{let u=await Nv(),S=u.ok?"/?update=ok":Xv(u.message);h.writeHead(303,{Location:S}),h.end()}catch(u){let S=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";h.writeHead(303,{Location:Xv(S)}),h.end()}finally{c=!1,a()}},p=async(h,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",S=o(),b=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:S.installVersion,body:`<section class="card">
      <h1>${le(y)}</h1>
      <p>${le(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(b)},g=()=>{if(sc.default.existsSync(t))return sc.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return sc.default.writeFileSync(t,h,"utf8"),h},A=dH.default.createServer((h,y)=>{(async()=>{let u=h.url?.split("?")[0]??"/",S=h.method??"GET";if(S==="OPTIONS"){y.writeHead(204,e_),y.end();return}if(!await nv({method:S,pathname:u,request:h,response:y,requestUrl:h.url??"/",storePath:ZD(Zv.default.dirname(e.layout.configPath)),readBody:Kt,sendHtml:Ee,renderShell:n})){if(S==="GET"&&u==="/health"){let b=e.controllers.getStatus(),f=o();pe(y,200,{ok:!0,...b,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/status"){let b=o();pe(y,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt});return}if(S==="GET"&&u==="/api/traffic"){pe(y,200,{entries:Va(e.layout)});return}if(S==="DELETE"&&u==="/api/traffic"||S==="POST"&&u==="/api/traffic/clear"){if(pb(e.layout),S==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}pe(y,200,{ok:!0});return}if(S==="GET"&&u==="/api/trace"){pe(y,200,{entries:Kp(e.layout)});return}if(S==="DELETE"&&u==="/api/trace"||S==="POST"&&u==="/api/trace/clear"){if(fb(e.layout),S==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}pe(y,200,{ok:!0});return}if(S==="POST"&&u==="/api/errors/clear"){hb(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(S==="GET"&&u==="/api/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let w=await Ss({layout:e.layout,query:f,limit:20});pe(y,200,{chunks:w,query:f});return}pe(y,200,{chunks:ys(e.layout).slice(-50).reverse()});return}if(S==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(S==="GET"&&u==="/api/update-status"){let b=await i();pe(y,200,{ok:!0,...b});return}if((S==="GET"||S==="POST")&&u==="/api/update"){await d(y);return}if(S==="GET"&&u==="/"){let b=e.controllers.getStatus(),f=o(),w=Fr(e.layout),v=Jp(e.layout.errorLogPath);Ee(y,await n({title:"Home",activePath:"/",installVersion:f.installVersion,updateFlash:lH(h.url??void 0),updateError:cH(h.url??void 0),body:tP({wsConnected:b.wsConnected,lastHeartbeatAt:b.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:ys(e.layout).length,trafficEntryCount:Va(e.layout).length,wakeError:b.wakeError,errorLogByteSize:v.byteSize,errorLogExists:v.exists})}));return}if(S==="GET"&&u==="/task"){let b=e.controllers.getStatus(),f=o(),w=$(),v=new URL(h.url??"/",`http://127.0.0.1:${43347}`),W=v.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,L=v.searchParams.get("failed")==="1"?v.searchParams.get("error")?.trim()??"Task failed.":null,E=v.searchParams.get("runId");Ee(y,await n({title:"Task",activePath:"/task",installVersion:f.installVersion,body:sv({defaultWorkspace:w?.workspace??"",wsConnected:b.wsConnected,flashMessage:W,flashError:L,lastRunId:E})}));return}if(S==="POST"&&u==="/task/dispatch"){let b=await Kt(h),f=new URLSearchParams(b),w=f.get("prompt")?.trim()??"",v=f.get("writerAgent")?.trim()??"claude-cli",W=f.get("projectFolder")?.trim()??"",L=await Dv({prompt:w,writerAgent:v,...W.length>0?{projectFolderPath:W}:{}}),E=new URLSearchParams;L.ok?E.set("ok","1"):(E.set("failed","1"),L.errorMessage!==void 0&&E.set("error",L.errorMessage.slice(0,240))),L.agentRunId!==void 0&&E.set("runId",L.agentRunId),y.writeHead(303,{Location:`/task?${E.toString()}`}),y.end();return}if(S==="GET"&&u==="/writer-sessions"){let b=o(),f=kg(e.layout,12);Ee(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:b.installVersion,updateFlash:lH(h.url??void 0),updateError:cH(h.url??void 0),body:pv({sessions:f})}));return}if(S==="GET"&&u==="/errors"){let b=o(),f=Jp(e.layout.errorLogPath);Ee(y,await n({title:"Errors",activePath:"/errors",installVersion:b.installVersion,body:Sb({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(S==="GET"&&u==="/status"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=e.controllers.getStatus(),w=We(e.layout),v=w!==null?je(w,12e4):wb(f.lastHeartbeatAt,12e4),W=vb({lastHeartbeatAt:f.lastHeartbeatAt,heartbeatIsStale:v}),L=o();Ee(y,await n({title:"Status",activePath:"/status",installVersion:L.installVersion,body:`${d7({status:f,healthBadge:W,revived:b.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:L.installBundleVersion,installBundleUpdatedAt:L.installBundleUpdatedAt})}${kb({installDir:e.layout.installDir})}${Wb({entries:Kp(e.layout)})}`}));return}if(S==="GET"&&u==="/traffic"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=Va(e.layout),w=o(),v=f.map(E=>`<tr><td title="${le(E.at)}">${le(Qv(E.at))}</td><td>${le(E.direction)}</td><td><code>${le(E.type)}</code></td><td>${le(E.summary)}</td><td>${le(E.action??"")}</td></tr>`).join(""),W=f.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${v}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',L=b.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Ee(y,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${L}
              ${W}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(S==="GET"&&u==="/projects"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=Lt(f.installVersion),v=await Ng(e.layout),W=b.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":b.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,L=b.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,E=$(),x=E===null?null:Y({wsUrl:E.wsUrl,pairingToken:E.pairingToken}),I=x===null?{}:Object.fromEntries((await Promise.all(v.projects.map(async M=>{let B=await Cv(x,M.id);return[M.id,B?.counts??null]}))).filter(M=>M[1]!==null));Ee(y,await n({title:"Projects",activePath:"/projects",installVersion:f.installVersion,body:Rv({projects:v.projects,compositionCountsByProjectId:I,cloudAppOrigin:w,syncMessage:v.message,syncOk:v.ok,flashMessage:L,flashError:W})}));return}if(S==="GET"&&u==="/projects/select-folder"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=$(),v=w===null?null:Y({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),W=f.length>0&&v!==null?Ur():null;if(W===null||v===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Ye({projectFolderPath:W}),!await Ea(v,f,W)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(f)}&folderUpdated=1`}),y.end();return}if(S==="POST"&&u==="/projects/delete"){let b=await Kt(h),f=new URLSearchParams(b).get("projectId")?.trim()??"",w=$(),v=w===null?null:Y({wsUrl:w.wsUrl,pairingToken:w.pairingToken});if(v===null||f.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let W=await cA(v,f);y.writeHead(303,{Location:W.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(S==="GET"&&u==="/project"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=b.searchParams.get("id")?.trim()??"",w=o(),v=Lt(w.installVersion),W=await Ng(e.layout),L=$o(W.projects,f);if(L===null){await p(y,"Project not found");return}let E=b.searchParams.get("linked")==="1"?b.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${b.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${b.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:b.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,x=b.searchParams.get("knowledgePromoted"),I=x!==null?`Marked ${x} lesson(s) as promoted in Agent Witch.`:null,M=b.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,B=b.searchParams.get("tab")?.trim()??"harness",q=B==="workflows"||B==="agents"||B==="knowledge"?B:"harness",F=$(),ct=F===null?null:Y({wsUrl:F.wsUrl,pairingToken:F.pairingToken}),H=ct===null?null:await Cv(ct,L.id),ge=0;if(ct!==null)try{let io=await fetch(`${ct.appOrigin}/api/agent-witch/projects/${encodeURIComponent(L.id)}/knowledge`,{method:"GET",headers:{[Ie]:ct.pairingToken},signal:AbortSignal.timeout(1e4)});if(io.ok){let Et=await io.json();typeof Et=="object"&&Et!==null&&typeof Et.candidateCount=="number"&&(ge=Et.candidateCount)}}catch{ge=0}Ee(y,await n({title:L.name,activePath:"/projects",installVersion:w.installVersion,body:ns({project:L,cloudAppOrigin:v,installed:Fr(e.layout),linkedSetSlugs:$r(L.projectFolderPath),composition:H,knowledgeCandidateCount:ge,activeTab:q,flashMessage:E??I,flashError:M})}));return}if(S==="POST"&&u==="/projects/pull-bound-harness"){let b=await Kt(h),f=await nA({rawBody:b,layout:e.layout});if(f.kind==="not_found"){await p(y,"Project not found");return}if(f.kind==="redirect"){y.writeHead(303,{Location:f.location}),y.end();return}let w=o();Ee(y,await n({title:f.title,activePath:"/projects",installVersion:w.installVersion,body:f.body}));return}if(S==="POST"&&u==="/projects/link-harness"){let b=await Kt(h),f=new URLSearchParams(b),w=f.get("projectId")?.trim()??"",v=await Ng(e.layout),W=$o(v.projects,w);if(W===null){await p(y,"Project not found");return}let L=f.getAll("applySet").map(q=>String(q)),E=fa({layout:e.layout,projectFolderPath:W.projectFolderPath,setSlugs:L});if(!E.ok){let q=o(),F=Lt(q.installVersion);Ee(y,await n({title:W.name,activePath:"/projects",installVersion:q.installVersion,body:ns({project:W,cloudAppOrigin:F,installed:Fr(e.layout),linkedSetSlugs:$r(W.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:E.errorMessage})}));return}let x=$(),I=x===null?null:Y({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),M=I===null?!1:await La(I,W.id,E.appliedSetSlugs),B=new URLSearchParams({linked:"1",files:String(E.writtenFileCount),bindingsSynced:M?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(W.id)}&${B.toString()}`}),y.end();return}if(S==="POST"&&u==="/project/knowledge/promote-all"){let b=await Kt(h),w=new URLSearchParams(b).get("projectId")?.trim()??"",v=await Ng(e.layout),W=$o(v.projects,w);if(W===null){await p(y,"Project not found");return}let L=$(),E=L===null?null:Y({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),x=E===null?{ok:!1,promotedCount:0}:await $$(E,W.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(W.id)}&${I.toString()}`}),y.end();return}if(S==="GET"&&u==="/harness"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),f=o(),w=Aa(e.layout),v=b.searchParams.get("submitted")==="1",W=v?b.searchParams.get("syncFailed")==="1"?`Local harness updated (${b.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:b.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${b.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":b.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:b.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,L=w?.scanRoots[0]??ip(),E=i7(e.layout,{reveal:w,importQuery:b.searchParams.get("import")==="1",justSubmitted:v}),x=Lt(f.installVersion);Ee(y,await n({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:nc(Yv(e.layout,{cloudAppOrigin:x,reveal:w,scanFolder:L,flashMessage:W,importSectionExpanded:E}))}));return}if(S==="POST"&&u==="/api/harness/pick-folder"){let b=Ur();if(b===null){pe(y,200,{cancelled:!0});return}pe(y,200,{path:b});return}if(S==="GET"&&u==="/api/harness/file-content"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=ga(f);if(w===null){pe(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let v=sc.default.readFileSync(w,"utf8"),W=v.length>aH?`${v.slice(0,aH)}
\u2026 (truncated)`:v;pe(y,200,{content:W})}catch{pe(y,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&u==="/api/harness/reveal/add-project"){let b=await Kt(h),f="";try{let W=JSON.parse(b);typeof W=="object"&&W!==null&&typeof W.projectPath=="string"&&(f=W.projectPath.trim())}catch{pe(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){pe(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=Aa(e.layout),v=NS({reveal:w,projectPath:f});if(v===null||v.sets.length===0){pe(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}dp(e.layout,v),pe(y,200,{ok:!0,setCount:v.sets.length});return}if(S==="GET"&&u==="/api/harness/reveal/stream"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){pe(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;h.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...e_});let v=zS({scanRoot:f,response:y,shouldAbort:()=>w});dp(e.layout,v),y.end();return}if(S==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&u==="/harness/submit"){let b=Aa(e.layout);if(b===null){let x=o(),I=Lt(x.installVersion);Ee(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:nc(Yv(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let f=await Kt(h),w=new URLSearchParams(f),v=Ev(w,b),W=DS({layout:e.layout,sets:v});if(!W.ok){let x=o(),I=Lt(x.installVersion);Ee(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:nc(Yv(e.layout,{cloudAppOrigin:I,reveal:b,flashError:W.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}HS(e.layout);let E=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${W.writtenItemCount??0}${E}`}),y.end();return}if(S==="GET"&&u==="/writer-api"){let b=new URL(h.url??"/",`http://127.0.0.1:${43347}`),w=$()?.writerExecutionBackend??Te(void 0),v=ve(e.layout.configPath),W=Nr(v),L=b.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,E=o();Ee(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:E.installVersion,body:Lv({writerExecutionBackend:w,secrets:W,flashMessage:L})}));return}if(S==="POST"&&u==="/writer-api"){let b=await Kt(h),f=new URLSearchParams(b),w=f.get("writerExecutionBackend")?.trim()??"cli";Vy({configPath:e.layout.configPath,writerExecutionBackend:Te(w),anthropicApiKey:f.get("anthropicApiKey")??void 0,anthropicModel:f.get("anthropicModel")??void 0,openaiApiKey:f.get("openaiApiKey")??void 0,openaiModel:f.get("openaiModel")??void 0,googleApiKey:f.get("googleApiKey")??void 0,googleModel:f.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(S==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(S==="GET"&&u==="/history"){let b=o();Ee(y,await n({title:"History",activePath:"/history",installVersion:b.installVersion,body:uv({reportsDir:e.layout.reportsDir})}));return}if(S==="GET"&&u==="/knowledge"){let f=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),v=Ob({layout:e.layout}),W=zb(v),L=f.length>0?await Ss({layout:e.layout,query:f,limit:20}):ys(e.layout).slice(-50).reverse(),E=L.map(I=>{let M=Nb(v,I.id),B=M>0?` \xB7 used in ${M} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${le(I.createdAt)}">${le(Qv(I.createdAt))}${I.source?` \xB7 ${le(I.source)}`:""}${B}</div><pre>${le(I.text)}</pre></article>`}).join(""),x=W.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${W.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${le(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Ee(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${le(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${x}${E}${c7(f,L.length)}`}));return}S==="POST"&&await Kt(h),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return A.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)}),A.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${or}`)}),A},ac=e=>Mg(e).publicKeyRaw});var zg=l(()=>{"use strict";LT();kT();pH()});var gH={};Ct(gH,{runAgentWitchExternalLiveCli:()=>p7});var t_,mH,u7,p7,fH=l(()=>{"use strict";t_=m(require("node:fs")),mH=m(require("node:path"));as();K();te();zg();te();u7=e=>{let t=mH.default.join(e,"link-code.txt");if(!t_.default.existsSync(t))return null;let r=t_.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},p7=()=>{Ve("agent-witch-live");let e=k(),t=N(),r=u7(e),o=ac(t);ic({layout:t,controllers:{getStatus:()=>{let n=We(t);return{wsConnected:za(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{So(e)}}})}});var vr=_((c0e,SH)=>{"use strict";var hH=["nodebuffer","arraybuffer","fragments"],yH=typeof Blob<"u";yH&&hH.push("blob");SH.exports={BINARY_TYPES:hH,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:yH,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var lc=_((d0e,jg)=>{"use strict";var{EMPTY_BUFFER:m7}=vr(),r_=Buffer[Symbol.species];function g7(e,t){if(e.length===0)return m7;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new r_(r.buffer,r.byteOffset,o):r}function AH(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function bH(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function f7(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function o_(e){if(o_.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new r_(e):ArrayBuffer.isView(e)?t=new r_(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),o_.readOnly=!1),t}jg.exports={concat:g7,mask:AH,toArrayBuffer:f7,toBuffer:o_,unmask:bH};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");jg.exports.mask=function(t,r,o,n,s){s<48?AH(t,r,o,n,s):e.mask(t,r,o,n,s)},jg.exports.unmask=function(t,r){t.length<32?bH(t,r):e.unmask(t,r)}}catch{}});var vH=_((u0e,wH)=>{"use strict";var PH=Symbol("kDone"),n_=Symbol("kRun"),s_=class{constructor(t){this[PH]=()=>{this.pending--,this[n_]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[n_]()}[n_](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[PH])}}};wH.exports=s_});var Js=_((p0e,kH)=>{"use strict";var cc=require("zlib"),_H=lc(),h7=vH(),{kStatusCode:WH}=vr(),y7=Buffer[Symbol.species],S7=Buffer.from([0,0,255,255]),$g=Symbol("permessage-deflate"),_r=Symbol("total-length"),Vs=Symbol("callback"),ro=Symbol("buffers"),Ks=Symbol("error"),Dg,i_=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Dg){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Dg=new h7(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Vs];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){Dg.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){Dg.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?cc.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=cc.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[$g]=this,this._inflate[_r]=0,this._inflate[ro]=[],this._inflate.on("error",b7),this._inflate.on("data",LH)}this._inflate[Vs]=o,this._inflate.write(t),r&&this._inflate.write(S7),this._inflate.flush(()=>{let s=this._inflate[Ks];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=_H.concat(this._inflate[ro],this._inflate[_r]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[_r]=0,this._inflate[ro]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?cc.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=cc.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[_r]=0,this._deflate[ro]=[],this._deflate.on("data",A7)}this._deflate[Vs]=o,this._deflate.write(t),this._deflate.flush(cc.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=_H.concat(this._deflate[ro],this._deflate[_r]);r&&(s=new y7(s.buffer,s.byteOffset,s.length-4)),this._deflate[Vs]=null,this._deflate[_r]=0,this._deflate[ro]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};kH.exports=i_;function A7(e){this[ro].push(e),this[_r]+=e.length}function LH(e){if(this[_r]+=e.length,this[$g]._maxPayload<1||this[_r]<=this[$g]._maxPayload){this[ro].push(e);return}this[Ks]=new RangeError("Max payload size exceeded"),this[Ks].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Ks][WH]=1009,this.removeListener("data",LH),this.reset()}function b7(e){if(this[$g]._inflate=null,this[Ks]){this[Vs](this[Ks]);return}e[WH]=1007,this[Vs](e)}});var Ys=_((m0e,Hg)=>{"use strict";var{isUtf8:EH}=require("buffer"),{hasBlob:P7}=vr(),w7=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function v7(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function a_(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function _7(e){return P7&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Hg.exports={isBlob:_7,isValidStatusCode:v7,isValidUTF8:a_,tokenChars:w7};if(EH)Hg.exports.isValidUTF8=function(e){return e.length<24?a_(e):EH(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Hg.exports.isValidUTF8=function(t){return t.length<32?a_(t):e(t)}}catch{}});var p_=_((g0e,MH)=>{"use strict";var{Writable:W7}=require("stream"),CH=Js(),{BINARY_TYPES:L7,EMPTY_BUFFER:RH,kStatusCode:k7,kWebSocket:E7}=vr(),{concat:l_,toArrayBuffer:C7,unmask:R7}=lc(),{isValidStatusCode:x7,isValidUTF8:xH}=Ys(),Fg=Buffer[Symbol.species],it=0,TH=1,IH=2,OH=3,c_=4,d_=5,Ug=6,u_=class extends W7{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||L7[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[E7]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=it}_write(t,r,o){if(this._opcode===8&&this._state==it)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new Fg(o.buffer,o.byteOffset+t,o.length-t),new Fg(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new Fg(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case it:this.getInfo(t);break;case TH:this.getPayloadLength16(t);break;case IH:this.getPayloadLength64(t);break;case OH:this.getMask();break;case c_:this.getData(t);break;case d_:case Ug:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[CH.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=TH:this._payloadLength===127?this._state=IH:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=OH:this._state=c_}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=c_}getData(t){let r=RH;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&R7(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=d_,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[CH.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===it&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=it;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=l_(o,r):this._binaryType==="arraybuffer"?n=C7(l_(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=it):(this._state=Ug,setImmediate(()=>{this.emit("message",n,!0),this._state=it,this.startLoop(t)}))}else{let n=l_(o,r);if(!this._skipUTF8Validation&&!xH(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===d_||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=it):(this._state=Ug,setImmediate(()=>{this.emit("message",n,!1),this._state=it,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,RH),this.end();else{let o=t.readUInt16BE(0);if(!x7(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new Fg(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!xH(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=it;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=it):(this._state=Ug,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=it,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[k7]=n,i}};MH.exports=u_});var f_=_((h0e,jH)=>{"use strict";var{Duplex:f0e}=require("stream"),{randomFillSync:T7}=require("crypto"),{types:{isUint8Array:I7}}=require("util"),NH=Js(),{EMPTY_BUFFER:O7,kWebSocket:M7,NOOP:N7}=vr(),{isBlob:Xs,isValidStatusCode:z7}=Ys(),{mask:zH,toBuffer:hn}=lc(),at=Symbol("kByteLength"),j7=Buffer.alloc(4),Bg=8*1024,yn,Zs=Bg,kt=0,D7=1,$7=2,m_=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=kt,this.onerror=N7,this[M7]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||j7,r.generateMask?r.generateMask(o):(Zs===Bg&&(yn===void 0&&(yn=Buffer.alloc(Bg)),T7(yn,0,Bg),Zs=0),o[0]=yn[Zs++],o[1]=yn[Zs++],o[2]=yn[Zs++],o[3]=yn[Zs++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[at]!==void 0?a=r[at]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(zH(t,o,d,s,a),[d]):(zH(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=O7;else{if(typeof t!="number"||!z7(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(I7(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[at]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==kt?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Xs(t)?(n=t.size,s=!1):(t=hn(t),n=t.length,s=hn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[at]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Xs(t)?this._state!==kt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==kt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Xs(t)?(n=t.size,s=!1):(t=hn(t),n=t.length,s=hn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[at]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Xs(t)?this._state!==kt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==kt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[NH.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Xs(t)?(a=t.size,c=!1):(t=hn(t),a=t.length,c=hn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[at]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Xs(t)?this._state!==kt?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==kt?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[at],this._state=$7,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(g_,this,a,n);return}this._bufferedBytes-=o[at];let i=hn(s);r?this.dispatch(i,r,o,n):(this._state=kt,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(H7,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[NH.extensionName];this._bufferedBytes+=o[at],this._state=D7,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");g_(this,c,n);return}this._bufferedBytes-=o[at],this._state=kt,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===kt&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][at],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][at],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};jH.exports=m_;function g_(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function H7(e,t,r){g_(e,t,r),e.onerror(t)}});var VH=_((y0e,qH)=>{"use strict";var{kForOnEventAttribute:dc,kListener:h_}=vr(),DH=Symbol("kCode"),$H=Symbol("kData"),HH=Symbol("kError"),FH=Symbol("kMessage"),UH=Symbol("kReason"),Qs=Symbol("kTarget"),BH=Symbol("kType"),GH=Symbol("kWasClean"),Wr=class{constructor(t){this[Qs]=null,this[BH]=t}get target(){return this[Qs]}get type(){return this[BH]}};Object.defineProperty(Wr.prototype,"target",{enumerable:!0});Object.defineProperty(Wr.prototype,"type",{enumerable:!0});var Sn=class extends Wr{constructor(t,r={}){super(t),this[DH]=r.code===void 0?0:r.code,this[UH]=r.reason===void 0?"":r.reason,this[GH]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[DH]}get reason(){return this[UH]}get wasClean(){return this[GH]}};Object.defineProperty(Sn.prototype,"code",{enumerable:!0});Object.defineProperty(Sn.prototype,"reason",{enumerable:!0});Object.defineProperty(Sn.prototype,"wasClean",{enumerable:!0});var ei=class extends Wr{constructor(t,r={}){super(t),this[HH]=r.error===void 0?null:r.error,this[FH]=r.message===void 0?"":r.message}get error(){return this[HH]}get message(){return this[FH]}};Object.defineProperty(ei.prototype,"error",{enumerable:!0});Object.defineProperty(ei.prototype,"message",{enumerable:!0});var uc=class extends Wr{constructor(t,r={}){super(t),this[$H]=r.data===void 0?null:r.data}get data(){return this[$H]}};Object.defineProperty(uc.prototype,"data",{enumerable:!0});var F7={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[dc]&&n[h_]===t&&!n[dc])return;let o;if(e==="message")o=function(s,i){let a=new uc("message",{data:i?s:s.toString()});a[Qs]=this,Gg(t,this,a)};else if(e==="close")o=function(s,i){let a=new Sn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Qs]=this,Gg(t,this,a)};else if(e==="error")o=function(s){let i=new ei("error",{error:s,message:s.message});i[Qs]=this,Gg(t,this,i)};else if(e==="open")o=function(){let s=new Wr("open");s[Qs]=this,Gg(t,this,s)};else return;o[dc]=!!r[dc],o[h_]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[h_]===t&&!r[dc]){this.removeListener(e,r);break}}};qH.exports={CloseEvent:Sn,ErrorEvent:ei,Event:Wr,EventTarget:F7,MessageEvent:uc};function Gg(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var qg=_((S0e,KH)=>{"use strict";var{tokenChars:pc}=Ys();function Jt(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function U7(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(p===-1&&pc[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);d===44?(Jt(t,h,r),r=Object.create(null)):i=h,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(p===-1&&pc[d]===1)c===-1&&(c=g);else if(d===32||d===9)p===-1&&c!==-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g),Jt(r,e.slice(c,p),!0),d===44&&(Jt(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,g),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(pc[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(pc[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,p=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(p===-1&&pc[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))p===-1&&(p=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);p===-1&&(p=g);let h=e.slice(c,p);o&&(h=h.replace(/\\/g,""),o=!1),Jt(r,a,h),d===44&&(Jt(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=g);let A=e.slice(c,p);return i===void 0?Jt(t,A,r):(a===void 0?Jt(r,A,!0):o?Jt(r,a,A.replace(/\\/g,"")):Jt(r,a,A),Jt(t,i,r)),t}function B7(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}KH.exports={format:B7,parse:U7}});var Yg=_((P0e,iF)=>{"use strict";var G7=require("events"),q7=require("https"),V7=require("http"),XH=require("net"),K7=require("tls"),{randomBytes:J7,createHash:Y7}=require("crypto"),{Duplex:A0e,Readable:b0e}=require("stream"),{URL:y_}=require("url"),oo=Js(),X7=p_(),Z7=f_(),{isBlob:Q7}=Ys(),{BINARY_TYPES:JH,CLOSE_TIMEOUT:e9,EMPTY_BUFFER:Vg,GUID:t9,kForOnEventAttribute:S_,kListener:r9,kStatusCode:o9,kWebSocket:be,NOOP:ZH}=vr(),{EventTarget:{addEventListener:n9,removeEventListener:s9}}=VH(),{format:i9,parse:a9}=qg(),{toBuffer:l9}=lc(),QH=Symbol("kAborted"),A_=[8,13],Lr=["CONNECTING","OPEN","CLOSING","CLOSED"],c9=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,X=class e extends G7{constructor(t,r,o){super(),this._binaryType=JH[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Vg,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),eF(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){JH.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new X7({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new Z7(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[be]=this,s[be]=this,t[be]=this,n.on("conclude",p9),n.on("drain",m9),n.on("error",g9),n.on("message",f9),n.on("ping",h9),n.on("pong",y9),s.onerror=S9,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",oF),t.on("data",Jg),t.on("end",nF),t.on("error",sF),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[oo.extensionName]&&this._extensions[oo.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){tt(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,rF(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){b_(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Vg,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){b_(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Vg,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){b_(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[oo.extensionName]||(n.compress=!1),this._sender.send(t||Vg,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){tt(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(X,"CONNECTING",{enumerable:!0,value:Lr.indexOf("CONNECTING")});Object.defineProperty(X.prototype,"CONNECTING",{enumerable:!0,value:Lr.indexOf("CONNECTING")});Object.defineProperty(X,"OPEN",{enumerable:!0,value:Lr.indexOf("OPEN")});Object.defineProperty(X.prototype,"OPEN",{enumerable:!0,value:Lr.indexOf("OPEN")});Object.defineProperty(X,"CLOSING",{enumerable:!0,value:Lr.indexOf("CLOSING")});Object.defineProperty(X.prototype,"CLOSING",{enumerable:!0,value:Lr.indexOf("CLOSING")});Object.defineProperty(X,"CLOSED",{enumerable:!0,value:Lr.indexOf("CLOSED")});Object.defineProperty(X.prototype,"CLOSED",{enumerable:!0,value:Lr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(X.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(X.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[S_])return t[r9];return null},set(t){for(let r of this.listeners(e))if(r[S_]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[S_]:!0})}})});X.prototype.addEventListener=n9;X.prototype.removeEventListener=s9;iF.exports=X;function eF(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:e9,protocolVersion:A_[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!A_.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${A_.join(", ")})`);let s;if(t instanceof y_)s=t;else try{s=new y_(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;Kg(e,u);return}let d=i?443:80,p=J7(16).toString("base64"),g=i?q7.request:V7.request,A=new Set,h;if(n.createConnection=n.createConnection||(i?u9:d9),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(h=new oo({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=i9({[oo.extensionName]:h.offer()})),r.length){for(let u of r){if(typeof u!="string"||!c9.test(u)||A.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");A.add(u)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let u=n.path.split(":");n.socketPath=u[0],n.path=u[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let u=o&&o.headers;if(o={...o,headers:{}},u)for(let[S,b]of Object.entries(u))o.headers[S.toLowerCase()]=b}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,u||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=g(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=g(n);n.timeout&&y.on("timeout",()=>{tt(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[QH]||(y=e._req=null,Kg(e,u))}),y.on("response",u=>{let S=u.headers.location,b=u.statusCode;if(S&&n.followRedirects&&b>=300&&b<400){if(++e._redirects>n.maxRedirects){tt(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new y_(S,t)}catch{let v=new SyntaxError(`Invalid URL: ${S}`);Kg(e,v);return}eF(e,f,r,o)}else e.emit("unexpected-response",y,u)||tt(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,S,b)=>{if(e.emit("upgrade",u),e.readyState!==X.CONNECTING)return;y=e._req=null;let f=u.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){tt(e,S,"Invalid Upgrade header");return}let w=Y7("sha1").update(p+t9).digest("base64");if(u.headers["sec-websocket-accept"]!==w){tt(e,S,"Invalid Sec-WebSocket-Accept header");return}let v=u.headers["sec-websocket-protocol"],W;if(v!==void 0?A.size?A.has(v)||(W="Server sent an invalid subprotocol"):W="Server sent a subprotocol but none was requested":A.size&&(W="Server sent no subprotocol"),W){tt(e,S,W);return}v&&(e._protocol=v);let L=u.headers["sec-websocket-extensions"];if(L!==void 0){if(!h){tt(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let E;try{E=a9(L)}catch{tt(e,S,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(E);if(x.length!==1||x[0]!==oo.extensionName){tt(e,S,"Server indicated an extension that was not requested");return}try{h.accept(E[oo.extensionName])}catch{tt(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[oo.extensionName]=h}e.setSocket(S,b,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Kg(e,t){e._readyState=X.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function d9(e){return e.path=e.socketPath,XH.connect(e)}function u9(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=XH.isIP(e.host)?"":e.host),K7.connect(e)}function tt(e,t,r){e._readyState=X.CLOSING;let o=new Error(r);Error.captureStackTrace(o,tt),t.setHeader?(t[QH]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Kg,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function b_(e,t,r){if(t){let o=Q7(t)?t.size:l9(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Lr[e.readyState]})`);process.nextTick(r,o)}}function p9(e,t){let r=this[be];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[be]!==void 0&&(r._socket.removeListener("data",Jg),process.nextTick(tF,r._socket),e===1005?r.close():r.close(e,t))}function m9(){let e=this[be];e.isPaused||e._socket.resume()}function g9(e){let t=this[be];t._socket[be]!==void 0&&(t._socket.removeListener("data",Jg),process.nextTick(tF,t._socket),t.close(e[o9])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function YH(){this[be].emitClose()}function f9(e,t){this[be].emit("message",e,t)}function h9(e){let t=this[be];t._autoPong&&t.pong(e,!this._isServer,ZH),t.emit("ping",e)}function y9(e){this[be].emit("pong",e)}function tF(e){e.resume()}function S9(e){let t=this[be];t.readyState!==X.CLOSED&&(t.readyState===X.OPEN&&(t._readyState=X.CLOSING,rF(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function rF(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function oF(){let e=this[be];if(this.removeListener("close",oF),this.removeListener("data",Jg),this.removeListener("end",nF),e._readyState=X.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[be]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",YH),e._receiver.on("finish",YH))}function Jg(e){this[be]._receiver.write(e)||this.pause()}function nF(){let e=this[be];e._readyState=X.CLOSING,e._receiver.end(),this.end()}function sF(){let e=this[be];this.removeListener("error",sF),this.on("error",ZH),e&&(e._readyState=X.CLOSING,this.destroy())}});var dF=_((v0e,cF)=>{"use strict";var w0e=Yg(),{Duplex:A9}=require("stream");function aF(e){e.emit("close")}function b9(){!this.destroyed&&this._writableState.finished&&this.destroy()}function lF(e){this.removeListener("error",lF),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function P9(e,t){let r=!0,o=new A9({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(aF,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(aF,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",b9),o.on("error",lF),o}cF.exports=P9});var P_=_((_0e,uF)=>{"use strict";var{tokenChars:w9}=Ys();function v9(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&w9[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}uF.exports={parse:v9}});var SF=_((L0e,yF)=>{"use strict";var _9=require("events"),Xg=require("http"),{Duplex:W0e}=require("stream"),{createHash:W9}=require("crypto"),pF=qg(),An=Js(),L9=P_(),k9=Yg(),{CLOSE_TIMEOUT:E9,GUID:C9,kWebSocket:R9}=vr(),x9=/^[+/0-9A-Za-z]{22}==$/,mF=0,gF=1,hF=2,w_=class extends _9{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:E9,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:k9,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Xg.createServer((o,n)=>{let s=Xg.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=T9(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=mF}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===hF){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(mc,this);return}if(t&&this.once("close",t),this._state!==gF)if(this._state=gF,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(mc,this):process.nextTick(mc,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{mc(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",fF);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){bn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){bn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!x9.test(s)){bn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){bn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){gc(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=L9.parse(c)}catch{bn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&p!==void 0){let A=new An({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let h=pF.parse(p);h[An.extensionName]&&(A.accept(h[An.extensionName]),g[An.extensionName]=A)}catch{bn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let A={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(A,(h,y,u,S)=>{if(!h)return gc(r,y||401,u,S);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(A))return gc(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[R9])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>mF)return gc(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${W9("sha1").update(r+C9).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),p._protocol=g)}if(t[An.extensionName]){let g=t[An.extensionName].params,A=pF.format({[An.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${A}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",fF),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(mc,this)})),a(p,n)}};yF.exports=w_;function T9(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function mc(e){e._state=hF,e.emit("close")}function fF(){this.destroy()}function gc(e,t,r,o){r=r||Xg.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Xg.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function bn(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,bn),e.emit("wsClientError",i,r,t)}else gc(r,o,n,s)}});var I9,O9,M9,N9,z9,j9,AF,D9,fc,bF=l(()=>{I9=m(dF(),1),O9=m(qg(),1),M9=m(Js(),1),N9=m(p_(),1),z9=m(f_(),1),j9=m(P_(),1),AF=m(Yg(),1),D9=m(SF(),1),fc=AF.default});var v_,__,W_=l(()=>{"use strict";v_="AGENT_WITCH_EXTERNAL_BRIDGE",__="AGENT_WITCH_EXTERNAL_LIVE"});var L_,PF=l(()=>{"use strict";L_=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var $9,k_,wF=l(()=>{"use strict";W_();PF();$9=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",k_=(e={})=>{let t=e.env??process.env,r=L_(t[v_]),o=L_(t[__]);return{mode:$9(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var vF=l(()=>{"use strict";W_()});var _F=l(()=>{"use strict";wF();vF()});var E_=l(()=>{"use strict"});var kr,hc=l(()=>{"use strict";kr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var ti,Pn,WF,F9,C_,R_,LF,kF,x_,EF,yc,T_=l(()=>{"use strict";ti=m(require("node:fs")),Pn=m(require("node:os")),WF=m(require("node:path"));E_();hc();F9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),C_=(e=Pn.default.hostname())=>WF.default.join(Pn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),R_=e=>{if(!ti.default.existsSync(e))return null;try{let t=JSON.parse(ti.default.readFileSync(e,"utf8"));return!F9(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},LF=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},kF=(e,t)=>{ti.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},x_=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??C_(),o=R_(r);if(o!==null&&o.pid!==process.pid&&kr(o.pid)&&LF(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Pn.default.hostname(),macOsUsername:Pn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return kF(r,n),{ok:!0}},EF=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??C_(),o=R_(r);return o!==null&&o.pid!==process.pid&&kr(o.pid)&&LF(o)?{ok:!1}:(kF(r,{hostname:Pn.default.hostname(),macOsUsername:Pn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},yc=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??C_();R_(r)?.pid===process.pid&&ti.default.existsSync(r)&&ti.default.unlinkSync(r)}});var I_,Sc,U9,B9,G9,q9,O_,CF=l(()=>{"use strict";I_=require("node:child_process"),Sc=m(require("node:path"));hc();su();U9=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),B9=(e,t)=>{if(U9(e)||!/\bnode\b/.test(e))return!1;let r=Sc.default.resolve(t),o=Sc.default.join(r,"app",Ei),n=Sc.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Ei||i==="agent-witch.ts")return e.includes(r);try{let a=Sc.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},G9=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,I_.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},q9=(e,t,r)=>{let o=G9(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||B9(d,t)&&n.push(c)}return n},O_=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,I_.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=q9(r,e.installDir,t),n=[];for(let s of o)if(kr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var Ac,bc,RF,V9,M_,xF=l(()=>{"use strict";Ac=m(require("node:fs")),bc=m(require("node:path"));Re();RF=(e,t)=>{!Ac.default.existsSync(e)||Ac.default.existsSync(t)||(Ac.default.mkdirSync(bc.default.dirname(t),{recursive:!0}),Ac.default.renameSync(e,t))},V9=e=>{if(e.profileEmail===null)return;let t=bc.default.join(e.installDir,dt);RF(bc.default.join(t,kn),e.mainLogPath),RF(bc.default.join(t,En),e.errorLogPath)},M_=e=>{let t=N();e!==void 0&&t.installDir!==e||V9(t)}});var TF=l(()=>{"use strict";Ba();qp();qp();!Ke()&&wo(__agentWitchImportMetaUrl)&&(async()=>{Ve("agent-witch-wake-server");let e=await Bo(),t=rr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var IF=l(()=>{"use strict";TF()});var OF=l(()=>{"use strict";Ra()});var N_,MF=l(()=>{"use strict";E_();IF();T_();OF();N_=async(e={})=>{let t=e.skipInProcessBridge?null:await Gp();_p();let r=setInterval(()=>{_p()},6e4),o=setInterval(()=>{if(!EF().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Pc,Zg,Y9,NF,zF,Qg,jF,DF,z_,$F,ef,HF=l(()=>{"use strict";Pc=m(require("node:fs")),Zg=m(require("node:path")),Y9="pending-run-inputs.json",NF=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zF=e=>{let t=e.profileEmail?Zg.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Zg.default.join(t,Y9)},Qg=e=>{let t=zF(e);if(!Pc.default.existsSync(t))return{};try{let r=JSON.parse(Pc.default.readFileSync(t,"utf8"));return NF(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!NF(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},jF=(e,t)=>{let r=zF(e);Pc.default.mkdirSync(Zg.default.dirname(r),{recursive:!0}),Pc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},DF=e=>Object.values(Qg(e)),z_=(e,t)=>Qg(e)[t]!==void 0,$F=(e,t)=>{let r=Qg(e);r[t.agentRunId]=t,jF(e,r)},ef=(e,t)=>{let r=Qg(e);delete r[t],jF(e,r)}});var tf=l(()=>{"use strict";ue()});var FF=l(()=>{"use strict";ue()});var rf=l(()=>{"use strict";ue()});var of=l(()=>{"use strict";ue()});var wc=l(()=>{"use strict";ue()});var X9,Z9,vc,j_=l(()=>{"use strict";ht();tf();FF();rf();of();wc();X9={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},Z9={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},vc=e=>{if(!ce(e.writerAgent))return"the selected writer";let t=Je(e.writerAgent);if(Te(e.writerExecutionBackend)==="api"&&t!==null){let r=Fe(ve(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Yi(t,r.model);return`${Z9[t]} model ${o}`}}return X9[e.writerAgent]}});var Q9,eY,UF,BF,GF=l(()=>{"use strict";Q9=/"input_tokens"\s*:\s*(\d+)/,eY=/"output_tokens"\s*:\s*(\d+)/,UF=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},BF=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=UF(Q9.exec(t)),o=UF(eY.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var nf=l(()=>{"use strict";Dt()});var _c,sf,tY,D_,qF,VF,KF,$_,JF=l(()=>{"use strict";_c=m(require("node:fs")),sf=m(require("node:path"));nf();tY="run-completion-outbox.json",D_=e=>{let t=e.profileEmail?sf.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return sf.default.join(t,tY)},qF=e=>{let t=D_(e);if(!_c.default.existsSync(t))return[];try{let r=JSON.parse(_c.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},VF=(e,t)=>{_c.default.mkdirSync(sf.default.dirname(D_(e)),{recursive:!0}),_c.default.writeFileSync(D_(e),JSON.stringify(t,null,2),"utf8")},KF=(e,t)=>{let r=[...qF(e).filter(o=>o.runId!==t.runId),t];VF(e,r)},$_=async e=>{if(e.cloudApi===null)return;let t=qF(e.layout);if(t.length===0)return;let r=[];for(let o of t)await _a(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);VF(e.layout,r)}});var YF=l(()=>{"use strict"});var H_,Wc,oY,wn,XF=l(()=>{"use strict";YF();H_=new Map,Wc=e=>{let t=H_.get(e);t!==void 0&&(clearInterval(t),H_.delete(e))},oY=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},wn=(e,t,r,o={})=>{Wc(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Wc(t);return}let i=o.onTick?.()??{};oY(e,t,n,i)};s(),H_.set(t,setInterval(s,15e3))}});var ZF=l(()=>{"use strict";Dt()});var QF,e1=l(()=>{"use strict";ZF();QF=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:rt(t)}});var F_,Lc,Er,U_,Yt,t1,af=l(()=>{"use strict";F_=new Set,Lc=new Map,Er=(e,t)=>{if(t.length===0)return;let r=Lc.get(e)??[];r.push(t),Lc.set(e,r)},U_=e=>{F_.add(e);let t=Lc.get(e)??[];return Lc.delete(e),t},Yt=e=>F_.has(e),t1=e=>{F_.delete(e),Lc.delete(e)}});var ri,r1,o1,n1=l(()=>{"use strict";ri=m(require("node:path")),r1=require("node:url");Po();o1=()=>{if(Ke()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?ri.default.dirname(ri.default.resolve(e)):ri.default.dirname(ri.default.resolve(__filename))}return ri.default.dirname((0,r1.fileURLToPath)(__agentWitchImportMetaUrl))}});var s1,i1,a1,l1,qe,oi,c1,d1,ni,B_,G_,q_,u1,V_,p1,lf=l(()=>{"use strict";s1=require("node:crypto"),i1=m(require("node:fs")),a1=m(require("node:path")),l1=require("node:url");hc();Po();n1();qe=new Map,c1=async()=>{if(oi!==void 0)return oi;try{if(Ke()){let e=o1(),t=a1.default.join(e,"deps","node-pty","lib","index.js");if(i1.default.existsSync(t)){let r=await import((0,l1.pathToFileURL)(t).href);return oi=r,r}}return oi=await import("node-pty"),oi}catch{return oi=null,null}},d1=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},ni=(e,t,r)=>{let o=qe.get(e);if(o!==void 0){qe.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},B_=(e,t)=>{let r=qe.get(e);return r===void 0?!1:(r.pty.write(t),!0)},G_=(e,t,r)=>{let o=qe.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},q_=e=>{for(let t of qe.values())if(!(t.mode!=="agent"||t.runId!==e))return kr(t.pty.pid);return!1},u1=e=>{for(let[t,r]of qe.entries())if(!(r.mode!=="agent"||r.runId!==e)){qe.delete(t);try{r.pty.kill()}catch{}return!0}return!1},V_=async e=>{let t=await c1();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;qe.get(e.shellSessionId)!==void 0&&ni(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return qe.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{d1(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{qe.get(e.shellSessionId)?.pty===n&&(qe.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},p1=async e=>{let t=e.shellSessionId??(0,s1.randomUUID)(),r=await c1();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return qe.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{d1(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{qe.get(t)?.pty===o&&(qe.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var cf,m1,g1=l(()=>{"use strict";cf="[[AWAITING_INPUT]]",m1=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",cf,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var kc,f1,df=l(()=>{"use strict";g1();kc=e=>{let t=e.indexOf(cf);if(t<0)return null;let o=e.slice(t+cf.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},f1=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",m1].join(`
`)});var h1,y1=l(()=>{"use strict";af();lf();df();h1=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(Yt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Er(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await p1({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=kc(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var S1,A1,b1,Cr,uf=l(()=>{"use strict";S1=require("node:child_process"),A1=m(require("node:fs")),b1=m(require("node:path"));su();Cr=(e,t)=>{let r=b1.default.join(e,"app",cE,"ensure-writer.sh");return A1.default.existsSync(r)?new Promise((o,n)=>{let s=(0,S1.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var P1,vn,Cc,pf,K_,Ec,mf,gf,J_,Y_,nY,si,sY,iY,X_,Z_=l(()=>{"use strict";P1=require("node:child_process");ht();uf();rf();tf();wc();of();vn=new Map,Cc=e=>e==="cursor"||e==="antigravity",pf=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",K_=e=>vn.get(e)?.warmed===!0,Ec=e=>{let t=vn.get(e);vn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},mf=e=>vn.get(e)?.conversationStarted===!0,gf=e=>{let t=vn.get(e);vn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},J_=e=>{vn.delete(e)},Y_=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",nY={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},si=e=>`${nY[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,sY=(e,t,r,o)=>new Promise(n=>{let s=bu(t,r),i=[],a=(0,P1.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),iY=(e,t)=>{let r=si(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},X_=async e=>{if(!ce(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Te(e.runConfig.writerExecutionBackend)==="api"){let r=Je(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=ve(e.runConfig.layout.configPath);return Fe(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Ec(e.writerAgent),{exitCode:0,output:si(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Cr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}Cc(e.writerAgent)&&Ec(e.writerAgent);let t=await sY(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?iY(e.writerAgent,t.output):si(e.writerAgent)}}});var _n,Q_=l(()=>{"use strict";_n={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var w1,aY,lY,v1,cY,eW,_1=l(()=>{"use strict";Q_();w1=/you(?:'|')ve hit your session limit/i,aY=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],lY=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,v1=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},cY=e=>{let t=lY.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},eW=e=>{let t=e.trim();if(t.length===0)return null;if(w1.test(t))return{code:_n.SESSION_LIMIT,resetHint:cY(t),matchedLine:v1(t,w1)};for(let r of aY)if(r.test(t))return{code:_n.PROVIDER_QUOTA,resetHint:null,matchedLine:v1(t,r)};return null}});var ff,hf,tW,rW=l(()=>{"use strict";ff="[[AGENT_RUN_WRITER_EXECUTION]]",hf="cli-writer-api-key-missing",tW="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var oW=l(()=>{"use strict";rW()});var W1=l(()=>{"use strict";oW()});var yf=l(()=>{"use strict";Q_();_1();rW();oW();W1()});var Sf,L1=l(()=>{"use strict";Sf={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var k1,E1=l(()=>{"use strict";k1="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var C1,R1=l(()=>{"use strict";yf();E1();C1=e=>e.code===_n.SESSION_LIMIT?k1:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var x1,T1=l(()=>{"use strict";yf();L1();R1();x1=e=>{let t=eW(e.output);return t!==null?{status:Sf.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:C1(t)}:{status:e.exitCode===0?Sf.COMPLETED:Sf.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var nW,OTe,I1=l(()=>{"use strict";nW={OPEN:"open",APPROVAL:"approval"},OTe=nW.APPROVAL});var ii,Af,O1,pY,M1,N1,z1,Rc,sW,iW=l(()=>{"use strict";ii=m(require("node:fs")),Af=m(require("node:path")),O1="runs",pY=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),M1=e=>{let t=e.profileEmail!==null?Af.default.join(e.installDir,"profiles",e.profileEmail,O1):Af.default.join(e.installDir,O1);return ii.default.mkdirSync(t,{recursive:!0}),t},N1=(e,t)=>Af.default.join(M1(e),`${t}.json`),z1=(e,t)=>{ii.default.writeFileSync(N1(e,t.id),JSON.stringify(t,null,2))},Rc=(e,t)=>{let r=N1(e,t);if(!ii.default.existsSync(r))return null;try{let o=JSON.parse(ii.default.readFileSync(r,"utf8"));return!pY(o)||typeof o.id!="string"?null:o}catch{return null}},sW=e=>{let t=M1(e),r=ii.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=Rc(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var mY,j1,D1=l(()=>{"use strict";T1();I1();iW();mY=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=x1({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:nW.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},j1=(e,t)=>{let r=mY(t);return z1(e,r),r}});var $1=l(()=>{"use strict";xg()});var H1,F1=l(()=>{"use strict";yf();H1=()=>[ff,`agentRunWriterExecutionBackend=${hf}`,`agentRunWriterExecutionReasonCode=${tW}`].join(`
`)});var no,bf=l(()=>{"use strict";no=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var aW,gY,fY,U1,B1=l(()=>{"use strict";aW=e=>e.toLocaleString("en-US"),gY=e=>e<.01?e.toFixed(4):e.toFixed(3),fY=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${gY(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${aW(e.inputTokens)} in / ${aW(e.outputTokens)} out (${aW(e.totalTokens)} total)`,t].join(`
`)},U1=(e,t)=>{if(t===void 0)return e;let r=fY(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var G1=l(()=>{"use strict";ue()});var V1,xc,me,lW,Pf,q1,hY,yY,K1,J1,Y1,Tc,cW,dW,uW,X1,SY,lt,Ic,so,Z1,AY,bY,wf,pW,mW,gW,Q1=l(()=>{"use strict";V1=require("node:child_process");ue();ht();HF();Zl();j_();GF();Ji();JF();nf();XF();hc();e1();af();lf();df();y1();Z_();D1();$1();F1();bf();B1();$n();G1();wc();Ii();df();xc=new Map,me=new Map,lW=new Set,Pf=new Map,q1=e=>{e!==void 0&&!Pf.has(e)&&Pf.set(e,Date.now())},hY=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(Yt(t)){lt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}Er(t,n)},yY=(e,t,r,o,n)=>{if(!Jy(e,n))return;let s=`${H1()}
`;hY(t,r,o,s);let i=me.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},K1=130,J1=`

Stopped by user.`,Y1=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:no(e)},Tc=null,cW=e=>{Tc=e},dW=(e,t)=>{if(Tc===null)return;let r=lv(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||KS(Tc,t,r)},uW=async e=>{await $_({layout:e,cloudApi:Tc})},X1=e=>{let t=xc.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:kr(t.pid)},SY=e=>de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),lt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Ic=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Mn(s),c=me.get(r);if(a!==null&&c!==void 0){let d=AE(a),p=X1(r)||q_(r);d!==null&&!p&&so(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return SE(a)}}),so=(e,t,r,o,n,s,i,a)=>{let c=qn(s,a),d=n,p=U1(c.output,c.llmUsage);if(r!==void 0){let A=Pf.get(r);Pf.delete(r),A!==void 0&&iv({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-A)/1e3))});let h=BF(c.llmUsage,p);h!==null&&c$({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&lW.has(r)&&(lW.delete(r),d=K1,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${J1}`:"Stopped by user.");let g=r!==void 0?lv(e.layout.reportsDir,r):null;if(r!==void 0){Wc(r),oa(e.layout,r),Yt(r)&&(lt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),t1(r));let A=me.get(r);i$({reportsDir:e.layout.reportsDir,agentRunId:r,input:no(i),output:p,...A!==void 0?{writerLabel:vc({writerAgent:A.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),A!==void 0&&Cg({layout:e.layout,writerAgent:A.writerAgent,projectFolderPath:A.projectFolderPath,userPrompt:A.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),j1(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),KF(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),$_({layout:e.layout,cloudApi:Tc}),me.delete(r),xc.delete(r),ef(e.layout,r)}lt(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),Fi(e.layout)},Z1=(e,t,r,o,n,s,i)=>{let a=me.get(r),c=a?.accumulatedOutput??s;$F(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),wn(t,r,()=>z_(e.layout,r),Ic(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),lt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},AY=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=h=>{if(!(n===void 0||h.length===0)){if(Yt(n)){lt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:h},requestId:o});return}Er(n,h)}};if(n!==void 0){let h=me.get(n);xc.set(n,t),me.set(n,{originalPrompt:s,userTranscriptPrompt:h?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:h?.projectFolderPath,reportKey:h?.reportKey,accumulatedOutput:h?.accumulatedOutput??""}),lt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),wn(r,n,()=>X1(n),Ic(e,r,n,o,h?.projectFolderPath,h?.reportKey))}let g=a==="claude-cli",A=[];t.stdout?.on("data",h=>{let y=h.toString("utf8");if(g?A.push(y):(c.push(y),p(y)),d||n===void 0)return;let u=kc(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let S=me.get(n),b=[S?.accumulatedOutput??"",u.partialOutput].filter(f=>f.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=b),xc.delete(n),Z1(e,r,n,o,u.question,b,s)}}),t.stderr?.on("data",h=>{let y=h.toString("utf8");c.push(y),p(y)}),t.on("close",h=>{if(d)return;gf(a);let y=n!==void 0?me.get(n):void 0,u=g?qn(A.join("")):{output:c.join("").trim(),llmUsage:void 0},S=g?c.join("").trim():"",b=[u.output.trim(),S].filter(w=>w.length>0).join(`
`);g&&u.output.trim().length>0&&p(u.output);let f=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${b}`.trim():b;so(e,r,n,o,h??-1,f,s,u.llmUsage)}),t.on("error",h=>{d||so(e,r,n,o,-1,h.message,s)})},bY=(e,t,r,o,n,s,i,a,c)=>{let d=Y1(r,c);s!==void 0&&(me.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),lt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),wn(n,s,()=>me.has(s),Ic(e,n,s,o,i,a))),Qi(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(Yt(s)){lt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}Er(s,g)}}).then(g=>{gf(t),so(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let A=g instanceof Error?g.message:String(g);so(e,n,s,o,-1,A,r)})},wf=(e,t,r,o,n,s,i,a,c,d,p,g)=>{let A=Y1(r,p);if(Hi(e.layout),xo(e,t)){q1(s),bY(e,t,r,o,n,s,c,d,A);return}let h=Nt(t,r,SY(e),i);if(h===null){so(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}q1(s);let y=QF({workspace:e.workspace,projectFolderPath:c}),u=()=>{let S=(0,V1.spawn)(h.command,[...h.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:g??process.env});AY(e,S,n,o,s,r,A,t)};if(s===void 0){u();return}me.set(s,{originalPrompt:r,userTranscriptPrompt:A,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:me.get(s)?.accumulatedOutput??""}),yY(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Ti({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),wn(n,s,()=>me.has(s),Ic(e,n,s,o,c,d)),h1({socket:n,sendMessage:lt,requestId:o,agentRunId:s,shellSessionId:a,command:h.command,args:h.args,cwd:y,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:S=>{a!==void 0&&ni(a,w=>{lt(n,w)},o);let b=me.get(s),f=[b?.accumulatedOutput??"",S.partialOutput].filter(w=>w.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=f),Z1(e,n,s,o,S.question,f,r)},onFinished:(S,b)=>{gf(t);let f=qn(b),w=me.get(s),v=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${f.output}`.trim():f.output;so(e,n,s,o,S,v,r,f.llmUsage)}}).then(S=>{if(!S){u();return}wn(n,s,()=>q_(s),Ic(e,n,s,o,c,d))}).catch(S=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",S instanceof Error?S.message:S),u()})},pW=(e,t,r,o)=>{ef(e.layout,t.agentRunId),t.shellSessionId!==void 0&&lt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=f1(t),s=me.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;wf(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},mW=(e,t)=>{for(let r of DF(e.layout))me.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:no(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),wn(t,r.agentRunId,()=>z_(e.layout,r.agentRunId),{awaitingInput:!0}),lt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},gW=(e,t,r,o)=>{let n=me.get(r);if(n===void 0)return!1;lW.add(r),Wc(r);let s=xc.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(u1(r))return!0;ef(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${J1}`:"Stopped by user.";return so(e,t,r,o,K1,i,n.originalPrompt),!0}});var PY,fW,eU=l(()=>{"use strict";la();PY=()=>`http://127.0.0.1:${yt()}/restart`,fW=async()=>{try{let e=await fetch(PY(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var tU=l(()=>{"use strict";Ja()});var rU=l(()=>{"use strict";zv()});var oU,nU=l(()=>{"use strict";oU=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Oc,wY,hW,sU=l(()=>{"use strict";K();te();tU();MA();rU();nU();$n();Oc=(e,t)=>{Br(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},wY=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(my(),py)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},hW=async e=>{let t=xe(e.layout.installDir)?.bundleVersion??null;if(!oU({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(ft(e.layout)){Ui({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Oc(e.layout,{summary:r,action:"install-bundle-update-start"}),tr({launchAgentLabel:Pe(e.layout.installDir),installDir:e.layout.installDir});let o=await qs({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),Oc(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await wY();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Oc(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),Oc(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),Oc(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var vY,yW,iU=l(()=>{"use strict";vY=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yW=e=>{if(!vY(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var SW,AW,aU=l(()=>{"use strict";fA();hA();SW=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=xa({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},AW=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await cr(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var lU,_Y,WY,LY,Mc,cU=l(()=>{"use strict";lU=m(require("node:os"));Re();_Y="Default",WY=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),LY=e=>{let t=lU.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Mc=()=>{let e=N(),t=Jd(e),r=WY(_Y);return`${LY(t)}/${r.length>0?r:"project"}`}});var dU=l(()=>{"use strict";Ja()});var uU,bW,pU=l(()=>{"use strict";dU();uU=!1,bW=e=>{uU||(uU=!0,process.on("uncaughtException",t=>{qo(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;qo(e,{kind:"crash",message:r,stack:o})}))}});var mU,kY,PW,gU=l(()=>{"use strict";mU=require("node:child_process");uf();ht();rf();tf();wc();of();kY=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,mU.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},PW=async e=>{if(!ce(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Te(e.runConfig.writerExecutionBackend)==="api"){let r=Je(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=ve(e.layout.configPath),n=Fe(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Cr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await kY(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var wW,fU=l(()=>{"use strict";wW=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var hU,vW,yU=l(()=>{"use strict";hU=require("node:crypto"),vW=()=>(0,hU.randomUUID)()});var ai,SU,vf=l(()=>{"use strict";ai="[[WORKING_ESTIMATE]]",SU=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",ai,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var AU,bU=l(()=>{"use strict";AU=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var EY,PU,wU=l(()=>{"use strict";vf();EY=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,PU=e=>{if(!e.includes(ai))return null;let t=null;for(let r of e.matchAll(EY)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var CY,_W,vU=l(()=>{"use strict";wU();CY=/^(\d{1,6})\b/,_W=e=>{let t=PU(e);if(t!==null)return t;let r=CY.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var RY,xY,TY,_f,WW=l(()=>{"use strict";ht();qa();RY="http://127.0.0.1:11434",xY=45e3,TY=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},_f=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||RY,o=t===void 0?(await bt({commands:de({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(xY)});return n.ok?TY(await n.json()):null}catch{return null}}});var LW,kW,EW,_U=l(()=>{"use strict";Ii();vf();bf();bU();vU();Zl();WW();LW=async e=>{let t=no(e.wrappedPrompt),r=a$(e.reportsDir);return{estimateOutput:await _f(SU(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},kW=e=>{let t=_W(e.estimateOutput);t!==null&&wg({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},EW=e=>{let t=_W(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=AU(t);return xi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Tt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),wg({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var Wf,WU,CW=l(()=>{"use strict";Wf="[[WORKING_TOKEN_ESTIMATE]]",WU=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Wf,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var LU,IY,kU,EU=l(()=>{"use strict";CW();LU=/^(\d{1,8})\b/,IY=e=>{let t=e.indexOf(Wf);if(t<0)return null;let r=e.slice(t+Wf.length).trim(),o=LU.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},kU=e=>{let t=IY(e);if(t!==null)return t;let r=LU.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var RW,xW,CU=l(()=>{"use strict";CW();bf();EU();Zl();WW();RW=async e=>{let t=no(e.wrappedPrompt),r=d$(e.reportsDir);return{estimateOutput:await _f(WU(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},xW=e=>{let t=kU(e.estimateOutput);return t===null?null:(l$({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var RU=l(()=>{"use strict";T_();CF();xF();MF();la();Q1();uf();ht();iW();af();eU();_A();sU();$n();iU();aU();nf();cU();pU();gU();iu();fU();yU();vf();Ii();_U();CU();j_();qa();lf();Z_()});var xU={};Ct(xU,{buildContinuationPromptWithContext:()=>NY});var OY,MY,NY,TU=l(()=>{"use strict";OY=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,MY=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),NY=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=MY(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${OY(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var IU={};Ct(IU,{readHarnessExportSets:()=>jY});var Nc,TW,Lf,zY,jY,OU=l(()=>{"use strict";Nc=m(require("node:fs")),TW=m(require("node:path"));Re();Lf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zY=e=>{if(!Nc.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Nc.default.readFileSync(e.harnessManifestPath,"utf8"));if(Lf(t))return t}catch{return null}return null},jY=(e,t)=>{let r=N(t),o=zY(r);if(o===null)return[];let n=Lf(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!Lf(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!Lf(p))continue;let g=typeof p.path=="string"?p.path:void 0,A=typeof p.id=="string"?p.id:"",h=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(g===void 0||A.length===0||h.length===0||y.length===0)continue;let u=g.startsWith("shared/")?TW.default.join(r.harnessRootDir,g):TW.default.join(r.harnessSetsDir,i,g);Nc.default.existsSync(u)&&d.push({id:A,kind:h,title:y,content:Nc.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var DW,OW,li,MU,DY,NU,zU,IW,jU,MW,NW,zW,Z,G,jW,$Y,zc,HY,FY,UY,BY,GY,qY,VY,KY,jc,DU=l(()=>{"use strict";DW=require("node:child_process"),OW=m(require("node:fs")),li=m(require("node:os"));bF();K();te();as();Jv();_F();ue();Mt();Ja();qb();zg();xg();Dt();No();qA();Ot();RU();MU=3e4,DY=3e4,NU=new Map,zU=new Map,IW=new Map,jU=new Map,MW=new Map,NW=new Map,zW=new Map,Z=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),G=(e,t,r)=>{e.readyState===fc.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Br(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Vp(r,"out",t)))},jW=e=>e,$Y=e=>{if(!OW.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(OW.default.readFileSync(e.harnessManifestPath,"utf8"));if(Z(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},zc=(e,t)=>{let r=$Y(t);r!==null&&G(e,{type:"harness.manifest.report",payload:{hostname:li.default.hostname(),manifest:r}})},HY=async(e,t,r,o,n,s,i=!1,a,c,d,p,g)=>{let A=g?.trim()??"";if(!ce(t)){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=vc({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await bt({commands:de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?LW({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,S=s!==void 0?RW({wrappedPrompt:r,writerLabel:h,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=Cc(t)&&!K_(t);if(b){try{await Cr(e.layout.installDir,t)}catch(H){let ge=H instanceof Error?H.message:String(H);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${ge}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Ec(t)}else if(!Cc(t))try{await Cr(e.layout.installDir,t)}catch(H){let ge=H instanceof Error?H.message:String(H);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${ge}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=ta(d,Mc,g);if(f===null){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Ye({projectFolderPath:f,...A.length>0?{projectId:A}:{}}),i||oc(e.layout,t,f);let w=Rg({sessionContinuation:i,supportsWriterSessionContinuation:pf(t),isWriterConversationStarted:mf(t)}),v=i&&w==="first"?rc(e.layout,t,f):null,W=v!==null?Gs(e.layout,v):null,L=W!==null&&W.turns.length>0,E=vv({sessionContinuation:i,supportsWriterSessionContinuation:pf(t),isWriterConversationStarted:mf(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:L,userPromptCharacterCount:r.length}),x=r;if(E.continuationStrategy==="source_run_seed"){let H=typeof c=="string"&&c.length>0?Rc(e.layout,c):null;if(H!==null){let{buildContinuationPromptWithContext:ge}=await Promise.resolve().then(()=>(TU(),xU));x=ge({priorPrompt:H.prompt,priorOutput:H.resultOutput??"",userMessage:r})}}else E.continuationStrategy==="transcript_seed"&&W!==null&&W.turns.length>0&&(x=Wg({priorTurns:W.turns,userMessage:r}));let I=E.ragLimit>0?await Ss({layout:e.layout,query:x,limit:E.ragLimit,minScore:E.ragMinScore,projectFolderPath:f,...A.length>0?{projectId:A}:{}}):[],M=E.ragLimit>0&&f.trim().length>0?await Bb({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:f,...A.length>0?{projectId:A}:{}}):[],B=E.injectMemory?mv(e.layout,f,A.length>0?A:void 0):[],q=`${fv(B,E.memoryEntryLimit)}${Hb(I)}${Gb(M)}${x}`,F=p?.trim()??(s!==void 0&&f.trim().length>0?vW():void 0);if(s!==void 0&&F!==void 0&&F.length>0&&f.trim().length>0){Ti({reportKey:F,agentRunId:s,userSummary:"Working on your Mac\u2026"});let H=q;u!==null&&u.then(ge=>{if(ge===null)return;let io=EW({estimateOutput:ge.estimateOutput??"",reportKey:F,agentRunId:s,reportsDir:e.layout.reportsDir,task:ge.task,writerLabel:ge.writerLabel,embedding:ge.embedding});if(io.estimateSeconds===null)return;dW(e.layout.reportsDir,s);let Et=`${ai}
${io.estimateSeconds}
`;if(Yt(s)){G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Et},requestId:o});return}Er(s,Et)}).catch(()=>{}),q=wW(H),q=Dh(q,{agentRunId:s,reportKey:F,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then(H=>{H!==null&&kW({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel,embedding:H.embedding})}).catch(()=>{}),s!==void 0&&S!==null&&S.then(H=>{H!==null&&xW({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel})}).catch(()=>{});let ct=s!==void 0&&zW.get(s)===!0;if(s!==void 0&&f.trim().length>0){let H=await wp(f);NW.set(s,H),F!==void 0&&F.length>0&&MW.set(s,F)}wf(e,t,q,o,jW(n),s,{sessionTurn:E.sessionTurn},a,f,F,r,By(e.layout,s,ct)),b&&s!==void 0&&G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Y_(t)},requestId:o})},FY=async(e,t,r,o,n)=>{let s=(i,a)=>{G(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await X_({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,G(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=ce(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?si(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},UY=(e,t,r)=>new Promise(o=>{if(!ce(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Nt(t,r,de({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,DW.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),BY=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;G(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=jt(t.bundle),s=Z(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=we(e.wsUrl)??gt,g=await CS({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=Mo({bundle:i,layout:e.layout});return G(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&zc(o,e.layout),!0},GY=async(e,t,r,o)=>{if(await BY(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(G(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!ce(n)){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}Hi(e.layout);let i=await(async()=>{try{await Cr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return UY(e,n,s)})().finally(()=>{Fi(e.layout)});G(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),zc(o,e.layout)},qY=e=>{let t=1e3*2**e;return Math.min(DY,t)},VY=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(ft(e.layout)){iy(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,fW().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(u,S="system.ack")=>{if(!t.selfUpdateInFlight){if(ft(e.layout)){Ui({layout:e.layout,remoteBundleVersion:u,trigger:S}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${S}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,hW({layout:e.layout,remoteBundleVersion:u,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let u=We(e.layout);u!==null&&je(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),h())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===fc.OPEN||u.readyState===fc.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,MU)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=qY(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},u)},g=u=>{s();let S=()=>{let b=zi(e.layout.installDir),f=yt();G(u,{type:"agent.heartbeat",payload:{hostname:li.default.hostname(),macOsUsername:li.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,MU)},A=(u,S)=>{if(typeof u.type!="string")return;if(GA(u)){t.stopped=!0,s(),a(),c(),HA({layout:e.layout}).finally(()=>{yc(),process.exit(0)});return}Br(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),Vp(e.layout,"in",u);let b=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&Z(u.payload)){let f=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",w=typeof u.payload.origin=="string"?u.payload.origin:"",v=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",W=typeof u.payload.challenge=="string"?u.payload.challenge:"",L=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!Kv({serverPublicKey:f,origin:w,devicePublicKey:v,challenge:W,serverAttestation:L})){t.wakeError="Server attestation verification failed",Br(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&Z(u.payload)){let f=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";Br(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),PW({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{G(S,{type:"writer.status",payload:w},e.layout)})}if(u.type==="install.bundle.update"&&Z(u.payload)){let f=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";f.length>0&&o(f,"install.bundle.update")}if(u.type==="system.ack"){Cp(e.layout,{wsUrl:e.wsUrl});let f=Z(u.payload)?u.payload:null,w=yW(f);w!==null&&o(w)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&Z(u.payload)&&SW(u.payload),u.type==="automations.run"&&Z(u.payload)&&AW(u.payload),u.type==="terminal.stream.accepted"&&Z(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"";if(f.length>0){let w=U_(f);for(let v of w)G(S,{type:"terminal.stream.chunk",payload:{runId:f,chunk:v},requestId:b})}}if(u.type==="agent.agentRun.list"&&G(S,{type:"dashboard.agentRun.list.result",payload:{runs:sW(e.layout)},requestId:b}),u.type==="agent.agentRun.get"&&Z(u.payload)){let f=typeof u.payload.runId=="string"?u.payload.runId:"",w=f.length>0?Rc(e.layout,f):null;G(S,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:b})}if(u.type==="command.claude.run"&&Z(u.payload)){let f=u.payload.prompt,w=typeof u.payload.writerAgent=="string"&&ce(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",v=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,W=u.payload.sessionContinuation===!0,L=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,E=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,x=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=ta(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,Mc,x),M=zy(u.payload.compositionSnapshot),B=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${W?"continue":"first"})\u2026`),I===null){G(S,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...v!==void 0?{agentRunId:v}:{}},requestId:b});return}if(M!==null){let q=Dy(e.layout,M);if(q!==null){G(S,{type:"command.claude.result",payload:{exitCode:-1,output:q,...v!==void 0?{agentRunId:v}:{}},requestId:b});return}if(v!==void 0){let F=Hy(e.layout,v,M);if(!F.ok){G(S,{type:"command.claude.result",payload:{exitCode:-1,output:F.errorMessage,...v!==void 0?{agentRunId:v}:{}},requestId:b});return}zW.set(v,M.entries.some(ct=>ct.scope==="run"))}}v!==void 0&&E!==void 0&&NU.set(v,E),v!==void 0&&(zU.set(v,I),x!==void 0&&x.trim().length>0&&IW.set(v,x.trim()),jU.set(v,f.trim()),Ye({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),HY(e,w,f.trim(),b,S,v,W,E,L,I,B,x)}}if(u.type==="shell.session.open"&&Z(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:120,v=typeof u.payload.rows=="number"?u.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),V_({shellSessionId:f,cwd:e.workspace,cols:w,rows:v,send:W=>{G(S,W)},requestId:b}))}if(u.type==="shell.session.close"&&Z(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";f.length>0&&ni(f,w=>{G(S,w)},b)}if(u.type==="shell.input"&&Z(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.data=="string"?u.payload.data:"";f.length>0&&w.length>0&&B_(f,w)}if(u.type==="shell.resize"&&Z(u.payload)){let f=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:0,v=typeof u.payload.rows=="number"?u.payload.rows:0;f.length>0&&w>0&&v>0&&G_(f,w,v)}if(u.type==="command.writer.session.end"&&Z(u.payload)){let f=u.payload.writerAgent;typeof f=="string"&&ce(f)&&(J_(f),Eg(e.layout,f))}if(u.type==="command.writer.session.start"&&Z(u.payload)){let f=u.payload.writerAgent,w=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof f=="string"&&ce(f)&&w.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),FY(e,f,w,b,S))}if(u.type==="command.claude.stop"&&Z(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),gW(e,jW(S),f,b))}if(u.type==="command.claude.input_respond"&&Z(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",w=typeof u.payload.response=="string"?u.payload.response.trim():"",v=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",W=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",L=typeof u.payload.question=="string"?u.payload.question:"";f.length>0&&w.length>0&&v.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),pW(e,{agentRunId:f,originalPrompt:v,partialOutput:W,question:L,response:w,shellSessionId:NU.get(f)},b,jW(S)))}if(u.type==="dispatch.approval.required"&&Z(u.payload)){let f=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",w=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${w}`),process.platform==="darwin"&&(0,DW.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&Z(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),GY(e,u.payload,b,S)),u.type==="harness.export.request"&&Z(u.payload)){let f=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",w=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,v=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(W=>typeof W=="string"):[];f.length>0&&v.length>0&&(async()=>{let{readHarnessExportSets:W}=await Promise.resolve().then(()=>(OU(),IU)),L=W(v,e.email);G(S,{type:"harness.export.result",payload:{success:L.length>0,borrowerUserId:f,...w!==void 0?{targetDeviceId:w}:{},sets:L,errorMessage:L.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(u.type==="harness.manifest.request"&&zc(S,e.layout),u.type==="command.claude.result"&&Z(u.payload)){let f=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,w=typeof u.payload.output=="string"?u.payload.output:"",v=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,W=ta(f!==void 0?zU.get(f):void 0,Mc),L=f!==void 0?IW.get(f):void 0,E=f!==void 0?jU.get(f)??"":"",x=sA({exitCode:v,output:w});if(x&&W!==null&&$b({layout:e.layout,text:w,source:f??"command.claude.result",projectFolderPath:W,...L!==void 0?{projectId:L}:{}}),v!=null&&v!==0&&w.trim().length>0&&W!==null&&(Mb({layout:e.layout,errorText:w,projectFolderPath:W,...L!==void 0?{projectId:L}:{}}),Ub({layout:e.layout,text:w,source:f??"command.claude.result.failure",projectFolderPath:W,...L!==void 0?{projectId:L}:{}})),x&&E.trim().length>0&&W!==null&&gv({layout:e.layout,projectFolderPath:W,...L!==void 0?{projectId:L}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:E,output:w,createdAt:new Date().toISOString()}}),f!==void 0&&W!==null){let M=MW.get(f),B=NW.get(f);M!==void 0&&B!==void 0&&wp(W).then(q=>{let F=iA({before:B,after:q});$h(M,F),NW.delete(f),MW.delete(f)})}if(x&&L!==void 0&&L.trim().length>0){let M=$(),B=M===null?null:Y({wsUrl:M.wsUrl,pairingToken:M.pairingToken});B!==null&&lA(B,L,{...f!==void 0?{sourceRunId:f}:{},lesson:aA({prompt:E,output:w})})}f!==void 0&&(oa(e.layout,f),zW.delete(f),IW.delete(f))}},h=()=>{if(t.stopped)return;a(),c();let u=new fc(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),cW(Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),uW(e.layout);let S=we(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=Vv({layout:e.layout,origin:S,...b!==void 0&&b.length>0?{claimToken:b}:{}});G(u,{type:"agent.register",payload:{role:"agent",hostname:li.default.hostname(),macOsUsername:li.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),zc(u,e.layout),mW(e,u),g(u)}),u.on("message",S=>{let b=typeof S=="string"?S:S.toString("utf8");try{let f=JSON.parse(b);if(!Z(f))return;A(f,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(S,b)=>{s(),t.socket=void 0,t.wsConnected=!1,AA(e.layout),t.reconnectAttempt+=1;let f=typeof b=="string"?b:b.toString("utf8");qo(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:f}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",S=>{t.wakeError=S.message,qo(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return sy(()=>{let u=ay();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&o(u.remoteBundleVersion,u.trigger);let S=ly();S!==null&&r(S)}),{connect:h,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:za(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:ac(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(zc(u,e.layout),{ok:!0})}}},KY=async()=>{Ve("agent-witch");let e=k_(),t=k();x_().ok||(process.platform==="darwin"?(await So(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),M_(t);let o=O_({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(tr({launchAgentLabel:Pe(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),_i());let n=await Zy(),s=n[0];s!==void 0&&bW(s.layout);for(let h of n){let y=we(h.wsUrl)??gt;ji(h.layout.installDir,y)}let i=n.map(h=>VY(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),yc(),process.exit(0));let c=()=>{n.forEach((h,y)=>{let u=i[y];if(u===void 0)return;let S=We(h.layout);bA(S,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(ft(h)||ja(h.installDir))},g=await N_({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):ic({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let A=rr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Wi(),d()});d=()=>{A(),g.stop(),yc(),console.log("[agent-witch] Shutting down.");for(let h of i)h.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},jc=KY});var $W=l(()=>{"use strict";DU()});var $U={};Ct($U,{startAgentWitchClient:()=>jc});var HU=l(()=>{"use strict";$W();$W();Po();Hh();lu();if(!Ke()&&wo(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(au(process.argv.slice(e))),jc()}});zh();Hh();Po();lu();var wE="20.x",vE="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var Vq=e=>[`Node.js ${wE} or newer is required (found ${e}).`,vE].join(" "),_E=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${Vq(process.version)}
`),process.exit(1))};var JY=async()=>{Ve("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(my(),py)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},YY=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(_x(),vx)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},XY=async()=>{if(!wo(Ke()?void 0:__agentWitchImportMetaUrl))return;_E();let e=process.argv.indexOf("report");e>=0&&process.exit(au(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await JY();return}if(t==="wake"){await YY();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(WT(),_T));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(fH(),gH));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(HU(),$U));await r()};XY();
