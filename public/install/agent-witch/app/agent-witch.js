#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var f4=Object.create;var MS=Object.defineProperty;var h4=Object.getOwnPropertyDescriptor;var y4=Object.getOwnPropertyNames;var S4=Object.getPrototypeOf,P4=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var C=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},yt=(e,t)=>{for(var r in t)MS(e,r,{get:t[r],enumerable:!0})},A4=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of y4(t))!P4.call(e,n)&&n!==r&&MS(e,n,{get:()=>t[n],enumerable:!(o=h4(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?f4(S4(e)):{},A4(t||!e||!e.__esModule?MS(r,"default",{value:e,enumerable:!0}):r,e));var Ea,rx,ox,La,NS,Eie,nx,nn,Qt,Tr,Yu,Zu,Is,Os,We,jS,Qu,ep,tp,xa,xt,sn,an,Wa,yo,DS,sx,ke=l(()=>{"use strict";Ea={production:".agent-witch",localhost:".local-agent-witch"},rx={production:47892,localhost:47893},ox={production:"com.agent-witch",localhost:"com.local-agent-witch"},La={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},NS="app",Eie=`${NS}/agent-witch.js`,nx=`${NS}/command`,nn={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",projectDataDir:"project-data",harnessDir:"harness"},Qt=Ea.production,Tr=Ea.localhost,Yu=rx.production,Zu=rx.localhost,Is=ox.production,Os=ox.localhost,We="profiles",jS=La.activeProfile,Qu="harness",ep="sets",tp="manifest.json",xa=nn.projectsDir,xt=nn.logsDir,sn="agent-witch.log",an="agent-witch.error.log",Wa=nn.reportsDir,yo=nn.deviceKeypairJson,DS=NS,sx="agent-witch.js"});var ix=l(()=>{"use strict";ke()});var ax,So,Ia,rp=l(()=>{"use strict";ax=m(require("node:path"));ke();So=e=>ax.default.basename(e)===Tr,Ia=e=>So(e)?Os:Is});var lx=l(()=>{"use strict";ix();rp()});var cx,zS,b4,Oa,_4,w4,dx,k4,T4,ux=l(()=>{"use strict";lx();ke();cx=m(require("node:os")),zS=m(require("node:path")),b4=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?zS.default.resolve(e):zS.default.join(cx.default.homedir(),Qt)},Oa=Ia(b4()),_4=`${Oa}-wake`,w4=`${Oa}-live`,dx=`${Oa}-watchdog`,k4=`${Oa}-automation-scheduler`,T4=`${Oa}-updater`});var Ms=C(HS=>{"use strict";Object.defineProperty(HS,"__esModule",{value:!0});HS.stringify=v4;function v4(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var j=C($S=>{"use strict";Object.defineProperty($S,"__esModule",{value:!0});$S.generateTypeGuardError=C4;var px=Ms();function C4(e,t,r){return(0,px.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,px.stringify)(e)}) to be "${r}"`}});var Po=C(op=>{"use strict";Object.defineProperty(op,"__esModule",{value:!0});op.isNonNullObject=void 0;var R4=j(),E4=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,R4.generateTypeGuardError)(e,t.identifier,"non-null object")),r};op.isNonNullObject=E4});var er=C(Te=>{"use strict";Object.defineProperty(Te,"__esModule",{value:!0});Te.attachTypeGuardMeta=Te.isArrayTypeGuard=Te.isNestedObjectTypeGuard=Te.getTypeGuardWrapperKind=Te.getTypeGuardInnerGuard=Te.getTypeGuardItemGuard=Te.getTypeGuardSchema=void 0;var L4=e=>e.schema;Te.getTypeGuardSchema=L4;var x4=e=>e.itemGuard;Te.getTypeGuardItemGuard=x4;var W4=e=>e.innerGuard;Te.getTypeGuardInnerGuard=W4;var I4=e=>e.wrapperKind;Te.getTypeGuardWrapperKind=I4;var O4=e=>{if((0,Te.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};Te.isNestedObjectTypeGuard=O4;var M4=e=>{if((0,Te.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};Te.isArrayTypeGuard=M4;var N4=(e,t)=>Object.assign(e,t);Te.attachTypeGuardMeta=N4});var Ma=C(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.getExpectedTypeName=ln.getTypeGuardDisplayName=void 0;var mx=er(),j4=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};ln.getTypeGuardDisplayName=j4;var D4=e=>{let t=(0,mx.getTypeGuardWrapperKind)(e),r=(0,mx.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,ln.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};ln.getExpectedTypeName=D4});var cn=C(np=>{"use strict";Object.defineProperty(np,"__esModule",{value:!0});np.createValidationResult=void 0;var z4=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});np.createValidationResult=z4});var Ns=C(sp=>{"use strict";Object.defineProperty(sp,"__esModule",{value:!0});sp.createValidationError=void 0;var H4=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});sp.createValidationError=H4});var js=C(ip=>{"use strict";Object.defineProperty(ip,"__esModule",{value:!0});ip.createTreeNode=void 0;var $4=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});ip.createTreeNode=$4});var Na=C(ap=>{"use strict";Object.defineProperty(ap,"__esModule",{value:!0});ap.combineResults=void 0;var F4=cn(),U4=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,F4.createValidationResult)(r,o,n)};ap.combineResults=U4});var cp=C(lp=>{"use strict";Object.defineProperty(lp,"__esModule",{value:!0});lp.createSimplifiedTree=void 0;var gx=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=gx(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},B4=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=gx(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};lp.createSimplifiedTree=B4});var Da=C(up=>{"use strict";Object.defineProperty(up,"__esModule",{value:!0});up.validateObject=void 0;var G4=Po(),ja=cn(),V4=Ns(),dp=js(),q4=Na(),fx=pp(),K4=(e,t,r)=>{let o=()=>{let i=(0,V4.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,dp.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,ja.createValidationResult)(!1,[],a):(0,ja.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,ja.createValidationResult)(!0,[],(0,dp.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...u]=c,g=d,h=t[g],P=e[g],S=(0,fx.validateProperty)(g,P,h,r);return S.valid?u.length===0?(0,ja.createValidationResult)(!0,[],(0,dp.createTreeNode)(r.path,!0,"object",e)):a(u):S};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,fx.validateProperty)(d,e[d],u,r)}),a=(0,q4.combineResults)(i,r.path),c=(0,dp.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,ja.createValidationResult)(a.valid,a.errors,c)};return(0,G4.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};up.validateObject=K4});var yx=C(fp=>{"use strict";Object.defineProperty(fp,"__esModule",{value:!0});fp.validateArray=void 0;var J4=Ms(),mp=cn(),hx=Ns(),gp=js(),X4=Na(),Y4=Da(),Z4=Ma(),Q4=er(),e8=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,hx.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,gp.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,mp.createValidationResult)(!1,[c],d)}let n=(0,Q4.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,g={path:u,config:r.config||null};if(n)return(0,Y4.validateObject)(c,n,g);let h=t(c,null),P=(0,Z4.getExpectedTypeName)(t),S=(0,J4.stringify)(c);if(h)return(0,mp.createValidationResult)(!0,[],(0,gp.createTreeNode)(u,!0,P,c));let y=S.length>200?`Expected ${u} to be "${P}"`:`Expected ${u} (${S}) to be "${P}"`,p=(0,hx.createValidationError)(u,P,c,y),A=(0,gp.createTreeNode)(u,!1,P,c);return A.errors=[p],(0,mp.createValidationResult)(!1,[p],A)}),i=(0,X4.combineResults)(s,o),a=(0,gp.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,mp.createValidationResult)(i.valid,i.errors,a)};fp.validateArray=e8});var pp=C(yp=>{"use strict";Object.defineProperty(yp,"__esModule",{value:!0});yp.validateProperty=void 0;var Sx=cn(),t8=Ns(),Px=js(),r8=Ma(),hp=er(),o8=Da(),n8=yx(),s8=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,hp.getTypeGuardSchema)(r),c=(0,hp.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,o8.validateObject)(t,a,s);if(c&&(0,hp.isArrayTypeGuard)(r))return(0,n8.validateArray)(t,c,s)}let d=u=>{let g=r(t,u),h=(0,r8.getExpectedTypeName)(r);return g?(0,Sx.createValidationResult)(!0,[],(0,Px.createTreeNode)(n,!0,h,t)):(()=>{let P=(0,t8.createValidationError)(n,h,t,`Expected ${n} (${JSON.stringify(t)}) to be "${h}"`),S=(0,Px.createTreeNode)(n,!1,h,t);return S.errors=[P],(0,Sx.createValidationResult)(!1,[P],S)})()};if((0,hp.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};yp.validateProperty=s8});var Pp=C(Sp=>{"use strict";Object.defineProperty(Sp,"__esModule",{value:!0});Sp.isNil=void 0;var i8=j(),a8=function(e,t){return e!=null?(t&&t.callbackOnError((0,i8.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Sp.isNil=a8});var FS=C(Ap=>{"use strict";Object.defineProperty(Ap,"__esModule",{value:!0});Ap.isDefined=void 0;var l8=j(),c8=Pp(),d8=function(e,t){return(0,c8.isNil)(e,null)?(t&&t.callbackOnError((0,l8.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Ap.isDefined=d8});var US=C(bp=>{"use strict";Object.defineProperty(bp,"__esModule",{value:!0});bp.reportValidationResults=void 0;var u8=cp(),Ax=FS(),p8=Pp(),m8=(e,t)=>{if(e.valid===!0||(0,p8.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,Ax.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,u8.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,Ax.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};bp.reportValidationResults=m8});var BS=C(ie=>{"use strict";Object.defineProperty(ie,"__esModule",{value:!0});ie.Validation=ie.reportValidationResults=ie.validateObject=ie.validateProperty=ie.createSimplifiedTree=ie.combineResults=ie.createTreeNode=ie.createValidationError=ie.createValidationResult=ie.getExpectedTypeName=void 0;var g8=Ma();Object.defineProperty(ie,"getExpectedTypeName",{enumerable:!0,get:function(){return g8.getExpectedTypeName}});var f8=cn();Object.defineProperty(ie,"createValidationResult",{enumerable:!0,get:function(){return f8.createValidationResult}});var h8=Ns();Object.defineProperty(ie,"createValidationError",{enumerable:!0,get:function(){return h8.createValidationError}});var y8=js();Object.defineProperty(ie,"createTreeNode",{enumerable:!0,get:function(){return y8.createTreeNode}});var S8=Na();Object.defineProperty(ie,"combineResults",{enumerable:!0,get:function(){return S8.combineResults}});var P8=cp();Object.defineProperty(ie,"createSimplifiedTree",{enumerable:!0,get:function(){return P8.createSimplifiedTree}});var A8=pp();Object.defineProperty(ie,"validateProperty",{enumerable:!0,get:function(){return A8.validateProperty}});var b8=Da();Object.defineProperty(ie,"validateObject",{enumerable:!0,get:function(){return b8.validateObject}});var _8=US();Object.defineProperty(ie,"reportValidationResults",{enumerable:!0,get:function(){return _8.reportValidationResults}});var w8=cn(),k8=Na(),T8=Ns(),v8=js(),C8=pp(),R8=Da(),E8=US(),L8=cp();ie.Validation={result:w8.createValidationResult,combine:k8.combineResults,error:T8.createValidationError,treeNode:v8.createTreeNode,property:C8.validateProperty,object:R8.validateObject,report:E8.reportValidationResults,createSimplifiedTree:L8.createSimplifiedTree}});var _p=C(GS=>{"use strict";Object.defineProperty(GS,"__esModule",{value:!0});GS.isType=W8;var bx=Po(),_x=BS(),x8=er();function W8(e){if(!(0,bx.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,_x.validateObject)(r,e,s);return(0,_x.reportValidationResults)(i,o||null),i.valid}return(0,bx.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,x8.attachTypeGuardMeta)(t,{schema:e})}});var vx=C(dn=>{"use strict";Object.defineProperty(dn,"__esModule",{value:!0});dn.isNestedType=dn.isShape=void 0;dn.isSchema=za;var wx=Po(),kx=BS(),Tx=er();function za(e){if(!(0,wx.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=O8(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,kx.validateObject)(o,t,i);return(0,kx.reportValidationResults)(a,n||null),a.valid}return(0,wx.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,Tx.attachTypeGuardMeta)(r,{schema:t})}function I8(e){return typeof e=="function"?e:Array.isArray(e)?M8(e):typeof e=="object"&&e!==null?za(e):e}function O8(e){let t={};for(let[r,o]of Object.entries(e))t[r]=I8(o);return t}function M8(e){let t=e[0],r=za(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,Tx.attachTypeGuardMeta)(o,{itemGuard:r})}dn.isShape=za;dn.isNestedType=za});var Cx=C(VS=>{"use strict";Object.defineProperty(VS,"__esModule",{value:!0});VS.isObjectWith=j8;var N8=_p();function j8(e){return(0,N8.isType)(e)}});var Rx=C(qS=>{"use strict";Object.defineProperty(qS,"__esModule",{value:!0});qS.isObject=z8;var D8=_p();function z8(e){return(0,D8.isType)(e)}});var Ex=C(KS=>{"use strict";Object.defineProperty(KS,"__esModule",{value:!0});KS.guardWithTolerance=H8;function H8(e,t,r){return t(e,r),e}});var Lx=C(JS=>{"use strict";Object.defineProperty(JS,"__esModule",{value:!0});JS.isBranded=F8;var $8=j();function F8(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,$8.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var xx=C(wp=>{"use strict";Object.defineProperty(wp,"__esModule",{value:!0});wp.BrandSymbols=void 0;wp.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var Wx=C(kp=>{"use strict";Object.defineProperty(kp,"__esModule",{value:!0});kp.isAny=void 0;var U8=function(e){return!0};kp.isAny=U8});var Ha=C(XS=>{"use strict";Object.defineProperty(XS,"__esModule",{value:!0});XS.reportTypeGuardError=G8;var B8=j();function G8(e,t,r){e&&e.callbackOnError((0,B8.generateTypeGuardError)(t,e.identifier,r))}});var Ix=C(Tp=>{"use strict";Object.defineProperty(Tp,"__esModule",{value:!0});Tp.isBoolean=void 0;var V8=Ha(),q8=function(t,r){return typeof t!="boolean"?((0,V8.reportTypeGuardError)(r,t,"boolean"),!1):!0};Tp.isBoolean=q8});var Ox=C(vp=>{"use strict";Object.defineProperty(vp,"__esModule",{value:!0});vp.isDate=void 0;var K8=j(),J8=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,K8.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};vp.isDate=J8});var YS=C(Cp=>{"use strict";Object.defineProperty(Cp,"__esModule",{value:!0});Cp.isNumber=void 0;var X8=Ha(),Y8=function(t,r){return typeof t!="number"||isNaN(t)?((0,X8.reportTypeGuardError)(r,t,"number"),!1):!0};Cp.isNumber=Y8});var Mx=C(Rp=>{"use strict";Object.defineProperty(Rp,"__esModule",{value:!0});Rp.isString=void 0;var Z8=Ha(),Q8=function(t,r){return typeof t!="string"?((0,Z8.reportTypeGuardError)(r,t,"string"),!1):!0};Rp.isString=Q8});var Nx=C(Ep=>{"use strict";Object.defineProperty(Ep,"__esModule",{value:!0});Ep.isUnknown=void 0;var e3=function(e){return!0};Ep.isUnknown=e3});var jx=C(Lp=>{"use strict";Object.defineProperty(Lp,"__esModule",{value:!0});Lp.isFunction=void 0;var t3=j(),r3=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,t3.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Lp.isFunction=r3});var zx=C(xp=>{"use strict";Object.defineProperty(xp,"__esModule",{value:!0});xp.isFile=void 0;var Dx=j(),o3=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,Dx.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,Dx.generateTypeGuardError)(e,t.identifier,"File")),!1)};xp.isFile=o3});var $x=C(Wp=>{"use strict";Object.defineProperty(Wp,"__esModule",{value:!0});Wp.isFileList=void 0;var Hx=j(),n3=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,Hx.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,Hx.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Wp.isFileList=n3});var Ux=C(Ip=>{"use strict";Object.defineProperty(Ip,"__esModule",{value:!0});Ip.isBlob=void 0;var Fx=j(),s3=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,Fx.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,Fx.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Ip.isBlob=s3});var Gx=C(Op=>{"use strict";Object.defineProperty(Op,"__esModule",{value:!0});Op.isFormData=void 0;var Bx=j(),i3=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,Bx.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,Bx.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Op.isFormData=i3});var qx=C(Mp=>{"use strict";Object.defineProperty(Mp,"__esModule",{value:!0});Mp.isURL=void 0;var Vx=j(),a3=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,Vx.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,Vx.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Mp.isURL=a3});var Jx=C(Np=>{"use strict";Object.defineProperty(Np,"__esModule",{value:!0});Np.isURLSearchParams=void 0;var Kx=j(),l3=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,Kx.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,Kx.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Np.isURLSearchParams=l3});var Xx=C(jp=>{"use strict";Object.defineProperty(jp,"__esModule",{value:!0});jp.isMap=void 0;var c3=j(),d3=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,c3.generateTypeGuardError)(e,t.identifier,"Map")),!1)};jp.isMap=d3});var Yx=C(Dp=>{"use strict";Object.defineProperty(Dp,"__esModule",{value:!0});Dp.isSet=void 0;var u3=j(),p3=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,u3.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Dp.isSet=p3});var Zx=C(ZS=>{"use strict";Object.defineProperty(ZS,"__esModule",{value:!0});ZS.isIndexSignature=g3;var m3=j();function g3(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,m3.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,u)=>{let g=s[d],h=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),P=t(g,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return h&&P})}}});var Qx=C(zp=>{"use strict";Object.defineProperty(zp,"__esModule",{value:!0});zp.isError=void 0;var f3=Ha(),h3=function(t,r){return t instanceof Error?!0:((0,f3.reportTypeGuardError)(r,t,"Error"),!1)};zp.isError=h3});var eP=C(QS=>{"use strict";Object.defineProperty(QS,"__esModule",{value:!0});QS.isArrayWithEachItem=P3;var y3=j(),S3=er();function P3(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,y3.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,S3.attachTypeGuardMeta)(t,{itemGuard:e})}});var tP=C(Hp=>{"use strict";Object.defineProperty(Hp,"__esModule",{value:!0});Hp.isNonEmptyArray=void 0;var A3=j(),b3=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,A3.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Hp.isNonEmptyArray=b3});var eW=C(rP=>{"use strict";Object.defineProperty(rP,"__esModule",{value:!0});rP.isNonEmptyArrayWithEachItem=k3;var _3=eP(),w3=tP();function k3(e){return function(t,r){return(0,_3.isArrayWithEachItem)(e)(t,r)&&(0,w3.isNonEmptyArray)(t,r)}}});var rW=C(oP=>{"use strict";Object.defineProperty(oP,"__esModule",{value:!0});oP.isTuple=T3;var tW=j();function T3(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,tW.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,tW.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var oW=C(nP=>{"use strict";Object.defineProperty(nP,"__esModule",{value:!0});nP.isObjectWithEachItem=C3;var v3=j();function C3(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,v3.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var nW=C(sP=>{"use strict";Object.defineProperty(sP,"__esModule",{value:!0});sP.isPartialOf=E3;var R3=Po();function E3(e){return function(t,r){if(!(0,R3.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var sW=C(iP=>{"use strict";Object.defineProperty(iP,"__esModule",{value:!0});iP.isPick=x3;var L3=Po();function x3(e,...t){return function(r,o){if(!(0,L3.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var iW=C(aP=>{"use strict";Object.defineProperty(aP,"__esModule",{value:!0});aP.isOmit=I3;var W3=Po();function I3(e,...t){return function(r,o){if(!(0,W3.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),g=u.indexOf(" ("),h=g>=0?u.slice(0,g):u;if(a.has(h))return!1;let P=h.startsWith(s+".")&&h.slice(s.length+1).split(".")[0]||"";return!(P&&!Object.prototype.hasOwnProperty.call(r,P))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var aW=C($p=>{"use strict";Object.defineProperty($p,"__esModule",{value:!0});$p.isNonEmptyString=void 0;var O3=j(),M3=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,O3.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};$p.isNonEmptyString=M3});var lW=C(Fp=>{"use strict";Object.defineProperty(Fp,"__esModule",{value:!0});Fp.isNonNegativeNumber=void 0;var N3=j(),j3=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,N3.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Fp.isNonNegativeNumber=j3});var cW=C(Up=>{"use strict";Object.defineProperty(Up,"__esModule",{value:!0});Up.isPositiveNumber=void 0;var D3=j(),z3=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,D3.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Up.isPositiveNumber=z3});var dW=C(Bp=>{"use strict";Object.defineProperty(Bp,"__esModule",{value:!0});Bp.isNonPositiveNumber=void 0;var H3=j(),$3=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,H3.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Bp.isNonPositiveNumber=$3});var uW=C(Gp=>{"use strict";Object.defineProperty(Gp,"__esModule",{value:!0});Gp.isNegativeNumber=void 0;var F3=j(),U3=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,F3.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Gp.isNegativeNumber=U3});var pW=C(Vp=>{"use strict";Object.defineProperty(Vp,"__esModule",{value:!0});Vp.isInteger=void 0;var B3=j(),G3=YS(),V3=function(e,t){return!(0,G3.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,B3.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Vp.isInteger=V3});var mW=C(qp=>{"use strict";Object.defineProperty(qp,"__esModule",{value:!0});qp.isPositiveInteger=void 0;var q3=j(),K3=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,q3.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};qp.isPositiveInteger=K3});var gW=C(Kp=>{"use strict";Object.defineProperty(Kp,"__esModule",{value:!0});Kp.isNegativeInteger=void 0;var J3=j(),X3=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,J3.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Kp.isNegativeInteger=X3});var fW=C(Jp=>{"use strict";Object.defineProperty(Jp,"__esModule",{value:!0});Jp.isNonNegativeInteger=void 0;var Y3=j(),Z3=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Y3.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Jp.isNonNegativeInteger=Z3});var hW=C(Xp=>{"use strict";Object.defineProperty(Xp,"__esModule",{value:!0});Xp.isNonPositiveInteger=void 0;var Q3=j(),e6=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Q3.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Xp.isNonPositiveInteger=e6});var yW=C(Zp=>{"use strict";Object.defineProperty(Zp,"__esModule",{value:!0});Zp.isNumeric=void 0;var Yp=j(),t6=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Yp.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Yp.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Yp.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Yp.generateTypeGuardError)(e,t.identifier,"number key")),!1};Zp.isNumeric=t6});var SW=C(Qp=>{"use strict";Object.defineProperty(Qp,"__esModule",{value:!0});Qp.isBooleanLike=void 0;var lP=j(),r6=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,lP.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,lP.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Qp.isBooleanLike=r6});var PW=C(em=>{"use strict";Object.defineProperty(em,"__esModule",{value:!0});em.isDateLike=void 0;var $a=j(),o6=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,$a.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,$a.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,$a.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,$a.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,$a.generateTypeGuardError)(e,t.identifier,"date-like")),!1};em.isDateLike=o6});var AW=C(tm=>{"use strict";Object.defineProperty(tm,"__esModule",{value:!0});tm.isBigInt=void 0;var n6=j(),s6=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,n6.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};tm.isBigInt=s6});var dP=C(cP=>{"use strict";Object.defineProperty(cP,"__esModule",{value:!0});cP.isOneOf=i6;var bW=Ms();function i6(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,bW.stringify)(t)}) must be one of following values ${e.map(bW.stringify).join(" | ")}`),o}}});var _W=C(uP=>{"use strict";Object.defineProperty(uP,"__esModule",{value:!0});uP.isOneOfTypes=c6;var a6=Ms(),l6=Ma();function c6(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,a6.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,l6.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;a.includes(u)||a.push(u)}})),r.callbackOnError(a.join(`
`))}return n}}});var wW=C(pP=>{"use strict";Object.defineProperty(pP,"__esModule",{value:!0});pP.isIntersectionOf=d6;function d6(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var kW=C(mP=>{"use strict";Object.defineProperty(mP,"__esModule",{value:!0});mP.isExtensionOf=u6;function u6(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var TW=C(gP=>{"use strict";Object.defineProperty(gP,"__esModule",{value:!0});gP.isNullOr=m6;var p6=er();function m6(e){function t(r,o){return r===null?!0:e(r,o)}return(0,p6.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var vW=C(fP=>{"use strict";Object.defineProperty(fP,"__esModule",{value:!0});fP.isUndefinedOr=f6;var g6=er();function f6(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,g6.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var CW=C(hP=>{"use strict";Object.defineProperty(hP,"__esModule",{value:!0});hP.isNilOr=y6;var h6=er();function y6(e){function t(r,o){return r==null?!0:e(r,o)}return(0,h6.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var RW=C(yP=>{"use strict";Object.defineProperty(yP,"__esModule",{value:!0});yP.isAsserted=S6;function S6(e){return!0}});var EW=C(SP=>{"use strict";Object.defineProperty(SP,"__esModule",{value:!0});SP.isEnum=A6;var P6=dP();function A6(e){return function(t,r){return(0,P6.isOneOf)(...Object.values(e))(t,r)}}});var LW=C(PP=>{"use strict";Object.defineProperty(PP,"__esModule",{value:!0});PP.isEqualTo=w6;var b6=j(),_6=Ms();function w6(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,b6.generateTypeGuardError)(t,r.identifier,`equal to ${(0,_6.stringify)(e)}`)),!1):!0}}});var xW=C(rm=>{"use strict";Object.defineProperty(rm,"__esModule",{value:!0});rm.isRegex=void 0;var k6=j(),T6=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,k6.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};rm.isRegex=T6});var IW=C(AP=>{"use strict";Object.defineProperty(AP,"__esModule",{value:!0});AP.isPattern=v6;var WW=j();function v6(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,WW.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,WW.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var OW=C(bP=>{"use strict";Object.defineProperty(bP,"__esModule",{value:!0});bP.by=C6;function C6(e){return function(t){return e(t,null)}}});var MW=C(_P=>{"use strict";Object.defineProperty(_P,"__esModule",{value:!0});_P.toNumber=R6;function R6(e){return typeof e=="number"?e:Number(e)}});var NW=C(wP=>{"use strict";Object.defineProperty(wP,"__esModule",{value:!0});wP.toDate=E6;function E6(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var jW=C(kP=>{"use strict";Object.defineProperty(kP,"__esModule",{value:!0});kP.toBoolean=L6;function L6(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var DW=C(om=>{"use strict";Object.defineProperty(om,"__esModule",{value:!0});om.isSymbol=void 0;var x6=j(),W6=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,x6.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};om.isSymbol=W6});var Ds=C(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.isDateLike=_.isBooleanLike=_.isNumeric=_.isNonPositiveInteger=_.isNonNegativeInteger=_.isNegativeInteger=_.isPositiveInteger=_.isInteger=_.isNegativeNumber=_.isNonPositiveNumber=_.isPositiveNumber=_.isNonNegativeNumber=_.isNonEmptyString=_.isOmit=_.isPick=_.isPartialOf=_.isObjectWithEachItem=_.isNonNullObject=_.isTuple=_.isNonEmptyArrayWithEachItem=_.isNonEmptyArray=_.isArrayWithEachItem=_.isError=_.isIndexSignature=_.isSet=_.isMap=_.isURLSearchParams=_.isURL=_.isFormData=_.isBlob=_.isFileList=_.isFile=_.isFunction=_.isUnknown=_.isString=_.isNumber=_.isNil=_.isDefined=_.isDate=_.isBoolean=_.isAny=_.BrandSymbols=_.isBranded=_.guardWithTolerance=_.isObject=_.isObjectWith=_.isNestedType=_.isShape=_.isSchema=_.isType=void 0;_.isSymbol=_.toBoolean=_.toDate=_.toNumber=_.by=_.generateTypeGuardError=_.isPattern=_.isRegex=_.isEqualTo=_.isEnum=_.isAsserted=_.isNilOr=_.isUndefinedOr=_.isNullOr=_.isExtensionOf=_.isIntersectionOf=_.isOneOfTypes=_.isOneOf=_.isBigInt=void 0;var I6=_p();Object.defineProperty(_,"isType",{enumerable:!0,get:function(){return I6.isType}});var TP=vx();Object.defineProperty(_,"isSchema",{enumerable:!0,get:function(){return TP.isSchema}});Object.defineProperty(_,"isShape",{enumerable:!0,get:function(){return TP.isShape}});Object.defineProperty(_,"isNestedType",{enumerable:!0,get:function(){return TP.isNestedType}});var O6=Cx();Object.defineProperty(_,"isObjectWith",{enumerable:!0,get:function(){return O6.isObjectWith}});var M6=Rx();Object.defineProperty(_,"isObject",{enumerable:!0,get:function(){return M6.isObject}});var N6=Ex();Object.defineProperty(_,"guardWithTolerance",{enumerable:!0,get:function(){return N6.guardWithTolerance}});var j6=Lx();Object.defineProperty(_,"isBranded",{enumerable:!0,get:function(){return j6.isBranded}});var D6=xx();Object.defineProperty(_,"BrandSymbols",{enumerable:!0,get:function(){return D6.BrandSymbols}});var z6=Wx();Object.defineProperty(_,"isAny",{enumerable:!0,get:function(){return z6.isAny}});var H6=Ix();Object.defineProperty(_,"isBoolean",{enumerable:!0,get:function(){return H6.isBoolean}});var $6=Ox();Object.defineProperty(_,"isDate",{enumerable:!0,get:function(){return $6.isDate}});var F6=FS();Object.defineProperty(_,"isDefined",{enumerable:!0,get:function(){return F6.isDefined}});var U6=Pp();Object.defineProperty(_,"isNil",{enumerable:!0,get:function(){return U6.isNil}});var B6=YS();Object.defineProperty(_,"isNumber",{enumerable:!0,get:function(){return B6.isNumber}});var G6=Mx();Object.defineProperty(_,"isString",{enumerable:!0,get:function(){return G6.isString}});var V6=Nx();Object.defineProperty(_,"isUnknown",{enumerable:!0,get:function(){return V6.isUnknown}});var q6=jx();Object.defineProperty(_,"isFunction",{enumerable:!0,get:function(){return q6.isFunction}});var K6=zx();Object.defineProperty(_,"isFile",{enumerable:!0,get:function(){return K6.isFile}});var J6=$x();Object.defineProperty(_,"isFileList",{enumerable:!0,get:function(){return J6.isFileList}});var X6=Ux();Object.defineProperty(_,"isBlob",{enumerable:!0,get:function(){return X6.isBlob}});var Y6=Gx();Object.defineProperty(_,"isFormData",{enumerable:!0,get:function(){return Y6.isFormData}});var Z6=qx();Object.defineProperty(_,"isURL",{enumerable:!0,get:function(){return Z6.isURL}});var Q6=Jx();Object.defineProperty(_,"isURLSearchParams",{enumerable:!0,get:function(){return Q6.isURLSearchParams}});var e7=Xx();Object.defineProperty(_,"isMap",{enumerable:!0,get:function(){return e7.isMap}});var t7=Yx();Object.defineProperty(_,"isSet",{enumerable:!0,get:function(){return t7.isSet}});var r7=Zx();Object.defineProperty(_,"isIndexSignature",{enumerable:!0,get:function(){return r7.isIndexSignature}});var o7=Qx();Object.defineProperty(_,"isError",{enumerable:!0,get:function(){return o7.isError}});var n7=eP();Object.defineProperty(_,"isArrayWithEachItem",{enumerable:!0,get:function(){return n7.isArrayWithEachItem}});var s7=tP();Object.defineProperty(_,"isNonEmptyArray",{enumerable:!0,get:function(){return s7.isNonEmptyArray}});var i7=eW();Object.defineProperty(_,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return i7.isNonEmptyArrayWithEachItem}});var a7=rW();Object.defineProperty(_,"isTuple",{enumerable:!0,get:function(){return a7.isTuple}});var l7=Po();Object.defineProperty(_,"isNonNullObject",{enumerable:!0,get:function(){return l7.isNonNullObject}});var c7=oW();Object.defineProperty(_,"isObjectWithEachItem",{enumerable:!0,get:function(){return c7.isObjectWithEachItem}});var d7=nW();Object.defineProperty(_,"isPartialOf",{enumerable:!0,get:function(){return d7.isPartialOf}});var u7=sW();Object.defineProperty(_,"isPick",{enumerable:!0,get:function(){return u7.isPick}});var p7=iW();Object.defineProperty(_,"isOmit",{enumerable:!0,get:function(){return p7.isOmit}});var m7=aW();Object.defineProperty(_,"isNonEmptyString",{enumerable:!0,get:function(){return m7.isNonEmptyString}});var g7=lW();Object.defineProperty(_,"isNonNegativeNumber",{enumerable:!0,get:function(){return g7.isNonNegativeNumber}});var f7=cW();Object.defineProperty(_,"isPositiveNumber",{enumerable:!0,get:function(){return f7.isPositiveNumber}});var h7=dW();Object.defineProperty(_,"isNonPositiveNumber",{enumerable:!0,get:function(){return h7.isNonPositiveNumber}});var y7=uW();Object.defineProperty(_,"isNegativeNumber",{enumerable:!0,get:function(){return y7.isNegativeNumber}});var S7=pW();Object.defineProperty(_,"isInteger",{enumerable:!0,get:function(){return S7.isInteger}});var P7=mW();Object.defineProperty(_,"isPositiveInteger",{enumerable:!0,get:function(){return P7.isPositiveInteger}});var A7=gW();Object.defineProperty(_,"isNegativeInteger",{enumerable:!0,get:function(){return A7.isNegativeInteger}});var b7=fW();Object.defineProperty(_,"isNonNegativeInteger",{enumerable:!0,get:function(){return b7.isNonNegativeInteger}});var _7=hW();Object.defineProperty(_,"isNonPositiveInteger",{enumerable:!0,get:function(){return _7.isNonPositiveInteger}});var w7=yW();Object.defineProperty(_,"isNumeric",{enumerable:!0,get:function(){return w7.isNumeric}});var k7=SW();Object.defineProperty(_,"isBooleanLike",{enumerable:!0,get:function(){return k7.isBooleanLike}});var T7=PW();Object.defineProperty(_,"isDateLike",{enumerable:!0,get:function(){return T7.isDateLike}});var v7=AW();Object.defineProperty(_,"isBigInt",{enumerable:!0,get:function(){return v7.isBigInt}});var C7=dP();Object.defineProperty(_,"isOneOf",{enumerable:!0,get:function(){return C7.isOneOf}});var R7=_W();Object.defineProperty(_,"isOneOfTypes",{enumerable:!0,get:function(){return R7.isOneOfTypes}});var E7=wW();Object.defineProperty(_,"isIntersectionOf",{enumerable:!0,get:function(){return E7.isIntersectionOf}});var L7=kW();Object.defineProperty(_,"isExtensionOf",{enumerable:!0,get:function(){return L7.isExtensionOf}});var x7=TW();Object.defineProperty(_,"isNullOr",{enumerable:!0,get:function(){return x7.isNullOr}});var W7=vW();Object.defineProperty(_,"isUndefinedOr",{enumerable:!0,get:function(){return W7.isUndefinedOr}});var I7=CW();Object.defineProperty(_,"isNilOr",{enumerable:!0,get:function(){return I7.isNilOr}});var O7=RW();Object.defineProperty(_,"isAsserted",{enumerable:!0,get:function(){return O7.isAsserted}});var M7=EW();Object.defineProperty(_,"isEnum",{enumerable:!0,get:function(){return M7.isEnum}});var N7=LW();Object.defineProperty(_,"isEqualTo",{enumerable:!0,get:function(){return N7.isEqualTo}});var j7=xW();Object.defineProperty(_,"isRegex",{enumerable:!0,get:function(){return j7.isRegex}});var D7=IW();Object.defineProperty(_,"isPattern",{enumerable:!0,get:function(){return D7.isPattern}});var z7=j();Object.defineProperty(_,"generateTypeGuardError",{enumerable:!0,get:function(){return z7.generateTypeGuardError}});var H7=OW();Object.defineProperty(_,"by",{enumerable:!0,get:function(){return H7.by}});var $7=MW();Object.defineProperty(_,"toNumber",{enumerable:!0,get:function(){return $7.toNumber}});var F7=NW();Object.defineProperty(_,"toDate",{enumerable:!0,get:function(){return F7.toDate}});var U7=jW();Object.defineProperty(_,"toBoolean",{enumerable:!0,get:function(){return U7.toBoolean}});var B7=DW();Object.defineProperty(_,"isSymbol",{enumerable:!0,get:function(){return B7.isSymbol}})});var zs,zW,G7,HW,$W=l(()=>{"use strict";zs=m(require("node:path")),zW=require("node:url"),G7=()=>!0,HW=()=>{if(G7()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?zs.default.dirname(zs.default.resolve(e)):zs.default.dirname(zs.default.resolve(__filename))}return zs.default.dirname((0,zW.fileURLToPath)(__agentWitchImportMetaUrl))}});var vP,FW,D,UW,V7,tr,CP,R,Fa,rr,RP,Ua,un,EP,LP,xP,Ba,ye,Ao,nm,He,sm,N,WP=l(()=>{"use strict";vP=m(require("node:fs")),FW=m(require("node:os")),D=m(require("node:path")),UW=m(Ds());ke();$W();rp();rp();V7=HW(),tr=e=>e.trim().toLowerCase(),CP=e=>tr(e).replace(/@/g,"-at-").replace(/\./g,"-").replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,""),R=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return D.default.resolve(e);let t=D.default.resolve(V7),r=D.default.basename(t),o=D.default.basename(D.default.dirname(t));return r===DS&&(o===Qt||o===Tr)?D.default.dirname(t):r===Qt||r===Tr?t:D.default.join(FW.default.homedir(),Qt)},Fa=(e=R())=>D.default.join(e,DS),rr=(e=R())=>D.default.join(Fa(e),sx),RP=(e,t,r)=>t!==null?D.default.join(e,We,t,r):D.default.join(e,r),Ua=e=>RP(e.installDir,e.profileEmail,xa),un=e=>RP(e.installDir,e.profileEmail,xt),EP=e=>D.default.join(e.logsDir,sn),LP=e=>D.default.join(e.logsDir,an),xP=e=>RP(e.installDir,e.profileEmail,Wa),Ba=e=>e.profileEmail!==null?D.default.join(e.installDir,We,e.profileEmail,yo):D.default.join(e.installDir,yo),ye=(e=R())=>Ia(e),Ao=(e=R())=>So(e)?Zu:Yu,nm=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return tr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?tr(t):null},He=(e=R())=>{let t=D.default.join(e,jS);if(!vP.default.existsSync(t))return null;try{let r=JSON.parse(vP.default.readFileSync(t,"utf8"));if((0,UW.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return tr(r.email)}catch{return null}return null},sm=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?tr(r):null}let t=nm();return t!==null?t:He()},N=e=>{let t=R(),r=Fa(t),o=rr(t),n=sm(e);if(n!==null){let P=D.default.join(t,We,n),S=D.default.join(P,Qu),y=D.default.join(P,xa),p=D.default.join(P,nn.projectDataDir),A=D.default.join(P,xt),T=D.default.join(P,Wa),f=D.default.join(P,yo),b=D.default.join(P,xt,sn),w=D.default.join(P,xt,an);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,projectDataDir:p,logsDir:A,mainLogPath:b,errorLogPath:w,reportsDir:T,deviceKeypairPath:f,configPath:D.default.join(P,"config.json"),harnessRootDir:S,harnessManifestPath:D.default.join(S,tp),harnessSetsDir:D.default.join(S,ep)}}let s=D.default.join(t,Qu),i=D.default.join(t,xa),a=D.default.join(t,nn.projectDataDir),c=D.default.join(t,xt),d=D.default.join(t,Wa),u=D.default.join(t,yo),g=D.default.join(t,xt,sn),h=D.default.join(t,xt,an);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,projectDataDir:a,logsDir:c,mainLogPath:g,errorLogPath:h,reportsDir:d,deviceKeypairPath:u,configPath:D.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:D.default.join(s,tp),harnessSetsDir:D.default.join(s,ep)}}});var q7,Hs,IP=l(()=>{"use strict";q7=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},Hs=e=>e.filePort??q7(e.envValue)??e.defaultPort});var OP,BW,K7,J7,MP,$s,GW=l(()=>{"use strict";OP=m(require("node:fs")),BW=m(require("node:path"));ke();WP();IP();K7=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),J7=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,MP=e=>{let t=BW.default.join(e,La.wakePort);if(!OP.default.existsSync(t))return null;try{let r=JSON.parse(OP.default.readFileSync(t,"utf8"));if(K7(r)&&J7(r.wakePort))return r.wakePort}catch{return null}return null},$s=(e=R())=>Hs({filePort:MP(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:Ao(e)})});var VW={};yt(VW,{isAgentWitchLocalInstallDir:()=>So,readActiveProfileEmailFromFile:()=>He,readAgentWitchWakePortFromFile:()=>MP,resolveActiveProfileEmail:()=>sm,resolveActiveProfileEmailFromEnv:()=>nm,resolveAgentWitchAppBundlePath:()=>rr,resolveAgentWitchAppDir:()=>Fa,resolveAgentWitchDefaultWakePort:()=>Ao,resolveAgentWitchDeviceKeypairPath:()=>Ba,resolveAgentWitchErrorLogPath:()=>LP,resolveAgentWitchInstallDir:()=>R,resolveAgentWitchLaunchAgentPrefix:()=>ye,resolveAgentWitchLocalLayout:()=>N,resolveAgentWitchLogsDir:()=>un,resolveAgentWitchMainLogPath:()=>EP,resolveAgentWitchProjectsDir:()=>Ua,resolveAgentWitchReportsDir:()=>xP,resolveAgentWitchRuntimeWakePort:()=>$s,resolveAgentWitchWakePortFromSources:()=>Hs,sanitizeProfileEmailForDir:()=>tr,sanitizeProfileEmailForLaunchAgentLabel:()=>CP});var G=l(()=>{"use strict";WP();GW();IP()});var NP,jP,im=l(()=>{"use strict";NP=new Set(["","loginwindow","_mbsetupuser","root"]),jP=5e3});var qW,X7,KW,DP,zP=l(()=>{"use strict";qW=require("node:child_process");im();X7=e=>e.trim().toLowerCase(),KW=e=>e==null?!1:!NP.has(X7(e)),DP=()=>{if(process.platform!=="darwin")return null;try{let t=(0,qW.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return KW(t)?t:null}catch{return null}}});var XW,JW,Wt,Ga=l(()=>{"use strict";XW=m(require("node:os"));zP();JW=e=>e.trim().toLowerCase(),Wt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?DP():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??XW.default.userInfo().username;return JW(r)===JW(o)}});var YW,ZW,pn,QW=l(()=>{"use strict";YW=require("node:child_process"),ZW=m(require("node:fs"));G();Ga();pn=(e=R())=>{let t=rr(e);if(!ZW.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!Wt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=He(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,YW.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var eI,Va,am=l(()=>{"use strict";eI=require("node:child_process"),Va=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,eI.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var lm,HP,tI,ae,cm,qa=l(()=>{"use strict";lm=m(require("node:fs")),HP=m(require("node:path"));G();ke();tI=e=>{let t=HP.default.join(e,We);return lm.default.existsSync(t)?lm.default.readdirSync(t).filter(r=>lm.default.statSync(HP.default.join(t,r)).isDirectory()).map(r=>tr(r)).toSorted():[]},ae=(e=R())=>{let t=ye(e),r=tI(e);return[{profileEmail:He(e)??r[0]??null,launchAgentLabel:t}]},cm=(e=R())=>tI(e)});var $P,rI,oI,Y7,vr,dm=l(()=>{"use strict";$P=m(require("node:fs")),rI=m(require("node:os")),oI=m(require("node:path"));G();qa();Y7=()=>oI.default.join(rI.default.homedir(),"Library","LaunchAgents"),vr=(e=R())=>{let t=ye(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ae(e))r.add(n.launchAgentLabel);let o=Y7();if($P.default.existsSync(o))for(let n of $P.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var nI,Ka,sI=l(()=>{"use strict";G();am();dm();qa();nI=(e=R())=>{let t=new Set(ae(e).map(r=>r.launchAgentLabel));return vr(e).filter(r=>!t.has(r))},Ka=(e=R())=>{for(let t of nI(e))Va(t)}});var Ja,FP=l(()=>{"use strict";G();am();dm();Ja=(e=R())=>{for(let t of vr(e))Va(t)}});var iI,aI,Z7,mn,lI=l(()=>{"use strict";iI=require("node:child_process"),aI=require("node:util"),Z7=(0,aI.promisify)(iI.execFile),mn=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await Z7("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var gn,Q7,UP,BP=l(()=>{"use strict";gn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Q7=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,UP=e=>{let t=e.pathValue??Q7(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${gn(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${gn(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${gn(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${gn(e.homeDir)}</string>
    <key>PATH</key>
    <string>${gn(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${gn(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${gn(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var um,GP=l(()=>{"use strict";um=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Xa,VP,pm,mm,Cr,gm=l(()=>{"use strict";Xa=m(require("node:fs")),VP=m(require("node:os")),pm=m(require("node:path"));ke();G();BP();GP();mm=(e,t=VP.default.homedir())=>pm.default.join(t,"Library","LaunchAgents",`${e}.plist`),Cr=e=>{let t=e.installDir??R(),r=e.homeDir??VP.default.homedir(),o=mm(e.launchAgentLabel,r),n=Xa.default.existsSync(o)?Xa.default.readFileSync(o,"utf8"):null;if(n!==null&&um(n))return{ok:!0,rewritten:!1,plistPath:o};let s=UP({launchAgentLabel:e.launchAgentLabel,runPath:pm.default.join(t,nx,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??$s(t)});if(!um(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Xa.default.mkdirSync(pm.default.dirname(o),{recursive:!0}),Xa.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var dI,uI,pI,Ya,eX,tX,cI,$e,qP=l(()=>{"use strict";dI=require("node:child_process"),uI=m(require("node:fs")),pI=require("node:util");G();gm();Ga();Ya=(0,pI.promisify)(dI.execFile),eX=async e=>{try{return await Ya("launchctl",["print",e]),!0}catch{return!1}},tX=async(e,t,r)=>{await eX(t)&&await Ya("launchctl",["bootout",t]).catch(()=>{}),await Ya("launchctl",["bootstrap",e,r]),await Ya("launchctl",["enable",t])},cI=async e=>{try{return await Ya("launchctl",["kickstart","-k",e]),!0}catch{return!1}},$e=async(e,t=R())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!Wt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=Cr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await cI(n))return{ok:!0};let i=s.plistPath;if(!uI.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await tX(o,n,i),await cI(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var fn,mI=l(()=>{"use strict";G();qP();qa();fn=async(e=R())=>{let t=[];for(let r of ae(e))(await $e(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var gI,fI,hI=l(()=>{"use strict";gI=/(<key>AGENT_WITCH_WAKE_PORT<\/key>\s*<string>)[^<]*(<\/string>)/,fI=(e,t)=>gI.test(e)?e.replace(gI,`$1${String(t)}$2`):null});var fm,yI,KP,SI=l(()=>{"use strict";fm=m(require("node:fs")),yI=m(require("node:os"));gm();hI();KP=e=>{let t=e.homeDir??yI.default.homedir(),r=[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`],o=[];for(let n of r){let s=mm(n,t);if(!fm.default.existsSync(s))continue;let i=fm.default.readFileSync(s,"utf8"),a=fI(i,e.wakePort);a===null||a===i||(fm.default.writeFileSync(s,a,"utf8"),o.push(s))}return o}});var at,Rr,PI=l(()=>{"use strict";FP();Ga();im();at=e=>{Wt()||(Ja(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Rr=(e,t=jP)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{Wt()||e()},t);return()=>{clearInterval(r)}}});var oe=l(()=>{"use strict";ux();QW();am();sI();FP();dm();Ga();lI();mI();qP();gm();GP();SI();BP();qa();zP();im();PI()});var JP=l(()=>{"use strict";oe()});var AI,bI,hm,_I,Fs,wI,kI,hn=l(()=>{"use strict";AI=".agent-witch",bI="memory",hm="project.json",_I="chunks.ndjson",Fs="runs.ndjson",wI="reports",kI=".json"});var TI=l(()=>{"use strict";hn()});var vI,ym,XP=l(()=>{"use strict";vI=m(require("node:path"));TI();ym=(e,t)=>vI.default.join(e.trim(),`${t.trim()}${kI}`)});var Za,CI,RI=l(()=>{"use strict";Za="agent-witch.js",CI="command"});var Sm=l(()=>{"use strict";RI()});var yn,EI,LI=l(()=>{"use strict";Sm();yn=e=>`'${e.replace(/'/g,"'\\''")}'`,EI=e=>{let t=`${e.installDir.trim()}/${"app"}/${Za}`,r=[yn("node"),yn(t),"report","write","--key",yn(e.reportKey.trim()),"--agent-run-id",yn(e.agentRunId.trim()),"--status",yn(e.status),"--summary",yn(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",yn(e.details.trim())),r.join(" ")}});var or,xI,rX,YP,Pm=l(()=>{"use strict";XP();LI();or={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},xI=e=>e===or.COMPLETED||e===or.FAILED,rX=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),YP=(e,t)=>{let r=ym(t.reportsDir,t.reportKey),o=EI({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:or.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${rX({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Fe=l(()=>{"use strict";ke();G()});var el,II,WI,OI,oX,Us,nX,MI,tl,rl,ZP,NI,jI,ol=l(()=>{"use strict";el=m(require("node:fs")),II=m(require("node:path"));Pm();XP();Fe();WI=50,OI=e=>{let t=N(),r=ym(t.reportsDir,e);return el.default.mkdirSync(II.default.dirname(r),{recursive:!0}),r},oX=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Us=e=>{let t=OI(e);if(!el.default.existsSync(t))return null;try{let r=JSON.parse(el.default.readFileSync(t,"utf8"));return oX(r)?r:null}catch{return null}},nX=(e,t)=>{let r=[...e,t];return r.length>WI?r.slice(r.length-WI):r},MI=e=>{let t=OI(e.reportKey);el.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},tl=e=>{let t=Us(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:nX(t?.history??[],o)};return MI(n),n},rl=e=>{let t=Us(e.reportKey);return t!==null?t:tl({reportKey:e.reportKey,agentRunId:e.agentRunId,status:or.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},ZP=(e,t)=>{let r=t.trim();if(r.length===0)return Us(e);let o=Us(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return MI(s),s},NI=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},jI=e=>{if(e===null||!xI(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===or.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var sX,iX,nl,DI,Am,QP=l(()=>{"use strict";Pm();ol();sX=new Set(Object.values(or)),iX=e=>sX.has(e),nl=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},DI=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Am=e=>{if(e[0]!=="write")return DI(),1;let r=nl(e,"--key"),o=nl(e,"--agent-run-id"),n=nl(e,"--status"),s=nl(e,"--summary"),i=nl(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!iX(n)?(DI(),1):(tl({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var lt,Sn=l(()=>{"use strict";lt=()=>!0});var eA,zI,Pn,bm=l(()=>{"use strict";eA=m(require("node:path")),zI=require("node:url");Sn();Pn=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=eA.default.resolve(t);return lt()?r===eA.default.resolve(__filename):e===void 0?!1:r===(0,zI.fileURLToPath)(e)}});var _m,Bs,cX,Tde,Gs=l(()=>{"use strict";_m="agent-witch.js",Bs="deps.tar.gz",cX="install.sh",Tde={mainScript:`app/${_m}`,depsArchive:`app/${Bs}`,installShell:cX}});var UI=l(()=>{"use strict";Gs()});var BI=l(()=>{"use strict";Gs();UI()});var sl,rA,wm,dX,il,Ue,qs,al,ll,An,oA=l(()=>{"use strict";sl=m(require("node:fs")),rA=m(require("node:path"));BI();G();wm="install-version.json",dX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),il=(e=R())=>rA.default.join(e,wm),Ue=(e=R())=>{let t=il(e);if(!sl.default.existsSync(t))return null;try{let r=JSON.parse(sl.default.readFileSync(t,"utf8"));return!dX(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},qs=(e,t=R())=>{let r=il(t);sl.default.mkdirSync(rA.default.dirname(r),{recursive:!0}),sl.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},al=(e=R())=>Ue(e)?.bundleVersion??"261",ll=(e,t)=>{let r=Ue(e);if(r!==null)return r;let o={bundleVersion:"261",appOrigin:t,updatedAt:new Date().toISOString()};return qs(o,e),o},An=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var GI,bn,nA,sA,iA,km,nr,_n,aA=l(()=>{"use strict";GI=require("node:crypto"),bn=m(require("node:fs")),nA=m(require("node:path"));G();sA="self-update-log.ndjson",iA=100,km=(e=R())=>{let t=N(),r=t.installDir===e?t.logsDir:un({installDir:e,profileEmail:t.profileEmail});return nA.default.join(r,sA)},nr=(e,t=R())=>{let r={id:(0,GI.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=km(t);bn.default.mkdirSync(nA.default.dirname(o),{recursive:!0});let n=bn.default.existsSync(o)?bn.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-iA+1)),JSON.stringify(r)];return bn.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},_n=(e=20,t=R())=>{let r=km(t);if(!bn.default.existsSync(r))return[];let o=bn.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var lA,Fde,cA=l(()=>{"use strict";Gs();lA="deps",Fde=`${"app"}/${Bs}`});var VI=l(()=>{"use strict";cA()});var qI,bo,wn,KI,dA,uA,JI=l(()=>{"use strict";qI=require("node:child_process"),bo=m(require("node:fs")),wn=m(require("node:path"));Gs();cA();KI=e=>wn.default.join(e,"app",lA),dA=e=>{let t=wn.default.join(e,"app"),r=wn.default.join(t,Bs);bo.default.existsSync(r)&&(bo.default.rmSync(KI(e),{recursive:!0,force:!0}),bo.default.mkdirSync(t,{recursive:!0}),(0,qI.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),bo.default.rmSync(r,{force:!0}))},uA=e=>{bo.default.rmSync(wn.default.join(e,"node_modules"),{recursive:!0,force:!0}),bo.default.rmSync(wn.default.join(e,"package.json"),{force:!0}),bo.default.rmSync(wn.default.join(e,"package-lock.json"),{force:!0})}});var XI=l(()=>{"use strict";VI();JI()});var cl,dl=l(()=>{"use strict";cl="agent-witch.service"});var YI=l(()=>{"use strict";dl()});var Tm,vm,Cm=l(()=>{"use strict";Tm="AGENT_WITCH_EXTERNAL_BRIDGE",vm="AGENT_WITCH_EXTERNAL_LIVE"});var ZI=l(()=>{"use strict";Cm();dl()});var QI,pA,e0=l(()=>{"use strict";QI=require("node:child_process");dl();pA=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,QI.spawn)("systemctl",["--user","restart",cl],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${cl} exited ${o??"unknown"}`))})})});var t0=l(()=>{"use strict";dl();YI();ZI();e0()});var ct,Rm,r0=l(()=>{"use strict";ct="https://www.agentwitch.com",Rm="wss://www.agentwitch.com/api/agent-witch/ws"});var ul,Er,o0=l(()=>{"use strict";ul="127.0.0.1",Er=`http://${ul}:43347`});var St=l(()=>{"use strict";r0();o0()});var pl,Em,n0,gA,pX,s0,yA,i0,It,ml,gl,SA,fA,hA,fl,hl,PA,AA,Ks=l(()=>{"use strict";pl=m(require("node:fs")),Em=m(require("node:path")),n0="active-writer-work.json",gA=new Set,pX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),s0=e=>e.profileEmail===null?Em.default.join(e.installDir,n0):Em.default.join(e.installDir,"profiles",e.profileEmail,n0),yA=e=>{let t=s0(e);if(!pl.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(pl.default.readFileSync(t,"utf8"));return!pX(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},i0=(e,t)=>{let r=s0(e);pl.default.mkdirSync(Em.default.dirname(r),{recursive:!0}),pl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},It=e=>yA(e).activeCount>0,ml=e=>{let t=yA(e);i0(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},gl=e=>{let t=yA(e),r=Math.max(0,t.activeCount-1);if(i0(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of gA)o()},SA=e=>(gA.add(e),()=>{gA.delete(e)}),fA=null,hA=null,fl=e=>{fA=e},hl=e=>{hA=e},PA=()=>{let e=fA;return fA=null,e},AA=()=>{let e=hA;return hA=null,e}});var Ie,Lm=l(()=>{"use strict";Ie=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Js,xm,yl,bA=l(()=>{"use strict";Js="qwen2.5:7b",xm="nomic-embed-text",yl="Install Ollama from https://ollama.com/download"});var Sl,_A,Wm=l(()=>{"use strict";bA();Sl=()=>`
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
    echo "Ollama is missing. ${yl}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${yl}" >&2
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
  agent_witch_ensure_ollama_model "${Js}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${xm}" "\${pull_log}"
}
`,_A=()=>`
${Sl()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var a0,mX,Im,wA=l(()=>{"use strict";a0=require("node:child_process");G();Wm();mX=e=>new Promise(t=>{let r=(0,a0.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:R()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Im=async(e=mX)=>{let t=`${Sl()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var _o,Om,l0,gX,c0,Ys,fX,hX,yX,Xs,kn,Tn,d0=l(()=>{"use strict";_o=m(require("node:fs")),Om=m(require("node:path"));XI();t0();oe();G();Gs();St();oA();Ks();Lm();aA();wA();l0=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gX=e=>{let t=He(e),r=t===null?N():N(t);if(!_o.default.existsSync(r.configPath))return null;try{let o=JSON.parse(_o.default.readFileSync(r.configPath,"utf8"));return!l0(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},c0=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!l0(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},Ys=async e=>(await c0(e))?.bundleVersion??null,fX=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Om.default.join(t,r);_o.default.mkdirSync(Om.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());_o.default.writeFileSync(n,s),r.endsWith(".js")&&_o.default.chmodSync(n,493)},hX=async()=>{if(process.platform==="linux"){try{await pA()}catch(e){let t=e instanceof Error?e.message:String(e);console.warn(`[agent-witch-self-update] Linux service restart skipped: ${t}`)}return}Ka(),await fn()},yX=(e,t)=>e!==null?Ie(e):t??ct,Xs=(e,t)=>({localBundleVersion:t,...e}),kn=async e=>{let t=R(),r=Ue(t),o=r?.bundleVersion??null,n=await Im();nr({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=gX(t),i=yX(s,r?.appOrigin);if(i===null){let d=Xs({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return nr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await c0(i);if(a===null){let d=Xs({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return nr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||An(o,a.bundleVersion))){let d=Xs({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return nr({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let h of a.scripts)await fX(i,t,h);let d=Om.default.join(t,_m);_o.default.existsSync(d)&&_o.default.rmSync(d,{force:!0}),dA(t),uA(t),qs({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=N(He(t));if(It(u)){hl("install-bundle-update");let h=Xs({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return nr({event:"update_applied",ok:!0,message:h.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),h}await hX();let g=Xs({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return nr({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let u=d instanceof Error?d.message:"Agent Witch self-update failed.",g=Xs({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},o);return nr({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}},Tn=()=>{let e=R();return{local:Ue(e),logs:_n(20,e)}}});var u0={};yt(u0,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>wm,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>yl,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>xm,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>Js,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>sA,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>iA,appendAgentWitchSelfUpdateLog:()=>nr,buildAgentWitchEnsureOllamaShell:()=>Sl,buildAgentWitchInstallScriptOllama:()=>_A,buildAgentWitchSelfUpdateStatus:()=>Tn,ensureAgentWitchInstallVersionRecorded:()=>ll,ensureAgentWitchOllamaInstalled:()=>Im,fetchAgentWitchRemoteInstallBundleVersion:()=>Ys,isRemoteAgentWitchBundleVersionNewer:()=>An,readAgentWitchInstallVersion:()=>Ue,readAgentWitchSelfUpdateLogs:()=>_n,resolveAgentWitchAppOriginFromWsUrl:()=>Ie,resolveAgentWitchHeartbeatInstallBundleVersion:()=>al,resolveAgentWitchInstallVersionPath:()=>il,resolveAgentWitchSelfUpdateLogPath:()=>km,runAgentWitchSelfUpdate:()=>kn,writeAgentWitchInstallVersion:()=>qs});var sr=l(()=>{"use strict";oA();aA();d0();Lm();bA();Wm();wA()});var kA={};yt(kA,{buildAgentWitchSelfUpdateStatus:()=>Tn,fetchAgentWitchRemoteInstallBundleVersion:()=>Ys,runAgentWitchSelfUpdate:()=>kn});var TA=l(()=>{"use strict";sr()});function Zs(e){return(0,p0.createHash)("sha256").update(e.trim()).digest("hex")}var p0,Mm=l(()=>{"use strict";p0=require("node:crypto")});var Qs,Pl,SX,ei,vA,Nm=l(()=>{"use strict";Qs=m(require("node:fs")),Pl=m(require("node:path"));Mm();Fe();SX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ei=e=>{if(!Qs.default.existsSync(e))return null;try{let t=JSON.parse(Qs.default.readFileSync(e,"utf8"));return!SX(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Zs(t.pairingToken.trim())}catch{return null}},vA=(e=R())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(ei(Pl.default.join(e,"config.json")));let n=Pl.default.join(e,We);if(!Qs.default.existsSync(n))return t;for(let s of Qs.default.readdirSync(n)){let i=Pl.default.join(n,s);Qs.default.statSync(i).isDirectory()&&o(ei(Pl.default.join(i,"config.json")))}return t}});var ti,Al=l(()=>{"use strict";ti="connection-health.json"});var vn,jm,PX,bl,_e,CA,Dm,Oe,zm=l(()=>{"use strict";vn=m(require("node:fs")),jm=m(require("node:path"));Al();PX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bl=e=>e.profileEmail===null?jm.default.join(e.installDir,ti):jm.default.join(e.installDir,"profiles",e.profileEmail,ti),_e=e=>{let t=bl(e);if(!vn.default.existsSync(t))return null;try{let r=JSON.parse(vn.default.readFileSync(t,"utf8"));return!PX(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},CA=e=>{let t=bl(e);vn.default.existsSync(t)&&vn.default.rmSync(t,{force:!0})},Dm=(e,t)=>{let r=bl(e),o=_e(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};vn.default.mkdirSync(jm.default.dirname(r),{recursive:!0}),vn.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Oe=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var _l,m0=l(()=>{"use strict";Al();zm();_l=(e,t)=>{if(!t.socketOpen)return!1;let r=_e(e);return r===null?!1:!Oe(r,t.staleAfterMs??12e4,t.nowMs)}});var RA,g0=l(()=>{"use strict";zm();RA=(e,t)=>!(e!==null&&!Oe(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Cn=l(()=>{"use strict";zm();m0();g0();Al()});var Hm,EA,AX,bX,f0,h0=l(()=>{"use strict";Hm=m(require("node:fs")),EA=m(require("node:path"));G();ke();Cn();Nm();AX=12e4,bX=e=>{let t=EA.default.join(e,We);return Hm.default.existsSync(t)?Hm.default.readdirSync(t).filter(r=>Hm.default.statSync(EA.default.join(t,r)).isDirectory()):[]},f0=(e=R())=>{let t=null,r=-1;for(let o of bX(e)){let n=N(o),s=_e(n);if(s===null||Oe(s,AX))continue;let i=ei(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var LA,y0,$m,wl,kl,_X,wX,kX,S0,Se,Pe,Fm,ir,Ot=l(()=>{"use strict";LA=m(require("node:fs")),y0=m(require("node:os")),$m=m(require("node:path")),wl={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},kl=e=>e.trim().length>0,_X=e=>{let t=$m.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},wX=()=>{let e=y0.default.homedir(),t=$m.default.join(e,".local","bin","agent");if(LA.default.existsSync(t))return t;let r=$m.default.join(e,".local","bin","cursor-agent");return LA.default.existsSync(r)?r:wl.cursorCommand},kX=e=>{let t=e.trim();return!kl(t)||t===wl.cursorCommand?wX():t},S0=(e,t)=>_X(e)?t:["agent",...t],Se=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Pe=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:kl(t)?t.trim():wl.claudeCommand,codexCommand:kl(r)?r.trim():wl.codexCommand,cursorCommand:kX(o),antigravityCommand:kl(n)?n.trim():wl.antigravityCommand}},Fm=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:S0(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},ir=(e,t,r,o)=>{let n=t.trim();if(!kl(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:S0(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"--dangerously-skip-permissions","-p",n]}}});var wo,TX,Rn,vX,ri,Tl=l(()=>{"use strict";wo=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,TX=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:wo(s.inputTokens)+wo(s.outputTokens)+wo(s.cacheReadInputTokens)+wo(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Rn=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=wo(a.input_tokens)+wo(a.cache_creation_input_tokens)+wo(a.cache_read_input_tokens),d=wo(a.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:TX(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},vX=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),ri=(e,t)=>{let r=Rn(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??vX(r)}}});var xA,CX,RX,WA,IA=l(()=>{"use strict";xA=e=>e.toLocaleString("en-US"),CX=e=>e<.01?e.toFixed(4):e.toFixed(3),RX=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${CX(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${xA(e.inputTokens)} in / ${xA(e.outputTokens)} out (${xA(e.totalTokens)} total)`,t].join(`
`)},WA=(e,t)=>{if(t===void 0)return e;let r=RX(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Um,OA=l(()=>{"use strict";Um={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var En,MA,Bm,NA=l(()=>{"use strict";OA();En="auto",MA=e=>({value:En,label:`Auto (${Um[e]})`}),Bm={anthropic:[MA("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[MA("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[MA("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var oi,vl,Gm,ni=l(()=>{"use strict";OA();NA();oi=e=>{let t=e?.trim()??"";if(!(t.length===0||t===En))return t},vl=(e,t)=>{let r=oi(t);return r===void 0?Um[e]:r},Gm=e=>{let t=oi(e);return t===void 0?En:t}});var Vm,EX,LX,qm,P0=l(()=>{"use strict";Vm={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},EX=e=>{let t=Vm[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Vm["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Vm["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Vm["gemini-2.0-flash"]:null},LX=(e,t,r)=>{let o=EX(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},qm=e=>{let t=LX(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var si,xX,WX,IX,Km,A0=l(()=>{"use strict";P0();si=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),xX=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=si(r.input_tokens),n=si(r.output_tokens);return o===0&&n===0?null:qm({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},WX=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=si(r.prompt_tokens),n=si(r.completion_tokens);return o===0&&n===0?null:qm({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},IX=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=si(r.promptTokenCount),n=si(r.candidatesTokenCount);return o===0&&n===0?null:qm({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Km=(e,t,r)=>e==="anthropic"?xX(t,r):e==="openai"?WX(t,r):IX(t,r)});var OX,jA,MX,NX,jX,DX,zX,DA,zA=l(()=>{"use strict";ni();A0();OX=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},jA=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:vl(e,t.model)},MX=async e=>{let t=jA("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=OX(o);n.length>0&&e.onChunk?.(n);let s=Km("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},NX=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},jX=async e=>{let t=jA("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=NX(o);n.length>0&&e.onChunk?.(n);let s=Km("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},DX=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},zX=async e=>{let t=jA("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=DX(n);s.length>0&&e.onChunk?.(s);let i=Km("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},DA=async e=>{try{return e.provider==="anthropic"?await MX(e):e.provider==="openai"?await jX(e):await zX(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var dt,Cl=l(()=>{"use strict";dt=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var b0,HX,Jm,HA=l(()=>{"use strict";b0=m(require("node:path")),HX="writer-api-secrets.json",Jm=e=>b0.default.join(e,HX)});var $A,_0,$X,ko,Qe,To=l(()=>{"use strict";$A=m(require("node:fs"));ni();HA();_0=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$X=e=>{if(!_0(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=oi(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},ko=e=>{let t=Jm(e);if(!$A.default.existsSync(t))return{};try{let r=JSON.parse($A.default.readFileSync(t,"utf8"));if(!_0(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=$X(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Qe=(e,t)=>ko(e)[t]??null});var Be,Rl=l(()=>{"use strict";Be=e=>e==="api"?"api":"cli"});var w0,Ne,Ln,Lr=l(()=>{"use strict";w0=m(require("node:path"));Cl();To();Rl();Ne=e=>w0.default.dirname(e),Ln=(e,t)=>{if(Be(e.writerExecutionBackend)!=="api")return!1;let r=dt(t);if(r===null)return!1;let o=Ne(e.layout.configPath),n=Qe(o,r);return n!==null&&n.apiKey.length>0}});var El,FA=l(()=>{"use strict";IA();zA();Cl();To();Lr();El=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=dt(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Ne(e.layout.configPath),a=Qe(i,s);if(a===null){let d=Object.keys(ko(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await DA({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:WA(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var k0,ii,UA=l(()=>{"use strict";k0=require("node:child_process");Ot();Tl();FA();Lr();ii=(e,t,r)=>new Promise(o=>{if(!Se(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Ln(e,t)){El(e,t,r).then(o);return}let n=ir(t,r,Pe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,k0.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=ri(i.join("")),u=a.join("").trim(),g=[d.output.trim(),u].filter(h=>h.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var T0=l(()=>{"use strict"});var v0=l(()=>{"use strict";IA();UA();zA();T0();To();Lr()});var C0,R0,E0,L0=l(()=>{"use strict";C0="claude",R0="codex",E0="cursor"});var x0,FX,BA,Ll,Xm=l(()=>{"use strict";x0=m(require("node:path"));St();ke();FX="ws://localhost:3000/api/agent-witch/ws",BA=e=>e.replace(/\/$/,""),Ll=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return BA(t);let r=x0.default.basename(e.installDir);if(r===Ea.production)return Rm;let o=e.configWsUrl?.trim()??"";return r===Ea.localhost?o.length>0?BA(o):FX:o.length>0?BA(o):Rm}});var BX,GA,VA=l(()=>{"use strict";L0();Xm();Rl();BX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GA=e=>{if(!BX(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Ll({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??C0,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??R0,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??E0,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Be(t.writerExecutionBackend),layout:e.layout}}}});var qA,KA,JA=l(()=>{"use strict";qA=m(require("node:fs"));G();VA();KA=e=>{let t=N(e);if(!qA.default.existsSync(t.configPath))return null;try{let r=JSON.parse(qA.default.readFileSync(t.configPath,"utf8")),o=GA({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var xl,W0=l(()=>{"use strict";xl=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var XA,GX,YA,I0=l(()=>{"use strict";XA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GX=e=>{if(!XA(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!XA(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(g=>{if(!XA(g))return[];let h=typeof g.itemKey=="string"?g.itemKey.trim():"",P=typeof g.relativePath=="string"?g.relativePath:"",S=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return h.length===0||S.length===0?[]:[{itemKey:h,relativePath:P,contentSha256:S}]});return u.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},YA=GX});var O0,VX,Ym,ZA=l(()=>{"use strict";O0=m(require("node:path")),VX=(e,t)=>{let r=t.trim();return O0.default.join(e,"components","store",r.slice(0,2),r)},Ym=VX});var M0,qX,QA,N0=l(()=>{"use strict";M0=m(require("node:fs"));ZA();qX=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Ym(e.installDir,n.contentSha256);M0.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},QA=qX});var Wl,ai,KX,eb,JX,tb,rb=l(()=>{"use strict";Wl=m(require("node:fs")),ai=m(require("node:path"));ZA();KX=(e,t)=>ai.default.join(e.installDir,"runs",t,"overlay"),eb=(e,t)=>ai.default.join(KX(e,t),".cursor"),JX=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=eb(e,t);Wl.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Ym(e.installDir,i.contentSha256);if(!Wl.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?ai.default.join(n,c):ai.default.join(n,i.itemKey);Wl.default.mkdirSync(ai.default.dirname(d),{recursive:!0}),Wl.default.copyFileSync(a,d)}return{ok:!0}},tb=JX});var ob,j0,XX,Il,D0=l(()=>{"use strict";ob=m(require("node:fs")),j0=m(require("node:path")),XX=(e,t)=>{let r=j0.default.join(e.installDir,"runs",t);ob.default.existsSync(r)&&ob.default.rmSync(r,{recursive:!0,force:!0})},Il=XX});var YX,nb,z0=l(()=>{"use strict";rb();YX=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=eb(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},nb=YX});var sb,ZX,QX,e9,t9,r9,z,H0=l(()=>{"use strict";sb=m(require("node:fs"));Xm();G();Rl();ZX="claude",QX="codex",e9="cursor",t9="agy",r9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),z=()=>{let e=N();if(!sb.default.existsSync(e.configPath))return null;try{let t=JSON.parse(sb.default.readFileSync(e.configPath,"utf8"));if(!r9(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Ll({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Be(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:ZX,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:QX,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e9,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:t9,pairingToken:s,layout:e}}catch{return null}}});var Zm,$0,F0=l(()=>{"use strict";Zm=m(require("node:fs"));HA();$0=(e,t)=>{let r=Jm(e);Zm.default.mkdirSync(e,{recursive:!0}),Zm.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Zm.default.chmodSync(r,384)}catch{}}});var Ol,U0,Qm=l(()=>{"use strict";Ol=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},U0=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Ol(t)}});var Ml,o9,ib,ab,B0=l(()=>{"use strict";Ml=m(require("node:fs"));To();F0();Qm();ni();Lr();o9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ib=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=U0(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?oi(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},ab=e=>{let t=Ne(e.configPath),r={};if(Ml.default.existsSync(e.configPath))try{let n=JSON.parse(Ml.default.readFileSync(e.configPath,"utf8"));o9(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Ml.default.mkdirSync(t,{recursive:!0}),Ml.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=ib(ib(ib(ko(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);$0(t,o)}});var eg,lb=l(()=>{"use strict";eg={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var cb,G0=l(()=>{"use strict";Cl();To();Lr();Lr();cb=(e,t)=>{if(Ln(e,t)||t==="antigravity")return!1;let r=dt(t);if(r===null)return!1;let o=Ne(e.layout.configPath),n=Qe(o,r);return n===null||n.apiKey.trim().length===0}});var V0,db,ub=l(()=>{"use strict";V0=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},db=async e=>{let t=V0(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=V0(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var n9,pb,q0=l(()=>{"use strict";oe();JA();ub();n9=1e4,pb=()=>db({listProfileEmails:cm,readConfig:KA,pollIntervalMs:n9,logWaiting:e=>{console.error(e)}})});var s9,mb,K0=l(()=>{"use strict";s9={accepted:"Restart accepted; Local is restarting.",already_in_progress:"Restart already in progress.",deferred_writer_busy:"Restart deferred until the active writer task finishes.",unsupported:"This Agent Witch Local cannot handle Connect/restart. Update from /download."},mb=e=>({status:e.status,reason:e.reason,message:s9[e.status]})});var ee=l(()=>{"use strict";UA();v0();JA();Xm();W0();I0();N0();rb();D0();z0();Rl();H0();B0();To();Lr();Qm();ni();lb();FA();Lr();G0();Cl();To();q0();VA();ub();K0()});var J0,gb,X0=l(()=>{"use strict";J0=m(require("node:path"));G();ke();h0();Mm();Nm();ee();gb=(e=R())=>{let t=f0(e);if(t!==null)return t;let r=He(e);if(r!==null){let n=ei(J0.default.join(e,We,r,"config.json"));if(n!==null)return n}let o=z()?.pairingToken.trim()??"";return o.length===0?null:Zs(o)}});var tg,Y0,i9,a9,Z0,rg,Nl,og,jl=l(()=>{"use strict";tg=m(require("node:fs")),Y0=m(require("node:path")),i9="wake-port.json",a9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Z0=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,rg=e=>Y0.default.join(e,i9),Nl=e=>{let t=rg(e);if(!tg.default.existsSync(t))return null;try{let r=JSON.parse(tg.default.readFileSync(t,"utf8"));if(a9(r)&&Z0(r.wakePort))return r.wakePort}catch{return null}return null},og=(e,t)=>{if(!Z0(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=rg(e);tg.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var qge,Kge,Jge,Mt,Q0,Dl=l(()=>{"use strict";G();jl();Fe();jl();qge=Ao(),Kge=`${ye()}-wake`,Jge=ye(),Mt=()=>{let e=R();return Hs({filePort:Nl(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:Ao(e)})},Q0=e=>{let t=R();Nl(t)===null&&og(t,e)}});var eO=l(()=>{"use strict";Mm();oe();Nm();X0();ee();Dl()});var fb,zl,Hl,tO=l(()=>{"use strict";fb=m(require("node:os"));eO();zl=()=>{let e=ae();return{ok:!0,port:Mt(),hostname:fb.default.hostname(),profileCount:e.length}},Hl=()=>{let e=ae(),t=gb(),r=vA();return{hostname:fb.default.hostname(),port:Mt(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var hb=l(()=>{"use strict";tO()});var rO,oO,nO,ng,li=l(()=>{"use strict";rO="materialization.json",oO="backups",nO=".gitignore",ng=e=>`harness-set:${e.trim()}`});var sO,iO,sg,aO=l(()=>{"use strict";sO=m(require("node:crypto")),iO=m(require("node:fs")),sg=e=>{try{let t=iO.default.readFileSync(e);return sO.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var vo,xn,l9,lO,yb,cO=l(()=>{"use strict";vo=m(require("node:fs")),xn=m(require("node:path"));aO();l9=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=xn.default.join(t,n,o);return vo.default.mkdirSync(xn.default.dirname(s),{recursive:!0}),vo.default.copyFileSync(r,s),xn.default.relative(e,s).replaceAll("\\","/")},lO=e=>{let t=xn.default.join(e.repoRoot,e.repoRelativeDestination),r=sg(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(vo.default.existsSync(t)){let n=sg(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=l9(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return vo.default.mkdirSync(xn.default.dirname(t),{recursive:!0}),vo.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return vo.default.mkdirSync(xn.default.dirname(t),{recursive:!0}),vo.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},yb=e=>{let t=sg(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var Sb,dO,ci,ig=l(()=>{"use strict";Sb=m(require("node:fs"));li();dO=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ci=e=>{if(!Sb.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(Sb.default.readFileSync(e,"utf8"));if(dO(t)&&t.version===1&&dO(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var Co,ag,lg,Pb=l(()=>{"use strict";Co=m(require("node:fs")),ag=m(require("node:path"));li();lg=e=>{let t=new Set(e.setSlugs.map(s=>ng(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=ag.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=ag.default.join(e.repoRoot,i.backupPath);Co.default.existsSync(c)?(Co.default.mkdirSync(ag.default.dirname(a),{recursive:!0}),Co.default.copyFileSync(c,a),o.push(s)):Co.default.existsSync(a)&&Co.default.rmSync(a,{force:!0})}else Co.default.existsSync(a)&&Co.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var Ab,di,cg=l(()=>{"use strict";Ab=m(require("node:path"));li();di=e=>({ledgerFilePath:Ab.default.join(e.metaDirPath,rO),backupsDirPath:Ab.default.join(e.metaDirPath,oO)})});var bb,uO,pO=l(()=>{"use strict";bb=m(require("node:path")),uO=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return bb.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return bb.default.posix.join(s,e,n)}});var _b,mO,Fl,wb=l(()=>{"use strict";_b=m(require("node:fs")),mO=m(require("node:path")),Fl=(e,t)=>{_b.default.mkdirSync(mO.default.dirname(e),{recursive:!0}),_b.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var kb,c9,Ge,Ro=l(()=>{"use strict";kb=m(require("node:os")),c9=e=>{let t=e.trim();return t.startsWith("~/")?`${kb.default.homedir()}${t.slice(1)}`:t==="~"?kb.default.homedir():t},Ge=c9});var dg,gO,d9,fO,hO=l(()=>{"use strict";dg=m(require("node:fs")),gO=m(require("node:path"));li();hn();d9=`*
!${hm}
`,fO=e=>{let t=gO.default.join(e,nO);dg.default.existsSync(t)||(dg.default.mkdirSync(e,{recursive:!0}),dg.default.writeFileSync(t,d9))}});var Wn,Pt,In=l(()=>{"use strict";Wn=m(require("node:path"));hn();Ro();Pt=e=>{let t=Ge(e),r=Wn.default.join(t,AI);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Wn.default.join(r,"rag"),memoryDirPath:Wn.default.join(r,bI),reportsDirPath:Wn.default.join(r,wI),metaFilePath:Wn.default.join(r,hm),ragChunksFilePath:Wn.default.join(r,"rag",_I)}}});var ar,SO,u9,p9,Xe,ug=l(()=>{"use strict";ar=m(require("node:fs")),SO=m(require("node:path"));hn();hO();In();u9=(e,t)=>{if(ar.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};ar.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},p9=e=>{ar.default.existsSync(e.ragChunksFilePath)||ar.default.writeFileSync(e.ragChunksFilePath,"");let t=SO.default.join(e.memoryDirPath,Fs);ar.default.existsSync(t)||ar.default.writeFileSync(t,"")},Xe=e=>{let t=Pt(e.projectFolderPath);return ar.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),ar.default.mkdirSync(t.ragDirPath,{recursive:!0}),ar.default.mkdirSync(t.memoryDirPath,{recursive:!0}),fO(t.metaDirPath),u9(t,e),p9(t),{ok:!0,layout:t}}});var PO,AO,bO,_O,pg,mg=l(()=>{"use strict";PO="components",AO="store",bO="versions",_O="installed.json",pg=e=>`harness-set:${e.trim()}`});var Tb,wO,gg,vb=l(()=>{"use strict";Tb=m(require("node:fs")),wO=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gg=e=>{if(!Tb.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(Tb.default.readFileSync(e,"utf8"));if(wO(t)&&t.version===1&&wO(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var Ul,ui,fg=l(()=>{"use strict";Ul=m(require("node:path"));mg();ui=e=>{let t=Ul.default.join(e,PO);return{componentsRootDir:t,storeDir:Ul.default.join(t,AO),versionsDir:Ul.default.join(t,bO),installedFilePath:Ul.default.join(t,_O)}}});var Cb,kO,hg,yg,Sg=l(()=>{"use strict";Cb=m(require("node:crypto")),kO=m(require("node:fs")),hg=e=>Cb.default.createHash("sha256").update(e,"utf8").digest("hex"),yg=e=>{try{let t=kO.default.readFileSync(e);return Cb.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Rb,TO,vO,CO=l(()=>{"use strict";Rb=m(require("node:fs")),TO=m(require("node:path")),vO=(e,t)=>{Rb.default.mkdirSync(TO.default.dirname(e),{recursive:!0}),Rb.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var Eb,Lb,RO,EO=l(()=>{"use strict";Eb=m(require("node:fs")),Lb=m(require("node:path")),RO=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=Lb.default.join(e,r),n=Lb.default.join(o,`${t.versionId}.json`);Eb.default.mkdirSync(o,{recursive:!0}),Eb.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var Pg,LO,xO,WO=l(()=>{"use strict";Pg=m(require("node:fs")),LO=m(require("node:path"));Sg();xO=e=>{let t=hg(e.content),r=LO.default.join(e.storeDir,t);return Pg.default.existsSync(r)||(Pg.default.mkdirSync(e.storeDir,{recursive:!0}),Pg.default.writeFileSync(r,e.content)),t}});var xb,IO,m9,Ag,Wb=l(()=>{"use strict";xb=m(require("node:fs")),IO=m(require("node:path"));mg();vb();fg();Sg();CO();EO();WO();m9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ag=e=>{let t=ui(e.installDir),r=pg(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!m9(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=IO.default.join(e.harnessRootDir,a);if(!xb.default.existsSync(c))continue;let d=xb.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:yg(c);if(u!==null){if(hg(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);xO({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:u})}}if(n.length===0)return;RO(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=gg(t.installedFilePath);vO(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var Ob,Ib,OO,MO=l(()=>{"use strict";Ob=m(require("node:fs"));Wb();vb();fg();Ib=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),OO=e=>{if(!Ob.default.existsSync(e.harnessManifestPath))return;let t=ui(e.installDir),r=gg(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(Ob.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!Ib(o)||o.version!==1||!Ib(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!Ib(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Ag({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var Mb,NO,jO,DO=l(()=>{"use strict";Mb=m(require("node:fs")),NO=m(require("node:path")),jO=e=>{let t=e.componentId.replaceAll("/","_"),r=NO.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!Mb.default.existsSync(r))return null;try{let o=JSON.parse(Mb.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var bg,_g,zO,HO=l(()=>{"use strict";bg=m(require("node:fs")),_g=m(require("node:path"));mg();MO();DO();fg();Sg();zO=e=>{OO({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=ui(e.layout.installDir),r=pg(e.setSlug),o=jO({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=_g.default.join(t.storeDir,i.contentSha256);if(bg.default.existsSync(a)&&yg(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?_g.default.join(e.layout.harnessRootDir,n):_g.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!bg.default.existsSync(s))return null;try{if(!bg.default.statSync(s).isFile())return null}catch{return null}return s}});var $O,g9,Nb,lr,Bl=l(()=>{"use strict";ig();cg();In();$O="harness-set:",g9=e=>{let t=e.trim();if(!t.startsWith($O))return null;let r=t.slice($O.length).trim();return r.length>0?r:null},Nb=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=g9(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},lr=e=>{let t=Pt(e),{ledgerFilePath:r}=di(t),o=ci(r);return Nb(o)}});var wg,jb,Gl,f9,xr,Vl,pi=l(()=>{"use strict";wg=m(require("node:fs")),jb=m(require("node:os")),Gl=m(require("node:path")),f9=()=>wg.default.realpathSync(Gl.default.resolve(jb.default.homedir())),xr=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Gl.default.join(jb.default.homedir(),t.slice(1)):t,o;try{o=wg.default.realpathSync(Gl.default.resolve(r))}catch{return null}let n=f9();return o===n||o.startsWith(`${n}${Gl.default.sep}`)?o:null},Vl=e=>{let t=xr(e);if(t===null)return null;try{if(!wg.default.statSync(t).isFile())return null}catch{return null}return t}});var Db,zb=l(()=>{"use strict";Db=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Tg,FO,kg,h9,ql,Hb=l(()=>{"use strict";Tg=m(require("node:fs")),FO=m(require("node:path"));li();cO();ig();Pb();cg();pO();wb();Ro();ug();HO();Bl();pi();zb();kg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),h9=e=>{if(!Tg.default.existsSync(e))return null;try{let t=JSON.parse(Tg.default.readFileSync(e,"utf8"));if(kg(t)&&t.version===1)return t}catch{return null}return null},ql=e=>{let t=[...new Set(e.setSlugs.map(A=>A.trim()).filter(A=>A.length>0))],r=Ge(e.projectFolderPath),o=xr(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Tg.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Xe({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=di(s.layout),d=lr(o).filter(A=>!t.includes(A)),u=ci(i),g=0;if(d.length>0){let A=lg({repoRoot:o,setSlugs:d,ledger:u});u=A.ledger,g=A.summary.removedPaths.length}if(t.length===0)return Fl(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let h=h9(e.layout.harnessManifestPath);if(h===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let P=kg(h.sets)?h.sets:{},S=0,y=0,p=0;for(let A of t){let T=P[A];if(!kg(T))return{ok:!1,errorMessage:`Harness set "${A}" is not installed locally.`};let f=typeof T.version=="number"?String(T.version):"1",b=ng(A),w=Array.isArray(T.items)?T.items:[];for(let v of w){if(!kg(v))continue;let k=typeof v.path=="string"?v.path.trim():"";if(k.length===0)continue;let x=Db(k);if(x===null)continue;let E=uO(A,x),M=FO.default.posix.join(".cursor",E).replaceAll("\\","/"),O=typeof v.id=="string"?v.id.trim():"",F=zO({layout:e.layout,setSlug:A,setVersion:typeof T.version=="number"?T.version:1,manifestItemPath:k,manifestItemId:O});if(F===null)continue;let B=lO({repoRoot:o,backupsDir:a,repoRelativeDestination:M,sourceAbsolutePath:F,componentId:b,versionId:f,ledger:u});if(B.kind==="skipped_unchanged"){y+=1;continue}if(B.kind==="backed_up_user_file"){p+=1,S+=1,u={version:1,entries:{...u.entries,[M]:yb({componentId:b,versionId:f,sourceAbsolutePath:F,backupPath:B.backupPath})}};continue}S+=1,u={version:1,entries:{...u.entries,[M]:yb({componentId:b,versionId:f,sourceAbsolutePath:F})}}}}return S===0&&y===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(Fl(i,u),{ok:!0,writtenFileCount:S,skippedFileCount:y,backedUpFileCount:p,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var UO,vg,y9,S9,P9,A9,b9,_9,w9,k9,T9,Kl,Cg=l(()=>{"use strict";UO=m(require("node:crypto")),vg=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},y9=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},S9=(e,t)=>{let r=y9(t),o=vg(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},P9=(e,t,r)=>{let o=S9(t,r);return`shared/items/${e}/${o}`},A9=["rules","skills","commands","instructions","agents"],b9=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),_9=(e,t)=>[...e.filter(o=>o.id!==t.id),t],w9=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},k9=e=>UO.default.createHash("sha256").update(e,"utf8").digest("hex"),T9=e=>({id:e.id,kind:e.kind,title:e.title,path:P9(e.id,e.kind,e.title),contentSha256:k9(e.content)}),Kl=e=>{let t=new Date().toISOString(),r=e.existingManifest??b9(e.hostname,t),o=vg(e.bundle.slug),n=w9(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...A9.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let g=T9(u);return{files:[...d.files,{relativePath:g.path,content:u.content}],nextItems:_9(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var Eo,BO,Rg,v9,On,$b=l(()=>{"use strict";Eo=m(require("node:fs")),BO=m(require("node:os")),Rg=m(require("node:path"));Cg();v9=e=>{if(!Eo.default.existsSync(e))return null;try{let t=JSON.parse(Eo.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},On=e=>{try{let t=v9(e.layout.harnessManifestPath),r=Kl({bundle:e.bundle,hostname:BO.default.hostname(),existingManifest:t});Eo.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)Eo.default.mkdirSync(Rg.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Rg.default.join(e.layout.harnessRootDir,o.relativePath);Eo.default.mkdirSync(Rg.default.dirname(n),{recursive:!0}),Eo.default.writeFileSync(n,o.content)}return Eo.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var Fb,GO=l(()=>{"use strict";$b();Hb();Fb=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=On({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return ql({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var VO,qO=l(()=>{"use strict";VO=["rule","skill","command","instruction","agent"]});var KO,C9,R9,cr,Ub=l(()=>{"use strict";qO();KO=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),C9=e=>typeof e=="string"&&VO.includes(e),R9=e=>{if(!KO(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!C9(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},cr=e=>{if(!KO(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=R9(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var JO,E9,Bb,XO=l(()=>{"use strict";JO=require("node:zlib");Ub();E9="x-agent-witch-token",Bb=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[E9]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,JO.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=cr(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var Vb,Gb,dr,YO=l(()=>{"use strict";Vb=m(require("node:fs")),Gb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),dr=e=>{if(!Vb.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(Vb.default.readFileSync(e.harnessManifestPath,"utf8"));if(!Gb(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=Gb(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!Gb(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Eg,ZO=l(()=>{"use strict";Eg=()=>"~"});var QO,eM,tM=l(()=>{"use strict";QO=require("node:crypto"),eM=e=>`local-${(0,QO.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var qb,rM=l(()=>{"use strict";qb=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Jl,Lg,Kb=l(()=>{"use strict";Jl=m(require("node:path")),Lg=e=>{let t=Jl.default.dirname(e),r=Jl.default.basename(t);return r==="agents"?Jl.default.basename(Jl.default.dirname(t)):r}});var Xl,Wr,oM,L9,x9,W9,xg,nM,Jb=l(()=>{"use strict";Xl=m(require("node:fs")),Wr=m(require("node:path"));tM();rM();Kb();oM=new Set(["node_modules",".git","dist","build",".next","coverage"]),L9=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},x9=(e,t)=>{let r=Wr.default.basename(t);if(e==="skill"){let o=t.split(Wr.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},W9=e=>{let t=[],r=(n,s)=>{let i;try{i=Xl.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&oM.has(a.name))continue;let c=Wr.default.join(n,a.name),d=s?Wr.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;qb(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=Wr.default.join(e,n);Xl.default.existsSync(s)&&r(s,n)}let o=Wr.default.join(e,"skills");return Xl.default.existsSync(o)&&r(o,"skills"),t},xg=e=>{let t=W9(e);if(t.length===0)return null;let r=Wr.default.dirname(e),o=Lg(e),n=L9(o),s=t.map(i=>{let a=qb(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:eM(i.absolutePath),kind:a,title:x9(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},nM=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Xl.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||oM.has(a.name))continue;let c=Wr.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var sM,Xb,I9,Yb,iM=l(()=>{"use strict";sM=m(require("node:fs")),Xb=m(require("node:path"));Jb();pi();I9=e=>{let t=xr(e.trim());if(t===null)return null;if(Xb.default.basename(t)===".cursor")return t;let r=Xb.default.join(t,".cursor");try{if(sM.default.statSync(r).isDirectory())return xr(r)}catch{return null}return null},Yb=e=>{let t=I9(e.projectPath);if(t===null)return null;let r=xg(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var aM,O9,Wg,Zb,lM=l(()=>{"use strict";aM=m(require("node:path"));Jb();pi();Kb();O9=5,Wg=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Zb=e=>{let t=xr(e.scanRoot.trim());if(t===null)return Wg(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of nM(t,O9,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=xr(s);if(i===null)continue;let a=Lg(i);Wg(e.response,"folder",{cursorDir:i,groupName:a,repoPath:aM.default.dirname(i)});let c=xg(i);c!==null&&(r.push(c),Wg(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Wg(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var cM,dM,uM=l(()=>{"use strict";cM=m(require("node:path")),dM=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:cM.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Ye,pM,Qb,M9,e_,t_,Ig,r_,Yl,mM=l(()=>{"use strict";Ye=m(require("node:fs")),pM=m(require("node:os")),Qb=m(require("node:path"));Cg();Wb();pi();uM();M9=e=>{if(!Ye.default.existsSync(e))return null;try{let t=JSON.parse(Ye.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},e_=e=>{let t=e.hostname??pM.default.hostname(),r=M9(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let c=[];for(let u of a){let g=Vl(u.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let h=Ye.default.readFileSync(g,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:h,setSlugs:[i.slug]})}let d=Kl({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Ye.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Ye.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=Qb.default.join(e.layout.harnessRootDir,i.relativePath);Ye.default.mkdirSync(Qb.default.dirname(a),{recursive:!0}),Ye.default.writeFileSync(a,i.content)}Ye.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=vg(i.slug),d=r.sets[c];d!==void 0&&Ag({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},t_="reveal-cache.json",Ig=(e,t)=>{Ye.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Ye.default.writeFileSync(`${e.harnessRootDir}/${t_}`,`${JSON.stringify(t,null,2)}
`)},r_=e=>{let t=`${e.harnessRootDir}/${t_}`;Ye.default.existsSync(t)&&Ye.default.unlinkSync(t)},Yl=e=>{let t=`${e.harnessRootDir}/${t_}`;if(!Ye.default.existsSync(t))return null;try{let r=JSON.parse(Ye.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return dM(r)}catch{return null}return null}});var Lo=l(()=>{"use strict";Hb();GO();zb();$b();XO();Ub();Cg();YO();ZO();iM();pi();lM();mM()});var o_,gM=l(()=>{"use strict";Lo();Fe();o_=e=>{let t=N(e.profileEmail);return On({bundle:e.bundle,layout:t})}});var fM=l(()=>{"use strict";gM();Lo()});var N9,hM,j9,yM,Mn,Og,SM=l(()=>{"use strict";N9=["agentwitch.com","www.agentwitch.com"],hM=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,j9=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},yM=e=>{let t=j9(e);return!!(N9.includes(t)||hM.test(e.trim().toLowerCase()))},Mn=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return yM(r)?hM.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Og=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Mn(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Zl=l(()=>{"use strict";SM()});var Ir,Ql=l(()=>{"use strict";Ir=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var ec,PM=l(()=>{"use strict";fM();Zl();Ql();ec=e=>{if(!Ir(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=cr(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Mn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=o_({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var n_=l(()=>{"use strict";PM()});var D9,mi,s_=l(()=>{"use strict";D9=e=>e==="hourly"||e==="daily"||e==="weekdays",mi=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!D9(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var tc,Mg,AM,bM,i_,Nt,Ng,jg,Dg,zg,Hg=l(()=>{"use strict";tc=m(require("node:fs")),Mg=m(require("node:path"));s_();AM="automations.json",bM=e=>e.profileEmail!==null?Mg.default.join(e.installDir,"profiles",e.profileEmail,AM):Mg.default.join(e.installDir,AM),i_=()=>({version:1,automations:[]}),Nt=e=>{let t=bM(e);if(!tc.default.existsSync(t))return i_();try{let r=JSON.parse(tc.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?i_():{version:1,automations:r.automations.flatMap(n=>{let s=mi(n);return s!==null?[s]:[]})}}catch{return i_()}},Ng=(e,t)=>{let r=bM(e);tc.default.mkdirSync(Mg.default.dirname(r),{recursive:!0}),tc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},jg=(e,t)=>{Ng(e,{version:1,automations:t})},Dg=(e,t)=>{let o=Nt(e).automations.filter(n=>n.id!==t.id);Ng(e,{version:1,automations:[...o,t]})},zg=(e,t)=>Nt(e).automations.find(r=>r.id===t)??null});var ne,At=l(()=>{"use strict";ne="x-agent-witch-token"});var a_=l(()=>{"use strict";Lm();Wm()});var V,Nn,l_,rc,c_,z9,d_,oc,jn,u_,xo=l(()=>{"use strict";At();a_();V=e=>{let t=Ie(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Nn=e=>({[ne]:e,"Content-Type":"application/json"}),l_=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Nn(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},rc=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Nn(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},c_=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Nn(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},z9=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},d_=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:Nn(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},oc=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Nn(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return z9(r)}catch{return null}},jn=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:Nn(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},u_=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Nn(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Dn,_M,wM,H9,p_,kM,m_=l(()=>{"use strict";Dn=m(require("node:fs")),_M=m(require("node:path")),wM=e=>_M.default.join(e.harnessRootDir,"projects-registry.json"),H9=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),p_=e=>{let t=wM(e);if(!Dn.default.existsSync(t))return[];try{let r=JSON.parse(Dn.default.readFileSync(t,"utf8"));return H9(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},kM=e=>{let t=wM(e);if(!Dn.default.existsSync(t))return;let r=`${t}.migrated`;if(Dn.default.existsSync(r)){Dn.default.unlinkSync(t);return}Dn.default.renameSync(t,r)}});var TM,$9,F9,vM,CM=l(()=>{"use strict";Ro();TM=e=>Ge(e),$9=e=>new Set(e.map(t=>TM(t.folderPath))),F9=e=>new Set(e.map(t=>t.id)),vM=(e,t)=>{let r=$9(t),o=F9(t),n=[],s=new Set;for(let i of e){let a=TM(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var g_,f_=l(()=>{"use strict";xo();m_();CM();g_=async(e,t)=>{let r=p_(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=V({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await oc(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=vM(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await d_(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&kM(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var h_,ur,nc=l(()=>{"use strict";h_=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),ur=(e,t)=>e.find(r=>r.id===t)??null});var Wo,sc=l(()=>{"use strict";xo();f_();nc();Wo=async(e,t)=>{t!==void 0&&await g_(t,e);let r=V({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await oc(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=h_(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var RM=l(()=>{"use strict"});var y_,U9,$g,S_=l(()=>{"use strict";y_=m(require("node:fs"));In();U9=e=>{let t=Pt(e);if(!y_.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(y_.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},$g=U9});var P_,A_,EM=l(()=>{"use strict";P_=m(require("node:path"));Ro();S_();A_=e=>{let t=P_.default.resolve(Ge(e)),r=o=>{let{projectId:n}=$g(o);if(n!==null)return n;let s=P_.default.dirname(o);return s===o?null:r(s)};return r(t)}});var B9,G9,Fg,b_=l(()=>{"use strict";B9="Default",G9=e=>e.trim().toLowerCase()===B9.toLowerCase(),Fg=G9});var __,w_,k_,Ae,T_=l(()=>{"use strict";__=["block","warn","info"],w_=["seed","project","retired"],k_="warn",Ae={symptom:120,cause:200,avoidance:280,checkValue:280,keyword:40,keywords:24,tag:32,tags:12,id:64}});var v_,Or,LM,xM,C_,Io,WM=l(()=>{"use strict";T_();v_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Or=e=>typeof e=="string"?e:null,LM=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],xM=e=>{if(!v_(e))return null;let t=Or(e.id)?.trim()??"",r=Or(e.symptom)?.trim()??"";if(t.length===0||r.length===0)return null;let o=w_.find(d=>d===e.source)??"project",n=__.find(d=>d===e.severity)??k_,s=v_(e.check)?e.check:null,i=s?.kind==="command"?"command":"id",a=Or(s?.value)?.trim()??"",c=Or(e.projectId)?.trim()??null;return{id:t,projectId:c!==null&&c.length>0?c:null,symptom:r,cause:Or(e.cause)?.trim()??"",avoidance:Or(e.avoidance)?.trim()??"",check:{kind:i,value:a.length>0?a:t},keywords:LM(e.keywords),tags:LM(e.tags),source:o,overridesSeed:e.overridesSeed===!0,hitCount:typeof e.hitCount=="number"&&Number.isFinite(e.hitCount)?Math.max(0,Math.floor(e.hitCount)):0,lastSeenAt:Or(e.lastSeenAt),updatedAt:Or(e.updatedAt),severity:n}},C_=e=>!v_(e)||!Array.isArray(e.pitfalls)?null:{items:e.pitfalls.map(t=>xM(t)).filter(t=>t!==null),syncedAt:Or(e.syncedAt)},Io=e=>e.filter(t=>t.source!=="retired").length});var zn,R_=l(()=>{"use strict";zn=e=>e.replace(/\s+/g," ").trim()});var Oo,E_=l(()=>{"use strict";Oo=e=>Math.ceil(e.length/4)});var Ug,IM=l(()=>{"use strict";E_();Ug=(e,t)=>{if(t<=0)return"";if(Oo(e)<=t)return e;let r=t*4;return e.slice(0,r).trimEnd()}});var ic,OM=l(()=>{"use strict";R_();ic=e=>`${zn(e.id)}|${zn(e.avoidance)}`});var MM=l(()=>{"use strict"});var jt=l(()=>{"use strict";T_();WM();R_();E_();IM();OM();MM()});var L_,NM,q9,K9,J9,X9,jM,DM=l(()=>{"use strict";jt();L_=e=>e.replace(/\s+/g," ").trim(),NM=(e,t,r)=>{let o=new Set,n=[];for(let s of e.split(/[,\n]/)){let i=L_(s).slice(0,r).toLowerCase();i.length>0&&!o.has(i)&&(o.add(i),n.push(i))}return n.slice(0,t)},q9=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40).replace(/-+$/g,""),K9=(e,t)=>{let r=q9(e);return`project-${r.length>0?r:"pitfall"}-${t}`.slice(0,Ae.id).replace(/-+$/g,"")},J9=e=>e==="block"||e==="info"?e:"warn",X9=e=>{let{form:t}=e,r=L_(t.get("symptom")??""),o=(t.get("avoidance")??"").trim(),n=(t.get("cause")??"").trim(),s=L_(t.get("checkCommand")??"");if(r.length===0||o.length===0||n.length===0||r.length>Ae.symptom||o.length>Ae.avoidance||n.length>Ae.cause||s.length>Ae.checkValue)return{ok:!1};let i=(t.get("pitfallId")??"").trim(),a=i.length>0?i:K9(r,e.randomSuffix());return{ok:!0,pitfall:{id:a,symptom:r,cause:n,avoidance:o,check:s.length>0?{kind:"command",value:s}:{kind:"id",value:a},keywords:NM(t.get("keywords")??"",Ae.keywords,Ae.keyword),tags:NM(t.get("tags")??"",Ae.tags,Ae.tag),source:"project",severity:J9(t.get("severity"))}}},jM=X9});var HM,ac,$M,Y9,Mr,zM,Z9,FM,x_=l(()=>{"use strict";HM=require("node:crypto");jt();DM();ac={save:"/project/pitfalls/save",retire:"/project/pitfalls/retire",restore:"/project/pitfalls/restore"},$M=e=>{let t=Object.entries(ac).find(([,r])=>r===e);return t===void 0?null:t[0]},Y9=()=>(0,HM.randomBytes)(3).toString("hex"),Mr=(e,t,r={})=>{let o=new URLSearchParams({tab:"pitfalls",...r,pitfall:t});return`/project?id=${encodeURIComponent(e)}&${o.toString()}`},zM=(e,t)=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:t}),Z9=async e=>{let{projectId:t,store:r}=e,o=e.form.get("showRetired")==="1"?{retired:"1"}:{};if(r===null)return Mr(t,"unavailable",o);let n=await r.listPitfalls(t,{includeRetired:!0});if(!n.ok)return Mr(t,"unavailable",o);if(e.action==="save"){let c=jM({form:e.form,randomSuffix:e.randomSuffix??Y9});if(!c.ok)return Mr(t,"invalid",o);let d=n.items.find(h=>h.id===c.pitfall.id);if((d===void 0||d.source==="retired")&&Io(n.items)>=64)return Mr(t,"limit",o);let g=await r.upsertPitfall(t,c.pitfall);return Mr(t,g.ok?"saved":g.reason==="active_limit"?"limit":g.reason,o)}let s=(e.form.get("pitfallId")??"").trim(),i=n.items.find(c=>c.id===s);if(i===void 0)return Mr(t,"missing",o);if(e.action==="restore"){if(i.source==="retired"&&Io(n.items)>=64)return Mr(t,"limit",o);let c=await r.upsertPitfall(t,zM(i,"project"));return Mr(t,c.ok?"restored":c.reason==="active_limit"?"limit":c.reason,o)}let a=await r.upsertPitfall(t,zM(i,"retired"));return Mr(t,a.ok?"retired":a.reason==="active_limit"?"limit":a.reason,o)},FM=Z9});var UM,de,GM,Q9,W_,I_,BM,eY,tY,lc,O_,rY,oY,nY,VM,qM=l(()=>{"use strict";jt();x_();UM="new",de=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),GM={block:"Must fix",warn:"Warning",info:"Note"},Q9={seed:"Built-in",project:"This project",retired:"Retired"},W_=6e4,I_=60*W_,BM=24*I_,eY=(e,t)=>{if(e===null)return"Never hit";let r=new Date(e).getTime();if(Number.isNaN(r))return"Never hit";let o=Math.max(0,t-r);if(o<W_)return"Last hit just now";if(o<I_)return`Last hit ${Math.floor(o/W_)} min ago`;if(o<BM)return`Last hit ${Math.floor(o/I_)}h ago`;let n=Math.floor(o/BM);return n<30?`Last hit ${n} ${n===1?"day":"days"} ago`:`Last hit ${new Date(r).toISOString().slice(0,10)}`},tY=e=>{if(e===null)return"Not updated yet";let t=new Date(e).getTime();return Number.isNaN(t)?"Not updated yet":`Updated ${new Date(t).toISOString().slice(0,10)}`},lc=(e,t)=>`/project?${new URLSearchParams({id:e,tab:"pitfalls",...t}).toString()}`,O_=e=>e?{retired:"1"}:{},rY=e=>{let{item:t}=e,r=t?.severity??"warn",o=t?.check.kind==="command"?t.check.value:"",n=t===null?"Add pitfall":"Edit pitfall",s=t?.source==="seed"?'<p class="muted">This is a built-in pitfall. Your changes apply to this project only.</p>':"",i=a=>`<option value="${a}"${r===a?" selected":""}>${GM[a]}</option>`;return`<form method="POST" action="${ac.save}" class="stack pitfall-form" aria-label="${n}">
      <p class="field-label">${n}</p>
      ${s}
      <input type="hidden" name="projectId" value="${de(e.projectId)}" />
      <input type="hidden" name="pitfallId" value="${de(t?.id??"")}" />
      <input type="hidden" name="tags" value="${de((t?.tags??[]).join(", "))}" />
      ${e.showRetired?'<input type="hidden" name="showRetired" value="1" />':""}
      <label class="stack">
        <span>Title</span>
        <input type="text" name="symptom" required maxlength="${Ae.symptom}" value="${de(t?.symptom??"")}" placeholder="What goes wrong, in one line" />
      </label>
      <label class="stack">
        <span>Fix</span>
        <textarea name="avoidance" required maxlength="${Ae.avoidance}" rows="3" placeholder="What to do instead">${de(t?.avoidance??"")}</textarea>
      </label>
      <label class="stack">
        <span>Why it happens</span>
        <textarea name="cause" required maxlength="${Ae.cause}" rows="2" placeholder="What leads to this trap">${de(t?.cause??"")}</textarea>
      </label>
      <label class="stack">
        <span>Triggers</span>
        <input type="text" name="keywords" value="${de((t?.keywords??[]).join(", "))}" placeholder="Words that point to this trap, separated by commas" />
      </label>
      <label class="stack">
        <span>How to check <span class="muted">(optional)</span></span>
        <input type="text" name="checkCommand" class="mono" maxlength="${Ae.checkValue}" value="${de(o)}" placeholder="A command that shows the trap, like npm run lint" />
      </label>
      <label class="stack">
        <span>How serious</span>
        <select name="severity">${i("block")}${i("warn")}${i("info")}</select>
      </label>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Save pitfall</button>
        <a class="btn btn-secondary" href="${de(lc(e.projectId,O_(e.showRetired)))}">Cancel</a>
      </div>
    </form>`},oY=e=>{let{item:t,projectId:r,showRetired:o}=e,n=t.source==="retired",s=`<input type="hidden" name="projectId" value="${de(r)}" />
            <input type="hidden" name="pitfallId" value="${de(t.id)}" />
            ${o?'<input type="hidden" name="showRetired" value="1" />':""}`,i=n?`<form method="POST" action="${ac.restore}" class="inline-form">
            ${s}
            <button class="btn btn-secondary btn-compact" type="submit">Bring back</button>
          </form>`:`<a class="btn btn-secondary btn-compact" href="${de(lc(r,{...O_(o),edit:t.id}))}">Edit</a>
          <form method="POST" action="${ac.retire}" class="inline-form" onsubmit="return confirm('Retire this pitfall? You can bring it back later.');">
            ${s}
            <button class="btn btn-danger btn-compact" type="submit">Retire</button>
          </form>`,a=t.keywords.length>0?`<p class="muted">Triggers: ${t.keywords.map(c=>de(c)).join(", ")}</p>`:"";return`<li class="harness-installed-set pitfall-row${n?" pitfall-row-retired":""}" data-pitfall-id="${de(t.id)}">
        <p><strong>${de(t.symptom)}</strong> <span class="muted">\xB7 ${GM[t.severity]} \xB7 ${Q9[t.source]}</span></p>
        <p>Fix: ${de(t.avoidance)}</p>
        ${a}
        <p class="muted">${de(eY(t.lastSeenAt,e.nowMs))}</p>
        <p class="muted">${de(tY(t.updatedAt))}</p>
        <div class="actions">${i}</div>
      </li>`},nY=e=>{if(e.list===null||!e.list.ok)return'<p class="empty">Could not load pitfalls. Check this Mac on Status, then reload.</p>';let t=e.nowMs??Date.now(),r=e.list.items,o=Io(r),n=o>=64,s=e.showRetired?r:r.filter(g=>g.source!=="retired"),i=e.editId===null?null:e.editId===UM?n?null:{item:null}:(()=>{let g=r.find(h=>h.id===e.editId&&h.source!=="retired");return g===void 0?null:{item:g}})(),a=i===null?"":rY({projectId:e.projectId,item:i.item,showRetired:e.showRetired}),c=n?`<p class="muted">${64} of ${64} active. Retire one to add another.</p>`:`<a class="btn btn-primary" href="${de(lc(e.projectId,{...O_(e.showRetired),edit:UM}))}">Add pitfall</a>`,d=e.showRetired?`<a class="btn btn-secondary" href="${de(lc(e.projectId,{}))}">Hide retired</a>`:`<a class="btn btn-secondary" href="${de(lc(e.projectId,{retired:"1"}))}">Show retired</a>`,u=s.length===0?'<p class="empty">No pitfalls for this project. Add one when you spot a mistake that keeps coming back.</p>':`<ul class="harness-installed-set-list">${s.map(g=>oY({projectId:e.projectId,item:g,showRetired:e.showRetired,nowMs:t})).join("")}</ul>`;return`<section class="stack">
      <p class="lede">Pitfalls are known traps in this project. Each one says what goes wrong and how to avoid it.</p>
      <p class="muted">${o} of ${64} active</p>
      <div class="actions">${i===null?c:""}${d}</div>
      ${a}
      ${u}
    </section>`},VM=nY});var te,KM,sY,iY,aY,lY,cY,Mo,Bg=l(()=>{"use strict";b_();jt();qM();te=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),KM=(e,t)=>e.length===0?`<p class="empty">${te(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${te(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${te(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,sY=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,iY=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from Agent Witch Cloud.":"This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${te(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},aY=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
        <p><strong>${te(r)}</strong> <span class="muted">already in this repo</span></p>
        <form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this Mac.');">
          <input type="hidden" name="projectId" value="${te(e.project.id)}" />
          <input type="hidden" name="setSlug" value="${te(r)}" />
          <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
        </form>
      </li>`).join("")}</ul>`;return e.boundHarnessCount>0?`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Nothing is installed in the Mac profile \u2014 refresh from Agent Witch Cloud only if you need an update.</p>
        ${t}
        <form method="POST" action="/projects/pull-bound-harness" class="actions">
          <input type="hidden" name="projectId" value="${te(e.project.id)}" />
          <button class="btn btn-secondary" type="submit">Refresh in repo\u2026</button>
        </form>
      </div>`:`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Open Harness to install playbooks on this Mac if you want to change them.</p>
        ${t}
        <div class="actions">
          <a class="btn btn-secondary" href="/harness">Open Harness</a>
        </div>
      </div>`},lY=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?aY({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?iY({project:e.project,alreadyInRepo:!1}):sY();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),u=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this Mac.');">
            <input type="hidden" name="projectId" value="${te(e.project.id)}" />
            <input type="hidden" name="setSlug" value="${te(c.slug)}" />
            <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
          </form>`:"";return`<li class="harness-installed-set">
          <label class="check-row">
            <input form="link-harness-form" type="checkbox" name="applySet" value="${te(c.slug)}"${t.size===0||d?" checked":""} />
            <span><strong>${te(c.name)}</strong> <span class="muted mono">(${te(c.slug)})</span></span>
          </label>
          <p class="muted">${c.itemCount} item(s)${d?' \xB7 <span class="muted">in repo</span>':""}</p>
          ${u}
        </li>`}).join("")}</ul>`;return`<div class="stack">
        <form id="link-harness-form" method="POST" action="/projects/link-harness">
          <input type="hidden" name="projectId" value="${te(e.project.id)}" />
          <p class="field-label">Installed</p>
          <p class="lede">${n}</p>
        </form>
        ${a}
        <div class="actions">
          <button form="link-harness-form" class="${i}" type="submit">${s}</button>
        </div>
      </div>`},cY=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${te(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${te(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Mo=e=>{let t=e.flashError?`<div class="alert-error">${te(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${te(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(h,P)=>`<a class="project-tab${e.activeTab===h?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${h}">${te(P)}</a>`,n=e.composition?.items.filter(h=>h.kind==="workflow")??[],s=e.composition?.items.filter(h=>h.kind==="agent")??[],i="";e.activeTab==="harness"?i=lY({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=KM(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=KM(s,"No agents installed for this project yet."):e.activeTab==="knowledge"?i=cY({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount}):i=VM({projectId:e.project.id,list:e.pitfalls??null,showRetired:e.pitfallsShowRetired??!1,editId:e.pitfallsEditId??null});let a=e.pitfalls!==void 0&&e.pitfalls!==null&&e.pitfalls.ok?`Pitfalls (${Io(e.pitfalls.items)})`:"Pitfalls",c=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,d=`${c}?rename=1`,u=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${te(c)}" target="_blank" rel="noopener noreferrer">Open in Agent Witch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${te(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,g=Fg(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from Agent Witch Cloud only. The folder on this Mac is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from Agent Witch Cloud? Your repo folder on this Mac will stay.');">
          <input type="hidden" name="projectId" value="${te(e.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${te(e.project.name)}</h1>
      <p class="muted mono">${te(e.project.projectFolderPath)}</p>
      ${u}
      <div class="actions"><a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(e.project.id)}">Change folder\u2026</a></div>
      <nav class="project-tabs" aria-label="Project composition">
        ${o("harness",`Playbooks (${r.harness})`)}
        ${o("workflows",`Workflows (${r.workflow})`)}
        ${o("agents",`Agents (${r.agent})`)}
        ${o("knowledge",`Knowledge (${e.knowledgeCandidateCount})`)}
        ${o("pitfalls",a)}
      </nav>
      <div class="project-tab-panel">
        ${i}
      </div>
    </section>${g}`}});var dY,uY,JM,XM=l(()=>{"use strict";Lo();At();dY=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uY=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[ne]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!dY(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=cr(n);return s===null?[]:[s]})}catch{return null}},JM=uY});var YM,M_,ZM=l(()=>{"use strict";ee();Lo();Bg();sc();XM();nc();Bl();xo();St();YM=e=>({kind:"page",title:e.project.name,body:Mo({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:dr(e.layout),linkedSetSlugs:lr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),M_=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=z();if(r===null)return{kind:"not_found"};let o=await Wo(r,e.layout),n=ur(o.projects,t);if(n===null)return{kind:"not_found"};let s=V({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??ct,a=s===null?null:await JM(s,n.id);if(a===null)return YM({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=Fb({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return YM({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await jn(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var QM,N_,eN=l(()=>{"use strict";ee();Lo();St();xo();Bg();ug();Ro();sc();nc();Bl();ig();Pb();cg();wb();QM=e=>({kind:"page",title:e.project.name,body:Mo({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:dr(e.layout),linkedSetSlugs:lr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),N_=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=z();if(n===null)return{kind:"not_found"};let s=await Wo(n,e.layout),i=ur(s.projects,r);if(i===null)return{kind:"not_found"};let a=V({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??ct;if(o.length===0)return QM({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=Ge(i.projectFolderPath),u=Xe({projectFolderPath:d}),{ledgerFilePath:g}=di(u.layout),h=ci(g),P=Nb(h);if(!P.includes(o))return QM({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let S=P.filter(T=>T!==o),y=lg({repoRoot:u.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:h});Fl(g,y.ledger);let p=a===null?!1:await jn(a,i.id,S),A=new URLSearchParams({linked:"1",removed:o,files:String(y.summary.removedPaths.length),bindingsSynced:p?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${A.toString()}`}}});var pY,j_,tN=l(()=>{"use strict";pY=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,j_=pY});var rN=l(()=>{"use strict"});var oN=l(()=>{"use strict"});var nN=l(()=>{"use strict";rN();oN()});var mY,No,sN=l(()=>{"use strict";mY=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],No=(e=process.env)=>{let t={...e};for(let r of mY)delete t[r];return t}});var iN=l(()=>{"use strict";sN()});var D_,aN=l(()=>{"use strict";D_={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var z_=l(()=>{"use strict";aN()});var Gg,H_=l(()=>{"use strict";Gg={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",DEVICE_RESTART_ACK:"device.restart.ack",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status",PROJECT_MESSAGE_HISTORY:"project.message.history"}});var Vg=l(()=>{"use strict";nN();iN();St();z_();H_()});var lN,cN,gY,qg,Kg,dN=l(()=>{"use strict";lN=require("node:child_process"),cN=require("node:util");Vg();gY=(0,cN.promisify)(lN.execFile),qg=async(e,t)=>{try{let{stdout:r}=await gY("git",t,{cwd:e,env:No(),maxBuffer:1048576});return r.trim()}catch{return null}},Kg=async e=>{let t=await qg(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await qg(e,["rev-parse","--abbrev-ref","HEAD"]),o=await qg(e,["status","--porcelain"]),n=await qg(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var $_,uN=l(()=>{"use strict";$_=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var fY,F_,pN=l(()=>{"use strict";fY=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},F_=fY});var hY,U_,mN=l(()=>{"use strict";At();hY=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[ne]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},U_=hY});var gN,jo,fN=l(()=>{"use strict";gN=require("node:child_process"),jo=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,gN.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var hN=l(()=>{"use strict";sc()});var cc,yN=l(()=>{"use strict";At();cc=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[ne]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var B_,SN=l(()=>{"use strict";At();B_=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[ne]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var Dt=l(()=>{"use strict";sc();nc();RM();Ro();ug();EM();ZM();eN();Bl();tN();dN();uN();pN();mN();fN();hN();yN();SN();f_();m_();xo()});var Jg,dc,PN,G_,Hn,V_=l(()=>{"use strict";Jg=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},dc=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Jg(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},PN=e=>e>=1&&e<=5,G_=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Jg(t,"UTC")},Hn=e=>{let t=e.from??new Date,r=Jg(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return dc(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=dc(r,e.timeZone,o,0),s=Jg(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?dc(G_(r),e.timeZone,o,0):n;if(!i&&PN(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=G_(a),PN(a.weekday))return dc(a,e.timeZone,o,0);return dc(G_(r),e.timeZone,o,0)}});var AN,q_,Nr,K_=l(()=>{"use strict";AN=require("node:crypto");ee();Dt();V_();Hg();q_=!1,Nr=async e=>{if(q_)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=z();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=V({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=zg(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};q_=!0;let n=(0,AN.randomUUID)();try{let s=await ii(t,"claude-cli",o.prompt);await u_(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=Hn({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return Dg(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{q_=!1}}});var Xg,bN=l(()=>{"use strict";ee();K_();Hg();Xg=async()=>{let e=z();if(e===null)return;let t=Nt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await Nr(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var uc=l(()=>{"use strict";Hg();bN();K_();V_()});var _N=l(()=>{"use strict";uc()});var wN=l(()=>{"use strict";s_()});var kN=l(()=>{"use strict";wN()});var J_=l(()=>{"use strict";uc()});var yY,SY,pc,X_=l(()=>{"use strict";_N();kN();J_();Fe();yY=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),SY=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Hn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Hn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},pc=e=>{let t=yY(e.profileEmail),r=Nt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=mi(s);return i!==null?[SY(i,o.get(i.id))]:[]});return jg(t,n),{ok:!0,writtenCount:n.length}}});var Y_=l(()=>{"use strict";uc()});var TN=l(()=>{"use strict";ee()});var vN=l(()=>{"use strict";X_();Y_();J_();TN()});var CN,mc,gc,fc,RN=l(()=>{"use strict";CN=m(require("node:os"));vN();Zl();Ql();mc=e=>{if(!Ir(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Mn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=pc({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},gc=async e=>{if(!Ir(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Mn(t)?Nr(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},fc=()=>{let e=z(),t=e!==null?Nt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:CN.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var Z_=l(()=>{"use strict";RN()});var Yg=l(()=>{"use strict";oe()});var Zg=l(()=>{"use strict";oe()});var Qg,LN,xN,EN,PY,AY,gi,Q_=l(()=>{"use strict";Qg=m(require("node:fs")),LN=m(require("node:os")),xN=m(require("node:path"));Yg();Zg();jl();Fe();EN=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},PY=e=>xN.default.join(LN.default.homedir(),"Library","LaunchAgents",`${e}.plist`),AY=async e=>Qg.default.existsSync(PY(e))?(await $e(e)).ok:!1,gi=async(e=R())=>{let t=Qg.default.existsSync(rg(e)),r=!Qg.default.existsSync(rr(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Nl(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await EN(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${ye(e)}-wake`;await AY(i)&&s.push(i);for(let c of ae(e))(await $e(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await EN(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var WN=l(()=>{"use strict";oe()});var ew=l(()=>{"use strict";Cn();oe()});var tw=l(()=>{"use strict";Cn()});var rw=l(()=>{"use strict";oe()});var ON,IN,hc,ow=l(()=>{"use strict";ON=m(require("node:fs"));St();Yg();Zg();Fe();IN=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},hc=async(e=R())=>{if(!ON.default.existsSync(rr(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await IN())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of ae(e))(await $e(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await IN();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var MN=l(()=>{"use strict";oe()});var NN,$n,nw,bY,_Y,wY,jN,kY,DN,fi,ef=l(()=>{"use strict";NN=require("node:crypto"),$n=m(require("node:fs")),nw=m(require("node:path"));Fe();bY="watchdog-log.ndjson",_Y=200,wY=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jN=(e=R())=>{let t=N(),r=t.installDir===e?t.logsDir:un({installDir:e,profileEmail:t.profileEmail});return nw.default.join(r,bY)},kY=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!wY(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},DN=(e,t=R())=>{let r={id:(0,NN.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=jN(t);$n.default.mkdirSync(nw.default.dirname(o),{recursive:!0});let n=$n.default.existsSync(o)?$n.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-_Y+1)),JSON.stringify(r)];return $n.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},fi=(e=20,t=R())=>{let r=jN(t);if(!$n.default.existsSync(r))return[];let o=$n.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=kY(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var sw,iw,aw,lw=l(()=>{"use strict";ke();sw=La.watchdogReinstallState,iw=900*1e3,aw=3e3});var zN=l(()=>{"use strict";lw()});var HN={};yt(HN,{verifyAgentWitchReviveAfterKickstart:()=>vY});var TY,vY,$N=l(()=>{"use strict";zN();tw();rw();Fe();TY=e=>new Promise(t=>{setTimeout(t,e)}),vY=async e=>{if(await TY(e.verifyDelayMs??aw),!await mn(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),o=_e(r);return!Oe(o,e.staleAfterMs)}});var yc,cw,CY,FN,UN,dw,uw,pw=l(()=>{"use strict";yc=m(require("node:fs")),cw=m(require("node:path"));G();lw();CY=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),FN=e=>cw.default.join(e,sw),UN=(e=R())=>{let t=FN(e);if(!yc.default.existsSync(t))return null;try{let r=JSON.parse(yc.default.readFileSync(t,"utf8"));return!CY(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},dw=(e=R(),t=Date.now())=>{let r=UN(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=iw:!0},uw=(e=R(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=FN(e);return yc.default.mkdirSync(cw.default.dirname(o),{recursive:!0}),yc.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var mw,BN=l(()=>{"use strict";oe();pw();mw=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!dw())return{attempted:!1,ok:!1,targets:e};uw();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await $e(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var GN=l(()=>{"use strict";pw();BN()});var gw=l(()=>{"use strict";sr()});var VN=l(()=>{"use strict";sr()});var qN,hi,KN,JN,XN,RY,EY,YN,LY,xY,ZN,QN=l(()=>{"use strict";qN=require("node:child_process"),hi=m(require("node:fs")),KN=m(require("node:os")),JN=m(require("node:path")),XN=require("node:util");gw();VN();Fe();RY=(0,XN.promisify)(qN.execFile),EY=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),YN=e=>{let t=He(e),r=t===null?N():N(t);if(!hi.default.existsSync(r.configPath))return null;try{let o=JSON.parse(hi.default.readFileSync(r.configPath,"utf8"));return!EY(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},LY=e=>YN(e)?.wsUrl??null,xY=e=>{let t=LY(e);return t!==null?Ie(t):Ue(e)?.appOrigin??null},ZN=async e=>{let t=e?.installDir??R(),r=YN(t),o=r!==null?Ie(r.wsUrl):xY(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=JN.default.join(KN.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{hi.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??He(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await RY("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{hi.default.existsSync(i)&&hi.default.unlinkSync(i)}}});var ej={};yt(ej,{attemptAgentWitchWatchdogReinstall:()=>WY});var WY,tj=l(()=>{"use strict";GN();QN();WY=async e=>mw(e,()=>ZN())});var rj,oj,nj,IY,OY,MY,Sc,fw=l(()=>{"use strict";WN();ew();tw();rw();ow();Q_();Yg();Zg();Fe();Ks();MN();ef();rj=e=>e===null?N():N(e),oj=async(e,t,r)=>{if(!await mn(e))return"not_running";let n=rj(t);if(It(n))return"healthy";let s=_e(n);return Oe(s,r)?"stale_connection":"healthy"},nj=async e=>{let t=e?.staleAfterMs??12e4,r=R(),o=ae(r);return Promise.all(o.map(async n=>{let s=await oj(n.launchAgentLabel,n.profileEmail,t),i=rj(n.profileEmail),a=_e(i),c=await mn(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Oe(a,t),needsRevive:s!=="healthy",reason:s}}))},IY=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},OY=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",MY=async e=>{let t=await $e(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>($N(),HN)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Sc=async e=>{if(!Wt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=R();await gi(r),await hc(r);let o=ae(r),n=[];for(let u of o){let g=await oj(u.launchAgentLabel,u.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:g});continue}n.push(await MY({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let u=pn();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(tj(),ej)),g=await u(n);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&DN({event:OY(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:IY(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var sj,tf,ij=l(()=>{"use strict";sj=m(require("node:os"));ew();ef();fw();tf=async()=>{let e=await nj(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:sj.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:fi(1)[0]??null}}});var hw=l(()=>{"use strict";Q_();fw();ij();ef()});var Pc,Ac,bc,aj=l(()=>{"use strict";oe();hw();Pc=async()=>{await gi();let e=ae(),t=[];for(let r of e){let o=await $e(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=pn();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Ac=Sc,bc=Sc});var yw=l(()=>{"use strict";aj()});var of,rf,lj,Sw,cj,NY,jY,DY,zY,HY,nf,dj=l(()=>{"use strict";of=require("node:child_process"),rf=m(require("node:fs")),lj=m(require("node:os")),Sw=m(require("node:path")),cj=require("node:util");oe();G();NY=(0,cj.promisify)(of.execFile),jY=()=>Sw.default.join(lj.default.homedir(),"Library","LaunchAgents"),DY=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await NY("launchctl",["bootout",r]).catch(()=>{})},zY=e=>{let t=Sw.default.join(jY(),`${e}.plist`);rf.default.existsSync(t)&&rf.default.unlinkSync(t)},HY=e=>{(0,of.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},nf=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=R();if(!rf.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=vr(e);for(let r of t)await DY(r),zY(r);return HY(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var uj,sf,pj,yi,mj,$Y,FY,UY,Pw,BY,Aw,gj=l(()=>{"use strict";uj=require("node:child_process"),sf=m(require("node:fs")),pj=m(require("node:os")),yi=m(require("node:path")),mj=require("node:util");oe();$Y=(0,mj.promisify)(uj.execFile),FY=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],UY=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],Pw=e=>{sf.default.existsSync(e)&&sf.default.rmSync(e,{force:!0})},BY=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await $Y("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},Aw=async e=>{let r=(e.listLaunchAgentLabels??vr)(e.layout.installDir),o=e.launchAgentsDir??yi.default.join(pj.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??BY;for(let i of r)await n(i),Pw(yi.default.join(o,`${i}.plist`));let s=yi.default.dirname(e.layout.configPath);for(let i of FY)Pw(yi.default.join(s,i));for(let i of UY)Pw(yi.default.join(e.layout.installDir,i));return sf.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var bw,fj=l(()=>{"use strict";bw="unknown_identity"});var _w=l(()=>{"use strict";H_();fj()});var GY,ww,hj=l(()=>{"use strict";_w();GY=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ww=e=>e.type!=="system.error"||!GY(e.payload)?!1:e.payload.errorCode===bw});var kw=l(()=>{"use strict";dj();gj();hj()});var af=l(()=>{"use strict";oe();sr();kw();hw()});var Si,lf,cf=l(()=>{"use strict";af();Si=(e=20)=>fi(e),lf=tf});var df,Pi,uf,pf=l(()=>{"use strict";af();df=Tn,Pi=(e=20)=>_n(e),uf=e=>kn(e)});var mf,Tw=l(()=>{"use strict";af();mf=()=>nf()});var yj=l(()=>{"use strict";hb();n_();Z_();yw();cf();pf();Tw()});var Sj={};yt(Sj,{buildAgentWitchAutomationStatusFromWakeServer:()=>fc,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>df,buildAgentWitchWakeHealthResponse:()=>zl,buildAgentWitchWakeIdentityResponse:()=>Hl,buildAgentWitchWatchdogStatus:()=>lf,installHarnessFromWakeServer:()=>ec,readAgentWitchSelfUpdateLogEntries:()=>Pi,readAgentWitchWatchdogLogEntries:()=>Si,restartAgentWitchFromWakeServer:()=>bc,reviveAgentWitchWebSocketFromWakeServer:()=>Ac,runAgentWitchSelfUpdateFromWakeServer:()=>uf,runAgentWitchUninstallLocalFromWakeServer:()=>mf,runAutomationFromWakeServer:()=>gc,syncAutomationsFromWakeServer:()=>mc,wakeAgentWitchLaunchAgents:()=>Pc});var Pj=l(()=>{"use strict";yj()});var Aj,bj,vw,Cw,_j=l(()=>{"use strict";Aj=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),bj=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?Aj(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?Aj(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},vw=e=>{let t=e.watchdogLogs.map(bj).join(""),r=e.updateLogs.map(bj).join("");return`<!doctype html>
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
</html>`},Cw=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var wj,kj,Tj=l(()=>{"use strict";wj=m(require("node:net")),kj=()=>new Promise((e,t)=>{let r=wj.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var vj,VY,qY,Rw,Cj=l(()=>{"use strict";vj=m(require("node:net"));oe();Tj();Dl();jl();Fe();VY=e=>new Promise(t=>{let r=vj.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),qY=e=>new Promise(t=>{setTimeout(t,e)}),Rw=async(e={})=>{let t=R(),r=Mt(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await VY(r))return Q0(r),r;i<o&&await qY(n)}let s=await kj();og(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{KP({launchAgentPrefix:ye(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var KY,Ew,Rj=l(()=>{"use strict";KY=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ew=e=>({force:KY(e)&&e.force===!0})});var _c=l(()=>{"use strict";Zl();_j();Cj();Rj();JP();bm();Sn()});var Lw,U,xw,Ww,wc,Ej=l(()=>{"use strict";Lw=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},U=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},xw=e=>{e.writeHead(403),e.end()},Ww=e=>e.url?.split("?")[0]??"/",wc=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var zt=l(()=>{"use strict";Ej()});var JY,Lj,xj=l(()=>{"use strict";Z_();zt();JY=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Lj=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return U(e.response,200,fc(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await JY(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=mc(t);return U(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await gc(t);return U(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var XY,Ij,Wj,Oj,Iw,Mj,Ow=l(()=>{"use strict";XY=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],Ij=e=>/embed|minilm|^bge-/i.test(e),Wj=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),Oj=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),Iw=e=>e.filter(t=>t.trim().length>0&&!Ij(t)),Mj=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!Ij(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>Wj(s,o));if(n!==void 0)return n}for(let n of XY){let s=r.find(i=>Wj(i,n));if(s!==void 0)return s}return r[0]??null}});var Mw,Dj,zj,gf,Hj,Nj,jj,YY,ZY,QY,eZ,tZ,rZ,Ht,kc=l(()=>{"use strict";Mw=require("node:child_process"),Dj=m(require("node:fs")),zj=m(require("node:os")),gf=m(require("node:path"));sr();Ot();Ow();Hj=3e3,Nj=["claude-cli","codex","cursor","antigravity"],jj={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},YY=(e,t)=>new Promise(r=>{let o=(0,Mw.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},Hj);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),ZY=()=>{let e=zj.default.homedir();return["ollama",gf.default.join(e,".local","bin","ollama"),gf.default.join(e,".agent-witch","ollama","ollama"),gf.default.join(e,".local-agent-witch","ollama","ollama")]},QY=e=>new Promise(t=>{let r=(0,Mw.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},Hj);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(Oj(Buffer.concat(o).toString("utf8")))})}),eZ=async()=>{for(let e of ZY()){if(e!=="ollama"&&!Dj.default.existsSync(e))continue;let t=await QY(e);if(t!==null)return t}return[]},tZ=e=>{let t=e.installedWriterIds.map(s=>jj[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=Se(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${jj[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},rZ=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:Js},Ht=async e=>{let t=Nj.map(i=>{let a=Fm(i,e.commands);return YY(a.command,a.args)}),[r,...o]=await Promise.all([eZ(),...t]),n=Nj.flatMap((i,a)=>o[a]===!0?[i]:[]),s=Mj(r,rZ());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:tZ({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var oZ,nZ,Nw,$j=l(()=>{"use strict";oZ="http://127.0.0.1:11434",nZ=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Nw=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||oZ;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?nZ(await o.json()):null}catch{return null}}});var jw=l(()=>{"use strict";Ot();kc();$j();Ow()});var sZ,Fj,Uj=l(()=>{"use strict";jw();sZ={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},Fj=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:sZ[t]})),ollamaModels:Iw(e.ollamaModels)})});var iZ,Bj,Gj=l(()=>{"use strict";jw();zt();Uj();iZ=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Bj=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Ht({commands:Pe({})});return U(e.response,200,{ok:!0,...Fj({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await iZ(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await Nw({model:r,prompt:o});return n===null?(U(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(U(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var aZ,Vj,qj=l(()=>{"use strict";n_();zt();aZ=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Vj=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await aZ(e);if(t===null)return!0;let r=ec(t);return U(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var Kj=l(()=>{"use strict";Dt()});var Dw,Jj=l(()=>{"use strict";Kj();Ql();Dw=e=>{if(!Ir(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Xe({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var Xj,zw,Hw=l(()=>{"use strict";ee();Dt();Ql();Xj=e=>{if(!Ir(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},zw=async e=>{let t=Xj(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=jo("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=z();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=V({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Xe({projectFolderPath:r}),await cc(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var Yj=l(()=>{"use strict";Jj();Hw()});var Zj,Qj=l(()=>{"use strict";Yj();Hw();zt();Zj=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=Dw(t);return U(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await zw(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return U(e.response,o,r,e.cors.headers),!0}return!1}});var eD,tD=l(()=>{"use strict";_c();pf();cf();eD=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Si(50),r=Pi(50);return e.response.writeHead(200,Cw()),e.response.end(vw({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var rD,oD=l(()=>{"use strict";hb();zt();rD=e=>e.request.method==="GET"&&e.pathname==="/health"?(U(e.response,200,zl(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(U(e.response,200,Hl(),e.cors.headers),!0):!1});var nD,sD=l(()=>{"use strict";Tw();zt();nD=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await mf();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}});var iD,aD=l(()=>{"use strict";yw();zt();iD=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Ac();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await bc();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Pc();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var lD,cD=l(()=>{"use strict";_c();pf();zt();lD=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=df();return U(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=wc(e.request,"/update/logs",20,200);return U(e.response,200,{ok:!0,logs:Pi(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=Ew(t),o=await uf({force:r});return U(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var dD,uD=l(()=>{"use strict";cf();zt();dD=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await lf();return U(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=wc(e.request,"/watchdog/logs",20,200);return U(e.response,200,{ok:!0,logs:Si(t)},e.cors.headers),!0}return!1}});var pD,mD=l(()=>{"use strict";xj();Gj();qj();Qj();tD();oD();sD();aD();cD();uD();pD=[rD,eD,dD,iD,lD,nD,Vj,Zj,Lj,Bj]});var gD,fD=l(()=>{"use strict";mD();gD=async e=>{for(let t of pD)if(await t(e))return!0;return!1}});var lZ,hD,yD=l(()=>{"use strict";Zl();zt();fD();lZ=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:Ww(e),readJsonBody:()=>Lw(e)}),hD=async(e,t,r)=>{let o=e.headers.origin,n=Og(o);try{if(o!==void 0&&o.length>0&&!n.allowed){xw(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=lZ(e,t,r,n);if(await gD(s))return;U(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{U(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var SD,Fn,ff,hf=l(()=>{"use strict";SD=m(require("node:http"));_c();yD();Fn=async()=>{let e=await Rw(),t=SD.default.createServer((r,o)=>{hD(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},ff=Fn});var PD={};yt(PD,{runAgentWitchBridgeCli:()=>cZ});var cZ,AD=l(()=>{"use strict";oe();hf();cZ=async()=>{at("agent-witch-bridge");let e=await Fn(),t=Rr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var bD=l(()=>{"use strict";St()});var Ai,$w,_D=l(()=>{"use strict";Ai=(e,t,r)=>e===1?t:r,$w=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Ai(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Ai(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Ai(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Ai(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Ai(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${Ai(u,"year","years")} ago`}});var Un,Fw,dZ,uZ,Uw,Do,Tc,Bw,wD=l(()=>{"use strict";Un=m(require("node:fs")),Fw=m(require("node:path")),dZ="local-ws-traffic.ndjson",uZ=500,Uw=e=>Fw.default.join(e.logsDir,dZ),Do=(e,t)=>{let r=Uw(e);Un.default.mkdirSync(Fw.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});Un.default.appendFileSync(r,`${o}
`,"utf8")},Tc=(e,t=uZ)=>{let r=Uw(e);if(!Un.default.existsSync(r))return[];let n=Un.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},Bw=e=>{let t=Uw(e);Un.default.existsSync(t)&&Un.default.writeFileSync(t,"","utf8")}});var pZ,kD,TD,vD=l(()=>{"use strict";_w();pZ=new Set(Object.values(Gg)),kD=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),TD=e=>{if(!kD(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!pZ.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!kD(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var CD,RD=l(()=>{"use strict";CD=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var mZ,gZ,fZ,vc,ED=l(()=>{"use strict";RD();mZ=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,gZ=e=>mZ.test(e),fZ=e=>CD(e),vc=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>vc(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&gZ(o)){r[o]=fZ(n);continue}r[o]=vc(n)}return r}});var mr,Gw,hZ,yZ,SZ,Vw,LD,xD,WD,PZ,yf,Bn,Sf,qw,ID=l(()=>{"use strict";mr=m(require("node:fs")),Gw=m(require("node:path"));vD();ED();hZ="local-ws-trace.ndjson",yZ=1e4,SZ=1440*60*1e3,Vw=e=>Gw.default.join(e.logsDir,hZ),LD=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},xD=e=>{if(!mr.default.existsSync(e))return;let t=mr.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-SZ,n=t.filter(s=>{let i=LD(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-yZ);mr.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},WD=(e,t)=>{let r=Vw(e);mr.default.mkdirSync(Gw.default.dirname(r),{recursive:!0}),mr.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),xD(r)},PZ=e=>e.parsed===null?{_empty:!0}:vc(e.parsed),yf=(e,t,r)=>{let o=TD(r);WD(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:PZ(o)})},Bn=(e,t)=>{WD(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:vc({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Sf=(e,t=80)=>{let r=Vw(e);if(xD(r),!mr.default.existsSync(r))return[];let o=mr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=LD(s);i!==null&&n.push(i)}return n.reverse()},qw=e=>{let t=Vw(e);mr.default.existsSync(t)&&mr.default.writeFileSync(t,"","utf8")}});var zo,OD,AZ,Kw,Pf,MD=l(()=>{"use strict";zo=m(require("node:fs")),OD=m(require("node:path")),AZ=256e3,Kw=e=>{zo.default.mkdirSync(OD.default.dirname(e),{recursive:!0}),zo.default.writeFileSync(e,"","utf8")},Pf=(e,t=AZ)=>{if(!zo.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=zo.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=zo.default.openSync(e,"r");try{zo.default.readSync(a,i,0,s,n)}finally{zo.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var Cc=l(()=>{"use strict";wD();ID();MD()});var Jw,Xw,ND=l(()=>{"use strict";Jw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xw=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${Jw(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${Jw(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${Jw(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var jD=l(()=>{"use strict";ND()});var Yw,Zw=l(()=>{"use strict";Yw=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var Qw=l(()=>{"use strict";Al()});var ek,tk,DD=l(()=>{"use strict";Qw();ek=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},tk=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var zD=l(()=>{"use strict";Zw();DD()});var HD,Rc,rk,Ec=l(()=>{"use strict";Zw();HD=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Rc=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=HD(e),r=HD(Yw(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},rk=`(function () {
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
})();`});var Gn,bZ,ok,$D=l(()=>{"use strict";Gn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bZ=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},ok=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Gn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Gn(r.direction):Gn(r.kind),i=`trace-body-${o}`,a=Gn(bZ(r.body));return`<tr>
        <td title="${Gn(r.at)}">${Gn(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${Gn(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var UD,_Z,FD,nk,BD=l(()=>{"use strict";ke();St();UD=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},_Z=e=>UD(e)===Tr?Os:Is,FD=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nk=e=>{let t=_Z(e.installDir),o=`AW_HOME="$HOME/${UD(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${FD(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${FD(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var GD=l(()=>{"use strict";Ec();$D();BD();Ec()});var wZ,jr,Lc=l(()=>{"use strict";wZ=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),jr=wZ});var VD,qD,KD,JD,XD,YD,ZD,bi=l(()=>{"use strict";VD="projects",qD="knowledge",KD="chunks.ndjson",JD="lessons.ndjson",XD="error-chunks.ndjson",YD="usage-stats.json",ZD="knowledge-location.json"});var Af,kZ,bf,sk=l(()=>{"use strict";Af=m(require("node:path"));bi();kZ=(e,t)=>{let r=t.trim(),o=Af.default.join(e.installDir,VD,r,qD);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:Af.default.join(o,KD),memoryRunsFilePath:Af.default.join(o,JD)}},bf=kZ});var ik,TZ,QD,ez=l(()=>{"use strict";ik=m(require("node:fs"));bi();In();TZ=e=>{let t=Pt(e.projectFolderPath),r=`${t.metaDirPath}/${ZD}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};ik.default.mkdirSync(t.metaDirPath,{recursive:!0}),ik.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},QD=TZ});var _i,rz,tz,vZ,oz,nz=l(()=>{"use strict";_i=m(require("node:fs")),rz=m(require("node:path"));hn();In();sk();ez();tz=(e,t)=>{_i.default.existsSync(e)&&(_i.default.existsSync(t)&&_i.default.statSync(t).size>0||(_i.default.mkdirSync(rz.default.dirname(t),{recursive:!0}),_i.default.copyFileSync(e,t)))},vZ=e=>{let t=Pt(e.projectFolderPath),r=bf(e.layout,e.projectId),o=`${t.memoryDirPath}/${Fs}`;tz(t.ragChunksFilePath,r.ragChunksFilePath),tz(o,r.memoryRunsFilePath),QD({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},oz=vZ});var sz,CZ,wi,_f=l(()=>{"use strict";sz=m(require("node:path"));hn();In();nz();S_();sk();CZ=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=$g(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){oz({layout:e.layout,projectFolderPath:t,projectId:o});let s=bf(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=Pt(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:sz.default.join(n.memoryDirPath,Fs),projectId:null}},wi=CZ});var wf,EZ,kf,ak=l(()=>{"use strict";wf=m(require("node:fs"));bi();EZ=(e,t=500)=>{if(!wf.default.existsSync(e))return;let r=wf.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);wf.default.writeFileSync(e,`${o.join(`
`)}
`)},kf=EZ});var Tf,LZ,Vn,lk=l(()=>{"use strict";Tf=m(require("node:path"));bi();_f();LZ=e=>{let t=wi(e);if(t===null)return null;let r=Tf.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Tf.default.join(r,YD),errorChunksFilePath:Tf.default.join(r,XD)}},Vn=LZ});var az,xc,lz,iz,ck,cz,IZ,dk,dz,uk,pk,mk,gk=l(()=>{"use strict";az=require("node:crypto"),xc=m(require("node:fs")),lz=m(require("node:path"));Lc();bi();lk();iz=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),ck=e=>{if(!xc.default.existsSync(e))return iz();try{let t=JSON.parse(xc.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return iz()},cz=(e,t)=>{xc.default.mkdirSync(lz.default.dirname(e),{recursive:!0}),xc.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},IZ=e=>{let t=jr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,az.createHash)("sha256").update(o).digest("hex").slice(0,16)},dk=e=>{let t=Vn(e);return t===null?null:ck(t.usageStatsFilePath)},dz=e=>{if(e.chunkIds.length===0)return;let t=Vn(e);if(t===null)return;let r=ck(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;cz(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},uk=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=Vn(e);if(r===null)return null;let o=IZ(t),n=ck(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return cz(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},pk=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,mk=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var Wc,uz,OZ,MZ,pz,NZ,fk,Ic,ki,hk,Ti,yk,Sk=l(()=>{"use strict";Wc=m(require("node:fs")),uz=m(require("node:path"));Lc();_f();ak();gk();OZ="http://127.0.0.1:11434",MZ="nomic-embed-text",pz=(e,t,r)=>wi({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,NZ=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},fk=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},Ic=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||OZ,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||MZ;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},ki=(e,t,r)=>{let o=pz(e,t,r);if(o===null||!Wc.default.existsSync(o))return[];let n=Wc.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},hk=async e=>{let t=jr(e.text),r=fk(t);if(r.length===0)return 0;let o=pz(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;Wc.default.mkdirSync(uz.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await Ic(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Wc.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return kf(o),n},Ti=async e=>{let t=await Ic(e.query);if(t===null)return[];let r=e.minScore??0,s=ki(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:NZ(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return dz({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},yk=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Oc,mz,jZ,DZ,Pk,Ak,bk,gz=l(()=>{"use strict";Oc=m(require("node:fs")),mz=m(require("node:path"));Lc();lk();ak();Sk();jZ=e=>{if(!Oc.default.existsSync(e))return[];let t=Oc.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},DZ=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},Pk=async e=>{let t=Vn(e);if(t===null)return 0;let r=jr(e.text),o=fk(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;Oc.default.mkdirSync(mz.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await Ic(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};Oc.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return kf(n,200),s},Ak=async e=>{let t=Vn(e);if(t===null)return[];let r=await Ic(e.query);if(r===null)return[];let o=e.minScore??.3;return jZ(t.errorChunksFilePath).map(s=>({chunk:s,score:DZ(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},bk=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var _k=l(()=>{"use strict";Sk();gk();gz()});var ve,wk,kk=l(()=>{"use strict";z_();ve=D_,wk=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${ve.gray50};
  --aw-zinc-100: ${ve.gray100};
  --aw-zinc-200: ${ve.gray200};
  --aw-zinc-400: ${ve.gray400};
  --aw-zinc-500: ${ve.gray500};
  --aw-zinc-600: ${ve.gray600};
  --aw-zinc-700: ${ve.gray700};
  --aw-zinc-800: ${ve.gray900};
  --aw-zinc-900: ${ve.gray900};
  --aw-brand-600: ${ve.brand600};
  --aw-brand-700: ${ve.brand700};
  --aw-brand-50: ${ve.brand50};
  --aw-emerald-50: ${ve.success50};
  --aw-emerald-700: ${ve.success700};
  --aw-amber-50: ${ve.warning50};
  --aw-amber-900: ${ve.warning900};
  --aw-red-50: ${ve.error50};
  --aw-red-700: ${ve.error700};
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
`.trim()});var zZ,HZ,Tk,fz,vk,hz=l(()=>{"use strict";kk();Ec();zZ=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,HZ=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],Tk=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fz=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${zZ}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,vk=e=>{let t=HZ.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=Tk(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=Tk(e.installBundleVersionLabel?.trim()??"unknown"),s=fz("brand brand-in-sidebar",n),i=fz("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${Tk(e.title)} \xB7 Agent Witch Local</title>
  <style>${wk}</style>
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
  <script>${rk}</script>
</body>
</html>`}});var vf,Mc,Cf=l(()=>{"use strict";vf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Mc=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${vf(e.syncMessage)}</p>`:"",o=vf(e.manageHref),n=vf(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${vf(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var Ck,Rk,Ek,yz=l(()=>{"use strict";Ck=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,Rk=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,Ek=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var Sz=l(()=>{"use strict";hz();Cf();yz()});var vi,Lk,Pz=l(()=>{"use strict";Ec();vi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lk=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${vi(e.wakeError)}</div>`:"",a=Rc(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${vi(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${vi(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${vi(o)}</p>
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
        <p class="home-card-meta">${vi(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${vi(n)}</p>
      </a>
    </div>`}});var Az=l(()=>{"use strict";Pz()});var L,Ci=l(()=>{"use strict";L=e=>e==="passed"||e==="stopped"||e==="failed"});var bz,xk,qn,Wk,Rf=l(()=>{"use strict";bz="Stopped at the round limit. The best prompt is kept.",xk="Stopped because the score stopped rising. The best prompt is kept.",qn="Finished. The best prompt is the result.",Wk="Wizard ended. Progress from finished steps is kept."});var Ho,Ik=l(()=>{"use strict";Ho=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var $Z,FZ,Nc,_z,Ef=l(()=>{"use strict";$Z=/\n+|;\s+/,FZ=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,Nc=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split($Z).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,FZ(s)]},[]);return[...t,...o]},[]),_z=e=>{let t=Nc(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ue,Ri=l(()=>{"use strict";ue=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var jc,Ok=l(()=>{"use strict";Ef();Ri();jc=e=>{let t=[...e.priorRounds,e.current],r=ue(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:_z(o)}}});var Mk,UZ,BZ,Lf,Nk=l(()=>{"use strict";Mk={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},UZ=e=>{try{let t=JSON.parse(e.fragment);return{...Mk,objects:[...e.objects,t]}}catch{return{...Mk,objects:e.objects}}},BZ=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:UZ(r)},Lf=e=>[...e].reduce(BZ,Mk).objects});var GZ,jk,VZ,wz,Dk=l(()=>{"use strict";Nk();GZ=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},jk=e=>{let t=Lf(e).filter(GZ),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},VZ=(e,t)=>({...e,passed:e.score>=t}),wz=(e,t)=>{let r=jk(e);return r===null?null:VZ(r,t)}});var zk,Hk,xf=l(()=>{"use strict";zk="The judge reply needs a score and a reason.",Hk="The improver reply was empty."});var kz,Tz=l(()=>{"use strict";kz=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var vz,Cz=l(()=>{"use strict";vz=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var KZ,Rz,Ez=l(()=>{"use strict";Tz();Cz();Rf();Ef();KZ=e=>{let t=Nc(e);return t.length===0?xk:`${xk} Avoid: ${t.join("; ")}.`},Rz=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:bz};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(kz(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:KZ(vz(r))}}return null}});var $o,JZ,Kn,Lz,Wf=l(()=>{"use strict";$o=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},JZ=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,Kn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",JZ(e.tokens),`Delay: ${$o(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},Lz=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var XZ,xz,Wz=l(()=>{"use strict";Dk();XZ=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,xz=e=>{let r=(XZ.exec(e)?.[1]??e).trim();return r.length===0||jk(r)!==null?null:r}});var Iz,If,Oz=l(()=>{"use strict";Wf();Wz();xf();Iz=e=>({type:"call",role:"judge",choice:e.choice,prompt:Lz({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),If=e=>{let t=xz(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:Hk}}:{nextPrompt:t,continuation:Iz({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var $k,Mz=l(()=>{"use strict";Ik();Ok();Dk();xf();Rf();Ez();xf();Oz();$k=e=>{let t=wz(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:zk}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=Rz({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=jc({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:Ho({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var Dc,Fk=l(()=>{"use strict";Dc=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var Nz=l(()=>{"use strict"});var jz=l(()=>{"use strict";Nz()});var Jn,Dz=l(()=>{"use strict";Jn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var YZ,Uk,zz=l(()=>{"use strict";Wf();YZ=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,Uk=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",YZ(e.tokens),`Delay: ${$o(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var ZZ,QZ,eQ,Bk,Hz=l(()=>{"use strict";ZZ=/[A-Za-z0-9_./~-]{3,180}/g,QZ=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,eQ=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||QZ.test(t)},Bk=(e,t=12)=>{let r=[];for(let o of e.matchAll(ZZ)){let n=o[0].replace(/\.+$/,"");if(!(!eQ(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var zc,$z=l(()=>{"use strict";zc=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var Of,Gk,Fz,Hc,Vk=l(()=>{"use strict";Of=e=>Math.floor(e/2),Gk=e=>Math.max(Of(e)+1,e-20),Fz=(e,t)=>e>=t?"passes":e>=Gk(t)?"close":e>=Of(t)?"weak":"bad",Hc=e=>[{band:"bad",label:`0\u2013${Of(e)-1} bad`},{band:"weak",label:`${Of(e)}\u2013${Gk(e)-1} weak`},{band:"close",label:`${Gk(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var Mf,qk=l(()=>{"use strict";Vk();Mf=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${Fz(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var $t,Kk=l(()=>{"use strict";$t=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var Uz,Bz=l(()=>{"use strict";Uz=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var tQ,rQ,Gz,Vz=l(()=>{"use strict";Ci();qk();Kk();Bz();tQ=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],rQ=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",Gz=e=>{let t=e.wizard;if(t===void 0)return[];let r=$t(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=tQ.map((P,S)=>{let y=!s&&!n&&S===r?"active":"done";return{id:`wizard-${S+1}`,label:P,state:y,detail:null}}).filter((P,S)=>s?!0:S<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=Mf(e),d=c.filter(P=>P.id==="round-0"),u=Uz(t)&&(!n||a)?c.filter(P=>P.id!=="round-0"):[],g=L(e.status)&&!s,h=g?[{id:"end",label:rQ(e),state:"done",detail:e.errorMessage}]:[];if(g&&h.length>0){let P=Math.min(r,i.length),S=i.slice(0,P).map(y=>({...y,state:"done"}));return[...d,...S,...h,...u]}return[...d,...i,...u,...h]}});var oQ,Jk,qz=l(()=>{"use strict";Ci();qk();Vz();oQ=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",Jk=e=>{if(e.wizard!==void 0)return Gz(e);let t=Mf(e),r=L(e.status)?[{id:"end",label:oQ(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var $c,Kz=l(()=>{"use strict";$c=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var Jz=l(()=>{"use strict";St()});var Xz,Fc,Uc,Li,Nf,Xk,Yz=l(()=>{"use strict";Jz();Xz="/prompt-optimizer/agent",Fc=`${Er}${Xz}`,Uc=`${Er}/prompt-optimizer`,Li="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",Nf=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Li}`,Xk="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var gr=l(()=>{"use strict"});var le,Bc=l(()=>{"use strict";gr();le=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var Yk,Zz=l(()=>{"use strict";Yk="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var Qz,eH=l(()=>{"use strict";Qz=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Gc,rH=l(()=>{"use strict";eH();gr();Gc=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:Qz(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var Zk,oH=l(()=>{"use strict";gr();Zk=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var Qk,nH=l(()=>{"use strict";gr();Qk=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var sH,Vc,iH=l(()=>{"use strict";sH=["generalize","evaluate","separate","optimize_modules"],Vc=(e,t)=>{let r=sH.indexOf(t);if(r===-1)return e;let o=sH.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var jf,eT=l(()=>{"use strict";Ef();jf=e=>{let t=Nc(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var qc,aH=l(()=>{"use strict";eT();qc=e=>{let t=jf(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var sQ,iQ,aQ,lH,cH=l(()=>{"use strict";sQ=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),iQ=/^\{\{[a-zA-Z0-9_-]+\}\}$/,aQ=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(sQ(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},lH=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>iQ.test(n)?n:aQ(n,r)).join("")}});var tT,dH=l(()=>{"use strict";cH();tT=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:lH(o.prompt,t)}))}))});var lQ,Kc,uH=l(()=>{"use strict";gr();eT();lQ=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Kc=e=>{let t=jf(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=lQ(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Jc,pH=l(()=>{"use strict";Fk();Jc=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return Dc({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Xc,oT=l(()=>{"use strict";Ri();Xc=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ue(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var nT,mH=l(()=>{"use strict";oT();nT=e=>{let t=Xc({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Xn,gH=l(()=>{"use strict";Xn=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var cQ,dQ,se,Df=l(()=>{"use strict";Bc();cQ=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},dQ=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,se=e=>{let t=le(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:cQ(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>dQ(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var fH,hH=l(()=>{"use strict";Bc();Df();fH=e=>{let t=se(e.wizard),r=le(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var sT,yH=l(()=>{"use strict";hH();sT=e=>{let t=fH({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var uQ,SH,PH=l(()=>{"use strict";uQ=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},SH=e=>[...e].reduce(uQ,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var pQ,AH,bH=l(()=>{"use strict";pQ=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},AH=e=>[...e].reduce(pQ,{out:"",inString:!1,escaped:!1}).out});var mQ,gQ,_H,wH=l(()=>{"use strict";PH();bH();mQ=e=>e.charCodeAt(0)===65279?e.slice(1):e,gQ=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},_H=e=>AH(SH(gQ(mQ(e))))});var fQ,hQ,yQ,kH,SQ,xi,zf=l(()=>{"use strict";Nk();wH();fQ=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},hQ=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},yQ=e=>[...e].reduce(hQ,{out:"",inString:!1,escaped:!1}).out,kH=e=>{let t=Lf(e);return t.length===0?null:t[t.length-1]},SQ=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},xi=e=>{let t=_H(fQ(e)),r=kH(t);if(r!==null)return r;let o=yQ(t),n=kH(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw SQ(i)}}});var PQ,AQ,iT,TH,vH=l(()=>{"use strict";PQ=/^[a-z0-9][a-z0-9-]{0,62}$/,AQ=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return PQ.test(t)?t:""},iT=e=>e.replace(/\s+/gu," ").trim(),TH=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=AQ(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=iT(n.name),a=iT(n.description),c=iT(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var CH,RH,EH=l(()=>{"use strict";CH=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},RH=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var aT,LH=l(()=>{"use strict";zf();vH();EH();aT=(e,t)=>{let r=(()=>{try{return xi(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(CH(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(RH).filter(a=>a!==null),i=TH({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var lT,xH=l(()=>{"use strict";lT=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var cT,WH=l(()=>{"use strict";cT=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var dT,IH=l(()=>{"use strict";Bc();Df();dT=e=>{let t=se(e.wizard),r=le(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var Yc,OH=l(()=>{"use strict";Yc=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var Ft,bQ,uT,MH=l(()=>{"use strict";Ft=m(Ds());zf();bQ=(0,Ft.isType)({name:Ft.isNonEmptyString,description:Ft.isString,sampleValue:Ft.isString}),uT=e=>{let t=xi(e);if(!(0,Ft.isType)({templatedPrompt:Ft.isNonEmptyString,variables:(0,Ft.isArrayWithEachItem)(bQ)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var pe,_Q,wQ,pT,NH=l(()=>{"use strict";pe=m(Ds());gr();zf();_Q=(0,pe.isType)({id:pe.isNonEmptyString,title:pe.isNonEmptyString,prompt:pe.isNonEmptyString,order:pe.isNumber}),wQ=(0,pe.isType)({id:pe.isNonEmptyString,title:pe.isNonEmptyString,summary:pe.isString,topology:(0,pe.isOneOf)("chain","parallel"),modules:(0,pe.isArrayWithEachItem)(_Q),recommended:pe.isBoolean}),pT=e=>{let t=xi(e);if(!(0,pe.isType)({options:(0,pe.isArrayWithEachItem)(wQ)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Wi,jH=l(()=>{"use strict";Wi=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var kQ,mT,gT=l(()=>{"use strict";kQ=/\{\{([a-zA-Z0-9_-]+)\}\}/g,mT=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(kQ,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Ut,Bt,DH=l(()=>{"use strict";Ri();gT();Ut=e=>mT(e.templatedPrompt,e.variables),Bt=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ue(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Ut(e.wizard)}});var TQ,Yn,zH=l(()=>{"use strict";TQ=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Yn=(e,t)=>e.replace(TQ,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var vQ,Zn,Hf=l(()=>{"use strict";vQ=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Zn=e=>{let t=new Set,r=[];for(let o of e.matchAll(vQ)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Zc,HH=l(()=>{"use strict";Hf();Zc=e=>e.variables.length>0||Zn(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var fT,hT=l(()=>{"use strict";gr();fT=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Qc,$H=l(()=>{"use strict";Ri();hT();Qc=e=>{let t=e.wizard.evaluateSelectedRound??ue(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:fT(r.judgement,e.passScore)}});var ed,FH=l(()=>{"use strict";ed=e=>e.length===1&&e[0].modules.length===1});var yT,UH=l(()=>{"use strict";yT=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Ce,$f,td=l(()=>{"use strict";Ce=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),$f=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var BH,GH=l(()=>{"use strict";td();BH=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Ce("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Ce("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Ce("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var VH,qH=l(()=>{"use strict";Ci();td();VH=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!L(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Ce("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),Ce("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Ce("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",$f(e.writerLabel,e.folder)),Ce("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Ce("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var KH,JH=l(()=>{"use strict";td();KH=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Ce("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Ce("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Ce("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var XH,YH=l(()=>{"use strict";td();XH=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Ce("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Ce("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",$f(e.writerLabel,e.folder)),...r?[Ce("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var Ff,ZH=l(()=>{"use strict";Ci();GH();qH();JH();YH();Ff=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(L(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return VH(r);case"evaluate":return BH({...r,currentRound:e.currentRound});case"separate":return XH(r);case"optimize_modules":return KH({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var rd,Dr,QH=l(()=>{"use strict";rd=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),Dr=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var CQ,Uf,ST,e$=l(()=>{"use strict";Hf();CQ="wizardParam_",Uf=e=>`${CQ}${e}`,ST=e=>{let t=Zn(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=Uf(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var pt,t$=l(()=>{"use strict";pt=["generalize","evaluate","separate","optimize_modules"]});var od,Qn,Ii,zr=l(()=>{"use strict";od="Stopped because the confirmed token or spend budget was exceeded.",Qn="Approaching the confirmed budget. Further trials may hard-stop.",Ii="Confirm the Step 4 token and spend budget before optimizing modules."});var mt,Oi=l(()=>{"use strict";mt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var Vt,nd=l(()=>{"use strict";zr();Vt=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var RQ,Hr,sd=l(()=>{"use strict";zr();RQ={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},Hr=e=>{let t=e?.trim()??"";return t.length===0?.01:RQ[t]??.01}});var Bf,PT=l(()=>{"use strict";zr();sd();Bf=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=Hr(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var r$,Vf,AT,bT=l(()=>{"use strict";zr();Oi();nd();PT();sd();r$=e=>{let t=Bf({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??Hr(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:mt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},Vf=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),AT=e=>{let t=e.existing??Vt(),r=r$({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return Vf(t,r)}});var Mi,id,s$=l(()=>{"use strict";zr();gr();Oi();nd();bT();PT();sd();Mi=e=>{let t=Bf({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??Hr(e.writerId),i=r*4e3,a=n*o*8e3,c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:mt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},id=e=>{let t=e.existing??Vt();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=Mi({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return Vf(t,r)}});var $r,i$=l(()=>{"use strict";Oi();zr();nd();$r=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??Vt(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=mt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var wT,Ni,a$=l(()=>{"use strict";zr();Oi();wT=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=mt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:od,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:od,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:Qn,costControls:{...t,softWarnFired:!0,softWarnMessage:Qn}}:null},Ni=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var kT,l$=l(()=>{"use strict";kT=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var W=l(()=>{"use strict";Ci();Rf();Mz();Ik();Wf();Fk();jz();Dz();zz();Hz();Ok();$z();Ri();qz();Kk();Vk();Kz();Yz();gr();Bc();Zz();rH();oH();nH();iH();aH();dH();uH();pH();oT();mH();gH();Df();yH();LH();xH();WH();IH();OH();MH();NH();jH();DH();gT();zH();Hf();HH();$H();FH();hT();UH();ZH();QH();e$();t$();zr();Oi();nd();bT();s$();sd();i$();a$();l$()});var TT=l(()=>{"use strict";Tl()});var EQ,u$,p$=l(()=>{"use strict";TT();EQ=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,u$=e=>{let t=Rn(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(EQ)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var g$,LQ,xQ,fr,WQ,IQ,m$,Kf,f$,OQ,bt,h$,y$,S$,qt=l(()=>{"use strict";TT();p$();g$=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),LQ=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,xQ=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,fr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(LQ.test(e.errorMessage))return"usage_limit";if(xQ.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},WQ="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",IQ="The writer waited on terminal input and did not return a prompt.",m$=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Kf=e=>{let t=e.trim();if(t.length===0||t.length>=500||!m$.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>m$.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},f$=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},OQ=e=>Kf(e.stdout)??Kf(e.stderr)??(f$(e.replyFile)?Kf(e.replyFile):null),bt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return WQ;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?IQ:null},h$=e=>{let t=e.trim();return t.length===0?null:bt(t)!==null?t:Kf(t)??(f$(t)?t:null)},y$=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],S$=e=>{let t=e.replyFileText?.trim()??"",r=bt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=OQ({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=fr({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=u$([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Rn(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var MQ,A$,P$,ts,Jf=l(()=>{"use strict";qt();MQ=400,A$=(e,t=MQ)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},P$=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:h$(e.promptText)},ts=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:P$(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=P$(e.revisions[n]);if(s!==null)return s.trim()}return null}});var I,NQ,Xf,ce,rs,_$,b$,w$,k$,Re=l(()=>{"use strict";I="manual",NQ=["claude-cli","codex","cursor","antigravity"],Xf={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ce=e=>e===I?"You":e in Xf?Xf[e]:e,rs=e=>NQ.filter(t=>e.includes(t)),_$=e=>{let t=rs(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},b$=(e,t)=>t===I?I:e.find(r=>r===t)??null,w$=(e,t,r)=>{let o=rs(e),n=b$(o,t),s=b$(o,r);return n===null||s===null?null:{judge:n,improver:s}},k$=(e,t,r)=>{let o=rs(e);return t===null||t.trim()===""?r!==I?r:o[0]??null:t===I?null:o.find(n=>n===t)??null}});var T$,Yf,vT,os,CT,gt,Fr,me,Ze=l(()=>{"use strict";T$=m(require("node:fs")),Yf=m(require("node:os")),vT=m(require("node:path"));Ro();os="~",CT=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,gt=e=>{let t=Yf.default.homedir(),r=CT(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Fr=e=>{let t=e.trim().length===0?"~":e.trim(),r=Ge(t),o=vT.default.isAbsolute(r)?CT(r):CT(vT.default.resolve(Yf.default.homedir(),r));try{if(!T$.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:gt(o)}},me=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Yf.default.homedir()});var et,Fo=l(()=>{"use strict";et='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var RT,v$,jQ,C$,R$,ET=l(()=>{"use strict";W();Re();Ze();Fo();RT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),v$=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',jQ=e=>{let t=v$(e.state),r=`<h2>${RT(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${RT(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${et}</button></div><template>${r}</template></li>`},C$=e=>{let t=e.wizard;if(t===void 0)return"";let r=Ff({status:e.status,wizard:t,writerLabel:ce(e.judgeModel),runnerLabel:ce(e.runnerModel??e.judgeModel),folderDisplay:gt(me(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(jQ).join("")}</ol>`},R$=e=>{let t=e.wizard;if(t===void 0)return"";let r=Ff({status:e.status,wizard:t,writerLabel:ce(e.judgeModel),runnerLabel:ce(e.runnerModel??e.judgeModel),folderDisplay:gt(me(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${v$(n.state)}<span class="sdlc-pipeline-label">${RT(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var Kt,E$,L$,x$,LT=l(()=>{"use strict";W();Kt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),E$="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",L$=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Kt(E$)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${Kt(i.name)}}}</strong> \u2014 ${Kt(i.description)} (sample: ${Kt(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Kt(r)}</pre>`,n=Ut(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Kt(n)}</pre>`;return`${t}${o}${s}`},x$=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Kt(E$)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${Kt(n.name)}}}</strong> \u2014 ${Kt(n.description)} (sample: ${Kt(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${Kt(r)}</pre>`;return`${t}${o}`}});var ad,xT=l(()=>{"use strict";ad=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var W$,I$=l(()=>{"use strict";W();W$=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=Jn({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=Kn({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var WT,ld,IT=l(()=>{"use strict";Fo();I$();WT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ld=e=>{let t=W$(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${WT(r)}">${et}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${WT(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${WT(t)}</pre></template>`}});var OT,cd,MT=l(()=>{"use strict";Fo();OT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cd=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${OT(r)}">${et}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${OT(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${OT(t)}</pre></template>`}});var Zf,ji,NT=l(()=>{"use strict";xT();IT();MT();Zf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ji=e=>{let t=ad(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${Zf(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,u=e.cycle.revisions.map(g=>{let h=g.judgement?.score,P=h==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${h}`,S=g.judgement?.reasons?.trim()??"",y=S.length===0?"":`<br><span class="muted">${Zf(S)}</span>`,p=cd({roundLabel:d(g.roundNumber),promptText:g.promptText}),A=ld({cycle:e.cycle,roundNumber:g.roundNumber,promptText:g.promptText,run:g.run}),T=`${p}${A}`;if(e.interactive){let f=e.selectedRound===g.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${f}> <span class="sdlc-wizard-revision-title">${Zf(P)}</span></label>${T}${y}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Zf(P)}</span>${T}${y}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var jT,O$,M$,N$,DT=l(()=>{"use strict";jT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),O$=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${jT(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${jT(t.prompt)}</pre></li>`).join("")}</ol>`,M$=e=>O$([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),N$=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${jT(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${O$(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var dd,DQ,Qf,zT=l(()=>{"use strict";W();DT();dd=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DQ=e=>{let t=e.wizard;return t===void 0?"":Bt({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},Qf=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=DQ(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${dd(n.orchestratorSkill.fileName)}</code> \u2014 ${dd(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${dd(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=M$(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${dd(r)} <span class="muted">${dd(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var De,zQ,HQ,$Q,FQ,eh,UQ,BQ,GQ,VQ,qQ,KQ,Di,th=l(()=>{"use strict";W();ET();LT();NT();IT();MT();zT();De=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zQ={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},HQ=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${De(o)}</pre>`:`<p class="sdlc-pre-preview mono">${De(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${De(o)}</pre></details>`;return`<h2>${De(e)}</h2>${n}`},$Q=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=Ut(t).trim(),n=Bt({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!L(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${HQ("What is being evaluated",i)}`},FQ=(e,t)=>{let r=e.wizard;if(r===void 0||L(e.status))return"";let o=zQ[t];return o===void 0||r.phase!==o?"":R$(e)},eh=(e,t,r)=>{let o=FQ(e,t),n=t==="wizard-2"?$Q(e):"";return`${o}${n}${r}`},UQ=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},BQ=e=>{let t=e.wizard;return t===void 0?"":L$(t)},GQ=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${De(a)}</span>`,d=`Round ${n.roundNumber}`,u=cd({roundLabel:d,promptText:n.promptText}),g=ld({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${De(s)}${i}</span>${u}${g}${c}</li>`}).join("")}</ul>`,VQ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return ji({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=UQ(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${GQ(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=Bt({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${De(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",u=`Round ${c.roundNumber} \u2014 score ${d}`,g=cd({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),h=ld({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${De(u)}</span>${g}${h}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${De(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},qQ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${De(n.title)}</strong> <span class="muted">(${De(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${De(o.title)}</strong>${n}${De(s)}${Qf(e,o)}</li>`}).join("")}</ul>`},KQ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${De(i)}</span> <strong>${De(n.title)}</strong>${De(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${De(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?ji({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Di=(e,t)=>{switch(t){case"wizard-1":return eh(e,t,BQ(e));case"wizard-2":return eh(e,t,VQ(e));case"wizard-3":return eh(e,t,qQ(e));case"wizard-4":return eh(e,t,KQ(e));default:return""}}});var JQ,XQ,j$,D$,z$=l(()=>{"use strict";W();Jf();qt();th();JQ=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},XQ=e=>{let t=e.goal.trim();return t.length===0?null:t},j$=(e,t,r,o,n)=>{let s=bt(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},D$=(e,t)=>{let r=XQ(e);if(t.id.startsWith("wizard-")){let s=Di(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=$c(e,t);if(s!==null){let a=ts(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ue(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:j$(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:JQ(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:j$(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var ns,H$,$$=l(()=>{"use strict";ns=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H$=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${ns(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${ns(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${ns(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${ns(n)}</h2><pre class="mono">${ns(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${ns(e.goal)}</dd></div></dl>`;return`<h2>${ns(e.title)}</h2>${i}${t}${r}${o}${s}`}});var YQ,F$,ud,HT,rh=l(()=>{"use strict";W();YQ=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),F$=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||L(e.status))return null;let r=$t(t);return r<0||r>3?null:`wizard-${r+1}`},ud=(e,t)=>YQ.has(t)?F$(e)===t:!1,HT="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var ZQ,oh,$T=l(()=>{"use strict";ZQ='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',oh=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${ZQ}</button>`});var ss,nh=l(()=>{"use strict";W();ss=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:jc({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:zc(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var QQ,U$,eee,FT,B$,tee,ree,oee,nee,G$,V$=l(()=>{"use strict";W();nh();QQ={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},U$=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},eee=e=>QQ[e]??null,FT=(e,t)=>{let r=e.wizard,o=eee(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=$t(r);return o<n||o===n},B$=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},tee=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:Ut(t).trim();return o.length===0?null:qc({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:U$(e,"generalize")})},ree=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=ss(e);return n===null?null:Ho({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=B$(e)?.promptText.trim()??Bt({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:Jn({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},oee=e=>{let t=e.wizard;if(t===void 0)return null;let r=Bt({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:Kc({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:U$(e,"separate")})},nee=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=Dr(t),s=Yn(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=ss(e);return c===null?null:Ho({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=B$(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||L(e.status)&&i?.judgement!==null)?Kn({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):Jc({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:Xn(t,r).output,moduleTitle:o.title})},G$=(e,t)=>{if(!FT(e,t))return null;switch(t){case"wizard-1":return tee(e);case"wizard-2":return ree(e);case"wizard-3":return oee(e);case"wizard-4":return nee(e);default:return null}}});var see,sh,UT=l(()=>{"use strict";W();see=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},sh=(e,t)=>{let r=e.wizard,o=see(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=$t(r);return o<n?"done":o===n&&L(e.status)&&e.status==="failed"?"failed":o<=n&&L(e.status)?"done":"pending"}});var iee,zi,ih=l(()=>{"use strict";Fo();V$();UT();iee=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zi=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(sh(e,t)==="pending")return""}else if(!FT(e,t))return"";let o=G$(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${et}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${iee(o)}</pre></template>`}});var is,Ur,Hi=l(()=>{"use strict";is=e=>e.toLocaleString("en-US"),Ur=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var hr,aee,q$,ah,K$,J$,lh=l(()=>{"use strict";W();z$();$$();rh();$T();Fo();Jf();ET();ih();Hi();hr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aee=(e,t)=>{let r=$c(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Ur(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${is(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${hr(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${hr(r)}</span>`:"",d=H$(D$(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&L(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${hr(e.id)}"`:"",g=ud(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${hr(HT)}"><input type="hidden" name="cycleId" value="${hr(t.id)}"><input type="hidden" name="wizardStepId" value="${hr(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",h=e.state==="active"&&e.id.startsWith("wizard-")?C$(t):"",P=o?"failed":e.state,S=o?ts(t):null,y=S!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${et}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${hr(S)}</pre></template>`:"",p=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?zi(t,e.id):"";return`<li class="sdlc-node sdlc-node-${P}" data-sdlc-step-id="${hr(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${hr(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${g}${p}${y}</div></div>${h}<template>${d}</template></li>`},q$=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>aee(r,t)).join("")}</ol>`,ah=e=>`<div class="sdlc-score" aria-label="What the score means">${Hc(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${hr(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,K$=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${oh({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,J$=`<script>
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
</script>`});var ch,dh,uh,X$,BT=l(()=>{"use strict";ch="support-reply",dh="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",uh=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),X$=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var ph,Y$,Z$=l(()=>{"use strict";W();lh();BT();ph=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Y$=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${ah(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${ph(dh)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${ph(uh)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${ph(X$)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${ph(ch)}">Run this sample</a>
      </div>
    </section>`});var GT,mh,lee,Q$,eF=l(()=>{"use strict";GT=m(require("node:fs")),mh=m(require("node:path")),lee=e=>mh.default.join(mh.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),Q$=(e,t)=>{let r=lee(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;GT.default.mkdirSync(mh.default.dirname(r),{recursive:!0}),GT.default.appendFileSync(r,o,"utf8")}});var $i,tF,cee,rF,dee,oF,yr,Z,nF,$,ft=l(()=>{"use strict";$i=m(require("node:fs")),tF=m(require("node:path"));W();eF();cee=e=>e.wizard===void 0?e:{...e,wizard:Zk(e.wizard)},rF=new Set,dee=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),oF=(e,t)=>{$i.default.mkdirSync(tF.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;$i.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),$i.default.renameSync(r,e)},yr=e=>{if(!$i.default.existsSync(e))return[];try{let t=JSON.parse($i.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(dee).map(cee):[]}catch{return[]}},Z=(e,t)=>yr(e).find(r=>r.id===t)??null,nF=(e,t)=>{rF.add(t);let r=yr(e).filter(o=>o.id!==t);oF(e,r)},$=(e,t)=>{if(rF.has(t.id))return;let r=yr(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];oF(e,o),Q$(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var Fi,Sr,pd,sF,gh,uee,iF,aF,lF,VT=l(()=>{"use strict";Fi=m(require("node:fs")),Sr=m(require("node:path")),pd=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},sF=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),gh=(e,t)=>{let r=pd(e);return r.length>0?r:pd(t)},uee=e=>{let t=gh(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${sF(o)}`,...n.length>0?[`description: ${sF(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},iF=e=>`.cursor/skills/${e}/SKILL.md`,aF=(e,t)=>{let r=pd(t);if(r.length===0)return!1;let o=Sr.default.resolve(e),n=Sr.default.resolve(o,".cursor","skills"),s=Sr.default.resolve(o,iF(r));return s.startsWith(`${n}${Sr.default.sep}`)?Fi.default.existsSync(s):!1},lF=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(gh(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Sr.default.resolve(e.workingDirectory);try{if(!Fi.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=uee({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=iF(r.slug),n=Sr.default.resolve(t,".cursor","skills"),s=Sr.default.resolve(t,o);if(!s.startsWith(`${n}${Sr.default.sep}`))return{ok:!1,errorCode:"path"};if(Fi.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Fi.default.mkdirSync(Sr.default.dirname(s),{recursive:!0}),Fi.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var pee,cF,dF,uF=l(()=>{"use strict";W();ft();Ze();qt();VT();pee=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,cF=e=>{let t=e.get("savedSkill");return t!==null&&pee.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},dF=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=Z(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!L(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ue(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||bt(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=lF({workingDirectory:me(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var fh,hh,md=l(()=>{"use strict";W();fh=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=$r({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},hh=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var Uo,gd=l(()=>{"use strict";W();md();Uo=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=yT(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=AT({moduleCount:o.length,existing:e.costControls,writerId:n}),i=fh(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:rd(r.variables)},updatedAt:new Date().toISOString()}}});var Bo,fd=l(()=>{"use strict";Bo=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var qT=l(()=>{"use strict";Ot();kc();Tl()});var KT,pF,JT,mF,gF=l(()=>{"use strict";KT={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},pF=e=>e.exitCode===null&&e.signalCode===null,JT=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!pF(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!pF(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),mF=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),JT(e).then(s=>{r({...KT,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var fF,hd,hF,XT,mee,ZT,QT,gee,fee,hee,yF,yee,YT,SF,yd,PF,See,Pee,tt,as=l(()=>{"use strict";fF=require("node:child_process"),hd=m(require("node:fs")),hF=m(require("node:os")),XT=m(require("node:path"));qT();gF();qt();mee=["claude-cli","codex","cursor","antigravity"],ZT=18e4,QT=6e5,gee=12e4,fee=9e5,hee="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",yF="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",yee="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",YT=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},SF=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=YT(process.env[yF])??Math.max(r,QT));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:YT(process.env[yee])??fee;return Math.min(o,Math.max(gee,r))},yd=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?YT(process.env[yF])??QT:ZT,PF=e=>`The writer timed out after ${e}ms.`,See=e=>mee.includes(e),Pee=e=>e===!0||process.env[hee]==="1",tt=e=>new Promise(t=>{if(e.signal?.aborted){t(KT);return}if(Pee(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!See(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=ir(r,e.prompt,Pe({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!hd.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:ZT,s=XT.default.join(hd.default.mkdtempSync(XT.default.join(hF.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=y$({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,fF.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),g=h=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(h))};mF(u,e.signal,g,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",JT(u).then(h=>{g({ok:!1,errorMessage:PF(n),errorKind:"writer_timeout",killSignal:h})})},n),u.stdout.on("data",h=>{a.push(Buffer.from(h))}),u.stderr.on("data",h=>{c.push(Buffer.from(h))}),u.on("error",()=>g({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",()=>{if(d.settled)return;let h=hd.default.existsSync(s)?hd.default.readFileSync(s,"utf8"):null,P=S$({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:h});if(P.ok&&d.stopReason!=="abort"){g(P);return}d.stopReason===null&&g(P)})})});var Aee,Sd,ev=l(()=>{"use strict";W();Hi();Aee=e=>{if(e.wizard!==void 0){let t=Yc(e.wizard),r=Ur(e);return(t??0)+r}return Ur(e)},Sd=e=>{let t=wT({costControls:e.costControls,spentTokens:Aee(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var AF,bee,Pd,yh,Sh=l(()=>{"use strict";W();Re();ev();AF=e=>e===I?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},bee=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Pd=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=$k({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:AF(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?kT({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:zc(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=bee(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?Sd({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):Sd({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},yh=(e,t,r=null)=>{let o=If({raw:t,judge:AF(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Ph,tv=l(()=>{"use strict";Ph=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var wF,Ah,bh,bF,_F,rv,_ee,kF,ov,wee,TF,kee,Tee,vF,CF=l(()=>{"use strict";wF=require("node:child_process"),Ah=m(require("node:fs")),bh=m(require("node:path"));Vg();W();bF=4e3,_F=12e3,rv=(e,t)=>{let r=(0,wF.spawnSync)("git",[...t],{cwd:e,env:No(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},_ee=e=>rv(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",kF=e=>{let t=rv(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},ov=(e,t)=>{let r=bh.default.resolve(e,t),o=bh.default.relative(e,r);if(o.startsWith("..")||bh.default.isAbsolute(o)||!Ah.default.existsSync(r)||!Ah.default.statSync(r).isFile())return null;let n=Ah.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>bF?`${n.slice(0,bF)}
\u2026truncated`:n},wee=e=>e.length>_F?`${e.slice(0,_F)}
\u2026truncated`:e,TF=e=>{let t=Bk(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,ov(e.workingDirectory,n)])),o=_ee(e.workingDirectory);return{git:o,status:o?kF(e.workingDirectory):{},files:r,paths:t}},kee=(e,t)=>{let r=rv(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=ov(e,t);return o===null?`${t} is missing.`:o},Tee=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",vF=e=>{let t=e.before.git?kF(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=ov(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>kee(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:Tee(e.before.git,e.before.paths.length>0),evidence:wee(i.join(`

`))}}});var iv,K,av,ze,RF,vee,Cee,EF,Ui,LF,Bi,Ree,Eee,Ad,nv,sv,Lee,xF,xee,Wee,Iee,WF,Oee,IF,OF,Mee,Nee,MF,NF=l(()=>{"use strict";iv=require("node:child_process"),K=m(require("node:fs")),av=m(require("node:os")),ze=m(require("node:path"));Vg();RF=8e6,vee=16e6,Cee=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],EF=(e,t)=>{let r=(0,iv.spawnSync)("git",[...t],{cwd:e,env:No(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Ui=(e,t)=>(0,iv.spawnSync)("git",[...t],{cwd:e,env:No(),timeout:8e3}).status===0,LF=e=>{let t=EF(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},Bi=(e,t)=>{let r=ze.default.resolve(e,t),o=ze.default.relative(e,r);return o.startsWith("..")||ze.default.isAbsolute(o)?null:r},Ree=(e,t)=>{let r=Bi(e,t);if(r===null||!K.default.existsSync(r))return null;let o=K.default.statSync(r);return!o.isFile()||o.size>RF?null:K.default.readFileSync(r)},Eee=(e,t,r)=>{let o=Bi(e,t);o!==null&&(K.default.mkdirSync(ze.default.dirname(o),{recursive:!0}),K.default.writeFileSync(o,r))},Ad=(e,t)=>{let r=Bi(e,t);r===null||!K.default.existsSync(r)||K.default.rmSync(r,{recursive:!0,force:!0})},nv=(e,t)=>Ui(e,["cat-file","-e",`HEAD:${t}`]),sv=e=>{let t=EF(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},Lee=e=>ze.default.resolve(e)!==ze.default.resolve(av.default.homedir()),xF=e=>{if(!K.default.existsSync(e))return 0;let t=K.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?K.default.readdirSync(e).reduce((r,o)=>r+xF(ze.default.join(e,o)),0):0},xee=(e,t,r)=>{let o=Bi(e,r);if(o===null||!K.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(xF(o)>vee)return{relativePath:r,existed:!0,copyDir:null};let n=ze.default.join(t,"cache",r);return K.default.mkdirSync(ze.default.dirname(n),{recursive:!0}),K.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},Wee=400,Iee=32e6,WF=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!K.default.existsSync(s)))for(let i of K.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=ze.default.join(s,i),c=K.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>RF)){if(t.length>=Wee||r+c.size>Iee){o=!1;return}r+=c.size,t.push(ze.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},Oee=(e,t,r)=>{let o=Bi(e,r);if(o===null||!K.default.existsSync(o))return null;let n=Ree(e,r);if(n===null)return"skip";let s=ze.default.join(t,"files",r);return K.default.mkdirSync(ze.default.dirname(s),{recursive:!0}),K.default.writeFileSync(s,n),s},IF=e=>{let t=K.default.mkdtempSync(ze.default.join(av.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?LF(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:WF(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,Oee(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?sv(e.workingDirectory):null,isolateCaches:Lee(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:Cee.map(i=>xee(e.workingDirectory,t,i))}},OF=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Ad(e.workingDirectory,t);return}Eee(e.workingDirectory,t,K.default.readFileSync(r))}},Mee=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?OF(e,t):nv(e.workingDirectory,t)?Ui(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Ad(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&nv(e.workingDirectory,t)&&Ui(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!nv(e.workingDirectory,t)&&Ui(e.workingDirectory,["reset","-q","HEAD","--",t])},Nee=(e,t)=>{let r=Bi(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Ad(e.workingDirectory,t.relativePath),K.default.mkdirSync(ze.default.dirname(r),{recursive:!0}),K.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Ad(e.workingDirectory,t.relativePath);return}if(K.default.existsSync(r))for(let o of K.default.readdirSync(r)){let n=ze.default.join(r,o);K.default.statSync(n).mtimeMs>=e.startedMs-1e3&&K.default.rmSync(n,{recursive:!0,force:!0})}}}},MF=e=>{try{if(e.git){if(sv(e.workingDirectory)!==e.head&&(!(e.head===null?Ui(e.workingDirectory,["update-ref","-d","HEAD"]):Ui(e.workingDirectory,["reset","--hard",e.head]))||sv(e.workingDirectory)!==e.head))throw new Error("head");let r=LF(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))Mee(e,o)}else{if(e.complete)for(let t of WF(e.workingDirectory).paths)e.files[t]===void 0&&Ad(e.workingDirectory,t);for(let t of Object.keys(e.files))OF(e,t)}for(let t of e.caches)Nee(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{K.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var _h,wh,jee,Dee,zee,Hee,$ee,jF,Fee,DF,zF=l(()=>{"use strict";W();Sh();tv();CF();NF();Re();Ze();qt();as();_h=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),wh=e=>({...e,status:"stopped",errorMessage:qn,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),jee=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),Dee=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==I?t:e.improverModel!==I?e.improverModel:null}return e.judgeModel!==I?e.judgeModel:e.improverModel!==I?e.improverModel:null},zee=async e=>{let t=me(e.cycle),r=TF({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=IF({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Jc({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Xn(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):Dc({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=SF({promptText:e.revision.promptText,isModuleRun:i}),c=yd({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await tt({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),g=u.ok?vF({workingDirectory:t,before:r,writerReply:u.text}):null,h=MF(o),P={...e.cycle,revisions:e.cycle.revisions.map(S=>S.roundNumber===e.cycle.currentRound?d:S)};return u.ok?!h.ok||g===null?{ok:!1,cycle:_h(P,h.ok?"Could not put the folder back after the run.":h.errorMessage)}:{ok:!0,cycle:P,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:g.lookedAt,evidence:g.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:wh(P)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:_h(P,u.errorMessage,fr(u))})},Hee=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:zee({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),$ee=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),jF=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await tt({writerAgent:e.reviewer,workingDirectory:me(e.cycle),prompt:Uk({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:wh(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},Fee=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===I)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await tt({writerAgent:t.judgeModel,workingDirectory:me(t),prompt:Jn({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Pd(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?wh(o):(e.onWriterFailure?.(t.judgeModel),_h(o,n.errorMessage,fr(n)))},DF=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return Fee(e);let o=Dee(t),n=await Hee({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?jee(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===I){let u=await jF({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{...$ee(s,u.text),judgePhase:void 0}}let i=await tt({writerAgent:t.judgeModel,workingDirectory:me(t),prompt:Kn({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?wh(s):(e.onWriterFailure?.(t.judgeModel),_h(s,i.errorMessage,fr(i)));let a=await jF({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Pd(s,i.text,c);return Ph(d,a.text)}});var kh,Uee,Bee,lv,HF=l(()=>{"use strict";W();Sh();zF();nh();qt();Re();ev();Ze();as();kh=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),Uee=e=>({...e,status:"stopped",errorMessage:qn,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),Bee=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?Uee(e):(n?.(r),kh(e,t.errorMessage,fr(t))),lv=async(e,t,r,o)=>{let n=Sd(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return kh(e,"This round has no prompt.");if(e.status==="judging")return DF({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return kh(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===I)return e;let i=ss(e);if(i===null)return kh(e,"The improver needs the score and the reason.");let a=await tt({writerAgent:e.improverModel,workingDirectory:me(e),prompt:Ho({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:yd()}),c=Bee(e,a,e.improverModel,r,t);return c!==null?c:yh(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var bd,cv,Gee,FF,$F,Vee,qee,Th,UF,BF,Kee,Jee,ls,GF,VF,_d=l(()=>{"use strict";W();gd();fd();Re();Ze();qt();as();HF();xT();bd=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),cv=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return bd(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},Gee=e=>{let t=fr(e);return g$(e)||t==="usage_limit"||t==="action_required"},FF=(e,t,r)=>Gee(r)?bd(e,r.errorMessage,fr(r)):cv(e,t,r.errorMessage),$F=e=>{let t=e.wizard;return t===void 0||ad(e).length===0?e:{...e,wizard:Wi({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},Vee=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",qee=e=>{let t=e.wizard;if(t===void 0)return e;let r=Xc({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Wi({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Th=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),UF=e=>e.judgeModel!==I?e.judgeModel:e.improverModel!==I?e.improverModel:null,BF=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},Kee=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=UF(e);if(n===null)return bd(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Ut(o),i=qc({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:BF(e,"generalize")}),a=await tt({writerAgent:n,prompt:i,workingDirectory:me(e),signal:t});if(!a.ok)return r?.(n),FF(e,"generalize",a);try{let c=uT(a.text),d=Wi({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:rd(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return Zc(d)?ls({...u,wizard:{...d,gate:null}}):Th(u,"generalize")}catch(c){return cv(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},Jee=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=UF(e);if(n===null)return bd(e,"Choose a writer to suggest splits.");let s=Bt({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Kc({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:BF(e,"separate")}),a=await tt({writerAgent:n,prompt:i,workingDirectory:me(e),signal:t});if(!a.ok)return r?.(n),FF(e,"separate",a);try{let c=pT(a.text),d=tT(c,o.variables),u=Wi({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:u};return ed(d)?Uo(g,d[0]):Th(g,"separate")}catch(c){return cv(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},ls=e=>{let t=e.wizard;if(t===void 0)return e;let r=Ut(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},GF=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return bd(e,"This module is missing.");let n=Dr(r),s=Yn(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==I?e.runnerModel:e.judgeModel!==I?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:le(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},VF=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return lv(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return Kee(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return Jee(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await lv(e,t,r,o);if(L(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&ad(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=ue(s.revisions.map(h=>({roundNumber:h.roundNumber,promptText:h.promptText,score:h.judgement?.score??0,reasons:h.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&Qc({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let u=$F(Th(a,i));return Bo(u)}let c=Th(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=nT({wizard:{...c.wizard,modules:c.wizard.modules.map((g,h)=>h===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:Vee(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?$F(d):qee(d)}return s}return n.phase==="complete",e}});var Gi,vh=l(()=>{"use strict";W();Re();Gi=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:lT(r,e.judgeModel===I),updatedAt:new Date().toISOString()}}});var Vi,Ch=l(()=>{"use strict";Vi=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var _t,qF,Xee,KF=l(()=>{"use strict";W();Ze();Ch();qt();VT();_t=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qF=e=>{if(!L(e.status))return"";let t=ue(e.revisions.map(h=>({roundNumber:h.roundNumber,promptText:h.promptText,score:h.judgement?.score??null,reasons:h.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=bt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${_t(t.reasons.trim())}</p>`,i=e.status==="passed",a=Vi(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${_t(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${_t(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${_t(n)}</div>`:i?Xee({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:me(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${_t(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${_t(t.promptText)}</pre></details>`,g=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${g}</h2>${d}${o}${s}${u}</section>`},Xee=e=>{let t=e.sourceSkill?.fileName??pd(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=gh(t,r),s=n.length>0&&aF(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${_t(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${_t(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${_t(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${_t(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${_t(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${_t(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var JF,XF=l(()=>{"use strict";JF=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var YF,Yee,Rh,rt,Eh,dv=l(()=>{"use strict";W();Re();XF();Jf();qt();Ch();YF=["Generalize","Evaluate","Separate","Optimize modules"],Yee=e=>{let t=$t(e),r=t>=0&&t<YF.length?YF[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},Rh=(e,t)=>{let r=ts(e),o=r===null?null:JF(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},rt=(e,t)=>({title:e,detail:t,replyPreview:null}),Eh=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=ts(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:A$(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!L(e.status)){let t=e.judgeModel;return rt(`${ce(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!L(e.status)){let t=e.judgeModel;return rt(`${ce(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===I?rt(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?rt(`${ce(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):rt(`${ce(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===I){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==I?rt(`${ce(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):rt(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return rt(`${ce(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=le(t);return rt(`${ce(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return rt(`${ce(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=le(t);return rt(`${ce(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return rt(`${ce(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===I){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return rt("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return rt(`${ce(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>bt(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=se(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||L(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?Rh(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=Vi(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?Rh(e,{title:`${Yee(r)}${s}`,detail:t.length>0?t:n}):Rh(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(L(e.status)){let t=e.errorMessage?.trim()??"";return Rh(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var Pr,wd=l(()=>{"use strict";Re();Pr=e=>{if(e.status==="improving"&&e.improverModel===I)return!0;if(e.status!=="judging"||e.judgeModel!==I)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===I}});var ZF,QF=l(()=>{"use strict";ZF=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Go,Zee,e1,t1=l(()=>{"use strict";W();Go=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zee=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Go(r)}</p>`},e1=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Go(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Go(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Go(a)}.</p>`}<pre class="mono">${Go(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${$o(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Go(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",g=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Go(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${Zee(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Go(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var kd,Qee,r1,o1=l(()=>{"use strict";W();qt();kd=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qee=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=bt(t.promptText),n=t.judgement?.reasons?`<p class="muted">${kd(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${kd(i)}.</p>`}<pre class="mono">${kd(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${$o(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${kd(d)}</pre>`:`<div class="alert-error">${kd(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${u}</article>`},r1=e=>e.revisions.map(t=>Qee(e,t)).join("")});var n1,s1=l(()=>{"use strict";W();n1=e=>{if(L(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Ar,ete,uv,tte,rte,ote,nte,i1,a1,pv=l(()=>{"use strict";s1();Ar=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ete="Stop this run? Writers will stop and the best prompt is kept.",uv="End the wizard? Writers will stop and progress from finished steps is kept.",tte="Skip this module and pause at the step gate?",rte=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Ar(ete)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Ar(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,ote=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Ar(uv)}"><input type="hidden" name="cycleId" value="${Ar(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,nte=e=>{let t=Ar(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Ar(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Ar(tte)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Ar(uv)}">End wizard</button>
    </form>
  </div>`},i1=e=>{let t=n1(e);return t==="none"?"":t==="legacy_stop"?rte(e.id):t==="wizard_end_only"?ote(e.id):nte(e)},a1=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Ar(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Ar(uv)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var l1,c1=l(()=>{"use strict";W();Hi();l1=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=se(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${is(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${is(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${le(r)}`}return""}});var ste,ite,d1,ate,u1,p1=l(()=>{"use strict";W();c1();UT();th();ih();ste=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',ite=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',d1=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ate=(e,t,r)=>{let o=Di(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=l1(e,t),i=sh(e,t),a=ste(i),c=ite(i),d=zi(e,t,{forOutcomeSummary:!0}),u=`${a}<span class="sdlc-wizard-outcome-step-title">${d1(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${d1(s)}</span>`,g=t==="wizard-4"&&r.phase==="complete"?" open":"",h=i==="failed"&&t!=="wizard-4"?" open":"",P=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${P}"${g}${h}><summary aria-controls="${P}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${P}-body">${o}</div></details>`},u1=e=>{let t=e.wizard;if(t===void 0||!L(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>ate(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var m1,g1,f1=l(()=>{"use strict";m1=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g1=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${m1(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${m1(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var mv,h1,gv=l(()=>{"use strict";mv=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,h1=(e,t)=>{if(mv(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var y1,S1=l(()=>{"use strict";y1=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var Lh,P1,A1=l(()=>{"use strict";W();gv();gv();S1();Lh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),P1=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=se(t),o=le(t),n=r.terminalStatusSuggestion==="passed"?"":y1(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],g=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,P=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",S=u===void 0?c.status:h1(u,o),y=u!==void 0&&mv(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':S==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':S==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':Lh(S);return`<tr${P}><td>${Lh(c.title)}</td><td>${Lh(g)}</td><td>${c.tokens??"\u2014"}</td><td>${y}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${Lh(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var cs,xh,fv=l(()=>{"use strict";cs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xh=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${cs(r.fileName)}</code> \u2014 ${cs(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${cs(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${cs(i.name)}</strong> <code>.cursor/skills/${cs(i.fileName)}/SKILL.md</code></p><p class="muted">${cs(i.description)}</p><p>${cs(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var lte,b1,_1=l(()=>{"use strict";W();f1();A1();fv();lte=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),b1=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!L(e.status)||t.modules.length===0)return"";let r=P1(e),o=g1(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=se(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${lte(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${xh(e)}${a}${r}${o}</section>`}});var X,Wh=l(()=>{"use strict";W();X={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var Ih,hv=l(()=>{"use strict";Ih=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var w1,k1=l(()=>{"use strict";Wh();hv();w1=e=>{let t=Ih({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:X.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var Br,Td=l(()=>{"use strict";Br=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var Gr,Oh,yv=l(()=>{"use strict";W();lh();KF();dv();wd();QF();nh();t1();o1();pv();p1();_1();Hi();k1();Ze();Td();Gr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Oh=e=>{let t=!L(e.status)&&e.status!=="wizard_paused"&&!Pr(e),r=Eh(e),o=q$(Jk(ZF(e)),e),n=L(e.status)?"":i1(e),s=u1(e),i=b1(e),a=qF(e),c=e.errorMessage===null?"":`<div class="alert-error">${Gr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?se(e.wizard):null,h=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,P=!t&&e.wizard!==void 0&&L(e.status)&&(e.wizard.phase==="complete"||se(e.wizard).passedModuleCount>0),S=P?h?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",y=P&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Gr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",p=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${Gr(r.replyPreview)}</pre>`,A=r.detail.length===0&&y.length===0&&p.length===0||r.detail.length===0&&p.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Gr(r.detail)}${u}</p>`}${p}</div>`,T=e.revisions.find(on=>on.roundNumber===e.currentRound),f=e.status==="improving"?ss(e):null,b=Ur(e),w=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),v=Pr(e)?e1({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:f?.promptText??T?.promptText??"",score:f?.score??T?.judgement?.score??null,reasons:f?.reasons??T?.judgement?.reasons??null,avoid:f?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:T?.run??null,minJudgeScore:w?1:0}):"",k=e.wizard!==void 0&&e.wizard.phase==="complete"&&L(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",E=e.wizard!==void 0&&!k&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?le(e.wizard):e.passScore,M=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${ah(E)}</div>`:"",O=e.status==="failed"?w1({status:e.status,errorKind:e.errorKind}):null,F=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':L(e.status)?O!==null?`<span class="${O.badgeClass}">${O.badgeLabel}</span>`:k&&g!==null&&!h?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",B=t?d:P?h?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',be=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Gr(gt(me(e)))}</li>`:"",b>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${is(b)} so far</li>`:""].filter(on=>on.length>0),H=be.length===0?"":`<ul class="sdlc-run-meta">${be.join("")}</ul>`,Je=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,fo=k?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,ho=k?"":M.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${fo}</div>`:`<div class="sdlc-run-grid">${fo}${M}</div>`,Zt=r1(e),IS=e.wizard!==void 0&&L(e.status)&&e.revisions.every(on=>on.roundNumber===0&&(on.judgement===void 0||on.judgement===null)),Ra=Zt.length===0||IS?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${Zt}</div></section>`,OS=`<p class="sdlc-run-goal" title="${Gr(e.goal.trim())}">${Gr(Br(e.goal))}</p>`,Xu=k?`${c}${i}${s}${v}${a}`:`${c}${ho}${v}${s}${a}`,Ws='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',g4=k?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Gr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${Ws}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${F}</div>${OS}<div class="sdlc-run-activity${S}"${P?' role="status"':""}><div class="sdlc-run-activity-icon">${B}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Gr(r.title)}</h2>${A}${y}${g4}</div></div>${H}${Je}</header>${Xu}</section>${Ra}`}});var T1,v1=l(()=>{"use strict";W();fd();T1=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Qc({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:Bo(e)}});var C1,R1=l(()=>{"use strict";W();_d();C1=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Zc(t)?e:ls({...e,wizard:{...t,gate:null}})}});var E1,L1=l(()=>{"use strict";W();gd();E1=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!ed(t.splitOptions))return e;let r=t.splitOptions[0];return Uo(e,r)}});var cte,ds,Mh=l(()=>{"use strict";v1();R1();L1();ft();cte=e=>{let t=C1(e),r=T1(t);return E1(r)},ds=(e,t)=>{let r=cte(t);return r!==t?($(e,r),r):t}});var x1,Vr,vd=l(()=>{"use strict";W();x1=e=>pt.indexOf(e),Vr=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||L(e.status)?pt.length:t.gate!==null?x1(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?x1(t.phase):null}});var W1,I1=l(()=>{"use strict";W1=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var us,O1,M1=l(()=>{"use strict";W();I1();us=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),O1=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Xn(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${us(W1(o))}</pre></div>`:"",s=Zn(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=Dr(t),a=s.map(c=>{let d=t.variables.find(S=>S.name===c),u=Uf(c),g=i[c]??"",h=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,P=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${us(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${us(u)}">${us(h)}</label>
        ${P}
        <input class="input" type="text" id="${us(u)}" name="${us(u)}" value="${us(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var N1,j1=l(()=>{"use strict";N1={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var Cd,dte,ge,Vo=l(()=>{"use strict";j1();Fo();Cd=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dte=e=>{let t=N1[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Cd(t.title)}" aria-describedby="${r}" aria-expanded="false">${et}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Cd(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Cd(t.example)}</span></span></button>`},ge=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Cd(r)}"`}>${Cd(e)}</span>${dte(t)}</span>`});var wt,D1,z1,H1=l(()=>{"use strict";W();md();Wh();Vo();wt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),D1=e=>{let t=e.costControls;if(t===void 0||Ni(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??mt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${wt(X.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${wt(t.softWarnMessage??Qn)}</p>`:"",d=hh({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${wt(X.estimateOverCeilingWarn)}</p>`:"",u=e.wizard?.modules.length??0,g=u>0?`<p class="muted">Step 4 will optimize ${u} module${u===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${wt(X.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${wt(X.confirmLede)}</p>
  ${g}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${wt(Ii)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${wt(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${wt(X.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${wt(X.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${wt(X.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${ge(X.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${ge(X.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${wt(X.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${wt(X.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},z1=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!Ni(r)}});var ute,$1,F1=l(()=>{"use strict";Fo();ute=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$1=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${et}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${ute(t)}</pre></template>`}});var Rd,U1,B1=l(()=>{"use strict";W();LT();M1();NT();pv();fv();zT();H1();F1();Rd=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),U1=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(z1(e))return D1(e);let n=le(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?x$(r):"",a=o==="evaluate"?xh(e):"",c=o==="evaluate"?ji({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(E=>{let M=E.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',O=E.recommended?' <span class="sdlc-badge">Recommended</span>':"",F=r.selectedSplitOptionId===E.id||r.selectedSplitOptionId===null&&E.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${Rd(E.id)}" required${F}> <strong>${Rd(E.title)}</strong>${M}${O}</label>${Qf(e,E)}</li>`}).join("")}</ul>`:"",g=r.modules[r.currentModuleIndex],P=o==="optimize_modules"&&g?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",S=g?.title??"Module",y=g?.prompt??"",p=g?.status==="pending",A=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Rd(S)}</p>${p?O1({cycle:e,modulePrompt:y}):""}<p class="muted">Test run prompt preview: ${Rd(Yn(y,Dr(r)))}</p>${g?.statistics===null||g?.statistics===void 0?"":`<p class="muted">Module stats: best ${g.statistics.bestScore??"\u2014"} / \u2265${n} (round ${g.statistics.bestRound??"\u2014"}).</p>`}${ji({cycle:e,interactive:!1,caption:p?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${S}\u201D (runner + judge).`})}`:"",T=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":p?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",f=Yc(r),b=f===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${f}</p>`,w=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?$1(r.lastWriterParseFailureReply??""):"",v=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",k=t?.active===!0?" sdlc-wizard-gate-active":"",x=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${v}"`:"";return`<section class="card sdlc-wizard-gate${k}"${x}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${T}</p>
    ${w}
    ${b}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Rd(e.id)}">
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
        <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue"${P}>Continue</button>
        <button class="btn btn-secondary" type="submit" name="intent" value="wizard-feedback-rerun" formnovalidate>Rerun with feedback</button>
      </div>
    </form>
    ${a1(e)}
  </section>`}});var pte,G1,V1=l(()=>{"use strict";W();ih();pte=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),G1=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||L(e.status))return"";let r=(o,n)=>{let s=zi(e,o);return`<h2 class="sdlc-wizard-active-head">${pte(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var Sv,q1,K1,qo,J1,qi=l(()=>{"use strict";W();ft();Sv=new Map,q1=e=>{let t=new AbortController;return Sv.set(e,t),t.signal},K1=e=>{Sv.delete(e)},qo=e=>{Sv.get(e)?.abort()},J1=(e,t)=>{let r=Z(e,t);return r===null||r.wizard!==void 0?!1:(L(r.status)||($(e,{...r,status:"stopped",errorMessage:qn,updatedAt:new Date().toISOString()}),qo(t)),!0)}});var X1,Y1,Pv,Z1,Av=l(()=>{"use strict";W();vd();qi();X1="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",Y1=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return pt[r]??null},Pv=(e,t)=>{let r=Y1(t);if(r===null||e.wizard===void 0)return!1;let o=pt.indexOf(r);if(o===-1)return!1;let n=Vr(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<pt.length)},Z1=(e,t)=>{let r=Y1(t);if(r===null||e.wizard===void 0||!Pv(e,t))return e;qo(e.id);let o=pt.slice(pt.indexOf(r)),n=Vc(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var bv,Q1,eU=l(()=>{"use strict";Av();bv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Q1=(e,t)=>Pv(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${bv(X1)}"><input type="hidden" name="cycleId" value="${bv(e.id)}"><input type="hidden" name="wizardStepId" value="${bv(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var mte,tU,gte,rU,oU=l(()=>{"use strict";W();vd();B1();V1();eU();th();mte={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},tU=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gte=(e,t,r)=>{let o=Q1(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${tU(t)}">
  <summary class="sdlc-wizard-accordion-summary">${tU(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${Di(e,t)}</div>
</details>`},rU=e=>{let t=e.wizard;if(t===void 0)return"";let r=Vr(e);if(r===null)return"";let o=pt.slice(0,r).map((i,a)=>gte(e,`wizard-${a+1}`,mte[i])),n=t.gate!==null?U1(e,{active:!0}):G1(e),s=r>=pt.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var Nh,_v=l(()=>{"use strict";oU();DT();W();Nh=e=>{if(e===null||e.wizard!==void 0&&L(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=rU(e),r=N$(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var fte,wv,nU=l(()=>{"use strict";W();Re();Ze();as();fte=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},wv=async(e,t,r)=>{if(!fte(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===I)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=sT({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await tt({writerAgent:e.judgeModel,prompt:n,workingDirectory:me(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=aT(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var Ed,jh,sU,kv,iU,aU,lU,Dh,Tv=l(()=>{"use strict";Ed=m(require("node:fs")),jh=m(require("node:path")),sU=e=>jh.default.join(jh.default.dirname(e),"prompt-optimizer-writer-ready.json"),kv=e=>{let t=sU(e);if(!Ed.default.existsSync(t))return{};try{let r=JSON.parse(Ed.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},iU=(e,t)=>{Ed.default.mkdirSync(jh.default.dirname(e),{recursive:!0}),Ed.default.writeFileSync(sU(e),`${JSON.stringify(t,null,2)}
`)},aU=(e,t)=>kv(e)[t]?.message??null,lU=(e,t,r)=>{iU(e,{...kv(e),[t]:{message:r}})},Dh=(e,t)=>{let r=kv(e);r[t]!==void 0&&iU(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var vv,zh,Hh,cU,Ee,ps=l(()=>{"use strict";W();qT();_d();nU();wd();qi();Tv();Mh();ft();vv=new Set,zh={atMs:0,ids:[]},Hh=async()=>{if(Date.now()-zh.atMs<3e4)return zh.ids;let e=await Ht({commands:Pe({})});return zh.atMs=Date.now(),zh.ids=e.installedWriterIds,e.installedWriterIds},cU=async(e,t,r)=>{let o=Z(e,t);if(o===null||r.aborted)return;let n=ds(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(L(n.status)&&!s||n.status==="wizard_paused"||Pr(n))return;if(s){let c=await wv(n,r,d=>{Dh(e,d)});$(e,c);return}let i=await VF(n,c=>{Dh(e,c)},r,c=>{Z(e,t)?.status==="stopped"||r.aborted||$(e,c)});if(!(Z(e,t)?.status==="stopped"||r.aborted)){if($(e,i),L(i.status)){let c=await wv(i,r,d=>{Dh(e,d)});$(e,c);return}await cU(e,t,r)}},Ee=(e,t)=>{if(vv.has(t))return;let r=Z(e,t);if(r===null)return;let o=ds(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(L(o.status)&&!n||o.status==="wizard_paused"||Pr(o))return;vv.add(t);let s=q1(t);cU(e,t,s).finally(()=>{vv.delete(t),K1(t)})}});var Ko,Ld=l(()=>{"use strict";yv();Mh();_v();ps();Ko=(e,t)=>{let r=ds(e,t);return Ee(e,r.id),`${Oh(r)}${Nh(r)}`}});var dU,uU,pU=l(()=>{"use strict";dU=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,uU=e=>e!==null&&e>0});var hte,yte,Ste,mU,gU=l(()=>{"use strict";W();_d();vh();gd();fd();qi();rh();rh();hte=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),yte=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ue(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},Ste=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=se(o);return Gi({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},mU=(e,t)=>{if(!ud(e,t))return e;qo(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return ls({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Bo(yte(r));if(t==="wizard-3"){let n=o.splitOptions[0]??hte(o.templatedPrompt);return Uo(r,n)}return t==="wizard-4"?Ste(r):e}});var $h,fU,Cv=l(()=>{"use strict";W();vh();qi();$h=e=>(qo(e.id),{...Gi(e,"stopped"),errorMessage:Wk}),fU=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;qo(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var Pte,hU,yU,SU=l(()=>{"use strict";W();_d();vh();gd();fd();Ld();ft();ps();pU();Av();gU();Cv();Pte="Pick a revision scored above 0 before continuing to Separate.",hU=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),yU=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=Z(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=Z(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Ko(e.storePath,d))};if(o==="wizard-stop-all"){let c=$h(s);return $(e.storePath,c),Ee(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=fU(s);return $(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=Z1(s,c);return $(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=mU(s,c);return $(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&Ee(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",g=Qk(s.wizard,d,c);g=Vc(g,d),g={...g,pendingStepInstructions:u};let h={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return $(e.storePath,h),Ee(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(h=>h.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?hU(s):ls({...s,wizard:{...s.wizard,gate:null}});return $(e.storePath,g),Ee(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=dU(s,u??-1);if(!uU(g)){let P={...s,errorMessage:Pte,updatedAt:new Date().toISOString()};return $(e.storePath,P),a(n),!0}let h=Bo({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return $(e.storePath,h),Ee(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let P=hU(s);return $(e.storePath,P),Ee(e.storePath,n),a(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(P=>P.id===u);if(g===void 0){let P={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return $(e.storePath,P),a(n),!0}let h=Uo(s,g);return $(e.storePath,h),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,g=d.modules[u];if(g===void 0)return a(n),!0;if(!Ni(s.costControls)){let p=t.get("confirmedTokenBudget")?.trim()??"",A=t.get("confirmedMaxSpendUsd")?.trim()??"";if(p.length===0){let f={...s,errorMessage:Ii,updatedAt:new Date().toISOString()};return $(e.storePath,f),a(n),!0}let T=$r({existing:s.costControls,confirmedTokenBudget:Number(p),confirmedMaxSpendUsd:A.length===0?null:Number(A),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!T.ok){let f={...s,errorMessage:T.errorMessage,updatedAt:new Date().toISOString()};return $(e.storePath,f),a(n),!0}s={...s,costControls:T.costControls,errorMessage:null,updatedAt:new Date().toISOString()},$(e.storePath,s)}let h=ST({wizard:d,modulePrompt:g.prompt,posted:t});if(!h.ok){let p={...s,errorMessage:h.errorMessage,updatedAt:new Date().toISOString()};return $(e.storePath,p),a(n),!0}let P={...d,parameterValues:h.parameterValues};if(g.status==="pending"){let p=GF({...s,wizard:{...P,gate:null}},u);return $(e.storePath,p),Ee(e.storePath,n),a(n),!0}let S=u+1;if(S>=d.modules.length){let p=se(P),A=Gi({...s,wizard:P},p.terminalStatusSuggestion);return $(e.storePath,A),Ee(e.storePath,n),a(n),!0}let y={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...P,gate:"optimize_modules",currentModuleIndex:S},updatedAt:new Date().toISOString()};return $(e.storePath,y),a(n),!0}}return a(n),!0}});var Ate,PU,bte,Rv,_te,AU,bU=l(()=>{"use strict";Re();qi();Cv();tv();Sh();wd();ft();Ate="Add a score from 0 to 100 and the reason for it.",PU="Add a score from 1 to 100 and the reason for it.",bte="Write the next prompt.",Rv="This step is not waiting for you.",_te=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},AU=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=Z(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?($(e.storePath,$h(a)),{kind:"saved",cycleId:i}):J1(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=Z(e.storePath,r);if(o===null||!Pr(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:Rv};if(t==="manual-judge"){if(o.judgeModel!==I)return{kind:"invalid",cycle:o,errorMessage:Rv};let i=_te(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?PU:Ate};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:PU};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",u=Ph(Pd(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return $(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==I)return{kind:"invalid",cycle:o,errorMessage:Rv};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:bte};let s=yh(o,n);return $(e.storePath,s),{kind:"saved",cycleId:o.id}}});var _U,wU=l(()=>{"use strict";_U=`<script>
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
</script>`});var kU,TU=l(()=>{"use strict";kU=`<script>
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
</script>`});var vU,CU=l(()=>{"use strict";vU=`<script>
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
</script>`});var RU,EU=l(()=>{"use strict";RU=`<script>
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
</script>`});var LU,xU=l(()=>{"use strict";W();Ze();LU=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:gt(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(le(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!L(t.status)}}});var WU,IU=l(()=>{"use strict";WU=`<script>
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
</script>`});var OU,MU=l(()=>{"use strict";W();vd();Ch();OU=e=>{let t=Vi(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:L(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=Vr(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=se(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=se(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return L(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var NU,jU=l(()=>{"use strict";NU=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var qr,wte,kte,DU,zU=l(()=>{"use strict";MU();jU();Td();qr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wte=e=>e.wizard===void 0?"legacy":"wizard",kte=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${qr(t)}">`,o=OU(e),n=NU(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${qr(o.badgeClass)}">${qr(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${qr(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${qr(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${wte(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${qr(e.id)}">${qr(Br(e.goal))}</a><p class="muted">${qr(a)}</p></div></div><div class="sdlc-history-row-actions">${u}${g}</div></li>`},DU=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>kte(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${qr(s)}</summary>${i}</details>`:i}});var Ev,Fh,HU,Tte,vte,xd,$U,Uh=l(()=>{"use strict";Ev=m(require("node:fs")),Fh=m(require("node:path"));Ze();HU=/^[a-z0-9-]+$/,Tte=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},vte=(e,t)=>{if(!HU.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let g=Tte(u[2]??"");u[1]==="name"&&g.length>0&&(o=g),u[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},xd=e=>{let t=Fr(e);if(!t.ok)return[];let r=Fh.default.resolve(t.path,".cursor","skills"),o=[];try{o=Ev.default.readdirSync(r)}catch{return[]}return o.filter(n=>HU.test(n)).flatMap(n=>{let s=Fh.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${Fh.default.sep}`))return[];try{let i=vte(Ev.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},$U=(e,t)=>xd(e).find(r=>r.fileName===t)??null});var FU,Cte,UU,BU,GU=l(()=>{"use strict";Vo();FU=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Cte=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),UU=e=>{if(e.length===0)return`<div class="field">${ge("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${FU(r.fileName)}">${FU(r.fileName)}</option>`).join("");return`<div class="field">${ge("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${Cte(e)}</script>`},BU=`<script>
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
</script>`});var ot,VU,qU=l(()=>{"use strict";W();Wh();md();Vo();ot=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),VU=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=ot(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=Mi({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??Hr(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),g=hh({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",h=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${ot(X.knobsSectionTitle)}</p>
  <p class="muted">${ot(X.knobsSectionLede)}</p>
  <div class="field">
    ${ge(X.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${ge(X.maxSpendUsdLabel,"maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${o}" placeholder="Optional" data-sdlc-max-spend-usd>
    <p class="muted">${ot(X.autoConfirmHint)}</p>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${n}>
      <span>${ot(X.earlyStopLabel)}</span>
    </label>
    <p class="muted">${ot(X.earlyStopHint)}</p>
  </div>
  <div class="sdlc-cost-estimate" data-sdlc-cost-estimate>
    <p class="sdlc-block-title">${ot(X.estimateSectionTitle)}</p>
    <p class="muted">${ot(X.estimateSectionLede)}</p>
    <dl class="sdlc-cost-proposal sdlc-cost-estimate-proposal">
      <div><dt>${ot(X.targetTokenLabel)}</dt><dd data-sdlc-target-tokens data-sdlc-proposed-tokens>${a.targetTokenBudget.toLocaleString("en-US")}</dd></div>
      <div><dt>${ot(X.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${a.estimatedSpendUsd.toFixed(4)}</dd></div>
      <div><dt>${ot(X.rateChipLabel)}</dt><dd><span class="sdlc-cost-rate-chip" data-sdlc-writer-rate-chip data-writer-id="${ot(h)}">$${c.toFixed(4)} / 1k \xB7 ${ot(h)}</span></dd></div>
    </dl>
    <input type="hidden" name="targetTokenBudget" value="${a.targetTokenBudget}" data-sdlc-target-token-budget-input>
    <input type="hidden" name="estimatedSpendUsd" value="${a.estimatedSpendUsd}" data-sdlc-estimated-spend-input>
    <input type="hidden" name="rateUsdPer1kTokens" value="${c}" data-sdlc-cost-rate>
    <p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling${g}>${ot(X.estimateOverCeilingWarn)}</p>
  </div>
</div>`}});var Ke,KU,JU,Rte,XU,YU,ZU,QU=l(()=>{"use strict";W();dv();Re();Td();vd();Ke=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),KU=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",JU=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,Rte=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},XU=e=>e===I?"You":ce(e),YU=e=>{let t=Rte(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ce(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Ke(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Ke(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Ke(XU(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Ke(XU(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Ke(r)}</dd></div>
    </dl>
  </details>`},ZU=e=>{let t=e.wizard;if(t===void 0)return"";let r=Br(e.goal),o=e.status==="wizard_paused",n=!L(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=Eh(e),g=JU(t),h=g===null?"":KU(g),P=Vr(e),S=h.length===0?"":P===null||P>=4?` <strong>${Ke(h)}</strong>`:` <strong>${Ke(h)}</strong> (step ${P+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Ke(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Ke(u.title)}${S}</p>
    <p class="muted">${Ke(u.detail)}</p>
    <div class="actions">
      ${YU(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ke(e.id)}">Open this run</a>
    </div>
  </section>`}let s=JU(t),i=s===null?"Wizard":KU(s),a=Vr(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ke(r)}</h2>
    <p class="lede">Paused at <strong>${Ke(i)}</strong>${Ke(c)} (last updated ${Ke(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${YU(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ke(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Wd,eB,tB=l(()=>{"use strict";Vo();Wd=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eB=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${Wd(n.id)}"${n.id===e.runner?" selected":""}>${Wd(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Wd(e.runner)}">Checking ${Wd(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${ge("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${ge("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Wd(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var rB,oB=l(()=>{"use strict";rB=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var Ki,nB,sB,iB,aB,lB=l(()=>{"use strict";Vo();Ki=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nB=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${Ki(c.id)}"${c.id===r?" selected":""}>${Ki(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Ki(n)}</option>`;return`<div class="field">${ge(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},sB=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Ki(t)}">Checking ${Ki(o)}\u2026</p>`},iB=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${ge(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Ki(r)}</textarea><span class="muted">${o}</span></div></details>`,aB=e=>{let t=`<div class="sdlc-writer">${nB("judge","Judge",e.judge,e.writers,"I'll score it")}${sB("judge",e.judge,e.writers)}${iB("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${nB("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${sB("improver",e.improver,e.writers)}${iB("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var cB,dB=l(()=>{"use strict";cB=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var Lv,uB,pB=l(()=>{"use strict";dB();Lv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uB=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${cB.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${Lv(t.goal)}" title="${Lv(t.goal)}">${Lv(t.label)}</button>`).join("")}</div>`});var Id,Ete,Lte,xv,mB=l(()=>{"use strict";W();Vo();Id=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ete=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},Lte=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,xv=e=>{let t=Ete(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=Hc(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${ge(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${Id(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${Id(e.inputId)}" class="sdlc-pass-range" type="range" name="${Id(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${Id(a)}"><span class="sdlc-pass-mark" style="left:${Lte(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${Id(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var Wte,Wv,Kr,gB,fB=l(()=>{"use strict";wd();yv();wU();TU();lh();CU();EU();xU();IU();zU();Uh();GU();Vo();_v();qU();QU();Td();tB();oB();lB();W();pB();mB();Wte=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Wv='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',Kr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gB=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Kr(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Kr(e.skillNotice??"")}</div>`,o=`${K$}${J$}`,n=e.resumableWizardCycle??null,s=n===null?"":ZU(n),i=Nh(e.cycle),a=e.cycle===null?"":Oh(e.cycle),c=e.cycle!==null&&Pr(e.cycle),d=LU(e),u=Wte(d.goal,d.prompt,e.canRun),g=aB({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),h=eB({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),P=`${xv({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${xv({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,S=VU({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),y=Yk,p=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",A=e.cycle!==null&&L(e.cycle.status),T=d.running&&!A,f=A||T?"":" open",b=T?" sdlc-compose-run-focus":"",v=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${A?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,k=A?(()=>{let H=e.cycle!==null?Br(e.cycle.goal):Br(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Kr(H)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${v}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${v}</summary>`,x=A?" sdlc-compose-viewing-finished":"",E=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",M=c?"waiting":d.running?"running":"idle",O=d.running&&!c?' aria-busy="true"':"",F=`<section class="card sdlc-compose${x}${b}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${f}>
        ${k}
        <div class="sdlc-compose-details-body">
      <p class="lede">${y} ${Kr(e.modelNote)}</p>
        <ol class="sdlc-compose-stepper" aria-label="Compose steps" data-sdlc-compose-stepper>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="1" aria-current="step"><span class="sdlc-compose-stepper-index">1</span><span class="sdlc-compose-stepper-label">Project</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="2"><span class="sdlc-compose-stepper-index">2</span><span class="sdlc-compose-stepper-label">Prompt and goal</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="3"><span class="sdlc-compose-stepper-index">3</span><span class="sdlc-compose-stepper-label">CLI</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="4"><span class="sdlc-compose-stepper-index">4</span><span class="sdlc-compose-stepper-label">Summary</span></li>
        </ol>
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${p}
        <p class="alert-error sdlc-compose-step-error" data-sdlc-compose-step-error hidden role="alert"></p>
        <div class="sdlc-compose-step" data-sdlc-compose-step="1" id="sdlc-compose-step-1">
          <h3 class="sdlc-compose-step-title">Project</h3>
          <p class="muted sdlc-compose-step-lede">Choose the folder writers run in and optionally load a skill into the prompt on the next step.</p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="sdlc-folder">
          <div class="field">
            ${ge("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Kr(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${UU(xd(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${Wv}
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <input type="hidden" name="orchestratorSkillFile" value="" data-orchestrator-skill-file>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <p class="muted sdlc-compose-orchestrator-note" data-orchestrator-skill-note hidden></p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${ge("Goal","goal")}
            ${uB()}
            <textarea class="input textarea" name="goal" rows="4" required>${Kr(d.goal)}</textarea>
          </div>
          <div class="field">
            ${ge("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Kr(d.prompt)}</textarea>
          </div>
          ${P}
          ${S}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${Wv}
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
        ${h}
        ${rB()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${Wv}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${Kr(d.passScore)}; Step 4 pass \u2265 ${Kr(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${M}" data-can-run="${u?"true":"false"}"${O}${d.running?" disabled":""}>${E}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,B=e.history.length>0?WU:"",be=`${""}${RU}${_U}${kU}${vU}${BU}${B}`;return`${t}${r}${F}${s}${a}${i}${o}${DU(e.history,e.cycle?.id??null)}${be}`}});var Od,Iv=l(()=>{"use strict";fB();Od=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:gB(t)}))}});var hB,yB=l(()=>{"use strict";bU();Ld();Iv();ft();ps();hB=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:AU({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=Z(e.storePath,o.cycleId);return Ee(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(Ko(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Od(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:yr(e.storePath),resumableWizardCycle:null}),!0)}});var SB,Bh,Ov=l(()=>{"use strict";W();SB=m(require("node:os")),Bh=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??SB.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??Vt()}}});var PB,Ji,Mv,AB,bB,Md=l(()=>{"use strict";W();Re();BT();PB=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Ji=e=>{let t=_$(e),r=rs(e).map(s=>({id:s,label:Xf[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},Mv=(e,t,r)=>t===I||t!==null&&e.writers.some(o=>o.id===t)?t:r,AB=(e,t,r,o=null)=>({judge:Mv(e,t,e.judge),improver:Mv(e,r,e.improver),runner:Mv(e,o,e.runner)}),bB=e=>e===ch?{goal:dh,prompt:uh}:{goal:"",prompt:""}});var Nv,_B=l(()=>{"use strict";Nv=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var wB,Ite,kB,TB,vB,CB=l(()=>{"use strict";W();wB=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},Ite=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},kB=(e,t)=>e.has("earlyStop")?!0:t!=="run",TB=e=>{let t=wB(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=Ite(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=wB(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},vB=e=>Vt(e)});var RB,EB,Gh,jv=l(()=>{"use strict";W();Re();Ze();Md();_B();CB();RB=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=Nv(o);return n.ok?String(n.passScore):String(r)},EB=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return Nv(n)},Gh=e=>{let t=AB(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=RB(e.posted,"passScore",70),o=RB(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",g=e.posted?.get("intent")??"",h=e.posted===null?!0:kB(e.posted,g),P=(k,x)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:k,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:x,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:u,earlyStop:h});if(e.posted===null)return P(e.defaultFolder??os,null);let S=e.posted.get("folder")??os;if(e.posted.get("intent")==="choose-folder"){let k=e.pickFolder();return P(k===null?S:gt(k),null)}if((e.posted.get("intent")??"")!=="run")return P(S,null);let p=PB(e.goal,e.prompt);if(p!==null)return P(S,p);let A=EB(e.posted,"passScore",r);if(!A.ok)return P(S,A.errorMessage);let T=EB(e.posted,"modulePassScore",o);if(!T.ok)return P(S,T.errorMessage);let f=w$(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(f===null)return P(S,"Choose a judge and an improver.");let b=Fr(S);if(!b.ok)return P(S,b.errorMessage);let w=k$(e.installedIds,c,f.judge);if(w===null)return P(S,"Choose a runner for wizard step 4.");let v=TB({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return v.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:f.judge,improver:f.improver,workingDirectory:b.path,passScore:A.passScore,modulePassScore:T.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:w,runnerInstructions:a,costControls:vB(v.knobs)}:P(S,v.errorMessage)}});var Xi,qh,Ote,Dv,LB,Vh,xB,Mte,WB,zv,Nte,jte,Dte,Hv,IB,OB,MB=l(()=>{"use strict";Xi=m(require("node:fs")),qh=m(require("node:path"));Re();Ze();Ote=["remember","choose-folder","run"],Dv=()=>({folder:os,judge:"",improver:"",runner:""}),LB=e=>qh.default.join(qh.default.dirname(e),"prompt-optimizer-preferences.json"),Vh=e=>typeof e=="string"?e:"",xB=e=>{let t=LB(e);if(!Xi.default.existsSync(t))return Dv();try{let r=JSON.parse(Xi.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return Dv();let o=r,n=Vh(o.folder).trim();return{folder:n.length===0?os:n,judge:Vh(o.judge),improver:Vh(o.improver),runner:Vh(o.runner)}}catch{return Dv()}},Mte=(e,t)=>{let r=LB(e);Xi.default.mkdirSync(qh.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;Xi.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),Xi.default.renameSync(o,r)},WB=(e,t)=>e===I||rs(t).some(r=>r===e),zv=(e,t,r)=>e===null?t:e.length===0?"":WB(e,r)?e:t,Nte=(e,t)=>{if(e===null)return t;let r=Fr(e);return r.ok?r.display:t},jte=e=>{let t=xB(e.storePath),r={folder:Nte(e.folder,t.folder),judge:zv(e.judge,t.judge,e.installedIds),improver:zv(e.improver,t.improver,e.installedIds),runner:zv(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||Mte(e.storePath,r)},Dte=e=>{let t=Fr(e);return t.ok?t.display:os},Hv=(e,t)=>WB(e,t)?e:"",IB=e=>{let t=xB(e.storePath);return{selection:{...e.selection,judge:Hv(t.judge,e.installedIds)||e.selection.judge,improver:Hv(t.improver,e.installedIds)||e.selection.improver,runner:Hv(t.runner,e.installedIds)||e.selection.runner},defaultFolder:Dte(t.folder)}},OB=e=>{let t=e.posted.get("intent")??"";if(!Ote.includes(t))return;let r=e.posted.get("folder");jte({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var NB,zte,Hte,$v,$te,Kh,Jh=l(()=>{"use strict";NB=m(require("node:os"));Re();Tv();as();zte="Reply with the single word ok. Do not use tools.",Hte=45e3,$v=async(e,t)=>{if(t===I)return{ok:!0,message:"You will do this step."};let r=aU(e,t);if(r!==null)return{ok:!0,message:r};let o=await tt({writerAgent:t,prompt:zte,workingDirectory:NB.default.tmpdir(),timeoutMs:Hte});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ce(t)} is ready.`;return lU(e,t,n),{ok:!0,message:n}},$te=e=>[...new Set(e.filter(t=>t.length>0))],Kh=async(e,t,r,o)=>{for(let n of $te([t,r,o??""])){let s=await $v(e,n);if(!s.ok)return s.message}return null}});var Fv,jB=l(()=>{"use strict";W();Fv=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!L(r.status)&&!(t!==null&&r.id===t))return r;return null}});var DB,zB=l(()=>{"use strict";Dt();W();md();Ld();Ov();jv();Iv();ft();Ze();MB();Uh();Jh();jB();Mh();ps();DB=async e=>{let t=e.posted===null?IB({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Gh({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>jo("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(OB({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?gt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await Kh(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await Od(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:gt(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:yr(e.route.storePath),resumableWizardCycle:Fv(yr(e.route.storePath),null)});return}if(r.kind==="start"){let s=$U(r.workingDirectory,r.sourceSkillFile),i=fh(id({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=Bh({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:cT({...Gc(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if($(e.route.storePath,a),Ee(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(Ko(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:Z(e.route.storePath,e.cycleId);n!==null&&(n=ds(e.route.storePath,n),Ee(e.route.storePath,n.id)),await Od(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:yr(e.route.storePath),resumableWizardCycle:Fv(yr(e.route.storePath),n?.id??null)})}});var HB,$B=l(()=>{"use strict";ft();HB=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";nF(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var FB,UB=l(()=>{"use strict";FB=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var BB,GB=l(()=>{"use strict";uF();SU();yB();zB();$B();Md();UB();ps();BB=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await Hh(),o=Ji(r),n=e.method==="POST"?FB(e.request.headers["content-type"],await e.readBody(e.request)):null;if(yU({posted:n,storePath:e.storePath,response:e.response})||await hB(e,n,o))return;let s=bB(t.searchParams.get("example")),i=HB({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=dF({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await DB({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:cF(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var Fte,VB,qB=l(()=>{"use strict";W();ft();Fte=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",VB=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=Z(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!L(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=dT({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${Fte(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var KB,JB=l(()=>{"use strict";Ld();ft();KB=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:Z(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":Ko(e.storePath,o)),!0}});var Ute,XB,YB=l(()=>{"use strict";Re();Jh();Ute=["claude-cli","codex","cursor","antigravity"],XB=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===I||Ute.includes(t)?await $v(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var ZB,QB=l(()=>{"use strict";W();ZB=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:Fc,page:Uc,context:Li,installedWriters:e,post:{method:"POST",url:Fc,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${Fc}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var Xh,eG=l(()=>{"use strict";W();hv();Hi();Xh=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ue(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=L(e.status),n=e.errorKind??null,s=Ih({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:Ur(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:Li,page:`${Uc}?cycle=${encodeURIComponent(e.id)}`}}});var q,Bte,tG,rG,oG=l(()=>{"use strict";q=m(Ds());W();Bte=(0,q.isType)({goal:q.isString,prompt:q.isString,workingDirectory:q.isString,judge:(0,q.isUndefinedOr)(q.isString),improver:(0,q.isUndefinedOr)(q.isString),passScore:(0,q.isUndefinedOr)(q.isNumber),maxRounds:(0,q.isUndefinedOr)(q.isNumber),maxTrials:(0,q.isUndefinedOr)(q.isNumber),maxSpendUsd:(0,q.isUndefinedOr)(q.isNumber),earlyStop:(0,q.isUndefinedOr)(q.isBoolean),earlyStopFlatRounds:(0,q.isUndefinedOr)(q.isNumber),confirmedTokenBudget:(0,q.isUndefinedOr)(q.isNumber),confirmedMaxSpendUsd:(0,q.isUndefinedOr)(q.isNumber),rateUsdPer1kTokens:(0,q.isUndefinedOr)(q.isNumber)}),tG=e=>{let t=e?.trim()??"";return t.length===0?null:t},rG=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return Bte(t)?t.workingDirectory.trim().length===0?{ok:!1,error:Nf}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:tG(t.judge),improver:tG(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:Nf}}});var Jr,Gte,nG,sG,iG=l(()=>{"use strict";W();Jr=m(Ds()),Gte=(0,Jr.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:Jr.isNumber,confirmedMaxSpendUsd:(0,Jr.isUndefinedOr)(Jr.isNumber),rateUsdPer1kTokens:(0,Jr.isUndefinedOr)(Jr.isNumber)}),nG=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:Gte(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},sG=(e,t)=>{let r=$r({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var Vte,aG,lG=l(()=>{"use strict";W();Re();jv();Md();Vte=e=>e.map(t=>t.id).join(", "),aG=e=>{let t=Ji(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===I||n===I)return{ok:!1,error:Xk,installedWriters:t.writers};if(o===null||n===null){let a=Vte(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=Gh({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var qte,cG,dG=l(()=>{"use strict";W();Ov();QB();eG();Md();oG();iG();lG();ft();qte=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},cG=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let u=Z(e.storePath,t);return u===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:Xh(u)}}let r=await e.handlers.readInstalledIds(),o=Ji(r);if(e.method==="GET")return{status:200,body:ZB(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let u=nG(e.rawBody);if(u.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(u.kind==="invalid")return{status:400,body:{ok:!1,error:u.error}};let g=Z(e.storePath,t);if(g===null)return{status:404,body:{ok:!1,error:"That run is not on this Mac."}};let h=sG(g,u.body);return h.ok?($(e.storePath,h.cycle),{status:200,body:Xh(h.cycle)}):{status:400,body:{ok:!1,error:h.error}}}let n=qte(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let u=Mi({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:u.targetTokenBudget,proposedTokenBudget:u.targetTokenBudget,estimatedSpendUsd:u.estimatedSpendUsd,rateUsdPer1kTokens:u.rateUsdPer1kTokens??null,proposalStub:u.stub===!0,confirmationRequired:!0}}}let s=rG(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=aG({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=id({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:mt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let u=$r({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!u.ok)return{status:400,body:{ok:!1,error:u.errorMessage}};c=u.costControls}let d=Bh({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:Gc(i.prompt),runnerModel:i.runner,costControls:c});return $(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:Xh(d)}}});var uG,pG=l(()=>{"use strict";ps();Jh();dG();uG=async e=>{let t=await cG({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:Hh,readWritersReady:Kh,startCycle:Ee}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var gG,Kte,Jte,mG,Xte,fG,hG=l(()=>{"use strict";gG=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],Kte=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},Jte=e=>{let t={};for(let n of e)for(let s of new Set(gG(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},mG=(e,t)=>{let r=Kte(gG(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},Xte=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},fG=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=Jte(e.map(i=>i.text)),s=mG(o,n);return e.map(i=>({id:i.id,score:Xte(s,mG(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var Uv,Yte,Zte,yG,Qte,ere,tre,rre,Bv,Gv=l(()=>{"use strict";Uv=m(require("node:path"));Ze();hG();Uh();Yte=5,Zte=20,yG=280,Qte=e=>[e.name,e.description,e.promptText].join(`
`),ere=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=yG?t:`${t.slice(0,yG-3)}...`},tre=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),rre=e=>e===void 0||!Number.isFinite(e)?Yte:Math.min(Zte,Math.max(1,Math.floor(e))),Bv=e=>{let t=e.query.trim(),r=rre(e.limit),o=Fr(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=xd(o.path),s=fG(n.map(d=>({id:d.fileName,text:Qte(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=Uv.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:Uv.default.join(a,u.fileName,"SKILL.md"),excerpt:ere(u),source:"filesystem"}]});return{query:t,hits:c,context:tre(c)}}});var SG,PG=l(()=>{"use strict";Gv();SG=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:Bv({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var AG,bG=l(()=>{"use strict";PG();AG=async e=>{let t=SG({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var ore,Vv,_G=l(()=>{"use strict";Z$();GB();qB();JB();YB();pG();bG();ore=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},Vv=async e=>{let t=ore(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await uG(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await AG(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:Y$()})),!0):(await XB({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||VB({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||KB({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await BB(e),!0)}});var wG=l(()=>{"use strict";_G();Gv();as()});var kG,nre,Xr,qv,Kv=l(()=>{"use strict";kG=e=>{let t=JSON.parse(e);return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]},nre=e=>e===""?null:e,Xr=e=>e??"",qv=e=>({id:e.id,projectId:nre(e.project_id),symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:{kind:e.check_kind,value:e.check_value},keywords:kG(e.keywords_json),tags:kG(e.tags_json),source:e.source,hitCount:e.hit_count,lastSeenAt:e.last_seen_at,severity:e.severity})});var TG,sre,ire,Jv,Yi,Yh,Nd=l(()=>{"use strict";Kv();TG=`
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`,sre=e=>e,ire=e=>e??null,Jv=(e,t,r=t)=>sre(e.prepare(TG).all(Xr(r),Xr(t))).map(qv),Yi=(e,t,r,o=t)=>{let n=ire(e.prepare(`${TG} AND p.id = ?`).get(Xr(o),Xr(t),r));return n===null?null:qv(n)},Yh=(e,t)=>{e.prepare(`INSERT INTO pitfalls (
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
      severity = excluded.severity`).run(Xr(t.projectId),t.id,t.symptom,t.cause,t.avoidance,t.check.kind,t.check.value,JSON.stringify(t.keywords),JSON.stringify(t.tags),t.source,t.severity)}});var Zh,Xv=l(()=>{"use strict";jt();Zh=e=>e.map(t=>({id:zn(t.id),avoidance:zn(t.avoidance)}))});var Yv,vG,Qh=l(()=>{"use strict";Yv=e=>{let t=new Map;e.seeds.forEach(o=>{t.set(o.id,o)}),e.projectRows.forEach(o=>{t.set(o.id,o)});let r=[...t.values()];return e.includeRetired===!0?r:r.filter(o=>o.source!=="retired")},vG=e=>e.filter(t=>t.source!=="retired").length});var ms,CG,jd=l(()=>{"use strict";jt();Xv();Nd();Qh();ms=(e,t={})=>{let r=t.projectId??null,o=Jv(e,null,r),n=r===null||r===""?[]:Jv(e,r);return Yv({seeds:o,projectRows:n,includeRetired:t.includeRetired===!0})},CG=(e,t={})=>{let r=ms(e,t);return t.format==="bot"?{format:"bot",items:Zh(r),lines:r.map(o=>ic(o))}:{format:"full",items:r}}});var ey,Zv=l(()=>{"use strict";Nd();jd();ey=(e,t)=>{let r=t.id.trim();if(r.length===0)return null;let o=t.projectId??null;return o===null||o===""?Yi(e,null,r):ms(e,{projectId:o,includeRetired:!0}).find(s=>s.id===r)??null}});var Qv=l(()=>{"use strict"});var Jo,Zi,RG,EG,LG=l(()=>{"use strict";Jo=e=>({type:"string",description:e}),Zi={name:"check_context",description:"Match the current prompt against project pitfalls. Call on the first user message. Returns hit, miss, or none. Miss stays silent.",inputSchema:{type:"object",properties:{cwd:Jo("Absolute working directory for the current session."),message:Jo("User prompt or task text to match."),sessionId:Jo("Optional session id for first-message tracking."),projectId:Jo("Optional project id when already known.")},additionalProperties:!1}},RG={name:"get_context",description:"Compact project briefing: id, folder, and feature flags. Not a full docs dump.",inputSchema:{type:"object",properties:{cwd:Jo("Absolute working directory."),projectId:Jo("Optional project id when already known.")},additionalProperties:!1}},EG={name:"get_pitfalls",description:"List or search project pitfalls in a short bot-friendly form.",inputSchema:{type:"object",properties:{projectId:Jo("Project id."),q:Jo("Optional search text."),limit:{type:"number",description:"Max rows to return."}},additionalProperties:!1}}});var gs,xG,WG,IG=l(()=>{"use strict";gs=e=>({type:"string",description:e}),xG={name:"get_skill",description:"Read one project skill by id or search. Same idea as the cloud skill tools.",inputSchema:{type:"object",properties:{projectId:gs("Project id."),skillId:gs("Skill id when known."),q:gs("Optional search text.")},required:["projectId"],additionalProperties:!1}},WG={name:"record_outcome",description:"Record whether a tip or preflight check helped. Pitfall wins call the cloud hit route.",inputSchema:{type:"object",properties:{projectId:gs("Project id."),kind:{type:"string",description:"pitfall | preflight | other"},pitfallId:gs("Pitfall id when kind is pitfall."),preflightId:gs("Preflight check id when kind is preflight."),ok:{type:"boolean",description:"Whether the step helped."},notes:gs("Optional short note. No secret values.")},required:["projectId","kind","ok"],additionalProperties:!1}}});var OG=l(()=>{"use strict";LG();IG()});var eC,MG=l(()=>{"use strict";jt();Qv();eC=e=>{let t=Ug("Agent Witch tip \xB7 check_context",120);if(Oo(t)>=120)return t;let r=[t],o=Oo(t);for(let n of e){if(r.length-1>=4)break;let s=ic(n),i=Oo(s);if(o+i>120){if(r.length===1){let a=120-o,c=Ug(s,a);c.length>0&&(r.push(c),o+=Oo(c));continue}continue}r.push(s),o+=i}return r.join(`
`)}});var NG=l(()=>{"use strict";jt()});var ry=l(()=>{"use strict";Qv();OG();MG();NG()});var are,lre,tC,rC=l(()=>{"use strict";ry();are=e=>e.toLowerCase(),lre=(e,t)=>{let r=are(e);return t.reduce((o,n)=>{let s=n.trim().toLowerCase();return s.length===0?o:r.includes(s)?o+1:o},0)},tC=e=>{let t=e.pitfalls.map(r=>({pitfall:r,score:lre(e.text,r.keywords)})).filter(r=>r.score>0).sort((r,o)=>o.score-r.score||r.pitfall.id.localeCompare(o.pitfall.id));return t.length===0?[]:t.slice(0,4).map(r=>r.pitfall)}});var jG,DG=l(()=>{"use strict";jd();rC();jG=(e,t)=>{let r=ms(e,{projectId:t.projectId,includeRetired:!1});return tC({pitfalls:r,text:t.text})}});var oy,ny,sy,iy,ay,zd,zG=l(()=>{"use strict";jt();oy=Ae.symptom,ny=Ae.cause,sy=Ae.avoidance,iy=64,ay="token-saver.db",zd=1});var HG,Hd=l(()=>{"use strict";zG();HG=3e3});var $G,FG=l(()=>{"use strict";Hd();$G=`
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
`});var UG,BG,GG,cre,dre,VG,qG,KG=l(()=>{"use strict";UG=m(require("node:fs")),BG=m(require("node:path")),GG=require("node:sqlite");Hd();FG();cre=e=>{let t=e.prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},dre=(e,t)=>{e.prepare(`INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},VG=e=>{UG.default.mkdirSync(BG.default.dirname(e),{recursive:!0});let t=new GG.DatabaseSync(e);return t.exec(`PRAGMA busy_timeout = ${HG}`),t.exec($G),cre(t)<zd&&dre(t,zd),t},qG=e=>{e.close()}});var JG,XG,oC=l(()=>{"use strict";Kv();JG=(e,t,r,o)=>{let n=e.prepare(`INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`).get(Xr(t),r,o);return{hitCount:n.hit_count,lastSeenAt:n.last_seen_at}},XG=(e,t,r)=>{let o=e.prepare(`SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`).get(Xr(t),r);return o===void 0?{hitCount:0,lastSeenAt:null}:{hitCount:o.hit_count,lastSeenAt:o.last_seen_at}}});var YG,ZG=l(()=>{"use strict";Zv();oC();YG=(e,t)=>{let r=t.id.trim(),o=r.length===0?null:ey(e,{projectId:t.projectId,id:r});if(o===null)return{ok:!1,reason:"not_found"};let n=t.nowIso??new Date().toISOString(),s=JG(e,t.projectId,o.id,n);return{ok:!0,pitfall:{...o,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt}}}});var nC,sC,iC=l(()=>{"use strict";nC=m(require("node:path"));ke();Hd();sC=e=>e.profileEmail!==null?nC.default.join(e.installDir,We,e.profileEmail,ay):nC.default.join(e.installDir,ay)});var e2,QG=l(()=>{e2=[{id:"arch-max-lines",symptom:"ci:architecture fails at land (handler >100 / test >100 effective lines)",cause:"Max-effective-lines=100 only enforced late",avoidance:"Run `npm run ci:architecture` before tipping Arch",check:{kind:"command",value:"npm run ci:architecture"},keywords:["architecture","land","ci:architecture","max-effective","lines"],tags:["architecture","ci"]},{id:"symlink-node-modules",symptom:'Turbopack: "points out of the filesystem root"',cause:"Mac worktree with symlinked node_modules",avoidance:"APFS clone: `cp -Rc` (not symlink) into worktree",check:{kind:"id",value:"pit.symlink-node-modules"},keywords:["build","turbopack","symlink","node_modules","filesystem root"],tags:["build"]},{id:"install-bundle-clobber",symptom:"Missing/broken public/install/agent-witch/app/deps.tar.gz or agent-witch.js after build",cause:"Build overwrites install bundle artifacts",avoidance:"Restore those two paths after `build`",check:{kind:"command",value:"test -f public/install/agent-witch/app/deps.tar.gz && test -f public/install/agent-witch/app/agent-witch.js"},keywords:["build","deps.tar.gz","agent-witch.js","install bundle","clobber"],tags:["build","awi"]},{id:"stale-next",symptom:"Typecheck fails spuriously",cause:"Stale .next",avoidance:"`rm -rf .next` then typecheck",check:{kind:"id",value:"pit.stale-next"},keywords:["build","typecheck",".next","stale","turbopack"],tags:["build"]},{id:"main-moved-rebase",symptom:"FF/SHIP fails; main advanced",cause:"main moved between SHIP and FF",avoidance:"`git fetch`; pure-rebase onto new `-rN` branch; **never** force-push",check:{kind:"id",value:"pit.main-moved-rebase"},keywords:["ship","ff","push","rebase","main moved","force-push"],tags:["git"]},{id:"health-lag",symptom:"Declare done on exit 0 / HTTP 200 too early",cause:"Deploy health lags ~1\u20132 min after push",avoidance:"Poll until health `commitSha` == main tip + smoke",check:{kind:"id",value:"pf.health-matches-main"},keywords:["ship","ff","push","health","commitSha","deploy"],tags:["deploy"]},{id:"dirty-home-checkout",symptom:"Accidental reset/clean of ~/daily-magic",cause:"Home checkout left dirty",avoidance:"Use `/tmp` worktrees; never reset/clean home",check:{kind:"id",value:"pit.dirty-home-checkout"},keywords:["reset","clean","home checkout","daily-magic","worktree"],tags:["git"]},{id:"box-no-gh-auth",symptom:"Push from box fails",cause:"Box git has no GitHub auth",avoidance:"Push from the Mac",check:{kind:"id",value:"pit.box-no-gh-auth"},keywords:["ship","ff","push","box","github","auth"],tags:["git"]},{id:"ci-yml-main-only",symptom:"Expecting GH Actions on non-main push",cause:"Old ci.yml push trigger covered only main; CI being removed \u2014 gate is local suite",avoidance:"Run local `npm run ci` (or suite subset); do not wait on Actions",check:{kind:"id",value:"pit.local-suite-gate"},keywords:["ci","actions","github actions","npm run ci","main only"],tags:["ci"]},{id:"secrets-in-logs",symptom:"Secrets printed in logs/CLI",cause:"Verbose dump of env/files",avoidance:"Print existence / path / fingerprint only",check:{kind:"id",value:"pit.secrets-in-logs"},keywords:["secrets","logs","token","keypair","env","fingerprint"],tags:["secrets"]},{id:"no-prs-daily-magic",symptom:"PR windows opened in Mac Chrome",cause:"Habit from other repos",avoidance:"No PRs for daily-magic; never open PR UI",check:{kind:"id",value:"pit.no-prs"},keywords:["pr","pull request","chrome","daily-magic"],tags:["git"]}]});var pre,mre,aC,lC=l(()=>{"use strict";QG();pre=e2,mre=e=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags??[],projectId:null,source:"seed",hitCount:0,lastSeenAt:null,severity:"warn"}),aC=()=>pre.map(mre)});var t2,r2=l(()=>{"use strict";lC();Nd();t2=e=>aC().reduce((r,o)=>Yi(e,null,o.id)!==null?r:(Yh(e,o),r+1),0)});var o2,n2,s2=l(()=>{"use strict";Hd();o2=e=>e.id.trim().length===0?{kind:"empty_id"}:e.projectId.trim().length===0?{kind:"empty_project_id"}:e.symptom.length>oy?{kind:"field_too_long",field:"symptom",max:oy}:e.cause.length>ny?{kind:"field_too_long",field:"cause",max:ny}:e.avoidance.length>sy?{kind:"field_too_long",field:"avoidance",max:sy}:null,n2=e=>e.activeCountAfter>iy?{kind:"active_cap",max:iy}:null});var i2,a2=l(()=>{"use strict";Nd();oC();jd();Qh();s2();i2=(e,t)=>{let r=o2(t);if(r!==null)return{ok:!1,error:r};let o=t.id.trim(),n=Yi(e,t.projectId,o),s=XG(e,t.projectId,o),i=t.source??"project",a={id:o,projectId:t.projectId,symptom:t.symptom,cause:t.cause,avoidance:t.avoidance,check:t.check,keywords:t.keywords,tags:t.tags??[],source:i,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt,severity:t.severity??n?.severity??"warn"},d=ms(e,{projectId:t.projectId,includeRetired:!0}).filter(h=>h.id!==a.id),u=vG([...d,a]),g=n2({activeCountAfter:u});return g!==null?{ok:!1,error:g}:(Yh(e,a),{ok:!0,pitfall:a})}});var cC,dC=l(()=>{"use strict";Zv();jd();DG();KG();ZG();iC();r2();a2();cC=e=>{let t=e.dbPath??(e.layout!==void 0?sC(e.layout):(()=>{throw new Error("createPitfallRegistry requires dbPath or layout")})()),r=VG(t);return t2(r),{dbPath:t,listPitfalls:o=>CG(r,o),getPitfall:o=>ey(r,o),upsertPitfall:o=>i2(r,o),recordHit:o=>YG(r,o),matchPitfalls:o=>jG(r,o),close:()=>qG(r)}}});var gre,fre,uC,pC=l(()=>{"use strict";ry();Xv();gre=(e,t,r)=>{let o=t.projectId?.trim();return o!==void 0&&o.length>0?o:r===null||e.resolveProjectId===void 0?null:e.resolveProjectId(r)},fre=(e,t,r,o)=>{for(let n of o)try{t.recordHit({projectId:r,id:n.id})}catch(s){e.logError?.(s)}},uC=(e,t)=>{try{let r=t.cwd?.trim()??"",o=r.length>0?r:null;if(o!==null&&e.isDeclined?.(o)===!0)return{status:"none"};let n=gre(e,t,o);if(n===null||e.registry===null)return{status:"none",promptCreate:o!==null};let s=e.registry.matchPitfalls({projectId:n,text:t.message??""});if(s.length===0)return{status:"miss",projectId:n};fre(e,e.registry,n,s);let i=Zh(s);return{status:"hit",projectId:n,pitfalls:i,tip:eC(i)}}catch(r){return e.logError?.(r),{status:"none"}}}});var mC,l2=l(()=>{"use strict";ry();mC={name:Zi.name,description:Zi.description,inputSchema:Zi.inputSchema}});var fs,c2,$d,hre,ly,Fd=l(()=>{"use strict";fs=m(require("node:fs")),c2=m(require("node:os")),$d=()=>({readUtf8:e=>fs.default.readFileSync(e,"utf8"),writeUtf8:(e,t)=>{fs.default.writeFileSync(e,t,"utf8")},exists:e=>fs.default.existsSync(e),mkdirp:e=>{fs.default.mkdirSync(e,{recursive:!0})},rename:(e,t)=>{fs.default.renameSync(e,t)},realpath:e=>fs.default.realpathSync.native(e)}),hre=()=>({homedir:()=>c2.default.homedir()}),ly=()=>({...$d(),...hre()})});var d2,u2=l(()=>{"use strict";d2=(e,t)=>{let r=e.trim();if(r.length===0)return r;try{return t.exists(r)?t.realpath(r):r}catch{return r}}});var hs,Qi,ea,p2,m2,g2,f2,h2,y2,gC,Ud,cy,dy,fC,br=l(()=>{"use strict";hs="agent-witch-token-saver",Qi=`# BEGIN ${hs}`,ea=`# END ${hs}`,p2=`<!-- BEGIN ${hs} -->`,m2=`<!-- END ${hs} -->`,g2=".cursor/mcp.json",f2=".codex/config.toml",h2=".codex/AGENTS.md",y2=".claude/settings.json",gC="declined-projects.json",Ud="agent-witch",cy="agent-witch",dy=["mcp"],fC="agent-witch mcp-hook check_context"});var hC,S2,P2=l(()=>{"use strict";hC=m(require("node:path"));ke();br();S2=e=>e.profileEmail!==null?hC.default.join(e.installDir,We,e.profileEmail,gC):hC.default.join(e.installDir,gC)});var A2,kt,Yr=l(()=>{"use strict";A2=m(require("node:path")),kt=e=>{let{fs:t,filePath:r,contents:o}=e;t.mkdirp(A2.default.dirname(r));let n;e.backup===!0&&t.exists(r)&&(n=`${r}.aw-bak.${new Date().toISOString().replaceAll(":","-")}`,t.writeUtf8(n,t.readUtf8(r)));let s=`${r}.aw-tmp`;return t.writeUtf8(s,o),t.rename(s,r),n!==void 0?{backupPath:n}:{}}});var uy,yre,b2,py,my=l(()=>{"use strict";Fd();u2();P2();Yr();uy=()=>({byRealpath:{}}),yre=e=>{try{let t=JSON.parse(e);if(typeof t!="object"||t===null)return uy();let r=t.byRealpath;return typeof r!="object"||r===null?uy():{byRealpath:r}}catch{return uy()}},b2=(e,t=$d())=>{let r=S2(e);return t.exists(r)?yre(t.readUtf8(r)):uy()},py=e=>{let t=e.fs??$d(),r=d2(e.cwd,t);return b2(e.layout,t).byRealpath[r]!==void 0}});var Xo,gy,yC=l(()=>{"use strict";Xo=(e,t)=>{let r=e[t];if(typeof r!="string")return;let o=r.trim();return o.length>0?o:void 0},gy=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return{};let t=e;return{...Xo(t,"cwd")!==void 0?{cwd:Xo(t,"cwd")}:{},...Xo(t,"message")!==void 0?{message:Xo(t,"message")}:{},...Xo(t,"sessionId")!==void 0?{sessionId:Xo(t,"sessionId")}:{},...Xo(t,"projectId")!==void 0?{projectId:Xo(t,"projectId")}:{}}}});var Bd,SC=l(()=>{"use strict";Dt();pC();dC();my();yC();Bd=e=>{let t=e.logError??(o=>{let n=o instanceof Error?o.message:String(o);console.error(`[agent-witch] check_context: ${n}`)}),r=e.isDeclined??(o=>py({layout:e.layout,cwd:o}));return o=>{let n=gy(o),s=null;try{return s=cC({layout:e.layout}),uC({registry:s,resolveProjectId:A_,isDeclined:r,logError:t},n)}catch(i){return t(i),{status:"none"}}finally{s?.close()}}}});var Sre,PC,_2=l(()=>{"use strict";SC();yC();Sre="/api/local/check-context",PC=async e=>{if(e.pathname!==Sre)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t={};try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{return e.sendJson(e.response,400,{status:"none"}),!0}let r=Bd({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,r(gy(t))),!0}});var w2,fy,Pre,Are,k2,T2=l(()=>{"use strict";w2=m(require("node:path"));br();Yr();fy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Pre={hooks:[{type:"command",command:fC,timeout:3,[hs]:!0}]},Are=e=>Array.isArray(e)&&e.some(t=>fy(t)&&Array.isArray(t.hooks)&&t.hooks.some(r=>fy(r)&&(r.command===fC||r[hs]===!0))),k2=e=>{let t=w2.default.join(e.io.homedir(),y2),r={};if(e.io.exists(t))try{let a=JSON.parse(e.io.readUtf8(t));fy(a)&&(r={...a})}catch{r={}}let o=fy(r.hooks)?{...r.hooks}:{},n=o.UserPromptSubmit;if(Are(n))return{ok:!0,path:t,wrote:!1};let s=Array.isArray(n)?[...n]:[];s.push(Pre),o.UserPromptSubmit=s;let{backupPath:i}=kt({fs:e.io,filePath:t,contents:`${JSON.stringify({...r,hooks:o},null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:i}}});var Gd,hy=l(()=>{"use strict";br();Gd=e=>{let t=e.begin??Qi,r=e.end??ea,o=`${t}
${e.blockBody.trimEnd()}
${r}
`,n=e.existing.indexOf(t);if(n<0){let u=`${e.existing.length===0||e.existing.endsWith(`
`)?e.existing:`${e.existing}
`}${o}`;return{next:u,changed:u!==e.existing}}let s=e.existing.indexOf(r,n);if(s<0){let d=`${e.existing.slice(0,n)}${o}`;return{next:d,changed:d!==e.existing}}let i=s+r.length,a=e.existing.slice(i).replace(/^\n/,""),c=`${e.existing.slice(0,n)}${o}${a}`;return{next:c,changed:c!==e.existing}}});var v2,bre,C2,R2=l(()=>{"use strict";v2=m(require("node:path"));hy();br();Yr();bre=["On the first user message of a session, call the Agent Witch MCP tool","`check_context` with the current cwd.","If status is miss or none (declined), stay silent. If hit, follow the tip."].join(`
`),C2=e=>{let t=v2.default.join(e.io.homedir(),h2),r=e.io.exists(t)?e.io.readUtf8(t):"",{next:o,changed:n}=Gd({existing:r,blockBody:bre,begin:Qi,end:ea});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=kt({fs:e.io,filePath:t,contents:o,backup:r.length>0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var E2,L2,x2=l(()=>{"use strict";E2=m(require("node:path"));hy();br();Yr();L2=e=>{let t=E2.default.join(e.io.homedir(),f2),r=dy.map(c=>`"${c}"`).join(", "),o=[`[mcp_servers.${Ud}]`,`command = "${cy}"`,`args = [${r}]`].join(`
`),n=e.io.exists(t)?e.io.readUtf8(t):"",{next:s,changed:i}=Gd({existing:n,blockBody:o,begin:Qi,end:ea});if(!i)return{ok:!0,path:t,wrote:!1};let{backupPath:a}=kt({fs:e.io,filePath:t,contents:s,backup:n.length>0});return{ok:!0,path:t,wrote:!0,backupPath:a}}});var W2,AC,I2,O2=l(()=>{"use strict";W2=m(require("node:path"));br();Yr();AC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),I2=e=>{let t=W2.default.join(e.io.homedir(),g2),r={command:cy,args:[...dy]},o={};if(e.io.exists(t))try{let d=JSON.parse(e.io.readUtf8(t));AC(d)&&(o={...d})}catch{o={}}let n=AC(o.mcpServers)?{...o.mcpServers}:{},s=n[Ud];if(AC(s)&&s.command===r.command&&Array.isArray(s.args)&&JSON.stringify(s.args)===JSON.stringify(r.args))return{ok:!0,path:t,wrote:!1};n[Ud]=r;let a={...o,mcpServers:n},{backupPath:c}=kt({fs:e.io,filePath:t,contents:`${JSON.stringify(a,null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:c}}});var yy,bC=l(()=>{"use strict";Fd();T2();R2();x2();O2();yy=e=>{let t=e?.io??ly();return{ok:!0,cursorMcp:I2({io:t}),codexConfig:L2({io:t}),codexAgents:C2({io:t}),claudeHook:k2({io:t})}}});var M2=l(()=>{"use strict";br()});var N2=l(()=>{"use strict";M2();br();hy();Yr()});var j2=l(()=>{"use strict";Yr()});var _C=l(()=>{"use strict";br();N2();j2()});var wC=l(()=>{"use strict"});var D2=l(()=>{"use strict";wC()});var z2=l(()=>{"use strict";wC();D2()});var H2,U1e,$2=l(()=>{"use strict";H2=m(require("node:path"));z2();Yr();U1e=H2.default.join(".agent-witch","token-saver.json")});var kC=l(()=>{"use strict"});var F2=l(()=>{"use strict";$2();Fd();my();kC();bC();_C()});var TC=l(()=>{"use strict";dC();iC();rC();Qh();lC();pC();l2();SC();_2();bC();_C();F2();my();kC();Fd()});var vC,CC,RC=l(()=>{"use strict";vC="2025-03-26",CC={name:"agent-witch",version:"1.0.0"}});var ta,Sy,U2,Wre,Vd,B2=l(()=>{"use strict";RC();ta=(e,t,r)=>({jsonrpc:"2.0",id:e??null,error:{code:t,message:r}}),Sy=(e,t)=>({jsonrpc:"2.0",id:e??null,result:t}),U2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:null,Wre=async(e,t,r,o)=>{let n=t?.name;if(typeof n!="string")return ta(e,-32602,"tool name is required");let s=r.tools.find(i=>i.definition.name===n);if(s===void 0)return ta(e,-32602,`Unknown tool: ${n}`);try{let i=await s.call(t?.arguments??{},o);return Sy(e,i)}catch(i){let a=i instanceof Error?i.message:String(i);return ta(e,-32603,`Tool ${n} failed: ${a}`)}},Vd=async(e,t,r)=>{let o=U2(e);if(o===null)return ta(null,-32700,"Parse error");let n=o.id??null,s=o.method;return typeof s!="string"?ta(n,-32600,"Invalid Request"):s==="initialize"?Sy(n,{protocolVersion:vC,capabilities:{tools:{listChanged:!1}},serverInfo:t.serverInfo}):s==="ping"||s==="notifications/initialized"?Sy(n,{}):s==="tools/list"?Sy(n,{tools:t.tools.map(i=>i.definition)}):s==="tools/call"?Wre(n,U2(o.params),t,r):ta(n,-32601,"Method not found")}});var EC,G2=l(()=>{"use strict";EC=(e,t)=>({content:[{type:"text",text:e}],...t===!0?{isError:!0}:{}})});var Py=l(()=>{"use strict";B2();G2();RC()});var ra,Ay=l(()=>{"use strict";TC();Py();ra=e=>{let t=Bd({layout:e.layout,isDeclined:e.isDeclined});return{serverInfo:CC,tools:[{definition:mC,call:r=>EC(JSON.stringify(t(r)))}]}}});var V2,Ire,Ore,q2,K2=l(()=>{"use strict";Py();Ay();V2=(e,t)=>{let r=JSON.stringify(t);e.write(`Content-Length: ${Buffer.byteLength(r,"utf8")}\r
\r
${r}`)},Ire=async(e,t)=>{let r=Buffer.alloc(0);for await(let o of e.stdin)for(r=Buffer.concat([r,Buffer.isBuffer(o)?o:Buffer.from(String(o),"utf8")]);;){let n=r.indexOf(`\r
\r
`);if(n<0)break;let s=r.subarray(0,n).toString("utf8"),i=/Content-Length:\s*(\d+)/i.exec(s);if(i===null){r=r.subarray(n+4);continue}let a=Number.parseInt(i[1]??"0",10),c=n+4+a;if(r.length<c)break;let d=r.subarray(n+4,c).toString("utf8");r=r.subarray(c);let u;try{u=JSON.parse(d)}catch{u=null}await t(u)}},Ore=async(e,t)=>{await Ire(t,async r=>{let o=typeof r=="object"&&r!==null?r:null,n=o?.method,s=await Vd(r,e,void 0);if(typeof n=="string"&&n.startsWith("notifications/")){o?.id!==void 0&&V2(t.stdout,s);return}V2(t.stdout,s)})},q2=async e=>{await Ore(ra({layout:e.layout}),{stdin:process.stdin,stdout:process.stdout})}});var Mre,by,J2=l(()=>{"use strict";Py();Ay();Mre="/mcp",by=async e=>{if(e.pathname!==Mre)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t=null;try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{t=null}let r=e.server??ra({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,await Vd(t,r,void 0)),!0}});var X2={};yt(X2,{createAwlMcpServer:()=>ra,runAwlMcpStdio:()=>q2,tryHandleAwlMcpHttpRequest:()=>by});var LC=l(()=>{"use strict";Ay();K2();J2()});var ys,qd,Nre,jre,Dre,zre,Y2,Z2=l(()=>{"use strict";ys=m(require("node:fs")),qd=m(require("node:path")),Nre="prompt-optimizer-cycles.json",jre="prompt-optimizer-preferences.json",Dre="prompt-sdlc-cycles.json",zre="prompt-sdlc-preferences.json",Y2=e=>{let t=qd.default.join(e,Nre),r=qd.default.join(e,Dre);if(ys.default.existsSync(t)||!ys.default.existsSync(r))return t;try{ys.default.renameSync(r,t)}catch{return r}let o=qd.default.join(e,zre),n=qd.default.join(e,jre);if(ys.default.existsSync(o)&&!ys.default.existsSync(n))try{ys.default.renameSync(o,n)}catch{}return t}});var oa,Hre,xC,Q2=l(()=>{"use strict";oa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hre=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],xC=e=>{let t=Hre.map(i=>`<option value="${oa(i.value)}">${oa(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${oa(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${oa(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${oa(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${oa(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Kd,r5,$re,o5,Fre,Ure,n5,wy,e5,t5,Bre,Gre,Zr,Jd,_y,Vre,ky,WC,qre,IC,s5,OC,i5,Kre,Jre,Xre,a5,l5,c5,Xd=l(()=>{"use strict";Kd=m(require("node:fs")),r5=m(require("node:path")),$re="estimate-history.ndjson",o5=100,Fre=500,Ure=2e4,n5=e=>r5.default.join(e,$re),wy=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,Fre),e5=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,Ure),t5=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,Bre=e=>({...e,estimateTokens:t5(e.estimateTokens),actualTokens:t5(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),Gre=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Zr=e=>{let t=n5(e);return Kd.default.existsSync(t)?Kd.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return Gre(n)?[Bre(n)]:[]}catch{return[]}}):[]},Jd=(e,t)=>{Kd.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Kd.default.writeFileSync(n5(e),r,"utf8")},_y=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),Vre=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${_y(o.task)} | ${_y(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},ky=e=>{let t=Zr(e.reportsDir),r=wy(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Jd(e.reportsDir,[...s,n])},WC=e=>{let t=Zr(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?wy(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Jd(e.reportsDir,[...i,s])},qre=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-o5),IC=e=>[...Zr(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),s5=e=>{let t=Zr(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=e5(e.input),n=e5(e.output),s=wy(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Jd(e.reportsDir,[...c,a])},OC=(e,t)=>{let r=Zr(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},i5=e=>({table:Vre(qre(Zr(e))),embedding:null}),Kre=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},Jre=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-o5),Xre=e=>{let t=Kre(Jre(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${_y(s.task)} | ${_y(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},a5=e=>{let t=Zr(e.reportsDir),r=wy(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Jd(e.reportsDir,[...s,n])},l5=e=>{let t=Zr(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Jd(e.reportsDir,[...s,n])},c5=e=>Xre(Zr(e))});var d5=l(()=>{"use strict";Xd()});var Qr,MC,Yre,NC,Zre,Qre,Ty,vy,eoe,jC,u5=l(()=>{"use strict";d5();$T();Qr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),MC=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},Yre=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${MC(-r)} under`:`${MC(r)} over`},NC=e=>e.toLocaleString("en-US"),Zre=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${NC(-r)} under`:`${NC(r)} over`},Qre=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},Ty=e=>e===null?"\u2014":MC(e),vy=e=>e===null?"\u2014":NC(e),eoe=`(function () {
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
})();`,jC=e=>{let r=IC(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":Yre(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":Zre(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${Qr(Qre(i))}</button></td>
        <td>${Qr(c)}</td>
        <td>${Ty(n.estimateSeconds)}</td>
        <td>${Ty(n.actualSeconds)}</td>
        <td>${Qr(d)}</td>
        <td>${vy(n.estimateTokens)}</td>
        <td>${vy(n.actualTokens)}</td>
        <td>${Qr(u)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${Qr(c)}</p>
        <h2>Input</h2>
        <pre>${Qr(i)}</pre>
        <h2>Output</h2>
        <pre>${Qr(a)}</pre>
        <p>Time: estimated ${Ty(n.estimateSeconds)} \xB7 actual ${Ty(n.actualSeconds)} \xB7 ${Qr(d)}</p>
        <p>Tokens: estimated ${vy(n.estimateTokens)} \xB7 actual ${vy(n.actualTokens)} \xB7 ${Qr(u)}</p>
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
            ${oh({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${eoe}</script>`}
    </section>`}});var p5=l(()=>{"use strict";Q2();u5()});var na,toe,roe,DC,m5=l(()=>{"use strict";na=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),toe=(e,t,r)=>{let o=na(t),n=na(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},roe=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${na(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>toe(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${na(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${na(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${na(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},DC=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(roe).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var g5=l(()=>{"use strict";m5()});var Yd,f5,h5,zC,HC,$C,y5=l(()=>{"use strict";Yd=m(require("node:fs")),f5=m(require("node:path"));Lc();_f();h5=(e,t,r)=>wi({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,zC=(e,t,r)=>{let o=h5(e,t,r);if(o===null)return[];if(!Yd.default.existsSync(o))return[];let n=Yd.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},HC=e=>{let t=h5(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:jr(e.entry.prompt),output:jr(e.entry.output)};Yd.default.mkdirSync(f5.default.dirname(t),{recursive:!0}),Yd.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},$C=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var ooe,noe,Zd,Cy,FC=l(()=>{"use strict";ooe=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),noe=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Zd=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=ooe(i.assistantOutput),d=c.length>0?`Assistant: ${noe(c,t)}`:null,u=[a,d].filter(g=>g!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},Cy=e=>{let t=e.userMessage.trim(),r=Zd({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var _r,Qd,GC,soe,ioe,UC,aoe,VC,Ry,S5,P5,loe,sa,qC,BC,A5,coe,b5,ia,Ey,eu,doe,tu,KC,Ly,xy,_5=l(()=>{"use strict";_r=m(require("node:fs")),Qd=m(require("node:path")),GC=require("node:crypto");FC();soe="writer-sessions",ioe="active-index.json",UC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aoe=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",VC=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},Ry=e=>{let t=Qd.default.join(e.installDir,soe);return _r.default.mkdirSync(t,{recursive:!0}),t},S5=e=>Qd.default.join(Ry(e),ioe),P5=(e,t)=>Qd.default.join(Ry(e),`${t}.canonical.json`),loe=(e,t)=>Qd.default.join(Ry(e),`${t}.continuation.json`),sa=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,qC=e=>{let t=S5(e);if(!_r.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(_r.default.readFileSync(t,"utf8"));if(!UC(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!UC(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!aoe(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},BC=(e,t)=>{_r.default.writeFileSync(S5(e),JSON.stringify(t,null,2))},A5=(e,t)=>{_r.default.writeFileSync(P5(e,t.sessionId),JSON.stringify(t,null,2))},coe=(e,t)=>{_r.default.writeFileSync(loe(e,t.sessionId),JSON.stringify(t,null,2))},b5=(e,t)=>{let r=Zd({turns:t.turns});coe(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},ia=(e,t)=>{let r=P5(e,t);if(!_r.default.existsSync(r))return null;try{let o=JSON.parse(_r.default.readFileSync(r,"utf8"));return!UC(o)||typeof o.sessionId!="string"?null:o}catch{return null}},Ey=(e,t=20)=>{let r=Ry(e),o=_r.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=ia(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},eu=(e,t,r)=>{let o=VC(r);return qC(e).entries.find(i=>sa(i)===sa({writerAgent:t,projectFolderPath:o}))?.sessionId??null},doe=(e,t,r,o)=>{let n=qC(e),s=sa({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>sa(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];BC(e,{entries:i})},tu=(e,t,r)=>{let o=(0,GC.randomUUID)(),n=new Date().toISOString(),s=VC(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return A5(e,i),b5(e,i),doe(e,t,s,o),o},KC=(e,t,r)=>{let o=eu(e,t,r);return o!==null?o:tu(e,t,r)},Ly=(e,t,r)=>{let o=VC(r),n=qC(e);if(o===null&&r===void 0){BC(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=sa({writerAgent:t,projectFolderPath:o});BC(e,{entries:n.entries.filter(i=>sa(i)!==s)})},xy=e=>{let t=KC(e.layout,e.writerAgent,e.projectFolderPath),r=ia(e.layout,t);if(r===null)return;let o={id:(0,GC.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};A5(e.layout,n),b5(e.layout,n)}});var uoe,poe,Wy,JC,w5=l(()=>{"use strict";uoe=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",poe=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},Wy=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",JC=e=>{let t=Wy(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=uoe(r,e.userPromptCharacterCount),n=poe({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var Iy=l(()=>{"use strict";y5();_5();FC();w5()});var k5=l(()=>{"use strict";Qm();ni();lb()});var T5=l(()=>{"use strict";NA()});var nt,goe,foe,XC,YC,ZC,v5=l(()=>{"use strict";k5();T5();nt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),goe=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},foe=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=Ol(o);return`value="${nt(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${nt(r)}"`},XC=(e,t,r,o,n)=>{let s=eg[t];return`<label class="field">
          <span class="field-label">${nt(o)} API key \u2014 ${nt(goe(e,t))} \xB7 <a class="field-link" href="${nt(s.href)}" target="_blank" rel="noopener noreferrer">${nt(s.label)}</a></span>
          <input class="input mono" type="password" name="${nt(r)}" autocomplete="off" ${foe(e,t,n)} />
        </label>`},YC=(e,t,r,o)=>{let n=Gm(e[t]?.model),s=new Set(Bm[t].map(c=>c.value)),i=Bm[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${nt(c.value)}"${d}>${nt(c.label)}</option>`}).join(""),a=n!==En&&!s.has(n)?`<option value="${nt(n)}" selected>${nt(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${nt(o)}</span>
          <select class="input mono" name="${nt(r)}">${i}${a}</select>
        </label>`},ZC=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${nt(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${XC(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${YC(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${XC(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${YC(e.secrets,"openai","openaiModel","OpenAI model")}
        ${XC(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${YC(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var C5=l(()=>{"use strict";v5()});var Oy,R5,E5=l(()=>{"use strict";Oy=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),R5=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${Oy(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${Oy(s.name)}</strong> <span class="muted mono">(${Oy(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${Oy(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var hoe,L5,x5,W5=l(()=>{"use strict";hoe=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,L5=e=>e.kind==="folder",x5=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&L5(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if(L5(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(hoe)};return r(t)}});var I5,QC,O5=l(()=>{"use strict";I5=m(require("node:path")),QC=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${QC(r.children,t)}</ul>
            </details>
          </li>`;let o=I5.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var M5,Yo,yoe,Soe,ru,Poe,eR,N5=l(()=>{"use strict";Cf();M5=m(require("node:path"));E5();W5();O5();Yo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yoe=()=>`(() => {
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

})();`,Soe=()=>`(() => {
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
})();`,ru=e=>{let t=Mc({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=R5({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Yo(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Yo(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':Poe(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Yo(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Yo(s)}" />
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
    <script>${yoe()}</script>
    <script>${Soe()}</script>`;return`${t}${r}${o}${c}${d}`},Poe=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=x5(a.items.map(h=>({...h,relativePath:typeof h.relativePath=="string"&&h.relativePath.length>0?h.relativePath:M5.default.relative(a.sourceRoot,h.sourcePath).replaceAll("\\","/")}))),u=QC(d,Yo),g=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Yo(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Yo(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${g} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${u}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Yo(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},eR=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=a.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??u??a,h=t.sets[i];if(h===void 0)continue;let P=a.length>0?a:h.proposedSlug,S=g.length>0?g:h.proposedName,y=r.has(i),p=h.items.map(A=>({id:A.id,kind:A.kind,title:A.title,sourcePath:A.sourcePath,include:y}));s.push({slug:P,name:S,items:p})}return s}});var j5=l(()=>{"use strict";N5()});var Aoe,tR,D5=l(()=>{"use strict";At();Aoe=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[ne]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},tR=Aoe});var boe,z5,H5=l(()=>{"use strict";At();boe=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[ne]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},z5=boe});var _oe,woe,$5,koe,Toe,rR,F5=l(()=>{"use strict";jt();At();_oe=1e4,woe=15e3,$5=(e,t,r)=>{let o=`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/pitfalls`;return r===void 0?o:`${o}/${encodeURIComponent(r)}`},koe=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return t.errorMessage==="limit_exceeded"||t.code==="limit_exceeded"},Toe=(e,t=fetch)=>({listPitfalls:async(r,o)=>{try{let n=new URL($5(e.appOrigin,r));n.searchParams.set("includeRetired",o.includeRetired?"1":"0");let s=await t(n.toString(),{method:"GET",headers:{[ne]:e.pairingToken},signal:AbortSignal.timeout(_oe)});if(!s.ok)return{ok:!1,reason:"unavailable"};let i=C_(await s.json());return i===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:i.items,syncedAt:i.syncedAt}}catch{return{ok:!1,reason:"unavailable"}}},upsertPitfall:async(r,o)=>{try{let n=await t($5(e.appOrigin,r),{method:"PUT",headers:{[ne]:e.pairingToken,"content-type":"application/json"},body:JSON.stringify(o),signal:AbortSignal.timeout(woe)});if(n.ok)return{ok:!0};if(n.status===409){let s=await n.json().catch(()=>null);return{ok:!1,reason:koe(s)?"active_limit":"rejected"}}return n.status===400?{ok:!1,reason:"rejected"}:{ok:!1,reason:n.status>=500?"unavailable":"rejected"}}catch{return{ok:!1,reason:"unavailable"}}}}),rR=Toe});var U5,voe,B5,G5=l(()=>{"use strict";U5={saved:{message:"Pitfall saved.",error:null},retired:{message:"Pitfall retired. Turn on Show retired to see it again.",error:null},restored:{message:"Pitfall is active again.",error:null},invalid:{message:null,error:"Add a title, why it happens, and a fix. Keep them short, then save again."},limit:{message:null,error:"This project has 64 active pitfalls. Retire one, then try again."},missing:{message:null,error:"That pitfall is gone. Reload the page and try again."},rejected:{message:null,error:"Agent Witch Cloud did not accept this change. Check the fields and try again."},unavailable:{message:null,error:"Could not reach Agent Witch Cloud. Check this Mac on Status, then try again."}},voe=e=>e!==null&&Object.prototype.hasOwnProperty.call(U5,e)?U5[e]:null,B5=voe});var V5=l(()=>{"use strict"});var Ss,Coe,oR,q5=l(()=>{"use strict";Cf();b_();Ss=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Coe=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,oR=e=>{let t=e.flashError?`<div class="alert-error">${Ss(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ss(e.flashMessage)}</div>`:"",r=Mc({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Ss(Coe(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${Ss(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,g=Fg(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${Ss(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Ss(n.name)}</strong>
                  <span class="muted mono">${Ss(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${u}${g}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var K5=l(()=>{"use strict";V5();Bg();q5()});var My,J5=l(()=>{"use strict";My=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var X5,Jt,nR=l(()=>{"use strict";X5=m(require("node:path"));St();ke();G();ee();a_();Jt=e=>{let t=z()?.layout.installDir??R();if(X5.default.basename(t)===Qt)return ct;let r=z(),o=r!==null?Ie(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):ct}});var sR,Y5=l(()=>{"use strict";sr();nR();sR=async e=>{let t=Ue(e.installDir),r=t?.bundleVersion??null,o=Jt(t);try{let n=await Ys(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:An(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var iR,Z5=l(()=>{"use strict";iR=e=>!e});var aR,aa,lR=l(()=>{"use strict";G();aR=()=>`http://127.0.0.1:${$s()}/update/run`,aa=async e=>{try{let t=await fetch(aR(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Roe,Q5,cR,eV=l(()=>{"use strict";G();oe();lR();Roe=()=>{Cr({launchAgentLabel:ye(),installDir:R()})},Q5=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},cR=async()=>{Roe();let e=await aa({force:!0});if(e.ok)return{ok:!0,message:Q5(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:Q5(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(sr(),u0)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var dR=l(()=>{"use strict";kk();J5();nR();Y5();Z5();eV();lR()});var tV,rV=l(()=>{"use strict";tV=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var oV,nV,uR,pR,sV=l(()=>{"use strict";oV=require("node:crypto"),nV=m(require("node:fs"));Dt();ee();ee();rV();uR=!1,pR=async e=>{if(uR)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!tV(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=z();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=V({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&nV.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,oV.randomUUID)();uR=!0;try{if(await l_(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await ii({...r,workspace:n},e.writerAgent,t);return await rc(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{uR=!1}}});var iV=l(()=>{"use strict";sV()});var ou,mR=l(()=>{"use strict";ou=e=>{if(typeof e!="string")return!1;let t=e.trim();return t.length===0||t.startsWith(".")||t.includes("/")||t.includes("\\")||t.includes("..")?!1:t===e}});var la,Tt,aV,Ps,lV,ca,eo=l(()=>{"use strict";la="history",Tt="skills",aV="_drafts",Ps="_tombstones",lV="state.json",ca="meta.json"});var As,dV,to,ro,da=l(()=>{"use strict";As=m(require("node:fs")),dV=m(require("node:path"));eo();to=e=>{As.default.mkdirSync(e,{recursive:!0,mode:448});try{As.default.chmodSync(e,448)}catch{}},ro=(e,t)=>{to(dV.default.dirname(e));let r=`${e}.${process.pid}.${Date.now()}.tmp`;As.default.writeFileSync(r,t,{mode:384});try{As.default.chmodSync(r,384)}catch{}As.default.renameSync(r,e);try{As.default.chmodSync(e,384)}catch{}}});var ua,vt,oo,no=l(()=>{"use strict";ua=m(require("node:path"));G();mR();da();eo();vt=e=>{if(!ou(e))throw new Error("invalid_project_id");let t=N();return ua.default.join(t.projectDataDir,e)},oo=e=>{let t=vt(e);to(t),to(ua.default.join(t,la));let r=ua.default.join(t,Tt);return to(r),to(ua.default.join(r,aV)),to(ua.default.join(r,Ps)),t}});var fR,hR,Ny=l(()=>{"use strict";fR=/^[a-z0-9][a-z0-9_-]{0,63}$/,hR="sha256:"});var uV,Xt,nu=l(()=>{"use strict";uV=require("node:crypto");Ny();Xt=e=>`${hR}${(0,uV.createHash)("sha256").update(Buffer.from(e,"utf8")).digest("hex")}`});var bs,su=l(()=>{"use strict";Ny();bs=e=>fR.test(e)});var iu,jy=l(()=>{"use strict";iu=e=>e.onPublishedSet?e.localContentHash===e.expectedHash?"skip":"fetch_write":"remove"});var yR,SR=l(()=>{"use strict";yR=async e=>{try{return await e.port.isHistoryEnabled(e.projectId)===!0}catch{return!1}}});var PR,AR=l(()=>{"use strict";su();PR=async e=>{try{return(await e.port.listProjectSkillIds({projectId:e.projectId})).filter(r=>bs(r.skillId))}catch{return[]}}});var bR,_R=l(()=>{"use strict";bR=async e=>{try{let t=await e.awc.listPublished(e.projectId);return Array.isArray(t)?{ok:!0,published:t}:{ok:!1}}catch{return{ok:!1}}}});var wR,kR=l(()=>{"use strict";nu();wR=async e=>{try{let t=await e.port.readProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version});return t===null?null:Xt(t.body)===t.contentHash?t:null}catch{return null}}});var TR,vR=l(()=>{"use strict";nu();su();TR=async e=>{if(!bs(e.skillId))return{ok:!1,code:"unavailable"};let t=Xt(e.body);try{let r=await e.port.writeProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version,body:e.body});return r.contentHash===t?{ok:!0,path:r.path,contentHash:r.contentHash}:{ok:!1,code:"hash_mismatch"}}catch{return{ok:!1,code:"unavailable"}}}});var CR,RR=l(()=>{"use strict";su();CR=async e=>{if(!bs(e.skillId))throw new Error("invalid_project_skill_id");return e.port.tombstoneProjectSkill({projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}})}});var ER,LR=l(()=>{"use strict";nu();jy();kR();vR();ER=async e=>{let{meta:t,projectId:r}=e,o={skillId:t.skillId,version:t.publishedVersion},n=await wR({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion});if(iu({onPublishedSet:!0,expectedHash:t.contentHash,localContentHash:n?.contentHash??null})==="skip")return{...o,action:"skipped"};let i=await e.awc.getPublishedBody({projectId:r,skillId:t.skillId,version:t.publishedVersion,skillRowId:t.skillRowId});if(i===null)return{...o,action:"missing_awc"};if(i.contentHash!==t.contentHash||Xt(i.body)!==t.contentHash)return{...o,action:"hash_mismatch"};let a=await TR({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion,body:i.body});return a.ok?a.contentHash===t.contentHash?{...o,action:"mirrored"}:{...o,action:"hash_mismatch"}:{...o,action:a.code==="hash_mismatch"?"hash_mismatch":"unavailable"}}});var xR,WR=l(()=>{"use strict";jy();RR();xR=async e=>iu({onPublishedSet:!1})!=="remove"?{skillId:e.skillId,version:0,action:"unavailable"}:(await CR({port:e.port,projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}}),{skillId:e.skillId,version:0,action:"removed"})});var au,Dy,pV=l(()=>{"use strict";SR();AR();_R();LR();WR();au="[project-skill-pull-mirror]",Dy=async e=>{let t=e.deps.history,r=e.deps.awcPublished;try{if(!await yR({port:t,projectId:e.projectId}))return{ok:!0,skipped:!0,skills:[]};let n=await bR({awc:r,projectId:e.projectId});if(!n.ok)return console.warn(au,"list_failed",e.projectId),{ok:!1,skipped:!1,skills:[]};let s=new Set(n.published.map(d=>d.skillId)),i=[];for(let d of n.published)try{i.push(await ER({projectId:e.projectId,meta:d,port:t,awc:r}))}catch(u){console.warn(au,"skill_failed",d.skillId,u),i.push({skillId:d.skillId,version:d.publishedVersion,action:"unavailable"})}let a=await PR({port:t,projectId:e.projectId});for(let d of a)if(!s.has(d.skillId))try{i.push(await xR({projectId:e.projectId,skillId:d.skillId,lastContentHash:d.contentHash,port:t}))}catch(u){console.warn(au,"orphan_tombstone_failed",d.skillId,u),i.push({skillId:d.skillId,version:0,action:"unavailable"})}let c=i.some(d=>d.action==="unavailable"||d.action==="hash_mismatch"||d.action==="missing_awc");return c&&console.warn(au,"partial_failure",e.projectId,i),{ok:!c,skipped:!1,skills:i}}catch(o){return console.warn(au,"tick_failed",e.projectId,o),{ok:!1,skipped:!1,skills:[]}}}});var lu=l(()=>{"use strict";Ny();nu();su();jy();SR();AR();_R();kR();vR();RR();LR();WR();pV()});var _s,cu,Eoe,Loe,OR,MR=l(()=>{"use strict";_s=m(require("node:fs")),cu=m(require("node:path"));da();lu();eo();no();Eoe=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Loe=e=>`v${String(e).padStart(4,"0")}.md`,OR=e=>{if(!Eoe(e.skillId))throw new Error("invalid_project_skill_id");if(!Number.isInteger(e.version)||e.version<1)throw new Error("invalid_project_skill_version");let t=oo(e.projectId),r=cu.default.join(t,Tt,e.skillId),o=cu.default.join(r,Loe(e.version)),n=cu.default.join(r,ca),s=Xt(e.body);if(_s.default.existsSync(o)&&_s.default.existsSync(n))try{let a=JSON.parse(_s.default.readFileSync(n,"utf8"));if(a.version===e.version&&a.contentHash===s&&_s.default.readFileSync(o,"utf8")===e.body)return{path:o,contentHash:s}}catch{}ro(o,e.body),ro(n,`${JSON.stringify({skillId:e.skillId,version:e.version,contentHash:s,updatedAt:new Date().toISOString()})}
`);let i=cu.default.join(t,Tt,Ps,`${e.skillId}.json`);return _s.default.existsSync(i)&&_s.default.unlinkSync(i),{path:o,contentHash:s}}});var du,zy,NR,jR=l(()=>{"use strict";du=m(require("node:fs")),zy=m(require("node:path"));lu();eo();no();NR=e=>{if(e.skillId.length===0||e.skillId.startsWith("_")||e.skillId.includes("/")||e.skillId.includes("\\"))return null;let t;try{t=vt(e.projectId)}catch{return null}let r=zy.default.join(t,Tt,e.skillId),o=zy.default.join(r,`v${String(e.version).padStart(4,"0")}.md`),n=zy.default.join(r,ca);if(!du.default.existsSync(o)||!du.default.existsSync(n))return null;try{let s=du.default.readFileSync(o,"utf8"),i=JSON.parse(du.default.readFileSync(n,"utf8")),a=typeof i.contentHash=="string"?i.contentHash:null;return a===null||i.version!==e.version||Xt(s)!==a?null:{body:s,contentHash:a}}catch{return null}}});var so,Zo,mV,xoe,DR,zR,HR=l(()=>{"use strict";so=m(require("node:fs")),Zo=m(require("node:path"));da();eo();no();mV=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),xoe=(e,t)=>{if(!so.default.existsSync(e))return;let r=`.${t}.`;for(let o of so.default.readdirSync(e)){if(!o.startsWith(r))continue;let n=Zo.default.join(e,o);try{so.default.rmSync(n,{recursive:!0,force:!0})}catch{}}},DR=e=>{if(!mV(e.skillId))throw new Error("invalid_project_skill_id");let t=oo(e.projectId),r=Zo.default.join(t,Tt),o=Zo.default.join(r,e.skillId),n=!1;if(so.default.existsSync(o)){let c=Zo.default.join(r,`.${e.skillId}.${process.pid}.${Date.now()}`);try{so.default.renameSync(o,c),so.default.rmSync(c,{recursive:!0,force:!0}),n=!0}catch{}}xoe(r,e.skillId);let s=Zo.default.join(r,Ps);to(s);let i=Zo.default.join(s,`${e.skillId}.json`),a={skillId:e.skillId,revokedAt:e.revokedAt??new Date().toISOString(),lastContentHash:e.lastContentHash};return ro(i,`${JSON.stringify(a)}
`),{removed:n}},zR=e=>{if(!mV(e.skillId))return null;let t;try{t=vt(e.projectId)}catch{return null}let r=Zo.default.join(t,Tt,Ps,`${e.skillId}.json`);if(!so.default.existsSync(r))return null;try{let o=JSON.parse(so.default.readFileSync(r,"utf8"));if(typeof o!="object"||o===null||typeof o.skillId!="string"||typeof o.revokedAt!="string"||typeof o.lastContentHash!="string")return null;let n=o;return{skillId:n.skillId,revokedAt:n.revokedAt,lastContentHash:n.lastContentHash}}catch{return null}}});var uu,$R,FR,UR=l(()=>{"use strict";uu=m(require("node:fs")),$R=m(require("node:path"));eo();no();FR=e=>{let t;try{t=vt(e.projectId)}catch{return[]}let r=$R.default.join(t,Tt);if(!uu.default.existsSync(r))return[];let o=[];for(let n of uu.default.readdirSync(r)){if(n.startsWith("_")||n.startsWith("."))continue;let s=$R.default.join(r,n,ca);if(uu.default.existsSync(s))try{let i=JSON.parse(uu.default.readFileSync(s,"utf8"));if(typeof i.contentHash!="string")continue;o.push({skillId:n,contentHash:i.contentHash})}catch{continue}}return o}});var BR,gV,GR,VR=l(()=>{"use strict";BR=m(require("node:fs")),gV=m(require("node:path"));da();eo();no();GR=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))throw new Error("invalid_message_id");let r=oo(e.projectId),o=gV.default.join(r,la,`${t}.json`);if(BR.default.existsSync(o))try{let s=JSON.parse(BR.default.readFileSync(o,"utf8"));if(s.messageId===t)return s}catch{}let n={messageId:t,projectId:e.projectId,message:e.message,savedAt:new Date().toISOString()};return ro(o,`${JSON.stringify(n)}
`),n}});var pu,fV,hV,Hy,$y,qR,mu=l(()=>{"use strict";pu=m(require("node:fs")),fV=m(require("node:path"));da();eo();no();G();hV=e=>fV.default.join(vt(e),la,lV),Hy=e=>{try{let t=hV(e);if(!pu.default.existsSync(t))return null;let r=JSON.parse(pu.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null||typeof r.state!="string"||typeof r.updatedAt!="string")return null;let o=r.state;return o!=="on_ready"&&o!=="degraded"&&o!=="on_configuring"&&o!=="off"?null:{state:o,updatedAt:r.updatedAt}}catch{return null}},$y=e=>{oo(e.projectId);let t={state:e.state,updatedAt:new Date().toISOString()};return ro(hV(e.projectId),`${JSON.stringify(t)}
`),t},qR=()=>{let t=N().projectDataDir;if(!pu.default.existsSync(t))return[];let r=[];for(let o of pu.default.readdirSync(t)){if(!ou(o))continue;let n=Hy(o);n!==null&&(n.state==="on_ready"||n.state==="degraded")&&r.push(o)}return r}});var yV,SV=l(()=>{"use strict";At();yV=async e=>{let t=await fetch(`${e.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(e.projectId)}/computer-history/acks`,{method:"POST",headers:{[ne]:e.cloudApi.pairingToken,"Content-Type":"application/json"},body:JSON.stringify({messageId:e.messageId}),signal:AbortSignal.timeout(3e4)});return{ok:t.ok,status:t.status}}});var gu,PV,Woe,KR,AV=l(()=>{"use strict";xo();ee();mu();SV();VR();gu="[project-history-dispatch]",PV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Woe=()=>{let e=z();return e===null?null:V({wsUrl:e.wsUrl,pairingToken:e.pairingToken})},KR=async e=>{if(!PV(e.payload))return{ok:!1,reason:"invalid_payload"};let t=typeof e.payload.projectId=="string"?e.payload.projectId.trim():"",r=e.payload.message;if(t.length===0||!PV(r))return{ok:!1,reason:"invalid_payload"};let o=typeof r.messageId=="string"?r.messageId.trim():"";if(o.length===0)return{ok:!1,reason:"missing_message_id"};try{GR({projectId:t,messageId:o,message:r}),$y({projectId:t,state:"on_ready"})}catch(s){console.error(gu,"write_failed",t,o,s);try{$y({projectId:t,state:"degraded"})}catch(i){console.error(gu,"degraded_mark_failed",t,i)}return{ok:!1,reason:"write_failed"}}let n=e.cloudApi===void 0?Woe():e.cloudApi;if(n===null)return console.error(gu,"ack_skipped_no_cloud_api",t,o),{ok:!0,messageId:o,acked:!1};try{let s=await yV({cloudApi:n,projectId:t,messageId:o});return s.ok?{ok:!0,messageId:o,acked:!0}:(console.error(gu,"ack_http_failed",t,o,s.status),{ok:!0,messageId:o,acked:!1})}catch(s){return console.error(gu,"ack_failed",t,o,s),{ok:!0,messageId:o,acked:!1}}}});var JR=l(()=>{"use strict"});var XR,YR=l(()=>{"use strict";UR();mu();jR();no();HR();MR();XR=()=>({isHistoryEnabled:e=>{let t=Hy(e);return t?.state==="on_ready"||t?.state==="degraded"},resolveProjectDataDir:e=>vt(e),writeProjectSkillVersion:e=>OR(e),readProjectSkillVersion:e=>NR(e),tombstoneProjectSkill:e=>DR(e),readProjectSkillTombstone:e=>zR(e),listProjectSkillIds:e=>FR(e)})});var bV,ZR,QR=l(()=>{"use strict";At();bV=e=>({[ne]:e,Accept:"application/json"}),ZR=e=>({listPublished:async t=>{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/skills/published`,{method:"GET",headers:bV(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(!r.ok)throw new Error(`listPublished http ${r.status}`);let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0||!Array.isArray(o.skills))throw new Error("listPublished malformed body");return o.skills.map((s,i)=>{if(typeof s!="object"||s===null||typeof s.skillId!="string"||typeof s.publishedVersion!="number"||typeof s.contentHash!="string")throw new Error(`listPublished row ${i} missing version/contentHash`);let a=s;return{skillId:a.skillId,publishedVersion:a.publishedVersion,contentHash:a.contentHash,...typeof a.skillRowId=="string"?{skillRowId:a.skillRowId}:{}}})},getPublishedBody:async t=>{let r=new URL(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t.projectId)}/skills/published/${encodeURIComponent(t.skillId)}`);r.searchParams.set("version",String(t.version));let o=await fetch(r.toString(),{method:"GET",headers:bV(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(o.status===404)return null;if(!o.ok)throw new Error(`getPublishedBody http ${o.status}`);let n=await o.json();if(typeof n!="object"||n===null||n.ok!==!0||typeof n.body!="string"||typeof n.contentHash!="string")throw new Error("getPublishedBody malformed body");return{body:n.body,contentHash:n.contentHash}}})});var _V,eE,tE=l(()=>{"use strict";lu();ee();xo();QR();YR();mu();_V="[project-history-tick]",eE=async(e={})=>{let t=e.listProjectIds?.()??qR();if(t.length===0)return;let r=z(),o=e.cloudApi!==void 0?e.cloudApi:r===null?null:V({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),n=XR(),s=e.pullSkills??Dy;for(let i of t){if(o===null){console.error(_V,"pull_skipped_no_cloud_api",i);continue}try{await s({projectId:i,deps:{history:n,awcPublished:ZR(o)}})}catch(a){console.error(_V,"pull_failed",i,a)}}}});var rE,kV=l(()=>{"use strict";JR();tE();rE=e=>{let t=e?.intervalMs??6e4,r=e?.tick??(()=>eE());r();let o=setInterval(()=>{r()},t);return{stop:()=>{clearInterval(o)}}}});var oE=l(()=>{"use strict";mR();no();MR();jR();HR();UR();VR();AV();JR();YR();QR();tE();lu();kV();mu()});var Ct,Ioe,TV,vV,nE,sE,iE,aE,lE,cE,dE=l(()=>{"use strict";Ct=require("node:crypto"),Ioe=Buffer.from("302a300506032b6570032100","hex"),TV=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},vV=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Ct.createPublicKey)({key:Buffer.concat([Ioe,t]),format:"der",type:"spki"})},nE=()=>{let{publicKey:e,privateKey:t}=(0,Ct.generateKeyPairSync)("ed25519");return{publicKeyRaw:TV(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},sE=e=>(0,Ct.createPrivateKey)(e),iE=(e,t)=>(0,Ct.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),aE=(e,t,r)=>{try{let o=vV(e);return(0,Ct.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},lE=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,cE=()=>(0,Ct.randomBytes)(32).toString("base64url")});var io,Fy,CV,Ooe,Moe,Uy,uE,pE,RV=l(()=>{"use strict";io=m(require("node:fs")),Fy=m(require("node:path"));dE();G();ke();CV=e=>Fy.default.join(e.installDir,yo),Ooe=(e,t)=>{if(e.profileEmail===null||t===CV(e)||io.default.existsSync(t))return;let r=CV(e);io.default.existsSync(r)&&(io.default.mkdirSync(Fy.default.dirname(t),{recursive:!0}),io.default.renameSync(r,t))},Moe=e=>{if(!io.default.existsSync(e))return null;try{let t=io.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Uy=e=>{let t=Ba(e);Ooe(e,t);let r=Moe(t);if(r!==null)return r;let o=nE();return io.default.mkdirSync(Fy.default.dirname(t),{recursive:!0}),io.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},uE=e=>{let t=Uy(e.layout),r=cE(),o=lE({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=sE(t.privateKeyPem),s=iE(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},pE=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return aE(e.serverPublicKey,t,e.serverAttestation)}});var mE=l(()=>{"use strict";RV();dE()});var EV,LV,xV=l(()=>{"use strict";EV=m(require("node:path")),LV=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:EV.default.basename(e.installDir)})});var MV,hu,hE,yE,WV,Noe,gE,fu,he,NV,joe,fE,Doe,zoe,SE,fe,Le,st,Hoe,IV,OV,yu,Su,jV=l(()=>{"use strict";MV=m(require("node:http")),hu=m(require("node:fs")),hE=m(require("node:path"));By();Cc();jD();zD();GD();Cn();Qw();_k();Sz();Az();wG();TC();LC();Z2();p5();g5();Iy();C5();j5();Lo();Dt();At();D5();H5();F5();x_();G5();K5();dR();sr();iV();oE();ee();mE();xV();yE=e=>$w(e)??"never",WV=48e3,Noe=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,gE=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Eg(),reveal:t.reveal,installed:dr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),fu=async e=>{let t=z();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:Wo(t,e)},he=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),NV=200,joe=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',fE=e=>{let t=e.trim().slice(0,NV),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},Doe=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${he(t)}</div>`,zoe=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${he(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',SE={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},fe=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...SE}),e.end(JSON.stringify(r))},Le=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},st=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},Hoe=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=joe(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${he(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=iR(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Rc(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${he(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${he(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${he(yE(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${he(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},IV=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},OV=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,NV)},yu=e=>{let t=hE.default.join(e.layout.installDir,"link-code.txt"),r=()=>Ue(e.layout.installDir),o=()=>{let S=r();return{installBundleVersion:My(S),installBundleUpdatedAt:S?.updatedAt??null,installVersion:S}},n=async S=>{let y=S.installVersion??r(),p=await i(),A=Rk(p),T=S.updateFlash??null,f=Ek(T),b=Doe(T,S.updateError??null);return vk({title:S.title,activePath:S.activePath,body:S.body,cloudAppOrigin:Jt(y),installBundleVersionLabel:My(y),prependBody:`${f}${b}${A}`,headerUpdateButtonHtml:Ck(p)})},s=null,i=async()=>{let S=Date.now();if(s!==null&&S-s.cachedAtMs<6e4)return s.offer;let y=await sR(e.layout);return s={cachedAtMs:S,offer:y},y},a=()=>{s=null},c=!1,d=async S=>{if(a(),!(await i()).updateAvailable){S.writeHead(303,{Location:"/?update=ok"}),S.end();return}if(c){S.writeHead(303,{Location:fE("An update is already running.")}),S.end();return}c=!0;try{let p=await cR(),A=p.ok?"/?update=ok":fE(p.message);S.writeHead(303,{Location:A}),S.end()}catch(p){let A=p instanceof Error&&p.message.trim().length>0?p.message:"Install bundle update failed.";S.writeHead(303,{Location:fE(A)}),S.end()}finally{c=!1,a()}},u=async(S,y)=>{let p=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",A=o(),T=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:A.installVersion,body:`<section class="card">
      <h1>${he(y)}</h1>
      <p>${he(p)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});S.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),S.end(T)},g=()=>{if(hu.default.existsSync(t))return hu.default.readFileSync(t,"utf8").trim();let S=Math.random().toString(36).slice(2,8).toUpperCase();return hu.default.writeFileSync(t,S,"utf8"),S},h=MV.default.createServer((S,y)=>{(async()=>{let p=S.url?.split("?")[0]??"/",A=S.method??"GET";if(A==="OPTIONS"){y.writeHead(204,SE),y.end();return}if(await Vv({method:A,pathname:p,request:S,response:y,requestUrl:S.url??"/",storePath:Y2(hE.default.dirname(e.layout.configPath)),readBody:st,sendHtml:Le,renderShell:n})||await PC({method:A,pathname:p,request:S,response:y,layout:e.layout,readBody:st,sendJson:fe})||await by({method:A,pathname:p,request:S,response:y,layout:e.layout,readBody:st,sendJson:fe}))return;if(A==="GET"&&p==="/health"){let f=e.controllers.getStatus(),b=o();fe(y,200,{ok:!0,...f,installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt,...LV({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(A==="GET"&&p==="/api/status"){let f=o();fe(y,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(A==="GET"&&p==="/api/traffic"){fe(y,200,{entries:Tc(e.layout)});return}if(A==="DELETE"&&p==="/api/traffic"||A==="POST"&&p==="/api/traffic/clear"){if(Bw(e.layout),A==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}fe(y,200,{ok:!0});return}if(A==="GET"&&p==="/api/trace"){fe(y,200,{entries:Sf(e.layout)});return}if(A==="DELETE"&&p==="/api/trace"||A==="POST"&&p==="/api/trace/clear"){if(qw(e.layout),A==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}fe(y,200,{ok:!0});return}if(A==="POST"&&p==="/api/errors/clear"){Kw(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(A==="GET"&&p==="/api/knowledge"){let b=new URL(S.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(b.length>0){let w=await Ti({layout:e.layout,query:b,limit:20});fe(y,200,{chunks:w,query:b});return}fe(y,200,{chunks:ki(e.layout).slice(-50).reverse()});return}if(A==="POST"&&p==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(A==="GET"&&p==="/api/update-status"){let f=await i();fe(y,200,{ok:!0,...f});return}if((A==="GET"||A==="POST")&&p==="/api/update"){await d(y);return}if(A==="GET"&&p==="/"){let f=e.controllers.getStatus(),b=o(),w=dr(e.layout),v=Pf(e.layout.errorLogPath);Le(y,await n({title:"Home",activePath:"/",installVersion:b.installVersion,updateFlash:IV(S.url??void 0),updateError:OV(S.url??void 0),body:Lk({wsConnected:f.wsConnected,lastHeartbeatAt:f.lastHeartbeatAt,installBundleVersion:b.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:ki(e.layout).length,trafficEntryCount:Tc(e.layout).length,wakeError:f.wakeError,errorLogByteSize:v.byteSize,errorLogExists:v.exists})}));return}if(A==="GET"&&p==="/task"){let f=e.controllers.getStatus(),b=o(),w=z(),v=new URL(S.url??"/",`http://127.0.0.1:${43347}`),k=v.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,x=v.searchParams.get("failed")==="1"?v.searchParams.get("error")?.trim()??"Task failed.":null,E=v.searchParams.get("runId");Le(y,await n({title:"Task",activePath:"/task",installVersion:b.installVersion,body:xC({defaultWorkspace:w?.workspace??"",wsConnected:f.wsConnected,flashMessage:k,flashError:x,lastRunId:E})}));return}if(A==="POST"&&p==="/task/dispatch"){let f=await st(S),b=new URLSearchParams(f),w=b.get("prompt")?.trim()??"",v=b.get("writerAgent")?.trim()??"claude-cli",k=b.get("projectFolder")?.trim()??"",x=await pR({prompt:w,writerAgent:v,...k.length>0?{projectFolderPath:k}:{}}),E=new URLSearchParams;x.ok?E.set("ok","1"):(E.set("failed","1"),x.errorMessage!==void 0&&E.set("error",x.errorMessage.slice(0,240))),x.agentRunId!==void 0&&E.set("runId",x.agentRunId),y.writeHead(303,{Location:`/task?${E.toString()}`}),y.end();return}if(A==="GET"&&p==="/writer-sessions"){let f=o(),b=Ey(e.layout,12);Le(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:f.installVersion,updateFlash:IV(S.url??void 0),updateError:OV(S.url??void 0),body:DC({sessions:b})}));return}if(A==="GET"&&p==="/errors"){let f=o(),b=Pf(e.layout.errorLogPath);Le(y,await n({title:"Errors",activePath:"/errors",installVersion:f.installVersion,body:Xw({errorLogPath:e.layout.errorLogPath,content:b.content,exists:b.exists,truncated:b.truncated,byteSize:b.byteSize,cleared:new URL(S.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(A==="GET"&&p==="/status"){let f=new URL(S.url??"/",`http://127.0.0.1:${43347}`),b=e.controllers.getStatus(),w=_e(e.layout),v=w!==null?Oe(w,12e4):ek(b.lastHeartbeatAt,12e4),k=tk({lastHeartbeatAt:b.lastHeartbeatAt,heartbeatIsStale:v}),x=o();Le(y,await n({title:"Status",activePath:"/status",installVersion:x.installVersion,body:`${Hoe({status:b,healthBadge:k,revived:f.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:x.installBundleVersion,installBundleUpdatedAt:x.installBundleUpdatedAt})}${nk({installDir:e.layout.installDir})}${ok({entries:Sf(e.layout)})}`}));return}if(A==="GET"&&p==="/traffic"){let f=new URL(S.url??"/",`http://127.0.0.1:${43347}`),b=Tc(e.layout),w=o(),v=b.map(E=>`<tr><td title="${he(E.at)}">${he(yE(E.at))}</td><td>${he(E.direction)}</td><td><code>${he(E.type)}</code></td><td>${he(E.summary)}</td><td>${he(E.action??"")}</td></tr>`).join(""),k=b.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${v}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',x=f.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Le(y,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${x}
              ${k}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(A==="GET"&&p==="/projects"){let f=new URL(S.url??"/",`http://127.0.0.1:${43347}`),b=o(),w=Jt(b.installVersion),v=await fu(e.layout),k=f.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":f.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,x=f.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,E=z(),M=E===null?null:V({wsUrl:E.wsUrl,pairingToken:E.pairingToken}),O=M===null?{}:Object.fromEntries((await Promise.all(v.projects.map(async F=>{let B=await tR(M,F.id);return[F.id,B?.counts??null]}))).filter(F=>F[1]!==null));Le(y,await n({title:"Projects",activePath:"/projects",installVersion:b.installVersion,body:oR({projects:v.projects,compositionCountsByProjectId:O,cloudAppOrigin:w,syncMessage:v.message,syncOk:v.ok,flashMessage:x,flashError:k})}));return}if(A==="GET"&&p==="/projects/select-folder"){let b=new URL(S.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=z(),v=w===null?null:V({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),k=b.length>0&&v!==null?jo():null;if(k===null||v===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Xe({projectFolderPath:k}),!await cc(v,b,k)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(b)}&folderUpdated=1`}),y.end();return}if(A==="POST"&&p==="/projects/delete"){let f=await st(S),b=new URLSearchParams(f).get("projectId")?.trim()??"",w=z(),v=w===null?null:V({wsUrl:w.wsUrl,pairingToken:w.pairingToken});if(v===null||b.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let k=await B_(v,b);y.writeHead(303,{Location:k.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(A==="GET"&&p==="/project"){let f=new URL(S.url??"/",`http://127.0.0.1:${43347}`),b=f.searchParams.get("id")?.trim()??"",w=o(),v=Jt(w.installVersion),k=await fu(e.layout),x=ur(k.projects,b);if(x===null){await u(y,"Project not found");return}let E=f.searchParams.get("linked")==="1"?f.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${f.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${f.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:f.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,M=f.searchParams.get("knowledgePromoted"),O=M!==null?`Marked ${M} lesson(s) as promoted in Agent Witch.`:null,F=f.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,B=f.searchParams.get("tab")?.trim()??"harness",be=B==="workflows"||B==="agents"||B==="knowledge"||B==="pitfalls"?B:"harness",H=f.searchParams.get("retired")==="1",Je=f.searchParams.get("edit")?.trim()||null,fo=B5(f.searchParams.get("pitfall")),ho=z(),Zt=ho===null?null:V({wsUrl:ho.wsUrl,pairingToken:ho.pairingToken}),IS=Zt===null?null:await tR(Zt,x.id),Ra=0;if(Zt!==null)try{let Xu=await fetch(`${Zt.appOrigin}/api/agent-witch/projects/${encodeURIComponent(x.id)}/knowledge`,{method:"GET",headers:{[ne]:Zt.pairingToken},signal:AbortSignal.timeout(1e4)});if(Xu.ok){let Ws=await Xu.json();typeof Ws=="object"&&Ws!==null&&typeof Ws.candidateCount=="number"&&(Ra=Ws.candidateCount)}}catch{Ra=0}let OS=Zt===null?null:await rR(Zt).listPitfalls(x.id,{includeRetired:H||be==="pitfalls"});Le(y,await n({title:x.name,activePath:"/projects",installVersion:w.installVersion,body:Mo({project:x,cloudAppOrigin:v,installed:dr(e.layout),linkedSetSlugs:lr(x.projectFolderPath),composition:IS,knowledgeCandidateCount:Ra,pitfalls:OS,pitfallsShowRetired:H,pitfallsEditId:Je,activeTab:be,flashMessage:E??O??fo?.message??null,flashError:F??fo?.error??null})}));return}if(A==="POST"&&p==="/projects/pull-bound-harness"){let f=await st(S),b=await M_({rawBody:f,layout:e.layout});if(b.kind==="not_found"){await u(y,"Project not found");return}if(b.kind==="redirect"){y.writeHead(303,{Location:b.location}),y.end();return}let w=o();Le(y,await n({title:b.title,activePath:"/projects",installVersion:w.installVersion,body:b.body}));return}if(A==="POST"&&p==="/projects/link-harness"){let f=await st(S),b=new URLSearchParams(f),w=b.get("projectId")?.trim()??"",v=await fu(e.layout),k=ur(v.projects,w);if(k===null){await u(y,"Project not found");return}let x=b.getAll("applySet").map(be=>String(be)),E=ql({layout:e.layout,projectFolderPath:k.projectFolderPath,setSlugs:x});if(!E.ok){let be=o(),H=Jt(be.installVersion);Le(y,await n({title:k.name,activePath:"/projects",installVersion:be.installVersion,body:Mo({project:k,cloudAppOrigin:H,installed:dr(e.layout),linkedSetSlugs:lr(k.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:E.errorMessage})}));return}let M=z(),O=M===null?null:V({wsUrl:M.wsUrl,pairingToken:M.pairingToken}),F=O===null?!1:await jn(O,k.id,E.appliedSetSlugs),B=new URLSearchParams({linked:"1",files:String(E.writtenFileCount),bindingsSynced:F?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(k.id)}&${B.toString()}`}),y.end();return}if(A==="POST"&&p==="/projects/remove-harness-set"){let f=await st(S),b=await N_({rawBody:f,layout:e.layout});if(b.kind==="not_found"){await u(y,"Project not found");return}if(b.kind==="redirect"){y.writeHead(303,{Location:b.location}),y.end();return}let w=o();Le(y,await n({title:b.title,activePath:"/projects",installVersion:w.installVersion,body:b.body}));return}if(A==="POST"&&p==="/project/knowledge/promote-all"){let f=await st(S),w=new URLSearchParams(f).get("projectId")?.trim()??"",v=await fu(e.layout),k=ur(v.projects,w);if(k===null){await u(y,"Project not found");return}let x=z(),E=x===null?null:V({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),M=E===null?{ok:!1,promotedCount:0}:await z5(E,k.id),O=new URLSearchParams({tab:"knowledge",...M.ok?{knowledgePromoted:String(M.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(k.id)}&${O.toString()}`}),y.end();return}let T=$M(p);if(A==="POST"&&T!==null){let f=await st(S),b=new URLSearchParams(f),w=b.get("projectId")?.trim()??"",v=await fu(e.layout),k=ur(v.projects,w);if(k===null){await u(y,"Project not found");return}let x=z(),E=x===null?null:V({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),M=E===null?null:rR(E),O=await FM({action:T,form:b,projectId:k.id,store:M});y.writeHead(303,{Location:O}),y.end();return}if(A==="GET"&&p==="/harness"){let f=new URL(S.url??"/",`http://127.0.0.1:${43347}`),b=o(),w=Yl(e.layout),v=f.searchParams.get("submitted")==="1",k=v?f.searchParams.get("syncFailed")==="1"?`Local harness updated (${f.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:f.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${f.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":f.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:f.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,x=w?.scanRoots[0]??Eg(),E=Noe(e.layout,{reveal:w,importQuery:f.searchParams.get("import")==="1",justSubmitted:v}),M=Jt(b.installVersion);Le(y,await n({title:"Harness",activePath:"/harness",installVersion:b.installVersion,body:ru(gE(e.layout,{cloudAppOrigin:M,reveal:w,scanFolder:x,flashMessage:k,importSectionExpanded:E}))}));return}if(A==="POST"&&p==="/api/harness/pick-folder"){let f=jo();if(f===null){fe(y,200,{cancelled:!0});return}fe(y,200,{path:f});return}if(A==="GET"&&p==="/api/harness/file-content"){let b=new URL(S.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=Vl(b);if(w===null){fe(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let v=hu.default.readFileSync(w,"utf8"),k=v.length>WV?`${v.slice(0,WV)}
\u2026 (truncated)`:v;fe(y,200,{content:k})}catch{fe(y,500,{errorMessage:"Could not read file."})}return}if(A==="POST"&&p==="/api/harness/reveal/add-project"){let f=await st(S),b="";try{let k=JSON.parse(f);typeof k=="object"&&k!==null&&typeof k.projectPath=="string"&&(b=k.projectPath.trim())}catch{fe(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(b.length===0){fe(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=Yl(e.layout),v=Yb({reveal:w,projectPath:b});if(v===null||v.sets.length===0){fe(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Ig(e.layout,v),fe(y,200,{ok:!0,setCount:v.sets.length});return}if(A==="GET"&&p==="/api/harness/reveal/stream"){let b=new URL(S.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(b.length===0){fe(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;S.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...SE});let v=Zb({scanRoot:b,response:y,shouldAbort:()=>w});Ig(e.layout,v),y.end();return}if(A==="POST"&&p==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(A==="POST"&&p==="/harness/submit"){let f=Yl(e.layout);if(f===null){let M=o(),O=Jt(M.installVersion);Le(y,await n({title:"Harness",activePath:"/harness",installVersion:M.installVersion,body:ru(gE(e.layout,{cloudAppOrigin:O,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let b=await st(S),w=new URLSearchParams(b),v=eR(w,f),k=e_({layout:e.layout,sets:v});if(!k.ok){let M=o(),O=Jt(M.installVersion);Le(y,await n({title:"Harness",activePath:"/harness",installVersion:M.installVersion,body:ru(gE(e.layout,{cloudAppOrigin:O,reveal:f,flashError:k.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}r_(e.layout);let E=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${k.writtenItemCount??0}${E}`}),y.end();return}if(A==="GET"&&p==="/writer-api"){let f=new URL(S.url??"/",`http://127.0.0.1:${43347}`),w=z()?.writerExecutionBackend??Be(void 0),v=Ne(e.layout.configPath),k=ko(v),x=f.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,E=o();Le(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:E.installVersion,body:ZC({writerExecutionBackend:w,secrets:k,flashMessage:x})}));return}if(A==="POST"&&p==="/writer-api"){let f=await st(S),b=new URLSearchParams(f),w=b.get("writerExecutionBackend")?.trim()??"cli";ab({configPath:e.layout.configPath,writerExecutionBackend:Be(w),anthropicApiKey:b.get("anthropicApiKey")??void 0,anthropicModel:b.get("anthropicModel")??void 0,openaiApiKey:b.get("openaiApiKey")??void 0,openaiModel:b.get("openaiModel")??void 0,googleApiKey:b.get("googleApiKey")??void 0,googleModel:b.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(A==="GET"&&p==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(A==="GET"&&p==="/history"){let f=o();Le(y,await n({title:"History",activePath:"/history",installVersion:f.installVersion,body:jC({reportsDir:e.layout.reportsDir})}));return}if(A==="GET"&&p==="/knowledge"){let b=new URL(S.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),v=dk({layout:e.layout}),k=mk(v),x=b.length>0?await Ti({layout:e.layout,query:b,limit:20}):ki(e.layout).slice(-50).reverse(),E=x.map(O=>{let F=pk(v,O.id),B=F>0?` \xB7 used in ${F} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${he(O.createdAt)}">${he(yE(O.createdAt))}${O.source?` \xB7 ${he(O.source)}`:""}${B}</div><pre>${he(O.text)}</pre></article>`}).join(""),M=k.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${k.map(O=>`<li><strong>P${O.priority}</strong> \u2014 ${he(O.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Le(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${he(b)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${zoe(b,x.length)}
            </section>${M}${E}`}));return}A==="POST"&&await st(S),await u(y,"Not found")})().catch(p=>{console.error("[agent-witch-local-app]",p),y.writeHead(500),y.end("Internal error")})});h.on("error",S=>{if(S.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",S)});let P=rE();return h.on("close",()=>{P.stop()}),h.listen(43347,"127.0.0.1",()=>{try{yy()}catch(S){let y=S instanceof Error?S.message:String(S);console.error(`[agent-witch] writeGlobalTriggers failed: ${y}`)}console.log(`[agent-witch] Local app ${Er}`)}),h},Su=e=>Uy(e).publicKeyRaw});var By=l(()=>{"use strict";bD();_D();jV()});var zV={};yt(zV,{runAgentWitchExternalLiveCli:()=>Foe});var PE,DV,$oe,Foe,HV=l(()=>{"use strict";PE=m(require("node:fs")),DV=m(require("node:path"));Cn();G();oe();By();oe();$oe=e=>{let t=DV.default.join(e,"link-code.txt");if(!PE.default.existsSync(t))return null;let r=PE.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},Foe=()=>{at("agent-witch-live");let e=R(),t=N(),r=$oe(e),o=Su(t);yu({layout:t,controllers:{getStatus:()=>{let n=_e(t);return{wsConnected:_l(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{fn(e)}}})}});var ao=C((UVe,UV)=>{"use strict";var $V=["nodebuffer","arraybuffer","fragments"],FV=typeof Blob<"u";FV&&$V.push("blob");UV.exports={BINARY_TYPES:$V,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:FV,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Pu=C((BVe,Gy)=>{"use strict";var{EMPTY_BUFFER:Uoe}=ao(),AE=Buffer[Symbol.species];function Boe(e,t){if(e.length===0)return Uoe;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new AE(r.buffer,r.byteOffset,o):r}function BV(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function GV(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function Goe(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function bE(e){if(bE.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new AE(e):ArrayBuffer.isView(e)?t=new AE(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),bE.readOnly=!1),t}Gy.exports={concat:Boe,mask:BV,toArrayBuffer:Goe,toBuffer:bE,unmask:GV};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Gy.exports.mask=function(t,r,o,n,s){s<48?BV(t,r,o,n,s):e.mask(t,r,o,n,s)},Gy.exports.unmask=function(t,r){t.length<32?GV(t,r):e.unmask(t,r)}}catch{}});var KV=C((GVe,qV)=>{"use strict";var VV=Symbol("kDone"),_E=Symbol("kRun"),wE=class{constructor(t){this[VV]=()=>{this.pending--,this[_E]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[_E]()}[_E](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[VV])}}};qV.exports=wE});var ga=C((VVe,ZV)=>{"use strict";var Au=require("zlib"),JV=Pu(),Voe=KV(),{kStatusCode:XV}=ao(),qoe=Buffer[Symbol.species],Koe=Buffer.from([0,0,255,255]),qy=Symbol("permessage-deflate"),lo=Symbol("total-length"),pa=Symbol("callback"),Qo=Symbol("buffers"),ma=Symbol("error"),Vy,kE=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Vy){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Vy=new Voe(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[pa];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){Vy.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){Vy.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Au.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Au.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[qy]=this,this._inflate[lo]=0,this._inflate[Qo]=[],this._inflate.on("error",Xoe),this._inflate.on("data",YV)}this._inflate[pa]=o,this._inflate.write(t),r&&this._inflate.write(Koe),this._inflate.flush(()=>{let s=this._inflate[ma];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=JV.concat(this._inflate[Qo],this._inflate[lo]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[lo]=0,this._inflate[Qo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Au.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Au.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[lo]=0,this._deflate[Qo]=[],this._deflate.on("data",Joe)}this._deflate[pa]=o,this._deflate.write(t),this._deflate.flush(Au.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=JV.concat(this._deflate[Qo],this._deflate[lo]);r&&(s=new qoe(s.buffer,s.byteOffset,s.length-4)),this._deflate[pa]=null,this._deflate[lo]=0,this._deflate[Qo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};ZV.exports=kE;function Joe(e){this[Qo].push(e),this[lo]+=e.length}function YV(e){if(this[lo]+=e.length,this[qy]._maxPayload<1||this[lo]<=this[qy]._maxPayload){this[Qo].push(e);return}this[ma]=new RangeError("Max payload size exceeded"),this[ma].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[ma][XV]=1009,this.removeListener("data",YV),this.reset()}function Xoe(e){if(this[qy]._inflate=null,this[ma]){this[pa](this[ma]);return}e[XV]=1007,this[pa](e)}});var fa=C((qVe,Ky)=>{"use strict";var{isUtf8:QV}=require("buffer"),{hasBlob:Yoe}=ao(),Zoe=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function Qoe(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function TE(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function ene(e){return Yoe&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Ky.exports={isBlob:ene,isValidStatusCode:Qoe,isValidUTF8:TE,tokenChars:Zoe};if(QV)Ky.exports.isValidUTF8=function(e){return e.length<24?TE(e):QV(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Ky.exports.isValidUTF8=function(t){return t.length<32?TE(t):e(t)}}catch{}});var LE=C((KVe,iq)=>{"use strict";var{Writable:tne}=require("stream"),eq=ga(),{BINARY_TYPES:rne,EMPTY_BUFFER:tq,kStatusCode:one,kWebSocket:nne}=ao(),{concat:vE,toArrayBuffer:sne,unmask:ine}=Pu(),{isValidStatusCode:ane,isValidUTF8:rq}=fa(),Jy=Buffer[Symbol.species],Rt=0,oq=1,nq=2,sq=3,CE=4,RE=5,Xy=6,EE=class extends tne{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||rne[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[nne]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Rt}_write(t,r,o){if(this._opcode===8&&this._state==Rt)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new Jy(o.buffer,o.byteOffset+t,o.length-t),new Jy(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new Jy(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Rt:this.getInfo(t);break;case oq:this.getPayloadLength16(t);break;case nq:this.getPayloadLength64(t);break;case sq:this.getMask();break;case CE:this.getData(t);break;case RE:case Xy:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[eq.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=oq:this._payloadLength===127?this._state=nq:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=sq:this._state=CE}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=CE}getData(t){let r=tq;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&ine(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=RE,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[eq.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Rt&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Rt;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=vE(o,r):this._binaryType==="arraybuffer"?n=sne(vE(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=Rt):(this._state=Xy,setImmediate(()=>{this.emit("message",n,!0),this._state=Rt,this.startLoop(t)}))}else{let n=vE(o,r);if(!this._skipUTF8Validation&&!rq(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===RE||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=Rt):(this._state=Xy,setImmediate(()=>{this.emit("message",n,!1),this._state=Rt,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,tq),this.end();else{let o=t.readUInt16BE(0);if(!ane(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new Jy(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!rq(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=Rt;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Rt):(this._state=Xy,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Rt,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[one]=n,i}};iq.exports=EE});var IE=C((XVe,cq)=>{"use strict";var{Duplex:JVe}=require("stream"),{randomFillSync:lne}=require("crypto"),{types:{isUint8Array:cne}}=require("util"),aq=ga(),{EMPTY_BUFFER:dne,kWebSocket:une,NOOP:pne}=ao(),{isBlob:ha,isValidStatusCode:mne}=fa(),{mask:lq,toBuffer:ws}=Pu(),Et=Symbol("kByteLength"),gne=Buffer.alloc(4),Yy=8*1024,ks,ya=Yy,Yt=0,fne=1,hne=2,xE=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Yt,this.onerror=pne,this[une]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||gne,r.generateMask?r.generateMask(o):(ya===Yy&&(ks===void 0&&(ks=Buffer.alloc(Yy)),lne(ks,0,Yy),ya=0),o[0]=ks[ya++],o[1]=ks[ya++],o[2]=ks[ya++],o[3]=ks[ya++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[Et]!==void 0?a=r[Et]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(lq(t,o,d,s,a),[d]):(lq(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=dne;else{if(typeof t!="number"||!mne(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(cne(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[Et]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Yt?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):ha(t)?(n=t.size,s=!1):(t=ws(t),n=t.length,s=ws.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Et]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};ha(t)?this._state!==Yt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Yt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):ha(t)?(n=t.size,s=!1):(t=ws(t),n=t.length,s=ws.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Et]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};ha(t)?this._state!==Yt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Yt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[aq.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):ha(t)?(a=t.size,c=!1):(t=ws(t),a=t.length,c=ws.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[Et]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};ha(t)?this._state!==Yt?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Yt?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[Et],this._state=hne,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(WE,this,a,n);return}this._bufferedBytes-=o[Et];let i=ws(s);r?this.dispatch(i,r,o,n):(this._state=Yt,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(yne,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[aq.extensionName];this._bufferedBytes+=o[Et],this._state=fne,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");WE(this,c,n);return}this._bufferedBytes-=o[Et],this._state=Yt,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Yt&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][Et],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][Et],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};cq.exports=xE;function WE(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function yne(e,t,r){WE(e,t,r),e.onerror(t)}});var Sq=C((YVe,yq)=>{"use strict";var{kForOnEventAttribute:bu,kListener:OE}=ao(),dq=Symbol("kCode"),uq=Symbol("kData"),pq=Symbol("kError"),mq=Symbol("kMessage"),gq=Symbol("kReason"),Sa=Symbol("kTarget"),fq=Symbol("kType"),hq=Symbol("kWasClean"),co=class{constructor(t){this[Sa]=null,this[fq]=t}get target(){return this[Sa]}get type(){return this[fq]}};Object.defineProperty(co.prototype,"target",{enumerable:!0});Object.defineProperty(co.prototype,"type",{enumerable:!0});var Ts=class extends co{constructor(t,r={}){super(t),this[dq]=r.code===void 0?0:r.code,this[gq]=r.reason===void 0?"":r.reason,this[hq]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[dq]}get reason(){return this[gq]}get wasClean(){return this[hq]}};Object.defineProperty(Ts.prototype,"code",{enumerable:!0});Object.defineProperty(Ts.prototype,"reason",{enumerable:!0});Object.defineProperty(Ts.prototype,"wasClean",{enumerable:!0});var Pa=class extends co{constructor(t,r={}){super(t),this[pq]=r.error===void 0?null:r.error,this[mq]=r.message===void 0?"":r.message}get error(){return this[pq]}get message(){return this[mq]}};Object.defineProperty(Pa.prototype,"error",{enumerable:!0});Object.defineProperty(Pa.prototype,"message",{enumerable:!0});var _u=class extends co{constructor(t,r={}){super(t),this[uq]=r.data===void 0?null:r.data}get data(){return this[uq]}};Object.defineProperty(_u.prototype,"data",{enumerable:!0});var Sne={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[bu]&&n[OE]===t&&!n[bu])return;let o;if(e==="message")o=function(s,i){let a=new _u("message",{data:i?s:s.toString()});a[Sa]=this,Zy(t,this,a)};else if(e==="close")o=function(s,i){let a=new Ts("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Sa]=this,Zy(t,this,a)};else if(e==="error")o=function(s){let i=new Pa("error",{error:s,message:s.message});i[Sa]=this,Zy(t,this,i)};else if(e==="open")o=function(){let s=new co("open");s[Sa]=this,Zy(t,this,s)};else return;o[bu]=!!r[bu],o[OE]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[OE]===t&&!r[bu]){this.removeListener(e,r);break}}};yq.exports={CloseEvent:Ts,ErrorEvent:Pa,Event:co,EventTarget:Sne,MessageEvent:_u};function Zy(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Qy=C((ZVe,Pq)=>{"use strict";var{tokenChars:wu}=fa();function wr(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function Pne(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,u=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(u===-1&&wu[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g);let P=e.slice(c,u);d===44?(wr(t,P,r),r=Object.create(null)):i=P,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(u===-1&&wu[d]===1)c===-1&&(c=g);else if(d===32||d===9)u===-1&&c!==-1&&(u=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g),wr(r,e.slice(c,u),!0),d===44&&(wr(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)a=e.slice(c,g),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(wu[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(wu[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,u=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(u===-1&&wu[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))u===-1&&(u=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g);let P=e.slice(c,u);o&&(P=P.replace(/\\/g,""),o=!1),wr(r,a,P),d===44&&(wr(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=g);let h=e.slice(c,u);return i===void 0?wr(t,h,r):(a===void 0?wr(r,h,!0):o?wr(r,a,h.replace(/\\/g,"")):wr(r,a,h),wr(t,i,r)),t}function Ane(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}Pq.exports={format:Ane,parse:Pne}});var oS=C((tqe,xq)=>{"use strict";var bne=require("events"),_ne=require("https"),wne=require("http"),_q=require("net"),kne=require("tls"),{randomBytes:Tne,createHash:vne}=require("crypto"),{Duplex:QVe,Readable:eqe}=require("stream"),{URL:ME}=require("url"),en=ga(),Cne=LE(),Rne=IE(),{isBlob:Ene}=fa(),{BINARY_TYPES:Aq,CLOSE_TIMEOUT:Lne,EMPTY_BUFFER:eS,GUID:xne,kForOnEventAttribute:NE,kListener:Wne,kStatusCode:Ine,kWebSocket:xe,NOOP:wq}=ao(),{EventTarget:{addEventListener:One,removeEventListener:Mne}}=Sq(),{format:Nne,parse:jne}=Qy(),{toBuffer:Dne}=Pu(),kq=Symbol("kAborted"),jE=[8,13],uo=["CONNECTING","OPEN","CLOSING","CLOSED"],zne=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,re=class e extends bne{constructor(t,r,o){super(),this._binaryType=Aq[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=eS,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),Tq(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){Aq.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new Cne({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new Rne(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[xe]=this,s[xe]=this,t[xe]=this,n.on("conclude",Fne),n.on("drain",Une),n.on("error",Bne),n.on("message",Gne),n.on("ping",Vne),n.on("pong",qne),s.onerror=Kne,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",Rq),t.on("data",rS),t.on("end",Eq),t.on("error",Lq),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[en.extensionName]&&this._extensions[en.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){ht(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,Cq(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){DE(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||eS,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){DE(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||eS,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){DE(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[en.extensionName]||(n.compress=!1),this._sender.send(t||eS,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){ht(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(re,"CONNECTING",{enumerable:!0,value:uo.indexOf("CONNECTING")});Object.defineProperty(re.prototype,"CONNECTING",{enumerable:!0,value:uo.indexOf("CONNECTING")});Object.defineProperty(re,"OPEN",{enumerable:!0,value:uo.indexOf("OPEN")});Object.defineProperty(re.prototype,"OPEN",{enumerable:!0,value:uo.indexOf("OPEN")});Object.defineProperty(re,"CLOSING",{enumerable:!0,value:uo.indexOf("CLOSING")});Object.defineProperty(re.prototype,"CLOSING",{enumerable:!0,value:uo.indexOf("CLOSING")});Object.defineProperty(re,"CLOSED",{enumerable:!0,value:uo.indexOf("CLOSED")});Object.defineProperty(re.prototype,"CLOSED",{enumerable:!0,value:uo.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(re.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(re.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[NE])return t[Wne];return null},set(t){for(let r of this.listeners(e))if(r[NE]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[NE]:!0})}})});re.prototype.addEventListener=One;re.prototype.removeEventListener=Mne;xq.exports=re;function Tq(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:Lne,protocolVersion:jE[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!jE.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${jE.join(", ")})`);let s;if(t instanceof ME)s=t;else try{s=new ME(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let y=new SyntaxError(c);if(e._redirects===0)throw y;tS(e,y);return}let d=i?443:80,u=Tne(16).toString("base64"),g=i?_ne.request:wne.request,h=new Set,P;if(n.createConnection=n.createConnection||(i?$ne:Hne),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(P=new en({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=Nne({[en.extensionName]:P.offer()})),r.length){for(let y of r){if(typeof y!="string"||!zne.test(y)||h.has(y))throw new SyntaxError("An invalid or duplicated subprotocol was specified");h.add(y)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let y=n.path.split(":");n.socketPath=y[0],n.path=y[1]}let S;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let y=o&&o.headers;if(o={...o,headers:{}},y)for(let[p,A]of Object.entries(y))o.headers[p.toLowerCase()]=A}else if(e.listenerCount("redirect")===0){let y=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!y||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,y||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),S=e._req=g(n),e._redirects&&e.emit("redirect",e.url,S)}else S=e._req=g(n);n.timeout&&S.on("timeout",()=>{ht(e,S,"Opening handshake has timed out")}),S.on("error",y=>{S===null||S[kq]||(S=e._req=null,tS(e,y))}),S.on("response",y=>{let p=y.headers.location,A=y.statusCode;if(p&&n.followRedirects&&A>=300&&A<400){if(++e._redirects>n.maxRedirects){ht(e,S,"Maximum redirects exceeded");return}S.abort();let T;try{T=new ME(p,t)}catch{let b=new SyntaxError(`Invalid URL: ${p}`);tS(e,b);return}Tq(e,T,r,o)}else e.emit("unexpected-response",S,y)||ht(e,S,`Unexpected server response: ${y.statusCode}`)}),S.on("upgrade",(y,p,A)=>{if(e.emit("upgrade",y),e.readyState!==re.CONNECTING)return;S=e._req=null;let T=y.headers.upgrade;if(T===void 0||T.toLowerCase()!=="websocket"){ht(e,p,"Invalid Upgrade header");return}let f=vne("sha1").update(u+xne).digest("base64");if(y.headers["sec-websocket-accept"]!==f){ht(e,p,"Invalid Sec-WebSocket-Accept header");return}let b=y.headers["sec-websocket-protocol"],w;if(b!==void 0?h.size?h.has(b)||(w="Server sent an invalid subprotocol"):w="Server sent a subprotocol but none was requested":h.size&&(w="Server sent no subprotocol"),w){ht(e,p,w);return}b&&(e._protocol=b);let v=y.headers["sec-websocket-extensions"];if(v!==void 0){if(!P){ht(e,p,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let k;try{k=jne(v)}catch{ht(e,p,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(k);if(x.length!==1||x[0]!==en.extensionName){ht(e,p,"Server indicated an extension that was not requested");return}try{P.accept(k[en.extensionName])}catch{ht(e,p,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[en.extensionName]=P}e.setSocket(p,A,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(S,e):S.end()}function tS(e,t){e._readyState=re.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function Hne(e){return e.path=e.socketPath,_q.connect(e)}function $ne(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=_q.isIP(e.host)?"":e.host),kne.connect(e)}function ht(e,t,r){e._readyState=re.CLOSING;let o=new Error(r);Error.captureStackTrace(o,ht),t.setHeader?(t[kq]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(tS,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function DE(e,t,r){if(t){let o=Ene(t)?t.size:Dne(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${uo[e.readyState]})`);process.nextTick(r,o)}}function Fne(e,t){let r=this[xe];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[xe]!==void 0&&(r._socket.removeListener("data",rS),process.nextTick(vq,r._socket),e===1005?r.close():r.close(e,t))}function Une(){let e=this[xe];e.isPaused||e._socket.resume()}function Bne(e){let t=this[xe];t._socket[xe]!==void 0&&(t._socket.removeListener("data",rS),process.nextTick(vq,t._socket),t.close(e[Ine])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function bq(){this[xe].emitClose()}function Gne(e,t){this[xe].emit("message",e,t)}function Vne(e){let t=this[xe];t._autoPong&&t.pong(e,!this._isServer,wq),t.emit("ping",e)}function qne(e){this[xe].emit("pong",e)}function vq(e){e.resume()}function Kne(e){let t=this[xe];t.readyState!==re.CLOSED&&(t.readyState===re.OPEN&&(t._readyState=re.CLOSING,Cq(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function Cq(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function Rq(){let e=this[xe];if(this.removeListener("close",Rq),this.removeListener("data",rS),this.removeListener("end",Eq),e._readyState=re.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[xe]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",bq),e._receiver.on("finish",bq))}function rS(e){this[xe]._receiver.write(e)||this.pause()}function Eq(){let e=this[xe];e._readyState=re.CLOSING,e._receiver.end(),this.end()}function Lq(){let e=this[xe];this.removeListener("error",Lq),this.on("error",wq),e&&(e._readyState=re.CLOSING,this.destroy())}});var Mq=C((oqe,Oq)=>{"use strict";var rqe=oS(),{Duplex:Jne}=require("stream");function Wq(e){e.emit("close")}function Xne(){!this.destroyed&&this._writableState.finished&&this.destroy()}function Iq(e){this.removeListener("error",Iq),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function Yne(e,t){let r=!0,o=new Jne({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(Wq,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(Wq,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",Xne),o.on("error",Iq),o}Oq.exports=Yne});var zE=C((nqe,Nq)=>{"use strict";var{tokenChars:Zne}=fa();function Qne(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&Zne[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}Nq.exports={parse:Qne}});var Uq=C((iqe,Fq)=>{"use strict";var ese=require("events"),nS=require("http"),{Duplex:sqe}=require("stream"),{createHash:tse}=require("crypto"),jq=Qy(),vs=ga(),rse=zE(),ose=oS(),{CLOSE_TIMEOUT:nse,GUID:sse,kWebSocket:ise}=ao(),ase=/^[+/0-9A-Za-z]{22}==$/,Dq=0,zq=1,$q=2,HE=class extends ese{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:nse,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:ose,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=nS.createServer((o,n)=>{let s=nS.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=lse(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=Dq}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===$q){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(ku,this);return}if(t&&this.once("close",t),this._state!==zq)if(this._state=zq,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(ku,this):process.nextTick(ku,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{ku(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",Hq);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Cs(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Cs(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!ase.test(s)){Cs(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Cs(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Tu(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=rse.parse(c)}catch{Cs(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&u!==void 0){let h=new vs({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let P=jq.parse(u);P[vs.extensionName]&&(h.accept(P[vs.extensionName]),g[vs.extensionName]=h)}catch{Cs(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let h={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(h,(P,S,y,p)=>{if(!P)return Tu(r,S||401,y,p);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(h))return Tu(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[ise])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>Dq)return Tu(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${tse("sha1").update(r+sse).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),u._protocol=g)}if(t[vs.extensionName]){let g=t[vs.extensionName].params,h=jq.format({[vs.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${h}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",Hq),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(ku,this)})),a(u,n)}};Fq.exports=HE;function lse(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function ku(e){e._state=$q,e.emit("close")}function Hq(){this.destroy()}function Tu(e,t,r,o){r=r||nS.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${nS.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Cs(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Cs),e.emit("wsClientError",i,r,t)}else Tu(r,o,n,s)}});var cse,dse,use,pse,mse,gse,Bq,fse,vu,Gq=l(()=>{cse=m(Mq(),1),dse=m(Qy(),1),use=m(ga(),1),pse=m(LE(),1),mse=m(IE(),1),gse=m(zE(),1),Bq=m(oS(),1),fse=m(Uq(),1),vu=Bq.default});var $E,Vq=l(()=>{"use strict";$E=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var hse,FE,qq=l(()=>{"use strict";Cm();Vq();hse=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",FE=(e={})=>{let t=e.env??process.env,r=$E(t[Tm]),o=$E(t[vm]);return{mode:hse(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var Kq=l(()=>{"use strict";Cm()});var Jq=l(()=>{"use strict";qq();Kq()});var UE=l(()=>{"use strict"});var po,Cu=l(()=>{"use strict";po=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Aa,Rs,Xq,Sse,BE,GE,Yq,Zq,VE,Qq,Ru,qE=l(()=>{"use strict";Aa=m(require("node:fs")),Rs=m(require("node:os")),Xq=m(require("node:path"));UE();Cu();Sse=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),BE=(e=Rs.default.hostname())=>Xq.default.join(Rs.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),GE=e=>{if(!Aa.default.existsSync(e))return null;try{let t=JSON.parse(Aa.default.readFileSync(e,"utf8"));return!Sse(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},Yq=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},Zq=(e,t)=>{Aa.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},VE=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??BE(),o=GE(r);if(o!==null&&o.pid!==process.pid&&po(o.pid)&&Yq(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Rs.default.hostname(),macOsUsername:Rs.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return Zq(r,n),{ok:!0}},Qq=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??BE(),o=GE(r);return o!==null&&o.pid!==process.pid&&po(o.pid)&&Yq(o)?{ok:!1}:(Zq(r,{hostname:Rs.default.hostname(),macOsUsername:Rs.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},Ru=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??BE();GE(r)?.pid===process.pid&&Aa.default.existsSync(r)&&Aa.default.unlinkSync(r)}});var KE,Eu,Pse,Ase,bse,_se,JE,eK=l(()=>{"use strict";KE=require("node:child_process"),Eu=m(require("node:path"));Cu();Sm();Pse=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),Ase=(e,t)=>{if(Pse(e)||!/\bnode\b/.test(e))return!1;let r=Eu.default.resolve(t),o=Eu.default.join(r,"app",Za),n=Eu.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Za||i==="agent-witch.ts")return e.includes(r);try{let a=Eu.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},bse=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,KE.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},_se=(e,t,r)=>{let o=bse(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||Ase(d,t)&&n.push(c)}return n},JE=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,KE.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=_se(r,e.installDir,t),n=[];for(let s of o)if(po(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var Lu,xu,tK,wse,XE,rK=l(()=>{"use strict";Lu=m(require("node:fs")),xu=m(require("node:path"));Fe();tK=(e,t)=>{!Lu.default.existsSync(e)||Lu.default.existsSync(t)||(Lu.default.mkdirSync(xu.default.dirname(t),{recursive:!0}),Lu.default.renameSync(e,t))},wse=e=>{if(e.profileEmail===null)return;let t=xu.default.join(e.installDir,xt);tK(xu.default.join(t,sn),e.mainLogPath),tK(xu.default.join(t,an),e.errorLogPath)},XE=e=>{let t=N();e!==void 0&&t.installDir!==e||wse(t)}});var oK=l(()=>{"use strict";_c();hf();hf();!lt()&&Pn(__agentWitchImportMetaUrl)&&(async()=>{at("agent-witch-wake-server");let e=await Fn(),t=Rr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var nK=l(()=>{"use strict";oK()});var sK=l(()=>{"use strict";uc()});var YE,iK=l(()=>{"use strict";UE();nK();qE();sK();YE=async(e={})=>{let t=e.skipInProcessBridge?null:await ff();Xg();let r=setInterval(()=>{Xg()},6e4),o=setInterval(()=>{if(!Qq().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Wu,sS,vse,aK,lK,iS,cK,dK,ZE,uK,aS,pK=l(()=>{"use strict";Wu=m(require("node:fs")),sS=m(require("node:path")),vse="pending-run-inputs.json",aK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lK=e=>{let t=e.profileEmail?sS.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return sS.default.join(t,vse)},iS=e=>{let t=lK(e);if(!Wu.default.existsSync(t))return{};try{let r=JSON.parse(Wu.default.readFileSync(t,"utf8"));return aK(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!aK(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},cK=(e,t)=>{let r=lK(e);Wu.default.mkdirSync(sS.default.dirname(r),{recursive:!0}),Wu.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},dK=e=>Object.values(iS(e)),ZE=(e,t)=>iS(e)[t]!==void 0,uK=(e,t)=>{let r=iS(e);r[t.agentRunId]=t,cK(e,r)},aS=(e,t)=>{let r=iS(e);delete r[t],cK(e,r)}});var lS=l(()=>{"use strict";ee()});var mK=l(()=>{"use strict";ee()});var cS=l(()=>{"use strict";ee()});var dS=l(()=>{"use strict";ee()});var Iu=l(()=>{"use strict";ee()});var Cse,Rse,Ou,QE=l(()=>{"use strict";Ot();lS();mK();cS();dS();Iu();Cse={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},Rse={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Ou=e=>{if(!Se(e.writerAgent))return"the selected writer";let t=dt(e.writerAgent);if(Be(e.writerExecutionBackend)==="api"&&t!==null){let r=Qe(Ne(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=vl(t,r.model);return`${Rse[t]} model ${o}`}}return Cse[e.writerAgent]}});var Ese,Lse,gK,fK,hK=l(()=>{"use strict";Ese=/"input_tokens"\s*:\s*(\d+)/,Lse=/"output_tokens"\s*:\s*(\d+)/,gK=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},fK=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=gK(Ese.exec(t)),o=gK(Lse.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var uS=l(()=>{"use strict";Dt()});var Mu,pS,xse,eL,yK,SK,PK,tL,AK=l(()=>{"use strict";Mu=m(require("node:fs")),pS=m(require("node:path"));uS();xse="run-completion-outbox.json",eL=e=>{let t=e.profileEmail?pS.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return pS.default.join(t,xse)},yK=e=>{let t=eL(e);if(!Mu.default.existsSync(t))return[];try{let r=JSON.parse(Mu.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},SK=(e,t)=>{Mu.default.mkdirSync(pS.default.dirname(eL(e)),{recursive:!0}),Mu.default.writeFileSync(eL(e),JSON.stringify(t,null,2),"utf8")},PK=(e,t)=>{let r=[...yK(e).filter(o=>o.runId!==t.runId),t];SK(e,r)},tL=async e=>{if(e.cloudApi===null)return;let t=yK(e.layout);if(t.length===0)return;let r=[];for(let o of t)await rc(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);SK(e.layout,r)}});var bK=l(()=>{"use strict"});var rL,Nu,Ise,Es,_K=l(()=>{"use strict";bK();rL=new Map,Nu=e=>{let t=rL.get(e);t!==void 0&&(clearInterval(t),rL.delete(e))},Ise=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},Es=(e,t,r,o={})=>{Nu(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Nu(t);return}let i=o.onTick?.()??{};Ise(e,t,n,i)};s(),rL.set(t,setInterval(s,15e3))}});var wK=l(()=>{"use strict";Dt()});var kK,TK=l(()=>{"use strict";wK();kK=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Ge(t)}});var oL,ju,mo,nL,kr,vK,mS=l(()=>{"use strict";oL=new Set,ju=new Map,mo=(e,t)=>{if(t.length===0)return;let r=ju.get(e)??[];r.push(t),ju.set(e,r)},nL=e=>{oL.add(e);let t=ju.get(e)??[];return ju.delete(e),t},kr=e=>oL.has(e),vK=e=>{oL.delete(e),ju.delete(e)}});var ba,CK,RK,EK=l(()=>{"use strict";ba=m(require("node:path")),CK=require("node:url");Sn();RK=()=>{if(lt()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?ba.default.dirname(ba.default.resolve(e)):ba.default.dirname(ba.default.resolve(__filename))}return ba.default.dirname((0,CK.fileURLToPath)(__agentWitchImportMetaUrl))}});var LK,xK,WK,IK,it,_a,OK,MK,wa,sL,iL,aL,NK,lL,jK,gS=l(()=>{"use strict";LK=require("node:crypto"),xK=m(require("node:fs")),WK=m(require("node:path")),IK=require("node:url");Cu();Sn();EK();it=new Map,OK=async()=>{if(_a!==void 0)return _a;try{if(lt()){let e=RK(),t=WK.default.join(e,"deps","node-pty","lib","index.js");if(xK.default.existsSync(t)){let r=await import((0,IK.pathToFileURL)(t).href);return _a=r,r}}return _a=await import("node-pty"),_a}catch{return _a=null,null}},MK=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},wa=(e,t,r)=>{let o=it.get(e);if(o!==void 0){it.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},sL=(e,t)=>{let r=it.get(e);return r===void 0?!1:(r.pty.write(t),!0)},iL=(e,t,r)=>{let o=it.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},aL=e=>{for(let t of it.values())if(!(t.mode!=="agent"||t.runId!==e))return po(t.pty.pid);return!1},NK=e=>{for(let[t,r]of it.entries())if(!(r.mode!=="agent"||r.runId!==e)){it.delete(t);try{r.pty.kill()}catch{}return!0}return!1},lL=async e=>{let t=await OK();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;it.get(e.shellSessionId)!==void 0&&wa(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return it.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{MK(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{it.get(e.shellSessionId)?.pty===n&&(it.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},jK=async e=>{let t=e.shellSessionId??(0,LK.randomUUID)(),r=await OK();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return it.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{MK(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{it.get(t)?.pty===o&&(it.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var fS,DK,zK=l(()=>{"use strict";fS="[[AWAITING_INPUT]]",DK=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",fS,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Du,HK,hS=l(()=>{"use strict";zK();Du=e=>{let t=e.indexOf(fS);if(t<0)return null;let o=e.slice(t+fS.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},HK=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",DK].join(`
`)});var $K,FK=l(()=>{"use strict";mS();gS();hS();$K=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(kr(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}mo(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await jK({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Du(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var BK,GK,VK,UK,go,yS=l(()=>{"use strict";BK=require("node:child_process"),GK=m(require("node:fs")),VK=m(require("node:path"));Sm();UK=12e4,go=(e,t)=>{let r=VK.default.join(e,"app",CI,"ensure-writer.sh");return GK.default.existsSync(r)?new Promise((o,n)=>{let s=(0,BK.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},a=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(UK/1e3)}s`))},UK);s.on("error",c=>{clearTimeout(a),n(c)}),s.on("close",c=>{if(clearTimeout(a),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var qK,Ls,Hu,SS,cL,zu,PS,AS,dL,uL,Ose,ka,Mse,Nse,pL,mL=l(()=>{"use strict";qK=require("node:child_process");Ot();yS();cS();lS();Iu();dS();Ls=new Map,Hu=e=>e==="cursor"||e==="antigravity",SS=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",cL=e=>Ls.get(e)?.warmed===!0,zu=e=>{let t=Ls.get(e);Ls.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},PS=e=>Ls.get(e)?.conversationStarted===!0,AS=e=>{let t=Ls.get(e);Ls.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},dL=e=>{Ls.delete(e)},uL=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",Ose={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ka=e=>`${Ose[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,Mse=(e,t,r,o)=>new Promise(n=>{let s=Fm(t,r),i=[],a=(0,qK.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),Nse=(e,t)=>{let r=ka(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},pL=async e=>{if(!Se(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Be(e.runConfig.writerExecutionBackend)==="api"){let r=dt(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Ne(e.runConfig.layout.configPath);return Qe(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),zu(e.writerAgent),{exitCode:0,output:ka(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await go(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}Hu(e.writerAgent)&&zu(e.writerAgent);let t=await Mse(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?Nse(e.writerAgent,t.output):ka(e.writerAgent)}}});var xs,gL=l(()=>{"use strict";xs={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var KK,jse,Dse,JK,zse,fL,XK=l(()=>{"use strict";gL();KK=/you(?:'|')ve hit your session limit/i,jse=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],Dse=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,JK=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},zse=e=>{let t=Dse.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},fL=e=>{let t=e.trim();if(t.length===0)return null;if(KK.test(t))return{code:xs.SESSION_LIMIT,resetHint:zse(t),matchedLine:JK(t,KK)};for(let r of jse)if(r.test(t))return{code:xs.PROVIDER_QUOTA,resetHint:null,matchedLine:JK(t,r)};return null}});var bS,_S,hL,yL=l(()=>{"use strict";bS="[[AGENT_RUN_WRITER_EXECUTION]]",_S="cli-writer-api-key-missing",hL="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var SL=l(()=>{"use strict";yL()});var YK=l(()=>{"use strict";SL()});var wS=l(()=>{"use strict";gL();XK();yL();SL();YK()});var kS,ZK=l(()=>{"use strict";kS={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var QK,eJ=l(()=>{"use strict";QK="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var tJ,rJ=l(()=>{"use strict";wS();eJ();tJ=e=>e.code===xs.SESSION_LIMIT?QK:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var oJ,nJ=l(()=>{"use strict";wS();ZK();rJ();oJ=e=>{let t=fL(e.output);return t!==null?{status:kS.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:tJ(t)}:{status:e.exitCode===0?kS.COMPLETED:kS.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var PL,mJe,sJ=l(()=>{"use strict";PL={OPEN:"open",APPROVAL:"approval"},mJe=PL.APPROVAL});var Ta,TS,iJ,Fse,aJ,lJ,cJ,$u,AL,bL=l(()=>{"use strict";Ta=m(require("node:fs")),TS=m(require("node:path")),iJ="runs",Fse=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aJ=e=>{let t=e.profileEmail!==null?TS.default.join(e.installDir,"profiles",e.profileEmail,iJ):TS.default.join(e.installDir,iJ);return Ta.default.mkdirSync(t,{recursive:!0}),t},lJ=(e,t)=>TS.default.join(aJ(e),`${t}.json`),cJ=(e,t)=>{Ta.default.writeFileSync(lJ(e,t.id),JSON.stringify(t,null,2))},$u=(e,t)=>{let r=lJ(e,t);if(!Ta.default.existsSync(r))return null;try{let o=JSON.parse(Ta.default.readFileSync(r,"utf8"));return!Fse(o)||typeof o.id!="string"?null:o}catch{return null}},AL=e=>{let t=aJ(e),r=Ta.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=$u(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var Use,dJ,uJ=l(()=>{"use strict";nJ();sJ();bL();Use=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=oJ({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:PL.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},dJ=(e,t)=>{let r=Use(t);return cJ(e,r),r}});var pJ=l(()=>{"use strict";Iy()});var mJ,gJ=l(()=>{"use strict";wS();mJ=()=>[bS,`agentRunWriterExecutionBackend=${_S}`,`agentRunWriterExecutionReasonCode=${hL}`].join(`
`)});var tn,vS=l(()=>{"use strict";tn=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var _L,Bse,Gse,fJ,hJ=l(()=>{"use strict";_L=e=>e.toLocaleString("en-US"),Bse=e=>e<.01?e.toFixed(4):e.toFixed(3),Gse=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${Bse(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${_L(e.inputTokens)} in / ${_L(e.outputTokens)} out (${_L(e.totalTokens)} total)`,t].join(`
`)},fJ=(e,t)=>{if(t===void 0)return e;let r=Gse(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var yJ=l(()=>{"use strict";ee()});var PJ,Fu,we,wL,CS,SJ,Vse,qse,AJ,bJ,_J,Uu,kL,TL,vL,wJ,Kse,Lt,Bu,rn,kJ,Jse,Xse,RS,CL,RL,EL,TJ=l(()=>{"use strict";PJ=require("node:child_process");ee();Ot();pK();Xd();QE();hK();Tl();AK();uS();_K();Cu();TK();mS();gS();hS();FK();mL();uJ();pJ();gJ();vS();hJ();Ks();yJ();Iu();ol();hS();Fu=new Map,we=new Map,wL=new Set,CS=new Map,SJ=e=>{e!==void 0&&!CS.has(e)&&CS.set(e,Date.now())},Vse=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(kr(t)){Lt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}mo(t,n)},qse=(e,t,r,o,n)=>{if(!cb(e,n))return;let s=`${mJ()}
`;Vse(t,r,o,s);let i=we.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},AJ=130,bJ=`

Stopped by user.`,_J=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:tn(e)},Uu=null,kL=e=>{Uu=e},TL=(e,t)=>{if(Uu===null)return;let r=OC(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||c_(Uu,t,r)},vL=async e=>{await tL({layout:e,cloudApi:Uu})},wJ=e=>{let t=Fu.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:po(t.pid)},Kse=e=>Pe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),Lt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Bu=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Us(s),c=we.get(r);if(a!==null&&c!==void 0){let d=jI(a),u=wJ(r)||aL(r);d!==null&&!u&&rn(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return NI(a)}}),rn=(e,t,r,o,n,s,i,a)=>{let c=ri(s,a),d=n,u=fJ(c.output,c.llmUsage);if(r!==void 0){let h=CS.get(r);CS.delete(r),h!==void 0&&WC({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-h)/1e3))});let P=fK(c.llmUsage,u);P!==null&&l5({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:P})}r!==void 0&&wL.has(r)&&(wL.delete(r),d=AJ,u=u.trim().length>0&&!u.includes("Stopped by user.")?`${u.trim()}${bJ}`:"Stopped by user.");let g=r!==void 0?OC(e.layout.reportsDir,r):null;if(r!==void 0){Nu(r),Il(e.layout,r),kr(r)&&(Lt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),vK(r));let h=we.get(r);s5({reportsDir:e.layout.reportsDir,agentRunId:r,input:tn(i),output:u,...h!==void 0?{writerLabel:Ou({writerAgent:h.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),h!==void 0&&xy({layout:e.layout,writerAgent:h.writerAgent,projectFolderPath:h.projectFolderPath,userPrompt:h.userTranscriptPrompt,assistantOutput:u,agentRunId:r}),dJ(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:u,layout:e.layout}),PK(e.layout,{runId:r,exitCode:d,output:u,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),tL({layout:e.layout,cloudApi:Uu}),we.delete(r),Fu.delete(r),aS(e.layout,r)}Lt(t,{type:"command.claude.result",payload:{exitCode:d,output:u,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),gl(e.layout)},kJ=(e,t,r,o,n,s,i)=>{let a=we.get(r),c=a?.accumulatedOutput??s;uK(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),Es(t,r,()=>ZE(e.layout,r),Bu(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),Lt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},Jse=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,u=P=>{if(!(n===void 0||P.length===0)){if(kr(n)){Lt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:P},requestId:o});return}mo(n,P)}};if(n!==void 0){let P=we.get(n);Fu.set(n,t),we.set(n,{originalPrompt:s,userTranscriptPrompt:P?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:P?.projectFolderPath,reportKey:P?.reportKey,accumulatedOutput:P?.accumulatedOutput??""}),Lt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),Es(r,n,()=>wJ(n),Bu(e,r,n,o,P?.projectFolderPath,P?.reportKey))}let g=a==="claude-cli",h=[];t.stdout?.on("data",P=>{let S=P.toString("utf8");if(g?h.push(S):(c.push(S),u(S)),d||n===void 0)return;let y=Du(c.join(""));if(y!==null){d=!0,t.kill("SIGTERM");let p=we.get(n),A=[p?.accumulatedOutput??"",y.partialOutput].filter(T=>T.length>0).join(`

`);p!==void 0&&(p.accumulatedOutput=A),Fu.delete(n),kJ(e,r,n,o,y.question,A,s)}}),t.stderr?.on("data",P=>{let S=P.toString("utf8");c.push(S),u(S)}),t.on("close",P=>{if(d)return;AS(a);let S=n!==void 0?we.get(n):void 0,y=g?ri(h.join("")):{output:c.join("").trim(),llmUsage:void 0},p=g?c.join("").trim():"",A=[y.output.trim(),p].filter(f=>f.length>0).join(`
`);g&&y.output.trim().length>0&&u(y.output);let T=S!==void 0&&S.accumulatedOutput.length>0?`${S.accumulatedOutput}

${A}`.trim():A;rn(e,r,n,o,P??-1,T,s,y.llmUsage)}),t.on("error",P=>{d||rn(e,r,n,o,-1,P.message,s)})},Xse=(e,t,r,o,n,s,i,a,c)=>{let d=_J(r,c);s!==void 0&&(we.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),Lt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),Es(n,s,()=>we.has(s),Bu(e,n,s,o,i,a))),El(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(kr(s)){Lt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}mo(s,g)}}).then(g=>{AS(t),rn(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let h=g instanceof Error?g.message:String(g);rn(e,n,s,o,-1,h,r)})},RS=(e,t,r,o,n,s,i,a,c,d,u,g)=>{let h=_J(r,u);if(ml(e.layout),Ln(e,t)){SJ(s),Xse(e,t,r,o,n,s,c,d,h);return}let P=ir(t,r,Kse(e),i);if(P===null){rn(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}SJ(s);let S=kK({workspace:e.workspace,projectFolderPath:c}),y=()=>{let p=(0,PJ.spawn)(P.command,[...P.args],{cwd:S,stdio:["ignore","pipe","pipe"],env:g??process.env});Jse(e,p,n,o,s,r,h,t)};if(s===void 0){y();return}we.set(s,{originalPrompt:r,userTranscriptPrompt:h,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:we.get(s)?.accumulatedOutput??""}),qse(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&rl({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),Es(n,s,()=>we.has(s),Bu(e,n,s,o,c,d)),$K({socket:n,sendMessage:Lt,requestId:o,agentRunId:s,shellSessionId:a,command:P.command,args:P.args,cwd:S,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:p=>{a!==void 0&&wa(a,f=>{Lt(n,f)},o);let A=we.get(s),T=[A?.accumulatedOutput??"",p.partialOutput].filter(f=>f.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=T),kJ(e,n,s,o,p.question,T,r)},onFinished:(p,A)=>{AS(t);let T=ri(A),f=we.get(s),b=f!==void 0&&f.accumulatedOutput.length>0?`${f.accumulatedOutput}

${T.output}`.trim():T.output;rn(e,n,s,o,p,b,r,T.llmUsage)}}).then(p=>{if(!p){y();return}Es(n,s,()=>aL(s),Bu(e,n,s,o,c,d))}).catch(p=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",p instanceof Error?p.message:p),y()})},CL=(e,t,r,o)=>{aS(e.layout,t.agentRunId),t.shellSessionId!==void 0&&Lt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=HK(t),s=we.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;RS(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},RL=(e,t)=>{for(let r of dK(e.layout))we.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:tn(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Es(t,r.agentRunId,()=>ZE(e.layout,r.agentRunId),{awaitingInput:!0}),Lt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},EL=(e,t,r,o)=>{let n=we.get(r);if(n===void 0)return!1;wL.add(r),Nu(r);let s=Fu.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(NK(r))return!0;aS(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${bJ}`:"Stopped by user.";return rn(e,t,r,o,AJ,i,n.originalPrompt),!0}});var Yse,LL,vJ=l(()=>{"use strict";Dl();Yse=()=>`http://127.0.0.1:${Mt()}/restart`,LL=async()=>{try{let e=await fetch(Yse(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var CJ=l(()=>{"use strict";Cc()});var RJ=l(()=>{"use strict";dR()});var EJ,LJ=l(()=>{"use strict";EJ=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Gu,Zse,xL,xJ=l(()=>{"use strict";G();oe();CJ();gw();RJ();LJ();Ks();Gu=(e,t)=>{Do(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},Zse=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(TA(),kA)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},xL=async e=>{let t=Ue(e.layout.installDir)?.bundleVersion??null;if(!EJ({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(It(e.layout)){fl({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Gu(e.layout,{summary:r,action:"install-bundle-update-start"}),Cr({launchAgentLabel:ye(e.layout.installDir),installDir:e.layout.installDir});let o=await aa({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),Gu(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await Zse();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Gu(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),Gu(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),Gu(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var Qse,WL,WJ=l(()=>{"use strict";Qse=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),WL=e=>{if(!Qse(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var IL,OL,IJ=l(()=>{"use strict";X_();Y_();IL=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=pc({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},OL=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Nr(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var OJ,eie,tie,rie,Vu,MJ=l(()=>{"use strict";OJ=m(require("node:os"));Fe();eie="Default",tie=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),rie=e=>{let t=OJ.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Vu=()=>{let e=N(),t=Ua(e),r=tie(eie);return`${rie(t)}/${r.length>0?r:"project"}`}});var NJ=l(()=>{"use strict";Cc()});var jJ,ML,DJ=l(()=>{"use strict";NJ();jJ=!1,ML=e=>{jJ||(jJ=!0,process.on("uncaughtException",t=>{Bn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;Bn(e,{kind:"crash",message:r,stack:o})}))}});var zJ,oie,NL,HJ=l(()=>{"use strict";zJ=require("node:child_process");yS();Ot();cS();lS();Iu();dS();oie=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,zJ.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},NL=async e=>{if(!Se(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Be(e.runConfig.writerExecutionBackend)==="api"){let r=dt(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Ne(e.layout.configPath),n=Qe(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await go(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await oie(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var jL,$J=l(()=>{"use strict";jL=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var FJ,DL,UJ=l(()=>{"use strict";FJ=require("node:crypto"),DL=()=>(0,FJ.randomUUID)()});var va,BJ,ES=l(()=>{"use strict";va="[[WORKING_ESTIMATE]]",BJ=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",va,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var GJ,VJ=l(()=>{"use strict";GJ=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var nie,qJ,KJ=l(()=>{"use strict";ES();nie=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,qJ=e=>{if(!e.includes(va))return null;let t=null;for(let r of e.matchAll(nie)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var sie,zL,JJ=l(()=>{"use strict";KJ();sie=/^(\d{1,6})\b/,zL=e=>{let t=qJ(e);if(t!==null)return t;let r=sie.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var iie,aie,lie,LS,HL=l(()=>{"use strict";Ot();kc();iie="http://127.0.0.1:11434",aie=45e3,lie=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},LS=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||iie,o=t===void 0?(await Ht({commands:Pe({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(aie)});return n.ok?lie(await n.json()):null}catch{return null}}});var $L,FL,UL,XJ=l(()=>{"use strict";ol();ES();vS();VJ();JJ();Xd();HL();$L=async e=>{let t=tn(e.wrappedPrompt),r=i5(e.reportsDir);return{estimateOutput:await LS(BJ(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},FL=e=>{let t=zL(e.estimateOutput);t!==null&&ky({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},UL=e=>{let t=zL(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=GJ(t);return tl({reportKey:e.reportKey,agentRunId:e.agentRunId,status:or.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),ky({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var xS,YJ,BL=l(()=>{"use strict";xS="[[WORKING_TOKEN_ESTIMATE]]",YJ=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",xS,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var ZJ,cie,QJ,e4=l(()=>{"use strict";BL();ZJ=/^(\d{1,8})\b/,cie=e=>{let t=e.indexOf(xS);if(t<0)return null;let r=e.slice(t+xS.length).trim(),o=ZJ.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},QJ=e=>{let t=cie(e);if(t!==null)return t;let r=ZJ.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var GL,VL,t4=l(()=>{"use strict";BL();vS();e4();Xd();HL();GL=async e=>{let t=tn(e.wrappedPrompt),r=c5(e.reportsDir);return{estimateOutput:await LS(YJ(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},VL=e=>{let t=QJ(e.estimateOutput);return t===null?null:(a5({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var r4=l(()=>{"use strict";qE();eK();rK();iK();Dl();TJ();yS();Ot();bL();mS();vJ();ow();xJ();Ks();WJ();IJ();uS();MJ();DJ();HJ();Pm();$J();UJ();ES();ol();XJ();t4();QE();kc();gS();mL()});var o4={};yt(o4,{buildContinuationPromptWithContext:()=>pie});var die,uie,pie,n4=l(()=>{"use strict";die=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,uie=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),pie=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=uie(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${die(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var s4={};yt(s4,{readHarnessExportSets:()=>gie});var qu,qL,WS,mie,gie,i4=l(()=>{"use strict";qu=m(require("node:fs")),qL=m(require("node:path"));Fe();WS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mie=e=>{if(!qu.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(qu.default.readFileSync(e.harnessManifestPath,"utf8"));if(WS(t))return t}catch{return null}return null},gie=(e,t)=>{let r=N(t),o=mie(r);if(o===null)return[];let n=WS(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!WS(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let u of c){if(!WS(u))continue;let g=typeof u.path=="string"?u.path:void 0,h=typeof u.id=="string"?u.id:"",P=typeof u.kind=="string"?u.kind:"",S=typeof u.title=="string"?u.title:"";if(g===void 0||h.length===0||P.length===0||S.length===0)continue;let y=g.startsWith("shared/")?qL.default.join(r.harnessRootDir,g):qL.default.join(r.harnessSetsDir,i,g);qu.default.existsSync(y)&&d.push({id:h,kind:P,title:S,content:qu.default.readFileSync(y,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var ex,JL,Ca,a4,fie,l4,c4,KL,d4,XL,YL,ZL,Q,J,QL,hie,Ku,yie,Sie,Pie,Aie,bie,_ie,wie,kie,Ju,u4=l(()=>{"use strict";ex=require("node:child_process"),JL=m(require("node:fs")),Ca=m(require("node:os"));Gq();G();oe();Cn();mE();Jq();ee();oE();ee();sr();Cc();_k();By();Iy();Dt();Lo();kw();St();r4();a4=3e4,fie=3e4,l4=new Map,c4=new Map,KL=new Map,d4=new Map,XL=new Map,YL=new Map,ZL=new Map,Q=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),J=(e,t,r)=>{e.readyState===vu.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Do(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),yf(r,"out",t)))},QL=e=>e,hie=e=>{if(!JL.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(JL.default.readFileSync(e.harnessManifestPath,"utf8"));if(Q(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Ku=(e,t)=>{let r=hie(t);r!==null&&J(e,{type:"harness.manifest.report",payload:{hostname:Ca.default.hostname(),manifest:r}})},yie=async(e,t,r,o,n,s,i=!1,a,c,d,u,g)=>{let h=g?.trim()??"";if(!Se(t)){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let P=Ou({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),S=await Ht({commands:Pe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),y=s!==void 0?$L({wrappedPrompt:r,writerLabel:P,reportsDir:e.layout.reportsDir,estimateModel:S?.estimateModel,capabilityNote:S?.capabilityNote}).catch(()=>null):null,p=s!==void 0?GL({wrappedPrompt:r,writerLabel:P,reportsDir:e.layout.reportsDir,estimateModel:S?.estimateModel,capabilityNote:S?.capabilityNote}).catch(()=>null):null,A=Hu(t)&&!cL(t);if(A){try{await go(e.layout.installDir,t)}catch(H){let Je=H instanceof Error?H.message:String(H);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Je}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}zu(t)}else if(!Hu(t))try{await go(e.layout.installDir,t)}catch(H){let Je=H instanceof Error?H.message:String(H);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Je}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let T=xl(d,Vu,g);if(T===null){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Xe({projectFolderPath:T,...h.length>0?{projectId:h}:{}}),i||tu(e.layout,t,T);let f=Wy({sessionContinuation:i,supportsWriterSessionContinuation:SS(t),isWriterConversationStarted:PS(t)}),b=i&&f==="first"?eu(e.layout,t,T):null,w=b!==null?ia(e.layout,b):null,v=w!==null&&w.turns.length>0,k=JC({sessionContinuation:i,supportsWriterSessionContinuation:SS(t),isWriterConversationStarted:PS(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:v,userPromptCharacterCount:r.length}),x=r;if(k.continuationStrategy==="source_run_seed"){let H=typeof c=="string"&&c.length>0?$u(e.layout,c):null;if(H!==null){let{buildContinuationPromptWithContext:Je}=await Promise.resolve().then(()=>(n4(),o4));x=Je({priorPrompt:H.prompt,priorOutput:H.resultOutput??"",userMessage:r})}}else k.continuationStrategy==="transcript_seed"&&w!==null&&w.turns.length>0&&(x=Cy({priorTurns:w.turns,userMessage:r}));let E=k.ragLimit>0?await Ti({layout:e.layout,query:x,limit:k.ragLimit,minScore:k.ragMinScore,projectFolderPath:T,...h.length>0?{projectId:h}:{}}):[],M=k.ragLimit>0&&T.trim().length>0?await Ak({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:T,...h.length>0?{projectId:h}:{}}):[],O=k.injectMemory?zC(e.layout,T,h.length>0?h:void 0):[],F=`${$C(O,k.memoryEntryLimit)}${yk(E)}${bk(M)}${x}`,B=u?.trim()??(s!==void 0&&T.trim().length>0?DL():void 0);if(s!==void 0&&B!==void 0&&B.length>0&&T.trim().length>0){rl({reportKey:B,agentRunId:s,userSummary:"Working on your Mac\u2026"});let H=F;y!==null&&y.then(Je=>{if(Je===null)return;let fo=UL({estimateOutput:Je.estimateOutput??"",reportKey:B,agentRunId:s,reportsDir:e.layout.reportsDir,task:Je.task,writerLabel:Je.writerLabel,embedding:Je.embedding});if(fo.estimateSeconds===null)return;TL(e.layout.reportsDir,s);let ho=`${va}
${fo.estimateSeconds}
`;if(kr(s)){J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:ho},requestId:o});return}mo(s,ho)}).catch(()=>{}),F=jL(H),F=YP(F,{agentRunId:s,reportKey:B,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&y!==null&&y.then(H=>{H!==null&&FL({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel,embedding:H.embedding})}).catch(()=>{}),s!==void 0&&p!==null&&p.then(H=>{H!==null&&VL({estimateOutput:H.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:H.task,writerLabel:H.writerLabel})}).catch(()=>{});let be=s!==void 0&&ZL.get(s)===!0;if(s!==void 0&&T.trim().length>0){let H=await Kg(T);YL.set(s,H),B!==void 0&&B.length>0&&XL.set(s,B)}RS(e,t,F,o,QL(n),s,{sessionTurn:k.sessionTurn},a,T,B,r,nb(e.layout,s,be)),A&&s!==void 0&&J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:uL(t)},requestId:o})},Sie=async(e,t,r,o,n)=>{let s=(i,a)=>{J(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await pL({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:Pe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,J(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=Se(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?ka(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},Pie=(e,t,r)=>new Promise(o=>{if(!Se(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=ir(t,r,Pe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,ex.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),Aie=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;J(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=cr(t.bundle),s=Q(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=Ie(e.wsUrl)??ct,g=await Bb({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=On({bundle:i,layout:e.layout});return J(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&Ku(o,e.layout),!0},bie=async(e,t,r,o)=>{if(await Aie(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(J(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!Se(n)){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}ml(e.layout);let i=await(async()=>{try{await go(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return Pie(e,n,s)})().finally(()=>{gl(e.layout)});J(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),Ku(o,e.layout)},_ie=e=>{let t=1e3*2**e;return Math.min(fie,t)},wie=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=p=>t.restartInFlight?"already_in_progress":It(e.layout)?(hl(p),console.log(`[agent-witch] Deferring local restart (${p}) until the active writer task finishes.`),"deferred_writer_busy"):(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${p})\u2026`),t.wakeError=`restart:${p}`,LL().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1}),"accepted"),o=(p,A,T,f)=>{J(p,{type:"device.restart.ack",payload:mb({status:T,reason:A}),...f!==void 0?{requestId:f}:{}},e.layout)},n=(p,A="system.ack")=>{if(!t.selfUpdateInFlight){if(It(e.layout)){fl({layout:e.layout,remoteBundleVersion:p,trigger:A}),console.log(`[agent-witch] Deferring install bundle update (${p} via ${A}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,xL({layout:e.layout,remoteBundleVersion:p,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1})}},s=()=>{let p=_e(e.layout);p!==null&&Oe(p,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,c(),d(),S())},i=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},a=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},c=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},d=()=>{if(t.socket===void 0)return;let p=t.socket;t.socket=void 0,t.wsConnected=!1,p.removeAllListeners("open"),p.removeAllListeners("message"),p.removeAllListeners("close"),p.on("error",()=>{}),(p.readyState===vu.OPEN||p.readyState===vu.CONNECTING)&&p.close()},u=()=>{a(),t.localHealthTimer=setInterval(s,a4)},g=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let p=_ie(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${p}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,S()},p)},h=p=>{i();let A=()=>{let T=al(e.layout.installDir),f=Mt();J(p,{type:"agent.heartbeat",payload:{hostname:Ca.default.hostname(),macOsUsername:Ca.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},installBundleVersion:T}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,a4)},P=(p,A)=>{if(typeof p.type!="string")return;if(ww(p)){t.stopped=!0,i(),c(),d(),Aw({layout:e.layout}).finally(()=>{Ru(),process.exit(0)});return}Do(e.layout,{direction:"in",type:p.type,summary:"inbound WS frame"}),yf(e.layout,"in",p);let T=typeof p.requestId=="string"?p.requestId:void 0;if(p.type==="device.auth.attestation"&&Q(p.payload)){let f=typeof p.payload.serverPublicKey=="string"?p.payload.serverPublicKey:"",b=typeof p.payload.origin=="string"?p.payload.origin:"",w=typeof p.payload.devicePublicKey=="string"?p.payload.devicePublicKey:"",v=typeof p.payload.challenge=="string"?p.payload.challenge:"",k=typeof p.payload.serverAttestation=="string"?p.payload.serverAttestation:"";if(!pE({serverPublicKey:f,origin:b,devicePublicKey:w,challenge:v,serverAttestation:k})){t.wakeError="Server attestation verification failed",Do(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(p.type==="writer.ensure"&&Q(p.payload)){let f=typeof p.payload.writerAgent=="string"?p.payload.writerAgent:"";Do(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),NL({layout:e.layout,writerAgent:f,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(b=>{J(A,{type:"writer.status",payload:b},e.layout)})}if(p.type==="install.bundle.update"&&Q(p.payload)){let f=typeof p.payload.bundleVersion=="string"?p.payload.bundleVersion.trim():"";f.length>0&&n(f,"install.bundle.update")}if(p.type==="system.ack"){Dm(e.layout,{wsUrl:e.wsUrl});let f=Q(p.payload)?p.payload:null,b=WL(f);b!==null&&n(b)}if(p.type==="device.restart"){let f=r("cloud-device-restart");o(A,"cloud-device-restart",f,T)}if(p.type==="automations.sync"&&Q(p.payload)&&IL(p.payload),p.type==="project.message.history"&&Q(p.payload)){KR({payload:p.payload});return}if(p.type==="automations.run"&&Q(p.payload)&&OL(p.payload),p.type==="terminal.stream.accepted"&&Q(p.payload)){let f=typeof p.payload.runId=="string"?p.payload.runId:"";if(f.length>0){let b=nL(f);for(let w of b)J(A,{type:"terminal.stream.chunk",payload:{runId:f,chunk:w},requestId:T})}}if(p.type==="agent.agentRun.list"&&J(A,{type:"dashboard.agentRun.list.result",payload:{runs:AL(e.layout)},requestId:T}),p.type==="agent.agentRun.get"&&Q(p.payload)){let f=typeof p.payload.runId=="string"?p.payload.runId:"",b=f.length>0?$u(e.layout,f):null;J(A,{type:"dashboard.agentRun.get.result",payload:{run:b},requestId:T})}if(p.type==="command.claude.run"&&Q(p.payload)){let f=p.payload.prompt,b=typeof p.payload.writerAgent=="string"&&Se(p.payload.writerAgent)?p.payload.writerAgent:"claude-cli",w=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,v=p.payload.sessionContinuation===!0,k=typeof p.payload.sourceRunId=="string"?p.payload.sourceRunId:void 0,x=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:void 0,E=typeof p.payload.projectId=="string"?p.payload.projectId:void 0,M=xl(typeof p.payload.projectFolderPath=="string"?p.payload.projectFolderPath:void 0,Vu,E),O=YA(p.payload.compositionSnapshot),F=typeof p.payload.reportKey=="string"?p.payload.reportKey:void 0;if(typeof f=="string"&&f.trim().length>0){if(console.log(`[agent-witch] Running ${b} task (${v?"continue":"first"})\u2026`),M===null){J(A,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...w!==void 0?{agentRunId:w}:{}},requestId:T});return}if(O!==null){let B=QA(e.layout,O);if(B!==null){J(A,{type:"command.claude.result",payload:{exitCode:-1,output:B,...w!==void 0?{agentRunId:w}:{}},requestId:T});return}if(w!==void 0){let be=tb(e.layout,w,O);if(!be.ok){J(A,{type:"command.claude.result",payload:{exitCode:-1,output:be.errorMessage,...w!==void 0?{agentRunId:w}:{}},requestId:T});return}ZL.set(w,O.entries.some(H=>H.scope==="run"))}}w!==void 0&&x!==void 0&&l4.set(w,x),w!==void 0&&(c4.set(w,M),E!==void 0&&E.trim().length>0&&KL.set(w,E.trim()),d4.set(w,f.trim()),Xe({projectFolderPath:M,...E!==void 0&&E.trim().length>0?{projectId:E.trim()}:{}})),yie(e,b,f.trim(),T,A,w,v,x,k,M,F,E)}}if(p.type==="shell.session.open"&&Q(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",b=typeof p.payload.cols=="number"?p.payload.cols:120,w=typeof p.payload.rows=="number"?p.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),lL({shellSessionId:f,cwd:e.workspace,cols:b,rows:w,send:v=>{J(A,v)},requestId:T}))}if(p.type==="shell.session.close"&&Q(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"";f.length>0&&wa(f,b=>{J(A,b)},T)}if(p.type==="shell.input"&&Q(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",b=typeof p.payload.data=="string"?p.payload.data:"";f.length>0&&b.length>0&&sL(f,b)}if(p.type==="shell.resize"&&Q(p.payload)){let f=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",b=typeof p.payload.cols=="number"?p.payload.cols:0,w=typeof p.payload.rows=="number"?p.payload.rows:0;f.length>0&&b>0&&w>0&&iL(f,b,w)}if(p.type==="command.writer.session.end"&&Q(p.payload)){let f=p.payload.writerAgent;typeof f=="string"&&Se(f)&&(dL(f),Ly(e.layout,f))}if(p.type==="command.writer.session.start"&&Q(p.payload)){let f=p.payload.writerAgent,b=typeof p.payload.writerSessionId=="string"?p.payload.writerSessionId:"";typeof f=="string"&&Se(f)&&b.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),Sie(e,f,b,T,A))}if(p.type==="command.claude.stop"&&Q(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),EL(e,QL(A),f,T))}if(p.type==="command.claude.input_respond"&&Q(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"",b=typeof p.payload.response=="string"?p.payload.response.trim():"",w=typeof p.payload.originalPrompt=="string"?p.payload.originalPrompt:"",v=typeof p.payload.partialOutput=="string"?p.payload.partialOutput:"",k=typeof p.payload.question=="string"?p.payload.question:"";f.length>0&&b.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),CL(e,{agentRunId:f,originalPrompt:w,partialOutput:v,question:k,response:b,shellSessionId:l4.get(f)},T,QL(A)))}if(p.type==="dispatch.approval.required"&&Q(p.payload)){let f=typeof p.payload.requesterEmail=="string"?p.payload.requesterEmail:"A teammate",b=typeof p.payload.prompt=="string"?p.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${b}`),process.platform==="darwin"&&(0,ex.spawn)("osascript",["-e",`display notification "${b.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(p.type==="harness.request"&&Q(p.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),bie(e,p.payload,T,A)),p.type==="harness.export.request"&&Q(p.payload)){let f=typeof p.payload.borrowerUserId=="string"?p.payload.borrowerUserId:"",b=typeof p.payload.targetDeviceId=="string"?p.payload.targetDeviceId:void 0,w=Array.isArray(p.payload.setSlugs)?p.payload.setSlugs.filter(v=>typeof v=="string"):[];f.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:v}=await Promise.resolve().then(()=>(i4(),s4)),k=v(w,e.email);J(A,{type:"harness.export.result",payload:{success:k.length>0,borrowerUserId:f,...b!==void 0?{targetDeviceId:b}:{},sets:k,errorMessage:k.length>0?void 0:"No readable harness sets were found on this machine."},requestId:T})})()}if(p.type==="harness.manifest.request"&&Ku(A,e.layout),p.type==="command.claude.result"&&Q(p.payload)){let f=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,b=typeof p.payload.output=="string"?p.payload.output:"",w=typeof p.payload.exitCode=="number"?p.payload.exitCode:null,v=xl(f!==void 0?c4.get(f):void 0,Vu),k=f!==void 0?KL.get(f):void 0,x=f!==void 0?d4.get(f)??"":"",E=j_({exitCode:w,output:b});if(E&&v!==null&&hk({layout:e.layout,text:b,source:f??"command.claude.result",projectFolderPath:v,...k!==void 0?{projectId:k}:{}}),w!=null&&w!==0&&b.trim().length>0&&v!==null&&(uk({layout:e.layout,errorText:b,projectFolderPath:v,...k!==void 0?{projectId:k}:{}}),Pk({layout:e.layout,text:b,source:f??"command.claude.result.failure",projectFolderPath:v,...k!==void 0?{projectId:k}:{}})),E&&x.trim().length>0&&v!==null&&HC({layout:e.layout,projectFolderPath:v,...k!==void 0?{projectId:k}:{},entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:x,output:b,createdAt:new Date().toISOString()}}),f!==void 0&&v!==null){let O=XL.get(f),F=YL.get(f);O!==void 0&&F!==void 0&&Kg(v).then(B=>{let be=$_({before:F,after:B});ZP(O,be),YL.delete(f),XL.delete(f)})}if(E&&k!==void 0&&k.trim().length>0){let O=z(),F=O===null?null:V({wsUrl:O.wsUrl,pairingToken:O.pairingToken});F!==null&&U_(F,k,{...f!==void 0?{sourceRunId:f}:{},lesson:F_({prompt:x,output:b})})}f!==void 0&&(Il(e.layout,f),ZL.delete(f),KL.delete(f))}},S=()=>{if(t.stopped)return;c(),d();let p=new vu(e.wsUrl);t.socket=p,p.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),kL(V({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),vL(e.layout);let A=Ie(e.wsUrl)??"http://localhost:3000",T=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=uE({layout:e.layout,origin:A,...T!==void 0&&T.length>0?{claimToken:T}:{}});J(p,{type:"agent.register",payload:{role:"agent",hostname:Ca.default.hostname(),macOsUsername:Ca.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),Ku(p,e.layout),RL(e,p),h(p)}),p.on("message",A=>{let T=typeof A=="string"?A:A.toString("utf8");try{let f=JSON.parse(T);if(!Q(f))return;P(f,p)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),p.on("close",(A,T)=>{i(),t.socket=void 0,t.wsConnected=!1,CA(e.layout),t.reconnectAttempt+=1;let f=typeof T=="string"?T:T.toString("utf8");Bn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:f}),console.log("[agent-witch] Disconnected from server."),g()}),p.on("error",A=>{t.wakeError=A.message,Bn(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})},y=()=>{t.stopped=!0,i(),a(),c(),d()};return SA(()=>{let p=PA();p!==null&&p.layout.installDir===e.layout.installDir&&p.layout.profileEmail===e.layout.profileEmail&&n(p.remoteBundleVersion,p.trigger);let A=AA();A!==null&&r(A)}),{connect:S,startLocalHealthCheck:u,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:_l(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Su(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,S()},reportHarnessManifestIfConnected:()=>{let p=t.socket;return!t.wsConnected||p===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Ku(p,e.layout),{ok:!0})}}},kie=async()=>{at("agent-witch");let e=FE(),t=R();VE().ok||(process.platform==="darwin"?(await fn(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),XE(t);let o=JE({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(Cr({launchAgentLabel:ye(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Ka());let n=await pb(),s=n[0];s!==void 0&&ML(s.layout);for(let P of n){let S=Ie(P.wsUrl)??ct;ll(P.layout.installDir,S)}let i=n.map(P=>wie(P)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),Ru(),process.exit(0));let c=()=>{n.forEach((P,S)=>{let y=i[S];if(y===void 0)return;let p=_e(P.layout);RA(p,{socketOpen:y.hasMacSocketOpen(),staleAfterMs:12e4})&&y.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let P=n[0]?.layout;P!==void 0&&(It(P)||hc(P.installDir))},g=await YE({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):yu({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let P of i)P.startLocalHealthCheck(),P.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let h=Rr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Ja(),d()});d=()=>{h(),g.stop(),Ru(),console.log("[agent-witch] Shutting down.");for(let P of i)P.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Ju=kie});var tx=l(()=>{"use strict";u4()});var p4={};yt(p4,{startAgentWitchClient:()=>Ju});var m4=l(()=>{"use strict";tx();tx();Sn();QP();bm();if(!lt()&&Pn(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Am(process.argv.slice(e))),Ju()}});JP();QP();Sn();bm();var HI="20.x",$I="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var lX=e=>[`Node.js ${HI} or newer is required (found ${e}).`,$I].join(" "),FI=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${lX(process.version)}
`),process.exit(1))};var Tie=async()=>{at("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(TA(),kA)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},vie=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(Pj(),Sj)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},Cie=async()=>{if(!Pn(lt()?void 0:__agentWitchImportMetaUrl))return;FI();let e=process.argv.indexOf("report");e>=0&&process.exit(Am(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await Tie();return}if(t==="wake"){await vie();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(AD(),PD));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(HV(),zV));o();return}if(t==="mcp"){let{resolveAgentWitchLocalLayout:o}=await Promise.resolve().then(()=>(G(),VW)),{runAwlMcpStdio:n}=await Promise.resolve().then(()=>(LC(),X2));await n({layout:o()});return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(m4(),p4));await r()};Cie();
