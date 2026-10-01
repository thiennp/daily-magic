#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var yG=Object.create;var lh=Object.defineProperty;var SG=Object.getOwnPropertyDescriptor;var AG=Object.getOwnPropertyNames;var bG=Object.getPrototypeOf,PG=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var v=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Dt=(e,t)=>{for(var r in t)lh(e,r,{get:t[r],enumerable:!0})},wG=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of AG(t))!PG.call(e,n)&&n!==r&&lh(e,n,{get:()=>t[n],enumerable:!(o=SG(t,n))||o.enumerable});return e};var g=(e,t,r)=>(r=e!=null?yG(bG(e)):{},wG(t||!e||!e.__esModule?lh(r,"default",{value:e,enumerable:!0}):r,e));var Ei,IC,OC,ko,ch,xZ,MC,ud,jt,lr,pd,md,Fn,Un,cr,dh,gd,fd,hd,xi,St,Bn,Gn,yd,Gr,uh,NC,qe=l(()=>{"use strict";Ei={production:".agent-witch",localhost:".local-agent-witch"},IC={production:47892,localhost:47893},OC={production:"com.agent-witch",localhost:"com.local-agent-witch"},ko={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},ch="app",xZ=`${ch}/agent-witch.js`,MC=`${ch}/command`,ud={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},jt=Ei.production,lr=Ei.localhost,pd=IC.production,md=IC.localhost,Fn=OC.production,Un=OC.localhost,cr="profiles",dh=ko.activeProfile,gd="harness",fd="sets",hd="manifest.json",xi=ud.projectsDir,St=ud.logsDir,Bn="agent-witch.log",Gn="agent-witch.error.log",yd=ud.reportsDir,Gr=ud.deviceKeypairJson,uh=ch,NC="agent-witch.js"});var zC=l(()=>{"use strict";qe()});var DC,Co,Ri,Sd=l(()=>{"use strict";DC=g(require("node:path"));qe();Co=e=>DC.default.basename(e)===lr,Ri=e=>Co(e)?Un:Fn});var jC=l(()=>{"use strict";zC();Sd()});var $C,ph,_G,Ii,vG,kG,HC,CG,TG,FC=l(()=>{"use strict";jC();qe();$C=g(require("node:os")),ph=g(require("node:path")),_G=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?ph.default.resolve(e):ph.default.join($C.default.homedir(),jt)},Ii=Ri(_G()),vG=`${Ii}-wake`,kG=`${Ii}-live`,HC=`${Ii}-watchdog`,CG=`${Ii}-automation-scheduler`,TG=`${Ii}-updater`});var qn=v(mh=>{"use strict";Object.defineProperty(mh,"__esModule",{value:!0});mh.stringify=LG;function LG(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=v(gh=>{"use strict";Object.defineProperty(gh,"__esModule",{value:!0});gh.generateTypeGuardError=WG;var UC=qn();function WG(e,t,r){return(0,UC.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,UC.stringify)(e)}) to be "${r}"`}});var qr=v(Ad=>{"use strict";Object.defineProperty(Ad,"__esModule",{value:!0});Ad.isNonNullObject=void 0;var EG=O(),xG=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,EG.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Ad.isNonNullObject=xG});var $t=v(ye=>{"use strict";Object.defineProperty(ye,"__esModule",{value:!0});ye.attachTypeGuardMeta=ye.isArrayTypeGuard=ye.isNestedObjectTypeGuard=ye.getTypeGuardWrapperKind=ye.getTypeGuardInnerGuard=ye.getTypeGuardItemGuard=ye.getTypeGuardSchema=void 0;var RG=e=>e.schema;ye.getTypeGuardSchema=RG;var IG=e=>e.itemGuard;ye.getTypeGuardItemGuard=IG;var OG=e=>e.innerGuard;ye.getTypeGuardInnerGuard=OG;var MG=e=>e.wrapperKind;ye.getTypeGuardWrapperKind=MG;var NG=e=>{if((0,ye.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};ye.isNestedObjectTypeGuard=NG;var zG=e=>{if((0,ye.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};ye.isArrayTypeGuard=zG;var DG=(e,t)=>Object.assign(e,t);ye.attachTypeGuardMeta=DG});var Oi=v(To=>{"use strict";Object.defineProperty(To,"__esModule",{value:!0});To.getExpectedTypeName=To.getTypeGuardDisplayName=void 0;var BC=$t(),jG=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};To.getTypeGuardDisplayName=jG;var $G=e=>{let t=(0,BC.getTypeGuardWrapperKind)(e),r=(0,BC.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,To.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};To.getExpectedTypeName=$G});var Lo=v(bd=>{"use strict";Object.defineProperty(bd,"__esModule",{value:!0});bd.createValidationResult=void 0;var HG=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});bd.createValidationResult=HG});var Vn=v(Pd=>{"use strict";Object.defineProperty(Pd,"__esModule",{value:!0});Pd.createValidationError=void 0;var FG=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Pd.createValidationError=FG});var Kn=v(wd=>{"use strict";Object.defineProperty(wd,"__esModule",{value:!0});wd.createTreeNode=void 0;var UG=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});wd.createTreeNode=UG});var Mi=v(_d=>{"use strict";Object.defineProperty(_d,"__esModule",{value:!0});_d.combineResults=void 0;var BG=Lo(),GG=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,BG.createValidationResult)(r,o,n)};_d.combineResults=GG});var kd=v(vd=>{"use strict";Object.defineProperty(vd,"__esModule",{value:!0});vd.createSimplifiedTree=void 0;var GC=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=GC(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},qG=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=GC(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};vd.createSimplifiedTree=qG});var zi=v(Td=>{"use strict";Object.defineProperty(Td,"__esModule",{value:!0});Td.validateObject=void 0;var VG=qr(),Ni=Lo(),KG=Vn(),Cd=Kn(),JG=Mi(),qC=Ld(),YG=(e,t,r)=>{let o=()=>{let i=(0,KG.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Cd.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Ni.createValidationResult)(!1,[],a):(0,Ni.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Ni.createValidationResult)(!0,[],(0,Cd.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...u]=c,m=d,S=t[m],f=e[m],y=(0,qC.validateProperty)(m,f,S,r);return y.valid?u.length===0?(0,Ni.createValidationResult)(!0,[],(0,Cd.createTreeNode)(r.path,!0,"object",e)):a(u):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,qC.validateProperty)(d,e[d],u,r)}),a=(0,JG.combineResults)(i,r.path),c=(0,Cd.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,Ni.createValidationResult)(a.valid,a.errors,c)};return(0,VG.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Td.validateObject=YG});var KC=v(xd=>{"use strict";Object.defineProperty(xd,"__esModule",{value:!0});xd.validateArray=void 0;var XG=qn(),Wd=Lo(),VC=Vn(),Ed=Kn(),ZG=Mi(),QG=zi(),e2=Oi(),t2=$t(),r2=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,VC.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Ed.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,Wd.createValidationResult)(!1,[c],d)}let n=(0,t2.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,m={path:u,config:r.config||null};if(n)return(0,QG.validateObject)(c,n,m);let S=t(c,null),f=(0,e2.getExpectedTypeName)(t),y=(0,XG.stringify)(c);if(S)return(0,Wd.createValidationResult)(!0,[],(0,Ed.createTreeNode)(u,!0,f,c));let p=y.length>200?`Expected ${u} to be "${f}"`:`Expected ${u} (${y}) to be "${f}"`,A=(0,VC.createValidationError)(u,f,c,p),b=(0,Ed.createTreeNode)(u,!1,f,c);return b.errors=[A],(0,Wd.createValidationResult)(!1,[A],b)}),i=(0,ZG.combineResults)(s,o),a=(0,Ed.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,Wd.createValidationResult)(i.valid,i.errors,a)};xd.validateArray=r2});var Ld=v(Id=>{"use strict";Object.defineProperty(Id,"__esModule",{value:!0});Id.validateProperty=void 0;var JC=Lo(),o2=Vn(),YC=Kn(),n2=Oi(),Rd=$t(),s2=zi(),i2=KC(),a2=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,Rd.getTypeGuardSchema)(r),c=(0,Rd.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,s2.validateObject)(t,a,s);if(c&&(0,Rd.isArrayTypeGuard)(r))return(0,i2.validateArray)(t,c,s)}let d=u=>{let m=r(t,u),S=(0,n2.getExpectedTypeName)(r);return m?(0,JC.createValidationResult)(!0,[],(0,YC.createTreeNode)(n,!0,S,t)):(()=>{let f=(0,o2.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,YC.createTreeNode)(n,!1,S,t);return y.errors=[f],(0,JC.createValidationResult)(!1,[f],y)})()};if((0,Rd.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};Id.validateProperty=a2});var Md=v(Od=>{"use strict";Object.defineProperty(Od,"__esModule",{value:!0});Od.isNil=void 0;var l2=O(),c2=function(e,t){return e!=null?(t&&t.callbackOnError((0,l2.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Od.isNil=c2});var fh=v(Nd=>{"use strict";Object.defineProperty(Nd,"__esModule",{value:!0});Nd.isDefined=void 0;var d2=O(),u2=Md(),p2=function(e,t){return(0,u2.isNil)(e,null)?(t&&t.callbackOnError((0,d2.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Nd.isDefined=p2});var hh=v(zd=>{"use strict";Object.defineProperty(zd,"__esModule",{value:!0});zd.reportValidationResults=void 0;var m2=kd(),XC=fh(),g2=Md(),f2=(e,t)=>{if(e.valid===!0||(0,g2.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,XC.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,m2.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,XC.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};zd.reportValidationResults=f2});var yh=v(re=>{"use strict";Object.defineProperty(re,"__esModule",{value:!0});re.Validation=re.reportValidationResults=re.validateObject=re.validateProperty=re.createSimplifiedTree=re.combineResults=re.createTreeNode=re.createValidationError=re.createValidationResult=re.getExpectedTypeName=void 0;var h2=Oi();Object.defineProperty(re,"getExpectedTypeName",{enumerable:!0,get:function(){return h2.getExpectedTypeName}});var y2=Lo();Object.defineProperty(re,"createValidationResult",{enumerable:!0,get:function(){return y2.createValidationResult}});var S2=Vn();Object.defineProperty(re,"createValidationError",{enumerable:!0,get:function(){return S2.createValidationError}});var A2=Kn();Object.defineProperty(re,"createTreeNode",{enumerable:!0,get:function(){return A2.createTreeNode}});var b2=Mi();Object.defineProperty(re,"combineResults",{enumerable:!0,get:function(){return b2.combineResults}});var P2=kd();Object.defineProperty(re,"createSimplifiedTree",{enumerable:!0,get:function(){return P2.createSimplifiedTree}});var w2=Ld();Object.defineProperty(re,"validateProperty",{enumerable:!0,get:function(){return w2.validateProperty}});var _2=zi();Object.defineProperty(re,"validateObject",{enumerable:!0,get:function(){return _2.validateObject}});var v2=hh();Object.defineProperty(re,"reportValidationResults",{enumerable:!0,get:function(){return v2.reportValidationResults}});var k2=Lo(),C2=Mi(),T2=Vn(),L2=Kn(),W2=Ld(),E2=zi(),x2=hh(),R2=kd();re.Validation={result:k2.createValidationResult,combine:C2.combineResults,error:T2.createValidationError,treeNode:L2.createTreeNode,property:W2.validateProperty,object:E2.validateObject,report:x2.reportValidationResults,createSimplifiedTree:R2.createSimplifiedTree}});var Dd=v(Sh=>{"use strict";Object.defineProperty(Sh,"__esModule",{value:!0});Sh.isType=O2;var ZC=qr(),QC=yh(),I2=$t();function O2(e){if(!(0,ZC.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,QC.validateObject)(r,e,s);return(0,QC.reportValidationResults)(i,o||null),i.valid}return(0,ZC.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,I2.attachTypeGuardMeta)(t,{schema:e})}});var oT=v(Wo=>{"use strict";Object.defineProperty(Wo,"__esModule",{value:!0});Wo.isNestedType=Wo.isShape=void 0;Wo.isSchema=Di;var eT=qr(),tT=yh(),rT=$t();function Di(e){if(!(0,eT.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=N2(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,tT.validateObject)(o,t,i);return(0,tT.reportValidationResults)(a,n||null),a.valid}return(0,eT.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,rT.attachTypeGuardMeta)(r,{schema:t})}function M2(e){return typeof e=="function"?e:Array.isArray(e)?z2(e):typeof e=="object"&&e!==null?Di(e):e}function N2(e){let t={};for(let[r,o]of Object.entries(e))t[r]=M2(o);return t}function z2(e){let t=e[0],r=Di(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,rT.attachTypeGuardMeta)(o,{itemGuard:r})}Wo.isShape=Di;Wo.isNestedType=Di});var nT=v(Ah=>{"use strict";Object.defineProperty(Ah,"__esModule",{value:!0});Ah.isObjectWith=j2;var D2=Dd();function j2(e){return(0,D2.isType)(e)}});var sT=v(bh=>{"use strict";Object.defineProperty(bh,"__esModule",{value:!0});bh.isObject=H2;var $2=Dd();function H2(e){return(0,$2.isType)(e)}});var iT=v(Ph=>{"use strict";Object.defineProperty(Ph,"__esModule",{value:!0});Ph.guardWithTolerance=F2;function F2(e,t,r){return t(e,r),e}});var aT=v(wh=>{"use strict";Object.defineProperty(wh,"__esModule",{value:!0});wh.isBranded=B2;var U2=O();function B2(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,U2.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var lT=v(jd=>{"use strict";Object.defineProperty(jd,"__esModule",{value:!0});jd.BrandSymbols=void 0;jd.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var cT=v($d=>{"use strict";Object.defineProperty($d,"__esModule",{value:!0});$d.isAny=void 0;var G2=function(e){return!0};$d.isAny=G2});var ji=v(_h=>{"use strict";Object.defineProperty(_h,"__esModule",{value:!0});_h.reportTypeGuardError=V2;var q2=O();function V2(e,t,r){e&&e.callbackOnError((0,q2.generateTypeGuardError)(t,e.identifier,r))}});var dT=v(Hd=>{"use strict";Object.defineProperty(Hd,"__esModule",{value:!0});Hd.isBoolean=void 0;var K2=ji(),J2=function(t,r){return typeof t!="boolean"?((0,K2.reportTypeGuardError)(r,t,"boolean"),!1):!0};Hd.isBoolean=J2});var uT=v(Fd=>{"use strict";Object.defineProperty(Fd,"__esModule",{value:!0});Fd.isDate=void 0;var Y2=O(),X2=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,Y2.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Fd.isDate=X2});var vh=v(Ud=>{"use strict";Object.defineProperty(Ud,"__esModule",{value:!0});Ud.isNumber=void 0;var Z2=ji(),Q2=function(t,r){return typeof t!="number"||isNaN(t)?((0,Z2.reportTypeGuardError)(r,t,"number"),!1):!0};Ud.isNumber=Q2});var pT=v(Bd=>{"use strict";Object.defineProperty(Bd,"__esModule",{value:!0});Bd.isString=void 0;var e5=ji(),t5=function(t,r){return typeof t!="string"?((0,e5.reportTypeGuardError)(r,t,"string"),!1):!0};Bd.isString=t5});var mT=v(Gd=>{"use strict";Object.defineProperty(Gd,"__esModule",{value:!0});Gd.isUnknown=void 0;var r5=function(e){return!0};Gd.isUnknown=r5});var gT=v(qd=>{"use strict";Object.defineProperty(qd,"__esModule",{value:!0});qd.isFunction=void 0;var o5=O(),n5=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,o5.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};qd.isFunction=n5});var hT=v(Vd=>{"use strict";Object.defineProperty(Vd,"__esModule",{value:!0});Vd.isFile=void 0;var fT=O(),s5=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,fT.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,fT.generateTypeGuardError)(e,t.identifier,"File")),!1)};Vd.isFile=s5});var ST=v(Kd=>{"use strict";Object.defineProperty(Kd,"__esModule",{value:!0});Kd.isFileList=void 0;var yT=O(),i5=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,yT.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,yT.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Kd.isFileList=i5});var bT=v(Jd=>{"use strict";Object.defineProperty(Jd,"__esModule",{value:!0});Jd.isBlob=void 0;var AT=O(),a5=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,AT.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,AT.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Jd.isBlob=a5});var wT=v(Yd=>{"use strict";Object.defineProperty(Yd,"__esModule",{value:!0});Yd.isFormData=void 0;var PT=O(),l5=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,PT.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,PT.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Yd.isFormData=l5});var vT=v(Xd=>{"use strict";Object.defineProperty(Xd,"__esModule",{value:!0});Xd.isURL=void 0;var _T=O(),c5=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,_T.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,_T.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Xd.isURL=c5});var CT=v(Zd=>{"use strict";Object.defineProperty(Zd,"__esModule",{value:!0});Zd.isURLSearchParams=void 0;var kT=O(),d5=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,kT.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,kT.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Zd.isURLSearchParams=d5});var TT=v(Qd=>{"use strict";Object.defineProperty(Qd,"__esModule",{value:!0});Qd.isMap=void 0;var u5=O(),p5=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,u5.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Qd.isMap=p5});var LT=v(eu=>{"use strict";Object.defineProperty(eu,"__esModule",{value:!0});eu.isSet=void 0;var m5=O(),g5=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,m5.generateTypeGuardError)(e,t.identifier,"Set")),!1)};eu.isSet=g5});var WT=v(kh=>{"use strict";Object.defineProperty(kh,"__esModule",{value:!0});kh.isIndexSignature=h5;var f5=O();function h5(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,f5.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,u)=>{let m=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),f=t(m,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return S&&f})}}});var ET=v(tu=>{"use strict";Object.defineProperty(tu,"__esModule",{value:!0});tu.isError=void 0;var y5=ji(),S5=function(t,r){return t instanceof Error?!0:((0,y5.reportTypeGuardError)(r,t,"Error"),!1)};tu.isError=S5});var Th=v(Ch=>{"use strict";Object.defineProperty(Ch,"__esModule",{value:!0});Ch.isArrayWithEachItem=P5;var A5=O(),b5=$t();function P5(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,A5.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,b5.attachTypeGuardMeta)(t,{itemGuard:e})}});var Lh=v(ru=>{"use strict";Object.defineProperty(ru,"__esModule",{value:!0});ru.isNonEmptyArray=void 0;var w5=O(),_5=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,w5.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};ru.isNonEmptyArray=_5});var xT=v(Wh=>{"use strict";Object.defineProperty(Wh,"__esModule",{value:!0});Wh.isNonEmptyArrayWithEachItem=C5;var v5=Th(),k5=Lh();function C5(e){return function(t,r){return(0,v5.isArrayWithEachItem)(e)(t,r)&&(0,k5.isNonEmptyArray)(t,r)}}});var IT=v(Eh=>{"use strict";Object.defineProperty(Eh,"__esModule",{value:!0});Eh.isTuple=T5;var RT=O();function T5(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,RT.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,RT.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var OT=v(xh=>{"use strict";Object.defineProperty(xh,"__esModule",{value:!0});xh.isObjectWithEachItem=W5;var L5=O();function W5(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,L5.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var MT=v(Rh=>{"use strict";Object.defineProperty(Rh,"__esModule",{value:!0});Rh.isPartialOf=x5;var E5=qr();function x5(e){return function(t,r){if(!(0,E5.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var NT=v(Ih=>{"use strict";Object.defineProperty(Ih,"__esModule",{value:!0});Ih.isPick=I5;var R5=qr();function I5(e,...t){return function(r,o){if(!(0,R5.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var zT=v(Oh=>{"use strict";Object.defineProperty(Oh,"__esModule",{value:!0});Oh.isOmit=M5;var O5=qr();function M5(e,...t){return function(r,o){if(!(0,O5.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),m=u.indexOf(" ("),S=m>=0?u.slice(0,m):u;if(a.has(S))return!1;let f=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(f&&!Object.prototype.hasOwnProperty.call(r,f))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var DT=v(ou=>{"use strict";Object.defineProperty(ou,"__esModule",{value:!0});ou.isNonEmptyString=void 0;var N5=O(),z5=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,N5.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};ou.isNonEmptyString=z5});var jT=v(nu=>{"use strict";Object.defineProperty(nu,"__esModule",{value:!0});nu.isNonNegativeNumber=void 0;var D5=O(),j5=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,D5.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};nu.isNonNegativeNumber=j5});var $T=v(su=>{"use strict";Object.defineProperty(su,"__esModule",{value:!0});su.isPositiveNumber=void 0;var $5=O(),H5=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,$5.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};su.isPositiveNumber=H5});var HT=v(iu=>{"use strict";Object.defineProperty(iu,"__esModule",{value:!0});iu.isNonPositiveNumber=void 0;var F5=O(),U5=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,F5.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};iu.isNonPositiveNumber=U5});var FT=v(au=>{"use strict";Object.defineProperty(au,"__esModule",{value:!0});au.isNegativeNumber=void 0;var B5=O(),G5=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,B5.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};au.isNegativeNumber=G5});var UT=v(lu=>{"use strict";Object.defineProperty(lu,"__esModule",{value:!0});lu.isInteger=void 0;var q5=O(),V5=vh(),K5=function(e,t){return!(0,V5.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,q5.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};lu.isInteger=K5});var BT=v(cu=>{"use strict";Object.defineProperty(cu,"__esModule",{value:!0});cu.isPositiveInteger=void 0;var J5=O(),Y5=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,J5.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};cu.isPositiveInteger=Y5});var GT=v(du=>{"use strict";Object.defineProperty(du,"__esModule",{value:!0});du.isNegativeInteger=void 0;var X5=O(),Z5=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,X5.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};du.isNegativeInteger=Z5});var qT=v(uu=>{"use strict";Object.defineProperty(uu,"__esModule",{value:!0});uu.isNonNegativeInteger=void 0;var Q5=O(),eq=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Q5.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};uu.isNonNegativeInteger=eq});var VT=v(pu=>{"use strict";Object.defineProperty(pu,"__esModule",{value:!0});pu.isNonPositiveInteger=void 0;var tq=O(),rq=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,tq.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};pu.isNonPositiveInteger=rq});var KT=v(gu=>{"use strict";Object.defineProperty(gu,"__esModule",{value:!0});gu.isNumeric=void 0;var mu=O(),oq=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,mu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,mu.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,mu.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,mu.generateTypeGuardError)(e,t.identifier,"number key")),!1};gu.isNumeric=oq});var JT=v(fu=>{"use strict";Object.defineProperty(fu,"__esModule",{value:!0});fu.isBooleanLike=void 0;var Mh=O(),nq=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Mh.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Mh.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};fu.isBooleanLike=nq});var YT=v(hu=>{"use strict";Object.defineProperty(hu,"__esModule",{value:!0});hu.isDateLike=void 0;var $i=O(),sq=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,$i.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,$i.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,$i.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,$i.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,$i.generateTypeGuardError)(e,t.identifier,"date-like")),!1};hu.isDateLike=sq});var XT=v(yu=>{"use strict";Object.defineProperty(yu,"__esModule",{value:!0});yu.isBigInt=void 0;var iq=O(),aq=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,iq.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};yu.isBigInt=aq});var zh=v(Nh=>{"use strict";Object.defineProperty(Nh,"__esModule",{value:!0});Nh.isOneOf=lq;var ZT=qn();function lq(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,ZT.stringify)(t)}) must be one of following values ${e.map(ZT.stringify).join(" | ")}`),o}}});var QT=v(Dh=>{"use strict";Object.defineProperty(Dh,"__esModule",{value:!0});Dh.isOneOfTypes=uq;var cq=qn(),dq=Oi();function uq(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,cq.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,dq.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;a.includes(u)||a.push(u)}})),r.callbackOnError(a.join(`
`))}return n}}});var eL=v(jh=>{"use strict";Object.defineProperty(jh,"__esModule",{value:!0});jh.isIntersectionOf=pq;function pq(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var tL=v($h=>{"use strict";Object.defineProperty($h,"__esModule",{value:!0});$h.isExtensionOf=mq;function mq(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var rL=v(Hh=>{"use strict";Object.defineProperty(Hh,"__esModule",{value:!0});Hh.isNullOr=fq;var gq=$t();function fq(e){function t(r,o){return r===null?!0:e(r,o)}return(0,gq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var oL=v(Fh=>{"use strict";Object.defineProperty(Fh,"__esModule",{value:!0});Fh.isUndefinedOr=yq;var hq=$t();function yq(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,hq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var nL=v(Uh=>{"use strict";Object.defineProperty(Uh,"__esModule",{value:!0});Uh.isNilOr=Aq;var Sq=$t();function Aq(e){function t(r,o){return r==null?!0:e(r,o)}return(0,Sq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var sL=v(Bh=>{"use strict";Object.defineProperty(Bh,"__esModule",{value:!0});Bh.isAsserted=bq;function bq(e){return!0}});var iL=v(Gh=>{"use strict";Object.defineProperty(Gh,"__esModule",{value:!0});Gh.isEnum=wq;var Pq=zh();function wq(e){return function(t,r){return(0,Pq.isOneOf)(...Object.values(e))(t,r)}}});var aL=v(qh=>{"use strict";Object.defineProperty(qh,"__esModule",{value:!0});qh.isEqualTo=kq;var _q=O(),vq=qn();function kq(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,_q.generateTypeGuardError)(t,r.identifier,`equal to ${(0,vq.stringify)(e)}`)),!1):!0}}});var lL=v(Su=>{"use strict";Object.defineProperty(Su,"__esModule",{value:!0});Su.isRegex=void 0;var Cq=O(),Tq=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,Cq.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Su.isRegex=Tq});var dL=v(Vh=>{"use strict";Object.defineProperty(Vh,"__esModule",{value:!0});Vh.isPattern=Lq;var cL=O();function Lq(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,cL.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,cL.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var uL=v(Kh=>{"use strict";Object.defineProperty(Kh,"__esModule",{value:!0});Kh.by=Wq;function Wq(e){return function(t){return e(t,null)}}});var pL=v(Jh=>{"use strict";Object.defineProperty(Jh,"__esModule",{value:!0});Jh.toNumber=Eq;function Eq(e){return typeof e=="number"?e:Number(e)}});var mL=v(Yh=>{"use strict";Object.defineProperty(Yh,"__esModule",{value:!0});Yh.toDate=xq;function xq(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var gL=v(Xh=>{"use strict";Object.defineProperty(Xh,"__esModule",{value:!0});Xh.toBoolean=Rq;function Rq(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var fL=v(Au=>{"use strict";Object.defineProperty(Au,"__esModule",{value:!0});Au.isSymbol=void 0;var Iq=O(),Oq=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,Iq.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Au.isSymbol=Oq});var Jn=v(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.isDateLike=P.isBooleanLike=P.isNumeric=P.isNonPositiveInteger=P.isNonNegativeInteger=P.isNegativeInteger=P.isPositiveInteger=P.isInteger=P.isNegativeNumber=P.isNonPositiveNumber=P.isPositiveNumber=P.isNonNegativeNumber=P.isNonEmptyString=P.isOmit=P.isPick=P.isPartialOf=P.isObjectWithEachItem=P.isNonNullObject=P.isTuple=P.isNonEmptyArrayWithEachItem=P.isNonEmptyArray=P.isArrayWithEachItem=P.isError=P.isIndexSignature=P.isSet=P.isMap=P.isURLSearchParams=P.isURL=P.isFormData=P.isBlob=P.isFileList=P.isFile=P.isFunction=P.isUnknown=P.isString=P.isNumber=P.isNil=P.isDefined=P.isDate=P.isBoolean=P.isAny=P.BrandSymbols=P.isBranded=P.guardWithTolerance=P.isObject=P.isObjectWith=P.isNestedType=P.isShape=P.isSchema=P.isType=void 0;P.isSymbol=P.toBoolean=P.toDate=P.toNumber=P.by=P.generateTypeGuardError=P.isPattern=P.isRegex=P.isEqualTo=P.isEnum=P.isAsserted=P.isNilOr=P.isUndefinedOr=P.isNullOr=P.isExtensionOf=P.isIntersectionOf=P.isOneOfTypes=P.isOneOf=P.isBigInt=void 0;var Mq=Dd();Object.defineProperty(P,"isType",{enumerable:!0,get:function(){return Mq.isType}});var Zh=oT();Object.defineProperty(P,"isSchema",{enumerable:!0,get:function(){return Zh.isSchema}});Object.defineProperty(P,"isShape",{enumerable:!0,get:function(){return Zh.isShape}});Object.defineProperty(P,"isNestedType",{enumerable:!0,get:function(){return Zh.isNestedType}});var Nq=nT();Object.defineProperty(P,"isObjectWith",{enumerable:!0,get:function(){return Nq.isObjectWith}});var zq=sT();Object.defineProperty(P,"isObject",{enumerable:!0,get:function(){return zq.isObject}});var Dq=iT();Object.defineProperty(P,"guardWithTolerance",{enumerable:!0,get:function(){return Dq.guardWithTolerance}});var jq=aT();Object.defineProperty(P,"isBranded",{enumerable:!0,get:function(){return jq.isBranded}});var $q=lT();Object.defineProperty(P,"BrandSymbols",{enumerable:!0,get:function(){return $q.BrandSymbols}});var Hq=cT();Object.defineProperty(P,"isAny",{enumerable:!0,get:function(){return Hq.isAny}});var Fq=dT();Object.defineProperty(P,"isBoolean",{enumerable:!0,get:function(){return Fq.isBoolean}});var Uq=uT();Object.defineProperty(P,"isDate",{enumerable:!0,get:function(){return Uq.isDate}});var Bq=fh();Object.defineProperty(P,"isDefined",{enumerable:!0,get:function(){return Bq.isDefined}});var Gq=Md();Object.defineProperty(P,"isNil",{enumerable:!0,get:function(){return Gq.isNil}});var qq=vh();Object.defineProperty(P,"isNumber",{enumerable:!0,get:function(){return qq.isNumber}});var Vq=pT();Object.defineProperty(P,"isString",{enumerable:!0,get:function(){return Vq.isString}});var Kq=mT();Object.defineProperty(P,"isUnknown",{enumerable:!0,get:function(){return Kq.isUnknown}});var Jq=gT();Object.defineProperty(P,"isFunction",{enumerable:!0,get:function(){return Jq.isFunction}});var Yq=hT();Object.defineProperty(P,"isFile",{enumerable:!0,get:function(){return Yq.isFile}});var Xq=ST();Object.defineProperty(P,"isFileList",{enumerable:!0,get:function(){return Xq.isFileList}});var Zq=bT();Object.defineProperty(P,"isBlob",{enumerable:!0,get:function(){return Zq.isBlob}});var Qq=wT();Object.defineProperty(P,"isFormData",{enumerable:!0,get:function(){return Qq.isFormData}});var eV=vT();Object.defineProperty(P,"isURL",{enumerable:!0,get:function(){return eV.isURL}});var tV=CT();Object.defineProperty(P,"isURLSearchParams",{enumerable:!0,get:function(){return tV.isURLSearchParams}});var rV=TT();Object.defineProperty(P,"isMap",{enumerable:!0,get:function(){return rV.isMap}});var oV=LT();Object.defineProperty(P,"isSet",{enumerable:!0,get:function(){return oV.isSet}});var nV=WT();Object.defineProperty(P,"isIndexSignature",{enumerable:!0,get:function(){return nV.isIndexSignature}});var sV=ET();Object.defineProperty(P,"isError",{enumerable:!0,get:function(){return sV.isError}});var iV=Th();Object.defineProperty(P,"isArrayWithEachItem",{enumerable:!0,get:function(){return iV.isArrayWithEachItem}});var aV=Lh();Object.defineProperty(P,"isNonEmptyArray",{enumerable:!0,get:function(){return aV.isNonEmptyArray}});var lV=xT();Object.defineProperty(P,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return lV.isNonEmptyArrayWithEachItem}});var cV=IT();Object.defineProperty(P,"isTuple",{enumerable:!0,get:function(){return cV.isTuple}});var dV=qr();Object.defineProperty(P,"isNonNullObject",{enumerable:!0,get:function(){return dV.isNonNullObject}});var uV=OT();Object.defineProperty(P,"isObjectWithEachItem",{enumerable:!0,get:function(){return uV.isObjectWithEachItem}});var pV=MT();Object.defineProperty(P,"isPartialOf",{enumerable:!0,get:function(){return pV.isPartialOf}});var mV=NT();Object.defineProperty(P,"isPick",{enumerable:!0,get:function(){return mV.isPick}});var gV=zT();Object.defineProperty(P,"isOmit",{enumerable:!0,get:function(){return gV.isOmit}});var fV=DT();Object.defineProperty(P,"isNonEmptyString",{enumerable:!0,get:function(){return fV.isNonEmptyString}});var hV=jT();Object.defineProperty(P,"isNonNegativeNumber",{enumerable:!0,get:function(){return hV.isNonNegativeNumber}});var yV=$T();Object.defineProperty(P,"isPositiveNumber",{enumerable:!0,get:function(){return yV.isPositiveNumber}});var SV=HT();Object.defineProperty(P,"isNonPositiveNumber",{enumerable:!0,get:function(){return SV.isNonPositiveNumber}});var AV=FT();Object.defineProperty(P,"isNegativeNumber",{enumerable:!0,get:function(){return AV.isNegativeNumber}});var bV=UT();Object.defineProperty(P,"isInteger",{enumerable:!0,get:function(){return bV.isInteger}});var PV=BT();Object.defineProperty(P,"isPositiveInteger",{enumerable:!0,get:function(){return PV.isPositiveInteger}});var wV=GT();Object.defineProperty(P,"isNegativeInteger",{enumerable:!0,get:function(){return wV.isNegativeInteger}});var _V=qT();Object.defineProperty(P,"isNonNegativeInteger",{enumerable:!0,get:function(){return _V.isNonNegativeInteger}});var vV=VT();Object.defineProperty(P,"isNonPositiveInteger",{enumerable:!0,get:function(){return vV.isNonPositiveInteger}});var kV=KT();Object.defineProperty(P,"isNumeric",{enumerable:!0,get:function(){return kV.isNumeric}});var CV=JT();Object.defineProperty(P,"isBooleanLike",{enumerable:!0,get:function(){return CV.isBooleanLike}});var TV=YT();Object.defineProperty(P,"isDateLike",{enumerable:!0,get:function(){return TV.isDateLike}});var LV=XT();Object.defineProperty(P,"isBigInt",{enumerable:!0,get:function(){return LV.isBigInt}});var WV=zh();Object.defineProperty(P,"isOneOf",{enumerable:!0,get:function(){return WV.isOneOf}});var EV=QT();Object.defineProperty(P,"isOneOfTypes",{enumerable:!0,get:function(){return EV.isOneOfTypes}});var xV=eL();Object.defineProperty(P,"isIntersectionOf",{enumerable:!0,get:function(){return xV.isIntersectionOf}});var RV=tL();Object.defineProperty(P,"isExtensionOf",{enumerable:!0,get:function(){return RV.isExtensionOf}});var IV=rL();Object.defineProperty(P,"isNullOr",{enumerable:!0,get:function(){return IV.isNullOr}});var OV=oL();Object.defineProperty(P,"isUndefinedOr",{enumerable:!0,get:function(){return OV.isUndefinedOr}});var MV=nL();Object.defineProperty(P,"isNilOr",{enumerable:!0,get:function(){return MV.isNilOr}});var NV=sL();Object.defineProperty(P,"isAsserted",{enumerable:!0,get:function(){return NV.isAsserted}});var zV=iL();Object.defineProperty(P,"isEnum",{enumerable:!0,get:function(){return zV.isEnum}});var DV=aL();Object.defineProperty(P,"isEqualTo",{enumerable:!0,get:function(){return DV.isEqualTo}});var jV=lL();Object.defineProperty(P,"isRegex",{enumerable:!0,get:function(){return jV.isRegex}});var $V=dL();Object.defineProperty(P,"isPattern",{enumerable:!0,get:function(){return $V.isPattern}});var HV=O();Object.defineProperty(P,"generateTypeGuardError",{enumerable:!0,get:function(){return HV.generateTypeGuardError}});var FV=uL();Object.defineProperty(P,"by",{enumerable:!0,get:function(){return FV.by}});var UV=pL();Object.defineProperty(P,"toNumber",{enumerable:!0,get:function(){return UV.toNumber}});var BV=mL();Object.defineProperty(P,"toDate",{enumerable:!0,get:function(){return BV.toDate}});var GV=gL();Object.defineProperty(P,"toBoolean",{enumerable:!0,get:function(){return GV.toBoolean}});var qV=fL();Object.defineProperty(P,"isSymbol",{enumerable:!0,get:function(){return qV.isSymbol}})});var Yn,hL,VV,yL,SL=l(()=>{"use strict";Yn=g(require("node:path")),hL=require("node:url"),VV=()=>!0,yL=()=>{if(VV()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Yn.default.dirname(Yn.default.resolve(e)):Yn.default.dirname(Yn.default.resolve(__filename))}return Yn.default.dirname((0,hL.fileURLToPath)(__agentWitchImportMetaUrl))}});var Qh,AL,D,bL,KV,Vr,L,bu,dr,PL,Pu,Xn,wu,ve,At,ey,bt,ty,N,ry=l(()=>{"use strict";Qh=g(require("node:fs")),AL=g(require("node:os")),D=g(require("node:path")),bL=g(Jn());qe();SL();Sd();Sd();KV=yL(),Vr=e=>e.trim().toLowerCase(),L=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return D.default.resolve(e);let t=D.default.resolve(KV),r=D.default.basename(t),o=D.default.basename(D.default.dirname(t));return r===uh&&(o===jt||o===lr)?D.default.dirname(t):r===jt||r===lr?t:D.default.join(AL.default.homedir(),jt)},bu=(e=L())=>D.default.join(e,uh),dr=(e=L())=>D.default.join(bu(e),NC),PL=(e,t,r)=>t!==null?D.default.join(e,cr,t,r):D.default.join(e,r),Pu=e=>PL(e.installDir,e.profileEmail,xi),Xn=e=>PL(e.installDir,e.profileEmail,St),wu=e=>e.profileEmail!==null?D.default.join(e.installDir,cr,e.profileEmail,Gr):D.default.join(e.installDir,Gr),ve=(e=L())=>Ri(e),At=(e=L())=>Co(e)?md:pd,ey=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Vr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Vr(t):null},bt=(e=L())=>{let t=D.default.join(e,dh);if(!Qh.default.existsSync(t))return null;try{let r=JSON.parse(Qh.default.readFileSync(t,"utf8"));if((0,bL.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Vr(r.email)}catch{return null}return null},ty=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Vr(r):null}let t=ey();return t!==null?t:bt()},N=e=>{let t=L(),r=bu(t),o=dr(t),n=ty(e);if(n!==null){let S=D.default.join(t,cr,n),f=D.default.join(S,gd),y=D.default.join(S,xi),p=D.default.join(S,St),A=D.default.join(S,yd),b=D.default.join(S,Gr),h=D.default.join(S,St,Bn),w=D.default.join(S,St,Gn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:p,mainLogPath:h,errorLogPath:w,reportsDir:A,deviceKeypairPath:b,configPath:D.default.join(S,"config.json"),harnessRootDir:f,harnessManifestPath:D.default.join(f,hd),harnessSetsDir:D.default.join(f,fd)}}let s=D.default.join(t,gd),i=D.default.join(t,xi),a=D.default.join(t,St),c=D.default.join(t,yd),d=D.default.join(t,Gr),u=D.default.join(t,St,Bn),m=D.default.join(t,St,Gn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:u,errorLogPath:m,reportsDir:c,deviceKeypairPath:d,configPath:D.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:D.default.join(s,hd),harnessSetsDir:D.default.join(s,fd)}}});var oy,wL,JV,YV,_L,ny,vL=l(()=>{"use strict";oy=g(require("node:fs")),wL=g(require("node:path"));qe();ry();JV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),YV=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,_L=e=>{let t=wL.default.join(e,ko.wakePort);if(!oy.default.existsSync(t))return null;try{let r=JSON.parse(oy.default.readFileSync(t,"utf8"));if(JV(r)&&YV(r.wakePort))return r.wakePort}catch{return null}return null},ny=(e=L())=>_L(e)??At(e)});var X=l(()=>{"use strict";ry();vL()});var sy,iy,_u=l(()=>{"use strict";sy=new Set(["","loginwindow","_mbsetupuser","root"]),iy=5e3});var kL,tK,CL,ay,ly=l(()=>{"use strict";kL=require("node:child_process");_u();tK=e=>e.trim().toLowerCase(),CL=e=>e==null?!1:!sy.has(tK(e)),ay=()=>{if(process.platform!=="darwin")return null;try{let t=(0,kL.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return CL(t)?t:null}catch{return null}}});var LL,TL,Pt,Hi=l(()=>{"use strict";LL=g(require("node:os"));ly();TL=e=>e.trim().toLowerCase(),Pt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?ay():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??LL.default.userInfo().username;return TL(r)===TL(o)}});var WL,EL,Eo,xL=l(()=>{"use strict";WL=require("node:child_process"),EL=g(require("node:fs"));X();Hi();Eo=(e=L())=>{let t=dr(e);if(!EL.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!Pt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=bt(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,WL.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var RL,Fi,vu=l(()=>{"use strict";RL=require("node:child_process"),Fi=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,RL.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var ku,cy,IL,oe,Cu,Ui=l(()=>{"use strict";ku=g(require("node:fs")),cy=g(require("node:path"));X();qe();IL=e=>{let t=cy.default.join(e,cr);return ku.default.existsSync(t)?ku.default.readdirSync(t).filter(r=>ku.default.statSync(cy.default.join(t,r)).isDirectory()).map(r=>Vr(r)).toSorted():[]},oe=(e=L())=>{let t=ve(e);return[{profileEmail:IL(e)[0]??null,launchAgentLabel:t}]},Cu=(e=L())=>IL(e)});var dy,OL,ML,rK,ur,Tu=l(()=>{"use strict";dy=g(require("node:fs")),OL=g(require("node:os")),ML=g(require("node:path"));X();Ui();rK=()=>ML.default.join(OL.default.homedir(),"Library","LaunchAgents"),ur=(e=L())=>{let t=ve(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of oe(e))r.add(n.launchAgentLabel);let o=rK();if(dy.default.existsSync(o))for(let n of dy.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var NL,Bi,zL=l(()=>{"use strict";X();vu();Tu();Ui();NL=(e=L())=>{let t=new Set(oe(e).map(r=>r.launchAgentLabel));return ur(e).filter(r=>!t.has(r))},Bi=(e=L())=>{for(let t of NL(e))Fi(t)}});var Gi,uy=l(()=>{"use strict";X();vu();Tu();Gi=(e=L())=>{for(let t of ur(e))Fi(t)}});var DL,jL,oK,xo,$L=l(()=>{"use strict";DL=require("node:child_process"),jL=require("node:util"),oK=(0,jL.promisify)(DL.execFile),xo=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await oK("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Ro,nK,py,my=l(()=>{"use strict";Ro=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nK=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,py=e=>{let t=e.pathValue??nK(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
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
`}});var Lu,gy=l(()=>{"use strict";Lu=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Io,fy,qi,sK,iK,aK,HL,pr,hy=l(()=>{"use strict";Io=g(require("node:fs")),fy=g(require("node:os")),qi=g(require("node:path"));qe();X();my();gy();sK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),iK=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,aK=e=>{let t=qi.default.join(e,ko.wakePort);if(!Io.default.existsSync(t))return At(e);try{let r=JSON.parse(Io.default.readFileSync(t,"utf8"));if(sK(r)&&iK(r.wakePort))return r.wakePort}catch{return At(e)}return At(e)},HL=(e,t=fy.default.homedir())=>qi.default.join(t,"Library","LaunchAgents",`${e}.plist`),pr=e=>{let t=e.installDir??L(),r=e.homeDir??fy.default.homedir(),o=HL(e.launchAgentLabel,r),n=Io.default.existsSync(o)?Io.default.readFileSync(o,"utf8"):null;if(n!==null&&Lu(n))return{ok:!0,rewritten:!1,plistPath:o};let s=py({launchAgentLabel:e.launchAgentLabel,runPath:qi.default.join(t,MC,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??aK(t)});if(!Lu(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Io.default.mkdirSync(qi.default.dirname(o),{recursive:!0}),Io.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var UL,BL,GL,Vi,lK,cK,FL,Re,yy=l(()=>{"use strict";UL=require("node:child_process"),BL=g(require("node:fs")),GL=require("node:util");X();hy();Hi();Vi=(0,GL.promisify)(UL.execFile),lK=async e=>{try{return await Vi("launchctl",["print",e]),!0}catch{return!1}},cK=async(e,t,r)=>{await lK(t)&&await Vi("launchctl",["bootout",t]).catch(()=>{}),await Vi("launchctl",["bootstrap",e,r]),await Vi("launchctl",["enable",t])},FL=async e=>{try{return await Vi("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Re=async(e,t=L())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!Pt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=pr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await FL(n))return{ok:!0};let i=s.plistPath;if(!BL.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await cK(o,n,i),await FL(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Oo,qL=l(()=>{"use strict";X();yy();Ui();Oo=async(e=L())=>{let t=[];for(let r of oe(e))(await Re(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var Qe,mr,VL=l(()=>{"use strict";uy();Hi();_u();Qe=e=>{Pt()||(Gi(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},mr=(e,t=iy)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{Pt()||e()},t);return()=>{clearInterval(r)}}});var ne=l(()=>{"use strict";FC();xL();vu();zL();uy();Tu();Hi();$L();qL();yy();hy();gy();my();Ui();ly();_u();VL()});var Sy=l(()=>{"use strict";ne()});var KL,JL,Wu,YL,Zn,XL,ZL,Mo=l(()=>{"use strict";KL=".agent-witch",JL="memory",Wu="project.json",YL="chunks.ndjson",Zn="runs.ndjson",XL="reports",ZL=".json"});var QL=l(()=>{"use strict";Mo()});var eW,Eu,Ay=l(()=>{"use strict";eW=g(require("node:path"));QL();Eu=(e,t)=>eW.default.join(e.trim(),`${t.trim()}${ZL}`)});var Ki,tW,rW=l(()=>{"use strict";Ki="agent-witch.js",tW="command"});var xu=l(()=>{"use strict";rW()});var No,oW,nW=l(()=>{"use strict";xu();No=e=>`'${e.replace(/'/g,"'\\''")}'`,oW=e=>{let t=`${e.installDir.trim()}/${"app"}/${Ki}`,r=[No("node"),No(t),"report","write","--key",No(e.reportKey.trim()),"--agent-run-id",No(e.agentRunId.trim()),"--status",No(e.status),"--summary",No(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",No(e.details.trim())),r.join(" ")}});var Ht,sW,dK,by,Ru=l(()=>{"use strict";Ay();nW();Ht={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},sW=e=>e===Ht.COMPLETED||e===Ht.FAILED,dK=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),by=(e,t)=>{let r=Eu(t.reportsDir,t.reportKey),o=oW({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Ht.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${dK({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Ie=l(()=>{"use strict";qe();X()});var Yi,aW,iW,lW,uK,Qn,pK,cW,Xi,Zi,Py,dW,uW,Qi=l(()=>{"use strict";Yi=g(require("node:fs")),aW=g(require("node:path"));Ru();Ay();Ie();iW=50,lW=e=>{let t=N(),r=Eu(t.reportsDir,e);return Yi.default.mkdirSync(aW.default.dirname(r),{recursive:!0}),r},uK=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Qn=e=>{let t=lW(e);if(!Yi.default.existsSync(t))return null;try{let r=JSON.parse(Yi.default.readFileSync(t,"utf8"));return uK(r)?r:null}catch{return null}},pK=(e,t)=>{let r=[...e,t];return r.length>iW?r.slice(r.length-iW):r},cW=e=>{let t=lW(e.reportKey);Yi.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Xi=e=>{let t=Qn(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:pK(t?.history??[],o)};return cW(n),n},Zi=e=>{let t=Qn(e.reportKey);return t!==null?t:Xi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Ht.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},Py=(e,t)=>{let r=t.trim();if(r.length===0)return Qn(e);let o=Qn(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return cW(s),s},dW=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},uW=e=>{if(e===null||!sW(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Ht.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var mK,gK,ea,pW,Iu,wy=l(()=>{"use strict";Ru();Qi();mK=new Set(Object.values(Ht)),gK=e=>mK.has(e),ea=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},pW=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Iu=e=>{if(e[0]!=="write")return pW(),1;let r=ea(e,"--key"),o=ea(e,"--agent-run-id"),n=ea(e,"--status"),s=ea(e,"--summary"),i=ea(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!gK(n)?(pW(),1):(Xi({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var et,zo=l(()=>{"use strict";et=()=>!0});var _y,mW,Do,Ou=l(()=>{"use strict";_y=g(require("node:path")),mW=require("node:url");zo();Do=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=_y.default.resolve(t);return et()?r===_y.default.resolve(__filename):e===void 0?!1:r===(0,mW.fileURLToPath)(e)}});var Mu,es,yK,bre,ts=l(()=>{"use strict";Mu="agent-witch.js",es="deps.tar.gz",yK="install.sh",bre={mainScript:`app/${Mu}`,depsArchive:`app/${es}`,installShell:yK}});var yW=l(()=>{"use strict";ts()});var SW=l(()=>{"use strict";ts();yW()});var ta,ky,Nu,SK,ra,Oe,os,oa,na,jo,Cy=l(()=>{"use strict";ta=g(require("node:fs")),ky=g(require("node:path"));SW();X();Nu="install-version.json",SK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ra=(e=L())=>ky.default.join(e,Nu),Oe=(e=L())=>{let t=ra(e);if(!ta.default.existsSync(t))return null;try{let r=JSON.parse(ta.default.readFileSync(t,"utf8"));return!SK(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},os=(e,t=L())=>{let r=ra(t);ta.default.mkdirSync(ky.default.dirname(r),{recursive:!0}),ta.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},oa=(e=L())=>Oe(e)?.bundleVersion??"203",na=(e,t)=>{let r=Oe(e);if(r!==null)return r;let o={bundleVersion:"203",appOrigin:t,updatedAt:new Date().toISOString()};return os(o,e),o},jo=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var AW,$o,Ty,Ly,Wy,zu,Ft,Ho,Ey=l(()=>{"use strict";AW=require("node:crypto"),$o=g(require("node:fs")),Ty=g(require("node:path"));X();Ly="self-update-log.ndjson",Wy=100,zu=(e=L())=>{let t=N(),r=t.installDir===e?t.logsDir:Xn({installDir:e,profileEmail:t.profileEmail});return Ty.default.join(r,Ly)},Ft=(e,t=L())=>{let r={id:(0,AW.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=zu(t);$o.default.mkdirSync(Ty.default.dirname(o),{recursive:!0});let n=$o.default.existsSync(o)?$o.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Wy+1)),JSON.stringify(r)];return $o.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Ho=(e=20,t=L())=>{let r=zu(t);if(!$o.default.existsSync(r))return[];let o=$o.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var xy,zre,Ry=l(()=>{"use strict";ts();xy="deps",zre=`${"app"}/${es}`});var bW=l(()=>{"use strict";Ry()});var PW,Kr,Fo,wW,Iy,Oy,_W=l(()=>{"use strict";PW=require("node:child_process"),Kr=g(require("node:fs")),Fo=g(require("node:path"));ts();Ry();wW=e=>Fo.default.join(e,"app",xy),Iy=e=>{let t=Fo.default.join(e,"app"),r=Fo.default.join(t,es);Kr.default.existsSync(r)&&(Kr.default.rmSync(wW(e),{recursive:!0,force:!0}),Kr.default.mkdirSync(t,{recursive:!0}),(0,PW.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Kr.default.rmSync(r,{force:!0}))},Oy=e=>{Kr.default.rmSync(Fo.default.join(e,"node_modules"),{recursive:!0,force:!0}),Kr.default.rmSync(Fo.default.join(e,"package.json"),{force:!0}),Kr.default.rmSync(Fo.default.join(e,"package-lock.json"),{force:!0})}});var vW=l(()=>{"use strict";bW();_W()});var wt,Du,kW=l(()=>{"use strict";wt="https://www.agentwitch.com",Du="wss://www.agentwitch.com/api/agent-witch/ws"});var sa,gr,CW=l(()=>{"use strict";sa="127.0.0.1",gr=`http://${sa}:43347`});var _t=l(()=>{"use strict";kW();CW()});var ia,ju,TW,Ny,AK,LW,jy,WW,vt,aa,la,$y,zy,Dy,ca,Hy,Fy,Uy,ns=l(()=>{"use strict";ia=g(require("node:fs")),ju=g(require("node:path")),TW="active-writer-work.json",Ny=new Set,AK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),LW=e=>e.profileEmail===null?ju.default.join(e.installDir,TW):ju.default.join(e.installDir,"profiles",e.profileEmail,TW),jy=e=>{let t=LW(e);if(!ia.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(ia.default.readFileSync(t,"utf8"));return!AK(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},WW=(e,t)=>{let r=LW(e);ia.default.mkdirSync(ju.default.dirname(r),{recursive:!0}),ia.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},vt=e=>jy(e).activeCount>0,aa=e=>{let t=jy(e);WW(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},la=e=>{let t=jy(e),r=Math.max(0,t.activeCount-1);if(WW(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of Ny)o()},$y=e=>(Ny.add(e),()=>{Ny.delete(e)}),zy=null,Dy=null,ca=e=>{zy=e},Hy=e=>{Dy=e},Fy=()=>{let e=zy;return zy=null,e},Uy=()=>{let e=Dy;return Dy=null,e}});var ke,$u=l(()=>{"use strict";ke=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var ss,Hu,da,By=l(()=>{"use strict";ss="qwen2.5:7b",Hu="nomic-embed-text",da="Install Ollama from https://ollama.com/download"});var ua,Gy,Fu=l(()=>{"use strict";By();ua=()=>`
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
    echo "Ollama is missing. ${da}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${da}" >&2
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
  agent_witch_ensure_ollama_model "${Hu}" "\${pull_log}"
}
`,Gy=()=>`
${ua()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var EW,bK,Uu,qy=l(()=>{"use strict";EW=require("node:child_process");X();Fu();bK=e=>new Promise(t=>{let r=(0,EW.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:L()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Uu=async(e=bK)=>{let t=`${ua()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var Jr,Bu,xW,PK,RW,as,wK,_K,vK,is,Uo,Bo,IW=l(()=>{"use strict";Jr=g(require("node:fs")),Bu=g(require("node:path"));vW();ne();X();ts();_t();Cy();ns();$u();Ey();qy();xW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),PK=e=>{let t=bt(e),r=t===null?N():N(t);if(!Jr.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Jr.default.readFileSync(r.configPath,"utf8"));return!xW(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},RW=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!xW(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},as=async e=>(await RW(e))?.bundleVersion??null,wK=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Bu.default.join(t,r);Jr.default.mkdirSync(Bu.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());Jr.default.writeFileSync(n,s),r.endsWith(".js")&&Jr.default.chmodSync(n,493)},_K=async()=>{Bi(),await Oo()},vK=(e,t)=>e!==null?ke(e):t??wt,is=(e,t)=>({localBundleVersion:t,...e}),Uo=async e=>{let t=L(),r=Oe(t),o=r?.bundleVersion??null,n=await Uu();Ft({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=PK(t),i=vK(s,r?.appOrigin);if(i===null){let d=is({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return Ft({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await RW(i);if(a===null){let d=is({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return Ft({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||jo(o,a.bundleVersion))){let d=is({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Ft({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await wK(i,t,S);let d=Bu.default.join(t,Mu);Jr.default.existsSync(d)&&Jr.default.rmSync(d,{force:!0}),Iy(t),Oy(t),os({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=N(bt(t));if(vt(u)){let S=is({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Ft({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await _K();let m=is({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Ft({event:"update_applied",ok:!0,message:m.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}catch(d){let u=d instanceof Error?d.message:"Agent Witch self-update failed.",m=is({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},o);return Ft({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},Bo=()=>{let e=L();return{local:Oe(e),logs:Ho(20,e)}}});var OW={};Dt(OW,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>Nu,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>da,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Hu,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>ss,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Ly,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Wy,appendAgentWitchSelfUpdateLog:()=>Ft,buildAgentWitchEnsureOllamaShell:()=>ua,buildAgentWitchInstallScriptOllama:()=>Gy,buildAgentWitchSelfUpdateStatus:()=>Bo,ensureAgentWitchInstallVersionRecorded:()=>na,ensureAgentWitchOllamaInstalled:()=>Uu,fetchAgentWitchRemoteInstallBundleVersion:()=>as,isRemoteAgentWitchBundleVersionNewer:()=>jo,readAgentWitchInstallVersion:()=>Oe,readAgentWitchSelfUpdateLogs:()=>Ho,resolveAgentWitchAppOriginFromWsUrl:()=>ke,resolveAgentWitchHeartbeatInstallBundleVersion:()=>oa,resolveAgentWitchInstallVersionPath:()=>ra,resolveAgentWitchSelfUpdateLogPath:()=>zu,runAgentWitchSelfUpdate:()=>Uo,writeAgentWitchInstallVersion:()=>os});var Ut=l(()=>{"use strict";Cy();Ey();IW();$u();By();Fu();qy()});var Vy={};Dt(Vy,{buildAgentWitchSelfUpdateStatus:()=>Bo,fetchAgentWitchRemoteInstallBundleVersion:()=>as,runAgentWitchSelfUpdate:()=>Uo});var Ky=l(()=>{"use strict";Ut()});function ls(e){return(0,MW.createHash)("sha256").update(e.trim()).digest("hex")}var MW,Jy=l(()=>{"use strict";MW=require("node:crypto")});var cs,pa,kK,NW,Yy,zW=l(()=>{"use strict";cs=g(require("node:fs")),pa=g(require("node:path"));Jy();Ie();kK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),NW=e=>{if(!cs.default.existsSync(e))return null;try{let t=JSON.parse(cs.default.readFileSync(e,"utf8"));return!kK(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:ls(t.pairingToken.trim())}catch{return null}},Yy=(e=L())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(NW(pa.default.join(e,"config.json")));let n=pa.default.join(e,cr);if(!cs.default.existsSync(n))return t;for(let s of cs.default.readdirSync(n)){let i=pa.default.join(n,s);cs.default.statSync(i).isDirectory()&&o(NW(pa.default.join(i,"config.json")))}return t}});var Xy,DW,Gu,ma,ga,CK,TK,LK,jW,pe,me,qu,Bt,kt=l(()=>{"use strict";Xy=g(require("node:fs")),DW=g(require("node:os")),Gu=g(require("node:path")),ma={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},ga=e=>e.trim().length>0,CK=e=>{let t=Gu.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},TK=()=>{let e=DW.default.homedir(),t=Gu.default.join(e,".local","bin","agent");if(Xy.default.existsSync(t))return t;let r=Gu.default.join(e,".local","bin","cursor-agent");return Xy.default.existsSync(r)?r:ma.cursorCommand},LK=e=>{let t=e.trim();return!ga(t)||t===ma.cursorCommand?TK():t},jW=(e,t)=>CK(e)?t:["agent",...t],pe=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",me=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:ga(t)?t.trim():ma.claudeCommand,codexCommand:ga(r)?r.trim():ma.codexCommand,cursorCommand:LK(o),antigravityCommand:ga(n)?n.trim():ma.antigravityCommand}},qu=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:jW(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Bt=(e,t,r,o)=>{let n=t.trim();if(!ga(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:jW(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var Yr,WK,Go,EK,ds,fa=l(()=>{"use strict";Yr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,WK=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:Yr(s.inputTokens)+Yr(s.outputTokens)+Yr(s.cacheReadInputTokens)+Yr(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Go=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=Yr(a.input_tokens)+Yr(a.cache_creation_input_tokens)+Yr(a.cache_read_input_tokens),d=Yr(a.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:WK(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},EK=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),ds=(e,t)=>{let r=Go(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??EK(r)}}});var Zy,xK,RK,Qy,eS=l(()=>{"use strict";Zy=e=>e.toLocaleString("en-US"),xK=e=>e<.01?e.toFixed(4):e.toFixed(3),RK=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${xK(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Zy(e.inputTokens)} in / ${Zy(e.outputTokens)} out (${Zy(e.totalTokens)} total)`,t].join(`
`)},Qy=(e,t)=>{if(t===void 0)return e;let r=RK(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Vu,tS=l(()=>{"use strict";Vu={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var qo,rS,Ku,oS=l(()=>{"use strict";tS();qo="auto",rS=e=>({value:qo,label:`Auto (${Vu[e]})`}),Ku={anthropic:[rS("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[rS("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[rS("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var us,ha,Ju,ps=l(()=>{"use strict";tS();oS();us=e=>{let t=e?.trim()??"";if(!(t.length===0||t===qo))return t},ha=(e,t)=>{let r=us(t);return r===void 0?Vu[e]:r},Ju=e=>{let t=us(e);return t===void 0?qo:t}});var Yu,IK,OK,Xu,$W=l(()=>{"use strict";Yu={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},IK=e=>{let t=Yu[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Yu["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Yu["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Yu["gemini-2.0-flash"]:null},OK=(e,t,r)=>{let o=IK(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},Xu=e=>{let t=OK(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var ms,MK,NK,zK,Zu,HW=l(()=>{"use strict";$W();ms=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),MK=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=ms(r.input_tokens),n=ms(r.output_tokens);return o===0&&n===0?null:Xu({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},NK=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=ms(r.prompt_tokens),n=ms(r.completion_tokens);return o===0&&n===0?null:Xu({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},zK=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=ms(r.promptTokenCount),n=ms(r.candidatesTokenCount);return o===0&&n===0?null:Xu({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Zu=(e,t,r)=>e==="anthropic"?MK(t,r):e==="openai"?NK(t,r):zK(t,r)});var DK,nS,jK,$K,HK,FK,UK,sS,iS=l(()=>{"use strict";ps();HW();DK=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},nS=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:ha(e,t.model)},jK=async e=>{let t=nS("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=DK(o);n.length>0&&e.onChunk?.(n);let s=Zu("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},$K=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},HK=async e=>{let t=nS("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=$K(o);n.length>0&&e.onChunk?.(n);let s=Zu("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},FK=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},UK=async e=>{let t=nS("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=FK(n);s.length>0&&e.onChunk?.(s);let i=Zu("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},sS=async e=>{try{return e.provider==="anthropic"?await jK(e):e.provider==="openai"?await HK(e):await UK(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var tt,ya=l(()=>{"use strict";tt=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var FW,BK,Qu,aS=l(()=>{"use strict";FW=g(require("node:path")),BK="writer-api-secrets.json",Qu=e=>FW.default.join(e,BK)});var lS,UW,GK,Xr,Ve,Zr=l(()=>{"use strict";lS=g(require("node:fs"));ps();aS();UW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GK=e=>{if(!UW(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=us(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},Xr=e=>{let t=Qu(e);if(!lS.default.existsSync(t))return{};try{let r=JSON.parse(lS.default.readFileSync(t,"utf8"));if(!UW(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=GK(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Ve=(e,t)=>Xr(e)[t]??null});var Me,Sa=l(()=>{"use strict";Me=e=>e==="api"?"api":"cli"});var BW,Ce,Vo,fr=l(()=>{"use strict";BW=g(require("node:path"));ya();Zr();Sa();Ce=e=>BW.default.dirname(e),Vo=(e,t)=>{if(Me(e.writerExecutionBackend)!=="api")return!1;let r=tt(t);if(r===null)return!1;let o=Ce(e.layout.configPath),n=Ve(o,r);return n!==null&&n.apiKey.length>0}});var Aa,cS=l(()=>{"use strict";eS();iS();ya();Zr();fr();Aa=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=tt(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Ce(e.layout.configPath),a=Ve(i,s);if(a===null){let d=Object.keys(Xr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await sS({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:Qy(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var GW,gs,dS=l(()=>{"use strict";GW=require("node:child_process");kt();fa();cS();fr();gs=(e,t,r)=>new Promise(o=>{if(!pe(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Vo(e,t)){Aa(e,t,r).then(o);return}let n=Bt(t,r,me({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,GW.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=ds(i.join("")),u=a.join("").trim(),m=[d.output.trim(),u].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var qW=l(()=>{"use strict"});var VW=l(()=>{"use strict";eS();dS();iS();qW();Zr();fr()});var KW,JW,YW,XW=l(()=>{"use strict";KW="claude",JW="codex",YW="cursor"});var ZW,qK,uS,ba,ep=l(()=>{"use strict";ZW=g(require("node:path"));_t();qe();qK="ws://localhost:3000/api/agent-witch/ws",uS=e=>e.replace(/\/$/,""),ba=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return uS(t);let r=ZW.default.basename(e.installDir);if(r===Ei.production)return Du;let o=e.configWsUrl?.trim()??"";return r===Ei.localhost?o.length>0?uS(o):qK:o.length>0?uS(o):Du}});var KK,pS,mS=l(()=>{"use strict";XW();ep();Sa();KK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pS=e=>{if(!KK(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=ba({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??KW,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??JW,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??YW,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Me(t.writerExecutionBackend),layout:e.layout}}}});var gS,fS,hS=l(()=>{"use strict";gS=g(require("node:fs"));X();mS();fS=e=>{let t=N(e);if(!gS.default.existsSync(t.configPath))return null;try{let r=JSON.parse(gS.default.readFileSync(t.configPath,"utf8")),o=pS({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Pa,QW=l(()=>{"use strict";Pa=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var yS,JK,SS,eE=l(()=>{"use strict";yS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),JK=e=>{if(!yS(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!yS(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(m=>{if(!yS(m))return[];let S=typeof m.itemKey=="string"?m.itemKey.trim():"",f=typeof m.relativePath=="string"?m.relativePath:"",y=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:f,contentSha256:y}]});return u.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},SS=JK});var tE,YK,tp,AS=l(()=>{"use strict";tE=g(require("node:path")),YK=(e,t)=>{let r=t.trim();return tE.default.join(e,"components","store",r.slice(0,2),r)},tp=YK});var rE,XK,bS,oE=l(()=>{"use strict";rE=g(require("node:fs"));AS();XK=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=tp(e.installDir,n.contentSha256);rE.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},bS=XK});var wa,fs,ZK,PS,QK,wS,_S=l(()=>{"use strict";wa=g(require("node:fs")),fs=g(require("node:path"));AS();ZK=(e,t)=>fs.default.join(e.installDir,"runs",t,"overlay"),PS=(e,t)=>fs.default.join(ZK(e,t),".cursor"),QK=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=PS(e,t);wa.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=tp(e.installDir,i.contentSha256);if(!wa.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?fs.default.join(n,c):fs.default.join(n,i.itemKey);wa.default.mkdirSync(fs.default.dirname(d),{recursive:!0}),wa.default.copyFileSync(a,d)}return{ok:!0}},wS=QK});var vS,nE,e4,_a,sE=l(()=>{"use strict";vS=g(require("node:fs")),nE=g(require("node:path")),e4=(e,t)=>{let r=nE.default.join(e.installDir,"runs",t);vS.default.existsSync(r)&&vS.default.rmSync(r,{recursive:!0,force:!0})},_a=e4});var t4,kS,iE=l(()=>{"use strict";_S();t4=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=PS(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},kS=t4});var CS,r4,o4,n4,s4,i4,H,aE=l(()=>{"use strict";CS=g(require("node:fs"));ep();X();Sa();r4="claude",o4="codex",n4="cursor",s4="agy",i4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H=()=>{let e=N();if(!CS.default.existsSync(e.configPath))return null;try{let t=JSON.parse(CS.default.readFileSync(e.configPath,"utf8"));if(!i4(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=ba({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Me(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:r4,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:o4,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:n4,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:s4,pairingToken:s,layout:e}}catch{return null}}});var rp,lE,cE=l(()=>{"use strict";rp=g(require("node:fs"));aS();lE=(e,t)=>{let r=Qu(e);rp.default.mkdirSync(e,{recursive:!0}),rp.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{rp.default.chmodSync(r,384)}catch{}}});var va,dE,op=l(()=>{"use strict";va=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},dE=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===va(t)}});var ka,a4,TS,LS,uE=l(()=>{"use strict";ka=g(require("node:fs"));Zr();cE();op();ps();fr();a4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),TS=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=dE(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?us(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},LS=e=>{let t=Ce(e.configPath),r={};if(ka.default.existsSync(e.configPath))try{let n=JSON.parse(ka.default.readFileSync(e.configPath,"utf8"));a4(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,ka.default.mkdirSync(t,{recursive:!0}),ka.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=TS(TS(TS(Xr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);lE(t,o)}});var np,WS=l(()=>{"use strict";np={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var ES,pE=l(()=>{"use strict";ya();Zr();fr();fr();ES=(e,t)=>{if(Vo(e,t))return!1;let r=tt(t);if(r===null)return!1;let o=Ce(e.layout.configPath),n=Ve(o,r);return n===null||n.apiKey.trim().length===0}});var mE,xS,RS=l(()=>{"use strict";mE=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},xS=async e=>{let t=mE(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=mE(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var l4,IS,gE=l(()=>{"use strict";ne();hS();RS();l4=1e4,IS=()=>xS({listProfileEmails:Cu,readConfig:fS,pollIntervalMs:l4,logWaiting:e=>{console.error(e)}})});var ge=l(()=>{"use strict";dS();VW();hS();ep();QW();eE();oE();_S();sE();iE();Sa();aE();uE();Zr();fr();op();ps();WS();cS();fr();pE();ya();Zr();gE();mS();RS()});var sp,fE,c4,d4,hE,ip,Ca,ap,Ta=l(()=>{"use strict";sp=g(require("node:fs")),fE=g(require("node:path")),c4="wake-port.json",d4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hE=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,ip=e=>fE.default.join(e,c4),Ca=e=>{let t=ip(e);if(!sp.default.existsSync(t))return null;try{let r=JSON.parse(sp.default.readFileSync(t,"utf8"));if(d4(r)&&hE(r.wakePort))return r.wakePort}catch{return null}return null},ap=(e,t)=>{if(!hE(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=ip(e);sp.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Xse,Zse,Qse,Ct,yE,La=l(()=>{"use strict";Ta();Ie();Ta();Xse=At(),Zse=`${ve()}-wake`,Qse=ve(),Ct=()=>{let e=L(),t=Ca(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return At()},yE=e=>{let t=L();Ca(t)===null&&ap(t,e)}});var SE=l(()=>{"use strict";Jy();ne();zW();ge();La()});var OS,Wa,Ea,AE=l(()=>{"use strict";OS=g(require("node:os"));SE();Wa=()=>{let e=oe();return{ok:!0,port:Ct(),hostname:OS.default.hostname(),profileCount:e.length}},Ea=()=>{let e=oe(),t=H()?.pairingToken.trim()??"",r=t.length>0?ls(t):null,o=Yy();return{hostname:OS.default.hostname(),port:Ct(),tokenHash:r,tokenHashes:o.length>0?o:r!==null?[r]:[],profiles:e.map(n=>({email:n.profileEmail,launchAgentLabel:n.launchAgentLabel}))}}});var MS=l(()=>{"use strict";AE()});var bE,PE,wE,lp,hs=l(()=>{"use strict";bE="materialization.json",PE="backups",wE=".gitignore",lp=e=>`harness-set:${e.trim()}`});var _E,vE,cp,kE=l(()=>{"use strict";_E=g(require("node:crypto")),vE=g(require("node:fs")),cp=e=>{try{let t=vE.default.readFileSync(e);return _E.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Qr,Ko,u4,CE,NS,TE=l(()=>{"use strict";Qr=g(require("node:fs")),Ko=g(require("node:path"));kE();u4=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Ko.default.join(t,n,o);return Qr.default.mkdirSync(Ko.default.dirname(s),{recursive:!0}),Qr.default.copyFileSync(r,s),Ko.default.relative(e,s).replaceAll("\\","/")},CE=e=>{let t=Ko.default.join(e.repoRoot,e.repoRelativeDestination),r=cp(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(Qr.default.existsSync(t)){let n=cp(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=u4(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Qr.default.mkdirSync(Ko.default.dirname(t),{recursive:!0}),Qr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Qr.default.mkdirSync(Ko.default.dirname(t),{recursive:!0}),Qr.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},NS=e=>{let t=cp(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var zS,LE,dp,DS=l(()=>{"use strict";zS=g(require("node:fs"));hs();LE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),dp=e=>{if(!zS.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(zS.default.readFileSync(e,"utf8"));if(LE(t)&&t.version===1&&LE(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var eo,up,WE,EE=l(()=>{"use strict";eo=g(require("node:fs")),up=g(require("node:path"));hs();WE=e=>{let t=new Set(e.setSlugs.map(s=>lp(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=up.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=up.default.join(e.repoRoot,i.backupPath);eo.default.existsSync(c)?(eo.default.mkdirSync(up.default.dirname(a),{recursive:!0}),eo.default.copyFileSync(c,a),o.push(s)):eo.default.existsSync(a)&&eo.default.rmSync(a,{force:!0})}else eo.default.existsSync(a)&&eo.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var jS,pp,$S=l(()=>{"use strict";jS=g(require("node:path"));hs();pp=e=>({ledgerFilePath:jS.default.join(e.metaDirPath,bE),backupsDirPath:jS.default.join(e.metaDirPath,PE)})});var HS,xE,RE=l(()=>{"use strict";HS=g(require("node:path")),xE=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return HS.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return HS.default.posix.join(s,e,n)}});var FS,IE,US,OE=l(()=>{"use strict";FS=g(require("node:fs")),IE=g(require("node:path")),US=(e,t)=>{FS.default.mkdirSync(IE.default.dirname(e),{recursive:!0}),FS.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var BS,p4,lt,ys=l(()=>{"use strict";BS=g(require("node:os")),p4=e=>{let t=e.trim();return t.startsWith("~/")?`${BS.default.homedir()}${t.slice(1)}`:t==="~"?BS.default.homedir():t},lt=p4});var mp,ME,m4,NE,zE=l(()=>{"use strict";mp=g(require("node:fs")),ME=g(require("node:path"));hs();Mo();m4=`*
!${Wu}
`,NE=e=>{let t=ME.default.join(e,wE);mp.default.existsSync(t)||(mp.default.mkdirSync(e,{recursive:!0}),mp.default.writeFileSync(t,m4))}});var Jo,ct,Yo=l(()=>{"use strict";Jo=g(require("node:path"));Mo();ys();ct=e=>{let t=lt(e),r=Jo.default.join(t,KL);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Jo.default.join(r,"rag"),memoryDirPath:Jo.default.join(r,JL),reportsDirPath:Jo.default.join(r,XL),metaFilePath:Jo.default.join(r,Wu),ragChunksFilePath:Jo.default.join(r,"rag",YL)}}});var Gt,jE,g4,f4,rt,GS=l(()=>{"use strict";Gt=g(require("node:fs")),jE=g(require("node:path"));Mo();zE();Yo();g4=(e,t)=>{if(Gt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Gt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},f4=e=>{Gt.default.existsSync(e.ragChunksFilePath)||Gt.default.writeFileSync(e.ragChunksFilePath,"");let t=jE.default.join(e.memoryDirPath,Zn);Gt.default.existsSync(t)||Gt.default.writeFileSync(t,"")},rt=e=>{let t=ct(e.projectFolderPath);return Gt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Gt.default.mkdirSync(t.ragDirPath,{recursive:!0}),Gt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),NE(t.metaDirPath),g4(t,e),f4(t),{ok:!0,layout:t}}});var $E,HE,FE,UE,gp,fp=l(()=>{"use strict";$E="components",HE="store",FE="versions",UE="installed.json",gp=e=>`harness-set:${e.trim()}`});var qS,BE,hp,VS=l(()=>{"use strict";qS=g(require("node:fs")),BE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hp=e=>{if(!qS.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(qS.default.readFileSync(e,"utf8"));if(BE(t)&&t.version===1&&BE(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var Ra,Ss,yp=l(()=>{"use strict";Ra=g(require("node:path"));fp();Ss=e=>{let t=Ra.default.join(e,$E);return{componentsRootDir:t,storeDir:Ra.default.join(t,HE),versionsDir:Ra.default.join(t,FE),installedFilePath:Ra.default.join(t,UE)}}});var KS,GE,Sp,Ap,bp=l(()=>{"use strict";KS=g(require("node:crypto")),GE=g(require("node:fs")),Sp=e=>KS.default.createHash("sha256").update(e,"utf8").digest("hex"),Ap=e=>{try{let t=GE.default.readFileSync(e);return KS.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var JS,qE,VE,KE=l(()=>{"use strict";JS=g(require("node:fs")),qE=g(require("node:path")),VE=(e,t)=>{JS.default.mkdirSync(qE.default.dirname(e),{recursive:!0}),JS.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var YS,XS,JE,YE=l(()=>{"use strict";YS=g(require("node:fs")),XS=g(require("node:path")),JE=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=XS.default.join(e,r),n=XS.default.join(o,`${t.versionId}.json`);YS.default.mkdirSync(o,{recursive:!0}),YS.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var Pp,XE,ZE,QE=l(()=>{"use strict";Pp=g(require("node:fs")),XE=g(require("node:path"));bp();ZE=e=>{let t=Sp(e.content),r=XE.default.join(e.storeDir,t);return Pp.default.existsSync(r)||(Pp.default.mkdirSync(e.storeDir,{recursive:!0}),Pp.default.writeFileSync(r,e.content)),t}});var ZS,ex,h4,wp,QS=l(()=>{"use strict";ZS=g(require("node:fs")),ex=g(require("node:path"));fp();VS();yp();bp();KE();YE();QE();h4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wp=e=>{let t=Ss(e.installDir),r=gp(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!h4(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=ex.default.join(e.harnessRootDir,a);if(!ZS.default.existsSync(c))continue;let d=ZS.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Ap(c);if(u!==null){if(Sp(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);ZE({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:u})}}if(n.length===0)return;JE(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=hp(t.installedFilePath);VE(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var tA,eA,tx,rx=l(()=>{"use strict";tA=g(require("node:fs"));QS();VS();yp();eA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),tx=e=>{if(!tA.default.existsSync(e.harnessManifestPath))return;let t=Ss(e.installDir),r=hp(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(tA.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!eA(o)||o.version!==1||!eA(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!eA(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];wp({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var rA,ox,nx,sx=l(()=>{"use strict";rA=g(require("node:fs")),ox=g(require("node:path")),nx=e=>{let t=e.componentId.replaceAll("/","_"),r=ox.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!rA.default.existsSync(r))return null;try{let o=JSON.parse(rA.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var _p,vp,ix,ax=l(()=>{"use strict";_p=g(require("node:fs")),vp=g(require("node:path"));fp();rx();sx();yp();bp();ix=e=>{tx({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Ss(e.layout.installDir),r=gp(e.setSlug),o=nx({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=vp.default.join(t.storeDir,i.contentSha256);if(_p.default.existsSync(a)&&Ap(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?vp.default.join(e.layout.harnessRootDir,n):vp.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!_p.default.existsSync(s))return null;try{if(!_p.default.statSync(s).isFile())return null}catch{return null}return s}});var lx,y4,S4,to,kp=l(()=>{"use strict";DS();$S();Yo();lx="harness-set:",y4=e=>{let t=e.trim();if(!t.startsWith(lx))return null;let r=t.slice(lx.length).trim();return r.length>0?r:null},S4=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=y4(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},to=e=>{let t=ct(e),{ledgerFilePath:r}=pp(t),o=dp(r);return S4(o)}});var Cp,oA,Ia,A4,hr,Oa,As=l(()=>{"use strict";Cp=g(require("node:fs")),oA=g(require("node:os")),Ia=g(require("node:path")),A4=()=>Cp.default.realpathSync(Ia.default.resolve(oA.default.homedir())),hr=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Ia.default.join(oA.default.homedir(),t.slice(1)):t,o;try{o=Cp.default.realpathSync(Ia.default.resolve(r))}catch{return null}let n=A4();return o===n||o.startsWith(`${n}${Ia.default.sep}`)?o:null},Oa=e=>{let t=hr(e);if(t===null)return null;try{if(!Cp.default.statSync(t).isFile())return null}catch{return null}return t}});var nA,sA=l(()=>{"use strict";nA=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Lp,cx,Tp,b4,Ma,iA=l(()=>{"use strict";Lp=g(require("node:fs")),cx=g(require("node:path"));hs();TE();DS();EE();$S();RE();OE();ys();GS();ax();kp();As();sA();Tp=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),b4=e=>{if(!Lp.default.existsSync(e))return null;try{let t=JSON.parse(Lp.default.readFileSync(e,"utf8"));if(Tp(t)&&t.version===1)return t}catch{return null}return null},Ma=e=>{let t=[...new Set(e.setSlugs.map(b=>b.trim()).filter(b=>b.length>0))],r=lt(e.projectFolderPath),o=hr(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Lp.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=rt({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=pp(s.layout),d=to(o).filter(b=>!t.includes(b)),u=dp(i),m=0;if(d.length>0){let b=WE({repoRoot:o,setSlugs:d,ledger:u});u=b.ledger,m=b.summary.removedPaths.length}if(t.length===0)return US(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let S=b4(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let f=Tp(S.sets)?S.sets:{},y=0,p=0,A=0;for(let b of t){let h=f[b];if(!Tp(h))return{ok:!1,errorMessage:`Harness set "${b}" is not installed locally.`};let w=typeof h.version=="number"?String(h.version):"1",_=lp(b),k=Array.isArray(h.items)?h.items:[];for(let C of k){if(!Tp(C))continue;let T=typeof C.path=="string"?C.path.trim():"";if(T.length===0)continue;let x=nA(T);if(x===null)continue;let I=xE(b,x),M=cx.default.posix.join(".cursor",I).replaceAll("\\","/"),U=typeof C.id=="string"?C.id.trim():"",K=ix({layout:e.layout,setSlug:b,setVersion:typeof h.version=="number"?h.version:1,manifestItemPath:T,manifestItemId:U});if(K===null)continue;let G=CE({repoRoot:o,backupsDir:a,repoRelativeDestination:M,sourceAbsolutePath:K,componentId:_,versionId:w,ledger:u});if(G.kind==="skipped_unchanged"){p+=1;continue}if(G.kind==="backed_up_user_file"){A+=1,y+=1,u={version:1,entries:{...u.entries,[M]:NS({componentId:_,versionId:w,sourceAbsolutePath:K,backupPath:G.backupPath})}};continue}y+=1,u={version:1,entries:{...u.entries,[M]:NS({componentId:_,versionId:w,sourceAbsolutePath:K})}}}}return y===0&&p===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(US(i,u),{ok:!0,writtenFileCount:y,skippedFileCount:p,backedUpFileCount:A,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var dx,Wp,P4,w4,_4,v4,k4,C4,T4,L4,W4,Na,Ep=l(()=>{"use strict";dx=g(require("node:crypto")),Wp=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},P4=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},w4=(e,t)=>{let r=P4(t),o=Wp(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},_4=(e,t,r)=>{let o=w4(t,r);return`shared/items/${e}/${o}`},v4=["rules","skills","commands","instructions","agents"],k4=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),C4=(e,t)=>[...e.filter(o=>o.id!==t.id),t],T4=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},L4=e=>dx.default.createHash("sha256").update(e,"utf8").digest("hex"),W4=e=>({id:e.id,kind:e.kind,title:e.title,path:_4(e.id,e.kind,e.title),contentSha256:L4(e.content)}),Na=e=>{let t=new Date().toISOString(),r=e.existingManifest??k4(e.hostname,t),o=Wp(e.bundle.slug),n=T4(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...v4.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let m=W4(u);return{files:[...d.files,{relativePath:m.path,content:u.content}],nextItems:C4(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var ro,ux,xp,E4,Xo,aA=l(()=>{"use strict";ro=g(require("node:fs")),ux=g(require("node:os")),xp=g(require("node:path"));Ep();E4=e=>{if(!ro.default.existsSync(e))return null;try{let t=JSON.parse(ro.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Xo=e=>{try{let t=E4(e.layout.harnessManifestPath),r=Na({bundle:e.bundle,hostname:ux.default.hostname(),existingManifest:t});ro.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)ro.default.mkdirSync(xp.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=xp.default.join(e.layout.harnessRootDir,o.relativePath);ro.default.mkdirSync(xp.default.dirname(n),{recursive:!0}),ro.default.writeFileSync(n,o.content)}return ro.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var lA,px=l(()=>{"use strict";aA();iA();lA=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=Xo({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Ma({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var mx,gx=l(()=>{"use strict";mx=["rule","skill","command","instruction","agent"]});var fx,x4,R4,qt,cA=l(()=>{"use strict";gx();fx=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),x4=e=>typeof e=="string"&&mx.includes(e),R4=e=>{if(!fx(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!x4(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},qt=e=>{if(!fx(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=R4(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var hx,I4,dA,yx=l(()=>{"use strict";hx=require("node:zlib");cA();I4="x-agent-witch-token",dA=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[I4]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,hx.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=qt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var pA,uA,oo,Sx=l(()=>{"use strict";pA=g(require("node:fs")),uA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),oo=e=>{if(!pA.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(pA.default.readFileSync(e.harnessManifestPath,"utf8"));if(!uA(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=uA(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!uA(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Rp,Ax=l(()=>{"use strict";Rp=()=>"~"});var bx,Px,wx=l(()=>{"use strict";bx=require("node:crypto"),Px=e=>`local-${(0,bx.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var mA,_x=l(()=>{"use strict";mA=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var za,Ip,gA=l(()=>{"use strict";za=g(require("node:path")),Ip=e=>{let t=za.default.dirname(e),r=za.default.basename(t);return r==="agents"?za.default.basename(za.default.dirname(t)):r}});var Da,yr,vx,O4,M4,N4,Op,kx,fA=l(()=>{"use strict";Da=g(require("node:fs")),yr=g(require("node:path"));wx();_x();gA();vx=new Set(["node_modules",".git","dist","build",".next","coverage"]),O4=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},M4=(e,t)=>{let r=yr.default.basename(t);if(e==="skill"){let o=t.split(yr.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},N4=e=>{let t=[],r=(n,s)=>{let i;try{i=Da.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&vx.has(a.name))continue;let c=yr.default.join(n,a.name),d=s?yr.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;mA(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=yr.default.join(e,n);Da.default.existsSync(s)&&r(s,n)}let o=yr.default.join(e,"skills");return Da.default.existsSync(o)&&r(o,"skills"),t},Op=e=>{let t=N4(e);if(t.length===0)return null;let r=yr.default.dirname(e),o=Ip(e),n=O4(o),s=t.map(i=>{let a=mA(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:Px(i.absolutePath),kind:a,title:M4(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},kx=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Da.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||vx.has(a.name))continue;let c=yr.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var Cx,hA,z4,yA,Tx=l(()=>{"use strict";Cx=g(require("node:fs")),hA=g(require("node:path"));fA();As();z4=e=>{let t=hr(e.trim());if(t===null)return null;if(hA.default.basename(t)===".cursor")return t;let r=hA.default.join(t,".cursor");try{if(Cx.default.statSync(r).isDirectory())return hr(r)}catch{return null}return null},yA=e=>{let t=z4(e.projectPath);if(t===null)return null;let r=Op(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var Lx,D4,Mp,SA,Wx=l(()=>{"use strict";Lx=g(require("node:path"));fA();As();gA();D4=5,Mp=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},SA=e=>{let t=hr(e.scanRoot.trim());if(t===null)return Mp(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of kx(t,D4,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=hr(s);if(i===null)continue;let a=Ip(i);Mp(e.response,"folder",{cursorDir:i,groupName:a,repoPath:Lx.default.dirname(i)});let c=Op(i);c!==null&&(r.push(c),Mp(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Mp(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var Ex,xx,Rx=l(()=>{"use strict";Ex=g(require("node:path")),xx=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:Ex.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var $e,Ix,AA,j4,bA,PA,Np,wA,ja,Ox=l(()=>{"use strict";$e=g(require("node:fs")),Ix=g(require("node:os")),AA=g(require("node:path"));Ep();QS();As();Rx();j4=e=>{if(!$e.default.existsSync(e))return null;try{let t=JSON.parse($e.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},bA=e=>{let t=e.hostname??Ix.default.hostname(),r=j4(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let c=[];for(let u of a){let m=Oa(u.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let S=$e.default.readFileSync(m,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:S,setSlugs:[i.slug]})}let d=Na({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{$e.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)$e.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=AA.default.join(e.layout.harnessRootDir,i.relativePath);$e.default.mkdirSync(AA.default.dirname(a),{recursive:!0}),$e.default.writeFileSync(a,i.content)}$e.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=Wp(i.slug),d=r.sets[c];d!==void 0&&wp({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},PA="reveal-cache.json",Np=(e,t)=>{$e.default.mkdirSync(e.harnessRootDir,{recursive:!0}),$e.default.writeFileSync(`${e.harnessRootDir}/${PA}`,`${JSON.stringify(t,null,2)}
`)},wA=e=>{let t=`${e.harnessRootDir}/${PA}`;$e.default.existsSync(t)&&$e.default.unlinkSync(t)},ja=e=>{let t=`${e.harnessRootDir}/${PA}`;if(!$e.default.existsSync(t))return null;try{let r=JSON.parse($e.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return xx(r)}catch{return null}return null}});var Zo=l(()=>{"use strict";iA();px();sA();aA();yx();cA();Ep();Sx();Ax();Tx();As();Wx();Ox()});var _A,Mx=l(()=>{"use strict";Zo();Ie();_A=e=>{let t=N(e.profileEmail);return Xo({bundle:e.bundle,layout:t})}});var Nx=l(()=>{"use strict";Mx();Zo()});var $4,zx,H4,Dx,Qo,zp,jx=l(()=>{"use strict";$4=["agentwitch.com","www.agentwitch.com"],zx=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,H4=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},Dx=e=>{let t=H4(e);return!!($4.includes(t)||zx.test(e.trim().toLowerCase()))},Qo=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return Dx(r)?zx.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},zp=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Qo(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var $a=l(()=>{"use strict";jx()});var Sr,Ha=l(()=>{"use strict";Sr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Fa,$x=l(()=>{"use strict";Nx();$a();Ha();Fa=e=>{if(!Sr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=qt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Qo(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=_A({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var vA=l(()=>{"use strict";$x()});var F4,bs,kA=l(()=>{"use strict";F4=e=>e==="hourly"||e==="daily"||e==="weekdays",bs=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!F4(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Ua,Dp,Hx,Fx,CA,Tt,jp,$p,Hp,Fp,Up=l(()=>{"use strict";Ua=g(require("node:fs")),Dp=g(require("node:path"));kA();Hx="automations.json",Fx=e=>e.profileEmail!==null?Dp.default.join(e.installDir,"profiles",e.profileEmail,Hx):Dp.default.join(e.installDir,Hx),CA=()=>({version:1,automations:[]}),Tt=e=>{let t=Fx(e);if(!Ua.default.existsSync(t))return CA();try{let r=JSON.parse(Ua.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?CA():{version:1,automations:r.automations.flatMap(n=>{let s=bs(n);return s!==null?[s]:[]})}}catch{return CA()}},jp=(e,t)=>{let r=Fx(e);Ua.default.mkdirSync(Dp.default.dirname(r),{recursive:!0}),Ua.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},$p=(e,t)=>{jp(e,{version:1,automations:t})},Hp=(e,t)=>{let o=Tt(e).automations.filter(n=>n.id!==t.id);jp(e,{version:1,automations:[...o,t]})},Fp=(e,t)=>Tt(e).automations.find(r=>r.id===t)??null});var Ne,Ar=l(()=>{"use strict";Ne="x-agent-witch-token"});var TA=l(()=>{"use strict";$u();Fu()});var Z,en,LA,Ba,WA,U4,EA,Ga,qa,xA,Va=l(()=>{"use strict";Ar();TA();Z=e=>{let t=ke(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},en=e=>({[Ne]:e,"Content-Type":"application/json"}),LA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:en(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Ba=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:en(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},WA=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:en(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},U4=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},EA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:en(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Ga=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:en(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return U4(r)}catch{return null}},qa=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:en(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},xA=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:en(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var tn,Ux,Bx,B4,RA,Gx,IA=l(()=>{"use strict";tn=g(require("node:fs")),Ux=g(require("node:path")),Bx=e=>Ux.default.join(e.harnessRootDir,"projects-registry.json"),B4=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),RA=e=>{let t=Bx(e);if(!tn.default.existsSync(t))return[];try{let r=JSON.parse(tn.default.readFileSync(t,"utf8"));return B4(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},Gx=e=>{let t=Bx(e);if(!tn.default.existsSync(t))return;let r=`${t}.migrated`;if(tn.default.existsSync(r)){tn.default.unlinkSync(t);return}tn.default.renameSync(t,r)}});var qx,G4,q4,Vx,Kx=l(()=>{"use strict";ys();qx=e=>lt(e),G4=e=>new Set(e.map(t=>qx(t.folderPath))),q4=e=>new Set(e.map(t=>t.id)),Vx=(e,t)=>{let r=G4(t),o=q4(t),n=[],s=new Set;for(let i of e){let a=qx(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var OA,MA=l(()=>{"use strict";Va();IA();Kx();OA=async(e,t)=>{let r=RA(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Ga(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=Vx(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await EA(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&Gx(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var NA,rn,Bp=l(()=>{"use strict";NA=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),rn=(e,t)=>e.find(r=>r.id===t)??null});var Ps,Gp=l(()=>{"use strict";Va();MA();Bp();Ps=async(e,t)=>{t!==void 0&&await OA(t,e);let r=Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Ga(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=NA(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var Jx=l(()=>{"use strict"});var V4,K4,qp,zA=l(()=>{"use strict";V4="Default",K4=e=>e.trim().toLowerCase()===V4.toLowerCase(),qp=K4});var Te,Yx,J4,Y4,X4,Z4,ws,DA=l(()=>{"use strict";zA();Te=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Yx=(e,t)=>e.length===0?`<p class="empty">${Te(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Te(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Te(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,J4=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,Y4=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Te(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,X4=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?Y4(e.project):J4();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
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
      </form>`},Z4=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Te(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Te(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},ws=e=>{let t=e.flashError?`<div class="alert-error">${Te(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Te(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(u,m)=>`<a class="project-tab${e.activeTab===u?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${u}">${Te(m)}</a>`,n=e.composition?.items.filter(u=>u.kind==="workflow")??[],s=e.composition?.items.filter(u=>u.kind==="agent")??[],i="";e.activeTab==="harness"?i=X4({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=Yx(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=Yx(s,"No agents installed for this project yet."):i=Z4({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});let a=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}?rename=1`,c=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${Te(a)}" target="_blank" rel="noopener noreferrer">Rename in Agent Witch Cloud\u2026</a>
    </div>`,d=qp(e.project.name)?"":`<section class="danger-zone stack">
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
    </section>${d}`}});var Q4,e8,Xx,Zx=l(()=>{"use strict";Zo();Ar();Q4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),e8=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[Ne]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!Q4(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=qt(n);return s===null?[]:[s]})}catch{return null}},Xx=e8});var Qx,jA,eR=l(()=>{"use strict";ge();Zo();DA();Gp();Zx();Bp();kp();Va();_t();Qx=e=>({kind:"page",title:e.project.name,body:ws({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:oo(e.layout),linkedSetSlugs:to(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),jA=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=H();if(r===null)return{kind:"not_found"};let o=await Ps(r,e.layout),n=rn(o.projects,t);if(n===null)return{kind:"not_found"};let s=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??wt,a=s===null?null:await Xx(s,n.id);if(a===null)return Qx({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=lA({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return Qx({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await qa(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var t8,$A,tR=l(()=>{"use strict";t8=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,$A=t8});var rR=l(()=>{"use strict"});var oR=l(()=>{"use strict"});var nR=l(()=>{"use strict";rR();oR()});var r8,no,sR=l(()=>{"use strict";r8=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],no=(e=process.env)=>{let t={...e};for(let r of r8)delete t[r];return t}});var iR=l(()=>{"use strict";sR()});var HA,aR=l(()=>{"use strict";HA={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var FA=l(()=>{"use strict";aR()});var Vp,UA=l(()=>{"use strict";Vp={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var Kp=l(()=>{"use strict";nR();iR();_t();FA();UA()});var lR,cR,o8,Jp,Yp,dR=l(()=>{"use strict";lR=require("node:child_process"),cR=require("node:util");Kp();o8=(0,cR.promisify)(lR.execFile),Jp=async(e,t)=>{try{let{stdout:r}=await o8("git",t,{cwd:e,env:no(),maxBuffer:1048576});return r.trim()}catch{return null}},Yp=async e=>{let t=await Jp(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Jp(e,["rev-parse","--abbrev-ref","HEAD"]),o=await Jp(e,["status","--porcelain"]),n=await Jp(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var BA,uR=l(()=>{"use strict";BA=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var n8,GA,pR=l(()=>{"use strict";n8=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},GA=n8});var s8,qA,mR=l(()=>{"use strict";Ar();s8=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[Ne]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},qA=s8});var gR,so,fR=l(()=>{"use strict";gR=require("node:child_process"),so=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,gR.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var hR=l(()=>{"use strict";Gp()});var Ka,yR=l(()=>{"use strict";Ar();Ka=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[Ne]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var VA,SR=l(()=>{"use strict";Ar();VA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[Ne]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var Vt=l(()=>{"use strict";Gp();Bp();Jx();ys();GS();eR();kp();tR();dR();uR();pR();mR();fR();hR();yR();SR();MA();IA();Va()});var Xp,Ja,AR,KA,on,JA=l(()=>{"use strict";Xp=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},Ja=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Xp(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},AR=e=>e>=1&&e<=5,KA=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Xp(t,"UTC")},on=e=>{let t=e.from??new Date,r=Xp(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Ja(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=Ja(r,e.timeZone,o,0),s=Xp(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?Ja(KA(r),e.timeZone,o,0):n;if(!i&&AR(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=KA(a),AR(a.weekday))return Ja(a,e.timeZone,o,0);return Ja(KA(r),e.timeZone,o,0)}});var bR,YA,br,XA=l(()=>{"use strict";bR=require("node:crypto");ge();Vt();JA();Up();YA=!1,br=async e=>{if(YA)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=H();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=Fp(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};YA=!0;let n=(0,bR.randomUUID)();try{let s=await gs(t,"claude-cli",o.prompt);await xA(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=on({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return Hp(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{YA=!1}}});var Zp,PR=l(()=>{"use strict";ge();XA();Up();Zp=async()=>{let e=H();if(e===null)return;let t=Tt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await br(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var Ya=l(()=>{"use strict";Up();PR();XA();JA()});var wR=l(()=>{"use strict";Ya()});var _R=l(()=>{"use strict";kA()});var vR=l(()=>{"use strict";_R()});var ZA=l(()=>{"use strict";Ya()});var i8,a8,Xa,QA=l(()=>{"use strict";wR();vR();ZA();Ie();i8=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),a8=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??on({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??on({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Xa=e=>{let t=i8(e.profileEmail),r=Tt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=bs(s);return i!==null?[a8(i,o.get(i.id))]:[]});return $p(t,n),{ok:!0,writtenCount:n.length}}});var eb=l(()=>{"use strict";Ya()});var kR=l(()=>{"use strict";ge()});var CR=l(()=>{"use strict";QA();eb();ZA();kR()});var TR,Za,Qa,el,LR=l(()=>{"use strict";TR=g(require("node:os"));CR();$a();Ha();Za=e=>{if(!Sr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Qo(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=Xa({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Qa=async e=>{if(!Sr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Qo(t)?br(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},el=()=>{let e=H(),t=e!==null?Tt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:TR.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var tb=l(()=>{"use strict";LR()});var Qp=l(()=>{"use strict";ne()});var em=l(()=>{"use strict";ne()});var tm,ER,xR,WR,l8,c8,_s,rb=l(()=>{"use strict";tm=g(require("node:fs")),ER=g(require("node:os")),xR=g(require("node:path"));Qp();em();Ta();Ie();WR=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},l8=e=>xR.default.join(ER.default.homedir(),"Library","LaunchAgents",`${e}.plist`),c8=async e=>tm.default.existsSync(l8(e))?(await Re(e)).ok:!1,_s=async(e=L())=>{let t=tm.default.existsSync(ip(e)),r=!tm.default.existsSync(dr(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Ca(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await WR(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${ve(e)}-wake`;await c8(i)&&s.push(i);for(let c of oe(e))(await Re(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await WR(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var RR=l(()=>{"use strict";ne()});var vs,tl=l(()=>{"use strict";vs="connection-health.json"});var nn,rm,d8,rl,Le,ob,om,He,nm=l(()=>{"use strict";nn=g(require("node:fs")),rm=g(require("node:path"));tl();d8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rl=e=>e.profileEmail===null?rm.default.join(e.installDir,vs):rm.default.join(e.installDir,"profiles",e.profileEmail,vs),Le=e=>{let t=rl(e);if(!nn.default.existsSync(t))return null;try{let r=JSON.parse(nn.default.readFileSync(t,"utf8"));return!d8(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},ob=e=>{let t=rl(e);nn.default.existsSync(t)&&nn.default.rmSync(t,{force:!0})},om=(e,t)=>{let r=rl(e),o=Le(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};nn.default.mkdirSync(rm.default.dirname(r),{recursive:!0}),nn.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},He=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var ol,IR=l(()=>{"use strict";tl();nm();ol=(e,t)=>{if(!t.socketOpen)return!1;let r=Le(e);return r===null?!1:!He(r,t.staleAfterMs??12e4,t.nowMs)}});var nb,OR=l(()=>{"use strict";nm();nb=(e,t)=>!(e!==null&&!He(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var ks=l(()=>{"use strict";nm();IR();OR();tl()});var sb=l(()=>{"use strict";ks();ne()});var ib=l(()=>{"use strict";ks()});var ab=l(()=>{"use strict";ne()});var NR,MR,nl,lb=l(()=>{"use strict";NR=g(require("node:fs"));_t();Qp();em();Ie();MR=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},nl=async(e=L())=>{if(!NR.default.existsSync(dr(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await MR())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of oe(e))(await Re(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await MR();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var zR=l(()=>{"use strict";ne()});var DR,sn,cb,u8,p8,m8,jR,g8,$R,Cs,sm=l(()=>{"use strict";DR=require("node:crypto"),sn=g(require("node:fs")),cb=g(require("node:path"));Ie();u8="watchdog-log.ndjson",p8=200,m8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jR=(e=L())=>{let t=N(),r=t.installDir===e?t.logsDir:Xn({installDir:e,profileEmail:t.profileEmail});return cb.default.join(r,u8)},g8=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!m8(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},$R=(e,t=L())=>{let r={id:(0,DR.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=jR(t);sn.default.mkdirSync(cb.default.dirname(o),{recursive:!0});let n=sn.default.existsSync(o)?sn.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-p8+1)),JSON.stringify(r)];return sn.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Cs=(e=20,t=L())=>{let r=jR(t);if(!sn.default.existsSync(r))return[];let o=sn.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=g8(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var db,ub,pb,mb=l(()=>{"use strict";qe();db=ko.watchdogReinstallState,ub=900*1e3,pb=3e3});var HR=l(()=>{"use strict";mb()});var FR={};Dt(FR,{verifyAgentWitchReviveAfterKickstart:()=>h8});var f8,h8,UR=l(()=>{"use strict";HR();ib();ab();Ie();f8=e=>new Promise(t=>{setTimeout(t,e)}),h8=async e=>{if(await f8(e.verifyDelayMs??pb),!await xo(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),o=Le(r);return!He(o,e.staleAfterMs)}});var sl,gb,y8,BR,GR,fb,hb,yb=l(()=>{"use strict";sl=g(require("node:fs")),gb=g(require("node:path"));X();mb();y8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),BR=e=>gb.default.join(e,db),GR=(e=L())=>{let t=BR(e);if(!sl.default.existsSync(t))return null;try{let r=JSON.parse(sl.default.readFileSync(t,"utf8"));return!y8(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},fb=(e=L(),t=Date.now())=>{let r=GR(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=ub:!0},hb=(e=L(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=BR(e);return sl.default.mkdirSync(gb.default.dirname(o),{recursive:!0}),sl.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var Sb,qR=l(()=>{"use strict";ne();yb();Sb=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!fb())return{attempted:!1,ok:!1,targets:e};hb();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Re(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var VR=l(()=>{"use strict";yb();qR()});var Ab=l(()=>{"use strict";Ut()});var KR=l(()=>{"use strict";Ut()});var JR,Ts,YR,XR,ZR,S8,A8,QR,b8,P8,e0,t0=l(()=>{"use strict";JR=require("node:child_process"),Ts=g(require("node:fs")),YR=g(require("node:os")),XR=g(require("node:path")),ZR=require("node:util");Ab();KR();Ie();S8=(0,ZR.promisify)(JR.execFile),A8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),QR=e=>{let t=bt(e),r=t===null?N():N(t);if(!Ts.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Ts.default.readFileSync(r.configPath,"utf8"));return!A8(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},b8=e=>QR(e)?.wsUrl??null,P8=e=>{let t=b8(e);return t!==null?ke(t):Oe(e)?.appOrigin??null},e0=async e=>{let t=e?.installDir??L(),r=QR(t),o=r!==null?ke(r.wsUrl):P8(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=XR.default.join(YR.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Ts.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??bt(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await S8("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Ts.default.existsSync(i)&&Ts.default.unlinkSync(i)}}});var r0={};Dt(r0,{attemptAgentWitchWatchdogReinstall:()=>w8});var w8,o0=l(()=>{"use strict";VR();t0();w8=async e=>Sb(e,()=>e0())});var n0,s0,i0,_8,v8,k8,il,bb=l(()=>{"use strict";RR();sb();ib();ab();lb();rb();Qp();em();Ie();ns();zR();sm();n0=e=>e===null?N():N(e),s0=async(e,t,r)=>{if(!await xo(e))return"not_running";let n=n0(t);if(vt(n))return"healthy";let s=Le(n);return He(s,r)?"stale_connection":"healthy"},i0=async e=>{let t=e?.staleAfterMs??12e4,r=L(),o=oe(r);return Promise.all(o.map(async n=>{let s=await s0(n.launchAgentLabel,n.profileEmail,t),i=n0(n.profileEmail),a=Le(i),c=await xo(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:He(a,t),needsRevive:s!=="healthy",reason:s}}))},_8=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},v8=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",k8=async e=>{let t=await Re(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(UR(),FR)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},il=async e=>{if(!Pt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=L();await _s(r),await nl(r);let o=oe(r),n=[];for(let u of o){let m=await s0(u.launchAgentLabel,u.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:m});continue}n.push(await k8({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let u=Eo();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(o0(),r0)),m=await u(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&$R({event:v8(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:_8(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var a0,im,l0=l(()=>{"use strict";a0=g(require("node:os"));sb();sm();bb();im=async()=>{let e=await i0(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:a0.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Cs(1)[0]??null}}});var Pb=l(()=>{"use strict";rb();bb();l0();sm()});var al,ll,cl,c0=l(()=>{"use strict";ne();Pb();al=async()=>{await _s();let e=oe(),t=[];for(let r of e){let o=await Re(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Eo();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},ll=il,cl=il});var wb=l(()=>{"use strict";c0()});var lm,am,d0,_b,u0,C8,T8,L8,W8,E8,cm,p0=l(()=>{"use strict";lm=require("node:child_process"),am=g(require("node:fs")),d0=g(require("node:os")),_b=g(require("node:path")),u0=require("node:util");ne();X();C8=(0,u0.promisify)(lm.execFile),T8=()=>_b.default.join(d0.default.homedir(),"Library","LaunchAgents"),L8=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await C8("launchctl",["bootout",r]).catch(()=>{})},W8=e=>{let t=_b.default.join(T8(),`${e}.plist`);am.default.existsSync(t)&&am.default.unlinkSync(t)},E8=e=>{(0,lm.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},cm=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=L();if(!am.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=ur(e);for(let r of t)await L8(r),W8(r);return E8(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var m0,dm,g0,Ls,f0,x8,R8,I8,vb,O8,kb,h0=l(()=>{"use strict";m0=require("node:child_process"),dm=g(require("node:fs")),g0=g(require("node:os")),Ls=g(require("node:path")),f0=require("node:util");ne();x8=(0,f0.promisify)(m0.execFile),R8=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],I8=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],vb=e=>{dm.default.existsSync(e)&&dm.default.rmSync(e,{force:!0})},O8=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await x8("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},kb=async e=>{let r=(e.listLaunchAgentLabels??ur)(e.layout.installDir),o=e.launchAgentsDir??Ls.default.join(g0.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??O8;for(let i of r)await n(i),vb(Ls.default.join(o,`${i}.plist`));let s=Ls.default.dirname(e.layout.configPath);for(let i of R8)vb(Ls.default.join(s,i));for(let i of I8)vb(Ls.default.join(e.layout.installDir,i));return dm.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var Cb,y0=l(()=>{"use strict";Cb="unknown_identity"});var Tb=l(()=>{"use strict";UA();y0()});var M8,Lb,S0=l(()=>{"use strict";Tb();M8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Lb=e=>e.type!=="system.error"||!M8(e.payload)?!1:e.payload.errorCode===Cb});var Wb=l(()=>{"use strict";p0();h0();S0()});var um=l(()=>{"use strict";ne();Ut();Wb();Pb()});var Ws,pm,mm=l(()=>{"use strict";um();Ws=(e=20)=>Cs(e),pm=im});var gm,Es,fm,hm=l(()=>{"use strict";um();gm=Bo,Es=(e=20)=>Ho(e),fm=e=>Uo(e)});var ym,Eb=l(()=>{"use strict";um();ym=()=>cm()});var A0=l(()=>{"use strict";MS();vA();tb();wb();mm();hm();Eb()});var b0={};Dt(b0,{buildAgentWitchAutomationStatusFromWakeServer:()=>el,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>gm,buildAgentWitchWakeHealthResponse:()=>Wa,buildAgentWitchWakeIdentityResponse:()=>Ea,buildAgentWitchWatchdogStatus:()=>pm,installHarnessFromWakeServer:()=>Fa,readAgentWitchSelfUpdateLogEntries:()=>Es,readAgentWitchWatchdogLogEntries:()=>Ws,restartAgentWitchFromWakeServer:()=>cl,reviveAgentWitchWebSocketFromWakeServer:()=>ll,runAgentWitchSelfUpdateFromWakeServer:()=>fm,runAgentWitchUninstallLocalFromWakeServer:()=>ym,runAutomationFromWakeServer:()=>Qa,syncAutomationsFromWakeServer:()=>Za,wakeAgentWitchLaunchAgents:()=>al});var P0=l(()=>{"use strict";A0()});var w0,_0,xb,Rb,v0=l(()=>{"use strict";w0=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),_0=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?w0(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?w0(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},xb=e=>{let t=e.watchdogLogs.map(_0).join(""),r=e.updateLogs.map(_0).join("");return`<!doctype html>
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
</html>`},Rb=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var k0,C0,T0=l(()=>{"use strict";k0=g(require("node:net")),C0=()=>new Promise((e,t)=>{let r=k0.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var L0,N8,Ib,W0=l(()=>{"use strict";L0=g(require("node:net"));T0();La();Ta();Ie();N8=e=>new Promise(t=>{let r=L0.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Ib=async()=>{let e=L(),t=Ct();if(await N8(t))return yE(t),t;let r=await C0();return ap(e,r),r}});var z8,Ob,E0=l(()=>{"use strict";z8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ob=e=>({force:z8(e)&&e.force===!0})});var dl=l(()=>{"use strict";$a();v0();W0();E0();Sy();Ou();zo()});var Mb,j,Nb,zb,ul,x0=l(()=>{"use strict";Mb=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},Nb=e=>{e.writeHead(403),e.end()},zb=e=>e.url?.split("?")[0]??"/",ul=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var Lt=l(()=>{"use strict";x0()});var D8,R0,I0=l(()=>{"use strict";tb();Lt();D8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},R0=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,el(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await D8(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=Za(t);return j(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Qa(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var j8,M0,O0,N0,Db,z0,jb=l(()=>{"use strict";j8=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],M0=e=>/embed|minilm|^bge-/i.test(e),O0=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),N0=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),Db=e=>e.filter(t=>t.trim().length>0&&!M0(t)),z0=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!M0(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>O0(s,o));if(n!==void 0)return n}for(let n of j8){let s=r.find(i=>O0(i,n));if(s!==void 0)return s}return r[0]??null}});var $b,$0,H0,Sm,F0,D0,j0,$8,H8,F8,U8,B8,G8,Wt,pl=l(()=>{"use strict";$b=require("node:child_process"),$0=g(require("node:fs")),H0=g(require("node:os")),Sm=g(require("node:path"));Ut();kt();jb();F0=3e3,D0=["claude-cli","codex","cursor","antigravity"],j0={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},$8=(e,t)=>new Promise(r=>{let o=(0,$b.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},F0);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),H8=()=>{let e=H0.default.homedir();return["ollama",Sm.default.join(e,".local","bin","ollama"),Sm.default.join(e,".agent-witch","ollama","ollama"),Sm.default.join(e,".local-agent-witch","ollama","ollama")]},F8=e=>new Promise(t=>{let r=(0,$b.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},F0);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(N0(Buffer.concat(o).toString("utf8")))})}),U8=async()=>{for(let e of H8()){if(e!=="ollama"&&!$0.default.existsSync(e))continue;let t=await F8(e);if(t!==null)return t}return[]},B8=e=>{let t=e.installedWriterIds.map(s=>j0[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=pe(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${j0[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},G8=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:ss},Wt=async e=>{let t=D0.map(i=>{let a=qu(i,e.commands);return $8(a.command,a.args)}),[r,...o]=await Promise.all([U8(),...t]),n=D0.flatMap((i,a)=>o[a]===!0?[i]:[]),s=z0(r,G8());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:B8({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var q8,V8,Hb,U0=l(()=>{"use strict";q8="http://127.0.0.1:11434",V8=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Hb=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||q8;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?V8(await o.json()):null}catch{return null}}});var Fb=l(()=>{"use strict";kt();pl();U0();jb()});var K8,B0,G0=l(()=>{"use strict";Fb();K8={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},B0=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:K8[t]})),ollamaModels:Db(e.ollamaModels)})});var J8,q0,V0=l(()=>{"use strict";Fb();Lt();G0();J8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},q0=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Wt({commands:me({})});return j(e.response,200,{ok:!0,...B0({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await J8(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await Hb({model:r,prompt:o});return n===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var Y8,K0,J0=l(()=>{"use strict";vA();Lt();Y8=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},K0=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await Y8(e);if(t===null)return!0;let r=Fa(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var Y0=l(()=>{"use strict";Vt()});var Ub,X0=l(()=>{"use strict";Y0();Ha();Ub=e=>{if(!Sr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:rt({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var Z0,Bb,Gb=l(()=>{"use strict";ge();Vt();Ha();Z0=e=>{if(!Sr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},Bb=async e=>{let t=Z0(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=so("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=H();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Z({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(rt({projectFolderPath:r}),await Ka(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var Q0=l(()=>{"use strict";X0();Gb()});var eI,tI=l(()=>{"use strict";Q0();Gb();Lt();eI=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=Ub(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await Bb(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,o,r,e.cors.headers),!0}return!1}});var rI,oI=l(()=>{"use strict";dl();hm();mm();rI=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Ws(50),r=Es(50);return e.response.writeHead(200,Rb()),e.response.end(xb({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var nI,sI=l(()=>{"use strict";MS();Lt();nI=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,Wa(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,Ea(),e.cors.headers),!0):!1});var iI,aI=l(()=>{"use strict";Eb();Lt();iI=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await ym();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var lI,cI=l(()=>{"use strict";wb();Lt();lI=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await ll();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await cl();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await al();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var dI,uI=l(()=>{"use strict";dl();hm();Lt();dI=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=gm();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=ul(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:Es(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=Ob(t),o=await fm({force:r});return j(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var pI,mI=l(()=>{"use strict";mm();Lt();pI=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await pm();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=ul(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:Ws(t)},e.cors.headers),!0}return!1}});var gI,fI=l(()=>{"use strict";I0();V0();J0();tI();oI();sI();aI();cI();uI();mI();gI=[nI,rI,pI,lI,dI,iI,K0,eI,R0,q0]});var hI,yI=l(()=>{"use strict";fI();hI=async e=>{for(let t of gI)if(await t(e))return!0;return!1}});var X8,SI,AI=l(()=>{"use strict";$a();Lt();yI();X8=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:zb(e),readJsonBody:()=>Mb(e)}),SI=async(e,t,r)=>{let o=e.headers.origin,n=zp(o);try{if(o!==void 0&&o.length>0&&!n.allowed){Nb(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=X8(e,t,r,n);if(await hI(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var bI,an,Am,bm=l(()=>{"use strict";bI=g(require("node:http"));dl();AI();an=async()=>{let e=await Ib(),t=bI.default.createServer((r,o)=>{SI(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Am=an});var PI={};Dt(PI,{runAgentWitchBridgeCli:()=>Z8});var Z8,wI=l(()=>{"use strict";ne();bm();Z8=async()=>{Qe("agent-witch-bridge");let e=await an(),t=mr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var _I=l(()=>{"use strict";_t()});var xs,qb,vI=l(()=>{"use strict";xs=(e,t,r)=>e===1?t:r,qb=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${xs(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${xs(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${xs(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${xs(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${xs(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${xs(u,"year","years")} ago`}});var ln,Vb,Q8,e3,Kb,io,ml,Jb,kI=l(()=>{"use strict";ln=g(require("node:fs")),Vb=g(require("node:path")),Q8="local-ws-traffic.ndjson",e3=500,Kb=e=>Vb.default.join(e.logsDir,Q8),io=(e,t)=>{let r=Kb(e);ln.default.mkdirSync(Vb.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});ln.default.appendFileSync(r,`${o}
`,"utf8")},ml=(e,t=e3)=>{let r=Kb(e);if(!ln.default.existsSync(r))return[];let n=ln.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},Jb=e=>{let t=Kb(e);ln.default.existsSync(t)&&ln.default.writeFileSync(t,"","utf8")}});var t3,CI,TI,LI=l(()=>{"use strict";Tb();t3=new Set(Object.values(Vp)),CI=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),TI=e=>{if(!CI(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!t3.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!CI(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var WI,EI=l(()=>{"use strict";WI=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var r3,o3,n3,gl,xI=l(()=>{"use strict";EI();r3=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,o3=e=>r3.test(e),n3=e=>WI(e),gl=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>gl(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&o3(o)){r[o]=n3(n);continue}r[o]=gl(n)}return r}});var Kt,Yb,s3,i3,a3,Xb,RI,II,OI,l3,Pm,cn,wm,Zb,MI=l(()=>{"use strict";Kt=g(require("node:fs")),Yb=g(require("node:path"));LI();xI();s3="local-ws-trace.ndjson",i3=1e4,a3=1440*60*1e3,Xb=e=>Yb.default.join(e.logsDir,s3),RI=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},II=e=>{if(!Kt.default.existsSync(e))return;let t=Kt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-a3,n=t.filter(s=>{let i=RI(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-i3);Kt.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},OI=(e,t)=>{let r=Xb(e);Kt.default.mkdirSync(Yb.default.dirname(r),{recursive:!0}),Kt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),II(r)},l3=e=>e.parsed===null?{_empty:!0}:gl(e.parsed),Pm=(e,t,r)=>{let o=TI(r);OI(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:l3(o)})},cn=(e,t)=>{OI(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:gl({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},wm=(e,t=80)=>{let r=Xb(e);if(II(r),!Kt.default.existsSync(r))return[];let o=Kt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=RI(s);i!==null&&n.push(i)}return n.reverse()},Zb=e=>{let t=Xb(e);Kt.default.existsSync(t)&&Kt.default.writeFileSync(t,"","utf8")}});var ao,NI,c3,Qb,_m,zI=l(()=>{"use strict";ao=g(require("node:fs")),NI=g(require("node:path")),c3=256e3,Qb=e=>{ao.default.mkdirSync(NI.default.dirname(e),{recursive:!0}),ao.default.writeFileSync(e,"","utf8")},_m=(e,t=c3)=>{if(!ao.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=ao.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=ao.default.openSync(e,"r");try{ao.default.readSync(a,i,0,s,n)}finally{ao.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var fl=l(()=>{"use strict";kI();MI();zI()});var eP,tP,DI=l(()=>{"use strict";eP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tP=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${eP(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${eP(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${eP(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var jI=l(()=>{"use strict";DI()});var rP,oP=l(()=>{"use strict";rP=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var nP=l(()=>{"use strict";tl()});var sP,iP,$I=l(()=>{"use strict";nP();sP=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},iP=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var HI=l(()=>{"use strict";oP();$I()});var FI,hl,aP,yl=l(()=>{"use strict";oP();FI=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hl=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=FI(e),r=FI(rP(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},aP=`(function () {
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
})();`});var dn,d3,lP,UI=l(()=>{"use strict";dn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),d3=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},lP=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${dn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?dn(r.direction):dn(r.kind),i=`trace-body-${o}`,a=dn(d3(r.body));return`<tr>
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
    </section>`});var GI,u3,BI,cP,qI=l(()=>{"use strict";qe();_t();GI=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},u3=e=>GI(e)===lr?Un:Fn,BI=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cP=e=>{let t=u3(e.installDir),o=`AW_HOME="$HOME/${GI(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${BI(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${BI(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var VI=l(()=>{"use strict";yl();UI();qI();yl()});var p3,Pr,Sl=l(()=>{"use strict";p3=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),Pr=p3});var KI,JI,YI,XI,ZI,QI,eO,Rs=l(()=>{"use strict";KI="projects",JI="knowledge",YI="chunks.ndjson",XI="lessons.ndjson",ZI="error-chunks.ndjson",QI="usage-stats.json",eO="knowledge-location.json"});var vm,m3,km,dP=l(()=>{"use strict";vm=g(require("node:path"));Rs();m3=(e,t)=>{let r=t.trim(),o=vm.default.join(e.installDir,KI,r,JI);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:vm.default.join(o,YI),memoryRunsFilePath:vm.default.join(o,XI)}},km=m3});var uP,g3,tO,rO=l(()=>{"use strict";uP=g(require("node:fs"));Rs();Yo();g3=e=>{let t=ct(e.projectFolderPath),r=`${t.metaDirPath}/${eO}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};uP.default.mkdirSync(t.metaDirPath,{recursive:!0}),uP.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},tO=g3});var Is,nO,oO,f3,sO,iO=l(()=>{"use strict";Is=g(require("node:fs")),nO=g(require("node:path"));Mo();Yo();dP();rO();oO=(e,t)=>{Is.default.existsSync(e)&&(Is.default.existsSync(t)&&Is.default.statSync(t).size>0||(Is.default.mkdirSync(nO.default.dirname(t),{recursive:!0}),Is.default.copyFileSync(e,t)))},f3=e=>{let t=ct(e.projectFolderPath),r=km(e.layout,e.projectId),o=`${t.memoryDirPath}/${Zn}`;oO(t.ragChunksFilePath,r.ragChunksFilePath),oO(o,r.memoryRunsFilePath),tO({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},sO=f3});var pP,h3,aO,lO=l(()=>{"use strict";pP=g(require("node:fs"));Yo();h3=e=>{let t=ct(e);if(!pP.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(pP.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},aO=h3});var cO,y3,Os,Cm=l(()=>{"use strict";cO=g(require("node:path"));Mo();Yo();iO();lO();dP();y3=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=aO(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){sO({layout:e.layout,projectFolderPath:t,projectId:o});let s=km(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=ct(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:cO.default.join(n.memoryDirPath,Zn),projectId:null}},Os=y3});var Tm,A3,Lm,mP=l(()=>{"use strict";Tm=g(require("node:fs"));Rs();A3=(e,t=500)=>{if(!Tm.default.existsSync(e))return;let r=Tm.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Tm.default.writeFileSync(e,`${o.join(`
`)}
`)},Lm=A3});var Wm,b3,un,gP=l(()=>{"use strict";Wm=g(require("node:path"));Rs();Cm();b3=e=>{let t=Os(e);if(t===null)return null;let r=Wm.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Wm.default.join(r,QI),errorChunksFilePath:Wm.default.join(r,ZI)}},un=b3});var uO,Al,pO,dO,fP,mO,_3,hP,gO,yP,SP,AP,bP=l(()=>{"use strict";uO=require("node:crypto"),Al=g(require("node:fs")),pO=g(require("node:path"));Sl();Rs();gP();dO=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),fP=e=>{if(!Al.default.existsSync(e))return dO();try{let t=JSON.parse(Al.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return dO()},mO=(e,t)=>{Al.default.mkdirSync(pO.default.dirname(e),{recursive:!0}),Al.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},_3=e=>{let t=Pr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,uO.createHash)("sha256").update(o).digest("hex").slice(0,16)},hP=e=>{let t=un(e);return t===null?null:fP(t.usageStatsFilePath)},gO=e=>{if(e.chunkIds.length===0)return;let t=un(e);if(t===null)return;let r=fP(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;mO(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},yP=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=un(e);if(r===null)return null;let o=_3(t),n=fP(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return mO(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},SP=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,AP=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var bl,fO,v3,k3,hO,C3,PP,Pl,Ms,wP,Ns,_P,vP=l(()=>{"use strict";bl=g(require("node:fs")),fO=g(require("node:path"));Sl();Cm();mP();bP();v3="http://127.0.0.1:11434",k3="nomic-embed-text",hO=(e,t,r)=>Os({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,C3=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},PP=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},Pl=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||v3,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||k3;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},Ms=(e,t,r)=>{let o=hO(e,t,r);if(o===null||!bl.default.existsSync(o))return[];let n=bl.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},wP=async e=>{let t=Pr(e.text),r=PP(t);if(r.length===0)return 0;let o=hO(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;bl.default.mkdirSync(fO.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await Pl(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};bl.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return Lm(o),n},Ns=async e=>{let t=await Pl(e.query);if(t===null)return[];let r=e.minScore??0,s=Ms(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:C3(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return gO({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},_P=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var wl,yO,T3,L3,kP,CP,TP,SO=l(()=>{"use strict";wl=g(require("node:fs")),yO=g(require("node:path"));Sl();gP();mP();vP();T3=e=>{if(!wl.default.existsSync(e))return[];let t=wl.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},L3=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},kP=async e=>{let t=un(e);if(t===null)return 0;let r=Pr(e.text),o=PP(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;wl.default.mkdirSync(yO.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await Pl(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};wl.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Lm(n,200),s},CP=async e=>{let t=un(e);if(t===null)return[];let r=await Pl(e.query);if(r===null)return[];let o=e.minScore??.3;return T3(t.errorChunksFilePath).map(s=>({chunk:s,score:L3(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},TP=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var LP=l(()=>{"use strict";vP();bP();SO()});var Se,WP,EP=l(()=>{"use strict";FA();Se=HA,WP=`
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
`.trim()});var W3,E3,xP,AO,RP,bO=l(()=>{"use strict";EP();yl();W3=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,E3=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],xP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AO=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${W3}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,RP=e=>{let t=E3.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=xP(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=xP(e.installBundleVersionLabel?.trim()??"unknown"),s=AO("brand brand-in-sidebar",n),i=AO("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${xP(e.title)} \xB7 Agent Witch Local</title>
  <style>${WP}</style>
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
  <script>${aP}</script>
</body>
</html>`}});var Em,_l,xm=l(()=>{"use strict";Em=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_l=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Em(e.syncMessage)}</p>`:"",o=Em(e.manageHref),n=Em(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Em(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var IP,OP,MP,PO=l(()=>{"use strict";IP=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,OP=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,MP=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var wO=l(()=>{"use strict";bO();xm();PO()});var zs,NP,_O=l(()=>{"use strict";yl();zs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),NP=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${zs(e.wakeError)}</div>`:"",a=hl(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
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
    </div>`}});var vO=l(()=>{"use strict";_O()});var W,Ds=l(()=>{"use strict";W=e=>e==="passed"||e==="stopped"||e==="failed"});var kO,zP,pn,DP,Rm=l(()=>{"use strict";kO="Stopped at the round limit. The best prompt is kept.",zP="Stopped because the score stopped rising. The best prompt is kept.",pn="Finished. The best prompt is the result.",DP="Wizard ended. Progress from finished steps is kept."});var lo,jP=l(()=>{"use strict";lo=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var x3,R3,vl,CO,Im=l(()=>{"use strict";x3=/\n+|;\s+/,R3=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,vl=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(x3).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,R3(s)]},[]);return[...t,...o]},[]),CO=e=>{let t=vl(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ae,js=l(()=>{"use strict";ae=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var kl,$P=l(()=>{"use strict";Im();js();kl=e=>{let t=[...e.priorRounds,e.current],r=ae(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:CO(o)}}});var HP,I3,O3,Om,FP=l(()=>{"use strict";HP={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},I3=e=>{try{let t=JSON.parse(e.fragment);return{...HP,objects:[...e.objects,t]}}catch{return{...HP,objects:e.objects}}},O3=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:I3(r)},Om=e=>[...e].reduce(O3,HP).objects});var M3,UP,N3,TO,BP=l(()=>{"use strict";FP();M3=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},UP=e=>{let t=Om(e).filter(M3),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},N3=(e,t)=>({...e,passed:e.score>=t}),TO=(e,t)=>{let r=UP(e);return r===null?null:N3(r,t)}});var GP,qP,Mm=l(()=>{"use strict";GP="The judge reply needs a score and a reason.",qP="The improver reply was empty."});var LO,WO=l(()=>{"use strict";LO=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var EO,xO=l(()=>{"use strict";EO=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var D3,RO,IO=l(()=>{"use strict";WO();xO();Rm();Im();D3=e=>{let t=vl(e);return t.length===0?zP:`${zP} Avoid: ${t.join("; ")}.`},RO=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:kO};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(LO(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:D3(EO(r))}}return null}});var co,j3,mn,OO,Nm=l(()=>{"use strict";co=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},j3=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,mn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",j3(e.tokens),`Delay: ${co(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},OO=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var $3,MO,NO=l(()=>{"use strict";BP();$3=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,MO=e=>{let r=($3.exec(e)?.[1]??e).trim();return r.length===0||UP(r)!==null?null:r}});var zO,zm,DO=l(()=>{"use strict";Nm();NO();Mm();zO=e=>({type:"call",role:"judge",choice:e.choice,prompt:OO({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),zm=e=>{let t=MO(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:qP}}:{nextPrompt:t,continuation:zO({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var VP,jO=l(()=>{"use strict";jP();$P();BP();Mm();Rm();IO();Mm();DO();VP=e=>{let t=TO(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:GP}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=RO({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=kl({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:lo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var Cl,KP=l(()=>{"use strict";Cl=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var $O=l(()=>{"use strict"});var HO=l(()=>{"use strict";$O()});var gn,FO=l(()=>{"use strict";gn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var H3,JP,UO=l(()=>{"use strict";Nm();H3=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,JP=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",H3(e.tokens),`Delay: ${co(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var F3,U3,B3,YP,BO=l(()=>{"use strict";F3=/[A-Za-z0-9_./~-]{3,180}/g,U3=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,B3=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||U3.test(t)},YP=(e,t=12)=>{let r=[];for(let o of e.matchAll(F3)){let n=o[0].replace(/\.+$/,"");if(!(!B3(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var Tl,GO=l(()=>{"use strict";Tl=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var Dm,XP,qO,Ll,ZP=l(()=>{"use strict";Dm=e=>Math.floor(e/2),XP=e=>Math.max(Dm(e)+1,e-20),qO=(e,t)=>e>=t?"passes":e>=XP(t)?"close":e>=Dm(t)?"weak":"bad",Ll=e=>[{band:"bad",label:`0\u2013${Dm(e)-1} bad`},{band:"weak",label:`${Dm(e)}\u2013${XP(e)-1} weak`},{band:"close",label:`${XP(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var jm,QP=l(()=>{"use strict";ZP();jm=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${qO(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var Et,ew=l(()=>{"use strict";Et=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var VO,KO=l(()=>{"use strict";VO=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var G3,q3,JO,YO=l(()=>{"use strict";Ds();QP();ew();KO();G3=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],q3=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",JO=e=>{let t=e.wizard;if(t===void 0)return[];let r=Et(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=G3.map((f,y)=>{let p=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:f,state:p,detail:null}}).filter((f,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=jm(e),d=c.filter(f=>f.id==="round-0"),u=VO(t)&&(!n||a)?c.filter(f=>f.id!=="round-0"):[],m=W(e.status)&&!s,S=m?[{id:"end",label:q3(e),state:"done",detail:e.errorMessage}]:[];if(m&&S.length>0){let f=Math.min(r,i.length),y=i.slice(0,f).map(p=>({...p,state:"done"}));return[...d,...y,...S,...u]}return[...d,...i,...u,...S]}});var V3,tw,XO=l(()=>{"use strict";Ds();QP();YO();V3=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",tw=e=>{if(e.wizard!==void 0)return JO(e);let t=jm(e),r=W(e.status)?[{id:"end",label:V3(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var Wl,ZO=l(()=>{"use strict";Wl=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var QO=l(()=>{"use strict";_t()});var eM,El,xl,Hs,$m,rw,tM=l(()=>{"use strict";QO();eM="/prompt-optimizer/agent",El=`${gr}${eM}`,xl=`${gr}/prompt-optimizer`,Hs="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",$m=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Hs}`,rw="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var wr=l(()=>{"use strict"});var se,Rl=l(()=>{"use strict";wr();se=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var ow,rM=l(()=>{"use strict";ow="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var oM,nM=l(()=>{"use strict";oM=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Il,iM=l(()=>{"use strict";nM();wr();Il=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:oM(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null})});var nw,aM=l(()=>{"use strict";wr();nw=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null})});var sw,lM=l(()=>{"use strict";wr();sw=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var cM,Ol,dM=l(()=>{"use strict";cM=["generalize","evaluate","separate","optimize_modules"],Ol=(e,t)=>{let r=cM.indexOf(t);if(r===-1)return e;let o=cM.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var Hm,iw=l(()=>{"use strict";Im();Hm=e=>{let t=vl(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Ml,uM=l(()=>{"use strict";iw();Ml=e=>{let t=Hm(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var J3,Y3,X3,pM,mM=l(()=>{"use strict";J3=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),Y3=/^\{\{[a-zA-Z0-9_-]+\}\}$/,X3=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(J3(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},pM=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>Y3.test(n)?n:X3(n,r)).join("")}});var aw,gM=l(()=>{"use strict";mM();aw=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:pM(o.prompt,t)}))}))});var Z3,Nl,fM=l(()=>{"use strict";wr();iw();Z3=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Nl=e=>{let t=Hm(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=Z3(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var zl,hM=l(()=>{"use strict";KP();zl=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return Cl({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Dl,cw=l(()=>{"use strict";js();Dl=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ae(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var dw,yM=l(()=>{"use strict";cw();dw=e=>{let t=Dl({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var fn,SM=l(()=>{"use strict";fn=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var Q3,e6,te,Fm=l(()=>{"use strict";Rl();Q3=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},e6=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,te=e=>{let t=se(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:Q3(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>e6(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var AM,bM=l(()=>{"use strict";Rl();Fm();AM=e=>{let t=te(e.wizard),r=se(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var uw,PM=l(()=>{"use strict";bM();uw=e=>{let t=AM({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var t6,wM,_M=l(()=>{"use strict";t6=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},wM=e=>[...e].reduce(t6,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var r6,vM,kM=l(()=>{"use strict";r6=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},vM=e=>[...e].reduce(r6,{out:"",inString:!1,escaped:!1}).out});var o6,n6,CM,TM=l(()=>{"use strict";_M();kM();o6=e=>e.charCodeAt(0)===65279?e.slice(1):e,n6=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},CM=e=>vM(wM(n6(o6(e))))});var s6,i6,a6,LM,l6,Fs,Um=l(()=>{"use strict";FP();TM();s6=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},i6=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},a6=e=>[...e].reduce(i6,{out:"",inString:!1,escaped:!1}).out,LM=e=>{let t=Om(e);return t.length===0?null:t[t.length-1]},l6=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Fs=e=>{let t=CM(s6(e)),r=LM(t);if(r!==null)return r;let o=a6(t),n=LM(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw l6(i)}}});var c6,d6,pw,WM,EM=l(()=>{"use strict";c6=/^[a-z0-9][a-z0-9-]{0,62}$/,d6=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return c6.test(t)?t:""},pw=e=>e.replace(/\s+/gu," ").trim(),WM=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=d6(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=pw(n.name),a=pw(n.description),c=pw(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var xM,RM,IM=l(()=>{"use strict";xM=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},RM=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var mw,OM=l(()=>{"use strict";Um();EM();IM();mw=(e,t)=>{let r=(()=>{try{return Fs(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(xM(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(RM).filter(a=>a!==null),i=WM({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var gw,MM=l(()=>{"use strict";gw=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var fw,NM=l(()=>{"use strict";fw=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var hw,zM=l(()=>{"use strict";Rl();Fm();hw=e=>{let t=te(e.wizard),r=se(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var jl,DM=l(()=>{"use strict";jl=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var xt,u6,yw,jM=l(()=>{"use strict";xt=g(Jn());Um();u6=(0,xt.isType)({name:xt.isNonEmptyString,description:xt.isString,sampleValue:xt.isString}),yw=e=>{let t=Fs(e);if(!(0,xt.isType)({templatedPrompt:xt.isNonEmptyString,variables:(0,xt.isArrayWithEachItem)(u6)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var le,p6,m6,Sw,$M=l(()=>{"use strict";le=g(Jn());wr();Um();p6=(0,le.isType)({id:le.isNonEmptyString,title:le.isNonEmptyString,prompt:le.isNonEmptyString,order:le.isNumber}),m6=(0,le.isType)({id:le.isNonEmptyString,title:le.isNonEmptyString,summary:le.isString,topology:(0,le.isOneOf)("chain","parallel"),modules:(0,le.isArrayWithEachItem)(p6),recommended:le.isBoolean}),Sw=e=>{let t=Fs(e);if(!(0,le.isType)({options:(0,le.isArrayWithEachItem)(m6)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Us,HM=l(()=>{"use strict";Us=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var g6,Aw,bw=l(()=>{"use strict";g6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Aw=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(g6,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Rt,It,FM=l(()=>{"use strict";js();bw();Rt=e=>Aw(e.templatedPrompt,e.variables),It=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ae(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Rt(e.wizard)}});var f6,hn,UM=l(()=>{"use strict";f6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,hn=(e,t)=>e.replace(f6,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var h6,yn,Bm=l(()=>{"use strict";h6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,yn=e=>{let t=new Set,r=[];for(let o of e.matchAll(h6)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var $l,BM=l(()=>{"use strict";Bm();$l=e=>e.variables.length>0||yn(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var Pw,ww=l(()=>{"use strict";wr();Pw=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Hl,GM=l(()=>{"use strict";js();ww();Hl=e=>{let t=e.wizard.evaluateSelectedRound??ae(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:Pw(r.judgement,e.passScore)}});var Fl,qM=l(()=>{"use strict";Fl=e=>e.length===1&&e[0].modules.length===1});var _w,VM=l(()=>{"use strict";_w=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Ae,Gm,Ul=l(()=>{"use strict";Ae=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),Gm=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var KM,JM=l(()=>{"use strict";Ul();KM=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Ae("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Ae("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Ae("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var YM,XM=l(()=>{"use strict";Ds();Ul();YM=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!W(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Ae("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),Ae("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Ae("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",Gm(e.writerLabel,e.folder)),Ae("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Ae("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var ZM,QM=l(()=>{"use strict";Ul();ZM=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Ae("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Ae("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Ae("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var eN,tN=l(()=>{"use strict";Ul();eN=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Ae("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Ae("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",Gm(e.writerLabel,e.folder)),...r?[Ae("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var qm,rN=l(()=>{"use strict";Ds();JM();XM();QM();tN();qm=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(W(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return YM(r);case"evaluate":return KM({...r,currentRound:e.currentRound});case"separate":return eN(r);case"optimize_modules":return ZM({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Bl,_r,oN=l(()=>{"use strict";Bl=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),_r=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var y6,Vm,vw,nN=l(()=>{"use strict";Bm();y6="wizardParam_",Vm=e=>`${y6}${e}`,vw=e=>{let t=yn(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=Vm(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var nt,sN=l(()=>{"use strict";nt=["generalize","evaluate","separate","optimize_modules"]});var Gl,Sn,Bs,uo=l(()=>{"use strict";Gl="Stopped because the confirmed token or spend budget was exceeded.",Sn="Approaching the confirmed budget. Further trials may hard-stop.",Bs="Confirm the Step 4 token and spend budget before optimizing modules."});var dt,ql=l(()=>{"use strict";dt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var Jt,Km=l(()=>{"use strict";uo();Jt=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var S6,po,kw=l(()=>{"use strict";uo();S6={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},po=e=>{let t=e?.trim()??"";return t.length===0?.01:S6[t]??.01}});var lN,Gs,Tw,Lw,Vl,cN=l(()=>{"use strict";uo();ql();Km();kw();lN=e=>{let t=e.fromJudge;if(t!=null&&typeof t.targetTokenBudget=="number"&&Number.isFinite(t.targetTokenBudget)&&t.targetTokenBudget>0&&typeof t.estimatedSpendUsd=="number"&&Number.isFinite(t.estimatedSpendUsd)&&t.estimatedSpendUsd>=0)return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??po(e.writerId)??.01,stub:!1};let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??po(e.writerId),s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:dt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},Gs=e=>{let t=e.fromJudge;if(t!=null&&typeof t.targetTokenBudget=="number"&&Number.isFinite(t.targetTokenBudget)&&t.targetTokenBudget>0&&typeof t.estimatedSpendUsd=="number"&&Number.isFinite(t.estimatedSpendUsd)&&t.estimatedSpendUsd>=0)return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??po(e.writerId),stub:!1};let r=Math.max(1,Math.floor(e.maxRounds??3)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??po(e.writerId),i=r*4e3,a=n*o*8e3,c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:dt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},Tw=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),Lw=e=>{let t=e.existing??Jt(),r=lN({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return Tw(t,r)},Vl=e=>{let t=e.existing??Jt();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=Gs({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return Tw(t,r)}});var kr,dN=l(()=>{"use strict";ql();uo();Km();kr=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??Jt(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=dt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var Ew,qs,uN=l(()=>{"use strict";uo();ql();Ew=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=dt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:Gl,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:Gl,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:Sn,costControls:{...t,softWarnFired:!0,softWarnMessage:Sn}}:null},qs=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var xw,pN=l(()=>{"use strict";xw=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var E=l(()=>{"use strict";Ds();Rm();jO();jP();Nm();KP();HO();FO();UO();BO();$P();GO();js();XO();ew();ZP();ZO();tM();wr();Rl();rM();iM();aM();lM();dM();uM();gM();fM();hM();cw();yM();SM();Fm();PM();OM();MM();NM();zM();DM();jM();$M();HM();FM();bw();UM();Bm();BM();GM();qM();ww();VM();rN();oN();nN();sN();uo();ql();Km();cN();kw();uo();dN();uN();pN()});var Rw=l(()=>{"use strict";fa()});var A6,fN,hN=l(()=>{"use strict";Rw();A6=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,fN=e=>{let t=Go(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(A6)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var SN,b6,P6,Yt,w6,_6,yN,Ym,AN,v6,ut,bN,PN,wN,Ot=l(()=>{"use strict";Rw();hN();SN=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),b6=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,P6=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,Yt=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(b6.test(e.errorMessage))return"usage_limit";if(P6.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},w6="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",_6="The writer waited on terminal input and did not return a prompt.",yN=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Ym=e=>{let t=e.trim();if(t.length===0||t.length>=500||!yN.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>yN.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},AN=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},v6=e=>Ym(e.stdout)??Ym(e.stderr)??(AN(e.replyFile)?Ym(e.replyFile):null),ut=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return w6;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?_6:null},bN=e=>{let t=e.trim();return t.length===0?null:ut(t)!==null?t:Ym(t)??(AN(t)?t:null)},PN=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],wN=e=>{let t=e.replyFileText?.trim()??"",r=ut([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=v6({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=Yt({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=fN([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Go(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var _N,Vs,Xm=l(()=>{"use strict";Ot();_N=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:bN(e.promptText)},Vs=e=>{let t=e.revisions.find(o=>o.roundNumber===e.currentRound),r=t===void 0?null:_N(t);if(r!==null)return r.trim();for(let o=e.revisions.length-1;o>=0;o-=1){let n=_N(e.revisions[o]);if(n!==null)return n.trim()}return null}});var R,k6,Zm,ie,bn,kN,vN,CN,TN,be=l(()=>{"use strict";R="manual",k6=["claude-cli","codex","cursor","antigravity"],Zm={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ie=e=>e===R?"You":e in Zm?Zm[e]:e,bn=e=>k6.filter(t=>e.includes(t)),kN=e=>{let t=bn(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},vN=(e,t)=>t===R?R:e.find(r=>r===t)??null,CN=(e,t,r)=>{let o=bn(e),n=vN(o,t),s=vN(o,r);return n===null||s===null?null:{judge:n,improver:s}},TN=(e,t,r)=>{let o=bn(e);return t===null||t.trim()===""?r!==R?r:o[0]??null:t===R?null:o.find(n=>n===t)??null}});var LN,Qm,Iw,Pn,Ow,st,Cr,ce,Be=l(()=>{"use strict";LN=g(require("node:fs")),Qm=g(require("node:os")),Iw=g(require("node:path"));ys();Pn="~",Ow=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,st=e=>{let t=Qm.default.homedir(),r=Ow(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Cr=e=>{let t=e.trim().length===0?"~":e.trim(),r=lt(t),o=Iw.default.isAbsolute(r)?Ow(r):Ow(Iw.default.resolve(Qm.default.homedir(),r));try{if(!LN.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:st(o)}},ce=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Qm.default.homedir()});var Xt,Ks=l(()=>{"use strict";Xt='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var Mw,WN,C6,EN,xN,Nw=l(()=>{"use strict";E();be();Be();Ks();Mw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WN=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',C6=e=>{let t=WN(e.state),r=`<h2>${Mw(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${Mw(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Xt}</button></div><template>${r}</template></li>`},EN=e=>{let t=e.wizard;if(t===void 0)return"";let r=qm({status:e.status,wizard:t,writerLabel:ie(e.judgeModel),runnerLabel:ie(e.runnerModel??e.judgeModel),folderDisplay:st(ce(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(C6).join("")}</ol>`},xN=e=>{let t=e.wizard;if(t===void 0)return"";let r=qm({status:e.status,wizard:t,writerLabel:ie(e.judgeModel),runnerLabel:ie(e.runnerModel??e.judgeModel),folderDisplay:st(ce(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${WN(n.state)}<span class="sdlc-pipeline-label">${Mw(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var Mt,RN,IN,ON,zw=l(()=>{"use strict";E();Mt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RN="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",IN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Mt(RN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${Mt(i.name)}}}</strong> \u2014 ${Mt(i.description)} (sample: ${Mt(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Mt(r)}</pre>`,n=Rt(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Mt(n)}</pre>`;return`${t}${o}${s}`},ON=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Mt(RN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${Mt(n.name)}}}</strong> \u2014 ${Mt(n.description)} (sample: ${Mt(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${Mt(r)}</pre>`;return`${t}${o}`}});var Kl,Dw=l(()=>{"use strict";Kl=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var MN,NN=l(()=>{"use strict";E();MN=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=gn({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=mn({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var jw,eg,$w=l(()=>{"use strict";Ks();NN();jw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eg=e=>{let t=MN(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${jw(r)}">${Xt}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${jw(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${jw(t)}</pre></template>`}});var tg,Js,Hw=l(()=>{"use strict";Dw();$w();tg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Js=e=>{let t=Kl(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${tg(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,u=e.cycle.revisions.map(m=>{let S=m.judgement?.score,f=S==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${S}`,y=m.judgement?.reasons?.trim()??"",p=y.length===0?"":`<br><span class="muted">${tg(y)}</span>`,A=eg({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run});if(e.interactive){let b=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${b}> <span class="sdlc-wizard-revision-title">${tg(f)}</span></label>${A}${p}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${tg(f)}</span>${A}${p}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var Fw,zN,DN,jN,Uw=l(()=>{"use strict";Fw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zN=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Fw(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Fw(t.prompt)}</pre></li>`).join("")}</ol>`,DN=e=>zN([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),jN=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Fw(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${zN(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Jl,T6,rg,Bw=l(()=>{"use strict";E();Uw();Jl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),T6=e=>{let t=e.wizard;return t===void 0?"":It({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},rg=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=T6(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Jl(n.orchestratorSkill.fileName)}</code> \u2014 ${Jl(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${Jl(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=DN(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${Jl(r)} <span class="muted">${Jl(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var De,L6,W6,E6,x6,og,R6,I6,O6,M6,N6,z6,Ys,ng=l(()=>{"use strict";E();Nw();zw();Hw();$w();Bw();De=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),L6={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},W6=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${De(o)}</pre>`:`<p class="sdlc-pre-preview mono">${De(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${De(o)}</pre></details>`;return`<h2>${De(e)}</h2>${n}`},E6=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=Rt(t).trim(),n=It({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!W(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${W6("What is being evaluated",i)}`},x6=(e,t)=>{let r=e.wizard;if(r===void 0||W(e.status))return"";let o=L6[t];return o===void 0||r.phase!==o?"":xN(e)},og=(e,t,r)=>{let o=x6(e,t),n=t==="wizard-2"?E6(e):"";return`${o}${n}${r}`},R6=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},I6=e=>{let t=e.wizard;return t===void 0?"":IN(t)},O6=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${De(a)}</span>`,d=eg({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${De(s)}${i}</span>${d}${c}</li>`}).join("")}</ul>`,M6=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Js({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=R6(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${O6(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=It({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${De(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014";return`<li>Round ${c.roundNumber} \u2014 score ${d}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${De(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},N6=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${De(n.title)}</strong> <span class="muted">(${De(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${De(o.title)}</strong>${n}${De(s)}${rg(e,o)}</li>`}).join("")}</ul>`},z6=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${De(i)}</span> <strong>${De(n.title)}</strong>${De(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${De(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Js({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Ys=(e,t)=>{switch(t){case"wizard-1":return og(e,t,I6(e));case"wizard-2":return og(e,t,M6(e));case"wizard-3":return og(e,t,N6(e));case"wizard-4":return og(e,t,z6(e));default:return""}}});var D6,j6,$N,HN,FN=l(()=>{"use strict";E();Xm();Ot();ng();D6=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},j6=e=>{let t=e.goal.trim();return t.length===0?null:t},$N=(e,t,r,o,n)=>{let s=ut(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},HN=(e,t)=>{let r=j6(e);if(t.id.startsWith("wizard-")){let s=Ys(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=Wl(e,t);if(s!==null){let a=Vs(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ae(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:$N(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:D6(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:$N(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var wn,UN,BN=l(()=>{"use strict";wn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UN=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${wn(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${wn(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${wn(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${wn(n)}</h2><pre class="mono">${wn(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${wn(e.goal)}</dd></div></dl>`;return`<h2>${wn(e.title)}</h2>${i}${t}${r}${o}${s}`}});var $6,GN,Yl,Gw,sg=l(()=>{"use strict";E();$6=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),GN=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||W(e.status))return null;let r=Et(t);return r<0||r>3?null:`wizard-${r+1}`},Yl=(e,t)=>$6.has(t)?GN(e)===t:!1,Gw="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var H6,ig,qw=l(()=>{"use strict";H6='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',ig=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${H6}</button>`});var _n,ag=l(()=>{"use strict";E();_n=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:kl({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:Tl(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var F6,qN,U6,Vw,VN,B6,G6,q6,V6,KN,JN=l(()=>{"use strict";E();ag();F6={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},qN=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},U6=e=>F6[e]??null,Vw=(e,t)=>{let r=e.wizard,o=U6(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=Et(r);return o<n||o===n},VN=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},B6=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:Rt(t).trim();return o.length===0?null:Ml({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:qN(e,"generalize")})},G6=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=_n(e);return n===null?null:lo({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=VN(e)?.promptText.trim()??It({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:gn({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},q6=e=>{let t=e.wizard;if(t===void 0)return null;let r=It({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:Nl({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:qN(e,"separate")})},V6=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=_r(t),s=hn(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=_n(e);return c===null?null:lo({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=VN(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||W(e.status)&&i?.judgement!==null)?mn({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):zl({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:fn(t,r).output,moduleTitle:o.title})},KN=(e,t)=>{if(!Vw(e,t))return null;switch(t){case"wizard-1":return B6(e);case"wizard-2":return G6(e);case"wizard-3":return q6(e);case"wizard-4":return V6(e);default:return null}}});var K6,lg,Kw=l(()=>{"use strict";E();K6=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},lg=(e,t)=>{let r=e.wizard,o=K6(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=Et(r);return o<n?"done":o===n&&W(e.status)&&e.status==="failed"?"failed":o<=n&&W(e.status)?"done":"pending"}});var J6,Xs,cg=l(()=>{"use strict";Ks();JN();Kw();J6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xs=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(lg(e,t)==="pending")return""}else if(!Vw(e,t))return"";let o=KN(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Xt}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${J6(o)}</pre></template>`}});var vn,Tr,Zs=l(()=>{"use strict";vn=e=>e.toLocaleString("en-US"),Tr=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var Zt,Y6,YN,dg,XN,ZN,ug=l(()=>{"use strict";E();FN();BN();sg();qw();Ks();Xm();Nw();cg();Zs();Zt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Y6=(e,t)=>{let r=Wl(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Tr(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${vn(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Zt(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${Zt(r)}</span>`:"",d=UN(HN(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&W(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${Zt(e.id)}"`:"",m=Yl(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${Zt(Gw)}"><input type="hidden" name="cycleId" value="${Zt(t.id)}"><input type="hidden" name="wizardStepId" value="${Zt(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",S=e.state==="active"&&e.id.startsWith("wizard-")?EN(t):"",f=o?"failed":e.state,y=o?Vs(t):null,p=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Xt}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${Zt(y)}</pre></template>`:"",A=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Xs(t,e.id):"";return`<li class="sdlc-node sdlc-node-${f}" data-sdlc-step-id="${Zt(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${Zt(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${A}${p}</div></div>${S}<template>${d}</template></li>`},YN=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>Y6(r,t)).join("")}</ol>`,dg=e=>`<div class="sdlc-score" aria-label="What the score means">${Ll(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Zt(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,XN=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${ig({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,ZN=`<script>
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
</script>`});var pg,mg,gg,QN,Jw=l(()=>{"use strict";pg="support-reply",mg="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",gg=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),QN=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var fg,ez,tz=l(()=>{"use strict";E();ug();Jw();fg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ez=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${dg(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${fg(mg)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${fg(gg)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${fg(QN)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${fg(pg)}">Run this sample</a>
      </div>
    </section>`});var Yw,hg,X6,rz,oz=l(()=>{"use strict";Yw=g(require("node:fs")),hg=g(require("node:path")),X6=e=>hg.default.join(hg.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),rz=(e,t)=>{let r=X6(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;Yw.default.mkdirSync(hg.default.dirname(r),{recursive:!0}),Yw.default.appendFileSync(r,o,"utf8")}});var Qs,nz,Z6,sz,Q6,iz,Qt,Y,az,z,it=l(()=>{"use strict";Qs=g(require("node:fs")),nz=g(require("node:path"));E();oz();Z6=e=>e.wizard===void 0?e:{...e,wizard:nw(e.wizard)},sz=new Set,Q6=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),iz=(e,t)=>{Qs.default.mkdirSync(nz.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;Qs.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),Qs.default.renameSync(r,e)},Qt=e=>{if(!Qs.default.existsSync(e))return[];try{let t=JSON.parse(Qs.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(Q6).map(Z6):[]}catch{return[]}},Y=(e,t)=>Qt(e).find(r=>r.id===t)??null,az=(e,t)=>{sz.add(t);let r=Qt(e).filter(o=>o.id!==t);iz(e,r)},z=(e,t)=>{if(sz.has(t.id))return;let r=Qt(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];iz(e,o),rz(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var ei,er,Xl,lz,yg,eJ,cz,dz,uz,Xw=l(()=>{"use strict";ei=g(require("node:fs")),er=g(require("node:path")),Xl=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},lz=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),yg=(e,t)=>{let r=Xl(e);return r.length>0?r:Xl(t)},eJ=e=>{let t=yg(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${lz(o)}`,...n.length>0?[`description: ${lz(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},cz=e=>`.cursor/skills/${e}/SKILL.md`,dz=(e,t)=>{let r=Xl(t);if(r.length===0)return!1;let o=er.default.resolve(e),n=er.default.resolve(o,".cursor","skills"),s=er.default.resolve(o,cz(r));return s.startsWith(`${n}${er.default.sep}`)?ei.default.existsSync(s):!1},uz=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(yg(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=er.default.resolve(e.workingDirectory);try{if(!ei.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=eJ({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=cz(r.slug),n=er.default.resolve(t,".cursor","skills"),s=er.default.resolve(t,o);if(!s.startsWith(`${n}${er.default.sep}`))return{ok:!1,errorCode:"path"};if(ei.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{ei.default.mkdirSync(er.default.dirname(s),{recursive:!0}),ei.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var tJ,pz,mz,gz=l(()=>{"use strict";E();it();Be();Ot();Xw();tJ=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,pz=e=>{let t=e.get("savedSkill");return t!==null&&tJ.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},mz=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=Y(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!W(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ae(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||ut(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=uz({workingDirectory:ce(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var Sg,Ag,Zl=l(()=>{"use strict";E();Sg=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=kr({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},Ag=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var mo,Ql=l(()=>{"use strict";E();Zl();mo=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=_w(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=Lw({moduleCount:o.length,existing:e.costControls,writerId:n}),i=Sg(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Bl(r.variables)},updatedAt:new Date().toISOString()}}});var go,ec=l(()=>{"use strict";go=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var Zw=l(()=>{"use strict";kt();pl();fa()});var Qw,fz,e_,hz,yz=l(()=>{"use strict";Qw={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},fz=e=>e.exitCode===null&&e.signalCode===null,e_=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!fz(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!fz(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),hz=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),e_(e).then(s=>{r({...Qw,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var Sz,tc,Az,t_,rJ,o_,n_,oJ,nJ,sJ,bz,iJ,r_,Pz,rc,wz,aJ,lJ,Ke,kn=l(()=>{"use strict";Sz=require("node:child_process"),tc=g(require("node:fs")),Az=g(require("node:os")),t_=g(require("node:path"));Zw();yz();Ot();rJ=["claude-cli","codex","cursor","antigravity"],o_=18e4,n_=6e5,oJ=12e4,nJ=9e5,sJ="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",bz="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",iJ="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",r_=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},Pz=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=r_(process.env[bz])??Math.max(r,n_));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:r_(process.env[iJ])??nJ;return Math.min(o,Math.max(oJ,r))},rc=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?r_(process.env[bz])??n_:o_,wz=e=>`The writer timed out after ${e}ms.`,aJ=e=>rJ.includes(e),lJ=e=>e===!0||process.env[sJ]==="1",Ke=e=>new Promise(t=>{if(e.signal?.aborted){t(Qw);return}if(lJ(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!aJ(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=Bt(r,e.prompt,me({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!tc.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:o_,s=t_.default.join(tc.default.mkdtempSync(t_.default.join(Az.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=PN({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,Sz.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=S=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(S))};hz(u,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",e_(u).then(S=>{m({ok:!1,errorMessage:wz(n),errorKind:"writer_timeout",killSignal:S})})},n),u.stdout.on("data",S=>{a.push(Buffer.from(S))}),u.stderr.on("data",S=>{c.push(Buffer.from(S))}),u.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",()=>{if(d.settled)return;let S=tc.default.existsSync(s)?tc.default.readFileSync(s,"utf8"):null,f=wN({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:S});if(f.ok&&d.stopReason!=="abort"){m(f);return}d.stopReason===null&&m(f)})})});var cJ,oc,s_=l(()=>{"use strict";E();Zs();cJ=e=>{if(e.wizard!==void 0){let t=jl(e.wizard),r=Tr(e);return(t??0)+r}return Tr(e)},oc=e=>{let t=Ew({costControls:e.costControls,spentTokens:cJ(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var _z,dJ,nc,bg,Pg=l(()=>{"use strict";E();be();s_();_z=e=>e===R?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},dJ=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),nc=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=VP({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:_z(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?xw({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:Tl(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=dJ(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?oc({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):oc({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},bg=(e,t,r=null)=>{let o=zm({raw:t,judge:_z(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var wg,i_=l(()=>{"use strict";wg=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var Cz,_g,vg,vz,kz,a_,uJ,Tz,l_,pJ,Lz,mJ,gJ,Wz,Ez=l(()=>{"use strict";Cz=require("node:child_process"),_g=g(require("node:fs")),vg=g(require("node:path"));Kp();E();vz=4e3,kz=12e3,a_=(e,t)=>{let r=(0,Cz.spawnSync)("git",[...t],{cwd:e,env:no(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},uJ=e=>a_(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",Tz=e=>{let t=a_(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},l_=(e,t)=>{let r=vg.default.resolve(e,t),o=vg.default.relative(e,r);if(o.startsWith("..")||vg.default.isAbsolute(o)||!_g.default.existsSync(r)||!_g.default.statSync(r).isFile())return null;let n=_g.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>vz?`${n.slice(0,vz)}
\u2026truncated`:n},pJ=e=>e.length>kz?`${e.slice(0,kz)}
\u2026truncated`:e,Lz=e=>{let t=YP(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,l_(e.workingDirectory,n)])),o=uJ(e.workingDirectory);return{git:o,status:o?Tz(e.workingDirectory):{},files:r,paths:t}},mJ=(e,t)=>{let r=a_(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=l_(e,t);return o===null?`${t} is missing.`:o},gJ=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",Wz=e=>{let t=e.before.git?Tz(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=l_(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>mJ(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:gJ(e.before.git,e.before.paths.length>0),evidence:pJ(i.join(`

`))}}});var u_,B,p_,Ee,xz,fJ,hJ,Rz,ti,Iz,ri,yJ,SJ,sc,c_,d_,AJ,Oz,bJ,PJ,wJ,Mz,_J,Nz,zz,vJ,kJ,Dz,jz=l(()=>{"use strict";u_=require("node:child_process"),B=g(require("node:fs")),p_=g(require("node:os")),Ee=g(require("node:path"));Kp();xz=8e6,fJ=16e6,hJ=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],Rz=(e,t)=>{let r=(0,u_.spawnSync)("git",[...t],{cwd:e,env:no(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},ti=(e,t)=>(0,u_.spawnSync)("git",[...t],{cwd:e,env:no(),timeout:8e3}).status===0,Iz=e=>{let t=Rz(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},ri=(e,t)=>{let r=Ee.default.resolve(e,t),o=Ee.default.relative(e,r);return o.startsWith("..")||Ee.default.isAbsolute(o)?null:r},yJ=(e,t)=>{let r=ri(e,t);if(r===null||!B.default.existsSync(r))return null;let o=B.default.statSync(r);return!o.isFile()||o.size>xz?null:B.default.readFileSync(r)},SJ=(e,t,r)=>{let o=ri(e,t);o!==null&&(B.default.mkdirSync(Ee.default.dirname(o),{recursive:!0}),B.default.writeFileSync(o,r))},sc=(e,t)=>{let r=ri(e,t);r===null||!B.default.existsSync(r)||B.default.rmSync(r,{recursive:!0,force:!0})},c_=(e,t)=>ti(e,["cat-file","-e",`HEAD:${t}`]),d_=e=>{let t=Rz(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},AJ=e=>Ee.default.resolve(e)!==Ee.default.resolve(p_.default.homedir()),Oz=e=>{if(!B.default.existsSync(e))return 0;let t=B.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?B.default.readdirSync(e).reduce((r,o)=>r+Oz(Ee.default.join(e,o)),0):0},bJ=(e,t,r)=>{let o=ri(e,r);if(o===null||!B.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(Oz(o)>fJ)return{relativePath:r,existed:!0,copyDir:null};let n=Ee.default.join(t,"cache",r);return B.default.mkdirSync(Ee.default.dirname(n),{recursive:!0}),B.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},PJ=400,wJ=32e6,Mz=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!B.default.existsSync(s)))for(let i of B.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=Ee.default.join(s,i),c=B.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>xz)){if(t.length>=PJ||r+c.size>wJ){o=!1;return}r+=c.size,t.push(Ee.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},_J=(e,t,r)=>{let o=ri(e,r);if(o===null||!B.default.existsSync(o))return null;let n=yJ(e,r);if(n===null)return"skip";let s=Ee.default.join(t,"files",r);return B.default.mkdirSync(Ee.default.dirname(s),{recursive:!0}),B.default.writeFileSync(s,n),s},Nz=e=>{let t=B.default.mkdtempSync(Ee.default.join(p_.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?Iz(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:Mz(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,_J(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?d_(e.workingDirectory):null,isolateCaches:AJ(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:hJ.map(i=>bJ(e.workingDirectory,t,i))}},zz=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){sc(e.workingDirectory,t);return}SJ(e.workingDirectory,t,B.default.readFileSync(r))}},vJ=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?zz(e,t):c_(e.workingDirectory,t)?ti(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):sc(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&c_(e.workingDirectory,t)&&ti(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!c_(e.workingDirectory,t)&&ti(e.workingDirectory,["reset","-q","HEAD","--",t])},kJ=(e,t)=>{let r=ri(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){sc(e.workingDirectory,t.relativePath),B.default.mkdirSync(Ee.default.dirname(r),{recursive:!0}),B.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){sc(e.workingDirectory,t.relativePath);return}if(B.default.existsSync(r))for(let o of B.default.readdirSync(r)){let n=Ee.default.join(r,o);B.default.statSync(n).mtimeMs>=e.startedMs-1e3&&B.default.rmSync(n,{recursive:!0,force:!0})}}}},Dz=e=>{try{if(e.git){if(d_(e.workingDirectory)!==e.head&&(!(e.head===null?ti(e.workingDirectory,["update-ref","-d","HEAD"]):ti(e.workingDirectory,["reset","--hard",e.head]))||d_(e.workingDirectory)!==e.head))throw new Error("head");let r=Iz(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))vJ(e,o)}else{if(e.complete)for(let t of Mz(e.workingDirectory).paths)e.files[t]===void 0&&sc(e.workingDirectory,t);for(let t of Object.keys(e.files))zz(e,t)}for(let t of e.caches)kJ(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{B.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var kg,Cg,CJ,TJ,LJ,WJ,EJ,$z,xJ,Hz,Fz=l(()=>{"use strict";E();Pg();i_();Ez();jz();be();Be();Ot();kn();kg=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),Cg=e=>({...e,status:"stopped",errorMessage:pn,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),CJ=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),TJ=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==R?t:e.improverModel!==R?e.improverModel:null}return e.judgeModel!==R?e.judgeModel:e.improverModel!==R?e.improverModel:null},LJ=async e=>{let t=ce(e.cycle),r=Lz({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=Nz({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?zl({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:fn(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):Cl({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=Pz({promptText:e.revision.promptText,isModuleRun:i}),c=rc({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await Ke({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=u.ok?Wz({workingDirectory:t,before:r,writerReply:u.text}):null,S=Dz(o),f={...e.cycle,revisions:e.cycle.revisions.map(y=>y.roundNumber===e.cycle.currentRound?d:y)};return u.ok?!S.ok||m===null?{ok:!1,cycle:kg(f,S.ok?"Could not put the folder back after the run.":S.errorMessage)}:{ok:!0,cycle:f,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Cg(f)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:kg(f,u.errorMessage,Yt(u))})},WJ=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:LJ({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),EJ=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),$z=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Ke({writerAgent:e.reviewer,workingDirectory:ce(e.cycle),prompt:JP({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Cg(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},xJ=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===R)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Ke({writerAgent:t.judgeModel,workingDirectory:ce(t),prompt:gn({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...nc(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?Cg(o):(e.onWriterFailure?.(t.judgeModel),kg(o,n.errorMessage,Yt(n)))},Hz=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return xJ(e);let o=TJ(t),n=await WJ({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?CJ(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===R){let u=await $z({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{...EJ(s,u.text),judgePhase:void 0}}let i=await Ke({writerAgent:t.judgeModel,workingDirectory:ce(t),prompt:mn({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Cg(s):(e.onWriterFailure?.(t.judgeModel),kg(s,i.errorMessage,Yt(i)));let a=await $z({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=nc(s,i.text,c);return wg(d,a.text)}});var Tg,RJ,IJ,m_,Uz=l(()=>{"use strict";E();Pg();Fz();ag();Ot();be();s_();Be();kn();Tg=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),RJ=e=>({...e,status:"stopped",errorMessage:pn,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),IJ=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?RJ(e):(n?.(r),Tg(e,t.errorMessage,Yt(t))),m_=async(e,t,r,o)=>{let n=oc(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return Tg(e,"This round has no prompt.");if(e.status==="judging")return Hz({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return Tg(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===R)return e;let i=_n(e);if(i===null)return Tg(e,"The improver needs the score and the reason.");let a=await Ke({writerAgent:e.improverModel,workingDirectory:ce(e),prompt:lo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:rc()}),c=IJ(e,a,e.improverModel,r,t);return c!==null?c:bg(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var ic,g_,OJ,Gz,Bz,MJ,NJ,Lg,qz,Vz,zJ,DJ,Cn,Kz,Jz,ac=l(()=>{"use strict";E();Ql();ec();be();Be();Ot();kn();Uz();Dw();ic=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),g_=(e,t,r)=>e.wizard===void 0||t===null?ic(e,r):{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t},updatedAt:new Date().toISOString()},OJ=e=>{let t=Yt(e);return SN(e)||t==="usage_limit"||t==="action_required"},Gz=(e,t,r)=>OJ(r)?ic(e,r.errorMessage,Yt(r)):g_(e,t,r.errorMessage),Bz=e=>{let t=e.wizard;return t===void 0||Kl(e).length===0?e:{...e,wizard:Us({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},MJ=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",NJ=e=>{let t=e.wizard;if(t===void 0)return e;let r=Dl({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Us({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},Lg=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),qz=e=>e.judgeModel!==R?e.judgeModel:e.improverModel!==R?e.improverModel:null,Vz=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},zJ=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=qz(e);if(n===null)return ic(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Rt(o),i=Ml({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:Vz(e,"generalize")}),a=await Ke({writerAgent:n,prompt:i,workingDirectory:ce(e),signal:t});if(!a.ok)return r?.(n),Gz(e,"generalize",a);try{let c=yw(a.text),d=Us({wizard:{...o,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Bl(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return $l(d)?Cn({...u,wizard:{...d,gate:null}}):Lg(u,"generalize")}catch(c){return g_(e,"generalize",c instanceof Error?c.message:"Could not read generalization.")}},DJ=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=qz(e);if(n===null)return ic(e,"Choose a writer to suggest splits.");let s=It({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Nl({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:Vz(e,"separate")}),a=await Ke({writerAgent:n,prompt:i,workingDirectory:ce(e),signal:t});if(!a.ok)return r?.(n),Gz(e,"separate",a);try{let c=Sw(a.text),d=aw(c,o.variables),u=Us({wizard:{...o,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:u};return Fl(d)?mo(m,d[0]):Lg(m,"separate")}catch(c){return g_(e,"separate",c instanceof Error?c.message:"Could not read split options.")}},Cn=e=>{let t=e.wizard;if(t===void 0)return e;let r=Rt(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},Kz=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return ic(e,"This module is missing.");let n=_r(r),s=hn(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==R?e.runnerModel:e.judgeModel!==R?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:se(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},Jz=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return m_(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return zJ(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return DJ(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await m_(e,t,r,o);if(W(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Kl(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=ae(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&Hl({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let u=Bz(Lg(a,i));return go(u)}let c=Lg(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=dw({wizard:{...c.wizard,modules:c.wizard.modules.map((m,S)=>S===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:MJ(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?Bz(d):NJ(d)}return s}return n.phase==="complete",e}});var oi,Wg=l(()=>{"use strict";E();be();oi=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:gw(r,e.judgeModel===R),updatedAt:new Date().toISOString()}}});var ni,Eg=l(()=>{"use strict";ni=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var pt,Yz,jJ,Xz=l(()=>{"use strict";E();Be();Eg();Ot();Xw();pt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Yz=e=>{if(!W(e.status))return"";let t=ae(e.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??null,reasons:S.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=ut(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${pt(t.reasons.trim())}</p>`,i=e.status==="passed",a=ni(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${pt(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${pt(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${pt(n)}</div>`:i?jJ({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ce(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${pt(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${pt(t.promptText)}</pre></details>`,m=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${m}</h2>${d}${o}${s}${u}</section>`},jJ=e=>{let t=e.sourceSkill?.fileName??Xl(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=yg(t,r),s=n.length>0&&dz(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${pt(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${pt(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${pt(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${pt(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${pt(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${pt(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var Zz,Qz=l(()=>{"use strict";Zz=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var eD,$J,xg,Je,Rg,f_=l(()=>{"use strict";E();be();Qz();Xm();Ot();Eg();eD=["Generalize","Evaluate","Separate","Optimize modules"],$J=e=>{let t=Et(e),r=t>=0&&t<eD.length?eD[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},xg=(e,t)=>{let r=Vs(e),o=r===null?null:Zz(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Je=(e,t)=>({title:e,detail:t,replyPreview:null}),Rg=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"";return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:null}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!W(e.status)){let t=e.judgeModel;return Je(`${ie(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!W(e.status)){let t=e.judgeModel;return Je(`${ie(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===R?Je(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Je(`${ie(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Je(`${ie(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===R){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==R?Je(`${ie(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Je(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Je(`${ie(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=se(t);return Je(`${ie(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Je(`${ie(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=se(t);return Je(`${ie(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Je(`${ie(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===R){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Je("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Je(`${ie(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>ut(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=te(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||W(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?xg(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=ni(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?xg(e,{title:`${$J(r)}${s}`,detail:t.length>0?t:n}):xg(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(W(e.status)){let t=e.errorMessage?.trim()??"";return xg(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var tr,lc=l(()=>{"use strict";be();tr=e=>{if(e.status==="improving"&&e.improverModel===R)return!0;if(e.status!=="judging"||e.judgeModel!==R)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===R}});var tD,rD=l(()=>{"use strict";tD=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var fo,HJ,oD,nD=l(()=>{"use strict";E();fo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HJ=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${fo(r)}</p>`},oD=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${fo(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${fo(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${fo(a)}.</p>`}<pre class="mono">${fo(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${co(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${fo(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",m=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${fo(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${HJ(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${fo(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var cc,FJ,sD,iD=l(()=>{"use strict";E();Ot();cc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),FJ=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=ut(t.promptText),n=t.judgement?.reasons?`<p class="muted">${cc(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${cc(i)}.</p>`}<pre class="mono">${cc(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${co(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${cc(d)}</pre>`:`<div class="alert-error">${cc(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${u}</article>`},sD=e=>e.revisions.map(t=>FJ(e,t)).join("")});var aD,lD=l(()=>{"use strict";E();aD=e=>{if(W(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var rr,UJ,h_,BJ,GJ,qJ,VJ,cD,dD,y_=l(()=>{"use strict";lD();rr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UJ="Stop this run? Writers will stop and the best prompt is kept.",h_="End the wizard? Writers will stop and progress from finished steps is kept.",BJ="Skip this module and pause at the step gate?",GJ=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${rr(UJ)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${rr(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,qJ=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${rr(h_)}"><input type="hidden" name="cycleId" value="${rr(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,VJ=e=>{let t=rr(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${rr(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${rr(BJ)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${rr(h_)}">End wizard</button>
    </form>
  </div>`},cD=e=>{let t=aD(e);return t==="none"?"":t==="legacy_stop"?GJ(e.id):t==="wizard_end_only"?qJ(e.id):VJ(e)},dD=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=rr(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${rr(h_)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var uD,pD=l(()=>{"use strict";E();Zs();uD=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=te(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${vn(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${vn(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${se(r)}`}return""}});var KJ,JJ,mD,YJ,gD,fD=l(()=>{"use strict";E();pD();Kw();ng();cg();KJ=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',JJ=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',mD=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YJ=(e,t,r)=>{let o=Ys(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=uD(e,t),i=lg(e,t),a=KJ(i),c=JJ(i),d=Xs(e,t,{forOutcomeSummary:!0}),u=`${a}<span class="sdlc-wizard-outcome-step-title">${mD(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${mD(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",S=i==="failed"&&t!=="wizard-4"?" open":"",f=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${f}"${m}${S}><summary aria-controls="${f}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${f}-body">${o}</div></details>`},gD=e=>{let t=e.wizard;if(t===void 0||!W(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>YJ(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var hD,yD,SD=l(()=>{"use strict";hD=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yD=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${hD(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${hD(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var S_,AD,A_=l(()=>{"use strict";S_=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,AD=(e,t)=>{if(S_(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var bD,PD=l(()=>{"use strict";bD=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var Ig,wD,_D=l(()=>{"use strict";E();A_();A_();PD();Ig=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wD=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=te(t),o=se(t),n=r.terminalStatusSuggestion==="passed"?"":bD(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,f=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=u===void 0?c.status:AD(u,o),p=u!==void 0&&S_(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':y==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':y==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':Ig(y);return`<tr${f}><td>${Ig(c.title)}</td><td>${Ig(m)}</td><td>${c.tokens??"\u2014"}</td><td>${p}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${Ig(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var Tn,Og,b_=l(()=>{"use strict";Tn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Og=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Tn(r.fileName)}</code> \u2014 ${Tn(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${Tn(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${Tn(i.name)}</strong> <code>.cursor/skills/${Tn(i.fileName)}/SKILL.md</code></p><p class="muted">${Tn(i.description)}</p><p>${Tn(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var XJ,vD,kD=l(()=>{"use strict";E();SD();_D();b_();XJ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vD=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!W(e.status)||t.modules.length===0)return"";let r=wD(e),o=yD(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=te(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${XJ(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${Og(e)}${a}${r}${o}</section>`}});var q,Mg=l(()=>{"use strict";E();q={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var Ng,P_=l(()=>{"use strict";Ng=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var CD,TD=l(()=>{"use strict";Mg();P_();CD=e=>{let t=Ng({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:q.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var Lr,dc=l(()=>{"use strict";Lr=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var Wr,zg,w_=l(()=>{"use strict";E();ug();Xz();f_();lc();rD();ag();nD();iD();y_();fD();kD();Zs();TD();Be();dc();Wr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zg=e=>{let t=!W(e.status)&&e.status!=="wizard_paused"&&!tr(e),r=Rg(e),o=YN(tw(tD(e)),e),n=W(e.status)?"":cD(e),s=gD(e),i=vD(e),a=Yz(e),c=e.errorMessage===null?"":`<div class="alert-error">${Wr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?te(e.wizard):null,S=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,f=!t&&e.wizard!==void 0&&W(e.status)&&(e.wizard.phase==="complete"||te(e.wizard).passedModuleCount>0),y=f?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",p=f&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Wr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",A=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${Wr(r.replyPreview)}</pre>`,b=r.detail.length===0&&p.length===0&&A.length===0||r.detail.length===0&&A.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Wr(r.detail)}${u}</p>`}${A}</div>`,h=e.revisions.find(vo=>vo.roundNumber===e.currentRound),w=e.status==="improving"?_n(e):null,_=Tr(e),k=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),C=tr(e)?oD({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:w?.promptText??h?.promptText??"",score:w?.score??h?.judgement?.score??null,reasons:w?.reasons??h?.judgement?.reasons??null,avoid:w?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:h?.run??null,minJudgeScore:k?1:0}):"",T=e.wizard!==void 0&&e.wizard.phase==="complete"&&W(e.status),x=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!T&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?se(e.wizard):e.passScore,M=x?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${dg(I)}</div>`:"",U=e.status==="failed"?CD({status:e.status,errorKind:e.errorKind}):null,K=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':W(e.status)?U!==null?`<span class="${U.badgeClass}">${U.badgeLabel}</span>`:T&&m!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",G=t?d:f?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',Ge=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Wr(st(ce(e)))}</li>`:"",_>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${vn(_)} so far</li>`:""].filter(vo=>vo.length>0),$=Ge.length===0?"":`<ul class="sdlc-run-meta">${Ge.join("")}</ul>`,_e=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,Br=T?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,ar=T?"":M.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${Br}</div>`:`<div class="sdlc-run-grid">${Br}${M}</div>`,RC=sD(e),uG=e.wizard!==void 0&&W(e.status)&&e.revisions.every(vo=>vo.roundNumber===0&&(vo.judgement===void 0||vo.judgement===null)),pG=RC.length===0||uG?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${RC}</div></section>`,mG=`<p class="sdlc-run-goal" title="${Wr(e.goal.trim())}">${Wr(Lr(e.goal))}</p>`,gG=T?`${c}${i}${s}${C}${a}`:`${c}${ar}${C}${s}${a}`,fG='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',hG=T?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Wr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${fG}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${K}</div>${mG}<div class="sdlc-run-activity${y}"${f?' role="status"':""}><div class="sdlc-run-activity-icon">${G}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Wr(r.title)}</h2>${b}${p}${hG}</div></div>${$}${_e}</header>${gG}</section>${pG}`}});var LD,WD=l(()=>{"use strict";E();ec();LD=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Hl({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:go(e)}});var ED,xD=l(()=>{"use strict";E();ac();ED=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!$l(t)?e:Cn({...e,wizard:{...t,gate:null}})}});var RD,ID=l(()=>{"use strict";E();Ql();RD=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Fl(t.splitOptions))return e;let r=t.splitOptions[0];return mo(e,r)}});var ZJ,Ln,Dg=l(()=>{"use strict";WD();xD();ID();it();ZJ=e=>{let t=ED(e),r=LD(t);return RD(r)},Ln=(e,t)=>{let r=ZJ(t);return r!==t?(z(e,r),r):t}});var OD,Er,uc=l(()=>{"use strict";E();OD=e=>nt.indexOf(e),Er=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||W(e.status)?nt.length:t.gate!==null?OD(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?OD(t.phase):null}});var MD,ND=l(()=>{"use strict";MD=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Wn,zD,DD=l(()=>{"use strict";E();ND();Wn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zD=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=fn(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Wn(MD(o))}</pre></div>`:"",s=yn(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=_r(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),u=Vm(c),m=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,f=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Wn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Wn(u)}">${Wn(S)}</label>
        ${f}
        <input class="input" type="text" id="${Wn(u)}" name="${Wn(u)}" value="${Wn(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var jD,$D=l(()=>{"use strict";jD={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var pc,QJ,de,ho=l(()=>{"use strict";$D();Ks();pc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),QJ=e=>{let t=jD[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${pc(t.title)}" aria-describedby="${r}" aria-expanded="false">${Xt}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${pc(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${pc(t.example)}</span></span></button>`},de=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${pc(r)}"`}>${pc(e)}</span>${QJ(t)}</span>`});var mt,HD,FD,UD=l(()=>{"use strict";E();Zl();Mg();ho();mt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HD=e=>{let t=e.costControls;if(t===void 0||qs(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??dt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${mt(q.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${mt(t.softWarnMessage??Sn)}</p>`:"",d=Ag({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${mt(q.estimateOverCeilingWarn)}</p>`:"",u=e.wizard?.modules.length??0,m=u>0?`<p class="muted">Step 4 will optimize ${u} module${u===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
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
</section>`},FD=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!qs(r)}});var mc,BD,GD=l(()=>{"use strict";E();zw();DD();Hw();y_();b_();Bw();UD();mc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),BD=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(FD(e))return HD(e);let n=se(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?ON(r):"",a=o==="evaluate"?Og(e):"",c=o==="evaluate"?Js({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(x=>{let I=x.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',M=x.recommended?' <span class="sdlc-badge">Recommended</span>':"",U=r.selectedSplitOptionId===x.id||r.selectedSplitOptionId===null&&x.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${mc(x.id)}" required${U}> <strong>${mc(x.title)}</strong>${I}${M}</label>${rg(e,x)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],f=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=m?.title??"Module",p=m?.prompt??"",A=m?.status==="pending",b=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${mc(y)}</p>${A?zD({cycle:e,modulePrompt:p}):""}<p class="muted">Test run prompt preview: ${mc(hn(p,_r(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${Js({cycle:e,interactive:!1,caption:A?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",h=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":A?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",w=jl(r),_=w===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${w}</p>`,k=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",C=t?.active===!0?" sdlc-wizard-gate-active":"",T=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${k}"`:"";return`<section class="card sdlc-wizard-gate${C}"${T}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${h}</p>
    ${_}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${mc(e.id)}">
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
    ${dD(e)}
  </section>`}});var e7,qD,VD=l(()=>{"use strict";E();cg();e7=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qD=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||W(e.status))return"";let r=(o,n)=>{let s=Xs(e,o);return`<h2 class="sdlc-wizard-active-head">${e7(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var __,KD,JD,yo,YD,si=l(()=>{"use strict";E();it();__=new Map,KD=e=>{let t=new AbortController;return __.set(e,t),t.signal},JD=e=>{__.delete(e)},yo=e=>{__.get(e)?.abort()},YD=(e,t)=>{let r=Y(e,t);return r===null||r.wizard!==void 0?!1:(W(r.status)||(z(e,{...r,status:"stopped",errorMessage:pn,updatedAt:new Date().toISOString()}),yo(t)),!0)}});var XD,ZD,v_,QD,k_=l(()=>{"use strict";E();uc();si();XD="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",ZD=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return nt[r]??null},v_=(e,t)=>{let r=ZD(t);if(r===null||e.wizard===void 0)return!1;let o=nt.indexOf(r);if(o===-1)return!1;let n=Er(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<nt.length)},QD=(e,t)=>{let r=ZD(t);if(r===null||e.wizard===void 0||!v_(e,t))return e;yo(e.id);let o=nt.slice(nt.indexOf(r)),n=Ol(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var C_,ej,tj=l(()=>{"use strict";k_();C_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ej=(e,t)=>v_(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${C_(XD)}"><input type="hidden" name="cycleId" value="${C_(e.id)}"><input type="hidden" name="wizardStepId" value="${C_(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var t7,r7,o7,rj,oj=l(()=>{"use strict";E();uc();GD();VD();tj();ng();t7={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},r7=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),o7=(e,t,r)=>{let o=ej(e,t);return`<details class="sdlc-wizard-accordion-item">
  <summary class="sdlc-wizard-accordion-summary">${r7(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${Ys(e,t)}</div>
</details>`},rj=e=>{let t=e.wizard;if(t===void 0)return"";let r=Er(e);if(r===null)return"";let o=nt.slice(0,r).map((i,a)=>o7(e,`wizard-${a+1}`,t7[i])),n=t.gate!==null?BD(e,{active:!0}):qD(e),s=r>=nt.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var jg,T_=l(()=>{"use strict";oj();Uw();E();jg=e=>{if(e===null||e.wizard!==void 0&&W(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=rj(e),r=jN(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var n7,L_,nj=l(()=>{"use strict";E();be();Be();kn();n7=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},L_=async(e,t,r)=>{if(!n7(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===R)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=uw({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Ke({writerAgent:e.judgeModel,prompt:n,workingDirectory:ce(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=mw(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var gc,$g,sj,W_,ij,aj,lj,Hg,E_=l(()=>{"use strict";gc=g(require("node:fs")),$g=g(require("node:path")),sj=e=>$g.default.join($g.default.dirname(e),"prompt-optimizer-writer-ready.json"),W_=e=>{let t=sj(e);if(!gc.default.existsSync(t))return{};try{let r=JSON.parse(gc.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},ij=(e,t)=>{gc.default.mkdirSync($g.default.dirname(e),{recursive:!0}),gc.default.writeFileSync(sj(e),`${JSON.stringify(t,null,2)}
`)},aj=(e,t)=>W_(e)[t]?.message??null,lj=(e,t,r)=>{ij(e,{...W_(e),[t]:{message:r}})},Hg=(e,t)=>{let r=W_(e);r[t]!==void 0&&ij(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var x_,Fg,Ug,cj,Pe,En=l(()=>{"use strict";E();Zw();ac();nj();lc();si();E_();Dg();it();x_=new Set,Fg={atMs:0,ids:[]},Ug=async()=>{if(Date.now()-Fg.atMs<3e4)return Fg.ids;let e=await Wt({commands:me({})});return Fg.atMs=Date.now(),Fg.ids=e.installedWriterIds,e.installedWriterIds},cj=async(e,t,r)=>{let o=Y(e,t);if(o===null||r.aborted)return;let n=Ln(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(W(n.status)&&!s||n.status==="wizard_paused"||tr(n))return;if(s){let c=await L_(n,r,d=>{Hg(e,d)});z(e,c);return}let i=await Jz(n,c=>{Hg(e,c)},r,c=>{Y(e,t)?.status==="stopped"||r.aborted||z(e,c)});if(!(Y(e,t)?.status==="stopped"||r.aborted)){if(z(e,i),W(i.status)){let c=await L_(i,r,d=>{Hg(e,d)});z(e,c);return}await cj(e,t,r)}},Pe=(e,t)=>{if(x_.has(t))return;let r=Y(e,t);if(r===null)return;let o=Ln(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(W(o.status)&&!n||o.status==="wizard_paused"||tr(o))return;x_.add(t);let s=KD(t);cj(e,t,s).finally(()=>{x_.delete(t),JD(t)})}});var So,fc=l(()=>{"use strict";w_();Dg();T_();En();So=(e,t)=>{let r=Ln(e,t);return Pe(e,r.id),`${zg(r)}${jg(r)}`}});var dj,uj,pj=l(()=>{"use strict";dj=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,uj=e=>e!==null&&e>0});var s7,i7,a7,mj,gj=l(()=>{"use strict";E();ac();Wg();Ql();ec();si();sg();sg();s7=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),i7=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ae(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},a7=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=te(o);return oi({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},mj=(e,t)=>{if(!Yl(e,t))return e;yo(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return Cn({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return go(i7(r));if(t==="wizard-3"){let n=o.splitOptions[0]??s7(o.templatedPrompt);return mo(r,n)}return t==="wizard-4"?a7(r):e}});var Bg,fj,R_=l(()=>{"use strict";E();Wg();si();Bg=e=>(yo(e.id),{...oi(e,"stopped"),errorMessage:DP}),fj=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;yo(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var l7,hj,yj,Sj=l(()=>{"use strict";E();ac();Wg();Ql();ec();fc();it();En();pj();k_();gj();R_();l7="Pick a revision scored above 0 before continuing to Separate.",hj=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),yj=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=Y(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=Y(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(So(e.storePath,d))};if(o==="wizard-stop-all"){let c=Bg(s);return z(e.storePath,c),Pe(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=fj(s);return z(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=QD(s,c);return z(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=mj(s,c);return z(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&Pe(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",m=sw(s.wizard,d,c);m=Ol(m,d),m={...m,pendingStepInstructions:u};let S={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return z(e.storePath,S),Pe(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?hj(s):Cn({...s,wizard:{...s.wizard,gate:null}});return z(e.storePath,m),Pe(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=dj(s,u??-1);if(!uj(m)){let f={...s,errorMessage:l7,updatedAt:new Date().toISOString()};return z(e.storePath,f),a(n),!0}let S=go({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return z(e.storePath,S),Pe(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let f=hj(s);return z(e.storePath,f),Pe(e.storePath,n),a(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(f=>f.id===u);if(m===void 0){let f={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return z(e.storePath,f),a(n),!0}let S=mo(s,m);return z(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,m=d.modules[u];if(m===void 0)return a(n),!0;if(!qs(s.costControls)){let A=t.get("confirmedTokenBudget")?.trim()??"",b=t.get("confirmedMaxSpendUsd")?.trim()??"";if(A.length===0){let w={...s,errorMessage:Bs,updatedAt:new Date().toISOString()};return z(e.storePath,w),a(n),!0}let h=kr({existing:s.costControls,confirmedTokenBudget:Number(A),confirmedMaxSpendUsd:b.length===0?null:Number(b),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!h.ok){let w={...s,errorMessage:h.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,w),a(n),!0}s={...s,costControls:h.costControls,errorMessage:null,updatedAt:new Date().toISOString()},z(e.storePath,s)}let S=vw({wizard:d,modulePrompt:m.prompt,posted:t});if(!S.ok){let A={...s,errorMessage:S.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,A),a(n),!0}let f={...d,parameterValues:S.parameterValues};if(m.status==="pending"){let A=Kz({...s,wizard:{...f,gate:null}},u);return z(e.storePath,A),Pe(e.storePath,n),a(n),!0}let y=u+1;if(y>=d.modules.length){let A=te(f),b=oi({...s,wizard:f},A.terminalStatusSuggestion);return z(e.storePath,b),Pe(e.storePath,n),a(n),!0}let p={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...f,gate:"optimize_modules",currentModuleIndex:y},updatedAt:new Date().toISOString()};return z(e.storePath,p),a(n),!0}}return a(n),!0}});var c7,Aj,d7,I_,u7,bj,Pj=l(()=>{"use strict";be();si();R_();i_();Pg();lc();it();c7="Add a score from 0 to 100 and the reason for it.",Aj="Add a score from 1 to 100 and the reason for it.",d7="Write the next prompt.",I_="This step is not waiting for you.",u7=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},bj=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=Y(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(z(e.storePath,Bg(a)),{kind:"saved",cycleId:i}):YD(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=Y(e.storePath,r);if(o===null||!tr(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:I_};if(t==="manual-judge"){if(o.judgeModel!==R)return{kind:"invalid",cycle:o,errorMessage:I_};let i=u7(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?Aj:c7};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:Aj};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",u=wg(nc(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return z(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==R)return{kind:"invalid",cycle:o,errorMessage:I_};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:d7};let s=bg(o,n);return z(e.storePath,s),{kind:"saved",cycleId:o.id}}});var wj,_j=l(()=>{"use strict";wj=`<script>
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
</script>`});var vj,kj=l(()=>{"use strict";vj=`<script>
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
</script>`});var Cj,Tj=l(()=>{"use strict";Cj=`<script>
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
</script>`});var Lj,Wj=l(()=>{"use strict";E();Be();Lj=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:st(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(se(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!W(t.status)}}});var Ej,xj=l(()=>{"use strict";Ej=`<script>
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
</script>`});var Rj,Ij=l(()=>{"use strict";E();uc();Eg();Rj=e=>{let t=ni(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:W(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=Er(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=te(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=te(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return W(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var Oj,Mj=l(()=>{"use strict";Oj=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var xr,p7,m7,Nj,zj=l(()=>{"use strict";Ij();Mj();dc();xr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p7=e=>e.wizard===void 0?"legacy":"wizard",m7=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${xr(t)}">`,o=Rj(e),n=Oj(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${xr(o.badgeClass)}">${xr(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${xr(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${xr(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${p7(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${xr(e.id)}">${xr(Lr(e.goal))}</a><p class="muted">${xr(a)}</p></div></div><div class="sdlc-history-row-actions">${u}${m}</div></li>`},Nj=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>m7(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${xr(s)}</summary>${i}</details>`:i}});var O_,Gg,Dj,g7,f7,hc,jj,qg=l(()=>{"use strict";O_=g(require("node:fs")),Gg=g(require("node:path"));Be();Dj=/^[a-z0-9-]+$/,g7=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},f7=(e,t)=>{if(!Dj.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let m=g7(u[2]??"");u[1]==="name"&&m.length>0&&(o=m),u[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},hc=e=>{let t=Cr(e);if(!t.ok)return[];let r=Gg.default.resolve(t.path,".cursor","skills"),o=[];try{o=O_.default.readdirSync(r)}catch{return[]}return o.filter(n=>Dj.test(n)).flatMap(n=>{let s=Gg.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${Gg.default.sep}`))return[];try{let i=f7(O_.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},jj=(e,t)=>hc(e).find(r=>r.fileName===t)??null});var $j,h7,Hj,Fj,Uj=l(()=>{"use strict";ho();$j=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),h7=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),Hj=e=>{if(e.length===0)return`<div class="field">${de("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${$j(r.fileName)}">${$j(r.fileName)}</option>`).join("");return`<div class="field">${de("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${h7(e)}</script>`},Fj=`<script>
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
</script>`});var Ye,Bj,Gj=l(()=>{"use strict";E();Mg();Zl();ho();Ye=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bj=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=Ye(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=Gs({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??po(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),m=Ag({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",S=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
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
</div>`}});var je,qj,Vj,y7,Kj,Jj,Yj,Xj=l(()=>{"use strict";E();f_();be();dc();uc();je=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qj=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",Vj=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,y7=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},Kj=e=>e===R?"You":ie(e),Jj=e=>{let t=y7(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ie(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${je(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${je(t)}</dd></div>
      <div><dt>Judge</dt><dd>${je(Kj(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${je(Kj(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${je(r)}</dd></div>
    </dl>
  </details>`},Yj=e=>{let t=e.wizard;if(t===void 0)return"";let r=Lr(e.goal),o=e.status==="wizard_paused",n=!W(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=Rg(e),m=Vj(t),S=m===null?"":qj(m),f=Er(e),y=S.length===0?"":f===null||f>=4?` <strong>${je(S)}</strong>`:` <strong>${je(S)}</strong> (step ${f+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${je(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${je(u.title)}${y}</p>
    <p class="muted">${je(u.detail)}</p>
    <div class="actions">
      ${Jj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${je(e.id)}">Open this run</a>
    </div>
  </section>`}let s=Vj(t),i=s===null?"Wizard":qj(s),a=Er(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${je(r)}</h2>
    <p class="lede">Paused at <strong>${je(i)}</strong>${je(c)} (last updated ${je(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${Jj(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${je(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var yc,Zj,Qj=l(()=>{"use strict";ho();yc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zj=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${yc(n.id)}"${n.id===e.runner?" selected":""}>${yc(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${yc(e.runner)}">Checking ${yc(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${de("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${de("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${yc(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var e$,t$=l(()=>{"use strict";e$=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var ii,r$,o$,n$,s$,i$=l(()=>{"use strict";ho();ii=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),r$=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${ii(c.id)}"${c.id===r?" selected":""}>${ii(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${ii(n)}</option>`;return`<div class="field">${de(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},o$=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${ii(t)}">Checking ${ii(o)}\u2026</p>`},n$=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${de(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${ii(r)}</textarea><span class="muted">${o}</span></div></details>`,s$=e=>{let t=`<div class="sdlc-writer">${r$("judge","Judge",e.judge,e.writers,"I'll score it")}${o$("judge",e.judge,e.writers)}${n$("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${r$("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${o$("improver",e.improver,e.writers)}${n$("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var a$,l$=l(()=>{"use strict";a$=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var M_,c$,d$=l(()=>{"use strict";l$();M_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),c$=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${a$.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${M_(t.goal)}" title="${M_(t.goal)}">${M_(t.label)}</button>`).join("")}</div>`});var Sc,S7,A7,N_,u$=l(()=>{"use strict";E();ho();Sc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),S7=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},A7=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,N_=e=>{let t=S7(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=Ll(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${de(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${Sc(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${Sc(e.inputId)}" class="sdlc-pass-range" type="range" name="${Sc(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${Sc(a)}"><span class="sdlc-pass-mark" style="left:${A7(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${Sc(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var P7,Rr,p$,m$=l(()=>{"use strict";lc();w_();_j();kj();ug();Tj();Wj();xj();zj();qg();Uj();ho();T_();Gj();Xj();dc();Qj();t$();i$();E();d$();u$();P7=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Rr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p$=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Rr(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Rr(e.skillNotice??"")}</div>`,o=`${XN}${ZN}`,n=e.resumableWizardCycle??null,s=n===null?"":Yj(n),i=jg(e.cycle),a=e.cycle===null?"":zg(e.cycle),c=e.cycle!==null&&tr(e.cycle),d=Lj(e),u=P7(d.goal,d.prompt,e.canRun),m=s$({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=Zj({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),f=`${N_({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${N_({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=Bj({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),p=ow,A=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",b=e.cycle!==null&&W(e.cycle.status),h=d.running&&!b,w=b||h?"":" open",_=h?" sdlc-compose-run-focus":"",C=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${b?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,T=b?(()=>{let $=e.cycle!==null?Lr(e.cycle.goal):Lr(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Rr($)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${C}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${C}</summary>`,x=b?" sdlc-compose-viewing-finished":"",I=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",M=c?"waiting":d.running?"running":"idle",U=d.running&&!c?' aria-busy="true"':"",K=`<section class="card sdlc-compose${x}${_}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${w}>
        ${T}
        <div class="sdlc-compose-details-body">
      <p class="lede">${p} ${Rr(e.modelNote)}</p>
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
            <input class="input" type="text" name="folder" value="${Rr(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${Hj(hc(d.folder))}
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
            ${c$()}
            <textarea class="input textarea" name="goal" rows="4" required>${Rr(d.goal)}</textarea>
          </div>
          <div class="field">
            ${de("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Rr(d.prompt)}</textarea>
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
        ${e$()}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${Rr(d.passScore)}; Step 4 pass \u2265 ${Rr(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
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
    </section>`,G=e.history.length>0?Ej:"",Ge=`${""}${wj}${vj}${Cj}${Fj}${G}`;return`${t}${r}${K}${s}${a}${i}${o}${Nj(e.history,e.cycle?.id??null)}${Ge}`}});var Ac,z_=l(()=>{"use strict";m$();Ac=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:p$(t)}))}});var g$,f$=l(()=>{"use strict";Pj();fc();z_();it();En();g$=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:bj({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=Y(e.storePath,o.cycleId);return Pe(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(So(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Ac(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:Qt(e.storePath),resumableWizardCycle:null}),!0)}});var h$,Vg,D_=l(()=>{"use strict";E();h$=g(require("node:os")),Vg=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??h$.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??Jt()}}});var y$,ai,j_,S$,A$,bc=l(()=>{"use strict";E();be();Jw();y$=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,ai=e=>{let t=kN(e),r=bn(e).map(s=>({id:s,label:Zm[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},j_=(e,t,r)=>t===R||t!==null&&e.writers.some(o=>o.id===t)?t:r,S$=(e,t,r,o=null)=>({judge:j_(e,t,e.judge),improver:j_(e,r,e.improver),runner:j_(e,o,e.runner)}),A$=e=>e===pg?{goal:mg,prompt:gg}:{goal:"",prompt:""}});var Kg,b$=l(()=>{"use strict";Kg=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var P$,w7,w$,_$,v$,k$=l(()=>{"use strict";E();P$=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},w7=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},w$=(e,t)=>e.has("earlyStop")?!0:t!=="run",_$=e=>{let t=P$(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=w7(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=P$(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},v$=e=>Jt(e)});var C$,Jg,$_=l(()=>{"use strict";E();be();Be();bc();b$();k$();C$=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=Kg(o);return n.ok?String(n.passScore):String(r)},Jg=e=>{let t=S$(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=C$(e.posted,"passScore",70),o=C$(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",m=e.posted?.get("intent")??"",S=e.posted===null?!0:w$(e.posted,m),f=(T,x)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:T,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:x,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:u,earlyStop:S});if(e.posted===null)return f(e.defaultFolder??Pn,null);let y=e.posted.get("folder")??Pn;if(e.posted.get("intent")==="choose-folder"){let T=e.pickFolder();return f(T===null?y:st(T),null)}if((e.posted.get("intent")??"")!=="run")return f(y,null);let A=y$(e.goal,e.prompt);if(A!==null)return f(y,A);let b=Kg(e.posted.get("passScore")??r);if(!b.ok)return f(y,b.errorMessage);let h=Kg(e.posted.get("modulePassScore")??o);if(!h.ok)return f(y,h.errorMessage);let w=CN(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(w===null)return f(y,"Choose a judge and an improver.");let _=Cr(y);if(!_.ok)return f(y,_.errorMessage);let k=TN(e.installedIds,c,w.judge);if(k===null)return f(y,"Choose a runner for wizard step 4.");let C=_$({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return C.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:w.judge,improver:w.improver,workingDirectory:_.path,passScore:b.passScore,modulePassScore:h.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:k,runnerInstructions:a,costControls:v$(C.knobs)}:f(y,C.errorMessage)}});var li,Xg,_7,H_,T$,Yg,L$,v7,W$,F_,k7,C7,T7,U_,E$,x$,R$=l(()=>{"use strict";li=g(require("node:fs")),Xg=g(require("node:path"));be();Be();_7=["remember","choose-folder","run"],H_=()=>({folder:Pn,judge:"",improver:"",runner:""}),T$=e=>Xg.default.join(Xg.default.dirname(e),"prompt-optimizer-preferences.json"),Yg=e=>typeof e=="string"?e:"",L$=e=>{let t=T$(e);if(!li.default.existsSync(t))return H_();try{let r=JSON.parse(li.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return H_();let o=r,n=Yg(o.folder).trim();return{folder:n.length===0?Pn:n,judge:Yg(o.judge),improver:Yg(o.improver),runner:Yg(o.runner)}}catch{return H_()}},v7=(e,t)=>{let r=T$(e);li.default.mkdirSync(Xg.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;li.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),li.default.renameSync(o,r)},W$=(e,t)=>e===R||bn(t).some(r=>r===e),F_=(e,t,r)=>e===null?t:e.length===0?"":W$(e,r)?e:t,k7=(e,t)=>{if(e===null)return t;let r=Cr(e);return r.ok?r.display:t},C7=e=>{let t=L$(e.storePath),r={folder:k7(e.folder,t.folder),judge:F_(e.judge,t.judge,e.installedIds),improver:F_(e.improver,t.improver,e.installedIds),runner:F_(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||v7(e.storePath,r)},T7=e=>{let t=Cr(e);return t.ok?t.display:Pn},U_=(e,t)=>W$(e,t)?e:"",E$=e=>{let t=L$(e.storePath);return{selection:{...e.selection,judge:U_(t.judge,e.installedIds)||e.selection.judge,improver:U_(t.improver,e.installedIds)||e.selection.improver,runner:U_(t.runner,e.installedIds)||e.selection.runner},defaultFolder:T7(t.folder)}},x$=e=>{let t=e.posted.get("intent")??"";if(!_7.includes(t))return;let r=e.posted.get("folder");C7({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var I$,L7,W7,B_,E7,Zg,Qg=l(()=>{"use strict";I$=g(require("node:os"));be();E_();kn();L7="Reply with the single word ok. Do not use tools.",W7=45e3,B_=async(e,t)=>{if(t===R)return{ok:!0,message:"You will do this step."};let r=aj(e,t);if(r!==null)return{ok:!0,message:r};let o=await Ke({writerAgent:t,prompt:L7,workingDirectory:I$.default.tmpdir(),timeoutMs:W7});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ie(t)} is ready.`;return lj(e,t,n),{ok:!0,message:n}},E7=e=>[...new Set(e.filter(t=>t.length>0))],Zg=async(e,t,r,o)=>{for(let n of E7([t,r,o??""])){let s=await B_(e,n);if(!s.ok)return s.message}return null}});var G_,O$=l(()=>{"use strict";E();G_=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!W(r.status)&&!(t!==null&&r.id===t))return r;return null}});var M$,N$=l(()=>{"use strict";Vt();E();Zl();fc();D_();$_();z_();it();Be();R$();qg();Qg();O$();Dg();En();M$=async e=>{let t=e.posted===null?E$({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=Jg({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>so("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(x$({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?st(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await Zg(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await Ac(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:st(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:Qt(e.route.storePath),resumableWizardCycle:G_(Qt(e.route.storePath),null)});return}if(r.kind==="start"){let s=jj(r.workingDirectory,r.sourceSkillFile),i=Sg(Vl({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=Vg({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:fw({...Il(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(z(e.route.storePath,a),Pe(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(So(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:Y(e.route.storePath,e.cycleId);n!==null&&(n=Ln(e.route.storePath,n),Pe(e.route.storePath,n.id)),await Ac(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:Qt(e.route.storePath),resumableWizardCycle:G_(Qt(e.route.storePath),n?.id??null)})}});var z$,D$=l(()=>{"use strict";it();z$=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";az(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var j$,$$=l(()=>{"use strict";j$=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var H$,F$=l(()=>{"use strict";gz();Sj();f$();N$();D$();bc();$$();En();H$=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await Ug(),o=ai(r),n=e.method==="POST"?j$(e.request.headers["content-type"],await e.readBody(e.request)):null;if(yj({posted:n,storePath:e.storePath,response:e.response})||await g$(e,n,o))return;let s=A$(t.searchParams.get("example")),i=z$({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=mz({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await M$({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:pz(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var x7,U$,B$=l(()=>{"use strict";E();it();x7=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",U$=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=Y(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!W(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=hw({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${x7(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var G$,q$=l(()=>{"use strict";fc();it();G$=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:Y(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":So(e.storePath,o)),!0}});var R7,V$,K$=l(()=>{"use strict";be();Qg();R7=["claude-cli","codex","cursor","antigravity"],V$=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===R||R7.includes(t)?await B_(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var J$,Y$=l(()=>{"use strict";E();J$=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:El,page:xl,context:Hs,installedWriters:e,post:{method:"POST",url:El,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${El}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var ef,X$=l(()=>{"use strict";E();P_();Zs();ef=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ae(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=W(e.status),n=e.errorKind??null,s=Ng({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:Tr(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:Hs,page:`${xl}?cycle=${encodeURIComponent(e.id)}`}}});var F,I7,Z$,Q$,eH=l(()=>{"use strict";F=g(Jn());E();I7=(0,F.isType)({goal:F.isString,prompt:F.isString,workingDirectory:F.isString,judge:(0,F.isUndefinedOr)(F.isString),improver:(0,F.isUndefinedOr)(F.isString),passScore:(0,F.isUndefinedOr)(F.isNumber),maxRounds:(0,F.isUndefinedOr)(F.isNumber),maxTrials:(0,F.isUndefinedOr)(F.isNumber),maxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),earlyStop:(0,F.isUndefinedOr)(F.isBoolean),earlyStopFlatRounds:(0,F.isUndefinedOr)(F.isNumber),confirmedTokenBudget:(0,F.isUndefinedOr)(F.isNumber),confirmedMaxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),rateUsdPer1kTokens:(0,F.isUndefinedOr)(F.isNumber)}),Z$=e=>{let t=e?.trim()??"";return t.length===0?null:t},Q$=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return I7(t)?t.workingDirectory.trim().length===0?{ok:!1,error:$m}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:Z$(t.judge),improver:Z$(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:$m}}});var Ir,O7,tH,rH,oH=l(()=>{"use strict";E();Ir=g(Jn()),O7=(0,Ir.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:Ir.isNumber,confirmedMaxSpendUsd:(0,Ir.isUndefinedOr)(Ir.isNumber),rateUsdPer1kTokens:(0,Ir.isUndefinedOr)(Ir.isNumber)}),tH=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:O7(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},rH=(e,t)=>{let r=kr({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var M7,nH,sH=l(()=>{"use strict";E();be();$_();bc();M7=e=>e.map(t=>t.id).join(", "),nH=e=>{let t=ai(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===R||n===R)return{ok:!1,error:rw,installedWriters:t.writers};if(o===null||n===null){let a=M7(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=Jg({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var N7,iH,aH=l(()=>{"use strict";E();D_();Y$();X$();bc();eH();oH();sH();it();N7=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},iH=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let u=Y(e.storePath,t);return u===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:ef(u)}}let r=await e.handlers.readInstalledIds(),o=ai(r);if(e.method==="GET")return{status:200,body:J$(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let u=tH(e.rawBody);if(u.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(u.kind==="invalid")return{status:400,body:{ok:!1,error:u.error}};let m=Y(e.storePath,t);if(m===null)return{status:404,body:{ok:!1,error:"That run is not on this Mac."}};let S=rH(m,u.body);return S.ok?(z(e.storePath,S.cycle),{status:200,body:ef(S.cycle)}):{status:400,body:{ok:!1,error:S.error}}}let n=N7(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let u=Gs({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:u.targetTokenBudget,proposedTokenBudget:u.targetTokenBudget,estimatedSpendUsd:u.estimatedSpendUsd,rateUsdPer1kTokens:u.rateUsdPer1kTokens??null,proposalStub:u.stub===!0,confirmationRequired:!0}}}let s=Q$(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=nH({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=Vl({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:dt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let u=kr({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!u.ok)return{status:400,body:{ok:!1,error:u.errorMessage}};c=u.costControls}let d=Vg({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:Il(i.prompt),runnerModel:i.runner,costControls:c});return z(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:ef(d)}}});var lH,cH=l(()=>{"use strict";En();Qg();aH();lH=async e=>{let t=await iH({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:Ug,readWritersReady:Zg,startCycle:Pe}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var uH,z7,D7,dH,j7,pH,mH=l(()=>{"use strict";uH=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],z7=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},D7=e=>{let t={};for(let n of e)for(let s of new Set(uH(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},dH=(e,t)=>{let r=z7(uH(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},j7=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},pH=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=D7(e.map(i=>i.text)),s=dH(o,n);return e.map(i=>({id:i.id,score:j7(s,dH(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var q_,$7,H7,gH,F7,U7,B7,G7,V_,K_=l(()=>{"use strict";q_=g(require("node:path"));Be();mH();qg();$7=5,H7=20,gH=280,F7=e=>[e.name,e.description,e.promptText].join(`
`),U7=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=gH?t:`${t.slice(0,gH-3)}...`},B7=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),G7=e=>e===void 0||!Number.isFinite(e)?$7:Math.min(H7,Math.max(1,Math.floor(e))),V_=e=>{let t=e.query.trim(),r=G7(e.limit),o=Cr(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=hc(o.path),s=pH(n.map(d=>({id:d.fileName,text:F7(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=q_.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:q_.default.join(a,u.fileName,"SKILL.md"),excerpt:U7(u),source:"filesystem"}]});return{query:t,hits:c,context:B7(c)}}});var fH,hH=l(()=>{"use strict";K_();fH=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:V_({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var yH,SH=l(()=>{"use strict";hH();yH=async e=>{let t=fH({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var q7,J_,AH=l(()=>{"use strict";tz();F$();B$();q$();K$();cH();SH();q7=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},J_=async e=>{let t=q7(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await lH(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await yH(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:ez()})),!0):(await V$({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||U$({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||G$({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await H$(e),!0)}});var bH=l(()=>{"use strict";AH();K_();kn()});var xn,Pc,V7,K7,J7,Y7,PH,wH=l(()=>{"use strict";xn=g(require("node:fs")),Pc=g(require("node:path")),V7="prompt-optimizer-cycles.json",K7="prompt-optimizer-preferences.json",J7="prompt-sdlc-cycles.json",Y7="prompt-sdlc-preferences.json",PH=e=>{let t=Pc.default.join(e,V7),r=Pc.default.join(e,J7);if(xn.default.existsSync(t)||!xn.default.existsSync(r))return t;try{xn.default.renameSync(r,t)}catch{return r}let o=Pc.default.join(e,Y7),n=Pc.default.join(e,K7);if(xn.default.existsSync(o)&&!xn.default.existsSync(n))try{xn.default.renameSync(o,n)}catch{}return t}});var ci,X7,Y_,_H=l(()=>{"use strict";ci=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),X7=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],Y_=e=>{let t=X7.map(i=>`<option value="${ci(i.value)}">${ci(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${ci(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${ci(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${ci(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${ci(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var wc,CH,Z7,TH,Q7,e9,LH,rf,vH,kH,t9,r9,Or,_c,tf,o9,of,X_,n9,Z_,WH,Q_,EH,s9,i9,a9,xH,RH,IH,vc=l(()=>{"use strict";wc=g(require("node:fs")),CH=g(require("node:path")),Z7="estimate-history.ndjson",TH=100,Q7=500,e9=2e4,LH=e=>CH.default.join(e,Z7),rf=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,Q7),vH=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,e9),kH=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,t9=e=>({...e,estimateTokens:kH(e.estimateTokens),actualTokens:kH(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),r9=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Or=e=>{let t=LH(e);return wc.default.existsSync(t)?wc.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return r9(n)?[t9(n)]:[]}catch{return[]}}):[]},_c=(e,t)=>{wc.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;wc.default.writeFileSync(LH(e),r,"utf8")},tf=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),o9=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${tf(o.task)} | ${tf(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},of=e=>{let t=Or(e.reportsDir),r=rf(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);_c(e.reportsDir,[...s,n])},X_=e=>{let t=Or(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?rf(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);_c(e.reportsDir,[...i,s])},n9=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-TH),Z_=e=>[...Or(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),WH=e=>{let t=Or(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=vH(e.input),n=vH(e.output),s=rf(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);_c(e.reportsDir,[...c,a])},Q_=(e,t)=>{let r=Or(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},EH=e=>({table:o9(n9(Or(e))),embedding:null}),s9=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},i9=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-TH),a9=e=>{let t=s9(i9(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${tf(s.task)} | ${tf(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},xH=e=>{let t=Or(e.reportsDir),r=rf(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);_c(e.reportsDir,[...s,n])},RH=e=>{let t=Or(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);_c(e.reportsDir,[...s,n])},IH=e=>a9(Or(e))});var OH=l(()=>{"use strict";vc()});var Mr,ev,l9,tv,c9,d9,nf,sf,u9,rv,MH=l(()=>{"use strict";OH();qw();Mr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ev=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},l9=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${ev(-r)} under`:`${ev(r)} over`},tv=e=>e.toLocaleString("en-US"),c9=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${tv(-r)} under`:`${tv(r)} over`},d9=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},nf=e=>e===null?"\u2014":ev(e),sf=e=>e===null?"\u2014":tv(e),u9=`(function () {
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
})();`,rv=e=>{let r=Z_(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":l9(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":c9(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${Mr(d9(i))}</button></td>
        <td>${Mr(c)}</td>
        <td>${nf(n.estimateSeconds)}</td>
        <td>${nf(n.actualSeconds)}</td>
        <td>${Mr(d)}</td>
        <td>${sf(n.estimateTokens)}</td>
        <td>${sf(n.actualTokens)}</td>
        <td>${Mr(u)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${Mr(c)}</p>
        <h2>Input</h2>
        <pre>${Mr(i)}</pre>
        <h2>Output</h2>
        <pre>${Mr(a)}</pre>
        <p>Time: estimated ${nf(n.estimateSeconds)} \xB7 actual ${nf(n.actualSeconds)} \xB7 ${Mr(d)}</p>
        <p>Tokens: estimated ${sf(n.estimateTokens)} \xB7 actual ${sf(n.actualTokens)} \xB7 ${Mr(u)}</p>
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
            ${ig({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${u9}</script>`}
    </section>`}});var NH=l(()=>{"use strict";_H();MH()});var di,p9,m9,ov,zH=l(()=>{"use strict";di=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p9=(e,t,r)=>{let o=di(t),n=di(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},m9=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${di(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>p9(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${di(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${di(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${di(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},ov=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(m9).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var DH=l(()=>{"use strict";zH()});var kc,jH,$H,nv,sv,iv,HH=l(()=>{"use strict";kc=g(require("node:fs")),jH=g(require("node:path"));Sl();Cm();$H=(e,t,r)=>Os({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,nv=(e,t,r)=>{let o=$H(e,t,r);if(o===null)return[];if(!kc.default.existsSync(o))return[];let n=kc.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},sv=e=>{let t=$H(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Pr(e.entry.prompt),output:Pr(e.entry.output)};kc.default.mkdirSync(jH.default.dirname(t),{recursive:!0}),kc.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},iv=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var g9,f9,Cc,af,av=l(()=>{"use strict";g9=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),f9=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Cc=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=g9(i.assistantOutput),d=c.length>0?`Assistant: ${f9(c,t)}`:null,u=[a,d].filter(m=>m!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},af=e=>{let t=e.userMessage.trim(),r=Cc({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var or,Tc,dv,h9,y9,lv,S9,uv,lf,FH,UH,A9,ui,pv,cv,BH,b9,GH,pi,cf,Lc,P9,Wc,mv,df,uf,qH=l(()=>{"use strict";or=g(require("node:fs")),Tc=g(require("node:path")),dv=require("node:crypto");av();h9="writer-sessions",y9="active-index.json",lv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),S9=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",uv=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},lf=e=>{let t=Tc.default.join(e.installDir,h9);return or.default.mkdirSync(t,{recursive:!0}),t},FH=e=>Tc.default.join(lf(e),y9),UH=(e,t)=>Tc.default.join(lf(e),`${t}.canonical.json`),A9=(e,t)=>Tc.default.join(lf(e),`${t}.continuation.json`),ui=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,pv=e=>{let t=FH(e);if(!or.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(or.default.readFileSync(t,"utf8"));if(!lv(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!lv(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!S9(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},cv=(e,t)=>{or.default.writeFileSync(FH(e),JSON.stringify(t,null,2))},BH=(e,t)=>{or.default.writeFileSync(UH(e,t.sessionId),JSON.stringify(t,null,2))},b9=(e,t)=>{or.default.writeFileSync(A9(e,t.sessionId),JSON.stringify(t,null,2))},GH=(e,t)=>{let r=Cc({turns:t.turns});b9(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},pi=(e,t)=>{let r=UH(e,t);if(!or.default.existsSync(r))return null;try{let o=JSON.parse(or.default.readFileSync(r,"utf8"));return!lv(o)||typeof o.sessionId!="string"?null:o}catch{return null}},cf=(e,t=20)=>{let r=lf(e),o=or.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=pi(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Lc=(e,t,r)=>{let o=uv(r);return pv(e).entries.find(i=>ui(i)===ui({writerAgent:t,projectFolderPath:o}))?.sessionId??null},P9=(e,t,r,o)=>{let n=pv(e),s=ui({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>ui(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];cv(e,{entries:i})},Wc=(e,t,r)=>{let o=(0,dv.randomUUID)(),n=new Date().toISOString(),s=uv(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return BH(e,i),GH(e,i),P9(e,t,s,o),o},mv=(e,t,r)=>{let o=Lc(e,t,r);return o!==null?o:Wc(e,t,r)},df=(e,t,r)=>{let o=uv(r),n=pv(e);if(o===null&&r===void 0){cv(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=ui({writerAgent:t,projectFolderPath:o});cv(e,{entries:n.entries.filter(i=>ui(i)!==s)})},uf=e=>{let t=mv(e.layout,e.writerAgent,e.projectFolderPath),r=pi(e.layout,t);if(r===null)return;let o={id:(0,dv.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};BH(e.layout,n),GH(e.layout,n)}});var w9,_9,pf,gv,VH=l(()=>{"use strict";w9=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",_9=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},pf=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",gv=e=>{let t=pf(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=w9(r,e.userPromptCharacterCount),n=_9({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var mf=l(()=>{"use strict";HH();qH();av();VH()});var KH=l(()=>{"use strict";op();ps();WS()});var JH=l(()=>{"use strict";oS()});var Xe,k9,C9,fv,hv,yv,YH=l(()=>{"use strict";KH();JH();Xe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),k9=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},C9=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=va(o);return`value="${Xe(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${Xe(r)}"`},fv=(e,t,r,o,n)=>{let s=np[t];return`<label class="field">
          <span class="field-label">${Xe(o)} API key \u2014 ${Xe(k9(e,t))} \xB7 <a class="field-link" href="${Xe(s.href)}" target="_blank" rel="noopener noreferrer">${Xe(s.label)}</a></span>
          <input class="input mono" type="password" name="${Xe(r)}" autocomplete="off" ${C9(e,t,n)} />
        </label>`},hv=(e,t,r,o)=>{let n=Ju(e[t]?.model),s=new Set(Ku[t].map(c=>c.value)),i=Ku[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${Xe(c.value)}"${d}>${Xe(c.label)}</option>`}).join(""),a=n!==qo&&!s.has(n)?`<option value="${Xe(n)}" selected>${Xe(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${Xe(o)}</span>
          <select class="input mono" name="${Xe(r)}">${i}${a}</select>
        </label>`},yv=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Xe(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${fv(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${hv(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${fv(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${hv(e.secrets,"openai","openaiModel","OpenAI model")}
        ${fv(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${hv(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var XH=l(()=>{"use strict";YH()});var gf,ZH,QH=l(()=>{"use strict";gf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ZH=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${gf(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${gf(s.name)}</strong> <span class="muted mono">(${gf(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${gf(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var T9,eF,tF,rF=l(()=>{"use strict";T9=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,eF=e=>e.kind==="folder",tF=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&eF(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if(eF(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(T9)};return r(t)}});var oF,Sv,nF=l(()=>{"use strict";oF=g(require("node:path")),Sv=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Sv(r.children,t)}</ul>
            </details>
          </li>`;let o=oF.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var sF,Ao,L9,W9,Ec,E9,Av,iF=l(()=>{"use strict";xm();sF=g(require("node:path"));QH();rF();nF();Ao=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),L9=()=>`(() => {
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

})();`,W9=()=>`(() => {
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
})();`,Ec=e=>{let t=_l({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=ZH({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Ao(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ao(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':E9(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
    <script>${L9()}</script>
    <script>${W9()}</script>`;return`${t}${r}${o}${c}${d}`},E9=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=tF(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:sF.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),u=Sv(d,Ao),m=a.items.length;return`<div class="harness-set-block">
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
    </form>`},Av=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=a.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??u??a,S=t.sets[i];if(S===void 0)continue;let f=a.length>0?a:S.proposedSlug,y=m.length>0?m:S.proposedName,p=r.has(i),A=S.items.map(b=>({id:b.id,kind:b.kind,title:b.title,sourcePath:b.sourcePath,include:p}));s.push({slug:f,name:y,items:A})}return s}});var aF=l(()=>{"use strict";iF()});var x9,bv,lF=l(()=>{"use strict";Ar();x9=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[Ne]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},bv=x9});var R9,cF,dF=l(()=>{"use strict";Ar();R9=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[Ne]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},cF=R9});var uF=l(()=>{"use strict"});var Rn,I9,Pv,pF=l(()=>{"use strict";xm();zA();Rn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),I9=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,Pv=e=>{let t=e.flashError?`<div class="alert-error">${Rn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Rn(e.flashMessage)}</div>`:"",r=_l({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Rn(I9(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${Rn(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=qp(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
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
    </section>`}});var mF=l(()=>{"use strict";uF();DA();pF()});var ff,gF=l(()=>{"use strict";ff=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var fF,Nt,wv=l(()=>{"use strict";fF=g(require("node:path"));_t();qe();X();ge();TA();Nt=e=>{let t=H()?.layout.installDir??L();if(fF.default.basename(t)===jt)return wt;let r=H(),o=r!==null?ke(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):wt}});var _v,hF=l(()=>{"use strict";Ut();wv();_v=async e=>{let t=Oe(e.installDir),r=t?.bundleVersion??null,o=Nt(t);try{let n=await as(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:jo(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var vv,yF=l(()=>{"use strict";vv=e=>!e});var kv,mi,Cv=l(()=>{"use strict";X();kv=()=>`http://127.0.0.1:${ny()}/update/run`,mi=async e=>{try{let t=await fetch(kv(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var O9,SF,Tv,AF=l(()=>{"use strict";X();ne();Cv();O9=()=>{pr({launchAgentLabel:ve(),installDir:L()})},SF=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Tv=async()=>{O9();let e=await mi({force:!0});if(e.ok)return{ok:!0,message:SF(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:SF(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Ut(),OW)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var Lv=l(()=>{"use strict";EP();gF();wv();hF();yF();AF();Cv()});var bF,PF=l(()=>{"use strict";bF=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var wF,_F,Wv,Ev,vF=l(()=>{"use strict";wF=require("node:crypto"),_F=g(require("node:fs"));Vt();ge();ge();PF();Wv=!1,Ev=async e=>{if(Wv)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!bF(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=H();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&_F.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,wF.randomUUID)();Wv=!0;try{if(await LA(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await gs({...r,workspace:n},e.writerAgent,t);return await Ba(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Wv=!1}}});var kF=l(()=>{"use strict";vF()});var gt,M9,CF,TF,xv,Rv,Iv,Ov,Mv,Nv,zv=l(()=>{"use strict";gt=require("node:crypto"),M9=Buffer.from("302a300506032b6570032100","hex"),CF=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},TF=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,gt.createPublicKey)({key:Buffer.concat([M9,t]),format:"der",type:"spki"})},xv=()=>{let{publicKey:e,privateKey:t}=(0,gt.generateKeyPairSync)("ed25519");return{publicKeyRaw:CF(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Rv=e=>(0,gt.createPrivateKey)(e),Iv=(e,t)=>(0,gt.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),Ov=(e,t,r)=>{try{let o=TF(e);return(0,gt.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},Mv=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,Nv=()=>(0,gt.randomBytes)(32).toString("base64url")});var Nr,hf,LF,N9,z9,yf,Dv,jv,WF=l(()=>{"use strict";Nr=g(require("node:fs")),hf=g(require("node:path"));zv();X();qe();LF=e=>hf.default.join(e.installDir,Gr),N9=(e,t)=>{if(e.profileEmail===null||t===LF(e)||Nr.default.existsSync(t))return;let r=LF(e);Nr.default.existsSync(r)&&(Nr.default.mkdirSync(hf.default.dirname(t),{recursive:!0}),Nr.default.renameSync(r,t))},z9=e=>{if(!Nr.default.existsSync(e))return null;try{let t=Nr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},yf=e=>{let t=wu(e);N9(e,t);let r=z9(t);if(r!==null)return r;let o=xv();return Nr.default.mkdirSync(hf.default.dirname(t),{recursive:!0}),Nr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},Dv=e=>{let t=yf(e.layout),r=Nv(),o=Mv({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=Rv(t.privateKeyPem),s=Iv(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},jv=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return Ov(e.serverPublicKey,t,e.serverAttestation)}});var $v=l(()=>{"use strict";WF();zv()});var IF,xc,Uv,Bv,EF,D9,Hv,Sf,ue,OF,j9,Fv,$9,H9,Gv,fe,xe,nr,F9,xF,RF,Rc,Ic,MF=l(()=>{"use strict";IF=g(require("node:http")),xc=g(require("node:fs")),Uv=g(require("node:path"));Af();fl();jI();HI();VI();ks();nP();LP();wO();vO();bH();wH();NH();DH();mf();XH();aF();Zo();Vt();Ar();lF();dF();mF();Lv();Ut();kF();ge();$v();Bv=e=>qb(e)??"never",EF=48e3,D9=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,Hv=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Rp(),reveal:t.reveal,installed:oo(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Sf=async e=>{let t=H();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:Ps(t,e)},ue=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OF=200,j9=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',Fv=e=>{let t=e.trim().slice(0,OF),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},$9=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ue(t)}</div>`,H9=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ue(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',Gv={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},fe=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...Gv}),e.end(JSON.stringify(r))},xe=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},nr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},F9=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=j9(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${ue(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=vv(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${hl(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ue(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ue(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ue(Bv(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ue(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},xF=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},RF=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,OF)},Rc=e=>{let t=Uv.default.join(e.layout.installDir,"link-code.txt"),r=()=>Oe(e.layout.installDir),o=()=>{let f=r();return{installBundleVersion:ff(f),installBundleUpdatedAt:f?.updatedAt??null,installVersion:f}},n=async f=>{let y=f.installVersion??r(),p=await i(),A=OP(p),b=f.updateFlash??null,h=MP(b),w=$9(b,f.updateError??null);return RP({title:f.title,activePath:f.activePath,body:f.body,cloudAppOrigin:Nt(y),installBundleVersionLabel:ff(y),prependBody:`${h}${w}${A}`,headerUpdateButtonHtml:IP(p)})},s=null,i=async()=>{let f=Date.now();if(s!==null&&f-s.cachedAtMs<6e4)return s.offer;let y=await _v(e.layout);return s={cachedAtMs:f,offer:y},y},a=()=>{s=null},c=!1,d=async f=>{if(a(),!(await i()).updateAvailable){f.writeHead(303,{Location:"/?update=ok"}),f.end();return}if(c){f.writeHead(303,{Location:Fv("An update is already running.")}),f.end();return}c=!0;try{let p=await Tv(),A=p.ok?"/?update=ok":Fv(p.message);f.writeHead(303,{Location:A}),f.end()}catch(p){let A=p instanceof Error&&p.message.trim().length>0?p.message:"Install bundle update failed.";f.writeHead(303,{Location:Fv(A)}),f.end()}finally{c=!1,a()}},u=async(f,y)=>{let p=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",A=o(),b=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:A.installVersion,body:`<section class="card">
      <h1>${ue(y)}</h1>
      <p>${ue(p)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});f.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),f.end(b)},m=()=>{if(xc.default.existsSync(t))return xc.default.readFileSync(t,"utf8").trim();let f=Math.random().toString(36).slice(2,8).toUpperCase();return xc.default.writeFileSync(t,f,"utf8"),f},S=IF.default.createServer((f,y)=>{(async()=>{let p=f.url?.split("?")[0]??"/",A=f.method??"GET";if(A==="OPTIONS"){y.writeHead(204,Gv),y.end();return}if(!await J_({method:A,pathname:p,request:f,response:y,requestUrl:f.url??"/",storePath:PH(Uv.default.dirname(e.layout.configPath)),readBody:nr,sendHtml:xe,renderShell:n})){if(A==="GET"&&p==="/health"){let b=e.controllers.getStatus(),h=o();fe(y,200,{ok:!0,...b,installBundleVersion:h.installBundleVersion,installBundleUpdatedAt:h.installBundleUpdatedAt});return}if(A==="GET"&&p==="/api/status"){let b=o();fe(y,200,{...e.controllers.getStatus(),linkCode:m(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt});return}if(A==="GET"&&p==="/api/traffic"){fe(y,200,{entries:ml(e.layout)});return}if(A==="DELETE"&&p==="/api/traffic"||A==="POST"&&p==="/api/traffic/clear"){if(Jb(e.layout),A==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}fe(y,200,{ok:!0});return}if(A==="GET"&&p==="/api/trace"){fe(y,200,{entries:wm(e.layout)});return}if(A==="DELETE"&&p==="/api/trace"||A==="POST"&&p==="/api/trace/clear"){if(Zb(e.layout),A==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}fe(y,200,{ok:!0});return}if(A==="POST"&&p==="/api/errors/clear"){Qb(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(A==="GET"&&p==="/api/knowledge"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(h.length>0){let w=await Ns({layout:e.layout,query:h,limit:20});fe(y,200,{chunks:w,query:h});return}fe(y,200,{chunks:Ms(e.layout).slice(-50).reverse()});return}if(A==="POST"&&p==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(A==="GET"&&p==="/api/update-status"){let b=await i();fe(y,200,{ok:!0,...b});return}if((A==="GET"||A==="POST")&&p==="/api/update"){await d(y);return}if(A==="GET"&&p==="/"){let b=e.controllers.getStatus(),h=o(),w=oo(e.layout),_=_m(e.layout.errorLogPath);xe(y,await n({title:"Home",activePath:"/",installVersion:h.installVersion,updateFlash:xF(f.url??void 0),updateError:RF(f.url??void 0),body:NP({wsConnected:b.wsConnected,lastHeartbeatAt:b.lastHeartbeatAt,installBundleVersion:h.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:Ms(e.layout).length,trafficEntryCount:ml(e.layout).length,wakeError:b.wakeError,errorLogByteSize:_.byteSize,errorLogExists:_.exists})}));return}if(A==="GET"&&p==="/task"){let b=e.controllers.getStatus(),h=o(),w=H(),_=new URL(f.url??"/",`http://127.0.0.1:${43347}`),k=_.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,C=_.searchParams.get("failed")==="1"?_.searchParams.get("error")?.trim()??"Task failed.":null,T=_.searchParams.get("runId");xe(y,await n({title:"Task",activePath:"/task",installVersion:h.installVersion,body:Y_({defaultWorkspace:w?.workspace??"",wsConnected:b.wsConnected,flashMessage:k,flashError:C,lastRunId:T})}));return}if(A==="POST"&&p==="/task/dispatch"){let b=await nr(f),h=new URLSearchParams(b),w=h.get("prompt")?.trim()??"",_=h.get("writerAgent")?.trim()??"claude-cli",k=h.get("projectFolder")?.trim()??"",C=await Ev({prompt:w,writerAgent:_,...k.length>0?{projectFolderPath:k}:{}}),T=new URLSearchParams;C.ok?T.set("ok","1"):(T.set("failed","1"),C.errorMessage!==void 0&&T.set("error",C.errorMessage.slice(0,240))),C.agentRunId!==void 0&&T.set("runId",C.agentRunId),y.writeHead(303,{Location:`/task?${T.toString()}`}),y.end();return}if(A==="GET"&&p==="/writer-sessions"){let b=o(),h=cf(e.layout,12);xe(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:b.installVersion,updateFlash:xF(f.url??void 0),updateError:RF(f.url??void 0),body:ov({sessions:h})}));return}if(A==="GET"&&p==="/errors"){let b=o(),h=_m(e.layout.errorLogPath);xe(y,await n({title:"Errors",activePath:"/errors",installVersion:b.installVersion,body:tP({errorLogPath:e.layout.errorLogPath,content:h.content,exists:h.exists,truncated:h.truncated,byteSize:h.byteSize,cleared:new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(A==="GET"&&p==="/status"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=e.controllers.getStatus(),w=Le(e.layout),_=w!==null?He(w,12e4):sP(h.lastHeartbeatAt,12e4),k=iP({lastHeartbeatAt:h.lastHeartbeatAt,heartbeatIsStale:_}),C=o();xe(y,await n({title:"Status",activePath:"/status",installVersion:C.installVersion,body:`${F9({status:h,healthBadge:k,revived:b.searchParams.get("revived")==="1",linkCode:m(),installBundleVersion:C.installBundleVersion,installBundleUpdatedAt:C.installBundleUpdatedAt})}${cP({installDir:e.layout.installDir})}${lP({entries:wm(e.layout)})}`}));return}if(A==="GET"&&p==="/traffic"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=ml(e.layout),w=o(),_=h.map(T=>`<tr><td title="${ue(T.at)}">${ue(Bv(T.at))}</td><td>${ue(T.direction)}</td><td><code>${ue(T.type)}</code></td><td>${ue(T.summary)}</td><td>${ue(T.action??"")}</td></tr>`).join(""),k=h.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${_}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',C=b.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";xe(y,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${C}
              ${k}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(A==="GET"&&p==="/projects"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=o(),w=Nt(h.installVersion),_=await Sf(e.layout),k=b.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":b.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,C=b.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,T=H(),x=T===null?null:Z({wsUrl:T.wsUrl,pairingToken:T.pairingToken}),I=x===null?{}:Object.fromEntries((await Promise.all(_.projects.map(async M=>{let U=await bv(x,M.id);return[M.id,U?.counts??null]}))).filter(M=>M[1]!==null));xe(y,await n({title:"Projects",activePath:"/projects",installVersion:h.installVersion,body:Pv({projects:_.projects,compositionCountsByProjectId:I,cloudAppOrigin:w,syncMessage:_.message,syncOk:_.ok,flashMessage:C,flashError:k})}));return}if(A==="GET"&&p==="/projects/select-folder"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=H(),_=w===null?null:Z({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),k=h.length>0&&_!==null?so():null;if(k===null||_===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(rt({projectFolderPath:k}),!await Ka(_,h,k)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(h)}&folderUpdated=1`}),y.end();return}if(A==="POST"&&p==="/projects/delete"){let b=await nr(f),h=new URLSearchParams(b).get("projectId")?.trim()??"",w=H(),_=w===null?null:Z({wsUrl:w.wsUrl,pairingToken:w.pairingToken});if(_===null||h.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let k=await VA(_,h);y.writeHead(303,{Location:k.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(A==="GET"&&p==="/project"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=b.searchParams.get("id")?.trim()??"",w=o(),_=Nt(w.installVersion),k=await Sf(e.layout),C=rn(k.projects,h);if(C===null){await u(y,"Project not found");return}let T=b.searchParams.get("linked")==="1"?b.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${b.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${b.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:b.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,x=b.searchParams.get("knowledgePromoted"),I=x!==null?`Marked ${x} lesson(s) as promoted in Agent Witch.`:null,M=b.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,U=b.searchParams.get("tab")?.trim()??"harness",K=U==="workflows"||U==="agents"||U==="knowledge"?U:"harness",G=H(),Ge=G===null?null:Z({wsUrl:G.wsUrl,pairingToken:G.pairingToken}),$=Ge===null?null:await bv(Ge,C.id),_e=0;if(Ge!==null)try{let Br=await fetch(`${Ge.appOrigin}/api/agent-witch/projects/${encodeURIComponent(C.id)}/knowledge`,{method:"GET",headers:{[Ne]:Ge.pairingToken},signal:AbortSignal.timeout(1e4)});if(Br.ok){let ar=await Br.json();typeof ar=="object"&&ar!==null&&typeof ar.candidateCount=="number"&&(_e=ar.candidateCount)}}catch{_e=0}xe(y,await n({title:C.name,activePath:"/projects",installVersion:w.installVersion,body:ws({project:C,cloudAppOrigin:_,installed:oo(e.layout),linkedSetSlugs:to(C.projectFolderPath),composition:$,knowledgeCandidateCount:_e,activeTab:K,flashMessage:T??I,flashError:M})}));return}if(A==="POST"&&p==="/projects/pull-bound-harness"){let b=await nr(f),h=await jA({rawBody:b,layout:e.layout});if(h.kind==="not_found"){await u(y,"Project not found");return}if(h.kind==="redirect"){y.writeHead(303,{Location:h.location}),y.end();return}let w=o();xe(y,await n({title:h.title,activePath:"/projects",installVersion:w.installVersion,body:h.body}));return}if(A==="POST"&&p==="/projects/link-harness"){let b=await nr(f),h=new URLSearchParams(b),w=h.get("projectId")?.trim()??"",_=await Sf(e.layout),k=rn(_.projects,w);if(k===null){await u(y,"Project not found");return}let C=h.getAll("applySet").map(K=>String(K)),T=Ma({layout:e.layout,projectFolderPath:k.projectFolderPath,setSlugs:C});if(!T.ok){let K=o(),G=Nt(K.installVersion);xe(y,await n({title:k.name,activePath:"/projects",installVersion:K.installVersion,body:ws({project:k,cloudAppOrigin:G,installed:oo(e.layout),linkedSetSlugs:to(k.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:T.errorMessage})}));return}let x=H(),I=x===null?null:Z({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),M=I===null?!1:await qa(I,k.id,T.appliedSetSlugs),U=new URLSearchParams({linked:"1",files:String(T.writtenFileCount),bindingsSynced:M?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(k.id)}&${U.toString()}`}),y.end();return}if(A==="POST"&&p==="/project/knowledge/promote-all"){let b=await nr(f),w=new URLSearchParams(b).get("projectId")?.trim()??"",_=await Sf(e.layout),k=rn(_.projects,w);if(k===null){await u(y,"Project not found");return}let C=H(),T=C===null?null:Z({wsUrl:C.wsUrl,pairingToken:C.pairingToken}),x=T===null?{ok:!1,promotedCount:0}:await cF(T,k.id),I=new URLSearchParams({tab:"knowledge",...x.ok?{knowledgePromoted:String(x.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(k.id)}&${I.toString()}`}),y.end();return}if(A==="GET"&&p==="/harness"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=o(),w=ja(e.layout),_=b.searchParams.get("submitted")==="1",k=_?b.searchParams.get("syncFailed")==="1"?`Local harness updated (${b.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:b.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${b.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":b.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:b.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,C=w?.scanRoots[0]??Rp(),T=D9(e.layout,{reveal:w,importQuery:b.searchParams.get("import")==="1",justSubmitted:_}),x=Nt(h.installVersion);xe(y,await n({title:"Harness",activePath:"/harness",installVersion:h.installVersion,body:Ec(Hv(e.layout,{cloudAppOrigin:x,reveal:w,scanFolder:C,flashMessage:k,importSectionExpanded:T}))}));return}if(A==="POST"&&p==="/api/harness/pick-folder"){let b=so();if(b===null){fe(y,200,{cancelled:!0});return}fe(y,200,{path:b});return}if(A==="GET"&&p==="/api/harness/file-content"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=Oa(h);if(w===null){fe(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let _=xc.default.readFileSync(w,"utf8"),k=_.length>EF?`${_.slice(0,EF)}
\u2026 (truncated)`:_;fe(y,200,{content:k})}catch{fe(y,500,{errorMessage:"Could not read file."})}return}if(A==="POST"&&p==="/api/harness/reveal/add-project"){let b=await nr(f),h="";try{let k=JSON.parse(b);typeof k=="object"&&k!==null&&typeof k.projectPath=="string"&&(h=k.projectPath.trim())}catch{fe(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(h.length===0){fe(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=ja(e.layout),_=yA({reveal:w,projectPath:h});if(_===null||_.sets.length===0){fe(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Np(e.layout,_),fe(y,200,{ok:!0,setCount:_.sets.length});return}if(A==="GET"&&p==="/api/harness/reveal/stream"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(h.length===0){fe(y,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;f.on("close",()=>{w=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...Gv});let _=SA({scanRoot:h,response:y,shouldAbort:()=>w});Np(e.layout,_),y.end();return}if(A==="POST"&&p==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(A==="POST"&&p==="/harness/submit"){let b=ja(e.layout);if(b===null){let x=o(),I=Nt(x.installVersion);xe(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Ec(Hv(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let h=await nr(f),w=new URLSearchParams(h),_=Av(w,b),k=bA({layout:e.layout,sets:_});if(!k.ok){let x=o(),I=Nt(x.installVersion);xe(y,await n({title:"Harness",activePath:"/harness",installVersion:x.installVersion,body:Ec(Hv(e.layout,{cloudAppOrigin:I,reveal:b,flashError:k.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}wA(e.layout);let T=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${k.writtenItemCount??0}${T}`}),y.end();return}if(A==="GET"&&p==="/writer-api"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),w=H()?.writerExecutionBackend??Me(void 0),_=Ce(e.layout.configPath),k=Xr(_),C=b.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,T=o();xe(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:T.installVersion,body:yv({writerExecutionBackend:w,secrets:k,flashMessage:C})}));return}if(A==="POST"&&p==="/writer-api"){let b=await nr(f),h=new URLSearchParams(b),w=h.get("writerExecutionBackend")?.trim()??"cli";LS({configPath:e.layout.configPath,writerExecutionBackend:Me(w),anthropicApiKey:h.get("anthropicApiKey")??void 0,anthropicModel:h.get("anthropicModel")??void 0,openaiApiKey:h.get("openaiApiKey")??void 0,openaiModel:h.get("openaiModel")??void 0,googleApiKey:h.get("googleApiKey")??void 0,googleModel:h.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(A==="GET"&&p==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(A==="GET"&&p==="/history"){let b=o();xe(y,await n({title:"History",activePath:"/history",installVersion:b.installVersion,body:rv({reportsDir:e.layout.reportsDir})}));return}if(A==="GET"&&p==="/knowledge"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),_=hP({layout:e.layout}),k=AP(_),C=h.length>0?await Ns({layout:e.layout,query:h,limit:20}):Ms(e.layout).slice(-50).reverse(),T=C.map(I=>{let M=SP(_,I.id),U=M>0?` \xB7 used in ${M} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ue(I.createdAt)}">${ue(Bv(I.createdAt))}${I.source?` \xB7 ${ue(I.source)}`:""}${U}</div><pre>${ue(I.text)}</pre></article>`}).join(""),x=k.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${k.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ue(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";xe(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ue(h)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${x}${T}${H9(h,C.length)}`}));return}A==="POST"&&await nr(f),await u(y,"Not found")}})().catch(p=>{console.error("[agent-witch-local-app]",p),y.writeHead(500),y.end("Internal error")})});return S.on("error",f=>{if(f.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",f)}),S.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${gr}`)}),S},Ic=e=>yf(e).publicKeyRaw});var Af=l(()=>{"use strict";_I();vI();MF()});var zF={};Dt(zF,{runAgentWitchExternalLiveCli:()=>B9});var qv,NF,U9,B9,DF=l(()=>{"use strict";qv=g(require("node:fs")),NF=g(require("node:path"));ks();X();ne();Af();ne();U9=e=>{let t=NF.default.join(e,"link-code.txt");if(!qv.default.existsSync(t))return null;let r=qv.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},B9=()=>{Qe("agent-witch-live");let e=L(),t=N(),r=U9(e),o=Ic(t);Rc({layout:t,controllers:{getStatus:()=>{let n=Le(t);return{wsConnected:ol(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{Oo(e)}}})}});var zr=v((vIe,HF)=>{"use strict";var jF=["nodebuffer","arraybuffer","fragments"],$F=typeof Blob<"u";$F&&jF.push("blob");HF.exports={BINARY_TYPES:jF,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:$F,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Oc=v((kIe,bf)=>{"use strict";var{EMPTY_BUFFER:G9}=zr(),Vv=Buffer[Symbol.species];function q9(e,t){if(e.length===0)return G9;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new Vv(r.buffer,r.byteOffset,o):r}function FF(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function UF(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function V9(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Kv(e){if(Kv.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Vv(e):ArrayBuffer.isView(e)?t=new Vv(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Kv.readOnly=!1),t}bf.exports={concat:q9,mask:FF,toArrayBuffer:V9,toBuffer:Kv,unmask:UF};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");bf.exports.mask=function(t,r,o,n,s){s<48?FF(t,r,o,n,s):e.mask(t,r,o,n,s)},bf.exports.unmask=function(t,r){t.length<32?UF(t,r):e.unmask(t,r)}}catch{}});var qF=v((CIe,GF)=>{"use strict";var BF=Symbol("kDone"),Jv=Symbol("kRun"),Yv=class{constructor(t){this[BF]=()=>{this.pending--,this[Jv]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Jv]()}[Jv](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[BF])}}};GF.exports=Yv});var hi=v((TIe,YF)=>{"use strict";var Mc=require("zlib"),VF=Oc(),K9=qF(),{kStatusCode:KF}=zr(),J9=Buffer[Symbol.species],Y9=Buffer.from([0,0,255,255]),wf=Symbol("permessage-deflate"),Dr=Symbol("total-length"),gi=Symbol("callback"),bo=Symbol("buffers"),fi=Symbol("error"),Pf,Xv=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Pf){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Pf=new K9(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[gi];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){Pf.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){Pf.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Mc.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Mc.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[wf]=this,this._inflate[Dr]=0,this._inflate[bo]=[],this._inflate.on("error",Z9),this._inflate.on("data",JF)}this._inflate[gi]=o,this._inflate.write(t),r&&this._inflate.write(Y9),this._inflate.flush(()=>{let s=this._inflate[fi];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=VF.concat(this._inflate[bo],this._inflate[Dr]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Dr]=0,this._inflate[bo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Mc.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Mc.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Dr]=0,this._deflate[bo]=[],this._deflate.on("data",X9)}this._deflate[gi]=o,this._deflate.write(t),this._deflate.flush(Mc.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=VF.concat(this._deflate[bo],this._deflate[Dr]);r&&(s=new J9(s.buffer,s.byteOffset,s.length-4)),this._deflate[gi]=null,this._deflate[Dr]=0,this._deflate[bo]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};YF.exports=Xv;function X9(e){this[bo].push(e),this[Dr]+=e.length}function JF(e){if(this[Dr]+=e.length,this[wf]._maxPayload<1||this[Dr]<=this[wf]._maxPayload){this[bo].push(e);return}this[fi]=new RangeError("Max payload size exceeded"),this[fi].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[fi][KF]=1009,this.removeListener("data",JF),this.reset()}function Z9(e){if(this[wf]._inflate=null,this[fi]){this[gi](this[fi]);return}e[KF]=1007,this[gi](e)}});var yi=v((LIe,_f)=>{"use strict";var{isUtf8:XF}=require("buffer"),{hasBlob:Q9}=zr(),eY=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function tY(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Zv(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function rY(e){return Q9&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}_f.exports={isBlob:rY,isValidStatusCode:tY,isValidUTF8:Zv,tokenChars:eY};if(XF)_f.exports.isValidUTF8=function(e){return e.length<24?Zv(e):XF(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");_f.exports.isValidUTF8=function(t){return t.length<32?Zv(t):e(t)}}catch{}});var ok=v((WIe,n1)=>{"use strict";var{Writable:oY}=require("stream"),ZF=hi(),{BINARY_TYPES:nY,EMPTY_BUFFER:QF,kStatusCode:sY,kWebSocket:iY}=zr(),{concat:Qv,toArrayBuffer:aY,unmask:lY}=Oc(),{isValidStatusCode:cY,isValidUTF8:e1}=yi(),vf=Buffer[Symbol.species],ft=0,t1=1,r1=2,o1=3,ek=4,tk=5,kf=6,rk=class extends oY{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||nY[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[iY]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=ft}_write(t,r,o){if(this._opcode===8&&this._state==ft)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new vf(o.buffer,o.byteOffset+t,o.length-t),new vf(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new vf(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case ft:this.getInfo(t);break;case t1:this.getPayloadLength16(t);break;case r1:this.getPayloadLength64(t);break;case o1:this.getMask();break;case ek:this.getData(t);break;case tk:case kf:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[ZF.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=t1:this._payloadLength===127?this._state=r1:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=o1:this._state=ek}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=ek}getData(t){let r=QF;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&lY(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=tk,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[ZF.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===ft&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=ft;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=Qv(o,r):this._binaryType==="arraybuffer"?n=aY(Qv(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=ft):(this._state=kf,setImmediate(()=>{this.emit("message",n,!0),this._state=ft,this.startLoop(t)}))}else{let n=Qv(o,r);if(!this._skipUTF8Validation&&!e1(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===tk||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=ft):(this._state=kf,setImmediate(()=>{this.emit("message",n,!1),this._state=ft,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,QF),this.end();else{let o=t.readUInt16BE(0);if(!cY(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new vf(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!e1(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=ft;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=ft):(this._state=kf,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=ft,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[sY]=n,i}};n1.exports=rk});var ik=v((xIe,a1)=>{"use strict";var{Duplex:EIe}=require("stream"),{randomFillSync:dY}=require("crypto"),{types:{isUint8Array:uY}}=require("util"),s1=hi(),{EMPTY_BUFFER:pY,kWebSocket:mY,NOOP:gY}=zr(),{isBlob:Si,isValidStatusCode:fY}=yi(),{mask:i1,toBuffer:In}=Oc(),ht=Symbol("kByteLength"),hY=Buffer.alloc(4),Cf=8*1024,On,Ai=Cf,zt=0,yY=1,SY=2,nk=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=zt,this.onerror=gY,this[mY]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||hY,r.generateMask?r.generateMask(o):(Ai===Cf&&(On===void 0&&(On=Buffer.alloc(Cf)),dY(On,0,Cf),Ai=0),o[0]=On[Ai++],o[1]=On[Ai++],o[2]=On[Ai++],o[3]=On[Ai++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[ht]!==void 0?a=r[ht]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(i1(t,o,d,s,a),[d]):(i1(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=pY;else{if(typeof t!="number"||!fY(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(uY(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[ht]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==zt?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Si(t)?(n=t.size,s=!1):(t=In(t),n=t.length,s=In.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[ht]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Si(t)?this._state!==zt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==zt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Si(t)?(n=t.size,s=!1):(t=In(t),n=t.length,s=In.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[ht]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Si(t)?this._state!==zt?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==zt?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[s1.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Si(t)?(a=t.size,c=!1):(t=In(t),a=t.length,c=In.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[ht]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Si(t)?this._state!==zt?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==zt?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[ht],this._state=SY,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(sk,this,a,n);return}this._bufferedBytes-=o[ht];let i=In(s);r?this.dispatch(i,r,o,n):(this._state=zt,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(AY,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[s1.extensionName];this._bufferedBytes+=o[ht],this._state=yY,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");sk(this,c,n);return}this._bufferedBytes-=o[ht],this._state=zt,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===zt&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][ht],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][ht],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};a1.exports=nk;function sk(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function AY(e,t,r){sk(e,t,r),e.onerror(t)}});var h1=v((RIe,f1)=>{"use strict";var{kForOnEventAttribute:Nc,kListener:ak}=zr(),l1=Symbol("kCode"),c1=Symbol("kData"),d1=Symbol("kError"),u1=Symbol("kMessage"),p1=Symbol("kReason"),bi=Symbol("kTarget"),m1=Symbol("kType"),g1=Symbol("kWasClean"),jr=class{constructor(t){this[bi]=null,this[m1]=t}get target(){return this[bi]}get type(){return this[m1]}};Object.defineProperty(jr.prototype,"target",{enumerable:!0});Object.defineProperty(jr.prototype,"type",{enumerable:!0});var Mn=class extends jr{constructor(t,r={}){super(t),this[l1]=r.code===void 0?0:r.code,this[p1]=r.reason===void 0?"":r.reason,this[g1]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[l1]}get reason(){return this[p1]}get wasClean(){return this[g1]}};Object.defineProperty(Mn.prototype,"code",{enumerable:!0});Object.defineProperty(Mn.prototype,"reason",{enumerable:!0});Object.defineProperty(Mn.prototype,"wasClean",{enumerable:!0});var Pi=class extends jr{constructor(t,r={}){super(t),this[d1]=r.error===void 0?null:r.error,this[u1]=r.message===void 0?"":r.message}get error(){return this[d1]}get message(){return this[u1]}};Object.defineProperty(Pi.prototype,"error",{enumerable:!0});Object.defineProperty(Pi.prototype,"message",{enumerable:!0});var zc=class extends jr{constructor(t,r={}){super(t),this[c1]=r.data===void 0?null:r.data}get data(){return this[c1]}};Object.defineProperty(zc.prototype,"data",{enumerable:!0});var bY={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[Nc]&&n[ak]===t&&!n[Nc])return;let o;if(e==="message")o=function(s,i){let a=new zc("message",{data:i?s:s.toString()});a[bi]=this,Tf(t,this,a)};else if(e==="close")o=function(s,i){let a=new Mn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[bi]=this,Tf(t,this,a)};else if(e==="error")o=function(s){let i=new Pi("error",{error:s,message:s.message});i[bi]=this,Tf(t,this,i)};else if(e==="open")o=function(){let s=new jr("open");s[bi]=this,Tf(t,this,s)};else return;o[Nc]=!!r[Nc],o[ak]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[ak]===t&&!r[Nc]){this.removeListener(e,r);break}}};f1.exports={CloseEvent:Mn,ErrorEvent:Pi,Event:jr,EventTarget:bY,MessageEvent:zc};function Tf(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Lf=v((IIe,y1)=>{"use strict";var{tokenChars:Dc}=yi();function sr(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function PY(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,u=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(u===-1&&Dc[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let f=e.slice(c,u);d===44?(sr(t,f,r),r=Object.create(null)):i=f,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(u===-1&&Dc[d]===1)c===-1&&(c=m);else if(d===32||d===9)u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m),sr(r,e.slice(c,u),!0),d===44&&(sr(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)a=e.slice(c,m),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(Dc[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(Dc[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,u=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(u===-1&&Dc[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))u===-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let f=e.slice(c,u);o&&(f=f.replace(/\\/g,""),o=!1),sr(r,a,f),d===44&&(sr(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=m);let S=e.slice(c,u);return i===void 0?sr(t,S,r):(a===void 0?sr(r,S,!0):o?sr(r,a,S.replace(/\\/g,"")):sr(r,a,S),sr(t,i,r)),t}function wY(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}y1.exports={format:wY,parse:PY}});var Rf=v((NIe,W1)=>{"use strict";var _Y=require("events"),vY=require("https"),kY=require("http"),b1=require("net"),CY=require("tls"),{randomBytes:TY,createHash:LY}=require("crypto"),{Duplex:OIe,Readable:MIe}=require("stream"),{URL:lk}=require("url"),Po=hi(),WY=ok(),EY=ik(),{isBlob:xY}=yi(),{BINARY_TYPES:S1,CLOSE_TIMEOUT:RY,EMPTY_BUFFER:Wf,GUID:IY,kForOnEventAttribute:ck,kListener:OY,kStatusCode:MY,kWebSocket:we,NOOP:P1}=zr(),{EventTarget:{addEventListener:NY,removeEventListener:zY}}=h1(),{format:DY,parse:jY}=Lf(),{toBuffer:$Y}=Oc(),w1=Symbol("kAborted"),dk=[8,13],$r=["CONNECTING","OPEN","CLOSING","CLOSED"],HY=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,Q=class e extends _Y{constructor(t,r,o){super(),this._binaryType=S1[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Wf,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),_1(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){S1.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new WY({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new EY(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[we]=this,s[we]=this,t[we]=this,n.on("conclude",BY),n.on("drain",GY),n.on("error",qY),n.on("message",VY),n.on("ping",KY),n.on("pong",JY),s.onerror=YY,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",C1),t.on("data",xf),t.on("end",T1),t.on("error",L1),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Po.extensionName]&&this._extensions[Po.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){at(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,k1(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){uk(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Wf,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){uk(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Wf,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){uk(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Po.extensionName]||(n.compress=!1),this._sender.send(t||Wf,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){at(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(Q,"CONNECTING",{enumerable:!0,value:$r.indexOf("CONNECTING")});Object.defineProperty(Q.prototype,"CONNECTING",{enumerable:!0,value:$r.indexOf("CONNECTING")});Object.defineProperty(Q,"OPEN",{enumerable:!0,value:$r.indexOf("OPEN")});Object.defineProperty(Q.prototype,"OPEN",{enumerable:!0,value:$r.indexOf("OPEN")});Object.defineProperty(Q,"CLOSING",{enumerable:!0,value:$r.indexOf("CLOSING")});Object.defineProperty(Q.prototype,"CLOSING",{enumerable:!0,value:$r.indexOf("CLOSING")});Object.defineProperty(Q,"CLOSED",{enumerable:!0,value:$r.indexOf("CLOSED")});Object.defineProperty(Q.prototype,"CLOSED",{enumerable:!0,value:$r.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(Q.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(Q.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[ck])return t[OY];return null},set(t){for(let r of this.listeners(e))if(r[ck]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[ck]:!0})}})});Q.prototype.addEventListener=NY;Q.prototype.removeEventListener=zY;W1.exports=Q;function _1(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:RY,protocolVersion:dk[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!dk.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${dk.join(", ")})`);let s;if(t instanceof lk)s=t;else try{s=new lk(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let p=new SyntaxError(c);if(e._redirects===0)throw p;Ef(e,p);return}let d=i?443:80,u=TY(16).toString("base64"),m=i?vY.request:kY.request,S=new Set,f;if(n.createConnection=n.createConnection||(i?UY:FY),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(f=new Po({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=DY({[Po.extensionName]:f.offer()})),r.length){for(let p of r){if(typeof p!="string"||!HY.test(p)||S.has(p))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(p)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let p=n.path.split(":");n.socketPath=p[0],n.path=p[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let p=o&&o.headers;if(o={...o,headers:{}},p)for(let[A,b]of Object.entries(p))o.headers[A.toLowerCase()]=b}else if(e.listenerCount("redirect")===0){let p=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!p||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,p||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=m(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=m(n);n.timeout&&y.on("timeout",()=>{at(e,y,"Opening handshake has timed out")}),y.on("error",p=>{y===null||y[w1]||(y=e._req=null,Ef(e,p))}),y.on("response",p=>{let A=p.headers.location,b=p.statusCode;if(A&&n.followRedirects&&b>=300&&b<400){if(++e._redirects>n.maxRedirects){at(e,y,"Maximum redirects exceeded");return}y.abort();let h;try{h=new lk(A,t)}catch{let _=new SyntaxError(`Invalid URL: ${A}`);Ef(e,_);return}_1(e,h,r,o)}else e.emit("unexpected-response",y,p)||at(e,y,`Unexpected server response: ${p.statusCode}`)}),y.on("upgrade",(p,A,b)=>{if(e.emit("upgrade",p),e.readyState!==Q.CONNECTING)return;y=e._req=null;let h=p.headers.upgrade;if(h===void 0||h.toLowerCase()!=="websocket"){at(e,A,"Invalid Upgrade header");return}let w=LY("sha1").update(u+IY).digest("base64");if(p.headers["sec-websocket-accept"]!==w){at(e,A,"Invalid Sec-WebSocket-Accept header");return}let _=p.headers["sec-websocket-protocol"],k;if(_!==void 0?S.size?S.has(_)||(k="Server sent an invalid subprotocol"):k="Server sent a subprotocol but none was requested":S.size&&(k="Server sent no subprotocol"),k){at(e,A,k);return}_&&(e._protocol=_);let C=p.headers["sec-websocket-extensions"];if(C!==void 0){if(!f){at(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let T;try{T=jY(C)}catch{at(e,A,"Invalid Sec-WebSocket-Extensions header");return}let x=Object.keys(T);if(x.length!==1||x[0]!==Po.extensionName){at(e,A,"Server indicated an extension that was not requested");return}try{f.accept(T[Po.extensionName])}catch{at(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Po.extensionName]=f}e.setSocket(A,b,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Ef(e,t){e._readyState=Q.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function FY(e){return e.path=e.socketPath,b1.connect(e)}function UY(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=b1.isIP(e.host)?"":e.host),CY.connect(e)}function at(e,t,r){e._readyState=Q.CLOSING;let o=new Error(r);Error.captureStackTrace(o,at),t.setHeader?(t[w1]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Ef,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function uk(e,t,r){if(t){let o=xY(t)?t.size:$Y(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${$r[e.readyState]})`);process.nextTick(r,o)}}function BY(e,t){let r=this[we];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[we]!==void 0&&(r._socket.removeListener("data",xf),process.nextTick(v1,r._socket),e===1005?r.close():r.close(e,t))}function GY(){let e=this[we];e.isPaused||e._socket.resume()}function qY(e){let t=this[we];t._socket[we]!==void 0&&(t._socket.removeListener("data",xf),process.nextTick(v1,t._socket),t.close(e[MY])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function A1(){this[we].emitClose()}function VY(e,t){this[we].emit("message",e,t)}function KY(e){let t=this[we];t._autoPong&&t.pong(e,!this._isServer,P1),t.emit("ping",e)}function JY(e){this[we].emit("pong",e)}function v1(e){e.resume()}function YY(e){let t=this[we];t.readyState!==Q.CLOSED&&(t.readyState===Q.OPEN&&(t._readyState=Q.CLOSING,k1(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function k1(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function C1(){let e=this[we];if(this.removeListener("close",C1),this.removeListener("data",xf),this.removeListener("end",T1),e._readyState=Q.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[we]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",A1),e._receiver.on("finish",A1))}function xf(e){this[we]._receiver.write(e)||this.pause()}function T1(){let e=this[we];e._readyState=Q.CLOSING,e._receiver.end(),this.end()}function L1(){let e=this[we];this.removeListener("error",L1),this.on("error",P1),e&&(e._readyState=Q.CLOSING,this.destroy())}});var I1=v((DIe,R1)=>{"use strict";var zIe=Rf(),{Duplex:XY}=require("stream");function E1(e){e.emit("close")}function ZY(){!this.destroyed&&this._writableState.finished&&this.destroy()}function x1(e){this.removeListener("error",x1),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function QY(e,t){let r=!0,o=new XY({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(E1,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(E1,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",ZY),o.on("error",x1),o}R1.exports=QY});var pk=v((jIe,O1)=>{"use strict";var{tokenChars:eX}=yi();function tX(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&eX[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}O1.exports={parse:tX}});var H1=v((HIe,$1)=>{"use strict";var rX=require("events"),If=require("http"),{Duplex:$Ie}=require("stream"),{createHash:oX}=require("crypto"),M1=Lf(),Nn=hi(),nX=pk(),sX=Rf(),{CLOSE_TIMEOUT:iX,GUID:aX,kWebSocket:lX}=zr(),cX=/^[+/0-9A-Za-z]{22}==$/,N1=0,z1=1,j1=2,mk=class extends rX{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:iX,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:sX,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=If.createServer((o,n)=>{let s=If.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=dX(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=N1}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===j1){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(jc,this);return}if(t&&this.once("close",t),this._state!==z1)if(this._state=z1,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(jc,this):process.nextTick(jc,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{jc(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",D1);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){zn(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){zn(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!cX.test(s)){zn(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){zn(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){$c(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=nX.parse(c)}catch{zn(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&u!==void 0){let S=new Nn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let f=M1.parse(u);f[Nn.extensionName]&&(S.accept(f[Nn.extensionName]),m[Nn.extensionName]=S)}catch{zn(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(f,y,p,A)=>{if(!f)return $c(r,y||401,p,A);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return $c(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[lX])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>N1)return $c(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${oX("sha1").update(r+aX).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),u._protocol=m)}if(t[Nn.extensionName]){let m=t[Nn.extensionName].params,S=M1.format({[Nn.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${S}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",D1),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(jc,this)})),a(u,n)}};$1.exports=mk;function dX(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function jc(e){e._state=j1,e.emit("close")}function D1(){this.destroy()}function $c(e,t,r,o){r=r||If.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${If.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function zn(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,zn),e.emit("wsClientError",i,r,t)}else $c(r,o,n,s)}});var uX,pX,mX,gX,fX,hX,F1,yX,Hc,U1=l(()=>{uX=g(I1(),1),pX=g(Lf(),1),mX=g(hi(),1),gX=g(ok(),1),fX=g(ik(),1),hX=g(pk(),1),F1=g(Rf(),1),yX=g(H1(),1),Hc=F1.default});var gk,fk,hk=l(()=>{"use strict";gk="AGENT_WITCH_EXTERNAL_BRIDGE",fk="AGENT_WITCH_EXTERNAL_LIVE"});var yk,B1=l(()=>{"use strict";yk=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var SX,Sk,G1=l(()=>{"use strict";hk();B1();SX=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",Sk=(e={})=>{let t=e.env??process.env,r=yk(t[gk]),o=yk(t[fk]);return{mode:SX(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var q1=l(()=>{"use strict";hk()});var V1=l(()=>{"use strict";G1();q1()});var Ak=l(()=>{"use strict"});var Hr,Fc=l(()=>{"use strict";Hr=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var wi,Dn,K1,bX,bk,Pk,J1,Y1,wk,X1,Uc,_k=l(()=>{"use strict";wi=g(require("node:fs")),Dn=g(require("node:os")),K1=g(require("node:path"));Ak();Fc();bX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bk=(e=Dn.default.hostname())=>K1.default.join(Dn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),Pk=e=>{if(!wi.default.existsSync(e))return null;try{let t=JSON.parse(wi.default.readFileSync(e,"utf8"));return!bX(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},J1=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},Y1=(e,t)=>{wi.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},wk=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??bk(),o=Pk(r);if(o!==null&&o.pid!==process.pid&&Hr(o.pid)&&J1(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Dn.default.hostname(),macOsUsername:Dn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return Y1(r,n),{ok:!0}},X1=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??bk(),o=Pk(r);return o!==null&&o.pid!==process.pid&&Hr(o.pid)&&J1(o)?{ok:!1}:(Y1(r,{hostname:Dn.default.hostname(),macOsUsername:Dn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},Uc=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??bk();Pk(r)?.pid===process.pid&&wi.default.existsSync(r)&&wi.default.unlinkSync(r)}});var vk,Bc,PX,wX,_X,vX,kk,Z1=l(()=>{"use strict";vk=require("node:child_process"),Bc=g(require("node:path"));Fc();xu();PX=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),wX=(e,t)=>{if(PX(e)||!/\bnode\b/.test(e))return!1;let r=Bc.default.resolve(t),o=Bc.default.join(r,"app",Ki),n=Bc.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Ki||i==="agent-witch.ts")return e.includes(r);try{let a=Bc.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},_X=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,vk.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},vX=(e,t,r)=>{let o=_X(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||wX(d,t)&&n.push(c)}return n},kk=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,vk.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=vX(r,e.installDir,t),n=[];for(let s of o)if(Hr(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var Gc,qc,Q1,kX,Ck,eU=l(()=>{"use strict";Gc=g(require("node:fs")),qc=g(require("node:path"));Ie();Q1=(e,t)=>{!Gc.default.existsSync(e)||Gc.default.existsSync(t)||(Gc.default.mkdirSync(qc.default.dirname(t),{recursive:!0}),Gc.default.renameSync(e,t))},kX=e=>{if(e.profileEmail===null)return;let t=qc.default.join(e.installDir,St);Q1(qc.default.join(t,Bn),e.mainLogPath),Q1(qc.default.join(t,Gn),e.errorLogPath)},Ck=e=>{let t=N();e!==void 0&&t.installDir!==e||kX(t)}});var tU=l(()=>{"use strict";dl();bm();bm();!et()&&Do(__agentWitchImportMetaUrl)&&(async()=>{Qe("agent-witch-wake-server");let e=await an(),t=mr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var rU=l(()=>{"use strict";tU()});var oU=l(()=>{"use strict";Ya()});var Tk,nU=l(()=>{"use strict";Ak();rU();_k();oU();Tk=async(e={})=>{let t=e.skipInProcessBridge?null:await Am();Zp();let r=setInterval(()=>{Zp()},6e4),o=setInterval(()=>{if(!X1().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Vc,Of,LX,sU,iU,Mf,aU,lU,Lk,cU,Nf,dU=l(()=>{"use strict";Vc=g(require("node:fs")),Of=g(require("node:path")),LX="pending-run-inputs.json",sU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),iU=e=>{let t=e.profileEmail?Of.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Of.default.join(t,LX)},Mf=e=>{let t=iU(e);if(!Vc.default.existsSync(t))return{};try{let r=JSON.parse(Vc.default.readFileSync(t,"utf8"));return sU(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!sU(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},aU=(e,t)=>{let r=iU(e);Vc.default.mkdirSync(Of.default.dirname(r),{recursive:!0}),Vc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},lU=e=>Object.values(Mf(e)),Lk=(e,t)=>Mf(e)[t]!==void 0,cU=(e,t)=>{let r=Mf(e);r[t.agentRunId]=t,aU(e,r)},Nf=(e,t)=>{let r=Mf(e);delete r[t],aU(e,r)}});var zf=l(()=>{"use strict";ge()});var uU=l(()=>{"use strict";ge()});var Df=l(()=>{"use strict";ge()});var jf=l(()=>{"use strict";ge()});var Kc=l(()=>{"use strict";ge()});var WX,EX,Jc,Wk=l(()=>{"use strict";kt();zf();uU();Df();jf();Kc();WX={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},EX={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Jc=e=>{if(!pe(e.writerAgent))return"the selected writer";let t=tt(e.writerAgent);if(Me(e.writerExecutionBackend)==="api"&&t!==null){let r=Ve(Ce(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=ha(t,r.model);return`${EX[t]} model ${o}`}}return WX[e.writerAgent]}});var xX,RX,pU,mU,gU=l(()=>{"use strict";xX=/"input_tokens"\s*:\s*(\d+)/,RX=/"output_tokens"\s*:\s*(\d+)/,pU=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},mU=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=pU(xX.exec(t)),o=pU(RX.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var $f=l(()=>{"use strict";Vt()});var Yc,Hf,IX,Ek,fU,hU,yU,xk,SU=l(()=>{"use strict";Yc=g(require("node:fs")),Hf=g(require("node:path"));$f();IX="run-completion-outbox.json",Ek=e=>{let t=e.profileEmail?Hf.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Hf.default.join(t,IX)},fU=e=>{let t=Ek(e);if(!Yc.default.existsSync(t))return[];try{let r=JSON.parse(Yc.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},hU=(e,t)=>{Yc.default.mkdirSync(Hf.default.dirname(Ek(e)),{recursive:!0}),Yc.default.writeFileSync(Ek(e),JSON.stringify(t,null,2),"utf8")},yU=(e,t)=>{let r=[...fU(e).filter(o=>o.runId!==t.runId),t];hU(e,r)},xk=async e=>{if(e.cloudApi===null)return;let t=fU(e.layout);if(t.length===0)return;let r=[];for(let o of t)await Ba(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);hU(e.layout,r)}});var AU=l(()=>{"use strict"});var Rk,Xc,MX,jn,bU=l(()=>{"use strict";AU();Rk=new Map,Xc=e=>{let t=Rk.get(e);t!==void 0&&(clearInterval(t),Rk.delete(e))},MX=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},jn=(e,t,r,o={})=>{Xc(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Xc(t);return}let i=o.onTick?.()??{};MX(e,t,n,i)};s(),Rk.set(t,setInterval(s,15e3))}});var PU=l(()=>{"use strict";Vt()});var wU,_U=l(()=>{"use strict";PU();wU=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:lt(t)}});var Ik,Zc,Fr,Ok,ir,vU,Ff=l(()=>{"use strict";Ik=new Set,Zc=new Map,Fr=(e,t)=>{if(t.length===0)return;let r=Zc.get(e)??[];r.push(t),Zc.set(e,r)},Ok=e=>{Ik.add(e);let t=Zc.get(e)??[];return Zc.delete(e),t},ir=e=>Ik.has(e),vU=e=>{Ik.delete(e),Zc.delete(e)}});var _i,kU,CU,TU=l(()=>{"use strict";_i=g(require("node:path")),kU=require("node:url");zo();CU=()=>{if(et()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?_i.default.dirname(_i.default.resolve(e)):_i.default.dirname(_i.default.resolve(__filename))}return _i.default.dirname((0,kU.fileURLToPath)(__agentWitchImportMetaUrl))}});var LU,WU,EU,xU,Ze,vi,RU,IU,ki,Mk,Nk,zk,OU,Dk,MU,Uf=l(()=>{"use strict";LU=require("node:crypto"),WU=g(require("node:fs")),EU=g(require("node:path")),xU=require("node:url");Fc();zo();TU();Ze=new Map,RU=async()=>{if(vi!==void 0)return vi;try{if(et()){let e=CU(),t=EU.default.join(e,"deps","node-pty","lib","index.js");if(WU.default.existsSync(t)){let r=await import((0,xU.pathToFileURL)(t).href);return vi=r,r}}return vi=await import("node-pty"),vi}catch{return vi=null,null}},IU=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},ki=(e,t,r)=>{let o=Ze.get(e);if(o!==void 0){Ze.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},Mk=(e,t)=>{let r=Ze.get(e);return r===void 0?!1:(r.pty.write(t),!0)},Nk=(e,t,r)=>{let o=Ze.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},zk=e=>{for(let t of Ze.values())if(!(t.mode!=="agent"||t.runId!==e))return Hr(t.pty.pid);return!1},OU=e=>{for(let[t,r]of Ze.entries())if(!(r.mode!=="agent"||r.runId!==e)){Ze.delete(t);try{r.pty.kill()}catch{}return!0}return!1},Dk=async e=>{let t=await RU();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;Ze.get(e.shellSessionId)!==void 0&&ki(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Ze.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{IU(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{Ze.get(e.shellSessionId)?.pty===n&&(Ze.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},MU=async e=>{let t=e.shellSessionId??(0,LU.randomUUID)(),r=await RU();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return Ze.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{IU(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{Ze.get(t)?.pty===o&&(Ze.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var Bf,NU,zU=l(()=>{"use strict";Bf="[[AWAITING_INPUT]]",NU=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Bf,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Qc,DU,Gf=l(()=>{"use strict";zU();Qc=e=>{let t=e.indexOf(Bf);if(t<0)return null;let o=e.slice(t+Bf.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},DU=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",NU].join(`
`)});var jU,$U=l(()=>{"use strict";Ff();Uf();Gf();jU=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(ir(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Fr(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await MU({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Qc(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var HU,FU,UU,Ur,qf=l(()=>{"use strict";HU=require("node:child_process"),FU=g(require("node:fs")),UU=g(require("node:path"));xu();Ur=(e,t)=>{let r=UU.default.join(e,"app",tW,"ensure-writer.sh");return FU.default.existsSync(r)?new Promise((o,n)=>{let s=(0,HU.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var BU,$n,td,Vf,jk,ed,Kf,Jf,$k,Hk,NX,Ci,zX,DX,Fk,Uk=l(()=>{"use strict";BU=require("node:child_process");kt();qf();Df();zf();Kc();jf();$n=new Map,td=e=>e==="cursor"||e==="antigravity",Vf=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",jk=e=>$n.get(e)?.warmed===!0,ed=e=>{let t=$n.get(e);$n.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Kf=e=>$n.get(e)?.conversationStarted===!0,Jf=e=>{let t=$n.get(e);$n.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},$k=e=>{$n.delete(e)},Hk=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",NX={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Ci=e=>`${NX[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,zX=(e,t,r,o)=>new Promise(n=>{let s=qu(t,r),i=[],a=(0,BU.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),DX=(e,t)=>{let r=Ci(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},Fk=async e=>{if(!pe(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Me(e.runConfig.writerExecutionBackend)==="api"){let r=tt(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Ce(e.runConfig.layout.configPath);return Ve(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),ed(e.writerAgent),{exitCode:0,output:Ci(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Ur(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}td(e.writerAgent)&&ed(e.writerAgent);let t=await zX(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?DX(e.writerAgent,t.output):Ci(e.writerAgent)}}});var Hn,Bk=l(()=>{"use strict";Hn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var GU,jX,$X,qU,HX,Gk,VU=l(()=>{"use strict";Bk();GU=/you(?:'|')ve hit your session limit/i,jX=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],$X=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,qU=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},HX=e=>{let t=$X.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},Gk=e=>{let t=e.trim();if(t.length===0)return null;if(GU.test(t))return{code:Hn.SESSION_LIMIT,resetHint:HX(t),matchedLine:qU(t,GU)};for(let r of jX)if(r.test(t))return{code:Hn.PROVIDER_QUOTA,resetHint:null,matchedLine:qU(t,r)};return null}});var Yf,Xf,qk,Vk=l(()=>{"use strict";Yf="[[AGENT_RUN_WRITER_EXECUTION]]",Xf="cli-writer-api-key-missing",qk="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var Kk=l(()=>{"use strict";Vk()});var KU=l(()=>{"use strict";Kk()});var Zf=l(()=>{"use strict";Bk();VU();Vk();Kk();KU()});var Qf,JU=l(()=>{"use strict";Qf={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var YU,XU=l(()=>{"use strict";YU="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var ZU,QU=l(()=>{"use strict";Zf();XU();ZU=e=>e.code===Hn.SESSION_LIMIT?YU:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var eB,tB=l(()=>{"use strict";Zf();JU();QU();eB=e=>{let t=Gk(e.output);return t!==null?{status:Qf.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:ZU(t)}:{status:e.exitCode===0?Qf.COMPLETED:Qf.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var Jk,JMe,rB=l(()=>{"use strict";Jk={OPEN:"open",APPROVAL:"approval"},JMe=Jk.APPROVAL});var Ti,eh,oB,BX,nB,sB,iB,rd,Yk,Xk=l(()=>{"use strict";Ti=g(require("node:fs")),eh=g(require("node:path")),oB="runs",BX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nB=e=>{let t=e.profileEmail!==null?eh.default.join(e.installDir,"profiles",e.profileEmail,oB):eh.default.join(e.installDir,oB);return Ti.default.mkdirSync(t,{recursive:!0}),t},sB=(e,t)=>eh.default.join(nB(e),`${t}.json`),iB=(e,t)=>{Ti.default.writeFileSync(sB(e,t.id),JSON.stringify(t,null,2))},rd=(e,t)=>{let r=sB(e,t);if(!Ti.default.existsSync(r))return null;try{let o=JSON.parse(Ti.default.readFileSync(r,"utf8"));return!BX(o)||typeof o.id!="string"?null:o}catch{return null}},Yk=e=>{let t=nB(e),r=Ti.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=rd(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var GX,aB,lB=l(()=>{"use strict";tB();rB();Xk();GX=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=eB({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:Jk.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},aB=(e,t)=>{let r=GX(t);return iB(e,r),r}});var cB=l(()=>{"use strict";mf()});var dB,uB=l(()=>{"use strict";Zf();dB=()=>[Yf,`agentRunWriterExecutionBackend=${Xf}`,`agentRunWriterExecutionReasonCode=${qk}`].join(`
`)});var wo,th=l(()=>{"use strict";wo=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Zk,qX,VX,pB,mB=l(()=>{"use strict";Zk=e=>e.toLocaleString("en-US"),qX=e=>e<.01?e.toFixed(4):e.toFixed(3),VX=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${qX(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Zk(e.inputTokens)} in / ${Zk(e.outputTokens)} out (${Zk(e.totalTokens)} total)`,t].join(`
`)},pB=(e,t)=>{if(t===void 0)return e;let r=VX(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var gB=l(()=>{"use strict";ge()});var hB,od,he,Qk,rh,fB,KX,JX,yB,SB,AB,nd,eC,tC,rC,bB,YX,yt,sd,_o,PB,XX,ZX,oh,oC,nC,sC,wB=l(()=>{"use strict";hB=require("node:child_process");ge();kt();dU();vc();Wk();gU();fa();SU();$f();bU();Fc();_U();Ff();Uf();Gf();$U();Uk();lB();cB();uB();th();mB();ns();gB();Kc();Qi();Gf();od=new Map,he=new Map,Qk=new Set,rh=new Map,fB=e=>{e!==void 0&&!rh.has(e)&&rh.set(e,Date.now())},KX=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(ir(t)){yt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}Fr(t,n)},JX=(e,t,r,o,n)=>{if(!ES(e,n))return;let s=`${dB()}
`;KX(t,r,o,s);let i=he.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},yB=130,SB=`

Stopped by user.`,AB=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:wo(e)},nd=null,eC=e=>{nd=e},tC=(e,t)=>{if(nd===null)return;let r=Q_(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||WA(nd,t,r)},rC=async e=>{await xk({layout:e,cloudApi:nd})},bB=e=>{let t=od.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Hr(t.pid)},YX=e=>me({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),yt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},sd=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Qn(s),c=he.get(r);if(a!==null&&c!==void 0){let d=uW(a),u=bB(r)||zk(r);d!==null&&!u&&_o(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return dW(a)}}),_o=(e,t,r,o,n,s,i,a)=>{let c=ds(s,a),d=n,u=pB(c.output,c.llmUsage);if(r!==void 0){let S=rh.get(r);rh.delete(r),S!==void 0&&X_({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let f=mU(c.llmUsage,u);f!==null&&RH({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:f})}r!==void 0&&Qk.has(r)&&(Qk.delete(r),d=yB,u=u.trim().length>0&&!u.includes("Stopped by user.")?`${u.trim()}${SB}`:"Stopped by user.");let m=r!==void 0?Q_(e.layout.reportsDir,r):null;if(r!==void 0){Xc(r),_a(e.layout,r),ir(r)&&(yt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),vU(r));let S=he.get(r);WH({reportsDir:e.layout.reportsDir,agentRunId:r,input:wo(i),output:u,...S!==void 0?{writerLabel:Jc({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&uf({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:u,agentRunId:r}),aB(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:u,layout:e.layout}),yU(e.layout,{runId:r,exitCode:d,output:u,createdAt:new Date().toISOString(),...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{}}),xk({layout:e.layout,cloudApi:nd}),he.delete(r),od.delete(r),Nf(e.layout,r)}yt(t,{type:"command.claude.result",payload:{exitCode:d,output:u,...r!==void 0?{agentRunId:r}:{},...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),la(e.layout)},PB=(e,t,r,o,n,s,i)=>{let a=he.get(r),c=a?.accumulatedOutput??s;cU(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),jn(t,r,()=>Lk(e.layout,r),sd(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),yt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},XX=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,u=f=>{if(!(n===void 0||f.length===0)){if(ir(n)){yt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:f},requestId:o});return}Fr(n,f)}};if(n!==void 0){let f=he.get(n);od.set(n,t),he.set(n,{originalPrompt:s,userTranscriptPrompt:f?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:f?.projectFolderPath,reportKey:f?.reportKey,accumulatedOutput:f?.accumulatedOutput??""}),yt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),jn(r,n,()=>bB(n),sd(e,r,n,o,f?.projectFolderPath,f?.reportKey))}let m=a==="claude-cli",S=[];t.stdout?.on("data",f=>{let y=f.toString("utf8");if(m?S.push(y):(c.push(y),u(y)),d||n===void 0)return;let p=Qc(c.join(""));if(p!==null){d=!0,t.kill("SIGTERM");let A=he.get(n),b=[A?.accumulatedOutput??"",p.partialOutput].filter(h=>h.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=b),od.delete(n),PB(e,r,n,o,p.question,b,s)}}),t.stderr?.on("data",f=>{let y=f.toString("utf8");c.push(y),u(y)}),t.on("close",f=>{if(d)return;Jf(a);let y=n!==void 0?he.get(n):void 0,p=m?ds(S.join("")):{output:c.join("").trim(),llmUsage:void 0},A=m?c.join("").trim():"",b=[p.output.trim(),A].filter(w=>w.length>0).join(`
`);m&&p.output.trim().length>0&&u(p.output);let h=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${b}`.trim():b;_o(e,r,n,o,f??-1,h,s,p.llmUsage)}),t.on("error",f=>{d||_o(e,r,n,o,-1,f.message,s)})},ZX=(e,t,r,o,n,s,i,a,c)=>{let d=AB(r,c);s!==void 0&&(he.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),yt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),jn(n,s,()=>he.has(s),sd(e,n,s,o,i,a))),Aa(e,t,r,m=>{if(!(s===void 0||m.length===0)){if(ir(s)){yt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:m},requestId:o});return}Fr(s,m)}}).then(m=>{Jf(t),_o(e,n,s,o,m.exitCode,m.output,r,m.llmUsage)}).catch(m=>{let S=m instanceof Error?m.message:String(m);_o(e,n,s,o,-1,S,r)})},oh=(e,t,r,o,n,s,i,a,c,d,u,m)=>{let S=AB(r,u);if(aa(e.layout),Vo(e,t)){fB(s),ZX(e,t,r,o,n,s,c,d,S);return}let f=Bt(t,r,YX(e),i);if(f===null){_o(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}fB(s);let y=wU({workspace:e.workspace,projectFolderPath:c}),p=()=>{let A=(0,hB.spawn)(f.command,[...f.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:m??process.env});XX(e,A,n,o,s,r,S,t)};if(s===void 0){p();return}he.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:he.get(s)?.accumulatedOutput??""}),JX(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Zi({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),jn(n,s,()=>he.has(s),sd(e,n,s,o,c,d)),jU({socket:n,sendMessage:yt,requestId:o,agentRunId:s,shellSessionId:a,command:f.command,args:f.args,cwd:y,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:A=>{a!==void 0&&ki(a,w=>{yt(n,w)},o);let b=he.get(s),h=[b?.accumulatedOutput??"",A.partialOutput].filter(w=>w.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=h),PB(e,n,s,o,A.question,h,r)},onFinished:(A,b)=>{Jf(t);let h=ds(b),w=he.get(s),_=w!==void 0&&w.accumulatedOutput.length>0?`${w.accumulatedOutput}

${h.output}`.trim():h.output;_o(e,n,s,o,A,_,r,h.llmUsage)}}).then(A=>{if(!A){p();return}jn(n,s,()=>zk(s),sd(e,n,s,o,c,d))}).catch(A=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",A instanceof Error?A.message:A),p()})},oC=(e,t,r,o)=>{Nf(e.layout,t.agentRunId),t.shellSessionId!==void 0&&yt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=DU(t),s=he.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;oh(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},nC=(e,t)=>{for(let r of lU(e.layout))he.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:wo(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),jn(t,r.agentRunId,()=>Lk(e.layout,r.agentRunId),{awaitingInput:!0}),yt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},sC=(e,t,r,o)=>{let n=he.get(r);if(n===void 0)return!1;Qk.add(r),Xc(r);let s=od.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(OU(r))return!0;Nf(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${SB}`:"Stopped by user.";return _o(e,t,r,o,yB,i,n.originalPrompt),!0}});var QX,iC,_B=l(()=>{"use strict";La();QX=()=>`http://127.0.0.1:${Ct()}/restart`,iC=async()=>{try{let e=await fetch(QX(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var vB=l(()=>{"use strict";fl()});var kB=l(()=>{"use strict";Lv()});var CB,TB=l(()=>{"use strict";CB=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var id,eZ,aC,LB=l(()=>{"use strict";X();ne();vB();Ab();kB();TB();ns();id=(e,t)=>{io(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},eZ=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Ky(),Vy)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},aC=async e=>{let t=Oe(e.layout.installDir)?.bundleVersion??null;if(!CB({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(vt(e.layout)){ca({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),id(e.layout,{summary:r,action:"install-bundle-update-start"}),pr({launchAgentLabel:ve(e.layout.installDir),installDir:e.layout.installDir});let o=await mi({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),id(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await eZ();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),id(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),id(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),id(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var tZ,lC,WB=l(()=>{"use strict";tZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lC=e=>{if(!tZ(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var cC,dC,EB=l(()=>{"use strict";QA();eb();cC=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Xa({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},dC=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await br(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var xB,rZ,oZ,nZ,ad,RB=l(()=>{"use strict";xB=g(require("node:os"));Ie();rZ="Default",oZ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),nZ=e=>{let t=xB.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},ad=()=>{let e=N(),t=Pu(e),r=oZ(rZ);return`${nZ(t)}/${r.length>0?r:"project"}`}});var IB=l(()=>{"use strict";fl()});var OB,uC,MB=l(()=>{"use strict";IB();OB=!1,uC=e=>{OB||(OB=!0,process.on("uncaughtException",t=>{cn(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;cn(e,{kind:"crash",message:r,stack:o})}))}});var NB,sZ,pC,zB=l(()=>{"use strict";NB=require("node:child_process");qf();kt();Df();zf();Kc();jf();sZ=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,NB.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},pC=async e=>{if(!pe(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Me(e.runConfig.writerExecutionBackend)==="api"){let r=tt(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Ce(e.layout.configPath),n=Ve(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Ur(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await sZ(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var mC,DB=l(()=>{"use strict";mC=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var jB,gC,$B=l(()=>{"use strict";jB=require("node:crypto"),gC=()=>(0,jB.randomUUID)()});var Li,HB,nh=l(()=>{"use strict";Li="[[WORKING_ESTIMATE]]",HB=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Li,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var FB,UB=l(()=>{"use strict";FB=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var iZ,BB,GB=l(()=>{"use strict";nh();iZ=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,BB=e=>{if(!e.includes(Li))return null;let t=null;for(let r of e.matchAll(iZ)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var aZ,fC,qB=l(()=>{"use strict";GB();aZ=/^(\d{1,6})\b/,fC=e=>{let t=BB(e);if(t!==null)return t;let r=aZ.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var lZ,cZ,dZ,sh,hC=l(()=>{"use strict";kt();pl();lZ="http://127.0.0.1:11434",cZ=45e3,dZ=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},sh=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||lZ,o=t===void 0?(await Wt({commands:me({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(cZ)});return n.ok?dZ(await n.json()):null}catch{return null}}});var yC,SC,AC,VB=l(()=>{"use strict";Qi();nh();th();UB();qB();vc();hC();yC=async e=>{let t=wo(e.wrappedPrompt),r=EH(e.reportsDir);return{estimateOutput:await sh(HB(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},SC=e=>{let t=fC(e.estimateOutput);t!==null&&of({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},AC=e=>{let t=fC(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=FB(t);return Xi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Ht.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),of({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var ih,KB,bC=l(()=>{"use strict";ih="[[WORKING_TOKEN_ESTIMATE]]",KB=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",ih,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var JB,uZ,YB,XB=l(()=>{"use strict";bC();JB=/^(\d{1,8})\b/,uZ=e=>{let t=e.indexOf(ih);if(t<0)return null;let r=e.slice(t+ih.length).trim(),o=JB.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},YB=e=>{let t=uZ(e);if(t!==null)return t;let r=JB.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var PC,wC,ZB=l(()=>{"use strict";bC();th();XB();vc();hC();PC=async e=>{let t=wo(e.wrappedPrompt),r=IH(e.reportsDir);return{estimateOutput:await sh(KB(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},wC=e=>{let t=YB(e.estimateOutput);return t===null?null:(xH({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var QB=l(()=>{"use strict";_k();Z1();eU();nU();La();wB();qf();kt();Xk();Ff();_B();lb();LB();ns();WB();EB();$f();RB();MB();zB();Ru();DB();$B();nh();Qi();VB();ZB();Wk();pl();Uf();Uk()});var eG={};Dt(eG,{buildContinuationPromptWithContext:()=>gZ});var pZ,mZ,gZ,tG=l(()=>{"use strict";pZ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,mZ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),gZ=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=mZ(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${pZ(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var rG={};Dt(rG,{readHarnessExportSets:()=>hZ});var ld,_C,ah,fZ,hZ,oG=l(()=>{"use strict";ld=g(require("node:fs")),_C=g(require("node:path"));Ie();ah=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fZ=e=>{if(!ld.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(ld.default.readFileSync(e.harnessManifestPath,"utf8"));if(ah(t))return t}catch{return null}return null},hZ=(e,t)=>{let r=N(t),o=fZ(r);if(o===null)return[];let n=ah(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!ah(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let u of c){if(!ah(u))continue;let m=typeof u.path=="string"?u.path:void 0,S=typeof u.id=="string"?u.id:"",f=typeof u.kind=="string"?u.kind:"",y=typeof u.title=="string"?u.title:"";if(m===void 0||S.length===0||f.length===0||y.length===0)continue;let p=m.startsWith("shared/")?_C.default.join(r.harnessRootDir,m):_C.default.join(r.harnessSetsDir,i,m);ld.default.existsSync(p)&&d.push({id:S,kind:f,title:y,content:ld.default.readFileSync(p,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var EC,kC,Wi,nG,yZ,sG,iG,vC,aG,CC,TC,LC,ee,V,WC,SZ,cd,AZ,bZ,PZ,wZ,_Z,vZ,kZ,CZ,dd,lG=l(()=>{"use strict";EC=require("node:child_process"),kC=g(require("node:fs")),Wi=g(require("node:os"));U1();X();ne();ks();$v();V1();ge();Ut();fl();LP();Af();mf();Vt();Zo();Wb();_t();QB();nG=3e4,yZ=3e4,sG=new Map,iG=new Map,vC=new Map,aG=new Map,CC=new Map,TC=new Map,LC=new Map,ee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),V=(e,t,r)=>{e.readyState===Hc.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(io(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Pm(r,"out",t)))},WC=e=>e,SZ=e=>{if(!kC.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(kC.default.readFileSync(e.harnessManifestPath,"utf8"));if(ee(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},cd=(e,t)=>{let r=SZ(t);r!==null&&V(e,{type:"harness.manifest.report",payload:{hostname:Wi.default.hostname(),manifest:r}})},AZ=async(e,t,r,o,n,s,i=!1,a,c,d,u,m)=>{let S=m?.trim()??"";if(!pe(t)){V(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Jc({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await Wt({commands:me({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),p=s!==void 0?yC({wrappedPrompt:r,writerLabel:f,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=s!==void 0?PC({wrappedPrompt:r,writerLabel:f,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=td(t)&&!jk(t);if(b){try{await Ur(e.layout.installDir,t)}catch($){let _e=$ instanceof Error?$.message:String($);V(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${_e}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}ed(t)}else if(!td(t))try{await Ur(e.layout.installDir,t)}catch($){let _e=$ instanceof Error?$.message:String($);V(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${_e}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=Pa(d,ad,m);if(h===null){V(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}rt({projectFolderPath:h,...S.length>0?{projectId:S}:{}}),i||Wc(e.layout,t,h);let w=pf({sessionContinuation:i,supportsWriterSessionContinuation:Vf(t),isWriterConversationStarted:Kf(t)}),_=i&&w==="first"?Lc(e.layout,t,h):null,k=_!==null?pi(e.layout,_):null,C=k!==null&&k.turns.length>0,T=gv({sessionContinuation:i,supportsWriterSessionContinuation:Vf(t),isWriterConversationStarted:Kf(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:C,userPromptCharacterCount:r.length}),x=r;if(T.continuationStrategy==="source_run_seed"){let $=typeof c=="string"&&c.length>0?rd(e.layout,c):null;if($!==null){let{buildContinuationPromptWithContext:_e}=await Promise.resolve().then(()=>(tG(),eG));x=_e({priorPrompt:$.prompt,priorOutput:$.resultOutput??"",userMessage:r})}}else T.continuationStrategy==="transcript_seed"&&k!==null&&k.turns.length>0&&(x=af({priorTurns:k.turns,userMessage:r}));let I=T.ragLimit>0?await Ns({layout:e.layout,query:x,limit:T.ragLimit,minScore:T.ragMinScore,projectFolderPath:h,...S.length>0?{projectId:S}:{}}):[],M=T.ragLimit>0&&h.trim().length>0?await CP({layout:e.layout,query:x,limit:2,minScore:.32,projectFolderPath:h,...S.length>0?{projectId:S}:{}}):[],U=T.injectMemory?nv(e.layout,h,S.length>0?S:void 0):[],K=`${iv(U,T.memoryEntryLimit)}${_P(I)}${TP(M)}${x}`,G=u?.trim()??(s!==void 0&&h.trim().length>0?gC():void 0);if(s!==void 0&&G!==void 0&&G.length>0&&h.trim().length>0){Zi({reportKey:G,agentRunId:s,userSummary:"Working on your Mac\u2026"});let $=K;p!==null&&p.then(_e=>{if(_e===null)return;let Br=AC({estimateOutput:_e.estimateOutput??"",reportKey:G,agentRunId:s,reportsDir:e.layout.reportsDir,task:_e.task,writerLabel:_e.writerLabel,embedding:_e.embedding});if(Br.estimateSeconds===null)return;tC(e.layout.reportsDir,s);let ar=`${Li}
${Br.estimateSeconds}
`;if(ir(s)){V(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:ar},requestId:o});return}Fr(s,ar)}).catch(()=>{}),K=mC($),K=by(K,{agentRunId:s,reportKey:G,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&p!==null&&p.then($=>{$!==null&&SC({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel,embedding:$.embedding})}).catch(()=>{}),s!==void 0&&A!==null&&A.then($=>{$!==null&&wC({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel})}).catch(()=>{});let Ge=s!==void 0&&LC.get(s)===!0;if(s!==void 0&&h.trim().length>0){let $=await Yp(h);TC.set(s,$),G!==void 0&&G.length>0&&CC.set(s,G)}oh(e,t,K,o,WC(n),s,{sessionTurn:T.sessionTurn},a,h,G,r,kS(e.layout,s,Ge)),b&&s!==void 0&&V(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Hk(t)},requestId:o})},bZ=async(e,t,r,o,n)=>{let s=(i,a)=>{V(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await Fk({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:me({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,V(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=pe(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Ci(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},PZ=(e,t,r)=>new Promise(o=>{if(!pe(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Bt(t,r,me({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,EC.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),wZ=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;V(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=qt(t.bundle),s=ee(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=ke(e.wsUrl)??wt,m=await dA({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return V(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=Xo({bundle:i,layout:e.layout});return V(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&cd(o,e.layout),!0},_Z=async(e,t,r,o)=>{if(await wZ(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(V(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){V(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!pe(n)){V(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}aa(e.layout);let i=await(async()=>{try{await Ur(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return PZ(e,n,s)})().finally(()=>{la(e.layout)});V(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),cd(o,e.layout)},vZ=e=>{let t=1e3*2**e;return Math.min(yZ,t)},kZ=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=p=>{if(!t.restartInFlight){if(vt(e.layout)){Hy(p),console.log(`[agent-witch] Deferring local restart (${p}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${p})\u2026`),t.wakeError=`restart:${p}`,iC().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(p,A="system.ack")=>{if(!t.selfUpdateInFlight){if(vt(e.layout)){ca({layout:e.layout,remoteBundleVersion:p,trigger:A}),console.log(`[agent-witch] Deferring install bundle update (${p} via ${A}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,aC({layout:e.layout,remoteBundleVersion:p,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let p=Le(e.layout);p!==null&&He(p,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),f())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let p=t.socket;t.socket=void 0,t.wsConnected=!1,p.removeAllListeners("open"),p.removeAllListeners("message"),p.removeAllListeners("close"),p.on("error",()=>{}),(p.readyState===Hc.OPEN||p.readyState===Hc.CONNECTING)&&p.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,nG)},u=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let p=vZ(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${p}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,f()},p)},m=p=>{s();let A=()=>{let b=oa(e.layout.installDir),h=Ct();V(p,{type:"agent.heartbeat",payload:{hostname:Wi.default.hostname(),macOsUsername:Wi.default.userInfo().username,wakeError:t.wakeError,wakePort:h,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,nG)},S=(p,A)=>{if(typeof p.type!="string")return;if(Lb(p)){t.stopped=!0,s(),a(),c(),kb({layout:e.layout}).finally(()=>{Uc(),process.exit(0)});return}io(e.layout,{direction:"in",type:p.type,summary:"inbound WS frame"}),Pm(e.layout,"in",p);let b=typeof p.requestId=="string"?p.requestId:void 0;if(p.type==="device.auth.attestation"&&ee(p.payload)){let h=typeof p.payload.serverPublicKey=="string"?p.payload.serverPublicKey:"",w=typeof p.payload.origin=="string"?p.payload.origin:"",_=typeof p.payload.devicePublicKey=="string"?p.payload.devicePublicKey:"",k=typeof p.payload.challenge=="string"?p.payload.challenge:"",C=typeof p.payload.serverAttestation=="string"?p.payload.serverAttestation:"";if(!jv({serverPublicKey:h,origin:w,devicePublicKey:_,challenge:k,serverAttestation:C})){t.wakeError="Server attestation verification failed",io(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(p.type==="writer.ensure"&&ee(p.payload)){let h=typeof p.payload.writerAgent=="string"?p.payload.writerAgent:"";io(e.layout,{direction:"local",type:"writer.ensure",summary:h,action:"ensure-writer"}),pC({layout:e.layout,writerAgent:h,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(w=>{V(A,{type:"writer.status",payload:w},e.layout)})}if(p.type==="install.bundle.update"&&ee(p.payload)){let h=typeof p.payload.bundleVersion=="string"?p.payload.bundleVersion.trim():"";h.length>0&&o(h,"install.bundle.update")}if(p.type==="system.ack"){om(e.layout,{wsUrl:e.wsUrl});let h=ee(p.payload)?p.payload:null,w=lC(h);w!==null&&o(w)}if(p.type==="device.restart"&&r("cloud-device-restart"),p.type==="automations.sync"&&ee(p.payload)&&cC(p.payload),p.type==="automations.run"&&ee(p.payload)&&dC(p.payload),p.type==="terminal.stream.accepted"&&ee(p.payload)){let h=typeof p.payload.runId=="string"?p.payload.runId:"";if(h.length>0){let w=Ok(h);for(let _ of w)V(A,{type:"terminal.stream.chunk",payload:{runId:h,chunk:_},requestId:b})}}if(p.type==="agent.agentRun.list"&&V(A,{type:"dashboard.agentRun.list.result",payload:{runs:Yk(e.layout)},requestId:b}),p.type==="agent.agentRun.get"&&ee(p.payload)){let h=typeof p.payload.runId=="string"?p.payload.runId:"",w=h.length>0?rd(e.layout,h):null;V(A,{type:"dashboard.agentRun.get.result",payload:{run:w},requestId:b})}if(p.type==="command.claude.run"&&ee(p.payload)){let h=p.payload.prompt,w=typeof p.payload.writerAgent=="string"&&pe(p.payload.writerAgent)?p.payload.writerAgent:"claude-cli",_=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,k=p.payload.sessionContinuation===!0,C=typeof p.payload.sourceRunId=="string"?p.payload.sourceRunId:void 0,T=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:void 0,x=typeof p.payload.projectId=="string"?p.payload.projectId:void 0,I=Pa(typeof p.payload.projectFolderPath=="string"?p.payload.projectFolderPath:void 0,ad,x),M=SS(p.payload.compositionSnapshot),U=typeof p.payload.reportKey=="string"?p.payload.reportKey:void 0;if(typeof h=="string"&&h.trim().length>0){if(console.log(`[agent-witch] Running ${w} task (${k?"continue":"first"})\u2026`),I===null){V(A,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(M!==null){let K=bS(e.layout,M);if(K!==null){V(A,{type:"command.claude.result",payload:{exitCode:-1,output:K,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(_!==void 0){let G=wS(e.layout,_,M);if(!G.ok){V(A,{type:"command.claude.result",payload:{exitCode:-1,output:G.errorMessage,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}LC.set(_,M.entries.some(Ge=>Ge.scope==="run"))}}_!==void 0&&T!==void 0&&sG.set(_,T),_!==void 0&&(iG.set(_,I),x!==void 0&&x.trim().length>0&&vC.set(_,x.trim()),aG.set(_,h.trim()),rt({projectFolderPath:I,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),AZ(e,w,h.trim(),b,A,_,k,T,C,I,U,x)}}if(p.type==="shell.session.open"&&ee(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",w=typeof p.payload.cols=="number"?p.payload.cols:120,_=typeof p.payload.rows=="number"?p.payload.rows:32;h.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),Dk({shellSessionId:h,cwd:e.workspace,cols:w,rows:_,send:k=>{V(A,k)},requestId:b}))}if(p.type==="shell.session.close"&&ee(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"";h.length>0&&ki(h,w=>{V(A,w)},b)}if(p.type==="shell.input"&&ee(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",w=typeof p.payload.data=="string"?p.payload.data:"";h.length>0&&w.length>0&&Mk(h,w)}if(p.type==="shell.resize"&&ee(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",w=typeof p.payload.cols=="number"?p.payload.cols:0,_=typeof p.payload.rows=="number"?p.payload.rows:0;h.length>0&&w>0&&_>0&&Nk(h,w,_)}if(p.type==="command.writer.session.end"&&ee(p.payload)){let h=p.payload.writerAgent;typeof h=="string"&&pe(h)&&($k(h),df(e.layout,h))}if(p.type==="command.writer.session.start"&&ee(p.payload)){let h=p.payload.writerAgent,w=typeof p.payload.writerSessionId=="string"?p.payload.writerSessionId:"";typeof h=="string"&&pe(h)&&w.length>0&&(console.log(`[agent-witch] Starting ${h} session\u2026`),bZ(e,h,w,b,A))}if(p.type==="command.claude.stop"&&ee(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"";h.length>0&&(console.log(`[agent-witch] Stopping run ${h}\u2026`),sC(e,WC(A),h,b))}if(p.type==="command.claude.input_respond"&&ee(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"",w=typeof p.payload.response=="string"?p.payload.response.trim():"",_=typeof p.payload.originalPrompt=="string"?p.payload.originalPrompt:"",k=typeof p.payload.partialOutput=="string"?p.payload.partialOutput:"",C=typeof p.payload.question=="string"?p.payload.question:"";h.length>0&&w.length>0&&_.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),oC(e,{agentRunId:h,originalPrompt:_,partialOutput:k,question:C,response:w,shellSessionId:sG.get(h)},b,WC(A)))}if(p.type==="dispatch.approval.required"&&ee(p.payload)){let h=typeof p.payload.requesterEmail=="string"?p.payload.requesterEmail:"A teammate",w=typeof p.payload.prompt=="string"?p.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${h}: ${w}`),process.platform==="darwin"&&(0,EC.spawn)("osascript",["-e",`display notification "${w.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${h.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(p.type==="harness.request"&&ee(p.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),_Z(e,p.payload,b,A)),p.type==="harness.export.request"&&ee(p.payload)){let h=typeof p.payload.borrowerUserId=="string"?p.payload.borrowerUserId:"",w=typeof p.payload.targetDeviceId=="string"?p.payload.targetDeviceId:void 0,_=Array.isArray(p.payload.setSlugs)?p.payload.setSlugs.filter(k=>typeof k=="string"):[];h.length>0&&_.length>0&&(async()=>{let{readHarnessExportSets:k}=await Promise.resolve().then(()=>(oG(),rG)),C=k(_,e.email);V(A,{type:"harness.export.result",payload:{success:C.length>0,borrowerUserId:h,...w!==void 0?{targetDeviceId:w}:{},sets:C,errorMessage:C.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(p.type==="harness.manifest.request"&&cd(A,e.layout),p.type==="command.claude.result"&&ee(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,w=typeof p.payload.output=="string"?p.payload.output:"",_=typeof p.payload.exitCode=="number"?p.payload.exitCode:null,k=Pa(h!==void 0?iG.get(h):void 0,ad),C=h!==void 0?vC.get(h):void 0,T=h!==void 0?aG.get(h)??"":"",x=$A({exitCode:_,output:w});if(x&&k!==null&&wP({layout:e.layout,text:w,source:h??"command.claude.result",projectFolderPath:k,...C!==void 0?{projectId:C}:{}}),_!=null&&_!==0&&w.trim().length>0&&k!==null&&(yP({layout:e.layout,errorText:w,projectFolderPath:k,...C!==void 0?{projectId:C}:{}}),kP({layout:e.layout,text:w,source:h??"command.claude.result.failure",projectFolderPath:k,...C!==void 0?{projectId:C}:{}})),x&&T.trim().length>0&&k!==null&&sv({layout:e.layout,projectFolderPath:k,...C!==void 0?{projectId:C}:{},entry:{id:`${Date.now()}-${h??"run"}`,...h!==void 0?{agentRunId:h}:{},prompt:T,output:w,createdAt:new Date().toISOString()}}),h!==void 0&&k!==null){let M=CC.get(h),U=TC.get(h);M!==void 0&&U!==void 0&&Yp(k).then(K=>{let G=BA({before:U,after:K});Py(M,G),TC.delete(h),CC.delete(h)})}if(x&&C!==void 0&&C.trim().length>0){let M=H(),U=M===null?null:Z({wsUrl:M.wsUrl,pairingToken:M.pairingToken});U!==null&&qA(U,C,{...h!==void 0?{sourceRunId:h}:{},lesson:GA({prompt:T,output:w})})}h!==void 0&&(_a(e.layout,h),LC.delete(h),vC.delete(h))}},f=()=>{if(t.stopped)return;a(),c();let p=new Hc(e.wsUrl);t.socket=p,p.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),eC(Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),rC(e.layout);let A=ke(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),h=Dv({layout:e.layout,origin:A,...b!==void 0&&b.length>0?{claimToken:b}:{}});V(p,{type:"agent.register",payload:{role:"agent",hostname:Wi.default.hostname(),macOsUsername:Wi.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...h}},e.layout),cd(p,e.layout),nC(e,p),m(p)}),p.on("message",A=>{let b=typeof A=="string"?A:A.toString("utf8");try{let h=JSON.parse(b);if(!ee(h))return;S(h,p)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),p.on("close",(A,b)=>{s(),t.socket=void 0,t.wsConnected=!1,ob(e.layout),t.reconnectAttempt+=1;let h=typeof b=="string"?b:b.toString("utf8");cn(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:h}),console.log("[agent-witch] Disconnected from server."),u()}),p.on("error",A=>{t.wakeError=A.message,cn(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return $y(()=>{let p=Fy();p!==null&&p.layout.installDir===e.layout.installDir&&p.layout.profileEmail===e.layout.profileEmail&&o(p.remoteBundleVersion,p.trigger);let A=Uy();A!==null&&r(A)}),{connect:f,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:ol(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Ic(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,f()},reportHarnessManifestIfConnected:()=>{let p=t.socket;return!t.wsConnected||p===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(cd(p,e.layout),{ok:!0})}}},CZ=async()=>{Qe("agent-witch");let e=Sk(),t=L();wk().ok||(process.platform==="darwin"?(await Oo(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),Ck(t);let o=kk({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(pr({launchAgentLabel:ve(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),Bi());let n=await IS(),s=n[0];s!==void 0&&uC(s.layout);for(let f of n){let y=ke(f.wsUrl)??wt;na(f.layout.installDir,y)}let i=n.map(f=>kZ(f)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),Uc(),process.exit(0));let c=()=>{n.forEach((f,y)=>{let p=i[y];if(p===void 0)return;let A=Le(f.layout);nb(A,{socketOpen:p.hasMacSocketOpen(),staleAfterMs:12e4})&&p.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let f=n[0]?.layout;f!==void 0&&(vt(f)||nl(f.installDir))},m=await Tk({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):Rc({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let f of i)f.startLocalHealthCheck(),f.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=mr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Gi(),d()});d=()=>{S(),m.stop(),Uc(),console.log("[agent-witch] Shutting down.");for(let f of i)f.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},dd=CZ});var xC=l(()=>{"use strict";lG()});var cG={};Dt(cG,{startAgentWitchClient:()=>dd});var dG=l(()=>{"use strict";xC();xC();zo();wy();Ou();if(!et()&&Do(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Iu(process.argv.slice(e))),dd()}});Sy();wy();zo();Ou();var gW="20.x",fW="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var hK=e=>[`Node.js ${gW} or newer is required (found ${e}).`,fW].join(" "),hW=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${hK(process.version)}
`),process.exit(1))};var TZ=async()=>{Qe("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Ky(),Vy)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},LZ=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(P0(),b0)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},WZ=async()=>{if(!Do(et()?void 0:__agentWitchImportMetaUrl))return;hW();let e=process.argv.indexOf("report");e>=0&&process.exit(Iu(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await TZ();return}if(t==="wake"){await LZ();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(wI(),PI));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(DF(),zF));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(dG(),cG));await r()};WZ();
