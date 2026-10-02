#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var DG=Object.create;var hh=Object.defineProperty;var jG=Object.getOwnPropertyDescriptor;var $G=Object.getOwnPropertyNames;var HG=Object.getPrototypeOf,FG=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var v=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Ft=(e,t)=>{for(var r in t)hh(e,r,{get:t[r],enumerable:!0})},UG=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of $G(t))!FG.call(e,n)&&n!==r&&hh(e,n,{get:()=>t[n],enumerable:!(o=jG(t,n))||o.enumerable});return e};var g=(e,t,r)=>(r=e!=null?DG(HG(e)):{},UG(t||!e||!e.__esModule?hh(r,"default",{value:e,enumerable:!0}):r,e));var xi,GC,qC,Co,yh,tQ,VC,hd,Ut,ur,yd,Sd,Gn,qn,tt,Sh,Ad,bd,Pd,Ii,Pt,Vn,Kn,wd,Vr,Ah,KC,Me=l(()=>{"use strict";xi={production:".agent-witch",localhost:".local-agent-witch"},GC={production:47892,localhost:47893},qC={production:"com.agent-witch",localhost:"com.local-agent-witch"},Co={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},yh="app",tQ=`${yh}/agent-witch.js`,VC=`${yh}/command`,hd={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",harnessDir:"harness"},Ut=xi.production,ur=xi.localhost,yd=GC.production,Sd=GC.localhost,Gn=qC.production,qn=qC.localhost,tt="profiles",Sh=Co.activeProfile,Ad="harness",bd="sets",Pd="manifest.json",Ii=hd.projectsDir,Pt=hd.logsDir,Vn="agent-witch.log",Kn="agent-witch.error.log",wd=hd.reportsDir,Vr=hd.deviceKeypairJson,Ah=yh,KC="agent-witch.js"});var JC=l(()=>{"use strict";Me()});var YC,To,Oi,_d=l(()=>{"use strict";YC=g(require("node:path"));Me();To=e=>YC.default.basename(e)===ur,Oi=e=>To(e)?qn:Gn});var XC=l(()=>{"use strict";JC();_d()});var ZC,bh,BG,Mi,GG,qG,QC,VG,KG,eT=l(()=>{"use strict";XC();Me();ZC=g(require("node:os")),bh=g(require("node:path")),BG=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?bh.default.resolve(e):bh.default.join(ZC.default.homedir(),Ut)},Mi=Oi(BG()),GG=`${Mi}-wake`,qG=`${Mi}-live`,QC=`${Mi}-watchdog`,VG=`${Mi}-automation-scheduler`,KG=`${Mi}-updater`});var Jn=v(Ph=>{"use strict";Object.defineProperty(Ph,"__esModule",{value:!0});Ph.stringify=JG;function JG(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var O=v(wh=>{"use strict";Object.defineProperty(wh,"__esModule",{value:!0});wh.generateTypeGuardError=YG;var tT=Jn();function YG(e,t,r){return(0,tT.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,tT.stringify)(e)}) to be "${r}"`}});var Kr=v(vd=>{"use strict";Object.defineProperty(vd,"__esModule",{value:!0});vd.isNonNullObject=void 0;var XG=O(),ZG=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,XG.generateTypeGuardError)(e,t.identifier,"non-null object")),r};vd.isNonNullObject=ZG});var Bt=v(Se=>{"use strict";Object.defineProperty(Se,"__esModule",{value:!0});Se.attachTypeGuardMeta=Se.isArrayTypeGuard=Se.isNestedObjectTypeGuard=Se.getTypeGuardWrapperKind=Se.getTypeGuardInnerGuard=Se.getTypeGuardItemGuard=Se.getTypeGuardSchema=void 0;var QG=e=>e.schema;Se.getTypeGuardSchema=QG;var e2=e=>e.itemGuard;Se.getTypeGuardItemGuard=e2;var t2=e=>e.innerGuard;Se.getTypeGuardInnerGuard=t2;var r2=e=>e.wrapperKind;Se.getTypeGuardWrapperKind=r2;var o2=e=>{if((0,Se.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};Se.isNestedObjectTypeGuard=o2;var n2=e=>{if((0,Se.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};Se.isArrayTypeGuard=n2;var s2=(e,t)=>Object.assign(e,t);Se.attachTypeGuardMeta=s2});var Ni=v(Lo=>{"use strict";Object.defineProperty(Lo,"__esModule",{value:!0});Lo.getExpectedTypeName=Lo.getTypeGuardDisplayName=void 0;var rT=Bt(),i2=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};Lo.getTypeGuardDisplayName=i2;var a2=e=>{let t=(0,rT.getTypeGuardWrapperKind)(e),r=(0,rT.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,Lo.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};Lo.getExpectedTypeName=a2});var Wo=v(kd=>{"use strict";Object.defineProperty(kd,"__esModule",{value:!0});kd.createValidationResult=void 0;var l2=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});kd.createValidationResult=l2});var Yn=v(Cd=>{"use strict";Object.defineProperty(Cd,"__esModule",{value:!0});Cd.createValidationError=void 0;var c2=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Cd.createValidationError=c2});var Xn=v(Td=>{"use strict";Object.defineProperty(Td,"__esModule",{value:!0});Td.createTreeNode=void 0;var d2=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Td.createTreeNode=d2});var zi=v(Ld=>{"use strict";Object.defineProperty(Ld,"__esModule",{value:!0});Ld.combineResults=void 0;var u2=Wo(),p2=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,u2.createValidationResult)(r,o,n)};Ld.combineResults=p2});var Ed=v(Wd=>{"use strict";Object.defineProperty(Wd,"__esModule",{value:!0});Wd.createSimplifiedTree=void 0;var oT=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=oT(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},m2=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=oT(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Wd.createSimplifiedTree=m2});var ji=v(xd=>{"use strict";Object.defineProperty(xd,"__esModule",{value:!0});xd.validateObject=void 0;var g2=Kr(),Di=Wo(),f2=Yn(),Rd=Xn(),h2=zi(),nT=Id(),y2=(e,t,r)=>{let o=()=>{let i=(0,f2.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Rd.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Di.createValidationResult)(!1,[],a):(0,Di.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Di.createValidationResult)(!0,[],(0,Rd.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...u]=c,m=d,S=t[m],f=e[m],y=(0,nT.validateProperty)(m,f,S,r);return y.valid?u.length===0?(0,Di.createValidationResult)(!0,[],(0,Rd.createTreeNode)(r.path,!0,"object",e)):a(u):y};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,nT.validateProperty)(d,e[d],u,r)}),a=(0,h2.combineResults)(i,r.path),c=(0,Rd.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,Di.createValidationResult)(a.valid,a.errors,c)};return(0,g2.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};xd.validateObject=y2});var iT=v(Nd=>{"use strict";Object.defineProperty(Nd,"__esModule",{value:!0});Nd.validateArray=void 0;var S2=Jn(),Od=Wo(),sT=Yn(),Md=Xn(),A2=zi(),b2=ji(),P2=Ni(),w2=Bt(),_2=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,sT.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Md.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,Od.createValidationResult)(!1,[c],d)}let n=(0,w2.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,m={path:u,config:r.config||null};if(n)return(0,b2.validateObject)(c,n,m);let S=t(c,null),f=(0,P2.getExpectedTypeName)(t),y=(0,S2.stringify)(c);if(S)return(0,Od.createValidationResult)(!0,[],(0,Md.createTreeNode)(u,!0,f,c));let p=y.length>200?`Expected ${u} to be "${f}"`:`Expected ${u} (${y}) to be "${f}"`,A=(0,sT.createValidationError)(u,f,c,p),b=(0,Md.createTreeNode)(u,!1,f,c);return b.errors=[A],(0,Od.createValidationResult)(!1,[A],b)}),i=(0,A2.combineResults)(s,o),a=(0,Md.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,Od.createValidationResult)(i.valid,i.errors,a)};Nd.validateArray=_2});var Id=v(Dd=>{"use strict";Object.defineProperty(Dd,"__esModule",{value:!0});Dd.validateProperty=void 0;var aT=Wo(),v2=Yn(),lT=Xn(),k2=Ni(),zd=Bt(),C2=ji(),T2=iT(),L2=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,zd.getTypeGuardSchema)(r),c=(0,zd.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,C2.validateObject)(t,a,s);if(c&&(0,zd.isArrayTypeGuard)(r))return(0,T2.validateArray)(t,c,s)}let d=u=>{let m=r(t,u),S=(0,k2.getExpectedTypeName)(r);return m?(0,aT.createValidationResult)(!0,[],(0,lT.createTreeNode)(n,!0,S,t)):(()=>{let f=(0,v2.createValidationError)(n,S,t,`Expected ${n} (${JSON.stringify(t)}) to be "${S}"`),y=(0,lT.createTreeNode)(n,!1,S,t);return y.errors=[f],(0,aT.createValidationResult)(!1,[f],y)})()};if((0,zd.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};Dd.validateProperty=L2});var $d=v(jd=>{"use strict";Object.defineProperty(jd,"__esModule",{value:!0});jd.isNil=void 0;var W2=O(),E2=function(e,t){return e!=null?(t&&t.callbackOnError((0,W2.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};jd.isNil=E2});var _h=v(Hd=>{"use strict";Object.defineProperty(Hd,"__esModule",{value:!0});Hd.isDefined=void 0;var R2=O(),x2=$d(),I2=function(e,t){return(0,x2.isNil)(e,null)?(t&&t.callbackOnError((0,R2.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Hd.isDefined=I2});var vh=v(Fd=>{"use strict";Object.defineProperty(Fd,"__esModule",{value:!0});Fd.reportValidationResults=void 0;var O2=Ed(),cT=_h(),M2=$d(),N2=(e,t)=>{if(e.valid===!0||(0,M2.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,cT.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,O2.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,cT.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Fd.reportValidationResults=N2});var kh=v(re=>{"use strict";Object.defineProperty(re,"__esModule",{value:!0});re.Validation=re.reportValidationResults=re.validateObject=re.validateProperty=re.createSimplifiedTree=re.combineResults=re.createTreeNode=re.createValidationError=re.createValidationResult=re.getExpectedTypeName=void 0;var z2=Ni();Object.defineProperty(re,"getExpectedTypeName",{enumerable:!0,get:function(){return z2.getExpectedTypeName}});var D2=Wo();Object.defineProperty(re,"createValidationResult",{enumerable:!0,get:function(){return D2.createValidationResult}});var j2=Yn();Object.defineProperty(re,"createValidationError",{enumerable:!0,get:function(){return j2.createValidationError}});var $2=Xn();Object.defineProperty(re,"createTreeNode",{enumerable:!0,get:function(){return $2.createTreeNode}});var H2=zi();Object.defineProperty(re,"combineResults",{enumerable:!0,get:function(){return H2.combineResults}});var F2=Ed();Object.defineProperty(re,"createSimplifiedTree",{enumerable:!0,get:function(){return F2.createSimplifiedTree}});var U2=Id();Object.defineProperty(re,"validateProperty",{enumerable:!0,get:function(){return U2.validateProperty}});var B2=ji();Object.defineProperty(re,"validateObject",{enumerable:!0,get:function(){return B2.validateObject}});var G2=vh();Object.defineProperty(re,"reportValidationResults",{enumerable:!0,get:function(){return G2.reportValidationResults}});var q2=Wo(),V2=zi(),K2=Yn(),J2=Xn(),Y2=Id(),X2=ji(),Z2=vh(),Q2=Ed();re.Validation={result:q2.createValidationResult,combine:V2.combineResults,error:K2.createValidationError,treeNode:J2.createTreeNode,property:Y2.validateProperty,object:X2.validateObject,report:Z2.reportValidationResults,createSimplifiedTree:Q2.createSimplifiedTree}});var Ud=v(Ch=>{"use strict";Object.defineProperty(Ch,"__esModule",{value:!0});Ch.isType=t5;var dT=Kr(),uT=kh(),e5=Bt();function t5(e){if(!(0,dT.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,uT.validateObject)(r,e,s);return(0,uT.reportValidationResults)(i,o||null),i.valid}return(0,dT.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,e5.attachTypeGuardMeta)(t,{schema:e})}});var fT=v(Eo=>{"use strict";Object.defineProperty(Eo,"__esModule",{value:!0});Eo.isNestedType=Eo.isShape=void 0;Eo.isSchema=$i;var pT=Kr(),mT=kh(),gT=Bt();function $i(e){if(!(0,pT.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=o5(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,mT.validateObject)(o,t,i);return(0,mT.reportValidationResults)(a,n||null),a.valid}return(0,pT.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,gT.attachTypeGuardMeta)(r,{schema:t})}function r5(e){return typeof e=="function"?e:Array.isArray(e)?n5(e):typeof e=="object"&&e!==null?$i(e):e}function o5(e){let t={};for(let[r,o]of Object.entries(e))t[r]=r5(o);return t}function n5(e){let t=e[0],r=$i(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,gT.attachTypeGuardMeta)(o,{itemGuard:r})}Eo.isShape=$i;Eo.isNestedType=$i});var hT=v(Th=>{"use strict";Object.defineProperty(Th,"__esModule",{value:!0});Th.isObjectWith=i5;var s5=Ud();function i5(e){return(0,s5.isType)(e)}});var yT=v(Lh=>{"use strict";Object.defineProperty(Lh,"__esModule",{value:!0});Lh.isObject=l5;var a5=Ud();function l5(e){return(0,a5.isType)(e)}});var ST=v(Wh=>{"use strict";Object.defineProperty(Wh,"__esModule",{value:!0});Wh.guardWithTolerance=c5;function c5(e,t,r){return t(e,r),e}});var AT=v(Eh=>{"use strict";Object.defineProperty(Eh,"__esModule",{value:!0});Eh.isBranded=u5;var d5=O();function u5(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,d5.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var bT=v(Bd=>{"use strict";Object.defineProperty(Bd,"__esModule",{value:!0});Bd.BrandSymbols=void 0;Bd.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var PT=v(Gd=>{"use strict";Object.defineProperty(Gd,"__esModule",{value:!0});Gd.isAny=void 0;var p5=function(e){return!0};Gd.isAny=p5});var Hi=v(Rh=>{"use strict";Object.defineProperty(Rh,"__esModule",{value:!0});Rh.reportTypeGuardError=g5;var m5=O();function g5(e,t,r){e&&e.callbackOnError((0,m5.generateTypeGuardError)(t,e.identifier,r))}});var wT=v(qd=>{"use strict";Object.defineProperty(qd,"__esModule",{value:!0});qd.isBoolean=void 0;var f5=Hi(),h5=function(t,r){return typeof t!="boolean"?((0,f5.reportTypeGuardError)(r,t,"boolean"),!1):!0};qd.isBoolean=h5});var _T=v(Vd=>{"use strict";Object.defineProperty(Vd,"__esModule",{value:!0});Vd.isDate=void 0;var y5=O(),S5=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,y5.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Vd.isDate=S5});var xh=v(Kd=>{"use strict";Object.defineProperty(Kd,"__esModule",{value:!0});Kd.isNumber=void 0;var A5=Hi(),b5=function(t,r){return typeof t!="number"||isNaN(t)?((0,A5.reportTypeGuardError)(r,t,"number"),!1):!0};Kd.isNumber=b5});var vT=v(Jd=>{"use strict";Object.defineProperty(Jd,"__esModule",{value:!0});Jd.isString=void 0;var P5=Hi(),w5=function(t,r){return typeof t!="string"?((0,P5.reportTypeGuardError)(r,t,"string"),!1):!0};Jd.isString=w5});var kT=v(Yd=>{"use strict";Object.defineProperty(Yd,"__esModule",{value:!0});Yd.isUnknown=void 0;var _5=function(e){return!0};Yd.isUnknown=_5});var CT=v(Xd=>{"use strict";Object.defineProperty(Xd,"__esModule",{value:!0});Xd.isFunction=void 0;var v5=O(),k5=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,v5.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Xd.isFunction=k5});var LT=v(Zd=>{"use strict";Object.defineProperty(Zd,"__esModule",{value:!0});Zd.isFile=void 0;var TT=O(),C5=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,TT.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,TT.generateTypeGuardError)(e,t.identifier,"File")),!1)};Zd.isFile=C5});var ET=v(Qd=>{"use strict";Object.defineProperty(Qd,"__esModule",{value:!0});Qd.isFileList=void 0;var WT=O(),T5=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,WT.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,WT.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Qd.isFileList=T5});var xT=v(eu=>{"use strict";Object.defineProperty(eu,"__esModule",{value:!0});eu.isBlob=void 0;var RT=O(),L5=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,RT.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,RT.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};eu.isBlob=L5});var OT=v(tu=>{"use strict";Object.defineProperty(tu,"__esModule",{value:!0});tu.isFormData=void 0;var IT=O(),W5=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,IT.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,IT.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};tu.isFormData=W5});var NT=v(ru=>{"use strict";Object.defineProperty(ru,"__esModule",{value:!0});ru.isURL=void 0;var MT=O(),E5=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,MT.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,MT.generateTypeGuardError)(e,t.identifier,"URL")),!1)};ru.isURL=E5});var DT=v(ou=>{"use strict";Object.defineProperty(ou,"__esModule",{value:!0});ou.isURLSearchParams=void 0;var zT=O(),R5=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,zT.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,zT.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};ou.isURLSearchParams=R5});var jT=v(nu=>{"use strict";Object.defineProperty(nu,"__esModule",{value:!0});nu.isMap=void 0;var x5=O(),I5=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,x5.generateTypeGuardError)(e,t.identifier,"Map")),!1)};nu.isMap=I5});var $T=v(su=>{"use strict";Object.defineProperty(su,"__esModule",{value:!0});su.isSet=void 0;var O5=O(),M5=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,O5.generateTypeGuardError)(e,t.identifier,"Set")),!1)};su.isSet=M5});var HT=v(Ih=>{"use strict";Object.defineProperty(Ih,"__esModule",{value:!0});Ih.isIndexSignature=z5;var N5=O();function z5(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,N5.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,u)=>{let m=s[d],S=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),f=t(m,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return S&&f})}}});var FT=v(iu=>{"use strict";Object.defineProperty(iu,"__esModule",{value:!0});iu.isError=void 0;var D5=Hi(),j5=function(t,r){return t instanceof Error?!0:((0,D5.reportTypeGuardError)(r,t,"Error"),!1)};iu.isError=j5});var Mh=v(Oh=>{"use strict";Object.defineProperty(Oh,"__esModule",{value:!0});Oh.isArrayWithEachItem=F5;var $5=O(),H5=Bt();function F5(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,$5.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,H5.attachTypeGuardMeta)(t,{itemGuard:e})}});var Nh=v(au=>{"use strict";Object.defineProperty(au,"__esModule",{value:!0});au.isNonEmptyArray=void 0;var U5=O(),B5=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,U5.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};au.isNonEmptyArray=B5});var UT=v(zh=>{"use strict";Object.defineProperty(zh,"__esModule",{value:!0});zh.isNonEmptyArrayWithEachItem=V5;var G5=Mh(),q5=Nh();function V5(e){return function(t,r){return(0,G5.isArrayWithEachItem)(e)(t,r)&&(0,q5.isNonEmptyArray)(t,r)}}});var GT=v(Dh=>{"use strict";Object.defineProperty(Dh,"__esModule",{value:!0});Dh.isTuple=K5;var BT=O();function K5(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,BT.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,BT.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var qT=v(jh=>{"use strict";Object.defineProperty(jh,"__esModule",{value:!0});jh.isObjectWithEachItem=Y5;var J5=O();function Y5(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,J5.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var VT=v($h=>{"use strict";Object.defineProperty($h,"__esModule",{value:!0});$h.isPartialOf=Z5;var X5=Kr();function Z5(e){return function(t,r){if(!(0,X5.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var KT=v(Hh=>{"use strict";Object.defineProperty(Hh,"__esModule",{value:!0});Hh.isPick=eq;var Q5=Kr();function eq(e,...t){return function(r,o){if(!(0,Q5.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var JT=v(Fh=>{"use strict";Object.defineProperty(Fh,"__esModule",{value:!0});Fh.isOmit=rq;var tq=Kr();function rq(e,...t){return function(r,o){if(!(0,tq.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),m=u.indexOf(" ("),S=m>=0?u.slice(0,m):u;if(a.has(S))return!1;let f=S.startsWith(s+".")&&S.slice(s.length+1).split(".")[0]||"";return!(f&&!Object.prototype.hasOwnProperty.call(r,f))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var YT=v(lu=>{"use strict";Object.defineProperty(lu,"__esModule",{value:!0});lu.isNonEmptyString=void 0;var oq=O(),nq=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,oq.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};lu.isNonEmptyString=nq});var XT=v(cu=>{"use strict";Object.defineProperty(cu,"__esModule",{value:!0});cu.isNonNegativeNumber=void 0;var sq=O(),iq=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,sq.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};cu.isNonNegativeNumber=iq});var ZT=v(du=>{"use strict";Object.defineProperty(du,"__esModule",{value:!0});du.isPositiveNumber=void 0;var aq=O(),lq=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,aq.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};du.isPositiveNumber=lq});var QT=v(uu=>{"use strict";Object.defineProperty(uu,"__esModule",{value:!0});uu.isNonPositiveNumber=void 0;var cq=O(),dq=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,cq.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};uu.isNonPositiveNumber=dq});var eL=v(pu=>{"use strict";Object.defineProperty(pu,"__esModule",{value:!0});pu.isNegativeNumber=void 0;var uq=O(),pq=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,uq.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};pu.isNegativeNumber=pq});var tL=v(mu=>{"use strict";Object.defineProperty(mu,"__esModule",{value:!0});mu.isInteger=void 0;var mq=O(),gq=xh(),fq=function(e,t){return!(0,gq.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,mq.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};mu.isInteger=fq});var rL=v(gu=>{"use strict";Object.defineProperty(gu,"__esModule",{value:!0});gu.isPositiveInteger=void 0;var hq=O(),yq=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,hq.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};gu.isPositiveInteger=yq});var oL=v(fu=>{"use strict";Object.defineProperty(fu,"__esModule",{value:!0});fu.isNegativeInteger=void 0;var Sq=O(),Aq=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Sq.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};fu.isNegativeInteger=Aq});var nL=v(hu=>{"use strict";Object.defineProperty(hu,"__esModule",{value:!0});hu.isNonNegativeInteger=void 0;var bq=O(),Pq=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,bq.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};hu.isNonNegativeInteger=Pq});var sL=v(yu=>{"use strict";Object.defineProperty(yu,"__esModule",{value:!0});yu.isNonPositiveInteger=void 0;var wq=O(),_q=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,wq.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};yu.isNonPositiveInteger=_q});var iL=v(Au=>{"use strict";Object.defineProperty(Au,"__esModule",{value:!0});Au.isNumeric=void 0;var Su=O(),vq=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Su.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Su.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Su.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Su.generateTypeGuardError)(e,t.identifier,"number key")),!1};Au.isNumeric=vq});var aL=v(bu=>{"use strict";Object.defineProperty(bu,"__esModule",{value:!0});bu.isBooleanLike=void 0;var Uh=O(),kq=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Uh.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Uh.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};bu.isBooleanLike=kq});var lL=v(Pu=>{"use strict";Object.defineProperty(Pu,"__esModule",{value:!0});Pu.isDateLike=void 0;var Fi=O(),Cq=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Fi.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Fi.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Fi.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Fi.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Fi.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Pu.isDateLike=Cq});var cL=v(wu=>{"use strict";Object.defineProperty(wu,"__esModule",{value:!0});wu.isBigInt=void 0;var Tq=O(),Lq=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,Tq.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};wu.isBigInt=Lq});var Gh=v(Bh=>{"use strict";Object.defineProperty(Bh,"__esModule",{value:!0});Bh.isOneOf=Wq;var dL=Jn();function Wq(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,dL.stringify)(t)}) must be one of following values ${e.map(dL.stringify).join(" | ")}`),o}}});var uL=v(qh=>{"use strict";Object.defineProperty(qh,"__esModule",{value:!0});qh.isOneOfTypes=xq;var Eq=Jn(),Rq=Ni();function xq(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,Eq.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,Rq.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;a.includes(u)||a.push(u)}})),r.callbackOnError(a.join(`
`))}return n}}});var pL=v(Vh=>{"use strict";Object.defineProperty(Vh,"__esModule",{value:!0});Vh.isIntersectionOf=Iq;function Iq(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var mL=v(Kh=>{"use strict";Object.defineProperty(Kh,"__esModule",{value:!0});Kh.isExtensionOf=Oq;function Oq(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var gL=v(Jh=>{"use strict";Object.defineProperty(Jh,"__esModule",{value:!0});Jh.isNullOr=Nq;var Mq=Bt();function Nq(e){function t(r,o){return r===null?!0:e(r,o)}return(0,Mq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var fL=v(Yh=>{"use strict";Object.defineProperty(Yh,"__esModule",{value:!0});Yh.isUndefinedOr=Dq;var zq=Bt();function Dq(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,zq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var hL=v(Xh=>{"use strict";Object.defineProperty(Xh,"__esModule",{value:!0});Xh.isNilOr=$q;var jq=Bt();function $q(e){function t(r,o){return r==null?!0:e(r,o)}return(0,jq.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var yL=v(Zh=>{"use strict";Object.defineProperty(Zh,"__esModule",{value:!0});Zh.isAsserted=Hq;function Hq(e){return!0}});var SL=v(Qh=>{"use strict";Object.defineProperty(Qh,"__esModule",{value:!0});Qh.isEnum=Uq;var Fq=Gh();function Uq(e){return function(t,r){return(0,Fq.isOneOf)(...Object.values(e))(t,r)}}});var AL=v(ey=>{"use strict";Object.defineProperty(ey,"__esModule",{value:!0});ey.isEqualTo=qq;var Bq=O(),Gq=Jn();function qq(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,Bq.generateTypeGuardError)(t,r.identifier,`equal to ${(0,Gq.stringify)(e)}`)),!1):!0}}});var bL=v(_u=>{"use strict";Object.defineProperty(_u,"__esModule",{value:!0});_u.isRegex=void 0;var Vq=O(),Kq=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,Vq.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};_u.isRegex=Kq});var wL=v(ty=>{"use strict";Object.defineProperty(ty,"__esModule",{value:!0});ty.isPattern=Jq;var PL=O();function Jq(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,PL.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,PL.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var _L=v(ry=>{"use strict";Object.defineProperty(ry,"__esModule",{value:!0});ry.by=Yq;function Yq(e){return function(t){return e(t,null)}}});var vL=v(oy=>{"use strict";Object.defineProperty(oy,"__esModule",{value:!0});oy.toNumber=Xq;function Xq(e){return typeof e=="number"?e:Number(e)}});var kL=v(ny=>{"use strict";Object.defineProperty(ny,"__esModule",{value:!0});ny.toDate=Zq;function Zq(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var CL=v(sy=>{"use strict";Object.defineProperty(sy,"__esModule",{value:!0});sy.toBoolean=Qq;function Qq(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var TL=v(vu=>{"use strict";Object.defineProperty(vu,"__esModule",{value:!0});vu.isSymbol=void 0;var eV=O(),tV=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,eV.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};vu.isSymbol=tV});var Zn=v(w=>{"use strict";Object.defineProperty(w,"__esModule",{value:!0});w.isDateLike=w.isBooleanLike=w.isNumeric=w.isNonPositiveInteger=w.isNonNegativeInteger=w.isNegativeInteger=w.isPositiveInteger=w.isInteger=w.isNegativeNumber=w.isNonPositiveNumber=w.isPositiveNumber=w.isNonNegativeNumber=w.isNonEmptyString=w.isOmit=w.isPick=w.isPartialOf=w.isObjectWithEachItem=w.isNonNullObject=w.isTuple=w.isNonEmptyArrayWithEachItem=w.isNonEmptyArray=w.isArrayWithEachItem=w.isError=w.isIndexSignature=w.isSet=w.isMap=w.isURLSearchParams=w.isURL=w.isFormData=w.isBlob=w.isFileList=w.isFile=w.isFunction=w.isUnknown=w.isString=w.isNumber=w.isNil=w.isDefined=w.isDate=w.isBoolean=w.isAny=w.BrandSymbols=w.isBranded=w.guardWithTolerance=w.isObject=w.isObjectWith=w.isNestedType=w.isShape=w.isSchema=w.isType=void 0;w.isSymbol=w.toBoolean=w.toDate=w.toNumber=w.by=w.generateTypeGuardError=w.isPattern=w.isRegex=w.isEqualTo=w.isEnum=w.isAsserted=w.isNilOr=w.isUndefinedOr=w.isNullOr=w.isExtensionOf=w.isIntersectionOf=w.isOneOfTypes=w.isOneOf=w.isBigInt=void 0;var rV=Ud();Object.defineProperty(w,"isType",{enumerable:!0,get:function(){return rV.isType}});var iy=fT();Object.defineProperty(w,"isSchema",{enumerable:!0,get:function(){return iy.isSchema}});Object.defineProperty(w,"isShape",{enumerable:!0,get:function(){return iy.isShape}});Object.defineProperty(w,"isNestedType",{enumerable:!0,get:function(){return iy.isNestedType}});var oV=hT();Object.defineProperty(w,"isObjectWith",{enumerable:!0,get:function(){return oV.isObjectWith}});var nV=yT();Object.defineProperty(w,"isObject",{enumerable:!0,get:function(){return nV.isObject}});var sV=ST();Object.defineProperty(w,"guardWithTolerance",{enumerable:!0,get:function(){return sV.guardWithTolerance}});var iV=AT();Object.defineProperty(w,"isBranded",{enumerable:!0,get:function(){return iV.isBranded}});var aV=bT();Object.defineProperty(w,"BrandSymbols",{enumerable:!0,get:function(){return aV.BrandSymbols}});var lV=PT();Object.defineProperty(w,"isAny",{enumerable:!0,get:function(){return lV.isAny}});var cV=wT();Object.defineProperty(w,"isBoolean",{enumerable:!0,get:function(){return cV.isBoolean}});var dV=_T();Object.defineProperty(w,"isDate",{enumerable:!0,get:function(){return dV.isDate}});var uV=_h();Object.defineProperty(w,"isDefined",{enumerable:!0,get:function(){return uV.isDefined}});var pV=$d();Object.defineProperty(w,"isNil",{enumerable:!0,get:function(){return pV.isNil}});var mV=xh();Object.defineProperty(w,"isNumber",{enumerable:!0,get:function(){return mV.isNumber}});var gV=vT();Object.defineProperty(w,"isString",{enumerable:!0,get:function(){return gV.isString}});var fV=kT();Object.defineProperty(w,"isUnknown",{enumerable:!0,get:function(){return fV.isUnknown}});var hV=CT();Object.defineProperty(w,"isFunction",{enumerable:!0,get:function(){return hV.isFunction}});var yV=LT();Object.defineProperty(w,"isFile",{enumerable:!0,get:function(){return yV.isFile}});var SV=ET();Object.defineProperty(w,"isFileList",{enumerable:!0,get:function(){return SV.isFileList}});var AV=xT();Object.defineProperty(w,"isBlob",{enumerable:!0,get:function(){return AV.isBlob}});var bV=OT();Object.defineProperty(w,"isFormData",{enumerable:!0,get:function(){return bV.isFormData}});var PV=NT();Object.defineProperty(w,"isURL",{enumerable:!0,get:function(){return PV.isURL}});var wV=DT();Object.defineProperty(w,"isURLSearchParams",{enumerable:!0,get:function(){return wV.isURLSearchParams}});var _V=jT();Object.defineProperty(w,"isMap",{enumerable:!0,get:function(){return _V.isMap}});var vV=$T();Object.defineProperty(w,"isSet",{enumerable:!0,get:function(){return vV.isSet}});var kV=HT();Object.defineProperty(w,"isIndexSignature",{enumerable:!0,get:function(){return kV.isIndexSignature}});var CV=FT();Object.defineProperty(w,"isError",{enumerable:!0,get:function(){return CV.isError}});var TV=Mh();Object.defineProperty(w,"isArrayWithEachItem",{enumerable:!0,get:function(){return TV.isArrayWithEachItem}});var LV=Nh();Object.defineProperty(w,"isNonEmptyArray",{enumerable:!0,get:function(){return LV.isNonEmptyArray}});var WV=UT();Object.defineProperty(w,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return WV.isNonEmptyArrayWithEachItem}});var EV=GT();Object.defineProperty(w,"isTuple",{enumerable:!0,get:function(){return EV.isTuple}});var RV=Kr();Object.defineProperty(w,"isNonNullObject",{enumerable:!0,get:function(){return RV.isNonNullObject}});var xV=qT();Object.defineProperty(w,"isObjectWithEachItem",{enumerable:!0,get:function(){return xV.isObjectWithEachItem}});var IV=VT();Object.defineProperty(w,"isPartialOf",{enumerable:!0,get:function(){return IV.isPartialOf}});var OV=KT();Object.defineProperty(w,"isPick",{enumerable:!0,get:function(){return OV.isPick}});var MV=JT();Object.defineProperty(w,"isOmit",{enumerable:!0,get:function(){return MV.isOmit}});var NV=YT();Object.defineProperty(w,"isNonEmptyString",{enumerable:!0,get:function(){return NV.isNonEmptyString}});var zV=XT();Object.defineProperty(w,"isNonNegativeNumber",{enumerable:!0,get:function(){return zV.isNonNegativeNumber}});var DV=ZT();Object.defineProperty(w,"isPositiveNumber",{enumerable:!0,get:function(){return DV.isPositiveNumber}});var jV=QT();Object.defineProperty(w,"isNonPositiveNumber",{enumerable:!0,get:function(){return jV.isNonPositiveNumber}});var $V=eL();Object.defineProperty(w,"isNegativeNumber",{enumerable:!0,get:function(){return $V.isNegativeNumber}});var HV=tL();Object.defineProperty(w,"isInteger",{enumerable:!0,get:function(){return HV.isInteger}});var FV=rL();Object.defineProperty(w,"isPositiveInteger",{enumerable:!0,get:function(){return FV.isPositiveInteger}});var UV=oL();Object.defineProperty(w,"isNegativeInteger",{enumerable:!0,get:function(){return UV.isNegativeInteger}});var BV=nL();Object.defineProperty(w,"isNonNegativeInteger",{enumerable:!0,get:function(){return BV.isNonNegativeInteger}});var GV=sL();Object.defineProperty(w,"isNonPositiveInteger",{enumerable:!0,get:function(){return GV.isNonPositiveInteger}});var qV=iL();Object.defineProperty(w,"isNumeric",{enumerable:!0,get:function(){return qV.isNumeric}});var VV=aL();Object.defineProperty(w,"isBooleanLike",{enumerable:!0,get:function(){return VV.isBooleanLike}});var KV=lL();Object.defineProperty(w,"isDateLike",{enumerable:!0,get:function(){return KV.isDateLike}});var JV=cL();Object.defineProperty(w,"isBigInt",{enumerable:!0,get:function(){return JV.isBigInt}});var YV=Gh();Object.defineProperty(w,"isOneOf",{enumerable:!0,get:function(){return YV.isOneOf}});var XV=uL();Object.defineProperty(w,"isOneOfTypes",{enumerable:!0,get:function(){return XV.isOneOfTypes}});var ZV=pL();Object.defineProperty(w,"isIntersectionOf",{enumerable:!0,get:function(){return ZV.isIntersectionOf}});var QV=mL();Object.defineProperty(w,"isExtensionOf",{enumerable:!0,get:function(){return QV.isExtensionOf}});var eK=gL();Object.defineProperty(w,"isNullOr",{enumerable:!0,get:function(){return eK.isNullOr}});var tK=fL();Object.defineProperty(w,"isUndefinedOr",{enumerable:!0,get:function(){return tK.isUndefinedOr}});var rK=hL();Object.defineProperty(w,"isNilOr",{enumerable:!0,get:function(){return rK.isNilOr}});var oK=yL();Object.defineProperty(w,"isAsserted",{enumerable:!0,get:function(){return oK.isAsserted}});var nK=SL();Object.defineProperty(w,"isEnum",{enumerable:!0,get:function(){return nK.isEnum}});var sK=AL();Object.defineProperty(w,"isEqualTo",{enumerable:!0,get:function(){return sK.isEqualTo}});var iK=bL();Object.defineProperty(w,"isRegex",{enumerable:!0,get:function(){return iK.isRegex}});var aK=wL();Object.defineProperty(w,"isPattern",{enumerable:!0,get:function(){return aK.isPattern}});var lK=O();Object.defineProperty(w,"generateTypeGuardError",{enumerable:!0,get:function(){return lK.generateTypeGuardError}});var cK=_L();Object.defineProperty(w,"by",{enumerable:!0,get:function(){return cK.by}});var dK=vL();Object.defineProperty(w,"toNumber",{enumerable:!0,get:function(){return dK.toNumber}});var uK=kL();Object.defineProperty(w,"toDate",{enumerable:!0,get:function(){return uK.toDate}});var pK=CL();Object.defineProperty(w,"toBoolean",{enumerable:!0,get:function(){return pK.toBoolean}});var mK=TL();Object.defineProperty(w,"isSymbol",{enumerable:!0,get:function(){return mK.isSymbol}})});var Qn,LL,gK,WL,EL=l(()=>{"use strict";Qn=g(require("node:path")),LL=require("node:url"),gK=()=>!0,WL=()=>{if(gK()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Qn.default.dirname(Qn.default.resolve(e)):Qn.default.dirname(Qn.default.resolve(__filename))}return Qn.default.dirname((0,LL.fileURLToPath)(__agentWitchImportMetaUrl))}});var ay,RL,D,xL,fK,Jr,T,ku,pr,IL,Cu,es,Tu,ke,wt,ly,Be,cy,M,dy=l(()=>{"use strict";ay=g(require("node:fs")),RL=g(require("node:os")),D=g(require("node:path")),xL=g(Zn());Me();EL();_d();_d();fK=WL(),Jr=e=>e.trim().toLowerCase(),T=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return D.default.resolve(e);let t=D.default.resolve(fK),r=D.default.basename(t),o=D.default.basename(D.default.dirname(t));return r===Ah&&(o===Ut||o===ur)?D.default.dirname(t):r===Ut||r===ur?t:D.default.join(RL.default.homedir(),Ut)},ku=(e=T())=>D.default.join(e,Ah),pr=(e=T())=>D.default.join(ku(e),KC),IL=(e,t,r)=>t!==null?D.default.join(e,tt,t,r):D.default.join(e,r),Cu=e=>IL(e.installDir,e.profileEmail,Ii),es=e=>IL(e.installDir,e.profileEmail,Pt),Tu=e=>e.profileEmail!==null?D.default.join(e.installDir,tt,e.profileEmail,Vr):D.default.join(e.installDir,Vr),ke=(e=T())=>Oi(e),wt=(e=T())=>To(e)?Sd:yd,ly=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Jr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Jr(t):null},Be=(e=T())=>{let t=D.default.join(e,Sh);if(!ay.default.existsSync(t))return null;try{let r=JSON.parse(ay.default.readFileSync(t,"utf8"));if((0,xL.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Jr(r.email)}catch{return null}return null},cy=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Jr(r):null}let t=ly();return t!==null?t:Be()},M=e=>{let t=T(),r=ku(t),o=pr(t),n=cy(e);if(n!==null){let S=D.default.join(t,tt,n),f=D.default.join(S,Ad),y=D.default.join(S,Ii),p=D.default.join(S,Pt),A=D.default.join(S,wd),b=D.default.join(S,Vr),h=D.default.join(S,Pt,Vn),P=D.default.join(S,Pt,Kn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:y,logsDir:p,mainLogPath:h,errorLogPath:P,reportsDir:A,deviceKeypairPath:b,configPath:D.default.join(S,"config.json"),harnessRootDir:f,harnessManifestPath:D.default.join(f,Pd),harnessSetsDir:D.default.join(f,bd)}}let s=D.default.join(t,Ad),i=D.default.join(t,Ii),a=D.default.join(t,Pt),c=D.default.join(t,wd),d=D.default.join(t,Vr),u=D.default.join(t,Pt,Vn),m=D.default.join(t,Pt,Kn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,logsDir:a,mainLogPath:u,errorLogPath:m,reportsDir:c,deviceKeypairPath:d,configPath:D.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:D.default.join(s,Pd),harnessSetsDir:D.default.join(s,bd)}}});var uy,OL,hK,yK,ML,py,NL=l(()=>{"use strict";uy=g(require("node:fs")),OL=g(require("node:path"));Me();dy();hK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yK=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,ML=e=>{let t=OL.default.join(e,Co.wakePort);if(!uy.default.existsSync(t))return null;try{let r=JSON.parse(uy.default.readFileSync(t,"utf8"));if(hK(r)&&yK(r.wakePort))return r.wakePort}catch{return null}return null},py=(e=T())=>ML(e)??wt(e)});var J=l(()=>{"use strict";dy();NL()});var my,gy,Lu=l(()=>{"use strict";my=new Set(["","loginwindow","_mbsetupuser","root"]),gy=5e3});var zL,wK,DL,fy,hy=l(()=>{"use strict";zL=require("node:child_process");Lu();wK=e=>e.trim().toLowerCase(),DL=e=>e==null?!1:!my.has(wK(e)),fy=()=>{if(process.platform!=="darwin")return null;try{let t=(0,zL.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return DL(t)?t:null}catch{return null}}});var $L,jL,_t,Ui=l(()=>{"use strict";$L=g(require("node:os"));hy();jL=e=>e.trim().toLowerCase(),_t=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?fy():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??$L.default.userInfo().username;return jL(r)===jL(o)}});var HL,FL,Ro,UL=l(()=>{"use strict";HL=require("node:child_process"),FL=g(require("node:fs"));J();Ui();Ro=(e=T())=>{let t=pr(e);if(!FL.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!_t())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Be(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,HL.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var BL,Bi,Wu=l(()=>{"use strict";BL=require("node:child_process"),Bi=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,BL.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Eu,yy,GL,oe,Ru,Gi=l(()=>{"use strict";Eu=g(require("node:fs")),yy=g(require("node:path"));J();Me();GL=e=>{let t=yy.default.join(e,tt);return Eu.default.existsSync(t)?Eu.default.readdirSync(t).filter(r=>Eu.default.statSync(yy.default.join(t,r)).isDirectory()).map(r=>Jr(r)).toSorted():[]},oe=(e=T())=>{let t=ke(e),r=GL(e);return[{profileEmail:Be(e)??r[0]??null,launchAgentLabel:t}]},Ru=(e=T())=>GL(e)});var Sy,qL,VL,_K,mr,xu=l(()=>{"use strict";Sy=g(require("node:fs")),qL=g(require("node:os")),VL=g(require("node:path"));J();Gi();_K=()=>VL.default.join(qL.default.homedir(),"Library","LaunchAgents"),mr=(e=T())=>{let t=ke(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of oe(e))r.add(n.launchAgentLabel);let o=_K();if(Sy.default.existsSync(o))for(let n of Sy.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var KL,qi,JL=l(()=>{"use strict";J();Wu();xu();Gi();KL=(e=T())=>{let t=new Set(oe(e).map(r=>r.launchAgentLabel));return mr(e).filter(r=>!t.has(r))},qi=(e=T())=>{for(let t of KL(e))Bi(t)}});var Vi,Ay=l(()=>{"use strict";J();Wu();xu();Vi=(e=T())=>{for(let t of mr(e))Bi(t)}});var YL,XL,vK,xo,ZL=l(()=>{"use strict";YL=require("node:child_process"),XL=require("node:util"),vK=(0,XL.promisify)(YL.execFile),xo=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await vK("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Io,kK,by,Py=l(()=>{"use strict";Io=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kK=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,by=e=>{let t=e.pathValue??kK(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${Io(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${Io(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${Io(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${Io(e.homeDir)}</string>
    <key>PATH</key>
    <string>${Io(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${Io(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${Io(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var Iu,wy=l(()=>{"use strict";Iu=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Oo,_y,Ki,CK,TK,LK,QL,gr,vy=l(()=>{"use strict";Oo=g(require("node:fs")),_y=g(require("node:os")),Ki=g(require("node:path"));Me();J();Py();wy();CK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),TK=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,LK=e=>{let t=Ki.default.join(e,Co.wakePort);if(!Oo.default.existsSync(t))return wt(e);try{let r=JSON.parse(Oo.default.readFileSync(t,"utf8"));if(CK(r)&&TK(r.wakePort))return r.wakePort}catch{return wt(e)}return wt(e)},QL=(e,t=_y.default.homedir())=>Ki.default.join(t,"Library","LaunchAgents",`${e}.plist`),gr=e=>{let t=e.installDir??T(),r=e.homeDir??_y.default.homedir(),o=QL(e.launchAgentLabel,r),n=Oo.default.existsSync(o)?Oo.default.readFileSync(o,"utf8"):null;if(n!==null&&Iu(n))return{ok:!0,rewritten:!1,plistPath:o};let s=by({launchAgentLabel:e.launchAgentLabel,runPath:Ki.default.join(t,VC,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??LK(t)});if(!Iu(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Oo.default.mkdirSync(Ki.default.dirname(o),{recursive:!0}),Oo.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var tW,rW,oW,Ji,WK,EK,eW,Ne,ky=l(()=>{"use strict";tW=require("node:child_process"),rW=g(require("node:fs")),oW=require("node:util");J();vy();Ui();Ji=(0,oW.promisify)(tW.execFile),WK=async e=>{try{return await Ji("launchctl",["print",e]),!0}catch{return!1}},EK=async(e,t,r)=>{await WK(t)&&await Ji("launchctl",["bootout",t]).catch(()=>{}),await Ji("launchctl",["bootstrap",e,r]),await Ji("launchctl",["enable",t])},eW=async e=>{try{return await Ji("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Ne=async(e,t=T())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!_t())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=gr({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await eW(n))return{ok:!0};let i=s.plistPath;if(!rW.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await EK(o,n,i),await eW(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Mo,nW=l(()=>{"use strict";J();ky();Gi();Mo=async(e=T())=>{let t=[];for(let r of oe(e))(await Ne(r.launchAgentLabel,e)).ok&&t.push(r.launchAgentLabel);return t}});var rt,fr,sW=l(()=>{"use strict";Ay();Ui();Lu();rt=e=>{_t()||(Vi(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},fr=(e,t=gy)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{_t()||e()},t);return()=>{clearInterval(r)}}});var ne=l(()=>{"use strict";eT();UL();Wu();JL();Ay();xu();Ui();ZL();nW();ky();vy();wy();Py();Gi();hy();Lu();sW()});var Cy=l(()=>{"use strict";ne()});var iW,aW,Ou,lW,ts,cW,dW,No=l(()=>{"use strict";iW=".agent-witch",aW="memory",Ou="project.json",lW="chunks.ndjson",ts="runs.ndjson",cW="reports",dW=".json"});var uW=l(()=>{"use strict";No()});var pW,Mu,Ty=l(()=>{"use strict";pW=g(require("node:path"));uW();Mu=(e,t)=>pW.default.join(e.trim(),`${t.trim()}${dW}`)});var Yi,mW,gW=l(()=>{"use strict";Yi="agent-witch.js",mW="command"});var Nu=l(()=>{"use strict";gW()});var zo,fW,hW=l(()=>{"use strict";Nu();zo=e=>`'${e.replace(/'/g,"'\\''")}'`,fW=e=>{let t=`${e.installDir.trim()}/${"app"}/${Yi}`,r=[zo("node"),zo(t),"report","write","--key",zo(e.reportKey.trim()),"--agent-run-id",zo(e.agentRunId.trim()),"--status",zo(e.status),"--summary",zo(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",zo(e.details.trim())),r.join(" ")}});var Gt,yW,RK,Ly,zu=l(()=>{"use strict";Ty();hW();Gt={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},yW=e=>e===Gt.COMPLETED||e===Gt.FAILED,RK=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Ly=(e,t)=>{let r=Mu(t.reportsDir,t.reportKey),o=fW({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Gt.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${RK({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var ze=l(()=>{"use strict";Me();J()});var Zi,AW,SW,bW,xK,rs,IK,PW,Qi,ea,Wy,wW,_W,ta=l(()=>{"use strict";Zi=g(require("node:fs")),AW=g(require("node:path"));zu();Ty();ze();SW=50,bW=e=>{let t=M(),r=Mu(t.reportsDir,e);return Zi.default.mkdirSync(AW.default.dirname(r),{recursive:!0}),r},xK=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},rs=e=>{let t=bW(e);if(!Zi.default.existsSync(t))return null;try{let r=JSON.parse(Zi.default.readFileSync(t,"utf8"));return xK(r)?r:null}catch{return null}},IK=(e,t)=>{let r=[...e,t];return r.length>SW?r.slice(r.length-SW):r},PW=e=>{let t=bW(e.reportKey);Zi.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Qi=e=>{let t=rs(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:IK(t?.history??[],o)};return PW(n),n},ea=e=>{let t=rs(e.reportKey);return t!==null?t:Qi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Gt.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},Wy=(e,t)=>{let r=t.trim();if(r.length===0)return rs(e);let o=rs(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return PW(s),s},wW=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},_W=e=>{if(e===null||!yW(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Gt.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var OK,MK,ra,vW,Du,Ey=l(()=>{"use strict";zu();ta();OK=new Set(Object.values(Gt)),MK=e=>OK.has(e),ra=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},vW=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Du=e=>{if(e[0]!=="write")return vW(),1;let r=ra(e,"--key"),o=ra(e,"--agent-run-id"),n=ra(e,"--status"),s=ra(e,"--summary"),i=ra(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!MK(n)?(vW(),1):(Qi({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var ot,Do=l(()=>{"use strict";ot=()=>!0});var Ry,kW,jo,ju=l(()=>{"use strict";Ry=g(require("node:path")),kW=require("node:url");Do();jo=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Ry.default.resolve(t);return ot()?r===Ry.default.resolve(__filename):e===void 0?!1:r===(0,kW.fileURLToPath)(e)}});var $u,os,DK,Bre,ns=l(()=>{"use strict";$u="agent-witch.js",os="deps.tar.gz",DK="install.sh",Bre={mainScript:`app/${$u}`,depsArchive:`app/${os}`,installShell:DK}});var WW=l(()=>{"use strict";ns()});var EW=l(()=>{"use strict";ns();WW()});var oa,Iy,Hu,jK,na,De,is,sa,ia,$o,Oy=l(()=>{"use strict";oa=g(require("node:fs")),Iy=g(require("node:path"));EW();J();Hu="install-version.json",jK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),na=(e=T())=>Iy.default.join(e,Hu),De=(e=T())=>{let t=na(e);if(!oa.default.existsSync(t))return null;try{let r=JSON.parse(oa.default.readFileSync(t,"utf8"));return!jK(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},is=(e,t=T())=>{let r=na(t);oa.default.mkdirSync(Iy.default.dirname(r),{recursive:!0}),oa.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},sa=(e=T())=>De(e)?.bundleVersion??"250",ia=(e,t)=>{let r=De(e);if(r!==null)return r;let o={bundleVersion:"250",appOrigin:t,updatedAt:new Date().toISOString()};return is(o,e),o},$o=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var RW,Ho,My,Ny,zy,Fu,qt,Fo,Dy=l(()=>{"use strict";RW=require("node:crypto"),Ho=g(require("node:fs")),My=g(require("node:path"));J();Ny="self-update-log.ndjson",zy=100,Fu=(e=T())=>{let t=M(),r=t.installDir===e?t.logsDir:es({installDir:e,profileEmail:t.profileEmail});return My.default.join(r,Ny)},qt=(e,t=T())=>{let r={id:(0,RW.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Fu(t);Ho.default.mkdirSync(My.default.dirname(o),{recursive:!0});let n=Ho.default.existsSync(o)?Ho.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-zy+1)),JSON.stringify(r)];return Ho.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Fo=(e=20,t=T())=>{let r=Fu(t);if(!Ho.default.existsSync(r))return[];let o=Ho.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var jy,aoe,$y=l(()=>{"use strict";ns();jy="deps",aoe=`${"app"}/${os}`});var xW=l(()=>{"use strict";$y()});var IW,Yr,Uo,OW,Hy,Fy,MW=l(()=>{"use strict";IW=require("node:child_process"),Yr=g(require("node:fs")),Uo=g(require("node:path"));ns();$y();OW=e=>Uo.default.join(e,"app",jy),Hy=e=>{let t=Uo.default.join(e,"app"),r=Uo.default.join(t,os);Yr.default.existsSync(r)&&(Yr.default.rmSync(OW(e),{recursive:!0,force:!0}),Yr.default.mkdirSync(t,{recursive:!0}),(0,IW.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Yr.default.rmSync(r,{force:!0}))},Fy=e=>{Yr.default.rmSync(Uo.default.join(e,"node_modules"),{recursive:!0,force:!0}),Yr.default.rmSync(Uo.default.join(e,"package.json"),{force:!0}),Yr.default.rmSync(Uo.default.join(e,"package-lock.json"),{force:!0})}});var NW=l(()=>{"use strict";xW();MW()});var vt,Uu,zW=l(()=>{"use strict";vt="https://www.agentwitch.com",Uu="wss://www.agentwitch.com/api/agent-witch/ws"});var aa,hr,DW=l(()=>{"use strict";aa="127.0.0.1",hr=`http://${aa}:43347`});var kt=l(()=>{"use strict";zW();DW()});var la,Bu,jW,By,$K,$W,Vy,HW,Ct,ca,da,Ky,Gy,qy,ua,Jy,Yy,Xy,as=l(()=>{"use strict";la=g(require("node:fs")),Bu=g(require("node:path")),jW="active-writer-work.json",By=new Set,$K=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$W=e=>e.profileEmail===null?Bu.default.join(e.installDir,jW):Bu.default.join(e.installDir,"profiles",e.profileEmail,jW),Vy=e=>{let t=$W(e);if(!la.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(la.default.readFileSync(t,"utf8"));return!$K(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string"?{activeCount:0,updatedAt:new Date(0).toISOString()}:{activeCount:Math.max(0,Math.floor(r.activeCount)),updatedAt:r.updatedAt}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},HW=(e,t)=>{let r=$W(e);la.default.mkdirSync(Bu.default.dirname(r),{recursive:!0}),la.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Ct=e=>Vy(e).activeCount>0,ca=e=>{let t=Vy(e);HW(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString()})},da=e=>{let t=Vy(e),r=Math.max(0,t.activeCount-1);if(HW(e,{activeCount:r,updatedAt:new Date().toISOString()}),r===0)for(let o of By)o()},Ky=e=>(By.add(e),()=>{By.delete(e)}),Gy=null,qy=null,ua=e=>{Gy=e},Jy=e=>{qy=e},Yy=()=>{let e=Gy;return Gy=null,e},Xy=()=>{let e=qy;return qy=null,e}});var Ce,Gu=l(()=>{"use strict";Ce=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var ls,qu,pa,Zy=l(()=>{"use strict";ls="qwen2.5:7b",qu="nomic-embed-text",pa="Install Ollama from https://ollama.com/download"});var ma,Qy,Vu=l(()=>{"use strict";Zy();ma=()=>`
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
    echo "Ollama is missing. ${pa}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${pa}" >&2
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
  agent_witch_ensure_ollama_model "${ls}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${qu}" "\${pull_log}"
}
`,Qy=()=>`
${ma()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var FW,HK,Ku,eS=l(()=>{"use strict";FW=require("node:child_process");J();Vu();HK=e=>new Promise(t=>{let r=(0,FW.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:T()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Ku=async(e=HK)=>{let t=`${ma()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var Xr,Ju,UW,FK,BW,ds,UK,BK,GK,cs,Bo,Go,GW=l(()=>{"use strict";Xr=g(require("node:fs")),Ju=g(require("node:path"));NW();ne();J();ns();kt();Oy();as();Gu();Dy();eS();UW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),FK=e=>{let t=Be(e),r=t===null?M():M(t);if(!Xr.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Xr.default.readFileSync(r.configPath,"utf8"));return!UW(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},BW=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!UW(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},ds=async e=>(await BW(e))?.bundleVersion??null,UK=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Ju.default.join(t,r);Xr.default.mkdirSync(Ju.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());Xr.default.writeFileSync(n,s),r.endsWith(".js")&&Xr.default.chmodSync(n,493)},BK=async()=>{qi(),await Mo()},GK=(e,t)=>e!==null?Ce(e):t??vt,cs=(e,t)=>({localBundleVersion:t,...e}),Bo=async e=>{let t=T(),r=De(t),o=r?.bundleVersion??null,n=await Ku();qt({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=FK(t),i=GK(s,r?.appOrigin);if(i===null){let d=cs({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return qt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await BW(i);if(a===null){let d=cs({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return qt({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||$o(o,a.bundleVersion))){let d=cs({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return qt({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let S of a.scripts)await UK(i,t,S);let d=Ju.default.join(t,$u);Xr.default.existsSync(d)&&Xr.default.rmSync(d,{force:!0}),Hy(t),Fy(t),is({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=M(Be(t));if(Ct(u)){let S=cs({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return qt({event:"update_applied",ok:!0,message:S.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),S}await BK();let m=cs({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return qt({event:"update_applied",ok:!0,message:m.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}catch(d){let u=d instanceof Error?d.message:"Agent Witch self-update failed.",m=cs({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},o);return qt({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},Go=()=>{let e=T();return{local:De(e),logs:Fo(20,e)}}});var qW={};Ft(qW,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>Hu,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>pa,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>qu,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>ls,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Ny,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>zy,appendAgentWitchSelfUpdateLog:()=>qt,buildAgentWitchEnsureOllamaShell:()=>ma,buildAgentWitchInstallScriptOllama:()=>Qy,buildAgentWitchSelfUpdateStatus:()=>Go,ensureAgentWitchInstallVersionRecorded:()=>ia,ensureAgentWitchOllamaInstalled:()=>Ku,fetchAgentWitchRemoteInstallBundleVersion:()=>ds,isRemoteAgentWitchBundleVersionNewer:()=>$o,readAgentWitchInstallVersion:()=>De,readAgentWitchSelfUpdateLogs:()=>Fo,resolveAgentWitchAppOriginFromWsUrl:()=>Ce,resolveAgentWitchHeartbeatInstallBundleVersion:()=>sa,resolveAgentWitchInstallVersionPath:()=>na,resolveAgentWitchSelfUpdateLogPath:()=>Fu,runAgentWitchSelfUpdate:()=>Bo,writeAgentWitchInstallVersion:()=>is});var Vt=l(()=>{"use strict";Oy();Dy();GW();Gu();Zy();Vu();eS()});var tS={};Ft(tS,{buildAgentWitchSelfUpdateStatus:()=>Go,fetchAgentWitchRemoteInstallBundleVersion:()=>ds,runAgentWitchSelfUpdate:()=>Bo});var rS=l(()=>{"use strict";Vt()});function us(e){return(0,VW.createHash)("sha256").update(e.trim()).digest("hex")}var VW,Yu=l(()=>{"use strict";VW=require("node:crypto")});var ps,ga,qK,ms,oS,Xu=l(()=>{"use strict";ps=g(require("node:fs")),ga=g(require("node:path"));Yu();ze();qK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ms=e=>{if(!ps.default.existsSync(e))return null;try{let t=JSON.parse(ps.default.readFileSync(e,"utf8"));return!qK(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:us(t.pairingToken.trim())}catch{return null}},oS=(e=T())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(ms(ga.default.join(e,"config.json")));let n=ga.default.join(e,tt);if(!ps.default.existsSync(n))return t;for(let s of ps.default.readdirSync(n)){let i=ga.default.join(n,s);ps.default.statSync(i).isDirectory()&&o(ms(ga.default.join(i,"config.json")))}return t}});var gs,fa=l(()=>{"use strict";gs="connection-health.json"});var qo,Zu,VK,ha,fe,nS,Qu,Te,ep=l(()=>{"use strict";qo=g(require("node:fs")),Zu=g(require("node:path"));fa();VK=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ha=e=>e.profileEmail===null?Zu.default.join(e.installDir,gs):Zu.default.join(e.installDir,"profiles",e.profileEmail,gs),fe=e=>{let t=ha(e);if(!qo.default.existsSync(t))return null;try{let r=JSON.parse(qo.default.readFileSync(t,"utf8"));return!VK(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},nS=e=>{let t=ha(e);qo.default.existsSync(t)&&qo.default.rmSync(t,{force:!0})},Qu=(e,t)=>{let r=ha(e),o=fe(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};qo.default.mkdirSync(Zu.default.dirname(r),{recursive:!0}),qo.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Te=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var ya,KW=l(()=>{"use strict";fa();ep();ya=(e,t)=>{if(!t.socketOpen)return!1;let r=fe(e);return r===null?!1:!Te(r,t.staleAfterMs??12e4,t.nowMs)}});var sS,JW=l(()=>{"use strict";ep();sS=(e,t)=>!(e!==null&&!Te(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Vo=l(()=>{"use strict";ep();KW();JW();fa()});var tp,iS,KK,JK,YW,XW=l(()=>{"use strict";tp=g(require("node:fs")),iS=g(require("node:path"));J();Me();Vo();Xu();KK=12e4,JK=e=>{let t=iS.default.join(e,tt);return tp.default.existsSync(t)?tp.default.readdirSync(t).filter(r=>tp.default.statSync(iS.default.join(t,r)).isDirectory()):[]},YW=(e=T())=>{let t=null,r=-1;for(let o of JK(e)){let n=M(o),s=fe(n);if(s===null||Te(s,KK))continue;let i=ms(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var aS,ZW,rp,Sa,Aa,YK,XK,ZK,QW,pe,me,op,Kt,Tt=l(()=>{"use strict";aS=g(require("node:fs")),ZW=g(require("node:os")),rp=g(require("node:path")),Sa={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Aa=e=>e.trim().length>0,YK=e=>{let t=rp.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},XK=()=>{let e=ZW.default.homedir(),t=rp.default.join(e,".local","bin","agent");if(aS.default.existsSync(t))return t;let r=rp.default.join(e,".local","bin","cursor-agent");return aS.default.existsSync(r)?r:Sa.cursorCommand},ZK=e=>{let t=e.trim();return!Aa(t)||t===Sa.cursorCommand?XK():t},QW=(e,t)=>YK(e)?t:["agent",...t],pe=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",me=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Aa(t)?t.trim():Sa.claudeCommand,codexCommand:Aa(r)?r.trim():Sa.codexCommand,cursorCommand:ZK(o),antigravityCommand:Aa(n)?n.trim():Sa.antigravityCommand}},op=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:QW(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Kt=(e,t,r,o)=>{let n=t.trim();if(!Aa(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:QW(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",n]}}});var Zr,QK,Ko,e4,fs,ba=l(()=>{"use strict";Zr=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,QK=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:Zr(s.inputTokens)+Zr(s.outputTokens)+Zr(s.cacheReadInputTokens)+Zr(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Ko=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=Zr(a.input_tokens)+Zr(a.cache_creation_input_tokens)+Zr(a.cache_read_input_tokens),d=Zr(a.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:QK(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},e4=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),fs=(e,t)=>{let r=Ko(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??e4(r)}}});var lS,t4,r4,cS,dS=l(()=>{"use strict";lS=e=>e.toLocaleString("en-US"),t4=e=>e<.01?e.toFixed(4):e.toFixed(3),r4=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${t4(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${lS(e.inputTokens)} in / ${lS(e.outputTokens)} out (${lS(e.totalTokens)} total)`,t].join(`
`)},cS=(e,t)=>{if(t===void 0)return e;let r=r4(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var np,uS=l(()=>{"use strict";np={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Jo,pS,sp,mS=l(()=>{"use strict";uS();Jo="auto",pS=e=>({value:Jo,label:`Auto (${np[e]})`}),sp={anthropic:[pS("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[pS("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[pS("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var hs,Pa,ip,ys=l(()=>{"use strict";uS();mS();hs=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Jo))return t},Pa=(e,t)=>{let r=hs(t);return r===void 0?np[e]:r},ip=e=>{let t=hs(e);return t===void 0?Jo:t}});var ap,o4,n4,lp,eE=l(()=>{"use strict";ap={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},o4=e=>{let t=ap[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?ap["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?ap["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?ap["gemini-2.0-flash"]:null},n4=(e,t,r)=>{let o=o4(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},lp=e=>{let t=n4(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Ss,s4,i4,a4,cp,tE=l(()=>{"use strict";eE();Ss=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),s4=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Ss(r.input_tokens),n=Ss(r.output_tokens);return o===0&&n===0?null:lp({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},i4=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Ss(r.prompt_tokens),n=Ss(r.completion_tokens);return o===0&&n===0?null:lp({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},a4=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=Ss(r.promptTokenCount),n=Ss(r.candidatesTokenCount);return o===0&&n===0?null:lp({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},cp=(e,t,r)=>e==="anthropic"?s4(t,r):e==="openai"?i4(t,r):a4(t,r)});var l4,gS,c4,d4,u4,p4,m4,fS,hS=l(()=>{"use strict";ys();tE();l4=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},gS=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Pa(e,t.model)},c4=async e=>{let t=gS("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=l4(o);n.length>0&&e.onChunk?.(n);let s=cp("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},d4=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},u4=async e=>{let t=gS("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=d4(o);n.length>0&&e.onChunk?.(n);let s=cp("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},p4=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},m4=async e=>{let t=gS("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=p4(n);s.length>0&&e.onChunk?.(s);let i=cp("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},fS=async e=>{try{return e.provider==="anthropic"?await c4(e):e.provider==="openai"?await u4(e):await m4(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var nt,wa=l(()=>{"use strict";nt=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var rE,g4,dp,yS=l(()=>{"use strict";rE=g(require("node:path")),g4="writer-api-secrets.json",dp=e=>rE.default.join(e,g4)});var SS,oE,f4,Qr,Ke,eo=l(()=>{"use strict";SS=g(require("node:fs"));ys();yS();oE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),f4=e=>{if(!oE(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=hs(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},Qr=e=>{let t=dp(e);if(!SS.default.existsSync(t))return{};try{let r=JSON.parse(SS.default.readFileSync(t,"utf8"));if(!oE(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=f4(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Ke=(e,t)=>Qr(e)[t]??null});var je,_a=l(()=>{"use strict";je=e=>e==="api"?"api":"cli"});var nE,We,Yo,yr=l(()=>{"use strict";nE=g(require("node:path"));wa();eo();_a();We=e=>nE.default.dirname(e),Yo=(e,t)=>{if(je(e.writerExecutionBackend)!=="api")return!1;let r=nt(t);if(r===null)return!1;let o=We(e.layout.configPath),n=Ke(o,r);return n!==null&&n.apiKey.length>0}});var va,AS=l(()=>{"use strict";dS();hS();wa();eo();yr();va=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=nt(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=We(e.layout.configPath),a=Ke(i,s);if(a===null){let d=Object.keys(Qr(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await fS({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:cS(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var sE,As,bS=l(()=>{"use strict";sE=require("node:child_process");Tt();ba();AS();yr();As=(e,t,r)=>new Promise(o=>{if(!pe(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Yo(e,t)){va(e,t,r).then(o);return}let n=Kt(t,r,me({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,sE.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=fs(i.join("")),u=a.join("").trim(),m=[d.output.trim(),u].filter(S=>S.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var iE=l(()=>{"use strict"});var aE=l(()=>{"use strict";dS();bS();hS();iE();eo();yr()});var lE,cE,dE,uE=l(()=>{"use strict";lE="claude",cE="codex",dE="cursor"});var pE,h4,PS,ka,up=l(()=>{"use strict";pE=g(require("node:path"));kt();Me();h4="ws://localhost:3000/api/agent-witch/ws",PS=e=>e.replace(/\/$/,""),ka=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return PS(t);let r=pE.default.basename(e.installDir);if(r===xi.production)return Uu;let o=e.configWsUrl?.trim()??"";return r===xi.localhost?o.length>0?PS(o):h4:o.length>0?PS(o):Uu}});var S4,wS,_S=l(()=>{"use strict";uE();up();_a();S4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wS=e=>{if(!S4(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=ka({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??lE,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??cE,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??dE,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:je(t.writerExecutionBackend),layout:e.layout}}}});var vS,kS,CS=l(()=>{"use strict";vS=g(require("node:fs"));J();_S();kS=e=>{let t=M(e);if(!vS.default.existsSync(t.configPath))return null;try{let r=JSON.parse(vS.default.readFileSync(t.configPath,"utf8")),o=wS({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Ca,mE=l(()=>{"use strict";Ca=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var TS,A4,LS,gE=l(()=>{"use strict";TS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),A4=e=>{if(!TS(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!TS(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(m=>{if(!TS(m))return[];let S=typeof m.itemKey=="string"?m.itemKey.trim():"",f=typeof m.relativePath=="string"?m.relativePath:"",y=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return S.length===0||y.length===0?[]:[{itemKey:S,relativePath:f,contentSha256:y}]});return u.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},LS=A4});var fE,b4,pp,WS=l(()=>{"use strict";fE=g(require("node:path")),b4=(e,t)=>{let r=t.trim();return fE.default.join(e,"components","store",r.slice(0,2),r)},pp=b4});var hE,P4,ES,yE=l(()=>{"use strict";hE=g(require("node:fs"));WS();P4=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=pp(e.installDir,n.contentSha256);hE.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this Mac. Open Harness to sync, then retry.`},ES=P4});var Ta,bs,w4,RS,_4,xS,IS=l(()=>{"use strict";Ta=g(require("node:fs")),bs=g(require("node:path"));WS();w4=(e,t)=>bs.default.join(e.installDir,"runs",t,"overlay"),RS=(e,t)=>bs.default.join(w4(e,t),".cursor"),_4=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=RS(e,t);Ta.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=pp(e.installDir,i.contentSha256);if(!Ta.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this Mac."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?bs.default.join(n,c):bs.default.join(n,i.itemKey);Ta.default.mkdirSync(bs.default.dirname(d),{recursive:!0}),Ta.default.copyFileSync(a,d)}return{ok:!0}},xS=_4});var OS,SE,v4,La,AE=l(()=>{"use strict";OS=g(require("node:fs")),SE=g(require("node:path")),v4=(e,t)=>{let r=SE.default.join(e.installDir,"runs",t);OS.default.existsSync(r)&&OS.default.rmSync(r,{recursive:!0,force:!0})},La=v4});var k4,MS,bE=l(()=>{"use strict";IS();k4=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=RS(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},MS=k4});var NS,C4,T4,L4,W4,E4,H,PE=l(()=>{"use strict";NS=g(require("node:fs"));up();J();_a();C4="claude",T4="codex",L4="cursor",W4="agy",E4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H=()=>{let e=M();if(!NS.default.existsSync(e.configPath))return null;try{let t=JSON.parse(NS.default.readFileSync(e.configPath,"utf8"));if(!E4(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=ka({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:je(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:C4,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:T4,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:L4,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:W4,pairingToken:s,layout:e}}catch{return null}}});var mp,wE,_E=l(()=>{"use strict";mp=g(require("node:fs"));yS();wE=(e,t)=>{let r=dp(e);mp.default.mkdirSync(e,{recursive:!0}),mp.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{mp.default.chmodSync(r,384)}catch{}}});var Wa,vE,gp=l(()=>{"use strict";Wa=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},vE=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Wa(t)}});var Ea,R4,zS,DS,kE=l(()=>{"use strict";Ea=g(require("node:fs"));eo();_E();gp();ys();yr();R4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zS=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=vE(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?hs(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},DS=e=>{let t=We(e.configPath),r={};if(Ea.default.existsSync(e.configPath))try{let n=JSON.parse(Ea.default.readFileSync(e.configPath,"utf8"));R4(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Ea.default.mkdirSync(t,{recursive:!0}),Ea.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=zS(zS(zS(Qr(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);wE(t,o)}});var fp,jS=l(()=>{"use strict";fp={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var $S,CE=l(()=>{"use strict";wa();eo();yr();yr();$S=(e,t)=>{if(Yo(e,t))return!1;let r=nt(t);if(r===null)return!1;let o=We(e.layout.configPath),n=Ke(o,r);return n===null||n.apiKey.trim().length===0}});var TE,HS,FS=l(()=>{"use strict";TE=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},HS=async e=>{let t=TE(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=TE(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var x4,US,LE=l(()=>{"use strict";ne();CS();FS();x4=1e4,US=()=>HS({listProfileEmails:Ru,readConfig:kS,pollIntervalMs:x4,logWaiting:e=>{console.error(e)}})});var ge=l(()=>{"use strict";bS();aE();CS();up();mE();gE();yE();IS();AE();bE();_a();PE();kE();eo();yr();gp();ys();jS();AS();yr();CE();wa();eo();LE();_S();FS()});var WE,BS,EE=l(()=>{"use strict";WE=g(require("node:path"));J();Me();XW();Yu();Xu();ge();BS=(e=T())=>{let t=YW(e);if(t!==null)return t;let r=Be(e);if(r!==null){let n=ms(WE.default.join(e,tt,r,"config.json"));if(n!==null)return n}let o=H()?.pairingToken.trim()??"";return o.length===0?null:us(o)}});var hp,RE,I4,O4,xE,yp,Ra,Sp,xa=l(()=>{"use strict";hp=g(require("node:fs")),RE=g(require("node:path")),I4="wake-port.json",O4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xE=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,yp=e=>RE.default.join(e,I4),Ra=e=>{let t=yp(e);if(!hp.default.existsSync(t))return null;try{let r=JSON.parse(hp.default.readFileSync(t,"utf8"));if(O4(r)&&xE(r.wakePort))return r.wakePort}catch{return null}return null},Sp=(e,t)=>{if(!xE(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=yp(e);hp.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var qie,Vie,Kie,Lt,IE,Ia=l(()=>{"use strict";xa();ze();xa();qie=wt(),Vie=`${ke()}-wake`,Kie=ke(),Lt=()=>{let e=T(),t=Ra(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let o=Number.parseInt(r,10);if(Number.isFinite(o)&&o>0&&o<=65535)return o}return wt()},IE=e=>{let t=T();Ra(t)===null&&Sp(t,e)}});var OE=l(()=>{"use strict";Yu();ne();Xu();EE();ge();Ia()});var GS,Oa,Ma,ME=l(()=>{"use strict";GS=g(require("node:os"));OE();Oa=()=>{let e=oe();return{ok:!0,port:Lt(),hostname:GS.default.hostname(),profileCount:e.length}},Ma=()=>{let e=oe(),t=BS(),r=oS();return{hostname:GS.default.hostname(),port:Lt(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var qS=l(()=>{"use strict";ME()});var NE,zE,DE,Ap,Ps=l(()=>{"use strict";NE="materialization.json",zE="backups",DE=".gitignore",Ap=e=>`harness-set:${e.trim()}`});var jE,$E,bp,HE=l(()=>{"use strict";jE=g(require("node:crypto")),$E=g(require("node:fs")),bp=e=>{try{let t=$E.default.readFileSync(e);return jE.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var to,Xo,M4,FE,VS,UE=l(()=>{"use strict";to=g(require("node:fs")),Xo=g(require("node:path"));HE();M4=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Xo.default.join(t,n,o);return to.default.mkdirSync(Xo.default.dirname(s),{recursive:!0}),to.default.copyFileSync(r,s),Xo.default.relative(e,s).replaceAll("\\","/")},FE=e=>{let t=Xo.default.join(e.repoRoot,e.repoRelativeDestination),r=bp(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(to.default.existsSync(t)){let n=bp(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=M4(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return to.default.mkdirSync(Xo.default.dirname(t),{recursive:!0}),to.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return to.default.mkdirSync(Xo.default.dirname(t),{recursive:!0}),to.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},VS=e=>{let t=bp(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var KS,BE,Pp,JS=l(()=>{"use strict";KS=g(require("node:fs"));Ps();BE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Pp=e=>{if(!KS.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(KS.default.readFileSync(e,"utf8"));if(BE(t)&&t.version===1&&BE(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var ro,wp,GE,qE=l(()=>{"use strict";ro=g(require("node:fs")),wp=g(require("node:path"));Ps();GE=e=>{let t=new Set(e.setSlugs.map(s=>Ap(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=wp.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=wp.default.join(e.repoRoot,i.backupPath);ro.default.existsSync(c)?(ro.default.mkdirSync(wp.default.dirname(a),{recursive:!0}),ro.default.copyFileSync(c,a),o.push(s)):ro.default.existsSync(a)&&ro.default.rmSync(a,{force:!0})}else ro.default.existsSync(a)&&ro.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var YS,_p,XS=l(()=>{"use strict";YS=g(require("node:path"));Ps();_p=e=>({ledgerFilePath:YS.default.join(e.metaDirPath,NE),backupsDirPath:YS.default.join(e.metaDirPath,zE)})});var ZS,VE,KE=l(()=>{"use strict";ZS=g(require("node:path")),VE=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return ZS.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return ZS.default.posix.join(s,e,n)}});var QS,JE,eA,YE=l(()=>{"use strict";QS=g(require("node:fs")),JE=g(require("node:path")),eA=(e,t)=>{QS.default.mkdirSync(JE.default.dirname(e),{recursive:!0}),QS.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var tA,N4,pt,ws=l(()=>{"use strict";tA=g(require("node:os")),N4=e=>{let t=e.trim();return t.startsWith("~/")?`${tA.default.homedir()}${t.slice(1)}`:t==="~"?tA.default.homedir():t},pt=N4});var vp,XE,z4,ZE,QE=l(()=>{"use strict";vp=g(require("node:fs")),XE=g(require("node:path"));Ps();No();z4=`*
!${Ou}
`,ZE=e=>{let t=XE.default.join(e,DE);vp.default.existsSync(t)||(vp.default.mkdirSync(e,{recursive:!0}),vp.default.writeFileSync(t,z4))}});var Zo,mt,Qo=l(()=>{"use strict";Zo=g(require("node:path"));No();ws();mt=e=>{let t=pt(e),r=Zo.default.join(t,iW);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Zo.default.join(r,"rag"),memoryDirPath:Zo.default.join(r,aW),reportsDirPath:Zo.default.join(r,cW),metaFilePath:Zo.default.join(r,Ou),ragChunksFilePath:Zo.default.join(r,"rag",lW)}}});var Jt,tR,D4,j4,st,rA=l(()=>{"use strict";Jt=g(require("node:fs")),tR=g(require("node:path"));No();QE();Qo();D4=(e,t)=>{if(Jt.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Jt.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},j4=e=>{Jt.default.existsSync(e.ragChunksFilePath)||Jt.default.writeFileSync(e.ragChunksFilePath,"");let t=tR.default.join(e.memoryDirPath,ts);Jt.default.existsSync(t)||Jt.default.writeFileSync(t,"")},st=e=>{let t=mt(e.projectFolderPath);return Jt.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Jt.default.mkdirSync(t.ragDirPath,{recursive:!0}),Jt.default.mkdirSync(t.memoryDirPath,{recursive:!0}),ZE(t.metaDirPath),D4(t,e),j4(t),{ok:!0,layout:t}}});var rR,oR,nR,sR,kp,Cp=l(()=>{"use strict";rR="components",oR="store",nR="versions",sR="installed.json",kp=e=>`harness-set:${e.trim()}`});var oA,iR,Tp,nA=l(()=>{"use strict";oA=g(require("node:fs")),iR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Tp=e=>{if(!oA.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(oA.default.readFileSync(e,"utf8"));if(iR(t)&&t.version===1&&iR(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var za,_s,Lp=l(()=>{"use strict";za=g(require("node:path"));Cp();_s=e=>{let t=za.default.join(e,rR);return{componentsRootDir:t,storeDir:za.default.join(t,oR),versionsDir:za.default.join(t,nR),installedFilePath:za.default.join(t,sR)}}});var sA,aR,Wp,Ep,Rp=l(()=>{"use strict";sA=g(require("node:crypto")),aR=g(require("node:fs")),Wp=e=>sA.default.createHash("sha256").update(e,"utf8").digest("hex"),Ep=e=>{try{let t=aR.default.readFileSync(e);return sA.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var iA,lR,cR,dR=l(()=>{"use strict";iA=g(require("node:fs")),lR=g(require("node:path")),cR=(e,t)=>{iA.default.mkdirSync(lR.default.dirname(e),{recursive:!0}),iA.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var aA,lA,uR,pR=l(()=>{"use strict";aA=g(require("node:fs")),lA=g(require("node:path")),uR=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=lA.default.join(e,r),n=lA.default.join(o,`${t.versionId}.json`);aA.default.mkdirSync(o,{recursive:!0}),aA.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var xp,mR,gR,fR=l(()=>{"use strict";xp=g(require("node:fs")),mR=g(require("node:path"));Rp();gR=e=>{let t=Wp(e.content),r=mR.default.join(e.storeDir,t);return xp.default.existsSync(r)||(xp.default.mkdirSync(e.storeDir,{recursive:!0}),xp.default.writeFileSync(r,e.content)),t}});var cA,hR,$4,Ip,dA=l(()=>{"use strict";cA=g(require("node:fs")),hR=g(require("node:path"));Cp();nA();Lp();Rp();dR();pR();fR();$4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ip=e=>{let t=_s(e.installDir),r=kp(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!$4(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=hR.default.join(e.harnessRootDir,a);if(!cA.default.existsSync(c))continue;let d=cA.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Ep(c);if(u!==null){if(Wp(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);gR({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:u})}}if(n.length===0)return;uR(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=Tp(t.installedFilePath);cR(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var pA,uA,yR,SR=l(()=>{"use strict";pA=g(require("node:fs"));dA();nA();Lp();uA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yR=e=>{if(!pA.default.existsSync(e.harnessManifestPath))return;let t=_s(e.installDir),r=Tp(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(pA.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!uA(o)||o.version!==1||!uA(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!uA(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Ip({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var mA,AR,bR,PR=l(()=>{"use strict";mA=g(require("node:fs")),AR=g(require("node:path")),bR=e=>{let t=e.componentId.replaceAll("/","_"),r=AR.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!mA.default.existsSync(r))return null;try{let o=JSON.parse(mA.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Op,Mp,wR,_R=l(()=>{"use strict";Op=g(require("node:fs")),Mp=g(require("node:path"));Cp();SR();PR();Lp();Rp();wR=e=>{yR({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=_s(e.layout.installDir),r=kp(e.setSlug),o=bR({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Mp.default.join(t.storeDir,i.contentSha256);if(Op.default.existsSync(a)&&Ep(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Mp.default.join(e.layout.harnessRootDir,n):Mp.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Op.default.existsSync(s))return null;try{if(!Op.default.statSync(s).isFile())return null}catch{return null}return s}});var vR,H4,F4,oo,Np=l(()=>{"use strict";JS();XS();Qo();vR="harness-set:",H4=e=>{let t=e.trim();if(!t.startsWith(vR))return null;let r=t.slice(vR.length).trim();return r.length>0?r:null},F4=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=H4(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},oo=e=>{let t=mt(e),{ledgerFilePath:r}=_p(t),o=Pp(r);return F4(o)}});var zp,gA,Da,U4,Sr,ja,vs=l(()=>{"use strict";zp=g(require("node:fs")),gA=g(require("node:os")),Da=g(require("node:path")),U4=()=>zp.default.realpathSync(Da.default.resolve(gA.default.homedir())),Sr=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Da.default.join(gA.default.homedir(),t.slice(1)):t,o;try{o=zp.default.realpathSync(Da.default.resolve(r))}catch{return null}let n=U4();return o===n||o.startsWith(`${n}${Da.default.sep}`)?o:null},ja=e=>{let t=Sr(e);if(t===null)return null;try{if(!zp.default.statSync(t).isFile())return null}catch{return null}return t}});var fA,hA=l(()=>{"use strict";fA=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var jp,kR,Dp,B4,$a,yA=l(()=>{"use strict";jp=g(require("node:fs")),kR=g(require("node:path"));Ps();UE();JS();qE();XS();KE();YE();ws();rA();_R();Np();vs();hA();Dp=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B4=e=>{if(!jp.default.existsSync(e))return null;try{let t=JSON.parse(jp.default.readFileSync(e,"utf8"));if(Dp(t)&&t.version===1)return t}catch{return null}return null},$a=e=>{let t=[...new Set(e.setSlugs.map(b=>b.trim()).filter(b=>b.length>0))],r=pt(e.projectFolderPath),o=Sr(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=jp.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=st({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=_p(s.layout),d=oo(o).filter(b=>!t.includes(b)),u=Pp(i),m=0;if(d.length>0){let b=GE({repoRoot:o,setSlugs:d,ledger:u});u=b.ledger,m=b.summary.removedPaths.length}if(t.length===0)return eA(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let S=B4(e.layout.harnessManifestPath);if(S===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let f=Dp(S.sets)?S.sets:{},y=0,p=0,A=0;for(let b of t){let h=f[b];if(!Dp(h))return{ok:!1,errorMessage:`Harness set "${b}" is not installed locally.`};let P=typeof h.version=="number"?String(h.version):"1",_=Ap(b),k=Array.isArray(h.items)?h.items:[];for(let C of k){if(!Dp(C))continue;let L=typeof C.path=="string"?C.path.trim():"";if(L.length===0)continue;let R=fA(L);if(R===null)continue;let I=VE(b,R),N=kR.default.posix.join(".cursor",I).replaceAll("\\","/"),U=typeof C.id=="string"?C.id.trim():"",G=wR({layout:e.layout,setSlug:b,setVersion:typeof h.version=="number"?h.version:1,manifestItemPath:L,manifestItemId:U});if(G===null)continue;let q=FE({repoRoot:o,backupsDir:a,repoRelativeDestination:N,sourceAbsolutePath:G,componentId:_,versionId:P,ledger:u});if(q.kind==="skipped_unchanged"){p+=1;continue}if(q.kind==="backed_up_user_file"){A+=1,y+=1,u={version:1,entries:{...u.entries,[N]:VS({componentId:_,versionId:P,sourceAbsolutePath:G,backupPath:q.backupPath})}};continue}y+=1,u={version:1,entries:{...u.entries,[N]:VS({componentId:_,versionId:P,sourceAbsolutePath:G})}}}}return y===0&&p===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(eA(i,u),{ok:!0,writtenFileCount:y,skippedFileCount:p,backedUpFileCount:A,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var CR,$p,G4,q4,V4,K4,J4,Y4,X4,Z4,Q4,Ha,Hp=l(()=>{"use strict";CR=g(require("node:crypto")),$p=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},G4=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},q4=(e,t)=>{let r=G4(t),o=$p(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},V4=(e,t,r)=>{let o=q4(t,r);return`shared/items/${e}/${o}`},K4=["rules","skills","commands","instructions","agents"],J4=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),Y4=(e,t)=>[...e.filter(o=>o.id!==t.id),t],X4=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},Z4=e=>CR.default.createHash("sha256").update(e,"utf8").digest("hex"),Q4=e=>({id:e.id,kind:e.kind,title:e.title,path:V4(e.id,e.kind,e.title),contentSha256:Z4(e.content)}),Ha=e=>{let t=new Date().toISOString(),r=e.existingManifest??J4(e.hostname,t),o=$p(e.bundle.slug),n=X4(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...K4.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let m=Q4(u);return{files:[...d.files,{relativePath:m.path,content:u.content}],nextItems:Y4(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var no,TR,Fp,e8,en,SA=l(()=>{"use strict";no=g(require("node:fs")),TR=g(require("node:os")),Fp=g(require("node:path"));Hp();e8=e=>{if(!no.default.existsSync(e))return null;try{let t=JSON.parse(no.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},en=e=>{try{let t=e8(e.layout.harnessManifestPath),r=Ha({bundle:e.bundle,hostname:TR.default.hostname(),existingManifest:t});no.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)no.default.mkdirSync(Fp.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Fp.default.join(e.layout.harnessRootDir,o.relativePath);no.default.mkdirSync(Fp.default.dirname(n),{recursive:!0}),no.default.writeFileSync(n,o.content)}return no.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var AA,LR=l(()=>{"use strict";SA();yA();AA=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=en({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return $a({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var WR,ER=l(()=>{"use strict";WR=["rule","skill","command","instruction","agent"]});var RR,t8,r8,Yt,bA=l(()=>{"use strict";ER();RR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),t8=e=>typeof e=="string"&&WR.includes(e),r8=e=>{if(!RR(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!t8(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Yt=e=>{if(!RR(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=r8(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var xR,o8,PA,IR=l(()=>{"use strict";xR=require("node:zlib");bA();o8="x-agent-witch-token",PA=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[o8]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,xR.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Yt(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var _A,wA,so,OR=l(()=>{"use strict";_A=g(require("node:fs")),wA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),so=e=>{if(!_A.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(_A.default.readFileSync(e.harnessManifestPath,"utf8"));if(!wA(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=wA(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!wA(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Up,MR=l(()=>{"use strict";Up=()=>"~"});var NR,zR,DR=l(()=>{"use strict";NR=require("node:crypto"),zR=e=>`local-${(0,NR.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var vA,jR=l(()=>{"use strict";vA=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Fa,Bp,kA=l(()=>{"use strict";Fa=g(require("node:path")),Bp=e=>{let t=Fa.default.dirname(e),r=Fa.default.basename(t);return r==="agents"?Fa.default.basename(Fa.default.dirname(t)):r}});var Ua,Ar,$R,n8,s8,i8,Gp,HR,CA=l(()=>{"use strict";Ua=g(require("node:fs")),Ar=g(require("node:path"));DR();jR();kA();$R=new Set(["node_modules",".git","dist","build",".next","coverage"]),n8=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},s8=(e,t)=>{let r=Ar.default.basename(t);if(e==="skill"){let o=t.split(Ar.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},i8=e=>{let t=[],r=(n,s)=>{let i;try{i=Ua.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&$R.has(a.name))continue;let c=Ar.default.join(n,a.name),d=s?Ar.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;vA(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=Ar.default.join(e,n);Ua.default.existsSync(s)&&r(s,n)}let o=Ar.default.join(e,"skills");return Ua.default.existsSync(o)&&r(o,"skills"),t},Gp=e=>{let t=i8(e);if(t.length===0)return null;let r=Ar.default.dirname(e),o=Bp(e),n=n8(o),s=t.map(i=>{let a=vA(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:zR(i.absolutePath),kind:a,title:s8(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},HR=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Ua.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||$R.has(a.name))continue;let c=Ar.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var FR,TA,a8,LA,UR=l(()=>{"use strict";FR=g(require("node:fs")),TA=g(require("node:path"));CA();vs();a8=e=>{let t=Sr(e.trim());if(t===null)return null;if(TA.default.basename(t)===".cursor")return t;let r=TA.default.join(t,".cursor");try{if(FR.default.statSync(r).isDirectory())return Sr(r)}catch{return null}return null},LA=e=>{let t=a8(e.projectPath);if(t===null)return null;let r=Gp(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var BR,l8,qp,WA,GR=l(()=>{"use strict";BR=g(require("node:path"));CA();vs();kA();l8=5,qp=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},WA=e=>{let t=Sr(e.scanRoot.trim());if(t===null)return qp(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of HR(t,l8,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=Sr(s);if(i===null)continue;let a=Bp(i);qp(e.response,"folder",{cursorDir:i,groupName:a,repoPath:BR.default.dirname(i)});let c=Gp(i);c!==null&&(r.push(c),qp(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return qp(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var qR,VR,KR=l(()=>{"use strict";qR=g(require("node:path")),VR=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:qR.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Ge,JR,EA,c8,RA,xA,Vp,IA,Ba,YR=l(()=>{"use strict";Ge=g(require("node:fs")),JR=g(require("node:os")),EA=g(require("node:path"));Hp();dA();vs();KR();c8=e=>{if(!Ge.default.existsSync(e))return null;try{let t=JSON.parse(Ge.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},RA=e=>{let t=e.hostname??JR.default.hostname(),r=c8(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let c=[];for(let u of a){let m=ja(u.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let S=Ge.default.readFileSync(m,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:S,setSlugs:[i.slug]})}let d=Ha({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Ge.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Ge.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=EA.default.join(e.layout.harnessRootDir,i.relativePath);Ge.default.mkdirSync(EA.default.dirname(a),{recursive:!0}),Ge.default.writeFileSync(a,i.content)}Ge.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=$p(i.slug),d=r.sets[c];d!==void 0&&Ip({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},xA="reveal-cache.json",Vp=(e,t)=>{Ge.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Ge.default.writeFileSync(`${e.harnessRootDir}/${xA}`,`${JSON.stringify(t,null,2)}
`)},IA=e=>{let t=`${e.harnessRootDir}/${xA}`;Ge.default.existsSync(t)&&Ge.default.unlinkSync(t)},Ba=e=>{let t=`${e.harnessRootDir}/${xA}`;if(!Ge.default.existsSync(t))return null;try{let r=JSON.parse(Ge.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return VR(r)}catch{return null}return null}});var tn=l(()=>{"use strict";yA();LR();hA();SA();IR();bA();Hp();OR();MR();UR();vs();GR();YR()});var OA,XR=l(()=>{"use strict";tn();ze();OA=e=>{let t=M(e.profileEmail);return en({bundle:e.bundle,layout:t})}});var ZR=l(()=>{"use strict";XR();tn()});var d8,QR,u8,ex,rn,Kp,tx=l(()=>{"use strict";d8=["agentwitch.com","www.agentwitch.com"],QR=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,u8=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},ex=e=>{let t=u8(e);return!!(d8.includes(t)||QR.test(e.trim().toLowerCase()))},rn=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return ex(r)?QR.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Kp=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:rn(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Ga=l(()=>{"use strict";tx()});var br,qa=l(()=>{"use strict";br=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Va,rx=l(()=>{"use strict";ZR();Ga();qa();Va=e=>{if(!br(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Yt(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!rn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=OA({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var MA=l(()=>{"use strict";rx()});var p8,ks,NA=l(()=>{"use strict";p8=e=>e==="hourly"||e==="daily"||e==="weekdays",ks=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!p8(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Ka,Jp,ox,nx,zA,Wt,Yp,Xp,Zp,Qp,em=l(()=>{"use strict";Ka=g(require("node:fs")),Jp=g(require("node:path"));NA();ox="automations.json",nx=e=>e.profileEmail!==null?Jp.default.join(e.installDir,"profiles",e.profileEmail,ox):Jp.default.join(e.installDir,ox),zA=()=>({version:1,automations:[]}),Wt=e=>{let t=nx(e);if(!Ka.default.existsSync(t))return zA();try{let r=JSON.parse(Ka.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?zA():{version:1,automations:r.automations.flatMap(n=>{let s=ks(n);return s!==null?[s]:[]})}}catch{return zA()}},Yp=(e,t)=>{let r=nx(e);Ka.default.mkdirSync(Jp.default.dirname(r),{recursive:!0}),Ka.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Xp=(e,t)=>{Yp(e,{version:1,automations:t})},Zp=(e,t)=>{let o=Wt(e).automations.filter(n=>n.id!==t.id);Yp(e,{version:1,automations:[...o,t]})},Qp=(e,t)=>Wt(e).automations.find(r=>r.id===t)??null});var $e,Pr=l(()=>{"use strict";$e="x-agent-witch-token"});var DA=l(()=>{"use strict";Gu();Vu()});var Z,on,jA,Ja,$A,m8,HA,Ya,Xa,FA,Za=l(()=>{"use strict";Pr();DA();Z=e=>{let t=Ce(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},on=e=>({[$e]:e,"Content-Type":"application/json"}),jA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:on(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Ja=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:on(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},$A=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:on(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},m8=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},HA=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:on(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Ya=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:on(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return m8(r)}catch{return null}},Xa=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:on(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},FA=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:on(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var nn,sx,ix,g8,UA,ax,BA=l(()=>{"use strict";nn=g(require("node:fs")),sx=g(require("node:path")),ix=e=>sx.default.join(e.harnessRootDir,"projects-registry.json"),g8=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),UA=e=>{let t=ix(e);if(!nn.default.existsSync(t))return[];try{let r=JSON.parse(nn.default.readFileSync(t,"utf8"));return g8(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},ax=e=>{let t=ix(e);if(!nn.default.existsSync(t))return;let r=`${t}.migrated`;if(nn.default.existsSync(r)){nn.default.unlinkSync(t);return}nn.default.renameSync(t,r)}});var lx,f8,h8,cx,dx=l(()=>{"use strict";ws();lx=e=>pt(e),f8=e=>new Set(e.map(t=>lx(t.folderPath))),h8=e=>new Set(e.map(t=>t.id)),cx=(e,t)=>{let r=f8(t),o=h8(t),n=[],s=new Set;for(let i of e){let a=lx(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var GA,qA=l(()=>{"use strict";Za();BA();dx();GA=async(e,t)=>{let r=UA(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Ya(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=cx(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await HA(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&ax(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var VA,sn,tm=l(()=>{"use strict";VA=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),sn=(e,t)=>e.find(r=>r.id===t)??null});var Cs,rm=l(()=>{"use strict";Za();qA();tm();Cs=async(e,t)=>{t!==void 0&&await GA(t,e);let r=Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Ya(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the Mac connection and try again."};let n=VA(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var ux=l(()=>{"use strict"});var y8,S8,om,KA=l(()=>{"use strict";y8="Default",S8=e=>e.trim().toLowerCase()===y8.toLowerCase(),om=S8});var Ee,px,A8,b8,P8,w8,Ts,JA=l(()=>{"use strict";KA();Ee=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),px=(e,t)=>e.length===0?`<p class="empty">${Ee(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Ee(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Ee(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from Harness tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,A8=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No harness on this Mac yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,b8=e=>`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ee(e.id)}" />
        <p class="lede">This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.</p>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`,P8=e=>{if(e.installed.sets.length===0)return e.boundHarnessCount>0?b8(e.project):A8();let t=new Set(e.linkedSetSlugs),r=`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${Ee(o.slug)}"${t.size===0||t.has(o.slug)?" checked":""} />
            <span><strong>${Ee(o.name)}</strong> <span class="muted mono">(${Ee(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`<form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ee(e.project.id)}" />
        <p class="field-label">Installed</p>
        <p class="lede">Check the sets to write into this repo&apos;s <code>.cursor</code> tree, then pull.</p>
        ${r}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Pull into repo</button>
        </div>
      </form>`},w8=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Ee(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Ee(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Ts=e=>{let t=e.flashError?`<div class="alert-error">${Ee(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ee(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(u,m)=>`<a class="project-tab${e.activeTab===u?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${u}">${Ee(m)}</a>`,n=e.composition?.items.filter(u=>u.kind==="workflow")??[],s=e.composition?.items.filter(u=>u.kind==="agent")??[],i="";e.activeTab==="harness"?i=P8({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}):e.activeTab==="workflows"?i=px(n,"No workflows installed for this project yet."):e.activeTab==="agents"?i=px(s,"No agents installed for this project yet."):i=w8({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});let a=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}?rename=1`,c=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${Ee(a)}" target="_blank" rel="noopener noreferrer">Rename in Agent Witch Cloud\u2026</a>
    </div>`,d=om(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from Agent Witch Cloud only. The folder on this Mac is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from Agent Witch Cloud? Your repo folder on this Mac will stay.');">
          <input type="hidden" name="projectId" value="${Ee(e.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Ee(e.project.name)}</h1>
      <p class="muted mono">${Ee(e.project.projectFolderPath)}</p>
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
    </section>${d}`}});var _8,v8,mx,gx=l(()=>{"use strict";tn();Pr();_8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),v8=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!_8(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Yt(n);return s===null?[]:[s]})}catch{return null}},mx=v8});var fx,YA,hx=l(()=>{"use strict";ge();tn();JA();rm();gx();tm();Np();Za();kt();fx=e=>({kind:"page",title:e.project.name,body:Ts({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:so(e.layout),linkedSetSlugs:oo(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),YA=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=H();if(r===null)return{kind:"not_found"};let o=await Cs(r,e.layout),n=sn(o.projects,t);if(n===null)return{kind:"not_found"};let s=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??vt,a=s===null?null:await mx(s,n.id);if(a===null)return fx({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=AA({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return fx({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await Xa(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var k8,XA,yx=l(()=>{"use strict";k8=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,XA=k8});var Sx=l(()=>{"use strict"});var Ax=l(()=>{"use strict"});var bx=l(()=>{"use strict";Sx();Ax()});var C8,io,Px=l(()=>{"use strict";C8=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],io=(e=process.env)=>{let t={...e};for(let r of C8)delete t[r];return t}});var wx=l(()=>{"use strict";Px()});var ZA,_x=l(()=>{"use strict";ZA={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var QA=l(()=>{"use strict";_x()});var nm,eb=l(()=>{"use strict";nm={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var sm=l(()=>{"use strict";bx();wx();kt();QA();eb()});var vx,kx,T8,im,am,Cx=l(()=>{"use strict";vx=require("node:child_process"),kx=require("node:util");sm();T8=(0,kx.promisify)(vx.execFile),im=async(e,t)=>{try{let{stdout:r}=await T8("git",t,{cwd:e,env:io(),maxBuffer:1048576});return r.trim()}catch{return null}},am=async e=>{let t=await im(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await im(e,["rev-parse","--abbrev-ref","HEAD"]),o=await im(e,["status","--porcelain"]),n=await im(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var tb,Tx=l(()=>{"use strict";tb=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var L8,rb,Lx=l(()=>{"use strict";L8=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},rb=L8});var W8,ob,Wx=l(()=>{"use strict";Pr();W8=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[$e]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},ob=W8});var Ex,ao,Rx=l(()=>{"use strict";Ex=require("node:child_process"),ao=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,Ex.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var xx=l(()=>{"use strict";rm()});var Qa,Ix=l(()=>{"use strict";Pr();Qa=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[$e]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var nb,Ox=l(()=>{"use strict";Pr();nb=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var Xt=l(()=>{"use strict";rm();tm();ux();ws();rA();hx();Np();yx();Cx();Tx();Lx();Wx();Rx();xx();Ix();Ox();qA();BA();Za()});var lm,el,Mx,sb,an,ib=l(()=>{"use strict";lm=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},el=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=lm(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},Mx=e=>e>=1&&e<=5,sb=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return lm(t,"UTC")},an=e=>{let t=e.from??new Date,r=lm(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return el(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=el(r,e.timeZone,o,0),s=lm(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?el(sb(r),e.timeZone,o,0):n;if(!i&&Mx(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=sb(a),Mx(a.weekday))return el(a,e.timeZone,o,0);return el(sb(r),e.timeZone,o,0)}});var Nx,ab,wr,lb=l(()=>{"use strict";Nx=require("node:crypto");ge();Xt();ib();em();ab=!1,wr=async e=>{if(ab)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=H();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Z({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=Qp(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};ab=!0;let n=(0,Nx.randomUUID)();try{let s=await As(t,"claude-cli",o.prompt);await FA(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=an({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return Zp(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{ab=!1}}});var cm,zx=l(()=>{"use strict";ge();lb();em();cm=async()=>{let e=H();if(e===null)return;let t=Wt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await wr(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var tl=l(()=>{"use strict";em();zx();lb();ib()});var Dx=l(()=>{"use strict";tl()});var jx=l(()=>{"use strict";NA()});var $x=l(()=>{"use strict";jx()});var cb=l(()=>{"use strict";tl()});var E8,R8,rl,db=l(()=>{"use strict";Dx();$x();cb();ze();E8=e=>e!==void 0&&e.trim().length>0?M(e.trim()):M(),R8=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??an({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??an({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},rl=e=>{let t=E8(e.profileEmail),r=Wt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=ks(s);return i!==null?[R8(i,o.get(i.id))]:[]});return Xp(t,n),{ok:!0,writtenCount:n.length}}});var ub=l(()=>{"use strict";tl()});var Hx=l(()=>{"use strict";ge()});var Fx=l(()=>{"use strict";db();ub();cb();Hx()});var Ux,ol,nl,sl,Bx=l(()=>{"use strict";Ux=g(require("node:os"));Fx();Ga();qa();ol=e=>{if(!br(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!rn(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=rl({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},nl=async e=>{if(!br(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:rn(t)?wr(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},sl=()=>{let e=H(),t=e!==null?Wt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Ux.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var pb=l(()=>{"use strict";Bx()});var dm=l(()=>{"use strict";ne()});var um=l(()=>{"use strict";ne()});var pm,qx,Vx,Gx,x8,I8,Ls,mb=l(()=>{"use strict";pm=g(require("node:fs")),qx=g(require("node:os")),Vx=g(require("node:path"));dm();um();xa();ze();Gx=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},x8=e=>Vx.default.join(qx.default.homedir(),"Library","LaunchAgents",`${e}.plist`),I8=async e=>pm.default.existsSync(x8(e))?(await Ne(e)).ok:!1,Ls=async(e=T())=>{let t=pm.default.existsSync(yp(e)),r=!pm.default.existsSync(pr(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Ra(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await Gx(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${ke(e)}-wake`;await I8(i)&&s.push(i);for(let c of oe(e))(await Ne(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await Gx(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var Kx=l(()=>{"use strict";ne()});var gb=l(()=>{"use strict";Vo();ne()});var fb=l(()=>{"use strict";Vo()});var hb=l(()=>{"use strict";ne()});var Yx,Jx,il,yb=l(()=>{"use strict";Yx=g(require("node:fs"));kt();dm();um();ze();Jx=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},il=async(e=T())=>{if(!Yx.default.existsSync(pr(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await Jx())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of oe(e))(await Ne(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await Jx();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var Xx=l(()=>{"use strict";ne()});var Zx,ln,Sb,O8,M8,N8,Qx,z8,e0,Ws,mm=l(()=>{"use strict";Zx=require("node:crypto"),ln=g(require("node:fs")),Sb=g(require("node:path"));ze();O8="watchdog-log.ndjson",M8=200,N8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qx=(e=T())=>{let t=M(),r=t.installDir===e?t.logsDir:es({installDir:e,profileEmail:t.profileEmail});return Sb.default.join(r,O8)},z8=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!N8(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},e0=(e,t=T())=>{let r={id:(0,Zx.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=Qx(t);ln.default.mkdirSync(Sb.default.dirname(o),{recursive:!0});let n=ln.default.existsSync(o)?ln.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-M8+1)),JSON.stringify(r)];return ln.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Ws=(e=20,t=T())=>{let r=Qx(t);if(!ln.default.existsSync(r))return[];let o=ln.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=z8(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var Ab,bb,Pb,wb=l(()=>{"use strict";Me();Ab=Co.watchdogReinstallState,bb=900*1e3,Pb=3e3});var t0=l(()=>{"use strict";wb()});var r0={};Ft(r0,{verifyAgentWitchReviveAfterKickstart:()=>j8});var D8,j8,o0=l(()=>{"use strict";t0();fb();hb();ze();D8=e=>new Promise(t=>{setTimeout(t,e)}),j8=async e=>{if(await D8(e.verifyDelayMs??Pb),!await xo(e.launchAgentLabel))return!1;let r=e.profileEmail===null?M():M(e.profileEmail),o=fe(r);return!Te(o,e.staleAfterMs)}});var al,_b,$8,n0,s0,vb,kb,Cb=l(()=>{"use strict";al=g(require("node:fs")),_b=g(require("node:path"));J();wb();$8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),n0=e=>_b.default.join(e,Ab),s0=(e=T())=>{let t=n0(e);if(!al.default.existsSync(t))return null;try{let r=JSON.parse(al.default.readFileSync(t,"utf8"));return!$8(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},vb=(e=T(),t=Date.now())=>{let r=s0(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=bb:!0},kb=(e=T(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=n0(e);return al.default.mkdirSync(_b.default.dirname(o),{recursive:!0}),al.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var Tb,i0=l(()=>{"use strict";ne();Cb();Tb=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!vb())return{attempted:!1,ok:!1,targets:e};kb();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Ne(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var a0=l(()=>{"use strict";Cb();i0()});var Lb=l(()=>{"use strict";Vt()});var l0=l(()=>{"use strict";Vt()});var c0,Es,d0,u0,p0,H8,F8,m0,U8,B8,g0,f0=l(()=>{"use strict";c0=require("node:child_process"),Es=g(require("node:fs")),d0=g(require("node:os")),u0=g(require("node:path")),p0=require("node:util");Lb();l0();ze();H8=(0,p0.promisify)(c0.execFile),F8=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),m0=e=>{let t=Be(e),r=t===null?M():M(t);if(!Es.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Es.default.readFileSync(r.configPath,"utf8"));return!F8(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},U8=e=>m0(e)?.wsUrl??null,B8=e=>{let t=U8(e);return t!==null?Ce(t):De(e)?.appOrigin??null},g0=async e=>{let t=e?.installDir??T(),r=m0(t),o=r!==null?Ce(r.wsUrl):B8(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=u0.default.join(d0.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Es.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??Be(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await H8("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Es.default.existsSync(i)&&Es.default.unlinkSync(i)}}});var h0={};Ft(h0,{attemptAgentWitchWatchdogReinstall:()=>G8});var G8,y0=l(()=>{"use strict";a0();f0();G8=async e=>Tb(e,()=>g0())});var S0,A0,b0,q8,V8,K8,ll,Wb=l(()=>{"use strict";Kx();gb();fb();hb();yb();mb();dm();um();ze();as();Xx();mm();S0=e=>e===null?M():M(e),A0=async(e,t,r)=>{if(!await xo(e))return"not_running";let n=S0(t);if(Ct(n))return"healthy";let s=fe(n);return Te(s,r)?"stale_connection":"healthy"},b0=async e=>{let t=e?.staleAfterMs??12e4,r=T(),o=oe(r);return Promise.all(o.map(async n=>{let s=await A0(n.launchAgentLabel,n.profileEmail,t),i=S0(n.profileEmail),a=fe(i),c=await xo(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Te(a,t),needsRevive:s!=="healthy",reason:s}}))},q8=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},V8=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",K8=async e=>{let t=await Ne(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(o0(),r0)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},ll=async e=>{if(!_t())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=T();await Ls(r),await il(r);let o=oe(r),n=[];for(let u of o){let m=await A0(u.launchAgentLabel,u.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:m});continue}n.push(await K8({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let u=Ro();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(y0(),h0)),m=await u(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&e0({event:V8(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:q8(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var P0,gm,w0=l(()=>{"use strict";P0=g(require("node:os"));gb();mm();Wb();gm=async()=>{let e=await b0(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:P0.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Ws(1)[0]??null}}});var Eb=l(()=>{"use strict";mb();Wb();w0();mm()});var cl,dl,ul,_0=l(()=>{"use strict";ne();Eb();cl=async()=>{await Ls();let e=oe(),t=[];for(let r of e){let o=await Ne(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Ro();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},dl=ll,ul=ll});var Rb=l(()=>{"use strict";_0()});var hm,fm,v0,xb,k0,J8,Y8,X8,Z8,Q8,ym,C0=l(()=>{"use strict";hm=require("node:child_process"),fm=g(require("node:fs")),v0=g(require("node:os")),xb=g(require("node:path")),k0=require("node:util");ne();J();J8=(0,k0.promisify)(hm.execFile),Y8=()=>xb.default.join(v0.default.homedir(),"Library","LaunchAgents"),X8=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await J8("launchctl",["bootout",r]).catch(()=>{})},Z8=e=>{let t=xb.default.join(Y8(),`${e}.plist`);fm.default.existsSync(t)&&fm.default.unlinkSync(t)},Q8=e=>{(0,hm.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},ym=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=T();if(!fm.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=mr(e);for(let r of t)await X8(r),Z8(r);return Q8(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var T0,Sm,L0,Rs,W0,e3,t3,r3,Ib,o3,Ob,E0=l(()=>{"use strict";T0=require("node:child_process"),Sm=g(require("node:fs")),L0=g(require("node:os")),Rs=g(require("node:path")),W0=require("node:util");ne();e3=(0,W0.promisify)(T0.execFile),t3=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],r3=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],Ib=e=>{Sm.default.existsSync(e)&&Sm.default.rmSync(e,{force:!0})},o3=async e=>{let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await e3("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},Ob=async e=>{let r=(e.listLaunchAgentLabels??mr)(e.layout.installDir),o=e.launchAgentsDir??Rs.default.join(L0.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??o3;for(let i of r)await n(i),Ib(Rs.default.join(o,`${i}.plist`));let s=Rs.default.dirname(e.layout.configPath);for(let i of t3)Ib(Rs.default.join(s,i));for(let i of r3)Ib(Rs.default.join(e.layout.installDir,i));return Sm.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var Mb,R0=l(()=>{"use strict";Mb="unknown_identity"});var Nb=l(()=>{"use strict";eb();R0()});var n3,zb,x0=l(()=>{"use strict";Nb();n3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zb=e=>e.type!=="system.error"||!n3(e.payload)?!1:e.payload.errorCode===Mb});var Db=l(()=>{"use strict";C0();E0();x0()});var Am=l(()=>{"use strict";ne();Vt();Db();Eb()});var xs,bm,Pm=l(()=>{"use strict";Am();xs=(e=20)=>Ws(e),bm=gm});var wm,Is,_m,vm=l(()=>{"use strict";Am();wm=Go,Is=(e=20)=>Fo(e),_m=e=>Bo(e)});var km,jb=l(()=>{"use strict";Am();km=()=>ym()});var I0=l(()=>{"use strict";qS();MA();pb();Rb();Pm();vm();jb()});var O0={};Ft(O0,{buildAgentWitchAutomationStatusFromWakeServer:()=>sl,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>wm,buildAgentWitchWakeHealthResponse:()=>Oa,buildAgentWitchWakeIdentityResponse:()=>Ma,buildAgentWitchWatchdogStatus:()=>bm,installHarnessFromWakeServer:()=>Va,readAgentWitchSelfUpdateLogEntries:()=>Is,readAgentWitchWatchdogLogEntries:()=>xs,restartAgentWitchFromWakeServer:()=>ul,reviveAgentWitchWebSocketFromWakeServer:()=>dl,runAgentWitchSelfUpdateFromWakeServer:()=>_m,runAgentWitchUninstallLocalFromWakeServer:()=>km,runAutomationFromWakeServer:()=>nl,syncAutomationsFromWakeServer:()=>ol,wakeAgentWitchLaunchAgents:()=>cl});var M0=l(()=>{"use strict";I0()});var N0,z0,$b,Hb,D0=l(()=>{"use strict";N0=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),z0=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?N0(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?N0(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},$b=e=>{let t=e.watchdogLogs.map(z0).join(""),r=e.updateLogs.map(z0).join("");return`<!doctype html>
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
</html>`},Hb=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var j0,$0,H0=l(()=>{"use strict";j0=g(require("node:net")),$0=()=>new Promise((e,t)=>{let r=j0.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var F0,s3,Fb,U0=l(()=>{"use strict";F0=g(require("node:net"));H0();Ia();xa();ze();s3=e=>new Promise(t=>{let r=F0.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Fb=async()=>{let e=T(),t=Lt();if(await s3(t))return IE(t),t;let r=await $0();return Sp(e,r),r}});var i3,Ub,B0=l(()=>{"use strict";i3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ub=e=>({force:i3(e)&&e.force===!0})});var pl=l(()=>{"use strict";Ga();D0();U0();B0();Cy();ju();Do()});var Bb,j,Gb,qb,ml,G0=l(()=>{"use strict";Bb=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},j=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},Gb=e=>{e.writeHead(403),e.end()},qb=e=>e.url?.split("?")[0]??"/",ml=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var Et=l(()=>{"use strict";G0()});var a3,q0,V0=l(()=>{"use strict";pb();Et();a3=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},q0=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return j(e.response,200,sl(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await a3(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=ol(t);return j(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await nl(t);return j(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var l3,J0,K0,Y0,Vb,X0,Kb=l(()=>{"use strict";l3=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],J0=e=>/embed|minilm|^bge-/i.test(e),K0=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),Y0=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),Vb=e=>e.filter(t=>t.trim().length>0&&!J0(t)),X0=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!J0(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>K0(s,o));if(n!==void 0)return n}for(let n of l3){let s=r.find(i=>K0(i,n));if(s!==void 0)return s}return r[0]??null}});var Jb,eI,tI,Cm,rI,Z0,Q0,c3,d3,u3,p3,m3,g3,Rt,gl=l(()=>{"use strict";Jb=require("node:child_process"),eI=g(require("node:fs")),tI=g(require("node:os")),Cm=g(require("node:path"));Vt();Tt();Kb();rI=3e3,Z0=["claude-cli","codex","cursor","antigravity"],Q0={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},c3=(e,t)=>new Promise(r=>{let o=(0,Jb.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},rI);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),d3=()=>{let e=tI.default.homedir();return["ollama",Cm.default.join(e,".local","bin","ollama"),Cm.default.join(e,".agent-witch","ollama","ollama"),Cm.default.join(e,".local-agent-witch","ollama","ollama")]},u3=e=>new Promise(t=>{let r=(0,Jb.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},rI);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(Y0(Buffer.concat(o).toString("utf8")))})}),p3=async()=>{for(let e of d3()){if(e!=="ollama"&&!eI.default.existsSync(e))continue;let t=await u3(e);if(t!==null)return t}return[]},m3=e=>{let t=e.installedWriterIds.map(s=>Q0[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=pe(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${Q0[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},g3=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:ls},Rt=async e=>{let t=Z0.map(i=>{let a=op(i,e.commands);return c3(a.command,a.args)}),[r,...o]=await Promise.all([p3(),...t]),n=Z0.flatMap((i,a)=>o[a]===!0?[i]:[]),s=X0(r,g3());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:m3({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var f3,h3,Yb,oI=l(()=>{"use strict";f3="http://127.0.0.1:11434",h3=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Yb=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||f3;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?h3(await o.json()):null}catch{return null}}});var Xb=l(()=>{"use strict";Tt();gl();oI();Kb()});var y3,nI,sI=l(()=>{"use strict";Xb();y3={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},nI=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:y3[t]})),ollamaModels:Vb(e.ollamaModels)})});var S3,iI,aI=l(()=>{"use strict";Xb();Et();sI();S3=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},iI=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Rt({commands:me({})});return j(e.response,200,{ok:!0,...nI({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await S3(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await Yb({model:r,prompt:o});return n===null?(j(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(j(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var A3,lI,cI=l(()=>{"use strict";MA();Et();A3=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return j(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},lI=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await A3(e);if(t===null)return!0;let r=Va(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var dI=l(()=>{"use strict";Xt()});var Zb,uI=l(()=>{"use strict";dI();qa();Zb=e=>{if(!br(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:st({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var pI,Qb,eP=l(()=>{"use strict";ge();Xt();qa();pI=e=>{if(!br(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},Qb=async e=>{let t=pI(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=ao("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=H();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this Mac."};let n=Z({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(st({projectFolderPath:r}),await Qa(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var mI=l(()=>{"use strict";uI();eP()});var gI,fI=l(()=>{"use strict";mI();eP();Et();gI=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=Zb(t);return j(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await Qb(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return j(e.response,o,r,e.cors.headers),!0}return!1}});var hI,yI=l(()=>{"use strict";pl();vm();Pm();hI=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=xs(50),r=Is(50);return e.response.writeHead(200,Hb()),e.response.end($b({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var SI,AI=l(()=>{"use strict";qS();Et();SI=e=>e.request.method==="GET"&&e.pathname==="/health"?(j(e.response,200,Oa(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(j(e.response,200,Ma(),e.cors.headers),!0):!1});var bI,PI=l(()=>{"use strict";jb();Et();bI=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await km();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}});var wI,_I=l(()=>{"use strict";Rb();Et();wI=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await dl();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await ul();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await cl();return j(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var vI,kI=l(()=>{"use strict";pl();vm();Et();vI=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=wm();return j(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=ml(e.request,"/update/logs",20,200);return j(e.response,200,{ok:!0,logs:Is(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=Ub(t),o=await _m({force:r});return j(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var CI,TI=l(()=>{"use strict";Pm();Et();CI=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await bm();return j(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=ml(e.request,"/watchdog/logs",20,200);return j(e.response,200,{ok:!0,logs:xs(t)},e.cors.headers),!0}return!1}});var LI,WI=l(()=>{"use strict";V0();aI();cI();fI();yI();AI();PI();_I();kI();TI();LI=[SI,hI,CI,wI,vI,bI,lI,gI,q0,iI]});var EI,RI=l(()=>{"use strict";WI();EI=async e=>{for(let t of LI)if(await t(e))return!0;return!1}});var b3,xI,II=l(()=>{"use strict";Ga();Et();RI();b3=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:qb(e),readJsonBody:()=>Bb(e)}),xI=async(e,t,r)=>{let o=e.headers.origin,n=Kp(o);try{if(o!==void 0&&o.length>0&&!n.allowed){Gb(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=b3(e,t,r,n);if(await EI(s))return;j(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{j(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var OI,cn,Tm,Lm=l(()=>{"use strict";OI=g(require("node:http"));pl();II();cn=async()=>{let e=await Fb(),t=OI.default.createServer((r,o)=>{xI(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Tm=cn});var MI={};Ft(MI,{runAgentWitchBridgeCli:()=>P3});var P3,NI=l(()=>{"use strict";ne();Lm();P3=async()=>{rt("agent-witch-bridge");let e=await cn(),t=fr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var zI=l(()=>{"use strict";kt()});var Os,tP,DI=l(()=>{"use strict";Os=(e,t,r)=>e===1?t:r,tP=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Os(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Os(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Os(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Os(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Os(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${Os(u,"year","years")} ago`}});var dn,rP,w3,_3,oP,lo,fl,nP,jI=l(()=>{"use strict";dn=g(require("node:fs")),rP=g(require("node:path")),w3="local-ws-traffic.ndjson",_3=500,oP=e=>rP.default.join(e.logsDir,w3),lo=(e,t)=>{let r=oP(e);dn.default.mkdirSync(rP.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});dn.default.appendFileSync(r,`${o}
`,"utf8")},fl=(e,t=_3)=>{let r=oP(e);if(!dn.default.existsSync(r))return[];let n=dn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},nP=e=>{let t=oP(e);dn.default.existsSync(t)&&dn.default.writeFileSync(t,"","utf8")}});var v3,$I,HI,FI=l(()=>{"use strict";Nb();v3=new Set(Object.values(nm)),$I=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),HI=e=>{if(!$I(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!v3.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!$I(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var UI,BI=l(()=>{"use strict";UI=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var k3,C3,T3,hl,GI=l(()=>{"use strict";BI();k3=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,C3=e=>k3.test(e),T3=e=>UI(e),hl=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>hl(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&C3(o)){r[o]=T3(n);continue}r[o]=hl(n)}return r}});var Zt,sP,L3,W3,E3,iP,qI,VI,KI,R3,Wm,un,Em,aP,JI=l(()=>{"use strict";Zt=g(require("node:fs")),sP=g(require("node:path"));FI();GI();L3="local-ws-trace.ndjson",W3=1e4,E3=1440*60*1e3,iP=e=>sP.default.join(e.logsDir,L3),qI=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},VI=e=>{if(!Zt.default.existsSync(e))return;let t=Zt.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-E3,n=t.filter(s=>{let i=qI(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-W3);Zt.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},KI=(e,t)=>{let r=iP(e);Zt.default.mkdirSync(sP.default.dirname(r),{recursive:!0}),Zt.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),VI(r)},R3=e=>e.parsed===null?{_empty:!0}:hl(e.parsed),Wm=(e,t,r)=>{let o=HI(r);KI(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:R3(o)})},un=(e,t)=>{KI(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:hl({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Em=(e,t=80)=>{let r=iP(e);if(VI(r),!Zt.default.existsSync(r))return[];let o=Zt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=qI(s);i!==null&&n.push(i)}return n.reverse()},aP=e=>{let t=iP(e);Zt.default.existsSync(t)&&Zt.default.writeFileSync(t,"","utf8")}});var co,YI,x3,lP,Rm,XI=l(()=>{"use strict";co=g(require("node:fs")),YI=g(require("node:path")),x3=256e3,lP=e=>{co.default.mkdirSync(YI.default.dirname(e),{recursive:!0}),co.default.writeFileSync(e,"","utf8")},Rm=(e,t=x3)=>{if(!co.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=co.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=co.default.openSync(e,"r");try{co.default.readSync(a,i,0,s,n)}finally{co.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var yl=l(()=>{"use strict";jI();JI();XI()});var cP,dP,ZI=l(()=>{"use strict";cP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dP=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${cP(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${cP(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${cP(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var QI=l(()=>{"use strict";ZI()});var uP,pP=l(()=>{"use strict";uP=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var mP=l(()=>{"use strict";fa()});var gP,fP,eO=l(()=>{"use strict";mP();gP=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},fP=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var tO=l(()=>{"use strict";pP();eO()});var rO,Sl,hP,Al=l(()=>{"use strict";pP();rO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Sl=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=rO(e),r=rO(uP(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},hP=`(function () {
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
})();`});var pn,I3,yP,oO=l(()=>{"use strict";pn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),I3=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},yP=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${pn(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?pn(r.direction):pn(r.kind),i=`trace-body-${o}`,a=pn(I3(r.body));return`<tr>
        <td title="${pn(r.at)}">${pn(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${pn(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var sO,O3,nO,SP,iO=l(()=>{"use strict";Me();kt();sO=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},O3=e=>sO(e)===ur?qn:Gn,nO=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SP=e=>{let t=O3(e.installDir),o=`AW_HOME="$HOME/${sO(e.installDir)}"
launchctl kickstart -k "gui/$(id -u)/${t}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${43347}/health`;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${nO(t)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${nO(o)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`}});var aO=l(()=>{"use strict";Al();oO();iO();Al()});var M3,_r,bl=l(()=>{"use strict";M3=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),_r=M3});var lO,cO,dO,uO,pO,mO,gO,Ms=l(()=>{"use strict";lO="projects",cO="knowledge",dO="chunks.ndjson",uO="lessons.ndjson",pO="error-chunks.ndjson",mO="usage-stats.json",gO="knowledge-location.json"});var xm,N3,Im,AP=l(()=>{"use strict";xm=g(require("node:path"));Ms();N3=(e,t)=>{let r=t.trim(),o=xm.default.join(e.installDir,lO,r,cO);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:xm.default.join(o,dO),memoryRunsFilePath:xm.default.join(o,uO)}},Im=N3});var bP,z3,fO,hO=l(()=>{"use strict";bP=g(require("node:fs"));Ms();Qo();z3=e=>{let t=mt(e.projectFolderPath),r=`${t.metaDirPath}/${gO}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};bP.default.mkdirSync(t.metaDirPath,{recursive:!0}),bP.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},fO=z3});var Ns,SO,yO,D3,AO,bO=l(()=>{"use strict";Ns=g(require("node:fs")),SO=g(require("node:path"));No();Qo();AP();hO();yO=(e,t)=>{Ns.default.existsSync(e)&&(Ns.default.existsSync(t)&&Ns.default.statSync(t).size>0||(Ns.default.mkdirSync(SO.default.dirname(t),{recursive:!0}),Ns.default.copyFileSync(e,t)))},D3=e=>{let t=mt(e.projectFolderPath),r=Im(e.layout,e.projectId),o=`${t.memoryDirPath}/${ts}`;yO(t.ragChunksFilePath,r.ragChunksFilePath),yO(o,r.memoryRunsFilePath),fO({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},AO=D3});var PP,j3,PO,wO=l(()=>{"use strict";PP=g(require("node:fs"));Qo();j3=e=>{let t=mt(e);if(!PP.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(PP.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},PO=j3});var _O,$3,zs,Om=l(()=>{"use strict";_O=g(require("node:path"));No();Qo();bO();wO();AP();$3=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=PO(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){AO({layout:e.layout,projectFolderPath:t,projectId:o});let s=Im(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=mt(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:_O.default.join(n.memoryDirPath,ts),projectId:null}},zs=$3});var Mm,F3,Nm,wP=l(()=>{"use strict";Mm=g(require("node:fs"));Ms();F3=(e,t=500)=>{if(!Mm.default.existsSync(e))return;let r=Mm.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Mm.default.writeFileSync(e,`${o.join(`
`)}
`)},Nm=F3});var zm,U3,mn,_P=l(()=>{"use strict";zm=g(require("node:path"));Ms();Om();U3=e=>{let t=zs(e);if(t===null)return null;let r=zm.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:zm.default.join(r,mO),errorChunksFilePath:zm.default.join(r,pO)}},mn=U3});var kO,Pl,CO,vO,vP,TO,q3,kP,LO,CP,TP,LP,WP=l(()=>{"use strict";kO=require("node:crypto"),Pl=g(require("node:fs")),CO=g(require("node:path"));bl();Ms();_P();vO=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),vP=e=>{if(!Pl.default.existsSync(e))return vO();try{let t=JSON.parse(Pl.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return vO()},TO=(e,t)=>{Pl.default.mkdirSync(CO.default.dirname(e),{recursive:!0}),Pl.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},q3=e=>{let t=_r(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,kO.createHash)("sha256").update(o).digest("hex").slice(0,16)},kP=e=>{let t=mn(e);return t===null?null:vP(t.usageStatsFilePath)},LO=e=>{if(e.chunkIds.length===0)return;let t=mn(e);if(t===null)return;let r=vP(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;TO(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},CP=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=mn(e);if(r===null)return null;let o=q3(t),n=vP(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return TO(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},TP=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,LP=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var wl,WO,V3,K3,EO,J3,EP,_l,Ds,RP,js,xP,IP=l(()=>{"use strict";wl=g(require("node:fs")),WO=g(require("node:path"));bl();Om();wP();WP();V3="http://127.0.0.1:11434",K3="nomic-embed-text",EO=(e,t,r)=>zs({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,J3=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},EP=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},_l=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||V3,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||K3;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},Ds=(e,t,r)=>{let o=EO(e,t,r);if(o===null||!wl.default.existsSync(o))return[];let n=wl.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},RP=async e=>{let t=_r(e.text),r=EP(t);if(r.length===0)return 0;let o=EO(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;wl.default.mkdirSync(WO.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await _l(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};wl.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return Nm(o),n},js=async e=>{let t=await _l(e.query);if(t===null)return[];let r=e.minScore??0,s=Ds(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:J3(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return LO({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},xP=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var vl,RO,Y3,X3,OP,MP,NP,xO=l(()=>{"use strict";vl=g(require("node:fs")),RO=g(require("node:path"));bl();_P();wP();IP();Y3=e=>{if(!vl.default.existsSync(e))return[];let t=vl.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},X3=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},OP=async e=>{let t=mn(e);if(t===null)return 0;let r=_r(e.text),o=EP(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;vl.default.mkdirSync(RO.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await _l(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};vl.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return Nm(n,200),s},MP=async e=>{let t=mn(e);if(t===null)return[];let r=await _l(e.query);if(r===null)return[];let o=e.minScore??.3;return Y3(t.errorChunksFilePath).map(s=>({chunk:s,score:X3(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},NP=e=>e.length===0?"":`Past failures on this Mac (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var zP=l(()=>{"use strict";IP();WP();xO()});var Ae,DP,jP=l(()=>{"use strict";QA();Ae=ZA,DP=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${Ae.gray50};
  --aw-zinc-100: ${Ae.gray100};
  --aw-zinc-200: ${Ae.gray200};
  --aw-zinc-400: ${Ae.gray400};
  --aw-zinc-500: ${Ae.gray500};
  --aw-zinc-600: ${Ae.gray600};
  --aw-zinc-700: ${Ae.gray700};
  --aw-zinc-800: ${Ae.gray900};
  --aw-zinc-900: ${Ae.gray900};
  --aw-brand-600: ${Ae.brand600};
  --aw-brand-700: ${Ae.brand700};
  --aw-brand-50: ${Ae.brand50};
  --aw-emerald-50: ${Ae.success50};
  --aw-emerald-700: ${Ae.success700};
  --aw-amber-50: ${Ae.warning50};
  --aw-amber-900: ${Ae.warning900};
  --aw-red-50: ${Ae.error50};
  --aw-red-700: ${Ae.error700};
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
`.trim()});var Z3,Q3,$P,IO,HP,OO=l(()=>{"use strict";jP();Al();Z3=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,Q3=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],$P=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IO=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${Z3}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,HP=e=>{let t=Q3.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=$P(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=$P(e.installBundleVersionLabel?.trim()??"unknown"),s=IO("brand brand-in-sidebar",n),i=IO("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${$P(e.title)} \xB7 Agent Witch Local</title>
  <style>${DP}</style>
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
  <script>${hP}</script>
</body>
</html>`}});var Dm,kl,jm=l(()=>{"use strict";Dm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kl=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Dm(e.syncMessage)}</p>`:"",o=Dm(e.manageHref),n=Dm(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Dm(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var FP,UP,BP,MO=l(()=>{"use strict";FP=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,UP=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,BP=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var NO=l(()=>{"use strict";OO();jm();MO()});var $s,GP,zO=l(()=>{"use strict";Al();$s=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GP=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${$s(e.wakeError)}</div>`:"",a=Sl(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${$s(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${$s(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${$s(o)}</p>
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
        <p class="home-card-meta">${$s(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${$s(n)}</p>
      </a>
    </div>`}});var DO=l(()=>{"use strict";zO()});var W,Hs=l(()=>{"use strict";W=e=>e==="passed"||e==="stopped"||e==="failed"});var jO,qP,gn,VP,$m=l(()=>{"use strict";jO="Stopped at the round limit. The best prompt is kept.",qP="Stopped because the score stopped rising. The best prompt is kept.",gn="Finished. The best prompt is the result.",VP="Wizard ended. Progress from finished steps is kept."});var uo,KP=l(()=>{"use strict";uo=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var e6,t6,Cl,$O,Hm=l(()=>{"use strict";e6=/\n+|;\s+/,t6=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,Cl=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(e6).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,t6(s)]},[]);return[...t,...o]},[]),$O=e=>{let t=Cl(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ae,Fs=l(()=>{"use strict";ae=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Tl,JP=l(()=>{"use strict";Hm();Fs();Tl=e=>{let t=[...e.priorRounds,e.current],r=ae(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:$O(o)}}});var YP,r6,o6,Fm,XP=l(()=>{"use strict";YP={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},r6=e=>{try{let t=JSON.parse(e.fragment);return{...YP,objects:[...e.objects,t]}}catch{return{...YP,objects:e.objects}}},o6=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:r6(r)},Fm=e=>[...e].reduce(o6,YP).objects});var n6,ZP,s6,HO,QP=l(()=>{"use strict";XP();n6=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},ZP=e=>{let t=Fm(e).filter(n6),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},s6=(e,t)=>({...e,passed:e.score>=t}),HO=(e,t)=>{let r=ZP(e);return r===null?null:s6(r,t)}});var ew,tw,Um=l(()=>{"use strict";ew="The judge reply needs a score and a reason.",tw="The improver reply was empty."});var FO,UO=l(()=>{"use strict";FO=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var BO,GO=l(()=>{"use strict";BO=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var a6,qO,VO=l(()=>{"use strict";UO();GO();$m();Hm();a6=e=>{let t=Cl(e);return t.length===0?qP:`${qP} Avoid: ${t.join("; ")}.`},qO=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:jO};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(FO(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:a6(BO(r))}}return null}});var po,l6,fn,KO,Bm=l(()=>{"use strict";po=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},l6=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,fn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",l6(e.tokens),`Delay: ${po(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},KO=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var c6,JO,YO=l(()=>{"use strict";QP();c6=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,JO=e=>{let r=(c6.exec(e)?.[1]??e).trim();return r.length===0||ZP(r)!==null?null:r}});var XO,Gm,ZO=l(()=>{"use strict";Bm();YO();Um();XO=e=>({type:"call",role:"judge",choice:e.choice,prompt:KO({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),Gm=e=>{let t=JO(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:tw}}:{nextPrompt:t,continuation:XO({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var rw,QO=l(()=>{"use strict";KP();JP();QP();Um();$m();VO();Um();ZO();rw=e=>{let t=HO(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:ew}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=qO({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=Tl({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:uo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var Ll,ow=l(()=>{"use strict";Ll=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var eM=l(()=>{"use strict"});var tM=l(()=>{"use strict";eM()});var hn,rM=l(()=>{"use strict";hn=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var d6,nw,oM=l(()=>{"use strict";Bm();d6=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,nw=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",d6(e.tokens),`Delay: ${po(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var u6,p6,m6,sw,nM=l(()=>{"use strict";u6=/[A-Za-z0-9_./~-]{3,180}/g,p6=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,m6=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||p6.test(t)},sw=(e,t=12)=>{let r=[];for(let o of e.matchAll(u6)){let n=o[0].replace(/\.+$/,"");if(!(!m6(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var Wl,sM=l(()=>{"use strict";Wl=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var qm,iw,iM,El,aw=l(()=>{"use strict";qm=e=>Math.floor(e/2),iw=e=>Math.max(qm(e)+1,e-20),iM=(e,t)=>e>=t?"passes":e>=iw(t)?"close":e>=qm(t)?"weak":"bad",El=e=>[{band:"bad",label:`0\u2013${qm(e)-1} bad`},{band:"weak",label:`${qm(e)}\u2013${iw(e)-1} weak`},{band:"close",label:`${iw(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var Vm,lw=l(()=>{"use strict";aw();Vm=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${iM(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var xt,cw=l(()=>{"use strict";xt=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var aM,lM=l(()=>{"use strict";aM=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var g6,f6,cM,dM=l(()=>{"use strict";Hs();lw();cw();lM();g6=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],f6=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",cM=e=>{let t=e.wizard;if(t===void 0)return[];let r=xt(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=g6.map((f,y)=>{let p=!s&&!n&&y===r?"active":"done";return{id:`wizard-${y+1}`,label:f,state:p,detail:null}}).filter((f,y)=>s?!0:y<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=Vm(e),d=c.filter(f=>f.id==="round-0"),u=aM(t)&&(!n||a)?c.filter(f=>f.id!=="round-0"):[],m=W(e.status)&&!s,S=m?[{id:"end",label:f6(e),state:"done",detail:e.errorMessage}]:[];if(m&&S.length>0){let f=Math.min(r,i.length),y=i.slice(0,f).map(p=>({...p,state:"done"}));return[...d,...y,...S,...u]}return[...d,...i,...u,...S]}});var h6,dw,uM=l(()=>{"use strict";Hs();lw();dM();h6=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",dw=e=>{if(e.wizard!==void 0)return cM(e);let t=Vm(e),r=W(e.status)?[{id:"end",label:h6(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var Rl,pM=l(()=>{"use strict";Rl=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var mM=l(()=>{"use strict";kt()});var gM,xl,Il,Bs,Km,uw,fM=l(()=>{"use strict";mM();gM="/prompt-optimizer/agent",xl=`${hr}${gM}`,Il=`${hr}/prompt-optimizer`,Bs="The prompt optimizer runs the judge and improver inside the project folder on this Mac, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",Km=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this Mac. ${Bs}`,uw="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var Qt=l(()=>{"use strict"});var se,Ol=l(()=>{"use strict";Qt();se=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var pw,hM=l(()=>{"use strict";pw="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var yM,SM=l(()=>{"use strict";yM=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Ml,bM=l(()=>{"use strict";SM();Qt();Ml=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:yM(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var mw,PM=l(()=>{"use strict";Qt();mw=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var gw,wM=l(()=>{"use strict";Qt();gw=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var _M,Nl,vM=l(()=>{"use strict";_M=["generalize","evaluate","separate","optimize_modules"],Nl=(e,t)=>{let r=_M.indexOf(t);if(r===-1)return e;let o=_M.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var Jm,fw=l(()=>{"use strict";Hm();Jm=e=>{let t=Cl(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var zl,kM=l(()=>{"use strict";fw();zl=e=>{let t=Jm(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var S6,A6,b6,CM,TM=l(()=>{"use strict";S6=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),A6=/^\{\{[a-zA-Z0-9_-]+\}\}$/,b6=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(S6(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},CM=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>A6.test(n)?n:b6(n,r)).join("")}});var hw,LM=l(()=>{"use strict";TM();hw=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:CM(o.prompt,t)}))}))});var P6,Dl,WM=l(()=>{"use strict";Qt();fw();P6=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Dl=e=>{let t=Jm(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=P6(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var jl,EM=l(()=>{"use strict";ow();jl=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return Ll({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var $l,Sw=l(()=>{"use strict";Fs();$l=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ae(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var Aw,RM=l(()=>{"use strict";Sw();Aw=e=>{let t=$l({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var yn,xM=l(()=>{"use strict";yn=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var w6,_6,te,Ym=l(()=>{"use strict";Ol();w6=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},_6=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,te=e=>{let t=se(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:w6(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>_6(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var IM,OM=l(()=>{"use strict";Ol();Ym();IM=e=>{let t=te(e.wizard),r=se(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var bw,MM=l(()=>{"use strict";OM();bw=e=>{let t=IM({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var v6,NM,zM=l(()=>{"use strict";v6=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},NM=e=>[...e].reduce(v6,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var k6,DM,jM=l(()=>{"use strict";k6=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},DM=e=>[...e].reduce(k6,{out:"",inString:!1,escaped:!1}).out});var C6,T6,$M,HM=l(()=>{"use strict";zM();jM();C6=e=>e.charCodeAt(0)===65279?e.slice(1):e,T6=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},$M=e=>DM(NM(T6(C6(e))))});var L6,W6,E6,FM,R6,Gs,Xm=l(()=>{"use strict";XP();HM();L6=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},W6=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},E6=e=>[...e].reduce(W6,{out:"",inString:!1,escaped:!1}).out,FM=e=>{let t=Fm(e);return t.length===0?null:t[t.length-1]},R6=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Gs=e=>{let t=$M(L6(e)),r=FM(t);if(r!==null)return r;let o=E6(t),n=FM(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw R6(i)}}});var x6,I6,Pw,UM,BM=l(()=>{"use strict";x6=/^[a-z0-9][a-z0-9-]{0,62}$/,I6=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return x6.test(t)?t:""},Pw=e=>e.replace(/\s+/gu," ").trim(),UM=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=I6(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=Pw(n.name),a=Pw(n.description),c=Pw(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var GM,qM,VM=l(()=>{"use strict";GM=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},qM=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var ww,KM=l(()=>{"use strict";Xm();BM();VM();ww=(e,t)=>{let r=(()=>{try{return Gs(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(GM(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(qM).filter(a=>a!==null),i=UM({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var _w,JM=l(()=>{"use strict";_w=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var vw,YM=l(()=>{"use strict";vw=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var kw,XM=l(()=>{"use strict";Ol();Ym();kw=e=>{let t=te(e.wizard),r=se(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var Hl,ZM=l(()=>{"use strict";Hl=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var It,O6,Cw,QM=l(()=>{"use strict";It=g(Zn());Xm();O6=(0,It.isType)({name:It.isNonEmptyString,description:It.isString,sampleValue:It.isString}),Cw=e=>{let t=Gs(e);if(!(0,It.isType)({templatedPrompt:It.isNonEmptyString,variables:(0,It.isArrayWithEachItem)(O6)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var le,M6,N6,Tw,eN=l(()=>{"use strict";le=g(Zn());Qt();Xm();M6=(0,le.isType)({id:le.isNonEmptyString,title:le.isNonEmptyString,prompt:le.isNonEmptyString,order:le.isNumber}),N6=(0,le.isType)({id:le.isNonEmptyString,title:le.isNonEmptyString,summary:le.isString,topology:(0,le.isOneOf)("chain","parallel"),modules:(0,le.isArrayWithEachItem)(M6),recommended:le.isBoolean}),Tw=e=>{let t=Gs(e);if(!(0,le.isType)({options:(0,le.isArrayWithEachItem)(N6)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var qs,tN=l(()=>{"use strict";qs=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var z6,Lw,Ww=l(()=>{"use strict";z6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Lw=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(z6,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Ot,Mt,rN=l(()=>{"use strict";Fs();Ww();Ot=e=>Lw(e.templatedPrompt,e.variables),Mt=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ae(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Ot(e.wizard)}});var D6,Sn,oN=l(()=>{"use strict";D6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Sn=(e,t)=>e.replace(D6,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var j6,An,Zm=l(()=>{"use strict";j6=/\{\{([a-zA-Z0-9_-]+)\}\}/g,An=e=>{let t=new Set,r=[];for(let o of e.matchAll(j6)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Fl,nN=l(()=>{"use strict";Zm();Fl=e=>e.variables.length>0||An(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var Ew,Rw=l(()=>{"use strict";Qt();Ew=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Ul,sN=l(()=>{"use strict";Fs();Rw();Ul=e=>{let t=e.wizard.evaluateSelectedRound??ae(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:Ew(r.judgement,e.passScore)}});var Bl,iN=l(()=>{"use strict";Bl=e=>e.length===1&&e[0].modules.length===1});var xw,aN=l(()=>{"use strict";xw=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var be,Qm,Gl=l(()=>{"use strict";be=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),Qm=(e,t)=>`<p class="muted">The Mac runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var lN,cN=l(()=>{"use strict";Gl();lN=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[be("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),be("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[be("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var dN,uN=l(()=>{"use strict";Hs();Gl();dN=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!W(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[be("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>"),be("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),be("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this Mac",Qm(e.writerLabel,e.folder)),be("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[be("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var pN,mN=l(()=>{"use strict";Gl();pN=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[be("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),be("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[be("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var gN,fN=l(()=>{"use strict";Gl();gN=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[be("awl","Connected on this Mac (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),be("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",Qm(e.writerLabel,e.folder)),...r?[be("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var eg,hN=l(()=>{"use strict";Hs();cN();uN();mN();fN();eg=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(W(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return dN(r);case"evaluate":return lN({...r,currentRound:e.currentRound});case"separate":return gN(r);case"optimize_modules":return pN({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var ql,vr,yN=l(()=>{"use strict";ql=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),vr=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var $6,tg,Iw,SN=l(()=>{"use strict";Zm();$6="wizardParam_",tg=e=>`${$6}${e}`,Iw=e=>{let t=An(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=tg(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var at,AN=l(()=>{"use strict";at=["generalize","evaluate","separate","optimize_modules"]});var Vl,bn,Vs,kr=l(()=>{"use strict";Vl="Stopped because the confirmed token or spend budget was exceeded.",bn="Approaching the confirmed budget. Further trials may hard-stop.",Vs="Confirm the Step 4 token and spend budget before optimizing modules."});var lt,Ks=l(()=>{"use strict";lt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var zt,Kl=l(()=>{"use strict";kr();zt=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var H6,Cr,Jl=l(()=>{"use strict";kr();H6={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},Cr=e=>{let t=e?.trim()??"";return t.length===0?.01:H6[t]??.01}});var rg,Ow=l(()=>{"use strict";kr();Jl();rg=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=Cr(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var bN,ng,Mw,Nw=l(()=>{"use strict";kr();Ks();Kl();Ow();Jl();bN=e=>{let t=rg({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??Cr(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:lt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},ng=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),Mw=e=>{let t=e.existing??zt(),r=bN({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return ng(t,r)}});var Js,Yl,_N=l(()=>{"use strict";kr();Qt();Ks();Kl();Nw();Ow();Jl();Js=e=>{let t=rg({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??Cr(e.writerId),i=r*4e3,a=n*o*8e3,c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:lt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},Yl=e=>{let t=e.existing??zt();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=Js({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return ng(t,r)}});var Tr,vN=l(()=>{"use strict";Ks();kr();Kl();Tr=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??zt(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=lt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var Dw,Ys,kN=l(()=>{"use strict";kr();Ks();Dw=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=lt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:Vl,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:Vl,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:bn,costControls:{...t,softWarnFired:!0,softWarnMessage:bn}}:null},Ys=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var jw,CN=l(()=>{"use strict";jw=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var E=l(()=>{"use strict";Hs();$m();QO();KP();Bm();ow();tM();rM();oM();nM();JP();sM();Fs();uM();cw();aw();pM();fM();Qt();Ol();hM();bM();PM();wM();vM();kM();LM();WM();EM();Sw();RM();xM();Ym();MM();KM();JM();YM();XM();ZM();QM();eN();tN();rN();Ww();oN();Zm();nN();sN();iN();Rw();aN();hN();yN();SN();AN();kr();Ks();Kl();Nw();_N();Jl();vN();kN();CN()});var $w=l(()=>{"use strict";ba()});var F6,WN,EN=l(()=>{"use strict";$w();F6=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,WN=e=>{let t=Ko(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(F6)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var xN,U6,B6,er,G6,q6,RN,ig,IN,V6,gt,ON,MN,NN,Dt=l(()=>{"use strict";$w();EN();xN=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),U6=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,B6=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,er=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(U6.test(e.errorMessage))return"usage_limit";if(B6.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},G6="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",q6="The writer waited on terminal input and did not return a prompt.",RN=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,ig=e=>{let t=e.trim();if(t.length===0||t.length>=500||!RN.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>RN.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},IN=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},V6=e=>ig(e.stdout)??ig(e.stderr)??(IN(e.replyFile)?ig(e.replyFile):null),gt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return G6;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?q6:null},ON=e=>{let t=e.trim();return t.length===0?null:gt(t)!==null?t:ig(t)??(IN(t)?t:null)},MN=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],NN=e=>{let t=e.replyFileText?.trim()??"",r=gt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=V6({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=er({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=WN([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Ko(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var K6,DN,zN,wn,ag=l(()=>{"use strict";Dt();K6=400,DN=(e,t=K6)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},zN=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:ON(e.promptText)},wn=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:zN(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=zN(e.revisions[n]);if(s!==null)return s.trim()}return null}});var x,J6,lg,ie,_n,$N,jN,HN,FN,Pe=l(()=>{"use strict";x="manual",J6=["claude-cli","codex","cursor","antigravity"],lg={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ie=e=>e===x?"You":e in lg?lg[e]:e,_n=e=>J6.filter(t=>e.includes(t)),$N=e=>{let t=_n(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},jN=(e,t)=>t===x?x:e.find(r=>r===t)??null,HN=(e,t,r)=>{let o=_n(e),n=jN(o,t),s=jN(o,r);return n===null||s===null?null:{judge:n,improver:s}},FN=(e,t,r)=>{let o=_n(e);return t===null||t.trim()===""?r!==x?r:o[0]??null:t===x?null:o.find(n=>n===t)??null}});var UN,cg,Hw,vn,Fw,ct,Lr,ce,qe=l(()=>{"use strict";UN=g(require("node:fs")),cg=g(require("node:os")),Hw=g(require("node:path"));ws();vn="~",Fw=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,ct=e=>{let t=cg.default.homedir(),r=Fw(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Lr=e=>{let t=e.trim().length===0?"~":e.trim(),r=pt(t),o=Hw.default.isAbsolute(r)?Fw(r):Fw(Hw.default.resolve(cg.default.homedir(),r));try{if(!UN.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this Mac."}}return{ok:!0,path:o,display:ct(o)}},ce=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:cg.default.homedir()});var Je,mo=l(()=>{"use strict";Je='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var Uw,BN,Y6,GN,qN,Bw=l(()=>{"use strict";E();Pe();qe();mo();Uw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),BN=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',Y6=e=>{let t=BN(e.state),r=`<h2>${Uw(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${Uw(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Je}</button></div><template>${r}</template></li>`},GN=e=>{let t=e.wizard;if(t===void 0)return"";let r=eg({status:e.status,wizard:t,writerLabel:ie(e.judgeModel),runnerLabel:ie(e.runnerModel??e.judgeModel),folderDisplay:ct(ce(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this Mac">${r.map(Y6).join("")}</ol>`},qN=e=>{let t=e.wizard;if(t===void 0)return"";let r=eg({status:e.status,wizard:t,writerLabel:ie(e.judgeModel),runnerLabel:ie(e.runnerModel??e.judgeModel),folderDisplay:ct(ce(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this Mac</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${BN(n.state)}<span class="sdlc-pipeline-label">${Uw(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var jt,VN,KN,JN,Gw=l(()=>{"use strict";E();jt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),VN="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",KN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${jt(VN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${jt(i.name)}}}</strong> \u2014 ${jt(i.description)} (sample: ${jt(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${jt(r)}</pre>`,n=Ot(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${jt(n)}</pre>`;return`${t}${o}${s}`},JN=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${jt(VN)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${jt(n.name)}}}</strong> \u2014 ${jt(n.description)} (sample: ${jt(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${jt(r)}</pre>`;return`${t}${o}`}});var Xl,qw=l(()=>{"use strict";Xl=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var YN,XN=l(()=>{"use strict";E();YN=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=hn({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=fn({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var Vw,Zl,Kw=l(()=>{"use strict";mo();XN();Vw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zl=e=>{let t=YN(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${Vw(r)}">${Je}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${Vw(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${Vw(t)}</pre></template>`}});var Jw,Ql,Yw=l(()=>{"use strict";mo();Jw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ql=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${Jw(r)}">${Je}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${Jw(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${Jw(t)}</pre></template>`}});var dg,Xs,Xw=l(()=>{"use strict";qw();Kw();Yw();dg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xs=e=>{let t=Xl(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${dg(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,u=e.cycle.revisions.map(m=>{let S=m.judgement?.score,f=S==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${S}`,y=m.judgement?.reasons?.trim()??"",p=y.length===0?"":`<br><span class="muted">${dg(y)}</span>`,A=Ql({roundLabel:d(m.roundNumber),promptText:m.promptText}),b=Zl({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run}),h=`${A}${b}`;if(e.interactive){let P=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${P}> <span class="sdlc-wizard-revision-title">${dg(f)}</span></label>${h}${p}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${dg(f)}</span>${h}${p}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var Zw,ZN,QN,ez,Qw=l(()=>{"use strict";Zw=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ZN=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Zw(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Zw(t.prompt)}</pre></li>`).join("")}</ol>`,QN=e=>ZN([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),ez=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Zw(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${ZN(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var ec,X6,ug,e_=l(()=>{"use strict";E();Qw();ec=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),X6=e=>{let t=e.wizard;return t===void 0?"":Mt({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},ug=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=X6(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${ec(n.orchestratorSkill.fileName)}</code> \u2014 ${ec(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${ec(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=QN(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${ec(r)} <span class="muted">${ec(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var xe,Z6,Q6,eJ,tJ,pg,rJ,oJ,nJ,sJ,iJ,aJ,Zs,mg=l(()=>{"use strict";E();Bw();Gw();Xw();Kw();Yw();e_();xe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Z6={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},Q6=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${xe(o)}</pre>`:`<p class="sdlc-pre-preview mono">${xe(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${xe(o)}</pre></details>`;return`<h2>${xe(e)}</h2>${n}`},eJ=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=Ot(t).trim(),n=Mt({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!W(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${Q6("What is being evaluated",i)}`},tJ=(e,t)=>{let r=e.wizard;if(r===void 0||W(e.status))return"";let o=Z6[t];return o===void 0||r.phase!==o?"":qN(e)},pg=(e,t,r)=>{let o=tJ(e,t),n=t==="wizard-2"?eJ(e):"";return`${o}${n}${r}`},rJ=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},oJ=e=>{let t=e.wizard;return t===void 0?"":KN(t)},nJ=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${xe(a)}</span>`,d=`Round ${n.roundNumber}`,u=Ql({roundLabel:d,promptText:n.promptText}),m=Zl({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${xe(s)}${i}</span>${u}${m}${c}</li>`}).join("")}</ul>`,sJ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Xs({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=rJ(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${nJ(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=Mt({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${xe(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",u=`Round ${c.roundNumber} \u2014 score ${d}`,m=Ql({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),S=Zl({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${xe(u)}</span>${m}${S}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${xe(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},iJ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${xe(n.title)}</strong> <span class="muted">(${xe(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${xe(o.title)}</strong>${n}${xe(s)}${ug(e,o)}</li>`}).join("")}</ul>`},aJ=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${xe(i)}</span> <strong>${xe(n.title)}</strong>${xe(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${xe(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Xs({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Zs=(e,t)=>{switch(t){case"wizard-1":return pg(e,t,oJ(e));case"wizard-2":return pg(e,t,sJ(e));case"wizard-3":return pg(e,t,iJ(e));case"wizard-4":return pg(e,t,aJ(e));default:return""}}});var lJ,cJ,tz,rz,oz=l(()=>{"use strict";E();ag();Dt();mg();lJ=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},cJ=e=>{let t=e.goal.trim();return t.length===0?null:t},tz=(e,t,r,o,n)=>{let s=gt(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},rz=(e,t)=>{let r=cJ(e);if(t.id.startsWith("wizard-")){let s=Zs(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=Rl(e,t);if(s!==null){let a=wn(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ae(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:tz(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:lJ(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:tz(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var kn,nz,sz=l(()=>{"use strict";kn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nz=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${kn(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${kn(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${kn(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${kn(n)}</h2><pre class="mono">${kn(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${kn(e.goal)}</dd></div></dl>`;return`<h2>${kn(e.title)}</h2>${i}${t}${r}${o}${s}`}});var dJ,iz,tc,t_,gg=l(()=>{"use strict";E();dJ=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),iz=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||W(e.status))return null;let r=xt(t);return r<0||r>3?null:`wizard-${r+1}`},tc=(e,t)=>dJ.has(t)?iz(e)===t:!1,t_="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var uJ,fg,r_=l(()=>{"use strict";uJ='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',fg=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${uJ}</button>`});var Cn,hg=l(()=>{"use strict";E();Cn=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Tl({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:Wl(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var pJ,az,mJ,o_,lz,gJ,fJ,hJ,yJ,cz,dz=l(()=>{"use strict";E();hg();pJ={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},az=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},mJ=e=>pJ[e]??null,o_=(e,t)=>{let r=e.wizard,o=mJ(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=xt(r);return o<n||o===n},lz=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},gJ=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:Ot(t).trim();return o.length===0?null:zl({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:az(e,"generalize")})},fJ=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=Cn(e);return n===null?null:uo({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=lz(e)?.promptText.trim()??Mt({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:hn({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},hJ=e=>{let t=e.wizard;if(t===void 0)return null;let r=Mt({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:Dl({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:az(e,"separate")})},yJ=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=vr(t),s=Sn(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=Cn(e);return c===null?null:uo({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=lz(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||W(e.status)&&i?.judgement!==null)?fn({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):jl({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:yn(t,r).output,moduleTitle:o.title})},cz=(e,t)=>{if(!o_(e,t))return null;switch(t){case"wizard-1":return gJ(e);case"wizard-2":return fJ(e);case"wizard-3":return hJ(e);case"wizard-4":return yJ(e);default:return null}}});var SJ,yg,n_=l(()=>{"use strict";E();SJ=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},yg=(e,t)=>{let r=e.wizard,o=SJ(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=xt(r);return o<n?"done":o===n&&W(e.status)&&e.status==="failed"?"failed":o<=n&&W(e.status)?"done":"pending"}});var AJ,Qs,Sg=l(()=>{"use strict";mo();dz();n_();AJ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qs=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(yg(e,t)==="pending")return""}else if(!o_(e,t))return"";let o=cz(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Je}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${AJ(o)}</pre></template>`}});var Tn,Wr,ei=l(()=>{"use strict";Tn=e=>e.toLocaleString("en-US"),Wr=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var tr,bJ,uz,Ag,pz,mz,bg=l(()=>{"use strict";E();oz();sz();gg();r_();mo();ag();Bw();Sg();ei();tr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bJ=(e,t)=>{let r=Rl(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Wr(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${Tn(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${tr(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${tr(r)}</span>`:"",d=nz(rz(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&W(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${tr(e.id)}"`:"",m=tc(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${tr(t_)}"><input type="hidden" name="cycleId" value="${tr(t.id)}"><input type="hidden" name="wizardStepId" value="${tr(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",S=e.state==="active"&&e.id.startsWith("wizard-")?GN(t):"",f=o?"failed":e.state,y=o?wn(t):null,p=y!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Je}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${tr(y)}</pre></template>`:"",A=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Qs(t,e.id):"";return`<li class="sdlc-node sdlc-node-${f}" data-sdlc-step-id="${tr(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${tr(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${A}${p}</div></div>${S}<template>${d}</template></li>`},uz=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>bJ(r,t)).join("")}</ol>`,Ag=e=>`<div class="sdlc-score" aria-label="What the score means">${El(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${tr(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,pz=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${fg({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,mz=`<script>
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
</script>`});var Pg,wg,_g,gz,s_=l(()=>{"use strict";Pg="support-reply",wg="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",_g=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),gz=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var vg,fz,hz=l(()=>{"use strict";E();bg();s_();vg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fz=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${Ag(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${vg(wg)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${vg(_g)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${vg(gz)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${vg(Pg)}">Run this sample</a>
      </div>
    </section>`});var i_,kg,PJ,yz,Sz=l(()=>{"use strict";i_=g(require("node:fs")),kg=g(require("node:path")),PJ=e=>kg.default.join(kg.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),yz=(e,t)=>{let r=PJ(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;i_.default.mkdirSync(kg.default.dirname(r),{recursive:!0}),i_.default.appendFileSync(r,o,"utf8")}});var ti,Az,wJ,bz,_J,Pz,rr,X,wz,z,dt=l(()=>{"use strict";ti=g(require("node:fs")),Az=g(require("node:path"));E();Sz();wJ=e=>e.wizard===void 0?e:{...e,wizard:mw(e.wizard)},bz=new Set,_J=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),Pz=(e,t)=>{ti.default.mkdirSync(Az.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;ti.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),ti.default.renameSync(r,e)},rr=e=>{if(!ti.default.existsSync(e))return[];try{let t=JSON.parse(ti.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(_J).map(wJ):[]}catch{return[]}},X=(e,t)=>rr(e).find(r=>r.id===t)??null,wz=(e,t)=>{bz.add(t);let r=rr(e).filter(o=>o.id!==t);Pz(e,r)},z=(e,t)=>{if(bz.has(t.id))return;let r=rr(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];Pz(e,o),yz(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var ri,or,rc,_z,Cg,vJ,vz,kz,Cz,a_=l(()=>{"use strict";ri=g(require("node:fs")),or=g(require("node:path")),rc=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},_z=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Cg=(e,t)=>{let r=rc(e);return r.length>0?r:rc(t)},vJ=e=>{let t=Cg(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${_z(o)}`,...n.length>0?[`description: ${_z(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},vz=e=>`.cursor/skills/${e}/SKILL.md`,kz=(e,t)=>{let r=rc(t);if(r.length===0)return!1;let o=or.default.resolve(e),n=or.default.resolve(o,".cursor","skills"),s=or.default.resolve(o,vz(r));return s.startsWith(`${n}${or.default.sep}`)?ri.default.existsSync(s):!1},Cz=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Cg(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=or.default.resolve(e.workingDirectory);try{if(!ri.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=vJ({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=vz(r.slug),n=or.default.resolve(t,".cursor","skills"),s=or.default.resolve(t,o);if(!s.startsWith(`${n}${or.default.sep}`))return{ok:!1,errorCode:"path"};if(ri.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{ri.default.mkdirSync(or.default.dirname(s),{recursive:!0}),ri.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var kJ,Tz,Lz,Wz=l(()=>{"use strict";E();dt();qe();Dt();a_();kJ=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,Tz=e=>{let t=e.get("savedSkill");return t!==null&&kJ.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this Mac.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this Mac.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},Lz=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=X(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!W(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ae(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||gt(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=Cz({workingDirectory:ce(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var Tg,Lg,oc=l(()=>{"use strict";E();Tg=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=Tr({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},Lg=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var go,nc=l(()=>{"use strict";E();oc();go=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=xw(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=Mw({moduleCount:o.length,existing:e.costControls,writerId:n}),i=Tg(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:ql(r.variables)},updatedAt:new Date().toISOString()}}});var fo,sc=l(()=>{"use strict";fo=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var l_=l(()=>{"use strict";Tt();gl();ba()});var c_,Ez,d_,Rz,xz=l(()=>{"use strict";c_={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},Ez=e=>e.exitCode===null&&e.signalCode===null,d_=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!Ez(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!Ez(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),Rz=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),d_(e).then(s=>{r({...c_,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var Iz,ic,Oz,u_,CJ,m_,g_,TJ,LJ,WJ,Mz,EJ,p_,Nz,ac,zz,RJ,xJ,Ye,Ln=l(()=>{"use strict";Iz=require("node:child_process"),ic=g(require("node:fs")),Oz=g(require("node:os")),u_=g(require("node:path"));l_();xz();Dt();CJ=["claude-cli","codex","cursor","antigravity"],m_=18e4,g_=6e5,TJ=12e4,LJ=9e5,WJ="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",Mz="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",EJ="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",p_=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},Nz=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=p_(process.env[Mz])??Math.max(r,g_));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:p_(process.env[EJ])??LJ;return Math.min(o,Math.max(TJ,r))},ac=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?p_(process.env[Mz])??g_:m_,zz=e=>`The writer timed out after ${e}ms.`,RJ=e=>CJ.includes(e),xJ=e=>e===!0||process.env[WJ]==="1",Ye=e=>new Promise(t=>{if(e.signal?.aborted){t(c_);return}if(xJ(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!RJ(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this Mac."});return}let r=e.writerAgent,o=Kt(r,e.prompt,me({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!ic.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this Mac."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:m_,s=u_.default.join(ic.default.mkdtempSync(u_.default.join(Oz.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=MN({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,Iz.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=S=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(S))};Rz(u,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",d_(u).then(S=>{m({ok:!1,errorMessage:zz(n),errorKind:"writer_timeout",killSignal:S})})},n),u.stdout.on("data",S=>{a.push(Buffer.from(S))}),u.stderr.on("data",S=>{c.push(Buffer.from(S))}),u.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",()=>{if(d.settled)return;let S=ic.default.existsSync(s)?ic.default.readFileSync(s,"utf8"):null,f=NN({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:S});if(f.ok&&d.stopReason!=="abort"){m(f);return}d.stopReason===null&&m(f)})})});var IJ,lc,f_=l(()=>{"use strict";E();ei();IJ=e=>{if(e.wizard!==void 0){let t=Hl(e.wizard),r=Wr(e);return(t??0)+r}return Wr(e)},lc=e=>{let t=Dw({costControls:e.costControls,spentTokens:IJ(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var Dz,OJ,cc,Wg,Eg=l(()=>{"use strict";E();Pe();f_();Dz=e=>e===x?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},OJ=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),cc=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=rw({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:Dz(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?jw({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:Wl(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=OJ(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?lc({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):lc({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},Wg=(e,t,r=null)=>{let o=Gm({raw:t,judge:Dz(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Rg,h_=l(()=>{"use strict";Rg=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var Hz,xg,Ig,jz,$z,y_,MJ,Fz,S_,NJ,Uz,zJ,DJ,Bz,Gz=l(()=>{"use strict";Hz=require("node:child_process"),xg=g(require("node:fs")),Ig=g(require("node:path"));sm();E();jz=4e3,$z=12e3,y_=(e,t)=>{let r=(0,Hz.spawnSync)("git",[...t],{cwd:e,env:io(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},MJ=e=>y_(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",Fz=e=>{let t=y_(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},S_=(e,t)=>{let r=Ig.default.resolve(e,t),o=Ig.default.relative(e,r);if(o.startsWith("..")||Ig.default.isAbsolute(o)||!xg.default.existsSync(r)||!xg.default.statSync(r).isFile())return null;let n=xg.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>jz?`${n.slice(0,jz)}
\u2026truncated`:n},NJ=e=>e.length>$z?`${e.slice(0,$z)}
\u2026truncated`:e,Uz=e=>{let t=sw(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,S_(e.workingDirectory,n)])),o=MJ(e.workingDirectory);return{git:o,status:o?Fz(e.workingDirectory):{},files:r,paths:t}},zJ=(e,t)=>{let r=y_(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=S_(e,t);return o===null?`${t} is missing.`:o},DJ=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",Bz=e=>{let t=e.before.git?Fz(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=S_(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>zJ(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:DJ(e.before.git,e.before.paths.length>0),evidence:NJ(i.join(`

`))}}});var P_,B,w_,Ie,qz,jJ,$J,Vz,oi,Kz,ni,HJ,FJ,dc,A_,b_,UJ,Jz,BJ,GJ,qJ,Yz,VJ,Xz,Zz,KJ,JJ,Qz,eD=l(()=>{"use strict";P_=require("node:child_process"),B=g(require("node:fs")),w_=g(require("node:os")),Ie=g(require("node:path"));sm();qz=8e6,jJ=16e6,$J=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],Vz=(e,t)=>{let r=(0,P_.spawnSync)("git",[...t],{cwd:e,env:io(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},oi=(e,t)=>(0,P_.spawnSync)("git",[...t],{cwd:e,env:io(),timeout:8e3}).status===0,Kz=e=>{let t=Vz(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},ni=(e,t)=>{let r=Ie.default.resolve(e,t),o=Ie.default.relative(e,r);return o.startsWith("..")||Ie.default.isAbsolute(o)?null:r},HJ=(e,t)=>{let r=ni(e,t);if(r===null||!B.default.existsSync(r))return null;let o=B.default.statSync(r);return!o.isFile()||o.size>qz?null:B.default.readFileSync(r)},FJ=(e,t,r)=>{let o=ni(e,t);o!==null&&(B.default.mkdirSync(Ie.default.dirname(o),{recursive:!0}),B.default.writeFileSync(o,r))},dc=(e,t)=>{let r=ni(e,t);r===null||!B.default.existsSync(r)||B.default.rmSync(r,{recursive:!0,force:!0})},A_=(e,t)=>oi(e,["cat-file","-e",`HEAD:${t}`]),b_=e=>{let t=Vz(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},UJ=e=>Ie.default.resolve(e)!==Ie.default.resolve(w_.default.homedir()),Jz=e=>{if(!B.default.existsSync(e))return 0;let t=B.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?B.default.readdirSync(e).reduce((r,o)=>r+Jz(Ie.default.join(e,o)),0):0},BJ=(e,t,r)=>{let o=ni(e,r);if(o===null||!B.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(Jz(o)>jJ)return{relativePath:r,existed:!0,copyDir:null};let n=Ie.default.join(t,"cache",r);return B.default.mkdirSync(Ie.default.dirname(n),{recursive:!0}),B.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},GJ=400,qJ=32e6,Yz=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!B.default.existsSync(s)))for(let i of B.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=Ie.default.join(s,i),c=B.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>qz)){if(t.length>=GJ||r+c.size>qJ){o=!1;return}r+=c.size,t.push(Ie.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},VJ=(e,t,r)=>{let o=ni(e,r);if(o===null||!B.default.existsSync(o))return null;let n=HJ(e,r);if(n===null)return"skip";let s=Ie.default.join(t,"files",r);return B.default.mkdirSync(Ie.default.dirname(s),{recursive:!0}),B.default.writeFileSync(s,n),s},Xz=e=>{let t=B.default.mkdtempSync(Ie.default.join(w_.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?Kz(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:Yz(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,VJ(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?b_(e.workingDirectory):null,isolateCaches:UJ(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:$J.map(i=>BJ(e.workingDirectory,t,i))}},Zz=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){dc(e.workingDirectory,t);return}FJ(e.workingDirectory,t,B.default.readFileSync(r))}},KJ=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?Zz(e,t):A_(e.workingDirectory,t)?oi(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):dc(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&A_(e.workingDirectory,t)&&oi(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!A_(e.workingDirectory,t)&&oi(e.workingDirectory,["reset","-q","HEAD","--",t])},JJ=(e,t)=>{let r=ni(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){dc(e.workingDirectory,t.relativePath),B.default.mkdirSync(Ie.default.dirname(r),{recursive:!0}),B.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){dc(e.workingDirectory,t.relativePath);return}if(B.default.existsSync(r))for(let o of B.default.readdirSync(r)){let n=Ie.default.join(r,o);B.default.statSync(n).mtimeMs>=e.startedMs-1e3&&B.default.rmSync(n,{recursive:!0,force:!0})}}}},Qz=e=>{try{if(e.git){if(b_(e.workingDirectory)!==e.head&&(!(e.head===null?oi(e.workingDirectory,["update-ref","-d","HEAD"]):oi(e.workingDirectory,["reset","--hard",e.head]))||b_(e.workingDirectory)!==e.head))throw new Error("head");let r=Kz(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))KJ(e,o)}else{if(e.complete)for(let t of Yz(e.workingDirectory).paths)e.files[t]===void 0&&dc(e.workingDirectory,t);for(let t of Object.keys(e.files))Zz(e,t)}for(let t of e.caches)JJ(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{B.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Og,Mg,YJ,XJ,ZJ,QJ,e7,tD,t7,rD,oD=l(()=>{"use strict";E();Eg();h_();Gz();eD();Pe();qe();Dt();Ln();Og=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),Mg=e=>({...e,status:"stopped",errorMessage:gn,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),YJ=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),XJ=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==x?t:e.improverModel!==x?e.improverModel:null}return e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null},ZJ=async e=>{let t=ce(e.cycle),r=Uz({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=Xz({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?jl({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:yn(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):Ll({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=Nz({promptText:e.revision.promptText,isModuleRun:i}),c=ac({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await Ye({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=u.ok?Bz({workingDirectory:t,before:r,writerReply:u.text}):null,S=Qz(o),f={...e.cycle,revisions:e.cycle.revisions.map(y=>y.roundNumber===e.cycle.currentRound?d:y)};return u.ok?!S.ok||m===null?{ok:!1,cycle:Og(f,S.ok?"Could not put the folder back after the run.":S.errorMessage)}:{ok:!0,cycle:f,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:Mg(f)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Og(f,u.errorMessage,er(u))})},QJ=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:ZJ({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),e7=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),tD=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Ye({writerAgent:e.reviewer,workingDirectory:ce(e.cycle),prompt:nw({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:Mg(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},t7=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===x)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Ye({writerAgent:t.judgeModel,workingDirectory:ce(t),prompt:hn({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...cc(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?Mg(o):(e.onWriterFailure?.(t.judgeModel),Og(o,n.errorMessage,er(n)))},rD=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return t7(e);let o=XJ(t),n=await QJ({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?YJ(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===x){let u=await tD({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{...e7(s,u.text),judgePhase:void 0}}let i=await Ye({writerAgent:t.judgeModel,workingDirectory:ce(t),prompt:fn({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?Mg(s):(e.onWriterFailure?.(t.judgeModel),Og(s,i.errorMessage,er(i)));let a=await tD({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=cc(s,i.text,c);return Rg(d,a.text)}});var Ng,r7,o7,__,nD=l(()=>{"use strict";E();Eg();oD();hg();Dt();Pe();f_();qe();Ln();Ng=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),r7=e=>({...e,status:"stopped",errorMessage:gn,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),o7=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?r7(e):(n?.(r),Ng(e,t.errorMessage,er(t))),__=async(e,t,r,o)=>{let n=lc(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return Ng(e,"This round has no prompt.");if(e.status==="judging")return rD({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return Ng(e,"This cycle is waiting on a step this Mac cannot run.");if(e.improverModel===x)return e;let i=Cn(e);if(i===null)return Ng(e,"The improver needs the score and the reason.");let a=await Ye({writerAgent:e.improverModel,workingDirectory:ce(e),prompt:uo({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:ac()}),c=o7(e,a,e.improverModel,r,t);return c!==null?c:Wg(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var uc,v_,n7,iD,sD,s7,i7,zg,aD,lD,a7,l7,Wn,cD,dD,pc=l(()=>{"use strict";E();nc();sc();Pe();qe();Dt();Ln();nD();qw();uc=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),v_=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return uc(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},n7=e=>{let t=er(e);return xN(e)||t==="usage_limit"||t==="action_required"},iD=(e,t,r)=>n7(r)?uc(e,r.errorMessage,er(r)):v_(e,t,r.errorMessage),sD=e=>{let t=e.wizard;return t===void 0||Xl(e).length===0?e:{...e,wizard:qs({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},s7=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",i7=e=>{let t=e.wizard;if(t===void 0)return e;let r=$l({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:qs({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},zg=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),aD=e=>e.judgeModel!==x?e.judgeModel:e.improverModel!==x?e.improverModel:null,lD=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},a7=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=aD(e);if(n===null)return uc(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Ot(o),i=zl({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:lD(e,"generalize")}),a=await Ye({writerAgent:n,prompt:i,workingDirectory:ce(e),signal:t});if(!a.ok)return r?.(n),iD(e,"generalize",a);try{let c=Cw(a.text),d=qs({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:ql(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return Fl(d)?Wn({...u,wizard:{...d,gate:null}}):zg(u,"generalize")}catch(c){return v_(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},l7=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=aD(e);if(n===null)return uc(e,"Choose a writer to suggest splits.");let s=Mt({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Dl({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:lD(e,"separate")}),a=await Ye({writerAgent:n,prompt:i,workingDirectory:ce(e),signal:t});if(!a.ok)return r?.(n),iD(e,"separate",a);try{let c=Tw(a.text),d=hw(c,o.variables),u=qs({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:u};return Bl(d)?go(m,d[0]):zg(m,"separate")}catch(c){return v_(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},Wn=e=>{let t=e.wizard;if(t===void 0)return e;let r=Ot(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},cD=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return uc(e,"This module is missing.");let n=vr(r),s=Sn(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==x?e.runnerModel:e.judgeModel!==x?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:se(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},dD=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return __(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return a7(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return l7(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await __(e,t,r,o);if(W(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Xl(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=ae(s.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??0,reasons:S.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&Ul({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let u=sD(zg(a,i));return fo(u)}let c=zg(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=Aw({wizard:{...c.wizard,modules:c.wizard.modules.map((m,S)=>S===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:s7(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?sD(d):i7(d)}return s}return n.phase==="complete",e}});var si,Dg=l(()=>{"use strict";E();Pe();si=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:_w(r,e.judgeModel===x),updatedAt:new Date().toISOString()}}});var ii,jg=l(()=>{"use strict";ii=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var ft,uD,c7,pD=l(()=>{"use strict";E();qe();jg();Dt();a_();ft=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uD=e=>{if(!W(e.status))return"";let t=ae(e.revisions.map(S=>({roundNumber:S.roundNumber,promptText:S.promptText,score:S.judgement?.score??null,reasons:S.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=gt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${ft(t.reasons.trim())}</p>`,i=e.status==="passed",a=ii(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${ft(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${ft(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${ft(n)}</div>`:i?c7({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:ce(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${ft(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${ft(t.promptText)}</pre></details>`,m=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${m}</h2>${d}${o}${s}${u}</section>`},c7=e=>{let t=e.sourceSkill?.fileName??rc(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=Cg(t,r),s=n.length>0&&kz(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${ft(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${ft(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${ft(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${ft(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${ft(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${ft(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var mD,gD=l(()=>{"use strict";mD=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var fD,d7,$g,Xe,Hg,k_=l(()=>{"use strict";E();Pe();gD();ag();Dt();jg();fD=["Generalize","Evaluate","Separate","Optimize modules"],d7=e=>{let t=xt(e),r=t>=0&&t<fD.length?fD[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},$g=(e,t)=>{let r=wn(e),o=r===null?null:mD(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Xe=(e,t)=>({title:e,detail:t,replyPreview:null}),Hg=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=wn(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:DN(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!W(e.status)){let t=e.judgeModel;return Xe(`${ie(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this Mac.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!W(e.status)){let t=e.judgeModel;return Xe(`${ie(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this Mac.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===x?Xe(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Xe(`${ie(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Xe(`${ie(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===x){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==x?Xe(`${ie(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Xe(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this Mac can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Xe(`${ie(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=se(t);return Xe(`${ie(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Xe(`${ie(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=se(t);return Xe(`${ie(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Xe(`${ie(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===x){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Xe("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Xe(`${ie(e.improverModel)} is rewriting the prompt.`,"That writer is working on this Mac. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>gt(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=te(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||W(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?$g(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=ii(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?$g(e,{title:`${d7(r)}${s}`,detail:t.length>0?t:n}):$g(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(W(e.status)){let t=e.errorMessage?.trim()??"";return $g(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this Mac.",detail:"This panel keeps updating.",replyPreview:null}}});var nr,mc=l(()=>{"use strict";Pe();nr=e=>{if(e.status==="improving"&&e.improverModel===x)return!0;if(e.status!=="judging"||e.judgeModel!==x)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===x}});var hD,yD=l(()=>{"use strict";hD=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var ho,u7,SD,AD=l(()=>{"use strict";E();ho=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),u7=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${ho(r)}</p>`},SD=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${ho(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${ho(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${ho(a)}.</p>`}<pre class="mono">${ho(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${po(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${ho(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",m=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${ho(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${u7(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${ho(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var gc,p7,bD,PD=l(()=>{"use strict";E();Dt();gc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p7=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=gt(t.promptText),n=t.judgement?.reasons?`<p class="muted">${gc(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${gc(i)}.</p>`}<pre class="mono">${gc(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${po(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${gc(d)}</pre>`:`<div class="alert-error">${gc(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${u}</article>`},bD=e=>e.revisions.map(t=>p7(e,t)).join("")});var wD,_D=l(()=>{"use strict";E();wD=e=>{if(W(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var sr,m7,C_,g7,f7,h7,y7,vD,kD,T_=l(()=>{"use strict";_D();sr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),m7="Stop this run? Writers will stop and the best prompt is kept.",C_="End the wizard? Writers will stop and progress from finished steps is kept.",g7="Skip this module and pause at the step gate?",f7=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${sr(m7)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${sr(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,h7=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${sr(C_)}"><input type="hidden" name="cycleId" value="${sr(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,y7=e=>{let t=sr(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${sr(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${sr(g7)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${sr(C_)}">End wizard</button>
    </form>
  </div>`},vD=e=>{let t=wD(e);return t==="none"?"":t==="legacy_stop"?f7(e.id):t==="wizard_end_only"?h7(e.id):y7(e)},kD=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=sr(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${sr(C_)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var CD,TD=l(()=>{"use strict";E();ei();CD=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=te(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${Tn(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${Tn(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${se(r)}`}return""}});var S7,A7,LD,b7,WD,ED=l(()=>{"use strict";E();TD();n_();mg();Sg();S7=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',A7=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',LD=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),b7=(e,t,r)=>{let o=Zs(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=CD(e,t),i=yg(e,t),a=S7(i),c=A7(i),d=Qs(e,t,{forOutcomeSummary:!0}),u=`${a}<span class="sdlc-wizard-outcome-step-title">${LD(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${LD(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",S=i==="failed"&&t!=="wizard-4"?" open":"",f=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${f}"${m}${S}><summary aria-controls="${f}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${f}-body">${o}</div></details>`},WD=e=>{let t=e.wizard;if(t===void 0||!W(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>b7(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var RD,xD,ID=l(()=>{"use strict";RD=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xD=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${RD(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${RD(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var L_,OD,W_=l(()=>{"use strict";L_=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,OD=(e,t)=>{if(L_(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var MD,ND=l(()=>{"use strict";MD=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var Fg,zD,DD=l(()=>{"use strict";E();W_();W_();ND();Fg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zD=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=te(t),o=se(t),n=r.terminalStatusSuggestion==="passed"?"":MD(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,f=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",y=u===void 0?c.status:OD(u,o),p=u!==void 0&&L_(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':y==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':y==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':Fg(y);return`<tr${f}><td>${Fg(c.title)}</td><td>${Fg(m)}</td><td>${c.tokens??"\u2014"}</td><td>${p}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${Fg(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var En,Ug,E_=l(()=>{"use strict";En=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ug=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${En(r.fileName)}</code> \u2014 ${En(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${En(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${En(i.name)}</strong> <code>.cursor/skills/${En(i.fileName)}/SKILL.md</code></p><p class="muted">${En(i.description)}</p><p>${En(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var P7,jD,$D=l(()=>{"use strict";E();ID();DD();E_();P7=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jD=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!W(e.status)||t.modules.length===0)return"";let r=zD(e),o=xD(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=te(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${P7(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${Ug(e)}${a}${r}${o}</section>`}});var V,Bg=l(()=>{"use strict";E();V={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var Gg,R_=l(()=>{"use strict";Gg=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var HD,FD=l(()=>{"use strict";Bg();R_();HD=e=>{let t=Gg({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:V.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var Er,fc=l(()=>{"use strict";Er=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var Rr,qg,x_=l(()=>{"use strict";E();bg();pD();k_();mc();yD();hg();AD();PD();T_();ED();$D();ei();FD();qe();fc();Rr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qg=e=>{let t=!W(e.status)&&e.status!=="wizard_paused"&&!nr(e),r=Hg(e),o=uz(dw(hD(e)),e),n=W(e.status)?"":vD(e),s=WD(e),i=jD(e),a=uD(e),c=e.errorMessage===null?"":`<div class="alert-error">${Rr(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?te(e.wizard):null,S=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,f=!t&&e.wizard!==void 0&&W(e.status)&&(e.wizard.phase==="complete"||te(e.wizard).passedModuleCount>0),y=f?S?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",p=f&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${Rr(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",A=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${Rr(r.replyPreview)}</pre>`,b=r.detail.length===0&&p.length===0&&A.length===0||r.detail.length===0&&A.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${Rr(r.detail)}${u}</p>`}${A}</div>`,h=e.revisions.find(ko=>ko.roundNumber===e.currentRound),P=e.status==="improving"?Cn(e):null,_=Wr(e),k=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),C=nr(e)?SD({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:P?.promptText??h?.promptText??"",score:P?.score??h?.judgement?.score??null,reasons:P?.reasons??h?.judgement?.reasons??null,avoid:P?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:h?.run??null,minJudgeScore:k?1:0}):"",L=e.wizard!==void 0&&e.wizard.phase==="complete"&&W(e.status),R=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",I=e.wizard!==void 0&&!L&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?se(e.wizard):e.passScore,N=R?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${Ag(I)}</div>`:"",U=e.status==="failed"?HD({status:e.status,errorKind:e.errorKind}):null,G=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':W(e.status)?U!==null?`<span class="${U.badgeClass}">${U.badgeLabel}</span>`:L&&m!==null&&!S?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",q=t?d:f?S?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',Ve=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${Rr(ct(ce(e)))}</li>`:"",_>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Tn(_)} so far</li>`:""].filter(ko=>ko.length>0),$=Ve.length===0?"":`<ul class="sdlc-run-meta">${Ve.join("")}</ul>`,ve=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,qr=L?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,dr=L?"":N.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${qr}</div>`:`<div class="sdlc-run-grid">${qr}${N}</div>`,BC=bD(e),xG=e.wizard!==void 0&&W(e.status)&&e.revisions.every(ko=>ko.roundNumber===0&&(ko.judgement===void 0||ko.judgement===null)),IG=BC.length===0||xG?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${BC}</div></section>`,OG=`<p class="sdlc-run-goal" title="${Rr(e.goal.trim())}">${Rr(Er(e.goal))}</p>`,MG=L?`${c}${i}${s}${C}${a}`:`${c}${dr}${C}${s}${a}`,NG='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',zG=L?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${Rr(e.updatedAt)}" aria-busy="${t?"true":"false"}">${NG}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${G}</div>${OG}<div class="sdlc-run-activity${y}"${f?' role="status"':""}><div class="sdlc-run-activity-icon">${q}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${Rr(r.title)}</h2>${b}${p}${zG}</div></div>${$}${ve}</header>${MG}</section>${IG}`}});var UD,BD=l(()=>{"use strict";E();sc();UD=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Ul({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:fo(e)}});var GD,qD=l(()=>{"use strict";E();pc();GD=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Fl(t)?e:Wn({...e,wizard:{...t,gate:null}})}});var VD,KD=l(()=>{"use strict";E();nc();VD=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Bl(t.splitOptions))return e;let r=t.splitOptions[0];return go(e,r)}});var w7,Rn,Vg=l(()=>{"use strict";BD();qD();KD();dt();w7=e=>{let t=GD(e),r=UD(t);return VD(r)},Rn=(e,t)=>{let r=w7(t);return r!==t?(z(e,r),r):t}});var JD,xr,hc=l(()=>{"use strict";E();JD=e=>at.indexOf(e),xr=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||W(e.status)?at.length:t.gate!==null?JD(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?JD(t.phase):null}});var YD,XD=l(()=>{"use strict";YD=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var xn,ZD,QD=l(()=>{"use strict";E();XD();xn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ZD=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=yn(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${xn(YD(o))}</pre></div>`:"",s=An(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=vr(t),a=s.map(c=>{let d=t.variables.find(y=>y.name===c),u=tg(c),m=i[c]??"",S=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,f=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${xn(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${xn(u)}">${xn(S)}</label>
        ${f}
        <input class="input" type="text" id="${xn(u)}" name="${xn(u)}" value="${xn(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var ej,tj=l(()=>{"use strict";ej={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var yc,_7,de,yo=l(()=>{"use strict";tj();mo();yc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_7=e=>{let t=ej[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${yc(t.title)}" aria-describedby="${r}" aria-expanded="false">${Je}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${yc(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${yc(t.example)}</span></span></button>`},de=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${yc(r)}"`}>${yc(e)}</span>${_7(t)}</span>`});var ht,rj,oj,nj=l(()=>{"use strict";E();oc();Bg();yo();ht=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rj=e=>{let t=e.costControls;if(t===void 0||Ys(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??lt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${ht(V.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${ht(t.softWarnMessage??bn)}</p>`:"",d=Lg({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${ht(V.estimateOverCeilingWarn)}</p>`:"",u=e.wizard?.modules.length??0,m=u>0?`<p class="muted">Step 4 will optimize ${u} module${u===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${ht(V.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${ht(V.confirmLede)}</p>
  ${m}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${ht(Vs)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${ht(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${ht(V.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${ht(V.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${ht(V.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${de(V.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${de(V.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${ht(V.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${ht(V.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},oj=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!Ys(r)}});var v7,sj,ij=l(()=>{"use strict";mo();v7=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sj=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${Je}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${v7(t)}</pre></template>`}});var Sc,aj,lj=l(()=>{"use strict";E();Gw();QD();Xw();T_();E_();e_();nj();ij();Sc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aj=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(oj(e))return rj(e);let n=se(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?JN(r):"",a=o==="evaluate"?Ug(e):"",c=o==="evaluate"?Xs({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(I=>{let N=I.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',U=I.recommended?' <span class="sdlc-badge">Recommended</span>':"",G=r.selectedSplitOptionId===I.id||r.selectedSplitOptionId===null&&I.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${Sc(I.id)}" required${G}> <strong>${Sc(I.title)}</strong>${N}${U}</label>${ug(e,I)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],f=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",y=m?.title??"Module",p=m?.prompt??"",A=m?.status==="pending",b=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Sc(y)}</p>${A?ZD({cycle:e,modulePrompt:p}):""}<p class="muted">Test run prompt preview: ${Sc(Sn(p,vr(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${Xs({cycle:e,interactive:!1,caption:A?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${y}\u201D (runner + judge).`})}`:"",h=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":A?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",P=Hl(r),_=P===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${P}</p>`,k=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?sj(r.lastWriterParseFailureReply??""):"",C=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",L=t?.active===!0?" sdlc-wizard-gate-active":"",R=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${C}"`:"";return`<section class="card sdlc-wizard-gate${L}"${R}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${h}</p>
    ${k}
    ${_}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Sc(e.id)}">
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
    ${kD(e)}
  </section>`}});var k7,cj,dj=l(()=>{"use strict";E();Sg();k7=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cj=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||W(e.status))return"";let r=(o,n)=>{let s=Qs(e,o);return`<h2 class="sdlc-wizard-active-head">${k7(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var I_,uj,pj,So,mj,ai=l(()=>{"use strict";E();dt();I_=new Map,uj=e=>{let t=new AbortController;return I_.set(e,t),t.signal},pj=e=>{I_.delete(e)},So=e=>{I_.get(e)?.abort()},mj=(e,t)=>{let r=X(e,t);return r===null||r.wizard!==void 0?!1:(W(r.status)||(z(e,{...r,status:"stopped",errorMessage:gn,updatedAt:new Date().toISOString()}),So(t)),!0)}});var gj,fj,O_,hj,M_=l(()=>{"use strict";E();hc();ai();gj="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",fj=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return at[r]??null},O_=(e,t)=>{let r=fj(t);if(r===null||e.wizard===void 0)return!1;let o=at.indexOf(r);if(o===-1)return!1;let n=xr(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<at.length)},hj=(e,t)=>{let r=fj(t);if(r===null||e.wizard===void 0||!O_(e,t))return e;So(e.id);let o=at.slice(at.indexOf(r)),n=Nl(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var N_,yj,Sj=l(()=>{"use strict";M_();N_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yj=(e,t)=>O_(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${N_(gj)}"><input type="hidden" name="cycleId" value="${N_(e.id)}"><input type="hidden" name="wizardStepId" value="${N_(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var C7,Aj,T7,bj,Pj=l(()=>{"use strict";E();hc();lj();dj();Sj();mg();C7={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},Aj=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),T7=(e,t,r)=>{let o=yj(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${Aj(t)}">
  <summary class="sdlc-wizard-accordion-summary">${Aj(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${Zs(e,t)}</div>
</details>`},bj=e=>{let t=e.wizard;if(t===void 0)return"";let r=xr(e);if(r===null)return"";let o=at.slice(0,r).map((i,a)=>T7(e,`wizard-${a+1}`,C7[i])),n=t.gate!==null?aj(e,{active:!0}):cj(e),s=r>=at.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var Kg,z_=l(()=>{"use strict";Pj();Qw();E();Kg=e=>{if(e===null||e.wizard!==void 0&&W(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=bj(e),r=ez(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var L7,D_,wj=l(()=>{"use strict";E();Pe();qe();Ln();L7=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},D_=async(e,t,r)=>{if(!L7(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===x)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=bw({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Ye({writerAgent:e.judgeModel,prompt:n,workingDirectory:ce(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=ww(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var Ac,Jg,_j,j_,vj,kj,Cj,Yg,$_=l(()=>{"use strict";Ac=g(require("node:fs")),Jg=g(require("node:path")),_j=e=>Jg.default.join(Jg.default.dirname(e),"prompt-optimizer-writer-ready.json"),j_=e=>{let t=_j(e);if(!Ac.default.existsSync(t))return{};try{let r=JSON.parse(Ac.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},vj=(e,t)=>{Ac.default.mkdirSync(Jg.default.dirname(e),{recursive:!0}),Ac.default.writeFileSync(_j(e),`${JSON.stringify(t,null,2)}
`)},kj=(e,t)=>j_(e)[t]?.message??null,Cj=(e,t,r)=>{vj(e,{...j_(e),[t]:{message:r}})},Yg=(e,t)=>{let r=j_(e);r[t]!==void 0&&vj(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var H_,Xg,Zg,Tj,we,In=l(()=>{"use strict";E();l_();pc();wj();mc();ai();$_();Vg();dt();H_=new Set,Xg={atMs:0,ids:[]},Zg=async()=>{if(Date.now()-Xg.atMs<3e4)return Xg.ids;let e=await Rt({commands:me({})});return Xg.atMs=Date.now(),Xg.ids=e.installedWriterIds,e.installedWriterIds},Tj=async(e,t,r)=>{let o=X(e,t);if(o===null||r.aborted)return;let n=Rn(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(W(n.status)&&!s||n.status==="wizard_paused"||nr(n))return;if(s){let c=await D_(n,r,d=>{Yg(e,d)});z(e,c);return}let i=await dD(n,c=>{Yg(e,c)},r,c=>{X(e,t)?.status==="stopped"||r.aborted||z(e,c)});if(!(X(e,t)?.status==="stopped"||r.aborted)){if(z(e,i),W(i.status)){let c=await D_(i,r,d=>{Yg(e,d)});z(e,c);return}await Tj(e,t,r)}},we=(e,t)=>{if(H_.has(t))return;let r=X(e,t);if(r===null)return;let o=Rn(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(W(o.status)&&!n||o.status==="wizard_paused"||nr(o))return;H_.add(t);let s=uj(t);Tj(e,t,s).finally(()=>{H_.delete(t),pj(t)})}});var Ao,bc=l(()=>{"use strict";x_();Vg();z_();In();Ao=(e,t)=>{let r=Rn(e,t);return we(e,r.id),`${qg(r)}${Kg(r)}`}});var Lj,Wj,Ej=l(()=>{"use strict";Lj=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,Wj=e=>e!==null&&e>0});var W7,E7,R7,Rj,xj=l(()=>{"use strict";E();pc();Dg();nc();sc();ai();gg();gg();W7=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),E7=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ae(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},R7=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=te(o);return si({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},Rj=(e,t)=>{if(!tc(e,t))return e;So(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return Wn({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return fo(E7(r));if(t==="wizard-3"){let n=o.splitOptions[0]??W7(o.templatedPrompt);return go(r,n)}return t==="wizard-4"?R7(r):e}});var Qg,Ij,F_=l(()=>{"use strict";E();Dg();ai();Qg=e=>(So(e.id),{...si(e,"stopped"),errorMessage:VP}),Ij=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;So(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var x7,Oj,Mj,Nj=l(()=>{"use strict";E();pc();Dg();nc();sc();bc();dt();In();Ej();M_();xj();F_();x7="Pick a revision scored above 0 before continuing to Separate.",Oj=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),Mj=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=X(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=X(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Ao(e.storePath,d))};if(o==="wizard-stop-all"){let c=Qg(s);return z(e.storePath,c),we(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=Ij(s);return z(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=hj(s,c);return z(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=Rj(s,c);return z(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&we(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",m=gw(s.wizard,d,c);m=Nl(m,d),m={...m,pendingStepInstructions:u};let S={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return z(e.storePath,S),we(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(S=>S.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?Oj(s):Wn({...s,wizard:{...s.wizard,gate:null}});return z(e.storePath,m),we(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=Lj(s,u??-1);if(!Wj(m)){let f={...s,errorMessage:x7,updatedAt:new Date().toISOString()};return z(e.storePath,f),a(n),!0}let S=fo({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return z(e.storePath,S),we(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let f=Oj(s);return z(e.storePath,f),we(e.storePath,n),a(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(f=>f.id===u);if(m===void 0){let f={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return z(e.storePath,f),a(n),!0}let S=go(s,m);return z(e.storePath,S),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,m=d.modules[u];if(m===void 0)return a(n),!0;if(!Ys(s.costControls)){let A=t.get("confirmedTokenBudget")?.trim()??"",b=t.get("confirmedMaxSpendUsd")?.trim()??"";if(A.length===0){let P={...s,errorMessage:Vs,updatedAt:new Date().toISOString()};return z(e.storePath,P),a(n),!0}let h=Tr({existing:s.costControls,confirmedTokenBudget:Number(A),confirmedMaxSpendUsd:b.length===0?null:Number(b),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!h.ok){let P={...s,errorMessage:h.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,P),a(n),!0}s={...s,costControls:h.costControls,errorMessage:null,updatedAt:new Date().toISOString()},z(e.storePath,s)}let S=Iw({wizard:d,modulePrompt:m.prompt,posted:t});if(!S.ok){let A={...s,errorMessage:S.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,A),a(n),!0}let f={...d,parameterValues:S.parameterValues};if(m.status==="pending"){let A=cD({...s,wizard:{...f,gate:null}},u);return z(e.storePath,A),we(e.storePath,n),a(n),!0}let y=u+1;if(y>=d.modules.length){let A=te(f),b=si({...s,wizard:f},A.terminalStatusSuggestion);return z(e.storePath,b),we(e.storePath,n),a(n),!0}let p={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...f,gate:"optimize_modules",currentModuleIndex:y},updatedAt:new Date().toISOString()};return z(e.storePath,p),a(n),!0}}return a(n),!0}});var I7,zj,O7,U_,M7,Dj,jj=l(()=>{"use strict";Pe();ai();F_();h_();Eg();mc();dt();I7="Add a score from 0 to 100 and the reason for it.",zj="Add a score from 1 to 100 and the reason for it.",O7="Write the next prompt.",U_="This step is not waiting for you.",M7=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},Dj=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=X(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(z(e.storePath,Qg(a)),{kind:"saved",cycleId:i}):mj(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=X(e.storePath,r);if(o===null||!nr(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:U_};if(t==="manual-judge"){if(o.judgeModel!==x)return{kind:"invalid",cycle:o,errorMessage:U_};let i=M7(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?zj:I7};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:zj};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",u=Rg(cc(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return z(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==x)return{kind:"invalid",cycle:o,errorMessage:U_};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:O7};let s=Wg(o,n);return z(e.storePath,s),{kind:"saved",cycleId:o.id}}});var $j,Hj=l(()=>{"use strict";$j=`<script>
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
</script>`});var Fj,Uj=l(()=>{"use strict";Fj=`<script>
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
</script>`});var Bj,Gj=l(()=>{"use strict";Bj=`<script>
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
</script>`});var qj,Vj=l(()=>{"use strict";qj=`<script>
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
</script>`});var Kj,Jj=l(()=>{"use strict";E();qe();Kj=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:ct(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(se(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!W(t.status)}}});var Yj,Xj=l(()=>{"use strict";Yj=`<script>
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
</script>`});var Zj,Qj=l(()=>{"use strict";E();hc();jg();Zj=e=>{let t=ii(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:W(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=xr(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=te(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=te(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return W(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var e$,t$=l(()=>{"use strict";e$=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Ir,N7,z7,r$,o$=l(()=>{"use strict";Qj();t$();fc();Ir=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),N7=e=>e.wizard===void 0?"legacy":"wizard",z7=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Ir(t)}">`,o=Zj(e),n=e$(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Ir(o.badgeClass)}">${Ir(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Ir(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Ir(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${N7(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Ir(e.id)}">${Ir(Er(e.goal))}</a><p class="muted">${Ir(a)}</p></div></div><div class="sdlc-history-row-actions">${u}${m}</div></li>`},r$=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>z7(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Ir(s)}</summary>${i}</details>`:i}});var B_,ef,n$,D7,j7,Pc,s$,tf=l(()=>{"use strict";B_=g(require("node:fs")),ef=g(require("node:path"));qe();n$=/^[a-z0-9-]+$/,D7=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},j7=(e,t)=>{if(!n$.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let m=D7(u[2]??"");u[1]==="name"&&m.length>0&&(o=m),u[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},Pc=e=>{let t=Lr(e);if(!t.ok)return[];let r=ef.default.resolve(t.path,".cursor","skills"),o=[];try{o=B_.default.readdirSync(r)}catch{return[]}return o.filter(n=>n$.test(n)).flatMap(n=>{let s=ef.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${ef.default.sep}`))return[];try{let i=j7(B_.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},s$=(e,t)=>Pc(e).find(r=>r.fileName===t)??null});var i$,$7,a$,l$,c$=l(()=>{"use strict";yo();i$=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$7=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),a$=e=>{if(e.length===0)return`<div class="field">${de("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${i$(r.fileName)}">${i$(r.fileName)}</option>`).join("");return`<div class="field">${de("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${$7(e)}</script>`},l$=`<script>
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
</script>`});var Ze,d$,u$=l(()=>{"use strict";E();Bg();oc();yo();Ze=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),d$=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=Ze(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=Js({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??Cr(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),m=Lg({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",S=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${Ze(V.knobsSectionTitle)}</p>
  <p class="muted">${Ze(V.knobsSectionLede)}</p>
  <div class="field">
    ${de(V.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${de(V.maxSpendUsdLabel,"maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${o}" placeholder="Optional" data-sdlc-max-spend-usd>
    <p class="muted">${Ze(V.autoConfirmHint)}</p>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${n}>
      <span>${Ze(V.earlyStopLabel)}</span>
    </label>
    <p class="muted">${Ze(V.earlyStopHint)}</p>
  </div>
  <div class="sdlc-cost-estimate" data-sdlc-cost-estimate>
    <p class="sdlc-block-title">${Ze(V.estimateSectionTitle)}</p>
    <p class="muted">${Ze(V.estimateSectionLede)}</p>
    <dl class="sdlc-cost-proposal sdlc-cost-estimate-proposal">
      <div><dt>${Ze(V.targetTokenLabel)}</dt><dd data-sdlc-target-tokens data-sdlc-proposed-tokens>${a.targetTokenBudget.toLocaleString("en-US")}</dd></div>
      <div><dt>${Ze(V.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${a.estimatedSpendUsd.toFixed(4)}</dd></div>
      <div><dt>${Ze(V.rateChipLabel)}</dt><dd><span class="sdlc-cost-rate-chip" data-sdlc-writer-rate-chip data-writer-id="${Ze(S)}">$${c.toFixed(4)} / 1k \xB7 ${Ze(S)}</span></dd></div>
    </dl>
    <input type="hidden" name="targetTokenBudget" value="${a.targetTokenBudget}" data-sdlc-target-token-budget-input>
    <input type="hidden" name="estimatedSpendUsd" value="${a.estimatedSpendUsd}" data-sdlc-estimated-spend-input>
    <input type="hidden" name="rateUsdPer1kTokens" value="${c}" data-sdlc-cost-rate>
    <p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling${m}>${Ze(V.estimateOverCeilingWarn)}</p>
  </div>
</div>`}});var Ue,p$,m$,H7,g$,f$,h$,y$=l(()=>{"use strict";E();k_();Pe();fc();hc();Ue=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p$=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",m$=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,H7=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},g$=e=>e===x?"You":ie(e),f$=e=>{let t=H7(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ie(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${Ue(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${Ue(t)}</dd></div>
      <div><dt>Judge</dt><dd>${Ue(g$(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${Ue(g$(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${Ue(r)}</dd></div>
    </dl>
  </details>`},h$=e=>{let t=e.wizard;if(t===void 0)return"";let r=Er(e.goal),o=e.status==="wizard_paused",n=!W(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=Hg(e),m=m$(t),S=m===null?"":p$(m),f=xr(e),y=S.length===0?"":f===null||f>=4?` <strong>${Ue(S)}</strong>`:` <strong>${Ue(S)}</strong> (step ${f+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${Ue(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${Ue(u.title)}${y}</p>
    <p class="muted">${Ue(u.detail)}</p>
    <div class="actions">
      ${f$(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ue(e.id)}">Open this run</a>
    </div>
  </section>`}let s=m$(t),i=s===null?"Wizard":p$(s),a=xr(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${Ue(r)}</h2>
    <p class="lede">Paused at <strong>${Ue(i)}</strong>${Ue(c)} (last updated ${Ue(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${f$(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${Ue(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var wc,S$,A$=l(()=>{"use strict";yo();wc=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),S$=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${wc(n.id)}"${n.id===e.runner?" selected":""}>${wc(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${wc(e.runner)}">Checking ${wc(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${de("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${de("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${wc(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var b$,P$=l(()=>{"use strict";b$=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var li,w$,_$,v$,k$,C$=l(()=>{"use strict";yo();li=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),w$=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${li(c.id)}"${c.id===r?" selected":""}>${li(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${li(n)}</option>`;return`<div class="field">${de(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},_$=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${li(t)}">Checking ${li(o)}\u2026</p>`},v$=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${de(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${li(r)}</textarea><span class="muted">${o}</span></div></details>`,k$=e=>{let t=`<div class="sdlc-writer">${w$("judge","Judge",e.judge,e.writers,"I'll score it")}${_$("judge",e.judge,e.writers)}${v$("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${w$("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${_$("improver",e.improver,e.writers)}${v$("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var T$,L$=l(()=>{"use strict";T$=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var G_,W$,E$=l(()=>{"use strict";L$();G_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),W$=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${T$.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${G_(t.goal)}" title="${G_(t.goal)}">${G_(t.label)}</button>`).join("")}</div>`});var _c,F7,U7,q_,R$=l(()=>{"use strict";E();yo();_c=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),F7=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},U7=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,q_=e=>{let t=F7(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=El(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${de(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${_c(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${_c(e.inputId)}" class="sdlc-pass-range" type="range" name="${_c(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${_c(a)}"><span class="sdlc-pass-mark" style="left:${U7(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${_c(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var G7,V_,Or,x$,I$=l(()=>{"use strict";mc();x_();Hj();Uj();bg();Gj();Vj();Jj();Xj();o$();tf();c$();yo();z_();u$();y$();fc();A$();P$();C$();E();E$();R$();G7=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,V_='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',Or=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),x$=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Or(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Or(e.skillNotice??"")}</div>`,o=`${pz}${mz}`,n=e.resumableWizardCycle??null,s=n===null?"":h$(n),i=Kg(e.cycle),a=e.cycle===null?"":qg(e.cycle),c=e.cycle!==null&&nr(e.cycle),d=Kj(e),u=G7(d.goal,d.prompt,e.canRun),m=k$({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),S=S$({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),f=`${q_({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${q_({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,y=d$({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),p=pw,A=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",b=e.cycle!==null&&W(e.cycle.status),h=d.running&&!b,P=b||h?"":" open",_=h?" sdlc-compose-run-focus":"",C=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${b?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,L=b?(()=>{let $=e.cycle!==null?Er(e.cycle.goal):Er(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Or($)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${C}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${C}</summary>`,R=b?" sdlc-compose-viewing-finished":"",I=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",N=c?"waiting":d.running?"running":"idle",U=d.running&&!c?' aria-busy="true"':"",G=`<section class="card sdlc-compose${R}${_}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${P}>
        ${L}
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
        ${a$(Pc(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${V_}
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
            ${W$()}
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
            ${V_}
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
        ${b$()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${V_}
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
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${N}" data-can-run="${u?"true":"false"}"${U}${d.running?" disabled":""}>${I}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,q=e.history.length>0?Yj:"",Ve=`${""}${qj}${$j}${Fj}${Bj}${l$}${q}`;return`${t}${r}${G}${s}${a}${i}${o}${r$(e.history,e.cycle?.id??null)}${Ve}`}});var vc,K_=l(()=>{"use strict";I$();vc=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:x$(t)}))}});var O$,M$=l(()=>{"use strict";jj();bc();K_();dt();In();O$=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:Dj({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=X(e.storePath,o.cycleId);return we(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(Ao(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await vc(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:rr(e.storePath),resumableWizardCycle:null}),!0)}});var N$,rf,J_=l(()=>{"use strict";E();N$=g(require("node:os")),rf=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??N$.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??zt()}}});var z$,ci,Y_,D$,j$,kc=l(()=>{"use strict";E();Pe();s_();z$=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,ci=e=>{let t=$N(e),r=_n(e).map(s=>({id:s,label:lg[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},Y_=(e,t,r)=>t===x||t!==null&&e.writers.some(o=>o.id===t)?t:r,D$=(e,t,r,o=null)=>({judge:Y_(e,t,e.judge),improver:Y_(e,r,e.improver),runner:Y_(e,o,e.runner)}),j$=e=>e===Pg?{goal:wg,prompt:_g}:{goal:"",prompt:""}});var X_,$$=l(()=>{"use strict";X_=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var H$,q7,F$,U$,B$,G$=l(()=>{"use strict";E();H$=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},q7=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},F$=(e,t)=>e.has("earlyStop")?!0:t!=="run",U$=e=>{let t=H$(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=q7(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=H$(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},B$=e=>zt(e)});var q$,V$,of,Z_=l(()=>{"use strict";E();Pe();qe();kc();$$();G$();q$=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=X_(o);return n.ok?String(n.passScore):String(r)},V$=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return X_(n)},of=e=>{let t=D$(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=q$(e.posted,"passScore",70),o=q$(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",m=e.posted?.get("intent")??"",S=e.posted===null?!0:F$(e.posted,m),f=(L,R)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:L,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:R,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:u,earlyStop:S});if(e.posted===null)return f(e.defaultFolder??vn,null);let y=e.posted.get("folder")??vn;if(e.posted.get("intent")==="choose-folder"){let L=e.pickFolder();return f(L===null?y:ct(L),null)}if((e.posted.get("intent")??"")!=="run")return f(y,null);let A=z$(e.goal,e.prompt);if(A!==null)return f(y,A);let b=V$(e.posted,"passScore",r);if(!b.ok)return f(y,b.errorMessage);let h=V$(e.posted,"modulePassScore",o);if(!h.ok)return f(y,h.errorMessage);let P=HN(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(P===null)return f(y,"Choose a judge and an improver.");let _=Lr(y);if(!_.ok)return f(y,_.errorMessage);let k=FN(e.installedIds,c,P.judge);if(k===null)return f(y,"Choose a runner for wizard step 4.");let C=U$({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return C.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:P.judge,improver:P.improver,workingDirectory:_.path,passScore:b.passScore,modulePassScore:h.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:k,runnerInstructions:a,costControls:B$(C.knobs)}:f(y,C.errorMessage)}});var di,sf,V7,Q_,K$,nf,J$,K7,Y$,ev,J7,Y7,X7,tv,X$,Z$,Q$=l(()=>{"use strict";di=g(require("node:fs")),sf=g(require("node:path"));Pe();qe();V7=["remember","choose-folder","run"],Q_=()=>({folder:vn,judge:"",improver:"",runner:""}),K$=e=>sf.default.join(sf.default.dirname(e),"prompt-optimizer-preferences.json"),nf=e=>typeof e=="string"?e:"",J$=e=>{let t=K$(e);if(!di.default.existsSync(t))return Q_();try{let r=JSON.parse(di.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return Q_();let o=r,n=nf(o.folder).trim();return{folder:n.length===0?vn:n,judge:nf(o.judge),improver:nf(o.improver),runner:nf(o.runner)}}catch{return Q_()}},K7=(e,t)=>{let r=K$(e);di.default.mkdirSync(sf.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;di.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),di.default.renameSync(o,r)},Y$=(e,t)=>e===x||_n(t).some(r=>r===e),ev=(e,t,r)=>e===null?t:e.length===0?"":Y$(e,r)?e:t,J7=(e,t)=>{if(e===null)return t;let r=Lr(e);return r.ok?r.display:t},Y7=e=>{let t=J$(e.storePath),r={folder:J7(e.folder,t.folder),judge:ev(e.judge,t.judge,e.installedIds),improver:ev(e.improver,t.improver,e.installedIds),runner:ev(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||K7(e.storePath,r)},X7=e=>{let t=Lr(e);return t.ok?t.display:vn},tv=(e,t)=>Y$(e,t)?e:"",X$=e=>{let t=J$(e.storePath);return{selection:{...e.selection,judge:tv(t.judge,e.installedIds)||e.selection.judge,improver:tv(t.improver,e.installedIds)||e.selection.improver,runner:tv(t.runner,e.installedIds)||e.selection.runner},defaultFolder:X7(t.folder)}},Z$=e=>{let t=e.posted.get("intent")??"";if(!V7.includes(t))return;let r=e.posted.get("folder");Y7({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var eH,Z7,Q7,rv,e9,af,lf=l(()=>{"use strict";eH=g(require("node:os"));Pe();$_();Ln();Z7="Reply with the single word ok. Do not use tools.",Q7=45e3,rv=async(e,t)=>{if(t===x)return{ok:!0,message:"You will do this step."};let r=kj(e,t);if(r!==null)return{ok:!0,message:r};let o=await Ye({writerAgent:t,prompt:Z7,workingDirectory:eH.default.tmpdir(),timeoutMs:Q7});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ie(t)} is ready.`;return Cj(e,t,n),{ok:!0,message:n}},e9=e=>[...new Set(e.filter(t=>t.length>0))],af=async(e,t,r,o)=>{for(let n of e9([t,r,o??""])){let s=await rv(e,n);if(!s.ok)return s.message}return null}});var ov,tH=l(()=>{"use strict";E();ov=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!W(r.status)&&!(t!==null&&r.id===t))return r;return null}});var rH,oH=l(()=>{"use strict";Xt();E();oc();bc();J_();Z_();K_();dt();qe();Q$();tf();lf();tH();Vg();In();rH=async e=>{let t=e.posted===null?X$({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=of({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>ao("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(Z$({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?ct(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await af(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await vc(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:ct(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:rr(e.route.storePath),resumableWizardCycle:ov(rr(e.route.storePath),null)});return}if(r.kind==="start"){let s=s$(r.workingDirectory,r.sourceSkillFile),i=Tg(Yl({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=rf({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:vw({...Ml(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(z(e.route.storePath,a),we(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(Ao(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:X(e.route.storePath,e.cycleId);n!==null&&(n=Rn(e.route.storePath,n),we(e.route.storePath,n.id)),await vc(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:rr(e.route.storePath),resumableWizardCycle:ov(rr(e.route.storePath),n?.id??null)})}});var nH,sH=l(()=>{"use strict";dt();nH=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";wz(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var iH,aH=l(()=>{"use strict";iH=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var lH,cH=l(()=>{"use strict";Wz();Nj();M$();oH();sH();kc();aH();In();lH=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await Zg(),o=ci(r),n=e.method==="POST"?iH(e.request.headers["content-type"],await e.readBody(e.request)):null;if(Mj({posted:n,storePath:e.storePath,response:e.response})||await O$(e,n,o))return;let s=j$(t.searchParams.get("example")),i=nH({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=Lz({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await rH({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:Tz(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var t9,dH,uH=l(()=>{"use strict";E();dt();t9=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",dH=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=X(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!W(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=kw({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${t9(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var pH,mH=l(()=>{"use strict";bc();dt();pH=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:X(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":Ao(e.storePath,o)),!0}});var r9,gH,fH=l(()=>{"use strict";Pe();lf();r9=["claude-cli","codex","cursor","antigravity"],gH=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===x||r9.includes(t)?await rv(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var hH,yH=l(()=>{"use strict";E();hH=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:xl,page:Il,context:Bs,installedWriters:e,post:{method:"POST",url:xl,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this Mac",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${xl}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var cf,SH=l(()=>{"use strict";E();R_();ei();cf=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ae(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=W(e.status),n=e.errorKind??null,s=Gg({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:Wr(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:Bs,page:`${Il}?cycle=${encodeURIComponent(e.id)}`}}});var F,o9,AH,bH,PH=l(()=>{"use strict";F=g(Zn());E();o9=(0,F.isType)({goal:F.isString,prompt:F.isString,workingDirectory:F.isString,judge:(0,F.isUndefinedOr)(F.isString),improver:(0,F.isUndefinedOr)(F.isString),passScore:(0,F.isUndefinedOr)(F.isNumber),maxRounds:(0,F.isUndefinedOr)(F.isNumber),maxTrials:(0,F.isUndefinedOr)(F.isNumber),maxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),earlyStop:(0,F.isUndefinedOr)(F.isBoolean),earlyStopFlatRounds:(0,F.isUndefinedOr)(F.isNumber),confirmedTokenBudget:(0,F.isUndefinedOr)(F.isNumber),confirmedMaxSpendUsd:(0,F.isUndefinedOr)(F.isNumber),rateUsdPer1kTokens:(0,F.isUndefinedOr)(F.isNumber)}),AH=e=>{let t=e?.trim()??"";return t.length===0?null:t},bH=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return o9(t)?t.workingDirectory.trim().length===0?{ok:!1,error:Km}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:AH(t.judge),improver:AH(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:Km}}});var Mr,n9,wH,_H,vH=l(()=>{"use strict";E();Mr=g(Zn()),n9=(0,Mr.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:Mr.isNumber,confirmedMaxSpendUsd:(0,Mr.isUndefinedOr)(Mr.isNumber),rateUsdPer1kTokens:(0,Mr.isUndefinedOr)(Mr.isNumber)}),wH=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:n9(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},_H=(e,t)=>{let r=Tr({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var s9,kH,CH=l(()=>{"use strict";E();Pe();Z_();kc();s9=e=>e.map(t=>t.id).join(", "),kH=e=>{let t=ci(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===x||n===x)return{ok:!1,error:uw,installedWriters:t.writers};if(o===null||n===null){let a=s9(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this Mac.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=of({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var i9,TH,LH=l(()=>{"use strict";E();J_();yH();SH();kc();PH();vH();CH();dt();i9=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},TH=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let u=X(e.storePath,t);return u===null?{status:404,body:{ok:!1,error:"That run is not on this Mac."}}:{status:200,body:cf(u)}}let r=await e.handlers.readInstalledIds(),o=ci(r);if(e.method==="GET")return{status:200,body:hH(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let u=wH(e.rawBody);if(u.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(u.kind==="invalid")return{status:400,body:{ok:!1,error:u.error}};let m=X(e.storePath,t);if(m===null)return{status:404,body:{ok:!1,error:"That run is not on this Mac."}};let S=_H(m,u.body);return S.ok?(z(e.storePath,S.cycle),{status:200,body:cf(S.cycle)}):{status:400,body:{ok:!1,error:S.error}}}let n=i9(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let u=Js({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:u.targetTokenBudget,proposedTokenBudget:u.targetTokenBudget,estimatedSpendUsd:u.estimatedSpendUsd,rateUsdPer1kTokens:u.rateUsdPer1kTokens??null,proposalStub:u.stub===!0,confirmationRequired:!0}}}let s=bH(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=kH({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=Yl({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:lt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let u=Tr({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!u.ok)return{status:400,body:{ok:!1,error:u.errorMessage}};c=u.costControls}let d=rf({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:Ml(i.prompt),runnerModel:i.runner,costControls:c});return z(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:cf(d)}}});var WH,EH=l(()=>{"use strict";In();lf();LH();WH=async e=>{let t=await TH({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:Zg,readWritersReady:af,startCycle:we}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var xH,a9,l9,RH,c9,IH,OH=l(()=>{"use strict";xH=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],a9=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},l9=e=>{let t={};for(let n of e)for(let s of new Set(xH(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},RH=(e,t)=>{let r=a9(xH(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},c9=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},IH=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=l9(e.map(i=>i.text)),s=RH(o,n);return e.map(i=>({id:i.id,score:c9(s,RH(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var nv,d9,u9,MH,p9,m9,g9,f9,sv,iv=l(()=>{"use strict";nv=g(require("node:path"));qe();OH();tf();d9=5,u9=20,MH=280,p9=e=>[e.name,e.description,e.promptText].join(`
`),m9=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=MH?t:`${t.slice(0,MH-3)}...`},g9=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),f9=e=>e===void 0||!Number.isFinite(e)?d9:Math.min(u9,Math.max(1,Math.floor(e))),sv=e=>{let t=e.query.trim(),r=f9(e.limit),o=Lr(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=Pc(o.path),s=IH(n.map(d=>({id:d.fileName,text:p9(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=nv.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:nv.default.join(a,u.fileName,"SKILL.md"),excerpt:m9(u),source:"filesystem"}]});return{query:t,hits:c,context:g9(c)}}});var NH,zH=l(()=>{"use strict";iv();NH=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:sv({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var DH,jH=l(()=>{"use strict";zH();DH=async e=>{let t=NH({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var h9,av,$H=l(()=>{"use strict";hz();cH();uH();mH();fH();EH();jH();h9=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},av=async e=>{let t=h9(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await WH(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await DH(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:fz()})),!0):(await gH({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||dH({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||pH({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await lH(e),!0)}});var HH=l(()=>{"use strict";$H();iv();Ln()});var On,Cc,y9,S9,A9,b9,FH,UH=l(()=>{"use strict";On=g(require("node:fs")),Cc=g(require("node:path")),y9="prompt-optimizer-cycles.json",S9="prompt-optimizer-preferences.json",A9="prompt-sdlc-cycles.json",b9="prompt-sdlc-preferences.json",FH=e=>{let t=Cc.default.join(e,y9),r=Cc.default.join(e,A9);if(On.default.existsSync(t)||!On.default.existsSync(r))return t;try{On.default.renameSync(r,t)}catch{return r}let o=Cc.default.join(e,b9),n=Cc.default.join(e,S9);if(On.default.existsSync(o)&&!On.default.existsSync(n))try{On.default.renameSync(o,n)}catch{}return t}});var ui,P9,lv,BH=l(()=>{"use strict";ui=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),P9=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],lv=e=>{let t=P9.map(i=>`<option value="${ui(i.value)}">${ui(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${ui(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${ui(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${ui(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${ui(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Tc,VH,w9,KH,_9,v9,JH,uf,GH,qH,k9,C9,Nr,Lc,df,T9,pf,cv,L9,dv,YH,uv,XH,W9,E9,R9,ZH,QH,eF,Wc=l(()=>{"use strict";Tc=g(require("node:fs")),VH=g(require("node:path")),w9="estimate-history.ndjson",KH=100,_9=500,v9=2e4,JH=e=>VH.default.join(e,w9),uf=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,_9),GH=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,v9),qH=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,k9=e=>({...e,estimateTokens:qH(e.estimateTokens),actualTokens:qH(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),C9=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Nr=e=>{let t=JH(e);return Tc.default.existsSync(t)?Tc.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return C9(n)?[k9(n)]:[]}catch{return[]}}):[]},Lc=(e,t)=>{Tc.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Tc.default.writeFileSync(JH(e),r,"utf8")},df=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),T9=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this Mac. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${df(o.task)} | ${df(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},pf=e=>{let t=Nr(e.reportsDir),r=uf(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Lc(e.reportsDir,[...s,n])},cv=e=>{let t=Nr(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?uf(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);Lc(e.reportsDir,[...i,s])},L9=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-KH),dv=e=>[...Nr(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),YH=e=>{let t=Nr(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=GH(e.input),n=GH(e.output),s=uf(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Lc(e.reportsDir,[...c,a])},uv=(e,t)=>{let r=Nr(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},XH=e=>({table:T9(L9(Nr(e))),embedding:null}),W9=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},E9=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-KH),R9=e=>{let t=W9(E9(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${df(s.task)} | ${df(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},ZH=e=>{let t=Nr(e.reportsDir),r=uf(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Lc(e.reportsDir,[...s,n])},QH=e=>{let t=Nr(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Lc(e.reportsDir,[...s,n])},eF=e=>R9(Nr(e))});var tF=l(()=>{"use strict";Wc()});var zr,pv,x9,mv,I9,O9,mf,gf,M9,gv,rF=l(()=>{"use strict";tF();r_();zr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pv=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},x9=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${pv(-r)} under`:`${pv(r)} over`},mv=e=>e.toLocaleString("en-US"),I9=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${mv(-r)} under`:`${mv(r)} over`},O9=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},mf=e=>e===null?"\u2014":pv(e),gf=e=>e===null?"\u2014":mv(e),M9=`(function () {
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
})();`,gv=e=>{let r=dv(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":x9(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":I9(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${zr(O9(i))}</button></td>
        <td>${zr(c)}</td>
        <td>${mf(n.estimateSeconds)}</td>
        <td>${mf(n.actualSeconds)}</td>
        <td>${zr(d)}</td>
        <td>${gf(n.estimateTokens)}</td>
        <td>${gf(n.actualTokens)}</td>
        <td>${zr(u)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${zr(c)}</p>
        <h2>Input</h2>
        <pre>${zr(i)}</pre>
        <h2>Output</h2>
        <pre>${zr(a)}</pre>
        <p>Time: estimated ${mf(n.estimateSeconds)} \xB7 actual ${mf(n.actualSeconds)} \xB7 ${zr(d)}</p>
        <p>Tokens: estimated ${gf(n.estimateTokens)} \xB7 actual ${gf(n.actualTokens)} \xB7 ${zr(u)}</p>
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
            ${fg({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${M9}</script>`}
    </section>`}});var oF=l(()=>{"use strict";BH();rF()});var pi,N9,z9,fv,nF=l(()=>{"use strict";pi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),N9=(e,t,r)=>{let o=pi(t),n=pi(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},z9=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${pi(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>N9(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${pi(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${pi(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${pi(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},fv=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(z9).join(""):'<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var sF=l(()=>{"use strict";nF()});var Ec,iF,aF,hv,yv,Sv,lF=l(()=>{"use strict";Ec=g(require("node:fs")),iF=g(require("node:path"));bl();Om();aF=(e,t,r)=>zs({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,hv=(e,t,r)=>{let o=aF(e,t,r);if(o===null)return[];if(!Ec.default.existsSync(o))return[];let n=Ec.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},yv=e=>{let t=aF(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:_r(e.entry.prompt),output:_r(e.entry.output)};Ec.default.mkdirSync(iF.default.dirname(t),{recursive:!0}),Ec.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},Sv=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var D9,j9,Rc,ff,Av=l(()=>{"use strict";D9=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),j9=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Rc=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=D9(i.assistantOutput),d=c.length>0?`Assistant: ${j9(c,t)}`:null,u=[a,d].filter(m=>m!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},ff=e=>{let t=e.userMessage.trim(),r=Rc({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var ir,xc,wv,$9,H9,bv,F9,_v,hf,cF,dF,U9,mi,vv,Pv,uF,B9,pF,gi,yf,Ic,G9,Oc,kv,Sf,Af,mF=l(()=>{"use strict";ir=g(require("node:fs")),xc=g(require("node:path")),wv=require("node:crypto");Av();$9="writer-sessions",H9="active-index.json",bv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),F9=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",_v=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},hf=e=>{let t=xc.default.join(e.installDir,$9);return ir.default.mkdirSync(t,{recursive:!0}),t},cF=e=>xc.default.join(hf(e),H9),dF=(e,t)=>xc.default.join(hf(e),`${t}.canonical.json`),U9=(e,t)=>xc.default.join(hf(e),`${t}.continuation.json`),mi=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,vv=e=>{let t=cF(e);if(!ir.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(ir.default.readFileSync(t,"utf8"));if(!bv(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!bv(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!F9(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},Pv=(e,t)=>{ir.default.writeFileSync(cF(e),JSON.stringify(t,null,2))},uF=(e,t)=>{ir.default.writeFileSync(dF(e,t.sessionId),JSON.stringify(t,null,2))},B9=(e,t)=>{ir.default.writeFileSync(U9(e,t.sessionId),JSON.stringify(t,null,2))},pF=(e,t)=>{let r=Rc({turns:t.turns});B9(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},gi=(e,t)=>{let r=dF(e,t);if(!ir.default.existsSync(r))return null;try{let o=JSON.parse(ir.default.readFileSync(r,"utf8"));return!bv(o)||typeof o.sessionId!="string"?null:o}catch{return null}},yf=(e,t=20)=>{let r=hf(e),o=ir.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=gi(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Ic=(e,t,r)=>{let o=_v(r);return vv(e).entries.find(i=>mi(i)===mi({writerAgent:t,projectFolderPath:o}))?.sessionId??null},G9=(e,t,r,o)=>{let n=vv(e),s=mi({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>mi(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];Pv(e,{entries:i})},Oc=(e,t,r)=>{let o=(0,wv.randomUUID)(),n=new Date().toISOString(),s=_v(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return uF(e,i),pF(e,i),G9(e,t,s,o),o},kv=(e,t,r)=>{let o=Ic(e,t,r);return o!==null?o:Oc(e,t,r)},Sf=(e,t,r)=>{let o=_v(r),n=vv(e);if(o===null&&r===void 0){Pv(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=mi({writerAgent:t,projectFolderPath:o});Pv(e,{entries:n.entries.filter(i=>mi(i)!==s)})},Af=e=>{let t=kv(e.layout,e.writerAgent,e.projectFolderPath),r=gi(e.layout,t);if(r===null)return;let o={id:(0,wv.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};uF(e.layout,n),pF(e.layout,n)}});var q9,V9,bf,Cv,gF=l(()=>{"use strict";q9=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",V9=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},bf=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",Cv=e=>{let t=bf(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=q9(r,e.userPromptCharacterCount),n=V9({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var Pf=l(()=>{"use strict";lF();mF();Av();gF()});var fF=l(()=>{"use strict";gp();ys();jS()});var hF=l(()=>{"use strict";mS()});var Qe,J9,Y9,Tv,Lv,Wv,yF=l(()=>{"use strict";fF();hF();Qe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),J9=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},Y9=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=Wa(o);return`value="${Qe(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${Qe(r)}"`},Tv=(e,t,r,o,n)=>{let s=fp[t];return`<label class="field">
          <span class="field-label">${Qe(o)} API key \u2014 ${Qe(J9(e,t))} \xB7 <a class="field-link" href="${Qe(s.href)}" target="_blank" rel="noopener noreferrer">${Qe(s.label)}</a></span>
          <input class="input mono" type="password" name="${Qe(r)}" autocomplete="off" ${Y9(e,t,n)} />
        </label>`},Lv=(e,t,r,o)=>{let n=ip(e[t]?.model),s=new Set(sp[t].map(c=>c.value)),i=sp[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${Qe(c.value)}"${d}>${Qe(c.label)}</option>`}).join(""),a=n!==Jo&&!s.has(n)?`<option value="${Qe(n)}" selected>${Qe(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${Qe(o)}</span>
          <select class="input mono" name="${Qe(r)}">${i}${a}</select>
        </label>`},Wv=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Qe(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${Tv(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${Lv(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${Tv(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${Lv(e.secrets,"openai","openaiModel","OpenAI model")}
        ${Tv(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${Lv(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var SF=l(()=>{"use strict";yF()});var wf,AF,bF=l(()=>{"use strict";wf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AF=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${wf(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${wf(s.name)}</strong> <span class="muted mono">(${wf(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${wf(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var X9,PF,wF,_F=l(()=>{"use strict";X9=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,PF=e=>e.kind==="folder",wF=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&PF(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if(PF(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(X9)};return r(t)}});var vF,Ev,kF=l(()=>{"use strict";vF=g(require("node:path")),Ev=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Ev(r.children,t)}</ul>
            </details>
          </li>`;let o=vF.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var CF,bo,Z9,Q9,Mc,eY,Rv,TF=l(()=>{"use strict";jm();CF=g(require("node:path"));bF();_F();kF();bo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Z9=()=>`(() => {
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

})();`,Q9=()=>`(() => {
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
})();`,Mc=e=>{let t=kl({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=AF({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${bo(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${bo(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':eY(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${bo(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${bo(s)}" />
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
    <script>${Z9()}</script>
    <script>${Q9()}</script>`;return`${t}${r}${o}${c}${d}`},eY=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=wF(a.items.map(S=>({...S,relativePath:typeof S.relativePath=="string"&&S.relativePath.length>0?S.relativePath:CF.default.relative(a.sourceRoot,S.sourcePath).replaceAll("\\","/")}))),u=Ev(d,bo),m=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${bo(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${bo(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${u}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${bo(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},Rv=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=a.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??u??a,S=t.sets[i];if(S===void 0)continue;let f=a.length>0?a:S.proposedSlug,y=m.length>0?m:S.proposedName,p=r.has(i),A=S.items.map(b=>({id:b.id,kind:b.kind,title:b.title,sourcePath:b.sourcePath,include:p}));s.push({slug:f,name:y,items:A})}return s}});var LF=l(()=>{"use strict";TF()});var tY,xv,WF=l(()=>{"use strict";Pr();tY=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},xv=tY});var rY,EF,RF=l(()=>{"use strict";Pr();rY=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[$e]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},EF=rY});var xF=l(()=>{"use strict"});var Mn,oY,Iv,IF=l(()=>{"use strict";jm();KA();Mn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oY=e=>`${e.harness} Harness \xB7 ${e.workflow} Workflows \xB7 ${e.agent} Agents`,Iv=e=>{let t=e.flashError?`<div class="alert-error">${Mn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Mn(e.flashMessage)}</div>`:"",r=kl({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this Mac and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Mn(oY(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${Mn(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=om(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this Mac stays.');">
                  <input type="hidden" name="projectId" value="${Mn(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Mn(n.name)}</strong>
                  <span class="muted mono">${Mn(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${u}${m}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this Mac</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired Mac only. Choose a folder per project, then link harness sets into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var OF=l(()=>{"use strict";xF();JA();IF()});var _f,MF=l(()=>{"use strict";_f=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var NF,$t,Ov=l(()=>{"use strict";NF=g(require("node:path"));kt();Me();J();ge();DA();$t=e=>{let t=H()?.layout.installDir??T();if(NF.default.basename(t)===Ut)return vt;let r=H(),o=r!==null?Ce(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):vt}});var Mv,zF=l(()=>{"use strict";Vt();Ov();Mv=async e=>{let t=De(e.installDir),r=t?.bundleVersion??null,o=$t(t);try{let n=await ds(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:$o(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Nv,DF=l(()=>{"use strict";Nv=e=>!e});var zv,fi,Dv=l(()=>{"use strict";J();zv=()=>`http://127.0.0.1:${py()}/update/run`,fi=async e=>{try{let t=await fetch(zv(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var nY,jF,jv,$F=l(()=>{"use strict";J();ne();Dv();nY=()=>{gr({launchAgentLabel:ke(),installDir:T()})},jF=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},jv=async()=>{nY();let e=await fi({force:!0});if(e.ok)return{ok:!0,message:jF(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:jF(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Vt(),qW)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var $v=l(()=>{"use strict";jP();MF();Ov();zF();DF();$F();Dv()});var HF,FF=l(()=>{"use strict";HF=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var UF,BF,Hv,Fv,GF=l(()=>{"use strict";UF=require("node:crypto"),BF=g(require("node:fs"));Xt();ge();ge();FF();Hv=!1,Fv=async e=>{if(Hv)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!HF(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=H();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=Z({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&BF.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,UF.randomUUID)();Hv=!0;try{if(await jA(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await As({...r,workspace:n},e.writerAgent,t);return await Ja(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Hv=!1}}});var qF=l(()=>{"use strict";GF()});var yt,sY,VF,KF,Uv,Bv,Gv,qv,Vv,Kv,Jv=l(()=>{"use strict";yt=require("node:crypto"),sY=Buffer.from("302a300506032b6570032100","hex"),VF=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},KF=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,yt.createPublicKey)({key:Buffer.concat([sY,t]),format:"der",type:"spki"})},Uv=()=>{let{publicKey:e,privateKey:t}=(0,yt.generateKeyPairSync)("ed25519");return{publicKeyRaw:VF(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Bv=e=>(0,yt.createPrivateKey)(e),Gv=(e,t)=>(0,yt.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),qv=(e,t,r)=>{try{let o=KF(e);return(0,yt.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},Vv=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,Kv=()=>(0,yt.randomBytes)(32).toString("base64url")});var Dr,vf,JF,iY,aY,kf,Yv,Xv,YF=l(()=>{"use strict";Dr=g(require("node:fs")),vf=g(require("node:path"));Jv();J();Me();JF=e=>vf.default.join(e.installDir,Vr),iY=(e,t)=>{if(e.profileEmail===null||t===JF(e)||Dr.default.existsSync(t))return;let r=JF(e);Dr.default.existsSync(r)&&(Dr.default.mkdirSync(vf.default.dirname(t),{recursive:!0}),Dr.default.renameSync(r,t))},aY=e=>{if(!Dr.default.existsSync(e))return null;try{let t=Dr.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},kf=e=>{let t=Tu(e);iY(e,t);let r=aY(t);if(r!==null)return r;let o=Uv();return Dr.default.mkdirSync(vf.default.dirname(t),{recursive:!0}),Dr.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},Yv=e=>{let t=kf(e.layout),r=Kv(),o=Vv({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=Bv(t.privateKeyPem),s=Gv(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Xv=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return qv(e.serverPublicKey,t,e.serverAttestation)}});var Zv=l(()=>{"use strict";YF();Jv()});var e1,Nc,tk,rk,XF,lY,Qv,Cf,ue,t1,cY,ek,dY,uY,ok,he,Oe,ar,pY,ZF,QF,zc,Dc,r1=l(()=>{"use strict";e1=g(require("node:http")),Nc=g(require("node:fs")),tk=g(require("node:path"));Tf();yl();QI();tO();aO();Vo();mP();zP();NO();DO();HH();UH();oF();sF();Pf();SF();LF();tn();Xt();Pr();WF();RF();OF();$v();Vt();qF();ge();Zv();rk=e=>tP(e)??"never",XF=48e3,lY=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,Qv=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Up(),reveal:t.reveal,installed:so(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Cf=async e=>{let t=H();return t===null?{ok:!1,projects:[],message:"Mac client config missing \u2014 pair this Mac in Agent Witch Cloud to load projects."}:Cs(t,e)},ue=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),t1=200,cY=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',ek=e=>{let t=e.trim().slice(0,t1),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},dY=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ue(t)}</div>`,uY=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ue(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',ok={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},he=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...ok}),e.end(JSON.stringify(r))},Oe=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},ar=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},pY=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=cY(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${ue(e.status.wakeError)}</div>`:"",n=e.revived?'<div class="alert-success">Revive requested. The bridge will reconnect if this Mac can reach launchd.</div>':"",s=Nv(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Sl(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ue(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ue(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ue(rk(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ue(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},ZF=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},QF=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,t1)},zc=e=>{let t=tk.default.join(e.layout.installDir,"link-code.txt"),r=()=>De(e.layout.installDir),o=()=>{let f=r();return{installBundleVersion:_f(f),installBundleUpdatedAt:f?.updatedAt??null,installVersion:f}},n=async f=>{let y=f.installVersion??r(),p=await i(),A=UP(p),b=f.updateFlash??null,h=BP(b),P=dY(b,f.updateError??null);return HP({title:f.title,activePath:f.activePath,body:f.body,cloudAppOrigin:$t(y),installBundleVersionLabel:_f(y),prependBody:`${h}${P}${A}`,headerUpdateButtonHtml:FP(p)})},s=null,i=async()=>{let f=Date.now();if(s!==null&&f-s.cachedAtMs<6e4)return s.offer;let y=await Mv(e.layout);return s={cachedAtMs:f,offer:y},y},a=()=>{s=null},c=!1,d=async f=>{if(a(),!(await i()).updateAvailable){f.writeHead(303,{Location:"/?update=ok"}),f.end();return}if(c){f.writeHead(303,{Location:ek("An update is already running.")}),f.end();return}c=!0;try{let p=await jv(),A=p.ok?"/?update=ok":ek(p.message);f.writeHead(303,{Location:A}),f.end()}catch(p){let A=p instanceof Error&&p.message.trim().length>0?p.message:"Install bundle update failed.";f.writeHead(303,{Location:ek(A)}),f.end()}finally{c=!1,a()}},u=async(f,y)=>{let p=y==="Project not found"?"That project is not available on this Mac.":"That page does not exist on this Mac.",A=o(),b=await n({title:y,activePath:y==="Project not found"?"/projects":"/",installVersion:A.installVersion,body:`<section class="card">
      <h1>${ue(y)}</h1>
      <p>${ue(p)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});f.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),f.end(b)},m=()=>{if(Nc.default.existsSync(t))return Nc.default.readFileSync(t,"utf8").trim();let f=Math.random().toString(36).slice(2,8).toUpperCase();return Nc.default.writeFileSync(t,f,"utf8"),f},S=e1.default.createServer((f,y)=>{(async()=>{let p=f.url?.split("?")[0]??"/",A=f.method??"GET";if(A==="OPTIONS"){y.writeHead(204,ok),y.end();return}if(!await av({method:A,pathname:p,request:f,response:y,requestUrl:f.url??"/",storePath:FH(tk.default.dirname(e.layout.configPath)),readBody:ar,sendHtml:Oe,renderShell:n})){if(A==="GET"&&p==="/health"){let b=e.controllers.getStatus(),h=o();he(y,200,{ok:!0,...b,installBundleVersion:h.installBundleVersion,installBundleUpdatedAt:h.installBundleUpdatedAt});return}if(A==="GET"&&p==="/api/status"){let b=o();he(y,200,{...e.controllers.getStatus(),linkCode:m(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt});return}if(A==="GET"&&p==="/api/traffic"){he(y,200,{entries:fl(e.layout)});return}if(A==="DELETE"&&p==="/api/traffic"||A==="POST"&&p==="/api/traffic/clear"){if(nP(e.layout),A==="POST"){y.writeHead(303,{Location:"/traffic?cleared=1"}),y.end();return}he(y,200,{ok:!0});return}if(A==="GET"&&p==="/api/trace"){he(y,200,{entries:Em(e.layout)});return}if(A==="DELETE"&&p==="/api/trace"||A==="POST"&&p==="/api/trace/clear"){if(aP(e.layout),A==="POST"){y.writeHead(303,{Location:"/status"}),y.end();return}he(y,200,{ok:!0});return}if(A==="POST"&&p==="/api/errors/clear"){lP(e.layout.errorLogPath),y.writeHead(303,{Location:"/errors?cleared=1"}),y.end();return}if(A==="GET"&&p==="/api/knowledge"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(h.length>0){let P=await js({layout:e.layout,query:h,limit:20});he(y,200,{chunks:P,query:h});return}he(y,200,{chunks:Ds(e.layout).slice(-50).reverse()});return}if(A==="POST"&&p==="/api/revive"){e.controllers.reviveWebSocket(),y.writeHead(303,{Location:"/status?revived=1"}),y.end();return}if(A==="GET"&&p==="/api/update-status"){let b=await i();he(y,200,{ok:!0,...b});return}if((A==="GET"||A==="POST")&&p==="/api/update"){await d(y);return}if(A==="GET"&&p==="/"){let b=e.controllers.getStatus(),h=o(),P=so(e.layout),_=Rm(e.layout.errorLogPath);Oe(y,await n({title:"Home",activePath:"/",installVersion:h.installVersion,updateFlash:ZF(f.url??void 0),updateError:QF(f.url??void 0),body:GP({wsConnected:b.wsConnected,lastHeartbeatAt:b.lastHeartbeatAt,installBundleVersion:h.installBundleVersion,harnessSetCount:P.sets.length,knowledgeChunkCount:Ds(e.layout).length,trafficEntryCount:fl(e.layout).length,wakeError:b.wakeError,errorLogByteSize:_.byteSize,errorLogExists:_.exists})}));return}if(A==="GET"&&p==="/task"){let b=e.controllers.getStatus(),h=o(),P=H(),_=new URL(f.url??"/",`http://127.0.0.1:${43347}`),k=_.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,C=_.searchParams.get("failed")==="1"?_.searchParams.get("error")?.trim()??"Task failed.":null,L=_.searchParams.get("runId");Oe(y,await n({title:"Task",activePath:"/task",installVersion:h.installVersion,body:lv({defaultWorkspace:P?.workspace??"",wsConnected:b.wsConnected,flashMessage:k,flashError:C,lastRunId:L})}));return}if(A==="POST"&&p==="/task/dispatch"){let b=await ar(f),h=new URLSearchParams(b),P=h.get("prompt")?.trim()??"",_=h.get("writerAgent")?.trim()??"claude-cli",k=h.get("projectFolder")?.trim()??"",C=await Fv({prompt:P,writerAgent:_,...k.length>0?{projectFolderPath:k}:{}}),L=new URLSearchParams;C.ok?L.set("ok","1"):(L.set("failed","1"),C.errorMessage!==void 0&&L.set("error",C.errorMessage.slice(0,240))),C.agentRunId!==void 0&&L.set("runId",C.agentRunId),y.writeHead(303,{Location:`/task?${L.toString()}`}),y.end();return}if(A==="GET"&&p==="/writer-sessions"){let b=o(),h=yf(e.layout,12);Oe(y,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:b.installVersion,updateFlash:ZF(f.url??void 0),updateError:QF(f.url??void 0),body:fv({sessions:h})}));return}if(A==="GET"&&p==="/errors"){let b=o(),h=Rm(e.layout.errorLogPath);Oe(y,await n({title:"Errors",activePath:"/errors",installVersion:b.installVersion,body:dP({errorLogPath:e.layout.errorLogPath,content:h.content,exists:h.exists,truncated:h.truncated,byteSize:h.byteSize,cleared:new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(A==="GET"&&p==="/status"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=e.controllers.getStatus(),P=fe(e.layout),_=P!==null?Te(P,12e4):gP(h.lastHeartbeatAt,12e4),k=fP({lastHeartbeatAt:h.lastHeartbeatAt,heartbeatIsStale:_}),C=o();Oe(y,await n({title:"Status",activePath:"/status",installVersion:C.installVersion,body:`${pY({status:h,healthBadge:k,revived:b.searchParams.get("revived")==="1",linkCode:m(),installBundleVersion:C.installBundleVersion,installBundleUpdatedAt:C.installBundleUpdatedAt})}${SP({installDir:e.layout.installDir})}${yP({entries:Em(e.layout)})}`}));return}if(A==="GET"&&p==="/traffic"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=fl(e.layout),P=o(),_=h.map(L=>`<tr><td title="${ue(L.at)}">${ue(rk(L.at))}</td><td>${ue(L.direction)}</td><td><code>${ue(L.type)}</code></td><td>${ue(L.summary)}</td><td>${ue(L.action??"")}</td></tr>`).join(""),k=h.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${_}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',C=b.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Oe(y,await n({title:"Traffic",activePath:"/traffic",installVersion:P.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${C}
              ${k}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(A==="GET"&&p==="/projects"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=o(),P=$t(h.installVersion),_=await Cf(e.layout),k=b.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":b.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,C=b.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Your Mac folders were not deleted.":null,L=H(),R=L===null?null:Z({wsUrl:L.wsUrl,pairingToken:L.pairingToken}),I=R===null?{}:Object.fromEntries((await Promise.all(_.projects.map(async N=>{let U=await xv(R,N.id);return[N.id,U?.counts??null]}))).filter(N=>N[1]!==null));Oe(y,await n({title:"Projects",activePath:"/projects",installVersion:h.installVersion,body:Iv({projects:_.projects,compositionCountsByProjectId:I,cloudAppOrigin:P,syncMessage:_.message,syncOk:_.ok,flashMessage:C,flashError:k})}));return}if(A==="GET"&&p==="/projects/select-folder"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",P=H(),_=P===null?null:Z({wsUrl:P.wsUrl,pairingToken:P.pairingToken}),k=h.length>0&&_!==null?ao():null;if(k===null||_===null){y.writeHead(303,{Location:"/projects"}),y.end();return}if(st({projectFolderPath:k}),!await Qa(_,h,k)){y.writeHead(303,{Location:"/projects?folderError=1"}),y.end();return}y.writeHead(303,{Location:`/project?id=${encodeURIComponent(h)}&folderUpdated=1`}),y.end();return}if(A==="POST"&&p==="/projects/delete"){let b=await ar(f),h=new URLSearchParams(b).get("projectId")?.trim()??"",P=H(),_=P===null?null:Z({wsUrl:P.wsUrl,pairingToken:P.pairingToken});if(_===null||h.length===0){y.writeHead(303,{Location:"/projects?deleteError=1"}),y.end();return}let k=await nb(_,h);y.writeHead(303,{Location:k.ok?"/projects?deleted=1":"/projects?deleteError=1"}),y.end();return}if(A==="GET"&&p==="/project"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=b.searchParams.get("id")?.trim()??"",P=o(),_=$t(P.installVersion),k=await Cf(e.layout),C=sn(k.projects,h);if(C===null){await u(y,"Project not found");return}let L=b.searchParams.get("linked")==="1"?b.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${b.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${b.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:b.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,R=b.searchParams.get("knowledgePromoted"),I=R!==null?`Marked ${R} lesson(s) as promoted in Agent Witch.`:null,N=b.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,U=b.searchParams.get("tab")?.trim()??"harness",G=U==="workflows"||U==="agents"||U==="knowledge"?U:"harness",q=H(),Ve=q===null?null:Z({wsUrl:q.wsUrl,pairingToken:q.pairingToken}),$=Ve===null?null:await xv(Ve,C.id),ve=0;if(Ve!==null)try{let qr=await fetch(`${Ve.appOrigin}/api/agent-witch/projects/${encodeURIComponent(C.id)}/knowledge`,{method:"GET",headers:{[$e]:Ve.pairingToken},signal:AbortSignal.timeout(1e4)});if(qr.ok){let dr=await qr.json();typeof dr=="object"&&dr!==null&&typeof dr.candidateCount=="number"&&(ve=dr.candidateCount)}}catch{ve=0}Oe(y,await n({title:C.name,activePath:"/projects",installVersion:P.installVersion,body:Ts({project:C,cloudAppOrigin:_,installed:so(e.layout),linkedSetSlugs:oo(C.projectFolderPath),composition:$,knowledgeCandidateCount:ve,activeTab:G,flashMessage:L??I,flashError:N})}));return}if(A==="POST"&&p==="/projects/pull-bound-harness"){let b=await ar(f),h=await YA({rawBody:b,layout:e.layout});if(h.kind==="not_found"){await u(y,"Project not found");return}if(h.kind==="redirect"){y.writeHead(303,{Location:h.location}),y.end();return}let P=o();Oe(y,await n({title:h.title,activePath:"/projects",installVersion:P.installVersion,body:h.body}));return}if(A==="POST"&&p==="/projects/link-harness"){let b=await ar(f),h=new URLSearchParams(b),P=h.get("projectId")?.trim()??"",_=await Cf(e.layout),k=sn(_.projects,P);if(k===null){await u(y,"Project not found");return}let C=h.getAll("applySet").map(G=>String(G)),L=$a({layout:e.layout,projectFolderPath:k.projectFolderPath,setSlugs:C});if(!L.ok){let G=o(),q=$t(G.installVersion);Oe(y,await n({title:k.name,activePath:"/projects",installVersion:G.installVersion,body:Ts({project:k,cloudAppOrigin:q,installed:so(e.layout),linkedSetSlugs:oo(k.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:L.errorMessage})}));return}let R=H(),I=R===null?null:Z({wsUrl:R.wsUrl,pairingToken:R.pairingToken}),N=I===null?!1:await Xa(I,k.id,L.appliedSetSlugs),U=new URLSearchParams({linked:"1",files:String(L.writtenFileCount),bindingsSynced:N?"1":"0"});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(k.id)}&${U.toString()}`}),y.end();return}if(A==="POST"&&p==="/project/knowledge/promote-all"){let b=await ar(f),P=new URLSearchParams(b).get("projectId")?.trim()??"",_=await Cf(e.layout),k=sn(_.projects,P);if(k===null){await u(y,"Project not found");return}let C=H(),L=C===null?null:Z({wsUrl:C.wsUrl,pairingToken:C.pairingToken}),R=L===null?{ok:!1,promotedCount:0}:await EF(L,k.id),I=new URLSearchParams({tab:"knowledge",...R.ok?{knowledgePromoted:String(R.promotedCount)}:{knowledgePromoteFailed:"1"}});y.writeHead(303,{Location:`/project?id=${encodeURIComponent(k.id)}&${I.toString()}`}),y.end();return}if(A==="GET"&&p==="/harness"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),h=o(),P=Ba(e.layout),_=b.searchParams.get("submitted")==="1",k=_?b.searchParams.get("syncFailed")==="1"?`Local harness updated (${b.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:b.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${b.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":b.searchParams.get("stopped")==="1"?`Reveal stopped. ${P?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:b.searchParams.get("revealed")==="1"?`Reveal found ${P?.sets.length??0} set(s).`:null,C=P?.scanRoots[0]??Up(),L=lY(e.layout,{reveal:P,importQuery:b.searchParams.get("import")==="1",justSubmitted:_}),R=$t(h.installVersion);Oe(y,await n({title:"Harness",activePath:"/harness",installVersion:h.installVersion,body:Mc(Qv(e.layout,{cloudAppOrigin:R,reveal:P,scanFolder:C,flashMessage:k,importSectionExpanded:L}))}));return}if(A==="POST"&&p==="/api/harness/pick-folder"){let b=ao();if(b===null){he(y,200,{cancelled:!0});return}he(y,200,{path:b});return}if(A==="GET"&&p==="/api/harness/file-content"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",P=ja(h);if(P===null){he(y,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let _=Nc.default.readFileSync(P,"utf8"),k=_.length>XF?`${_.slice(0,XF)}
\u2026 (truncated)`:_;he(y,200,{content:k})}catch{he(y,500,{errorMessage:"Could not read file."})}return}if(A==="POST"&&p==="/api/harness/reveal/add-project"){let b=await ar(f),h="";try{let k=JSON.parse(b);typeof k=="object"&&k!==null&&typeof k.projectPath=="string"&&(h=k.projectPath.trim())}catch{he(y,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(h.length===0){he(y,400,{ok:!1,errorMessage:"projectPath is required."});return}let P=Ba(e.layout),_=LA({reveal:P,projectPath:h});if(_===null||_.sets.length===0){he(y,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Vp(e.layout,_),he(y,200,{ok:!0,setCount:_.sets.length});return}if(A==="GET"&&p==="/api/harness/reveal/stream"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(h.length===0){he(y,400,{errorMessage:"Choose a folder to scan first."});return}let P=!1;f.on("close",()=>{P=!0}),y.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...ok});let _=WA({scanRoot:h,response:y,shouldAbort:()=>P});Vp(e.layout,_),y.end();return}if(A==="POST"&&p==="/harness/reveal"){y.writeHead(410,{"Content-Type":"text/plain"}),y.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(A==="POST"&&p==="/harness/submit"){let b=Ba(e.layout);if(b===null){let R=o(),I=$t(R.installVersion);Oe(y,await n({title:"Harness",activePath:"/harness",installVersion:R.installVersion,body:Mc(Qv(e.layout,{cloudAppOrigin:I,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let h=await ar(f),P=new URLSearchParams(h),_=Rv(P,b),k=RA({layout:e.layout,sets:_});if(!k.ok){let R=o(),I=$t(R.installVersion);Oe(y,await n({title:"Harness",activePath:"/harness",installVersion:R.installVersion,body:Mc(Qv(e.layout,{cloudAppOrigin:I,reveal:b,flashError:k.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}IA(e.layout);let L=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";y.writeHead(303,{Location:`/harness?submitted=1&count=${k.writtenItemCount??0}${L}`}),y.end();return}if(A==="GET"&&p==="/writer-api"){let b=new URL(f.url??"/",`http://127.0.0.1:${43347}`),P=H()?.writerExecutionBackend??je(void 0),_=We(e.layout.configPath),k=Qr(_),C=b.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,L=o();Oe(y,await n({title:"Writer API",activePath:"/writer-api",installVersion:L.installVersion,body:Wv({writerExecutionBackend:P,secrets:k,flashMessage:C})}));return}if(A==="POST"&&p==="/writer-api"){let b=await ar(f),h=new URLSearchParams(b),P=h.get("writerExecutionBackend")?.trim()??"cli";DS({configPath:e.layout.configPath,writerExecutionBackend:je(P),anthropicApiKey:h.get("anthropicApiKey")??void 0,anthropicModel:h.get("anthropicModel")??void 0,openaiApiKey:h.get("openaiApiKey")??void 0,openaiModel:h.get("openaiModel")??void 0,googleApiKey:h.get("googleApiKey")??void 0,googleModel:h.get("googleModel")??void 0}),y.writeHead(303,{Location:"/writer-api?saved=1"}),y.end();return}if(A==="GET"&&p==="/estimates"){y.writeHead(302,{Location:"/history"}),y.end();return}if(A==="GET"&&p==="/history"){let b=o();Oe(y,await n({title:"History",activePath:"/history",installVersion:b.installVersion,body:gv({reportsDir:e.layout.reportsDir})}));return}if(A==="GET"&&p==="/knowledge"){let h=new URL(f.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",P=o(),_=kP({layout:e.layout}),k=LP(_),C=h.length>0?await js({layout:e.layout,query:h,limit:20}):Ds(e.layout).slice(-50).reverse(),L=C.map(I=>{let N=TP(_,I.id),U=N>0?` \xB7 used in ${N} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ue(I.createdAt)}">${ue(rk(I.createdAt))}${I.source?` \xB7 ${ue(I.source)}`:""}${U}</div><pre>${ue(I.text)}</pre></article>`}).join(""),R=k.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${k.map(I=>`<li><strong>P${I.priority}</strong> \u2014 ${ue(I.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your Mac.</p></section>`:"";Oe(y,await n({title:"Knowledge",activePath:"/knowledge",installVersion:P.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ue(h)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${uY(h,C.length)}
            </section>${R}${L}`}));return}A==="POST"&&await ar(f),await u(y,"Not found")}})().catch(p=>{console.error("[agent-witch-local-app]",p),y.writeHead(500),y.end("Internal error")})});return S.on("error",f=>{if(f.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",f)}),S.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${hr}`)}),S},Dc=e=>kf(e).publicKeyRaw});var Tf=l(()=>{"use strict";zI();DI();r1()});var n1={};Ft(n1,{runAgentWitchExternalLiveCli:()=>gY});var nk,o1,mY,gY,s1=l(()=>{"use strict";nk=g(require("node:fs")),o1=g(require("node:path"));Vo();J();ne();Tf();ne();mY=e=>{let t=o1.default.join(e,"link-code.txt");if(!nk.default.existsSync(t))return null;let r=nk.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},gY=()=>{rt("agent-witch-live");let e=T(),t=M(),r=mY(e),o=Dc(t);zc({layout:t,controllers:{getStatus:()=>{let n=fe(t);return{wsConnected:ya(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{Mo(e)}}})}});var jr=v((LOe,l1)=>{"use strict";var i1=["nodebuffer","arraybuffer","fragments"],a1=typeof Blob<"u";a1&&i1.push("blob");l1.exports={BINARY_TYPES:i1,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:a1,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var jc=v((WOe,Lf)=>{"use strict";var{EMPTY_BUFFER:fY}=jr(),sk=Buffer[Symbol.species];function hY(e,t){if(e.length===0)return fY;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new sk(r.buffer,r.byteOffset,o):r}function c1(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function d1(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function yY(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function ik(e){if(ik.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new sk(e):ArrayBuffer.isView(e)?t=new sk(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),ik.readOnly=!1),t}Lf.exports={concat:hY,mask:c1,toArrayBuffer:yY,toBuffer:ik,unmask:d1};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Lf.exports.mask=function(t,r,o,n,s){s<48?c1(t,r,o,n,s):e.mask(t,r,o,n,s)},Lf.exports.unmask=function(t,r){t.length<32?d1(t,r):e.unmask(t,r)}}catch{}});var m1=v((EOe,p1)=>{"use strict";var u1=Symbol("kDone"),ak=Symbol("kRun"),lk=class{constructor(t){this[u1]=()=>{this.pending--,this[ak]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[ak]()}[ak](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[u1])}}};p1.exports=lk});var Si=v((ROe,y1)=>{"use strict";var $c=require("zlib"),g1=jc(),SY=m1(),{kStatusCode:f1}=jr(),AY=Buffer[Symbol.species],bY=Buffer.from([0,0,255,255]),Ef=Symbol("permessage-deflate"),$r=Symbol("total-length"),hi=Symbol("callback"),Po=Symbol("buffers"),yi=Symbol("error"),Wf,ck=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Wf){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Wf=new SY(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[hi];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){Wf.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){Wf.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?$c.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=$c.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Ef]=this,this._inflate[$r]=0,this._inflate[Po]=[],this._inflate.on("error",wY),this._inflate.on("data",h1)}this._inflate[hi]=o,this._inflate.write(t),r&&this._inflate.write(bY),this._inflate.flush(()=>{let s=this._inflate[yi];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=g1.concat(this._inflate[Po],this._inflate[$r]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[$r]=0,this._inflate[Po]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?$c.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=$c.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[$r]=0,this._deflate[Po]=[],this._deflate.on("data",PY)}this._deflate[hi]=o,this._deflate.write(t),this._deflate.flush($c.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=g1.concat(this._deflate[Po],this._deflate[$r]);r&&(s=new AY(s.buffer,s.byteOffset,s.length-4)),this._deflate[hi]=null,this._deflate[$r]=0,this._deflate[Po]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};y1.exports=ck;function PY(e){this[Po].push(e),this[$r]+=e.length}function h1(e){if(this[$r]+=e.length,this[Ef]._maxPayload<1||this[$r]<=this[Ef]._maxPayload){this[Po].push(e);return}this[yi]=new RangeError("Max payload size exceeded"),this[yi].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[yi][f1]=1009,this.removeListener("data",h1),this.reset()}function wY(e){if(this[Ef]._inflate=null,this[yi]){this[hi](this[yi]);return}e[f1]=1007,this[hi](e)}});var Ai=v((xOe,Rf)=>{"use strict";var{isUtf8:S1}=require("buffer"),{hasBlob:_Y}=jr(),vY=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function kY(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function dk(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function CY(e){return _Y&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Rf.exports={isBlob:CY,isValidStatusCode:kY,isValidUTF8:dk,tokenChars:vY};if(S1)Rf.exports.isValidUTF8=function(e){return e.length<24?dk(e):S1(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Rf.exports.isValidUTF8=function(t){return t.length<32?dk(t):e(t)}}catch{}});var fk=v((IOe,k1)=>{"use strict";var{Writable:TY}=require("stream"),A1=Si(),{BINARY_TYPES:LY,EMPTY_BUFFER:b1,kStatusCode:WY,kWebSocket:EY}=jr(),{concat:uk,toArrayBuffer:RY,unmask:xY}=jc(),{isValidStatusCode:IY,isValidUTF8:P1}=Ai(),xf=Buffer[Symbol.species],St=0,w1=1,_1=2,v1=3,pk=4,mk=5,If=6,gk=class extends TY{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||LY[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[EY]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=St}_write(t,r,o){if(this._opcode===8&&this._state==St)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new xf(o.buffer,o.byteOffset+t,o.length-t),new xf(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new xf(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case St:this.getInfo(t);break;case w1:this.getPayloadLength16(t);break;case _1:this.getPayloadLength64(t);break;case v1:this.getMask();break;case pk:this.getData(t);break;case mk:case If:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[A1.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=w1:this._payloadLength===127?this._state=_1:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=v1:this._state=pk}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=pk}getData(t){let r=b1;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&xY(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=mk,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[A1.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===St&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=St;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=uk(o,r):this._binaryType==="arraybuffer"?n=RY(uk(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=St):(this._state=If,setImmediate(()=>{this.emit("message",n,!0),this._state=St,this.startLoop(t)}))}else{let n=uk(o,r);if(!this._skipUTF8Validation&&!P1(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===mk||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=St):(this._state=If,setImmediate(()=>{this.emit("message",n,!1),this._state=St,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,b1),this.end();else{let o=t.readUInt16BE(0);if(!IY(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new xf(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!P1(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=St;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=St):(this._state=If,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=St,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[WY]=n,i}};k1.exports=gk});var Sk=v((MOe,L1)=>{"use strict";var{Duplex:OOe}=require("stream"),{randomFillSync:OY}=require("crypto"),{types:{isUint8Array:MY}}=require("util"),C1=Si(),{EMPTY_BUFFER:NY,kWebSocket:zY,NOOP:DY}=jr(),{isBlob:bi,isValidStatusCode:jY}=Ai(),{mask:T1,toBuffer:Nn}=jc(),At=Symbol("kByteLength"),$Y=Buffer.alloc(4),Of=8*1024,zn,Pi=Of,Ht=0,HY=1,FY=2,hk=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Ht,this.onerror=DY,this[zY]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||$Y,r.generateMask?r.generateMask(o):(Pi===Of&&(zn===void 0&&(zn=Buffer.alloc(Of)),OY(zn,0,Of),Pi=0),o[0]=zn[Pi++],o[1]=zn[Pi++],o[2]=zn[Pi++],o[3]=zn[Pi++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[At]!==void 0?a=r[At]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(T1(t,o,d,s,a),[d]):(T1(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=NY;else{if(typeof t!="number"||!jY(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(MY(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[At]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Ht?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):bi(t)?(n=t.size,s=!1):(t=Nn(t),n=t.length,s=Nn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[At]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};bi(t)?this._state!==Ht?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Ht?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):bi(t)?(n=t.size,s=!1):(t=Nn(t),n=t.length,s=Nn.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[At]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};bi(t)?this._state!==Ht?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Ht?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[C1.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):bi(t)?(a=t.size,c=!1):(t=Nn(t),a=t.length,c=Nn.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[At]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};bi(t)?this._state!==Ht?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Ht?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[At],this._state=FY,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(yk,this,a,n);return}this._bufferedBytes-=o[At];let i=Nn(s);r?this.dispatch(i,r,o,n):(this._state=Ht,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(UY,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[C1.extensionName];this._bufferedBytes+=o[At],this._state=HY,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");yk(this,c,n);return}this._bufferedBytes-=o[At],this._state=Ht,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Ht&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][At],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][At],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};L1.exports=hk;function yk(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function UY(e,t,r){yk(e,t,r),e.onerror(t)}});var z1=v((NOe,N1)=>{"use strict";var{kForOnEventAttribute:Hc,kListener:Ak}=jr(),W1=Symbol("kCode"),E1=Symbol("kData"),R1=Symbol("kError"),x1=Symbol("kMessage"),I1=Symbol("kReason"),wi=Symbol("kTarget"),O1=Symbol("kType"),M1=Symbol("kWasClean"),Hr=class{constructor(t){this[wi]=null,this[O1]=t}get target(){return this[wi]}get type(){return this[O1]}};Object.defineProperty(Hr.prototype,"target",{enumerable:!0});Object.defineProperty(Hr.prototype,"type",{enumerable:!0});var Dn=class extends Hr{constructor(t,r={}){super(t),this[W1]=r.code===void 0?0:r.code,this[I1]=r.reason===void 0?"":r.reason,this[M1]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[W1]}get reason(){return this[I1]}get wasClean(){return this[M1]}};Object.defineProperty(Dn.prototype,"code",{enumerable:!0});Object.defineProperty(Dn.prototype,"reason",{enumerable:!0});Object.defineProperty(Dn.prototype,"wasClean",{enumerable:!0});var _i=class extends Hr{constructor(t,r={}){super(t),this[R1]=r.error===void 0?null:r.error,this[x1]=r.message===void 0?"":r.message}get error(){return this[R1]}get message(){return this[x1]}};Object.defineProperty(_i.prototype,"error",{enumerable:!0});Object.defineProperty(_i.prototype,"message",{enumerable:!0});var Fc=class extends Hr{constructor(t,r={}){super(t),this[E1]=r.data===void 0?null:r.data}get data(){return this[E1]}};Object.defineProperty(Fc.prototype,"data",{enumerable:!0});var BY={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[Hc]&&n[Ak]===t&&!n[Hc])return;let o;if(e==="message")o=function(s,i){let a=new Fc("message",{data:i?s:s.toString()});a[wi]=this,Mf(t,this,a)};else if(e==="close")o=function(s,i){let a=new Dn("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[wi]=this,Mf(t,this,a)};else if(e==="error")o=function(s){let i=new _i("error",{error:s,message:s.message});i[wi]=this,Mf(t,this,i)};else if(e==="open")o=function(){let s=new Hr("open");s[wi]=this,Mf(t,this,s)};else return;o[Hc]=!!r[Hc],o[Ak]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[Ak]===t&&!r[Hc]){this.removeListener(e,r);break}}};N1.exports={CloseEvent:Dn,ErrorEvent:_i,Event:Hr,EventTarget:BY,MessageEvent:Fc};function Mf(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Nf=v((zOe,D1)=>{"use strict";var{tokenChars:Uc}=Ai();function lr(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function GY(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,u=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(u===-1&&Uc[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let f=e.slice(c,u);d===44?(lr(t,f,r),r=Object.create(null)):i=f,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(u===-1&&Uc[d]===1)c===-1&&(c=m);else if(d===32||d===9)u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m),lr(r,e.slice(c,u),!0),d===44&&(lr(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)a=e.slice(c,m),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(Uc[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(Uc[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,u=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(u===-1&&Uc[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))u===-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let f=e.slice(c,u);o&&(f=f.replace(/\\/g,""),o=!1),lr(r,a,f),d===44&&(lr(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=m);let S=e.slice(c,u);return i===void 0?lr(t,S,r):(a===void 0?lr(r,S,!0):o?lr(r,a,S.replace(/\\/g,"")):lr(r,a,S),lr(t,i,r)),t}function qY(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}D1.exports={format:qY,parse:GY}});var $f=v(($Oe,Y1)=>{"use strict";var VY=require("events"),KY=require("https"),JY=require("http"),H1=require("net"),YY=require("tls"),{randomBytes:XY,createHash:ZY}=require("crypto"),{Duplex:DOe,Readable:jOe}=require("stream"),{URL:bk}=require("url"),wo=Si(),QY=fk(),eX=Sk(),{isBlob:tX}=Ai(),{BINARY_TYPES:j1,CLOSE_TIMEOUT:rX,EMPTY_BUFFER:zf,GUID:oX,kForOnEventAttribute:Pk,kListener:nX,kStatusCode:sX,kWebSocket:_e,NOOP:F1}=jr(),{EventTarget:{addEventListener:iX,removeEventListener:aX}}=z1(),{format:lX,parse:cX}=Nf(),{toBuffer:dX}=jc(),U1=Symbol("kAborted"),wk=[8,13],Fr=["CONNECTING","OPEN","CLOSING","CLOSED"],uX=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,Q=class e extends VY{constructor(t,r,o){super(),this._binaryType=j1[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=zf,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),B1(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){j1.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new QY({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new eX(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[_e]=this,s[_e]=this,t[_e]=this,n.on("conclude",gX),n.on("drain",fX),n.on("error",hX),n.on("message",yX),n.on("ping",SX),n.on("pong",AX),s.onerror=bX,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",V1),t.on("data",jf),t.on("end",K1),t.on("error",J1),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[wo.extensionName]&&this._extensions[wo.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){ut(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,q1(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){_k(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||zf,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){_k(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||zf,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){_k(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[wo.extensionName]||(n.compress=!1),this._sender.send(t||zf,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){ut(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(Q,"CONNECTING",{enumerable:!0,value:Fr.indexOf("CONNECTING")});Object.defineProperty(Q.prototype,"CONNECTING",{enumerable:!0,value:Fr.indexOf("CONNECTING")});Object.defineProperty(Q,"OPEN",{enumerable:!0,value:Fr.indexOf("OPEN")});Object.defineProperty(Q.prototype,"OPEN",{enumerable:!0,value:Fr.indexOf("OPEN")});Object.defineProperty(Q,"CLOSING",{enumerable:!0,value:Fr.indexOf("CLOSING")});Object.defineProperty(Q.prototype,"CLOSING",{enumerable:!0,value:Fr.indexOf("CLOSING")});Object.defineProperty(Q,"CLOSED",{enumerable:!0,value:Fr.indexOf("CLOSED")});Object.defineProperty(Q.prototype,"CLOSED",{enumerable:!0,value:Fr.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(Q.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(Q.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[Pk])return t[nX];return null},set(t){for(let r of this.listeners(e))if(r[Pk]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[Pk]:!0})}})});Q.prototype.addEventListener=iX;Q.prototype.removeEventListener=aX;Y1.exports=Q;function B1(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:rX,protocolVersion:wk[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!wk.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${wk.join(", ")})`);let s;if(t instanceof bk)s=t;else try{s=new bk(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let p=new SyntaxError(c);if(e._redirects===0)throw p;Df(e,p);return}let d=i?443:80,u=XY(16).toString("base64"),m=i?KY.request:JY.request,S=new Set,f;if(n.createConnection=n.createConnection||(i?mX:pX),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(f=new wo({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=lX({[wo.extensionName]:f.offer()})),r.length){for(let p of r){if(typeof p!="string"||!uX.test(p)||S.has(p))throw new SyntaxError("An invalid or duplicated subprotocol was specified");S.add(p)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let p=n.path.split(":");n.socketPath=p[0],n.path=p[1]}let y;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let p=o&&o.headers;if(o={...o,headers:{}},p)for(let[A,b]of Object.entries(p))o.headers[A.toLowerCase()]=b}else if(e.listenerCount("redirect")===0){let p=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!p||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,p||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),y=e._req=m(n),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=m(n);n.timeout&&y.on("timeout",()=>{ut(e,y,"Opening handshake has timed out")}),y.on("error",p=>{y===null||y[U1]||(y=e._req=null,Df(e,p))}),y.on("response",p=>{let A=p.headers.location,b=p.statusCode;if(A&&n.followRedirects&&b>=300&&b<400){if(++e._redirects>n.maxRedirects){ut(e,y,"Maximum redirects exceeded");return}y.abort();let h;try{h=new bk(A,t)}catch{let _=new SyntaxError(`Invalid URL: ${A}`);Df(e,_);return}B1(e,h,r,o)}else e.emit("unexpected-response",y,p)||ut(e,y,`Unexpected server response: ${p.statusCode}`)}),y.on("upgrade",(p,A,b)=>{if(e.emit("upgrade",p),e.readyState!==Q.CONNECTING)return;y=e._req=null;let h=p.headers.upgrade;if(h===void 0||h.toLowerCase()!=="websocket"){ut(e,A,"Invalid Upgrade header");return}let P=ZY("sha1").update(u+oX).digest("base64");if(p.headers["sec-websocket-accept"]!==P){ut(e,A,"Invalid Sec-WebSocket-Accept header");return}let _=p.headers["sec-websocket-protocol"],k;if(_!==void 0?S.size?S.has(_)||(k="Server sent an invalid subprotocol"):k="Server sent a subprotocol but none was requested":S.size&&(k="Server sent no subprotocol"),k){ut(e,A,k);return}_&&(e._protocol=_);let C=p.headers["sec-websocket-extensions"];if(C!==void 0){if(!f){ut(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let L;try{L=cX(C)}catch{ut(e,A,"Invalid Sec-WebSocket-Extensions header");return}let R=Object.keys(L);if(R.length!==1||R[0]!==wo.extensionName){ut(e,A,"Server indicated an extension that was not requested");return}try{f.accept(L[wo.extensionName])}catch{ut(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[wo.extensionName]=f}e.setSocket(A,b,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(y,e):y.end()}function Df(e,t){e._readyState=Q.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function pX(e){return e.path=e.socketPath,H1.connect(e)}function mX(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=H1.isIP(e.host)?"":e.host),YY.connect(e)}function ut(e,t,r){e._readyState=Q.CLOSING;let o=new Error(r);Error.captureStackTrace(o,ut),t.setHeader?(t[U1]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Df,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function _k(e,t,r){if(t){let o=tX(t)?t.size:dX(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Fr[e.readyState]})`);process.nextTick(r,o)}}function gX(e,t){let r=this[_e];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[_e]!==void 0&&(r._socket.removeListener("data",jf),process.nextTick(G1,r._socket),e===1005?r.close():r.close(e,t))}function fX(){let e=this[_e];e.isPaused||e._socket.resume()}function hX(e){let t=this[_e];t._socket[_e]!==void 0&&(t._socket.removeListener("data",jf),process.nextTick(G1,t._socket),t.close(e[sX])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function $1(){this[_e].emitClose()}function yX(e,t){this[_e].emit("message",e,t)}function SX(e){let t=this[_e];t._autoPong&&t.pong(e,!this._isServer,F1),t.emit("ping",e)}function AX(e){this[_e].emit("pong",e)}function G1(e){e.resume()}function bX(e){let t=this[_e];t.readyState!==Q.CLOSED&&(t.readyState===Q.OPEN&&(t._readyState=Q.CLOSING,q1(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function q1(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function V1(){let e=this[_e];if(this.removeListener("close",V1),this.removeListener("data",jf),this.removeListener("end",K1),e._readyState=Q.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[_e]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",$1),e._receiver.on("finish",$1))}function jf(e){this[_e]._receiver.write(e)||this.pause()}function K1(){let e=this[_e];e._readyState=Q.CLOSING,e._receiver.end(),this.end()}function J1(){let e=this[_e];this.removeListener("error",J1),this.on("error",F1),e&&(e._readyState=Q.CLOSING,this.destroy())}});var eU=v((FOe,Q1)=>{"use strict";var HOe=$f(),{Duplex:PX}=require("stream");function X1(e){e.emit("close")}function wX(){!this.destroyed&&this._writableState.finished&&this.destroy()}function Z1(e){this.removeListener("error",Z1),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function _X(e,t){let r=!0,o=new PX({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(X1,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(X1,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",wX),o.on("error",Z1),o}Q1.exports=_X});var vk=v((UOe,tU)=>{"use strict";var{tokenChars:vX}=Ai();function kX(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&vX[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}tU.exports={parse:kX}});var lU=v((GOe,aU)=>{"use strict";var CX=require("events"),Hf=require("http"),{Duplex:BOe}=require("stream"),{createHash:TX}=require("crypto"),rU=Nf(),jn=Si(),LX=vk(),WX=$f(),{CLOSE_TIMEOUT:EX,GUID:RX,kWebSocket:xX}=jr(),IX=/^[+/0-9A-Za-z]{22}==$/,oU=0,nU=1,iU=2,kk=class extends CX{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:EX,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:WX,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Hf.createServer((o,n)=>{let s=Hf.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=OX(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=oU}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===iU){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Bc,this);return}if(t&&this.once("close",t),this._state!==nU)if(this._state=nU,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Bc,this):process.nextTick(Bc,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Bc(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",sU);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){$n(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){$n(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!IX.test(s)){$n(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){$n(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Gc(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=LX.parse(c)}catch{$n(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&u!==void 0){let S=new jn({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let f=rU.parse(u);f[jn.extensionName]&&(S.accept(f[jn.extensionName]),m[jn.extensionName]=S)}catch{$n(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let S={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(S,(f,y,p,A)=>{if(!f)return Gc(r,y||401,p,A);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(S))return Gc(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[xX])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>oU)return Gc(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${TX("sha1").update(r+RX).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),u._protocol=m)}if(t[jn.extensionName]){let m=t[jn.extensionName].params,S=rU.format({[jn.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${S}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",sU),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Bc,this)})),a(u,n)}};aU.exports=kk;function OX(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Bc(e){e._state=iU,e.emit("close")}function sU(){this.destroy()}function Gc(e,t,r,o){r=r||Hf.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Hf.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function $n(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,$n),e.emit("wsClientError",i,r,t)}else Gc(r,o,n,s)}});var MX,NX,zX,DX,jX,$X,cU,HX,qc,dU=l(()=>{MX=g(eU(),1),NX=g(Nf(),1),zX=g(Si(),1),DX=g(fk(),1),jX=g(Sk(),1),$X=g(vk(),1),cU=g($f(),1),HX=g(lU(),1),qc=cU.default});var Ck,Tk,Lk=l(()=>{"use strict";Ck="AGENT_WITCH_EXTERNAL_BRIDGE",Tk="AGENT_WITCH_EXTERNAL_LIVE"});var Wk,uU=l(()=>{"use strict";Wk=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var FX,Ek,pU=l(()=>{"use strict";Lk();uU();FX=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",Ek=(e={})=>{let t=e.env??process.env,r=Wk(t[Ck]),o=Wk(t[Tk]);return{mode:FX(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var mU=l(()=>{"use strict";Lk()});var gU=l(()=>{"use strict";pU();mU()});var Rk=l(()=>{"use strict"});var Ur,Vc=l(()=>{"use strict";Ur=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var vi,Hn,fU,BX,xk,Ik,hU,yU,Ok,SU,Kc,Mk=l(()=>{"use strict";vi=g(require("node:fs")),Hn=g(require("node:os")),fU=g(require("node:path"));Rk();Vc();BX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xk=(e=Hn.default.hostname())=>fU.default.join(Hn.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),Ik=e=>{if(!vi.default.existsSync(e))return null;try{let t=JSON.parse(vi.default.readFileSync(e,"utf8"));return!BX(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},hU=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},yU=(e,t)=>{vi.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Ok=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??xk(),o=Ik(r);if(o!==null&&o.pid!==process.pid&&Ur(o.pid)&&hU(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Hn.default.hostname(),macOsUsername:Hn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return yU(r,n),{ok:!0}},SU=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??xk(),o=Ik(r);return o!==null&&o.pid!==process.pid&&Ur(o.pid)&&hU(o)?{ok:!1}:(yU(r,{hostname:Hn.default.hostname(),macOsUsername:Hn.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},Kc=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??xk();Ik(r)?.pid===process.pid&&vi.default.existsSync(r)&&vi.default.unlinkSync(r)}});var Nk,Jc,GX,qX,VX,KX,zk,AU=l(()=>{"use strict";Nk=require("node:child_process"),Jc=g(require("node:path"));Vc();Nu();GX=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),qX=(e,t)=>{if(GX(e)||!/\bnode\b/.test(e))return!1;let r=Jc.default.resolve(t),o=Jc.default.join(r,"app",Yi),n=Jc.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Yi||i==="agent-witch.ts")return e.includes(r);try{let a=Jc.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},VX=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,Nk.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},KX=(e,t,r)=>{let o=VX(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||qX(d,t)&&n.push(c)}return n},zk=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,Nk.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=KX(r,e.installDir,t),n=[];for(let s of o)if(Ur(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var Yc,Xc,bU,JX,Dk,PU=l(()=>{"use strict";Yc=g(require("node:fs")),Xc=g(require("node:path"));ze();bU=(e,t)=>{!Yc.default.existsSync(e)||Yc.default.existsSync(t)||(Yc.default.mkdirSync(Xc.default.dirname(t),{recursive:!0}),Yc.default.renameSync(e,t))},JX=e=>{if(e.profileEmail===null)return;let t=Xc.default.join(e.installDir,Pt);bU(Xc.default.join(t,Vn),e.mainLogPath),bU(Xc.default.join(t,Kn),e.errorLogPath)},Dk=e=>{let t=M();e!==void 0&&t.installDir!==e||JX(t)}});var wU=l(()=>{"use strict";pl();Lm();Lm();!ot()&&jo(__agentWitchImportMetaUrl)&&(async()=>{rt("agent-witch-wake-server");let e=await cn(),t=fr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var _U=l(()=>{"use strict";wU()});var vU=l(()=>{"use strict";tl()});var jk,kU=l(()=>{"use strict";Rk();_U();Mk();vU();jk=async(e={})=>{let t=e.skipInProcessBridge?null:await Tm();cm();let r=setInterval(()=>{cm()},6e4),o=setInterval(()=>{if(!SU().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Zc,Ff,ZX,CU,TU,Uf,LU,WU,$k,EU,Bf,RU=l(()=>{"use strict";Zc=g(require("node:fs")),Ff=g(require("node:path")),ZX="pending-run-inputs.json",CU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),TU=e=>{let t=e.profileEmail?Ff.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Ff.default.join(t,ZX)},Uf=e=>{let t=TU(e);if(!Zc.default.existsSync(t))return{};try{let r=JSON.parse(Zc.default.readFileSync(t,"utf8"));return CU(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!CU(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},LU=(e,t)=>{let r=TU(e);Zc.default.mkdirSync(Ff.default.dirname(r),{recursive:!0}),Zc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},WU=e=>Object.values(Uf(e)),$k=(e,t)=>Uf(e)[t]!==void 0,EU=(e,t)=>{let r=Uf(e);r[t.agentRunId]=t,LU(e,r)},Bf=(e,t)=>{let r=Uf(e);delete r[t],LU(e,r)}});var Gf=l(()=>{"use strict";ge()});var xU=l(()=>{"use strict";ge()});var qf=l(()=>{"use strict";ge()});var Vf=l(()=>{"use strict";ge()});var Qc=l(()=>{"use strict";ge()});var QX,eZ,ed,Hk=l(()=>{"use strict";Tt();Gf();xU();qf();Vf();Qc();QX={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},eZ={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},ed=e=>{if(!pe(e.writerAgent))return"the selected writer";let t=nt(e.writerAgent);if(je(e.writerExecutionBackend)==="api"&&t!==null){let r=Ke(We(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Pa(t,r.model);return`${eZ[t]} model ${o}`}}return QX[e.writerAgent]}});var tZ,rZ,IU,OU,MU=l(()=>{"use strict";tZ=/"input_tokens"\s*:\s*(\d+)/,rZ=/"output_tokens"\s*:\s*(\d+)/,IU=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},OU=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=IU(tZ.exec(t)),o=IU(rZ.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var Kf=l(()=>{"use strict";Xt()});var td,Jf,oZ,Fk,NU,zU,DU,Uk,jU=l(()=>{"use strict";td=g(require("node:fs")),Jf=g(require("node:path"));Kf();oZ="run-completion-outbox.json",Fk=e=>{let t=e.profileEmail?Jf.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Jf.default.join(t,oZ)},NU=e=>{let t=Fk(e);if(!td.default.existsSync(t))return[];try{let r=JSON.parse(td.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},zU=(e,t)=>{td.default.mkdirSync(Jf.default.dirname(Fk(e)),{recursive:!0}),td.default.writeFileSync(Fk(e),JSON.stringify(t,null,2),"utf8")},DU=(e,t)=>{let r=[...NU(e).filter(o=>o.runId!==t.runId),t];zU(e,r)},Uk=async e=>{if(e.cloudApi===null)return;let t=NU(e.layout);if(t.length===0)return;let r=[];for(let o of t)await Ja(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);zU(e.layout,r)}});var $U=l(()=>{"use strict"});var Bk,rd,sZ,Fn,HU=l(()=>{"use strict";$U();Bk=new Map,rd=e=>{let t=Bk.get(e);t!==void 0&&(clearInterval(t),Bk.delete(e))},sZ=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},Fn=(e,t,r,o={})=>{rd(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){rd(t);return}let i=o.onTick?.()??{};sZ(e,t,n,i)};s(),Bk.set(t,setInterval(s,15e3))}});var FU=l(()=>{"use strict";Xt()});var UU,BU=l(()=>{"use strict";FU();UU=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:pt(t)}});var Gk,od,Br,qk,cr,GU,Yf=l(()=>{"use strict";Gk=new Set,od=new Map,Br=(e,t)=>{if(t.length===0)return;let r=od.get(e)??[];r.push(t),od.set(e,r)},qk=e=>{Gk.add(e);let t=od.get(e)??[];return od.delete(e),t},cr=e=>Gk.has(e),GU=e=>{Gk.delete(e),od.delete(e)}});var ki,qU,VU,KU=l(()=>{"use strict";ki=g(require("node:path")),qU=require("node:url");Do();VU=()=>{if(ot()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?ki.default.dirname(ki.default.resolve(e)):ki.default.dirname(ki.default.resolve(__filename))}return ki.default.dirname((0,qU.fileURLToPath)(__agentWitchImportMetaUrl))}});var JU,YU,XU,ZU,et,Ci,QU,eB,Ti,Vk,Kk,Jk,tB,Yk,rB,Xf=l(()=>{"use strict";JU=require("node:crypto"),YU=g(require("node:fs")),XU=g(require("node:path")),ZU=require("node:url");Vc();Do();KU();et=new Map,QU=async()=>{if(Ci!==void 0)return Ci;try{if(ot()){let e=VU(),t=XU.default.join(e,"deps","node-pty","lib","index.js");if(YU.default.existsSync(t)){let r=await import((0,ZU.pathToFileURL)(t).href);return Ci=r,r}}return Ci=await import("node-pty"),Ci}catch{return Ci=null,null}},eB=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Ti=(e,t,r)=>{let o=et.get(e);if(o!==void 0){et.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},Vk=(e,t)=>{let r=et.get(e);return r===void 0?!1:(r.pty.write(t),!0)},Kk=(e,t,r)=>{let o=et.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},Jk=e=>{for(let t of et.values())if(!(t.mode!=="agent"||t.runId!==e))return Ur(t.pty.pid);return!1},tB=e=>{for(let[t,r]of et.entries())if(!(r.mode!=="agent"||r.runId!==e)){et.delete(t);try{r.pty.kill()}catch{}return!0}return!1},Yk=async e=>{let t=await QU();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;et.get(e.shellSessionId)!==void 0&&Ti(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return et.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{eB(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{et.get(e.shellSessionId)?.pty===n&&(et.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},rB=async e=>{let t=e.shellSessionId??(0,JU.randomUUID)(),r=await QU();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return et.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{eB(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{et.get(t)?.pty===o&&(et.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var Zf,oB,nB=l(()=>{"use strict";Zf="[[AWAITING_INPUT]]",oB=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Zf,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var nd,sB,Qf=l(()=>{"use strict";nB();nd=e=>{let t=e.indexOf(Zf);if(t<0)return null;let o=e.slice(t+Zf.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},sB=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",oB].join(`
`)});var iB,aB=l(()=>{"use strict";Yf();Xf();Qf();iB=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(cr(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Br(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await rB({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=nd(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var lB,cB,dB,Gr,eh=l(()=>{"use strict";lB=require("node:child_process"),cB=g(require("node:fs")),dB=g(require("node:path"));Nu();Gr=(e,t)=>{let r=dB.default.join(e,"app",mW,"ensure-writer.sh");return cB.default.existsSync(r)?new Promise((o,n)=>{let s=(0,lB.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{n(i)}),s.on("close",i=>{if(i===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var uB,Un,id,th,Xk,sd,rh,oh,Zk,Qk,iZ,Li,aZ,lZ,eC,tC=l(()=>{"use strict";uB=require("node:child_process");Tt();eh();qf();Gf();Qc();Vf();Un=new Map,id=e=>e==="cursor"||e==="antigravity",th=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",Xk=e=>Un.get(e)?.warmed===!0,sd=e=>{let t=Un.get(e);Un.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},rh=e=>Un.get(e)?.conversationStarted===!0,oh=e=>{let t=Un.get(e);Un.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},Zk=e=>{Un.delete(e)},Qk=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",iZ={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Li=e=>`${iZ[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,aZ=(e,t,r,o)=>new Promise(n=>{let s=op(t,r),i=[],a=(0,uB.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),lZ=(e,t)=>{let r=Li(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},eC=async e=>{if(!pe(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&je(e.runConfig.writerExecutionBackend)==="api"){let r=nt(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=We(e.runConfig.layout.configPath);return Ke(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),sd(e.writerAgent),{exitCode:0,output:Li(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Gr(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}id(e.writerAgent)&&sd(e.writerAgent);let t=await aZ(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?lZ(e.writerAgent,t.output):Li(e.writerAgent)}}});var Bn,rC=l(()=>{"use strict";Bn={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var pB,cZ,dZ,mB,uZ,oC,gB=l(()=>{"use strict";rC();pB=/you(?:'|')ve hit your session limit/i,cZ=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],dZ=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,mB=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},uZ=e=>{let t=dZ.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},oC=e=>{let t=e.trim();if(t.length===0)return null;if(pB.test(t))return{code:Bn.SESSION_LIMIT,resetHint:uZ(t),matchedLine:mB(t,pB)};for(let r of cZ)if(r.test(t))return{code:Bn.PROVIDER_QUOTA,resetHint:null,matchedLine:mB(t,r)};return null}});var nh,sh,nC,sC=l(()=>{"use strict";nh="[[AGENT_RUN_WRITER_EXECUTION]]",sh="cli-writer-api-key-missing",nC="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var iC=l(()=>{"use strict";sC()});var fB=l(()=>{"use strict";iC()});var ih=l(()=>{"use strict";rC();gB();sC();iC();fB()});var ah,hB=l(()=>{"use strict";ah={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var yB,SB=l(()=>{"use strict";yB="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var AB,bB=l(()=>{"use strict";ih();SB();AB=e=>e.code===Bn.SESSION_LIMIT?yB:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var PB,wB=l(()=>{"use strict";ih();hB();bB();PB=e=>{let t=oC(e.output);return t!==null?{status:ah.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:AB(t)}:{status:e.exitCode===0?ah.COMPLETED:ah.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var aC,QNe,_B=l(()=>{"use strict";aC={OPEN:"open",APPROVAL:"approval"},QNe=aC.APPROVAL});var Wi,lh,vB,gZ,kB,CB,TB,ad,lC,cC=l(()=>{"use strict";Wi=g(require("node:fs")),lh=g(require("node:path")),vB="runs",gZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kB=e=>{let t=e.profileEmail!==null?lh.default.join(e.installDir,"profiles",e.profileEmail,vB):lh.default.join(e.installDir,vB);return Wi.default.mkdirSync(t,{recursive:!0}),t},CB=(e,t)=>lh.default.join(kB(e),`${t}.json`),TB=(e,t)=>{Wi.default.writeFileSync(CB(e,t.id),JSON.stringify(t,null,2))},ad=(e,t)=>{let r=CB(e,t);if(!Wi.default.existsSync(r))return null;try{let o=JSON.parse(Wi.default.readFileSync(r,"utf8"));return!gZ(o)||typeof o.id!="string"?null:o}catch{return null}},lC=e=>{let t=kB(e),r=Wi.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=ad(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var fZ,LB,WB=l(()=>{"use strict";wB();_B();cC();fZ=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=PB({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:aC.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},LB=(e,t)=>{let r=fZ(t);return TB(e,r),r}});var EB=l(()=>{"use strict";Pf()});var RB,xB=l(()=>{"use strict";ih();RB=()=>[nh,`agentRunWriterExecutionBackend=${sh}`,`agentRunWriterExecutionReasonCode=${nC}`].join(`
`)});var _o,ch=l(()=>{"use strict";_o=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var dC,hZ,yZ,IB,OB=l(()=>{"use strict";dC=e=>e.toLocaleString("en-US"),hZ=e=>e<.01?e.toFixed(4):e.toFixed(3),yZ=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${hZ(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${dC(e.inputTokens)} in / ${dC(e.outputTokens)} out (${dC(e.totalTokens)} total)`,t].join(`
`)},IB=(e,t)=>{if(t===void 0)return e;let r=yZ(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var MB=l(()=>{"use strict";ge()});var zB,ld,ye,uC,dh,NB,SZ,AZ,DB,jB,$B,cd,pC,mC,gC,HB,bZ,bt,dd,vo,FB,PZ,wZ,uh,fC,hC,yC,UB=l(()=>{"use strict";zB=require("node:child_process");ge();Tt();RU();Wc();Hk();MU();ba();jU();Kf();HU();Vc();BU();Yf();Xf();Qf();aB();tC();WB();EB();xB();ch();OB();as();MB();Qc();ta();Qf();ld=new Map,ye=new Map,uC=new Set,dh=new Map,NB=e=>{e!==void 0&&!dh.has(e)&&dh.set(e,Date.now())},SZ=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(cr(t)){bt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}Br(t,n)},AZ=(e,t,r,o,n)=>{if(!$S(e,n))return;let s=`${RB()}
`;SZ(t,r,o,s);let i=ye.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},DB=130,jB=`

Stopped by user.`,$B=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:_o(e)},cd=null,pC=e=>{cd=e},mC=(e,t)=>{if(cd===null)return;let r=uv(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||$A(cd,t,r)},gC=async e=>{await Uk({layout:e,cloudApi:cd})},HB=e=>{let t=ld.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Ur(t.pid)},bZ=e=>me({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),bt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},dd=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=rs(s),c=ye.get(r);if(a!==null&&c!==void 0){let d=_W(a),u=HB(r)||Jk(r);d!==null&&!u&&vo(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return wW(a)}}),vo=(e,t,r,o,n,s,i,a)=>{let c=fs(s,a),d=n,u=IB(c.output,c.llmUsage);if(r!==void 0){let S=dh.get(r);dh.delete(r),S!==void 0&&cv({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-S)/1e3))});let f=OU(c.llmUsage,u);f!==null&&QH({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:f})}r!==void 0&&uC.has(r)&&(uC.delete(r),d=DB,u=u.trim().length>0&&!u.includes("Stopped by user.")?`${u.trim()}${jB}`:"Stopped by user.");let m=r!==void 0?uv(e.layout.reportsDir,r):null;if(r!==void 0){rd(r),La(e.layout,r),cr(r)&&(bt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),GU(r));let S=ye.get(r);YH({reportsDir:e.layout.reportsDir,agentRunId:r,input:_o(i),output:u,...S!==void 0?{writerLabel:ed({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&Af({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:u,agentRunId:r}),LB(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:u,layout:e.layout}),DU(e.layout,{runId:r,exitCode:d,output:u,createdAt:new Date().toISOString(),...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{}}),Uk({layout:e.layout,cloudApi:cd}),ye.delete(r),ld.delete(r),Bf(e.layout,r)}bt(t,{type:"command.claude.result",payload:{exitCode:d,output:u,...r!==void 0?{agentRunId:r}:{},...typeof m?.estimateSeconds=="number"?{estimateSeconds:m.estimateSeconds}:{},...typeof m?.actualSeconds=="number"?{actualSeconds:m.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),da(e.layout)},FB=(e,t,r,o,n,s,i)=>{let a=ye.get(r),c=a?.accumulatedOutput??s;EU(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),Fn(t,r,()=>$k(e.layout,r),dd(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),bt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},PZ=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,u=f=>{if(!(n===void 0||f.length===0)){if(cr(n)){bt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:f},requestId:o});return}Br(n,f)}};if(n!==void 0){let f=ye.get(n);ld.set(n,t),ye.set(n,{originalPrompt:s,userTranscriptPrompt:f?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:f?.projectFolderPath,reportKey:f?.reportKey,accumulatedOutput:f?.accumulatedOutput??""}),bt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),Fn(r,n,()=>HB(n),dd(e,r,n,o,f?.projectFolderPath,f?.reportKey))}let m=a==="claude-cli",S=[];t.stdout?.on("data",f=>{let y=f.toString("utf8");if(m?S.push(y):(c.push(y),u(y)),d||n===void 0)return;let p=nd(c.join(""));if(p!==null){d=!0,t.kill("SIGTERM");let A=ye.get(n),b=[A?.accumulatedOutput??"",p.partialOutput].filter(h=>h.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=b),ld.delete(n),FB(e,r,n,o,p.question,b,s)}}),t.stderr?.on("data",f=>{let y=f.toString("utf8");c.push(y),u(y)}),t.on("close",f=>{if(d)return;oh(a);let y=n!==void 0?ye.get(n):void 0,p=m?fs(S.join("")):{output:c.join("").trim(),llmUsage:void 0},A=m?c.join("").trim():"",b=[p.output.trim(),A].filter(P=>P.length>0).join(`
`);m&&p.output.trim().length>0&&u(p.output);let h=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${b}`.trim():b;vo(e,r,n,o,f??-1,h,s,p.llmUsage)}),t.on("error",f=>{d||vo(e,r,n,o,-1,f.message,s)})},wZ=(e,t,r,o,n,s,i,a,c)=>{let d=$B(r,c);s!==void 0&&(ye.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),bt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),Fn(n,s,()=>ye.has(s),dd(e,n,s,o,i,a))),va(e,t,r,m=>{if(!(s===void 0||m.length===0)){if(cr(s)){bt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:m},requestId:o});return}Br(s,m)}}).then(m=>{oh(t),vo(e,n,s,o,m.exitCode,m.output,r,m.llmUsage)}).catch(m=>{let S=m instanceof Error?m.message:String(m);vo(e,n,s,o,-1,S,r)})},uh=(e,t,r,o,n,s,i,a,c,d,u,m)=>{let S=$B(r,u);if(ca(e.layout),Yo(e,t)){NB(s),wZ(e,t,r,o,n,s,c,d,S);return}let f=Kt(t,r,bZ(e),i);if(f===null){vo(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}NB(s);let y=UU({workspace:e.workspace,projectFolderPath:c}),p=()=>{let A=(0,zB.spawn)(f.command,[...f.args],{cwd:y,stdio:["ignore","pipe","pipe"],env:m??process.env});PZ(e,A,n,o,s,r,S,t)};if(s===void 0){p();return}ye.set(s,{originalPrompt:r,userTranscriptPrompt:S,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:ye.get(s)?.accumulatedOutput??""}),AZ(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&ea({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),Fn(n,s,()=>ye.has(s),dd(e,n,s,o,c,d)),iB({socket:n,sendMessage:bt,requestId:o,agentRunId:s,shellSessionId:a,command:f.command,args:f.args,cwd:y,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:A=>{a!==void 0&&Ti(a,P=>{bt(n,P)},o);let b=ye.get(s),h=[b?.accumulatedOutput??"",A.partialOutput].filter(P=>P.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=h),FB(e,n,s,o,A.question,h,r)},onFinished:(A,b)=>{oh(t);let h=fs(b),P=ye.get(s),_=P!==void 0&&P.accumulatedOutput.length>0?`${P.accumulatedOutput}

${h.output}`.trim():h.output;vo(e,n,s,o,A,_,r,h.llmUsage)}}).then(A=>{if(!A){p();return}Fn(n,s,()=>Jk(s),dd(e,n,s,o,c,d))}).catch(A=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",A instanceof Error?A.message:A),p()})},fC=(e,t,r,o)=>{Bf(e.layout,t.agentRunId),t.shellSessionId!==void 0&&bt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=sB(t),s=ye.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;uh(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},hC=(e,t)=>{for(let r of WU(e.layout))ye.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:_o(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Fn(t,r.agentRunId,()=>$k(e.layout,r.agentRunId),{awaitingInput:!0}),bt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},yC=(e,t,r,o)=>{let n=ye.get(r);if(n===void 0)return!1;uC.add(r),rd(r);let s=ld.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(tB(r))return!0;Bf(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${jB}`:"Stopped by user.";return vo(e,t,r,o,DB,i,n.originalPrompt),!0}});var _Z,SC,BB=l(()=>{"use strict";Ia();_Z=()=>`http://127.0.0.1:${Lt()}/restart`,SC=async()=>{try{let e=await fetch(_Z(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var GB=l(()=>{"use strict";yl()});var qB=l(()=>{"use strict";$v()});var VB,KB=l(()=>{"use strict";VB=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var ud,vZ,AC,JB=l(()=>{"use strict";J();ne();GB();Lb();qB();KB();as();ud=(e,t)=>{lo(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},vZ=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(rS(),tS)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},AC=async e=>{let t=De(e.layout.installDir)?.bundleVersion??null;if(!VB({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(Ct(e.layout)){ua({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),ud(e.layout,{summary:r,action:"install-bundle-update-start"}),gr({launchAgentLabel:ke(e.layout.installDir),installDir:e.layout.installDir});let o=await fi({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),ud(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await vZ();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),ud(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),ud(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),ud(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var kZ,bC,YB=l(()=>{"use strict";kZ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bC=e=>{if(!kZ(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var PC,wC,XB=l(()=>{"use strict";db();ub();PC=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=rl({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},wC=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await wr(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var ZB,CZ,TZ,LZ,pd,QB=l(()=>{"use strict";ZB=g(require("node:os"));ze();CZ="Default",TZ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),LZ=e=>{let t=ZB.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},pd=()=>{let e=M(),t=Cu(e),r=TZ(CZ);return`${LZ(t)}/${r.length>0?r:"project"}`}});var eG=l(()=>{"use strict";yl()});var tG,_C,rG=l(()=>{"use strict";eG();tG=!1,_C=e=>{tG||(tG=!0,process.on("uncaughtException",t=>{un(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;un(e,{kind:"crash",message:r,stack:o})}))}});var oG,WZ,vC,nG=l(()=>{"use strict";oG=require("node:child_process");eh();Tt();qf();Gf();Qc();Vf();WZ=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,oG.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},vC=async e=>{if(!pe(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&je(e.runConfig.writerExecutionBackend)==="api"){let r=nt(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=We(e.layout.configPath),n=Ke(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Gr(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await WZ(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var kC,sG=l(()=>{"use strict";kC=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var iG,CC,aG=l(()=>{"use strict";iG=require("node:crypto"),CC=()=>(0,iG.randomUUID)()});var Ei,lG,ph=l(()=>{"use strict";Ei="[[WORKING_ESTIMATE]]",lG=(e,t,r,o="")=>["Estimate how long the following task will take on this Mac, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Ei,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var cG,dG=l(()=>{"use strict";cG=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var EZ,uG,pG=l(()=>{"use strict";ph();EZ=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,uG=e=>{if(!e.includes(Ei))return null;let t=null;for(let r of e.matchAll(EZ)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var RZ,TC,mG=l(()=>{"use strict";pG();RZ=/^(\d{1,6})\b/,TC=e=>{let t=uG(e);if(t!==null)return t;let r=RZ.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var xZ,IZ,OZ,mh,LC=l(()=>{"use strict";Tt();gl();xZ="http://127.0.0.1:11434",IZ=45e3,OZ=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},mh=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||xZ,o=t===void 0?(await Rt({commands:me({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(IZ)});return n.ok?OZ(await n.json()):null}catch{return null}}});var WC,EC,RC,gG=l(()=>{"use strict";ta();ph();ch();dG();mG();Wc();LC();WC=async e=>{let t=_o(e.wrappedPrompt),r=XH(e.reportsDir);return{estimateOutput:await mh(lG(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},EC=e=>{let t=TC(e.estimateOutput);t!==null&&pf({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},RC=e=>{let t=TC(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=cG(t);return Qi({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Gt.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),pf({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var gh,fG,xC=l(()=>{"use strict";gh="[[WORKING_TOKEN_ESTIMATE]]",fG=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this Mac.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",gh,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var hG,MZ,yG,SG=l(()=>{"use strict";xC();hG=/^(\d{1,8})\b/,MZ=e=>{let t=e.indexOf(gh);if(t<0)return null;let r=e.slice(t+gh.length).trim(),o=hG.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},yG=e=>{let t=MZ(e);if(t!==null)return t;let r=hG.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var IC,OC,AG=l(()=>{"use strict";xC();ch();SG();Wc();LC();IC=async e=>{let t=_o(e.wrappedPrompt),r=eF(e.reportsDir);return{estimateOutput:await mh(fG(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},OC=e=>{let t=yG(e.estimateOutput);return t===null?null:(ZH({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var bG=l(()=>{"use strict";Mk();AU();PU();kU();Ia();UB();eh();Tt();cC();Yf();BB();yb();JB();as();YB();XB();Kf();QB();rG();nG();zu();sG();aG();ph();ta();gG();AG();Hk();gl();Xf();tC()});var PG={};Ft(PG,{buildContinuationPromptWithContext:()=>DZ});var NZ,zZ,DZ,wG=l(()=>{"use strict";NZ=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,zZ=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),DZ=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=zZ(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${NZ(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var _G={};Ft(_G,{readHarnessExportSets:()=>$Z});var md,MC,fh,jZ,$Z,vG=l(()=>{"use strict";md=g(require("node:fs")),MC=g(require("node:path"));ze();fh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jZ=e=>{if(!md.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(md.default.readFileSync(e.harnessManifestPath,"utf8"));if(fh(t))return t}catch{return null}return null},$Z=(e,t)=>{let r=M(t),o=jZ(r);if(o===null)return[];let n=fh(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!fh(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let u of c){if(!fh(u))continue;let m=typeof u.path=="string"?u.path:void 0,S=typeof u.id=="string"?u.id:"",f=typeof u.kind=="string"?u.kind:"",y=typeof u.title=="string"?u.title:"";if(m===void 0||S.length===0||f.length===0||y.length===0)continue;let p=m.startsWith("shared/")?MC.default.join(r.harnessRootDir,m):MC.default.join(r.harnessSetsDir,i,m);md.default.existsSync(p)&&d.push({id:S,kind:f,title:y,content:md.default.readFileSync(p,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var FC,zC,Ri,kG,HZ,CG,TG,NC,LG,DC,jC,$C,ee,K,HC,FZ,gd,UZ,BZ,GZ,qZ,VZ,KZ,JZ,YZ,fd,WG=l(()=>{"use strict";FC=require("node:child_process"),zC=g(require("node:fs")),Ri=g(require("node:os"));dU();J();ne();Vo();Zv();gU();ge();Vt();yl();zP();Tf();Pf();Xt();tn();Db();kt();bG();kG=3e4,HZ=3e4,CG=new Map,TG=new Map,NC=new Map,LG=new Map,DC=new Map,jC=new Map,$C=new Map,ee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),K=(e,t,r)=>{e.readyState===qc.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(lo(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Wm(r,"out",t)))},HC=e=>e,FZ=e=>{if(!zC.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(zC.default.readFileSync(e.harnessManifestPath,"utf8"));if(ee(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},gd=(e,t)=>{let r=FZ(t);r!==null&&K(e,{type:"harness.manifest.report",payload:{hostname:Ri.default.hostname(),manifest:r}})},UZ=async(e,t,r,o,n,s,i=!1,a,c,d,u,m)=>{let S=m?.trim()??"";if(!pe(t)){K(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=ed({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),y=await Rt({commands:me({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),p=s!==void 0?WC({wrappedPrompt:r,writerLabel:f,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,A=s!==void 0?IC({wrappedPrompt:r,writerLabel:f,reportsDir:e.layout.reportsDir,estimateModel:y?.estimateModel,capabilityNote:y?.capabilityNote}).catch(()=>null):null,b=id(t)&&!Xk(t);if(b){try{await Gr(e.layout.installDir,t)}catch($){let ve=$ instanceof Error?$.message:String($);K(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${ve}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}sd(t)}else if(!id(t))try{await Gr(e.layout.installDir,t)}catch($){let ve=$ instanceof Error?$.message:String($);K(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${ve}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let h=Ca(d,pd,m);if(h===null){K(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}st({projectFolderPath:h,...S.length>0?{projectId:S}:{}}),i||Oc(e.layout,t,h);let P=bf({sessionContinuation:i,supportsWriterSessionContinuation:th(t),isWriterConversationStarted:rh(t)}),_=i&&P==="first"?Ic(e.layout,t,h):null,k=_!==null?gi(e.layout,_):null,C=k!==null&&k.turns.length>0,L=Cv({sessionContinuation:i,supportsWriterSessionContinuation:th(t),isWriterConversationStarted:rh(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:C,userPromptCharacterCount:r.length}),R=r;if(L.continuationStrategy==="source_run_seed"){let $=typeof c=="string"&&c.length>0?ad(e.layout,c):null;if($!==null){let{buildContinuationPromptWithContext:ve}=await Promise.resolve().then(()=>(wG(),PG));R=ve({priorPrompt:$.prompt,priorOutput:$.resultOutput??"",userMessage:r})}}else L.continuationStrategy==="transcript_seed"&&k!==null&&k.turns.length>0&&(R=ff({priorTurns:k.turns,userMessage:r}));let I=L.ragLimit>0?await js({layout:e.layout,query:R,limit:L.ragLimit,minScore:L.ragMinScore,projectFolderPath:h,...S.length>0?{projectId:S}:{}}):[],N=L.ragLimit>0&&h.trim().length>0?await MP({layout:e.layout,query:R,limit:2,minScore:.32,projectFolderPath:h,...S.length>0?{projectId:S}:{}}):[],U=L.injectMemory?hv(e.layout,h,S.length>0?S:void 0):[],G=`${Sv(U,L.memoryEntryLimit)}${xP(I)}${NP(N)}${R}`,q=u?.trim()??(s!==void 0&&h.trim().length>0?CC():void 0);if(s!==void 0&&q!==void 0&&q.length>0&&h.trim().length>0){ea({reportKey:q,agentRunId:s,userSummary:"Working on your Mac\u2026"});let $=G;p!==null&&p.then(ve=>{if(ve===null)return;let qr=RC({estimateOutput:ve.estimateOutput??"",reportKey:q,agentRunId:s,reportsDir:e.layout.reportsDir,task:ve.task,writerLabel:ve.writerLabel,embedding:ve.embedding});if(qr.estimateSeconds===null)return;mC(e.layout.reportsDir,s);let dr=`${Ei}
${qr.estimateSeconds}
`;if(cr(s)){K(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:dr},requestId:o});return}Br(s,dr)}).catch(()=>{}),G=kC($),G=Ly(G,{agentRunId:s,reportKey:q,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&p!==null&&p.then($=>{$!==null&&EC({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel,embedding:$.embedding})}).catch(()=>{}),s!==void 0&&A!==null&&A.then($=>{$!==null&&OC({estimateOutput:$.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:$.task,writerLabel:$.writerLabel})}).catch(()=>{});let Ve=s!==void 0&&$C.get(s)===!0;if(s!==void 0&&h.trim().length>0){let $=await am(h);jC.set(s,$),q!==void 0&&q.length>0&&DC.set(s,q)}uh(e,t,G,o,HC(n),s,{sessionTurn:L.sessionTurn},a,h,q,r,MS(e.layout,s,Ve)),b&&s!==void 0&&K(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Qk(t)},requestId:o})},BZ=async(e,t,r,o,n)=>{let s=(i,a)=>{K(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await eC({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:me({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,K(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=pe(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Li(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},GZ=(e,t,r)=>new Promise(o=>{if(!pe(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Kt(t,r,me({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,FC.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),qZ=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;K(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Yt(t.bundle),s=ee(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=Ce(e.wsUrl)??vt,m=await PA({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return K(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=en({bundle:i,layout:e.layout});return K(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&gd(o,e.layout),!0},VZ=async(e,t,r,o)=>{if(await qZ(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(K(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){K(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!pe(n)){K(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}ca(e.layout);let i=await(async()=>{try{await Gr(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return GZ(e,n,s)})().finally(()=>{da(e.layout)});K(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),gd(o,e.layout)},KZ=e=>{let t=1e3*2**e;return Math.min(HZ,t)},JZ=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=p=>{if(!t.restartInFlight){if(Ct(e.layout)){Jy(p),console.log(`[agent-witch] Deferring local restart (${p}) until the active writer task finishes.`);return}t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${p})\u2026`),t.wakeError=`restart:${p}`,SC().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1})}},o=(p,A="system.ack")=>{if(!t.selfUpdateInFlight){if(Ct(e.layout)){ua({layout:e.layout,remoteBundleVersion:p,trigger:A}),console.log(`[agent-witch] Deferring install bundle update (${p} via ${A}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,AC({layout:e.layout,remoteBundleVersion:p,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1})}},n=()=>{let p=fe(e.layout);p!==null&&Te(p,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),f())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let p=t.socket;t.socket=void 0,t.wsConnected=!1,p.removeAllListeners("open"),p.removeAllListeners("message"),p.removeAllListeners("close"),p.on("error",()=>{}),(p.readyState===qc.OPEN||p.readyState===qc.CONNECTING)&&p.close()},d=()=>{i(),t.localHealthTimer=setInterval(n,kG)},u=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let p=KZ(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${p}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,f()},p)},m=p=>{s();let A=()=>{let b=sa(e.layout.installDir),h=Lt();K(p,{type:"agent.heartbeat",payload:{hostname:Ri.default.hostname(),macOsUsername:Ri.default.userInfo().username,wakeError:t.wakeError,wakePort:h,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,kG)},S=(p,A)=>{if(typeof p.type!="string")return;if(zb(p)){t.stopped=!0,s(),a(),c(),Ob({layout:e.layout}).finally(()=>{Kc(),process.exit(0)});return}lo(e.layout,{direction:"in",type:p.type,summary:"inbound WS frame"}),Wm(e.layout,"in",p);let b=typeof p.requestId=="string"?p.requestId:void 0;if(p.type==="device.auth.attestation"&&ee(p.payload)){let h=typeof p.payload.serverPublicKey=="string"?p.payload.serverPublicKey:"",P=typeof p.payload.origin=="string"?p.payload.origin:"",_=typeof p.payload.devicePublicKey=="string"?p.payload.devicePublicKey:"",k=typeof p.payload.challenge=="string"?p.payload.challenge:"",C=typeof p.payload.serverAttestation=="string"?p.payload.serverAttestation:"";if(!Xv({serverPublicKey:h,origin:P,devicePublicKey:_,challenge:k,serverAttestation:C})){t.wakeError="Server attestation verification failed",lo(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(p.type==="writer.ensure"&&ee(p.payload)){let h=typeof p.payload.writerAgent=="string"?p.payload.writerAgent:"";lo(e.layout,{direction:"local",type:"writer.ensure",summary:h,action:"ensure-writer"}),vC({layout:e.layout,writerAgent:h,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(P=>{K(A,{type:"writer.status",payload:P},e.layout)})}if(p.type==="install.bundle.update"&&ee(p.payload)){let h=typeof p.payload.bundleVersion=="string"?p.payload.bundleVersion.trim():"";h.length>0&&o(h,"install.bundle.update")}if(p.type==="system.ack"){Qu(e.layout,{wsUrl:e.wsUrl});let h=ee(p.payload)?p.payload:null,P=bC(h);P!==null&&o(P)}if(p.type==="device.restart"&&r("cloud-device-restart"),p.type==="automations.sync"&&ee(p.payload)&&PC(p.payload),p.type==="automations.run"&&ee(p.payload)&&wC(p.payload),p.type==="terminal.stream.accepted"&&ee(p.payload)){let h=typeof p.payload.runId=="string"?p.payload.runId:"";if(h.length>0){let P=qk(h);for(let _ of P)K(A,{type:"terminal.stream.chunk",payload:{runId:h,chunk:_},requestId:b})}}if(p.type==="agent.agentRun.list"&&K(A,{type:"dashboard.agentRun.list.result",payload:{runs:lC(e.layout)},requestId:b}),p.type==="agent.agentRun.get"&&ee(p.payload)){let h=typeof p.payload.runId=="string"?p.payload.runId:"",P=h.length>0?ad(e.layout,h):null;K(A,{type:"dashboard.agentRun.get.result",payload:{run:P},requestId:b})}if(p.type==="command.claude.run"&&ee(p.payload)){let h=p.payload.prompt,P=typeof p.payload.writerAgent=="string"&&pe(p.payload.writerAgent)?p.payload.writerAgent:"claude-cli",_=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,k=p.payload.sessionContinuation===!0,C=typeof p.payload.sourceRunId=="string"?p.payload.sourceRunId:void 0,L=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:void 0,R=typeof p.payload.projectId=="string"?p.payload.projectId:void 0,I=Ca(typeof p.payload.projectFolderPath=="string"?p.payload.projectFolderPath:void 0,pd,R),N=LS(p.payload.compositionSnapshot),U=typeof p.payload.reportKey=="string"?p.payload.reportKey:void 0;if(typeof h=="string"&&h.trim().length>0){if(console.log(`[agent-witch] Running ${P} task (${k?"continue":"first"})\u2026`),I===null){K(A,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this Mac yet. Open Agent Witch Local and set the project folder before running tasks.",..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(N!==null){let G=ES(e.layout,N);if(G!==null){K(A,{type:"command.claude.result",payload:{exitCode:-1,output:G,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(_!==void 0){let q=xS(e.layout,_,N);if(!q.ok){K(A,{type:"command.claude.result",payload:{exitCode:-1,output:q.errorMessage,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}$C.set(_,N.entries.some(Ve=>Ve.scope==="run"))}}_!==void 0&&L!==void 0&&CG.set(_,L),_!==void 0&&(TG.set(_,I),R!==void 0&&R.trim().length>0&&NC.set(_,R.trim()),LG.set(_,h.trim()),st({projectFolderPath:I,...R!==void 0&&R.trim().length>0?{projectId:R.trim()}:{}})),UZ(e,P,h.trim(),b,A,_,k,L,C,I,U,R)}}if(p.type==="shell.session.open"&&ee(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",P=typeof p.payload.cols=="number"?p.payload.cols:120,_=typeof p.payload.rows=="number"?p.payload.rows:32;h.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),Yk({shellSessionId:h,cwd:e.workspace,cols:P,rows:_,send:k=>{K(A,k)},requestId:b}))}if(p.type==="shell.session.close"&&ee(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"";h.length>0&&Ti(h,P=>{K(A,P)},b)}if(p.type==="shell.input"&&ee(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",P=typeof p.payload.data=="string"?p.payload.data:"";h.length>0&&P.length>0&&Vk(h,P)}if(p.type==="shell.resize"&&ee(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",P=typeof p.payload.cols=="number"?p.payload.cols:0,_=typeof p.payload.rows=="number"?p.payload.rows:0;h.length>0&&P>0&&_>0&&Kk(h,P,_)}if(p.type==="command.writer.session.end"&&ee(p.payload)){let h=p.payload.writerAgent;typeof h=="string"&&pe(h)&&(Zk(h),Sf(e.layout,h))}if(p.type==="command.writer.session.start"&&ee(p.payload)){let h=p.payload.writerAgent,P=typeof p.payload.writerSessionId=="string"?p.payload.writerSessionId:"";typeof h=="string"&&pe(h)&&P.length>0&&(console.log(`[agent-witch] Starting ${h} session\u2026`),BZ(e,h,P,b,A))}if(p.type==="command.claude.stop"&&ee(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"";h.length>0&&(console.log(`[agent-witch] Stopping run ${h}\u2026`),yC(e,HC(A),h,b))}if(p.type==="command.claude.input_respond"&&ee(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"",P=typeof p.payload.response=="string"?p.payload.response.trim():"",_=typeof p.payload.originalPrompt=="string"?p.payload.originalPrompt:"",k=typeof p.payload.partialOutput=="string"?p.payload.partialOutput:"",C=typeof p.payload.question=="string"?p.payload.question:"";h.length>0&&P.length>0&&_.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),fC(e,{agentRunId:h,originalPrompt:_,partialOutput:k,question:C,response:P,shellSessionId:CG.get(h)},b,HC(A)))}if(p.type==="dispatch.approval.required"&&ee(p.payload)){let h=typeof p.payload.requesterEmail=="string"?p.payload.requesterEmail:"A teammate",P=typeof p.payload.prompt=="string"?p.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${h}: ${P}`),process.platform==="darwin"&&(0,FC.spawn)("osascript",["-e",`display notification "${P.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${h.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(p.type==="harness.request"&&ee(p.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),VZ(e,p.payload,b,A)),p.type==="harness.export.request"&&ee(p.payload)){let h=typeof p.payload.borrowerUserId=="string"?p.payload.borrowerUserId:"",P=typeof p.payload.targetDeviceId=="string"?p.payload.targetDeviceId:void 0,_=Array.isArray(p.payload.setSlugs)?p.payload.setSlugs.filter(k=>typeof k=="string"):[];h.length>0&&_.length>0&&(async()=>{let{readHarnessExportSets:k}=await Promise.resolve().then(()=>(vG(),_G)),C=k(_,e.email);K(A,{type:"harness.export.result",payload:{success:C.length>0,borrowerUserId:h,...P!==void 0?{targetDeviceId:P}:{},sets:C,errorMessage:C.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(p.type==="harness.manifest.request"&&gd(A,e.layout),p.type==="command.claude.result"&&ee(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,P=typeof p.payload.output=="string"?p.payload.output:"",_=typeof p.payload.exitCode=="number"?p.payload.exitCode:null,k=Ca(h!==void 0?TG.get(h):void 0,pd),C=h!==void 0?NC.get(h):void 0,L=h!==void 0?LG.get(h)??"":"",R=XA({exitCode:_,output:P});if(R&&k!==null&&RP({layout:e.layout,text:P,source:h??"command.claude.result",projectFolderPath:k,...C!==void 0?{projectId:C}:{}}),_!=null&&_!==0&&P.trim().length>0&&k!==null&&(CP({layout:e.layout,errorText:P,projectFolderPath:k,...C!==void 0?{projectId:C}:{}}),OP({layout:e.layout,text:P,source:h??"command.claude.result.failure",projectFolderPath:k,...C!==void 0?{projectId:C}:{}})),R&&L.trim().length>0&&k!==null&&yv({layout:e.layout,projectFolderPath:k,...C!==void 0?{projectId:C}:{},entry:{id:`${Date.now()}-${h??"run"}`,...h!==void 0?{agentRunId:h}:{},prompt:L,output:P,createdAt:new Date().toISOString()}}),h!==void 0&&k!==null){let N=DC.get(h),U=jC.get(h);N!==void 0&&U!==void 0&&am(k).then(G=>{let q=tb({before:U,after:G});Wy(N,q),jC.delete(h),DC.delete(h)})}if(R&&C!==void 0&&C.trim().length>0){let N=H(),U=N===null?null:Z({wsUrl:N.wsUrl,pairingToken:N.pairingToken});U!==null&&ob(U,C,{...h!==void 0?{sourceRunId:h}:{},lesson:rb({prompt:L,output:P})})}h!==void 0&&(La(e.layout,h),$C.delete(h),NC.delete(h))}},f=()=>{if(t.stopped)return;a(),c();let p=new qc(e.wsUrl);t.socket=p,p.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),pC(Z({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),gC(e.layout);let A=Ce(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),h=Yv({layout:e.layout,origin:A,...b!==void 0&&b.length>0?{claimToken:b}:{}});K(p,{type:"agent.register",payload:{role:"agent",hostname:Ri.default.hostname(),macOsUsername:Ri.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...h}},e.layout),gd(p,e.layout),hC(e,p),m(p)}),p.on("message",A=>{let b=typeof A=="string"?A:A.toString("utf8");try{let h=JSON.parse(b);if(!ee(h))return;S(h,p)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),p.on("close",(A,b)=>{s(),t.socket=void 0,t.wsConnected=!1,nS(e.layout),t.reconnectAttempt+=1;let h=typeof b=="string"?b:b.toString("utf8");un(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:h}),console.log("[agent-witch] Disconnected from server."),u()}),p.on("error",A=>{t.wakeError=A.message,un(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})},y=()=>{t.stopped=!0,s(),i(),a(),c()};return Ky(()=>{let p=Yy();p!==null&&p.layout.installDir===e.layout.installDir&&p.layout.profileEmail===e.layout.profileEmail&&o(p.remoteBundleVersion,p.trigger);let A=Xy();A!==null&&r(A)}),{connect:f,startLocalHealthCheck:d,stop:y,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:ya(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Dc(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,f()},reportHarnessManifestIfConnected:()=>{let p=t.socket;return!t.wsConnected||p===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(gd(p,e.layout),{ok:!0})}}},YZ=async()=>{rt("agent-witch");let e=Ek(),t=T();Ok().ok||(process.platform==="darwin"?(await Mo(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),Dk(t);let o=zk({installDir:t});o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"&&(gr({launchAgentLabel:ke(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067)."),qi());let n=await US(),s=n[0];s!==void 0&&_C(s.layout);for(let f of n){let y=Ce(f.wsUrl)??vt;ia(f.layout.installDir,y)}let i=n.map(f=>JZ(f)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),Kc(),process.exit(0));let c=()=>{n.forEach((f,y)=>{let p=i[y];if(p===void 0)return;let A=fe(f.layout);sS(A,{socketOpen:p.hasMacSocketOpen(),staleAfterMs:12e4})&&p.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let f=n[0]?.layout;f!==void 0&&(Ct(f)||il(f.installDir))},m=await jk({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):zc({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let f of i)f.startLocalHealthCheck(),f.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let S=fr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Vi(),d()});d=()=>{S(),m.stop(),Kc(),console.log("[agent-witch] Shutting down.");for(let f of i)f.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},fd=YZ});var UC=l(()=>{"use strict";WG()});var EG={};Ft(EG,{startAgentWitchClient:()=>fd});var RG=l(()=>{"use strict";UC();UC();Do();Ey();ju();if(!ot()&&jo(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Du(process.argv.slice(e))),fd()}});Cy();Ey();Do();ju();var CW="20.x",TW="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var zK=e=>[`Node.js ${CW} or newer is required (found ${e}).`,TW].join(" "),LW=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${zK(process.version)}
`),process.exit(1))};var XZ=async()=>{rt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(rS(),tS)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},ZZ=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(M0(),O0)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},QZ=async()=>{if(!jo(ot()?void 0:__agentWitchImportMetaUrl))return;LW();let e=process.argv.indexOf("report");e>=0&&process.exit(Du(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await XZ();return}if(t==="wake"){await ZZ();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(NI(),MI));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(s1(),n1));o();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(RG(),EG));await r()};QZ();
