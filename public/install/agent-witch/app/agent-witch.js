#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var PG=Object.create;var uh=Object.defineProperty;var wG=Object.getOwnPropertyDescriptor;var _G=Object.getOwnPropertyNames;var vG=Object.getPrototypeOf,kG=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var v=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},$t=(e,t)=>{for(var r in t)uh(e,r,{get:t[r],enumerable:!0})},CG=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of _G(t))!kG.call(e,n)&&n!==r&&uh(e,n,{get:()=>t[n],enumerable:!(o=wG(t,n))||o.enumerable});return e};var g=(e,t,r)=>(r=e!=null?PG(vG(e)):{},CG(t||!e||!e.__esModule?uh(r,"default",{value:e,enumerable:!0}):r,e));var xi,NC,zC,ko,ph,MZ,DC,md,Ht,dr,gd,fd,Fn,Un,ur,mh,hd,yd,Sd,Ri,St,Bn,Gn,Ad,Vr,gh,jC,qe=l(()=>{"use strict";xi={production:".agent-witch",localhost:".local-agent-witch"},NC={production:47892,localhost:47893},zC={production:"com.agent-witch",localhost:"com.local-agent-witch"},ko={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},ph="app",MZ=`${ph}/agent-witch.js`,DC=`${ph}/command`,md={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Ht=xi.production,dr=xi.localhost,gd=NC.production,fd=NC.localhost,Fn=zC.production,Un=zC.localhost,ur="profiles",mh=ko.activeProfile,hd="harness",yd="sets",Sd="manifest.json",Ri=md.projectsDir,St=md.logsDir,Bn="agent-witch.log",Gn="agent-witch.error.log",Ad=md.reportsDir,Vr=md.deviceKeypairJson,gh=ph,jC="agent-witch.js"});var $C=l(()=>{"use strict";qe()});var HC,Co,Ii,bd=l(()=>{"use strict";HC=g(require("node:path"));qe();Co=e=>HC.default.basename(e)===dr,Ii=e=>Co(e)?Un:Fn});var FC=l(()=>{"use strict";$C();bd()});var UC,fh,TG,Oi,LG,EG,BC,WG,xG,GC=l(()=>{"use strict";FC();qe();UC=g(require("node:os")),fh=g(require("node:path")),TG=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?fh.default.resolve(e):fh.default.join(UC.default.homedir(),Ht)},Oi=Ii(TG()),LG=`${Oi}-wake`,EG=`${Oi}-live`,BC=`${Oi}-watchdog`,WG=`${Oi}-automation-scheduler`,xG=`${Oi}-updater`});var qn=v(hh=>{"use strict";Object.defineProperty(hh,"__esModule",{value:!0});hh.stringify=RG;function RG(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=v(yh=>{"use strict";Object.defineProperty(yh,"__esModule",{value:!0});yh.generateTypeGuardError=IG;var qC=qn();function IG(e,t,r){return(0,qC.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,qC.stringify)(e)}) to be "${r}"`}});var Kr=v(Pd=>{"use strict";Object.defineProperty(Pd,"__esModule",{value:!0});Pd.isNonNullObject=void 0;var OG=O(),MG=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,OG.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Pd.isNonNullObject=MG});var Ft=v(ye=>{"use strict";Object.defineProperty(ye,"__esModule",{value:!0});ye.attachTypeGuardMeta=ye.isArrayTypeGuard=ye.isNestedObjectTypeGuard=ye.getTypeGuardWrapperKind=ye.getTypeGuardInnerGuard=ye.getTypeGuardItemGuard=ye.getTypeGuardSchema=void 0;var NG=e=>e.schema;ye.getTypeGuardSchema=NG;var zG=e=>e.itemGuard;ye.getTypeGuardItemGuard=zG;var DG=e=>e.innerGuard;ye.getTypeGuardInnerGuard=DG;var jG=e=>e.wrapperKind;ye.getTypeGuardWrapperKind=jG;var $G=e=>{if((0,ye.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};ye.isNestedObjectTypeGuard=$G;var HG=e=>{if((0,ye.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};ye.isArrayTypeGuard=HG;var FG=(e,t)=>Object.assign(e,t);ye.attachTypeGuardMeta=FG});var Mi=v(To=>{"use strict";Object.defineProperty(To,"__esModule",{value:!0});To.getExpectedTypeName=To.getTypeGuardDisplayName=void 0;var VC=Ft(),UG=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};To.getTypeGuardDisplayName=UG;var BG=e=>{let t=(0,VC.getTypeGuardWrapperKind)(e),r=(0,VC.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,To.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};To.getExpectedTypeName=BG});var Lo=v(wd=>{"use strict";Object.defineProperty(wd,"__esModule",{value:!0});wd.createValidationResult=void 0;var GG=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});wd.createValidationResult=GG});var Vn=v(_d=>{"use strict";Object.defineProperty(_d,"__esModule",{value:!0});_d.createValidationError=void 0;var qG=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});_d.createValidationError=qG});var Kn=v(vd=>{"use strict";Object.defineProperty(vd,"__esModule",{value:!0});vd.createTreeNode=void 0;var VG=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});vd.createTreeNode=VG});var Ni=v(kd=>{"use strict";Object.defineProperty(kd,"__esModule",{value:!0});kd.combineResults=void 0;var KG=Lo(),JG=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,KG.createValidationResult)(r,o,n)};kd.combineResults=JG});var Td=v(Cd=>{"use strict";Object.defineProperty(Cd,"__esModule",{value:!0});Cd.createSimplifiedTree=void 0;var KC=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=KC(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},YG=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=KC(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Cd.createSimplifiedTree=YG});var Di=v(Ed=>{"use strict";Object.defineProperty(Ed,"__esModule",{value:!0});Ed.validateObject=void 0;var XG=Kr(),zi=Lo(),ZG=Vn(),Ld=Kn(),QG=Ni(),JC=Wd(),e2=(e,t,r)=>{let o=()=>{let i=(0,ZG.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Ld.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,zi.createValidationResult)(!1,[],a):(0,zi.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,zi.createValidationResult)(!0,[],(0,Ld.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...u]=c,m=d,S=t[m],f=e[m],y=(0,JC.validateProperty)(m,f,S,r);return y.valid?u.length===0?(0,zi.createValidationResult)(!0,[],(0,Ld.createTreeNode)(r.path,!0,"object",e)):a(u):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,JC.validateProperty)(d,e[d],u,r)}),a=(0,QG.combineResults)(i,r.path),c=(0,Ld.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,zi.createValidationResult)(a.valid,a.errors,c)};return(0,XG.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Ed.validateObject=e2});var XC=v(Id=>{"use strict";Object.defineProperty(Id,"__esModule",{value:!0});Id.validateArray=void 0;var t2=qn(),xd=Lo(),YC=Vn(),Rd=Kn(),r2=Ni(),o2=Di(),n2=Mi(),s2=Ft(),i2=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,YC.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Rd.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,xd.createValidationResult)(!1,[c],d)}let n=(0,s2.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,m={path:u,config:r.config||null};if(n)return(0,o2.validateObject)(c,n,m);let S=t(c,null),f=(0,n2.getExpectedTypeName)(t),y=(0,t2.stringify)(c);if(S)return(0,xd.createValidationResult)(!0,[],(0,Rd.createTreeNode)(u,!0,f,c));let p=y.length>200?`Expected ${u} to be "${f}"`:`Expected ${u} (${y}) to be "${f}"`,A=(0,YC.createValidationError)(u,f,c,p),b=(0,Rd.createTreeNode)(u,!1,f,c);return b.errors=[A],(0,xd.createValidationResult)(!1,[A],b)}),i=(0,r2.combineResults)(s,o),a=(0,Rd.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,xd.createValidationResult)(i.valid,i.errors,a)};Id.validateArray=i2});var Wd=v(Md=>{"use strict";Object.defineProperty(Md,"__esModule",{value:!0});Md.validateProperty=void 0;var ZC=Lo(),a2=Vn(),QC=Kn(),l2=Mi(),Od=Ft(),c2=Di(),d2=XC(),u2=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,Od.getTypeGuardSchema)(r),c=(0,Od.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,c2.validateObject)(t,a,s);if(c&&(0,Od.isArrayTypeGuard)(r))return(0,d2.validateArray)(t,c,s)}let d=u=>{let m=r(t,u),S=(0,l2.getExpectedTypeName)(r);return m?(0,ZC.createValidationResult)(!0,[],(0,QC.createTreeNode)(n,!0,S,t)):(()=>{let f=(0,a2.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,QC.createTreeNode)(n,!1,S,t);return y.errors=[f],(0,ZC.createValidationResult)(!1,[f],y)})()};if((0,Od.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};Md.validateProperty=u2});var zd=v(Nd=>{"use strict";Object.defineProperty(Nd,"__esModule",{value:!0});Nd.isNil=void 0;var p2=O(),m2=function(e,t){return e!=null?(t&&t.callbackOnError((0,p2.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Nd.isNil=m2});var Sh=v(Dd=>{"use strict";Object.defineProperty(Dd,"__esModule",{value:!0});Dd.isDefined=void 0;var g2=O(),f2=zd(),h2=function(e,t){return(0,f2.isNil)(e,null)?(t&&t.callbackOnError((0,g2.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Dd.isDefined=h2});var Ah=v(jd=>{"use strict";Object.defineProperty(jd,"__esModule",{value:!0});jd.reportValidationResults=void 0;var y2=Td(),eT=Sh(),S2=zd(),A2=(e,t)=>{if(e.valid===!0||(0,S2.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,eT.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,y2.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,eT.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};jd.reportValidationResults=A2});var bh=v(re=>{"use strict";Object.defineProperty(re,"__esModule",{value:!0});re.Validation=re.reportValidationResults=re.validateObject=re.validateProperty=re.createSimplifiedTree=re.combineResults=re.createTreeNode=re.createValidationError=re.createValidationResult=re.getExpectedTypeName=void 0;var b2=Mi();Object.defineProperty(re,"getExpectedTypeName",{enumerable:!0,get:function(){return b2.getExpectedTypeName}});var P2=Lo();Object.defineProperty(re,"createValidationResult",{enumerable:!0,get:function(){return P2.createValidationResult}});var w2=Vn();Object.defineProperty(re,"createValidationError",{enumerable:!0,get:function(){return w2.createValidationError}});var _2=Kn();Object.defineProperty(re,"createTreeNode",{enumerable:!0,get:function(){return _2.createTreeNode}});var v2=Ni();Object.defineProperty(re,"combineResults",{enumerable:!0,get:function(){return v2.combineResults}});var k2=Td();Object.defineProperty(re,"createSimplifiedTree",{enumerable:!0,get:function(){return k2.createSimplifiedTree}});var C2=Wd();Object.defineProperty(re,"validateProperty",{enumerable:!0,get:function(){return C2.validateProperty}});var T2=Di();Object.defineProperty(re,"validateObject",{enumerable:!0,get:function(){return T2.validateObject}});var L2=Ah();Object.defineProperty(re,"reportValidationResults",{enumerable:!0,get:function(){return L2.reportValidationResults}});var E2=Lo(),W2=Ni(),x2=Vn(),R2=Kn(),I2=Wd(),O2=Di(),M2=Ah(),N2=Td();re.Validation={result:E2.createValidationResult,combine:W2.combineResults,error:x2.createValidationError,treeNode:R2.createTreeNode,property:I2.validateProperty,object:O2.validateObject,report:M2.reportValidationResults,createSimplifiedTree:N2.createSimplifiedTree}});var $d=v(Ph=>{"use strict";Object.defineProperty(Ph,"__esModule",{value:!0});Ph.isType=D2;var tT=Kr(),rT=bh(),z2=Ft();function D2(e){if(!(0,tT.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,rT.validateObject)(r,e,s);return(0,rT.reportValidationResults)(i,o||null),i.valid}return(0,tT.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,z2.attachTypeGuardMeta)(t,{schema:e})}});var iT=v(Eo=>{"use strict";Object.defineProperty(Eo,"__esModule",{value:!0});Eo.isNestedType=Eo.isShape=void 0;Eo.isSchema=ji;var oT=Kr(),nT=bh(),sT=Ft();function ji(e){if(!(0,oT.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=$2(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,nT.validateObject)(o,t,i);return(0,nT.reportValidationResults)(a,n||null),a.valid}return(0,oT.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,sT.attachTypeGuardMeta)(r,{schema:t})}function j2(e){return typeof e=="function"?e:Array.isArray(e)?H2(e):typeof e=="object"&&e!==null?ji(e):e}function $2(e){let t={};for(let[r,o]of Object.entries(e))t[r]=j2(o);return t}function H2(e){let t=e[0],r=ji(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,sT.attachTypeGuardMeta)(o,{itemGuard:r})}Eo.isShape=ji;Eo.isNestedType=ji});var aT=v(wh=>{"use strict";Object.defineProperty(wh,"__esModule",{value:!0});wh.isObjectWith=U2;var F2=$d();function U2(e){return(0,F2.isType)(e)}});var lT=v(_h=>{"use strict";Object.defineProperty(_h,"__esModule",{value:!0});_h.isObject=G2;var B2=$d();function G2(e){return(0,B2.isType)(e)}});var cT=v(vh=>{"use strict";Object.defineProperty(vh,"__esModule",{value:!0});vh.guardWithTolerance=q2;function q2(e,t,r){return t(e,r),e}});var dT=v(kh=>{"use strict";Object.defineProperty(kh,"__esModule",{value:!0});kh.isBranded=K2;var V2=O();function K2(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,V2.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var uT=v(Hd=>{"use strict";Object.defineProperty(Hd,"__esModule",{value:!0});Hd.BrandSymbols=void 0;Hd.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var pT=v(Fd=>{"use strict";Object.defineProperty(Fd,"__esModule",{value:!0});Fd.isAny=void 0;var J2=function(e){return!0};Fd.isAny=J2});var $i=v(Ch=>{"use strict";Object.defineProperty(Ch,"__esModule",{value:!0});Ch.reportTypeGuardError=X2;var Y2=O();function X2(e,t,r){e&&e.callbackOnError((0,Y2.generateTypeGuardError)(t,e.identifier,r))}});var mT=v(Ud=>{"use strict";Object.defineProperty(Ud,"__esModule",{value:!0});Ud.isBoolean=void 0;var Z2=$i(),Q2=function(t,r){return typeof t!="boolean"?((0,Z2.reportTypeGuardError)(r,t,"boolean"),!1):!0};Ud.isBoolean=Q2});var gT=v(Bd=>{"use strict";Object.defineProperty(Bd,"__esModule",{value:!0});Bd.isDate=void 0;var e5=O(),t5=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,e5.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Bd.isDate=t5});var Th=v(Gd=>{"use strict";Object.defineProperty(Gd,"__esModule",{value:!0});Gd.isNumber=void 0;var r5=$i(),o5=function(t,r){return typeof t!="number"||isNaN(t)?((0,r5.reportTypeGuardError)(r,t,"number"),!1):!0};Gd.isNumber=o5});var fT=v(qd=>{"use strict";Object.defineProperty(qd,"__esModule",{value:!0});qd.isString=void 0;var n5=$i(),s5=function(t,r){return typeof t!="string"?((0,n5.reportTypeGuardError)(r,t,"string"),!1):!0};qd.isString=s5});var hT=v(Vd=>{"use strict";Object.defineProperty(Vd,"__esModule",{value:!0});Vd.isUnknown=void 0;var i5=function(e){return!0};Vd.isUnknown=i5});var yT=v(Kd=>{"use strict";Object.defineProperty(Kd,"__esModule",{value:!0});Kd.isFunction=void 0;var a5=O(),l5=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,a5.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Kd.isFunction=l5});var AT=v(Jd=>{"use strict";Object.defineProperty(Jd,"__esModule",{value:!0});Jd.isFile=void 0;var ST=O(),c5=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,ST.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,ST.generateTypeGuardError)(e,t.identifier,"File")),!1)};Jd.isFile=c5});var PT=v(Yd=>{"use strict";Object.defineProperty(Yd,"__esModule",{value:!0});Yd.isFileList=void 0;var bT=O(),d5=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,bT.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,bT.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Yd.isFileList=d5});var _T=v(Xd=>{"use strict";Object.defineProperty(Xd,"__esModule",{value:!0});Xd.isBlob=void 0;var wT=O(),u5=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,wT.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,wT.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Xd.isBlob=u5});var kT=v(Zd=>{"use strict";Object.defineProperty(Zd,"__esModule",{value:!0});Zd.isFormData=void 0;var vT=O(),p5=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,vT.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,vT.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Zd.isFormData=p5});var TT=v(Qd=>{"use strict";Object.defineProperty(Qd,"__esModule",{value:!0});Qd.isURL=void 0;var CT=O(),m5=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,CT.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,CT.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Qd.isURL=m5});var ET=v(eu=>{"use strict";Object.defineProperty(eu,"__esModule",{value:!0});eu.isURLSearchParams=void 0;var LT=O(),g5=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,LT.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,LT.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};eu.isURLSearchParams=g5});var WT=v(tu=>{"use strict";Object.defineProperty(tu,"__esModule",{value:!0});tu.isMap=void 0;var f5=O(),h5=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,f5.generateTypeGuardError)(e,t.identifier,"Map")),!1)};tu.isMap=h5});var xT=v(ru=>{"use strict";Object.defineProperty(ru,"__esModule",{value:!0});ru.isSet=void 0;var y5=O(),S5=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,y5.generateTypeGuardError)(e,t.identifier,"Set")),!1)};ru.isSet=S5});var RT=v(Lh=>{"use strict";Object.defineProperty(Lh,"__esModule",{value:!0});Lh.isIndexSignature=b5;var A5=O();function b5(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,A5.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,u)=>{let m=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),f=t(m,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return S&&f})}}});var IT=v(ou=>{"use strict";Object.defineProperty(ou,"__esModule",{value:!0});ou.isError=void 0;var P5=$i(),w5=function(t,r){return t instanceof Error?!0:((0,P5.reportTypeGuardError)(r,t,"Error"),!1)};ou.isError=w5});var Wh=v(Eh=>{"use strict";Object.defineProperty(Eh,"__esModule",{value:!0});Eh.isArrayWithEachItem=k5;var _5=O(),v5=Ft();function k5(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,_5.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,v5.attachTypeGuardMeta)(t,{itemGuard:e})}});var xh=v(nu=>{"use strict";Object.defineProperty(nu,"__esModule",{value:!0});nu.isNonEmptyArray=void 0;var C5=O(),T5=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,C5.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};nu.isNonEmptyArray=T5});var OT=v(Rh=>{"use strict";Object.defineProperty(Rh,"__esModule",{value:!0});Rh.isNonEmptyArrayWithEachItem=W5;var L5=Wh(),E5=xh();function W5(e){return function(t,r){return(0,L5.isArrayWithEachItem)(e)(t,r)&&(0,E5.isNonEmptyArray)(t,r)}}});var NT=v(Ih=>{"use strict";Object.defineProperty(Ih,"__esModule",{value:!0});Ih.isTuple=x5;var MT=O();function x5(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,MT.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,MT.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var zT=v(Oh=>{"use strict";Object.defineProperty(Oh,"__esModule",{value:!0});Oh.isObjectWithEachItem=I5;var R5=O();function I5(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,R5.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var DT=v(Mh=>{"use strict";Object.defineProperty(Mh,"__esModule",{value:!0});Mh.isPartialOf=M5;var O5=Kr();function M5(e){return function(t,r){if(!(0,O5.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var jT=v(Nh=>{"use strict";Object.defineProperty(Nh,"__esModule",{value:!0});Nh.isPick=z5;var N5=Kr();function z5(e,...t){return function(r,o){if(!(0,N5.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var $T=v(zh=>{"use strict";Object.defineProperty(zh,"__esModule",{value:!0});zh.isOmit=j5;var D5=Kr();function j5(e,...t){return function(r,o){if(!(0,D5.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),m=u.indexOf(" ("),S=m>=0?u.slice(0,m):u;if(a.has(S))return!1;let f=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(f&&!Object.prototype.hasOwnProperty.call(r,f))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var HT=v(su=>{"use strict";Object.defineProperty(su,"__esModule",{value:!0});su.isNonEmptyString=void 0;var $5=O(),H5=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,$5.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};su.isNonEmptyString=H5});var FT=v(iu=>{"use strict";Object.defineProperty(iu,"__esModule",{value:!0});iu.isNonNegativeNumber=void 0;var F5=O(),U5=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,F5.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};iu.isNonNegativeNumber=U5});var UT=v(au=>{"use strict";Object.defineProperty(au,"__esModule",{value:!0});au.isPositiveNumber=void 0;var B5=O(),G5=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,B5.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};au.isPositiveNumber=G5});var BT=v(lu=>{"use strict";Object.defineProperty(lu,"__esModule",{value:!0});lu.isNonPositiveNumber=void 0;var q5=O(),V5=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,q5.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};lu.isNonPositiveNumber=V5});var GT=v(cu=>{"use strict";Object.defineProperty(cu,"__esModule",{value:!0});cu.isNegativeNumber=void 0;var K5=O(),J5=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,K5.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};cu.isNegativeNumber=J5});var qT=v(du=>{"use strict";Object.defineProperty(du,"__esModule",{value:!0});du.isInteger=void 0;var Y5=O(),X5=Th(),Z5=function(e,t){return!(0,X5.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Y5.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};du.isInteger=Z5});var VT=v(uu=>{"use strict";Object.defineProperty(uu,"__esModule",{value:!0});uu.isPositiveInteger=void 0;var Q5=O(),eq=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Q5.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};uu.isPositiveInteger=eq});var KT=v(pu=>{"use strict";Object.defineProperty(pu,"__esModule",{value:!0});pu.isNegativeInteger=void 0;var tq=O(),rq=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,tq.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};pu.isNegativeInteger=rq});var JT=v(mu=>{"use strict";Object.defineProperty(mu,"__esModule",{value:!0});mu.isNonNegativeInteger=void 0;var oq=O(),nq=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,oq.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};mu.isNonNegativeInteger=nq});var YT=v(gu=>{"use strict";Object.defineProperty(gu,"__esModule",{value:!0});gu.isNonPositiveInteger=void 0;var sq=O(),iq=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,sq.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};gu.isNonPositiveInteger=iq});var XT=v(hu=>{"use strict";Object.defineProperty(hu,"__esModule",{value:!0});hu.isNumeric=void 0;var fu=O(),aq=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,fu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,fu.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,fu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,fu.generateTypeGuardError)(e,t.identifier,"number key")),!1};hu.isNumeric=aq});var ZT=v(yu=>{"use strict";Object.defineProperty(yu,"__esModule",{value:!0});yu.isBooleanLike=void 0;var Dh=O(),lq=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Dh.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Dh.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};yu.isBooleanLike=lq});var QT=v(Su=>{"use strict";Object.defineProperty(Su,"__esModule",{value:!0});Su.isDateLike=void 0;var Hi=O(),cq=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Hi.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Hi.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Hi.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Hi.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Hi.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Su.isDateLike=cq});var eL=v(Au=>{"use strict";Object.defineProperty(Au,"__esModule",{value:!0});Au.isBigInt=void 0;var dq=O(),uq=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,dq.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Au.isBigInt=uq});var $h=v(jh=>{"use strict";Object.defineProperty(jh,"__esModule",{value:!0});jh.isOneOf=pq;var tL=qn();function pq(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,tL.stringify)(t)}) must be one of following values ${e.map(tL.stringify).join(" | ")}`),o}}});var rL=v(Hh=>{"use strict";Object.defineProperty(Hh,"__esModule",{value:!0});Hh.isOneOfTypes=fq;var mq=qn(),gq=Mi();function fq(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,mq.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,gq.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;a.includes(u)||a.push(u)}})),r.callbackOnError(a.join(`
`))}return n}}});var oL=v(Fh=>{"use strict";Object.defineProperty(Fh,"__esModule",{value:!0});Fh.isIntersectionOf=hq;function hq(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var nL=v(Uh=>{"use strict";Object.defineProperty(Uh,"__esModule",{value:!0});Uh.isExtensionOf=yq;function yq(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var sL=v(Bh=>{"use strict";Object.defineProperty(Bh,"__esModule",{value:!0});Bh.isNullOr=Aq;var Sq=Ft();function Aq(e){function t(r,o){return r===null?!0:e(r,o)}return(0,Sq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var iL=v(Gh=>{"use strict";Object.defineProperty(Gh,"__esModule",{value:!0});Gh.isUndefinedOr=Pq;var bq=Ft();function Pq(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,bq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var aL=v(qh=>{"use strict";Object.defineProperty(qh,"__esModule",{value:!0});qh.isNilOr=_q;var wq=Ft();function _q(e){function t(r,o){return r==null?!0:e(r,o)}return(0,wq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var lL=v(Vh=>{"use strict";Object.defineProperty(Vh,"__esModule",{value:!0});Vh.isAsserted=vq;function vq(e){return!0}});var cL=v(Kh=>{"use strict";Object.defineProperty(Kh,"__esModule",{value:!0});Kh.isEnum=Cq;var kq=$h();function Cq(e){return function(t,r){return(0,kq.isOneOf)(...Object.values(e))(t,r)}}});var dL=v(Jh=>{"use strict";Object.defineProperty(Jh,"__esModule",{value:!0});Jh.isEqualTo=Eq;var Tq=O(),Lq=qn();function Eq(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,Tq.generateTypeGuardError)(t,r.identifier,`equal to ${(0,Lq.stringify)(e)}`)),!1):!0}}});var uL=v(bu=>{"use strict";Object.defineProperty(bu,"__esModule",{value:!0});bu.isRegex=void 0;var Wq=O(),xq=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,Wq.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};bu.isRegex=xq});var mL=v(Yh=>{"use strict";Object.defineProperty(Yh,"__esModule",{value:!0});Yh.isPattern=Rq;var pL=O();function Rq(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,pL.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,pL.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var gL=v(Xh=>{"use strict";Object.defineProperty(Xh,"__esModule",{value:!0});Xh.by=Iq;function Iq(e){return function(t){return e(t,null)}}});var fL=v(Zh=>{"use strict";Object.defineProperty(Zh,"__esModule",{value:!0});Zh.toNumber=Oq;function Oq(e){return typeof e=="number"?e:Number(e)}});var hL=v(Qh=>{"use strict";Object.defineProperty(Qh,"__esModule",{value:!0});Qh.toDate=Mq;function Mq(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var yL=v(ey=>{"use strict";Object.defineProperty(ey,"__esModule",{value:!0});ey.toBoolean=Nq;function Nq(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var SL=v(Pu=>{"use strict";Object.defineProperty(Pu,"__esModule",{value:!0});Pu.isSymbol=void 0;var zq=O(),Dq=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,zq.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Pu.isSymbol=Dq});var Jn=v(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var jq=$d();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return jq.isType}});var ty=iT();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return ty.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return ty.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return ty.isNestedType}});var $q=aT();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return $q.isObjectWith}});var Hq=lT();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return Hq.isObject}});var Fq=cT();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return Fq.guardWithTolerance}});var Uq=dT();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return Uq.isBranded}});var Bq=uT();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return Bq.BrandSymbols}});var Gq=pT();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return Gq.isAny}});var qq=mT();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return qq.isBoolean}});var Vq=gT();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return Vq.isDate}});var Kq=Sh();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return Kq.isDefined}});var Jq=zd();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return Jq.isNil}});var Yq=Th();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return Yq.isNumber}});var Xq=fT();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return Xq.isString}});var Zq=hT();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return Zq.isUnknown}});var Qq=yT();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return Qq.isFunction}});var eV=AT();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return eV.isFile}});var tV=PT();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return tV.isFileList}});var rV=_T();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return rV.isBlob}});var oV=kT();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return oV.isFormData}});var nV=TT();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return nV.isURL}});var sV=ET();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return sV.isURLSearchParams}});var iV=WT();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return iV.isMap}});var aV=xT();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return aV.isSet}});var lV=RT();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return lV.isIndexSignature}});var cV=IT();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return cV.isError}});var dV=Wh();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return dV.isArrayWithEachItem}});var uV=xh();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return uV.isNonEmptyArray}});var pV=OT();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return pV.isNonEmptyArrayWithEachItem}});var mV=NT();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return mV.isTuple}});var gV=Kr();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return gV.isNonNullObject}});var fV=zT();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return fV.isObjectWithEachItem}});var hV=DT();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return hV.isPartialOf}});var yV=jT();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return yV.isPick}});var SV=$T();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return SV.isOmit}});var AV=HT();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return AV.isNonEmptyString}});var bV=FT();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return bV.isNonNegativeNumber}});var PV=UT();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return PV.isPositiveNumber}});var wV=BT();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return wV.isNonPositiveNumber}});var _V=GT();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return _V.isNegativeNumber}});var vV=qT();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return vV.isInteger}});var kV=VT();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return kV.isPositiveInteger}});var CV=KT();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return CV.isNegativeInteger}});var TV=JT();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return TV.isNonNegativeInteger}});var LV=YT();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return LV.isNonPositiveInteger}});var EV=XT();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return EV.isNumeric}});var WV=ZT();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return WV.isBooleanLike}});var xV=QT();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return xV.isDateLike}});var RV=eL();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return RV.isBigInt}});var IV=$h();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return IV.isOneOf}});var OV=rL();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return OV.isOneOfTypes}});var MV=oL();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return MV.isIntersectionOf}});var NV=nL();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return NV.isExtensionOf}});var zV=sL();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return zV.isNullOr}});var DV=iL();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return DV.isUndefinedOr}});var jV=aL();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return jV.isNilOr}});var $V=lL();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return $V.isAsserted}});var HV=cL();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return HV.isEnum}});var FV=dL();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return FV.isEqualTo}});var UV=uL();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return UV.isRegex}});var BV=mL();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return BV.isPattern}});var GV=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return GV.generateTypeGuardError}});var qV=gL();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return qV.by}});var VV=fL();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return VV.toNumber}});var KV=hL();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return KV.toDate}});var JV=yL();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return JV.toBoolean}});var YV=SL();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return YV.isSymbol}})});var Yn,AL,XV,bL,PL=l(()=>{"use strict";Yn=g(require("node:path")),AL=require("node:url"),XV=()=>!0,bL=()=>{if(XV()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Yn.default.dirname(Yn.default.resolve(e)):Yn.default.dirname(Yn.default.resolve(__filename))}return Yn.default.dirname((0,AL.fileURLToPath)(__agentWitchImportMetaUrl))}});var ry,wL,D,_L,ZV,Jr,L,wu,pr,vL,_u,Xn,vu,ve,At,oy,bt,ny,N,sy=l(()=>{"use strict";ry=g(require("node:fs")),wL=g(require("node:os")),D=g(require("node:path")),_L=g(Jn());qe();PL();bd();bd();ZV=bL(),Jr=e=>e.trim().toLowerCase(),L=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return D.default.resolve(e);let t=D.default.resolve(ZV),r=D.default.basename(t),o=D.default.basename(D.default.dirname(t));return r===gh&&(o===Ht||o===dr)?D.default.dirname(t):r===Ht||r===dr?t:D.default.join(wL.default.homedir(),Ht)},wu=(e=L())=>D.default.join(e,gh),pr=(e=L())=>D.default.join(wu(e),jC),vL=(e,t,r)=>t!==null?D.default.join(e,ur,t,r):D.default.join(e,r),_u=e=>vL(e.installDir,e.profileEmail,Ri),Xn=e=>vL(e.installDir,e.profileEmail,St),vu=e=>e.profileEmail!==null?D.default.join(e.installDir,ur,e.profileEmail,Vr):D.default.join(e.installDir,Vr),ve=(e=L())=>Ii(e),At=(e=L())=>Co(e)?fd:gd,oy=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Jr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Jr(t):null},bt=(e=L())=>{let t=D.default.join(e,mh);if(!ry.default.existsSync(t))return null;try{let r=JSON.parse(ry.default.readFileSync(t,"utf8"));if((0,_L.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Jr(r.email)}catch{return null}return null},ny=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Jr(r):null}let t=oy();return t!==null?t:bt()},N=e=>{let t=L(),r=wu(t),o=pr(t),n=ny(e);if(n!==null){let S=D.default.join(t,ur,n),f=D.default.join(S,hd),y=D.default.join(S,Ri),p=D.default.join(S,St),A=D.default.join(S,Ad),b=D.default.join(S,Vr),h=D.default.join(S,St,Bn),w=D.default.join(S,St,Gn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:p,mainLogPath:h,errorLogPath:w,reportsDir:A,deviceKeypairPath:b,configPath:D.default.join(S,"config.json"),harnessRootDir:f,harnessManifestPath:D.default.join(f,Sd),harnessSetsDir:D.default.join(f,yd)}}let s=D.default.join(t,hd),i=D.default.join(t,Ri),a=D.default.join(t,St),c=D.default.join(t,Ad),d=D.default.join(t,Vr),u=D.default.join(t,St,Bn),m=D.default.join(t,St,Gn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:u,errorLogPath:m,reportsDir:c,deviceKeypairPath:d,configPath:D.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:D.default.join(s,Sd),harnessSetsDir:D.default.join(s,yd)}}});var iy,kL,QV,eK,CL,ay,TL=l(()=>{"use strict";iy=g(require("node:fs")),kL=g(require("node:path"));qe();sy();QV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eK=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,CL=e=>{let t=kL.default.join(e,ko.wakePort);if(!iy.default.existsSync(t))return null;try{let r=JSON.parse(iy.default.readFileSync(t,"utf8"));if(QV(r)&&eK(r.wakePort))return r.wakePort}catch{return null}return null},ay=(e=L())=>CL(e)??At(e)});var X=l(()=>{"use strict";sy();TL()});var ly,cy,ku=l(()=>{"use strict";ly=new Set(["","loginwindow","_mbsetupuser","root"]),cy=5e3});var LL,sK,EL,dy,uy=l(()=>{"use strict";LL=require("node:child_process");ku();sK=e=>e.trim().toLowerCase(),EL=e=>e==null?!1:!ly.has(sK(e)),dy=()=>{if(process.platform!=="darwin")return null;try{let t=(0,LL.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return EL(t)?t:null}catch{return null}}});var xL,WL,Pt,Fi=l(()=>{"use strict";xL=g(require("node:os"));uy();WL=e=>e.trim().toLowerCase(),Pt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?dy():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??xL.default.userInfo().username;return WL(r)===WL(o)}});var RL,IL,Wo,OL=l(()=>{"use strict";RL=require("node:child_process"),IL=g(require("node:fs"));X();Fi();Wo=(e=L())=>{let t=pr(e);if(!IL.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!Pt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=bt(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,RL.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var ML,Ui,Cu=l(()=>{"use strict";ML=require("node:child_process"),Ui=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,ML.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Tu,py,NL,oe,Lu,Bi=l(()=>{"use strict";Tu=g(require("node:fs")),py=g(require("node:path"));X();qe();NL=e=>{let t=py.default.join(e,ur);return Tu.default.existsSync(t)?Tu.default.readdirSync(t).filter(r=>Tu.default.statSync(py.default.join(t,r)).isDirectory()).map(r=>Jr(r)).toSorted():[]},oe=(e=L())=>{let t=ve(e);return[{profileEmail:NL(e)[0]??null,launchAgentLabel:t}]},Lu=(e=L())=>NL(e)});var my,zL,DL,iK,mr,Eu=l(()=>{"use strict";my=g(require("node:fs")),zL=g(require("node:os")),DL=g(require("node:path"));X();Bi();iK=()=>DL.default.join(zL.default.homedir(),"Library","LaunchAgents"),mr=(e=L())=>{let t=ve(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of oe(e))r.add(n.launchAgentLabel);let o=iK();if(my.default.existsSync(o))for(let n of my.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var jL,Gi,$L=l(()=>{"use strict";X();Cu();Eu();Bi();jL=(e=L())=>{let t=new Set(oe(e).map(r=>r.launchAgentLabel));return mr(e).filter(r=>!t.has(r))},Gi=(e=L())=>{for(let t of jL(e))Ui(t)}});var qi,gy=l(()=>{"use strict";X();Cu();Eu();qi=(e=L())=>{for(let t of mr(e))Ui(t)}});var HL,FL,aK,xo,UL=l(()=>{"use strict";HL=require("node:child_process"),FL=require("node:util"),aK=(0,FL.promisify)(HL.execFile),xo=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await aK("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Ro,lK,fy,hy=l(()=>{"use strict";Ro=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lK=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,fy=e=>{let t=e.pathValue??lK(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${Ro(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${Ro(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${Ro(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${Ro(e.homeDir)}</string>
    <key>PATH</key>
    <string>${Ro(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${Ro(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${Ro(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var Wu,yy=l(()=>{"use strict";Wu=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Io,Sy,Vi,cK,dK,uK,BL,gr,Ay=l(()=>{"use strict";Io=g(require("node:fs")),Sy=g(require("node:os")),Vi=g(require("node:path"));qe();X();hy();yy();cK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),dK=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,uK=e=>{let t=Vi.default.join(e,ko.wakePort);if(!Io.default.existsSync(t))return At(e);try{let r=JSON.parse(Io.default.readFileSync(t,"utf8"));if(cK(r)&&dK(r.wakePort))return r.wakePort}catch{return At(e)}return At(e)},BL=(e,t=Sy.default.homedir())=>Vi.default.join(t,"Library","LaunchAgents",`${e}.plist`),gr=e=>{let t=e.installDir??L(),r=e.homeDir??Sy.default.homedir(),o=BL(e.launchAgentLabel,r),n=Io.default.existsSync(o)?Io.default.readFileSync(o,"utf8"):null;if(n!==null&&Wu(n))return{ok:!0,rewritten:!1,plistPath:o};let s=fy({launchAgentLabel:e.launchAgentLabel,runPath:Vi.default.join(t,DC,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??uK(t)});if(!Wu(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Io.default.mkdirSync(Vi.default.dirname(o),{recursive:!0}),Io.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var qL,VL,KL,Ki,pK,mK,GL,Ie,by=l(()=>{"use strict";qL=require("node:child_process"),VL=g(require("node:fs")),KL=require("node:util");X();Ay();Fi();Ki=(0,KL.promisify)(qL.execFile),pK=async e=>{try{return await Ki("launchctl",["print",e]),!0}catch{return!1}},mK=async(e,t,r)=>{await pK(t)&&await Ki("launchctl",["bootout",t]).catch(()=>{}),await Ki("launchctl",["bootstrap",e,r]),await Ki("launchctl",["enable",t])},GL=async e=>{try{return await Ki("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Ie=async(e,t=L())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!Pt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=gr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await GL(n))return{ok:!0};let i=s.plistPath;if(!VL.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await mK(o,n,i),await GL(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Oo,JL=l(()=>{"use strict";X();by();Bi();Oo=async(e=L())=>{let t=[];for(let r of oe(e))(await Ie(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var Qe,fr,YL=l(()=>{"use strict";gy();Fi();ku();Qe=e=>{Pt()||(qi(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},fr=(e,t=cy)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{Pt()||e()},t);return()=>{clearInterval(r)}}});var ne=l(()=>{"use strict";GC();OL();Cu();$L();gy();Eu();Fi();UL();JL();by();Ay();yy();hy();Bi();uy();ku();YL()});var Py=l(()=>{"use strict";ne()});var XL,ZL,xu,QL,Zn,eE,tE,Mo=l(()=>{"use strict";XL=".agent-witch",ZL="memory",xu="project.json",QL="chunks.ndjson",Zn="runs.ndjson",eE="reports",tE=".json"});var rE=l(()=>{"use strict";Mo()});var oE,Ru,wy=l(()=>{"use strict";oE=g(require("node:path"));rE();Ru=(e,t)=>oE.default.join(e.trim(),`${t.trim()}${tE}`)});var Ji,nE,sE=l(()=>{"use strict";Ji="agent-witch.js",nE="command"});var Iu=l(()=>{"use strict";sE()});var No,iE,aE=l(()=>{"use strict";Iu();No=e=>`'${e.replace(/'/g,"'\\''")}'`,iE=e=>{let t=`${e.installDir.trim()}/${"app"}/${Ji}`,r=[No("node"),No(t),"report","write","--key",No(e.reportKey.trim()),"--agent-run-id",No(e.agentRunId.trim()),"--status",No(e.status),"--summary",No(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",No(e.details.trim())),r.join(" ")}});var Ut,lE,gK,_y,Ou=l(()=>{"use strict";wy();aE();Ut={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},lE=e=>e===Ut.COMPLETED||e===Ut.FAILED,gK=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),_y=(e,t)=>{let r=Ru(t.reportsDir,t.reportKey),o=iE({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Ut.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${gK({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Oe=l(()=>{"use strict";qe();X()});var Xi,dE,cE,uE,fK,Qn,hK,pE,Zi,Qi,vy,mE,gE,ea=l(()=>{"use strict";Xi=g(require("node:fs")),dE=g(require("node:path"));Ou();wy();Oe();cE=50,uE=e=>{let t=N(),r=Ru(t.reportsDir,e);return Xi.default.mkdirSync(dE.default.dirname(r),{recursive:!0}),r},fK=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Qn=e=>{let t=uE(e);if(!Xi.default.existsSync(t))return null;try{let r=JSON.parse(Xi.default.readFileSync(t,"utf8"));return fK(r)?r:null}catch{return null}},hK=(e,t)=>{let r=[...e,t];return r.length>cE?r.slice(r.length-cE):r},pE=e=>{let t=uE(e.reportKey);Xi.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Zi=e=>{let t=Qn(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:hK(t?.history??[],o)};return pE(n),n},Qi=e=>{let t=Qn(e.reportKey);return t!==null?t:Zi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Ut.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},vy=(e,t)=>{let r=t.trim();if(r.length===0)return Qn(e);let o=Qn(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return pE(s),s},mE=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},gE=e=>{if(e===null||!lE(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Ut.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var yK,SK,ta,fE,Mu,ky=l(()=>{"use strict";Ou();ea();yK=new Set(Object.values(Ut)),SK=e=>yK.has(e),ta=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},fE=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Mu=e=>{if(e[0]!=="write")return fE(),1;let r=ta(e,"--key"),o=ta(e,"--agent-run-id"),n=ta(e,"--status"),s=ta(e,"--summary"),i=ta(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!SK(n)?(fE(),1):(Zi({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var et,zo=l(()=>{"use strict";et=()=>!0});var Cy,hE,Do,Nu=l(()=>{"use strict";Cy=g(require("node:path")),hE=require("node:url");zo();Do=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Cy.default.resolve(t);return et()?r===Cy.default.resolve(__filename):e===void 0?!1:r===(0,hE.fileURLToPath)(e)}});var zu,es,PK,vre,ts=l(()=>{"use strict";zu="agent-witch.js",es="deps.tar.gz",PK="install.sh",vre={mainScript:`app/${zu}`,depsArchive:`app/${es}`,installShell:PK}});var bE=l(()=>{"use strict";ts()});var PE=l(()=>{"use strict";ts();bE()});var ra,Ly,Du,wK,oa,Me,os,na,sa,jo,Ey=l(()=>{"use strict";ra=g(require("node:fs")),Ly=g(require("node:path"));PE();X();Du="install-version.json",wK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),oa=(e=L())=>Ly.default.join(e,Du),Me=(e=L())=>{let t=oa(e);if(!ra.default.existsSync(t))return null;try{let r=JSON.parse(ra.default.readFileSync(t,"utf8"));return!wK(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},os=(e,t=L())=>{let r=oa(t);ra.default.mkdirSync(Ly.default.dirname(r),{recursive:!0}),ra.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},na=(e=L())=>Me(e)?.bundleVersion??"247",sa=(e,t)=>{let r=Me(e);if(r!==null)return r;let o={bundleVersion:"247",appOrigin:t,updatedAt:new Date().toISOString()};return os(o,e),o},jo=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var wE,$o,Wy,xy,Ry,ju,Bt,Ho,Iy=l(()=>{"use strict";wE=require("node:crypto"),$o=g(require("node:fs")),Wy=g(require("node:path"));X();xy="self-update-log.ndjson",Ry=100,ju=(e=L())=>{let t=N(),r=t.installDir===e?t.logsDir:Xn({installDir:e,profileEmail:t.profileEmail});return Wy.default.join(r,xy)},Bt=(e,t=L())=>{let r={id:(0,wE.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=ju(t);$o.default.mkdirSync(Wy.default.dirname(o),{recursive:!0});let n=$o.default.existsSync(o)?$o.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Ry+1)),JSON.stringify(r)];return $o.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Ho=(e=20,t=L())=>{let r=ju(t);if(!$o.default.existsSync(r))return[];let o=$o.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var Oy,Hre,My=l(()=>{"use strict";ts();Oy="deps",Hre=`${"app"}/${es}`});var _E=l(()=>{"use strict";My()});var vE,Yr,Fo,kE,Ny,zy,CE=l(()=>{"use strict";vE=require("node:child_process"),Yr=g(require("node:fs")),Fo=g(require("node:path"));ts();My();kE=e=>Fo.default.join(e,"app",Oy),Ny=e=>{let t=Fo.default.join(e,"app"),r=Fo.default.join(t,es);Yr.default.existsSync(r)&&(Yr.default.rmSync(kE(e),{recursive:!0,force:!0}),Yr.default.mkdirSync(t,{recursive:!0}),(0,vE.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Yr.default.rmSync(r,{force:!0}))},zy=e=>{Yr.default.rmSync(Fo.default.join(e,"node_modules"),{recursive:!0,force:!0}),Yr.default.rmSync(Fo.default.join(e,"package.json"),{force:!0}),Yr.default.rmSync(Fo.default.join(e,"package-lock.json"),{force:!0})}});var TE=l(()=>{"use strict";_E();CE()});var wt,$u,LE=l(()=>{"use strict";wt="https://www.agentwitch.com",$u="wss://www.agentwitch.com/api/agent-witch/ws"});var ia,hr,EE=l(()=>{"use strict";ia="127.0.0.1",hr=`http://${ia}:43347`});var _t=l(()=>{"use strict";LE();EE()});var aa,Hu,WE,jy,_K,xE,Fy,RE,vt,la,ca,Uy,$y,Hy,da,By,Gy,qy,ns=l(()=>{"use strict";aa=g(require("node:fs")),Hu=g(require("node:path")),WE="active-writer-work.json",jy=new Set,_K=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xE=e=>e.profileEmail===null?Hu.default.join(e.installDir,WE):Hu.default.join(e.installDir,"profiles",e.profileEmail,WE),Fy=e=>{let t=xE(e);if(!aa.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(aa.default.readFileSync(t,"utf8"));return!_K(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},RE=(e,t)=>{let r=xE(e);aa.default.mkdirSync(Hu.default.dirname(r),{recursive:!0}),aa.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},vt=e=>Fy(e).activeCount>0,la=e=>{let t=Fy(e);RE(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},ca=e=>{let t=Fy(e),r=Math.max(0,t.activeCount-1);if(RE(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of jy)o()},Uy=e=>(jy.add(e),()=>{jy.delete(e)}),$y=null,Hy=null,da=e=>{$y=e},By=e=>{Hy=e},Gy=()=>{let e=$y;return $y=null,e},qy=()=>{let e=Hy;return Hy=null,e}});var ke,Fu=l(()=>{"use strict";ke=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var ss,Uu,ua,Vy=l(()=>{"use strict";ss="qwen2.5:7b",Uu="nomic-embed-text",ua="Install Ollama from https://ollama.com/download"});var pa,Ky,Bu=l(()=>{"use strict";Vy();pa=()=>`
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
    echo "Ollama is missing. ${ua}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${ua}" >&2
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
  agent_witch_ensure_ollama_model "${ss}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${Uu}" "\${pull_log}"
}
`,Ky=()=>`
${pa()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var IE,vK,Gu,Jy=l(()=>{"use strict";IE=require("node:child_process");X();Bu();vK=e=>new Promise(t=>{let r=(0,IE.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:L()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Gu=async(e=vK)=>{let t=`${pa()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var Xr,qu,OE,kK,ME,as,CK,TK,LK,is,Uo,Bo,NE=l(()=>{"use strict";Xr=g(require("node:fs")),qu=g(require("node:path"));TE();ne();X();ts();_t();Ey();ns();Fu();Iy();Jy();OE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kK=e=>{let t=bt(e),r=t===null?N():N(t);if(!Xr.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Xr.default.readFileSync(r.configPath,"utf8"));return!OE(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},ME=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!OE(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},as=async e=>(await ME(e))?.bundleVersion??null,CK=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=qu.default.join(t,r);Xr.default.mkdirSync(qu.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());Xr.default.writeFileSync(n,s),r.endsWith(".js")&&Xr.default.chmodSync(n,493)},TK=async()=>{Gi(),await Oo()},LK=(e,t)=>e!==null?ke(e):t??wt,is=(e,t)=>({localBundleVersion:t,...e}),Uo=async e=>{let t=L(),r=Me(t),o=r?.bundleVersion??null,n=await Gu();Bt({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=kK(t),i=LK(s,r?.appOrigin);if(i===null){let d=is({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return Bt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await ME(i);if(a===null){let d=is({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return Bt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||jo(o,a.bundleVersion))){let d=is({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Bt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await CK(i,t,S);let d=qu.default.join(t,zu);Xr.default.existsSync(d)&&Xr.default.rmSync(d,{force:!0}),Ny(t),zy(t),os({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=N(bt(t));if(vt(u)){let S=is({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Bt({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await TK();let m=is({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Bt({event:"update_applied",ok:!0,message:m.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}catch(d){let u=d instanceof Error?d.message:"Agent Witch self-update failed.",m=is({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},o);return Bt({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},Bo=()=>{let e=L();return{local:Me(e),logs:Ho(20,e)}}});var zE={};$t(zE,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>Du,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>ua,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Uu,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>ss,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>xy,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Ry,appendAgentWitchSelfUpdateLog:()=>Bt,buildAgentWitchEnsureOllamaShell:()=>pa,buildAgentWitchInstallScriptOllama:()=>Ky,buildAgentWitchSelfUpdateStatus:()=>Bo,ensureAgentWitchInstallVersionRecorded:()=>sa,ensureAgentWitchOllamaInstalled:()=>Gu,fetchAgentWitchRemoteInstallBundleVersion:()=>as,isRemoteAgentWitchBundleVersionNewer:()=>jo,readAgentWitchInstallVersion:()=>Me,readAgentWitchSelfUpdateLogs:()=>Ho,resolveAgentWitchAppOriginFromWsUrl:()=>ke,resolveAgentWitchHeartbeatInstallBundleVersion:()=>na,resolveAgentWitchInstallVersionPath:()=>oa,resolveAgentWitchSelfUpdateLogPath:()=>ju,runAgentWitchSelfUpdate:()=>Uo,writeAgentWitchInstallVersion:()=>os});var Gt=l(()=>{"use strict";Ey();Iy();NE();Fu();Vy();Bu();Jy()});var Yy={};$t(Yy,{buildAgentWitchSelfUpdateStatus:()=>Bo,fetchAgentWitchRemoteInstallBundleVersion:()=>as,runAgentWitchSelfUpdate:()=>Uo});var Xy=l(()=>{"use strict";Gt()});function ls(e){return(0,DE.createHash)("sha256").update(e.trim()).digest("hex")}var DE,Zy=l(()=>{"use strict";DE=require("node:crypto")});var cs,ma,EK,jE,Qy,$E=l(()=>{"use strict";cs=g(require("node:fs")),ma=g(require("node:path"));Zy();Oe();EK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jE=e=>{if(!cs.default.existsSync(e))return null;try{let t=JSON.parse(cs.default.readFileSync(e,"utf8"));return!EK(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:ls(t.pairingToken.trim())}catch{return null}},Qy=(e=L())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(jE(ma.default.join(e,"config.json")));let n=ma.default.join(e,ur);if(!cs.default.existsSync(n))return t;for(let s of cs.default.readdirSync(n)){let i=ma.default.join(n,s);cs.default.statSync(i).isDirectory()&&o(jE(ma.default.join(i,"config.json")))}return t}});var eS,HE,Vu,ga,fa,WK,xK,RK,FE,pe,me,Ku,qt,kt=l(()=>{"use strict";eS=g(require("node:fs")),HE=g(require("node:os")),Vu=g(require("node:path")),ga={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},fa=e=>e.trim().length>0,WK=e=>{let t=Vu.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},xK=()=>{let e=HE.default.homedir(),t=Vu.default.join(e,".local","bin","agent");if(eS.default.existsSync(t))return t;let r=Vu.default.join(e,".local","bin","cursor-agent");return eS.default.existsSync(r)?r:ga.cursorCommand},RK=e=>{let t=e.trim();return!fa(t)||t===ga.cursorCommand?xK():t},FE=(e,t)=>WK(e)?t:["agent",...t],pe=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",me=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:fa(t)?t.trim():ga.claudeCommand,codexCommand:fa(r)?r.trim():ga.codexCommand,cursorCommand:RK(o),antigravityCommand:fa(n)?n.trim():ga.antigravityCommand}},Ku=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:FE(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},qt=(e,t,r,o)=>{let n=t.trim();if(!fa(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:FE(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var Zr,IK,Go,OK,ds,ha=l(()=>{"use strict";Zr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,IK=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:Zr(s.inputTokens)+Zr(s.outputTokens)+Zr(s.cacheReadInputTokens)+Zr(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Go=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=Zr(a.input_tokens)+Zr(a.cache_creation_input_tokens)+Zr(a.cache_read_input_tokens),d=Zr(a.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:IK(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},OK=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),ds=(e,t)=>{let r=Go(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??OK(r)}}});var tS,MK,NK,rS,oS=l(()=>{"use strict";tS=e=>e.toLocaleString("en-US"),MK=e=>e<.01?e.toFixed(4):e.toFixed(3),NK=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${MK(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${tS(e.inputTokens)} in / ${tS(e.outputTokens)} out (${tS(e.totalTokens)} total)`,t].join(`
`)},rS=(e,t)=>{if(t===void 0)return e;let r=NK(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Ju,nS=l(()=>{"use strict";Ju={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var qo,sS,Yu,iS=l(()=>{"use strict";nS();qo="auto",sS=e=>({value:qo,label:`Auto (${Ju[e]})`}),Yu={anthropic:[sS("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[sS("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[sS("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var us,ya,Xu,ps=l(()=>{"use strict";nS();iS();us=e=>{let t=e?.trim()??"";if(!(t.length===0||t===qo))return t},ya=(e,t)=>{let r=us(t);return r===void 0?Ju[e]:r},Xu=e=>{let t=us(e);return t===void 0?qo:t}});var Zu,zK,DK,Qu,UE=l(()=>{"use strict";Zu={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},zK=e=>{let t=Zu[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Zu["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Zu["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Zu["gemini-2.0-flash"]:null},DK=(e,t,r)=>{let o=zK(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},Qu=e=>{let t=DK(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var ms,jK,$K,HK,ep,BE=l(()=>{"use strict";UE();ms=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),jK=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=ms(r.input_tokens),n=ms(r.output_tokens);return o===0&&n===0?null:Qu({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},$K=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=ms(r.prompt_tokens),n=ms(r.completion_tokens);return o===0&&n===0?null:Qu({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},HK=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=ms(r.promptTokenCount),n=ms(r.candidatesTokenCount);return o===0&&n===0?null:Qu({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},ep=(e,t,r)=>e==="anthropic"?jK(t,r):e==="openai"?$K(t,r):HK(t,r)});var FK,aS,UK,BK,GK,qK,VK,lS,cS=l(()=>{"use strict";ps();BE();FK=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},aS=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:ya(e,t.model)},UK=async e=>{let t=aS("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=FK(o);n.length>0&&e.onChunk?.(n);let s=ep("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},BK=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},GK=async e=>{let t=aS("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=BK(o);n.length>0&&e.onChunk?.(n);let s=ep("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},qK=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},VK=async e=>{let t=aS("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=qK(n);s.length>0&&e.onChunk?.(s);let i=ep("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},lS=async e=>{try{return e.provider==="anthropic"?await UK(e):e.provider==="openai"?await GK(e):await VK(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var tt,Sa=l(()=>{"use strict";tt=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var GE,KK,tp,dS=l(()=>{"use strict";GE=g(require("node:path")),KK="writer-api-secrets.json",tp=e=>GE.default.join(e,KK)});var uS,qE,JK,Qr,Ve,eo=l(()=>{"use strict";uS=g(require("node:fs"));ps();dS();qE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),JK=e=>{if(!qE(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=us(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},Qr=e=>{let t=tp(e);if(!uS.default.existsSync(t))return{};try{let r=JSON.parse(uS.default.readFileSync(t,"utf8"));if(!qE(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=JK(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Ve=(e,t)=>Qr(e)[t]??null});var Ne,Aa=l(()=>{"use strict";Ne=e=>e==="api"?"api":"cli"});var VE,Ce,Vo,yr=l(()=>{"use strict";VE=g(require("node:path"));Sa();eo();Aa();Ce=e=>VE.default.dirname(e),Vo=(e,t)=>{if(Ne(e.writerExecutionBackend)!=="api")return!1;let r=tt(t);if(r===null)return!1;let o=Ce(e.layout.configPath),n=Ve(o,r);return n!==null&&n.apiKey.length>0}});var ba,pS=l(()=>{"use strict";oS();cS();Sa();eo();yr();ba=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=tt(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Ce(e.layout.configPath),a=Ve(i,s);if(a===null){let d=Object.keys(Qr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await lS({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:rS(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var KE,gs,mS=l(()=>{"use strict";KE=require("node:child_process");kt();ha();pS();yr();gs=(e,t,r)=>new Promise(o=>{if(!pe(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Vo(e,t)){ba(e,t,r).then(o);return}let n=qt(t,r,me({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,KE.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=ds(i.join("")),u=a.join("").trim(),m=[d.output.trim(),u].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var JE=l(()=>{"use strict"});var YE=l(()=>{"use strict";oS();mS();cS();JE();eo();yr()});var XE,ZE,QE,eW=l(()=>{"use strict";XE="claude",ZE="codex",QE="cursor"});var tW,YK,gS,Pa,rp=l(()=>{"use strict";tW=g(require("node:path"));_t();qe();YK="ws://localhost:3000/api/agent-witch/ws",gS=e=>e.replace(/\/$/,""),Pa=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return gS(t);let r=tW.default.basename(e.installDir);if(r===xi.production)return $u;let o=e.configWsUrl?.trim()??"";return r===xi.localhost?o.length>0?gS(o):YK:o.length>0?gS(o):$u}});var ZK,fS,hS=l(()=>{"use strict";eW();rp();Aa();ZK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fS=e=>{if(!ZK(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Pa({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??XE,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??ZE,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??QE,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Ne(t.writerExecutionBackend),layout:e.layout}}}});var yS,SS,AS=l(()=>{"use strict";yS=g(require("node:fs"));X();hS();SS=e=>{let t=N(e);if(!yS.default.existsSync(t.configPath))return null;try{let r=JSON.parse(yS.default.readFileSync(t.configPath,"utf8")),o=fS({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var wa,rW=l(()=>{"use strict";wa=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var bS,QK,PS,oW=l(()=>{"use strict";bS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),QK=e=>{if(!bS(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!bS(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(m=>{if(!bS(m))return[];let S=typeof m.itemKey=="string"?m.itemKey.trim():"",f=typeof m.relativePath=="string"?m.relativePath:"",y=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:f,contentSha256:y}]});return u.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},PS=QK});var nW,e4,op,wS=l(()=>{"use strict";nW=g(require("node:path")),e4=(e,t)=>{let r=t.trim();return nW.default.join(e,"components","store",r.slice(0,2),r)},op=e4});var sW,t4,_S,iW=l(()=>{"use strict";sW=g(require("node:fs"));wS();t4=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=op(e.installDir,n.contentSha256);sW.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},_S=t4});var _a,fs,r4,vS,o4,kS,CS=l(()=>{"use strict";_a=g(require("node:fs")),fs=g(require("node:path"));wS();r4=(e,t)=>fs.default.join(e.installDir,"runs",t,"overlay"),vS=(e,t)=>fs.default.join(r4(e,t),".cursor"),o4=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=vS(e,t);_a.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=op(e.installDir,i.contentSha256);if(!_a.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?fs.default.join(n,c):fs.default.join(n,i.itemKey);_a.default.mkdirSync(fs.default.dirname(d),{recursive:!0}),_a.default.copyFileSync(a,d)}return{ok:!0}},kS=o4});var TS,aW,n4,va,lW=l(()=>{"use strict";TS=g(require("node:fs")),aW=g(require("node:path")),n4=(e,t)=>{let r=aW.default.join(e.installDir,"runs",t);TS.default.existsSync(r)&&TS.default.rmSync(r,{recursive:!0,force:!0})},va=n4});var s4,LS,cW=l(()=>{"use strict";CS();s4=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=vS(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},LS=s4});var ES,i4,a4,l4,c4,d4,H,dW=l(()=>{"use strict";ES=g(require("node:fs"));rp();X();Aa();i4="claude",a4="codex",l4="cursor",c4="agy",d4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H=()=>{let e=N();if(!ES.default.existsSync(e.configPath))return null;try{let t=JSON.parse(ES.default.readFileSync(e.configPath,"utf8"));if(!d4(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Pa({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Ne(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:i4,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:a4,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:l4,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:c4,pairingToken:s,layout:e}}catch{return null}}});var np,uW,pW=l(()=>{"use strict";np=g(require("node:fs"));dS();uW=(e,t)=>{let r=tp(e);np.default.mkdirSync(e,{recursive:!0}),np.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{np.default.chmodSync(r,384)}catch{}}});var ka,mW,sp=l(()=>{"use strict";ka=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},mW=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===ka(t)}});var Ca,u4,WS,xS,gW=l(()=>{"use strict";Ca=g(require("node:fs"));eo();pW();sp();ps();yr();u4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),WS=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=mW(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?us(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},xS=e=>{let t=Ce(e.configPath),r={};if(Ca.default.existsSync(e.configPath))try{let n=JSON.parse(Ca.default.readFileSync(e.configPath,"utf8"));u4(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Ca.default.mkdirSync(t,{recursive:!0}),Ca.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=WS(WS(WS(Qr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);uW(t,o)}});var ip,RS=l(()=>{"use strict";ip={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var IS,fW=l(()=>{"use strict";Sa();eo();yr();yr();IS=(e,t)=>{if(Vo(e,t))return!1;let r=tt(t);if(r===null)return!1;let o=Ce(e.layout.configPath),n=Ve(o,r);return n===null||n.apiKey.trim().length===0}});var hW,OS,MS=l(()=>{"use strict";hW=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},OS=async e=>{let t=hW(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=hW(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var p4,NS,yW=l(()=>{"use strict";ne();AS();MS();p4=1e4,NS=()=>OS({listProfileEmails:Lu,readConfig:SS,pollIntervalMs:p4,logWaiting:e=>{console.error(e)}})});var ge=l(()=>{"use strict";mS();YE();AS();rp();rW();oW();iW();CS();lW();cW();Aa();dW();gW();eo();yr();sp();ps();RS();pS();yr();fW();Sa();eo();yW();hS();MS()});var ap,SW,m4,g4,AW,lp,Ta,cp,La=l(()=>{"use strict";ap=g(require("node:fs")),SW=g(require("node:path")),m4="wake-port.json",g4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),AW=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,lp=e=>SW.default.join(e,m4),Ta=e=>{let t=lp(e);if(!ap.default.existsSync(t))return null;try{let r=JSON.parse(ap.default.readFileSync(t,"utf8"));if(g4(r)&&AW(r.wakePort))return r.wakePort}catch{return null}return null},cp=(e,t)=>{if(!AW(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=lp(e);ap.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var tie,rie,oie,Ct,bW,Ea=l(()=>{"use strict";La();Oe();La();tie=At(),rie=`${ve()}-wake`,oie=ve(),Ct=()=>{let e=L(),t=Ta(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return At()},bW=e=>{let t=L();Ta(t)===null&&cp(t,e)}});var PW=l(()=>{"use strict";Zy();ne();$E();ge();Ea()});var zS,Wa,xa,wW=l(()=>{"use strict";zS=g(require("node:os"));PW();Wa=()=>{let e=oe();return{ok:!0,port:Ct(),hostname:zS.default.hostname(),profileCount:e.length}},xa=()=>{let e=oe(),t=H()?.pairingToken.trim()??"",r=t.length>0?ls(t):null,o=Qy();return{hostname:zS.default.hostname(),port:Ct(),tokenHash:r,tokenHashes:o.length>0?o:r!==null?[r]:[],profiles:e.map(n=>({email:n.profileEmail,launchAgentLabel:n.launchAgentLabel}))}}});var DS=l(()=>{"use strict";wW()});var _W,vW,kW,dp,hs=l(()=>{"use strict";_W="materialization.json",vW="backups",kW=".gitignore",dp=e=>`harness-set:${e.trim()}`});var CW,TW,up,LW=l(()=>{"use strict";CW=g(require("node:crypto")),TW=g(require("node:fs")),up=e=>{try{let t=TW.default.readFileSync(e);return CW.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var to,Ko,f4,EW,jS,WW=l(()=>{"use strict";to=g(require("node:fs")),Ko=g(require("node:path"));LW();f4=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Ko.default.join(t,n,o);return to.default.mkdirSync(Ko.default.dirname(s),{recursive:!0}),to.default.copyFileSync(r,s),Ko.default.relative(e,s).replaceAll("\\","/")},EW=e=>{let t=Ko.default.join(e.repoRoot,e.repoRelativeDestination),r=up(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(to.default.existsSync(t)){let n=up(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=f4(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return to.default.mkdirSync(Ko.default.dirname(t),{recursive:!0}),to.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return to.default.mkdirSync(Ko.default.dirname(t),{recursive:!0}),to.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},jS=e=>{let t=up(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var $S,xW,pp,HS=l(()=>{"use strict";$S=g(require("node:fs"));hs();xW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pp=e=>{if(!$S.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse($S.default.readFileSync(e,"utf8"));if(xW(t)&&t.version===1&&xW(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var ro,mp,RW,IW=l(()=>{"use strict";ro=g(require("node:fs")),mp=g(require("node:path"));hs();RW=e=>{let t=new Set(e.setSlugs.map(s=>dp(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=mp.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=mp.default.join(e.repoRoot,i.backupPath);ro.default.existsSync(c)?(ro.default.mkdirSync(mp.default.dirname(a),{recursive:!0}),ro.default.copyFileSync(c,a),o.push(s)):ro.default.existsSync(a)&&ro.default.rmSync(a,{force:!0})}else ro.default.existsSync(a)&&ro.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var FS,gp,US=l(()=>{"use strict";FS=g(require("node:path"));hs();gp=e=>({ledgerFilePath:FS.default.join(e.metaDirPath,_W),backupsDirPath:FS.default.join(e.metaDirPath,vW)})});var BS,OW,MW=l(()=>{"use strict";BS=g(require("node:path")),OW=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return BS.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return BS.default.posix.join(s,e,n)}});var GS,NW,qS,zW=l(()=>{"use strict";GS=g(require("node:fs")),NW=g(require("node:path")),qS=(e,t)=>{GS.default.mkdirSync(NW.default.dirname(e),{recursive:!0}),GS.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var VS,h4,ct,ys=l(()=>{"use strict";VS=g(require("node:os")),h4=e=>{let t=e.trim();return t.startsWith("~/")?`${VS.default.homedir()}${t.slice(1)}`:t==="~"?VS.default.homedir():t},ct=h4});var fp,DW,y4,jW,$W=l(()=>{"use strict";fp=g(require("node:fs")),DW=g(require("node:path"));hs();Mo();y4=`*
!${xu}
`,jW=e=>{let t=DW.default.join(e,kW);fp.default.existsSync(t)||(fp.default.mkdirSync(e,{recursive:!0}),fp.default.writeFileSync(t,y4))}});var Jo,dt,Yo=l(()=>{"use strict";Jo=g(require("node:path"));Mo();ys();dt=e=>{let t=ct(e),r=Jo.default.join(t,XL);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Jo.default.join(r,"rag"),memoryDirPath:Jo.default.join(r,ZL),reportsDirPath:Jo.default.join(r,eE),metaFilePath:Jo.default.join(r,xu),ragChunksFilePath:Jo.default.join(r,"rag",QL)}}});var Vt,FW,S4,A4,rt,KS=l(()=>{"use strict";Vt=g(require("node:fs")),FW=g(require("node:path"));Mo();$W();Yo();S4=(e,t)=>{if(Vt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Vt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},A4=e=>{Vt.default.existsSync(e.ragChunksFilePath)||Vt.default.writeFileSync(e.ragChunksFilePath,"");let t=FW.default.join(e.memoryDirPath,Zn);Vt.default.existsSync(t)||Vt.default.writeFileSync(t,"")},rt=e=>{let t=dt(e.projectFolderPath);return Vt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Vt.default.mkdirSync(t.ragDirPath,{recursive:!0}),Vt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),jW(t.metaDirPath),S4(t,e),A4(t),{ok:!0,layout:t}}});var UW,BW,GW,qW,hp,yp=l(()=>{"use strict";UW="components",BW="store",GW="versions",qW="installed.json",hp=e=>`harness-set:${e.trim()}`});var JS,VW,Sp,YS=l(()=>{"use strict";JS=g(require("node:fs")),VW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Sp=e=>{if(!JS.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(JS.default.readFileSync(e,"utf8"));if(VW(t)&&t.version===1&&VW(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var Ia,Ss,Ap=l(()=>{"use strict";Ia=g(require("node:path"));yp();Ss=e=>{let t=Ia.default.join(e,UW);return{componentsRootDir:t,storeDir:Ia.default.join(t,BW),versionsDir:Ia.default.join(t,GW),installedFilePath:Ia.default.join(t,qW)}}});var XS,KW,bp,Pp,wp=l(()=>{"use strict";XS=g(require("node:crypto")),KW=g(require("node:fs")),bp=e=>XS.default.createHash("sha256").update(e,"utf8").digest("hex"),Pp=e=>{try{let t=KW.default.readFileSync(e);return XS.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var ZS,JW,YW,XW=l(()=>{"use strict";ZS=g(require("node:fs")),JW=g(require("node:path")),YW=(e,t)=>{ZS.default.mkdirSync(JW.default.dirname(e),{recursive:!0}),ZS.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var QS,eA,ZW,QW=l(()=>{"use strict";QS=g(require("node:fs")),eA=g(require("node:path")),ZW=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=eA.default.join(e,r),n=eA.default.join(o,`${t.versionId}.json`);QS.default.mkdirSync(o,{recursive:!0}),QS.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var _p,ex,tx,rx=l(()=>{"use strict";_p=g(require("node:fs")),ex=g(require("node:path"));wp();tx=e=>{let t=bp(e.content),r=ex.default.join(e.storeDir,t);return _p.default.existsSync(r)||(_p.default.mkdirSync(e.storeDir,{recursive:!0}),_p.default.writeFileSync(r,e.content)),t}});var tA,ox,b4,vp,rA=l(()=>{"use strict";tA=g(require("node:fs")),ox=g(require("node:path"));yp();YS();Ap();wp();XW();QW();rx();b4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vp=e=>{let t=Ss(e.installDir),r=hp(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!b4(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=ox.default.join(e.harnessRootDir,a);if(!tA.default.existsSync(c))continue;let d=tA.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Pp(c);if(u!==null){if(bp(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);tx({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:u})}}if(n.length===0)return;ZW(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=Sp(t.installedFilePath);YW(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var nA,oA,nx,sx=l(()=>{"use strict";nA=g(require("node:fs"));rA();YS();Ap();oA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nx=e=>{if(!nA.default.existsSync(e.harnessManifestPath))return;let t=Ss(e.installDir),r=Sp(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(nA.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!oA(o)||o.version!==1||!oA(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!oA(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];vp({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var sA,ix,ax,lx=l(()=>{"use strict";sA=g(require("node:fs")),ix=g(require("node:path")),ax=e=>{let t=e.componentId.replaceAll("/","_"),r=ix.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!sA.default.existsSync(r))return null;try{let o=JSON.parse(sA.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var kp,Cp,cx,dx=l(()=>{"use strict";kp=g(require("node:fs")),Cp=g(require("node:path"));yp();sx();lx();Ap();wp();cx=e=>{nx({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Ss(e.layout.installDir),r=hp(e.setSlug),o=ax({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Cp.default.join(t.storeDir,i.contentSha256);if(kp.default.existsSync(a)&&Pp(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Cp.default.join(e.layout.harnessRootDir,n):Cp.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!kp.default.existsSync(s))return null;try{if(!kp.default.statSync(s).isFile())return null}catch{return null}return s}});var ux,P4,w4,oo,Tp=l(()=>{"use strict";HS();US();Yo();ux="harness-set:",P4=e=>{let t=e.trim();if(!t.startsWith(ux))return null;let r=t.slice(ux.length).trim();return r.length>0?r:null},w4=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=P4(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},oo=e=>{let t=dt(e),{ledgerFilePath:r}=gp(t),o=pp(r);return w4(o)}});var Lp,iA,Oa,_4,Sr,Ma,As=l(()=>{"use strict";Lp=g(require("node:fs")),iA=g(require("node:os")),Oa=g(require("node:path")),_4=()=>Lp.default.realpathSync(Oa.default.resolve(iA.default.homedir())),Sr=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Oa.default.join(iA.default.homedir(),t.slice(1)):t,o;try{o=Lp.default.realpathSync(Oa.default.resolve(r))}catch{return null}let n=_4();return o===n||o.startsWith(`${n}${Oa.default.sep}`)?o:null},Ma=e=>{let t=Sr(e);if(t===null)return null;try{if(!Lp.default.statSync(t).isFile())return null}catch{return null}return t}});var aA,lA=l(()=>{"use strict";aA=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Wp,px,Ep,v4,Na,cA=l(()=>{"use strict";Wp=g(require("node:fs")),px=g(require("node:path"));hs();WW();HS();IW();US();MW();zW();ys();KS();dx();Tp();As();lA();Ep=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),v4=e=>{if(!Wp.default.existsSync(e))return null;try{let t=JSON.parse(Wp.default.readFileSync(e,"utf8"));if(Ep(t)&&t.version===1)return t}catch{return null}return null},Na=e=>{let t=[...new Set(e.setSlugs.map(b=>b.trim()).filter(b=>b.length>0))],r=ct(e.projectFolderPath),o=Sr(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Wp.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=rt({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=gp(s.layout),d=oo(o).filter(b=>!t.includes(b)),u=pp(i),m=0;if(d.length>0){let b=RW({repoRoot:o,setSlugs:d,ledger:u});u=b.ledger,m=b.summary.removedPaths.length}if(t.length===0)return qS(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let S=v4(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let f=Ep(S.sets)?S.sets:{},y=0,p=0,A=0;for(let b of t){let h=f[b];if(!Ep(h))return{ok:!1,errorMessage:`Harness set "${b}" is not installed locally.`};let w=typeof h.version=="number"?String(h.version):"1",_=dp(b),k=Array.isArray(h.items)?h.items:[];for(let C of k){if(!Ep(C))continue;let T=typeof C.path=="string"?C.path.trim():"";if(T.length===0)continue;let x=aA(T);if(x===null)continue;let I=OW(b,x),M=px.default.posix.join(".cursor",I).replaceAll("\\","/"),U=typeof C.id=="string"?C.id.trim():"",K=cx({layout:e.layout,setSlug:b,setVersion:typeof h.version=="number"?h.version:1,manifestItemPath:T,manifestItemId:U});if(K===null)continue;let G=EW({repoRoot:o,backupsDir:a,repoRelativeDestination:M,sourceAbsolutePath:K,componentId:_,versionId:w,ledger:u});if(G.kind==="skipped_unchanged"){p+=1;continue}if(G.kind==="backed_up_user_file"){A+=1,y+=1,u={version:1,entries:{...u.entries,[M]:jS({componentId:_,versionId:w,sourceAbsolutePath:K,backupPath:G.backupPath})}};continue}y+=1,u={version:1,entries:{...u.entries,[M]:jS({componentId:_,versionId:w,sourceAbsolutePath:K})}}}}return y===0&&p===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(qS(i,u),{ok:!0,writtenFileCount:y,skippedFileCount:p,backedUpFileCount:A,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var mx,xp,k4,C4,T4,L4,E4,W4,x4,R4,I4,za,Rp=l(()=>{"use strict";mx=g(require("node:crypto")),xp=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},k4=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},C4=(e,t)=>{let r=k4(t),o=xp(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},T4=(e,t,r)=>{let o=C4(t,r);return`shared/items/${e}/${o}`},L4=["rules","skills","commands","instructions","agents"],E4=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),W4=(e,t)=>[...e.filter(o=>o.id!==t.id),t],x4=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},R4=e=>mx.default.createHash("sha256").update(e,"utf8").digest("hex"),I4=e=>({id:e.id,kind:e.kind,title:e.title,path:T4(e.id,e.kind,e.title),contentSha256:R4(e.content)}),za=e=>{let t=new Date().toISOString(),r=e.existingManifest??E4(e.hostname,t),o=xp(e.bundle.slug),n=x4(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...L4.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let m=I4(u);return{files:[...d.files,{relativePath:m.path,content:u.content}],nextItems:W4(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var no,gx,Ip,O4,Xo,dA=l(()=>{"use strict";no=g(require("node:fs")),gx=g(require("node:os")),Ip=g(require("node:path"));Rp();O4=e=>{if(!no.default.existsSync(e))return null;try{let t=JSON.parse(no.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Xo=e=>{try{let t=O4(e.layout.harnessManifestPath),r=za({bundle:e.bundle,hostname:gx.default.hostname(),existingManifest:t});no.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)no.default.mkdirSync(Ip.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Ip.default.join(e.layout.harnessRootDir,o.relativePath);no.default.mkdirSync(Ip.default.dirname(n),{recursive:!0}),no.default.writeFileSync(n,o.content)}return no.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var uA,fx=l(()=>{"use strict";dA();cA();uA=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=Xo({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Na({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var hx,yx=l(()=>{"use strict";hx=["rule","skill","command","instruction","agent"]});var Sx,M4,N4,Kt,pA=l(()=>{"use strict";yx();Sx=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),M4=e=>typeof e=="string"&&hx.includes(e),N4=e=>{if(!Sx(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!M4(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Kt=e=>{if(!Sx(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=N4(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var Ax,z4,mA,bx=l(()=>{"use strict";Ax=require("node:zlib");pA();z4="x-agent-witch-token",mA=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[z4]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,Ax.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Kt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var fA,gA,so,Px=l(()=>{"use strict";fA=g(require("node:fs")),gA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),so=e=>{if(!fA.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(fA.default.readFileSync(e.harnessManifestPath,"utf8"));if(!gA(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=gA(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!gA(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Op,wx=l(()=>{"use strict";Op=()=>"~"});var _x,vx,kx=l(()=>{"use strict";_x=require("node:crypto"),vx=e=>`local-${(0,_x.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var hA,Cx=l(()=>{"use strict";hA=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Da,Mp,yA=l(()=>{"use strict";Da=g(require("node:path")),Mp=e=>{let t=Da.default.dirname(e),r=Da.default.basename(t);return r==="agents"?Da.default.basename(Da.default.dirname(t)):r}});var ja,Ar,Tx,D4,j4,$4,Np,Lx,SA=l(()=>{"use strict";ja=g(require("node:fs")),Ar=g(require("node:path"));kx();Cx();yA();Tx=new Set(["node_modules",".git","dist","build",".next","coverage"]),D4=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},j4=(e,t)=>{let r=Ar.default.basename(t);if(e==="skill"){let o=t.split(Ar.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},$4=e=>{let t=[],r=(n,s)=>{let i;try{i=ja.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&Tx.has(a.name))continue;let c=Ar.default.join(n,a.name),d=s?Ar.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;hA(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=Ar.default.join(e,n);ja.default.existsSync(s)&&r(s,n)}let o=Ar.default.join(e,"skills");return ja.default.existsSync(o)&&r(o,"skills"),t},Np=e=>{let t=$4(e);if(t.length===0)return null;let r=Ar.default.dirname(e),o=Mp(e),n=D4(o),s=t.map(i=>{let a=hA(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:vx(i.absolutePath),kind:a,title:j4(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},Lx=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=ja.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||Tx.has(a.name))continue;let c=Ar.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var Ex,AA,H4,bA,Wx=l(()=>{"use strict";Ex=g(require("node:fs")),AA=g(require("node:path"));SA();As();H4=e=>{let t=Sr(e.trim());if(t===null)return null;if(AA.default.basename(t)===".cursor")return t;let r=AA.default.join(t,".cursor");try{if(Ex.default.statSync(r).isDirectory())return Sr(r)}catch{return null}return null},bA=e=>{let t=H4(e.projectPath);if(t===null)return null;let r=Np(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var xx,F4,zp,PA,Rx=l(()=>{"use strict";xx=g(require("node:path"));SA();As();yA();F4=5,zp=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},PA=e=>{let t=Sr(e.scanRoot.trim());if(t===null)return zp(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of Lx(t,F4,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=Sr(s);if(i===null)continue;let a=Mp(i);zp(e.response,"folder",{cursorDir:i,groupName:a,repoPath:xx.default.dirname(i)});let c=Np(i);c!==null&&(r.push(c),zp(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return zp(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var Ix,Ox,Mx=l(()=>{"use strict";Ix=g(require("node:path")),Ox=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:Ix.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Fe,Nx,wA,U4,_A,vA,Dp,kA,$a,zx=l(()=>{"use strict";Fe=g(require("node:fs")),Nx=g(require("node:os")),wA=g(require("node:path"));Rp();rA();As();Mx();U4=e=>{if(!Fe.default.existsSync(e))return null;try{let t=JSON.parse(Fe.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},_A=e=>{let t=e.hostname??Nx.default.hostname(),r=U4(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let c=[];for(let u of a){let m=Ma(u.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let S=Fe.default.readFileSync(m,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:S,setSlugs:[i.slug]})}let d=za({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Fe.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Fe.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=wA.default.join(e.layout.harnessRootDir,i.relativePath);Fe.default.mkdirSync(wA.default.dirname(a),{recursive:!0}),Fe.default.writeFileSync(a,i.content)}Fe.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=xp(i.slug),d=r.sets[c];d!==void 0&&vp({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},vA="reveal-cache.json",Dp=(e,t)=>{Fe.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Fe.default.writeFileSync(`${e.harnessRootDir}/${vA}`,`${JSON.stringify(t,null,2)}
`)},kA=e=>{let t=`${e.harnessRootDir}/${vA}`;Fe.default.existsSync(t)&&Fe.default.unlinkSync(t)},$a=e=>{let t=`${e.harnessRootDir}/${vA}`;if(!Fe.default.existsSync(t))return null;try{let r=JSON.parse(Fe.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return Ox(r)}catch{return null}return null}});var Zo=l(()=>{"use strict";cA();fx();lA();dA();bx();pA();Rp();Px();wx();Wx();As();Rx();zx()});var CA,Dx=l(()=>{"use strict";Zo();Oe();CA=e=>{let t=N(e.profileEmail);return Xo({bundle:e.bundle,layout:t})}});var jx=l(()=>{"use strict";Dx();Zo()});var B4,$x,G4,Hx,Qo,jp,Fx=l(()=>{"use strict";B4=["agentwitch.com","www.agentwitch.com"],$x=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,G4=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},Hx=e=>{let t=G4(e);return!!(B4.includes(t)||$x.test(e.trim().toLowerCase()))},Qo=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return Hx(r)?$x.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},jp=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Qo(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Ha=l(()=>{"use strict";Fx()});var br,Fa=l(()=>{"use strict";br=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Ua,Ux=l(()=>{"use strict";jx();Ha();Fa();Ua=e=>{if(!br(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Kt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Qo(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=CA({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var TA=l(()=>{"use strict";Ux()});var q4,bs,LA=l(()=>{"use strict";q4=e=>e==="hourly"||e==="daily"||e==="weekdays",bs=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!q4(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Ba,$p,Bx,Gx,EA,Tt,Hp,Fp,Up,Bp,Gp=l(()=>{"use strict";Ba=g(require("node:fs")),$p=g(require("node:path"));LA();Bx="automations.json",Gx=e=>e.profileEmail!==null?$p.default.join(e.installDir,"profiles",e.profileEmail,Bx):$p.default.join(e.installDir,Bx),EA=()=>({version:1,automations:[]}),Tt=e=>{let t=Gx(e);if(!Ba.default.existsSync(t))return EA();try{let r=JSON.parse(Ba.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?EA():{version:1,automations:r.automations.flatMap(n=>{let s=bs(n);return s!==null?[s]:[]})}}catch{return EA()}},Hp=(e,t)=>{let r=Gx(e);Ba.default.mkdirSync($p.default.dirname(r),{recursive:!0}),Ba.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Fp=(e,t)=>{Hp(e,{version:1,automations:t})},Up=(e,t)=>{let o=Tt(e).automations.filter(n=>n.id!==t.id);Hp(e,{version:1,automations:[...o,t]})},Bp=(e,t)=>Tt(e).automations.find(r=>r.id===t)??null});var ze,Pr=l(()=>{"use strict";ze="x-agent-witch-token"});var WA=l(()=>{"use strict";Fu();Bu()});var Z,en,xA,Ga,RA,V4,IA,qa,Va,OA,Ka=l(()=>{"use strict";Pr();WA();Z=e=>{let t=ke(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},en=e=>({[ze]:e,"Content-Type":"application/json"}),xA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:en(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Ga=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:en(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},RA=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:en(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},V4=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},IA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:en(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},qa=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:en(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return V4(r)}catch{return null}},Va=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:en(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},OA=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:en(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var tn,qx,Vx,K4,MA,Kx,NA=l(()=>{"use strict";tn=g(require("node:fs")),qx=g(require("node:path")),Vx=e=>qx.default.join(e.harnessRootDir,"projects-registry.json"),K4=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),MA=e=>{let t=Vx(e);if(!tn.default.existsSync(t))return[];try{let r=JSON.parse(tn.default.readFileSync(t,"utf8"));return K4(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},Kx=e=>{let t=Vx(e);if(!tn.default.existsSync(t))return;let r=`${t}.migrated`;if(tn.default.existsSync(r)){tn.default.unlinkSync(t);return}tn.default.renameSync(t,r)}});var Jx,J4,Y4,Yx,Xx=l(()=>{"use strict";ys();Jx=e=>ct(e),J4=e=>new Set(e.map(t=>Jx(t.folderPath))),Y4=e=>new Set(e.map(t=>t.id)),Yx=(e,t)=>{let r=J4(t),o=Y4(t),n=[],s=new Set;for(let i of e){let a=Jx(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var zA,DA=l(()=>{"use strict";Ka();NA();Xx();zA=async(e,t)=>{let r=MA(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await qa(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=Yx(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await IA(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&Kx(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var jA,rn,qp=l(()=>{"use strict";jA=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),rn=(e,t)=>e.find(r=>r.id===t)??null});var Ps,Vp=l(()=>{"use strict";Ka();DA();qp();Ps=async(e,t)=>{t!==void 0&&await zA(t,e);let r=Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await qa(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=jA(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var Zx=l(()=>{"use strict"});var X4,Z4,Kp,$A=l(()=>{"use strict";X4="Default",Z4=e=>e.trim().toLowerCase()===X4.toLowerCase(),Kp=Z4});var Te,Qx,Q4,e8,t8,r8,ws,HA=l(()=>{"use strict";$A();Te=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qx=(e,t)=>e.length===0?`<p class="empty">${Te(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Te(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Te(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,Q4=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,e8=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Te(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,t8=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?e8(e.project):Q4();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${Te(o.slug)}"${t.size===0||t.has(o.slug)?" checked":""} />
            <span><strong>${Te(o.name)}</strong> <span class="muted mono">(${Te(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`<form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${Te(e.project.id)}" />
        <p class="field-label">Installed</p>
        <p class="lede">Check the sets to write into this repo&apos;s <code>.cursor</code> tree, then pull.</p>
        ${r}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`},r8=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Te(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Te(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},ws=e=>{let t=e.flashError?`<div class="alert-error">${Te(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Te(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(u,m)=>`<a class="project-tab${e.activeTab===u?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${u}">${Te(m)}</a>`,n=e.composition?.items.filter(u=>u.kind==="workflow")??[],s=e.composition?.items.filter(u=>u.kind==="agent")??[],i="";e.activeTab==="harness"?i=t8({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=Qx(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=Qx(s,"No agents installed for this project yet."):i=r8({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});let a=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}?rename=1`,c=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${Te(a)}" target="_blank" rel="noopener noreferrer">Rename in Agent Witch Cloud\u2026</a>
    </div>`,d=Kp(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from Agent Witch Cloud only. The folder on this Mac is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from Agent Witch Cloud? Your repo folder on this Mac will stay.');">
          <input type="hidden" name="projectId" value="${Te(e.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Te(e.project.name)}</h1>
      <p class="muted mono">${Te(e.project.projectFolderPath)}</p>
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
    </section>${d}`}});var o8,n8,eR,tR=l(()=>{"use strict";Zo();Pr();o8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),n8=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[ze]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!o8(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Kt(n);return s===null?[]:[s]})}catch{return null}},eR=n8});var rR,FA,oR=l(()=>{"use strict";ge();Zo();HA();Vp();tR();qp();Tp();Ka();_t();rR=e=>({kind:"page",title:e.project.name,body:ws({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:so(e.layout),linkedSetSlugs:oo(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),FA=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=H();if(r===null)return{kind:"not_found"};let o=await Ps(r,e.layout),n=rn(o.projects,t);if(n===null)return{kind:"not_found"};let s=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??wt,a=s===null?null:await eR(s,n.id);if(a===null)return rR({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=uA({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return rR({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await Va(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var s8,UA,nR=l(()=>{"use strict";s8=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,UA=s8});var sR=l(()=>{"use strict"});var iR=l(()=>{"use strict"});var aR=l(()=>{"use strict";sR();iR()});var i8,io,lR=l(()=>{"use strict";i8=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],io=(e=process.env)=>{let t={...e};for(let r of i8)delete t[r];return t}});var cR=l(()=>{"use strict";lR()});var BA,dR=l(()=>{"use strict";BA={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var GA=l(()=>{"use strict";dR()});var Jp,qA=l(()=>{"use strict";Jp={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var Yp=l(()=>{"use strict";aR();cR();_t();GA();qA()});var uR,pR,a8,Xp,Zp,mR=l(()=>{"use strict";uR=require("node:child_process"),pR=require("node:util");Yp();a8=(0,pR.promisify)(uR.execFile),Xp=async(e,t)=>{try{let{stdout:r}=await a8("git",t,{cwd:e,env:io(),maxBuffer:1048576});return r.trim()}catch{return null}},Zp=async e=>{let t=await Xp(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Xp(e,["rev-parse","--abbrev-ref","HEAD"]),o=await Xp(e,["status","--porcelain"]),n=await Xp(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var VA,gR=l(()=>{"use strict";VA=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var l8,KA,fR=l(()=>{"use strict";l8=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},KA=l8});var c8,JA,hR=l(()=>{"use strict";Pr();c8=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[ze]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},JA=c8});var yR,ao,SR=l(()=>{"use strict";yR=require("node:child_process"),ao=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,yR.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var AR=l(()=>{"use strict";Vp()});var Ja,bR=l(()=>{"use strict";Pr();Ja=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[ze]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var YA,PR=l(()=>{"use strict";Pr();YA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[ze]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var Jt=l(()=>{"use strict";Vp();qp();Zx();ys();KS();oR();Tp();nR();mR();gR();fR();hR();SR();AR();bR();PR();DA();NA();Ka()});var Qp,Ya,wR,XA,on,ZA=l(()=>{"use strict";Qp=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},Ya=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Qp(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},wR=e=>e>=1&&e<=5,XA=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Qp(t,"UTC")},on=e=>{let t=e.from??new Date,r=Qp(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Ya(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=Ya(r,e.timeZone,o,0),s=Qp(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?Ya(XA(r),e.timeZone,o,0):n;if(!i&&wR(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=XA(a),wR(a.weekday))return Ya(a,e.timeZone,o,0);return Ya(XA(r),e.timeZone,o,0)}});var _R,QA,wr,eb=l(()=>{"use strict";_R=require("node:crypto");ge();Jt();ZA();Gp();QA=!1,wr=async e=>{if(QA)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=H();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=Bp(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};QA=!0;let n=(0,_R.randomUUID)();try{let s=await gs(t,"claude-cli",o.prompt);await OA(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=on({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return Up(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{QA=!1}}});var em,vR=l(()=>{"use strict";ge();eb();Gp();em=async()=>{let e=H();if(e===null)return;let t=Tt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await wr(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var Xa=l(()=>{"use strict";Gp();vR();eb();ZA()});var kR=l(()=>{"use strict";Xa()});var CR=l(()=>{"use strict";LA()});var TR=l(()=>{"use strict";CR()});var tb=l(()=>{"use strict";Xa()});var d8,u8,Za,rb=l(()=>{"use strict";kR();TR();tb();Oe();d8=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),u8=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??on({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??on({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Za=e=>{let t=d8(e.profileEmail),r=Tt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=bs(s);return i!==null?[u8(i,o.get(i.id))]:[]});return Fp(t,n),{ok:!0,writtenCount:n.length}}});var ob=l(()=>{"use strict";Xa()});var LR=l(()=>{"use strict";ge()});var ER=l(()=>{"use strict";rb();ob();tb();LR()});var WR,Qa,el,tl,xR=l(()=>{"use strict";WR=g(require("node:os"));ER();Ha();Fa();Qa=e=>{if(!br(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Qo(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=Za({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},el=async e=>{if(!br(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Qo(t)?wr(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},tl=()=>{let e=H(),t=e!==null?Tt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:WR.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var nb=l(()=>{"use strict";xR()});var tm=l(()=>{"use strict";ne()});var rm=l(()=>{"use strict";ne()});var om,IR,OR,RR,p8,m8,_s,sb=l(()=>{"use strict";om=g(require("node:fs")),IR=g(require("node:os")),OR=g(require("node:path"));tm();rm();La();Oe();RR=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},p8=e=>OR.default.join(IR.default.homedir(),"Library","LaunchAgents",`${e}.plist`),m8=async e=>om.default.existsSync(p8(e))?(await Ie(e)).ok:!1,_s=async(e=L())=>{let t=om.default.existsSync(lp(e)),r=!om.default.existsSync(pr(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Ta(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await RR(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${ve(e)}-wake`;await m8(i)&&s.push(i);for(let c of oe(e))(await Ie(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await RR(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var MR=l(()=>{"use strict";ne()});var vs,rl=l(()=>{"use strict";vs="connection-health.json"});var nn,nm,g8,ol,Le,ib,sm,Ue,im=l(()=>{"use strict";nn=g(require("node:fs")),nm=g(require("node:path"));rl();g8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ol=e=>e.profileEmail===null?nm.default.join(e.installDir,vs):nm.default.join(e.installDir,"profiles",e.profileEmail,vs),Le=e=>{let t=ol(e);if(!nn.default.existsSync(t))return null;try{let r=JSON.parse(nn.default.readFileSync(t,"utf8"));return!g8(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},ib=e=>{let t=ol(e);nn.default.existsSync(t)&&nn.default.rmSync(t,{force:!0})},sm=(e,t)=>{let r=ol(e),o=Le(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};nn.default.mkdirSync(nm.default.dirname(r),{recursive:!0}),nn.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Ue=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var nl,NR=l(()=>{"use strict";rl();im();nl=(e,t)=>{if(!t.socketOpen)return!1;let r=Le(e);return r===null?!1:!Ue(r,t.staleAfterMs??12e4,t.nowMs)}});var ab,zR=l(()=>{"use strict";im();ab=(e,t)=>!(e!==null&&!Ue(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var ks=l(()=>{"use strict";im();NR();zR();rl()});var lb=l(()=>{"use strict";ks();ne()});var cb=l(()=>{"use strict";ks()});var db=l(()=>{"use strict";ne()});var jR,DR,sl,ub=l(()=>{"use strict";jR=g(require("node:fs"));_t();tm();rm();Oe();DR=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},sl=async(e=L())=>{if(!jR.default.existsSync(pr(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await DR())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of oe(e))(await Ie(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await DR();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var $R=l(()=>{"use strict";ne()});var HR,sn,pb,f8,h8,y8,FR,S8,UR,Cs,am=l(()=>{"use strict";HR=require("node:crypto"),sn=g(require("node:fs")),pb=g(require("node:path"));Oe();f8="watchdog-log.ndjson",h8=200,y8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),FR=(e=L())=>{let t=N(),r=t.installDir===e?t.logsDir:Xn({installDir:e,profileEmail:t.profileEmail});return pb.default.join(r,f8)},S8=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!y8(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},UR=(e,t=L())=>{let r={id:(0,HR.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=FR(t);sn.default.mkdirSync(pb.default.dirname(o),{recursive:!0});let n=sn.default.existsSync(o)?sn.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-h8+1)),JSON.stringify(r)];return sn.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Cs=(e=20,t=L())=>{let r=FR(t);if(!sn.default.existsSync(r))return[];let o=sn.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=S8(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var mb,gb,fb,hb=l(()=>{"use strict";qe();mb=ko.watchdogReinstallState,gb=900*1e3,fb=3e3});var BR=l(()=>{"use strict";hb()});var GR={};$t(GR,{verifyAgentWitchReviveAfterKickstart:()=>b8});var A8,b8,qR=l(()=>{"use strict";BR();cb();db();Oe();A8=e=>new Promise(t=>{setTimeout(t,e)}),b8=async e=>{if(await A8(e.verifyDelayMs??fb),!await xo(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),o=Le(r);return!Ue(o,e.staleAfterMs)}});var il,yb,P8,VR,KR,Sb,Ab,bb=l(()=>{"use strict";il=g(require("node:fs")),yb=g(require("node:path"));X();hb();P8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),VR=e=>yb.default.join(e,mb),KR=(e=L())=>{let t=VR(e);if(!il.default.existsSync(t))return null;try{let r=JSON.parse(il.default.readFileSync(t,"utf8"));return!P8(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},Sb=(e=L(),t=Date.now())=>{let r=KR(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=gb:!0},Ab=(e=L(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=VR(e);return il.default.mkdirSync(yb.default.dirname(o),{recursive:!0}),il.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var Pb,JR=l(()=>{"use strict";ne();bb();Pb=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!Sb())return{attempted:!1,ok:!1,targets:e};Ab();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Ie(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var YR=l(()=>{"use strict";bb();JR()});var wb=l(()=>{"use strict";Gt()});var XR=l(()=>{"use strict";Gt()});var ZR,Ts,QR,e0,t0,w8,_8,r0,v8,k8,o0,n0=l(()=>{"use strict";ZR=require("node:child_process"),Ts=g(require("node:fs")),QR=g(require("node:os")),e0=g(require("node:path")),t0=require("node:util");wb();XR();Oe();w8=(0,t0.promisify)(ZR.execFile),_8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),r0=e=>{let t=bt(e),r=t===null?N():N(t);if(!Ts.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Ts.default.readFileSync(r.configPath,"utf8"));return!_8(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},v8=e=>r0(e)?.wsUrl??null,k8=e=>{let t=v8(e);return t!==null?ke(t):Me(e)?.appOrigin??null},o0=async e=>{let t=e?.installDir??L(),r=r0(t),o=r!==null?ke(r.wsUrl):k8(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=e0.default.join(QR.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Ts.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??bt(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await w8("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Ts.default.existsSync(i)&&Ts.default.unlinkSync(i)}}});var s0={};$t(s0,{attemptAgentWitchWatchdogReinstall:()=>C8});var C8,i0=l(()=>{"use strict";YR();n0();C8=async e=>Pb(e,()=>o0())});var a0,l0,c0,T8,L8,E8,al,_b=l(()=>{"use strict";MR();lb();cb();db();ub();sb();tm();rm();Oe();ns();$R();am();a0=e=>e===null?N():N(e),l0=async(e,t,r)=>{if(!await xo(e))return"not_running";let n=a0(t);if(vt(n))return"healthy";let s=Le(n);return Ue(s,r)?"stale_connection":"healthy"},c0=async e=>{let t=e?.staleAfterMs??12e4,r=L(),o=oe(r);return Promise.all(o.map(async n=>{let s=await l0(n.launchAgentLabel,n.profileEmail,t),i=a0(n.profileEmail),a=Le(i),c=await xo(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Ue(a,t),needsRevive:s!=="healthy",reason:s}}))},T8=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},L8=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",E8=async e=>{let t=await Ie(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(qR(),GR)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},al=async e=>{if(!Pt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=L();await _s(r),await sl(r);let o=oe(r),n=[];for(let u of o){let m=await l0(u.launchAgentLabel,u.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:m});continue}n.push(await E8({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let u=Wo();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(i0(),s0)),m=await u(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&UR({event:L8(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:T8(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var d0,lm,u0=l(()=>{"use strict";d0=g(require("node:os"));lb();am();_b();lm=async()=>{let e=await c0(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:d0.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Cs(1)[0]??null}}});var vb=l(()=>{"use strict";sb();_b();u0();am()});var ll,cl,dl,p0=l(()=>{"use strict";ne();vb();ll=async()=>{await _s();let e=oe(),t=[];for(let r of e){let o=await Ie(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Wo();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},cl=al,dl=al});var kb=l(()=>{"use strict";p0()});var dm,cm,m0,Cb,g0,W8,x8,R8,I8,O8,um,f0=l(()=>{"use strict";dm=require("node:child_process"),cm=g(require("node:fs")),m0=g(require("node:os")),Cb=g(require("node:path")),g0=require("node:util");ne();X();W8=(0,g0.promisify)(dm.execFile),x8=()=>Cb.default.join(m0.default.homedir(),"Library","LaunchAgents"),R8=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await W8("launchctl",["bootout",r]).catch(()=>{})},I8=e=>{let t=Cb.default.join(x8(),`${e}.plist`);cm.default.existsSync(t)&&cm.default.unlinkSync(t)},O8=e=>{(0,dm.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},um=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=L();if(!cm.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=mr(e);for(let r of t)await R8(r),I8(r);return O8(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var h0,pm,y0,Ls,S0,M8,N8,z8,Tb,D8,Lb,A0=l(()=>{"use strict";h0=require("node:child_process"),pm=g(require("node:fs")),y0=g(require("node:os")),Ls=g(require("node:path")),S0=require("node:util");ne();M8=(0,S0.promisify)(h0.execFile),N8=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],z8=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],Tb=e=>{pm.default.existsSync(e)&&pm.default.rmSync(e,{force:!0})},D8=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await M8("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},Lb=async e=>{let r=(e.listLaunchAgentLabels??mr)(e.layout.installDir),o=e.launchAgentsDir??Ls.default.join(y0.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??D8;for(let i of r)await n(i),Tb(Ls.default.join(o,`${i}.plist`));let s=Ls.default.dirname(e.layout.configPath);for(let i of N8)Tb(Ls.default.join(s,i));for(let i of z8)Tb(Ls.default.join(e.layout.installDir,i));return pm.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var Eb,b0=l(()=>{"use strict";Eb="unknown_identity"});var Wb=l(()=>{"use strict";qA();b0()});var j8,xb,P0=l(()=>{"use strict";Wb();j8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xb=e=>e.type!=="system.error"||!j8(e.payload)?!1:e.payload.errorCode===Eb});var Rb=l(()=>{"use strict";f0();A0();P0()});var mm=l(()=>{"use strict";ne();Gt();Rb();vb()});var Es,gm,fm=l(()=>{"use strict";mm();Es=(e=20)=>Cs(e),gm=lm});var hm,Ws,ym,Sm=l(()=>{"use strict";mm();hm=Bo,Ws=(e=20)=>Ho(e),ym=e=>Uo(e)});var Am,Ib=l(()=>{"use strict";mm();Am=()=>um()});var w0=l(()=>{"use strict";DS();TA();nb();kb();fm();Sm();Ib()});var _0={};$t(_0,{buildAgentWitchAutomationStatusFromWakeServer:()=>tl,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>hm,buildAgentWitchWakeHealthResponse:()=>Wa,buildAgentWitchWakeIdentityResponse:()=>xa,buildAgentWitchWatchdogStatus:()=>gm,installHarnessFromWakeServer:()=>Ua,readAgentWitchSelfUpdateLogEntries:()=>Ws,readAgentWitchWatchdogLogEntries:()=>Es,restartAgentWitchFromWakeServer:()=>dl,reviveAgentWitchWebSocketFromWakeServer:()=>cl,runAgentWitchSelfUpdateFromWakeServer:()=>ym,runAgentWitchUninstallLocalFromWakeServer:()=>Am,runAutomationFromWakeServer:()=>el,syncAutomationsFromWakeServer:()=>Qa,wakeAgentWitchLaunchAgents:()=>ll});var v0=l(()=>{"use strict";w0()});var k0,C0,Ob,Mb,T0=l(()=>{"use strict";k0=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),C0=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?k0(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?k0(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Ob=e=>{let t=e.watchdogLogs.map(C0).join(""),r=e.updateLogs.map(C0).join("");return`<!doctype html>
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
</html>`},Mb=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var L0,E0,W0=l(()=>{"use strict";L0=g(require("node:net")),E0=()=>new Promise((e,t)=>{let r=L0.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var x0,$8,Nb,R0=l(()=>{"use strict";x0=g(require("node:net"));W0();Ea();La();Oe();$8=e=>new Promise(t=>{let r=x0.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Nb=async()=>{let e=L(),t=Ct();if(await $8(t))return bW(t),t;let r=await E0();return cp(e,r),r}});var H8,zb,I0=l(()=>{"use strict";H8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zb=e=>({force:H8(e)&&e.force===!0})});var ul=l(()=>{"use strict";Ha();T0();R0();I0();Py();Nu();zo()});var Db,j,jb,$b,pl,O0=l(()=>{"use strict";Db=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},jb=e=>{e.writeHead(403),e.end()},$b=e=>e.url?.split("?")[0]??"/",pl=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var Lt=l(()=>{"use strict";O0()});var F8,M0,N0=l(()=>{"use strict";nb();Lt();F8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},M0=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,tl(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await F8(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=Qa(t);return j(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await el(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var U8,D0,z0,j0,Hb,$0,Fb=l(()=>{"use strict";U8=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],D0=e=>/embed|minilm|^bge-/i.test(e),z0=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),j0=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),Hb=e=>e.filter(t=>t.trim().length>0&&!D0(t)),$0=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!D0(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>z0(s,o));if(n!==void 0)return n}for(let n of U8){let s=r.find(i=>z0(i,n));if(s!==void 0)return s}return r[0]??null}});var Ub,U0,B0,bm,G0,H0,F0,B8,G8,q8,V8,K8,J8,Et,ml=l(()=>{"use strict";Ub=require("node:child_process"),U0=g(require("node:fs")),B0=g(require("node:os")),bm=g(require("node:path"));Gt();kt();Fb();G0=3e3,H0=["claude-cli","codex","cursor","antigravity"],F0={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},B8=(e,t)=>new Promise(r=>{let o=(0,Ub.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},G0);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),G8=()=>{let e=B0.default.homedir();return["ollama",bm.default.join(e,".local","bin","ollama"),bm.default.join(e,".agent-witch","ollama","ollama"),bm.default.join(e,".local-agent-witch","ollama","ollama")]},q8=e=>new Promise(t=>{let r=(0,Ub.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},G0);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(j0(Buffer.concat(o).toString("utf8")))})}),V8=async()=>{for(let e of G8()){if(e!=="ollama"&&!U0.default.existsSync(e))continue;let t=await q8(e);if(t!==null)return t}return[]},K8=e=>{let t=e.installedWriterIds.map(s=>F0[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=pe(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${F0[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},J8=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:ss},Et=async e=>{let t=H0.map(i=>{let a=Ku(i,e.commands);return B8(a.command,a.args)}),[r,...o]=await Promise.all([V8(),...t]),n=H0.flatMap((i,a)=>o[a]===!0?[i]:[]),s=$0(r,J8());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:K8({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var Y8,X8,Bb,q0=l(()=>{"use strict";Y8="http://127.0.0.1:11434",X8=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Bb=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Y8;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?X8(await o.json()):null}catch{return null}}});var Gb=l(()=>{"use strict";kt();ml();q0();Fb()});var Z8,V0,K0=l(()=>{"use strict";Gb();Z8={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},V0=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:Z8[t]})),ollamaModels:Hb(e.ollamaModels)})});var Q8,J0,Y0=l(()=>{"use strict";Gb();Lt();K0();Q8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},J0=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Et({commands:me({})});return j(e.response,200,{ok:!0,...V0({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await Q8(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await Bb({model:r,prompt:o});return n===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var e3,X0,Z0=l(()=>{"use strict";TA();Lt();e3=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},X0=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await e3(e);if(t===null)return!0;let r=Ua(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var Q0=l(()=>{"use strict";Jt()});var qb,eI=l(()=>{"use strict";Q0();Fa();qb=e=>{if(!br(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:rt({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var tI,Vb,Kb=l(()=>{"use strict";ge();Jt();Fa();tI=e=>{if(!br(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},Vb=async e=>{let t=tI(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=ao("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=H();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Z({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(rt({projectFolderPath:r}),await Ja(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var rI=l(()=>{"use strict";eI();Kb()});var oI,nI=l(()=>{"use strict";rI();Kb();Lt();oI=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=qb(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await Vb(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,o,r,e.cors.headers),!0}return!1}});var sI,iI=l(()=>{"use strict";ul();Sm();fm();sI=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Es(50),r=Ws(50);return e.response.writeHead(200,Mb()),e.response.end(Ob({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var aI,lI=l(()=>{"use strict";DS();Lt();aI=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,Wa(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,xa(),e.cors.headers),!0):!1});var cI,dI=l(()=>{"use strict";Ib();Lt();cI=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Am();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var uI,pI=l(()=>{"use strict";kb();Lt();uI=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await cl();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await dl();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await ll();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var mI,gI=l(()=>{"use strict";ul();Sm();Lt();mI=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=hm();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=pl(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:Ws(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=zb(t),o=await ym({force:r});return j(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var fI,hI=l(()=>{"use strict";fm();Lt();fI=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await gm();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=pl(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:Es(t)},e.cors.headers),!0}return!1}});var yI,SI=l(()=>{"use strict";N0();Y0();Z0();nI();iI();lI();dI();pI();gI();hI();yI=[aI,sI,fI,uI,mI,cI,X0,oI,M0,J0]});var AI,bI=l(()=>{"use strict";SI();AI=async e=>{for(let t of yI)if(await t(e))return!0;return!1}});var t3,PI,wI=l(()=>{"use strict";Ha();Lt();bI();t3=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:$b(e),readJsonBody:()=>Db(e)}),PI=async(e,t,r)=>{let o=e.headers.origin,n=jp(o);try{if(o!==void 0&&o.length>0&&!n.allowed){jb(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=t3(e,t,r,n);if(await AI(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var _I,an,Pm,wm=l(()=>{"use strict";_I=g(require("node:http"));ul();wI();an=async()=>{let e=await Nb(),t=_I.default.createServer((r,o)=>{PI(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Pm=an});var vI={};$t(vI,{runAgentWitchBridgeCli:()=>r3});var r3,kI=l(()=>{"use strict";ne();wm();r3=async()=>{Qe("agent-witch-bridge");let e=await an(),t=fr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var CI=l(()=>{"use strict";_t()});var xs,Jb,TI=l(()=>{"use strict";xs=(e,t,r)=>e===1?t:r,Jb=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${xs(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${xs(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${xs(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${xs(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${xs(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${xs(u,"year","years")} ago`}});var ln,Yb,o3,n3,Xb,lo,gl,Zb,LI=l(()=>{"use strict";ln=g(require("node:fs")),Yb=g(require("node:path")),o3="local-ws-traffic.ndjson",n3=500,Xb=e=>Yb.default.join(e.logsDir,o3),lo=(e,t)=>{let r=Xb(e);ln.default.mkdirSync(Yb.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});ln.default.appendFileSync(r,`${o}
`,"utf8")},gl=(e,t=n3)=>{let r=Xb(e);if(!ln.default.existsSync(r))return[];let n=ln.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},Zb=e=>{let t=Xb(e);ln.default.existsSync(t)&&ln.default.writeFileSync(t,"","utf8")}});var s3,EI,WI,xI=l(()=>{"use strict";Wb();s3=new Set(Object.values(Jp)),EI=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),WI=e=>{if(!EI(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!s3.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!EI(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var RI,II=l(()=>{"use strict";RI=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var i3,a3,l3,fl,OI=l(()=>{"use strict";II();i3=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,a3=e=>i3.test(e),l3=e=>RI(e),fl=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>fl(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&a3(o)){r[o]=l3(n);continue}r[o]=fl(n)}return r}});var Yt,Qb,c3,d3,u3,eP,MI,NI,zI,p3,_m,cn,vm,tP,DI=l(()=>{"use strict";Yt=g(require("node:fs")),Qb=g(require("node:path"));xI();OI();c3="local-ws-trace.ndjson",d3=1e4,u3=1440*60*1e3,eP=e=>Qb.default.join(e.logsDir,c3),MI=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},NI=e=>{if(!Yt.default.existsSync(e))return;let t=Yt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-u3,n=t.filter(s=>{let i=MI(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-d3);Yt.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},zI=(e,t)=>{let r=eP(e);Yt.default.mkdirSync(Qb.default.dirname(r),{recursive:!0}),Yt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),NI(r)},p3=e=>e.parsed===null?{_empty:!0}:fl(e.parsed),_m=(e,t,r)=>{let o=WI(r);zI(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:p3(o)})},cn=(e,t)=>{zI(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:fl({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},vm=(e,t=80)=>{let r=eP(e);if(NI(r),!Yt.default.existsSync(r))return[];let o=Yt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=MI(s);i!==null&&n.push(i)}return n.reverse()},tP=e=>{let t=eP(e);Yt.default.existsSync(t)&&Yt.default.writeFileSync(t,"","utf8")}});var co,jI,m3,rP,km,$I=l(()=>{"use strict";co=g(require("node:fs")),jI=g(require("node:path")),m3=256e3,rP=e=>{co.default.mkdirSync(jI.default.dirname(e),{recursive:!0}),co.default.writeFileSync(e,"","utf8")},km=(e,t=m3)=>{if(!co.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=co.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=co.default.openSync(e,"r");try{co.default.readSync(a,i,0,s,n)}finally{co.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var hl=l(()=>{"use strict";LI();DI();$I()});var oP,nP,HI=l(()=>{"use strict";oP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nP=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${oP(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${oP(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${oP(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var FI=l(()=>{"use strict";HI()});var sP,iP=l(()=>{"use strict";sP=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var aP=l(()=>{"use strict";rl()});var lP,cP,UI=l(()=>{"use strict";aP();lP=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},cP=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var BI=l(()=>{"use strict";iP();UI()});var GI,yl,dP,Sl=l(()=>{"use strict";iP();GI=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yl=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=GI(e),r=GI(sP(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},dP=`(function () {
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
})();`});var dn,g3,uP,qI=l(()=>{"use strict";dn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g3=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},uP=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${dn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?dn(r.direction):dn(r.kind),i=`trace-body-${o}`,a=dn(g3(r.body));return`<tr>
        <td title="${dn(r.at)}">${dn(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${dn(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var KI,f3,VI,pP,JI=l(()=>{"use strict";qe();_t();KI=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},f3=e=>KI(e)===dr?Un:Fn,VI=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pP=e=>{let t=f3(e.installDir),o=`AW_HOME="$HOME/${KI(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${VI(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${VI(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var YI=l(()=>{"use strict";Sl();qI();JI();Sl()});var h3,_r,Al=l(()=>{"use strict";h3=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),_r=h3});var XI,ZI,QI,eO,tO,rO,oO,Rs=l(()=>{"use strict";XI="projects",ZI="knowledge",QI="chunks.ndjson",eO="lessons.ndjson",tO="error-chunks.ndjson",rO="usage-stats.json",oO="knowledge-location.json"});var Cm,y3,Tm,mP=l(()=>{"use strict";Cm=g(require("node:path"));Rs();y3=(e,t)=>{let r=t.trim(),o=Cm.default.join(e.installDir,XI,r,ZI);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:Cm.default.join(o,QI),memoryRunsFilePath:Cm.default.join(o,eO)}},Tm=y3});var gP,S3,nO,sO=l(()=>{"use strict";gP=g(require("node:fs"));Rs();Yo();S3=e=>{let t=dt(e.projectFolderPath),r=`${t.metaDirPath}/${oO}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};gP.default.mkdirSync(t.metaDirPath,{recursive:!0}),gP.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},nO=S3});var Is,aO,iO,A3,lO,cO=l(()=>{"use strict";Is=g(require("node:fs")),aO=g(require("node:path"));Mo();Yo();mP();sO();iO=(e,t)=>{Is.default.existsSync(e)&&(Is.default.existsSync(t)&&Is.default.statSync(t).size>0||(Is.default.mkdirSync(aO.default.dirname(t),{recursive:!0}),Is.default.copyFileSync(e,t)))},A3=e=>{let t=dt(e.projectFolderPath),r=Tm(e.layout,e.projectId),o=`${t.memoryDirPath}/${Zn}`;iO(t.ragChunksFilePath,r.ragChunksFilePath),iO(o,r.memoryRunsFilePath),nO({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},lO=A3});var fP,b3,dO,uO=l(()=>{"use strict";fP=g(require("node:fs"));Yo();b3=e=>{let t=dt(e);if(!fP.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(fP.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},dO=b3});var pO,P3,Os,Lm=l(()=>{"use strict";pO=g(require("node:path"));Mo();Yo();cO();uO();mP();P3=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=dO(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){lO({layout:e.layout,projectFolderPath:t,projectId:o});let s=Tm(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=dt(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:pO.default.join(n.memoryDirPath,Zn),projectId:null}},Os=P3});var Em,_3,Wm,hP=l(()=>{"use strict";Em=g(require("node:fs"));Rs();_3=(e,t=500)=>{if(!Em.default.existsSync(e))return;let r=Em.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Em.default.writeFileSync(e,`${o.join(`
`)}
`)},Wm=_3});var xm,v3,un,yP=l(()=>{"use strict";xm=g(require("node:path"));Rs();Lm();v3=e=>{let t=Os(e);if(t===null)return null;let r=xm.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:xm.default.join(r,rO),errorChunksFilePath:xm.default.join(r,tO)}},un=v3});var gO,bl,fO,mO,SP,hO,T3,AP,yO,bP,PP,wP,_P=l(()=>{"use strict";gO=require("node:crypto"),bl=g(require("node:fs")),fO=g(require("node:path"));Al();Rs();yP();mO=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),SP=e=>{if(!bl.default.existsSync(e))return mO();try{let t=JSON.parse(bl.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return mO()},hO=(e,t)=>{bl.default.mkdirSync(fO.default.dirname(e),{recursive:!0}),bl.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},T3=e=>{let t=_r(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,gO.createHash)("sha256").update(o).digest("hex").slice(0,16)},AP=e=>{let t=un(e);return t===null?null:SP(t.usageStatsFilePath)},yO=e=>{if(e.chunkIds.length===0)return;let t=un(e);if(t===null)return;let r=SP(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;hO(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},bP=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=un(e);if(r===null)return null;let o=T3(t),n=SP(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return hO(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},PP=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,wP=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var Pl,SO,L3,E3,AO,W3,vP,wl,Ms,kP,Ns,CP,TP=l(()=>{"use strict";Pl=g(require("node:fs")),SO=g(require("node:path"));Al();Lm();hP();_P();L3="http://127.0.0.1:11434",E3="nomic-embed-text",AO=(e,t,r)=>Os({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,W3=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},vP=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},wl=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||L3,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||E3;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},Ms=(e,t,r)=>{let o=AO(e,t,r);if(o===null||!Pl.default.existsSync(o))return[];let n=Pl.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},kP=async e=>{let t=_r(e.text),r=vP(t);if(r.length===0)return 0;let o=AO(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;Pl.default.mkdirSync(SO.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await wl(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Pl.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return Wm(o),n},Ns=async e=>{let t=await wl(e.query);if(t===null)return[];let r=e.minScore??0,s=Ms(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:W3(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return yO({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},CP=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var _l,bO,x3,R3,LP,EP,WP,PO=l(()=>{"use strict";_l=g(require("node:fs")),bO=g(require("node:path"));Al();yP();hP();TP();x3=e=>{if(!_l.default.existsSync(e))return[];let t=_l.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},R3=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},LP=async e=>{let t=un(e);if(t===null)return 0;let r=_r(e.text),o=vP(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;_l.default.mkdirSync(bO.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await wl(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};_l.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Wm(n,200),s},EP=async e=>{let t=un(e);if(t===null)return[];let r=await wl(e.query);if(r===null)return[];let o=e.minScore??.3;return x3(t.errorChunksFilePath).map(s=>({chunk:s,score:R3(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},WP=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var xP=l(()=>{"use strict";TP();_P();PO()});var Se,RP,IP=l(()=>{"use strict";GA();Se=BA,RP=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${Se.gray50};
  --aw-zinc-100: ${Se.gray100};
  --aw-zinc-200: ${Se.gray200};
  --aw-zinc-400: ${Se.gray400};
  --aw-zinc-500: ${Se.gray500};
  --aw-zinc-600: ${Se.gray600};
  --aw-zinc-700: ${Se.gray700};
  --aw-zinc-800: ${Se.gray900};
  --aw-zinc-900: ${Se.gray900};
  --aw-brand-600: ${Se.brand600};
  --aw-brand-700: ${Se.brand700};
  --aw-brand-50: ${Se.brand50};
  --aw-emerald-50: ${Se.success50};
  --aw-emerald-700: ${Se.success700};
  --aw-amber-50: ${Se.warning50};
  --aw-amber-900: ${Se.warning900};
  --aw-red-50: ${Se.error50};
  --aw-red-700: ${Se.error700};
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
`.trim()});var I3,O3,OP,wO,MP,_O=l(()=>{"use strict";IP();Sl();I3=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,O3=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],OP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wO=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${I3}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,MP=e=>{let t=O3.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=OP(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=OP(e.installBundleVersionLabel?.trim()??"unknown"),s=wO("brand brand-in-sidebar",n),i=wO("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${OP(e.title)} \xB7 Agent Witch Local</title>
  <style>${RP}</style>
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
  <script>${dP}</script>
</body>
</html>`}});var Rm,vl,Im=l(()=>{"use strict";Rm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vl=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Rm(e.syncMessage)}</p>`:"",o=Rm(e.manageHref),n=Rm(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Rm(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var NP,zP,DP,vO=l(()=>{"use strict";NP=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,zP=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,DP=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var kO=l(()=>{"use strict";_O();Im();vO()});var zs,jP,CO=l(()=>{"use strict";Sl();zs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jP=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${zs(e.wakeError)}</div>`:"",a=yl(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${zs(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${zs(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${zs(o)}</p>
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
        <p class="home-card-meta">${zs(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${zs(n)}</p>
      </a>
    </div>`}});var TO=l(()=>{"use strict";CO()});var E,Ds=l(()=>{"use strict";E=e=>e==="passed"||e==="stopped"||e==="failed"});var LO,$P,pn,HP,Om=l(()=>{"use strict";LO="Stopped at the round limit. The best prompt is kept.",$P="Stopped because the score stopped rising. The best prompt is kept.",pn="Finished. The best prompt is the result.",HP="Wizard ended. Progress from finished steps is kept."});var uo,FP=l(()=>{"use strict";uo=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var M3,N3,kl,EO,Mm=l(()=>{"use strict";M3=/\n+|;\s+/,N3=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,kl=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(M3).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,N3(s)]},[]);return[...t,...o]},[]),EO=e=>{let t=kl(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ae,js=l(()=>{"use strict";ae=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Cl,UP=l(()=>{"use strict";Mm();js();Cl=e=>{let t=[...e.priorRounds,e.current],r=ae(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:EO(o)}}});var BP,z3,D3,Nm,GP=l(()=>{"use strict";BP={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},z3=e=>{try{let t=JSON.parse(e.fragment);return{...BP,objects:[...e.objects,t]}}catch{return{...BP,objects:e.objects}}},D3=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:z3(r)},Nm=e=>[...e].reduce(D3,BP).objects});var j3,qP,$3,WO,VP=l(()=>{"use strict";GP();j3=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},qP=e=>{let t=Nm(e).filter(j3),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},$3=(e,t)=>({...e,passed:e.score>=t}),WO=(e,t)=>{let r=qP(e);return r===null?null:$3(r,t)}});var KP,JP,zm=l(()=>{"use strict";KP="The judge reply needs a score and a reason.",JP="The improver reply was empty."});var xO,RO=l(()=>{"use strict";xO=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var IO,OO=l(()=>{"use strict";IO=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var F3,MO,NO=l(()=>{"use strict";RO();OO();Om();Mm();F3=e=>{let t=kl(e);return t.length===0?$P:`${$P} Avoid: ${t.join("; ")}.`},MO=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:LO};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(xO(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:F3(IO(r))}}return null}});var po,U3,mn,zO,Dm=l(()=>{"use strict";po=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},U3=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,mn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",U3(e.tokens),`Delay: ${po(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},zO=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var B3,DO,jO=l(()=>{"use strict";VP();B3=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,DO=e=>{let r=(B3.exec(e)?.[1]??e).trim();return r.length===0||qP(r)!==null?null:r}});var $O,jm,HO=l(()=>{"use strict";Dm();jO();zm();$O=e=>({type:"call",role:"judge",choice:e.choice,prompt:zO({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),jm=e=>{let t=DO(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:JP}}:{nextPrompt:t,continuation:$O({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var YP,FO=l(()=>{"use strict";FP();UP();VP();zm();Om();NO();zm();HO();YP=e=>{let t=WO(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:KP}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=MO({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=Cl({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:uo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var Tl,XP=l(()=>{"use strict";Tl=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var UO=l(()=>{"use strict"});var BO=l(()=>{"use strict";UO()});var gn,GO=l(()=>{"use strict";gn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var G3,ZP,qO=l(()=>{"use strict";Dm();G3=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,ZP=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",G3(e.tokens),`Delay: ${po(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var q3,V3,K3,QP,VO=l(()=>{"use strict";q3=/[A-Za-z0-9_./~-]{3,180}/g,V3=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,K3=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||V3.test(t)},QP=(e,t=12)=>{let r=[];for(let o of e.matchAll(q3)){let n=o[0].replace(/\.+$/,"");if(!(!K3(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var Ll,KO=l(()=>{"use strict";Ll=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var $m,ew,JO,El,tw=l(()=>{"use strict";$m=e=>Math.floor(e/2),ew=e=>Math.max($m(e)+1,e-20),JO=(e,t)=>e>=t?"passes":e>=ew(t)?"close":e>=$m(t)?"weak":"bad",El=e=>[{band:"bad",label:`0\u2013${$m(e)-1} bad`},{band:"weak",label:`${$m(e)}\u2013${ew(e)-1} weak`},{band:"close",label:`${ew(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var Hm,rw=l(()=>{"use strict";tw();Hm=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${JO(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var Wt,ow=l(()=>{"use strict";Wt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var YO,XO=l(()=>{"use strict";YO=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var J3,Y3,ZO,QO=l(()=>{"use strict";Ds();rw();ow();XO();J3=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],Y3=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",ZO=e=>{let t=e.wizard;if(t===void 0)return[];let r=Wt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=J3.map((f,y)=>{let p=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:f,state:p,detail:null}}).filter((f,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=Hm(e),d=c.filter(f=>f.id==="round-0"),u=YO(t)&&(!n||a)?c.filter(f=>f.id!=="round-0"):[],m=E(e.status)&&!s,S=m?[{id:"end",label:Y3(e),state:"done",detail:e.errorMessage}]:[];if(m&&S.length>0){let f=Math.min(r,i.length),y=i.slice(0,f).map(p=>({...p,state:"done"}));return[...d,...y,...S,...u]}return[...d,...i,...u,...S]}});var X3,nw,eM=l(()=>{"use strict";Ds();rw();QO();X3=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",nw=e=>{if(e.wizard!==void 0)return ZO(e);let t=Hm(e),r=E(e.status)?[{id:"end",label:X3(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var Wl,tM=l(()=>{"use strict";Wl=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var rM=l(()=>{"use strict";_t()});var oM,xl,Rl,Hs,Fm,sw,nM=l(()=>{"use strict";rM();oM="/prompt-optimizer/agent",xl=`${hr}${oM}`,Rl=`${hr}/prompt-optimizer`,Hs="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",Fm=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Hs}`,sw="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var Xt=l(()=>{"use strict"});var se,Il=l(()=>{"use strict";Xt();se=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var iw,sM=l(()=>{"use strict";iw="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var iM,aM=l(()=>{"use strict";iM=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Ol,cM=l(()=>{"use strict";aM();Xt();Ol=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:iM(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null})});var aw,dM=l(()=>{"use strict";Xt();aw=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null})});var lw,uM=l(()=>{"use strict";Xt();lw=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var pM,Ml,mM=l(()=>{"use strict";pM=["generalize","evaluate","separate","optimize_modules"],Ml=(e,t)=>{let r=pM.indexOf(t);if(r===-1)return e;let o=pM.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var Um,cw=l(()=>{"use strict";Mm();Um=e=>{let t=kl(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Nl,gM=l(()=>{"use strict";cw();Nl=e=>{let t=Um(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var Q3,e6,t6,fM,hM=l(()=>{"use strict";Q3=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),e6=/^\{\{[a-zA-Z0-9_-]+\}\}$/,t6=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(Q3(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},fM=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>e6.test(n)?n:t6(n,r)).join("")}});var dw,yM=l(()=>{"use strict";hM();dw=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:fM(o.prompt,t)}))}))});var r6,zl,SM=l(()=>{"use strict";Xt();cw();r6=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),zl=e=>{let t=Um(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=r6(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Dl,AM=l(()=>{"use strict";XP();Dl=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return Tl({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var jl,pw=l(()=>{"use strict";js();jl=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ae(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var mw,bM=l(()=>{"use strict";pw();mw=e=>{let t=jl({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var fn,PM=l(()=>{"use strict";fn=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var o6,n6,te,Bm=l(()=>{"use strict";Il();o6=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},n6=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,te=e=>{let t=se(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:o6(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>n6(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var wM,_M=l(()=>{"use strict";Il();Bm();wM=e=>{let t=te(e.wizard),r=se(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var gw,vM=l(()=>{"use strict";_M();gw=e=>{let t=wM({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var s6,kM,CM=l(()=>{"use strict";s6=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},kM=e=>[...e].reduce(s6,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var i6,TM,LM=l(()=>{"use strict";i6=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},TM=e=>[...e].reduce(i6,{out:"",inString:!1,escaped:!1}).out});var a6,l6,EM,WM=l(()=>{"use strict";CM();LM();a6=e=>e.charCodeAt(0)===65279?e.slice(1):e,l6=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},EM=e=>TM(kM(l6(a6(e))))});var c6,d6,u6,xM,p6,Fs,Gm=l(()=>{"use strict";GP();WM();c6=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},d6=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},u6=e=>[...e].reduce(d6,{out:"",inString:!1,escaped:!1}).out,xM=e=>{let t=Nm(e);return t.length===0?null:t[t.length-1]},p6=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Fs=e=>{let t=EM(c6(e)),r=xM(t);if(r!==null)return r;let o=u6(t),n=xM(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw p6(i)}}});var m6,g6,fw,RM,IM=l(()=>{"use strict";m6=/^[a-z0-9][a-z0-9-]{0,62}$/,g6=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return m6.test(t)?t:""},fw=e=>e.replace(/\s+/gu," ").trim(),RM=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=g6(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=fw(n.name),a=fw(n.description),c=fw(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var OM,MM,NM=l(()=>{"use strict";OM=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},MM=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var hw,zM=l(()=>{"use strict";Gm();IM();NM();hw=(e,t)=>{let r=(()=>{try{return Fs(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(OM(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(MM).filter(a=>a!==null),i=RM({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var yw,DM=l(()=>{"use strict";yw=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var Sw,jM=l(()=>{"use strict";Sw=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var Aw,$M=l(()=>{"use strict";Il();Bm();Aw=e=>{let t=te(e.wizard),r=se(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var $l,HM=l(()=>{"use strict";$l=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var xt,f6,bw,FM=l(()=>{"use strict";xt=g(Jn());Gm();f6=(0,xt.isType)({name:xt.isNonEmptyString,description:xt.isString,sampleValue:xt.isString}),bw=e=>{let t=Fs(e);if(!(0,xt.isType)({templatedPrompt:xt.isNonEmptyString,variables:(0,xt.isArrayWithEachItem)(f6)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var le,h6,y6,Pw,UM=l(()=>{"use strict";le=g(Jn());Xt();Gm();h6=(0,le.isType)({id:le.isNonEmptyString,title:le.isNonEmptyString,prompt:le.isNonEmptyString,order:le.isNumber}),y6=(0,le.isType)({id:le.isNonEmptyString,title:le.isNonEmptyString,summary:le.isString,topology:(0,le.isOneOf)("chain","parallel"),modules:(0,le.isArrayWithEachItem)(h6),recommended:le.isBoolean}),Pw=e=>{let t=Fs(e);if(!(0,le.isType)({options:(0,le.isArrayWithEachItem)(y6)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Us,BM=l(()=>{"use strict";Us=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var S6,ww,_w=l(()=>{"use strict";S6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,ww=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(S6,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Rt,It,GM=l(()=>{"use strict";js();_w();Rt=e=>ww(e.templatedPrompt,e.variables),It=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ae(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Rt(e.wizard)}});var A6,hn,qM=l(()=>{"use strict";A6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,hn=(e,t)=>e.replace(A6,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var b6,yn,qm=l(()=>{"use strict";b6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,yn=e=>{let t=new Set,r=[];for(let o of e.matchAll(b6)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Hl,VM=l(()=>{"use strict";qm();Hl=e=>e.variables.length>0||yn(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var vw,kw=l(()=>{"use strict";Xt();vw=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Fl,KM=l(()=>{"use strict";js();kw();Fl=e=>{let t=e.wizard.evaluateSelectedRound??ae(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:vw(r.judgement,e.passScore)}});var Ul,JM=l(()=>{"use strict";Ul=e=>e.length===1&&e[0].modules.length===1});var Cw,YM=l(()=>{"use strict";Cw=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Ae,Vm,Bl=l(()=>{"use strict";Ae=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),Vm=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var XM,ZM=l(()=>{"use strict";Bl();XM=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Ae("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Ae("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Ae("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var QM,eN=l(()=>{"use strict";Ds();Bl();QM=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!E(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Ae("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),Ae("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Ae("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",Vm(e.writerLabel,e.folder)),Ae("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Ae("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var tN,rN=l(()=>{"use strict";Bl();tN=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Ae("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Ae("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Ae("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var oN,nN=l(()=>{"use strict";Bl();oN=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Ae("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Ae("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",Vm(e.writerLabel,e.folder)),...r?[Ae("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var Km,sN=l(()=>{"use strict";Ds();ZM();eN();rN();nN();Km=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(E(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return QM(r);case"evaluate":return XM({...r,currentRound:e.currentRound});case"separate":return oN(r);case"optimize_modules":return tN({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Gl,vr,iN=l(()=>{"use strict";Gl=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),vr=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var P6,Jm,Tw,aN=l(()=>{"use strict";qm();P6="wizardParam_",Jm=e=>`${P6}${e}`,Tw=e=>{let t=yn(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=Jm(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var nt,lN=l(()=>{"use strict";nt=["generalize","evaluate","separate","optimize_modules"]});var ql,Sn,Bs,kr=l(()=>{"use strict";ql="Stopped because the confirmed token or spend budget was exceeded.",Sn="Approaching the confirmed budget. Further trials may hard-stop.",Bs="Confirm the Step 4 token and spend budget before optimizing modules."});var st,Gs=l(()=>{"use strict";st=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var Mt,Vl=l(()=>{"use strict";kr();Mt=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var w6,Cr,Kl=l(()=>{"use strict";kr();w6={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},Cr=e=>{let t=e?.trim()??"";return t.length===0?.01:w6[t]??.01}});var Ym,Lw=l(()=>{"use strict";kr();Kl();Ym=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=Cr(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var cN,Zm,Ew,Ww=l(()=>{"use strict";kr();Gs();Vl();Lw();Kl();cN=e=>{let t=Ym({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??Cr(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:st({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},Zm=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),Ew=e=>{let t=e.existing??Mt(),r=cN({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return Zm(t,r)}});var qs,Jl,pN=l(()=>{"use strict";kr();Gs();Vl();Ww();Lw();Kl();Xt();qs=e=>{let t=Ym({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??Cr(e.writerId),i=r*4e3,a=n*o*8e3,c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:st({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},Jl=e=>{let t=e.existing??Mt();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=qs({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return Zm(t,r)}});var Tr,mN=l(()=>{"use strict";Gs();kr();Vl();Tr=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??Mt(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=st({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var Rw,Vs,gN=l(()=>{"use strict";kr();Gs();Rw=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=st({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:ql,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:ql,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:Sn,costControls:{...t,softWarnFired:!0,softWarnMessage:Sn}}:null},Vs=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var Iw,fN=l(()=>{"use strict";Iw=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var W=l(()=>{"use strict";Ds();Om();FO();FP();Dm();XP();BO();GO();qO();VO();UP();KO();js();eM();ow();tw();tM();nM();Xt();Il();sM();cM();dM();uM();mM();gM();yM();SM();AM();pw();bM();PM();Bm();vM();zM();DM();jM();$M();HM();FM();UM();BM();GM();_w();qM();qm();VM();KM();JM();kw();YM();sN();iN();aN();lN();kr();Gs();Vl();Ww();pN();Kl();mN();gN();fN()});var Ow=l(()=>{"use strict";ha()});var _6,SN,AN=l(()=>{"use strict";Ow();_6=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,SN=e=>{let t=Go(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(_6)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var PN,v6,k6,Zt,C6,T6,bN,eg,wN,L6,ut,_N,vN,kN,Nt=l(()=>{"use strict";Ow();AN();PN=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),v6=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,k6=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,Zt=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(v6.test(e.errorMessage))return"usage_limit";if(k6.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},C6="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",T6="The writer waited on terminal input and did not return a prompt.",bN=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,eg=e=>{let t=e.trim();if(t.length===0||t.length>=500||!bN.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>bN.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},wN=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},L6=e=>eg(e.stdout)??eg(e.stderr)??(wN(e.replyFile)?eg(e.replyFile):null),ut=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return C6;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?T6:null},_N=e=>{let t=e.trim();return t.length===0?null:ut(t)!==null?t:eg(t)??(wN(t)?t:null)},vN=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],kN=e=>{let t=e.replyFileText?.trim()??"",r=ut([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=L6({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=Zt({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=SN([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Go(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var CN,Ks,tg=l(()=>{"use strict";Nt();CN=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:_N(e.promptText)},Ks=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t===void 0?null:CN(t);if(r!==null)return r.trim();for(let o=e.revisions.length-1;o>=0;o-=1){let n=CN(e.revisions[o]);if(n!==null)return n.trim()}return null}});var R,E6,rg,ie,bn,LN,TN,EN,WN,be=l(()=>{"use strict";R="manual",E6=["claude-cli","codex","cursor","antigravity"],rg={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ie=e=>e===R?"You":e in rg?rg[e]:e,bn=e=>E6.filter(t=>e.includes(t)),LN=e=>{let t=bn(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},TN=(e,t)=>t===R?R:e.find(r=>r===t)??null,EN=(e,t,r)=>{let o=bn(e),n=TN(o,t),s=TN(o,r);return n===null||s===null?null:{judge:n,improver:s}},WN=(e,t,r)=>{let o=bn(e);return t===null||t.trim()===""?r!==R?r:o[0]??null:t===R?null:o.find(n=>n===t)??null}});var xN,og,Mw,Pn,Nw,it,Lr,ce,Be=l(()=>{"use strict";xN=g(require("node:fs")),og=g(require("node:os")),Mw=g(require("node:path"));ys();Pn="~",Nw=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,it=e=>{let t=og.default.homedir(),r=Nw(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Lr=e=>{let t=e.trim().length===0?"~":e.trim(),r=ct(t),o=Mw.default.isAbsolute(r)?Nw(r):Nw(Mw.default.resolve(og.default.homedir(),r));try{if(!xN.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:it(o)}},ce=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:og.default.homedir()});var Qt,Js=l(()=>{"use strict";Qt='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var zw,RN,W6,IN,ON,Dw=l(()=>{"use strict";W();be();Be();Js();zw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RN=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',W6=e=>{let t=RN(e.state),r=`<h2>${zw(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${zw(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Qt}</button></div><template>${r}</template></li>`},IN=e=>{let t=e.wizard;if(t===void 0)return"";let r=Km({status:e.status,wizard:t,writerLabel:ie(e.judgeModel),runnerLabel:ie(e.runnerModel??e.judgeModel),folderDisplay:it(ce(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(W6).join("")}</ol>`},ON=e=>{let t=e.wizard;if(t===void 0)return"";let r=Km({status:e.status,wizard:t,writerLabel:ie(e.judgeModel),runnerLabel:ie(e.runnerModel??e.judgeModel),folderDisplay:it(ce(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${RN(n.state)}<span class="sdlc-pipeline-label">${zw(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var zt,MN,NN,zN,jw=l(()=>{"use strict";W();zt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),MN="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",NN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${zt(MN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${zt(i.name)}}}</strong> \u2014 ${zt(i.description)} (sample: ${zt(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${zt(r)}</pre>`,n=Rt(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${zt(n)}</pre>`;return`${t}${o}${s}`},zN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${zt(MN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${zt(n.name)}}}</strong> \u2014 ${zt(n.description)} (sample: ${zt(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${zt(r)}</pre>`;return`${t}${o}`}});var Yl,$w=l(()=>{"use strict";Yl=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var DN,jN=l(()=>{"use strict";W();DN=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=gn({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=mn({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var Hw,ng,Fw=l(()=>{"use strict";Js();jN();Hw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ng=e=>{let t=DN(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${Hw(r)}">${Qt}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${Hw(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${Hw(t)}</pre></template>`}});var sg,Ys,Uw=l(()=>{"use strict";$w();Fw();sg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ys=e=>{let t=Yl(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${sg(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,u=e.cycle.revisions.map(m=>{let S=m.judgement?.score,f=S==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${S}`,y=m.judgement?.reasons?.trim()??"",p=y.length===0?"":`<br><span class="muted">${sg(y)}</span>`,A=ng({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run});if(e.interactive){let b=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${b}> <span class="sdlc-wizard-revision-title">${sg(f)}</span></label>${A}${p}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${sg(f)}</span>${A}${p}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var Bw,$N,HN,FN,Gw=l(()=>{"use strict";Bw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$N=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Bw(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Bw(t.prompt)}</pre></li>`).join("")}</ol>`,HN=e=>$N([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),FN=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Bw(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${$N(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Xl,x6,ig,qw=l(()=>{"use strict";W();Gw();Xl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),x6=e=>{let t=e.wizard;return t===void 0?"":It({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},ig=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=x6(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Xl(n.orchestratorSkill.fileName)}</code> \u2014 ${Xl(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${Xl(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=HN(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${Xl(r)} <span class="muted">${Xl(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var $e,R6,I6,O6,M6,ag,N6,z6,D6,j6,$6,H6,Xs,lg=l(()=>{"use strict";W();Dw();jw();Uw();Fw();qw();$e=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),R6={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},I6=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${$e(o)}</pre>`:`<p class="sdlc-pre-preview mono">${$e(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${$e(o)}</pre></details>`;return`<h2>${$e(e)}</h2>${n}`},O6=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=Rt(t).trim(),n=It({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!E(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${I6("What is being evaluated",i)}`},M6=(e,t)=>{let r=e.wizard;if(r===void 0||E(e.status))return"";let o=R6[t];return o===void 0||r.phase!==o?"":ON(e)},ag=(e,t,r)=>{let o=M6(e,t),n=t==="wizard-2"?O6(e):"";return`${o}${n}${r}`},N6=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},z6=e=>{let t=e.wizard;return t===void 0?"":NN(t)},D6=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${$e(a)}</span>`,d=ng({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${$e(s)}${i}</span>${d}${c}</li>`}).join("")}</ul>`,j6=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Ys({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=N6(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${D6(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=It({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${$e(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${$e(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},$6=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${$e(n.title)}</strong> <span class="muted">(${$e(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${$e(o.title)}</strong>${n}${$e(s)}${ig(e,o)}</li>`}).join("")}</ul>`},H6=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${$e(i)}</span> <strong>${$e(n.title)}</strong>${$e(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${$e(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Ys({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Xs=(e,t)=>{switch(t){case"wizard-1":return ag(e,t,z6(e));case"wizard-2":return ag(e,t,j6(e));case"wizard-3":return ag(e,t,$6(e));case"wizard-4":return ag(e,t,H6(e));default:return""}}});var F6,U6,UN,BN,GN=l(()=>{"use strict";W();tg();Nt();lg();F6=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},U6=e=>{let t=e.goal.trim();return t.length===0?null:t},UN=(e,t,r,o,n)=>{let s=ut(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},BN=(e,t)=>{let r=U6(e);if(t.id.startsWith("wizard-")){let s=Xs(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=Wl(e,t);if(s!==null){let a=Ks(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ae(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:UN(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:F6(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:UN(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var wn,qN,VN=l(()=>{"use strict";wn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qN=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${wn(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${wn(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${wn(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${wn(n)}</h2><pre class="mono">${wn(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${wn(e.goal)}</dd></div></dl>`;return`<h2>${wn(e.title)}</h2>${i}${t}${r}${o}${s}`}});var B6,KN,Zl,Vw,cg=l(()=>{"use strict";W();B6=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),KN=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||E(e.status))return null;let r=Wt(t);return r<0||r>3?null:`wizard-${r+1}`},Zl=(e,t)=>B6.has(t)?KN(e)===t:!1,Vw="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var G6,dg,Kw=l(()=>{"use strict";G6='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',dg=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${G6}</button>`});var _n,ug=l(()=>{"use strict";W();_n=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Cl({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:Ll(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var q6,JN,V6,Jw,YN,K6,J6,Y6,X6,XN,ZN=l(()=>{"use strict";W();ug();q6={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},JN=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},V6=e=>q6[e]??null,Jw=(e,t)=>{let r=e.wizard,o=V6(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=Wt(r);return o<n||o===n},YN=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},K6=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:Rt(t).trim();return o.length===0?null:Nl({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:JN(e,"generalize")})},J6=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=_n(e);return n===null?null:uo({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=YN(e)?.promptText.trim()??It({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:gn({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},Y6=e=>{let t=e.wizard;if(t===void 0)return null;let r=It({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:zl({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:JN(e,"separate")})},X6=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=vr(t),s=hn(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=_n(e);return c===null?null:uo({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=YN(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||E(e.status)&&i?.judgement!==null)?mn({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):Dl({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:fn(t,r).output,moduleTitle:o.title})},XN=(e,t)=>{if(!Jw(e,t))return null;switch(t){case"wizard-1":return K6(e);case"wizard-2":return J6(e);case"wizard-3":return Y6(e);case"wizard-4":return X6(e);default:return null}}});var Z6,pg,Yw=l(()=>{"use strict";W();Z6=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},pg=(e,t)=>{let r=e.wizard,o=Z6(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=Wt(r);return o<n?"done":o===n&&E(e.status)&&e.status==="failed"?"failed":o<=n&&E(e.status)?"done":"pending"}});var Q6,Zs,mg=l(()=>{"use strict";Js();ZN();Yw();Q6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zs=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(pg(e,t)==="pending")return""}else if(!Jw(e,t))return"";let o=XN(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Qt}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${Q6(o)}</pre></template>`}});var vn,Er,Qs=l(()=>{"use strict";vn=e=>e.toLocaleString("en-US"),Er=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var er,eJ,QN,gg,ez,tz,fg=l(()=>{"use strict";W();GN();VN();cg();Kw();Js();tg();Dw();mg();Qs();er=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eJ=(e,t)=>{let r=Wl(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Er(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${vn(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${er(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${er(r)}</span>`:"",d=qN(BN(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&E(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${er(e.id)}"`:"",m=Zl(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${er(Vw)}"><input type="hidden" name="cycleId" value="${er(t.id)}"><input type="hidden" name="wizardStepId" value="${er(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",S=e.state==="active"&&e.id.startsWith("wizard-")?IN(t):"",f=o?"failed":e.state,y=o?Ks(t):null,p=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Qt}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${er(y)}</pre></template>`:"",A=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Zs(t,e.id):"";return`<li class="sdlc-node sdlc-node-${f}" data-sdlc-step-id="${er(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${er(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${A}${p}</div></div>${S}<template>${d}</template></li>`},QN=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>eJ(r,t)).join("")}</ol>`,gg=e=>`<div class="sdlc-score" aria-label="What the score means">${El(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${er(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,ez=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${dg({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,tz=`<script>
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
</script>`});var hg,yg,Sg,rz,Xw=l(()=>{"use strict";hg="support-reply",yg="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",Sg=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),rz=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Ag,oz,nz=l(()=>{"use strict";W();fg();Xw();Ag=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oz=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${gg(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${Ag(yg)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Ag(Sg)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Ag(rz)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Ag(hg)}">Run this sample</a>
      </div>
    </section>`});var Zw,bg,tJ,sz,iz=l(()=>{"use strict";Zw=g(require("node:fs")),bg=g(require("node:path")),tJ=e=>bg.default.join(bg.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),sz=(e,t)=>{let r=tJ(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;Zw.default.mkdirSync(bg.default.dirname(r),{recursive:!0}),Zw.default.appendFileSync(r,o,"utf8")}});var ei,az,rJ,lz,oJ,cz,tr,Y,dz,z,at=l(()=>{"use strict";ei=g(require("node:fs")),az=g(require("node:path"));W();iz();rJ=e=>e.wizard===void 0?e:{...e,wizard:aw(e.wizard)},lz=new Set,oJ=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),cz=(e,t)=>{ei.default.mkdirSync(az.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;ei.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),ei.default.renameSync(r,e)},tr=e=>{if(!ei.default.existsSync(e))return[];try{let t=JSON.parse(ei.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(oJ).map(rJ):[]}catch{return[]}},Y=(e,t)=>tr(e).find(r=>r.id===t)??null,dz=(e,t)=>{lz.add(t);let r=tr(e).filter(o=>o.id!==t);cz(e,r)},z=(e,t)=>{if(lz.has(t.id))return;let r=tr(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];cz(e,o),sz(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var ti,rr,Ql,uz,Pg,nJ,pz,mz,gz,Qw=l(()=>{"use strict";ti=g(require("node:fs")),rr=g(require("node:path")),Ql=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},uz=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Pg=(e,t)=>{let r=Ql(e);return r.length>0?r:Ql(t)},nJ=e=>{let t=Pg(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${uz(o)}`,...n.length>0?[`description: ${uz(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},pz=e=>`.cursor/skills/${e}/SKILL.md`,mz=(e,t)=>{let r=Ql(t);if(r.length===0)return!1;let o=rr.default.resolve(e),n=rr.default.resolve(o,".cursor","skills"),s=rr.default.resolve(o,pz(r));return s.startsWith(`${n}${rr.default.sep}`)?ti.default.existsSync(s):!1},gz=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Pg(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=rr.default.resolve(e.workingDirectory);try{if(!ti.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=nJ({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=pz(r.slug),n=rr.default.resolve(t,".cursor","skills"),s=rr.default.resolve(t,o);if(!s.startsWith(`${n}${rr.default.sep}`))return{ok:!1,errorCode:"path"};if(ti.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{ti.default.mkdirSync(rr.default.dirname(s),{recursive:!0}),ti.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var sJ,fz,hz,yz=l(()=>{"use strict";W();at();Be();Nt();Qw();sJ=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,fz=e=>{let t=e.get("savedSkill");return t!==null&&sJ.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},hz=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=Y(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!E(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ae(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||ut(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=gz({workingDirectory:ce(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var wg,_g,ec=l(()=>{"use strict";W();wg=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=Tr({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},_g=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var mo,tc=l(()=>{"use strict";W();ec();mo=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=Cw(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=Ew({moduleCount:o.length,existing:e.costControls,writerId:n}),i=wg(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Gl(r.variables)},updatedAt:new Date().toISOString()}}});var go,rc=l(()=>{"use strict";go=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var e_=l(()=>{"use strict";kt();ml();ha()});var t_,Sz,r_,Az,bz=l(()=>{"use strict";t_={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},Sz=e=>e.exitCode===null&&e.signalCode===null,r_=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!Sz(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!Sz(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),Az=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),r_(e).then(s=>{r({...t_,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var Pz,oc,wz,o_,iJ,s_,i_,aJ,lJ,cJ,_z,dJ,n_,vz,nc,kz,uJ,pJ,Ke,kn=l(()=>{"use strict";Pz=require("node:child_process"),oc=g(require("node:fs")),wz=g(require("node:os")),o_=g(require("node:path"));e_();bz();Nt();iJ=["claude-cli","codex","cursor","antigravity"],s_=18e4,i_=6e5,aJ=12e4,lJ=9e5,cJ="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",_z="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",dJ="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",n_=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},vz=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=n_(process.env[_z])??Math.max(r,i_));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:n_(process.env[dJ])??lJ;return Math.min(o,Math.max(aJ,r))},nc=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?n_(process.env[_z])??i_:s_,kz=e=>`The writer timed out after ${e}ms.`,uJ=e=>iJ.includes(e),pJ=e=>e===!0||process.env[cJ]==="1",Ke=e=>new Promise(t=>{if(e.signal?.aborted){t(t_);return}if(pJ(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!uJ(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=qt(r,e.prompt,me({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!oc.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:s_,s=o_.default.join(oc.default.mkdtempSync(o_.default.join(wz.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=vN({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,Pz.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=S=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(S))};Az(u,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",r_(u).then(S=>{m({ok:!1,errorMessage:kz(n),errorKind:"writer_timeout",killSignal:S})})},n),u.stdout.on("data",S=>{a.push(Buffer.from(S))}),u.stderr.on("data",S=>{c.push(Buffer.from(S))}),u.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",()=>{if(d.settled)return;let S=oc.default.existsSync(s)?oc.default.readFileSync(s,"utf8"):null,f=kN({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:S});if(f.ok&&d.stopReason!=="abort"){m(f);return}d.stopReason===null&&m(f)})})});var mJ,sc,a_=l(()=>{"use strict";W();Qs();mJ=e=>{if(e.wizard!==void 0){let t=$l(e.wizard),r=Er(e);return(t??0)+r}return Er(e)},sc=e=>{let t=Rw({costControls:e.costControls,spentTokens:mJ(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var Cz,gJ,ic,vg,kg=l(()=>{"use strict";W();be();a_();Cz=e=>e===R?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},gJ=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),ic=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=YP({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:Cz(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?Iw({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:Ll(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=gJ(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?sc({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):sc({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},vg=(e,t,r=null)=>{let o=jm({raw:t,judge:Cz(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Cg,l_=l(()=>{"use strict";Cg=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var Ez,Tg,Lg,Tz,Lz,c_,fJ,Wz,d_,hJ,xz,yJ,SJ,Rz,Iz=l(()=>{"use strict";Ez=require("node:child_process"),Tg=g(require("node:fs")),Lg=g(require("node:path"));Yp();W();Tz=4e3,Lz=12e3,c_=(e,t)=>{let r=(0,Ez.spawnSync)("git",[...t],{cwd:e,env:io(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},fJ=e=>c_(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",Wz=e=>{let t=c_(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},d_=(e,t)=>{let r=Lg.default.resolve(e,t),o=Lg.default.relative(e,r);if(o.startsWith("..")||Lg.default.isAbsolute(o)||!Tg.default.existsSync(r)||!Tg.default.statSync(r).isFile())return null;let n=Tg.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>Tz?`${n.slice(0,Tz)}
\u2026truncated`:n},hJ=e=>e.length>Lz?`${e.slice(0,Lz)}
\u2026truncated`:e,xz=e=>{let t=QP(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,d_(e.workingDirectory,n)])),o=fJ(e.workingDirectory);return{git:o,status:o?Wz(e.workingDirectory):{},files:r,paths:t}},yJ=(e,t)=>{let r=c_(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=d_(e,t);return o===null?`${t} is missing.`:o},SJ=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",Rz=e=>{let t=e.before.git?Wz(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=d_(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>yJ(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:SJ(e.before.git,e.before.paths.length>0),evidence:hJ(i.join(`

`))}}});var m_,B,g_,xe,Oz,AJ,bJ,Mz,ri,Nz,oi,PJ,wJ,ac,u_,p_,_J,zz,vJ,kJ,CJ,Dz,TJ,jz,$z,LJ,EJ,Hz,Fz=l(()=>{"use strict";m_=require("node:child_process"),B=g(require("node:fs")),g_=g(require("node:os")),xe=g(require("node:path"));Yp();Oz=8e6,AJ=16e6,bJ=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],Mz=(e,t)=>{let r=(0,m_.spawnSync)("git",[...t],{cwd:e,env:io(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},ri=(e,t)=>(0,m_.spawnSync)("git",[...t],{cwd:e,env:io(),timeout:8e3}).status===0,Nz=e=>{let t=Mz(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},oi=(e,t)=>{let r=xe.default.resolve(e,t),o=xe.default.relative(e,r);return o.startsWith("..")||xe.default.isAbsolute(o)?null:r},PJ=(e,t)=>{let r=oi(e,t);if(r===null||!B.default.existsSync(r))return null;let o=B.default.statSync(r);return!o.isFile()||o.size>Oz?null:B.default.readFileSync(r)},wJ=(e,t,r)=>{let o=oi(e,t);o!==null&&(B.default.mkdirSync(xe.default.dirname(o),{recursive:!0}),B.default.writeFileSync(o,r))},ac=(e,t)=>{let r=oi(e,t);r===null||!B.default.existsSync(r)||B.default.rmSync(r,{recursive:!0,force:!0})},u_=(e,t)=>ri(e,["cat-file","-e",`HEAD:${t}`]),p_=e=>{let t=Mz(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},_J=e=>xe.default.resolve(e)!==xe.default.resolve(g_.default.homedir()),zz=e=>{if(!B.default.existsSync(e))return 0;let t=B.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?B.default.readdirSync(e).reduce((r,o)=>r+zz(xe.default.join(e,o)),0):0},vJ=(e,t,r)=>{let o=oi(e,r);if(o===null||!B.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(zz(o)>AJ)return{relativePath:r,existed:!0,copyDir:null};let n=xe.default.join(t,"cache",r);return B.default.mkdirSync(xe.default.dirname(n),{recursive:!0}),B.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},kJ=400,CJ=32e6,Dz=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!B.default.existsSync(s)))for(let i of B.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=xe.default.join(s,i),c=B.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>Oz)){if(t.length>=kJ||r+c.size>CJ){o=!1;return}r+=c.size,t.push(xe.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},TJ=(e,t,r)=>{let o=oi(e,r);if(o===null||!B.default.existsSync(o))return null;let n=PJ(e,r);if(n===null)return"skip";let s=xe.default.join(t,"files",r);return B.default.mkdirSync(xe.default.dirname(s),{recursive:!0}),B.default.writeFileSync(s,n),s},jz=e=>{let t=B.default.mkdtempSync(xe.default.join(g_.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?Nz(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:Dz(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,TJ(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?p_(e.workingDirectory):null,isolateCaches:_J(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:bJ.map(i=>vJ(e.workingDirectory,t,i))}},$z=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){ac(e.workingDirectory,t);return}wJ(e.workingDirectory,t,B.default.readFileSync(r))}},LJ=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?$z(e,t):u_(e.workingDirectory,t)?ri(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):ac(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&u_(e.workingDirectory,t)&&ri(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!u_(e.workingDirectory,t)&&ri(e.workingDirectory,["reset","-q","HEAD","--",t])},EJ=(e,t)=>{let r=oi(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){ac(e.workingDirectory,t.relativePath),B.default.mkdirSync(xe.default.dirname(r),{recursive:!0}),B.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){ac(e.workingDirectory,t.relativePath);return}if(B.default.existsSync(r))for(let o of B.default.readdirSync(r)){let n=xe.default.join(r,o);B.default.statSync(n).mtimeMs>=e.startedMs-1e3&&B.default.rmSync(n,{recursive:!0,force:!0})}}}},Hz=e=>{try{if(e.git){if(p_(e.workingDirectory)!==e.head&&(!(e.head===null?ri(e.workingDirectory,["update-ref","-d","HEAD"]):ri(e.workingDirectory,["reset","--hard",e.head]))||p_(e.workingDirectory)!==e.head))throw new Error("head");let r=Nz(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))LJ(e,o)}else{if(e.complete)for(let t of Dz(e.workingDirectory).paths)e.files[t]===void 0&&ac(e.workingDirectory,t);for(let t of Object.keys(e.files))$z(e,t)}for(let t of e.caches)EJ(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{B.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Eg,Wg,WJ,xJ,RJ,IJ,OJ,Uz,MJ,Bz,Gz=l(()=>{"use strict";W();kg();l_();Iz();Fz();be();Be();Nt();kn();Eg=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),Wg=e=>({...e,status:"stopped",errorMessage:pn,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),WJ=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),xJ=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==R?t:e.improverModel!==R?e.improverModel:null}return e.judgeModel!==R?e.judgeModel:e.improverModel!==R?e.improverModel:null},RJ=async e=>{let t=ce(e.cycle),r=xz({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=jz({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Dl({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:fn(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):Tl({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=vz({promptText:e.revision.promptText,isModuleRun:i}),c=nc({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await Ke({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=u.ok?Rz({workingDirectory:t,before:r,writerReply:u.text}):null,S=Hz(o),f={...e.cycle,revisions:e.cycle.revisions.map(y=>y.roundNumber===e.cycle.currentRound?d:y)};return u.ok?!S.ok||m===null?{ok:!1,cycle:Eg(f,S.ok?"Could not put the folder back after the run.":S.errorMessage)}:{ok:!0,cycle:f,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Wg(f)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Eg(f,u.errorMessage,Zt(u))})},IJ=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:RJ({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),OJ=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),Uz=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Ke({writerAgent:e.reviewer,workingDirectory:ce(e.cycle),prompt:ZP({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Wg(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},MJ=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===R)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Ke({writerAgent:t.judgeModel,workingDirectory:ce(t),prompt:gn({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...ic(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?Wg(o):(e.onWriterFailure?.(t.judgeModel),Eg(o,n.errorMessage,Zt(n)))},Bz=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return MJ(e);let o=xJ(t),n=await IJ({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?WJ(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===R){let u=await Uz({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{...OJ(s,u.text),judgePhase:void 0}}let i=await Ke({writerAgent:t.judgeModel,workingDirectory:ce(t),prompt:mn({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Wg(s):(e.onWriterFailure?.(t.judgeModel),Eg(s,i.errorMessage,Zt(i)));let a=await Uz({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=ic(s,i.text,c);return Cg(d,a.text)}});var xg,NJ,zJ,f_,qz=l(()=>{"use strict";W();kg();Gz();ug();Nt();be();a_();Be();kn();xg=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),NJ=e=>({...e,status:"stopped",errorMessage:pn,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),zJ=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?NJ(e):(n?.(r),xg(e,t.errorMessage,Zt(t))),f_=async(e,t,r,o)=>{let n=sc(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return xg(e,"This round has no prompt.");if(e.status==="judging")return Bz({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return xg(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===R)return e;let i=_n(e);if(i===null)return xg(e,"The improver needs the score and the reason.");let a=await Ke({writerAgent:e.improverModel,workingDirectory:ce(e),prompt:uo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:nc()}),c=zJ(e,a,e.improverModel,r,t);return c!==null?c:vg(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var lc,h_,DJ,Kz,Vz,jJ,$J,Rg,Jz,Yz,HJ,FJ,Cn,Xz,Zz,cc=l(()=>{"use strict";W();tc();rc();be();Be();Nt();kn();qz();$w();lc=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),h_=(e,t,r)=>e.wizard===void 0||t===null?lc(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},DJ=e=>{let t=Zt(e);return PN(e)||t==="usage_limit"||t==="action_required"},Kz=(e,t,r)=>DJ(r)?lc(e,r.errorMessage,Zt(r)):h_(e,t,r.errorMessage),Vz=e=>{let t=e.wizard;return t===void 0||Yl(e).length===0?e:{...e,wizard:Us({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},jJ=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",$J=e=>{let t=e.wizard;if(t===void 0)return e;let r=jl({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Us({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Rg=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),Jz=e=>e.judgeModel!==R?e.judgeModel:e.improverModel!==R?e.improverModel:null,Yz=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},HJ=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=Jz(e);if(n===null)return lc(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Rt(o),i=Nl({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:Yz(e,"generalize")}),a=await Ke({writerAgent:n,prompt:i,workingDirectory:ce(e),signal:t});if(!a.ok)return r?.(n),Kz(e,"generalize",a);try{let c=bw(a.text),d=Us({wizard:{...o,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Gl(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return Hl(d)?Cn({...u,wizard:{...d,gate:null}}):Rg(u,"generalize")}catch(c){return h_(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},FJ=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=Jz(e);if(n===null)return lc(e,"Choose a writer to suggest splits.");let s=It({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=zl({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:Yz(e,"separate")}),a=await Ke({writerAgent:n,prompt:i,workingDirectory:ce(e),signal:t});if(!a.ok)return r?.(n),Kz(e,"separate",a);try{let c=Pw(a.text),d=dw(c,o.variables),u=Us({wizard:{...o,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:u};return Ul(d)?mo(m,d[0]):Rg(m,"separate")}catch(c){return h_(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},Cn=e=>{let t=e.wizard;if(t===void 0)return e;let r=Rt(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},Xz=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return lc(e,"This module is missing.");let n=vr(r),s=hn(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==R?e.runnerModel:e.judgeModel!==R?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:se(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},Zz=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return f_(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return HJ(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return FJ(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await f_(e,t,r,o);if(E(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Yl(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=ae(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&Fl({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let u=Vz(Rg(a,i));return go(u)}let c=Rg(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=mw({wizard:{...c.wizard,modules:c.wizard.modules.map((m,S)=>S===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:jJ(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?Vz(d):$J(d)}return s}return n.phase==="complete",e}});var ni,Ig=l(()=>{"use strict";W();be();ni=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:yw(r,e.judgeModel===R),updatedAt:new Date().toISOString()}}});var si,Og=l(()=>{"use strict";si=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var pt,Qz,UJ,eD=l(()=>{"use strict";W();Be();Og();Nt();Qw();pt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qz=e=>{if(!E(e.status))return"";let t=ae(e.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??null,reasons:S.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=ut(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${pt(t.reasons.trim())}</p>`,i=e.status==="passed",a=si(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${pt(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${pt(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${pt(n)}</div>`:i?UJ({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ce(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${pt(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${pt(t.promptText)}</pre></details>`,m=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${m}</h2>${d}${o}${s}${u}</section>`},UJ=e=>{let t=e.sourceSkill?.fileName??Ql(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=Pg(t,r),s=n.length>0&&mz(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${pt(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${pt(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${pt(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${pt(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${pt(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${pt(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var tD,rD=l(()=>{"use strict";tD=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var oD,BJ,Mg,Je,Ng,y_=l(()=>{"use strict";W();be();rD();tg();Nt();Og();oD=["Generalize","Evaluate","Separate","Optimize modules"],BJ=e=>{let t=Wt(e),r=t>=0&&t<oD.length?oD[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},Mg=(e,t)=>{let r=Ks(e),o=r===null?null:tD(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Je=(e,t)=>({title:e,detail:t,replyPreview:null}),Ng=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:null}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!E(e.status)){let t=e.judgeModel;return Je(`${ie(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!E(e.status)){let t=e.judgeModel;return Je(`${ie(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===R?Je(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Je(`${ie(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Je(`${ie(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===R){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==R?Je(`${ie(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Je(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Je(`${ie(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=se(t);return Je(`${ie(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Je(`${ie(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=se(t);return Je(`${ie(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Je(`${ie(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===R){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Je("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Je(`${ie(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>ut(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=te(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||E(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?Mg(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=si(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?Mg(e,{title:`${BJ(r)}${s}`,detail:t.length>0?t:n}):Mg(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(E(e.status)){let t=e.errorMessage?.trim()??"";return Mg(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var or,dc=l(()=>{"use strict";be();or=e=>{if(e.status==="improving"&&e.improverModel===R)return!0;if(e.status!=="judging"||e.judgeModel!==R)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===R}});var nD,sD=l(()=>{"use strict";nD=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var fo,GJ,iD,aD=l(()=>{"use strict";W();fo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GJ=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${fo(r)}</p>`},iD=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${fo(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${fo(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${fo(a)}.</p>`}<pre class="mono">${fo(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${po(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${fo(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",m=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${fo(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${GJ(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${fo(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var uc,qJ,lD,cD=l(()=>{"use strict";W();Nt();uc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qJ=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=ut(t.promptText),n=t.judgement?.reasons?`<p class="muted">${uc(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${uc(i)}.</p>`}<pre class="mono">${uc(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${po(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${uc(d)}</pre>`:`<div class="alert-error">${uc(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${u}</article>`},lD=e=>e.revisions.map(t=>qJ(e,t)).join("")});var dD,uD=l(()=>{"use strict";W();dD=e=>{if(E(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var nr,VJ,S_,KJ,JJ,YJ,XJ,pD,mD,A_=l(()=>{"use strict";uD();nr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),VJ="Stop this run? Writers will stop and the best prompt is kept.",S_="End the wizard? Writers will stop and progress from finished steps is kept.",KJ="Skip this module and pause at the step gate?",JJ=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${nr(VJ)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${nr(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,YJ=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${nr(S_)}"><input type="hidden" name="cycleId" value="${nr(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,XJ=e=>{let t=nr(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${nr(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${nr(KJ)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${nr(S_)}">End wizard</button>
    </form>
  </div>`},pD=e=>{let t=dD(e);return t==="none"?"":t==="legacy_stop"?JJ(e.id):t==="wizard_end_only"?YJ(e.id):XJ(e)},mD=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=nr(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${nr(S_)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var gD,fD=l(()=>{"use strict";W();Qs();gD=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=te(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${vn(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${vn(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${se(r)}`}return""}});var ZJ,QJ,hD,e7,yD,SD=l(()=>{"use strict";W();fD();Yw();lg();mg();ZJ=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',QJ=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',hD=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),e7=(e,t,r)=>{let o=Xs(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=gD(e,t),i=pg(e,t),a=ZJ(i),c=QJ(i),d=Zs(e,t,{forOutcomeSummary:!0}),u=`${a}<span class="sdlc-wizard-outcome-step-title">${hD(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${hD(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",S=i==="failed"&&t!=="wizard-4"?" open":"",f=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${f}"${m}${S}><summary aria-controls="${f}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${f}-body">${o}</div></details>`},yD=e=>{let t=e.wizard;if(t===void 0||!E(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>e7(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var AD,bD,PD=l(()=>{"use strict";AD=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bD=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${AD(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${AD(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var b_,wD,P_=l(()=>{"use strict";b_=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,wD=(e,t)=>{if(b_(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var _D,vD=l(()=>{"use strict";_D=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var zg,kD,CD=l(()=>{"use strict";W();P_();P_();vD();zg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kD=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=te(t),o=se(t),n=r.terminalStatusSuggestion==="passed"?"":_D(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,f=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=u===void 0?c.status:wD(u,o),p=u!==void 0&&b_(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':y==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':y==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':zg(y);return`<tr${f}><td>${zg(c.title)}</td><td>${zg(m)}</td><td>${c.tokens??"\u2014"}</td><td>${p}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${zg(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var Tn,Dg,w_=l(()=>{"use strict";Tn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Dg=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Tn(r.fileName)}</code> \u2014 ${Tn(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${Tn(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${Tn(i.name)}</strong> <code>.cursor/skills/${Tn(i.fileName)}/SKILL.md</code></p><p class="muted">${Tn(i.description)}</p><p>${Tn(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var t7,TD,LD=l(()=>{"use strict";W();PD();CD();w_();t7=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),TD=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!E(e.status)||t.modules.length===0)return"";let r=kD(e),o=bD(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=te(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${t7(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${Dg(e)}${a}${r}${o}</section>`}});var q,jg=l(()=>{"use strict";W();q={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var $g,__=l(()=>{"use strict";$g=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var ED,WD=l(()=>{"use strict";jg();__();ED=e=>{let t=$g({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:q.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var Wr,pc=l(()=>{"use strict";Wr=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var xr,Hg,v_=l(()=>{"use strict";W();fg();eD();y_();dc();sD();ug();aD();cD();A_();SD();LD();Qs();WD();Be();pc();xr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hg=e=>{let t=!E(e.status)&&e.status!=="wizard_paused"&&!or(e),r=Ng(e),o=QN(nw(nD(e)),e),n=E(e.status)?"":pD(e),s=yD(e),i=TD(e),a=Qz(e),c=e.errorMessage===null?"":`<div class="alert-error">${xr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?te(e.wizard):null,S=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,f=!t&&e.wizard!==void 0&&E(e.status)&&(e.wizard.phase==="complete"||te(e.wizard).passedModuleCount>0),y=f?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",p=f&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${xr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",A=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${xr(r.replyPreview)}</pre>`,b=r.detail.length===0&&p.length===0&&A.length===0||r.detail.length===0&&A.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${xr(r.detail)}${u}</p>`}${A}</div>`,h=e.revisions.find(vo=>vo.roundNumber===e.currentRound),w=e.status==="improving"?_n(e):null,_=Er(e),k=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),C=or(e)?iD({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:w?.promptText??h?.promptText??"",score:w?.score??h?.judgement?.score??null,reasons:w?.reasons??h?.judgement?.reasons??null,avoid:w?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:h?.run??null,minJudgeScore:k?1:0}):"",T=e.wizard!==void 0&&e.wizard.phase==="complete"&&E(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!T&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?se(e.wizard):e.passScore,M=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${gg(I)}</div>`:"",U=e.status==="failed"?ED({status:e.status,errorKind:e.errorKind}):null,K=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':E(e.status)?U!==null?`<span class="${U.badgeClass}">${U.badgeLabel}</span>`:T&&m!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",G=t?d:f?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',Ge=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${xr(it(ce(e)))}</li>`:"",_>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${vn(_)} so far</li>`:""].filter(vo=>vo.length>0),$=Ge.length===0?"":`<ul class="sdlc-run-meta">${Ge.join("")}</ul>`,_e=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,qr=T?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,cr=T?"":M.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${qr}</div>`:`<div class="sdlc-run-grid">${qr}${M}</div>`,MC=lD(e),fG=e.wizard!==void 0&&E(e.status)&&e.revisions.every(vo=>vo.roundNumber===0&&(vo.judgement===void 0||vo.judgement===null)),hG=MC.length===0||fG?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${MC}</div></section>`,yG=`<p class="sdlc-run-goal" title="${xr(e.goal.trim())}">${xr(Wr(e.goal))}</p>`,SG=T?`${c}${i}${s}${C}${a}`:`${c}${cr}${C}${s}${a}`,AG='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',bG=T?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${xr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${AG}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${K}</div>${yG}<div class="sdlc-run-activity${y}"${f?' role="status"':""}><div class="sdlc-run-activity-icon">${G}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${xr(r.title)}</h2>${b}${p}${bG}</div></div>${$}${_e}</header>${SG}</section>${hG}`}});var xD,RD=l(()=>{"use strict";W();rc();xD=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Fl({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:go(e)}});var ID,OD=l(()=>{"use strict";W();cc();ID=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Hl(t)?e:Cn({...e,wizard:{...t,gate:null}})}});var MD,ND=l(()=>{"use strict";W();tc();MD=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Ul(t.splitOptions))return e;let r=t.splitOptions[0];return mo(e,r)}});var r7,Ln,Fg=l(()=>{"use strict";RD();OD();ND();at();r7=e=>{let t=ID(e),r=xD(t);return MD(r)},Ln=(e,t)=>{let r=r7(t);return r!==t?(z(e,r),r):t}});var zD,Rr,mc=l(()=>{"use strict";W();zD=e=>nt.indexOf(e),Rr=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||E(e.status)?nt.length:t.gate!==null?zD(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?zD(t.phase):null}});var DD,jD=l(()=>{"use strict";DD=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var En,$D,HD=l(()=>{"use strict";W();jD();En=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$D=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=fn(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${En(DD(o))}</pre></div>`:"",s=yn(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=vr(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),u=Jm(c),m=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,f=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${En(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${En(u)}">${En(S)}</label>
        ${f}
        <input class="input" type="text" id="${En(u)}" name="${En(u)}" value="${En(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var FD,UD=l(()=>{"use strict";FD={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var gc,o7,de,ho=l(()=>{"use strict";UD();Js();gc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),o7=e=>{let t=FD[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${gc(t.title)}" aria-describedby="${r}" aria-expanded="false">${Qt}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${gc(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${gc(t.example)}</span></span></button>`},de=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${gc(r)}"`}>${gc(e)}</span>${o7(t)}</span>`});var mt,BD,GD,qD=l(()=>{"use strict";W();ec();jg();ho();mt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),BD=e=>{let t=e.costControls;if(t===void 0||Vs(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??st({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${mt(q.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${mt(t.softWarnMessage??Sn)}</p>`:"",d=_g({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${mt(q.estimateOverCeilingWarn)}</p>`:"",u=e.wizard?.modules.length??0,m=u>0?`<p class="muted">Step 4 will optimize ${u} module${u===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${mt(q.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${mt(q.confirmLede)}</p>
  ${m}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${mt(Bs)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${mt(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${mt(q.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${mt(q.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${mt(q.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${de(q.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${de(q.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${mt(q.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${mt(q.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},GD=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!Vs(r)}});var fc,VD,KD=l(()=>{"use strict";W();jw();HD();Uw();A_();w_();qw();qD();fc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),VD=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(GD(e))return BD(e);let n=se(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?zN(r):"",a=o==="evaluate"?Dg(e):"",c=o==="evaluate"?Ys({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(x=>{let I=x.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',M=x.recommended?' <span class="sdlc-badge">Recommended</span>':"",U=r.selectedSplitOptionId===x.id||r.selectedSplitOptionId===null&&x.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${fc(x.id)}" required${U}> <strong>${fc(x.title)}</strong>${I}${M}</label>${ig(e,x)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],f=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=m?.title??"Module",p=m?.prompt??"",A=m?.status==="pending",b=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${fc(y)}</p>${A?$D({cycle:e,modulePrompt:p}):""}<p class="muted">Test run prompt preview: ${fc(hn(p,vr(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${Ys({cycle:e,interactive:!1,caption:A?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",h=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":A?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",w=$l(r),_=w===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${w}</p>`,k=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",C=t?.active===!0?" sdlc-wizard-gate-active":"",T=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${k}"`:"";return`<section class="card sdlc-wizard-gate${C}"${T}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${h}</p>
    ${_}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${fc(e.id)}">
    ${i}
    ${a}
    ${c}
    ${u}
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
    ${mD(e)}
  </section>`}});var n7,JD,YD=l(()=>{"use strict";W();mg();n7=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),JD=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||E(e.status))return"";let r=(o,n)=>{let s=Zs(e,o);return`<h2 class="sdlc-wizard-active-head">${n7(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var k_,XD,ZD,yo,QD,ii=l(()=>{"use strict";W();at();k_=new Map,XD=e=>{let t=new AbortController;return k_.set(e,t),t.signal},ZD=e=>{k_.delete(e)},yo=e=>{k_.get(e)?.abort()},QD=(e,t)=>{let r=Y(e,t);return r===null||r.wizard!==void 0?!1:(E(r.status)||(z(e,{...r,status:"stopped",errorMessage:pn,updatedAt:new Date().toISOString()}),yo(t)),!0)}});var ej,tj,C_,rj,T_=l(()=>{"use strict";W();mc();ii();ej="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",tj=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return nt[r]??null},C_=(e,t)=>{let r=tj(t);if(r===null||e.wizard===void 0)return!1;let o=nt.indexOf(r);if(o===-1)return!1;let n=Rr(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<nt.length)},rj=(e,t)=>{let r=tj(t);if(r===null||e.wizard===void 0||!C_(e,t))return e;yo(e.id);let o=nt.slice(nt.indexOf(r)),n=Ml(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var L_,oj,nj=l(()=>{"use strict";T_();L_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oj=(e,t)=>C_(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${L_(ej)}"><input type="hidden" name="cycleId" value="${L_(e.id)}"><input type="hidden" name="wizardStepId" value="${L_(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var s7,i7,a7,sj,ij=l(()=>{"use strict";W();mc();KD();YD();nj();lg();s7={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},i7=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),a7=(e,t,r)=>{let o=oj(e,t);return`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${i7(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${Xs(e,t)}</div>
</details>`},sj=e=>{let t=e.wizard;if(t===void 0)return"";let r=Rr(e);if(r===null)return"";let o=nt.slice(0,r).map((i,a)=>a7(e,`wizard-${a+1}`,s7[i])),n=t.gate!==null?VD(e,{active:!0}):JD(e),s=r>=nt.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var Ug,E_=l(()=>{"use strict";ij();Gw();W();Ug=e=>{if(e===null||e.wizard!==void 0&&E(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=sj(e),r=FN(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var l7,W_,aj=l(()=>{"use strict";W();be();Be();kn();l7=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},W_=async(e,t,r)=>{if(!l7(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===R)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=gw({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Ke({writerAgent:e.judgeModel,prompt:n,workingDirectory:ce(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=hw(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var hc,Bg,lj,x_,cj,dj,uj,Gg,R_=l(()=>{"use strict";hc=g(require("node:fs")),Bg=g(require("node:path")),lj=e=>Bg.default.join(Bg.default.dirname(e),"prompt-optimizer-writer-ready.json"),x_=e=>{let t=lj(e);if(!hc.default.existsSync(t))return{};try{let r=JSON.parse(hc.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},cj=(e,t)=>{hc.default.mkdirSync(Bg.default.dirname(e),{recursive:!0}),hc.default.writeFileSync(lj(e),`${JSON.stringify(t,null,2)}
`)},dj=(e,t)=>x_(e)[t]?.message??null,uj=(e,t,r)=>{cj(e,{...x_(e),[t]:{message:r}})},Gg=(e,t)=>{let r=x_(e);r[t]!==void 0&&cj(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var I_,qg,Vg,pj,Pe,Wn=l(()=>{"use strict";W();e_();cc();aj();dc();ii();R_();Fg();at();I_=new Set,qg={atMs:0,ids:[]},Vg=async()=>{if(Date.now()-qg.atMs<3e4)return qg.ids;let e=await Et({commands:me({})});return qg.atMs=Date.now(),qg.ids=e.installedWriterIds,e.installedWriterIds},pj=async(e,t,r)=>{let o=Y(e,t);if(o===null||r.aborted)return;let n=Ln(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(E(n.status)&&!s||n.status==="wizard_paused"||or(n))return;if(s){let c=await W_(n,r,d=>{Gg(e,d)});z(e,c);return}let i=await Zz(n,c=>{Gg(e,c)},r,c=>{Y(e,t)?.status==="stopped"||r.aborted||z(e,c)});if(!(Y(e,t)?.status==="stopped"||r.aborted)){if(z(e,i),E(i.status)){let c=await W_(i,r,d=>{Gg(e,d)});z(e,c);return}await pj(e,t,r)}},Pe=(e,t)=>{if(I_.has(t))return;let r=Y(e,t);if(r===null)return;let o=Ln(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(E(o.status)&&!n||o.status==="wizard_paused"||or(o))return;I_.add(t);let s=XD(t);pj(e,t,s).finally(()=>{I_.delete(t),ZD(t)})}});var So,yc=l(()=>{"use strict";v_();Fg();E_();Wn();So=(e,t)=>{let r=Ln(e,t);return Pe(e,r.id),`${Hg(r)}${Ug(r)}`}});var mj,gj,fj=l(()=>{"use strict";mj=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,gj=e=>e!==null&&e>0});var c7,d7,u7,hj,yj=l(()=>{"use strict";W();cc();Ig();tc();rc();ii();cg();cg();c7=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),d7=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ae(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},u7=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=te(o);return ni({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},hj=(e,t)=>{if(!Zl(e,t))return e;yo(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return Cn({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return go(d7(r));if(t==="wizard-3"){let n=o.splitOptions[0]??c7(o.templatedPrompt);return mo(r,n)}return t==="wizard-4"?u7(r):e}});var Kg,Sj,O_=l(()=>{"use strict";W();Ig();ii();Kg=e=>(yo(e.id),{...ni(e,"stopped"),errorMessage:HP}),Sj=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;yo(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var p7,Aj,bj,Pj=l(()=>{"use strict";W();cc();Ig();tc();rc();yc();at();Wn();fj();T_();yj();O_();p7="Pick a revision scored above 0 before continuing to Separate.",Aj=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),bj=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=Y(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=Y(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(So(e.storePath,d))};if(o==="wizard-stop-all"){let c=Kg(s);return z(e.storePath,c),Pe(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=Sj(s);return z(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=rj(s,c);return z(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=hj(s,c);return z(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&Pe(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",m=lw(s.wizard,d,c);m=Ml(m,d),m={...m,pendingStepInstructions:u};let S={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return z(e.storePath,S),Pe(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?Aj(s):Cn({...s,wizard:{...s.wizard,gate:null}});return z(e.storePath,m),Pe(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=mj(s,u??-1);if(!gj(m)){let f={...s,errorMessage:p7,updatedAt:new Date().toISOString()};return z(e.storePath,f),a(n),!0}let S=go({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return z(e.storePath,S),Pe(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let f=Aj(s);return z(e.storePath,f),Pe(e.storePath,n),a(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(f=>f.id===u);if(m===void 0){let f={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return z(e.storePath,f),a(n),!0}let S=mo(s,m);return z(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,m=d.modules[u];if(m===void 0)return a(n),!0;if(!Vs(s.costControls)){let A=t.get("confirmedTokenBudget")?.trim()??"",b=t.get("confirmedMaxSpendUsd")?.trim()??"";if(A.length===0){let w={...s,errorMessage:Bs,updatedAt:new Date().toISOString()};return z(e.storePath,w),a(n),!0}let h=Tr({existing:s.costControls,confirmedTokenBudget:Number(A),confirmedMaxSpendUsd:b.length===0?null:Number(b),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!h.ok){let w={...s,errorMessage:h.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,w),a(n),!0}s={...s,costControls:h.costControls,errorMessage:null,updatedAt:new Date().toISOString()},z(e.storePath,s)}let S=Tw({wizard:d,modulePrompt:m.prompt,posted:t});if(!S.ok){let A={...s,errorMessage:S.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,A),a(n),!0}let f={...d,parameterValues:S.parameterValues};if(m.status==="pending"){let A=Xz({...s,wizard:{...f,gate:null}},u);return z(e.storePath,A),Pe(e.storePath,n),a(n),!0}let y=u+1;if(y>=d.modules.length){let A=te(f),b=ni({...s,wizard:f},A.terminalStatusSuggestion);return z(e.storePath,b),Pe(e.storePath,n),a(n),!0}let p={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...f,gate:"optimize_modules",currentModuleIndex:y},updatedAt:new Date().toISOString()};return z(e.storePath,p),a(n),!0}}return a(n),!0}});var m7,wj,g7,M_,f7,_j,vj=l(()=>{"use strict";be();ii();O_();l_();kg();dc();at();m7="Add a score from 0 to 100 and the reason for it.",wj="Add a score from 1 to 100 and the reason for it.",g7="Write the next prompt.",M_="This step is not waiting for you.",f7=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},_j=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=Y(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(z(e.storePath,Kg(a)),{kind:"saved",cycleId:i}):QD(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=Y(e.storePath,r);if(o===null||!or(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:M_};if(t==="manual-judge"){if(o.judgeModel!==R)return{kind:"invalid",cycle:o,errorMessage:M_};let i=f7(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?wj:m7};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:wj};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",u=Cg(ic(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return z(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==R)return{kind:"invalid",cycle:o,errorMessage:M_};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:g7};let s=vg(o,n);return z(e.storePath,s),{kind:"saved",cycleId:o.id}}});var kj,Cj=l(()=>{"use strict";kj=`<script>
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
</script>`});var Tj,Lj=l(()=>{"use strict";Tj=`<script>
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
</script>`});var Ej,Wj=l(()=>{"use strict";Ej=`<script>
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
</script>`});var xj,Rj=l(()=>{"use strict";W();Be();xj=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:it(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(se(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!E(t.status)}}});var Ij,Oj=l(()=>{"use strict";Ij=`<script>
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
</script>`});var Mj,Nj=l(()=>{"use strict";W();mc();Og();Mj=e=>{let t=si(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:E(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=Rr(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=te(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=te(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return E(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var zj,Dj=l(()=>{"use strict";zj=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Ir,h7,y7,jj,$j=l(()=>{"use strict";Nj();Dj();pc();Ir=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),h7=e=>e.wizard===void 0?"legacy":"wizard",y7=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Ir(t)}">`,o=Mj(e),n=zj(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Ir(o.badgeClass)}">${Ir(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Ir(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Ir(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${h7(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Ir(e.id)}">${Ir(Wr(e.goal))}</a><p class="muted">${Ir(a)}</p></div></div><div class="sdlc-history-row-actions">${u}${m}</div></li>`},jj=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>y7(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Ir(s)}</summary>${i}</details>`:i}});var N_,Jg,Hj,S7,A7,Sc,Fj,Yg=l(()=>{"use strict";N_=g(require("node:fs")),Jg=g(require("node:path"));Be();Hj=/^[a-z0-9-]+$/,S7=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},A7=(e,t)=>{if(!Hj.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let m=S7(u[2]??"");u[1]==="name"&&m.length>0&&(o=m),u[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},Sc=e=>{let t=Lr(e);if(!t.ok)return[];let r=Jg.default.resolve(t.path,".cursor","skills"),o=[];try{o=N_.default.readdirSync(r)}catch{return[]}return o.filter(n=>Hj.test(n)).flatMap(n=>{let s=Jg.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${Jg.default.sep}`))return[];try{let i=A7(N_.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},Fj=(e,t)=>Sc(e).find(r=>r.fileName===t)??null});var Uj,b7,Bj,Gj,qj=l(()=>{"use strict";ho();Uj=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),b7=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),Bj=e=>{if(e.length===0)return`<div class="field">${de("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${Uj(r.fileName)}">${Uj(r.fileName)}</option>`).join("");return`<div class="field">${de("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${b7(e)}</script>`},Gj=`<script>
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
</script>`});var Ye,Vj,Kj=l(()=>{"use strict";W();jg();ec();ho();Ye=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vj=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=Ye(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=qs({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??Cr(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),m=_g({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",S=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${Ye(q.knobsSectionTitle)}</p>
  <p class="muted">${Ye(q.knobsSectionLede)}</p>
  <div class="field">
    ${de(q.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${de(q.maxSpendUsdLabel,"maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${o}" placeholder="Optional" data-sdlc-max-spend-usd>
    <p class="muted">${Ye(q.autoConfirmHint)}</p>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${n}>
      <span>${Ye(q.earlyStopLabel)}</span>
    </label>
    <p class="muted">${Ye(q.earlyStopHint)}</p>
  </div>
  <div class="sdlc-cost-estimate" data-sdlc-cost-estimate>
    <p class="sdlc-block-title">${Ye(q.estimateSectionTitle)}</p>
    <p class="muted">${Ye(q.estimateSectionLede)}</p>
    <dl class="sdlc-cost-proposal sdlc-cost-estimate-proposal">
      <div><dt>${Ye(q.targetTokenLabel)}</dt><dd data-sdlc-target-tokens data-sdlc-proposed-tokens>${a.targetTokenBudget.toLocaleString("en-US")}</dd></div>
      <div><dt>${Ye(q.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${a.estimatedSpendUsd.toFixed(4)}</dd></div>
      <div><dt>${Ye(q.rateChipLabel)}</dt><dd><span class="sdlc-cost-rate-chip" data-sdlc-writer-rate-chip data-writer-id="${Ye(S)}">$${c.toFixed(4)} / 1k \xB7 ${Ye(S)}</span></dd></div>
    </dl>
    <input type="hidden" name="targetTokenBudget" value="${a.targetTokenBudget}" data-sdlc-target-token-budget-input>
    <input type="hidden" name="estimatedSpendUsd" value="${a.estimatedSpendUsd}" data-sdlc-estimated-spend-input>
    <input type="hidden" name="rateUsdPer1kTokens" value="${c}" data-sdlc-cost-rate>
    <p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling${m}>${Ye(q.estimateOverCeilingWarn)}</p>
  </div>
</div>`}});var He,Jj,Yj,P7,Xj,Zj,Qj,e$=l(()=>{"use strict";W();y_();be();pc();mc();He=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Jj=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",Yj=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,P7=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},Xj=e=>e===R?"You":ie(e),Zj=e=>{let t=P7(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ie(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${He(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${He(t)}</dd></div>
      <div><dt>Judge</dt><dd>${He(Xj(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${He(Xj(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${He(r)}</dd></div>
    </dl>
  </details>`},Qj=e=>{let t=e.wizard;if(t===void 0)return"";let r=Wr(e.goal),o=e.status==="wizard_paused",n=!E(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=Ng(e),m=Yj(t),S=m===null?"":Jj(m),f=Rr(e),y=S.length===0?"":f===null||f>=4?` <strong>${He(S)}</strong>`:` <strong>${He(S)}</strong> (step ${f+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${He(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${He(u.title)}${y}</p>
    <p class="muted">${He(u.detail)}</p>
    <div class="actions">
      ${Zj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${He(e.id)}">Open this run</a>
    </div>
  </section>`}let s=Yj(t),i=s===null?"Wizard":Jj(s),a=Rr(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${He(r)}</h2>
    <p class="lede">Paused at <strong>${He(i)}</strong>${He(c)} (last updated ${He(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${Zj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${He(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Ac,t$,r$=l(()=>{"use strict";ho();Ac=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),t$=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${Ac(n.id)}"${n.id===e.runner?" selected":""}>${Ac(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Ac(e.runner)}">Checking ${Ac(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${de("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${de("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Ac(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var o$,n$=l(()=>{"use strict";o$=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var ai,s$,i$,a$,l$,c$=l(()=>{"use strict";ho();ai=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),s$=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${ai(c.id)}"${c.id===r?" selected":""}>${ai(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${ai(n)}</option>`;return`<div class="field">${de(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},i$=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${ai(t)}">Checking ${ai(o)}\u2026</p>`},a$=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${de(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${ai(r)}</textarea><span class="muted">${o}</span></div></details>`,l$=e=>{let t=`<div class="sdlc-writer">${s$("judge","Judge",e.judge,e.writers,"I'll score it")}${i$("judge",e.judge,e.writers)}${a$("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${s$("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${i$("improver",e.improver,e.writers)}${a$("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var d$,u$=l(()=>{"use strict";d$=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var z_,p$,m$=l(()=>{"use strict";u$();z_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p$=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${d$.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${z_(t.goal)}" title="${z_(t.goal)}">${z_(t.label)}</button>`).join("")}</div>`});var bc,w7,_7,D_,g$=l(()=>{"use strict";W();ho();bc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),w7=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},_7=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,D_=e=>{let t=w7(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=El(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${de(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${bc(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${bc(e.inputId)}" class="sdlc-pass-range" type="range" name="${bc(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${bc(a)}"><span class="sdlc-pass-mark" style="left:${_7(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${bc(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var k7,Or,f$,h$=l(()=>{"use strict";dc();v_();Cj();Lj();fg();Wj();Rj();Oj();$j();Yg();qj();ho();E_();Kj();e$();pc();r$();n$();c$();W();m$();g$();k7=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Or=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),f$=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Or(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Or(e.skillNotice??"")}</div>`,o=`${ez}${tz}`,n=e.resumableWizardCycle??null,s=n===null?"":Qj(n),i=Ug(e.cycle),a=e.cycle===null?"":Hg(e.cycle),c=e.cycle!==null&&or(e.cycle),d=xj(e),u=k7(d.goal,d.prompt,e.canRun),m=l$({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=t$({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),f=`${D_({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${D_({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=Vj({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),p=iw,A=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",b=e.cycle!==null&&E(e.cycle.status),h=d.running&&!b,w=b||h?"":" open",_=h?" sdlc-compose-run-focus":"",C=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${b?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,T=b?(()=>{let $=e.cycle!==null?Wr(e.cycle.goal):Wr(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Or($)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${C}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${C}</summary>`,x=b?" sdlc-compose-viewing-finished":"",I=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",M=c?"waiting":d.running?"running":"idle",U=d.running&&!c?' aria-busy="true"':"",K=`<section class="card sdlc-compose${x}${_}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${w}>
        ${T}
        <div class="sdlc-compose-details-body">
      <p class="lede">${p} ${Or(e.modelNote)}</p>
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
            ${de("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Or(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${Bj(Sc(d.folder))}
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
            ${de("Goal","goal")}
            ${p$()}
            <textarea class="input textarea" name="goal" rows="4" required>${Or(d.goal)}</textarea>
          </div>
          <div class="field">
            ${de("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Or(d.prompt)}</textarea>
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
        ${o$()}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${Or(d.passScore)}; Step 4 pass \u2265 ${Or(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${M}" data-can-run="${u?"true":"false"}"${U}${d.running?" disabled":""}>${I}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,G=e.history.length>0?Ij:"",Ge=`${""}${kj}${Tj}${Ej}${Gj}${G}`;return`${t}${r}${K}${s}${a}${i}${o}${jj(e.history,e.cycle?.id??null)}${Ge}`}});var Pc,j_=l(()=>{"use strict";h$();Pc=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:f$(t)}))}});var y$,S$=l(()=>{"use strict";vj();yc();j_();at();Wn();y$=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:_j({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=Y(e.storePath,o.cycleId);return Pe(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(So(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Pc(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:tr(e.storePath),resumableWizardCycle:null}),!0)}});var A$,Xg,$_=l(()=>{"use strict";W();A$=g(require("node:os")),Xg=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??A$.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??Mt()}}});var b$,li,H_,P$,w$,wc=l(()=>{"use strict";W();be();Xw();b$=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,li=e=>{let t=LN(e),r=bn(e).map(s=>({id:s,label:rg[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},H_=(e,t,r)=>t===R||t!==null&&e.writers.some(o=>o.id===t)?t:r,P$=(e,t,r,o=null)=>({judge:H_(e,t,e.judge),improver:H_(e,r,e.improver),runner:H_(e,o,e.runner)}),w$=e=>e===hg?{goal:yg,prompt:Sg}:{goal:"",prompt:""}});var F_,_$=l(()=>{"use strict";F_=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var v$,C7,k$,C$,T$,L$=l(()=>{"use strict";W();v$=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},C7=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},k$=(e,t)=>e.has("earlyStop")?!0:t!=="run",C$=e=>{let t=v$(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=C7(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=v$(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},T$=e=>Mt(e)});var E$,W$,Zg,U_=l(()=>{"use strict";W();be();Be();wc();_$();L$();E$=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=F_(o);return n.ok?String(n.passScore):String(r)},W$=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return F_(n)},Zg=e=>{let t=P$(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=E$(e.posted,"passScore",70),o=E$(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",m=e.posted?.get("intent")??"",S=e.posted===null?!0:k$(e.posted,m),f=(T,x)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:T,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:x,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:u,earlyStop:S});if(e.posted===null)return f(e.defaultFolder??Pn,null);let y=e.posted.get("folder")??Pn;if(e.posted.get("intent")==="choose-folder"){let T=e.pickFolder();return f(T===null?y:it(T),null)}if((e.posted.get("intent")??"")!=="run")return f(y,null);let A=b$(e.goal,e.prompt);if(A!==null)return f(y,A);let b=W$(e.posted,"passScore",r);if(!b.ok)return f(y,b.errorMessage);let h=W$(e.posted,"modulePassScore",o);if(!h.ok)return f(y,h.errorMessage);let w=EN(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(w===null)return f(y,"Choose a judge and an improver.");let _=Lr(y);if(!_.ok)return f(y,_.errorMessage);let k=WN(e.installedIds,c,w.judge);if(k===null)return f(y,"Choose a runner for wizard step 4.");let C=C$({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return C.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:w.judge,improver:w.improver,workingDirectory:_.path,passScore:b.passScore,modulePassScore:h.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:k,runnerInstructions:a,costControls:T$(C.knobs)}:f(y,C.errorMessage)}});var ci,ef,T7,B_,x$,Qg,R$,L7,I$,G_,E7,W7,x7,q_,O$,M$,N$=l(()=>{"use strict";ci=g(require("node:fs")),ef=g(require("node:path"));be();Be();T7=["remember","choose-folder","run"],B_=()=>({folder:Pn,judge:"",improver:"",runner:""}),x$=e=>ef.default.join(ef.default.dirname(e),"prompt-optimizer-preferences.json"),Qg=e=>typeof e=="string"?e:"",R$=e=>{let t=x$(e);if(!ci.default.existsSync(t))return B_();try{let r=JSON.parse(ci.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return B_();let o=r,n=Qg(o.folder).trim();return{folder:n.length===0?Pn:n,judge:Qg(o.judge),improver:Qg(o.improver),runner:Qg(o.runner)}}catch{return B_()}},L7=(e,t)=>{let r=x$(e);ci.default.mkdirSync(ef.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;ci.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),ci.default.renameSync(o,r)},I$=(e,t)=>e===R||bn(t).some(r=>r===e),G_=(e,t,r)=>e===null?t:e.length===0?"":I$(e,r)?e:t,E7=(e,t)=>{if(e===null)return t;let r=Lr(e);return r.ok?r.display:t},W7=e=>{let t=R$(e.storePath),r={folder:E7(e.folder,t.folder),judge:G_(e.judge,t.judge,e.installedIds),improver:G_(e.improver,t.improver,e.installedIds),runner:G_(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||L7(e.storePath,r)},x7=e=>{let t=Lr(e);return t.ok?t.display:Pn},q_=(e,t)=>I$(e,t)?e:"",O$=e=>{let t=R$(e.storePath);return{selection:{...e.selection,judge:q_(t.judge,e.installedIds)||e.selection.judge,improver:q_(t.improver,e.installedIds)||e.selection.improver,runner:q_(t.runner,e.installedIds)||e.selection.runner},defaultFolder:x7(t.folder)}},M$=e=>{let t=e.posted.get("intent")??"";if(!T7.includes(t))return;let r=e.posted.get("folder");W7({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var z$,R7,I7,V_,O7,tf,rf=l(()=>{"use strict";z$=g(require("node:os"));be();R_();kn();R7="Reply with the single word ok. Do not use tools.",I7=45e3,V_=async(e,t)=>{if(t===R)return{ok:!0,message:"You will do this step."};let r=dj(e,t);if(r!==null)return{ok:!0,message:r};let o=await Ke({writerAgent:t,prompt:R7,workingDirectory:z$.default.tmpdir(),timeoutMs:I7});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ie(t)} is ready.`;return uj(e,t,n),{ok:!0,message:n}},O7=e=>[...new Set(e.filter(t=>t.length>0))],tf=async(e,t,r,o)=>{for(let n of O7([t,r,o??""])){let s=await V_(e,n);if(!s.ok)return s.message}return null}});var K_,D$=l(()=>{"use strict";W();K_=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!E(r.status)&&!(t!==null&&r.id===t))return r;return null}});var j$,$$=l(()=>{"use strict";Jt();W();ec();yc();$_();U_();j_();at();Be();N$();Yg();rf();D$();Fg();Wn();j$=async e=>{let t=e.posted===null?O$({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Zg({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>ao("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(M$({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?it(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await tf(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await Pc(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:it(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:tr(e.route.storePath),resumableWizardCycle:K_(tr(e.route.storePath),null)});return}if(r.kind==="start"){let s=Fj(r.workingDirectory,r.sourceSkillFile),i=wg(Jl({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=Xg({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:Sw({...Ol(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(z(e.route.storePath,a),Pe(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(So(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:Y(e.route.storePath,e.cycleId);n!==null&&(n=Ln(e.route.storePath,n),Pe(e.route.storePath,n.id)),await Pc(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:tr(e.route.storePath),resumableWizardCycle:K_(tr(e.route.storePath),n?.id??null)})}});var H$,F$=l(()=>{"use strict";at();H$=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";dz(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var U$,B$=l(()=>{"use strict";U$=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var G$,q$=l(()=>{"use strict";yz();Pj();S$();$$();F$();wc();B$();Wn();G$=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await Vg(),o=li(r),n=e.method==="POST"?U$(e.request.headers["content-type"],await e.readBody(e.request)):null;if(bj({posted:n,storePath:e.storePath,response:e.response})||await y$(e,n,o))return;let s=w$(t.searchParams.get("example")),i=H$({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=hz({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await j$({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:fz(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var M7,V$,K$=l(()=>{"use strict";W();at();M7=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",V$=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=Y(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!E(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=Aw({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${M7(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var J$,Y$=l(()=>{"use strict";yc();at();J$=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:Y(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":So(e.storePath,o)),!0}});var N7,X$,Z$=l(()=>{"use strict";be();rf();N7=["claude-cli","codex","cursor","antigravity"],X$=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===R||N7.includes(t)?await V_(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var Q$,eH=l(()=>{"use strict";W();Q$=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:xl,page:Rl,context:Hs,installedWriters:e,post:{method:"POST",url:xl,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${xl}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var of,tH=l(()=>{"use strict";W();__();Qs();of=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ae(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=E(e.status),n=e.errorKind??null,s=$g({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:Er(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:Hs,page:`${Rl}?cycle=${encodeURIComponent(e.id)}`}}});var F,z7,rH,oH,nH=l(()=>{"use strict";F=g(Jn());W();z7=(0,F.isType)({goal:F.isString,prompt:F.isString,workingDirectory:F.isString,judge:(0,F.isUndefinedOr)(F.isString),improver:(0,F.isUndefinedOr)(F.isString),passScore:(0,F.isUndefinedOr)(F.isNumber),maxRounds:(0,F.isUndefinedOr)(F.isNumber),maxTrials:(0,F.isUndefinedOr)(F.isNumber),maxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),earlyStop:(0,F.isUndefinedOr)(F.isBoolean),earlyStopFlatRounds:(0,F.isUndefinedOr)(F.isNumber),confirmedTokenBudget:(0,F.isUndefinedOr)(F.isNumber),confirmedMaxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),rateUsdPer1kTokens:(0,F.isUndefinedOr)(F.isNumber)}),rH=e=>{let t=e?.trim()??"";return t.length===0?null:t},oH=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return z7(t)?t.workingDirectory.trim().length===0?{ok:!1,error:Fm}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:rH(t.judge),improver:rH(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:Fm}}});var Mr,D7,sH,iH,aH=l(()=>{"use strict";W();Mr=g(Jn()),D7=(0,Mr.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:Mr.isNumber,confirmedMaxSpendUsd:(0,Mr.isUndefinedOr)(Mr.isNumber),rateUsdPer1kTokens:(0,Mr.isUndefinedOr)(Mr.isNumber)}),sH=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:D7(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},iH=(e,t)=>{let r=Tr({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var j7,lH,cH=l(()=>{"use strict";W();be();U_();wc();j7=e=>e.map(t=>t.id).join(", "),lH=e=>{let t=li(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===R||n===R)return{ok:!1,error:sw,installedWriters:t.writers};if(o===null||n===null){let a=j7(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=Zg({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var $7,dH,uH=l(()=>{"use strict";W();$_();eH();tH();wc();nH();aH();cH();at();$7=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},dH=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let u=Y(e.storePath,t);return u===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:of(u)}}let r=await e.handlers.readInstalledIds(),o=li(r);if(e.method==="GET")return{status:200,body:Q$(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let u=sH(e.rawBody);if(u.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(u.kind==="invalid")return{status:400,body:{ok:!1,error:u.error}};let m=Y(e.storePath,t);if(m===null)return{status:404,body:{ok:!1,error:"That run is not on this Mac."}};let S=iH(m,u.body);return S.ok?(z(e.storePath,S.cycle),{status:200,body:of(S.cycle)}):{status:400,body:{ok:!1,error:S.error}}}let n=$7(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let u=qs({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:u.targetTokenBudget,proposedTokenBudget:u.targetTokenBudget,estimatedSpendUsd:u.estimatedSpendUsd,rateUsdPer1kTokens:u.rateUsdPer1kTokens??null,proposalStub:u.stub===!0,confirmationRequired:!0}}}let s=oH(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=lH({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=Jl({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:st({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let u=Tr({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!u.ok)return{status:400,body:{ok:!1,error:u.errorMessage}};c=u.costControls}let d=Xg({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:Ol(i.prompt),runnerModel:i.runner,costControls:c});return z(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:of(d)}}});var pH,mH=l(()=>{"use strict";Wn();rf();uH();pH=async e=>{let t=await dH({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:Vg,readWritersReady:tf,startCycle:Pe}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var fH,H7,F7,gH,U7,hH,yH=l(()=>{"use strict";fH=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],H7=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},F7=e=>{let t={};for(let n of e)for(let s of new Set(fH(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},gH=(e,t)=>{let r=H7(fH(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},U7=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},hH=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=F7(e.map(i=>i.text)),s=gH(o,n);return e.map(i=>({id:i.id,score:U7(s,gH(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var J_,B7,G7,SH,q7,V7,K7,J7,Y_,X_=l(()=>{"use strict";J_=g(require("node:path"));Be();yH();Yg();B7=5,G7=20,SH=280,q7=e=>[e.name,e.description,e.promptText].join(`
`),V7=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=SH?t:`${t.slice(0,SH-3)}...`},K7=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),J7=e=>e===void 0||!Number.isFinite(e)?B7:Math.min(G7,Math.max(1,Math.floor(e))),Y_=e=>{let t=e.query.trim(),r=J7(e.limit),o=Lr(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=Sc(o.path),s=hH(n.map(d=>({id:d.fileName,text:q7(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=J_.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:J_.default.join(a,u.fileName,"SKILL.md"),excerpt:V7(u),source:"filesystem"}]});return{query:t,hits:c,context:K7(c)}}});var AH,bH=l(()=>{"use strict";X_();AH=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:Y_({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var PH,wH=l(()=>{"use strict";bH();PH=async e=>{let t=AH({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var Y7,Z_,_H=l(()=>{"use strict";nz();q$();K$();Y$();Z$();mH();wH();Y7=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},Z_=async e=>{let t=Y7(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await pH(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await PH(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:oz()})),!0):(await X$({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||V$({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||J$({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await G$(e),!0)}});var vH=l(()=>{"use strict";_H();X_();kn()});var xn,_c,X7,Z7,Q7,e9,kH,CH=l(()=>{"use strict";xn=g(require("node:fs")),_c=g(require("node:path")),X7="prompt-optimizer-cycles.json",Z7="prompt-optimizer-preferences.json",Q7="prompt-sdlc-cycles.json",e9="prompt-sdlc-preferences.json",kH=e=>{let t=_c.default.join(e,X7),r=_c.default.join(e,Q7);if(xn.default.existsSync(t)||!xn.default.existsSync(r))return t;try{xn.default.renameSync(r,t)}catch{return r}let o=_c.default.join(e,e9),n=_c.default.join(e,Z7);if(xn.default.existsSync(o)&&!xn.default.existsSync(n))try{xn.default.renameSync(o,n)}catch{}return t}});var di,t9,Q_,TH=l(()=>{"use strict";di=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),t9=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],Q_=e=>{let t=t9.map(i=>`<option value="${di(i.value)}">${di(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${di(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${di(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${di(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${di(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var vc,WH,r9,xH,o9,n9,RH,sf,LH,EH,s9,i9,Nr,kc,nf,a9,af,ev,l9,tv,IH,rv,OH,c9,d9,u9,MH,NH,zH,Cc=l(()=>{"use strict";vc=g(require("node:fs")),WH=g(require("node:path")),r9="estimate-history.ndjson",xH=100,o9=500,n9=2e4,RH=e=>WH.default.join(e,r9),sf=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,o9),LH=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,n9),EH=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,s9=e=>({...e,estimateTokens:EH(e.estimateTokens),actualTokens:EH(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),i9=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Nr=e=>{let t=RH(e);return vc.default.existsSync(t)?vc.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return i9(n)?[s9(n)]:[]}catch{return[]}}):[]},kc=(e,t)=>{vc.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;vc.default.writeFileSync(RH(e),r,"utf8")},nf=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),a9=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${nf(o.task)} | ${nf(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},af=e=>{let t=Nr(e.reportsDir),r=sf(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);kc(e.reportsDir,[...s,n])},ev=e=>{let t=Nr(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?sf(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);kc(e.reportsDir,[...i,s])},l9=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-xH),tv=e=>[...Nr(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),IH=e=>{let t=Nr(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=LH(e.input),n=LH(e.output),s=sf(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);kc(e.reportsDir,[...c,a])},rv=(e,t)=>{let r=Nr(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},OH=e=>({table:a9(l9(Nr(e))),embedding:null}),c9=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},d9=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-xH),u9=e=>{let t=c9(d9(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${nf(s.task)} | ${nf(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},MH=e=>{let t=Nr(e.reportsDir),r=sf(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);kc(e.reportsDir,[...s,n])},NH=e=>{let t=Nr(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);kc(e.reportsDir,[...s,n])},zH=e=>u9(Nr(e))});var DH=l(()=>{"use strict";Cc()});var zr,ov,p9,nv,m9,g9,lf,cf,f9,sv,jH=l(()=>{"use strict";DH();Kw();zr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ov=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},p9=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${ov(-r)} under`:`${ov(r)} over`},nv=e=>e.toLocaleString("en-US"),m9=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${nv(-r)} under`:`${nv(r)} over`},g9=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},lf=e=>e===null?"\u2014":ov(e),cf=e=>e===null?"\u2014":nv(e),f9=`(function () {
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
})();`,sv=e=>{let r=tv(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":p9(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":m9(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${zr(g9(i))}</button></td>
        <td>${zr(c)}</td>
        <td>${lf(n.estimateSeconds)}</td>
        <td>${lf(n.actualSeconds)}</td>
        <td>${zr(d)}</td>
        <td>${cf(n.estimateTokens)}</td>
        <td>${cf(n.actualTokens)}</td>
        <td>${zr(u)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${zr(c)}</p>
        <h2>Input</h2>
        <pre>${zr(i)}</pre>
        <h2>Output</h2>
        <pre>${zr(a)}</pre>
        <p>Time: estimated ${lf(n.estimateSeconds)} \xB7 actual ${lf(n.actualSeconds)} \xB7 ${zr(d)}</p>
        <p>Tokens: estimated ${cf(n.estimateTokens)} \xB7 actual ${cf(n.actualTokens)} \xB7 ${zr(u)}</p>
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
            ${dg({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${f9}</script>`}
    </section>`}});var $H=l(()=>{"use strict";TH();jH()});var ui,h9,y9,iv,HH=l(()=>{"use strict";ui=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),h9=(e,t,r)=>{let o=ui(t),n=ui(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},y9=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${ui(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>h9(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${ui(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${ui(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${ui(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},iv=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(y9).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var FH=l(()=>{"use strict";HH()});var Tc,UH,BH,av,lv,cv,GH=l(()=>{"use strict";Tc=g(require("node:fs")),UH=g(require("node:path"));Al();Lm();BH=(e,t,r)=>Os({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,av=(e,t,r)=>{let o=BH(e,t,r);if(o===null)return[];if(!Tc.default.existsSync(o))return[];let n=Tc.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},lv=e=>{let t=BH(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:_r(e.entry.prompt),output:_r(e.entry.output)};Tc.default.mkdirSync(UH.default.dirname(t),{recursive:!0}),Tc.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},cv=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var S9,A9,Lc,df,dv=l(()=>{"use strict";S9=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),A9=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Lc=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=S9(i.assistantOutput),d=c.length>0?`Assistant: ${A9(c,t)}`:null,u=[a,d].filter(m=>m!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},df=e=>{let t=e.userMessage.trim(),r=Lc({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var sr,Ec,mv,b9,P9,uv,w9,gv,uf,qH,VH,_9,pi,fv,pv,KH,v9,JH,mi,pf,Wc,k9,xc,hv,mf,gf,YH=l(()=>{"use strict";sr=g(require("node:fs")),Ec=g(require("node:path")),mv=require("node:crypto");dv();b9="writer-sessions",P9="active-index.json",uv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),w9=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",gv=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},uf=e=>{let t=Ec.default.join(e.installDir,b9);return sr.default.mkdirSync(t,{recursive:!0}),t},qH=e=>Ec.default.join(uf(e),P9),VH=(e,t)=>Ec.default.join(uf(e),`${t}.canonical.json`),_9=(e,t)=>Ec.default.join(uf(e),`${t}.continuation.json`),pi=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,fv=e=>{let t=qH(e);if(!sr.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(sr.default.readFileSync(t,"utf8"));if(!uv(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!uv(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!w9(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},pv=(e,t)=>{sr.default.writeFileSync(qH(e),JSON.stringify(t,null,2))},KH=(e,t)=>{sr.default.writeFileSync(VH(e,t.sessionId),JSON.stringify(t,null,2))},v9=(e,t)=>{sr.default.writeFileSync(_9(e,t.sessionId),JSON.stringify(t,null,2))},JH=(e,t)=>{let r=Lc({turns:t.turns});v9(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},mi=(e,t)=>{let r=VH(e,t);if(!sr.default.existsSync(r))return null;try{let o=JSON.parse(sr.default.readFileSync(r,"utf8"));return!uv(o)||typeof o.sessionId!="string"?null:o}catch{return null}},pf=(e,t=20)=>{let r=uf(e),o=sr.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=mi(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Wc=(e,t,r)=>{let o=gv(r);return fv(e).entries.find(i=>pi(i)===pi({writerAgent:t,projectFolderPath:o}))?.sessionId??null},k9=(e,t,r,o)=>{let n=fv(e),s=pi({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>pi(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];pv(e,{entries:i})},xc=(e,t,r)=>{let o=(0,mv.randomUUID)(),n=new Date().toISOString(),s=gv(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return KH(e,i),JH(e,i),k9(e,t,s,o),o},hv=(e,t,r)=>{let o=Wc(e,t,r);return o!==null?o:xc(e,t,r)},mf=(e,t,r)=>{let o=gv(r),n=fv(e);if(o===null&&r===void 0){pv(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=pi({writerAgent:t,projectFolderPath:o});pv(e,{entries:n.entries.filter(i=>pi(i)!==s)})},gf=e=>{let t=hv(e.layout,e.writerAgent,e.projectFolderPath),r=mi(e.layout,t);if(r===null)return;let o={id:(0,mv.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};KH(e.layout,n),JH(e.layout,n)}});var C9,T9,ff,yv,XH=l(()=>{"use strict";C9=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",T9=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},ff=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",yv=e=>{let t=ff(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=C9(r,e.userPromptCharacterCount),n=T9({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var hf=l(()=>{"use strict";GH();YH();dv();XH()});var ZH=l(()=>{"use strict";sp();ps();RS()});var QH=l(()=>{"use strict";iS()});var Xe,E9,W9,Sv,Av,bv,eF=l(()=>{"use strict";ZH();QH();Xe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),E9=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},W9=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=ka(o);return`value="${Xe(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${Xe(r)}"`},Sv=(e,t,r,o,n)=>{let s=ip[t];return`<label class="field">
          <span class="field-label">${Xe(o)} API key \u2014 ${Xe(E9(e,t))} \xB7 <a class="field-link" href="${Xe(s.href)}" target="_blank" rel="noopener noreferrer">${Xe(s.label)}</a></span>
          <input class="input mono" type="password" name="${Xe(r)}" autocomplete="off" ${W9(e,t,n)} />
        </label>`},Av=(e,t,r,o)=>{let n=Xu(e[t]?.model),s=new Set(Yu[t].map(c=>c.value)),i=Yu[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${Xe(c.value)}"${d}>${Xe(c.label)}</option>`}).join(""),a=n!==qo&&!s.has(n)?`<option value="${Xe(n)}" selected>${Xe(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${Xe(o)}</span>
          <select class="input mono" name="${Xe(r)}">${i}${a}</select>
        </label>`},bv=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Xe(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${Sv(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${Av(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${Sv(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${Av(e.secrets,"openai","openaiModel","OpenAI model")}
        ${Sv(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${Av(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var tF=l(()=>{"use strict";eF()});var yf,rF,oF=l(()=>{"use strict";yf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rF=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${yf(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${yf(s.name)}</strong> <span class="muted mono">(${yf(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${yf(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var x9,nF,sF,iF=l(()=>{"use strict";x9=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,nF=e=>e.kind==="folder",sF=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&nF(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if(nF(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(x9)};return r(t)}});var aF,Pv,lF=l(()=>{"use strict";aF=g(require("node:path")),Pv=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Pv(r.children,t)}</ul>
            </details>
          </li>`;let o=aF.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var cF,Ao,R9,I9,Rc,O9,wv,dF=l(()=>{"use strict";Im();cF=g(require("node:path"));oF();iF();lF();Ao=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),R9=()=>`(() => {
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

})();`,I9=()=>`(() => {
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
})();`,Rc=e=>{let t=vl({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=rF({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Ao(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ao(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':O9(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Ao(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Ao(s)}" />
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
    <script>${R9()}</script>
    <script>${I9()}</script>`;return`${t}${r}${o}${c}${d}`},O9=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=sF(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:cF.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),u=Pv(d,Ao),m=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Ao(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Ao(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${u}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Ao(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},wv=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=a.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??u??a,S=t.sets[i];if(S===void 0)continue;let f=a.length>0?a:S.proposedSlug,y=m.length>0?m:S.proposedName,p=r.has(i),A=S.items.map(b=>({id:b.id,kind:b.kind,title:b.title,sourcePath:b.sourcePath,include:p}));s.push({slug:f,name:y,items:A})}return s}});var uF=l(()=>{"use strict";dF()});var M9,_v,pF=l(()=>{"use strict";Pr();M9=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[ze]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},_v=M9});var N9,mF,gF=l(()=>{"use strict";Pr();N9=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[ze]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},mF=N9});var fF=l(()=>{"use strict"});var Rn,z9,vv,hF=l(()=>{"use strict";Im();$A();Rn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),z9=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,vv=e=>{let t=e.flashError?`<div class="alert-error">${Rn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Rn(e.flashMessage)}</div>`:"",r=vl({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Rn(z9(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${Rn(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=Kp(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${Rn(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Rn(n.name)}</strong>
                  <span class="muted mono">${Rn(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${u}${m}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var yF=l(()=>{"use strict";fF();HA();hF()});var Sf,SF=l(()=>{"use strict";Sf=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var AF,Dt,kv=l(()=>{"use strict";AF=g(require("node:path"));_t();qe();X();ge();WA();Dt=e=>{let t=H()?.layout.installDir??L();if(AF.default.basename(t)===Ht)return wt;let r=H(),o=r!==null?ke(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):wt}});var Cv,bF=l(()=>{"use strict";Gt();kv();Cv=async e=>{let t=Me(e.installDir),r=t?.bundleVersion??null,o=Dt(t);try{let n=await as(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:jo(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Tv,PF=l(()=>{"use strict";Tv=e=>!e});var Lv,gi,Ev=l(()=>{"use strict";X();Lv=()=>`http://127.0.0.1:${ay()}/update/run`,gi=async e=>{try{let t=await fetch(Lv(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var D9,wF,Wv,_F=l(()=>{"use strict";X();ne();Ev();D9=()=>{gr({launchAgentLabel:ve(),installDir:L()})},wF=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Wv=async()=>{D9();let e=await gi({force:!0});if(e.ok)return{ok:!0,message:wF(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:wF(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Gt(),zE)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var xv=l(()=>{"use strict";IP();SF();kv();bF();PF();_F();Ev()});var vF,kF=l(()=>{"use strict";vF=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var CF,TF,Rv,Iv,LF=l(()=>{"use strict";CF=require("node:crypto"),TF=g(require("node:fs"));Jt();ge();ge();kF();Rv=!1,Iv=async e=>{if(Rv)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!vF(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=H();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&TF.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,CF.randomUUID)();Rv=!0;try{if(await xA(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await gs({...r,workspace:n},e.writerAgent,t);return await Ga(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Rv=!1}}});var EF=l(()=>{"use strict";LF()});var gt,j9,WF,xF,Ov,Mv,Nv,zv,Dv,jv,$v=l(()=>{"use strict";gt=require("node:crypto"),j9=Buffer.from("302a300506032b6570032100","hex"),WF=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},xF=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,gt.createPublicKey)({key:Buffer.concat([j9,t]),format:"der",type:"spki"})},Ov=()=>{let{publicKey:e,privateKey:t}=(0,gt.generateKeyPairSync)("ed25519");return{publicKeyRaw:WF(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Mv=e=>(0,gt.createPrivateKey)(e),Nv=(e,t)=>(0,gt.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),zv=(e,t,r)=>{try{let o=xF(e);return(0,gt.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},Dv=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,jv=()=>(0,gt.randomBytes)(32).toString("base64url")});var Dr,Af,RF,$9,H9,bf,Hv,Fv,IF=l(()=>{"use strict";Dr=g(require("node:fs")),Af=g(require("node:path"));$v();X();qe();RF=e=>Af.default.join(e.installDir,Vr),$9=(e,t)=>{if(e.profileEmail===null||t===RF(e)||Dr.default.existsSync(t))return;let r=RF(e);Dr.default.existsSync(r)&&(Dr.default.mkdirSync(Af.default.dirname(t),{recursive:!0}),Dr.default.renameSync(r,t))},H9=e=>{if(!Dr.default.existsSync(e))return null;try{let t=Dr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},bf=e=>{let t=vu(e);$9(e,t);let r=H9(t);if(r!==null)return r;let o=Ov();return Dr.default.mkdirSync(Af.default.dirname(t),{recursive:!0}),Dr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},Hv=e=>{let t=bf(e.layout),r=jv(),o=Dv({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=Mv(t.privateKeyPem),s=Nv(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Fv=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return zv(e.serverPublicKey,t,e.serverAttestation)}});var Uv=l(()=>{"use strict";IF();$v()});var zF,Ic,qv,Vv,OF,F9,Bv,Pf,ue,DF,U9,Gv,B9,G9,Kv,fe,Re,ir,q9,MF,NF,Oc,Mc,jF=l(()=>{"use strict";zF=g(require("node:http")),Ic=g(require("node:fs")),qv=g(require("node:path"));wf();hl();FI();BI();YI();ks();aP();xP();kO();TO();vH();CH();$H();FH();hf();tF();uF();Zo();Jt();Pr();pF();gF();yF();xv();Gt();EF();ge();Uv();Vv=e=>Jb(e)??"never",OF=48e3,F9=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,Bv=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Op(),reveal:t.reveal,installed:so(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Pf=async e=>{let t=H();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:Ps(t,e)},ue=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DF=200,U9=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',Gv=e=>{let t=e.trim().slice(0,DF),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},B9=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ue(t)}</div>`,G9=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ue(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',Kv={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},fe=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...Kv}),e.end(JSON.stringify(r))},Re=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},ir=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},q9=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=U9(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${ue(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=Tv(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${yl(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ue(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ue(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ue(Vv(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ue(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},MF=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},NF=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,DF)},Oc=e=>{let t=qv.default.join(e.layout.installDir,"link-code.txt"),r=()=>Me(e.layout.installDir),o=()=>{let f=r();return{installBundleVersion:Sf(f),installBundleUpdatedAt:f?.updatedAt??null,installVersion:f}},n=async f=>{let y=f.installVersion??r(),p=await i(),A=zP(p),b=f.updateFlash??null,h=DP(b),w=B9(b,f.updateError??null);return MP({title:f.title,activePath:f.activePath,body:f.body,cloudAppOrigin:Dt(y),installBundleVersionLabel:Sf(y),prependBody:`${h}${w}${A}`,headerUpdateButtonHtml:NP(p)})},s=null,i=async()=>{let f=Date.now();if(s!==null&&f-s.cachedAtMs<6e4)return s.offer;let y=await Cv(e.layout);return s={cachedAtMs:f,offer:y},y},a=()=>{s=null},c=!1,d=async f=>{if(a(),!(await i()).updateAvailable){f.writeHead(303,{Location:"/?update=ok"}),f.end();return}if(c){f.writeHead(303,{Location:Gv("An update is already running.")}),f.end();return}c=!0;try{let p=await Wv(),A=p.ok?"/?update=ok":Gv(p.message);f.writeHead(303,{Location:A}),f.end()}catch(p){let A=p instanceof Error&&p.message.trim().length>0?p.message:"Install bundle update failed.";f.writeHead(303,{Location:Gv(A)}),f.end()}finally{c=!1,a()}},u=async(f,y)=>{let p=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",A=o(),b=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:A.installVersion,body:`<section class="card">
      <h1>${ue(y)}</h1>
      <p>${ue(p)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});f.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),f.end(b)},m=()=>{if(Ic.default.existsSync(t))return Ic.default.readFileSync(t,"utf8").trim();let f=Math.random().toString(36).slice(2,8).toUpperCase();return Ic.default.writeFileSync(t,f,"utf8"),f},S=zF.default.createServer((f,y)=>{(async()=>{let p=f.url?.split("?")[0]??"/",A=f.method??"GET";if(A==="OPTIONS"){y.writeHead(204,Kv),y.end();return}if(!await Z_({method:A,pathname:p,request:f,response:y,requestUrl:f.url??"/",storePath:kH(qv.default.dirname(e.layout.configPath)),readBody:ir,sendHtml:Re,renderShell:n})){if(A==="GET"&&p==="/health"){let b=e.controllers.getStatus(),h=o();fe(y,200,{ok:!0,...b,installBundleVersion:h.installBundleVersion,installBundleUpdatedAt:h.installBundleUpdatedAt});return}if(A==="GET"&&p==="/api/status"){let b=o();fe(y,200,{...e.controllers.getStatus(),linkCode:m(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt});return}if(A==="GET"&&p==="/api/traffic"){fe(y,200,{entries:gl(e.layout)});return}if(A==="DELETE"&&p==="/api/traffic"||A==="POST"&&p==="/api/traffic/clear"){if(Zb(e.layout),A==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}fe(y,200,{ok:!0});return}if(A==="GET"&&p==="/api/trace"){fe(y,200,{entries:vm(e.layout)});return}if(A==="DELETE"&&p==="/api/trace"||A==="POST"&&p==="/api/trace/clear"){if(tP(e.layout),A==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}fe(y,200,{ok:!0});return}if(A==="POST"&&p==="/api/errors/clear"){rP(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(A==="GET"&&p==="/api/knowledge"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(h.length>0){let w=await Ns({layout:e.layout,query:h,limit:20});fe(y,200,{chunks:w,query:h});return}fe(y,200,{chunks:Ms(e.layout).slice(-50).reverse()});return}if(A==="POST"&&p==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(A==="GET"&&p==="/api/update-status"){let b=await i();fe(y,200,{ok:!0,...b});return}if((A==="GET"||A==="POST")&&p==="/api/update"){await d(y);return}if(A==="GET"&&p==="/"){let b=e.controllers.getStatus(),h=o(),w=so(e.layout),_=km(e.layout.errorLogPath);Re(y,await n({title:"Home",activePath:"/",installVersion:h.installVersion,updateFlash:MF(f.url??void 0),updateError:NF(f.url??void 0),body:jP({wsConnected:b.wsConnected,lastHeartbeatAt:b.lastHeartbeatAt,installBundleVersion:h.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:Ms(e.layout).length,trafficEntryCount:gl(e.layout).length,wakeError:b.wakeError,errorLogByteSize:_.byteSize,errorLogExists:_.exists})}));return}if(A==="GET"&&p==="/task"){let b=e.controllers.getStatus(),h=o(),w=H(),_=new URL(f.url??"/",`http://127.0.0.1:${43347}`),k=_.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,C=_.searchParams.get("failed")==="1"?_.searchParams.get("error")?.trim()??"Task failed.":null,T=_.searchParams.get("runId");Re(y,await n({title:"Task",activePath:"/task",installVersion:h.installVersion,body:Q_({defaultWorkspace:w?.workspace??"",wsConnected:b.wsConnected,flashMessage:k,flashError:C,lastRunId:T})}));return}if(A==="POST"&&p==="/task/dispatch"){let b=await ir(f),h=new URLSearchParams(b),w=h.get("prompt")?.trim()??"",_=h.get("writerAgent")?.trim()??"claude-cli",k=h.get("projectFolder")?.trim()??"",C=await Iv({prompt:w,writerAgent:_,...k.length>0?{projectFolderPath:k}:{}}),T=new URLSearchParams;C.ok?T.set("ok","1"):(T.set("failed","1"),C.errorMessage!==void 0&&T.set("error",C.errorMessage.slice(0,240))),C.agentRunId!==void 0&&T.set("runId",C.agentRunId),y.writeHead(303,{Location:`/task?${T.toString()}`}),y.end();return}if(A==="GET"&&p==="/writer-sessions"){let b=o(),h=pf(e.layout,12);Re(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:b.installVersion,updateFlash:MF(f.url??void 0),updateError:NF(f.url??void 0),body:iv({sessions:h})}));return}if(A==="GET"&&p==="/errors"){let b=o(),h=km(e.layout.errorLogPath);Re(y,await n({title:"Errors",activePath:"/errors",installVersion:b.installVersion,body:nP({errorLogPath:e.layout.errorLogPath,content:h.content,exists:h.exists,truncated:h.truncated,byteSize:h.byteSize,cleared:new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(A==="GET"&&p==="/status"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=e.controllers.getStatus(),w=Le(e.layout),_=w!==null?Ue(w,12e4):lP(h.lastHeartbeatAt,12e4),k=cP({lastHeartbeatAt:h.lastHeartbeatAt,heartbeatIsStale:_}),C=o();Re(y,await n({title:"Status",activePath:"/status",installVersion:C.installVersion,body:`${q9({status:h,healthBadge:k,revived:b.searchParams.get("revived")==="1",linkCode:m(),installBundleVersion:C.installBundleVersion,installBundleUpdatedAt:C.installBundleUpdatedAt})}${pP({installDir:e.layout.installDir})}${uP({entries:vm(e.layout)})}`}));return}if(A==="GET"&&p==="/traffic"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=gl(e.layout),w=o(),_=h.map(T=>`<tr><td title="${ue(T.at)}">${ue(Vv(T.at))}</td><td>${ue(T.direction)}</td><td><code>${ue(T.type)}</code></td><td>${ue(T.summary)}</td><td>${ue(T.action??"")}</td></tr>`).join(""),k=h.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${_}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',C=b.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Re(y,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${C}
              ${k}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(A==="GET"&&p==="/projects"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=o(),w=Dt(h.installVersion),_=await Pf(e.layout),k=b.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":b.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,C=b.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,T=H(),x=T===null?null:Z({wsUrl:T.wsUrl,pairingToken:T.pairingToken}),I=x===null?{}:Object.fromEntries((await Promise.all(_.projects.map(async M=>{let U=await _v(x,M.id);return[M.id,U?.counts??null]}))).filter(M=>M[1]!==null));Re(y,await n({title:"Projects",activePath:"/projects",installVersion:h.installVersion,body:vv({projects:_.projects,compositionCountsByProjectId:I,cloudAppOrigin:w,syncMessage:_.message,syncOk:_.ok,flashMessage:C,flashError:k})}));return}if(A==="GET"&&p==="/projects/select-folder"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=H(),_=w===null?null:Z({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),k=h.length>0&&_!==null?ao():null;if(k===null||_===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(rt({projectFolderPath:k}),!await Ja(_,h,k)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(h)}&folderUpdated=1`}),y.end();return}if(A==="POST"&&p==="/projects/delete"){let b=await ir(f),h=new URLSearchParams(b).get("projectId")?.trim()??"",w=H(),_=w===null?null:Z({wsUrl:w.wsUrl,pairingToken:w.pairingToken});if(_===null||h.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let k=await YA(_,h);y.writeHead(303,{Location:k.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(A==="GET"&&p==="/project"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=b.searchParams.get("id")?.trim()??"",w=o(),_=Dt(w.installVersion),k=await Pf(e.layout),C=rn(k.projects,h);if(C===null){await u(y,"Project not found");return}let T=b.searchParams.get("linked")==="1"?b.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${b.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${b.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:b.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,x=b.searchParams.get("knowledgePromoted"),I=x!==null?`Marked ${x} lesson(s) as promoted in Agent Witch.`:null,M=b.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,U=b.searchParams.get("tab")?.trim()??"harness",K=U==="workflows"||U==="agents"||U==="knowledge"?U:"harness",G=H(),Ge=G===null?null:Z({wsUrl:G.wsUrl,pairingToken:G.pairingToken}),$=Ge===null?null:await _v(Ge,C.id),_e=0;if(Ge!==null)try{let qr=await fetch(`${Ge.appOrigin}/api/agent-witch/projects/${encodeURIComponent(C.id)}/knowledge`,{method:"GET",headers:{[ze]:Ge.pairingToken},signal:AbortSignal.timeout(1e4)});if(qr.ok){let cr=await qr.json();typeof cr=="object"&&cr!==null&&typeof cr.candidateCount=="number"&&(_e=cr.candidateCount)}}catch{_e=0}Re(y,await n({title:C.name,activePath:"/projects",installVersion:w.installVersion,body:ws({project:C,cloudAppOrigin:_,installed:so(e.layout),linkedSetSlugs:oo(C.projectFolderPath),composition:$,knowledgeCandidateCount:_e,activeTab:K,flashMessage:T??I,flashError:M})}));return}if(A==="POST"&&p==="/projects/pull-bound-harness"){let b=await ir(f),h=await FA({rawBody:b,layout:e.layout});if(h.kind==="not_found"){await u(y,"Project not found");return}if(h.kind==="redirect"){y.writeHead(303,{Location:h.location}),y.end();return}let w=o();Re(y,await n({title:h.title,activePath:"/projects",installVersion:w.installVersion,body:h.body}));return}if(A==="POST"&&p==="/projects/link-harness"){let b=await ir(f),h=new URLSearchParams(b),w=h.get("projectId")?.trim()??"",_=await Pf(e.layout),k=rn(_.projects,w);if(k===null){await u(y,"Project not found");return}let C=h.getAll("applySet").map(K=>String(K)),T=Na({layout:e.layout,projectFolderPath:k.projectFolderPath,setSlugs:C});if(!T.ok){let K=o(),G=Dt(K.installVersion);Re(y,await n({title:k.name,activePath:"/projects",installVersion:K.installVersion,body:ws({project:k,cloudAppOrigin:G,installed:so(e.layout),linkedSetSlugs:oo(k.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:T.errorMessage})}));return}let x=H(),I=x===null?null:Z({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),M=I===null?!1:await Va(I,k.id,T.appliedSetSlugs),U=new URLSearchParams({linked:"1",files:String(T.writtenFileCount),bindingsSynced:M?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(k.id)}&${U.toString()}`}),y.end();return}if(A==="POST"&&p==="/project/knowledge/promote-all"){let b=await ir(f),w=new URLSearchParams(b).get("projectId")?.trim()??"",_=await Pf(e.layout),k=rn(_.projects,w);if(k===null){await u(y,"Project not found");return}let C=H(),T=C===null?null:Z({wsUrl:C.wsUrl,pairingToken:C.pairingToken}),x=T===null?{ok:!1,promotedCount:0}:await mF(T,k.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(k.id)}&${I.toString()}`}),y.end();return}if(A==="GET"&&p==="/harness"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=o(),w=$a(e.layout),_=b.searchParams.get("submitted")==="1",k=_?b.searchParams.get("syncFailed")==="1"?`Local harness updated (${b.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:b.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${b.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":b.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:b.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,C=w?.scanRoots[0]??Op(),T=F9(e.layout,{reveal:w,importQuery:b.searchParams.get("import")==="1",justSubmitted:_}),x=Dt(h.installVersion);Re(y,await n({title:"Harness",activePath:"/harness",installVersion:h.installVersion,body:Rc(Bv(e.layout,{cloudAppOrigin:x,reveal:w,scanFolder:C,flashMessage:k,importSectionExpanded:T}))}));return}if(A==="POST"&&p==="/api/harness/pick-folder"){let b=ao();if(b===null){fe(y,200,{cancelled:!0});return}fe(y,200,{path:b});return}if(A==="GET"&&p==="/api/harness/file-content"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=Ma(h);if(w===null){fe(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let _=Ic.default.readFileSync(w,"utf8"),k=_.length>OF?`${_.slice(0,OF)}
\u2026 (truncated)`:_;fe(y,200,{content:k})}catch{fe(y,500,{errorMessage:"Could not read file."})}return}if(A==="POST"&&p==="/api/harness/reveal/add-project"){let b=await ir(f),h="";try{let k=JSON.parse(b);typeof k=="object"&&k!==null&&typeof k.projectPath=="string"&&(h=k.projectPath.trim())}catch{fe(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(h.length===0){fe(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=$a(e.layout),_=bA({reveal:w,projectPath:h});if(_===null||_.sets.length===0){fe(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Dp(e.layout,_),fe(y,200,{ok:!0,setCount:_.sets.length});return}if(A==="GET"&&p==="/api/harness/reveal/stream"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(h.length===0){fe(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;f.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...Kv});let _=PA({scanRoot:h,response:y,shouldAbort:()=>w});Dp(e.layout,_),y.end();return}if(A==="POST"&&p==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(A==="POST"&&p==="/harness/submit"){let b=$a(e.layout);if(b===null){let x=o(),I=Dt(x.installVersion);Re(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Rc(Bv(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let h=await ir(f),w=new URLSearchParams(h),_=wv(w,b),k=_A({layout:e.layout,sets:_});if(!k.ok){let x=o(),I=Dt(x.installVersion);Re(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Rc(Bv(e.layout,{cloudAppOrigin:I,reveal:b,flashError:k.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}kA(e.layout);let T=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${k.writtenItemCount??0}${T}`}),y.end();return}if(A==="GET"&&p==="/writer-api"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),w=H()?.writerExecutionBackend??Ne(void 0),_=Ce(e.layout.configPath),k=Qr(_),C=b.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,T=o();Re(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:T.installVersion,body:bv({writerExecutionBackend:w,secrets:k,flashMessage:C})}));return}if(A==="POST"&&p==="/writer-api"){let b=await ir(f),h=new URLSearchParams(b),w=h.get("writerExecutionBackend")?.trim()??"cli";xS({configPath:e.layout.configPath,writerExecutionBackend:Ne(w),anthropicApiKey:h.get("anthropicApiKey")??void 0,anthropicModel:h.get("anthropicModel")??void 0,openaiApiKey:h.get("openaiApiKey")??void 0,openaiModel:h.get("openaiModel")??void 0,googleApiKey:h.get("googleApiKey")??void 0,googleModel:h.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(A==="GET"&&p==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(A==="GET"&&p==="/history"){let b=o();Re(y,await n({title:"History",activePath:"/history",installVersion:b.installVersion,body:sv({reportsDir:e.layout.reportsDir})}));return}if(A==="GET"&&p==="/knowledge"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),_=AP({layout:e.layout}),k=wP(_),C=h.length>0?await Ns({layout:e.layout,query:h,limit:20}):Ms(e.layout).slice(-50).reverse(),T=C.map(I=>{let M=PP(_,I.id),U=M>0?` \xB7 used in ${M} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ue(I.createdAt)}">${ue(Vv(I.createdAt))}${I.source?` \xB7 ${ue(I.source)}`:""}${U}</div><pre>${ue(I.text)}</pre></article>`}).join(""),x=k.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${k.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ue(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Re(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ue(h)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${x}${T}${G9(h,C.length)}`}));return}A==="POST"&&await ir(f),await u(y,"Not found")}})().catch(p=>{console.error("[agent-witch-local-app]",p),y.writeHead(500),y.end("Internal error")})});return S.on("error",f=>{if(f.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",f)}),S.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${hr}`)}),S},Mc=e=>bf(e).publicKeyRaw});var wf=l(()=>{"use strict";CI();TI();jF()});var HF={};$t(HF,{runAgentWitchExternalLiveCli:()=>K9});var Jv,$F,V9,K9,FF=l(()=>{"use strict";Jv=g(require("node:fs")),$F=g(require("node:path"));ks();X();ne();wf();ne();V9=e=>{let t=$F.default.join(e,"link-code.txt");if(!Jv.default.existsSync(t))return null;let r=Jv.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},K9=()=>{Qe("agent-witch-live");let e=L(),t=N(),r=V9(e),o=Mc(t);Oc({layout:t,controllers:{getStatus:()=>{let n=Le(t);return{wsConnected:nl(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{Oo(e)}}})}});var jr=v(($Ie,GF)=>{"use strict";var UF=["nodebuffer","arraybuffer","fragments"],BF=typeof Blob<"u";BF&&UF.push("blob");GF.exports={BINARY_TYPES:UF,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:BF,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Nc=v((HIe,_f)=>{"use strict";var{EMPTY_BUFFER:J9}=jr(),Yv=Buffer[Symbol.species];function Y9(e,t){if(e.length===0)return J9;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new Yv(r.buffer,r.byteOffset,o):r}function qF(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function VF(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function X9(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Xv(e){if(Xv.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Yv(e):ArrayBuffer.isView(e)?t=new Yv(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Xv.readOnly=!1),t}_f.exports={concat:Y9,mask:qF,toArrayBuffer:X9,toBuffer:Xv,unmask:VF};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");_f.exports.mask=function(t,r,o,n,s){s<48?qF(t,r,o,n,s):e.mask(t,r,o,n,s)},_f.exports.unmask=function(t,r){t.length<32?VF(t,r):e.unmask(t,r)}}catch{}});var YF=v((FIe,JF)=>{"use strict";var KF=Symbol("kDone"),Zv=Symbol("kRun"),Qv=class{constructor(t){this[KF]=()=>{this.pending--,this[Zv]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Zv]()}[Zv](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[KF])}}};JF.exports=Qv});var yi=v((UIe,e1)=>{"use strict";var zc=require("zlib"),XF=Nc(),Z9=YF(),{kStatusCode:ZF}=jr(),Q9=Buffer[Symbol.species],eY=Buffer.from([0,0,255,255]),kf=Symbol("permessage-deflate"),$r=Symbol("total-length"),fi=Symbol("callback"),bo=Symbol("buffers"),hi=Symbol("error"),vf,ek=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!vf){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;vf=new Z9(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[fi];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){vf.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){vf.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?zc.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=zc.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[kf]=this,this._inflate[$r]=0,this._inflate[bo]=[],this._inflate.on("error",rY),this._inflate.on("data",QF)}this._inflate[fi]=o,this._inflate.write(t),r&&this._inflate.write(eY),this._inflate.flush(()=>{let s=this._inflate[hi];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=XF.concat(this._inflate[bo],this._inflate[$r]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[$r]=0,this._inflate[bo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?zc.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=zc.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[$r]=0,this._deflate[bo]=[],this._deflate.on("data",tY)}this._deflate[fi]=o,this._deflate.write(t),this._deflate.flush(zc.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=XF.concat(this._deflate[bo],this._deflate[$r]);r&&(s=new Q9(s.buffer,s.byteOffset,s.length-4)),this._deflate[fi]=null,this._deflate[$r]=0,this._deflate[bo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};e1.exports=ek;function tY(e){this[bo].push(e),this[$r]+=e.length}function QF(e){if(this[$r]+=e.length,this[kf]._maxPayload<1||this[$r]<=this[kf]._maxPayload){this[bo].push(e);return}this[hi]=new RangeError("Max payload size exceeded"),this[hi].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[hi][ZF]=1009,this.removeListener("data",QF),this.reset()}function rY(e){if(this[kf]._inflate=null,this[hi]){this[fi](this[hi]);return}e[ZF]=1007,this[fi](e)}});var Si=v((BIe,Cf)=>{"use strict";var{isUtf8:t1}=require("buffer"),{hasBlob:oY}=jr(),nY=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function sY(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function tk(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function iY(e){return oY&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Cf.exports={isBlob:iY,isValidStatusCode:sY,isValidUTF8:tk,tokenChars:nY};if(t1)Cf.exports.isValidUTF8=function(e){return e.length<24?tk(e):t1(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Cf.exports.isValidUTF8=function(t){return t.length<32?tk(t):e(t)}}catch{}});var ik=v((GIe,l1)=>{"use strict";var{Writable:aY}=require("stream"),r1=yi(),{BINARY_TYPES:lY,EMPTY_BUFFER:o1,kStatusCode:cY,kWebSocket:dY}=jr(),{concat:rk,toArrayBuffer:uY,unmask:pY}=Nc(),{isValidStatusCode:mY,isValidUTF8:n1}=Si(),Tf=Buffer[Symbol.species],ft=0,s1=1,i1=2,a1=3,ok=4,nk=5,Lf=6,sk=class extends aY{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||lY[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[dY]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=ft}_write(t,r,o){if(this._opcode===8&&this._state==ft)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new Tf(o.buffer,o.byteOffset+t,o.length-t),new Tf(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new Tf(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case ft:this.getInfo(t);break;case s1:this.getPayloadLength16(t);break;case i1:this.getPayloadLength64(t);break;case a1:this.getMask();break;case ok:this.getData(t);break;case nk:case Lf:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[r1.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=s1:this._payloadLength===127?this._state=i1:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=a1:this._state=ok}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=ok}getData(t){let r=o1;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&pY(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=nk,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[r1.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===ft&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=ft;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=rk(o,r):this._binaryType==="arraybuffer"?n=uY(rk(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=ft):(this._state=Lf,setImmediate(()=>{this.emit("message",n,!0),this._state=ft,this.startLoop(t)}))}else{let n=rk(o,r);if(!this._skipUTF8Validation&&!n1(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===nk||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=ft):(this._state=Lf,setImmediate(()=>{this.emit("message",n,!1),this._state=ft,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,o1),this.end();else{let o=t.readUInt16BE(0);if(!mY(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new Tf(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!n1(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=ft;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=ft):(this._state=Lf,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=ft,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[cY]=n,i}};l1.exports=sk});var ck=v((VIe,u1)=>{"use strict";var{Duplex:qIe}=require("stream"),{randomFillSync:gY}=require("crypto"),{types:{isUint8Array:fY}}=require("util"),c1=yi(),{EMPTY_BUFFER:hY,kWebSocket:yY,NOOP:SY}=jr(),{isBlob:Ai,isValidStatusCode:AY}=Si(),{mask:d1,toBuffer:In}=Nc(),ht=Symbol("kByteLength"),bY=Buffer.alloc(4),Ef=8*1024,On,bi=Ef,jt=0,PY=1,wY=2,ak=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=jt,this.onerror=SY,this[yY]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||bY,r.generateMask?r.generateMask(o):(bi===Ef&&(On===void 0&&(On=Buffer.alloc(Ef)),gY(On,0,Ef),bi=0),o[0]=On[bi++],o[1]=On[bi++],o[2]=On[bi++],o[3]=On[bi++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[ht]!==void 0?a=r[ht]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(d1(t,o,d,s,a),[d]):(d1(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=hY;else{if(typeof t!="number"||!AY(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(fY(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[ht]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==jt?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Ai(t)?(n=t.size,s=!1):(t=In(t),n=t.length,s=In.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[ht]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Ai(t)?this._state!==jt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==jt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Ai(t)?(n=t.size,s=!1):(t=In(t),n=t.length,s=In.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[ht]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Ai(t)?this._state!==jt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==jt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[c1.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Ai(t)?(a=t.size,c=!1):(t=In(t),a=t.length,c=In.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[ht]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Ai(t)?this._state!==jt?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==jt?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[ht],this._state=wY,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(lk,this,a,n);return}this._bufferedBytes-=o[ht];let i=In(s);r?this.dispatch(i,r,o,n):(this._state=jt,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(_Y,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[c1.extensionName];this._bufferedBytes+=o[ht],this._state=PY,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");lk(this,c,n);return}this._bufferedBytes-=o[ht],this._state=jt,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===jt&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][ht],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][ht],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};u1.exports=ak;function lk(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function _Y(e,t,r){lk(e,t,r),e.onerror(t)}});var b1=v((KIe,A1)=>{"use strict";var{kForOnEventAttribute:Dc,kListener:dk}=jr(),p1=Symbol("kCode"),m1=Symbol("kData"),g1=Symbol("kError"),f1=Symbol("kMessage"),h1=Symbol("kReason"),Pi=Symbol("kTarget"),y1=Symbol("kType"),S1=Symbol("kWasClean"),Hr=class{constructor(t){this[Pi]=null,this[y1]=t}get target(){return this[Pi]}get type(){return this[y1]}};Object.defineProperty(Hr.prototype,"target",{enumerable:!0});Object.defineProperty(Hr.prototype,"type",{enumerable:!0});var Mn=class extends Hr{constructor(t,r={}){super(t),this[p1]=r.code===void 0?0:r.code,this[h1]=r.reason===void 0?"":r.reason,this[S1]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[p1]}get reason(){return this[h1]}get wasClean(){return this[S1]}};Object.defineProperty(Mn.prototype,"code",{enumerable:!0});Object.defineProperty(Mn.prototype,"reason",{enumerable:!0});Object.defineProperty(Mn.prototype,"wasClean",{enumerable:!0});var wi=class extends Hr{constructor(t,r={}){super(t),this[g1]=r.error===void 0?null:r.error,this[f1]=r.message===void 0?"":r.message}get error(){return this[g1]}get message(){return this[f1]}};Object.defineProperty(wi.prototype,"error",{enumerable:!0});Object.defineProperty(wi.prototype,"message",{enumerable:!0});var jc=class extends Hr{constructor(t,r={}){super(t),this[m1]=r.data===void 0?null:r.data}get data(){return this[m1]}};Object.defineProperty(jc.prototype,"data",{enumerable:!0});var vY={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[Dc]&&n[dk]===t&&!n[Dc])return;let o;if(e==="message")o=function(s,i){let a=new jc("message",{data:i?s:s.toString()});a[Pi]=this,Wf(t,this,a)};else if(e==="close")o=function(s,i){let a=new Mn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Pi]=this,Wf(t,this,a)};else if(e==="error")o=function(s){let i=new wi("error",{error:s,message:s.message});i[Pi]=this,Wf(t,this,i)};else if(e==="open")o=function(){let s=new Hr("open");s[Pi]=this,Wf(t,this,s)};else return;o[Dc]=!!r[Dc],o[dk]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[dk]===t&&!r[Dc]){this.removeListener(e,r);break}}};A1.exports={CloseEvent:Mn,ErrorEvent:wi,Event:Hr,EventTarget:vY,MessageEvent:jc};function Wf(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var xf=v((JIe,P1)=>{"use strict";var{tokenChars:$c}=Si();function ar(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function kY(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,u=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(u===-1&&$c[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let f=e.slice(c,u);d===44?(ar(t,f,r),r=Object.create(null)):i=f,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(u===-1&&$c[d]===1)c===-1&&(c=m);else if(d===32||d===9)u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m),ar(r,e.slice(c,u),!0),d===44&&(ar(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)a=e.slice(c,m),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if($c[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if($c[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,u=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(u===-1&&$c[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))u===-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let f=e.slice(c,u);o&&(f=f.replace(/\\/g,""),o=!1),ar(r,a,f),d===44&&(ar(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=m);let S=e.slice(c,u);return i===void 0?ar(t,S,r):(a===void 0?ar(r,S,!0):o?ar(r,a,S.replace(/\\/g,"")):ar(r,a,S),ar(t,i,r)),t}function CY(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}P1.exports={format:CY,parse:kY}});var Mf=v((ZIe,I1)=>{"use strict";var TY=require("events"),LY=require("https"),EY=require("http"),v1=require("net"),WY=require("tls"),{randomBytes:xY,createHash:RY}=require("crypto"),{Duplex:YIe,Readable:XIe}=require("stream"),{URL:uk}=require("url"),Po=yi(),IY=ik(),OY=ck(),{isBlob:MY}=Si(),{BINARY_TYPES:w1,CLOSE_TIMEOUT:NY,EMPTY_BUFFER:Rf,GUID:zY,kForOnEventAttribute:pk,kListener:DY,kStatusCode:jY,kWebSocket:we,NOOP:k1}=jr(),{EventTarget:{addEventListener:$Y,removeEventListener:HY}}=b1(),{format:FY,parse:UY}=xf(),{toBuffer:BY}=Nc(),C1=Symbol("kAborted"),mk=[8,13],Fr=["CONNECTING","OPEN","CLOSING","CLOSED"],GY=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,Q=class e extends TY{constructor(t,r,o){super(),this._binaryType=w1[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Rf,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),T1(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){w1.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new IY({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new OY(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[we]=this,s[we]=this,t[we]=this,n.on("conclude",KY),n.on("drain",JY),n.on("error",YY),n.on("message",XY),n.on("ping",ZY),n.on("pong",QY),s.onerror=eX,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",W1),t.on("data",Of),t.on("end",x1),t.on("error",R1),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Po.extensionName]&&this._extensions[Po.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){lt(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,E1(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){gk(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Rf,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){gk(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Rf,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){gk(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Po.extensionName]||(n.compress=!1),this._sender.send(t||Rf,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){lt(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(Q,"CONNECTING",{enumerable:!0,value:Fr.indexOf("CONNECTING")});Object.defineProperty(Q.prototype,"CONNECTING",{enumerable:!0,value:Fr.indexOf("CONNECTING")});Object.defineProperty(Q,"OPEN",{enumerable:!0,value:Fr.indexOf("OPEN")});Object.defineProperty(Q.prototype,"OPEN",{enumerable:!0,value:Fr.indexOf("OPEN")});Object.defineProperty(Q,"CLOSING",{enumerable:!0,value:Fr.indexOf("CLOSING")});Object.defineProperty(Q.prototype,"CLOSING",{enumerable:!0,value:Fr.indexOf("CLOSING")});Object.defineProperty(Q,"CLOSED",{enumerable:!0,value:Fr.indexOf("CLOSED")});Object.defineProperty(Q.prototype,"CLOSED",{enumerable:!0,value:Fr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(Q.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(Q.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[pk])return t[DY];return null},set(t){for(let r of this.listeners(e))if(r[pk]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[pk]:!0})}})});Q.prototype.addEventListener=$Y;Q.prototype.removeEventListener=HY;I1.exports=Q;function T1(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:NY,protocolVersion:mk[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!mk.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${mk.join(", ")})`);let s;if(t instanceof uk)s=t;else try{s=new uk(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let p=new SyntaxError(c);if(e._redirects===0)throw p;If(e,p);return}let d=i?443:80,u=xY(16).toString("base64"),m=i?LY.request:EY.request,S=new Set,f;if(n.createConnection=n.createConnection||(i?VY:qY),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(f=new Po({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=FY({[Po.extensionName]:f.offer()})),r.length){for(let p of r){if(typeof p!="string"||!GY.test(p)||S.has(p))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(p)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let p=n.path.split(":");n.socketPath=p[0],n.path=p[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let p=o&&o.headers;if(o={...o,headers:{}},p)for(let[A,b]of Object.entries(p))o.headers[A.toLowerCase()]=b}else if(e.listenerCount("redirect")===0){let p=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!p||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,p||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=m(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=m(n);n.timeout&&y.on("timeout",()=>{lt(e,y,"Opening handshake has timed out")}),y.on("error",p=>{y===null||y[C1]||(y=e._req=null,If(e,p))}),y.on("response",p=>{let A=p.headers.location,b=p.statusCode;if(A&&n.followRedirects&&b>=300&&b<400){if(++e._redirects>n.maxRedirects){lt(e,y,"Maximum redirects exceeded");return}y.abort();let h;try{h=new uk(A,t)}catch{let _=new SyntaxError(`Invalid URL: ${A}`);If(e,_);return}T1(e,h,r,o)}else e.emit("unexpected-response",y,p)||lt(e,y,`Unexpected server response: ${p.statusCode}`)}),y.on("upgrade",(p,A,b)=>{if(e.emit("upgrade",p),e.readyState!==Q.CONNECTING)return;y=e._req=null;let h=p.headers.upgrade;if(h===void 0||h.toLowerCase()!=="websocket"){lt(e,A,"Invalid Upgrade header");return}let w=RY("sha1").update(u+zY).digest("base64");if(p.headers["sec-websocket-accept"]!==w){lt(e,A,"Invalid Sec-WebSocket-Accept header");return}let _=p.headers["sec-websocket-protocol"],k;if(_!==void 0?S.size?S.has(_)||(k="Server sent an invalid subprotocol"):k="Server sent a subprotocol but none was requested":S.size&&(k="Server sent no subprotocol"),k){lt(e,A,k);return}_&&(e._protocol=_);let C=p.headers["sec-websocket-extensions"];if(C!==void 0){if(!f){lt(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let T;try{T=UY(C)}catch{lt(e,A,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(T);if(x.length!==1||x[0]!==Po.extensionName){lt(e,A,"Server indicated an extension that was not requested");return}try{f.accept(T[Po.extensionName])}catch{lt(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Po.extensionName]=f}e.setSocket(A,b,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function If(e,t){e._readyState=Q.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function qY(e){return e.path=e.socketPath,v1.connect(e)}function VY(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=v1.isIP(e.host)?"":e.host),WY.connect(e)}function lt(e,t,r){e._readyState=Q.CLOSING;let o=new Error(r);Error.captureStackTrace(o,lt),t.setHeader?(t[C1]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(If,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function gk(e,t,r){if(t){let o=MY(t)?t.size:BY(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Fr[e.readyState]})`);process.nextTick(r,o)}}function KY(e,t){let r=this[we];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[we]!==void 0&&(r._socket.removeListener("data",Of),process.nextTick(L1,r._socket),e===1005?r.close():r.close(e,t))}function JY(){let e=this[we];e.isPaused||e._socket.resume()}function YY(e){let t=this[we];t._socket[we]!==void 0&&(t._socket.removeListener("data",Of),process.nextTick(L1,t._socket),t.close(e[jY])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function _1(){this[we].emitClose()}function XY(e,t){this[we].emit("message",e,t)}function ZY(e){let t=this[we];t._autoPong&&t.pong(e,!this._isServer,k1),t.emit("ping",e)}function QY(e){this[we].emit("pong",e)}function L1(e){e.resume()}function eX(e){let t=this[we];t.readyState!==Q.CLOSED&&(t.readyState===Q.OPEN&&(t._readyState=Q.CLOSING,E1(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function E1(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function W1(){let e=this[we];if(this.removeListener("close",W1),this.removeListener("data",Of),this.removeListener("end",x1),e._readyState=Q.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[we]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",_1),e._receiver.on("finish",_1))}function Of(e){this[we]._receiver.write(e)||this.pause()}function x1(){let e=this[we];e._readyState=Q.CLOSING,e._receiver.end(),this.end()}function R1(){let e=this[we];this.removeListener("error",R1),this.on("error",k1),e&&(e._readyState=Q.CLOSING,this.destroy())}});var z1=v((eOe,N1)=>{"use strict";var QIe=Mf(),{Duplex:tX}=require("stream");function O1(e){e.emit("close")}function rX(){!this.destroyed&&this._writableState.finished&&this.destroy()}function M1(e){this.removeListener("error",M1),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function oX(e,t){let r=!0,o=new tX({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(O1,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(O1,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",rX),o.on("error",M1),o}N1.exports=oX});var fk=v((tOe,D1)=>{"use strict";var{tokenChars:nX}=Si();function sX(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&nX[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}D1.exports={parse:sX}});var G1=v((oOe,B1)=>{"use strict";var iX=require("events"),Nf=require("http"),{Duplex:rOe}=require("stream"),{createHash:aX}=require("crypto"),j1=xf(),Nn=yi(),lX=fk(),cX=Mf(),{CLOSE_TIMEOUT:dX,GUID:uX,kWebSocket:pX}=jr(),mX=/^[+/0-9A-Za-z]{22}==$/,$1=0,H1=1,U1=2,hk=class extends iX{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:dX,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:cX,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Nf.createServer((o,n)=>{let s=Nf.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=gX(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=$1}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===U1){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Hc,this);return}if(t&&this.once("close",t),this._state!==H1)if(this._state=H1,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Hc,this):process.nextTick(Hc,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Hc(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",F1);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){zn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){zn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!mX.test(s)){zn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){zn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Fc(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=lX.parse(c)}catch{zn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&u!==void 0){let S=new Nn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let f=j1.parse(u);f[Nn.extensionName]&&(S.accept(f[Nn.extensionName]),m[Nn.extensionName]=S)}catch{zn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(f,y,p,A)=>{if(!f)return Fc(r,y||401,p,A);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return Fc(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[pX])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>$1)return Fc(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${aX("sha1").update(r+uX).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),u._protocol=m)}if(t[Nn.extensionName]){let m=t[Nn.extensionName].params,S=j1.format({[Nn.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${S}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",F1),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Hc,this)})),a(u,n)}};B1.exports=hk;function gX(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Hc(e){e._state=U1,e.emit("close")}function F1(){this.destroy()}function Fc(e,t,r,o){r=r||Nf.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Nf.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function zn(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,zn),e.emit("wsClientError",i,r,t)}else Fc(r,o,n,s)}});var fX,hX,yX,SX,AX,bX,q1,PX,Uc,V1=l(()=>{fX=g(z1(),1),hX=g(xf(),1),yX=g(yi(),1),SX=g(ik(),1),AX=g(ck(),1),bX=g(fk(),1),q1=g(Mf(),1),PX=g(G1(),1),Uc=q1.default});var yk,Sk,Ak=l(()=>{"use strict";yk="AGENT_WITCH_EXTERNAL_BRIDGE",Sk="AGENT_WITCH_EXTERNAL_LIVE"});var bk,K1=l(()=>{"use strict";bk=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var wX,Pk,J1=l(()=>{"use strict";Ak();K1();wX=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",Pk=(e={})=>{let t=e.env??process.env,r=bk(t[yk]),o=bk(t[Sk]);return{mode:wX(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var Y1=l(()=>{"use strict";Ak()});var X1=l(()=>{"use strict";J1();Y1()});var wk=l(()=>{"use strict"});var Ur,Bc=l(()=>{"use strict";Ur=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var _i,Dn,Z1,vX,_k,vk,Q1,eU,kk,tU,Gc,Ck=l(()=>{"use strict";_i=g(require("node:fs")),Dn=g(require("node:os")),Z1=g(require("node:path"));wk();Bc();vX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_k=(e=Dn.default.hostname())=>Z1.default.join(Dn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),vk=e=>{if(!_i.default.existsSync(e))return null;try{let t=JSON.parse(_i.default.readFileSync(e,"utf8"));return!vX(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},Q1=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},eU=(e,t)=>{_i.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},kk=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??_k(),o=vk(r);if(o!==null&&o.pid!==process.pid&&Ur(o.pid)&&Q1(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Dn.default.hostname(),macOsUsername:Dn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return eU(r,n),{ok:!0}},tU=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??_k(),o=vk(r);return o!==null&&o.pid!==process.pid&&Ur(o.pid)&&Q1(o)?{ok:!1}:(eU(r,{hostname:Dn.default.hostname(),macOsUsername:Dn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},Gc=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??_k();vk(r)?.pid===process.pid&&_i.default.existsSync(r)&&_i.default.unlinkSync(r)}});var Tk,qc,kX,CX,TX,LX,Lk,rU=l(()=>{"use strict";Tk=require("node:child_process"),qc=g(require("node:path"));Bc();Iu();kX=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),CX=(e,t)=>{if(kX(e)||!/\bnode\b/.test(e))return!1;let r=qc.default.resolve(t),o=qc.default.join(r,"app",Ji),n=qc.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Ji||i==="agent-witch.ts")return e.includes(r);try{let a=qc.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},TX=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,Tk.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},LX=(e,t,r)=>{let o=TX(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||CX(d,t)&&n.push(c)}return n},Lk=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,Tk.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=LX(r,e.installDir,t),n=[];for(let s of o)if(Ur(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var Vc,Kc,oU,EX,Ek,nU=l(()=>{"use strict";Vc=g(require("node:fs")),Kc=g(require("node:path"));Oe();oU=(e,t)=>{!Vc.default.existsSync(e)||Vc.default.existsSync(t)||(Vc.default.mkdirSync(Kc.default.dirname(t),{recursive:!0}),Vc.default.renameSync(e,t))},EX=e=>{if(e.profileEmail===null)return;let t=Kc.default.join(e.installDir,St);oU(Kc.default.join(t,Bn),e.mainLogPath),oU(Kc.default.join(t,Gn),e.errorLogPath)},Ek=e=>{let t=N();e!==void 0&&t.installDir!==e||EX(t)}});var sU=l(()=>{"use strict";ul();wm();wm();!et()&&Do(__agentWitchImportMetaUrl)&&(async()=>{Qe("agent-witch-wake-server");let e=await an(),t=fr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var iU=l(()=>{"use strict";sU()});var aU=l(()=>{"use strict";Xa()});var Wk,lU=l(()=>{"use strict";wk();iU();Ck();aU();Wk=async(e={})=>{let t=e.skipInProcessBridge?null:await Pm();em();let r=setInterval(()=>{em()},6e4),o=setInterval(()=>{if(!tU().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Jc,zf,RX,cU,dU,Df,uU,pU,xk,mU,jf,gU=l(()=>{"use strict";Jc=g(require("node:fs")),zf=g(require("node:path")),RX="pending-run-inputs.json",cU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),dU=e=>{let t=e.profileEmail?zf.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return zf.default.join(t,RX)},Df=e=>{let t=dU(e);if(!Jc.default.existsSync(t))return{};try{let r=JSON.parse(Jc.default.readFileSync(t,"utf8"));return cU(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!cU(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},uU=(e,t)=>{let r=dU(e);Jc.default.mkdirSync(zf.default.dirname(r),{recursive:!0}),Jc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},pU=e=>Object.values(Df(e)),xk=(e,t)=>Df(e)[t]!==void 0,mU=(e,t)=>{let r=Df(e);r[t.agentRunId]=t,uU(e,r)},jf=(e,t)=>{let r=Df(e);delete r[t],uU(e,r)}});var $f=l(()=>{"use strict";ge()});var fU=l(()=>{"use strict";ge()});var Hf=l(()=>{"use strict";ge()});var Ff=l(()=>{"use strict";ge()});var Yc=l(()=>{"use strict";ge()});var IX,OX,Xc,Rk=l(()=>{"use strict";kt();$f();fU();Hf();Ff();Yc();IX={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},OX={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Xc=e=>{if(!pe(e.writerAgent))return"the selected writer";let t=tt(e.writerAgent);if(Ne(e.writerExecutionBackend)==="api"&&t!==null){let r=Ve(Ce(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=ya(t,r.model);return`${OX[t]} model ${o}`}}return IX[e.writerAgent]}});var MX,NX,hU,yU,SU=l(()=>{"use strict";MX=/"input_tokens"\s*:\s*(\d+)/,NX=/"output_tokens"\s*:\s*(\d+)/,hU=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},yU=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=hU(MX.exec(t)),o=hU(NX.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var Uf=l(()=>{"use strict";Jt()});var Zc,Bf,zX,Ik,AU,bU,PU,Ok,wU=l(()=>{"use strict";Zc=g(require("node:fs")),Bf=g(require("node:path"));Uf();zX="run-completion-outbox.json",Ik=e=>{let t=e.profileEmail?Bf.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Bf.default.join(t,zX)},AU=e=>{let t=Ik(e);if(!Zc.default.existsSync(t))return[];try{let r=JSON.parse(Zc.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},bU=(e,t)=>{Zc.default.mkdirSync(Bf.default.dirname(Ik(e)),{recursive:!0}),Zc.default.writeFileSync(Ik(e),JSON.stringify(t,null,2),"utf8")},PU=(e,t)=>{let r=[...AU(e).filter(o=>o.runId!==t.runId),t];bU(e,r)},Ok=async e=>{if(e.cloudApi===null)return;let t=AU(e.layout);if(t.length===0)return;let r=[];for(let o of t)await Ga(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);bU(e.layout,r)}});var _U=l(()=>{"use strict"});var Mk,Qc,jX,jn,vU=l(()=>{"use strict";_U();Mk=new Map,Qc=e=>{let t=Mk.get(e);t!==void 0&&(clearInterval(t),Mk.delete(e))},jX=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},jn=(e,t,r,o={})=>{Qc(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Qc(t);return}let i=o.onTick?.()??{};jX(e,t,n,i)};s(),Mk.set(t,setInterval(s,15e3))}});var kU=l(()=>{"use strict";Jt()});var CU,TU=l(()=>{"use strict";kU();CU=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:ct(t)}});var Nk,ed,Br,zk,lr,LU,Gf=l(()=>{"use strict";Nk=new Set,ed=new Map,Br=(e,t)=>{if(t.length===0)return;let r=ed.get(e)??[];r.push(t),ed.set(e,r)},zk=e=>{Nk.add(e);let t=ed.get(e)??[];return ed.delete(e),t},lr=e=>Nk.has(e),LU=e=>{Nk.delete(e),ed.delete(e)}});var vi,EU,WU,xU=l(()=>{"use strict";vi=g(require("node:path")),EU=require("node:url");zo();WU=()=>{if(et()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?vi.default.dirname(vi.default.resolve(e)):vi.default.dirname(vi.default.resolve(__filename))}return vi.default.dirname((0,EU.fileURLToPath)(__agentWitchImportMetaUrl))}});var RU,IU,OU,MU,Ze,ki,NU,zU,Ci,Dk,jk,$k,DU,Hk,jU,qf=l(()=>{"use strict";RU=require("node:crypto"),IU=g(require("node:fs")),OU=g(require("node:path")),MU=require("node:url");Bc();zo();xU();Ze=new Map,NU=async()=>{if(ki!==void 0)return ki;try{if(et()){let e=WU(),t=OU.default.join(e,"deps","node-pty","lib","index.js");if(IU.default.existsSync(t)){let r=await import((0,MU.pathToFileURL)(t).href);return ki=r,r}}return ki=await import("node-pty"),ki}catch{return ki=null,null}},zU=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Ci=(e,t,r)=>{let o=Ze.get(e);if(o!==void 0){Ze.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},Dk=(e,t)=>{let r=Ze.get(e);return r===void 0?!1:(r.pty.write(t),!0)},jk=(e,t,r)=>{let o=Ze.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},$k=e=>{for(let t of Ze.values())if(!(t.mode!=="agent"||t.runId!==e))return Ur(t.pty.pid);return!1},DU=e=>{for(let[t,r]of Ze.entries())if(!(r.mode!=="agent"||r.runId!==e)){Ze.delete(t);try{r.pty.kill()}catch{}return!0}return!1},Hk=async e=>{let t=await NU();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;Ze.get(e.shellSessionId)!==void 0&&Ci(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Ze.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{zU(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{Ze.get(e.shellSessionId)?.pty===n&&(Ze.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},jU=async e=>{let t=e.shellSessionId??(0,RU.randomUUID)(),r=await NU();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return Ze.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{zU(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{Ze.get(t)?.pty===o&&(Ze.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var Vf,$U,HU=l(()=>{"use strict";Vf="[[AWAITING_INPUT]]",$U=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Vf,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var td,FU,Kf=l(()=>{"use strict";HU();td=e=>{let t=e.indexOf(Vf);if(t<0)return null;let o=e.slice(t+Vf.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},FU=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",$U].join(`
`)});var UU,BU=l(()=>{"use strict";Gf();qf();Kf();UU=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(lr(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Br(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await jU({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=td(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var GU,qU,VU,Gr,Jf=l(()=>{"use strict";GU=require("node:child_process"),qU=g(require("node:fs")),VU=g(require("node:path"));Iu();Gr=(e,t)=>{let r=VU.default.join(e,"app",nE,"ensure-writer.sh");return qU.default.existsSync(r)?new Promise((o,n)=>{let s=(0,GU.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var KU,$n,od,Yf,Fk,rd,Xf,Zf,Uk,Bk,$X,Ti,HX,FX,Gk,qk=l(()=>{"use strict";KU=require("node:child_process");kt();Jf();Hf();$f();Yc();Ff();$n=new Map,od=e=>e==="cursor"||e==="antigravity",Yf=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",Fk=e=>$n.get(e)?.warmed===!0,rd=e=>{let t=$n.get(e);$n.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Xf=e=>$n.get(e)?.conversationStarted===!0,Zf=e=>{let t=$n.get(e);$n.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},Uk=e=>{$n.delete(e)},Bk=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",$X={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Ti=e=>`${$X[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,HX=(e,t,r,o)=>new Promise(n=>{let s=Ku(t,r),i=[],a=(0,KU.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),FX=(e,t)=>{let r=Ti(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},Gk=async e=>{if(!pe(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Ne(e.runConfig.writerExecutionBackend)==="api"){let r=tt(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Ce(e.runConfig.layout.configPath);return Ve(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),rd(e.writerAgent),{exitCode:0,output:Ti(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Gr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}od(e.writerAgent)&&rd(e.writerAgent);let t=await HX(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?FX(e.writerAgent,t.output):Ti(e.writerAgent)}}});var Hn,Vk=l(()=>{"use strict";Hn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var JU,UX,BX,YU,GX,Kk,XU=l(()=>{"use strict";Vk();JU=/you(?:'|')ve hit your session limit/i,UX=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],BX=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,YU=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},GX=e=>{let t=BX.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},Kk=e=>{let t=e.trim();if(t.length===0)return null;if(JU.test(t))return{code:Hn.SESSION_LIMIT,resetHint:GX(t),matchedLine:YU(t,JU)};for(let r of UX)if(r.test(t))return{code:Hn.PROVIDER_QUOTA,resetHint:null,matchedLine:YU(t,r)};return null}});var Qf,eh,Jk,Yk=l(()=>{"use strict";Qf="[[AGENT_RUN_WRITER_EXECUTION]]",eh="cli-writer-api-key-missing",Jk="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var Xk=l(()=>{"use strict";Yk()});var ZU=l(()=>{"use strict";Xk()});var th=l(()=>{"use strict";Vk();XU();Yk();Xk();ZU()});var rh,QU=l(()=>{"use strict";rh={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var eB,tB=l(()=>{"use strict";eB="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var rB,oB=l(()=>{"use strict";th();tB();rB=e=>e.code===Hn.SESSION_LIMIT?eB:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var nB,sB=l(()=>{"use strict";th();QU();oB();nB=e=>{let t=Kk(e.output);return t!==null?{status:rh.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:rB(t)}:{status:e.exitCode===0?rh.COMPLETED:rh.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var Zk,uNe,iB=l(()=>{"use strict";Zk={OPEN:"open",APPROVAL:"approval"},uNe=Zk.APPROVAL});var Li,oh,aB,KX,lB,cB,dB,nd,Qk,eC=l(()=>{"use strict";Li=g(require("node:fs")),oh=g(require("node:path")),aB="runs",KX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lB=e=>{let t=e.profileEmail!==null?oh.default.join(e.installDir,"profiles",e.profileEmail,aB):oh.default.join(e.installDir,aB);return Li.default.mkdirSync(t,{recursive:!0}),t},cB=(e,t)=>oh.default.join(lB(e),`${t}.json`),dB=(e,t)=>{Li.default.writeFileSync(cB(e,t.id),JSON.stringify(t,null,2))},nd=(e,t)=>{let r=cB(e,t);if(!Li.default.existsSync(r))return null;try{let o=JSON.parse(Li.default.readFileSync(r,"utf8"));return!KX(o)||typeof o.id!="string"?null:o}catch{return null}},Qk=e=>{let t=lB(e),r=Li.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=nd(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var JX,uB,pB=l(()=>{"use strict";sB();iB();eC();JX=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=nB({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:Zk.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},uB=(e,t)=>{let r=JX(t);return dB(e,r),r}});var mB=l(()=>{"use strict";hf()});var gB,fB=l(()=>{"use strict";th();gB=()=>[Qf,`agentRunWriterExecutionBackend=${eh}`,`agentRunWriterExecutionReasonCode=${Jk}`].join(`
`)});var wo,nh=l(()=>{"use strict";wo=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var tC,YX,XX,hB,yB=l(()=>{"use strict";tC=e=>e.toLocaleString("en-US"),YX=e=>e<.01?e.toFixed(4):e.toFixed(3),XX=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${YX(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${tC(e.inputTokens)} in / ${tC(e.outputTokens)} out (${tC(e.totalTokens)} total)`,t].join(`
`)},hB=(e,t)=>{if(t===void 0)return e;let r=XX(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var SB=l(()=>{"use strict";ge()});var bB,sd,he,rC,sh,AB,ZX,QX,PB,wB,_B,id,oC,nC,sC,vB,eZ,yt,ad,_o,kB,tZ,rZ,ih,iC,aC,lC,CB=l(()=>{"use strict";bB=require("node:child_process");ge();kt();gU();Cc();Rk();SU();ha();wU();Uf();vU();Bc();TU();Gf();qf();Kf();BU();qk();pB();mB();fB();nh();yB();ns();SB();Yc();ea();Kf();sd=new Map,he=new Map,rC=new Set,sh=new Map,AB=e=>{e!==void 0&&!sh.has(e)&&sh.set(e,Date.now())},ZX=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(lr(t)){yt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}Br(t,n)},QX=(e,t,r,o,n)=>{if(!IS(e,n))return;let s=`${gB()}
`;ZX(t,r,o,s);let i=he.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},PB=130,wB=`

Stopped by user.`,_B=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:wo(e)},id=null,oC=e=>{id=e},nC=(e,t)=>{if(id===null)return;let r=rv(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||RA(id,t,r)},sC=async e=>{await Ok({layout:e,cloudApi:id})},vB=e=>{let t=sd.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Ur(t.pid)},eZ=e=>me({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),yt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},ad=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Qn(s),c=he.get(r);if(a!==null&&c!==void 0){let d=gE(a),u=vB(r)||$k(r);d!==null&&!u&&_o(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return mE(a)}}),_o=(e,t,r,o,n,s,i,a)=>{let c=ds(s,a),d=n,u=hB(c.output,c.llmUsage);if(r!==void 0){let S=sh.get(r);sh.delete(r),S!==void 0&&ev({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let f=yU(c.llmUsage,u);f!==null&&NH({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:f})}r!==void 0&&rC.has(r)&&(rC.delete(r),d=PB,u=u.trim().length>0&&!u.includes("Stopped by user.")?`${u.trim()}${wB}`:"Stopped by user.");let m=r!==void 0?rv(e.layout.reportsDir,r):null;if(r!==void 0){Qc(r),va(e.layout,r),lr(r)&&(yt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),LU(r));let S=he.get(r);IH({reportsDir:e.layout.reportsDir,agentRunId:r,input:wo(i),output:u,...S!==void 0?{writerLabel:Xc({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&gf({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:u,agentRunId:r}),uB(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:u,layout:e.layout}),PU(e.layout,{runId:r,exitCode:d,output:u,createdAt:new Date().toISOString(),...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{}}),Ok({layout:e.layout,cloudApi:id}),he.delete(r),sd.delete(r),jf(e.layout,r)}yt(t,{type:"command.claude.result",payload:{exitCode:d,output:u,...r!==void 0?{agentRunId:r}:{},...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),ca(e.layout)},kB=(e,t,r,o,n,s,i)=>{let a=he.get(r),c=a?.accumulatedOutput??s;mU(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),jn(t,r,()=>xk(e.layout,r),ad(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),yt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},tZ=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,u=f=>{if(!(n===void 0||f.length===0)){if(lr(n)){yt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:f},requestId:o});return}Br(n,f)}};if(n!==void 0){let f=he.get(n);sd.set(n,t),he.set(n,{originalPrompt:s,userTranscriptPrompt:f?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:f?.projectFolderPath,reportKey:f?.reportKey,accumulatedOutput:f?.accumulatedOutput??""}),yt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),jn(r,n,()=>vB(n),ad(e,r,n,o,f?.projectFolderPath,f?.reportKey))}let m=a==="claude-cli",S=[];t.stdout?.on("data",f=>{let y=f.toString("utf8");if(m?S.push(y):(c.push(y),u(y)),d||n===void 0)return;let p=td(c.join(""));if(p!==null){d=!0,t.kill("SIGTERM");let A=he.get(n),b=[A?.accumulatedOutput??"",p.partialOutput].filter(h=>h.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=b),sd.delete(n),kB(e,r,n,o,p.question,b,s)}}),t.stderr?.on("data",f=>{let y=f.toString("utf8");c.push(y),u(y)}),t.on("close",f=>{if(d)return;Zf(a);let y=n!==void 0?he.get(n):void 0,p=m?ds(S.join("")):{output:c.join("").trim(),llmUsage:void 0},A=m?c.join("").trim():"",b=[p.output.trim(),A].filter(w=>w.length>0).join(`
`);m&&p.output.trim().length>0&&u(p.output);let h=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${b}`.trim():b;_o(e,r,n,o,f??-1,h,s,p.llmUsage)}),t.on("error",f=>{d||_o(e,r,n,o,-1,f.message,s)})},rZ=(e,t,r,o,n,s,i,a,c)=>{let d=_B(r,c);s!==void 0&&(he.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),yt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),jn(n,s,()=>he.has(s),ad(e,n,s,o,i,a))),ba(e,t,r,m=>{if(!(s===void 0||m.length===0)){if(lr(s)){yt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:m},requestId:o});return}Br(s,m)}}).then(m=>{Zf(t),_o(e,n,s,o,m.exitCode,m.output,r,m.llmUsage)}).catch(m=>{let S=m instanceof Error?m.message:String(m);_o(e,n,s,o,-1,S,r)})},ih=(e,t,r,o,n,s,i,a,c,d,u,m)=>{let S=_B(r,u);if(la(e.layout),Vo(e,t)){AB(s),rZ(e,t,r,o,n,s,c,d,S);return}let f=qt(t,r,eZ(e),i);if(f===null){_o(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}AB(s);let y=CU({workspace:e.workspace,projectFolderPath:c}),p=()=>{let A=(0,bB.spawn)(f.command,[...f.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:m??process.env});tZ(e,A,n,o,s,r,S,t)};if(s===void 0){p();return}he.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:he.get(s)?.accumulatedOutput??""}),QX(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Qi({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),jn(n,s,()=>he.has(s),ad(e,n,s,o,c,d)),UU({socket:n,sendMessage:yt,requestId:o,agentRunId:s,shellSessionId:a,command:f.command,args:f.args,cwd:y,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:A=>{a!==void 0&&Ci(a,w=>{yt(n,w)},o);let b=he.get(s),h=[b?.accumulatedOutput??"",A.partialOutput].filter(w=>w.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=h),kB(e,n,s,o,A.question,h,r)},onFinished:(A,b)=>{Zf(t);let h=ds(b),w=he.get(s),_=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${h.output}`.trim():h.output;_o(e,n,s,o,A,_,r,h.llmUsage)}}).then(A=>{if(!A){p();return}jn(n,s,()=>$k(s),ad(e,n,s,o,c,d))}).catch(A=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",A instanceof Error?A.message:A),p()})},iC=(e,t,r,o)=>{jf(e.layout,t.agentRunId),t.shellSessionId!==void 0&&yt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=FU(t),s=he.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;ih(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},aC=(e,t)=>{for(let r of pU(e.layout))he.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:wo(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),jn(t,r.agentRunId,()=>xk(e.layout,r.agentRunId),{awaitingInput:!0}),yt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},lC=(e,t,r,o)=>{let n=he.get(r);if(n===void 0)return!1;rC.add(r),Qc(r);let s=sd.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(DU(r))return!0;jf(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${wB}`:"Stopped by user.";return _o(e,t,r,o,PB,i,n.originalPrompt),!0}});var oZ,cC,TB=l(()=>{"use strict";Ea();oZ=()=>`http://127.0.0.1:${Ct()}/restart`,cC=async()=>{try{let e=await fetch(oZ(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var LB=l(()=>{"use strict";hl()});var EB=l(()=>{"use strict";xv()});var WB,xB=l(()=>{"use strict";WB=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var ld,nZ,dC,RB=l(()=>{"use strict";X();ne();LB();wb();EB();xB();ns();ld=(e,t)=>{lo(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},nZ=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Xy(),Yy)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},dC=async e=>{let t=Me(e.layout.installDir)?.bundleVersion??null;if(!WB({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(vt(e.layout)){da({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),ld(e.layout,{summary:r,action:"install-bundle-update-start"}),gr({launchAgentLabel:ve(e.layout.installDir),installDir:e.layout.installDir});let o=await gi({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),ld(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await nZ();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),ld(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),ld(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),ld(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var sZ,uC,IB=l(()=>{"use strict";sZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uC=e=>{if(!sZ(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var pC,mC,OB=l(()=>{"use strict";rb();ob();pC=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Za({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},mC=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await wr(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var MB,iZ,aZ,lZ,cd,NB=l(()=>{"use strict";MB=g(require("node:os"));Oe();iZ="Default",aZ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),lZ=e=>{let t=MB.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},cd=()=>{let e=N(),t=_u(e),r=aZ(iZ);return`${lZ(t)}/${r.length>0?r:"project"}`}});var zB=l(()=>{"use strict";hl()});var DB,gC,jB=l(()=>{"use strict";zB();DB=!1,gC=e=>{DB||(DB=!0,process.on("uncaughtException",t=>{cn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;cn(e,{kind:"crash",message:r,stack:o})}))}});var $B,cZ,fC,HB=l(()=>{"use strict";$B=require("node:child_process");Jf();kt();Hf();$f();Yc();Ff();cZ=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,$B.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},fC=async e=>{if(!pe(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Ne(e.runConfig.writerExecutionBackend)==="api"){let r=tt(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Ce(e.layout.configPath),n=Ve(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Gr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await cZ(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var hC,FB=l(()=>{"use strict";hC=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var UB,yC,BB=l(()=>{"use strict";UB=require("node:crypto"),yC=()=>(0,UB.randomUUID)()});var Ei,GB,ah=l(()=>{"use strict";Ei="[[WORKING_ESTIMATE]]",GB=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Ei,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var qB,VB=l(()=>{"use strict";qB=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var dZ,KB,JB=l(()=>{"use strict";ah();dZ=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,KB=e=>{if(!e.includes(Ei))return null;let t=null;for(let r of e.matchAll(dZ)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var uZ,SC,YB=l(()=>{"use strict";JB();uZ=/^(\d{1,6})\b/,SC=e=>{let t=KB(e);if(t!==null)return t;let r=uZ.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var pZ,mZ,gZ,lh,AC=l(()=>{"use strict";kt();ml();pZ="http://127.0.0.1:11434",mZ=45e3,gZ=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},lh=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||pZ,o=t===void 0?(await Et({commands:me({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(mZ)});return n.ok?gZ(await n.json()):null}catch{return null}}});var bC,PC,wC,XB=l(()=>{"use strict";ea();ah();nh();VB();YB();Cc();AC();bC=async e=>{let t=wo(e.wrappedPrompt),r=OH(e.reportsDir);return{estimateOutput:await lh(GB(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},PC=e=>{let t=SC(e.estimateOutput);t!==null&&af({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},wC=e=>{let t=SC(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=qB(t);return Zi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Ut.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),af({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var ch,ZB,_C=l(()=>{"use strict";ch="[[WORKING_TOKEN_ESTIMATE]]",ZB=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",ch,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var QB,fZ,eG,tG=l(()=>{"use strict";_C();QB=/^(\d{1,8})\b/,fZ=e=>{let t=e.indexOf(ch);if(t<0)return null;let r=e.slice(t+ch.length).trim(),o=QB.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},eG=e=>{let t=fZ(e);if(t!==null)return t;let r=QB.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var vC,kC,rG=l(()=>{"use strict";_C();nh();tG();Cc();AC();vC=async e=>{let t=wo(e.wrappedPrompt),r=zH(e.reportsDir);return{estimateOutput:await lh(ZB(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},kC=e=>{let t=eG(e.estimateOutput);return t===null?null:(MH({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var oG=l(()=>{"use strict";Ck();rU();nU();lU();Ea();CB();Jf();kt();eC();Gf();TB();ub();RB();ns();IB();OB();Uf();NB();jB();HB();Ou();FB();BB();ah();ea();XB();rG();Rk();ml();qf();qk()});var nG={};$t(nG,{buildContinuationPromptWithContext:()=>SZ});var hZ,yZ,SZ,sG=l(()=>{"use strict";hZ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,yZ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),SZ=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=yZ(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${hZ(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var iG={};$t(iG,{readHarnessExportSets:()=>bZ});var dd,CC,dh,AZ,bZ,aG=l(()=>{"use strict";dd=g(require("node:fs")),CC=g(require("node:path"));Oe();dh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),AZ=e=>{if(!dd.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(dd.default.readFileSync(e.harnessManifestPath,"utf8"));if(dh(t))return t}catch{return null}return null},bZ=(e,t)=>{let r=N(t),o=AZ(r);if(o===null)return[];let n=dh(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!dh(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let u of c){if(!dh(u))continue;let m=typeof u.path=="string"?u.path:void 0,S=typeof u.id=="string"?u.id:"",f=typeof u.kind=="string"?u.kind:"",y=typeof u.title=="string"?u.title:"";if(m===void 0||S.length===0||f.length===0||y.length===0)continue;let p=m.startsWith("shared/")?CC.default.join(r.harnessRootDir,m):CC.default.join(r.harnessSetsDir,i,m);dd.default.existsSync(p)&&d.push({id:S,kind:f,title:y,content:dd.default.readFileSync(p,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var IC,LC,Wi,lG,PZ,cG,dG,TC,uG,EC,WC,xC,ee,V,RC,wZ,ud,_Z,vZ,kZ,CZ,TZ,LZ,EZ,WZ,pd,pG=l(()=>{"use strict";IC=require("node:child_process"),LC=g(require("node:fs")),Wi=g(require("node:os"));V1();X();ne();ks();Uv();X1();ge();Gt();hl();xP();wf();hf();Jt();Zo();Rb();_t();oG();lG=3e4,PZ=3e4,cG=new Map,dG=new Map,TC=new Map,uG=new Map,EC=new Map,WC=new Map,xC=new Map,ee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),V=(e,t,r)=>{e.readyState===Uc.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(lo(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),_m(r,"out",t)))},RC=e=>e,wZ=e=>{if(!LC.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(LC.default.readFileSync(e.harnessManifestPath,"utf8"));if(ee(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},ud=(e,t)=>{let r=wZ(t);r!==null&&V(e,{type:"harness.manifest.report",payload:{hostname:Wi.default.hostname(),manifest:r}})},_Z=async(e,t,r,o,n,s,i=!1,a,c,d,u,m)=>{let S=m?.trim()??"";if(!pe(t)){V(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Xc({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await Et({commands:me({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),p=s!==void 0?bC({wrappedPrompt:r,writerLabel:f,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=s!==void 0?vC({wrappedPrompt:r,writerLabel:f,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=od(t)&&!Fk(t);if(b){try{await Gr(e.layout.installDir,t)}catch($){let _e=$ instanceof Error?$.message:String($);V(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${_e}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}rd(t)}else if(!od(t))try{await Gr(e.layout.installDir,t)}catch($){let _e=$ instanceof Error?$.message:String($);V(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${_e}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=wa(d,cd,m);if(h===null){V(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}rt({projectFolderPath:h,...S.length>0?{projectId:S}:{}}),i||xc(e.layout,t,h);let w=ff({sessionContinuation:i,supportsWriterSessionContinuation:Yf(t),isWriterConversationStarted:Xf(t)}),_=i&&w==="first"?Wc(e.layout,t,h):null,k=_!==null?mi(e.layout,_):null,C=k!==null&&k.turns.length>0,T=yv({sessionContinuation:i,supportsWriterSessionContinuation:Yf(t),isWriterConversationStarted:Xf(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:C,userPromptCharacterCount:r.length}),x=r;if(T.continuationStrategy==="source_run_seed"){let $=typeof c=="string"&&c.length>0?nd(e.layout,c):null;if($!==null){let{buildContinuationPromptWithContext:_e}=await Promise.resolve().then(()=>(sG(),nG));x=_e({priorPrompt:$.prompt,priorOutput:$.resultOutput??"",userMessage:r})}}else T.continuationStrategy==="transcript_seed"&&k!==null&&k.turns.length>0&&(x=df({priorTurns:k.turns,userMessage:r}));let I=T.ragLimit>0?await Ns({layout:e.layout,query:x,limit:T.ragLimit,minScore:T.ragMinScore,projectFolderPath:h,...S.length>0?{projectId:S}:{}}):[],M=T.ragLimit>0&&h.trim().length>0?await EP({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:h,...S.length>0?{projectId:S}:{}}):[],U=T.injectMemory?av(e.layout,h,S.length>0?S:void 0):[],K=`${cv(U,T.memoryEntryLimit)}${CP(I)}${WP(M)}${x}`,G=u?.trim()??(s!==void 0&&h.trim().length>0?yC():void 0);if(s!==void 0&&G!==void 0&&G.length>0&&h.trim().length>0){Qi({reportKey:G,agentRunId:s,userSummary:"Working on your Mac\u2026"});let $=K;p!==null&&p.then(_e=>{if(_e===null)return;let qr=wC({estimateOutput:_e.estimateOutput??"",reportKey:G,agentRunId:s,reportsDir:e.layout.reportsDir,task:_e.task,writerLabel:_e.writerLabel,embedding:_e.embedding});if(qr.estimateSeconds===null)return;nC(e.layout.reportsDir,s);let cr=`${Ei}
${qr.estimateSeconds}
`;if(lr(s)){V(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:cr},requestId:o});return}Br(s,cr)}).catch(()=>{}),K=hC($),K=_y(K,{agentRunId:s,reportKey:G,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&p!==null&&p.then($=>{$!==null&&PC({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel,embedding:$.embedding})}).catch(()=>{}),s!==void 0&&A!==null&&A.then($=>{$!==null&&kC({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel})}).catch(()=>{});let Ge=s!==void 0&&xC.get(s)===!0;if(s!==void 0&&h.trim().length>0){let $=await Zp(h);WC.set(s,$),G!==void 0&&G.length>0&&EC.set(s,G)}ih(e,t,K,o,RC(n),s,{sessionTurn:T.sessionTurn},a,h,G,r,LS(e.layout,s,Ge)),b&&s!==void 0&&V(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Bk(t)},requestId:o})},vZ=async(e,t,r,o,n)=>{let s=(i,a)=>{V(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await Gk({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:me({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,V(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=pe(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Ti(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},kZ=(e,t,r)=>new Promise(o=>{if(!pe(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=qt(t,r,me({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,IC.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),CZ=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;V(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Kt(t.bundle),s=ee(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=ke(e.wsUrl)??wt,m=await mA({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return V(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=Xo({bundle:i,layout:e.layout});return V(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&ud(o,e.layout),!0},TZ=async(e,t,r,o)=>{if(await CZ(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(V(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){V(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!pe(n)){V(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}la(e.layout);let i=await(async()=>{try{await Gr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return kZ(e,n,s)})().finally(()=>{ca(e.layout)});V(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),ud(o,e.layout)},LZ=e=>{let t=1e3*2**e;return Math.min(PZ,t)},EZ=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=p=>{if(!t.restartInFlight){if(vt(e.layout)){By(p),console.log(`[agent-witch] Deferring local restart (${p}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${p})\u2026`),t.wakeError=`restart:${p}`,cC().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(p,A="system.ack")=>{if(!t.selfUpdateInFlight){if(vt(e.layout)){da({layout:e.layout,remoteBundleVersion:p,trigger:A}),console.log(`[agent-witch] Deferring install bundle update (${p} via ${A}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,dC({layout:e.layout,remoteBundleVersion:p,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let p=Le(e.layout);p!==null&&Ue(p,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),f())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let p=t.socket;t.socket=void 0,t.wsConnected=!1,p.removeAllListeners("open"),p.removeAllListeners("message"),p.removeAllListeners("close"),p.on("error",()=>{}),(p.readyState===Uc.OPEN||p.readyState===Uc.CONNECTING)&&p.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,lG)},u=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let p=LZ(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${p}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,f()},p)},m=p=>{s();let A=()=>{let b=na(e.layout.installDir),h=Ct();V(p,{type:"agent.heartbeat",payload:{hostname:Wi.default.hostname(),macOsUsername:Wi.default.userInfo().username,wakeError:t.wakeError,wakePort:h,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,lG)},S=(p,A)=>{if(typeof p.type!="string")return;if(xb(p)){t.stopped=!0,s(),a(),c(),Lb({layout:e.layout}).finally(()=>{Gc(),process.exit(0)});return}lo(e.layout,{direction:"in",type:p.type,summary:"inbound WS frame"}),_m(e.layout,"in",p);let b=typeof p.requestId=="string"?p.requestId:void 0;if(p.type==="device.auth.attestation"&&ee(p.payload)){let h=typeof p.payload.serverPublicKey=="string"?p.payload.serverPublicKey:"",w=typeof p.payload.origin=="string"?p.payload.origin:"",_=typeof p.payload.devicePublicKey=="string"?p.payload.devicePublicKey:"",k=typeof p.payload.challenge=="string"?p.payload.challenge:"",C=typeof p.payload.serverAttestation=="string"?p.payload.serverAttestation:"";if(!Fv({serverPublicKey:h,origin:w,devicePublicKey:_,challenge:k,serverAttestation:C})){t.wakeError="Server attestation verification failed",lo(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(p.type==="writer.ensure"&&ee(p.payload)){let h=typeof p.payload.writerAgent=="string"?p.payload.writerAgent:"";lo(e.layout,{direction:"local",type:"writer.ensure",summary:h,action:"ensure-writer"}),fC({layout:e.layout,writerAgent:h,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{V(A,{type:"writer.status",payload:w},e.layout)})}if(p.type==="install.bundle.update"&&ee(p.payload)){let h=typeof p.payload.bundleVersion=="string"?p.payload.bundleVersion.trim():"";h.length>0&&o(h,"install.bundle.update")}if(p.type==="system.ack"){sm(e.layout,{wsUrl:e.wsUrl});let h=ee(p.payload)?p.payload:null,w=uC(h);w!==null&&o(w)}if(p.type==="device.restart"&&r("cloud-device-restart"),p.type==="automations.sync"&&ee(p.payload)&&pC(p.payload),p.type==="automations.run"&&ee(p.payload)&&mC(p.payload),p.type==="terminal.stream.accepted"&&ee(p.payload)){let h=typeof p.payload.runId=="string"?p.payload.runId:"";if(h.length>0){let w=zk(h);for(let _ of w)V(A,{type:"terminal.stream.chunk",payload:{runId:h,chunk:_},requestId:b})}}if(p.type==="agent.agentRun.list"&&V(A,{type:"dashboard.agentRun.list.result",payload:{runs:Qk(e.layout)},requestId:b}),p.type==="agent.agentRun.get"&&ee(p.payload)){let h=typeof p.payload.runId=="string"?p.payload.runId:"",w=h.length>0?nd(e.layout,h):null;V(A,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:b})}if(p.type==="command.claude.run"&&ee(p.payload)){let h=p.payload.prompt,w=typeof p.payload.writerAgent=="string"&&pe(p.payload.writerAgent)?p.payload.writerAgent:"claude-cli",_=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,k=p.payload.sessionContinuation===!0,C=typeof p.payload.sourceRunId=="string"?p.payload.sourceRunId:void 0,T=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:void 0,x=typeof p.payload.projectId=="string"?p.payload.projectId:void 0,I=wa(typeof p.payload.projectFolderPath=="string"?p.payload.projectFolderPath:void 0,cd,x),M=PS(p.payload.compositionSnapshot),U=typeof p.payload.reportKey=="string"?p.payload.reportKey:void 0;if(typeof h=="string"&&h.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${k?"continue":"first"})\u2026`),I===null){V(A,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(M!==null){let K=_S(e.layout,M);if(K!==null){V(A,{type:"command.claude.result",payload:{exitCode:-1,output:K,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(_!==void 0){let G=kS(e.layout,_,M);if(!G.ok){V(A,{type:"command.claude.result",payload:{exitCode:-1,output:G.errorMessage,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}xC.set(_,M.entries.some(Ge=>Ge.scope==="run"))}}_!==void 0&&T!==void 0&&cG.set(_,T),_!==void 0&&(dG.set(_,I),x!==void 0&&x.trim().length>0&&TC.set(_,x.trim()),uG.set(_,h.trim()),rt({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),_Z(e,w,h.trim(),b,A,_,k,T,C,I,U,x)}}if(p.type==="shell.session.open"&&ee(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",w=typeof p.payload.cols=="number"?p.payload.cols:120,_=typeof p.payload.rows=="number"?p.payload.rows:32;h.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),Hk({shellSessionId:h,cwd:e.workspace,cols:w,rows:_,send:k=>{V(A,k)},requestId:b}))}if(p.type==="shell.session.close"&&ee(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"";h.length>0&&Ci(h,w=>{V(A,w)},b)}if(p.type==="shell.input"&&ee(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",w=typeof p.payload.data=="string"?p.payload.data:"";h.length>0&&w.length>0&&Dk(h,w)}if(p.type==="shell.resize"&&ee(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",w=typeof p.payload.cols=="number"?p.payload.cols:0,_=typeof p.payload.rows=="number"?p.payload.rows:0;h.length>0&&w>0&&_>0&&jk(h,w,_)}if(p.type==="command.writer.session.end"&&ee(p.payload)){let h=p.payload.writerAgent;typeof h=="string"&&pe(h)&&(Uk(h),mf(e.layout,h))}if(p.type==="command.writer.session.start"&&ee(p.payload)){let h=p.payload.writerAgent,w=typeof p.payload.writerSessionId=="string"?p.payload.writerSessionId:"";typeof h=="string"&&pe(h)&&w.length>0&&(console.log(`[agent-witch] Starting ${h} session\u2026`),vZ(e,h,w,b,A))}if(p.type==="command.claude.stop"&&ee(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"";h.length>0&&(console.log(`[agent-witch] Stopping run ${h}\u2026`),lC(e,RC(A),h,b))}if(p.type==="command.claude.input_respond"&&ee(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"",w=typeof p.payload.response=="string"?p.payload.response.trim():"",_=typeof p.payload.originalPrompt=="string"?p.payload.originalPrompt:"",k=typeof p.payload.partialOutput=="string"?p.payload.partialOutput:"",C=typeof p.payload.question=="string"?p.payload.question:"";h.length>0&&w.length>0&&_.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),iC(e,{agentRunId:h,originalPrompt:_,partialOutput:k,question:C,response:w,shellSessionId:cG.get(h)},b,RC(A)))}if(p.type==="dispatch.approval.required"&&ee(p.payload)){let h=typeof p.payload.requesterEmail=="string"?p.payload.requesterEmail:"A teammate",w=typeof p.payload.prompt=="string"?p.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${h}: ${w}`),process.platform==="darwin"&&(0,IC.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${h.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(p.type==="harness.request"&&ee(p.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),TZ(e,p.payload,b,A)),p.type==="harness.export.request"&&ee(p.payload)){let h=typeof p.payload.borrowerUserId=="string"?p.payload.borrowerUserId:"",w=typeof p.payload.targetDeviceId=="string"?p.payload.targetDeviceId:void 0,_=Array.isArray(p.payload.setSlugs)?p.payload.setSlugs.filter(k=>typeof k=="string"):[];h.length>0&&_.length>0&&(async()=>{let{readHarnessExportSets:k}=await Promise.resolve().then(()=>(aG(),iG)),C=k(_,e.email);V(A,{type:"harness.export.result",payload:{success:C.length>0,borrowerUserId:h,...w!==void 0?{targetDeviceId:w}:{},sets:C,errorMessage:C.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(p.type==="harness.manifest.request"&&ud(A,e.layout),p.type==="command.claude.result"&&ee(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,w=typeof p.payload.output=="string"?p.payload.output:"",_=typeof p.payload.exitCode=="number"?p.payload.exitCode:null,k=wa(h!==void 0?dG.get(h):void 0,cd),C=h!==void 0?TC.get(h):void 0,T=h!==void 0?uG.get(h)??"":"",x=UA({exitCode:_,output:w});if(x&&k!==null&&kP({layout:e.layout,text:w,source:h??"command.claude.result",projectFolderPath:k,...C!==void 0?{projectId:C}:{}}),_!=null&&_!==0&&w.trim().length>0&&k!==null&&(bP({layout:e.layout,errorText:w,projectFolderPath:k,...C!==void 0?{projectId:C}:{}}),LP({layout:e.layout,text:w,source:h??"command.claude.result.failure",projectFolderPath:k,...C!==void 0?{projectId:C}:{}})),x&&T.trim().length>0&&k!==null&&lv({layout:e.layout,projectFolderPath:k,...C!==void 0?{projectId:C}:{},entry:{id:`${Date.now()}-${h??"run"}`,...h!==void 0?{agentRunId:h}:{},prompt:T,output:w,createdAt:new Date().toISOString()}}),h!==void 0&&k!==null){let M=EC.get(h),U=WC.get(h);M!==void 0&&U!==void 0&&Zp(k).then(K=>{let G=VA({before:U,after:K});vy(M,G),WC.delete(h),EC.delete(h)})}if(x&&C!==void 0&&C.trim().length>0){let M=H(),U=M===null?null:Z({wsUrl:M.wsUrl,pairingToken:M.pairingToken});U!==null&&JA(U,C,{...h!==void 0?{sourceRunId:h}:{},lesson:KA({prompt:T,output:w})})}h!==void 0&&(va(e.layout,h),xC.delete(h),TC.delete(h))}},f=()=>{if(t.stopped)return;a(),c();let p=new Uc(e.wsUrl);t.socket=p,p.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),oC(Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),sC(e.layout);let A=ke(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),h=Hv({layout:e.layout,origin:A,...b!==void 0&&b.length>0?{claimToken:b}:{}});V(p,{type:"agent.register",payload:{role:"agent",hostname:Wi.default.hostname(),macOsUsername:Wi.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...h}},e.layout),ud(p,e.layout),aC(e,p),m(p)}),p.on("message",A=>{let b=typeof A=="string"?A:A.toString("utf8");try{let h=JSON.parse(b);if(!ee(h))return;S(h,p)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),p.on("close",(A,b)=>{s(),t.socket=void 0,t.wsConnected=!1,ib(e.layout),t.reconnectAttempt+=1;let h=typeof b=="string"?b:b.toString("utf8");cn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:h}),console.log("[agent-witch] Disconnected from server."),u()}),p.on("error",A=>{t.wakeError=A.message,cn(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return Uy(()=>{let p=Gy();p!==null&&p.layout.installDir===e.layout.installDir&&p.layout.profileEmail===e.layout.profileEmail&&o(p.remoteBundleVersion,p.trigger);let A=qy();A!==null&&r(A)}),{connect:f,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:nl(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Mc(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,f()},reportHarnessManifestIfConnected:()=>{let p=t.socket;return!t.wsConnected||p===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(ud(p,e.layout),{ok:!0})}}},WZ=async()=>{Qe("agent-witch");let e=Pk(),t=L();kk().ok||(process.platform==="darwin"?(await Oo(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),Ek(t);let o=Lk({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(gr({launchAgentLabel:ve(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Gi());let n=await NS(),s=n[0];s!==void 0&&gC(s.layout);for(let f of n){let y=ke(f.wsUrl)??wt;sa(f.layout.installDir,y)}let i=n.map(f=>EZ(f)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),Gc(),process.exit(0));let c=()=>{n.forEach((f,y)=>{let p=i[y];if(p===void 0)return;let A=Le(f.layout);ab(A,{socketOpen:p.hasMacSocketOpen(),staleAfterMs:12e4})&&p.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let f=n[0]?.layout;f!==void 0&&(vt(f)||sl(f.installDir))},m=await Wk({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):Oc({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let f of i)f.startLocalHealthCheck(),f.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=fr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),qi(),d()});d=()=>{S(),m.stop(),Gc(),console.log("[agent-witch] Shutting down.");for(let f of i)f.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},pd=WZ});var OC=l(()=>{"use strict";pG()});var mG={};$t(mG,{startAgentWitchClient:()=>pd});var gG=l(()=>{"use strict";OC();OC();zo();ky();Nu();if(!et()&&Do(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Mu(process.argv.slice(e))),pd()}});Py();ky();zo();Nu();var yE="20.x",SE="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var bK=e=>[`Node.js ${yE} or newer is required (found ${e}).`,SE].join(" "),AE=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${bK(process.version)}
`),process.exit(1))};var xZ=async()=>{Qe("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Xy(),Yy)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},RZ=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(v0(),_0)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},IZ=async()=>{if(!Do(et()?void 0:__agentWitchImportMetaUrl))return;AE();let e=process.argv.indexOf("report");e>=0&&process.exit(Mu(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await xZ();return}if(t==="wake"){await RZ();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(kI(),vI));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(FF(),HF));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(gG(),mG));await r()};IZ();
