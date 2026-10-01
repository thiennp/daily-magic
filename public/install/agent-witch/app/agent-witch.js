#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var ZB=Object.create;var Yf=Object.defineProperty;var QB=Object.getOwnPropertyDescriptor;var eG=Object.getOwnPropertyNames;var tG=Object.getPrototypeOf,rG=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var v=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},It=(e,t)=>{for(var r in t)Yf(e,r,{get:t[r],enumerable:!0})},oG=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of eG(t))!rG.call(e,n)&&n!==r&&Yf(e,n,{get:()=>t[n],enumerable:!(o=QB(t,n))||o.enumerable});return e};var g=(e,t,r)=>(r=e!=null?ZB(tG(e)):{},oG(t||!e||!e.__esModule?Yf(r,"default",{value:e,enumerable:!0}):r,e));var Ci,AL,bL,So,Zf,cZ,PL,id,Ot,rr,ad,ld,zn,Dn,or,Qf,cd,dd,ud,Li,mt,jn,$n,pd,Hr,eh,wL,Ue=l(()=>{"use strict";Ci={production:".agent-witch",localhost:".local-agent-witch"},AL={production:47892,localhost:47893},bL={production:"com.agent-witch",localhost:"com.local-agent-witch"},So={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Zf="app",cZ=`${Zf}/agent-witch.js`,PL=`${Zf}/command`,id={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Ot=Ci.production,rr=Ci.localhost,ad=AL.production,ld=AL.localhost,zn=bL.production,Dn=bL.localhost,or="profiles",Qf=So.activeProfile,cd="harness",dd="sets",ud="manifest.json",Li=id.projectsDir,mt=id.logsDir,jn="agent-witch.log",$n="agent-witch.error.log",pd=id.reportsDir,Hr=id.deviceKeypairJson,eh=Zf,wL="agent-witch.js"});var _L=l(()=>{"use strict";Ue()});var vL,Ao,ki,md=l(()=>{"use strict";vL=g(require("node:path"));Ue();Ao=e=>vL.default.basename(e)===rr,ki=e=>Ao(e)?Dn:zn});var CL=l(()=>{"use strict";_L();md()});var LL,th,nG,Wi,sG,iG,kL,aG,lG,WL=l(()=>{"use strict";CL();Ue();LL=g(require("node:os")),th=g(require("node:path")),nG=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?th.default.resolve(e):th.default.join(LL.default.homedir(),Ot)},Wi=ki(nG()),sG=`${Wi}-wake`,iG=`${Wi}-live`,kL=`${Wi}-watchdog`,aG=`${Wi}-automation-scheduler`,lG=`${Wi}-updater`});var Hn=v(rh=>{"use strict";Object.defineProperty(rh,"__esModule",{value:!0});rh.stringify=cG;function cG(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=v(oh=>{"use strict";Object.defineProperty(oh,"__esModule",{value:!0});oh.generateTypeGuardError=dG;var TL=Hn();function dG(e,t,r){return(0,TL.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,TL.stringify)(e)}) to be "${r}"`}});var Fr=v(gd=>{"use strict";Object.defineProperty(gd,"__esModule",{value:!0});gd.isNonNullObject=void 0;var uG=O(),pG=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,uG.generateTypeGuardError)(e,t.identifier,"non-null object")),r};gd.isNonNullObject=pG});var Mt=v(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.attachTypeGuardMeta=he.isArrayTypeGuard=he.isNestedObjectTypeGuard=he.getTypeGuardWrapperKind=he.getTypeGuardInnerGuard=he.getTypeGuardItemGuard=he.getTypeGuardSchema=void 0;var mG=e=>e.schema;he.getTypeGuardSchema=mG;var gG=e=>e.itemGuard;he.getTypeGuardItemGuard=gG;var fG=e=>e.innerGuard;he.getTypeGuardInnerGuard=fG;var hG=e=>e.wrapperKind;he.getTypeGuardWrapperKind=hG;var yG=e=>{if((0,he.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};he.isNestedObjectTypeGuard=yG;var SG=e=>{if((0,he.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};he.isArrayTypeGuard=SG;var AG=(e,t)=>Object.assign(e,t);he.attachTypeGuardMeta=AG});var Ti=v(bo=>{"use strict";Object.defineProperty(bo,"__esModule",{value:!0});bo.getExpectedTypeName=bo.getTypeGuardDisplayName=void 0;var EL=Mt(),bG=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};bo.getTypeGuardDisplayName=bG;var PG=e=>{let t=(0,EL.getTypeGuardWrapperKind)(e),r=(0,EL.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,bo.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};bo.getExpectedTypeName=PG});var Po=v(fd=>{"use strict";Object.defineProperty(fd,"__esModule",{value:!0});fd.createValidationResult=void 0;var wG=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});fd.createValidationResult=wG});var Fn=v(hd=>{"use strict";Object.defineProperty(hd,"__esModule",{value:!0});hd.createValidationError=void 0;var _G=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});hd.createValidationError=_G});var Un=v(yd=>{"use strict";Object.defineProperty(yd,"__esModule",{value:!0});yd.createTreeNode=void 0;var vG=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});yd.createTreeNode=vG});var Ei=v(Sd=>{"use strict";Object.defineProperty(Sd,"__esModule",{value:!0});Sd.combineResults=void 0;var CG=Po(),LG=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,CG.createValidationResult)(r,o,n)};Sd.combineResults=LG});var bd=v(Ad=>{"use strict";Object.defineProperty(Ad,"__esModule",{value:!0});Ad.createSimplifiedTree=void 0;var xL=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=xL(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},kG=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=xL(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Ad.createSimplifiedTree=kG});var Ri=v(wd=>{"use strict";Object.defineProperty(wd,"__esModule",{value:!0});wd.validateObject=void 0;var WG=Fr(),xi=Po(),TG=Fn(),Pd=Un(),EG=Ei(),RL=_d(),xG=(e,t,r)=>{let o=()=>{let i=(0,TG.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Pd.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,xi.createValidationResult)(!1,[],a):(0,xi.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,xi.createValidationResult)(!0,[],(0,Pd.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,m=d,S=t[m],f=e[m],y=(0,RL.validateProperty)(m,f,S,r);return y.valid?p.length===0?(0,xi.createValidationResult)(!0,[],(0,Pd.createTreeNode)(r.path,!0,"object",e)):a(p):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,RL.validateProperty)(d,e[d],p,r)}),a=(0,EG.combineResults)(i,r.path),c=(0,Pd.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,xi.createValidationResult)(a.valid,a.errors,c)};return(0,WG.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};wd.validateObject=xG});var OL=v(Ld=>{"use strict";Object.defineProperty(Ld,"__esModule",{value:!0});Ld.validateArray=void 0;var RG=Hn(),vd=Po(),IL=Fn(),Cd=Un(),IG=Ei(),OG=Ri(),MG=Ti(),NG=Mt(),zG=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,IL.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Cd.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,vd.createValidationResult)(!1,[c],d)}let n=(0,NG.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,m={path:p,config:r.config||null};if(n)return(0,OG.validateObject)(c,n,m);let S=t(c,null),f=(0,MG.getExpectedTypeName)(t),y=(0,RG.stringify)(c);if(S)return(0,vd.createValidationResult)(!0,[],(0,Cd.createTreeNode)(p,!0,f,c));let u=y.length>200?`Expected ${p} to be "${f}"`:`Expected ${p} (${y}) to be "${f}"`,A=(0,IL.createValidationError)(p,f,c,u),b=(0,Cd.createTreeNode)(p,!1,f,c);return b.errors=[A],(0,vd.createValidationResult)(!1,[A],b)}),i=(0,IG.combineResults)(s,o),a=(0,Cd.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,vd.createValidationResult)(i.valid,i.errors,a)};Ld.validateArray=zG});var _d=v(Wd=>{"use strict";Object.defineProperty(Wd,"__esModule",{value:!0});Wd.validateProperty=void 0;var ML=Po(),DG=Fn(),NL=Un(),jG=Ti(),kd=Mt(),$G=Ri(),HG=OL(),FG=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,kd.getTypeGuardSchema)(r),c=(0,kd.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,$G.validateObject)(t,a,s);if(c&&(0,kd.isArrayTypeGuard)(r))return(0,HG.validateArray)(t,c,s)}let d=p=>{let m=r(t,p),S=(0,jG.getExpectedTypeName)(r);return m?(0,ML.createValidationResult)(!0,[],(0,NL.createTreeNode)(n,!0,S,t)):(()=>{let f=(0,DG.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,NL.createTreeNode)(n,!1,S,t);return y.errors=[f],(0,ML.createValidationResult)(!1,[f],y)})()};if((0,kd.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};Wd.validateProperty=FG});var Ed=v(Td=>{"use strict";Object.defineProperty(Td,"__esModule",{value:!0});Td.isNil=void 0;var UG=O(),BG=function(e,t){return e!=null?(t&&t.callbackOnError((0,UG.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Td.isNil=BG});var nh=v(xd=>{"use strict";Object.defineProperty(xd,"__esModule",{value:!0});xd.isDefined=void 0;var GG=O(),qG=Ed(),VG=function(e,t){return(0,qG.isNil)(e,null)?(t&&t.callbackOnError((0,GG.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};xd.isDefined=VG});var sh=v(Rd=>{"use strict";Object.defineProperty(Rd,"__esModule",{value:!0});Rd.reportValidationResults=void 0;var KG=bd(),zL=nh(),JG=Ed(),XG=(e,t)=>{if(e.valid===!0||(0,JG.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,zL.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,KG.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,zL.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Rd.reportValidationResults=XG});var ih=v(ee=>{"use strict";Object.defineProperty(ee,"__esModule",{value:!0});ee.Validation=ee.reportValidationResults=ee.validateObject=ee.validateProperty=ee.createSimplifiedTree=ee.combineResults=ee.createTreeNode=ee.createValidationError=ee.createValidationResult=ee.getExpectedTypeName=void 0;var YG=Ti();Object.defineProperty(ee,"getExpectedTypeName",{enumerable:!0,get:function(){return YG.getExpectedTypeName}});var ZG=Po();Object.defineProperty(ee,"createValidationResult",{enumerable:!0,get:function(){return ZG.createValidationResult}});var QG=Fn();Object.defineProperty(ee,"createValidationError",{enumerable:!0,get:function(){return QG.createValidationError}});var e2=Un();Object.defineProperty(ee,"createTreeNode",{enumerable:!0,get:function(){return e2.createTreeNode}});var t2=Ei();Object.defineProperty(ee,"combineResults",{enumerable:!0,get:function(){return t2.combineResults}});var r2=bd();Object.defineProperty(ee,"createSimplifiedTree",{enumerable:!0,get:function(){return r2.createSimplifiedTree}});var o2=_d();Object.defineProperty(ee,"validateProperty",{enumerable:!0,get:function(){return o2.validateProperty}});var n2=Ri();Object.defineProperty(ee,"validateObject",{enumerable:!0,get:function(){return n2.validateObject}});var s2=sh();Object.defineProperty(ee,"reportValidationResults",{enumerable:!0,get:function(){return s2.reportValidationResults}});var i2=Po(),a2=Ei(),l2=Fn(),c2=Un(),d2=_d(),u2=Ri(),p2=sh(),m2=bd();ee.Validation={result:i2.createValidationResult,combine:a2.combineResults,error:l2.createValidationError,treeNode:c2.createTreeNode,property:d2.validateProperty,object:u2.validateObject,report:p2.reportValidationResults,createSimplifiedTree:m2.createSimplifiedTree}});var Id=v(ah=>{"use strict";Object.defineProperty(ah,"__esModule",{value:!0});ah.isType=f2;var DL=Fr(),jL=ih(),g2=Mt();function f2(e){if(!(0,DL.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,jL.validateObject)(r,e,s);return(0,jL.reportValidationResults)(i,o||null),i.valid}return(0,DL.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,g2.attachTypeGuardMeta)(t,{schema:e})}});var UL=v(wo=>{"use strict";Object.defineProperty(wo,"__esModule",{value:!0});wo.isNestedType=wo.isShape=void 0;wo.isSchema=Ii;var $L=Fr(),HL=ih(),FL=Mt();function Ii(e){if(!(0,$L.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=y2(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,HL.validateObject)(o,t,i);return(0,HL.reportValidationResults)(a,n||null),a.valid}return(0,$L.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,FL.attachTypeGuardMeta)(r,{schema:t})}function h2(e){return typeof e=="function"?e:Array.isArray(e)?S2(e):typeof e=="object"&&e!==null?Ii(e):e}function y2(e){let t={};for(let[r,o]of Object.entries(e))t[r]=h2(o);return t}function S2(e){let t=e[0],r=Ii(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,FL.attachTypeGuardMeta)(o,{itemGuard:r})}wo.isShape=Ii;wo.isNestedType=Ii});var BL=v(lh=>{"use strict";Object.defineProperty(lh,"__esModule",{value:!0});lh.isObjectWith=b2;var A2=Id();function b2(e){return(0,A2.isType)(e)}});var GL=v(ch=>{"use strict";Object.defineProperty(ch,"__esModule",{value:!0});ch.isObject=w2;var P2=Id();function w2(e){return(0,P2.isType)(e)}});var qL=v(dh=>{"use strict";Object.defineProperty(dh,"__esModule",{value:!0});dh.guardWithTolerance=_2;function _2(e,t,r){return t(e,r),e}});var VL=v(uh=>{"use strict";Object.defineProperty(uh,"__esModule",{value:!0});uh.isBranded=C2;var v2=O();function C2(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,v2.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var KL=v(Od=>{"use strict";Object.defineProperty(Od,"__esModule",{value:!0});Od.BrandSymbols=void 0;Od.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var JL=v(Md=>{"use strict";Object.defineProperty(Md,"__esModule",{value:!0});Md.isAny=void 0;var L2=function(e){return!0};Md.isAny=L2});var Oi=v(ph=>{"use strict";Object.defineProperty(ph,"__esModule",{value:!0});ph.reportTypeGuardError=W2;var k2=O();function W2(e,t,r){e&&e.callbackOnError((0,k2.generateTypeGuardError)(t,e.identifier,r))}});var XL=v(Nd=>{"use strict";Object.defineProperty(Nd,"__esModule",{value:!0});Nd.isBoolean=void 0;var T2=Oi(),E2=function(t,r){return typeof t!="boolean"?((0,T2.reportTypeGuardError)(r,t,"boolean"),!1):!0};Nd.isBoolean=E2});var YL=v(zd=>{"use strict";Object.defineProperty(zd,"__esModule",{value:!0});zd.isDate=void 0;var x2=O(),R2=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,x2.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};zd.isDate=R2});var mh=v(Dd=>{"use strict";Object.defineProperty(Dd,"__esModule",{value:!0});Dd.isNumber=void 0;var I2=Oi(),O2=function(t,r){return typeof t!="number"||isNaN(t)?((0,I2.reportTypeGuardError)(r,t,"number"),!1):!0};Dd.isNumber=O2});var ZL=v(jd=>{"use strict";Object.defineProperty(jd,"__esModule",{value:!0});jd.isString=void 0;var M2=Oi(),N2=function(t,r){return typeof t!="string"?((0,M2.reportTypeGuardError)(r,t,"string"),!1):!0};jd.isString=N2});var QL=v($d=>{"use strict";Object.defineProperty($d,"__esModule",{value:!0});$d.isUnknown=void 0;var z2=function(e){return!0};$d.isUnknown=z2});var ek=v(Hd=>{"use strict";Object.defineProperty(Hd,"__esModule",{value:!0});Hd.isFunction=void 0;var D2=O(),j2=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,D2.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Hd.isFunction=j2});var rk=v(Fd=>{"use strict";Object.defineProperty(Fd,"__esModule",{value:!0});Fd.isFile=void 0;var tk=O(),$2=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,tk.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,tk.generateTypeGuardError)(e,t.identifier,"File")),!1)};Fd.isFile=$2});var nk=v(Ud=>{"use strict";Object.defineProperty(Ud,"__esModule",{value:!0});Ud.isFileList=void 0;var ok=O(),H2=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,ok.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,ok.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Ud.isFileList=H2});var ik=v(Bd=>{"use strict";Object.defineProperty(Bd,"__esModule",{value:!0});Bd.isBlob=void 0;var sk=O(),F2=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,sk.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,sk.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Bd.isBlob=F2});var lk=v(Gd=>{"use strict";Object.defineProperty(Gd,"__esModule",{value:!0});Gd.isFormData=void 0;var ak=O(),U2=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,ak.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,ak.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Gd.isFormData=U2});var dk=v(qd=>{"use strict";Object.defineProperty(qd,"__esModule",{value:!0});qd.isURL=void 0;var ck=O(),B2=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,ck.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,ck.generateTypeGuardError)(e,t.identifier,"URL")),!1)};qd.isURL=B2});var pk=v(Vd=>{"use strict";Object.defineProperty(Vd,"__esModule",{value:!0});Vd.isURLSearchParams=void 0;var uk=O(),G2=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,uk.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,uk.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Vd.isURLSearchParams=G2});var mk=v(Kd=>{"use strict";Object.defineProperty(Kd,"__esModule",{value:!0});Kd.isMap=void 0;var q2=O(),V2=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,q2.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Kd.isMap=V2});var gk=v(Jd=>{"use strict";Object.defineProperty(Jd,"__esModule",{value:!0});Jd.isSet=void 0;var K2=O(),J2=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,K2.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Jd.isSet=J2});var fk=v(gh=>{"use strict";Object.defineProperty(gh,"__esModule",{value:!0});gh.isIndexSignature=Y2;var X2=O();function Y2(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,X2.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let m=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),f=t(m,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return S&&f})}}});var hk=v(Xd=>{"use strict";Object.defineProperty(Xd,"__esModule",{value:!0});Xd.isError=void 0;var Z2=Oi(),Q2=function(t,r){return t instanceof Error?!0:((0,Z2.reportTypeGuardError)(r,t,"Error"),!1)};Xd.isError=Q2});var hh=v(fh=>{"use strict";Object.defineProperty(fh,"__esModule",{value:!0});fh.isArrayWithEachItem=r5;var e5=O(),t5=Mt();function r5(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,e5.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,t5.attachTypeGuardMeta)(t,{itemGuard:e})}});var yh=v(Yd=>{"use strict";Object.defineProperty(Yd,"__esModule",{value:!0});Yd.isNonEmptyArray=void 0;var o5=O(),n5=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,o5.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Yd.isNonEmptyArray=n5});var yk=v(Sh=>{"use strict";Object.defineProperty(Sh,"__esModule",{value:!0});Sh.isNonEmptyArrayWithEachItem=a5;var s5=hh(),i5=yh();function a5(e){return function(t,r){return(0,s5.isArrayWithEachItem)(e)(t,r)&&(0,i5.isNonEmptyArray)(t,r)}}});var Ak=v(Ah=>{"use strict";Object.defineProperty(Ah,"__esModule",{value:!0});Ah.isTuple=l5;var Sk=O();function l5(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,Sk.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,Sk.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var bk=v(bh=>{"use strict";Object.defineProperty(bh,"__esModule",{value:!0});bh.isObjectWithEachItem=d5;var c5=O();function d5(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,c5.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var Pk=v(Ph=>{"use strict";Object.defineProperty(Ph,"__esModule",{value:!0});Ph.isPartialOf=p5;var u5=Fr();function p5(e){return function(t,r){if(!(0,u5.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var wk=v(wh=>{"use strict";Object.defineProperty(wh,"__esModule",{value:!0});wh.isPick=g5;var m5=Fr();function g5(e,...t){return function(r,o){if(!(0,m5.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var _k=v(_h=>{"use strict";Object.defineProperty(_h,"__esModule",{value:!0});_h.isOmit=h5;var f5=Fr();function h5(e,...t){return function(r,o){if(!(0,f5.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),m=p.indexOf(" ("),S=m>=0?p.slice(0,m):p;if(a.has(S))return!1;let f=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(f&&!Object.prototype.hasOwnProperty.call(r,f))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var vk=v(Zd=>{"use strict";Object.defineProperty(Zd,"__esModule",{value:!0});Zd.isNonEmptyString=void 0;var y5=O(),S5=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,y5.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Zd.isNonEmptyString=S5});var Ck=v(Qd=>{"use strict";Object.defineProperty(Qd,"__esModule",{value:!0});Qd.isNonNegativeNumber=void 0;var A5=O(),b5=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,A5.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Qd.isNonNegativeNumber=b5});var Lk=v(eu=>{"use strict";Object.defineProperty(eu,"__esModule",{value:!0});eu.isPositiveNumber=void 0;var P5=O(),w5=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,P5.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};eu.isPositiveNumber=w5});var kk=v(tu=>{"use strict";Object.defineProperty(tu,"__esModule",{value:!0});tu.isNonPositiveNumber=void 0;var _5=O(),v5=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,_5.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};tu.isNonPositiveNumber=v5});var Wk=v(ru=>{"use strict";Object.defineProperty(ru,"__esModule",{value:!0});ru.isNegativeNumber=void 0;var C5=O(),L5=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,C5.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};ru.isNegativeNumber=L5});var Tk=v(ou=>{"use strict";Object.defineProperty(ou,"__esModule",{value:!0});ou.isInteger=void 0;var k5=O(),W5=mh(),T5=function(e,t){return!(0,W5.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,k5.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};ou.isInteger=T5});var Ek=v(nu=>{"use strict";Object.defineProperty(nu,"__esModule",{value:!0});nu.isPositiveInteger=void 0;var E5=O(),x5=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,E5.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};nu.isPositiveInteger=x5});var xk=v(su=>{"use strict";Object.defineProperty(su,"__esModule",{value:!0});su.isNegativeInteger=void 0;var R5=O(),I5=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,R5.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};su.isNegativeInteger=I5});var Rk=v(iu=>{"use strict";Object.defineProperty(iu,"__esModule",{value:!0});iu.isNonNegativeInteger=void 0;var O5=O(),M5=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,O5.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};iu.isNonNegativeInteger=M5});var Ik=v(au=>{"use strict";Object.defineProperty(au,"__esModule",{value:!0});au.isNonPositiveInteger=void 0;var N5=O(),z5=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,N5.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};au.isNonPositiveInteger=z5});var Ok=v(cu=>{"use strict";Object.defineProperty(cu,"__esModule",{value:!0});cu.isNumeric=void 0;var lu=O(),D5=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,lu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,lu.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,lu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,lu.generateTypeGuardError)(e,t.identifier,"number key")),!1};cu.isNumeric=D5});var Mk=v(du=>{"use strict";Object.defineProperty(du,"__esModule",{value:!0});du.isBooleanLike=void 0;var vh=O(),j5=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,vh.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,vh.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};du.isBooleanLike=j5});var Nk=v(uu=>{"use strict";Object.defineProperty(uu,"__esModule",{value:!0});uu.isDateLike=void 0;var Mi=O(),$5=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Mi.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Mi.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Mi.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Mi.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Mi.generateTypeGuardError)(e,t.identifier,"date-like")),!1};uu.isDateLike=$5});var zk=v(pu=>{"use strict";Object.defineProperty(pu,"__esModule",{value:!0});pu.isBigInt=void 0;var H5=O(),F5=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,H5.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};pu.isBigInt=F5});var Lh=v(Ch=>{"use strict";Object.defineProperty(Ch,"__esModule",{value:!0});Ch.isOneOf=U5;var Dk=Hn();function U5(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,Dk.stringify)(t)}) must be one of following values ${e.map(Dk.stringify).join(" | ")}`),o}}});var jk=v(kh=>{"use strict";Object.defineProperty(kh,"__esModule",{value:!0});kh.isOneOfTypes=q5;var B5=Hn(),G5=Ti();function q5(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,B5.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,G5.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var $k=v(Wh=>{"use strict";Object.defineProperty(Wh,"__esModule",{value:!0});Wh.isIntersectionOf=V5;function V5(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var Hk=v(Th=>{"use strict";Object.defineProperty(Th,"__esModule",{value:!0});Th.isExtensionOf=K5;function K5(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var Fk=v(Eh=>{"use strict";Object.defineProperty(Eh,"__esModule",{value:!0});Eh.isNullOr=X5;var J5=Mt();function X5(e){function t(r,o){return r===null?!0:e(r,o)}return(0,J5.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var Uk=v(xh=>{"use strict";Object.defineProperty(xh,"__esModule",{value:!0});xh.isUndefinedOr=Z5;var Y5=Mt();function Z5(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,Y5.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var Bk=v(Rh=>{"use strict";Object.defineProperty(Rh,"__esModule",{value:!0});Rh.isNilOr=eq;var Q5=Mt();function eq(e){function t(r,o){return r==null?!0:e(r,o)}return(0,Q5.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var Gk=v(Ih=>{"use strict";Object.defineProperty(Ih,"__esModule",{value:!0});Ih.isAsserted=tq;function tq(e){return!0}});var qk=v(Oh=>{"use strict";Object.defineProperty(Oh,"__esModule",{value:!0});Oh.isEnum=oq;var rq=Lh();function oq(e){return function(t,r){return(0,rq.isOneOf)(...Object.values(e))(t,r)}}});var Vk=v(Mh=>{"use strict";Object.defineProperty(Mh,"__esModule",{value:!0});Mh.isEqualTo=iq;var nq=O(),sq=Hn();function iq(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,nq.generateTypeGuardError)(t,r.identifier,`equal to ${(0,sq.stringify)(e)}`)),!1):!0}}});var Kk=v(mu=>{"use strict";Object.defineProperty(mu,"__esModule",{value:!0});mu.isRegex=void 0;var aq=O(),lq=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,aq.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};mu.isRegex=lq});var Xk=v(Nh=>{"use strict";Object.defineProperty(Nh,"__esModule",{value:!0});Nh.isPattern=cq;var Jk=O();function cq(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,Jk.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,Jk.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var Yk=v(zh=>{"use strict";Object.defineProperty(zh,"__esModule",{value:!0});zh.by=dq;function dq(e){return function(t){return e(t,null)}}});var Zk=v(Dh=>{"use strict";Object.defineProperty(Dh,"__esModule",{value:!0});Dh.toNumber=uq;function uq(e){return typeof e=="number"?e:Number(e)}});var Qk=v(jh=>{"use strict";Object.defineProperty(jh,"__esModule",{value:!0});jh.toDate=pq;function pq(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var eW=v($h=>{"use strict";Object.defineProperty($h,"__esModule",{value:!0});$h.toBoolean=mq;function mq(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var tW=v(gu=>{"use strict";Object.defineProperty(gu,"__esModule",{value:!0});gu.isSymbol=void 0;var gq=O(),fq=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,gq.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};gu.isSymbol=fq});var Bn=v(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var hq=Id();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return hq.isType}});var Hh=UL();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return Hh.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return Hh.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return Hh.isNestedType}});var yq=BL();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return yq.isObjectWith}});var Sq=GL();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return Sq.isObject}});var Aq=qL();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return Aq.guardWithTolerance}});var bq=VL();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return bq.isBranded}});var Pq=KL();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return Pq.BrandSymbols}});var wq=JL();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return wq.isAny}});var _q=XL();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return _q.isBoolean}});var vq=YL();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return vq.isDate}});var Cq=nh();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return Cq.isDefined}});var Lq=Ed();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return Lq.isNil}});var kq=mh();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return kq.isNumber}});var Wq=ZL();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return Wq.isString}});var Tq=QL();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return Tq.isUnknown}});var Eq=ek();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return Eq.isFunction}});var xq=rk();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return xq.isFile}});var Rq=nk();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return Rq.isFileList}});var Iq=ik();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return Iq.isBlob}});var Oq=lk();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return Oq.isFormData}});var Mq=dk();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return Mq.isURL}});var Nq=pk();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return Nq.isURLSearchParams}});var zq=mk();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return zq.isMap}});var Dq=gk();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return Dq.isSet}});var jq=fk();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return jq.isIndexSignature}});var $q=hk();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return $q.isError}});var Hq=hh();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return Hq.isArrayWithEachItem}});var Fq=yh();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return Fq.isNonEmptyArray}});var Uq=yk();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return Uq.isNonEmptyArrayWithEachItem}});var Bq=Ak();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return Bq.isTuple}});var Gq=Fr();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return Gq.isNonNullObject}});var qq=bk();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return qq.isObjectWithEachItem}});var Vq=Pk();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return Vq.isPartialOf}});var Kq=wk();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return Kq.isPick}});var Jq=_k();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return Jq.isOmit}});var Xq=vk();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return Xq.isNonEmptyString}});var Yq=Ck();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return Yq.isNonNegativeNumber}});var Zq=Lk();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return Zq.isPositiveNumber}});var Qq=kk();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return Qq.isNonPositiveNumber}});var eV=Wk();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return eV.isNegativeNumber}});var tV=Tk();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return tV.isInteger}});var rV=Ek();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return rV.isPositiveInteger}});var oV=xk();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return oV.isNegativeInteger}});var nV=Rk();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return nV.isNonNegativeInteger}});var sV=Ik();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return sV.isNonPositiveInteger}});var iV=Ok();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return iV.isNumeric}});var aV=Mk();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return aV.isBooleanLike}});var lV=Nk();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return lV.isDateLike}});var cV=zk();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return cV.isBigInt}});var dV=Lh();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return dV.isOneOf}});var uV=jk();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return uV.isOneOfTypes}});var pV=$k();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return pV.isIntersectionOf}});var mV=Hk();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return mV.isExtensionOf}});var gV=Fk();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return gV.isNullOr}});var fV=Uk();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return fV.isUndefinedOr}});var hV=Bk();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return hV.isNilOr}});var yV=Gk();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return yV.isAsserted}});var SV=qk();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return SV.isEnum}});var AV=Vk();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return AV.isEqualTo}});var bV=Kk();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return bV.isRegex}});var PV=Xk();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return PV.isPattern}});var wV=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return wV.generateTypeGuardError}});var _V=Yk();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return _V.by}});var vV=Zk();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return vV.toNumber}});var CV=Qk();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return CV.toDate}});var LV=eW();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return LV.toBoolean}});var kV=tW();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return kV.isSymbol}})});var Gn,rW,WV,oW,nW=l(()=>{"use strict";Gn=g(require("node:path")),rW=require("node:url"),WV=()=>!0,oW=()=>{if(WV()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Gn.default.dirname(Gn.default.resolve(e)):Gn.default.dirname(Gn.default.resolve(__filename))}return Gn.default.dirname((0,rW.fileURLToPath)(__agentWitchImportMetaUrl))}});var Fh,sW,D,iW,TV,Ur,T,fu,nr,aW,hu,qn,yu,_e,gt,Uh,ft,Bh,N,Gh=l(()=>{"use strict";Fh=g(require("node:fs")),sW=g(require("node:os")),D=g(require("node:path")),iW=g(Bn());Ue();nW();md();md();TV=oW(),Ur=e=>e.trim().toLowerCase(),T=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return D.default.resolve(e);let t=D.default.resolve(TV),r=D.default.basename(t),o=D.default.basename(D.default.dirname(t));return r===eh&&(o===Ot||o===rr)?D.default.dirname(t):r===Ot||r===rr?t:D.default.join(sW.default.homedir(),Ot)},fu=(e=T())=>D.default.join(e,eh),nr=(e=T())=>D.default.join(fu(e),wL),aW=(e,t,r)=>t!==null?D.default.join(e,or,t,r):D.default.join(e,r),hu=e=>aW(e.installDir,e.profileEmail,Li),qn=e=>aW(e.installDir,e.profileEmail,mt),yu=e=>e.profileEmail!==null?D.default.join(e.installDir,or,e.profileEmail,Hr):D.default.join(e.installDir,Hr),_e=(e=T())=>ki(e),gt=(e=T())=>Ao(e)?ld:ad,Uh=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Ur(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Ur(t):null},ft=(e=T())=>{let t=D.default.join(e,Qf);if(!Fh.default.existsSync(t))return null;try{let r=JSON.parse(Fh.default.readFileSync(t,"utf8"));if((0,iW.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Ur(r.email)}catch{return null}return null},Bh=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Ur(r):null}let t=Uh();return t!==null?t:ft()},N=e=>{let t=T(),r=fu(t),o=nr(t),n=Bh(e);if(n!==null){let S=D.default.join(t,or,n),f=D.default.join(S,cd),y=D.default.join(S,Li),u=D.default.join(S,mt),A=D.default.join(S,pd),b=D.default.join(S,Hr),h=D.default.join(S,mt,jn),w=D.default.join(S,mt,$n);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:u,mainLogPath:h,errorLogPath:w,reportsDir:A,deviceKeypairPath:b,configPath:D.default.join(S,"config.json"),harnessRootDir:f,harnessManifestPath:D.default.join(f,ud),harnessSetsDir:D.default.join(f,dd)}}let s=D.default.join(t,cd),i=D.default.join(t,Li),a=D.default.join(t,mt),c=D.default.join(t,pd),d=D.default.join(t,Hr),p=D.default.join(t,mt,jn),m=D.default.join(t,mt,$n);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:p,errorLogPath:m,reportsDir:c,deviceKeypairPath:d,configPath:D.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:D.default.join(s,ud),harnessSetsDir:D.default.join(s,dd)}}});var qh,lW,EV,xV,cW,Vh,dW=l(()=>{"use strict";qh=g(require("node:fs")),lW=g(require("node:path"));Ue();Gh();EV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xV=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,cW=e=>{let t=lW.default.join(e,So.wakePort);if(!qh.default.existsSync(t))return null;try{let r=JSON.parse(qh.default.readFileSync(t,"utf8"));if(EV(r)&&xV(r.wakePort))return r.wakePort}catch{return null}return null},Vh=(e=T())=>cW(e)??gt(e)});var J=l(()=>{"use strict";Gh();dW()});var Kh,Jh,Su=l(()=>{"use strict";Kh=new Set(["","loginwindow","_mbsetupuser","root"]),Jh=5e3});var uW,NV,pW,Xh,Yh=l(()=>{"use strict";uW=require("node:child_process");Su();NV=e=>e.trim().toLowerCase(),pW=e=>e==null?!1:!Kh.has(NV(e)),Xh=()=>{if(process.platform!=="darwin")return null;try{let t=(0,uW.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return pW(t)?t:null}catch{return null}}});var gW,mW,ht,Ni=l(()=>{"use strict";gW=g(require("node:os"));Yh();mW=e=>e.trim().toLowerCase(),ht=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?Xh():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??gW.default.userInfo().username;return mW(r)===mW(o)}});var fW,hW,_o,yW=l(()=>{"use strict";fW=require("node:child_process"),hW=g(require("node:fs"));J();Ni();_o=(e=T())=>{let t=nr(e);if(!hW.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!ht())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=ft(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,fW.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var SW,zi,Au=l(()=>{"use strict";SW=require("node:child_process"),zi=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,SW.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var bu,Zh,AW,te,Pu,Di=l(()=>{"use strict";bu=g(require("node:fs")),Zh=g(require("node:path"));J();Ue();AW=e=>{let t=Zh.default.join(e,or);return bu.default.existsSync(t)?bu.default.readdirSync(t).filter(r=>bu.default.statSync(Zh.default.join(t,r)).isDirectory()).map(r=>Ur(r)).toSorted():[]},te=(e=T())=>{let t=_e(e);return[{profileEmail:AW(e)[0]??null,launchAgentLabel:t}]},Pu=(e=T())=>AW(e)});var Qh,bW,PW,zV,sr,wu=l(()=>{"use strict";Qh=g(require("node:fs")),bW=g(require("node:os")),PW=g(require("node:path"));J();Di();zV=()=>PW.default.join(bW.default.homedir(),"Library","LaunchAgents"),sr=(e=T())=>{let t=_e(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of te(e))r.add(n.launchAgentLabel);let o=zV();if(Qh.default.existsSync(o))for(let n of Qh.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var wW,ji,_W=l(()=>{"use strict";J();Au();wu();Di();wW=(e=T())=>{let t=new Set(te(e).map(r=>r.launchAgentLabel));return sr(e).filter(r=>!t.has(r))},ji=(e=T())=>{for(let t of wW(e))zi(t)}});var $i,ey=l(()=>{"use strict";J();Au();wu();$i=(e=T())=>{for(let t of sr(e))zi(t)}});var vW,CW,DV,vo,LW=l(()=>{"use strict";vW=require("node:child_process"),CW=require("node:util"),DV=(0,CW.promisify)(vW.execFile),vo=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await DV("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Co,jV,ty,ry=l(()=>{"use strict";Co=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jV=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,ty=e=>{let t=e.pathValue??jV(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${Co(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${Co(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${Co(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${Co(e.homeDir)}</string>
    <key>PATH</key>
    <string>${Co(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${Co(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${Co(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var _u,oy=l(()=>{"use strict";_u=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Lo,ny,Hi,$V,HV,FV,kW,ir,sy=l(()=>{"use strict";Lo=g(require("node:fs")),ny=g(require("node:os")),Hi=g(require("node:path"));Ue();J();ry();oy();$V=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),HV=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,FV=e=>{let t=Hi.default.join(e,So.wakePort);if(!Lo.default.existsSync(t))return gt(e);try{let r=JSON.parse(Lo.default.readFileSync(t,"utf8"));if($V(r)&&HV(r.wakePort))return r.wakePort}catch{return gt(e)}return gt(e)},kW=(e,t=ny.default.homedir())=>Hi.default.join(t,"Library","LaunchAgents",`${e}.plist`),ir=e=>{let t=e.installDir??T(),r=e.homeDir??ny.default.homedir(),o=kW(e.launchAgentLabel,r),n=Lo.default.existsSync(o)?Lo.default.readFileSync(o,"utf8"):null;if(n!==null&&_u(n))return{ok:!0,rewritten:!1,plistPath:o};let s=ty({launchAgentLabel:e.launchAgentLabel,runPath:Hi.default.join(t,PL,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??FV(t)});if(!_u(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Lo.default.mkdirSync(Hi.default.dirname(o),{recursive:!0}),Lo.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var TW,EW,xW,Fi,UV,BV,WW,xe,iy=l(()=>{"use strict";TW=require("node:child_process"),EW=g(require("node:fs")),xW=require("node:util");J();sy();Ni();Fi=(0,xW.promisify)(TW.execFile),UV=async e=>{try{return await Fi("launchctl",["print",e]),!0}catch{return!1}},BV=async(e,t,r)=>{await UV(t)&&await Fi("launchctl",["bootout",t]).catch(()=>{}),await Fi("launchctl",["bootstrap",e,r]),await Fi("launchctl",["enable",t])},WW=async e=>{try{return await Fi("launchctl",["kickstart","-k",e]),!0}catch{return!1}},xe=async(e,t=T())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!ht())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=ir({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await WW(n))return{ok:!0};let i=s.plistPath;if(!EW.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await BV(o,n,i),await WW(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var ko,RW=l(()=>{"use strict";J();iy();Di();ko=async(e=T())=>{let t=[];for(let r of te(e))(await xe(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var Xe,ar,IW=l(()=>{"use strict";ey();Ni();Su();Xe=e=>{ht()||($i(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},ar=(e,t=Jh)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{ht()||e()},t);return()=>{clearInterval(r)}}});var re=l(()=>{"use strict";WL();yW();Au();_W();ey();wu();Ni();LW();RW();iy();sy();oy();ry();Di();Yh();Su();IW()});var ay=l(()=>{"use strict";re()});var OW,MW,vu,NW,Vn,zW,DW,Wo=l(()=>{"use strict";OW=".agent-witch",MW="memory",vu="project.json",NW="chunks.ndjson",Vn="runs.ndjson",zW="reports",DW=".json"});var jW=l(()=>{"use strict";Wo()});var $W,Cu,ly=l(()=>{"use strict";$W=g(require("node:path"));jW();Cu=(e,t)=>$W.default.join(e.trim(),`${t.trim()}${DW}`)});var Ui,HW,FW=l(()=>{"use strict";Ui="agent-witch.js",HW="command"});var Lu=l(()=>{"use strict";FW()});var To,UW,BW=l(()=>{"use strict";Lu();To=e=>`'${e.replace(/'/g,"'\\''")}'`,UW=e=>{let t=`${e.installDir.trim()}/${"app"}/${Ui}`,r=[To("node"),To(t),"report","write","--key",To(e.reportKey.trim()),"--agent-run-id",To(e.agentRunId.trim()),"--status",To(e.status),"--summary",To(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",To(e.details.trim())),r.join(" ")}});var Nt,GW,GV,cy,ku=l(()=>{"use strict";ly();BW();Nt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},GW=e=>e===Nt.COMPLETED||e===Nt.FAILED,GV=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),cy=(e,t)=>{let r=Cu(t.reportsDir,t.reportKey),o=UW({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Nt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${GV({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Re=l(()=>{"use strict";Ue();J()});var Gi,VW,qW,KW,qV,Kn,VV,JW,qi,Vi,dy,XW,YW,Ki=l(()=>{"use strict";Gi=g(require("node:fs")),VW=g(require("node:path"));ku();ly();Re();qW=50,KW=e=>{let t=N(),r=Cu(t.reportsDir,e);return Gi.default.mkdirSync(VW.default.dirname(r),{recursive:!0}),r},qV=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Kn=e=>{let t=KW(e);if(!Gi.default.existsSync(t))return null;try{let r=JSON.parse(Gi.default.readFileSync(t,"utf8"));return qV(r)?r:null}catch{return null}},VV=(e,t)=>{let r=[...e,t];return r.length>qW?r.slice(r.length-qW):r},JW=e=>{let t=KW(e.reportKey);Gi.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},qi=e=>{let t=Kn(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:VV(t?.history??[],o)};return JW(n),n},Vi=e=>{let t=Kn(e.reportKey);return t!==null?t:qi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Nt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},dy=(e,t)=>{let r=t.trim();if(r.length===0)return Kn(e);let o=Kn(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return JW(s),s},XW=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},YW=e=>{if(e===null||!GW(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Nt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var KV,JV,Ji,ZW,Wu,uy=l(()=>{"use strict";ku();Ki();KV=new Set(Object.values(Nt)),JV=e=>KV.has(e),Ji=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},ZW=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Wu=e=>{if(e[0]!=="write")return ZW(),1;let r=Ji(e,"--key"),o=Ji(e,"--agent-run-id"),n=Ji(e,"--status"),s=Ji(e,"--summary"),i=Ji(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!JV(n)?(ZW(),1):(qi({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var Ye,Eo=l(()=>{"use strict";Ye=()=>!0});var py,QW,xo,Tu=l(()=>{"use strict";py=g(require("node:path")),QW=require("node:url");Eo();xo=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=py.default.resolve(t);return Ye()?r===py.default.resolve(__filename):e===void 0?!1:r===(0,QW.fileURLToPath)(e)}});var Eu,Jn,ZV,Zte,Xn=l(()=>{"use strict";Eu="agent-witch.js",Jn="deps.tar.gz",ZV="install.sh",Zte={mainScript:`app/${Eu}`,depsArchive:`app/${Jn}`,installShell:ZV}});var oT=l(()=>{"use strict";Xn()});var nT=l(()=>{"use strict";Xn();oT()});var Xi,gy,xu,QV,Yi,Ie,Zn,Zi,Qi,Ro,fy=l(()=>{"use strict";Xi=g(require("node:fs")),gy=g(require("node:path"));nT();J();xu="install-version.json",QV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Yi=(e=T())=>gy.default.join(e,xu),Ie=(e=T())=>{let t=Yi(e);if(!Xi.default.existsSync(t))return null;try{let r=JSON.parse(Xi.default.readFileSync(t,"utf8"));return!QV(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Zn=(e,t=T())=>{let r=Yi(t);Xi.default.mkdirSync(gy.default.dirname(r),{recursive:!0}),Xi.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Zi=(e=T())=>Ie(e)?.bundleVersion??"243",Qi=(e,t)=>{let r=Ie(e);if(r!==null)return r;let o={bundleVersion:"243",appOrigin:t,updatedAt:new Date().toISOString()};return Zn(o,e),o},Ro=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var sT,Io,hy,yy,Sy,Ru,zt,Oo,Ay=l(()=>{"use strict";sT=require("node:crypto"),Io=g(require("node:fs")),hy=g(require("node:path"));J();yy="self-update-log.ndjson",Sy=100,Ru=(e=T())=>{let t=N(),r=t.installDir===e?t.logsDir:qn({installDir:e,profileEmail:t.profileEmail});return hy.default.join(r,yy)},zt=(e,t=T())=>{let r={id:(0,sT.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Ru(t);Io.default.mkdirSync(hy.default.dirname(o),{recursive:!0});let n=Io.default.existsSync(o)?Io.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Sy+1)),JSON.stringify(r)];return Io.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Oo=(e=20,t=T())=>{let r=Ru(t);if(!Io.default.existsSync(r))return[];let o=Io.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var by,fre,Py=l(()=>{"use strict";Xn();by="deps",fre=`${"app"}/${Jn}`});var iT=l(()=>{"use strict";Py()});var aT,Br,Mo,lT,wy,_y,cT=l(()=>{"use strict";aT=require("node:child_process"),Br=g(require("node:fs")),Mo=g(require("node:path"));Xn();Py();lT=e=>Mo.default.join(e,"app",by),wy=e=>{let t=Mo.default.join(e,"app"),r=Mo.default.join(t,Jn);Br.default.existsSync(r)&&(Br.default.rmSync(lT(e),{recursive:!0,force:!0}),Br.default.mkdirSync(t,{recursive:!0}),(0,aT.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Br.default.rmSync(r,{force:!0}))},_y=e=>{Br.default.rmSync(Mo.default.join(e,"node_modules"),{recursive:!0,force:!0}),Br.default.rmSync(Mo.default.join(e,"package.json"),{force:!0}),Br.default.rmSync(Mo.default.join(e,"package-lock.json"),{force:!0})}});var dT=l(()=>{"use strict";iT();cT()});var yt,Iu,uT=l(()=>{"use strict";yt="https://www.agentwitch.com",Iu="wss://www.agentwitch.com/api/agent-witch/ws"});var ea,lr,pT=l(()=>{"use strict";ea="127.0.0.1",lr=`http://${ea}:43347`});var Dt=l(()=>{"use strict";uT();pT()});var ta,Ou,mT,Cy,eK,gT,Wy,fT,St,ra,oa,Ty,Ly,ky,na,Ey,xy,Ry,Qn=l(()=>{"use strict";ta=g(require("node:fs")),Ou=g(require("node:path")),mT="active-writer-work.json",Cy=new Set,eK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gT=e=>e.profileEmail===null?Ou.default.join(e.installDir,mT):Ou.default.join(e.installDir,"profiles",e.profileEmail,mT),Wy=e=>{let t=gT(e);if(!ta.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(ta.default.readFileSync(t,"utf8"));return!eK(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},fT=(e,t)=>{let r=gT(e);ta.default.mkdirSync(Ou.default.dirname(r),{recursive:!0}),ta.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},St=e=>Wy(e).activeCount>0,ra=e=>{let t=Wy(e);fT(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},oa=e=>{let t=Wy(e),r=Math.max(0,t.activeCount-1);if(fT(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of Cy)o()},Ty=e=>(Cy.add(e),()=>{Cy.delete(e)}),Ly=null,ky=null,na=e=>{Ly=e},Ey=e=>{ky=e},xy=()=>{let e=Ly;return Ly=null,e},Ry=()=>{let e=ky;return ky=null,e}});var ve,Mu=l(()=>{"use strict";ve=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var es,Nu,sa,Iy=l(()=>{"use strict";es="qwen2.5:7b",Nu="nomic-embed-text",sa="Install Ollama from https://ollama.com/download"});var ia,Oy,zu=l(()=>{"use strict";Iy();ia=()=>`
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
    echo "Ollama is missing. ${sa}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${sa}" >&2
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
  agent_witch_ensure_ollama_model "${es}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${Nu}" "\${pull_log}"
}
`,Oy=()=>`
${ia()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var hT,tK,Du,My=l(()=>{"use strict";hT=require("node:child_process");J();zu();tK=e=>new Promise(t=>{let r=(0,hT.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:T()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Du=async(e=tK)=>{let t=`${ia()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var Gr,ju,yT,rK,ST,rs,oK,nK,sK,ts,No,zo,AT=l(()=>{"use strict";Gr=g(require("node:fs")),ju=g(require("node:path"));dT();re();J();Xn();Dt();fy();Qn();Mu();Ay();My();yT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rK=e=>{let t=ft(e),r=t===null?N():N(t);if(!Gr.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Gr.default.readFileSync(r.configPath,"utf8"));return!yT(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},ST=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!yT(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},rs=async e=>(await ST(e))?.bundleVersion??null,oK=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=ju.default.join(t,r);Gr.default.mkdirSync(ju.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());Gr.default.writeFileSync(n,s),r.endsWith(".js")&&Gr.default.chmodSync(n,493)},nK=async()=>{ji(),await ko()},sK=(e,t)=>e!==null?ve(e):t??yt,ts=(e,t)=>({localBundleVersion:t,...e}),No=async e=>{let t=T(),r=Ie(t),o=r?.bundleVersion??null,n=await Du();zt({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=rK(t),i=sK(s,r?.appOrigin);if(i===null){let d=ts({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return zt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await ST(i);if(a===null){let d=ts({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return zt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||Ro(o,a.bundleVersion))){let d=ts({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return zt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await oK(i,t,S);let d=ju.default.join(t,Eu);Gr.default.existsSync(d)&&Gr.default.rmSync(d,{force:!0}),wy(t),_y(t),Zn({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=N(ft(t));if(St(p)){let S=ts({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return zt({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await nK();let m=ts({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return zt({event:"update_applied",ok:!0,message:m.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}catch(d){let p=d instanceof Error?d.message:"Agent Witch self-update failed.",m=ts({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return zt({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},zo=()=>{let e=T();return{local:Ie(e),logs:Oo(20,e)}}});var bT={};It(bT,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>xu,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>sa,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Nu,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>es,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>yy,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Sy,appendAgentWitchSelfUpdateLog:()=>zt,buildAgentWitchEnsureOllamaShell:()=>ia,buildAgentWitchInstallScriptOllama:()=>Oy,buildAgentWitchSelfUpdateStatus:()=>zo,ensureAgentWitchInstallVersionRecorded:()=>Qi,ensureAgentWitchOllamaInstalled:()=>Du,fetchAgentWitchRemoteInstallBundleVersion:()=>rs,isRemoteAgentWitchBundleVersionNewer:()=>Ro,readAgentWitchInstallVersion:()=>Ie,readAgentWitchSelfUpdateLogs:()=>Oo,resolveAgentWitchAppOriginFromWsUrl:()=>ve,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Zi,resolveAgentWitchInstallVersionPath:()=>Yi,resolveAgentWitchSelfUpdateLogPath:()=>Ru,runAgentWitchSelfUpdate:()=>No,writeAgentWitchInstallVersion:()=>Zn});var jt=l(()=>{"use strict";fy();Ay();AT();Mu();Iy();zu();My()});var Ny={};It(Ny,{buildAgentWitchSelfUpdateStatus:()=>zo,fetchAgentWitchRemoteInstallBundleVersion:()=>rs,runAgentWitchSelfUpdate:()=>No});var zy=l(()=>{"use strict";jt()});function os(e){return(0,PT.createHash)("sha256").update(e.trim()).digest("hex")}var PT,Dy=l(()=>{"use strict";PT=require("node:crypto")});var ns,aa,iK,wT,jy,_T=l(()=>{"use strict";ns=g(require("node:fs")),aa=g(require("node:path"));Dy();Re();iK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wT=e=>{if(!ns.default.existsSync(e))return null;try{let t=JSON.parse(ns.default.readFileSync(e,"utf8"));return!iK(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:os(t.pairingToken.trim())}catch{return null}},jy=(e=T())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(wT(aa.default.join(e,"config.json")));let n=aa.default.join(e,or);if(!ns.default.existsSync(n))return t;for(let s of ns.default.readdirSync(n)){let i=aa.default.join(n,s);ns.default.statSync(i).isDirectory()&&o(wT(aa.default.join(i,"config.json")))}return t}});var $y,vT,$u,la,ca,aK,lK,cK,CT,de,ue,Hu,$t,At=l(()=>{"use strict";$y=g(require("node:fs")),vT=g(require("node:os")),$u=g(require("node:path")),la={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},ca=e=>e.trim().length>0,aK=e=>{let t=$u.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},lK=()=>{let e=vT.default.homedir(),t=$u.default.join(e,".local","bin","agent");if($y.default.existsSync(t))return t;let r=$u.default.join(e,".local","bin","cursor-agent");return $y.default.existsSync(r)?r:la.cursorCommand},cK=e=>{let t=e.trim();return!ca(t)||t===la.cursorCommand?lK():t},CT=(e,t)=>aK(e)?t:["agent",...t],de=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",ue=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:ca(t)?t.trim():la.claudeCommand,codexCommand:ca(r)?r.trim():la.codexCommand,cursorCommand:cK(o),antigravityCommand:ca(n)?n.trim():la.antigravityCommand}},Hu=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:CT(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},$t=(e,t,r,o)=>{let n=t.trim();if(!ca(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:CT(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var qr,dK,Do,uK,ss,da=l(()=>{"use strict";qr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,dK=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:qr(s.inputTokens)+qr(s.outputTokens)+qr(s.cacheReadInputTokens)+qr(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Do=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=qr(a.input_tokens)+qr(a.cache_creation_input_tokens)+qr(a.cache_read_input_tokens),d=qr(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:dK(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},uK=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),ss=(e,t)=>{let r=Do(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??uK(r)}}});var Hy,pK,mK,Fy,Uy=l(()=>{"use strict";Hy=e=>e.toLocaleString("en-US"),pK=e=>e<.01?e.toFixed(4):e.toFixed(3),mK=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${pK(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Hy(e.inputTokens)} in / ${Hy(e.outputTokens)} out (${Hy(e.totalTokens)} total)`,t].join(`
`)},Fy=(e,t)=>{if(t===void 0)return e;let r=mK(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Fu,By=l(()=>{"use strict";Fu={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var jo,Gy,Uu,qy=l(()=>{"use strict";By();jo="auto",Gy=e=>({value:jo,label:`Auto (${Fu[e]})`}),Uu={anthropic:[Gy("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[Gy("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[Gy("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var is,ua,Bu,as=l(()=>{"use strict";By();qy();is=e=>{let t=e?.trim()??"";if(!(t.length===0||t===jo))return t},ua=(e,t)=>{let r=is(t);return r===void 0?Fu[e]:r},Bu=e=>{let t=is(e);return t===void 0?jo:t}});var Gu,gK,fK,qu,LT=l(()=>{"use strict";Gu={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},gK=e=>{let t=Gu[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Gu["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Gu["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Gu["gemini-2.0-flash"]:null},fK=(e,t,r)=>{let o=gK(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},qu=e=>{let t=fK(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var ls,hK,yK,SK,Vu,kT=l(()=>{"use strict";LT();ls=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),hK=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=ls(r.input_tokens),n=ls(r.output_tokens);return o===0&&n===0?null:qu({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},yK=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=ls(r.prompt_tokens),n=ls(r.completion_tokens);return o===0&&n===0?null:qu({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},SK=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=ls(r.promptTokenCount),n=ls(r.candidatesTokenCount);return o===0&&n===0?null:qu({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Vu=(e,t,r)=>e==="anthropic"?hK(t,r):e==="openai"?yK(t,r):SK(t,r)});var AK,Vy,bK,PK,wK,_K,vK,Ky,Jy=l(()=>{"use strict";as();kT();AK=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},Vy=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:ua(e,t.model)},bK=async e=>{let t=Vy("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=AK(o);n.length>0&&e.onChunk?.(n);let s=Vu("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},PK=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},wK=async e=>{let t=Vy("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=PK(o);n.length>0&&e.onChunk?.(n);let s=Vu("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},_K=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},vK=async e=>{let t=Vy("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=_K(n);s.length>0&&e.onChunk?.(s);let i=Vu("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},Ky=async e=>{try{return e.provider==="anthropic"?await bK(e):e.provider==="openai"?await wK(e):await vK(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Ze,pa=l(()=>{"use strict";Ze=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var WT,CK,Ku,Xy=l(()=>{"use strict";WT=g(require("node:path")),CK="writer-api-secrets.json",Ku=e=>WT.default.join(e,CK)});var Yy,TT,LK,Vr,Be,Kr=l(()=>{"use strict";Yy=g(require("node:fs"));as();Xy();TT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),LK=e=>{if(!TT(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=is(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},Vr=e=>{let t=Ku(e);if(!Yy.default.existsSync(t))return{};try{let r=JSON.parse(Yy.default.readFileSync(t,"utf8"));if(!TT(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=LK(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Be=(e,t)=>Vr(e)[t]??null});var Oe,ma=l(()=>{"use strict";Oe=e=>e==="api"?"api":"cli"});var ET,Ce,$o,cr=l(()=>{"use strict";ET=g(require("node:path"));pa();Kr();ma();Ce=e=>ET.default.dirname(e),$o=(e,t)=>{if(Oe(e.writerExecutionBackend)!=="api")return!1;let r=Ze(t);if(r===null)return!1;let o=Ce(e.layout.configPath),n=Be(o,r);return n!==null&&n.apiKey.length>0}});var ga,Zy=l(()=>{"use strict";Uy();Jy();pa();Kr();cr();ga=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Ze(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Ce(e.layout.configPath),a=Be(i,s);if(a===null){let d=Object.keys(Vr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await Ky({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:Fy(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var xT,cs,Qy=l(()=>{"use strict";xT=require("node:child_process");At();da();Zy();cr();cs=(e,t,r)=>new Promise(o=>{if(!de(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if($o(e,t)){ga(e,t,r).then(o);return}let n=$t(t,r,ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,xT.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=ss(i.join("")),p=a.join("").trim(),m=[d.output.trim(),p].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var RT=l(()=>{"use strict"});var IT=l(()=>{"use strict";Uy();Qy();Jy();RT();Kr();cr()});var OT,MT,NT,zT=l(()=>{"use strict";OT="claude",MT="codex",NT="cursor"});var DT,kK,eS,fa,Ju=l(()=>{"use strict";DT=g(require("node:path"));Dt();Ue();kK="ws://localhost:3000/api/agent-witch/ws",eS=e=>e.replace(/\/$/,""),fa=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return eS(t);let r=DT.default.basename(e.installDir);if(r===Ci.production)return Iu;let o=e.configWsUrl?.trim()??"";return r===Ci.localhost?o.length>0?eS(o):kK:o.length>0?eS(o):Iu}});var TK,tS,rS=l(()=>{"use strict";zT();Ju();ma();TK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),tS=e=>{if(!TK(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=fa({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??OT,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??MT,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??NT,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Oe(t.writerExecutionBackend),layout:e.layout}}}});var oS,nS,sS=l(()=>{"use strict";oS=g(require("node:fs"));J();rS();nS=e=>{let t=N(e);if(!oS.default.existsSync(t.configPath))return null;try{let r=JSON.parse(oS.default.readFileSync(t.configPath,"utf8")),o=tS({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var ha,jT=l(()=>{"use strict";ha=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var iS,EK,aS,$T=l(()=>{"use strict";iS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),EK=e=>{if(!iS(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!iS(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(m=>{if(!iS(m))return[];let S=typeof m.itemKey=="string"?m.itemKey.trim():"",f=typeof m.relativePath=="string"?m.relativePath:"",y=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:f,contentSha256:y}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},aS=EK});var HT,xK,Xu,lS=l(()=>{"use strict";HT=g(require("node:path")),xK=(e,t)=>{let r=t.trim();return HT.default.join(e,"components","store",r.slice(0,2),r)},Xu=xK});var FT,RK,cS,UT=l(()=>{"use strict";FT=g(require("node:fs"));lS();RK=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Xu(e.installDir,n.contentSha256);FT.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},cS=RK});var ya,ds,IK,dS,OK,uS,pS=l(()=>{"use strict";ya=g(require("node:fs")),ds=g(require("node:path"));lS();IK=(e,t)=>ds.default.join(e.installDir,"runs",t,"overlay"),dS=(e,t)=>ds.default.join(IK(e,t),".cursor"),OK=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=dS(e,t);ya.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Xu(e.installDir,i.contentSha256);if(!ya.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?ds.default.join(n,c):ds.default.join(n,i.itemKey);ya.default.mkdirSync(ds.default.dirname(d),{recursive:!0}),ya.default.copyFileSync(a,d)}return{ok:!0}},uS=OK});var mS,BT,MK,Sa,GT=l(()=>{"use strict";mS=g(require("node:fs")),BT=g(require("node:path")),MK=(e,t)=>{let r=BT.default.join(e.installDir,"runs",t);mS.default.existsSync(r)&&mS.default.rmSync(r,{recursive:!0,force:!0})},Sa=MK});var NK,gS,qT=l(()=>{"use strict";pS();NK=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=dS(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},gS=NK});var fS,zK,DK,jK,$K,HK,$,VT=l(()=>{"use strict";fS=g(require("node:fs"));Ju();J();ma();zK="claude",DK="codex",jK="cursor",$K="agy",HK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=N();if(!fS.default.existsSync(e.configPath))return null;try{let t=JSON.parse(fS.default.readFileSync(e.configPath,"utf8"));if(!HK(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=fa({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Oe(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:zK,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:DK,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:jK,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:$K,pairingToken:s,layout:e}}catch{return null}}});var Yu,KT,JT=l(()=>{"use strict";Yu=g(require("node:fs"));Xy();KT=(e,t)=>{let r=Ku(e);Yu.default.mkdirSync(e,{recursive:!0}),Yu.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Yu.default.chmodSync(r,384)}catch{}}});var Aa,XT,Zu=l(()=>{"use strict";Aa=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},XT=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Aa(t)}});var ba,FK,hS,yS,YT=l(()=>{"use strict";ba=g(require("node:fs"));Kr();JT();Zu();as();cr();FK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hS=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=XT(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?is(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},yS=e=>{let t=Ce(e.configPath),r={};if(ba.default.existsSync(e.configPath))try{let n=JSON.parse(ba.default.readFileSync(e.configPath,"utf8"));FK(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,ba.default.mkdirSync(t,{recursive:!0}),ba.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=hS(hS(hS(Vr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);KT(t,o)}});var Qu,SS=l(()=>{"use strict";Qu={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var AS,ZT=l(()=>{"use strict";pa();Kr();cr();cr();AS=(e,t)=>{if($o(e,t))return!1;let r=Ze(t);if(r===null)return!1;let o=Ce(e.layout.configPath),n=Be(o,r);return n===null||n.apiKey.trim().length===0}});var QT,bS,PS=l(()=>{"use strict";QT=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},bS=async e=>{let t=QT(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=QT(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var UK,wS,eE=l(()=>{"use strict";re();sS();PS();UK=1e4,wS=()=>bS({listProfileEmails:Pu,readConfig:nS,pollIntervalMs:UK,logWaiting:e=>{console.error(e)}})});var me=l(()=>{"use strict";Qy();IT();sS();Ju();jT();$T();UT();pS();GT();qT();ma();VT();YT();Kr();cr();Zu();as();SS();Zy();cr();ZT();pa();Kr();eE();rS();PS()});var ep,tE,BK,GK,rE,tp,Pa,rp,wa=l(()=>{"use strict";ep=g(require("node:fs")),tE=g(require("node:path")),BK="wake-port.json",GK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rE=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,tp=e=>tE.default.join(e,BK),Pa=e=>{let t=tp(e);if(!ep.default.existsSync(t))return null;try{let r=JSON.parse(ep.default.readFileSync(t,"utf8"));if(GK(r)&&rE(r.wakePort))return r.wakePort}catch{return null}return null},rp=(e,t)=>{if(!rE(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=tp(e);ep.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Tse,Ese,xse,bt,oE,_a=l(()=>{"use strict";wa();Re();wa();Tse=gt(),Ese=`${_e()}-wake`,xse=_e(),bt=()=>{let e=T(),t=Pa(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return gt()},oE=e=>{let t=T();Pa(t)===null&&rp(t,e)}});var nE=l(()=>{"use strict";Dy();re();_T();me();_a()});var _S,va,Ca,sE=l(()=>{"use strict";_S=g(require("node:os"));nE();va=()=>{let e=te();return{ok:!0,port:bt(),hostname:_S.default.hostname(),profileCount:e.length}},Ca=()=>{let e=te(),t=$()?.pairingToken.trim()??"",r=t.length>0?os(t):null,o=jy();return{hostname:_S.default.hostname(),port:bt(),tokenHash:r,tokenHashes:o.length>0?o:r!==null?[r]:[],profiles:e.map(n=>({email:n.profileEmail,launchAgentLabel:n.launchAgentLabel}))}}});var vS=l(()=>{"use strict";sE()});var iE,aE,lE,op,us=l(()=>{"use strict";iE="materialization.json",aE="backups",lE=".gitignore",op=e=>`harness-set:${e.trim()}`});var cE,dE,np,uE=l(()=>{"use strict";cE=g(require("node:crypto")),dE=g(require("node:fs")),np=e=>{try{let t=dE.default.readFileSync(e);return cE.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Jr,Ho,qK,pE,CS,mE=l(()=>{"use strict";Jr=g(require("node:fs")),Ho=g(require("node:path"));uE();qK=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Ho.default.join(t,n,o);return Jr.default.mkdirSync(Ho.default.dirname(s),{recursive:!0}),Jr.default.copyFileSync(r,s),Ho.default.relative(e,s).replaceAll("\\","/")},pE=e=>{let t=Ho.default.join(e.repoRoot,e.repoRelativeDestination),r=np(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(Jr.default.existsSync(t)){let n=np(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=qK(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Jr.default.mkdirSync(Ho.default.dirname(t),{recursive:!0}),Jr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Jr.default.mkdirSync(Ho.default.dirname(t),{recursive:!0}),Jr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},CS=e=>{let t=np(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var LS,gE,sp,kS=l(()=>{"use strict";LS=g(require("node:fs"));us();gE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sp=e=>{if(!LS.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(LS.default.readFileSync(e,"utf8"));if(gE(t)&&t.version===1&&gE(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var Xr,ip,fE,hE=l(()=>{"use strict";Xr=g(require("node:fs")),ip=g(require("node:path"));us();fE=e=>{let t=new Set(e.setSlugs.map(s=>op(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=ip.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=ip.default.join(e.repoRoot,i.backupPath);Xr.default.existsSync(c)?(Xr.default.mkdirSync(ip.default.dirname(a),{recursive:!0}),Xr.default.copyFileSync(c,a),o.push(s)):Xr.default.existsSync(a)&&Xr.default.rmSync(a,{force:!0})}else Xr.default.existsSync(a)&&Xr.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var WS,ap,TS=l(()=>{"use strict";WS=g(require("node:path"));us();ap=e=>({ledgerFilePath:WS.default.join(e.metaDirPath,iE),backupsDirPath:WS.default.join(e.metaDirPath,aE)})});var ES,yE,SE=l(()=>{"use strict";ES=g(require("node:path")),yE=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return ES.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return ES.default.posix.join(s,e,n)}});var xS,AE,RS,bE=l(()=>{"use strict";xS=g(require("node:fs")),AE=g(require("node:path")),RS=(e,t)=>{xS.default.mkdirSync(AE.default.dirname(e),{recursive:!0}),xS.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var IS,VK,st,ps=l(()=>{"use strict";IS=g(require("node:os")),VK=e=>{let t=e.trim();return t.startsWith("~/")?`${IS.default.homedir()}${t.slice(1)}`:t==="~"?IS.default.homedir():t},st=VK});var lp,PE,KK,wE,_E=l(()=>{"use strict";lp=g(require("node:fs")),PE=g(require("node:path"));us();Wo();KK=`*
!${vu}
`,wE=e=>{let t=PE.default.join(e,lE);lp.default.existsSync(t)||(lp.default.mkdirSync(e,{recursive:!0}),lp.default.writeFileSync(t,KK))}});var Fo,it,Uo=l(()=>{"use strict";Fo=g(require("node:path"));Wo();ps();it=e=>{let t=st(e),r=Fo.default.join(t,OW);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Fo.default.join(r,"rag"),memoryDirPath:Fo.default.join(r,MW),reportsDirPath:Fo.default.join(r,zW),metaFilePath:Fo.default.join(r,vu),ragChunksFilePath:Fo.default.join(r,"rag",NW)}}});var Ht,CE,JK,XK,Qe,OS=l(()=>{"use strict";Ht=g(require("node:fs")),CE=g(require("node:path"));Wo();_E();Uo();JK=(e,t)=>{if(Ht.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Ht.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},XK=e=>{Ht.default.existsSync(e.ragChunksFilePath)||Ht.default.writeFileSync(e.ragChunksFilePath,"");let t=CE.default.join(e.memoryDirPath,Vn);Ht.default.existsSync(t)||Ht.default.writeFileSync(t,"")},Qe=e=>{let t=it(e.projectFolderPath);return Ht.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Ht.default.mkdirSync(t.ragDirPath,{recursive:!0}),Ht.default.mkdirSync(t.memoryDirPath,{recursive:!0}),wE(t.metaDirPath),JK(t,e),XK(t),{ok:!0,layout:t}}});var LE,kE,WE,TE,cp,dp=l(()=>{"use strict";LE="components",kE="store",WE="versions",TE="installed.json",cp=e=>`harness-set:${e.trim()}`});var MS,EE,up,NS=l(()=>{"use strict";MS=g(require("node:fs")),EE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),up=e=>{if(!MS.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(MS.default.readFileSync(e,"utf8"));if(EE(t)&&t.version===1&&EE(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var ka,ms,pp=l(()=>{"use strict";ka=g(require("node:path"));dp();ms=e=>{let t=ka.default.join(e,LE);return{componentsRootDir:t,storeDir:ka.default.join(t,kE),versionsDir:ka.default.join(t,WE),installedFilePath:ka.default.join(t,TE)}}});var zS,xE,mp,gp,fp=l(()=>{"use strict";zS=g(require("node:crypto")),xE=g(require("node:fs")),mp=e=>zS.default.createHash("sha256").update(e,"utf8").digest("hex"),gp=e=>{try{let t=xE.default.readFileSync(e);return zS.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var DS,RE,IE,OE=l(()=>{"use strict";DS=g(require("node:fs")),RE=g(require("node:path")),IE=(e,t)=>{DS.default.mkdirSync(RE.default.dirname(e),{recursive:!0}),DS.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var jS,$S,ME,NE=l(()=>{"use strict";jS=g(require("node:fs")),$S=g(require("node:path")),ME=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=$S.default.join(e,r),n=$S.default.join(o,`${t.versionId}.json`);jS.default.mkdirSync(o,{recursive:!0}),jS.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var hp,zE,DE,jE=l(()=>{"use strict";hp=g(require("node:fs")),zE=g(require("node:path"));fp();DE=e=>{let t=mp(e.content),r=zE.default.join(e.storeDir,t);return hp.default.existsSync(r)||(hp.default.mkdirSync(e.storeDir,{recursive:!0}),hp.default.writeFileSync(r,e.content)),t}});var HS,$E,YK,yp,FS=l(()=>{"use strict";HS=g(require("node:fs")),$E=g(require("node:path"));dp();NS();pp();fp();OE();NE();jE();YK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yp=e=>{let t=ms(e.installDir),r=cp(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!YK(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=$E.default.join(e.harnessRootDir,a);if(!HS.default.existsSync(c))continue;let d=HS.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:gp(c);if(p!==null){if(mp(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);DE({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;ME(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=up(t.installedFilePath);IE(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var BS,US,HE,FE=l(()=>{"use strict";BS=g(require("node:fs"));FS();NS();pp();US=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),HE=e=>{if(!BS.default.existsSync(e.harnessManifestPath))return;let t=ms(e.installDir),r=up(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(BS.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!US(o)||o.version!==1||!US(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!US(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];yp({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var GS,UE,BE,GE=l(()=>{"use strict";GS=g(require("node:fs")),UE=g(require("node:path")),BE=e=>{let t=e.componentId.replaceAll("/","_"),r=UE.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!GS.default.existsSync(r))return null;try{let o=JSON.parse(GS.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Sp,Ap,qE,VE=l(()=>{"use strict";Sp=g(require("node:fs")),Ap=g(require("node:path"));dp();FE();GE();pp();fp();qE=e=>{HE({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=ms(e.layout.installDir),r=cp(e.setSlug),o=BE({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Ap.default.join(t.storeDir,i.contentSha256);if(Sp.default.existsSync(a)&&gp(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Ap.default.join(e.layout.harnessRootDir,n):Ap.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Sp.default.existsSync(s))return null;try{if(!Sp.default.statSync(s).isFile())return null}catch{return null}return s}});var KE,ZK,QK,Yr,bp=l(()=>{"use strict";kS();TS();Uo();KE="harness-set:",ZK=e=>{let t=e.trim();if(!t.startsWith(KE))return null;let r=t.slice(KE.length).trim();return r.length>0?r:null},QK=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=ZK(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Yr=e=>{let t=it(e),{ledgerFilePath:r}=ap(t),o=sp(r);return QK(o)}});var Pp,qS,Wa,e4,dr,Ta,gs=l(()=>{"use strict";Pp=g(require("node:fs")),qS=g(require("node:os")),Wa=g(require("node:path")),e4=()=>Pp.default.realpathSync(Wa.default.resolve(qS.default.homedir())),dr=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Wa.default.join(qS.default.homedir(),t.slice(1)):t,o;try{o=Pp.default.realpathSync(Wa.default.resolve(r))}catch{return null}let n=e4();return o===n||o.startsWith(`${n}${Wa.default.sep}`)?o:null},Ta=e=>{let t=dr(e);if(t===null)return null;try{if(!Pp.default.statSync(t).isFile())return null}catch{return null}return t}});var VS,KS=l(()=>{"use strict";VS=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var _p,JE,wp,t4,Ea,JS=l(()=>{"use strict";_p=g(require("node:fs")),JE=g(require("node:path"));us();mE();kS();hE();TS();SE();bE();ps();OS();VE();bp();gs();KS();wp=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),t4=e=>{if(!_p.default.existsSync(e))return null;try{let t=JSON.parse(_p.default.readFileSync(e,"utf8"));if(wp(t)&&t.version===1)return t}catch{return null}return null},Ea=e=>{let t=[...new Set(e.setSlugs.map(b=>b.trim()).filter(b=>b.length>0))],r=st(e.projectFolderPath),o=dr(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=_p.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Qe({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=ap(s.layout),d=Yr(o).filter(b=>!t.includes(b)),p=sp(i),m=0;if(d.length>0){let b=fE({repoRoot:o,setSlugs:d,ledger:p});p=b.ledger,m=b.summary.removedPaths.length}if(t.length===0)return RS(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let S=t4(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let f=wp(S.sets)?S.sets:{},y=0,u=0,A=0;for(let b of t){let h=f[b];if(!wp(h))return{ok:!1,errorMessage:`Harness set "${b}" is not installed locally.`};let w=typeof h.version=="number"?String(h.version):"1",_=op(b),C=Array.isArray(h.items)?h.items:[];for(let k of C){if(!wp(k))continue;let W=typeof k.path=="string"?k.path.trim():"";if(W.length===0)continue;let x=VS(W);if(x===null)continue;let I=yE(b,x),M=JE.default.posix.join(".cursor",I).replaceAll("\\","/"),H=typeof k.id=="string"?k.id.trim():"",q=qE({layout:e.layout,setSlug:b,setVersion:typeof h.version=="number"?h.version:1,manifestItemPath:W,manifestItemId:H});if(q===null)continue;let B=pE({repoRoot:o,backupsDir:a,repoRelativeDestination:M,sourceAbsolutePath:q,componentId:_,versionId:w,ledger:p});if(B.kind==="skipped_unchanged"){u+=1;continue}if(B.kind==="backed_up_user_file"){A+=1,y+=1,p={version:1,entries:{...p.entries,[M]:CS({componentId:_,versionId:w,sourceAbsolutePath:q,backupPath:B.backupPath})}};continue}y+=1,p={version:1,entries:{...p.entries,[M]:CS({componentId:_,versionId:w,sourceAbsolutePath:q})}}}}return y===0&&u===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(RS(i,p),{ok:!0,writtenFileCount:y,skippedFileCount:u,backedUpFileCount:A,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var XE,vp,r4,o4,n4,s4,i4,a4,l4,c4,d4,xa,Cp=l(()=>{"use strict";XE=g(require("node:crypto")),vp=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},r4=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},o4=(e,t)=>{let r=r4(t),o=vp(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},n4=(e,t,r)=>{let o=o4(t,r);return`shared/items/${e}/${o}`},s4=["rules","skills","commands","instructions","agents"],i4=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),a4=(e,t)=>[...e.filter(o=>o.id!==t.id),t],l4=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},c4=e=>XE.default.createHash("sha256").update(e,"utf8").digest("hex"),d4=e=>({id:e.id,kind:e.kind,title:e.title,path:n4(e.id,e.kind,e.title),contentSha256:c4(e.content)}),xa=e=>{let t=new Date().toISOString(),r=e.existingManifest??i4(e.hostname,t),o=vp(e.bundle.slug),n=l4(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...s4.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let m=d4(p);return{files:[...d.files,{relativePath:m.path,content:p.content}],nextItems:a4(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var Zr,YE,Lp,u4,Bo,XS=l(()=>{"use strict";Zr=g(require("node:fs")),YE=g(require("node:os")),Lp=g(require("node:path"));Cp();u4=e=>{if(!Zr.default.existsSync(e))return null;try{let t=JSON.parse(Zr.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Bo=e=>{try{let t=u4(e.layout.harnessManifestPath),r=xa({bundle:e.bundle,hostname:YE.default.hostname(),existingManifest:t});Zr.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)Zr.default.mkdirSync(Lp.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Lp.default.join(e.layout.harnessRootDir,o.relativePath);Zr.default.mkdirSync(Lp.default.dirname(n),{recursive:!0}),Zr.default.writeFileSync(n,o.content)}return Zr.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var YS,ZE=l(()=>{"use strict";XS();JS();YS=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=Bo({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Ea({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var QE,ex=l(()=>{"use strict";QE=["rule","skill","command","instruction","agent"]});var tx,p4,m4,Ft,ZS=l(()=>{"use strict";ex();tx=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),p4=e=>typeof e=="string"&&QE.includes(e),m4=e=>{if(!tx(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!p4(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Ft=e=>{if(!tx(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=m4(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var rx,g4,QS,ox=l(()=>{"use strict";rx=require("node:zlib");ZS();g4="x-agent-witch-token",QS=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[g4]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,rx.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Ft(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var tA,eA,Qr,nx=l(()=>{"use strict";tA=g(require("node:fs")),eA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qr=e=>{if(!tA.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(tA.default.readFileSync(e.harnessManifestPath,"utf8"));if(!eA(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=eA(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!eA(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var kp,sx=l(()=>{"use strict";kp=()=>"~"});var ix,ax,lx=l(()=>{"use strict";ix=require("node:crypto"),ax=e=>`local-${(0,ix.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var rA,cx=l(()=>{"use strict";rA=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Ra,Wp,oA=l(()=>{"use strict";Ra=g(require("node:path")),Wp=e=>{let t=Ra.default.dirname(e),r=Ra.default.basename(t);return r==="agents"?Ra.default.basename(Ra.default.dirname(t)):r}});var Ia,ur,dx,f4,h4,y4,Tp,ux,nA=l(()=>{"use strict";Ia=g(require("node:fs")),ur=g(require("node:path"));lx();cx();oA();dx=new Set(["node_modules",".git","dist","build",".next","coverage"]),f4=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},h4=(e,t)=>{let r=ur.default.basename(t);if(e==="skill"){let o=t.split(ur.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},y4=e=>{let t=[],r=(n,s)=>{let i;try{i=Ia.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&dx.has(a.name))continue;let c=ur.default.join(n,a.name),d=s?ur.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;rA(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=ur.default.join(e,n);Ia.default.existsSync(s)&&r(s,n)}let o=ur.default.join(e,"skills");return Ia.default.existsSync(o)&&r(o,"skills"),t},Tp=e=>{let t=y4(e);if(t.length===0)return null;let r=ur.default.dirname(e),o=Wp(e),n=f4(o),s=t.map(i=>{let a=rA(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:ax(i.absolutePath),kind:a,title:h4(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},ux=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Ia.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||dx.has(a.name))continue;let c=ur.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var px,sA,S4,iA,mx=l(()=>{"use strict";px=g(require("node:fs")),sA=g(require("node:path"));nA();gs();S4=e=>{let t=dr(e.trim());if(t===null)return null;if(sA.default.basename(t)===".cursor")return t;let r=sA.default.join(t,".cursor");try{if(px.default.statSync(r).isDirectory())return dr(r)}catch{return null}return null},iA=e=>{let t=S4(e.projectPath);if(t===null)return null;let r=Tp(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var gx,A4,Ep,aA,fx=l(()=>{"use strict";gx=g(require("node:path"));nA();gs();oA();A4=5,Ep=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},aA=e=>{let t=dr(e.scanRoot.trim());if(t===null)return Ep(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of ux(t,A4,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=dr(s);if(i===null)continue;let a=Wp(i);Ep(e.response,"folder",{cursorDir:i,groupName:a,repoPath:gx.default.dirname(i)});let c=Tp(i);c!==null&&(r.push(c),Ep(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Ep(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var hx,yx,Sx=l(()=>{"use strict";hx=g(require("node:path")),yx=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:hx.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var je,Ax,lA,b4,cA,dA,xp,uA,Oa,bx=l(()=>{"use strict";je=g(require("node:fs")),Ax=g(require("node:os")),lA=g(require("node:path"));Cp();FS();gs();Sx();b4=e=>{if(!je.default.existsSync(e))return null;try{let t=JSON.parse(je.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},cA=e=>{let t=e.hostname??Ax.default.hostname(),r=b4(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let m=Ta(p.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let S=je.default.readFileSync(m,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:S,setSlugs:[i.slug]})}let d=xa({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{je.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)je.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=lA.default.join(e.layout.harnessRootDir,i.relativePath);je.default.mkdirSync(lA.default.dirname(a),{recursive:!0}),je.default.writeFileSync(a,i.content)}je.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=vp(i.slug),d=r.sets[c];d!==void 0&&yp({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},dA="reveal-cache.json",xp=(e,t)=>{je.default.mkdirSync(e.harnessRootDir,{recursive:!0}),je.default.writeFileSync(`${e.harnessRootDir}/${dA}`,`${JSON.stringify(t,null,2)}
`)},uA=e=>{let t=`${e.harnessRootDir}/${dA}`;je.default.existsSync(t)&&je.default.unlinkSync(t)},Oa=e=>{let t=`${e.harnessRootDir}/${dA}`;if(!je.default.existsSync(t))return null;try{let r=JSON.parse(je.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return yx(r)}catch{return null}return null}});var Go=l(()=>{"use strict";JS();ZE();KS();XS();ox();ZS();Cp();nx();sx();mx();gs();fx();bx()});var pA,Px=l(()=>{"use strict";Go();Re();pA=e=>{let t=N(e.profileEmail);return Bo({bundle:e.bundle,layout:t})}});var wx=l(()=>{"use strict";Px();Go()});var P4,_x,w4,vx,qo,Rp,Cx=l(()=>{"use strict";P4=["agentwitch.com","www.agentwitch.com"],_x=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,w4=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},vx=e=>{let t=w4(e);return!!(P4.includes(t)||_x.test(e.trim().toLowerCase()))},qo=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return vx(r)?_x.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Rp=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:qo(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Ma=l(()=>{"use strict";Cx()});var pr,Na=l(()=>{"use strict";pr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var za,Lx=l(()=>{"use strict";wx();Ma();Na();za=e=>{if(!pr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Ft(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!qo(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=pA({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var mA=l(()=>{"use strict";Lx()});var _4,fs,gA=l(()=>{"use strict";_4=e=>e==="hourly"||e==="daily"||e==="weekdays",fs=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!_4(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Da,Ip,kx,Wx,fA,Pt,Op,Mp,Np,zp,Dp=l(()=>{"use strict";Da=g(require("node:fs")),Ip=g(require("node:path"));gA();kx="automations.json",Wx=e=>e.profileEmail!==null?Ip.default.join(e.installDir,"profiles",e.profileEmail,kx):Ip.default.join(e.installDir,kx),fA=()=>({version:1,automations:[]}),Pt=e=>{let t=Wx(e);if(!Da.default.existsSync(t))return fA();try{let r=JSON.parse(Da.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?fA():{version:1,automations:r.automations.flatMap(n=>{let s=fs(n);return s!==null?[s]:[]})}}catch{return fA()}},Op=(e,t)=>{let r=Wx(e);Da.default.mkdirSync(Ip.default.dirname(r),{recursive:!0}),Da.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Mp=(e,t)=>{Op(e,{version:1,automations:t})},Np=(e,t)=>{let o=Pt(e).automations.filter(n=>n.id!==t.id);Op(e,{version:1,automations:[...o,t]})},zp=(e,t)=>Pt(e).automations.find(r=>r.id===t)??null});var Me,mr=l(()=>{"use strict";Me="x-agent-witch-token"});var hA=l(()=>{"use strict";Mu();zu()});var X,Vo,yA,ja,SA,v4,AA,$a,Ha,bA,Fa=l(()=>{"use strict";mr();hA();X=e=>{let t=ve(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Vo=e=>({[Me]:e,"Content-Type":"application/json"}),yA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Vo(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},ja=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Vo(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},SA=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Vo(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},v4=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},AA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:Vo(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},$a=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Vo(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return v4(r)}catch{return null}},Ha=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:Vo(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},bA=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Vo(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Ko,Tx,Ex,C4,PA,xx,wA=l(()=>{"use strict";Ko=g(require("node:fs")),Tx=g(require("node:path")),Ex=e=>Tx.default.join(e.harnessRootDir,"projects-registry.json"),C4=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),PA=e=>{let t=Ex(e);if(!Ko.default.existsSync(t))return[];try{let r=JSON.parse(Ko.default.readFileSync(t,"utf8"));return C4(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},xx=e=>{let t=Ex(e);if(!Ko.default.existsSync(t))return;let r=`${t}.migrated`;if(Ko.default.existsSync(r)){Ko.default.unlinkSync(t);return}Ko.default.renameSync(t,r)}});var Rx,L4,k4,Ix,Ox=l(()=>{"use strict";ps();Rx=e=>st(e),L4=e=>new Set(e.map(t=>Rx(t.folderPath))),k4=e=>new Set(e.map(t=>t.id)),Ix=(e,t)=>{let r=L4(t),o=k4(t),n=[],s=new Set;for(let i of e){let a=Rx(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var _A,vA=l(()=>{"use strict";Fa();wA();Ox();_A=async(e,t)=>{let r=PA(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await $a(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=Ix(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await AA(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&xx(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var CA,Jo,jp=l(()=>{"use strict";CA=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),Jo=(e,t)=>e.find(r=>r.id===t)??null});var hs,$p=l(()=>{"use strict";Fa();vA();jp();hs=async(e,t)=>{t!==void 0&&await _A(t,e);let r=X({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await $a(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=CA(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var Mx=l(()=>{"use strict"});var W4,T4,Hp,LA=l(()=>{"use strict";W4="Default",T4=e=>e.trim().toLowerCase()===W4.toLowerCase(),Hp=T4});var Le,Nx,E4,x4,R4,I4,ys,kA=l(()=>{"use strict";LA();Le=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Nx=(e,t)=>e.length===0?`<p class="empty">${Le(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Le(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Le(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,E4=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,x4=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Le(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,R4=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?x4(e.project):E4();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${Le(o.slug)}"${t.size===0||t.has(o.slug)?" checked":""} />
            <span><strong>${Le(o.name)}</strong> <span class="muted mono">(${Le(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`<form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${Le(e.project.id)}" />
        <p class="field-label">Installed</p>
        <p class="lede">Check the sets to write into this repo&apos;s <code>.cursor</code> tree, then pull.</p>
        ${r}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`},I4=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Le(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Le(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},ys=e=>{let t=e.flashError?`<div class="alert-error">${Le(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Le(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(p,m)=>`<a class="project-tab${e.activeTab===p?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${p}">${Le(m)}</a>`,n=e.composition?.items.filter(p=>p.kind==="workflow")??[],s=e.composition?.items.filter(p=>p.kind==="agent")??[],i="";e.activeTab==="harness"?i=R4({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=Nx(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=Nx(s,"No agents installed for this project yet."):i=I4({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});let a=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}?rename=1`,c=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${Le(a)}" target="_blank" rel="noopener noreferrer">Rename in Agent Witch Cloud\u2026</a>
    </div>`,d=Hp(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from Agent Witch Cloud only. The folder on this Mac is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from Agent Witch Cloud? Your repo folder on this Mac will stay.');">
          <input type="hidden" name="projectId" value="${Le(e.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Le(e.project.name)}</h1>
      <p class="muted mono">${Le(e.project.projectFolderPath)}</p>
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
    </section>${d}`}});var O4,M4,zx,Dx=l(()=>{"use strict";Go();mr();O4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),M4=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[Me]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!O4(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Ft(n);return s===null?[]:[s]})}catch{return null}},zx=M4});var jx,WA,$x=l(()=>{"use strict";me();Go();kA();$p();Dx();jp();bp();Fa();Dt();jx=e=>({kind:"page",title:e.project.name,body:ys({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Qr(e.layout),linkedSetSlugs:Yr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),WA=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let o=await hs(r,e.layout),n=Jo(o.projects,t);if(n===null)return{kind:"not_found"};let s=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??yt,a=s===null?null:await zx(s,n.id);if(a===null)return jx({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=YS({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return jx({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await Ha(s,n.id,c.appliedSetSlugs),p=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${p.toString()}`}}});var N4,TA,Hx=l(()=>{"use strict";N4=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,TA=N4});var Fx,Ux,z4,D4,Fp,Up,Bx=l(()=>{"use strict";Fx=require("node:child_process"),Ux=require("node:util"),z4=(0,Ux.promisify)(Fx.execFile),D4=()=>{let e={...process.env};return delete e.GIT_DIR,delete e.GIT_WORK_TREE,delete e.GIT_INDEX_FILE,e},Fp=async(e,t)=>{try{let{stdout:r}=await z4("git",t,{cwd:e,env:D4(),maxBuffer:1048576});return r.trim()}catch{return null}},Up=async e=>{let t=await Fp(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Fp(e,["rev-parse","--abbrev-ref","HEAD"]),o=await Fp(e,["status","--porcelain"]),n=await Fp(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var EA,Gx=l(()=>{"use strict";EA=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var j4,xA,qx=l(()=>{"use strict";j4=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},xA=j4});var $4,RA,Vx=l(()=>{"use strict";mr();$4=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[Me]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},RA=$4});var Kx,eo,Jx=l(()=>{"use strict";Kx=require("node:child_process"),eo=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,Kx.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var Xx=l(()=>{"use strict";$p()});var Ua,Yx=l(()=>{"use strict";mr();Ua=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[Me]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var IA,Zx=l(()=>{"use strict";mr();IA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[Me]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var Ut=l(()=>{"use strict";$p();jp();Mx();ps();OS();$x();bp();Hx();Bx();Gx();qx();Vx();Jx();Xx();Yx();Zx();vA();wA();Fa()});var Bp,Ba,Qx,OA,Xo,MA=l(()=>{"use strict";Bp=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},Ba=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Bp(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},Qx=e=>e>=1&&e<=5,OA=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Bp(t,"UTC")},Xo=e=>{let t=e.from??new Date,r=Bp(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Ba(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=Ba(r,e.timeZone,o,0),s=Bp(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?Ba(OA(r),e.timeZone,o,0):n;if(!i&&Qx(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=OA(a),Qx(a.weekday))return Ba(a,e.timeZone,o,0);return Ba(OA(r),e.timeZone,o,0)}});var eR,NA,gr,zA=l(()=>{"use strict";eR=require("node:crypto");me();Ut();MA();Dp();NA=!1,gr=async e=>{if(NA)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=X({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=zp(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};NA=!0;let n=(0,eR.randomUUID)();try{let s=await cs(t,"claude-cli",o.prompt);await bA(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=Xo({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return Np(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{NA=!1}}});var Gp,tR=l(()=>{"use strict";me();zA();Dp();Gp=async()=>{let e=$();if(e===null)return;let t=Pt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await gr(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var Ga=l(()=>{"use strict";Dp();tR();zA();MA()});var rR=l(()=>{"use strict";Ga()});var oR=l(()=>{"use strict";gA()});var nR=l(()=>{"use strict";oR()});var DA=l(()=>{"use strict";Ga()});var H4,F4,qa,jA=l(()=>{"use strict";rR();nR();DA();Re();H4=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),F4=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Xo({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Xo({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},qa=e=>{let t=H4(e.profileEmail),r=Pt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=fs(s);return i!==null?[F4(i,o.get(i.id))]:[]});return Mp(t,n),{ok:!0,writtenCount:n.length}}});var $A=l(()=>{"use strict";Ga()});var sR=l(()=>{"use strict";me()});var iR=l(()=>{"use strict";jA();$A();DA();sR()});var aR,Va,Ka,Ja,lR=l(()=>{"use strict";aR=g(require("node:os"));iR();Ma();Na();Va=e=>{if(!pr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!qo(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=qa({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Ka=async e=>{if(!pr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:qo(t)?gr(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Ja=()=>{let e=$(),t=e!==null?Pt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:aR.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var HA=l(()=>{"use strict";lR()});var qp=l(()=>{"use strict";re()});var Vp=l(()=>{"use strict";re()});var Kp,dR,uR,cR,U4,B4,Ss,FA=l(()=>{"use strict";Kp=g(require("node:fs")),dR=g(require("node:os")),uR=g(require("node:path"));qp();Vp();wa();Re();cR=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},U4=e=>uR.default.join(dR.default.homedir(),"Library","LaunchAgents",`${e}.plist`),B4=async e=>Kp.default.existsSync(U4(e))?(await xe(e)).ok:!1,Ss=async(e=T())=>{let t=Kp.default.existsSync(tp(e)),r=!Kp.default.existsSync(nr(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Pa(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await cR(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${_e(e)}-wake`;await B4(i)&&s.push(i);for(let c of te(e))(await xe(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await cR(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var pR=l(()=>{"use strict";re()});var As,Xa=l(()=>{"use strict";As="connection-health.json"});var Yo,Jp,G4,Ya,ke,UA,Xp,$e,Yp=l(()=>{"use strict";Yo=g(require("node:fs")),Jp=g(require("node:path"));Xa();G4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ya=e=>e.profileEmail===null?Jp.default.join(e.installDir,As):Jp.default.join(e.installDir,"profiles",e.profileEmail,As),ke=e=>{let t=Ya(e);if(!Yo.default.existsSync(t))return null;try{let r=JSON.parse(Yo.default.readFileSync(t,"utf8"));return!G4(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},UA=e=>{let t=Ya(e);Yo.default.existsSync(t)&&Yo.default.rmSync(t,{force:!0})},Xp=(e,t)=>{let r=Ya(e),o=ke(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Yo.default.mkdirSync(Jp.default.dirname(r),{recursive:!0}),Yo.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},$e=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var Za,mR=l(()=>{"use strict";Xa();Yp();Za=(e,t)=>{if(!t.socketOpen)return!1;let r=ke(e);return r===null?!1:!$e(r,t.staleAfterMs??12e4,t.nowMs)}});var BA,gR=l(()=>{"use strict";Yp();BA=(e,t)=>!(e!==null&&!$e(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var bs=l(()=>{"use strict";Yp();mR();gR();Xa()});var GA=l(()=>{"use strict";bs();re()});var qA=l(()=>{"use strict";bs()});var VA=l(()=>{"use strict";re()});var hR,fR,Qa,KA=l(()=>{"use strict";hR=g(require("node:fs"));Dt();qp();Vp();Re();fR=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},Qa=async(e=T())=>{if(!hR.default.existsSync(nr(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await fR())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of te(e))(await xe(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await fR();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var yR=l(()=>{"use strict";re()});var SR,Zo,JA,q4,V4,K4,AR,J4,bR,Ps,Zp=l(()=>{"use strict";SR=require("node:crypto"),Zo=g(require("node:fs")),JA=g(require("node:path"));Re();q4="watchdog-log.ndjson",V4=200,K4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),AR=(e=T())=>{let t=N(),r=t.installDir===e?t.logsDir:qn({installDir:e,profileEmail:t.profileEmail});return JA.default.join(r,q4)},J4=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!K4(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},bR=(e,t=T())=>{let r={id:(0,SR.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=AR(t);Zo.default.mkdirSync(JA.default.dirname(o),{recursive:!0});let n=Zo.default.existsSync(o)?Zo.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-V4+1)),JSON.stringify(r)];return Zo.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Ps=(e=20,t=T())=>{let r=AR(t);if(!Zo.default.existsSync(r))return[];let o=Zo.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=J4(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var XA,YA,ZA,QA=l(()=>{"use strict";Ue();XA=So.watchdogReinstallState,YA=900*1e3,ZA=3e3});var PR=l(()=>{"use strict";QA()});var wR={};It(wR,{verifyAgentWitchReviveAfterKickstart:()=>Y4});var X4,Y4,_R=l(()=>{"use strict";PR();qA();VA();Re();X4=e=>new Promise(t=>{setTimeout(t,e)}),Y4=async e=>{if(await X4(e.verifyDelayMs??ZA),!await vo(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),o=ke(r);return!$e(o,e.staleAfterMs)}});var el,eb,Z4,vR,CR,tb,rb,ob=l(()=>{"use strict";el=g(require("node:fs")),eb=g(require("node:path"));J();QA();Z4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vR=e=>eb.default.join(e,XA),CR=(e=T())=>{let t=vR(e);if(!el.default.existsSync(t))return null;try{let r=JSON.parse(el.default.readFileSync(t,"utf8"));return!Z4(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},tb=(e=T(),t=Date.now())=>{let r=CR(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=YA:!0},rb=(e=T(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=vR(e);return el.default.mkdirSync(eb.default.dirname(o),{recursive:!0}),el.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var nb,LR=l(()=>{"use strict";re();ob();nb=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!tb())return{attempted:!1,ok:!1,targets:e};rb();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await xe(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var kR=l(()=>{"use strict";ob();LR()});var sb=l(()=>{"use strict";jt()});var WR=l(()=>{"use strict";jt()});var TR,ws,ER,xR,RR,Q4,e8,IR,t8,r8,OR,MR=l(()=>{"use strict";TR=require("node:child_process"),ws=g(require("node:fs")),ER=g(require("node:os")),xR=g(require("node:path")),RR=require("node:util");sb();WR();Re();Q4=(0,RR.promisify)(TR.execFile),e8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),IR=e=>{let t=ft(e),r=t===null?N():N(t);if(!ws.default.existsSync(r.configPath))return null;try{let o=JSON.parse(ws.default.readFileSync(r.configPath,"utf8"));return!e8(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},t8=e=>IR(e)?.wsUrl??null,r8=e=>{let t=t8(e);return t!==null?ve(t):Ie(e)?.appOrigin??null},OR=async e=>{let t=e?.installDir??T(),r=IR(t),o=r!==null?ve(r.wsUrl):r8(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=xR.default.join(ER.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{ws.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??ft(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await Q4("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{ws.default.existsSync(i)&&ws.default.unlinkSync(i)}}});var NR={};It(NR,{attemptAgentWitchWatchdogReinstall:()=>o8});var o8,zR=l(()=>{"use strict";kR();MR();o8=async e=>nb(e,()=>OR())});var DR,jR,$R,n8,s8,i8,tl,ib=l(()=>{"use strict";pR();GA();qA();VA();KA();FA();qp();Vp();Re();Qn();yR();Zp();DR=e=>e===null?N():N(e),jR=async(e,t,r)=>{if(!await vo(e))return"not_running";let n=DR(t);if(St(n))return"healthy";let s=ke(n);return $e(s,r)?"stale_connection":"healthy"},$R=async e=>{let t=e?.staleAfterMs??12e4,r=T(),o=te(r);return Promise.all(o.map(async n=>{let s=await jR(n.launchAgentLabel,n.profileEmail,t),i=DR(n.profileEmail),a=ke(i),c=await vo(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:$e(a,t),needsRevive:s!=="healthy",reason:s}}))},n8=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},s8=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",i8=async e=>{let t=await xe(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(_R(),wR)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},tl=async e=>{if(!ht())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=T();await Ss(r),await Qa(r);let o=te(r),n=[];for(let p of o){let m=await jR(p.launchAgentLabel,p.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:m});continue}n.push(await i8({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let p=_o();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(zR(),NR)),m=await p(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&bR({event:s8(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:n8(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var HR,Qp,FR=l(()=>{"use strict";HR=g(require("node:os"));GA();Zp();ib();Qp=async()=>{let e=await $R(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:HR.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Ps(1)[0]??null}}});var ab=l(()=>{"use strict";FA();ib();FR();Zp()});var rl,ol,nl,UR=l(()=>{"use strict";re();ab();rl=async()=>{await Ss();let e=te(),t=[];for(let r of e){let o=await xe(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=_o();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},ol=tl,nl=tl});var lb=l(()=>{"use strict";UR()});var tm,em,BR,cb,GR,a8,l8,c8,d8,u8,rm,qR=l(()=>{"use strict";tm=require("node:child_process"),em=g(require("node:fs")),BR=g(require("node:os")),cb=g(require("node:path")),GR=require("node:util");re();J();a8=(0,GR.promisify)(tm.execFile),l8=()=>cb.default.join(BR.default.homedir(),"Library","LaunchAgents"),c8=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await a8("launchctl",["bootout",r]).catch(()=>{})},d8=e=>{let t=cb.default.join(l8(),`${e}.plist`);em.default.existsSync(t)&&em.default.unlinkSync(t)},u8=e=>{(0,tm.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},rm=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=T();if(!em.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=sr(e);for(let r of t)await c8(r),d8(r);return u8(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var VR,om,KR,_s,JR,p8,m8,g8,db,f8,ub,XR=l(()=>{"use strict";VR=require("node:child_process"),om=g(require("node:fs")),KR=g(require("node:os")),_s=g(require("node:path")),JR=require("node:util");re();p8=(0,JR.promisify)(VR.execFile),m8=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],g8=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],db=e=>{om.default.existsSync(e)&&om.default.rmSync(e,{force:!0})},f8=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await p8("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},ub=async e=>{let r=(e.listLaunchAgentLabels??sr)(e.layout.installDir),o=e.launchAgentsDir??_s.default.join(KR.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??f8;for(let i of r)await n(i),db(_s.default.join(o,`${i}.plist`));let s=_s.default.dirname(e.layout.configPath);for(let i of m8)db(_s.default.join(s,i));for(let i of g8)db(_s.default.join(e.layout.installDir,i));return om.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var pb,YR=l(()=>{"use strict";pb={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var mb,ZR=l(()=>{"use strict";mb="unknown_identity"});var gb=l(()=>{"use strict";YR();ZR()});var h8,fb,QR=l(()=>{"use strict";gb();h8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fb=e=>e.type!=="system.error"||!h8(e.payload)?!1:e.payload.errorCode===mb});var hb=l(()=>{"use strict";qR();XR();QR()});var nm=l(()=>{"use strict";re();jt();hb();ab()});var vs,sm,im=l(()=>{"use strict";nm();vs=(e=20)=>Ps(e),sm=Qp});var am,Cs,lm,cm=l(()=>{"use strict";nm();am=zo,Cs=(e=20)=>Oo(e),lm=e=>No(e)});var dm,yb=l(()=>{"use strict";nm();dm=()=>rm()});var e0=l(()=>{"use strict";vS();mA();HA();lb();im();cm();yb()});var t0={};It(t0,{buildAgentWitchAutomationStatusFromWakeServer:()=>Ja,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>am,buildAgentWitchWakeHealthResponse:()=>va,buildAgentWitchWakeIdentityResponse:()=>Ca,buildAgentWitchWatchdogStatus:()=>sm,installHarnessFromWakeServer:()=>za,readAgentWitchSelfUpdateLogEntries:()=>Cs,readAgentWitchWatchdogLogEntries:()=>vs,restartAgentWitchFromWakeServer:()=>nl,reviveAgentWitchWebSocketFromWakeServer:()=>ol,runAgentWitchSelfUpdateFromWakeServer:()=>lm,runAgentWitchUninstallLocalFromWakeServer:()=>dm,runAutomationFromWakeServer:()=>Ka,syncAutomationsFromWakeServer:()=>Va,wakeAgentWitchLaunchAgents:()=>rl});var r0=l(()=>{"use strict";e0()});var o0,n0,Sb,Ab,s0=l(()=>{"use strict";o0=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),n0=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?o0(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?o0(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Sb=e=>{let t=e.watchdogLogs.map(n0).join(""),r=e.updateLogs.map(n0).join("");return`<!doctype html>
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
</html>`},Ab=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var i0,a0,l0=l(()=>{"use strict";i0=g(require("node:net")),a0=()=>new Promise((e,t)=>{let r=i0.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var c0,y8,bb,d0=l(()=>{"use strict";c0=g(require("node:net"));l0();_a();wa();Re();y8=e=>new Promise(t=>{let r=c0.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),bb=async()=>{let e=T(),t=bt();if(await y8(t))return oE(t),t;let r=await a0();return rp(e,r),r}});var S8,Pb,u0=l(()=>{"use strict";S8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Pb=e=>({force:S8(e)&&e.force===!0})});var sl=l(()=>{"use strict";Ma();s0();d0();u0();ay();Tu();Eo()});var wb,j,_b,vb,il,p0=l(()=>{"use strict";wb=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},_b=e=>{e.writeHead(403),e.end()},vb=e=>e.url?.split("?")[0]??"/",il=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var wt=l(()=>{"use strict";p0()});var A8,m0,g0=l(()=>{"use strict";HA();wt();A8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},m0=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,Ja(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await A8(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=Va(t);return j(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Ka(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var b8,h0,f0,y0,Cb,S0,Lb=l(()=>{"use strict";b8=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],h0=e=>/embed|minilm|^bge-/i.test(e),f0=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),y0=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),Cb=e=>e.filter(t=>t.trim().length>0&&!h0(t)),S0=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!h0(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>f0(s,o));if(n!==void 0)return n}for(let n of b8){let s=r.find(i=>f0(i,n));if(s!==void 0)return s}return r[0]??null}});var kb,P0,w0,um,_0,A0,b0,P8,w8,_8,v8,C8,L8,_t,al=l(()=>{"use strict";kb=require("node:child_process"),P0=g(require("node:fs")),w0=g(require("node:os")),um=g(require("node:path"));jt();At();Lb();_0=3e3,A0=["claude-cli","codex","cursor","antigravity"],b0={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},P8=(e,t)=>new Promise(r=>{let o=(0,kb.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},_0);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),w8=()=>{let e=w0.default.homedir();return["ollama",um.default.join(e,".local","bin","ollama"),um.default.join(e,".agent-witch","ollama","ollama"),um.default.join(e,".local-agent-witch","ollama","ollama")]},_8=e=>new Promise(t=>{let r=(0,kb.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},_0);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(y0(Buffer.concat(o).toString("utf8")))})}),v8=async()=>{for(let e of w8()){if(e!=="ollama"&&!P0.default.existsSync(e))continue;let t=await _8(e);if(t!==null)return t}return[]},C8=e=>{let t=e.installedWriterIds.map(s=>b0[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=de(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${b0[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},L8=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:es},_t=async e=>{let t=A0.map(i=>{let a=Hu(i,e.commands);return P8(a.command,a.args)}),[r,...o]=await Promise.all([v8(),...t]),n=A0.flatMap((i,a)=>o[a]===!0?[i]:[]),s=S0(r,L8());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:C8({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var k8,W8,Wb,v0=l(()=>{"use strict";k8="http://127.0.0.1:11434",W8=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Wb=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||k8;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?W8(await o.json()):null}catch{return null}}});var Tb=l(()=>{"use strict";At();al();v0();Lb()});var T8,C0,L0=l(()=>{"use strict";Tb();T8={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},C0=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:T8[t]})),ollamaModels:Cb(e.ollamaModels)})});var E8,k0,W0=l(()=>{"use strict";Tb();wt();L0();E8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},k0=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await _t({commands:ue({})});return j(e.response,200,{ok:!0,...C0({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await E8(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await Wb({model:r,prompt:o});return n===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var x8,T0,E0=l(()=>{"use strict";mA();wt();x8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},T0=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await x8(e);if(t===null)return!0;let r=za(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var x0=l(()=>{"use strict";Ut()});var Eb,R0=l(()=>{"use strict";x0();Na();Eb=e=>{if(!pr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Qe({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var I0,xb,Rb=l(()=>{"use strict";me();Ut();Na();I0=e=>{if(!pr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},xb=async e=>{let t=I0(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=eo("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=$();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=X({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(Qe({projectFolderPath:r}),await Ua(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var O0=l(()=>{"use strict";R0();Rb()});var M0,N0=l(()=>{"use strict";O0();Rb();wt();M0=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=Eb(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await xb(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,o,r,e.cors.headers),!0}return!1}});var z0,D0=l(()=>{"use strict";sl();cm();im();z0=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=vs(50),r=Cs(50);return e.response.writeHead(200,Ab()),e.response.end(Sb({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var j0,$0=l(()=>{"use strict";vS();wt();j0=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,va(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,Ca(),e.cors.headers),!0):!1});var H0,F0=l(()=>{"use strict";yb();wt();H0=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await dm();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var U0,B0=l(()=>{"use strict";lb();wt();U0=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await ol();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await nl();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await rl();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var G0,q0=l(()=>{"use strict";sl();cm();wt();G0=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=am();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=il(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:Cs(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=Pb(t),o=await lm({force:r});return j(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var V0,K0=l(()=>{"use strict";im();wt();V0=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await sm();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=il(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:vs(t)},e.cors.headers),!0}return!1}});var J0,X0=l(()=>{"use strict";g0();W0();E0();N0();D0();$0();F0();B0();q0();K0();J0=[j0,z0,V0,U0,G0,H0,T0,M0,m0,k0]});var Y0,Z0=l(()=>{"use strict";X0();Y0=async e=>{for(let t of J0)if(await t(e))return!0;return!1}});var R8,Q0,eI=l(()=>{"use strict";Ma();wt();Z0();R8=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:vb(e),readJsonBody:()=>wb(e)}),Q0=async(e,t,r)=>{let o=e.headers.origin,n=Rp(o);try{if(o!==void 0&&o.length>0&&!n.allowed){_b(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=R8(e,t,r,n);if(await Y0(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var tI,Qo,pm,mm=l(()=>{"use strict";tI=g(require("node:http"));sl();eI();Qo=async()=>{let e=await bb(),t=tI.default.createServer((r,o)=>{Q0(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},pm=Qo});var rI={};It(rI,{runAgentWitchBridgeCli:()=>I8});var I8,oI=l(()=>{"use strict";re();mm();I8=async()=>{Xe("agent-witch-bridge");let e=await Qo(),t=ar(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var nI=l(()=>{"use strict";Dt()});var Ls,Ib,sI=l(()=>{"use strict";Ls=(e,t,r)=>e===1?t:r,Ib=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Ls(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Ls(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Ls(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Ls(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Ls(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${Ls(p,"year","years")} ago`}});var en,Ob,O8,M8,Mb,to,ll,Nb,iI=l(()=>{"use strict";en=g(require("node:fs")),Ob=g(require("node:path")),O8="local-ws-traffic.ndjson",M8=500,Mb=e=>Ob.default.join(e.logsDir,O8),to=(e,t)=>{let r=Mb(e);en.default.mkdirSync(Ob.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});en.default.appendFileSync(r,`${o}
`,"utf8")},ll=(e,t=M8)=>{let r=Mb(e);if(!en.default.existsSync(r))return[];let n=en.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},Nb=e=>{let t=Mb(e);en.default.existsSync(t)&&en.default.writeFileSync(t,"","utf8")}});var N8,aI,lI,cI=l(()=>{"use strict";gb();N8=new Set(Object.values(pb)),aI=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lI=e=>{if(!aI(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!N8.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!aI(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var dI,uI=l(()=>{"use strict";dI=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var z8,D8,j8,cl,pI=l(()=>{"use strict";uI();z8=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,D8=e=>z8.test(e),j8=e=>dI(e),cl=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>cl(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&D8(o)){r[o]=j8(n);continue}r[o]=cl(n)}return r}});var Bt,zb,$8,H8,F8,Db,mI,gI,fI,U8,gm,tn,fm,jb,hI=l(()=>{"use strict";Bt=g(require("node:fs")),zb=g(require("node:path"));cI();pI();$8="local-ws-trace.ndjson",H8=1e4,F8=1440*60*1e3,Db=e=>zb.default.join(e.logsDir,$8),mI=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},gI=e=>{if(!Bt.default.existsSync(e))return;let t=Bt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-F8,n=t.filter(s=>{let i=mI(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-H8);Bt.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},fI=(e,t)=>{let r=Db(e);Bt.default.mkdirSync(zb.default.dirname(r),{recursive:!0}),Bt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),gI(r)},U8=e=>e.parsed===null?{_empty:!0}:cl(e.parsed),gm=(e,t,r)=>{let o=lI(r);fI(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:U8(o)})},tn=(e,t)=>{fI(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:cl({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},fm=(e,t=80)=>{let r=Db(e);if(gI(r),!Bt.default.existsSync(r))return[];let o=Bt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=mI(s);i!==null&&n.push(i)}return n.reverse()},jb=e=>{let t=Db(e);Bt.default.existsSync(t)&&Bt.default.writeFileSync(t,"","utf8")}});var ro,yI,B8,$b,hm,SI=l(()=>{"use strict";ro=g(require("node:fs")),yI=g(require("node:path")),B8=256e3,$b=e=>{ro.default.mkdirSync(yI.default.dirname(e),{recursive:!0}),ro.default.writeFileSync(e,"","utf8")},hm=(e,t=B8)=>{if(!ro.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=ro.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=ro.default.openSync(e,"r");try{ro.default.readSync(a,i,0,s,n)}finally{ro.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var dl=l(()=>{"use strict";iI();hI();SI()});var Hb,Fb,AI=l(()=>{"use strict";Hb=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Fb=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${Hb(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${Hb(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${Hb(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var bI=l(()=>{"use strict";AI()});var Ub,Bb=l(()=>{"use strict";Ub=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var Gb=l(()=>{"use strict";Xa()});var qb,Vb,PI=l(()=>{"use strict";Gb();qb=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},Vb=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var wI=l(()=>{"use strict";Bb();PI()});var _I,ul,Kb,pl=l(()=>{"use strict";Bb();_I=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ul=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=_I(e),r=_I(Ub(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},Kb=`(function () {
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
})();`});var rn,G8,Jb,vI=l(()=>{"use strict";rn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),G8=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},Jb=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${rn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?rn(r.direction):rn(r.kind),i=`trace-body-${o}`,a=rn(G8(r.body));return`<tr>
        <td title="${rn(r.at)}">${rn(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${rn(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var LI,q8,CI,Xb,kI=l(()=>{"use strict";Ue();Dt();LI=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},q8=e=>LI(e)===rr?Dn:zn,CI=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xb=e=>{let t=q8(e.installDir),o=`AW_HOME="$HOME/${LI(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${CI(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${CI(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var WI=l(()=>{"use strict";pl();vI();kI();pl()});var V8,fr,ml=l(()=>{"use strict";V8=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),fr=V8});var TI,EI,xI,RI,II,OI,MI,ks=l(()=>{"use strict";TI="projects",EI="knowledge",xI="chunks.ndjson",RI="lessons.ndjson",II="error-chunks.ndjson",OI="usage-stats.json",MI="knowledge-location.json"});var ym,K8,Sm,Yb=l(()=>{"use strict";ym=g(require("node:path"));ks();K8=(e,t)=>{let r=t.trim(),o=ym.default.join(e.installDir,TI,r,EI);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:ym.default.join(o,xI),memoryRunsFilePath:ym.default.join(o,RI)}},Sm=K8});var Zb,J8,NI,zI=l(()=>{"use strict";Zb=g(require("node:fs"));ks();Uo();J8=e=>{let t=it(e.projectFolderPath),r=`${t.metaDirPath}/${MI}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};Zb.default.mkdirSync(t.metaDirPath,{recursive:!0}),Zb.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},NI=J8});var Ws,jI,DI,X8,$I,HI=l(()=>{"use strict";Ws=g(require("node:fs")),jI=g(require("node:path"));Wo();Uo();Yb();zI();DI=(e,t)=>{Ws.default.existsSync(e)&&(Ws.default.existsSync(t)&&Ws.default.statSync(t).size>0||(Ws.default.mkdirSync(jI.default.dirname(t),{recursive:!0}),Ws.default.copyFileSync(e,t)))},X8=e=>{let t=it(e.projectFolderPath),r=Sm(e.layout,e.projectId),o=`${t.memoryDirPath}/${Vn}`;DI(t.ragChunksFilePath,r.ragChunksFilePath),DI(o,r.memoryRunsFilePath),NI({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},$I=X8});var Qb,Y8,FI,UI=l(()=>{"use strict";Qb=g(require("node:fs"));Uo();Y8=e=>{let t=it(e);if(!Qb.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(Qb.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},FI=Y8});var BI,Z8,Ts,Am=l(()=>{"use strict";BI=g(require("node:path"));Wo();Uo();HI();UI();Yb();Z8=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=FI(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){$I({layout:e.layout,projectFolderPath:t,projectId:o});let s=Sm(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=it(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:BI.default.join(n.memoryDirPath,Vn),projectId:null}},Ts=Z8});var bm,e3,Pm,eP=l(()=>{"use strict";bm=g(require("node:fs"));ks();e3=(e,t=500)=>{if(!bm.default.existsSync(e))return;let r=bm.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);bm.default.writeFileSync(e,`${o.join(`
`)}
`)},Pm=e3});var wm,t3,on,tP=l(()=>{"use strict";wm=g(require("node:path"));ks();Am();t3=e=>{let t=Ts(e);if(t===null)return null;let r=wm.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:wm.default.join(r,OI),errorChunksFilePath:wm.default.join(r,II)}},on=t3});var qI,gl,VI,GI,rP,KI,n3,oP,JI,nP,sP,iP,aP=l(()=>{"use strict";qI=require("node:crypto"),gl=g(require("node:fs")),VI=g(require("node:path"));ml();ks();tP();GI=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),rP=e=>{if(!gl.default.existsSync(e))return GI();try{let t=JSON.parse(gl.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return GI()},KI=(e,t)=>{gl.default.mkdirSync(VI.default.dirname(e),{recursive:!0}),gl.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},n3=e=>{let t=fr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,qI.createHash)("sha256").update(o).digest("hex").slice(0,16)},oP=e=>{let t=on(e);return t===null?null:rP(t.usageStatsFilePath)},JI=e=>{if(e.chunkIds.length===0)return;let t=on(e);if(t===null)return;let r=rP(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;KI(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},nP=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=on(e);if(r===null)return null;let o=n3(t),n=rP(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return KI(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},sP=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,iP=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var fl,XI,s3,i3,YI,a3,lP,hl,Es,cP,xs,dP,uP=l(()=>{"use strict";fl=g(require("node:fs")),XI=g(require("node:path"));ml();Am();eP();aP();s3="http://127.0.0.1:11434",i3="nomic-embed-text",YI=(e,t,r)=>Ts({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,a3=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},lP=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},hl=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||s3,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||i3;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},Es=(e,t,r)=>{let o=YI(e,t,r);if(o===null||!fl.default.existsSync(o))return[];let n=fl.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},cP=async e=>{let t=fr(e.text),r=lP(t);if(r.length===0)return 0;let o=YI(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;fl.default.mkdirSync(XI.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await hl(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};fl.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return Pm(o),n},xs=async e=>{let t=await hl(e.query);if(t===null)return[];let r=e.minScore??0,s=Es(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:a3(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return JI({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},dP=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var yl,ZI,l3,c3,pP,mP,gP,QI=l(()=>{"use strict";yl=g(require("node:fs")),ZI=g(require("node:path"));ml();tP();eP();uP();l3=e=>{if(!yl.default.existsSync(e))return[];let t=yl.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},c3=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},pP=async e=>{let t=on(e);if(t===null)return 0;let r=fr(e.text),o=lP(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;yl.default.mkdirSync(ZI.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await hl(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};yl.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Pm(n,200),s},mP=async e=>{let t=on(e);if(t===null)return[];let r=await hl(e.query);if(r===null)return[];let o=e.minScore??.3;return l3(t.errorChunksFilePath).map(s=>({chunk:s,score:c3(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},gP=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var fP=l(()=>{"use strict";uP();aP();QI()});var hP,eO=l(()=>{"use strict";hP={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var tO=l(()=>{"use strict";eO()});var ye,yP,SP=l(()=>{"use strict";tO();ye=hP,yP=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${ye.gray50};
  --aw-zinc-100: ${ye.gray100};
  --aw-zinc-200: ${ye.gray200};
  --aw-zinc-400: ${ye.gray400};
  --aw-zinc-500: ${ye.gray500};
  --aw-zinc-600: ${ye.gray600};
  --aw-zinc-700: ${ye.gray700};
  --aw-zinc-800: ${ye.gray900};
  --aw-zinc-900: ${ye.gray900};
  --aw-brand-600: ${ye.brand600};
  --aw-brand-700: ${ye.brand700};
  --aw-brand-50: ${ye.brand50};
  --aw-emerald-50: ${ye.success50};
  --aw-emerald-700: ${ye.success700};
  --aw-amber-50: ${ye.warning50};
  --aw-amber-900: ${ye.warning900};
  --aw-red-50: ${ye.error50};
  --aw-red-700: ${ye.error700};
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
.sdlc-run-badge-budget { background: #ffedd5; color: #9a3412; box-shadow: inset 0 0 0 1px #fdba74; }
.sdlc-history-badge-failed { background: #fee2e2; color: #991b1b; }
.sdlc-cost-confirm .sdlc-cost-proposal { display: grid; gap: 0.5rem; margin: 0.75rem 0 1rem; }
.sdlc-cost-confirm .sdlc-cost-proposal > div { display: flex; justify-content: space-between; gap: 1rem; }
.sdlc-cost-confirm .sdlc-cost-proposal dt { color: var(--aw-zinc-500); }
.sdlc-cost-confirm .sdlc-cost-proposal dd { margin: 0; font-weight: 600; font-variant-numeric: tabular-nums; }
.sdlc-cost-controls { margin-top: 0.75rem; }
.sdlc-cost-early-stop .sdlc-checkbox-label { display: flex; gap: 0.5rem; align-items: flex-start; }
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
`.trim()});var d3,u3,AP,rO,bP,oO=l(()=>{"use strict";SP();pl();d3=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,u3=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],AP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rO=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${d3}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,bP=e=>{let t=u3.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=AP(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=AP(e.installBundleVersionLabel?.trim()??"unknown"),s=rO("brand brand-in-sidebar",n),i=rO("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${AP(e.title)} \xB7 Agent Witch Local</title>
  <style>${yP}</style>
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
  <script>${Kb}</script>
</body>
</html>`}});var _m,Sl,vm=l(()=>{"use strict";_m=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Sl=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${_m(e.syncMessage)}</p>`:"",o=_m(e.manageHref),n=_m(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${_m(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var PP,wP,_P,nO=l(()=>{"use strict";PP=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,wP=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,_P=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var sO=l(()=>{"use strict";oO();vm();nO()});var Rs,vP,iO=l(()=>{"use strict";pl();Rs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vP=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Rs(e.wakeError)}</div>`:"",a=ul(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Rs(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Rs(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Rs(o)}</p>
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
        <p class="home-card-meta">${Rs(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Rs(n)}</p>
      </a>
    </div>`}});var aO=l(()=>{"use strict";iO()});var Cm,Lm,km,lO,CP=l(()=>{"use strict";Cm="support-reply",Lm="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",km=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),lO=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Wm,cO,dO=l(()=>{"use strict";CP();Wm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cO=()=>`<section class="card">
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
      <p>${Wm(Lm)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Wm(km)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Wm(lO)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Wm(Cm)}">Run this sample</a>
      </div>
    </section>`});var E,Is=l(()=>{"use strict";E=e=>e==="passed"||e==="stopped"||e==="failed"});var uO,LP,nn,kP,Tm=l(()=>{"use strict";uO="Stopped at the round limit. The best prompt is kept.",LP="Stopped because the score stopped rising. The best prompt is kept.",nn="Finished. The best prompt is the result.",kP="Wizard ended. Progress from finished steps is kept."});var oo,WP=l(()=>{"use strict";oo=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var p3,m3,Al,pO,Em=l(()=>{"use strict";p3=/\n+|;\s+/,m3=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,Al=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(p3).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,m3(s)]},[]);return[...t,...o]},[]),pO=e=>{let t=Al(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var se,Os=l(()=>{"use strict";se=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var bl,TP=l(()=>{"use strict";Em();Os();bl=e=>{let t=[...e.priorRounds,e.current],r=se(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:pO(o)}}});var EP,g3,f3,xm,xP=l(()=>{"use strict";EP={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},g3=e=>{try{let t=JSON.parse(e.fragment);return{...EP,objects:[...e.objects,t]}}catch{return{...EP,objects:e.objects}}},f3=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:g3(r)},xm=e=>[...e].reduce(f3,EP).objects});var h3,RP,y3,mO,IP=l(()=>{"use strict";xP();h3=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},RP=e=>{let t=xm(e).filter(h3),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},y3=(e,t)=>({...e,passed:e.score>=t}),mO=(e,t)=>{let r=RP(e);return r===null?null:y3(r,t)}});var OP,MP,Rm=l(()=>{"use strict";OP="The judge reply needs a score and a reason.",MP="The improver reply was empty."});var gO,fO=l(()=>{"use strict";gO=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var hO,yO=l(()=>{"use strict";hO=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var A3,SO,AO=l(()=>{"use strict";fO();yO();Tm();Em();A3=e=>{let t=Al(e);return t.length===0?LP:`${LP} Avoid: ${t.join("; ")}.`},SO=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:uO};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(gO(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:A3(hO(r))}}return null}});var no,b3,sn,bO,Im=l(()=>{"use strict";no=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},b3=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,sn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",b3(e.tokens),`Delay: ${no(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},bO=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var P3,PO,wO=l(()=>{"use strict";IP();P3=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,PO=e=>{let r=(P3.exec(e)?.[1]??e).trim();return r.length===0||RP(r)!==null?null:r}});var _O,Om,vO=l(()=>{"use strict";Im();wO();Rm();_O=e=>({type:"call",role:"judge",choice:e.choice,prompt:bO({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),Om=e=>{let t=PO(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:MP}}:{nextPrompt:t,continuation:_O({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var NP,CO=l(()=>{"use strict";WP();TP();IP();Rm();Tm();AO();Rm();vO();NP=e=>{let t=mO(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:OP}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=SO({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=bl({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:oo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var Pl,zP=l(()=>{"use strict";Pl=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var LO=l(()=>{"use strict"});var kO=l(()=>{"use strict";LO()});var an,WO=l(()=>{"use strict";an=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var w3,DP,TO=l(()=>{"use strict";Im();w3=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,DP=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",w3(e.tokens),`Delay: ${no(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var _3,v3,C3,jP,EO=l(()=>{"use strict";_3=/[A-Za-z0-9_./~-]{3,180}/g,v3=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,C3=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||v3.test(t)},jP=(e,t=12)=>{let r=[];for(let o of e.matchAll(_3)){let n=o[0].replace(/\.+$/,"");if(!(!C3(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var wl,xO=l(()=>{"use strict";wl=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var Mm,$P,RO,_l,HP=l(()=>{"use strict";Mm=e=>Math.floor(e/2),$P=e=>Math.max(Mm(e)+1,e-20),RO=(e,t)=>e>=t?"passes":e>=$P(t)?"close":e>=Mm(t)?"weak":"bad",_l=e=>[{band:"bad",label:`0\u2013${Mm(e)-1} bad`},{band:"weak",label:`${Mm(e)}\u2013${$P(e)-1} weak`},{band:"close",label:`${$P(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var Nm,FP=l(()=>{"use strict";HP();Nm=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${RO(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var vt,UP=l(()=>{"use strict";vt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var IO,OO=l(()=>{"use strict";IO=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var L3,k3,MO,NO=l(()=>{"use strict";Is();FP();UP();OO();L3=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],k3=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",MO=e=>{let t=e.wizard;if(t===void 0)return[];let r=vt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=L3.map((f,y)=>{let u=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:f,state:u,detail:null}}).filter((f,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=Nm(e),d=c.filter(f=>f.id==="round-0"),p=IO(t)&&(!n||a)?c.filter(f=>f.id!=="round-0"):[],m=E(e.status)&&!s,S=m?[{id:"end",label:k3(e),state:"done",detail:e.errorMessage}]:[];if(m&&S.length>0){let f=Math.min(r,i.length),y=i.slice(0,f).map(u=>({...u,state:"done"}));return[...d,...y,...S,...p]}return[...d,...i,...p,...S]}});var W3,BP,zO=l(()=>{"use strict";Is();FP();NO();W3=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",BP=e=>{if(e.wizard!==void 0)return MO(e);let t=Nm(e),r=E(e.status)?[{id:"end",label:W3(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var vl,DO=l(()=>{"use strict";vl=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var jO=l(()=>{"use strict";Dt()});var $O,Cl,Ll,Ns,zm,GP,HO=l(()=>{"use strict";jO();$O="/prompt-optimizer/agent",Cl=`${lr}${$O}`,Ll=`${lr}/prompt-optimizer`,Ns="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",zm=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Ns}`,GP="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var hr=l(()=>{"use strict"});var oe,kl=l(()=>{"use strict";hr();oe=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var qP,FO=l(()=>{"use strict";qP="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var UO,BO=l(()=>{"use strict";UO=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Wl,qO=l(()=>{"use strict";BO();hr();Wl=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:UO(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null})});var VP,VO=l(()=>{"use strict";hr();VP=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null})});var KP,KO=l(()=>{"use strict";hr();KP=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var JO,Tl,XO=l(()=>{"use strict";JO=["generalize","evaluate","separate","optimize_modules"],Tl=(e,t)=>{let r=JO.indexOf(t);if(r===-1)return e;let o=JO.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var Dm,JP=l(()=>{"use strict";Em();Dm=e=>{let t=Al(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var El,YO=l(()=>{"use strict";JP();El=e=>{let t=Dm(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var E3,x3,R3,ZO,QO=l(()=>{"use strict";E3=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),x3=/^\{\{[a-zA-Z0-9_-]+\}\}$/,R3=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(E3(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},ZO=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>x3.test(n)?n:R3(n,r)).join("")}});var XP,eM=l(()=>{"use strict";QO();XP=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:ZO(o.prompt,t)}))}))});var I3,xl,tM=l(()=>{"use strict";hr();JP();I3=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),xl=e=>{let t=Dm(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=I3(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Rl,rM=l(()=>{"use strict";zP();Rl=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return Pl({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Il,ZP=l(()=>{"use strict";Os();Il=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var QP,oM=l(()=>{"use strict";ZP();QP=e=>{let t=Il({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var ln,nM=l(()=>{"use strict";ln=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var O3,M3,Q,jm=l(()=>{"use strict";kl();O3=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},M3=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,Q=e=>{let t=oe(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:O3(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>M3(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var sM,iM=l(()=>{"use strict";kl();jm();sM=e=>{let t=Q(e.wizard),r=oe(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var ew,aM=l(()=>{"use strict";iM();ew=e=>{let t=sM({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var N3,lM,cM=l(()=>{"use strict";N3=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},lM=e=>[...e].reduce(N3,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var z3,dM,uM=l(()=>{"use strict";z3=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},dM=e=>[...e].reduce(z3,{out:"",inString:!1,escaped:!1}).out});var D3,j3,pM,mM=l(()=>{"use strict";cM();uM();D3=e=>e.charCodeAt(0)===65279?e.slice(1):e,j3=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},pM=e=>dM(lM(j3(D3(e))))});var $3,H3,F3,gM,U3,zs,$m=l(()=>{"use strict";xP();mM();$3=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},H3=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},F3=e=>[...e].reduce(H3,{out:"",inString:!1,escaped:!1}).out,gM=e=>{let t=xm(e);return t.length===0?null:t[t.length-1]},U3=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},zs=e=>{let t=pM($3(e)),r=gM(t);if(r!==null)return r;let o=F3(t),n=gM(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw U3(i)}}});var B3,G3,tw,fM,hM=l(()=>{"use strict";B3=/^[a-z0-9][a-z0-9-]{0,62}$/,G3=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return B3.test(t)?t:""},tw=e=>e.replace(/\s+/gu," ").trim(),fM=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=G3(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=tw(n.name),a=tw(n.description),c=tw(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var yM,SM,AM=l(()=>{"use strict";yM=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},SM=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var rw,bM=l(()=>{"use strict";$m();hM();AM();rw=(e,t)=>{let r=(()=>{try{return zs(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(yM(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(SM).filter(a=>a!==null),i=fM({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var ow,PM=l(()=>{"use strict";ow=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var nw,wM=l(()=>{"use strict";nw=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var sw,_M=l(()=>{"use strict";kl();jm();sw=e=>{let t=Q(e.wizard),r=oe(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var Ol,vM=l(()=>{"use strict";Ol=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var Ct,q3,iw,CM=l(()=>{"use strict";Ct=g(Bn());$m();q3=(0,Ct.isType)({name:Ct.isNonEmptyString,description:Ct.isString,sampleValue:Ct.isString}),iw=e=>{let t=zs(e);if(!(0,Ct.isType)({templatedPrompt:Ct.isNonEmptyString,variables:(0,Ct.isArrayWithEachItem)(q3)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var ie,V3,K3,aw,LM=l(()=>{"use strict";ie=g(Bn());hr();$m();V3=(0,ie.isType)({id:ie.isNonEmptyString,title:ie.isNonEmptyString,prompt:ie.isNonEmptyString,order:ie.isNumber}),K3=(0,ie.isType)({id:ie.isNonEmptyString,title:ie.isNonEmptyString,summary:ie.isString,topology:(0,ie.isOneOf)("chain","parallel"),modules:(0,ie.isArrayWithEachItem)(V3),recommended:ie.isBoolean}),aw=e=>{let t=zs(e);if(!(0,ie.isType)({options:(0,ie.isArrayWithEachItem)(K3)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Ds,kM=l(()=>{"use strict";Ds=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var J3,lw,cw=l(()=>{"use strict";J3=/\{\{([a-zA-Z0-9_-]+)\}\}/g,lw=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(J3,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Lt,kt,WM=l(()=>{"use strict";Os();cw();Lt=e=>lw(e.templatedPrompt,e.variables),kt=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return se(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Lt(e.wizard)}});var X3,cn,TM=l(()=>{"use strict";X3=/\{\{([a-zA-Z0-9_-]+)\}\}/g,cn=(e,t)=>e.replace(X3,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var Y3,dn,Hm=l(()=>{"use strict";Y3=/\{\{([a-zA-Z0-9_-]+)\}\}/g,dn=e=>{let t=new Set,r=[];for(let o of e.matchAll(Y3)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Ml,EM=l(()=>{"use strict";Hm();Ml=e=>e.variables.length>0||dn(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var dw,uw=l(()=>{"use strict";hr();dw=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Nl,xM=l(()=>{"use strict";Os();uw();Nl=e=>{let t=e.wizard.evaluateSelectedRound??se(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:dw(r.judgement,e.passScore)}});var zl,RM=l(()=>{"use strict";zl=e=>e.length===1&&e[0].modules.length===1});var pw,IM=l(()=>{"use strict";pw=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Se,Fm,Dl=l(()=>{"use strict";Se=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),Fm=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var OM,MM=l(()=>{"use strict";Dl();OM=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Se("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Se("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Se("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var NM,zM=l(()=>{"use strict";Is();Dl();NM=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!E(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Se("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),Se("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Se("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",Fm(e.writerLabel,e.folder)),Se("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Se("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var DM,jM=l(()=>{"use strict";Dl();DM=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Se("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Se("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Se("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var $M,HM=l(()=>{"use strict";Dl();$M=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Se("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Se("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",Fm(e.writerLabel,e.folder)),...r?[Se("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var Um,FM=l(()=>{"use strict";Is();MM();zM();jM();HM();Um=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(E(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return NM(r);case"evaluate":return OM({...r,currentRound:e.currentRound});case"separate":return $M(r);case"optimize_modules":return DM({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var jl,Sr,UM=l(()=>{"use strict";jl=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),Sr=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var Z3,Bm,mw,BM=l(()=>{"use strict";Hm();Z3="wizardParam_",Bm=e=>`${Z3}${e}`,mw=e=>{let t=dn(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=Bm(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var tt,GM=l(()=>{"use strict";tt=["generalize","evaluate","separate","optimize_modules"]});var $l,un,js,$s=l(()=>{"use strict";$l="Stopped because the confirmed token or spend budget was exceeded.",un="Approaching the confirmed budget. Further trials may hard-stop.",js="Confirm the Step 4 token and spend budget before optimizing modules."});var Ar,Hl=l(()=>{"use strict";Ar=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var br,Gm=l(()=>{"use strict";$s();br=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var VM,KM,gw,JM=l(()=>{"use strict";$s();Hl();Gm();VM=e=>{let t=e.fromJudge;if(t!=null&&typeof t.targetTokenBudget=="number"&&Number.isFinite(t.targetTokenBudget)&&t.targetTokenBudget>0&&typeof t.estimatedSpendUsd=="number"&&Number.isFinite(t.estimatedSpendUsd)&&t.estimatedSpendUsd>=0)return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??.01,stub:!1};let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:Ar({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},KM=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),gw=e=>{let t=e.existing??br(),r=VM({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return KM(t,r)}});var Fl,XM=l(()=>{"use strict";Hl();$s();Gm();Fl=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??br(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=Ar({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var hw,Hs,YM=l(()=>{"use strict";$s();Hl();hw=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=Ar({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:$l,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:$l,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,p=s!==null&&s>0&&o>=s*c;return(d||p)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:un,costControls:{...t,softWarnFired:!0,softWarnMessage:un}}:null},Hs=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var yw,ZM=l(()=>{"use strict";yw=e=>{let t=e.costControls?.maxTrials;return t!=null&&Number.isFinite(t)&&t>=1?Math.min(e.maxRounds,Math.floor(t)):e.maxRounds}});var L=l(()=>{"use strict";Is();Tm();CO();WP();Im();zP();kO();WO();TO();EO();TP();xO();Os();zO();UP();HP();DO();HO();hr();kl();FO();qO();VO();KO();XO();YO();eM();tM();rM();ZP();oM();nM();jm();aM();bM();PM();wM();_M();vM();CM();LM();kM();WM();cw();TM();Hm();EM();xM();RM();uw();IM();FM();UM();BM();GM();$s();Hl();Gm();JM();XM();YM();ZM()});var Sw,Vm,Q3,tN,rN=l(()=>{"use strict";Sw=g(require("node:fs")),Vm=g(require("node:path")),Q3=e=>Vm.default.join(Vm.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),tN=(e,t)=>{let r=Q3(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;Sw.default.mkdirSync(Vm.default.dirname(r),{recursive:!0}),Sw.default.appendFileSync(r,o,"utf8")}});var Fs,oN,e6,nN,t6,sN,Gt,K,iN,z,rt=l(()=>{"use strict";Fs=g(require("node:fs")),oN=g(require("node:path"));L();rN();e6=e=>e.wizard===void 0?e:{...e,wizard:VP(e.wizard)},nN=new Set,t6=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),sN=(e,t)=>{Fs.default.mkdirSync(oN.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;Fs.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),Fs.default.renameSync(r,e)},Gt=e=>{if(!Fs.default.existsSync(e))return[];try{let t=JSON.parse(Fs.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(t6).map(e6):[]}catch{return[]}},K=(e,t)=>Gt(e).find(r=>r.id===t)??null,iN=(e,t)=>{nN.add(t);let r=Gt(e).filter(o=>o.id!==t);sN(e,r)},z=(e,t)=>{if(nN.has(t.id))return;let r=Gt(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];sN(e,o),tN(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var aN,Km,Aw,fn,bw,ot,Pr,ae,He=l(()=>{"use strict";aN=g(require("node:fs")),Km=g(require("node:os")),Aw=g(require("node:path"));ps();fn="~",bw=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,ot=e=>{let t=Km.default.homedir(),r=bw(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Pr=e=>{let t=e.trim().length===0?"~":e.trim(),r=st(t),o=Aw.default.isAbsolute(r)?bw(r):bw(Aw.default.resolve(Km.default.homedir(),r));try{if(!aN.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:ot(o)}},ae=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Km.default.homedir()});var Pw=l(()=>{"use strict";da()});var r6,lN,cN=l(()=>{"use strict";Pw();r6=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,lN=e=>{let t=Do(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(r6)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var uN,o6,n6,wr,s6,i6,dN,Jm,pN,a6,at,mN,gN,fN,Wt=l(()=>{"use strict";Pw();cN();uN=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),o6=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,n6=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,wr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(o6.test(e.errorMessage))return"usage_limit";if(n6.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},s6="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",i6="The writer waited on terminal input and did not return a prompt.",dN=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Jm=e=>{let t=e.trim();if(t.length===0||t.length>=500||!dN.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>dN.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},pN=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},a6=e=>Jm(e.stdout)??Jm(e.stderr)??(pN(e.replyFile)?Jm(e.replyFile):null),at=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return s6;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?i6:null},mN=e=>{let t=e.trim();return t.length===0?null:at(t)!==null?t:Jm(t)??(pN(t)?t:null)},gN=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],fN=e=>{let t=e.replyFileText?.trim()??"",r=at([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=a6({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=wr({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=lN([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Do(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var Us,qt,Ul,hN,Xm,l6,yN,SN,AN,ww=l(()=>{"use strict";Us=g(require("node:fs")),qt=g(require("node:path")),Ul=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},hN=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Xm=(e,t)=>{let r=Ul(e);return r.length>0?r:Ul(t)},l6=e=>{let t=Xm(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${hN(o)}`,...n.length>0?[`description: ${hN(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},yN=e=>`.cursor/skills/${e}/SKILL.md`,SN=(e,t)=>{let r=Ul(t);if(r.length===0)return!1;let o=qt.default.resolve(e),n=qt.default.resolve(o,".cursor","skills"),s=qt.default.resolve(o,yN(r));return s.startsWith(`${n}${qt.default.sep}`)?Us.default.existsSync(s):!1},AN=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Xm(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=qt.default.resolve(e.workingDirectory);try{if(!Us.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=l6({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=yN(r.slug),n=qt.default.resolve(t,".cursor","skills"),s=qt.default.resolve(t,o);if(!s.startsWith(`${n}${qt.default.sep}`))return{ok:!1,errorCode:"path"};if(Us.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Us.default.mkdirSync(qt.default.dirname(s),{recursive:!0}),Us.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var c6,bN,PN,wN=l(()=>{"use strict";L();L();rt();He();Wt();ww();c6=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,bN=e=>{let t=e.get("savedSkill");return t!==null&&c6.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},PN=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=K(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!E(r.status))return{kind:"redirect",location:o("skillError=working")};let n=se(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||at(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=AN({workingDirectory:ae(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var so,Bl=l(()=>{"use strict";L();L();so=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=pw(t),n=gw({moduleCount:o.length,existing:e.costControls});return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:n,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:jl(r.variables)},updatedAt:new Date().toISOString()}}});var io,Gl=l(()=>{"use strict";io=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var R,d6,Ym,ne,hn,vN,_N,CN,LN,Ae=l(()=>{"use strict";R="manual",d6=["claude-cli","codex","cursor","antigravity"],Ym={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ne=e=>e===R?"You":e in Ym?Ym[e]:e,hn=e=>d6.filter(t=>e.includes(t)),vN=e=>{let t=hn(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},_N=(e,t)=>t===R?R:e.find(r=>r===t)??null,CN=(e,t,r)=>{let o=hn(e),n=_N(o,t),s=_N(o,r);return n===null||s===null?null:{judge:n,improver:s}},LN=(e,t,r)=>{let o=hn(e);return t===null||t.trim()===""?r!==R?r:o[0]??null:t===R?null:o.find(n=>n===t)??null}});var _w=l(()=>{"use strict";At();al();da()});var vw,kN,Cw,WN,TN=l(()=>{"use strict";vw={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},kN=e=>e.exitCode===null&&e.signalCode===null,Cw=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!kN(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!kN(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),WN=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),Cw(e).then(s=>{r({...vw,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var EN,ql,xN,Lw,u6,Ww,Tw,p6,m6,g6,RN,f6,kw,IN,Vl,ON,h6,y6,qe,yn=l(()=>{"use strict";EN=require("node:child_process"),ql=g(require("node:fs")),xN=g(require("node:os")),Lw=g(require("node:path"));_w();TN();Wt();u6=["claude-cli","codex","cursor","antigravity"],Ww=18e4,Tw=6e5,p6=12e4,m6=9e5,g6="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",RN="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",f6="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",kw=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},IN=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=kw(process.env[RN])??Math.max(r,Tw));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:kw(process.env[f6])??m6;return Math.min(o,Math.max(p6,r))},Vl=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?kw(process.env[RN])??Tw:Ww,ON=e=>`The writer timed out after ${e}ms.`,h6=e=>u6.includes(e),y6=e=>e===!0||process.env[g6]==="1",qe=e=>new Promise(t=>{if(e.signal?.aborted){t(vw);return}if(y6(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!h6(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=$t(r,e.prompt,ue({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!ql.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:Ww,s=Lw.default.join(ql.default.mkdtempSync(Lw.default.join(xN.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=gN({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},p=(0,EN.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=S=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(S))};WN(p,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",Cw(p).then(S=>{m({ok:!1,errorMessage:ON(n),errorKind:"writer_timeout",killSignal:S})})},n),p.stdout.on("data",S=>{a.push(Buffer.from(S))}),p.stderr.on("data",S=>{c.push(Buffer.from(S))}),p.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),p.on("close",()=>{if(d.settled)return;let S=ql.default.existsSync(s)?ql.default.readFileSync(s,"utf8"):null,f=fN({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:S});if(f.ok&&d.stopReason!=="abort"){m(f);return}d.stopReason===null&&m(f)})})});var Sn,_r,Bs=l(()=>{"use strict";Sn=e=>e.toLocaleString("en-US"),_r=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var S6,Kl,Ew=l(()=>{"use strict";L();L();Bs();S6=e=>{if(e.wizard!==void 0){let t=Ol(e.wizard),r=_r(e);return(t??0)+r}return _r(e)},Kl=e=>{let t=hw({costControls:e.costControls,spentTokens:S6(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var MN,A6,Jl,Zm,Qm=l(()=>{"use strict";L();L();Ae();Ew();MN=e=>e===R?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},A6=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Jl=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=NP({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:MN(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?yw({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:wl(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=A6(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?Kl({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):Kl({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},Zm=(e,t,r=null)=>{let o=Om({raw:t,judge:MN(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var eg,xw=l(()=>{"use strict";eg=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var DN,tg,rg,NN,zN,Rw,b6,jN,Iw,P6,$N,w6,_6,HN,FN=l(()=>{"use strict";DN=require("node:child_process"),tg=g(require("node:fs")),rg=g(require("node:path"));L();NN=4e3,zN=12e3,Rw=(e,t)=>{let r=(0,DN.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},b6=e=>Rw(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",jN=e=>{let t=Rw(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},Iw=(e,t)=>{let r=rg.default.resolve(e,t),o=rg.default.relative(e,r);if(o.startsWith("..")||rg.default.isAbsolute(o)||!tg.default.existsSync(r)||!tg.default.statSync(r).isFile())return null;let n=tg.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>NN?`${n.slice(0,NN)}
\u2026truncated`:n},P6=e=>e.length>zN?`${e.slice(0,zN)}
\u2026truncated`:e,$N=e=>{let t=jP(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,Iw(e.workingDirectory,n)])),o=b6(e.workingDirectory);return{git:o,status:o?jN(e.workingDirectory):{},files:r,paths:t}},w6=(e,t)=>{let r=Rw(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=Iw(e,t);return o===null?`${t} is missing.`:o},_6=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",HN=e=>{let t=e.before.git?jN(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=Iw(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>w6(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:_6(e.before.git,e.before.paths.length>0),evidence:P6(i.join(`

`))}}});var Nw,U,zw,Te,UN,v6,C6,BN,Gs,GN,qs,L6,k6,Xl,Ow,Mw,W6,qN,T6,E6,x6,VN,R6,KN,JN,I6,O6,XN,YN=l(()=>{"use strict";Nw=require("node:child_process"),U=g(require("node:fs")),zw=g(require("node:os")),Te=g(require("node:path")),UN=8e6,v6=16e6,C6=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],BN=(e,t)=>{let r=(0,Nw.spawnSync)("git",[...t],{cwd:e,encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Gs=(e,t)=>(0,Nw.spawnSync)("git",[...t],{cwd:e,timeout:8e3}).status===0,GN=e=>{let t=BN(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},qs=(e,t)=>{let r=Te.default.resolve(e,t),o=Te.default.relative(e,r);return o.startsWith("..")||Te.default.isAbsolute(o)?null:r},L6=(e,t)=>{let r=qs(e,t);if(r===null||!U.default.existsSync(r))return null;let o=U.default.statSync(r);return!o.isFile()||o.size>UN?null:U.default.readFileSync(r)},k6=(e,t,r)=>{let o=qs(e,t);o!==null&&(U.default.mkdirSync(Te.default.dirname(o),{recursive:!0}),U.default.writeFileSync(o,r))},Xl=(e,t)=>{let r=qs(e,t);r===null||!U.default.existsSync(r)||U.default.rmSync(r,{recursive:!0,force:!0})},Ow=(e,t)=>Gs(e,["cat-file","-e",`HEAD:${t}`]),Mw=e=>{let t=BN(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},W6=e=>Te.default.resolve(e)!==Te.default.resolve(zw.default.homedir()),qN=e=>{if(!U.default.existsSync(e))return 0;let t=U.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?U.default.readdirSync(e).reduce((r,o)=>r+qN(Te.default.join(e,o)),0):0},T6=(e,t,r)=>{let o=qs(e,r);if(o===null||!U.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(qN(o)>v6)return{relativePath:r,existed:!0,copyDir:null};let n=Te.default.join(t,"cache",r);return U.default.mkdirSync(Te.default.dirname(n),{recursive:!0}),U.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},E6=400,x6=32e6,VN=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!U.default.existsSync(s)))for(let i of U.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=Te.default.join(s,i),c=U.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>UN)){if(t.length>=E6||r+c.size>x6){o=!1;return}r+=c.size,t.push(Te.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},R6=(e,t,r)=>{let o=qs(e,r);if(o===null||!U.default.existsSync(o))return null;let n=L6(e,r);if(n===null)return"skip";let s=Te.default.join(t,"files",r);return U.default.mkdirSync(Te.default.dirname(s),{recursive:!0}),U.default.writeFileSync(s,n),s},KN=e=>{let t=U.default.mkdtempSync(Te.default.join(zw.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?GN(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:VN(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,R6(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?Mw(e.workingDirectory):null,isolateCaches:W6(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:C6.map(i=>T6(e.workingDirectory,t,i))}},JN=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Xl(e.workingDirectory,t);return}k6(e.workingDirectory,t,U.default.readFileSync(r))}},I6=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?JN(e,t):Ow(e.workingDirectory,t)?Gs(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Xl(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&Ow(e.workingDirectory,t)&&Gs(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!Ow(e.workingDirectory,t)&&Gs(e.workingDirectory,["reset","-q","HEAD","--",t])},O6=(e,t)=>{let r=qs(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Xl(e.workingDirectory,t.relativePath),U.default.mkdirSync(Te.default.dirname(r),{recursive:!0}),U.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Xl(e.workingDirectory,t.relativePath);return}if(U.default.existsSync(r))for(let o of U.default.readdirSync(r)){let n=Te.default.join(r,o);U.default.statSync(n).mtimeMs>=e.startedMs-1e3&&U.default.rmSync(n,{recursive:!0,force:!0})}}}},XN=e=>{try{if(e.git){if(Mw(e.workingDirectory)!==e.head&&(!(e.head===null?Gs(e.workingDirectory,["update-ref","-d","HEAD"]):Gs(e.workingDirectory,["reset","--hard",e.head]))||Mw(e.workingDirectory)!==e.head))throw new Error("head");let r=GN(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))I6(e,o)}else{if(e.complete)for(let t of VN(e.workingDirectory).paths)e.files[t]===void 0&&Xl(e.workingDirectory,t);for(let t of Object.keys(e.files))JN(e,t)}for(let t of e.caches)O6(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{U.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var og,ng,M6,N6,z6,D6,j6,ZN,$6,QN,ez=l(()=>{"use strict";L();Qm();xw();FN();YN();Ae();He();Wt();yn();og=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),ng=e=>({...e,status:"stopped",errorMessage:nn,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),M6=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),N6=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==R?t:e.improverModel!==R?e.improverModel:null}return e.judgeModel!==R?e.judgeModel:e.improverModel!==R?e.improverModel:null},z6=async e=>{let t=ae(e.cycle),r=$N({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=KN({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Rl({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:ln(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):Pl({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=IN({promptText:e.revision.promptText,isModuleRun:i}),c=Vl({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},p=await qe({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=p.ok?HN({workingDirectory:t,before:r,writerReply:p.text}):null,S=XN(o),f={...e.cycle,revisions:e.cycle.revisions.map(y=>y.roundNumber===e.cycle.currentRound?d:y)};return p.ok?!S.ok||m===null?{ok:!1,cycle:og(f,S.ok?"Could not put the folder back after the run.":S.errorMessage)}:{ok:!0,cycle:f,run:{output:p.text.trim(),tokens:p.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:p.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:ng(f)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:og(f,p.errorMessage,wr(p))})},D6=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:z6({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),j6=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),ZN=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await qe({writerAgent:e.reviewer,workingDirectory:ae(e.cycle),prompt:DP({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:ng(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},$6=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===R)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await qe({writerAgent:t.judgeModel,workingDirectory:ae(t),prompt:an({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Jl(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?ng(o):(e.onWriterFailure?.(t.judgeModel),og(o,n.errorMessage,wr(n)))},QN=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return $6(e);let o=N6(t),n=await D6({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?M6(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===R){let p=await ZN({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...j6(s,p.text),judgePhase:void 0}}let i=await qe({writerAgent:t.judgeModel,workingDirectory:ae(t),prompt:sn({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?ng(s):(e.onWriterFailure?.(t.judgeModel),og(s,i.errorMessage,wr(i)));let a=await ZN({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Jl(s,i.text,c);return eg(d,a.text)}});var An,sg=l(()=>{"use strict";L();An=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:bl({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:wl(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var ig,H6,F6,Dw,tz=l(()=>{"use strict";L();Qm();ez();sg();Wt();Ae();Ew();He();yn();ig=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),H6=e=>({...e,status:"stopped",errorMessage:nn,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),F6=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?H6(e):(n?.(r),ig(e,t.errorMessage,wr(t))),Dw=async(e,t,r,o)=>{let n=Kl(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return ig(e,"This round has no prompt.");if(e.status==="judging")return QN({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return ig(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===R)return e;let i=An(e);if(i===null)return ig(e,"The improver needs the score and the reason.");let a=await qe({writerAgent:e.improverModel,workingDirectory:ae(e),prompt:oo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:Vl()}),c=F6(e,a,e.improverModel,r,t);return c!==null?c:Zm(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var Yl,jw=l(()=>{"use strict";Yl=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var Zl,$w,oz,rz,U6,B6,ag,nz,sz,G6,q6,bn,iz,az,Ql=l(()=>{"use strict";L();Bl();Gl();Ae();He();Wt();yn();tz();jw();Zl=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),$w=(e,t,r)=>e.wizard===void 0||t===null?Zl(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},oz=(e,t,r)=>uN(r)?Zl(e,r.errorMessage,wr(r)):$w(e,t,r.errorMessage),rz=e=>{let t=e.wizard;return t===void 0||Yl(e).length===0?e:{...e,wizard:Ds({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},U6=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",B6=e=>{let t=e.wizard;if(t===void 0)return e;let r=Il({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Ds({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},ag=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),nz=e=>e.judgeModel!==R?e.judgeModel:e.improverModel!==R?e.improverModel:null,sz=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},G6=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=nz(e);if(n===null)return Zl(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Lt(o),i=El({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:sz(e,"generalize")}),a=await qe({writerAgent:n,prompt:i,workingDirectory:ae(e),signal:t});if(!a.ok)return r?.(n),oz(e,"generalize",a);try{let c=iw(a.text),d=Ds({wizard:{...o,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:jl(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return Ml(d)?bn({...p,wizard:{...d,gate:null}}):ag(p,"generalize")}catch(c){return $w(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},q6=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=nz(e);if(n===null)return Zl(e,"Choose a writer to suggest splits.");let s=kt({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=xl({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:sz(e,"separate")}),a=await qe({writerAgent:n,prompt:i,workingDirectory:ae(e),signal:t});if(!a.ok)return r?.(n),oz(e,"separate",a);try{let c=aw(a.text),d=XP(c,o.variables),p=Ds({wizard:{...o,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:p};return zl(d)?so(m,d[0]):ag(m,"separate")}catch(c){return $w(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},bn=e=>{let t=e.wizard;if(t===void 0)return e;let r=Lt(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},iz=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Zl(e,"This module is missing.");let n=Sr(r),s=cn(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==R?e.runnerModel:e.judgeModel!==R?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:oe(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},az=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return Dw(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return G6(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return q6(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await Dw(e,t,r,o);if(E(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Yl(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=se(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&Nl({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let p=rz(ag(a,i));return io(p)}let c=ag(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=QP({wizard:{...c.wizard,modules:c.wizard.modules.map((m,S)=>S===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:U6(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?rz(d):B6(d)}return s}return n.phase==="complete",e}});var Vs,lg=l(()=>{"use strict";L();Ae();Vs=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:ow(r,e.judgeModel===R),updatedAt:new Date().toISOString()}}});var lz,Ks,cg=l(()=>{"use strict";Wt();lz=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:mN(e.promptText)},Ks=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t===void 0?null:lz(t);if(r!==null)return r.trim();for(let o=e.revisions.length-1;o>=0;o-=1){let n=lz(e.revisions[o]);if(n!==null)return n.trim()}return null}});var Vt,Js=l(()=>{"use strict";Vt='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var Hw,cz,V6,dz,uz,Fw=l(()=>{"use strict";L();Ae();He();Js();Hw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cz=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',V6=e=>{let t=cz(e.state),r=`<h2>${Hw(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${Hw(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Vt}</button></div><template>${r}</template></li>`},dz=e=>{let t=e.wizard;if(t===void 0)return"";let r=Um({status:e.status,wizard:t,writerLabel:ne(e.judgeModel),runnerLabel:ne(e.runnerModel??e.judgeModel),folderDisplay:ot(ae(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(V6).join("")}</ol>`},uz=e=>{let t=e.wizard;if(t===void 0)return"";let r=Um({status:e.status,wizard:t,writerLabel:ne(e.judgeModel),runnerLabel:ne(e.runnerModel??e.judgeModel),folderDisplay:ot(ae(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${cz(n.state)}<span class="sdlc-pipeline-label">${Hw(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var Tt,pz,mz,gz,Uw=l(()=>{"use strict";L();Tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pz="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",mz=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Tt(pz)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${Tt(i.name)}}}</strong> \u2014 ${Tt(i.description)} (sample: ${Tt(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Tt(r)}</pre>`,n=Lt(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Tt(n)}</pre>`;return`${t}${o}${s}`},gz=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Tt(pz)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${Tt(n.name)}}}</strong> \u2014 ${Tt(n.description)} (sample: ${Tt(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${Tt(r)}</pre>`;return`${t}${o}`}});var fz,hz=l(()=>{"use strict";L();fz=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=an({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=sn({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var Bw,dg,Gw=l(()=>{"use strict";Js();hz();Bw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dg=e=>{let t=fz(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${Bw(r)}">${Vt}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${Bw(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${Bw(t)}</pre></template>`}});var ug,Xs,qw=l(()=>{"use strict";jw();Gw();ug=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xs=e=>{let t=Yl(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${ug(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,p=e.cycle.revisions.map(m=>{let S=m.judgement?.score,f=S==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${S}`,y=m.judgement?.reasons?.trim()??"",u=y.length===0?"":`<br><span class="muted">${ug(y)}</span>`,A=dg({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run});if(e.interactive){let b=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${b}> <span class="sdlc-wizard-revision-title">${ug(f)}</span></label>${A}${u}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${ug(f)}</span>${A}${u}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var Vw,yz,Sz,Az,Kw=l(()=>{"use strict";Vw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yz=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Vw(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Vw(t.prompt)}</pre></li>`).join("")}</ol>`,Sz=e=>yz([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),Az=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Vw(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${yz(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var ec,K6,pg,Jw=l(()=>{"use strict";L();Kw();ec=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),K6=e=>{let t=e.wizard;return t===void 0?"":kt({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},pg=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=K6(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${ec(n.orchestratorSkill.fileName)}</code> \u2014 ${ec(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${ec(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=Sz(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${ec(r)} <span class="muted">${ec(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Ne,J6,X6,Y6,Z6,mg,Q6,eJ,tJ,rJ,oJ,nJ,Ys,gg=l(()=>{"use strict";L();Fw();Uw();qw();Gw();Jw();Ne=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),J6={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},X6=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Ne(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Ne(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Ne(o)}</pre></details>`;return`<h2>${Ne(e)}</h2>${n}`},Y6=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=Lt(t).trim(),n=kt({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!E(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${X6("What is being evaluated",i)}`},Z6=(e,t)=>{let r=e.wizard;if(r===void 0||E(e.status))return"";let o=J6[t];return o===void 0||r.phase!==o?"":uz(e)},mg=(e,t,r)=>{let o=Z6(e,t),n=t==="wizard-2"?Y6(e):"";return`${o}${n}${r}`},Q6=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},eJ=e=>{let t=e.wizard;return t===void 0?"":mz(t)},tJ=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Ne(a)}</span>`,d=dg({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ne(s)}${i}</span>${d}${c}</li>`}).join("")}</ul>`,rJ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Xs({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=Q6(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${tJ(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=kt({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Ne(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Ne(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},oJ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Ne(n.title)}</strong> <span class="muted">(${Ne(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Ne(o.title)}</strong>${n}${Ne(s)}${pg(e,o)}</li>`}).join("")}</ul>`},nJ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Ne(i)}</span> <strong>${Ne(n.title)}</strong>${Ne(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Ne(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Xs({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Ys=(e,t)=>{switch(t){case"wizard-1":return mg(e,t,eJ(e));case"wizard-2":return mg(e,t,rJ(e));case"wizard-3":return mg(e,t,oJ(e));case"wizard-4":return mg(e,t,nJ(e));default:return""}}});var sJ,iJ,bz,Pz,wz=l(()=>{"use strict";L();cg();Wt();gg();sJ=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},iJ=e=>{let t=e.goal.trim();return t.length===0?null:t},bz=(e,t,r,o,n)=>{let s=at(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},Pz=(e,t)=>{let r=iJ(e);if(t.id.startsWith("wizard-")){let s=Ys(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=vl(e,t);if(s!==null){let a=Ks(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=se(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:bz(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:sJ(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:bz(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var Pn,_z,vz=l(()=>{"use strict";Pn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_z=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${Pn(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Pn(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${Pn(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${Pn(n)}</h2><pre class="mono">${Pn(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${Pn(e.goal)}</dd></div></dl>`;return`<h2>${Pn(e.title)}</h2>${i}${t}${r}${o}${s}`}});var aJ,Cz,tc,Xw,fg=l(()=>{"use strict";L();aJ=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),Cz=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||E(e.status))return null;let r=vt(t);return r<0||r>3?null:`wizard-${r+1}`},tc=(e,t)=>aJ.has(t)?Cz(e)===t:!1,Xw="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var lJ,hg,Yw=l(()=>{"use strict";lJ='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',hg=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${lJ}</button>`});var cJ,Lz,dJ,Zw,kz,uJ,pJ,mJ,gJ,Wz,Tz=l(()=>{"use strict";L();sg();cJ={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},Lz=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},dJ=e=>cJ[e]??null,Zw=(e,t)=>{let r=e.wizard,o=dJ(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=vt(r);return o<n||o===n},kz=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},uJ=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:Lt(t).trim();return o.length===0?null:El({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:Lz(e,"generalize")})},pJ=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=An(e);return n===null?null:oo({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=kz(e)?.promptText.trim()??kt({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:an({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},mJ=e=>{let t=e.wizard;if(t===void 0)return null;let r=kt({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:xl({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:Lz(e,"separate")})},gJ=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=Sr(t),s=cn(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=An(e);return c===null?null:oo({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=kz(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||E(e.status)&&i?.judgement!==null)?sn({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):Rl({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:ln(t,r).output,moduleTitle:o.title})},Wz=(e,t)=>{if(!Zw(e,t))return null;switch(t){case"wizard-1":return uJ(e);case"wizard-2":return pJ(e);case"wizard-3":return mJ(e);case"wizard-4":return gJ(e);default:return null}}});var fJ,yg,Qw=l(()=>{"use strict";L();fJ=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},yg=(e,t)=>{let r=e.wizard,o=fJ(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=vt(r);return o<n?"done":o===n&&E(e.status)&&e.status==="failed"?"failed":o<=n&&E(e.status)?"done":"pending"}});var hJ,Zs,Sg=l(()=>{"use strict";Js();Tz();Qw();hJ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zs=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(yg(e,t)==="pending")return""}else if(!Zw(e,t))return"";let o=Wz(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Vt}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${hJ(o)}</pre></template>`}});var Kt,yJ,Ez,xz,Rz,Iz,e_=l(()=>{"use strict";L();wz();vz();fg();Yw();Js();cg();Fw();Sg();Bs();Kt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yJ=(e,t)=>{let r=vl(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?_r(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${Sn(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Kt(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${Kt(r)}</span>`:"",d=_z(Pz(t,e)),p=t.wizard!==void 0&&t.wizard.phase==="complete"&&E(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${Kt(e.id)}"`:"",m=tc(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${Kt(Xw)}"><input type="hidden" name="cycleId" value="${Kt(t.id)}"><input type="hidden" name="wizardStepId" value="${Kt(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",S=e.state==="active"&&e.id.startsWith("wizard-")?dz(t):"",f=o?"failed":e.state,y=o?Ks(t):null,u=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Vt}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${Kt(y)}</pre></template>`:"",A=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Zs(t,e.id):"";return`<li class="sdlc-node sdlc-node-${f}" data-sdlc-step-id="${Kt(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${p} data-sdlc-node>${n}<span class="sdlc-node-label">${Kt(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${A}${u}</div></div>${S}<template>${d}</template></li>`},Ez=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>yJ(r,t)).join("")}</ol>`,xz=e=>`<div class="sdlc-score" aria-label="What the score means">${_l(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Kt(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,Rz=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${hg({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,Iz=`<script>
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
</script>`});var Qs,Ag=l(()=>{"use strict";Qs=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var lt,Oz,SJ,Mz=l(()=>{"use strict";L();He();Ag();Wt();ww();lt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Oz=e=>{if(!E(e.status))return"";let t=se(e.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??null,reasons:S.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=at(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${lt(t.reasons.trim())}</p>`,i=e.status==="passed",a=Qs(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${lt(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${lt(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',p=n!==null?`<div class="alert-error">${lt(n)}</div>`:i?SJ({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ae(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${lt(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${lt(t.promptText)}</pre></details>`,m=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${m}</h2>${d}${o}${s}${p}</section>`},SJ=e=>{let t=e.sourceSkill?.fileName??Ul(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=Xm(t,r),s=n.length>0&&SN(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${lt(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${lt(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${lt(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${lt(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${lt(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${lt(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var Nz,zz=l(()=>{"use strict";Nz=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var Dz,AJ,bg,Ve,Pg,t_=l(()=>{"use strict";L();L();Ae();zz();cg();Wt();Ag();Dz=["Generalize","Evaluate","Separate","Optimize modules"],AJ=e=>{let t=vt(e),r=t>=0&&t<Dz.length?Dz[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},bg=(e,t)=>{let r=Ks(e),o=r===null?null:Nz(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Ve=(e,t)=>({title:e,detail:t,replyPreview:null}),Pg=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:null}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!E(e.status)){let t=e.judgeModel;return Ve(`${ne(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!E(e.status)){let t=e.judgeModel;return Ve(`${ne(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===R?Ve(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Ve(`${ne(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Ve(`${ne(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===R){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==R?Ve(`${ne(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Ve(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Ve(`${ne(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=oe(t);return Ve(`${ne(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Ve(`${ne(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=oe(t);return Ve(`${ne(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Ve(`${ne(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===R){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Ve("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Ve(`${ne(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>at(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=Q(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||E(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?bg(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=Qs(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?bg(e,{title:`${AJ(r)}${s}`,detail:t.length>0?t:n}):bg(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(E(e.status)){let t=e.errorMessage?.trim()??"";return bg(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var Jt,rc=l(()=>{"use strict";Ae();Jt=e=>{if(e.status==="improving"&&e.improverModel===R)return!0;if(e.status!=="judging"||e.judgeModel!==R)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===R}});var jz,$z=l(()=>{"use strict";jz=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var ao,bJ,Hz,Fz=l(()=>{"use strict";L();ao=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bJ=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${ao(r)}</p>`},Hz=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${ao(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${ao(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${ao(a)}.</p>`}<pre class="mono">${ao(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${no(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${ao(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",m=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${ao(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${bJ(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${ao(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var oc,PJ,Uz,Bz=l(()=>{"use strict";L();Wt();oc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),PJ=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=at(t.promptText),n=t.judgement?.reasons?`<p class="muted">${oc(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${oc(i)}.</p>`}<pre class="mono">${oc(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${no(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${oc(d)}</pre>`:`<div class="alert-error">${oc(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},Uz=e=>e.revisions.map(t=>PJ(e,t)).join("")});var Gz,qz=l(()=>{"use strict";L();Gz=e=>{if(E(e.status))return"none";let t=e.wizard;return t===void 0?"classic":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Xt,wJ,r_,_J,vJ,CJ,LJ,Vz,Kz,o_=l(()=>{"use strict";qz();Xt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wJ="Stop this run? Writers will stop and the best prompt is kept.",r_="End the wizard? Writers will stop and progress from finished steps is kept.",_J="Skip this module and pause at the step gate?",vJ=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Xt(wJ)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Xt(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,CJ=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Xt(r_)}"><input type="hidden" name="cycleId" value="${Xt(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,LJ=e=>{let t=Xt(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Xt(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Xt(_J)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Xt(r_)}">End wizard</button>
    </form>
  </div>`},Vz=e=>{let t=Gz(e);return t==="none"?"":t==="classic"?vJ(e.id):t==="wizard_end_only"?CJ(e.id):LJ(e)},Kz=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Xt(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Xt(r_)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var Jz,Xz=l(()=>{"use strict";L();Bs();Jz=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=Q(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${Sn(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${Sn(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${oe(r)}`}return""}});var kJ,WJ,Yz,TJ,Zz,Qz=l(()=>{"use strict";L();Xz();Qw();gg();Sg();kJ=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',WJ=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',Yz=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),TJ=(e,t,r)=>{let o=Ys(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=Jz(e,t),i=yg(e,t),a=kJ(i),c=WJ(i),d=Zs(e,t,{forOutcomeSummary:!0}),p=`${a}<span class="sdlc-wizard-outcome-step-title">${Yz(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${Yz(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",S=i==="failed"&&t!=="wizard-4"?" open":"",f=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${f}"${m}${S}><summary aria-controls="${f}-body">${p}</summary><div class="sdlc-wizard-outcome-step-body" id="${f}-body">${o}</div></details>`},Zz=e=>{let t=e.wizard;if(t===void 0||!E(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>TJ(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var eD,tD,rD=l(()=>{"use strict";eD=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tD=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${eD(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${eD(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var n_,oD,s_=l(()=>{"use strict";n_=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,oD=(e,t)=>{if(n_(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var nD,sD=l(()=>{"use strict";nD=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var wg,iD,aD=l(()=>{"use strict";L();s_();s_();sD();wg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),iD=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=Q(t),o=oe(t),n=r.terminalStatusSuggestion==="passed"?"":nD(r,o),s=o-10,i=r.rows.map((c,d)=>{let p=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,f=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=p===void 0?c.status:oD(p,o),u=p!==void 0&&n_(p,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':y==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':y==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':wg(y);return`<tr${f}><td>${wg(c.title)}</td><td>${wg(m)}</td><td>${c.tokens??"\u2014"}</td><td>${u}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${wg(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var wn,_g,i_=l(()=>{"use strict";wn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_g=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${wn(r.fileName)}</code> \u2014 ${wn(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${wn(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${wn(i.name)}</strong> <code>.cursor/skills/${wn(i.fileName)}/SKILL.md</code></p><p class="muted">${wn(i.description)}</p><p>${wn(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var EJ,lD,cD=l(()=>{"use strict";L();L();rD();aD();i_();EJ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lD=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!E(e.status)||t.modules.length===0)return"";let r=iD(e),o=tD(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=Q(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${EJ(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${_g(e)}${a}${r}${o}</section>`}});var pe,vg=l(()=>{"use strict";L();pe={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",estimatedSpendLabel:"Estimated spend (USD)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",rateLabel:"Rate (USD / 1k tokens)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var Cg,a_=l(()=>{"use strict";Cg=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var dD,uD=l(()=>{"use strict";vg();a_();dD=e=>{let t=Cg({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:pe.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var vr,nc=l(()=>{"use strict";vr=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var Cr,Lg,l_=l(()=>{"use strict";L();e_();Mz();t_();rc();$z();sg();Fz();Bz();o_();Qz();cD();Bs();uD();He();nc();Cr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lg=e=>{let t=!E(e.status)&&e.status!=="wizard_paused"&&!Jt(e),r=Pg(e),o=Ez(BP(jz(e)),e),n=E(e.status)?"":Vz(e),s=Zz(e),i=lD(e),a=Oz(e),c=e.errorMessage===null?"":`<div class="alert-error">${Cr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?Q(e.wizard):null,S=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,f=!t&&e.wizard!==void 0&&E(e.status)&&(e.wizard.phase==="complete"||Q(e.wizard).passedModuleCount>0),y=f?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",u=f&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Cr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",A=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${Cr(r.replyPreview)}</pre>`,b=r.detail.length===0&&u.length===0&&A.length===0||r.detail.length===0&&A.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Cr(r.detail)}${p}</p>`}${A}</div>`,h=e.revisions.find(yo=>yo.roundNumber===e.currentRound),w=e.status==="improving"?An(e):null,_=_r(e),C=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),k=Jt(e)?Hz({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:w?.promptText??h?.promptText??"",score:w?.score??h?.judgement?.score??null,reasons:w?.reasons??h?.judgement?.reasons??null,avoid:w?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:h?.run??null,minJudgeScore:C?1:0}):"",W=e.wizard!==void 0&&e.wizard.phase==="complete"&&E(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!W&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?oe(e.wizard):e.passScore,M=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${xz(I)}</div>`:"",H=e.status==="failed"?dD({status:e.status,errorKind:e.errorKind}):null,q=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':E(e.status)?H!==null?`<span class="${H.badgeClass}">${H.badgeLabel}</span>`:W&&m!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",B=t?d:f?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',Fe=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Cr(ot(ae(e)))}</li>`:"",_>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Sn(_)} so far</li>`:""].filter(yo=>yo.length>0),F=Fe.length===0?"":`<ul class="sdlc-run-meta">${Fe.join("")}</ul>`,we=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,$r=W?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,tr=W?"":M.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${$r}</div>`:`<div class="sdlc-run-grid">${$r}${M}</div>`,SL=Uz(e),qB=e.wizard!==void 0&&E(e.status)&&e.revisions.every(yo=>yo.roundNumber===0&&(yo.judgement===void 0||yo.judgement===null)),VB=SL.length===0||qB?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${SL}</div></section>`,KB=`<p class="sdlc-run-goal" title="${Cr(e.goal.trim())}">${Cr(vr(e.goal))}</p>`,JB=W?`${c}${i}${s}${k}${a}`:`${c}${tr}${k}${s}${a}`,XB='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',YB=W?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Cr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${XB}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${q}</div>${KB}<div class="sdlc-run-activity${y}"${f?' role="status"':""}><div class="sdlc-run-activity-icon">${B}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Cr(r.title)}</h2>${b}${u}${YB}</div></div>${F}${we}</header>${JB}</section>${VB}`}});var pD,mD=l(()=>{"use strict";L();Gl();pD=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Nl({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:io(e)}});var gD,fD=l(()=>{"use strict";L();Ql();gD=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Ml(t)?e:bn({...e,wizard:{...t,gate:null}})}});var hD,yD=l(()=>{"use strict";L();Bl();hD=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!zl(t.splitOptions))return e;let r=t.splitOptions[0];return so(e,r)}});var xJ,_n,kg=l(()=>{"use strict";mD();fD();yD();rt();xJ=e=>{let t=gD(e),r=pD(t);return hD(r)},_n=(e,t)=>{let r=xJ(t);return r!==t?(z(e,r),r):t}});var SD,Lr,sc=l(()=>{"use strict";L();SD=e=>tt.indexOf(e),Lr=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||E(e.status)?tt.length:t.gate!==null?SD(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?SD(t.phase):null}});var AD,bD=l(()=>{"use strict";AD=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var vn,PD,wD=l(()=>{"use strict";L();bD();vn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),PD=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=ln(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${vn(AD(o))}</pre></div>`:"",s=dn(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=Sr(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),p=Bm(c),m=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,f=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${vn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${vn(p)}">${vn(S)}</label>
        ${f}
        <input class="input" type="text" id="${vn(p)}" name="${vn(p)}" value="${vn(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var _D,vD=l(()=>{"use strict";_D={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},roundLimit:{title:"Round limit",practice:"The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",example:"10"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var ic,RJ,le,lo=l(()=>{"use strict";vD();Js();ic=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RJ=e=>{let t=_D[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${ic(t.title)}" aria-describedby="${r}" aria-expanded="false">${Vt}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${ic(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${ic(t.example)}</span></span></button>`},le=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${ic(r)}"`}>${ic(e)}</span>${RJ(t)}</span>`});var Et,CD,LD,kD=l(()=>{"use strict";L();L();L();vg();lo();Et=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),CD=e=>{let t=e.costControls;if(t===void 0||Hs(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??Ar({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${Et(pe.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${Et(t.softWarnMessage??un)}</p>`:"",d=e.wizard?.modules.length??0,p=d>0?`<p class="muted">Step 4 will optimize ${d} module${d===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${Et(pe.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${Et(pe.confirmLede)}</p>
  ${p}
  ${a}
  ${c}
  <p class="muted sdlc-cost-confirm-required" hidden>${Et(js)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${Et(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${Et(pe.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${Et(pe.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${Et(pe.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${le(pe.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${le(pe.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${Et(pe.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${Et(pe.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},LD=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!Hs(r)}});var ac,WD,TD=l(()=>{"use strict";L();Uw();wD();qw();o_();i_();Jw();kD();ac=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WD=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(LD(e))return CD(e);let n=oe(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?gz(r):"",a=o==="evaluate"?_g(e):"",c=o==="evaluate"?Xs({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",p=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(x=>{let I=x.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',M=x.recommended?' <span class="sdlc-badge">Recommended</span>':"",H=r.selectedSplitOptionId===x.id||r.selectedSplitOptionId===null&&x.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${ac(x.id)}" required${H}> <strong>${ac(x.title)}</strong>${I}${M}</label>${pg(e,x)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],f=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=m?.title??"Module",u=m?.prompt??"",A=m?.status==="pending",b=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${ac(y)}</p>${A?PD({cycle:e,modulePrompt:u}):""}<p class="muted">Test run prompt preview: ${ac(cn(u,Sr(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${Xs({cycle:e,interactive:!1,caption:A?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",h=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":A?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",w=Ol(r),_=w===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${w}</p>`,C=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",k=t?.active===!0?" sdlc-wizard-gate-active":"",W=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${C}"`:"";return`<section class="card sdlc-wizard-gate${k}"${W}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${h}</p>
    ${_}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${ac(e.id)}">
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
        <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue"${f}>Continue</button>
        <button class="btn btn-secondary" type="submit" name="intent" value="wizard-feedback-rerun" formnovalidate>Rerun with feedback</button>
      </div>
    </form>
    ${Kz(e)}
  </section>`}});var IJ,ED,xD=l(()=>{"use strict";L();Sg();IJ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ED=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||E(e.status))return"";let r=(o,n)=>{let s=Zs(e,o);return`<h2 class="sdlc-wizard-active-head">${IJ(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var c_,RD,ID,co,OD,ei=l(()=>{"use strict";L();rt();c_=new Map,RD=e=>{let t=new AbortController;return c_.set(e,t),t.signal},ID=e=>{c_.delete(e)},co=e=>{c_.get(e)?.abort()},OD=(e,t)=>{let r=K(e,t);return r===null||r.wizard!==void 0?!1:(E(r.status)||(z(e,{...r,status:"stopped",errorMessage:nn,updatedAt:new Date().toISOString()}),co(t)),!0)}});var MD,ND,d_,zD,u_=l(()=>{"use strict";L();sc();ei();MD="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",ND=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return tt[r]??null},d_=(e,t)=>{let r=ND(t);if(r===null||e.wizard===void 0)return!1;let o=tt.indexOf(r);if(o===-1)return!1;let n=Lr(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<tt.length)},zD=(e,t)=>{let r=ND(t);if(r===null||e.wizard===void 0||!d_(e,t))return e;co(e.id);let o=tt.slice(tt.indexOf(r)),n=Tl(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var p_,DD,jD=l(()=>{"use strict";u_();p_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DD=(e,t)=>d_(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${p_(MD)}"><input type="hidden" name="cycleId" value="${p_(e.id)}"><input type="hidden" name="wizardStepId" value="${p_(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var OJ,MJ,NJ,$D,HD=l(()=>{"use strict";L();sc();TD();xD();jD();gg();OJ={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},MJ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),NJ=(e,t,r)=>{let o=DD(e,t);return`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${MJ(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${Ys(e,t)}</div>
</details>`},$D=e=>{let t=e.wizard;if(t===void 0)return"";let r=Lr(e);if(r===null)return"";let o=tt.slice(0,r).map((i,a)=>NJ(e,`wizard-${a+1}`,OJ[i])),n=t.gate!==null?WD(e,{active:!0}):ED(e),s=r>=tt.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var Wg,m_=l(()=>{"use strict";HD();Kw();L();Wg=e=>{if(e===null||e.wizard!==void 0&&E(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=$D(e),r=Az(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var zJ,g_,FD=l(()=>{"use strict";L();Ae();He();yn();zJ=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},g_=async(e,t,r)=>{if(!zJ(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===R)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=ew({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await qe({writerAgent:e.judgeModel,prompt:n,workingDirectory:ae(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=rw(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var lc,Tg,UD,f_,BD,GD,qD,Eg,h_=l(()=>{"use strict";lc=g(require("node:fs")),Tg=g(require("node:path")),UD=e=>Tg.default.join(Tg.default.dirname(e),"prompt-optimizer-writer-ready.json"),f_=e=>{let t=UD(e);if(!lc.default.existsSync(t))return{};try{let r=JSON.parse(lc.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},BD=(e,t)=>{lc.default.mkdirSync(Tg.default.dirname(e),{recursive:!0}),lc.default.writeFileSync(UD(e),`${JSON.stringify(t,null,2)}
`)},GD=(e,t)=>f_(e)[t]?.message??null,qD=(e,t,r)=>{BD(e,{...f_(e),[t]:{message:r}})},Eg=(e,t)=>{let r=f_(e);r[t]!==void 0&&BD(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var y_,xg,Rg,VD,be,Cn=l(()=>{"use strict";L();_w();Ql();FD();rc();ei();h_();kg();rt();y_=new Set,xg={atMs:0,ids:[]},Rg=async()=>{if(Date.now()-xg.atMs<3e4)return xg.ids;let e=await _t({commands:ue({})});return xg.atMs=Date.now(),xg.ids=e.installedWriterIds,e.installedWriterIds},VD=async(e,t,r)=>{let o=K(e,t);if(o===null||r.aborted)return;let n=_n(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(E(n.status)&&!s||n.status==="wizard_paused"||Jt(n))return;if(s){let c=await g_(n,r,d=>{Eg(e,d)});z(e,c);return}let i=await az(n,c=>{Eg(e,c)},r,c=>{K(e,t)?.status==="stopped"||r.aborted||z(e,c)});if(!(K(e,t)?.status==="stopped"||r.aborted)){if(z(e,i),E(i.status)){let c=await g_(i,r,d=>{Eg(e,d)});z(e,c);return}await VD(e,t,r)}},be=(e,t)=>{if(y_.has(t))return;let r=K(e,t);if(r===null)return;let o=_n(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(E(o.status)&&!n||o.status==="wizard_paused"||Jt(o))return;y_.add(t);let s=RD(t);VD(e,t,s).finally(()=>{y_.delete(t),ID(t)})}});var uo,cc=l(()=>{"use strict";l_();kg();m_();Cn();uo=(e,t)=>{let r=_n(e,t);return be(e,r.id),`${Lg(r)}${Wg(r)}`}});var KD,JD,XD=l(()=>{"use strict";KD=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,JD=e=>e!==null&&e>0});var DJ,jJ,$J,YD,ZD=l(()=>{"use strict";L();Ql();lg();Bl();Gl();ei();fg();fg();DJ=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),jJ=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},$J=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=Q(o);return Vs({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},YD=(e,t)=>{if(!tc(e,t))return e;co(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return bn({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return io(jJ(r));if(t==="wizard-3"){let n=o.splitOptions[0]??DJ(o.templatedPrompt);return so(r,n)}return t==="wizard-4"?$J(r):e}});var Ig,QD,S_=l(()=>{"use strict";L();lg();ei();Ig=e=>(co(e.id),{...Vs(e,"stopped"),errorMessage:kP}),QD=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;co(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var HJ,ej,tj,rj=l(()=>{"use strict";L();L();L();L();Ql();lg();Bl();Gl();cc();rt();Cn();XD();u_();ZD();S_();HJ="Pick a revision scored above 0 before continuing to Separate.",ej=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),tj=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=K(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=K(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(uo(e.storePath,d))};if(o==="wizard-stop-all"){let c=Ig(s);return z(e.storePath,c),be(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=QD(s);return z(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=zD(s,c);return z(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=YD(s,c);return z(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&be(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",m=KP(s.wizard,d,c);m=Tl(m,d),m={...m,pendingStepInstructions:p};let S={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return z(e.storePath,S),be(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?ej(s):bn({...s,wizard:{...s.wizard,gate:null}});return z(e.storePath,m),be(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=KD(s,p??-1);if(!JD(m)){let f={...s,errorMessage:HJ,updatedAt:new Date().toISOString()};return z(e.storePath,f),a(n),!0}let S=io({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return z(e.storePath,S),be(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let f=ej(s);return z(e.storePath,f),be(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(f=>f.id===p);if(m===void 0){let f={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return z(e.storePath,f),a(n),!0}let S=so(s,m);return z(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,p=d.currentModuleIndex,m=d.modules[p];if(m===void 0)return a(n),!0;if(!Hs(s.costControls)){let A=t.get("confirmedTokenBudget")?.trim()??"",b=t.get("confirmedMaxSpendUsd")?.trim()??"";if(A.length===0){let w={...s,errorMessage:js,updatedAt:new Date().toISOString()};return z(e.storePath,w),a(n),!0}let h=Fl({existing:s.costControls,confirmedTokenBudget:Number(A),confirmedMaxSpendUsd:b.length===0?null:Number(b),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!h.ok){let w={...s,errorMessage:h.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,w),a(n),!0}s={...s,costControls:h.costControls,errorMessage:null,updatedAt:new Date().toISOString()},z(e.storePath,s)}let S=mw({wizard:d,modulePrompt:m.prompt,posted:t});if(!S.ok){let A={...s,errorMessage:S.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,A),a(n),!0}let f={...d,parameterValues:S.parameterValues};if(m.status==="pending"){let A=iz({...s,wizard:{...f,gate:null}},p);return z(e.storePath,A),be(e.storePath,n),a(n),!0}let y=p+1;if(y>=d.modules.length){let A=Q(f),b=Vs({...s,wizard:f},A.terminalStatusSuggestion);return z(e.storePath,b),be(e.storePath,n),a(n),!0}let u={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...f,gate:"optimize_modules",currentModuleIndex:y},updatedAt:new Date().toISOString()};return z(e.storePath,u),a(n),!0}}return a(n),!0}});var FJ,oj,UJ,A_,BJ,nj,sj=l(()=>{"use strict";Ae();ei();S_();xw();Qm();rc();rt();FJ="Add a score from 0 to 100 and the reason for it.",oj="Add a score from 1 to 100 and the reason for it.",UJ="Write the next prompt.",A_="This step is not waiting for you.",BJ=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},nj=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=K(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(z(e.storePath,Ig(a)),{kind:"saved",cycleId:i}):OD(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=K(e.storePath,r);if(o===null||!Jt(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:A_};if(t==="manual-judge"){if(o.judgeModel!==R)return{kind:"invalid",cycle:o,errorMessage:A_};let i=BJ(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?oj:FJ};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:oj};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",p=eg(Jl(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return z(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==R)return{kind:"invalid",cycle:o,errorMessage:A_};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:UJ};let s=Zm(o,n);return z(e.storePath,s),{kind:"saved",cycleId:o.id}}});var ij,aj=l(()=>{"use strict";ij=`<script>
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
</script>`});var lj,cj=l(()=>{"use strict";lj=`<script>
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
</script>`});var dj,uj=l(()=>{"use strict";dj=`<script>
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
</script>`});var pj,mj=l(()=>{"use strict";L();L();He();pj=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:ot(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(oe(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!E(t.status)}}});var gj,fj=l(()=>{"use strict";L();sc();Ag();gj=e=>{let t=Qs(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:E(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Classic \xB7 revision round ${e.currentRound}`};let r=Lr(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=Q(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=Q(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return E(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var hj,yj=l(()=>{"use strict";hj=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var kr,GJ,qJ,Sj,Aj=l(()=>{"use strict";fj();yj();nc();kr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GJ=e=>e.wizard===void 0?"classic":"wizard",qJ=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${kr(t)}">`,o=gj(e),n=hj(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${kr(o.badgeClass)}">${kr(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${kr(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${kr(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${GJ(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${kr(e.id)}">${kr(vr(e.goal))}</a><p class="muted">${kr(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${m}</div></li>`},Sj=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(i=>qJ(i,t)).join(""),o=Math.min(e.length,20),n=o===e.length?`History \xB7 ${e.length}`:`History \xB7 ${o} of ${e.length}`,s=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2><ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${kr(n)}</summary>${s}</details>`:s}});var b_,Og,bj,VJ,KJ,dc,Pj,Mg=l(()=>{"use strict";b_=g(require("node:fs")),Og=g(require("node:path"));He();bj=/^[a-z0-9-]+$/,VJ=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},KJ=(e,t)=>{if(!bj.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let m=VJ(p[2]??"");p[1]==="name"&&m.length>0&&(o=m),p[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},dc=e=>{let t=Pr(e);if(!t.ok)return[];let r=Og.default.resolve(t.path,".cursor","skills"),o=[];try{o=b_.default.readdirSync(r)}catch{return[]}return o.filter(n=>bj.test(n)).flatMap(n=>{let s=Og.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${Og.default.sep}`))return[];try{let i=KJ(b_.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},Pj=(e,t)=>dc(e).find(r=>r.fileName===t)??null});var wj,JJ,_j,vj,Cj=l(()=>{"use strict";lo();wj=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),JJ=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),_j=e=>{if(e.length===0)return`<div class="field">${le("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${wj(r.fileName)}">${wj(r.fileName)}</option>`).join("");return`<div class="field">${le("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${JJ(e)}</script>`},vj=`<script>
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
</script>`});var uc,Lj,kj=l(()=>{"use strict";L();vg();lo();uc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lj=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=uc(e.maxSpendUsd),n=e.earlyStop?" checked":"";return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${uc(pe.knobsSectionTitle)}</p>
  <p class="muted">${uc(pe.knobsSectionLede)}</p>
  <div class="field">
    ${le(pe.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${le(pe.maxSpendUsdLabel,"maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${o}" placeholder="Optional" data-sdlc-max-spend-usd>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${n}>
      <span>${uc(pe.earlyStopLabel)}</span>
    </label>
    <p class="muted">${uc(pe.earlyStopHint)}</p>
  </div>
</div>`}});var ze,Wj,Tj,XJ,Ej,xj,Rj,Ij=l(()=>{"use strict";L();t_();Ae();nc();sc();ze=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Wj=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",Tj=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,XJ=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},Ej=e=>e===R?"You":ne(e),xj=e=>{let t=XJ(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ne(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${ze(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${ze(t)}</dd></div>
      <div><dt>Judge</dt><dd>${ze(Ej(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${ze(Ej(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${ze(r)}</dd></div>
    </dl>
  </details>`},Rj=e=>{let t=e.wizard;if(t===void 0)return"";let r=vr(e.goal),o=e.status==="wizard_paused",n=!E(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=Pg(e),m=Tj(t),S=m===null?"":Wj(m),f=Lr(e),y=S.length===0?"":f===null||f>=4?` <strong>${ze(S)}</strong>`:` <strong>${ze(S)}</strong> (step ${f+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${ze(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${ze(p.title)}${y}</p>
    <p class="muted">${ze(p.detail)}</p>
    <div class="actions">
      ${xj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${ze(e.id)}">Open this run</a>
    </div>
  </section>`}let s=Tj(t),i=s===null?"Wizard":Wj(s),a=Lr(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${ze(r)}</h2>
    <p class="lede">Paused at <strong>${ze(i)}</strong>${ze(c)} (last updated ${ze(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${xj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${ze(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var pc,Oj,Mj=l(()=>{"use strict";lo();pc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Oj=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${pc(n.id)}"${n.id===e.runner?" selected":""}>${pc(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${pc(e.runner)}">Checking ${pc(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${le("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${le("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${pc(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var Nj,zj=l(()=>{"use strict";Nj=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var ti,Dj,jj,$j,Hj,Fj=l(()=>{"use strict";lo();ti=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Dj=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${ti(c.id)}"${c.id===r?" selected":""}>${ti(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${ti(n)}</option>`;return`<div class="field">${le(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},jj=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${ti(t)}">Checking ${ti(o)}\u2026</p>`},$j=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${le(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${ti(r)}</textarea><span class="muted">${o}</span></div></details>`,Hj=e=>{let t=`<div class="sdlc-writer">${Dj("judge","Judge",e.judge,e.writers,"I'll score it")}${jj("judge",e.judge,e.writers)}${$j("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${Dj("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${jj("improver",e.improver,e.writers)}${$j("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var Uj,Bj=l(()=>{"use strict";Uj=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var P_,Gj,qj=l(()=>{"use strict";Bj();P_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Gj=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${Uj.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${P_(t.goal)}" title="${P_(t.goal)}">${P_(t.label)}</button>`).join("")}</div>`});var mc,YJ,ZJ,w_,Vj=l(()=>{"use strict";L();lo();mc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YJ=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},ZJ=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,w_=e=>{let t=YJ(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=_l(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${le(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${mc(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${mc(e.inputId)}" class="sdlc-pass-range" type="range" name="${mc(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${mc(a)}"><span class="sdlc-pass-mark" style="left:${ZJ(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${mc(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var e7,Wr,Kj,Jj=l(()=>{"use strict";rc();l_();aj();cj();e_();uj();mj();Aj();Mg();Cj();lo();m_();kj();Ij();nc();Mj();zj();Fj();L();qj();Vj();e7=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Wr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Kj=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Wr(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Wr(e.skillNotice??"")}</div>`,o=`${Rz}${Iz}`,n=e.resumableWizardCycle??null,s=n===null?"":Rj(n),i=Wg(e.cycle),a=e.cycle===null?"":Lg(e.cycle),c=e.cycle!==null&&Jt(e.cycle),d=pj(e),p=e7(d.goal,d.prompt,e.canRun),m=Hj({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=Oj({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),f=`${w_({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${w_({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=Lj({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop}),u=qP,A=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",b=e.cycle!==null&&E(e.cycle.status),h=d.running&&!b,w=b||h?"":" open",_=h?" sdlc-compose-run-focus":"",k=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${b?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,W=b?(()=>{let Fe=e.cycle!==null?vr(e.cycle.goal):vr(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Wr(Fe)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${k}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${k}</summary>`,x=b?" sdlc-compose-viewing-finished":"",I=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",M=c?"waiting":d.running?"running":"idle",H=d.running&&!c?' aria-busy="true"':"",q=`<section class="card sdlc-compose${x}${_}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${w}>
        ${W}
        <div class="sdlc-compose-details-body">
      <p class="lede">${u} ${Wr(e.modelNote)}</p>
        <ol class="sdlc-compose-stepper" aria-label="Compose steps" data-sdlc-compose-stepper>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="1" aria-current="step"><span class="sdlc-compose-stepper-index">1</span><span class="sdlc-compose-stepper-label">Project</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="2"><span class="sdlc-compose-stepper-index">2</span><span class="sdlc-compose-stepper-label">Prompt and goal</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="3"><span class="sdlc-compose-stepper-index">3</span><span class="sdlc-compose-stepper-label">CLI</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="4"><span class="sdlc-compose-stepper-index">4</span><span class="sdlc-compose-stepper-label">Summary</span></li>
        </ol>
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${A}
        <p class="alert-error sdlc-compose-step-error" data-sdlc-compose-step-error hidden role="alert"></p>
        <div class="sdlc-compose-step" data-sdlc-compose-step="1" id="sdlc-compose-step-1">
          <h3 class="sdlc-compose-step-title">Project</h3>
          <p class="muted sdlc-compose-step-lede">Choose the folder writers run in and optionally load a skill into the prompt on the next step.</p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="sdlc-folder">
          <div class="field">
            ${le("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Wr(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${_j(dc(d.folder))}
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
            ${le("Goal","goal")}
            ${Gj()}
            <textarea class="input textarea" name="goal" rows="4" required>${Wr(d.goal)}</textarea>
          </div>
          <div class="field">
            ${le("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Wr(d.prompt)}</textarea>
          </div>
          ${f}
          ${y}
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
        ${Nj()}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${Wr(d.passScore)}; Step 4 pass \u2265 ${Wr(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${M}" data-can-run="${p?"true":"false"}"${H}${d.running?" disabled":""}>${I}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,B=`${""}${ij}${lj}${dj}${vj}`;return`${t}${r}${q}${s}${a}${i}${o}${Sj(e.history,e.cycle?.id??null)}${B}`}});var gc,__=l(()=>{"use strict";Jj();gc=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:Kj(t)}))}});var Xj,Yj=l(()=>{"use strict";sj();cc();__();rt();Cn();Xj=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:nj({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=K(e.storePath,o.cycleId);return be(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(uo(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await gc(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:Gt(e.storePath),resumableWizardCycle:null}),!0)}});var Zj,Ng,v_=l(()=>{"use strict";Zj=g(require("node:os"));L();L();Ng=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??Zj.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??br()}}});var Qj,ri,C_,e$,t$,fc=l(()=>{"use strict";L();Ae();CP();Qj=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,ri=e=>{let t=vN(e),r=hn(e).map(s=>({id:s,label:Ym[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},C_=(e,t,r)=>t===R||t!==null&&e.writers.some(o=>o.id===t)?t:r,e$=(e,t,r,o=null)=>({judge:C_(e,t,e.judge),improver:C_(e,r,e.improver),runner:C_(e,o,e.runner)}),t$=e=>e===Cm?{goal:Lm,prompt:km}:{goal:"",prompt:""}});var zg,r$=l(()=>{"use strict";zg=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var o$,t7,n$,s$,i$=l(()=>{"use strict";L();L();o$=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},t7=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},n$=e=>{let t=o$(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=t7(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=o$(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},s$=e=>br(e)});var a$,Dg,L_=l(()=>{"use strict";L();Ae();He();fc();r$();i$();L();a$=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=zg(o);return n.ok?String(n.passScore):String(r)},Dg=e=>{let t=e$(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=a$(e.posted,"passScore",70),o=a$(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),p=e.posted?.get("maxSpendUsd")?.trim()??"",m=e.posted===null?!0:e.posted.has("earlyStop"),S=(k,W)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:k,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:W,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:p,earlyStop:m});if(e.posted===null)return S(e.defaultFolder??fn,null);let f=e.posted.get("folder")??fn;if(e.posted.get("intent")==="choose-folder"){let k=e.pickFolder();return S(k===null?f:ot(k),null)}if((e.posted.get("intent")??"")!=="run")return S(f,null);let u=Qj(e.goal,e.prompt);if(u!==null)return S(f,u);let A=zg(e.posted.get("passScore")??r);if(!A.ok)return S(f,A.errorMessage);let b=zg(e.posted.get("modulePassScore")??o);if(!b.ok)return S(f,b.errorMessage);let h=CN(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(h===null)return S(f,"Choose a judge and an improver.");let w=Pr(f);if(!w.ok)return S(f,w.errorMessage);let _=LN(e.installedIds,c,h.judge);if(_===null)return S(f,"Choose a runner for wizard step 4.");let C=n$({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off"});return C.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:h.judge,improver:h.improver,workingDirectory:w.path,passScore:A.passScore,modulePassScore:b.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:_,runnerInstructions:a,costControls:s$(C.knobs)}:S(f,C.errorMessage)}});var oi,$g,r7,k_,l$,jg,c$,o7,d$,W_,n7,s7,i7,T_,u$,p$,m$=l(()=>{"use strict";oi=g(require("node:fs")),$g=g(require("node:path"));Ae();He();r7=["remember","choose-folder","run"],k_=()=>({folder:fn,judge:"",improver:"",runner:""}),l$=e=>$g.default.join($g.default.dirname(e),"prompt-optimizer-preferences.json"),jg=e=>typeof e=="string"?e:"",c$=e=>{let t=l$(e);if(!oi.default.existsSync(t))return k_();try{let r=JSON.parse(oi.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return k_();let o=r,n=jg(o.folder).trim();return{folder:n.length===0?fn:n,judge:jg(o.judge),improver:jg(o.improver),runner:jg(o.runner)}}catch{return k_()}},o7=(e,t)=>{let r=l$(e);oi.default.mkdirSync($g.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;oi.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),oi.default.renameSync(o,r)},d$=(e,t)=>e===R||hn(t).some(r=>r===e),W_=(e,t,r)=>e===null?t:e.length===0?"":d$(e,r)?e:t,n7=(e,t)=>{if(e===null)return t;let r=Pr(e);return r.ok?r.display:t},s7=e=>{let t=c$(e.storePath),r={folder:n7(e.folder,t.folder),judge:W_(e.judge,t.judge,e.installedIds),improver:W_(e.improver,t.improver,e.installedIds),runner:W_(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||o7(e.storePath,r)},i7=e=>{let t=Pr(e);return t.ok?t.display:fn},T_=(e,t)=>d$(e,t)?e:"",u$=e=>{let t=c$(e.storePath);return{selection:{...e.selection,judge:T_(t.judge,e.installedIds)||e.selection.judge,improver:T_(t.improver,e.installedIds)||e.selection.improver,runner:T_(t.runner,e.installedIds)||e.selection.runner},defaultFolder:i7(t.folder)}},p$=e=>{let t=e.posted.get("intent")??"";if(!r7.includes(t))return;let r=e.posted.get("folder");s7({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var g$,a7,l7,E_,c7,Hg,Fg=l(()=>{"use strict";g$=g(require("node:os"));Ae();h_();yn();a7="Reply with the single word ok. Do not use tools.",l7=45e3,E_=async(e,t)=>{if(t===R)return{ok:!0,message:"You will do this step."};let r=GD(e,t);if(r!==null)return{ok:!0,message:r};let o=await qe({writerAgent:t,prompt:a7,workingDirectory:g$.default.tmpdir(),timeoutMs:l7});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ne(t)} is ready.`;return qD(e,t,n),{ok:!0,message:n}},c7=e=>[...new Set(e.filter(t=>t.length>0))],Hg=async(e,t,r,o)=>{for(let n of c7([t,r,o??""])){let s=await E_(e,n);if(!s.ok)return s.message}return null}});var x_,f$=l(()=>{"use strict";L();x_=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!E(r.status)&&!(t!==null&&r.id===t))return r;return null}});var h$,y$=l(()=>{"use strict";Ut();L();cc();v_();L_();__();rt();He();m$();Mg();Fg();f$();kg();Cn();h$=async e=>{let t=e.posted===null?u$({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Dg({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>eo("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(p$({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?ot(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await Hg(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await gc(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:ot(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:Gt(e.route.storePath),resumableWizardCycle:x_(Gt(e.route.storePath),null)});return}if(r.kind==="start"){let s=Pj(r.workingDirectory,r.sourceSkillFile),i=Ng({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:r.costControls,wizard:nw({...Wl(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(z(e.route.storePath,i),be(e.route.storePath,i.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":i.id}),e.route.response.end(uo(e.route.storePath,i));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(i.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:K(e.route.storePath,e.cycleId);n!==null&&(n=_n(e.route.storePath,n),be(e.route.storePath,n.id)),await gc(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:Gt(e.route.storePath),resumableWizardCycle:x_(Gt(e.route.storePath),n?.id??null)})}});var S$,A$=l(()=>{"use strict";rt();S$=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";iN(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var b$,P$=l(()=>{"use strict";b$=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var w$,_$=l(()=>{"use strict";wN();rj();Yj();y$();A$();fc();P$();Cn();w$=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await Rg(),o=ri(r),n=e.method==="POST"?b$(e.request.headers["content-type"],await e.readBody(e.request)):null;if(tj({posted:n,storePath:e.storePath,response:e.response})||await Xj(e,n,o))return;let s=t$(t.searchParams.get("example")),i=S$({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=PN({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await h$({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:bN(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var d7,v$,C$=l(()=>{"use strict";L();rt();d7=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",v$=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=K(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!E(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=sw({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${d7(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var L$,k$=l(()=>{"use strict";cc();rt();L$=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:K(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":uo(e.storePath,o)),!0}});var u7,W$,T$=l(()=>{"use strict";Ae();Fg();u7=["claude-cli","codex","cursor","antigravity"],W$=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===R||u7.includes(t)?await E_(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var E$,x$=l(()=>{"use strict";L();E$=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:Cl,page:Ll,context:Ns,installedWriters:e,post:{method:"POST",url:Cl,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:90,maxRounds:10}},poll:`GET ${Cl}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var Ug,R$=l(()=>{"use strict";L();a_();Bs();Ug=e=>{let t=e.revisions[e.revisions.length-1]??null,r=se(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=E(e.status),n=e.errorKind??null,s=Cg({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:_r(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:Ns,page:`${Ll}?cycle=${encodeURIComponent(e.id)}`}}});var De,p7,I$,O$,M$=l(()=>{"use strict";De=g(Bn());L();p7=(0,De.isType)({goal:De.isString,prompt:De.isString,workingDirectory:De.isString,judge:(0,De.isUndefinedOr)(De.isString),improver:(0,De.isUndefinedOr)(De.isString),passScore:(0,De.isUndefinedOr)(De.isNumber),maxRounds:(0,De.isUndefinedOr)(De.isNumber)}),I$=e=>{let t=e?.trim()??"";return t.length===0?null:t},O$=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return p7(t)?t.workingDirectory.trim().length===0?{ok:!1,error:zm}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:I$(t.judge),improver:I$(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds)}}:{ok:!1,error:zm}}});var Tr,m7,N$,z$,D$=l(()=>{"use strict";L();Tr=g(Bn()),m7=(0,Tr.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:Tr.isNumber,confirmedMaxSpendUsd:(0,Tr.isUndefinedOr)(Tr.isNumber),rateUsdPer1kTokens:(0,Tr.isUndefinedOr)(Tr.isNumber)}),N$=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:m7(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},z$=(e,t)=>{let r=Fl({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var g7,j$,$$=l(()=>{"use strict";L();Ae();L_();fc();g7=e=>e.map(t=>t.id).join(", "),j$=e=>{let t=ri(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===R||n===R)return{ok:!1,error:GP,installedWriters:t.writers};if(o===null||n===null){let a=g7(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o}),i=Dg({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds}}});var H$,F$=l(()=>{"use strict";L();v_();x$();R$();fc();M$();D$();$$();rt();H$=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let c=K(e.storePath,t);return c===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:Ug(c)}}let r=await e.handlers.readInstalledIds(),o=ri(r);if(e.method==="GET")return{status:200,body:E$(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let c=N$(e.rawBody);if(c.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(c.kind==="invalid")return{status:400,body:{ok:!1,error:c.error}};let d=K(e.storePath,t);if(d===null)return{status:404,body:{ok:!1,error:"That run is not on this Mac."}};let p=z$(d,c.body);return p.ok?(z(e.storePath,p.cycle),{status:200,body:Ug(p.cycle)}):{status:400,body:{ok:!1,error:p.error}}}let n=O$(e.rawBody);if(!n.ok)return{status:400,body:{ok:!1,error:n.error,installedWriters:o.writers}};let s=j$({body:n.body,installedIds:r});if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:s.installedWriters}};let i=await e.handlers.readWritersReady(e.storePath,s.judge,s.improver,s.runner);if(i!==null)return{status:400,body:{ok:!1,error:i,installedWriters:o.writers}};let a=Ng({goal:s.goal,sourcePrompt:s.prompt,judgeModel:s.judge,improverModel:s.improver,workingDirectory:s.workingDirectory,passScore:s.passScore,maxRounds:s.maxRounds,wizard:Wl(s.prompt),runnerModel:s.runner});return z(e.storePath,a),e.handlers.startCycle(e.storePath,a.id),{status:200,body:Ug(a)}}});var U$,B$=l(()=>{"use strict";Cn();Fg();F$();U$=async e=>{let t=await H$({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:Rg,readWritersReady:Hg,startCycle:be}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var q$,f7,h7,G$,y7,V$,K$=l(()=>{"use strict";q$=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],f7=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},h7=e=>{let t={};for(let n of e)for(let s of new Set(q$(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},G$=(e,t)=>{let r=f7(q$(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},y7=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},V$=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=h7(e.map(i=>i.text)),s=G$(o,n);return e.map(i=>({id:i.id,score:y7(s,G$(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var R_,S7,A7,J$,b7,P7,w7,_7,I_,O_=l(()=>{"use strict";R_=g(require("node:path"));He();K$();Mg();S7=5,A7=20,J$=280,b7=e=>[e.name,e.description,e.promptText].join(`
`),P7=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=J$?t:`${t.slice(0,J$-3)}...`},w7=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),_7=e=>e===void 0||!Number.isFinite(e)?S7:Math.min(A7,Math.max(1,Math.floor(e))),I_=e=>{let t=e.query.trim(),r=_7(e.limit),o=Pr(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=dc(o.path),s=V$(n.map(d=>({id:d.fileName,text:b7(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=R_.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let p=i.get(d.id);return p===void 0?[]:[{skillId:p.fileName,name:p.name,description:p.description,score:d.score,sourcePath:R_.default.join(a,p.fileName,"SKILL.md"),excerpt:P7(p),source:"filesystem"}]});return{query:t,hits:c,context:w7(c)}}});var X$,Y$=l(()=>{"use strict";O_();X$=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:I_({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var Z$,Q$=l(()=>{"use strict";Y$();Z$=async e=>{let t=X$({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var v7,M_,eH=l(()=>{"use strict";dO();_$();C$();k$();T$();B$();Q$();v7=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},M_=async e=>{let t=v7(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await U$(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await Z$(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:cO()})),!0):(await W$({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||v$({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||L$({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await w$(e),!0)}});var tH=l(()=>{"use strict";eH();O_();yn()});var Ln,hc,C7,L7,k7,W7,rH,oH=l(()=>{"use strict";Ln=g(require("node:fs")),hc=g(require("node:path")),C7="prompt-optimizer-cycles.json",L7="prompt-optimizer-preferences.json",k7="prompt-sdlc-cycles.json",W7="prompt-sdlc-preferences.json",rH=e=>{let t=hc.default.join(e,C7),r=hc.default.join(e,k7);if(Ln.default.existsSync(t)||!Ln.default.existsSync(r))return t;try{Ln.default.renameSync(r,t)}catch{return r}let o=hc.default.join(e,W7),n=hc.default.join(e,L7);if(Ln.default.existsSync(o)&&!Ln.default.existsSync(n))try{Ln.default.renameSync(o,n)}catch{}return t}});var ni,T7,N_,nH=l(()=>{"use strict";ni=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),T7=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],N_=e=>{let t=T7.map(i=>`<option value="${ni(i.value)}">${ni(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${ni(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${ni(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${ni(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${ni(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var yc,aH,E7,lH,x7,R7,cH,Gg,sH,iH,I7,O7,Er,Sc,Bg,M7,qg,z_,N7,D_,dH,j_,uH,z7,D7,j7,pH,mH,gH,Ac=l(()=>{"use strict";yc=g(require("node:fs")),aH=g(require("node:path")),E7="estimate-history.ndjson",lH=100,x7=500,R7=2e4,cH=e=>aH.default.join(e,E7),Gg=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,x7),sH=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,R7),iH=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,I7=e=>({...e,estimateTokens:iH(e.estimateTokens),actualTokens:iH(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),O7=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Er=e=>{let t=cH(e);return yc.default.existsSync(t)?yc.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return O7(n)?[I7(n)]:[]}catch{return[]}}):[]},Sc=(e,t)=>{yc.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;yc.default.writeFileSync(cH(e),r,"utf8")},Bg=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),M7=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${Bg(o.task)} | ${Bg(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},qg=e=>{let t=Er(e.reportsDir),r=Gg(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Sc(e.reportsDir,[...s,n])},z_=e=>{let t=Er(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?Gg(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Sc(e.reportsDir,[...i,s])},N7=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-lH),D_=e=>[...Er(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),dH=e=>{let t=Er(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=sH(e.input),n=sH(e.output),s=Gg(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Sc(e.reportsDir,[...c,a])},j_=(e,t)=>{let r=Er(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},uH=e=>({table:M7(N7(Er(e))),embedding:null}),z7=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},D7=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-lH),j7=e=>{let t=z7(D7(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${Bg(s.task)} | ${Bg(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},pH=e=>{let t=Er(e.reportsDir),r=Gg(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Sc(e.reportsDir,[...s,n])},mH=e=>{let t=Er(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Sc(e.reportsDir,[...s,n])},gH=e=>j7(Er(e))});var fH=l(()=>{"use strict";Ac()});var xr,$_,$7,H_,H7,F7,Vg,Kg,U7,F_,hH=l(()=>{"use strict";fH();Yw();xr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$_=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},$7=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${$_(-r)} under`:`${$_(r)} over`},H_=e=>e.toLocaleString("en-US"),H7=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${H_(-r)} under`:`${H_(r)} over`},F7=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},Vg=e=>e===null?"\u2014":$_(e),Kg=e=>e===null?"\u2014":H_(e),U7=`(function () {
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
})();`,F_=e=>{let r=D_(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":$7(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":H7(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${xr(F7(i))}</button></td>
        <td>${xr(c)}</td>
        <td>${Vg(n.estimateSeconds)}</td>
        <td>${Vg(n.actualSeconds)}</td>
        <td>${xr(d)}</td>
        <td>${Kg(n.estimateTokens)}</td>
        <td>${Kg(n.actualTokens)}</td>
        <td>${xr(p)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${xr(c)}</p>
        <h2>Input</h2>
        <pre>${xr(i)}</pre>
        <h2>Output</h2>
        <pre>${xr(a)}</pre>
        <p>Time: estimated ${Vg(n.estimateSeconds)} \xB7 actual ${Vg(n.actualSeconds)} \xB7 ${xr(d)}</p>
        <p>Tokens: estimated ${Kg(n.estimateTokens)} \xB7 actual ${Kg(n.actualTokens)} \xB7 ${xr(p)}</p>
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
            ${hg({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${U7}</script>`}
    </section>`}});var yH=l(()=>{"use strict";nH();hH()});var si,B7,G7,U_,SH=l(()=>{"use strict";si=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),B7=(e,t,r)=>{let o=si(t),n=si(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},G7=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${si(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>B7(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${si(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${si(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${si(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},U_=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(G7).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var AH=l(()=>{"use strict";SH()});var bc,bH,PH,B_,G_,q_,wH=l(()=>{"use strict";bc=g(require("node:fs")),bH=g(require("node:path"));ml();Am();PH=(e,t,r)=>Ts({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,B_=(e,t,r)=>{let o=PH(e,t,r);if(o===null)return[];if(!bc.default.existsSync(o))return[];let n=bc.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},G_=e=>{let t=PH(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:fr(e.entry.prompt),output:fr(e.entry.output)};bc.default.mkdirSync(bH.default.dirname(t),{recursive:!0}),bc.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},q_=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var q7,V7,Pc,Jg,V_=l(()=>{"use strict";q7=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),V7=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Pc=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=q7(i.assistantOutput),d=c.length>0?`Assistant: ${V7(c,t)}`:null,p=[a,d].filter(m=>m!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},Jg=e=>{let t=e.userMessage.trim(),r=Pc({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Yt,wc,X_,K7,J7,K_,X7,Y_,Xg,_H,vH,Y7,ii,Z_,J_,CH,Z7,LH,ai,Yg,_c,Q7,vc,Q_,Zg,Qg,kH=l(()=>{"use strict";Yt=g(require("node:fs")),wc=g(require("node:path")),X_=require("node:crypto");V_();K7="writer-sessions",J7="active-index.json",K_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),X7=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Y_=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},Xg=e=>{let t=wc.default.join(e.installDir,K7);return Yt.default.mkdirSync(t,{recursive:!0}),t},_H=e=>wc.default.join(Xg(e),J7),vH=(e,t)=>wc.default.join(Xg(e),`${t}.canonical.json`),Y7=(e,t)=>wc.default.join(Xg(e),`${t}.continuation.json`),ii=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,Z_=e=>{let t=_H(e);if(!Yt.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Yt.default.readFileSync(t,"utf8"));if(!K_(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!K_(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!X7(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},J_=(e,t)=>{Yt.default.writeFileSync(_H(e),JSON.stringify(t,null,2))},CH=(e,t)=>{Yt.default.writeFileSync(vH(e,t.sessionId),JSON.stringify(t,null,2))},Z7=(e,t)=>{Yt.default.writeFileSync(Y7(e,t.sessionId),JSON.stringify(t,null,2))},LH=(e,t)=>{let r=Pc({turns:t.turns});Z7(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},ai=(e,t)=>{let r=vH(e,t);if(!Yt.default.existsSync(r))return null;try{let o=JSON.parse(Yt.default.readFileSync(r,"utf8"));return!K_(o)||typeof o.sessionId!="string"?null:o}catch{return null}},Yg=(e,t=20)=>{let r=Xg(e),o=Yt.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=ai(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},_c=(e,t,r)=>{let o=Y_(r);return Z_(e).entries.find(i=>ii(i)===ii({writerAgent:t,projectFolderPath:o}))?.sessionId??null},Q7=(e,t,r,o)=>{let n=Z_(e),s=ii({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>ii(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];J_(e,{entries:i})},vc=(e,t,r)=>{let o=(0,X_.randomUUID)(),n=new Date().toISOString(),s=Y_(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return CH(e,i),LH(e,i),Q7(e,t,s,o),o},Q_=(e,t,r)=>{let o=_c(e,t,r);return o!==null?o:vc(e,t,r)},Zg=(e,t,r)=>{let o=Y_(r),n=Z_(e);if(o===null&&r===void 0){J_(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=ii({writerAgent:t,projectFolderPath:o});J_(e,{entries:n.entries.filter(i=>ii(i)!==s)})},Qg=e=>{let t=Q_(e.layout,e.writerAgent,e.projectFolderPath),r=ai(e.layout,t);if(r===null)return;let o={id:(0,X_.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};CH(e.layout,n),LH(e.layout,n)}});var e9,t9,ef,ev,WH=l(()=>{"use strict";e9=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",t9=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},ef=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",ev=e=>{let t=ef(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=e9(r,e.userPromptCharacterCount),n=t9({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var tf=l(()=>{"use strict";wH();kH();V_();WH()});var TH=l(()=>{"use strict";Zu();as();SS()});var EH=l(()=>{"use strict";qy()});var Ke,o9,n9,tv,rv,ov,xH=l(()=>{"use strict";TH();EH();Ke=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),o9=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},n9=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=Aa(o);return`value="${Ke(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${Ke(r)}"`},tv=(e,t,r,o,n)=>{let s=Qu[t];return`<label class="field">
          <span class="field-label">${Ke(o)} API key \u2014 ${Ke(o9(e,t))} \xB7 <a class="field-link" href="${Ke(s.href)}" target="_blank" rel="noopener noreferrer">${Ke(s.label)}</a></span>
          <input class="input mono" type="password" name="${Ke(r)}" autocomplete="off" ${n9(e,t,n)} />
        </label>`},rv=(e,t,r,o)=>{let n=Bu(e[t]?.model),s=new Set(Uu[t].map(c=>c.value)),i=Uu[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${Ke(c.value)}"${d}>${Ke(c.label)}</option>`}).join(""),a=n!==jo&&!s.has(n)?`<option value="${Ke(n)}" selected>${Ke(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${Ke(o)}</span>
          <select class="input mono" name="${Ke(r)}">${i}${a}</select>
        </label>`},ov=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Ke(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${tv(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${rv(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${tv(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${rv(e.secrets,"openai","openaiModel","OpenAI model")}
        ${tv(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${rv(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var RH=l(()=>{"use strict";xH()});var rf,IH,OH=l(()=>{"use strict";rf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IH=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${rf(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${rf(s.name)}</strong> <span class="muted mono">(${rf(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${rf(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var s9,MH,NH,zH=l(()=>{"use strict";s9=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,MH=e=>e.kind==="folder",NH=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&MH(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(MH(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(s9)};return r(t)}});var DH,nv,jH=l(()=>{"use strict";DH=g(require("node:path")),nv=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${nv(r.children,t)}</ul>
            </details>
          </li>`;let o=DH.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var $H,po,i9,a9,Cc,l9,sv,HH=l(()=>{"use strict";vm();$H=g(require("node:path"));OH();zH();jH();po=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),i9=()=>`(() => {
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

})();`,a9=()=>`(() => {
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
})();`,Cc=e=>{let t=Sl({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=IH({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${po(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${po(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':l9(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${po(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${po(s)}" />
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
    <script>${i9()}</script>
    <script>${a9()}</script>`;return`${t}${r}${o}${c}${d}`},l9=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=NH(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:$H.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),p=nv(d,po),m=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${po(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${po(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${po(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},sv=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??p??a,S=t.sets[i];if(S===void 0)continue;let f=a.length>0?a:S.proposedSlug,y=m.length>0?m:S.proposedName,u=r.has(i),A=S.items.map(b=>({id:b.id,kind:b.kind,title:b.title,sourcePath:b.sourcePath,include:u}));s.push({slug:f,name:y,items:A})}return s}});var FH=l(()=>{"use strict";HH()});var c9,iv,UH=l(()=>{"use strict";mr();c9=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[Me]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},iv=c9});var d9,BH,GH=l(()=>{"use strict";mr();d9=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[Me]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},BH=d9});var qH=l(()=>{"use strict"});var kn,u9,av,VH=l(()=>{"use strict";vm();LA();kn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),u9=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,av=e=>{let t=e.flashError?`<div class="alert-error">${kn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${kn(e.flashMessage)}</div>`:"",r=Sl({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${kn(u9(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,p=`<a class="btn btn-secondary btn-compact" href="${kn(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=Hp(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${kn(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${kn(n.name)}</strong>
                  <span class="muted mono">${kn(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${p}${m}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var KH=l(()=>{"use strict";qH();kA();VH()});var of,JH=l(()=>{"use strict";of=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var XH,xt,lv=l(()=>{"use strict";XH=g(require("node:path"));Dt();Ue();J();me();hA();xt=e=>{let t=$()?.layout.installDir??T();if(XH.default.basename(t)===Ot)return yt;let r=$(),o=r!==null?ve(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):yt}});var cv,YH=l(()=>{"use strict";jt();lv();cv=async e=>{let t=Ie(e.installDir),r=t?.bundleVersion??null,o=xt(t);try{let n=await rs(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Ro(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var dv,ZH=l(()=>{"use strict";dv=e=>!e});var uv,li,pv=l(()=>{"use strict";J();uv=()=>`http://127.0.0.1:${Vh()}/update/run`,li=async e=>{try{let t=await fetch(uv(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var p9,QH,mv,eF=l(()=>{"use strict";J();re();pv();p9=()=>{ir({launchAgentLabel:_e(),installDir:T()})},QH=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},mv=async()=>{p9();let e=await li({force:!0});if(e.ok)return{ok:!0,message:QH(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:QH(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(jt(),bT)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var gv=l(()=>{"use strict";SP();JH();lv();YH();ZH();eF();pv()});var tF,rF=l(()=>{"use strict";tF=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var oF,nF,fv,hv,sF=l(()=>{"use strict";oF=require("node:crypto"),nF=g(require("node:fs"));Ut();me();me();rF();fv=!1,hv=async e=>{if(fv)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!tF(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=X({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&nF.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,oF.randomUUID)();fv=!0;try{if(await yA(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await cs({...r,workspace:n},e.writerAgent,t);return await ja(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{fv=!1}}});var iF=l(()=>{"use strict";sF()});var ct,m9,aF,lF,yv,Sv,Av,bv,Pv,wv,_v=l(()=>{"use strict";ct=require("node:crypto"),m9=Buffer.from("302a300506032b6570032100","hex"),aF=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},lF=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,ct.createPublicKey)({key:Buffer.concat([m9,t]),format:"der",type:"spki"})},yv=()=>{let{publicKey:e,privateKey:t}=(0,ct.generateKeyPairSync)("ed25519");return{publicKeyRaw:aF(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Sv=e=>(0,ct.createPrivateKey)(e),Av=(e,t)=>(0,ct.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),bv=(e,t,r)=>{try{let o=lF(e);return(0,ct.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},Pv=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,wv=()=>(0,ct.randomBytes)(32).toString("base64url")});var Rr,nf,cF,g9,f9,sf,vv,Cv,dF=l(()=>{"use strict";Rr=g(require("node:fs")),nf=g(require("node:path"));_v();J();Ue();cF=e=>nf.default.join(e.installDir,Hr),g9=(e,t)=>{if(e.profileEmail===null||t===cF(e)||Rr.default.existsSync(t))return;let r=cF(e);Rr.default.existsSync(r)&&(Rr.default.mkdirSync(nf.default.dirname(t),{recursive:!0}),Rr.default.renameSync(r,t))},f9=e=>{if(!Rr.default.existsSync(e))return null;try{let t=Rr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},sf=e=>{let t=yu(e);g9(e,t);let r=f9(t);if(r!==null)return r;let o=yv();return Rr.default.mkdirSync(nf.default.dirname(t),{recursive:!0}),Rr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},vv=e=>{let t=sf(e.layout),r=wv(),o=Pv({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=Sv(t.privateKeyPem),s=Av(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Cv=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return bv(e.serverPublicKey,t,e.serverAttestation)}});var Lv=l(()=>{"use strict";dF();_v()});var gF,Lc,Tv,Ev,uF,h9,kv,af,ce,fF,y9,Wv,S9,A9,xv,ge,Ee,Zt,b9,pF,mF,kc,Wc,hF=l(()=>{"use strict";gF=g(require("node:http")),Lc=g(require("node:fs")),Tv=g(require("node:path"));lf();dl();bI();wI();WI();bs();Gb();fP();sO();aO();tH();oH();yH();AH();tf();RH();FH();Go();Ut();mr();UH();GH();KH();gv();jt();iF();me();Lv();Ev=e=>Ib(e)??"never",uF=48e3,h9=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,kv=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??kp(),reveal:t.reveal,installed:Qr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),af=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:hs(t,e)},ce=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fF=200,y9=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',Wv=e=>{let t=e.trim().slice(0,fF),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},S9=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ce(t)}</div>`,A9=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ce(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',xv={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},ge=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...xv}),e.end(JSON.stringify(r))},Ee=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},Zt=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},b9=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=y9(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${ce(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=dv(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${ul(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ce(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ce(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ce(Ev(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ce(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},pF=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},mF=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,fF)},kc=e=>{let t=Tv.default.join(e.layout.installDir,"link-code.txt"),r=()=>Ie(e.layout.installDir),o=()=>{let f=r();return{installBundleVersion:of(f),installBundleUpdatedAt:f?.updatedAt??null,installVersion:f}},n=async f=>{let y=f.installVersion??r(),u=await i(),A=wP(u),b=f.updateFlash??null,h=_P(b),w=S9(b,f.updateError??null);return bP({title:f.title,activePath:f.activePath,body:f.body,cloudAppOrigin:xt(y),installBundleVersionLabel:of(y),prependBody:`${h}${w}${A}`,headerUpdateButtonHtml:PP(u)})},s=null,i=async()=>{let f=Date.now();if(s!==null&&f-s.cachedAtMs<6e4)return s.offer;let y=await cv(e.layout);return s={cachedAtMs:f,offer:y},y},a=()=>{s=null},c=!1,d=async f=>{if(a(),!(await i()).updateAvailable){f.writeHead(303,{Location:"/?update=ok"}),f.end();return}if(c){f.writeHead(303,{Location:Wv("An update is already running.")}),f.end();return}c=!0;try{let u=await mv(),A=u.ok?"/?update=ok":Wv(u.message);f.writeHead(303,{Location:A}),f.end()}catch(u){let A=u instanceof Error&&u.message.trim().length>0?u.message:"Install bundle update failed.";f.writeHead(303,{Location:Wv(A)}),f.end()}finally{c=!1,a()}},p=async(f,y)=>{let u=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",A=o(),b=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:A.installVersion,body:`<section class="card">
      <h1>${ce(y)}</h1>
      <p>${ce(u)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});f.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),f.end(b)},m=()=>{if(Lc.default.existsSync(t))return Lc.default.readFileSync(t,"utf8").trim();let f=Math.random().toString(36).slice(2,8).toUpperCase();return Lc.default.writeFileSync(t,f,"utf8"),f},S=gF.default.createServer((f,y)=>{(async()=>{let u=f.url?.split("?")[0]??"/",A=f.method??"GET";if(A==="OPTIONS"){y.writeHead(204,xv),y.end();return}if(!await M_({method:A,pathname:u,request:f,response:y,requestUrl:f.url??"/",storePath:rH(Tv.default.dirname(e.layout.configPath)),readBody:Zt,sendHtml:Ee,renderShell:n})){if(A==="GET"&&u==="/health"){let b=e.controllers.getStatus(),h=o();ge(y,200,{ok:!0,...b,installBundleVersion:h.installBundleVersion,installBundleUpdatedAt:h.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/status"){let b=o();ge(y,200,{...e.controllers.getStatus(),linkCode:m(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt});return}if(A==="GET"&&u==="/api/traffic"){ge(y,200,{entries:ll(e.layout)});return}if(A==="DELETE"&&u==="/api/traffic"||A==="POST"&&u==="/api/traffic/clear"){if(Nb(e.layout),A==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}ge(y,200,{ok:!0});return}if(A==="GET"&&u==="/api/trace"){ge(y,200,{entries:fm(e.layout)});return}if(A==="DELETE"&&u==="/api/trace"||A==="POST"&&u==="/api/trace/clear"){if(jb(e.layout),A==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}ge(y,200,{ok:!0});return}if(A==="POST"&&u==="/api/errors/clear"){$b(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(A==="GET"&&u==="/api/knowledge"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(h.length>0){let w=await xs({layout:e.layout,query:h,limit:20});ge(y,200,{chunks:w,query:h});return}ge(y,200,{chunks:Es(e.layout).slice(-50).reverse()});return}if(A==="POST"&&u==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(A==="GET"&&u==="/api/update-status"){let b=await i();ge(y,200,{ok:!0,...b});return}if((A==="GET"||A==="POST")&&u==="/api/update"){await d(y);return}if(A==="GET"&&u==="/"){let b=e.controllers.getStatus(),h=o(),w=Qr(e.layout),_=hm(e.layout.errorLogPath);Ee(y,await n({title:"Home",activePath:"/",installVersion:h.installVersion,updateFlash:pF(f.url??void 0),updateError:mF(f.url??void 0),body:vP({wsConnected:b.wsConnected,lastHeartbeatAt:b.lastHeartbeatAt,installBundleVersion:h.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:Es(e.layout).length,trafficEntryCount:ll(e.layout).length,wakeError:b.wakeError,errorLogByteSize:_.byteSize,errorLogExists:_.exists})}));return}if(A==="GET"&&u==="/task"){let b=e.controllers.getStatus(),h=o(),w=$(),_=new URL(f.url??"/",`http://127.0.0.1:${43347}`),C=_.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,k=_.searchParams.get("failed")==="1"?_.searchParams.get("error")?.trim()??"Task failed.":null,W=_.searchParams.get("runId");Ee(y,await n({title:"Task",activePath:"/task",installVersion:h.installVersion,body:N_({defaultWorkspace:w?.workspace??"",wsConnected:b.wsConnected,flashMessage:C,flashError:k,lastRunId:W})}));return}if(A==="POST"&&u==="/task/dispatch"){let b=await Zt(f),h=new URLSearchParams(b),w=h.get("prompt")?.trim()??"",_=h.get("writerAgent")?.trim()??"claude-cli",C=h.get("projectFolder")?.trim()??"",k=await hv({prompt:w,writerAgent:_,...C.length>0?{projectFolderPath:C}:{}}),W=new URLSearchParams;k.ok?W.set("ok","1"):(W.set("failed","1"),k.errorMessage!==void 0&&W.set("error",k.errorMessage.slice(0,240))),k.agentRunId!==void 0&&W.set("runId",k.agentRunId),y.writeHead(303,{Location:`/task?${W.toString()}`}),y.end();return}if(A==="GET"&&u==="/writer-sessions"){let b=o(),h=Yg(e.layout,12);Ee(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:b.installVersion,updateFlash:pF(f.url??void 0),updateError:mF(f.url??void 0),body:U_({sessions:h})}));return}if(A==="GET"&&u==="/errors"){let b=o(),h=hm(e.layout.errorLogPath);Ee(y,await n({title:"Errors",activePath:"/errors",installVersion:b.installVersion,body:Fb({errorLogPath:e.layout.errorLogPath,content:h.content,exists:h.exists,truncated:h.truncated,byteSize:h.byteSize,cleared:new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(A==="GET"&&u==="/status"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=e.controllers.getStatus(),w=ke(e.layout),_=w!==null?$e(w,12e4):qb(h.lastHeartbeatAt,12e4),C=Vb({lastHeartbeatAt:h.lastHeartbeatAt,heartbeatIsStale:_}),k=o();Ee(y,await n({title:"Status",activePath:"/status",installVersion:k.installVersion,body:`${b9({status:h,healthBadge:C,revived:b.searchParams.get("revived")==="1",linkCode:m(),installBundleVersion:k.installBundleVersion,installBundleUpdatedAt:k.installBundleUpdatedAt})}${Xb({installDir:e.layout.installDir})}${Jb({entries:fm(e.layout)})}`}));return}if(A==="GET"&&u==="/traffic"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=ll(e.layout),w=o(),_=h.map(W=>`<tr><td title="${ce(W.at)}">${ce(Ev(W.at))}</td><td>${ce(W.direction)}</td><td><code>${ce(W.type)}</code></td><td>${ce(W.summary)}</td><td>${ce(W.action??"")}</td></tr>`).join(""),C=h.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${_}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',k=b.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Ee(y,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${k}
              ${C}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(A==="GET"&&u==="/projects"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=o(),w=xt(h.installVersion),_=await af(e.layout),C=b.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":b.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,k=b.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,W=$(),x=W===null?null:X({wsUrl:W.wsUrl,pairingToken:W.pairingToken}),I=x===null?{}:Object.fromEntries((await Promise.all(_.projects.map(async M=>{let H=await iv(x,M.id);return[M.id,H?.counts??null]}))).filter(M=>M[1]!==null));Ee(y,await n({title:"Projects",activePath:"/projects",installVersion:h.installVersion,body:av({projects:_.projects,compositionCountsByProjectId:I,cloudAppOrigin:w,syncMessage:_.message,syncOk:_.ok,flashMessage:k,flashError:C})}));return}if(A==="GET"&&u==="/projects/select-folder"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=$(),_=w===null?null:X({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),C=h.length>0&&_!==null?eo():null;if(C===null||_===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(Qe({projectFolderPath:C}),!await Ua(_,h,C)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(h)}&folderUpdated=1`}),y.end();return}if(A==="POST"&&u==="/projects/delete"){let b=await Zt(f),h=new URLSearchParams(b).get("projectId")?.trim()??"",w=$(),_=w===null?null:X({wsUrl:w.wsUrl,pairingToken:w.pairingToken});if(_===null||h.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let C=await IA(_,h);y.writeHead(303,{Location:C.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(A==="GET"&&u==="/project"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=b.searchParams.get("id")?.trim()??"",w=o(),_=xt(w.installVersion),C=await af(e.layout),k=Jo(C.projects,h);if(k===null){await p(y,"Project not found");return}let W=b.searchParams.get("linked")==="1"?b.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${b.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${b.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:b.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,x=b.searchParams.get("knowledgePromoted"),I=x!==null?`Marked ${x} lesson(s) as promoted in Agent Witch.`:null,M=b.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,H=b.searchParams.get("tab")?.trim()??"harness",q=H==="workflows"||H==="agents"||H==="knowledge"?H:"harness",B=$(),Fe=B===null?null:X({wsUrl:B.wsUrl,pairingToken:B.pairingToken}),F=Fe===null?null:await iv(Fe,k.id),we=0;if(Fe!==null)try{let $r=await fetch(`${Fe.appOrigin}/api/agent-witch/projects/${encodeURIComponent(k.id)}/knowledge`,{method:"GET",headers:{[Me]:Fe.pairingToken},signal:AbortSignal.timeout(1e4)});if($r.ok){let tr=await $r.json();typeof tr=="object"&&tr!==null&&typeof tr.candidateCount=="number"&&(we=tr.candidateCount)}}catch{we=0}Ee(y,await n({title:k.name,activePath:"/projects",installVersion:w.installVersion,body:ys({project:k,cloudAppOrigin:_,installed:Qr(e.layout),linkedSetSlugs:Yr(k.projectFolderPath),composition:F,knowledgeCandidateCount:we,activeTab:q,flashMessage:W??I,flashError:M})}));return}if(A==="POST"&&u==="/projects/pull-bound-harness"){let b=await Zt(f),h=await WA({rawBody:b,layout:e.layout});if(h.kind==="not_found"){await p(y,"Project not found");return}if(h.kind==="redirect"){y.writeHead(303,{Location:h.location}),y.end();return}let w=o();Ee(y,await n({title:h.title,activePath:"/projects",installVersion:w.installVersion,body:h.body}));return}if(A==="POST"&&u==="/projects/link-harness"){let b=await Zt(f),h=new URLSearchParams(b),w=h.get("projectId")?.trim()??"",_=await af(e.layout),C=Jo(_.projects,w);if(C===null){await p(y,"Project not found");return}let k=h.getAll("applySet").map(q=>String(q)),W=Ea({layout:e.layout,projectFolderPath:C.projectFolderPath,setSlugs:k});if(!W.ok){let q=o(),B=xt(q.installVersion);Ee(y,await n({title:C.name,activePath:"/projects",installVersion:q.installVersion,body:ys({project:C,cloudAppOrigin:B,installed:Qr(e.layout),linkedSetSlugs:Yr(C.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:W.errorMessage})}));return}let x=$(),I=x===null?null:X({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),M=I===null?!1:await Ha(I,C.id,W.appliedSetSlugs),H=new URLSearchParams({linked:"1",files:String(W.writtenFileCount),bindingsSynced:M?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(C.id)}&${H.toString()}`}),y.end();return}if(A==="POST"&&u==="/project/knowledge/promote-all"){let b=await Zt(f),w=new URLSearchParams(b).get("projectId")?.trim()??"",_=await af(e.layout),C=Jo(_.projects,w);if(C===null){await p(y,"Project not found");return}let k=$(),W=k===null?null:X({wsUrl:k.wsUrl,pairingToken:k.pairingToken}),x=W===null?{ok:!1,promotedCount:0}:await BH(W,C.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(C.id)}&${I.toString()}`}),y.end();return}if(A==="GET"&&u==="/harness"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=o(),w=Oa(e.layout),_=b.searchParams.get("submitted")==="1",C=_?b.searchParams.get("syncFailed")==="1"?`Local harness updated (${b.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:b.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${b.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":b.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:b.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,k=w?.scanRoots[0]??kp(),W=h9(e.layout,{reveal:w,importQuery:b.searchParams.get("import")==="1",justSubmitted:_}),x=xt(h.installVersion);Ee(y,await n({title:"Harness",activePath:"/harness",installVersion:h.installVersion,body:Cc(kv(e.layout,{cloudAppOrigin:x,reveal:w,scanFolder:k,flashMessage:C,importSectionExpanded:W}))}));return}if(A==="POST"&&u==="/api/harness/pick-folder"){let b=eo();if(b===null){ge(y,200,{cancelled:!0});return}ge(y,200,{path:b});return}if(A==="GET"&&u==="/api/harness/file-content"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=Ta(h);if(w===null){ge(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let _=Lc.default.readFileSync(w,"utf8"),C=_.length>uF?`${_.slice(0,uF)}
\u2026 (truncated)`:_;ge(y,200,{content:C})}catch{ge(y,500,{errorMessage:"Could not read file."})}return}if(A==="POST"&&u==="/api/harness/reveal/add-project"){let b=await Zt(f),h="";try{let C=JSON.parse(b);typeof C=="object"&&C!==null&&typeof C.projectPath=="string"&&(h=C.projectPath.trim())}catch{ge(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(h.length===0){ge(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=Oa(e.layout),_=iA({reveal:w,projectPath:h});if(_===null||_.sets.length===0){ge(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}xp(e.layout,_),ge(y,200,{ok:!0,setCount:_.sets.length});return}if(A==="GET"&&u==="/api/harness/reveal/stream"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(h.length===0){ge(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;f.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...xv});let _=aA({scanRoot:h,response:y,shouldAbort:()=>w});xp(e.layout,_),y.end();return}if(A==="POST"&&u==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(A==="POST"&&u==="/harness/submit"){let b=Oa(e.layout);if(b===null){let x=o(),I=xt(x.installVersion);Ee(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Cc(kv(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let h=await Zt(f),w=new URLSearchParams(h),_=sv(w,b),C=cA({layout:e.layout,sets:_});if(!C.ok){let x=o(),I=xt(x.installVersion);Ee(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Cc(kv(e.layout,{cloudAppOrigin:I,reveal:b,flashError:C.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}uA(e.layout);let W=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${C.writtenItemCount??0}${W}`}),y.end();return}if(A==="GET"&&u==="/writer-api"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),w=$()?.writerExecutionBackend??Oe(void 0),_=Ce(e.layout.configPath),C=Vr(_),k=b.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,W=o();Ee(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:W.installVersion,body:ov({writerExecutionBackend:w,secrets:C,flashMessage:k})}));return}if(A==="POST"&&u==="/writer-api"){let b=await Zt(f),h=new URLSearchParams(b),w=h.get("writerExecutionBackend")?.trim()??"cli";yS({configPath:e.layout.configPath,writerExecutionBackend:Oe(w),anthropicApiKey:h.get("anthropicApiKey")??void 0,anthropicModel:h.get("anthropicModel")??void 0,openaiApiKey:h.get("openaiApiKey")??void 0,openaiModel:h.get("openaiModel")??void 0,googleApiKey:h.get("googleApiKey")??void 0,googleModel:h.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(A==="GET"&&u==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(A==="GET"&&u==="/history"){let b=o();Ee(y,await n({title:"History",activePath:"/history",installVersion:b.installVersion,body:F_({reportsDir:e.layout.reportsDir})}));return}if(A==="GET"&&u==="/knowledge"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),_=oP({layout:e.layout}),C=iP(_),k=h.length>0?await xs({layout:e.layout,query:h,limit:20}):Es(e.layout).slice(-50).reverse(),W=k.map(I=>{let M=sP(_,I.id),H=M>0?` \xB7 used in ${M} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ce(I.createdAt)}">${ce(Ev(I.createdAt))}${I.source?` \xB7 ${ce(I.source)}`:""}${H}</div><pre>${ce(I.text)}</pre></article>`}).join(""),x=C.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${C.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ce(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Ee(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ce(h)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${x}${W}${A9(h,k.length)}`}));return}A==="POST"&&await Zt(f),await p(y,"Not found")}})().catch(u=>{console.error("[agent-witch-local-app]",u),y.writeHead(500),y.end("Internal error")})});return S.on("error",f=>{if(f.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",f)}),S.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${lr}`)}),S},Wc=e=>sf(e).publicKeyRaw});var lf=l(()=>{"use strict";nI();sI();hF()});var SF={};It(SF,{runAgentWitchExternalLiveCli:()=>w9});var Rv,yF,P9,w9,AF=l(()=>{"use strict";Rv=g(require("node:fs")),yF=g(require("node:path"));bs();J();re();lf();re();P9=e=>{let t=yF.default.join(e,"link-code.txt");if(!Rv.default.existsSync(t))return null;let r=Rv.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},w9=()=>{Xe("agent-witch-live");let e=T(),t=N(),r=P9(e),o=Wc(t);kc({layout:t,controllers:{getStatus:()=>{let n=ke(t);return{wsConnected:Za(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{ko(e)}}})}});var Ir=v((N0e,wF)=>{"use strict";var bF=["nodebuffer","arraybuffer","fragments"],PF=typeof Blob<"u";PF&&bF.push("blob");wF.exports={BINARY_TYPES:bF,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:PF,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Tc=v((z0e,cf)=>{"use strict";var{EMPTY_BUFFER:_9}=Ir(),Iv=Buffer[Symbol.species];function v9(e,t){if(e.length===0)return _9;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new Iv(r.buffer,r.byteOffset,o):r}function _F(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function vF(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function C9(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Ov(e){if(Ov.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Iv(e):ArrayBuffer.isView(e)?t=new Iv(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Ov.readOnly=!1),t}cf.exports={concat:v9,mask:_F,toArrayBuffer:C9,toBuffer:Ov,unmask:vF};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");cf.exports.mask=function(t,r,o,n,s){s<48?_F(t,r,o,n,s):e.mask(t,r,o,n,s)},cf.exports.unmask=function(t,r){t.length<32?vF(t,r):e.unmask(t,r)}}catch{}});var kF=v((D0e,LF)=>{"use strict";var CF=Symbol("kDone"),Mv=Symbol("kRun"),Nv=class{constructor(t){this[CF]=()=>{this.pending--,this[Mv]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Mv]()}[Mv](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[CF])}}};LF.exports=Nv});var ui=v((j0e,xF)=>{"use strict";var Ec=require("zlib"),WF=Tc(),L9=kF(),{kStatusCode:TF}=Ir(),k9=Buffer[Symbol.species],W9=Buffer.from([0,0,255,255]),uf=Symbol("permessage-deflate"),Or=Symbol("total-length"),ci=Symbol("callback"),mo=Symbol("buffers"),di=Symbol("error"),df,zv=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!df){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;df=new L9(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[ci];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){df.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){df.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Ec.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Ec.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[uf]=this,this._inflate[Or]=0,this._inflate[mo]=[],this._inflate.on("error",E9),this._inflate.on("data",EF)}this._inflate[ci]=o,this._inflate.write(t),r&&this._inflate.write(W9),this._inflate.flush(()=>{let s=this._inflate[di];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=WF.concat(this._inflate[mo],this._inflate[Or]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Or]=0,this._inflate[mo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Ec.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Ec.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Or]=0,this._deflate[mo]=[],this._deflate.on("data",T9)}this._deflate[ci]=o,this._deflate.write(t),this._deflate.flush(Ec.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=WF.concat(this._deflate[mo],this._deflate[Or]);r&&(s=new k9(s.buffer,s.byteOffset,s.length-4)),this._deflate[ci]=null,this._deflate[Or]=0,this._deflate[mo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};xF.exports=zv;function T9(e){this[mo].push(e),this[Or]+=e.length}function EF(e){if(this[Or]+=e.length,this[uf]._maxPayload<1||this[Or]<=this[uf]._maxPayload){this[mo].push(e);return}this[di]=new RangeError("Max payload size exceeded"),this[di].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[di][TF]=1009,this.removeListener("data",EF),this.reset()}function E9(e){if(this[uf]._inflate=null,this[di]){this[ci](this[di]);return}e[TF]=1007,this[ci](e)}});var pi=v(($0e,pf)=>{"use strict";var{isUtf8:RF}=require("buffer"),{hasBlob:x9}=Ir(),R9=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function I9(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Dv(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function O9(e){return x9&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}pf.exports={isBlob:O9,isValidStatusCode:I9,isValidUTF8:Dv,tokenChars:R9};if(RF)pf.exports.isValidUTF8=function(e){return e.length<24?Dv(e):RF(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");pf.exports.isValidUTF8=function(t){return t.length<32?Dv(t):e(t)}}catch{}});var Uv=v((H0e,jF)=>{"use strict";var{Writable:M9}=require("stream"),IF=ui(),{BINARY_TYPES:N9,EMPTY_BUFFER:OF,kStatusCode:z9,kWebSocket:D9}=Ir(),{concat:jv,toArrayBuffer:j9,unmask:$9}=Tc(),{isValidStatusCode:H9,isValidUTF8:MF}=pi(),mf=Buffer[Symbol.species],dt=0,NF=1,zF=2,DF=3,$v=4,Hv=5,gf=6,Fv=class extends M9{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||N9[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[D9]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=dt}_write(t,r,o){if(this._opcode===8&&this._state==dt)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new mf(o.buffer,o.byteOffset+t,o.length-t),new mf(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new mf(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case dt:this.getInfo(t);break;case NF:this.getPayloadLength16(t);break;case zF:this.getPayloadLength64(t);break;case DF:this.getMask();break;case $v:this.getData(t);break;case Hv:case gf:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[IF.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=NF:this._payloadLength===127?this._state=zF:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=DF:this._state=$v}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=$v}getData(t){let r=OF;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&$9(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=Hv,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[IF.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===dt&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=dt;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=jv(o,r):this._binaryType==="arraybuffer"?n=j9(jv(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=dt):(this._state=gf,setImmediate(()=>{this.emit("message",n,!0),this._state=dt,this.startLoop(t)}))}else{let n=jv(o,r);if(!this._skipUTF8Validation&&!MF(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===Hv||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=dt):(this._state=gf,setImmediate(()=>{this.emit("message",n,!1),this._state=dt,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,OF),this.end();else{let o=t.readUInt16BE(0);if(!H9(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new mf(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!MF(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=dt;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=dt):(this._state=gf,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=dt,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[z9]=n,i}};jF.exports=Fv});var qv=v((U0e,FF)=>{"use strict";var{Duplex:F0e}=require("stream"),{randomFillSync:F9}=require("crypto"),{types:{isUint8Array:U9}}=require("util"),$F=ui(),{EMPTY_BUFFER:B9,kWebSocket:G9,NOOP:q9}=Ir(),{isBlob:mi,isValidStatusCode:V9}=pi(),{mask:HF,toBuffer:Wn}=Tc(),ut=Symbol("kByteLength"),K9=Buffer.alloc(4),ff=8*1024,Tn,gi=ff,Rt=0,J9=1,X9=2,Bv=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Rt,this.onerror=q9,this[G9]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||K9,r.generateMask?r.generateMask(o):(gi===ff&&(Tn===void 0&&(Tn=Buffer.alloc(ff)),F9(Tn,0,ff),gi=0),o[0]=Tn[gi++],o[1]=Tn[gi++],o[2]=Tn[gi++],o[3]=Tn[gi++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[ut]!==void 0?a=r[ut]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(HF(t,o,d,s,a),[d]):(HF(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=B9;else{if(typeof t!="number"||!V9(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(U9(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[ut]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Rt?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):mi(t)?(n=t.size,s=!1):(t=Wn(t),n=t.length,s=Wn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[ut]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};mi(t)?this._state!==Rt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Rt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):mi(t)?(n=t.size,s=!1):(t=Wn(t),n=t.length,s=Wn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[ut]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};mi(t)?this._state!==Rt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Rt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[$F.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):mi(t)?(a=t.size,c=!1):(t=Wn(t),a=t.length,c=Wn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[ut]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};mi(t)?this._state!==Rt?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Rt?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[ut],this._state=X9,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(Gv,this,a,n);return}this._bufferedBytes-=o[ut];let i=Wn(s);r?this.dispatch(i,r,o,n):(this._state=Rt,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(Y9,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[$F.extensionName];this._bufferedBytes+=o[ut],this._state=J9,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");Gv(this,c,n);return}this._bufferedBytes-=o[ut],this._state=Rt,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Rt&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][ut],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][ut],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};FF.exports=Bv;function Gv(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function Y9(e,t,r){Gv(e,t,r),e.onerror(t)}});var YF=v((B0e,XF)=>{"use strict";var{kForOnEventAttribute:xc,kListener:Vv}=Ir(),UF=Symbol("kCode"),BF=Symbol("kData"),GF=Symbol("kError"),qF=Symbol("kMessage"),VF=Symbol("kReason"),fi=Symbol("kTarget"),KF=Symbol("kType"),JF=Symbol("kWasClean"),Mr=class{constructor(t){this[fi]=null,this[KF]=t}get target(){return this[fi]}get type(){return this[KF]}};Object.defineProperty(Mr.prototype,"target",{enumerable:!0});Object.defineProperty(Mr.prototype,"type",{enumerable:!0});var En=class extends Mr{constructor(t,r={}){super(t),this[UF]=r.code===void 0?0:r.code,this[VF]=r.reason===void 0?"":r.reason,this[JF]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[UF]}get reason(){return this[VF]}get wasClean(){return this[JF]}};Object.defineProperty(En.prototype,"code",{enumerable:!0});Object.defineProperty(En.prototype,"reason",{enumerable:!0});Object.defineProperty(En.prototype,"wasClean",{enumerable:!0});var hi=class extends Mr{constructor(t,r={}){super(t),this[GF]=r.error===void 0?null:r.error,this[qF]=r.message===void 0?"":r.message}get error(){return this[GF]}get message(){return this[qF]}};Object.defineProperty(hi.prototype,"error",{enumerable:!0});Object.defineProperty(hi.prototype,"message",{enumerable:!0});var Rc=class extends Mr{constructor(t,r={}){super(t),this[BF]=r.data===void 0?null:r.data}get data(){return this[BF]}};Object.defineProperty(Rc.prototype,"data",{enumerable:!0});var Z9={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[xc]&&n[Vv]===t&&!n[xc])return;let o;if(e==="message")o=function(s,i){let a=new Rc("message",{data:i?s:s.toString()});a[fi]=this,hf(t,this,a)};else if(e==="close")o=function(s,i){let a=new En("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[fi]=this,hf(t,this,a)};else if(e==="error")o=function(s){let i=new hi("error",{error:s,message:s.message});i[fi]=this,hf(t,this,i)};else if(e==="open")o=function(){let s=new Mr("open");s[fi]=this,hf(t,this,s)};else return;o[xc]=!!r[xc],o[Vv]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[Vv]===t&&!r[xc]){this.removeListener(e,r);break}}};XF.exports={CloseEvent:En,ErrorEvent:hi,Event:Mr,EventTarget:Z9,MessageEvent:Rc};function hf(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var yf=v((G0e,ZF)=>{"use strict";var{tokenChars:Ic}=pi();function Qt(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function Q9(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(p===-1&&Ic[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m);let f=e.slice(c,p);d===44?(Qt(t,f,r),r=Object.create(null)):i=f,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(p===-1&&Ic[d]===1)c===-1&&(c=m);else if(d===32||d===9)p===-1&&c!==-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m),Qt(r,e.slice(c,p),!0),d===44&&(Qt(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,m),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(Ic[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(Ic[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,p=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(p===-1&&Ic[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))p===-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m);let f=e.slice(c,p);o&&(f=f.replace(/\\/g,""),o=!1),Qt(r,a,f),d===44&&(Qt(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=m);let S=e.slice(c,p);return i===void 0?Qt(t,S,r):(a===void 0?Qt(r,S,!0):o?Qt(r,a,S.replace(/\\/g,"")):Qt(r,a,S),Qt(t,i,r)),t}function eX(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}ZF.exports={format:eX,parse:Q9}});var Pf=v((K0e,d1)=>{"use strict";var tX=require("events"),rX=require("https"),oX=require("http"),t1=require("net"),nX=require("tls"),{randomBytes:sX,createHash:iX}=require("crypto"),{Duplex:q0e,Readable:V0e}=require("stream"),{URL:Kv}=require("url"),go=ui(),aX=Uv(),lX=qv(),{isBlob:cX}=pi(),{BINARY_TYPES:QF,CLOSE_TIMEOUT:dX,EMPTY_BUFFER:Sf,GUID:uX,kForOnEventAttribute:Jv,kListener:pX,kStatusCode:mX,kWebSocket:Pe,NOOP:r1}=Ir(),{EventTarget:{addEventListener:gX,removeEventListener:fX}}=YF(),{format:hX,parse:yX}=yf(),{toBuffer:SX}=Tc(),o1=Symbol("kAborted"),Xv=[8,13],Nr=["CONNECTING","OPEN","CLOSING","CLOSED"],AX=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,Y=class e extends tX{constructor(t,r,o){super(),this._binaryType=QF[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Sf,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),n1(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){QF.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new aX({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new lX(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[Pe]=this,s[Pe]=this,t[Pe]=this,n.on("conclude",wX),n.on("drain",_X),n.on("error",vX),n.on("message",CX),n.on("ping",LX),n.on("pong",kX),s.onerror=WX,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",a1),t.on("data",bf),t.on("end",l1),t.on("error",c1),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[go.extensionName]&&this._extensions[go.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){nt(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,i1(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Yv(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Sf,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Yv(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Sf,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Yv(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[go.extensionName]||(n.compress=!1),this._sender.send(t||Sf,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){nt(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(Y,"CONNECTING",{enumerable:!0,value:Nr.indexOf("CONNECTING")});Object.defineProperty(Y.prototype,"CONNECTING",{enumerable:!0,value:Nr.indexOf("CONNECTING")});Object.defineProperty(Y,"OPEN",{enumerable:!0,value:Nr.indexOf("OPEN")});Object.defineProperty(Y.prototype,"OPEN",{enumerable:!0,value:Nr.indexOf("OPEN")});Object.defineProperty(Y,"CLOSING",{enumerable:!0,value:Nr.indexOf("CLOSING")});Object.defineProperty(Y.prototype,"CLOSING",{enumerable:!0,value:Nr.indexOf("CLOSING")});Object.defineProperty(Y,"CLOSED",{enumerable:!0,value:Nr.indexOf("CLOSED")});Object.defineProperty(Y.prototype,"CLOSED",{enumerable:!0,value:Nr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(Y.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(Y.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[Jv])return t[pX];return null},set(t){for(let r of this.listeners(e))if(r[Jv]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[Jv]:!0})}})});Y.prototype.addEventListener=gX;Y.prototype.removeEventListener=fX;d1.exports=Y;function n1(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:dX,protocolVersion:Xv[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!Xv.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${Xv.join(", ")})`);let s;if(t instanceof Kv)s=t;else try{s=new Kv(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let u=new SyntaxError(c);if(e._redirects===0)throw u;Af(e,u);return}let d=i?443:80,p=sX(16).toString("base64"),m=i?rX.request:oX.request,S=new Set,f;if(n.createConnection=n.createConnection||(i?PX:bX),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(f=new go({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=hX({[go.extensionName]:f.offer()})),r.length){for(let u of r){if(typeof u!="string"||!AX.test(u)||S.has(u))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(u)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let u=n.path.split(":");n.socketPath=u[0],n.path=u[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let u=o&&o.headers;if(o={...o,headers:{}},u)for(let[A,b]of Object.entries(u))o.headers[A.toLowerCase()]=b}else if(e.listenerCount("redirect")===0){let u=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!u||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,u||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=m(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=m(n);n.timeout&&y.on("timeout",()=>{nt(e,y,"Opening handshake has timed out")}),y.on("error",u=>{y===null||y[o1]||(y=e._req=null,Af(e,u))}),y.on("response",u=>{let A=u.headers.location,b=u.statusCode;if(A&&n.followRedirects&&b>=300&&b<400){if(++e._redirects>n.maxRedirects){nt(e,y,"Maximum redirects exceeded");return}y.abort();let h;try{h=new Kv(A,t)}catch{let _=new SyntaxError(`Invalid URL: ${A}`);Af(e,_);return}n1(e,h,r,o)}else e.emit("unexpected-response",y,u)||nt(e,y,`Unexpected server response: ${u.statusCode}`)}),y.on("upgrade",(u,A,b)=>{if(e.emit("upgrade",u),e.readyState!==Y.CONNECTING)return;y=e._req=null;let h=u.headers.upgrade;if(h===void 0||h.toLowerCase()!=="websocket"){nt(e,A,"Invalid Upgrade header");return}let w=iX("sha1").update(p+uX).digest("base64");if(u.headers["sec-websocket-accept"]!==w){nt(e,A,"Invalid Sec-WebSocket-Accept header");return}let _=u.headers["sec-websocket-protocol"],C;if(_!==void 0?S.size?S.has(_)||(C="Server sent an invalid subprotocol"):C="Server sent a subprotocol but none was requested":S.size&&(C="Server sent no subprotocol"),C){nt(e,A,C);return}_&&(e._protocol=_);let k=u.headers["sec-websocket-extensions"];if(k!==void 0){if(!f){nt(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let W;try{W=yX(k)}catch{nt(e,A,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(W);if(x.length!==1||x[0]!==go.extensionName){nt(e,A,"Server indicated an extension that was not requested");return}try{f.accept(W[go.extensionName])}catch{nt(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[go.extensionName]=f}e.setSocket(A,b,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Af(e,t){e._readyState=Y.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function bX(e){return e.path=e.socketPath,t1.connect(e)}function PX(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=t1.isIP(e.host)?"":e.host),nX.connect(e)}function nt(e,t,r){e._readyState=Y.CLOSING;let o=new Error(r);Error.captureStackTrace(o,nt),t.setHeader?(t[o1]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Af,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function Yv(e,t,r){if(t){let o=cX(t)?t.size:SX(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Nr[e.readyState]})`);process.nextTick(r,o)}}function wX(e,t){let r=this[Pe];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[Pe]!==void 0&&(r._socket.removeListener("data",bf),process.nextTick(s1,r._socket),e===1005?r.close():r.close(e,t))}function _X(){let e=this[Pe];e.isPaused||e._socket.resume()}function vX(e){let t=this[Pe];t._socket[Pe]!==void 0&&(t._socket.removeListener("data",bf),process.nextTick(s1,t._socket),t.close(e[mX])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function e1(){this[Pe].emitClose()}function CX(e,t){this[Pe].emit("message",e,t)}function LX(e){let t=this[Pe];t._autoPong&&t.pong(e,!this._isServer,r1),t.emit("ping",e)}function kX(e){this[Pe].emit("pong",e)}function s1(e){e.resume()}function WX(e){let t=this[Pe];t.readyState!==Y.CLOSED&&(t.readyState===Y.OPEN&&(t._readyState=Y.CLOSING,i1(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function i1(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function a1(){let e=this[Pe];if(this.removeListener("close",a1),this.removeListener("data",bf),this.removeListener("end",l1),e._readyState=Y.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[Pe]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",e1),e._receiver.on("finish",e1))}function bf(e){this[Pe]._receiver.write(e)||this.pause()}function l1(){let e=this[Pe];e._readyState=Y.CLOSING,e._receiver.end(),this.end()}function c1(){let e=this[Pe];this.removeListener("error",c1),this.on("error",r1),e&&(e._readyState=Y.CLOSING,this.destroy())}});var g1=v((X0e,m1)=>{"use strict";var J0e=Pf(),{Duplex:TX}=require("stream");function u1(e){e.emit("close")}function EX(){!this.destroyed&&this._writableState.finished&&this.destroy()}function p1(e){this.removeListener("error",p1),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function xX(e,t){let r=!0,o=new TX({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(u1,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(u1,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",EX),o.on("error",p1),o}m1.exports=xX});var Zv=v((Y0e,f1)=>{"use strict";var{tokenChars:RX}=pi();function IX(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&RX[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}f1.exports={parse:IX}});var w1=v((Q0e,P1)=>{"use strict";var OX=require("events"),wf=require("http"),{Duplex:Z0e}=require("stream"),{createHash:MX}=require("crypto"),h1=yf(),xn=ui(),NX=Zv(),zX=Pf(),{CLOSE_TIMEOUT:DX,GUID:jX,kWebSocket:$X}=Ir(),HX=/^[+/0-9A-Za-z]{22}==$/,y1=0,S1=1,b1=2,Qv=class extends OX{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:DX,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:zX,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=wf.createServer((o,n)=>{let s=wf.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=FX(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=y1}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===b1){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Oc,this);return}if(t&&this.once("close",t),this._state!==S1)if(this._state=S1,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Oc,this):process.nextTick(Oc,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Oc(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",A1);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Rn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Rn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!HX.test(s)){Rn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Rn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Mc(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=NX.parse(c)}catch{Rn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&p!==void 0){let S=new xn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let f=h1.parse(p);f[xn.extensionName]&&(S.accept(f[xn.extensionName]),m[xn.extensionName]=S)}catch{Rn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(f,y,u,A)=>{if(!f)return Mc(r,y||401,u,A);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return Mc(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[$X])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>y1)return Mc(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${MX("sha1").update(r+jX).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),p._protocol=m)}if(t[xn.extensionName]){let m=t[xn.extensionName].params,S=h1.format({[xn.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${S}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",A1),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Oc,this)})),a(p,n)}};P1.exports=Qv;function FX(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Oc(e){e._state=b1,e.emit("close")}function A1(){this.destroy()}function Mc(e,t,r,o){r=r||wf.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${wf.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Rn(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Rn),e.emit("wsClientError",i,r,t)}else Mc(r,o,n,s)}});var UX,BX,GX,qX,VX,KX,_1,JX,Nc,v1=l(()=>{UX=g(g1(),1),BX=g(yf(),1),GX=g(ui(),1),qX=g(Uv(),1),VX=g(qv(),1),KX=g(Zv(),1),_1=g(Pf(),1),JX=g(w1(),1),Nc=_1.default});var eC,tC,rC=l(()=>{"use strict";eC="AGENT_WITCH_EXTERNAL_BRIDGE",tC="AGENT_WITCH_EXTERNAL_LIVE"});var oC,C1=l(()=>{"use strict";oC=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var XX,nC,L1=l(()=>{"use strict";rC();C1();XX=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",nC=(e={})=>{let t=e.env??process.env,r=oC(t[eC]),o=oC(t[tC]);return{mode:XX(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var k1=l(()=>{"use strict";rC()});var W1=l(()=>{"use strict";L1();k1()});var sC=l(()=>{"use strict"});var zr,zc=l(()=>{"use strict";zr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var yi,In,T1,ZX,iC,aC,E1,x1,lC,R1,Dc,cC=l(()=>{"use strict";yi=g(require("node:fs")),In=g(require("node:os")),T1=g(require("node:path"));sC();zc();ZX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),iC=(e=In.default.hostname())=>T1.default.join(In.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),aC=e=>{if(!yi.default.existsSync(e))return null;try{let t=JSON.parse(yi.default.readFileSync(e,"utf8"));return!ZX(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},E1=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},x1=(e,t)=>{yi.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},lC=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??iC(),o=aC(r);if(o!==null&&o.pid!==process.pid&&zr(o.pid)&&E1(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:In.default.hostname(),macOsUsername:In.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return x1(r,n),{ok:!0}},R1=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??iC(),o=aC(r);return o!==null&&o.pid!==process.pid&&zr(o.pid)&&E1(o)?{ok:!1}:(x1(r,{hostname:In.default.hostname(),macOsUsername:In.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},Dc=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??iC();aC(r)?.pid===process.pid&&yi.default.existsSync(r)&&yi.default.unlinkSync(r)}});var dC,jc,QX,eY,tY,rY,uC,I1=l(()=>{"use strict";dC=require("node:child_process"),jc=g(require("node:path"));zc();Lu();QX=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),eY=(e,t)=>{if(QX(e)||!/\bnode\b/.test(e))return!1;let r=jc.default.resolve(t),o=jc.default.join(r,"app",Ui),n=jc.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Ui||i==="agent-witch.ts")return e.includes(r);try{let a=jc.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},tY=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,dC.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},rY=(e,t,r)=>{let o=tY(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||eY(d,t)&&n.push(c)}return n},uC=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,dC.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=rY(r,e.installDir,t),n=[];for(let s of o)if(zr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var $c,Hc,O1,oY,pC,M1=l(()=>{"use strict";$c=g(require("node:fs")),Hc=g(require("node:path"));Re();O1=(e,t)=>{!$c.default.existsSync(e)||$c.default.existsSync(t)||($c.default.mkdirSync(Hc.default.dirname(t),{recursive:!0}),$c.default.renameSync(e,t))},oY=e=>{if(e.profileEmail===null)return;let t=Hc.default.join(e.installDir,mt);O1(Hc.default.join(t,jn),e.mainLogPath),O1(Hc.default.join(t,$n),e.errorLogPath)},pC=e=>{let t=N();e!==void 0&&t.installDir!==e||oY(t)}});var N1=l(()=>{"use strict";sl();mm();mm();!Ye()&&xo(__agentWitchImportMetaUrl)&&(async()=>{Xe("agent-witch-wake-server");let e=await Qo(),t=ar(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var z1=l(()=>{"use strict";N1()});var D1=l(()=>{"use strict";Ga()});var mC,j1=l(()=>{"use strict";sC();z1();cC();D1();mC=async(e={})=>{let t=e.skipInProcessBridge?null:await pm();Gp();let r=setInterval(()=>{Gp()},6e4),o=setInterval(()=>{if(!R1().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Fc,_f,iY,$1,H1,vf,F1,U1,gC,B1,Cf,G1=l(()=>{"use strict";Fc=g(require("node:fs")),_f=g(require("node:path")),iY="pending-run-inputs.json",$1=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H1=e=>{let t=e.profileEmail?_f.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return _f.default.join(t,iY)},vf=e=>{let t=H1(e);if(!Fc.default.existsSync(t))return{};try{let r=JSON.parse(Fc.default.readFileSync(t,"utf8"));return $1(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!$1(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},F1=(e,t)=>{let r=H1(e);Fc.default.mkdirSync(_f.default.dirname(r),{recursive:!0}),Fc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},U1=e=>Object.values(vf(e)),gC=(e,t)=>vf(e)[t]!==void 0,B1=(e,t)=>{let r=vf(e);r[t.agentRunId]=t,F1(e,r)},Cf=(e,t)=>{let r=vf(e);delete r[t],F1(e,r)}});var Lf=l(()=>{"use strict";me()});var q1=l(()=>{"use strict";me()});var kf=l(()=>{"use strict";me()});var Wf=l(()=>{"use strict";me()});var Uc=l(()=>{"use strict";me()});var aY,lY,Bc,fC=l(()=>{"use strict";At();Lf();q1();kf();Wf();Uc();aY={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},lY={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Bc=e=>{if(!de(e.writerAgent))return"the selected writer";let t=Ze(e.writerAgent);if(Oe(e.writerExecutionBackend)==="api"&&t!==null){let r=Be(Ce(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=ua(t,r.model);return`${lY[t]} model ${o}`}}return aY[e.writerAgent]}});var cY,dY,V1,K1,J1=l(()=>{"use strict";cY=/"input_tokens"\s*:\s*(\d+)/,dY=/"output_tokens"\s*:\s*(\d+)/,V1=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},K1=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=V1(cY.exec(t)),o=V1(dY.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var Tf=l(()=>{"use strict";Ut()});var Gc,Ef,uY,hC,X1,Y1,Z1,yC,Q1=l(()=>{"use strict";Gc=g(require("node:fs")),Ef=g(require("node:path"));Tf();uY="run-completion-outbox.json",hC=e=>{let t=e.profileEmail?Ef.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Ef.default.join(t,uY)},X1=e=>{let t=hC(e);if(!Gc.default.existsSync(t))return[];try{let r=JSON.parse(Gc.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},Y1=(e,t)=>{Gc.default.mkdirSync(Ef.default.dirname(hC(e)),{recursive:!0}),Gc.default.writeFileSync(hC(e),JSON.stringify(t,null,2),"utf8")},Z1=(e,t)=>{let r=[...X1(e).filter(o=>o.runId!==t.runId),t];Y1(e,r)},yC=async e=>{if(e.cloudApi===null)return;let t=X1(e.layout);if(t.length===0)return;let r=[];for(let o of t)await ja(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);Y1(e.layout,r)}});var eU=l(()=>{"use strict"});var SC,qc,mY,On,tU=l(()=>{"use strict";eU();SC=new Map,qc=e=>{let t=SC.get(e);t!==void 0&&(clearInterval(t),SC.delete(e))},mY=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},On=(e,t,r,o={})=>{qc(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){qc(t);return}let i=o.onTick?.()??{};mY(e,t,n,i)};s(),SC.set(t,setInterval(s,15e3))}});var rU=l(()=>{"use strict";Ut()});var oU,nU=l(()=>{"use strict";rU();oU=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:st(t)}});var AC,Vc,Dr,bC,er,sU,xf=l(()=>{"use strict";AC=new Set,Vc=new Map,Dr=(e,t)=>{if(t.length===0)return;let r=Vc.get(e)??[];r.push(t),Vc.set(e,r)},bC=e=>{AC.add(e);let t=Vc.get(e)??[];return Vc.delete(e),t},er=e=>AC.has(e),sU=e=>{AC.delete(e),Vc.delete(e)}});var Si,iU,aU,lU=l(()=>{"use strict";Si=g(require("node:path")),iU=require("node:url");Eo();aU=()=>{if(Ye()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Si.default.dirname(Si.default.resolve(e)):Si.default.dirname(Si.default.resolve(__filename))}return Si.default.dirname((0,iU.fileURLToPath)(__agentWitchImportMetaUrl))}});var cU,dU,uU,pU,Je,Ai,mU,gU,bi,PC,wC,_C,fU,vC,hU,Rf=l(()=>{"use strict";cU=require("node:crypto"),dU=g(require("node:fs")),uU=g(require("node:path")),pU=require("node:url");zc();Eo();lU();Je=new Map,mU=async()=>{if(Ai!==void 0)return Ai;try{if(Ye()){let e=aU(),t=uU.default.join(e,"deps","node-pty","lib","index.js");if(dU.default.existsSync(t)){let r=await import((0,pU.pathToFileURL)(t).href);return Ai=r,r}}return Ai=await import("node-pty"),Ai}catch{return Ai=null,null}},gU=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},bi=(e,t,r)=>{let o=Je.get(e);if(o!==void 0){Je.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},PC=(e,t)=>{let r=Je.get(e);return r===void 0?!1:(r.pty.write(t),!0)},wC=(e,t,r)=>{let o=Je.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},_C=e=>{for(let t of Je.values())if(!(t.mode!=="agent"||t.runId!==e))return zr(t.pty.pid);return!1},fU=e=>{for(let[t,r]of Je.entries())if(!(r.mode!=="agent"||r.runId!==e)){Je.delete(t);try{r.pty.kill()}catch{}return!0}return!1},vC=async e=>{let t=await mU();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;Je.get(e.shellSessionId)!==void 0&&bi(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Je.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{gU(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{Je.get(e.shellSessionId)?.pty===n&&(Je.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},hU=async e=>{let t=e.shellSessionId??(0,cU.randomUUID)(),r=await mU();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return Je.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{gU(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{Je.get(t)?.pty===o&&(Je.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var If,yU,SU=l(()=>{"use strict";If="[[AWAITING_INPUT]]",yU=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",If,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Kc,AU,Of=l(()=>{"use strict";SU();Kc=e=>{let t=e.indexOf(If);if(t<0)return null;let o=e.slice(t+If.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},AU=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",yU].join(`
`)});var bU,PU=l(()=>{"use strict";xf();Rf();Of();bU=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(er(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Dr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await hU({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Kc(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var wU,_U,vU,jr,Mf=l(()=>{"use strict";wU=require("node:child_process"),_U=g(require("node:fs")),vU=g(require("node:path"));Lu();jr=(e,t)=>{let r=vU.default.join(e,"app",HW,"ensure-writer.sh");return _U.default.existsSync(r)?new Promise((o,n)=>{let s=(0,wU.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var CU,Mn,Xc,Nf,CC,Jc,zf,Df,LC,kC,gY,Pi,fY,hY,WC,TC=l(()=>{"use strict";CU=require("node:child_process");At();Mf();kf();Lf();Uc();Wf();Mn=new Map,Xc=e=>e==="cursor"||e==="antigravity",Nf=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",CC=e=>Mn.get(e)?.warmed===!0,Jc=e=>{let t=Mn.get(e);Mn.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},zf=e=>Mn.get(e)?.conversationStarted===!0,Df=e=>{let t=Mn.get(e);Mn.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},LC=e=>{Mn.delete(e)},kC=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",gY={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Pi=e=>`${gY[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,fY=(e,t,r,o)=>new Promise(n=>{let s=Hu(t,r),i=[],a=(0,CU.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),hY=(e,t)=>{let r=Pi(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},WC=async e=>{if(!de(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Oe(e.runConfig.writerExecutionBackend)==="api"){let r=Ze(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Ce(e.runConfig.layout.configPath);return Be(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Jc(e.writerAgent),{exitCode:0,output:Pi(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await jr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}Xc(e.writerAgent)&&Jc(e.writerAgent);let t=await fY(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?hY(e.writerAgent,t.output):Pi(e.writerAgent)}}});var Nn,EC=l(()=>{"use strict";Nn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var LU,yY,SY,kU,AY,xC,WU=l(()=>{"use strict";EC();LU=/you(?:'|')ve hit your session limit/i,yY=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],SY=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,kU=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},AY=e=>{let t=SY.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},xC=e=>{let t=e.trim();if(t.length===0)return null;if(LU.test(t))return{code:Nn.SESSION_LIMIT,resetHint:AY(t),matchedLine:kU(t,LU)};for(let r of yY)if(r.test(t))return{code:Nn.PROVIDER_QUOTA,resetHint:null,matchedLine:kU(t,r)};return null}});var jf,$f,RC,IC=l(()=>{"use strict";jf="[[AGENT_RUN_WRITER_EXECUTION]]",$f="cli-writer-api-key-missing",RC="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var OC=l(()=>{"use strict";IC()});var TU=l(()=>{"use strict";OC()});var Hf=l(()=>{"use strict";EC();WU();IC();OC();TU()});var Ff,EU=l(()=>{"use strict";Ff={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var xU,RU=l(()=>{"use strict";xU="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var IU,OU=l(()=>{"use strict";Hf();RU();IU=e=>e.code===Nn.SESSION_LIMIT?xU:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var MU,NU=l(()=>{"use strict";Hf();EU();OU();MU=e=>{let t=xC(e.output);return t!==null?{status:Ff.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:IU(t)}:{status:e.exitCode===0?Ff.COMPLETED:Ff.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var MC,aMe,zU=l(()=>{"use strict";MC={OPEN:"open",APPROVAL:"approval"},aMe=MC.APPROVAL});var wi,Uf,DU,wY,jU,$U,HU,Yc,NC,zC=l(()=>{"use strict";wi=g(require("node:fs")),Uf=g(require("node:path")),DU="runs",wY=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jU=e=>{let t=e.profileEmail!==null?Uf.default.join(e.installDir,"profiles",e.profileEmail,DU):Uf.default.join(e.installDir,DU);return wi.default.mkdirSync(t,{recursive:!0}),t},$U=(e,t)=>Uf.default.join(jU(e),`${t}.json`),HU=(e,t)=>{wi.default.writeFileSync($U(e,t.id),JSON.stringify(t,null,2))},Yc=(e,t)=>{let r=$U(e,t);if(!wi.default.existsSync(r))return null;try{let o=JSON.parse(wi.default.readFileSync(r,"utf8"));return!wY(o)||typeof o.id!="string"?null:o}catch{return null}},NC=e=>{let t=jU(e),r=wi.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=Yc(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var _Y,FU,UU=l(()=>{"use strict";NU();zU();zC();_Y=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=MU({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:MC.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},FU=(e,t)=>{let r=_Y(t);return HU(e,r),r}});var BU=l(()=>{"use strict";tf()});var GU,qU=l(()=>{"use strict";Hf();GU=()=>[jf,`agentRunWriterExecutionBackend=${$f}`,`agentRunWriterExecutionReasonCode=${RC}`].join(`
`)});var fo,Bf=l(()=>{"use strict";fo=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var DC,vY,CY,VU,KU=l(()=>{"use strict";DC=e=>e.toLocaleString("en-US"),vY=e=>e<.01?e.toFixed(4):e.toFixed(3),CY=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${vY(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${DC(e.inputTokens)} in / ${DC(e.outputTokens)} out (${DC(e.totalTokens)} total)`,t].join(`
`)},VU=(e,t)=>{if(t===void 0)return e;let r=CY(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var JU=l(()=>{"use strict";me()});var YU,Zc,fe,jC,Gf,XU,LY,kY,ZU,QU,eB,Qc,$C,HC,FC,tB,WY,pt,ed,ho,rB,TY,EY,qf,UC,BC,GC,oB=l(()=>{"use strict";YU=require("node:child_process");me();At();G1();Ac();fC();J1();da();Q1();Tf();tU();zc();nU();xf();Rf();Of();PU();TC();UU();BU();qU();Bf();KU();Qn();JU();Uc();Ki();Of();Zc=new Map,fe=new Map,jC=new Set,Gf=new Map,XU=e=>{e!==void 0&&!Gf.has(e)&&Gf.set(e,Date.now())},LY=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(er(t)){pt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}Dr(t,n)},kY=(e,t,r,o,n)=>{if(!AS(e,n))return;let s=`${GU()}
`;LY(t,r,o,s);let i=fe.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},ZU=130,QU=`

Stopped by user.`,eB=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:fo(e)},Qc=null,$C=e=>{Qc=e},HC=(e,t)=>{if(Qc===null)return;let r=j_(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||SA(Qc,t,r)},FC=async e=>{await yC({layout:e,cloudApi:Qc})},tB=e=>{let t=Zc.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:zr(t.pid)},WY=e=>ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),pt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},ed=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Kn(s),c=fe.get(r);if(a!==null&&c!==void 0){let d=YW(a),p=tB(r)||_C(r);d!==null&&!p&&ho(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return XW(a)}}),ho=(e,t,r,o,n,s,i,a)=>{let c=ss(s,a),d=n,p=VU(c.output,c.llmUsage);if(r!==void 0){let S=Gf.get(r);Gf.delete(r),S!==void 0&&z_({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let f=K1(c.llmUsage,p);f!==null&&mH({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:f})}r!==void 0&&jC.has(r)&&(jC.delete(r),d=ZU,p=p.trim().length>0&&!p.includes("Stopped by user.")?`${p.trim()}${QU}`:"Stopped by user.");let m=r!==void 0?j_(e.layout.reportsDir,r):null;if(r!==void 0){qc(r),Sa(e.layout,r),er(r)&&(pt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),sU(r));let S=fe.get(r);dH({reportsDir:e.layout.reportsDir,agentRunId:r,input:fo(i),output:p,...S!==void 0?{writerLabel:Bc({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&Qg({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:p,agentRunId:r}),FU(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:p,layout:e.layout}),Z1(e.layout,{runId:r,exitCode:d,output:p,createdAt:new Date().toISOString(),...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{}}),yC({layout:e.layout,cloudApi:Qc}),fe.delete(r),Zc.delete(r),Cf(e.layout,r)}pt(t,{type:"command.claude.result",payload:{exitCode:d,output:p,...r!==void 0?{agentRunId:r}:{},...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),oa(e.layout)},rB=(e,t,r,o,n,s,i)=>{let a=fe.get(r),c=a?.accumulatedOutput??s;B1(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),On(t,r,()=>gC(e.layout,r),ed(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),pt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},TY=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=f=>{if(!(n===void 0||f.length===0)){if(er(n)){pt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:f},requestId:o});return}Dr(n,f)}};if(n!==void 0){let f=fe.get(n);Zc.set(n,t),fe.set(n,{originalPrompt:s,userTranscriptPrompt:f?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:f?.projectFolderPath,reportKey:f?.reportKey,accumulatedOutput:f?.accumulatedOutput??""}),pt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),On(r,n,()=>tB(n),ed(e,r,n,o,f?.projectFolderPath,f?.reportKey))}let m=a==="claude-cli",S=[];t.stdout?.on("data",f=>{let y=f.toString("utf8");if(m?S.push(y):(c.push(y),p(y)),d||n===void 0)return;let u=Kc(c.join(""));if(u!==null){d=!0,t.kill("SIGTERM");let A=fe.get(n),b=[A?.accumulatedOutput??"",u.partialOutput].filter(h=>h.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=b),Zc.delete(n),rB(e,r,n,o,u.question,b,s)}}),t.stderr?.on("data",f=>{let y=f.toString("utf8");c.push(y),p(y)}),t.on("close",f=>{if(d)return;Df(a);let y=n!==void 0?fe.get(n):void 0,u=m?ss(S.join("")):{output:c.join("").trim(),llmUsage:void 0},A=m?c.join("").trim():"",b=[u.output.trim(),A].filter(w=>w.length>0).join(`
`);m&&u.output.trim().length>0&&p(u.output);let h=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${b}`.trim():b;ho(e,r,n,o,f??-1,h,s,u.llmUsage)}),t.on("error",f=>{d||ho(e,r,n,o,-1,f.message,s)})},EY=(e,t,r,o,n,s,i,a,c)=>{let d=eB(r,c);s!==void 0&&(fe.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),pt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),On(n,s,()=>fe.has(s),ed(e,n,s,o,i,a))),ga(e,t,r,m=>{if(!(s===void 0||m.length===0)){if(er(s)){pt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:m},requestId:o});return}Dr(s,m)}}).then(m=>{Df(t),ho(e,n,s,o,m.exitCode,m.output,r,m.llmUsage)}).catch(m=>{let S=m instanceof Error?m.message:String(m);ho(e,n,s,o,-1,S,r)})},qf=(e,t,r,o,n,s,i,a,c,d,p,m)=>{let S=eB(r,p);if(ra(e.layout),$o(e,t)){XU(s),EY(e,t,r,o,n,s,c,d,S);return}let f=$t(t,r,WY(e),i);if(f===null){ho(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}XU(s);let y=oU({workspace:e.workspace,projectFolderPath:c}),u=()=>{let A=(0,YU.spawn)(f.command,[...f.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:m??process.env});TY(e,A,n,o,s,r,S,t)};if(s===void 0){u();return}fe.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:fe.get(s)?.accumulatedOutput??""}),kY(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Vi({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),On(n,s,()=>fe.has(s),ed(e,n,s,o,c,d)),bU({socket:n,sendMessage:pt,requestId:o,agentRunId:s,shellSessionId:a,command:f.command,args:f.args,cwd:y,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:A=>{a!==void 0&&bi(a,w=>{pt(n,w)},o);let b=fe.get(s),h=[b?.accumulatedOutput??"",A.partialOutput].filter(w=>w.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=h),rB(e,n,s,o,A.question,h,r)},onFinished:(A,b)=>{Df(t);let h=ss(b),w=fe.get(s),_=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${h.output}`.trim():h.output;ho(e,n,s,o,A,_,r,h.llmUsage)}}).then(A=>{if(!A){u();return}On(n,s,()=>_C(s),ed(e,n,s,o,c,d))}).catch(A=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",A instanceof Error?A.message:A),u()})},UC=(e,t,r,o)=>{Cf(e.layout,t.agentRunId),t.shellSessionId!==void 0&&pt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=AU(t),s=fe.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;qf(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},BC=(e,t)=>{for(let r of U1(e.layout))fe.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:fo(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),On(t,r.agentRunId,()=>gC(e.layout,r.agentRunId),{awaitingInput:!0}),pt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},GC=(e,t,r,o)=>{let n=fe.get(r);if(n===void 0)return!1;jC.add(r),qc(r);let s=Zc.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(fU(r))return!0;Cf(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${QU}`:"Stopped by user.";return ho(e,t,r,o,ZU,i,n.originalPrompt),!0}});var xY,qC,nB=l(()=>{"use strict";_a();xY=()=>`http://127.0.0.1:${bt()}/restart`,qC=async()=>{try{let e=await fetch(xY(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var sB=l(()=>{"use strict";dl()});var iB=l(()=>{"use strict";gv()});var aB,lB=l(()=>{"use strict";aB=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var td,RY,VC,cB=l(()=>{"use strict";J();re();sB();sb();iB();lB();Qn();td=(e,t)=>{to(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},RY=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(zy(),Ny)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},VC=async e=>{let t=Ie(e.layout.installDir)?.bundleVersion??null;if(!aB({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(St(e.layout)){na({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),td(e.layout,{summary:r,action:"install-bundle-update-start"}),ir({launchAgentLabel:_e(e.layout.installDir),installDir:e.layout.installDir});let o=await li({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),td(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await RY();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),td(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),td(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),td(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var IY,KC,dB=l(()=>{"use strict";IY=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),KC=e=>{if(!IY(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var JC,XC,uB=l(()=>{"use strict";jA();$A();JC=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=qa({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},XC=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await gr(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var pB,OY,MY,NY,rd,mB=l(()=>{"use strict";pB=g(require("node:os"));Re();OY="Default",MY=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),NY=e=>{let t=pB.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},rd=()=>{let e=N(),t=hu(e),r=MY(OY);return`${NY(t)}/${r.length>0?r:"project"}`}});var gB=l(()=>{"use strict";dl()});var fB,YC,hB=l(()=>{"use strict";gB();fB=!1,YC=e=>{fB||(fB=!0,process.on("uncaughtException",t=>{tn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;tn(e,{kind:"crash",message:r,stack:o})}))}});var yB,zY,ZC,SB=l(()=>{"use strict";yB=require("node:child_process");Mf();At();kf();Lf();Uc();Wf();zY=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,yB.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},ZC=async e=>{if(!de(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Oe(e.runConfig.writerExecutionBackend)==="api"){let r=Ze(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Ce(e.layout.configPath),n=Be(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await jr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await zY(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var QC,AB=l(()=>{"use strict";QC=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var bB,eL,PB=l(()=>{"use strict";bB=require("node:crypto"),eL=()=>(0,bB.randomUUID)()});var _i,wB,Vf=l(()=>{"use strict";_i="[[WORKING_ESTIMATE]]",wB=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",_i,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var _B,vB=l(()=>{"use strict";_B=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var DY,CB,LB=l(()=>{"use strict";Vf();DY=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,CB=e=>{if(!e.includes(_i))return null;let t=null;for(let r of e.matchAll(DY)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var jY,tL,kB=l(()=>{"use strict";LB();jY=/^(\d{1,6})\b/,tL=e=>{let t=CB(e);if(t!==null)return t;let r=jY.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var $Y,HY,FY,Kf,rL=l(()=>{"use strict";At();al();$Y="http://127.0.0.1:11434",HY=45e3,FY=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Kf=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||$Y,o=t===void 0?(await _t({commands:ue({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(HY)});return n.ok?FY(await n.json()):null}catch{return null}}});var oL,nL,sL,WB=l(()=>{"use strict";Ki();Vf();Bf();vB();kB();Ac();rL();oL=async e=>{let t=fo(e.wrappedPrompt),r=uH(e.reportsDir);return{estimateOutput:await Kf(wB(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},nL=e=>{let t=tL(e.estimateOutput);t!==null&&qg({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},sL=e=>{let t=tL(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=_B(t);return qi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Nt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),qg({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var Jf,TB,iL=l(()=>{"use strict";Jf="[[WORKING_TOKEN_ESTIMATE]]",TB=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Jf,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var EB,UY,xB,RB=l(()=>{"use strict";iL();EB=/^(\d{1,8})\b/,UY=e=>{let t=e.indexOf(Jf);if(t<0)return null;let r=e.slice(t+Jf.length).trim(),o=EB.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},xB=e=>{let t=UY(e);if(t!==null)return t;let r=EB.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var aL,lL,IB=l(()=>{"use strict";iL();Bf();RB();Ac();rL();aL=async e=>{let t=fo(e.wrappedPrompt),r=gH(e.reportsDir);return{estimateOutput:await Kf(TB(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},lL=e=>{let t=xB(e.estimateOutput);return t===null?null:(pH({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var OB=l(()=>{"use strict";cC();I1();M1();j1();_a();oB();Mf();At();zC();xf();nB();KA();cB();Qn();dB();uB();Tf();mB();hB();SB();ku();AB();PB();Vf();Ki();WB();IB();fC();al();Rf();TC()});var MB={};It(MB,{buildContinuationPromptWithContext:()=>qY});var BY,GY,qY,NB=l(()=>{"use strict";BY=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,GY=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),qY=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=GY(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${BY(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var zB={};It(zB,{readHarnessExportSets:()=>KY});var od,cL,Xf,VY,KY,DB=l(()=>{"use strict";od=g(require("node:fs")),cL=g(require("node:path"));Re();Xf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),VY=e=>{if(!od.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(od.default.readFileSync(e.harnessManifestPath,"utf8"));if(Xf(t))return t}catch{return null}return null},KY=(e,t)=>{let r=N(t),o=VY(r);if(o===null)return[];let n=Xf(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!Xf(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!Xf(p))continue;let m=typeof p.path=="string"?p.path:void 0,S=typeof p.id=="string"?p.id:"",f=typeof p.kind=="string"?p.kind:"",y=typeof p.title=="string"?p.title:"";if(m===void 0||S.length===0||f.length===0||y.length===0)continue;let u=m.startsWith("shared/")?cL.default.join(r.harnessRootDir,m):cL.default.join(r.harnessSetsDir,i,m);od.default.existsSync(u)&&d.push({id:S,kind:f,title:y,content:od.default.readFileSync(u,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var hL,uL,vi,jB,JY,$B,HB,dL,FB,pL,mL,gL,Z,G,fL,XY,nd,YY,ZY,QY,eZ,tZ,rZ,oZ,nZ,sd,UB=l(()=>{"use strict";hL=require("node:child_process"),uL=g(require("node:fs")),vi=g(require("node:os"));v1();J();re();bs();Lv();W1();me();jt();dl();fP();lf();tf();Ut();Go();hb();Dt();OB();jB=3e4,JY=3e4,$B=new Map,HB=new Map,dL=new Map,FB=new Map,pL=new Map,mL=new Map,gL=new Map,Z=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),G=(e,t,r)=>{e.readyState===Nc.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(to(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),gm(r,"out",t)))},fL=e=>e,XY=e=>{if(!uL.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(uL.default.readFileSync(e.harnessManifestPath,"utf8"));if(Z(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},nd=(e,t)=>{let r=XY(t);r!==null&&G(e,{type:"harness.manifest.report",payload:{hostname:vi.default.hostname(),manifest:r}})},YY=async(e,t,r,o,n,s,i=!1,a,c,d,p,m)=>{let S=m?.trim()??"";if(!de(t)){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Bc({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await _t({commands:ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),u=s!==void 0?oL({wrappedPrompt:r,writerLabel:f,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=s!==void 0?aL({wrappedPrompt:r,writerLabel:f,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=Xc(t)&&!CC(t);if(b){try{await jr(e.layout.installDir,t)}catch(F){let we=F instanceof Error?F.message:String(F);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${we}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Jc(t)}else if(!Xc(t))try{await jr(e.layout.installDir,t)}catch(F){let we=F instanceof Error?F.message:String(F);G(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${we}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=ha(d,rd,m);if(h===null){G(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Qe({projectFolderPath:h,...S.length>0?{projectId:S}:{}}),i||vc(e.layout,t,h);let w=ef({sessionContinuation:i,supportsWriterSessionContinuation:Nf(t),isWriterConversationStarted:zf(t)}),_=i&&w==="first"?_c(e.layout,t,h):null,C=_!==null?ai(e.layout,_):null,k=C!==null&&C.turns.length>0,W=ev({sessionContinuation:i,supportsWriterSessionContinuation:Nf(t),isWriterConversationStarted:zf(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:k,userPromptCharacterCount:r.length}),x=r;if(W.continuationStrategy==="source_run_seed"){let F=typeof c=="string"&&c.length>0?Yc(e.layout,c):null;if(F!==null){let{buildContinuationPromptWithContext:we}=await Promise.resolve().then(()=>(NB(),MB));x=we({priorPrompt:F.prompt,priorOutput:F.resultOutput??"",userMessage:r})}}else W.continuationStrategy==="transcript_seed"&&C!==null&&C.turns.length>0&&(x=Jg({priorTurns:C.turns,userMessage:r}));let I=W.ragLimit>0?await xs({layout:e.layout,query:x,limit:W.ragLimit,minScore:W.ragMinScore,projectFolderPath:h,...S.length>0?{projectId:S}:{}}):[],M=W.ragLimit>0&&h.trim().length>0?await mP({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:h,...S.length>0?{projectId:S}:{}}):[],H=W.injectMemory?B_(e.layout,h,S.length>0?S:void 0):[],q=`${q_(H,W.memoryEntryLimit)}${dP(I)}${gP(M)}${x}`,B=p?.trim()??(s!==void 0&&h.trim().length>0?eL():void 0);if(s!==void 0&&B!==void 0&&B.length>0&&h.trim().length>0){Vi({reportKey:B,agentRunId:s,userSummary:"Working on your Mac\u2026"});let F=q;u!==null&&u.then(we=>{if(we===null)return;let $r=sL({estimateOutput:we.estimateOutput??"",reportKey:B,agentRunId:s,reportsDir:e.layout.reportsDir,task:we.task,writerLabel:we.writerLabel,embedding:we.embedding});if($r.estimateSeconds===null)return;HC(e.layout.reportsDir,s);let tr=`${_i}
${$r.estimateSeconds}
`;if(er(s)){G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:tr},requestId:o});return}Dr(s,tr)}).catch(()=>{}),q=QC(F),q=cy(q,{agentRunId:s,reportKey:B,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&u!==null&&u.then(F=>{F!==null&&nL({estimateOutput:F.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:F.task,writerLabel:F.writerLabel,embedding:F.embedding})}).catch(()=>{}),s!==void 0&&A!==null&&A.then(F=>{F!==null&&lL({estimateOutput:F.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:F.task,writerLabel:F.writerLabel})}).catch(()=>{});let Fe=s!==void 0&&gL.get(s)===!0;if(s!==void 0&&h.trim().length>0){let F=await Up(h);mL.set(s,F),B!==void 0&&B.length>0&&pL.set(s,B)}qf(e,t,q,o,fL(n),s,{sessionTurn:W.sessionTurn},a,h,B,r,gS(e.layout,s,Fe)),b&&s!==void 0&&G(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:kC(t)},requestId:o})},ZY=async(e,t,r,o,n)=>{let s=(i,a)=>{G(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await WC({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,G(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=de(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Pi(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},QY=(e,t,r)=>new Promise(o=>{if(!de(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=$t(t,r,ue({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,hL.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),eZ=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;G(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Ft(t.bundle),s=Z(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=ve(e.wsUrl)??yt,m=await QS({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=Bo({bundle:i,layout:e.layout});return G(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&nd(o,e.layout),!0},tZ=async(e,t,r,o)=>{if(await eZ(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(G(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!de(n)){G(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}ra(e.layout);let i=await(async()=>{try{await jr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return QY(e,n,s)})().finally(()=>{oa(e.layout)});G(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),nd(o,e.layout)},rZ=e=>{let t=1e3*2**e;return Math.min(JY,t)},oZ=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=u=>{if(!t.restartInFlight){if(St(e.layout)){Ey(u),console.log(`[agent-witch] Deferring local restart (${u}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${u})\u2026`),t.wakeError=`restart:${u}`,qC().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(u,A="system.ack")=>{if(!t.selfUpdateInFlight){if(St(e.layout)){na({layout:e.layout,remoteBundleVersion:u,trigger:A}),console.log(`[agent-witch] Deferring install bundle update (${u} via ${A}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,VC({layout:e.layout,remoteBundleVersion:u,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let u=ke(e.layout);u!==null&&$e(u,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),f())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let u=t.socket;t.socket=void 0,t.wsConnected=!1,u.removeAllListeners("open"),u.removeAllListeners("message"),u.removeAllListeners("close"),u.on("error",()=>{}),(u.readyState===Nc.OPEN||u.readyState===Nc.CONNECTING)&&u.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,jB)},p=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let u=rZ(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${u}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,f()},u)},m=u=>{s();let A=()=>{let b=Zi(e.layout.installDir),h=bt();G(u,{type:"agent.heartbeat",payload:{hostname:vi.default.hostname(),macOsUsername:vi.default.userInfo().username,wakeError:t.wakeError,wakePort:h,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,jB)},S=(u,A)=>{if(typeof u.type!="string")return;if(fb(u)){t.stopped=!0,s(),a(),c(),ub({layout:e.layout}).finally(()=>{Dc(),process.exit(0)});return}to(e.layout,{direction:"in",type:u.type,summary:"inbound WS frame"}),gm(e.layout,"in",u);let b=typeof u.requestId=="string"?u.requestId:void 0;if(u.type==="device.auth.attestation"&&Z(u.payload)){let h=typeof u.payload.serverPublicKey=="string"?u.payload.serverPublicKey:"",w=typeof u.payload.origin=="string"?u.payload.origin:"",_=typeof u.payload.devicePublicKey=="string"?u.payload.devicePublicKey:"",C=typeof u.payload.challenge=="string"?u.payload.challenge:"",k=typeof u.payload.serverAttestation=="string"?u.payload.serverAttestation:"";if(!Cv({serverPublicKey:h,origin:w,devicePublicKey:_,challenge:C,serverAttestation:k})){t.wakeError="Server attestation verification failed",to(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(u.type==="writer.ensure"&&Z(u.payload)){let h=typeof u.payload.writerAgent=="string"?u.payload.writerAgent:"";to(e.layout,{direction:"local",type:"writer.ensure",summary:h,action:"ensure-writer"}),ZC({layout:e.layout,writerAgent:h,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{G(A,{type:"writer.status",payload:w},e.layout)})}if(u.type==="install.bundle.update"&&Z(u.payload)){let h=typeof u.payload.bundleVersion=="string"?u.payload.bundleVersion.trim():"";h.length>0&&o(h,"install.bundle.update")}if(u.type==="system.ack"){Xp(e.layout,{wsUrl:e.wsUrl});let h=Z(u.payload)?u.payload:null,w=KC(h);w!==null&&o(w)}if(u.type==="device.restart"&&r("cloud-device-restart"),u.type==="automations.sync"&&Z(u.payload)&&JC(u.payload),u.type==="automations.run"&&Z(u.payload)&&XC(u.payload),u.type==="terminal.stream.accepted"&&Z(u.payload)){let h=typeof u.payload.runId=="string"?u.payload.runId:"";if(h.length>0){let w=bC(h);for(let _ of w)G(A,{type:"terminal.stream.chunk",payload:{runId:h,chunk:_},requestId:b})}}if(u.type==="agent.agentRun.list"&&G(A,{type:"dashboard.agentRun.list.result",payload:{runs:NC(e.layout)},requestId:b}),u.type==="agent.agentRun.get"&&Z(u.payload)){let h=typeof u.payload.runId=="string"?u.payload.runId:"",w=h.length>0?Yc(e.layout,h):null;G(A,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:b})}if(u.type==="command.claude.run"&&Z(u.payload)){let h=u.payload.prompt,w=typeof u.payload.writerAgent=="string"&&de(u.payload.writerAgent)?u.payload.writerAgent:"claude-cli",_=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,C=u.payload.sessionContinuation===!0,k=typeof u.payload.sourceRunId=="string"?u.payload.sourceRunId:void 0,W=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:void 0,x=typeof u.payload.projectId=="string"?u.payload.projectId:void 0,I=ha(typeof u.payload.projectFolderPath=="string"?u.payload.projectFolderPath:void 0,rd,x),M=aS(u.payload.compositionSnapshot),H=typeof u.payload.reportKey=="string"?u.payload.reportKey:void 0;if(typeof h=="string"&&h.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${C?"continue":"first"})\u2026`),I===null){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(M!==null){let q=cS(e.layout,M);if(q!==null){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:q,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(_!==void 0){let B=uS(e.layout,_,M);if(!B.ok){G(A,{type:"command.claude.result",payload:{exitCode:-1,output:B.errorMessage,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}gL.set(_,M.entries.some(Fe=>Fe.scope==="run"))}}_!==void 0&&W!==void 0&&$B.set(_,W),_!==void 0&&(HB.set(_,I),x!==void 0&&x.trim().length>0&&dL.set(_,x.trim()),FB.set(_,h.trim()),Qe({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),YY(e,w,h.trim(),b,A,_,C,W,k,I,H,x)}}if(u.type==="shell.session.open"&&Z(u.payload)){let h=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:120,_=typeof u.payload.rows=="number"?u.payload.rows:32;h.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),vC({shellSessionId:h,cwd:e.workspace,cols:w,rows:_,send:C=>{G(A,C)},requestId:b}))}if(u.type==="shell.session.close"&&Z(u.payload)){let h=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"";h.length>0&&bi(h,w=>{G(A,w)},b)}if(u.type==="shell.input"&&Z(u.payload)){let h=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.data=="string"?u.payload.data:"";h.length>0&&w.length>0&&PC(h,w)}if(u.type==="shell.resize"&&Z(u.payload)){let h=typeof u.payload.shellSessionId=="string"?u.payload.shellSessionId:"",w=typeof u.payload.cols=="number"?u.payload.cols:0,_=typeof u.payload.rows=="number"?u.payload.rows:0;h.length>0&&w>0&&_>0&&wC(h,w,_)}if(u.type==="command.writer.session.end"&&Z(u.payload)){let h=u.payload.writerAgent;typeof h=="string"&&de(h)&&(LC(h),Zg(e.layout,h))}if(u.type==="command.writer.session.start"&&Z(u.payload)){let h=u.payload.writerAgent,w=typeof u.payload.writerSessionId=="string"?u.payload.writerSessionId:"";typeof h=="string"&&de(h)&&w.length>0&&(console.log(`[agent-witch] Starting ${h} session\u2026`),ZY(e,h,w,b,A))}if(u.type==="command.claude.stop"&&Z(u.payload)){let h=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"";h.length>0&&(console.log(`[agent-witch] Stopping run ${h}\u2026`),GC(e,fL(A),h,b))}if(u.type==="command.claude.input_respond"&&Z(u.payload)){let h=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:"",w=typeof u.payload.response=="string"?u.payload.response.trim():"",_=typeof u.payload.originalPrompt=="string"?u.payload.originalPrompt:"",C=typeof u.payload.partialOutput=="string"?u.payload.partialOutput:"",k=typeof u.payload.question=="string"?u.payload.question:"";h.length>0&&w.length>0&&_.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),UC(e,{agentRunId:h,originalPrompt:_,partialOutput:C,question:k,response:w,shellSessionId:$B.get(h)},b,fL(A)))}if(u.type==="dispatch.approval.required"&&Z(u.payload)){let h=typeof u.payload.requesterEmail=="string"?u.payload.requesterEmail:"A teammate",w=typeof u.payload.prompt=="string"?u.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${h}: ${w}`),process.platform==="darwin"&&(0,hL.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${h.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(u.type==="harness.request"&&Z(u.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),tZ(e,u.payload,b,A)),u.type==="harness.export.request"&&Z(u.payload)){let h=typeof u.payload.borrowerUserId=="string"?u.payload.borrowerUserId:"",w=typeof u.payload.targetDeviceId=="string"?u.payload.targetDeviceId:void 0,_=Array.isArray(u.payload.setSlugs)?u.payload.setSlugs.filter(C=>typeof C=="string"):[];h.length>0&&_.length>0&&(async()=>{let{readHarnessExportSets:C}=await Promise.resolve().then(()=>(DB(),zB)),k=C(_,e.email);G(A,{type:"harness.export.result",payload:{success:k.length>0,borrowerUserId:h,...w!==void 0?{targetDeviceId:w}:{},sets:k,errorMessage:k.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(u.type==="harness.manifest.request"&&nd(A,e.layout),u.type==="command.claude.result"&&Z(u.payload)){let h=typeof u.payload.agentRunId=="string"?u.payload.agentRunId:void 0,w=typeof u.payload.output=="string"?u.payload.output:"",_=typeof u.payload.exitCode=="number"?u.payload.exitCode:null,C=ha(h!==void 0?HB.get(h):void 0,rd),k=h!==void 0?dL.get(h):void 0,W=h!==void 0?FB.get(h)??"":"",x=TA({exitCode:_,output:w});if(x&&C!==null&&cP({layout:e.layout,text:w,source:h??"command.claude.result",projectFolderPath:C,...k!==void 0?{projectId:k}:{}}),_!=null&&_!==0&&w.trim().length>0&&C!==null&&(nP({layout:e.layout,errorText:w,projectFolderPath:C,...k!==void 0?{projectId:k}:{}}),pP({layout:e.layout,text:w,source:h??"command.claude.result.failure",projectFolderPath:C,...k!==void 0?{projectId:k}:{}})),x&&W.trim().length>0&&C!==null&&G_({layout:e.layout,projectFolderPath:C,...k!==void 0?{projectId:k}:{},entry:{id:`${Date.now()}-${h??"run"}`,...h!==void 0?{agentRunId:h}:{},prompt:W,output:w,createdAt:new Date().toISOString()}}),h!==void 0&&C!==null){let M=pL.get(h),H=mL.get(h);M!==void 0&&H!==void 0&&Up(C).then(q=>{let B=EA({before:H,after:q});dy(M,B),mL.delete(h),pL.delete(h)})}if(x&&k!==void 0&&k.trim().length>0){let M=$(),H=M===null?null:X({wsUrl:M.wsUrl,pairingToken:M.pairingToken});H!==null&&RA(H,k,{...h!==void 0?{sourceRunId:h}:{},lesson:xA({prompt:W,output:w})})}h!==void 0&&(Sa(e.layout,h),gL.delete(h),dL.delete(h))}},f=()=>{if(t.stopped)return;a(),c();let u=new Nc(e.wsUrl);t.socket=u,u.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),$C(X({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),FC(e.layout);let A=ve(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),h=vv({layout:e.layout,origin:A,...b!==void 0&&b.length>0?{claimToken:b}:{}});G(u,{type:"agent.register",payload:{role:"agent",hostname:vi.default.hostname(),macOsUsername:vi.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...h}},e.layout),nd(u,e.layout),BC(e,u),m(u)}),u.on("message",A=>{let b=typeof A=="string"?A:A.toString("utf8");try{let h=JSON.parse(b);if(!Z(h))return;S(h,u)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),u.on("close",(A,b)=>{s(),t.socket=void 0,t.wsConnected=!1,UA(e.layout),t.reconnectAttempt+=1;let h=typeof b=="string"?b:b.toString("utf8");tn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:h}),console.log("[agent-witch] Disconnected from server."),p()}),u.on("error",A=>{t.wakeError=A.message,tn(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return Ty(()=>{let u=xy();u!==null&&u.layout.installDir===e.layout.installDir&&u.layout.profileEmail===e.layout.profileEmail&&o(u.remoteBundleVersion,u.trigger);let A=Ry();A!==null&&r(A)}),{connect:f,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Za(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Wc(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,f()},reportHarnessManifestIfConnected:()=>{let u=t.socket;return!t.wsConnected||u===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(nd(u,e.layout),{ok:!0})}}},nZ=async()=>{Xe("agent-witch");let e=nC(),t=T();lC().ok||(process.platform==="darwin"?(await ko(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),pC(t);let o=uC({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(ir({launchAgentLabel:_e(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),ji());let n=await wS(),s=n[0];s!==void 0&&YC(s.layout);for(let f of n){let y=ve(f.wsUrl)??yt;Qi(f.layout.installDir,y)}let i=n.map(f=>oZ(f)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),Dc(),process.exit(0));let c=()=>{n.forEach((f,y)=>{let u=i[y];if(u===void 0)return;let A=ke(f.layout);BA(A,{socketOpen:u.hasMacSocketOpen(),staleAfterMs:12e4})&&u.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let f=n[0]?.layout;f!==void 0&&(St(f)||Qa(f.installDir))},m=await mC({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):kc({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let f of i)f.startLocalHealthCheck(),f.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=ar(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),$i(),d()});d=()=>{S(),m.stop(),Dc(),console.log("[agent-witch] Shutting down.");for(let f of i)f.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},sd=nZ});var yL=l(()=>{"use strict";UB()});var BB={};It(BB,{startAgentWitchClient:()=>sd});var GB=l(()=>{"use strict";yL();yL();Eo();uy();Tu();if(!Ye()&&xo(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Wu(process.argv.slice(e))),sd()}});ay();uy();Eo();Tu();var eT="20.x",tT="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var YV=e=>[`Node.js ${eT} or newer is required (found ${e}).`,tT].join(" "),rT=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${YV(process.version)}
`),process.exit(1))};var sZ=async()=>{Xe("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(zy(),Ny)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},iZ=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(r0(),t0)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},aZ=async()=>{if(!xo(Ye()?void 0:__agentWitchImportMetaUrl))return;rT();let e=process.argv.indexOf("report");e>=0&&process.exit(Wu(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await sZ();return}if(t==="wake"){await iZ();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(oI(),rI));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(AF(),SF));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(GB(),BB));await r()};aZ();
