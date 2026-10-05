#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var $q=Object.create;var $y=Object.defineProperty;var Fq=Object.getOwnPropertyDescriptor;var Hq=Object.getOwnPropertyNames;var Uq=Object.getPrototypeOf,Bq=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var T=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},ft=(e,t)=>{for(var r in t)$y(e,r,{get:t[r],enumerable:!0})},Gq=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Hq(t))!Bq.call(e,n)&&n!==r&&$y(e,n,{get:()=>t[n],enumerable:!(o=Fq(t,n))||o.enumerable});return e};var g=(e,t,r)=>(r=e!=null?$q(Uq(e)):{},Gq(t||!e||!e.__esModule?$y(r,"default",{value:e,enumerable:!0}):r,e));var ta,sL,iL,ra,Fy,Moe,aL,lu,Gt,hr,cu,du,ls,cs,Le,Hy,uu,pu,mu,oa,vt,zo,$o,na,eo,Uy,lL,Ae=l(()=>{"use strict";ta={production:".agent-witch",localhost:".local-agent-witch"},sL={production:47892,localhost:47893},iL={production:"com.agent-witch",localhost:"com.local-agent-witch"},ra={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Fy="app",Moe=`${Fy}/agent-witch.js`,aL=`${Fy}/command`,lu={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Gt=ta.production,hr=ta.localhost,cu=sL.production,du=sL.localhost,ls=iL.production,cs=iL.localhost,Le="profiles",Hy=ra.activeProfile,uu="harness",pu="sets",mu="manifest.json",oa=lu.projectsDir,vt=lu.logsDir,zo="agent-witch.log",$o="agent-witch.error.log",na=lu.reportsDir,eo=lu.deviceKeypairJson,Uy=Fy,lL="agent-witch.js"});var cL=l(()=>{"use strict";Ae()});var dL,to,sa,gu=l(()=>{"use strict";dL=g(require("node:path"));Ae();to=e=>dL.default.basename(e)===hr,sa=e=>to(e)?cs:ls});var uL=l(()=>{"use strict";cL();gu()});var pL,By,Vq,ia,qq,Kq,mL,Jq,Xq,gL=l(()=>{"use strict";uL();Ae();pL=g(require("node:os")),By=g(require("node:path")),Vq=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?By.default.resolve(e):By.default.join(pL.default.homedir(),Gt)},ia=sa(Vq()),qq=`${ia}-wake`,Kq=`${ia}-live`,mL=`${ia}-watchdog`,Jq=`${ia}-automation-scheduler`,Xq=`${ia}-updater`});var ds=T(Gy=>{"use strict";Object.defineProperty(Gy,"__esModule",{value:!0});Gy.stringify=Yq;function Yq(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var M=T(Vy=>{"use strict";Object.defineProperty(Vy,"__esModule",{value:!0});Vy.generateTypeGuardError=Zq;var fL=ds();function Zq(e,t,r){return(0,fL.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,fL.stringify)(e)}) to be "${r}"`}});var ro=T(fu=>{"use strict";Object.defineProperty(fu,"__esModule",{value:!0});fu.isNonNullObject=void 0;var Qq=M(),eK=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,Qq.generateTypeGuardError)(e,t.identifier,"non-null object")),r};fu.isNonNullObject=eK});var Vt=T(be=>{"use strict";Object.defineProperty(be,"__esModule",{value:!0});be.attachTypeGuardMeta=be.isArrayTypeGuard=be.isNestedObjectTypeGuard=be.getTypeGuardWrapperKind=be.getTypeGuardInnerGuard=be.getTypeGuardItemGuard=be.getTypeGuardSchema=void 0;var tK=e=>e.schema;be.getTypeGuardSchema=tK;var rK=e=>e.itemGuard;be.getTypeGuardItemGuard=rK;var oK=e=>e.innerGuard;be.getTypeGuardInnerGuard=oK;var nK=e=>e.wrapperKind;be.getTypeGuardWrapperKind=nK;var sK=e=>{if((0,be.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};be.isNestedObjectTypeGuard=sK;var iK=e=>{if((0,be.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};be.isArrayTypeGuard=iK;var aK=(e,t)=>Object.assign(e,t);be.attachTypeGuardMeta=aK});var aa=T(Fo=>{"use strict";Object.defineProperty(Fo,"__esModule",{value:!0});Fo.getExpectedTypeName=Fo.getTypeGuardDisplayName=void 0;var hL=Vt(),lK=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};Fo.getTypeGuardDisplayName=lK;var cK=e=>{let t=(0,hL.getTypeGuardWrapperKind)(e),r=(0,hL.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,Fo.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};Fo.getExpectedTypeName=cK});var Ho=T(hu=>{"use strict";Object.defineProperty(hu,"__esModule",{value:!0});hu.createValidationResult=void 0;var dK=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});hu.createValidationResult=dK});var us=T(yu=>{"use strict";Object.defineProperty(yu,"__esModule",{value:!0});yu.createValidationError=void 0;var uK=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});yu.createValidationError=uK});var ps=T(Su=>{"use strict";Object.defineProperty(Su,"__esModule",{value:!0});Su.createTreeNode=void 0;var pK=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Su.createTreeNode=pK});var la=T(Pu=>{"use strict";Object.defineProperty(Pu,"__esModule",{value:!0});Pu.combineResults=void 0;var mK=Ho(),gK=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,mK.createValidationResult)(r,o,n)};Pu.combineResults=gK});var bu=T(Au=>{"use strict";Object.defineProperty(Au,"__esModule",{value:!0});Au.createSimplifiedTree=void 0;var yL=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=yL(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},fK=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=yL(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Au.createSimplifiedTree=fK});var da=T(wu=>{"use strict";Object.defineProperty(wu,"__esModule",{value:!0});wu.validateObject=void 0;var hK=ro(),ca=Ho(),yK=us(),_u=ps(),SK=la(),SL=Tu(),PK=(e,t,r)=>{let o=()=>{let i=(0,yK.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,_u.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,ca.createValidationResult)(!1,[],a):(0,ca.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,ca.createValidationResult)(!0,[],(0,_u.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...u]=c,m=d,S=t[m],f=e[m],y=(0,SL.validateProperty)(m,f,S,r);return y.valid?u.length===0?(0,ca.createValidationResult)(!0,[],(0,_u.createTreeNode)(r.path,!0,"object",e)):a(u):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,SL.validateProperty)(d,e[d],u,r)}),a=(0,SK.combineResults)(i,r.path),c=(0,_u.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,ca.createValidationResult)(a.valid,a.errors,c)};return(0,hK.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};wu.validateObject=PK});var AL=T(ku=>{"use strict";Object.defineProperty(ku,"__esModule",{value:!0});ku.validateArray=void 0;var AK=ds(),Cu=Ho(),PL=us(),vu=ps(),bK=la(),_K=da(),wK=aa(),TK=Vt(),CK=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,PL.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,vu.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,Cu.createValidationResult)(!1,[c],d)}let n=(0,TK.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,m={path:u,config:r.config||null};if(n)return(0,_K.validateObject)(c,n,m);let S=t(c,null),f=(0,wK.getExpectedTypeName)(t),y=(0,AK.stringify)(c);if(S)return(0,Cu.createValidationResult)(!0,[],(0,vu.createTreeNode)(u,!0,f,c));let p=y.length>200?`Expected ${u} to be "${f}"`:`Expected ${u} (${y}) to be "${f}"`,P=(0,PL.createValidationError)(u,f,c,p),A=(0,vu.createTreeNode)(u,!1,f,c);return A.errors=[P],(0,Cu.createValidationResult)(!1,[P],A)}),i=(0,bK.combineResults)(s,o),a=(0,vu.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,Cu.createValidationResult)(i.valid,i.errors,a)};ku.validateArray=CK});var Tu=T(Lu=>{"use strict";Object.defineProperty(Lu,"__esModule",{value:!0});Lu.validateProperty=void 0;var bL=Ho(),vK=us(),_L=ps(),kK=aa(),Eu=Vt(),EK=da(),LK=AL(),RK=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,Eu.getTypeGuardSchema)(r),c=(0,Eu.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,EK.validateObject)(t,a,s);if(c&&(0,Eu.isArrayTypeGuard)(r))return(0,LK.validateArray)(t,c,s)}let d=u=>{let m=r(t,u),S=(0,kK.getExpectedTypeName)(r);return m?(0,bL.createValidationResult)(!0,[],(0,_L.createTreeNode)(n,!0,S,t)):(()=>{let f=(0,vK.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,_L.createTreeNode)(n,!1,S,t);return y.errors=[f],(0,bL.createValidationResult)(!1,[f],y)})()};if((0,Eu.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};Lu.validateProperty=RK});var xu=T(Ru=>{"use strict";Object.defineProperty(Ru,"__esModule",{value:!0});Ru.isNil=void 0;var xK=M(),WK=function(e,t){return e!=null?(t&&t.callbackOnError((0,xK.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Ru.isNil=WK});var qy=T(Wu=>{"use strict";Object.defineProperty(Wu,"__esModule",{value:!0});Wu.isDefined=void 0;var IK=M(),OK=xu(),MK=function(e,t){return(0,OK.isNil)(e,null)?(t&&t.callbackOnError((0,IK.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Wu.isDefined=MK});var Ky=T(Iu=>{"use strict";Object.defineProperty(Iu,"__esModule",{value:!0});Iu.reportValidationResults=void 0;var NK=bu(),wL=qy(),DK=xu(),jK=(e,t)=>{if(e.valid===!0||(0,DK.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,wL.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,NK.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,wL.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Iu.reportValidationResults=jK});var Jy=T(ne=>{"use strict";Object.defineProperty(ne,"__esModule",{value:!0});ne.Validation=ne.reportValidationResults=ne.validateObject=ne.validateProperty=ne.createSimplifiedTree=ne.combineResults=ne.createTreeNode=ne.createValidationError=ne.createValidationResult=ne.getExpectedTypeName=void 0;var zK=aa();Object.defineProperty(ne,"getExpectedTypeName",{enumerable:!0,get:function(){return zK.getExpectedTypeName}});var $K=Ho();Object.defineProperty(ne,"createValidationResult",{enumerable:!0,get:function(){return $K.createValidationResult}});var FK=us();Object.defineProperty(ne,"createValidationError",{enumerable:!0,get:function(){return FK.createValidationError}});var HK=ps();Object.defineProperty(ne,"createTreeNode",{enumerable:!0,get:function(){return HK.createTreeNode}});var UK=la();Object.defineProperty(ne,"combineResults",{enumerable:!0,get:function(){return UK.combineResults}});var BK=bu();Object.defineProperty(ne,"createSimplifiedTree",{enumerable:!0,get:function(){return BK.createSimplifiedTree}});var GK=Tu();Object.defineProperty(ne,"validateProperty",{enumerable:!0,get:function(){return GK.validateProperty}});var VK=da();Object.defineProperty(ne,"validateObject",{enumerable:!0,get:function(){return VK.validateObject}});var qK=Ky();Object.defineProperty(ne,"reportValidationResults",{enumerable:!0,get:function(){return qK.reportValidationResults}});var KK=Ho(),JK=la(),XK=us(),YK=ps(),ZK=Tu(),QK=da(),e4=Ky(),t4=bu();ne.Validation={result:KK.createValidationResult,combine:JK.combineResults,error:XK.createValidationError,treeNode:YK.createTreeNode,property:ZK.validateProperty,object:QK.validateObject,report:e4.reportValidationResults,createSimplifiedTree:t4.createSimplifiedTree}});var Ou=T(Xy=>{"use strict";Object.defineProperty(Xy,"__esModule",{value:!0});Xy.isType=o4;var TL=ro(),CL=Jy(),r4=Vt();function o4(e){if(!(0,TL.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,CL.validateObject)(r,e,s);return(0,CL.reportValidationResults)(i,o||null),i.valid}return(0,TL.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,r4.attachTypeGuardMeta)(t,{schema:e})}});var LL=T(Uo=>{"use strict";Object.defineProperty(Uo,"__esModule",{value:!0});Uo.isNestedType=Uo.isShape=void 0;Uo.isSchema=ua;var vL=ro(),kL=Jy(),EL=Vt();function ua(e){if(!(0,vL.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=s4(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,kL.validateObject)(o,t,i);return(0,kL.reportValidationResults)(a,n||null),a.valid}return(0,vL.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,EL.attachTypeGuardMeta)(r,{schema:t})}function n4(e){return typeof e=="function"?e:Array.isArray(e)?i4(e):typeof e=="object"&&e!==null?ua(e):e}function s4(e){let t={};for(let[r,o]of Object.entries(e))t[r]=n4(o);return t}function i4(e){let t=e[0],r=ua(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,EL.attachTypeGuardMeta)(o,{itemGuard:r})}Uo.isShape=ua;Uo.isNestedType=ua});var RL=T(Yy=>{"use strict";Object.defineProperty(Yy,"__esModule",{value:!0});Yy.isObjectWith=l4;var a4=Ou();function l4(e){return(0,a4.isType)(e)}});var xL=T(Zy=>{"use strict";Object.defineProperty(Zy,"__esModule",{value:!0});Zy.isObject=d4;var c4=Ou();function d4(e){return(0,c4.isType)(e)}});var WL=T(Qy=>{"use strict";Object.defineProperty(Qy,"__esModule",{value:!0});Qy.guardWithTolerance=u4;function u4(e,t,r){return t(e,r),e}});var IL=T(eS=>{"use strict";Object.defineProperty(eS,"__esModule",{value:!0});eS.isBranded=m4;var p4=M();function m4(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,p4.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var OL=T(Mu=>{"use strict";Object.defineProperty(Mu,"__esModule",{value:!0});Mu.BrandSymbols=void 0;Mu.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var ML=T(Nu=>{"use strict";Object.defineProperty(Nu,"__esModule",{value:!0});Nu.isAny=void 0;var g4=function(e){return!0};Nu.isAny=g4});var pa=T(tS=>{"use strict";Object.defineProperty(tS,"__esModule",{value:!0});tS.reportTypeGuardError=h4;var f4=M();function h4(e,t,r){e&&e.callbackOnError((0,f4.generateTypeGuardError)(t,e.identifier,r))}});var NL=T(Du=>{"use strict";Object.defineProperty(Du,"__esModule",{value:!0});Du.isBoolean=void 0;var y4=pa(),S4=function(t,r){return typeof t!="boolean"?((0,y4.reportTypeGuardError)(r,t,"boolean"),!1):!0};Du.isBoolean=S4});var DL=T(ju=>{"use strict";Object.defineProperty(ju,"__esModule",{value:!0});ju.isDate=void 0;var P4=M(),A4=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,P4.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};ju.isDate=A4});var rS=T(zu=>{"use strict";Object.defineProperty(zu,"__esModule",{value:!0});zu.isNumber=void 0;var b4=pa(),_4=function(t,r){return typeof t!="number"||isNaN(t)?((0,b4.reportTypeGuardError)(r,t,"number"),!1):!0};zu.isNumber=_4});var jL=T($u=>{"use strict";Object.defineProperty($u,"__esModule",{value:!0});$u.isString=void 0;var w4=pa(),T4=function(t,r){return typeof t!="string"?((0,w4.reportTypeGuardError)(r,t,"string"),!1):!0};$u.isString=T4});var zL=T(Fu=>{"use strict";Object.defineProperty(Fu,"__esModule",{value:!0});Fu.isUnknown=void 0;var C4=function(e){return!0};Fu.isUnknown=C4});var $L=T(Hu=>{"use strict";Object.defineProperty(Hu,"__esModule",{value:!0});Hu.isFunction=void 0;var v4=M(),k4=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,v4.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Hu.isFunction=k4});var HL=T(Uu=>{"use strict";Object.defineProperty(Uu,"__esModule",{value:!0});Uu.isFile=void 0;var FL=M(),E4=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,FL.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,FL.generateTypeGuardError)(e,t.identifier,"File")),!1)};Uu.isFile=E4});var BL=T(Bu=>{"use strict";Object.defineProperty(Bu,"__esModule",{value:!0});Bu.isFileList=void 0;var UL=M(),L4=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,UL.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,UL.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Bu.isFileList=L4});var VL=T(Gu=>{"use strict";Object.defineProperty(Gu,"__esModule",{value:!0});Gu.isBlob=void 0;var GL=M(),R4=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,GL.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,GL.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Gu.isBlob=R4});var KL=T(Vu=>{"use strict";Object.defineProperty(Vu,"__esModule",{value:!0});Vu.isFormData=void 0;var qL=M(),x4=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,qL.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,qL.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Vu.isFormData=x4});var XL=T(qu=>{"use strict";Object.defineProperty(qu,"__esModule",{value:!0});qu.isURL=void 0;var JL=M(),W4=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,JL.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,JL.generateTypeGuardError)(e,t.identifier,"URL")),!1)};qu.isURL=W4});var ZL=T(Ku=>{"use strict";Object.defineProperty(Ku,"__esModule",{value:!0});Ku.isURLSearchParams=void 0;var YL=M(),I4=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,YL.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,YL.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Ku.isURLSearchParams=I4});var QL=T(Ju=>{"use strict";Object.defineProperty(Ju,"__esModule",{value:!0});Ju.isMap=void 0;var O4=M(),M4=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,O4.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Ju.isMap=M4});var eR=T(Xu=>{"use strict";Object.defineProperty(Xu,"__esModule",{value:!0});Xu.isSet=void 0;var N4=M(),D4=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,N4.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Xu.isSet=D4});var tR=T(oS=>{"use strict";Object.defineProperty(oS,"__esModule",{value:!0});oS.isIndexSignature=z4;var j4=M();function z4(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,j4.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,u)=>{let m=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),f=t(m,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return S&&f})}}});var rR=T(Yu=>{"use strict";Object.defineProperty(Yu,"__esModule",{value:!0});Yu.isError=void 0;var $4=pa(),F4=function(t,r){return t instanceof Error?!0:((0,$4.reportTypeGuardError)(r,t,"Error"),!1)};Yu.isError=F4});var sS=T(nS=>{"use strict";Object.defineProperty(nS,"__esModule",{value:!0});nS.isArrayWithEachItem=B4;var H4=M(),U4=Vt();function B4(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,H4.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,U4.attachTypeGuardMeta)(t,{itemGuard:e})}});var iS=T(Zu=>{"use strict";Object.defineProperty(Zu,"__esModule",{value:!0});Zu.isNonEmptyArray=void 0;var G4=M(),V4=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,G4.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Zu.isNonEmptyArray=V4});var oR=T(aS=>{"use strict";Object.defineProperty(aS,"__esModule",{value:!0});aS.isNonEmptyArrayWithEachItem=J4;var q4=sS(),K4=iS();function J4(e){return function(t,r){return(0,q4.isArrayWithEachItem)(e)(t,r)&&(0,K4.isNonEmptyArray)(t,r)}}});var sR=T(lS=>{"use strict";Object.defineProperty(lS,"__esModule",{value:!0});lS.isTuple=X4;var nR=M();function X4(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,nR.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,nR.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var iR=T(cS=>{"use strict";Object.defineProperty(cS,"__esModule",{value:!0});cS.isObjectWithEachItem=Z4;var Y4=M();function Z4(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,Y4.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var aR=T(dS=>{"use strict";Object.defineProperty(dS,"__esModule",{value:!0});dS.isPartialOf=eJ;var Q4=ro();function eJ(e){return function(t,r){if(!(0,Q4.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var lR=T(uS=>{"use strict";Object.defineProperty(uS,"__esModule",{value:!0});uS.isPick=rJ;var tJ=ro();function rJ(e,...t){return function(r,o){if(!(0,tJ.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var cR=T(pS=>{"use strict";Object.defineProperty(pS,"__esModule",{value:!0});pS.isOmit=nJ;var oJ=ro();function nJ(e,...t){return function(r,o){if(!(0,oJ.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),m=u.indexOf(" ("),S=m>=0?u.slice(0,m):u;if(a.has(S))return!1;let f=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(f&&!Object.prototype.hasOwnProperty.call(r,f))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var dR=T(Qu=>{"use strict";Object.defineProperty(Qu,"__esModule",{value:!0});Qu.isNonEmptyString=void 0;var sJ=M(),iJ=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,sJ.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Qu.isNonEmptyString=iJ});var uR=T(ep=>{"use strict";Object.defineProperty(ep,"__esModule",{value:!0});ep.isNonNegativeNumber=void 0;var aJ=M(),lJ=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,aJ.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};ep.isNonNegativeNumber=lJ});var pR=T(tp=>{"use strict";Object.defineProperty(tp,"__esModule",{value:!0});tp.isPositiveNumber=void 0;var cJ=M(),dJ=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,cJ.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};tp.isPositiveNumber=dJ});var mR=T(rp=>{"use strict";Object.defineProperty(rp,"__esModule",{value:!0});rp.isNonPositiveNumber=void 0;var uJ=M(),pJ=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,uJ.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};rp.isNonPositiveNumber=pJ});var gR=T(op=>{"use strict";Object.defineProperty(op,"__esModule",{value:!0});op.isNegativeNumber=void 0;var mJ=M(),gJ=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,mJ.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};op.isNegativeNumber=gJ});var fR=T(np=>{"use strict";Object.defineProperty(np,"__esModule",{value:!0});np.isInteger=void 0;var fJ=M(),hJ=rS(),yJ=function(e,t){return!(0,hJ.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,fJ.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};np.isInteger=yJ});var hR=T(sp=>{"use strict";Object.defineProperty(sp,"__esModule",{value:!0});sp.isPositiveInteger=void 0;var SJ=M(),PJ=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,SJ.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};sp.isPositiveInteger=PJ});var yR=T(ip=>{"use strict";Object.defineProperty(ip,"__esModule",{value:!0});ip.isNegativeInteger=void 0;var AJ=M(),bJ=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,AJ.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};ip.isNegativeInteger=bJ});var SR=T(ap=>{"use strict";Object.defineProperty(ap,"__esModule",{value:!0});ap.isNonNegativeInteger=void 0;var _J=M(),wJ=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,_J.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};ap.isNonNegativeInteger=wJ});var PR=T(lp=>{"use strict";Object.defineProperty(lp,"__esModule",{value:!0});lp.isNonPositiveInteger=void 0;var TJ=M(),CJ=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,TJ.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};lp.isNonPositiveInteger=CJ});var AR=T(dp=>{"use strict";Object.defineProperty(dp,"__esModule",{value:!0});dp.isNumeric=void 0;var cp=M(),vJ=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,cp.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,cp.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,cp.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,cp.generateTypeGuardError)(e,t.identifier,"number key")),!1};dp.isNumeric=vJ});var bR=T(up=>{"use strict";Object.defineProperty(up,"__esModule",{value:!0});up.isBooleanLike=void 0;var mS=M(),kJ=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,mS.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,mS.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};up.isBooleanLike=kJ});var _R=T(pp=>{"use strict";Object.defineProperty(pp,"__esModule",{value:!0});pp.isDateLike=void 0;var ma=M(),EJ=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,ma.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,ma.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,ma.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,ma.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,ma.generateTypeGuardError)(e,t.identifier,"date-like")),!1};pp.isDateLike=EJ});var wR=T(mp=>{"use strict";Object.defineProperty(mp,"__esModule",{value:!0});mp.isBigInt=void 0;var LJ=M(),RJ=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,LJ.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};mp.isBigInt=RJ});var fS=T(gS=>{"use strict";Object.defineProperty(gS,"__esModule",{value:!0});gS.isOneOf=xJ;var TR=ds();function xJ(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,TR.stringify)(t)}) must be one of following values ${e.map(TR.stringify).join(" | ")}`),o}}});var CR=T(hS=>{"use strict";Object.defineProperty(hS,"__esModule",{value:!0});hS.isOneOfTypes=OJ;var WJ=ds(),IJ=aa();function OJ(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,WJ.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,IJ.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;a.includes(u)||a.push(u)}})),r.callbackOnError(a.join(`
`))}return n}}});var vR=T(yS=>{"use strict";Object.defineProperty(yS,"__esModule",{value:!0});yS.isIntersectionOf=MJ;function MJ(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var kR=T(SS=>{"use strict";Object.defineProperty(SS,"__esModule",{value:!0});SS.isExtensionOf=NJ;function NJ(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var ER=T(PS=>{"use strict";Object.defineProperty(PS,"__esModule",{value:!0});PS.isNullOr=jJ;var DJ=Vt();function jJ(e){function t(r,o){return r===null?!0:e(r,o)}return(0,DJ.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var LR=T(AS=>{"use strict";Object.defineProperty(AS,"__esModule",{value:!0});AS.isUndefinedOr=$J;var zJ=Vt();function $J(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,zJ.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var RR=T(bS=>{"use strict";Object.defineProperty(bS,"__esModule",{value:!0});bS.isNilOr=HJ;var FJ=Vt();function HJ(e){function t(r,o){return r==null?!0:e(r,o)}return(0,FJ.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var xR=T(_S=>{"use strict";Object.defineProperty(_S,"__esModule",{value:!0});_S.isAsserted=UJ;function UJ(e){return!0}});var WR=T(wS=>{"use strict";Object.defineProperty(wS,"__esModule",{value:!0});wS.isEnum=GJ;var BJ=fS();function GJ(e){return function(t,r){return(0,BJ.isOneOf)(...Object.values(e))(t,r)}}});var IR=T(TS=>{"use strict";Object.defineProperty(TS,"__esModule",{value:!0});TS.isEqualTo=KJ;var VJ=M(),qJ=ds();function KJ(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,VJ.generateTypeGuardError)(t,r.identifier,`equal to ${(0,qJ.stringify)(e)}`)),!1):!0}}});var OR=T(gp=>{"use strict";Object.defineProperty(gp,"__esModule",{value:!0});gp.isRegex=void 0;var JJ=M(),XJ=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,JJ.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};gp.isRegex=XJ});var NR=T(CS=>{"use strict";Object.defineProperty(CS,"__esModule",{value:!0});CS.isPattern=YJ;var MR=M();function YJ(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,MR.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,MR.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var DR=T(vS=>{"use strict";Object.defineProperty(vS,"__esModule",{value:!0});vS.by=ZJ;function ZJ(e){return function(t){return e(t,null)}}});var jR=T(kS=>{"use strict";Object.defineProperty(kS,"__esModule",{value:!0});kS.toNumber=QJ;function QJ(e){return typeof e=="number"?e:Number(e)}});var zR=T(ES=>{"use strict";Object.defineProperty(ES,"__esModule",{value:!0});ES.toDate=e8;function e8(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var $R=T(LS=>{"use strict";Object.defineProperty(LS,"__esModule",{value:!0});LS.toBoolean=t8;function t8(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var FR=T(fp=>{"use strict";Object.defineProperty(fp,"__esModule",{value:!0});fp.isSymbol=void 0;var r8=M(),o8=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,r8.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};fp.isSymbol=o8});var ms=T(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.isDateLike=_.isBooleanLike=_.isNumeric=_.isNonPositiveInteger=_.isNonNegativeInteger=_.isNegativeInteger=_.isPositiveInteger=_.isInteger=_.isNegativeNumber=_.isNonPositiveNumber=_.isPositiveNumber=_.isNonNegativeNumber=_.isNonEmptyString=_.isOmit=_.isPick=_.isPartialOf=_.isObjectWithEachItem=_.isNonNullObject=_.isTuple=_.isNonEmptyArrayWithEachItem=_.isNonEmptyArray=_.isArrayWithEachItem=_.isError=_.isIndexSignature=_.isSet=_.isMap=_.isURLSearchParams=_.isURL=_.isFormData=_.isBlob=_.isFileList=_.isFile=_.isFunction=_.isUnknown=_.isString=_.isNumber=_.isNil=_.isDefined=_.isDate=_.isBoolean=_.isAny=_.BrandSymbols=_.isBranded=_.guardWithTolerance=_.isObject=_.isObjectWith=_.isNestedType=_.isShape=_.isSchema=_.isType=void 0;_.isSymbol=_.toBoolean=_.toDate=_.toNumber=_.by=_.generateTypeGuardError=_.isPattern=_.isRegex=_.isEqualTo=_.isEnum=_.isAsserted=_.isNilOr=_.isUndefinedOr=_.isNullOr=_.isExtensionOf=_.isIntersectionOf=_.isOneOfTypes=_.isOneOf=_.isBigInt=void 0;var n8=Ou();Object.defineProperty(_,"isType",{enumerable:!0,get:function(){return n8.isType}});var RS=LL();Object.defineProperty(_,"isSchema",{enumerable:!0,get:function(){return RS.isSchema}});Object.defineProperty(_,"isShape",{enumerable:!0,get:function(){return RS.isShape}});Object.defineProperty(_,"isNestedType",{enumerable:!0,get:function(){return RS.isNestedType}});var s8=RL();Object.defineProperty(_,"isObjectWith",{enumerable:!0,get:function(){return s8.isObjectWith}});var i8=xL();Object.defineProperty(_,"isObject",{enumerable:!0,get:function(){return i8.isObject}});var a8=WL();Object.defineProperty(_,"guardWithTolerance",{enumerable:!0,get:function(){return a8.guardWithTolerance}});var l8=IL();Object.defineProperty(_,"isBranded",{enumerable:!0,get:function(){return l8.isBranded}});var c8=OL();Object.defineProperty(_,"BrandSymbols",{enumerable:!0,get:function(){return c8.BrandSymbols}});var d8=ML();Object.defineProperty(_,"isAny",{enumerable:!0,get:function(){return d8.isAny}});var u8=NL();Object.defineProperty(_,"isBoolean",{enumerable:!0,get:function(){return u8.isBoolean}});var p8=DL();Object.defineProperty(_,"isDate",{enumerable:!0,get:function(){return p8.isDate}});var m8=qy();Object.defineProperty(_,"isDefined",{enumerable:!0,get:function(){return m8.isDefined}});var g8=xu();Object.defineProperty(_,"isNil",{enumerable:!0,get:function(){return g8.isNil}});var f8=rS();Object.defineProperty(_,"isNumber",{enumerable:!0,get:function(){return f8.isNumber}});var h8=jL();Object.defineProperty(_,"isString",{enumerable:!0,get:function(){return h8.isString}});var y8=zL();Object.defineProperty(_,"isUnknown",{enumerable:!0,get:function(){return y8.isUnknown}});var S8=$L();Object.defineProperty(_,"isFunction",{enumerable:!0,get:function(){return S8.isFunction}});var P8=HL();Object.defineProperty(_,"isFile",{enumerable:!0,get:function(){return P8.isFile}});var A8=BL();Object.defineProperty(_,"isFileList",{enumerable:!0,get:function(){return A8.isFileList}});var b8=VL();Object.defineProperty(_,"isBlob",{enumerable:!0,get:function(){return b8.isBlob}});var _8=KL();Object.defineProperty(_,"isFormData",{enumerable:!0,get:function(){return _8.isFormData}});var w8=XL();Object.defineProperty(_,"isURL",{enumerable:!0,get:function(){return w8.isURL}});var T8=ZL();Object.defineProperty(_,"isURLSearchParams",{enumerable:!0,get:function(){return T8.isURLSearchParams}});var C8=QL();Object.defineProperty(_,"isMap",{enumerable:!0,get:function(){return C8.isMap}});var v8=eR();Object.defineProperty(_,"isSet",{enumerable:!0,get:function(){return v8.isSet}});var k8=tR();Object.defineProperty(_,"isIndexSignature",{enumerable:!0,get:function(){return k8.isIndexSignature}});var E8=rR();Object.defineProperty(_,"isError",{enumerable:!0,get:function(){return E8.isError}});var L8=sS();Object.defineProperty(_,"isArrayWithEachItem",{enumerable:!0,get:function(){return L8.isArrayWithEachItem}});var R8=iS();Object.defineProperty(_,"isNonEmptyArray",{enumerable:!0,get:function(){return R8.isNonEmptyArray}});var x8=oR();Object.defineProperty(_,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return x8.isNonEmptyArrayWithEachItem}});var W8=sR();Object.defineProperty(_,"isTuple",{enumerable:!0,get:function(){return W8.isTuple}});var I8=ro();Object.defineProperty(_,"isNonNullObject",{enumerable:!0,get:function(){return I8.isNonNullObject}});var O8=iR();Object.defineProperty(_,"isObjectWithEachItem",{enumerable:!0,get:function(){return O8.isObjectWithEachItem}});var M8=aR();Object.defineProperty(_,"isPartialOf",{enumerable:!0,get:function(){return M8.isPartialOf}});var N8=lR();Object.defineProperty(_,"isPick",{enumerable:!0,get:function(){return N8.isPick}});var D8=cR();Object.defineProperty(_,"isOmit",{enumerable:!0,get:function(){return D8.isOmit}});var j8=dR();Object.defineProperty(_,"isNonEmptyString",{enumerable:!0,get:function(){return j8.isNonEmptyString}});var z8=uR();Object.defineProperty(_,"isNonNegativeNumber",{enumerable:!0,get:function(){return z8.isNonNegativeNumber}});var $8=pR();Object.defineProperty(_,"isPositiveNumber",{enumerable:!0,get:function(){return $8.isPositiveNumber}});var F8=mR();Object.defineProperty(_,"isNonPositiveNumber",{enumerable:!0,get:function(){return F8.isNonPositiveNumber}});var H8=gR();Object.defineProperty(_,"isNegativeNumber",{enumerable:!0,get:function(){return H8.isNegativeNumber}});var U8=fR();Object.defineProperty(_,"isInteger",{enumerable:!0,get:function(){return U8.isInteger}});var B8=hR();Object.defineProperty(_,"isPositiveInteger",{enumerable:!0,get:function(){return B8.isPositiveInteger}});var G8=yR();Object.defineProperty(_,"isNegativeInteger",{enumerable:!0,get:function(){return G8.isNegativeInteger}});var V8=SR();Object.defineProperty(_,"isNonNegativeInteger",{enumerable:!0,get:function(){return V8.isNonNegativeInteger}});var q8=PR();Object.defineProperty(_,"isNonPositiveInteger",{enumerable:!0,get:function(){return q8.isNonPositiveInteger}});var K8=AR();Object.defineProperty(_,"isNumeric",{enumerable:!0,get:function(){return K8.isNumeric}});var J8=bR();Object.defineProperty(_,"isBooleanLike",{enumerable:!0,get:function(){return J8.isBooleanLike}});var X8=_R();Object.defineProperty(_,"isDateLike",{enumerable:!0,get:function(){return X8.isDateLike}});var Y8=wR();Object.defineProperty(_,"isBigInt",{enumerable:!0,get:function(){return Y8.isBigInt}});var Z8=fS();Object.defineProperty(_,"isOneOf",{enumerable:!0,get:function(){return Z8.isOneOf}});var Q8=CR();Object.defineProperty(_,"isOneOfTypes",{enumerable:!0,get:function(){return Q8.isOneOfTypes}});var e3=vR();Object.defineProperty(_,"isIntersectionOf",{enumerable:!0,get:function(){return e3.isIntersectionOf}});var t3=kR();Object.defineProperty(_,"isExtensionOf",{enumerable:!0,get:function(){return t3.isExtensionOf}});var r3=ER();Object.defineProperty(_,"isNullOr",{enumerable:!0,get:function(){return r3.isNullOr}});var o3=LR();Object.defineProperty(_,"isUndefinedOr",{enumerable:!0,get:function(){return o3.isUndefinedOr}});var n3=RR();Object.defineProperty(_,"isNilOr",{enumerable:!0,get:function(){return n3.isNilOr}});var s3=xR();Object.defineProperty(_,"isAsserted",{enumerable:!0,get:function(){return s3.isAsserted}});var i3=WR();Object.defineProperty(_,"isEnum",{enumerable:!0,get:function(){return i3.isEnum}});var a3=IR();Object.defineProperty(_,"isEqualTo",{enumerable:!0,get:function(){return a3.isEqualTo}});var l3=OR();Object.defineProperty(_,"isRegex",{enumerable:!0,get:function(){return l3.isRegex}});var c3=NR();Object.defineProperty(_,"isPattern",{enumerable:!0,get:function(){return c3.isPattern}});var d3=M();Object.defineProperty(_,"generateTypeGuardError",{enumerable:!0,get:function(){return d3.generateTypeGuardError}});var u3=DR();Object.defineProperty(_,"by",{enumerable:!0,get:function(){return u3.by}});var p3=jR();Object.defineProperty(_,"toNumber",{enumerable:!0,get:function(){return p3.toNumber}});var m3=zR();Object.defineProperty(_,"toDate",{enumerable:!0,get:function(){return m3.toDate}});var g3=$R();Object.defineProperty(_,"toBoolean",{enumerable:!0,get:function(){return g3.toBoolean}});var f3=FR();Object.defineProperty(_,"isSymbol",{enumerable:!0,get:function(){return f3.isSymbol}})});var gs,HR,h3,UR,BR=l(()=>{"use strict";gs=g(require("node:path")),HR=require("node:url"),h3=()=>!0,UR=()=>{if(h3()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?gs.default.dirname(gs.default.resolve(e)):gs.default.dirname(gs.default.resolve(__filename))}return gs.default.dirname((0,HR.fileURLToPath)(__agentWitchImportMetaUrl))}});var xS,GR,D,VR,y3,qt,WS,k,ga,Kt,IS,fa,Bo,OS,MS,NS,ha,fe,oo,hp,De,yp,O,DS=l(()=>{"use strict";xS=g(require("node:fs")),GR=g(require("node:os")),D=g(require("node:path")),VR=g(ms());Ae();BR();gu();gu();y3=UR(),qt=e=>e.trim().toLowerCase(),WS=e=>qt(e).replace(/@/g,"-at-").replace(/\./g,"-").replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,""),k=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return D.default.resolve(e);let t=D.default.resolve(y3),r=D.default.basename(t),o=D.default.basename(D.default.dirname(t));return r===Uy&&(o===Gt||o===hr)?D.default.dirname(t):r===Gt||r===hr?t:D.default.join(GR.default.homedir(),Gt)},ga=(e=k())=>D.default.join(e,Uy),Kt=(e=k())=>D.default.join(ga(e),lL),IS=(e,t,r)=>t!==null?D.default.join(e,Le,t,r):D.default.join(e,r),fa=e=>IS(e.installDir,e.profileEmail,oa),Bo=e=>IS(e.installDir,e.profileEmail,vt),OS=e=>D.default.join(e.logsDir,zo),MS=e=>D.default.join(e.logsDir,$o),NS=e=>IS(e.installDir,e.profileEmail,na),ha=e=>e.profileEmail!==null?D.default.join(e.installDir,Le,e.profileEmail,eo):D.default.join(e.installDir,eo),fe=(e=k())=>sa(e),oo=(e=k())=>to(e)?du:cu,hp=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return qt(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?qt(t):null},De=(e=k())=>{let t=D.default.join(e,Hy);if(!xS.default.existsSync(t))return null;try{let r=JSON.parse(xS.default.readFileSync(t,"utf8"));if((0,VR.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return qt(r.email)}catch{return null}return null},yp=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?qt(r):null}let t=hp();return t!==null?t:De()},O=e=>{let t=k(),r=ga(t),o=Kt(t),n=yp(e);if(n!==null){let S=D.default.join(t,Le,n),f=D.default.join(S,uu),y=D.default.join(S,oa),p=D.default.join(S,vt),P=D.default.join(S,na),A=D.default.join(S,eo),h=D.default.join(S,vt,zo),b=D.default.join(S,vt,$o);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:p,mainLogPath:h,errorLogPath:b,reportsDir:P,deviceKeypairPath:A,configPath:D.default.join(S,"config.json"),harnessRootDir:f,harnessManifestPath:D.default.join(f,mu),harnessSetsDir:D.default.join(f,pu)}}let s=D.default.join(t,uu),i=D.default.join(t,oa),a=D.default.join(t,vt),c=D.default.join(t,na),d=D.default.join(t,eo),u=D.default.join(t,vt,zo),m=D.default.join(t,vt,$o);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:u,errorLogPath:m,reportsDir:c,deviceKeypairPath:d,configPath:D.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:D.default.join(s,mu),harnessSetsDir:D.default.join(s,pu)}}});var S3,fs,jS=l(()=>{"use strict";S3=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},fs=e=>e.filePort??S3(e.envValue)??e.defaultPort});var zS,qR,P3,A3,$S,hs,KR=l(()=>{"use strict";zS=g(require("node:fs")),qR=g(require("node:path"));Ae();DS();jS();P3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),A3=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,$S=e=>{let t=qR.default.join(e,ra.wakePort);if(!zS.default.existsSync(t))return null;try{let r=JSON.parse(zS.default.readFileSync(t,"utf8"));if(P3(r)&&A3(r.wakePort))return r.wakePort}catch{return null}return null},hs=(e=k())=>fs({filePort:$S(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:oo(e)})});var JR={};ft(JR,{isAgentWitchLocalInstallDir:()=>to,readActiveProfileEmailFromFile:()=>De,readAgentWitchWakePortFromFile:()=>$S,resolveActiveProfileEmail:()=>yp,resolveActiveProfileEmailFromEnv:()=>hp,resolveAgentWitchAppBundlePath:()=>Kt,resolveAgentWitchAppDir:()=>ga,resolveAgentWitchDefaultWakePort:()=>oo,resolveAgentWitchDeviceKeypairPath:()=>ha,resolveAgentWitchErrorLogPath:()=>MS,resolveAgentWitchInstallDir:()=>k,resolveAgentWitchLaunchAgentPrefix:()=>fe,resolveAgentWitchLocalLayout:()=>O,resolveAgentWitchLogsDir:()=>Bo,resolveAgentWitchMainLogPath:()=>OS,resolveAgentWitchProjectsDir:()=>fa,resolveAgentWitchReportsDir:()=>NS,resolveAgentWitchRuntimeWakePort:()=>hs,resolveAgentWitchWakePortFromSources:()=>fs,sanitizeProfileEmailForDir:()=>qt,sanitizeProfileEmailForLaunchAgentLabel:()=>WS});var B=l(()=>{"use strict";DS();KR();jS()});var FS,HS,Sp=l(()=>{"use strict";FS=new Set(["","loginwindow","_mbsetupuser","root"]),HS=5e3});var XR,b3,YR,US,BS=l(()=>{"use strict";XR=require("node:child_process");Sp();b3=e=>e.trim().toLowerCase(),YR=e=>e==null?!1:!FS.has(b3(e)),US=()=>{if(process.platform!=="darwin")return null;try{let t=(0,XR.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return YR(t)?t:null}catch{return null}}});var QR,ZR,kt,ya=l(()=>{"use strict";QR=g(require("node:os"));BS();ZR=e=>e.trim().toLowerCase(),kt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?US():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??QR.default.userInfo().username;return ZR(r)===ZR(o)}});var ex,tx,Go,rx=l(()=>{"use strict";ex=require("node:child_process"),tx=g(require("node:fs"));B();ya();Go=(e=k())=>{let t=Kt(e);if(!tx.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!kt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=De(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,ex.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var ox,Sa,Pp=l(()=>{"use strict";ox=require("node:child_process"),Sa=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,ox.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Ap,GS,nx,se,bp,Pa=l(()=>{"use strict";Ap=g(require("node:fs")),GS=g(require("node:path"));B();Ae();nx=e=>{let t=GS.default.join(e,Le);return Ap.default.existsSync(t)?Ap.default.readdirSync(t).filter(r=>Ap.default.statSync(GS.default.join(t,r)).isDirectory()).map(r=>qt(r)).toSorted():[]},se=(e=k())=>{let t=fe(e),r=nx(e);return[{profileEmail:De(e)??r[0]??null,launchAgentLabel:t}]},bp=(e=k())=>nx(e)});var VS,sx,ix,_3,yr,_p=l(()=>{"use strict";VS=g(require("node:fs")),sx=g(require("node:os")),ix=g(require("node:path"));B();Pa();_3=()=>ix.default.join(sx.default.homedir(),"Library","LaunchAgents"),yr=(e=k())=>{let t=fe(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of se(e))r.add(n.launchAgentLabel);let o=_3();if(VS.default.existsSync(o))for(let n of VS.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var ax,Aa,lx=l(()=>{"use strict";B();Pp();_p();Pa();ax=(e=k())=>{let t=new Set(se(e).map(r=>r.launchAgentLabel));return yr(e).filter(r=>!t.has(r))},Aa=(e=k())=>{for(let t of ax(e))Sa(t)}});var ba,qS=l(()=>{"use strict";B();Pp();_p();ba=(e=k())=>{for(let t of yr(e))Sa(t)}});var cx,dx,w3,Vo,ux=l(()=>{"use strict";cx=require("node:child_process"),dx=require("node:util"),w3=(0,dx.promisify)(cx.execFile),Vo=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await w3("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var qo,T3,KS,JS=l(()=>{"use strict";qo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),T3=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,KS=e=>{let t=e.pathValue??T3(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${qo(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${qo(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${qo(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${qo(e.homeDir)}</string>
    <key>PATH</key>
    <string>${qo(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${qo(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${qo(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var wp,XS=l(()=>{"use strict";wp=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var _a,YS,Tp,Cp,Sr,vp=l(()=>{"use strict";_a=g(require("node:fs")),YS=g(require("node:os")),Tp=g(require("node:path"));Ae();B();JS();XS();Cp=(e,t=YS.default.homedir())=>Tp.default.join(t,"Library","LaunchAgents",`${e}.plist`),Sr=e=>{let t=e.installDir??k(),r=e.homeDir??YS.default.homedir(),o=Cp(e.launchAgentLabel,r),n=_a.default.existsSync(o)?_a.default.readFileSync(o,"utf8"):null;if(n!==null&&wp(n))return{ok:!0,rewritten:!1,plistPath:o};let s=KS({launchAgentLabel:e.launchAgentLabel,runPath:Tp.default.join(t,aL,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??hs(t)});if(!wp(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{_a.default.mkdirSync(Tp.default.dirname(o),{recursive:!0}),_a.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var mx,gx,fx,wa,C3,v3,px,je,ZS=l(()=>{"use strict";mx=require("node:child_process"),gx=g(require("node:fs")),fx=require("node:util");B();vp();ya();wa=(0,fx.promisify)(mx.execFile),C3=async e=>{try{return await wa("launchctl",["print",e]),!0}catch{return!1}},v3=async(e,t,r)=>{await C3(t)&&await wa("launchctl",["bootout",t]).catch(()=>{}),await wa("launchctl",["bootstrap",e,r]),await wa("launchctl",["enable",t])},px=async e=>{try{return await wa("launchctl",["kickstart","-k",e]),!0}catch{return!1}},je=async(e,t=k())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!kt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=Sr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await px(n))return{ok:!0};let i=s.plistPath;if(!gx.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await v3(o,n,i),await px(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Ko,hx=l(()=>{"use strict";B();ZS();Pa();Ko=async(e=k())=>{let t=[];for(let r of se(e))(await je(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var yx,Sx,Px=l(()=>{"use strict";yx=/(<key>AGENT_WITCH_WAKE_PORT<\/key>\s*<string>)[^<]*(<\/string>)/,Sx=(e,t)=>yx.test(e)?e.replace(yx,`$1${String(t)}$2`):null});var kp,Ax,QS,bx=l(()=>{"use strict";kp=g(require("node:fs")),Ax=g(require("node:os"));vp();Px();QS=e=>{let t=e.homeDir??Ax.default.homedir(),r=[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`],o=[];for(let n of r){let s=Cp(n,t);if(!kp.default.existsSync(s))continue;let i=kp.default.readFileSync(s,"utf8"),a=Sx(i,e.wakePort);a===null||a===i||(kp.default.writeFileSync(s,a,"utf8"),o.push(s))}return o}});var nt,Pr,_x=l(()=>{"use strict";qS();ya();Sp();nt=e=>{kt()||(ba(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Pr=(e,t=HS)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{kt()||e()},t);return()=>{clearInterval(r)}}});var re=l(()=>{"use strict";gL();rx();Pp();lx();qS();_p();ya();ux();hx();ZS();vp();XS();bx();JS();Pa();BS();Sp();_x()});var eP=l(()=>{"use strict";re()});var wx,Tx,Ep,Cx,ys,vx,kx,Jo=l(()=>{"use strict";wx=".agent-witch",Tx="memory",Ep="project.json",Cx="chunks.ndjson",ys="runs.ndjson",vx="reports",kx=".json"});var Ex=l(()=>{"use strict";Jo()});var Lx,Lp,tP=l(()=>{"use strict";Lx=g(require("node:path"));Ex();Lp=(e,t)=>Lx.default.join(e.trim(),`${t.trim()}${kx}`)});var Ta,Rx,xx=l(()=>{"use strict";Ta="agent-witch.js",Rx="command"});var Rp=l(()=>{"use strict";xx()});var Xo,Wx,Ix=l(()=>{"use strict";Rp();Xo=e=>`'${e.replace(/'/g,"'\\''")}'`,Wx=e=>{let t=`${e.installDir.trim()}/${"app"}/${Ta}`,r=[Xo("node"),Xo(t),"report","write","--key",Xo(e.reportKey.trim()),"--agent-run-id",Xo(e.agentRunId.trim()),"--status",Xo(e.status),"--summary",Xo(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Xo(e.details.trim())),r.join(" ")}});var Jt,Ox,k3,rP,xp=l(()=>{"use strict";tP();Ix();Jt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},Ox=e=>e===Jt.COMPLETED||e===Jt.FAILED,k3=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),rP=(e,t)=>{let r=Lp(t.reportsDir,t.reportKey),o=Wx({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Jt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${k3({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var ze=l(()=>{"use strict";Ae();B()});var va,Nx,Mx,Dx,E3,Ss,L3,jx,ka,Ea,oP,zx,$x,La=l(()=>{"use strict";va=g(require("node:fs")),Nx=g(require("node:path"));xp();tP();ze();Mx=50,Dx=e=>{let t=O(),r=Lp(t.reportsDir,e);return va.default.mkdirSync(Nx.default.dirname(r),{recursive:!0}),r},E3=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Ss=e=>{let t=Dx(e);if(!va.default.existsSync(t))return null;try{let r=JSON.parse(va.default.readFileSync(t,"utf8"));return E3(r)?r:null}catch{return null}},L3=(e,t)=>{let r=[...e,t];return r.length>Mx?r.slice(r.length-Mx):r},jx=e=>{let t=Dx(e.reportKey);va.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},ka=e=>{let t=Ss(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:L3(t?.history??[],o)};return jx(n),n},Ea=e=>{let t=Ss(e.reportKey);return t!==null?t:ka({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Jt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},oP=(e,t)=>{let r=t.trim();if(r.length===0)return Ss(e);let o=Ss(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return jx(s),s},zx=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},$x=e=>{if(e===null||!Ox(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Jt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var R3,x3,Ra,Fx,Wp,nP=l(()=>{"use strict";xp();La();R3=new Set(Object.values(Jt)),x3=e=>R3.has(e),Ra=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},Fx=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Wp=e=>{if(e[0]!=="write")return Fx(),1;let r=Ra(e,"--key"),o=Ra(e,"--agent-run-id"),n=Ra(e,"--status"),s=Ra(e,"--summary"),i=Ra(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!x3(n)?(Fx(),1):(ka({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var st,Yo=l(()=>{"use strict";st=()=>!0});var sP,Hx,Zo,Ip=l(()=>{"use strict";sP=g(require("node:path")),Hx=require("node:url");Yo();Zo=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=sP.default.resolve(t);return st()?r===sP.default.resolve(__filename):e===void 0?!1:r===(0,Hx.fileURLToPath)(e)}});var Op,Ps,O3,xae,As=l(()=>{"use strict";Op="agent-witch.js",Ps="deps.tar.gz",O3="install.sh",xae={mainScript:`app/${Op}`,depsArchive:`app/${Ps}`,installShell:O3}});var Vx=l(()=>{"use strict";As()});var qx=l(()=>{"use strict";As();Vx()});var xa,aP,Mp,M3,Wa,$e,_s,Ia,Oa,Qo,lP=l(()=>{"use strict";xa=g(require("node:fs")),aP=g(require("node:path"));qx();B();Mp="install-version.json",M3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Wa=(e=k())=>aP.default.join(e,Mp),$e=(e=k())=>{let t=Wa(e);if(!xa.default.existsSync(t))return null;try{let r=JSON.parse(xa.default.readFileSync(t,"utf8"));return!M3(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},_s=(e,t=k())=>{let r=Wa(t);xa.default.mkdirSync(aP.default.dirname(r),{recursive:!0}),xa.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Ia=(e=k())=>$e(e)?.bundleVersion??"259",Oa=(e,t)=>{let r=$e(e);if(r!==null)return r;let o={bundleVersion:"259",appOrigin:t,updatedAt:new Date().toISOString()};return _s(o,e),o},Qo=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var Kx,en,cP,dP,uP,Np,Xt,tn,pP=l(()=>{"use strict";Kx=require("node:crypto"),en=g(require("node:fs")),cP=g(require("node:path"));B();dP="self-update-log.ndjson",uP=100,Np=(e=k())=>{let t=O(),r=t.installDir===e?t.logsDir:Bo({installDir:e,profileEmail:t.profileEmail});return cP.default.join(r,dP)},Xt=(e,t=k())=>{let r={id:(0,Kx.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Np(t);en.default.mkdirSync(cP.default.dirname(o),{recursive:!0});let n=en.default.existsSync(o)?en.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-uP+1)),JSON.stringify(r)];return en.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},tn=(e=20,t=k())=>{let r=Np(t);if(!en.default.existsSync(r))return[];let o=en.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var mP,Kae,gP=l(()=>{"use strict";As();mP="deps",Kae=`${"app"}/${Ps}`});var Jx=l(()=>{"use strict";gP()});var Xx,no,rn,Yx,fP,hP,Zx=l(()=>{"use strict";Xx=require("node:child_process"),no=g(require("node:fs")),rn=g(require("node:path"));As();gP();Yx=e=>rn.default.join(e,"app",mP),fP=e=>{let t=rn.default.join(e,"app"),r=rn.default.join(t,Ps);no.default.existsSync(r)&&(no.default.rmSync(Yx(e),{recursive:!0,force:!0}),no.default.mkdirSync(t,{recursive:!0}),(0,Xx.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),no.default.rmSync(r,{force:!0}))},hP=e=>{no.default.rmSync(rn.default.join(e,"node_modules"),{recursive:!0,force:!0}),no.default.rmSync(rn.default.join(e,"package.json"),{force:!0}),no.default.rmSync(rn.default.join(e,"package-lock.json"),{force:!0})}});var Qx=l(()=>{"use strict";Jx();Zx()});var Ma,Na=l(()=>{"use strict";Ma="agent-witch.service"});var eW=l(()=>{"use strict";Na()});var Dp,jp,zp=l(()=>{"use strict";Dp="AGENT_WITCH_EXTERNAL_BRIDGE",jp="AGENT_WITCH_EXTERNAL_LIVE"});var tW=l(()=>{"use strict";zp();Na()});var rW,yP,oW=l(()=>{"use strict";rW=require("node:child_process");Na();yP=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,rW.spawn)("systemctl",["--user","restart",Ma],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${Ma} exited ${o??"unknown"}`))})})});var nW=l(()=>{"use strict";Na();eW();tW();oW()});var it,$p,sW=l(()=>{"use strict";it="https://www.agentwitch.com",$p="wss://www.agentwitch.com/api/agent-witch/ws"});var Da,Ar,iW=l(()=>{"use strict";Da="127.0.0.1",Ar=`http://${Da}:43347`});var ht=l(()=>{"use strict";sW();iW()});var ja,Fp,aW,PP,D3,lW,_P,cW,Et,za,$a,wP,AP,bP,Fa,Ha,TP,CP,ws=l(()=>{"use strict";ja=g(require("node:fs")),Fp=g(require("node:path")),aW="active-writer-work.json",PP=new Set,D3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lW=e=>e.profileEmail===null?Fp.default.join(e.installDir,aW):Fp.default.join(e.installDir,"profiles",e.profileEmail,aW),_P=e=>{let t=lW(e);if(!ja.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(ja.default.readFileSync(t,"utf8"));return!D3(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},cW=(e,t)=>{let r=lW(e);ja.default.mkdirSync(Fp.default.dirname(r),{recursive:!0}),ja.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Et=e=>_P(e).activeCount>0,za=e=>{let t=_P(e);cW(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},$a=e=>{let t=_P(e),r=Math.max(0,t.activeCount-1);if(cW(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of PP)o()},wP=e=>(PP.add(e),()=>{PP.delete(e)}),AP=null,bP=null,Fa=e=>{AP=e},Ha=e=>{bP=e},TP=()=>{let e=AP;return AP=null,e},CP=()=>{let e=bP;return bP=null,e}});var Re,Hp=l(()=>{"use strict";Re=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Ts,Up,Ua,vP=l(()=>{"use strict";Ts="qwen2.5:7b",Up="nomic-embed-text",Ua="Install Ollama from https://ollama.com/download"});var Ba,kP,Bp=l(()=>{"use strict";vP();Ba=()=>`
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
    echo "Ollama is missing. ${Ua}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Ua}" >&2
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
  agent_witch_ensure_ollama_model "${Ts}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${Up}" "\${pull_log}"
}
`,kP=()=>`
${Ba()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var dW,j3,Gp,EP=l(()=>{"use strict";dW=require("node:child_process");B();Bp();j3=e=>new Promise(t=>{let r=(0,dW.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:k()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Gp=async(e=j3)=>{let t=`${Ba()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var so,Vp,uW,z3,pW,vs,$3,F3,H3,Cs,on,nn,mW=l(()=>{"use strict";so=g(require("node:fs")),Vp=g(require("node:path"));Qx();nW();re();B();As();ht();lP();ws();Hp();pP();EP();uW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),z3=e=>{let t=De(e),r=t===null?O():O(t);if(!so.default.existsSync(r.configPath))return null;try{let o=JSON.parse(so.default.readFileSync(r.configPath,"utf8"));return!uW(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},pW=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!uW(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},vs=async e=>(await pW(e))?.bundleVersion??null,$3=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Vp.default.join(t,r);so.default.mkdirSync(Vp.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());so.default.writeFileSync(n,s),r.endsWith(".js")&&so.default.chmodSync(n,493)},F3=async()=>{if(process.platform==="linux"){try{await yP()}catch(e){let t=e instanceof Error?e.message:String(e);console.warn(`[agent-witch-self-update] Linux service restart skipped: ${t}`)}return}Aa(),await Ko()},H3=(e,t)=>e!==null?Re(e):t??it,Cs=(e,t)=>({localBundleVersion:t,...e}),on=async e=>{let t=k(),r=$e(t),o=r?.bundleVersion??null,n=await Gp();Xt({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=z3(t),i=H3(s,r?.appOrigin);if(i===null){let d=Cs({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return Xt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await pW(i);if(a===null){let d=Cs({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return Xt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||Qo(o,a.bundleVersion))){let d=Cs({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Xt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await $3(i,t,S);let d=Vp.default.join(t,Op);so.default.existsSync(d)&&so.default.rmSync(d,{force:!0}),fP(t),hP(t),_s({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=O(De(t));if(Et(u)){Ha("install-bundle-update");let S=Cs({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Xt({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await F3();let m=Cs({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Xt({event:"update_applied",ok:!0,message:m.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}catch(d){let u=d instanceof Error?d.message:"Agent Witch self-update failed.",m=Cs({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},o);return Xt({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},nn=()=>{let e=k();return{local:$e(e),logs:tn(20,e)}}});var gW={};ft(gW,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>Mp,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Ua,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Up,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>Ts,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>dP,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>uP,appendAgentWitchSelfUpdateLog:()=>Xt,buildAgentWitchEnsureOllamaShell:()=>Ba,buildAgentWitchInstallScriptOllama:()=>kP,buildAgentWitchSelfUpdateStatus:()=>nn,ensureAgentWitchInstallVersionRecorded:()=>Oa,ensureAgentWitchOllamaInstalled:()=>Gp,fetchAgentWitchRemoteInstallBundleVersion:()=>vs,isRemoteAgentWitchBundleVersionNewer:()=>Qo,readAgentWitchInstallVersion:()=>$e,readAgentWitchSelfUpdateLogs:()=>tn,resolveAgentWitchAppOriginFromWsUrl:()=>Re,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Ia,resolveAgentWitchInstallVersionPath:()=>Wa,resolveAgentWitchSelfUpdateLogPath:()=>Np,runAgentWitchSelfUpdate:()=>on,writeAgentWitchInstallVersion:()=>_s});var Yt=l(()=>{"use strict";lP();pP();mW();Hp();vP();Bp();EP()});var LP={};ft(LP,{buildAgentWitchSelfUpdateStatus:()=>nn,fetchAgentWitchRemoteInstallBundleVersion:()=>vs,runAgentWitchSelfUpdate:()=>on});var RP=l(()=>{"use strict";Yt()});function ks(e){return(0,fW.createHash)("sha256").update(e.trim()).digest("hex")}var fW,qp=l(()=>{"use strict";fW=require("node:crypto")});var Es,Ga,U3,Ls,xP,Kp=l(()=>{"use strict";Es=g(require("node:fs")),Ga=g(require("node:path"));qp();ze();U3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ls=e=>{if(!Es.default.existsSync(e))return null;try{let t=JSON.parse(Es.default.readFileSync(e,"utf8"));return!U3(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:ks(t.pairingToken.trim())}catch{return null}},xP=(e=k())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(Ls(Ga.default.join(e,"config.json")));let n=Ga.default.join(e,Le);if(!Es.default.existsSync(n))return t;for(let s of Es.default.readdirSync(n)){let i=Ga.default.join(n,s);Es.default.statSync(i).isDirectory()&&o(Ls(Ga.default.join(i,"config.json")))}return t}});var Rs,Va=l(()=>{"use strict";Rs="connection-health.json"});var sn,Jp,B3,qa,Se,WP,Xp,xe,Yp=l(()=>{"use strict";sn=g(require("node:fs")),Jp=g(require("node:path"));Va();B3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qa=e=>e.profileEmail===null?Jp.default.join(e.installDir,Rs):Jp.default.join(e.installDir,"profiles",e.profileEmail,Rs),Se=e=>{let t=qa(e);if(!sn.default.existsSync(t))return null;try{let r=JSON.parse(sn.default.readFileSync(t,"utf8"));return!B3(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},WP=e=>{let t=qa(e);sn.default.existsSync(t)&&sn.default.rmSync(t,{force:!0})},Xp=(e,t)=>{let r=qa(e),o=Se(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};sn.default.mkdirSync(Jp.default.dirname(r),{recursive:!0}),sn.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},xe=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var Ka,hW=l(()=>{"use strict";Va();Yp();Ka=(e,t)=>{if(!t.socketOpen)return!1;let r=Se(e);return r===null?!1:!xe(r,t.staleAfterMs??12e4,t.nowMs)}});var IP,yW=l(()=>{"use strict";Yp();IP=(e,t)=>!(e!==null&&!xe(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var an=l(()=>{"use strict";Yp();hW();yW();Va()});var Zp,OP,G3,V3,SW,PW=l(()=>{"use strict";Zp=g(require("node:fs")),OP=g(require("node:path"));B();Ae();an();Kp();G3=12e4,V3=e=>{let t=OP.default.join(e,Le);return Zp.default.existsSync(t)?Zp.default.readdirSync(t).filter(r=>Zp.default.statSync(OP.default.join(t,r)).isDirectory()):[]},SW=(e=k())=>{let t=null,r=-1;for(let o of V3(e)){let n=O(o),s=Se(n);if(s===null||xe(s,G3))continue;let i=Ls(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var MP,AW,Qp,Ja,Xa,q3,K3,J3,bW,he,ye,em,Zt,Lt=l(()=>{"use strict";MP=g(require("node:fs")),AW=g(require("node:os")),Qp=g(require("node:path")),Ja={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Xa=e=>e.trim().length>0,q3=e=>{let t=Qp.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},K3=()=>{let e=AW.default.homedir(),t=Qp.default.join(e,".local","bin","agent");if(MP.default.existsSync(t))return t;let r=Qp.default.join(e,".local","bin","cursor-agent");return MP.default.existsSync(r)?r:Ja.cursorCommand},J3=e=>{let t=e.trim();return!Xa(t)||t===Ja.cursorCommand?K3():t},bW=(e,t)=>q3(e)?t:["agent",...t],he=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ye=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Xa(t)?t.trim():Ja.claudeCommand,codexCommand:Xa(r)?r.trim():Ja.codexCommand,cursorCommand:J3(o),antigravityCommand:Xa(n)?n.trim():Ja.antigravityCommand}},em=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:bW(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Zt=(e,t,r,o)=>{let n=t.trim();if(!Xa(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:bW(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"--dangerously-skip-permissions","-p",n]}}});var io,X3,ln,Y3,xs,Ya=l(()=>{"use strict";io=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,X3=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:io(s.inputTokens)+io(s.outputTokens)+io(s.cacheReadInputTokens)+io(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},ln=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=io(a.input_tokens)+io(a.cache_creation_input_tokens)+io(a.cache_read_input_tokens),d=io(a.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:X3(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},Y3=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),xs=(e,t)=>{let r=ln(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??Y3(r)}}});var NP,Z3,Q3,DP,jP=l(()=>{"use strict";NP=e=>e.toLocaleString("en-US"),Z3=e=>e<.01?e.toFixed(4):e.toFixed(3),Q3=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${Z3(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${NP(e.inputTokens)} in / ${NP(e.outputTokens)} out (${NP(e.totalTokens)} total)`,t].join(`
`)},DP=(e,t)=>{if(t===void 0)return e;let r=Q3(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var tm,zP=l(()=>{"use strict";tm={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var cn,$P,rm,FP=l(()=>{"use strict";zP();cn="auto",$P=e=>({value:cn,label:`Auto (${tm[e]})`}),rm={anthropic:[$P("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[$P("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[$P("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Ws,Za,om,Is=l(()=>{"use strict";zP();FP();Ws=e=>{let t=e?.trim()??"";if(!(t.length===0||t===cn))return t},Za=(e,t)=>{let r=Ws(t);return r===void 0?tm[e]:r},om=e=>{let t=Ws(e);return t===void 0?cn:t}});var nm,e6,t6,sm,_W=l(()=>{"use strict";nm={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},e6=e=>{let t=nm[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?nm["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?nm["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?nm["gemini-2.0-flash"]:null},t6=(e,t,r)=>{let o=e6(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},sm=e=>{let t=t6(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Os,r6,o6,n6,im,wW=l(()=>{"use strict";_W();Os=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),r6=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Os(r.input_tokens),n=Os(r.output_tokens);return o===0&&n===0?null:sm({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},o6=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Os(r.prompt_tokens),n=Os(r.completion_tokens);return o===0&&n===0?null:sm({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},n6=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=Os(r.promptTokenCount),n=Os(r.candidatesTokenCount);return o===0&&n===0?null:sm({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},im=(e,t,r)=>e==="anthropic"?r6(t,r):e==="openai"?o6(t,r):n6(t,r)});var s6,HP,i6,a6,l6,c6,d6,UP,BP=l(()=>{"use strict";Is();wW();s6=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},HP=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Za(e,t.model)},i6=async e=>{let t=HP("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=s6(o);n.length>0&&e.onChunk?.(n);let s=im("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},a6=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},l6=async e=>{let t=HP("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=a6(o);n.length>0&&e.onChunk?.(n);let s=im("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},c6=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},d6=async e=>{let t=HP("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=c6(n);s.length>0&&e.onChunk?.(s);let i=im("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},UP=async e=>{try{return e.provider==="anthropic"?await i6(e):e.provider==="openai"?await l6(e):await d6(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var at,Qa=l(()=>{"use strict";at=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var TW,u6,am,GP=l(()=>{"use strict";TW=g(require("node:path")),u6="writer-api-secrets.json",am=e=>TW.default.join(e,u6)});var VP,CW,p6,ao,Ye,lo=l(()=>{"use strict";VP=g(require("node:fs"));Is();GP();CW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),p6=e=>{if(!CW(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Ws(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},ao=e=>{let t=am(e);if(!VP.default.existsSync(t))return{};try{let r=JSON.parse(VP.default.readFileSync(t,"utf8"));if(!CW(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=p6(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Ye=(e,t)=>ao(e)[t]??null});var Fe,el=l(()=>{"use strict";Fe=e=>e==="api"?"api":"cli"});var vW,Ie,dn,br=l(()=>{"use strict";vW=g(require("node:path"));Qa();lo();el();Ie=e=>vW.default.dirname(e),dn=(e,t)=>{if(Fe(e.writerExecutionBackend)!=="api")return!1;let r=at(t);if(r===null)return!1;let o=Ie(e.layout.configPath),n=Ye(o,r);return n!==null&&n.apiKey.length>0}});var tl,qP=l(()=>{"use strict";jP();BP();Qa();lo();br();tl=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=at(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Ie(e.layout.configPath),a=Ye(i,s);if(a===null){let d=Object.keys(ao(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await UP({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:DP(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var kW,Ms,KP=l(()=>{"use strict";kW=require("node:child_process");Lt();Ya();qP();br();Ms=(e,t,r)=>new Promise(o=>{if(!he(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(dn(e,t)){tl(e,t,r).then(o);return}let n=Zt(t,r,ye({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,kW.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=xs(i.join("")),u=a.join("").trim(),m=[d.output.trim(),u].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var EW=l(()=>{"use strict"});var LW=l(()=>{"use strict";jP();KP();BP();EW();lo();br()});var RW,xW,WW,IW=l(()=>{"use strict";RW="claude",xW="codex",WW="cursor"});var OW,m6,JP,rl,lm=l(()=>{"use strict";OW=g(require("node:path"));ht();Ae();m6="ws://localhost:3000/api/agent-witch/ws",JP=e=>e.replace(/\/$/,""),rl=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return JP(t);let r=OW.default.basename(e.installDir);if(r===ta.production)return $p;let o=e.configWsUrl?.trim()??"";return r===ta.localhost?o.length>0?JP(o):m6:o.length>0?JP(o):$p}});var f6,XP,YP=l(()=>{"use strict";IW();lm();el();f6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),XP=e=>{if(!f6(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=rl({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??RW,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??xW,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??WW,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Fe(t.writerExecutionBackend),layout:e.layout}}}});var ZP,QP,eA=l(()=>{"use strict";ZP=g(require("node:fs"));B();YP();QP=e=>{let t=O(e);if(!ZP.default.existsSync(t.configPath))return null;try{let r=JSON.parse(ZP.default.readFileSync(t.configPath,"utf8")),o=XP({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var ol,MW=l(()=>{"use strict";ol=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var tA,h6,rA,NW=l(()=>{"use strict";tA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),h6=e=>{if(!tA(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!tA(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(m=>{if(!tA(m))return[];let S=typeof m.itemKey=="string"?m.itemKey.trim():"",f=typeof m.relativePath=="string"?m.relativePath:"",y=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:f,contentSha256:y}]});return u.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},rA=h6});var DW,y6,cm,oA=l(()=>{"use strict";DW=g(require("node:path")),y6=(e,t)=>{let r=t.trim();return DW.default.join(e,"components","store",r.slice(0,2),r)},cm=y6});var jW,S6,nA,zW=l(()=>{"use strict";jW=g(require("node:fs"));oA();S6=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=cm(e.installDir,n.contentSha256);jW.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},nA=S6});var nl,Ns,P6,sA,A6,iA,aA=l(()=>{"use strict";nl=g(require("node:fs")),Ns=g(require("node:path"));oA();P6=(e,t)=>Ns.default.join(e.installDir,"runs",t,"overlay"),sA=(e,t)=>Ns.default.join(P6(e,t),".cursor"),A6=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=sA(e,t);nl.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=cm(e.installDir,i.contentSha256);if(!nl.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Ns.default.join(n,c):Ns.default.join(n,i.itemKey);nl.default.mkdirSync(Ns.default.dirname(d),{recursive:!0}),nl.default.copyFileSync(a,d)}return{ok:!0}},iA=A6});var lA,$W,b6,sl,FW=l(()=>{"use strict";lA=g(require("node:fs")),$W=g(require("node:path")),b6=(e,t)=>{let r=$W.default.join(e.installDir,"runs",t);lA.default.existsSync(r)&&lA.default.rmSync(r,{recursive:!0,force:!0})},sl=b6});var _6,cA,HW=l(()=>{"use strict";aA();_6=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=sA(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},cA=_6});var dA,w6,T6,C6,v6,k6,$,UW=l(()=>{"use strict";dA=g(require("node:fs"));lm();B();el();w6="claude",T6="codex",C6="cursor",v6="agy",k6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=O();if(!dA.default.existsSync(e.configPath))return null;try{let t=JSON.parse(dA.default.readFileSync(e.configPath,"utf8"));if(!k6(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=rl({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Fe(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:w6,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:T6,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:C6,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:v6,pairingToken:s,layout:e}}catch{return null}}});var dm,BW,GW=l(()=>{"use strict";dm=g(require("node:fs"));GP();BW=(e,t)=>{let r=am(e);dm.default.mkdirSync(e,{recursive:!0}),dm.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{dm.default.chmodSync(r,384)}catch{}}});var il,VW,um=l(()=>{"use strict";il=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},VW=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===il(t)}});var al,E6,uA,pA,qW=l(()=>{"use strict";al=g(require("node:fs"));lo();GW();um();Is();br();E6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uA=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=VW(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Ws(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},pA=e=>{let t=Ie(e.configPath),r={};if(al.default.existsSync(e.configPath))try{let n=JSON.parse(al.default.readFileSync(e.configPath,"utf8"));E6(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,al.default.mkdirSync(t,{recursive:!0}),al.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=uA(uA(uA(ao(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);BW(t,o)}});var pm,mA=l(()=>{"use strict";pm={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var gA,KW=l(()=>{"use strict";Qa();lo();br();br();gA=(e,t)=>{if(dn(e,t)||t==="antigravity")return!1;let r=at(t);if(r===null)return!1;let o=Ie(e.layout.configPath),n=Ye(o,r);return n===null||n.apiKey.trim().length===0}});var JW,fA,hA=l(()=>{"use strict";JW=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},fA=async e=>{let t=JW(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=JW(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var L6,yA,XW=l(()=>{"use strict";re();eA();hA();L6=1e4,yA=()=>fA({listProfileEmails:bp,readConfig:QP,pollIntervalMs:L6,logWaiting:e=>{console.error(e)}})});var le=l(()=>{"use strict";KP();LW();eA();lm();MW();NW();zW();aA();FW();HW();el();UW();qW();lo();br();um();Is();mA();qP();br();KW();Qa();lo();XW();YP();hA()});var YW,SA,ZW=l(()=>{"use strict";YW=g(require("node:path"));B();Ae();PW();qp();Kp();le();SA=(e=k())=>{let t=SW(e);if(t!==null)return t;let r=De(e);if(r!==null){let n=Ls(YW.default.join(e,Le,r,"config.json"));if(n!==null)return n}let o=$()?.pairingToken.trim()??"";return o.length===0?null:ks(o)}});var mm,QW,R6,x6,e0,gm,ll,fm,cl=l(()=>{"use strict";mm=g(require("node:fs")),QW=g(require("node:path")),R6="wake-port.json",x6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),e0=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,gm=e=>QW.default.join(e,R6),ll=e=>{let t=gm(e);if(!mm.default.existsSync(t))return null;try{let r=JSON.parse(mm.default.readFileSync(t,"utf8"));if(x6(r)&&e0(r.wakePort))return r.wakePort}catch{return null}return null},fm=(e,t)=>{if(!e0(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=gm(e);mm.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Yue,Zue,Que,Rt,t0,dl=l(()=>{"use strict";B();cl();ze();cl();Yue=oo(),Zue=`${fe()}-wake`,Que=fe(),Rt=()=>{let e=k();return fs({filePort:ll(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:oo(e)})},t0=e=>{let t=k();ll(t)===null&&fm(t,e)}});var r0=l(()=>{"use strict";qp();re();Kp();ZW();le();dl()});var PA,ul,pl,o0=l(()=>{"use strict";PA=g(require("node:os"));r0();ul=()=>{let e=se();return{ok:!0,port:Rt(),hostname:PA.default.hostname(),profileCount:e.length}},pl=()=>{let e=se(),t=SA(),r=xP();return{hostname:PA.default.hostname(),port:Rt(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var AA=l(()=>{"use strict";o0()});var n0,s0,i0,hm,Ds=l(()=>{"use strict";n0="materialization.json",s0="backups",i0=".gitignore",hm=e=>`harness-set:${e.trim()}`});var a0,l0,ym,c0=l(()=>{"use strict";a0=g(require("node:crypto")),l0=g(require("node:fs")),ym=e=>{try{let t=l0.default.readFileSync(e);return a0.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var co,un,W6,d0,bA,u0=l(()=>{"use strict";co=g(require("node:fs")),un=g(require("node:path"));c0();W6=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=un.default.join(t,n,o);return co.default.mkdirSync(un.default.dirname(s),{recursive:!0}),co.default.copyFileSync(r,s),un.default.relative(e,s).replaceAll("\\","/")},d0=e=>{let t=un.default.join(e.repoRoot,e.repoRelativeDestination),r=ym(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(co.default.existsSync(t)){let n=ym(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=W6(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return co.default.mkdirSync(un.default.dirname(t),{recursive:!0}),co.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return co.default.mkdirSync(un.default.dirname(t),{recursive:!0}),co.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},bA=e=>{let t=ym(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var _A,p0,js,Sm=l(()=>{"use strict";_A=g(require("node:fs"));Ds();p0=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),js=e=>{if(!_A.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(_A.default.readFileSync(e,"utf8"));if(p0(t)&&t.version===1&&p0(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var uo,Pm,Am,wA=l(()=>{"use strict";uo=g(require("node:fs")),Pm=g(require("node:path"));Ds();Am=e=>{let t=new Set(e.setSlugs.map(s=>hm(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=Pm.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Pm.default.join(e.repoRoot,i.backupPath);uo.default.existsSync(c)?(uo.default.mkdirSync(Pm.default.dirname(a),{recursive:!0}),uo.default.copyFileSync(c,a),o.push(s)):uo.default.existsSync(a)&&uo.default.rmSync(a,{force:!0})}else uo.default.existsSync(a)&&uo.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var TA,zs,bm=l(()=>{"use strict";TA=g(require("node:path"));Ds();zs=e=>({ledgerFilePath:TA.default.join(e.metaDirPath,n0),backupsDirPath:TA.default.join(e.metaDirPath,s0)})});var CA,m0,g0=l(()=>{"use strict";CA=g(require("node:path")),m0=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return CA.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return CA.default.posix.join(s,e,n)}});var vA,f0,gl,kA=l(()=>{"use strict";vA=g(require("node:fs")),f0=g(require("node:path")),gl=(e,t)=>{vA.default.mkdirSync(f0.default.dirname(e),{recursive:!0}),vA.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var EA,I6,He,po=l(()=>{"use strict";EA=g(require("node:os")),I6=e=>{let t=e.trim();return t.startsWith("~/")?`${EA.default.homedir()}${t.slice(1)}`:t==="~"?EA.default.homedir():t},He=I6});var _m,h0,O6,y0,S0=l(()=>{"use strict";_m=g(require("node:fs")),h0=g(require("node:path"));Ds();Jo();O6=`*
!${Ep}
`,y0=e=>{let t=h0.default.join(e,i0);_m.default.existsSync(t)||(_m.default.mkdirSync(e,{recursive:!0}),_m.default.writeFileSync(t,O6))}});var pn,yt,mn=l(()=>{"use strict";pn=g(require("node:path"));Jo();po();yt=e=>{let t=He(e),r=pn.default.join(t,wx);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:pn.default.join(r,"rag"),memoryDirPath:pn.default.join(r,Tx),reportsDirPath:pn.default.join(r,vx),metaFilePath:pn.default.join(r,Ep),ragChunksFilePath:pn.default.join(r,"rag",Cx)}}});var Qt,A0,M6,N6,qe,wm=l(()=>{"use strict";Qt=g(require("node:fs")),A0=g(require("node:path"));Jo();S0();mn();M6=(e,t)=>{if(Qt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Qt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},N6=e=>{Qt.default.existsSync(e.ragChunksFilePath)||Qt.default.writeFileSync(e.ragChunksFilePath,"");let t=A0.default.join(e.memoryDirPath,ys);Qt.default.existsSync(t)||Qt.default.writeFileSync(t,"")},qe=e=>{let t=yt(e.projectFolderPath);return Qt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Qt.default.mkdirSync(t.ragDirPath,{recursive:!0}),Qt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),y0(t.metaDirPath),M6(t,e),N6(t),{ok:!0,layout:t}}});var b0,_0,w0,T0,Tm,Cm=l(()=>{"use strict";b0="components",_0="store",w0="versions",T0="installed.json",Tm=e=>`harness-set:${e.trim()}`});var LA,C0,vm,RA=l(()=>{"use strict";LA=g(require("node:fs")),C0=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vm=e=>{if(!LA.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(LA.default.readFileSync(e,"utf8"));if(C0(t)&&t.version===1&&C0(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var fl,$s,km=l(()=>{"use strict";fl=g(require("node:path"));Cm();$s=e=>{let t=fl.default.join(e,b0);return{componentsRootDir:t,storeDir:fl.default.join(t,_0),versionsDir:fl.default.join(t,w0),installedFilePath:fl.default.join(t,T0)}}});var xA,v0,Em,Lm,Rm=l(()=>{"use strict";xA=g(require("node:crypto")),v0=g(require("node:fs")),Em=e=>xA.default.createHash("sha256").update(e,"utf8").digest("hex"),Lm=e=>{try{let t=v0.default.readFileSync(e);return xA.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var WA,k0,E0,L0=l(()=>{"use strict";WA=g(require("node:fs")),k0=g(require("node:path")),E0=(e,t)=>{WA.default.mkdirSync(k0.default.dirname(e),{recursive:!0}),WA.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var IA,OA,R0,x0=l(()=>{"use strict";IA=g(require("node:fs")),OA=g(require("node:path")),R0=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=OA.default.join(e,r),n=OA.default.join(o,`${t.versionId}.json`);IA.default.mkdirSync(o,{recursive:!0}),IA.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var xm,W0,I0,O0=l(()=>{"use strict";xm=g(require("node:fs")),W0=g(require("node:path"));Rm();I0=e=>{let t=Em(e.content),r=W0.default.join(e.storeDir,t);return xm.default.existsSync(r)||(xm.default.mkdirSync(e.storeDir,{recursive:!0}),xm.default.writeFileSync(r,e.content)),t}});var MA,M0,D6,Wm,NA=l(()=>{"use strict";MA=g(require("node:fs")),M0=g(require("node:path"));Cm();RA();km();Rm();L0();x0();O0();D6=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Wm=e=>{let t=$s(e.installDir),r=Tm(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!D6(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=M0.default.join(e.harnessRootDir,a);if(!MA.default.existsSync(c))continue;let d=MA.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Lm(c);if(u!==null){if(Em(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);I0({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:u})}}if(n.length===0)return;R0(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=vm(t.installedFilePath);E0(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var jA,DA,N0,D0=l(()=>{"use strict";jA=g(require("node:fs"));NA();RA();km();DA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),N0=e=>{if(!jA.default.existsSync(e.harnessManifestPath))return;let t=$s(e.installDir),r=vm(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(jA.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!DA(o)||o.version!==1||!DA(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!DA(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Wm({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var zA,j0,z0,$0=l(()=>{"use strict";zA=g(require("node:fs")),j0=g(require("node:path")),z0=e=>{let t=e.componentId.replaceAll("/","_"),r=j0.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!zA.default.existsSync(r))return null;try{let o=JSON.parse(zA.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Im,Om,F0,H0=l(()=>{"use strict";Im=g(require("node:fs")),Om=g(require("node:path"));Cm();D0();$0();km();Rm();F0=e=>{N0({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=$s(e.layout.installDir),r=Tm(e.setSlug),o=z0({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Om.default.join(t.storeDir,i.contentSha256);if(Im.default.existsSync(a)&&Lm(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Om.default.join(e.layout.harnessRootDir,n):Om.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Im.default.existsSync(s))return null;try{if(!Im.default.statSync(s).isFile())return null}catch{return null}return s}});var U0,j6,$A,er,hl=l(()=>{"use strict";Sm();bm();mn();U0="harness-set:",j6=e=>{let t=e.trim();if(!t.startsWith(U0))return null;let r=t.slice(U0.length).trim();return r.length>0?r:null},$A=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=j6(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},er=e=>{let t=yt(e),{ledgerFilePath:r}=zs(t),o=js(r);return $A(o)}});var Mm,FA,yl,z6,_r,Sl,Fs=l(()=>{"use strict";Mm=g(require("node:fs")),FA=g(require("node:os")),yl=g(require("node:path")),z6=()=>Mm.default.realpathSync(yl.default.resolve(FA.default.homedir())),_r=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?yl.default.join(FA.default.homedir(),t.slice(1)):t,o;try{o=Mm.default.realpathSync(yl.default.resolve(r))}catch{return null}let n=z6();return o===n||o.startsWith(`${n}${yl.default.sep}`)?o:null},Sl=e=>{let t=_r(e);if(t===null)return null;try{if(!Mm.default.statSync(t).isFile())return null}catch{return null}return t}});var HA,UA=l(()=>{"use strict";HA=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Dm,B0,Nm,$6,Pl,BA=l(()=>{"use strict";Dm=g(require("node:fs")),B0=g(require("node:path"));Ds();u0();Sm();wA();bm();g0();kA();po();wm();H0();hl();Fs();UA();Nm=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$6=e=>{if(!Dm.default.existsSync(e))return null;try{let t=JSON.parse(Dm.default.readFileSync(e,"utf8"));if(Nm(t)&&t.version===1)return t}catch{return null}return null},Pl=e=>{let t=[...new Set(e.setSlugs.map(A=>A.trim()).filter(A=>A.length>0))],r=He(e.projectFolderPath),o=_r(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Dm.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=qe({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=zs(s.layout),d=er(o).filter(A=>!t.includes(A)),u=js(i),m=0;if(d.length>0){let A=Am({repoRoot:o,setSlugs:d,ledger:u});u=A.ledger,m=A.summary.removedPaths.length}if(t.length===0)return gl(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let S=$6(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let f=Nm(S.sets)?S.sets:{},y=0,p=0,P=0;for(let A of t){let h=f[A];if(!Nm(h))return{ok:!1,errorMessage:`Harness set "${A}" is not installed locally.`};let b=typeof h.version=="number"?String(h.version):"1",w=hm(A),C=Array.isArray(h.items)?h.items:[];for(let v of C){if(!Nm(v))continue;let E=typeof v.path=="string"?v.path.trim():"";if(E.length===0)continue;let x=HA(E);if(x===null)continue;let I=m0(A,x),N=B0.default.posix.join(".cursor",I).replaceAll("\\","/"),U=typeof v.id=="string"?v.id.trim():"",V=F0({layout:e.layout,setSlug:A,setVersion:typeof h.version=="number"?h.version:1,manifestItemPath:E,manifestItemId:U});if(V===null)continue;let q=d0({repoRoot:o,backupsDir:a,repoRelativeDestination:N,sourceAbsolutePath:V,componentId:w,versionId:b,ledger:u});if(q.kind==="skipped_unchanged"){p+=1;continue}if(q.kind==="backed_up_user_file"){P+=1,y+=1,u={version:1,entries:{...u.entries,[N]:bA({componentId:w,versionId:b,sourceAbsolutePath:V,backupPath:q.backupPath})}};continue}y+=1,u={version:1,entries:{...u.entries,[N]:bA({componentId:w,versionId:b,sourceAbsolutePath:V})}}}}return y===0&&p===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(gl(i,u),{ok:!0,writtenFileCount:y,skippedFileCount:p,backedUpFileCount:P,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var G0,jm,F6,H6,U6,B6,G6,V6,q6,K6,J6,Al,zm=l(()=>{"use strict";G0=g(require("node:crypto")),jm=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},F6=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},H6=(e,t)=>{let r=F6(t),o=jm(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},U6=(e,t,r)=>{let o=H6(t,r);return`shared/items/${e}/${o}`},B6=["rules","skills","commands","instructions","agents"],G6=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),V6=(e,t)=>[...e.filter(o=>o.id!==t.id),t],q6=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},K6=e=>G0.default.createHash("sha256").update(e,"utf8").digest("hex"),J6=e=>({id:e.id,kind:e.kind,title:e.title,path:U6(e.id,e.kind,e.title),contentSha256:K6(e.content)}),Al=e=>{let t=new Date().toISOString(),r=e.existingManifest??G6(e.hostname,t),o=jm(e.bundle.slug),n=q6(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...B6.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let m=J6(u);return{files:[...d.files,{relativePath:m.path,content:u.content}],nextItems:V6(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var mo,V0,$m,X6,gn,GA=l(()=>{"use strict";mo=g(require("node:fs")),V0=g(require("node:os")),$m=g(require("node:path"));zm();X6=e=>{if(!mo.default.existsSync(e))return null;try{let t=JSON.parse(mo.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},gn=e=>{try{let t=X6(e.layout.harnessManifestPath),r=Al({bundle:e.bundle,hostname:V0.default.hostname(),existingManifest:t});mo.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)mo.default.mkdirSync($m.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=$m.default.join(e.layout.harnessRootDir,o.relativePath);mo.default.mkdirSync($m.default.dirname(n),{recursive:!0}),mo.default.writeFileSync(n,o.content)}return mo.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var VA,q0=l(()=>{"use strict";GA();BA();VA=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=gn({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Pl({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var K0,J0=l(()=>{"use strict";K0=["rule","skill","command","instruction","agent"]});var X0,Y6,Z6,tr,qA=l(()=>{"use strict";J0();X0=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Y6=e=>typeof e=="string"&&K0.includes(e),Z6=e=>{if(!X0(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!Y6(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},tr=e=>{if(!X0(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=Z6(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var Y0,Q6,KA,Z0=l(()=>{"use strict";Y0=require("node:zlib");qA();Q6="x-agent-witch-token",KA=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[Q6]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,Y0.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=tr(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var XA,JA,rr,Q0=l(()=>{"use strict";XA=g(require("node:fs")),JA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rr=e=>{if(!XA.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(XA.default.readFileSync(e.harnessManifestPath,"utf8"));if(!JA(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=JA(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!JA(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Fm,eI=l(()=>{"use strict";Fm=()=>"~"});var tI,rI,oI=l(()=>{"use strict";tI=require("node:crypto"),rI=e=>`local-${(0,tI.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var YA,nI=l(()=>{"use strict";YA=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var bl,Hm,ZA=l(()=>{"use strict";bl=g(require("node:path")),Hm=e=>{let t=bl.default.dirname(e),r=bl.default.basename(t);return r==="agents"?bl.default.basename(bl.default.dirname(t)):r}});var _l,wr,sI,e7,t7,r7,Um,iI,QA=l(()=>{"use strict";_l=g(require("node:fs")),wr=g(require("node:path"));oI();nI();ZA();sI=new Set(["node_modules",".git","dist","build",".next","coverage"]),e7=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},t7=(e,t)=>{let r=wr.default.basename(t);if(e==="skill"){let o=t.split(wr.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},r7=e=>{let t=[],r=(n,s)=>{let i;try{i=_l.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&sI.has(a.name))continue;let c=wr.default.join(n,a.name),d=s?wr.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;YA(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=wr.default.join(e,n);_l.default.existsSync(s)&&r(s,n)}let o=wr.default.join(e,"skills");return _l.default.existsSync(o)&&r(o,"skills"),t},Um=e=>{let t=r7(e);if(t.length===0)return null;let r=wr.default.dirname(e),o=Hm(e),n=e7(o),s=t.map(i=>{let a=YA(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:rI(i.absolutePath),kind:a,title:t7(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},iI=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=_l.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||sI.has(a.name))continue;let c=wr.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var aI,eb,o7,tb,lI=l(()=>{"use strict";aI=g(require("node:fs")),eb=g(require("node:path"));QA();Fs();o7=e=>{let t=_r(e.trim());if(t===null)return null;if(eb.default.basename(t)===".cursor")return t;let r=eb.default.join(t,".cursor");try{if(aI.default.statSync(r).isDirectory())return _r(r)}catch{return null}return null},tb=e=>{let t=o7(e.projectPath);if(t===null)return null;let r=Um(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var cI,n7,Bm,rb,dI=l(()=>{"use strict";cI=g(require("node:path"));QA();Fs();ZA();n7=5,Bm=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},rb=e=>{let t=_r(e.scanRoot.trim());if(t===null)return Bm(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of iI(t,n7,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=_r(s);if(i===null)continue;let a=Hm(i);Bm(e.response,"folder",{cursorDir:i,groupName:a,repoPath:cI.default.dirname(i)});let c=Um(i);c!==null&&(r.push(c),Bm(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Bm(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var uI,pI,mI=l(()=>{"use strict";uI=g(require("node:path")),pI=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:uI.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Ke,gI,ob,s7,nb,sb,Gm,ib,wl,fI=l(()=>{"use strict";Ke=g(require("node:fs")),gI=g(require("node:os")),ob=g(require("node:path"));zm();NA();Fs();mI();s7=e=>{if(!Ke.default.existsSync(e))return null;try{let t=JSON.parse(Ke.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},nb=e=>{let t=e.hostname??gI.default.hostname(),r=s7(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let c=[];for(let u of a){let m=Sl(u.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let S=Ke.default.readFileSync(m,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:S,setSlugs:[i.slug]})}let d=Al({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Ke.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Ke.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=ob.default.join(e.layout.harnessRootDir,i.relativePath);Ke.default.mkdirSync(ob.default.dirname(a),{recursive:!0}),Ke.default.writeFileSync(a,i.content)}Ke.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=jm(i.slug),d=r.sets[c];d!==void 0&&Wm({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},sb="reveal-cache.json",Gm=(e,t)=>{Ke.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Ke.default.writeFileSync(`${e.harnessRootDir}/${sb}`,`${JSON.stringify(t,null,2)}
`)},ib=e=>{let t=`${e.harnessRootDir}/${sb}`;Ke.default.existsSync(t)&&Ke.default.unlinkSync(t)},wl=e=>{let t=`${e.harnessRootDir}/${sb}`;if(!Ke.default.existsSync(t))return null;try{let r=JSON.parse(Ke.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return pI(r)}catch{return null}return null}});var go=l(()=>{"use strict";BA();q0();UA();GA();Z0();qA();zm();Q0();eI();lI();Fs();dI();fI()});var ab,hI=l(()=>{"use strict";go();ze();ab=e=>{let t=O(e.profileEmail);return gn({bundle:e.bundle,layout:t})}});var yI=l(()=>{"use strict";hI();go()});var i7,SI,a7,PI,fn,Vm,AI=l(()=>{"use strict";i7=["agentwitch.com","www.agentwitch.com"],SI=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,a7=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},PI=e=>{let t=a7(e);return!!(i7.includes(t)||SI.test(e.trim().toLowerCase()))},fn=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return PI(r)?SI.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Vm=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:fn(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Tl=l(()=>{"use strict";AI()});var Tr,Cl=l(()=>{"use strict";Tr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var vl,bI=l(()=>{"use strict";yI();Tl();Cl();vl=e=>{if(!Tr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=tr(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!fn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=ab({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var lb=l(()=>{"use strict";bI()});var l7,Hs,cb=l(()=>{"use strict";l7=e=>e==="hourly"||e==="daily"||e==="weekdays",Hs=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!l7(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var kl,qm,_I,wI,db,xt,Km,Jm,Xm,Ym,Zm=l(()=>{"use strict";kl=g(require("node:fs")),qm=g(require("node:path"));cb();_I="automations.json",wI=e=>e.profileEmail!==null?qm.default.join(e.installDir,"profiles",e.profileEmail,_I):qm.default.join(e.installDir,_I),db=()=>({version:1,automations:[]}),xt=e=>{let t=wI(e);if(!kl.default.existsSync(t))return db();try{let r=JSON.parse(kl.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?db():{version:1,automations:r.automations.flatMap(n=>{let s=Hs(n);return s!==null?[s]:[]})}}catch{return db()}},Km=(e,t)=>{let r=wI(e);kl.default.mkdirSync(qm.default.dirname(r),{recursive:!0}),kl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Jm=(e,t)=>{Km(e,{version:1,automations:t})},Xm=(e,t)=>{let o=xt(e).automations.filter(n=>n.id!==t.id);Km(e,{version:1,automations:[...o,t]})},Ym=(e,t)=>xt(e).automations.find(r=>r.id===t)??null});var Ue,Cr=l(()=>{"use strict";Ue="x-agent-witch-token"});var ub=l(()=>{"use strict";Hp();Bp()});var Y,hn,pb,El,mb,c7,gb,Ll,yn,fb,Us=l(()=>{"use strict";Cr();ub();Y=e=>{let t=Re(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},hn=e=>({[Ue]:e,"Content-Type":"application/json"}),pb=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:hn(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},El=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:hn(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},mb=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:hn(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},c7=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},gb=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:hn(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Ll=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:hn(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return c7(r)}catch{return null}},yn=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:hn(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},fb=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:hn(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Sn,TI,CI,d7,hb,vI,yb=l(()=>{"use strict";Sn=g(require("node:fs")),TI=g(require("node:path")),CI=e=>TI.default.join(e.harnessRootDir,"projects-registry.json"),d7=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),hb=e=>{let t=CI(e);if(!Sn.default.existsSync(t))return[];try{let r=JSON.parse(Sn.default.readFileSync(t,"utf8"));return d7(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},vI=e=>{let t=CI(e);if(!Sn.default.existsSync(t))return;let r=`${t}.migrated`;if(Sn.default.existsSync(r)){Sn.default.unlinkSync(t);return}Sn.default.renameSync(t,r)}});var kI,u7,p7,EI,LI=l(()=>{"use strict";po();kI=e=>He(e),u7=e=>new Set(e.map(t=>kI(t.folderPath))),p7=e=>new Set(e.map(t=>t.id)),EI=(e,t)=>{let r=u7(t),o=p7(t),n=[],s=new Set;for(let i of e){let a=kI(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var Sb,Pb=l(()=>{"use strict";Us();yb();LI();Sb=async(e,t)=>{let r=hb(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Ll(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=EI(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await gb(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&vI(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var Ab,vr,Rl=l(()=>{"use strict";Ab=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),vr=(e,t)=>e.find(r=>r.id===t)??null});var fo,xl=l(()=>{"use strict";Us();Pb();Rl();fo=async(e,t)=>{t!==void 0&&await Sb(t,e);let r=Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Ll(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=Ab(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var RI=l(()=>{"use strict"});var bb,m7,Qm,_b=l(()=>{"use strict";bb=g(require("node:fs"));mn();m7=e=>{let t=yt(e);if(!bb.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(bb.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},Qm=m7});var wb,Tb,xI=l(()=>{"use strict";wb=g(require("node:path"));po();_b();Tb=e=>{let t=wb.default.resolve(He(e)),r=o=>{let{projectId:n}=Qm(o);if(n!==null)return n;let s=wb.default.dirname(o);return s===o?null:r(s)};return r(t)}});var g7,f7,eg,Cb=l(()=>{"use strict";g7="Default",f7=e=>e.trim().toLowerCase()===g7.toLowerCase(),eg=f7});var Q,WI,h7,y7,S7,P7,A7,ho,tg=l(()=>{"use strict";Cb();Q=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WI=(e,t)=>e.length===0?`<p class="empty">${Q(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Q(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Q(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,h7=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,y7=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from Agent Witch Cloud.":"This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Q(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},S7=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
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
      </div>`},P7=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?S7({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?y7({project:e.project,alreadyInRepo:!1}):h7();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),u=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this Mac.');">
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
      </div>`},A7=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Q(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Q(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},ho=e=>{let t=e.flashError?`<div class="alert-error">${Q(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Q(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(m,S)=>`<a class="project-tab${e.activeTab===m?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${m}">${Q(S)}</a>`,n=e.composition?.items.filter(m=>m.kind==="workflow")??[],s=e.composition?.items.filter(m=>m.kind==="agent")??[],i="";e.activeTab==="harness"?i=P7({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=WI(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=WI(s,"No agents installed for this project yet."):i=A7({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});let a=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,c=`${a}?rename=1`,d=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${Q(a)}" target="_blank" rel="noopener noreferrer">Open in Agent Witch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${Q(c)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,u=eg(e.project.name)?"":`<section class="danger-zone stack">
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
    </section>${u}`}});var b7,_7,II,OI=l(()=>{"use strict";go();Cr();b7=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_7=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[Ue]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!b7(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=tr(n);return s===null?[]:[s]})}catch{return null}},II=_7});var MI,vb,NI=l(()=>{"use strict";le();go();tg();xl();OI();Rl();hl();Us();ht();MI=e=>({kind:"page",title:e.project.name,body:ho({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:rr(e.layout),linkedSetSlugs:er(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),vb=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let o=await fo(r,e.layout),n=vr(o.projects,t);if(n===null)return{kind:"not_found"};let s=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??it,a=s===null?null:await II(s,n.id);if(a===null)return MI({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=VA({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return MI({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await yn(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var DI,kb,jI=l(()=>{"use strict";le();go();ht();Us();tg();wm();po();xl();Rl();hl();Sm();wA();bm();kA();DI=e=>({kind:"page",title:e.project.name,body:ho({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:rr(e.layout),linkedSetSlugs:er(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),kb=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=$();if(n===null)return{kind:"not_found"};let s=await fo(n,e.layout),i=vr(s.projects,r);if(i===null)return{kind:"not_found"};let a=Y({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??it;if(o.length===0)return DI({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=He(i.projectFolderPath),u=qe({projectFolderPath:d}),{ledgerFilePath:m}=zs(u.layout),S=js(m),f=$A(S);if(!f.includes(o))return DI({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let y=f.filter(h=>h!==o),p=Am({repoRoot:u.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:S});gl(m,p.ledger);let P=a===null?!1:await yn(a,i.id,y),A=new URLSearchParams({linked:"1",removed:o,files:String(p.summary.removedPaths.length),bindingsSynced:P?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${A.toString()}`}}});var w7,Eb,zI=l(()=>{"use strict";w7=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,Eb=w7});var $I=l(()=>{"use strict"});var FI=l(()=>{"use strict"});var HI=l(()=>{"use strict";$I();FI()});var T7,yo,UI=l(()=>{"use strict";T7=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],yo=(e=process.env)=>{let t={...e};for(let r of T7)delete t[r];return t}});var BI=l(()=>{"use strict";UI()});var Lb,GI=l(()=>{"use strict";Lb={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var Rb=l(()=>{"use strict";GI()});var rg,xb=l(()=>{"use strict";rg={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var og=l(()=>{"use strict";HI();BI();ht();Rb();xb()});var VI,qI,C7,ng,sg,KI=l(()=>{"use strict";VI=require("node:child_process"),qI=require("node:util");og();C7=(0,qI.promisify)(VI.execFile),ng=async(e,t)=>{try{let{stdout:r}=await C7("git",t,{cwd:e,env:yo(),maxBuffer:1048576});return r.trim()}catch{return null}},sg=async e=>{let t=await ng(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await ng(e,["rev-parse","--abbrev-ref","HEAD"]),o=await ng(e,["status","--porcelain"]),n=await ng(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var Wb,JI=l(()=>{"use strict";Wb=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var v7,Ib,XI=l(()=>{"use strict";v7=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},Ib=v7});var k7,Ob,YI=l(()=>{"use strict";Cr();k7=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[Ue]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},Ob=k7});var ZI,So,QI=l(()=>{"use strict";ZI=require("node:child_process"),So=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,ZI.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var eO=l(()=>{"use strict";xl()});var Wl,tO=l(()=>{"use strict";Cr();Wl=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[Ue]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var Mb,rO=l(()=>{"use strict";Cr();Mb=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[Ue]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var Wt=l(()=>{"use strict";xl();Rl();RI();po();wm();xI();NI();jI();hl();zI();KI();JI();XI();YI();QI();eO();tO();rO();Pb();yb();Us()});var ig,Il,oO,Nb,Pn,Db=l(()=>{"use strict";ig=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},Il=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=ig(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},oO=e=>e>=1&&e<=5,Nb=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return ig(t,"UTC")},Pn=e=>{let t=e.from??new Date,r=ig(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Il(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=Il(r,e.timeZone,o,0),s=ig(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?Il(Nb(r),e.timeZone,o,0):n;if(!i&&oO(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=Nb(a),oO(a.weekday))return Il(a,e.timeZone,o,0);return Il(Nb(r),e.timeZone,o,0)}});var nO,jb,kr,zb=l(()=>{"use strict";nO=require("node:crypto");le();Wt();Db();Zm();jb=!1,kr=async e=>{if(jb)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Y({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=Ym(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};jb=!0;let n=(0,nO.randomUUID)();try{let s=await Ms(t,"claude-cli",o.prompt);await fb(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=Pn({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return Xm(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{jb=!1}}});var ag,sO=l(()=>{"use strict";le();zb();Zm();ag=async()=>{let e=$();if(e===null)return;let t=xt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await kr(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var Ol=l(()=>{"use strict";Zm();sO();zb();Db()});var iO=l(()=>{"use strict";Ol()});var aO=l(()=>{"use strict";cb()});var lO=l(()=>{"use strict";aO()});var $b=l(()=>{"use strict";Ol()});var E7,L7,Ml,Fb=l(()=>{"use strict";iO();lO();$b();ze();E7=e=>e!==void 0&&e.trim().length>0?O(e.trim()):O(),L7=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Pn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Pn({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Ml=e=>{let t=E7(e.profileEmail),r=xt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Hs(s);return i!==null?[L7(i,o.get(i.id))]:[]});return Jm(t,n),{ok:!0,writtenCount:n.length}}});var Hb=l(()=>{"use strict";Ol()});var cO=l(()=>{"use strict";le()});var dO=l(()=>{"use strict";Fb();Hb();$b();cO()});var uO,Nl,Dl,jl,pO=l(()=>{"use strict";uO=g(require("node:os"));dO();Tl();Cl();Nl=e=>{if(!Tr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!fn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=Ml({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Dl=async e=>{if(!Tr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:fn(t)?kr(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},jl=()=>{let e=$(),t=e!==null?xt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:uO.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var Ub=l(()=>{"use strict";pO()});var lg=l(()=>{"use strict";re()});var cg=l(()=>{"use strict";re()});var dg,gO,fO,mO,R7,x7,Bs,Bb=l(()=>{"use strict";dg=g(require("node:fs")),gO=g(require("node:os")),fO=g(require("node:path"));lg();cg();cl();ze();mO=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},R7=e=>fO.default.join(gO.default.homedir(),"Library","LaunchAgents",`${e}.plist`),x7=async e=>dg.default.existsSync(R7(e))?(await je(e)).ok:!1,Bs=async(e=k())=>{let t=dg.default.existsSync(gm(e)),r=!dg.default.existsSync(Kt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=ll(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await mO(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${fe(e)}-wake`;await x7(i)&&s.push(i);for(let c of se(e))(await je(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await mO(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var hO=l(()=>{"use strict";re()});var Gb=l(()=>{"use strict";an();re()});var Vb=l(()=>{"use strict";an()});var qb=l(()=>{"use strict";re()});var SO,yO,zl,Kb=l(()=>{"use strict";SO=g(require("node:fs"));ht();lg();cg();ze();yO=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},zl=async(e=k())=>{if(!SO.default.existsSync(Kt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await yO())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of se(e))(await je(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await yO();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var PO=l(()=>{"use strict";re()});var AO,An,Jb,W7,I7,O7,bO,M7,_O,Gs,ug=l(()=>{"use strict";AO=require("node:crypto"),An=g(require("node:fs")),Jb=g(require("node:path"));ze();W7="watchdog-log.ndjson",I7=200,O7=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bO=(e=k())=>{let t=O(),r=t.installDir===e?t.logsDir:Bo({installDir:e,profileEmail:t.profileEmail});return Jb.default.join(r,W7)},M7=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!O7(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},_O=(e,t=k())=>{let r={id:(0,AO.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=bO(t);An.default.mkdirSync(Jb.default.dirname(o),{recursive:!0});let n=An.default.existsSync(o)?An.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-I7+1)),JSON.stringify(r)];return An.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Gs=(e=20,t=k())=>{let r=bO(t);if(!An.default.existsSync(r))return[];let o=An.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=M7(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var Xb,Yb,Zb,Qb=l(()=>{"use strict";Ae();Xb=ra.watchdogReinstallState,Yb=900*1e3,Zb=3e3});var wO=l(()=>{"use strict";Qb()});var TO={};ft(TO,{verifyAgentWitchReviveAfterKickstart:()=>D7});var N7,D7,CO=l(()=>{"use strict";wO();Vb();qb();ze();N7=e=>new Promise(t=>{setTimeout(t,e)}),D7=async e=>{if(await N7(e.verifyDelayMs??Zb),!await Vo(e.launchAgentLabel))return!1;let r=e.profileEmail===null?O():O(e.profileEmail),o=Se(r);return!xe(o,e.staleAfterMs)}});var $l,e_,j7,vO,kO,t_,r_,o_=l(()=>{"use strict";$l=g(require("node:fs")),e_=g(require("node:path"));B();Qb();j7=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vO=e=>e_.default.join(e,Xb),kO=(e=k())=>{let t=vO(e);if(!$l.default.existsSync(t))return null;try{let r=JSON.parse($l.default.readFileSync(t,"utf8"));return!j7(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},t_=(e=k(),t=Date.now())=>{let r=kO(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=Yb:!0},r_=(e=k(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=vO(e);return $l.default.mkdirSync(e_.default.dirname(o),{recursive:!0}),$l.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var n_,EO=l(()=>{"use strict";re();o_();n_=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!t_())return{attempted:!1,ok:!1,targets:e};r_();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await je(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var LO=l(()=>{"use strict";o_();EO()});var s_=l(()=>{"use strict";Yt()});var RO=l(()=>{"use strict";Yt()});var xO,Vs,WO,IO,OO,z7,$7,MO,F7,H7,NO,DO=l(()=>{"use strict";xO=require("node:child_process"),Vs=g(require("node:fs")),WO=g(require("node:os")),IO=g(require("node:path")),OO=require("node:util");s_();RO();ze();z7=(0,OO.promisify)(xO.execFile),$7=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),MO=e=>{let t=De(e),r=t===null?O():O(t);if(!Vs.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Vs.default.readFileSync(r.configPath,"utf8"));return!$7(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},F7=e=>MO(e)?.wsUrl??null,H7=e=>{let t=F7(e);return t!==null?Re(t):$e(e)?.appOrigin??null},NO=async e=>{let t=e?.installDir??k(),r=MO(t),o=r!==null?Re(r.wsUrl):H7(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=IO.default.join(WO.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Vs.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??De(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await z7("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Vs.default.existsSync(i)&&Vs.default.unlinkSync(i)}}});var jO={};ft(jO,{attemptAgentWitchWatchdogReinstall:()=>U7});var U7,zO=l(()=>{"use strict";LO();DO();U7=async e=>n_(e,()=>NO())});var $O,FO,HO,B7,G7,V7,Fl,i_=l(()=>{"use strict";hO();Gb();Vb();qb();Kb();Bb();lg();cg();ze();ws();PO();ug();$O=e=>e===null?O():O(e),FO=async(e,t,r)=>{if(!await Vo(e))return"not_running";let n=$O(t);if(Et(n))return"healthy";let s=Se(n);return xe(s,r)?"stale_connection":"healthy"},HO=async e=>{let t=e?.staleAfterMs??12e4,r=k(),o=se(r);return Promise.all(o.map(async n=>{let s=await FO(n.launchAgentLabel,n.profileEmail,t),i=$O(n.profileEmail),a=Se(i),c=await Vo(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:xe(a,t),needsRevive:s!=="healthy",reason:s}}))},B7=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},G7=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",V7=async e=>{let t=await je(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(CO(),TO)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Fl=async e=>{if(!kt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=k();await Bs(r),await zl(r);let o=se(r),n=[];for(let u of o){let m=await FO(u.launchAgentLabel,u.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:m});continue}n.push(await V7({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let u=Go();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(zO(),jO)),m=await u(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&_O({event:G7(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:B7(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var UO,pg,BO=l(()=>{"use strict";UO=g(require("node:os"));Gb();ug();i_();pg=async()=>{let e=await HO(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:UO.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Gs(1)[0]??null}}});var a_=l(()=>{"use strict";Bb();i_();BO();ug()});var Hl,Ul,Bl,GO=l(()=>{"use strict";re();a_();Hl=async()=>{await Bs();let e=se(),t=[];for(let r of e){let o=await je(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Go();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Ul=Fl,Bl=Fl});var l_=l(()=>{"use strict";GO()});var gg,mg,VO,c_,qO,q7,K7,J7,X7,Y7,fg,KO=l(()=>{"use strict";gg=require("node:child_process"),mg=g(require("node:fs")),VO=g(require("node:os")),c_=g(require("node:path")),qO=require("node:util");re();B();q7=(0,qO.promisify)(gg.execFile),K7=()=>c_.default.join(VO.default.homedir(),"Library","LaunchAgents"),J7=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await q7("launchctl",["bootout",r]).catch(()=>{})},X7=e=>{let t=c_.default.join(K7(),`${e}.plist`);mg.default.existsSync(t)&&mg.default.unlinkSync(t)},Y7=e=>{(0,gg.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},fg=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=k();if(!mg.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=yr(e);for(let r of t)await J7(r),X7(r);return Y7(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var JO,hg,XO,qs,YO,Z7,Q7,eX,d_,tX,u_,ZO=l(()=>{"use strict";JO=require("node:child_process"),hg=g(require("node:fs")),XO=g(require("node:os")),qs=g(require("node:path")),YO=require("node:util");re();Z7=(0,YO.promisify)(JO.execFile),Q7=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],eX=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],d_=e=>{hg.default.existsSync(e)&&hg.default.rmSync(e,{force:!0})},tX=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await Z7("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},u_=async e=>{let r=(e.listLaunchAgentLabels??yr)(e.layout.installDir),o=e.launchAgentsDir??qs.default.join(XO.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??tX;for(let i of r)await n(i),d_(qs.default.join(o,`${i}.plist`));let s=qs.default.dirname(e.layout.configPath);for(let i of Q7)d_(qs.default.join(s,i));for(let i of eX)d_(qs.default.join(e.layout.installDir,i));return hg.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var p_,QO=l(()=>{"use strict";p_="unknown_identity"});var m_=l(()=>{"use strict";xb();QO()});var rX,g_,eM=l(()=>{"use strict";m_();rX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),g_=e=>e.type!=="system.error"||!rX(e.payload)?!1:e.payload.errorCode===p_});var f_=l(()=>{"use strict";KO();ZO();eM()});var yg=l(()=>{"use strict";re();Yt();f_();a_()});var Ks,Sg,Pg=l(()=>{"use strict";yg();Ks=(e=20)=>Gs(e),Sg=pg});var Ag,Js,bg,_g=l(()=>{"use strict";yg();Ag=nn,Js=(e=20)=>tn(e),bg=e=>on(e)});var wg,h_=l(()=>{"use strict";yg();wg=()=>fg()});var tM=l(()=>{"use strict";AA();lb();Ub();l_();Pg();_g();h_()});var rM={};ft(rM,{buildAgentWitchAutomationStatusFromWakeServer:()=>jl,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Ag,buildAgentWitchWakeHealthResponse:()=>ul,buildAgentWitchWakeIdentityResponse:()=>pl,buildAgentWitchWatchdogStatus:()=>Sg,installHarnessFromWakeServer:()=>vl,readAgentWitchSelfUpdateLogEntries:()=>Js,readAgentWitchWatchdogLogEntries:()=>Ks,restartAgentWitchFromWakeServer:()=>Bl,reviveAgentWitchWebSocketFromWakeServer:()=>Ul,runAgentWitchSelfUpdateFromWakeServer:()=>bg,runAgentWitchUninstallLocalFromWakeServer:()=>wg,runAutomationFromWakeServer:()=>Dl,syncAutomationsFromWakeServer:()=>Nl,wakeAgentWitchLaunchAgents:()=>Hl});var oM=l(()=>{"use strict";tM()});var nM,sM,y_,S_,iM=l(()=>{"use strict";nM=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),sM=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?nM(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?nM(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},y_=e=>{let t=e.watchdogLogs.map(sM).join(""),r=e.updateLogs.map(sM).join("");return`<!doctype html>
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
</html>`},S_=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var aM,lM,cM=l(()=>{"use strict";aM=g(require("node:net")),lM=()=>new Promise((e,t)=>{let r=aM.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var dM,oX,nX,P_,uM=l(()=>{"use strict";dM=g(require("node:net"));re();cM();dl();cl();ze();oX=e=>new Promise(t=>{let r=dM.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),nX=e=>new Promise(t=>{setTimeout(t,e)}),P_=async(e={})=>{let t=k(),r=Rt(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await oX(r))return t0(r),r;i<o&&await nX(n)}let s=await lM();fm(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{QS({launchAgentPrefix:fe(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var sX,A_,pM=l(()=>{"use strict";sX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),A_=e=>({force:sX(e)&&e.force===!0})});var Gl=l(()=>{"use strict";Tl();iM();uM();pM();eP();Ip();Yo()});var b_,z,__,w_,Vl,mM=l(()=>{"use strict";b_=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},z=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},__=e=>{e.writeHead(403),e.end()},w_=e=>e.url?.split("?")[0]??"/",Vl=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var It=l(()=>{"use strict";mM()});var iX,gM,fM=l(()=>{"use strict";Ub();It();iX=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},gM=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return z(e.response,200,jl(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await iX(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=Nl(t);return z(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Dl(t);return z(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var aX,yM,hM,SM,T_,PM,C_=l(()=>{"use strict";aX=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],yM=e=>/embed|minilm|^bge-/i.test(e),hM=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),SM=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),T_=e=>e.filter(t=>t.trim().length>0&&!yM(t)),PM=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!yM(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>hM(s,o));if(n!==void 0)return n}for(let n of aX){let s=r.find(i=>hM(i,n));if(s!==void 0)return s}return r[0]??null}});var v_,_M,wM,Tg,TM,AM,bM,lX,cX,dX,uX,pX,mX,Ot,ql=l(()=>{"use strict";v_=require("node:child_process"),_M=g(require("node:fs")),wM=g(require("node:os")),Tg=g(require("node:path"));Yt();Lt();C_();TM=3e3,AM=["claude-cli","codex","cursor","antigravity"],bM={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},lX=(e,t)=>new Promise(r=>{let o=(0,v_.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},TM);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),cX=()=>{let e=wM.default.homedir();return["ollama",Tg.default.join(e,".local","bin","ollama"),Tg.default.join(e,".agent-witch","ollama","ollama"),Tg.default.join(e,".local-agent-witch","ollama","ollama")]},dX=e=>new Promise(t=>{let r=(0,v_.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},TM);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(SM(Buffer.concat(o).toString("utf8")))})}),uX=async()=>{for(let e of cX()){if(e!=="ollama"&&!_M.default.existsSync(e))continue;let t=await dX(e);if(t!==null)return t}return[]},pX=e=>{let t=e.installedWriterIds.map(s=>bM[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=he(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${bM[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},mX=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:Ts},Ot=async e=>{let t=AM.map(i=>{let a=em(i,e.commands);return lX(a.command,a.args)}),[r,...o]=await Promise.all([uX(),...t]),n=AM.flatMap((i,a)=>o[a]===!0?[i]:[]),s=PM(r,mX());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:pX({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var gX,fX,k_,CM=l(()=>{"use strict";gX="http://127.0.0.1:11434",fX=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},k_=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||gX;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?fX(await o.json()):null}catch{return null}}});var E_=l(()=>{"use strict";Lt();ql();CM();C_()});var hX,vM,kM=l(()=>{"use strict";E_();hX={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},vM=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:hX[t]})),ollamaModels:T_(e.ollamaModels)})});var yX,EM,LM=l(()=>{"use strict";E_();It();kM();yX=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},EM=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Ot({commands:ye({})});return z(e.response,200,{ok:!0,...vM({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await yX(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await k_({model:r,prompt:o});return n===null?(z(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(z(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var SX,RM,xM=l(()=>{"use strict";lb();It();SX=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return z(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},RM=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await SX(e);if(t===null)return!0;let r=vl(t);return z(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var WM=l(()=>{"use strict";Wt()});var L_,IM=l(()=>{"use strict";WM();Cl();L_=e=>{if(!Tr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:qe({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var OM,R_,x_=l(()=>{"use strict";le();Wt();Cl();OM=e=>{if(!Tr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},R_=async e=>{let t=OM(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=So("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=$();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Y({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(qe({projectFolderPath:r}),await Wl(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var MM=l(()=>{"use strict";IM();x_()});var NM,DM=l(()=>{"use strict";MM();x_();It();NM=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=L_(t);return z(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await R_(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return z(e.response,o,r,e.cors.headers),!0}return!1}});var jM,zM=l(()=>{"use strict";Gl();_g();Pg();jM=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Ks(50),r=Js(50);return e.response.writeHead(200,S_()),e.response.end(y_({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var $M,FM=l(()=>{"use strict";AA();It();$M=e=>e.request.method==="GET"&&e.pathname==="/health"?(z(e.response,200,ul(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(z(e.response,200,pl(),e.cors.headers),!0):!1});var HM,UM=l(()=>{"use strict";h_();It();HM=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await wg();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}});var BM,GM=l(()=>{"use strict";l_();It();BM=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Ul();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Bl();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Hl();return z(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var VM,qM=l(()=>{"use strict";Gl();_g();It();VM=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Ag();return z(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Vl(e.request,"/update/logs",20,200);return z(e.response,200,{ok:!0,logs:Js(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=A_(t),o=await bg({force:r});return z(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var KM,JM=l(()=>{"use strict";Pg();It();KM=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Sg();return z(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Vl(e.request,"/watchdog/logs",20,200);return z(e.response,200,{ok:!0,logs:Ks(t)},e.cors.headers),!0}return!1}});var XM,YM=l(()=>{"use strict";fM();LM();xM();DM();zM();FM();UM();GM();qM();JM();XM=[$M,jM,KM,BM,VM,HM,RM,NM,gM,EM]});var ZM,QM=l(()=>{"use strict";YM();ZM=async e=>{for(let t of XM)if(await t(e))return!0;return!1}});var PX,eN,tN=l(()=>{"use strict";Tl();It();QM();PX=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:w_(e),readJsonBody:()=>b_(e)}),eN=async(e,t,r)=>{let o=e.headers.origin,n=Vm(o);try{if(o!==void 0&&o.length>0&&!n.allowed){__(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=PX(e,t,r,n);if(await ZM(s))return;z(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{z(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var rN,bn,Cg,vg=l(()=>{"use strict";rN=g(require("node:http"));Gl();tN();bn=async()=>{let e=await P_(),t=rN.default.createServer((r,o)=>{eN(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Cg=bn});var oN={};ft(oN,{runAgentWitchBridgeCli:()=>AX});var AX,nN=l(()=>{"use strict";re();vg();AX=async()=>{nt("agent-witch-bridge");let e=await bn(),t=Pr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var sN=l(()=>{"use strict";ht()});var Xs,W_,iN=l(()=>{"use strict";Xs=(e,t,r)=>e===1?t:r,W_=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Xs(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Xs(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Xs(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Xs(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Xs(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${Xs(u,"year","years")} ago`}});var _n,I_,bX,_X,O_,Po,Kl,M_,aN=l(()=>{"use strict";_n=g(require("node:fs")),I_=g(require("node:path")),bX="local-ws-traffic.ndjson",_X=500,O_=e=>I_.default.join(e.logsDir,bX),Po=(e,t)=>{let r=O_(e);_n.default.mkdirSync(I_.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});_n.default.appendFileSync(r,`${o}
`,"utf8")},Kl=(e,t=_X)=>{let r=O_(e);if(!_n.default.existsSync(r))return[];let n=_n.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},M_=e=>{let t=O_(e);_n.default.existsSync(t)&&_n.default.writeFileSync(t,"","utf8")}});var wX,lN,cN,dN=l(()=>{"use strict";m_();wX=new Set(Object.values(rg)),lN=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cN=e=>{if(!lN(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!wX.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!lN(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var uN,pN=l(()=>{"use strict";uN=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var TX,CX,vX,Jl,mN=l(()=>{"use strict";pN();TX=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,CX=e=>TX.test(e),vX=e=>uN(e),Jl=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Jl(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&CX(o)){r[o]=vX(n);continue}r[o]=Jl(n)}return r}});var or,N_,kX,EX,LX,D_,gN,fN,hN,RX,kg,wn,Eg,j_,yN=l(()=>{"use strict";or=g(require("node:fs")),N_=g(require("node:path"));dN();mN();kX="local-ws-trace.ndjson",EX=1e4,LX=1440*60*1e3,D_=e=>N_.default.join(e.logsDir,kX),gN=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},fN=e=>{if(!or.default.existsSync(e))return;let t=or.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-LX,n=t.filter(s=>{let i=gN(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-EX);or.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},hN=(e,t)=>{let r=D_(e);or.default.mkdirSync(N_.default.dirname(r),{recursive:!0}),or.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),fN(r)},RX=e=>e.parsed===null?{_empty:!0}:Jl(e.parsed),kg=(e,t,r)=>{let o=cN(r);hN(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:RX(o)})},wn=(e,t)=>{hN(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Jl({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Eg=(e,t=80)=>{let r=D_(e);if(fN(r),!or.default.existsSync(r))return[];let o=or.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=gN(s);i!==null&&n.push(i)}return n.reverse()},j_=e=>{let t=D_(e);or.default.existsSync(t)&&or.default.writeFileSync(t,"","utf8")}});var Ao,SN,xX,z_,Lg,PN=l(()=>{"use strict";Ao=g(require("node:fs")),SN=g(require("node:path")),xX=256e3,z_=e=>{Ao.default.mkdirSync(SN.default.dirname(e),{recursive:!0}),Ao.default.writeFileSync(e,"","utf8")},Lg=(e,t=xX)=>{if(!Ao.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Ao.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=Ao.default.openSync(e,"r");try{Ao.default.readSync(a,i,0,s,n)}finally{Ao.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var Xl=l(()=>{"use strict";aN();yN();PN()});var $_,F_,AN=l(()=>{"use strict";$_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),F_=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${$_(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${$_(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${$_(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var bN=l(()=>{"use strict";AN()});var H_,U_=l(()=>{"use strict";H_=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var B_=l(()=>{"use strict";Va()});var G_,V_,_N=l(()=>{"use strict";B_();G_=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},V_=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var wN=l(()=>{"use strict";U_();_N()});var TN,Yl,q_,Zl=l(()=>{"use strict";U_();TN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Yl=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=TN(e),r=TN(H_(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},q_=`(function () {
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
})();`});var Tn,WX,K_,CN=l(()=>{"use strict";Tn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WX=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},K_=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Tn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Tn(r.direction):Tn(r.kind),i=`trace-body-${o}`,a=Tn(WX(r.body));return`<tr>
        <td title="${Tn(r.at)}">${Tn(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${Tn(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var kN,IX,vN,J_,EN=l(()=>{"use strict";Ae();ht();kN=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},IX=e=>kN(e)===hr?cs:ls,vN=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),J_=e=>{let t=IX(e.installDir),o=`AW_HOME="$HOME/${kN(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${vN(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${vN(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var LN=l(()=>{"use strict";Zl();CN();EN();Zl()});var OX,Er,Ql=l(()=>{"use strict";OX=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Er=OX});var RN,xN,WN,IN,ON,MN,NN,Ys=l(()=>{"use strict";RN="projects",xN="knowledge",WN="chunks.ndjson",IN="lessons.ndjson",ON="error-chunks.ndjson",MN="usage-stats.json",NN="knowledge-location.json"});var Rg,MX,xg,X_=l(()=>{"use strict";Rg=g(require("node:path"));Ys();MX=(e,t)=>{let r=t.trim(),o=Rg.default.join(e.installDir,RN,r,xN);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:Rg.default.join(o,WN),memoryRunsFilePath:Rg.default.join(o,IN)}},xg=MX});var Y_,NX,DN,jN=l(()=>{"use strict";Y_=g(require("node:fs"));Ys();mn();NX=e=>{let t=yt(e.projectFolderPath),r=`${t.metaDirPath}/${NN}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};Y_.default.mkdirSync(t.metaDirPath,{recursive:!0}),Y_.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},DN=NX});var Zs,$N,zN,DX,FN,HN=l(()=>{"use strict";Zs=g(require("node:fs")),$N=g(require("node:path"));Jo();mn();X_();jN();zN=(e,t)=>{Zs.default.existsSync(e)&&(Zs.default.existsSync(t)&&Zs.default.statSync(t).size>0||(Zs.default.mkdirSync($N.default.dirname(t),{recursive:!0}),Zs.default.copyFileSync(e,t)))},DX=e=>{let t=yt(e.projectFolderPath),r=xg(e.layout,e.projectId),o=`${t.memoryDirPath}/${ys}`;zN(t.ragChunksFilePath,r.ragChunksFilePath),zN(o,r.memoryRunsFilePath),DN({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},FN=DX});var UN,jX,Qs,Wg=l(()=>{"use strict";UN=g(require("node:path"));Jo();mn();HN();_b();X_();jX=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=Qm(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){FN({layout:e.layout,projectFolderPath:t,projectId:o});let s=xg(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=yt(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:UN.default.join(n.memoryDirPath,ys),projectId:null}},Qs=jX});var Ig,$X,Og,Z_=l(()=>{"use strict";Ig=g(require("node:fs"));Ys();$X=(e,t=500)=>{if(!Ig.default.existsSync(e))return;let r=Ig.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Ig.default.writeFileSync(e,`${o.join(`
`)}
`)},Og=$X});var Mg,FX,Cn,Q_=l(()=>{"use strict";Mg=g(require("node:path"));Ys();Wg();FX=e=>{let t=Qs(e);if(t===null)return null;let r=Mg.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Mg.default.join(r,MN),errorChunksFilePath:Mg.default.join(r,ON)}},Cn=FX});var GN,ec,VN,BN,ew,qN,BX,tw,KN,rw,ow,nw,sw=l(()=>{"use strict";GN=require("node:crypto"),ec=g(require("node:fs")),VN=g(require("node:path"));Ql();Ys();Q_();BN=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),ew=e=>{if(!ec.default.existsSync(e))return BN();try{let t=JSON.parse(ec.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return BN()},qN=(e,t)=>{ec.default.mkdirSync(VN.default.dirname(e),{recursive:!0}),ec.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},BX=e=>{let t=Er(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,GN.createHash)("sha256").update(o).digest("hex").slice(0,16)},tw=e=>{let t=Cn(e);return t===null?null:ew(t.usageStatsFilePath)},KN=e=>{if(e.chunkIds.length===0)return;let t=Cn(e);if(t===null)return;let r=ew(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;qN(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},rw=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=Cn(e);if(r===null)return null;let o=BX(t),n=ew(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return qN(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},ow=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,nw=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var tc,JN,GX,VX,XN,qX,iw,rc,ei,aw,ti,lw,cw=l(()=>{"use strict";tc=g(require("node:fs")),JN=g(require("node:path"));Ql();Wg();Z_();sw();GX="http://127.0.0.1:11434",VX="nomic-embed-text",XN=(e,t,r)=>Qs({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,qX=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},iw=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},rc=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||GX,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||VX;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},ei=(e,t,r)=>{let o=XN(e,t,r);if(o===null||!tc.default.existsSync(o))return[];let n=tc.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},aw=async e=>{let t=Er(e.text),r=iw(t);if(r.length===0)return 0;let o=XN(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;tc.default.mkdirSync(JN.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await rc(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};tc.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return Og(o),n},ti=async e=>{let t=await rc(e.query);if(t===null)return[];let r=e.minScore??0,s=ei(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:qX(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return KN({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},lw=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var oc,YN,KX,JX,dw,uw,pw,ZN=l(()=>{"use strict";oc=g(require("node:fs")),YN=g(require("node:path"));Ql();Q_();Z_();cw();KX=e=>{if(!oc.default.existsSync(e))return[];let t=oc.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},JX=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},dw=async e=>{let t=Cn(e);if(t===null)return 0;let r=Er(e.text),o=iw(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;oc.default.mkdirSync(YN.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await rc(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};oc.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Og(n,200),s},uw=async e=>{let t=Cn(e);if(t===null)return[];let r=await rc(e.query);if(r===null)return[];let o=e.minScore??.3;return KX(t.errorChunksFilePath).map(s=>({chunk:s,score:JX(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},pw=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var mw=l(()=>{"use strict";cw();sw();ZN()});var _e,gw,fw=l(()=>{"use strict";Rb();_e=Lb,gw=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${_e.gray50};
  --aw-zinc-100: ${_e.gray100};
  --aw-zinc-200: ${_e.gray200};
  --aw-zinc-400: ${_e.gray400};
  --aw-zinc-500: ${_e.gray500};
  --aw-zinc-600: ${_e.gray600};
  --aw-zinc-700: ${_e.gray700};
  --aw-zinc-800: ${_e.gray900};
  --aw-zinc-900: ${_e.gray900};
  --aw-brand-600: ${_e.brand600};
  --aw-brand-700: ${_e.brand700};
  --aw-brand-50: ${_e.brand50};
  --aw-emerald-50: ${_e.success50};
  --aw-emerald-700: ${_e.success700};
  --aw-amber-50: ${_e.warning50};
  --aw-amber-900: ${_e.warning900};
  --aw-red-50: ${_e.error50};
  --aw-red-700: ${_e.error700};
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
`.trim()});var XX,YX,hw,QN,yw,eD=l(()=>{"use strict";fw();Zl();XX=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,YX=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],hw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),QN=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${XX}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,yw=e=>{let t=YX.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=hw(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=hw(e.installBundleVersionLabel?.trim()??"unknown"),s=QN("brand brand-in-sidebar",n),i=QN("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${hw(e.title)} \xB7 Agent Witch Local</title>
  <style>${gw}</style>
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
  <script>${q_}</script>
</body>
</html>`}});var Ng,nc,Dg=l(()=>{"use strict";Ng=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nc=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Ng(e.syncMessage)}</p>`:"",o=Ng(e.manageHref),n=Ng(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Ng(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var Sw,Pw,Aw,tD=l(()=>{"use strict";Sw=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,Pw=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,Aw=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var rD=l(()=>{"use strict";eD();Dg();tD()});var ri,bw,oD=l(()=>{"use strict";Zl();ri=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bw=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${ri(e.wakeError)}</div>`:"",a=Yl(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${ri(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${ri(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${ri(o)}</p>
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
        <p class="home-card-meta">${ri(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${ri(n)}</p>
      </a>
    </div>`}});var nD=l(()=>{"use strict";oD()});var L,oi=l(()=>{"use strict";L=e=>e==="passed"||e==="stopped"||e==="failed"});var sD,_w,vn,ww,jg=l(()=>{"use strict";sD="Stopped at the round limit. The best prompt is kept.",_w="Stopped because the score stopped rising. The best prompt is kept.",vn="Finished. The best prompt is the result.",ww="Wizard ended. Progress from finished steps is kept."});var bo,Tw=l(()=>{"use strict";bo=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var ZX,QX,sc,iD,zg=l(()=>{"use strict";ZX=/\n+|;\s+/,QX=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,sc=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(ZX).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,QX(s)]},[]);return[...t,...o]},[]),iD=e=>{let t=sc(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ce,ni=l(()=>{"use strict";ce=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var ic,Cw=l(()=>{"use strict";zg();ni();ic=e=>{let t=[...e.priorRounds,e.current],r=ce(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:iD(o)}}});var vw,e9,t9,$g,kw=l(()=>{"use strict";vw={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},e9=e=>{try{let t=JSON.parse(e.fragment);return{...vw,objects:[...e.objects,t]}}catch{return{...vw,objects:e.objects}}},t9=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:e9(r)},$g=e=>[...e].reduce(t9,vw).objects});var r9,Ew,o9,aD,Lw=l(()=>{"use strict";kw();r9=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},Ew=e=>{let t=$g(e).filter(r9),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},o9=(e,t)=>({...e,passed:e.score>=t}),aD=(e,t)=>{let r=Ew(e);return r===null?null:o9(r,t)}});var Rw,xw,Fg=l(()=>{"use strict";Rw="The judge reply needs a score and a reason.",xw="The improver reply was empty."});var lD,cD=l(()=>{"use strict";lD=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var dD,uD=l(()=>{"use strict";dD=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var s9,pD,mD=l(()=>{"use strict";cD();uD();jg();zg();s9=e=>{let t=sc(e);return t.length===0?_w:`${_w} Avoid: ${t.join("; ")}.`},pD=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:sD};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(lD(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:s9(dD(r))}}return null}});var _o,i9,kn,gD,Hg=l(()=>{"use strict";_o=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},i9=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,kn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",i9(e.tokens),`Delay: ${_o(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},gD=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var a9,fD,hD=l(()=>{"use strict";Lw();a9=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,fD=e=>{let r=(a9.exec(e)?.[1]??e).trim();return r.length===0||Ew(r)!==null?null:r}});var yD,Ug,SD=l(()=>{"use strict";Hg();hD();Fg();yD=e=>({type:"call",role:"judge",choice:e.choice,prompt:gD({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),Ug=e=>{let t=fD(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:xw}}:{nextPrompt:t,continuation:yD({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var Ww,PD=l(()=>{"use strict";Tw();Cw();Lw();Fg();jg();mD();Fg();SD();Ww=e=>{let t=aD(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:Rw}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=pD({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=ic({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:bo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var ac,Iw=l(()=>{"use strict";ac=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var AD=l(()=>{"use strict"});var bD=l(()=>{"use strict";AD()});var En,_D=l(()=>{"use strict";En=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var l9,Ow,wD=l(()=>{"use strict";Hg();l9=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,Ow=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",l9(e.tokens),`Delay: ${_o(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var c9,d9,u9,Mw,TD=l(()=>{"use strict";c9=/[A-Za-z0-9_./~-]{3,180}/g,d9=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,u9=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||d9.test(t)},Mw=(e,t=12)=>{let r=[];for(let o of e.matchAll(c9)){let n=o[0].replace(/\.+$/,"");if(!(!u9(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var lc,CD=l(()=>{"use strict";lc=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var Bg,Nw,vD,cc,Dw=l(()=>{"use strict";Bg=e=>Math.floor(e/2),Nw=e=>Math.max(Bg(e)+1,e-20),vD=(e,t)=>e>=t?"passes":e>=Nw(t)?"close":e>=Bg(t)?"weak":"bad",cc=e=>[{band:"bad",label:`0\u2013${Bg(e)-1} bad`},{band:"weak",label:`${Bg(e)}\u2013${Nw(e)-1} weak`},{band:"close",label:`${Nw(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var Gg,jw=l(()=>{"use strict";Dw();Gg=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${vD(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var Mt,zw=l(()=>{"use strict";Mt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var kD,ED=l(()=>{"use strict";kD=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var p9,m9,LD,RD=l(()=>{"use strict";oi();jw();zw();ED();p9=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],m9=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",LD=e=>{let t=e.wizard;if(t===void 0)return[];let r=Mt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=p9.map((f,y)=>{let p=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:f,state:p,detail:null}}).filter((f,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=Gg(e),d=c.filter(f=>f.id==="round-0"),u=kD(t)&&(!n||a)?c.filter(f=>f.id!=="round-0"):[],m=L(e.status)&&!s,S=m?[{id:"end",label:m9(e),state:"done",detail:e.errorMessage}]:[];if(m&&S.length>0){let f=Math.min(r,i.length),y=i.slice(0,f).map(p=>({...p,state:"done"}));return[...d,...y,...S,...u]}return[...d,...i,...u,...S]}});var g9,$w,xD=l(()=>{"use strict";oi();jw();RD();g9=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",$w=e=>{if(e.wizard!==void 0)return LD(e);let t=Gg(e),r=L(e.status)?[{id:"end",label:g9(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var dc,WD=l(()=>{"use strict";dc=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var ID=l(()=>{"use strict";ht()});var OD,uc,pc,ii,Vg,Fw,MD=l(()=>{"use strict";ID();OD="/prompt-optimizer/agent",uc=`${Ar}${OD}`,pc=`${Ar}/prompt-optimizer`,ii="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",Vg=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${ii}`,Fw="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var nr=l(()=>{"use strict"});var ie,mc=l(()=>{"use strict";nr();ie=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var Hw,ND=l(()=>{"use strict";Hw="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var DD,jD=l(()=>{"use strict";DD=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var gc,$D=l(()=>{"use strict";jD();nr();gc=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:DD(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var Uw,FD=l(()=>{"use strict";nr();Uw=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var Bw,HD=l(()=>{"use strict";nr();Bw=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var UD,fc,BD=l(()=>{"use strict";UD=["generalize","evaluate","separate","optimize_modules"],fc=(e,t)=>{let r=UD.indexOf(t);if(r===-1)return e;let o=UD.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var qg,Gw=l(()=>{"use strict";zg();qg=e=>{let t=sc(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var hc,GD=l(()=>{"use strict";Gw();hc=e=>{let t=qg(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var h9,y9,S9,VD,qD=l(()=>{"use strict";h9=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),y9=/^\{\{[a-zA-Z0-9_-]+\}\}$/,S9=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(h9(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},VD=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>y9.test(n)?n:S9(n,r)).join("")}});var Vw,KD=l(()=>{"use strict";qD();Vw=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:VD(o.prompt,t)}))}))});var P9,yc,JD=l(()=>{"use strict";nr();Gw();P9=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),yc=e=>{let t=qg(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=P9(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Sc,XD=l(()=>{"use strict";Iw();Sc=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return ac({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Pc,Kw=l(()=>{"use strict";ni();Pc=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ce(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var Jw,YD=l(()=>{"use strict";Kw();Jw=e=>{let t=Pc({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Ln,ZD=l(()=>{"use strict";Ln=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var A9,b9,oe,Kg=l(()=>{"use strict";mc();A9=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},b9=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,oe=e=>{let t=ie(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:A9(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>b9(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var QD,ej=l(()=>{"use strict";mc();Kg();QD=e=>{let t=oe(e.wizard),r=ie(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var Xw,tj=l(()=>{"use strict";ej();Xw=e=>{let t=QD({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var _9,rj,oj=l(()=>{"use strict";_9=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},rj=e=>[...e].reduce(_9,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var w9,nj,sj=l(()=>{"use strict";w9=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},nj=e=>[...e].reduce(w9,{out:"",inString:!1,escaped:!1}).out});var T9,C9,ij,aj=l(()=>{"use strict";oj();sj();T9=e=>e.charCodeAt(0)===65279?e.slice(1):e,C9=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},ij=e=>nj(rj(C9(T9(e))))});var v9,k9,E9,lj,L9,ai,Jg=l(()=>{"use strict";kw();aj();v9=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},k9=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},E9=e=>[...e].reduce(k9,{out:"",inString:!1,escaped:!1}).out,lj=e=>{let t=$g(e);return t.length===0?null:t[t.length-1]},L9=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},ai=e=>{let t=ij(v9(e)),r=lj(t);if(r!==null)return r;let o=E9(t),n=lj(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw L9(i)}}});var R9,x9,Yw,cj,dj=l(()=>{"use strict";R9=/^[a-z0-9][a-z0-9-]{0,62}$/,x9=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return R9.test(t)?t:""},Yw=e=>e.replace(/\s+/gu," ").trim(),cj=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=x9(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=Yw(n.name),a=Yw(n.description),c=Yw(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var uj,pj,mj=l(()=>{"use strict";uj=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},pj=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var Zw,gj=l(()=>{"use strict";Jg();dj();mj();Zw=(e,t)=>{let r=(()=>{try{return ai(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(uj(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(pj).filter(a=>a!==null),i=cj({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var Qw,fj=l(()=>{"use strict";Qw=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var eT,hj=l(()=>{"use strict";eT=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var tT,yj=l(()=>{"use strict";mc();Kg();tT=e=>{let t=oe(e.wizard),r=ie(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var Ac,Sj=l(()=>{"use strict";Ac=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var Nt,W9,rT,Pj=l(()=>{"use strict";Nt=g(ms());Jg();W9=(0,Nt.isType)({name:Nt.isNonEmptyString,description:Nt.isString,sampleValue:Nt.isString}),rT=e=>{let t=ai(e);if(!(0,Nt.isType)({templatedPrompt:Nt.isNonEmptyString,variables:(0,Nt.isArrayWithEachItem)(W9)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var de,I9,O9,oT,Aj=l(()=>{"use strict";de=g(ms());nr();Jg();I9=(0,de.isType)({id:de.isNonEmptyString,title:de.isNonEmptyString,prompt:de.isNonEmptyString,order:de.isNumber}),O9=(0,de.isType)({id:de.isNonEmptyString,title:de.isNonEmptyString,summary:de.isString,topology:(0,de.isOneOf)("chain","parallel"),modules:(0,de.isArrayWithEachItem)(I9),recommended:de.isBoolean}),oT=e=>{let t=ai(e);if(!(0,de.isType)({options:(0,de.isArrayWithEachItem)(O9)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var li,bj=l(()=>{"use strict";li=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var M9,nT,sT=l(()=>{"use strict";M9=/\{\{([a-zA-Z0-9_-]+)\}\}/g,nT=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(M9,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Dt,jt,_j=l(()=>{"use strict";ni();sT();Dt=e=>nT(e.templatedPrompt,e.variables),jt=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ce(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Dt(e.wizard)}});var N9,Rn,wj=l(()=>{"use strict";N9=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Rn=(e,t)=>e.replace(N9,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var D9,xn,Xg=l(()=>{"use strict";D9=/\{\{([a-zA-Z0-9_-]+)\}\}/g,xn=e=>{let t=new Set,r=[];for(let o of e.matchAll(D9)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var bc,Tj=l(()=>{"use strict";Xg();bc=e=>e.variables.length>0||xn(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var iT,aT=l(()=>{"use strict";nr();iT=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var _c,Cj=l(()=>{"use strict";ni();aT();_c=e=>{let t=e.wizard.evaluateSelectedRound??ce(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:iT(r.judgement,e.passScore)}});var wc,vj=l(()=>{"use strict";wc=e=>e.length===1&&e[0].modules.length===1});var lT,kj=l(()=>{"use strict";lT=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var we,Yg,Tc=l(()=>{"use strict";we=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),Yg=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var Ej,Lj=l(()=>{"use strict";Tc();Ej=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[we("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),we("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[we("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var Rj,xj=l(()=>{"use strict";oi();Tc();Rj=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!L(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[we("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),we("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),we("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",Yg(e.writerLabel,e.folder)),we("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[we("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var Wj,Ij=l(()=>{"use strict";Tc();Wj=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[we("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),we("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[we("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var Oj,Mj=l(()=>{"use strict";Tc();Oj=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[we("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),we("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",Yg(e.writerLabel,e.folder)),...r?[we("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var Zg,Nj=l(()=>{"use strict";oi();Lj();xj();Ij();Mj();Zg=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(L(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return Rj(r);case"evaluate":return Ej({...r,currentRound:e.currentRound});case"separate":return Oj(r);case"optimize_modules":return Wj({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Cc,Lr,Dj=l(()=>{"use strict";Cc=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),Lr=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var j9,Qg,cT,jj=l(()=>{"use strict";Xg();j9="wizardParam_",Qg=e=>`${j9}${e}`,cT=e=>{let t=xn(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=Qg(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var ct,zj=l(()=>{"use strict";ct=["generalize","evaluate","separate","optimize_modules"]});var vc,Wn,ci,Rr=l(()=>{"use strict";vc="Stopped because the confirmed token or spend budget was exceeded.",Wn="Approaching the confirmed budget. Further trials may hard-stop.",ci="Confirm the Step 4 token and spend budget before optimizing modules."});var dt,di=l(()=>{"use strict";dt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var $t,kc=l(()=>{"use strict";Rr();$t=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var z9,xr,Ec=l(()=>{"use strict";Rr();z9={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},xr=e=>{let t=e?.trim()??"";return t.length===0?.01:z9[t]??.01}});var ef,dT=l(()=>{"use strict";Rr();Ec();ef=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=xr(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var $j,rf,uT,pT=l(()=>{"use strict";Rr();di();kc();dT();Ec();$j=e=>{let t=ef({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??xr(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:dt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},rf=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),uT=e=>{let t=e.existing??$t(),r=$j({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return rf(t,r)}});var ui,Lc,Uj=l(()=>{"use strict";Rr();nr();di();kc();pT();dT();Ec();ui=e=>{let t=ef({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??xr(e.writerId),i=r*4e3,a=n*o*8e3,c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:dt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},Lc=e=>{let t=e.existing??$t();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=ui({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return rf(t,r)}});var Wr,Bj=l(()=>{"use strict";di();Rr();kc();Wr=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??$t(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=dt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var gT,pi,Gj=l(()=>{"use strict";Rr();di();gT=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=dt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:vc,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:vc,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:Wn,costControls:{...t,softWarnFired:!0,softWarnMessage:Wn}}:null},pi=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var fT,Vj=l(()=>{"use strict";fT=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var R=l(()=>{"use strict";oi();jg();PD();Tw();Hg();Iw();bD();_D();wD();TD();Cw();CD();ni();xD();zw();Dw();WD();MD();nr();mc();ND();$D();FD();HD();BD();GD();KD();JD();XD();Kw();YD();ZD();Kg();tj();gj();fj();hj();yj();Sj();Pj();Aj();bj();_j();sT();wj();Xg();Tj();Cj();vj();aT();kj();Nj();Dj();jj();zj();Rr();di();kc();pT();Uj();Ec();Bj();Gj();Vj()});var hT=l(()=>{"use strict";Ya()});var $9,Jj,Xj=l(()=>{"use strict";hT();$9=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,Jj=e=>{let t=ln(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll($9)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var Zj,F9,H9,sr,U9,B9,Yj,nf,Qj,G9,St,ez,tz,rz,Ft=l(()=>{"use strict";hT();Xj();Zj=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),F9=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,H9=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,sr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(F9.test(e.errorMessage))return"usage_limit";if(H9.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},U9="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",B9="The writer waited on terminal input and did not return a prompt.",Yj=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,nf=e=>{let t=e.trim();if(t.length===0||t.length>=500||!Yj.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>Yj.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},Qj=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},G9=e=>nf(e.stdout)??nf(e.stderr)??(Qj(e.replyFile)?nf(e.replyFile):null),St=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return U9;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?B9:null},ez=e=>{let t=e.trim();return t.length===0?null:St(t)!==null?t:nf(t)??(Qj(t)?t:null)},tz=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],rz=e=>{let t=e.replyFileText?.trim()??"",r=St([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=G9({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=sr({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=Jj([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=ln(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var V9,nz,oz,On,sf=l(()=>{"use strict";Ft();V9=400,nz=(e,t=V9)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},oz=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:ez(e.promptText)},On=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:oz(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=oz(e.revisions[n]);if(s!==null)return s.trim()}return null}});var W,q9,af,ae,Mn,iz,sz,az,lz,Te=l(()=>{"use strict";W="manual",q9=["claude-cli","codex","cursor","antigravity"],af={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ae=e=>e===W?"You":e in af?af[e]:e,Mn=e=>q9.filter(t=>e.includes(t)),iz=e=>{let t=Mn(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},sz=(e,t)=>t===W?W:e.find(r=>r===t)??null,az=(e,t,r)=>{let o=Mn(e),n=sz(o,t),s=sz(o,r);return n===null||s===null?null:{judge:n,improver:s}},lz=(e,t,r)=>{let o=Mn(e);return t===null||t.trim()===""?r!==W?r:o[0]??null:t===W?null:o.find(n=>n===t)??null}});var cz,lf,yT,Nn,ST,ut,Ir,ue,Je=l(()=>{"use strict";cz=g(require("node:fs")),lf=g(require("node:os")),yT=g(require("node:path"));po();Nn="~",ST=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,ut=e=>{let t=lf.default.homedir(),r=ST(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Ir=e=>{let t=e.trim().length===0?"~":e.trim(),r=He(t),o=yT.default.isAbsolute(r)?ST(r):ST(yT.default.resolve(lf.default.homedir(),r));try{if(!cz.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:ut(o)}},ue=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:lf.default.homedir()});var Ze,wo=l(()=>{"use strict";Ze='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var PT,dz,K9,uz,pz,AT=l(()=>{"use strict";R();Te();Je();wo();PT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dz=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',K9=e=>{let t=dz(e.state),r=`<h2>${PT(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${PT(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Ze}</button></div><template>${r}</template></li>`},uz=e=>{let t=e.wizard;if(t===void 0)return"";let r=Zg({status:e.status,wizard:t,writerLabel:ae(e.judgeModel),runnerLabel:ae(e.runnerModel??e.judgeModel),folderDisplay:ut(ue(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(K9).join("")}</ol>`},pz=e=>{let t=e.wizard;if(t===void 0)return"";let r=Zg({status:e.status,wizard:t,writerLabel:ae(e.judgeModel),runnerLabel:ae(e.runnerModel??e.judgeModel),folderDisplay:ut(ue(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${dz(n.state)}<span class="sdlc-pipeline-label">${PT(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var Ht,mz,gz,fz,bT=l(()=>{"use strict";R();Ht=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mz="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",gz=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Ht(mz)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${Ht(i.name)}}}</strong> \u2014 ${Ht(i.description)} (sample: ${Ht(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Ht(r)}</pre>`,n=Dt(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Ht(n)}</pre>`;return`${t}${o}${s}`},fz=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Ht(mz)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${Ht(n.name)}}}</strong> \u2014 ${Ht(n.description)} (sample: ${Ht(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${Ht(r)}</pre>`;return`${t}${o}`}});var Rc,_T=l(()=>{"use strict";Rc=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var hz,yz=l(()=>{"use strict";R();hz=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=En({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=kn({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var wT,xc,TT=l(()=>{"use strict";wo();yz();wT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xc=e=>{let t=hz(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${wT(r)}">${Ze}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${wT(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${wT(t)}</pre></template>`}});var CT,Wc,vT=l(()=>{"use strict";wo();CT=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Wc=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${CT(r)}">${Ze}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${CT(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${CT(t)}</pre></template>`}});var cf,mi,kT=l(()=>{"use strict";_T();TT();vT();cf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mi=e=>{let t=Rc(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${cf(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,u=e.cycle.revisions.map(m=>{let S=m.judgement?.score,f=S==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${S}`,y=m.judgement?.reasons?.trim()??"",p=y.length===0?"":`<br><span class="muted">${cf(y)}</span>`,P=Wc({roundLabel:d(m.roundNumber),promptText:m.promptText}),A=xc({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run}),h=`${P}${A}`;if(e.interactive){let b=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${b}> <span class="sdlc-wizard-revision-title">${cf(f)}</span></label>${h}${p}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${cf(f)}</span>${h}${p}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var ET,Sz,Pz,Az,LT=l(()=>{"use strict";ET=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Sz=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${ET(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${ET(t.prompt)}</pre></li>`).join("")}</ol>`,Pz=e=>Sz([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),Az=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${ET(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${Sz(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Ic,J9,df,RT=l(()=>{"use strict";R();LT();Ic=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),J9=e=>{let t=e.wizard;return t===void 0?"":jt({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},df=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=J9(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Ic(n.orchestratorSkill.fileName)}</code> \u2014 ${Ic(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${Ic(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=Pz(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${Ic(r)} <span class="muted">${Ic(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Me,X9,Y9,Z9,Q9,uf,eY,tY,rY,oY,nY,sY,gi,pf=l(()=>{"use strict";R();AT();bT();kT();TT();vT();RT();Me=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),X9={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},Y9=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Me(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Me(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Me(o)}</pre></details>`;return`<h2>${Me(e)}</h2>${n}`},Z9=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=Dt(t).trim(),n=jt({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!L(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${Y9("What is being evaluated",i)}`},Q9=(e,t)=>{let r=e.wizard;if(r===void 0||L(e.status))return"";let o=X9[t];return o===void 0||r.phase!==o?"":pz(e)},uf=(e,t,r)=>{let o=Q9(e,t),n=t==="wizard-2"?Z9(e):"";return`${o}${n}${r}`},eY=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},tY=e=>{let t=e.wizard;return t===void 0?"":gz(t)},rY=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Me(a)}</span>`,d=`Round ${n.roundNumber}`,u=Wc({roundLabel:d,promptText:n.promptText}),m=xc({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Me(s)}${i}</span>${u}${m}${c}</li>`}).join("")}</ul>`,oY=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return mi({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=eY(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${rY(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=jt({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Me(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",u=`Round ${c.roundNumber} \u2014 score ${d}`,m=Wc({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),S=xc({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Me(u)}</span>${m}${S}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Me(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},nY=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Me(n.title)}</strong> <span class="muted">(${Me(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Me(o.title)}</strong>${n}${Me(s)}${df(e,o)}</li>`}).join("")}</ul>`},sY=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Me(i)}</span> <strong>${Me(n.title)}</strong>${Me(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Me(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?mi({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},gi=(e,t)=>{switch(t){case"wizard-1":return uf(e,t,tY(e));case"wizard-2":return uf(e,t,oY(e));case"wizard-3":return uf(e,t,nY(e));case"wizard-4":return uf(e,t,sY(e));default:return""}}});var iY,aY,bz,_z,wz=l(()=>{"use strict";R();sf();Ft();pf();iY=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},aY=e=>{let t=e.goal.trim();return t.length===0?null:t},bz=(e,t,r,o,n)=>{let s=St(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},_z=(e,t)=>{let r=aY(e);if(t.id.startsWith("wizard-")){let s=gi(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=dc(e,t);if(s!==null){let a=On(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ce(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:bz(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:iY(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:bz(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var Dn,Tz,Cz=l(()=>{"use strict";Dn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Tz=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${Dn(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Dn(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${Dn(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${Dn(n)}</h2><pre class="mono">${Dn(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${Dn(e.goal)}</dd></div></dl>`;return`<h2>${Dn(e.title)}</h2>${i}${t}${r}${o}${s}`}});var lY,vz,Oc,xT,mf=l(()=>{"use strict";R();lY=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),vz=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||L(e.status))return null;let r=Mt(t);return r<0||r>3?null:`wizard-${r+1}`},Oc=(e,t)=>lY.has(t)?vz(e)===t:!1,xT="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var cY,gf,WT=l(()=>{"use strict";cY='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',gf=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${cY}</button>`});var jn,ff=l(()=>{"use strict";R();jn=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:ic({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:lc(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var dY,kz,uY,IT,Ez,pY,mY,gY,fY,Lz,Rz=l(()=>{"use strict";R();ff();dY={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},kz=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},uY=e=>dY[e]??null,IT=(e,t)=>{let r=e.wizard,o=uY(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=Mt(r);return o<n||o===n},Ez=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},pY=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:Dt(t).trim();return o.length===0?null:hc({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:kz(e,"generalize")})},mY=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=jn(e);return n===null?null:bo({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=Ez(e)?.promptText.trim()??jt({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:En({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},gY=e=>{let t=e.wizard;if(t===void 0)return null;let r=jt({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:yc({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:kz(e,"separate")})},fY=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=Lr(t),s=Rn(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=jn(e);return c===null?null:bo({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=Ez(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||L(e.status)&&i?.judgement!==null)?kn({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):Sc({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:Ln(t,r).output,moduleTitle:o.title})},Lz=(e,t)=>{if(!IT(e,t))return null;switch(t){case"wizard-1":return pY(e);case"wizard-2":return mY(e);case"wizard-3":return gY(e);case"wizard-4":return fY(e);default:return null}}});var hY,hf,OT=l(()=>{"use strict";R();hY=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},hf=(e,t)=>{let r=e.wizard,o=hY(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=Mt(r);return o<n?"done":o===n&&L(e.status)&&e.status==="failed"?"failed":o<=n&&L(e.status)?"done":"pending"}});var yY,fi,yf=l(()=>{"use strict";wo();Rz();OT();yY=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fi=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(hf(e,t)==="pending")return""}else if(!IT(e,t))return"";let o=Lz(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Ze}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${yY(o)}</pre></template>`}});var zn,Or,hi=l(()=>{"use strict";zn=e=>e.toLocaleString("en-US"),Or=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var ir,SY,xz,Sf,Wz,Iz,Pf=l(()=>{"use strict";R();wz();Cz();mf();WT();wo();sf();AT();yf();hi();ir=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SY=(e,t)=>{let r=dc(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Or(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${zn(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${ir(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${ir(r)}</span>`:"",d=Tz(_z(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&L(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${ir(e.id)}"`:"",m=Oc(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${ir(xT)}"><input type="hidden" name="cycleId" value="${ir(t.id)}"><input type="hidden" name="wizardStepId" value="${ir(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",S=e.state==="active"&&e.id.startsWith("wizard-")?uz(t):"",f=o?"failed":e.state,y=o?On(t):null,p=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Ze}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${ir(y)}</pre></template>`:"",P=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?fi(t,e.id):"";return`<li class="sdlc-node sdlc-node-${f}" data-sdlc-step-id="${ir(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${ir(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${P}${p}</div></div>${S}<template>${d}</template></li>`},xz=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>SY(r,t)).join("")}</ol>`,Sf=e=>`<div class="sdlc-score" aria-label="What the score means">${cc(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${ir(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,Wz=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${gf({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,Iz=`<script>
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
</script>`});var Af,bf,_f,Oz,MT=l(()=>{"use strict";Af="support-reply",bf="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",_f=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),Oz=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var wf,Mz,Nz=l(()=>{"use strict";R();Pf();MT();wf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Mz=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${Sf(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${wf(bf)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${wf(_f)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${wf(Oz)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${wf(Af)}">Run this sample</a>
      </div>
    </section>`});var NT,Tf,PY,Dz,jz=l(()=>{"use strict";NT=g(require("node:fs")),Tf=g(require("node:path")),PY=e=>Tf.default.join(Tf.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),Dz=(e,t)=>{let r=PY(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;NT.default.mkdirSync(Tf.default.dirname(r),{recursive:!0}),NT.default.appendFileSync(r,o,"utf8")}});var yi,zz,AY,$z,bY,Fz,ar,Z,Hz,j,pt=l(()=>{"use strict";yi=g(require("node:fs")),zz=g(require("node:path"));R();jz();AY=e=>e.wizard===void 0?e:{...e,wizard:Uw(e.wizard)},$z=new Set,bY=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),Fz=(e,t)=>{yi.default.mkdirSync(zz.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;yi.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),yi.default.renameSync(r,e)},ar=e=>{if(!yi.default.existsSync(e))return[];try{let t=JSON.parse(yi.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(bY).map(AY):[]}catch{return[]}},Z=(e,t)=>ar(e).find(r=>r.id===t)??null,Hz=(e,t)=>{$z.add(t);let r=ar(e).filter(o=>o.id!==t);Fz(e,r)},j=(e,t)=>{if($z.has(t.id))return;let r=ar(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];Fz(e,o),Dz(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var Si,lr,Mc,Uz,Cf,_Y,Bz,Gz,Vz,DT=l(()=>{"use strict";Si=g(require("node:fs")),lr=g(require("node:path")),Mc=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},Uz=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Cf=(e,t)=>{let r=Mc(e);return r.length>0?r:Mc(t)},_Y=e=>{let t=Cf(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${Uz(o)}`,...n.length>0?[`description: ${Uz(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},Bz=e=>`.cursor/skills/${e}/SKILL.md`,Gz=(e,t)=>{let r=Mc(t);if(r.length===0)return!1;let o=lr.default.resolve(e),n=lr.default.resolve(o,".cursor","skills"),s=lr.default.resolve(o,Bz(r));return s.startsWith(`${n}${lr.default.sep}`)?Si.default.existsSync(s):!1},Vz=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Cf(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=lr.default.resolve(e.workingDirectory);try{if(!Si.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=_Y({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=Bz(r.slug),n=lr.default.resolve(t,".cursor","skills"),s=lr.default.resolve(t,o);if(!s.startsWith(`${n}${lr.default.sep}`))return{ok:!1,errorCode:"path"};if(Si.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Si.default.mkdirSync(lr.default.dirname(s),{recursive:!0}),Si.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var wY,qz,Kz,Jz=l(()=>{"use strict";R();pt();Je();Ft();DT();wY=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,qz=e=>{let t=e.get("savedSkill");return t!==null&&wY.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},Kz=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=Z(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!L(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ce(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||St(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=Vz({workingDirectory:ue(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var vf,kf,Nc=l(()=>{"use strict";R();vf=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=Wr({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},kf=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var To,Dc=l(()=>{"use strict";R();Nc();To=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=lT(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=uT({moduleCount:o.length,existing:e.costControls,writerId:n}),i=vf(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Cc(r.variables)},updatedAt:new Date().toISOString()}}});var Co,jc=l(()=>{"use strict";Co=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var jT=l(()=>{"use strict";Lt();ql();Ya()});var zT,Xz,$T,Yz,Zz=l(()=>{"use strict";zT={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},Xz=e=>e.exitCode===null&&e.signalCode===null,$T=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!Xz(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!Xz(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),Yz=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),$T(e).then(s=>{r({...zT,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var Qz,zc,e$,FT,TY,UT,BT,CY,vY,kY,t$,EY,HT,r$,$c,o$,LY,RY,Qe,$n=l(()=>{"use strict";Qz=require("node:child_process"),zc=g(require("node:fs")),e$=g(require("node:os")),FT=g(require("node:path"));jT();Zz();Ft();TY=["claude-cli","codex","cursor","antigravity"],UT=18e4,BT=6e5,CY=12e4,vY=9e5,kY="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",t$="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",EY="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",HT=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},r$=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=HT(process.env[t$])??Math.max(r,BT));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:HT(process.env[EY])??vY;return Math.min(o,Math.max(CY,r))},$c=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?HT(process.env[t$])??BT:UT,o$=e=>`The writer timed out after ${e}ms.`,LY=e=>TY.includes(e),RY=e=>e===!0||process.env[kY]==="1",Qe=e=>new Promise(t=>{if(e.signal?.aborted){t(zT);return}if(RY(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!LY(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=Zt(r,e.prompt,ye({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!zc.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:UT,s=FT.default.join(zc.default.mkdtempSync(FT.default.join(e$.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=tz({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,Qz.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=S=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(S))};Yz(u,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",$T(u).then(S=>{m({ok:!1,errorMessage:o$(n),errorKind:"writer_timeout",killSignal:S})})},n),u.stdout.on("data",S=>{a.push(Buffer.from(S))}),u.stderr.on("data",S=>{c.push(Buffer.from(S))}),u.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",()=>{if(d.settled)return;let S=zc.default.existsSync(s)?zc.default.readFileSync(s,"utf8"):null,f=rz({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:S});if(f.ok&&d.stopReason!=="abort"){m(f);return}d.stopReason===null&&m(f)})})});var xY,Fc,GT=l(()=>{"use strict";R();hi();xY=e=>{if(e.wizard!==void 0){let t=Ac(e.wizard),r=Or(e);return(t??0)+r}return Or(e)},Fc=e=>{let t=gT({costControls:e.costControls,spentTokens:xY(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var n$,WY,Hc,Ef,Lf=l(()=>{"use strict";R();Te();GT();n$=e=>e===W?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},WY=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Hc=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=Ww({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:n$(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?fT({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:lc(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=WY(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?Fc({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):Fc({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},Ef=(e,t,r=null)=>{let o=Ug({raw:t,judge:n$(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Rf,VT=l(()=>{"use strict";Rf=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var a$,xf,Wf,s$,i$,qT,IY,l$,KT,OY,c$,MY,NY,d$,u$=l(()=>{"use strict";a$=require("node:child_process"),xf=g(require("node:fs")),Wf=g(require("node:path"));og();R();s$=4e3,i$=12e3,qT=(e,t)=>{let r=(0,a$.spawnSync)("git",[...t],{cwd:e,env:yo(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},IY=e=>qT(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",l$=e=>{let t=qT(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},KT=(e,t)=>{let r=Wf.default.resolve(e,t),o=Wf.default.relative(e,r);if(o.startsWith("..")||Wf.default.isAbsolute(o)||!xf.default.existsSync(r)||!xf.default.statSync(r).isFile())return null;let n=xf.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>s$?`${n.slice(0,s$)}
\u2026truncated`:n},OY=e=>e.length>i$?`${e.slice(0,i$)}
\u2026truncated`:e,c$=e=>{let t=Mw(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,KT(e.workingDirectory,n)])),o=IY(e.workingDirectory);return{git:o,status:o?l$(e.workingDirectory):{},files:r,paths:t}},MY=(e,t)=>{let r=qT(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=KT(e,t);return o===null?`${t} is missing.`:o},NY=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",d$=e=>{let t=e.before.git?l$(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=KT(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>MY(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:NY(e.before.git,e.before.paths.length>0),evidence:OY(i.join(`

`))}}});var YT,G,ZT,Ne,p$,DY,jY,m$,Pi,g$,Ai,zY,$Y,Uc,JT,XT,FY,f$,HY,UY,BY,h$,GY,y$,S$,VY,qY,P$,A$=l(()=>{"use strict";YT=require("node:child_process"),G=g(require("node:fs")),ZT=g(require("node:os")),Ne=g(require("node:path"));og();p$=8e6,DY=16e6,jY=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],m$=(e,t)=>{let r=(0,YT.spawnSync)("git",[...t],{cwd:e,env:yo(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Pi=(e,t)=>(0,YT.spawnSync)("git",[...t],{cwd:e,env:yo(),timeout:8e3}).status===0,g$=e=>{let t=m$(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},Ai=(e,t)=>{let r=Ne.default.resolve(e,t),o=Ne.default.relative(e,r);return o.startsWith("..")||Ne.default.isAbsolute(o)?null:r},zY=(e,t)=>{let r=Ai(e,t);if(r===null||!G.default.existsSync(r))return null;let o=G.default.statSync(r);return!o.isFile()||o.size>p$?null:G.default.readFileSync(r)},$Y=(e,t,r)=>{let o=Ai(e,t);o!==null&&(G.default.mkdirSync(Ne.default.dirname(o),{recursive:!0}),G.default.writeFileSync(o,r))},Uc=(e,t)=>{let r=Ai(e,t);r===null||!G.default.existsSync(r)||G.default.rmSync(r,{recursive:!0,force:!0})},JT=(e,t)=>Pi(e,["cat-file","-e",`HEAD:${t}`]),XT=e=>{let t=m$(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},FY=e=>Ne.default.resolve(e)!==Ne.default.resolve(ZT.default.homedir()),f$=e=>{if(!G.default.existsSync(e))return 0;let t=G.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?G.default.readdirSync(e).reduce((r,o)=>r+f$(Ne.default.join(e,o)),0):0},HY=(e,t,r)=>{let o=Ai(e,r);if(o===null||!G.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(f$(o)>DY)return{relativePath:r,existed:!0,copyDir:null};let n=Ne.default.join(t,"cache",r);return G.default.mkdirSync(Ne.default.dirname(n),{recursive:!0}),G.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},UY=400,BY=32e6,h$=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!G.default.existsSync(s)))for(let i of G.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=Ne.default.join(s,i),c=G.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>p$)){if(t.length>=UY||r+c.size>BY){o=!1;return}r+=c.size,t.push(Ne.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},GY=(e,t,r)=>{let o=Ai(e,r);if(o===null||!G.default.existsSync(o))return null;let n=zY(e,r);if(n===null)return"skip";let s=Ne.default.join(t,"files",r);return G.default.mkdirSync(Ne.default.dirname(s),{recursive:!0}),G.default.writeFileSync(s,n),s},y$=e=>{let t=G.default.mkdtempSync(Ne.default.join(ZT.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?g$(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:h$(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,GY(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?XT(e.workingDirectory):null,isolateCaches:FY(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:jY.map(i=>HY(e.workingDirectory,t,i))}},S$=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Uc(e.workingDirectory,t);return}$Y(e.workingDirectory,t,G.default.readFileSync(r))}},VY=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?S$(e,t):JT(e.workingDirectory,t)?Pi(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Uc(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&JT(e.workingDirectory,t)&&Pi(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!JT(e.workingDirectory,t)&&Pi(e.workingDirectory,["reset","-q","HEAD","--",t])},qY=(e,t)=>{let r=Ai(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Uc(e.workingDirectory,t.relativePath),G.default.mkdirSync(Ne.default.dirname(r),{recursive:!0}),G.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Uc(e.workingDirectory,t.relativePath);return}if(G.default.existsSync(r))for(let o of G.default.readdirSync(r)){let n=Ne.default.join(r,o);G.default.statSync(n).mtimeMs>=e.startedMs-1e3&&G.default.rmSync(n,{recursive:!0,force:!0})}}}},P$=e=>{try{if(e.git){if(XT(e.workingDirectory)!==e.head&&(!(e.head===null?Pi(e.workingDirectory,["update-ref","-d","HEAD"]):Pi(e.workingDirectory,["reset","--hard",e.head]))||XT(e.workingDirectory)!==e.head))throw new Error("head");let r=g$(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))VY(e,o)}else{if(e.complete)for(let t of h$(e.workingDirectory).paths)e.files[t]===void 0&&Uc(e.workingDirectory,t);for(let t of Object.keys(e.files))S$(e,t)}for(let t of e.caches)qY(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{G.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var If,Of,KY,JY,XY,YY,ZY,b$,QY,_$,w$=l(()=>{"use strict";R();Lf();VT();u$();A$();Te();Je();Ft();$n();If=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),Of=e=>({...e,status:"stopped",errorMessage:vn,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),KY=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),JY=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==W?t:e.improverModel!==W?e.improverModel:null}return e.judgeModel!==W?e.judgeModel:e.improverModel!==W?e.improverModel:null},XY=async e=>{let t=ue(e.cycle),r=c$({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=y$({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Sc({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Ln(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):ac({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=r$({promptText:e.revision.promptText,isModuleRun:i}),c=$c({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await Qe({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=u.ok?d$({workingDirectory:t,before:r,writerReply:u.text}):null,S=P$(o),f={...e.cycle,revisions:e.cycle.revisions.map(y=>y.roundNumber===e.cycle.currentRound?d:y)};return u.ok?!S.ok||m===null?{ok:!1,cycle:If(f,S.ok?"Could not put the folder back after the run.":S.errorMessage)}:{ok:!0,cycle:f,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Of(f)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:If(f,u.errorMessage,sr(u))})},YY=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:XY({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),ZY=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),b$=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Qe({writerAgent:e.reviewer,workingDirectory:ue(e.cycle),prompt:Ow({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Of(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},QY=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===W)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Qe({writerAgent:t.judgeModel,workingDirectory:ue(t),prompt:En({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Hc(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?Of(o):(e.onWriterFailure?.(t.judgeModel),If(o,n.errorMessage,sr(n)))},_$=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return QY(e);let o=JY(t),n=await YY({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?KY(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===W){let u=await b$({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{...ZY(s,u.text),judgePhase:void 0}}let i=await Qe({writerAgent:t.judgeModel,workingDirectory:ue(t),prompt:kn({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Of(s):(e.onWriterFailure?.(t.judgeModel),If(s,i.errorMessage,sr(i)));let a=await b$({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Hc(s,i.text,c);return Rf(d,a.text)}});var Mf,eZ,tZ,QT,T$=l(()=>{"use strict";R();Lf();w$();ff();Ft();Te();GT();Je();$n();Mf=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),eZ=e=>({...e,status:"stopped",errorMessage:vn,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),tZ=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?eZ(e):(n?.(r),Mf(e,t.errorMessage,sr(t))),QT=async(e,t,r,o)=>{let n=Fc(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return Mf(e,"This round has no prompt.");if(e.status==="judging")return _$({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return Mf(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===W)return e;let i=jn(e);if(i===null)return Mf(e,"The improver needs the score and the reason.");let a=await Qe({writerAgent:e.improverModel,workingDirectory:ue(e),prompt:bo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:$c()}),c=tZ(e,a,e.improverModel,r,t);return c!==null?c:Ef(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var Bc,eC,rZ,v$,C$,oZ,nZ,Nf,k$,E$,sZ,iZ,Fn,L$,R$,Gc=l(()=>{"use strict";R();Dc();jc();Te();Je();Ft();$n();T$();_T();Bc=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),eC=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return Bc(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},rZ=e=>{let t=sr(e);return Zj(e)||t==="usage_limit"||t==="action_required"},v$=(e,t,r)=>rZ(r)?Bc(e,r.errorMessage,sr(r)):eC(e,t,r.errorMessage),C$=e=>{let t=e.wizard;return t===void 0||Rc(e).length===0?e:{...e,wizard:li({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},oZ=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",nZ=e=>{let t=e.wizard;if(t===void 0)return e;let r=Pc({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:li({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Nf=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),k$=e=>e.judgeModel!==W?e.judgeModel:e.improverModel!==W?e.improverModel:null,E$=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},sZ=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=k$(e);if(n===null)return Bc(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Dt(o),i=hc({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:E$(e,"generalize")}),a=await Qe({writerAgent:n,prompt:i,workingDirectory:ue(e),signal:t});if(!a.ok)return r?.(n),v$(e,"generalize",a);try{let c=rT(a.text),d=li({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Cc(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return bc(d)?Fn({...u,wizard:{...d,gate:null}}):Nf(u,"generalize")}catch(c){return eC(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},iZ=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=k$(e);if(n===null)return Bc(e,"Choose a writer to suggest splits.");let s=jt({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=yc({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:E$(e,"separate")}),a=await Qe({writerAgent:n,prompt:i,workingDirectory:ue(e),signal:t});if(!a.ok)return r?.(n),v$(e,"separate",a);try{let c=oT(a.text),d=Vw(c,o.variables),u=li({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:u};return wc(d)?To(m,d[0]):Nf(m,"separate")}catch(c){return eC(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},Fn=e=>{let t=e.wizard;if(t===void 0)return e;let r=Dt(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},L$=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Bc(e,"This module is missing.");let n=Lr(r),s=Rn(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==W?e.runnerModel:e.judgeModel!==W?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:ie(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},R$=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return QT(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return sZ(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return iZ(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await QT(e,t,r,o);if(L(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Rc(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=ce(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&_c({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let u=C$(Nf(a,i));return Co(u)}let c=Nf(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=Jw({wizard:{...c.wizard,modules:c.wizard.modules.map((m,S)=>S===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:oZ(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?C$(d):nZ(d)}return s}return n.phase==="complete",e}});var bi,Df=l(()=>{"use strict";R();Te();bi=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:Qw(r,e.judgeModel===W),updatedAt:new Date().toISOString()}}});var _i,jf=l(()=>{"use strict";_i=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var Pt,x$,aZ,W$=l(()=>{"use strict";R();Je();jf();Ft();DT();Pt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),x$=e=>{if(!L(e.status))return"";let t=ce(e.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??null,reasons:S.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=St(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Pt(t.reasons.trim())}</p>`,i=e.status==="passed",a=_i(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${Pt(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${Pt(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${Pt(n)}</div>`:i?aZ({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ue(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${Pt(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${Pt(t.promptText)}</pre></details>`,m=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${m}</h2>${d}${o}${s}${u}</section>`},aZ=e=>{let t=e.sourceSkill?.fileName??Mc(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=Cf(t,r),s=n.length>0&&Gz(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Pt(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Pt(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Pt(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Pt(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Pt(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Pt(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var I$,O$=l(()=>{"use strict";I$=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var M$,lZ,zf,et,$f,tC=l(()=>{"use strict";R();Te();O$();sf();Ft();jf();M$=["Generalize","Evaluate","Separate","Optimize modules"],lZ=e=>{let t=Mt(e),r=t>=0&&t<M$.length?M$[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},zf=(e,t)=>{let r=On(e),o=r===null?null:I$(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},et=(e,t)=>({title:e,detail:t,replyPreview:null}),$f=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=On(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:nz(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!L(e.status)){let t=e.judgeModel;return et(`${ae(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!L(e.status)){let t=e.judgeModel;return et(`${ae(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===W?et(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?et(`${ae(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):et(`${ae(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===W){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==W?et(`${ae(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):et(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return et(`${ae(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ie(t);return et(`${ae(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return et(`${ae(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=ie(t);return et(`${ae(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return et(`${ae(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===W){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return et("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return et(`${ae(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>St(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=oe(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||L(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?zf(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=_i(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?zf(e,{title:`${lZ(r)}${s}`,detail:t.length>0?t:n}):zf(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(L(e.status)){let t=e.errorMessage?.trim()??"";return zf(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var cr,Vc=l(()=>{"use strict";Te();cr=e=>{if(e.status==="improving"&&e.improverModel===W)return!0;if(e.status!=="judging"||e.judgeModel!==W)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===W}});var N$,D$=l(()=>{"use strict";N$=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var vo,cZ,j$,z$=l(()=>{"use strict";R();vo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cZ=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${vo(r)}</p>`},j$=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${vo(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${vo(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${vo(a)}.</p>`}<pre class="mono">${vo(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${_o(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${vo(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",m=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${vo(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${cZ(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${vo(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var qc,dZ,$$,F$=l(()=>{"use strict";R();Ft();qc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dZ=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=St(t.promptText),n=t.judgement?.reasons?`<p class="muted">${qc(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${qc(i)}.</p>`}<pre class="mono">${qc(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${_o(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${qc(d)}</pre>`:`<div class="alert-error">${qc(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${u}</article>`},$$=e=>e.revisions.map(t=>dZ(e,t)).join("")});var H$,U$=l(()=>{"use strict";R();H$=e=>{if(L(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var dr,uZ,rC,pZ,mZ,gZ,fZ,B$,G$,oC=l(()=>{"use strict";U$();dr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uZ="Stop this run? Writers will stop and the best prompt is kept.",rC="End the wizard? Writers will stop and progress from finished steps is kept.",pZ="Skip this module and pause at the step gate?",mZ=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${dr(uZ)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${dr(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,gZ=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${dr(rC)}"><input type="hidden" name="cycleId" value="${dr(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,fZ=e=>{let t=dr(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${dr(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${dr(pZ)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${dr(rC)}">End wizard</button>
    </form>
  </div>`},B$=e=>{let t=H$(e);return t==="none"?"":t==="legacy_stop"?mZ(e.id):t==="wizard_end_only"?gZ(e.id):fZ(e)},G$=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=dr(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${dr(rC)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var V$,q$=l(()=>{"use strict";R();hi();V$=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=oe(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${zn(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${zn(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${ie(r)}`}return""}});var hZ,yZ,K$,SZ,J$,X$=l(()=>{"use strict";R();q$();OT();pf();yf();hZ=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',yZ=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',K$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SZ=(e,t,r)=>{let o=gi(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=V$(e,t),i=hf(e,t),a=hZ(i),c=yZ(i),d=fi(e,t,{forOutcomeSummary:!0}),u=`${a}<span class="sdlc-wizard-outcome-step-title">${K$(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${K$(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",S=i==="failed"&&t!=="wizard-4"?" open":"",f=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${f}"${m}${S}><summary aria-controls="${f}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${f}-body">${o}</div></details>`},J$=e=>{let t=e.wizard;if(t===void 0||!L(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>SZ(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var Y$,Z$,Q$=l(()=>{"use strict";Y$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Z$=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${Y$(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Y$(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var nC,eF,sC=l(()=>{"use strict";nC=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,eF=(e,t)=>{if(nC(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var tF,rF=l(()=>{"use strict";tF=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var Ff,oF,nF=l(()=>{"use strict";R();sC();sC();rF();Ff=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oF=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=oe(t),o=ie(t),n=r.terminalStatusSuggestion==="passed"?"":tF(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,f=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=u===void 0?c.status:eF(u,o),p=u!==void 0&&nC(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':y==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':y==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':Ff(y);return`<tr${f}><td>${Ff(c.title)}</td><td>${Ff(m)}</td><td>${c.tokens??"\u2014"}</td><td>${p}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${Ff(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var Hn,Hf,iC=l(()=>{"use strict";Hn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hf=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Hn(r.fileName)}</code> \u2014 ${Hn(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${Hn(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${Hn(i.name)}</strong> <code>.cursor/skills/${Hn(i.fileName)}/SKILL.md</code></p><p class="muted">${Hn(i.description)}</p><p>${Hn(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var PZ,sF,iF=l(()=>{"use strict";R();Q$();nF();iC();PZ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sF=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!L(e.status)||t.modules.length===0)return"";let r=oF(e),o=Z$(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=oe(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${PZ(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${Hf(e)}${a}${r}${o}</section>`}});var K,Uf=l(()=>{"use strict";R();K={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var Bf,aC=l(()=>{"use strict";Bf=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var aF,lF=l(()=>{"use strict";Uf();aC();aF=e=>{let t=Bf({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:K.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var Mr,Kc=l(()=>{"use strict";Mr=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var Nr,Gf,lC=l(()=>{"use strict";R();Pf();W$();tC();Vc();D$();ff();z$();F$();oC();X$();iF();hi();lF();Je();Kc();Nr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Gf=e=>{let t=!L(e.status)&&e.status!=="wizard_paused"&&!cr(e),r=$f(e),o=xz($w(N$(e)),e),n=L(e.status)?"":B$(e),s=J$(e),i=sF(e),a=x$(e),c=e.errorMessage===null?"":`<div class="alert-error">${Nr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?oe(e.wizard):null,S=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,f=!t&&e.wizard!==void 0&&L(e.status)&&(e.wizard.phase==="complete"||oe(e.wizard).passedModuleCount>0),y=f?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",p=f&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Nr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",P=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${Nr(r.replyPreview)}</pre>`,A=r.detail.length===0&&p.length===0&&P.length===0||r.detail.length===0&&P.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Nr(r.detail)}${u}</p>`}${P}</div>`,h=e.revisions.find(jo=>jo.roundNumber===e.currentRound),b=e.status==="improving"?jn(e):null,w=Or(e),C=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),v=cr(e)?j$({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:b?.promptText??h?.promptText??"",score:b?.score??h?.judgement?.score??null,reasons:b?.reasons??h?.judgement?.reasons??null,avoid:b?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:h?.run??null,minJudgeScore:C?1:0}):"",E=e.wizard!==void 0&&e.wizard.phase==="complete"&&L(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!E&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?ie(e.wizard):e.passScore,N=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${Sf(I)}</div>`:"",U=e.status==="failed"?aF({status:e.status,errorKind:e.errorKind}):null,V=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':L(e.status)?U!==null?`<span class="${U.badgeClass}">${U.badgeLabel}</span>`:E&&m!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",q=t?d:f?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',Xe=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Nr(ut(ue(e)))}</li>`:"",w>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${zn(w)} so far</li>`:""].filter(jo=>jo.length>0),F=Xe.length===0?"":`<ul class="sdlc-run-meta">${Xe.join("")}</ul>`,Ee=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,Qr=E?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,fr=E?"":N.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${Qr}</div>`:`<div class="sdlc-run-grid">${Qr}${N}</div>`,nL=$$(e),Oq=e.wizard!==void 0&&L(e.status)&&e.revisions.every(jo=>jo.roundNumber===0&&(jo.judgement===void 0||jo.judgement===null)),Mq=nL.length===0||Oq?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${nL}</div></section>`,Nq=`<p class="sdlc-run-goal" title="${Nr(e.goal.trim())}">${Nr(Mr(e.goal))}</p>`,Dq=E?`${c}${i}${s}${v}${a}`:`${c}${fr}${v}${s}${a}`,jq='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',zq=E?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Nr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${jq}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${V}</div>${Nq}<div class="sdlc-run-activity${y}"${f?' role="status"':""}><div class="sdlc-run-activity-icon">${q}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Nr(r.title)}</h2>${A}${p}${zq}</div></div>${F}${Ee}</header>${Dq}</section>${Mq}`}});var cF,dF=l(()=>{"use strict";R();jc();cF=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!_c({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:Co(e)}});var uF,pF=l(()=>{"use strict";R();Gc();uF=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!bc(t)?e:Fn({...e,wizard:{...t,gate:null}})}});var mF,gF=l(()=>{"use strict";R();Dc();mF=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!wc(t.splitOptions))return e;let r=t.splitOptions[0];return To(e,r)}});var AZ,Un,Vf=l(()=>{"use strict";dF();pF();gF();pt();AZ=e=>{let t=uF(e),r=cF(t);return mF(r)},Un=(e,t)=>{let r=AZ(t);return r!==t?(j(e,r),r):t}});var fF,Dr,Jc=l(()=>{"use strict";R();fF=e=>ct.indexOf(e),Dr=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||L(e.status)?ct.length:t.gate!==null?fF(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?fF(t.phase):null}});var hF,yF=l(()=>{"use strict";hF=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Bn,SF,PF=l(()=>{"use strict";R();yF();Bn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SF=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Ln(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Bn(hF(o))}</pre></div>`:"",s=xn(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=Lr(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),u=Qg(c),m=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,f=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Bn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Bn(u)}">${Bn(S)}</label>
        ${f}
        <input class="input" type="text" id="${Bn(u)}" name="${Bn(u)}" value="${Bn(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var AF,bF=l(()=>{"use strict";AF={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var Xc,bZ,pe,ko=l(()=>{"use strict";bF();wo();Xc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bZ=e=>{let t=AF[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Xc(t.title)}" aria-describedby="${r}" aria-expanded="false">${Ze}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Xc(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Xc(t.example)}</span></span></button>`},pe=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Xc(r)}"`}>${Xc(e)}</span>${bZ(t)}</span>`});var At,_F,wF,TF=l(()=>{"use strict";R();Nc();Uf();ko();At=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_F=e=>{let t=e.costControls;if(t===void 0||pi(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??dt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${At(K.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${At(t.softWarnMessage??Wn)}</p>`:"",d=kf({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${At(K.estimateOverCeilingWarn)}</p>`:"",u=e.wizard?.modules.length??0,m=u>0?`<p class="muted">Step 4 will optimize ${u} module${u===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${At(K.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${At(K.confirmLede)}</p>
  ${m}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${At(ci)}</p>
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
</section>`},wF=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!pi(r)}});var _Z,CF,vF=l(()=>{"use strict";wo();_Z=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),CF=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${Ze}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${_Z(t)}</pre></template>`}});var Yc,kF,EF=l(()=>{"use strict";R();bT();PF();kT();oC();iC();RT();TF();vF();Yc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kF=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(wF(e))return _F(e);let n=ie(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?fz(r):"",a=o==="evaluate"?Hf(e):"",c=o==="evaluate"?mi({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(I=>{let N=I.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',U=I.recommended?' <span class="sdlc-badge">Recommended</span>':"",V=r.selectedSplitOptionId===I.id||r.selectedSplitOptionId===null&&I.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${Yc(I.id)}" required${V}> <strong>${Yc(I.title)}</strong>${N}${U}</label>${df(e,I)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],f=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=m?.title??"Module",p=m?.prompt??"",P=m?.status==="pending",A=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Yc(y)}</p>${P?SF({cycle:e,modulePrompt:p}):""}<p class="muted">Test run prompt preview: ${Yc(Rn(p,Lr(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${mi({cycle:e,interactive:!1,caption:P?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",h=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":P?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",b=Ac(r),w=b===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${b}</p>`,C=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?CF(r.lastWriterParseFailureReply??""):"",v=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",E=t?.active===!0?" sdlc-wizard-gate-active":"",x=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${v}"`:"";return`<section class="card sdlc-wizard-gate${E}"${x}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${h}</p>
    ${C}
    ${w}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Yc(e.id)}">
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
        <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue"${f}>Continue</button>
        <button class="btn btn-secondary" type="submit" name="intent" value="wizard-feedback-rerun" formnovalidate>Rerun with feedback</button>
      </div>
    </form>
    ${G$(e)}
  </section>`}});var wZ,LF,RF=l(()=>{"use strict";R();yf();wZ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),LF=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||L(e.status))return"";let r=(o,n)=>{let s=fi(e,o);return`<h2 class="sdlc-wizard-active-head">${wZ(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var cC,xF,WF,Eo,IF,wi=l(()=>{"use strict";R();pt();cC=new Map,xF=e=>{let t=new AbortController;return cC.set(e,t),t.signal},WF=e=>{cC.delete(e)},Eo=e=>{cC.get(e)?.abort()},IF=(e,t)=>{let r=Z(e,t);return r===null||r.wizard!==void 0?!1:(L(r.status)||(j(e,{...r,status:"stopped",errorMessage:vn,updatedAt:new Date().toISOString()}),Eo(t)),!0)}});var OF,MF,dC,NF,uC=l(()=>{"use strict";R();Jc();wi();OF="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",MF=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return ct[r]??null},dC=(e,t)=>{let r=MF(t);if(r===null||e.wizard===void 0)return!1;let o=ct.indexOf(r);if(o===-1)return!1;let n=Dr(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<ct.length)},NF=(e,t)=>{let r=MF(t);if(r===null||e.wizard===void 0||!dC(e,t))return e;Eo(e.id);let o=ct.slice(ct.indexOf(r)),n=fc(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var pC,DF,jF=l(()=>{"use strict";uC();pC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DF=(e,t)=>dC(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${pC(OF)}"><input type="hidden" name="cycleId" value="${pC(e.id)}"><input type="hidden" name="wizardStepId" value="${pC(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var TZ,zF,CZ,$F,FF=l(()=>{"use strict";R();Jc();EF();RF();jF();pf();TZ={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},zF=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),CZ=(e,t,r)=>{let o=DF(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${zF(t)}">
  <summary class="sdlc-wizard-accordion-summary">${zF(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${gi(e,t)}</div>
</details>`},$F=e=>{let t=e.wizard;if(t===void 0)return"";let r=Dr(e);if(r===null)return"";let o=ct.slice(0,r).map((i,a)=>CZ(e,`wizard-${a+1}`,TZ[i])),n=t.gate!==null?kF(e,{active:!0}):LF(e),s=r>=ct.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var qf,mC=l(()=>{"use strict";FF();LT();R();qf=e=>{if(e===null||e.wizard!==void 0&&L(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=$F(e),r=Az(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var vZ,gC,HF=l(()=>{"use strict";R();Te();Je();$n();vZ=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},gC=async(e,t,r)=>{if(!vZ(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===W)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=Xw({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Qe({writerAgent:e.judgeModel,prompt:n,workingDirectory:ue(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=Zw(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var Zc,Kf,UF,fC,BF,GF,VF,Jf,hC=l(()=>{"use strict";Zc=g(require("node:fs")),Kf=g(require("node:path")),UF=e=>Kf.default.join(Kf.default.dirname(e),"prompt-optimizer-writer-ready.json"),fC=e=>{let t=UF(e);if(!Zc.default.existsSync(t))return{};try{let r=JSON.parse(Zc.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},BF=(e,t)=>{Zc.default.mkdirSync(Kf.default.dirname(e),{recursive:!0}),Zc.default.writeFileSync(UF(e),`${JSON.stringify(t,null,2)}
`)},GF=(e,t)=>fC(e)[t]?.message??null,VF=(e,t,r)=>{BF(e,{...fC(e),[t]:{message:r}})},Jf=(e,t)=>{let r=fC(e);r[t]!==void 0&&BF(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var yC,Xf,Yf,qF,Ce,Gn=l(()=>{"use strict";R();jT();Gc();HF();Vc();wi();hC();Vf();pt();yC=new Set,Xf={atMs:0,ids:[]},Yf=async()=>{if(Date.now()-Xf.atMs<3e4)return Xf.ids;let e=await Ot({commands:ye({})});return Xf.atMs=Date.now(),Xf.ids=e.installedWriterIds,e.installedWriterIds},qF=async(e,t,r)=>{let o=Z(e,t);if(o===null||r.aborted)return;let n=Un(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(L(n.status)&&!s||n.status==="wizard_paused"||cr(n))return;if(s){let c=await gC(n,r,d=>{Jf(e,d)});j(e,c);return}let i=await R$(n,c=>{Jf(e,c)},r,c=>{Z(e,t)?.status==="stopped"||r.aborted||j(e,c)});if(!(Z(e,t)?.status==="stopped"||r.aborted)){if(j(e,i),L(i.status)){let c=await gC(i,r,d=>{Jf(e,d)});j(e,c);return}await qF(e,t,r)}},Ce=(e,t)=>{if(yC.has(t))return;let r=Z(e,t);if(r===null)return;let o=Un(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(L(o.status)&&!n||o.status==="wizard_paused"||cr(o))return;yC.add(t);let s=xF(t);qF(e,t,s).finally(()=>{yC.delete(t),WF(t)})}});var Lo,Qc=l(()=>{"use strict";lC();Vf();mC();Gn();Lo=(e,t)=>{let r=Un(e,t);return Ce(e,r.id),`${Gf(r)}${qf(r)}`}});var KF,JF,XF=l(()=>{"use strict";KF=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,JF=e=>e!==null&&e>0});var kZ,EZ,LZ,YF,ZF=l(()=>{"use strict";R();Gc();Df();Dc();jc();wi();mf();mf();kZ=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),EZ=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ce(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},LZ=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=oe(o);return bi({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},YF=(e,t)=>{if(!Oc(e,t))return e;Eo(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return Fn({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Co(EZ(r));if(t==="wizard-3"){let n=o.splitOptions[0]??kZ(o.templatedPrompt);return To(r,n)}return t==="wizard-4"?LZ(r):e}});var Zf,QF,SC=l(()=>{"use strict";R();Df();wi();Zf=e=>(Eo(e.id),{...bi(e,"stopped"),errorMessage:ww}),QF=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;Eo(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var RZ,eH,tH,rH=l(()=>{"use strict";R();Gc();Df();Dc();jc();Qc();pt();Gn();XF();uC();ZF();SC();RZ="Pick a revision scored above 0 before continuing to Separate.",eH=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),tH=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=Z(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=Z(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Lo(e.storePath,d))};if(o==="wizard-stop-all"){let c=Zf(s);return j(e.storePath,c),Ce(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=QF(s);return j(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=NF(s,c);return j(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=YF(s,c);return j(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&Ce(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",m=Bw(s.wizard,d,c);m=fc(m,d),m={...m,pendingStepInstructions:u};let S={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return j(e.storePath,S),Ce(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?eH(s):Fn({...s,wizard:{...s.wizard,gate:null}});return j(e.storePath,m),Ce(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=KF(s,u??-1);if(!JF(m)){let f={...s,errorMessage:RZ,updatedAt:new Date().toISOString()};return j(e.storePath,f),a(n),!0}let S=Co({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return j(e.storePath,S),Ce(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let f=eH(s);return j(e.storePath,f),Ce(e.storePath,n),a(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(f=>f.id===u);if(m===void 0){let f={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return j(e.storePath,f),a(n),!0}let S=To(s,m);return j(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,m=d.modules[u];if(m===void 0)return a(n),!0;if(!pi(s.costControls)){let P=t.get("confirmedTokenBudget")?.trim()??"",A=t.get("confirmedMaxSpendUsd")?.trim()??"";if(P.length===0){let b={...s,errorMessage:ci,updatedAt:new Date().toISOString()};return j(e.storePath,b),a(n),!0}let h=Wr({existing:s.costControls,confirmedTokenBudget:Number(P),confirmedMaxSpendUsd:A.length===0?null:Number(A),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!h.ok){let b={...s,errorMessage:h.errorMessage,updatedAt:new Date().toISOString()};return j(e.storePath,b),a(n),!0}s={...s,costControls:h.costControls,errorMessage:null,updatedAt:new Date().toISOString()},j(e.storePath,s)}let S=cT({wizard:d,modulePrompt:m.prompt,posted:t});if(!S.ok){let P={...s,errorMessage:S.errorMessage,updatedAt:new Date().toISOString()};return j(e.storePath,P),a(n),!0}let f={...d,parameterValues:S.parameterValues};if(m.status==="pending"){let P=L$({...s,wizard:{...f,gate:null}},u);return j(e.storePath,P),Ce(e.storePath,n),a(n),!0}let y=u+1;if(y>=d.modules.length){let P=oe(f),A=bi({...s,wizard:f},P.terminalStatusSuggestion);return j(e.storePath,A),Ce(e.storePath,n),a(n),!0}let p={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...f,gate:"optimize_modules",currentModuleIndex:y},updatedAt:new Date().toISOString()};return j(e.storePath,p),a(n),!0}}return a(n),!0}});var xZ,oH,WZ,PC,IZ,nH,sH=l(()=>{"use strict";Te();wi();SC();VT();Lf();Vc();pt();xZ="Add a score from 0 to 100 and the reason for it.",oH="Add a score from 1 to 100 and the reason for it.",WZ="Write the next prompt.",PC="This step is not waiting for you.",IZ=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},nH=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=Z(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(j(e.storePath,Zf(a)),{kind:"saved",cycleId:i}):IF(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=Z(e.storePath,r);if(o===null||!cr(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:PC};if(t==="manual-judge"){if(o.judgeModel!==W)return{kind:"invalid",cycle:o,errorMessage:PC};let i=IZ(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?oH:xZ};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:oH};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",u=Rf(Hc(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return j(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==W)return{kind:"invalid",cycle:o,errorMessage:PC};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:WZ};let s=Ef(o,n);return j(e.storePath,s),{kind:"saved",cycleId:o.id}}});var iH,aH=l(()=>{"use strict";iH=`<script>
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
</script>`});var lH,cH=l(()=>{"use strict";lH=`<script>
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
</script>`});var dH,uH=l(()=>{"use strict";dH=`<script>
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
</script>`});var pH,mH=l(()=>{"use strict";pH=`<script>
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
</script>`});var gH,fH=l(()=>{"use strict";R();Je();gH=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:ut(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(ie(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!L(t.status)}}});var hH,yH=l(()=>{"use strict";hH=`<script>
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
</script>`});var SH,PH=l(()=>{"use strict";R();Jc();jf();SH=e=>{let t=_i(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:L(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=Dr(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=oe(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=oe(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return L(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var AH,bH=l(()=>{"use strict";AH=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var jr,OZ,MZ,_H,wH=l(()=>{"use strict";PH();bH();Kc();jr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OZ=e=>e.wizard===void 0?"legacy":"wizard",MZ=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${jr(t)}">`,o=SH(e),n=AH(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${jr(o.badgeClass)}">${jr(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${jr(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${jr(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${OZ(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${jr(e.id)}">${jr(Mr(e.goal))}</a><p class="muted">${jr(a)}</p></div></div><div class="sdlc-history-row-actions">${u}${m}</div></li>`},_H=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>MZ(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${jr(s)}</summary>${i}</details>`:i}});var AC,Qf,TH,NZ,DZ,ed,CH,eh=l(()=>{"use strict";AC=g(require("node:fs")),Qf=g(require("node:path"));Je();TH=/^[a-z0-9-]+$/,NZ=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},DZ=(e,t)=>{if(!TH.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let m=NZ(u[2]??"");u[1]==="name"&&m.length>0&&(o=m),u[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},ed=e=>{let t=Ir(e);if(!t.ok)return[];let r=Qf.default.resolve(t.path,".cursor","skills"),o=[];try{o=AC.default.readdirSync(r)}catch{return[]}return o.filter(n=>TH.test(n)).flatMap(n=>{let s=Qf.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${Qf.default.sep}`))return[];try{let i=DZ(AC.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},CH=(e,t)=>ed(e).find(r=>r.fileName===t)??null});var vH,jZ,kH,EH,LH=l(()=>{"use strict";ko();vH=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jZ=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),kH=e=>{if(e.length===0)return`<div class="field">${pe("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${vH(r.fileName)}">${vH(r.fileName)}</option>`).join("");return`<div class="field">${pe("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${jZ(e)}</script>`},EH=`<script>
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
</script>`});var tt,RH,xH=l(()=>{"use strict";R();Uf();Nc();ko();tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RH=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=tt(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=ui({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??xr(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),m=kf({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",S=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
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
</div>`}});var Ve,WH,IH,zZ,OH,MH,NH,DH=l(()=>{"use strict";R();tC();Te();Kc();Jc();Ve=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WH=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",IH=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,zZ=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},OH=e=>e===W?"You":ae(e),MH=e=>{let t=zZ(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ae(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Ve(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Ve(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Ve(OH(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Ve(OH(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Ve(r)}</dd></div>
    </dl>
  </details>`},NH=e=>{let t=e.wizard;if(t===void 0)return"";let r=Mr(e.goal),o=e.status==="wizard_paused",n=!L(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=$f(e),m=IH(t),S=m===null?"":WH(m),f=Dr(e),y=S.length===0?"":f===null||f>=4?` <strong>${Ve(S)}</strong>`:` <strong>${Ve(S)}</strong> (step ${f+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Ve(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Ve(u.title)}${y}</p>
    <p class="muted">${Ve(u.detail)}</p>
    <div class="actions">
      ${MH(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ve(e.id)}">Open this run</a>
    </div>
  </section>`}let s=IH(t),i=s===null?"Wizard":WH(s),a=Dr(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ve(r)}</h2>
    <p class="lede">Paused at <strong>${Ve(i)}</strong>${Ve(c)} (last updated ${Ve(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${MH(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ve(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var td,jH,zH=l(()=>{"use strict";ko();td=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jH=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${td(n.id)}"${n.id===e.runner?" selected":""}>${td(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${td(e.runner)}">Checking ${td(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${pe("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${pe("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${td(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var $H,FH=l(()=>{"use strict";$H=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var Ti,HH,UH,BH,GH,VH=l(()=>{"use strict";ko();Ti=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HH=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${Ti(c.id)}"${c.id===r?" selected":""}>${Ti(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Ti(n)}</option>`;return`<div class="field">${pe(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},UH=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Ti(t)}">Checking ${Ti(o)}\u2026</p>`},BH=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${pe(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Ti(r)}</textarea><span class="muted">${o}</span></div></details>`,GH=e=>{let t=`<div class="sdlc-writer">${HH("judge","Judge",e.judge,e.writers,"I'll score it")}${UH("judge",e.judge,e.writers)}${BH("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${HH("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${UH("improver",e.improver,e.writers)}${BH("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var qH,KH=l(()=>{"use strict";qH=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var bC,JH,XH=l(()=>{"use strict";KH();bC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),JH=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${qH.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${bC(t.goal)}" title="${bC(t.goal)}">${bC(t.label)}</button>`).join("")}</div>`});var rd,$Z,FZ,_C,YH=l(()=>{"use strict";R();ko();rd=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$Z=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},FZ=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,_C=e=>{let t=$Z(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=cc(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${pe(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${rd(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${rd(e.inputId)}" class="sdlc-pass-range" type="range" name="${rd(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${rd(a)}"><span class="sdlc-pass-mark" style="left:${FZ(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${rd(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var UZ,wC,zr,ZH,QH=l(()=>{"use strict";Vc();lC();aH();cH();Pf();uH();mH();fH();yH();wH();eh();LH();ko();mC();xH();DH();Kc();zH();FH();VH();R();XH();YH();UZ=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,wC='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',zr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ZH=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${zr(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${zr(e.skillNotice??"")}</div>`,o=`${Wz}${Iz}`,n=e.resumableWizardCycle??null,s=n===null?"":NH(n),i=qf(e.cycle),a=e.cycle===null?"":Gf(e.cycle),c=e.cycle!==null&&cr(e.cycle),d=gH(e),u=UZ(d.goal,d.prompt,e.canRun),m=GH({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=jH({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),f=`${_C({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${_C({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=RH({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),p=Hw,P=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",A=e.cycle!==null&&L(e.cycle.status),h=d.running&&!A,b=A||h?"":" open",w=h?" sdlc-compose-run-focus":"",v=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${A?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,E=A?(()=>{let F=e.cycle!==null?Mr(e.cycle.goal):Mr(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${zr(F)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${v}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${v}</summary>`,x=A?" sdlc-compose-viewing-finished":"",I=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",N=c?"waiting":d.running?"running":"idle",U=d.running&&!c?' aria-busy="true"':"",V=`<section class="card sdlc-compose${x}${w}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${b}>
        ${E}
        <div class="sdlc-compose-details-body">
      <p class="lede">${p} ${zr(e.modelNote)}</p>
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
            <input class="input" type="text" name="folder" value="${zr(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${kH(ed(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${wC}
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
            ${JH()}
            <textarea class="input textarea" name="goal" rows="4" required>${zr(d.goal)}</textarea>
          </div>
          <div class="field">
            ${pe("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${zr(d.prompt)}</textarea>
          </div>
          ${f}
          ${y}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${wC}
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
        ${$H()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${wC}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${zr(d.passScore)}; Step 4 pass \u2265 ${zr(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
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
    </section>`,q=e.history.length>0?hH:"",Xe=`${""}${pH}${iH}${lH}${dH}${EH}${q}`;return`${t}${r}${V}${s}${a}${i}${o}${_H(e.history,e.cycle?.id??null)}${Xe}`}});var od,TC=l(()=>{"use strict";QH();od=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:ZH(t)}))}});var e1,t1=l(()=>{"use strict";sH();Qc();TC();pt();Gn();e1=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:nH({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=Z(e.storePath,o.cycleId);return Ce(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(Lo(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await od(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:ar(e.storePath),resumableWizardCycle:null}),!0)}});var r1,th,CC=l(()=>{"use strict";R();r1=g(require("node:os")),th=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??r1.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??$t()}}});var o1,Ci,vC,n1,s1,nd=l(()=>{"use strict";R();Te();MT();o1=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Ci=e=>{let t=iz(e),r=Mn(e).map(s=>({id:s,label:af[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},vC=(e,t,r)=>t===W||t!==null&&e.writers.some(o=>o.id===t)?t:r,n1=(e,t,r,o=null)=>({judge:vC(e,t,e.judge),improver:vC(e,r,e.improver),runner:vC(e,o,e.runner)}),s1=e=>e===Af?{goal:bf,prompt:_f}:{goal:"",prompt:""}});var kC,i1=l(()=>{"use strict";kC=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var a1,BZ,l1,c1,d1,u1=l(()=>{"use strict";R();a1=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},BZ=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},l1=(e,t)=>e.has("earlyStop")?!0:t!=="run",c1=e=>{let t=a1(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=BZ(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=a1(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},d1=e=>$t(e)});var p1,m1,rh,EC=l(()=>{"use strict";R();Te();Je();nd();i1();u1();p1=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=kC(o);return n.ok?String(n.passScore):String(r)},m1=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return kC(n)},rh=e=>{let t=n1(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=p1(e.posted,"passScore",70),o=p1(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",m=e.posted?.get("intent")??"",S=e.posted===null?!0:l1(e.posted,m),f=(E,x)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:E,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:x,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:u,earlyStop:S});if(e.posted===null)return f(e.defaultFolder??Nn,null);let y=e.posted.get("folder")??Nn;if(e.posted.get("intent")==="choose-folder"){let E=e.pickFolder();return f(E===null?y:ut(E),null)}if((e.posted.get("intent")??"")!=="run")return f(y,null);let P=o1(e.goal,e.prompt);if(P!==null)return f(y,P);let A=m1(e.posted,"passScore",r);if(!A.ok)return f(y,A.errorMessage);let h=m1(e.posted,"modulePassScore",o);if(!h.ok)return f(y,h.errorMessage);let b=az(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(b===null)return f(y,"Choose a judge and an improver.");let w=Ir(y);if(!w.ok)return f(y,w.errorMessage);let C=lz(e.installedIds,c,b.judge);if(C===null)return f(y,"Choose a runner for wizard step 4.");let v=c1({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return v.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:b.judge,improver:b.improver,workingDirectory:w.path,passScore:A.passScore,modulePassScore:h.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:C,runnerInstructions:a,costControls:d1(v.knobs)}:f(y,v.errorMessage)}});var vi,nh,GZ,LC,g1,oh,f1,VZ,h1,RC,qZ,KZ,JZ,xC,y1,S1,P1=l(()=>{"use strict";vi=g(require("node:fs")),nh=g(require("node:path"));Te();Je();GZ=["remember","choose-folder","run"],LC=()=>({folder:Nn,judge:"",improver:"",runner:""}),g1=e=>nh.default.join(nh.default.dirname(e),"prompt-optimizer-preferences.json"),oh=e=>typeof e=="string"?e:"",f1=e=>{let t=g1(e);if(!vi.default.existsSync(t))return LC();try{let r=JSON.parse(vi.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return LC();let o=r,n=oh(o.folder).trim();return{folder:n.length===0?Nn:n,judge:oh(o.judge),improver:oh(o.improver),runner:oh(o.runner)}}catch{return LC()}},VZ=(e,t)=>{let r=g1(e);vi.default.mkdirSync(nh.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;vi.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),vi.default.renameSync(o,r)},h1=(e,t)=>e===W||Mn(t).some(r=>r===e),RC=(e,t,r)=>e===null?t:e.length===0?"":h1(e,r)?e:t,qZ=(e,t)=>{if(e===null)return t;let r=Ir(e);return r.ok?r.display:t},KZ=e=>{let t=f1(e.storePath),r={folder:qZ(e.folder,t.folder),judge:RC(e.judge,t.judge,e.installedIds),improver:RC(e.improver,t.improver,e.installedIds),runner:RC(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||VZ(e.storePath,r)},JZ=e=>{let t=Ir(e);return t.ok?t.display:Nn},xC=(e,t)=>h1(e,t)?e:"",y1=e=>{let t=f1(e.storePath);return{selection:{...e.selection,judge:xC(t.judge,e.installedIds)||e.selection.judge,improver:xC(t.improver,e.installedIds)||e.selection.improver,runner:xC(t.runner,e.installedIds)||e.selection.runner},defaultFolder:JZ(t.folder)}},S1=e=>{let t=e.posted.get("intent")??"";if(!GZ.includes(t))return;let r=e.posted.get("folder");KZ({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var A1,XZ,YZ,WC,ZZ,sh,ih=l(()=>{"use strict";A1=g(require("node:os"));Te();hC();$n();XZ="Reply with the single word ok. Do not use tools.",YZ=45e3,WC=async(e,t)=>{if(t===W)return{ok:!0,message:"You will do this step."};let r=GF(e,t);if(r!==null)return{ok:!0,message:r};let o=await Qe({writerAgent:t,prompt:XZ,workingDirectory:A1.default.tmpdir(),timeoutMs:YZ});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ae(t)} is ready.`;return VF(e,t,n),{ok:!0,message:n}},ZZ=e=>[...new Set(e.filter(t=>t.length>0))],sh=async(e,t,r,o)=>{for(let n of ZZ([t,r,o??""])){let s=await WC(e,n);if(!s.ok)return s.message}return null}});var IC,b1=l(()=>{"use strict";R();IC=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!L(r.status)&&!(t!==null&&r.id===t))return r;return null}});var _1,w1=l(()=>{"use strict";Wt();R();Nc();Qc();CC();EC();TC();pt();Je();P1();eh();ih();b1();Vf();Gn();_1=async e=>{let t=e.posted===null?y1({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=rh({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>So("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(S1({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?ut(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await sh(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await od(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:ut(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:ar(e.route.storePath),resumableWizardCycle:IC(ar(e.route.storePath),null)});return}if(r.kind==="start"){let s=CH(r.workingDirectory,r.sourceSkillFile),i=vf(Lc({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=th({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:eT({...gc(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(j(e.route.storePath,a),Ce(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(Lo(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:Z(e.route.storePath,e.cycleId);n!==null&&(n=Un(e.route.storePath,n),Ce(e.route.storePath,n.id)),await od(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:ar(e.route.storePath),resumableWizardCycle:IC(ar(e.route.storePath),n?.id??null)})}});var T1,C1=l(()=>{"use strict";pt();T1=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";Hz(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var v1,k1=l(()=>{"use strict";v1=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var E1,L1=l(()=>{"use strict";Jz();rH();t1();w1();C1();nd();k1();Gn();E1=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await Yf(),o=Ci(r),n=e.method==="POST"?v1(e.request.headers["content-type"],await e.readBody(e.request)):null;if(tH({posted:n,storePath:e.storePath,response:e.response})||await e1(e,n,o))return;let s=s1(t.searchParams.get("example")),i=T1({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=Kz({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await _1({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:qz(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var QZ,R1,x1=l(()=>{"use strict";R();pt();QZ=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",R1=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=Z(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!L(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=tT({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${QZ(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var W1,I1=l(()=>{"use strict";Qc();pt();W1=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:Z(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":Lo(e.storePath,o)),!0}});var eQ,O1,M1=l(()=>{"use strict";Te();ih();eQ=["claude-cli","codex","cursor","antigravity"],O1=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===W||eQ.includes(t)?await WC(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var N1,D1=l(()=>{"use strict";R();N1=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:uc,page:pc,context:ii,installedWriters:e,post:{method:"POST",url:uc,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${uc}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var ah,j1=l(()=>{"use strict";R();aC();hi();ah=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ce(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=L(e.status),n=e.errorKind??null,s=Bf({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:Or(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:ii,page:`${pc}?cycle=${encodeURIComponent(e.id)}`}}});var H,tQ,z1,$1,F1=l(()=>{"use strict";H=g(ms());R();tQ=(0,H.isType)({goal:H.isString,prompt:H.isString,workingDirectory:H.isString,judge:(0,H.isUndefinedOr)(H.isString),improver:(0,H.isUndefinedOr)(H.isString),passScore:(0,H.isUndefinedOr)(H.isNumber),maxRounds:(0,H.isUndefinedOr)(H.isNumber),maxTrials:(0,H.isUndefinedOr)(H.isNumber),maxSpendUsd:(0,H.isUndefinedOr)(H.isNumber),earlyStop:(0,H.isUndefinedOr)(H.isBoolean),earlyStopFlatRounds:(0,H.isUndefinedOr)(H.isNumber),confirmedTokenBudget:(0,H.isUndefinedOr)(H.isNumber),confirmedMaxSpendUsd:(0,H.isUndefinedOr)(H.isNumber),rateUsdPer1kTokens:(0,H.isUndefinedOr)(H.isNumber)}),z1=e=>{let t=e?.trim()??"";return t.length===0?null:t},$1=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return tQ(t)?t.workingDirectory.trim().length===0?{ok:!1,error:Vg}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:z1(t.judge),improver:z1(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:Vg}}});var $r,rQ,H1,U1,B1=l(()=>{"use strict";R();$r=g(ms()),rQ=(0,$r.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:$r.isNumber,confirmedMaxSpendUsd:(0,$r.isUndefinedOr)($r.isNumber),rateUsdPer1kTokens:(0,$r.isUndefinedOr)($r.isNumber)}),H1=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:rQ(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},U1=(e,t)=>{let r=Wr({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var oQ,G1,V1=l(()=>{"use strict";R();Te();EC();nd();oQ=e=>e.map(t=>t.id).join(", "),G1=e=>{let t=Ci(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===W||n===W)return{ok:!1,error:Fw,installedWriters:t.writers};if(o===null||n===null){let a=oQ(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=rh({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var nQ,q1,K1=l(()=>{"use strict";R();CC();D1();j1();nd();F1();B1();V1();pt();nQ=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},q1=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let u=Z(e.storePath,t);return u===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:ah(u)}}let r=await e.handlers.readInstalledIds(),o=Ci(r);if(e.method==="GET")return{status:200,body:N1(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let u=H1(e.rawBody);if(u.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(u.kind==="invalid")return{status:400,body:{ok:!1,error:u.error}};let m=Z(e.storePath,t);if(m===null)return{status:404,body:{ok:!1,error:"That run is not on this Mac."}};let S=U1(m,u.body);return S.ok?(j(e.storePath,S.cycle),{status:200,body:ah(S.cycle)}):{status:400,body:{ok:!1,error:S.error}}}let n=nQ(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let u=ui({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:u.targetTokenBudget,proposedTokenBudget:u.targetTokenBudget,estimatedSpendUsd:u.estimatedSpendUsd,rateUsdPer1kTokens:u.rateUsdPer1kTokens??null,proposalStub:u.stub===!0,confirmationRequired:!0}}}let s=$1(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=G1({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=Lc({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:dt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let u=Wr({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!u.ok)return{status:400,body:{ok:!1,error:u.errorMessage}};c=u.costControls}let d=th({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:gc(i.prompt),runnerModel:i.runner,costControls:c});return j(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:ah(d)}}});var J1,X1=l(()=>{"use strict";Gn();ih();K1();J1=async e=>{let t=await q1({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:Yf,readWritersReady:sh,startCycle:Ce}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var Z1,sQ,iQ,Y1,aQ,Q1,eU=l(()=>{"use strict";Z1=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],sQ=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},iQ=e=>{let t={};for(let n of e)for(let s of new Set(Z1(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},Y1=(e,t)=>{let r=sQ(Z1(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},aQ=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},Q1=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=iQ(e.map(i=>i.text)),s=Y1(o,n);return e.map(i=>({id:i.id,score:aQ(s,Y1(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var OC,lQ,cQ,tU,dQ,uQ,pQ,mQ,MC,NC=l(()=>{"use strict";OC=g(require("node:path"));Je();eU();eh();lQ=5,cQ=20,tU=280,dQ=e=>[e.name,e.description,e.promptText].join(`
`),uQ=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=tU?t:`${t.slice(0,tU-3)}...`},pQ=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),mQ=e=>e===void 0||!Number.isFinite(e)?lQ:Math.min(cQ,Math.max(1,Math.floor(e))),MC=e=>{let t=e.query.trim(),r=mQ(e.limit),o=Ir(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=ed(o.path),s=Q1(n.map(d=>({id:d.fileName,text:dQ(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=OC.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:OC.default.join(a,u.fileName,"SKILL.md"),excerpt:uQ(u),source:"filesystem"}]});return{query:t,hits:c,context:pQ(c)}}});var rU,oU=l(()=>{"use strict";NC();rU=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:MC({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var nU,sU=l(()=>{"use strict";oU();nU=async e=>{let t=rU({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var gQ,DC,iU=l(()=>{"use strict";Nz();L1();x1();I1();M1();X1();sU();gQ=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},DC=async e=>{let t=gQ(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await J1(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await nU(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:Mz()})),!0):(await O1({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||R1({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||W1({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await E1(e),!0)}});var aU=l(()=>{"use strict";iU();NC();$n()});var lU,fQ,Fr,jC,zC=l(()=>{"use strict";lU=e=>{let t=JSON.parse(e);return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]},fQ=e=>e===""?null:e,Fr=e=>e??"",jC=e=>({id:e.id,projectId:fQ(e.project_id),symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:{kind:e.check_kind,value:e.check_value},keywords:lU(e.keywords_json),tags:lU(e.tags_json),source:e.source,hitCount:e.hit_count,lastSeenAt:e.last_seen_at,severity:e.severity})});var cU,hQ,yQ,$C,ki,lh,sd=l(()=>{"use strict";zC();cU=`
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`,hQ=e=>e,yQ=e=>e??null,$C=(e,t,r=t)=>hQ(e.prepare(cU).all(Fr(r),Fr(t))).map(jC),ki=(e,t,r,o=t)=>{let n=yQ(e.prepare(`${cU} AND p.id = ?`).get(Fr(o),Fr(t),r));return n===null?null:jC(n)},lh=(e,t)=>{e.prepare(`INSERT INTO pitfalls (
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
      severity = excluded.severity`).run(Fr(t.projectId),t.id,t.symptom,t.cause,t.avoidance,t.check.kind,t.check.value,JSON.stringify(t.keywords),JSON.stringify(t.tags),t.source,t.severity)}});var id,FC=l(()=>{"use strict";id={symptom:120,cause:200,avoidance:280,checkValue:280,keyword:40,keywords:24,tag:32,tags:12,id:64}});var dU=l(()=>{"use strict";FC()});var Vn,HC=l(()=>{"use strict";Vn=e=>e.replace(/\s+/g," ").trim()});var Ro,UC=l(()=>{"use strict";Ro=e=>Math.ceil(e.length/4)});var ch,uU=l(()=>{"use strict";UC();ch=(e,t)=>{if(t<=0)return"";if(Ro(e)<=t)return e;let r=t*4;return e.slice(0,r).trimEnd()}});var ad,pU=l(()=>{"use strict";HC();ad=e=>`${Vn(e.id)}|${Vn(e.avoidance)}`});var mU=l(()=>{"use strict"});var Ei=l(()=>{"use strict";FC();dU();HC();UC();uU();pU();mU()});var dh,BC=l(()=>{"use strict";Ei();dh=e=>e.map(t=>({id:Vn(t.id),avoidance:Vn(t.avoidance)}))});var GC,fU,uh=l(()=>{"use strict";GC=e=>{let t=new Map;e.seeds.forEach(o=>{t.set(o.id,o)}),e.projectRows.forEach(o=>{t.set(o.id,o)});let r=[...t.values()];return e.includeRetired===!0?r:r.filter(o=>o.source!=="retired")},fU=e=>e.filter(t=>t.source!=="retired").length});var qn,hU,ld=l(()=>{"use strict";Ei();BC();sd();uh();qn=(e,t={})=>{let r=t.projectId??null,o=$C(e,null,r),n=r===null||r===""?[]:$C(e,r);return GC({seeds:o,projectRows:n,includeRetired:t.includeRetired===!0})},hU=(e,t={})=>{let r=qn(e,t);return t.format==="bot"?{format:"bot",items:dh(r),lines:r.map(o=>ad(o))}:{format:"full",items:r}}});var ph,VC=l(()=>{"use strict";sd();ld();ph=(e,t)=>{let r=t.id.trim();if(r.length===0)return null;let o=t.projectId??null;return o===null||o===""?ki(e,null,r):qn(e,{projectId:o,includeRetired:!0}).find(s=>s.id===r)??null}});var qC=l(()=>{"use strict"});var xo,Li,yU,SU,PU=l(()=>{"use strict";xo=e=>({type:"string",description:e}),Li={name:"check_context",description:"Match the current prompt against project pitfalls. Call on the first user message. Returns hit, miss, or none. Miss stays silent.",inputSchema:{type:"object",properties:{cwd:xo("Absolute working directory for the current session."),message:xo("User prompt or task text to match."),sessionId:xo("Optional session id for first-message tracking."),projectId:xo("Optional project id when already known.")},additionalProperties:!1}},yU={name:"get_context",description:"Compact project briefing: id, folder, and feature flags. Not a full docs dump.",inputSchema:{type:"object",properties:{cwd:xo("Absolute working directory."),projectId:xo("Optional project id when already known.")},additionalProperties:!1}},SU={name:"get_pitfalls",description:"List or search project pitfalls in a short bot-friendly form.",inputSchema:{type:"object",properties:{projectId:xo("Project id."),q:xo("Optional search text."),limit:{type:"number",description:"Max rows to return."}},additionalProperties:!1}}});var Kn,AU,bU,_U=l(()=>{"use strict";Kn=e=>({type:"string",description:e}),AU={name:"get_skill",description:"Read one project skill by id or search. Same idea as the cloud skill tools.",inputSchema:{type:"object",properties:{projectId:Kn("Project id."),skillId:Kn("Skill id when known."),q:Kn("Optional search text.")},required:["projectId"],additionalProperties:!1}},bU={name:"record_outcome",description:"Record whether a tip or preflight check helped. Pitfall wins call the cloud hit route.",inputSchema:{type:"object",properties:{projectId:Kn("Project id."),kind:{type:"string",description:"pitfall | preflight | other"},pitfallId:Kn("Pitfall id when kind is pitfall."),preflightId:Kn("Preflight check id when kind is preflight."),ok:{type:"boolean",description:"Whether the step helped."},notes:Kn("Optional short note. No secret values.")},required:["projectId","kind","ok"],additionalProperties:!1}}});var wU=l(()=>{"use strict";PU();_U()});var KC,TU=l(()=>{"use strict";Ei();qC();KC=e=>{let t=ch("Agent Witch tip \xB7 check_context",120);if(Ro(t)>=120)return t;let r=[t],o=Ro(t);for(let n of e){if(r.length-1>=4)break;let s=ad(n),i=Ro(s);if(o+i>120){if(r.length===1){let a=120-o,c=ch(s,a);c.length>0&&(r.push(c),o+=Ro(c));continue}continue}r.push(s),o+=i}return r.join(`
`)}});var CU=l(()=>{"use strict";Ei()});var gh=l(()=>{"use strict";qC();wU();TU();CU()});var _Q,wQ,JC,XC=l(()=>{"use strict";gh();_Q=e=>e.toLowerCase(),wQ=(e,t)=>{let r=_Q(e);return t.reduce((o,n)=>{let s=n.trim().toLowerCase();return s.length===0?o:r.includes(s)?o+1:o},0)},JC=e=>{let t=e.pitfalls.map(r=>({pitfall:r,score:wQ(e.text,r.keywords)})).filter(r=>r.score>0).sort((r,o)=>o.score-r.score||r.pitfall.id.localeCompare(o.pitfall.id));return t.length===0?[]:t.slice(0,4).map(r=>r.pitfall)}});var vU,kU=l(()=>{"use strict";ld();XC();vU=(e,t)=>{let r=qn(e,{projectId:t.projectId,includeRetired:!1});return JC({pitfalls:r,text:t.text})}});var fh,hh,yh,Sh,Ph,dd,EU=l(()=>{"use strict";Ei();fh=id.symptom,hh=id.cause,yh=id.avoidance,Sh=64,Ph="token-saver.db",dd=1});var LU,ud=l(()=>{"use strict";EU();LU=3e3});var RU,xU=l(()=>{"use strict";ud();RU=`
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
`});var WU,IU,OU,TQ,CQ,MU,NU,DU=l(()=>{"use strict";WU=g(require("node:fs")),IU=g(require("node:path")),OU=require("node:sqlite");ud();xU();TQ=e=>{let t=e.prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},CQ=(e,t)=>{e.prepare(`INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},MU=e=>{WU.default.mkdirSync(IU.default.dirname(e),{recursive:!0});let t=new OU.DatabaseSync(e);return t.exec(`PRAGMA busy_timeout = ${LU}`),t.exec(RU),TQ(t)<dd&&CQ(t,dd),t},NU=e=>{e.close()}});var jU,zU,YC=l(()=>{"use strict";zC();jU=(e,t,r,o)=>{let n=e.prepare(`INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`).get(Fr(t),r,o);return{hitCount:n.hit_count,lastSeenAt:n.last_seen_at}},zU=(e,t,r)=>{let o=e.prepare(`SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`).get(Fr(t),r);return o===void 0?{hitCount:0,lastSeenAt:null}:{hitCount:o.hit_count,lastSeenAt:o.last_seen_at}}});var $U,FU=l(()=>{"use strict";VC();YC();$U=(e,t)=>{let r=t.id.trim(),o=r.length===0?null:ph(e,{projectId:t.projectId,id:r});if(o===null)return{ok:!1,reason:"not_found"};let n=t.nowIso??new Date().toISOString(),s=jU(e,t.projectId,o.id,n);return{ok:!0,pitfall:{...o,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt}}}});var ZC,QC,ev=l(()=>{"use strict";ZC=g(require("node:path"));Ae();ud();QC=e=>e.profileEmail!==null?ZC.default.join(e.installDir,Le,e.profileEmail,Ph):ZC.default.join(e.installDir,Ph)});var UU,HU=l(()=>{UU=[{id:"arch-max-lines",symptom:"ci:architecture fails at land (handler >100 / test >100 effective lines)",cause:"Max-effective-lines=100 only enforced late",avoidance:"Run `npm run ci:architecture` before tipping Arch",check:{kind:"command",value:"npm run ci:architecture"},keywords:["architecture","land","ci:architecture","max-effective","lines"],tags:["architecture","ci"]},{id:"symlink-node-modules",symptom:'Turbopack: "points out of the filesystem root"',cause:"Mac worktree with symlinked node_modules",avoidance:"APFS clone: `cp -Rc` (not symlink) into worktree",check:{kind:"id",value:"pit.symlink-node-modules"},keywords:["build","turbopack","symlink","node_modules","filesystem root"],tags:["build"]},{id:"install-bundle-clobber",symptom:"Missing/broken public/install/agent-witch/app/deps.tar.gz or agent-witch.js after build",cause:"Build overwrites install bundle artifacts",avoidance:"Restore those two paths after `build`",check:{kind:"command",value:"test -f public/install/agent-witch/app/deps.tar.gz && test -f public/install/agent-witch/app/agent-witch.js"},keywords:["build","deps.tar.gz","agent-witch.js","install bundle","clobber"],tags:["build","awi"]},{id:"stale-next",symptom:"Typecheck fails spuriously",cause:"Stale .next",avoidance:"`rm -rf .next` then typecheck",check:{kind:"id",value:"pit.stale-next"},keywords:["build","typecheck",".next","stale","turbopack"],tags:["build"]},{id:"main-moved-rebase",symptom:"FF/SHIP fails; main advanced",cause:"main moved between SHIP and FF",avoidance:"`git fetch`; pure-rebase onto new `-rN` branch; **never** force-push",check:{kind:"id",value:"pit.main-moved-rebase"},keywords:["ship","ff","push","rebase","main moved","force-push"],tags:["git"]},{id:"health-lag",symptom:"Declare done on exit 0 / HTTP 200 too early",cause:"Deploy health lags ~1\u20132 min after push",avoidance:"Poll until health `commitSha` == main tip + smoke",check:{kind:"id",value:"pf.health-matches-main"},keywords:["ship","ff","push","health","commitSha","deploy"],tags:["deploy"]},{id:"dirty-home-checkout",symptom:"Accidental reset/clean of ~/daily-magic",cause:"Home checkout left dirty",avoidance:"Use `/tmp` worktrees; never reset/clean home",check:{kind:"id",value:"pit.dirty-home-checkout"},keywords:["reset","clean","home checkout","daily-magic","worktree"],tags:["git"]},{id:"box-no-gh-auth",symptom:"Push from box fails",cause:"Box git has no GitHub auth",avoidance:"Push from the Mac",check:{kind:"id",value:"pit.box-no-gh-auth"},keywords:["ship","ff","push","box","github","auth"],tags:["git"]},{id:"ci-yml-main-only",symptom:"Expecting GH Actions on non-main push",cause:"Old ci.yml push trigger covered only main; CI being removed \u2014 gate is local suite",avoidance:"Run local `npm run ci` (or suite subset); do not wait on Actions",check:{kind:"id",value:"pit.local-suite-gate"},keywords:["ci","actions","github actions","npm run ci","main only"],tags:["ci"]},{id:"secrets-in-logs",symptom:"Secrets printed in logs/CLI",cause:"Verbose dump of env/files",avoidance:"Print existence / path / fingerprint only",check:{kind:"id",value:"pit.secrets-in-logs"},keywords:["secrets","logs","token","keypair","env","fingerprint"],tags:["secrets"]},{id:"no-prs-daily-magic",symptom:"PR windows opened in Mac Chrome",cause:"Habit from other repos",avoidance:"No PRs for daily-magic; never open PR UI",check:{kind:"id",value:"pit.no-prs"},keywords:["pr","pull request","chrome","daily-magic"],tags:["git"]}]});var kQ,EQ,tv,rv=l(()=>{"use strict";HU();kQ=UU,EQ=e=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags??[],projectId:null,source:"seed",hitCount:0,lastSeenAt:null,severity:"warn"}),tv=()=>kQ.map(EQ)});var BU,GU=l(()=>{"use strict";rv();sd();BU=e=>tv().reduce((r,o)=>ki(e,null,o.id)!==null?r:(lh(e,o),r+1),0)});var VU,qU,KU=l(()=>{"use strict";ud();VU=e=>e.id.trim().length===0?{kind:"empty_id"}:e.projectId.trim().length===0?{kind:"empty_project_id"}:e.symptom.length>fh?{kind:"field_too_long",field:"symptom",max:fh}:e.cause.length>hh?{kind:"field_too_long",field:"cause",max:hh}:e.avoidance.length>yh?{kind:"field_too_long",field:"avoidance",max:yh}:null,qU=e=>e.activeCountAfter>Sh?{kind:"active_cap",max:Sh}:null});var JU,XU=l(()=>{"use strict";sd();YC();ld();uh();KU();JU=(e,t)=>{let r=VU(t);if(r!==null)return{ok:!1,error:r};let o=t.id.trim(),n=ki(e,t.projectId,o),s=zU(e,t.projectId,o),i=t.source??"project",a={id:o,projectId:t.projectId,symptom:t.symptom,cause:t.cause,avoidance:t.avoidance,check:t.check,keywords:t.keywords,tags:t.tags??[],source:i,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt,severity:t.severity??n?.severity??"warn"},d=qn(e,{projectId:t.projectId,includeRetired:!0}).filter(S=>S.id!==a.id),u=fU([...d,a]),m=qU({activeCountAfter:u});return m!==null?{ok:!1,error:m}:(lh(e,a),{ok:!0,pitfall:a})}});var ov,nv=l(()=>{"use strict";VC();ld();kU();DU();FU();ev();GU();XU();ov=e=>{let t=e.dbPath??(e.layout!==void 0?QC(e.layout):(()=>{throw new Error("createPitfallRegistry requires dbPath or layout")})()),r=MU(t);return BU(r),{dbPath:t,listPitfalls:o=>hU(r,o),getPitfall:o=>ph(r,o),upsertPitfall:o=>JU(r,o),recordHit:o=>$U(r,o),matchPitfalls:o=>vU(r,o),close:()=>NU(r)}}});var LQ,RQ,sv,iv=l(()=>{"use strict";gh();BC();LQ=(e,t,r)=>{let o=t.projectId?.trim();return o!==void 0&&o.length>0?o:r===null||e.resolveProjectId===void 0?null:e.resolveProjectId(r)},RQ=(e,t,r,o)=>{for(let n of o)try{t.recordHit({projectId:r,id:n.id})}catch(s){e.logError?.(s)}},sv=(e,t)=>{try{let r=t.cwd?.trim()??"",o=r.length>0?r:null;if(o!==null&&e.isDeclined?.(o)===!0)return{status:"none"};let n=LQ(e,t,o);if(n===null||e.registry===null)return{status:"none",promptCreate:o!==null};let s=e.registry.matchPitfalls({projectId:n,text:t.message??""});if(s.length===0)return{status:"miss",projectId:n};RQ(e,e.registry,n,s);let i=dh(s);return{status:"hit",projectId:n,pitfalls:i,tip:KC(i)}}catch(r){return e.logError?.(r),{status:"none"}}}});var av,YU=l(()=>{"use strict";gh();av={name:Li.name,description:Li.description,inputSchema:Li.inputSchema}});var Jn,ZU,pd,xQ,Ah,md=l(()=>{"use strict";Jn=g(require("node:fs")),ZU=g(require("node:os")),pd=()=>({readUtf8:e=>Jn.default.readFileSync(e,"utf8"),writeUtf8:(e,t)=>{Jn.default.writeFileSync(e,t,"utf8")},exists:e=>Jn.default.existsSync(e),mkdirp:e=>{Jn.default.mkdirSync(e,{recursive:!0})},rename:(e,t)=>{Jn.default.renameSync(e,t)},realpath:e=>Jn.default.realpathSync.native(e)}),xQ=()=>({homedir:()=>ZU.default.homedir()}),Ah=()=>({...pd(),...xQ()})});var QU,eB=l(()=>{"use strict";QU=(e,t)=>{let r=e.trim();if(r.length===0)return r;try{return t.exists(r)?t.realpath(r):r}catch{return r}}});var Xn,Ri,xi,tB,rB,oB,nB,sB,iB,lv,gd,bh,_h,cv,ur=l(()=>{"use strict";Xn="agent-witch-token-saver",Ri=`# BEGIN ${Xn}`,xi=`# END ${Xn}`,tB=`<!-- BEGIN ${Xn} -->`,rB=`<!-- END ${Xn} -->`,oB=".cursor/mcp.json",nB=".codex/config.toml",sB=".codex/AGENTS.md",iB=".claude/settings.json",lv="declined-projects.json",gd="agent-witch",bh="agent-witch",_h=["mcp"],cv="agent-witch mcp-hook check_context"});var dv,aB,lB=l(()=>{"use strict";dv=g(require("node:path"));Ae();ur();aB=e=>e.profileEmail!==null?dv.default.join(e.installDir,Le,e.profileEmail,lv):dv.default.join(e.installDir,lv)});var cB,bt,Hr=l(()=>{"use strict";cB=g(require("node:path")),bt=e=>{let{fs:t,filePath:r,contents:o}=e;t.mkdirp(cB.default.dirname(r));let n;e.backup===!0&&t.exists(r)&&(n=`${r}.aw-bak.${new Date().toISOString().replaceAll(":","-")}`,t.writeUtf8(n,t.readUtf8(r)));let s=`${r}.aw-tmp`;return t.writeUtf8(s,o),t.rename(s,r),n!==void 0?{backupPath:n}:{}}});var wh,WQ,dB,Th,Ch=l(()=>{"use strict";md();eB();lB();Hr();wh=()=>({byRealpath:{}}),WQ=e=>{try{let t=JSON.parse(e);if(typeof t!="object"||t===null)return wh();let r=t.byRealpath;return typeof r!="object"||r===null?wh():{byRealpath:r}}catch{return wh()}},dB=(e,t=pd())=>{let r=aB(e);return t.exists(r)?WQ(t.readUtf8(r)):wh()},Th=e=>{let t=e.fs??pd(),r=QU(e.cwd,t);return dB(e.layout,t).byRealpath[r]!==void 0}});var Wo,vh,uv=l(()=>{"use strict";Wo=(e,t)=>{let r=e[t];if(typeof r!="string")return;let o=r.trim();return o.length>0?o:void 0},vh=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return{};let t=e;return{...Wo(t,"cwd")!==void 0?{cwd:Wo(t,"cwd")}:{},...Wo(t,"message")!==void 0?{message:Wo(t,"message")}:{},...Wo(t,"sessionId")!==void 0?{sessionId:Wo(t,"sessionId")}:{},...Wo(t,"projectId")!==void 0?{projectId:Wo(t,"projectId")}:{}}}});var fd,pv=l(()=>{"use strict";Wt();iv();nv();Ch();uv();fd=e=>{let t=e.logError??(o=>{let n=o instanceof Error?o.message:String(o);console.error(`[agent-witch] check_context: ${n}`)}),r=e.isDeclined??(o=>Th({layout:e.layout,cwd:o}));return o=>{let n=vh(o),s=null;try{return s=ov({layout:e.layout}),sv({registry:s,resolveProjectId:Tb,isDeclined:r,logError:t},n)}catch(i){return t(i),{status:"none"}}finally{s?.close()}}}});var IQ,mv,uB=l(()=>{"use strict";pv();uv();IQ="/api/local/check-context",mv=async e=>{if(e.pathname!==IQ)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t={};try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{return e.sendJson(e.response,400,{status:"none"}),!0}let r=fd({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,r(vh(t))),!0}});var pB,kh,OQ,MQ,mB,gB=l(()=>{"use strict";pB=g(require("node:path"));ur();Hr();kh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),OQ={hooks:[{type:"command",command:cv,timeout:3,[Xn]:!0}]},MQ=e=>Array.isArray(e)&&e.some(t=>kh(t)&&Array.isArray(t.hooks)&&t.hooks.some(r=>kh(r)&&(r.command===cv||r[Xn]===!0))),mB=e=>{let t=pB.default.join(e.io.homedir(),iB),r={};if(e.io.exists(t))try{let a=JSON.parse(e.io.readUtf8(t));kh(a)&&(r={...a})}catch{r={}}let o=kh(r.hooks)?{...r.hooks}:{},n=o.UserPromptSubmit;if(MQ(n))return{ok:!0,path:t,wrote:!1};let s=Array.isArray(n)?[...n]:[];s.push(OQ),o.UserPromptSubmit=s;let{backupPath:i}=bt({fs:e.io,filePath:t,contents:`${JSON.stringify({...r,hooks:o},null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:i}}});var hd,Eh=l(()=>{"use strict";ur();hd=e=>{let t=e.begin??Ri,r=e.end??xi,o=`${t}
${e.blockBody.trimEnd()}
${r}
`,n=e.existing.indexOf(t);if(n<0){let u=`${e.existing.length===0||e.existing.endsWith(`
`)?e.existing:`${e.existing}
`}${o}`;return{next:u,changed:u!==e.existing}}let s=e.existing.indexOf(r,n);if(s<0){let d=`${e.existing.slice(0,n)}${o}`;return{next:d,changed:d!==e.existing}}let i=s+r.length,a=e.existing.slice(i).replace(/^\n/,""),c=`${e.existing.slice(0,n)}${o}${a}`;return{next:c,changed:c!==e.existing}}});var fB,NQ,hB,yB=l(()=>{"use strict";fB=g(require("node:path"));Eh();ur();Hr();NQ=["On the first user message of a session, call the Agent Witch MCP tool","`check_context` with the current cwd.","If status is miss or none (declined), stay silent. If hit, follow the tip."].join(`
`),hB=e=>{let t=fB.default.join(e.io.homedir(),sB),r=e.io.exists(t)?e.io.readUtf8(t):"",{next:o,changed:n}=hd({existing:r,blockBody:NQ,begin:Ri,end:xi});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=bt({fs:e.io,filePath:t,contents:o,backup:r.length>0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var SB,PB,AB=l(()=>{"use strict";SB=g(require("node:path"));Eh();ur();Hr();PB=e=>{let t=SB.default.join(e.io.homedir(),nB),r=_h.map(c=>`"${c}"`).join(", "),o=[`[mcp_servers.${gd}]`,`command = "${bh}"`,`args = [${r}]`].join(`
`),n=e.io.exists(t)?e.io.readUtf8(t):"",{next:s,changed:i}=hd({existing:n,blockBody:o,begin:Ri,end:xi});if(!i)return{ok:!0,path:t,wrote:!1};let{backupPath:a}=bt({fs:e.io,filePath:t,contents:s,backup:n.length>0});return{ok:!0,path:t,wrote:!0,backupPath:a}}});var bB,gv,_B,wB=l(()=>{"use strict";bB=g(require("node:path"));ur();Hr();gv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_B=e=>{let t=bB.default.join(e.io.homedir(),oB),r={command:bh,args:[..._h]},o={};if(e.io.exists(t))try{let d=JSON.parse(e.io.readUtf8(t));gv(d)&&(o={...d})}catch{o={}}let n=gv(o.mcpServers)?{...o.mcpServers}:{},s=n[gd];if(gv(s)&&s.command===r.command&&Array.isArray(s.args)&&JSON.stringify(s.args)===JSON.stringify(r.args))return{ok:!0,path:t,wrote:!1};n[gd]=r;let a={...o,mcpServers:n},{backupPath:c}=bt({fs:e.io,filePath:t,contents:`${JSON.stringify(a,null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:c}}});var Lh,fv=l(()=>{"use strict";md();gB();yB();AB();wB();Lh=e=>{let t=e?.io??Ah();return{ok:!0,cursorMcp:_B({io:t}),codexConfig:PB({io:t}),codexAgents:hB({io:t}),claudeHook:mB({io:t})}}});var TB=l(()=>{"use strict";ur()});var CB=l(()=>{"use strict";TB();ur();Eh();Hr()});var vB=l(()=>{"use strict";Hr()});var hv=l(()=>{"use strict";ur();CB();vB()});var yv=l(()=>{"use strict"});var kB=l(()=>{"use strict";yv()});var EB=l(()=>{"use strict";yv();kB()});var LB,$$e,RB=l(()=>{"use strict";LB=g(require("node:path"));EB();Hr();$$e=LB.default.join(".agent-witch","token-saver.json")});var Sv=l(()=>{"use strict"});var xB=l(()=>{"use strict";RB();md();Ch();Sv();fv();hv()});var Pv=l(()=>{"use strict";nv();ev();XC();uh();rv();iv();YU();pv();uB();fv();hv();xB();Ch();Sv();md()});var Av,bv,_v=l(()=>{"use strict";Av="2025-03-26",bv={name:"agent-witch",version:"1.0.0"}});var Wi,Rh,WB,qQ,yd,IB=l(()=>{"use strict";_v();Wi=(e,t,r)=>({jsonrpc:"2.0",id:e??null,error:{code:t,message:r}}),Rh=(e,t)=>({jsonrpc:"2.0",id:e??null,result:t}),WB=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:null,qQ=async(e,t,r,o)=>{let n=t?.name;if(typeof n!="string")return Wi(e,-32602,"tool name is required");let s=r.tools.find(i=>i.definition.name===n);if(s===void 0)return Wi(e,-32602,`Unknown tool: ${n}`);try{let i=await s.call(t?.arguments??{},o);return Rh(e,i)}catch(i){let a=i instanceof Error?i.message:String(i);return Wi(e,-32603,`Tool ${n} failed: ${a}`)}},yd=async(e,t,r)=>{let o=WB(e);if(o===null)return Wi(null,-32700,"Parse error");let n=o.id??null,s=o.method;return typeof s!="string"?Wi(n,-32600,"Invalid Request"):s==="initialize"?Rh(n,{protocolVersion:Av,capabilities:{tools:{listChanged:!1}},serverInfo:t.serverInfo}):s==="ping"||s==="notifications/initialized"?Rh(n,{}):s==="tools/list"?Rh(n,{tools:t.tools.map(i=>i.definition)}):s==="tools/call"?qQ(n,WB(o.params),t,r):Wi(n,-32601,"Method not found")}});var wv,OB=l(()=>{"use strict";wv=(e,t)=>({content:[{type:"text",text:e}],...t===!0?{isError:!0}:{}})});var xh=l(()=>{"use strict";IB();OB();_v()});var Ii,Wh=l(()=>{"use strict";Pv();xh();Ii=e=>{let t=fd({layout:e.layout,isDeclined:e.isDeclined});return{serverInfo:bv,tools:[{definition:av,call:r=>wv(JSON.stringify(t(r)))}]}}});var MB,KQ,JQ,NB,DB=l(()=>{"use strict";xh();Wh();MB=(e,t)=>{let r=JSON.stringify(t);e.write(`Content-Length: ${Buffer.byteLength(r,"utf8")}\r
\r
${r}`)},KQ=async(e,t)=>{let r=Buffer.alloc(0);for await(let o of e.stdin)for(r=Buffer.concat([r,Buffer.isBuffer(o)?o:Buffer.from(String(o),"utf8")]);;){let n=r.indexOf(`\r
\r
`);if(n<0)break;let s=r.subarray(0,n).toString("utf8"),i=/Content-Length:\s*(\d+)/i.exec(s);if(i===null){r=r.subarray(n+4);continue}let a=Number.parseInt(i[1]??"0",10),c=n+4+a;if(r.length<c)break;let d=r.subarray(n+4,c).toString("utf8");r=r.subarray(c);let u;try{u=JSON.parse(d)}catch{u=null}await t(u)}},JQ=async(e,t)=>{await KQ(t,async r=>{let o=typeof r=="object"&&r!==null?r:null,n=o?.method,s=await yd(r,e,void 0);if(typeof n=="string"&&n.startsWith("notifications/")){o?.id!==void 0&&MB(t.stdout,s);return}MB(t.stdout,s)})},NB=async e=>{await JQ(Ii({layout:e.layout}),{stdin:process.stdin,stdout:process.stdout})}});var XQ,Ih,jB=l(()=>{"use strict";xh();Wh();XQ="/mcp",Ih=async e=>{if(e.pathname!==XQ)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t=null;try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{t=null}let r=e.server??Ii({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,await yd(t,r,void 0)),!0}});var zB={};ft(zB,{createAwlMcpServer:()=>Ii,runAwlMcpStdio:()=>NB,tryHandleAwlMcpHttpRequest:()=>Ih});var Tv=l(()=>{"use strict";Wh();DB();jB()});var Yn,Sd,YQ,ZQ,QQ,eee,$B,FB=l(()=>{"use strict";Yn=g(require("node:fs")),Sd=g(require("node:path")),YQ="prompt-optimizer-cycles.json",ZQ="prompt-optimizer-preferences.json",QQ="prompt-sdlc-cycles.json",eee="prompt-sdlc-preferences.json",$B=e=>{let t=Sd.default.join(e,YQ),r=Sd.default.join(e,QQ);if(Yn.default.existsSync(t)||!Yn.default.existsSync(r))return t;try{Yn.default.renameSync(r,t)}catch{return r}let o=Sd.default.join(e,eee),n=Sd.default.join(e,ZQ);if(Yn.default.existsSync(o)&&!Yn.default.existsSync(n))try{Yn.default.renameSync(o,n)}catch{}return t}});var Oi,tee,Cv,HB=l(()=>{"use strict";Oi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tee=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],Cv=e=>{let t=tee.map(i=>`<option value="${Oi(i.value)}">${Oi(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Oi(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Oi(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Oi(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Oi(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Pd,GB,ree,VB,oee,nee,qB,Mh,UB,BB,see,iee,Ur,Ad,Oh,aee,Nh,vv,lee,kv,KB,Ev,JB,cee,dee,uee,XB,YB,ZB,bd=l(()=>{"use strict";Pd=g(require("node:fs")),GB=g(require("node:path")),ree="estimate-history.ndjson",VB=100,oee=500,nee=2e4,qB=e=>GB.default.join(e,ree),Mh=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,oee),UB=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,nee),BB=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,see=e=>({...e,estimateTokens:BB(e.estimateTokens),actualTokens:BB(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),iee=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Ur=e=>{let t=qB(e);return Pd.default.existsSync(t)?Pd.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return iee(n)?[see(n)]:[]}catch{return[]}}):[]},Ad=(e,t)=>{Pd.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Pd.default.writeFileSync(qB(e),r,"utf8")},Oh=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),aee=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${Oh(o.task)} | ${Oh(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},Nh=e=>{let t=Ur(e.reportsDir),r=Mh(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ad(e.reportsDir,[...s,n])},vv=e=>{let t=Ur(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?Mh(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Ad(e.reportsDir,[...i,s])},lee=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-VB),kv=e=>[...Ur(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),KB=e=>{let t=Ur(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=UB(e.input),n=UB(e.output),s=Mh(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Ad(e.reportsDir,[...c,a])},Ev=(e,t)=>{let r=Ur(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},JB=e=>({table:aee(lee(Ur(e))),embedding:null}),cee=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},dee=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-VB),uee=e=>{let t=cee(dee(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${Oh(s.task)} | ${Oh(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},XB=e=>{let t=Ur(e.reportsDir),r=Mh(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ad(e.reportsDir,[...s,n])},YB=e=>{let t=Ur(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Ad(e.reportsDir,[...s,n])},ZB=e=>uee(Ur(e))});var QB=l(()=>{"use strict";bd()});var Br,Lv,pee,Rv,mee,gee,Dh,jh,fee,xv,eG=l(()=>{"use strict";QB();WT();Br=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lv=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},pee=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Lv(-r)} under`:`${Lv(r)} over`},Rv=e=>e.toLocaleString("en-US"),mee=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Rv(-r)} under`:`${Rv(r)} over`},gee=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},Dh=e=>e===null?"\u2014":Lv(e),jh=e=>e===null?"\u2014":Rv(e),fee=`(function () {
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
})();`,xv=e=>{let r=kv(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":pee(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":mee(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${Br(gee(i))}</button></td>
        <td>${Br(c)}</td>
        <td>${Dh(n.estimateSeconds)}</td>
        <td>${Dh(n.actualSeconds)}</td>
        <td>${Br(d)}</td>
        <td>${jh(n.estimateTokens)}</td>
        <td>${jh(n.actualTokens)}</td>
        <td>${Br(u)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${Br(c)}</p>
        <h2>Input</h2>
        <pre>${Br(i)}</pre>
        <h2>Output</h2>
        <pre>${Br(a)}</pre>
        <p>Time: estimated ${Dh(n.estimateSeconds)} \xB7 actual ${Dh(n.actualSeconds)} \xB7 ${Br(d)}</p>
        <p>Tokens: estimated ${jh(n.estimateTokens)} \xB7 actual ${jh(n.actualTokens)} \xB7 ${Br(u)}</p>
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
            ${gf({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${fee}</script>`}
    </section>`}});var tG=l(()=>{"use strict";HB();eG()});var Mi,hee,yee,Wv,rG=l(()=>{"use strict";Mi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hee=(e,t,r)=>{let o=Mi(t),n=Mi(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},yee=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Mi(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>hee(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Mi(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Mi(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Mi(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},Wv=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(yee).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var oG=l(()=>{"use strict";rG()});var _d,nG,sG,Iv,Ov,Mv,iG=l(()=>{"use strict";_d=g(require("node:fs")),nG=g(require("node:path"));Ql();Wg();sG=(e,t,r)=>Qs({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,Iv=(e,t,r)=>{let o=sG(e,t,r);if(o===null)return[];if(!_d.default.existsSync(o))return[];let n=_d.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},Ov=e=>{let t=sG(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Er(e.entry.prompt),output:Er(e.entry.output)};_d.default.mkdirSync(nG.default.dirname(t),{recursive:!0}),_d.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},Mv=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var See,Pee,wd,zh,Nv=l(()=>{"use strict";See=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Pee=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,wd=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=See(i.assistantOutput),d=c.length>0?`Assistant: ${Pee(c,t)}`:null,u=[a,d].filter(m=>m!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},zh=e=>{let t=e.userMessage.trim(),r=wd({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var pr,Td,zv,Aee,bee,Dv,_ee,$v,$h,aG,lG,wee,Ni,Fv,jv,cG,Tee,dG,Di,Fh,Cd,Cee,vd,Hv,Hh,Uh,uG=l(()=>{"use strict";pr=g(require("node:fs")),Td=g(require("node:path")),zv=require("node:crypto");Nv();Aee="writer-sessions",bee="active-index.json",Dv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_ee=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",$v=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},$h=e=>{let t=Td.default.join(e.installDir,Aee);return pr.default.mkdirSync(t,{recursive:!0}),t},aG=e=>Td.default.join($h(e),bee),lG=(e,t)=>Td.default.join($h(e),`${t}.canonical.json`),wee=(e,t)=>Td.default.join($h(e),`${t}.continuation.json`),Ni=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,Fv=e=>{let t=aG(e);if(!pr.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(pr.default.readFileSync(t,"utf8"));if(!Dv(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!Dv(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!_ee(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},jv=(e,t)=>{pr.default.writeFileSync(aG(e),JSON.stringify(t,null,2))},cG=(e,t)=>{pr.default.writeFileSync(lG(e,t.sessionId),JSON.stringify(t,null,2))},Tee=(e,t)=>{pr.default.writeFileSync(wee(e,t.sessionId),JSON.stringify(t,null,2))},dG=(e,t)=>{let r=wd({turns:t.turns});Tee(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Di=(e,t)=>{let r=lG(e,t);if(!pr.default.existsSync(r))return null;try{let o=JSON.parse(pr.default.readFileSync(r,"utf8"));return!Dv(o)||typeof o.sessionId!="string"?null:o}catch{return null}},Fh=(e,t=20)=>{let r=$h(e),o=pr.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Di(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Cd=(e,t,r)=>{let o=$v(r);return Fv(e).entries.find(i=>Ni(i)===Ni({writerAgent:t,projectFolderPath:o}))?.sessionId??null},Cee=(e,t,r,o)=>{let n=Fv(e),s=Ni({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>Ni(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];jv(e,{entries:i})},vd=(e,t,r)=>{let o=(0,zv.randomUUID)(),n=new Date().toISOString(),s=$v(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return cG(e,i),dG(e,i),Cee(e,t,s,o),o},Hv=(e,t,r)=>{let o=Cd(e,t,r);return o!==null?o:vd(e,t,r)},Hh=(e,t,r)=>{let o=$v(r),n=Fv(e);if(o===null&&r===void 0){jv(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=Ni({writerAgent:t,projectFolderPath:o});jv(e,{entries:n.entries.filter(i=>Ni(i)!==s)})},Uh=e=>{let t=Hv(e.layout,e.writerAgent,e.projectFolderPath),r=Di(e.layout,t);if(r===null)return;let o={id:(0,zv.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};cG(e.layout,n),dG(e.layout,n)}});var vee,kee,Bh,Uv,pG=l(()=>{"use strict";vee=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",kee=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},Bh=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",Uv=e=>{let t=Bh(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=vee(r,e.userPromptCharacterCount),n=kee({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var Gh=l(()=>{"use strict";iG();uG();Nv();pG()});var mG=l(()=>{"use strict";um();Is();mA()});var gG=l(()=>{"use strict";FP()});var rt,Lee,Ree,Bv,Gv,Vv,fG=l(()=>{"use strict";mG();gG();rt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lee=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},Ree=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=il(o);return`value="${rt(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${rt(r)}"`},Bv=(e,t,r,o,n)=>{let s=pm[t];return`<label class="field">
          <span class="field-label">${rt(o)} API key \u2014 ${rt(Lee(e,t))} \xB7 <a class="field-link" href="${rt(s.href)}" target="_blank" rel="noopener noreferrer">${rt(s.label)}</a></span>
          <input class="input mono" type="password" name="${rt(r)}" autocomplete="off" ${Ree(e,t,n)} />
        </label>`},Gv=(e,t,r,o)=>{let n=om(e[t]?.model),s=new Set(rm[t].map(c=>c.value)),i=rm[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${rt(c.value)}"${d}>${rt(c.label)}</option>`}).join(""),a=n!==cn&&!s.has(n)?`<option value="${rt(n)}" selected>${rt(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${rt(o)}</span>
          <select class="input mono" name="${rt(r)}">${i}${a}</select>
        </label>`},Vv=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${rt(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${Bv(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${Gv(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${Bv(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${Gv(e.secrets,"openai","openaiModel","OpenAI model")}
        ${Bv(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${Gv(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var hG=l(()=>{"use strict";fG()});var Vh,yG,SG=l(()=>{"use strict";Vh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yG=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${Vh(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${Vh(s.name)}</strong> <span class="muted mono">(${Vh(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${Vh(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var xee,PG,AG,bG=l(()=>{"use strict";xee=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,PG=e=>e.kind==="folder",AG=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&PG(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if(PG(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(xee)};return r(t)}});var _G,qv,wG=l(()=>{"use strict";_G=g(require("node:path")),qv=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${qv(r.children,t)}</ul>
            </details>
          </li>`;let o=_G.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var TG,Io,Wee,Iee,kd,Oee,Kv,CG=l(()=>{"use strict";Dg();TG=g(require("node:path"));SG();bG();wG();Io=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Wee=()=>`(() => {
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

})();`,Iee=()=>`(() => {
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
})();`,kd=e=>{let t=nc({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=yG({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Io(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Io(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':Oee(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Io(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Io(s)}" />
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
    <script>${Wee()}</script>
    <script>${Iee()}</script>`;return`${t}${r}${o}${c}${d}`},Oee=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=AG(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:TG.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),u=qv(d,Io),m=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Io(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Io(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${u}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Io(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},Kv=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=a.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??u??a,S=t.sets[i];if(S===void 0)continue;let f=a.length>0?a:S.proposedSlug,y=m.length>0?m:S.proposedName,p=r.has(i),P=S.items.map(A=>({id:A.id,kind:A.kind,title:A.title,sourcePath:A.sourcePath,include:p}));s.push({slug:f,name:y,items:P})}return s}});var vG=l(()=>{"use strict";CG()});var Mee,Jv,kG=l(()=>{"use strict";Cr();Mee=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[Ue]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},Jv=Mee});var Nee,EG,LG=l(()=>{"use strict";Cr();Nee=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[Ue]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},EG=Nee});var RG=l(()=>{"use strict"});var Zn,Dee,Xv,xG=l(()=>{"use strict";Dg();Cb();Zn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Dee=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,Xv=e=>{let t=e.flashError?`<div class="alert-error">${Zn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Zn(e.flashMessage)}</div>`:"",r=nc({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Zn(Dee(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${Zn(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=eg(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${Zn(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Zn(n.name)}</strong>
                  <span class="muted mono">${Zn(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${u}${m}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var WG=l(()=>{"use strict";RG();tg();xG()});var qh,IG=l(()=>{"use strict";qh=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var OG,Ut,Yv=l(()=>{"use strict";OG=g(require("node:path"));ht();Ae();B();le();ub();Ut=e=>{let t=$()?.layout.installDir??k();if(OG.default.basename(t)===Gt)return it;let r=$(),o=r!==null?Re(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):it}});var Zv,MG=l(()=>{"use strict";Yt();Yv();Zv=async e=>{let t=$e(e.installDir),r=t?.bundleVersion??null,o=Ut(t);try{let n=await vs(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Qo(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Qv,NG=l(()=>{"use strict";Qv=e=>!e});var ek,ji,tk=l(()=>{"use strict";B();ek=()=>`http://127.0.0.1:${hs()}/update/run`,ji=async e=>{try{let t=await fetch(ek(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var jee,DG,rk,jG=l(()=>{"use strict";B();re();tk();jee=()=>{Sr({launchAgentLabel:fe(),installDir:k()})},DG=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},rk=async()=>{jee();let e=await ji({force:!0});if(e.ok)return{ok:!0,message:DG(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:DG(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Yt(),gW)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var ok=l(()=>{"use strict";fw();IG();Yv();MG();NG();jG();tk()});var zG,$G=l(()=>{"use strict";zG=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var FG,HG,nk,sk,UG=l(()=>{"use strict";FG=require("node:crypto"),HG=g(require("node:fs"));Wt();le();le();$G();nk=!1,sk=async e=>{if(nk)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!zG(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Y({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&HG.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,FG.randomUUID)();nk=!0;try{if(await pb(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Ms({...r,workspace:n},e.writerAgent,t);return await El(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{nk=!1}}});var BG=l(()=>{"use strict";UG()});var _t,zee,GG,VG,ik,ak,lk,ck,dk,uk,pk=l(()=>{"use strict";_t=require("node:crypto"),zee=Buffer.from("302a300506032b6570032100","hex"),GG=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},VG=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,_t.createPublicKey)({key:Buffer.concat([zee,t]),format:"der",type:"spki"})},ik=()=>{let{publicKey:e,privateKey:t}=(0,_t.generateKeyPairSync)("ed25519");return{publicKeyRaw:GG(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},ak=e=>(0,_t.createPrivateKey)(e),lk=(e,t)=>(0,_t.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),ck=(e,t,r)=>{try{let o=VG(e);return(0,_t.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},dk=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,uk=()=>(0,_t.randomBytes)(32).toString("base64url")});var Gr,Kh,qG,$ee,Fee,Jh,mk,gk,KG=l(()=>{"use strict";Gr=g(require("node:fs")),Kh=g(require("node:path"));pk();B();Ae();qG=e=>Kh.default.join(e.installDir,eo),$ee=(e,t)=>{if(e.profileEmail===null||t===qG(e)||Gr.default.existsSync(t))return;let r=qG(e);Gr.default.existsSync(r)&&(Gr.default.mkdirSync(Kh.default.dirname(t),{recursive:!0}),Gr.default.renameSync(r,t))},Fee=e=>{if(!Gr.default.existsSync(e))return null;try{let t=Gr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Jh=e=>{let t=ha(e);$ee(e,t);let r=Fee(t);if(r!==null)return r;let o=ik();return Gr.default.mkdirSync(Kh.default.dirname(t),{recursive:!0}),Gr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},mk=e=>{let t=Jh(e.layout),r=uk(),o=dk({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=ak(t.privateKeyPem),s=lk(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},gk=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return ck(e.serverPublicKey,t,e.serverAttestation)}});var fk=l(()=>{"use strict";KG();pk()});var JG,XG,YG=l(()=>{"use strict";JG=g(require("node:path")),XG=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:JG.default.basename(e.installDir)})});var t2,Ed,Sk,Pk,ZG,Hee,hk,Xh,ge,r2,Uee,yk,Bee,Gee,Ak,me,ve,mt,Vee,QG,e2,Ld,Rd,o2=l(()=>{"use strict";t2=g(require("node:http")),Ed=g(require("node:fs")),Sk=g(require("node:path"));Yh();Xl();bN();wN();LN();an();B_();mw();rD();nD();aU();Pv();Tv();FB();tG();oG();Gh();hG();vG();go();Wt();Cr();kG();LG();WG();ok();Yt();BG();le();fk();YG();Pk=e=>W_(e)??"never",ZG=48e3,Hee=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,hk=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Fm(),reveal:t.reveal,installed:rr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Xh=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:fo(t,e)},ge=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),r2=200,Uee=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',yk=e=>{let t=e.trim().slice(0,r2),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},Bee=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ge(t)}</div>`,Gee=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ge(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',Ak={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},me=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...Ak}),e.end(JSON.stringify(r))},ve=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},mt=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},Vee=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=Uee(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${ge(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=Qv(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Yl(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ge(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ge(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ge(Pk(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ge(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},QG=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},e2=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,r2)},Ld=e=>{let t=Sk.default.join(e.layout.installDir,"link-code.txt"),r=()=>$e(e.layout.installDir),o=()=>{let f=r();return{installBundleVersion:qh(f),installBundleUpdatedAt:f?.updatedAt??null,installVersion:f}},n=async f=>{let y=f.installVersion??r(),p=await i(),P=Pw(p),A=f.updateFlash??null,h=Aw(A),b=Bee(A,f.updateError??null);return yw({title:f.title,activePath:f.activePath,body:f.body,cloudAppOrigin:Ut(y),installBundleVersionLabel:qh(y),prependBody:`${h}${b}${P}`,headerUpdateButtonHtml:Sw(p)})},s=null,i=async()=>{let f=Date.now();if(s!==null&&f-s.cachedAtMs<6e4)return s.offer;let y=await Zv(e.layout);return s={cachedAtMs:f,offer:y},y},a=()=>{s=null},c=!1,d=async f=>{if(a(),!(await i()).updateAvailable){f.writeHead(303,{Location:"/?update=ok"}),f.end();return}if(c){f.writeHead(303,{Location:yk("An update is already running.")}),f.end();return}c=!0;try{let p=await rk(),P=p.ok?"/?update=ok":yk(p.message);f.writeHead(303,{Location:P}),f.end()}catch(p){let P=p instanceof Error&&p.message.trim().length>0?p.message:"Install bundle update failed.";f.writeHead(303,{Location:yk(P)}),f.end()}finally{c=!1,a()}},u=async(f,y)=>{let p=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",P=o(),A=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:P.installVersion,body:`<section class="card">
      <h1>${ge(y)}</h1>
      <p>${ge(p)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});f.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),f.end(A)},m=()=>{if(Ed.default.existsSync(t))return Ed.default.readFileSync(t,"utf8").trim();let f=Math.random().toString(36).slice(2,8).toUpperCase();return Ed.default.writeFileSync(t,f,"utf8"),f},S=t2.default.createServer((f,y)=>{(async()=>{let p=f.url?.split("?")[0]??"/",P=f.method??"GET";if(P==="OPTIONS"){y.writeHead(204,Ak),y.end();return}if(!await DC({method:P,pathname:p,request:f,response:y,requestUrl:f.url??"/",storePath:$B(Sk.default.dirname(e.layout.configPath)),readBody:mt,sendHtml:ve,renderShell:n})&&!await mv({method:P,pathname:p,request:f,response:y,layout:e.layout,readBody:mt,sendJson:me})&&!await Ih({method:P,pathname:p,request:f,response:y,layout:e.layout,readBody:mt,sendJson:me})){if(P==="GET"&&p==="/health"){let A=e.controllers.getStatus(),h=o();me(y,200,{ok:!0,...A,installBundleVersion:h.installBundleVersion,installBundleUpdatedAt:h.installBundleUpdatedAt,...XG({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(P==="GET"&&p==="/api/status"){let A=o();me(y,200,{...e.controllers.getStatus(),linkCode:m(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt});return}if(P==="GET"&&p==="/api/traffic"){me(y,200,{entries:Kl(e.layout)});return}if(P==="DELETE"&&p==="/api/traffic"||P==="POST"&&p==="/api/traffic/clear"){if(M_(e.layout),P==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}me(y,200,{ok:!0});return}if(P==="GET"&&p==="/api/trace"){me(y,200,{entries:Eg(e.layout)});return}if(P==="DELETE"&&p==="/api/trace"||P==="POST"&&p==="/api/trace/clear"){if(j_(e.layout),P==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}me(y,200,{ok:!0});return}if(P==="POST"&&p==="/api/errors/clear"){z_(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(P==="GET"&&p==="/api/knowledge"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(h.length>0){let b=await ti({layout:e.layout,query:h,limit:20});me(y,200,{chunks:b,query:h});return}me(y,200,{chunks:ei(e.layout).slice(-50).reverse()});return}if(P==="POST"&&p==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(P==="GET"&&p==="/api/update-status"){let A=await i();me(y,200,{ok:!0,...A});return}if((P==="GET"||P==="POST")&&p==="/api/update"){await d(y);return}if(P==="GET"&&p==="/"){let A=e.controllers.getStatus(),h=o(),b=rr(e.layout),w=Lg(e.layout.errorLogPath);ve(y,await n({title:"Home",activePath:"/",installVersion:h.installVersion,updateFlash:QG(f.url??void 0),updateError:e2(f.url??void 0),body:bw({wsConnected:A.wsConnected,lastHeartbeatAt:A.lastHeartbeatAt,installBundleVersion:h.installBundleVersion,harnessSetCount:b.sets.length,knowledgeChunkCount:ei(e.layout).length,trafficEntryCount:Kl(e.layout).length,wakeError:A.wakeError,errorLogByteSize:w.byteSize,errorLogExists:w.exists})}));return}if(P==="GET"&&p==="/task"){let A=e.controllers.getStatus(),h=o(),b=$(),w=new URL(f.url??"/",`http://127.0.0.1:${43347}`),C=w.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,v=w.searchParams.get("failed")==="1"?w.searchParams.get("error")?.trim()??"Task failed.":null,E=w.searchParams.get("runId");ve(y,await n({title:"Task",activePath:"/task",installVersion:h.installVersion,body:Cv({defaultWorkspace:b?.workspace??"",wsConnected:A.wsConnected,flashMessage:C,flashError:v,lastRunId:E})}));return}if(P==="POST"&&p==="/task/dispatch"){let A=await mt(f),h=new URLSearchParams(A),b=h.get("prompt")?.trim()??"",w=h.get("writerAgent")?.trim()??"claude-cli",C=h.get("projectFolder")?.trim()??"",v=await sk({prompt:b,writerAgent:w,...C.length>0?{projectFolderPath:C}:{}}),E=new URLSearchParams;v.ok?E.set("ok","1"):(E.set("failed","1"),v.errorMessage!==void 0&&E.set("error",v.errorMessage.slice(0,240))),v.agentRunId!==void 0&&E.set("runId",v.agentRunId),y.writeHead(303,{Location:`/task?${E.toString()}`}),y.end();return}if(P==="GET"&&p==="/writer-sessions"){let A=o(),h=Fh(e.layout,12);ve(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:A.installVersion,updateFlash:QG(f.url??void 0),updateError:e2(f.url??void 0),body:Wv({sessions:h})}));return}if(P==="GET"&&p==="/errors"){let A=o(),h=Lg(e.layout.errorLogPath);ve(y,await n({title:"Errors",activePath:"/errors",installVersion:A.installVersion,body:F_({errorLogPath:e.layout.errorLogPath,content:h.content,exists:h.exists,truncated:h.truncated,byteSize:h.byteSize,cleared:new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(P==="GET"&&p==="/status"){let A=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=e.controllers.getStatus(),b=Se(e.layout),w=b!==null?xe(b,12e4):G_(h.lastHeartbeatAt,12e4),C=V_({lastHeartbeatAt:h.lastHeartbeatAt,heartbeatIsStale:w}),v=o();ve(y,await n({title:"Status",activePath:"/status",installVersion:v.installVersion,body:`${Vee({status:h,healthBadge:C,revived:A.searchParams.get("revived")==="1",linkCode:m(),installBundleVersion:v.installBundleVersion,installBundleUpdatedAt:v.installBundleUpdatedAt})}${J_({installDir:e.layout.installDir})}${K_({entries:Eg(e.layout)})}`}));return}if(P==="GET"&&p==="/traffic"){let A=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=Kl(e.layout),b=o(),w=h.map(E=>`<tr><td title="${ge(E.at)}">${ge(Pk(E.at))}</td><td>${ge(E.direction)}</td><td><code>${ge(E.type)}</code></td><td>${ge(E.summary)}</td><td>${ge(E.action??"")}</td></tr>`).join(""),C=h.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${w}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',v=A.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";ve(y,await n({title:"Traffic",activePath:"/traffic",installVersion:b.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${v}
              ${C}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(P==="GET"&&p==="/projects"){let A=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=o(),b=Ut(h.installVersion),w=await Xh(e.layout),C=A.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":A.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,v=A.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,E=$(),x=E===null?null:Y({wsUrl:E.wsUrl,pairingToken:E.pairingToken}),I=x===null?{}:Object.fromEntries((await Promise.all(w.projects.map(async N=>{let U=await Jv(x,N.id);return[N.id,U?.counts??null]}))).filter(N=>N[1]!==null));ve(y,await n({title:"Projects",activePath:"/projects",installVersion:h.installVersion,body:Xv({projects:w.projects,compositionCountsByProjectId:I,cloudAppOrigin:b,syncMessage:w.message,syncOk:w.ok,flashMessage:v,flashError:C})}));return}if(P==="GET"&&p==="/projects/select-folder"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",b=$(),w=b===null?null:Y({wsUrl:b.wsUrl,pairingToken:b.pairingToken}),C=h.length>0&&w!==null?So():null;if(C===null||w===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(qe({projectFolderPath:C}),!await Wl(w,h,C)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(h)}&folderUpdated=1`}),y.end();return}if(P==="POST"&&p==="/projects/delete"){let A=await mt(f),h=new URLSearchParams(A).get("projectId")?.trim()??"",b=$(),w=b===null?null:Y({wsUrl:b.wsUrl,pairingToken:b.pairingToken});if(w===null||h.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let C=await Mb(w,h);y.writeHead(303,{Location:C.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(P==="GET"&&p==="/project"){let A=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=A.searchParams.get("id")?.trim()??"",b=o(),w=Ut(b.installVersion),C=await Xh(e.layout),v=vr(C.projects,h);if(v===null){await u(y,"Project not found");return}let E=A.searchParams.get("linked")==="1"?A.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${A.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${A.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:A.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,x=A.searchParams.get("knowledgePromoted"),I=x!==null?`Marked ${x} lesson(s) as promoted in Agent Witch.`:null,N=A.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,U=A.searchParams.get("tab")?.trim()??"harness",V=U==="workflows"||U==="agents"||U==="knowledge"?U:"harness",q=$(),Xe=q===null?null:Y({wsUrl:q.wsUrl,pairingToken:q.pairingToken}),F=Xe===null?null:await Jv(Xe,v.id),Ee=0;if(Xe!==null)try{let Qr=await fetch(`${Xe.appOrigin}/api/agent-witch/projects/${encodeURIComponent(v.id)}/knowledge`,{method:"GET",headers:{[Ue]:Xe.pairingToken},signal:AbortSignal.timeout(1e4)});if(Qr.ok){let fr=await Qr.json();typeof fr=="object"&&fr!==null&&typeof fr.candidateCount=="number"&&(Ee=fr.candidateCount)}}catch{Ee=0}ve(y,await n({title:v.name,activePath:"/projects",installVersion:b.installVersion,body:ho({project:v,cloudAppOrigin:w,installed:rr(e.layout),linkedSetSlugs:er(v.projectFolderPath),composition:F,knowledgeCandidateCount:Ee,activeTab:V,flashMessage:E??I,flashError:N})}));return}if(P==="POST"&&p==="/projects/pull-bound-harness"){let A=await mt(f),h=await vb({rawBody:A,layout:e.layout});if(h.kind==="not_found"){await u(y,"Project not found");return}if(h.kind==="redirect"){y.writeHead(303,{Location:h.location}),y.end();return}let b=o();ve(y,await n({title:h.title,activePath:"/projects",installVersion:b.installVersion,body:h.body}));return}if(P==="POST"&&p==="/projects/link-harness"){let A=await mt(f),h=new URLSearchParams(A),b=h.get("projectId")?.trim()??"",w=await Xh(e.layout),C=vr(w.projects,b);if(C===null){await u(y,"Project not found");return}let v=h.getAll("applySet").map(V=>String(V)),E=Pl({layout:e.layout,projectFolderPath:C.projectFolderPath,setSlugs:v});if(!E.ok){let V=o(),q=Ut(V.installVersion);ve(y,await n({title:C.name,activePath:"/projects",installVersion:V.installVersion,body:ho({project:C,cloudAppOrigin:q,installed:rr(e.layout),linkedSetSlugs:er(C.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:E.errorMessage})}));return}let x=$(),I=x===null?null:Y({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),N=I===null?!1:await yn(I,C.id,E.appliedSetSlugs),U=new URLSearchParams({linked:"1",files:String(E.writtenFileCount),bindingsSynced:N?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(C.id)}&${U.toString()}`}),y.end();return}if(P==="POST"&&p==="/projects/remove-harness-set"){let A=await mt(f),h=await kb({rawBody:A,layout:e.layout});if(h.kind==="not_found"){await u(y,"Project not found");return}if(h.kind==="redirect"){y.writeHead(303,{Location:h.location}),y.end();return}let b=o();ve(y,await n({title:h.title,activePath:"/projects",installVersion:b.installVersion,body:h.body}));return}if(P==="POST"&&p==="/project/knowledge/promote-all"){let A=await mt(f),b=new URLSearchParams(A).get("projectId")?.trim()??"",w=await Xh(e.layout),C=vr(w.projects,b);if(C===null){await u(y,"Project not found");return}let v=$(),E=v===null?null:Y({wsUrl:v.wsUrl,pairingToken:v.pairingToken}),x=E===null?{ok:!1,promotedCount:0}:await EG(E,C.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(C.id)}&${I.toString()}`}),y.end();return}if(P==="GET"&&p==="/harness"){let A=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=o(),b=wl(e.layout),w=A.searchParams.get("submitted")==="1",C=w?A.searchParams.get("syncFailed")==="1"?`Local harness updated (${A.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:A.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${A.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":A.searchParams.get("stopped")==="1"?`Reveal stopped. ${b?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:A.searchParams.get("revealed")==="1"?`Reveal found ${b?.sets.length??0} set(s).`:null,v=b?.scanRoots[0]??Fm(),E=Hee(e.layout,{reveal:b,importQuery:A.searchParams.get("import")==="1",justSubmitted:w}),x=Ut(h.installVersion);ve(y,await n({title:"Harness",activePath:"/harness",installVersion:h.installVersion,body:kd(hk(e.layout,{cloudAppOrigin:x,reveal:b,scanFolder:v,flashMessage:C,importSectionExpanded:E}))}));return}if(P==="POST"&&p==="/api/harness/pick-folder"){let A=So();if(A===null){me(y,200,{cancelled:!0});return}me(y,200,{path:A});return}if(P==="GET"&&p==="/api/harness/file-content"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",b=Sl(h);if(b===null){me(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let w=Ed.default.readFileSync(b,"utf8"),C=w.length>ZG?`${w.slice(0,ZG)}
\u2026 (truncated)`:w;me(y,200,{content:C})}catch{me(y,500,{errorMessage:"Could not read file."})}return}if(P==="POST"&&p==="/api/harness/reveal/add-project"){let A=await mt(f),h="";try{let C=JSON.parse(A);typeof C=="object"&&C!==null&&typeof C.projectPath=="string"&&(h=C.projectPath.trim())}catch{me(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(h.length===0){me(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let b=wl(e.layout),w=tb({reveal:b,projectPath:h});if(w===null||w.sets.length===0){me(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Gm(e.layout,w),me(y,200,{ok:!0,setCount:w.sets.length});return}if(P==="GET"&&p==="/api/harness/reveal/stream"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(h.length===0){me(y,400,{errorMessage:"Choose a folder to scan first."});return}let b=!1;f.on("close",()=>{b=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...Ak});let w=rb({scanRoot:h,response:y,shouldAbort:()=>b});Gm(e.layout,w),y.end();return}if(P==="POST"&&p==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(P==="POST"&&p==="/harness/submit"){let A=wl(e.layout);if(A===null){let x=o(),I=Ut(x.installVersion);ve(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:kd(hk(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let h=await mt(f),b=new URLSearchParams(h),w=Kv(b,A),C=nb({layout:e.layout,sets:w});if(!C.ok){let x=o(),I=Ut(x.installVersion);ve(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:kd(hk(e.layout,{cloudAppOrigin:I,reveal:A,flashError:C.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}ib(e.layout);let E=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${C.writtenItemCount??0}${E}`}),y.end();return}if(P==="GET"&&p==="/writer-api"){let A=new URL(f.url??"/",`http://127.0.0.1:${43347}`),b=$()?.writerExecutionBackend??Fe(void 0),w=Ie(e.layout.configPath),C=ao(w),v=A.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,E=o();ve(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:E.installVersion,body:Vv({writerExecutionBackend:b,secrets:C,flashMessage:v})}));return}if(P==="POST"&&p==="/writer-api"){let A=await mt(f),h=new URLSearchParams(A),b=h.get("writerExecutionBackend")?.trim()??"cli";pA({configPath:e.layout.configPath,writerExecutionBackend:Fe(b),anthropicApiKey:h.get("anthropicApiKey")??void 0,anthropicModel:h.get("anthropicModel")??void 0,openaiApiKey:h.get("openaiApiKey")??void 0,openaiModel:h.get("openaiModel")??void 0,googleApiKey:h.get("googleApiKey")??void 0,googleModel:h.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(P==="GET"&&p==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(P==="GET"&&p==="/history"){let A=o();ve(y,await n({title:"History",activePath:"/history",installVersion:A.installVersion,body:xv({reportsDir:e.layout.reportsDir})}));return}if(P==="GET"&&p==="/knowledge"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",b=o(),w=tw({layout:e.layout}),C=nw(w),v=h.length>0?await ti({layout:e.layout,query:h,limit:20}):ei(e.layout).slice(-50).reverse(),E=v.map(I=>{let N=ow(w,I.id),U=N>0?` \xB7 used in ${N} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ge(I.createdAt)}">${ge(Pk(I.createdAt))}${I.source?` \xB7 ${ge(I.source)}`:""}${U}</div><pre>${ge(I.text)}</pre></article>`}).join(""),x=C.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${C.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ge(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";ve(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:b.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ge(h)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${Gee(h,v.length)}
            </section>${x}${E}`}));return}P==="POST"&&await mt(f),await u(y,"Not found")}})().catch(p=>{console.error("[agent-witch-local-app]",p),y.writeHead(500),y.end("Internal error")})});return S.on("error",f=>{if(f.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",f)}),S.listen(43347,"127.0.0.1",()=>{try{Lh()}catch(f){let y=f instanceof Error?f.message:String(f);console.error(`[agent-witch] writeGlobalTriggers failed: ${y}`)}console.log(`[agent-witch] Local app ${Ar}`)}),S},Rd=e=>Jh(e).publicKeyRaw});var Yh=l(()=>{"use strict";sN();iN();o2()});var s2={};ft(s2,{runAgentWitchExternalLiveCli:()=>Kee});var bk,n2,qee,Kee,i2=l(()=>{"use strict";bk=g(require("node:fs")),n2=g(require("node:path"));an();B();re();Yh();re();qee=e=>{let t=n2.default.join(e,"link-code.txt");if(!bk.default.existsSync(t))return null;let r=bk.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},Kee=()=>{nt("agent-witch-live");let e=k(),t=O(),r=qee(e),o=Rd(t);Ld({layout:t,controllers:{getStatus:()=>{let n=Se(t);return{wsConnected:Ka(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{Ko(e)}}})}});var Vr=T((yUe,c2)=>{"use strict";var a2=["nodebuffer","arraybuffer","fragments"],l2=typeof Blob<"u";l2&&a2.push("blob");c2.exports={BINARY_TYPES:a2,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:l2,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var xd=T((SUe,Zh)=>{"use strict";var{EMPTY_BUFFER:Jee}=Vr(),_k=Buffer[Symbol.species];function Xee(e,t){if(e.length===0)return Jee;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new _k(r.buffer,r.byteOffset,o):r}function d2(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function u2(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function Yee(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function wk(e){if(wk.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new _k(e):ArrayBuffer.isView(e)?t=new _k(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),wk.readOnly=!1),t}Zh.exports={concat:Xee,mask:d2,toArrayBuffer:Yee,toBuffer:wk,unmask:u2};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Zh.exports.mask=function(t,r,o,n,s){s<48?d2(t,r,o,n,s):e.mask(t,r,o,n,s)},Zh.exports.unmask=function(t,r){t.length<32?u2(t,r):e.unmask(t,r)}}catch{}});var g2=T((PUe,m2)=>{"use strict";var p2=Symbol("kDone"),Tk=Symbol("kRun"),Ck=class{constructor(t){this[p2]=()=>{this.pending--,this[Tk]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Tk]()}[Tk](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[p2])}}};m2.exports=Ck});var Fi=T((AUe,S2)=>{"use strict";var Wd=require("zlib"),f2=xd(),Zee=g2(),{kStatusCode:h2}=Vr(),Qee=Buffer[Symbol.species],ete=Buffer.from([0,0,255,255]),ey=Symbol("permessage-deflate"),qr=Symbol("total-length"),zi=Symbol("callback"),Oo=Symbol("buffers"),$i=Symbol("error"),Qh,vk=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Qh){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Qh=new Zee(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[zi];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){Qh.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){Qh.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Wd.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Wd.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[ey]=this,this._inflate[qr]=0,this._inflate[Oo]=[],this._inflate.on("error",rte),this._inflate.on("data",y2)}this._inflate[zi]=o,this._inflate.write(t),r&&this._inflate.write(ete),this._inflate.flush(()=>{let s=this._inflate[$i];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=f2.concat(this._inflate[Oo],this._inflate[qr]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[qr]=0,this._inflate[Oo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Wd.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Wd.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[qr]=0,this._deflate[Oo]=[],this._deflate.on("data",tte)}this._deflate[zi]=o,this._deflate.write(t),this._deflate.flush(Wd.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=f2.concat(this._deflate[Oo],this._deflate[qr]);r&&(s=new Qee(s.buffer,s.byteOffset,s.length-4)),this._deflate[zi]=null,this._deflate[qr]=0,this._deflate[Oo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};S2.exports=vk;function tte(e){this[Oo].push(e),this[qr]+=e.length}function y2(e){if(this[qr]+=e.length,this[ey]._maxPayload<1||this[qr]<=this[ey]._maxPayload){this[Oo].push(e);return}this[$i]=new RangeError("Max payload size exceeded"),this[$i].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[$i][h2]=1009,this.removeListener("data",y2),this.reset()}function rte(e){if(this[ey]._inflate=null,this[$i]){this[zi](this[$i]);return}e[h2]=1007,this[zi](e)}});var Hi=T((bUe,ty)=>{"use strict";var{isUtf8:P2}=require("buffer"),{hasBlob:ote}=Vr(),nte=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function ste(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function kk(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function ite(e){return ote&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}ty.exports={isBlob:ite,isValidStatusCode:ste,isValidUTF8:kk,tokenChars:nte};if(P2)ty.exports.isValidUTF8=function(e){return e.length<24?kk(e):P2(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");ty.exports.isValidUTF8=function(t){return t.length<32?kk(t):e(t)}}catch{}});var Wk=T((_Ue,v2)=>{"use strict";var{Writable:ate}=require("stream"),A2=Fi(),{BINARY_TYPES:lte,EMPTY_BUFFER:b2,kStatusCode:cte,kWebSocket:dte}=Vr(),{concat:Ek,toArrayBuffer:ute,unmask:pte}=xd(),{isValidStatusCode:mte,isValidUTF8:_2}=Hi(),ry=Buffer[Symbol.species],wt=0,w2=1,T2=2,C2=3,Lk=4,Rk=5,oy=6,xk=class extends ate{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||lte[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[dte]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=wt}_write(t,r,o){if(this._opcode===8&&this._state==wt)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new ry(o.buffer,o.byteOffset+t,o.length-t),new ry(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new ry(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case wt:this.getInfo(t);break;case w2:this.getPayloadLength16(t);break;case T2:this.getPayloadLength64(t);break;case C2:this.getMask();break;case Lk:this.getData(t);break;case Rk:case oy:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[A2.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=w2:this._payloadLength===127?this._state=T2:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=C2:this._state=Lk}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=Lk}getData(t){let r=b2;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&pte(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=Rk,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[A2.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===wt&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=wt;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=Ek(o,r):this._binaryType==="arraybuffer"?n=ute(Ek(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=wt):(this._state=oy,setImmediate(()=>{this.emit("message",n,!0),this._state=wt,this.startLoop(t)}))}else{let n=Ek(o,r);if(!this._skipUTF8Validation&&!_2(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===Rk||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=wt):(this._state=oy,setImmediate(()=>{this.emit("message",n,!1),this._state=wt,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,b2),this.end();else{let o=t.readUInt16BE(0);if(!mte(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new ry(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!_2(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=wt;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=wt):(this._state=oy,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=wt,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[cte]=n,i}};v2.exports=xk});var Mk=T((TUe,L2)=>{"use strict";var{Duplex:wUe}=require("stream"),{randomFillSync:gte}=require("crypto"),{types:{isUint8Array:fte}}=require("util"),k2=Fi(),{EMPTY_BUFFER:hte,kWebSocket:yte,NOOP:Ste}=Vr(),{isBlob:Ui,isValidStatusCode:Pte}=Hi(),{mask:E2,toBuffer:Qn}=xd(),Tt=Symbol("kByteLength"),Ate=Buffer.alloc(4),ny=8*1024,es,Bi=ny,Bt=0,bte=1,_te=2,Ik=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Bt,this.onerror=Ste,this[yte]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||Ate,r.generateMask?r.generateMask(o):(Bi===ny&&(es===void 0&&(es=Buffer.alloc(ny)),gte(es,0,ny),Bi=0),o[0]=es[Bi++],o[1]=es[Bi++],o[2]=es[Bi++],o[3]=es[Bi++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[Tt]!==void 0?a=r[Tt]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(E2(t,o,d,s,a),[d]):(E2(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=hte;else{if(typeof t!="number"||!Pte(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(fte(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[Tt]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Bt?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Ui(t)?(n=t.size,s=!1):(t=Qn(t),n=t.length,s=Qn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Tt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Ui(t)?this._state!==Bt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Bt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Ui(t)?(n=t.size,s=!1):(t=Qn(t),n=t.length,s=Qn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Tt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Ui(t)?this._state!==Bt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Bt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[k2.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Ui(t)?(a=t.size,c=!1):(t=Qn(t),a=t.length,c=Qn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[Tt]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Ui(t)?this._state!==Bt?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Bt?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[Tt],this._state=_te,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(Ok,this,a,n);return}this._bufferedBytes-=o[Tt];let i=Qn(s);r?this.dispatch(i,r,o,n):(this._state=Bt,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(wte,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[k2.extensionName];this._bufferedBytes+=o[Tt],this._state=bte,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");Ok(this,c,n);return}this._bufferedBytes-=o[Tt],this._state=Bt,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Bt&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][Tt],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][Tt],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};L2.exports=Ik;function Ok(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function wte(e,t,r){Ok(e,t,r),e.onerror(t)}});var j2=T((CUe,D2)=>{"use strict";var{kForOnEventAttribute:Id,kListener:Nk}=Vr(),R2=Symbol("kCode"),x2=Symbol("kData"),W2=Symbol("kError"),I2=Symbol("kMessage"),O2=Symbol("kReason"),Gi=Symbol("kTarget"),M2=Symbol("kType"),N2=Symbol("kWasClean"),Kr=class{constructor(t){this[Gi]=null,this[M2]=t}get target(){return this[Gi]}get type(){return this[M2]}};Object.defineProperty(Kr.prototype,"target",{enumerable:!0});Object.defineProperty(Kr.prototype,"type",{enumerable:!0});var ts=class extends Kr{constructor(t,r={}){super(t),this[R2]=r.code===void 0?0:r.code,this[O2]=r.reason===void 0?"":r.reason,this[N2]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[R2]}get reason(){return this[O2]}get wasClean(){return this[N2]}};Object.defineProperty(ts.prototype,"code",{enumerable:!0});Object.defineProperty(ts.prototype,"reason",{enumerable:!0});Object.defineProperty(ts.prototype,"wasClean",{enumerable:!0});var Vi=class extends Kr{constructor(t,r={}){super(t),this[W2]=r.error===void 0?null:r.error,this[I2]=r.message===void 0?"":r.message}get error(){return this[W2]}get message(){return this[I2]}};Object.defineProperty(Vi.prototype,"error",{enumerable:!0});Object.defineProperty(Vi.prototype,"message",{enumerable:!0});var Od=class extends Kr{constructor(t,r={}){super(t),this[x2]=r.data===void 0?null:r.data}get data(){return this[x2]}};Object.defineProperty(Od.prototype,"data",{enumerable:!0});var Tte={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[Id]&&n[Nk]===t&&!n[Id])return;let o;if(e==="message")o=function(s,i){let a=new Od("message",{data:i?s:s.toString()});a[Gi]=this,sy(t,this,a)};else if(e==="close")o=function(s,i){let a=new ts("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Gi]=this,sy(t,this,a)};else if(e==="error")o=function(s){let i=new Vi("error",{error:s,message:s.message});i[Gi]=this,sy(t,this,i)};else if(e==="open")o=function(){let s=new Kr("open");s[Gi]=this,sy(t,this,s)};else return;o[Id]=!!r[Id],o[Nk]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[Nk]===t&&!r[Id]){this.removeListener(e,r);break}}};D2.exports={CloseEvent:ts,ErrorEvent:Vi,Event:Kr,EventTarget:Tte,MessageEvent:Od};function sy(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var iy=T((vUe,z2)=>{"use strict";var{tokenChars:Md}=Hi();function mr(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function Cte(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,u=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(u===-1&&Md[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let f=e.slice(c,u);d===44?(mr(t,f,r),r=Object.create(null)):i=f,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(u===-1&&Md[d]===1)c===-1&&(c=m);else if(d===32||d===9)u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m),mr(r,e.slice(c,u),!0),d===44&&(mr(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)a=e.slice(c,m),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(Md[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(Md[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,u=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(u===-1&&Md[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))u===-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let f=e.slice(c,u);o&&(f=f.replace(/\\/g,""),o=!1),mr(r,a,f),d===44&&(mr(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=m);let S=e.slice(c,u);return i===void 0?mr(t,S,r):(a===void 0?mr(r,S,!0):o?mr(r,a,S.replace(/\\/g,"")):mr(r,a,S),mr(t,i,r)),t}function vte(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}z2.exports={format:vte,parse:Cte}});var dy=T((LUe,Y2)=>{"use strict";var kte=require("events"),Ete=require("https"),Lte=require("http"),H2=require("net"),Rte=require("tls"),{randomBytes:xte,createHash:Wte}=require("crypto"),{Duplex:kUe,Readable:EUe}=require("stream"),{URL:Dk}=require("url"),Mo=Fi(),Ite=Wk(),Ote=Mk(),{isBlob:Mte}=Hi(),{BINARY_TYPES:$2,CLOSE_TIMEOUT:Nte,EMPTY_BUFFER:ay,GUID:Dte,kForOnEventAttribute:jk,kListener:jte,kStatusCode:zte,kWebSocket:ke,NOOP:U2}=Vr(),{EventTarget:{addEventListener:$te,removeEventListener:Fte}}=j2(),{format:Hte,parse:Ute}=iy(),{toBuffer:Bte}=xd(),B2=Symbol("kAborted"),zk=[8,13],Jr=["CONNECTING","OPEN","CLOSING","CLOSED"],Gte=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,ee=class e extends kte{constructor(t,r,o){super(),this._binaryType=$2[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=ay,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),G2(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){$2.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new Ite({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new Ote(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[ke]=this,s[ke]=this,t[ke]=this,n.on("conclude",Kte),n.on("drain",Jte),n.on("error",Xte),n.on("message",Yte),n.on("ping",Zte),n.on("pong",Qte),s.onerror=ere,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",K2),t.on("data",cy),t.on("end",J2),t.on("error",X2),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Mo.extensionName]&&this._extensions[Mo.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){gt(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,q2(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){$k(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||ay,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){$k(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||ay,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){$k(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Mo.extensionName]||(n.compress=!1),this._sender.send(t||ay,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){gt(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(ee,"CONNECTING",{enumerable:!0,value:Jr.indexOf("CONNECTING")});Object.defineProperty(ee.prototype,"CONNECTING",{enumerable:!0,value:Jr.indexOf("CONNECTING")});Object.defineProperty(ee,"OPEN",{enumerable:!0,value:Jr.indexOf("OPEN")});Object.defineProperty(ee.prototype,"OPEN",{enumerable:!0,value:Jr.indexOf("OPEN")});Object.defineProperty(ee,"CLOSING",{enumerable:!0,value:Jr.indexOf("CLOSING")});Object.defineProperty(ee.prototype,"CLOSING",{enumerable:!0,value:Jr.indexOf("CLOSING")});Object.defineProperty(ee,"CLOSED",{enumerable:!0,value:Jr.indexOf("CLOSED")});Object.defineProperty(ee.prototype,"CLOSED",{enumerable:!0,value:Jr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(ee.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(ee.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[jk])return t[jte];return null},set(t){for(let r of this.listeners(e))if(r[jk]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[jk]:!0})}})});ee.prototype.addEventListener=$te;ee.prototype.removeEventListener=Fte;Y2.exports=ee;function G2(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:Nte,protocolVersion:zk[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!zk.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${zk.join(", ")})`);let s;if(t instanceof Dk)s=t;else try{s=new Dk(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let p=new SyntaxError(c);if(e._redirects===0)throw p;ly(e,p);return}let d=i?443:80,u=xte(16).toString("base64"),m=i?Ete.request:Lte.request,S=new Set,f;if(n.createConnection=n.createConnection||(i?qte:Vte),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(f=new Mo({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=Hte({[Mo.extensionName]:f.offer()})),r.length){for(let p of r){if(typeof p!="string"||!Gte.test(p)||S.has(p))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(p)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let p=n.path.split(":");n.socketPath=p[0],n.path=p[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let p=o&&o.headers;if(o={...o,headers:{}},p)for(let[P,A]of Object.entries(p))o.headers[P.toLowerCase()]=A}else if(e.listenerCount("redirect")===0){let p=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!p||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,p||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=m(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=m(n);n.timeout&&y.on("timeout",()=>{gt(e,y,"Opening handshake has timed out")}),y.on("error",p=>{y===null||y[B2]||(y=e._req=null,ly(e,p))}),y.on("response",p=>{let P=p.headers.location,A=p.statusCode;if(P&&n.followRedirects&&A>=300&&A<400){if(++e._redirects>n.maxRedirects){gt(e,y,"Maximum redirects exceeded");return}y.abort();let h;try{h=new Dk(P,t)}catch{let w=new SyntaxError(`Invalid URL: ${P}`);ly(e,w);return}G2(e,h,r,o)}else e.emit("unexpected-response",y,p)||gt(e,y,`Unexpected server response: ${p.statusCode}`)}),y.on("upgrade",(p,P,A)=>{if(e.emit("upgrade",p),e.readyState!==ee.CONNECTING)return;y=e._req=null;let h=p.headers.upgrade;if(h===void 0||h.toLowerCase()!=="websocket"){gt(e,P,"Invalid Upgrade header");return}let b=Wte("sha1").update(u+Dte).digest("base64");if(p.headers["sec-websocket-accept"]!==b){gt(e,P,"Invalid Sec-WebSocket-Accept header");return}let w=p.headers["sec-websocket-protocol"],C;if(w!==void 0?S.size?S.has(w)||(C="Server sent an invalid subprotocol"):C="Server sent a subprotocol but none was requested":S.size&&(C="Server sent no subprotocol"),C){gt(e,P,C);return}w&&(e._protocol=w);let v=p.headers["sec-websocket-extensions"];if(v!==void 0){if(!f){gt(e,P,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let E;try{E=Ute(v)}catch{gt(e,P,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(E);if(x.length!==1||x[0]!==Mo.extensionName){gt(e,P,"Server indicated an extension that was not requested");return}try{f.accept(E[Mo.extensionName])}catch{gt(e,P,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Mo.extensionName]=f}e.setSocket(P,A,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function ly(e,t){e._readyState=ee.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function Vte(e){return e.path=e.socketPath,H2.connect(e)}function qte(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=H2.isIP(e.host)?"":e.host),Rte.connect(e)}function gt(e,t,r){e._readyState=ee.CLOSING;let o=new Error(r);Error.captureStackTrace(o,gt),t.setHeader?(t[B2]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(ly,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function $k(e,t,r){if(t){let o=Mte(t)?t.size:Bte(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Jr[e.readyState]})`);process.nextTick(r,o)}}function Kte(e,t){let r=this[ke];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[ke]!==void 0&&(r._socket.removeListener("data",cy),process.nextTick(V2,r._socket),e===1005?r.close():r.close(e,t))}function Jte(){let e=this[ke];e.isPaused||e._socket.resume()}function Xte(e){let t=this[ke];t._socket[ke]!==void 0&&(t._socket.removeListener("data",cy),process.nextTick(V2,t._socket),t.close(e[zte])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function F2(){this[ke].emitClose()}function Yte(e,t){this[ke].emit("message",e,t)}function Zte(e){let t=this[ke];t._autoPong&&t.pong(e,!this._isServer,U2),t.emit("ping",e)}function Qte(e){this[ke].emit("pong",e)}function V2(e){e.resume()}function ere(e){let t=this[ke];t.readyState!==ee.CLOSED&&(t.readyState===ee.OPEN&&(t._readyState=ee.CLOSING,q2(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function q2(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function K2(){let e=this[ke];if(this.removeListener("close",K2),this.removeListener("data",cy),this.removeListener("end",J2),e._readyState=ee.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[ke]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",F2),e._receiver.on("finish",F2))}function cy(e){this[ke]._receiver.write(e)||this.pause()}function J2(){let e=this[ke];e._readyState=ee.CLOSING,e._receiver.end(),this.end()}function X2(){let e=this[ke];this.removeListener("error",X2),this.on("error",U2),e&&(e._readyState=ee.CLOSING,this.destroy())}});var t5=T((xUe,e5)=>{"use strict";var RUe=dy(),{Duplex:tre}=require("stream");function Z2(e){e.emit("close")}function rre(){!this.destroyed&&this._writableState.finished&&this.destroy()}function Q2(e){this.removeListener("error",Q2),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function ore(e,t){let r=!0,o=new tre({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(Z2,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(Z2,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",rre),o.on("error",Q2),o}e5.exports=ore});var Fk=T((WUe,r5)=>{"use strict";var{tokenChars:nre}=Hi();function sre(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&nre[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}r5.exports={parse:sre}});var c5=T((OUe,l5)=>{"use strict";var ire=require("events"),uy=require("http"),{Duplex:IUe}=require("stream"),{createHash:are}=require("crypto"),o5=iy(),rs=Fi(),lre=Fk(),cre=dy(),{CLOSE_TIMEOUT:dre,GUID:ure,kWebSocket:pre}=Vr(),mre=/^[+/0-9A-Za-z]{22}==$/,n5=0,s5=1,a5=2,Hk=class extends ire{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:dre,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:cre,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=uy.createServer((o,n)=>{let s=uy.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=gre(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=n5}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===a5){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Nd,this);return}if(t&&this.once("close",t),this._state!==s5)if(this._state=s5,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Nd,this):process.nextTick(Nd,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Nd(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",i5);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){os(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){os(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!mre.test(s)){os(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){os(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Dd(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=lre.parse(c)}catch{os(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&u!==void 0){let S=new rs({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let f=o5.parse(u);f[rs.extensionName]&&(S.accept(f[rs.extensionName]),m[rs.extensionName]=S)}catch{os(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(f,y,p,P)=>{if(!f)return Dd(r,y||401,p,P);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return Dd(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[pre])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>n5)return Dd(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${are("sha1").update(r+ure).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),u._protocol=m)}if(t[rs.extensionName]){let m=t[rs.extensionName].params,S=o5.format({[rs.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${S}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",i5),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Nd,this)})),a(u,n)}};l5.exports=Hk;function gre(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Nd(e){e._state=a5,e.emit("close")}function i5(){this.destroy()}function Dd(e,t,r,o){r=r||uy.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${uy.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function os(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,os),e.emit("wsClientError",i,r,t)}else Dd(r,o,n,s)}});var fre,hre,yre,Sre,Pre,Are,d5,bre,jd,u5=l(()=>{fre=g(t5(),1),hre=g(iy(),1),yre=g(Fi(),1),Sre=g(Wk(),1),Pre=g(Mk(),1),Are=g(Fk(),1),d5=g(dy(),1),bre=g(c5(),1),jd=d5.default});var Uk,p5=l(()=>{"use strict";Uk=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var _re,Bk,m5=l(()=>{"use strict";zp();p5();_re=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",Bk=(e={})=>{let t=e.env??process.env,r=Uk(t[Dp]),o=Uk(t[jp]);return{mode:_re(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var g5=l(()=>{"use strict";zp()});var f5=l(()=>{"use strict";m5();g5()});var Gk=l(()=>{"use strict"});var Xr,zd=l(()=>{"use strict";Xr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var qi,ns,h5,Tre,Vk,qk,y5,S5,Kk,P5,$d,Jk=l(()=>{"use strict";qi=g(require("node:fs")),ns=g(require("node:os")),h5=g(require("node:path"));Gk();zd();Tre=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Vk=(e=ns.default.hostname())=>h5.default.join(ns.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),qk=e=>{if(!qi.default.existsSync(e))return null;try{let t=JSON.parse(qi.default.readFileSync(e,"utf8"));return!Tre(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},y5=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},S5=(e,t)=>{qi.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Kk=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Vk(),o=qk(r);if(o!==null&&o.pid!==process.pid&&Xr(o.pid)&&y5(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:ns.default.hostname(),macOsUsername:ns.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return S5(r,n),{ok:!0}},P5=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Vk(),o=qk(r);return o!==null&&o.pid!==process.pid&&Xr(o.pid)&&y5(o)?{ok:!1}:(S5(r,{hostname:ns.default.hostname(),macOsUsername:ns.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},$d=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??Vk();qk(r)?.pid===process.pid&&qi.default.existsSync(r)&&qi.default.unlinkSync(r)}});var Xk,Fd,Cre,vre,kre,Ere,Yk,A5=l(()=>{"use strict";Xk=require("node:child_process"),Fd=g(require("node:path"));zd();Rp();Cre=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),vre=(e,t)=>{if(Cre(e)||!/\bnode\b/.test(e))return!1;let r=Fd.default.resolve(t),o=Fd.default.join(r,"app",Ta),n=Fd.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Ta||i==="agent-witch.ts")return e.includes(r);try{let a=Fd.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},kre=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,Xk.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},Ere=(e,t,r)=>{let o=kre(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||vre(d,t)&&n.push(c)}return n},Yk=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,Xk.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=Ere(r,e.installDir,t),n=[];for(let s of o)if(Xr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var Hd,Ud,b5,Lre,Zk,_5=l(()=>{"use strict";Hd=g(require("node:fs")),Ud=g(require("node:path"));ze();b5=(e,t)=>{!Hd.default.existsSync(e)||Hd.default.existsSync(t)||(Hd.default.mkdirSync(Ud.default.dirname(t),{recursive:!0}),Hd.default.renameSync(e,t))},Lre=e=>{if(e.profileEmail===null)return;let t=Ud.default.join(e.installDir,vt);b5(Ud.default.join(t,zo),e.mainLogPath),b5(Ud.default.join(t,$o),e.errorLogPath)},Zk=e=>{let t=O();e!==void 0&&t.installDir!==e||Lre(t)}});var w5=l(()=>{"use strict";Gl();vg();vg();!st()&&Zo(__agentWitchImportMetaUrl)&&(async()=>{nt("agent-witch-wake-server");let e=await bn(),t=Pr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var T5=l(()=>{"use strict";w5()});var C5=l(()=>{"use strict";Ol()});var Qk,v5=l(()=>{"use strict";Gk();T5();Jk();C5();Qk=async(e={})=>{let t=e.skipInProcessBridge?null:await Cg();ag();let r=setInterval(()=>{ag()},6e4),o=setInterval(()=>{if(!P5().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Bd,py,Wre,k5,E5,my,L5,R5,eE,x5,gy,W5=l(()=>{"use strict";Bd=g(require("node:fs")),py=g(require("node:path")),Wre="pending-run-inputs.json",k5=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),E5=e=>{let t=e.profileEmail?py.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return py.default.join(t,Wre)},my=e=>{let t=E5(e);if(!Bd.default.existsSync(t))return{};try{let r=JSON.parse(Bd.default.readFileSync(t,"utf8"));return k5(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!k5(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},L5=(e,t)=>{let r=E5(e);Bd.default.mkdirSync(py.default.dirname(r),{recursive:!0}),Bd.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},R5=e=>Object.values(my(e)),eE=(e,t)=>my(e)[t]!==void 0,x5=(e,t)=>{let r=my(e);r[t.agentRunId]=t,L5(e,r)},gy=(e,t)=>{let r=my(e);delete r[t],L5(e,r)}});var fy=l(()=>{"use strict";le()});var I5=l(()=>{"use strict";le()});var hy=l(()=>{"use strict";le()});var yy=l(()=>{"use strict";le()});var Gd=l(()=>{"use strict";le()});var Ire,Ore,Vd,tE=l(()=>{"use strict";Lt();fy();I5();hy();yy();Gd();Ire={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},Ore={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Vd=e=>{if(!he(e.writerAgent))return"the selected writer";let t=at(e.writerAgent);if(Fe(e.writerExecutionBackend)==="api"&&t!==null){let r=Ye(Ie(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Za(t,r.model);return`${Ore[t]} model ${o}`}}return Ire[e.writerAgent]}});var Mre,Nre,O5,M5,N5=l(()=>{"use strict";Mre=/"input_tokens"\s*:\s*(\d+)/,Nre=/"output_tokens"\s*:\s*(\d+)/,O5=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},M5=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=O5(Mre.exec(t)),o=O5(Nre.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var Sy=l(()=>{"use strict";Wt()});var qd,Py,Dre,rE,D5,j5,z5,oE,$5=l(()=>{"use strict";qd=g(require("node:fs")),Py=g(require("node:path"));Sy();Dre="run-completion-outbox.json",rE=e=>{let t=e.profileEmail?Py.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Py.default.join(t,Dre)},D5=e=>{let t=rE(e);if(!qd.default.existsSync(t))return[];try{let r=JSON.parse(qd.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},j5=(e,t)=>{qd.default.mkdirSync(Py.default.dirname(rE(e)),{recursive:!0}),qd.default.writeFileSync(rE(e),JSON.stringify(t,null,2),"utf8")},z5=(e,t)=>{let r=[...D5(e).filter(o=>o.runId!==t.runId),t];j5(e,r)},oE=async e=>{if(e.cloudApi===null)return;let t=D5(e.layout);if(t.length===0)return;let r=[];for(let o of t)await El(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);j5(e.layout,r)}});var F5=l(()=>{"use strict"});var nE,Kd,zre,ss,H5=l(()=>{"use strict";F5();nE=new Map,Kd=e=>{let t=nE.get(e);t!==void 0&&(clearInterval(t),nE.delete(e))},zre=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},ss=(e,t,r,o={})=>{Kd(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Kd(t);return}let i=o.onTick?.()??{};zre(e,t,n,i)};s(),nE.set(t,setInterval(s,15e3))}});var U5=l(()=>{"use strict";Wt()});var B5,G5=l(()=>{"use strict";U5();B5=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:He(t)}});var sE,Jd,Yr,iE,gr,V5,Ay=l(()=>{"use strict";sE=new Set,Jd=new Map,Yr=(e,t)=>{if(t.length===0)return;let r=Jd.get(e)??[];r.push(t),Jd.set(e,r)},iE=e=>{sE.add(e);let t=Jd.get(e)??[];return Jd.delete(e),t},gr=e=>sE.has(e),V5=e=>{sE.delete(e),Jd.delete(e)}});var Ki,q5,K5,J5=l(()=>{"use strict";Ki=g(require("node:path")),q5=require("node:url");Yo();K5=()=>{if(st()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Ki.default.dirname(Ki.default.resolve(e)):Ki.default.dirname(Ki.default.resolve(__filename))}return Ki.default.dirname((0,q5.fileURLToPath)(__agentWitchImportMetaUrl))}});var X5,Y5,Z5,Q5,ot,Ji,eV,tV,Xi,aE,lE,cE,rV,dE,oV,by=l(()=>{"use strict";X5=require("node:crypto"),Y5=g(require("node:fs")),Z5=g(require("node:path")),Q5=require("node:url");zd();Yo();J5();ot=new Map,eV=async()=>{if(Ji!==void 0)return Ji;try{if(st()){let e=K5(),t=Z5.default.join(e,"deps","node-pty","lib","index.js");if(Y5.default.existsSync(t)){let r=await import((0,Q5.pathToFileURL)(t).href);return Ji=r,r}}return Ji=await import("node-pty"),Ji}catch{return Ji=null,null}},tV=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Xi=(e,t,r)=>{let o=ot.get(e);if(o!==void 0){ot.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},aE=(e,t)=>{let r=ot.get(e);return r===void 0?!1:(r.pty.write(t),!0)},lE=(e,t,r)=>{let o=ot.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},cE=e=>{for(let t of ot.values())if(!(t.mode!=="agent"||t.runId!==e))return Xr(t.pty.pid);return!1},rV=e=>{for(let[t,r]of ot.entries())if(!(r.mode!=="agent"||r.runId!==e)){ot.delete(t);try{r.pty.kill()}catch{}return!0}return!1},dE=async e=>{let t=await eV();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;ot.get(e.shellSessionId)!==void 0&&Xi(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return ot.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{tV(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{ot.get(e.shellSessionId)?.pty===n&&(ot.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},oV=async e=>{let t=e.shellSessionId??(0,X5.randomUUID)(),r=await eV();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return ot.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{tV(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{ot.get(t)?.pty===o&&(ot.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var _y,nV,sV=l(()=>{"use strict";_y="[[AWAITING_INPUT]]",nV=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",_y,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Xd,iV,wy=l(()=>{"use strict";sV();Xd=e=>{let t=e.indexOf(_y);if(t<0)return null;let o=e.slice(t+_y.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},iV=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",nV].join(`
`)});var aV,lV=l(()=>{"use strict";Ay();by();wy();aV=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(gr(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Yr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await oV({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Xd(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var dV,uV,pV,cV,Zr,Ty=l(()=>{"use strict";dV=require("node:child_process"),uV=g(require("node:fs")),pV=g(require("node:path"));Rp();cV=12e4,Zr=(e,t)=>{let r=pV.default.join(e,"app",Rx,"ensure-writer.sh");return uV.default.existsSync(r)?new Promise((o,n)=>{let s=(0,dV.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},a=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(cV/1e3)}s`))},cV);s.on("error",c=>{clearTimeout(a),n(c)}),s.on("close",c=>{if(clearTimeout(a),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var mV,is,Zd,Cy,uE,Yd,vy,ky,pE,mE,$re,Yi,Fre,Hre,gE,fE=l(()=>{"use strict";mV=require("node:child_process");Lt();Ty();hy();fy();Gd();yy();is=new Map,Zd=e=>e==="cursor"||e==="antigravity",Cy=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",uE=e=>is.get(e)?.warmed===!0,Yd=e=>{let t=is.get(e);is.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},vy=e=>is.get(e)?.conversationStarted===!0,ky=e=>{let t=is.get(e);is.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},pE=e=>{is.delete(e)},mE=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",$re={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Yi=e=>`${$re[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,Fre=(e,t,r,o)=>new Promise(n=>{let s=em(t,r),i=[],a=(0,mV.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),Hre=(e,t)=>{let r=Yi(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},gE=async e=>{if(!he(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Fe(e.runConfig.writerExecutionBackend)==="api"){let r=at(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Ie(e.runConfig.layout.configPath);return Ye(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Yd(e.writerAgent),{exitCode:0,output:Yi(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Zr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}Zd(e.writerAgent)&&Yd(e.writerAgent);let t=await Fre(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?Hre(e.writerAgent,t.output):Yi(e.writerAgent)}}});var as,hE=l(()=>{"use strict";as={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var gV,Ure,Bre,fV,Gre,yE,hV=l(()=>{"use strict";hE();gV=/you(?:'|')ve hit your session limit/i,Ure=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],Bre=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,fV=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},Gre=e=>{let t=Bre.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},yE=e=>{let t=e.trim();if(t.length===0)return null;if(gV.test(t))return{code:as.SESSION_LIMIT,resetHint:Gre(t),matchedLine:fV(t,gV)};for(let r of Ure)if(r.test(t))return{code:as.PROVIDER_QUOTA,resetHint:null,matchedLine:fV(t,r)};return null}});var Ey,Ly,SE,PE=l(()=>{"use strict";Ey="[[AGENT_RUN_WRITER_EXECUTION]]",Ly="cli-writer-api-key-missing",SE="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var AE=l(()=>{"use strict";PE()});var yV=l(()=>{"use strict";AE()});var Ry=l(()=>{"use strict";hE();hV();PE();AE();yV()});var xy,SV=l(()=>{"use strict";xy={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var PV,AV=l(()=>{"use strict";PV="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var bV,_V=l(()=>{"use strict";Ry();AV();bV=e=>e.code===as.SESSION_LIMIT?PV:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var wV,TV=l(()=>{"use strict";Ry();SV();_V();wV=e=>{let t=yE(e.output);return t!==null?{status:xy.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:bV(t)}:{status:e.exitCode===0?xy.COMPLETED:xy.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var bE,FGe,CV=l(()=>{"use strict";bE={OPEN:"open",APPROVAL:"approval"},FGe=bE.APPROVAL});var Zi,Wy,vV,Kre,kV,EV,LV,Qd,_E,wE=l(()=>{"use strict";Zi=g(require("node:fs")),Wy=g(require("node:path")),vV="runs",Kre=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kV=e=>{let t=e.profileEmail!==null?Wy.default.join(e.installDir,"profiles",e.profileEmail,vV):Wy.default.join(e.installDir,vV);return Zi.default.mkdirSync(t,{recursive:!0}),t},EV=(e,t)=>Wy.default.join(kV(e),`${t}.json`),LV=(e,t)=>{Zi.default.writeFileSync(EV(e,t.id),JSON.stringify(t,null,2))},Qd=(e,t)=>{let r=EV(e,t);if(!Zi.default.existsSync(r))return null;try{let o=JSON.parse(Zi.default.readFileSync(r,"utf8"));return!Kre(o)||typeof o.id!="string"?null:o}catch{return null}},_E=e=>{let t=kV(e),r=Zi.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=Qd(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var Jre,RV,xV=l(()=>{"use strict";TV();CV();wE();Jre=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=wV({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:bE.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},RV=(e,t)=>{let r=Jre(t);return LV(e,r),r}});var WV=l(()=>{"use strict";Gh()});var IV,OV=l(()=>{"use strict";Ry();IV=()=>[Ey,`agentRunWriterExecutionBackend=${Ly}`,`agentRunWriterExecutionReasonCode=${SE}`].join(`
`)});var No,Iy=l(()=>{"use strict";No=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var TE,Xre,Yre,MV,NV=l(()=>{"use strict";TE=e=>e.toLocaleString("en-US"),Xre=e=>e<.01?e.toFixed(4):e.toFixed(3),Yre=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${Xre(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${TE(e.inputTokens)} in / ${TE(e.outputTokens)} out (${TE(e.totalTokens)} total)`,t].join(`
`)},MV=(e,t)=>{if(t===void 0)return e;let r=Yre(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var DV=l(()=>{"use strict";le()});var zV,eu,Pe,CE,Oy,jV,Zre,Qre,$V,FV,HV,tu,vE,kE,EE,UV,eoe,Ct,ru,Do,BV,toe,roe,My,LE,RE,xE,GV=l(()=>{"use strict";zV=require("node:child_process");le();Lt();W5();bd();tE();N5();Ya();$5();Sy();H5();zd();G5();Ay();by();wy();lV();fE();xV();WV();OV();Iy();NV();ws();DV();Gd();La();wy();eu=new Map,Pe=new Map,CE=new Set,Oy=new Map,jV=e=>{e!==void 0&&!Oy.has(e)&&Oy.set(e,Date.now())},Zre=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(gr(t)){Ct(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}Yr(t,n)},Qre=(e,t,r,o,n)=>{if(!gA(e,n))return;let s=`${IV()}
`;Zre(t,r,o,s);let i=Pe.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},$V=130,FV=`

Stopped by user.`,HV=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:No(e)},tu=null,vE=e=>{tu=e},kE=(e,t)=>{if(tu===null)return;let r=Ev(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||mb(tu,t,r)},EE=async e=>{await oE({layout:e,cloudApi:tu})},UV=e=>{let t=eu.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Xr(t.pid)},eoe=e=>ye({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),Ct=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},ru=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Ss(s),c=Pe.get(r);if(a!==null&&c!==void 0){let d=$x(a),u=UV(r)||cE(r);d!==null&&!u&&Do(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return zx(a)}}),Do=(e,t,r,o,n,s,i,a)=>{let c=xs(s,a),d=n,u=MV(c.output,c.llmUsage);if(r!==void 0){let S=Oy.get(r);Oy.delete(r),S!==void 0&&vv({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let f=M5(c.llmUsage,u);f!==null&&YB({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:f})}r!==void 0&&CE.has(r)&&(CE.delete(r),d=$V,u=u.trim().length>0&&!u.includes("Stopped by user.")?`${u.trim()}${FV}`:"Stopped by user.");let m=r!==void 0?Ev(e.layout.reportsDir,r):null;if(r!==void 0){Kd(r),sl(e.layout,r),gr(r)&&(Ct(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),V5(r));let S=Pe.get(r);KB({reportsDir:e.layout.reportsDir,agentRunId:r,input:No(i),output:u,...S!==void 0?{writerLabel:Vd({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&Uh({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:u,agentRunId:r}),RV(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:u,layout:e.layout}),z5(e.layout,{runId:r,exitCode:d,output:u,createdAt:new Date().toISOString(),...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{}}),oE({layout:e.layout,cloudApi:tu}),Pe.delete(r),eu.delete(r),gy(e.layout,r)}Ct(t,{type:"command.claude.result",payload:{exitCode:d,output:u,...r!==void 0?{agentRunId:r}:{},...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),$a(e.layout)},BV=(e,t,r,o,n,s,i)=>{let a=Pe.get(r),c=a?.accumulatedOutput??s;x5(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),ss(t,r,()=>eE(e.layout,r),ru(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),Ct(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},toe=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,u=f=>{if(!(n===void 0||f.length===0)){if(gr(n)){Ct(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:f},requestId:o});return}Yr(n,f)}};if(n!==void 0){let f=Pe.get(n);eu.set(n,t),Pe.set(n,{originalPrompt:s,userTranscriptPrompt:f?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:f?.projectFolderPath,reportKey:f?.reportKey,accumulatedOutput:f?.accumulatedOutput??""}),Ct(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),ss(r,n,()=>UV(n),ru(e,r,n,o,f?.projectFolderPath,f?.reportKey))}let m=a==="claude-cli",S=[];t.stdout?.on("data",f=>{let y=f.toString("utf8");if(m?S.push(y):(c.push(y),u(y)),d||n===void 0)return;let p=Xd(c.join(""));if(p!==null){d=!0,t.kill("SIGTERM");let P=Pe.get(n),A=[P?.accumulatedOutput??"",p.partialOutput].filter(h=>h.length>0).join(`

`);P!==void 0&&(P.accumulatedOutput=A),eu.delete(n),BV(e,r,n,o,p.question,A,s)}}),t.stderr?.on("data",f=>{let y=f.toString("utf8");c.push(y),u(y)}),t.on("close",f=>{if(d)return;ky(a);let y=n!==void 0?Pe.get(n):void 0,p=m?xs(S.join("")):{output:c.join("").trim(),llmUsage:void 0},P=m?c.join("").trim():"",A=[p.output.trim(),P].filter(b=>b.length>0).join(`
`);m&&p.output.trim().length>0&&u(p.output);let h=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${A}`.trim():A;Do(e,r,n,o,f??-1,h,s,p.llmUsage)}),t.on("error",f=>{d||Do(e,r,n,o,-1,f.message,s)})},roe=(e,t,r,o,n,s,i,a,c)=>{let d=HV(r,c);s!==void 0&&(Pe.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),Ct(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),ss(n,s,()=>Pe.has(s),ru(e,n,s,o,i,a))),tl(e,t,r,m=>{if(!(s===void 0||m.length===0)){if(gr(s)){Ct(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:m},requestId:o});return}Yr(s,m)}}).then(m=>{ky(t),Do(e,n,s,o,m.exitCode,m.output,r,m.llmUsage)}).catch(m=>{let S=m instanceof Error?m.message:String(m);Do(e,n,s,o,-1,S,r)})},My=(e,t,r,o,n,s,i,a,c,d,u,m)=>{let S=HV(r,u);if(za(e.layout),dn(e,t)){jV(s),roe(e,t,r,o,n,s,c,d,S);return}let f=Zt(t,r,eoe(e),i);if(f===null){Do(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}jV(s);let y=B5({workspace:e.workspace,projectFolderPath:c}),p=()=>{let P=(0,zV.spawn)(f.command,[...f.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:m??process.env});toe(e,P,n,o,s,r,S,t)};if(s===void 0){p();return}Pe.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:Pe.get(s)?.accumulatedOutput??""}),Qre(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Ea({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),ss(n,s,()=>Pe.has(s),ru(e,n,s,o,c,d)),aV({socket:n,sendMessage:Ct,requestId:o,agentRunId:s,shellSessionId:a,command:f.command,args:f.args,cwd:y,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:P=>{a!==void 0&&Xi(a,b=>{Ct(n,b)},o);let A=Pe.get(s),h=[A?.accumulatedOutput??"",P.partialOutput].filter(b=>b.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=h),BV(e,n,s,o,P.question,h,r)},onFinished:(P,A)=>{ky(t);let h=xs(A),b=Pe.get(s),w=b!==void 0&&b.accumulatedOutput.length>0?`${b.accumulatedOutput}

${h.output}`.trim():h.output;Do(e,n,s,o,P,w,r,h.llmUsage)}}).then(P=>{if(!P){p();return}ss(n,s,()=>cE(s),ru(e,n,s,o,c,d))}).catch(P=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",P instanceof Error?P.message:P),p()})},LE=(e,t,r,o)=>{gy(e.layout,t.agentRunId),t.shellSessionId!==void 0&&Ct(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=iV(t),s=Pe.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;My(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},RE=(e,t)=>{for(let r of R5(e.layout))Pe.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:No(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),ss(t,r.agentRunId,()=>eE(e.layout,r.agentRunId),{awaitingInput:!0}),Ct(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},xE=(e,t,r,o)=>{let n=Pe.get(r);if(n===void 0)return!1;CE.add(r),Kd(r);let s=eu.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(rV(r))return!0;gy(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${FV}`:"Stopped by user.";return Do(e,t,r,o,$V,i,n.originalPrompt),!0}});var ooe,WE,VV=l(()=>{"use strict";dl();ooe=()=>`http://127.0.0.1:${Rt()}/restart`,WE=async()=>{try{let e=await fetch(ooe(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var qV=l(()=>{"use strict";Xl()});var KV=l(()=>{"use strict";ok()});var JV,XV=l(()=>{"use strict";JV=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var ou,noe,IE,YV=l(()=>{"use strict";B();re();qV();s_();KV();XV();ws();ou=(e,t)=>{Po(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},noe=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(RP(),LP)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},IE=async e=>{let t=$e(e.layout.installDir)?.bundleVersion??null;if(!JV({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(Et(e.layout)){Fa({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),ou(e.layout,{summary:r,action:"install-bundle-update-start"}),Sr({launchAgentLabel:fe(e.layout.installDir),installDir:e.layout.installDir});let o=await ji({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),ou(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await noe();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),ou(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),ou(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),ou(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var soe,OE,ZV=l(()=>{"use strict";soe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),OE=e=>{if(!soe(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var ME,NE,QV=l(()=>{"use strict";Fb();Hb();ME=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Ml({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},NE=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await kr(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var eq,ioe,aoe,loe,nu,tq=l(()=>{"use strict";eq=g(require("node:os"));ze();ioe="Default",aoe=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),loe=e=>{let t=eq.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},nu=()=>{let e=O(),t=fa(e),r=aoe(ioe);return`${loe(t)}/${r.length>0?r:"project"}`}});var rq=l(()=>{"use strict";Xl()});var oq,DE,nq=l(()=>{"use strict";rq();oq=!1,DE=e=>{oq||(oq=!0,process.on("uncaughtException",t=>{wn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;wn(e,{kind:"crash",message:r,stack:o})}))}});var sq,coe,jE,iq=l(()=>{"use strict";sq=require("node:child_process");Ty();Lt();hy();fy();Gd();yy();coe=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,sq.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},jE=async e=>{if(!he(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Fe(e.runConfig.writerExecutionBackend)==="api"){let r=at(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Ie(e.layout.configPath),n=Ye(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Zr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await coe(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var zE,aq=l(()=>{"use strict";zE=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var lq,$E,cq=l(()=>{"use strict";lq=require("node:crypto"),$E=()=>(0,lq.randomUUID)()});var Qi,dq,Ny=l(()=>{"use strict";Qi="[[WORKING_ESTIMATE]]",dq=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Qi,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var uq,pq=l(()=>{"use strict";uq=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var doe,mq,gq=l(()=>{"use strict";Ny();doe=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,mq=e=>{if(!e.includes(Qi))return null;let t=null;for(let r of e.matchAll(doe)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var uoe,FE,fq=l(()=>{"use strict";gq();uoe=/^(\d{1,6})\b/,FE=e=>{let t=mq(e);if(t!==null)return t;let r=uoe.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var poe,moe,goe,Dy,HE=l(()=>{"use strict";Lt();ql();poe="http://127.0.0.1:11434",moe=45e3,goe=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Dy=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||poe,o=t===void 0?(await Ot({commands:ye({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(moe)});return n.ok?goe(await n.json()):null}catch{return null}}});var UE,BE,GE,hq=l(()=>{"use strict";La();Ny();Iy();pq();fq();bd();HE();UE=async e=>{let t=No(e.wrappedPrompt),r=JB(e.reportsDir);return{estimateOutput:await Dy(dq(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},BE=e=>{let t=FE(e.estimateOutput);t!==null&&Nh({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},GE=e=>{let t=FE(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=uq(t);return ka({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Jt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),Nh({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var jy,yq,VE=l(()=>{"use strict";jy="[[WORKING_TOKEN_ESTIMATE]]",yq=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",jy,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var Sq,foe,Pq,Aq=l(()=>{"use strict";VE();Sq=/^(\d{1,8})\b/,foe=e=>{let t=e.indexOf(jy);if(t<0)return null;let r=e.slice(t+jy.length).trim(),o=Sq.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},Pq=e=>{let t=foe(e);if(t!==null)return t;let r=Sq.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var qE,KE,bq=l(()=>{"use strict";VE();Iy();Aq();bd();HE();qE=async e=>{let t=No(e.wrappedPrompt),r=ZB(e.reportsDir);return{estimateOutput:await Dy(yq(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},KE=e=>{let t=Pq(e.estimateOutput);return t===null?null:(XB({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var _q=l(()=>{"use strict";Jk();A5();_5();v5();dl();GV();Ty();Lt();wE();Ay();VV();Kb();YV();ws();ZV();QV();Sy();tq();nq();iq();xp();aq();cq();Ny();La();hq();bq();tE();ql();by();fE()});var wq={};ft(wq,{buildContinuationPromptWithContext:()=>Soe});var hoe,yoe,Soe,Tq=l(()=>{"use strict";hoe=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,yoe=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Soe=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=yoe(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${hoe(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var Cq={};ft(Cq,{readHarnessExportSets:()=>Aoe});var su,JE,zy,Poe,Aoe,vq=l(()=>{"use strict";su=g(require("node:fs")),JE=g(require("node:path"));ze();zy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Poe=e=>{if(!su.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(su.default.readFileSync(e.harnessManifestPath,"utf8"));if(zy(t))return t}catch{return null}return null},Aoe=(e,t)=>{let r=O(t),o=Poe(r);if(o===null)return[];let n=zy(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!zy(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let u of c){if(!zy(u))continue;let m=typeof u.path=="string"?u.path:void 0,S=typeof u.id=="string"?u.id:"",f=typeof u.kind=="string"?u.kind:"",y=typeof u.title=="string"?u.title:"";if(m===void 0||S.length===0||f.length===0||y.length===0)continue;let p=m.startsWith("shared/")?JE.default.join(r.harnessRootDir,m):JE.default.join(r.harnessSetsDir,i,m);su.default.existsSync(p)&&d.push({id:S,kind:f,title:y,content:su.default.readFileSync(p,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var rL,YE,ea,kq,boe,Eq,Lq,XE,Rq,ZE,QE,eL,te,J,tL,_oe,iu,woe,Toe,Coe,voe,koe,Eoe,Loe,Roe,au,xq=l(()=>{"use strict";rL=require("node:child_process"),YE=g(require("node:fs")),ea=g(require("node:os"));u5();B();re();an();fk();f5();le();Yt();Xl();mw();Yh();Gh();Wt();go();f_();ht();_q();kq=3e4,boe=3e4,Eq=new Map,Lq=new Map,XE=new Map,Rq=new Map,ZE=new Map,QE=new Map,eL=new Map,te=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),J=(e,t,r)=>{e.readyState===jd.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Po(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),kg(r,"out",t)))},tL=e=>e,_oe=e=>{if(!YE.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(YE.default.readFileSync(e.harnessManifestPath,"utf8"));if(te(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},iu=(e,t)=>{let r=_oe(t);r!==null&&J(e,{type:"harness.manifest.report",payload:{hostname:ea.default.hostname(),manifest:r}})},woe=async(e,t,r,o,n,s,i=!1,a,c,d,u,m)=>{let S=m?.trim()??"";if(!he(t)){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Vd({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await Ot({commands:ye({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),p=s!==void 0?UE({wrappedPrompt:r,writerLabel:f,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,P=s!==void 0?qE({wrappedPrompt:r,writerLabel:f,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=Zd(t)&&!uE(t);if(A){try{await Zr(e.layout.installDir,t)}catch(F){let Ee=F instanceof Error?F.message:String(F);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Ee}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Yd(t)}else if(!Zd(t))try{await Zr(e.layout.installDir,t)}catch(F){let Ee=F instanceof Error?F.message:String(F);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${Ee}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=ol(d,nu,m);if(h===null){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}qe({projectFolderPath:h,...S.length>0?{projectId:S}:{}}),i||vd(e.layout,t,h);let b=Bh({sessionContinuation:i,supportsWriterSessionContinuation:Cy(t),isWriterConversationStarted:vy(t)}),w=i&&b==="first"?Cd(e.layout,t,h):null,C=w!==null?Di(e.layout,w):null,v=C!==null&&C.turns.length>0,E=Uv({sessionContinuation:i,supportsWriterSessionContinuation:Cy(t),isWriterConversationStarted:vy(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:v,userPromptCharacterCount:r.length}),x=r;if(E.continuationStrategy==="source_run_seed"){let F=typeof c=="string"&&c.length>0?Qd(e.layout,c):null;if(F!==null){let{buildContinuationPromptWithContext:Ee}=await Promise.resolve().then(()=>(Tq(),wq));x=Ee({priorPrompt:F.prompt,priorOutput:F.resultOutput??"",userMessage:r})}}else E.continuationStrategy==="transcript_seed"&&C!==null&&C.turns.length>0&&(x=zh({priorTurns:C.turns,userMessage:r}));let I=E.ragLimit>0?await ti({layout:e.layout,query:x,limit:E.ragLimit,minScore:E.ragMinScore,projectFolderPath:h,...S.length>0?{projectId:S}:{}}):[],N=E.ragLimit>0&&h.trim().length>0?await uw({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:h,...S.length>0?{projectId:S}:{}}):[],U=E.injectMemory?Iv(e.layout,h,S.length>0?S:void 0):[],V=`${Mv(U,E.memoryEntryLimit)}${lw(I)}${pw(N)}${x}`,q=u?.trim()??(s!==void 0&&h.trim().length>0?$E():void 0);if(s!==void 0&&q!==void 0&&q.length>0&&h.trim().length>0){Ea({reportKey:q,agentRunId:s,userSummary:"Working on your Mac\u2026"});let F=V;p!==null&&p.then(Ee=>{if(Ee===null)return;let Qr=GE({estimateOutput:Ee.estimateOutput??"",reportKey:q,agentRunId:s,reportsDir:e.layout.reportsDir,task:Ee.task,writerLabel:Ee.writerLabel,embedding:Ee.embedding});if(Qr.estimateSeconds===null)return;kE(e.layout.reportsDir,s);let fr=`${Qi}
${Qr.estimateSeconds}
`;if(gr(s)){J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:fr},requestId:o});return}Yr(s,fr)}).catch(()=>{}),V=zE(F),V=rP(V,{agentRunId:s,reportKey:q,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&p!==null&&p.then(F=>{F!==null&&BE({estimateOutput:F.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:F.task,writerLabel:F.writerLabel,embedding:F.embedding})}).catch(()=>{}),s!==void 0&&P!==null&&P.then(F=>{F!==null&&KE({estimateOutput:F.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:F.task,writerLabel:F.writerLabel})}).catch(()=>{});let Xe=s!==void 0&&eL.get(s)===!0;if(s!==void 0&&h.trim().length>0){let F=await sg(h);QE.set(s,F),q!==void 0&&q.length>0&&ZE.set(s,q)}My(e,t,V,o,tL(n),s,{sessionTurn:E.sessionTurn},a,h,q,r,cA(e.layout,s,Xe)),A&&s!==void 0&&J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:mE(t)},requestId:o})},Toe=async(e,t,r,o,n)=>{let s=(i,a)=>{J(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await gE({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ye({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,J(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=he(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Yi(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},Coe=(e,t,r)=>new Promise(o=>{if(!he(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Zt(t,r,ye({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,rL.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),voe=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;J(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=tr(t.bundle),s=te(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=Re(e.wsUrl)??it,m=await KA({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=gn({bundle:i,layout:e.layout});return J(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&iu(o,e.layout),!0},koe=async(e,t,r,o)=>{if(await voe(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(J(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!he(n)){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}za(e.layout);let i=await(async()=>{try{await Zr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return Coe(e,n,s)})().finally(()=>{$a(e.layout)});J(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),iu(o,e.layout)},Eoe=e=>{let t=1e3*2**e;return Math.min(boe,t)},Loe=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=p=>{if(!t.restartInFlight){if(Et(e.layout)){Ha(p),console.log(`[agent-witch] Deferring local restart (${p}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${p})\u2026`),t.wakeError=`restart:${p}`,WE().then(P=>{if(P.ok){console.log("[agent-witch] Local restart completed.");return}if(!P.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",P.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(p,P="system.ack")=>{if(!t.selfUpdateInFlight){if(Et(e.layout)){Fa({layout:e.layout,remoteBundleVersion:p,trigger:P}),console.log(`[agent-witch] Deferring install bundle update (${p} via ${P}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,IE({layout:e.layout,remoteBundleVersion:p,trigger:P}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let p=Se(e.layout);p!==null&&xe(p,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),f())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let p=t.socket;t.socket=void 0,t.wsConnected=!1,p.removeAllListeners("open"),p.removeAllListeners("message"),p.removeAllListeners("close"),p.on("error",()=>{}),(p.readyState===jd.OPEN||p.readyState===jd.CONNECTING)&&p.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,kq)},u=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let p=Eoe(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${p}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,f()},p)},m=p=>{s();let P=()=>{let A=Ia(e.layout.installDir),h=Rt();J(p,{type:"agent.heartbeat",payload:{hostname:ea.default.hostname(),macOsUsername:ea.default.userInfo().username,wakeError:t.wakeError,wakePort:h,...e.email!==null?{email:e.email}:{},installBundleVersion:A}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};P(),t.heartbeatTimer=setInterval(P,kq)},S=(p,P)=>{if(typeof p.type!="string")return;if(g_(p)){t.stopped=!0,s(),a(),c(),u_({layout:e.layout}).finally(()=>{$d(),process.exit(0)});return}Po(e.layout,{direction:"in",type:p.type,summary:"inbound WS frame"}),kg(e.layout,"in",p);let A=typeof p.requestId=="string"?p.requestId:void 0;if(p.type==="device.auth.attestation"&&te(p.payload)){let h=typeof p.payload.serverPublicKey=="string"?p.payload.serverPublicKey:"",b=typeof p.payload.origin=="string"?p.payload.origin:"",w=typeof p.payload.devicePublicKey=="string"?p.payload.devicePublicKey:"",C=typeof p.payload.challenge=="string"?p.payload.challenge:"",v=typeof p.payload.serverAttestation=="string"?p.payload.serverAttestation:"";if(!gk({serverPublicKey:h,origin:b,devicePublicKey:w,challenge:C,serverAttestation:v})){t.wakeError="Server attestation verification failed",Po(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(p.type==="writer.ensure"&&te(p.payload)){let h=typeof p.payload.writerAgent=="string"?p.payload.writerAgent:"";Po(e.layout,{direction:"local",type:"writer.ensure",summary:h,action:"ensure-writer"}),jE({layout:e.layout,writerAgent:h,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(b=>{J(P,{type:"writer.status",payload:b},e.layout)})}if(p.type==="install.bundle.update"&&te(p.payload)){let h=typeof p.payload.bundleVersion=="string"?p.payload.bundleVersion.trim():"";h.length>0&&o(h,"install.bundle.update")}if(p.type==="system.ack"){Xp(e.layout,{wsUrl:e.wsUrl});let h=te(p.payload)?p.payload:null,b=OE(h);b!==null&&o(b)}if(p.type==="device.restart"&&r("cloud-device-restart"),p.type==="automations.sync"&&te(p.payload)&&ME(p.payload),p.type==="automations.run"&&te(p.payload)&&NE(p.payload),p.type==="terminal.stream.accepted"&&te(p.payload)){let h=typeof p.payload.runId=="string"?p.payload.runId:"";if(h.length>0){let b=iE(h);for(let w of b)J(P,{type:"terminal.stream.chunk",payload:{runId:h,chunk:w},requestId:A})}}if(p.type==="agent.agentRun.list"&&J(P,{type:"dashboard.agentRun.list.result",payload:{runs:_E(e.layout)},requestId:A}),p.type==="agent.agentRun.get"&&te(p.payload)){let h=typeof p.payload.runId=="string"?p.payload.runId:"",b=h.length>0?Qd(e.layout,h):null;J(P,{type:"dashboard.agentRun.get.result",payload:{run:b},requestId:A})}if(p.type==="command.claude.run"&&te(p.payload)){let h=p.payload.prompt,b=typeof p.payload.writerAgent=="string"&&he(p.payload.writerAgent)?p.payload.writerAgent:"claude-cli",w=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,C=p.payload.sessionContinuation===!0,v=typeof p.payload.sourceRunId=="string"?p.payload.sourceRunId:void 0,E=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:void 0,x=typeof p.payload.projectId=="string"?p.payload.projectId:void 0,I=ol(typeof p.payload.projectFolderPath=="string"?p.payload.projectFolderPath:void 0,nu,x),N=rA(p.payload.compositionSnapshot),U=typeof p.payload.reportKey=="string"?p.payload.reportKey:void 0;if(typeof h=="string"&&h.trim().length>0){if(console.log(`[agent-witch] Running ${b} task (${C?"continue":"first"})\u2026`),I===null){J(P,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...w!==void 0?{agentRunId:w}:{}},requestId:A});return}if(N!==null){let V=nA(e.layout,N);if(V!==null){J(P,{type:"command.claude.result",payload:{exitCode:-1,output:V,...w!==void 0?{agentRunId:w}:{}},requestId:A});return}if(w!==void 0){let q=iA(e.layout,w,N);if(!q.ok){J(P,{type:"command.claude.result",payload:{exitCode:-1,output:q.errorMessage,...w!==void 0?{agentRunId:w}:{}},requestId:A});return}eL.set(w,N.entries.some(Xe=>Xe.scope==="run"))}}w!==void 0&&E!==void 0&&Eq.set(w,E),w!==void 0&&(Lq.set(w,I),x!==void 0&&x.trim().length>0&&XE.set(w,x.trim()),Rq.set(w,h.trim()),qe({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),woe(e,b,h.trim(),A,P,w,C,E,v,I,U,x)}}if(p.type==="shell.session.open"&&te(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",b=typeof p.payload.cols=="number"?p.payload.cols:120,w=typeof p.payload.rows=="number"?p.payload.rows:32;h.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),dE({shellSessionId:h,cwd:e.workspace,cols:b,rows:w,send:C=>{J(P,C)},requestId:A}))}if(p.type==="shell.session.close"&&te(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"";h.length>0&&Xi(h,b=>{J(P,b)},A)}if(p.type==="shell.input"&&te(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",b=typeof p.payload.data=="string"?p.payload.data:"";h.length>0&&b.length>0&&aE(h,b)}if(p.type==="shell.resize"&&te(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",b=typeof p.payload.cols=="number"?p.payload.cols:0,w=typeof p.payload.rows=="number"?p.payload.rows:0;h.length>0&&b>0&&w>0&&lE(h,b,w)}if(p.type==="command.writer.session.end"&&te(p.payload)){let h=p.payload.writerAgent;typeof h=="string"&&he(h)&&(pE(h),Hh(e.layout,h))}if(p.type==="command.writer.session.start"&&te(p.payload)){let h=p.payload.writerAgent,b=typeof p.payload.writerSessionId=="string"?p.payload.writerSessionId:"";typeof h=="string"&&he(h)&&b.length>0&&(console.log(`[agent-witch] Starting ${h} session\u2026`),Toe(e,h,b,A,P))}if(p.type==="command.claude.stop"&&te(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"";h.length>0&&(console.log(`[agent-witch] Stopping run ${h}\u2026`),xE(e,tL(P),h,A))}if(p.type==="command.claude.input_respond"&&te(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"",b=typeof p.payload.response=="string"?p.payload.response.trim():"",w=typeof p.payload.originalPrompt=="string"?p.payload.originalPrompt:"",C=typeof p.payload.partialOutput=="string"?p.payload.partialOutput:"",v=typeof p.payload.question=="string"?p.payload.question:"";h.length>0&&b.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),LE(e,{agentRunId:h,originalPrompt:w,partialOutput:C,question:v,response:b,shellSessionId:Eq.get(h)},A,tL(P)))}if(p.type==="dispatch.approval.required"&&te(p.payload)){let h=typeof p.payload.requesterEmail=="string"?p.payload.requesterEmail:"A teammate",b=typeof p.payload.prompt=="string"?p.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${h}: ${b}`),process.platform==="darwin"&&(0,rL.spawn)("osascript",["-e",`display notification "${b.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${h.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(p.type==="harness.request"&&te(p.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),koe(e,p.payload,A,P)),p.type==="harness.export.request"&&te(p.payload)){let h=typeof p.payload.borrowerUserId=="string"?p.payload.borrowerUserId:"",b=typeof p.payload.targetDeviceId=="string"?p.payload.targetDeviceId:void 0,w=Array.isArray(p.payload.setSlugs)?p.payload.setSlugs.filter(C=>typeof C=="string"):[];h.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:C}=await Promise.resolve().then(()=>(vq(),Cq)),v=C(w,e.email);J(P,{type:"harness.export.result",payload:{success:v.length>0,borrowerUserId:h,...b!==void 0?{targetDeviceId:b}:{},sets:v,errorMessage:v.length>0?void 0:"No readable harness sets were found on this machine."},requestId:A})})()}if(p.type==="harness.manifest.request"&&iu(P,e.layout),p.type==="command.claude.result"&&te(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,b=typeof p.payload.output=="string"?p.payload.output:"",w=typeof p.payload.exitCode=="number"?p.payload.exitCode:null,C=ol(h!==void 0?Lq.get(h):void 0,nu),v=h!==void 0?XE.get(h):void 0,E=h!==void 0?Rq.get(h)??"":"",x=Eb({exitCode:w,output:b});if(x&&C!==null&&aw({layout:e.layout,text:b,source:h??"command.claude.result",projectFolderPath:C,...v!==void 0?{projectId:v}:{}}),w!=null&&w!==0&&b.trim().length>0&&C!==null&&(rw({layout:e.layout,errorText:b,projectFolderPath:C,...v!==void 0?{projectId:v}:{}}),dw({layout:e.layout,text:b,source:h??"command.claude.result.failure",projectFolderPath:C,...v!==void 0?{projectId:v}:{}})),x&&E.trim().length>0&&C!==null&&Ov({layout:e.layout,projectFolderPath:C,...v!==void 0?{projectId:v}:{},entry:{id:`${Date.now()}-${h??"run"}`,...h!==void 0?{agentRunId:h}:{},prompt:E,output:b,createdAt:new Date().toISOString()}}),h!==void 0&&C!==null){let N=ZE.get(h),U=QE.get(h);N!==void 0&&U!==void 0&&sg(C).then(V=>{let q=Wb({before:U,after:V});oP(N,q),QE.delete(h),ZE.delete(h)})}if(x&&v!==void 0&&v.trim().length>0){let N=$(),U=N===null?null:Y({wsUrl:N.wsUrl,pairingToken:N.pairingToken});U!==null&&Ob(U,v,{...h!==void 0?{sourceRunId:h}:{},lesson:Ib({prompt:E,output:b})})}h!==void 0&&(sl(e.layout,h),eL.delete(h),XE.delete(h))}},f=()=>{if(t.stopped)return;a(),c();let p=new jd(e.wsUrl);t.socket=p,p.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),vE(Y({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),EE(e.layout);let P=Re(e.wsUrl)??"http://localhost:3000",A=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),h=mk({layout:e.layout,origin:P,...A!==void 0&&A.length>0?{claimToken:A}:{}});J(p,{type:"agent.register",payload:{role:"agent",hostname:ea.default.hostname(),macOsUsername:ea.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...h}},e.layout),iu(p,e.layout),RE(e,p),m(p)}),p.on("message",P=>{let A=typeof P=="string"?P:P.toString("utf8");try{let h=JSON.parse(A);if(!te(h))return;S(h,p)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),p.on("close",(P,A)=>{s(),t.socket=void 0,t.wsConnected=!1,WP(e.layout),t.reconnectAttempt+=1;let h=typeof A=="string"?A:A.toString("utf8");wn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:P,reason:h}),console.log("[agent-witch] Disconnected from server."),u()}),p.on("error",P=>{t.wakeError=P.message,wn(e.layout,{kind:"ws_error",message:P.message,stack:P.stack}),console.error(`[agent-witch] Socket error: ${P.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return wP(()=>{let p=TP();p!==null&&p.layout.installDir===e.layout.installDir&&p.layout.profileEmail===e.layout.profileEmail&&o(p.remoteBundleVersion,p.trigger);let P=CP();P!==null&&r(P)}),{connect:f,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Ka(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Rd(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,f()},reportHarnessManifestIfConnected:()=>{let p=t.socket;return!t.wsConnected||p===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(iu(p,e.layout),{ok:!0})}}},Roe=async()=>{nt("agent-witch");let e=Bk(),t=k();Kk().ok||(process.platform==="darwin"?(await Ko(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),Zk(t);let o=Yk({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(Sr({launchAgentLabel:fe(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Aa());let n=await yA(),s=n[0];s!==void 0&&DE(s.layout);for(let f of n){let y=Re(f.wsUrl)??it;Oa(f.layout.installDir,y)}let i=n.map(f=>Loe(f)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),$d(),process.exit(0));let c=()=>{n.forEach((f,y)=>{let p=i[y];if(p===void 0)return;let P=Se(f.layout);IP(P,{socketOpen:p.hasMacSocketOpen(),staleAfterMs:12e4})&&p.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let f=n[0]?.layout;f!==void 0&&(Et(f)||zl(f.installDir))},m=await Qk({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):Ld({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let f of i)f.startLocalHealthCheck(),f.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=Pr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),ba(),d()});d=()=>{S(),m.stop(),$d(),console.log("[agent-witch] Shutting down.");for(let f of i)f.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},au=Roe});var oL=l(()=>{"use strict";xq()});var Wq={};ft(Wq,{startAgentWitchClient:()=>au});var Iq=l(()=>{"use strict";oL();oL();Yo();nP();Ip();if(!st()&&Zo(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Wp(process.argv.slice(e))),au()}});eP();nP();Yo();Ip();var Ux="20.x",Bx="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var I3=e=>[`Node.js ${Ux} or newer is required (found ${e}).`,Bx].join(" "),Gx=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${I3(process.version)}
`),process.exit(1))};var xoe=async()=>{nt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(RP(),LP)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},Woe=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(oM(),rM)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},Ioe=async()=>{if(!Zo(st()?void 0:__agentWitchImportMetaUrl))return;Gx();let e=process.argv.indexOf("report");e>=0&&process.exit(Wp(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await xoe();return}if(t==="wake"){await Woe();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(nN(),oN));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(i2(),s2));o();return}if(t==="mcp"){let{resolveAgentWitchLocalLayout:o}=await Promise.resolve().then(()=>(B(),JR)),{runAwlMcpStdio:n}=await Promise.resolve().then(()=>(Tv(),zB));await n({layout:o()});return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(Iq(),Wq));await r()};Ioe();
